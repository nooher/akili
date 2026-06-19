// Kasuku AI — the sovereign engine spine.
//
// One offline, deterministic entry point — askKasuku(query) — behind every
// surface of Kasuku, mirroring how THOS routes everything through askTibaAI.
// It composes the existing sovereign pieces:
//   • companion/router  → pronounce (phonemizer), translate (rule translator), FAQ KB
//   • ai/catalog        → find + recommend across the 34-book library
// No external API, no LLM, no network, no randomness.

import { ask as routerAsk, type Answer as RouterAnswer } from '../companion/router'
import { classify, normalise } from './nlu'
import { searchWorks, recommendLike, topWorks, catalogSize } from './catalog'
import { tryPersonas, tryKamusi } from './personas'
import type { Work } from './types'
import type { KbEntry } from '../companion/knowledge'

export const KASUKU_AI_VERSION = '0.1.0'

export type AnswerKind = 'kb' | 'translate' | 'pronounce' | 'discover' | 'fallback'

export interface KasukuAnswer {
  intent: ReturnType<typeof classify>
  kind: AnswerKind
  text: { sw: string; en: string }
  /** Book references backing a discover answer (the "sources"). */
  works?: Work[]
  /** FAQ entry backing a knowledge answer. */
  entry?: KbEntry
  confidence: 'high' | 'medium' | 'low'
}

function wrap(a: RouterAnswer): KasukuAnswer {
  const intent = a.kind === 'kb' ? 'knowledge' : a.kind === 'fallback' ? 'fallback' : a.kind
  return { intent, kind: a.kind, text: a.text, entry: a.entry, confidence: a.kind === 'fallback' ? 'low' : 'high' }
}

function discover(query: string, allowDefault = false): KasukuAnswer | null {
  const hits = searchWorks(query, 5)
  if (!hits.length) {
    if (!allowDefault) return null
    // Generic "give me something to read" — offer a browse set rather than nothing.
    const top = topWorks(5)
    if (!top.length) return null
    const list = top.map(w => `“${w.title}” — ${w.author}`).join('; ')
    return {
      intent: 'discover', kind: 'discover', confidence: 'medium', works: top,
      text: {
        sw: `Hapa kuna vitabu vya kuanzia kwenye maktaba: ${list}. Niambie aina au mwandishi nikupunguzie.`,
        en: `Here are some books to start with: ${list}. Tell me a genre or author to narrow it down.`,
      },
    }
  }
  const top = hits.map(h => h.work)
  const lead = top[0]
  const more = recommendLike(lead, 3)
  const list = top.map(w => `“${w.title}” — ${w.author}`).join('; ')
  const recoSw = more.length ? ` Ukipenda hii, jaribu pia: ${more.map(w => `“${w.title}”`).join(', ')}.` : ''
  const recoEn = more.length ? ` If you like it, also try: ${more.map(w => `“${w.title}”`).join(', ')}.` : ''
  return {
    intent: 'discover',
    kind: 'discover',
    confidence: hits[0].score >= 5 ? 'high' : 'medium',
    works: top,
    text: {
      sw: `Nimepata vitabu ${top.length} kwenye maktaba: ${list}.${recoSw}`,
      en: `Found ${top.length} book(s) in the library: ${list}.${recoEn}`,
    },
  }
}

/**
 * Route any free-text question to a deterministic, sovereign answer.
 * Order: explicit book intent → router (pronounce/translate/FAQ) → catalogue
 * fallback (so book queries the FAQ can't answer still surface real books).
 */
export function askKasuku(query: string): KasukuAnswer {
  if (!normalise(query)) return wrap(routerAsk(query))

  const intent = classify(query)

  // Dictionary (Kamusi) — a single-word "maana ya X" / "X kwa Kiswahili" must beat
  // the generic translator, which would otherwise treat the word as a sentence.
  const kamusi = tryKamusi(query)
  if (kamusi) return kamusi

  // Explicit pronounce/translate always win (handled by the proven router).
  if (intent === 'pronounce' || intent === 'translate') return wrap(routerAsk(query))

  // Domain personas — Mwalimu (grammar) + Msomaji (book discussion).
  const persona = tryPersonas(query)
  if (persona) return persona

  // Explicit book intent → catalogue (with a browse-set fallback).
  if (intent === 'discover') {
    const d = discover(query, true)
    if (d) return d
  }

  // A STRONG catalogue hit (the query names a real title/author) beats a weak
  // FAQ token-overlap match — so "What the Fish Knew" opens the book.
  const strong = discover(query, false)
  if (strong && strong.confidence === 'high') return strong

  // FAQ / Kiswahili / fasihi — the router KB.
  const a = routerAsk(query)
  if (a.kind !== 'fallback') return wrap(a)

  // KB didn't match — try the catalogue before giving up.
  if (strong) return strong
  return wrap(a)
}

// ── Speech helpers (pure; the side-effectful speaker lives in ai/voice.ts so the
//    engine + tests never pull the Capacitor TTS dependency) ──────────────────
const SPEAK_STRIP = /\b(tamka|tamko|matamshi|pronounce|pronunciation|how do you say|how to say|say|natamka|unatamkaje|unasemaje|tafsiri|translate)\b[:]?/gi

/** The exact thing to vocalise for a pronounce answer — the user's target word. */
export function pronounceTarget(query: string): string {
  return (query ?? '').replace(SPEAK_STRIP, ' ').replace(/["':]/g, ' ').replace(/\s+/g, ' ').trim()
}

/** What to speak + which language, for any answer. Pure → unit-testable. */
export function speechFor(a: KasukuAnswer, query: string, prefersSwahili: boolean): { text: string; lang: 'sw' | 'en' | 'auto' } {
  if (a.kind === 'pronounce') return { text: pronounceTarget(query) || query, lang: 'sw' }
  return { text: prefersSwahili ? a.text.sw : a.text.en, lang: 'auto' }
}

export { classify, catalogSize }
export type { Work }
