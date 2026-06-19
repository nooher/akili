// dictionary.ts — Kasuku Kamusi: a sovereign bilingual Swahili⇄English dictionary
// built on the WOLD Swahili vocabulary (1,414 meanings / 1,830 words, Schadeberg,
// CC-BY). Word-level translation BOTH ways plus thematic vocab by semantic field.
// Pure, deterministic, offline. Feeds the companion ("maana ya…", "… kwa
// Kiswahili") and strengthens translation. Attribution: WOLD_ATTRIBUTION.

import { WOLD_SW, WOLD_ATTRIBUTION, type WoldEntry } from './wold_sw';

export interface DictSense { en: string; sw: string[]; field: string; cat: string }
export { WOLD_ATTRIBUTION };

const normEn = (s: string) => (s || '').toLowerCase().replace(/\(.*?\)/g, '').replace(/^(the|a|an|to)\s+/, '').replace(/[^a-z\s'-]/g, '').replace(/\s+/g, ' ').trim();
const normSw = (s: string) => (s || '').toLowerCase().replace(/^[-]+/, '').replace(/[^a-zà-ÿ']/g, '').trim();

// Lazy indexes (built once).
let EN: Map<string, WoldEntry[]> | null = null;
let SW: Map<string, WoldEntry[]> | null = null;
function build() {
  EN = new Map(); SW = new Map();
  for (const e of WOLD_SW) {
    const ek = normEn(e.en);
    if (ek) { const a = EN.get(ek) || []; a.push(e); EN.set(ek, a); }
    for (const w of e.sw) {
      const wk = normSw(w);
      if (wk) { const a = SW.get(wk) || []; if (!a.includes(e)) a.push(e); SW.set(wk, a); }
    }
  }
}
const enMap = () => (EN || (build(), EN!));
const swMap = () => (SW || (build(), SW!));

const toSense = (e: WoldEntry): DictSense => ({ en: e.en, sw: e.sw, field: e.field, cat: e.cat });

/** English word/meaning → Swahili. Exact normalized match, then word-contains. */
export function toSwahili(word: string): DictSense[] {
  const k = normEn(word);
  if (!k) return [];
  const exact = enMap().get(k);
  if (exact?.length) return exact.map(toSense);
  const hits: WoldEntry[] = [];
  for (const [key, arr] of enMap()) {
    if (key === k) continue;
    const words = key.split(' ');
    if (words.includes(k)) hits.push(...arr);
  }
  return hits.slice(0, 6).map(toSense);
}

/** Swahili word → English meaning(s). */
export function toEnglish(word: string): DictSense[] {
  const k = normSw(word);
  if (!k) return [];
  return (swMap().get(k) || []).map(toSense);
}

export type DictResult = { direction: 'sw-en' | 'en-sw' | 'none'; query: string; senses: DictSense[] };

/** Auto-detect direction: prefer a Swahili headword hit, else English→Swahili. */
export function defineWord(word: string): DictResult {
  const q = (word || '').trim();
  const sw = toEnglish(q);
  if (sw.length) return { direction: 'sw-en', query: q, senses: sw };
  const en = toSwahili(q);
  if (en.length) return { direction: 'en-sw', query: q, senses: en };
  return { direction: 'none', query: q, senses: [] };
}

/** All Swahili words in a semantic field (thematic vocabulary for Jifunze). */
export function byField(field: string, limit = 40): DictSense[] {
  const f = field.toLowerCase();
  return WOLD_SW.filter((e) => e.field.toLowerCase().includes(f)).slice(0, limit).map(toSense);
}

export const dictSize = () => WOLD_SW.length;
