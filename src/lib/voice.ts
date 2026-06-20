// voice.ts — pure, framework-free helpers for Akili's voice layer (ASR + TTS).
//
// Sovereign-friendly: speech recognition (Web Speech API) and speech synthesis
// run entirely on-device in the browser; nothing is sent to Laetoli. This module
// holds only the *pure* logic (feature detection + text cleaning + voice pick) so
// it is trivially unit-testable and never touches `window` at import time.

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Resolve the SpeechRecognition constructor for a given global (defaults to the
 * real `window`/`globalThis`). Returns `undefined` when unsupported — callers
 * MUST feature-detect via this rather than reading `window.SpeechRecognition`
 * directly, so SSR/build/tests never crash.
 */
export function getSpeechRecognition(
  scope: any = typeof globalThis !== 'undefined' ? globalThis : undefined,
): any | undefined {
  if (!scope) return undefined;
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition ?? undefined;
}

/** True when this environment can do voice *input* (ASR). */
export function supportsSpeechRecognition(scope?: any): boolean {
  return typeof getSpeechRecognition(scope) === 'function';
}

/** Resolve the speechSynthesis instance for a scope, or undefined if unsupported. */
export function getSpeechSynthesis(
  scope: any = typeof globalThis !== 'undefined' ? globalThis : undefined,
): any | undefined {
  if (!scope) return undefined;
  const synth = scope.speechSynthesis;
  return synth && typeof synth.speak === 'function' ? synth : undefined;
}

/** True when this environment can do voice *output* (TTS). */
export function supportsSpeechSynthesis(scope?: any): boolean {
  return Boolean(getSpeechSynthesis(scope));
}

/**
 * Preferred ASR languages, most-specific first. We aim for Tanzanian Swahili,
 * then generic Swahili, then English fallbacks so the mic still works for users
 * whose browser lacks a Swahili recogniser.
 */
export const ASR_LANGS = ['sw-TZ', 'sw', 'sw-KE', 'en-TZ', 'en-KE', 'en-US'] as const;

/** First ASR language the engine is happy to try. */
export function preferredAsrLang(): string {
  return ASR_LANGS[0];
}

/** A minimal shape for a SpeechSynthesisVoice (so tests need no DOM). */
export interface VoiceLike {
  lang?: string;
  name?: string;
  default?: boolean;
}

/**
 * Pick the best voice to speak Swahili with. Preference order:
 *   1. exact `sw-TZ`
 *   2. any `sw*` (sw, sw-KE, …)
 *   3. a voice whose name mentions Swahili/Kiswahili
 *   4. the engine default / first available
 * Returns `null` when there are no voices (caller lets the engine choose).
 */
export function pickSwahiliVoice<T extends VoiceLike>(voices: readonly T[]): T | null {
  if (!voices || voices.length === 0) return null;

  const lc = (s?: string) => (s ?? '').toLowerCase();

  const exact = voices.find((v) => lc(v.lang) === 'sw-tz');
  if (exact) return exact;

  const swAny = voices.find((v) => lc(v.lang).startsWith('sw'));
  if (swAny) return swAny;

  const byName = voices.find((v) => /swahili|kiswahili/.test(lc(v.name)));
  if (byName) return byName;

  const def = voices.find((v) => v.default);
  return def ?? voices[0];
}

/** Minimal shape of `speechSynthesis` we rely on (keeps this module DOM-free). */
export interface SynthLike {
  getVoices?(): readonly VoiceLike[];
  onvoiceschanged?: ((this: unknown, ev: unknown) => unknown) | null;
  addEventListener?(type: string, cb: () => void): void;
  removeEventListener?(type: string, cb: () => void): void;
}

/**
 * Resolve the available synthesis voices, working around the well-known browser
 * race where `getVoices()` returns `[]` on first call until the engine fires
 * `voiceschanged` (Chrome especially). We try synchronously first; if empty we
 * wait for the event (bounded by `timeoutMs`) and resolve with whatever we have.
 *
 * Pure-ish + injectable: pass a mock synth in tests, no DOM needed. Never throws
 * and never rejects — the worst case is an empty array (caller picks no voice).
 */
export function loadVoices(
  synth: SynthLike | undefined | null,
  timeoutMs = 1500,
  timer: (cb: () => void, ms: number) => unknown = setTimeout,
): Promise<readonly VoiceLike[]> {
  return new Promise((resolve) => {
    if (!synth || typeof synth.getVoices !== 'function') {
      resolve([]);
      return;
    }
    const now = () => {
      try {
        return synth.getVoices?.() ?? [];
      } catch {
        return [];
      }
    };

    const initial = now();
    if (initial.length > 0) {
      resolve(initial);
      return;
    }

    let done = false;
    const finish = (voices: readonly VoiceLike[]) => {
      if (done) return;
      done = true;
      try {
        synth.removeEventListener?.('voiceschanged', onChange);
      } catch {
        /* ignore */
      }
      if (synth.onvoiceschanged === onChange) synth.onvoiceschanged = null;
      resolve(voices);
    };
    const onChange = () => finish(now());

    try {
      synth.addEventListener?.('voiceschanged', onChange);
    } catch {
      /* ignore */
    }
    // Some engines only support the `onvoiceschanged` property (not addEventListener).
    if (typeof synth.addEventListener !== 'function') synth.onvoiceschanged = onChange;

    timer(() => finish(now()), timeoutMs);
  });
}

/**
 * Clean answer text for speech synthesis. The engine emits Swahili prose with
 * warning glyphs ("⚠"), simple markdown emphasis, bullet markers and citation
 * scaffolding — none of which should be read aloud verbatim. We collapse those
 * into natural spoken text without altering meaning.
 */
export function textForSpeech(raw: string): string {
  if (!raw) return '';
  let t = raw.replace(/\r\n?/g, '\n');

  // Drop warning / info glyphs and similar decorative symbols.
  t = t.replace(/[⚠️⚠✅❌📌🔊ℹ️•·›»]/g, ' ');

  // Strip markdown emphasis/code markers but keep the words.
  t = t.replace(/[*_`#>]+/g, ' ');

  // Markdown links [label](url) → label.
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

  // Bullet line leads ("- ", "* ", "1. ") at the start of a line.
  t = t.replace(/^[ \t]*([-*]|\d+\.)[ \t]+/gm, '');

  // Collapse whitespace runs (incl. newlines) into single spaces.
  t = t.replace(/\s+/g, ' ').trim();

  return t;
}
