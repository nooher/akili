/**
 * Peak Flow (PEF / PEFR) — Phase 9 asthma block
 *
 * Sources: WHO PEN 2020, NTLG STG 2023, GINA-aligned guidance acknowledged
 *          via NTLG STG, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   PEFR is the simple bedside / home measurement of asthma control — a
 *   one-second forced exhale through a peak flow meter. The challenge with
 *   PEFR (unlike SpO2) is that absolute numbers are meaningless without
 *   reference: a "predicted normal" depends on height, age, and sex, and
 *   varies between individuals. The right framework is the patient's own
 *   "personal best" (highest stable reading when well, taken three times
 *   daily for two weeks). Readings are then interpreted as a PERCENTAGE
 *   of personal best, in the classic green / yellow / red traffic-light
 *   zone system from the asthma action plan:
 *     • Green  ≥ 80% personal best  — under control, continue plan
 *     • Yellow 50-79% personal best — exacerbation starting, step up
 *     • Red    < 50% personal best  — severe attack, emergency action
 *
 * What this interpreter does:
 *   Given a numeric peak flow value AND a context describing what fraction
 *   of personal best it represents (or whether personal best is unknown),
 *   produce a band, headline, meaning, next-steps, and urgency.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export type PeakFlowContext =
  | 'personal_best_known'    // patient knows their personal best — we have a %
  | 'no_personal_best'       // raw value only — interpret cautiously vs predicted
  | 'unknown';

export type PeakFlowBand =
  | 'red'        // < 50% personal best — severe attack
  | 'yellow'     // 50-79% personal best — exacerbation starting
  | 'green';     // ≥ 80% personal best — controlled

export interface PeakFlowInterpretation {
  value: number;
  percentOfBest?: number;
  band: PeakFlowBand;
  context: PeakFlowContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

/**
 * Determine zone from % of personal best. Standard GINA/asthma action
 * plan traffic-light system.
 */
export function bandForPeakFlow(percentOfBest: number): PeakFlowBand {
  if (percentOfBest < 50) return 'red';
  if (percentOfBest < 80) return 'yellow';
  return 'green';
}

export function interpretPeakFlow(
  value: number,
  context: PeakFlowContext = 'unknown',
  personalBest?: number,
): PeakFlowInterpretation {
  // If we have personal best, compute percentage and use bands.
  if (
    context === 'personal_best_known' &&
    personalBest &&
    personalBest > 0
  ) {
    const percentOfBest = Math.round((value / personalBest) * 100);
    const band = bandForPeakFlow(percentOfBest);

    if (band === 'red') {
      return {
        value,
        percentOfBest,
        band,
        context,
        headline: {
          en: `Peak flow ${value} L/min — RED ZONE (${percentOfBest}% of personal best)`,
          sw: `Peak flow ${value} L/min — ENEO LA NYEKUNDU (${percentOfBest}% ya bora binafsi)`,
          sw_mtaa: `Peak flow ${value} L/min — RED ZONE (${percentOfBest}% ya personal best)`,
        },
        meaning: {
          en: 'A peak flow below 50% of personal best is a severe asthma attack — the airways are dramatically narrowed and the patient needs urgent treatment. Do not wait for symptoms to get any worse.',
          sw: 'Peak flow chini ya 50% ya bora binafsi ni shambulizi kali la pumu — njia za hewa zimepungua sana na mgonjwa anahitaji matibabu ya haraka. Usisubiri dalili kuwa mbaya zaidi.',
          sw_mtaa: 'Peak flow chini ya 50% ya personal best ni severe asthma attack — airways zimepungua dramatically na patient anahitaji urgent treatment. Usisubiri symptoms kuwa worse.',
        },
        nextSteps: {
          en: 'Take reliever (salbutamol) immediately — 4-10 puffs through spacer, repeated every 20 minutes. Start oral prednisolone if available per action plan. Go to hospital NOW; do not drive yourself.',
          sw: 'Chukua reliever (salbutamol) mara moja — puffs 4-10 kupitia spacer, kurudia kila dakika 20. Anza prednisolone ya kumeza ikiwa inapatikana kwa mpango wa kitendo. Nenda hospitali SASA; usijiendeshe mwenyewe.',
          sw_mtaa: 'Chukua reliever (salbutamol) immediately — 4-10 puffs through spacer, repeated kila dakika 20. Anza oral prednisolone ikiwa inapatikana per action plan. Nenda hospitali SASA; usijiendeshe mwenyewe.',
        },
        urgency: 'emergency',
      };
    }

    if (band === 'yellow') {
      return {
        value,
        percentOfBest,
        band,
        context,
        headline: {
          en: `Peak flow ${value} L/min — YELLOW ZONE (${percentOfBest}% of personal best)`,
          sw: `Peak flow ${value} L/min — ENEO LA NJANO (${percentOfBest}% ya bora binafsi)`,
          sw_mtaa: `Peak flow ${value} L/min — YELLOW ZONE (${percentOfBest}% ya personal best)`,
        },
        meaning: {
          en: 'A peak flow at 50-79% of personal best means control is slipping — an exacerbation is starting or has started, even if symptoms still feel mild. This is the moment to act, NOT to wait.',
          sw: 'Peak flow katika 50-79% ya bora binafsi inamaanisha udhibiti unaporomoka — exacerbation inaanza au imeanza, hata kama dalili bado zinajihisi ndogo. Huu ni wakati wa kutenda, SIO kusubiri.',
          sw_mtaa: 'Peak flow katika 50-79% ya personal best inamaanisha control inaporomoka — exacerbation inaanza au imeanza, hata kama symptoms bado zinajihisi mild. Huu ni wakati wa kutenda, SIO kusubiri.',
        },
        nextSteps: {
          en: 'Step up treatment per asthma action plan: more frequent reliever, possibly start oral prednisolone, contact the clinic the same day. Repeat peak flow every few hours — if dropping into the red zone, go in urgently.',
          sw: 'Panda matibabu kwa mpango wa kitendo wa pumu: reliever ya mara nyingi zaidi, labda anza prednisolone ya kumeza, wasiliana na kliniki siku hiyo hiyo. Rudia peak flow kila masaa machache — ikishuka kwenye eneo la nyekundu, ingia haraka.',
          sw_mtaa: 'Step up treatment per asthma action plan: more frequent reliever, possibly anza oral prednisolone, contact clinic siku hiyo hiyo. Repeat peak flow kila hours chache — ikishuka kwenye red zone, ingia urgently.',
        },
        urgency: 'urgent',
      };
    }

    // GREEN
    return {
      value,
      percentOfBest,
      band,
      context,
      headline: {
        en: `Peak flow ${value} L/min — GREEN ZONE (${percentOfBest}% of personal best)`,
        sw: `Peak flow ${value} L/min — ENEO LA KIJANI (${percentOfBest}% ya bora binafsi)`,
        sw_mtaa: `Peak flow ${value} L/min — GREEN ZONE (${percentOfBest}% ya personal best)`,
      },
      meaning: {
        en: 'A peak flow at 80% or more of personal best means asthma is well controlled today. Continue the regular plan; this is what control looks like.',
        sw: 'Peak flow katika 80% au zaidi ya bora binafsi inamaanisha pumu inadhibitiwa vizuri leo. Endelea na mpango wa kawaida; hivi ndivyo udhibiti unavyoonekana.',
        sw_mtaa: 'Peak flow katika 80% au zaidi ya personal best inamaanisha pumu inadhibitiwa vizuri leo. Continue na regular plan; hivi ndivyo control inavyoonekana.',
      },
      nextSteps: {
        en: 'Continue the daily controller and reliever as prescribed. Keep tracking — a sudden drop is the earliest warning of trouble.',
        sw: 'Endelea na controller na reliever ya kila siku kama ulivyoandikiwa. Endelea kufuatilia — kushuka ghafla ni onyo la mapema zaidi la matatizo.',
        sw_mtaa: 'Continue daily controller na reliever kama ulivyoprescribed. Keep tracking — sudden drop ni earliest warning ya trouble.',
      },
      urgency: 'routine',
    };
  }

  // No personal best — provide qualitative cautious framing based on raw value.
  // Adult average personal best ranges roughly 350-650 L/min depending on
  // height/age/sex. Children much lower (100-400 L/min). We are conservative
  // and refuse to over-interpret bare numbers.
  return {
    value,
    band: 'yellow', // default cautious — value alone is not enough
    context,
    headline: {
      en: `Peak flow ${value} L/min — context-limited reading`,
      sw: `Peak flow ${value} L/min — kipimo cha muktadha mdogo`,
      sw_mtaa: `Peak flow ${value} L/min — context-limited reading`,
    },
    meaning: {
      en: 'A peak flow value alone — without knowing your personal best — is hard to interpret. A reading that is normal for one person is severe asthma for another, because predicted normals depend on height, age, and sex. The most useful pattern is the trend in your own readings over days, not a single absolute number.',
      sw: 'Thamani ya peak flow pekee — bila kujua bora yako binafsi — ni vigumu kuchunguza. Kipimo ambacho ni cha kawaida kwa mtu mmoja ni pumu kali kwa mwingine, kwa sababu thamani za kawaida za kutabiriwa zinategemea urefu, umri, na jinsia. Mfumo muhimu zaidi ni mwelekeo katika vipimo vyako mwenyewe kwa siku, sio nambari moja kamili.',
      sw_mtaa: 'Peak flow value pekee — bila kujua personal best yako — ni hard ku-interpret. Reading ambayo ni normal kwa mtu mmoja ni severe asthma kwa mwingine, kwa sababu predicted normals zinategemea height, age, na sex. Most useful pattern ni trend katika readings zako mwenyewe over siku, sio single absolute number.',
    },
    nextSteps: {
      en: 'Establish your personal best by taking peak flow three times a day for two weeks when asthma is well controlled — the highest stable reading is your "best." Then track future readings as a percentage of that. If you have symptoms now, treat them based on symptoms (reliever, action plan) and have peak flow checked at the clinic.',
      sw: 'Anzisha bora yako binafsi kwa kuchukua peak flow mara tatu kwa siku kwa wiki mbili wakati pumu imedhibitiwa vizuri — kipimo cha juu zaidi cha kudumu ni "bora" yako. Kisha fuatilia vipimo vya baadaye kama asilimia ya hiyo. Ikiwa una dalili sasa, zitibu kulingana na dalili (reliever, mpango wa kitendo) na peak flow ichunguzwe kliniki.',
      sw_mtaa: 'Establish personal best yako kwa kuchukua peak flow mara tatu kwa siku kwa wiki mbili wakati asthma imedhibitiwa vizuri — highest stable reading ni "best" yako. Kisha track future readings kama percentage ya hiyo. Ikiwa una symptoms sasa, treat based on symptoms (reliever, action plan) na peak flow ichunguzwe kliniki.',
    },
    urgency: 'soon',
  };
}

export const PEAK_FLOW: LabKnowledge = {
  id: 'peak_flow',
  aliases: LAB_ALIASES.peak_flow,
  unit: 'L/min',

  whatItMeasures: {
    en: 'Peak flow (PEF / PEFR) measures how fast you can blow air OUT of your lungs in the first 100 milliseconds of a hard, fast exhale. It is measured by blowing once, as hard and fast as you can, into a peak flow meter — a simple plastic tube with a sliding scale. The reading reflects how open your large airways are. In asthma, when the airways are narrowed by inflammation and spasm, the air comes out more slowly and the peak flow falls. When the asthma is well controlled, the peak flow recovers.',
    sw: 'Peak flow (PEF / PEFR) hupima jinsi unavyoweza kupiga hewa NJE ya mapafu yako haraka katika milisekunde 100 za kwanza za pumzi ngumu na ya haraka. Inapimwa kwa kupiga mara moja, kwa nguvu na haraka kadri uwezavyo, kwenye peak flow meter — mrija rahisi wa plastiki wenye kipimo cha kuteleza. Kipimo kinaonyesha jinsi njia zako kubwa za hewa zilivyofunguliwa. Katika pumu, wakati njia za hewa zimepungua na uvimbe na spasm, hewa hutoka polepole zaidi na peak flow hushuka. Pumu inapodhibitiwa vizuri, peak flow hupona.',
    sw_mtaa: 'Peak flow (PEF / PEFR) inapima how fast unaweza kupiga air OUT ya lungs yako katika first 100 milliseconds ya hard, fast exhale. Inapimwa kwa kupiga mara moja, hard na fast kadri unavyoweza, kwenye peak flow meter — simple plastic tube yenye sliding scale. Reading inareflect how open large airways zako ziko. Katika pumu, wakati airways zimepungua na inflammation na spasm, air inatoka slowly zaidi na peak flow inashuka. Asthma inapodhibitiwa vizuri, peak flow inarecover.',
  },

  whyItsOrdered: {
    en: 'Peak flow is used in three settings. First, at home as part of an asthma action plan — daily or twice-daily readings give early warning of an exacerbation, often before symptoms peak, so treatment can be stepped up early. Second, in the clinic during an acute asthma attack to objectively measure severity and response to treatment. Third, occupationally — to identify work-related asthma by comparing readings at home versus at work. Critical caveat: the absolute number means very little without comparison to that person\'s personal best. A reading of 350 L/min could be normal for one adult and severe asthma for another. Establish personal best when asthma is stable, then track changes from there.',
    sw: 'Peak flow hutumika katika mazingira matatu. Kwanza, nyumbani kama sehemu ya mpango wa kitendo wa pumu — vipimo vya kila siku au mara mbili kwa siku hutoa onyo la mapema la exacerbation, mara nyingi kabla ya dalili kilele, ili matibabu yapande mapema. Pili, kliniki wakati wa shambulizi la papo hapo la pumu kupima kwa malengo ukali na jibu kwa matibabu. Tatu, kazini — kutambua pumu inayohusiana na kazi kwa kulinganisha vipimo nyumbani dhidi ya kazini. Tahadhari muhimu: nambari kamili haina maana sana bila kulinganisha na bora binafsi ya mtu huyo. Kipimo cha 350 L/min kinaweza kuwa cha kawaida kwa mtu mzima mmoja na pumu kali kwa mwingine. Anzisha bora binafsi wakati pumu imeimara, kisha fuatilia mabadiliko kutoka hapo.',
    sw_mtaa: 'Peak flow inatumika katika settings tatu. First, nyumbani kama sehemu ya asthma action plan — daily au twice-daily readings zinatoa early warning ya exacerbation, mara nyingi kabla ya symptoms kupeak, ili treatment istep up early. Second, katika kliniki during acute asthma attack ku-objectively measure severity na response to treatment. Third, occupationally — kutambua work-related asthma kwa kulinganisha readings nyumbani vs kazini. Critical caveat: absolute number haina meaning sana without comparison kwa person\'s personal best. Reading ya 350 L/min inaweza kuwa normal kwa adult mmoja na severe asthma kwa mwingine. Establish personal best wakati asthma iko stable, kisha track changes kutoka hapo.',
  },

  ranges: [
    {
      // Adult male predicted (height- and age-dependent — these are
      // illustrative midpoints, NOT diagnostic thresholds)
      applies: { sex: 'M', ageMin: 18 },
      normalLow: 450,
      normalHigh: 650,
    },
    {
      applies: { sex: 'F', ageMin: 18 },
      normalLow: 350,
      normalHigh: 500,
    },
    {
      // Pediatric — height-dependent; further illustrative
      applies: { sex: 'any', ageMin: 5, ageMax: 17 },
      normalLow: 150,
      normalHigh: 400,
    },
  ],

  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'Peak flow below 50% of personal best is the red zone — a severe asthma attack. The airways are dramatically narrowed regardless of how the patient looks. Urgent treatment needed.',
        sw: 'Peak flow chini ya 50% ya bora binafsi ni eneo la nyekundu — shambulizi kali la pumu. Njia za hewa zimepungua dramatically bila kujali jinsi mgonjwa anavyoonekana. Matibabu ya haraka yanahitajika.',
        sw_mtaa: 'Peak flow chini ya 50% ya personal best ni red zone — severe asthma attack. Airways zimepungua dramatically regardless ya jinsi patient anavyoonekana. Urgent treatment inahitajika.',
      },
      nextSteps: {
        en: 'Salbutamol immediately (4-10 puffs through spacer, repeat every 20 minutes), start oral prednisolone if available, go to hospital NOW.',
        sw: 'Salbutamol mara moja (puffs 4-10 kupitia spacer, rudia kila dakika 20), anza prednisolone ya kumeza ikiwa inapatikana, nenda hospitali SASA.',
        sw_mtaa: 'Salbutamol immediately (4-10 puffs through spacer, repeat kila dakika 20), anza oral prednisolone ikiwa inapatikana, nenda hospitali SASA.',
      },
      urgency: 'emergency',
    },
    {
      band: 'low',
      meaning: {
        en: 'Peak flow 50-79% of personal best is the yellow zone — an exacerbation is starting. Symptoms may still feel mild but control has slipped and this is the moment to act, not to wait.',
        sw: 'Peak flow 50-79% ya bora binafsi ni eneo la njano — exacerbation inaanza. Dalili zinaweza bado kujihisi ndogo lakini udhibiti umeporomoka na huu ni wakati wa kutenda, sio kusubiri.',
        sw_mtaa: 'Peak flow 50-79% ya personal best ni yellow zone — exacerbation inaanza. Symptoms zinaweza bado kujihisi mild lakini control imeporomoka na huu ni wakati wa kutenda, sio kusubiri.',
      },
      nextSteps: {
        en: 'Step up per action plan — more frequent reliever, consider starting oral prednisolone, contact clinic the same day, repeat peak flow every few hours.',
        sw: 'Panda kwa mpango wa kitendo — reliever ya mara nyingi zaidi, fikiria kuanza prednisolone ya kumeza, wasiliana na kliniki siku hiyo hiyo, rudia peak flow kila masaa machache.',
        sw_mtaa: 'Step up per action plan — more frequent reliever, consider kuanza oral prednisolone, contact clinic siku hiyo hiyo, repeat peak flow kila hours chache.',
      },
      urgency: 'urgent',
    },
    {
      band: 'normal',
      meaning: {
        en: 'Peak flow at or above 80% of personal best is the green zone — asthma is well controlled today. Continue the regular plan.',
        sw: 'Peak flow katika au juu ya 80% ya bora binafsi ni eneo la kijani — pumu inadhibitiwa vizuri leo. Endelea na mpango wa kawaida.',
        sw_mtaa: 'Peak flow katika au juu ya 80% ya personal best ni green zone — asthma inadhibitiwa vizuri leo. Continue na regular plan.',
      },
      nextSteps: {
        en: 'Continue daily controller and reliever as prescribed; keep tracking trend rather than single readings.',
        sw: 'Endelea na controller na reliever ya kila siku kama ulivyoandikiwa; endelea kufuatilia mwelekeo badala ya vipimo vya pekee.',
        sw_mtaa: 'Continue daily controller na reliever kama ulivyoprescribed; keep tracking trend badala ya single readings.',
      },
      urgency: 'routine',
    },
  ],

  sources: [
    src('WHO_PEN_2020'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
