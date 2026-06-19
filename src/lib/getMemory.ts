// getMemory.ts — the memory selector + config gating.
//
// Sovereign-local BY DEFAULT. Akili ships with browser localStorage memory and
// no network anywhere. ONLY when a founder sets both:
//   VITE_AKILI_DATA_URL       — base URL of a running Laetoli Data deployment
//   VITE_AKILI_DATA_ANON_KEY  — its anon/public api key
// does Akili layer long-term vector memory (Laetoli Data) on top of the local
// mirror. With no env set, `getMemory()` returns the plain localStorage store
// and the app behaves *exactly* as it did before — offline, private, unchanged.

import { createMemoryStore, type MemoryStore } from './memory';
import { createDataClient, DataMemoryStore } from './dataMemory';
import { SESSION_PREFIX } from './sessions';

/** Resolved Data config, or null when Akili should stay sovereign-local. */
export interface DataConfig {
  url: string;
  anonKey: string;
}

function readEnv(key: string): string | undefined {
  try {
    // import.meta.env is statically replaced by Vite; guard for non-Vite (test)
    // runtimes where it may be undefined.
    const v = (import.meta as { env?: Record<string, string | undefined> }).env?.[key];
    return typeof v === 'string' && v.trim().length > 0 ? v.trim() : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Read the Laetoli Data config from the build-time env. Returns null (→ stay
 * local) unless BOTH the URL and anon key are present.
 */
export function readDataConfig(): DataConfig | null {
  const url = readEnv('VITE_AKILI_DATA_URL');
  const anonKey = readEnv('VITE_AKILI_DATA_ANON_KEY');
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/** True when Akili is configured to use the Laetoli Data long-term memory. */
export function isDataMemoryActive(config: DataConfig | null = readDataConfig()): boolean {
  return config !== null;
}

/**
 * Generate (or reuse) a stable per-device session id, persisted in localStorage
 * so a device's long-term memory rows can be grouped/filtered. Falls back to an
 * ephemeral id if storage is unavailable.
 */
const SESSION_KEY = 'akili:dataSession';
function deviceSession(): string {
  try {
    if (typeof localStorage !== 'undefined') {
      const existing = localStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      const id = `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(SESSION_KEY, id);
      return id;
    }
  } catch {
    /* privacy mode — fall through */
  }
  return `s-${Date.now().toString(36)}`;
}

/**
 * The memory selector the app calls. Returns a Laetoli-Data-backed store (which
 * mirrors to localStorage AND persists/recalls long-term vector memory) when
 * configured, else the plain localStorage store. The return type is the shared
 * `MemoryStore` interface so the App treats both identically; callers that want
 * `recall()` can check `store instanceof DataMemoryStore`.
 */
export function getMemory(config: DataConfig | null = readDataConfig()): MemoryStore {
  const local = createMemoryStore();
  if (!config) return local;
  const client = createDataClient({ url: config.url, anonKey: config.anonKey });
  return new DataMemoryStore(client, { session: deviceSession(), local });
}

/**
 * Per-session memory selector. Returns a MemoryStore scoped to a single named
 * conversation (`sessionId`): the local mirror writes to `akili:session:<id>`,
 * and the Laetoli-Data layer (when configured) tags rows with that id via
 * `metadata.session` so recall can be scoped per conversation. Falls back to the
 * plain localStorage store (offline/private) when Data isn't configured.
 */
export function getSessionMemory(
  sessionId: string,
  config: DataConfig | null = readDataConfig(),
): MemoryStore {
  const local = createMemoryStore(undefined, `${SESSION_PREFIX}${sessionId}`);
  if (!config) return local;
  const client = createDataClient({ url: config.url, anonKey: config.anonKey });
  // Scope long-term memory to this conversation: combine the stable device id
  // with the session id so a shared Data instance can group/filter per chat.
  return new DataMemoryStore(client, {
    session: `${deviceSession()}:${sessionId}`,
    local,
  });
}

export { DataMemoryStore };
