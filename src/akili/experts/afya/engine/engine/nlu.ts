/**
 * NLU — Natural Language Understanding
 *
 * Pipeline:
 *   raw text
 *     → normalize (lowercase, strip punctuation, collapse whitespace)
 *     → detect language
 *     → extract entities (conditions, drugs, labs, numbers+units)
 *     → classify intent
 *     → return ParsedQuery
 *
 * Pure functions. Deterministic. Testable. No network.
 */

import {
  ParsedQuery,
  ExtractedEntity,
  QueryIntent,
  Language,
} from '../types';
import {
  REVERSE_INDEX,
  SUBSTANCE_WORDS,
} from './synonyms';

// ──────────────────────────────────────────────────────────────────────
// NORMALIZATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Cleans a raw query into a normalized form for matching:
 *   - lowercase
 *   - strip punctuation except / and . (used in BP, decimals)
 *   - collapse whitespace
 *   - normalize unicode
 */
export function normalize(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s/.,%]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ──────────────────────────────────────────────────────────────────────
// LANGUAGE DETECTION
// ──────────────────────────────────────────────────────────────────────

const SWAHILI_MARKERS = [
  'na', 'ya', 'wa', 'kwa', 'ni', 'la', 'za', 'yangu', 'yako', 'yake',
  'nina', 'sina', 'kuna', 'hakuna', 'naweza', 'siwezi',
  'nifanyeje', 'nifanyaje', 'inamaanisha', 'maana',
  'daktari', 'mgonjwa', 'hospitali', 'dawa', 'kunywa', 'kula',
  'sukari', 'presha', 'pressa', 'figo', 'damu', 'mimba', 'mtoto',
  'shinikizo', 'kisukari', 'pombe', 'mvinyo',
];

const ENGLISH_MARKERS = [
  'the', 'is', 'are', 'and', 'or', 'my', 'your', 'what', 'how', 'can',
  'should', 'i', 'me', 'doctor', 'hospital', 'medicine', 'drug',
  'blood', 'pressure', 'sugar', 'diabetes', 'kidney', 'liver',
];

/** Lightweight script-and-markers based language detection. */
export function detectLanguage(normalized: string): Language {
  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 'en';

  let swScore = 0;
  let enScore = 0;

  for (const tok of tokens) {
    if (SWAHILI_MARKERS.includes(tok)) swScore += 2;
    if (ENGLISH_MARKERS.includes(tok)) enScore += 2;
    // Swahili noun-class prefixes are characteristic
    if (/^(ki|vi|m|wa|u|n|ma)[a-z]{3,}$/.test(tok)) swScore += 0.3;
  }

  // Tie → default to detected market default: Tanzania = Swahili.
  return swScore >= enScore ? 'sw' : 'en';
}

// ──────────────────────────────────────────────────────────────────────
// FUZZY MATCHING — Levenshtein distance for typo tolerance
// ──────────────────────────────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const dp: number[] = Array(b.length + 1).fill(0).map((_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1]
        ? prev
        : Math.min(prev, dp[j - 1], dp[j]) + 1;
      prev = tmp;
    }
  }
  return dp[b.length];
}

/** Returns similarity 0..1, tolerant of small typos for words ≥4 chars. */
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 4) return a === b ? 1 : 0;
  const dist = levenshtein(a, b);
  return 1 - dist / maxLen;
}

// ──────────────────────────────────────────────────────────────────────
// ENTITY EXTRACTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Extract numeric values and units from the query.
 * Handles:
 *   - BP: "168/102" or "168 / 102"
 *   - Lab values: "245 μmol/L", "7.1%", "12 mmol/l"
 *   - Bare numbers near known labs
 */
function extractNumbers(normalized: string, _surfaceMap: Map<number, ExtractedEntity>): ExtractedEntity[] {
  const results: ExtractedEntity[] = [];

  // BP pattern: e.g. "168/102", "168 / 102"
  const bpRegex = /(\d{2,3})\s*\/\s*(\d{2,3})/g;
  let m: RegExpExecArray | null;
  while ((m = bpRegex.exec(normalized)) !== null) {
    const systolic = parseInt(m[1], 10);
    const diastolic = parseInt(m[2], 10);
    // Plausibility check: systolic 70-260, diastolic 40-160
    if (systolic >= 70 && systolic <= 260 && diastolic >= 40 && diastolic <= 160) {
      results.push({
        type: 'lab',
        id: 'blood_pressure',
        surfaceForm: m[0],
        confidence: 0.95,
        value: systolic,
        value2: diastolic,
        unit: 'mmHg',
      });
    }
  }

  // Number with unit: "245 μmol/L", "7.1%", "12 mmol/l", "88 umol/l"
  const numUnitRegex = /(\d+(?:\.\d+)?)\s*(%|mmol\/l|mmol\/L|umol\/l|μmol\/L|μmol\/l|umol\/L|mg\/dl|mg\/dL|mmhg|mmHg)/gi;
  while ((m = numUnitRegex.exec(normalized)) !== null) {
    const val = parseFloat(m[1]);
    const unit = m[2];
    let labId = 'unknown_lab';

    // Guess lab from unit context
    if (/%/.test(unit)) {
      // A bare percent could be HbA1c, SpO2, urine protein percentage, or
      // an asthma personal-best percentage. Only auto-tag as HbA1c when
      // there's actual HbA1c context AND no competing respiratory/peak-flow
      // context — otherwise leave as unknown_lab and let the better
      // candidates (SpO2, peak flow personal-best) win.
      const hasHbA1cContext = /\b(hba1c|a1c|haemoglobin\s*a1c|hemoglobin\s*a1c|glycated)\b/i.test(normalized);
      const hasSpO2Context = /\b(spo2|sp\s?o2|oxygen\s+saturation|oxygen\s+level|oxygen\s+sat|o2\s+sat|sats|pulse\s+ox(?:imetry)?|saturation|oksijeni\s+ya\s+damu|kiwango\s+cha\s+oksijeni)\b/i.test(normalized);
      const hasPeakFlowContext = /\b(peak\s+flow|pef|pefr|peak\s+expiratory|kipimo\s+cha\s+pumzi|kipimo\s+cha\s+pumu|mtiririko\s+wa\s+pumzi|personal\s+best|baseline|bora\s+yangu|bora\s+binafsi)\b/i.test(normalized);
      if (hasHbA1cContext && !hasSpO2Context && !hasPeakFlowContext) {
        labId = 'hba1c';
      } else {
        // Don't tag this %-value as anything; let the dedicated bare-number
        // heuristics for SpO2, peak flow %-of-best, or HbA1c (with explicit
        // context) handle it.
        continue;
      }
    }
    else if (/mmol|umol|μmol/i.test(unit)) {
      // Heuristic: small values + mmol/L near "sukari/glucose/sugar" → glucose
      // larger values + umol → creatinine
      if (/umol|μmol/i.test(unit)) labId = 'creatinine';
      else if (/(sukari|glucose|sugar|rbs|fbs)/i.test(normalized)) labId = 'glucose';
      else labId = 'unknown_lab';
    }
    else if (/mg\/dl/i.test(unit)) {
      if (/(sukari|glucose|sugar)/i.test(normalized)) labId = 'glucose';
      else labId = 'unknown_lab';
    }

    results.push({
      type: 'lab',
      id: labId,
      surfaceForm: m[0],
      confidence: 0.85,
      value: val,
      unit: unit,
    });
  }

  // Bare-number heuristic: number near an HbA1c/glucose mention without unit
  // Only fires if no unit-bearing match for that lab was already found
  const hasHbA1cValue = results.some((r) => r.id === 'hba1c' && r.value !== undefined);
  const hasGlucoseValue = results.some((r) => r.id === 'glucose' && r.value !== undefined);

  if (!hasHbA1cValue && /(hba1c|a1c|haemoglobin a1c|hemoglobin a1c|glycated)/i.test(normalized)) {
    // Find any number 3.0-20.0 (plausible HbA1c range)
    const bareNumRegex = /(?<![\d.])(\d+\.\d+|\d+)(?![\d/])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      if (val >= 3.0 && val <= 20.0) {
        results.push({
          type: 'lab',
          id: 'hba1c',
          surfaceForm: m[0],
          confidence: 0.75, // lower — no unit
          value: val,
          unit: '%',
        });
        break; // take only first plausible number
      }
    }
  }

  if (!hasGlucoseValue && /(sukari|glucose|sugar|rbs|fbs|blood sugar)/i.test(normalized)) {
    // Negative context: phrases that indicate a number is NOT a glucose value
    // e.g. "aina ya 2", "type 2", "type 1", "kisukari aina ya"
    const isLikelyTypeNumber = (numStr: string, normalized: string): boolean => {
      const num = parseFloat(numStr);
      if (num !== 1 && num !== 2) return false; // only relevant for "1" or "2"
      // Check if "type" or "aina" appears within ~15 chars before the number
      const numIdx = normalized.indexOf(numStr);
      if (numIdx < 0) return false;
      const before = normalized.slice(Math.max(0, numIdx - 20), numIdx);
      return /\b(type|aina ya|aina)\b/i.test(before);
    };

    const bareNumRegex = /(?<![\d.])(\d+\.\d+|\d+)(?![\d/])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      // Plausible glucose values mmol/L: 1.0-40.0
      if (val < 1.0 || val > 40.0) continue;
      // Skip if this is "type 1/2 diabetes" or "aina ya 1/2"
      if (isLikelyTypeNumber(m[1], normalized)) continue;

      results.push({
        type: 'lab',
        id: 'glucose',
        surfaceForm: m[0],
        confidence: 0.7,
        value: val,
        unit: 'mmol/L',
      });
      break;
    }
  }

  // Bare-number heuristic: CD4 count — a number near a CD4 mention.
  // Plausible CD4 range 0-2000 cells/mm³.
  const hasCd4Value = results.some((r) => r.id === 'cd4' && r.value !== undefined);
  if (!hasCd4Value && /\b(cd4|cd 4|cd four|cd4 count)\b/i.test(normalized)) {
    const bareNumRegex = /(?<![\d.])(\d+(?:\.\d+)?)(?![\d/])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      // Skip the literal "4" in the token "cd4" / "cd 4"
      const idx = m.index;
      const before = normalized.slice(Math.max(0, idx - 4), idx).toLowerCase();
      if (val === 4 && /cd\s?$/.test(before)) continue;
      if (val >= 0 && val <= 2000) {
        results.push({
          type: 'lab',
          id: 'cd4',
          surfaceForm: m[0],
          confidence: 0.75,
          value: val,
          unit: 'cells/mm³',
        });
        break; // take only the first plausible number
      }
    }
  }

  // Bare-number heuristic: HIV Viral Load — a number near a viral-load mention,
  // OR the word "undetectable" / "haionekani" / "target not detected" → value 0.
  // Plausible VL range 0-10,000,000 copies/mL.
  const hasVlValue = results.some((r) => r.id === 'viral_load' && r.value !== undefined);
  if (
    !hasVlValue &&
    /\b(viral load|viral-load|vl|hiv rna|copies per ml|copies\/ml)\b/i.test(normalized)
  ) {
    // "Undetectable" family → suppressed, represented as value 0.
    if (
      /\b(undetectable|target not detected|not detected|suppressed|haionekani|havionekani|haviwezi kuonekana|virusi havionekani|imedhibitiwa)\b/i.test(
        normalized,
      )
    ) {
      results.push({
        type: 'lab',
        id: 'viral_load',
        surfaceForm: 'undetectable',
        confidence: 0.8,
        value: 0,
        unit: 'copies/mL',
      });
    } else {
      const bareNumRegex = /(?<![\d.])(\d+(?:\.\d+)?)(?![\d/])/g;
      while ((m = bareNumRegex.exec(normalized)) !== null) {
        const val = parseFloat(m[1]);
        if (val >= 0 && val <= 10_000_000) {
          results.push({
            type: 'lab',
            id: 'viral_load',
            surfaceForm: m[0],
            confidence: 0.75,
            value: val,
            unit: 'copies/mL',
          });
          break; // take only the first plausible number
        }
      }
    }
  }

  // Bare-number heuristic: serum creatinine — a number near a creatinine
  // mention without a unit. Plausible range ~30-1500 µmol/L (covers normal
  // through end-stage). Unit-bearing creatinine is already handled above.
  const hasCreatinineValue = results.some(
    (r) => r.id === 'creatinine' && r.value !== undefined,
  );
  if (
    !hasCreatinineValue &&
    /\b(creatinine|serum creatinine|kreatini|kreatinini)\b/i.test(normalized)
  ) {
    const bareNumRegex = /(?<![\d.])(\d+(?:\.\d+)?)(?![\d/%])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      // Plausible serum creatinine in µmol/L. Values < 30 are more likely
      // mg/dL or a stray number — skip to stay conservative.
      if (val >= 30 && val <= 1500) {
        results.push({
          type: 'lab',
          id: 'creatinine',
          surfaceForm: m[0],
          confidence: 0.75,
          value: val,
          unit: 'µmol/L',
        });
        break; // take only the first plausible number
      }
    }
  }

  // Bare-number heuristic: eGFR — a number near an eGFR mention. eGFR is
  // reported without a unit in everyday use. Plausible range 1-120
  // mL/min/1.73m² (covers G5 failure through normal/high).
  const hasEgfrValue = results.some((r) => r.id === 'egfr' && r.value !== undefined);
  if (
    !hasEgfrValue &&
    /\b(egfr|e-gfr|gfr|estimated gfr|glomerular filtration|kiwango cha uchujaji)\b/i.test(
      normalized,
    )
  ) {
    const bareNumRegex = /(?<![\d.])(\d+(?:\.\d+)?)(?![\d/%])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      if (val >= 1 && val <= 120) {
        results.push({
          type: 'lab',
          id: 'egfr',
          surfaceForm: m[0],
          confidence: 0.75,
          value: val,
          unit: 'mL/min/1.73m²',
        });
        break; // take only the first plausible number
      }
    }
  }

  // Bare-number heuristic: SpO2 — a number 0-100 near an SpO2 / oxygen-
  // saturation mention. The percent sign may or may not be present.
  const hasSpO2Value = results.some((r) => r.id === 'spo2' && r.value !== undefined);
  if (
    !hasSpO2Value &&
    /\b(spo2|sp\s?o2|oxygen\s+saturation|oxygen\s+level|oxygen\s+sat|o2\s+sat|sats|pulse\s+ox(?:imetry)?|saturation|oksijeni\s+ya\s+damu|kiwango\s+cha\s+oksijeni)\b/i.test(
      normalized,
    )
  ) {
    // Accept numbers like "92" or "92%" or "92 percent"
    const bareNumRegex = /(?<![\d.])(\d{1,3}(?:\.\d+)?)\s*%?/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      // Plausible SpO2: 50-100% (below 50 is essentially unrecordable on
      // a finger oximeter; above 100 makes no physiological sense).
      if (val >= 50 && val <= 100) {
        results.push({
          type: 'lab',
          id: 'spo2',
          surfaceForm: m[0],
          confidence: 0.8,
          value: val,
          unit: '%',
        });
        break;
      }
    }
  }

  // Bare-number heuristic: respiratory rate — a number near a respiratory-
  // rate or breathing-rate mention. Plausible range 10-100 breaths/min.
  const hasRRValue = results.some(
    (r) => r.id === 'respiratory_rate' && r.value !== undefined,
  );
  if (
    !hasRRValue &&
    /\b(respiratory\s+rate|breathing\s+rate|breaths?\s+per\s+minute|breaths?\s*\/\s*min|breath\s+rate|kasi\s+ya\s+kupumua|pumzi\s+kwa\s+dakika|mara\s+ya\s+kupumua|kasi\s+ya\s+pumzi|mara\s+kwa\s+dakika|anapumua|kupumua\s+haraka|fast\s+breathing|breathing\s+fast|newborn\s+breathing|infant\s+breathing|baby\s+breathing|child\s+breathing|kupumua\s+kwa\s+shida)\b/i.test(
      normalized,
    )
  ) {
    const bareNumRegex = /(?<![\d.])(\d{1,3}(?:\.\d+)?)(?![\d/%])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      if (val >= 10 && val <= 100) {
        results.push({
          type: 'lab',
          id: 'respiratory_rate',
          surfaceForm: m[0],
          confidence: 0.75,
          value: val,
          unit: 'breaths/min',
        });
        break;
      }
    }
  }

  // Bare-number heuristic: peak flow — a number 50-800 L/min near a peak-
  // flow mention. Adult range 200-700; child range 100-400; we accept the
  // full plausible window.
  const hasPeakFlowValue = results.some(
    (r) => r.id === 'peak_flow' && r.value !== undefined,
  );
  if (
    !hasPeakFlowValue &&
    /\b(peak\s+flow|pef|pefr|peak\s+expiratory\s+flow|peakflow|peak\s+flow\s+meter|peak\s+flow\s+reading|kipimo\s+cha\s+pumzi|kipimo\s+cha\s+pumu|mtiririko\s+wa\s+pumzi|kasi\s+ya\s+pumzi\s+yangu)\b/i.test(
      normalized,
    )
  ) {
    const bareNumRegex = /(?<![\d.])(\d{2,4}(?:\.\d+)?)(?![\d/%])/g;
    while ((m = bareNumRegex.exec(normalized)) !== null) {
      const val = parseFloat(m[1]);
      if (val >= 50 && val <= 800) {
        results.push({
          type: 'lab',
          id: 'peak_flow',
          surfaceForm: m[0],
          confidence: 0.78,
          value: val,
          unit: 'L/min',
        });
        break;
      }
    }

    // Special case: user gives only a percentage ("peak flow 75% of personal
    // best") without an absolute L/min value. Synthesise a peak_flow entity
    // whose value carries the percentage and let the attacher mark it for
    // the reasoner. We pick an adult-typical personal best of 500 so the
    // reasoner's percentage maths land on the user's stated %.
    const stillNoValue = !results.some(
      (r) => r.id === 'peak_flow' && r.value !== undefined,
    );
    if (stillNoValue) {
      const pctOnlyRegex = /(\d{1,3})\s*%\s*(?:of\s+)?(?:my\s+|personal\s+|the\s+)?best/i;
      const pctOnlyMatch = normalized.match(pctOnlyRegex);
      if (pctOnlyMatch) {
        const pct = parseInt(pctOnlyMatch[1], 10);
        if (pct >= 10 && pct <= 120) {
          // Synthetic adult-typical PB so percentage-only inputs land in
          // the right zone. attachAsthmaLabContext will overwrite this
          // context with the explicit personal-best percent if it finds one.
          const syntheticPB = 500;
          const syntheticValue = Math.round((syntheticPB * pct) / 100);
          results.push({
            type: 'lab',
            id: 'peak_flow',
            surfaceForm: pctOnlyMatch[0],
            confidence: 0.7,
            value: syntheticValue,
            unit: 'L/min',
            qualitativeContext: `personal_best_known:${syntheticPB}`,
          });
        }
      }
    }
  }

  // Bare-number heuristic: spirometry — FEV1 % predicted (10-150) when
  // a spirometry / lung-function-test / fev1 / fvc cue is present, or a
  // FEV1/FVC ratio (0.30-1.00) which we DON'T tag as a value (the ratio
  // is the diagnostic context, not the staging number). We pick the
  // FEV1 % predicted as the numeric value because that is what drives
  // GOLD severity.
  const hasSpirometryValue = results.some(
    (r) => r.id === 'spirometry' && r.value !== undefined,
  );
  if (
    !hasSpirometryValue &&
    /\b(spirometry|lung\s+function|pulmonary\s+function|pft|fev1|fvc|breathing\s+test|kipimo\s+cha\s+mapafu|kipimo\s+cha\s+utendaji\s+wa\s+mapafu|kipimo\s+cha\s+kazi\s+ya\s+mapafu|kipimo\s+cha\s+kupumua)\b/i.test(
      normalized,
    )
  ) {
    // First look for an explicit "FEV1 NN%" pattern — most reliable.
    const fev1PctRegex = /\bfev1[^0-9%]{0,30}?(\d{1,3})\s*%/i;
    const fev1PctMatch = normalized.match(fev1PctRegex);
    if (fev1PctMatch) {
      const val = parseFloat(fev1PctMatch[1]);
      if (val >= 10 && val <= 150) {
        results.push({
          type: 'lab',
          id: 'spirometry',
          surfaceForm: fev1PctMatch[0],
          confidence: 0.86,
          value: val,
          unit: '% predicted',
        });
      }
    } else {
      // Fallback: a bare percentage near a spirometry cue.
      const barePctRegex = /(?<![\d.])(\d{1,3})\s*%/g;
      while ((m = barePctRegex.exec(normalized)) !== null) {
        const val = parseFloat(m[1]);
        if (val >= 10 && val <= 150) {
          results.push({
            type: 'lab',
            id: 'spirometry',
            surfaceForm: m[0],
            confidence: 0.74,
            value: val,
            unit: '% predicted',
          });
          break;
        }
      }
      // If no % was found, try a plain integer 10-150 (e.g. "my fev1 is 65")
      const stillNo = !results.some(
        (r) => r.id === 'spirometry' && r.value !== undefined,
      );
      if (stillNo) {
        const bareIntRegex = /(?<![\d.])(\d{2,3})(?![\d/%])/g;
        while ((m = bareIntRegex.exec(normalized)) !== null) {
          const val = parseFloat(m[1]);
          if (val >= 10 && val <= 150) {
            results.push({
              type: 'lab',
              id: 'spirometry',
              surfaceForm: m[0],
              confidence: 0.7,
              value: val,
              unit: '% predicted',
            });
            break;
          }
        }
      }
    }
  }

  return results;
}

/**
 * Walk the normalized text and find any known entity surface form.
 * Uses greedy longest-match-first via the pre-sorted reverse index.
 */
function extractKnownEntities(normalized: string): ExtractedEntity[] {
  const found: ExtractedEntity[] = [];
  const claimed = new Array(normalized.length).fill(false);

  for (const entry of REVERSE_INDEX) {
    const sf = entry.surfaceForm;
    // Word-boundary search
    let searchFrom = 0;
    while (searchFrom < normalized.length) {
      const idx = normalized.indexOf(sf, searchFrom);
      if (idx === -1) break;

      // Check word boundaries
      const before = idx === 0 || /\s|[.,/]/.test(normalized[idx - 1]);
      const after = idx + sf.length === normalized.length
        || /\s|[.,/]/.test(normalized[idx + sf.length]);

      if (before && after) {
        // Check overlap with already claimed range
        let overlaps = false;
        for (let i = idx; i < idx + sf.length; i++) {
          if (claimed[i]) { overlaps = true; break; }
        }
        if (!overlaps) {
          found.push({
            type: entry.entityType,
            id: entry.canonicalId,
            surfaceForm: sf,
            confidence: entry.language === 'slang' ? 0.85 : 0.95,
          });
          for (let i = idx; i < idx + sf.length; i++) claimed[i] = true;
        }
      }
      searchFrom = idx + sf.length;
    }
  }

  // Fuzzy fallback for unmatched word-like tokens of decent length.
  // Only do this if we found NOTHING (avoids noisy fuzzy matches).
  if (found.length === 0) {
    const tokens = normalized.split(/\s+/).filter((t) => t.length >= 5);
    for (const tok of tokens) {
      let bestMatch: { entry: typeof REVERSE_INDEX[0]; score: number } | null = null;
      for (const entry of REVERSE_INDEX) {
        if (Math.abs(entry.surfaceForm.length - tok.length) > 3) continue;
        if (entry.surfaceForm.includes(' ')) continue; // single-word fuzzy only
        const sim = similarity(tok, entry.surfaceForm);
        if (sim >= 0.75 && (!bestMatch || sim > bestMatch.score)) {
          bestMatch = { entry, score: sim };
        }
      }
      if (bestMatch) {
        found.push({
          type: bestMatch.entry.entityType,
          id: bestMatch.entry.canonicalId,
          surfaceForm: tok,
          confidence: bestMatch.score * 0.8, // fuzzy = lower confidence
        });
      }
    }
  }

  return found;
}

/**
 * Detect substances (alcohol, smoking, pregnancy, etc.) — important for
 * drug interaction queries.
 */
function extractSubstances(normalized: string): ExtractedEntity[] {
  const results: ExtractedEntity[] = [];
  Object.entries(SUBSTANCE_WORDS).forEach(([substanceId, words]) => {
    for (const w of words) {
      // Use regex with word boundaries for short tokens
      const pattern = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (pattern.test(normalized)) {
        results.push({
          type: 'substance',
          id: substanceId,
          surfaceForm: w,
          confidence: 0.9,
        });
        break;
      }
    }
  });
  return results;
}

// ──────────────────────────────────────────────────────────────────────
// INTENT CLASSIFICATION
// ──────────────────────────────────────────────────────────────────────

function classifyIntent(
  normalized: string,
  entities: ExtractedEntity[]
): QueryIntent {
  const hasCondition = entities.some((e) => e.type === 'condition');
  const hasDrug = entities.some((e) => e.type === 'drug');
  const hasLab = entities.some((e) => e.type === 'lab');
  const hasLabValue = entities.some(
    (e) => e.type === 'lab' && (e.value !== undefined || e.qualitativeResult !== undefined),
  );
  const hasSubstance = entities.some((e) => e.type === 'substance');

  // Drug + substance/condition → interaction query
  if (hasDrug && hasSubstance) return 'drug_interaction';
  if (hasDrug && /\b(na|with|pamoja|together)\b/.test(normalized) && hasCondition) {
    return 'drug_interaction';
  }

  // Lab + value → interpretation
  if (hasLabValue) return 'explain_lab';

  // Drug alone → drug education
  if (hasDrug && !hasCondition && !hasLab) return 'explain_drug';

  // Condition alone → condition education
  if (hasCondition && !hasDrug) return 'explain_condition';

  // Lifestyle keywords
  if (/\b(naweza|can i|should i|nikiwa|nikila|kunywa|kula)\b/.test(normalized)) {
    return 'lifestyle_question';
  }

  // Symptom keywords (basic; expand later)
  if (/\b(maumivu|kichwa|tumbo|kuhara|kutapika|homa|pain|fever|cough|kikohozi)\b/.test(normalized)) {
    return 'symptom_education';
  }

  if (hasCondition || hasDrug || hasLab) return 'general_education';

  return 'unknown';
}

// ──────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ──────────────────────────────────────────────────────────────────────

/**
 * For mRDT entities, detect whether the user is reporting a positive, negative,
 * or invalid result, and attach a clinical context flag (fever_current,
 * recent_treatment, severe_symptoms, asymptomatic) so the reasoner can
 * choose the right interpretation branch.
 */
function attachQualitativeMrdtResult(entities: ExtractedEntity[], normalized: string): void {
  const mrdtEntity = entities.find((e) => e.type === 'lab' && e.id === 'mrdt');
  if (!mrdtEntity) return;

  // Detect result
  let result: 'positive' | 'negative' | 'invalid' | undefined;
  if (/\b(positive|chanya|positif)\b/i.test(normalized) || /\+\s?ve\b/i.test(normalized)) {
    result = 'positive';
  } else if (
    /\b(negative|hasi|negatif|haina malaria|sina malaria)\b/i.test(normalized) ||
    /-\s?ve\b/i.test(normalized)
  ) {
    result = 'negative';
  } else if (/\b(invalid|haifanyi kazi|imeharibika|control line haijatoka)\b/i.test(normalized)) {
    result = 'invalid';
  }

  if (!result) return;
  mrdtEntity.qualitativeResult = result;

  // Detect clinical context
  const hasFeverWord = /\b(fever|homa|hot|moto|temperature ya juu|nina homa|joto la mwili)\b/i.test(normalized);
  const hasSevereSigns = /\b(convulsion|kifafa|unconscious|kuzimia|drowsy|usingizi mkubwa|cannot drink|hawezi kunywa|repeated vomiting|kutapika sana|severe|kali|emergency|dharura|chest indrawing|mbavu kuingia|kupumua haraka|fast breathing|pale|weupe|mkojo wa giza|dark urine|yellow eyes|macho ya njano)\b/i.test(normalized);
  const hasRecentTreatment = /\b(treated|nilitibiwa|nilipata matibabu|recently|hivi karibuni|wiki iliyopita|just finished|nimemaliza|after treatment|baada ya matibabu|nimemaliza alu|nimemaliza coartem)\b/i.test(normalized);

  let context: string = 'unknown';
  if (hasSevereSigns) context = 'severe_symptoms';
  else if (hasRecentTreatment) context = 'recent_treatment';
  else if (hasFeverWord) context = 'fever_current';
  else if (result === 'negative') context = 'asymptomatic';

  mrdtEntity.qualitativeContext = context;
  // qualitative results don't have a numeric value but should still trigger the lab branch
  // (resolveExplainLab now checks for qualitativeResult OR value)
}

/**
 * Attach qualitative result and clinical context to a GeneXpert entity.
 * Detects:
 *   - mtb_detected_rif_sensitive | mtb_detected_rif_resistant
 *   - mtb_detected_rif_indeterminate | mtb_not_detected | invalid
 * And the clinical context:
 *   - initial_diagnosis | treatment_failure_workup | hiv_coinfection
 *   - pediatric_workup | contact_screening | unknown
 */
function attachQualitativeGenexpertResult(entities: ExtractedEntity[], normalized: string): void {
  const gxEntity = entities.find((e) => e.type === 'lab' && e.id === 'genexpert');
  if (!gxEntity) return;

  // ── Detect rifampicin status first (more specific) ────────────────
  const hasRifResistant =
    /\b(rif(ampicin)?[\s-]*resist(ant|ance)?|resistance to rifampicin|rifampicin\s+resistance|rr[\s-]?tb|mdr|multidrug[\s-]?resist|rif positive resistant|rif r|rif\+r)\b/i.test(normalized) ||
    /\b(sugu kwa rifampicin|upinzani wa rifampicin|rifampicin sugu|tb sugu|mdr tb)\b/i.test(normalized);
  const hasRifIndeterminate =
    /\b(rif(ampicin)? indeterminate|rif indeterminate|rif unclear|rifampicin haijulikani|haijaweza|isiyojulikana|haieleweki)\b/i.test(normalized);
  const hasMtbDetected =
    /\b(mtb (was )?detected|mtb positive|mtb\+|tb detected|tb positive|gene\s?xpert positive|xpert positive|positive gene\s?xpert|positive xpert)\b/i.test(normalized) ||
    /\b(genexpert imegundua|xpert imegundua|tb imegunduliwa|tb chanya|mtb imegunduliwa)\b/i.test(normalized);
  const hasMtbNotDetected =
    /\b(mtb (was )?not detected|mtb negative|mtb-|tb not detected|tb negative|gene\s?xpert negative|xpert negative|negative gene\s?xpert|negative xpert|no tb|hakuna tb)\b/i.test(normalized) ||
    /\b(haijagunduliwa|haijadetectiwa|hakuna mtb|tb negative|haina tb|hakuna kifua kikuu|xpert hasi|genexpert hasi|mtb hasi|tb hasi)\b/i.test(normalized);
  const hasInvalid =
    /\b(invalid|haifanyi kazi|imeharibika|sample mbovu|sample insufficient|test failed|error result|batili)\b/i.test(normalized);

  let result:
    | 'mtb_detected_rif_sensitive'
    | 'mtb_detected_rif_resistant'
    | 'mtb_detected_rif_indeterminate'
    | 'mtb_not_detected'
    | 'invalid'
    | undefined;

  if (hasInvalid && !hasMtbDetected) {
    result = 'invalid';
  } else if (hasMtbDetected && hasRifResistant) {
    result = 'mtb_detected_rif_resistant';
  } else if (hasMtbDetected && hasRifIndeterminate) {
    result = 'mtb_detected_rif_indeterminate';
  } else if (hasMtbDetected) {
    // Default to RIF-sensitive when MTB is detected without explicit resistance mention
    result = 'mtb_detected_rif_sensitive';
  } else if (hasMtbNotDetected) {
    result = 'mtb_not_detected';
  }

  if (!result) return;
  gxEntity.qualitativeResult = result;

  // ── Detect clinical context ───────────────────────────────────────
  const hasHIV =
    /\b(hiv|aids|vvu|ukimwi|art|tld|nina vvu|nina hiv|cd4|viral load|on art|cd four)\b/i.test(normalized);
  const hasPediatric =
    /\b(child|baby|infant|mtoto|watoto|kid|under five|chini ya miaka|pediatric|paediatric|mtoto wangu)\b/i.test(normalized);
  const hasTreatmentFailure =
    /\b(treatment failure|not improving|symptoms returned|relapse|kurudia|haipungui|haijaboresha|baada ya matibabu|after treatment|nimemaliza tb|treatment after)\b/i.test(normalized);
  const hasContactScreening =
    /\b(contact screening|household contact|exposure screen|family was tested|family screen|alichunguzwa|niko karibu na mgonjwa|nimekutana na tb|household screening|wamekutana na tb)\b/i.test(normalized);

  let context: string = 'unknown';
  // Priority order: most specific first
  if (hasTreatmentFailure) context = 'treatment_failure_workup';
  else if (hasContactScreening) context = 'contact_screening';
  else if (hasPediatric) context = 'pediatric_workup';
  else if (hasHIV) context = 'hiv_coinfection';
  else context = 'initial_diagnosis';

  gxEntity.qualitativeContext = context;
}

/**
 * Attach a clinical-context flag to CD4 and Viral Load lab entities so the
 * reasoner can pick the right interpretation branch. These are NUMERIC labs
 * (the value comes from extractNumbers) — here we only set qualitativeContext,
 * never qualitativeResult.
 *
 * CD4 contexts:        at_diagnosis | on_art | unwell | unknown
 * Viral Load contexts: first_check | routine_monitoring | repeat_after_high | unknown
 */
function attachHivLabContext(entities: ExtractedEntity[], normalized: string): void {
  const cd4Entity = entities.find((e) => e.type === 'lab' && e.id === 'cd4');
  const vlEntity = entities.find((e) => e.type === 'lab' && e.id === 'viral_load');
  if (!cd4Entity && !vlEntity) return;

  const mentionsDiagnosis =
    /\b(just diagnosed|newly diagnosed|new diagnosis|at diagnosis|baseline|first cd4|first test|nimegundulika|umegundulika|kipimo cha kwanza|cha mwanzo|nimepata vvu)\b/i.test(
      normalized,
    );
  const mentionsOnArt =
    /\b(on art|taking art|on treatment|established|months on art|years on art|nipo kwenye art|natumia art|natumia dawa|nimekuwa kwenye|tld yangu)\b/i.test(
      normalized,
    );
  const mentionsUnwell =
    /\b(unwell|sick|ill|symptoms|fever|cough|losing weight|weak|admitted|mgonjwa|sijisikii vizuri|nina dalili|homa|kikohozi|napungua uzito|dhaifu)\b/i.test(
      normalized,
    );

  if (cd4Entity) {
    let ctx: string = 'unknown';
    if (mentionsUnwell) ctx = 'unwell';
    else if (mentionsDiagnosis) ctx = 'at_diagnosis';
    else if (mentionsOnArt) ctx = 'on_art';
    cd4Entity.qualitativeContext = ctx;
  }

  if (vlEntity) {
    const mentionsFirstCheck =
      /\b(first viral load|first vl|6 month|six month|after starting|baada ya kuanza|viral load ya kwanza|vl ya kwanza)\b/i.test(
        normalized,
      );
    const mentionsRepeatAfterHigh =
      /\b(repeat|recheck|after adherence|second test|was high|previously high|kurudia|kupima tena|baada ya ushauri|ilikuwa juu|ya pili)\b/i.test(
        normalized,
      );
    const mentionsRoutine =
      /\b(routine|annual|yearly|regular|stable|monitoring|ya kawaida|ya mwaka|imara|ufuatiliaji)\b/i.test(
        normalized,
      );

    let ctx: string = 'unknown';
    if (mentionsRepeatAfterHigh) ctx = 'repeat_after_high';
    else if (mentionsFirstCheck) ctx = 'first_check';
    else if (mentionsRoutine) ctx = 'routine_monitoring';
    vlEntity.qualitativeContext = ctx;
  }
}

/**
 * Attach a clinical-context flag to Creatinine and eGFR lab entities so the
 * reasoner can pick the right interpretation branch. These are NUMERIC labs
 * (the value comes from extractNumbers) — here we only set qualitativeContext,
 * never qualitativeResult.
 *
 * Both Creatinine and eGFR share the same context type:
 *   first_result | known_ckd | unwell | unknown
 *
 *   - known_ckd : the person already has a CKD diagnosis and is monitoring it
 *   - unwell    : the person is acutely unwell — AKI must be considered, not
 *                 just chronic disease
 *   - first_result : a first-ever / one-off result, CKD not yet established
 */
function attachCkdLabContext(entities: ExtractedEntity[], normalized: string): void {
  const creatEntity = entities.find((e) => e.type === 'lab' && e.id === 'creatinine');
  const egfrEntity = entities.find((e) => e.type === 'lab' && e.id === 'egfr');
  if (!creatEntity && !egfrEntity) return;

  const mentionsKnownCkd =
    /\b(known ckd|i have ckd|my ckd|ckd patient|kidney disease|kidney failure|on dialysis|stage [1-5]|monitoring|nina ckd|nina ugonjwa wa figo|figo zangu|ninafuatilia|ugonjwa wa figo|nipo dialysis|hatua ya)\b/i.test(
      normalized,
    );
  const mentionsUnwell =
    /\b(unwell|sick|ill|acutely|admitted|dehydrated|vomiting|diarrhoea|diarrhea|not passing urine|less urine|swelling|sijisikii vizuri|mgonjwa|nimelazwa|kutapika|kuhara|sitoi mkojo|mkojo mdogo|uvimbe|nimekosa maji)\b/i.test(
      normalized,
    );
  const mentionsFirstResult =
    /\b(first|first result|first time|one off|new result|just tested|first creatinine|first egfr|kwa mara ya kwanza|matokeo ya kwanza|nimepima kwa mara ya kwanza|kipimo cha kwanza)\b/i.test(
      normalized,
    );

  // Priority: unwell (AKI must be ruled out) > known_ckd > first_result > unknown
  let ctx: string = 'unknown';
  if (mentionsUnwell) ctx = 'unwell';
  else if (mentionsKnownCkd) ctx = 'known_ckd';
  else if (mentionsFirstResult) ctx = 'first_result';

  if (creatEntity) creatEntity.qualitativeContext = ctx;
  if (egfrEntity) egfrEntity.qualitativeContext = ctx;
}

/**
 * Attach qualitative result and clinical context to a urine_protein entity.
 *
 * Result detection (dipstick lines): negative / trace / 1+ / 2+ / 3+ / 4+
 *   Recognised in en/sw/sw_mtaa forms — "1+", "one plus", "moja kuongezeka",
 *   "dipstick imeonyesha 2+", "++", "+++", etc.
 *
 * Context detection: anc_routine / suspected_preeclampsia / uti_workup
 *                    / ckd_monitoring / unknown
 *   Priority: suspected_preeclampsia (BP-up or warning signs) > ckd_monitoring
 *   > uti_workup > anc_routine > unknown.
 */
function attachQualitativeUrineProteinResult(
  entities: ExtractedEntity[],
  normalized: string,
  raw?: string,
): void {
  let upEntity = entities.find((e) => e.type === 'lab' && e.id === 'urine_protein');

  // Fallback recogniser: catch phrasings the alias-matcher misses because
  // a '+' splits the phrase (e.g. "protini 3+ kwenye mkojo" — after the
  // normalizer strips '+', the surface is "protini 3 kwenye mkojo", which
  // does not contain any single alias as a contiguous substring). When the
  // raw text has BOTH a urine/dipstick keyword AND a '+' symbol AND a
  // protein keyword, inject the urine_protein entity directly.
  const probe = (raw ?? '') + ' ' + normalized;
  if (!upEntity) {
    const hasUrineWord = /\b(mkojo|urine|dipstick|urinalysis)\b/i.test(probe);
    const hasProteinWord = /\b(protin[ai]|protein|albumin)\b/i.test(probe);
    const hasPlus = /\+/.test(probe);
    if (hasUrineWord && hasProteinWord && hasPlus) {
      const injected = {
        type: 'lab' as const,
        id: 'urine_protein',
        surfaceForm: 'urine protein',
        confidence: 0.75,
      };
      entities.push(injected);
      upEntity = injected;
    }
  }

  if (!upEntity) return;

  // ── Detect result ──────────────────────────────────────────────────
  // Order: more-specific (four/three/two/one plus) before less-specific.
  let result:
    | 'negative'
    | 'trace'
    | 'one_plus'
    | 'two_plus'
    | 'three_plus'
    | 'four_plus'
    | undefined;

  if (
    /(?<!\d)4\+/i.test(probe) ||
    /\b(four\s*plus|four\s*pluses|nne\s*kuongezeka|protini\s*nne)\b/i.test(probe) ||
    /\+\s*\+\s*\+\s*\+/.test(probe)
  ) {
    result = 'four_plus';
  } else if (
    /(?<!\d)3\+/i.test(probe) ||
    /\b(three\s*plus|three\s*pluses|tatu\s*kuongezeka|protini\s*tatu)\b/i.test(probe) ||
    /\+\s*\+\s*\+/.test(probe)
  ) {
    result = 'three_plus';
  } else if (
    /(?<!\d)2\+/i.test(probe) ||
    /\b(two\s*plus|two\s*pluses|mbili\s*kuongezeka|protini\s*mbili)\b/i.test(probe) ||
    /\+\s*\+/.test(probe)
  ) {
    result = 'two_plus';
  } else if (
    /(?<!\d)1\+/i.test(probe) ||
    /\b(one\s*plus|moja\s*kuongezeka|protini\s*moja)\b/i.test(probe) ||
    /(?<![+])\+(?![+])/.test(probe)
  ) {
    result = 'one_plus';
  } else if (
    /\b(trace|trace\s*protein|kidogo\s*sana|alama\s*kidogo)\b/i.test(probe)
  ) {
    result = 'trace';
  } else if (
    /\b(negative|no\s*protein|hakuna\s*protini|protini\s*hakuna|hasi)\b/i.test(probe)
  ) {
    result = 'negative';
  }

  if (!result) return;
  upEntity.qualitativeResult = result;

  // ── Detect clinical context ────────────────────────────────────────
  const mentionsPreeclampsia =
    /\b(pre[\s-]?eclampsia|eclampsia|kifafa cha mimba|hellp|raised bp|high bp|presha (ime)?panda|shinikizo la damu (juu|limepanda)|severe headache|kichwa kikali|blurred vision|kuona ukungu|swelling face|uvimbe wa uso|swollen hands|uvimbe wa mikono|upper belly pain|maumivu ya tumbo la juu|na\s+presha)\b/i.test(
      probe,
    );
  const mentionsCkd =
    /\b(ckd|chronic kidney|kidney disease|ugonjwa wa figo|nina ckd|ckd monitoring|ckd follow|figo zangu|nephrotic)\b/i.test(
      probe,
    );
  const mentionsUti =
    /\b(uti|urinary tract infection|burning urine|kuwaka kukojoa|maambukizi ya mkojo|frequent urination|nitrites|leucocytes)\b/i.test(
      probe,
    );
  const mentionsAnc =
    /\b(anc|antenatal|kliniki ya wajawazito|kliniki ya mimba|nina mimba|mjamzito|pregnant|expecting|routine antenatal|ziara ya mimba)\b/i.test(
      probe,
    );

  let context: string = 'unknown';
  if (mentionsPreeclampsia) context = 'suspected_preeclampsia';
  else if (mentionsCkd) context = 'ckd_monitoring';
  else if (mentionsUti) context = 'uti_workup';
  else if (mentionsAnc) context = 'anc_routine';

  upEntity.qualitativeContext = context;
}

/**
 * Attach clinical context to SpO2 and respiratory_rate entities.
 *
 * SpO2 contexts: acute_illness / known_chronic_lung / exertional_testing
 *                / unknown
 * Respiratory-rate contexts (age-driven): pediatric_under_2mo /
 *   pediatric_2_11mo / pediatric_1_5yr / adult / unknown
 */
function attachPneumoniaLabContext(
  entities: ExtractedEntity[],
  normalized: string,
): void {
  const spo2Entities = entities.filter((e) => e.type === 'lab' && e.id === 'spo2');
  const rrEntities = entities.filter(
    (e) => e.type === 'lab' && e.id === 'respiratory_rate',
  );
  if (spo2Entities.length === 0 && rrEntities.length === 0) return;

  // ── SpO2 clinical context ──────────────────────────────────────────
  if (spo2Entities.length > 0) {
    const mentionsAcute =
      /\b(pneumonia|nimonia|cough|kikohozi|fever|homa|breathlessness|kushindwa\s+kupumua|breathing\s+(problem|trouble|hard|fast|difficulty)|kupumua\s+(haraka|kwa\s+shida|kwa\s+nguvu)|acute|papo\s+hapo|chest\s+(pain|infection)|maumivu\s+ya\s+kifua|sepsis|asthma\s+attack|exacerbation|niko\s+mgonjwa|sijisikii\s+vizuri|ill|sick)\b/i.test(
        normalized,
      );
    const mentionsChronicLung =
      /\b(copd|emphysema|chronic\s+bronchitis|chronic\s+lung\s+disease|advanced\s+copd|ugonjwa\s+wa\s+mapafu\s+sugu|copd\s+yangu|baseline|kawaida\s+yangu)\b/i.test(
        normalized,
      );
    const mentionsExertion =
      /\b(after\s+walking|after\s+a\s+walk|on\s+exertion|after\s+stairs|baada\s+ya\s+kutembea|baada\s+ya\s+kupanda\s+ngazi|exercise\s+desaturation|kwa\s+juhudi|after\s+climbing|stair\s+climb)\b/i.test(
        normalized,
      );

    let ctx: string = 'unknown';
    if (mentionsExertion) ctx = 'exertional_testing';
    else if (mentionsChronicLung) ctx = 'known_chronic_lung';
    else if (mentionsAcute) ctx = 'acute_illness';
    spo2Entities.forEach((e) => (e.qualitativeContext = ctx));
  }

  // ── Respiratory rate age context ──────────────────────────────────
  if (rrEntities.length > 0) {
    const mUnder2mo =
      /\b(newborn|neonate|nec?u|mtoto\s+mchanga|chini\s+ya\s+miezi\s+2|less\s+than\s+2\s+months|under\s+2\s+months|wiki\s+(1|2|3|4|5|6|7|8)\b|week\s+(1|2|3|4|5|6|7|8)\b|miezi\s+1|month\s+old|1\s+month)\b/i.test(
        normalized,
      );
    const m2_11mo =
      /\b(2-?11\s+months|miezi\s+(2|3|4|5|6|7|8|9|10|11)\b|miezi\s+2\s+hadi\s+11|months\s+old|infant|mtoto\s+wa\s+miezi)\b/i.test(
        normalized,
      );
    const m1_5yr =
      /\b(under\s+5|under-?5|chini\s+ya\s+miaka\s+5|miaka\s+(1|2|3|4|5)\b|year[s]?\s+old|toddler|preschool|mtoto\s+wa\s+miaka)\b/i.test(
        normalized,
      );
    const mAdult =
      /\b(adult|mtu\s+mzima|mzee|mzazi|sepsis\s+adult|adult\s+pneumonia|over\s+18|miaka\s+18\s+kwenda\s+juu|grown[\s-]?up)\b/i.test(
        normalized,
      );

    let ctx: string = 'unknown';
    if (mUnder2mo) ctx = 'pediatric_under_2mo';
    else if (m2_11mo) ctx = 'pediatric_2_11mo';
    else if (m1_5yr) ctx = 'pediatric_1_5yr';
    else if (mAdult) ctx = 'adult';
    else if (/\b(child|kid|mtoto|watoto|mwana)\b/i.test(normalized))
      ctx = 'pediatric_1_5yr';
    rrEntities.forEach((e) => (e.qualitativeContext = ctx));
  }
}

/**
 * Attach clinical context to peak flow entities for asthma interpretation.
 *
 * Looks for explicit personal-best mentions in the user text so the
 * reasoner can compute zone-percentage (red < 50%, yellow 50-79%,
 * green ≥ 80%) rather than guessing from absolute values.
 *
 * Recognised patterns:
 *   "personal best is 500"            → personal_best_known:500
 *   "my best peak flow is 480"        → personal_best_known:480
 *   "best of 520"                     → personal_best_known:520
 *   "bora yangu ni 450"               → personal_best_known:450
 *   "compared to my baseline of 500"  → personal_best_known:500
 *   "no personal best"                → no_personal_best
 *   "don't know my best"              → no_personal_best
 *   (silence)                         → unknown
 */
function attachAsthmaLabContext(
  entities: ExtractedEntity[],
  normalized: string,
  raw: string,
): void {
  const peakFlowEntities = entities.filter(
    (e) => e.type === 'lab' && e.id === 'peak_flow',
  );
  if (peakFlowEntities.length === 0) return;

  const probe = (normalized + ' ' + raw).toLowerCase();

  // ── Personal best number extraction ────────────────────────────────
  let personalBest: number | undefined;

  const pbPatterns: RegExp[] = [
    /personal\s+best\s+(?:is|of|=|:|ni)?\s*(\d{2,4})/i,
    /my\s+best\s+(?:peak\s+flow\s+)?(?:is|of|=|:)?\s*(\d{2,4})/i,
    /best\s+of\s+(\d{2,4})/i,
    /baseline\s+(?:peak\s+flow\s+)?(?:is|of|=|:)?\s*(\d{2,4})/i,
    /compared\s+to\s+(?:my\s+)?(?:baseline|personal\s+best|best)\s+(?:of\s+)?(\d{2,4})/i,
    /(?:my\s+)?(?:usual|normal)\s+(?:peak\s+flow|reading)\s+(?:is\s+)?(\d{2,4})/i,
    // Swahili
    /bora\s+(?:yangu|binafsi)\s+(?:ni\s+)?(\d{2,4})/i,
    /personal\s+best\s+yangu\s+(?:ni\s+)?(\d{2,4})/i,
    /baseline\s+yangu\s+(?:ni\s+)?(\d{2,4})/i,
  ];

  for (const pat of pbPatterns) {
    const m = probe.match(pat);
    if (m) {
      const val = parseInt(m[1], 10);
      if (val >= 50 && val <= 900) {
        personalBest = val;
        break;
      }
    }
  }

  // ── Explicit percentage statements ─────────────────────────────────
  // "75% of personal best", "60% ya bora yangu", "im at 70% of my best"
  // If patient supplies a %, synthesise a personal best from the current
  // value so the reasoner's zone calc lands on that %.
  if (personalBest === undefined) {
    const pctPatterns: RegExp[] = [
      /(\d{1,3})\s*%\s*(?:of\s+)?(?:my\s+|personal\s+|the\s+)?best/i,
      /(\d{1,3})\s*%\s*of\s+(?:my\s+)?baseline/i,
      /asilimia\s+(\d{1,3})\s+ya\s+(?:bora|best|baseline)/i,
      /(?:nipo|niko|im|niko\s+kwenye|niko\s+katika|nipo\s+kwenye)\s*(?:at|kwenye|katika)?\s*(\d{1,3})\s*%/i,
      // Swahili "%-of-best" — bare "%" followed by "ya bora/baseline"
      /(\d{1,3})\s*%\s+ya\s+(?:bora|best|baseline)/i,
    ];
    for (const pat of pctPatterns) {
      const m = probe.match(pat);
      if (m) {
        const pct = parseInt(m[1], 10);
        if (pct >= 10 && pct <= 120) {
          // Synthesise PB from current peak-flow value: pb = value * 100 / pct.
          // Use the peak_flow entity that actually has a numeric value —
          // there may be both a bare-name match (no value) and a number
          // match (with value).
          const pfEntity =
            peakFlowEntities.find((e) => e.value !== undefined) ?? peakFlowEntities[0];
          if (pfEntity.value !== undefined && pct > 0) {
            personalBest = Math.round((pfEntity.value * 100) / pct);
          }
          break;
        }
      }
    }
  }

  // ── No personal best (explicit) ────────────────────────────────────
  const noBest =
    /\bno\s+personal\s+best\b/i.test(probe) ||
    /\bdon[' ]?t\s+know\s+(?:my\s+)?(?:personal\s+)?best\b/i.test(probe) ||
    /\bhaven[' ]?t\s+established\s+(?:my\s+)?(?:personal\s+)?best\b/i.test(probe) ||
    /\bnever\s+(?:done|measured)\s+peak\s+flow\b/i.test(probe) ||
    /\bsijawahi\s+pima\s+peak\s+flow\b/i.test(probe) ||
    /\bsijui\s+best\s+yangu\b/i.test(probe) ||
    /\bsina\s+personal\s+best\b/i.test(probe);

  // ── Apply context ──────────────────────────────────────────────────
  let ctx: string;
  if (personalBest !== undefined) {
    ctx = `personal_best_known:${personalBest}`;
  } else if (noBest) {
    ctx = 'no_personal_best';
  } else {
    ctx = 'unknown';
  }

  peakFlowEntities.forEach((e) => (e.qualitativeContext = ctx));
}

/**
 * COPD numeric lab context (Phase 10) — annotate any spirometry entity
 * with the post-bronchodilator FEV1/FVC obstruction status when the user
 * supplies one in surrounding text.
 *
 * Recognised patterns (illustrative, not exhaustive):
 *   "fev1/fvc 0.65"                 → post_bronchodilator_obstructed (if < 0.7)
 *   "fev1/fvc ratio 0.82"           → post_bronchodilator_normal (if ≥ 0.7)
 *   "ratio is 0.6"                  → uses the value as ratio
 *   "post-bronchodilator fev1/fvc 0.58" → obstructed
 *   "post bronchodilator confirmed COPD" → obstructed
 *   "after bronchodilator the ratio normalised" → normal
 *
 * If the ratio is mentioned WITHOUT explicit post/pre-bronchodilator, we
 * still trust it as the diagnostic ratio because the GOLD threshold is
 * universally taught as the post-BD ratio; this avoids false "unknown"
 * labelling when the user shares their own report.
 */
function attachCopdLabContext(
  entities: ExtractedEntity[],
  normalized: string,
  raw: string,
): void {
  const spiroEntities = entities.filter(
    (e) => e.type === 'lab' && e.id === 'spirometry',
  );
  if (spiroEntities.length === 0) return;

  const probe = (normalized + ' ' + raw).toLowerCase();

  // ── FEV1/FVC ratio number extraction ────────────────────────────────
  let ratio: number | undefined;

  const ratioPatterns: RegExp[] = [
    /fev1\s*\/\s*fvc\s*(?:ratio\s+)?(?:is\s+|of\s+|=\s*|:\s*)?(\d?\.\d{1,2})/i,
    /fev1\s+fvc\s+ratio\s+(?:is\s+|of\s+|=\s*|:\s*)?(\d?\.\d{1,2})/i,
    /ratio\s+(?:is\s+|of\s+|=\s*|:\s*)(\d?\.\d{1,2})/i,
    /(?:my\s+)?fev1\s*\/\s*fvc\s+(\d?\.\d{1,2})/i,
    // Swahili
    /ratio\s+yangu\s+(?:ni\s+)?(\d?\.\d{1,2})/i,
  ];

  for (const pat of ratioPatterns) {
    const m = probe.match(pat);
    if (m) {
      const val = parseFloat(m[1]);
      if (val >= 0.2 && val <= 1.0) {
        ratio = val;
        break;
      }
    }
  }

  // ── Explicit post-bronchodilator qualitative cues ──────────────────
  const explicitObstructed =
    /(post[\s-]?bronchodilator|post[\s-]?bd)[^.]{0,40}?(obstruct|copd\s+confirmed|reduced\s+ratio|ratio\s+still\s+low|< ?0\.7|less\s+than\s+0\.7|chini\s+ya\s+0\.7)/i.test(probe) ||
    /(obstruct|copd\s+confirmed|airflow\s+obstruction|kuziba\s+kumethibitishwa|kuziba\s+kuliothibitishwa)/i.test(probe);

  const explicitNormal =
    /(post[\s-]?bronchodilator|post[\s-]?bd)[^.]{0,40}?(normal\s+ratio|ratio\s+normalis|reversible|≥ ?0\.7|>=? ?0\.7|greater\s+than\s+0\.7|juu\s+ya\s+0\.7|imerejea\s+kawaida|imerudi\s+kawaida)/i.test(probe) ||
    /(reversible\s+obstruction|asthma\s+pattern|fev1\/fvc\s+normal|ratio\s+is\s+normal|normal\s+spirometry|spirometry\s+ya\s+kawaida)/i.test(probe);

  // ── Apply context ──────────────────────────────────────────────────
  let ctx: string;
  if (ratio !== undefined) {
    ctx = ratio < 0.7 ? 'post_bronchodilator_obstructed' : 'post_bronchodilator_normal';
  } else if (explicitObstructed) {
    ctx = 'post_bronchodilator_obstructed';
  } else if (explicitNormal) {
    ctx = 'post_bronchodilator_normal';
  } else {
    ctx = 'unknown';
  }

  spiroEntities.forEach((e) => (e.qualitativeContext = ctx));
}

export function parseQuery(raw: string, preferredLanguage?: Language): ParsedQuery {
  const normalized = normalize(raw);
  const detectedLanguage = preferredLanguage ?? detectLanguage(normalized);

  // Order matters: numbers/units first (specific), then known entities, then substances
  const numberEntities = extractNumbers(normalized, new Map());
  const knownEntities = extractKnownEntities(normalized);
  const substanceEntities = extractSubstances(normalized);

  // Merge — knownEntities can refine numberEntities (e.g. "creatinine 245")
  // If a number was found but its labId is unknown, and a known lab entity exists, link them.
  const entities: ExtractedEntity[] = [...knownEntities, ...substanceEntities];

  for (const num of numberEntities) {
    if (num.id === 'unknown_lab') {
      const labMatch = knownEntities.find((e) => e.type === 'lab');
      if (labMatch) {
        num.id = labMatch.id;
        num.confidence = Math.min(num.confidence, labMatch.confidence);
      }
    }
    // Avoid duplicating the lab entity if we already had it
    if (!entities.some((e) => e.type === 'lab' && e.id === num.id && e.value !== undefined)) {
      entities.push(num);
    }
  }

  // ── Qualitative lab annotation (mRDT + GeneXpert: result + clinical context) ──
  attachQualitativeMrdtResult(entities, normalized);
  attachQualitativeGenexpertResult(entities, normalized);

  // ── HIV numeric lab context (CD4 + Viral Load: clinical context only) ──
  attachHivLabContext(entities, normalized);

  // ── CKD numeric lab context (Creatinine + eGFR: clinical context only) ──
  attachCkdLabContext(entities, normalized);

  // ── Urine protein qualitative result + context (Phase 7 maternal) ──
  attachQualitativeUrineProteinResult(entities, normalized, raw);

  // ── Pneumonia numeric lab context (Phase 8: SpO2 + respiratory_rate) ──
  attachPneumoniaLabContext(entities, normalized);

  // ── Asthma numeric lab context (Phase 9: peak flow personal-best) ──
  attachAsthmaLabContext(entities, normalized, raw);

  // ── COPD numeric lab context (Phase 10: spirometry FEV1/FVC ratio) ──
  attachCopdLabContext(entities, normalized, raw);

  const intent = classifyIntent(normalized, entities);

  // Overall confidence = average of entity confidences, weighted
  const confidence = entities.length === 0
    ? 0
    : entities.reduce((s, e) => s + e.confidence, 0) / entities.length;

  return {
    raw,
    normalized,
    detectedLanguage,
    intent,
    entities,
    confidence,
  };
}
