/**
 * Blood Pressure — Lab Knowledge & Interpretation
 *
 * Categories per WHO HEARTS / ISH 2020:
 *   • Normal:        <130 / <85
 *   • High-normal:   130-139 / 85-89
 *   • Grade 1 HTN:   140-159 / 90-99
 *   • Grade 2 HTN:   160-179 / 100-109
 *   • Grade 3 HTN:   ≥180 / ≥110   ← hypertensive urgency/emergency territory
 *   • Crisis:        ≥180/120 with symptoms = emergency
 *
 * IMPORTANT: We educate on what these bands MEAN. We do not prescribe.
 */

import { LabKnowledge, LabInterpretation, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

/**
 * BP is special: two values. We interpret using the HIGHER band of the two.
 * This function is called from the engine.
 */
export function bandForBP(systolic: number, diastolic: number): LabInterpretation['band'] {
  // Use the WORSE of the two readings
  const sysBand = (() => {
    if (systolic >= 180) return 'critical_high';
    if (systolic >= 140) return 'high';
    if (systolic < 90) return 'critical_low';
    return 'normal';
  })();
  const diaBand = (() => {
    if (diastolic >= 110) return 'critical_high';
    if (diastolic >= 90) return 'high';
    if (diastolic < 60) return 'critical_low';
    return 'normal';
  })();

  const rank = { critical_low: 0, low: 1, normal: 2, high: 3, critical_high: 4 } as const;
  return rank[sysBand] >= rank[diaBand] ? sysBand : diaBand;
}

/**
 * BP needs finer-grained interpretation than the standard 5-band model
 * because 145/95 and 175/108 are both "high" but very different stories.
 * We expose a richer category function.
 */
export type BPCategory =
  | 'low'
  | 'normal'
  | 'high_normal'
  | 'grade1'
  | 'grade2'
  | 'grade3'
  | 'crisis';

export function categorizeBP(systolic: number, diastolic: number): BPCategory {
  if (systolic >= 180 || diastolic >= 120) return 'crisis';
  if (systolic >= 180 || diastolic >= 110) return 'grade3';
  if (systolic >= 160 || diastolic >= 100) return 'grade2';
  if (systolic >= 140 || diastolic >= 90) return 'grade1';
  if (systolic >= 130 || diastolic >= 85) return 'high_normal';
  if (systolic < 90 || diastolic < 60) return 'low';
  return 'normal';
}

export const BP_CATEGORY_EXPLANATIONS: Record<BPCategory, {
  en: { headline: string; meaning: string; nextSteps: string };
  sw: { headline: string; meaning: string; nextSteps: string };
  sw_mtaa: { headline: string; meaning: string; nextSteps: string };
  urgency: UrgencyLevel;
}> = {
  low: {
    en: {
      headline: 'Your blood pressure reading is on the low side.',
      meaning: 'Readings below 90/60 are considered low. Many healthy people have low BP and feel perfectly fine. But if you feel dizzy, faint, or weak — especially when standing up — that needs attention.',
      nextSteps: 'If you feel well, drink water, eat regularly, and recheck later. If you feel dizzy, light-headed, or have fainted, see a doctor.',
    },
    sw: {
      headline: 'Kipimo chako cha shinikizo la damu kiko chini.',
      meaning: 'Vipimo chini ya 90/60 vinachukuliwa kuwa vya chini. Watu wengi wenye afya nzuri wana BP ya chini na wanajisikia vizuri. Lakini ukijisikia kizunguzungu, kuzimia, au udhaifu — hasa unaposimama — hilo linahitaji uangalifu.',
      nextSteps: 'Kama unajisikia vizuri, kunywa maji, kula kawaida, na pima tena baadaye. Kama unajisikia kizunguzungu au umewahi kuzimia, ona daktari.',
    },
    sw_mtaa: {
      headline: 'BP yako iko chini.',
      meaning: 'BP chini ya 90/60 ni "ya chini". Watu wengi wenye afya wana BP ya chini na wanajisikia poa. Lakini ukijisikia kizunguzungu au kuzimia, hasa unaposimama, hilo ni issue.',
      nextSteps: 'Kama unajisikia poa, kunywa maji, kula, pima tena baadaye. Kama unajisikia kizunguzungu au umewahi kuzimia, ona daktari.',
    },
    urgency: 'routine',
  },

  normal: {
    en: {
      headline: 'Your blood pressure is in the normal range.',
      meaning: 'A reading below 130/85 is considered normal for adults. This is healthy. Keep doing what you are doing — moving regularly, eating well, watching salt, sleeping enough.',
      nextSteps: 'Recheck your BP at routine clinic visits. If you have diabetes, kidney disease, or are pregnant, check more often — your doctor will tell you how often.',
    },
    sw: {
      headline: 'Shinikizo lako la damu liko ndani ya kiwango cha kawaida.',
      meaning: 'Kipimo chini ya 130/85 kinachukuliwa kuwa cha kawaida kwa watu wazima. Hii ni afya nzuri. Endelea na unayofanya — kufanya mazoezi mara kwa mara, kula vizuri, kuchunga chumvi, kulala vya kutosha.',
      nextSteps: 'Pima BP yako kwenye ziara za kawaida kliniki. Ikiwa una kisukari, ugonjwa wa figo, au una mimba, pima mara kwa mara zaidi — daktari atakuambia.',
    },
    sw_mtaa: {
      headline: 'BP yako iko poa.',
      meaning: 'BP chini ya 130/85 ni "ya kawaida" kwa watu wazima. Hii ni afya nzuri. Endelea na unayofanya — mazoezi, kula vizuri, chumvi kidogo, kulala vya kutosha.',
      nextSteps: 'Endelea kupima BP kila unapokwenda kliniki. Kama una kisukari, figo, au mimba, pima mara kwa mara zaidi.',
    },
    urgency: 'info',
  },

  high_normal: {
    en: {
      headline: 'Your blood pressure is slightly above normal.',
      meaning: 'Readings between 130/85 and 139/89 are called "high-normal" or "pre-hypertension." You don\'t have hypertension yet, but you are heading there if nothing changes. The good news: lifestyle changes now can keep you out of medication territory for years.',
      nextSteps: 'Reduce salt, increase walking, lose a little weight if you can, and reduce alcohol. Recheck your BP in a few weeks. If it stays in this range, talk to your doctor about a plan.',
    },
    sw: {
      headline: 'Shinikizo lako la damu liko juu kidogo ya kawaida.',
      meaning: 'Vipimo kati ya 130/85 na 139/89 vinaitwa "high-normal" au "pre-hypertension." Bado huna shinikizo la damu, lakini unaelekea huko ikiwa hakuna kinachobadilika. Habari njema: mabadiliko ya maisha sasa yanaweza kukuweka mbali na dawa kwa miaka.',
      nextSteps: 'Punguza chumvi, ongeza kutembea, punguza uzito kidogo ikiwezekana, na punguza pombe. Pima BP tena baada ya wiki kadhaa. Ikibaki katika kiwango hiki, ongea na daktari kuhusu mpango.',
    },
    sw_mtaa: {
      headline: 'BP yako iko juu kidogo ya kawaida.',
      meaning: 'BP kati ya 130/85 na 139/89 inaitwa "pre-hypertension." Bado hujapata BP ya juu, lakini unaelekea huko kama hutabadilisha kitu. Habari njema: ukibadilisha lifestyle sasa, unaweza kujiweka mbali na dawa kwa miaka mingi.',
      nextSteps: 'Punguza chumvi, ongeza kutembea, punguza uzito kidogo, punguza pombe. Pima BP tena baada ya wiki kadhaa. Kama BP inabaki hapa, ongea na daktari.',
    },
    urgency: 'routine',
  },

  grade1: {
    en: {
      headline: 'Your blood pressure is in the Grade 1 hypertension range.',
      meaning: 'A reading of 140-159 / 90-99 is Grade 1 hypertension. One high reading does not mean you have hypertension — the diagnosis is made on repeated readings, ideally with home or 24-hour monitoring. But this number is real and it deserves a doctor\'s assessment.',
      nextSteps: 'See your doctor within the next 1-4 weeks. Start the lifestyle changes now: less salt, more walking, less alcohol, more vegetables. If your doctor confirms hypertension, treatment usually starts with one daily medicine. It is gentle, effective, and protects you for life.',
    },
    sw: {
      headline: 'Shinikizo lako la damu liko katika kiwango cha Grade 1.',
      meaning: 'Kipimo cha 140-159 / 90-99 ni shinikizo la damu Grade 1. Kipimo kimoja cha juu hakimaanishi una shinikizo la damu — utambuzi unafanywa kwa vipimo vya mara kwa mara, hasa kwa kupima nyumbani au kwa masaa 24. Lakini namba hii ni ya kweli na inastahili tathmini ya daktari.',
      nextSteps: 'Ona daktari ndani ya wiki 1-4 zijazo. Anza mabadiliko ya maisha sasa: chumvi kidogo, kutembea zaidi, pombe kidogo, mboga zaidi. Daktari akithibitisha shinikizo la damu, matibabu mara nyingi huanza na dawa moja kwa siku. Ni rahisi, inafanya kazi, na inakulinda kwa maisha.',
    },
    sw_mtaa: {
      headline: 'BP yako iko kwenye Grade 1 hypertension.',
      meaning: 'BP ya 140-159 / 90-99 ni Grade 1. Kipimo kimoja hakimaanishi una BP — diagnosis inahitaji vipimo vingi, kwa kawaida kwa kupima nyumbani au monitor ya masaa 24. Lakini namba hii ni real na inahitaji daktari ailize.',
      nextSteps: 'Ona daktari ndani ya wiki 1-4. Anza lifestyle changes sasa: chumvi kidogo, tembea zaidi, pombe kidogo, mboga nyingi. Daktari akithibitisha BP, matibabu kwa kawaida huanza na dawa moja kwa siku. Si ngumu, inafanya kazi.',
    },
    urgency: 'soon',
  },

  grade2: {
    en: {
      headline: 'Your blood pressure is in the Grade 2 hypertension range — this needs attention.',
      meaning: 'A reading of 160-179 / 100-109 is Grade 2 hypertension. At this level, the risk of stroke, heart attack, and kidney damage starts climbing meaningfully. Doctors almost always start medication for this — usually two complementary drugs together — alongside lifestyle changes.',
      nextSteps: 'See a doctor within the next few days. Do not wait weeks. If you are already on BP medicine, your dose or combination probably needs adjusting — bring your home readings if you have them. Start cutting salt today.',
    },
    sw: {
      headline: 'Shinikizo lako la damu liko katika Grade 2 — hii inahitaji uangalifu.',
      meaning: 'Kipimo cha 160-179 / 100-109 ni shinikizo la damu Grade 2. Katika kiwango hiki, hatari ya kiharusi, mshtuko wa moyo, na uharibifu wa figo huanza kupanda kwa kiasi kikubwa. Madaktari karibu daima huanza dawa kwa kiwango hiki — kwa kawaida dawa mbili zinazoongezana — pamoja na mabadiliko ya maisha.',
      nextSteps: 'Ona daktari ndani ya siku chache zijazo. Usisubiri wiki. Ikiwa tayari uko kwenye dawa za shinikizo, dose au mchanganyiko huenda unahitaji kurekebishwa — lete vipimo vyako vya nyumbani ukivihifadhi. Anza kupunguza chumvi leo.',
    },
    sw_mtaa: {
      headline: 'BP yako iko Grade 2 — hii inahitaji uangalifu.',
      meaning: 'BP ya 160-179 / 100-109 ni Grade 2. Hapa hatari ya stroke, heart attack, na uharibifu wa figo inapanda sana. Madaktari karibu daima huanza dawa hapa — kwa kawaida dawa mbili pamoja — pamoja na lifestyle changes.',
      nextSteps: 'Ona daktari ndani ya siku chache. Usisubiri wiki. Kama tayari uko kwenye dawa, dose huenda unahitaji kurekebishwa — lete vipimo vyako vya nyumbani. Anza kupunguza chumvi leo.',
    },
    urgency: 'soon',
  },

  grade3: {
    en: {
      headline: 'Your blood pressure is in the Grade 3 hypertension range — this is serious.',
      meaning: 'A reading of 180 or above (or diastolic 110+) is Grade 3 — also called severe hypertension. Without symptoms, this is "hypertensive urgency": dangerous, but not requiring an ambulance. With symptoms like headache, chest pain, breathlessness, vision changes, or weakness, this becomes a hypertensive emergency.',
      nextSteps: 'See a doctor today, not tomorrow. Go to a clinic or hospital. If you have ANY of the warning signs below, go to the emergency department now. Do not "wait and recheck" alone with numbers this high.',
    },
    sw: {
      headline: 'Shinikizo lako la damu liko Grade 3 — hii ni serious.',
      meaning: 'Kipimo cha 180 au juu zaidi (au diastolic 110+) ni Grade 3 — pia inaitwa shinikizo kali la damu. Bila dalili, hii ni "hypertensive urgency": ni hatari, lakini haihitaji ambulance. Pamoja na dalili kama kichwa, maumivu ya kifua, kushindwa kupumua, mabadiliko ya kuona, au udhaifu, hii inakuwa dharura.',
      nextSteps: 'Ona daktari leo, sio kesho. Nenda kliniki au hospitali. Kama una dalili yoyote ya hatari hapa chini, nenda dharura sasa. Usisubiri kupima tena ukiwa peke yako na namba kubwa hivi.',
    },
    sw_mtaa: {
      headline: 'BP yako iko Grade 3 — hii ni serious.',
      meaning: 'BP ya 180 au juu (au chini 110+) ni Grade 3 — inaitwa "severe hypertension." Bila dalili, hii ni "hypertensive urgency" — hatari, lakini hauhitaji ambulance. Lakini ukiwa na dalili kama kichwa kinauma sana, maumivu ya kifua, kushindwa kupumua, kuona vibaya, au udhaifu, hii ni dharura ya kweli.',
      nextSteps: 'Ona daktari leo — sio kesho. Nenda kliniki au hospitali. Kama una dalili yoyote ya hatari, nenda emergency SASA. Usikae nyumbani ukingoja kupima tena.',
    },
    urgency: 'urgent',
  },

  crisis: {
    en: {
      headline: 'GO TO HOSPITAL NOW. This is a hypertensive emergency.',
      meaning: 'A reading of 180/120 or higher, especially with symptoms, is a hypertensive crisis. The body is being damaged in real time — vessels in the brain, heart, kidneys, and eyes are under dangerous pressure.',
      nextSteps: 'Stop reading this app. Go to the nearest hospital or call 114. Do not drive yourself if you feel unwell. Bring your medicine bottles with you if you can.',
    },
    sw: {
      headline: 'NENDA HOSPITALI SASA. Hii ni dharura ya shinikizo la damu.',
      meaning: 'Kipimo cha 180/120 au juu zaidi, hasa pamoja na dalili, ni dharura ya shinikizo la damu. Mwili unaharibika kwa wakati huu huu — mishipa ya ubongo, moyo, figo, na macho iko chini ya msukumo wa hatari.',
      nextSteps: 'Acha kusoma app hii. Nenda hospitali ya karibu au piga 114. Usijiendeshe gari kama unajisikia vibaya. Lete dawa zako ukiweza.',
    },
    sw_mtaa: {
      headline: 'NENDA HOSPITALI SASA. Hii ni dharura.',
      meaning: 'BP ya 180/120 au juu zaidi, hasa ukiwa na dalili, ni dharura. Mwili wako unaharibika sasa hivi — mishipa ya ubongo, moyo, figo, na macho viko chini ya pressure ya hatari.',
      nextSteps: 'Acha kusoma app. Nenda hospitali ya karibu au piga 114. Usijiendeshe gari ukijisikia vibaya. Lete dawa zako.',
    },
    urgency: 'emergency',
  },
};

export const BLOOD_PRESSURE: LabKnowledge = {
  id: 'blood_pressure',
  aliases: LAB_ALIASES.blood_pressure,
  unit: 'mmHg',

  whatItMeasures: {
    en: 'Blood pressure measures the force of blood pushing against the walls of your arteries. The top number (systolic) is the pressure when the heart beats. The bottom number (diastolic) is the pressure when the heart rests between beats.',
    sw: 'Shinikizo la damu hupima nguvu ya damu inayosukuma kuta za mishipa yako. Namba ya juu (systolic) ni shinikizo wakati moyo unapopiga. Namba ya chini (diastolic) ni shinikizo wakati moyo unapopumzika kati ya mapigo.',
    sw_mtaa: 'BP inapima nguvu ya damu inayosukuma mishipa yako. Namba ya juu (systolic) ni pressure wakati moyo unapiga. Namba ya chini (diastolic) ni pressure wakati moyo unapumzika.',
  },

  whyItsOrdered: {
    en: 'Blood pressure is checked at every clinic visit because high BP usually has no symptoms but is the leading cause of stroke, heart attack, and kidney damage. Catching it early protects everything downstream.',
    sw: 'Shinikizo la damu hupimwa kila ziara ya kliniki kwa sababu BP ya juu kwa kawaida haina dalili lakini ni sababu kuu ya kiharusi, mshtuko wa moyo, na uharibifu wa figo. Kuigundua mapema kunalinda kila kitu kinachofuata.',
    sw_mtaa: 'BP inapimwa kila unapokwenda kliniki kwa sababu BP ya juu haina dalili, lakini ndiyo sababu kuu ya stroke, heart attack, na figo kuharibika. Ukiigundua mapema, unalinda kila kitu.',
  },

  ranges: [
    {
      applies: { sex: 'any', ageMin: 18 },
      normalLow: 90,
      normalHigh: 130,
      criticalLow: 80,
      criticalHigh: 180,
    },
  ],

  // Note: BP uses categorizeBP() above for richer interpretation than the 5-band model.
  // This array provides fallback band-level summaries for the engine.
  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'Very low blood pressure — your body may not be getting enough blood flow.',
        sw: 'Shinikizo la damu la chini sana — mwili wako huenda haupati damu ya kutosha.',
        sw_mtaa: 'BP ya chini sana — mwili huenda haupati damu ya kutosha.',
      },
      nextSteps: {
        en: 'If you feel dizzy, faint, weak, confused, or have chest pain, go to a hospital. If you feel well, sit down, drink water, and recheck.',
        sw: 'Ukijisikia kizunguzungu, kuzimia, udhaifu, kuchanganyikiwa, au maumivu ya kifua, nenda hospitali. Ukijisikia vizuri, kaa chini, kunywa maji, na pima tena.',
        sw_mtaa: 'Ukijisikia kizunguzungu, kuzimia, udhaifu, au maumivu ya kifua, nenda hospitali. Ukijisikia poa, kaa chini, kunywa maji, pima tena.',
      },
      urgency: 'urgent',
    },
    {
      band: 'normal',
      meaning: {
        en: 'Blood pressure in the healthy range.',
        sw: 'Shinikizo la damu katika kiwango cha afya.',
        sw_mtaa: 'BP iko poa.',
      },
      nextSteps: {
        en: 'Continue your usual habits. Recheck at routine visits.',
        sw: 'Endelea na tabia zako za kawaida. Pima tena katika ziara za kawaida.',
        sw_mtaa: 'Endelea na unavyofanya. Pima tena ukienda kliniki.',
      },
      urgency: 'info',
    },
    {
      band: 'high',
      meaning: {
        en: 'Blood pressure above normal range.',
        sw: 'Shinikizo la damu juu ya kiwango cha kawaida.',
        sw_mtaa: 'BP iko juu.',
      },
      nextSteps: {
        en: 'See a doctor for evaluation. Start reducing salt, increase activity, limit alcohol.',
        sw: 'Ona daktari kwa tathmini. Anza kupunguza chumvi, ongeza shughuli, punguza pombe.',
        sw_mtaa: 'Ona daktari. Anza kupunguza chumvi, fanya mazoezi, punguza pombe.',
      },
      urgency: 'soon',
    },
    {
      band: 'critical_high',
      meaning: {
        en: 'Very high blood pressure — serious if combined with symptoms.',
        sw: 'Shinikizo la damu la juu sana — ni serious likiwa na dalili.',
        sw_mtaa: 'BP ya juu sana — serious ukiwa na dalili.',
      },
      nextSteps: {
        en: 'Go to a hospital or clinic the same day. Emergency if you have headache, chest pain, breathlessness, vision changes, or weakness.',
        sw: 'Nenda hospitali au kliniki siku hiyo. Dharura ukiwa na kichwa, maumivu ya kifua, kushindwa kupumua, mabadiliko ya kuona, au udhaifu.',
        sw_mtaa: 'Nenda hospitali leo. Dharura ukiwa na kichwa, kifua, kushindwa kupumua, kuona vibaya, au udhaifu.',
      },
      urgency: 'urgent',
    },
  ],

  sources: [
    src('WHO_HEARTS_2023'),
    src('ISH_2020'),
    src('NTLG_STG_2023'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
