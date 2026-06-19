// types.ts — the slimmed content model the vendored Kasuku literary engine needs.
//
// Kasuku's real Work type (kasuku/src/lib/types.ts) carries ~60 fields for the
// full reader/creator app. Akili's Fasihi expert only needs the LITERARY
// metadata — and deliberately ships NO chapter bodies (see works.ts / VENDORED.md),
// so `chapters` is typed but always absent here. Keeping a local, minimal shape
// makes the engine self-contained and Pi-friendly.

export type WorkType = 'book' | 'story' | 'poetry';

export interface Chapter {
  n?: number;
  title: string;
  body: string;
}

export interface Work {
  id: string;
  type: WorkType;
  title: string;
  author: string;
  /** ISO-ish language code: sw, en, … */
  language: string;
  genre: string;
  /** Short blurb / synopsis (no full text). */
  about: string;
  /** A single headline quote. */
  quote?: string;
  /** Up to five key quotes (dondoo). */
  quotes?: string[];
  /** Comma/semicolon-separated themes (dhamira). */
  themes?: string;
  publishedYear?: number;
  /**
   * Full chapter text — present in Kasuku, INTENTIONALLY OMITTED in Akili's
   * metadata-only catalog. Typed so the vendored engine compiles unchanged;
   * always undefined at runtime, so character/outline derivation degrades
   * gracefully to an empty list.
   */
  chapters?: Chapter[];
}
