/**
 * Sickle Cell Disease — Variants (Phase 13)
 *
 * Two highest-impact emergency variants:
 *   • vaso_occlusive_crisis — the painful crisis (commonest hospital presentation)
 *   • acute_chest_syndrome — the highest-mortality acute SCD complication
 *
 * Other patterns (splenic sequestration, aplastic crisis, priapism,
 * stroke-in-SCD, chronic complications) are surfaced via warningTriggers
 * and whenToSeekCare in the parent file plus comorbidity cross-references
 * (stroke, ckd, pneumonia, maternal_care).
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const SICKLE_CELL_VARIANTS: ConditionVariant[] = [
  {
    id: 'vaso_occlusive_crisis',
    severity: 'complicated',
    population: 'adult',
    label: {
      en: 'Vaso-Occlusive Crisis — the sickle cell pain crisis',
      sw: 'Mzozo wa Kuziba Mishipa — mzozo wa maumivu wa selimundu',
    },
    presentation: {
      en: 'A known sickle cell patient developing deep, throbbing pain — most often in the long bones, back, chest, or abdomen, sometimes multiple sites — that builds over hours. The patient may identify a trigger (cold, infection, dehydration, stress, recent travel) or none. The pain is usually similar in character to their previous crises but may be worse. Vital signs may show fever, tachycardia, mild hypoxia; exam is often non-specific. The crisis can last from hours to a week. Many can be managed at home with hydration and oral analgesia; severe crises need hospital admission.',
      sw: 'Mgonjwa anayejulikana wa selimundu anayepata maumivu makali, ya kupiga — mara nyingi katika mifupa mirefu, mgongoni, kifuani, au tumboni, wakati mwingine maeneo mengi — yanayojengeka kwa masaa. Mgonjwa anaweza kutambua kichocheo (baridi, maambukizi, kukosa maji, mfadhaiko, safari ya hivi karibuni) au hakuna. Maumivu kawaida hufanana na mzozo wao wa awali lakini yanaweza kuwa mabaya zaidi. Ishara muhimu zinaweza kuonyesha homa, tachycardia, hypoxia kidogo; uchunguzi mara nyingi sio maalum. Mzozo unaweza kudumu masaa hadi wiki. Wengi wanaweza kusimamiwa nyumbani na maji na analgesia ya kumeza; mzozo mkali unahitaji kulazwa hospitalini.',
      sw_mtaa: 'Known sickle cell patient anayedevelopa deep, throbbing pain — mara nyingi katika long bones, back, chest, au abdomen, wakati mwingine multiple sites — inayobuild over hours. Patient anaweza kuidentify trigger (cold, infection, dehydration, stress, recent travel) au hakuna. Pain kawaida ni similar character na previous crises lakini inaweza kuwa worse. Vital signs zinaweza kuonyesha fever, tachycardia, mild hypoxia; exam mara nyingi non-specific. Crisis inaweza kudumu hours hadi week. Many wanaweza kumanaged nyumbani na hydration na oral analgesia; severe crises zinahitaji hospital admission.',
    },
    recognitionSigns: [
      { en: 'Deep, throbbing or aching pain in bones, back, chest, or abdomen', sw: 'Maumivu makali, ya kupiga au ya kuuma katika mifupa, mgongoni, kifuani, au tumboni', sw_mtaa: 'Deep, throbbing au aching pain katika bones, back, chest, au abdomen' },
      { en: 'Similar pattern to the patient\'s previous crises', sw: 'Muundo sawa na mzozo wa awali wa mgonjwa', sw_mtaa: 'Similar pattern kama previous crises za patient' },
      { en: 'Often a recognisable trigger: cold, dehydration, infection, stress', sw: 'Mara nyingi kichocheo kinachotambulika: baridi, kukosa maji, maambukizi, mfadhaiko', sw_mtaa: 'Mara nyingi recognisable trigger: cold, dehydration, infection, stress' },
      { en: 'Fever may be present — always investigate for infection', sw: 'Homa inaweza kuwepo — daima chunguza maambukizi', sw_mtaa: 'Fever inaweza kuwepo — always investigate for infection' },
    ],
    treatmentJourney: {
      en: 'Step one is always to assess severity and exclude an emergency mimic (acute chest syndrome, stroke, splenic sequestration, sepsis). Mild crises: oral hydration (3 L/day in an adult, age-appropriate in a child), warmth, oral analgesia stepped up the WHO ladder (paracetamol → NSAID with caution → weak opioid → strong opioid if needed), treat any infection. Moderate-severe crises need hospital admission: IV fluids (cautious — fluid overload worsens acute chest syndrome), parenteral opioid analgesia titrated to effect, oxygen if hypoxic, treat infection. Avoid blood transfusion in uncomplicated crisis — it doesn\'t help. The aim is to break the pain cycle, restore hydration, treat any precipitant. Most crises resolve in 3-7 days.',
      sw: 'Hatua ya kwanza daima ni kutathmini ukali na kutoa mwigaji wa dharura (ugonjwa wa kifua wa papo hapo, kiharusi, splenic sequestration, sepsis). Mzozo mdogo: maji ya kumeza (lita 3/siku kwa mtu mzima, kulingana na umri kwa mtoto), joto, analgesia ya kumeza imepanda ngazi ya WHO (paracetamol → NSAID kwa uangalifu → opioid dhaifu → opioid kali ikihitajika), tibu maambukizi yoyote. Mzozo wa wastani-mkali unahitaji kulazwa hospitalini: maji ya IV (kwa uangalifu — ujazo wa maji huzidisha ugonjwa wa kifua wa papo hapo), analgesia ya opioid kwa njia ya mishipa iliyorekebishwa hadi athari, oksijeni ikiwa hypoxic, tibu maambukizi. Epuka kuongezewa damu katika mzozo usio na matatizo — haisaidii. Lengo ni kuvunja mzunguko wa maumivu, kurejesha hidratisheni, kutibu kichocheo chochote. Mzozo mwingi hutatuliwa katika siku 3-7.',
      sw_mtaa: 'Step one daima ni kuassess severity na exclude emergency mimic (acute chest syndrome, stroke, splenic sequestration, sepsis). Mild crises: oral hydration (lita 3/day kwa adult, age-appropriate kwa child), warmth, oral analgesia stepped up WHO ladder (paracetamol → NSAID kwa caution → weak opioid → strong opioid ikihitajika), treat infection yoyote. Moderate-severe crises zinahitaji hospital admission: IV fluids (cautious — fluid overload inaworsen acute chest syndrome), parenteral opioid analgesia titrated to effect, oxygen ikiwa hypoxic, treat infection. Epuka blood transfusion katika uncomplicated crisis — haisaidii. Aim ni kuvunja pain cycle, kurejesha hydration, kutreating precipitant yoyote. Most crises zinatatuliwa katika siku 3-7.',
    },
    dangerSigns: [
      { sign: { en: 'New chest pain, breathlessness, cough, falling SpO2 — possible acute chest syndrome', sw: 'Maumivu mapya ya kifua, kushindwa kupumua, kikohozi, SpO2 inashuka — uwezekano wa ugonjwa wa kifua wa papo hapo', sw_mtaa: 'New chest pain, breathlessness, cough, falling SpO2 — possible acute chest syndrome' }, urgency: 'emergency' },
      { sign: { en: 'Fever above 38.5°C, rigors, drowsiness — sepsis until proven otherwise', sw: 'Homa juu ya 38.5°C, kutetemeka, usingizi — sepsis hadi ithibitishwe vinginevyo', sw_mtaa: 'Fever above 38.5°C, rigors, drowsiness — sepsis until proven otherwise' }, urgency: 'emergency' },
      { sign: { en: 'New weakness or speech change — stroke risk is high in SCD especially in children', sw: 'Udhaifu mpya au mabadiliko ya kuongea — hatari ya kiharusi ni juu katika SCD hasa kwa watoto', sw_mtaa: 'New weakness au speech change — stroke risk ni high katika SCD especially watoto' }, urgency: 'emergency' },
    ],
    followUp: {
      en: 'After discharge, review at the sickle cell clinic within 2 weeks. Re-evaluate hydroxyurea adherence and dose, identify and address triggers, reinforce malaria prophylaxis, check vaccination status, update care plan.',
      sw: 'Baada ya kuondoka, mapitio katika kliniki ya selimundu ndani ya wiki 2. Tathmini tena ufuasi wa hydroxyurea na dose, tambua na shughulikia vichocheo, imarisha prophylaxis ya malaria, kagua hali ya chanjo, sasisha mpango wa huduma.',
      sw_mtaa: 'Baada ya discharge, review katika sickle cell clinic ndani ya wiki 2. Re-evaluate hydroxyurea adherence na dose, identify na address triggers, reinforce malaria prophylaxis, check vaccination status, update care plan.',
    },
    sources: [src('WHO_SICKLE_2024'), src('NORTAB_SICKLE_2023'), src('NTLG_STG_2023')],
  },

  {
    id: 'acute_chest_syndrome',
    severity: 'critical',
    population: 'adult',
    label: {
      en: 'Acute Chest Syndrome — the SCD respiratory emergency',
      sw: 'Ugonjwa wa Kifua wa Papo Hapo — dharura ya kupumua ya SCD',
    },
    presentation: {
      en: 'A sickle cell patient — often already admitted with a vaso-occlusive crisis — developing chest pain, fever, cough, breathlessness, and a new pulmonary infiltrate on chest X-ray. The mechanism is a combination of infection, fat embolism from infarcted bone marrow, hypoventilation from chest pain, and pulmonary infarction from in-situ sickling. Acute chest syndrome is the leading cause of death in adults with SCD and one of the leading causes in children. It can mimic ordinary pneumonia exactly but progresses faster and needs more aggressive management. Any SCD patient with chest symptoms is acute chest syndrome until proven otherwise.',
      sw: 'Mgonjwa wa selimundu — mara nyingi tayari amelazwa na mzozo wa kuziba mishipa — anayepata maumivu ya kifua, homa, kikohozi, kushindwa kupumua, na uwiano mpya wa mapafu kwenye X-ray ya kifua. Mfumo ni mchanganyiko wa maambukizi, fat embolism kutoka uboho wa mfupa uliokufa, hypoventilation kutoka maumivu ya kifua, na pulmonary infarction kutoka kupinda papo hapo. Ugonjwa wa kifua wa papo hapo ni sababu kuu ya kifo kwa watu wazima wenye SCD na mojawapo ya sababu kuu kwa watoto. Unaweza kuiga nimonia ya kawaida hasa lakini huendelea haraka na unahitaji usimamizi mkali zaidi. Mgonjwa yeyote wa SCD mwenye dalili za kifua ni ugonjwa wa kifua wa papo hapo hadi ithibitishwe vinginevyo.',
      sw_mtaa: 'Sickle cell patient — mara nyingi tayari amelazwa na vaso-occlusive crisis — anayedevelopa chest pain, fever, cough, breathlessness, na new pulmonary infiltrate kwenye chest X-ray. Mechanism ni combination ya infection, fat embolism kutoka infarcted bone marrow, hypoventilation kutoka chest pain, na pulmonary infarction kutoka in-situ sickling. Acute chest syndrome ni leading cause ya death katika adults wenye SCD na mojawapo ya leading causes katika watoto. Inaweza ku-mimic ordinary pneumonia exactly lakini inaprogress faster na inahitaji aggressive management zaidi. SCD patient yeyote na chest symptoms ni acute chest syndrome until proven otherwise.',
    },
    recognitionSigns: [
      { en: 'New chest pain (often pleuritic) in a sickle cell patient', sw: 'Maumivu mapya ya kifua (mara nyingi pleuritic) katika mgonjwa wa selimundu', sw_mtaa: 'New chest pain (mara nyingi pleuritic) katika sickle cell patient' },
      { en: 'Fever, cough, breathlessness — looks like pneumonia', sw: 'Homa, kikohozi, kushindwa kupumua — inaonekana kama nimonia', sw_mtaa: 'Fever, cough, breathlessness — inaonekana kama pneumonia' },
      { en: 'Falling SpO2 (often the earliest objective sign)', sw: 'SpO2 inashuka (mara nyingi ishara ya kwanza ya kibainifu)', sw_mtaa: 'Falling SpO2 (mara nyingi earliest objective sign)' },
      { en: 'New infiltrate on chest X-ray — required for the diagnosis', sw: 'Uwiano mpya kwenye X-ray ya kifua — inahitajika kwa utambuzi', sw_mtaa: 'New infiltrate kwenye chest X-ray — required kwa diagnosis' },
    ],
    treatmentJourney: {
      en: 'Admit. Broad-spectrum antibiotics covering pneumococcus and atypicals (ceftriaxone + macrolide is a common regimen). Oxygen to SpO2 ≥ 95%. Cautious IV fluids (over-hydration worsens it). Adequate but careful opioid analgesia (over-sedation causes hypoventilation). Incentive spirometry every hour while awake — one of the highest-yield interventions and often forgotten. Bronchodilators if wheezy. Blood transfusion — simple in mild-moderate cases, exchange transfusion in severe disease — is often required and significantly improves outcomes. Mechanical ventilation if respiratory failure. Specialist haematology input. Mortality is significant if treatment is delayed.',
      sw: 'Laze. Antibiotic za wigo mpana zinazofunika pneumococcus na atypicals (ceftriaxone + macrolide ni regimen ya kawaida). Oksijeni hadi SpO2 ≥ 95%. Maji ya IV kwa uangalifu (over-hydration huzidisha). Analgesia ya opioid ya kutosha lakini kwa uangalifu (over-sedation husababisha hypoventilation). Incentive spirometry kila saa ukiwa macho — mojawapo ya hatua za mavuno makubwa na mara nyingi husahaulika. Bronchodilator ikiwa wheezy. Kuongezewa damu — rahisi katika hali ndogo-wastani, kuongezewa kubadilishana katika ugonjwa mkali — mara nyingi inahitajika na inaboresha matokeo kwa kiasi kikubwa. Uingizaji hewa wa mitambo ikiwa kushindwa kupumua. Mchango wa mtaalam wa hematology. Vifo ni vingi ikiwa matibabu yamechelewa.',
      sw_mtaa: 'Admit. Broad-spectrum antibiotics zinazofunika pneumococcus na atypicals (ceftriaxone + macrolide ni common regimen). Oxygen hadi SpO2 ≥ 95%. Cautious IV fluids (over-hydration inaworsen). Adequate lakini careful opioid analgesia (over-sedation inasababisha hypoventilation). Incentive spirometry kila saa ukiwa macho — mojawapo ya highest-yield interventions na mara nyingi inasahaulika. Bronchodilators ikiwa wheezy. Blood transfusion — simple katika mild-moderate cases, exchange transfusion katika severe disease — mara nyingi inahitajika na inaimprove outcomes significantly. Mechanical ventilation ikiwa respiratory failure. Specialist haematology input. Mortality ni significant ikiwa treatment imedelayed.',
    },
    dangerSigns: [
      { sign: { en: 'Worsening SpO2 despite oxygen, rising respiratory rate, exhaustion — needs urgent escalation', sw: 'SpO2 inazidi licha ya oksijeni, kasi ya kupumua inapanda, uchovu — inahitaji escalation ya haraka', sw_mtaa: 'Worsening SpO2 despite oxygen, rising respiratory rate, exhaustion — needs urgent escalation' }, urgency: 'emergency' },
      { sign: { en: 'Confusion, drowsiness — hypoxia or hypercapnia', sw: 'Mkanganyiko, usingizi — hypoxia au hypercapnia', sw_mtaa: 'Confusion, drowsiness — hypoxia au hypercapnia' }, urgency: 'emergency' },
    ],
    followUp: {
      en: 'After recovery, review at sickle cell clinic; consider starting hydroxyurea if not already on it (ACS is a strong indication). Update vaccinations. Pulmonary function follow-up — some patients develop chronic lung disease after ACS.',
      sw: 'Baada ya kupona, mapitio katika kliniki ya selimundu; fikiria kuanza hydroxyurea ikiwa hajaitumia tayari (ACS ni ishara kali). Sasisha chanjo. Ufuatiliaji wa utendaji wa mapafu — wagonjwa wengine hupata ugonjwa sugu wa mapafu baada ya ACS.',
      sw_mtaa: 'Baada ya recovery, review katika sickle cell clinic; consider kuanza hydroxyurea ikiwa hajatumia tayari (ACS ni strong indication). Update vaccinations. Pulmonary function follow-up — patients wengine wanapata chronic lung disease baada ya ACS.',
    },
    sources: [src('WHO_SICKLE_2024'), src('NORTAB_SICKLE_2023'), src('WHO_OXYGEN_2023')],
  },
];
