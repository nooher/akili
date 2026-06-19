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
import { askAkili } from './akili';
import type { AkiliAnswer, AkiliDomain } from './akili/types';
import {
  confidenceLabel,
  domainClass,
  domainLabel,
  ERROR_SW,
  isWarningLine,
  toLines,
} from './ui/format';

// ── message model ─────────────────────────────────────────────────────────────

interface UserMsg {
  id: string;
  role: 'user';
  text: string;
}
interface AkiliMsg {
  id: string;
  role: 'akili';
  answer: AkiliAnswer;
}
interface ErrorMsg {
  id: string;
  role: 'error';
  text: string;
}
type Message = UserMsg | AkiliMsg | ErrorMsg;

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;

      setMessages((m) => [...m, { id: nextId(), role: 'user', text }]);
      setDraft('');
      setBusy(true);
      try {
        const answer = await askAkili(text);
        setMessages((m) => [...m, { id: nextId(), role: 'akili', answer }]);
      } catch {
        setMessages((m) => [...m, { id: nextId(), role: 'error', text: ERROR_SW }]);
      } finally {
        setBusy(false);
        // Return focus to the input for fast multi-turn.
        requestAnimationFrame(() => taRef.current?.focus());
      }
    },
    [busy],
  );

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
      <Header />

      <main className="akili-stream" ref={streamRef} aria-live="polite" aria-busy={busy}>
        <div className="akili-stream-inner">
          {isEmpty && <Welcome onPick={(p) => void send(p)} busy={busy} />}

          {messages.map((m) =>
            m.role === 'user' ? (
              <UserBubble key={m.id} text={m.text} />
            ) : m.role === 'akili' ? (
              <AnswerCard key={m.id} answer={m.answer} />
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
      />
    </div>
  );
}

// ── header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="akili-top">
      <div className="akili-brand">
        <span className="akili-mark" aria-hidden="true" />
        <div>
          <h1>AKILI</h1>
          <p>AI ya Kiswahili · huru, bila mtandao</p>
        </div>
      </div>
      <span className="akili-credit">Na Laetoli</span>
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

function AnswerCard({ answer }: { answer: AkiliAnswer }) {
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
          placeholder="Uliza Akili kwa Kiswahili…"
          rows={1}
          value={value}
          disabled={busy}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
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
      </p>
    </div>
  );
}
