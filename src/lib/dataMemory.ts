// dataMemory.ts — Akili's long-term memory backed by Laetoli Data.
//
// ── The convergence ───────────────────────────────────────────────────────────
// Akili (sovereign Swahili AI) + Laetoli Data (sovereign self-hostable
// Postgres/PostgREST + pgvector). This adapter persists every conversation turn
// as a row in Laetoli Data's owner-scoped `public.documents` table — content =
// the message text, embedding = a LOCAL sovereign vector (see lib/embed), and
// metadata = { role, ts, session }. It can then RECALL relevant past context via
// `hybrid_search` (full-text + vector, RRF-fused), giving Akili long-term memory
// that survives reloads, devices, and the localStorage cap.
//
// ── Why a vendored thin client, not the published @laetoli/data ───────────────
// `@laetoli/data` lives in the `client/` SUBDIRECTORY of the nooher/laetoli-data
// repo (the repo root has no package.json — it's the full backend). npm (v11)
// cannot install a package from a git sub-path the way pnpm's `#path:` can, so a
// `github:nooher/laetoli-data` dependency would resolve the repo root, find no
// package.json, and fail the install. Rather than make the build depend on the
// SDK being separately published to a registry, we VENDOR a tiny typed fetch
// client below that speaks the *exact same wire protocol* as @laetoli/data:
//   • POST {url}/rest/documents              — insert a row   (PostgREST)
//   • POST {url}/rest/rpc/hybrid_search      — RAG retrieval  (SQL function)
//   • POST {url}/auth/anonymous              — get a bearer    (lean auth)
// The shapes (`HybridDocument`, `DataResult`, header conventions) mirror the SDK
// one-for-one, so if/when @laetoli/data is published this file can be swapped to
// `import { createClient } from '@laetoli/data'` with no change to its consumers.
// Zero new dependencies; fully offline-testable against a mocked client.

import { embed } from './embed';
import type { MemorySnapshot, MemoryStore, StoredMsg } from './memory';
import { buildSnapshot } from './memory';

// ── wire-protocol types (mirror @laetoli/data) ────────────────────────────────

/** Supabase-shaped envelope, identical to @laetoli/data's `DataResult`. */
export interface DataResult<T> {
  data: T | null;
  error: { message: string; code?: string | null } | null;
  status: number;
}

/** One row from `hybrid_search` — mirrors @laetoli/data's `HybridDocument`. */
export interface HybridDocument<M = Record<string, unknown>> {
  id: string;
  content: string | null;
  metadata: M;
  /** Fused Reciprocal-Rank-Fusion score; higher = better. */
  score: number;
}

/** Metadata we attach to every persisted turn. */
export interface TurnMetadata {
  role: StoredMsg['role'];
  /** ISO-8601 UTC of when the turn was stored. */
  ts: string;
  /** App-level session id, so one device's turns can be grouped/filtered. */
  session: string;
  /** Tag every Akili row so a shared Data instance can scope queries. */
  source: 'akili';
  [key: string]: unknown;
}

/**
 * The minimal slice of the Laetoli Data client this adapter needs. Declaring it
 * as an interface (a) documents the contract, (b) lets tests inject a mock, and
 * (c) makes the real @laetoli/data client a structural drop-in later.
 */
export interface DataClientLike {
  /** Insert document rows (content + embedding + metadata) into `documents`. */
  insertDocuments(
    rows: Array<{ content: string; embedding: number[]; metadata: TurnMetadata }>,
  ): Promise<DataResult<unknown>>;
  /** RRF-fused full-text + vector search over `documents`. */
  hybridSearch(
    query: string,
    embedding: number[],
    opts?: { count?: number; filter?: Record<string, unknown> },
  ): Promise<DataResult<HybridDocument<TurnMetadata>[]>>;
}

// ── vendored thin fetch client ────────────────────────────────────────────────

export interface DataClientConfig {
  /** Base URL of the Laetoli Data deployment (no trailing slash needed). */
  url: string;
  /** Anon/public api key — sent as `apikey` + default bearer (Supabase-style). */
  anonKey: string;
  /** Inject fetch (tests / non-standard runtimes). Defaults to global fetch. */
  fetch?: typeof fetch;
}

function stripTrailingSlash(u: string): string {
  return u.replace(/\/+$/, '');
}

/**
 * Build a thin, typed Laetoli Data client. Speaks PostgREST + the SQL RPCs
 * directly; no auth session management beyond passing the anon key (the row's
 * owner is whatever the anon key resolves to server-side — for a single-tenant
 * personal deployment that is exactly right). Never throws: every network/parse
 * failure is folded into a `DataResult.error`.
 */
export function createDataClient(cfg: DataClientConfig): DataClientLike {
  const base = stripTrailingSlash(cfg.url);
  const restUrl = `${base}/rest`;
  const f = (cfg.fetch ?? globalThis.fetch)?.bind(globalThis);

  function headers(extra?: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      apikey: cfg.anonKey,
      Authorization: `Bearer ${cfg.anonKey}`,
      ...extra,
    };
  }

  async function post<T>(path: string, body: unknown, extra?: Record<string, string>): Promise<DataResult<T>> {
    if (!f) {
      return { data: null, error: { message: 'no fetch available', code: 'no_fetch' }, status: 0 };
    }
    let res: Response;
    try {
      res = await f(`${restUrl}${path}`, {
        method: 'POST',
        headers: headers(extra),
        body: JSON.stringify(body),
      });
    } catch (e) {
      return {
        data: null,
        error: { message: e instanceof Error ? e.message : String(e), code: 'fetch_error' },
        status: 0,
      };
    }
    const text = await res.text();
    let parsed: unknown = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
    }
    if (!res.ok) {
      const o = (parsed && typeof parsed === 'object' ? parsed : {}) as Record<string, unknown>;
      return {
        data: null,
        error: {
          message: typeof o.message === 'string' ? o.message : res.statusText || 'request failed',
          code: typeof o.code === 'string' ? o.code : String(res.status),
        },
        status: res.status,
      };
    }
    return { data: (parsed as T) ?? null, error: null, status: res.status };
  }

  return {
    insertDocuments(rows) {
      // PostgREST: POST to the table; `Prefer: return=minimal` keeps it light.
      return post<unknown>('/documents', rows, { Prefer: 'return=minimal' });
    },
    hybridSearch(query, embedding, opts) {
      return post<HybridDocument<TurnMetadata>[]>('/rpc/hybrid_search', {
        query,
        query_embedding: embedding,
        match_count: opts?.count ?? 10,
        full_text_weight: 1.0,
        semantic_weight: 1.0,
        rrf_k: 50,
        filter: opts?.filter ?? { source: 'akili' },
      });
    },
  };
}

// ── the recalled-turn shape returned to callers ───────────────────────────────

/** A past turn surfaced by {@link DataMemoryStore.recall}. */
export interface RecalledTurn {
  text: string;
  role: StoredMsg['role'];
  ts: string;
  session: string;
  /** RRF relevance score from hybrid_search (higher = more relevant). */
  score: number;
}

// ── plain-text extraction from a StoredMsg ────────────────────────────────────

/**
 * The text we persist + embed for a turn. User/error turns store their `.text`;
 * an Akili answer stores its Swahili answer text (the substantive content). A
 * turn with no usable text yields '' and is skipped.
 */
export function turnText(msg: StoredMsg): string {
  if (msg.role === 'akili') return msg.answer.text.sw ?? '';
  return msg.text ?? '';
}

// ── the Data-backed memory store ──────────────────────────────────────────────

export interface DataMemoryOptions {
  /** Stable id for this conversation/device, written into each row's metadata. */
  session: string;
  /**
   * A localStorage-backed MemoryStore used as the LOCAL mirror. The transcript
   * still round-trips through here so the UI keeps working exactly as before and
   * offline; Laetoli Data is the long-term, cross-session vector memory layered
   * on top. (Pass the existing createMemoryStore() result.)
   */
  local: MemoryStore;
  /** How many past turns recall() returns by default. */
  recallCount?: number;
}

/**
 * A {@link MemoryStore} that mirrors to localStorage (so nothing about the
 * existing UI changes) AND, on every save, persists *new* turns to Laetoli Data
 * with a sovereign-local embedding. Adds `recall(query)` for RAG retrieval.
 *
 * `save()` is fire-and-forget against the network: the local mirror is written
 * synchronously first, so a Data outage never blocks or breaks the chat — it
 * just means that turn isn't in long-term memory yet.
 */
export class DataMemoryStore implements MemoryStore {
  private readonly client: DataClientLike;
  private readonly local: MemoryStore;
  private readonly session: string;
  private readonly recallCount: number;
  /** Ids already shipped to Data this run — so re-saves don't duplicate rows. */
  private readonly sent = new Set<string>();

  constructor(client: DataClientLike, opts: DataMemoryOptions) {
    this.client = client;
    this.local = opts.local;
    this.session = opts.session;
    this.recallCount = opts.recallCount ?? 6;
  }

  load(): MemorySnapshot | null {
    return this.local.load();
  }

  clear(): void {
    // Only the local mirror is cleared — long-term memory in Laetoli Data is
    // intentionally durable across "Anza upya" (start over). The next run keeps
    // its session id, and recall still surfaces prior context.
    this.local.clear();
    this.sent.clear();
  }

  save(messages: StoredMsg[]): void {
    // 1) Local mirror first — synchronous, can't fail the app.
    this.local.save(messages);

    // 2) Persist any turns we haven't shipped yet, in the background.
    const fresh = messages.filter((m) => !this.sent.has(m.id) && turnText(m).trim() !== '');
    if (fresh.length === 0) return;

    const now = new Date().toISOString();
    const rows = fresh.map((m) => {
      const content = turnText(m);
      return {
        content,
        embedding: embed(content),
        metadata: { role: m.role, ts: now, session: this.session, source: 'akili' as const },
      };
    });
    // Mark as sent optimistically; even if the write fails we won't spam retries
    // every keystroke. (A future enhancement could re-queue on error.)
    for (const m of fresh) this.sent.add(m.id);

    void this.client
      .insertDocuments(rows)
      .catch(() => {
        /* network/store failure must never surface into the chat */
      });
  }

  /**
   * Retrieve the most relevant past turns for `query` via Laetoli Data's
   * `hybrid_search` (full-text + the sovereign-local vector). Returns [] on any
   * error so callers can treat "no memory" and "memory unavailable" the same.
   */
  async recall(query: string, count = this.recallCount): Promise<RecalledTurn[]> {
    const q = query.trim();
    if (!q) return [];
    let res: DataResult<HybridDocument<TurnMetadata>[]>;
    try {
      res = await this.client.hybridSearch(q, embed(q), {
        count,
        filter: { source: 'akili' },
      });
    } catch {
      return [];
    }
    if (res.error || !res.data) return [];
    return res.data
      .filter((d) => typeof d.content === 'string' && d.content)
      .map((d) => ({
        text: d.content as string,
        role: d.metadata?.role ?? 'user',
        ts: d.metadata?.ts ?? '',
        session: d.metadata?.session ?? '',
        score: d.score,
      }));
  }
}

/** Build a snapshot from messages (re-exported for parity/testing convenience). */
export { buildSnapshot };
