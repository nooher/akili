// followups.ts — pure suggestion logic for the Akili console. After Akili
// answers, we offer 2–3 clickable follow-up prompts relevant to the domain that
// handled the question, so the conversation keeps flowing in Swahili. No React,
// no engine imports — just a static domain→suggestions map and a tiny selector,
// kept here so it's trivially unit-testable.

import type { AkiliDomain } from '../akili/types';

/**
 * Static, curated follow-ups per domain. Swahili-first, short, and phrased as
 * the user's next natural question. Order matters: the most useful comes first.
 */
const FOLLOWUPS: Record<AkiliDomain, string[]> = {
  afya: [
    'Dalili za hatari ni zipi?',
    'Tiba yake ni nini?',
    'Naweza kujikinga vipi?',
  ],
  fasihi: [
    'Nipe muhtasari wake',
    'Nipendekezee kitabu kingine',
    'Mwandishi wake ni nani?',
  ],
  lugha: [
    'Nipe mfano wa sentensi',
    'Tafsiri kwa Kiingereza',
    'Nieleze sarufi yake',
  ],
  sheria: [
    'Haki zangu ni zipi?',
    'Nifuate utaratibu gani?',
    'Naweza kupata msaada wapi?',
  ],
  kilimo: [
    'Mbinu bora ni zipi?',
    'Nidhibiti vipi wadudu?',
    'Msimu mzuri wa kupanda ni upi?',
  ],
  elimu: [
    'Nieleze kwa mfano',
    'Nipe zoezi la kujifunza',
    'Naweza kusoma wapi zaidi?',
  ],
  biashara: [
    'Nianzeje biashara hii?',
    'Nipange bajeti vipi?',
    'Napata mtaji wapi?',
  ],
  snil: [
    'Nionyeshe Python yake',
    'Nieleze namna ilivyofanya kazi',
    'Jaribu mfano mwingine',
  ],
  jumla: [
    'Akili inaweza kufanya nini?',
    'Niulize swali la afya',
    'Nionyeshe mfano wa SNIL',
  ],
};

/** Max follow-up chips we ever show under an answer. */
export const MAX_FOLLOWUPS = 3;

/**
 * Return the follow-up suggestions for a given answered domain.
 *
 * Pure + defensive: unknown domains fall back to the general (`jumla`) set, and
 * the result is capped at MAX_FOLLOWUPS. A fresh array is returned each call so
 * callers can safely treat it as their own.
 *
 * @param domain  The domain that handled the answer (AkiliAnswer.domain).
 * @param limit   Optional cap (defaults to MAX_FOLLOWUPS, clamped to [0, len]).
 */
export function followupsFor(domain: AkiliDomain, limit = MAX_FOLLOWUPS): string[] {
  const list = FOLLOWUPS[domain] ?? FOLLOWUPS.jumla;
  const n = Math.max(0, Math.min(limit, list.length));
  return list.slice(0, n);
}
