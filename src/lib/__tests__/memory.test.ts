// memory.test.ts — the conversation-memory seam: validation, snapshot building,
// and the localStorage-backed store (with an injected fake storage).
import { describe, it, expect } from 'vitest';
import {
  parseSnapshot,
  buildSnapshot,
  createMemoryStore,
  MEMORY_KEY,
  MEMORY_VERSION,
  type StorageLike,
  type StoredMsg,
} from '../memory';
import type { AkiliAnswer } from '../../akili/types';

const answer: AkiliAnswer = {
  domain: 'afya',
  expert: 'afya-tibaai',
  text: { sw: 'Habari', en: 'Hello' },
  confidence: 'high',
};

const sample: StoredMsg[] = [
  { id: 'm1', role: 'user', text: 'Habari?' },
  { id: 'm2', role: 'akili', answer },
  { id: 'm3', role: 'error', text: 'Hitilafu' },
];

function fakeStorage(initial: Record<string, string> = {}): StorageLike & {
  data: Record<string, string>;
} {
  const data = { ...initial };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
    },
    removeItem: (k) => {
      delete data[k];
    },
  };
}

describe('buildSnapshot + parseSnapshot', () => {
  it('round-trips valid messages', () => {
    const snap = buildSnapshot(sample);
    expect(snap.version).toBe(MEMORY_VERSION);
    expect(snap.messages).toHaveLength(3);
    const parsed = parseSnapshot(JSON.stringify(snap));
    expect(parsed?.messages).toHaveLength(3);
    expect(parsed?.messages[1]).toMatchObject({ role: 'akili' });
  });

  it('drops malformed messages', () => {
    const snap = buildSnapshot([
      ...sample,
      { id: 'bad' } as unknown as StoredMsg,
      { role: 'akili', answer: { domain: 'afya' } } as unknown as StoredMsg,
    ]);
    expect(snap.messages).toHaveLength(3);
  });

  it('rejects null / garbage / wrong version', () => {
    expect(parseSnapshot(null)).toBeNull();
    expect(parseSnapshot('not json')).toBeNull();
    expect(parseSnapshot(JSON.stringify({ version: 99, messages: [] }))).toBeNull();
    expect(parseSnapshot(JSON.stringify({ version: MEMORY_VERSION }))).toBeNull();
  });
});

describe('createMemoryStore', () => {
  it('saves and loads through injected storage', () => {
    const store = createMemoryStore(fakeStorage());
    expect(store.load()).toBeNull();
    store.save(sample);
    const loaded = store.load();
    expect(loaded?.messages).toHaveLength(3);
  });

  it('clear() removes the snapshot', () => {
    const fs = fakeStorage();
    const store = createMemoryStore(fs);
    store.save(sample);
    expect(fs.data[MEMORY_KEY]).toBeDefined();
    store.clear();
    expect(store.load()).toBeNull();
    expect(fs.data[MEMORY_KEY]).toBeUndefined();
  });

  it('is a safe no-op with null storage', () => {
    const store = createMemoryStore(null);
    expect(() => store.save(sample)).not.toThrow();
    expect(store.load()).toBeNull();
    expect(() => store.clear()).not.toThrow();
  });

  it('never throws when storage misbehaves', () => {
    const broken: StorageLike = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('quota');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    };
    const store = createMemoryStore(broken);
    expect(store.load()).toBeNull();
    expect(() => store.save(sample)).not.toThrow();
    expect(() => store.clear()).not.toThrow();
  });
});
