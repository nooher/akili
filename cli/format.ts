// cli/format.ts — pure, terminal-flavoured presentation helpers for the Akili
// CLI. No engine imports beyond the contract types, no Node APIs, no I/O: every
// function takes data and returns a string, so it is trivially unit-testable and
// the renderer (cli/akili.ts) stays a thin shell around it.
//
// ANSI colour is opt-in via a `color` flag the caller derives from the
// environment (TTY + NO_COLOR). When color is false every helper degrades to
// plain ASCII/UTF-8 text with zero escape codes.

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliDomain,
} from '../src/akili/types';

// ── domain / confidence labels ───────────────────────────────────────────────

/** Human Swahili label for a domain badge (mirrors the web console). */
export function domainLabel(domain: AkiliDomain): string {
  switch (domain) {
    case 'afya':
      return 'Afya';
    case 'fasihi':
      return 'Fasihi';
    case 'lugha':
      return 'Lugha';
    case 'sheria':
      return 'Sheria';
    case 'kilimo':
      return 'Kilimo';
    case 'elimu':
      return 'Elimu';
    case 'biashara':
      return 'Biashara';
    case 'snil':
      return 'SNIL';
    case 'jumla':
      return 'Jumla';
    default:
      return 'Jumla';
  }
}

/** Short Swahili confidence word for the badge line. */
export function confidenceWord(c: AkiliConfidence): string {
  switch (c) {
    case 'high':
      return 'juu';
    case 'medium':
      return 'kati';
    case 'low':
      return 'ndogo';
    default:
      return 'ndogo';
  }
}

// ── ANSI helpers ─────────────────────────────────────────────────────────────

/** 8-colour ANSI palette keyed by domain (only used when color is on). */
const DOMAIN_ANSI: Record<AkiliDomain, string> = {
  afya: '36', //     cyan
  fasihi: '35', //   magenta
  lugha: '34', //    blue
  sheria: '33', //   yellow
  kilimo: '32', //   green
  elimu: '36', //    cyan
  biashara: '33', // yellow
  snil: '32', //     green
  jumla: '37', //    white/grey
};

const ESC = '\x1b';
const RESET = `${ESC}[0m`;

function wrap(code: string, s: string, color: boolean): string {
  return color ? `${ESC}[${code}m${s}${RESET}` : s;
}

const bold = (s: string, color: boolean) => wrap('1', s, color);
const dim = (s: string, color: boolean) => wrap('2', s, color);

/**
 * Decide whether to emit ANSI colour. Honours the NO_COLOR convention
 * (https://no-color.org) and only colours when stdout is a TTY. Kept pure by
 * taking the env + isTTY explicitly so it can be unit-tested.
 */
export function shouldUseColor(opts: {
  isTTY: boolean;
  env: NodeJS.ProcessEnv;
}): boolean {
  // NO_COLOR convention: any value, including empty, disables colour.
  if (opts.env.NO_COLOR !== undefined) return false;
  return opts.isTTY;
}

// ── line helpers ─────────────────────────────────────────────────────────────

/** Normalise CRLF/CR to LF and split, preserving blank lines. */
export function toLines(text: string): string[] {
  return text.replace(/\r\n?/g, '\n').split('\n');
}

/**
 * Strip the light markdown the engine occasionally emits so it reads cleanly in
 * a terminal: bold, italic, inline code, leading "# " headings, and "- "/"* "
 * bullets (which become a "•"). Leaves the warning marker intact.
 */
export function stripMarkdown(line: string): string {
  let s = line;
  s = s.replace(/`([^`]+)`/g, '$1');
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1$2');
  s = s.replace(/(^|[^_])_([^_]+)_/g, '$1$2');
  s = s.replace(/^\s{0,3}#{1,6}\s+/, '');
  s = s.replace(/^(\s*)[-*]\s+/, '$1• ');
  return s;
}

/** True when a line should read as a warning bullet. */
export function isWarningLine(line: string): boolean {
  return /^\s*⚠/.test(line);
}

// ── component renderers ──────────────────────────────────────────────────────

/** The badge line, e.g. "[Afya · afya-tibaai · uhakika: juu]". */
export function renderBadge(ans: AkiliAnswer, color: boolean): string {
  const label = domainLabel(ans.domain);
  const inner = `${label} · ${ans.expert} · uhakika: ${confidenceWord(
    ans.confidence,
  )}`;
  const text = `[${inner}]`;
  return color ? wrap(`1;${DOMAIN_ANSI[ans.domain] ?? '37'}`, text, true) : text;
}

/** The Swahili answer body, markdown-stripped, warnings marked. */
export function renderBody(ans: AkiliAnswer, color: boolean): string {
  const lines = toLines(ans.text.sw).map((line) => {
    if (isWarningLine(line)) return bold(stripMarkdown(line), color);
    return stripMarkdown(line);
  });
  return lines.join('\n');
}

/** The "Vyanzo:" sources block, or '' when there are none. */
export function renderSources(ans: AkiliAnswer, color: boolean): string {
  if (!ans.sources || ans.sources.length === 0) return '';
  const head = dim('Vyanzo:', color);
  const items = ans.sources
    .map((s) => `  • ${s.label}${s.ref ? ` (${s.ref})` : ''}`)
    .map((l) => dim(l, color))
    .join('\n');
  return `${head}\n${items}`;
}

/**
 * The SNIL block: generated code then `Matokeo:` (or `Hitilafu:` on error).
 * Returns '' when the answer carries no SNIL trace.
 */
export function renderSnil(ans: AkiliAnswer, color: boolean): string {
  if (!ans.snil) return '';
  const head = dim('SNIL:', color);
  const code = ans.snil.code
    .split('\n')
    .map((l) => `  ${l}`)
    .map((l) => dim(l, color))
    .join('\n');
  const result = ans.snil.error
    ? bold(`Hitilafu: ${ans.snil.error}`, color)
    : bold(`Matokeo: ${ans.snil.output.trim() || '(hakuna matokeo)'}`, color);
  return `${head}\n${code}\n${result}`;
}

/**
 * Render a full AkiliAnswer for the terminal: badge, blank line, body, then the
 * SNIL block (if any) and sources (if any). Sections are separated by blank
 * lines and the whole thing is trimmed of trailing whitespace.
 */
export function renderAnswer(ans: AkiliAnswer, color: boolean): string {
  const parts: string[] = [renderBadge(ans, color), '', renderBody(ans, color)];
  const snil = renderSnil(ans, color);
  if (snil) parts.push('', snil);
  const sources = renderSources(ans, color);
  if (sources) parts.push('', sources);
  return parts.join('\n').replace(/\s+$/, '');
}

/** A friendly Swahili fallback when askAkili rejects — never leak a raw error. */
export const ERROR_SW =
  'Samahani, kumetokea hitilafu wakati wa kujibu. Tafadhali jaribu tena.';
