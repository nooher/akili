// followups.test.ts — unit tests for the follow-up suggestion helper.
import { describe, it, expect } from 'vitest';
import { followupsFor, MAX_FOLLOWUPS } from '../ui/followups';
import type { AkiliDomain } from '../akili/types';

const ALL_DOMAINS: AkiliDomain[] = [
  'afya',
  'fasihi',
  'lugha',
  'sheria',
  'kilimo',
  'elimu',
  'biashara',
  'snil',
  'jumla',
];

describe('followupsFor', () => {
  it('returns 2–3 suggestions for every known domain', () => {
    for (const d of ALL_DOMAINS) {
      const out = followupsFor(d);
      expect(out.length).toBeGreaterThanOrEqual(2);
      expect(out.length).toBeLessThanOrEqual(MAX_FOLLOWUPS);
      expect(out.every((s) => typeof s === 'string' && s.trim().length > 0)).toBe(true);
    }
  });

  it('gives the documented afya follow-ups', () => {
    const out = followupsFor('afya');
    expect(out).toContain('Dalili za hatari ni zipi?');
    expect(out).toContain('Tiba yake ni nini?');
  });

  it('gives the SNIL "show its Python" follow-up', () => {
    expect(followupsFor('snil')).toContain('Nionyeshe Python yake');
  });

  it('falls back to the general (jumla) set for an unknown domain', () => {
    const unknown = followupsFor('mystery' as AkiliDomain);
    expect(unknown).toEqual(followupsFor('jumla'));
  });

  it('respects an explicit limit', () => {
    expect(followupsFor('afya', 1)).toHaveLength(1);
    expect(followupsFor('afya', 0)).toHaveLength(0);
  });

  it('clamps a limit larger than the list to the list length', () => {
    const out = followupsFor('afya', 99);
    expect(out.length).toBeLessThanOrEqual(MAX_FOLLOWUPS);
  });

  it('clamps a negative limit to zero', () => {
    expect(followupsFor('afya', -5)).toHaveLength(0);
  });

  it('returns a fresh array each call (no shared mutable state)', () => {
    const a = followupsFor('lugha');
    const b = followupsFor('lugha');
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
    a.push('mutated');
    expect(followupsFor('lugha')).not.toContain('mutated');
  });
});
