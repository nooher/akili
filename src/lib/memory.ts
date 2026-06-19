// memory.ts — Akili conversation memory seam.
//
// Persists the chat transcript so a page reload restores the conversation.
// Private + offline by default: storage is the browser's localStorage and
// nothing leaves the device.
//
// ── The seam ─────────────────────────────────────────────────────────────────
// All persistence goes through a tiny `MemoryStore` interface (load/save/clear).
// The default implementation is localStorage-backed. To move memory to a backend
// later (e.g. Laetoli Data — a sovereign self-hostable Postgres/PostgREST), write
// another object that satisfies `MemoryStore` and pass it where the UI builds its
// store. No UI/engine code needs to change — only the store implementation does.
//
// We persist a serialisable snapshot of the rendered messages (NOT the in-memory
// AkiliSession, which is rebuilt from this snapshot via createAkiliSession). The
// snapshot is versioned so future schema changes can migrate or discard cleanly.

import type { AkiliAnswer } from '../akili/types';

/** Storage key for the persisted conversation. */
export const MEMORY_KEY = 'akili:session';

/** Bump when the persisted shape changes incompatibly. */
export const MEMORY_VERSION = 1 as const;

/** A persisted user turn. */
export interface StoredUserMsg {
  id: string;
  role: 'user';
  text: string;
}
/** A persisted Akili answer turn (the full AkiliAnswer, so cards re-render). */
export interface StoredAkiliMsg {
  id: string;
  role: 'akili';
  answer: AkiliAnswer;
}
/** A persisted error turn. */
export interface StoredErrorMsg {
  id: string;
  role: 'error';
  text: string;
}
export type StoredMsg = StoredUserMsg | StoredAkiliMsg | StoredErrorMsg;

/** The on-disk snapshot. */
export interface MemorySnapshot {
  version: number;
  messages: StoredMsg[];
  /** ISO-8601 UTC of last write (diagnostics only). */
  savedAt: string;
}

/**
 * The persistence seam. Swap this for a backend-backed implementation to move
 * memory off-device without touching the UI or engine.
 */
export interface MemoryStore {
  load(): MemorySnapshot | null;
  save(messages: StoredMsg[]): void;
  clear(): void;
}

// ── validation ────────────────────────────────────────────────────────────────

function isStoredMsg(v: unknown): v is StoredMsg {
  if (!v || typeof v !== 'object') return false;
  const m = v as Record<string, unknown>;
  if (typeof m.id !== 'string') return false;
  if (m.role === 'user' || m.role === 'error') return typeof m.text === 'string';
  if (m.role === 'akili') {
    const a = m.answer as Record<string, unknown> | undefined;
    return (
      !!a &&
      typeof a === 'object' &&
      typeof a.domain === 'string' &&
      typeof a.expert === 'string' &&
      !!a.text &&
      typeof (a.text as Record<string, unknown>).sw === 'string'
    );
  }
  return false;
}

/** Parse + validate a raw JSON string into a snapshot, or null if unusable. */
export function parseSnapshot(raw: string | null): MemorySnapshot | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<MemorySnapshot>;
    if (!data || typeof data !== 'object') return null;
    if (data.version !== MEMORY_VERSION) return null; // unknown/old schema → ignore
    if (!Array.isArray(data.messages)) return null;
    const messages = data.messages.filter(isStoredMsg);
    return {
      version: MEMORY_VERSION,
      messages,
      savedAt: typeof data.savedAt === 'string' ? data.savedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/** Build a snapshot object from messages (pure; no I/O). */
export function buildSnapshot(messages: StoredMsg[]): MemorySnapshot {
  return {
    version: MEMORY_VERSION,
    messages: messages.filter(isStoredMsg),
    savedAt: new Date().toISOString(),
  };
}

// ── localStorage-backed default store ──────────────────────────────────────────

/** Minimal Storage shape so callers can inject a fake in tests. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function defaultStorage(): StorageLike | null {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* access can throw in privacy mode */
  }
  return null;
}

/**
 * Create a MemoryStore. Defaults to localStorage; pass any StorageLike to
 * redirect it (tests, or a different web storage). Every method is wrapped so a
 * storage failure can never break the app — memory is best-effort.
 */
export function createMemoryStore(
  storage: StorageLike | null = defaultStorage(),
  key: string = MEMORY_KEY,
): MemoryStore {
  return {
    load() {
      if (!storage) return null;
      try {
        return parseSnapshot(storage.getItem(key));
      } catch {
        return null;
      }
    },
    save(messages) {
      if (!storage) return;
      try {
        storage.setItem(key, JSON.stringify(buildSnapshot(messages)));
      } catch {
        /* quota / privacy mode — drop silently */
      }
    },
    clear() {
      if (!storage) return;
      try {
        storage.removeItem(key);
      } catch {
        /* ignore */
      }
    },
  };
}
