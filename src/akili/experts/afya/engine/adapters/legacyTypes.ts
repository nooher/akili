/**
 * TibaAI Adapters — Legacy Type Surface
 *
 * These types match the original `utils/ai.ts` API exactly so that screens
 * which used to import from `'../utils/ai'` can simply switch to
 * `'../services/tibaai/adapters'` with zero code changes.
 *
 * Owning these types here (rather than depending on the legacy file) means
 * the adapter layer is the canonical source of truth — `utils/ai.ts` can
 * be deleted entirely without any import breaking.
 */

/**
 * Alert level — drives the urgency badge color in TranslatorScreen and
 * the status band in HomeScreen.
 */
export type AlertLevel = 'info' | 'watch' | 'action' | 'urgent';

/**
 * Engine confidence in the match between the query and authored content.
 */
export type Confidence = 'high' | 'medium' | 'low';

/**
 * Whether the answer came from local engine ('offline') or a hybrid path.
 * v2 is offline-only; the type is preserved for forward compatibility.
 */
export type AnswerSource = 'offline' | 'hybrid';

/**
 * Patient-facing AI response shape. Used by TranslatorScreen and any other
 * screen that calls `translateMedical()`.
 */
export interface AIResult {
  level: AlertLevel;
  confidence: Confidence;
  source: AnswerSource;
  disclaimer: string;
  text: string;
  swahili?: string;
}
