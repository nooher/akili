// Tests for the Elimu (study help) domain expert — sovereign KB.
import { describe, it, expect } from 'vitest';
import { elimuExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string): AkiliQuery => ({ text, lang: 'sw' });

describe('elimuExpert.match', () => {
  it('scores high on an education-system query', () => {
    expect(elimuExpert.match(q('mfumo wa elimu darasa na kidato necta'))).toBeGreaterThan(0.7);
  });

  it('scores moderate on a single cue', () => {
    expect(elimuExpert.match(q('nina mtihani kesho'))).toBeGreaterThan(0.5);
  });

  it('scores high on English study cues', () => {
    expect(elimuExpert.match(q('explain this science concept for my exam'))).toBeGreaterThan(0.7);
  });

  it('scores zero on an unrelated (business) query', () => {
    expect(elimuExpert.match(q('mtaji wa biashara'))).toBe(0);
  });

  it('scores zero on empty input', () => {
    expect(elimuExpert.match(q(''))).toBe(0);
  });
});

describe('elimuExpert.answer', () => {
  it('returns a populated AkiliAnswer with sources', async () => {
    const a = await elimuExpert.answer(q('eleza mfumo wa elimu tanzania'));
    expect(a.domain).toBe('elimu');
    expect(a.expert).toBe('elimu-msingi');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.text.en && a.text.en.length).toBeTruthy();
    expect(a.sources!.some((s) => /NECTA|Elimu/i.test(s.label))).toBe(true);
  });

  it('retrieves the maths entry and points to SNIL for computation', async () => {
    const a = await elimuExpert.answer(q('nisaidie hesabu ya algebra'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('hesabu');
    expect(/SNIL/i.test(a.text.sw)).toBe(true);
  });

  it('retrieves study-techniques entry for a how-to-study query', async () => {
    const a = await elimuExpert.answer(q('mbinu bora za kusoma na kujifunza'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('mbinu-za-kusoma');
  });
});
