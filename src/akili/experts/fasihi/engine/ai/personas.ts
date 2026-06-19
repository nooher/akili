// personas.ts — Kasuku AI's domain sub-engines, dispatched (by priority) before
// the generic catalogue/FAQ, exactly like TibaAI's Blo/Nuru/Figo/Ax.
//
//   • Mwalimu   — the Swahili tutor: live verb conjugation via the morphology engine.
//   • Mchambuzi — the literary critic: study guides + quizzes (fasihi.ts) for the
//                 Tanzanian Kiswahili/Fasihi curriculum.
//   • Msomaji   — the reading companion: discusses a work from the catalogue.
//
// Sovereign + deterministic; no network, no LLM.
import { paradigm } from '../learn/morph'
import { searchWorks } from './catalog'
import { normalise } from './nlu'
import { dhamiraOf } from './fasihi'
import { ask as routerAsk } from '../companion/router'
import { defineWord } from '../lang/dictionary'
import type { KasukuAnswer } from './index'

const includesAny = (h: string, ns: string[]) =>
  ns.some(n => ` ${h} `.includes(` ${n} `) || h.startsWith(`${n} `) || h.endsWith(` ${n}`))

const MWALIMU = ['nyambua', 'conjugate', 'conjugation', 'mnyambuliko', 'mnyambuo', 'nyakati za', 'tenses of']
const MSOMAJI = ['kuhusu', 'about', 'eleza kuhusu', 'tell me about', 'nini kuhusu', 'themes', 'dhamira', 'maudhui', 'simulia kuhusu']
// The literary-study intent: study guides, characters, summaries, quizzes.
const FASIHI = ['mwongozo', 'uchambuzi', 'chambua', 'wahusika', 'muhtasari', 'maswali', 'jaribio', 'fasihi', 'study guide', 'characters', 'summary', 'summarise', 'summarize', 'analyse', 'analyze', 'analysis', 'quiz']

// ── Mwalimu — conjugation tutor ───────────────────────────────────────────────
function verbRoot(norm: string): string {
  let s = norm
  for (const h of MWALIMU) s = s.split(h).join(' ')
  s = s.replace(/\b(verb|kitenzi|neno|the|in|present|wakati|uliopo|ya|kwa|of|kiswahili)\b/g, ' ').replace(/\s+/g, ' ').trim()
  let w = s.split(' ').filter(Boolean)[0] ?? ''
  if (w.startsWith('ku') && w.length > 4) w = w.slice(2) // strip infinitive ku-
  return w
}

export function tryMwalimu(query: string): KasukuAnswer | null {
  const n = normalise(query)
  if (!includesAny(n, MWALIMU)) return null
  const root = verbRoot(n)
  if (root.length < 2) return null
  const pos = paradigm(root, 'present')
  const neg = paradigm(root, 'present', true)
  const aff = pos.map(r => `${r.pronoun} ${r.form}`).join('; ')
  return {
    intent: 'knowledge', kind: 'kb', confidence: 'high',
    text: {
      sw: `Mnyambuliko wa kitenzi "${root}" — wakati uliopo: ${aff}. Hali ya kukanusha: ${neg.map(r => r.form).join(', ')}.`,
      en: `Conjugation of "${root}" — present tense: ${aff}. Negative: ${neg.map(r => r.form).join(', ')}.`,
    },
  }
}

// ── Msomaji — reading companion ───────────────────────────────────────────────
export function tryMsomaji(query: string): KasukuAnswer | null {
  const n = normalise(query)
  if (!includesAny(n, MSOMAJI)) return null
  let s = n
  for (const h of [...MSOMAJI].sort((a, b) => b.length - a.length)) s = s.split(h).join(' ')
  const hits = searchWorks(s, 1)
  if (!hits.length) return null
  const w = hits[0].work
  const quote = w.quote ? ` — “${w.quote}”` : ''
  return {
    intent: 'knowledge', kind: 'discover', confidence: 'high', works: [w],
    text: {
      sw: `Kuhusu “${w.title}” na ${w.author} (${w.genre}): ${w.about}${quote}`,
      en: `About “${w.title}” by ${w.author} (${w.genre}): ${w.about}${quote}`,
    },
  }
}

// ── Mchambuzi — literary critic / Fasihi study companion ──────────────────────
export function tryMchambuzi(query: string): KasukuAnswer | null {
  const n = normalise(query)
  if (!includesAny(n, FASIHI)) return null
  // Strip the intent words, then resolve the work being asked about.
  let s = n
  for (const h of [...FASIHI, ...MSOMAJI].sort((a, b) => b.length - a.length)) s = s.split(h).join(' ')
  s = s.replace(/\b(wa|ya|za|la|kwa|of|for|the|kitabu|book|story|hadithi|riwaya|tamthilia|shairi|poem)\b/g, ' ').replace(/\s+/g, ' ').trim()
  const hits = searchWorks(s || n, 1)
  if (!hits.length) return null
  const w = hits[0].work
  const themes = dhamiraOf(w)
  const themeLine = themes.length ? ` Dhamira kuu: ${themes.slice(0, 4).join(', ')}.` : ''
  return {
    intent: 'knowledge', kind: 'discover', confidence: 'high', works: [w],
    text: {
      sw: `Nimeandaa mwongozo kamili wa fasihi wa “${w.title}” na ${w.author}.${themeLine} Fungua kitabu kuona muhtasari, dhamira, wahusika, maswali ya kujadili na jaribio.`,
      en: `I’ve prepared a full Fasihi study guide for “${w.title}” by ${w.author}.${themeLine ? ` Key themes: ${themes.slice(0, 4).join(', ')}.` : ''} Open the book for the summary, themes, characters, discussion questions and a quiz.`,
    },
  }
}

// ── Mwandishi — the writing coach + language guide ────────────────────────────
// Generic writing-craft and language-concept questions ("nianzeje kuandika
// hadithi?", "how do I write a poem", "methali ni nini?"). These read as book
// searches to the classifier (hadithi/shairi/methali are also book terms), so we
// catch them here and answer from the KB BEFORE the catalogue intercepts. Terms
// tied to a SPECIFIC work (wahusika/dhamira/muhtasari) are left to Mchambuzi.
const MWANDISHI = [
  'kuandika', 'andika', 'niandike', 'niandikeje', 'nianzeje', 'uandishi',
  'ploti', 'mtazamo', 'msimulizi', 'majibizano', 'mandhari', 'kichwa', 'hariri',
  'kusahihisha', 'ushairi', 'vina', 'mizani', 'arudhi', 'tamthilia', 'ukwamo',
  'methali', 'nahau', 'misemo', 'vivumishi', 'viunganishi', 'sarufi', 'uakifishaji',
  'write', 'writing', 'poem', 'poetry', 'plot', 'dialogue', 'setting', 'edit',
  'revise', 'proverb', 'idiom', 'grammar', 'punctuation', 'conjunction', 'adjective',
]

export function tryMwandishi(query: string): KasukuAnswer | null {
  const n = normalise(query)
  if (!includesAny(n, MWANDISHI)) return null
  const a = routerAsk(query)
  if (a.kind !== 'kb') return null
  return { intent: 'knowledge', kind: 'kb', confidence: 'high', text: a.text, entry: a.entry }
}

// ── Kamusi — the bilingual dictionary (WOLD Swahili⇄English) ──────────────────
const KAMUSI = ['maana ya', 'maana', 'kamusi', 'kwa kiswahili', 'kwa kiingereza', 'in swahili', 'in english', 'neno la', 'meaning of', 'tafsiri ya neno', 'kwa kiingereza ni', 'ni nini kwa']
const cleanGloss = (s: string) => s.replace(/\(.*?\)/g, '').replace(/^(the|a|an|to)\s+/i, '').trim()

function dictTarget(n: string): string {
  let s = ` ${n} `
  for (const h of [...KAMUSI].sort((a, b) => b.length - a.length)) s = s.split(h).join(' ')
  return s.replace(/\b(ni|nini|je|word|for|of|the|kwa|ya|la|in|to|lugha|kiswahili|kiingereza|english|swahili)\b/g, ' ').replace(/[^a-zà-ÿ'\s-]/g, ' ').replace(/\s+/g, ' ').trim()
}

export function tryKamusi(query: string): KasukuAnswer | null {
  const n = normalise(query)
  if (!includesAny(n, KAMUSI)) return null
  const target = dictTarget(n)
  if (!target || target.split(' ').length > 3) return null // a word/phrase, not a sentence
  const r = defineWord(target)
  if (r.direction === 'none') return null
  if (r.direction === 'sw-en') {
    const glosses = [...new Set(r.senses.map((s) => cleanGloss(s.en)))].slice(0, 5).join('; ')
    const field = r.senses[0].field
    return {
      intent: 'knowledge', kind: 'kb', confidence: 'high',
      text: {
        sw: `“${target}” kwa Kiingereza: ${glosses}${field ? ` (${field})` : ''}.`,
        en: `“${target}” in English: ${glosses}${field ? ` (${field})` : ''}.`,
      },
    }
  }
  // en-sw
  const sw = [...new Set(r.senses.flatMap((s) => s.sw))].slice(0, 6).join(', ')
  const field = r.senses[0].field
  return {
    intent: 'knowledge', kind: 'kb', confidence: 'high',
    text: {
      sw: `“${target}” kwa Kiswahili: ${sw}${field ? ` (${field})` : ''}.`,
      en: `“${target}” in Swahili: ${sw}${field ? ` (${field})` : ''}.`,
    },
  }
}

/** Try each persona in priority order; null → let the generic engine handle it. */
export function tryPersonas(query: string): KasukuAnswer | null {
  // tryKamusi runs earlier in askKasuku (before the translate guard), so it's not repeated here.
  return tryMwalimu(query) ?? tryMwandishi(query) ?? tryMchambuzi(query) ?? tryMsomaji(query) ?? null
}
