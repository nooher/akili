/**
 * Spirometry — Phase 10 COPD block
 *
 * Sources: GOLD 2025, WHO PEN 2020, NTLG STG 2023, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Spirometry is the diagnostic test for COPD (and an important supporting
 *   test in asthma). Two key numbers come out of it:
 *     • FEV1/FVC ratio — the post-bronchodilator ratio defines obstruction.
 *       < 0.7 is the GOLD threshold for COPD.
 *     • FEV1 percent predicted — what fraction of the patient's expected
 *       (height/age/sex-predicted) lung function they actually have.
 *       Drives GOLD stage 1-4.
 *
 *   The numeric interpreter here drives off FEV1 % predicted (the staging
 *   number), with optional FEV1/FVC context to confirm the COPD diagnosis.
 *
 *   GOLD severity stages by post-bronchodilator FEV1 % predicted
 *   (only valid AFTER confirming FEV1/FVC < 0.7):
 *     • Stage 1 (mild)        FEV1 ≥ 80% predicted
 *     • Stage 2 (moderate)    50% ≤ FEV1 < 80% predicted
 *     • Stage 3 (severe)      30% ≤ FEV1 < 50% predicted
 *     • Stage 4 (very severe) FEV1 < 30% predicted
 *
 *   Tanzanian context: spirometry is more available in district and
 *   referral hospitals than at health-centre level. The interpreter is
 *   intentionally cautious — if the user shares only FEV1 % without
 *   confirming the post-bronchodilator ratio, we say so.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export type SpirometryContext =
  | 'post_bronchodilator_obstructed'   // FEV1/FVC < 0.7 confirmed
  | 'post_bronchodilator_normal'        // FEV1/FVC ≥ 0.7 (not COPD)
  | 'unknown';                          // ratio not provided

export type SpirometryStage =
  | 'gold_1' | 'gold_2' | 'gold_3' | 'gold_4'
  | 'not_copd' | 'context_needed';

export interface SpirometryInterpretation {
  fev1Predicted: number;
  stage: SpirometryStage;
  context: SpirometryContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

export function stageForFev1(fev1Predicted: number): 'gold_1' | 'gold_2' | 'gold_3' | 'gold_4' {
  if (fev1Predicted >= 80) return 'gold_1';
  if (fev1Predicted >= 50) return 'gold_2';
  if (fev1Predicted >= 30) return 'gold_3';
  return 'gold_4';
}

export function interpretSpirometry(
  fev1Predicted: number,
  context: SpirometryContext,
): SpirometryInterpretation {
  // If we know the ratio is NOT obstructive (≥ 0.7) — then by definition
  // this is not COPD, regardless of the FEV1 % predicted number.
  if (context === 'post_bronchodilator_normal') {
    return {
      fev1Predicted,
      stage: 'not_copd',
      context,
      headline: {
        en: `FEV1 ${fev1Predicted}% predicted with normal FEV1/FVC — not obstructive`,
        sw: `FEV1 ${fev1Predicted}% iliyotabiriwa na FEV1/FVC ya kawaida — sio ya kuziba`,
        sw_mtaa: `FEV1 ${fev1Predicted}% predicted na normal FEV1/FVC — sio obstructive`,
      },
      meaning: {
        en: 'A normal post-bronchodilator FEV1/FVC ratio (≥ 0.7) rules out COPD by definition, even if FEV1 % predicted is reduced. A low FEV1 with a preserved ratio suggests restrictive disease (interstitial lung disease, chest-wall problem, neuromuscular disease) or a measurement issue, not COPD.',
        sw: 'FEV1/FVC ratio ya kawaida baada ya bronchodilator (≥ 0.7) huondoa COPD kwa ufafanuzi, hata ikiwa FEV1 % iliyotabiriwa imepunguzwa. FEV1 ya chini na ratio iliyohifadhiwa inaashiria ugonjwa wa restrictive (ugonjwa wa interstitial wa mapafu, shida ya ukuta wa kifua, ugonjwa wa neuromuscular) au tatizo la kipimo, sio COPD.',
        sw_mtaa: 'Normal post-bronchodilator FEV1/FVC ratio (≥ 0.7) inarule out COPD by definition, hata ikiwa FEV1 % predicted ime-reduced. Low FEV1 na preserved ratio inasuggest restrictive disease (interstitial lung disease, chest-wall problem, neuromuscular disease) au measurement issue, sio COPD.',
      },
      nextSteps: {
        en: 'If COPD was the working diagnosis, reconsider — restrictive pattern needs a different workup (chest imaging, full lung volumes if available, referral). Discuss results with your clinician.',
        sw: 'Ikiwa COPD ilikuwa utambuzi wa kufanya kazi, fikiria upya — muundo wa restrictive unahitaji uchunguzi tofauti (picha za kifua, ujazo kamili wa mapafu ikiwa unapatikana, rufaa). Jadili matokeo na daktari wako.',
        sw_mtaa: 'Ikiwa COPD ilikuwa working diagnosis, reconsider — restrictive pattern inahitaji different workup (chest imaging, full lung volumes ikiwa inapatikana, referral). Discuss matokeo na clinician wako.',
      },
      urgency: 'routine',
    };
  }

  // If we don't have the ratio confirmed, flag that the COPD label is
  // not yet established — we can still describe what the FEV1 % implies
  // IF the ratio is obstructive, but we won't call it COPD on its own.
  if (context === 'unknown') {
    return {
      fev1Predicted,
      stage: 'context_needed',
      context,
      headline: {
        en: `FEV1 ${fev1Predicted}% predicted — FEV1/FVC ratio needed to interpret`,
        sw: `FEV1 ${fev1Predicted}% iliyotabiriwa — FEV1/FVC ratio inahitajika kutafsiri`,
        sw_mtaa: `FEV1 ${fev1Predicted}% predicted — FEV1/FVC ratio inahitajika ku-interpret`,
      },
      meaning: {
        en: 'FEV1 percent predicted alone is not enough to diagnose COPD. The defining number is the post-bronchodilator FEV1/FVC ratio: < 0.7 confirms airflow obstruction (COPD by GOLD), ≥ 0.7 rules COPD out. Without the ratio, the FEV1 number cannot be staged as GOLD severity.',
        sw: 'FEV1 percent iliyotabiriwa peke yake haitoshi kutambua COPD. Nambari inayofafanua ni FEV1/FVC ratio baada ya bronchodilator: < 0.7 inathibitisha kuziba kwa mtiririko wa hewa (COPD kwa GOLD), ≥ 0.7 inaondoa COPD. Bila ratio, nambari ya FEV1 haiwezi kupewa hatua kama ukali wa GOLD.',
        sw_mtaa: 'FEV1 percent predicted peke yake haitoshi kudiagnose COPD. Defining number ni post-bronchodilator FEV1/FVC ratio: < 0.7 inaconfirm airflow obstruction (COPD by GOLD), ≥ 0.7 inarule out COPD. Without ratio, FEV1 number haiwezi kupewa stage kama GOLD severity.',
      },
      nextSteps: {
        en: 'Ask the clinic for the full spirometry report — both FEV1 % predicted and FEV1/FVC ratio, ideally post-bronchodilator. If the ratio is obstructive (< 0.7), the FEV1 % then gives the GOLD stage.',
        sw: 'Omba kliniki ripoti kamili ya spirometry — FEV1 % iliyotabiriwa na FEV1/FVC ratio, ikiwa bora baada ya bronchodilator. Ikiwa ratio ni ya kuziba (< 0.7), FEV1 % kisha inatoa hatua ya GOLD.',
        sw_mtaa: 'Omba kliniki kwa full spirometry report — both FEV1 % predicted na FEV1/FVC ratio, ideally post-bronchodilator. Ikiwa ratio ni obstructive (< 0.7), FEV1 % kisha inatoa GOLD stage.',
      },
      urgency: 'routine',
    };
  }

  // Obstructive — confirm COPD, then stage by FEV1 % predicted.
  const stage = stageForFev1(fev1Predicted);

  if (stage === 'gold_1') {
    return {
      fev1Predicted,
      stage,
      context,
      headline: {
        en: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 1 (Mild COPD)`,
        sw: `FEV1 ${fev1Predicted}% iliyotabiriwa — Hatua 1 ya GOLD (COPD Ndogo)`,
        sw_mtaa: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 1 (Mild COPD)`,
      },
      meaning: {
        en: 'Mild COPD — the obstruction is confirmed but lung function is at or above 80% of predicted. Symptoms may be limited to a chronic cough or mild breathlessness with significant exertion. This is the stage where smoking cessation and biomass-exposure reduction have the highest payoff for protecting future lung function.',
        sw: 'COPD ndogo — kuziba kumethibitishwa lakini utendaji wa mapafu uko katika au juu ya 80% ya iliyotabiriwa. Dalili zinaweza kuwa na kikomo katika kikohozi sugu au kushindwa kupumua kidogo kwa juhudi kubwa. Hii ndio hatua ambapo kuacha kuvuta sigara na kupunguza mfiduo wa nishati ya kuni vina faida ya juu zaidi ya kulinda utendaji wa mapafu ujao.',
        sw_mtaa: 'Mild COPD — obstruction imeconfirmed lakini lung function iko at au above 80% of predicted. Symptoms zinaweza kuwa limited kwa chronic cough au mild breathlessness na significant exertion. Hii ni stage ambapo smoking cessation na biomass-exposure reduction zina highest payoff kwa kuprotect future lung function.',
      },
      nextSteps: {
        en: 'Smoking cessation is the priority. Reduce biomass-fuel exposure. Start a short-acting reliever as needed; long-acting bronchodilator is usually not yet required at this stage unless symptoms warrant it. Vaccinate (influenza annually, pneumococcal). Encourage regular walking. Review in 6-12 months.',
        sw: 'Kuacha kuvuta sigara ni kipaumbele. Punguza mfiduo wa nishati ya kuni. Anza reliever ya muda mfupi inapohitajika; bronchodilator ya muda mrefu kawaida bado haihitajiki katika hatua hii isipokuwa dalili zinaihitaji. Chanja (influenza kila mwaka, pneumococcal). Himiza matembezi ya kawaida. Pitia katika miezi 6-12.',
        sw_mtaa: 'Smoking cessation ni priority. Reduce biomass-fuel exposure. Start short-acting reliever as needed; long-acting bronchodilator kawaida bado hairequired katika stage hii unless symptoms zinawarrant it. Vaccinate (influenza annually, pneumococcal). Encourage regular walking. Review katika miezi 6-12.',
      },
      urgency: 'routine',
    };
  }

  if (stage === 'gold_2') {
    return {
      fev1Predicted,
      stage,
      context,
      headline: {
        en: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 2 (Moderate COPD)`,
        sw: `FEV1 ${fev1Predicted}% iliyotabiriwa — Hatua 2 ya GOLD (COPD ya Wastani)`,
        sw_mtaa: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 2 (Moderate COPD)`,
      },
      meaning: {
        en: 'Moderate COPD — lung function is at 50-79% of predicted. Most patients here have noticeable breathlessness on exertion (climbing stairs, walking uphill, hurrying). This is the stage where long-acting maintenance inhalers become standard, and where untreated disease will keep progressing.',
        sw: 'COPD ya wastani — utendaji wa mapafu uko katika 50-79% ya iliyotabiriwa. Wagonjwa wengi hapa wana kushindwa kupumua kunakojulikana kwa juhudi (kupanda ngazi, kutembea kupanda, kushikilia kasi). Hii ni hatua ambapo inhaler za matengenezo za muda mrefu zinakuwa za kawaida, na ambapo ugonjwa usiotibiwa utaendelea kuendelea.',
        sw_mtaa: 'Moderate COPD — lung function iko at 50-79% of predicted. Most patients hapa wana noticeable breathlessness on exertion (kupanda stairs, kutembea uphill, kushikilia kasi). Hii ni stage ambapo long-acting maintenance inhalers zinakuwa standard, na ambapo untreated disease itaendelea kuendelea.',
      },
      nextSteps: {
        en: 'Long-acting bronchodilator (LAMA like tiotropium, or LABA like salmeterol/formoterol) becomes standard. Smoking cessation and biomass-exposure reduction remain essential. Refer for pulmonary rehabilitation where available. Annual influenza and pneumococcal vaccination. Review every 3-6 months.',
        sw: 'Bronchodilator ya muda mrefu (LAMA kama tiotropium, au LABA kama salmeterol/formoterol) inakuwa ya kawaida. Kuacha kuvuta sigara na kupunguza mfiduo wa nishati ya kuni bado ni muhimu. Rejea kwa ukarabati wa mapafu pale unapopatikana. Chanjo ya influenza ya kila mwaka na pneumococcal. Pitia kila miezi 3-6.',
        sw_mtaa: 'Long-acting bronchodilator (LAMA kama tiotropium, au LABA kama salmeterol/formoterol) inakuwa standard. Smoking cessation na biomass-exposure reduction zinabaki essential. Refer kwa pulmonary rehabilitation pale inapopatikana. Annual influenza na pneumococcal vaccination. Review kila miezi 3-6.',
      },
      urgency: 'routine',
    };
  }

  if (stage === 'gold_3') {
    return {
      fev1Predicted,
      stage,
      context,
      headline: {
        en: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 3 (Severe COPD)`,
        sw: `FEV1 ${fev1Predicted}% iliyotabiriwa — Hatua 3 ya GOLD (COPD Kali)`,
        sw_mtaa: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 3 (Severe COPD)`,
      },
      meaning: {
        en: 'Severe COPD — lung function is at 30-49% of predicted. Significant breathlessness on minimal exertion, marked reduction in exercise tolerance, often two or more exacerbations per year. Quality of life is significantly affected. This stage is associated with substantial mortality from exacerbations, and protective measures matter most.',
        sw: 'COPD kali — utendaji wa mapafu uko katika 30-49% ya iliyotabiriwa. Kushindwa kupumua kwa kiasi kikubwa kwa juhudi ndogo, kupunguza kwa kiasi kikubwa kwa uvumilivu wa mazoezi, mara nyingi milipuko miwili au zaidi kwa mwaka. Ubora wa maisha unaathiriwa kwa kiasi kikubwa. Hatua hii inahusishwa na vifo vingi kutoka kwa milipuko, na hatua za kinga ni muhimu zaidi.',
        sw_mtaa: 'Severe COPD — lung function iko at 30-49% of predicted. Significant breathlessness on minimal exertion, marked reduction katika exercise tolerance, mara nyingi two au more exacerbations per year. Quality of life inaaffected significantly. Stage hii inaassociated na substantial mortality kutoka exacerbations, na protective measures matter most.',
      },
      nextSteps: {
        en: 'Combination LABA+LAMA is standard; add ICS (triple therapy) if frequent exacerbations or eosinophilia. Pulmonary rehabilitation is high-priority. Screen for cor pulmonale (ankle oedema, raised JVP). Check resting SpO2 — if ≤ 88% chronically, refer for long-term oxygen therapy assessment. Annual vaccinations. Consider advance care planning conversations.',
        sw: 'Mchanganyiko wa LABA+LAMA ni wa kawaida; ongeza ICS (matibabu mara tatu) ikiwa milipuko ya mara kwa mara au eosinophilia. Ukarabati wa mapafu ni kipaumbele cha juu. Uchunguzi wa cor pulmonale (uvimbe wa kifundo, JVP iliyoinuliwa). Pima SpO2 ya kupumzika — ikiwa ≤ 88% kwa kudumu, rejea kwa tathmini ya tiba ya oksijeni ya muda mrefu. Chanjo za kila mwaka. Fikiria mazungumzo ya mipango ya huduma ya mapema.',
        sw_mtaa: 'Combination LABA+LAMA ni standard; ongeza ICS (triple therapy) ikiwa frequent exacerbations au eosinophilia. Pulmonary rehabilitation ni high-priority. Screen for cor pulmonale (ankle oedema, raised JVP). Check resting SpO2 — ikiwa ≤ 88% chronically, refer for long-term oxygen therapy assessment. Annual vaccinations. Consider advance care planning conversations.',
      },
      urgency: 'urgent',
    };
  }

  // gold_4
  return {
    fev1Predicted,
    stage: 'gold_4',
    context,
    headline: {
      en: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 4 (Very Severe COPD)`,
      sw: `FEV1 ${fev1Predicted}% iliyotabiriwa — Hatua 4 ya GOLD (COPD Kali Sana)`,
      sw_mtaa: `FEV1 ${fev1Predicted}% predicted — GOLD Stage 4 (Very Severe COPD)`,
    },
    meaning: {
      en: 'Very severe COPD — lung function is below 30% of predicted. The patient is significantly limited in daily activities, breathless at minimal exertion (or at rest), at high risk of life-threatening exacerbations, and often has signs of cor pulmonale or chronic respiratory failure. The focus is on maximising quality of life, preventing exacerbations, and shared decision-making about the future.',
      sw: 'COPD kali sana — utendaji wa mapafu uko chini ya 30% ya iliyotabiriwa. Mgonjwa amezuiliwa kwa kiasi kikubwa katika shughuli za kila siku, anashindwa kupumua kwa juhudi ndogo (au wakati wa kupumzika), katika hatari kubwa ya milipuko inayotishia maisha, na mara nyingi ana dalili za cor pulmonale au kushindwa kwa kupumua kwa kudumu. Lengo ni kuongeza ubora wa maisha, kuzuia milipuko, na kufanya maamuzi pamoja juu ya siku zijazo.',
      sw_mtaa: 'Very severe COPD — lung function iko chini ya 30% of predicted. Patient ame-significantly limited katika daily activities, breathless at minimal exertion (au at rest), at high risk ya life-threatening exacerbations, na mara nyingi ana signs za cor pulmonale au chronic respiratory failure. Focus ni kuma-maximise quality of life, kuzuia exacerbations, na shared decision-making about future.',
    },
    nextSteps: {
      en: 'Maximise inhaled therapy (LABA+LAMA+ICS), pulmonary rehabilitation, long-term oxygen therapy if SpO2 ≤ 88% chronically (the only treatment proven to extend life at this stage). Aggressive prevention and early treatment of every chest infection. Treat cor pulmonale, depression, anxiety, nutritional decline. Specialist input where available. Advance care planning conversations are essential at this stage — not "giving up," just honest planning.',
      sw: 'Boresha tiba ya kupuliza (LABA+LAMA+ICS), ukarabati wa mapafu, tiba ya oksijeni ya muda mrefu ikiwa SpO2 ≤ 88% kwa kudumu (tiba pekee inayothibitishwa kuongeza maisha katika hatua hii). Kinga kali na matibabu ya mapema ya kila maambukizi ya kifua. Tibu cor pulmonale, unyong\'onyevu, wasiwasi, kushuka kwa lishe. Mchango wa mtaalam pale unapopatikana. Mazungumzo ya mipango ya huduma ya mapema ni muhimu katika hatua hii — sio "kukata tamaa," ni mipango ya ukweli tu.',
      sw_mtaa: 'Maximise inhaled therapy (LABA+LAMA+ICS), pulmonary rehabilitation, long-term oxygen therapy ikiwa SpO2 ≤ 88% chronically (only treatment proven kuextend life katika stage hii). Aggressive prevention na early treatment ya kila chest infection. Treat cor pulmonale, depression, anxiety, nutritional decline. Specialist input pale inapopatikana. Advance care planning conversations ni essential katika stage hii — sio "giving up," ni honest planning tu.',
    },
    urgency: 'urgent',
  };
}

export const SPIROMETRY: LabKnowledge = {
  id: 'spirometry',
  aliases: LAB_ALIASES.spirometry,
  unit: '% predicted',

  whatItMeasures: {
    en: 'Spirometry measures how much air you can blow out of your lungs (FVC, forced vital capacity) and how fast you can blow it out in the first second (FEV1, forced expiratory volume in one second). The ratio FEV1/FVC tells whether the lungs are obstructed (air comes out too slowly) and the FEV1 % predicted tells how strong your lungs are compared to what we would expect from someone your age, height, and sex. In COPD, FEV1/FVC is reduced and the FEV1 % predicted defines how severe the disease is (GOLD stages 1-4).',
    sw: 'Spirometry hupima ni hewa kiasi gani unayoweza kupiga nje ya mapafu yako (FVC, forced vital capacity) na haraka kiasi gani unayoweza kupiga nje katika sekunde ya kwanza (FEV1, forced expiratory volume in one second). Ratio FEV1/FVC inasema kama mapafu yamezibwa (hewa inatoka polepole sana) na FEV1 % iliyotabiriwa inasema mapafu yako yana nguvu kiasi gani ikilinganishwa na kile tunachotarajia kutoka kwa mtu wa umri wako, urefu, na jinsia. Katika COPD, FEV1/FVC imepunguzwa na FEV1 % iliyotabiriwa inafafanua jinsi ugonjwa ulivyo kali (hatua za GOLD 1-4).',
    sw_mtaa: 'Spirometry inapima how much air unaweza kupiga out ya lungs yako (FVC, forced vital capacity) na how fast unaweza kuipiga out katika first second (FEV1, forced expiratory volume in one second). Ratio FEV1/FVC inatell whether lungs zimezibwa (air inatoka too slowly) na FEV1 % predicted inatell how strong lungs zako ziko ikilinganishwa na what tungetarajia kutoka kwa mtu wa age yako, height, na sex. Katika COPD, FEV1/FVC ime-reduced na FEV1 % predicted inafafanua how severe disease iko (GOLD stages 1-4).',
  },

  whyItsOrdered: {
    en: 'Spirometry is the definitive test for diagnosing COPD and grading its severity. It is also used in asthma to confirm reversible airway obstruction, monitor response to treatment, and assess for occupational lung disease. In Tanzania spirometry is generally available at district and referral hospital level. The crucial requirement for COPD diagnosis is the post-bronchodilator measurement — spirometry repeated 15-20 minutes after a salbutamol dose. If FEV1/FVC is still < 0.7 after the bronchodilator, COPD is confirmed; if it normalises, the obstruction is reversible and asthma is more likely.',
    sw: 'Spirometry ni kipimo cha mwisho cha kutambua COPD na kuipanga ukali wake. Pia hutumika katika pumu kuthibitisha kuziba kwa njia za hewa kunakoweza kurudi, kufuatilia jibu kwa matibabu, na kutathmini ugonjwa wa mapafu wa kazini. Tanzania spirometry kawaida inapatikana katika ngazi ya hospitali ya wilaya na ya rufaa. Hitaji muhimu kwa utambuzi wa COPD ni kipimo baada ya bronchodilator — spirometry kurudiwa dakika 15-20 baada ya dose ya salbutamol. Ikiwa FEV1/FVC bado ni < 0.7 baada ya bronchodilator, COPD imethibitishwa; ikirudi kawaida, kuziba kunaweza kurudi na pumu ni uwezekano zaidi.',
    sw_mtaa: 'Spirometry ni definitive test ya kudiagnose COPD na kugrade severity yake. Pia inatumika katika asthma kuconfirm reversible airway obstruction, kumonitor response to treatment, na kuassess for occupational lung disease. Tanzania spirometry generally inapatikana at district na referral hospital level. Crucial requirement kwa COPD diagnosis ni post-bronchodilator measurement — spirometry repeated dakika 15-20 baada ya salbutamol dose. Ikiwa FEV1/FVC bado ni < 0.7 baada ya bronchodilator, COPD imeconfirmed; ikinormalise, obstruction ni reversible na asthma ni more likely.',
  },

  ranges: [
    {
      applies: { sex: 'any', ageMin: 18 },
      normalLow: 80,
      normalHigh: 120,
      criticalLow: 30,
    },
  ],

  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'FEV1 < 30% predicted with confirmed obstruction is GOLD Stage 4 — very severe COPD. Significant disability, high exacerbation risk, often signs of cor pulmonale or chronic respiratory failure.',
        sw: 'FEV1 < 30% iliyotabiriwa na kuziba kuliothibitishwa ni hatua 4 ya GOLD — COPD kali sana. Ulemavu mkubwa, hatari kubwa ya mlipuko, mara nyingi dalili za cor pulmonale au kushindwa kwa kupumua kwa kudumu.',
        sw_mtaa: 'FEV1 < 30% predicted na confirmed obstruction ni GOLD Stage 4 — very severe COPD. Significant disability, high exacerbation risk, mara nyingi signs za cor pulmonale au chronic respiratory failure.',
      },
      nextSteps: {
        en: 'Maximal inhaled therapy, pulmonary rehab, LTOT if SpO2 ≤ 88% chronically, specialist input, advance care planning.',
        sw: 'Tiba ya juu ya kupuliza, pulmonary rehab, LTOT ikiwa SpO2 ≤ 88% kwa kudumu, mchango wa mtaalam, mipango ya huduma ya mapema.',
        sw_mtaa: 'Maximal inhaled therapy, pulmonary rehab, LTOT ikiwa SpO2 ≤ 88% chronically, specialist input, advance care planning.',
      },
      urgency: 'urgent',
    },
    {
      band: 'low',
      meaning: {
        en: 'FEV1 30-79% predicted with confirmed obstruction is GOLD Stage 2 (50-79%, moderate) or Stage 3 (30-49%, severe). Long-acting inhaler therapy is standard. Pulmonary rehabilitation is high-yield.',
        sw: 'FEV1 30-79% iliyotabiriwa na kuziba kuliothibitishwa ni hatua 2 ya GOLD (50-79%, ya wastani) au hatua 3 (30-49%, kali). Tiba ya inhaler ya muda mrefu ni ya kawaida. Ukarabati wa mapafu una mavuno makubwa.',
        sw_mtaa: 'FEV1 30-79% predicted na confirmed obstruction ni GOLD Stage 2 (50-79%, moderate) au Stage 3 (30-49%, severe). Long-acting inhaler therapy ni standard. Pulmonary rehabilitation ni high-yield.',
      },
      nextSteps: {
        en: 'Start or step up long-acting bronchodilator (LAMA or LABA, or combination); add ICS for frequent exacerbations; pulmonary rehabilitation; vaccinations.',
        sw: 'Anza au panda bronchodilator ya muda mrefu (LAMA au LABA, au mchanganyiko); ongeza ICS kwa milipuko ya mara kwa mara; pulmonary rehab; chanjo.',
        sw_mtaa: 'Anza au step up long-acting bronchodilator (LAMA au LABA, au combination); ongeza ICS kwa frequent exacerbations; pulmonary rehab; vaccinations.',
      },
      urgency: 'urgent',
    },
    {
      band: 'normal',
      meaning: {
        en: 'FEV1 ≥ 80% predicted with confirmed obstruction is GOLD Stage 1 (mild COPD); without obstruction, normal lung function. This is the stage where smoking and biomass-exposure cessation give the greatest protection for the future.',
        sw: 'FEV1 ≥ 80% iliyotabiriwa na kuziba kuliothibitishwa ni hatua 1 ya GOLD (COPD ndogo); bila kuziba, utendaji wa kawaida wa mapafu. Hii ni hatua ambapo kuacha kuvuta sigara na mfiduo wa nishati ya kuni hutoa ulinzi mkubwa zaidi kwa siku zijazo.',
        sw_mtaa: 'FEV1 ≥ 80% predicted na confirmed obstruction ni GOLD Stage 1 (mild COPD); bila obstruction, normal lung function. Hii ni stage ambapo smoking na biomass-exposure cessation zinatoa greatest protection kwa future.',
      },
      nextSteps: {
        en: 'Smoking cessation, biomass-exposure reduction, short-acting reliever as needed, vaccinations, regular review.',
        sw: 'Kuacha kuvuta sigara, kupunguza mfiduo wa nishati ya kuni, reliever ya muda mfupi inapohitajika, chanjo, mapitio ya kawaida.',
        sw_mtaa: 'Smoking cessation, biomass-exposure reduction, short-acting reliever as needed, vaccinations, regular review.',
      },
      urgency: 'routine',
    },
  ],

  sources: [
    src('GOLD_COPD_2025'),
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
