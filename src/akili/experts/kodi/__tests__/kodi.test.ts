// Tests for the Kodi (TRA / tax administration) domain expert — sovereign KB.
import { describe, it, expect } from 'vitest';
import { kodiExpert } from '../index';
import type { AkiliQuery } from '../../../types';

const q = (text: string): AkiliQuery => ({ text, lang: 'sw' });

describe('kodiExpert.match', () => {
  it('scores high on a TIN registration query', () => {
    expect(kodiExpert.match(q('nataka kupata tin nambari ya mlipakodi'))).toBeGreaterThan(0.7);
  });

  it('scores moderate on a single cue', () => {
    expect(kodiExpert.match(q('vat ni kiasi gani'))).toBeGreaterThan(0.5);
  });

  it('scores high on English tax cues', () => {
    expect(kodiExpert.match(q('how do I file a tax objection appeal'))).toBeGreaterThan(0.7);
  });

  it('scores zero on an unrelated (clinical) query', () => {
    expect(kodiExpert.match(q('dalili za homa'))).toBe(0);
  });

  it('scores zero on empty input', () => {
    expect(kodiExpert.match(q(''))).toBe(0);
  });
});

describe('kodiExpert.answer', () => {
  it('returns a populated AkiliAnswer with sources + tax disclaimer', async () => {
    const a = await kodiExpert.answer(q('jinsi ya kusajili tin'));
    expect(a.domain).toBe('kodi');
    expect(a.expert).toBe('kodi-tra-msingi');
    expect(a.text.sw.length).toBeGreaterThan(0);
    expect(a.text.en && a.text.en.length).toBeTruthy();
    expect(/si ushauri rasmi wa kodi/i.test(a.text.sw)).toBe(true);
    expect(a.sources!.some((s) => /TRA|BRELA/i.test(s.label))).toBe(true);
  });

  it('retrieves the objection/appeal entry for a pingamizi query', async () => {
    const a = await kodiExpert.answer(q('nataka kupinga tathmini ya kodi, rufaa trab'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('pingamizi-rufaa');
  });

  it('retrieves the presumptive tax entry for a small-business turnover query', async () => {
    const a = await kodiExpert.answer(q('kodi ya makadirio kwa biashara ndogo turnover'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kodi-makadirio');
  });

  it('retrieves the EFD/VFD entry for a receipt-machine query', async () => {
    const a = await kodiExpert.answer(q('bei ya efd na vfd kwa risiti'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('efd-vfd');
  });

  it('retrieves the withholding tax entry, not a wrong default', async () => {
    const a = await kodiExpert.answer(q('kodi ya zuio ni nini'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kodi-zuio-wht');
  });

  it('retrieves the stamp duty entry', async () => {
    const a = await kodiExpert.answer(q('stamp duty ni nini kwa mkataba wa pango'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('stempu-stamp-duty');
  });

  it('retrieves the SDL entry and routes it to the kodi domain (not jumla)', async () => {
    const a = await kodiExpert.answer(q('skills development levy ni asilimia ngapi'));
    expect(a.domain).toBe('kodi');
    const data = a.data as { entry: string };
    expect(data.entry).toBe('sdl');
  });

  it('retrieves the tax clearance certificate entry', async () => {
    const a = await kodiExpert.answer(q('tax clearance certificate napataje'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('cheti-cha-kodi');
  });

  it('retrieves the rental income entry', async () => {
    const a = await kodiExpert.answer(q('kodi ya nyumba ninayopangisha'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kodi-kupangisha-nyumba');
  });

  it('retrieves the capital gains entry', async () => {
    const a = await kodiExpert.answer(q('nikiuza kiwanja nalipa capital gains tax gani'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kodi-faida-ya-mtaji');
  });

  it('retrieves the tax audit entry', async () => {
    const a = await kodiExpert.answer(q('tra wananikagua tax audit nifanye nini'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('ukaguzi-wa-kodi');
  });

  it('retrieves the corruption-reporting entry', async () => {
    const a = await kodiExpert.answer(q('afisa wa tra ananiomba rushwa nifanye nini'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kuripoti-rushwa');
  });

  it('retrieves the Zanzibar taxes entry', async () => {
    const a = await kodiExpert.answer(q('kodi zanzibar zrb zinatofautianaje na tra'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('kodi-zanzibar');
  });

  it('retrieves the e-invoicing entry', async () => {
    const a = await kodiExpert.answer(q('e-invoicing ni nini na inafanyaje kazi'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('e-invoicing');
  });

  it('retrieves the enforcement entry for an account-frozen query', async () => {
    const a = await kodiExpert.answer(q('tra wamefunga akaunti yangu ya benki'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('utekelezaji-kufunga-akaunti');
  });

  it('gives an honest "no specific info" answer instead of a wrong default when nothing real matches', async () => {
    // "kodi" alone triggers domain-level routing but shares no real per-entry cue.
    const a = await kodiExpert.answer(q('kodi ya samaki wa baharini'));
    const data = a.data as { entry: string };
    expect(data.entry).toBe('no-match');
    expect(a.confidence).toBe('low');
    expect(/sina taarifa mahususi/i.test(a.text.sw)).toBe(true);
  });
});
