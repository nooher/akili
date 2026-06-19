// Swahili Phonemizer — Kasuku's own, sovereign pronunciation engine. No external
// API, no model: Standard Swahili is ~95% phonetically regular, so we DERIVE the
// pronunciation of any word from rules rather than storing a frozen 10k list.
//
// For each word we produce:
//   • syllables  — open CV syllables (display: "ka-ri-bu")
//   • ipa        — narrow-ish IPA with penultimate stress (display/teaching)
//   • respell    — ASCII respelling a generic (non-Swahili) TTS voice reads close
//                  to native Swahili (the stressed syllable is UPPERCASED)
//
// Rules implemented:
//   • 5 pure vowels: a=ɑ e=ɛ i=i o=ɔ u=u — each vowel is its own syllable (hiatus,
//     no diphthongs): "kuandika" → ku-a-ndi-ka.
//   • Digraphs that are ONE sound: ch ʃ→tʃ, sh ʃ, ny ɲ, th θ, dh ð, gh ɣ, kh x.
//   • ng'  (apostrophe) = ŋ  (pure velar nasal)   ← must NEVER be confused with…
//   • ng   (no apostrophe) = ŋɡ (prenasalized g).
//   • Homorganic prenasalized onsets: mb mp mv mf / nd nt nz ns nj nch / ng nk —
//     the nasal attaches to the following stop. A NON-homorganic nasal+consonant
//     (m+t, m+z, n+b…) leaves the nasal SYLLABIC: "mtoto" → m-to-to.
//   • Stress: the penultimate (vowel) syllable.
//
// The few cases rules can't derive (irregular names, loanwords) live in
// exceptions.ts and are looked up first.

import { PRONUNCIATION_EXCEPTIONS } from './exceptions';

export interface Pronunciation {
  word: string;
  syllables: string[];
  ipa: string;
  respell: string;
  /** Index of the stressed syllable (penultimate), or -1 for a monosyllable. */
  stress: number;
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
// Multi-character graphemes, longest first so "ng'" beats "ng" beats "n".
const GRAPHEMES = ["ng'", 'ch', 'sh', 'ny', 'th', 'dh', 'gh', 'kh', 'ng'];

// Homorganic nasal+stop clusters → the nasal is part of the next syllable's onset
// (prenasalized), NOT a syllable of its own.
const PRENASAL = new Set(['mb', 'mp', 'mv', 'mf', 'nd', 'nt', 'nz', 'ns', 'nj', 'ng', 'nk', 'nch']);

const IPA_VOWEL: Record<string, string> = { a: 'ɑ', e: 'ɛ', i: 'i', o: 'ɔ', u: 'u' };
const IPA_CONS: Record<string, string> = {
  "ng'": 'ŋ', ng: 'ŋɡ', ny: 'ɲ', ch: 'tʃ', sh: 'ʃ', th: 'θ', dh: 'ð', gh: 'ɣ', kh: 'x',
  b: 'b', d: 'd', f: 'f', g: 'ɡ', h: 'h', j: 'dʒ', k: 'k', l: 'l', m: 'm', n: 'n',
  p: 'p', r: 'ɾ', s: 's', t: 't', v: 'v', w: 'w', y: 'j', z: 'z',
};
// ASCII respelling: vowels expanded so a generic voice says them the Swahili way.
const RE_VOWEL: Record<string, string> = { a: 'ah', e: 'eh', i: 'ee', o: 'oh', u: 'oo' };
const RE_CONS: Record<string, string> = {
  "ng'": 'ng', ng: 'ng', ny: 'ny', ch: 'ch', sh: 'sh', th: 'th', dh: 'th', gh: 'g', kh: 'k',
  b: 'b', d: 'd', f: 'f', g: 'g', h: 'h', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n',
  p: 'p', r: 'r', s: 's', t: 't', v: 'v', w: 'w', y: 'y', z: 'z',
};

/** Break a word into ordered graphemes (multi-char units recognised). */
function toGraphemes(word: string): string[] {
  const g: string[] = [];
  let i = 0;
  while (i < word.length) {
    const three = word.slice(i, i + 3);
    const two = word.slice(i, i + 2);
    if (GRAPHEMES.includes(three)) { g.push(three); i += 3; }
    else if (GRAPHEMES.includes(two)) { g.push(two); i += 2; }
    else { g.push(word[i]); i += 1; }
  }
  return g;
}

const isVowel = (g: string) => g.length === 1 && VOWELS.has(g);

/** Split one lowercase word into syllable grapheme-groups. */
function syllabify(word: string): string[][] {
  const g = toGraphemes(word);
  const syls: string[][] = [];
  let onset: string[] = [];
  let i = 0;
  while (i < g.length) {
    const cur = g[i];
    if (isVowel(cur)) {
      syls.push([...onset, cur]); // onset + nucleus closes a syllable
      onset = [];
      i++;
    } else {
      // A nasal with no vowel before the next consonant: syllabic unless it forms
      // a homorganic prenasalized onset with that consonant.
      const next = g[i + 1];
      const nasalLeading = (cur === 'm' || cur === 'n') && onset.length === 0;
      // A glide (w/y) after the nasal is an onset cluster ("mwa", "nya"), never a
      // trigger for a syllabic nasal.
      const nextIsCons = next !== undefined && !isVowel(next) && next !== 'w' && next !== 'y';
      if (nasalLeading && nextIsCons) {
        const cluster = (cur + next).toLowerCase();
        const cluster3 = next === 'ch' ? cur + 'ch' : '';
        if (PRENASAL.has(cluster) || PRENASAL.has(cluster3) || (cur + (next || '')) === "ng'") {
          onset.push(cur); i++; // prenasalized: nasal joins the next onset
        } else {
          syls.push([cur]); i++; // syllabic nasal — its own syllable
        }
      } else {
        onset.push(cur); i++;
      }
    }
  }
  if (onset.length) syls.push(onset); // trailing consonant(s) — rare; keep them voiced
  return syls;
}

function ipaForSyllable(group: string[]): string {
  return group.map((x) => (isVowel(x) ? IPA_VOWEL[x] : (IPA_CONS[x] ?? x))).join('');
}
function respellForSyllable(group: string[]): string {
  return group.map((x) => (isVowel(x) ? RE_VOWEL[x] : (RE_CONS[x] ?? x))).join('');
}

/** Pronounce a single word (already lowercase, letters/apostrophe only). */
function pronounceWord(word: string): Pronunciation {
  const ex = PRONUNCIATION_EXCEPTIONS[word];
  if (ex) return { word, stress: -1, ...ex };

  const groups = syllabify(word);
  const syllables = groups.map((g) => g.join(''));
  // Stress = penultimate syllable that carries a vowel (skip a trailing syllabic
  // nasal for the count). For 1 syllable, no marked stress.
  const vowelIdx = groups.map((g, i) => (g.some(isVowel) ? i : -1)).filter((x) => x >= 0);
  const stress = vowelIdx.length >= 2 ? vowelIdx[vowelIdx.length - 2] : -1;

  const ipa = groups.map((g, i) => (i === stress ? 'ˈ' : '') + ipaForSyllable(g)).join('');
  const respell = groups.map((g, i) => {
    const r = respellForSyllable(g);
    return i === stress ? r.toUpperCase() : r;
  }).join('-');

  return { word, syllables, ipa: `/${ipa}/`, respell, stress };
}

/** Public: pronounce a word or phrase. Phrases are pronounced word-by-word. */
export function phonemize(input: string): Pronunciation {
  // Normalise curly/modifier apostrophes to a straight ' so the meaningful ng'
  // digraph survives lowercasing, stripPunct and exception lookup.
  const clean = input.trim().toLowerCase().replace(/[’‘ʼˈ`´]/g, "'");
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 1) return pronounceWord(stripPunct(words[0] ?? ''));

  const parts = words.map((w) => pronounceWord(stripPunct(w)));
  return {
    word: clean,
    syllables: parts.flatMap((p) => p.syllables),
    ipa: '/' + parts.map((p) => p.ipa.replace(/\//g, '')).join(' ') + '/',
    respell: parts.map((p) => p.respell).join('  '),
    stress: -1,
  };
}

function stripPunct(w: string): string {
  // Keep letters + the meaningful ng' apostrophe; drop surrounding punctuation.
  return w.replace(/^[^a-z']+|[^a-z']+$/g, '');
}

/** SMOOTH spoken form for a fallback TTS voice — no syllable hyphens, no stress
 *  capitals (both make synthetic voices choppy / shout). One space between words.
 *  Used ONLY when the device has no real Swahili voice. */
export function ttsText(input: string): string {
  return phonemize(input).respell.replace(/-/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
}
