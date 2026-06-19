/**
 * Magnesium Sulfate (MgSO4) — Drug Knowledge (Phase 7 maternal block)
 *
 * Sources: WHO Pre-eclampsia 2023, MoH-TZ Maternal Guidelines 2024,
 *          FIGO Pre-eclampsia 2024, NTLG STG 2023, Muhimbili Protocols,
 *          BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Magnesium sulfate is the single most important life-saving medicine
 *   in pre-eclampsia / eclampsia — it cuts the risk of eclamptic seizures
 *   roughly in half in severe pre-eclampsia and is the first-line for
 *   stopping seizures once they have started. It is also given for fetal
 *   neuroprotection in preterm delivery. This is hospital-only medicine,
 *   given IV or IM, by trained staff who can recognise and treat toxicity.
 *
 * Scope note:
 *   We educate on what magnesium sulfate is for, why it is given, what
 *   to expect during treatment, and what to tell the staff. We do NOT
 *   give doses or regimens (Pritchard / Zuspan etc.) — those are clinical
 *   protocol territory. Toxicity recognition (loss of reflexes, breathing
 *   difficulty, sleepiness) is the high-value teaching point for the
 *   patient and family.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const MAGNESIUM_SULFATE: DrugKnowledge = {
  id: 'magnesium_sulfate',
  aliases: DRUG_ALIASES.magnesium_sulfate,

  drugClass: {
    en: 'Anticonvulsant / neuroprotective mineral salt — the standard medicine to prevent and stop eclamptic seizures, given by trained staff in hospital',
    sw: 'Chumvi ya madini ya kuzuia kifafa / kulinda mfumo wa neva — dawa ya kiwango cha kuzuia na kusimamisha degedege la eclampsia, hutolewa na wafanyakazi waliofunzwa hospitalini',
  },

  whatItDoes: {
    en: 'Magnesium sulfate calms over-excited nerves and stabilises the blood-vessel lining in severe pre-eclampsia. The most important effect is preventing or stopping eclamptic seizures — large international trials show it roughly halves seizure risk in severe pre-eclampsia compared to placebo, and works better than older anticonvulsants for stopping a seizure that has started. It also relaxes the muscle of blood-vessel walls (a mild blood-pressure-lowering effect), and protects the developing baby\'s brain when given in preterm labour. It is given by injection (intravenous infusion or intramuscular) in hospital — never as tablets at home — because the dose and monitoring need trained staff.',
    sw: 'Magnesium sulfate hutuliza neva zilizoamka kupita kiasi na huimarisha utando wa ndani wa mishipa ya damu katika pre-eclampsia kali. Athari muhimu zaidi ni kuzuia au kusimamisha degedege la eclampsia — majaribio makubwa ya kimataifa yanaonyesha hupunguza takriban nusu ya hatari ya degedege katika pre-eclampsia kali ikilinganishwa na placebo, na hufanya kazi vizuri zaidi kuliko anticonvulsants za zamani kwa kusimamisha degedege lililoanza. Pia hulegeza misuli ya kuta za mishipa ya damu (athari ndogo ya kushusha shinikizo la damu), na hulinda ubongo wa mtoto anayekua unapotolewa katika leba ya kabla ya wakati. Hutolewa kwa sindano (mishipa au misuli) hospitalini — kamwe sio kama vidonge nyumbani — kwa sababu dose na ufuatiliaji vinahitaji wafanyakazi waliofunzwa.',
    sw_mtaa: 'Magnesium sulfate inatuliza over-excited nerves na inaimarisha blood-vessel lining katika severe pre-eclampsia. Most important effect ni kuzuia au kusimamisha eclamptic seizures — large international trials zinaonyesha inapunguza roughly half ya seizure risk katika severe pre-eclampsia compared to placebo, na inafanya kazi vizuri zaidi kuliko older anticonvulsants kwa kusimamisha seizure iliyoanza. Pia inalegeza misuli ya blood-vessel walls (mild BP-lowering effect), na inalinda developing baby\'s brain inapotolewa katika preterm labour. Inatolewa kwa injection (IV infusion au IM) hospitalini — kamwe sio kama tablets nyumbani — kwa sababu dose na monitoring zinahitaji trained staff.',
  },

  commonUses: [
    {
      en: 'Severe pre-eclampsia — to prevent the seizure that would become eclampsia; the most important indication.',
      sw: 'Pre-eclampsia kali — kuzuia degedege ambalo lingekuwa eclampsia; dalili muhimu zaidi.',
      sw_mtaa: 'Severe pre-eclampsia — kuzuia seizure ambayo ingekuwa eclampsia; most important indication.',
    },
    {
      en: 'Eclampsia (after a seizure has happened) — to stop the current seizure and prevent the next one. Continued for 24 hours after the last seizure or after delivery, whichever is later.',
      sw: 'Eclampsia (baada ya degedege kutokea) — kusimamisha degedege la sasa na kuzuia linalofuata. Huendelea kwa masaa 24 baada ya degedege la mwisho au baada ya kujifungua, lolote ni la baadaye.',
      sw_mtaa: 'Eclampsia (baada ya seizure kutokea) — kusimamisha current seizure na kuzuia next one. Inaendelea kwa masaa 24 baada ya last seizure au baada ya delivery, lolote ni baadaye.',
    },
    {
      en: 'Fetal neuroprotection — given to the mother in threatened preterm delivery before 32-34 weeks to lower the baby\'s risk of cerebral palsy.',
      sw: 'Ulinzi wa neva wa fetasi — hutolewa kwa mama katika leba ya kabla ya wakati inayotishia kabla ya wiki 32-34 kupunguza hatari ya kupooza kwa ubongo wa mtoto.',
      sw_mtaa: 'Fetal neuroprotection — inatolewa kwa mama katika threatened preterm delivery kabla ya wiki 32-34 kupunguza baby\'s risk ya cerebral palsy.',
    },
  ],

  howItIsTaken: {
    en: 'Magnesium sulfate is given as an injection by hospital staff — never by the patient. Two common regimens are used in Tanzania: the Pritchard regimen (intramuscular, into the buttock) and the Zuspan regimen (intravenous, into a vein). Both start with a loading dose to get blood levels up quickly, then a maintenance dose to keep the level steady, usually for 24 hours after the last seizure or after delivery (whichever is later). The staff will check your reflexes (usually the knee jerk), your breathing rate, urine output, and how alert you are at regular intervals — these checks are how toxicity is caught early. Calcium gluconate is kept ready as an antidote in case the magnesium level rises too high. The injection site can sting; tell the staff if pain or skin changes worsen. Drink fluids as advised; the team will track your urine output (a urinary catheter is often used for this reason).',
    sw: 'Magnesium sulfate hutolewa kama sindano na wafanyakazi wa hospitali — kamwe sio na mgonjwa. Regimens mbili za kawaida hutumika Tanzania: regimen ya Pritchard (misuli, kwenye matako) na regimen ya Zuspan (mishipa, kwenye mshipa). Zote huanza na dose ya kupakia kupata viwango vya damu kupanda haraka, kisha dose ya matunzo kuweka kiwango imara, kawaida kwa masaa 24 baada ya degedege la mwisho au baada ya kujifungua (lolote ni la baadaye). Wafanyakazi watachunguza reflexes zako (kawaida knee jerk), kasi yako ya kupumua, utokaji wa mkojo, na jinsi ulivyo macho katika vipindi vya kawaida — ukaguzi huu ni jinsi sumu hugundulika mapema. Calcium gluconate huwekwa tayari kama antidote ikiwa kiwango cha magnesium kinapanda juu mno. Mahali pa sindano panaweza kuchoma; waambie wafanyakazi ikiwa maumivu au mabadiliko ya ngozi yanazidi. Kunywa kioevu kama unavyoshauriwa; timu itafuatilia utokaji wako wa mkojo (catheter ya mkojo mara nyingi hutumika kwa sababu hii).',
    sw_mtaa: 'Magnesium sulfate inatolewa kama injection na hospital staff — kamwe sio na mgonjwa. Two common regimens zinatumika Tanzania: Pritchard regimen (IM, kwenye matako) na Zuspan regimen (IV, kwenye vein). Zote zinaanza na loading dose kupata blood levels kupanda haraka, kisha maintenance dose kuweka level steady, kawaida kwa masaa 24 baada ya last seizure au baada ya delivery (lolote ni baadaye). Staff watachunguza reflexes zako (kawaida knee jerk), respiratory rate, urine output, na jinsi ulivyo alert katika regular intervals — checks hizi ni jinsi toxicity inagundulika mapema. Calcium gluconate inawekwa tayari kama antidote ikiwa magnesium level inapanda juu mno. Injection site inaweza kuchoma; waambie staff ikiwa pain au skin changes zinazidi. Kunywa fluids kama unavyoshauriwa; team itafuatilia urine output yako (urinary catheter mara nyingi inatumika kwa sababu hii).',
  },

  commonSideEffects: [
    {
      en: 'Warm flushing feeling, mild sweating, mild nausea — common at the start of the infusion, usually settles.',
      sw: 'Hisia ya joto la kufolekwa, jasho dogo, kichefuchefu kidogo — ya kawaida mwanzoni mwa infusion, kawaida hutulia.',
      sw_mtaa: 'Warm flushing feeling, mild sweating, mild nausea — common mwanzoni mwa infusion, kawaida inatulia.',
    },
    {
      en: 'Stinging or burning at the injection site, especially with IM Pritchard — staff add local anaesthetic to lessen this.',
      sw: 'Kuchoma au kuwaka mahali pa sindano, hasa kwa Pritchard ya IM — wafanyakazi huongeza dawa ya kufanya ganzi ya ndani kupunguza hii.',
      sw_mtaa: 'Stinging au burning kwenye injection site, hasa na IM Pritchard — staff wanaongeza local anaesthetic kupunguza hii.',
    },
    {
      en: 'Drowsiness, mild blurred vision, mild muscle weakness — usually mild at therapeutic doses; tell the staff so they can check your reflexes.',
      sw: 'Usingizi, kuona ukungu kidogo, udhaifu mdogo wa misuli — kawaida ndogo katika dose za matibabu; waambie wafanyakazi ili waweze kuchunguza reflexes zako.',
      sw_mtaa: 'Drowsiness, mild blurred vision, mild muscle weakness — kawaida mild katika therapeutic doses; waambie staff ili waweze kuchunguza reflexes zako.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Difficulty breathing, very shallow or slow breathing — sign of magnesium toxicity. EMERGENCY: tell staff immediately, the infusion will be stopped and calcium gluconate antidote given',
        sw: 'Ugumu wa kupumua, kupumua kwa kina kifupi sana au polepole — ishara ya sumu ya magnesium. DHARURA: waambie wafanyakazi mara moja, infusion itasimamishwa na calcium gluconate antidote itatolewa',
        sw_mtaa: 'Difficulty breathing, very shallow au slow breathing — sign ya magnesium toxicity. DHARURA: waambie staff mara moja, infusion itasimamishwa na calcium gluconate antidote itatolewa',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Loss of the knee reflex (a routine check) — early sign of magnesium toxicity, before breathing is affected. The infusion will be paused and the level checked',
        sw: 'Kupotea kwa knee reflex (ukaguzi wa kawaida) — ishara ya mapema ya sumu ya magnesium, kabla kupumua kuathirika. Infusion itasimamishwa na kiwango kitachunguzwa',
        sw_mtaa: 'Loss ya knee reflex (routine check) — early sign ya magnesium toxicity, kabla breathing kuathirika. Infusion itasimamishwa na level itachunguzwa',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Very slow heart rate, severe drowsiness, confusion, very low blood pressure with collapse — possible severe magnesium toxicity. EMERGENCY: staff will give calcium gluconate antidote and supportive care',
        sw: 'Moyo unaopiga polepole sana, usingizi mkubwa sana, kuchanganyikiwa, shinikizo la damu la chini sana na kuanguka — uwezekano wa sumu kali ya magnesium. DHARURA: wafanyakazi watatoa calcium gluconate antidote na huduma ya msaada',
        sw_mtaa: 'Very slow heart rate, severe drowsiness, kuchanganyikiwa, very low BP na collapse — uwezekano wa severe magnesium toxicity. DHARURA: staff watatoa calcium gluconate antidote na supportive care',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'A new or worsening seizure during or after the magnesium infusion — tell staff immediately; treatment may need to be escalated',
        sw: 'Degedege jipya au linalozidi wakati au baada ya infusion ya magnesium — waambie wafanyakazi mara moja; matibabu yanaweza kuhitaji kupanuliwa',
        sw_mtaa: 'New au worsening seizure wakati au baada ya magnesium infusion — waambie staff mara moja; treatment inaweza kuhitaji kupanuliwa',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'calcium',
      withDisplay: { en: 'calcium (especially IV calcium)', sw: 'kalsiamu (hasa kalsiamu ya mishipa)' },
      severity: 'caution',
      explanation: {
        en: 'Calcium reverses the effect of magnesium — that is why calcium gluconate is kept on standby as the antidote. Outside that emergency use, calcium and magnesium are not given together because the calcium would cancel the seizure prevention.',
        sw: 'Calcium hubadilisha athari ya magnesium — ndio sababu calcium gluconate huwekwa tayari kama antidote. Nje ya matumizi hayo ya dharura, calcium na magnesium havipewi pamoja kwa sababu calcium ingebatilisha kuzuia degedege.',
        sw_mtaa: 'Calcium inabadilisha athari ya magnesium — ndio sababu calcium gluconate inawekwa tayari kama antidote. Nje ya emergency use hiyo, calcium na magnesium hazipewi pamoja kwa sababu calcium ingecancel seizure prevention.',
      },
      sources: [src('WHO_PREECLAMPSIA_2023'), src('BNF_CURRENT')],
    },
    {
      with: 'aminoglycosides',
      withDisplay: { en: 'aminoglycoside antibiotics (e.g. gentamicin)', sw: 'antibiotics za aminoglycoside (mfano gentamicin)' },
      severity: 'caution',
      explanation: {
        en: 'Combined with magnesium, aminoglycosides can deepen muscle weakness — staff watch for this when both are used (for example in pre-eclampsia complicated by sepsis).',
        sw: 'Pamoja na magnesium, aminoglycosides zinaweza kuongeza udhaifu wa misuli — wafanyakazi huchunguza hili wakati zote zinatumika (kwa mfano katika pre-eclampsia inayoshtakiwa na sepsis).',
        sw_mtaa: 'Combined na magnesium, aminoglycosides zinaweza kuongeza muscle weakness — staff wanaangalia hili wakati both zinatumika (kwa mfano katika pre-eclampsia complicated na sepsis).',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'nifedipine',
      withDisplay: { en: 'nifedipine (pregnancy BP medicine)', sw: 'nifedipine (dawa ya BP ya mimba)' },
      severity: 'caution',
      explanation: {
        en: 'Nifedipine and magnesium together can lower blood pressure more than either alone — sometimes this is wanted in severe pre-eclampsia, but the team monitors BP closely so it does not drop too far.',
        sw: 'Nifedipine na magnesium pamoja zinaweza kushusha shinikizo la damu zaidi kuliko kila moja peke yake — wakati mwingine hii inahitajika katika pre-eclampsia kali, lakini timu hufuatilia BP kwa karibu ili isishuke chini sana.',
        sw_mtaa: 'Nifedipine na magnesium pamoja zinaweza kushusha BP zaidi kuliko each alone — wakati mwingine hii inahitajika katika severe pre-eclampsia, lakini team inafuatilia BP kwa karibu ili isishuke chini sana.',
      },
      sources: [src('WHO_PREECLAMPSIA_2023'), src('FIGO_PREECLAMPSIA_2024')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'During the infusion', sw: 'Wakati wa infusion' },
      note: {
        en: 'You will be in a monitored bed — blood pressure, breathing rate, urine output, and reflexes checked regularly. Tell staff right away if you feel breathless, very sleepy, or if you notice your reflexes feel different. The hot/flushing feeling at the start is normal; the staff will slow the infusion if it is intense.',
        sw: 'Utakuwa katika kitanda kinachofuatiliwa — shinikizo la damu, kasi ya kupumua, utokaji wa mkojo, na reflexes huchunguzwa mara kwa mara. Waambie wafanyakazi mara moja ikiwa unahisi kushindwa kupumua, usingizi sana, au ikiwa unaona reflexes zako zinahisi tofauti. Hisia ya joto/kufolekwa mwanzoni ni ya kawaida; wafanyakazi watapunguza kasi ya infusion ikiwa ni kali.',
        sw_mtaa: 'Utakuwa katika monitored bed — BP, respiratory rate, urine output, na reflexes zinachunguzwa mara kwa mara. Waambie staff mara moja ikiwa unahisi breathless, very sleepy, au ikiwa unaona reflexes zako zinahisi tofauti. Hot/flushing feeling mwanzoni ni ya kawaida; staff watapunguza infusion ikiwa ni intense.',
      },
    },
    {
      topic: { en: 'Why it continues after delivery', sw: 'Kwa nini huendelea baada ya kujifungua' },
      note: {
        en: 'Eclamptic seizures can still happen for up to 24-48 hours after delivery — that is why the magnesium continues for 24 hours after the last seizure or after delivery, whichever is later. This is not "extra caution," it is the evidence-based duration.',
        sw: 'Degedege la eclampsia bado linaweza kutokea hadi masaa 24-48 baada ya kujifungua — ndio sababu magnesium huendelea kwa masaa 24 baada ya degedege la mwisho au baada ya kujifungua, lolote ni la baadaye. Hii sio "tahadhari ya ziada," ni muda unaotegemea ushahidi.',
        sw_mtaa: 'Eclamptic seizures bado zinaweza kutokea hadi masaa 24-48 baada ya delivery — ndio sababu magnesium inaendelea kwa masaa 24 baada ya last seizure au baada ya delivery, lolote ni baadaye. Hii sio "extra caution," ni evidence-based duration.',
      },
    },
    {
      topic: { en: 'After the infusion', sw: 'Baada ya infusion' },
      note: {
        en: 'After magnesium is stopped, most women feel back to normal within hours. Mild tiredness can linger for a day. Continue any blood-pressure medicines as prescribed and attend the postnatal review — pre-eclampsia changes how your BP and kidneys are monitored for the next weeks.',
        sw: 'Baada ya magnesium kusimamishwa, wanawake wengi huhisi kurudi kwa kawaida ndani ya masaa. Uchovu mdogo unaweza kudumu kwa siku. Endelea na dawa zozote za shinikizo la damu kama ilivyoagizwa na hudhuria mapitio ya baada ya kujifungua — pre-eclampsia inabadilisha jinsi BP yako na figo zinavyofuatiliwa kwa wiki zinazofuata.',
        sw_mtaa: 'Baada ya magnesium kusimamishwa, wanawake wengi wanahisi kurudi kwa kawaida ndani ya masaa. Mild tiredness inaweza kudumu kwa siku. Endelea na BP medicines kama prescribed na hudhuria postnatal review — pre-eclampsia inabadilisha jinsi BP yako na figo zinavyofuatiliwa kwa next weeks.',
      },
    },
  ],

  sources: [
    src('WHO_PREECLAMPSIA_2023'),
    src('MOH_TZ_MATERNAL_2024'),
    src('FIGO_PREECLAMPSIA_2024'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
