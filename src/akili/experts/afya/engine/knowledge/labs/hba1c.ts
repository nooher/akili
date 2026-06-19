/**
 * HbA1c — Lab Knowledge & Interpretation
 *
 * Sources: ADA 2024, IDF 2025, WHO Diabetes Compact, NTLG STG 2023.
 *
 * ADA/IDF diagnostic bands:
 *   - Normal:           < 5.7%   (< 39 mmol/mol)
 *   - Prediabetes:      5.7-6.4% (39-46 mmol/mol)
 *   - Diabetes:         ≥ 6.5%   (≥ 48 mmol/mol)
 *
 * Treatment targets (per ADA 2024):
 *   - Most adults with diabetes: < 7.0%
 *   - Older / frail / advanced complications: < 8.0% (individualized)
 *   - Pregnancy planning: < 6.5%
 *   - In pregnancy: < 6.0%
 *
 * TZ-relevant caveat: sickle cell disease, sickle trait, and other
 * hemoglobinopathies can make HbA1c unreliable. Recent transfusion
 * and severe anemia also affect interpretation.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

/**
 * HbA1c uses a finer-grained category model than the 5-band default,
 * because 6.5%, 7.5%, and 10% are all "high" but very different stories.
 */
export type HbA1cCategory =
  | 'low'              // < 4.0% — investigate (very rare)
  | 'normal'           // 4.0-5.6%
  | 'prediabetes'      // 5.7-6.4%
  | 'diabetes_new'     // 6.5-7.0% — at/just over diagnostic threshold
  | 'good_control'     // 6.5-7.5% in known diabetic = target zone
  | 'moderate_control' // 7.6-8.5%
  | 'poor_control'     // 8.6-10%
  | 'very_poor_control'; // > 10%

/**
 * Categorize HbA1c knowing whether the patient already has diabetes.
 * Without that context (engine doesn't know), use the more general bands.
 */
export function categorizeHbA1c(
  value: number,
  knownDiabetic = false,
): HbA1cCategory {
  if (value < 4.0) return 'low';
  if (value < 5.7) return 'normal';
  if (value < 6.5) return 'prediabetes';

  // Known diabetic — interpret in terms of control quality.
  if (knownDiabetic) {
    if (value <= 7.5) return 'good_control';
    if (value <= 8.5) return 'moderate_control';
    if (value <= 10) return 'poor_control';
    return 'very_poor_control';
  }

  // Newly meeting diagnostic threshold.
  if (value <= 7.0) return 'diabetes_new';
  if (value <= 8.5) return 'moderate_control';
  if (value <= 10) return 'poor_control';
  return 'very_poor_control';
}

/**
 * HbA1c % to estimated average glucose (eAG) in mmol/L.
 * Formula: eAG (mmol/L) = 1.59 × HbA1c% − 2.59 (ADA-endorsed).
 */
export function hba1cToMeanGlucose(value: number): number {
  return Math.round((1.59 * value - 2.59) * 10) / 10;
}

export const HBA1C_CATEGORY_EXPLANATIONS: Record<HbA1cCategory, {
  en: { headline: string; meaning: string; nextSteps: string };
  sw: { headline: string; meaning: string; nextSteps: string };
  sw_mtaa: { headline: string; meaning: string; nextSteps: string };
  urgency: UrgencyLevel;
}> = {
  low: {
    en: {
      headline: 'Your HbA1c is unusually low.',
      meaning: 'An HbA1c below 4.0% is uncommon. Possible causes include recent blood transfusion, conditions that shorten red blood cell life (sickle cell disease, sickle trait, other hemoglobinopathies — relevant in Tanzania), severe anemia, or laboratory error. In someone on diabetes treatment, it can also reflect very tight control with frequent low sugars.',
      nextSteps: 'Bring this result to your doctor. They will likely ask about other lab tests (full blood count) and your medical history. If you are on diabetes medicines, especially insulin or sulfonylureas, check whether you have been having low sugar episodes.',
    },
    sw: {
      headline: 'HbA1c yako iko chini isivyo kawaida.',
      meaning: 'HbA1c chini ya 4.0% si ya kawaida. Sababu zinaweza kuwa: kuongezewa damu hivi karibuni, magonjwa yanayopunguza muda wa maisha ya seli nyekundu (selemundu, sickle trait, magonjwa mengine ya hemoglobini — yanayohusika Tanzania), upungufu mkubwa wa damu, au makosa ya maabara. Kwa mtu anayetumia dawa za kisukari, inaweza pia kuonyesha udhibiti mkali sana pamoja na hypo za mara kwa mara.',
      nextSteps: 'Lete matokeo haya kwa daktari wako. Wataulizia vipimo vingine (full blood count) na historia yako ya matibabu. Kama unatumia dawa za kisukari, hasa insulin au sulfonylurea, angalia kama umekuwa unapata episodes za sukari ya chini.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko chini sana.',
      meaning: 'HbA1c chini ya 4.0% ni isiyo ya kawaida. Sababu zinaweza kuwa: kuongezewa damu hivi karibuni, magonjwa kama selemundu au sickle trait (yanayohusika Tanzania), upungufu mkubwa wa damu, au makosa ya maabara. Kwa anayetumia dawa za kisukari, inaweza kumaanisha unadhibiti sana sana, hadi unapata hypo.',
      nextSteps: 'Lete matokeo kwa daktari. Wataulizia vipimo vingine na historia yako. Kama unatumia dawa za kisukari, hasa insulin au sulfonylurea, angalia kama umekuwa na hypo mara kwa mara.',
    },
    urgency: 'soon',
  },

  normal: {
    en: {
      headline: 'Your HbA1c is normal.',
      meaning: 'An HbA1c below 5.7% is in the normal range. Your average blood sugar over the past 2-3 months has been in the healthy zone. You do not have diabetes or prediabetes based on this single result.',
      nextSteps: 'If you do not have diabetes, repeat HbA1c every 3 years if you are over 35 or have risk factors (family history, overweight, high BP, history of gestational diabetes). Continue healthy habits — moving daily, eating well, avoiding sweet drinks.',
    },
    sw: {
      headline: 'HbA1c yako iko ya kawaida.',
      meaning: 'HbA1c chini ya 5.7% iko katika kiwango cha kawaida. Wastani wako wa sukari ya damu kwa miezi 2-3 iliyopita umekuwa katika eneo la afya. Huna kisukari wala pre-diabetes kulingana na kipimo hiki kimoja.',
      nextSteps: 'Kama huna kisukari, rudia HbA1c kila miaka 3 ikiwa una zaidi ya miaka 35 au una sababu za hatari (historia ya familia, uzito mkubwa, BP ya juu, historia ya kisukari cha mimba). Endelea na tabia za afya — kutembea kila siku, kula vizuri, kuepuka vinywaji vitamu.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko poa.',
      meaning: 'HbA1c chini ya 5.7% iko kwenye kiwango cha kawaida. Wastani wa sukari yako kwa miezi 2-3 iliyopita umekuwa kwenye eneo la afya. Huna kisukari wala pre-diabetes kulingana na kipimo hiki kimoja.',
      nextSteps: 'Kama huna kisukari, rudia HbA1c kila miaka 3 ikiwa una zaidi ya miaka 35 au una hatari (historia ya familia, uzito, BP ya juu, kisukari cha mimba). Endelea na tabia nzuri — kutembea kila siku, kula vizuri, epuka vinywaji vitamu.',
    },
    urgency: 'info',
  },

  prediabetes: {
    en: {
      headline: 'Your HbA1c is in the prediabetes range — this is an opportunity.',
      meaning: 'HbA1c between 5.7% and 6.4% is called "prediabetes." Your sugar is higher than ideal but not yet at diabetes level. About 1 in 3 people with prediabetes will develop diabetes within 5 years if nothing changes — but the other 2 can stay healthy with lifestyle changes. This is one of the best moments in medicine: you have time to act.',
      nextSteps: 'Aim for 5-7% weight loss if you are overweight (even 5kg helps). Walk briskly 30 minutes most days. Reduce sweet tea, soda, juice, ugali portions, and white rice. Eat more vegetables and beans. Repeat HbA1c in 6 months. If you have other risk factors, your doctor may discuss metformin as prevention.',
    },
    sw: {
      headline: 'HbA1c yako iko katika kiwango cha pre-diabetes — hii ni fursa.',
      meaning: 'HbA1c kati ya 5.7% na 6.4% inaitwa "pre-diabetes." Sukari yako iko juu kuliko inavyopaswa lakini bado haijafikia kiwango cha kisukari. Karibu mtu 1 kati ya 3 wenye pre-diabetes watapata kisukari ndani ya miaka 5 kama hakuna kinachobadilika — lakini wengine 2 wanaweza kubaki na afya kwa mabadiliko ya maisha. Huu ni mojawapo ya wakati bora kabisa wa kitabibu: una muda wa kuchukua hatua.',
      nextSteps: 'Lenga kupunguza uzito kwa 5-7% ikiwa una uzito mkubwa (hata kilo 5 zinasaidia). Tembea kwa kasi dakika 30 siku nyingi. Punguza chai tamu, soda, juisi, ugali, na wali mweupe. Kula mboga na maharage zaidi. Rudia HbA1c baada ya miezi 6. Kama una sababu nyingine za hatari, daktari wako anaweza kujadili metformin kama kinga.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko pre-diabetes — hii ni fursa.',
      meaning: 'HbA1c kati ya 5.7% na 6.4% inaitwa "pre-diabetes." Sukari yako iko juu kuliko inavyopaswa, lakini bado haijafika kiwango cha kisukari. Mtu 1 kati ya 3 wenye pre-diabetes watapata kisukari ndani ya miaka 5 kama hakuna kinachobadilika — lakini wengine 2 wanaweza kubaki poa kwa kubadilisha lifestyle. Huu ni wakati bora kabisa: una nafasi ya kuchukua hatua kabla.',
      nextSteps: 'Lenga kupunguza uzito kwa 5-7% kama una uzito mkubwa (hata kilo 5 zinasaidia). Tembea kwa kasi dakika 30 siku nyingi. Punguza chai tamu, soda, juice, ugali, na wali mweupe. Kula mboga na maharage zaidi. Rudia HbA1c baada ya miezi 6. Kama una hatari nyingine, daktari anaweza kujadili metformin kama kinga.',
    },
    urgency: 'routine',
  },

  diabetes_new: {
    en: {
      headline: 'Your HbA1c is at or above the diabetes diagnostic threshold.',
      meaning: 'An HbA1c of 6.5% or above is one of the criteria for diagnosing diabetes. A diagnosis is usually confirmed with a repeat test or another sugar test (fasting glucose, OGTT). This is the start of a journey — not a death sentence. People who start strong with diabetes care live full, long lives.',
      nextSteps: 'See your doctor to confirm the diagnosis and start a plan. Treatment usually begins with lifestyle changes plus metformin. You will also be checked for blood pressure, lipids, kidney function, eye health, and foot health — diabetes care is more than sugar. Take time to learn the disease; education early prevents trouble later.',
    },
    sw: {
      headline: 'HbA1c yako iko kwenye au juu ya kiwango cha utambuzi wa kisukari.',
      meaning: 'HbA1c ya 6.5% au zaidi ni mojawapo ya vigezo vya utambuzi wa kisukari. Utambuzi mara nyingi unathibitishwa kwa kipimo cha kurudia au kipimo kingine cha sukari (sukari ya kufunga, OGTT). Huu ni mwanzo wa safari — sio hukumu ya kifo. Watu wanaoanza vizuri na utunzaji wa kisukari wanaishi maisha kamili na marefu.',
      nextSteps: 'Ona daktari wako kuthibitisha utambuzi na kuanza mpango. Matibabu mara nyingi huanza na mabadiliko ya maisha pamoja na metformin. Pia utapimwa shinikizo la damu, mafuta, utendaji wa figo, afya ya macho, na afya ya miguu — utunzaji wa kisukari ni zaidi ya sukari. Chukua muda kujifunza ugonjwa; elimu ya mapema inazuia matatizo ya baadaye.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko kwenye au juu ya kiwango cha kisukari.',
      meaning: 'HbA1c ya 6.5% au zaidi ni mojawapo ya vigezo vya kugundua kisukari. Utambuzi mara nyingi unathibitishwa kwa kipimo kingine au kipimo cha sukari (sukari ya kufunga, OGTT). Huu ni mwanzo wa safari — sio mwisho wa kila kitu. Watu wanaoanza vizuri wanaishi maisha kamili na marefu kabisa.',
      nextSteps: 'Ona daktari kuthibitisha utambuzi na kuanza mpango. Matibabu mara nyingi huanza na lifestyle changes pamoja na metformin. Pia utapimwa BP, mafuta, figo, macho, na miguu — utunzaji wa kisukari ni zaidi ya sukari peke yake. Chukua muda kujifunza ugonjwa; elimu mapema inazuia matatizo baadaye.',
    },
    urgency: 'soon',
  },

  good_control: {
    en: {
      headline: 'Your HbA1c shows good diabetes control.',
      meaning: 'An HbA1c between 6.5% and 7.5% in someone with known diabetes is in the recommended target zone for most adults. This means your average blood sugar over the past 2-3 months has been close to the goal. The work is paying off.',
      nextSteps: 'Keep doing what you are doing: medicines on time, regular movement, sensible eating, good sleep. Repeat HbA1c every 6 months. Your doctor will continue checking BP, kidneys, eyes, and feet at usual intervals.',
    },
    sw: {
      headline: 'HbA1c yako inaonyesha udhibiti mzuri wa kisukari.',
      meaning: 'HbA1c kati ya 6.5% na 7.5% kwa mtu mwenye kisukari iko katika lengo lililoshauriwa kwa watu wazima wengi. Hii inamaanisha wastani wako wa sukari ya damu kwa miezi 2-3 iliyopita umekuwa karibu na lengo. Kazi yako inaleta matunda.',
      nextSteps: 'Endelea unayofanya: dawa kwa wakati, mazoezi ya kawaida, kula kwa busara, kulala vizuri. Rudia HbA1c kila miezi 6. Daktari wako ataendelea kuangalia BP, figo, macho, na miguu katika vipindi vya kawaida.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako inaonyesha udhibiti mzuri wa kisukari.',
      meaning: 'HbA1c kati ya 6.5% na 7.5% kwa mwenye kisukari iko kwenye lengo lililopendekezwa kwa watu wazima wengi. Hii inamaanisha wastani wa sukari yako kwa miezi 2-3 iliyopita umekuwa karibu na lengo. Kazi yako inaleta matunda.',
      nextSteps: 'Endelea unayofanya: dawa kwa wakati, mazoezi ya kawaida, kula kwa akili, kulala vizuri. Rudia HbA1c kila miezi 6. Daktari ataendelea kuangalia BP, figo, macho, na miguu kwa vipindi vya kawaida.',
    },
    urgency: 'info',
  },

  moderate_control: {
    en: {
      headline: 'Your HbA1c is moderately above target.',
      meaning: 'An HbA1c between 7.6% and 8.5% means your sugar control is in the middle zone — not bad, but not at goal. Damage to vessels, eyes, kidneys, and nerves starts to creep up at this level over time.',
      nextSteps: 'See your doctor within the next 4 weeks to review treatment. Often this requires either adjusting the current medicines (dose change or adding another) or examining adherence and lifestyle factors. Bring your sugar readings if you check at home. Small changes now prevent big problems later.',
    },
    sw: {
      headline: 'HbA1c yako iko juu kidogo ya lengo.',
      meaning: 'HbA1c kati ya 7.6% na 8.5% maana yake udhibiti wako wa sukari uko kwenye eneo la kati — sio mbaya, lakini sio katika lengo. Uharibifu wa mishipa, macho, figo, na neva huanza kuongezeka katika kiwango hiki kwa muda.',
      nextSteps: 'Ona daktari wako ndani ya wiki 4 zijazo kupitia matibabu. Mara nyingi hii inahitaji ama kurekebisha dawa zilizopo (kubadilisha dose au kuongeza nyingine) au kuangalia ufuasi na vipengele vya maisha. Lete vipimo vyako vya sukari ukivipima nyumbani. Mabadiliko madogo sasa yanazuia matatizo makubwa baadaye.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko juu kidogo ya lengo.',
      meaning: 'HbA1c kati ya 7.6% na 8.5% inamaanisha udhibiti wako uko kwenye eneo la kati — sio mbaya, lakini sio kwenye lengo. Uharibifu wa mishipa, macho, figo, na neva unaanza kuongezeka taratibu kwenye kiwango hiki.',
      nextSteps: 'Ona daktari ndani ya wiki 4 zijazo kupitia matibabu. Mara nyingi hii inahitaji kubadilisha dawa zilizopo (dose au kuongeza nyingine) au kuangalia kama unakunywa dawa sahihi na lifestyle. Lete vipimo vyako vya nyumbani. Mabadiliko madogo sasa yanazuia matatizo makubwa baadaye.',
    },
    urgency: 'soon',
  },

  poor_control: {
    en: {
      headline: 'Your HbA1c is significantly above target — diabetes is poorly controlled.',
      meaning: 'An HbA1c between 8.6% and 10% means your average sugar is much higher than the goal, and this level genuinely accelerates damage to your eyes, kidneys, nerves, and heart. This is not a moment for panic — but it is a moment for action.',
      nextSteps: 'See your doctor within 1-2 weeks. Treatment will likely need to be intensified — either changing or adding medicines, possibly starting insulin if not already on it. The doctor will also rule out infection, missed doses, or other reversible reasons. Be honest about what has been hard — adherence, side effects, cost, food. Your doctor can only help with information they have.',
    },
    sw: {
      headline: 'HbA1c yako iko juu sana kuliko lengo — kisukari hakidhibitiwi vizuri.',
      meaning: 'HbA1c kati ya 8.6% na 10% maana yake wastani wako wa sukari uko juu zaidi kuliko lengo, na kiwango hiki kinaharakisha kweli uharibifu wa macho, figo, neva, na moyo. Huu sio wakati wa hofu — bali ni wakati wa hatua.',
      nextSteps: 'Ona daktari wako ndani ya wiki 1-2. Matibabu yatahitaji kuimarishwa — ama kubadilisha au kuongeza dawa, huenda kuanza insulin kama bado hujaanza. Daktari pia atatoa maambukizi, dose zilizorukwa, au sababu nyingine zinazoweza kurekebishwa. Kuwa mkweli kuhusu kilichokuwa kigumu — ufuasi, madhara, gharama, chakula. Daktari anaweza kukusaidia tu kwa taarifa zilizonazo.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko juu sana — kisukari hakidhibitiwi vizuri.',
      meaning: 'HbA1c kati ya 8.6% na 10% maana yake wastani wa sukari yako uko juu zaidi kuliko lengo, na kiwango hiki kinaharakisha kweli uharibifu wa macho, figo, neva, na moyo. Huu sio wakati wa hofu — bali ni wakati wa kuchukua hatua.',
      nextSteps: 'Ona daktari ndani ya wiki 1-2. Matibabu yatahitaji kuimarishwa — kubadilisha au kuongeza dawa, huenda kuanza insulin kama bado hujaanza. Daktari pia atatoa maambukizi, dose zilizorukwa, au sababu zingine zinazoweza kurekebishwa. Kuwa mkweli kuhusu kile kilichokuwa kigumu — kunywa dawa, madhara, gharama, chakula. Daktari anaweza kukusaidia tu kwa taarifa zilizonazo.',
    },
    urgency: 'soon',
  },

  very_poor_control: {
    en: {
      headline: 'Your HbA1c is very high — this needs urgent attention.',
      meaning: 'An HbA1c above 10% means your sugar has been very high for months. At this level, you are at real risk of severe complications including DKA (especially Type 1), HHS, infections that do not heal, kidney damage, and accelerated vessel disease. Symptoms (thirst, frequent urination, fatigue, blurred vision, weight loss) are often present.',
      nextSteps: 'See your doctor within the next few days, not weeks. If you have symptoms of DKA (vomiting, deep breathing, abdominal pain, confusion) or HHS (severe dehydration, confusion), go to a hospital today. Treatment usually means starting or intensifying insulin, treating any infection, and reviewing everything. This is reversible — but it needs action now.',
    },
    sw: {
      headline: 'HbA1c yako iko juu sana — hii inahitaji uangalifu wa haraka.',
      meaning: 'HbA1c juu ya 10% maana yake sukari yako imekuwa juu sana kwa miezi. Katika kiwango hiki, uko katika hatari ya kweli ya matatizo makubwa ikiwa ni pamoja na DKA (hasa Aina ya 1), HHS, maambukizi yasiyopona, uharibifu wa figo, na ugonjwa wa mishipa unaoharakishwa. Dalili (kiu, kukojoa mara kwa mara, uchovu, kuona kwa ukungu, kupunguza uzito) mara nyingi zipo.',
      nextSteps: 'Ona daktari wako ndani ya siku chache zijazo, sio wiki. Ikiwa una dalili za DKA (kutapika, kupumua kwa kina, maumivu ya tumbo, kuchanganyikiwa) au HHS (upungufu mkubwa wa maji, kuchanganyikiwa), nenda hospitali leo. Matibabu mara nyingi maana yake kuanza au kuimarisha insulin, kutibu maambukizi yoyote, na kupitia kila kitu. Hii inaweza kurekebishwa — lakini inahitaji hatua sasa.',
    },
    sw_mtaa: {
      headline: 'HbA1c yako iko juu sana — hii inahitaji uangalifu wa haraka.',
      meaning: 'HbA1c juu ya 10% maana yake sukari yako imekuwa juu sana kwa miezi. Katika kiwango hiki, uko katika hatari ya kweli ya matatizo makubwa ikiwa ni pamoja na DKA (hasa Aina 1), HHS, maambukizi yasiyopona, uharibifu wa figo, na uharibifu wa mishipa unaoharakishwa. Dalili (kiu, kukojoa mara kwa mara, uchovu, kuona vibaya, kupunguza uzito) mara nyingi zipo.',
      nextSteps: 'Ona daktari ndani ya siku chache zijazo, sio wiki. Ukiwa na dalili za DKA (kutapika, kupumua kwa kina, tumbo kuuma, kuchanganyikiwa) au HHS (kupungukiwa maji sana, kuchanganyikiwa), nenda hospitali leo. Matibabu mara nyingi maana yake kuanza au kuongeza insulin, kutibu maambukizi yoyote, na kupitia kila kitu. Hii inaweza kabisa kurekebishwa — lakini inahitaji hatua sasa hivi.',
    },
    urgency: 'urgent',
  },
};

export const HBA1C: LabKnowledge = {
  id: 'hba1c',
  aliases: LAB_ALIASES.hba1c,
  unit: '%',
  alternateUnits: [{ unit: 'mmol/mol', factor: 10.93 }], // IFCC units

  whatItMeasures: {
    en: 'HbA1c measures what percentage of your hemoglobin (the part of red blood cells that carries oxygen) has sugar stuck to it. Because red blood cells live about 3 months, HbA1c gives the average blood sugar over the past 2-3 months — not just today\'s reading. It is the gold standard for monitoring diabetes.',
    sw: 'HbA1c hupima asilimia ya hemoglobini yako (sehemu ya seli nyekundu zinazobeba oksijeni) ambayo ina sukari iliyoshikana. Kwa sababu seli nyekundu zinaishi karibu miezi 3, HbA1c hutoa wastani wa sukari ya damu kwa miezi 2-3 iliyopita — sio kipimo cha leo tu. Ni kiwango bora cha kufuatilia kisukari.',
    sw_mtaa: 'HbA1c inapima asilimia ya hemoglobini yako (sehemu ya seli nyekundu inayobeba oksijeni) ambayo ina sukari iliyoshikana. Kwa sababu seli nyekundu zinaishi karibu miezi 3, HbA1c inaonyesha wastani wa sukari yako kwa miezi 2-3 iliyopita — sio sukari ya leo tu. Hiki ndio kipimo bora kabisa cha kufuatilia kisukari.',
  },

  whyItsOrdered: {
    en: 'HbA1c is ordered to (1) screen for diabetes in people at risk, (2) diagnose diabetes (≥6.5% is one of the diagnostic criteria), and (3) monitor diabetes control over time. It is checked every 3 months for people whose control is changing, and every 6 months when control is stable. A single sugar reading shows today; HbA1c shows the season.',
    sw: 'HbA1c huombwa ili (1) kuangalia kisukari kwa watu walio katika hatari, (2) kugundua kisukari (≥6.5% ni mojawapo ya vigezo vya utambuzi), na (3) kufuatilia udhibiti wa kisukari kwa muda. Inakaguliwa kila miezi 3 kwa watu ambao udhibiti unabadilika, na kila miezi 6 wakati udhibiti uko thabiti. Kipimo kimoja cha sukari kinaonyesha leo; HbA1c inaonyesha msimu.',
    sw_mtaa: 'HbA1c inaombwa ili (1) kuangalia kisukari kwa walio katika hatari, (2) kugundua kisukari (≥6.5% ni mojawapo ya vigezo), na (3) kufuatilia udhibiti wa kisukari kwa muda. Inakaguliwa kila miezi 3 wakati udhibiti unabadilika, na kila miezi 6 wakati uko thabiti. Kipimo kimoja cha sukari kinaonyesha leo tu; HbA1c inaonyesha msimu mzima.',
  },

  ranges: [
    {
      applies: { sex: 'any', ageMin: 18, pregnancy: false },
      normalLow: 4.0,
      normalHigh: 5.6,
      criticalHigh: 10.0,
    },
    {
      applies: { sex: 'F', ageMin: 18, pregnancy: true },
      normalLow: 4.0,
      normalHigh: 6.0, // tighter target in pregnancy
      criticalHigh: 8.0,
    },
  ],

  // Standard 5-band fallback used by engine's generic lab resolver.
  // For full nuance use HBA1C_CATEGORY_EXPLANATIONS.
  interpretations: [
    {
      band: 'low',
      meaning: {
        en: 'HbA1c is unusually low — investigate hemoglobinopathies, transfusion, or anemia.',
        sw: 'HbA1c iko chini isivyo kawaida — chunguza magonjwa ya hemoglobini, kuongezewa damu, au upungufu wa damu.',
        sw_mtaa: 'HbA1c iko chini isiyo ya kawaida — angalia magonjwa ya hemoglobini, kuongezewa damu, au upungufu wa damu.',
      },
      nextSteps: {
        en: 'Bring this result to your doctor with any other recent lab results.',
        sw: 'Lete matokeo haya kwa daktari pamoja na vipimo vingine vya hivi karibuni.',
        sw_mtaa: 'Lete matokeo haya kwa daktari pamoja na vipimo vingine.',
      },
      urgency: 'soon',
    },
    {
      band: 'normal',
      meaning: {
        en: 'HbA1c in the normal range — no diabetes or prediabetes based on this test.',
        sw: 'HbA1c katika kiwango cha kawaida — hakuna kisukari wala pre-diabetes kulingana na kipimo hiki.',
        sw_mtaa: 'HbA1c iko poa — hakuna kisukari wala pre-diabetes kulingana na kipimo hiki.',
      },
      nextSteps: {
        en: 'Continue healthy habits. Repeat every 3 years if you have risk factors.',
        sw: 'Endelea na tabia za afya. Rudia kila miaka 3 ikiwa una sababu za hatari.',
        sw_mtaa: 'Endelea na tabia nzuri. Rudia kila miaka 3 ukiwa na hatari.',
      },
      urgency: 'info',
    },
    {
      band: 'high',
      meaning: {
        en: 'HbA1c above target. Either prediabetes (5.7-6.4%), new diabetes (≥6.5%), or poorly controlled diabetes.',
        sw: 'HbA1c iko juu ya lengo. Aidha pre-diabetes (5.7-6.4%), kisukari kipya (≥6.5%), au kisukari kisichodhibitiwa vizuri.',
        sw_mtaa: 'HbA1c iko juu ya lengo. Aidha pre-diabetes (5.7-6.4%), kisukari kipya (≥6.5%), au kisukari kisichodhibitiwa vizuri.',
      },
      nextSteps: {
        en: 'See your doctor for evaluation and a plan. Lifestyle changes and possibly medication.',
        sw: 'Ona daktari wako kwa tathmini na mpango. Mabadiliko ya maisha na huenda dawa.',
        sw_mtaa: 'Ona daktari kwa tathmini na mpango. Lifestyle changes na huenda dawa.',
      },
      urgency: 'soon',
    },
    {
      band: 'critical_high',
      meaning: {
        en: 'HbA1c is very high — sugar has been very poorly controlled for months. Real risk of complications.',
        sw: 'HbA1c iko juu sana — sukari haijadhibitiwa vizuri kwa miezi. Hatari ya kweli ya matatizo.',
        sw_mtaa: 'HbA1c iko juu sana — sukari haijadhibitiwa kwa miezi. Hatari ya kweli ya matatizo.',
      },
      nextSteps: {
        en: 'See your doctor within days. If you have symptoms of DKA or HHS, go to hospital today.',
        sw: 'Ona daktari wako ndani ya siku chache. Ukiwa na dalili za DKA au HHS, nenda hospitali leo.',
        sw_mtaa: 'Ona daktari ndani ya siku chache. Ukiwa na dalili za DKA au HHS, nenda hospitali leo.',
      },
      urgency: 'urgent',
    },
  ],

  sources: [
    src('ADA_2024'),
    src('IDF_DIABETES_2025'),
    src('WHO_DIABETES_2024'),
    src('NTLG_STG_2023'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
