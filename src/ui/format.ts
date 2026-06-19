// format.ts — pure presentation helpers for the Akili console. No React, no
// engine imports: just maps the AkiliAnswer contract onto display primitives so
// they're trivially unit-testable.

import type { AkiliConfidence, AkiliDomain } from '../akili/types';

/** Human Swahili label shown on a domain badge. */
export function domainLabel(domain: AkiliDomain): string {
  switch (domain) {
    case 'afya':
      return 'Afya';
    case 'fasihi':
      return 'Fasihi';
    case 'lugha':
      return 'Lugha';
    case 'snil':
      return 'SNIL';
    case 'jumla':
      return 'Jumla';
    default:
      return 'Jumla';
  }
}

/**
 * CSS class suffix for a domain — drives the solid badge colour in styles.css
 * (.badge--afya, .badge--fasihi, …). Keeping it a pure map means the palette
 * lives in CSS while the mapping stays testable.
 */
export function domainClass(domain: AkiliDomain): string {
  const known: AkiliDomain[] = ['afya', 'fasihi', 'lugha', 'snil', 'jumla'];
  return known.includes(domain) ? domain : 'jumla';
}

/** Swahili label for a confidence level (shown in the confidence pill). */
export function confidenceLabel(confidence: AkiliConfidence): string {
  switch (confidence) {
    case 'high':
      return 'Uhakika wa juu';
    case 'medium':
      return 'Uhakika wa kati';
    case 'low':
      return 'Uhakika mdogo';
    default:
      return 'Uhakika mdogo';
  }
}

/**
 * Split answer text into lines for line-break-preserving rendering. The engine
 * emits headings and "⚠" bullets separated by "\n"; we normalise CRLF and keep
 * empty lines (they become vertical gaps in the card).
 */
export function toLines(text: string): string[] {
  return text.replace(/\r\n?/g, '\n').split('\n');
}

/** True when a line should read as a bullet/warning (renders with a marker). */
export function isWarningLine(line: string): boolean {
  return /^\s*⚠/.test(line);
}

/** A friendly Swahili fallback when askAkili rejects — never leak a raw error. */
export const ERROR_SW =
  'Samahani, kumetokea hitilafu wakati wa kujibu. Tafadhali jaribu tena.';
