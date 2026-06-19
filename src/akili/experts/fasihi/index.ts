// experts/fasihi/index.ts — Akili's TWO Kasuku-powered domain experts:
//
//   • fasihiExpert (domain 'fasihi') — literature, reading, poetry, study guides.
//   • lughaExpert  (domain 'lugha')  — Kiswahili language: translate, pronounce,
//                                      grammar, dictionary, tense.
//
// Both route through the vendored, SOVEREIGN Kasuku AI core (askKasuku): pure,
// deterministic, offline TypeScript — no external LLM, no network. The engine
// (engine/) is a metadata-only vendor of kasuku/src/lib/ai + companion; see
// engine/VENDORED.md for what was intentionally excluded (ml.ts, full book text).

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliQuery,
  AkiliSource,
  DomainExpert,
} from '../../types';
import { askKasuku, type KasukuAnswer } from './engine/ai/index';

// ── matching helpers ──────────────────────────────────────────────────────────
const STRIP = /[^\p{L}\p{N}']+/gu;
const norm = (s: string): string =>
  (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ').replace(/\s+/g, ' ').trim();

/** Whole-word / phrase membership (so a cue never fires inside a larger word). */
const includesAny = (hay: string, needles: string[]): boolean =>
  needles.some((n) => ` ${hay} `.includes(` ${n} `) || hay.startsWith(`${n} `) || hay.endsWith(` ${n}`));

/**
 * Score = saturating count of distinct cue hits, mapped to 0..1. Two or more
 * strong cues → confident; one cue → moderate; none → 0. Cheap and deterministic.
 */
function cueScore(text: string, cues: string[], cap = 0.92): number {
  const n = norm(text);
  if (!n) return 0;
  let hits = 0;
  for (const c of cues) {
    if (` ${n} `.includes(` ${c} `) || n.startsWith(`${c} `) || n.endsWith(` ${c}`) || n === c) hits++;
    if (hits >= 3) break;
  }
  if (hits === 0) return 0;
  // 1 hit → 0.55, 2 → 0.78, 3+ → cap.
  return Math.min(cap, 0.32 + hits * 0.23);
}

// ── Fasihi (literature / reading / poetry) cues ───────────────────────────────
const FASIHI_CUES = [
  // Kiswahili
  'kitabu', 'vitabu', 'soma', 'nisomee', 'kusoma', 'hadithi', 'riwaya', 'shairi',
  'mashairi', 'ushairi', 'mshairi', 'mwandishi', 'fasihi', 'methali', 'dhamira',
  'maudhui', 'wahusika', 'muhtasari', 'mwongozo', 'uchambuzi', 'chambua', 'jaribio',
  'nipendekezee', 'pendekeza', 'tamthilia', 'dondoo', 'maktaba', 'simulizi',
  // English
  'book', 'books', 'read', 'reading', 'story', 'novel', 'poem', 'poetry', 'poet',
  'author', 'writer', 'theme', 'themes', 'character', 'characters', 'literature',
  'summary', 'study guide', 'quiz', 'recommend', 'plot', 'verse', 'proverb',
];

// ── Lugha (Kiswahili language) cues ───────────────────────────────────────────
const LUGHA_CUES = [
  // Kiswahili
  'tafsiri', 'tafsiria', 'maana ya', 'maana', 'matamshi', 'tamka', 'tamko',
  'unasemaje', 'unatamkaje', 'natamkaje', 'nyakati', 'wakati', 'sarufi', 'kitenzi',
  'vitenzi', 'mnyambuliko', 'nyambua', 'ngeli', 'kamusi', 'neno', 'maneno',
  'kwa kiingereza', 'kwa kiswahili', 'methali', 'nahau',
  // English
  'translate', 'translation', 'meaning of', 'meaning', 'pronounce', 'pronunciation',
  'how do you say', 'how to say', 'tense', 'tenses', 'grammar', 'verb', 'conjugate',
  'conjugation', 'in swahili', 'in english', 'word for', 'spell',
];

// ── KasukuAnswer → AkiliAnswer mapping ────────────────────────────────────────
function clampConf(c: KasukuAnswer['confidence']): AkiliConfidence {
  return c === 'high' || c === 'medium' ? c : 'low';
}

/** Source label crediting the sovereign engine that produced the answer. */
function engineSources(a: KasukuAnswer): AkiliSource[] {
  const sources: AkiliSource[] = [];
  switch (a.kind) {
    case 'pronounce':
      sources.push({ label: 'Kasuku Phonemizer', ref: 'sovereign Swahili pronunciation rules' });
      break;
    case 'translate':
      sources.push({ label: 'Kasuku Translate', ref: 'rule + Kamusi (WOLD, CC-BY)' });
      break;
    case 'discover':
      sources.push({ label: 'Kasuku Maktaba', ref: 'sovereign literary catalogue' });
      break;
    case 'kb':
      sources.push({ label: 'Kasuku KB', ref: a.entry?.id ? `entry:${a.entry.id}` : 'companion knowledge base' });
      break;
    default:
      sources.push({ label: 'Kasuku', ref: 'sovereign offline engine' });
  }
  return sources;
}

/** Build a common AkiliAnswer from a KasukuAnswer for the given domain/expert. */
function toAkiliAnswer(
  a: KasukuAnswer,
  domain: 'fasihi' | 'lugha',
  expert: string,
): AkiliAnswer {
  const sources = engineSources(a);

  // Surface book titles in the text + as sources when the answer is backed by works.
  let sw = a.text.sw;
  let en: string | undefined = a.text.en || undefined;
  if (a.works?.length) {
    for (const w of a.works) sources.push({ label: w.title, ref: `${w.author} — ${w.genre}` });
    // If the engine text didn't already list them, append a compact title line.
    const titleList = a.works.map((w) => `“${w.title}”`).join(', ');
    if (!sw.includes(a.works[0].title)) {
      sw = `${sw} (${titleList})`.trim();
      if (en) en = `${en} (${titleList})`.trim();
    }
  }

  return {
    domain,
    expert,
    text: en ? { sw, en } : { sw },
    confidence: clampConf(a.confidence),
    sources,
    data: a,
  };
}

// ── fasihiExpert ──────────────────────────────────────────────────────────────
export const fasihiExpert: DomainExpert = {
  id: 'fasihi-kasuku',
  domain: 'fasihi',
  label: 'Fasihi',
  match(q: AkiliQuery): number {
    return cueScore(q.text, FASIHI_CUES);
  },
  answer(q: AkiliQuery): AkiliAnswer {
    const a = askKasuku(q.text);
    return toAkiliAnswer(a, 'fasihi', 'fasihi-kasuku');
  },
};

// ── lughaExpert ───────────────────────────────────────────────────────────────
export const lughaExpert: DomainExpert = {
  id: 'lugha-kasuku',
  domain: 'lugha',
  label: 'Lugha',
  match(q: AkiliQuery): number {
    return cueScore(q.text, LUGHA_CUES);
  },
  answer(q: AkiliQuery): AkiliAnswer {
    const a = askKasuku(q.text);
    return toAkiliAnswer(a, 'lugha', 'lugha-kasuku');
  },
};

export { askKasuku };
export type { KasukuAnswer };
export { includesAny };
