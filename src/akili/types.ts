// types.ts — the Akili contract. Every domain expert implements DomainExpert;
// the router picks the best-matching expert and returns an AkiliAnswer.
// Sovereign by design: experts are pure/deterministic TS (no external LLM).

/** Languages Akili understands + answers in. sw_mtaa = colloquial/street Swahili. */
export type AkiliLang = 'sw' | 'en' | 'sw_mtaa';

/** Knowledge domains Akili routes across. */
export type AkiliDomain =
  | 'afya' //  health / clinical (TibaAI)
  | 'fasihi' //  literature / reading / poetry (Kasuku)
  | 'lugha' //  Kiswahili language: grammar, translate, pronounce (Kasuku)
  | 'sheria' //  Tanzanian law & civic rights basics
  | 'kilimo' //  agriculture for smallholder farmers
  | 'elimu' //  study help / education system
  | 'biashara' //  small business & financial literacy
  | 'logistiki' //  logistics & trade (CargoLink Rubani, vendored)
  | 'snil' //  SNIL-as-tool: Swahili intent → code → execution
  | 'jumla'; //  general / about-Akili / fallback

export type AkiliConfidence = 'high' | 'medium' | 'low';

export interface AkiliQuery {
  /** The user's question, in Swahili or English. */
  text: string;
  /** Preferred answer language (default 'sw'). */
  lang?: AkiliLang;
  /**
   * Optional structured context an expert may use (e.g. patient context for
   * afya, or `logistics`/`memory` injected by a multi-turn AkiliSession).
   */
  context?: Record<string, unknown>;
}

/**
 * Anaphora bias the router applies on top of expert scores: when a session
 * detects a short follow-up ("…na VAT yake?") it nudges `domain` up by `boost`
 * so a near-tie resolves to the prior domain WITHOUT overriding a clear winner.
 * Carried on `context.bias`; absent for one-shot asks.
 */
export interface AkiliBias {
  domain: AkiliDomain;
  /** Small additive score boost applied to the prior domain (0..1). */
  boost: number;
  /**
   * Score floor for the prior domain on a follow-up so it competes even when its
   * own matcher (which can't see carried context) scored low. Kept below the
   * "clear cue" threshold so a strong new-topic query still wins outright.
   */
  floor: number;
}

export interface AkiliSource {
  /** Human label, e.g. "WHO", "NTLG 2021", "Kasuku KB", "SNIL". */
  label: string;
  /** Optional reference/URL/citation detail. */
  ref?: string;
}

/** When the SNIL tool runs, the generated program + its output travels here. */
export interface AkiliSnilTrace {
  /** The SNIL source Akili generated (or the user supplied). */
  code: string;
  /** Captured program output. */
  output: string;
  /** Set if the program errored (Kiswahili message). */
  error?: string;
}

export interface AkiliAnswer {
  /** Which domain handled it. */
  domain: AkiliDomain;
  /** Which expert answered (id). */
  expert: string;
  /** The answer text. `sw` is always present; `en` when available. */
  text: { sw: string; en?: string };
  confidence: AkiliConfidence;
  /** Cited sources (clinical guidelines, KB, SNIL, …) — the sovereignty signal. */
  sources?: AkiliSource[];
  /** Expert-specific structured payload (e.g. the full TibaAnswer / KasukuAnswer). */
  data?: unknown;
  /** Present when the SNIL tool was used. */
  snil?: AkiliSnilTrace;
}

/**
 * A domain expert. The router calls `match()` on every expert and dispatches the
 * query to the highest scorer, then `answer()` produces the AkiliAnswer.
 */
export interface DomainExpert {
  /** Stable id, e.g. 'afya-tibaai'. */
  id: string;
  /** Domain this expert serves. */
  domain: AkiliDomain;
  /** Short Swahili label for UIs, e.g. "Afya". */
  label: string;
  /**
   * Confidence (0..1) that this expert should handle the query. The router
   * dispatches to the max; ties broken by registration order. Keep it cheap.
   */
  match(q: AkiliQuery): number;
  /** Produce the answer. May be sync or async (e.g. SNIL execution). */
  answer(q: AkiliQuery): AkiliAnswer | Promise<AkiliAnswer>;
}
