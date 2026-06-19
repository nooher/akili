/**
 * Reasoner — Query → Answer
 *
 * Receives a ParsedQuery and the knowledge base, decides which handler
 * to use, and returns a structured TibaAnswer.
 *
 * Each intent has its own resolver. This is intentional — keeps the
 * logic readable and easy to extend.
 */

import {
  ParsedQuery,
  TibaAnswer,
  AnswerSection,
  ExtractedEntity,
  UrgencyFlag,
  BilingualWithRegister,
  Bilingual,
  PatientContext,
} from '../types';
import { getCondition, getDrug, getLab } from '../knowledge';
import {
  categorizeBP,
  BP_CATEGORY_EXPLANATIONS,
} from '../knowledge/labs/bloodPressure';
import {
  categorizeHbA1c,
  HBA1C_CATEGORY_EXPLANATIONS,
} from '../knowledge/labs/hba1c';
import {
  categorizeGlucose,
  GLUCOSE_CATEGORY_EXPLANATIONS,
  GlucoseContext,
} from '../knowledge/labs/glucose';
import {
  interpretMrdt,
  MrdtResult,
  MrdtContext,
} from '../knowledge/labs/mrdt';
import {
  interpretGenexpert,
  GenexpertResult,
  GenexpertContext,
} from '../knowledge/labs/genexpert';
import {
  interpretCd4,
  Cd4Context,
} from '../knowledge/labs/cd4';
import {
  interpretViralLoad,
  ViralLoadContext,
} from '../knowledge/labs/viralLoad';
import {
  interpretCreatinine,
  CreatinineContext,
} from '../knowledge/labs/creatinine';
import {
  interpretEgfr,
  EgfrContext,
} from '../knowledge/labs/egfr';
import {
  interpretUrineProtein,
  UrineProteinResult,
  UrineProteinContext,
} from '../knowledge/labs/urine_protein';
import {
  interpretSpO2,
  SpO2Context,
} from '../knowledge/labs/spo2';
import {
  interpretRespiratoryRate,
  RespiratoryRateContext,
} from '../knowledge/labs/respiratory_rate';
import {
  interpretPeakFlow,
  PeakFlowContext,
} from '../knowledge/labs/peak_flow';
import {
  interpretSpirometry,
  SpirometryContext,
} from '../knowledge/labs/spirometry';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function makeId(): string {
  return `ans_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function urgencyFlag(
  level: UrgencyFlag['level'],
  reasonEn: string,
  reasonSw: string,
  actionEn: string,
  actionSw: string,
): UrgencyFlag {
  return {
    level,
    reason: { en: reasonEn, sw: reasonSw },
    action: { en: actionEn, sw: actionSw },
  };
}

// ──────────────────────────────────────────────────────────────────────
// RESOLVERS
// ──────────────────────────────────────────────────────────────────────

/** Resolver: explain_lab — patient pasted a lab value. */
function resolveExplainLab(parsed: ParsedQuery): TibaAnswer | null {
  const labEntity = parsed.entities.find(
    (e) => e.type === 'lab' && (e.value !== undefined || e.qualitativeResult !== undefined),
  );
  if (!labEntity) return null;

  // BP special-case (it has systolic+diastolic, and category model)
  if (labEntity.id === 'blood_pressure' && labEntity.value && labEntity.value2) {
    const category = categorizeBP(labEntity.value, labEntity.value2);
    const explanation = BP_CATEGORY_EXPLANATIONS[category];
    const labKnowledge = getLab('blood_pressure')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: {
          en: explanation.en.meaning,
          sw: explanation.sw.meaning,
          sw_mtaa: explanation.sw_mtaa.meaning,
        },
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: {
          en: explanation.en.nextSteps,
          sw: explanation.sw.nextSteps,
          sw_mtaa: explanation.sw_mtaa.nextSteps,
        },
      },
      {
        heading: { en: 'What blood pressure measures', sw: 'BP inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // Pull condition-level red flags if BP is high
    const redFlags: BilingualWithRegister[] = [];
    if (['grade2', 'grade3', 'crisis'].includes(category)) {
      const htn = getCondition('hypertension');
      if (htn) {
        htn.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    const followUps: Bilingual[] = [
      { en: 'What is hypertension?', sw: 'Shinikizo la damu ni nini?' },
      { en: 'Can I drink alcohol with BP medicine?', sw: 'Naweza kunywa pombe na dawa ya BP?' },
      { en: 'How much salt is safe per day?', sw: 'Chumvi kiasi gani salama kwa siku?' },
    ];

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        explanation.urgency,
        `BP ${labEntity.value}/${labEntity.value2} — ${category}`,
        `BP ${labEntity.value}/${labEntity.value2} — ${category}`,
        explanation.en.nextSteps,
        explanation.sw.nextSteps,
      ),
      headline: {
        en: explanation.en.headline,
        sw: explanation.sw.headline,
        sw_mtaa: explanation.sw_mtaa.headline,
      },
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        explanation.urgency === 'emergency' || explanation.urgency === 'urgent'
          ? 'strong'
          : 'standard',
    };
  }

  // HbA1c special-case
  if (labEntity.id === 'hba1c' && labEntity.value !== undefined) {
    const category = categorizeHbA1c(labEntity.value);
    const explanation = HBA1C_CATEGORY_EXPLANATIONS[category];
    const labKnowledge = getLab('hba1c')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: {
          en: explanation.en.meaning,
          sw: explanation.sw.meaning,
          sw_mtaa: explanation.sw_mtaa.meaning,
        },
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: {
          en: explanation.en.nextSteps,
          sw: explanation.sw.nextSteps,
          sw_mtaa: explanation.sw_mtaa.nextSteps,
        },
      },
      {
        heading: { en: 'What HbA1c measures', sw: 'HbA1c inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    const followUps: Bilingual[] = [
      { en: 'What is diabetes?', sw: 'Kisukari ni nini?' },
      { en: 'How can I lower my HbA1c?', sw: 'Naweza kupunguzaje HbA1c?' },
      { en: 'Can I eat ugali with diabetes?', sw: 'Naweza kula ugali nikiwa na kisukari?' },
    ];

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        explanation.urgency,
        `HbA1c ${labEntity.value}% — ${category}`,
        `HbA1c ${labEntity.value}% — ${category}`,
        explanation.en.nextSteps,
        explanation.sw.nextSteps,
      ),
      headline: {
        en: explanation.en.headline,
        sw: explanation.sw.headline,
        sw_mtaa: explanation.sw_mtaa.headline,
      },
      sections,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        explanation.urgency === 'emergency' || explanation.urgency === 'urgent'
          ? 'strong'
          : 'standard',
    };
  }

  // Glucose special-case (context-aware)
  if (labEntity.id === 'glucose' && labEntity.value !== undefined) {
    // Detect context from the query text
    const queryText = parsed.normalized.toLowerCase();
    let context: GlucoseContext = 'unknown';
    const isPregnant = parsed.entities.some(
      (e) => e.type === 'substance' && e.id === 'pregnancy',
    );

    if (/fasting|fbs|kabla ya kula|asubuhi|fbg|fpg/i.test(queryText)) {
      context = isPregnant ? 'pregnancy_fasting' : 'fasting';
    } else if (/post.?meal|after meal|baada ya kula|2h|ogtt/i.test(queryText)) {
      context = isPregnant ? 'pregnancy_post_meal' : 'post_meal';
    } else if (/random|rbs/i.test(queryText)) {
      context = 'random';
    }

    // Convert mg/dL → mmol/L if needed
    let valueMmol = labEntity.value;
    if (labEntity.unit && /mg\/dl/i.test(labEntity.unit)) {
      valueMmol = labEntity.value / 18.0;
    }

    const category = categorizeGlucose(valueMmol, context);
    const explanation = GLUCOSE_CATEGORY_EXPLANATIONS[category];
    const labKnowledge = getLab('glucose')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: {
          en: explanation.en.meaning,
          sw: explanation.sw.meaning,
          sw_mtaa: explanation.sw_mtaa.meaning,
        },
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: {
          en: explanation.en.nextSteps,
          sw: explanation.sw.nextSteps,
          sw_mtaa: explanation.sw_mtaa.nextSteps,
        },
      },
      {
        heading: { en: 'What blood glucose measures', sw: 'Glucose inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // Pull diabetes red flags if very high or critical
    const redFlags: BilingualWithRegister[] = [];
    if (category === 'critical_high' || category === 'very_high') {
      const dm = getCondition('diabetes');
      if (dm) {
        dm.whenToSeekCare
          .filter((s) => s.urgency === 'emergency')
          .slice(0, 3)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    const followUps: Bilingual[] = [
      { en: 'What is diabetes?', sw: 'Kisukari ni nini?' },
      { en: 'What should my sugar levels be?', sw: 'Sukari yangu inafaa iwe kiwango gani?' },
      { en: 'What if my sugar drops too low?', sw: 'Sukari ikishuka sana nifanyeje?' },
    ];

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        explanation.urgency,
        `Glucose ${labEntity.value} ${labEntity.unit ?? ''} — ${category} (${context})`,
        `Glucose ${labEntity.value} ${labEntity.unit ?? ''} — ${category} (${context})`,
        explanation.en.nextSteps,
        explanation.sw.nextSteps,
      ),
      headline: {
        en: explanation.en.headline,
        sw: explanation.sw.headline,
        sw_mtaa: explanation.sw_mtaa.headline,
      },
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        explanation.urgency === 'emergency'
          ? 'emergency'
          : explanation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // mRDT special-case (qualitative — positive/negative/invalid, with clinical context)
  if (labEntity.id === 'mrdt' && labEntity.qualitativeResult !== undefined) {
    const result = labEntity.qualitativeResult as MrdtResult;
    const context = (labEntity.qualitativeContext ?? 'unknown') as MrdtContext;
    const interpretation = interpretMrdt(result, context);
    const labKnowledge = getLab('mrdt')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'About the mRDT', sw: 'Kuhusu mRDT' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // If positive, surface malaria red flags
    const redFlags: BilingualWithRegister[] = [];
    if (result === 'positive') {
      const malaria = getCondition('malaria');
      if (malaria) {
        malaria.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    const followUps: Bilingual[] = result === 'positive'
      ? [
          { en: 'What is ALu and how do I take it?', sw: 'ALu ni nini na nitumieje?' },
          { en: 'What are the danger signs of severe malaria?', sw: 'Dalili za hatari za malaria kali ni zipi?' },
          { en: 'I am pregnant — what malaria treatment is safe?', sw: 'Nina mimba — matibabu gani ya malaria ni salama?' },
        ]
      : [
          { en: 'My fever is not malaria — what else could it be?', sw: 'Homa yangu si malaria — inaweza kuwa nini?' },
          { en: 'Should I repeat the test?', sw: 'Nirudie kipimo?' },
          { en: 'When does malaria need microscopy instead of mRDT?', sw: 'Lini malaria inahitaji darubini badala ya mRDT?' },
        ];

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `mRDT ${result} — context: ${context}`,
        `mRDT ${result} — muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // GeneXpert special-case (qualitative — MTB detected/not, RIF resistance, with clinical context)
  if (labEntity.id === 'genexpert' && labEntity.qualitativeResult !== undefined) {
    const result = labEntity.qualitativeResult as GenexpertResult;
    const context = (labEntity.qualitativeContext ?? 'unknown') as GenexpertContext;
    const interpretation = interpretGenexpert(result, context);
    const labKnowledge = getLab('genexpert')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'About GeneXpert', sw: 'Kuhusu GeneXpert' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // If MTB detected (any RIF status), surface TB red flags
    const redFlags: BilingualWithRegister[] = [];
    if (
      result === 'mtb_detected_rif_sensitive' ||
      result === 'mtb_detected_rif_resistant' ||
      result === 'mtb_detected_rif_indeterminate'
    ) {
      const tb = getCondition('tb');
      if (tb) {
        tb.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    // Result-shaped follow-up prompts
    let followUps: Bilingual[];
    if (result === 'mtb_detected_rif_resistant') {
      followUps = [
        { en: 'What is MDR-TB and how is it treated?', sw: 'MDR-TB ni nini na inatibiwaje?' },
        { en: 'Where are the MDR-TB centres in Tanzania?', sw: 'Vituo vya MDR-TB Tanzania viko wapi?' },
        { en: 'Should my family be screened?', sw: 'Familia yangu ichunguzwe?' },
      ];
    } else if (
      result === 'mtb_detected_rif_sensitive' ||
      result === 'mtb_detected_rif_indeterminate'
    ) {
      followUps = [
        { en: 'How does RHZE work and what side effects to watch?', sw: 'RHZE inafanya kazi vipi na nichunguze athari gani?' },
        { en: 'I have HIV — do I start ART now?', sw: 'Nina VVU — naanza ART sasa?' },
        { en: 'Will my family catch TB from me?', sw: 'Familia yangu itaambukizwa TB kutoka kwangu?' },
      ];
    } else if (result === 'mtb_not_detected') {
      followUps = [
        { en: 'If GeneXpert is negative, why do I still have a cough?', sw: 'Ikiwa GeneXpert ni negative, kwa nini bado nina kikohozi?' },
        { en: 'Should I repeat the test?', sw: 'Nirudie kipimo?' },
        { en: 'What other tests could I need?', sw: 'Vipimo gani vingine ninaweza kuhitaji?' },
      ];
    } else {
      // invalid
      followUps = [
        { en: 'How do I produce a good sputum sample?', sw: 'Natoa sampuli nzuri ya makohozi vipi?' },
        { en: 'When should I come back for the repeat test?', sw: 'Nirudi lini kwa kipimo cha kurudia?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `GeneXpert ${result} — context: ${context}`,
        `GeneXpert ${result} — muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Urine protein special-case (qualitative dipstick: negative/trace/1+/2+/3+/4+
  //  with clinical context — ANC routine / suspected pre-eclampsia / UTI / CKD)
  if (labEntity.id === 'urine_protein' && labEntity.qualitativeResult !== undefined) {
    const result = labEntity.qualitativeResult as UrineProteinResult;
    const context = (labEntity.qualitativeContext ?? 'unknown') as UrineProteinContext;
    const interpretation = interpretUrineProtein(result, context);
    const labKnowledge = getLab('urine_protein')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'About urine protein', sw: 'Kuhusu protini ya mkojo' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // For meaningful proteinuria, surface maternal-care red flags (the leading
    // life-threatening cause of dipstick proteinuria in pregnancy is pre-eclampsia)
    const redFlags: BilingualWithRegister[] = [];
    if (
      result === 'one_plus' ||
      result === 'two_plus' ||
      result === 'three_plus' ||
      result === 'four_plus'
    ) {
      const maternal = getCondition('maternal_care');
      if (maternal) {
        maternal.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    // Result-shaped follow-up prompts
    let followUps: Bilingual[];
    if (
      result === 'three_plus' ||
      result === 'four_plus'
    ) {
      followUps = [
        { en: 'What is severe pre-eclampsia and how is it treated?', sw: 'Pre-eclampsia kali ni nini na inatibiwaje?' },
        { en: 'What is magnesium sulfate and why is it given?', sw: 'Magnesium sulfate ni nini na kwa nini hutolewa?' },
        { en: 'What is nephrotic syndrome?', sw: 'Nephrotic syndrome ni nini?' },
      ];
    } else if (result === 'two_plus' || result === 'one_plus') {
      followUps = [
        { en: 'What is pre-eclampsia?', sw: 'Pre-eclampsia ni nini?' },
        { en: 'What does a urine protein:creatinine ratio tell us?', sw: 'Urine protein:creatinine ratio inatuambia nini?' },
        { en: 'Should I be tested for a UTI as well?', sw: 'Nichunguzwe pia kwa UTI?' },
      ];
    } else {
      followUps = [
        { en: 'When should the dipstick be repeated?', sw: 'Dipstick irudiwe lini?' },
        { en: 'What other ANC checks happen at each visit?', sw: 'Vipimo gani vingine vya ANC hufanyika kila ziara?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `Urine protein ${result} — context: ${context}`,
        `Protini ya mkojo ${result} — muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // CD4 special-case (numeric, with clinical context — at diagnosis / on ART / unwell)
  if (labEntity.id === 'cd4' && labEntity.value !== undefined) {
    const context = (labEntity.qualitativeContext ?? 'unknown') as Cd4Context;
    const interpretation = interpretCd4(labEntity.value, context);
    const labKnowledge = getLab('cd4')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'What CD4 measures', sw: 'CD4 inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // For low CD4 (advanced HIV disease), surface HIV red flags
    const redFlags: BilingualWithRegister[] = [];
    if (interpretation.band === 'critical' || interpretation.band === 'advanced') {
      const hiv = getCondition('hiv');
      if (hiv) {
        hiv.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    const followUps: Bilingual[] =
      interpretation.band === 'critical' || interpretation.band === 'advanced'
        ? [
            { en: 'What is advanced HIV disease?', sw: 'VVU iliyokomaa ni nini?' },
            { en: 'What opportunistic infections should I worry about?', sw: 'Maambukizi nyemelezi gani niwe na wasiwasi nayo?' },
            { en: 'How long until my CD4 recovers?', sw: 'Itachukua muda gani CD4 yangu ipone?' },
          ]
        : [
            { en: 'What does my viral load tell me?', sw: 'Viral load yangu inaniambia nini?' },
            { en: 'How do I keep my CD4 count rising?', sw: 'Nawezaje kuweka CD4 count yangu ikipanda?' },
            { en: 'What is U=U?', sw: 'U=U ni nini?' },
          ];

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `CD4 ${labEntity.value} — band: ${interpretation.band}, context: ${context}`,
        `CD4 ${labEntity.value} — kiwango: ${interpretation.band}, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Viral Load special-case (numeric, with clinical context — first check / routine / repeat after high)
  if (labEntity.id === 'viral_load' && labEntity.value !== undefined) {
    const context = (labEntity.qualitativeContext ?? 'unknown') as ViralLoadContext;
    const interpretation = interpretViralLoad(labEntity.value, context);
    const labKnowledge = getLab('viral_load')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'What viral load measures', sw: 'Viral load inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // For unsuppressed viral load, surface HIV red flags (treatment-failure territory)
    const redFlags: BilingualWithRegister[] = [];
    if (interpretation.band === 'unsuppressed') {
      const hiv = getCondition('hiv');
      if (hiv) {
        hiv.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 3)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    let followUps: Bilingual[];
    if (interpretation.band === 'undetectable') {
      followUps = [
        { en: 'What is U=U?', sw: 'U=U ni nini?' },
        { en: 'How often should my viral load be checked?', sw: 'Viral load yangu ipimwe mara ngapi?' },
        { en: 'What does my CD4 count tell me?', sw: 'CD4 count yangu inaniambia nini?' },
      ];
    } else if (interpretation.band === 'low_level') {
      followUps = [
        { en: 'Why is my viral load detectable?', sw: 'Kwa nini viral load yangu inaonekana?' },
        { en: 'How do I get back to undetectable?', sw: 'Nawezaje kurudi kwenye kutokuonekana?' },
        { en: 'Does this mean my treatment failed?', sw: 'Hii inamaanisha matibabu yangu yameshindwa?' },
      ];
    } else {
      // unsuppressed
      followUps = [
        { en: 'Does a high viral load mean treatment failure?', sw: 'Viral load ya juu inamaanisha kushindwa kwa matibabu?' },
        { en: 'What is second-line ART?', sw: 'ART ya mstari wa pili ni nini?' },
        { en: 'How is adherence support given?', sw: 'Msaada wa kuzingatia hutolewaje?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `Viral load ${labEntity.value} — band: ${interpretation.band}, context: ${context}`,
        `Viral load ${labEntity.value} — kiwango: ${interpretation.band}, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Creatinine special-case (numeric, with clinical context — first result / known CKD / unwell)
  if (labEntity.id === 'creatinine' && labEntity.value !== undefined) {
    const context = (labEntity.qualitativeContext ?? 'unknown') as CreatinineContext;
    const interpretation = interpretCreatinine(labEntity.value, context);
    const labKnowledge = getLab('creatinine')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'What creatinine measures', sw: 'Creatinine inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // For markedly high / high creatinine, surface CKD red flags
    const redFlags: BilingualWithRegister[] = [];
    if (interpretation.band === 'markedly_high' || interpretation.band === 'high') {
      const ckd = getCondition('ckd');
      if (ckd) {
        ckd.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    const followUps: Bilingual[] =
      interpretation.band === 'markedly_high' || interpretation.band === 'high'
        ? [
            { en: 'What does my eGFR tell me?', sw: 'eGFR yangu inaniambia nini?' },
            { en: 'What is chronic kidney disease?', sw: 'Ugonjwa sugu wa figo ni nini?' },
            { en: 'Which medicines protect the kidneys?', sw: 'Dawa gani zinalinda figo?' },
          ]
        : [
            { en: 'What is the difference between creatinine and eGFR?', sw: 'Tofauti kati ya creatinine na eGFR ni nini?' },
            { en: 'How do I keep my kidneys healthy?', sw: 'Nawezaje kuweka figo zangu zenye afya?' },
            { en: 'What raises creatinine apart from kidney disease?', sw: 'Nini kinapandisha creatinine zaidi ya ugonjwa wa figo?' },
          ];

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `Creatinine ${labEntity.value} — band: ${interpretation.band}, context: ${context}`,
        `Creatinine ${labEntity.value} — kiwango: ${interpretation.band}, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // eGFR special-case (numeric, with clinical context — first result / known CKD / unwell)
  if (labEntity.id === 'egfr' && labEntity.value !== undefined) {
    const context = (labEntity.qualitativeContext ?? 'unknown') as EgfrContext;
    const interpretation = interpretEgfr(labEntity.value, context);
    const labKnowledge = getLab('egfr')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'What eGFR measures', sw: 'eGFR inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // For reduced eGFR (moderate / severe / failure), surface CKD red flags
    const redFlags: BilingualWithRegister[] = [];
    if (
      interpretation.band === 'moderate' ||
      interpretation.band === 'severe' ||
      interpretation.band === 'failure'
    ) {
      const ckd = getCondition('ckd');
      if (ckd) {
        ckd.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    let followUps: Bilingual[];
    if (interpretation.band === 'failure' || interpretation.band === 'severe') {
      followUps = [
        { en: 'What is dialysis and when is it needed?', sw: 'Dialysis ni nini na inahitajika lini?' },
        { en: 'What is a kidney transplant?', sw: 'Upandikizaji wa figo ni nini?' },
        { en: 'How do I prepare for advanced kidney care?', sw: 'Najiandaaje kwa huduma ya figo iliyokomaa?' },
      ];
    } else if (interpretation.band === 'moderate') {
      followUps = [
        { en: 'What is chronic kidney disease?', sw: 'Ugonjwa sugu wa figo ni nini?' },
        { en: 'How do I slow down kidney damage?', sw: 'Nawezaje kupunguza kasi ya uharibifu wa figo?' },
        { en: 'Which medicines protect the kidneys?', sw: 'Dawa gani zinalinda figo?' },
      ];
    } else {
      followUps = [
        { en: 'What does my creatinine tell me?', sw: 'Creatinine yangu inaniambia nini?' },
        { en: 'How do I keep my kidneys healthy?', sw: 'Nawezaje kuweka figo zangu zenye afya?' },
        { en: 'How often should kidney function be checked?', sw: 'Utendaji wa figo uangaliwe mara ngapi?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `eGFR ${labEntity.value} — stage: ${interpretation.stageLabel}, context: ${context}`,
        `eGFR ${labEntity.value} — hatua: ${interpretation.stageLabel}, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // SpO2 special-case (numeric, with clinical context — acute illness /
  // known chronic lung disease / exertional testing / unknown)
  if (labEntity.id === 'spo2' && labEntity.value !== undefined) {
    const context = (labEntity.qualitativeContext ?? 'unknown') as SpO2Context;
    const interpretation = interpretSpO2(labEntity.value, context);
    const labKnowledge = getLab('spo2')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'What SpO2 measures', sw: 'SpO2 inapima nini' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // For low SpO2 (critical / severe / borderline-in-acute-illness),
    // surface pneumonia red flags
    const redFlags: BilingualWithRegister[] = [];
    if (
      interpretation.band === 'critical' ||
      interpretation.band === 'severe_hypoxia' ||
      (interpretation.band === 'borderline' && context === 'acute_illness')
    ) {
      const pneumonia = getCondition('pneumonia');
      if (pneumonia) {
        pneumonia.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    let followUps: Bilingual[];
    if (interpretation.band === 'critical' || interpretation.band === 'severe_hypoxia') {
      followUps = [
        { en: 'How does oxygen therapy work?', sw: 'Tiba ya oksijeni inafanyaje kazi?' },
        { en: 'What is severe pneumonia?', sw: 'Nimonia kali ni nini?' },
        { en: 'Why might oxygen be limited in some facilities?', sw: 'Kwa nini oksijeni inaweza kuwa ndogo katika baadhi ya vituo?' },
      ];
    } else if (interpretation.band === 'borderline') {
      followUps = [
        { en: 'How accurate are pulse oximeters?', sw: 'Pulse oximeters ni sahihi kiasi gani?' },
        { en: 'Should I have a chest X-ray?', sw: 'Niwe na X-ray ya kifua?' },
        { en: 'What is exercise desaturation?', sw: 'Exercise desaturation ni nini?' },
      ];
    } else {
      followUps = [
        { en: 'How do I count my respiratory rate?', sw: 'Nahesabuje kasi yangu ya kupumua?' },
        { en: 'When should I worry about a cough?', sw: 'Niwe na wasiwasi wa kikohozi lini?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `SpO2 ${labEntity.value}% — band: ${interpretation.band}, context: ${context}`,
        `SpO2 ${labEntity.value}% — bendera: ${interpretation.band}, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Respiratory rate special-case (numeric, with AGE context for IMCI
  // thresholds — pediatric_under_2mo / pediatric_2_11mo / pediatric_1_5yr
  // / adult / unknown)
  if (labEntity.id === 'respiratory_rate' && labEntity.value !== undefined) {
    const context = (labEntity.qualitativeContext ?? 'unknown') as RespiratoryRateContext;
    const interpretation = interpretRespiratoryRate(labEntity.value, context);
    const labKnowledge = getLab('respiratory_rate')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'About respiratory rate', sw: 'Kuhusu kasi ya kupumua' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    const redFlags: BilingualWithRegister[] = [];
    if (interpretation.band === 'critical_fast' || interpretation.band === 'fast') {
      const pneumonia = getCondition('pneumonia');
      if (pneumonia) {
        pneumonia.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    let followUps: Bilingual[];
    if (interpretation.band === 'critical_fast' || interpretation.band === 'fast') {
      followUps = [
        { en: 'What is chest indrawing and how do I check for it?', sw: 'Kifua kuingia ndani ni nini na nichunguzeje?' },
        { en: 'What are the IMCI danger signs?', sw: 'Dalili za hatari za IMCI ni zipi?' },
        { en: 'What is the treatment for childhood pneumonia?', sw: 'Matibabu ya nimonia ya mtoto ni nini?' },
      ];
    } else {
      followUps = [
        { en: 'How do I count a child\'s breathing properly?', sw: 'Nahesabuje kupumua kwa mtoto vizuri?' },
        { en: 'What is the normal respiratory rate by age?', sw: 'Kasi ya kawaida ya kupumua kwa umri ni ipi?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `Respiratory rate ${labEntity.value}/min — band: ${interpretation.band}, threshold: ${interpretation.thresholdUsed}/min, context: ${context}`,
        `Kasi ya kupumua ${labEntity.value}/dakika — bendera: ${interpretation.band}, kizingiti: ${interpretation.thresholdUsed}/dakika, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Peak flow special-case (numeric, with context — personal_best_known
  // / no_personal_best / unknown). When personal best is supplied via the
  // qualitativeContext encoding "personal_best_known:NNN" (NNN in L/min)
  // the percentage is computed and the GINA traffic-light zones drive the
  // answer.
  if (labEntity.id === 'peak_flow' && labEntity.value !== undefined) {
    const rawCtx = labEntity.qualitativeContext ?? 'unknown';
    let context: PeakFlowContext = 'unknown';
    let personalBest: number | undefined;
    if (typeof rawCtx === 'string' && rawCtx.startsWith('personal_best_known')) {
      context = 'personal_best_known';
      const m = rawCtx.match(/personal_best_known[:=]\s*(\d{2,4})/);
      if (m) personalBest = parseFloat(m[1]);
    } else if (rawCtx === 'no_personal_best') {
      context = 'no_personal_best';
    }
    const interpretation = interpretPeakFlow(labEntity.value, context, personalBest);
    const labKnowledge = getLab('peak_flow')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'About peak flow', sw: 'Kuhusu peak flow' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // Surface asthma red flags for red-zone or yellow-zone readings
    const redFlags: BilingualWithRegister[] = [];
    if (interpretation.band === 'red' || interpretation.band === 'yellow') {
      const asthma = getCondition('asthma');
      if (asthma) {
        asthma.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    let followUps: Bilingual[];
    if (interpretation.band === 'red') {
      followUps = [
        { en: 'What is a silent chest in asthma?', sw: 'Kifua kimya katika pumu ni nini?' },
        { en: 'How do I use a spacer correctly?', sw: 'Ninatumia spacer vipi kwa usahihi?' },
        { en: 'When do I need oral prednisolone?', sw: 'Ninahitaji prednisolone ya kumeza lini?' },
      ];
    } else if (interpretation.band === 'yellow') {
      followUps = [
        { en: 'What is an asthma action plan?', sw: 'Mpango wa kitendo wa pumu ni nini?' },
        { en: 'When should I step up my controller?', sw: 'Niongezeje controller yangu lini?' },
        { en: 'What triggers an asthma flare?', sw: 'Nini hutangaza flare ya pumu?' },
      ];
    } else {
      followUps = [
        { en: 'How do I establish my personal best?', sw: 'Ninaanzishaje personal best yangu?' },
        { en: 'Why do I still need my controller daily?', sw: 'Kwa nini bado nahitaji controller kila siku?' },
        { en: 'When should peak flow be measured?', sw: 'Peak flow ipimwe lini?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `Peak flow ${labEntity.value} L/min — zone: ${interpretation.band}, context: ${context}${personalBest ? `, personal best: ${personalBest}` : ''}`,
        `Peak flow ${labEntity.value} L/min — eneo: ${interpretation.band}, muktadha: ${context}${personalBest ? `, bora binafsi: ${personalBest}` : ''}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Spirometry special-case (numeric — FEV1 % predicted, with optional
  // qualitativeContext encoding the post-bronchodilator FEV1/FVC status
  // as 'post_bronchodilator_obstructed' / 'post_bronchodilator_normal'
  // / 'unknown'). Drives GOLD stages 1-4 when obstruction is confirmed.
  if (labEntity.id === 'spirometry' && labEntity.value !== undefined) {
    const rawCtx = labEntity.qualitativeContext ?? 'unknown';
    let context: SpirometryContext = 'unknown';
    if (rawCtx === 'post_bronchodilator_obstructed' || rawCtx === 'post_bronchodilator_normal') {
      context = rawCtx;
    }
    const interpretation = interpretSpirometry(labEntity.value, context);
    const labKnowledge = getLab('spirometry')!;

    const sections: AnswerSection[] = [
      {
        heading: { en: 'What this means', sw: 'Maana yake' },
        body: interpretation.meaning,
      },
      {
        heading: { en: 'What to do', sw: 'Ufanye nini' },
        body: interpretation.nextSteps,
      },
      {
        heading: { en: 'About spirometry', sw: 'Kuhusu spirometry' },
        body: labKnowledge.whatItMeasures,
      },
    ];

    // Surface COPD red flags for GOLD 3-4 (severe and very severe)
    const redFlags: BilingualWithRegister[] = [];
    if (interpretation.stage === 'gold_3' || interpretation.stage === 'gold_4') {
      const copd = getCondition('copd');
      if (copd) {
        copd.whenToSeekCare
          .filter((s) => s.urgency === 'urgent' || s.urgency === 'emergency')
          .slice(0, 4)
          .forEach((s) => redFlags.push(s.sign));
      }
    }

    let followUps: Bilingual[];
    if (interpretation.stage === 'gold_4') {
      followUps = [
        { en: 'What is long-term home oxygen therapy?', sw: 'Tiba ya oksijeni ya nyumbani ya muda mrefu ni nini?' },
        { en: 'What is advance care planning in COPD?', sw: 'Mipango ya huduma ya mapema katika COPD ni nini?' },
        { en: 'How can pulmonary rehab help me?', sw: 'Pulmonary rehab inaweza kunisaidiaje?' },
      ];
    } else if (interpretation.stage === 'gold_3') {
      followUps = [
        { en: 'When do I need oxygen at home?', sw: 'Ninahitaji oksijeni nyumbani lini?' },
        { en: 'What is cor pulmonale?', sw: 'Cor pulmonale ni nini?' },
        { en: 'How can I reduce my COPD exacerbations?', sw: 'Ninapunguzaje milipuko yangu ya COPD?' },
      ];
    } else if (interpretation.stage === 'gold_2') {
      followUps = [
        { en: 'What is the difference between LAMA and LABA?', sw: 'Tofauti ya LAMA na LABA ni nini?' },
        { en: 'When should I use a spacer?', sw: 'Nitumie spacer lini?' },
        { en: 'What is pulmonary rehab?', sw: 'Pulmonary rehab ni nini?' },
      ];
    } else if (interpretation.stage === 'gold_1') {
      followUps = [
        { en: 'How do I quit smoking?', sw: 'Naacha vipi kuvuta sigara?' },
        { en: 'How can I reduce biomass smoke exposure?', sw: 'Napunguzaje mfiduo wa moshi wa kuni?' },
        { en: 'Which vaccinations do I need with COPD?', sw: 'Nahitaji chanjo zipi nikiwa na COPD?' },
      ];
    } else if (interpretation.stage === 'not_copd') {
      followUps = [
        { en: 'What is restrictive lung disease?', sw: 'Ugonjwa wa restrictive wa mapafu ni nini?' },
        { en: 'Could this be heart failure?', sw: 'Hii inaweza kuwa kushindwa kwa moyo?' },
        { en: 'When should I see a specialist?', sw: 'Niende kwa mtaalam lini?' },
      ];
    } else {
      // context_needed
      followUps = [
        { en: 'What is FEV1/FVC ratio?', sw: 'FEV1/FVC ratio ni nini?' },
        { en: 'What is post-bronchodilator spirometry?', sw: 'Spirometry baada ya bronchodilator ni nini?' },
        { en: 'How is COPD diagnosed?', sw: 'COPD inatambuliwaje?' },
      ];
    }

    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        interpretation.urgency,
        `Spirometry FEV1 ${labEntity.value}% predicted — stage: ${interpretation.stage}, context: ${context}`,
        `Spirometry FEV1 ${labEntity.value}% iliyotabiriwa — hatua: ${interpretation.stage}, muktadha: ${context}`,
        interpretation.nextSteps.en,
        interpretation.nextSteps.sw,
      ),
      headline: interpretation.headline,
      sections,
      redFlags: redFlags.length > 0 ? redFlags : undefined,
      followUps,
      sources: labKnowledge.sources,
      matchConfidence: 'high',
      resolution: 'answered',
      disclaimer:
        interpretation.urgency === 'emergency'
          ? 'emergency'
          : interpretation.urgency === 'urgent'
            ? 'strong'
            : 'standard',
    };
  }

  // Generic lab path (any lab not yet specialised)
  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    query: parsed,
    urgency: urgencyFlag(
      'routine',
      'Lab value detected but interpretation rules not yet loaded',
      'Thamani ya kipimo imepatikana lakini sheria za tafsiri bado',
      'Bring this result to your doctor for interpretation.',
      'Lete matokeo haya kwa daktari wako kwa tafsiri.',
    ),
    headline: {
      en: `Your ${labEntity.id} value: ${labEntity.value}${labEntity.unit ? ' ' + labEntity.unit : ''}`,
      sw: `Thamani yako ya ${labEntity.id}: ${labEntity.value}${labEntity.unit ? ' ' + labEntity.unit : ''}`,
    },
    sections: [
      {
        heading: { en: 'Information needed', sw: 'Taarifa inahitajika' },
        body: {
          en: `We do not yet have a full interpretation guide for ${labEntity.id} in this version. Your doctor can interpret this value in the context of your full clinical picture.`,
          sw: `Bado hatuna mwongozo kamili wa tafsiri ya ${labEntity.id} katika toleo hili. Daktari wako anaweza kutafsiri thamani hii katika muktadha wa hali yako ya kliniki.`,
        },
      },
    ],
    sources: [],
    matchConfidence: 'medium',
    resolution: 'partial',
    disclaimer: 'standard',
  };
}

/**
 * Resolver: a lab is mentioned but WITHOUT a numeric value or qualitative
 * result (e.g. "creatinine imepanda maana yake nini", "egfr imeshuka ni
 * mbaya"). The numeric/qualitative interpreters can't run, so route to the
 * condition the lab belongs to — the user still gets grounded education
 * about what the test means and the disease behind it.
 */
function resolveLabWithoutValue(parsed: ParsedQuery): TibaAnswer | null {
  const labEntity = parsed.entities.find(
    (e) =>
      e.type === 'lab' &&
      e.value === undefined &&
      e.qualitativeResult === undefined,
  );
  if (!labEntity) return null;

  const conditionId = LAB_TO_CONDITION_FALLBACK[labEntity.id];
  if (!conditionId) return null;
  const condition = getCondition(conditionId);
  if (!condition) return null;

  const labKnowledge = getLab(labEntity.id);

  const sections: AnswerSection[] = [];
  if (labKnowledge) {
    sections.push({
      heading: {
        en: `What ${labEntity.surfaceForm} measures`,
        sw: `${labEntity.surfaceForm} inapima nini`,
      },
      body: labKnowledge.whatItMeasures,
    });
  }
  sections.push({
    heading: { en: 'What this relates to', sw: 'Hii inahusiana na nini' },
    body: condition.whatItIs,
  });
  sections.push({
    heading: { en: 'Why it matters', sw: 'Kwa nini ni muhimu' },
    body: condition.whyItMatters,
  });

  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    query: parsed,
    urgency: urgencyFlag(
      'info',
      `Lab "${labEntity.surfaceForm}" mentioned without a value — routed to ${conditionId}`,
      `Kipimo "${labEntity.surfaceForm}" kimetajwa bila thamani — kimeelekezwa ${conditionId}`,
      'Share the actual result number with your doctor for a precise interpretation.',
      'Shiriki namba halisi ya matokeo na daktari wako kwa tafsiri sahihi.',
    ),
    headline: {
      en: `${labEntity.surfaceForm} — what it means and the condition behind it`,
      sw: `${labEntity.surfaceForm} — maana yake na hali iliyo nyuma yake`,
    },
    sections,
    followUps: [
      {
        en: `What does a specific ${labEntity.surfaceForm} number mean?`,
        sw: `Namba maalum ya ${labEntity.surfaceForm} inamaanisha nini?`,
      },
      { en: `What is ${condition.aliases.canonical_en}?`, sw: `${condition.aliases.canonical_sw} ni nini?` },
    ],
    sources: condition.sources,
    matchConfidence: 'medium',
    resolution: 'partial',
    disclaimer: 'standard',
  };
}
const CONDITION_PARENT_MAP: Record<string, string> = {
  // Diabetes family
  gestational_diabetes: 'diabetes',
  dka: 'diabetes',
  hypoglycemia: 'diabetes',
  diabetic_foot: 'diabetes',
  diabetic_retinopathy: 'diabetes',
  // Malaria family
  cerebral_malaria: 'malaria',
  severe_malaria: 'malaria',
  malaria_pregnancy: 'malaria',
  malaria_pediatric: 'malaria',
  blackwater_fever: 'malaria',
  // TB family
  mdr_tb: 'tb',
  eptb_lymph: 'tb',
  eptb_spine: 'tb',
  eptb_meningitis: 'tb',
  eptb_abdominal: 'tb',
  eptb_pericardial: 'tb',
  miliary_tb: 'tb',
  latent_tb: 'tb',
  tb_pediatric: 'tb',
  tb_pregnancy: 'tb',
  post_tb_lung: 'tb',
  // HIV family
  hiv_newly_diagnosed: 'hiv',
  hiv_on_art: 'hiv',
  hiv_treatment_failure: 'hiv',
  hiv_advanced: 'hiv',
  hiv_oi: 'hiv',
  hiv_pmtct: 'hiv',
  hiv_pediatric: 'hiv',
  hiv_prevention: 'hiv',
  // CKD family
  ckd_early: 'ckd',
  ckd_moderate: 'ckd',
  ckd_advanced: 'ckd',
  ckd_kidney_failure: 'ckd',
  ckd_dialysis: 'ckd',
  ckd_transplant: 'ckd',
  // Maternal family
  preeclampsia: 'maternal_care',
  pph: 'maternal_care',
  anc_continuity: 'maternal_care',
  // Pneumonia family
  cap_adult: 'pneumonia',
  severe_pneumonia: 'pneumonia',
  pediatric_pneumonia: 'pneumonia',
  hap_hcap: 'pneumonia',
  aspiration_pneumonia: 'pneumonia',
  pjp: 'pneumonia',
  // Asthma family
  mild_persistent_asthma: 'asthma',
  moderate_persistent_asthma: 'asthma',
  severe_persistent_asthma: 'asthma',
  acute_asthma_exacerbation: 'asthma',
  life_threatening_asthma: 'asthma',
  pediatric_asthma: 'asthma',
  exercise_induced_asthma: 'asthma',
  // COPD family
  copd_stable_mild_moderate: 'copd',
  copd_severe_stable: 'copd',
  aecopd_outpatient: 'copd',
  aecopd_severe: 'copd',
  cor_pulmonale_copd: 'copd',
  post_tb_obstructive_lung_disease: 'copd',
  // Heart Failure family
  hfref: 'heart_failure',
  hfpef: 'heart_failure',
  acute_decompensated_hf: 'heart_failure',
  peripartum_cardiomyopathy: 'heart_failure',
  rheumatic_heart_disease_hf: 'heart_failure',
  // Stroke family
  ischemic_stroke: 'stroke',
  hemorrhagic_stroke: 'stroke',
  tia: 'stroke',
  // Sickle cell family
  vaso_occlusive_crisis: 'sickle_cell',
  acute_chest_syndrome: 'sickle_cell',
};

// Map component drugs to their parent FDC for graceful routing.
// (e.g. asking about "rifampicin" surfaces RHZE knowledge, since RHZE
// contains the mechanism/interactions/side-effects of all four drugs.)
const DRUG_PARENT_MAP: Record<string, string> = {
  rifampicin: 'rhze',
  isoniazid: 'rhze',
  pyrazinamide: 'rhze',
  ethambutol: 'rhze',
  rifapentine: 'rhze',
  // ARV components of TLD → route to the TLD fixed-dose combination knowledge
  tenofovir: 'tld',
  lamivudine: 'tld',
  dolutegravir: 'tld',
};

// Drugs that are recognized via aliases but have no own DrugKnowledge file
// AND no parent FDC — route the user to the most relevant condition file so
// they still get useful, clinically-grounded education instead of a no_match.
// (e.g. asking about IPT / 3HP / streptomycin / pyridoxine lands on TB;
//  asking about other ARV regimens or co-trimoxazole-adjacent drugs lands on HIV.)
const DRUG_TO_CONDITION_FALLBACK: Record<string, string> = {
  isoniazid_preventive: 'tb',
  streptomycin: 'tb',
  pyridoxine: 'tb',
  // Non-TLD ARV regimens / drugs — recognized but not separately authored;
  // the HIV condition file covers regimens, switching, and treatment failure.
  efavirenz: 'hiv',
  atazanavir: 'hiv',
  // Sickle cell — disease-modifying drug routed to parent (Phase 13)
  hydroxyurea: 'sickle_cell',
  hydroxycarbamide: 'sickle_cell',
  proguanil: 'sickle_cell',
  // Anaemia adjuncts (Phase 15)
  folic_acid: 'anaemia',
  iron_supplement: 'anaemia',
  ferrous_sulfate: 'anaemia',
};

// When a lab is mentioned WITHOUT a numeric value (e.g. "creatinine imepanda
// maana yake nini" — "what does a raised creatinine mean") the numeric
// interpreters cannot run. Rather than a no_match, route to the condition
// the lab belongs to, so the user still gets grounded education about what
// the test means and the disease behind it.
const LAB_TO_CONDITION_FALLBACK: Record<string, string> = {
  creatinine: 'ckd',
  egfr: 'ckd',
  cd4: 'hiv',
  viral_load: 'hiv',
  genexpert: 'tb',
  hba1c: 'diabetes',
  glucose: 'diabetes',
  blood_pressure: 'hypertension',
  mrdt: 'malaria',
  urine_protein: 'maternal_care',
  spo2: 'pneumonia',
  respiratory_rate: 'pneumonia',
  peak_flow: 'asthma',
  spirometry: 'copd',
};

// Conditions that are known to the engine (via aliases) but whose full
// ConditionKnowledge files haven't been authored yet. For these we surface
// a "coming soon" partial answer so the user knows it's recognized rather
// than getting a generic no_match.
const KNOWN_BUT_UNAUTHORED: Record<string, { en: string; sw: string; sw_mtaa: string }> = {
  // Tier C (Phase 15+): conditions recognised by alias but not yet authored
  // in full. Each surfaces a "we hear you, here's what to do right now"
  // partial answer rather than a generic no_match.
  cataract: {
    en: 'Cataract — clouding of the lens of the eye, causing gradual painless loss of vision — is the leading cause of treatable blindness in Tanzania. Surgery is highly effective and is offered at most regional referral hospitals and at outreach camps run by KCMC, Muhimbili, and others. If your or a family member\'s vision is getting cloudy or whitish over months to years, ask for a referral to an eye clinic. Full TibaAI cataract content is in development.',
    sw: 'Cataract — kufunika kwa lens ya jicho, husababisha kupoteza maono polepole pasipo maumivu — ni sababu kuu ya upofu unaotibika Tanzania. Upasuaji una ufanisi mkubwa na hutolewa katika hospitali nyingi za rufaa za mkoa na katika kambi za nje zinazoendeshwa na KCMC, Muhimbili, na nyinginezo. Ikiwa maono yako au ya mwanafamilia yanafifia au kuwa meupe kwa miezi hadi miaka, omba rufaa kwenye kliniki ya macho. Maudhui kamili ya TibaAI ya cataract yanaundwa.',
    sw_mtaa: 'Cataract — clouding ya lens ya eye, inasababisha gradual painless loss ya vision — ni leading cause ya treatable blindness Tanzania. Surgery ina ufanisi mkubwa na inatolewa katika most regional referral hospitals na katika outreach camps zinazoendeshwa na KCMC, Muhimbili, na others. Ikiwa vision yako au ya family member inakuwa cloudy au whitish over months to years, omba referral kwenye eye clinic. Full TibaAI cataract content iko in development.',
  },
  diabetic_retinopathy: {
    en: 'Diabetic retinopathy is damage to the retina (back of the eye) from long-standing high blood sugar — it is one of the leading causes of blindness in people with diabetes. It develops silently before symptoms appear, so every person with diabetes should have an eye check (fundoscopy) at diagnosis and then yearly. Good blood sugar and blood pressure control slows it. Laser treatment and anti-VEGF injections can save vision if pre-blindness changes are caught early. Ask at your diabetic clinic about the nearest eye screening service. (See also the diabetes content for the full management framework.)',
    sw: 'Diabetic retinopathy ni uharibifu wa retina (nyuma ya jicho) kutoka sukari ya juu ya damu ya muda mrefu — ni mojawapo ya sababu kuu za upofu kwa watu wenye kisukari. Hukua kimya kabla dalili kujitokeza, kwa hivyo kila mtu mwenye kisukari anapaswa kupimwa macho (fundoscopy) wakati wa utambuzi na kisha kila mwaka. Udhibiti mzuri wa sukari ya damu na shinikizo la damu hupunguza. Matibabu ya laser na sindano za anti-VEGF zinaweza kuokoa maono ikiwa mabadiliko ya kabla-upofu yanagunduliwa mapema. Uliza katika kliniki yako ya kisukari kuhusu huduma ya karibu zaidi ya uchunguzi wa macho.',
    sw_mtaa: 'Diabetic retinopathy ni damage kwa retina (back ya eye) kutoka long-standing high blood sugar — ni mojawapo ya leading causes za blindness kwa watu wenye diabetes. Inakua silently kabla symptoms kuappear, kwa hivyo kila mtu mwenye diabetes apaswa kuwa na eye check (fundoscopy) at diagnosis na then yearly. Good blood sugar na blood pressure control inaslow it. Laser treatment na anti-VEGF injections zinaweza kuokoa vision ikiwa pre-blindness changes zinacaught early. Uliza katika diabetic clinic yako kuhusu nearest eye screening service.',
  },
  breast_cancer: {
    en: 'Breast cancer is increasing in Tanzania and is now one of the most common cancers in women. Three things change outcomes: knowing what is normal for your own breasts and noticing changes early; seeking medical assessment promptly for a new lump, skin change, nipple change, or discharge; and accepting investigation (ultrasound, biopsy) rather than waiting. Treatment combines surgery, chemotherapy, radiotherapy, and hormone therapy depending on the type — outcomes are much better when caught early. ORCI (Ocean Road Cancer Institute) in Dar es Salaam and KCMC, Bugando and other regional centres provide care. Full TibaAI breast cancer content is in development.',
    sw: 'Saratani ya matiti inaongezeka Tanzania na sasa ni mojawapo ya saratani za kawaida zaidi kwa wanawake. Mambo matatu hubadilisha matokeo: kujua kilichocho kawaida kwa matiti yako mwenyewe na kugundua mabadiliko mapema; kutafuta tathmini ya kimatibabu haraka kwa uvimbe mpya, mabadiliko ya ngozi, mabadiliko ya chuchu, au uchafu; na kukubali uchunguzi (ultrasound, biopsy) badala ya kusubiri. Matibabu yanachanganya upasuaji, chemotherapy, radiotherapy, na tiba ya homoni kulingana na aina — matokeo ni bora zaidi yanapoguzwa mapema. ORCI (Ocean Road Cancer Institute) Dar, na KCMC, Bugando na vituo vingine vya mkoa hutoa huduma. Maudhui kamili ya TibaAI ya saratani ya matiti yanaundwa.',
    sw_mtaa: 'Breast cancer inaongezeka Tanzania na sasa ni mojawapo ya most common cancers kwa women. Three things zinabadilisha outcomes: kujua kilichocho normal kwa breasts zako mwenyewe na kugundua changes early; kutafuta medical assessment promptly kwa new lump, skin change, nipple change, au discharge; na kukubali investigation (ultrasound, biopsy) badala ya kusubiri. Treatment inacombine surgery, chemotherapy, radiotherapy, na hormone therapy depending on type — outcomes ni much better ikiwa caught early. ORCI Dar, KCMC, Bugando, na other regional centres zinatoa care. Full TibaAI breast cancer content iko in development.',
  },
  adolescent_health: {
    en: 'Adolescent health covers puberty, mental health (very common in this age group), nutrition, contraception, sexually transmitted infections including HIV, and the unique challenges of growing up. Tanzania has youth-friendly clinics in many districts. Adolescents face higher rates of pregnancy, depression, and risky behaviour than adults — judgement-free conversation matters more than lecturing. Specific TibaAI adolescent content is in development; in the meantime, see the mental health, HIV, and maternal care content which all apply.',
    sw: 'Afya ya vijana inajumuisha kubalehe, afya ya akili (ya kawaida sana katika kundi hili la umri), lishe, uzazi wa mpango, magonjwa yanayoambukizwa kingono ikijumuisha VVU, na changamoto za kipekee za kukua. Tanzania ina kliniki za rafiki kwa vijana katika wilaya nyingi. Vijana wanakabiliwa na viwango vya juu vya mimba, sonona, na tabia za hatari kuliko watu wazima — mazungumzo yasiyohukumu ni muhimu zaidi kuliko mahubiri. Maudhui maalum ya TibaAI ya vijana yanaundwa; wakati huo huo, ona maudhui ya afya ya akili, VVU, na huduma ya uzazi ambayo yote yanatumika.',
    sw_mtaa: 'Adolescent health inajumuisha puberty, mental health (very common katika age group hii), nutrition, contraception, STIs ikijumuisha HIV, na unique challenges za kukua. Tanzania ina youth-friendly clinics katika wilaya nyingi. Adolescents wanakabiliwa na higher rates za pregnancy, depression, na risky behaviour kuliko adults — judgement-free conversation inamatter more kuliko lecturing. Specific TibaAI adolescent content iko in development; in the meantime, ona mental health, HIV, na maternal care content ambayo yote yanapply.',
  },
  neonatal_essentials: {
    en: 'Newborn essentials: keep baby warm (skin-to-skin contact is best), exclusive breastfeeding within the first hour and for 6 months, cord care (clean and dry, no traditional applications), vitamin K injection at birth, BCG and HBV birth dose vaccines, and watching for danger signs — not feeding well, fever or hypothermia, fast breathing, indrawing, jaundice in the first 24 hours, seizures, lethargy. Tanzania\'s integrated neonatal care has reduced mortality but the first 28 days remain the highest-risk period. Full TibaAI neonatal content is in development; the maternal care and IMCI-based pneumonia/bronchiolitis content already addresses many neonatal questions.',
    sw: 'Mambo muhimu ya watoto wachanga: mhifadhi joto mtoto (mawasiliano ya ngozi-kwa-ngozi ni bora zaidi), kunyonyesha pekee ndani ya saa ya kwanza na kwa miezi 6, huduma ya kitovu (safi na kavu, hakuna matumizi ya kijadi), sindano ya vitamini K wakati wa kuzaliwa, chanjo za BCG na HBV ya kuzaliwa, na kuangalia ishara za hatari — kutonyonya vizuri, homa au hypothermia, kupumua kwa haraka, kuingia ndani, manjano katika masaa 24 ya kwanza, mizozo, uchovu. Huduma jumuishi ya watoto wachanga Tanzania imepunguza vifo lakini siku 28 za kwanza zinabaki kipindi cha hatari kubwa zaidi. Maudhui kamili ya TibaAI ya watoto wachanga yanaundwa.',
    sw_mtaa: 'Newborn essentials: keep baby warm (skin-to-skin contact ni best), exclusive breastfeeding within first hour na kwa miezi 6, cord care (clean na dry, no traditional applications), vitamin K injection at birth, BCG na HBV birth dose vaccines, na kuangalia danger signs — not feeding well, fever au hypothermia, fast breathing, indrawing, jaundice katika first masaa 24, seizures, lethargy. Tanzania\'s integrated neonatal care imepunguza mortality lakini first siku 28 zinabaki highest-risk period. Full TibaAI neonatal content iko in development.',
  },
};

/** Resolver: explain_condition — patient asks about a condition. */
function resolveExplainCondition(parsed: ParsedQuery): TibaAnswer | null {
  const conditionEntities = parsed.entities.filter((e) => e.type === 'condition');
  if (conditionEntities.length === 0) return null;

  // Prefer a condition that has authored knowledge over one that doesn't.
  // For multi-condition queries like "nina vvu na malaria", this means the
  // engine answers from malaria (authored) and surfaces HIV as a comorbidity.
  let cond: ExtractedEntity | undefined;
  let knowledge: ReturnType<typeof getCondition> = null;
  let usedFallback = false;

  // 1st priority: a directly authored condition
  for (const c of conditionEntities) {
    const k = getCondition(c.id);
    if (k) {
      cond = c;
      knowledge = k;
      break;
    }
  }

  // 2nd priority: a sub-condition that maps to an authored parent
  if (!knowledge) {
    for (const c of conditionEntities) {
      const parentId = CONDITION_PARENT_MAP[c.id];
      if (parentId) {
        const k = getCondition(parentId);
        if (k) {
          cond = c;
          knowledge = k;
          usedFallback = true;
          break;
        }
      }
    }
  }

  // 3rd priority: an unauthored-but-known condition (HIV, TB, sickle cell)
  // — return a "coming soon" partial.
  if (!knowledge) {
    const unauthored = conditionEntities.find((c) => KNOWN_BUT_UNAUTHORED[c.id]);
    if (unauthored) {
      const placeholder = KNOWN_BUT_UNAUTHORED[unauthored.id];
      return {
        id: makeId(),
        timestamp: new Date().toISOString(),
        query: parsed,
        urgency: urgencyFlag(
          'info',
          'Condition recognized but full content pending review',
          'Hali imetambuliwa lakini maudhui kamili yanasubiri ukaguzi',
          'Refer to the relevant Tanzania national programme (NACP for HIV, NTLP for TB, Muhimbili for sickle cell) for now.',
          'Rejea programu husika ya kitaifa Tanzania (NACP kwa VVU, NTLP kwa TB, Muhimbili kwa sickle cell) kwa sasa.',
        ),
        headline: {
          en: `${unauthored.surfaceForm} — recognized, full content coming soon`,
          sw: `${unauthored.surfaceForm} — imetambuliwa, maudhui kamili yanakuja`,
          sw_mtaa: `${unauthored.surfaceForm} — imetambuliwa, maudhui kamili yanakuja`,
        },
        sections: [
          {
            heading: { en: 'Status', sw: 'Hali' },
            body: placeholder,
          },
        ],
        sources: [],
        matchConfidence: 'medium',
        resolution: 'partial',
        disclaimer: 'standard',
      };
    }
    return null;
  }

  if (!cond) return null;  // type-narrowing

  const sections: AnswerSection[] = [
    {
      heading: { en: 'What it is', sw: 'Ni nini' },
      body: knowledge.whatItIs,
    },
    {
      heading: { en: 'Why it matters', sw: 'Kwa nini ni muhimu' },
      body: knowledge.whyItMatters,
    },
    {
      heading: { en: 'How to manage it', sw: 'Jinsi ya kusimamia' },
      body: {
        en: knowledge.selfManagement.map((s) => `• ${s.en}`).join('\n\n'),
        sw: knowledge.selfManagement.map((s) => `• ${s.sw}`).join('\n\n'),
        sw_mtaa: knowledge.selfManagement.map((s) => `• ${s.sw_mtaa ?? s.sw}`).join('\n\n'),
      },
    },
  ];

  // Common questions inline as additional sections
  knowledge.commonQuestions.slice(0, 3).forEach((qa) => {
    sections.push({
      heading: qa.q,
      body: qa.a,
    });
  });

  const redFlags = knowledge.whenToSeekCare
    .filter((c) => c.urgency === 'urgent' || c.urgency === 'emergency')
    .map((c) => c.sign);

  const followUps: Bilingual[] = knowledge.commonQuestions.slice(0, 4).map((qa) => qa.q);

  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    query: parsed,
    urgency: urgencyFlag(
      'info',
      'Educational request about condition',
      'Ombi la elimu kuhusu hali',
      'Read through, then discuss with your doctor at your next visit.',
      'Soma yote, kisha jadili na daktari wako kwenye ziara inayofuata.',
    ),
    headline: {
      en: usedFallback
        ? `${cond.surfaceForm} — related to ${knowledge.aliases.canonical_en}`
        : `${knowledge.aliases.canonical_en} — what to know`,
      sw: usedFallback
        ? `${cond.surfaceForm} — inahusiana na ${knowledge.aliases.canonical_sw}`
        : `${knowledge.aliases.canonical_sw} — yale ya kujua`,
    },
    sections,
    redFlags: redFlags.length > 0 ? redFlags : undefined,
    followUps,
    sources: knowledge.sources,
    matchConfidence: usedFallback ? 'medium' : 'high',
    resolution: usedFallback ? 'partial' : 'answered',
    disclaimer: 'standard',
  };
}

/** Resolver: explain_drug — patient asks about a drug. */
function resolveExplainDrug(parsed: ParsedQuery): TibaAnswer | null {
  const drugEntities = parsed.entities.filter((e) => e.type === 'drug');
  if (drugEntities.length === 0) return null;

  // When multiple drugs are mentioned (e.g. "rhze paracetamol salama"),
  // prefer one that actually resolves to knowledge: a direct DrugKnowledge
  // file, a parent FDC, or a condition fallback. This stops an unauthored
  // drug mentioned first from shadowing an authored one.
  const isResolvable = (id: string): boolean =>
    !!getDrug(id) ||
    (!!DRUG_PARENT_MAP[id] && !!getDrug(DRUG_PARENT_MAP[id])) ||
    (!!DRUG_TO_CONDITION_FALLBACK[id] && !!getCondition(DRUG_TO_CONDITION_FALLBACK[id]));

  const drugEntity =
    drugEntities.find((e) => isResolvable(e.id)) ?? drugEntities[0];

  // Route component drugs to their parent FDC (e.g. rifampicin → rhze)
  // when the component has no own DrugKnowledge file. This lets users ask
  // about rifampicin / isoniazid / pyrazinamide / ethambutol and get the
  // full RHZE knowledge, without duplicating content.
  let effectiveDrugId = drugEntity.id;
  if (!getDrug(effectiveDrugId)) {
    const parent = DRUG_PARENT_MAP[effectiveDrugId];
    if (parent && getDrug(parent)) effectiveDrugId = parent;
  }

  const drug = getDrug(effectiveDrugId);

  // No DrugKnowledge file and no parent FDC — try routing to a related
  // condition (e.g. IPT / 3HP / streptomycin / pyridoxine → TB) so the
  // user still gets grounded education rather than a no_match.
  if (!drug) {
    const fallbackConditionId = DRUG_TO_CONDITION_FALLBACK[drugEntity.id];
    if (fallbackConditionId) {
      const condition = getCondition(fallbackConditionId);
      if (condition) {
        return {
          id: makeId(),
          timestamp: new Date().toISOString(),
          query: parsed,
          urgency: urgencyFlag(
            'info',
            'Educational request about a TB-related medicine',
            'Ombi la elimu kuhusu dawa inayohusiana na TB',
            'Read through, and follow your DOT clinician\'s exact instructions.',
            'Soma yote, na fuata maagizo halisi ya daktari wako wa DOT.',
          ),
          headline: {
            en: `${drugEntity.surfaceForm} — related to ${condition.aliases.canonical_en}`,
            sw: `${drugEntity.surfaceForm} — inahusiana na ${condition.aliases.canonical_sw}`,
          },
          sections: [
            {
              heading: { en: 'About this', sw: 'Kuhusu hili' },
              body: {
                en: `"${drugEntity.surfaceForm}" is part of TB care. The medicine itself does not yet have a dedicated TibaAI drug page, but here is the relevant TB context — and your DOT clinician is the right person for the exact regimen and dose.`,
                sw: `"${drugEntity.surfaceForm}" ni sehemu ya huduma ya TB. Dawa yenyewe bado haina ukurasa maalum wa dawa wa TibaAI, lakini hapa kuna muktadha wa TB unaohusika — na daktari wako wa DOT ndiye sahihi kwa regimen na dose halisi.`,
                sw_mtaa: `"${drugEntity.surfaceForm}" ni sehemu ya huduma ya TB. Dawa yenyewe bado haina ukurasa maalum wa TibaAI, lakini hapa kuna muktadha wa TB unaohusika — na DOT clinician wako ndiye sahihi kwa regimen na dose halisi.`,
              },
            },
            {
              heading: { en: 'What TB is', sw: 'TB ni nini' },
              body: condition.whatItIs,
            },
            {
              heading: { en: 'Why completing care matters', sw: 'Kwa nini kumaliza huduma ni muhimu' },
              body: condition.whyItMatters,
            },
          ],
          followUps: [
            { en: 'What is TB and how is it treated?', sw: 'TB ni nini na inatibiwaje?' },
            { en: 'How does RHZE work?', sw: 'RHZE inafanya kazi vipi?' },
            { en: 'What is latent TB and preventive therapy?', sw: 'Latent TB na tiba ya kuzuia ni nini?' },
          ],
          sources: condition.sources,
          matchConfidence: 'medium',
          resolution: 'partial',
          disclaimer: 'standard',
        };
      }
    }
    return null;
  }

  const sections: AnswerSection[] = [
    {
      heading: { en: 'What it does', sw: 'Inafanya nini' },
      body: drug.whatItDoes,
    },
    {
      heading: { en: 'What it is used for', sw: 'Inatumika kwa nini' },
      body: {
        en: drug.commonUses.map((u) => `• ${u.en}`).join('\n\n'),
        sw: drug.commonUses.map((u) => `• ${u.sw}`).join('\n\n'),
        sw_mtaa: drug.commonUses.map((u) => `• ${u.sw_mtaa ?? u.sw}`).join('\n\n'),
      },
    },
    {
      heading: { en: 'How it is taken', sw: 'Inakunywa vipi' },
      body: drug.howItIsTaken,
    },
    {
      heading: { en: 'Common side effects', sw: 'Madhara ya kawaida' },
      body: {
        en: drug.commonSideEffects.map((s) => `• ${s.en}`).join('\n\n'),
        sw: drug.commonSideEffects.map((s) => `• ${s.sw}`).join('\n\n'),
        sw_mtaa: drug.commonSideEffects.map((s) => `• ${s.sw_mtaa ?? s.sw}`).join('\n\n'),
      },
    },
  ];

  const redFlags = drug.seriousSideEffects.map((se) => se.effect);

  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    query: parsed,
    urgency: urgencyFlag(
      'info',
      'Educational request about medication',
      'Ombi la elimu kuhusu dawa',
      'Read through, follow your doctor\'s exact instructions for your dose.',
      'Soma yote, fuata maagizo halisi ya daktari kuhusu dose yako.',
    ),
    headline: {
      en: `${drug.aliases.canonical_en} — what to know`,
      sw: `${drug.aliases.canonical_sw} — yale ya kujua`,
    },
    sections,
    redFlags,
    followUps: [
      { en: `Can I drink alcohol with ${drug.aliases.canonical_en}?`, sw: `Naweza kunywa pombe na ${drug.aliases.canonical_sw}?` },
      { en: `Side effects of ${drug.aliases.canonical_en}`, sw: `Madhara ya ${drug.aliases.canonical_sw}` },
    ],
    sources: drug.sources,
    matchConfidence: 'high',
    resolution: 'answered',
    disclaimer: 'standard',
  };
}

/** Resolver: drug_interaction — drug + substance/another drug. */
function resolveDrugInteraction(parsed: ParsedQuery): TibaAnswer | null {
  // Prefer a drug that actually has a knowledge file (with interactions).
  const drugEntities = parsed.entities.filter((e) => e.type === 'drug');
  const drugEntity =
    drugEntities.find((e) => getDrug(e.id)) ??
    drugEntities.find((e) => DRUG_PARENT_MAP[e.id] && getDrug(DRUG_PARENT_MAP[e.id]));
  if (!drugEntity) return null;
  const drug = getDrug(drugEntity.id) ?? getDrug(DRUG_PARENT_MAP[drugEntity.id]);
  if (!drug) return null;

  // Collect every possible interaction target in the query: substances and
  // other drugs. A query can extract several substances (e.g. "vidhibiti vya
  // mimba" yields both a contraceptive and a bare pregnancy match), so we
  // search ALL of them for a real interaction entry rather than blindly
  // taking the first.
  const candidateTargetIds: string[] = [
    ...parsed.entities
      .filter((e) => e.type === 'substance')
      .map((e) => e.id),
    ...parsed.entities
      .filter((e) => e.type === 'drug' && e.id !== drugEntity.id)
      .map((e) => e.id),
  ];
  if (candidateTargetIds.length === 0) return null;

  // First pass: a target with an explicit interaction entry wins.
  let interaction = undefined as (typeof drug.interactions)[number] | undefined;
  let targetId: string | undefined;
  for (const id of candidateTargetIds) {
    const match = drug.interactions.find((i) => i.with === id);
    if (match) {
      interaction = match;
      targetId = id;
      break;
    }
  }
  // No explicit interaction on any candidate — fall back to the first
  // candidate so we can still return the informative "no specific entry" card.
  if (!targetId) targetId = candidateTargetIds[0];

  if (!interaction) {
    return {
      id: makeId(),
      timestamp: new Date().toISOString(),
      query: parsed,
      urgency: urgencyFlag(
        'routine',
        'No specific interaction noted in our database',
        'Hakuna mwingiliano maalum kwenye database yetu',
        'Discuss with your pharmacist or doctor — they can check your full medication list.',
        'Jadili na muuzaji wa dawa au daktari wako — wanaweza kuangalia orodha kamili ya dawa zako.',
      ),
      headline: {
        en: `Interaction between ${drug.aliases.canonical_en} and ${targetId}`,
        sw: `Mwingiliano kati ya ${drug.aliases.canonical_sw} na ${targetId}`,
      },
      sections: [
        {
          heading: { en: 'Information', sw: 'Taarifa' },
          body: {
            en: `Our knowledge base does not have a specific entry for ${drug.aliases.canonical_en} with ${targetId}. This does not mean it is safe or unsafe — only that we cannot give you guidance from published sources. Ask your pharmacist.`,
            sw: `Database yetu haina maelezo maalum kwa ${drug.aliases.canonical_sw} pamoja na ${targetId}. Hii haimaanishi ni salama au si salama — ni tu kwamba hatuwezi kukupa mwongozo kutoka kwa vyanzo vilivyochapishwa. Muulize muuzaji wa dawa.`,
          },
        },
      ],
      sources: drug.sources,
      matchConfidence: 'low',
      resolution: 'partial',
      disclaimer: 'strong',
    };
  }

  const sections: AnswerSection[] = [
    {
      heading: { en: 'What the evidence says', sw: 'Ushahidi unasema nini' },
      body: interaction.explanation,
    },
  ];

  // Add a lifestyle note if relevant (e.g. fasting, food)
  if (interaction.with === 'alcohol') {
    const ramadanNote = drug.lifestyleNotes.find((n) =>
      /ramadan|fasting/i.test(n.topic.en),
    );
    if (ramadanNote) {
      sections.push({
        heading: ramadanNote.topic,
        body: ramadanNote.note,
      });
    }
  }

  const urgencyLevel =
    interaction.severity === 'avoid'
      ? 'soon'
      : interaction.severity === 'caution'
        ? 'routine'
        : 'info';

  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    query: parsed,
    urgency: urgencyFlag(
      urgencyLevel,
      `${drug.aliases.canonical_en} + ${interaction.withDisplay.en}: ${interaction.severity}`,
      `${drug.aliases.canonical_sw} + ${interaction.withDisplay.sw}: ${interaction.severity}`,
      interaction.severity === 'avoid'
        ? 'Avoid this combination, or speak to your doctor first.'
        : 'Be cautious and discuss with your doctor at your next visit.',
      interaction.severity === 'avoid'
        ? 'Epuka mchanganyiko huu, au ongea na daktari wako kwanza.'
        : 'Kuwa makini na jadili na daktari wako kwenye ziara inayofuata.',
    ),
    headline: {
      en: `${drug.aliases.canonical_en} and ${interaction.withDisplay.en} — what to know`,
      sw: `${drug.aliases.canonical_sw} na ${interaction.withDisplay.sw} — yale ya kujua`,
    },
    sections,
    sources: interaction.sources,
    matchConfidence: 'high',
    resolution: 'answered',
    disclaimer: interaction.severity === 'avoid' ? 'strong' : 'standard',
  };
}

// ──────────────────────────────────────────────────────────────────────
// NO-MATCH FALLBACK
// ──────────────────────────────────────────────────────────────────────

function noMatchAnswer(parsed: ParsedQuery): TibaAnswer {
  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    query: parsed,
    urgency: urgencyFlag(
      'routine',
      'We could not match this query to our knowledge base',
      'Hatukuweza kulinganisha swali hili na database yetu',
      'Try rephrasing, or ask your doctor for a personalized answer.',
      'Jaribu kuandika kwa namna nyingine, au muulize daktari wako kwa jibu binafsi.',
    ),
    headline: {
      en: 'We did not find a clean answer to that question yet.',
      sw: 'Hatujapata jibu kamili kwa swali hilo bado.',
      sw_mtaa: 'Hatujapata jibu kamili kwa swali lako bado.',
    },
    sections: [
      {
        heading: { en: 'What we suggest', sw: 'Tunashauri' },
        body: {
          en: 'TibaHub is being built scenario by scenario. If this question is important to you, write it down and ask your doctor at your next visit. For emergencies, go to a hospital or call 114.',
          sw: 'TibaHub inajengwa hatua kwa hatua. Ikiwa swali hili ni muhimu kwako, liandike na muulize daktari wako kwenye ziara inayofuata. Kwa dharura, nenda hospitali au piga 114.',
          sw_mtaa: 'TibaHub inajengwa hatua kwa hatua. Kama swali hili ni muhimu kwako, liandike na muulize daktari kwenye ziara inayofuata. Kwa dharura, nenda hospitali au piga 114.',
        },
      },
    ],
    sources: [],
    matchConfidence: 'low',
    resolution: 'no_match',
    disclaimer: 'standard',
  };
}

// ──────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ──────────────────────────────────────────────────────────────────────

export function reason(
  parsed: ParsedQuery,
  _context?: PatientContext,
): TibaAnswer {
  // patient context will be used in later iterations for personalization
  // (e.g. drug-drug interaction check against current medications)

  switch (parsed.intent) {
    case 'explain_lab':
      // First try the value-based interpreters; if the lab was mentioned
      // without a number, fall back to routing to its parent condition.
      return (
        resolveExplainLab(parsed) ??
        resolveLabWithoutValue(parsed) ??
        resolveExplainCondition(parsed) ??
        noMatchAnswer(parsed)
      );
    case 'explain_condition':
      return resolveExplainCondition(parsed) ?? noMatchAnswer(parsed);
    case 'explain_drug':
      // If the drug has no file and no fallback, a condition entity in the
      // same query (e.g. "ipt na tb") can still carry the answer.
      return (
        resolveExplainDrug(parsed) ??
        resolveExplainCondition(parsed) ??
        noMatchAnswer(parsed)
      );
    case 'drug_interaction':
      // Interaction resolver needs a drug WITH a knowledge file. If that
      // fails (component drug, unauthored drug, mislabelled substance),
      // fall back to drug education, then condition education.
      return (
        resolveDrugInteraction(parsed) ??
        resolveExplainDrug(parsed) ??
        resolveExplainCondition(parsed) ??
        noMatchAnswer(parsed)
      );
    case 'lifestyle_question': {
      // Try as drug-interaction first (often "naweza kunywa pombe na X")
      const interactionAnswer = resolveDrugInteraction(parsed);
      if (interactionAnswer && interactionAnswer.resolution === 'answered') {
        return interactionAnswer;
      }
      // Else fall through to condition education if applicable
      return (
        resolveExplainCondition(parsed) ??
        resolveExplainDrug(parsed) ??
        noMatchAnswer(parsed)
      );
    }
    case 'general_education':
      return (
        resolveExplainCondition(parsed) ??
        resolveExplainDrug(parsed) ??
        resolveExplainLab(parsed) ??
        resolveLabWithoutValue(parsed) ??
        noMatchAnswer(parsed)
      );
    case 'symptom_education':
    case 'unknown':
    default:
      return noMatchAnswer(parsed);
  }
}
