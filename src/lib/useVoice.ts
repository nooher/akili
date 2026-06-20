// useVoice.ts — thin React hooks wrapping the browser speech APIs.
//
// These are the *impure* glue (they touch window/speechSynthesis) and are kept
// out of voice.ts so the pure logic stays unit-testable. Every API access is
// feature-detected at *call/effect time* (never at import) so SSR/build/tests
// don't crash, and so the UI can hide controls when unsupported.

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getSpeechRecognition,
  getSpeechSynthesis,
  supportsSpeechRecognition,
  supportsSpeechSynthesis,
  pickSwahiliVoice,
  preferredAsrLang,
  textForSpeech,
  loadVoices,
  type VoiceLike,
} from './voice';
import { track } from './telemetry';

// ── ASR (speech → text) ────────────────────────────────────────────────────────

export interface UseAsr {
  supported: boolean;
  listening: boolean;
  /** Start listening. `onFinal` fires once with the final transcript. */
  start(onFinal: (text: string) => void, onInterim?: (text: string) => void): void;
  stop(): void;
}

export function useAsr(): UseAsr {
  const [supported] = useState(() => supportsSpeechRecognition(window));
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognition | null>(null);

  const stop = useCallback(() => {
    try {
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
  }, []);

  const start = useCallback(
    (onFinal: (text: string) => void, onInterim?: (text: string) => void) => {
      if (!supported || listening) return;
      const Ctor = getSpeechRecognition(window) as
        | { new (): SpeechRecognition }
        | undefined;
      if (!Ctor) return;

      let rec: SpeechRecognition;
      try {
        rec = new Ctor();
      } catch {
        return;
      }
      recRef.current = rec;
      rec.lang = preferredAsrLang();
      rec.interimResults = Boolean(onInterim);
      rec.continuous = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setListening(true);
        track('voice_asr_start', { lang: rec.lang });
      };
      rec.onresult = (ev: SpeechRecognitionEvent) => {
        let finalText = '';
        let interim = '';
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const r = ev.results[i];
          if (r.isFinal) finalText += r[0].transcript;
          else interim += r[0].transcript;
        }
        if (interim && onInterim) onInterim(interim);
        if (finalText) {
          onFinal(finalText.trim());
          track('voice_asr_result', { chars: finalText.trim().length });
        }
      };
      rec.onerror = (ev: SpeechRecognitionErrorEvent) => {
        track('voice_asr_error', { error: String(ev.error).slice(0, 40) });
        setListening(false);
      };
      rec.onend = () => {
        setListening(false);
        recRef.current = null;
      };

      try {
        rec.start();
      } catch {
        setListening(false);
      }
    },
    [supported, listening],
  );

  // Stop any in-flight recognition on unmount.
  useEffect(() => () => stop(), [stop]);

  return { supported, listening, start, stop };
}

// ── TTS (text → speech) ─────────────────────────────────────────────────────────

export interface UseTts {
  supported: boolean;
  speaking: boolean;
  /** Speak text (cleaned for speech). No-op when unsupported. */
  speak(text: string): void;
  /** Cancel any in-flight + queued speech. */
  cancel(): void;
}

export function useTts(): UseTts {
  const [supported] = useState(() => supportsSpeechSynthesis(window));
  const [speaking, setSpeaking] = useState(false);
  // Cached Swahili voice (resolved once voices load). null = none picked yet;
  // false = resolved but no usable voice (let the engine choose by lang).
  const voiceRef = useRef<SpeechSynthesisVoice | null | false>(null);

  // Prime the voice list early: browsers (Chrome esp.) return [] from getVoices()
  // until `voiceschanged` fires, so pick + cache the Swahili voice ahead of the
  // first answer. Best-effort; never throws if synthesis is absent.
  useEffect(() => {
    if (!supported) return;
    let alive = true;
    const synth = getSpeechSynthesis(window);
    void loadVoices(synth).then((voices) => {
      if (!alive) return;
      const v = pickSwahiliVoice(voices as SpeechSynthesisVoice[]);
      voiceRef.current = (v as SpeechSynthesisVoice) ?? false;
    });
    return () => {
      alive = false;
    };
  }, [supported]);

  const cancel = useCallback(() => {
    const synth = getSpeechSynthesis(window);
    if (!synth) return;
    try {
      synth.cancel();
    } catch {
      /* ignore */
    }
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (raw: string) => {
      const synth = getSpeechSynthesis(window);
      if (!synth) return;
      const text = textForSpeech(raw);
      if (!text) return;

      try {
        synth.cancel(); // never overlap
        const u = new SpeechSynthesisUtterance(text);
        // Prefer the primed voice; fall back to a fresh getVoices() in case it
        // populated after mount, else let the engine pick by lang (sw-TZ).
        let voice: VoiceLike | null =
          voiceRef.current === false ? null : voiceRef.current;
        if (!voice) {
          const voices: VoiceLike[] = synth.getVoices?.() ?? [];
          voice = pickSwahiliVoice(voices as SpeechSynthesisVoice[]);
        }
        if (voice) {
          u.voice = voice as SpeechSynthesisVoice;
          if (voice.lang) u.lang = voice.lang;
        } else {
          u.lang = 'sw-TZ';
        }
        u.rate = 1;
        u.pitch = 1;
        u.onstart = () => setSpeaking(true);
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
        synth.speak(u);
        track('voice_tts_speak', { chars: text.length });
      } catch {
        setSpeaking(false);
      }
    },
    [],
  );

  // Cancel speech on unmount.
  useEffect(() => () => cancel(), [cancel]);

  return { supported, speaking, speak, cancel };
}
