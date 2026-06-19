/**
 * COPD — Variants (Phase 10)
 *
 * Six variants representing the highest-impact patterns of COPD in
 * Tanzania:
 *   • copd_stable_mild_moderate — outpatient, daily symptoms manageable,
 *     few exacerbations (GOLD Group A/B). The workhorse pattern.
 *   • copd_severe_stable — advanced disease, frequent exacerbations,
 *     poor exercise tolerance (GOLD Group E), needs LABA+LAMA ± ICS.
 *   • aecopd_outpatient — acute exacerbation manageable at home /
 *     outpatient. Stepped-up bronchodilators ± short course oral
 *     prednisolone ± antibiotics if bacterial features.
 *   • aecopd_severe — exacerbation needing admission: hypoxia,
 *     hypercapnia, exhaustion. Controlled oxygen, ± NIV/BiPAP.
 *   • cor_pulmonale — right-heart strain / pulmonary hypertension
 *     from chronic hypoxic lung disease. Ankle swelling, raised JVP,
 *     loud P2.
 *   • post_tb_obstructive_lung_disease — the Tanzanian "phenotype X"
 *     in non-smokers with treated TB years earlier. Behaves like COPD
 *     but the cause is structural post-TB damage.
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const COPD_VARIANTS: ConditionVariant[] = [
  // ────────────────────────────────────────────────────────────────
  // COPD STABLE — MILD-MODERATE (OUTPATIENT)
  // ────────────────────────────────────────────────────────────────
  {
    id: 'copd_stable_mild_moderate',
    severity: 'uncomplicated',
    population: 'adult',
    label: {
      en: 'COPD — stable, mild to moderate (GOLD A/B)',
      sw: 'COPD — thabiti, ndogo hadi ya wastani (GOLD A/B)',
    },
    presentation: {
      en: 'A patient — typically 50+, with a long history of cigarette smoking or biomass-fuel cooking — who has chronic cough most mornings, mild to moderate breathlessness with activity (mMRC 1-2: shortness of breath when hurrying on the level or climbing a slight hill), but is independent in daily activities, sleeping well, no rapid recent worsening, and few or no exacerbations needing oral steroids or hospital in the past year. Examination may be near-normal in mild disease, or show prolonged expiration and occasional wheeze. SpO2 on room air is usually ≥ 92%. Spirometry confirms post-bronchodilator FEV1/FVC < 0.7.',
      sw: 'Mgonjwa — kawaida zaidi ya miaka 50, na historia ndefu ya kuvuta sigara au kupika kwa nishati ya kuni — mwenye kikohozi sugu asubuhi nyingi, kushindwa kupumua kidogo hadi cha wastani kwa shughuli (mMRC 1-2: kushindwa pumzi anaposhikilia kasi kwenye eneo tambarare au kupanda mlima kidogo), lakini ana uhuru katika shughuli za kila siku, analala vyema, hakuna kushuka kwa haraka hivi karibuni, na milipuko michache au hakuna inayohitaji steroid ya kumeza au hospitali mwaka uliopita. Uchunguzi unaweza kuwa karibu wa kawaida katika ugonjwa mdogo, au kuonyesha kuvuta nje kwa muda mrefu na miluzi mara kwa mara. SpO2 kwa hewa ya kawaida kawaida ni ≥ 92%. Spirometry inathibitisha baada ya bronchodilator FEV1/FVC < 0.7.',
      sw_mtaa: 'Patient — typically 50+, na long history ya cigarette smoking au biomass-fuel cooking — mwenye chronic cough asubuhi nyingi, mild to moderate breathlessness kwa activity (mMRC 1-2: shortness of breath anapohurry on level au kupanda hill slight), lakini independent katika daily activities, analala vyema, hakuna rapid recent worsening, na few au hakuna exacerbations zinazohitaji oral steroids au hospitali mwaka uliopita. Examination inaweza kuwa near-normal katika mild disease, au kuonyesha prolonged expiration na occasional wheeze. SpO2 on room air kawaida ni ≥ 92%. Spirometry inathibitisha post-bronchodilator FEV1/FVC < 0.7.',
    },
    recognitionSigns: [
      {
        en: 'Chronic cough most mornings — often productive of clear or whitish sputum',
        sw: 'Kikohozi sugu asubuhi nyingi — mara nyingi cha makohozi safi au meupe',
        sw_mtaa: 'Chronic cough asubuhi nyingi — mara nyingi productive ya clear au whitish sputum',
      },
      {
        en: 'Breathlessness on moderate exertion (hurrying, climbing a hill) — but not at rest, not at night',
        sw: 'Kushindwa kupumua kwa juhudi za wastani (kushikilia kasi, kupanda mlima) — lakini sio wakati wa kupumzika, sio usiku',
        sw_mtaa: 'Breathlessness on moderate exertion (kushikilia kasi, kupanda hill) — lakini sio at rest, sio usiku',
      },
      {
        en: 'Smoking history (current or former) and/or decades of cooking over firewood/charcoal indoors',
        sw: 'Historia ya kuvuta sigara (sasa au zamani) na/au miongo ya kupika juu ya kuni/mkaa ndani ya nyumba',
        sw_mtaa: 'Smoking history (current au former) na/au decades ya kupika over firewood/charcoal indoors',
      },
      {
        en: 'Post-bronchodilator spirometry FEV1/FVC < 0.7 — required for diagnosis',
        sw: 'Spirometry baada ya bronchodilator FEV1/FVC < 0.7 — inahitajika kwa utambuzi',
        sw_mtaa: 'Post-bronchodilator spirometry FEV1/FVC < 0.7 — required kwa diagnosis',
      },
      {
        en: 'Independent in daily life; SpO2 ≥ 92% on room air; no recent exacerbation',
        sw: 'Anaweza kujitegemea katika maisha ya kila siku; SpO2 ≥ 92% kwa hewa ya kawaida; hakuna mlipuko wa karibuni',
        sw_mtaa: 'Independent katika daily life; SpO2 ≥ 92% on room air; hakuna recent exacerbation',
      },
    ],
    treatmentJourney: {
      en: 'The foundation is removing the cause: stop smoking (the single highest-impact intervention at any stage), and where biomass smoke is the driver, move cooking outdoors or switch to a cleaner cookstove or LPG. Inhaled therapy starts with a long-acting bronchodilator — either a LAMA (tiotropium) or a LABA (salmeterol or formoterol). A short-acting reliever (salbutamol via a spacer) is for sudden breathlessness, not daily symptom control. Add annual influenza and pneumococcal vaccination, encourage regular walking, and refer for pulmonary rehabilitation where available. Review at 3 months: if symptoms persist on monotherapy, step up to LABA+LAMA combination. Inhaled corticosteroid is added only if there are frequent exacerbations (≥ 2 moderate or ≥ 1 severe per year), high blood eosinophils, or asthma-COPD overlap features — in pure mild-moderate COPD, ICS raises pneumonia risk without major benefit.',
      sw: 'Msingi ni kuondoa sababu: acha kuvuta sigara (hatua pekee yenye matokeo makubwa zaidi katika hatua yoyote), na pale moshi wa kuni ni kichocheo, hamishia upishi nje au badilisha kwa jiko safi au LPG. Tiba ya kupuliza huanza na bronchodilator ya muda mrefu — LAMA (tiotropium) au LABA (salmeterol au formoterol). Reliever ya muda mfupi (salbutamol kupitia spacer) ni kwa kushindwa kupumua kwa ghafla, sio udhibiti wa dalili wa kila siku. Ongeza chanjo ya kila mwaka ya influenza na pneumococcal, himiza matembezi ya kawaida, na rejea kwa ukarabati wa mapafu pale unapopatikana. Mapitio katika miezi 3: ikiwa dalili zinaendelea kwenye monotherapy, panda hadi mchanganyiko wa LABA+LAMA. Inhaled corticosteroid huongezwa tu ikiwa kuna milipuko ya mara kwa mara (≥ 2 ya wastani au ≥ 1 kali kwa mwaka), eosinophil za damu za juu, au sifa za asthma-COPD overlap — katika COPD safi ya wastani-ndogo, ICS huongeza hatari ya nimonia bila faida kubwa.',
      sw_mtaa: 'Foundation ni kuondoa cause: acha kuvuta sigara (single highest-impact intervention katika stage yoyote), na pale biomass smoke ni driver, hamishia cooking outdoors au switch kwa cleaner cookstove au LPG. Inhaled therapy inaanza na long-acting bronchodilator — ama LAMA (tiotropium) au LABA (salmeterol au formoterol). Short-acting reliever (salbutamol via spacer) ni kwa sudden breathlessness, sio daily symptom control. Ongeza annual influenza na pneumococcal vaccination, encourage regular walking, na refer kwa pulmonary rehabilitation pale inapopatikana. Review at 3 months: ikiwa symptoms zinapersist on monotherapy, step up to LABA+LAMA combination. Inhaled corticosteroid inaongezwa tu ikiwa kuna frequent exacerbations (≥ 2 moderate au ≥ 1 severe per year), high blood eosinophils, au asthma-COPD overlap features — katika pure mild-moderate COPD, ICS inaraise pneumonia risk bila major benefit.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'New breathlessness at rest, or breathlessness markedly worse than usual — likely exacerbation, follow action plan',
          sw: 'Kushindwa kupumua kwa kupumzika kwa mara ya kwanza, au kushindwa kupumua kuwa mbaya zaidi kuliko kawaida — mlipuko unawezekana, fuata mpango wa hatua',
          sw_mtaa: 'New breathlessness at rest, au breathlessness markedly worse kuliko kawaida — likely exacerbation, fuata action plan',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Cough lasting > 2 weeks with weight loss, night sweats, or blood — rule out TB',
          sw: 'Kikohozi cha kudumu > wiki 2 na kupungua uzito, jasho la usiku, au damu — toa TB',
          sw_mtaa: 'Cough lasting > weeks 2 na weight loss, night sweats, au damu — rule out TB',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Review every 3-6 months: symptom score (CAT or mMRC), inhaler technique, exacerbation history, smoking status, vaccination status. Annual influenza vaccine.',
      sw: 'Mapitio kila miezi 3-6: alama ya dalili (CAT au mMRC), mbinu ya inhaler, historia ya milipuko, hali ya kuvuta sigara, hali ya chanjo. Chanjo ya influenza ya kila mwaka.',
      sw_mtaa: 'Review kila miezi 3-6: symptom score (CAT au mMRC), inhaler technique, exacerbation history, smoking status, vaccination status. Annual influenza vaccine.',
    },
    sources: [src('GOLD_COPD_2025'), src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },

  // ────────────────────────────────────────────────────────────────
  // COPD SEVERE STABLE — ADVANCED DISEASE
  // ────────────────────────────────────────────────────────────────
  {
    id: 'copd_severe_stable',
    severity: 'severe',
    population: 'adult',
    label: {
      en: 'COPD — severe, frequent exacerbator (GOLD Group E)',
      sw: 'COPD — kali, mlipukaji wa mara kwa mara (GOLD Group E)',
    },
    presentation: {
      en: 'A patient with established COPD now having significant breathlessness on minimal exertion (mMRC 3-4: too breathless to leave the house, or breathless on dressing), reduced exercise tolerance, ≥ 2 moderate exacerbations or ≥ 1 severe (admission) exacerbation in the past year. Often a baseline SpO2 of 88-92% on room air, weight loss, possible signs of cor pulmonale (ankle oedema, raised JVP). Sleep may be disturbed by breathlessness. Caregivers often describe the patient as "afraid of breathing." This is the phenotype most at risk of dying from the next exacerbation, and where management gets most important.',
      sw: 'Mgonjwa mwenye COPD iliyothibitishwa sasa anayepata kushindwa kupumua kwa kiasi kikubwa kwa juhudi ndogo (mMRC 3-4: hashindwi pumzi sana hawezi kutoka nyumbani, au anashindwa pumzi anapovaa), uvumilivu wa mazoezi uliopungua, ≥ 2 milipuko ya wastani au ≥ 1 mlipuko mkali (kulazwa) katika mwaka uliopita. Mara nyingi baseline SpO2 ya 88-92% kwa hewa ya kawaida, kupungua uzito, dalili zinazowezekana za cor pulmonale (uvimbe wa kifundo, JVP iliyoinuliwa). Usingizi unaweza kuvurugwa na kushindwa kupumua. Walezi mara nyingi humueleza mgonjwa kama "anayehofu ya kupumua." Hii ndio phenotype iliyo katika hatari kubwa zaidi ya kufa kutokana na mlipuko unaofuata, na ambapo usimamizi unakuwa muhimu zaidi.',
      sw_mtaa: 'Patient mwenye established COPD sasa anayepata significant breathlessness on minimal exertion (mMRC 3-4: too breathless to leave the house, au breathless on dressing), reduced exercise tolerance, ≥ 2 moderate exacerbations au ≥ 1 severe (admission) exacerbation katika past year. Mara nyingi baseline SpO2 ya 88-92% on room air, weight loss, possible signs za cor pulmonale (ankle oedema, raised JVP). Sleep inaweza kuvurugwa na breathlessness. Caregivers mara nyingi wanadescribe patient kama "afraid of breathing." Hii ni phenotype most at risk ya kudie kutokana na next exacerbation, na ambapo management inakuwa most important.',
    },
    recognitionSigns: [
      {
        en: 'Breathless walking 100 metres on flat ground, or breathless on dressing (mMRC 3-4)',
        sw: 'Anashindwa kupumua kwa kutembea mita 100 kwenye eneo tambarare, au anashindwa kupumua anapovaa (mMRC 3-4)',
        sw_mtaa: 'Breathless walking 100 metres on flat ground, au breathless on dressing (mMRC 3-4)',
      },
      {
        en: 'Two or more moderate exacerbations in the past year, OR any admission for COPD',
        sw: 'Milipuko miwili au zaidi ya wastani katika mwaka uliopita, AU kulazwa kwa COPD yoyote',
        sw_mtaa: 'Two au more moderate exacerbations katika past year, AU any admission kwa COPD',
      },
      {
        en: 'Baseline SpO2 88-92% (the new "normal" for advanced COPD) — but exclude active deterioration',
        sw: 'Baseline SpO2 88-92% (mpya wa "kawaida" kwa COPD ya hali ya juu) — lakini toa kushuka hai',
        sw_mtaa: 'Baseline SpO2 88-92% (new "normal" kwa advanced COPD) — lakini exclude active deterioration',
      },
      {
        en: 'Weight loss, muscle wasting (cachexia), poor appetite — late-disease features',
        sw: 'Kupungua uzito, kupungua misuli (cachexia), hamu mbaya — sifa za ugonjwa wa marehemu',
        sw_mtaa: 'Weight loss, muscle wasting (cachexia), poor appetite — late-disease features',
      },
    ],
    treatmentJourney: {
      en: 'Treatment is escalated to long-acting combination: LABA + LAMA in a single or dual inhaler is the foundation. Inhaled corticosteroid is added (triple therapy: LABA+LAMA+ICS) if frequent exacerbations continue, blood eosinophils are raised, or there is asthma-COPD overlap — and a frank discussion of pneumonia risk is part of starting ICS. For patients with chronic SpO2 ≤ 88% on room air, long-term home oxygen therapy (≥ 15 hours per day) is the only treatment proven to extend life in COPD. Pulmonary rehabilitation is essential at this stage. Nutritional support, depression screening, vaccination, and advance care planning all become part of routine care. Specialist referral is appropriate.',
      sw: 'Matibabu yanapanda hadi mchanganyiko wa muda mrefu: LABA + LAMA katika inhaler moja au mbili ni msingi. Inhaled corticosteroid huongezwa (matibabu mara tatu: LABA+LAMA+ICS) ikiwa milipuko ya mara kwa mara inaendelea, eosinophil za damu zimeongezeka, au kuna asthma-COPD overlap — na majadiliano ya wazi ya hatari ya nimonia ni sehemu ya kuanza ICS. Kwa wagonjwa wenye SpO2 sugu ≤ 88% kwa hewa ya kawaida, tiba ya oksijeni ya nyumbani ya muda mrefu (≥ saa 15 kwa siku) ndio tiba pekee inayothibitishwa kuongeza maisha katika COPD. Ukarabati wa mapafu ni muhimu katika hatua hii. Msaada wa lishe, uchunguzi wa unyong\'onyevu, chanjo, na mipango ya huduma ya mapema yote yanakuwa sehemu ya huduma ya kawaida. Rufaa kwa mtaalam ni sahihi.',
      sw_mtaa: 'Treatment inaescalated kwa long-acting combination: LABA + LAMA katika single au dual inhaler ni foundation. Inhaled corticosteroid inaongezwa (triple therapy: LABA+LAMA+ICS) ikiwa frequent exacerbations zinaendelea, blood eosinophils zimeraised, au kuna asthma-COPD overlap — na frank discussion ya pneumonia risk ni sehemu ya kuanza ICS. Kwa wagonjwa wenye chronic SpO2 ≤ 88% on room air, long-term home oxygen therapy (≥ hours 15 per day) ni only treatment proven kuextend maisha katika COPD. Pulmonary rehabilitation ni essential katika stage hii. Nutritional support, depression screening, vaccination, na advance care planning vyote vinakuwa sehemu ya routine care. Specialist referral ni appropriate.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Drowsiness, confusion, or new headache — suggests CO2 retention, urgent assessment',
          sw: 'Usingizi, mkanganyiko, au maumivu mapya ya kichwa — yanaashiria mkusanyiko wa CO2, tathmini ya haraka',
          sw_mtaa: 'Drowsiness, confusion, au new headache — yanasuggest CO2 retention, urgent assessment',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Ankle swelling worsening or appearing — possible cor pulmonale',
          sw: 'Uvimbe wa kifundo unazidi au unajitokeza — uwezekano wa cor pulmonale',
          sw_mtaa: 'Ankle swelling inazidi au inajitokeza — possible cor pulmonale',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'SpO2 falling > 4% below the patient\'s usual baseline — even if absolute number is in their usual range',
          sw: 'SpO2 inashuka > 4% chini ya baseline ya kawaida ya mgonjwa — hata kama nambari kabisa iko katika kiwango chao cha kawaida',
          sw_mtaa: 'SpO2 inashuka > 4% chini ya patient\'s usual baseline — hata kama absolute number iko katika usual range yao',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Review every 1-3 months; specialist input where available. Continuous quality-of-life assessment, exacerbation log, advance care planning conversations.',
      sw: 'Mapitio kila mwezi 1-3; mchango wa mtaalam pale unapopatikana. Tathmini ya ubora wa maisha ya kuendelea, kitabu cha milipuko, mazungumzo ya mipango ya huduma ya mapema.',
      sw_mtaa: 'Review kila mwezi 1-3; specialist input pale inapopatikana. Continuous quality-of-life assessment, exacerbation log, advance care planning conversations.',
    },
    sources: [src('GOLD_COPD_2025'), src('WHO_OXYGEN_2023'), src('NTLG_STG_2023')],
  },

  // ────────────────────────────────────────────────────────────────
  // AECOPD — OUTPATIENT-MANAGED EXACERBATION
  // ────────────────────────────────────────────────────────────────
  {
    id: 'aecopd_outpatient',
    severity: 'complicated',
    population: 'adult',
    label: {
      en: 'Acute Exacerbation of COPD — outpatient/non-severe',
      sw: 'Mlipuko Wa Papo Hapo Wa COPD — wa nje/sio mkali',
    },
    presentation: {
      en: 'A patient with known COPD developing worsening of symptoms over hours to days — more breathlessness than usual, more cough, more sputum, or sputum changing from clear to yellow or green — typically triggered by a viral or bacterial chest infection. They are still able to talk in sentences, eat, drink, and remain at home. SpO2 is ≥ 90% on room air; respiratory rate raised but not extreme; no confusion or drowsiness. This is the "moderate" exacerbation that needs prompt outpatient treatment — and that, untreated, slides into the severe category.',
      sw: 'Mgonjwa mwenye COPD inayojulikana anayepata kuzidi kwa dalili kwa masaa hadi siku — kushindwa kupumua zaidi kuliko kawaida, kikohozi zaidi, makohozi zaidi, au makohozi kubadilika kutoka safi hadi njano au kijani — kawaida husababishwa na maambukizi ya kifua ya virusi au bakteria. Bado anaweza kuzungumza katika sentensi, kula, kunywa, na kubaki nyumbani. SpO2 ni ≥ 90% kwa hewa ya kawaida; kasi ya kupumua imeongezeka lakini sio kubwa sana; hakuna mkanganyiko au usingizi. Huu ni mlipuko wa "wastani" unaohitaji matibabu ya haraka ya wagonjwa wa nje — na ambao, bila matibabu, hutelezea katika kategoria kali.',
      sw_mtaa: 'Patient mwenye known COPD anayedevelopa worsening ya symptoms over hours to days — more breathlessness kuliko kawaida, more cough, more sputum, au sputum kubadilika kutoka clear hadi yellow au green — typically triggered na viral au bacterial chest infection. Bado anaweza talk katika sentences, kula, kunywa, na kubaki nyumbani. SpO2 ni ≥ 90% on room air; respiratory rate raised lakini sio extreme; hakuna confusion au drowsiness. Huu ni "moderate" exacerbation inayohitaji prompt outpatient treatment — na ambao, untreated, inaslide katika severe category.',
    },
    recognitionSigns: [
      {
        en: 'Step-change worsening of breathlessness compared to baseline, over hours to days',
        sw: 'Kuzidi kwa hatua kwa kushindwa kupumua ikilinganishwa na baseline, kwa masaa hadi siku',
        sw_mtaa: 'Step-change worsening ya breathlessness compared to baseline, over hours to days',
      },
      {
        en: 'Increased cough and sputum volume; sputum changing colour from clear/white to yellow/green',
        sw: 'Kikohozi na kiwango cha makohozi vimeongezeka; makohozi yanabadilika rangi kutoka safi/meupe hadi njano/kijani',
        sw_mtaa: 'Increased cough na sputum volume; sputum kubadilika colour kutoka clear/white kwenda yellow/green',
      },
      {
        en: 'May have low-grade fever; sometimes preceded by coryzal symptoms (runny nose, sore throat)',
        sw: 'Anaweza kuwa na homa ya kiwango cha chini; wakati mwingine kutanguliwa na dalili za coryzal (mafua, koo lenye uchungu)',
        sw_mtaa: 'Anaweza kuwa na low-grade fever; wakati mwingine kutanguliwa na coryzal symptoms (runny nose, sore throat)',
      },
      {
        en: 'Still able to speak in sentences, eat, drink; SpO2 ≥ 90% on room air; no confusion',
        sw: 'Bado anaweza kuzungumza katika sentensi, kula, kunywa; SpO2 ≥ 90% kwa hewa ya kawaida; hakuna mkanganyiko',
        sw_mtaa: 'Bado anaweza kuspeak katika sentences, kula, kunywa; SpO2 ≥ 90% on room air; hakuna confusion',
      },
    ],
    treatmentJourney: {
      en: 'Step up short-acting bronchodilators: salbutamol 2-4 puffs via spacer every 4 hours (or nebuliser if available and tolerated), plus ipratropium where available. Start oral prednisolone 30-40 mg once daily for 5 days — no taper needed for short courses. Antibiotics are NOT automatic in every exacerbation. They are reserved for patients with at least two of: increased breathlessness, increased sputum volume, and increased sputum purulence; OR a single sign plus signs of bacterial infection (raised CRP, fever, consolidation). First-line is amoxicillin or doxycycline; co-amoxiclav for treatment failure or risk factors. Avoid empirical broad-spectrum antibiotics — they fuel resistance without changing outcomes in viral-driven exacerbations. Recheck in 48-72 hours; if not improving, lower threshold for admission.',
      sw: 'Panda bronchodilator za muda mfupi: salbutamol 2-4 puffs kupitia spacer kila masaa 4 (au nebulizer ikiwa inapatikana na inavumiliwa), pamoja na ipratropium pale inapopatikana. Anza prednisolone ya kumeza 30-40 mg mara moja kwa siku kwa siku 5 — hakuna kuteremsha kunahitajika kwa kozi fupi. Antibiotic SI za moja kwa moja katika kila mlipuko. Zimewekwa kwa wagonjwa wenye angalau mbili kati ya: kushindwa kupumua kumeongezeka, kiwango cha makohozi kimeongezeka, na usaha wa makohozi umeongezeka; AU ishara moja pamoja na dalili za maambukizi ya bakteria (CRP iliyoinuliwa, homa, ujamuisho). Ya kwanza ni amoxicillin au doxycycline; co-amoxiclav kwa kushindwa kwa matibabu au sababu za hatari. Epuka antibiotic za wigo mpana za kibahati — huongeza upinzani bila kubadilisha matokeo katika milipuko inayotokana na virusi. Pima tena katika masaa 48-72; ikiwa haiboresheki, kizingiti cha chini cha kulazwa.',
      sw_mtaa: 'Step up short-acting bronchodilators: salbutamol 2-4 puffs via spacer kila masaa 4 (au nebuliser ikiwa inapatikana na inavumiliwa), plus ipratropium pale inapopatikana. Anza oral prednisolone 30-40 mg once daily kwa siku 5 — hakuna taper inahitajika kwa short courses. Antibiotics SI automatic katika kila exacerbation. Zinareserved kwa wagonjwa wenye angalau two of: increased breathlessness, increased sputum volume, na increased sputum purulence; AU single sign plus signs ya bacterial infection (raised CRP, fever, consolidation). First-line ni amoxicillin au doxycycline; co-amoxiclav kwa treatment failure au risk factors. Epuka empirical broad-spectrum antibiotics — zinafuel resistance bila kubadilisha outcomes katika viral-driven exacerbations. Recheck katika 48-72 hours; ikiwa haiboresheki, lower threshold kwa admission.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Breathlessness worsening despite stepped-up bronchodilators and prednisolone — admit',
          sw: 'Kushindwa kupumua kunazidi licha ya kuongezwa kwa bronchodilator na prednisolone — laze',
          sw_mtaa: 'Breathlessness inazidi despite stepped-up bronchodilators na prednisolone — admit',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'SpO2 dropping below 88% on room air during the exacerbation — admit',
          sw: 'SpO2 inashuka chini ya 88% kwa hewa ya kawaida wakati wa mlipuko — laze',
          sw_mtaa: 'SpO2 inashuka chini ya 88% on room air wakati wa exacerbation — admit',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Confusion, drowsiness, new headache — possible CO2 retention',
          sw: 'Mkanganyiko, usingizi, maumivu mapya ya kichwa — uwezekano wa mkusanyiko wa CO2',
          sw_mtaa: 'Confusion, drowsiness, new headache — possible CO2 retention',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Clinical review at 48-72 hours then at 1-2 weeks. Review inhaler technique; consider stepping up the maintenance regimen if this was the second exacerbation in 12 months.',
      sw: 'Mapitio ya kliniki katika masaa 48-72 kisha katika wiki 1-2. Pitia mbinu ya inhaler; fikiria kupanda regimen ya matengenezo ikiwa huu ulikuwa mlipuko wa pili katika miezi 12.',
      sw_mtaa: 'Clinical review katika masaa 48-72 kisha katika wiki 1-2. Review inhaler technique; consider stepping up maintenance regimen ikiwa huu ulikuwa second exacerbation katika miezi 12.',
    },
    sources: [src('GOLD_COPD_2025'), src('WHO_AMR_2023'), src('NTLG_STG_2023')],
  },

  // ────────────────────────────────────────────────────────────────
  // AECOPD SEVERE — NEEDS ADMISSION
  // ────────────────────────────────────────────────────────────────
  {
    id: 'aecopd_severe',
    severity: 'critical',
    population: 'adult',
    label: {
      en: 'Severe Acute Exacerbation of COPD — needs admission',
      sw: 'Mlipuko Mkali Wa Papo Hapo Wa COPD — anahitaji kulazwa',
    },
    presentation: {
      en: 'A patient with known (or newly recognised) COPD presenting in respiratory distress: marked breathlessness at rest, unable to speak in full sentences, sometimes confused or drowsy. Tachypnoea (RR > 25/min), use of accessory muscles, intercostal indrawing, sometimes cyanosis. SpO2 < 88% on room air or, in known COPD, > 4% below baseline. May have signs of right-heart strain — raised JVP, ankle oedema. Some present with hypercapnic respiratory failure (CO2 retention): drowsy, flapping tremor (asterixis), bounding pulse, warm peripheries. This is a true respiratory emergency and management is time-critical — but it is also where the wrong oxygen prescription does the most harm.',
      sw: 'Mgonjwa mwenye COPD inayojulikana (au inayotambuliwa kwa mara ya kwanza) anayewasilisha katika mfadhaiko wa kupumua: kushindwa kupumua kwa kasi wakati wa kupumzika, hashindwi kuzungumza katika sentensi kamili, wakati mwingine amechanganyikiwa au usingizi. Tachypnoea (RR > 25/min), matumizi ya misuli ya msaidizi, kuingia kwa intercostal, wakati mwingine cyanosis. SpO2 < 88% kwa hewa ya kawaida au, katika COPD inayojulikana, > 4% chini ya baseline. Anaweza kuwa na dalili za mfadhaiko wa moyo wa kulia — JVP iliyoinuliwa, uvimbe wa kifundo. Wengine huwasilisha na kushindwa kupumua kwa hypercapnic (mkusanyiko wa CO2): usingizi, asterixis, mapigo ya kichwa, viungo vya joto. Hii ni dharura halisi ya kupumua na usimamizi ni wa wakati wa hatari — lakini pia ndipo agizo lisilo sahihi la oksijeni hufanya madhara makubwa zaidi.',
      sw_mtaa: 'Patient mwenye known (au newly recognised) COPD anayepresent katika respiratory distress: marked breathlessness at rest, unable to speak in full sentences, wakati mwingine confused au drowsy. Tachypnoea (RR > 25/min), use ya accessory muscles, intercostal indrawing, wakati mwingine cyanosis. SpO2 < 88% on room air au, katika known COPD, > 4% chini ya baseline. Anaweza kuwa na signs za right-heart strain — raised JVP, ankle oedema. Wengine wanapresent na hypercapnic respiratory failure (CO2 retention): drowsy, flapping tremor (asterixis), bounding pulse, warm peripheries. Hii ni true respiratory emergency na management ni time-critical — lakini pia ndipo wrong oxygen prescription inafanya most harm.',
    },
    recognitionSigns: [
      {
        en: 'Unable to complete a sentence in one breath; RR > 25/min',
        sw: 'Hawezi kumaliza sentensi katika pumzi moja; RR > 25/min',
        sw_mtaa: 'Unable to complete sentence in one breath; RR > 25/min',
      },
      {
        en: 'Use of accessory respiratory muscles, intercostal indrawing, paradoxical chest/abdominal motion',
        sw: 'Matumizi ya misuli ya msaidizi ya kupumua, kuingia kwa intercostal, mwendo wa paradox wa kifua/tumbo',
        sw_mtaa: 'Use ya accessory respiratory muscles, intercostal indrawing, paradoxical chest/abdominal motion',
      },
      {
        en: 'SpO2 < 88% on room air, or > 4% below baseline in known COPD',
        sw: 'SpO2 < 88% kwa hewa ya kawaida, au > 4% chini ya baseline katika COPD inayojulikana',
        sw_mtaa: 'SpO2 < 88% on room air, au > 4% chini ya baseline katika known COPD',
      },
      {
        en: 'Drowsiness, confusion, asterixis (flapping tremor), bounding pulse — signs of CO2 retention',
        sw: 'Usingizi, mkanganyiko, asterixis (flapping tremor), mapigo ya kichwa — ishara za mkusanyiko wa CO2',
        sw_mtaa: 'Drowsiness, confusion, asterixis (flapping tremor), bounding pulse — signs za CO2 retention',
      },
      {
        en: 'Cyanosis, peripheral oedema, raised JVP — signs of severe disease and right-heart strain',
        sw: 'Cyanosis, uvimbe wa pembeni, JVP iliyoinuliwa — ishara za ugonjwa mkali na mfadhaiko wa moyo wa kulia',
        sw_mtaa: 'Cyanosis, peripheral oedema, raised JVP — signs za severe disease na right-heart strain',
      },
    ],
    treatmentJourney: {
      en: 'Admit. Controlled oxygen is essential: start with low-flow oxygen via Venturi mask (24-28%) or nasal cannulae at 1-2 L/min, titrated to SpO2 target 88-92% — NOT 95+. Recheck arterial blood gases (or venous if ABG unavailable) early to detect CO2 retention. Nebulised bronchodilators: salbutamol 5 mg + ipratropium 500 micrograms, repeat as needed. IV hydrocortisone 100 mg or oral prednisolone 40 mg. Antibiotics if features of bacterial infection (amoxicillin, doxycycline, or co-amoxiclav by local protocol). Non-invasive ventilation (NIV / BiPAP) is the intervention with the strongest mortality benefit in hypercapnic respiratory failure and should be started early where available rather than waiting for intubation. If NIV not available and the patient deteriorates, refer up. Treat triggers: infection, fluid overload, sedation, pneumothorax. VTE prophylaxis. Cross-reference heart failure and pneumonia where relevant.',
      sw: 'Laze. Oksijeni iliyorekebishwa ni muhimu: anza na oksijeni ya mtiririko wa chini kupitia Venturi mask (24-28%) au nasal cannulae kwa 1-2 L/min, ikirekebishwa hadi lengo la SpO2 88-92% — SIO 95+. Pima tena gesi za damu ya ateri (au venous ikiwa ABG haipatikani) mapema ili kugundua mkusanyiko wa CO2. Bronchodilator za nebuliser: salbutamol 5 mg + ipratropium 500 micrograms, rudia inavyohitajika. IV hydrocortisone 100 mg au prednisolone ya kumeza 40 mg. Antibiotic ikiwa kuna sifa za maambukizi ya bakteria (amoxicillin, doxycycline, au co-amoxiclav kulingana na itifaki ya ndani). Non-invasive ventilation (NIV / BiPAP) ni hatua yenye faida kubwa zaidi ya vifo katika kushindwa kupumua kwa hypercapnic na inapaswa kuanza mapema pale inapopatikana badala ya kusubiri intubation. Ikiwa NIV haipatikani na mgonjwa anashuka, mtume juu. Tibu vichocheo: maambukizi, ujazo wa maji, sedation, pneumothorax. Kinga ya VTE. Rejea kushindwa kwa moyo na nimonia pale ni muhimu.',
      sw_mtaa: 'Admit. Controlled oxygen ni essential: anza na low-flow oxygen via Venturi mask (24-28%) au nasal cannulae kwa 1-2 L/min, titrated to SpO2 target 88-92% — SIO 95+. Recheck arterial blood gases (au venous ikiwa ABG haipatikani) early kudetect CO2 retention. Nebulised bronchodilators: salbutamol 5 mg + ipratropium 500 micrograms, repeat as needed. IV hydrocortisone 100 mg au oral prednisolone 40 mg. Antibiotics ikiwa features za bacterial infection (amoxicillin, doxycycline, au co-amoxiclav kulingana na local protocol). Non-invasive ventilation (NIV / BiPAP) ni intervention yenye strongest mortality benefit katika hypercapnic respiratory failure na inapaswa kuanza early pale inapopatikana badala ya kusubiri intubation. Ikiwa NIV haipatikani na patient anadeterriorate, refer up. Treat triggers: infection, fluid overload, sedation, pneumothorax. VTE prophylaxis. Cross-reference heart failure na pneumonia pale ni relevant.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'GCS dropping, increased drowsiness, rising CO2 on blood gas — consider intubation if NIV failing',
          sw: 'GCS inashuka, usingizi unaongezeka, CO2 inapanda kwenye blood gas — fikiria intubation ikiwa NIV inashindwa',
          sw_mtaa: 'GCS inashuka, increased drowsiness, rising CO2 kwenye blood gas — consider intubation ikiwa NIV inashindwa',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Sudden one-sided chest pain or marked deterioration — exclude pneumothorax with urgent chest X-ray',
          sw: 'Maumivu ya ghafla ya kifua upande mmoja au kushuka kwa kasi — toa pneumothorax kwa X-ray ya kifua ya haraka',
          sw_mtaa: 'Sudden one-sided chest pain au marked deterioration — exclude pneumothorax na urgent chest X-ray',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Inpatient daily review; discharge only when SpO2 stable on baseline therapy, mobilising at near-baseline, eating/drinking, sleep tolerable. Discharge bundle: inhaler technique check, written action plan, smoking cessation support, vaccinations updated, GP/clinic review within 1-2 weeks, pulmonary rehab referral if not already enrolled.',
      sw: 'Mapitio ya kila siku ya wagonjwa wa kulazwa; ruhusu tu wakati SpO2 ni thabiti kwenye tiba ya baseline, anasonga karibu na baseline, anakula/anakunywa, usingizi unavumilika. Bundle la kuondoka: ukaguzi wa mbinu ya inhaler, mpango ulioandikwa wa hatua, msaada wa kuacha kuvuta sigara, chanjo zimesasishwa, mapitio ya GP/kliniki ndani ya wiki 1-2, rufaa ya pulmonary rehab ikiwa hajaandikishwa tayari.',
      sw_mtaa: 'Inpatient daily review; discharge only wakati SpO2 ni stable on baseline therapy, mobilising near-baseline, anakula/anakunywa, sleep tolerable. Discharge bundle: inhaler technique check, written action plan, smoking cessation support, vaccinations updated, GP/clinic review ndani ya wiki 1-2, pulmonary rehab referral ikiwa hajaenrolled already.',
    },
    sources: [src('GOLD_COPD_2025'), src('WHO_OXYGEN_2023'), src('WHO_AMR_2023'), src('NTLG_STG_2023')],
  },

  // ────────────────────────────────────────────────────────────────
  // COR PULMONALE / PULMONARY HYPERTENSION FROM COPD
  // ────────────────────────────────────────────────────────────────
  {
    id: 'cor_pulmonale_copd',
    severity: 'severe',
    population: 'adult',
    label: {
      en: 'Cor Pulmonale — right-heart strain from chronic lung disease',
      sw: 'Cor Pulmonale — mfadhaiko wa moyo wa kulia kutoka ugonjwa sugu wa mapafu',
    },
    presentation: {
      en: 'A patient with advanced COPD (or other chronic hypoxic lung disease) who now has signs of right-heart failure: ankle and pretibial oedema, raised jugular venous pressure (JVP), hepatomegaly with tender liver edge, sometimes ascites, and a loud pulmonary second heart sound (P2). The mechanism is chronic alveolar hypoxia → pulmonary vasoconstriction → pulmonary hypertension → right ventricular pressure overload → right-heart failure. Often confused with biventricular heart failure, but the trigger here is the lung, not the left ventricle. ECG may show right axis deviation, P pulmonale, right ventricular hypertrophy. Echocardiogram confirms.',
      sw: 'Mgonjwa mwenye COPD ya hali ya juu (au ugonjwa mwingine sugu wa mapafu wa hypoxic) ambaye sasa ana dalili za kushindwa kwa moyo wa kulia: uvimbe wa kifundo na wa pretibial, shinikizo la jugular venous (JVP) lililoinuliwa, hepatomegaly na ukingo wa ini uchungu, wakati mwingine ascites, na sauti ya pili ya moyo ya mapafu (P2) kubwa. Mfumo ni hypoxia sugu ya alveolar → vasoconstriction ya mapafu → shinikizo la juu la mapafu → kuongezeka kwa shinikizo la ventrikoli ya kulia → kushindwa kwa moyo wa kulia. Mara nyingi huchanganywa na kushindwa kwa moyo kwa pande zote, lakini kichocheo hapa ni mapafu, sio ventrikoli ya kushoto. ECG inaweza kuonyesha right axis deviation, P pulmonale, right ventricular hypertrophy. Echocardiogram inathibitisha.',
      sw_mtaa: 'Patient mwenye advanced COPD (au other chronic hypoxic lung disease) ambaye sasa ana signs za right-heart failure: ankle na pretibial oedema, raised jugular venous pressure (JVP), hepatomegaly na tender liver edge, wakati mwingine ascites, na loud pulmonary second heart sound (P2). Mechanism ni chronic alveolar hypoxia → pulmonary vasoconstriction → pulmonary hypertension → right ventricular pressure overload → right-heart failure. Mara nyingi inachanganywa na biventricular heart failure, lakini trigger hapa ni lung, sio left ventricle. ECG inaweza kuonyesha right axis deviation, P pulmonale, right ventricular hypertrophy. Echocardiogram inaconfirm.',
    },
    recognitionSigns: [
      {
        en: 'Bilateral pitting ankle oedema in a patient with advanced COPD',
        sw: 'Uvimbe wa pande zote wa pitting wa kifundo kwa mgonjwa mwenye COPD ya hali ya juu',
        sw_mtaa: 'Bilateral pitting ankle oedema kwa patient mwenye advanced COPD',
      },
      {
        en: 'Raised JVP — a key bedside finding that distinguishes cor pulmonale from local leg-vein causes',
        sw: 'JVP iliyoinuliwa — kupatikana muhimu kitandani kunakotofautisha cor pulmonale na sababu za ndani za mishipa ya mguu',
        sw_mtaa: 'Raised JVP — key bedside finding inayodistinguish cor pulmonale na local leg-vein causes',
      },
      {
        en: 'Loud P2 (second pulmonary heart sound), parasternal heave',
        sw: 'P2 kubwa (sauti ya pili ya moyo ya mapafu), parasternal heave',
        sw_mtaa: 'Loud P2 (second pulmonary heart sound), parasternal heave',
      },
      {
        en: 'Hepatomegaly with tender liver, sometimes hepatojugular reflux',
        sw: 'Hepatomegaly na ini uchungu, wakati mwingine hepatojugular reflux',
        sw_mtaa: 'Hepatomegaly na tender liver, wakati mwingine hepatojugular reflux',
      },
      {
        en: 'Echocardiogram: right ventricular dilation/hypertrophy, raised PASP, often preserved left ventricular function',
        sw: 'Echocardiogram: kuongezeka kwa ventrikoli ya kulia/hypertrophy, PASP iliyoinuliwa, mara nyingi utendaji wa ventrikoli ya kushoto umehifadhiwa',
        sw_mtaa: 'Echocardiogram: right ventricular dilation/hypertrophy, raised PASP, mara nyingi preserved left ventricular function',
      },
    ],
    treatmentJourney: {
      en: 'The treatment of cor pulmonale is the treatment of the underlying lung disease — correcting the chronic hypoxia is the only thing that meaningfully reverses pulmonary vasoconstriction. Long-term oxygen therapy (LTOT) at home for ≥ 15 hours per day is the single most important intervention if resting SpO2 ≤ 88% — it reduces pulmonary artery pressure, reduces oedema, extends life. Optimise COPD treatment (LABA+LAMA ± ICS). Diuretics (furosemide low dose) help with peripheral oedema but should be used cautiously — over-diuresis reduces preload to a stiff right ventricle and can drop cardiac output. There is no role for ACE inhibitors, beta-blockers, or pulmonary-hypertension-specific vasodilators (sildenafil, bosentan) in routine COPD cor pulmonale outside specialist care — they can worsen V/Q mismatch and drop oxygen. Treat any reversible contributor: sleep apnoea, anaemia, ongoing smoke exposure.',
      sw: 'Tiba ya cor pulmonale ni tiba ya ugonjwa wa msingi wa mapafu — kurekebisha hypoxia sugu ndio jambo pekee linalorudisha kwa maana vasoconstriction ya mapafu. Tiba ya oksijeni ya muda mrefu (LTOT) nyumbani kwa ≥ saa 15 kwa siku ni hatua muhimu zaidi peke yake ikiwa SpO2 ya kupumzika ≤ 88% — hupunguza shinikizo la ateri ya mapafu, hupunguza uvimbe, huongeza maisha. Boresha matibabu ya COPD (LABA+LAMA ± ICS). Diuretics (furosemide dose ya chini) husaidia na uvimbe wa pembeni lakini zinapaswa kutumika kwa uangalifu — diuresis kupita kiasi hupunguza preload kwa ventrikoli ya kulia ngumu na inaweza kushusha cardiac output. Hakuna jukumu kwa ACE inhibitor, beta-blocker, au pulmonary-hypertension-specific vasodilator (sildenafil, bosentan) katika cor pulmonale ya COPD ya kawaida nje ya huduma ya mtaalam — zinaweza kuzidisha V/Q mismatch na kushusha oksijeni. Tibu mchangiaji yeyote unayoweza kurekebisha: sleep apnoea, anaemia, mfiduo wa moshi unaoendelea.',
      sw_mtaa: 'Treatment ya cor pulmonale ni treatment ya underlying lung disease — kucorrecting chronic hypoxia ndio only thing inayomeaningfully reverse pulmonary vasoconstriction. Long-term oxygen therapy (LTOT) nyumbani kwa ≥ saa 15 per day ni single most important intervention ikiwa resting SpO2 ≤ 88% — inareduce pulmonary artery pressure, inareduce oedema, inaextend life. Optimise COPD treatment (LABA+LAMA ± ICS). Diuretics (furosemide low dose) zinasaidia na peripheral oedema lakini zinapaswa kutumika cautiously — over-diuresis inareduce preload kwa stiff right ventricle na inaweza kudrop cardiac output. Hakuna role kwa ACE inhibitors, beta-blockers, au pulmonary-hypertension-specific vasodilators (sildenafil, bosentan) katika routine COPD cor pulmonale outside specialist care — zinaweza kuworsen V/Q mismatch na kudrop oxygen. Treat reversible contributor yoyote: sleep apnoea, anaemia, ongoing smoke exposure.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Rapid weight gain, worsening oedema, breathlessness at rest — decompensation, urgent review',
          sw: 'Kuongezeka uzito kwa haraka, uvimbe unaozidi, kushindwa kupumua wakati wa kupumzika — decompensation, mapitio ya haraka',
          sw_mtaa: 'Rapid weight gain, worsening oedema, breathlessness at rest — decompensation, urgent review',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Syncope on exertion — possible severe pulmonary hypertension, urgent specialist referral',
          sw: 'Kuzimia kwa juhudi — uwezekano wa shinikizo la juu la mapafu kali, rufaa ya haraka ya mtaalam',
          sw_mtaa: 'Syncope on exertion — possible severe pulmonary hypertension, urgent specialist referral',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Monthly review during stabilisation, then 3-monthly. Annual echocardiogram. Continuous oximetry check at every visit. Coordinate with the patient\'s respiratory and cardiology services where available.',
      sw: 'Mapitio ya kila mwezi wakati wa kuthibitisha, kisha kila miezi 3. Echocardiogram ya kila mwaka. Ukaguzi wa oximetry unaoendelea katika kila ziara. Ratibu na huduma za kupumua na cardiology za mgonjwa pale zinapopatikana.',
      sw_mtaa: 'Monthly review wakati wa stabilisation, kisha 3-monthly. Annual echocardiogram. Continuous oximetry check katika kila visit. Coordinate na patient\'s respiratory na cardiology services pale zinapopatikana.',
    },
    sources: [src('GOLD_COPD_2025'), src('WHO_OXYGEN_2023'), src('NTLG_STG_2023')],
  },

  // ────────────────────────────────────────────────────────────────
  // POST-TB OBSTRUCTIVE LUNG DISEASE — TANZANIAN PHENOTYPE X
  // ────────────────────────────────────────────────────────────────
  {
    id: 'post_tb_obstructive_lung_disease',
    severity: 'complicated',
    population: 'adult',
    label: {
      en: 'Post-TB Obstructive Lung Disease (PTLD)',
      sw: 'Ugonjwa Wa Mapafu Wa Kuziba Baada Ya TB (PTLD)',
    },
    presentation: {
      en: 'A non-smoker (or modest smoker) — typically aged 25-45 — with a clear history of previously treated pulmonary tuberculosis, often years before, who now has chronic cough, breathlessness, and recurrent chest infections that behave like COPD but the cause is structural damage left after TB. Sputum culture is repeatedly negative for Mycobacterium tuberculosis (this is not active TB). Chest X-ray shows old TB sequelae: upper-zone fibrosis, cavitation, bronchiectasis, sometimes calcified granulomata. Spirometry shows obstruction (FEV1/FVC < 0.7) or mixed obstructive/restrictive pattern. The patient is frequently labelled as "weak lungs" or "old TB" in lay terms and never gets a structured COPD-style management plan — that is the gap PTLD recognition closes.',
      sw: 'Mtu asiyevuta sigara (au mvuta wa wastani) — kawaida wa miaka 25-45 — mwenye historia wazi ya kifua kikuu cha mapafu kilichotibika hapo awali, mara nyingi miaka iliyopita, ambaye sasa ana kikohozi sugu, kushindwa kupumua, na maambukizi ya kifua ya mara kwa mara yanayotenda kama COPD lakini sababu ni uharibifu wa muundo uliobaki baada ya TB. Sputum culture ni negative mara kwa mara kwa Mycobacterium tuberculosis (huu sio TB hai). X-ray ya kifua inaonyesha sequelae ya zamani ya TB: fibrosis ya kanda ya juu, cavitation, bronchiectasis, wakati mwingine granulomata yaliyokalsifikwa. Spirometry inaonyesha obstruction (FEV1/FVC < 0.7) au mchanganyiko wa obstructive/restrictive. Mgonjwa mara nyingi anaitwa "mapafu dhaifu" au "TB ya zamani" kwa lugha ya kawaida na haipati mpango wa usimamizi wa mtindo wa COPD — hiyo ndiyo pengo ambayo utambuzi wa PTLD unafunga.',
      sw_mtaa: 'Non-smoker (au modest smoker) — typically aged 25-45 — mwenye clear history ya previously treated pulmonary tuberculosis, mara nyingi miaka before, ambaye sasa ana chronic cough, breathlessness, na recurrent chest infections zinazotenda kama COPD lakini cause ni structural damage iliyobaki baada ya TB. Sputum culture ni repeatedly negative kwa Mycobacterium tuberculosis (huu sio active TB). Chest X-ray inaonyesha old TB sequelae: upper-zone fibrosis, cavitation, bronchiectasis, wakati mwingine calcified granulomata. Spirometry inaonyesha obstruction (FEV1/FVC < 0.7) au mixed obstructive/restrictive pattern. Patient mara nyingi analabelled kama "weak lungs" au "old TB" kwa lay terms na hapati structured COPD-style management plan — hiyo ndiyo gap PTLD recognition inafunga.',
    },
    recognitionSigns: [
      {
        en: 'Clear documented or self-reported history of previous TB treatment (typically completed at least 1 year ago)',
        sw: 'Historia wazi iliyoandikwa au iliyojiripotiwa ya matibabu ya awali ya TB (kawaida ilimalizika angalau mwaka 1 uliopita)',
        sw_mtaa: 'Clear documented au self-reported history ya previous TB treatment (typically completed angalau mwaka 1 ago)',
      },
      {
        en: 'Chronic cough, breathlessness, recurrent chest infections — but sputum repeatedly negative for AFB and Xpert',
        sw: 'Kikohozi sugu, kushindwa kupumua, maambukizi ya kifua ya mara kwa mara — lakini sputum negative mara kwa mara kwa AFB na Xpert',
        sw_mtaa: 'Chronic cough, breathlessness, recurrent chest infections — lakini sputum repeatedly negative kwa AFB na Xpert',
      },
      {
        en: 'CXR with upper-zone fibrosis, cavities, bronchiectasis, or calcified granulomata — old TB pattern',
        sw: 'CXR yenye fibrosis ya kanda ya juu, mashimo, bronchiectasis, au granulomata yaliyokalsifikwa — muundo wa zamani wa TB',
        sw_mtaa: 'CXR yenye upper-zone fibrosis, cavities, bronchiectasis, au calcified granulomata — old TB pattern',
      },
      {
        en: 'Spirometry shows obstruction (FEV1/FVC < 0.7) or mixed pattern',
        sw: 'Spirometry inaonyesha obstruction (FEV1/FVC < 0.7) au mchanganyiko',
        sw_mtaa: 'Spirometry inaonyesha obstruction (FEV1/FVC < 0.7) au mixed pattern',
      },
      {
        en: 'Often no significant smoking history — sets PTLD apart from classical smoking-COPD',
        sw: 'Mara nyingi hakuna historia muhimu ya kuvuta sigara — kuiweka PTLD mbali na classical smoking-COPD',
        sw_mtaa: 'Mara nyingi hakuna significant smoking history — inaweka PTLD apart na classical smoking-COPD',
      },
    ],
    treatmentJourney: {
      en: 'First step is always to exclude active TB recurrence with sputum smear, Xpert MTB/RIF, and CXR — never assume the cough is "just PTLD" when it could be reactivation. Once active TB is excluded, treat PTLD with the same framework as COPD: long-acting bronchodilator (LAMA or LABA), step up to LABA+LAMA if symptoms persist, inhaled steroid only for frequent exacerbations or asthma-overlap features. Pulmonary rehabilitation is high-yield. Aggressive treatment of any bacterial chest infection (bronchiectasis predisposes). Vaccinate: annual influenza, pneumococcal. Screen for HIV — PTLD patients are an enriched population for HIV co-infection. Treat depression and anxiety as in COPD. Long-term oxygen therapy if chronic resting SpO2 ≤ 88%. Some PTLD patients with severe bronchiectasis benefit from chest physiotherapy and airway clearance techniques — refer where available.',
      sw: 'Hatua ya kwanza daima ni kutoa kurudia kwa TB hai kwa sputum smear, Xpert MTB/RIF, na CXR — kamwe usidhani kikohozi ni "PTLD tu" wakati kinaweza kuwa reactivation. Pindi TB hai imetolewa, tibu PTLD kwa mfumo huo huo kama COPD: bronchodilator ya muda mrefu (LAMA au LABA), panda hadi LABA+LAMA ikiwa dalili zinaendelea, inhaled steroid tu kwa milipuko ya mara kwa mara au sifa za asthma-overlap. Ukarabati wa mapafu una mavuno makubwa. Matibabu makali ya maambukizi yoyote ya kifua ya bakteria (bronchiectasis huongeza uwezekano). Chanja: influenza ya kila mwaka, pneumococcal. Uchunguzi wa VVU — wagonjwa wa PTLD ni idadi iliyoongezeka kwa maambukizi ya VVU. Tibu unyong\'onyevu na wasiwasi kama katika COPD. Tiba ya oksijeni ya muda mrefu ikiwa SpO2 sugu ya kupumzika ≤ 88%. Wagonjwa wengine wa PTLD wenye bronchiectasis kali wanafaidika na chest physiotherapy na mbinu za usafishaji wa njia ya hewa — rejea pale inapopatikana.',
      sw_mtaa: 'First step daima ni kuexclude active TB recurrence na sputum smear, Xpert MTB/RIF, na CXR — never assume cough ni "PTLD tu" wakati inaweza kuwa reactivation. Once active TB imeexcluded, treat PTLD kwa same framework kama COPD: long-acting bronchodilator (LAMA au LABA), step up to LABA+LAMA ikiwa symptoms zinapersist, inhaled steroid tu kwa frequent exacerbations au asthma-overlap features. Pulmonary rehabilitation ni high-yield. Aggressive treatment ya bacterial chest infection yoyote (bronchiectasis inapredispose). Vaccinate: annual influenza, pneumococcal. Screen for HIV — PTLD patients ni enriched population kwa HIV co-infection. Treat depression na anxiety kama katika COPD. Long-term oxygen therapy ikiwa chronic resting SpO2 ≤ 88%. Wagonjwa wengine wa PTLD wenye severe bronchiectasis wanabenefit kutoka chest physiotherapy na airway clearance techniques — refer pale inapopatikana.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'New haemoptysis, weight loss, night sweats, or symptom recurrence — always reassess for active TB or new diagnosis',
          sw: 'Haemoptysis mpya, kupungua uzito, jasho la usiku, au kurudia kwa dalili — daima tathmini tena kwa TB hai au utambuzi mpya',
          sw_mtaa: 'New haemoptysis, weight loss, night sweats, au symptom recurrence — daima reassess kwa active TB au new diagnosis',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Massive haemoptysis (> 200 mL in 24 hours) — bronchiectasis can bleed; this is a true emergency',
          sw: 'Haemoptysis kubwa (> 200 mL katika masaa 24) — bronchiectasis inaweza kutoa damu; hii ni dharura halisi',
          sw_mtaa: 'Massive haemoptysis (> 200 mL katika masaa 24) — bronchiectasis inaweza kutoa damu; hii ni true emergency',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Quarterly clinical review; CXR if symptoms change; spirometry annually. Maintain a low threshold for TB testing at any recrudescence. Coordinate with the TB clinic so the patient\'s respiratory disability is recognised as PTLD rather than "treatment failure."',
      sw: 'Mapitio ya kliniki ya robo; CXR ikiwa dalili zinabadilika; spirometry ya kila mwaka. Dumisha kizingiti cha chini cha upimaji wa TB katika recrudescence yoyote. Ratibu na kliniki ya TB ili ulemavu wa kupumua wa mgonjwa utambuliwe kama PTLD badala ya "kushindwa kwa matibabu."',
      sw_mtaa: 'Quarterly clinical review; CXR ikiwa symptoms zinabadilika; spirometry annually. Maintain low threshold kwa TB testing katika recrudescence yoyote. Coordinate na TB clinic ili patient\'s respiratory disability irecognised kama PTLD badala ya "treatment failure."',
    },
    sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('GOLD_COPD_2025'), src('NTLG_STG_2023')],
  },
];
