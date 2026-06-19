/**
 * Respiratory Rate — numeric lab with AGE-ADJUSTED IMCI thresholds
 * (Phase 8 pneumonia block)
 *
 * Sources: IMCI 2024, WHO Pneumonia 2022, NTLG STG 2023, BNF current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   The IMCI definition of pneumonia in a child rests on "fast breathing"
 *   counted over a full minute, with age-specific thresholds:
 *       < 2 months   →  ≥ 60 breaths/min  is fast breathing
 *       2-11 months  →  ≥ 50 breaths/min  is fast breathing
 *       12-59 months →  ≥ 40 breaths/min  is fast breathing
 *       ≥ 5 years    →  ≥ 30 breaths/min  is adult tachypnoea
 *   These numbers are the heart of community case-finding for pneumonia
 *   in Tanzania. The interpreter must apply the right threshold for the
 *   patient's age — the same RR is "normal" at 8 weeks and "danger" at
 *   3 years.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export type RespiratoryRateContext =
  | 'pediatric_under_2mo'   // infant < 2 months
  | 'pediatric_2_11mo'      // infant 2-11 months
  | 'pediatric_1_5yr'       // child 12-59 months
  | 'adult'                 // ≥ 5 years
  | 'unknown';

export type RespiratoryRateBand =
  | 'critical_fast'   // far above the age threshold — severe distress
  | 'fast'            // crosses the IMCI fast-breathing threshold
  | 'borderline'      // upper edge of normal for age
  | 'normal';         // within normal range for age

export interface RespiratoryRateInterpretation {
  value: number;
  band: RespiratoryRateBand;
  context: RespiratoryRateContext;
  thresholdUsed: number;  // the IMCI cut-off applied for this age
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

/**
 * Returns the IMCI fast-breathing threshold for a given context.
 * Numbers from WHO IMCI 2024 chart booklet.
 */
function fastThresholdFor(context: RespiratoryRateContext): number {
  switch (context) {
    case 'pediatric_under_2mo':
      return 60;
    case 'pediatric_2_11mo':
      return 50;
    case 'pediatric_1_5yr':
      return 40;
    case 'adult':
      return 30;
    default:
      // No age context — use the most permissive adult threshold so we don't
      // raise false alarms; pediatric clarification will be prompted in the
      // narrative.
      return 30;
  }
}

/** Critical (severe distress) is typically 20% above the fast threshold. */
function criticalThresholdFor(context: RespiratoryRateContext): number {
  const t = fastThresholdFor(context);
  return Math.round(t * 1.2);
}

export function bandForRespiratoryRate(
  value: number,
  context: RespiratoryRateContext = 'unknown',
): RespiratoryRateBand {
  const fast = fastThresholdFor(context);
  const critical = criticalThresholdFor(context);
  if (value >= critical) return 'critical_fast';
  if (value >= fast) return 'fast';
  if (value >= fast - 5) return 'borderline';
  return 'normal';
}

export function interpretRespiratoryRate(
  value: number,
  context: RespiratoryRateContext = 'unknown',
): RespiratoryRateInterpretation {
  const band = bandForRespiratoryRate(value, context);
  const thresholdUsed = fastThresholdFor(context);

  // Age phrasing helpers for headlines
  const ageEn =
    context === 'pediatric_under_2mo'
      ? 'in an infant under 2 months'
      : context === 'pediatric_2_11mo'
        ? 'in an infant 2-11 months'
        : context === 'pediatric_1_5yr'
          ? 'in a child 1-5 years'
          : context === 'adult'
            ? 'in an adult'
            : '';
  const ageSw =
    context === 'pediatric_under_2mo'
      ? 'kwa mtoto chini ya miezi 2'
      : context === 'pediatric_2_11mo'
        ? 'kwa mtoto miezi 2-11'
        : context === 'pediatric_1_5yr'
          ? 'kwa mtoto miaka 1-5'
          : context === 'adult'
            ? 'kwa mtu mzima'
            : '';

  // ── CRITICAL FAST ───────────────────────────────────────────────────
  if (band === 'critical_fast') {
    return {
      value,
      band,
      context,
      thresholdUsed,
      headline: {
        en: `Respiratory rate ${value}/min ${ageEn} — markedly fast, severe respiratory distress`,
        sw: `Kasi ya kupumua ${value}/dakika ${ageSw} — haraka sana, dhiki kali ya kupumua`,
        sw_mtaa: `Respiratory rate ${value}/min ${ageEn} — markedly fast, severe respiratory distress`,
      },
      meaning: {
        en: `A respiratory rate this high (well above the IMCI fast-breathing threshold of ${thresholdUsed}/min for this age group) signals severe respiratory distress. The body is working hard to compensate for low oxygen, infection, acidosis, or shock. In a child, this combined with any general danger sign (unable to drink/feed, vomiting everything, convulsions, lethargy) or chest indrawing means severe pneumonia and emergency referral. In an adult, this fast a respiratory rate is itself a sepsis criterion and demands urgent assessment regardless of the SpO2.`,
        sw: `Kasi ya kupumua ya juu kiasi hiki (juu zaidi ya kizingiti cha IMCI cha kupumua haraka cha ${thresholdUsed}/dakika kwa kundi hili la umri) inaashiria dhiki kali ya kupumua. Mwili unafanya kazi kwa nguvu kufidia oksijeni ya chini, maambukizi, acidosis, au shock. Kwa mtoto, hii pamoja na dalili yoyote ya jumla ya hatari (kushindwa kunywa/kula, kutapika kila kitu, kifafa, ulegevu) au kifua kuingia ndani inamaanisha nimonia kali na rufaa ya dharura. Kwa mtu mzima, kasi hii ya kupumua yenyewe ni kigezo cha sepsis na inahitaji tathmini ya haraka bila kujali SpO2.`,
        sw_mtaa: `Respiratory rate ya juu kiasi hiki (juu zaidi ya IMCI fast-breathing threshold ya ${thresholdUsed}/min kwa age group hii) inaashiria severe respiratory distress. Body inafanya kazi kwa nguvu kufidia low oxygen, infection, acidosis, au shock. Kwa mtoto, hii pamoja na general danger sign yoyote (unable kunywa/kula, kutapika kila kitu, convulsions, lethargy) au chest indrawing inamaanisha severe pneumonia na emergency referral. Kwa adult, fast respiratory rate hii yenyewe ni sepsis criterion na inahitaji urgent assessment regardless ya SpO2.`,
      },
      nextSteps: {
        en: 'EMERGENCY: same-hour facility assessment. Start oxygen if SpO2 < 90% and oxygen is available. Look for and treat the underlying cause (pneumonia, asthma, sepsis, malaria, cardiac).',
        sw: 'DHARURA: tathmini ya kituoni katika saa ile ile. Anza oksijeni ikiwa SpO2 < 90% na oksijeni inapatikana. Tafuta na utibu sababu ya msingi (nimonia, pumu, sepsis, malaria, moyo).',
        sw_mtaa: 'DHARURA: same-hour facility assessment. Anza oxygen ikiwa SpO2 < 90% na oxygen inapatikana. Look for na tibu underlying cause (pneumonia, asthma, sepsis, malaria, cardiac).',
      },
      urgency: 'emergency',
    };
  }

  // ── FAST (crosses IMCI threshold) ───────────────────────────────────
  if (band === 'fast') {
    if (
      context === 'pediatric_under_2mo' ||
      context === 'pediatric_2_11mo' ||
      context === 'pediatric_1_5yr'
    ) {
      return {
        value,
        band,
        context,
        thresholdUsed,
        headline: {
          en: `Respiratory rate ${value}/min — crosses IMCI fast-breathing threshold (${thresholdUsed}/min) for this age, pneumonia screening positive`,
          sw: `Kasi ya kupumua ${value}/dakika — inavuka kizingiti cha IMCI cha kupumua haraka (${thresholdUsed}/dakika) kwa umri huu, uchunguzi wa nimonia ni chanya`,
          sw_mtaa: `Respiratory rate ${value}/min — inavuka IMCI fast-breathing threshold (${thresholdUsed}/min) kwa age hii, pneumonia screening positive`,
        },
        meaning: {
          en: `By the IMCI rule, a child of this age with cough or difficulty breathing AND a respiratory rate at or above ${thresholdUsed}/min has pneumonia. The next step is the danger-sign check: any general danger sign (unable to drink, vomiting everything, convulsions, lethargy) or any chest indrawing escalates this from "pneumonia, treat at home" to "severe pneumonia, refer urgently with oxygen." Without those signs, oral amoxicillin dispersible tablets for 5 days plus home advice and a 2-day follow-up review is the IMCI pathway.`,
          sw: `Kwa mwongozo wa IMCI, mtoto wa umri huu mwenye kikohozi au ugumu wa kupumua NA kasi ya kupumua kwenye au juu ya ${thresholdUsed}/dakika ana nimonia. Hatua inayofuata ni ukaguzi wa dalili za hatari: dalili yoyote ya jumla ya hatari (kushindwa kunywa, kutapika kila kitu, kifafa, ulegevu) au kifua kuingia ndani huinua hii kutoka "nimonia, tibu nyumbani" hadi "nimonia kali, rejea kwa haraka pamoja na oksijeni." Bila dalili hizo, amoxicillin dispersible tablets za kumeza kwa siku 5 pamoja na ushauri wa nyumbani na mapitio ya kufuatilia ya siku 2 ndio njia ya IMCI.`,
          sw_mtaa: `Kwa IMCI rule, mtoto wa age huu mwenye cough au difficulty breathing NA respiratory rate kwenye au juu ya ${thresholdUsed}/min ana pneumonia. Next step ni danger-sign check: general danger sign yoyote (unable kunywa, kutapika kila kitu, convulsions, lethargy) au chest indrawing inaescalate hii kutoka "pneumonia, treat at home" hadi "severe pneumonia, refer urgently na oxygen." Without those signs, oral amoxicillin dispersible tablets kwa siku 5 plus home advice na 2-day follow-up review ni IMCI pathway.`,
        },
        nextSteps: {
          en: 'Facility assessment today: confirm the diagnosis, check for danger signs and chest indrawing, measure SpO2, decide outpatient vs admission, start the right antibiotic, and book a 2-day review.',
          sw: 'Tathmini ya kituoni leo: thibitisha utambuzi, angalia dalili za hatari na kifua kuingia ndani, pima SpO2, amua nje dhidi ya kulazwa, anza antibiotic sahihi, na panga mapitio ya siku 2.',
          sw_mtaa: 'Facility assessment leo: thibitisha diagnosis, angalia danger signs na chest indrawing, pima SpO2, decide outpatient vs admission, anza right antibiotic, na panga 2-day review.',
        },
        urgency: 'urgent',
      };
    }
    return {
      value,
      band,
      context,
      thresholdUsed,
      headline: {
        en: `Respiratory rate ${value}/min in an adult — tachypnoea, important context`,
        sw: `Kasi ya kupumua ${value}/dakika kwa mtu mzima — tachypnoea, muktadha muhimu`,
        sw_mtaa: `Respiratory rate ${value}/min kwa adult — tachypnoea, important context`,
      },
      meaning: {
        en: 'A sustained respiratory rate ≥ 30/min in an adult is one of the four sepsis screening criteria (SIRS) and also one of the components of CURB-65 for pneumonia severity. By itself it can come from anxiety, exercise, or pain — but in someone with fever, cough, or breathlessness it is a marker of significant illness and warrants prompt clinical assessment.',
        sw: 'Kasi ya kupumua inayoendelea ≥ 30/dakika kwa mtu mzima ni mojawapo ya vigezo vinne vya uchunguzi wa sepsis (SIRS) na pia mojawapo ya vipengele vya CURB-65 vya ukali wa nimonia. Yenyewe inaweza kuja kutoka wasiwasi, mazoezi, au maumivu — lakini kwa mtu mwenye homa, kikohozi, au kushindwa kupumua ni alama ya ugonjwa muhimu na inahalalisha tathmini ya kliniki ya haraka.',
        sw_mtaa: 'Sustained respiratory rate ≥ 30/min kwa adult ni mojawapo ya nne sepsis screening criteria (SIRS) na pia mojawapo ya components ya CURB-65 kwa pneumonia severity. Yenyewe inaweza kuja kutoka anxiety, exercise, au pain — lakini kwa mtu mwenye fever, cough, au breathlessness ni marker ya significant illness na inawarrant prompt clinical assessment.',
      },
      nextSteps: {
        en: 'Same-day facility review for vital signs, SpO2, and assessment of the underlying cause.',
        sw: 'Mapitio ya kituoni ya siku ile ile kwa ishara muhimu, SpO2, na tathmini ya sababu ya msingi.',
        sw_mtaa: 'Same-day facility review kwa vital signs, SpO2, na assessment ya underlying cause.',
      },
      urgency: 'urgent',
    };
  }

  // ── BORDERLINE — upper edge of normal for age ───────────────────────
  if (band === 'borderline') {
    return {
      value,
      band,
      context,
      thresholdUsed,
      headline: {
        en: `Respiratory rate ${value}/min — at the upper edge of normal, recheck and watch for trend`,
        sw: `Kasi ya kupumua ${value}/dakika — kwenye ukingo wa juu wa kawaida, pima tena na angalia mwelekeo`,
        sw_mtaa: `Respiratory rate ${value}/min — kwenye upper edge ya normal, recheck na angalia trend`,
      },
      meaning: {
        en: `This is just below the IMCI fast-breathing threshold of ${thresholdUsed}/min for this age. Children breathe faster when they are crying, feeding, or active, so a single high reading does not by itself diagnose pneumonia — but it earns a recheck when the child is calm and a careful look at other signs (chest indrawing, work of breathing, feeding, hydration). The trend over the next 2-4 hours tells more than the single number.`,
        sw: `Hii iko chini tu ya kizingiti cha IMCI cha kupumua haraka cha ${thresholdUsed}/dakika kwa umri huu. Watoto hupumua haraka zaidi wanapolia, kula, au wakiwa hai, hivyo kipimo kimoja cha juu hakitambui nimonia peke yake — lakini kinastahili kupimwa tena wakati mtoto yu mtulivu na kuangalia kwa makini dalili zingine (kifua kuingia ndani, kazi ya kupumua, kulisha, hydration). Mwelekeo katika masaa 2-4 ijayo unaeleza zaidi kuliko namba moja.`,
        sw_mtaa: `Hii iko just below IMCI fast-breathing threshold ya ${thresholdUsed}/min kwa age huu. Watoto wanapumua faster wakati wanalia, wanakula, au active, hivyo single high reading haina diagnose pneumonia peke yake — lakini inastahili recheck wakati mtoto yu calm na careful look kwa other signs (chest indrawing, work of breathing, feeding, hydration). Trend katika masaa 2-4 ijayo inaeleza zaidi kuliko single number.`,
      },
      nextSteps: {
        en: 'Recheck the rate when the child is calm and not feeding. Look for any chest indrawing or other danger signs. If the rate rises further, or any danger sign appears, go in.',
        sw: 'Pima tena kasi wakati mtoto yu mtulivu na hayuko kwenye kulisha. Tazama kifua kuingia ndani au dalili nyingine za hatari. Ikiwa kasi inapanda zaidi, au dalili yoyote ya hatari inaonekana, ingia.',
        sw_mtaa: 'Recheck rate wakati mtoto yu calm na hayuko kwenye feeding. Tazama chest indrawing au other danger signs yoyote. Ikiwa rate inapanda further, au danger sign yoyote inaonekana, ingia.',
      },
      urgency: 'soon',
    };
  }

  // ── NORMAL ──────────────────────────────────────────────────────────
  return {
    value,
    band,
    context,
    thresholdUsed,
    headline: {
      en: `Respiratory rate ${value}/min — within the normal range for age`,
      sw: `Kasi ya kupumua ${value}/dakika — ndani ya kiwango cha kawaida cha umri`,
      sw_mtaa: `Respiratory rate ${value}/min — ndani ya normal range kwa age`,
    },
    meaning: {
      en: 'A respiratory rate in the normal range for age is reassuring as one piece of the assessment. It does not by itself exclude pneumonia, particularly if SpO2 is borderline or chest signs are present — but combined with a calm, well-feeding child and no danger signs, it makes pneumonia much less likely.',
      sw: 'Kasi ya kupumua katika kiwango cha kawaida cha umri ni ya kutuliza kama kipande kimoja cha tathmini. Yenyewe haiondoi nimonia, hasa ikiwa SpO2 iko borderline au dalili za kifua zipo — lakini pamoja na mtoto mtulivu, anayekula vizuri na hakuna dalili za hatari, hufanya nimonia kuwa na uwezekano mdogo zaidi.',
      sw_mtaa: 'Respiratory rate katika normal range kwa age ni reassuring kama one piece ya assessment. Yenyewe haina exclude pneumonia, particularly ikiwa SpO2 iko borderline au chest signs zipo — lakini pamoja na calm, well-feeding child na hakuna danger signs, inafanya pneumonia kuwa much less likely.',
    },
    nextSteps: {
      en: 'Routine observation. Return if breathing becomes faster, harder, or if any danger sign develops.',
      sw: 'Uangalizi wa kawaida. Rudi ikiwa kupumua kunakuwa haraka, ngumu, au dalili yoyote ya hatari inajitokeza.',
      sw_mtaa: 'Routine observation. Rudi ikiwa breathing inakuwa faster, harder, au danger sign yoyote inajitokeza.',
    },
    urgency: 'routine',
  };
}

export const RESPIRATORY_RATE: LabKnowledge = {
  id: 'respiratory_rate',
  aliases: LAB_ALIASES.respiratory_rate,
  unit: 'breaths/min',

  whatItMeasures: {
    en: 'Respiratory rate is the number of full breaths a person takes per minute, ideally counted over a full 60 seconds when the person is calm and at rest. In children, this is the single most reliable bedside sign of pneumonia — more reliable than auscultation of the chest in resource-limited settings — and the IMCI thresholds adjust by age (≥60/min under 2 months, ≥50/min 2-11 months, ≥40/min 1-5 years; in adults, ≥30/min is tachypnoea).',
    sw: 'Kasi ya kupumua ni idadi ya pumzi kamili mtu anachukua kwa dakika, kuhesabiwa kwa sekunde 60 kamili wakati mtu yu mtulivu na kupumzika. Kwa watoto, hii ni dalili moja ya kuaminika zaidi ya bedside ya nimonia — ya kuaminika zaidi kuliko auscultation ya kifua katika mazingira ya rasilimali chache — na vizingiti vya IMCI vinarekebishwa kwa umri (≥60/dakika chini ya miezi 2, ≥50/dakika miezi 2-11, ≥40/dakika miaka 1-5; kwa watu wazima, ≥30/dakika ni tachypnoea).',
    sw_mtaa: 'Respiratory rate ni number ya full breaths person inachukua kwa dakika, ideally counted over full sekunde 60 wakati person yu calm na at rest. Kwa watoto, hii ni single most reliable bedside sign ya pneumonia — more reliable kuliko auscultation ya kifua katika resource-limited settings — na IMCI thresholds zinaadjust kwa age (≥60/min chini ya miezi 2, ≥50/min miezi 2-11, ≥40/min miaka 1-5; kwa adults, ≥30/min ni tachypnoea).',
  },

  whyItsOrdered: {
    en: 'Respiratory rate is part of every vital-signs check in acute illness, and is the central screening number for IMCI pneumonia in children. It is also one of the SIRS sepsis criteria in adults and part of CURB-65 (pneumonia severity scoring). In Tanzania it is taught at every level from community health workers upward — a watch with a second hand and a calm minute is all that is needed.',
    sw: 'Kasi ya kupumua ni sehemu ya kila ukaguzi wa ishara muhimu katika ugonjwa wa papo hapo, na ni namba kuu ya uchunguzi wa nimonia ya IMCI kwa watoto. Pia ni mojawapo ya vigezo vya sepsis ya SIRS kwa watu wazima na sehemu ya CURB-65 (alama ya ukali wa nimonia). Tanzania inafundishwa katika kila ngazi kutoka kwa wafanyakazi wa afya wa jamii kuendelea — saa yenye second hand na dakika tulivu ndio yote yanahitajika.',
    sw_mtaa: 'Respiratory rate ni sehemu ya kila vital-signs check katika acute illness, na ni central screening number kwa IMCI pneumonia kwa watoto. Pia ni mojawapo ya SIRS sepsis criteria kwa adults na sehemu ya CURB-65 (pneumonia severity scoring). Tanzania inafundishwa katika kila level kutoka community health workers upward — saa yenye second hand na calm minute ndio yote inahitajika.',
  },

  ranges: [
    {
      applies: { ageMin: 0, ageMax: 2 / 12 },
      normalLow: 30,
      normalHigh: 59,
      criticalHigh: 72,
    },
    {
      applies: { ageMin: 2 / 12, ageMax: 1 },
      normalLow: 25,
      normalHigh: 49,
      criticalHigh: 60,
    },
    {
      applies: { ageMin: 1, ageMax: 5 },
      normalLow: 20,
      normalHigh: 39,
      criticalHigh: 48,
    },
    {
      applies: { ageMin: 5 },
      normalLow: 12,
      normalHigh: 29,
      criticalHigh: 36,
    },
  ],

  interpretations: [
    {
      band: 'critical_high',
      meaning: {
        en: 'Markedly above the IMCI fast-breathing threshold for age — severe respiratory distress, possible severe pneumonia or sepsis. Same-hour assessment.',
        sw: 'Juu zaidi ya kizingiti cha IMCI cha kupumua haraka kwa umri — dhiki kali ya kupumua, uwezekano wa nimonia kali au sepsis. Tathmini ya saa ile ile.',
        sw_mtaa: 'Markedly juu ya IMCI fast-breathing threshold kwa age — severe respiratory distress, possible severe pneumonia au sepsis. Same-hour assessment.',
      },
      nextSteps: {
        en: 'Emergency facility assessment now. Start oxygen if SpO2 < 90% and available.',
        sw: 'Tathmini ya kituoni ya dharura sasa. Anza oksijeni ikiwa SpO2 < 90% na inapatikana.',
        sw_mtaa: 'Emergency facility assessment sasa. Anza oxygen ikiwa SpO2 < 90% na inapatikana.',
      },
      urgency: 'emergency',
    },
    {
      band: 'high',
      meaning: {
        en: 'Crosses the IMCI fast-breathing threshold for age — pneumonia screening positive. Combine with danger-sign check and SpO2 to decide outpatient vs admission.',
        sw: 'Inavuka kizingiti cha IMCI cha kupumua haraka kwa umri — uchunguzi wa nimonia ni chanya. Changanya na ukaguzi wa dalili za hatari na SpO2 kuamua nje dhidi ya kulazwa.',
        sw_mtaa: 'Inavuka IMCI fast-breathing threshold kwa age — pneumonia screening positive. Changanya na danger-sign check na SpO2 kudecide outpatient vs admission.',
      },
      nextSteps: {
        en: 'Same-day facility assessment with full IMCI workup.',
        sw: 'Tathmini ya kituoni ya siku ile ile na IMCI workup kamili.',
        sw_mtaa: 'Same-day facility assessment na full IMCI workup.',
      },
      urgency: 'urgent',
    },
    {
      band: 'normal',
      meaning: {
        en: 'Within the normal range for age. Reassuring, though it does not by itself exclude pneumonia.',
        sw: 'Ndani ya kiwango cha kawaida cha umri. Inatuliza, ingawa yenyewe haiondoi nimonia.',
        sw_mtaa: 'Ndani ya normal range kwa age. Reassuring, ingawa yenyewe haina exclude pneumonia.',
      },
      nextSteps: {
        en: 'Routine observation. Return if breathing speeds up, becomes laboured, or any danger sign appears.',
        sw: 'Uangalizi wa kawaida. Rudi ikiwa kupumua kunakuwa haraka, kunakuwa kwa nguvu, au dalili yoyote ya hatari inaonekana.',
        sw_mtaa: 'Routine observation. Rudi ikiwa breathing inakuwa faster, laboured, au danger sign yoyote inaonekana.',
      },
      urgency: 'routine',
    },
  ],

  sources: [
    src('IMCI_2024'),
    src('WHO_PNEUMONIA_2022'),
    src('NTLG_STG_2023'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
