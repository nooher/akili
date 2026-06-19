/**
 * TibaAI — Type Constitution
 * Every content piece, every query, every answer obeys these contracts.
 *
 * Philosophy:
 * - We educate, we do not diagnose.
 * - Every fact has a source.
 * - Every answer respects the patient's language, literacy, and dignity.
 */

// ──────────────────────────────────────────────────────────────────────
// LANGUAGE
// ──────────────────────────────────────────────────────────────────────

export type Language = 'en' | 'sw';

/** Bilingual text — always paired, never lonely. */
export interface Bilingual {
  en: string;
  sw: string;
}

/** Bilingual with optional "street" register for casual Swahili. */
export interface BilingualWithRegister {
  en: string;
  sw: string;
  sw_mtaa?: string; // colloquial / lugha ya mtaani
}

// ──────────────────────────────────────────────────────────────────────
// SOURCES — every fact is cited.
// ──────────────────────────────────────────────────────────────────────

export type SourceOrg =
  | 'WHO'
  | 'NTLG'           // Tanzania National Treatment Guidelines
  | 'MoH-TZ'         // Tanzania Ministry of Health
  | 'NACP'           // National AIDS Control Programme (TZ)
  | 'NTLP'           // National TB & Leprosy Programme (TZ)
  | 'NMCP'           // National Malaria Control Programme (TZ)
  | 'Muhimbili'      // MNH protocols
  | 'AHA'            // American Heart Association (when MoH cites)
  | 'ADA'            // American Diabetes Association (when MoH cites)
  | 'ISH'            // International Society of Hypertension
  | 'KDIGO'          // Kidney guidelines
  | 'IDF'            // International Diabetes Federation
  | 'BNF'            // British National Formulary
  | 'EMC'            // Electronic Medicines Compendium
  | 'Cochrane'
  | 'IMCI'           // Integrated Management of Childhood Illness
  | 'FIGO'           // International Federation of Gynecology
  | 'GOLD'           // Global Initiative for Chronic Obstructive Lung Disease
  | 'ESC'            // European Society of Cardiology
  | 'ASA'            // American Stroke Association
  | 'mhGAP'          // WHO mhGAP Intervention Guide
  | 'NORTAB'         // Tanzania Sickle Cell programme / Muhimbili haematology
  | 'UpToDate-aligned';

export interface SourceCitation {
  org: SourceOrg;
  title: string;          // e.g. "STG & NEMLIT 2023"
  section?: string;       // e.g. "Section 4.2: Hypertension"
  year: number;
  url?: string;           // for app's "Learn more" link
}

// ──────────────────────────────────────────────────────────────────────
// GOVERNANCE — every piece of content has a clinical review trail.
// ──────────────────────────────────────────────────────────────────────

export type ReviewStatus = 'draft' | 'review_pending' | 'approved' | 'retired';

export interface ContentGovernance {
  status: ReviewStatus;
  draftedBy: 'TibaAI-engine' | string;
  reviewedBy?: string;       // e.g. "Dr. [Name], MD"
  reviewedDate?: string;     // ISO
  contentVersion: string;    // e.g. "1.0.0"
  lastReviewed?: string;     // ISO
  nextReviewDue?: string;    // ISO (annual)
}

// ──────────────────────────────────────────────────────────────────────
// URGENCY — educational urgency, not diagnostic.
// "Hii inahitaji daktari haraka" ≠ "Una X disease".
// ──────────────────────────────────────────────────────────────────────

export type UrgencyLevel =
  | 'info'        // pure education
  | 'routine'    // see your doctor at next visit
  | 'soon'       // within days
  | 'urgent'     // within 24 hours
  | 'emergency'; // now — 114 / hospitali

export interface UrgencyFlag {
  level: UrgencyLevel;
  reason: Bilingual;
  action: Bilingual;
}

// ──────────────────────────────────────────────────────────────────────
// NLU — what the engine extracts from a user query.
// ──────────────────────────────────────────────────────────────────────

export type QueryIntent =
  | 'explain_lab'         // "creatinine yangu 245"
  | 'explain_condition'   // "hypertension ni nini"
  | 'explain_drug'        // "metformin inafanya nini"
  | 'drug_interaction'    // "pombe na metformin?"
  | 'symptom_education'   // "kichwa kinauma siku 3"
  | 'lifestyle_question'  // "naweza kula nyama nikiwa na BP?"
  | 'general_education'   // open question
  | 'unknown';

export interface ExtractedEntity {
  type: 'condition' | 'drug' | 'lab' | 'symptom' | 'substance' | 'number_with_unit';
  id: string;            // canonical id, e.g. 'hypertension'
  surfaceForm: string;   // what the user actually typed
  confidence: number;    // 0..1
  value?: number;        // for numeric lab values
  value2?: number;       // for BP (diastolic)
  unit?: string;
  /**
   * For qualitative lab results:
   *   mRDT          → 'positive' | 'negative' | 'invalid'
   *   GeneXpert     → 'mtb_detected_rif_sensitive' | 'mtb_detected_rif_resistant'
   *                   | 'mtb_detected_rif_indeterminate' | 'mtb_not_detected' | 'invalid'
   *   Urine protein → 'negative' | 'trace' | 'one_plus' | 'two_plus'
   *                   | 'three_plus' | 'four_plus'
   * Each qualitative lab's interpreter narrows this to its own union.
   */
  qualitativeResult?:
    | 'positive'
    | 'negative'
    | 'invalid'
    | 'mtb_detected_rif_sensitive'
    | 'mtb_detected_rif_resistant'
    | 'mtb_detected_rif_indeterminate'
    | 'mtb_not_detected'
    | 'trace'
    | 'one_plus'
    | 'two_plus'
    | 'three_plus'
    | 'four_plus';
  /** For qualitative labs: clinical context detected from the query. */
  qualitativeContext?: string;
}

export interface ParsedQuery {
  raw: string;
  normalized: string;
  detectedLanguage: Language;
  intent: QueryIntent;
  entities: ExtractedEntity[];
  confidence: number;
}

// ──────────────────────────────────────────────────────────────────────
// ANSWER — the molecular structure of every reply.
// ──────────────────────────────────────────────────────────────────────

export interface AnswerSection {
  heading: Bilingual;
  body: BilingualWithRegister;
}

export interface TibaAnswer {
  /** Unique id for audit log. */
  id: string;
  /** Timestamp ISO. */
  timestamp: string;
  /** Echo of the original query, normalized. */
  query: ParsedQuery;

  /** Urgency assessment — drives UI color & layout. */
  urgency: UrgencyFlag;

  /** Headline answer — one sentence, plain. */
  headline: BilingualWithRegister;

  /** Sections — what it means, what helps, when to worry, etc. */
  sections: AnswerSection[];

  /** Red flags to watch for at home — bulleted, scannable. */
  redFlags?: BilingualWithRegister[];

  /** Follow-up questions the engine can offer. */
  followUps?: Bilingual[];

  /** Every claim's evidence base. */
  sources: SourceCitation[];

  /** Confidence in the match between query and knowledge. */
  matchConfidence: 'high' | 'medium' | 'low';

  /** Did we find a clean answer, or are we redirecting? */
  resolution: 'answered' | 'partial' | 'redirected' | 'no_match';

  /** Standard disclaimer level — UI renders accordingly. */
  disclaimer: 'standard' | 'strong' | 'emergency';
}

// ──────────────────────────────────────────────────────────────────────
// KNOWLEDGE CONTENT TYPES
// ──────────────────────────────────────────────────────────────────────

/** Names a thing can be called — every surface form a patient might use. */
export interface Aliases {
  canonical_en: string;
  canonical_sw: string;
  en: string[];           // english variants & abbreviations
  sw: string[];           // formal swahili
  sw_mtaa: string[];      // street swahili / colloquial
  slang: string[];        // mixed/broken/typos seen in the wild
}

// ── Condition variants — severity & population dimensions ──────────────

/** Severity dimension — distinguishes presentation acuity. */
export type SeverityVariant =
  | 'uncomplicated'      // routine, outpatient management
  | 'severe'             // hospital-level care needed
  | 'complicated'        // organ involvement
  | 'critical'           // life-threatening, ICU territory
  | 'treatment_failure'  // recrudescence / reinfection / drug failure
  | 'prevention'         // prophylaxis, prevention, IPTp, IPTi
  | 'continuity';        // post-discharge follow-up, recovery phase

/** Population dimension — distinguishes patient context. */
export type PopulationVariant =
  | 'adult'
  | 'pediatric'
  | 'pregnancy'
  | 'postpartum'
  | 'elderly'
  | 'neonatal'
  | 'with_hiv'
  | 'with_diabetes'
  | 'with_ckd';

/** A specific presentation of a disease — e.g. "severe malaria in pregnancy". */
export interface ConditionVariant {
  id: string;                        // e.g. 'malaria_severe', 'malaria_pregnancy'
  severity: SeverityVariant;
  population?: PopulationVariant;

  /** Patient-language label for this variant. */
  label: Bilingual;

  /** How this presentation differs from the base. */
  presentation: BilingualWithRegister;

  /** Specific red flags / recognition signs for this variant. */
  recognitionSigns: BilingualWithRegister[];

  /** Treatment journey — what to expect (educational, not prescriptive). */
  treatmentJourney: BilingualWithRegister;

  /** Specific danger signs that require emergency action. */
  dangerSigns: Array<{
    sign: BilingualWithRegister;
    urgency: UrgencyLevel;
  }>;

  /** Continuity/follow-up specific to this variant. */
  followUp: BilingualWithRegister;

  /** Cited sources backing this variant's content. */
  sources: SourceCitation[];
}

// ── Condition ──────────────────────────────────────────────────────────
export interface ConditionKnowledge {
  id: string;
  aliases: Aliases;
  category:
    | 'cardiovascular'
    | 'metabolic'
    | 'renal'
    | 'infectious'
    | 'respiratory'
    | 'mental_health'
    | 'maternal'
    | 'pediatric'
    | 'gastrointestinal'
    | 'oncologic'
    | 'hematologic'
    | 'neurologic'
    | 'other';

  /** What it is — plain language. */
  whatItIs: BilingualWithRegister;

  /** Why it matters — consequences if unmanaged. */
  whyItMatters: BilingualWithRegister;

  /** Common patient questions about this condition. */
  commonQuestions: Array<{
    q: Bilingual;
    a: BilingualWithRegister;
  }>;

  /** Self-management essentials — lifestyle, monitoring, adherence. */
  selfManagement: BilingualWithRegister[];

  /** Things that worsen it — to avoid or moderate. */
  warningTriggers: BilingualWithRegister[];

  /** When to seek care — red flags specific to this condition. */
  whenToSeekCare: Array<{
    sign: BilingualWithRegister;
    urgency: UrgencyLevel;
  }>;

  /** Severity / population variants — populated for diseases that present
   *  very differently across acuity or population. */
  variants?: ConditionVariant[];

  /** Common comorbidities & co-management notes. */
  comorbidityNotes?: Array<{
    coCondition: string;        // canonical id
    note: BilingualWithRegister;
  }>;

  sources: SourceCitation[];
  governance: ContentGovernance;
}

// ── Drug ───────────────────────────────────────────────────────────────
export interface DrugKnowledge {
  id: string;
  aliases: Aliases;
  drugClass: Bilingual;       // e.g. "Biguanide" / "Kundi la biguanide"

  /** What it does — patient-language. */
  whatItDoes: BilingualWithRegister;

  /** Why a doctor prescribes it — common indications. */
  commonUses: BilingualWithRegister[];

  /** How it's taken — general patterns (NOT specific dosing). */
  howItIsTaken: BilingualWithRegister;

  /** Common side effects. */
  commonSideEffects: BilingualWithRegister[];

  /** Side effects that mean call the doctor / go to hospital. */
  seriousSideEffects: Array<{
    effect: BilingualWithRegister;
    urgency: UrgencyLevel;
  }>;

  /** Interactions — drugs, alcohol, food, conditions. */
  interactions: Array<{
    with: string;                          // e.g. 'alcohol', 'ibuprofen', 'pregnancy'
    withDisplay: Bilingual;                // human-readable
    severity: 'avoid' | 'caution' | 'note';
    explanation: BilingualWithRegister;
    sources: SourceCitation[];
  }>;

  /** Practical lifestyle questions: pombe, ramadhani, chakula, etc. */
  lifestyleNotes: Array<{
    topic: Bilingual;
    note: BilingualWithRegister;
  }>;

  sources: SourceCitation[];
  governance: ContentGovernance;
}

// ── Lab ────────────────────────────────────────────────────────────────
export interface LabRange {
  /** Demographic this range applies to. */
  applies: {
    sex?: 'M' | 'F' | 'any';
    ageMin?: number;
    ageMax?: number;
    pregnancy?: boolean;
  };
  /** Reference range — what's "normal". */
  normalLow?: number;
  normalHigh?: number;
  /** Critical thresholds — when to act. */
  criticalLow?: number;
  criticalHigh?: number;
}

export interface LabInterpretation {
  /** Where in the spectrum this falls. */
  band: 'critical_low' | 'low' | 'normal' | 'high' | 'critical_high';
  /** What this band means — patient language. */
  meaning: BilingualWithRegister;
  /** Suggested education + next steps (not prescription). */
  nextSteps: BilingualWithRegister;
  /** Urgency of action. */
  urgency: UrgencyLevel;
}

export interface LabKnowledge {
  id: string;
  aliases: Aliases;
  unit: string;
  alternateUnits?: Array<{ unit: string; factor: number }>;  // unit conversion

  /** What this test measures — plain. */
  whatItMeasures: BilingualWithRegister;

  /** Why a doctor orders it. */
  whyItsOrdered: BilingualWithRegister;

  /** Reference ranges — multiple, for different demographics. */
  ranges: LabRange[];

  /** Interpretation rules by band. */
  interpretations: LabInterpretation[];

  sources: SourceCitation[];
  governance: ContentGovernance;
}

// ── Red Flag (urgency rules) ───────────────────────────────────────────
export interface RedFlagRule {
  id: string;
  description: Bilingual;
  /** Pattern matchers — phrases or entity combinations. */
  triggers: {
    keywords?: string[];           // any of these in normalized query
    entityCombinations?: string[][]; // e.g. [['chest_pain', 'sweating']]
    labThresholds?: Array<{ labId: string; op: '>' | '<' | '>=' | '<='; value: number }>;
  };
  urgency: UrgencyLevel;
  message: BilingualWithRegister;
  action: BilingualWithRegister;
  sources: SourceCitation[];
}

// ──────────────────────────────────────────────────────────────────────
// AUDIT — every interaction logged on-device.
// ──────────────────────────────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  timestamp: string;
  queryRaw: string;
  answerId: string;
  contentVersion: string;
  language: Language;
}

// ──────────────────────────────────────────────────────────────────────
// PATIENT CONTEXT — optional personalization (from medical profile).
// ──────────────────────────────────────────────────────────────────────

export interface PatientContext {
  age?: number;
  sex?: 'M' | 'F';
  pregnancy?: boolean;
  breastfeeding?: boolean;
  conditions?: string[];      // canonical ids
  medications?: string[];     // canonical ids
  allergies?: string[];
}
