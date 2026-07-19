/** Languages Akili understands + answers in. sw_mtaa = colloquial/street Swahili. */
type AkiliLang = 'sw' | 'en' | 'sw_mtaa';
/** Knowledge domains Akili routes across. */
type AkiliDomain = 'afya' | 'fasihi' | 'lugha' | 'sheria' | 'kilimo' | 'elimu' | 'biashara' | 'logistiki' | 'kodi' | 'snil' | 'jumla';
type AkiliConfidence = 'high' | 'medium' | 'low';
interface AkiliQuery {
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
interface AkiliBias {
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
interface AkiliSource {
    /** Human label, e.g. "WHO", "NTLG 2021", "Kasuku KB", "SNIL". */
    label: string;
    /** Optional reference/citation detail (not necessarily a URL). */
    ref?: string;
    /** Optional clickable URL, when the source is a real linkable page. */
    url?: string;
}
/** When the SNIL tool runs, the generated program + its output travels here. */
interface AkiliSnilTrace {
    /** The SNIL source Akili generated (or the user supplied). */
    code: string;
    /** Captured program output. */
    output: string;
    /** Set if the program errored (Kiswahili message). */
    error?: string;
}
interface AkiliAnswer {
    /** Which domain handled it. */
    domain: AkiliDomain;
    /** Which expert answered (id). */
    expert: string;
    /** The answer text. `sw` is always present; `en` when available. */
    text: {
        sw: string;
        en?: string;
    };
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
interface DomainExpert {
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

/** One remembered turn (compact — just what later turns need to reason). */
interface AkiliTurn {
    domain: AkiliDomain;
    expert: string;
    /** The user's (trimmed) text for that turn. */
    text: string;
    /** The answer's topic, when the expert exposed one (e.g. logistiki). */
    topic?: string;
}
/**
 * The session-level memory carried between turns. Generic by design: `entities`
 * is a flat string map populated from each answer's `data.entities` (+ a top-level
 * `data.topic` when present), so it works for any domain without bespoke shapes.
 */
interface AkiliMemory {
    /** Domain of the most recent answered turn. */
    lastDomain?: AkiliDomain;
    /** Expert id of the most recent answered turn. */
    lastExpert?: string;
    /** Topic of the most recent answer (when the expert exposed one). */
    lastTopic?: string;
    /** Accumulating entity map: country, corridor, mode, value, topic, … */
    entities: Record<string, string>;
    /** The last N turns, oldest first. */
    recentTurns: AkiliTurn[];
}

interface Akili {
    /** Ask Akili. Accepts a raw string (treated as Swahili) or a structured query. */
    ask(q: AkiliQuery | string): Promise<AkiliAnswer>;
    /** The registered experts, in registration order. */
    experts: DomainExpert[];
}
declare function createAkili(experts?: DomainExpert[]): Akili;
interface AkiliExchange {
    query: AkiliQuery;
    answer: AkiliAnswer;
}
interface AkiliSession {
    ask(q: AkiliQuery | string): Promise<AkiliAnswer>;
    /** The last N exchanges, oldest first. */
    history(): AkiliExchange[];
    /** The accumulated multi-turn memory (lastDomain, entities, recentTurns). */
    memory(): AkiliMemory;
    /** Clear the conversation memory. */
    reset(): void;
}
/**
 * A multi-turn session over an Akili instance. Carries a small, generic memory
 * between turns (lastDomain/lastExpert, an accumulating entity map, the last N
 * turns) and injects it into each query's context so experts resolve anaphoric
 * follow-ups — e.g. "duty in Kenya" → "and the VAT there?" keeps Kenya, and
 * "dalili za malaria" → "tiba yake?" stays in afya.
 *
 * Sovereign + deterministic: every decision is a pure function of prior turns +
 * the current text. The prior `history` context is preserved for back-compat.
 */
declare function createAkiliSession(akili: Akili, maxTurns?: number): AkiliSession;

declare const snilExpert: DomainExpert;

declare const jumlaExpert: DomainExpert;

/**
 * Afya — the health / clinical domain expert for Akili.
 *
 * Backed by the VENDORED TibaAI engine (`./engine/engine`), a sovereign,
 * fully-offline clinical reasoner (32 conditions, 18 drugs, 14 labs; sources
 * from WHO / NTLG / MoH-TZ / IMCI / mhGAP …). No external LLM, no network.
 *
 * This module is the thin adapter that:
 *   1. scores health queries (`match`) using Swahili + English clinical cues,
 *      with a single TibaAI confidence probe for ambiguous text;
 *   2. answers (`answer`) by calling `askTibaAI` and mapping the rich
 *      `TibaAnswer` down to Akili's `AkiliAnswer` contract — preserving
 *      urgency framing, red flags, sources and the disclaimer.
 */

declare const afyaExpert: DomainExpert;

declare const fasihiExpert: DomainExpert;
declare const lughaExpert: DomainExpert;

declare const sheriaExpert: DomainExpert;

declare const kilimoExpert: DomainExpert;

declare const elimuExpert: DomainExpert;

declare const biasharaExpert: DomainExpert;

declare const logistikiExpert: DomainExpert;

declare const kodiExpert: DomainExpert;

/**
 * The default expert registry, in priority order. Order matters only for ties
 * (router breaks equal scores by registration order); jumla is the fallback so
 * it lives last with its baseline ~0.05 score.
 */
declare const defaultExperts: DomainExpert[];
/** The default, ready-to-use Akili instance (all nine experts). */
declare const akili: Akili;
/** One-call entry point: ask the default Akili instance. */
declare function askAkili(q: AkiliQuery | string): Promise<AkiliAnswer>;

export { type Akili, type AkiliAnswer, type AkiliBias, type AkiliConfidence, type AkiliDomain, type AkiliExchange, type AkiliLang, type AkiliQuery, type AkiliSession, type AkiliSnilTrace, type AkiliSource, type DomainExpert, afyaExpert, akili, askAkili, biasharaExpert, createAkili, createAkiliSession, defaultExperts, elimuExpert, fasihiExpert, jumlaExpert, kilimoExpert, kodiExpert, logistikiExpert, lughaExpert, sheriaExpert, snilExpert };
