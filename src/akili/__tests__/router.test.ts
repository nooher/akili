import { describe, it, expect } from 'vitest';
import { createAkili } from '../router';
import { snilExpert } from '../experts/snil';
import { jumlaExpert } from '../experts/jumla';
import { askAkili, akili } from '../index';
import type { AkiliQuery, DomainExpert, AkiliAnswer } from '../types';

const base = () => createAkili([snilExpert, jumlaExpert]);

describe('router dispatch', () => {
  it('routes a math query to the SNIL expert and computes the answer', async () => {
    const a = await base().ask('kokotoa 2 + 3');
    expect(a.domain).toBe('snil');
    expect(a.expert).toBe('snil-tool');
    expect(a.snil?.output.trim()).toBe('5');
    expect(a.text.sw).toContain('5');
  });

  it('routes a sum-of-list request to SNIL and sums correctly', async () => {
    const a = await base().ask('jumla ya 10, 20, 30');
    expect(a.domain).toBe('snil');
    expect(a.snil?.output.trim()).toBe('60');
    expect(a.snil?.code).toContain('kwa kila');
  });

  it('routes an average request to SNIL', async () => {
    const a = await base().ask('wastani wa 4, 8, 6');
    expect(a.domain).toBe('snil');
    expect(a.snil?.output.trim()).toBe('6');
  });

  it('computes a factorial', async () => {
    const a = await base().ask('factorial ya 5');
    expect(a.snil?.output.trim()).toBe('120');
  });

  it('lists a numeric range', async () => {
    const a = await base().ask('namba kutoka 1 hadi 5');
    expect(a.snil?.output.trim().split('\n')).toEqual(['1', '2', '3', '4', '5']);
  });

  it('multiplies via zidisha', async () => {
    const a = await base().ask('zidisha 6 kwa 7');
    expect(a.snil?.output.trim()).toBe('42');
  });

  it('routes a greeting to jumla', async () => {
    const a = await base().ask('Habari yako?');
    expect(a.domain).toBe('jumla');
    expect(a.expert).toBe('jumla-general');
  });

  it('answers "what is Akili" from jumla', async () => {
    const a = await base().ask('Akili ni nini?');
    expect(a.domain).toBe('jumla');
    expect(a.text.sw).toMatch(/Afya|Fasihi|SNIL/);
  });

  it('falls back to jumla for an unknown query without throwing', async () => {
    const a = await base().ask('xyzzy plugh frobozz');
    expect(a.domain).toBe('jumla');
    expect(a.confidence).toBe('low');
  });

  it('runs direct SNIL passthrough (raw source)', async () => {
    const a = await base().ask('onyesha "Jambo" + " " + "Dunia"');
    expect(a.domain).toBe('snil');
    expect(a.snil?.output.trim()).toBe('Jambo Dunia');
  });

  it('runs direct SNIL after an "endesha:" marker', async () => {
    const a = await base().ask('endesha: onyesha 9 * 9');
    expect(a.domain).toBe('snil');
    expect(a.snil?.output.trim()).toBe('81');
  });

  it('normalizes a structured query', async () => {
    const q: AkiliQuery = { text: 'kokotoa 7 + 1', lang: 'sw' };
    const a = await base().ask(q);
    expect(a.snil?.output.trim()).toBe('8');
  });
});

describe('router robustness', () => {
  it('handles an expert that throws in answer() and still returns', async () => {
    const boom: DomainExpert = {
      id: 'boom',
      domain: 'afya',
      label: 'Boom',
      match: () => 0.99,
      answer: () => {
        throw new Error('kaboom');
      },
    };
    const a = await createAkili([boom, jumlaExpert]).ask('anything at all');
    // boom wins the score but throws; router falls through to jumla.
    expect(a.expert).not.toBe('boom');
    expect(a.domain).toBe('jumla');
  });

  it('handles an expert that throws in match()', async () => {
    const boom: DomainExpert = {
      id: 'boom2',
      domain: 'afya',
      label: 'Boom2',
      match: () => {
        throw new Error('match kaboom');
      },
      answer: (): AkiliAnswer => ({
        domain: 'afya',
        expert: 'boom2',
        text: { sw: 'x' },
        confidence: 'high',
      }),
    };
    const a = await createAkili([boom, snilExpert, jumlaExpert]).ask('kokotoa 1 + 1');
    expect(a.snil?.output.trim()).toBe('2');
  });

  it('returns an empty-registry answer with no experts', async () => {
    const a = await createAkili([]).ask('hello');
    expect(a.expert).toBe('router');
  });
});

describe('public API', () => {
  it('askAkili works against the default registry', async () => {
    const a = await askAkili('kokotoa 100 + 1');
    expect(a.snil?.output.trim()).toBe('101');
  });

  it('the default akili instance has snil + jumla registered', () => {
    const ids = akili.experts.map((e) => e.id);
    expect(ids).toContain('snil-tool');
    expect(ids).toContain('jumla-general');
  });
});
