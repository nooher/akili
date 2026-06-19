// App.tsx — the Akili console: a single-page Swahili AI chat that consumes the
// sovereign engine (src/akili). Routes across Afya / Fasihi / Lugha / SNIL /
// Jumla, renders provenance + SNIL traces, no external LLM.

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { akili, createAkiliSession, type AkiliSession } from './akili';
import type { AkiliAnswer, AkiliDomain } from './akili/types';
import {
  confidenceLabel,
  domainClass,
  domainLabel,
  ERROR_SW,
  isWarningLine,
  toLines,
} from './ui/format';
import { type StoredMsg } from './lib/memory';
import { getMemory, DataMemoryStore } from './lib/getMemory';
import { loadMuted, saveMuted } from './lib/mute';
import { useAsr, useTts } from './lib/useVoice';
import { track } from './lib/telemetry';

// ── message model ─────────────────────────────────────────────────────────────

// The rendered message model is identical to the persisted one (see lib/memory),
// so we reuse StoredMsg directly — the snapshot round-trips with zero mapping.
type Message = StoredMsg;

interface Starter {
  domain: AkiliDomain;
  prompt: string;
}

const STARTERS: Starter[] = [
  { domain: 'afya', prompt: 'Dalili za malaria ni zipi?' },
  { domain: 'fasihi', prompt: 'Nipendekezee kitabu cha kusoma' },
  { domain: 'lugha', prompt: 'Tafsiri: good morning' },
  { domain: 'snil', prompt: 'Kokotoa wastani wa 10, 20, 30' },
  { domain: 'jumla', prompt: 'Akili ni nini?' },
];

let seq = 0;
const nextId = () => `m${++seq}-${Date.now().toString(36)}`;

// ── component ─────────────────────────────────────────────────────────────────

export function App() {
  // Persistence seam + in-memory multi-turn session live for the App's lifetime.
  // getMemory() returns the Laetoli-Data-backed store (long-term vector memory,
  // mirrored to localStorage) when VITE_AKILI_DATA_URL + _ANON_KEY are set, else
  // the plain localStorage store — so the app is unchanged + offline by default.
  const storeRef = useRef(getMemory());
  const sessionRef = useRef<AkiliSession>(createAkiliSession(akili));

  const [messages, setMessages] = useState<Message[]>(
    // Restore a prior conversation from localStorage on first render. The engine
    // session starts fresh (new turns rebuild context); the visible transcript is
    // the source of truth that's persisted.
    () => storeRef.current.load()?.messages ?? [],
  );
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [muted, setMuted] = useState(() => loadMuted());
  const streamRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const tts = useTts();
  const asr = useAsr();
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  // Persist the transcript whenever it changes (debounced via React batching).
  useEffect(() => {
    storeRef.current.save(messages);
  }, [messages]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  const speakAnswer = useCallback(
    (answer: AkiliAnswer) => {
      if (mutedRef.current || !tts.supported) return;
      tts.speak(answer.text.sw);
    },
    [tts],
  );

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;

      tts.cancel(); // stop any prior answer being spoken
      asr.stop(); // close the mic if it was open
      setMessages((m) => [...m, { id: nextId(), role: 'user', text }]);
      setDraft('');
      setBusy(true);
      try {
        // Kumbukumbu (memory) recall: when long-term Laetoli Data memory is
        // active, fetch the most relevant past turns and pass them to the engine
        // as opaque query context. The engine consumes context without change;
        // experts that don't use it simply ignore it. Best-effort + safe: any
        // failure (or no matches) leaves the ask exactly as before.
        const store = storeRef.current;
        let context: Record<string, unknown> | undefined;
        if (store instanceof DataMemoryStore) {
          try {
            const recalled = await store.recall(text);
            if (recalled.length > 0) {
              context = { kumbukumbu: recalled };
            }
          } catch {
            /* recall is optional — never block answering */
          }
        }
        const answer = await sessionRef.current.ask(
          context ? { text, context } : text,
        );
        setMessages((m) => [...m, { id: nextId(), role: 'akili', answer }]);
        speakAnswer(answer);
      } catch {
        setMessages((m) => [...m, { id: nextId(), role: 'error', text: ERROR_SW }]);
      } finally {
        setBusy(false);
        // Return focus to the input for fast multi-turn.
        requestAnimationFrame(() => taRef.current?.focus());
      }
    },
    [busy, tts, asr, speakAnswer],
  );

  const onMic = useCallback(() => {
    if (asr.listening) {
      asr.stop();
      return;
    }
    asr.start(
      (finalText) => {
        // Merge final transcript into the draft (append, trimmed).
        setDraft((d) => (d.trim() ? `${d.trim()} ${finalText}` : finalText));
        requestAnimationFrame(() => taRef.current?.focus());
      },
      (interim) => setDraft(interim),
    );
  }, [asr]);

  const onToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      saveMuted(next);
      if (next) tts.cancel();
      track('voice_mute_toggle', { muted: next });
      return next;
    });
  }, [tts]);

  const onNewChat = useCallback(() => {
    tts.cancel();
    asr.stop();
    sessionRef.current.reset();
    storeRef.current.clear();
    setMessages([]);
    setDraft('');
    track('chat_reset', {});
    requestAnimationFrame(() => taRef.current?.focus());
  }, [tts, asr]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(draft);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="akili-app">
      <Header
        ttsSupported={tts.supported}
        muted={muted}
        onToggleMute={onToggleMute}
        canReset={!isEmpty}
        onNewChat={onNewChat}
      />

      <main className="akili-stream" ref={streamRef} aria-live="polite" aria-busy={busy}>
        <div className="akili-stream-inner">
          {isEmpty && <Welcome onPick={(p) => void send(p)} busy={busy} />}

          {messages.map((m) =>
            m.role === 'user' ? (
              <UserBubble key={m.id} text={m.text} />
            ) : m.role === 'akili' ? (
              <AnswerCard
                key={m.id}
                answer={m.answer}
                ttsSupported={tts.supported}
                muted={muted}
                onSpeak={() => tts.speak(m.answer.text.sw)}
              />
            ) : (
              <ErrorCard key={m.id} text={m.text} />
            ),
          )}

          {busy && <Thinking />}
        </div>
      </main>

      <Composer
        ref={taRef}
        value={draft}
        onChange={setDraft}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        busy={busy}
        showStarters={!isEmpty}
        starters={STARTERS}
        onStarter={(p) => void send(p)}
        micSupported={asr.supported}
        listening={asr.listening}
        onMic={onMic}
      />
    </div>
  );
}

// ── header ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  ttsSupported: boolean;
  muted: boolean;
  onToggleMute: () => void;
  canReset: boolean;
  onNewChat: () => void;
}

function Header({ ttsSupported, muted, onToggleMute, canReset, onNewChat }: HeaderProps) {
  return (
    <header className="akili-top">
      <div className="akili-brand">
        <span className="akili-mark" aria-hidden="true" />
        <div>
          <h1>AKILI</h1>
          <p>AI ya Kiswahili · huru, bila mtandao</p>
        </div>
      </div>
      <div className="akili-top-actions">
        {ttsSupported && (
          <button
            type="button"
            className={`akili-iconbtn${muted ? ' is-active' : ''}`}
            onClick={onToggleMute}
            aria-pressed={muted}
            title={muted ? 'Washa sauti' : 'Zima sauti'}
          >
            <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
            <span className="sr-only">{muted ? 'Washa sauti' : 'Zima sauti'}</span>
          </button>
        )}
        {canReset && (
          <button type="button" className="akili-newchat" onClick={onNewChat}>
            Anza upya
          </button>
        )}
        <span className="akili-credit">Na Laetoli</span>
      </div>
    </header>
  );
}

// ── empty state ───────────────────────────────────────────────────────────────

function Welcome({ onPick, busy }: { onPick: (p: string) => void; busy: boolean }) {
  return (
    <section className="akili-welcome">
      <span className="akili-welcome-mark" aria-hidden="true" />
      <h2>Karibu kwenye Akili</h2>
      <p>
        Uliza chochote kwa Kiswahili — afya, fasihi, lugha, au hesabu. Akili
        huchagua mtaalamu sahihi na kujibu papo hapo, bila kutuma data popote.
      </p>
      <div className="akili-starters" role="group" aria-label="Mifano ya maswali">
        {STARTERS.map((s) => (
          <button
            key={s.domain}
            type="button"
            className="akili-chip"
            disabled={busy}
            onClick={() => onPick(s.prompt)}
          >
            <span className={`badge badge--${domainClass(s.domain)} badge--mini`}>
              {domainLabel(s.domain)}
            </span>
            <span className="akili-chip-text">{s.prompt}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── bubbles & cards ───────────────────────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <div className="row row--user">
      <div className="bubble bubble--user">
        {toLines(text).map((ln, i) => (
          <p key={i} className={ln === '' ? 'gap' : undefined}>
            {ln}
          </p>
        ))}
      </div>
    </div>
  );
}

interface AnswerCardProps {
  answer: AkiliAnswer;
  ttsSupported: boolean;
  muted: boolean;
  onSpeak: () => void;
}

function AnswerCard({ answer, ttsSupported, muted, onSpeak }: AnswerCardProps) {
  const [showEn, setShowEn] = useState(false);
  const hasEn = Boolean(answer.text.en && answer.text.en.trim());

  return (
    <div className="row row--akili">
      <article className="card">
        <header className="card-head">
          <span className={`badge badge--${domainClass(answer.domain)}`}>
            {domainLabel(answer.domain)}
          </span>
          <span className="card-expert" title="Mtaalamu aliyejibu">
            {answer.expert}
          </span>
          <span className={`pill pill--${answer.confidence}`}>
            {confidenceLabel(answer.confidence)}
          </span>
          {ttsSupported && (
            <button
              type="button"
              className="card-speak"
              onClick={onSpeak}
              title={muted ? 'Sauti imezimwa kwenye kichwa' : 'Sikiliza jibu hili'}
            >
              <span aria-hidden="true">🔊</span> Sikiliza
            </button>
          )}
        </header>

        <AnswerText text={answer.text.sw} />

        {hasEn && (
          <div className="card-en">
            <button
              type="button"
              className="link-toggle"
              aria-expanded={showEn}
              onClick={() => setShowEn((v) => !v)}
            >
              {showEn ? 'Ficha Kiingereza' : 'Onyesha Kiingereza'}
            </button>
            {showEn && (
              <div className="card-en-body">
                <AnswerText text={answer.text.en as string} />
              </div>
            )}
          </div>
        )}

        {answer.snil && <SnilTrace snil={answer.snil} />}

        {answer.sources && answer.sources.length > 0 && (
          <footer className="card-sources" aria-label="Vyanzo">
            {answer.sources.map((s, i) => (
              <span key={i} className="source-chip" title={s.ref ?? s.label}>
                {s.label}
              </span>
            ))}
          </footer>
        )}
      </article>
    </div>
  );
}

function AnswerText({ text }: { text: string }) {
  return (
    <div className="answer-text">
      {toLines(text).map((ln, i) =>
        ln === '' ? (
          <div key={i} className="answer-gap" aria-hidden="true" />
        ) : isWarningLine(ln) ? (
          <p key={i} className="answer-warn">
            {ln}
          </p>
        ) : (
          <p key={i}>{ln}</p>
        ),
      )}
    </div>
  );
}

function SnilTrace({ snil }: { snil: NonNullable<AkiliAnswer['snil']> }) {
  return (
    <div className="snil-trace">
      <div className="snil-block">
        <div className="snil-block-head">
          <span className="snil-dot" aria-hidden="true" />
          SNIL
        </div>
        <pre className="snil-code">
          <code>{snil.code}</code>
        </pre>
      </div>
      <div className="snil-block">
        <div className="snil-block-head">Matokeo</div>
        {snil.error ? (
          <pre className="snil-out snil-out--err">{snil.error}</pre>
        ) : (
          <pre className="snil-out">{snil.output || '—'}</pre>
        )}
      </div>
    </div>
  );
}

function ErrorCard({ text }: { text: string }) {
  return (
    <div className="row row--akili">
      <article className="card card--error" role="alert">
        <p>{text}</p>
      </article>
    </div>
  );
}

function Thinking() {
  return (
    <div className="row row--akili">
      <div className="thinking" role="status" aria-label="Akili inafikiri">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

// ── composer ──────────────────────────────────────────────────────────────────

interface ComposerProps {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  busy: boolean;
  showStarters: boolean;
  starters: Starter[];
  onStarter: (p: string) => void;
  micSupported: boolean;
  listening: boolean;
  onMic: () => void;
  ref: React.Ref<HTMLTextAreaElement>;
}

function Composer({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  busy,
  showStarters,
  starters,
  onStarter,
  micSupported,
  listening,
  onMic,
  ref,
}: ComposerProps) {
  return (
    <div className="akili-composer">
      {showStarters && (
        <div className="composer-starters" role="group" aria-label="Mifano ya maswali">
          {starters.map((s) => (
            <button
              key={s.domain}
              type="button"
              className={`mini-chip mini-chip--${domainClass(s.domain)}`}
              disabled={busy}
              onClick={() => onStarter(s.prompt)}
              title={s.prompt}
            >
              {domainLabel(s.domain)}
            </button>
          ))}
        </div>
      )}
      <form className="composer-form" onSubmit={onSubmit}>
        <label htmlFor="akili-input" className="sr-only">
          Andika swali lako kwa Kiswahili
        </label>
        <textarea
          id="akili-input"
          ref={ref}
          className="composer-input"
          placeholder={listening ? 'Inasikiliza… sema kwa Kiswahili' : 'Uliza Akili kwa Kiswahili…'}
          rows={1}
          value={value}
          disabled={busy}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
        {micSupported && (
          <button
            type="button"
            className={`composer-mic${listening ? ' is-listening' : ''}`}
            onClick={onMic}
            disabled={busy}
            aria-pressed={listening}
            title={listening ? 'Acha kusikiliza' : 'Ongea badala ya kuandika'}
          >
            <span aria-hidden="true">🎤</span>
            <span className="sr-only">
              {listening ? 'Acha kusikiliza' : 'Ongea badala ya kuandika'}
            </span>
          </button>
        )}
        <button
          type="submit"
          className="composer-send"
          disabled={busy || value.trim() === ''}
        >
          {busy ? 'Inafikiri…' : 'Uliza'}
        </button>
      </form>
      <p className="composer-hint">
        Bonyeza <kbd>Enter</kbd> kutuma · <kbd>Shift</kbd>+<kbd>Enter</kbd> mstari mpya
        {micSupported && <> · <kbd>🎤</kbd> ongea</>}
      </p>
    </div>
  );
}
