// catalog.ts — sovereign, offline search + recommendation over Kasuku's library.
//
// Builds a lightweight weighted index from the metadata catalog (no network,
// deterministic) so the AI can find books by title/author/genre/theme and
// recommend similar works — the literary half of "Kasuku AI".
//
// VENDORED into Akili: the source indexed BASE_CATALOG (full book bodies); here
// it indexes WORKS_META (metadata only — id/title/author/genre/blurb/themes),
// which is all the search/recommend scorer ever reads. No manuscript text.

import { WORKS_META } from './works';
import type { Work } from './types';

const STRIP = /[^\p{L}\p{N}']+/gu;
const STOP = new Set([
  'a', 'an', 'the', 'is', 'are', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'with',
  'i', 'me', 'my', 'you', 'it', 'book', 'books', 'read', 'want', 'like', 'about',
  'kitabu', 'vitabu', 'soma', 'nataka', 'kuhusu', 'kama', 'ya', 'wa', 'cha', 'vya',
  'na', 'ni', 'za', 'la', 'kwa', 'nipe', 'nisomee', 'pendekeza', 'recommend',
]);

export function tokenize(s: string): string[] {
  return (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ')
    .split(/\s+/).filter(t => t.length > 1 && !STOP.has(t));
}

// Readable works only (books/stories/poetry) — the metadata catalog already
// excludes music/pulse, so this is the full corpus.
const READABLE = new Set(['book', 'story', 'poetry']);
const corpus = (): Work[] => WORKS_META.filter(w => READABLE.has(w.type));

/** Weighted token overlap of a query against one work. */
function scoreWork(qTokens: string[], w: Work): number {
  const title = new Set(tokenize(w.title));
  const author = new Set(tokenize(w.author));
  const genre = new Set(tokenize(w.genre));
  const about = new Set(tokenize(w.about));
  let s = 0;
  for (const t of qTokens) {
    if (title.has(t)) s += 5;
    if (author.has(t)) s += 4;
    if (genre.has(t)) s += 2;
    if (about.has(t)) s += 1;
  }
  return s;
}

export interface WorkHit { work: Work; score: number }

/** Ranked search across the readable catalogue. Deterministic (catalogue order breaks ties). */
export function searchWorks(query: string, limit = 5): WorkHit[] {
  const q = tokenize(query);
  if (!q.length) return [];
  return corpus()
    .map(work => ({ work, score: scoreWork(q, work) }))
    .filter(h => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Recommend works similar to a given one (shared genre/author/theme tokens). */
export function recommendLike(work: Work, limit = 4): Work[] {
  const seed = tokenize(`${work.genre} ${work.author} ${work.about}`);
  return corpus()
    .filter(w => w.id !== work.id)
    .map(w => ({ w, score: scoreWork(seed, w) + (w.author === work.author ? 6 : 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.w);
}

/** A default browse set — for generic "give me something to read" requests. */
export function topWorks(n = 6): Work[] {
  return corpus().slice(0, n);
}

export const catalogSize = () => corpus().length;
