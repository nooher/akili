// exportChat.ts — pure serialisers + a guarded browser download for a single
// Akili conversation. No React, no engine imports, no DOM at module load: the
// transform functions are trivially unit-testable and the only browser-touching
// function (download) guards for SSR/test runtimes.

import type { StoredMsg } from './memory';
import type { SessionMeta } from './sessions';
import { domainLabel } from '../ui/format';

/** Speaker labels used in the Markdown/JSON transcript. */
const YOU = 'Wewe';
const AKILI = 'Akili';

function slugify(title: string): string {
  const base = (title ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'mazungumzo';
}

/**
 * Render a conversation as a clean Markdown transcript. Each turn becomes a
 * labelled block: the user as **Wewe**, Akili answers as **Akili** prefixed with
 * their domain label, errors flagged plainly. SNIL traces are preserved as
 * fenced code blocks so they round-trip; an English answer (if present) follows
 * under its own sub-heading.
 */
export function toMarkdown(messages: StoredMsg[], title: string): string {
  const lines: string[] = [];
  lines.push(`# ${title || 'Mazungumzo na Akili'}`);
  lines.push('');
  lines.push(`_Imehifadhiwa kutoka Akili — AI ya Kiswahili · ${new Date().toISOString()}_`);
  lines.push('');

  for (const m of messages) {
    if (m.role === 'user') {
      lines.push(`### ${YOU}`);
      lines.push('');
      lines.push(m.text);
      lines.push('');
      continue;
    }
    if (m.role === 'error') {
      lines.push(`### ${AKILI} (hitilafu)`);
      lines.push('');
      lines.push(m.text);
      lines.push('');
      continue;
    }
    // Akili answer.
    const a = m.answer;
    lines.push(`### ${AKILI} · ${domainLabel(a.domain)}`);
    lines.push('');
    lines.push(a.text.sw);
    lines.push('');
    if (a.text.en && a.text.en.trim()) {
      lines.push('**Kiingereza:**');
      lines.push('');
      lines.push(a.text.en);
      lines.push('');
    }
    if (a.snil) {
      lines.push('**SNIL:**');
      lines.push('');
      lines.push('```snil');
      lines.push(a.snil.code);
      lines.push('```');
      lines.push('');
      const out = a.snil.error ? a.snil.error : a.snil.output;
      if (out && out.trim()) {
        lines.push('**Matokeo:**');
        lines.push('');
        lines.push('```');
        lines.push(out);
        lines.push('```');
        lines.push('');
      }
    }
    if (a.sources && a.sources.length > 0) {
      lines.push(`**Vyanzo:** ${a.sources.map((s) => s.label).join(', ')}`);
      lines.push('');
    }
  }

  // Collapse a trailing blank line, ensure a single terminal newline.
  return `${lines.join('\n').replace(/\n+$/, '')}\n`;
}

/** The on-disk JSON export shape — the session meta plus its full transcript. */
export interface ChatExport {
  app: 'akili';
  kind: 'conversation';
  version: 1;
  exportedAt: string;
  session: SessionMeta;
  messages: StoredMsg[];
}

/** Serialise a session + its messages to a stable, re-importable JSON object. */
export function toJSON(session: SessionMeta, messages: StoredMsg[]): ChatExport {
  return {
    app: 'akili',
    kind: 'conversation',
    version: 1,
    exportedAt: new Date().toISOString(),
    session,
    messages,
  };
}

// ── browser download (guarded) ─────────────────────────────────────────────────

/** True only in a DOM environment with the Blob/URL plumbing we need. */
function canDownload(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function' &&
    typeof Blob !== 'undefined'
  );
}

/**
 * Trigger a client-side file download for `content`. No-op (returns false) in
 * SSR/test runtimes so callers can invoke it unconditionally. Returns true when
 * a download was actually initiated.
 */
export function downloadFile(filename: string, content: string, mime: string): boolean {
  if (!canDownload()) return false;
  try {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke on the next tick so the click has a chance to start the download.
    setTimeout(() => URL.revokeObjectURL(url), 0);
    return true;
  } catch {
    return false;
  }
}

/** Build a safe `<slug>.md` / `<slug>.json` filename from a title. */
export function exportFilename(title: string, ext: 'md' | 'json'): string {
  return `akili-${slugify(title)}.${ext}`;
}

/** Convenience: download the current conversation as Markdown. */
export function downloadMarkdown(messages: StoredMsg[], title: string): boolean {
  return downloadFile(
    exportFilename(title, 'md'),
    toMarkdown(messages, title),
    'text/markdown;charset=utf-8',
  );
}

/** Convenience: download the current conversation as JSON. */
export function downloadJSON(session: SessionMeta, messages: StoredMsg[]): boolean {
  return downloadFile(
    exportFilename(session.title, 'json'),
    JSON.stringify(toJSON(session, messages), null, 2),
    'application/json;charset=utf-8',
  );
}
