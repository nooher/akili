// router.ts — the Akili router. Calls match() on every registered expert and
// dispatches the query to the highest scorer (ties → registration order), then
// awaits answer(). Robust: an expert throwing in match() or answer() never
// crashes the router — it falls through to the next candidate / fallback.

import type { AkiliAnswer, AkiliQuery, DomainExpert } from './types';

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

    // Score every expert; a throwing match() scores 0.
    const scored: Scored[] = registry.map((expert, order) => {
      let score = 0;
      try {
        const s = expert.match(query);
        score = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
      } catch {
        score = 0;
      }
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
  /** Clear the conversation memory. */
  reset(): void;
}

/**
 * A cheap in-memory multi-turn session over an Akili instance. Keeps the last
 * `maxTurns` exchanges; passes prior history to experts via query.context.history
 * so context-aware experts may use it (others simply ignore it).
 */
export function createAkiliSession(akili: Akili, maxTurns = 8): AkiliSession {
  let exchanges: AkiliExchange[] = [];

  return {
    async ask(q) {
      const query = normalize(q);
      const withCtx: AkiliQuery = {
        ...query,
        context: { ...(query.context ?? {}), history: exchanges },
      };
      const answer = await akili.ask(withCtx);
      exchanges = [...exchanges, { query, answer }].slice(-maxTurns);
      return answer;
    },
    history: () => [...exchanges],
    reset: () => {
      exchanges = [];
    },
  };
}
