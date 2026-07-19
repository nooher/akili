// cli.test.ts — unit tests for the Akili CLI's pure formatting helpers plus a
// couple of end-to-end engine assertions (the CLI consumes askAkili read-only).

import { describe, it, expect } from 'vitest';
import { askAkili } from '../../src/node';
import {
  confidenceWord,
  domainLabel,
  ERROR_SW,
  isWarningLine,
  renderAnswer,
  renderBadge,
  renderSnil,
  renderSources,
  shouldUseColor,
  stripMarkdown,
  toLines,
} from '../format';
import type { AkiliAnswer, AkiliDomain } from '../../src/akili/types';

const baseAnswer: AkiliAnswer = {
  domain: 'afya',
  expert: 'afya-tibaai',
  text: { sw: 'Dalili za malaria ni homa.' },
  confidence: 'high',
};

describe('domainLabel', () => {
  it('maps every domain to its Swahili label', () => {
    const cases: Record<AkiliDomain, string> = {
      afya: 'Afya',
      fasihi: 'Fasihi',
      lugha: 'Lugha',
      sheria: 'Sheria',
      kilimo: 'Kilimo',
      elimu: 'Elimu',
      biashara: 'Biashara',
      logistiki: 'Logistiki',
      kodi: 'Kodi',
      snil: 'SNIL',
      jumla: 'Jumla',
    };
    for (const [d, label] of Object.entries(cases)) {
      expect(domainLabel(d as AkiliDomain)).toBe(label);
    }
  });

  it('falls back to Jumla for an unknown domain', () => {
    expect(domainLabel('mystery' as AkiliDomain)).toBe('Jumla');
  });
});

describe('confidenceWord', () => {
  it('maps confidence to a short Swahili word', () => {
    expect(confidenceWord('high')).toBe('juu');
    expect(confidenceWord('medium')).toBe('kati');
    expect(confidenceWord('low')).toBe('ndogo');
  });
});

describe('renderBadge', () => {
  it('renders the domain · expert · uhakika line', () => {
    expect(renderBadge(baseAnswer, false)).toBe(
      '[Afya · afya-tibaai · uhakika: juu]',
    );
  });

  it('wraps in ANSI when color is on', () => {
    const out = renderBadge(baseAnswer, true);
    expect(out).toContain('[Afya · afya-tibaai · uhakika: juu]');
    expect(out).toContain('\x1b['); // contains an escape code
  });
});

describe('stripMarkdown', () => {
  it('strips bold, italic, code, headings and bullets', () => {
    expect(stripMarkdown('**Tahadhari**')).toBe('Tahadhari');
    expect(stripMarkdown('`onyesha`')).toBe('onyesha');
    expect(stripMarkdown('## Kichwa')).toBe('Kichwa');
    expect(stripMarkdown('- jambo')).toBe('• jambo');
  });

  it('keeps the warning marker', () => {
    expect(isWarningLine('⚠ Tahadhari')).toBe(true);
    expect(isWarningLine('jambo')).toBe(false);
  });
});

describe('toLines', () => {
  it('preserves blank lines and normalises CRLF/CR', () => {
    expect(toLines('a\r\n\rb')).toEqual(['a', '', 'b']);
  });
});

describe('renderSources', () => {
  it('returns empty string when there are no sources', () => {
    expect(renderSources(baseAnswer, false)).toBe('');
  });

  it('lists labels and refs', () => {
    const ans: AkiliAnswer = {
      ...baseAnswer,
      sources: [{ label: 'WHO' }, { label: 'SNIL', ref: '@laetoli/snil' }],
    };
    const out = renderSources(ans, false);
    expect(out).toContain('Vyanzo:');
    expect(out).toContain('• WHO');
    expect(out).toContain('• SNIL (@laetoli/snil)');
  });
});

describe('renderSnil', () => {
  it('returns empty string when there is no SNIL trace', () => {
    expect(renderSnil(baseAnswer, false)).toBe('');
  });

  it('renders the code and Matokeo line', () => {
    const ans: AkiliAnswer = {
      ...baseAnswer,
      domain: 'snil',
      snil: { code: 'onyesha 2 + 3', output: '5\n' },
    };
    const out = renderSnil(ans, false);
    expect(out).toContain('SNIL:');
    expect(out).toContain('onyesha 2 + 3');
    expect(out).toContain('Matokeo: 5');
  });

  it('renders Hitilafu on error', () => {
    const ans: AkiliAnswer = {
      ...baseAnswer,
      domain: 'snil',
      snil: { code: 'x', output: '', error: 'boom' },
    };
    expect(renderSnil(ans, false)).toContain('Hitilafu: boom');
  });
});

describe('renderAnswer', () => {
  it('assembles badge + body, with no trailing whitespace', () => {
    const out = renderAnswer(baseAnswer, false);
    expect(out.startsWith('[Afya · afya-tibaai · uhakika: juu]')).toBe(true);
    expect(out).toContain('Dalili za malaria ni homa.');
    expect(out).toBe(out.replace(/\s+$/, ''));
  });
});

describe('shouldUseColor (NO_COLOR + TTY)', () => {
  it('is true only when a TTY and NO_COLOR is unset', () => {
    expect(shouldUseColor({ isTTY: true, env: {} })).toBe(true);
    expect(shouldUseColor({ isTTY: false, env: {} })).toBe(false);
  });

  it('is false whenever NO_COLOR is present (even empty)', () => {
    expect(shouldUseColor({ isTTY: true, env: { NO_COLOR: '1' } })).toBe(false);
    expect(shouldUseColor({ isTTY: true, env: { NO_COLOR: '' } })).toBe(false);
  });
});

describe('engine integration (read-only consumption)', () => {
  it('routes a calculation to the snil domain with output containing 5', async () => {
    const ans = await askAkili('kokotoa 2 + 3');
    expect(ans.domain).toBe('snil');
    expect(ans.snil).toBeDefined();
    expect(ans.snil?.output).toContain('5');
  });

  it('routes a clinical question to the afya domain', async () => {
    const ans = await askAkili('dalili za malaria');
    expect(ans.domain).toBe('afya');
  });
});

describe('ERROR_SW', () => {
  it('is a friendly Swahili fallback', () => {
    expect(ERROR_SW).toMatch(/Samahani/);
  });
});
