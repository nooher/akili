// embed.ts — Akili's SOVEREIGN local text embedder.
//
// ── What this is ──────────────────────────────────────────────────────────────
// A pure, deterministic, offline function that turns a string into a fixed-size
// 384-dimensional numeric vector. NO neural model, NO download, NO network — it
// runs in microseconds on any device and never leaves the machine. That keeps
// Akili sovereign-by-default: even when paired with a remote Laetoli Data store,
// the embedding is computed locally and only the vector + text travel.
//
// ── How it works (feature hashing / "the hashing trick") ──────────────────────
// This is a LEXICAL embedder, not a semantic neural one. It maps the words (and
// character bigrams, for typo/morphology robustness) of a text into 384 buckets
// via a stable string hash, counts them, then L2-normalises. Two texts that
// share vocabulary land close together under cosine similarity; texts with no
// shared tokens are near-orthogonal. It deliberately does NOT understand meaning
// the way a transformer does — but it is:
//   • deterministic   — same input → byte-identical output, forever;
//   • dependency-free  — no model weights, no WASM, no fetch;
//   • fast + tiny      — pure integer/float math over the token stream;
//   • Swahili-aware    — tokenizes on Unicode letters/digits so words like
//                        "kumbukumbu", "afya", "ndugu" are kept whole.
//
// Paired with Laetoli Data's `hybrid_search` (which fuses this vector leg with a
// Postgres full-text leg via Reciprocal Rank Fusion), the lexical embedding is
// "good enough" retrieval: the keyword leg carries precision, the vector leg
// adds recall over re-orderings / partial overlaps. When a true sovereign neural
// embedder ships, swap THIS function — the dimension (384) matches Laetoli
// Data's default `documents.embedding` column, so nothing else changes.

/** The embedding dimensionality. Must match Laetoli Data's vector column (384). */
export const EMBED_DIM = 384 as const;

/**
 * FNV-1a 32-bit string hash. Stable across platforms and runs — the determinism
 * of the whole embedder rests on this. `seed` lets us derive independent hash
 * functions for different feature families (unigram vs bigram) without bias.
 */
function fnv1a(str: string, seed = 0x811c9dc5): number {
  let h = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    // h *= 16777619, done in 32-bit space without overflow loss.
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * Tokenize: lowercase, then split on anything that is NOT a Unicode letter or
 * digit. The `\p{L}`/`\p{N}` classes keep Swahili (and any other script's)
 * letters intact, so accented or non-ASCII words survive as whole tokens.
 * Empty tokens are dropped.
 */
export function tokenize(text: string): string[] {
  const lowered = text.toLowerCase();
  const parts = lowered.split(/[^\p{L}\p{N}]+/u);
  const out: string[] = [];
  for (const p of parts) if (p) out.push(p);
  return out;
}

/** Character bigrams of a token, prefixed so they can't collide with unigrams. */
function bigrams(token: string): string[] {
  if (token.length < 2) return [];
  const out: string[] = [];
  for (let i = 0; i < token.length - 1; i++) {
    out.push('§' + token.slice(i, i + 2));
  }
  return out;
}

/** Add a hashed feature into the bucket vector with a given weight. */
function bump(vec: Float64Array, feature: string, weight: number): void {
  const bucket = fnv1a(feature) % EMBED_DIM;
  // A second hash bit decides the sign, so unrelated features can cancel rather
  // than only ever adding — this reduces collision bias (standard hashing trick).
  const sign = (fnv1a(feature, 0x9e3779b1) & 1) === 0 ? 1 : -1;
  vec[bucket] += sign * weight;
}

/**
 * Embed `text` into a deterministic, L2-normalised 384-dim vector.
 *
 * Unigrams carry full weight (they're the signal); character bigrams carry a
 * smaller weight (they add robustness to typos/inflection without drowning the
 * words). An empty/whitespace-only string returns an all-zero vector.
 *
 * @returns a plain `number[]` of length {@link EMBED_DIM}, ready to send to
 *          Laetoli Data as a `documents.embedding` value.
 */
export function embed(text: string): number[] {
  const vec = new Float64Array(EMBED_DIM);
  const tokens = tokenize(text);

  for (const tok of tokens) {
    bump(vec, tok, 1.0); // unigram — the primary lexical signal
    for (const bg of bigrams(tok)) bump(vec, bg, 0.5); // sub-word robustness
  }

  // L2-normalise so cosine similarity == dot product and magnitude (text length)
  // doesn't dominate. A zero vector (empty text) is returned as-is.
  let norm = 0;
  for (let i = 0; i < EMBED_DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);

  const out = new Array<number>(EMBED_DIM);
  if (norm === 0) {
    out.fill(0);
    return out;
  }
  for (let i = 0; i < EMBED_DIM; i++) out[i] = vec[i] / norm;
  return out;
}

/**
 * Cosine similarity of two equal-length vectors. Since {@link embed} returns
 * L2-normalised vectors this is just their dot product, but we keep the full
 * formula so it's correct for any inputs. Returns 0 if either vector is zero.
 */
export function cosineSimilarity(a: readonly number[], b: readonly number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
