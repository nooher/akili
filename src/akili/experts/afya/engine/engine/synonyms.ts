/**
 * Synonyms Dictionary — Tanzania-First Edition
 *
 * Every canonical entity has many surface forms. Tanzanians type:
 *   • formal Swahili
 *   • street Swahili
 *   • English (broken, with typos)
 *   • mixed
 *   • abbreviations (DM, HTN, HbA1c)
 *   • brand names where common
 *
 * Order matters: multi-word phrases first via length sort.
 */

import { Aliases } from '../types';

// ──────────────────────────────────────────────────────────────────────
// SHARED LANGUAGE
// ──────────────────────────────────────────────────────────────────────

export const HIGH_WORDS = [
  'high', 'elevated', 'raised', 'above', 'over', 'too high',
  'juu', 'imepanda', 'kupanda', 'iko juu', 'ipo juu', 'imeongezeka', 'kubwa',
  'iko mbali', 'imeruka',
];

export const LOW_WORDS = [
  'low', 'below', 'fallen', 'dropped', 'too low',
  'chini', 'imeshuka', 'kushuka', 'iko chini', 'ipo chini', 'imepungua', 'ndogo',
];

export const NORMAL_WORDS = [
  'normal', 'okay', 'fine', 'ok',
  'kawaida', 'sawa', 'poa', 'ipo sawa',
];

export const QUESTION_STARTERS = [
  'what is', 'what does', 'what means', 'whats', 'whats the',
  'can i', 'should i', 'is it', 'how do i', 'why do i', 'how can i',
  'nini', 'maana yake', 'ni nini', 'inamaanisha', 'inamaanisha nini',
  'naweza', 'siwezi', 'je naweza', 'je ni', 'kwa nini', 'vipi',
  'nifanyeje', 'nifanyaje', 'ufanyeje', 'nifanye nini',
];

export const SUBSTANCE_WORDS = {
  alcohol: [
    'alcohol', 'beer', 'wine', 'spirits', 'liquor', 'booze',
    'pombe', 'bia', 'mvinyo', 'konyagi', 'mzee wa pwani',
    'tunaywaywa', 'kunywa pombe',
  ],
  smoking: [
    'cigarette', 'smoke', 'smoking', 'tobacco',
    'sigara', 'tumbaku', 'kuvuta sigara', 'kuvuta',
  ],
  pregnancy: [
    'pregnant', 'pregnancy', 'expecting',
    'mjamzito', 'mimba', 'kubeba mimba', 'nina mimba',
  ],
  breastfeeding: [
    'breastfeeding', 'nursing', 'lactating',
    'kunyonyesha', 'mama anayenyonyesha',
  ],
  fasting: [
    'fasting', 'ramadhan', 'ramadan',
    'kufunga', 'mfungo', 'ramadhani', 'saumu',
  ],
  child: [
    'child', 'kid', 'baby', 'infant', 'toddler', 'newborn',
    'mtoto', 'mtoto mchanga', 'kichanga',
  ],
  hormonal_contraceptives: [
    'contraceptive', 'contraceptives', 'contraception', 'birth control',
    'the pill', 'birth control pill', 'family planning pill', 'oral contraceptive',
    'depo', 'depo provera', 'implant', 'hormonal implant', 'family planning',
    'vidhibiti vya mimba', 'vidhibiti mimba', 'kidonge cha uzazi wa mpango',
    'uzazi wa mpango', 'sindano ya uzazi wa mpango', 'kipandikizi',
    'dawa za kuzuia mimba', 'vidonge vya kupanga uzazi',
  ],
};

// ──────────────────────────────────────────────────────────────────────
// CONDITION ALIASES
// ──────────────────────────────────────────────────────────────────────

export const CONDITION_ALIASES: Record<string, Aliases> = {
  hypertension: {
    canonical_en: 'Hypertension',
    canonical_sw: 'Shinikizo la Damu',
    en: ['hypertension', 'high blood pressure', 'high bp', 'raised bp', 'htn', 'hbp', 'elevated blood pressure'],
    sw: ['shinikizo la damu', 'shinikizo la juu la damu', 'msukumo wa damu', 'presha ya damu'],
    sw_mtaa: ['bp', 'presha', 'pressa', 'bp ya juu', 'presha imepanda', 'bp imepanda', 'pressure imepanda', 'shinikizo limepanda', 'damu inakimbia', 'msukumo umepanda'],
    slang: ['bp yangu', 'presha yangu', 'pressa yangu', 'hypertention', 'hipatension'],
  },

  diabetes: {
    canonical_en: 'Diabetes Mellitus',
    canonical_sw: 'Kisukari',
    en: [
      'diabetes', 'diabetes mellitus', 'dm', 'type 2 diabetes', 't2dm',
      'type 1 diabetes', 't1dm', 'type ii diabetes', 'sugar disease',
      'high sugar', 'sugar diabetes', 'diabetic',
    ],
    sw: [
      'kisukari', 'ugonjwa wa kisukari', 'ugonjwa wa sukari',
      'kisukari aina ya 2', 'kisukari aina ya 1',
      'kisukari cha aina ya pili', 'kisukari cha aina ya kwanza',
    ],
    sw_mtaa: [
      'sukari', 'sukari imepanda', 'sukari ya damu', 'sukari yangu',
      'nina sukari', 'sugar', 'sugar imepanda', 'glucose imepanda',
      'kisukari kimepanda', 'sukari iko juu',
    ],
    slang: ['diabetis', 'diabeties', 'diabitis', 'sukari ime juu', 'diabaties', 'kisukar'],
  },

  gestational_diabetes: {
    canonical_en: 'Gestational Diabetes',
    canonical_sw: 'Kisukari cha Ujauzito',
    en: ['gestational diabetes', 'gdm', 'pregnancy diabetes', 'diabetes in pregnancy', 'diabetes of pregnancy'],
    sw: ['kisukari cha ujauzito', 'kisukari cha mimba', 'kisukari wakati wa mimba'],
    sw_mtaa: ['sukari ya mimba', 'sukari ya ujauzito', 'sugar wakati wa mimba'],
    slang: ['gdm', 'gestat diabetes'],
  },

  // ════════════════════════════════════════════════════════════════════
  // MATERNAL BLOCK (Phase 7)
  // ════════════════════════════════════════════════════════════════════
  maternal_care: {
    canonical_en: 'Maternal Care (Pregnancy & Childbirth)',
    canonical_sw: 'Huduma za Mama (Ujauzito na Kujifungua)',
    en: [
      'maternal care', 'maternal health', 'pregnancy care', 'pregnancy', 'pregnant',
      'i am pregnant', "i'm pregnant", 'expecting', 'antenatal', 'antenatal care',
      'anc', 'childbirth', 'labor', 'labour', 'delivery', 'postnatal', 'postpartum',
      'after birth', 'after delivery',
      'fetal movement', 'fetal movements', 'baby not moving', 'reduced fetal movements',
      'baby moving less', 'baby moves less',
      'baby blues', 'postnatal blues', 'birth plan', 'delivery plan',
      'birth preparedness', 'mother and baby health',
    ],
    sw: [
      'huduma za mama', 'huduma ya mama na mtoto', 'afya ya mama', 'ujauzito',
      'mimba', 'nina mimba', 'nina ujauzito', 'mjamzito', 'huduma za ujauzito',
      'kliniki ya wajawazito', 'kabla ya kujifungua', 'baada ya kujifungua',
      'kujifungua', 'leba', 'uchungu', 'baada ya kuzaa',
      'mwendo wa mtoto tumboni', 'mtoto hasongi', 'mtoto kusonga kidogo',
      'huzuni baada ya kuzaa', 'huzuni za baada ya kujifungua',
      'mpango wa kujifungua', 'maandalizi ya kujifungua',
    ],
    sw_mtaa: [
      'mimba', 'nina mimba', 'nimepata mimba', 'mjamzito', 'mama mjamzito',
      'kliniki ya mimba', 'leba', 'uchungu wa kuzaa', 'baada ya kujifungua',
      'baada ya leba', 'siku za uchungu',
      'mtoto hasongi tumboni', 'mtoto hasongi', 'mwendo wa mtoto umepungua',
      'baby blues', 'huzuni baada ya kuzaa', 'birth plan',
    ],
    slang: ['mimbani', 'expectant', 'kwenye mimba'],
  },

  preeclampsia: {
    canonical_en: 'Pre-eclampsia / Eclampsia',
    canonical_sw: 'Kifafa cha Mimba (Pre-eclampsia / Eclampsia)',
    en: [
      'preeclampsia', 'pre-eclampsia', 'pre eclampsia', 'eclampsia',
      'pregnancy hypertension', 'high blood pressure in pregnancy',
      'pregnancy induced hypertension', 'pih', 'gestational hypertension',
      'severe pre-eclampsia', 'severe preeclampsia', 'hellp', 'hellp syndrome',
      'proteinuria in pregnancy', 'pregnancy seizures',
    ],
    sw: [
      'kifafa cha mimba', 'shinikizo la damu la mimba', 'shinikizo la damu wakati wa mimba',
      'presha ya mimba', 'eclampsia', 'preeclampsia', 'degedege la mimba',
      'kifafa wakati wa mimba', 'protini kwenye mkojo wa mimba',
    ],
    sw_mtaa: [
      'kifafa cha mimba', 'presha ya mimba', 'presha kwenye mimba',
      'shinikizo la mimba', 'degedege la mimba', 'kichwa kikali na mimba',
      'protini kwenye mkojo', 'mkojo wenye protini',
    ],
    slang: ['preec', 'pe', 'eclamp'],
  },

  pph: {
    canonical_en: 'Postpartum Haemorrhage (PPH)',
    canonical_sw: 'Kutoka Damu Baada ya Kujifungua (PPH)',
    en: [
      'postpartum haemorrhage', 'postpartum hemorrhage', 'pph',
      'bleeding after birth', 'bleeding after delivery', 'heavy bleeding after delivery',
      'excessive bleeding after birth', 'primary pph', 'secondary pph',
      'atonic uterus', 'retained placenta',
    ],
    sw: [
      'kutoka damu baada ya kujifungua', 'kutoka damu nyingi baada ya kuzaa',
      'damu nyingi baada ya leba', 'kuvuja damu baada ya kujifungua',
      'pph', 'kutokwa na damu baada ya kuzaa',
    ],
    sw_mtaa: [
      'damu nyingi baada ya kuzaa', 'damu inavuja baada ya leba',
      'natoka damu baada ya kujifungua', 'natokwa damu sana baada ya kuzaa',
    ],
    slang: ['pph', 'pp bleeding'],
  },

  anc_continuity: {
    canonical_en: 'Antenatal Care (ANC)',
    canonical_sw: 'Huduma za Ujauzito (ANC)',
    en: [
      'anc', 'antenatal care', 'antenatal visits', 'antenatal contact',
      'pregnancy visits', 'pregnancy check-up', 'pregnancy checkup',
      'how many anc visits', '8 contact anc', 'eight contact anc',
      'first anc visit', 'when to start anc',
    ],
    sw: [
      'kliniki ya wajawazito', 'kliniki ya mimba', 'huduma za ujauzito',
      'huduma kabla ya kujifungua', 'ziara za mimba', 'ziara za ujauzito',
      'ziara nane za mimba', 'anc',
    ],
    sw_mtaa: [
      'kliniki ya mimba', 'ziara za mimba', 'siku za kliniki',
      'kliniki ya wajawazito', 'kliniki mimba ngapi',
    ],
    slang: ['anc visits', 'antenatal'],
  },

  // ════════════════════════════════════════════════════════════════════
  // PNEUMONIA BLOCK (Phase 8)
  // ════════════════════════════════════════════════════════════════════
  pneumonia: {
    canonical_en: 'Pneumonia',
    canonical_sw: 'Nimonia (Maambukizi ya Mapafu)',
    en: [
      'pneumonia', 'chest infection', 'lung infection', 'lower respiratory infection',
      'lri', 'pneumonia infection', 'lobar pneumonia', 'bronchopneumonia',
      'walking pneumonia', 'atypical pneumonia',
      'antibiotic for cough', 'antibiotic for chest infection',
      'when to give antibiotic for cough', 'when to give antibiotic for pneumonia',
      'when to give oxygen', 'when to start oxygen', 'oxygen for breathing difficulty',
      'chronic cough', 'long cough', 'persistent cough', 'cough for weeks',
      'fever and breathing difficulty', 'fever and shortness of breath',
      'fever and difficulty breathing', 'breathing difficulty with fever',
    ],
    sw: [
      'nimonia', 'maambukizi ya mapafu', 'ugonjwa wa mapafu', 'maambukizi ya kifua',
      'nimonia ya mapafu', 'mafua makali ya kifua', 'kifua kibaya',
      'kukohoa kwa muda mrefu', 'kikohozi cha muda mrefu', 'kikohozi kisichoisha',
      'homa na kupumua kwa shida', 'homa na kushindwa kupumua',
      'anapumua kwa shida', 'kushindwa kupumua', 'kupumua kwa shida na homa',
      'antibiotiki ya kikohozi', 'antibiotic ya kikohozi',
      'lini wa kuanza oksijeni', 'oksijeni kwa nimonia',
    ],
    sw_mtaa: [
      'nimonia', 'mafua ya kifua', 'kifua kibaya', 'mapafu yameambukizwa',
      'kifua kinachouma na kikohozi', 'pumu ya kifua',
      'kukohoa kwa muda mrefu', 'kikohozi cha siku nyingi',
      'baba anapumua kwa shida', 'mama anapumua kwa shida',
      'anapumua kwa shida', 'pumzi inakwama',
    ],
    slang: ['pneumo', 'lung infection', 'chest infection', 'newmonia'],
  },

  cap_adult: {
    canonical_en: 'Community-Acquired Pneumonia (Adult)',
    canonical_sw: 'Nimonia ya Jamii (Mtu Mzima)',
    en: [
      'community acquired pneumonia', 'cap', 'community pneumonia',
      'outpatient pneumonia', 'mild pneumonia', 'moderate pneumonia',
      'adult pneumonia', 'pneumonia in adults',
    ],
    sw: [
      'nimonia ya jamii', 'nimonia ya mtu mzima', 'nimonia ya kawaida',
      'nimonia ya nje', 'nimonia ya wagonjwa wa nje',
    ],
    sw_mtaa: [
      'nimonia ya kawaida', 'nimonia ya wagonjwa wa nje', 'nimonia ya kuandikiwa nyumbani',
    ],
    slang: ['cap', 'outpatient pneumonia'],
  },

  severe_pneumonia: {
    canonical_en: 'Severe Pneumonia',
    canonical_sw: 'Nimonia Kali',
    en: [
      'severe pneumonia', 'very severe pneumonia', 'pneumonia with chest indrawing',
      'pneumonia with low oxygen', 'pneumonia needing admission',
      'inpatient pneumonia', 'pneumonia with hypoxia',
    ],
    sw: [
      'nimonia kali', 'nimonia kali sana', 'nimonia inayohitaji kulazwa',
      'nimonia na mbavu kuingia', 'nimonia na oksijeni ya chini',
    ],
    sw_mtaa: [
      'nimonia kali', 'nimonia inayohitaji kulazwa hospitali',
      'mbavu zinaingia ndani', 'kupumua kwa shida sana',
    ],
    slang: ['severe pneumo', 'inpatient pneumo'],
  },

  pediatric_pneumonia: {
    canonical_en: 'Pneumonia in Children',
    canonical_sw: 'Nimonia kwa Watoto',
    en: [
      'pediatric pneumonia', 'paediatric pneumonia', 'pneumonia in children',
      'childhood pneumonia', 'child pneumonia', 'imci pneumonia',
      'fast breathing in children', 'chest indrawing child', 'pneumonia under 5',
    ],
    sw: [
      'nimonia kwa watoto', 'nimonia ya mtoto', 'nimonia ya watoto wadogo',
      'kupumua haraka kwa mtoto', 'mbavu kuingia kwa mtoto',
      'imci nimonia', 'nimonia ya watoto chini ya miaka mitano',
    ],
    sw_mtaa: [
      'nimonia ya mtoto', 'mtoto wangu ana nimonia', 'mtoto anapumua haraka',
      'mtoto ana kikohozi na homa', 'kifua cha mtoto kibaya',
    ],
    slang: ['child pneumo', 'kid pneumonia'],
  },

  hap_hcap: {
    canonical_en: 'Hospital-Acquired / Health-Care-Associated Pneumonia',
    canonical_sw: 'Nimonia Iliyopatikana Hospitali',
    en: [
      'hospital acquired pneumonia', 'hap', 'health care associated pneumonia',
      'hcap', 'nosocomial pneumonia', 'ventilator associated pneumonia', 'vap',
      'icu pneumonia',
    ],
    sw: [
      'nimonia iliyopatikana hospitali', 'nimonia ya hospitalini',
      'nimonia baada ya kulazwa', 'nimonia ya ventilator',
    ],
    sw_mtaa: [
      'nimonia baada ya kulazwa', 'nimonia ya hospitali',
      'nimonia ya ICU', 'nimonia ya mashine ya kupumulia',
    ],
    slang: ['hap', 'vap', 'icu pneumo'],
  },

  aspiration_pneumonia: {
    canonical_en: 'Aspiration Pneumonia',
    canonical_sw: 'Nimonia ya Kukohoa Chakula / Tapika',
    en: [
      'aspiration pneumonia', 'aspiration', 'choking pneumonia',
      'pneumonia after choking', 'pneumonia after stroke',
      'pneumonia post stroke', 'ng tube pneumonia',
    ],
    sw: [
      'nimonia ya kukohoa chakula', 'nimonia ya kutapika', 'nimonia baada ya kiharusi',
      'nimonia ya kumeza vibaya', 'nimonia ya mrija wa kulisha',
    ],
    sw_mtaa: [
      'nimonia baada ya kuzimia', 'nimonia baada ya kupiga chai vibaya',
      'kumeza vibaya kukasababisha nimonia',
    ],
    slang: ['aspiration', 'choking pneumo'],
  },

  pjp: {
    canonical_en: 'Pneumocystis Pneumonia (PJP / PCP)',
    canonical_sw: 'Nimonia ya Pneumocystis (PJP / PCP) — Inayohusishwa na VVU',
    en: [
      'pneumocystis pneumonia', 'pjp', 'pcp', 'pneumocystis jirovecii pneumonia',
      'pneumocystis carinii pneumonia', 'aids pneumonia', 'hiv pneumonia',
      'opportunistic pneumonia', 'pneumonia in hiv',
    ],
    sw: [
      'nimonia ya pneumocystis', 'nimonia ya vvu', 'nimonia ya ukimwi',
      'nimonia nyemelezi', 'nimonia ya watu wenye vvu',
    ],
    sw_mtaa: [
      'pcp', 'pjp', 'nimonia ya vvu', 'nimonia ya ukimwi',
      'pneumonia kwa mtu wa vvu',
    ],
    slang: ['pcp', 'pjp', 'aids pneumonia'],
  },

  // ── Asthma + variants (Phase 9) ────────────────────────────────────
  asthma: {
    canonical_en: 'Asthma',
    canonical_sw: 'Pumu',
    en: [
      'asthma', 'bronchial asthma', 'asthmatic', 'wheeze illness',
      'reactive airway disease', 'rad', 'allergic asthma',
      'wheezy chest', 'chronic wheeze',
      // device + management terms patients ask about as standalone questions
      'spacer', 'spacer device', 'asthma spacer', 'inhaler spacer',
      'spacer chamber', 'aerochamber', 'volumatic',
      'asthma action plan', 'action plan',
      'oral thrush from inhaler', 'thrush from inhaler', 'inhaler thrush',
      'asthma trigger', 'asthma triggers', 'trigger avoidance',
      'inhaler technique', 'how to use inhaler',
    ],
    sw: [
      'pumu', 'ugonjwa wa pumu', 'pumu sugu',
      'kifua kibana', 'kupumua kwa kuvuma',
      'maradhi ya pumu',
      'spacer', 'mpango wa hatua wa pumu',
      'trigger ya pumu', 'vitu vinavyoanzisha pumu',
    ],
    sw_mtaa: [
      'pumu', 'pumu yangu', 'nina pumu', 'mtoto ana pumu',
      'kifua kinabana', 'kifua kimebana', 'kifua kinabanwa',
      'kupumua kwa kuvuma', 'wheeze', 'anawheeze',
      'kifua kinapiga filimbi', 'kifua kinanguruma',
      'anaponi', 'pumzi inapiga filimbi',
      'spacer', 'action plan', 'oral thrush',
      'thrush ya mdomo', 'fangasi ya mdomo kutokana na inhaler',
      // Trigger-phrase routings — these long surface forms must beat the
      // shorter pneumonia overlap on "kifua kinabana"
      'kifua kinabana nikiingia kwenye baridi',
      'kifua kinabana nikiwa kwenye baridi',
      'kifua kinabana wakati wa baridi',
      'kifua kinabana baada ya mazoezi',
      'kifua kinabana nikiwa na vumbi',
      'kifua kinabana nikinusa moshi',
    ],
    slang: ['asma', 'astma', 'asthima'],
  },

  mild_persistent_asthma: {
    canonical_en: 'Mild Persistent Asthma (GINA Step 1-2)',
    canonical_sw: 'Pumu Ndogo ya Kudumu',
    en: [
      'mild persistent asthma', 'mild asthma', 'step 1 asthma', 'step 2 asthma',
      'gina step 1', 'gina step 2', 'intermittent asthma',
    ],
    sw: [
      'pumu ndogo ya kudumu', 'pumu ndogo', 'pumu ya hatua ya 1',
      'pumu ya hatua ya 2',
    ],
    sw_mtaa: [
      'pumu ndogo', 'pumu ya mara chache', 'pumu si kali',
    ],
    slang: ['mild asthma'],
  },

  moderate_persistent_asthma: {
    canonical_en: 'Moderate Persistent Asthma (GINA Step 3-4)',
    canonical_sw: 'Pumu ya Kati ya Kudumu',
    en: [
      'moderate persistent asthma', 'moderate asthma', 'step 3 asthma',
      'step 4 asthma', 'gina step 3', 'gina step 4', 'daily asthma',
    ],
    sw: [
      'pumu ya kati', 'pumu ya kudumu ya kati', 'pumu ya hatua ya 3',
      'pumu ya hatua ya 4',
    ],
    sw_mtaa: [
      'pumu ya kati', 'pumu ya kila siku', 'pumu ya wastani',
    ],
    slang: ['moderate asthma'],
  },

  severe_persistent_asthma: {
    canonical_en: 'Severe Persistent Asthma (GINA Step 5)',
    canonical_sw: 'Pumu Kali ya Kudumu',
    en: [
      'severe persistent asthma', 'severe asthma', 'difficult asthma',
      'refractory asthma', 'step 5 asthma', 'gina step 5',
      'brittle asthma', 'uncontrolled asthma',
    ],
    sw: [
      'pumu kali', 'pumu kali ya kudumu', 'pumu sugu kali',
      'pumu isiyodhibitiwa',
    ],
    sw_mtaa: [
      'pumu kali', 'pumu mbaya sana', 'pumu haitulii',
      'pumu inashinda dawa',
    ],
    slang: ['severe asthma', 'difficult asthma'],
  },

  acute_asthma_exacerbation: {
    canonical_en: 'Acute Asthma Exacerbation',
    canonical_sw: 'Shambulizi la Pumu la Papo Hapo',
    en: [
      'acute asthma exacerbation', 'asthma exacerbation', 'asthma attack',
      'asthma flare', 'asthma flare-up', 'asthma crisis',
      'acute severe asthma', 'asthma attack',
    ],
    sw: [
      'shambulizi la pumu', 'shambulizi la pumu la papo hapo',
      'pumu kuzidi', 'pumu kushambulia',
    ],
    sw_mtaa: [
      'pumu imeshambulia', 'pumu inashambulia', 'pumu imezidi',
      'pumu attack', 'attack ya pumu', 'pumu imekuja',
      'pumu inakuja', 'kifua kinabana sana',
      'siwezi kupumua', 'sipumui vizuri', 'pumzi inakatika',
    ],
    slang: ['asthma attack', 'attack ya pumu', 'pumu imeshambulia'],
  },

  life_threatening_asthma: {
    canonical_en: 'Life-Threatening Asthma',
    canonical_sw: 'Pumu Inayotishia Maisha',
    en: [
      'life threatening asthma', 'life-threatening asthma',
      'near fatal asthma', 'near-fatal asthma', 'silent chest',
      'fatal asthma', 'asthma emergency',
    ],
    sw: [
      'pumu inayotishia maisha', 'pumu ya hatari kubwa',
      'pumu karibu na kifo', 'kifua kimya',
    ],
    sw_mtaa: [
      'pumu mbaya sana', 'pumu inaweza kuua', 'pumu hatari',
      'midomo ya bluu', 'siwezi kuongea', 'sipati pumzi kabisa',
    ],
    slang: ['silent chest', 'fatal asthma'],
  },

  pediatric_asthma: {
    canonical_en: 'Pediatric Asthma',
    canonical_sw: 'Pumu ya Watoto',
    en: [
      'pediatric asthma', 'paediatric asthma', 'childhood asthma',
      'asthma in children', 'child asthma', 'infant wheeze',
      'wheezy infant', 'preschool wheeze',
    ],
    sw: [
      'pumu ya watoto', 'pumu ya mtoto', 'pumu kwa watoto',
      'wheeze ya watoto wachanga',
    ],
    sw_mtaa: [
      'mtoto ana pumu', 'mtoto anawheeze', 'mtoto anabana',
      'mwanangu ana pumu', 'mtoto kifua kinabana',
      'mtoto anapumua kwa kuvuma',
    ],
    slang: ['child asthma', 'baby asthma'],
  },

  exercise_induced_asthma: {
    canonical_en: 'Exercise-Induced Bronchospasm',
    canonical_sw: 'Bronchospasm Inayochochewa na Mazoezi',
    en: [
      'exercise induced asthma', 'exercise-induced asthma',
      'exercise induced bronchospasm', 'exercise-induced bronchospasm',
      'eib', 'sport asthma', 'sports asthma', 'running asthma',
    ],
    sw: [
      'pumu inayochochewa na mazoezi', 'pumu ya mazoezi',
      'bronchospasm ya mazoezi',
    ],
    sw_mtaa: [
      'pumu wakati wa mazoezi', 'pumu ikianza kukimbia',
      'kifua kinabana wakati wa michezo', 'pumu wakati wa kukimbia',
    ],
    slang: ['eib', 'sport asthma'],
  },

  // ──────────────────────────────────────────────────────────────────
  // COPD — Phase 10
  // ──────────────────────────────────────────────────────────────────
  copd: {
    canonical_en: 'COPD (Chronic Obstructive Pulmonary Disease)',
    canonical_sw: 'COPD (Ugonjwa Sugu wa Kuziba kwa Mapafu)',
    en: [
      'copd', 'chronic obstructive pulmonary disease',
      'chronic bronchitis', 'emphysema',
      'chronic obstructive lung disease', 'obstructive lung disease',
      'biomass lung disease', 'biomass copd',
      'smoker lung', 'smokers lung', 'smoker\'s lung',
      'cigarette lung disease',
      'chronic lung disease in adults',
      'long-term lung disease', 'long term lung disease',
      'gold a', 'gold b', 'gold c', 'gold d', 'gold e',
      'gold stage', 'gold group',
      'aecopd', 'copd exacerbation', 'copd flare', 'copd flare up',
      'copd attack', 'copd crisis', 'chest infection copd',
      'pulmonary rehabilitation', 'pulmonary rehab',
      'breathing rehab', 'lung rehab',
      'home oxygen', 'long term oxygen', 'long-term oxygen', 'ltot',
      'oxygen therapy at home', 'home oxygen therapy',
      // Asthma-COPD overlap routes here (mentioned as comorbidity in COPD)
      'aco', 'asthma copd overlap', 'asthma-copd overlap',
      'asthma copd overlap syndrome',
      // Biomass / smoke routes — high-value Tanzanian phrasings
      'wood smoke lung damage', 'wood smoke copd', 'firewood lung damage',
      'cooking smoke lung damage', 'cooking with charcoal lung disease',
      'charcoal smoke copd', 'charcoal cooking copd',
      'kitchen smoke lung disease', 'biomass exposure copd',
      'household air pollution lung disease',
      // Smoking cessation framing — the "can my lungs heal" core question
      'stop smoking copd', 'quit smoking copd', 'smoking cessation copd',
      'if i stop smoking', 'if i quit smoking',
      'can my lungs heal', 'can lungs recover after smoking',
      'will my lungs heal', 'lungs recovery after quitting',
      // Pursed-lip and breathing techniques cluster
      'pursed lip breathing', 'pursed-lip breathing',
      'diaphragmatic breathing', 'breathing technique copd',
      'controlled breathing copd', 'breathing exercise copd',
    ],
    sw: [
      'ugonjwa sugu wa kuziba kwa mapafu',
      'ugonjwa sugu wa mapafu',
      'mapafu yaliyoharibika na moshi',
      'magonjwa ya mapafu ya kudumu',
      'kuziba sugu kwa mapafu',
      'kushindwa kupumua kwa muda mrefu',
      'ugonjwa wa mapafu wa wavutaji sigara',
      'ugonjwa wa mapafu kutokana na moshi wa kuni',
      'mlipuko wa copd', 'shambulizi la copd',
      'ukarabati wa mapafu',
      'tiba ya oksijeni ya nyumbani',
      // Asthma-COPD overlap
      'mwingiliano wa pumu na copd',
      // Smoking cessation framing
      'kuacha kuvuta sigara copd',
      'nikiacha kuvuta sigara',
      'mapafu yanaweza kupona',
      'nikiacha kuvuta sigara mapafu yanaweza kupona',
      // Breathing techniques
      'kupumua kupitia midomo iliyofungwa',
      'kupumua kwa kiwambo cha tumbo',
      'mbinu ya kupumua copd',
    ],
    sw_mtaa: [
      'copd', 'nina copd', 'baba ana copd', 'bibi ana copd',
      'mama ana copd', 'shangazi ana copd',
      'ugonjwa wa mapafu wa kudumu',
      'mapafu yameharibika na moshi',
      'kifua dhaifu', 'mapafu dhaifu',
      'baba anasota kupumua',
      'mama anapika kwa kuni', 'mama amepika kwa kuni miaka mingi',
      'anapika kwa kuni siku zote',
      'anavuta sigara miaka mingi',
      'sigara imeharibu mapafu',
      'moshi wa kuni umeharibu mapafu',
      'pumzi haisaidii kupanda ngazi',
      'siwezi kupanda ngazi', 'anashindwa kupanda ngazi',
      'aecopd', 'copd flare', 'copd exacerbation',
      'home oxygen', 'oxygen ya nyumbani',
      'pulmonary rehab', 'lung rehab',
      // ACO / asthma-COPD overlap
      'aco', 'asthma copd overlap',
      // Smoking cessation
      'nikiacha kuvuta sigara mapafu yanaweza kupona',
      'mapafu yangu yanaweza kupona nikiacha',
      'lung healing baada ya kuacha sigara',
      // Breathing techniques
      'pursed lip breathing', 'pursed-lip breathing',
      'breathing technique', 'breathing exercises',
    ],
    slang: ['copd', 'cigarette lung', 'biomass lung', 'aco'],
  },

  copd_stable_mild_moderate: {
    canonical_en: 'COPD — stable, mild to moderate (GOLD A/B)',
    canonical_sw: 'COPD — thabiti, ndogo hadi ya wastani',
    en: [
      'mild copd', 'moderate copd', 'mild to moderate copd',
      'stable copd', 'copd stable', 'gold a copd', 'gold b copd',
      'early copd', 'gold group a', 'gold group b',
    ],
    sw: [
      'copd ndogo', 'copd ya wastani', 'copd thabiti',
      'copd ya mwanzo',
    ],
    sw_mtaa: [
      'copd ndogo', 'copd ya wastani', 'copd thabiti',
      'mild copd', 'moderate copd', 'stable copd',
      'copd inakaa vizuri',
    ],
    slang: ['mild copd', 'gold a', 'gold b'],
  },

  copd_severe_stable: {
    canonical_en: 'COPD — severe, frequent exacerbator (GOLD Group E)',
    canonical_sw: 'COPD — kali, mlipukaji wa mara kwa mara',
    en: [
      'severe copd', 'advanced copd', 'end stage copd', 'end-stage copd',
      'gold e copd', 'gold group e', 'gold d copd', 'gold group d',
      'frequent exacerbator', 'frequent copd exacerbations',
      'severe stable copd', 'advanced lung disease',
    ],
    sw: [
      'copd kali', 'copd ya hali ya juu',
      'mapafu yameharibika sana', 'ugonjwa wa hali ya juu wa mapafu',
      'milipuko ya mara kwa mara ya copd',
    ],
    sw_mtaa: [
      'copd kali', 'advanced copd', 'severe copd',
      'baba ana copd kali', 'bibi yangu ana copd ya juu',
      'anashindwa kupumua kabisa',
      'hawezi kutoka nyumbani kwa shida ya pumzi',
      'too breathless kutoka nje',
    ],
    slang: ['severe copd', 'gold e', 'end stage copd'],
  },

  aecopd_outpatient: {
    canonical_en: 'Acute Exacerbation of COPD — outpatient/non-severe',
    canonical_sw: 'Mlipuko Wa Papo Hapo Wa COPD — wa nje',
    en: [
      'aecopd outpatient', 'mild copd exacerbation', 'moderate copd exacerbation',
      'copd flare at home', 'copd exacerbation home',
      'non severe copd exacerbation', 'non-severe copd exacerbation',
      'aecopd at home', 'copd worsening at home',
    ],
    sw: [
      'mlipuko wa copd wa nyumbani', 'mlipuko mdogo wa copd',
      'flare ya copd nyumbani',
    ],
    sw_mtaa: [
      'mlipuko wa copd nyumbani', 'copd inaongezeka nyumbani',
      'copd flare nyumbani', 'aecopd at home',
      'kikohozi cha copd kimezidi',
      'makohozi ya copd yamebadilika rangi',
    ],
    slang: ['copd flare', 'aecopd home'],
  },

  aecopd_severe: {
    canonical_en: 'Severe Acute Exacerbation of COPD — needs admission',
    canonical_sw: 'Mlipuko Mkali Wa Papo Hapo Wa COPD',
    en: [
      'severe aecopd', 'severe copd exacerbation', 'severe copd flare',
      'severe copd attack', 'copd crisis', 'copd respiratory failure',
      'admission for copd', 'hospital for copd',
      'niv copd', 'bipap copd', 'non invasive ventilation copd',
      'non-invasive ventilation copd',
      'copd hypercapnia', 'hypercapnic respiratory failure',
      'co2 retention copd', 'co2 retention',
      'copd needs oxygen', 'copd hospital',
    ],
    sw: [
      'mlipuko mkali wa copd', 'shambulizi kali la copd',
      'kushindwa kupumua kali kwa copd',
      'mkusanyiko wa co2', 'co2 imejaa',
      'kulazwa kwa copd',
    ],
    sw_mtaa: [
      'mlipuko mkali wa copd', 'severe copd flare',
      'baba anashindwa kupumua kabisa',
      'mama ametoka nje ya pumzi kabisa',
      'co2 retention', 'co2 imejaa', 'co2 imepanda',
      'niv', 'bipap', 'oksijeni ya hospitali kwa copd',
      'anapumua kwa shida sana hawezi kuzungumza',
      'anachanganyikiwa na kushindwa kupumua',
      'midomo ya bluu kwa copd',
    ],
    slang: ['severe copd', 'copd crisis', 'aecopd severe'],
  },

  cor_pulmonale_copd: {
    canonical_en: 'Cor Pulmonale (right-heart strain from chronic lung disease)',
    canonical_sw: 'Cor Pulmonale (Mfadhaiko wa Moyo wa Kulia)',
    en: [
      'cor pulmonale', 'right heart failure copd', 'right-heart failure copd',
      'pulmonary hypertension copd', 'pulmonary heart disease',
      'right sided heart failure from lung disease',
      'right-sided heart failure copd',
      'ankle swelling copd', 'leg swelling copd',
      'raised jvp copd',
    ],
    sw: [
      'cor pulmonale', 'kushindwa kwa moyo wa kulia kutoka mapafu',
      'shinikizo la juu la mapafu',
      'uvimbe wa miguu kutoka mapafu',
    ],
    sw_mtaa: [
      'cor pulmonale', 'right heart failure ya copd',
      'miguu inavimba kwa sababu ya mapafu',
      'baba miguu inavimba na ana copd',
      'mama miguu inavimba kwa copd',
      'uvimbe wa kifundo kwa copd',
      'ankle swelling kwa copd',
      'pulmonary hypertension', 'ph kutoka copd',
    ],
    slang: ['cor pulmonale', 'right heart failure'],
  },

  post_tb_obstructive_lung_disease: {
    canonical_en: 'Post-TB Obstructive Lung Disease (PTLD)',
    canonical_sw: 'Ugonjwa Wa Mapafu Wa Kuziba Baada Ya TB',
    en: [
      'ptld', 'post tb lung disease', 'post-tb lung disease',
      'post tuberculosis lung disease', 'post-tuberculosis lung disease',
      'post tb copd', 'post-tb copd',
      'post tb obstructive lung disease', 'post-tb obstructive lung disease',
      'lung damage after tb', 'lung scarring after tb',
      'after tb breathing problem', 'cough after tb treatment',
      'breathlessness after tb',
      'old tb lung', 'old tb damage',
      'bronchiectasis after tb',
    ],
    sw: [
      'ugonjwa wa mapafu baada ya tb',
      'uharibifu wa mapafu baada ya tb',
      'kovu la mapafu baada ya tb',
      'copd baada ya tb',
      'mapafu yameharibika baada ya tb',
    ],
    sw_mtaa: [
      'ptld', 'post tb lung disease', 'lung damage baada ya tb',
      'nilikuwa na tb na sasa siwezi kupumua',
      'nimekuwa na tb miaka iliyopita sasa kifua kinanisumbua',
      'baada ya tb sina pumzi',
      'tb imeniacha na shida ya kupumua',
      'old tb', 'tb ya zamani imeacha shida',
      'kifua dhaifu baada ya tb',
      'kikohozi baada ya tb', 'cough baada ya tb',
    ],
    slang: ['ptld', 'post tb copd', 'old tb lung'],
  },

  dka: {
    canonical_en: 'Diabetic Ketoacidosis (DKA)',
    canonical_sw: 'Kisukari Kikali (DKA)',
    en: ['dka', 'diabetic ketoacidosis', 'ketoacidosis', 'ketones', 'ketone bodies', 'high ketones'],
    sw: ['kisukari kikali', 'sumu ya sukari', 'asidi ya damu'],
    sw_mtaa: ['dka', 'ketones zimepanda', 'sumu ya sukari', 'sukari imepanda mno', 'sukari iko juu sana'],
    slang: ['ketoacedosis', 'keto acid'],
  },

  hypoglycemia: {
    canonical_en: 'Hypoglycemia (Low Blood Sugar)',
    canonical_sw: 'Sukari ya Chini',
    en: ['hypoglycemia', 'hypoglycaemia', 'low blood sugar', 'low sugar', 'hypo', 'low glucose', 'sugar crash'],
    sw: ['sukari ya chini', 'sukari kushuka', 'sukari imeshuka', 'kupungua kwa sukari'],
    sw_mtaa: ['sukari imeshuka', 'hypo', 'sugar imeshuka', 'sukari iko chini', 'nimekuwa hypo'],
    slang: ['hipoglycemia', 'hypoglicemia'],
  },

  diabetic_foot: {
    canonical_en: 'Diabetic Foot',
    canonical_sw: 'Mguu wa Kisukari',
    en: ['diabetic foot', 'diabetic foot ulcer', 'foot ulcer', 'diabetic wound'],
    sw: ['mguu wa kisukari', 'jeraha la kisukari', 'jeraha la mguu kwa mwenye kisukari'],
    sw_mtaa: ['mguu wa sukari', 'jeraha mguuni la sukari', 'donda la mguu kisukari'],
    slang: ['sugar foot'],
  },

  diabetic_retinopathy: {
    canonical_en: 'Diabetic Retinopathy',
    canonical_sw: 'Macho ya Kisukari',
    en: ['diabetic retinopathy', 'retinopathy', 'diabetic eye disease', 'diabetes eye damage'],
    sw: ['macho ya kisukari', 'uharibifu wa macho kutokana na kisukari'],
    sw_mtaa: ['macho ya sukari', 'macho yameathirika kisukari', 'kuona vibaya kwa kisukari'],
    slang: ['diabetic eyes'],
  },

  ckd: {
    canonical_en: 'Chronic Kidney Disease',
    canonical_sw: 'Ugonjwa wa Figo Sugu',
    en: ['chronic kidney disease', 'ckd', 'kidney disease', 'kidney failure', 'renal failure', 'renal disease', 'kidney problem', 'renal impairment', 'kidney damage'],
    sw: ['ugonjwa wa figo', 'figo zinaharibika', 'figo zenye matatizo', 'figo kushindwa kufanya kazi', 'ugonjwa sugu wa figo', 'ugonjwa wa figo sugu'],
    sw_mtaa: ['figo', 'figo zangu', 'matatizo ya figo', 'figo zimeharibika', 'kidney problems', 'kidneys zangu', 'figo zinasumbua'],
    slang: ['ckd', 'kindney', 'kidny'],
  },

  ckd_early: {
    canonical_en: 'Chronic Kidney Disease — Early Stage (G1–G2)',
    canonical_sw: 'Ugonjwa wa Figo Sugu — Hatua za Awali (G1–G2)',
    en: [
      'ckd stage 1', 'ckd stage 2', 'ckd g1', 'ckd g2', 'early ckd',
      'early kidney disease', 'mild kidney disease', 'stage 1 kidney disease',
      'stage 2 kidney disease', 'kidney disease early stage',
    ],
    sw: [
      'figo hatua ya kwanza', 'figo hatua ya pili', 'ugonjwa wa figo wa mwanzo',
      'figo zimeanza kuharibika', 'ckd hatua ya awali',
    ],
    sw_mtaa: [
      'figo zimeanza kuharibika kidogo', 'figo hatua ya mwanzo', 'figo bado kidogo',
    ],
    slang: ['ckd 1', 'ckd 2', 'early ckd'],
  },

  ckd_moderate: {
    canonical_en: 'Chronic Kidney Disease — Moderate Stage (G3a–G3b)',
    canonical_sw: 'Ugonjwa wa Figo Sugu — Hatua ya Wastani (G3a–G3b)',
    en: [
      'ckd stage 3', 'ckd g3', 'ckd g3a', 'ckd g3b', 'moderate ckd',
      'moderate kidney disease', 'stage 3 kidney disease', 'stage 3 ckd',
    ],
    sw: [
      'figo hatua ya tatu', 'ugonjwa wa figo wa wastani', 'ckd hatua ya tatu',
      'figo zimeharibika kiasi',
    ],
    sw_mtaa: [
      'figo hatua ya tatu', 'figo zimeharibika kiasi fulani', 'figo wastani',
    ],
    slang: ['ckd 3', 'stage 3'],
  },

  ckd_advanced: {
    canonical_en: 'Chronic Kidney Disease — Advanced Stage (G4)',
    canonical_sw: 'Ugonjwa wa Figo Sugu — Hatua ya Juu (G4)',
    en: [
      'ckd stage 4', 'ckd g4', 'advanced ckd', 'advanced kidney disease',
      'severe kidney disease', 'stage 4 kidney disease', 'stage 4 ckd',
      'pre dialysis', 'pre-dialysis', 'approaching dialysis',
    ],
    sw: [
      'figo hatua ya nne', 'ugonjwa wa figo wa juu', 'ckd hatua ya nne',
      'figo zimeharibika sana', 'karibu na dialysis',
    ],
    sw_mtaa: [
      'figo hatua ya nne', 'figo zimeharibika sana', 'karibu kuanza dialysis',
    ],
    slang: ['ckd 4', 'stage 4'],
  },

  ckd_kidney_failure: {
    canonical_en: 'Kidney Failure / End-Stage Kidney Disease (G5)',
    canonical_sw: 'Figo Kushindwa Kabisa / Hatua ya Mwisho (G5)',
    en: [
      'ckd stage 5', 'ckd g5', 'end stage renal disease', 'esrd', 'eskd',
      'end stage kidney disease', 'kidney failure stage 5', 'complete kidney failure',
      'figo zimeshindwa kabisa', 'stage 5 ckd', 'stage 5 kidney disease',
    ],
    sw: [
      'figo hatua ya tano', 'figo kushindwa kabisa', 'figo zimekufa',
      'hatua ya mwisho ya figo', 'figo zimeshindwa kufanya kazi kabisa',
    ],
    sw_mtaa: [
      'figo zimekufa', 'figo zimeshindwa kabisa', 'figo hatua ya mwisho',
      'figo hazifanyi kazi tena',
    ],
    slang: ['ckd 5', 'esrd', 'stage 5', 'kidney failure'],
  },

  ckd_dialysis: {
    canonical_en: 'CKD — Dialysis',
    canonical_sw: 'Ugonjwa wa Figo Sugu — Dialysis',
    en: [
      'dialysis', 'haemodialysis', 'hemodialysis', 'peritoneal dialysis',
      'on dialysis', 'starting dialysis', 'kidney machine', 'dialysis machine',
      'renal replacement therapy', 'rrt', 'dialysis treatment',
    ],
    sw: [
      'dialysis', 'kusafisha damu', 'mashine ya figo', 'kuosha damu',
      'tiba ya kusafisha damu', 'nipo kwenye dialysis', 'naanza dialysis',
    ],
    sw_mtaa: [
      'dialysis', 'mashine ya figo', 'kusafisha damu', 'kuosha damu',
      'naenda kusafisha damu', 'mashine ya kusafisha damu',
    ],
    slang: ['dialysis', 'mashine ya figo', 'dayalisis'],
  },

  ckd_transplant: {
    canonical_en: 'CKD — Kidney Transplant',
    canonical_sw: 'Ugonjwa wa Figo Sugu — Upandikizaji wa Figo',
    en: [
      'kidney transplant', 'renal transplant', 'transplant', 'new kidney',
      'kidney donor', 'transplant waiting list', 'after kidney transplant',
    ],
    sw: [
      'upandikizaji wa figo', 'kupandikizwa figo', 'figo mpya',
      'kupewa figo', 'mtoaji wa figo',
    ],
    sw_mtaa: [
      'kupandikizwa figo', 'figo mpya', 'kupewa figo ya mtu',
      'transplant ya figo',
    ],
    slang: ['transplant', 'figo mpya'],
  },

  aki: {
    canonical_en: 'Acute Kidney Injury',
    canonical_sw: 'Jeraha la Figo la Ghafla',
    en: [
      'acute kidney injury', 'aki', 'acute renal failure', 'arf',
      'sudden kidney failure', 'kidneys suddenly failing', 'acute kidney failure',
    ],
    sw: [
      'jeraha la figo la ghafla', 'figo kushindwa ghafla', 'figo kuharibika ghafla',
      'tatizo la figo la dharura',
    ],
    sw_mtaa: [
      'figo zimeshindwa ghafla', 'figo zimeharibika haraka', 'figo dharura',
    ],
    slang: ['aki', 'acute kidney'],
  },

  malaria: {
    canonical_en: 'Malaria',
    canonical_sw: 'Malaria',
    en: ['malaria', 'plasmodium', 'plasmodium falciparum', 'p. falciparum', 'p falciparum', 'mosquito fever'],
    sw: ['malaria', 'homa ya malaria', 'ugonjwa wa malaria'],
    sw_mtaa: ['malaria', 'malaria yangu', 'homa ya mbu', 'maradhi ya mbu'],
    slang: ['malaria fulani', 'malaria kidogo', 'malaria ndogo'],
  },

  severe_malaria: {
    canonical_en: 'Severe Malaria',
    canonical_sw: 'Malaria Kali',
    en: ['severe malaria', 'complicated malaria', 'malaria with danger signs'],
    sw: ['malaria kali', 'malaria yenye dalili za hatari', 'malaria iliyo kali'],
    sw_mtaa: ['malaria kali', 'malaria mbaya', 'malaria imezidi'],
    slang: ['malaria ya kufa', 'malaria kubwa'],
  },

  cerebral_malaria: {
    canonical_en: 'Cerebral Malaria',
    canonical_sw: 'Malaria ya Ubongo',
    en: ['cerebral malaria', 'brain malaria', 'malaria coma', 'malaria with seizures'],
    sw: ['malaria ya ubongo', 'malaria ya kifafa', 'malaria iliyofika ubongo'],
    sw_mtaa: ['malaria ya ubongo', 'malaria imefika kichwani', 'malaria ya kifafa'],
    slang: ['malaria kichwani', 'malaria ya kichwa'],
  },

  malaria_pregnancy: {
    canonical_en: 'Malaria in Pregnancy',
    canonical_sw: 'Malaria wakati wa Mimba',
    en: ['malaria in pregnancy', 'malaria during pregnancy', 'pregnancy malaria', 'malaria pregnant'],
    sw: ['malaria katika mimba', 'malaria wakati wa mimba', 'mjamzito na malaria', 'malaria ya mjamzito'],
    sw_mtaa: ['malaria wakati wa mimba', 'mama mjamzito ana malaria', 'mimba na malaria'],
    slang: ['malaria mimbani'],
  },

  malaria_pediatric: {
    canonical_en: 'Malaria in Children',
    canonical_sw: 'Malaria kwa Watoto',
    en: ['malaria in children', 'pediatric malaria', 'childhood malaria', 'malaria child', 'child has malaria'],
    sw: ['malaria kwa watoto', 'malaria ya watoto', 'mtoto ana malaria', 'mtoto wangu malaria'],
    sw_mtaa: ['mtoto ana malaria', 'malaria kwa mtoto', 'mtoto wangu ana malaria', 'kichanga ana malaria'],
    slang: ['malaria ya kichanga'],
  },

  hiv: {
    canonical_en: 'HIV',
    canonical_sw: 'VVU',
    en: [
      'hiv', 'aids', 'hiv aids', 'human immunodeficiency virus', 'hiv positive',
      'hiv infection', 'u=u', 'u u', 'u equals u', 'undetectable equals untransmittable',
      'undetectable untransmittable', 'undetectable viral load', 'living with hiv', 'plhiv',
      'art', 'arv', 'arvs', 'antiretroviral', 'antiretrovirals', 'antiretroviral therapy',
      'on art', 'taking art', 'art for life', 'lifelong art',
      'missed art dose', 'missed art doses', 'missed my art', 'skipped art',
      'forgot my art', 'stopped art', 'ran out of art', 'stop art',
      'hiv stigma', 'stigma', 'iris', 'immune reconstitution',
    ],
    sw: [
      'vvu', 'ukimwi', 'virusi vya ukimwi', 'maambukizi ya vvu',
      'u=u', 'u u', 'kuishi na vvu',
      'siwezi kuambukiza', 'siwezi kuambukiza mwenza', 'sitaambukiza mwenza',
      'virusi havionekani siwezi kuambukiza',
      'art', 'arv', 'dawa za vvu', 'dawa za ukimwi', 'tiba ya vvu',
      'art ya maisha', 'art milele',
      'nimekosa dose za art', 'nimekosa dawa za vvu', 'nimesahau art',
      'nimeacha art', 'nimeishiwa art', 'niliruka dose za art',
      'unyanyapaa', 'unyanyapaa wa vvu', 'iris',
    ],
    sw_mtaa: [
      'vvu', 'ukimwi', 'nina vvu', 'positive', 'nina virusi', 'u=u',
      'nimekosa dawa za vvu', 'nimesahau kunywa art', 'nimeacha dawa za vvu',
    ],
    slang: ['vvu', 'h.i.v', 'hiv yangu', 'u=u'],
  },

  tb: {
    canonical_en: 'Tuberculosis (TB)',
    canonical_sw: 'Kifua Kikuu (TB)',
    en: ['tuberculosis', 'tb', 'pulmonary tb', 'pulmonary tuberculosis', 'lung tb', 'ptb', 'extra pulmonary tb', 'eptb'],
    sw: ['kifua kikuu', 'tb', 'kifua kikuu cha mapafu'],
    sw_mtaa: ['kifua kikuu', 'tb', 'kifua', 'nimepata tb', 'kifua kikubwa'],
    slang: ['ti bi', 'tibi', 'tb yangu'],
  },

  mdr_tb: {
    canonical_en: 'Multidrug-Resistant TB (MDR-TB)',
    canonical_sw: 'TB Sugu kwa Dawa (MDR-TB)',
    en: ['mdr tb', 'mdr-tb', 'multidrug resistant tb', 'drug resistant tb', 'rifampicin resistant tb', 'rr-tb', 'xdr tb', 'pre-xdr tb'],
    sw: ['tb sugu', 'kifua kikuu sugu', 'tb yenye usugu wa dawa', 'mdr tb'],
    sw_mtaa: ['tb sugu', 'tb iliyokuwa sugu', 'tb haipoi', 'kifua kikuu sugu'],
    slang: ['mdr', 'mdr tb yangu'],
  },

  eptb_lymph: {
    canonical_en: 'TB Lymphadenitis (Scrofula)',
    canonical_sw: 'TB ya Tezi za Lymph',
    en: ['tb lymph', 'tb lymph nodes', 'tb lymphadenitis', 'scrofula', 'cervical tb', 'neck tb'],
    sw: ['tb ya tezi', 'tb ya shingoni', 'matuvi ya tb', 'tezi za shingoni za tb'],
    sw_mtaa: ['tb shingoni', 'matuvi shingoni', 'tb ya tezi', 'matuvi'],
    slang: ['tb tezi'],
  },

  eptb_spine: {
    canonical_en: 'Spinal TB (Pott\'s Disease)',
    canonical_sw: 'TB ya Uti wa Mgongo',
    en: ['spinal tb', 'tb spine', "pott's disease", 'potts disease', 'pott s disease', 'pott disease', 'tb of the spine', 'spinal tuberculosis', 'tb backbone'],
    sw: ['tb ya uti wa mgongo', 'tb ya mgongo', 'tb ya mifupa ya mgongo'],
    sw_mtaa: ['tb mgongo', 'tb ya mgongo', 'tb imeshika mgongo'],
    slang: ['potts'],
  },

  eptb_meningitis: {
    canonical_en: 'TB Meningitis',
    canonical_sw: 'TB ya Ubongo (Utando wa Ubongo)',
    en: ['tb meningitis', 'tubercular meningitis', 'tbm', 'tb brain', 'tb of brain'],
    sw: ['tb ya ubongo', 'tb ya utando wa ubongo', 'utando wa ubongo na tb'],
    sw_mtaa: ['tb ubongoni', 'tb ya kichwa', 'tb imefika kichwani'],
    slang: ['tbm'],
  },

  eptb_abdominal: {
    canonical_en: 'Abdominal TB',
    canonical_sw: 'TB ya Tumboni',
    en: ['abdominal tb', 'tb of abdomen', 'peritoneal tb', 'intestinal tb', 'gut tb'],
    sw: ['tb ya tumboni', 'tb ya matumbo', 'tb ya tumbo'],
    sw_mtaa: ['tb tumboni', 'tb ya tumbo', 'tb imeshika tumbo'],
    slang: [],
  },

  eptb_pericardial: {
    canonical_en: 'TB Pericarditis',
    canonical_sw: 'TB ya Utando wa Moyo',
    en: ['tb pericarditis', 'pericardial tb', 'tb of heart', 'tb heart lining'],
    sw: ['tb ya utando wa moyo', 'tb karibu na moyo'],
    sw_mtaa: ['tb ya moyo', 'tb imefika moyoni'],
    slang: [],
  },

  miliary_tb: {
    canonical_en: 'Miliary TB',
    canonical_sw: 'TB Iliyoenea (Miliary)',
    en: ['miliary tb', 'disseminated tb', 'tb spread everywhere', 'widespread tb'],
    sw: ['tb iliyoenea', 'tb iliyosambaa', 'tb mwili mzima'],
    sw_mtaa: ['tb imeenea', 'tb mwili mzima', 'tb imesambaa'],
    slang: [],
  },

  latent_tb: {
    canonical_en: 'Latent TB Infection',
    canonical_sw: 'Maambukizi ya TB Yaliyojificha',
    en: ['latent tb', 'latent tuberculosis', 'ltbi', 'tb infection without disease', 'silent tb', 'inactive tb', 'tb contact'],
    sw: ['tb iliyojificha', 'maambukizi ya tb bila ugonjwa', 'tb iliyolala'],
    sw_mtaa: ['tb iliyolala', 'tb haijaonekana', 'nilikutana na mtu wa tb'],
    slang: ['ltbi'],
  },

  tb_pediatric: {
    canonical_en: 'TB in Children',
    canonical_sw: 'TB kwa Watoto',
    en: ['pediatric tb', 'childhood tb', 'tb in children', 'tb child', 'child has tb'],
    sw: ['tb kwa watoto', 'mtoto ana tb', 'tb ya mtoto'],
    sw_mtaa: ['mtoto ana tb', 'tb kwa mtoto', 'tb ya mtoto'],
    slang: [],
  },

  tb_pregnancy: {
    canonical_en: 'TB in Pregnancy',
    canonical_sw: 'TB wakati wa Mimba',
    en: ['tb pregnancy', 'tb in pregnancy', 'pregnant with tb', 'tb during pregnancy'],
    sw: ['tb katika mimba', 'tb wakati wa mimba', 'mjamzito na tb'],
    sw_mtaa: ['tb wakati wa mimba', 'mama mjamzito tb', 'tb mimbani'],
    slang: [],
  },

  post_tb_lung: {
    canonical_en: 'Post-TB Lung Disease',
    canonical_sw: 'Ugonjwa wa Mapafu Baada ya TB',
    en: ['post tb lung disease', 'post-tb', 'ptld', 'tb sequelae', 'lung damage after tb', 'bronchiectasis after tb', 'fibrosis after tb'],
    sw: ['mapafu baada ya tb', 'uharibifu wa mapafu baada ya tb'],
    sw_mtaa: ['baada ya tb mapafu yangu', 'tb iliharibu mapafu', 'kupumua baada ya tb'],
    slang: ['ptld'],
  },

  sickle_cell: {
    canonical_en: 'Sickle Cell Disease',
    canonical_sw: 'Ugonjwa wa Selimundu',
    en: ['sickle cell', 'sickle cell disease', 'sickle cell anemia', 'scd', 'ss disease', 'sickle cell trait'],
    sw: ['selimundu', 'ugonjwa wa selimundu', 'anemia ya selimundu', 'damu ya selimundu'],
    sw_mtaa: ['selimundu', 'sickle cell', 'damu ya sickle', 'nina sickle cell'],
    slang: ['sickle', 'sicker cell'],
  },

  // ──────────────────────────────────────────────────────────────────
  // PHASE 11 — Cardio-Renal-Neuro & Hematology
  // ──────────────────────────────────────────────────────────────────
  heart_failure: {
    canonical_en: 'Heart Failure',
    canonical_sw: 'Kushindwa kwa Moyo',
    en: [
      'heart failure', 'hf', 'congestive heart failure', 'chf',
      'cardiac failure', 'failing heart', 'weak heart',
      'cardiomyopathy', 'dilated cardiomyopathy', 'systolic dysfunction',
      'diastolic dysfunction', 'left ventricular dysfunction',
      'lvd', 'reduced ejection fraction', 'preserved ejection fraction',
      'low ejection fraction', 'ejection fraction',
      'fluid overload', 'pulmonary oedema', 'pulmonary edema',
      'ankle swelling heart', 'leg swelling heart',
      'orthopnoea', 'orthopnea', 'paroxysmal nocturnal dyspnoea', 'pnd',
      'foundation four heart failure', 'gdmt',
      // Heart failure with EF — common report phrasings
      'hfref', 'hfpef', 'hfmref', 'mid range hf',
    ],
    sw: [
      'kushindwa kwa moyo', 'moyo umechoka', 'moyo dhaifu',
      'moyo hauwezi kusukuma', 'cardiomyopathy',
      'kushindwa kwa moyo wa kushoto', 'kushindwa kwa moyo wa kulia',
      'maji yamejaa mwilini', 'mapafu yamejaa maji',
    ],
    sw_mtaa: [
      'heart failure', 'kushindwa kwa moyo', 'moyo umechoka',
      'moyo wangu hauna nguvu', 'moyo dhaifu',
      'mama ana heart failure', 'baba ana heart failure',
      'miguu inavimba moyo', 'mapafu yamejaa maji',
      'ejection fraction yangu ni ndogo',
      'ef yangu ni 30', 'cardiomyopathy', 'cardiomyopathy ya VVU',
      'hf', 'chf',
      // Bare body-anchored phrasings
      'miguu inavimba', 'miguu yangu inavimba',
      'kifundo cha mguu kinavimba', 'kifundo cha mguu kimevimba',
      'ankle swelling', 'leg swelling',
      'baba miguu inavimba', 'mama miguu inavimba',
    ],
    slang: ['hf', 'chf', 'heart failure', 'cardiomyopathy'],
  },

  hfref: {
    canonical_en: 'HFrEF — Heart Failure with Reduced Ejection Fraction',
    canonical_sw: 'HFrEF — Kushindwa kwa Moyo na EF iliyopungua',
    en: ['hfref', 'heart failure reduced ejection fraction', 'reduced ef heart failure', 'systolic heart failure', 'low ef'],
    sw: ['kushindwa kwa moyo na ef iliyopungua', 'systolic heart failure'],
    sw_mtaa: ['hfref', 'ef yangu ni chini', 'systolic heart failure'],
    slang: ['hfref', 'low ef'],
  },

  hfpef: {
    canonical_en: 'HFpEF — Heart Failure with Preserved Ejection Fraction',
    canonical_sw: 'HFpEF — Kushindwa kwa Moyo na EF iliyohifadhiwa',
    en: ['hfpef', 'heart failure preserved ejection fraction', 'preserved ef heart failure', 'diastolic heart failure', 'stiff heart'],
    sw: ['kushindwa kwa moyo na ef iliyohifadhiwa', 'diastolic heart failure'],
    sw_mtaa: ['hfpef', 'diastolic heart failure', 'stiff heart'],
    slang: ['hfpef', 'diastolic hf'],
  },

  acute_decompensated_hf: {
    canonical_en: 'Acute Decompensated Heart Failure',
    canonical_sw: 'Kushindwa kwa Moyo kwa Papo Hapo',
    en: [
      'acute heart failure', 'acute decompensated heart failure', 'adhf',
      'heart failure flare', 'heart failure exacerbation', 'hf decompensation',
      'pulmonary oedema admission', 'flash pulmonary oedema',
    ],
    sw: [
      'kushindwa kwa moyo kwa papo hapo', 'mlipuko wa kushindwa kwa moyo',
      'maji yamejaa mapafuni ghafla',
    ],
    sw_mtaa: [
      'adhf', 'heart failure flare', 'hf imezidi',
      'mapafu yamejaa maji ghafla', 'moyo umeshindwa ghafla',
    ],
    slang: ['adhf', 'hf flare'],
  },

  peripartum_cardiomyopathy: {
    canonical_en: 'Peripartum Cardiomyopathy (PPCM)',
    canonical_sw: 'Peripartum Cardiomyopathy',
    en: [
      'peripartum cardiomyopathy', 'ppcm', 'postpartum cardiomyopathy',
      'pregnancy cardiomyopathy', 'pregnancy heart failure',
      'heart failure after delivery', 'heart failure in pregnancy',
      'post-pregnancy heart failure',
    ],
    sw: [
      'peripartum cardiomyopathy', 'kushindwa kwa moyo baada ya kujifungua',
      'kushindwa kwa moyo wakati wa mimba',
    ],
    sw_mtaa: [
      'ppcm', 'peripartum cardiomyopathy',
      'mama amejifungua sasa moyo wake umeshindwa',
      'heart failure baada ya kujifungua',
      'moyo umeshindwa baada ya mimba',
    ],
    slang: ['ppcm'],
  },

  rheumatic_heart_disease_hf: {
    canonical_en: 'Rheumatic Heart Disease — Heart Failure',
    canonical_sw: 'Ugonjwa wa Moyo wa Rheumatic',
    en: [
      'rheumatic heart disease', 'rhd', 'rheumatic fever',
      'mitral stenosis', 'mitral regurgitation', 'aortic regurgitation',
      'valvular heart disease', 'mitral valve disease',
      'benzathine penicillin prophylaxis', 'monthly penicillin injection',
    ],
    sw: [
      'ugonjwa wa moyo wa rheumatic', 'rheumatic fever',
      'koo la strep', 'mitral stenosis', 'valve ya moyo iliyoharibika',
      'sindano ya penicillin ya kila mwezi',
    ],
    sw_mtaa: [
      'rhd', 'rheumatic heart disease',
      'mtoto wangu ana koo la strep', 'sindano ya penicillin',
      'valve ya moyo', 'mitral stenosis',
    ],
    slang: ['rhd', 'rheumatic fever'],
  },

  stroke: {
    canonical_en: 'Stroke',
    canonical_sw: 'Kiharusi',
    en: [
      'stroke', 'cva', 'cerebrovascular accident', 'brain attack',
      'cerebral infarction', 'cerebral hemorrhage', 'cerebral haemorrhage',
      'intracerebral hemorrhage', 'intracerebral haemorrhage', 'ich',
      'subarachnoid hemorrhage', 'subarachnoid haemorrhage', 'sah',
      'ischemic stroke', 'ischaemic stroke', 'haemorrhagic stroke', 'hemorrhagic stroke',
      'mini stroke', 'transient ischemic attack', 'transient ischaemic attack', 'tia',
      'fast acronym', 'face arm speech time',
      'one sided weakness', 'sudden weakness one side',
      'thrombolysis', 'tpa', 'alteplase',
    ],
    sw: [
      'kiharusi', 'kiharusi cha ubongo', 'ubongo umepata kiharusi',
      'upande mmoja umedhoofika', 'mini kiharusi', 'tia',
      'mishipa ya damu ya ubongo imepasuka', 'damu imevuja ubongoni',
    ],
    sw_mtaa: [
      'kiharusi', 'stroke', 'baba amepata kiharusi', 'mama amepata kiharusi',
      'upande mmoja umedhoofika', 'mdomo umejipinda',
      'haongei vizuri ghafla', 'amewa upande mmoja',
      'hawezi kutembea ghafla', 'amezimia na hawezi kuongea',
      'tia', 'mini stroke', 'amesahau kuongea',
    ],
    slang: ['cva', 'stroke', 'tia'],
  },

  ischemic_stroke: {
    canonical_en: 'Ischemic Stroke',
    canonical_sw: 'Kiharusi cha Kukosa Damu',
    en: ['ischemic stroke', 'ischaemic stroke', 'cerebral infarction', 'thrombotic stroke', 'embolic stroke'],
    sw: ['kiharusi cha kukosa damu', 'kiharusi cha thrombosis'],
    sw_mtaa: ['ischemic stroke', 'kiharusi cha kawaida'],
    slang: ['ischemic stroke'],
  },

  hemorrhagic_stroke: {
    canonical_en: 'Hemorrhagic Stroke',
    canonical_sw: 'Kiharusi cha Kuvuja Damu',
    en: ['hemorrhagic stroke', 'haemorrhagic stroke', 'cerebral hemorrhage', 'cerebral haemorrhage', 'brain bleed', 'intracerebral hemorrhage'],
    sw: ['kiharusi cha kuvuja damu', 'damu imevuja ubongoni'],
    sw_mtaa: ['hemorrhagic stroke', 'damu imevuja ubongoni', 'brain bleed'],
    slang: ['brain bleed', 'ich'],
  },

  tia: {
    canonical_en: 'Transient Ischemic Attack (TIA)',
    canonical_sw: 'Kiharusi cha Muda Mfupi (TIA)',
    en: ['tia', 'transient ischemic attack', 'mini stroke', 'warning stroke'],
    sw: ['tia', 'kiharusi cha muda mfupi'],
    sw_mtaa: ['tia', 'mini stroke', 'kiharusi kidogo kilichopita'],
    slang: ['tia', 'mini stroke'],
  },

  vaso_occlusive_crisis: {
    canonical_en: 'Vaso-Occlusive Crisis (Sickle Cell Crisis)',
    canonical_sw: 'Mgogoro wa Selimundu',
    en: [
      'vaso occlusive crisis', 'vaso-occlusive crisis', 'voc',
      'sickle cell crisis', 'sickle crisis', 'pain crisis',
      'sickle cell pain', 'bone pain crisis',
    ],
    sw: [
      'mgogoro wa selimundu', 'maumivu ya selimundu',
      'crisis ya sickle cell', 'maumivu ya mifupa kwa selimundu',
    ],
    sw_mtaa: [
      'sickle cell crisis', 'voc', 'mgogoro wa selimundu',
      'mtoto wangu ana maumivu ya sickle cell',
      'maumivu ya selimundu yamerudi',
    ],
    slang: ['voc', 'sickle crisis'],
  },

  acute_chest_syndrome: {
    canonical_en: 'Acute Chest Syndrome (Sickle Cell)',
    canonical_sw: 'Acute Chest Syndrome',
    en: [
      'acute chest syndrome', 'acs sickle cell', 'sickle cell chest crisis',
      'chest crisis sickle', 'pulmonary sickle crisis',
    ],
    sw: [
      'acute chest syndrome', 'mgogoro wa kifua wa selimundu',
    ],
    sw_mtaa: [
      'acute chest syndrome', 'acs', 'kifua kimebana kwa sickle cell',
      'mtoto wa sickle cell anashindwa kupumua',
    ],
    slang: ['acs'],
  },

  // ──────────────────────────────────────────────────────────────────
  // PHASE 11 (Tier B) — Mental Health, Infectious GI, Neuro, Resp
  // ──────────────────────────────────────────────────────────────────
  depression: {
    canonical_en: 'Depression',
    canonical_sw: 'Unyong\'onyevu / Sonona',
    en: [
      'depression', 'major depression', 'major depressive disorder', 'mdd',
      'clinical depression', 'feeling depressed', 'i feel depressed',
      'persistent sadness', 'low mood', 'feeling low',
      'i have no joy', 'lost interest in everything',
      'phq-9', 'phq9', 'phq 9',
      // Suicidal ideation routes here (the depression file has the suicide Q&A)
      'suicidal thoughts', 'i have suicidal thoughts',
      'thoughts of suicide', 'thinking of suicide',
      'i want to end my life', 'i want to die',
      'self harm', 'self-harm', 'thoughts of self harm',
      // Postpartum
      'postpartum depression', 'postnatal depression',
      'depression after delivery', 'depression after childbirth',
      'baby blues vs depression',
      // SSRIs route to depression (treatment context)
      'fluoxetine', 'prozac',
      'sertraline', 'zoloft',
      'ssri', 'ssris', 'antidepressant', 'antidepressants',
      'amitriptyline', 'tricyclic antidepressant',
      // Persistent insomnia as a depression cue
      'cant sleep for weeks', 'cannot sleep for weeks',
      'persistent insomnia depression', 'insomnia and low mood',
      // PTSD routes here (the depression/anxiety pair covers it)
      'ptsd', 'post traumatic stress disorder', 'post-traumatic stress disorder',
      'trauma flashbacks', 'flashbacks from trauma',
    ],
    sw: [
      'unyong\'onyevu', 'sonona', 'huzuni ya muda mrefu',
      'kupungukiwa na furaha', 'nimekata tamaa',
      'hofu na huzuni',
      // Suicidal ideation in Swahili
      'mawazo ya kujiua', 'nina mawazo ya kujiua',
      'nataka kujiua', 'sitaki kuishi tena',
      // Postpartum
      'sonona ya baada ya kuzaa', 'unyong\'onyevu wa baada ya kuzaa',
      // Natural body-anchored phrasings
      'nina huzuni sana', 'huzuni kubwa',
      'moyo wangu hauko sawa', 'moyo wangu umechoka',
      'siwezi kulala kwa wiki', 'sijawai kulala vizuri tangu',
      'sitaki kufanya chochote',
    ],
    sw_mtaa: [
      'sonona', 'unyong\'onyevu', 'huzuni ya muda mrefu',
      'mtu ana sonona', 'nimekuwa sad muda mrefu',
      'sifahamu kuwa happy tena', 'sina raha maishani',
      'depression', 'nina depression',
      'siwezi kuamka kitandani', 'sili sili nilale',
      // Natural body/heart phrasings that signal depression
      'nina huzuni sana',
      'moyo wangu hauko sawa', 'moyo wangu sio sawa',
      'siwezi kulala kwa wiki', 'sijaweza kulala wiki nzima',
      'sitaki kufanya chochote', 'sina motivation',
      // Suicidal
      'mawazo ya kujiua', 'nina mawazo ya kujiua',
      'i have suicidal thoughts', 'suicidal thoughts',
      // SSRIs
      'fluoxetine', 'sertraline', 'antidepressant',
      // PTSD
      'ptsd', 'post-traumatic stress',
    ],
    slang: ['depression', 'dipresheni', 'sonona', 'ssri'],
  },

  anxiety: {
    canonical_en: 'Anxiety Disorder',
    canonical_sw: 'Wasiwasi',
    en: [
      'anxiety', 'anxiety disorder', 'generalized anxiety disorder',
      'generalised anxiety', 'generalised anxiety disorder', 'gad',
      'panic attack', 'panic disorder', 'social anxiety',
      'constant worry', 'i am always worried', 'feeling anxious',
      'gad-7', 'gad7', 'gad 7',
    ],
    sw: [
      'wasiwasi', 'wasiwasi mwingi', 'hofu',
      'nina wasiwasi sana', 'hofu nyingi',
      'wasiwasi mkubwa',
    ],
    sw_mtaa: [
      'wasiwasi', 'anxiety', 'nina anxiety', 'hofu',
      'siwezi kupumua kwa hofu', 'moyo unapiga kwa hofu',
      'panic attack', 'nimekuwa wasiwasi sana',
      'wasiwasi mkubwa', 'wasiwasi mwingi',
      // Body-anchored panic phrasings
      'kifua kinabana ghafla', 'kifua kinakaa ghafla',
      'mapigo ya moyo ya ghafla', 'natetemeka ghafla',
    ],
    slang: ['anxiety', 'gad', 'panic'],
  },

  bronchiolitis: {
    canonical_en: 'Bronchiolitis',
    canonical_sw: 'Bronchiolitis',
    en: [
      'bronchiolitis', 'rsv bronchiolitis', 'viral bronchiolitis',
      'infant wheeze viral', 'baby wheezing virus',
      'rsv', 'respiratory syncytial virus',
      'baby wheezing with cold', 'baby wheezing and cold',
      'infant wheeze', 'infant wheezing',
      'wheezing infant', 'baby breathing fast with cold',
    ],
    sw: [
      'bronchiolitis', 'mtoto mchanga anakohoa na kuvuma',
      'mtoto anavuma na mafua', 'virusi vya kupumua vya mtoto',
    ],
    sw_mtaa: [
      'bronchiolitis', 'mtoto anavuma kifua',
      'mtoto mdogo anashindwa kupumua na virusi',
      'rsv', 'baby wheezing',
      'mtoto wangu mdogo anapuza', 'mtoto wangu mdogo anavuma',
      'mtoto anavuma na mafua',
      'respiratory syncytial virus',
    ],
    slang: ['rsv', 'bronchiolitis'],
  },

  uti: {
    canonical_en: 'Urinary Tract Infection (UTI)',
    canonical_sw: 'Maambukizi ya Njia ya Mkojo (UTI)',
    en: [
      'uti', 'urinary tract infection', 'bladder infection', 'cystitis',
      'pyelonephritis', 'kidney infection',
      'burning urination', 'painful urination', 'dysuria',
      'urinary frequency', 'urgency urination',
      // UTI antibiotics route to parent
      'nitrofurantoin', 'macrobid', 'macrodantin',
      'trimethoprim for uti', 'fosfomycin',
      'antibiotic for uti', 'antibiotics for uti',
      'recurrent uti', 'recurrent urinary infection',
    ],
    sw: [
      'uti', 'maambukizi ya njia ya mkojo', 'maambukizi ya kibofu',
      'kuwasha wakati wa kukojoa', 'maumivu ya kukojoa',
      'kukojoa mara kwa mara',
      'mkojo unawaka', 'mkojo unauma',
      'maumivu wakati wa kukojoa',
    ],
    sw_mtaa: [
      'uti', 'maambukizi ya mkojo', 'kibofu kimeambukizwa',
      'inawaka nikikojoa', 'maumivu ya kukojoa',
      'nakojoa mara kwa mara', 'pee inauma',
      'mkojo umeona moto', 'mtoto wangu anakojoa mara kwa mara',
      'mkojo unawaka', 'mkojo wangu unawaka',
      'mkojo unauma',
      'nitrofurantoin', 'macrobid',
    ],
    slang: ['uti', 'bladder infection', 'nitrofurantoin'],
  },

  typhoid: {
    canonical_en: 'Typhoid Fever',
    canonical_sw: 'Homa ya Matumbo',
    en: [
      'typhoid', 'typhoid fever', 'enteric fever', 'salmonella typhi',
      'paratyphoid', 'widal test',
    ],
    sw: [
      'typhoid', 'homa ya matumbo', 'homa ya matumbo na tumbo',
      'salmonella', 'widal',
    ],
    sw_mtaa: [
      'typhoid', 'homa ya matumbo', 'nina typhoid',
      'widal positive', 'widal yangu ni positive',
      'nimepimwa typhoid', 'maumivu ya tumbo na homa',
    ],
    slang: ['typhoid', 'widal'],
  },

  peptic_ulcer: {
    canonical_en: 'Peptic Ulcer Disease',
    canonical_sw: 'Vidonda vya Tumbo',
    en: [
      'peptic ulcer', 'peptic ulcer disease', 'pud',
      'gastric ulcer', 'duodenal ulcer', 'stomach ulcer',
      'h pylori', 'h. pylori', 'helicobacter pylori',
      'gastritis', 'reflux', 'gerd', 'heartburn',
      'omeprazole', 'pantoprazole', 'lansoprazole', 'ppi',
      // NSAID-ulcer educational angle
      'ibuprofen causes ulcers', 'nsaids cause ulcers',
      'nsaid ulcer', 'aspirin ulcer', 'diclofenac ulcer',
      'painkiller ulcer', 'painkillers stomach',
    ],
    sw: [
      'vidonda vya tumbo', 'kidonda cha tumbo', 'ugonjwa wa tumbo',
      'h pylori', 'helicobacter',
      'kuungua tumbo', 'reflux', 'gastritis',
      'ibuprofen inasababisha vidonda',
    ],
    sw_mtaa: [
      'vidonda vya tumbo', 'kidonda tumboni',
      'h pylori', 'h. pylori', 'tumbo linauma',
      'omeprazole', 'tumbo kuungua', 'kuungua kifuani',
      'nina kidonda cha tumbo', 'gastritis',
      'ibuprofen causes ulcers', 'painkillers stomach',
      'nsaids zinasababisha vidonda',
    ],
    slang: ['pud', 'h pylori', 'omeprazole'],
  },

  epilepsy: {
    canonical_en: 'Epilepsy',
    canonical_sw: 'Kifafa',
    en: [
      'epilepsy', 'seizure', 'seizures', 'fits', 'convulsions',
      'tonic clonic seizure', 'generalized seizure', 'focal seizure',
      'status epilepticus', 'phenobarbital', 'phenobarbitone',
      'carbamazepine', 'sodium valproate', 'valproate',
      'levetiracetam', 'keppra',
    ],
    sw: [
      'kifafa', 'degedege', 'mtoto anapata degedege',
      'mshtuko wa moyo', 'kifafa cha hali ya juu',
      'phenobarbitone', 'phenobarbital', 'carbamazepine',
    ],
    sw_mtaa: [
      'kifafa', 'degedege', 'mtoto wangu ana kifafa',
      'fits', 'seizures', 'anapata fits',
      'phenobarbitone', 'tegretol', 'carbamazepine',
      'amepata kifafa sasa', 'amezimia na kuanguka',
    ],
    slang: ['epilepsy', 'kifafa', 'fits'],
  },

  // ──────────────────────────────────────────────────────────────────
  // PHASE 11 (Tier C — alias-only coverage routing to closest authored)
  // ──────────────────────────────────────────────────────────────────
  snake_bite: {
    canonical_en: 'Snake Bite',
    canonical_sw: 'Kuumwa na Nyoka',
    en: [
      'snake bite', 'snakebite', 'snake bites', 'bitten by snake',
      'venomous snake', 'cobra bite', 'mamba bite', 'puff adder bite',
      'antivenom', 'anti venom', 'anti-venom',
      // Snake species recognised (routes to parent snake_bite for advice)
      'puff adder', 'bitis arietans',
      'black mamba', 'green mamba', 'dendroaspis',
      'spitting cobra', 'cobra', 'naja',
      'boomslang', 'tree snake',
    ],
    sw: [
      'kuumwa na nyoka', 'nyoka amenuma', 'sumu ya nyoka',
      'antivenom', 'dawa ya sumu ya nyoka',
      'puff adder', 'nyoka mweusi',
    ],
    sw_mtaa: [
      'snake bite', 'nyoka ameniuma', 'nyoka ameuma mtu',
      'nyoka kanyoka', 'mtoto ameumwa na nyoka',
      'sumu ya nyoka',
      'puff adder', 'black mamba', 'cobra',
    ],
    slang: ['snake bite', 'puff adder', 'mamba', 'cobra'],
  },

  anaemia: {
    canonical_en: 'Anaemia',
    canonical_sw: 'Upungufu wa Damu',
    en: [
      'anaemia', 'anemia', 'low hemoglobin', 'low haemoglobin',
      'low hb', 'iron deficiency', 'iron deficiency anaemia',
      'iron supplements', 'ferrous sulphate', 'ferrous sulfate',
    ],
    sw: [
      'anemia', 'upungufu wa damu', 'damu kidogo',
      'kemia ya damu kidogo', 'iron deficiency',
      'vidonge vya chuma', 'ferrous sulphate',
    ],
    sw_mtaa: [
      'anemia', 'upungufu wa damu', 'damu yangu ni kidogo',
      'hb yangu ni chini', 'hemoglobin ni chini',
      'vidonge vya iron', 'vidonge vya damu',
    ],
    slang: ['anaemia', 'low hb'],
  },

  cervical_cancer: {
    canonical_en: 'Cervical Cancer',
    canonical_sw: 'Saratani ya Shingo ya Kizazi',
    en: [
      'cervical cancer', 'cervix cancer', 'cervical screening',
      'pap smear', 'via', 'visual inspection with acetic acid',
      'hpv', 'human papillomavirus', 'hpv vaccine',
      'cryotherapy', 'thermal ablation', 'leep',
      'via positive', 'cervical pre-cancer', 'cin',
    ],
    sw: [
      'saratani ya mlango wa kizazi', 'kansa ya mlango wa kizazi',
      'saratani ya shingo ya kizazi', 'kansa ya shingo ya kizazi',
      'pap smear', 'via', 'hpv', 'chanjo ya hpv',
      'cryotherapy', 'kufungamana kwa baridi',
    ],
    sw_mtaa: [
      'cervical cancer', 'saratani ya kizazi',
      'saratani ya shingo ya kizazi',
      'pap smear', 'via', 'hpv vaccine',
      'chanjo ya hpv', 'kupima kizazi',
      'cryotherapy', 'screening kwa wanawake wa hiv',
      'screening ya shingo ya kizazi',
    ],
    slang: ['cervical cancer', 'pap smear', 'hpv', 'cryotherapy'],
  },

  breast_cancer: {
    canonical_en: 'Breast Cancer',
    canonical_sw: 'Saratani ya Matiti',
    en: [
      'breast cancer', 'breast lump', 'lump in breast', 'breast mass',
      'breast self examination', 'breast self-examination', 'bse',
      'mammogram', 'mammography',
    ],
    sw: [
      'saratani ya matiti', 'kansa ya matiti', 'uvimbe wa titi',
      'mammogram', 'kujichunguza matiti',
    ],
    sw_mtaa: [
      'breast cancer', 'saratani ya matiti', 'kifua kimevimba',
      'kuna kitu kwenye titi', 'titi linauma',
      'mammogram', 'kuna uvimbe wa matiti',
    ],
    slang: ['breast cancer', 'breast lump'],
  },

  cataract: {
    canonical_en: 'Cataract',
    canonical_sw: 'Mtoto wa Jicho',
    en: [
      'cataract', 'cataracts', 'cloudy lens', 'cloudy vision',
      'lens opacity', 'cataract surgery', 'iol',
    ],
    sw: [
      'mtoto wa jicho', 'jicho jeupe', 'lens iliyo cloudy',
      'upasuaji wa mtoto wa jicho',
    ],
    sw_mtaa: [
      'mtoto wa jicho', 'jicho jeupe', 'cataract',
      'jicho la babu limegeuka jeupe',
      'siwezi kuona vizuri umri ukapita',
    ],
    slang: ['cataract'],
  },

  hepatitis_b: {
    canonical_en: 'Hepatitis B',
    canonical_sw: 'Homa ya Ini Aina B',
    en: [
      'hepatitis b', 'hep b', 'hbv', 'hepatitis b virus',
      'hbsag', 'hbsag positive', 'tenofovir for hep b',
      'hepatitis b vaccine', 'hep b vaccine',
      // Liver/jaundice phrasings that point at HBV
      'liver infection', 'viral liver infection',
      'jaundice from hepatitis', 'viral hepatitis',
      'chronic hepatitis b', 'hbv in pregnancy',
      'hiv and hepatitis b', 'hiv hbv coinfection',
    ],
    sw: [
      'hepatitis b', 'homa ya ini aina b', 'hbv',
      'ini limeshambuliwa na virusi b', 'chanjo ya hepatitis b',
      'maambukizi ya ini', 'manjano kutoka hepatitis',
    ],
    sw_mtaa: [
      'hepatitis b', 'hep b', 'hbsag positive',
      'nina hepatitis b', 'mama ana hepatitis b',
      'chanjo ya hepatitis b', 'hep b vaccine',
      'liver infection', 'jaundice from hepatitis',
      'ini limeshambuliwa', 'manjano ya ini',
    ],
    slang: ['hep b', 'hbv'],
  },

  diabetic_retinopathy_dr: {
    canonical_en: 'Diabetic Retinopathy',
    canonical_sw: 'Retinopathy ya Kisukari',
    en: [
      'diabetic retinopathy', 'dr eye', 'diabetic eye disease',
      'background retinopathy', 'proliferative retinopathy',
      'diabetic maculopathy', 'laser eye diabetes',
    ],
    sw: [
      'retinopathy ya kisukari', 'macho ya kisukari',
      'jicho limeharibika kwa kisukari',
    ],
    sw_mtaa: [
      'diabetic retinopathy', 'macho ya kisukari',
      'jicho limesharibika kwa sukari', 'siwezi kuona kwa kisukari',
    ],
    slang: ['dr eye', 'sugar eye'],
  },

  adolescent_health: {
    canonical_en: 'Adolescent Health',
    canonical_sw: 'Afya ya Vijana',
    en: [
      'adolescent health', 'teen health', 'teenage health',
      'puberty', 'menstruation start', 'menarche',
      'adolescent contraception', 'teen pregnancy',
    ],
    sw: [
      'afya ya vijana', 'balehe', 'kuvunja ungo',
      'hedhi za kwanza', 'uzazi wa mpango kwa vijana',
    ],
    sw_mtaa: [
      'afya ya vijana', 'kijana wangu', 'puberty',
      'mtoto wangu amebalehe', 'kuvunja ungo',
      'binti yangu amepata hedhi za kwanza',
    ],
    slang: ['adolescent', 'teen'],
  },

  neonatal_essentials: {
    canonical_en: 'Neonatal Essentials',
    canonical_sw: 'Huduma ya Mtoto Mchanga',
    en: [
      'newborn', 'neonate', 'neonatal', 'newborn care',
      'neonatal sepsis', 'newborn fever', 'newborn jaundice',
      'newborn hypothermia', 'breastfeeding newborn',
      'kangaroo mother care', 'kmc', 'low birth weight',
    ],
    sw: [
      'mtoto mchanga', 'huduma ya mtoto mchanga',
      'manjano kwa mtoto mchanga', 'sepsis ya mtoto mchanga',
      'kunyonyesha mtoto mchanga', 'kangaroo mother care',
      'mtoto wa uzito wa chini',
    ],
    sw_mtaa: [
      'mtoto mchanga', 'newborn', 'baby mdogo',
      'mtoto wangu mdogo ana manjano',
      'mtoto wangu mchanga ana homa',
      'kunyonyesha mtoto mchanga', 'kmc',
      'mtoto amezaliwa na uzito mdogo',
    ],
    slang: ['newborn', 'neonate'],
  },

  sti: {
    canonical_en: 'Sexually Transmitted Infections',
    canonical_sw: 'Maambukizi ya Zinaa',
    en: [
      'sti', 'std', 'sexually transmitted infection',
      'sexually transmitted disease',
      'gonorrhea', 'gonorrhoea', 'gonococcus',
      'syphilis', 'rpr positive', 'vdrl',
      'chlamydia', 'genital herpes', 'hsv',
      'genital discharge', 'urethral discharge',
      'genital ulcer', 'painful sex',
    ],
    sw: [
      'maambukizi ya zinaa', 'sti', 'std',
      'kisonono', 'gonorrhea', 'kaswende', 'syphilis',
      'maambukizi ya kuzaa', 'chlamydia',
      'utokwaji wa uchafu kwenye sehemu za siri',
    ],
    sw_mtaa: [
      'sti', 'std', 'kisonono', 'kaswende',
      'maambukizi ya zinaa', 'gonorrhea', 'chlamydia',
      'discharge ya siri', 'kidonda sehemu za siri',
      'rpr positive', 'vdrl positive',
    ],
    slang: ['sti', 'std', 'gonorrhea', 'syphilis', 'kaswende'],
  },

  // ── HIV family ─────────────────────────────────────────────────────
  hiv_newly_diagnosed: {
    canonical_en: 'HIV — Newly Diagnosed',
    canonical_sw: 'VVU — Umegundulika Hivi Karibuni',
    en: [
      'just diagnosed hiv', 'newly diagnosed hiv', 'new hiv diagnosis',
      'found out i have hiv', 'i just tested positive', 'recently diagnosed hiv',
      'starting hiv treatment', 'new to hiv', 'hiv test positive what now',
    ],
    sw: [
      'nimegundulika na vvu', 'nimepata vvu hivi karibuni', 'nimeanza matibabu ya vvu',
      'nimegundulika kuwa na ukimwi', 'nimepima nikakuta nina vvu',
    ],
    sw_mtaa: [
      'nimegundulika na vvu', 'nimepatikana na vvu', 'nimekuta nina vvu',
      'nimeanza dawa za vvu', 'nimejua nina vvu',
    ],
    slang: ['nimekuwa positive', 'nimegundulika'],
  },

  hiv_on_art: {
    canonical_en: 'HIV — Established on ART',
    canonical_sw: 'VVU — Unaendelea na ART',
    en: [
      'on art', 'taking art', 'hiv treatment', 'antiretroviral therapy',
      'living with hiv on treatment', 'established on art', 'hiv medication',
      'arv', 'arvs', 'taking arvs', 'hiv pills',
    ],
    sw: [
      'nipo kwenye art', 'natumia art', 'matibabu ya vvu', 'dawa za vvu',
      'naishi na vvu na natumia dawa', 'natumia arv', 'dawa za kupunguza makali ya vvu',
    ],
    sw_mtaa: [
      'natumia dawa za vvu', 'nipo kwenye dawa', 'natumia arv', 'dawa zangu za vvu',
      'natumia art', 'naishi na vvu',
    ],
    slang: ['niko kwa dawa', 'arv zangu', 'dawa za ukimwi'],
  },

  hiv_treatment_failure: {
    canonical_en: 'HIV — Treatment Failure',
    canonical_sw: 'VVU — Kushindwa kwa Matibabu',
    en: [
      'hiv treatment failure', 'art failure', 'viral load not suppressed',
      'detectable viral load on art', 'hiv drugs not working', 'art not working',
      'viral load rising', 'hiv resistance', 'failing first line art', 'second line art',
    ],
    sw: [
      'kushindwa kwa matibabu ya vvu', 'dawa za vvu hazifanyi kazi',
      'viral load haijashuka', 'art haifanyi kazi', 'usugu wa dawa za vvu',
      'dawa za mstari wa pili', 'second line',
    ],
    sw_mtaa: [
      'dawa za vvu hazifanyi kazi', 'viral load yangu iko juu',
      'art haifanyi kazi', 'nimebadilishiwa dawa za vvu', 'dawa zimeshindwa',
    ],
    slang: ['dawa zimeshindwa', 'viral load iko juu'],
  },

  hiv_advanced: {
    canonical_en: 'Advanced HIV Disease (Low CD4)',
    canonical_sw: 'VVU Iliyokomaa (CD4 ya Chini)',
    en: [
      'advanced hiv', 'advanced hiv disease', 'low cd4', 'cd4 below 200',
      'aids defining illness', 'late stage hiv', 'very low cd4', 'ahd',
      'opportunistic infection', 'hiv with complications',
    ],
    sw: [
      'vvu iliyokomaa', 'cd4 iko chini', 'cd4 chini ya 200', 'hatua ya mwisho ya vvu',
      'ukimwi uliokomaa', 'maambukizi nyemelezi',
    ],
    sw_mtaa: [
      'cd4 yangu iko chini sana', 'vvu imekomaa', 'ukimwi umekomaa',
      'nina maambukizi mengine', 'vvu hatua ya mwisho',
    ],
    slang: ['cd4 chini', 'ukimwi umezidi'],
  },

  hiv_oi: {
    canonical_en: 'HIV — Opportunistic Infections',
    canonical_sw: 'VVU — Maambukizi Nyemelezi',
    en: [
      'opportunistic infection', 'opportunistic infections', 'oi hiv',
      'cryptococcal meningitis', 'pcp pneumonia', 'pneumocystis',
      'oral thrush hiv', 'esophageal candidiasis', 'kaposi sarcoma',
      'cmv hiv', 'toxoplasmosis hiv', 'hiv infection complications',
    ],
    sw: [
      'maambukizi nyemelezi', 'maambukizi ya nyemelezi ya vvu',
      'homa ya uti wa mgongo ya cryptococcal', 'nimonia ya pcp',
      'fangasi mdomoni vvu', 'kaposi sarcoma',
    ],
    sw_mtaa: [
      'maambukizi nyemelezi', 'magonjwa yanayonyemelea vvu',
      'fangasi mdomoni', 'nimonia ya vvu', 'maambukizi ya ziada ya vvu',
    ],
    slang: ['oi', 'magonjwa ya vvu'],
  },

  hiv_pmtct: {
    canonical_en: 'HIV — Prevention of Mother-to-Child Transmission',
    canonical_sw: 'VVU — Kuzuia Maambukizi kutoka Mama kwenda Mtoto',
    en: [
      'pmtct', 'prevention of mother to child transmission', 'hiv in pregnancy',
      'pregnant and hiv positive', 'hiv positive pregnant', 'mtct',
      'stop hiv passing to baby', 'hiv exposed infant', 'hiv mother baby',
      'breastfeeding with hiv',
    ],
    sw: [
      'pmtct', 'kuzuia maambukizi kutoka mama kwenda mtoto', 'vvu wakati wa mimba',
      'mjamzito mwenye vvu', 'mtoto aliyeathiriwa na vvu',
      'kunyonyesha na vvu', 'mama mwenye vvu na mtoto',
    ],
    sw_mtaa: [
      'pmtct', 'nina vvu na nina mimba', 'mjamzito nina vvu',
      'nizuie mtoto asipate vvu', 'kunyonyesha nina vvu',
    ],
    slang: ['pmtct', 'nina vvu na mimba'],
  },

  hiv_pediatric: {
    canonical_en: 'HIV in Children',
    canonical_sw: 'VVU kwa Watoto',
    en: [
      'pediatric hiv', 'paediatric hiv', 'hiv in children', 'child has hiv',
      'baby has hiv', 'childhood hiv', 'hiv positive child', 'children living with hiv',
    ],
    sw: [
      'vvu kwa watoto', 'mtoto ana vvu', 'mtoto mwenye vvu', 'vvu ya mtoto',
      'mtoto aliyezaliwa na vvu',
    ],
    sw_mtaa: [
      'mtoto wangu ana vvu', 'vvu kwa mtoto', 'mtoto ana ukimwi',
      'vvu ya mtoto',
    ],
    slang: [],
  },

  hiv_prevention: {
    canonical_en: 'HIV Prevention (PrEP / PEP)',
    canonical_sw: 'Kuzuia VVU (PrEP / PEP)',
    en: [
      'prep', 'pre exposure prophylaxis', 'pep', 'post exposure prophylaxis',
      'hiv prevention', 'prevent hiv', 'avoid getting hiv', 'protect from hiv',
      'exposed to hiv what to do', 'condom hiv', 'hiv negative partner',
    ],
    sw: [
      'prep', 'kinga kabla ya kuathiriwa', 'pep', 'kinga baada ya kuathiriwa',
      'kuzuia vvu', 'kujikinga na vvu', 'nimeathiriwa na vvu nifanyeje',
    ],
    sw_mtaa: [
      'prep', 'pep', 'kujikinga na vvu', 'nizuie vvu',
      'nimekutana na vvu nifanye nini', 'kinga ya vvu',
    ],
    slang: ['prep', 'pep'],
  },
};

// ──────────────────────────────────────────────────────────────────────
// DRUG ALIASES
// ──────────────────────────────────────────────────────────────────────

export const DRUG_ALIASES: Record<string, Aliases> = {
  metformin: {
    canonical_en: 'Metformin',
    canonical_sw: 'Metformin',
    en: ['metformin', 'glucophage', 'fortamet', 'glumetza'],
    sw: ['metformin', 'dawa ya kisukari aina ya metformin'],
    sw_mtaa: ['metformin', 'glucophage', 'dawa ya sukari'],
    slang: ['metfomin', 'metfromin', 'metaformin', 'metform'],
  },

  insulin: {
    canonical_en: 'Insulin',
    canonical_sw: 'Insulin',
    en: [
      'insulin', 'soluble insulin', 'regular insulin', 'nph insulin',
      'mixtard', 'actrapid', 'insulatard', 'humulin', 'novomix',
      'long acting insulin', 'short acting insulin', 'basal insulin', 'bolus insulin',
    ],
    sw: ['insulin', 'sindano ya kisukari', 'sindano ya sukari', 'dawa ya kuchoma ya kisukari'],
    sw_mtaa: ['insulin', 'sindano ya sukari', 'sindano ya kisukari', 'mixtard', 'actrapid'],
    slang: ['insulini', 'insuline', 'inculin'],
  },

  amlodipine: {
    canonical_en: 'Amlodipine',
    canonical_sw: 'Amlodipine',
    en: ['amlodipine', 'norvasc', 'amlocard'],
    sw: ['amlodipine', 'dawa ya shinikizo la damu aina ya amlodipine'],
    sw_mtaa: ['amlodipine', 'norvasc', 'dawa ya bp', 'dawa ya presha'],
    slang: ['amlodipin', 'amlodepine', 'amlopidine', 'amlo'],
  },

  ace_inhibitor: {
    canonical_en: 'ACE Inhibitor (Enalapril / Lisinopril)',
    canonical_sw: 'Kizuizi cha ACE (Enalapril / Lisinopril)',
    en: [
      'ace inhibitor', 'ace inhibitors', 'acei', 'enalapril', 'lisinopril',
      'ramipril', 'captopril', 'perindopril', 'renitec', 'zestril',
      'angiotensin converting enzyme inhibitor', 'kidney protection drug',
    ],
    sw: [
      'kizuizi cha ace', 'enalapril', 'lisinopril', 'dawa ya kulinda figo',
      'dawa ya shinikizo inayolinda figo',
    ],
    sw_mtaa: [
      'enalapril', 'lisinopril', 'dawa ya kulinda figo', 'dawa ya figo na presha',
      'ace inhibitor',
    ],
    slang: ['ace', 'acei', 'enalaprili', 'lisinoprili'],
  },

  arb: {
    canonical_en: 'ARB (Losartan / Telmisartan)',
    canonical_sw: 'ARB (Losartan / Telmisartan)',
    en: [
      'arb', 'arbs', 'losartan', 'telmisartan', 'valsartan', 'candesartan',
      'irbesartan', 'cozaar', 'angiotensin receptor blocker',
      'angiotensin receptor blockers',
    ],
    sw: [
      'arb', 'losartan', 'telmisartan', 'dawa ya shinikizo aina ya arb',
      'dawa ya kulinda figo aina ya arb',
    ],
    sw_mtaa: [
      'losartan', 'telmisartan', 'arb', 'dawa ya presha na figo',
    ],
    slang: ['arb', 'losartani', 'telmisartani'],
  },

  furosemide: {
    canonical_en: 'Furosemide (Lasix)',
    canonical_sw: 'Furosemide (Lasix)',
    en: [
      'furosemide', 'frusemide', 'lasix', 'water tablet', 'water pill',
      'loop diuretic', 'diuretic', 'fluid tablet',
    ],
    sw: [
      'furosemide', 'lasix', 'dawa ya kuondoa maji mwilini',
      'dawa ya mkojo', 'dawa ya kupunguza maji',
    ],
    sw_mtaa: [
      'lasix', 'furosemide', 'dawa ya mkojo', 'dawa ya kuondoa maji',
      'dawa ya kukojoa',
    ],
    slang: ['lasix', 'frusemide', 'furosemaid'],
  },

  paracetamol: {
    canonical_en: 'Paracetamol',
    canonical_sw: 'Paracetamol',
    en: ['paracetamol', 'acetaminophen', 'panadol', 'tylenol', 'calpol'],
    sw: ['paracetamol', 'panadol'],
    sw_mtaa: ['panadol', 'para', 'panado', 'pana', 'dawa ya maumivu'],
    slang: ['paracetamoli', 'parasetamol', 'panadoli'],
  },

  alu: {
    canonical_en: 'Artemether-Lumefantrine (ALu)',
    canonical_sw: 'Artemether-Lumefantrine (ALu)',
    en: [
      'artemether-lumefantrine', 'artemether lumefantrine',
      'artemether-lumefantrine', 'coartem', 'coartem 80/480', 'coartem 20/120',
      'alu', 'al', 'artemether/lumefantrine',
    ],
    sw: ['artemether-lumefantrine', 'dawa ya malaria aina ya ALu', 'alu', 'coartem'],
    sw_mtaa: ['alu', 'coartem', 'dawa ya malaria', 'dawa za malaria', 'kidonge cha malaria'],
    slang: ['kuartem', 'koartem', 'artmeter', 'artemter', 'lumfantrine'],
  },

  quinine: {
    canonical_en: 'Quinine',
    canonical_sw: 'Quinine',
    en: ['quinine', 'quinine sulphate', 'quinine sulfate', 'quinine dihydrochloride'],
    sw: ['quinine', 'kwinini', 'dawa ya kuchoma ya malaria ya kwanza'],
    sw_mtaa: ['kwinini', 'quinine', 'sindano ya malaria ya zamani'],
    slang: ['kwinin', 'qunine', 'qinine'],
  },

  artesunate: {
    canonical_en: 'Artesunate (parenteral)',
    canonical_sw: 'Artesunate (ya mishipa)',
    en: ['artesunate', 'iv artesunate', 'parenteral artesunate', 'artesun', 'artesunate injection'],
    sw: ['artesunate', 'artesunate ya mishipa', 'sindano ya artesunate', 'dawa ya kuchoma ya malaria kali'],
    sw_mtaa: ['artesunate', 'sindano ya malaria kali', 'sindano ya artesunate'],
    slang: ['artesunet', 'artesunaty', 'artisunate'],
  },

  iptp_sp: {
    canonical_en: 'IPTp-SP (Sulfadoxine-Pyrimethamine in pregnancy)',
    canonical_sw: 'IPTp-SP (Sulfadoxine-Pyrimethamine kwa wajawazito)',
    en: ['iptp', 'iptp-sp', 'sulfadoxine-pyrimethamine', 'sp', 'fansidar', 'malaria prevention in pregnancy'],
    sw: ['iptp', 'iptp-sp', 'kinga ya malaria kwa wajawazito', 'fansidar', 'sp'],
    sw_mtaa: ['fansidar', 'sp', 'kinga ya malaria mimbani', 'dawa za malaria mimbani'],
    slang: ['fansida', 'fanzidar'],
  },

  rhze: {
    canonical_en: 'RHZE (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)',
    canonical_sw: 'RHZE (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)',
    en: [
      'rhze', 'r h z e', 'tb fixed dose combination', 'fdc tb', 'fdc',
      'tb intensive phase drugs', 'first line tb drugs', 'first-line tb',
      '4 in 1 tb', 'four in one tb', 'tb medicine combo',
    ],
    sw: ['rhze', 'dawa za tb za awamu ya kwanza', 'dawa za kifua kikuu za mwanzo', 'dawa nne za tb'],
    sw_mtaa: ['rhze', 'dawa za tb', 'dawa za kifua kikuu', 'vidonge vya tb'],
    slang: ['fdc', 'fdc ya tb'],
  },

  rifampicin: {
    canonical_en: 'Rifampicin',
    canonical_sw: 'Rifampicin',
    en: ['rifampicin', 'rifampin', 'rfp', 'rif', 'rmp'],
    sw: ['rifampicin'],
    sw_mtaa: ['rifampicin', 'rifampin'],
    slang: ['rifa', 'rifampcin', 'rifampsin'],
  },

  isoniazid: {
    canonical_en: 'Isoniazid (INH)',
    canonical_sw: 'Isoniazid (INH)',
    en: ['isoniazid', 'inh', 'isonicotinic acid hydrazide', 'isoniazide'],
    sw: ['isoniazid', 'inh', 'kinga ya tb', 'dawa ya kinga ya tb'],
    sw_mtaa: ['inh', 'kinga ya tb', 'isoniazid'],
    slang: ['inh', 'isoniacid'],
  },

  pyrazinamide: {
    canonical_en: 'Pyrazinamide',
    canonical_sw: 'Pyrazinamide',
    en: ['pyrazinamide', 'pza', 'pyrazinamide tab', 'z drug tb'],
    sw: ['pyrazinamide'],
    sw_mtaa: ['pyrazinamide', 'pza'],
    slang: ['pyrazinamid'],
  },

  ethambutol: {
    canonical_en: 'Ethambutol',
    canonical_sw: 'Ethambutol',
    en: ['ethambutol', 'emb', 'ethambutol hcl', 'e drug tb'],
    sw: ['ethambutol'],
    sw_mtaa: ['ethambutol', 'emb'],
    slang: ['ethambuto', 'etambutol'],
  },

  isoniazid_preventive: {
    canonical_en: 'TB Preventive Therapy (IPT / 3HP / 4R)',
    canonical_sw: 'Tiba ya Kuzuia TB (IPT / 3HP / 4R)',
    en: [
      'ipt', 'isoniazid preventive therapy', 'tb preventive therapy', 'tpt',
      '3hp', '3 hp', 'three hp', 'rifapentine isoniazid', 'weekly rifapentine',
      '4r', 'four months rifampicin', 'tb prophylaxis', 'preventive tb treatment',
      'latent tb treatment', 'inh prophylaxis',
    ],
    sw: [
      'ipt', 'tiba ya kuzuia tb', 'dawa ya kuzuia tb', 'kinga ya tb',
      'isoniazid ya kuzuia', '3hp', 'matibabu ya tb iliyolala',
    ],
    sw_mtaa: [
      'ipt', 'dawa ya kuzuia tb', 'kinga ya tb', '3hp',
      'dawa ya tb iliyolala', 'kinga ya kifua kikuu',
    ],
    slang: ['ipt yangu', '3hp', 'tpt'],
  },

  rifapentine: {
    canonical_en: 'Rifapentine',
    canonical_sw: 'Rifapentine',
    en: ['rifapentine', 'rpt', 'priftin'],
    sw: ['rifapentine'],
    sw_mtaa: ['rifapentine', 'rpt'],
    slang: ['rifapentin'],
  },

  streptomycin: {
    canonical_en: 'Streptomycin',
    canonical_sw: 'Streptomycin',
    en: ['streptomycin', 'strep', 'sm', 's drug tb', 'streptomycin injection'],
    sw: ['streptomycin', 'sindano ya streptomycin', 'streptomaisini'],
    sw_mtaa: ['streptomycin', 'sindano ya tb', 'streptomaisini'],
    slang: ['strepto', 'streptomaicin'],
  },

  pyridoxine: {
    canonical_en: 'Pyridoxine (Vitamin B6)',
    canonical_sw: 'Pyridoxine (Vitamin B6)',
    en: [
      'pyridoxine', 'vitamin b6', 'vit b6', 'b6', 'vitamin b 6',
      'pyridoxine hydrochloride', 'b six',
    ],
    sw: ['pyridoxine', 'vitamin b6', 'vitamini b6', 'b6'],
    sw_mtaa: ['pyridoxine', 'vitamin b6', 'b6', 'vitamini b sita'],
    slang: ['b6', 'pyridoxin'],
  },

  // ── HIV / ART drugs ────────────────────────────────────────────────
  tld: {
    canonical_en: 'TLD (Tenofovir + Lamivudine + Dolutegravir)',
    canonical_sw: 'TLD (Tenofovir + Lamivudine + Dolutegravir)',
    en: [
      'tld', 't l d', 'tenofovir lamivudine dolutegravir',
      'tdf 3tc dtg', 'first line art', 'first-line art', 'preferred art regimen',
      'dolutegravir based art', 'dtg regimen', 'my art pills', 'art combination',
    ],
    sw: [
      'tld', 'dawa za vvu za mstari wa kwanza', 'mchanganyiko wa dawa za vvu',
      'regimen ya vvu ya kwanza', 'dawa za vvu za kuanzia',
    ],
    sw_mtaa: [
      'tld', 'dawa zangu za vvu', 'dawa za vvu za kwanza', 'kidonge cha vvu',
    ],
    slang: ['tld', 'tld yangu'],
  },

  dolutegravir: {
    canonical_en: 'Dolutegravir (DTG)',
    canonical_sw: 'Dolutegravir (DTG)',
    en: ['dolutegravir', 'dtg', 'tivicay', 'integrase inhibitor'],
    sw: ['dolutegravir', 'dtg'],
    sw_mtaa: ['dolutegravir', 'dtg'],
    slang: ['dtg', 'dolutegrav'],
  },

  tenofovir: {
    canonical_en: 'Tenofovir (TDF)',
    canonical_sw: 'Tenofovir (TDF)',
    en: ['tenofovir', 'tdf', 'tenofovir disoproxil', 'taf', 'tenofovir alafenamide'],
    sw: ['tenofovir', 'tdf'],
    sw_mtaa: ['tenofovir', 'tdf'],
    slang: ['tdf', 'tenofovi'],
  },

  lamivudine: {
    canonical_en: 'Lamivudine (3TC)',
    canonical_sw: 'Lamivudine (3TC)',
    en: ['lamivudine', '3tc', 'lamivudine 3tc', 'epivir'],
    sw: ['lamivudine', '3tc'],
    sw_mtaa: ['lamivudine', '3tc'],
    slang: ['3tc', 'lamivudin'],
  },

  efavirenz: {
    canonical_en: 'Efavirenz (EFV)',
    canonical_sw: 'Efavirenz (EFV)',
    en: ['efavirenz', 'efv', 'sustiva', 'stocrin', 'old art regimen'],
    sw: ['efavirenz', 'efv', 'dawa ya zamani ya vvu'],
    sw_mtaa: ['efavirenz', 'efv'],
    slang: ['efv', 'efavirens'],
  },

  cotrimoxazole: {
    canonical_en: 'Co-trimoxazole (CPT)',
    canonical_sw: 'Co-trimoxazole (CPT)',
    en: [
      'cotrimoxazole', 'co-trimoxazole', 'septrin', 'bactrim', 'cpt',
      'trimethoprim sulfamethoxazole', 'tmp smx', 'septrine',
      'cotrimoxazole preventive therapy', 'co-trim',
    ],
    sw: [
      'cotrimoxazole', 'septrin', 'tiba ya kuzuia ya cotrimoxazole',
      'dawa ya kuzuia maambukizi vvu',
    ],
    sw_mtaa: ['septrin', 'cotrimoxazole', 'septrine', 'cpt', 'dawa ya kuzuia'],
    slang: ['septrin', 'bactrim', 'cpt'],
  },

  atazanavir: {
    canonical_en: 'Atazanavir/ritonavir (ATV/r)',
    canonical_sw: 'Atazanavir/ritonavir (ATV/r)',
    en: [
      'atazanavir', 'atv', 'atv/r', 'atazanavir ritonavir', 'reyataz',
      'protease inhibitor', 'second line art drug', 'lopinavir', 'lpv/r',
      'lopinavir ritonavir', 'aluvia', 'kaletra',
    ],
    sw: ['atazanavir', 'lopinavir', 'dawa ya vvu ya mstari wa pili'],
    sw_mtaa: ['atazanavir', 'lopinavir', 'dawa za vvu za pili'],
    slang: ['atv', 'lpv', 'kaletra'],
  },

  // ── Maternal drugs (Phase 7) ─────────────────────────────────────────
  methyldopa: {
    canonical_en: 'Methyldopa (Pregnancy Blood Pressure)',
    canonical_sw: 'Methyldopa (Dawa ya Presha ya Mimba)',
    en: ['methyldopa', 'aldomet', 'methyl dopa'],
    sw: ['methyldopa', 'aldomet', 'dawa ya presha ya mimba'],
    sw_mtaa: ['methyldopa', 'aldomet', 'dawa ya presha kwa mjamzito'],
    slang: ['aldomet'],
  },

  magnesium_sulfate: {
    canonical_en: 'Magnesium Sulfate (MgSO4)',
    canonical_sw: 'Magnesium Sulfate (MgSO4)',
    en: [
      'magnesium sulfate', 'magnesium sulphate', 'mgso4', 'mag sulfate',
      'magnesium sulfate injection', 'pritchard regimen', 'zuspan regimen',
    ],
    sw: [
      'magnesium sulfate', 'mgso4', 'sindano ya magnesium', 'magnesiamu',
      'dawa ya kuzuia kifafa cha mimba',
    ],
    sw_mtaa: ['mgso4', 'magnesium', 'sindano ya kifafa cha mimba'],
    slang: ['mag', 'mgso4'],
  },

  // ── Pneumonia / antibiotic drugs (Phase 8) ──────────────────────────
  amoxicillin: {
    canonical_en: 'Amoxicillin',
    canonical_sw: 'Amoxicillin',
    en: [
      'amoxicillin', 'amoxil', 'amoxicilin', 'penicillin v amoxicillin',
      'oral amoxicillin', 'amox', 'amoxycillin', 'co-amoxiclav', 'augmentin',
      'aware antibiotic', 'access antibiotic', 'access watch reserve',
      'who aware', 'aware classification', 'antibiotic stewardship',
      'first line antibiotic', 'first-line antibiotic',
    ],
    sw: [
      'amoxicillin', 'dawa ya amoxicillin', 'amoxil', 'augmentin',
      'antibiotiki ya amoxicillin',
      'antibiotiki ya kwanza', 'antibiotiki za kuanzia',
    ],
    sw_mtaa: [
      'amoxicillin', 'amox', 'amoxil', 'augmentin', 'antibiotiki ya kifua',
      'dawa ya kifua', 'capsule za njano',
    ],
    slang: ['amox', 'amoxil', 'augmentin', 'amoxy'],
  },

  ceftriaxone: {
    canonical_en: 'Ceftriaxone',
    canonical_sw: 'Ceftriaxone',
    en: [
      'ceftriaxone', 'rocephin', 'ceftrx', 'iv ceftriaxone', 'im ceftriaxone',
      'ceftriaxon', 'ceftriaxone injection',
    ],
    sw: [
      'ceftriaxone', 'rocephin', 'sindano ya ceftriaxone',
      'antibiotiki ya mshipa', 'sindano ya antibiotiki',
    ],
    sw_mtaa: [
      'ceftriaxone', 'rocephin', 'sindano ya antibiotiki', 'sindano ya nimonia',
    ],
    slang: ['ctx', 'rocephin', 'ctriaxone'],
  },

  azithromycin: {
    canonical_en: 'Azithromycin',
    canonical_sw: 'Azithromycin',
    en: [
      'azithromycin', 'azithro', 'zithromax', 'azith', 'macrolide',
      'azithromycin tablets', 'z-pack', 'azithromcin',
    ],
    sw: [
      'azithromycin', 'azithro', 'zithromax', 'dawa ya azithromycin',
      'antibiotiki ya azithromycin',
    ],
    sw_mtaa: [
      'azithromycin', 'azithro', 'zithromax', 'dawa ya kikohozi',
      'antibiotiki ya siku tatu',
    ],
    slang: ['azith', 'azithro', 'zpack', 'z-pack'],
  },

  // ── Asthma drugs (Phase 9) ─────────────────────────────────────────
  salbutamol: {
    canonical_en: 'Salbutamol (Albuterol)',
    canonical_sw: 'Salbutamol',
    en: [
      'salbutamol', 'albuterol', 'ventolin', 'asthalin',
      'blue inhaler', 'reliever inhaler', 'rescue inhaler',
      'saba', 'short acting beta agonist', 'short-acting beta agonist',
      'short acting bronchodilator', 'bronchodilator',
      'salbutamol inhaler', 'salbutamol nebuliser', 'salbutamol nebulizer',
      'reliever', 'asmavent', 'asmol',
    ],
    sw: [
      'salbutamol', 'ventolin', 'inhaler ya bluu',
      'inhaler ya kupunguza', 'dawa ya kupunguza pumu',
      'dawa ya kupanua mishipa ya hewa',
    ],
    sw_mtaa: [
      'inhaler ya bluu', 'inhaler ya bluu ya pumu',
      'ventolin', 'reliever', 'asthalin',
      'dawa ya kupunguza pumu', 'pampu ya pumu',
      'pampu ya bluu', 'pampu',
    ],
    slang: ['ventolin', 'asthalin', 'pampu', 'blue puffer', 'pumu pump'],
  },

  inhaled_corticosteroid: {
    canonical_en: 'Inhaled Corticosteroid (ICS) — preventer/controller',
    canonical_sw: 'Steroid ya Kuvuta — Kinga/Mdhibiti',
    en: [
      'inhaled corticosteroid', 'ics', 'inhaled steroid',
      'preventer inhaler', 'controller inhaler', 'preventer', 'controller',
      'brown inhaler', 'orange inhaler', 'maroon inhaler',
      'beclomethasone', 'beclometasone', 'becotide', 'beclate',
      'budesonide', 'pulmicort', 'budecort',
      'fluticasone', 'flixotide', 'flovent',
      'mometasone', 'asmanex',
      'ciclesonide',
      // patient-language triggers that should route to ICS
      'mouth rinse after inhaler', 'rinse mouth after inhaler',
      'gargle after inhaler', 'why rinse mouth',
      'why do I need to take inhaler when I feel well',
      'take inhaler when I feel well',
      'daily controller inhaler', 'take controller daily',
      'take preventer daily', 'preventer every day',
    ],
    sw: [
      'steroid ya kuvuta', 'inhaler ya kinga', 'inhaler ya kudhibiti',
      'beclomethasone', 'budesonide', 'fluticasone',
      'dawa ya kuzuia pumu', 'inhaler ya kuzuia',
    ],
    sw_mtaa: [
      'preventer', 'controller', 'ICS',
      'inhaler ya brown', 'inhaler ya kahawia', 'inhaler ya orange',
      'beclometh', 'pulmicort', 'flixotide',
      'inhaler ya kila siku', 'inhaler ya kinga',
    ],
    slang: ['ICS', 'preventer', 'controller', 'brown puffer', 'brown inhaler'],
  },

  prednisolone: {
    canonical_en: 'Prednisolone',
    canonical_sw: 'Prednisolone',
    en: [
      'prednisolone', 'prednisone', 'oral steroid', 'systemic steroid',
      'oral corticosteroid', 'deltacortril', 'prelone',
      'steroid tablet', 'steroid pill', 'pred',
    ],
    sw: [
      'prednisolone', 'prednisone', 'steroid ya kumeza',
      'kibao cha steroid', 'kidonge cha steroid',
      'corticosteroid ya kumeza',
    ],
    sw_mtaa: [
      'prednisolone', 'pred', 'steroid ya kumeza',
      'vidonge vya steroid', 'kibao cha steroid',
      'dawa ya steroid', 'steroids',
    ],
    slang: ['pred', 'prednisone', 'steroids', 'steroid pills'],
  },

  // ────────────────────────────────────────────────────────────────
  // COPD drugs — Phase 10
  // ────────────────────────────────────────────────────────────────
  tiotropium: {
    canonical_en: 'Tiotropium (LAMA controller inhaler)',
    canonical_sw: 'Tiotropium (Inhaler ya LAMA)',
    en: [
      'tiotropium', 'spiriva', 'handihaler', 'respimat',
      'lama', 'long acting muscarinic antagonist',
      'long-acting muscarinic antagonist',
      'long acting anticholinergic', 'long-acting anticholinergic',
      'lama inhaler', 'tiotropium inhaler',
      'once daily inhaler', 'tio',
    ],
    sw: [
      'tiotropium', 'lama', 'spiriva',
      'inhaler ya lama', 'inhaler ya tiotropium',
      'inhaler ya mara moja kwa siku',
    ],
    sw_mtaa: [
      'tiotropium', 'spiriva', 'handihaler', 'respimat',
      'inhaler ya tiotropium', 'lama inhaler',
      'inhaler ya once daily', 'capsule ya inhaler',
    ],
    slang: ['tio', 'spiriva', 'lama'],
  },

  salmeterol: {
    canonical_en: 'Salmeterol / LABA (Long-Acting Beta-Agonist)',
    canonical_sw: 'Salmeterol / LABA',
    en: [
      'salmeterol', 'formoterol', 'serevent', 'oxis', 'foradil',
      'indacaterol', 'vilanterol', 'olodaterol',
      'laba', 'long acting beta agonist', 'long-acting beta-agonist',
      'long acting bronchodilator', 'long-acting bronchodilator',
      'laba inhaler',
    ],
    sw: [
      'salmeterol', 'formoterol', 'laba',
      'bronchodilator ya muda mrefu', 'inhaler ya muda mrefu',
      'inhaler ya laba',
    ],
    sw_mtaa: [
      'salmeterol', 'formoterol', 'serevent', 'laba',
      'inhaler ya laba', 'long-acting inhaler',
      'long acting bronchodilator',
      'inhaler ya muda mrefu',
    ],
    slang: ['laba', 'serevent', 'formoterol'],
  },

  ipratropium: {
    canonical_en: 'Ipratropium (SAMA reliever inhaler)',
    canonical_sw: 'Ipratropium (Inhaler ya SAMA)',
    en: [
      'ipratropium', 'atrovent', 'sama',
      'short acting muscarinic antagonist',
      'short-acting muscarinic antagonist',
      'short acting anticholinergic',
      'short-acting anticholinergic',
      'ipratropium nebuliser', 'ipratropium nebulizer',
      'combivent', 'duoneb',
    ],
    sw: [
      'ipratropium', 'atrovent', 'sama',
      'inhaler ya muda mfupi ya sama',
      'nebulizer ya ipratropium',
    ],
    sw_mtaa: [
      'ipratropium', 'atrovent', 'sama',
      'combivent', 'ipratropium na salbutamol pamoja',
      'nebulizer ya ipratropium',
    ],
    slang: ['atrovent', 'sama', 'combivent'],
  },

  // ────────────────────────────────────────────────────────────────
  // Phase 13-15 — Sickle cell & anaemia adjunct drugs (aliased only;
  // educational content routed via DRUG_TO_CONDITION_FALLBACK)
  // ────────────────────────────────────────────────────────────────
  hydroxyurea: {
    canonical_en: 'Hydroxyurea (Hydroxycarbamide)',
    canonical_sw: 'Hydroxyurea',
    en: ['hydroxyurea', 'hydroxycarbamide', 'hu', 'droxia', 'hydrea'],
    sw: ['hydroxyurea', 'dawa ya selimundu', 'dawa ya kupunguza mzozo'],
    sw_mtaa: ['hydroxyurea', 'hu', 'dawa ya sickle', 'dawa ya selimundu'],
    slang: ['hu', 'hydrea'],
  },

  proguanil: {
    canonical_en: 'Proguanil (malaria prophylaxis)',
    canonical_sw: 'Proguanil (kinga ya malaria)',
    en: ['proguanil', 'paludrine', 'malaria prophylaxis', 'malaria prevention drug', 'antimalarial prophylaxis'],
    sw: ['proguanil', 'kinga ya malaria', 'dawa ya kuzuia malaria'],
    sw_mtaa: ['proguanil', 'dawa ya kuzuia malaria', 'kinga ya malaria'],
    slang: ['proguanil', 'paludrine'],
  },

  folic_acid: {
    canonical_en: 'Folic Acid',
    canonical_sw: 'Folic Acid',
    en: ['folic acid', 'folate', 'vitamin b9', 'b9'],
    sw: ['folic acid', 'asidi ya folic', 'vitamini b9'],
    sw_mtaa: ['folic acid', 'folate', 'vitamin b9'],
    slang: ['folate', 'folic'],
  },

  iron_supplement: {
    canonical_en: 'Iron Supplement (Ferrous Sulfate)',
    canonical_sw: 'Iron (Madini ya Chuma)',
    en: ['iron', 'iron tablet', 'iron supplement', 'ferrous sulfate', 'ferrous sulphate', 'ferrous fumarate', 'ferrous gluconate'],
    sw: ['madini ya chuma', 'kibao cha chuma', 'iron', 'ferrous sulfate'],
    sw_mtaa: ['iron', 'madini ya chuma', 'kibao cha damu', 'tembe ya damu'],
    slang: ['iron pills', 'iron tablets'],
  },
};

// ──────────────────────────────────────────────────────────────────────
// LAB ALIASES
// ──────────────────────────────────────────────────────────────────────

export const LAB_ALIASES: Record<string, Aliases> = {
  creatinine: {
    canonical_en: 'Creatinine',
    canonical_sw: 'Creatinine',
    en: ['creatinine', 'serum creatinine', 'scr', 'cr'],
    sw: ['creatinine', 'kipimo cha figo cha creatinine'],
    sw_mtaa: ['creatinine', 'creatine', 'kipimo cha figo'],
    slang: ['creatnine', 'kreatinine', 'creatinin', 'cretanine'],
  },

  egfr: {
    canonical_en: 'eGFR (Estimated Glomerular Filtration Rate)',
    canonical_sw: 'eGFR (Kiwango cha Uchujaji wa Figo)',
    en: [
      'egfr', 'gfr', 'e-gfr', 'estimated gfr', 'glomerular filtration rate',
      'estimated glomerular filtration rate', 'kidney function test',
      'kidney function', 'renal function', 'kidney filtration rate',
    ],
    sw: [
      'egfr', 'gfr', 'kiwango cha uchujaji wa figo', 'kipimo cha utendaji wa figo',
      'utendaji wa figo', 'kazi ya figo',
    ],
    sw_mtaa: [
      'egfr', 'gfr', 'kipimo cha figo', 'kazi ya figo', 'figo zinafanyaje kazi',
    ],
    slang: ['egfr', 'gfr', 'e gfr'],
  },

  hba1c: {
    canonical_en: 'HbA1c (Glycated Haemoglobin)',
    canonical_sw: 'HbA1c (Hemoglobini iliyoshikana na Sukari)',
    en: [
      'hba1c', 'haemoglobin a1c', 'hemoglobin a1c', 'glycated hemoglobin',
      'glycated haemoglobin', 'a1c', 'glycohaemoglobin',
      'average sugar test', 'three month sugar', 'three months sugar test',
    ],
    sw: [
      'hba1c', 'kipimo cha wastani wa sukari',
      'kipimo cha sukari cha miezi mitatu',
    ],
    sw_mtaa: [
      'hba1c', 'wastani wa sukari', 'sukari ya miezi mitatu', 'sukari ya wastani',
    ],
    slang: ['hba 1c', 'hb a1c', 'hbac', 'hba1', 'hemoglobin a one c'],
  },

  blood_pressure: {
    canonical_en: 'Blood Pressure',
    canonical_sw: 'Shinikizo la Damu',
    en: ['blood pressure', 'bp', 'pressure'],
    sw: ['shinikizo la damu', 'msukumo wa damu', 'presha ya damu'],
    sw_mtaa: ['bp', 'presha', 'pressa', 'pressure', 'shinikizo'],
    slang: ['blod pressure', 'bp reading', 'pressha'],
  },

  glucose: {
    canonical_en: 'Blood Glucose',
    canonical_sw: 'Sukari ya Damu',
    en: [
      'glucose', 'blood glucose', 'blood sugar',
      'rbs', 'fbs', 'random glucose', 'fasting glucose',
      'random blood sugar', 'fasting blood sugar',
      'ogtt', 'oral glucose tolerance test', 'glucose tolerance',
      '2 hour glucose', 'postprandial glucose', 'pp glucose',
    ],
    sw: [
      'sukari ya damu', 'kiwango cha sukari',
      'sukari ya kufunga', 'sukari baada ya kula',
    ],
    sw_mtaa: [
      'sukari', 'sugar', 'glucose', 'rbs', 'fbs',
      'sukari ya asubuhi', 'sukari baada ya chakula',
    ],
    slang: ['glucos', 'glucouse', 'gluocose', 'sukar'],
  },

  mrdt: {
    canonical_en: 'Malaria Rapid Diagnostic Test (mRDT)',
    canonical_sw: 'Kipimo cha Haraka cha Malaria (mRDT)',
    en: [
      'mrdt', 'malaria rdt', 'malaria rapid test', 'rapid malaria test',
      'rapid diagnostic test', 'rdt', 'malaria test', 'paracheck',
      'sd bioline', 'carestart malaria',
    ],
    sw: [
      'kipimo cha haraka cha malaria', 'mrdt', 'rdt',
      'kipimo cha malaria', 'kipimo cha rapid cha malaria',
    ],
    sw_mtaa: [
      'mrdt', 'kipimo cha malaria', 'rapid test ya malaria',
      'kipimo cha haraka', 'rdt ya malaria', 'paracheck',
    ],
    slang: ['m rdt', 'em rdt', 'malaria rapid'],
  },

  microscopy_malaria: {
    canonical_en: 'Malaria Microscopy (Blood Smear)',
    canonical_sw: 'Darubini ya Malaria (Smear ya Damu)',
    en: [
      'malaria microscopy', 'blood smear', 'thick smear', 'thin smear',
      'malaria slide', 'bs', 'blood film for malaria parasites',
      'bf', 'malaria parasites', 'mps',
    ],
    sw: [
      'darubini ya malaria', 'smear ya damu', 'kipimo cha darubini cha malaria',
    ],
    sw_mtaa: [
      'darubini', 'smear', 'damu ya darubini', 'kupima damu kwenye darubini',
      'slide ya malaria',
    ],
    slang: ['darubin', 'darubin ya malaria'],
  },

  hemoglobin: {
    canonical_en: 'Hemoglobin (Hb)',
    canonical_sw: 'Hemoglobini (Hb)',
    en: [
      'hemoglobin', 'haemoglobin', 'hb', 'hgb', 'blood count',
      'cbc hb', 'iron level in blood',
    ],
    sw: [
      'hemoglobini', 'kiwango cha damu', 'damu', 'kipimo cha damu',
    ],
    sw_mtaa: [
      'damu yangu', 'hb', 'damu chini', 'damu ndogo',
      'upungufu wa damu', 'hemoglobini',
    ],
    slang: ['hemoglobin', 'hb level', 'hemglobin'],
  },

  genexpert: {
    canonical_en: 'GeneXpert MTB/RIF',
    canonical_sw: 'GeneXpert MTB/RIF',
    en: [
      'genexpert', 'gene xpert', 'xpert mtb rif', 'xpert mtb/rif', 'xpert',
      'mtb rif test', 'tb pcr', 'tb molecular test', 'rapid tb test', 'cbnaat',
      'xpert ultra', 'genexpert mtb',
      // MTB-bare phrases (strong GeneXpert proxies — only appear on GeneXpert reports)
      'mtb detected', 'mtb not detected', 'mtb positive', 'mtb negative',
      'mtb+', 'mtb-', 'mycobacterium detected', 'rif sensitive', 'rif resistant',
      'rifampicin sensitive', 'rifampicin resistant', 'rif indeterminate',
    ],
    sw: [
      'genexpert', 'kipimo cha haraka cha tb', 'kipimo cha molecular cha tb',
      'kipimo cha xpert cha tb',
      'mtb imegunduliwa', 'mtb haijagunduliwa',
    ],
    sw_mtaa: [
      'genexpert', 'xpert', 'kipimo cha haraka cha tb',
      'kipimo cha mashine cha tb',
      'mtb imegunduliwa', 'mtb haijadetectiwa',
    ],
    slang: ['genexpert yangu', 'gene xpert', 'xpert ya tb'],
  },

  sputum_afb: {
    canonical_en: 'Sputum AFB Smear (Acid-Fast Bacilli)',
    canonical_sw: 'Sputum AFB (Vimelea vya TB)',
    en: [
      'afb', 'sputum afb', 'sputum smear', 'afb smear', 'acid fast bacilli',
      'zn stain', 'ziehl neelsen', 'tb microscopy', 'sputum microscopy',
      'tb smear', 'sputum for tb',
    ],
    sw: [
      'sputum afb', 'kipimo cha makohozi cha tb', 'darubini ya makohozi',
      'kipimo cha tb cha makohozi', 'mate kwenye darubini',
    ],
    sw_mtaa: [
      'kipimo cha makohozi', 'makohozi yangu', 'mate ya tb',
      'darubini ya makohozi', 'afb', 'sputum',
    ],
    slang: ['afb yangu', 'sputum yangu'],
  },

  chest_xray_tb: {
    canonical_en: 'Chest X-Ray (TB context)',
    canonical_sw: 'X-Ray ya Kifua (Muktadha wa TB)',
    en: [
      'chest x-ray', 'chest xray', 'cxr', 'chest radiograph',
      'lung xray', 'chest film', 'pa view',
    ],
    sw: [
      'x-ray ya kifua', 'picha ya kifua', 'xray ya mapafu',
      'x-ray ya mapafu',
    ],
    sw_mtaa: [
      'xray ya kifua', 'picha ya mapafu', 'cxr', 'picha ya kifua',
    ],
    slang: ['xray', 'cxr yangu'],
  },

  // ── HIV labs ───────────────────────────────────────────────────────
  cd4: {
    canonical_en: 'CD4 Count',
    canonical_sw: 'Kipimo cha CD4',
    en: [
      'cd4', 'cd4 count', 'cd 4', 'cd4 cell count', 'cd four', 'cd4 test',
      't cell count', 'cd4 percentage', 'cd4 result',
    ],
    sw: [
      'cd4', 'kipimo cha cd4', 'idadi ya cd4', 'cd4 yangu',
      'kipimo cha kinga ya mwili',
    ],
    sw_mtaa: [
      'cd4', 'cd4 yangu', 'kipimo cha cd4', 'cd4 imeshuka', 'cd4 iko juu',
    ],
    slang: ['cd4', 'cd4 yangu'],
  },

  viral_load: {
    canonical_en: 'HIV Viral Load',
    canonical_sw: 'Kiwango cha Virusi vya VVU (Viral Load)',
    en: [
      'viral load', 'vl', 'hiv viral load', 'viral load test', 'vl result',
      'undetectable viral load', 'detectable viral load', 'copies per ml',
      'viral suppression', 'suppressed viral load', 'hiv rna',
    ],
    sw: [
      'viral load', 'kiwango cha virusi', 'kipimo cha viral load',
      'wingi wa virusi vya vvu', 'virusi havionekani', 'virusi vinaonekana',
    ],
    sw_mtaa: [
      'viral load', 'viral load yangu', 'kiwango cha virusi',
      'virusi havionekani', 'virusi viko juu', 'vl yangu',
    ],
    slang: ['vl', 'viral load yangu', 'vl yangu'],
  },

  // ── Maternal lab (Phase 7) ───────────────────────────────────────────
  urine_protein: {
    canonical_en: 'Urine Protein (Proteinuria)',
    canonical_sw: 'Protini kwenye Mkojo',
    en: [
      'urine protein', 'proteinuria', 'protein in urine', 'urine dipstick protein',
      'dipstick protein', 'urinalysis protein', 'albuminuria',
      'dipstick imeonyesha', 'urine dipstick',
    ],
    sw: [
      'protini kwenye mkojo', 'protein kwenye mkojo', 'mkojo wenye protini',
      'kipimo cha mkojo protini', 'protini mkojoni', 'protini kwenye mkojo wangu',
      'dipstick ya mkojo',
    ],
    sw_mtaa: [
      'protini mkojoni', 'mkojo wangu una protini', 'protein mkojoni',
      'dipstick imeonyesha protini', 'dipstick imeonyesha', 'dipstick ya mkojo',
      'protini kwenye mkojo',
    ],
    slang: ['proteinuria', 'urine protein +', 'urine protein 2+', 'protini mkojo'],
  },

  // ── Pneumonia lab (Phase 8) ──────────────────────────────────────────
  spo2: {
    canonical_en: 'SpO2 (Oxygen Saturation)',
    canonical_sw: 'SpO2 (Kiwango cha Oksijeni ya Damu)',
    en: [
      'spo2', 'sp o2', 'oxygen saturation', 'oxygen level', 'pulse oximetry',
      'pulse ox', 'oximetry', 'o2 sat', 'oxygen sats', 'sats', 'oxygen reading',
      'saturation', 'oximeter reading',
    ],
    sw: [
      'spo2', 'kiwango cha oksijeni', 'kiwango cha oksijeni ya damu',
      'oksijeni ya damu', 'kipimo cha oksijeni', 'pulse oximeter',
      'kipimo cha kidole cha oksijeni',
    ],
    sw_mtaa: [
      'spo2', 'oksijeni', 'kipimo cha kidole', 'oxygen level',
      'kiwango cha oksijeni kimeshuka', 'oksijeni iko chini',
    ],
    slang: ['spo2', 'sats', 'o2 sat', 'pulse ox', 'oximetry'],
  },

  respiratory_rate: {
    canonical_en: 'Respiratory Rate (Breaths per Minute)',
    canonical_sw: 'Kasi ya Kupumua (Pumzi kwa Dakika)',
    en: [
      'respiratory rate', 'breathing rate', 'breaths per minute', 'bpm breathing',
      'rr', 'breath rate', 'how fast i am breathing', 'how fast is breathing',
      'fast breathing', 'rapid breathing', 'tachypnoea', 'tachypnea',
      'breathing fast', 'breathing too fast',
      'newborn breathing', 'infant breathing', 'baby breathing',
      'child breathing', 'normal breathing rate', 'breathing rhythm',
      'normal breathing for child', 'normal breathing in children',
    ],
    sw: [
      'kasi ya kupumua', 'pumzi kwa dakika', 'mara ngapi anapumua',
      'kupumua haraka', 'pumzi za haraka', 'mara ya kupumua',
      'kasi ya pumzi', 'anapumua haraka', 'anapumua mara nyingi',
      'mtoto anapumua', 'mtoto anapumua haraka',
      'kupumua kwa kawaida', 'kupumua kwa mtoto', 'pumzi za mtoto',
      'kupumua kwa kawaida kwa mtoto', 'kupumua kwa shida',
      'anapumua kwa shida', 'kupumua kwa nguvu',
    ],
    sw_mtaa: [
      'kupumua haraka', 'pumzi haraka', 'mtoto anapumua haraka',
      'mtoto anapumua mfululizo', 'anapumua kama amechoka',
      'pumzi nyingi kwa dakika', 'mtoto anapumua', 'anapumua haraka',
      'anapumua mara nyingi',
      'anapumua kwa shida', 'kupumua kwa shida', 'anapumua kwa nguvu',
      'pumzi inakwama', 'pumzi inakatika',
    ],
    slang: ['rr', 'breathing fast', 'fast breaths'],
  },

  // ── Peak Flow / PEFR (Phase 9 asthma) ──────────────────────────────
  peak_flow: {
    canonical_en: 'Peak Expiratory Flow (PEF / PEFR)',
    canonical_sw: 'Kipimo cha Mtiririko wa Pumzi (PEF)',
    en: [
      'peak flow', 'pef', 'pefr', 'peak expiratory flow',
      'peak expiratory flow rate', 'peakflow', 'peak flow rate',
      'peak flow meter', 'peak flow reading', 'peak flow measurement',
    ],
    sw: [
      'peak flow', 'pef', 'pefr',
      'kipimo cha mtiririko wa pumzi', 'mtiririko wa pumzi',
      'kipimo cha pumzi', 'kasi ya pumzi',
    ],
    sw_mtaa: [
      'peak flow', 'pef', 'kipimo cha pumzi',
      'kipimo cha kasi ya pumzi', 'mtiririko wa pumzi yangu',
      'kipimo cha pumu',
    ],
    slang: ['pef', 'pefr', 'peak flow'],
  },

  // ────────────────────────────────────────────────────────────────
  // Spirometry — Phase 10
  // ────────────────────────────────────────────────────────────────
  spirometry: {
    canonical_en: 'Spirometry (Lung Function Test)',
    canonical_sw: 'Spirometry (Kipimo cha Utendaji wa Mapafu)',
    en: [
      'spirometry', 'lung function test', 'lung function',
      'pulmonary function test', 'pulmonary function tests', 'pft', 'pfts',
      'fev1', 'fvc', 'fev1/fvc', 'fev1 fvc ratio',
      'forced expiratory volume', 'forced vital capacity',
      'post bronchodilator spirometry', 'post-bronchodilator spirometry',
      'pre bronchodilator spirometry', 'pre-bronchodilator spirometry',
      'breathing test', 'lung capacity test',
      'fev1 percent predicted', 'fev1 % predicted',
      'fev1 predicted',
    ],
    sw: [
      'spirometry', 'kipimo cha utendaji wa mapafu',
      'kipimo cha mapafu', 'kipimo cha kupumua',
      'utendaji wa mapafu', 'fev1', 'fvc',
      'kipimo cha kazi ya mapafu',
    ],
    sw_mtaa: [
      'spirometry', 'kipimo cha mapafu', 'lung function test',
      'breathing test', 'fev1', 'fvc', 'pft',
      'kipimo cha kupumua', 'kipimo cha kazi ya mapafu',
      'kipimo cha kupima mapafu',
    ],
    slang: ['spiro', 'pft', 'lung test', 'breathing test'],
  },
};

// ──────────────────────────────────────────────────────────────────────
// REVERSE INDEX BUILDER
// ──────────────────────────────────────────────────────────────────────

export interface ReverseIndexEntry {
  canonicalId: string;
  entityType: 'condition' | 'drug' | 'lab';
  surfaceForm: string;
  language: 'en' | 'sw' | 'sw_mtaa' | 'slang';
}

export function buildReverseIndex(): ReverseIndexEntry[] {
  const index: ReverseIndexEntry[] = [];

  const ingest = (
    bank: Record<string, Aliases>,
    entityType: 'condition' | 'drug' | 'lab'
  ) => {
    Object.entries(bank).forEach(([id, aliases]) => {
      aliases.en.forEach((s) => index.push({ canonicalId: id, entityType, surfaceForm: s.toLowerCase(), language: 'en' }));
      aliases.sw.forEach((s) => index.push({ canonicalId: id, entityType, surfaceForm: s.toLowerCase(), language: 'sw' }));
      aliases.sw_mtaa.forEach((s) => index.push({ canonicalId: id, entityType, surfaceForm: s.toLowerCase(), language: 'sw_mtaa' }));
      aliases.slang.forEach((s) => index.push({ canonicalId: id, entityType, surfaceForm: s.toLowerCase(), language: 'slang' }));
    });
  };

  ingest(CONDITION_ALIASES, 'condition');
  ingest(DRUG_ALIASES, 'drug');
  ingest(LAB_ALIASES, 'lab');

  return index.sort((a, b) => b.surfaceForm.length - a.surfaceForm.length);
}

export const REVERSE_INDEX = buildReverseIndex();
