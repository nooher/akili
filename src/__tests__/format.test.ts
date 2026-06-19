// format.test.ts — unit tests for the pure presentation helpers.
import { describe, it, expect } from 'vitest';
import {
  confidenceLabel,
  domainClass,
  domainLabel,
  ERROR_SW,
  isWarningLine,
  toLines,
} from '../ui/format';
import type { AkiliDomain } from '../akili/types';

describe('domainLabel', () => {
  it('maps each domain to its Swahili label', () => {
    expect(domainLabel('afya')).toBe('Afya');
    expect(domainLabel('fasihi')).toBe('Fasihi');
    expect(domainLabel('lugha')).toBe('Lugha');
    expect(domainLabel('snil')).toBe('SNIL');
    expect(domainLabel('jumla')).toBe('Jumla');
  });

  it('falls back to Jumla for an unknown domain', () => {
    expect(domainLabel('mystery' as AkiliDomain)).toBe('Jumla');
  });
});

describe('domainClass', () => {
  it('returns the domain as a class suffix for known domains', () => {
    for (const d of ['afya', 'fasihi', 'lugha', 'snil', 'jumla'] as AkiliDomain[]) {
      expect(domainClass(d)).toBe(d);
    }
  });

  it('returns jumla for an unknown domain', () => {
    expect(domainClass('weird' as AkiliDomain)).toBe('jumla');
  });
});

describe('confidenceLabel', () => {
  it('maps confidence levels to Swahili', () => {
    expect(confidenceLabel('high')).toBe('Uhakika wa juu');
    expect(confidenceLabel('medium')).toBe('Uhakika wa kati');
    expect(confidenceLabel('low')).toBe('Uhakika mdogo');
  });
});

describe('toLines', () => {
  it('preserves line breaks including blank lines', () => {
    expect(toLines('Habari\n\nUjumbe')).toEqual(['Habari', '', 'Ujumbe']);
  });

  it('normalises CRLF and CR to LF', () => {
    expect(toLines('a\r\nb\rc')).toEqual(['a', 'b', 'c']);
  });

  it('returns a single element for text with no breaks', () => {
    expect(toLines('moja')).toEqual(['moja']);
  });
});

describe('isWarningLine', () => {
  it('detects ⚠ bullet lines, with or without leading space', () => {
    expect(isWarningLine('⚠ Tahadhari')).toBe(true);
    expect(isWarningLine('   ⚠ Tahadhari')).toBe(true);
  });

  it('is false for ordinary text', () => {
    expect(isWarningLine('Dalili za malaria')).toBe(false);
  });
});

describe('ERROR_SW', () => {
  it('is a non-empty Swahili message', () => {
    expect(ERROR_SW.length).toBeGreaterThan(0);
    expect(ERROR_SW).toMatch(/Samahani/);
  });
});
