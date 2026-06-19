// fasihi.ts — Kasuku's literary-study brain (uchambuzi wa fasihi). Sovereign and
// deterministic: NO LLM, NO network. For any work in the catalogue it assembles
// a study guide a Tanzanian Kiswahili/Fasihi student can actually use —
// muhtasari, dhamira, wahusika, dondoo, maswali ya kujadili — plus an auto-
// generated jaribio (quiz with marked answers). Everything is GROUNDED in the
// work's own metadata (about/themes/quotes/genre/year) and, for works we own in
// full, its chapter text. Educational analysis only — never reproduces the text.

import type { Work } from './types';

export interface QuizChoice { text: string; correct: boolean }
export interface QuizQuestion { q: { sw: string; en: string }; choices: QuizChoice[] }
export interface FasihiGuide {
  title: string;
  author: string;
  muhtasari: string;
  dhamira: string[];
  wahusika: string[];
  mbinu: { sw: string; en: string };
  dondoo: string[];
  maswali: { sw: string; en: string }[];
  jaribio: QuizQuestion[];
  outline: string[];
}

// ── small helpers ─────────────────────────────────────────────────────────────
function sentences(text: string): string[] {
  return (text || '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+/).filter(Boolean);
}

/** A short muhtasari: the first 2–3 sentences of the synopsis. */
function summarize(work: Work): string {
  const ss = sentences(work.about);
  if (!ss.length) return work.about || '';
  return ss.slice(0, 3).join(' ');
}

/** Themes → a clean list. Falls back to the genre when no themes are tagged. */
export function dhamiraOf(work: Work): string[] {
  const raw = (work.themes || '').split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  if (raw.length) return raw.slice(0, 6);
  return work.genre ? [work.genre] : [];
}

const NAME_STOP = new Set([
  'the', 'a', 'an', 'and', 'but', 'or', 'for', 'he', 'she', 'it', 'they', 'we', 'i', 'you',
  'his', 'her', 'their', 'when', 'then', 'there', 'this', 'that', 'these', 'those', 'her', 'him',
  'na', 'ya', 'wa', 'kwa', 'la', 'za', 'ni', 'kwamba', 'lakini', 'au', 'kisha', 'basi', 'sasa',
  'mungu', 'bwana', 'mama', 'baba', 'chapter', 'sura',
]);

/**
 * Heuristic wahusika: capitalised words that recur MID-sentence (so not just
 * sentence openers) across the owned chapter text. Honest, frequency-based —
 * labelled in the UI as "names that appear often", not a curated cast list.
 */
export function wahusikaOf(work: Work, max = 6): string[] {
  if (!work.chapters?.length) return [];
  const body = work.chapters.map((c) => c.body || '').join(' ');
  const tokens = body.split(/\s+/);
  const titleWords = new Set((work.title + ' ' + work.author).toLowerCase().split(/\s+/));
  const count = new Map<string, number>();
  let prevEndsSentence = true; // first token is a sentence opener
  for (const tokRaw of tokens) {
    const tok = tokRaw.replace(/^[^A-Za-zÀ-ÿ]+|[^A-Za-zÀ-ÿ]+$/g, '');
    const isCap = /^[A-ZÀ-Þ][a-zà-ÿ]{2,}$/.test(tok);
    if (isCap && !prevEndsSentence && !NAME_STOP.has(tok.toLowerCase()) && !titleWords.has(tok.toLowerCase())) {
      count.set(tok, (count.get(tok) || 0) + 1);
    }
    prevEndsSentence = /[.!?]["')]?$/.test(tokRaw);
  }
  return [...count.entries()]
    .filter(([, n]) => n >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([name]) => name);
}

function mbinuFor(work: Work): { sw: string; en: string } {
  const g = (work.genre || '').toLowerCase();
  const isPoetry = work.type === 'poetry' || /shairi|ushairi|poet/.test(g);
  const isDrama = /tamthili|mchezo|drama|play/.test(g);
  if (isPoetry) return {
    sw: 'Ni ushairi: zingatia vina, mizani, takriri, na taswira; uchambue matumizi ya lugha ya mkato na ishara.',
    en: 'Poetry: attend to rhyme, metre, repetition and imagery; examine the compressed, symbolic language.',
  };
  if (isDrama) return {
    sw: 'Ni tamthilia: zingatia majibizano (dayalojia), migogoro, na maelekezo ya jukwaa katika kufichua wahusika.',
    en: 'Drama: attend to dialogue, conflict and stage directions in revealing character.',
  };
  return {
    sw: 'Ni kazi ya kinathari: zingatia muundo wa visa, mtazamo wa msimulizi, taswira, na jinsi mwandishi anavyojenga dhamira.',
    en: 'Prose: attend to plot structure, narrative point of view, imagery, and how the author builds theme.',
  };
}

function discussion(work: Work): { sw: string; en: string }[] {
  const th = dhamiraOf(work);
  const out: { sw: string; en: string }[] = [];
  if (th[0]) out.push({
    sw: `Eleza jinsi dhamira ya "${th[0]}" inavyojitokeza katika "${work.title}".`,
    en: `Explain how the theme of "${th[0]}" emerges in "${work.title}".`,
  });
  out.push({
    sw: `${work.author} ametumia mbinu gani za kisanaa kufikisha ujumbe wake?`,
    en: `What artistic techniques does ${work.author} use to convey the message?`,
  });
  if (th[1]) out.push({
    sw: `Linganisha dhamira za "${th[0]}" na "${th[1]}" — zinasaidianaje?`,
    en: `Compare the themes of "${th[0]}" and "${th[1]}" — how do they reinforce each other?`,
  });
  out.push({
    sw: `Je, "${work.title}" ina ujumbe gani kwa jamii ya leo?`,
    en: `What message does "${work.title}" hold for society today?`,
  });
  out.push({
    sw: 'Toa maoni yako kuhusu mwisho wa kazi hii na uhalali wake.',
    en: 'Give your view on the work’s ending and how fitting it is.',
  });
  return out;
}

// Deterministic shuffle (seeded by the question text) — quizzes stay testable and
// the right answer is not always first.
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const seedOf = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h) + 1; };

const GENRE_POOL = ['Riwaya', 'Tamthilia', 'Ushairi', 'Hadithi fupi', 'Insha', 'Wasifu'];
const THEME_POOL = ['mapenzi', 'ukombozi', 'utamaduni', 'haki', 'umaskini', 'elimu', 'usaliti', 'matumaini', 'vita', 'ndoa', 'utawala', 'mapinduzi'];

function mc(correct: string, distractors: string[], seed: number): QuizChoice[] {
  const picks = distractors.filter((d) => d && d.toLowerCase() !== correct.toLowerCase()).slice(0, 3);
  const choices: QuizChoice[] = [{ text: correct, correct: true }, ...picks.map((d) => ({ text: d, correct: false }))];
  return seededShuffle(choices, seed);
}

/** Generate a quiz. `pool` (other works) sharpens the author/quote distractors. */
export function buildQuiz(work: Work, pool: Work[] = []): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const otherAuthors = [...new Set(pool.map((w) => w.author).filter((a) => a && a !== work.author))];
  const otherTitles = [...new Set(pool.map((w) => w.title).filter((tt) => tt && tt !== work.title))];

  if (work.author) qs.push({
    q: { sw: `Nani aliandika "${work.title}"?`, en: `Who wrote "${work.title}"?` },
    choices: mc(work.author, otherAuthors.length ? otherAuthors : ['Shaaban Robert', 'Euphrase Kezilahabi', 'Said Ahmed Mohamed'], seedOf(work.id + 'a')),
  });
  if (work.genre) qs.push({
    q: { sw: `"${work.title}" ni kazi ya aina gani?`, en: `What kind of work is "${work.title}"?` },
    choices: mc(work.genre, GENRE_POOL, seedOf(work.id + 'g')),
  });
  const th = dhamiraOf(work);
  if (th[0]) qs.push({
    q: { sw: `Ipi ni mojawapo ya dhamira kuu za "${work.title}"?`, en: `Which is a central theme of "${work.title}"?` },
    choices: mc(th[0], THEME_POOL.filter((p) => !th.map((x) => x.toLowerCase()).includes(p)), seedOf(work.id + 't')),
  });
  if (work.publishedYear) {
    const y = work.publishedYear;
    qs.push({
      q: { sw: `"${work.title}" kilichapishwa mwaka gani?`, en: `In what year was "${work.title}" published?` },
      choices: mc(String(y), [String(y - 7), String(y + 5), String(y - 14)], seedOf(work.id + 'y')),
    });
  }
  if (work.quotes?.length && otherTitles.length) qs.push({
    q: { sw: `Nukuu "${work.quotes[0]}" inatoka kwenye kazi ipi?`, en: `Which work is the quote "${work.quotes[0]}" from?` },
    choices: mc(work.title, otherTitles, seedOf(work.id + 'q')),
  });
  return qs;
}

/** Assemble the full study guide for a work. */
export function buildGuide(work: Work, pool: Work[] = []): FasihiGuide {
  return {
    title: work.title,
    author: work.author,
    muhtasari: summarize(work),
    dhamira: dhamiraOf(work),
    wahusika: wahusikaOf(work),
    mbinu: mbinuFor(work),
    dondoo: work.quotes?.slice(0, 5) ?? (work.quote ? [work.quote] : []),
    maswali: discussion(work),
    jaribio: buildQuiz(work, pool),
    outline: (work.chapters ?? []).map((c, i) => c.title || `Sura ya ${i + 1}`),
  };
}
