// Tests for the Fasihi + Lugha domain experts (Kasuku-powered, sovereign).
import { describe, it, expect } from 'vitest';
import { fasihiExpert, lughaExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string): AkiliQuery => ({ text, lang: 'sw' });

describe('fasihiExpert.match', () => {
  it('scores high on a book-discovery request', () => {
    expect(fasihiExpert.match(q('nipe kitabu cha kusoma'))).toBeGreaterThan(0.5);
  });

  it('scores high on a theme/novel question', () => {
    expect(fasihiExpert.match(q('dhamira za riwaya'))).toBeGreaterThan(0.5);
  });

  it('scores high on English literary cues', () => {
    expect(fasihiExpert.match(q('recommend me a novel with strong themes'))).toBeGreaterThan(0.5);
  });

  it('scores low on a clinical query', () => {
    expect(fasihiExpert.match(q('dalili za homa'))).toBeLessThan(0.2);
  });

  it('outscores lugha on a pure literature query', () => {
    const lit = q('nipendekezee riwaya nzuri ya kusoma');
    expect(fasihiExpert.match(lit)).toBeGreaterThanOrEqual(lughaExpert.match(lit));
  });
});

describe('lughaExpert.match', () => {
  it('scores high on a translate request', () => {
    expect(lughaExpert.match(q('tafsiri: good morning'))).toBeGreaterThan(0.5);
  });

  it('scores high on a meaning-of request', () => {
    expect(lughaExpert.match(q('maana ya neno upendo'))).toBeGreaterThan(0.5);
  });

  it('scores high on pronunciation / grammar cues', () => {
    expect(lughaExpert.match(q('nyakati za kitenzi soma'))).toBeGreaterThan(0.5);
  });

  it('scores low on a clinical query', () => {
    expect(lughaExpert.match(q('dalili za homa'))).toBeLessThan(0.2);
  });
});

describe('fasihiExpert.answer', () => {
  it('returns a populated fasihi AkiliAnswer with provenance', async () => {
    const a = await fasihiExpert.answer(q('nipe kitabu cha kusoma'));
    expect(a.domain).toBe('fasihi');
    expect(a.expert).toBe('fasihi-kasuku');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.sources && a.sources.length).toBeTruthy();
    // The sovereignty signal — the engine is credited.
    expect(a.sources!.some((s) => /Kasuku/i.test(s.label))).toBe(true);
    expect(a.data).toBeTruthy();
  });

  it('surfaces book titles as sources when works back the answer', async () => {
    const a = await fasihiExpert.answer(q('nipendekezee kitabu cha kusoma'));
    const data = a.data as { works?: { title: string }[] };
    if (data.works && data.works.length) {
      // Every work title should appear as a source label.
      for (const w of data.works) {
        expect(a.sources!.some((s) => s.label === w.title)).toBe(true);
      }
    }
  });

  it('answers a study/theme query without crashing (metadata-only catalog)', async () => {
    const a = await fasihiExpert.answer(q('eleza dhamira za riwaya'));
    expect(a.domain).toBe('fasihi');
    expect(a.text.sw.length).toBeGreaterThan(0);
  });
});

describe('lughaExpert.answer', () => {
  it('translates and returns a lugha AkiliAnswer with provenance', async () => {
    const a = await lughaExpert.answer(q('tafsiri: good morning'));
    expect(a.domain).toBe('lugha');
    expect(a.expert).toBe('lugha-kasuku');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.text.en && a.text.en.length).toBeTruthy();
    expect(a.sources!.some((s) => /Kasuku/i.test(s.label))).toBe(true);
    const data = a.data as { kind: string };
    expect(data.kind).toBe('translate');
  });

  it('defines a word via the Kamusi', async () => {
    const a = await lughaExpert.answer(q('maana ya neno upendo'));
    expect(a.domain).toBe('lugha');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.confidence === 'high' || a.confidence === 'medium' || a.confidence === 'low').toBe(true);
  });

  it('pronounces a Swahili word and credits the Phonemizer', async () => {
    const a = await lughaExpert.answer(q('tamka neno karibu'));
    expect(a.domain).toBe('lugha');
    const data = a.data as { kind: string };
    if (data.kind === 'pronounce') {
      expect(a.sources!.some((s) => /Phonemizer/i.test(s.label))).toBe(true);
    }
    expect(a.text.sw.length).toBeGreaterThan(0);
  });
});
