// mute.test.ts — persisted TTS mute flag with injected storage.
import { describe, it, expect } from 'vitest';
import { loadMuted, saveMuted, MUTE_KEY } from '../mute';
import type { StorageLike } from '../memory';

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

describe('mute preference', () => {
  it('defaults to not muted', () => {
    expect(loadMuted(fakeStorage())).toBe(false);
    expect(loadMuted(null)).toBe(false);
  });

  it('round-trips a muted flag', () => {
    const fs = fakeStorage();
    saveMuted(true, fs);
    expect(fs.data[MUTE_KEY]).toBe('1');
    expect(loadMuted(fs)).toBe(true);
    saveMuted(false, fs);
    expect(loadMuted(fs)).toBe(false);
  });

  it('never throws with broken storage', () => {
    const broken: StorageLike = {
      getItem: () => {
        throw new Error('x');
      },
      setItem: () => {
        throw new Error('x');
      },
      removeItem: () => {
        throw new Error('x');
      },
    };
    expect(loadMuted(broken)).toBe(false);
    expect(() => saveMuted(true, broken)).not.toThrow();
  });
});
