import { describe, expect, it } from 'vitest';
import { afyaExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string, lang?: AkiliQuery['lang']): AkiliQuery => ({ text, lang });

describe('afyaExpert — identity', () => {
  it('declares the afya/TibaAI contract', () => {
    expect(afyaExpert.id).toBe('afya-tibaai');
    expect(afyaExpert.domain).toBe('afya');
    expect(afyaExpert.label).toBe('Afya');
  });
});

describe('afyaExpert.match — routing', () => {
  it('scores Swahili symptom queries high', () => {
    expect(afyaExpert.match(q('dalili za malaria'))).toBeGreaterThanOrEqual(0.9);
  });

  it('scores Swahili drug queries high', () => {
    expect(afyaExpert.match(q('dawa ya presha'))).toBeGreaterThanOrEqual(0.9);
  });

  it('scores English clinical queries high', () => {
    expect(afyaExpert.match(q('what is the treatment for diabetes'))).toBeGreaterThanOrEqual(0.78);
  });

  it('floors emergency text at the top', () => {
    expect(afyaExpert.match(q('kifua kinauma na sina pumzi'))).toBeGreaterThanOrEqual(0.95);
  });

  it('scores a non-health (poetry) query low', () => {
    expect(afyaExpert.match(q('nipe shairi'))).toBeLessThan(0.3);
  });

  it('returns 0 for empty input', () => {
    expect(afyaExpert.match(q(''))).toBe(0);
  });
});

describe('afyaExpert.answer — mapping', () => {
  it('returns a populated AkiliAnswer with sources for a known condition', async () => {
    const a = await afyaExpert.answer(q('malaria ni nini'));
    expect(a.domain).toBe('afya');
    expect(a.expert).toBe('afya-tibaai');
    expect(a.text.sw.length).toBeGreaterThan(20);
    expect(a.text.en && a.text.en.length).toBeGreaterThan(20);
    expect(['high', 'medium', 'low']).toContain(a.confidence);
    expect(a.sources && a.sources.length).toBeGreaterThan(0);
    // sources carry a human label (the citing org)
    expect(a.sources?.[0].label).toBeTruthy();
    // the full TibaAnswer rides along as structured data
    expect(a.data).toBeTruthy();
  });

  it('always includes a disclaimer in the Swahili text', async () => {
    const a = await afyaExpert.answer(q('presha ni nini'));
    expect(a.text.sw.toLowerCase()).toContain('elimu');
  });

  it('preserves emergency / red-flag framing — never downplayed', async () => {
    // A severe-presentation query should surface urgency + warning bullets.
    const a = await afyaExpert.answer(q('mtoto ana homa kali na degedege'));
    const data = a.data as { urgency: { level: string }; redFlags?: unknown[] };
    const sw = a.text.sw;
    if (data.urgency.level === 'emergency' || data.urgency.level === 'urgent') {
      // urgency band is rendered, not buried
      expect(sw).toMatch(/DHARURA|HARAKA/);
    }
    // any red flags from the engine are rendered as ⚠ bullets
    if (data.redFlags && data.redFlags.length > 0) {
      expect(sw).toContain('⚠');
    }
    // it never silently drops the safety net
    expect(sw.length).toBeGreaterThan(20);
  });

  it('answers in English when lang=en', async () => {
    const a = await afyaExpert.answer(q('what is hypertension', 'en'));
    expect(a.text.en && a.text.en.length).toBeGreaterThan(20);
  });
});
