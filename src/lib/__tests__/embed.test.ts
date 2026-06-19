import { describe, it, expect } from 'vitest';
import { embed, cosineSimilarity, tokenize, EMBED_DIM } from '../embed';

describe('embed — sovereign local embedder', () => {
  it('is deterministic: same input → identical output', () => {
    const a = embed('Habari za leo, ndugu?');
    const b = embed('Habari za leo, ndugu?');
    expect(a).toEqual(b);
  });

  it('produces a 384-dim vector', () => {
    expect(embed('afya na lishe')).toHaveLength(EMBED_DIM);
    expect(EMBED_DIM).toBe(384);
  });

  it('returns L2-normalised vectors (unit length) for non-empty text', () => {
    const v = embed('Akili ni nini hasa?');
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    expect(norm).toBeCloseTo(1, 6);
  });

  it('returns an all-zero vector for empty / whitespace text', () => {
    const v = embed('   ');
    expect(v).toHaveLength(EMBED_DIM);
    expect(v.every((x) => x === 0)).toBe(true);
  });

  it('similar texts are closer than dissimilar ones (cosine)', () => {
    const base = embed('dalili za malaria ni homa na maumivu ya kichwa');
    const similar = embed('malaria ina dalili za homa na maumivu ya kichwa');
    const different = embed('nipendekezee kitabu cha mashairi ya Kiswahili');

    const simScore = cosineSimilarity(base, similar);
    const diffScore = cosineSimilarity(base, different);

    expect(simScore).toBeGreaterThan(diffScore);
    expect(simScore).toBeGreaterThan(0.3);
  });

  it('identical text has cosine similarity ~1', () => {
    const v = embed('kumbukumbu ya muda mrefu');
    expect(cosineSimilarity(v, v)).toBeCloseTo(1, 6);
  });

  it('values are finite numbers', () => {
    const v = embed('hesabu wastani wa 10, 20, 30 kwa SNIL');
    expect(v.every((x) => Number.isFinite(x))).toBe(true);
  });

  it('keeps non-ASCII / Swahili letters whole when tokenizing', () => {
    expect(tokenize("Habari! Niko 'shule', ndugu-yangu.")).toEqual([
      'habari',
      'niko',
      'shule',
      'ndugu',
      'yangu',
    ]);
    // A bare punctuation string yields no tokens.
    expect(tokenize('!!! ??? ...')).toEqual([]);
  });

  it('case-insensitive: casing does not change the embedding', () => {
    expect(embed('AFYA NA LISHE')).toEqual(embed('afya na lishe'));
  });
});
