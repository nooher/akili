// sessions.test.ts — the multi-session store: CRUD, auto-title, current-session
// resolution, and migration from the legacy single `akili:session` snapshot.
import { describe, it, expect, beforeEach } from 'vitest';
import {
  listSessions,
  createSession,
  getSession,
  getSessionMeta,
  saveSession,
  renameSession,
  deleteSession,
  currentSessionId,
  setCurrent,
  resolveInitialSession,
  migrateLegacy,
  titleFromMessages,
  cleanTitle,
  SESSIONS_KEY,
  CURRENT_KEY,
  SESSION_PREFIX,
  DEFAULT_TITLE,
  TITLE_MAX,
} from '../sessions';
import { buildSnapshot, MEMORY_KEY, type StorageLike, type StoredMsg } from '../memory';
import type { AkiliAnswer } from '../../akili/types';

const answer: AkiliAnswer = {
  domain: 'afya',
  expert: 'afya-tibaai',
  text: { sw: 'Jibu', en: 'Answer' },
  confidence: 'high',
};

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

let store: ReturnType<typeof fakeStorage>;
beforeEach(() => {
  store = fakeStorage();
});

describe('cleanTitle / titleFromMessages', () => {
  it('collapses whitespace and trims', () => {
    expect(cleanTitle('  hello   world  ')).toBe('hello world');
  });
  it('falls back to default for empty', () => {
    expect(cleanTitle('   ')).toBe(DEFAULT_TITLE);
    expect(cleanTitle('')).toBe(DEFAULT_TITLE);
  });
  it('truncates long titles with an ellipsis', () => {
    const long = 'a'.repeat(TITLE_MAX + 20);
    const t = cleanTitle(long);
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t.endsWith('…')).toBe(true);
  });
  it('derives a title from the first user message', () => {
    const msgs: StoredMsg[] = [
      { id: 'm1', role: 'user', text: 'Dalili za malaria ni zipi?' },
      { id: 'm2', role: 'akili', answer },
    ];
    expect(titleFromMessages(msgs)).toBe('Dalili za malaria ni zipi?');
  });
  it('uses default when there is no user message', () => {
    expect(titleFromMessages([{ id: 'm1', role: 'akili', answer }])).toBe(DEFAULT_TITLE);
  });
});

describe('createSession + listSessions', () => {
  it('creates a session, persists meta + empty snapshot, sets current', () => {
    const meta = createSession(undefined, store);
    expect(meta.title).toBe(DEFAULT_TITLE);
    expect(store.data[SESSIONS_KEY]).toBeDefined();
    expect(store.data[`${SESSION_PREFIX}${meta.id}`]).toBeDefined();
    expect(store.data[CURRENT_KEY]).toBe(meta.id);
    expect(listSessions(store)).toHaveLength(1);
  });

  it('honours an explicit title', () => {
    const meta = createSession('Mradi wangu', store);
    expect(meta.title).toBe('Mradi wangu');
  });

  it('lists newest-updated first', async () => {
    const a = createSession('A', store);
    const b = createSession('B', store);
    // Make A more recently updated.
    saveSession(a.id, [{ id: 'm1', role: 'user', text: 'hi' }], store);
    const ids = listSessions(store).map((s) => s.id);
    expect(ids[0]).toBe(a.id);
    expect(ids).toContain(b.id);
  });
});

describe('saveSession + auto-title', () => {
  it('persists messages retrievable via getSession', () => {
    const meta = createSession(undefined, store);
    const msgs: StoredMsg[] = [{ id: 'm1', role: 'user', text: 'Habari' }];
    saveSession(meta.id, msgs, store);
    expect(getSession(meta.id, store)?.messages).toHaveLength(1);
  });

  it('auto-titles an untitled session from the first user message', () => {
    const meta = createSession(undefined, store);
    expect(meta.title).toBe(DEFAULT_TITLE);
    saveSession(meta.id, [{ id: 'm1', role: 'user', text: 'Tafsiri neno hili' }], store);
    expect(getSessionMeta(meta.id, store)?.title).toBe('Tafsiri neno hili');
  });

  it('does NOT overwrite a custom title on save', () => {
    const meta = createSession('Jina langu', store);
    saveSession(meta.id, [{ id: 'm1', role: 'user', text: 'kitu kingine' }], store);
    expect(getSessionMeta(meta.id, store)?.title).toBe('Jina langu');
  });

  it('creates a meta row defensively if missing', () => {
    saveSession('ghost-id', [{ id: 'm1', role: 'user', text: 'nani' }], store);
    expect(getSessionMeta('ghost-id', store)).not.toBeNull();
  });
});

describe('renameSession', () => {
  it('renames and falls back to default on empty', () => {
    const meta = createSession('Old', store);
    renameSession(meta.id, 'New', store);
    expect(getSessionMeta(meta.id, store)?.title).toBe('New');
    renameSession(meta.id, '   ', store);
    expect(getSessionMeta(meta.id, store)?.title).toBe(DEFAULT_TITLE);
  });
  it('is a no-op for an unknown id', () => {
    expect(() => renameSession('nope', 'x', store)).not.toThrow();
  });
});

describe('deleteSession', () => {
  it('removes meta + transcript and clears current when active', () => {
    const meta = createSession(undefined, store);
    setCurrent(meta.id, store);
    const remaining = deleteSession(meta.id, store);
    expect(remaining).toHaveLength(0);
    expect(getSession(meta.id, store)).toBeNull();
    expect(store.data[CURRENT_KEY]).toBeUndefined();
  });

  it('keeps other sessions and returns them newest-first', () => {
    const a = createSession('A', store);
    const b = createSession('B', store);
    const remaining = deleteSession(a.id, store);
    expect(remaining.map((s) => s.id)).toEqual([b.id]);
  });
});

describe('currentSessionId / setCurrent', () => {
  it('returns null when nothing is set', () => {
    expect(currentSessionId(store)).toBeNull();
  });
  it('only honours an id that still exists', () => {
    const meta = createSession(undefined, store);
    expect(currentSessionId(store)).toBe(meta.id);
    deleteSession(meta.id, store);
    expect(currentSessionId(store)).toBeNull();
  });
});

describe('migrateLegacy', () => {
  it('folds the legacy single conversation into one session and removes the old key', () => {
    const legacyMsgs: StoredMsg[] = [
      { id: 'm1', role: 'user', text: 'Swali la zamani' },
      { id: 'm2', role: 'akili', answer },
    ];
    store.data[MEMORY_KEY] = JSON.stringify(buildSnapshot(legacyMsgs));

    const meta = migrateLegacy(store);
    expect(meta).not.toBeNull();
    expect(meta?.title).toBe('Swali la zamani');
    // History preserved under a per-session key.
    expect(getSession(meta!.id, store)?.messages).toHaveLength(2);
    // Legacy key removed; current set; appears in the list.
    expect(store.data[MEMORY_KEY]).toBeUndefined();
    expect(store.data[CURRENT_KEY]).toBe(meta!.id);
    expect(listSessions(store)).toHaveLength(1);
  });

  it('is idempotent — does nothing once sessions exist', () => {
    createSession(undefined, store);
    store.data[MEMORY_KEY] = JSON.stringify(
      buildSnapshot([{ id: 'm1', role: 'user', text: 'late' }]),
    );
    expect(migrateLegacy(store)).toBeNull();
    expect(listSessions(store)).toHaveLength(1);
  });

  it('cleans up an empty legacy snapshot without creating a session', () => {
    store.data[MEMORY_KEY] = JSON.stringify(buildSnapshot([]));
    expect(migrateLegacy(store)).toBeNull();
    expect(store.data[MEMORY_KEY]).toBeUndefined();
    expect(listSessions(store)).toHaveLength(0);
  });
});

describe('resolveInitialSession', () => {
  it('migrates legacy on first boot', () => {
    store.data[MEMORY_KEY] = JSON.stringify(
      buildSnapshot([{ id: 'm1', role: 'user', text: 'kabla' }]),
    );
    const meta = resolveInitialSession(store);
    expect(meta.title).toBe('kabla');
    expect(getSession(meta.id, store)?.messages).toHaveLength(1);
  });

  it('creates a fresh session when none exist', () => {
    const meta = resolveInitialSession(store);
    expect(listSessions(store).map((s) => s.id)).toContain(meta.id);
  });

  it('reopens the stored current session', () => {
    const a = createSession('A', store);
    const b = createSession('B', store);
    setCurrent(b.id, store);
    expect(resolveInitialSession(store).id).toBe(b.id);
    // a still exists
    expect(getSessionMeta(a.id, store)).not.toBeNull();
  });

  it('returns an ephemeral session when storage is unavailable', () => {
    const meta = resolveInitialSession(null);
    expect(meta.id).toBeTruthy();
    expect(meta.title).toBe(DEFAULT_TITLE);
  });
});
