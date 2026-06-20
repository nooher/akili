// Tests for the Biashara (small business & money) domain expert — sovereign KB.
import { describe, it, expect } from 'vitest';
import { biasharaExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string): AkiliQuery => ({ text, lang: 'sw' });

describe('biasharaExpert.match', () => {
  it('scores high on a start-a-business query', () => {
    expect(biasharaExpert.match(q('nataka kuanzisha biashara na usajili'))).toBeGreaterThan(0.7);
  });

  it('scores moderate on a single cue', () => {
    expect(biasharaExpert.match(q('nahitaji mtaji'))).toBeGreaterThan(0.5);
  });

  it('scores high on English finance cues', () => {
    expect(biasharaExpert.match(q('how does mobile money payment and tax work'))).toBeGreaterThan(0.7);
  });

  it('scores zero on an unrelated (clinical) query', () => {
    expect(biasharaExpert.match(q('dalili za homa'))).toBe(0);
  });

  it('scores zero on empty input', () => {
    expect(biasharaExpert.match(q(''))).toBe(0);
  });
});

describe('biasharaExpert.answer', () => {
  it('returns a populated AkiliAnswer with sources + financial disclaimer', async () => {
    const a = await biasharaExpert.answer(q('jinsi ya kuanzisha biashara'));
    expect(a.domain).toBe('biashara');
    expect(a.expert).toBe('biashara-msingi');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.text.en && a.text.en.length).toBeTruthy();
    expect(/si ushauri wa kifedha/i.test(a.text.sw)).toBe(true);
    expect(a.sources!.some((s) => /BRELA|TRA/i.test(s.label))).toBe(true);
  });

  it('retrieves the mobile-money entry for an M-Pesa query', async () => {
    const a = await biasharaExpert.answer(q('pesa za simu mpesa zinafanyaje kazi'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('pesa-za-simu');
  });

  it('retrieves the tax entry for a TRA/VAT query', async () => {
    const a = await biasharaExpert.answer(q('kodi ya tra na vat'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kodi-tra');
    expect(a.sources!.some((s) => /TRA/i.test(s.label))).toBe(true);
  });

  it('retrieves the business-plan entry for a planning query', async () => {
    const a = await biasharaExpert.answer(q('nataka kuandaa mpango wa biashara'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('mpango-wa-biashara');
  });

  it('retrieves bookkeeping entry for a records/budget query', async () => {
    const a = await biasharaExpert.answer(q('jinsi ya kuweka kumbukumbu na bajeti ya biashara'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kumbukumbu-bajeti');
  });

  it('retrieves insurance entry and cites TIRA', async () => {
    const a = await biasharaExpert.answer(q('bima ya biashara dhidi ya hatari ya moto'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('bima-hatari');
    expect(a.sources!.some((s) => /TIRA/i.test(s.label))).toBe(true);
  });
});
