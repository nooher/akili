// morph.ts — Kasuku's Swahili morphology engine.
//
// This is the heart of "our own AI": a rule-based system that GENERATES and
// explains Swahili word-forms. No model, no API — Swahili's agglutinative verb
// and its noun-class agreement are regular enough to encode directly. Used to
// build conjugation tables for lessons and (later) to check learner sentences.

export type Person = '1sg' | '2sg' | '3sg' | '1pl' | '2pl' | '3pl';
export type Tense = 'present' | 'past' | 'future' | 'perfect' | 'habitual';

/** Subject-agreement prefixes for persons (m-/wa- class, i.e. people). */
const SUBJ: Record<Person, string> = {
  '1sg': 'ni', '2sg': 'u', '3sg': 'a',
  '1pl': 'tu', '2pl': 'm', '3pl': 'wa',
};

/** Tense / aspect markers that sit between subject and root. */
const TENSE: Record<Tense, string> = {
  present: 'na', past: 'li', future: 'ta', perfect: 'me', habitual: 'hu',
};

const TENSE_LABEL: Record<Tense, [string, string]> = {
  present: ['wa sasa', 'present'],
  past: ['uliopita', 'past'],
  future: ['ujao', 'future'],
  perfect: ['timilifu', 'perfect'],
  habitual: ['wa mazoea', 'habitual'],
};

export interface ConjOpts {
  person: Person;
  tense: Tense;
  negative?: boolean;
}

/** Negative subject concord (hu-/ha- series): "si-", "hu-", "ha-", "hatu-"… */
const NEG_SUBJ: Record<Person, string> = {
  '1sg': 'si', '2sg': 'hu', '3sg': 'ha',
  '1pl': 'hatu', '2pl': 'ham', '3pl': 'hawa',
};

/**
 * Conjugate a Swahili verb root for person + tense.
 * `root` is the bare stem WITHOUT the infinitive "ku-" (e.g. "soma", "enda").
 * Handles the main regular pattern; negation follows the standard concord
 * (present → final -a becomes -i; past "li"→"ku"; perfect "me"→"ja").
 */
export function conjugate(root: string, opts: ConjOpts): string {
  const { person, tense, negative } = opts;
  if (!negative) {
    return `${SUBJ[person]}${TENSE[tense]}${root}`;
  }
  // Negative forms diverge by tense.
  const neg = NEG_SUBJ[person];
  switch (tense) {
    case 'present':
    case 'habitual': {
      // si-somi, hu-somi … (final -a → -i for Bantu verbs ending in -a)
      const stem = root.endsWith('a') ? root.slice(0, -1) + 'i' : root;
      return `${neg}${stem}`;
    }
    case 'past':
      return `${neg}ku${root}`;      // sikusoma
    case 'perfect':
      return `${neg}ja${root}`;      // sijasoma
    case 'future':
      return `${neg}ta${root}`;      // sitasoma
  }
}

export interface ConjRow { person: Person; sw: string; form: string; pronoun: string; }

const PRONOUN: Record<Person, string> = {
  '1sg': 'mimi', '2sg': 'wewe', '3sg': 'yeye',
  '1pl': 'sisi', '2pl': 'ninyi', '3pl': 'wao',
};
const PERSON_LABEL: Record<Person, [string, string]> = {
  '1sg': ['mimi', 'I'], '2sg': ['wewe', 'you'], '3sg': ['yeye', 'he/she'],
  '1pl': ['sisi', 'we'], '2pl': ['ninyi', 'you (pl)'], '3pl': ['wao', 'they'],
};

const ORDER: Person[] = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];

/** Full person paradigm for a verb in one tense — used to render teaching tables. */
export function paradigm(root: string, tense: Tense, negative = false): ConjRow[] {
  return ORDER.map((person) => ({
    person,
    pronoun: PRONOUN[person],
    sw: PERSON_LABEL[person][0],
    form: conjugate(root, { person, tense, negative }),
  }));
}

export function tenseLabel(tense: Tense, en: boolean): string {
  return TENSE_LABEL[tense][en ? 1 : 0];
}
export function personLabel(person: Person, en: boolean): string {
  return PERSON_LABEL[person][en ? 1 : 0];
}

// ── Noun classes (ngeli) — the other pillar of Swahili agreement ──────────────
export interface NounClass { cls: number; sg: string; pl?: number; example: string; meaning: [string, string]; }

/** The everyday noun classes a beginner meets first. */
export const NOUN_CLASSES: NounClass[] = [
  { cls: 1, sg: 'm-', pl: 2, example: 'mtu', meaning: ['mtu', 'person'] },
  { cls: 2, sg: 'wa-', example: 'watu', meaning: ['watu', 'people'] },
  { cls: 3, sg: 'm-', pl: 4, example: 'mti', meaning: ['mti', 'tree'] },
  { cls: 4, sg: 'mi-', example: 'miti', meaning: ['miti', 'trees'] },
  { cls: 5, sg: 'ji-/Ø', pl: 6, example: 'jicho', meaning: ['jicho', 'eye'] },
  { cls: 6, sg: 'ma-', example: 'macho', meaning: ['macho', 'eyes'] },
  { cls: 7, sg: 'ki-', pl: 8, example: 'kitabu', meaning: ['kitabu', 'book'] },
  { cls: 8, sg: 'vi-', example: 'vitabu', meaning: ['vitabu', 'books'] },
];
