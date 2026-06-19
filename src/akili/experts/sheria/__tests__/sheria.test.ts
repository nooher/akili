// Tests for the Sheria (Tanzanian law & civic rights) domain expert — sovereign KB.
import { describe, it, expect } from 'vitest';
import { sheriaExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string): AkiliQuery => ({ text, lang: 'sw' });

describe('sheriaExpert.match', () => {
  it('scores high on a rights/constitution query', () => {
    expect(sheriaExpert.match(q('haki zangu za msingi kwenye katiba'))).toBeGreaterThan(0.7);
  });

  it('scores moderate on a single cue', () => {
    expect(sheriaExpert.match(q('nahitaji wakili'))).toBeGreaterThan(0.5);
  });

  it('scores high on English legal cues', () => {
    expect(sheriaExpert.match(q('my employment contract rights and dismissal'))).toBeGreaterThan(0.7);
  });

  it('scores zero on an unrelated (clinical) query', () => {
    expect(sheriaExpert.match(q('dalili za homa'))).toBe(0);
  });

  it('scores zero on empty input', () => {
    expect(sheriaExpert.match(q(''))).toBe(0);
  });
});

describe('sheriaExpert.answer', () => {
  it('returns a populated AkiliAnswer with sources + disclaimer', async () => {
    const a = await sheriaExpert.answer(q('haki za msingi'));
    expect(a.domain).toBe('sheria');
    expect(a.expert).toBe('sheria-msingi');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.sources && a.sources.length).toBeTruthy();
    expect(/si ushauri wa kisheria/i.test(a.text.sw)).toBe(true);
    expect(a.sources!.some((s) => /Katiba/i.test(s.label))).toBe(true);
  });

  it('retrieves the arrest entry for a police query', async () => {
    const a = await sheriaExpert.answer(q('nimekamatwa na polisi nina haki gani'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kukamatwa-polisi');
    expect(a.text.en && a.text.en.length).toBeTruthy();
  });

  it('retrieves legal aid for a help query', async () => {
    const a = await sheriaExpert.answer(q('naomba msaada wa kisheria bila malipo'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('msaada-wa-kisheria');
  });
});
