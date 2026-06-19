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

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliQuery,
  AkiliSource,
  DomainExpert,
} from '../../types';
import { askTibaAI } from './engine/engine';
import type {
  AnswerSection,
  BilingualWithRegister,
  PatientContext,
  SourceCitation,
  TibaAnswer,
  UrgencyLevel,
} from './engine/types';

// ──────────────────────────────────────────────────────────────────────
// HEALTH-MATCHING CUES
// ──────────────────────────────────────────────────────────────────────

/**
 * Swahili + English health cues. A query containing any of these is almost
 * certainly clinical; we score it highly without paying for a TibaAI probe.
 * Word-boundary matched so "afya" doesn't fire inside an unrelated token.
 */
const HEALTH_CUES: string[] = [
  // Swahili — care & system
  'daktari', 'dakitari', 'mganga', 'hospitali', 'zahanati', 'kliniki',
  'muuguzi', 'nesi', 'afya', 'matibabu', 'tiba', 'kipimo', 'vipimo',
  'chanjo', 'dawa', 'kidonge', 'sindano', 'damu', 'uchunguzi',
  // Swahili — illness & symptoms
  'ugonjwa', 'magonjwa', 'maradhi', 'dalili', 'maumivu', 'umwa', 'inauma',
  'homa', 'kikohozi', 'kuhara', 'kutapika', 'kichefuchefu', 'kizunguzungu',
  'mafua', 'jeraha', 'kidonda', 'uvimbe', 'kuvimba',
  // Swahili — named conditions
  'malaria', 'homa ya matumbo', 'kifua kikuu', 'kaswende', 'kisonono',
  'presha', 'shinikizo', 'sukari', 'kisukari', 'ukimwi', 'virusi',
  'pumu', 'kifafa', 'saratani', 'figo', 'moyo', 'ini', 'mapafu',
  // Swahili — maternal/child
  'mimba', 'mjamzito', 'uzazi', 'mtoto', 'mtoto mchanga', 'kunyonyesha',
  // English — care & system
  'doctor', 'nurse', 'hospital', 'clinic', 'pharmacy', 'health',
  'medicine', 'medication', 'drug', 'dose', 'dosage', 'vaccine',
  'treatment', 'diagnosis', 'lab', 'test result', 'prescription',
  // English — illness & symptoms
  'disease', 'illness', 'symptom', 'symptoms', 'pain', 'fever', 'cough',
  'vomit', 'diarrhoea', 'diarrhea', 'rash', 'swelling', 'bleeding',
  'infection', 'wound', 'injury',
  // English — named conditions
  'malaria', 'tuberculosis', 'hypertension', 'blood pressure', 'diabetes',
  'sugar', 'hiv', 'aids', 'asthma', 'epilepsy', 'cancer', 'stroke',
  'pneumonia', 'kidney', 'heart', 'liver', 'anaemia', 'anemia',
  // English — maternal/child
  'pregnant', 'pregnancy', 'maternal', 'newborn', 'breastfeed',
];

/**
 * Emergency cues — when present, the query is unambiguously clinical AND
 * time-critical, so we floor the score at the top. We never want the router
 * to miss "kifua kinauma na natoka jasho" / "chest pain and sweating".
 */
const EMERGENCY_CUES: string[] = [
  'dharura', 'emergency', 'kifua kinauma', 'chest pain', 'degedege',
  'kifafa cha mimba', 'sina pumzi', "can't breathe", 'cannot breathe',
  'kupoteza fahamu', 'unconscious', 'kuzimia', 'damu nyingi',
  'heavy bleeding', 'kiharusi', 'stroke',
];

function lc(text: string): string {
  return text.normalize('NFC').toLowerCase();
}

/** Count distinct cue phrases present, with word-ish boundaries for short cues. */
function cueHits(haystack: string, cues: string[]): number {
  let hits = 0;
  for (const cue of cues) {
    if (cue.includes(' ')) {
      if (haystack.includes(cue)) hits += 1;
    } else {
      // boundary match for single tokens to avoid substring false-positives
      const re = new RegExp(`(^|[^a-z])${escapeRe(cue)}([^a-z]|$)`);
      if (re.test(haystack)) hits += 1;
    }
  }
  return hits;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ──────────────────────────────────────────────────────────────────────
// MAPPING HELPERS
// ──────────────────────────────────────────────────────────────────────

const URGENCY_BADGE_SW: Record<UrgencyLevel, string> = {
  info: 'Taarifa',
  routine: 'Mwone daktari kwa utaratibu wa kawaida',
  soon: 'Mwone daktari hivi karibuni (siku chache)',
  urgent: 'HARAKA — mwone daktari ndani ya saa 24',
  emergency: 'DHARURA — nenda hospitali / piga 114 SASA',
};

const URGENCY_BADGE_EN: Record<UrgencyLevel, string> = {
  info: 'Information',
  routine: 'See your doctor at your next routine visit',
  soon: 'See a doctor soon (within days)',
  urgent: 'URGENT — see a doctor within 24 hours',
  emergency: 'EMERGENCY — go to hospital / call 114 NOW',
};

const DISCLAIMER_SW: Record<TibaAnswer['disclaimer'], string> = {
  standard:
    'Maelezo haya ni kwa elimu tu; si uchunguzi wa daktari. Wasiliana na mtoa huduma za afya kwa ushauri binafsi.',
  strong:
    'Maelezo haya ni kwa elimu tu na hayachukui nafasi ya daktari. Tafadhali muone mtaalamu wa afya haraka kwa hali yako.',
  emergency:
    'Hii inaweza kuwa dharura. Maelezo haya si uchunguzi — tafuta huduma ya dharura mara moja (hospitali / 114).',
};

const DISCLAIMER_EN: Record<TibaAnswer['disclaimer'], string> = {
  standard:
    'This is for education only, not a medical diagnosis. Contact a health worker for personal advice.',
  strong:
    'This is for education only and does not replace a doctor. Please see a health professional promptly about your situation.',
  emergency:
    'This may be an emergency. This is not a diagnosis — seek emergency care immediately (hospital / 114).',
};

const CONFIDENCE_MAP: Record<TibaAnswer['matchConfidence'], AkiliConfidence> = {
  high: 'high',
  medium: 'medium',
  low: 'low',
};

function reg(b: BilingualWithRegister | undefined, lang: 'sw' | 'en'): string {
  if (!b) return '';
  if (lang === 'en') return b.en ?? b.sw ?? '';
  return b.sw ?? b.en ?? '';
}

/** Render the answer sections into readable, scannable text for one language. */
function renderSections(sections: AnswerSection[], lang: 'sw' | 'en'): string {
  return sections
    .map((s) => {
      const heading = lang === 'en' ? s.heading.en : s.heading.sw;
      const body = reg(s.body, lang);
      return heading ? `${heading.trim()}\n${body.trim()}` : body.trim();
    })
    .filter(Boolean)
    .join('\n\n');
}

function renderRedFlags(
  flags: BilingualWithRegister[] | undefined,
  lang: 'sw' | 'en',
): string {
  if (!flags || flags.length === 0) return '';
  const title = lang === 'en' ? 'Warning signs' : 'Dalili za hatari';
  const bullets = flags
    .map((f) => `⚠ ${reg(f, lang).trim()}`)
    .filter((l) => l.length > 1);
  if (bullets.length === 0) return '';
  return `${title}:\n${bullets.join('\n')}`;
}

/** Compose one full-language answer body, urgency-first, disclaimer last. */
function composeText(ans: TibaAnswer, lang: 'sw' | 'en'): string {
  const parts: string[] = [];

  const level = ans.urgency.level;
  // Lead with the urgency band for anything beyond pure info so emergency
  // framing is never buried below educational prose.
  if (level === 'urgent' || level === 'emergency') {
    parts.push(lang === 'en' ? URGENCY_BADGE_EN[level] : URGENCY_BADGE_SW[level]);
  }

  const headline = lang === 'en' ? ans.headline.en : reg(ans.headline, 'sw');
  if (headline) parts.push(headline.trim());

  const sections = renderSections(ans.sections, lang);
  if (sections) parts.push(sections);

  const redFlags = renderRedFlags(ans.redFlags, lang);
  if (redFlags) parts.push(redFlags);

  // For non-leading urgency, still surface the recommended action band.
  if (level === 'soon' || level === 'routine') {
    parts.push(lang === 'en' ? URGENCY_BADGE_EN[level] : URGENCY_BADGE_SW[level]);
  }

  parts.push(lang === 'en' ? DISCLAIMER_EN[ans.disclaimer] : DISCLAIMER_SW[ans.disclaimer]);

  return parts.join('\n\n').trim();
}

function mapSources(sources: SourceCitation[]): AkiliSource[] {
  const seen = new Set<string>();
  const out: AkiliSource[] = [];
  for (const s of sources) {
    const label = s.org;
    const refParts = [s.title, s.section, String(s.year)].filter(Boolean);
    const ref = [refParts.join(' — '), s.url].filter(Boolean).join(' · ');
    const key = `${label}|${ref}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(ref ? { label, ref } : { label });
  }
  return out;
}

function patientFrom(q: AkiliQuery): PatientContext | undefined {
  const p = q.context?.patient;
  return p && typeof p === 'object' ? (p as PatientContext) : undefined;
}

// ──────────────────────────────────────────────────────────────────────
// THE EXPERT
// ──────────────────────────────────────────────────────────────────────

export const afyaExpert: DomainExpert = {
  id: 'afya-tibaai',
  domain: 'afya',
  label: 'Afya',

  match(q: AkiliQuery): number {
    const text = lc(q.text ?? '');
    if (!text.trim()) return 0;

    // Emergency cues → always route here, at the top.
    if (cueHits(text, EMERGENCY_CUES) > 0) return 0.97;

    const hits = cueHits(text, HEALTH_CUES);
    if (hits >= 2) return 0.92;
    if (hits === 1) return 0.78;

    // No keyword signal — for short/ambiguous text, ask the sovereign engine
    // once and map its own confidence. Keep it cheap: only probe text that is
    // plausibly a question (not, say, a single unrelated word).
    if (text.length < 4) return 0;
    const probe = askTibaAI(q.text, { language: q.lang === 'en' ? 'en' : 'sw' });
    if (probe.resolution === 'no_match') return 0.05;
    switch (probe.matchConfidence) {
      case 'high':
        return 0.9;
      case 'medium':
        return 0.6;
      case 'low':
      default:
        return 0.2;
    }
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const ans: TibaAnswer = askTibaAI(q.text, {
      language: q.lang === 'en' ? 'en' : 'sw',
      patientContext: patientFrom(q),
    });

    const sw = composeText(ans, 'sw');
    const en = composeText(ans, 'en');

    return {
      domain: 'afya',
      expert: 'afya-tibaai',
      text: { sw, en },
      confidence: CONFIDENCE_MAP[ans.matchConfidence],
      sources: mapSources(ans.sources),
      data: ans,
    };
  },
};

export default afyaExpert;
