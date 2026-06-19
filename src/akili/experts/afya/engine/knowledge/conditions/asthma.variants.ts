/**
 * Asthma — Variants (Phase 9)
 *
 * Seven variants representing the highest-impact patterns of asthma in
 * Tanzania, aligned to GINA 2024 stepwise framework and IMCI pediatric care:
 *   • mild_persistent (Step 1-2: as-needed ICS-formoterol or low-dose
 *     daily ICS; symptoms < twice/week, no nocturnal waking)
 *   • moderate_persistent (Step 3-4: regular ICS + LABA combination,
 *     daily symptoms or weekly nocturnal waking)
 *   • severe_persistent (Step 5: high-dose ICS-LABA + add-on; daily
 *     limitation, frequent exacerbations, specialist territory)
 *   • acute_exacerbation (the bread-and-butter clinic presentation —
 *     SABA, oral steroid, oxygen if SpO2 < 92%, reassess at 1 hour)
 *   • life_threatening_asthma (silent chest, exhaustion, cyanosis,
 *     SpO2 < 90%, drowsiness — ICU territory, IM adrenaline can be
 *     life-saving en route)
 *   • pediatric_asthma (IMCI framing, spacer-with-mask, age-banded
 *     RR thresholds, parental education focus)
 *   • exercise_induced (pre-treatment with SABA 10-15 minutes before
 *     activity; underlying control is the real issue)
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const ASTHMA_VARIANTS: ConditionVariant[] = [
  // ──────────────────────────────────────────────────────────────────────
  // MILD PERSISTENT ASTHMA — GINA Step 1-2
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'mild_persistent_asthma',
    severity: 'uncomplicated',
    population: 'adult',
    label: {
      en: 'Mild Persistent Asthma — GINA Step 1-2',
      sw: 'Pumu Ndogo ya Kudumu — Hatua 1-2 ya GINA',
    },
    presentation: {
      en: 'A patient with symptoms (cough, wheeze, mild breathlessness) less than twice a week, no waking at night, no limitation of normal activity, normal lung function between episodes, and reliever use less than twice a week. Many patients in this category have been managed with "salbutamol-only" for years, which is no longer recommended by GINA — even mild asthma is now treated with an inhaled corticosteroid (ICS), either as as-needed ICS-formoterol or as low-dose daily ICS, because the underlying inflammation is present even when the patient feels well. This is the population most likely to be lost to follow-up and most likely to have a severe attack.',
      sw: 'Mgonjwa mwenye dalili (kikohozi, wheeze, kushindwa kupumua kidogo) chini ya mara mbili kwa wiki, hakuamki usiku, hakuna kikomo cha shughuli za kawaida, utendaji wa mapafu wa kawaida kati ya vipindi, na matumizi ya reliever chini ya mara mbili kwa wiki. Wagonjwa wengi katika kategoria hii wamesimamiwa na "salbutamol-pekee" kwa miaka, ambayo sasa haipendekezwi tena na GINA — hata pumu ndogo sasa hutibiwa kwa inhaled corticosteroid (ICS), ama kama ICS-formoterol inapohitajika au kama ICS ya kila siku ya dose ndogo, kwa sababu uvimbe wa msingi upo hata mgonjwa anapojihisi vizuri. Hii ni idadi inayowezekana zaidi kupotea kwa ufuatiliaji na inayowezekana zaidi kupata shambulizi kali.',
      sw_mtaa: 'Patient na symptoms (cough, wheeze, mild breathlessness) chini ya mara mbili kwa wiki, hawaamki usiku, hakuna limitation ya normal activity, normal lung function between episodes, na reliever use chini ya mara mbili kwa wiki. Wagonjwa wengi katika category hii wamesimamiwa na "salbutamol-only" kwa miaka, ambayo sasa hairecommendi tena na GINA — hata mild asthma sasa inatibiwa na inhaled corticosteroid (ICS), ama kama as-needed ICS-formoterol au kama low-dose daily ICS, kwa sababu underlying inflammation iko hata patient anapojihisi vizuri. Hii ni population most likely ku-lost kwa follow-up na most likely kupata severe attack.',
    },
    recognitionSigns: [
      {
        en: 'Symptoms of cough, wheeze, or chest tightness less than twice a week',
        sw: 'Dalili za kikohozi, wheeze, au kifua kubana chini ya mara mbili kwa wiki',
        sw_mtaa: 'Symptoms za cough, wheeze, au chest tightness chini ya mara mbili kwa wiki',
      },
      {
        en: 'No waking at night from asthma',
        sw: 'Hakuna kuamka usiku kutokana na pumu',
        sw_mtaa: 'Hakuna kuamka usiku kutokana na asthma',
      },
      {
        en: 'No interference with school, work, or play',
        sw: 'Hakuna mkanganyiko na shule, kazi, au mchezo',
        sw_mtaa: 'Hakuna interference na shule, kazi, au play',
      },
      {
        en: 'Lung function (peak flow, FEV1) normal between episodes',
        sw: 'Utendaji wa mapafu (peak flow, FEV1) wa kawaida kati ya vipindi',
        sw_mtaa: 'Lung function (peak flow, FEV1) normal between episodes',
      },
    ],
    treatmentJourney: {
      en: 'Modern GINA guidance treats even mild asthma with inhaled corticosteroid — the era of "salbutamol-only" is over. Two acceptable approaches: (1) as-needed low-dose budesonide-formoterol (an ICS combined with a fast-acting LABA in one inhaler) — taken only when symptoms break through, but every dose delivers both reliever and anti-inflammatory action; or (2) low-dose ICS (beclomethasone or budesonide) every day, with separate salbutamol as reliever. Either approach must include education on technique (spacer, mouth rinse), trigger awareness, and a written action plan. Review at 3 months — if control is good for at least 3 months, the clinician may consider stepping down. The patient must understand: feeling well does not mean cured.',
      sw: 'Mwongozo wa kisasa wa GINA hutibu hata pumu ndogo kwa inhaled corticosteroid — enzi ya "salbutamol-pekee" imeisha. Mbinu mbili zinazokubalika: (1) as-needed dose ndogo ya budesonide-formoterol (ICS pamoja na LABA inayofanya kazi haraka katika inhaler moja) — inachukuliwa tu wakati dalili zinapotokea, lakini kila dose hutoa reliever na hatua ya kupinga uvimbe; au (2) ICS ya dose ndogo (beclomethasone au budesonide) kila siku, na salbutamol tofauti kama reliever. Mbinu yoyote lazima ijumuishe elimu juu ya mbinu (spacer, suuza kinywa), ufahamu wa vichocheo, na mpango ulioandikwa wa kitendo. Mapitio katika miezi 3 — ikiwa udhibiti uko mzuri kwa angalau miezi 3, daktari anaweza kufikiria kushuka. Mgonjwa lazima aelewe: kujihisi vizuri haimaanishi kutibika.',
      sw_mtaa: 'Modern GINA guidance inatreat hata mild asthma na inhaled corticosteroid — era ya "salbutamol-only" imeisha. Two acceptable approaches: (1) as-needed low-dose budesonide-formoterol (ICS combined na fast-acting LABA katika inhaler moja) — inachukuliwa tu wakati symptoms zinapobreak through, lakini kila dose inadeliver reliever na anti-inflammatory action; au (2) low-dose ICS (beclomethasone au budesonide) kila siku, na separate salbutamol kama reliever. Either approach lazima ijumuishe education juu ya technique (spacer, mouth rinse), trigger awareness, na written action plan. Review at 3 months — ikiwa control iko good kwa at least 3 months, clinician anaweza kufikiria step down. Patient lazima aelewe: kujihisi vizuri haimaanishi cured.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Reliever use rising above twice a week — pre-exacerbation warning, step up before the next attack',
          sw: 'Matumizi ya reliever yanapanda zaidi ya mara mbili kwa wiki — onyo la kabla ya exacerbation, panda kabla ya shambulizi linalofuata',
          sw_mtaa: 'Reliever use inapanda zaidi ya mara mbili kwa wiki — pre-exacerbation warning, step up kabla ya next attack',
        },
        urgency: 'soon',
      },
      {
        sign: {
          en: 'New night-time waking — controller dose is inadequate, do not wait for the full exacerbation',
          sw: 'Kuamka mpya usiku — dose ya controller haitoshi, usisubiri exacerbation kamili',
          sw_mtaa: 'New night-time waking — controller dose haitoshi, usisubiri full exacerbation',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'Review at 3 months, then every 6-12 months if stable. Annual review of action plan, technique, and trigger profile. Annual flu vaccine if available.',
      sw: 'Mapitio katika miezi 3, kisha kila miezi 6-12 ikiwa imara. Mapitio ya kila mwaka ya mpango wa kitendo, mbinu, na wasifu wa vichocheo. Chanjo ya flu ya kila mwaka ikiwa inapatikana.',
      sw_mtaa: 'Review at 3 months, kisha kila miezi 6-12 ikiwa stable. Annual review ya action plan, technique, na trigger profile. Annual flu vaccine ikiwa inapatikana.',
    },
    sources: [src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },

  // ──────────────────────────────────────────────────────────────────────
  // MODERATE PERSISTENT ASTHMA — GINA Step 3-4
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'moderate_persistent_asthma',
    severity: 'complicated',
    population: 'adult',
    label: {
      en: 'Moderate Persistent Asthma — GINA Step 3-4',
      sw: 'Pumu ya Kati ya Kudumu — Hatua 3-4 ya GINA',
    },
    presentation: {
      en: 'Daily symptoms or symptoms most days, waking at night more than once a week, some limitation of normal activity, reliever needed daily, FEV1 60-80% of predicted. This patient often started as mild persistent that was undertreated. The treatment goal is to step up controller therapy to gain control — usually low-dose ICS-LABA combination inhaler (e.g. budesonide-formoterol) used as maintenance, plus reliever as needed. About one third of patients in this category have an identifiable comorbidity (allergic rhinitis, GERD, obesity, exposure to indoor smoke) that, addressed properly, dramatically improves control.',
      sw: 'Dalili za kila siku au dalili siku nyingi, kuamka usiku zaidi ya mara moja kwa wiki, mkanganyiko fulani wa shughuli za kawaida, reliever inayohitajika kila siku, FEV1 60-80% ya inayotabiriwa. Mgonjwa huyu mara nyingi alianza kama mild persistent ambayo haikutibiwa vya kutosha. Lengo la matibabu ni kupanda matibabu ya controller kupata udhibiti — kawaida ICS-LABA combination inhaler ya dose ndogo (k.m. budesonide-formoterol) inayotumika kama maintenance, pamoja na reliever inapohitajika. Karibu theluthi moja ya wagonjwa katika kategoria hii wana comorbidity inayotambulika (allergic rhinitis, GERD, unene, mfichuo wa moshi wa ndani) ambayo, ikishughulikiwa vizuri, huboresha udhibiti kwa kiasi kikubwa.',
      sw_mtaa: 'Daily symptoms au symptoms most days, kuamka usiku zaidi ya mara moja kwa wiki, some limitation ya normal activity, reliever inahitajika kila siku, FEV1 60-80% ya predicted. Patient huyu mara nyingi alianza kama mild persistent ambayo haikutreatiwa adequately. Treatment goal ni kustep up controller therapy kupata control — kawaida low-dose ICS-LABA combination inhaler (e.g. budesonide-formoterol) inayotumika kama maintenance, pamoja na reliever as needed. Karibu third ya wagonjwa katika category hii wana identifiable comorbidity (allergic rhinitis, GERD, obesity, exposure ya indoor smoke) ambayo, ikishughulikiwa properly, inaimprove control dramatically.',
    },
    recognitionSigns: [
      {
        en: 'Symptoms most days or daily',
        sw: 'Dalili siku nyingi au kila siku',
        sw_mtaa: 'Symptoms most days au daily',
      },
      {
        en: 'Waking at night more than once a week',
        sw: 'Kuamka usiku zaidi ya mara moja kwa wiki',
        sw_mtaa: 'Kuamka usiku zaidi ya mara moja kwa wiki',
      },
      {
        en: 'Some limitation of normal activity (reduced exercise tolerance, missing school/work)',
        sw: 'Mkanganyiko fulani wa shughuli za kawaida (kupungua kwa uvumilivu wa mazoezi, kukosa shule/kazi)',
        sw_mtaa: 'Some limitation ya normal activity (kupungua kwa exercise tolerance, kumiss shule/kazi)',
      },
      {
        en: 'FEV1 60-80% of predicted, or peak flow 60-80% of personal best',
        sw: 'FEV1 60-80% ya inayotabiriwa, au peak flow 60-80% ya bora binafsi',
        sw_mtaa: 'FEV1 60-80% ya predicted, au peak flow 60-80% ya personal best',
      },
    ],
    treatmentJourney: {
      en: 'Step up to combination ICS-LABA — most commonly budesonide-formoterol or beclomethasone-formoterol. The MART (Maintenance And Reliever Therapy) approach uses the same inhaler for both daily maintenance AND as the reliever — convenient and effective. If control is still inadequate, dose is increased (Step 4). Critical adjuncts: confirm spacer technique, treat allergic rhinitis with intranasal steroid, treat reflux if present, address smoking (active or second-hand), address occupational exposures, weight reduction if BMI ≥ 30. Review at 6 weeks. If control is maintained for 3 months, the clinician may step down — never the patient unilaterally.',
      sw: 'Panda kwa combination ya ICS-LABA — kawaida zaidi budesonide-formoterol au beclomethasone-formoterol. Mbinu ya MART (Maintenance And Reliever Therapy) hutumia inhaler ile ile kwa maintenance ya kila siku NA kama reliever — rahisi na yenye ufanisi. Ikiwa udhibiti bado hautoshi, dose huongezeka (Hatua 4). Adjuncts muhimu: thibitisha mbinu ya spacer, tibu allergic rhinitis kwa intranasal steroid, tibu reflux ikiwa upo, shughulikia uvutaji sigara (wa moja kwa moja au wa pili), shughulikia mfichuo wa kazi, kupungua kwa uzito ikiwa BMI ≥ 30. Mapitio katika wiki 6. Ikiwa udhibiti unahifadhiwa kwa miezi 3, daktari anaweza kushuka — kamwe mgonjwa peke yake.',
      sw_mtaa: 'Step up kwa combination ICS-LABA — most commonly budesonide-formoterol au beclomethasone-formoterol. MART (Maintenance And Reliever Therapy) approach inatumia same inhaler kwa daily maintenance AND kama reliever — convenient na effective. Ikiwa control bado haitoshi, dose inaongezwa (Step 4). Critical adjuncts: confirm spacer technique, treat allergic rhinitis na intranasal steroid, treat reflux ikiwa iko, shughulikia smoking (active au second-hand), shughulikia occupational exposures, weight reduction ikiwa BMI ≥ 30. Review at 6 weeks. Ikiwa control inamaintained kwa miezi 3, clinician anaweza step down — never patient unilaterally.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Two or more exacerbations needing oral steroid in a year — high-risk asthma, urgent step-up and specialist review',
          sw: 'Exacerbations mbili au zaidi zinazohitaji steroid ya kumeza kwa mwaka — pumu ya hatari kubwa, kupanda haraka na mapitio ya mtaalamu',
          sw_mtaa: 'Two au more exacerbations zinazohitaji oral steroid kwa mwaka — high-risk asthma, urgent step-up na specialist review',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Falling peak flow over days even without symptoms — early warning of exacerbation, start action plan now',
          sw: 'Peak flow inashuka kwa siku hata bila dalili — onyo la mapema la exacerbation, anza mpango wa kitendo sasa',
          sw_mtaa: 'Falling peak flow kwa siku hata without symptoms — early warning ya exacerbation, anza action plan sasa',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'Review at 6 weeks initially, then every 3-6 months. Maintain written action plan. Address comorbidities at every visit. Annual flu vaccine.',
      sw: 'Mapitio katika wiki 6 mwanzoni, kisha kila miezi 3-6. Hifadhi mpango ulioandikwa wa kitendo. Shughulikia comorbidities kila ziara. Chanjo ya flu ya kila mwaka.',
      sw_mtaa: 'Review at 6 weeks initially, kisha kila miezi 3-6. Maintain written action plan. Address comorbidities kila visit. Annual flu vaccine.',
    },
    sources: [src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEVERE PERSISTENT ASTHMA — GINA Step 5
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'severe_persistent_asthma',
    severity: 'severe',
    population: 'adult',
    label: {
      en: 'Severe Persistent Asthma — GINA Step 5',
      sw: 'Pumu Kali ya Kudumu — Hatua 5 ya GINA',
    },
    presentation: {
      en: 'Symptoms throughout the day every day, frequent night waking, marked limitation of activity, frequent exacerbations requiring oral steroid, FEV1 < 60% of predicted despite high-dose ICS-LABA. This is the patient who has been to A&E multiple times in the past year, may have been intubated, and whose life is structured around the inhaler. These patients need specialist (respiratory physician) review. Add-on therapies at this level include tiotropium (LAMA), leukotriene receptor antagonists, low-dose oral corticosteroid in some settings, and where available, biologic therapy targeting specific inflammatory pathways. Frequent oral steroid carries its own significant burden of side effects (bone loss, glaucoma, diabetes, hypertension) — minimising it is a core treatment goal.',
      sw: 'Dalili siku nzima kila siku, kuamka usiku mara kwa mara, mkanganyiko mkubwa wa shughuli, exacerbations za mara kwa mara zinazohitaji steroid ya kumeza, FEV1 < 60% ya inayotabiriwa licha ya ICS-LABA ya dose ya juu. Huyu ni mgonjwa ambaye amekuwa A&E mara nyingi katika mwaka uliopita, anaweza kuwa amewekwa kwenye tube, na maisha yake yamepangwa kuzunguka inhaler. Wagonjwa hawa wanahitaji mapitio ya mtaalamu (daktari wa kupumua). Matibabu ya nyongeza katika kiwango hiki yanajumuisha tiotropium (LAMA), leukotriene receptor antagonists, steroid ya kumeza ya dose ndogo katika mazingira mengine, na pale inapopatikana, matibabu ya biologic yanayolenga njia maalumu za uvimbe. Steroid ya kumeza ya mara kwa mara hubeba mzigo wake mkubwa wa madhara (kupotea kwa mfupa, glaucoma, kisukari, shinikizo la damu) — kupunguza ni lengo kuu la matibabu.',
      sw_mtaa: 'Symptoms throughout the day kila siku, frequent night waking, marked limitation ya activity, frequent exacerbations zinazohitaji oral steroid, FEV1 < 60% ya predicted despite high-dose ICS-LABA. Huyu ni patient ambaye amekuwa A&E mara nyingi katika past year, anaweza kuwa intubated, na maisha yake yamepangwa kuzunguka inhaler. Wagonjwa hawa wanahitaji specialist (respiratory physician) review. Add-on therapies katika level hii zinajumuisha tiotropium (LAMA), leukotriene receptor antagonists, low-dose oral corticosteroid katika some settings, na pale inapopatikana, biologic therapy inayotarget specific inflammatory pathways. Frequent oral steroid inabeba significant burden yake ya side effects (bone loss, glaucoma, diabetes, hypertension) — kupunguza ni core treatment goal.',
    },
    recognitionSigns: [
      {
        en: 'Daily symptoms despite high-dose combination inhaler',
        sw: 'Dalili za kila siku licha ya combination inhaler ya dose ya juu',
        sw_mtaa: 'Daily symptoms despite high-dose combination inhaler',
      },
      {
        en: 'Frequent waking at night (most nights)',
        sw: 'Kuamka mara kwa mara usiku (usiku mwingi)',
        sw_mtaa: 'Frequent waking usiku (most nights)',
      },
      {
        en: 'Marked limitation of activity — cannot keep up with peers',
        sw: 'Mkanganyiko mkubwa wa shughuli — huwezi kuendelea na wenzio',
        sw_mtaa: 'Marked limitation ya activity — huwezi kukeep up na peers',
      },
      {
        en: 'Two or more A&E visits or hospital admissions in the past year',
        sw: 'Ziara mbili au zaidi za A&E au kulazwa hospitalini katika mwaka uliopita',
        sw_mtaa: 'Two au more A&E visits au hospital admissions katika past year',
      },
      {
        en: 'FEV1 < 60% of predicted, frequent peak flow drops',
        sw: 'FEV1 < 60% ya inayotabiriwa, kushuka kwa peak flow mara kwa mara',
        sw_mtaa: 'FEV1 < 60% ya predicted, frequent peak flow drops',
      },
    ],
    treatmentJourney: {
      en: 'High-dose ICS-LABA is the foundation. Add-on therapies considered at specialist level: LAMA (tiotropium), leukotriene receptor antagonist (montelukast), and in selected patients with eosinophilic or allergic phenotype, biologic therapy (anti-IgE omalizumab, anti-IL5 mepolizumab — where available). Low-dose maintenance oral prednisolone is a last resort because of long-term toxicity. Critical at this stage: revisit the diagnosis (is this really asthma or COPD, bronchiectasis, vocal cord dysfunction, cardiac failure, TB?), confirm adherence and technique objectively (look at the inhaler), address every modifiable factor (smoking, weight, allergens, occupational triggers, untreated comorbidities). The patient should have written instructions on what to do at the first sign of an exacerbation, including starting oral prednisolone before phoning the clinic.',
      sw: 'ICS-LABA ya dose ya juu ni msingi. Matibabu ya nyongeza yanazingatiwa katika kiwango cha mtaalamu: LAMA (tiotropium), leukotriene receptor antagonist (montelukast), na kwa wagonjwa waliochaguliwa wenye phenotype ya eosinophilic au allergic, matibabu ya biologic (anti-IgE omalizumab, anti-IL5 mepolizumab — pale inapopatikana). Prednisolone ya kumeza ya maintenance ya dose ndogo ni hatua ya mwisho kutokana na sumu ya muda mrefu. Muhimu katika hatua hii: rudi kwa utambuzi (hii ni pumu kweli au COPD, bronchiectasis, vocal cord dysfunction, kushindwa kwa moyo, TB?), thibitisha kufuata na mbinu kwa malengo (angalia inhaler), shughulikia kila kipengele kinachoweza kurekebishwa (kuvuta sigara, uzito, allergens, vichocheo vya kazi, comorbidities zisizotibiwa). Mgonjwa anapaswa kuwa na maelekezo yaliyoandikwa juu ya cha kufanya kwa ishara ya kwanza ya exacerbation, ikijumuisha kuanza prednisolone ya kumeza kabla ya kupiga simu kliniki.',
      sw_mtaa: 'High-dose ICS-LABA ni foundation. Add-on therapies zinaconsidered katika specialist level: LAMA (tiotropium), leukotriene receptor antagonist (montelukast), na katika selected patients wenye eosinophilic au allergic phenotype, biologic therapy (anti-IgE omalizumab, anti-IL5 mepolizumab — pale inapopatikana). Low-dose maintenance oral prednisolone ni last resort kutokana na long-term toxicity. Critical katika stage hii: revisit diagnosis (hii ni asthma kweli au COPD, bronchiectasis, vocal cord dysfunction, cardiac failure, TB?), confirm adherence na technique objectively (angalia inhaler), shughulikia kila modifiable factor (smoking, weight, allergens, occupational triggers, untreated comorbidities). Patient anapaswa kuwa na written instructions juu ya cha kufanya at first sign ya exacerbation, ikijumuisha kuanza oral prednisolone kabla ya kuphone clinic.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Increasing frequency of attacks despite maximum therapy — needs specialist review urgently',
          sw: 'Kuongezeka kwa mzunguko wa mashambulizi licha ya matibabu ya juu — anahitaji mapitio ya mtaalamu haraka',
          sw_mtaa: 'Increasing frequency ya attacks despite maximum therapy — anahitaji specialist review urgently',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Side effects of long-term oral steroid emerging (weight gain, diabetes, easy bruising, cataracts) — review steroid-sparing options',
          sw: 'Madhara ya steroid ya kumeza ya muda mrefu yanajitokeza (kuongezeka uzito, kisukari, kupata michubuko kwa urahisi, cataracts) — pitia chaguo za kupunguza steroid',
          sw_mtaa: 'Side effects ya long-term oral steroid emerging (weight gain, diabetes, easy bruising, cataracts) — review steroid-sparing options',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'Specialist review every 3 months at minimum. Annual lung function, action plan refresh, comorbidity check, bone density if on chronic oral steroid. Lower threshold for hospital admission during exacerbations.',
      sw: 'Mapitio ya mtaalamu kila miezi 3 angalau. Utendaji wa mapafu wa kila mwaka, kuhuisha mpango wa kitendo, ukaguzi wa comorbidity, bone density ikiwa kwa steroid ya kumeza ya kudumu. Kizingiti cha chini cha kulazwa hospitalini wakati wa exacerbations.',
      sw_mtaa: 'Specialist review kila miezi 3 minimum. Annual lung function, action plan refresh, comorbidity check, bone density ikiwa kwa chronic oral steroid. Lower threshold kwa hospital admission wakati wa exacerbations.',
    },
    sources: [src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },

  // ──────────────────────────────────────────────────────────────────────
  // ACUTE EXACERBATION — the bread-and-butter clinic presentation
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'acute_asthma_exacerbation',
    severity: 'critical',
    label: {
      en: 'Acute Asthma Exacerbation',
      sw: 'Shambulizi la Pumu la Papo Hapo',
    },
    presentation: {
      en: 'A patient with known asthma — or with a first wheeze — presenting with increasing breathlessness, cough, wheeze, and chest tightness over hours to days. Severity is assessed at the bedside in three tiers: (1) MILD-MODERATE — speaking in sentences, SpO2 ≥ 92%, RR < 30, pulse < 110, can lie down; (2) SEVERE — speaking in phrases not sentences, SpO2 90-92% or RR 30-39 or pulse 110-130, sitting forward, marked accessory muscle use; (3) LIFE-THREATENING — only single words or silent, SpO2 < 90%, exhausted, silent chest, cyanosis, bradycardia, drowsiness or confusion. The clinical decision is rapid: severity → treatment intensity → admit vs discharge. The single most common reason patients deteriorate is undertreatment in the first hour.',
      sw: 'Mgonjwa anayejulikana ana pumu — au mwenye wheeze ya kwanza — anayejitokeza na kushindwa kupumua kunazidi kuwa mbaya, kikohozi, wheeze, na kifua kubana kwa masaa hadi siku. Ukali hutathminiwa kitandani katika viwango vitatu: (1) NDOGO-WASTANI — anazungumza sentensi, SpO2 ≥ 92%, RR < 30, mapigo < 110, anaweza kulala; (2) KALI — anazungumza vifungu si sentensi, SpO2 90-92% au RR 30-39 au mapigo 110-130, ameketi mbele, matumizi makubwa ya misuli ya nyongeza; (3) INAYOTISHIA MAISHA — maneno moja tu au kimya, SpO2 < 90%, amechoka, kifua kimya, cyanosis, bradycardia, usingizi au kuchanganyikiwa. Uamuzi wa kliniki ni wa haraka: ukali → ukubwa wa matibabu → kulazwa dhidi ya kuruhusu. Sababu moja ya kawaida zaidi wagonjwa kuzidi kuwa mbaya ni undertreatment katika saa ya kwanza.',
      sw_mtaa: 'Patient anayejulikana ana asthma — au mwenye first wheeze — anayepresenting na increasing breathlessness, cough, wheeze, na chest tightness kwa hours hadi siku. Severity inaassessed at the bedside katika three tiers: (1) MILD-MODERATE — anazungumza katika sentences, SpO2 ≥ 92%, RR < 30, pulse < 110, anaweza kulala; (2) SEVERE — anazungumza katika phrases si sentences, SpO2 90-92% au RR 30-39 au pulse 110-130, sitting forward, marked accessory muscle use; (3) LIFE-THREATENING — only single words au silent, SpO2 < 90%, exhausted, silent chest, cyanosis, bradycardia, drowsiness au confusion. Clinical decision ni rapid: severity → treatment intensity → admit vs discharge. Single most common reason wagonjwa kudeteriorate ni undertreatment katika first hour.',
    },
    recognitionSigns: [
      {
        en: 'Increasing breathlessness, cough, wheeze, or chest tightness over hours to days',
        sw: 'Kushindwa kupumua kunazidi kuwa mbaya, kikohozi, wheeze, au kifua kubana kwa masaa hadi siku',
        sw_mtaa: 'Increasing breathlessness, cough, wheeze, au chest tightness kwa hours hadi siku',
      },
      {
        en: 'Rising reliever use — multiple times an hour',
        sw: 'Matumizi ya reliever yanaongezeka — mara nyingi kwa saa',
        sw_mtaa: 'Rising reliever use — mara nyingi kwa saa',
      },
      {
        en: 'Peak flow dropping more than 20% from personal best',
        sw: 'Peak flow inashuka zaidi ya 20% kutoka kwa bora binafsi',
        sw_mtaa: 'Peak flow inashuka zaidi ya 20% kutoka personal best',
      },
      {
        en: 'Speech limitation (sentences → phrases → words → silent)',
        sw: 'Kikomo cha matamshi (sentensi → vifungu → maneno → kimya)',
        sw_mtaa: 'Speech limitation (sentences → phrases → words → silent)',
      },
      {
        en: 'Accessory muscle use, intercostal indrawing, tripod position',
        sw: 'Matumizi ya misuli ya nyongeza, kuingia kwa intercostal, msimamo wa tripod',
        sw_mtaa: 'Accessory muscle use, intercostal indrawing, tripod position',
      },
    ],
    treatmentJourney: {
      en: 'The first hour is critical. (1) High-flow oxygen if SpO2 < 92% — target 94-98% (or 88-92% if known chronic CO2 retainer). (2) Salbutamol nebuliser 5 mg, repeated every 20 minutes for the first hour OR salbutamol metered-dose inhaler 4-10 puffs through a spacer, repeated every 20 minutes — both approaches are effective when done properly. (3) Oral prednisolone 40-50 mg as a single dose immediately, then daily for 5-7 days (continued at home if discharged). IV hydrocortisone if cannot swallow. (4) For severe attack, add ipratropium nebuliser combined with salbutamol; consider IV magnesium sulfate. (5) IM adrenaline reserved for life-threatening attack not responding to nebulisers or for anaphylaxis. Reassess at 1 hour: if responding well (speaking sentences, SpO2 > 95%, peak flow > 75% of personal best) — observe 1 more hour and consider discharge with action plan and follow-up. If poor response — admit. Antibiotics only if clear evidence of bacterial infection.',
      sw: 'Saa ya kwanza ni muhimu. (1) Oksijeni ya mtiririko wa juu ikiwa SpO2 < 92% — lengo 94-98% (au 88-92% ikiwa ni mhifadhi sugu wa CO2). (2) Salbutamol nebuliser 5 mg, kurudiwa kila dakika 20 kwa saa ya kwanza AU salbutamol metered-dose inhaler puffs 4-10 kupitia spacer, kurudiwa kila dakika 20 — mbinu zote zina ufanisi zinapofanywa vizuri. (3) Prednisolone ya kumeza 40-50 mg kama dose moja mara moja, kisha kila siku kwa siku 5-7 (inayoendelea nyumbani ikiwa imeruhusiwa). Hydrocortisone IV ikiwa hawezi kumeza. (4) Kwa shambulizi kali, ongeza ipratropium nebuliser pamoja na salbutamol; fikiria magnesium sulfate ya IV. (5) Adrenaline IM imehifadhiwa kwa shambulizi linalotishia maisha lisilojibu nebulizers au kwa anaphylaxis. Tathmini upya katika saa 1: ikiwa anajibu vizuri (anazungumza sentensi, SpO2 > 95%, peak flow > 75% ya bora binafsi) — angalia saa 1 zaidi na fikiria kuruhusu na mpango wa kitendo na ufuatiliaji. Ikiwa jibu mbaya — laza. Antibiotics tu ikiwa ushahidi dhahiri wa maambukizi ya bakteria.',
      sw_mtaa: 'First hour ni critical. (1) High-flow oxygen ikiwa SpO2 < 92% — target 94-98% (au 88-92% ikiwa known chronic CO2 retainer). (2) Salbutamol nebuliser 5 mg, repeated kila dakika 20 kwa first hour AU salbutamol metered-dose inhaler 4-10 puffs through spacer, repeated kila dakika 20 — both approaches ni effective zinapofanywa properly. (3) Oral prednisolone 40-50 mg kama single dose immediately, kisha daily kwa siku 5-7 (continued home ikiwa discharged). IV hydrocortisone ikiwa hawezi kumeza. (4) Kwa severe attack, ongeza ipratropium nebuliser combined na salbutamol; consider IV magnesium sulfate. (5) IM adrenaline imereservedi kwa life-threatening attack isiyojibu nebulizers au kwa anaphylaxis. Reassess at 1 hour: ikiwa responding well (speaking sentences, SpO2 > 95%, peak flow > 75% ya personal best) — observe 1 more hour na consider discharge na action plan na follow-up. Ikiwa poor response — admit. Antibiotics tu ikiwa clear evidence ya bacterial infection.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Silent chest — wheeze suddenly becomes quieter or disappears — sign of severe airflow obstruction, NOT improvement',
          sw: 'Kifua kimya — wheeze ghafla inakuwa kimya zaidi au inatoweka — ishara ya kuzuia hewa kali, SIYO uboreshaji',
          sw_mtaa: 'Silent chest — wheeze ghafla inakuwa quieter au inatoweka — sign ya severe airflow obstruction, SIYO improvement',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Cyanosis, exhaustion, paradoxical breathing — life-threatening, prepare for assisted ventilation',
          sw: 'Cyanosis, uchovu, kupumua kinyume — inatishia maisha, jiandae kwa kupumua kwa msaada',
          sw_mtaa: 'Cyanosis, exhaustion, paradoxical breathing — life-threatening, prepare kwa assisted ventilation',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Drowsiness, confusion — CO2 retention, imminent respiratory failure',
          sw: 'Usingizi, kuchanganyikiwa — uhifadhi wa CO2, kushindwa kwa kupumua kunakaribia',
          sw_mtaa: 'Drowsiness, confusion — CO2 retention, imminent respiratory failure',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Failure to respond to back-to-back nebulised salbutamol in the first hour — escalate care',
          sw: 'Kushindwa kujibu salbutamol ya nebulisi mfululizo katika saa ya kwanza — panda huduma',
          sw_mtaa: 'Failure ya kujibu back-to-back nebulised salbutamol katika first hour — escalate care',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Every exacerbation is a teaching moment: review trigger, review technique, review controller adequacy, write/update action plan. Follow-up clinic visit within 7 days. Step up controller therapy for at least 2-3 months. Every exacerbation needing oral steroid is a marker of risk — two in a year means high-risk asthma.',
      sw: 'Kila exacerbation ni wakati wa kufundisha: pitia kichocheo, pitia mbinu, pitia utoshelevu wa controller, andika/sasisha mpango wa kitendo. Ziara ya kliniki ya ufuatiliaji ndani ya siku 7. Panda matibabu ya controller kwa angalau miezi 2-3. Kila exacerbation inayohitaji steroid ya kumeza ni alama ya hatari — mbili kwa mwaka inamaanisha pumu ya hatari kubwa.',
      sw_mtaa: 'Kila exacerbation ni teaching moment: review trigger, review technique, review controller adequacy, write/update action plan. Follow-up clinic visit ndani ya siku 7. Step up controller therapy kwa at least miezi 2-3. Kila exacerbation inayohitaji oral steroid ni marker ya risk — two kwa mwaka inamaanisha high-risk asthma.',
    },
    sources: [src('WHO_PEN_2020'), src('WHO_OXYGEN_2023'), src('NTLG_STG_2023')],
  },

  // ──────────────────────────────────────────────────────────────────────
  // LIFE-THREATENING ASTHMA — ICU territory
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'life_threatening_asthma',
    severity: 'critical',
    label: {
      en: 'Life-Threatening Asthma — Near-Fatal Attack',
      sw: 'Pumu Inayotishia Maisha — Shambulizi Karibu na Kifo',
    },
    presentation: {
      en: 'The patient who is about to die from asthma. Any one of these signs is enough: silent chest (no wheeze because no air is moving), cyanosis (lips and fingertips blue), exhaustion or feeble respiratory effort, bradycardia, hypotension, arrhythmia, confusion, drowsiness, coma, SpO2 < 90% on high-flow oxygen, PEF < 33% of personal best. Some patients have a "near-fatal" subtype — they go from well to nearly dead in under an hour, often during severe allergen exposure. These patients require immediate intensive care, urgent IM adrenaline if available, IV magnesium sulfate, IV hydrocortisone, possible intubation. Even after a successful resuscitation, lifelong risk is profoundly elevated — these patients must never have anything less than maximum control therapy.',
      sw: 'Mgonjwa anayekaribia kufa kutokana na pumu. Yoyote ya ishara hizi inatosha: kifua kimya (hakuna wheeze kwa sababu hewa haitembei), cyanosis (midomo na fingertips bluu), uchovu au juhudi dhaifu ya kupumua, bradycardia, hypotension, arrhythmia, kuchanganyikiwa, usingizi, coma, SpO2 < 90% kwa oksijeni ya mtiririko wa juu, PEF < 33% ya bora binafsi. Wagonjwa wengine wana subtype ya "karibu na kifo" — wanaenda kutoka kwa wazima hadi karibu na kufa katika chini ya saa, mara nyingi wakati wa mfichuo mkali wa allergen. Wagonjwa hawa wanahitaji huduma kubwa mara moja, adrenaline IM ya haraka ikiwa inapatikana, magnesium sulfate IV, hydrocortisone IV, possible intubation. Hata baada ya resuscitation iliyofanikiwa, hatari ya maisha yote inainuliwa sana — wagonjwa hawa kamwe wasiwe na chochote chini ya matibabu ya juu zaidi ya udhibiti.',
      sw_mtaa: 'Patient anayekaribia kufa kutokana na asthma. Yoyote ya signs hizi inatosha: silent chest (hakuna wheeze kwa sababu hakuna air inayotembea), cyanosis (midomo na fingertips bluu), exhaustion au feeble respiratory effort, bradycardia, hypotension, arrhythmia, confusion, drowsiness, coma, SpO2 < 90% kwa high-flow oxygen, PEF < 33% ya personal best. Wagonjwa wengine wana "near-fatal" subtype — wanaenda kutoka well hadi nearly dead katika chini ya saa, mara nyingi wakati wa severe allergen exposure. Wagonjwa hawa wanahitaji immediate intensive care, urgent IM adrenaline ikiwa available, IV magnesium sulfate, IV hydrocortisone, possible intubation. Hata baada ya successful resuscitation, lifelong risk inainuliwa profoundly — wagonjwa hawa kamwe wasiwe na chochote less than maximum control therapy.',
    },
    recognitionSigns: [
      {
        en: 'Silent chest — no audible wheeze despite distress',
        sw: 'Kifua kimya — hakuna wheeze inayosikika licha ya dhiki',
        sw_mtaa: 'Silent chest — hakuna audible wheeze despite distress',
      },
      {
        en: 'Cyanosis — lips, tongue, fingertips visibly blue or grey',
        sw: 'Cyanosis — midomo, ulimi, fingertips zinaonekana bluu au kijivu',
        sw_mtaa: 'Cyanosis — midomo, ulimi, fingertips visibly bluu au kijivu',
      },
      {
        en: 'Exhaustion, feeble or slowing respiratory effort, paradoxical breathing',
        sw: 'Uchovu, juhudi dhaifu au inayopungua ya kupumua, kupumua kinyume',
        sw_mtaa: 'Exhaustion, feeble au slowing respiratory effort, paradoxical breathing',
      },
      {
        en: 'Bradycardia or hypotension (late signs)',
        sw: 'Bradycardia au hypotension (ishara za marehemu)',
        sw_mtaa: 'Bradycardia au hypotension (late signs)',
      },
      {
        en: 'Confusion, drowsiness, coma',
        sw: 'Kuchanganyikiwa, usingizi, coma',
        sw_mtaa: 'Confusion, drowsiness, coma',
      },
      {
        en: 'SpO2 < 90% despite high-flow oxygen',
        sw: 'SpO2 < 90% licha ya oksijeni ya mtiririko wa juu',
        sw_mtaa: 'SpO2 < 90% despite high-flow oxygen',
      },
    ],
    treatmentJourney: {
      en: 'Treat as a respiratory arrest in slow motion. Immediate priorities: high-flow oxygen, IV access, continuous nebulised salbutamol with ipratropium, IV hydrocortisone, IV magnesium sulfate 1.2-2 g over 20 minutes, IM adrenaline 0.5 mg if poor response or features of anaphylaxis. Senior anaesthetic and ICU review immediately. The decision to intubate is difficult — done too early it can precipitate cardiovascular collapse from auto-PEEP and hyperinflation, done too late it follows respiratory arrest. Permissive hypercapnia is the rule for ventilator settings. After stabilisation, post-event review is essential: what failed in the prevention plan, what controller will be used going forward, is there an allergen that can be eliminated, is there an opportunity for biologic therapy.',
      sw: 'Tibu kama kushindwa kwa kupumua kwa polepole. Vipaumbele vya mara moja: oksijeni ya mtiririko wa juu, IV access, nebulised salbutamol inayoendelea pamoja na ipratropium, hydrocortisone IV, magnesium sulfate IV 1.2-2 g kwa dakika 20, adrenaline IM 0.5 mg ikiwa jibu mbaya au sifa za anaphylaxis. Mapitio ya mtaalamu wa anaesthetic na ICU mara moja. Uamuzi wa kuingiza tube ni mgumu — kufanywa mapema sana kunaweza kuchochea anguko la moyo na mishipa kutokana na auto-PEEP na hyperinflation, kufanywa kwa kuchelewa sana kunafuata kushindwa kwa kupumua. Permissive hypercapnia ni kanuni ya mipangilio ya ventilator. Baada ya kuimarika, mapitio ya baada ya tukio ni muhimu: ni nini kilishindwa katika mpango wa kuzuia, ni controller gani itatumika mbele, je kuna allergen inayoweza kuondolewa, je kuna fursa ya matibabu ya biologic.',
      sw_mtaa: 'Treat kama respiratory arrest katika slow motion. Immediate priorities: high-flow oxygen, IV access, continuous nebulised salbutamol na ipratropium, IV hydrocortisone, IV magnesium sulfate 1.2-2 g over 20 minutes, IM adrenaline 0.5 mg ikiwa poor response au features ya anaphylaxis. Senior anaesthetic na ICU review immediately. Decision ya kuintubate ni difficult — done too early inaweza kuprecipitate cardiovascular collapse kutokana na auto-PEEP na hyperinflation, done too late inafuata respiratory arrest. Permissive hypercapnia ni rule kwa ventilator settings. Baada ya stabilisation, post-event review ni essential: ni nini kilishindwa katika prevention plan, ni controller gani itatumika going forward, je kuna allergen inayoweza kueliminated, je kuna opportunity kwa biologic therapy.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Respiratory arrest imminent — pre-arrest, prepare for intubation and CPR',
          sw: 'Kushindwa kwa kupumua kunakaribia — kabla ya arrest, jiandae kwa intubation na CPR',
          sw_mtaa: 'Respiratory arrest imminent — pre-arrest, prepare kwa intubation na CPR',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Any patient with a prior near-fatal attack or ICU admission — lifelong highest-risk, lowest threshold for hospital',
          sw: 'Mgonjwa yeyote mwenye shambulizi la zamani la karibu na kifo au kulazwa ICU — hatari ya juu zaidi ya maisha yote, kizingiti cha chini zaidi cha hospitali',
          sw_mtaa: 'Patient yoyote na prior near-fatal attack au ICU admission — lifelong highest-risk, lowest threshold kwa hospital',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'ICU/HDU recovery, then respiratory specialist follow-up within 1 week of discharge. Detailed action plan including written instructions for early prednisolone. Consider asthma-specialist nurse or case-management. Biologic therapy evaluation. Annual review at minimum every 3 months going forward. Psychological support — near-fatal attacks leave deep trauma.',
      sw: 'Kupona ICU/HDU, kisha ufuatiliaji wa mtaalamu wa kupumua ndani ya wiki 1 ya kuruhusiwa. Mpango wa kina wa kitendo ikijumuisha maagizo yaliyoandikwa ya prednisolone ya mapema. Fikiria muuguzi mtaalamu wa pumu au case-management. Tathmini ya matibabu ya biologic. Mapitio ya kila mwaka angalau kila miezi 3 mbele. Msaada wa kisaikolojia — mashambulizi ya karibu na kifo huacha kiwewe kikubwa.',
      sw_mtaa: 'ICU/HDU recovery, kisha respiratory specialist follow-up ndani ya wiki 1 ya discharge. Detailed action plan ikijumuisha written instructions kwa early prednisolone. Consider asthma-specialist nurse au case-management. Biologic therapy evaluation. Annual review at minimum kila miezi 3 going forward. Psychological support — near-fatal attacks zinaacha deep trauma.',
    },
    sources: [src('WHO_PEN_2020'), src('WHO_OXYGEN_2023'), src('NTLG_STG_2023')],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PEDIATRIC ASTHMA — IMCI age-banded, spacer-with-mask central
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'pediatric_asthma',
    severity: 'complicated',
    population: 'pediatric',
    label: {
      en: 'Pediatric Asthma — children and infants',
      sw: 'Pumu ya Watoto — watoto na wachanga',
    },
    presentation: {
      en: 'Asthma in children under 5 is harder to diagnose than in adults — many children wheeze with viral infections without going on to have persistent asthma. The features that point to true asthma include: recurrent wheeze outside infections, response to a reliever inhaler trial, eczema or hay fever, and a strong family history. In older children, the picture looks like adult asthma — cough especially at night and with exercise, wheeze, reduced exercise tolerance. Treatment cornerstone is an inhaled corticosteroid delivered through a spacer (with a mask for under-fives, mouthpiece for older children). Acute exacerbation is treated by the same principles as adult — but IMCI age-banded respiratory rate thresholds are the rapid bedside severity tool, and chest indrawing is a key danger sign. Children deteriorate fast and can be unrecognisably normal until very late — the family\'s observations matter a lot.',
      sw: 'Pumu kwa watoto chini ya miaka 5 ni vigumu kuchunguza kuliko kwa watu wazima — watoto wengi huwheeze na maambukizi ya virusi bila kuendelea kupata pumu ya kudumu. Sifa zinazoelekeza kwa pumu ya kweli zinajumuisha: wheeze ya kurudia nje ya maambukizi, jibu kwa jaribio la reliever inhaler, eczema au hay fever, na historia kali ya familia. Kwa watoto wakubwa, picha inafanana na pumu ya watu wazima — kikohozi haswa usiku na kwa mazoezi, wheeze, kupungua kwa uvumilivu wa mazoezi. Msingi wa matibabu ni inhaled corticosteroid inayotolewa kupitia spacer (yenye mask kwa walio chini ya miaka mitano, mouthpiece kwa watoto wakubwa). Exacerbation ya papo hapo inatibiwa kwa kanuni zile zile kama mtu mzima — lakini vizingiti vya kasi ya kupumua vya IMCI vilivyo na umri ni chombo cha haraka cha kitandani cha ukali, na kifua kuingia ndani ni ishara muhimu ya hatari. Watoto huzidi kuwa mbaya haraka na wanaweza kuonekana wa kawaida hadi marehemu sana — uchunguzi wa familia unajali sana.',
      sw_mtaa: 'Asthma kwa watoto under 5 ni harder ku-diagnose kuliko kwa adults — watoto wengi wana-wheeze na viral infections without kuendelea kuwa persistent asthma. Features zinazoelekeza kwa true asthma zinajumuisha: recurrent wheeze nje ya infections, response kwa reliever inhaler trial, eczema au hay fever, na strong family history. Kwa older children, picture inalook kama adult asthma — cough especially usiku na kwa exercise, wheeze, reduced exercise tolerance. Treatment cornerstone ni inhaled corticosteroid inayotolewa through spacer (na mask kwa under-fives, mouthpiece kwa older children). Acute exacerbation inatreated kwa same principles kama adult — lakini IMCI age-banded respiratory rate thresholds ni rapid bedside severity tool, na chest indrawing ni key danger sign. Watoto wanadeteriorate fast na wanaweza ku-look unrecognisably normal hadi very late — family observations zinajali sana.',
    },
    recognitionSigns: [
      {
        en: 'Recurrent wheeze outside infections, response to reliever, eczema/hay fever, family history',
        sw: 'Wheeze ya kurudia nje ya maambukizi, jibu kwa reliever, eczema/hay fever, historia ya familia',
        sw_mtaa: 'Recurrent wheeze nje ya infections, response kwa reliever, eczema/hay fever, family history',
      },
      {
        en: 'Nocturnal cough that wakes the child more than once a week',
        sw: 'Kikohozi cha usiku kinachomuamsha mtoto zaidi ya mara moja kwa wiki',
        sw_mtaa: 'Nocturnal cough inayomuamsha mtoto zaidi ya mara moja kwa wiki',
      },
      {
        en: 'Inability to keep up with peers in play or sport',
        sw: 'Kushindwa kuendelea na wenzio katika mchezo au michezo',
        sw_mtaa: 'Inability ya kukeep up na peers katika play au sport',
      },
      {
        en: 'In acute exacerbation: fast breathing per IMCI age band (≥ 60/min under 2 months, ≥ 50/min 2-11 months, ≥ 40/min 1-5 years), chest indrawing, inability to feed or speak',
        sw: 'Katika exacerbation ya papo hapo: kupumua haraka kwa kundi la umri la IMCI (≥ 60/dakika chini ya miezi 2, ≥ 50/dakika miezi 2-11, ≥ 40/dakika miaka 1-5), kifua kuingia ndani, kushindwa kula au kusema',
        sw_mtaa: 'Katika acute exacerbation: fast breathing kwa IMCI age band (≥ 60/min under miezi 2, ≥ 50/min miezi 2-11, ≥ 40/min miaka 1-5), chest indrawing, inability ya kula au kusema',
      },
    ],
    treatmentJourney: {
      en: 'For maintenance: low-dose inhaled corticosteroid daily through a spacer with mask (under 5) or mouthpiece (5+), with salbutamol as reliever. Step up to ICS-LABA combination if control is inadequate. For acute exacerbation: salbutamol through spacer (6-10 puffs for under 5, 4-10 puffs for older), repeated every 20 minutes for the first hour. Oral prednisolone (1-2 mg/kg, max 40 mg) for moderate-severe attacks, given for 3-5 days. Oxygen if SpO2 < 92%. The biggest preventable cause of pediatric asthma death is parental delay due to "just a cold" reassurance. Strongly empower the family with: action plan in their language, clear list of danger signs (cannot speak, chest indrawing, blue lips, exhausted, silent chest), confidence to come in early.',
      sw: 'Kwa maintenance: dose ndogo ya inhaled corticosteroid kila siku kupitia spacer yenye mask (chini ya 5) au mouthpiece (5+), na salbutamol kama reliever. Panda kwa combination ya ICS-LABA ikiwa udhibiti haufanyi vya kutosha. Kwa exacerbation ya papo hapo: salbutamol kupitia spacer (puffs 6-10 kwa walio chini ya 5, puffs 4-10 kwa wakubwa), kurudiwa kila dakika 20 kwa saa ya kwanza. Prednisolone ya kumeza (1-2 mg/kg, max 40 mg) kwa mashambulizi ya kati-kali, inatolewa kwa siku 3-5. Oksijeni ikiwa SpO2 < 92%. Sababu kubwa zaidi inayoweza kuzuiwa ya kifo cha pumu ya watoto ni kuchelewa kwa wazazi kutokana na uhakikisho wa "mafua tu." Wezesha familia kwa nguvu kwa: mpango wa kitendo katika lugha yao, orodha wazi ya ishara za hatari (huwezi kusema, kifua kuingia ndani, midomo bluu, umechoka, kifua kimya), ujasiri wa kuja mapema.',
      sw_mtaa: 'Kwa maintenance: low-dose inhaled corticosteroid kila siku through spacer na mask (under 5) au mouthpiece (5+), na salbutamol kama reliever. Step up kwa ICS-LABA combination ikiwa control haitoshi. Kwa acute exacerbation: salbutamol through spacer (6-10 puffs kwa under 5, 4-10 puffs kwa older), repeated kila dakika 20 kwa first hour. Oral prednisolone (1-2 mg/kg, max 40 mg) kwa moderate-severe attacks, inatolewa kwa siku 3-5. Oxygen ikiwa SpO2 < 92%. Biggest preventable cause ya pediatric asthma death ni parental delay kutokana na "just a cold" reassurance. Strongly empower family na: action plan katika lugha yao, clear list ya danger signs (huwezi kusema, chest indrawing, midomo bluu, exhausted, silent chest), confidence ya kuja early.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Chest indrawing — lower chest sinking in with each breath',
          sw: 'Kifua kuingia ndani — kifua cha chini kinashuka ndani kwa kila pumzi',
          sw_mtaa: 'Chest indrawing — lower chest inashuka ndani kwa kila pumzi',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Cannot feed or speak, exhaustion, drowsiness, cyanosis',
          sw: 'Huwezi kunyonya au kusema, uchovu, usingizi, cyanosis',
          sw_mtaa: 'Huwezi kunyonya au kusema, exhaustion, drowsiness, cyanosis',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'SpO2 < 92% — clear indication for hospital management',
          sw: 'SpO2 < 92% — dalili dhahiri ya usimamizi wa hospitali',
          sw_mtaa: 'SpO2 < 92% — clear indication kwa hospital management',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Recurrent wheeze with poor controller adherence — high risk of severe attack',
          sw: 'Wheeze ya kurudia na kufuata vibaya kwa controller — hatari kubwa ya shambulizi kali',
          sw_mtaa: 'Recurrent wheeze na poor controller adherence — high risk ya severe attack',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Review at 6-8 weeks after diagnosis, then every 3-6 months. Annual growth and bone health check if on chronic ICS (long-term growth effect is small but real and dose-related). Annual flu vaccine. School communication — ensure school has inhaler and spacer accessible and knows the action plan. Family education at every visit.',
      sw: 'Mapitio katika wiki 6-8 baada ya utambuzi, kisha kila miezi 3-6. Ukaguzi wa kila mwaka wa ukuaji na afya ya mfupa ikiwa kwa ICS sugu (athari ya ukuaji ya muda mrefu ni ndogo lakini ya kweli na inahusiana na dose). Chanjo ya flu ya kila mwaka. Mawasiliano ya shule — hakikisha shule ina inhaler na spacer zinazoweza kufikiwa na inajua mpango wa kitendo. Elimu ya familia kila ziara.',
      sw_mtaa: 'Review at 6-8 weeks after diagnosis, kisha kila miezi 3-6. Annual growth na bone health check ikiwa kwa chronic ICS (long-term growth effect ni small lakini real na dose-related). Annual flu vaccine. School communication — hakikisha shule ina inhaler na spacer accessible na inajua action plan. Family education kila visit.',
    },
    sources: [src('IMCI_2024'), src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },

  // ──────────────────────────────────────────────────────────────────────
  // EXERCISE-INDUCED ASTHMA / BRONCHOSPASM
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'exercise_induced_asthma',
    severity: 'uncomplicated',
    label: {
      en: 'Exercise-Induced Bronchospasm',
      sw: 'Bronchospasm Inayochochewa na Mazoezi',
    },
    presentation: {
      en: 'Cough, wheeze, chest tightness, or breathlessness that comes on 5-10 minutes into exercise (or just after stopping) and resolves over 30-60 minutes of rest. Cold dry air is the worst trigger; warm humid air (swimming pools) is much better tolerated. Two important framings: (1) for a patient with no other asthma symptoms, this is its own diagnosis — exercise-induced bronchospasm — and pre-treatment with salbutamol works well; (2) for a patient with known asthma who has exercise-induced symptoms, this is a sign that underlying control is inadequate and the controller needs stepping up — pre-treatment alone is a sticking plaster. The distinction matters because telling a young athlete "just take your salbutamol before sport" when they actually have undertreated persistent asthma sets them up for a bad attack one day.',
      sw: 'Kikohozi, wheeze, kifua kubana, au kushindwa kupumua kunakuja dakika 5-10 ndani ya mazoezi (au baada tu ya kusimama) na hupungua katika dakika 30-60 za kupumzika. Hewa baridi kavu ni kichocheo kibaya zaidi; hewa ya joto yenye unyevu (madimbwi ya kuogelea) huvumiliwa vizuri zaidi. Mtazamo mbili muhimu: (1) kwa mgonjwa asiye na dalili nyingine za pumu, hii ni utambuzi wake mwenyewe — bronchospasm inayochochewa na mazoezi — na matibabu ya kabla na salbutamol hufanya kazi vizuri; (2) kwa mgonjwa anayejulikana ana pumu mwenye dalili zinazochochewa na mazoezi, hii ni ishara kwamba udhibiti wa msingi hautoshi na controller inahitaji kupanda — matibabu ya kabla peke yake ni kifuniko cha kunyamazisha. Tofauti inajali kwa sababu kumwambia mwanariadha mdogo "chukua tu salbutamol yako kabla ya mchezo" wakati anayo persistent asthma isiyotibiwa vya kutosha humweka kwa shambulizi baya siku moja.',
      sw_mtaa: 'Cough, wheeze, chest tightness, au breathlessness inakuja 5-10 minutes ndani ya exercise (au baada tu ya kusimama) na inaresolve over dakika 30-60 ya rest. Cold dry air ni worst trigger; warm humid air (swimming pools) inavumiliwa much better. Two important framings: (1) kwa patient na no other asthma symptoms, hii ni own diagnosis — exercise-induced bronchospasm — na pre-treatment na salbutamol inafanya kazi well; (2) kwa patient na known asthma anayepata exercise-induced symptoms, hii ni sign kwamba underlying control haitoshi na controller inahitaji stepping up — pre-treatment alone ni sticking plaster. Distinction inajali kwa sababu kumwambia young athlete "just take your salbutamol before sport" wakati actually ana undertreated persistent asthma inawaset kwa bad attack siku moja.',
    },
    recognitionSigns: [
      {
        en: 'Symptoms appear 5-10 minutes into exercise, peak 5-10 minutes after stopping, resolve in 30-60 minutes',
        sw: 'Dalili zinaonekana dakika 5-10 ndani ya mazoezi, kilele dakika 5-10 baada ya kusimama, hupungua katika dakika 30-60',
        sw_mtaa: 'Symptoms zinaonekana 5-10 minutes ndani ya exercise, peak 5-10 minutes baada ya kusimama, zinaresolve katika dakika 30-60',
      },
      {
        en: 'Worse in cold dry air, better in warm humid air',
        sw: 'Mbaya zaidi katika hewa baridi kavu, bora katika hewa ya joto yenye unyevu',
        sw_mtaa: 'Worse katika cold dry air, better katika warm humid air',
      },
      {
        en: 'Responds to salbutamol given 10-15 minutes before activity',
        sw: 'Inajibu kwa salbutamol iliyotolewa dakika 10-15 kabla ya shughuli',
        sw_mtaa: 'Inajibu kwa salbutamol iliyotolewa 10-15 minutes kabla ya activity',
      },
    ],
    treatmentJourney: {
      en: 'For isolated exercise-induced bronchospasm without other asthma features: salbutamol 2 puffs 10-15 minutes before exercise, plus warm-up. Avoid running outdoors in cold dry air without protective scarf. Swimming in well-chlorinated pools is often the best-tolerated activity. For exercise-induced symptoms in a patient with known asthma: step up the controller — the goal is for exercise to feel like exercise, not like an asthma attack waiting to happen. After 2-4 weeks of better control, most exercise symptoms melt away. If symptoms persist despite good control and pre-treatment, consider adding leukotriene receptor antagonist or referring for specialist review.',
      sw: 'Kwa exercise-induced bronchospasm pekee bila sifa nyingine za pumu: salbutamol puffs 2 dakika 10-15 kabla ya mazoezi, pamoja na joto polepole. Epuka kukimbia nje katika hewa baridi kavu bila kitambaa cha kulinda. Kuogelea katika madimbwi yenye chlorine vizuri mara nyingi ni shughuli inayovumiliwa vizuri zaidi. Kwa dalili zinazochochewa na mazoezi kwa mgonjwa anayejulikana ana pumu: panda controller — lengo ni kwa mazoezi kujihisi kama mazoezi, sio kama shambulizi la pumu linalosubiri kutokea. Baada ya wiki 2-4 za udhibiti bora, dalili nyingi za mazoezi huyeyuka. Ikiwa dalili zinaendelea licha ya udhibiti mzuri na matibabu ya kabla, fikiria kuongeza leukotriene receptor antagonist au kupeleka kwa mapitio ya mtaalamu.',
      sw_mtaa: 'Kwa isolated exercise-induced bronchospasm without other asthma features: salbutamol puffs 2 10-15 minutes kabla ya exercise, plus warm-up. Avoid running outdoors katika cold dry air without protective scarf. Swimming katika well-chlorinated pools mara nyingi ni best-tolerated activity. Kwa exercise-induced symptoms katika patient na known asthma: step up controller — goal ni kwa exercise kujihisi kama exercise, sio kama asthma attack inayosubiri kutokea. Baada ya wiki 2-4 za better control, most exercise symptoms zinamelt away. Ikiwa symptoms zinaendelea despite good control na pre-treatment, consider kuongeza leukotriene receptor antagonist au kureferring kwa specialist review.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Wheeze that does not settle after stopping exercise — treat as exacerbation, take reliever, do not continue activity',
          sw: 'Wheeze ambayo haitulii baada ya kusimama mazoezi — tibu kama exacerbation, chukua reliever, usiendelee na shughuli',
          sw_mtaa: 'Wheeze ambayo haisettle baada ya kusimama exercise — treat kama exacerbation, chukua reliever, usiendelee na activity',
        },
        urgency: 'soon',
      },
      {
        sign: {
          en: 'Collapse during or after exercise — could be severe asthma OR another cause (cardiac, heat stroke); emergency assessment',
          sw: 'Kuanguka wakati au baada ya mazoezi — inaweza kuwa pumu kali AU sababu nyingine (moyo, heat stroke); tathmini ya dharura',
          sw_mtaa: 'Collapse wakati au baada ya exercise — inaweza kuwa severe asthma AU another cause (cardiac, heat stroke); emergency assessment',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Review at 4-6 weeks after starting pre-treatment to see if exercise tolerance has improved. If isolated, sport can continue freely with pre-treatment. If part of broader uncontrolled asthma, follow the persistent asthma trajectory.',
      sw: 'Mapitio katika wiki 4-6 baada ya kuanza matibabu ya kabla kuona kama uvumilivu wa mazoezi umeboresha. Ikiwa pekee, mchezo unaweza kuendelea kwa uhuru na matibabu ya kabla. Ikiwa sehemu ya pumu pana isiyodhibitiwa, fuata njia ya pumu ya kudumu.',
      sw_mtaa: 'Review at 4-6 weeks baada ya kuanza pre-treatment kuona kama exercise tolerance imeimprove. Ikiwa isolated, sport inaweza kuendelea freely na pre-treatment. Ikiwa sehemu ya broader uncontrolled asthma, fuata persistent asthma trajectory.',
    },
    sources: [src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },
];
