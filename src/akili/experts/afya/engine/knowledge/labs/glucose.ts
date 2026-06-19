/**
 * Blood Glucose — Lab Knowledge & Interpretation
 *
 * Multiple test types interpreted:
 *   - Fasting blood glucose (FBG, FPG) — after 8h fast
 *   - Random blood glucose (RBG) — any time
 *   - 2h post-prandial / OGTT 2h value
 *   - Self-monitored values at home (pre-meal, post-meal, bedtime, 3am)
 *
 * Sources: ADA 2024, WHO 2024, IDF 2025, NTLG STG 2023.
 *
 * ADA/WHO diagnostic thresholds (non-pregnant):
 *   - Normal fasting:           < 5.6 mmol/L
 *   - Prediabetes (IFG):        5.6-6.9 mmol/L
 *   - Diabetes (fasting):       ≥ 7.0 mmol/L (on two occasions, or with symptoms once)
 *   - Diabetes (random):        ≥ 11.1 mmol/L (with symptoms)
 *   - Diabetes (OGTT 2h):       ≥ 11.1 mmol/L
 *   - Prediabetes (OGTT 2h):    7.8-11.0 mmol/L
 *
 * Pregnancy (GDM, per IADPSG/WHO 2013):
 *   - Fasting:    ≥ 5.1 mmol/L
 *   - 1h OGTT:    ≥ 10.0 mmol/L
 *   - 2h OGTT:    ≥ 8.5 mmol/L
 *   (Any one of these ≥ thresholds = GDM)
 *
 * Hypoglycemia (anyone on insulin/sulfonylurea):
 *   - Level 1:    3.0-3.9 mmol/L  (alert; mild)
 *   - Level 2:    < 3.0 mmol/L    (clinically significant)
 *   - Level 3:    severe, requires assistance (regardless of number)
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE GLUCOSE CATEGORIZATION
// ──────────────────────────────────────────────────────────────────────

export type GlucoseContext =
  | 'fasting'        // overnight fast
  | 'random'         // any time, no fast specified
  | 'post_meal'      // 1-2h after meal
  | 'pregnancy_fasting'
  | 'pregnancy_post_meal'
  | 'unknown';

export type GlucoseCategory =
  | 'hypo_severe'       // < 3.0
  | 'hypo_mild'         // 3.0-3.9
  | 'normal'
  | 'prediabetic'
  | 'diabetic_range'
  | 'very_high'         // > 16
  | 'critical_high';    // > 22 (DKA/HHS risk zone)

export function categorizeGlucose(
  value: number,
  context: GlucoseContext = 'unknown'
): GlucoseCategory {
  // Hypoglycemia thresholds are context-independent
  if (value < 3.0) return 'hypo_severe';
  if (value < 4.0) return 'hypo_mild';

  // Critical-high (DKA/HHS zone) — regardless of fasting state
  if (value >= 22.0) return 'critical_high';
  if (value >= 16.0) return 'very_high';

  // Context-dependent diagnostic thresholds
  switch (context) {
    case 'fasting':
      if (value < 5.6) return 'normal';
      if (value < 7.0) return 'prediabetic';
      return 'diabetic_range';

    case 'pregnancy_fasting':
      if (value < 5.1) return 'normal';
      return 'diabetic_range'; // GDM threshold met

    case 'pregnancy_post_meal':
      if (value < 8.5) return 'normal';
      return 'diabetic_range';

    case 'post_meal':
      if (value < 7.8) return 'normal';
      if (value < 11.1) return 'prediabetic';
      return 'diabetic_range';

    case 'random':
    case 'unknown':
    default:
      // For random, ADA: ≥ 11.1 with symptoms = diabetes
      if (value < 7.8) return 'normal';
      if (value < 11.1) return 'prediabetic';
      return 'diabetic_range';
  }
}

// ──────────────────────────────────────────────────────────────────────
// EXPLANATIONS BY CATEGORY
// ──────────────────────────────────────────────────────────────────────

export const GLUCOSE_CATEGORY_EXPLANATIONS: Record<GlucoseCategory, {
  en: { headline: string; meaning: string; nextSteps: string };
  sw: { headline: string; meaning: string; nextSteps: string };
  sw_mtaa: { headline: string; meaning: string; nextSteps: string };
  urgency: UrgencyLevel;
}> = {
  hypo_severe: {
    en: {
      headline: 'Your blood sugar is dangerously low.',
      meaning: 'A reading below 3.0 mmol/L is severe hypoglycemia. The brain runs on glucose, and at this level it does not have enough fuel. If untreated quickly, this can cause confusion, seizure, and unconsciousness.',
      nextSteps: 'Eat or drink 15-20 grams of fast sugar NOW: 4-5 glucose tablets, half a glass of fruit juice, 3-4 teaspoons of sugar dissolved in water, or one tablespoon of honey. Recheck in 15 minutes. Repeat if still low. Then eat a real meal with protein. If you feel confused or cannot swallow safely, someone else must help — and get medical attention. Do not drive until sugar is back above 5.',
    },
    sw: {
      headline: 'Sukari yako ya damu iko chini kwa hatari.',
      meaning: 'Kipimo chini ya 3.0 mmol/L ni hypoglycemia kali. Ubongo unaendeshwa na glucose, na katika kiwango hiki hauna nishati ya kutosha. Bila kutibiwa haraka, hii inaweza kusababisha kuchanganyikiwa, kifafa, na kupoteza fahamu.',
      nextSteps: 'Kula au kunywa gramu 15-20 za sukari ya haraka SASA: vidonge 4-5 vya glucose, nusu glasi ya juice ya tunda, vijiko 3-4 vya sukari katika maji, au kijiko kimoja cha asali. Pima tena baada ya dakika 15. Rudia ikiwa bado chini. Kisha kula mlo halisi pamoja na protini. Ikiwa umechanganyikiwa au huwezi kumeza salama, mtu mwingine lazima asaidie — na pata matibabu. Usiendeshe gari hadi sukari irudi juu ya 5.',
    },
    sw_mtaa: {
      headline: 'Sukari yako iko chini sana — ni hatari.',
      meaning: 'Kipimo chini ya 3.0 mmol/L ni hypoglycemia kali. Ubongo unahitaji glucose, na sasa hivi haupati ya kutosha. Bila kutibu haraka, unaweza kuchanganyikiwa, kupata kifafa, au kupoteza fahamu.',
      nextSteps: 'Kula au kunywa sukari ya haraka SASA: vidonge 4-5 vya glucose, nusu glass ya juice, vijiko 3-4 vya sukari kwenye maji, au kijiko cha asali. Pima tena baada ya dakika 15. Rudia kama bado chini. Kisha kula chakula halisi na protini. Ukiwa umechanganyikiwa au huwezi kumeza salama, mtu mwingine asaidie — na pata matibabu. Usiendeshe gari hadi sukari irudi juu ya 5.',
    },
    urgency: 'urgent',
  },

  hypo_mild: {
    en: {
      headline: 'Your blood sugar is on the low side.',
      meaning: 'A reading of 3.0-3.9 mmol/L is mild low blood sugar. You may feel shaky, sweaty, hungry, or anxious — or you may feel nothing at all (this is called "hypo unawareness" and is more dangerous because you cannot prevent it from getting worse).',
      nextSteps: 'Eat 15 grams of fast sugar: 3-4 glucose tablets, a small glass of fruit juice, 3 teaspoons of sugar in water, or one tablespoon of honey. Wait 15 minutes. Recheck. Repeat if still below 4. Then eat a real meal or snack with protein to keep sugar steady. If this happens more than twice a week, tell your doctor — your medication dose probably needs adjustment.',
    },
    sw: {
      headline: 'Sukari yako ya damu iko chini kidogo.',
      meaning: 'Kipimo cha 3.0-3.9 mmol/L ni sukari ya chini kidogo. Unaweza kujisikia kutetemeka, jasho, njaa, au wasiwasi — au unaweza usisikie chochote ("hypo unawareness" ambayo ni hatari zaidi kwa sababu hauwezi kuzuia isizidi).',
      nextSteps: 'Kula gramu 15 za sukari ya haraka: vidonge 3-4 vya glucose, glasi ndogo ya juice ya tunda, vijiko 3 vya sukari katika maji, au kijiko kimoja cha asali. Subiri dakika 15. Pima tena. Rudia ikiwa bado chini ya 4. Kisha kula mlo au kitafunwa pamoja na protini. Ikiwa hii inatokea zaidi ya mara mbili kwa wiki, mwambie daktari wako — dose ya dawa yako huenda inahitaji marekebisho.',
    },
    sw_mtaa: {
      headline: 'Sukari yako iko chini kidogo.',
      meaning: 'Kipimo cha 3.0-3.9 mmol/L ni sukari ya chini kidogo. Unaweza kujisikia kutetemeka, jasho, njaa, au wasiwasi — au usisikie kabisa ("hypo unawareness" — hii ni hatari zaidi kwa sababu huwezi kuzuia).',
      nextSteps: 'Kula gramu 15 za sukari ya haraka: vidonge 3-4 vya glucose, glass ndogo ya juice, vijiko 3 vya sukari kwenye maji, au kijiko cha asali. Subiri dakika 15. Pima tena. Rudia ikiwa bado chini ya 4. Kisha kula chakula au kitafunwa na protini. Hii ikitokea zaidi ya mara mbili kwa wiki, mwambie daktari — dose yako inahitaji rekebisho.',
    },
    urgency: 'soon',
  },

  normal: {
    en: {
      headline: 'Your blood sugar is in the normal range.',
      meaning: 'This is healthy. For someone without diabetes, this means your body is handling sugar well. For someone with diabetes, it means your treatment is working.',
      nextSteps: 'Continue your current habits — diet, activity, medicines if any. If you have diabetes, keep up with your routine checks and clinic visits. If you do not have diabetes, this is a good time to maintain a healthy weight, stay active, and limit sugary drinks — the things that prevent diabetes from starting.',
    },
    sw: {
      headline: 'Sukari yako ya damu iko ndani ya kiwango cha kawaida.',
      meaning: 'Hii ni afya. Kwa mtu asiye na kisukari, hii inamaanisha mwili wako unashughulika na sukari vizuri. Kwa mtu mwenye kisukari, inamaanisha matibabu yako yanafanya kazi.',
      nextSteps: 'Endelea na tabia zako za sasa — chakula, shughuli, dawa ikiwepo. Ikiwa una kisukari, endelea na ukaguzi wako wa kawaida na ziara za kliniki. Ikiwa huna kisukari, huu ni wakati mzuri wa kuhifadhi uzito wa afya, kuwa na shughuli, na kupunguza vinywaji vya sukari — mambo yanayozuia kisukari kuanza.',
    },
    sw_mtaa: {
      headline: 'Sukari yako iko sawa.',
      meaning: 'Hii ni afya. Kama huna kisukari, mwili wako unashughulika na sukari vizuri. Kama una kisukari, matibabu yako yanafanya kazi.',
      nextSteps: 'Endelea na unayofanya — chakula, mazoezi, dawa ikiwepo. Una kisukari? Endelea na ukaguzi wako wa kawaida na ziara za kliniki. Huna kisukari? Hudumie uzito wa afya, fanya mazoezi, punguza vinywaji vya sukari — hii ndio inazuia kisukari kuanza.',
    },
    urgency: 'info',
  },

  prediabetic: {
    en: {
      headline: 'Your blood sugar is above normal — in the prediabetes range.',
      meaning: 'This is a warning, not a diagnosis. Prediabetes means your body is starting to struggle with sugar but has not yet crossed into diabetes. About 1 in 3 people with prediabetes develop full diabetes within 5 years if nothing changes. The good news: lifestyle changes now can return your sugars to normal and dramatically reduce future risk.',
      nextSteps: 'Aim to lose 5-7% of body weight if you carry extra (so, for an 80 kg person, that is 4-6 kg). Walk 30 minutes a day, 5 days a week. Reduce sugary drinks, white bread, ugali portions, and fried snacks. Choose whole grains, vegetables, beans, and lean protein. Repeat your blood sugar test in 6 months. If lifestyle changes are not enough, your doctor may consider metformin to prevent progression.',
    },
    sw: {
      headline: 'Sukari yako ya damu iko juu ya kawaida — katika kiwango cha pre-diabetes.',
      meaning: 'Hii ni onyo, si utambuzi wa kisukari. Pre-diabetes maana yake mwili wako unaanza kupambana na sukari lakini bado haijavuka kwenda kisukari. Karibu 1 kati ya 3 wenye pre-diabetes wanapata kisukari kamili ndani ya miaka 5 ikiwa hakuna kinachobadilika. Habari njema: mabadiliko ya maisha sasa yanaweza kurudisha sukari yako kawaida na kupunguza sana hatari ya baadaye.',
      nextSteps: 'Lenga kupungua uzito wa 5-7% ikiwa una uzito wa ziada (kwa mtu wa kg 80, ni kg 4-6). Tembea dakika 30 kwa siku, siku 5 kwa wiki. Punguza vinywaji vya sukari, mkate mweupe, sehemu za ugali, na vitafunwa vya kukaanga. Chagua nafaka kamili, mboga, maharage, na protini nyembamba. Rudia kipimo cha sukari yako baada ya miezi 6. Ikiwa mabadiliko ya maisha hayatoshi, daktari wako anaweza kuzingatia metformin kuzuia maendeleo.',
    },
    sw_mtaa: {
      headline: 'Sukari yako iko juu ya kawaida — kwenye kiwango cha pre-diabetes.',
      meaning: 'Hii ni onyo, sio utambuzi wa kisukari kamili. Pre-diabetes maana mwili wako unaanza kupambana na sukari, lakini bado haijavuka kwenda kisukari. Karibu 1 kati ya 3 wenye pre-diabetes wanaishia kupata kisukari ndani ya miaka 5 kama hakuna kinachobadilika. Habari njema: lifestyle changes sasa zinaweza kurudisha sukari kawaida na kupunguza hatari ya baadaye.',
      nextSteps: 'Lenga kupunguza uzito 5-7% ikiwa una uzito wa ziada (mtu wa kg 80, ni kg 4-6). Tembea dakika 30 kwa siku, siku 5 kwa wiki. Punguza soda, juice, mkate mweupe, ugali portions, vitafunwa vya kukaanga. Chagua nafaka kamili, mboga, maharage, protini nyembamba. Rudia kipimo cha sukari baada ya miezi 6. Kama lifestyle haitoshi, daktari anaweza kufikiria metformin kuzuia kisukari.',
    },
    urgency: 'soon',
  },

  diabetic_range: {
    en: {
      headline: 'Your blood sugar is in the diabetes range.',
      meaning: 'This reading is high enough to suggest diabetes. One reading is rarely enough to confirm — diagnosis usually requires either two separate elevated tests, or one elevated test plus clear symptoms (thirst, frequent urination, unexplained weight loss, blurry vision). Your doctor will likely order HbA1c and a fasting glucose to confirm and to assess severity. If diagnosed, this is the start of a long-term management plan, not a death sentence — with proper care, people with diabetes live full lives.',
      nextSteps: 'See your doctor within 1-2 weeks for confirmation testing and a treatment plan. Start reducing sugary drinks and ugali/rice portions immediately. Walk more. Drink plenty of water. If you feel very thirsty, are urinating a lot at night, have lost weight without trying, or feel very tired, see a clinic sooner — these are signs sugar is significantly out of range.',
    },
    sw: {
      headline: 'Sukari yako ya damu iko katika kiwango cha kisukari.',
      meaning: 'Kipimo hiki ni cha juu vya kutosha kupendekeza kisukari. Kipimo kimoja ni nadra kutosha kuthibitisha — utambuzi kwa kawaida unahitaji aidha vipimo viwili tofauti vya juu, au kipimo kimoja cha juu pamoja na dalili wazi (kiu, kukojoa mara kwa mara, kupungua uzito bila kueleweka, kuona ukungu). Daktari wako huenda ataagiza HbA1c na sukari ya kabla ya kula kuthibitisha na kutathmini ukali. Ikiwa umetambuliwa, huu ni mwanzo wa mpango wa usimamizi wa muda mrefu, si hukumu ya kifo — kwa utunzaji sahihi, watu wenye kisukari wanaishi maisha kamili.',
      nextSteps: 'Ona daktari wako ndani ya wiki 1-2 kwa kipimo cha uthibitisho na mpango wa matibabu. Anza kupunguza vinywaji vya sukari na sehemu za ugali/wali sasa hivi. Tembea zaidi. Kunywa maji ya kutosha. Ukijisikia kiu sana, unakojoa sana usiku, umepoteza uzito bila kujaribu, au unajisikia uchovu sana, ona kliniki haraka zaidi — hizi ni dalili kwamba sukari iko mbali na kawaida.',
    },
    sw_mtaa: {
      headline: 'Sukari yako iko kwenye kiwango cha kisukari.',
      meaning: 'Kipimo hiki ni cha juu vya kutosha kupendekeza kisukari. Kipimo kimoja ni nadra kutosha kuthibitisha — utambuzi kwa kawaida unahitaji vipimo viwili tofauti vya juu, au kipimo kimoja cha juu pamoja na dalili wazi (kiu, kukojoa mara kwa mara, kupungua uzito bila kueleweka, kuona ukungu). Daktari ataagiza HbA1c na sukari ya kabla ya kula kuthibitisha. Ukithibitishwa, huu si mwisho — watu wengi wenye kisukari wanaishi maisha kamili.',
      nextSteps: 'Ona daktari ndani ya wiki 1-2 kwa kipimo cha uthibitisho na mpango wa matibabu. Anza kupunguza soda, juice, ugali/wali portions sasa hivi. Tembea zaidi. Kunywa maji mengi. Ukijisikia kiu sana, unakojoa sana usiku, umepoteza uzito bila kujaribu, au unajisikia uchovu sana — nenda kliniki haraka zaidi.',
    },
    urgency: 'soon',
  },

  very_high: {
    en: {
      headline: 'Your blood sugar is very high.',
      meaning: 'Sugar between 16 and 22 mmol/L is significantly elevated. At these levels, your body starts losing fluid through urination, you become dehydrated, and the risk of progression to DKA (type 1) or HHS (type 2) rises. If you have symptoms — vomiting, deep fast breathing, fruity breath, severe drowsiness, confusion — go to hospital immediately.',
      nextSteps: 'See a doctor today, not tomorrow. Drink plenty of water now to stay hydrated. If you are on insulin and have a sick-day plan, follow it. Do not eat sugar or sugary drinks. If you take metformin, you may continue it unless you are vomiting or severely dehydrated. Watch for warning signs of DKA/HHS — if any appear, go to hospital.',
    },
    sw: {
      headline: 'Sukari yako ya damu iko juu sana.',
      meaning: 'Sukari kati ya 16 na 22 mmol/L imepanda kwa kiasi kikubwa. Katika viwango hivi, mwili wako unaanza kupoteza majimaji kupitia kukojoa, unapungukiwa maji, na hatari ya kuendelea kwa DKA (aina ya 1) au HHS (aina ya 2) inapanda. Ikiwa una dalili — kutapika, kupumua kwa kina haraka, pumzi yenye harufu ya matunda, usingizi mkali, kuchanganyikiwa — nenda hospitali mara moja.',
      nextSteps: 'Ona daktari leo, sio kesho. Kunywa maji ya kutosha sasa kuhifadhi unyevu. Ikiwa uko kwenye insulin na una mpango wa siku za ugonjwa, fuata. Usile sukari au vinywaji vya sukari. Ikiwa unatumia metformin, unaweza kuendelea isipokuwa unatapika au umepungukiwa maji sana. Angalia ishara za onyo za DKA/HHS — ikiwa zinaonekana, nenda hospitali.',
    },
    sw_mtaa: {
      headline: 'Sukari yako iko juu sana.',
      meaning: 'Sukari kati ya 16 na 22 mmol/L ni juu sana. Hapa mwili unaanza kupoteza maji kupitia kukojoa, unapungukiwa maji, na hatari ya DKA (aina ya 1) au HHS (aina ya 2) inapanda. Ukiwa na dalili — kutapika, kupumua kwa kina haraka, pumzi yenye harufu ya matunda, usingizi mkali, kuchanganyikiwa — nenda hospitali MARA MOJA.',
      nextSteps: 'Ona daktari leo, sio kesho. Kunywa maji mengi sasa hivi. Ukiwa kwenye insulin na una sick-day plan, fuata. Usile sukari wala soda. Ukitumia metformin, endelea kunywa isipokuwa unatapika au umepungukiwa maji sana. Angalia warning signs za DKA/HHS — zikitokea, nenda hospitali.',
    },
    urgency: 'urgent',
  },

  critical_high: {
    en: {
      headline: 'GO TO HOSPITAL NOW. This sugar level is dangerous.',
      meaning: 'Sugar above 22 mmol/L (often above 33 in HHS) is medical emergency territory. The risk of DKA or HHS is high — both can be fatal without treatment. Even without symptoms now, things can deteriorate within hours.',
      nextSteps: 'Stop reading this app. Go to the nearest hospital or call 114. Do not drive yourself. Bring your insulin, your medicines, and your glucose meter if you have one. Drink water on the way if you can swallow safely.',
    },
    sw: {
      headline: 'NENDA HOSPITALI SASA. Kiwango hiki cha sukari ni hatari.',
      meaning: 'Sukari juu ya 22 mmol/L (mara nyingi juu ya 33 katika HHS) ni eneo la dharura ya kimatibabu. Hatari ya DKA au HHS iko juu — zote zinaweza kuua bila matibabu. Hata bila dalili sasa, mambo yanaweza kuzorota ndani ya masaa.',
      nextSteps: 'Acha kusoma app hii. Nenda hospitali ya karibu au piga 114. Usijiendeshe mwenyewe. Lete insulin yako, dawa zako, na mita ya glucose ukiwa nayo. Kunywa maji njiani ikiwa unaweza kumeza salama.',
    },
    sw_mtaa: {
      headline: 'NENDA HOSPITALI SASA. Hii ni dharura.',
      meaning: 'Sukari juu ya 22 mmol/L (mara nyingi juu ya 33 katika HHS) ni dharura ya matibabu. Hatari ya DKA au HHS iko juu — zote zinaweza kuua bila matibabu. Hata bila dalili sasa, hali inaweza kuwa mbaya ndani ya masaa.',
      nextSteps: 'Acha kusoma app. Nenda hospitali ya karibu au piga 114. Usijiendeshe mwenyewe. Lete insulin yako, dawa, na mita ya glucose ukiwa nayo. Kunywa maji njiani ikiwa unaweza kumeza salama.',
    },
    urgency: 'emergency',
  },
};

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE
// ──────────────────────────────────────────────────────────────────────

export const GLUCOSE: LabKnowledge = {
  id: 'glucose',
  aliases: LAB_ALIASES.glucose,
  unit: 'mmol/L',
  alternateUnits: [
    { unit: 'mg/dL', factor: 18.0 }, // mg/dL = mmol/L × 18
  ],

  whatItMeasures: {
    en: 'Blood glucose measures the amount of sugar in your blood at the moment of the test. It changes constantly — rising after meals, falling between meals, lowest in the early morning. Different tests catch different moments: fasting (before eating in the morning), random (any time), and post-prandial (1-2 hours after eating).',
    sw: 'Sukari ya damu hupima kiasi cha sukari katika damu yako wakati wa kipimo. Inabadilika kila wakati — inapanda baada ya milo, inashuka kati ya milo, ya chini zaidi alfajiri. Vipimo tofauti vinakamata nyakati tofauti: kabla ya kula (asubuhi kabla ya chakula), random (wakati wowote), na baada ya kula (masaa 1-2 baada ya kula).',
    sw_mtaa: 'Sukari ya damu inapima sukari kwenye damu yako wakati wa kipimo. Inabadilika kila wakati — inapanda baada ya kula, inashuka kati ya milo, ya chini zaidi alfajiri. Vipimo tofauti vinakamata nyakati tofauti: kabla ya kula (asubuhi), random (wakati wowote), au baada ya kula (masaa 1-2 baada ya chakula).',
  },

  whyItsOrdered: {
    en: 'Blood glucose is tested to diagnose diabetes, to monitor someone already living with diabetes, to evaluate symptoms like extreme thirst or unexplained weight loss, to screen during pregnancy for gestational diabetes, and to check for low sugar in people on insulin or certain pills. It is one of the most frequently ordered blood tests anywhere.',
    sw: 'Sukari ya damu hupimwa kutambua kisukari, kufuatilia mtu anayeishi tayari na kisukari, kutathmini dalili kama kiu kali au kupungua uzito bila kueleweka, kuchunguza wakati wa ujauzito kwa kisukari cha mimba, na kuangalia sukari ya chini kwa watu wanaotumia insulin au baadhi ya vidonge. Ni mojawapo ya vipimo vya damu vinavyoagizwa mara nyingi zaidi popote.',
    sw_mtaa: 'Sukari ya damu inapimwa kutambua kisukari, kufuatilia mtu mwenye kisukari tayari, kutathmini dalili kama kiu kali au kupungua uzito bila kueleweka, kuchunguza mimbani kwa kisukari cha mimba, na kuangalia sukari ya chini kwa watu wanaotumia insulin au baadhi ya vidonge. Ni mojawapo ya vipimo vya damu vinavyoagizwa zaidi.',
  },

  ranges: [
    // Fasting, non-pregnant adults
    {
      applies: { sex: 'any', ageMin: 18, pregnancy: false },
      normalLow: 3.9,
      normalHigh: 5.6,
      criticalLow: 3.0,
      criticalHigh: 22.0,
    },
    // Pregnancy — tighter range
    {
      applies: { sex: 'F', pregnancy: true },
      normalLow: 3.9,
      normalHigh: 5.1,
      criticalLow: 3.0,
      criticalHigh: 22.0,
    },
  ],

  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'Severe hypoglycemia — the body and brain are short of fuel. Symptoms can progress to confusion, seizure, and unconsciousness within minutes if untreated.',
        sw: 'Hypoglycemia kali — mwili na ubongo wanakosa nishati. Dalili zinaweza kuendelea kwa kuchanganyikiwa, kifafa, na kupoteza fahamu ndani ya dakika ikiwa haitatibiwa.',
        sw_mtaa: 'Hypoglycemia kali — mwili na ubongo wanakosa nishati. Bila kutibu haraka, unaweza kuchanganyikiwa, kupata kifafa, au kupoteza fahamu ndani ya dakika.',
      },
      nextSteps: {
        en: 'Eat or drink 15-20g of fast sugar immediately. Recheck in 15 minutes. Get medical help if confused or unable to swallow safely.',
        sw: 'Kula au kunywa gramu 15-20 za sukari ya haraka mara moja. Pima tena baada ya dakika 15. Pata msaada wa kimatibabu ukiwa umechanganyikiwa au hauwezi kumeza salama.',
        sw_mtaa: 'Kula au kunywa gramu 15-20 za sukari ya haraka MARA MOJA. Pima tena baada ya dakika 15. Pata msaada wa matibabu ukiwa umechanganyikiwa au huwezi kumeza salama.',
      },
      urgency: 'urgent',
    },
    {
      band: 'low',
      meaning: {
        en: 'Mild low sugar. May cause shaking, sweating, hunger, or anxiety — or no symptoms at all (hypo unawareness).',
        sw: 'Sukari ya chini kidogo. Inaweza kusababisha kutetemeka, jasho, njaa, au wasiwasi — au hakuna dalili kabisa (hypo unawareness).',
        sw_mtaa: 'Sukari ya chini kidogo. Inaweza kufanya utetemeke, kutoa jasho, njaa, au wasiwasi — au usisikie kabisa (hypo unawareness).',
      },
      nextSteps: {
        en: 'Eat 15g of fast sugar, wait 15 minutes, recheck. If frequent, tell your doctor — medication adjustment likely needed.',
        sw: 'Kula gramu 15 za sukari ya haraka, subiri dakika 15, pima tena. Ikiwa mara kwa mara, mwambie daktari — rekebisho la dawa huenda linahitajika.',
        sw_mtaa: 'Kula gramu 15 za sukari ya haraka, subiri dakika 15, pima tena. Ikiwa mara kwa mara, mwambie daktari — dose huenda inahitaji kurekebishwa.',
      },
      urgency: 'soon',
    },
    {
      band: 'normal',
      meaning: {
        en: 'Sugar is in the normal range for the test type and context.',
        sw: 'Sukari iko ndani ya kiwango cha kawaida kwa aina ya kipimo na muktadha.',
        sw_mtaa: 'Sukari iko sawa.',
      },
      nextSteps: {
        en: 'Continue current habits. Routine follow-up at clinic visits.',
        sw: 'Endelea na tabia za sasa. Ufuatiliaji wa kawaida katika ziara za kliniki.',
        sw_mtaa: 'Endelea na unavyofanya. Ukaguzi wa kawaida kliniki.',
      },
      urgency: 'info',
    },
    {
      band: 'high',
      meaning: {
        en: 'Sugar above the target range. One reading is not a diagnosis; patterns and confirmation tests matter.',
        sw: 'Sukari juu ya kiwango cha lengo. Kipimo kimoja si utambuzi; mtindo na vipimo vya uthibitisho ni muhimu.',
        sw_mtaa: 'Sukari iko juu ya target. Kipimo kimoja sio utambuzi; mtindo na vipimo vya uthibitisho ni muhimu.',
      },
      nextSteps: {
        en: 'See your doctor for confirmation testing (HbA1c + fasting glucose) and a management plan if needed.',
        sw: 'Ona daktari wako kwa kipimo cha uthibitisho (HbA1c + sukari ya kabla ya kula) na mpango wa usimamizi ikiwa unahitajika.',
        sw_mtaa: 'Ona daktari kwa kipimo cha uthibitisho (HbA1c + sukari ya kabla ya kula) na mpango wa usimamizi ikiwa unahitajika.',
      },
      urgency: 'soon',
    },
    {
      band: 'critical_high',
      meaning: {
        en: 'Sugar dangerously high. Risk of DKA (type 1) or HHS (type 2). Both can be fatal without prompt treatment.',
        sw: 'Sukari juu kwa hatari. Hatari ya DKA (aina ya 1) au HHS (aina ya 2). Zote zinaweza kuua bila matibabu ya haraka.',
        sw_mtaa: 'Sukari juu kwa hatari. Hatari ya DKA (aina ya 1) au HHS (aina ya 2). Zote zinaweza kuua bila matibabu ya haraka.',
      },
      nextSteps: {
        en: 'Go to the nearest hospital or call 114. Do not delay. Bring your medicines and meter.',
        sw: 'Nenda hospitali ya karibu au piga 114. Usichelewe. Lete dawa zako na mita.',
        sw_mtaa: 'Nenda hospitali ya karibu au piga 114. Usichelewe. Lete dawa zako na mita.',
      },
      urgency: 'emergency',
    },
  ],

  sources: [
    src('ADA_2024'),
    src('WHO_DIABETES_2024'),
    src('IDF_DIABETES_2025'),
    src('NTLG_STG_2023'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
