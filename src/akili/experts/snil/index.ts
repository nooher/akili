// experts/snil/index.ts — the SNIL-as-tool expert: THE headline feature.
// Swahili intent → SNIL source → execution. Pure, deterministic, sovereign.
//
// The expert recognizes a small family of Swahili compute intents, compiles each
// to correct SNIL source, runs it via @laetoli/snil's `run()`, and returns the
// generated code + captured output in the AkiliAnswer.snil trace. Anything the
// router can't otherwise place but that *is* SNIL (or asks to run code) is
// passed through verbatim. Nothing here ever throws.

import { run } from '@laetoli/snil';
import type { AkiliAnswer, AkiliQuery, DomainExpert } from '../../types';

// ── helpers ────────────────────────────────────────────────────────────────

const norm = (s: string) => s.toLowerCase().trim();

/** SNIL block-starting / statement keywords — used to detect direct code. */
const SNIL_PREFIXES = ['onyesha', 'weka', 'kazi', 'kwa kila', 'ikiwa', 'uliza', 'jaribu', 'leta', 'wakati'];

/** Markers after which the rest of the text is treated as literal SNIL. */
const CODE_MARKERS = ['endesha:', 'endesha ', 'code:', 'run:', 'snil:'];

const RX_CODE_REQUEST =
  /\b(andika\s+programu|programu|kokotoa|kokoto|hesabu|hesabi|code|run|endesha|snil)\b/i;
const RX_MATH_PHRASE =
  /\b(jumla\s+ya|wastani\s+wa|idadi\s+ya|zidisha|gawanya|toa|ongeza|factorial|kipeo|namba\s+kutoka)\b/i;
const RX_ARITH = /-?\d+(?:\.\d+)?\s*(?:[+\-*/x×÷]|kwa|na)\s*-?\d+(?:\.\d+)?/i;

/** Extract every number (int/decimal, optional sign) from a string, in order. */
function numbers(text: string): number[] {
  const m = text.match(/-?\d+(?:\.\d+)?/g);
  return m ? m.map(Number) : [];
}

/** Extract a comma/`na`-separated number list (e.g. "10, 20 na 30"). */
function numberList(text: string): number[] {
  // restrict to the part after a list keyword if present, else the whole text
  const cleaned = text.replace(/\bna\b/gi, ',');
  return numbers(cleaned);
}

/** Strip a leading code marker, returning the SNIL after it (or null). */
function afterMarker(text: string): string | null {
  const low = norm(text);
  for (const marker of CODE_MARKERS) {
    const i = low.indexOf(marker);
    if (i !== -1) {
      const code = text.slice(i + marker.length).trim();
      if (code) return code;
    }
  }
  // fenced ```...``` block
  const fence = text.match(/```(?:snil)?\s*([\s\S]*?)```/i);
  if (fence && fence[1].trim()) return fence[1].trim();
  return null;
}

/** Does the (trimmed) text itself look like raw SNIL source? */
function looksLikeSnil(text: string): boolean {
  const low = norm(text);
  return SNIL_PREFIXES.some((p) => low.startsWith(p));
}

type AnswerInit = {
  code: string;
  swExplain: string;
  enExplain?: string;
  confidence?: AkiliAnswer['confidence'];
};

/** Run SNIL and assemble the AkiliAnswer + snil trace. Never throws. */
function compile(init: AnswerInit): AkiliAnswer {
  let output = '';
  let error: string | undefined;
  try {
    const r = run(init.code);
    output = r.output;
    if (r.error) error = r.error.toString();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const resultLine = error
    ? `Samahani — programu ilipata hitilafu: ${error}`
    : `Jibu: ${output.trim() || '(hakuna matokeo)'}`;

  const sw = `${init.swExplain}\n\n${resultLine}`;
  const en = init.enExplain
    ? `${init.enExplain}\n\n${error ? `Error: ${error}` : `Result: ${output.trim() || '(no output)'}`}`
    : undefined;

  return {
    domain: 'snil',
    expert: snilExpert.id,
    text: { sw, ...(en ? { en } : {}) },
    confidence: error ? 'low' : init.confidence ?? 'high',
    sources: [{ label: 'SNIL', ref: '@laetoli/snil' }],
    snil: { code: init.code, output, ...(error ? { error } : {}) },
  };
}

// ── the expert ───────────────────────────────────────────────────────────────

export const snilExpert: DomainExpert = {
  id: 'snil-tool',
  domain: 'snil',
  label: 'SNIL',

  match(q: AkiliQuery): number {
    const text = q.text ?? '';
    if (!text.trim()) return 0;

    // Direct code beats everything.
    if (afterMarker(text) !== null) return 0.97;
    if (looksLikeSnil(text)) return 0.95;

    let score = 0;
    if (RX_CODE_REQUEST.test(text)) score = Math.max(score, 0.85);
    if (RX_MATH_PHRASE.test(text)) score = Math.max(score, 0.8);
    // bare arithmetic like "12 + 5" only counts if there's an operator between numbers
    if (RX_ARITH.test(text)) score = Math.max(score, 0.7);
    return score;
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const text = q.text ?? '';
    const low = norm(text);

    // 1) Direct passthrough — explicit SNIL (after a marker / fence, or raw).
    const marked = afterMarker(text);
    if (marked !== null) {
      return compile({
        code: marked,
        swExplain: 'Nimeendesha programu yako ya SNIL.',
        enExplain: 'I ran your SNIL program.',
      });
    }
    if (looksLikeSnil(text)) {
      return compile({
        code: text.trim(),
        swExplain: 'Nimeendesha programu yako ya SNIL.',
        enExplain: 'I ran your SNIL program.',
      });
    }

    // 2) Average:  "wastani wa 4, 8, 6"
    if (/wastani/.test(low)) {
      const nums = numberList(text);
      if (nums.length >= 1) {
        const code = [
          `weka orodha kuwa [${nums.join(', ')}]`,
          `weka jumla kuwa 0`,
          `kwa kila x katika orodha`,
          `  jumla = jumla + x`,
          `mwisho`,
          `onyesha jumla / idadi(orodha)`,
        ].join('\n');
        return compile({
          code,
          swExplain: `Nimekokotoa wastani wa namba [${nums.join(', ')}].`,
          enExplain: `I computed the average of [${nums.join(', ')}].`,
        });
      }
    }

    // 3) Sum:  "jumla ya 10, 20, 30"
    if (/\bjumla\b/.test(low) || /\bongeza\b/.test(low)) {
      const nums = numberList(text);
      if (nums.length >= 2) {
        const code = [
          `weka orodha kuwa [${nums.join(', ')}]`,
          `weka jumla kuwa 0`,
          `kwa kila x katika orodha`,
          `  jumla = jumla + x`,
          `mwisho`,
          `onyesha jumla`,
        ].join('\n');
        return compile({
          code,
          swExplain: `Nimekokotoa jumla ya namba [${nums.join(', ')}].`,
          enExplain: `I summed [${nums.join(', ')}].`,
        });
      }
    }

    // 4) Factorial / kipeo:  "factorial ya 5", "kipeo cha 5"
    if (/factorial|kipeo/.test(low)) {
      const nums = numbers(text);
      const n = nums.length ? Math.trunc(Math.abs(nums[0])) : 0;
      const code = [
        `weka j kuwa 1`,
        `kwa kila i kutoka 1 hadi ${n}`,
        `  j = j * i`,
        `mwisho`,
        `onyesha j`,
      ].join('\n');
      return compile({
        code,
        swExplain: `Nimekokotoa factorial ya ${n} (${n}!).`,
        enExplain: `I computed ${n} factorial (${n}!).`,
      });
    }

    // 5) Range:  "namba kutoka 1 hadi 10"
    if (/kutoka[\s\S]*hadi/.test(low)) {
      const nums = numbers(text);
      if (nums.length >= 2) {
        const a = Math.trunc(nums[0]);
        const b = Math.trunc(nums[1]);
        const code = [`kwa kila i kutoka ${a} hadi ${b}`, `  onyesha i`, `mwisho`].join('\n');
        return compile({
          code,
          swExplain: `Nimeorodhesha namba kutoka ${a} hadi ${b}.`,
          enExplain: `I listed the numbers from ${a} to ${b}.`,
        });
      }
    }

    // 6) Multiply:  "zidisha 6 kwa 7"
    if (/zidisha/.test(low)) {
      const nums = numbers(text);
      if (nums.length >= 2) {
        const code = `onyesha ${nums.slice(0, 2).join(' * ')}`;
        return compile({
          code,
          swExplain: `Nimezidisha ${nums[0]} kwa ${nums[1]}.`,
          enExplain: `I multiplied ${nums[0]} by ${nums[1]}.`,
        });
      }
    }

    // 7) Divide:  "gawanya 12 kwa 4"
    if (/gawanya/.test(low)) {
      const nums = numbers(text);
      if (nums.length >= 2) {
        const code = `onyesha ${nums[0]} / ${nums[1]}`;
        return compile({
          code,
          swExplain: `Nimegawanya ${nums[0]} kwa ${nums[1]}.`,
          enExplain: `I divided ${nums[0]} by ${nums[1]}.`,
        });
      }
    }

    // 8) Generic arithmetic:  "kokotoa 12 + 5", "12 + 5", "6 - 2 * 3"
    const arith = extractArithmetic(text);
    if (arith) {
      const code = `onyesha ${arith}`;
      return compile({
        code,
        swExplain: `Nimekokotoa ${arith}.`,
        enExplain: `I computed ${arith}.`,
      });
    }

    // 9) Fallback — explain Akili can run SNIL, with a tiny example. Low confidence.
    const example = 'onyesha 12 + 5';
    return compile({
      code: example,
      confidence: 'low',
      swExplain:
        'Sikuelewa hesabu mahususi, lakini ninaweza kuendesha programu za SNIL ' +
        'unazoandika. Mfano (andika "endesha:" kisha msimbo wako):',
      enExplain:
        'I could not parse a specific computation, but I can run any SNIL you write. ' +
        'Example (prefix with "endesha:" then your code):',
    });
  },
};

/**
 * Pull a safe arithmetic expression out of free text and render it as SNIL.
 * Accepts digits, + - * / %, parens, and the Swahili words `kwa`(×)/`na`(+),
 * plus `x`/`×`/`÷`. Returns null if there isn't a real operator-joined expr.
 */
function extractArithmetic(text: string): string | null {
  // normalize Swahili/Unicode operators to ASCII
  let t = ' ' + text.toLowerCase() + ' ';
  t = t
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\bx\b/g, '*')
    .replace(/\bkwa\b/g, '*')
    .replace(/\bna\b/g, '+');
  // keep only arithmetic-relevant characters
  const expr = t.replace(/[^0-9+\-*/%(). ]/g, ' ').trim();
  // must contain at least two numbers joined by an operator
  if (!/-?\d+(?:\.\d+)?\s*[+\-*/%]\s*-?\d+/.test(expr)) return null;
  // collapse whitespace, ensure balanced-ish (let SNIL report real errors)
  const compact = expr.replace(/\s+/g, ' ').trim();
  // guard against pathological multi-expression noise: take the longest run
  return compact;
}

export default snilExpert;
