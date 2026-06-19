// voice.test.ts — pure voice-layer logic: feature detection, voice picking,
// and text cleaning for speech. No DOM required; everything is injectable.
import { describe, it, expect } from 'vitest';
import {
  getSpeechRecognition,
  supportsSpeechRecognition,
  getSpeechSynthesis,
  supportsSpeechSynthesis,
  preferredAsrLang,
  pickSwahiliVoice,
  textForSpeech,
  ASR_LANGS,
} from '../voice';

describe('speech recognition feature detection', () => {
  it('finds standard SpeechRecognition', () => {
    const scope = { SpeechRecognition: function () {} };
    expect(typeof getSpeechRecognition(scope)).toBe('function');
    expect(supportsSpeechRecognition(scope)).toBe(true);
  });

  it('falls back to webkit-prefixed constructor', () => {
    const scope = { webkitSpeechRecognition: function () {} };
    expect(typeof getSpeechRecognition(scope)).toBe('function');
    expect(supportsSpeechRecognition(scope)).toBe(true);
  });

  it('returns undefined / false when unsupported', () => {
    expect(getSpeechRecognition({})).toBeUndefined();
    expect(supportsSpeechRecognition({})).toBe(false);
    expect(supportsSpeechRecognition(undefined)).toBe(false);
  });

  it('prefers Tanzanian Swahili first', () => {
    expect(preferredAsrLang()).toBe('sw-TZ');
    expect(ASR_LANGS[0]).toBe('sw-TZ');
  });
});

describe('speech synthesis feature detection', () => {
  it('detects a working synth', () => {
    const scope = { speechSynthesis: { speak() {} } };
    expect(getSpeechSynthesis(scope)).toBeDefined();
    expect(supportsSpeechSynthesis(scope)).toBe(true);
  });

  it('rejects a synth without speak()', () => {
    expect(getSpeechSynthesis({ speechSynthesis: {} })).toBeUndefined();
    expect(supportsSpeechSynthesis({})).toBe(false);
  });
});

describe('pickSwahiliVoice', () => {
  it('returns null with no voices', () => {
    expect(pickSwahiliVoice([])).toBeNull();
  });

  it('prefers exact sw-TZ', () => {
    const v = pickSwahiliVoice([
      { lang: 'en-US', name: 'Alex' },
      { lang: 'sw-KE', name: 'Imani' },
      { lang: 'sw-TZ', name: 'Asha' },
    ]);
    expect(v?.name).toBe('Asha');
  });

  it('falls back to any sw* lang', () => {
    const v = pickSwahiliVoice([
      { lang: 'en-US', name: 'Alex' },
      { lang: 'sw-KE', name: 'Imani' },
    ]);
    expect(v?.name).toBe('Imani');
  });

  it('matches by name when no sw lang present', () => {
    const v = pickSwahiliVoice([
      { lang: 'en-US', name: 'Kiswahili Voice' },
      { lang: 'fr-FR', name: 'Amelie' },
    ]);
    expect(v?.name).toBe('Kiswahili Voice');
  });

  it('falls back to the default voice', () => {
    const v = pickSwahiliVoice([
      { lang: 'en-US', name: 'Alex' },
      { lang: 'fr-FR', name: 'Amelie', default: true },
    ]);
    expect(v?.name).toBe('Amelie');
  });

  it('falls back to first voice when nothing else matches', () => {
    const v = pickSwahiliVoice([
      { lang: 'en-US', name: 'Alex' },
      { lang: 'fr-FR', name: 'Amelie' },
    ]);
    expect(v?.name).toBe('Alex');
  });
});

describe('textForSpeech', () => {
  it('returns empty for empty input', () => {
    expect(textForSpeech('')).toBe('');
  });

  it('strips warning glyphs', () => {
    expect(textForSpeech('⚠ Tahadhari: kunywa maji')).toBe('Tahadhari: kunywa maji');
  });

  it('strips markdown emphasis but keeps words', () => {
    expect(textForSpeech('Hii ni **muhimu** sana')).toBe('Hii ni muhimu sana');
  });

  it('flattens bullet lists and collapses newlines', () => {
    const out = textForSpeech('Dalili:\n- homa\n- maumivu\n');
    expect(out).toBe('Dalili: homa maumivu');
  });

  it('reduces markdown links to their label', () => {
    expect(textForSpeech('Soma [hapa](https://x.tz) zaidi')).toBe('Soma hapa zaidi');
  });

  it('never contains the warning glyph in output', () => {
    expect(textForSpeech('⚠⚠ test')).not.toMatch(/⚠/);
  });
});
