// widget.tsx — the embeddable Akili floating assistant. Self-contained: a fixed
// launcher button (the Akili mark) that opens a compact chat panel. It consumes
// the sovereign engine (askAkili) and ships its OWN scoped CSS so it never
// depends on the host page's global stylesheet. Swahili-first, accessible,
// solid Tanzania palette (no gradients).
//
// Everything here is namespaced under `.akili-w` so the widget cannot leak
// styles into — or inherit styles from — the page it is dropped onto.

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { askAkili } from '../akili';
import type { AkiliAnswer, AkiliDomain, AkiliLang } from '../akili/types';
import {
  confidenceLabel,
  domainClass,
  domainLabel,
  ERROR_SW,
  isWarningLine,
  toLines,
} from '../ui/format';

export interface AkiliWidgetOptions {
  /** Preferred answer language (default 'sw'). */
  lang?: AkiliLang;
  /** Corner the launcher + panel dock to (default 'bottom-right'). */
  position?: 'bottom-right' | 'bottom-left';
}

// ── microcopy (Swahili-first, English fallbacks for opts.lang === 'en') ────────

const copy = (lang: AkiliLang) => {
  const en = lang === 'en';
  return {
    open: en ? 'Open Akili' : 'Fungua Akili',
    close: en ? 'Close' : 'Funga',
    title: 'AKILI',
    tagline: en ? 'Swahili AI · offline, sovereign' : 'AI ya Kiswahili · bila mtandao',
    welcomeH: en ? 'Welcome to Akili' : 'Karibu kwenye Akili',
    welcomeP: en
      ? 'Ask anything in Swahili — health, literature, language, or math. Akili picks the right expert and answers instantly, on-device.'
      : 'Uliza chochote kwa Kiswahili — afya, fasihi, lugha au hesabu. Akili huchagua mtaalamu sahihi na kujibu papo hapo, bila kutuma data popote.',
    placeholder: en ? 'Ask Akili…' : 'Uliza Akili kwa Kiswahili…',
    send: en ? 'Ask' : 'Uliza',
    sending: en ? 'Thinking…' : 'Inafikiri…',
    showEn: 'Onyesha Kiingereza',
    hideEn: 'Ficha Kiingereza',
    result: 'Matokeo',
    thinking: en ? 'Akili is thinking' : 'Akili inafikiri',
    inputLabel: en ? 'Type your question' : 'Andika swali lako',
  };
};

interface Starter {
  domain: AkiliDomain;
  prompt: string;
}
const STARTERS: Starter[] = [
  { domain: 'afya', prompt: 'Dalili za malaria ni zipi?' },
  { domain: 'fasihi', prompt: 'Nipendekezee kitabu cha kusoma' },
  { domain: 'lugha', prompt: 'Tafsiri: good morning' },
  { domain: 'snil', prompt: 'Kokotoa wastani wa 10, 20, 30' },
];

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

let seq = 0;
const nextId = () => `w${++seq}-${Date.now().toString(36)}`;

// ── component ──────────────────────────────────────────────────────────────────

export function AkiliWidget({ lang = 'sw', position = 'bottom-right' }: AkiliWidgetOptions) {
  const t = copy(lang);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Keep newest message in view.
  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  // Focus the input when the panel opens; restore focus to launcher on close.
  useEffect(() => {
    if (open) requestAnimationFrame(() => taRef.current?.focus());
  }, [open]);

  // Esc closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;
      setMessages((m) => [...m, { id: nextId(), role: 'user', text }]);
      setDraft('');
      setBusy(true);
      try {
        const answer = await askAkili({ text, lang });
        setMessages((m) => [...m, { id: nextId(), role: 'akili', answer }]);
      } catch {
        setMessages((m) => [...m, { id: nextId(), role: 'error', text: ERROR_SW }]);
      } finally {
        setBusy(false);
        requestAnimationFrame(() => taRef.current?.focus());
      }
    },
    [busy, lang],
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
  const posClass = position === 'bottom-left' ? 'akili-w--left' : 'akili-w--right';

  return (
    <div className={`akili-w ${posClass}`} data-lang={lang}>
      {open && (
        <section
          className="akili-w-panel"
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label={t.title}
        >
          <header className="akili-w-top">
            <div className="akili-w-brand">
              <span className="akili-w-mark" aria-hidden="true" />
              <div>
                <h2>{t.title}</h2>
                <p>{t.tagline}</p>
              </div>
            </div>
            <button
              type="button"
              className="akili-w-x"
              aria-label={t.close}
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div
            className="akili-w-stream"
            ref={streamRef}
            aria-live="polite"
            aria-busy={busy}
          >
            {isEmpty && (
              <div className="akili-w-welcome">
                <h3>{t.welcomeH}</h3>
                <p>{t.welcomeP}</p>
                <div
                  className="akili-w-starters"
                  role="group"
                  aria-label={t.welcomeH}
                >
                  {STARTERS.map((s) => (
                    <button
                      key={s.domain}
                      type="button"
                      className="akili-w-chip"
                      disabled={busy}
                      onClick={() => void send(s.prompt)}
                    >
                      <span
                        className={`akili-w-badge akili-w-badge--${domainClass(s.domain)} akili-w-badge--mini`}
                      >
                        {domainLabel(s.domain)}
                      </span>
                      <span className="akili-w-chip-text">{s.prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) =>
              m.role === 'user' ? (
                <UserBubble key={m.id} text={m.text} />
              ) : m.role === 'akili' ? (
                <AnswerCard key={m.id} answer={m.answer} t={t} />
              ) : (
                <div key={m.id} className="akili-w-row akili-w-row--akili">
                  <article className="akili-w-card akili-w-card--error" role="alert">
                    <p>{m.text}</p>
                  </article>
                </div>
              ),
            )}

            {busy && (
              <div className="akili-w-row akili-w-row--akili">
                <div className="akili-w-thinking" role="status" aria-label={t.thinking}>
                  <span className="akili-w-dot" />
                  <span className="akili-w-dot" />
                  <span className="akili-w-dot" />
                </div>
              </div>
            )}
          </div>

          <form className="akili-w-form" onSubmit={onSubmit}>
            <label htmlFor={`${panelId}-in`} className="akili-w-sr">
              {t.inputLabel}
            </label>
            <textarea
              id={`${panelId}-in`}
              ref={taRef}
              className="akili-w-input"
              placeholder={t.placeholder}
              rows={1}
              value={draft}
              disabled={busy}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              type="submit"
              className="akili-w-send"
              disabled={busy || draft.trim() === ''}
            >
              {busy ? t.sending : t.send}
            </button>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        className="akili-w-launcher"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="akili-w-launcher-mark" aria-hidden="true" />
      </button>
    </div>
  );
}

// ── sub-views ──────────────────────────────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <div className="akili-w-row akili-w-row--user">
      <div className="akili-w-bubble akili-w-bubble--user">
        {toLines(text).map((ln, i) => (
          <p key={i} className={ln === '' ? 'akili-w-gap' : undefined}>
            {ln}
          </p>
        ))}
      </div>
    </div>
  );
}

function AnswerCard({ answer, t }: { answer: AkiliAnswer; t: ReturnType<typeof copy> }) {
  const [showEn, setShowEn] = useState(false);
  const hasEn = Boolean(answer.text.en && answer.text.en.trim());

  return (
    <div className="akili-w-row akili-w-row--akili">
      <article className="akili-w-card">
        <header className="akili-w-card-head">
          <span className={`akili-w-badge akili-w-badge--${domainClass(answer.domain)}`}>
            {domainLabel(answer.domain)}
          </span>
          <span className="akili-w-expert">{answer.expert}</span>
          <span className={`akili-w-pill akili-w-pill--${answer.confidence}`}>
            {confidenceLabel(answer.confidence)}
          </span>
        </header>

        <AnswerText text={answer.text.sw} />

        {hasEn && (
          <div className="akili-w-en">
            <button
              type="button"
              className="akili-w-toggle"
              aria-expanded={showEn}
              onClick={() => setShowEn((v) => !v)}
            >
              {showEn ? t.hideEn : t.showEn}
            </button>
            {showEn && (
              <div className="akili-w-en-body">
                <AnswerText text={answer.text.en as string} />
              </div>
            )}
          </div>
        )}

        {answer.snil && (
          <div className="akili-w-snil">
            <div className="akili-w-snil-block">
              <div className="akili-w-snil-head">
                <span className="akili-w-snil-dot" aria-hidden="true" />
                SNIL
              </div>
              <pre className="akili-w-code">
                <code>{answer.snil.code}</code>
              </pre>
            </div>
            <div className="akili-w-snil-block">
              <div className="akili-w-snil-head">{t.result}</div>
              {answer.snil.error ? (
                <pre className="akili-w-out akili-w-out--err">{answer.snil.error}</pre>
              ) : (
                <pre className="akili-w-out">{answer.snil.output || '—'}</pre>
              )}
            </div>
          </div>
        )}

        {answer.sources && answer.sources.length > 0 && (
          <footer className="akili-w-sources" aria-label="Vyanzo">
            {answer.sources.map((s, i) => (
              <span key={i} className="akili-w-source" title={s.ref ?? s.label}>
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
    <div className="akili-w-answer">
      {toLines(text).map((ln, i) =>
        ln === '' ? (
          <div key={i} className="akili-w-answer-gap" aria-hidden="true" />
        ) : isWarningLine(ln) ? (
          <p key={i} className="akili-w-warn">
            {ln}
          </p>
        ) : (
          <p key={i}>{ln}</p>
        ),
      )}
    </div>
  );
}
