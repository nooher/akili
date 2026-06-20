// Tests for the Kilimo (agriculture) domain expert — sovereign KB.
import { describe, it, expect } from 'vitest';
import { kilimoExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string): AkiliQuery => ({ text, lang: 'sw' });

describe('kilimoExpert.match', () => {
  it('scores high on a maize planting query', () => {
    expect(kilimoExpert.match(q('nataka kupanda mahindi shambani'))).toBeGreaterThan(0.7);
  });

  it('scores moderate on a single cue', () => {
    expect(kilimoExpert.match(q('habari za mavuno'))).toBeGreaterThan(0.5);
  });

  it('scores high on English farming cues', () => {
    expect(kilimoExpert.match(q('which fertilizer for my maize crop'))).toBeGreaterThan(0.7);
  });

  it('scores zero on an unrelated (legal) query', () => {
    expect(kilimoExpert.match(q('haki za mtumiaji'))).toBe(0);
  });

  it('scores zero on empty input', () => {
    expect(kilimoExpert.match(q(''))).toBe(0);
  });
});

describe('kilimoExpert.answer', () => {
  it('returns a populated AkiliAnswer with ministry sources', async () => {
    const a = await kilimoExpert.answer(q('jinsi ya kupanda mahindi'));
    expect(a.domain).toBe('kilimo');
    expect(a.expert).toBe('kilimo-msingi');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.text.en && a.text.en.length).toBeTruthy();
    expect(a.sources!.some((s) => /Kilimo/i.test(s.label))).toBe(true);
  });

  it('retrieves the season entry for a rains query', async () => {
    const a = await kilimoExpert.answer(q('msimu wa mvua wa kupanda ni lini'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('misimu');
  });

  it('retrieves cash-crop entry for a coffee/cashew query', async () => {
    const a = await kilimoExpert.answer(q('kahawa na korosho'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kahawa-korosho');
  });

  it('retrieves the poultry/livestock entry for a chicken query', async () => {
    const a = await kilimoExpert.answer(q('ufugaji bora wa kuku na chanjo'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('mifugo-kuku');
    expect(a.sources!.some((s) => /Mifugo/i.test(s.label))).toBe(true);
  });

  it('retrieves the horticulture entry for a vegetables query', async () => {
    const a = await kilimoExpert.answer(q('kilimo cha mboga na bustani ya nyanya'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('mboga-bustani');
  });

  it('retrieves extension entry for an inputs/subsidy query', async () => {
    const a = await kilimoExpert.answer(q('huduma za ugani na ruzuku ya pembejeo'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('ugani-pembejeo');
  });
});
