// router.ts — "Uliza Kasuku" companion: a SOVEREIGN intent router + retriever.
//
// NO external API, NO network, NO LLM. Pure deterministic TypeScript: every
// answer is derived from the local knowledge base and Kasuku's own sovereign
// engines (the rule-based translator and the rule-based phonemizer). The same
// query always yields the same answer — no randomness, no clock.
//
// Pipeline:
//   ask(query)
//     1. normalise the query (lowercase, strip punctuation, collapse spaces)
//     2. classify intent by bilingual keyword/pattern:
//          • translate   → translateToSwahili (sovereign rule + dictionary)
//          • pronounce    → phonemize (sovereign Swahili rules)
//          • otherwise     → retrieve the best KB entry by token-overlap scoring
//     3. if nothing scores above threshold → a helpful bilingual fallback

import { KNOWLEDGE, type KbEntry } from './knowledge';
import { phonemize } from '../swahili/phonemize';
import { translateToSwahili } from '../learn/translate';

export interface Answer {
  kind: 'kb' | 'translate' | 'pronounce' | 'fallback';
  text: { sw: string; en: string };
  entry?: KbEntry;
}

// ── Normalisation ─────────────────────────────────────────────────────────────
// Keep letters (incl. the meaningful Swahili ng' apostrophe and accented bridge
// scripts) and digits; turn everything else into a space; collapse runs.
const STRIP = /[^\p{L}\p{N}']+/gu;

/** Lowercase, strip punctuation to spaces, collapse whitespace. Never throws. */
function normalise(s: string): string {
  return (s ?? '')
    .toLowerCase()
    .replace(STRIP, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Tokenise a normalised string into word tokens (apostrophe-only tokens dropped). */
function tokenize(s: string): string[] {
  return normalise(s)
    .split(' ')
    .filter((t) => t.length > 0 && t !== "'");
}

// Tokens too generic to carry meaning for retrieval scoring (bilingual stoplist).
const STOP = new Set([
  // English
  'a', 'an', 'the', 'is', 'are', 'am', 'of', 'to', 'in', 'on', 'at', 'for', 'and',
  'or', 'but', 'with', 'do', 'does', 'did', 'i', 'you', 'it', 'my', 'me', 'we',
  'what', 'whats', 'how', 'can', 'about', 'tell', 'show', 'please', 'this', 'that',
  // Swahili
  'ni', 'na', 'ya', 'wa', 'za', 'la', 'kwa', 'cha', 'vya', 'au', 'lakini',
  'nini', 'gani', 'je', 'naomba', 'tafadhali', 'kuhusu', 'nataka', 'unaweza',
]);

// ── Intent keyword sets (bilingual) ───────────────────────────────────────────
// EXPLICIT command hints only — bare tokens like "maana"/"meaning"/"kiswahili"
// are deliberately excluded so KB questions ("what is the meaning of ngeli",
// "kiswahili fasaha ni nini") aren't hijacked away from the curated answers.
const TRANSLATE_HINTS = [
  'tafsiri', 'tafsiria', 'translate', 'translation', 'maana ya',
  'kwa kiingereza', 'kwa kiswahili', 'meaning of', 'say in',
];
const PRONOUNCE_HINTS = [
  'matamshi', 'tamka', 'tamko', 'pronounce', 'pronunciation', 'how do you say',
  'how to say', 'how do i say', 'unasemaje', 'natamkaje', 'natamka', 'unatamkaje',
];

// Whole-word / whole-phrase match (not raw substring) so a hint never fires
// inside a larger word (e.g. "maana" inside "maanani").
const includesAny = (hay: string, needles: string[]): boolean =>
  needles.some((n) => ` ${hay} `.includes(` ${n} `) || hay.startsWith(`${n} `) || hay.endsWith(` ${n}`));

// ── Translate intent extraction ───────────────────────────────────────────────
// Pull the actual payload (the thing to translate) out of the query by removing
// the trigger phrases. Whatever remains is the source text.
function extractPayload(normQuery: string, hints: string[]): string {
  let s = ` ${normQuery} `;
  // Remove longest hints first so "maana ya" beats "maana".
  for (const h of [...hints].sort((a, b) => b.length - a.length)) {
    s = s.split(` ${h} `).join(' ');
    // Also peel a hint sitting at the very edge of the string.
    if (s.startsWith(` ${h} `) || s.startsWith(`${h} `)) s = s.slice(h.length);
  }
  // Strip a few connective leftovers and quotes.
  return s
    .replace(/\b(of|the|word|neno|la|kwa)\b/g, ' ')
    .replace(/['"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function doTranslate(payload: string): Answer {
  if (!payload) {
    return {
      kind: 'fallback',
      text: {
        sw: 'Andika neno au sentensi unayotaka nikutafsirie, mfano: "tafsiri: I love books".',
        en: 'Type the word or sentence you want translated, e.g. "translate: I love books".',
      },
    };
  }
  const res = translateToSwahili(payload, 'en');
  const pct = Math.round(res.coverage * 100);
  const draft = res.draft || '—';
  const unknownNote =
    res.unknown.length > 0
      ? {
          sw: ` Maneno ambayo sijayapata: ${res.unknown.join(', ')}.`,
          en: ` Words I couldn't resolve: ${res.unknown.join(', ')}.`,
        }
      : { sw: '', en: '' };
  return {
    kind: 'translate',
    text: {
      sw: `Rasimu ya Kiswahili: "${draft}" (ufafanuzi ${pct}%).${unknownNote.sw} Hii ni rasimu ya kusaidia — boresha kadri unavyoona inafaa.`,
      en: `Swahili draft: "${draft}" (${pct}% resolved).${unknownNote.en} This is an assistive draft — refine it as you see fit.`,
    },
  };
}

// ── Pronounce intent ──────────────────────────────────────────────────────────
function doPronounce(payload: string): Answer {
  // Pronounce the WHOLE payload (phonemize supports phrases), not just the first
  // word, so "tamka habari za asubuhi" reads the full phrase.
  const word = payload.trim();
  if (!word) {
    return {
      kind: 'fallback',
      text: {
        sw: 'Niambie neno moja la Kiswahili nikutamkie, mfano: "tamka karibu".',
        en: 'Give me one Swahili word to pronounce, e.g. "pronounce karibu".',
      },
    };
  }
  const p = phonemize(word);
  const syl = p.syllables.join('-');
  return {
    kind: 'pronounce',
    text: {
      sw: `"${word}" inatamkwa ${syl} — ${p.ipa}. Kwa sauti: ${p.respell}.`,
      en: `"${word}" is pronounced ${syl} — ${p.ipa}. Say it like: ${p.respell}.`,
    },
  };
}

// ── KB retrieval (token-overlap scoring) ──────────────────────────────────────
const SCORE_THRESHOLD = 2;

function scoreEntry(queryTokens: string[], entry: KbEntry): number {
  // Build the entry's weighted bag of tokens once per call.
  const qWeight = 3; // a question phrasing match is the strongest signal
  const tagWeight = 3; // tags are curated topic keys
  const aWeight = 1; // answer body — weak but disambiguating

  const qTokens = new Set<string>();
  for (const q of entry.q ?? []) for (const t of tokenize(q)) qTokens.add(t);
  const tagTokens = new Set<string>();
  for (const tag of entry.tags ?? []) for (const t of tokenize(tag)) tagTokens.add(t);
  const aTokens = new Set<string>();
  for (const t of tokenize(`${entry.a?.sw ?? ''} ${entry.a?.en ?? ''}`)) aTokens.add(t);

  let score = 0;
  for (const qt of queryTokens) {
    if (STOP.has(qt)) continue;
    if (qTokens.has(qt)) score += qWeight;
    if (tagTokens.has(qt)) score += tagWeight;
    if (aTokens.has(qt)) score += aWeight;
  }
  return score;
}

function retrieve(queryTokens: string[]): { entry: KbEntry; score: number } | null {
  let best: KbEntry | null = null;
  let bestScore = 0;
  // Deterministic: KNOWLEDGE order breaks ties (first wins), no randomness.
  for (const entry of KNOWLEDGE) {
    const s = scoreEntry(queryTokens, entry);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }
  return best ? { entry: best, score: bestScore } : null;
}

// ── Public API ────────────────────────────────────────────────────────────────
const FALLBACK: Answer = {
  kind: 'fallback',
  text: {
    sw: 'Samahani, sijaelewa vizuri. Jaribu kuuliza kwa njia nyingine, au niombe nikutafsirie neno, nikutamkie neno, au niulize kuhusu Kasuku, vitabu, au waandishi.',
    en: "Sorry, I didn't quite catch that. Try rephrasing, or ask me to translate a word, pronounce a word, or ask about Kasuku, books, or creators.",
  },
};

/** Route a free-text question to a deterministic, sovereign answer. */
export function ask(query: string): Answer {
  const norm = normalise(query);
  if (!norm) return FALLBACK;

  // 1) Pronounce intent — checked before translate so "how do you say X" (which
  //    contains "say") routes to pronunciation, not translation.
  if (includesAny(norm, PRONOUNCE_HINTS)) {
    return doPronounce(extractPayload(norm, [...PRONOUNCE_HINTS, ...TRANSLATE_HINTS]));
  }

  // 2) Translate intent.
  if (includesAny(norm, TRANSLATE_HINTS)) {
    return doTranslate(extractPayload(norm, TRANSLATE_HINTS));
  }

  // 3) Knowledge-base retrieval.
  const tokens = tokenize(norm);
  const hit = retrieve(tokens);
  if (hit && hit.score >= SCORE_THRESHOLD) {
    return {
      kind: 'kb',
      text: { sw: hit.entry.a.sw, en: hit.entry.a.en },
      entry: hit.entry,
    };
  }

  // 4) Nothing good enough.
  return FALLBACK;
}

/** Seed questions for the UI — 4–6 fixed, deterministic prompts. */
export function suggestions(): { sw: string; en: string }[] {
  return [
    { sw: 'Kasuku ni nini?', en: 'What is Kasuku?' },
    { sw: 'Nawezaje kuchapisha kazi yangu?', en: 'How do I publish my work?' },
    { sw: 'Tafsiri: I love reading', en: 'Translate: I love reading' },
    { sw: 'Tamka neno "karibu"', en: 'Pronounce the word "karibu"' },
    { sw: 'Niambie kuhusu kitabu cha SILT', en: 'Tell me about the SILT book' },
    { sw: 'Nawezaje kusikiliza vitabu vya sauti?', en: 'How do I listen to audiobooks?' },
  ];
}
