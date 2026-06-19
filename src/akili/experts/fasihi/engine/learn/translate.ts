// translate.ts — Kasuku's sovereign translation assistant (Tabaka A).
//
// NO external API / LLM. A rule + dictionary engine that produces an ASSISTIVE
// Swahili DRAFT from a source text (English / Chinese / Arabic / Russian),
// with a glossary and a list of words it could not resolve — the creator then
// refines. Honest: a draft aid, not a finished literary translation. The bundled
// lexicon auto-includes every word taught in the Jifunze curriculum, plus a
// curated core of common words, function words and phrases.

import type { Bridge, TransLang } from './types';
import { WOLD_SW } from '../lang/wold_sw';
import { CORE_FR, CORE_PT } from './lexfrpt';
import { conjugate, type Person } from './morph';

// VENDORED into Akili: the source pulled the Jifunze curriculum (LEVELS, from
// learn/content.ts → darasa.ts) to auto-include every taught word's gloss and
// noun-class. To stay Pi-light and self-contained, Akili drops that curriculum
// dependency — the curated CORE_EN dictionary + WOLD (CC-BY) gap-filler already
// cover assistive translation. LEVELS is therefore an empty, typed stand-in:
// the curriculum-augmentation loops below become no-ops, nothing else changes.
interface _Vocab { sw: string; cls?: number; gloss: Partial<Record<Bridge, string>> }
interface _Lesson { vocab: _Vocab[] }
interface _Unit { lessons: _Lesson[] }
interface _Level { units: _Unit[] }
const LEVELS: _Level[] = [];

const COURSE_BRIDGES = new Set<TransLang>(['en', 'ar', 'zh', 'ru']);

// WOLD (CC-BY) Swahili vocabulary as a low-priority English→Swahili gap-filler:
// ~1,800 words behind the curated + Jifunze lexicon. Single-word glosses only
// (multiword meanings are handled by the phrase table), verbs get the ku- stem.
let WOLD_EN: Record<string, string> | null = null;
function woldEn(): Record<string, string> {
  if (WOLD_EN) return WOLD_EN;
  const m: Record<string, string> = {};
  for (const e of WOLD_SW) {
    // WOLD glosses are often phrased ("the mountain or hill", "the land of …").
    // Index EVERY single-word alternative (mountain AND hill, river AND stream)
    // so more English words resolve from the same CC-BY data.
    let sw = (e.sw[0] || '').replace(/\s*\(\d+\)\s*$/, '').trim();
    if (!sw) continue;
    sw = /verb/i.test(e.cat) && sw.startsWith('-') ? 'ku' + sw.slice(1) : sw.replace(/^-/, '');
    if (!sw) continue;
    const base = e.en.toLowerCase().replace(/\(.*?\)/g, '').replace(/^(the|a|an|to)\s+/, '').trim();
    for (const alt of base.split(/\bor\b|\band\b|\bof\b|,|;/)) {
      const key = alt.replace(/[^a-z\s'-]/g, '').replace(/\s+/g, ' ').trim();
      if (key && !key.includes(' ') && !(key in m)) m[key] = sw;
    }
  }
  WOLD_EN = m;
  return m;
}

// ── Phrase table (multiword units, matched first) ─────────────────────────────
const PHRASES: Record<TransLang, Record<string, string>> = {
  en: {
    'thank you very much': 'asante sana', 'thank you': 'asante', 'good morning': 'habari za asubuhi',
    'good evening': 'habari za jioni', 'how are you': 'habari', 'my name is': 'jina langu ni',
    'see you tomorrow': 'tutaonana kesho', 'excuse me': 'samahani', 'where are you': 'uko wapi',
    'how much': 'bei gani', 'i want': 'nataka', 'i love': 'napenda',
  },
  fr: {
    // Keys are apostrophe-free (norm() strips apostrophes before matching).
    'merci beaucoup': 'asante sana', 'merci': 'asante', 'bonjour': 'habari za asubuhi', 'bonsoir': 'habari za jioni',
    'comment allez vous': 'habari', 'comment ça va': 'habari', 'je mappelle': 'jina langu ni',
    'à demain': 'tutaonana kesho', 'excusez moi': 'samahani', 'sil vous plaît': 'tafadhali', 'je veux': 'nataka', 'jaime': 'napenda',
  },
  pt: {
    'muito obrigado': 'asante sana', 'obrigado': 'asante', 'bom dia': 'habari za asubuhi', 'boa noite': 'habari za jioni',
    'como está': 'habari', 'como vai': 'habari', 'o meu nome é': 'jina langu ni', 'até amanhã': 'tutaonana kesho',
    'com licença': 'samahani', 'por favor': 'tafadhali', 'eu quero': 'nataka', 'eu amo': 'napenda',
  },
  ar: { 'شكرا جزيلا': 'asante sana', 'صباح الخير': 'habari za asubuhi', 'كيف حالك': 'habari' },
  zh: { '早上好': 'habari za asubuhi', '你好吗': 'habari' },
  ru: { 'доброе утро': 'habari za asubuhi', 'как дела': 'habari', 'большое спасибо': 'asante sana' },
};

// ── Curated core dictionary (English source → Swahili) ────────────────────────
const CORE_EN: Record<string, string> = {
  i: 'mimi', you: 'wewe', he: 'yeye', she: 'yeye', we: 'sisi', they: 'wao',
  my: 'yangu', your: 'yako', his: 'yake', her: 'yake', our: 'yetu', their: 'yao',
  the: '', a: '', an: '', and: 'na', or: 'au', but: 'lakini', with: 'na', of: 'ya',
  is: 'ni', are: 'ni', am: 'ni', not: 'si', no: 'hapana', yes: 'ndiyo',
  in: 'ndani', on: 'juu', to: 'kwa', at: 'kwenye', for: 'kwa', from: 'kutoka',
  this: 'hii', that: 'hiyo', here: 'hapa', there: 'pale', where: 'wapi', what: 'nini', who: 'nani', when: 'lini', how: 'vipi',
  very: 'sana', more: 'zaidi', all: 'yote', many: 'mengi', good: 'nzuri', bad: 'mbaya', big: 'kubwa', small: 'ndogo', new: 'mpya',
  eat: 'kula', drink: 'kunywa', go: 'kwenda', come: 'kuja', sleep: 'kulala', read: 'kusoma', write: 'kuandika',
  love: 'kupenda', like: 'kupenda', want: 'kutaka', know: 'kujua', see: 'kuona', hear: 'kusikia', speak: 'kusema', say: 'kusema',
  give: 'kutoa', take: 'kuchukua', do: 'kufanya', make: 'kutengeneza', work: 'kufanya kazi', help: 'kusaidia', learn: 'kujifunza', teach: 'kufundisha',
  person: 'mtu', people: 'watu', friend: 'rafiki', teacher: 'mwalimu', student: 'mwanafunzi', child: 'mtoto', man: 'mwanaume', woman: 'mwanamke',
  mother: 'mama', father: 'baba', brother: 'kaka', sister: 'dada', family: 'familia',
  home: 'nyumbani', house: 'nyumba', school: 'shule', market: 'soko', city: 'jiji', country: 'nchi', world: 'dunia',
  book: 'kitabu', books: 'vitabu', water: 'maji', food: 'chakula', tea: 'chai', money: 'pesa', name: 'jina', day: 'siku', time: 'wakati', year: 'mwaka',
  language: 'lugha', swahili: 'Kiswahili', story: 'hadithi', word: 'neno', words: 'maneno', heart: 'moyo', life: 'maisha',
  today: 'leo', tomorrow: 'kesho', yesterday: 'jana', morning: 'asubuhi', night: 'usiku',
  one: 'moja', two: 'mbili', three: 'tatu', four: 'nne', five: 'tano',
  please: 'tafadhali', welcome: 'karibu', hello: 'hujambo', goodbye: 'kwaheri', sorry: 'samahani',
  beautiful: 'zuri', happy: 'furaha', peace: 'amani', truth: 'ukweli', freedom: 'uhuru', africa: 'Afrika',
  // ── Curated supplement (high-frequency words WOLD/curriculum miss) ──
  walk: 'kutembea', run: 'kukimbia', sit: 'kukaa', stand: 'kusimama', open: 'kufungua', close: 'kufunga',
  buy: 'kununua', sell: 'kuuza', build: 'kujenga', find: 'kupata', lose: 'kupoteza', win: 'kushinda',
  begin: 'kuanza', start: 'kuanza', end: 'kumaliza', finish: 'kumaliza', call: 'kuita', ask: 'kuuliza',
  answer: 'kujibu', wait: 'kusubiri', follow: 'kufuata', carry: 'kubeba', bring: 'kuleta', send: 'kutuma',
  put: 'kuweka', keep: 'kuweka', leave: 'kuondoka', return: 'kurudi', remember: 'kukumbuka', forget: 'kusahau',
  understand: 'kuelewa', believe: 'kuamini', think: 'kufikiri', hope: 'kutumaini', fear: 'kuogopa',
  laugh: 'kucheka', cry: 'kulia', sing: 'kuimba', dance: 'kucheza', play: 'kucheza', fight: 'kupigana',
  die: 'kufa', live: 'kuishi', grow: 'kukua', fall: 'kuanguka', rise: 'kupanda', turn: 'kugeuka',
  move: 'kuhama', stop: 'kusimama', wear: 'kuvaa', cook: 'kupika', wash: 'kuosha', count: 'kuhesabu',
  show: 'kuonyesha', meet: 'kukutana', change: 'kubadilisha', use: 'kutumia', try: 'kujaribu', need: 'kuhitaji',
  old: 'kuukuu', young: 'kijana', long: 'refu', short: 'fupi', tall: 'refu', hard: 'gumu', easy: 'rahisi',
  difficult: 'gumu', strong: 'imara', weak: 'dhaifu', fast: 'haraka', slow: 'polepole', hot: 'moto', cold: 'baridi',
  clean: 'safi', dirty: 'chafu', full: 'jaa', empty: 'tupu', rich: 'tajiri', poor: 'maskini',
  right: 'sahihi', wrong: 'baya', important: 'muhimu',
  sky: 'anga', moon: 'mwezi', star: 'nyota', rain: 'mvua', wind: 'upepo', fire: 'moto', road: 'barabara',
  door: 'mlango', window: 'dirisha', table: 'meza', chair: 'kiti', bed: 'kitanda', clothes: 'nguo',
  hand: 'mkono', eye: 'jicho', head: 'kichwa', foot: 'mguu', leg: 'mguu', mouth: 'mdomo', ear: 'sikio',
  song: 'wimbo', dream: 'ndoto', war: 'vita', power: 'nguvu',
};

// ── Possessive concord by noun class (ngeli) ─────────────────────────────────
// Swahili possessives agree with the noun's class: kitabu CHangu, jina Langu,
// mti Wangu, vitabu VYangu. The stem (-angu/-ako/-ake/-etu/-enu/-ao) takes a
// class-determined prefix.
const POSS_STEM: Record<string, string> = { my: 'angu', your: 'ako', his: 'ake', her: 'ake', its: 'ake', our: 'etu', their: 'ao' };
const CLASS_PREFIX: Record<number, string> = { 1: 'w', 2: 'w', 3: 'w', 4: 'y', 5: 'l', 6: 'y', 7: 'ch', 8: 'vy', 9: 'y', 10: 'z', 11: 'w', 14: 'w', 15: 'kw', 16: 'p' };
// Hand-tagged classes for the core dictionary nouns (Jifunze words bring their own).
const CORE_CLASS: Record<string, number> = {
  mtu: 1, mwalimu: 1, mwanafunzi: 1, mtoto: 1, mwanaume: 1, mwanamke: 1, watu: 2,
  mti: 3, mwaka: 3, moyo: 3, mlima: 3, mto: 3, mkono: 3, mguu: 3, mlango: 3, mji: 3,
  mkate: 3, mfuko: 3, mzigo: 3, mstari: 3, mchezo: 3, mtihani: 3, mzizi: 3, mkutano: 3,
  mama: 9, baba: 9, kaka: 9, dada: 9, familia: 9,
  rafiki: 9, nyumba: 9, shule: 9, nchi: 9, dunia: 9, chai: 9, pesa: 9, siku: 9,
  lugha: 9, hadithi: 9, asubuhi: 9, amani: 9, furaha: 9, afrika: 9,
  soko: 5, jiji: 5, jina: 5, neno: 5, gari: 5, shati: 5, kitabu: 7, chakula: 7, kiswahili: 7,
  vitabu: 8, maji: 6, maneno: 6, maisha: 6, wakati: 11, usiku: 11, ukweli: 11, uhuru: 11,
};
// Infer a noun's class from its Swahili prefix (for nouns not explicitly tagged).
// We only need the class to pick a POSSESSIVE prefix, so classes that share a
// prefix (1 & 3 → w-) need not be disambiguated.
function inferClass(sw: string): number {
  const w = sw.toLowerCase();
  if (/^vi[a-z]/.test(w)) return 8;       // vitabu, viti → vy-
  if (/^ki[a-z]/.test(w)) return 7;       // kitabu, kiti → ch-
  if (/^ma[a-z]/.test(w)) return 6;       // maji, maneno → y-
  if (/^mi[a-z]/.test(w)) return 4;       // miti → y-
  if (/^wa[a-z]/.test(w)) return 2;       // watu, watoto → w-
  if (/^ku[a-z]/.test(w)) return 15;      // kusoma → kw-
  if (/^u[a-z]/.test(w)) return 11;       // uhuru, ukweli → w-
  if (/^mw[a-z]|^m[aeiou]/.test(w)) return 1;  // mwalimu, mwana → w-
  if (/^m[bcdfghjklmnpqrstvwxyz]/.test(w)) return 1; // mtu/mti → w- (1 & 3 share w-)
  if (/^ji[a-z]/.test(w)) return 5;       // jina, jiji → l-
  return 9;                               // N-class (rafiki, mama, nyumba) → y-
}
let CLASS_MAP: Record<string, number> | null = null;
function classOf(sw: string): number {
  if (!CLASS_MAP) {
    CLASS_MAP = { ...CORE_CLASS };
    for (const level of LEVELS) for (const u of level.units) for (const l of u.lessons) for (const v of l.vocab) {
      if (typeof v.cls === 'number' && !(v.sw in CLASS_MAP)) CLASS_MAP[v.sw.toLowerCase()] = v.cls;
    }
  }
  return CLASS_MAP[sw.toLowerCase()] ?? inferClass(sw); // tagged data first, else morphology
}
/** Concorded possessive for an English determiner + the noun it modifies. */
function possessiveFor(engPoss: string, nounSw: string): string {
  const stem = POSS_STEM[engPoss] ?? 'angu';
  const prefix = CLASS_PREFIX[classOf(nounSw)] ?? 'y';
  return prefix + stem;
}

// ── Adjective agreement + word order ──────────────────────────────────────────
// English is ADJ→NOUN ("good book"); Swahili is NOUN→ADJ with the adjective
// agreeing with the noun's class ("kitabu kizuri"). Variable stems take a class
// concord; loan adjectives (safi, rahisi…) are invariable.
const ADJ: Record<string, { stem: string; vary: boolean }> = {
  good: { stem: 'zuri', vary: true }, nice: { stem: 'zuri', vary: true }, beautiful: { stem: 'zuri', vary: true },
  bad: { stem: 'baya', vary: true }, big: { stem: 'kubwa', vary: true }, large: { stem: 'kubwa', vary: true },
  small: { stem: 'dogo', vary: true }, little: { stem: 'dogo', vary: true }, new: { stem: 'pya', vary: true },
  long: { stem: 'refu', vary: true }, tall: { stem: 'refu', vary: true }, short: { stem: 'fupi', vary: true },
  wide: { stem: 'pana', vary: true }, thin: { stem: 'embamba', vary: true }, narrow: { stem: 'embamba', vary: true },
  heavy: { stem: 'zito', vary: true }, light: { stem: 'epesi', vary: true }, many: { stem: 'ingi', vary: true },
  few: { stem: 'chache', vary: true }, red: { stem: 'ekundu', vary: true }, white: { stem: 'eupe', vary: true },
  black: { stem: 'eusi', vary: true }, hard: { stem: 'gumu', vary: true }, old: { stem: 'zee', vary: true },
  clean: { stem: 'safi', vary: false }, easy: { stem: 'rahisi', vary: false }, strong: { stem: 'imara', vary: false },
  weak: { stem: 'dhaifu', vary: false }, important: { stem: 'muhimu', vary: false }, ready: { stem: 'tayari', vary: false },
  brave: { stem: 'hodari', vary: false }, rich: { stem: 'tajiri', vary: false }, poor: { stem: 'maskini', vary: false },
};
// N-class (9/10) irregular concords that the rules below don't derive.
const NCLASS_IRREG: Record<string, string> = { refu: 'ndefu', pya: 'mpya' };
function adjConcord(stem: string, cls: number): string {
  const v = /^[aeiou]/.test(stem);
  switch (cls) {
    case 1: case 11: return (v ? 'mw' : 'm') + stem;
    case 2: return (v ? 'w' : 'wa') + stem;
    case 3: return (v ? 'mw' : 'm') + stem;
    case 4: return (v ? 'my' : 'mi') + stem;
    case 5: return stem === 'pya' ? 'jipya' : stem;
    case 6: return 'ma' + stem;
    case 7: return (v ? 'ch' : 'ki') + stem;
    case 8: return (v ? 'vy' : 'vi') + stem;
    default: { // 9 / 10 — N-class
      if (NCLASS_IRREG[stem]) return NCLASS_IRREG[stem];
      if (v) return 'ny' + stem;
      const c = stem[0];
      if (c === 'b') return 'm' + stem;
      if ('dgzjv'.includes(c)) return 'n' + stem;
      return stem;
    }
  }
}

// ── Morphology: resolve inflected English + pluralise Swahili by class ─────────
// Lets the engine handle plurals ("mountains" → milima) and inflected verbs
// ("walked"/"loves") instead of flagging them unknown. Sovereign — uses our own
// class data; falls back to the singular when a class isn't confidently known.
const IRREGULAR_EN: Record<string, string> = {
  children: 'child', men: 'man', women: 'woman', people: 'person', feet: 'foot', teeth: 'tooth',
  went: 'go', gone: 'go', ate: 'eat', eaten: 'eat', drank: 'drink', drunk: 'drink', ran: 'run',
  came: 'come', took: 'take', taken: 'take', gave: 'give', given: 'give', made: 'make',
  knew: 'know', known: 'know', wrote: 'write', written: 'write', saw: 'see', seen: 'see',
  said: 'say', told: 'tell', got: 'get', found: 'find', thought: 'think', brought: 'bring',
  bought: 'buy', taught: 'teach', heard: 'hear', held: 'hold', kept: 'keep', left: 'leave',
  met: 'meet', paid: 'pay', sat: 'sit', stood: 'stand', understood: 'understand', won: 'win',
};
const IRREG_PLURAL = new Set(['children', 'men', 'women', 'people', 'feet', 'teeth']);

function ensureClassMap(): Record<string, number> { if (!CLASS_MAP) classOf('seed'); return CLASS_MAP!; }
/** Class only when confident (prefix-deterministic or tagged), else 0. */
function knownClass(sw: string): number {
  const w = sw.toLowerCase();
  if (/^vi[a-z]/.test(w)) return 8;
  if (/^(ki|ch)[a-z]/.test(w)) return 7;
  return ensureClassMap()[w] ?? 0;
}
/** Pluralise a Swahili noun by its (confident) class; otherwise leave singular. */
function pluralizeSw(sw: string): string {
  const w = sw; const c = knownClass(sw);
  if (c === 7 || c === 8) { if (w.startsWith('ch')) return 'vy' + w.slice(2); if (w.startsWith('ki')) return 'vi' + w.slice(2); return w; }
  if (c === 1 || c === 2) { if (w.startsWith('mw')) return 'w' + w.slice(2); if (w.startsWith('m')) return 'wa' + w.slice(1); return w; }
  if (c === 3 || c === 4) { if (w.startsWith('mw')) return 'mi' + w.slice(2); if (w.startsWith('m')) return 'mi' + w.slice(1); return w; }
  return w;
}
function singularizeEn(k: string): string {
  if (k.endsWith('ies')) return k.slice(0, -3) + 'y';
  if (/(ses|xes|ches|shes)$/.test(k)) return k.slice(0, -2);
  if (k.endsWith('s') && !k.endsWith('ss')) return k.slice(0, -1);
  return k;
}
/** Try to resolve an inflected English word; '' = resolved-but-empty, null = unresolved. */
function resolveInflected(key: string, lex: Record<string, string>): string | null {
  if (key in IRREGULAR_EN) {
    const b = IRREGULAR_EN[key];
    if (b in lex) { const sw = lex[b]; return IRREG_PLURAL.has(key) && sw ? pluralizeSw(sw) : sw; }
  }
  if (key.endsWith('s')) {
    const b = singularizeEn(key);
    if (b !== key && b in lex) { const sw = lex[b]; if (sw === '') return ''; return sw.startsWith('ku') ? sw : pluralizeSw(sw); }
  }
  if (key.endsWith('ed')) for (const b of [key.slice(0, -2), key.slice(0, -1), key.endsWith('ied') ? key.slice(0, -3) + 'y' : '']) if (b && b in lex) return lex[b];
  if (key.endsWith('ing')) for (const b of [key.slice(0, -3), key.slice(0, -3) + 'e']) if (b && b in lex) return lex[b];
  return null;
}

function buildLexicon(bridge: TransLang): Record<string, string> {
  const lex: Record<string, string> = {};
  if (bridge === 'en') for (const [k, v] of Object.entries(CORE_EN)) lex[k] = v;
  else if (bridge === 'fr') for (const [k, v] of Object.entries(CORE_FR)) lex[k] = v;
  else if (bridge === 'pt') for (const [k, v] of Object.entries(CORE_PT)) lex[k] = v;
  // Every Jifunze word: gloss[bridge] → sw (course bridges only; fr/pt aren't taught).
  if (COURSE_BRIDGES.has(bridge)) for (const level of LEVELS) for (const u of level.units) for (const l of u.lessons) for (const voc of l.vocab) {
    const g = voc.gloss[bridge as Bridge];
    if (!g) continue;
    for (const part of g.split(/[/,]/)) {
      const key = part.trim().toLowerCase().replace(/^(to|the|a|an)\s+/, '');
      if (key && !(key in lex)) lex[key] = voc.sw;
    }
  }
  // WOLD gap-filler (English source only) — curated + curriculum keep priority.
  if (bridge === 'en') for (const [k, v] of Object.entries(woldEn())) if (!(k in lex)) lex[k] = v;
  return lex;
}

export interface TranslateResult {
  draft: string;
  pairs: { src: string; sw: string }[];
  unknown: string[];
  coverage: number; // 0–1 fraction of content tokens resolved
}

const PUNCT = /[.,!?;:"“”'’()—–-]/g;
const norm = (s: string) => s.toLowerCase().replace(PUNCT, '');

// English possessive determiners come BEFORE the noun ("my friend"); Swahili puts
// them AFTER ("rafiki yangu"). We detect the pattern and swap the order.
const ENG_POSS = new Set(['my', 'your', 'his', 'her', 'our', 'their', 'its']);

// Sentence-level verb agreement: an English subject pronoun (+ optional modal)
// followed by a verb → a fully conjugated Swahili verb (subject + tense baked in).
const ENG_SUBJ: Record<string, Person> = { i: '1sg', you: '2sg', he: '3sg', she: '3sg', it: '3sg', we: '1pl', they: '3pl' };
const MODAL_FUT = new Set(['will', 'shall']);
const PAST_FORMS = new Set(['went', 'gone', 'ate', 'eaten', 'drank', 'drunk', 'ran', 'came', 'took', 'taken', 'gave', 'given', 'made', 'knew', 'known', 'wrote', 'written', 'saw', 'seen', 'said', 'told', 'got', 'found', 'thought', 'brought', 'bought', 'taught', 'heard', 'held', 'kept', 'left', 'met', 'paid', 'sat', 'stood', 'understood', 'won', 'wore']);

/** Translate source text to a Swahili DRAFT (assistive, human-in-the-loop). */
export function translateToSwahili(text: string, bridge: TransLang): TranslateResult {
  const lex = buildLexicon(bridge);
  const phr = PHRASES[bridge] || {};
  const phraseKeys = Object.keys(phr).sort((a, b) => b.split(' ').length - a.split(' ').length);
  // French elision: drop the elided article/preposition particle so the content
  // word resolves ("l'eau" → "eau", "d'argent" → "argent"). Keeps j'/m' for phrases.
  const prepped = bridge === 'fr' ? text.replace(/\b(l|d|qu|n|s|c|t)['']/gi, '') : text;
  const tokens = prepped.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  const pairs: { src: string; sw: string }[] = [];
  const unknown: string[] = [];
  let content = 0, resolved = 0;

  let i = 0;
  while (i < tokens.length) {
    let matched = false;
    for (const pk of phraseKeys) {
      const len = pk.split(' ').length;
      if (i + len <= tokens.length && tokens.slice(i, i + len).map(norm).join(' ') === pk) {
        out.push(phr[pk]); pairs.push({ src: pk, sw: phr[pk] });
        content += len; resolved += len; i += len; matched = true; break;
      }
    }
    if (matched) continue;

    // Sentence-level: subject pronoun (+ optional will/shall) + verb → conjugated.
    if (bridge === 'en' && norm(tokens[i]) in ENG_SUBJ && i + 1 < tokens.length) {
      const person = ENG_SUBJ[norm(tokens[i])];
      let j = i + 1;
      let tense: 'present' | 'past' | 'future' = 'present';
      if (MODAL_FUT.has(norm(tokens[j]))) { tense = 'future'; j++; }
      const vk = j < tokens.length ? norm(tokens[j]) : '';
      const vsw = vk ? (vk in lex ? lex[vk] : (resolveInflected(vk, lex) ?? '')) : '';
      if (vsw && vsw.startsWith('ku') && !vsw.includes(' ')) {
        if (tense !== 'future' && (PAST_FORMS.has(vk) || vk.endsWith('ed'))) tense = 'past';
        const form = conjugate(vsw.slice(2), { person, tense });
        out.push(form);
        if (!pairs.some((p) => p.src === `${norm(tokens[i])} ${vk}`)) pairs.push({ src: `${norm(tokens[i])} ${vk}`, sw: form });
        const span = j - i + 1; content += span; resolved += span;
        i = j + 1; continue;
      }
    }

    // Adjective reorder + concord (en): "good book" → "kitabu kizuri" (noun, then
    // agreeing adjective). Variable stems take a class concord; loans stay as-is.
    if (bridge === 'en' && norm(tokens[i]) in ADJ && i + 1 < tokens.length) {
      const nk = norm(tokens[i + 1]);
      let nounSw = nk in lex ? lex[nk] : (resolveInflected(nk, lex) || '');
      if (nounSw && nounSw.startsWith('ku')) nounSw = ''; // a verb, not a noun → skip
      if (nounSw) {
        const adj = ADJ[norm(tokens[i])];
        const adjSw = adj.vary ? adjConcord(adj.stem, classOf(nounSw)) : adj.stem;
        out.push(nounSw, adjSw);
        if (!pairs.some((p) => p.src === `${norm(tokens[i])} ${nk}`)) pairs.push({ src: `${norm(tokens[i])} ${nk}`, sw: `${nounSw} ${adjSw}` });
        content += 2; resolved += 2; i += 2; continue;
      }
    }

    // Possessive reordering (en): "my friend" → "rafiki yangu" (noun, then possessive).
    if (bridge === 'en') {
      const pkey = norm(tokens[i]);
      const nkey = i + 1 < tokens.length ? norm(tokens[i + 1]) : '';
      if (ENG_POSS.has(pkey) && nkey) {
        i += 2;
        content += 2;
        let nounSw: string;
        if (nkey in lex) { resolved++; nounSw = lex[nkey]; if (!pairs.some((p) => p.src === nkey)) pairs.push({ src: nkey, sw: nounSw || '(neno la kuunganisha)' }); }
        else { unknown.push(nkey); nounSw = `⟨${nkey}⟩`; }
        resolved++; // a possessive determiner is always in the lexicon
        // Concord the possessive with the noun's class: kitabu changu, jina langu.
        const possSw = nkey in lex && lex[nkey] ? possessiveFor(pkey, lex[nkey]) : (lex[pkey] ?? '');
        if (!pairs.some((p) => p.src === pkey)) pairs.push({ src: pkey, sw: possSw });
        if (nounSw) out.push(nounSw);
        if (possSw) out.push(possSw);
        continue;
      }
    }

    const tok = tokens[i]; i++;
    const key = norm(tok);
    if (!key) continue;
    content++;
    if (key in lex) {
      resolved++;
      const sw = lex[key];
      if (sw) out.push(sw);
      if (!pairs.some((p) => p.src === key)) pairs.push({ src: key, sw: sw || '(neno la kuunganisha)' });
    } else {
      const inf = resolveInflected(key, lex); // plurals / verb inflections
      if (inf !== null) {
        resolved++;
        if (inf) out.push(inf);
        if (!pairs.some((p) => p.src === key)) pairs.push({ src: key, sw: inf || '(neno la kuunganisha)' });
      } else {
        unknown.push(key);
        out.push(`⟨${key}⟩`); // ⟨word⟩ — flagged for the creator to fill
      }
    }
  }

  const draft = out.join(' ').replace(/\s+/g, ' ').trim();
  return {
    draft: draft ? draft.charAt(0).toUpperCase() + draft.slice(1) : '',
    pairs,
    unknown: [...new Set(unknown)],
    coverage: content ? resolved / content : 0,
  };
}

/** Current dictionary size, so the UI can show how rich the engine is. */
export function lexiconSize(bridge: TransLang): number {
  return Object.keys(buildLexicon(bridge)).length;
}
