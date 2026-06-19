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
import { followupsFor } from './ui/followups';
import { type StoredMsg } from './lib/memory';
import { getSessionMemory, DataMemoryStore } from './lib/getMemory';
import { loadMuted, saveMuted } from './lib/mute';
import { useAsr, useTts } from './lib/useVoice';
import { track } from './lib/telemetry';
import {
  listSessions,
  createSession as createSessionMeta,
  getSession,
  saveSession,
  renameSession,
  deleteSession,
  setCurrent,
  resolveInitialSession,
  type SessionMeta,
} from './lib/sessions';
import { downloadMarkdown, downloadJSON } from './lib/exportChat';

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

/** Swahili relative-time label for the history list (coarse, no deps). */
function relativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return '';
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 60) return 'sasa hivi';
  const mins = Math.round(secs / 60);
  if (mins < 60) return `dakika ${mins}`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `saa ${hrs}`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `siku ${days}`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `wiki ${weeks}`;
  const months = Math.round(days / 30);
  if (months < 12) return `miezi ${months}`;
  return `miaka ${Math.round(days / 365)}`;
}

// ── component ─────────────────────────────────────────────────────────────────

export function App() {
  // The active conversation is resolved on first render: legacy single-session
  // history is migrated, the stored "current" id is honoured, else the newest /
  // a fresh session is opened. Each session has its OWN scoped memory store.
  const initial = useRef<SessionMeta>(resolveInitialSession());
  const [activeId, setActiveId] = useState<string>(initial.current.id);
  const [sessions, setSessions] = useState<SessionMeta[]>(() => listSessions());

  // Per-session persistence seam. getSessionMemory() returns a Laetoli-Data-
  // backed store (long-term vector memory, mirrored to localStorage, scoped to
  // this session id) when VITE_AKILI_DATA_URL + _ANON_KEY are set, else the
  // plain per-session localStorage store — offline + private by default.
  const storeRef = useRef(getSessionMemory(initial.current.id));
  const sessionRef = useRef<AkiliSession>(createAkiliSession(akili));

  const [messages, setMessages] = useState<Message[]>(
    // Restore the active conversation. The engine session starts fresh (new
    // turns rebuild context); the visible transcript is the persisted truth.
    () => getSession(initial.current.id)?.messages ?? [],
  );
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [muted, setMuted] = useState(() => loadMuted());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const tts = useTts();
  const asr = useAsr();
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  // Guard the persistence effect from writing during a session switch (when
  // `messages` is replaced wholesale, not edited by the user).
  const skipSaveRef = useRef(false);

  // Persist the transcript whenever it changes (debounced via React batching).
  // Writes to the active session's scoped store AND refreshes the sidebar's
  // metadata (updatedAt + auto-title from the first user message).
  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }
    storeRef.current.save(messages);
    saveSession(activeId, messages);
    setSessions(listSessions());
  }, [messages, activeId]);

  const refreshSessions = useCallback(() => setSessions(listSessions()), []);

  // Switch to another conversation: rebuild the engine + scoped store, load that
  // transcript, and mark it current. The save effect is skipped for the load.
  const switchSession = useCallback(
    (id: string) => {
      if (id === activeId) {
        setDrawerOpen(false);
        return;
      }
      tts.cancel();
      asr.stop();
      sessionRef.current.reset();
      storeRef.current = getSessionMemory(id);
      setCurrent(id);
      skipSaveRef.current = true;
      setMessages(getSession(id)?.messages ?? []);
      setActiveId(id);
      setDraft('');
      setDrawerOpen(false);
      refreshSessions();
      track('session_switch', {});
      requestAnimationFrame(() => taRef.current?.focus());
    },
    [activeId, tts, asr, refreshSessions],
  );

  // Start a brand-new conversation and switch to it.
  const newSession = useCallback(() => {
    tts.cancel();
    asr.stop();
    sessionRef.current.reset();
    const meta = createSessionMeta();
    storeRef.current = getSessionMemory(meta.id);
    skipSaveRef.current = true;
    setMessages([]);
    setActiveId(meta.id);
    setDraft('');
    setDrawerOpen(false);
    refreshSessions();
    track('session_new', {});
    requestAnimationFrame(() => taRef.current?.focus());
  }, [tts, asr, refreshSessions]);

  const onRenameSession = useCallback(
    (id: string, title: string) => {
      renameSession(id, title);
      refreshSessions();
      track('session_rename', {});
    },
    [refreshSessions],
  );

  // Delete a conversation; if it was active, fall back to the newest remaining
  // session or a fresh one so the view is never left dangling.
  const onDeleteSession = useCallback(
    (id: string) => {
      const remaining = deleteSession(id);
      if (id === activeId) {
        tts.cancel();
        asr.stop();
        sessionRef.current.reset();
        if (remaining.length > 0) {
          const next = remaining[0];
          storeRef.current = getSessionMemory(next.id);
          setCurrent(next.id);
          skipSaveRef.current = true;
          setMessages(getSession(next.id)?.messages ?? []);
          setActiveId(next.id);
        } else {
          const meta = createSessionMeta();
          storeRef.current = getSessionMemory(meta.id);
          skipSaveRef.current = true;
          setMessages([]);
          setActiveId(meta.id);
        }
      }
      refreshSessions();
      track('session_delete', {});
    },
    [activeId, tts, asr, refreshSessions],
  );

  const activeMeta = sessions.find((s) => s.id === activeId);

  const onExportMarkdown = useCallback(() => {
    downloadMarkdown(messages, activeMeta?.title ?? 'Mazungumzo na Akili');
    track('chat_export', { format: 'md' });
  }, [messages, activeMeta]);

  const onExportJSON = useCallback(() => {
    const meta = activeMeta ?? {
      id: activeId,
      title: 'Mazungumzo na Akili',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    downloadJSON(meta, messages);
    track('chat_export', { format: 'json' });
  }, [messages, activeMeta, activeId]);

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

  // Follow-up chips: when the newest message is an answer and we're idle, offer
  // 2–3 domain-relevant next questions. Clicking one sends it.
  const last = messages[messages.length - 1];
  const followups =
    !busy && last && last.role === 'akili' ? followupsFor(last.answer.domain) : [];

  return (
    <div className={`akili-app${drawerOpen ? ' is-drawer-open' : ''}`}>
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        drawerOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNew={newSession}
        onSelect={switchSession}
        onRename={onRenameSession}
        onDelete={onDeleteSession}
      />
      {drawerOpen && (
        <button
          type="button"
          className="akili-scrim"
          aria-label="Funga orodha"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div className="akili-main">
      <Header
        ttsSupported={tts.supported}
        muted={muted}
        onToggleMute={onToggleMute}
        canExport={!isEmpty}
        onExportMarkdown={onExportMarkdown}
        onExportJSON={onExportJSON}
        onNewChat={newSession}
        onOpenDrawer={() => setDrawerOpen(true)}
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

          {followups.length > 0 && (
            <FollowUps prompts={followups} onPick={(p) => void send(p)} />
          )}
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
    </div>
  );
}

// ── history sidebar / drawer ───────────────────────────────────────────────────

interface SidebarProps {
  sessions: SessionMeta[];
  activeId: string;
  drawerOpen: boolean;
  onClose: () => void;
  onNew: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

function Sidebar({
  sessions,
  activeId,
  drawerOpen,
  onClose,
  onNew,
  onSelect,
  onRename,
  onDelete,
}: SidebarProps) {
  return (
    <aside
      className={`akili-sidebar${drawerOpen ? ' is-open' : ''}`}
      aria-label="Mazungumzo yaliyopita"
    >
      <div className="akili-sidebar-head">
        <span className="akili-sidebar-title">Mazungumzo</span>
        <button
          type="button"
          className="akili-sidebar-close"
          onClick={onClose}
          aria-label="Funga orodha"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <button type="button" className="akili-newchat-btn" onClick={onNew}>
        <span aria-hidden="true">＋</span> Mazungumzo mapya
      </button>

      <nav className="akili-session-list" aria-label="Orodha ya mazungumzo">
        {sessions.length === 0 ? (
          <p className="akili-session-empty">Hakuna mazungumzo bado.</p>
        ) : (
          sessions.map((s) => (
            <SessionRow
              key={s.id}
              session={s}
              active={s.id === activeId}
              onSelect={() => onSelect(s.id)}
              onRename={(t) => onRename(s.id, t)}
              onDelete={() => onDelete(s.id)}
            />
          ))
        )}
      </nav>
    </aside>
  );
}

function SessionRow({
  session,
  active,
  onSelect,
  onRename,
  onDelete,
}: {
  session: SessionMeta;
  active: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(session.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(session.title);
      requestAnimationFrame(() => inputRef.current?.select());
    }
  }, [editing, session.title]);

  const commit = () => {
    setEditing(false);
    const next = draft.trim();
    if (next && next !== session.title) onRename(next);
  };

  if (editing) {
    return (
      <div className={`akili-session-row${active ? ' is-active' : ''} is-editing`}>
        <input
          ref={inputRef}
          className="akili-session-rename"
          value={draft}
          aria-label="Badilisha jina la mazungumzo"
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commit();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              setEditing(false);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={`akili-session-row${active ? ' is-active' : ''}`}>
      <button
        type="button"
        className="akili-session-pick"
        onClick={onSelect}
        aria-current={active ? 'true' : undefined}
        title={session.title}
      >
        <span className="akili-session-name">{session.title}</span>
        <span className="akili-session-time">{relativeTime(session.updatedAt)}</span>
      </button>
      <div className="akili-session-actions">
        <button
          type="button"
          className="akili-session-act"
          onClick={() => setEditing(true)}
          title="Badilisha jina"
          aria-label={`Badilisha jina la "${session.title}"`}
        >
          <span aria-hidden="true">✎</span>
        </button>
        <button
          type="button"
          className="akili-session-act akili-session-act--del"
          onClick={() => {
            if (
              typeof window === 'undefined' ||
              window.confirm(`Futa "${session.title}"? Hatua hii haiwezi kutenduliwa.`)
            ) {
              onDelete();
            }
          }}
          title="Futa mazungumzo"
          aria-label={`Futa "${session.title}"`}
        >
          <span aria-hidden="true">🗑</span>
        </button>
      </div>
    </div>
  );
}

// ── header ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  ttsSupported: boolean;
  muted: boolean;
  onToggleMute: () => void;
  canExport: boolean;
  onExportMarkdown: () => void;
  onExportJSON: () => void;
  onNewChat: () => void;
  onOpenDrawer: () => void;
}

function Header({
  ttsSupported,
  muted,
  onToggleMute,
  canExport,
  onExportMarkdown,
  onExportJSON,
  onNewChat,
  onOpenDrawer,
}: HeaderProps) {
  const [exportOpen, setExportOpen] = useState(false);
  return (
    <header className="akili-top">
      <div className="akili-brand">
        <button
          type="button"
          className="akili-hamburger"
          onClick={onOpenDrawer}
          aria-label="Fungua orodha ya mazungumzo"
        >
          <span aria-hidden="true">☰</span>
        </button>
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
        {canExport && (
          <div className="akili-export">
            <button
              type="button"
              className="akili-iconbtn"
              onClick={() => setExportOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={exportOpen}
              title="Pakua mazungumzo"
            >
              <span aria-hidden="true">⤓</span>
              <span className="sr-only">Pakua mazungumzo</span>
            </button>
            {exportOpen && (
              <div className="akili-export-menu" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setExportOpen(false);
                    onExportMarkdown();
                  }}
                >
                  Pakua Markdown (.md)
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setExportOpen(false);
                    onExportJSON();
                  }}
                >
                  Pakua JSON (.json)
                </button>
              </div>
            )}
          </div>
        )}
        <button type="button" className="akili-newchat" onClick={onNewChat}>
          + Mpya
        </button>
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
      <h2>Akili — AI ya Kiswahili, huru na bila mtandao</h2>
      <p>
        Uliza chochote kwa Kiswahili — afya, fasihi, lugha, sheria, kilimo,
        elimu, biashara na SNIL. Akili huchagua mtaalamu sahihi na kujibu papo
        hapo, bila kutuma data popote.
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

// ── follow-up suggestions ───────────────────────────────────────────────────────

function FollowUps({
  prompts,
  onPick,
}: {
  prompts: string[];
  onPick: (p: string) => void;
}) {
  return (
    <div className="akili-followups" role="group" aria-label="Maswali ya kuendelea">
      <span className="akili-followups-lead">Endelea kuuliza:</span>
      {prompts.map((p) => (
        <button
          key={p}
          type="button"
          className="followup-chip"
          onClick={() => onPick(p)}
        >
          {p}
        </button>
      ))}
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
