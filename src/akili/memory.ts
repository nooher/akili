// memory.ts — Akili's sovereign multi-turn conversation memory.
//
// Deterministic, offline, zero-dependency. This is the *engine* memory (carried
// between turns of an AkiliSession), distinct from src/lib/memory.ts which only
// persists the rendered transcript for the UI.
//
// The session accumulates a small, generic memory across turns and injects it
// into each AkiliQuery.context so experts resolve anaphoric follow-ups:
//   "duty in Kenya" → "and the VAT there?"   resolves Kenya
//   "dalili za malaria" → "tiba yake?"        stays in afya
//
// Two things travel forward:
//   1. A generic `context.memory` ({ lastDomain, lastExpert, entities, recentTurns })
//      any future expert can read.
//   2. The per-domain context shapes existing experts already read — e.g.
//      `context.logistics = { lastTopic, entities }` for logistiki — so they pick
//      up the memory with NO change.
//
// Nothing here calls the network or an LLM; every decision is a pure function of
// the prior turns + the current query text.

import type { AkiliAnswer, AkiliDomain, AkiliQuery } from './types';

/** One remembered turn (compact — just what later turns need to reason). */
export interface AkiliTurn {
  domain: AkiliDomain;
  expert: string;
  /** The user's (trimmed) text for that turn. */
  text: string;
  /** The answer's topic, when the expert exposed one (e.g. logistiki). */
  topic?: string;
}

/**
 * The session-level memory carried between turns. Generic by design: `entities`
 * is a flat string map populated from each answer's `data.entities` (+ a top-level
 * `data.topic` when present), so it works for any domain without bespoke shapes.
 */
export interface AkiliMemory {
  /** Domain of the most recent answered turn. */
  lastDomain?: AkiliDomain;
  /** Expert id of the most recent answered turn. */
  lastExpert?: string;
  /** Topic of the most recent answer (when the expert exposed one). */
  lastTopic?: string;
  /** Accumulating entity map: country, corridor, mode, value, topic, … */
  entities: Record<string, string>;
  /** The last N turns, oldest first. */
  recentTurns: AkiliTurn[];
}

/** A fresh, empty memory. */
export function emptyMemory(): AkiliMemory {
  return { entities: {}, recentTurns: [] };
}

// ── anaphora detection ─────────────────────────────────────────────────────────

// Pronoun / anaphora cues (sw + sw_mtaa + en) that mark a query as a follow-up
// referring back to the prior turn rather than introducing a new subject.
// Matched as whole tokens / phrases against the normalized text.
const ANAPHORA_CUES = [
  // Kiswahili pronouns / referents
  'yake', 'yao', 'lake', 'wake', 'zake', 'hiyo', 'hilo', 'huo', 'hizo', 'hizi',
  'hapo', 'huko', 'pale', 'hapohapo',
  // Kiswahili follow-up phrasings
  'vipi kuhusu', 'je kuhusu', 'na je', 'na vipi', 'sasa je', 'kuhusu hilo',
  // English
  'there', 'that', 'it', 'its', 'them', 'those', 'what about', 'how about',
  'and the', 'and its', 'and that', 'same', 'then',
];

const STRIP = /[^\p{L}\p{N}']+/gu;

/** Lowercase + strip punctuation to a single-spaced token stream. */
export function normalizeText(s: string): string {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(STRIP, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Whole-token / phrase containment against a space-padded haystack. */
function hasCue(paddedHay: string, cue: string): boolean {
  return paddedHay.includes(` ${cue} `);
}

/**
 * True when the query is SHORT and carries an anaphoric cue — i.e. it leans on
 * the prior turn for its subject. Conservative on purpose: long queries (which
 * tend to carry their own subject) are never treated as follow-ups, so a clear
 * new-topic question is never mistaken for a follow-up.
 */
export function looksLikeFollowUp(text: string): boolean {
  const n = normalizeText(text);
  if (!n) return false;
  const words = n.split(' ').filter(Boolean);
  if (words.length === 0 || words.length > 8) return false;
  const padded = ` ${n} `;
  return ANAPHORA_CUES.some((c) => hasCue(padded, c));
}

// ── reading entities off an answer ───────────────────────────────────────────

/** Copy a flat {string|number} map into the accumulator (skips empties). */
function absorb(out: Record<string, string>, ents: unknown): void {
  if (!ents || typeof ents !== 'object') return;
  for (const [k, v] of Object.entries(ents as Record<string, unknown>)) {
    if (typeof v === 'string' && v.trim()) out[k] = v;
    else if (typeof v === 'number') out[k] = String(v);
  }
}

/**
 * Pull a flat string-entity map out of an answer's `data` payload, if present.
 * Experts may surface entities either directly at `data.entities` (generic) or
 * one level down at `data.data.entities` (e.g. logistiki returns its full
 * LxAnswer as `data`, whose own `.data.entities` holds the extracted entities).
 * Both are merged, with the nested (most specific) layer taking precedence.
 */
function entitiesFromAnswer(answer: AkiliAnswer): Record<string, string> {
  const out: Record<string, string> = {};
  const data = answer.data;
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;
    absorb(out, d.entities);
    if (d.data && typeof d.data === 'object') {
      absorb(out, (d.data as Record<string, unknown>).entities);
    }
  }
  // A top-level data.topic is a useful generic entity too.
  const topic = topicFromAnswer(answer);
  if (topic) out.topic = topic;
  return out;
}

/** The topic an answer exposes (data.topic), if any. */
function topicFromAnswer(answer: AkiliAnswer): string | undefined {
  const data = answer.data;
  if (data && typeof data === 'object') {
    const t = (data as Record<string, unknown>).topic;
    if (typeof t === 'string' && t.trim()) return t;
  }
  return undefined;
}

// ── memory update ───────────────────────────────────────────────────────────

/**
 * Fold a completed (query, answer) turn into the memory. Pure: returns a new
 * memory, never mutates the input. Entities accumulate (new values win); the
 * last `maxTurns` turns are kept.
 */
export function updateMemory(
  prev: AkiliMemory,
  query: AkiliQuery,
  answer: AkiliAnswer,
  maxTurns = 8,
): AkiliMemory {
  const merged = { ...prev.entities, ...entitiesFromAnswer(answer) };
  const topic = topicFromAnswer(answer);
  const turn: AkiliTurn = {
    domain: answer.domain,
    expert: answer.expert,
    text: (query.text ?? '').trim(),
    ...(topic ? { topic } : {}),
  };
  return {
    lastDomain: answer.domain,
    lastExpert: answer.expert,
    ...(topic ? { lastTopic: topic } : {}),
    entities: merged,
    recentTurns: [...prev.recentTurns, turn].slice(-maxTurns),
  };
}

// ── context injection ───────────────────────────────────────────────────────

/**
 * Build the context object to inject into the next AkiliQuery from the current
 * memory. Preserves any caller-supplied context and ADDS:
 *   - context.memory   — the generic shape any expert can read
 *   - per-domain shapes existing experts already read, e.g.
 *     context.logistics = { lastTopic, entities } when lastDomain was logistiki,
 *     so logistiki/afya pick up the memory with no change.
 */
export function injectContext(
  base: Record<string, unknown> | undefined,
  memory: AkiliMemory,
): Record<string, unknown> {
  const ctx: Record<string, unknown> = { ...(base ?? {}) };

  // Generic memory — future-proof, domain-agnostic.
  ctx.memory = {
    lastDomain: memory.lastDomain,
    lastExpert: memory.lastExpert,
    lastTopic: memory.lastTopic,
    entities: memory.entities,
    recentTurns: memory.recentTurns,
  };

  // Per-domain shape logistiki already reads (engine merges these entities and
  // resolves anaphoric follow-ups against the carried country/corridor/mode).
  if (memory.lastDomain === 'logistiki' && !ctx.logistics) {
    ctx.logistics = {
      lastTopic: memory.lastTopic,
      entities: memory.entities,
    };
  }

  return ctx;
}
