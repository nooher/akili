/**
 * Heart Failure — Variants (Phase 11)
 *
 * 5 variants:
 *   • hfref — HF with reduced ejection fraction (foundation-four standard)
 *   • hfpef — HF with preserved ejection fraction
 *   • acute_decompensated_hf — flare/admission pattern
 *   • peripartum_cardiomyopathy — Tanzania-critical maternal cross-ref
 *   • rheumatic_heart_disease_hf — RHD-driven, valvular HF
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const HEART_FAILURE_VARIANTS: ConditionVariant[] = [
  {
    id: 'hfref',
    severity: 'complicated',
    population: 'adult',
    label: { en: 'HFrEF — heart failure with reduced ejection fraction', sw: 'HFrEF — kushindwa kwa moyo na ejection fraction iliyopungua' },
    presentation: {
      en: 'Echocardiogram shows ejection fraction below 40% — the heart muscle is weak and unable to squeeze normally. Patients have classic congestion symptoms (breathlessness, orthopnoea, ankle swelling) with reduced exercise tolerance. Most common in long-standing hypertension, dilated cardiomyopathy (idiopathic, HIV, alcohol, peripartum), or after myocardial infarction.',
      sw: 'Echocardiogram inaonyesha ejection fraction chini ya 40% — misuli ya moyo ni dhaifu na haiwezi kukamua kwa kawaida. Wagonjwa wana dalili za classic za congestion (kushindwa kupumua, orthopnoea, uvimbe wa vifundo) na uvumilivu wa mazoezi uliopungua. Mara nyingi katika shinikizo la juu la muda mrefu, dilated cardiomyopathy (idiopathic, VVU, pombe, peripartum), au baada ya myocardial infarction.',
      sw_mtaa: 'Echocardiogram inaonyesha ejection fraction chini ya 40% — heart muscle ni weak na haiwezi kusqueeze normally. Wagonjwa wana classic congestion symptoms (breathlessness, orthopnoea, ankle swelling) na reduced exercise tolerance. Most common katika long-standing hypertension, dilated cardiomyopathy (idiopathic, HIV, alcohol, peripartum), au baada ya myocardial infarction.',
    },
    recognitionSigns: [
      { en: 'EF < 40% on echocardiogram', sw: 'EF < 40% kwenye echocardiogram', sw_mtaa: 'EF < 40% kwenye echocardiogram' },
      { en: 'Orthopnoea (breathlessness lying flat) and PND (waking at night gasping)', sw: 'Orthopnoea (kushindwa kupumua kulala chini) na PND (kuamka usiku ukikorota)', sw_mtaa: 'Orthopnoea (breathlessness lying flat) na PND (kuamka usiku gasping)' },
      { en: 'Bilateral ankle oedema, raised JVP, third heart sound (S3)', sw: 'Uvimbe wa pande zote wa vifundo, JVP iliyoinuliwa, sauti ya tatu ya moyo (S3)', sw_mtaa: 'Bilateral ankle oedema, raised JVP, third heart sound (S3)' },
    ],
    treatmentJourney: {
      en: 'Foundation four, all titrated up to target doses unless contraindicated: ACE-i or ARB (or ARNI where available), beta-blocker (carvedilol/bisoprolol/metoprolol succinate), MRA (spironolactone/eplerenone), SGLT2 inhibitor (dapagliflozin/empagliflozin). Add loop diuretic (furosemide) for congestion symptoms — not part of mortality benefit, but symptom relief. Treat underlying cause: BP control, ART for HIV, abstinence in alcoholic CM. Cardiac rehabilitation. Specialist referral for ICD/CRT consideration when EF remains < 35% despite optimised therapy.',
      sw: 'Foundation four, zote zinatitrated up hadi target doses isipokuwa zime-contraindicated: ACE-i au ARB (au ARNI pale inapopatikana), beta-blocker (carvedilol/bisoprolol/metoprolol succinate), MRA (spironolactone/eplerenone), SGLT2 inhibitor (dapagliflozin/empagliflozin). Ongeza loop diuretic (furosemide) kwa congestion symptoms — sio sehemu ya mortality benefit, lakini symptom relief. Tibu underlying cause: BP control, ART kwa VVU, abstinence katika alcoholic CM. Cardiac rehabilitation. Specialist referral kwa ICD/CRT consideration wakati EF inabaki < 35% licha ya optimised therapy.',
      sw_mtaa: 'Foundation four, zote titrated up hadi target doses unless contraindicated: ACE-i au ARB (au ARNI pale inapopatikana), beta-blocker (carvedilol/bisoprolol/metoprolol succinate), MRA (spironolactone/eplerenone), SGLT2 inhibitor (dapagliflozin/empagliflozin). Ongeza loop diuretic (furosemide) kwa congestion symptoms — sio sehemu ya mortality benefit, lakini symptom relief. Treat underlying cause: BP control, ART kwa HIV, abstinence katika alcoholic CM. Cardiac rehabilitation. Specialist referral kwa ICD/CRT consideration wakati EF inabaki < 35% despite optimised therapy.',
    },
    dangerSigns: [
      { sign: { en: 'Breathless at rest, pink frothy sputum — acute pulmonary oedema', sw: 'Kushindwa kupumua wakati wa kupumzika, makohozi ya povu ya pink — pulmonary oedema ya papo hapo', sw_mtaa: 'Breathless at rest, pink frothy sputum — acute pulmonary oedema' }, urgency: 'emergency' },
      { sign: { en: 'Syncope or near-syncope — possible arrhythmia', sw: 'Syncope au karibu syncope — arrhythmia inawezekana', sw_mtaa: 'Syncope au near-syncope — possible arrhythmia' }, urgency: 'emergency' },
    ],
    followUp: { en: 'Monthly review during titration phase, then 3-monthly when stable. Annual echo. Continuous adherence support.', sw: 'Mapitio kila mwezi wakati wa titration, kisha kila miezi 3 inapokuwa thabiti. Echo ya kila mwaka. Msaada wa ufuasi unaoendelea.', sw_mtaa: 'Monthly review wakati wa titration, kisha 3-monthly inapokuwa stable. Annual echo. Continuous adherence support.' },
    sources: [src('WHO_HEARTS_2023'), src('WHO_PEN_2020'), src('NTLG_STG_2023')],
  },

  {
    id: 'hfpef',
    severity: 'complicated',
    population: 'adult',
    label: { en: 'HFpEF — heart failure with preserved ejection fraction', sw: 'HFpEF — kushindwa kwa moyo na ejection fraction iliyohifadhiwa' },
    presentation: {
      en: 'Echocardiogram shows ejection fraction ≥ 50% but the heart is stiff and cannot relax to fill normally. Common in older patients with long-standing hypertension, diabetes, obesity, or atrial fibrillation. Symptoms are identical to HFrEF — breathlessness, fatigue, swelling — but the foundation-four does not apply the same way. Diagnosis requires the right symptoms PLUS echo evidence of diastolic dysfunction or elevated left atrial pressure.',
      sw: 'Echocardiogram inaonyesha ejection fraction ≥ 50% lakini moyo ni stiff na hauwezi kurelax kujaa normally. Kawaida kwa wagonjwa wakubwa na long-standing hypertension, kisukari, kunenepa, au atrial fibrillation. Symptoms ni identical na HFrEF — breathlessness, fatigue, swelling — lakini foundation-four haitumiki kwa same way. Diagnosis inahitaji right symptoms PLUS echo evidence ya diastolic dysfunction au elevated left atrial pressure.',
      sw_mtaa: 'Echocardiogram inaonyesha ejection fraction ≥ 50% lakini heart ni stiff na haiwezi kurelax kujaa normally. Common kwa older patients na long-standing hypertension, diabetes, obesity, au atrial fibrillation. Symptoms ni identical na HFrEF — breathlessness, fatigue, swelling — lakini foundation-four haitumiki same way. Diagnosis inahitaji right symptoms PLUS echo evidence ya diastolic dysfunction au elevated left atrial pressure.',
    },
    recognitionSigns: [
      { en: 'EF ≥ 50% on echocardiogram with classic HF symptoms', sw: 'EF ≥ 50% kwenye echocardiogram na classic HF symptoms', sw_mtaa: 'EF ≥ 50% kwenye echocardiogram na classic HF symptoms' },
      { en: 'Left atrial enlargement, left ventricular hypertrophy on echo', sw: 'Left atrial enlargement, left ventricular hypertrophy kwenye echo', sw_mtaa: 'Left atrial enlargement, left ventricular hypertrophy kwenye echo' },
      { en: 'Multiple comorbidities — HTN, DM, obesity, AF, CKD', sw: 'Comorbidities nyingi — HTN, DM, kunenepa, AF, CKD', sw_mtaa: 'Multiple comorbidities — HTN, DM, obesity, AF, CKD' },
    ],
    treatmentJourney: {
      en: 'SGLT2 inhibitor is now the cornerstone with evidence of mortality benefit in HFpEF. Loop diuretic for congestion. Aggressive treatment of underlying conditions: BP control to target, glycaemic control, weight reduction, rate control or rhythm control in AF. ACE-i/ARB and MRA may help but evidence is weaker than in HFrEF. Avoid CCBs with negative inotropy (verapamil, diltiazem) in advanced disease. Pulmonary rehab and exercise improve outcomes.',
      sw: 'SGLT2 inhibitor sasa ni msingi na ushahidi wa faida ya vifo katika HFpEF. Loop diuretic kwa congestion. Aggressive treatment ya underlying conditions: BP control kwa target, glycaemic control, kupunguza uzito, rate control au rhythm control katika AF. ACE-i/ARB na MRA zinaweza kusaidia lakini evidence ni weaker kuliko katika HFrEF. Epuka CCBs zenye negative inotropy (verapamil, diltiazem) katika advanced disease. Pulmonary rehab na exercise zinaimprove outcomes.',
      sw_mtaa: 'SGLT2 inhibitor sasa ni cornerstone na evidence ya mortality benefit katika HFpEF. Loop diuretic kwa congestion. Aggressive treatment ya underlying conditions: BP control to target, glycaemic control, weight reduction, rate control au rhythm control katika AF. ACE-i/ARB na MRA zinaweza kusaidia lakini evidence ni weaker kuliko katika HFrEF. Epuka CCBs zenye negative inotropy (verapamil, diltiazem) katika advanced disease. Pulmonary rehab na exercise zinaimprove outcomes.',
    },
    dangerSigns: [
      { sign: { en: 'Rapid AF with hypotension — needs urgent rate/rhythm control', sw: 'Rapid AF na hypotension — inahitaji rate/rhythm control ya haraka', sw_mtaa: 'Rapid AF na hypotension — inahitaji urgent rate/rhythm control' }, urgency: 'emergency' },
    ],
    followUp: { en: 'Quarterly review; annual echo; tight comorbidity control.', sw: 'Mapitio ya robo; echo ya kila mwaka; tight comorbidity control.', sw_mtaa: 'Quarterly review; annual echo; tight comorbidity control.' },
    sources: [src('WHO_HEARTS_2023'), src('NTLG_STG_2023')],
  },

  {
    id: 'acute_decompensated_hf',
    severity: 'critical',
    population: 'adult',
    label: { en: 'Acute Decompensated Heart Failure — needs admission', sw: 'Kushindwa Kwa Moyo Kwa Papo Hapo — anahitaji kulazwa' },
    presentation: {
      en: 'Sudden worsening of HF symptoms over hours to days — severe breathlessness at rest, orthopnoea so bad the patient sits forward, sometimes pink frothy sputum (pulmonary oedema). Often a trigger: missed medicines, dietary salt indiscretion, infection (especially chest), new arrhythmia (AF with fast rate), acute MI, uncontrolled BP, NSAIDs, pregnancy. Examination: tachypnoea, hypoxia, raised JVP, third heart sound, bilateral crepitations, peripheral oedema.',
      sw: 'Kuzidi kwa ghafla kwa HF symptoms kwa masaa hadi siku — breathlessness kali at rest, orthopnoea mbaya sana patient anasit forward, wakati mwingine pink frothy sputum (pulmonary oedema). Mara nyingi trigger: missed medicines, dietary salt indiscretion, infection (especially chest), new arrhythmia (AF na fast rate), acute MI, uncontrolled BP, NSAIDs, pregnancy. Examination: tachypnoea, hypoxia, raised JVP, third heart sound, bilateral crepitations, peripheral oedema.',
      sw_mtaa: 'Sudden worsening ya HF symptoms over masaa to siku — severe breathlessness at rest, orthopnoea mbaya sana patient anasit forward, wakati mwingine pink frothy sputum (pulmonary oedema). Mara nyingi trigger: missed medicines, dietary salt indiscretion, infection (especially chest), new arrhythmia (AF na fast rate), acute MI, uncontrolled BP, NSAIDs, pregnancy. Examination: tachypnoea, hypoxia, raised JVP, third heart sound, bilateral crepitations, peripheral oedema.',
    },
    recognitionSigns: [
      { en: 'Severe breathlessness at rest, sitting forward to breathe', sw: 'Breathlessness kali at rest, anakaa mbele kupumua', sw_mtaa: 'Severe breathlessness at rest, anakaa mbele kupumua' },
      { en: 'Pink frothy sputum, drowning sensation', sw: 'Pink frothy sputum, hisia ya kuzama', sw_mtaa: 'Pink frothy sputum, drowning sensation' },
      { en: 'SpO2 falling, RR > 30, sweating, anxious', sw: 'SpO2 inashuka, RR > 30, jasho, anxious', sw_mtaa: 'SpO2 inashuka, RR > 30, sweating, anxious' },
    ],
    treatmentJourney: {
      en: 'Admit. Sit patient up. Oxygen titrated to SpO2 ≥ 94% (lower in known COPD — see Phase 10). IV furosemide 40-80 mg (higher if on chronic loop diuretic — usually 2.5x oral dose). Identify and treat trigger: BP control, infection, arrhythmia, MI, missed meds. Hold and review ACE-i/MRA only if hypotensive or AKI. NIV (CPAP/BiPAP) for severe pulmonary oedema if available. Cardiology referral. Once stabilised: re-introduce foundation four, intensify outpatient follow-up. Every admission worsens prognosis — prevention is treatment.',
      sw: 'Laze. Mkalishe patient. Oksijeni titrated to SpO2 ≥ 94% (chini katika known COPD — angalia Phase 10). IV furosemide 40-80 mg (higher ikiwa on chronic loop diuretic — kawaida 2.5x oral dose). Tambua na tibu trigger: BP control, infection, arrhythmia, MI, missed meds. Shikilia na review ACE-i/MRA tu ikiwa hypotensive au AKI. NIV (CPAP/BiPAP) kwa severe pulmonary oedema ikiwa inapatikana. Cardiology referral. Pindi imestabilised: re-introduce foundation four, intensify outpatient follow-up. Kila admission inaworsen prognosis — prevention ni treatment.',
      sw_mtaa: 'Admit. Sit patient up. Oxygen titrated to SpO2 ≥ 94% (lower katika known COPD — angalia Phase 10). IV furosemide 40-80 mg (higher ikiwa on chronic loop diuretic — kawaida 2.5x oral dose). Tambua na treat trigger: BP control, infection, arrhythmia, MI, missed meds. Shikilia na review ACE-i/MRA tu ikiwa hypotensive au AKI. NIV (CPAP/BiPAP) kwa severe pulmonary oedema ikiwa inapatikana. Cardiology referral. Once stabilised: re-introduce foundation four, intensify outpatient follow-up. Kila admission inaworsen prognosis — prevention ni treatment.',
    },
    dangerSigns: [
      { sign: { en: 'Hypotension, cold peripheries, confusion — cardiogenic shock', sw: 'Hypotension, viungo baridi, mkanganyiko — cardiogenic shock', sw_mtaa: 'Hypotension, cold peripheries, confusion — cardiogenic shock' }, urgency: 'emergency' },
      { sign: { en: 'GCS dropping, exhaustion — respiratory failure imminent', sw: 'GCS inashuka, uchovu — respiratory failure imminent', sw_mtaa: 'GCS inashuka, exhaustion — respiratory failure imminent' }, urgency: 'emergency' },
    ],
    followUp: { en: 'Inpatient daily; outpatient review 1-2 weeks post-discharge with discharge bundle.', sw: 'Inpatient kila siku; outpatient review 1-2 weeks post-discharge na discharge bundle.', sw_mtaa: 'Inpatient kila siku; outpatient review 1-2 weeks post-discharge na discharge bundle.' },
    sources: [src('WHO_HEARTS_2023'), src('NTLG_STG_2023'), src('MUHIMBILI_PROTOCOLS')],
  },

  {
    id: 'peripartum_cardiomyopathy',
    severity: 'critical',
    population: 'postpartum',
    label: { en: 'Peripartum Cardiomyopathy (PPCM)', sw: 'Cardiomyopathy ya Peripartum (PPCM)' },
    presentation: {
      en: 'Heart failure presenting in the last month of pregnancy or first 5 months post-delivery, in a woman with no previous heart disease and no other identified cause. EF typically reduced below 45%. The classic mistake is dismissing the symptoms — breathlessness, fatigue, leg swelling — as "normal post-delivery." The clue is the trajectory: symptoms WORSEN rather than improve in the weeks after delivery. Risk factors: hypertension/preeclampsia, twin pregnancy, older maternal age, African ancestry (significantly higher risk in Sub-Saharan Africa).',
      sw: 'Kushindwa kwa moyo kunajitokeza katika mwezi wa mwisho wa mimba au miezi 5 ya kwanza baada ya kuzaa, kwa mwanamke asiyekuwa na ugonjwa wa moyo wa awali na hakuna sababu nyingine iliyotambuliwa. EF kawaida imepunguzwa chini ya 45%. Kosa la classic ni kuvunja dalili — breathlessness, fatigue, leg swelling — kama "normal post-delivery." Clue ni trajectory: symptoms zinaWORSE badala ya kuimprove katika weeks baada ya delivery. Risk factors: hypertension/preeclampsia, twin pregnancy, older maternal age, African ancestry (significantly higher risk Sub-Saharan Africa).',
      sw_mtaa: 'Heart failure inapresent katika last month ya pregnancy au first 5 months post-delivery, kwa mwanamke asiyekuwa na previous heart disease na hakuna other identified cause. EF typically imereduced chini ya 45%. Classic mistake ni kudismiss symptoms — breathlessness, fatigue, leg swelling — kama "normal post-delivery." Clue ni trajectory: symptoms zinaWORSEN badala ya kuimprove katika weeks baada ya delivery. Risk factors: hypertension/preeclampsia, twin pregnancy, older maternal age, African ancestry (significantly higher risk Sub-Saharan Africa).',
    },
    recognitionSigns: [
      { en: 'New breathlessness, orthopnoea, or fatigue in last month of pregnancy or first 5 months post-delivery', sw: 'Breathlessness mpya, orthopnoea, au uchovu katika last month ya mimba au first 5 months post-delivery', sw_mtaa: 'New breathlessness, orthopnoea, au fatigue katika last month ya pregnancy au first 5 months post-delivery' },
      { en: 'Symptoms getting WORSE not better in the weeks after birth', sw: 'Dalili zinaWORSE sio bora katika weeks baada ya kuzaliwa', sw_mtaa: 'Symptoms zinaWORSEN sio better katika weeks baada ya birth' },
      { en: 'EF < 45% on echocardiogram', sw: 'EF < 45% kwenye echocardiogram', sw_mtaa: 'EF < 45% kwenye echocardiogram' },
    ],
    treatmentJourney: {
      en: 'Admit if breathless at rest. Standard HF management with one key adjustment: ACE-i and ARB are TERATOGENIC in pregnancy — replace with hydralazine + nitrate during pregnancy, then switch to ACE-i/ARB after delivery and when not breastfeeding (or use ACE-i compatible with breastfeeding: enalapril, captopril). Beta-blocker is safe (metoprolol, bisoprolol). Loop diuretic for congestion. Anticoagulation if EF < 35% — risk of LV thrombus. Bromocriptine (specialist decision) may speed recovery. About 50% recover fully; future pregnancy carries significant recurrence risk — cardiology counselling mandatory.',
      sw: 'Laze ikiwa breathless at rest. Standard HF management na adjustment moja muhimu: ACE-i na ARB ni TERATOGENIC katika mimba — badilisha na hydralazine + nitrate wakati wa mimba, kisha switch to ACE-i/ARB baada ya delivery na wakati hanyonyeshi (au tumia ACE-i compatible na breastfeeding: enalapril, captopril). Beta-blocker ni safe (metoprolol, bisoprolol). Loop diuretic kwa congestion. Anticoagulation ikiwa EF < 35% — risk ya LV thrombus. Bromocriptine (specialist decision) inaweza kuspeed recovery. Karibu 50% wanarecover fully; future pregnancy inacarry significant recurrence risk — cardiology counselling mandatory.',
      sw_mtaa: 'Admit ikiwa breathless at rest. Standard HF management na one key adjustment: ACE-i na ARB ni TERATOGENIC katika pregnancy — replace na hydralazine + nitrate wakati wa pregnancy, kisha switch to ACE-i/ARB baada ya delivery na wakati not breastfeeding (au tumia ACE-i compatible na breastfeeding: enalapril, captopril). Beta-blocker ni safe (metoprolol, bisoprolol). Loop diuretic kwa congestion. Anticoagulation ikiwa EF < 35% — risk ya LV thrombus. Bromocriptine (specialist decision) inaweza kuspeed recovery. About 50% wanarecover fully; future pregnancy ina significant recurrence risk — cardiology counselling mandatory.',
    },
    dangerSigns: [
      { sign: { en: 'Severe breathlessness or chest pain post-delivery', sw: 'Breathlessness kali au chest pain post-delivery', sw_mtaa: 'Severe breathlessness au chest pain post-delivery' }, urgency: 'emergency' },
      { sign: { en: 'Sudden one-sided weakness or speech change — possible embolic stroke from LV thrombus', sw: 'Kushindwa kwa upande mmoja ghafla au mabadiliko ya speech — embolic stroke kutoka LV thrombus inawezekana', sw_mtaa: 'Sudden one-sided weakness au speech change — possible embolic stroke kutoka LV thrombus' }, urgency: 'emergency' },
    ],
    followUp: { en: 'Monthly echo until recovery or stabilisation. Long-term cardiology follow-up. Family planning counselling.', sw: 'Monthly echo hadi recovery au stabilisation. Long-term cardiology follow-up. Family planning counselling.', sw_mtaa: 'Monthly echo hadi recovery au stabilisation. Long-term cardiology follow-up. Family planning counselling.' },
    sources: [src('MOH_TZ_MATERNAL_2024'), src('WHO_HEARTS_2023'), src('NTLG_STG_2023')],
  },

  {
    id: 'rheumatic_heart_disease_hf',
    severity: 'complicated',
    population: 'adult',
    label: { en: 'Heart Failure from Rheumatic Heart Disease', sw: 'Kushindwa kwa Moyo Kutoka Ugonjwa wa Moyo wa Rheumatic' },
    presentation: {
      en: 'A patient — often young or middle-aged, more commonly female — with HF symptoms and a history of childhood "rheumatic fever," "sore throat that affected the heart," or simply recurrent breathlessness since adolescence. Examination often reveals characteristic valvular murmurs: opening snap with mid-diastolic rumble (mitral stenosis), pansystolic murmur radiating to axilla (mitral regurgitation), or early-diastolic decrescendo (aortic regurgitation). Echocardiogram confirms structural valve damage.',
      sw: 'Mgonjwa — mara nyingi mdogo au wa kati, more commonly female — na HF symptoms na historia ya "rheumatic fever" ya utotoni, "koo iliyoathiri moyo," au simply recurrent breathlessness tangu adolescence. Examination mara nyingi inareveal characteristic valvular murmurs: opening snap na mid-diastolic rumble (mitral stenosis), pansystolic murmur radiating to axilla (mitral regurgitation), au early-diastolic decrescendo (aortic regurgitation). Echocardiogram inaconfirm structural valve damage.',
      sw_mtaa: 'Patient — mara nyingi young au middle-aged, more commonly female — na HF symptoms na history ya childhood "rheumatic fever," "sore throat iliyoaffect heart," au simply recurrent breathlessness tangu adolescence. Examination mara nyingi inareveal characteristic valvular murmurs: opening snap na mid-diastolic rumble (mitral stenosis), pansystolic murmur radiating to axilla (mitral regurgitation), au early-diastolic decrescendo (aortic regurgitation). Echocardiogram inaconfirm structural valve damage.',
    },
    recognitionSigns: [
      { en: 'Characteristic valvular murmur on auscultation', sw: 'Valvular murmur ya characteristic kwenye auscultation', sw_mtaa: 'Characteristic valvular murmur kwenye auscultation' },
      { en: 'History of rheumatic fever in childhood, or repeated sore throats followed by chest symptoms', sw: 'Historia ya rheumatic fever utotoni, au sore throats za mara kwa mara ikifuatiwa na chest symptoms', sw_mtaa: 'History ya rheumatic fever childhood, au repeated sore throats ikifuatiwa na chest symptoms' },
      { en: 'Atrial fibrillation often present (especially with mitral stenosis)', sw: 'Atrial fibrillation mara nyingi present (especially na mitral stenosis)', sw_mtaa: 'Atrial fibrillation mara nyingi present (especially na mitral stenosis)' },
    ],
    treatmentJourney: {
      en: 'Standard HF foundation drugs if EF reduced. Anticoagulation for AF (CHA2DS2-VASc essentially mandatory in valvular AF). Long-term penicillin prophylaxis: benzathine penicillin G 1.2 MU IM every 3-4 weeks until at least age 21 OR for at least 10 years after last rheumatic fever attack OR lifelong if carditis with persistent valvular disease. Cardiology referral for valve assessment — surgical valve repair or replacement may transform prognosis. Dental hygiene and antibiotic prophylaxis before dental work. Family screening for undiagnosed RHD (echo screening of school-age siblings).',
      sw: 'Standard HF foundation drugs ikiwa EF imereduced. Anticoagulation kwa AF (CHA2DS2-VASc essentially mandatory katika valvular AF). Long-term penicillin prophylaxis: benzathine penicillin G 1.2 MU IM kila wiki 3-4 hadi at least age 21 AU kwa at least 10 years baada ya last rheumatic fever attack AU lifelong ikiwa carditis na persistent valvular disease. Cardiology referral kwa valve assessment — surgical valve repair au replacement inaweza kutransform prognosis. Dental hygiene na antibiotic prophylaxis kabla ya dental work. Family screening kwa undiagnosed RHD (echo screening ya school-age siblings).',
      sw_mtaa: 'Standard HF foundation drugs ikiwa EF reduced. Anticoagulation kwa AF (CHA2DS2-VASc essentially mandatory katika valvular AF). Long-term penicillin prophylaxis: benzathine penicillin G 1.2 MU IM kila wiki 3-4 hadi at least age 21 AU kwa at least 10 years baada ya last rheumatic fever attack AU lifelong ikiwa carditis na persistent valvular disease. Cardiology referral kwa valve assessment — surgical valve repair au replacement inaweza kutransform prognosis. Dental hygiene na antibiotic prophylaxis kabla ya dental work. Family screening kwa undiagnosed RHD (echo screening ya school-age siblings).',
    },
    dangerSigns: [
      { sign: { en: 'New stroke symptoms — embolic from AF or LA thrombus', sw: 'New stroke symptoms — embolic kutoka AF au LA thrombus', sw_mtaa: 'New stroke symptoms — embolic kutoka AF au LA thrombus' }, urgency: 'emergency' },
      { sign: { en: 'New fever with murmur change — possible infective endocarditis', sw: 'New fever na murmur change — possible infective endocarditis', sw_mtaa: 'New fever na murmur change — possible infective endocarditis' }, urgency: 'emergency' },
    ],
    followUp: { en: 'Cardiology yearly minimum; echo yearly. Lifelong penicillin prophylaxis adherence is the single highest-yield intervention.', sw: 'Cardiology kila mwaka minimum; echo kila mwaka. Lifelong penicillin prophylaxis adherence ni single highest-yield intervention.', sw_mtaa: 'Cardiology kila mwaka minimum; echo kila mwaka. Lifelong penicillin prophylaxis adherence ni single highest-yield intervention.' },
    sources: [src('NTLG_STG_2023'), src('MUHIMBILI_PROTOCOLS'), src('WHO_HEARTS_2023')],
  },
];
