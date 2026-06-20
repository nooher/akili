// router.ts — the Akili router. Calls match() on every registered expert and
// dispatches the query to the highest scorer (ties → registration order), then
// awaits answer(). Robust: an expert throwing in match() or answer() never
// crashes the router — it falls through to the next candidate / fallback.

import type { AkiliAnswer, AkiliBias, AkiliQuery, DomainExpert } from './types';
import {
  emptyMemory,
  injectContext,
  looksLikeFollowUp,
  updateMemory,
  type AkiliMemory,
} from './memory';

export interface Akili {
  /** Ask Akili. Accepts a raw string (treated as Swahili) or a structured query. */
  ask(q: AkiliQuery | string): Promise<AkiliAnswer>;
  /** The registered experts, in registration order. */
  experts: DomainExpert[];
}

/** Normalize a string or partial query into a full AkiliQuery. */
function normalize(q: AkiliQuery | string): AkiliQuery {
  if (typeof q === 'string') return { text: q, lang: 'sw' };
  return { lang: 'sw', ...q, text: q.text ?? '' };
}

/** Read an optional anaphora bias off the query context (set by a session). */
function readBias(query: AkiliQuery): AkiliBias | undefined {
  const b = query.context?.bias as Partial<AkiliBias> | undefined;
  if (b && typeof b.domain === 'string' && typeof b.boost === 'number') {
    return {
      domain: b.domain as AkiliBias['domain'],
      boost: b.boost,
      floor: typeof b.floor === 'number' ? b.floor : 0,
    };
  }
  return undefined;
}

/** Apply the session's anaphora bias to one expert's raw score. */
function applyBias(score: number, isPriorDomain: boolean, bias?: AkiliBias): number {
  if (!bias || !isPriorDomain) return score;
  // Boost an existing signal AND lift to a floor so the prior domain competes
  // even when its own matcher (blind to carried context) scored 0. The floor
  // sits below the "clear cue" threshold, so a strong new topic still wins.
  return Math.min(1, Math.max(score + bias.boost, bias.floor));
}

/** Last-resort answer when there are no experts at all. */
function emptyRegistryAnswer(): AkiliAnswer {
  return {
    domain: 'jumla',
    expert: 'router',
    text: {
      sw: 'Samahani, hakuna mtaalamu aliyesajiliwa kwa sasa.',
      en: 'Sorry, no expert is currently registered.',
    },
    confidence: 'low',
  };
}

/** Find the jumla / fallback expert if one is registered. */
function fallbackExpert(experts: DomainExpert[]): DomainExpert | undefined {
  return experts.find((e) => e.domain === 'jumla') ?? experts[experts.length - 1];
}

interface Scored {
  expert: DomainExpert;
  score: number;
  order: number;
}

export function createAkili(experts: DomainExpert[] = []): Akili {
  const registry = [...experts];

  async function dispatch(query: AkiliQuery): Promise<AkiliAnswer> {
    if (registry.length === 0) return emptyRegistryAnswer();

    // Optional anaphora bias from a multi-turn session: a small additive boost
    // toward the prior domain for short follow-ups. Additive (not an override):
    // a clearly-higher-scoring new topic still wins.
    const bias = readBias(query);

    // Score every expert; a throwing match() scores 0.
    const scored: Scored[] = registry.map((expert, order) => {
      let score = 0;
      try {
        const s = expert.match(query);
        score = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
      } catch {
        score = 0;
      }
      score = applyBias(score, !!bias && expert.domain === bias.domain, bias);
      return { expert, score, order };
    });

    // Candidates sorted by score desc, ties broken by registration order asc.
    const candidates = scored
      .filter((c) => c.score > 0)
      .sort((a, b) => (b.score - a.score) || (a.order - b.order));

    const fb = fallbackExpert(registry);

    // If nothing scored above ~0, go straight to fallback.
    if (candidates.length === 0 || candidates[0].score <= 0.001) {
      if (fb) {
        try {
          return await fb.answer(query);
        } catch {
          return emptyRegistryAnswer();
        }
      }
      return emptyRegistryAnswer();
    }

    // Try candidates in order; a throwing answer() falls through to the next.
    for (const { expert } of candidates) {
      try {
        return await expert.answer(query);
      } catch {
        // swallow and try the next candidate
      }
    }

    // Every candidate threw — last-ditch fallback.
    if (fb && !candidates.some((c) => c.expert === fb)) {
      try {
        return await fb.answer(query);
      } catch {
        /* fall through */
      }
    }
    return emptyRegistryAnswer();
  }

  return {
    experts: registry,
    ask: (q) => dispatch(normalize(q)),
  };
}

// ── optional multi-turn session ──────────────────────────────────────────────

export interface AkiliExchange {
  query: AkiliQuery;
  answer: AkiliAnswer;
}

export interface AkiliSession {
  ask(q: AkiliQuery | string): Promise<AkiliAnswer>;
  /** The last N exchanges, oldest first. */
  history(): AkiliExchange[];
  /** The accumulated multi-turn memory (lastDomain, entities, recentTurns). */
  memory(): AkiliMemory;
  /** Clear the conversation memory. */
  reset(): void;
}

/** Additive boost applied to the prior domain for an anaphoric follow-up. */
const FOLLOWUP_BOOST = 0.25;
/**
 * Score floor for the prior domain on a follow-up. Sits ABOVE the typical
 * medium keyword match (~0.55–0.60 — e.g. biashara seeing "VAT") so a sticky
 * follow-up resolves to the prior domain, but BELOW the "clear cue" threshold
 * (~0.78) so a strong, self-contained new topic still wins → no over-stickiness.
 */
const FOLLOWUP_FLOOR = 0.62;

/**
 * A multi-turn session over an Akili instance. Carries a small, generic memory
 * between turns (lastDomain/lastExpert, an accumulating entity map, the last N
 * turns) and injects it into each query's context so experts resolve anaphoric
 * follow-ups — e.g. "duty in Kenya" → "and the VAT there?" keeps Kenya, and
 * "dalili za malaria" → "tiba yake?" stays in afya.
 *
 * Sovereign + deterministic: every decision is a pure function of prior turns +
 * the current text. The prior `history` context is preserved for back-compat.
 */
export function createAkiliSession(akili: Akili, maxTurns = 8): AkiliSession {
  let exchanges: AkiliExchange[] = [];
  let mem: AkiliMemory = emptyMemory();

  return {
    async ask(q) {
      const query = normalize(q);

      // Inject memory into the context (generic `memory` + per-domain shapes
      // existing experts already read, e.g. `logistics`). Keep `history` too.
      const context = injectContext(
        { ...(query.context ?? {}), history: exchanges },
        mem,
      );

      // Anaphora bias: a short follow-up referring back ("…yake", "there",
      // "na the VAT") nudges the prior domain up by a small additive boost so a
      // near-tie sticks — but a clear new topic still out-scores it.
      if (mem.lastDomain && looksLikeFollowUp(query.text)) {
        context.bias = {
          domain: mem.lastDomain,
          boost: FOLLOWUP_BOOST,
          floor: FOLLOWUP_FLOOR,
        } satisfies AkiliBias;
      }

      const withCtx: AkiliQuery = { ...query, context };
      const answer = await akili.ask(withCtx);

      // Fold the completed turn into memory + history.
      exchanges = [...exchanges, { query, answer }].slice(-maxTurns);
      mem = updateMemory(mem, query, answer, maxTurns);
      return answer;
    },
    history: () => [...exchanges],
    memory: () => mem,
    reset: () => {
      exchanges = [];
      mem = emptyMemory();
    },
  };
}
