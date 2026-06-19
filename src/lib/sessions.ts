// sessions.ts — Akili multi-session conversation store.
//
// Akili used to persist exactly ONE conversation under `akili:session`. This
// module turns that into a list of named conversations, each with its own
// transcript, while staying private + offline by default (browser localStorage;
// nothing leaves the device).
//
// ── Layout ───────────────────────────────────────────────────────────────────
//   akili:sessions          → JSON array of SessionMeta {id,title,createdAt,updatedAt}
//   akili:session:<id>      → a MemorySnapshot (reuses lib/memory's shape)
//   akili:currentSession    → the id of the active conversation
//   akili:session           → LEGACY single conversation (migrated on first run)
//
// Each per-session transcript is stored with the SAME versioned MemorySnapshot
// shape used by lib/memory, so the existing parse/validate/build helpers (and the
// MemoryStore seam) keep working — a session id simply scopes the storage key
// (and, for Laetoli-Data memory, the metadata.session filter).
//
// Pure + injectable like memory.ts: a StorageLike can be passed in for tests and
// nothing touches `window` at import time, so SSR/build/tests stay safe.

import {
  MEMORY_KEY,
  buildSnapshot,
  parseSnapshot,
  type MemorySnapshot,
  type StorageLike,
  type StoredMsg,
} from './memory';

/** localStorage keys for the multi-session layout. */
export const SESSIONS_KEY = 'akili:sessions';
export const CURRENT_KEY = 'akili:currentSession';
/** Prefix for each session's transcript snapshot key. */
export const SESSION_PREFIX = 'akili:session:';

/** Default title for a brand-new, not-yet-typed conversation. */
export const DEFAULT_TITLE = 'Mazungumzo mapya';
/** Max characters used when auto-titling from the first user message. */
export const TITLE_MAX = 48;

/** Lightweight metadata for one conversation (the transcript lives separately). */
export interface SessionMeta {
  id: string;
  title: string;
  /** ISO-8601 UTC. */
  createdAt: string;
  /** ISO-8601 UTC of the last transcript write. */
  updatedAt: string;
}

// ── storage helpers ────────────────────────────────────────────────────────────

function defaultStorage(): StorageLike | null {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* privacy mode — access can throw */
  }
  return null;
}

function sessionKey(id: string): string {
  return `${SESSION_PREFIX}${id}`;
}

let idSeq = 0;
/** Generate a reasonably-unique, sortable-ish session id. */
export function newSessionId(): string {
  idSeq += 1;
  const rand =
    typeof Math !== 'undefined'
      ? Math.random().toString(36).slice(2, 8)
      : String(idSeq);
  return `c-${Date.now().toString(36)}-${idSeq.toString(36)}${rand}`;
}

/**
 * Derive a clean title from the first user message: collapse whitespace, trim,
 * and truncate with an ellipsis. Returns DEFAULT_TITLE when there's no usable
 * text (so an empty chat still has a sensible label).
 */
export function titleFromMessages(messages: StoredMsg[]): string {
  const firstUser = messages.find((m) => m.role === 'user');
  const raw = firstUser && 'text' in firstUser ? firstUser.text : '';
  return cleanTitle(raw);
}

/** Normalise + truncate an arbitrary string into a session title. */
export function cleanTitle(raw: string): string {
  const text = (raw ?? '').replace(/\s+/g, ' ').trim();
  if (!text) return DEFAULT_TITLE;
  if (text.length <= TITLE_MAX) return text;
  return `${text.slice(0, TITLE_MAX - 1).trimEnd()}…`;
}

// ── meta-list (de)serialisation ────────────────────────────────────────────────

function isMeta(v: unknown): v is SessionMeta {
  if (!v || typeof v !== 'object') return false;
  const m = v as Record<string, unknown>;
  return (
    typeof m.id === 'string' &&
    typeof m.title === 'string' &&
    typeof m.createdAt === 'string' &&
    typeof m.updatedAt === 'string'
  );
}

function readMetas(storage: StorageLike): SessionMeta[] {
  try {
    const raw = storage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(isMeta);
  } catch {
    return [];
  }
}

function writeMetas(storage: StorageLike, metas: SessionMeta[]): void {
  try {
    storage.setItem(SESSIONS_KEY, JSON.stringify(metas));
  } catch {
    /* quota / privacy mode — drop silently */
  }
}

/** Sort newest-updated first (the order the sidebar shows). */
function byRecent(a: SessionMeta, b: SessionMeta): number {
  return b.updatedAt.localeCompare(a.updatedAt);
}

// ── one-time migration from the legacy single conversation ─────────────────────

/**
 * On first run with the new layout, fold the legacy `akili:session` snapshot
 * (if any) into a single named session so no history is lost. Idempotent: it
 * only runs while there are no sessions yet, and it removes the legacy key after
 * copying so it never migrates twice. Safe to call on every boot.
 */
export function migrateLegacy(storage: StorageLike): SessionMeta | null {
  // Already migrated / already multi-session → nothing to do.
  if (readMetas(storage).length > 0) return null;

  let legacy: MemorySnapshot | null = null;
  try {
    legacy = parseSnapshot(storage.getItem(MEMORY_KEY));
  } catch {
    legacy = null;
  }
  if (!legacy || legacy.messages.length === 0) {
    // Nothing worth migrating; clean up an empty legacy key if present.
    try {
      storage.removeItem(MEMORY_KEY);
    } catch {
      /* ignore */
    }
    return null;
  }

  const now = legacy.savedAt || new Date().toISOString();
  const meta: SessionMeta = {
    id: newSessionId(),
    title: titleFromMessages(legacy.messages),
    createdAt: now,
    updatedAt: now,
  };
  try {
    storage.setItem(sessionKey(meta.id), JSON.stringify(buildSnapshot(legacy.messages)));
    writeMetas(storage, [meta]);
    storage.setItem(CURRENT_KEY, meta.id);
    storage.removeItem(MEMORY_KEY); // legacy key is now redundant
  } catch {
    /* best-effort */
  }
  return meta;
}

// ── public API ─────────────────────────────────────────────────────────────────

/**
 * List all sessions, newest-updated first. Runs the legacy migration on demand
 * so the very first call after upgrade transparently rescues old history.
 */
export function listSessions(storage: StorageLike | null = defaultStorage()): SessionMeta[] {
  if (!storage) return [];
  migrateLegacy(storage);
  return readMetas(storage).slice().sort(byRecent);
}

/** Look up one session's metadata, or null. */
export function getSessionMeta(
  id: string,
  storage: StorageLike | null = defaultStorage(),
): SessionMeta | null {
  if (!storage) return null;
  return readMetas(storage).find((m) => m.id === id) ?? null;
}

/**
 * Load a session's transcript snapshot (or null when missing/unusable). Mirrors
 * MemoryStore.load() for a single session.
 */
export function getSession(
  id: string,
  storage: StorageLike | null = defaultStorage(),
): MemorySnapshot | null {
  if (!storage) return null;
  try {
    return parseSnapshot(storage.getItem(sessionKey(id)));
  } catch {
    return null;
  }
}

/** Create a new (empty) session, make it current, and return its metadata. */
export function createSession(
  title?: string,
  storage: StorageLike | null = defaultStorage(),
): SessionMeta {
  const now = new Date().toISOString();
  const meta: SessionMeta = {
    id: newSessionId(),
    title: title && title.trim() ? cleanTitle(title) : DEFAULT_TITLE,
    createdAt: now,
    updatedAt: now,
  };
  if (!storage) return meta;
  const metas = readMetas(storage);
  metas.push(meta);
  writeMetas(storage, metas);
  try {
    storage.setItem(sessionKey(meta.id), JSON.stringify(buildSnapshot([])));
    storage.setItem(CURRENT_KEY, meta.id);
  } catch {
    /* ignore */
  }
  return meta;
}

/**
 * Persist a session's messages and bump its updatedAt. If the session's title is
 * still the default, auto-title it from the first user message. Creates the meta
 * row if it somehow doesn't exist yet (defensive).
 */
export function saveSession(
  id: string,
  messages: StoredMsg[],
  storage: StorageLike | null = defaultStorage(),
): void {
  if (!storage) return;
  try {
    storage.setItem(sessionKey(id), JSON.stringify(buildSnapshot(messages)));
  } catch {
    /* quota — but still update meta below if possible */
  }
  const now = new Date().toISOString();
  const metas = readMetas(storage);
  const idx = metas.findIndex((m) => m.id === id);
  if (idx === -1) {
    metas.push({
      id,
      title: titleFromMessages(messages),
      createdAt: now,
      updatedAt: now,
    });
  } else {
    const m = metas[idx];
    const autoTitle =
      m.title === DEFAULT_TITLE ? titleFromMessages(messages) : m.title;
    metas[idx] = { ...m, title: autoTitle, updatedAt: now };
  }
  writeMetas(storage, metas);
}

/** Rename a session. Empty/whitespace titles fall back to DEFAULT_TITLE. */
export function renameSession(
  id: string,
  title: string,
  storage: StorageLike | null = defaultStorage(),
): void {
  if (!storage) return;
  const metas = readMetas(storage);
  const idx = metas.findIndex((m) => m.id === id);
  if (idx === -1) return;
  metas[idx] = {
    ...metas[idx],
    title: title && title.trim() ? cleanTitle(title) : DEFAULT_TITLE,
    updatedAt: new Date().toISOString(),
  };
  writeMetas(storage, metas);
}

/**
 * Delete a session (its transcript + meta). If it was current, the current id is
 * cleared (the caller picks/creates the next active session). Returns the
 * remaining sessions, newest-first.
 */
export function deleteSession(
  id: string,
  storage: StorageLike | null = defaultStorage(),
): SessionMeta[] {
  if (!storage) return [];
  const metas = readMetas(storage).filter((m) => m.id !== id);
  writeMetas(storage, metas);
  try {
    storage.removeItem(sessionKey(id));
    if (storage.getItem(CURRENT_KEY) === id) storage.removeItem(CURRENT_KEY);
  } catch {
    /* ignore */
  }
  return metas.slice().sort(byRecent);
}

/** The currently active session id, or null if none is set/valid. */
export function currentSessionId(
  storage: StorageLike | null = defaultStorage(),
): string | null {
  if (!storage) return null;
  try {
    const id = storage.getItem(CURRENT_KEY);
    if (!id) return null;
    // Only honour it if the session still exists.
    return readMetas(storage).some((m) => m.id === id) ? id : null;
  } catch {
    return null;
  }
}

/** Set the active session id. */
export function setCurrent(
  id: string,
  storage: StorageLike | null = defaultStorage(),
): void {
  if (!storage) return;
  try {
    storage.setItem(CURRENT_KEY, id);
  } catch {
    /* ignore */
  }
}

/**
 * Resolve the session the app should open on boot: migrate legacy → pick the
 * stored current → else the most-recent → else create a fresh one. Always
 * returns a valid, persisted session id (when storage is available).
 */
export function resolveInitialSession(
  storage: StorageLike | null = defaultStorage(),
): SessionMeta {
  if (!storage) {
    // No persistence: hand back an ephemeral session so the UI still works.
    const now = new Date().toISOString();
    return { id: newSessionId(), title: DEFAULT_TITLE, createdAt: now, updatedAt: now };
  }
  migrateLegacy(storage);
  const metas = readMetas(storage).slice().sort(byRecent);
  if (metas.length === 0) return createSession(undefined, storage);

  const currentId = currentSessionId(storage);
  const current = currentId ? metas.find((m) => m.id === currentId) : undefined;
  const chosen = current ?? metas[0];
  setCurrent(chosen.id, storage);
  return chosen;
}
