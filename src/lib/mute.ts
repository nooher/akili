// mute.ts — tiny persisted flag for the global TTS mute toggle.
//
// Pure + injectable like memory.ts. Default backing is localStorage; nothing
// touches `window` at import time so SSR/build/tests stay safe.

import type { StorageLike } from './memory';

/** Storage key for the persisted mute preference. */
export const MUTE_KEY = 'akili:tts-muted';

function defaultStorage(): StorageLike | null {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* privacy mode */
  }
  return null;
}

/** Read the persisted mute flag (default: not muted). */
export function loadMuted(
  storage: StorageLike | null = defaultStorage(),
  key: string = MUTE_KEY,
): boolean {
  if (!storage) return false;
  try {
    return storage.getItem(key) === '1';
  } catch {
    return false;
  }
}

/** Persist the mute flag. Best-effort; never throws. */
export function saveMuted(
  muted: boolean,
  storage: StorageLike | null = defaultStorage(),
  key: string = MUTE_KEY,
): void {
  if (!storage) return;
  try {
    storage.setItem(key, muted ? '1' : '0');
  } catch {
    /* ignore */
  }
}
