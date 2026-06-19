// exportChat.test.ts — pure serialisers for a single conversation: Markdown
// transcript shape + JSON export shape + filename slugging. The browser download
// path is guarded and is a no-op in the node test runtime.
import { describe, it, expect } from 'vitest';
import {
  toMarkdown,
  toJSON,
  exportFilename,
  downloadFile,
  type ChatExport,
} from '../exportChat';
import type { StoredMsg } from '../memory';
import type { SessionMeta } from '../sessions';
import type { AkiliAnswer } from '../../akili/types';

const afyaAnswer: AkiliAnswer = {
  domain: 'afya',
  expert: 'afya-tibaai',
  text: { sw: 'Kunywa maji mengi.', en: 'Drink plenty of water.' },
  confidence: 'high',
  sources: [{ label: 'STG Tanzania' }, { label: 'WHO' }],
};

const snilAnswer: AkiliAnswer = {
  domain: 'snil',
  expert: 'snil-tool',
  text: { sw: 'Wastani ni 20.' },
  confidence: 'high',
  snil: { code: 'kokotoa wastani wa 10, 20, 30', output: '20' },
};

const messages: StoredMsg[] = [
  { id: 'm1', role: 'user', text: 'Nina homa' },
  { id: 'm2', role: 'akili', answer: afyaAnswer },
  { id: 'm3', role: 'user', text: 'Kokotoa wastani' },
  { id: 'm4', role: 'akili', answer: snilAnswer },
  { id: 'm5', role: 'error', text: 'Hitilafu imetokea' },
];

const meta: SessionMeta = {
  id: 'c-123',
  title: 'Afya na hesabu',
  createdAt: '2026-06-18T10:00:00.000Z',
  updatedAt: '2026-06-18T10:05:00.000Z',
};

describe('toMarkdown', () => {
  const md = toMarkdown(messages, meta.title);

  it('starts with the title as an H1', () => {
    expect(md.startsWith('# Afya na hesabu')).toBe(true);
  });

  it('labels speakers (Wewe / Akili) and domains', () => {
    expect(md).toContain('### Wewe');
    expect(md).toContain('### Akili · Afya');
    expect(md).toContain('### Akili · SNIL');
  });

  it('includes the Swahili answer text and the English toggle body', () => {
    expect(md).toContain('Kunywa maji mengi.');
    expect(md).toContain('**Kiingereza:**');
    expect(md).toContain('Drink plenty of water.');
  });

  it('preserves SNIL as a fenced code block with output', () => {
    expect(md).toContain('```snil');
    expect(md).toContain('kokotoa wastani wa 10, 20, 30');
    expect(md).toContain('**Matokeo:**');
    expect(md).toContain('20');
  });

  it('lists sources', () => {
    expect(md).toContain('**Vyanzo:** STG Tanzania, WHO');
  });

  it('flags error turns', () => {
    expect(md).toContain('### Akili (hitilafu)');
    expect(md).toContain('Hitilafu imetokea');
  });

  it('ends with a single trailing newline', () => {
    expect(md.endsWith('\n')).toBe(true);
    expect(md.endsWith('\n\n')).toBe(false);
  });

  it('falls back to a default title when blank', () => {
    expect(toMarkdown([], '')).toContain('# Mazungumzo na Akili');
  });
});

describe('toJSON', () => {
  const json: ChatExport = toJSON(meta, messages);

  it('has the stable export envelope', () => {
    expect(json.app).toBe('akili');
    expect(json.kind).toBe('conversation');
    expect(json.version).toBe(1);
    expect(typeof json.exportedAt).toBe('string');
  });

  it('embeds the session meta and full transcript', () => {
    expect(json.session).toEqual(meta);
    expect(json.messages).toHaveLength(5);
    expect(json.messages[1]).toMatchObject({ role: 'akili' });
  });

  it('round-trips through JSON.stringify/parse', () => {
    const back = JSON.parse(JSON.stringify(json)) as ChatExport;
    expect(back.session.id).toBe('c-123');
    expect(back.messages).toHaveLength(5);
  });
});

describe('exportFilename', () => {
  it('slugifies the title with the right extension', () => {
    expect(exportFilename('Afya na hesabu', 'md')).toBe('akili-afya-na-hesabu.md');
    expect(exportFilename('Afya na hesabu', 'json')).toBe('akili-afya-na-hesabu.json');
  });
  it('falls back to a default slug for empty/symbol-only titles', () => {
    expect(exportFilename('', 'md')).toBe('akili-mazungumzo.md');
    expect(exportFilename('!!!', 'json')).toBe('akili-mazungumzo.json');
  });
});

describe('downloadFile (guarded)', () => {
  it('is a safe no-op (returns false) without a DOM', () => {
    expect(downloadFile('x.md', 'hello', 'text/markdown')).toBe(false);
  });
});
