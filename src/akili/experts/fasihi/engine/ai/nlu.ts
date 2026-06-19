// nlu.ts — intent detection for Kasuku AI (sovereign, deterministic).
// Mirrors TibaAI's NLU: normalise → detect intent → extract payload.

export type Intent =
  | 'pronounce'   // matamshi — handled by the phonemizer (via router)
  | 'translate'   // tafsiri — handled by the rule translator (via router)
  | 'discover'    // find / recommend books from the catalogue
  | 'knowledge'   // FAQ / Kiswahili / fasihi (via router KB)
  | 'fallback'

const STRIP = /[^\p{L}\p{N}']+/gu
export function normalise(s: string): string {
  return (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ').replace(/\s+/g, ' ').trim()
}

const includesAny = (hay: string, needles: string[]): boolean =>
  needles.some(n => ` ${hay} `.includes(` ${n} `) || hay.startsWith(`${n} `) || hay.endsWith(` ${n}`))

const PRONOUNCE = ['matamshi', 'tamka', 'tamko', 'pronounce', 'pronunciation', 'how do you say', 'how to say', 'unasemaje', 'natamkaje', 'unatamkaje']
const TRANSLATE = ['tafsiri', 'tafsiria', 'translate', 'translation', 'maana ya', 'kwa kiingereza', 'kwa kiswahili', 'meaning of', 'say in']
const DISCOVER = [
  'kitabu', 'vitabu', 'book', 'books', 'soma nini', 'nisomee', 'nipendekezee', 'pendekeza',
  'recommend', 'suggest', 'find a book', 'tafuta kitabu', 'kitabu cha', 'vitabu vya',
  'books like', 'kama', 'similar', 'kitu cha kusoma', 'something to read', 'novel', 'riwaya',
  'hadithi', 'shairi', 'mashairi', 'poetry', 'author', 'mwandishi',
]

/** Classify a raw query into an intent. Pronounce/translate win first (explicit). */
export function classify(query: string): Intent {
  const n = normalise(query)
  if (!n) return 'fallback'
  if (includesAny(n, PRONOUNCE)) return 'pronounce'
  if (includesAny(n, TRANSLATE)) return 'translate'
  if (includesAny(n, DISCOVER)) return 'discover'
  return 'knowledge'
}

/** Quick check used to let an explicit book query pre-empt the FAQ KB. */
export const isDiscover = (query: string): boolean => includesAny(normalise(query), DISCOVER)
