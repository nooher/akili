import { describe, expect, it } from 'vitest';
import { logistikiExpert } from '../index';
import { askAkili } from '../../../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string, lang?: AkiliQuery['lang']): AkiliQuery => ({ text, lang });

describe('logistikiExpert — identity', () => {
  it('declares the logistiki/Rubani contract', () => {
    expect(logistikiExpert.id).toBe('logistiki-rubani');
    expect(logistikiExpert.domain).toBe('logistiki');
    expect(logistikiExpert.label).toBe('Logistiki');
  });
});

describe('logistikiExpert.match — routing', () => {
  it('scores Swahili customs queries high', () => {
    expect(logistikiExpert.match(q('forodha na ushuru wa kontena'))).toBeGreaterThanOrEqual(0.5);
  });
  it('scores English logistics queries high', () => {
    expect(logistikiExpert.match(q('how do I clear customs at the port'))).toBeGreaterThanOrEqual(0.5);
  });
  it('ignores unrelated text', () => {
    expect(logistikiExpert.match(q('habari za asubuhi'))).toBe(0);
  });
});

describe('logistikiExpert.answer — Rubani brain', () => {
  it('answers a duty question with text + sources', async () => {
    const a = await logistikiExpert.answer(q('Compute duty for value 10000 at 25% in Tanzania'));
    expect(a.domain).toBe('logistiki');
    expect(a.text.sw.length).toBeGreaterThan(10);
    expect(a.sources?.some((s) => /Rubani/i.test(s.label))).toBe(true);
  });
});

describe('akili router — logistics routes to logistiki', () => {
  it('routes a customs question to the logistiki domain', async () => {
    const a = await askAkili('Nyaraka za kuondoa mzigo forodha Tanzania ni zipi?');
    expect(a.domain).toBe('logistiki');
  });
  it('does not steal a health question', async () => {
    const a = await askAkili('dalili za malaria ni zipi?');
    expect(a.domain).toBe('afya');
  });
});
