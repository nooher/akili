// index.ts — Akili's public API. Assembles the default expert registry and
// exposes the one-call entry point. Sovereign by design: every expert is pure,
// deterministic TS (no external LLM).

import { createAkili, createAkiliSession } from './router';
import type { Akili } from './router';
import { snilExpert } from './experts/snil';
import { jumlaExpert } from './experts/jumla';
import { afyaExpert } from './experts/afya';
import { fasihiExpert, lughaExpert } from './experts/fasihi';
import { sheriaExpert } from './experts/sheria';
import { kilimoExpert } from './experts/kilimo';
import { elimuExpert } from './experts/elimu';
import { biasharaExpert } from './experts/biashara';
import type { AkiliAnswer, AkiliQuery, DomainExpert } from './types';

/**
 * The default expert registry, in priority order. Order matters only for ties
 * (router breaks equal scores by registration order); jumla is the fallback so
 * it lives last with its baseline ~0.05 score.
 */
export const defaultExperts: DomainExpert[] = [
  afyaExpert, //   health / clinical (TibaAI, vendored) — keeps tie-priority
  fasihiExpert, // literature / reading / poetry (Kasuku, vendored)
  lughaExpert, //  Kiswahili language: translate / pronounce / grammar (Kasuku)
  sheriaExpert, // Tanzanian law & civic rights basics
  kilimoExpert, // agriculture for smallholder farmers
  elimuExpert, //  study help / education system
  biasharaExpert, // small business & financial literacy
  snilExpert, //   SNIL-as-tool: Swahili intent → code → execution
  jumlaExpert, //  greetings / about-Akili / fallback (must stay last)
];

/** The default, ready-to-use Akili instance (all nine experts). */
export const akili: Akili = createAkili(defaultExperts);

/** One-call entry point: ask the default Akili instance. */
export function askAkili(q: AkiliQuery | string): Promise<AkiliAnswer> {
  return akili.ask(q);
}

// Public surface.
export { createAkili, createAkiliSession };
export type { Akili, AkiliExchange, AkiliSession } from './router';
export { snilExpert } from './experts/snil';
export { jumlaExpert } from './experts/jumla';
export { afyaExpert } from './experts/afya';
export { fasihiExpert, lughaExpert } from './experts/fasihi';
export { sheriaExpert } from './experts/sheria';
export { kilimoExpert } from './experts/kilimo';
export { elimuExpert } from './experts/elimu';
export { biasharaExpert } from './experts/biashara';

// Re-export the contract types.
export * from './types';
