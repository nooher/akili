/**
 * TibaAI Engine — Public API
 *
 * VENDORED into Akili from C:\Users\nuham\tiba\src\services\tibaai
 * (the sovereign, fully-offline clinical reasoning engine; zero dependencies,
 * zero network calls — verified). This is a vendored copy: the `afya` domain
 * expert consumes it directly so Akili stays self-contained. Refresh this whole
 * `engine/` tree from the TibaAI source whenever TibaAI updates. Do not edit the
 * vendored files for app-specific behaviour — adapt at the expert layer
 * (`../index.ts`) instead. The legacy `adapters/` app bridges were intentionally
 * skipped; only a minimal `adapters/legacyTypes.ts` (the `AIResult` type surface)
 * is kept because the interactions/outbreaks knowledge modules reference it.
 *
 * Single entry point: askTibaAI(query, options) → TibaAnswer
 *
 * Everything else is internal implementation. Screens import only from here.
 */

import { parseQuery } from './nlu';
import { reason } from './reasoner';
import { Language, PatientContext, TibaAnswer, ParsedQuery } from '../types';
import { knowledgeCoverage } from '../knowledge';

export interface AskOptions {
  /** Preferred output language — if not provided, detected from query. */
  language?: Language;
  /** Patient context for personalization (allergies, conditions, meds). */
  patientContext?: PatientContext;
}

/**
 * Ask TibaAI a question. Pure function — no side effects.
 * Caller is responsible for audit logging if needed.
 */
export function askTibaAI(query: string, options: AskOptions = {}): TibaAnswer {
  const parsed: ParsedQuery = parseQuery(query, options.language);
  const answer = reason(parsed, options.patientContext);
  return answer;
}

/** Expose parser for diagnostic UIs ("why did the engine see this?"). */
export { parseQuery } from './nlu';
export { reason } from './reasoner';
export { knowledgeCoverage };

/** Re-export key types for screen-level use. */
export type {
  TibaAnswer,
  ParsedQuery,
  Language,
  PatientContext,
} from '../types';
