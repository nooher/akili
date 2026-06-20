import { describe, it, expect } from 'vitest';
import { createAkili, createAkiliSession } from '../router';
import { defaultExperts } from '../index';
import {
  emptyMemory,
  updateMemory,
  injectContext,
  looksLikeFollowUp,
} from '../memory';
import type { AkiliAnswer, AkiliQuery } from '../types';

// A real, full-registry session — sovereign + hermetic (no network anywhere).
const session = () => createAkiliSession(createAkili(defaultExperts));

describe('memory: pure helpers', () => {
  it('detects short anaphoric follow-ups but not new topics', () => {
    expect(looksLikeFollowUp('na VAT yake?')).toBe(true);
    expect(looksLikeFollowUp('and the VAT there?')).toBe(true);
    expect(looksLikeFollowUp('tiba yake?')).toBe(true);
    expect(looksLikeFollowUp('vipi kuhusu hilo?')).toBe(true);
    // A clear, self-contained new topic is NOT a follow-up.
    expect(looksLikeFollowUp('Dalili za malaria ni zipi?')).toBe(false);
    expect(looksLikeFollowUp('Compute the import duty for a container from China to Kenya')).toBe(false);
    expect(looksLikeFollowUp('')).toBe(false);
  });

  it('updateMemory accumulates entities from data.entities and records turns', () => {
    let mem = emptyMemory();
    const q1: AkiliQuery = { text: 'duty in Kenya' };
    const a1 = {
      domain: 'logistiki',
      expert: 'logistiki-rubani',
      text: { sw: '...' },
      confidence: 'high',
      data: { entities: { country: 'Kenya' }, topic: 'agency-kra' },
    } as AkiliAnswer;
    mem = updateMemory(mem, q1, a1);
    expect(mem.lastDomain).toBe('logistiki');
    expect(mem.entities.country).toBe('Kenya');
    expect(mem.recentTurns).toHaveLength(1);

    const q2: AkiliQuery = { text: 'by sea' };
    const a2 = {
      domain: 'logistiki',
      expert: 'logistiki-rubani',
      text: { sw: '...' },
      confidence: 'high',
      data: { entities: { mode: 'sea' } },
    } as AkiliAnswer;
    mem = updateMemory(mem, q2, a2);
    // Country persists, mode added — entities accumulate across turns.
    expect(mem.entities).toMatchObject({ country: 'Kenya', mode: 'sea' });
    expect(mem.recentTurns).toHaveLength(2);
  });

  it('injectContext exposes generic memory + logistiki shape when lastDomain is logistiki', () => {
    const mem = {
      lastDomain: 'logistiki' as const,
      lastExpert: 'logistiki-rubani',
      lastTopic: 'agency-kra',
      entities: { country: 'Kenya' },
      recentTurns: [],
    };
    const ctx = injectContext(undefined, mem);
    expect((ctx.memory as Record<string, unknown>).lastDomain).toBe('logistiki');
    expect(ctx.logistics).toEqual({ lastTopic: 'agency-kra', entities: { country: 'Kenya' } });
  });
});

describe('session multi-turn memory', () => {
  it('logistiki follow-up "and the VAT there?" stays logistiki and resolves Kenya', async () => {
    const s = session();
    const a1 = await s.ask('What is the import duty in Kenya?');
    expect(a1.domain).toBe('logistiki');
    expect(s.memory().entities.country).toBe('Kenya');

    const a2 = await s.ask('and the VAT there?');
    expect(a2.domain).toBe('logistiki');
    // The Kenya context resolved → the answer is about Kenya's VAT (16%).
    expect(`${a2.text.sw} ${a2.text.en ?? ''}`).toMatch(/Kenya|16/);
    expect(s.memory().entities.country).toBe('Kenya');
  });

  it('afya follow-up "tiba yake?" stays in afya', async () => {
    const s = session();
    const a1 = await s.ask('Dalili za malaria ni zipi?');
    expect(a1.domain).toBe('afya');

    const a2 = await s.ask('tiba yake?');
    expect(a2.domain).toBe('afya');
  });

  it('a clear topic switch (afya → logistiki) still re-routes (no over-stickiness)', async () => {
    const s = session();
    const a1 = await s.ask('Dalili za malaria ni zipi?');
    expect(a1.domain).toBe('afya');

    // A self-contained logistics question must win despite the afya bias.
    const a2 = await s.ask('Nyaraka gani zinahitajika kuagiza kontena forodha Tanzania?');
    expect(a2.domain).toBe('logistiki');
  });

  it('entities accumulate across turns within a session', async () => {
    const s = session();
    await s.ask('Compute the import duty for value 10000 at 25% in Kenya');
    expect(s.memory().entities.country).toBe('Kenya');
    await s.ask('vipi kuhusu Central Corridor?');
    // Country retained AND corridor added.
    expect(s.memory().entities).toMatchObject({ country: 'Kenya', corridor: 'Central Corridor' });
  });

  it('reset() clears the accumulated memory', async () => {
    const s = session();
    await s.ask('What is the import duty in Kenya?');
    expect(s.memory().lastDomain).toBe('logistiki');
    s.reset();
    expect(s.memory().entities).toEqual({});
    expect(s.memory().lastDomain).toBeUndefined();
  });
});
