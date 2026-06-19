/**
 * TLD — Tenofovir + Lamivudine + Dolutegravir — Drug Knowledge
 *
 * Preferred first-line antiretroviral therapy (ART) for HIV in Tanzania.
 * A single fixed-dose combination tablet, taken once a day, for life.
 * Supplied free through CTC (Care and Treatment Clinics).
 *
 * Components:
 *   - Tenofovir disoproxil fumarate (TDF) — nucleotide reverse transcriptase inhibitor
 *   - Lamivudine (3TC)                    — nucleoside reverse transcriptase inhibitor
 *   - Dolutegravir (DTG)                  — integrase strand transfer inhibitor
 *
 * Sources: NACP National Guidelines for the Management of HIV and AIDS 2024,
 *          WHO Consolidated TB & HIV Guidelines 2024, NTLG STG 2023,
 *          BNF current, EMC current.
 *
 * NOTE: This file does NOT prescribe specific doses or select regimens.
 * The engine educates on what to expect, side effects, interactions, and
 * continuity — regimen and dose decisions belong to the CTC clinician.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const TLD: DrugKnowledge = {
  id: 'tld',
  aliases: DRUG_ALIASES.tld,
  drugClass: {
    en: 'First-line antiretroviral combination (Tenofovir + Lamivudine + Dolutegravir)',
    sw: 'Mchanganyiko wa dawa za kupunguza makali ya VVU wa kwanza (Tenofovir + Lamivudine + Dolutegravir)',
  },

  whatItDoes: {
    en: 'TLD is a combination of three antiretroviral medicines in one tablet that together stop HIV from multiplying. HIV cannot be cured, but TLD controls it so completely that the amount of virus in the blood becomes undetectable — and an undetectable person cannot pass HIV to a sexual partner (U=U). Each of the three works at a different step of the virus\'s life cycle: tenofovir and lamivudine both block reverse transcriptase, the enzyme HIV uses to copy its genetic material; dolutegravir blocks integrase, the enzyme HIV uses to insert itself into human cells. Attacking three points at once is what makes the combination powerful and makes it very hard for the virus to develop resistance. Taken every day, TLD lets the immune system recover and a person with HIV live a full, normal life.',
    sw: 'TLD ni mchanganyiko wa dawa tatu za kupunguza makali ya VVU katika kidonge kimoja ambazo kwa pamoja huzuia VVU kuongezeka. VVU haiwezi kuponywa, lakini TLD huidhibiti kabisa kiasi kwamba kiasi cha virusi katika damu kinakuwa hakionekani — na mtu asiyeonekana hawezi kupitisha VVU kwa mwenza wa kingono (U=U). Kila moja ya hizi tatu hufanya kazi katika hatua tofauti ya mzunguko wa maisha ya virusi: tenofovir na lamivudine zote huzuia reverse transcriptase, kimeng\'enya ambacho VVU hutumia kunakili nyenzo zake za kijeni; dolutegravir huzuia integrase, kimeng\'enya ambacho VVU hutumia kujiingiza katika seli za binadamu. Kushambulia pointi tatu kwa wakati mmoja ndicho kinachofanya mchanganyiko kuwa na nguvu na kufanya iwe vigumu sana kwa virusi kuendeleza usugu. Ikichukuliwa kila siku, TLD huruhusu mfumo wa kinga kupona na mtu mwenye VVU kuishi maisha kamili, ya kawaida.',
    sw_mtaa: 'TLD ni mchanganyiko wa dawa tatu za kupunguza makali ya VVU katika kidonge kimoja ambazo kwa pamoja zinazuia VVU kuongezeka. VVU haiwezi kuponywa, lakini TLD inaidhibiti kabisa kiasi kwamba kiasi cha virusi katika damu kinakuwa hakionekani — na mtu asiyeonekana hawezi kupitisha VVU kwa mwenza wa kingono (U=U). Kila moja ya hizi tatu inafanya kazi katika hatua tofauti ya mzunguko wa maisha ya virusi: tenofovir na lamivudine zote zinazuia reverse transcriptase, kimeng\'enya ambacho VVU inatumia kunakili nyenzo zake za kijeni; dolutegravir inazuia integrase, kimeng\'enya ambacho VVU inatumia kujiingiza katika seli za binadamu. Kushambulia pointi tatu kwa wakati mmoja ndicho kinachofanya mchanganyiko kuwa na nguvu na kufanya iwe vigumu sana kwa virusi kuendeleza usugu. Ikichukuliwa kila siku, TLD inaruhusu kinga kupona na mtu mwenye VVU kuishi maisha kamili, ya kawaida.',
  },

  commonUses: [
    {
      en: 'First-line treatment of HIV in adults and adolescents — the preferred regimen in Tanzania',
      sw: 'Matibabu ya kwanza ya VVU kwa watu wazima na vijana — regimen inayopendelewa Tanzania',
      sw_mtaa: 'Matibabu ya kwanza ya VVU kwa watu wazima na vijana — regimen inayopendelewa Tanzania',
    },
    {
      en: 'Continued treatment for people switching from older regimens (such as efavirenz-based) to the preferred dolutegravir-based combination',
      sw: 'Matibabu yanayoendelea kwa watu wanaobadili kutoka regimens za zamani (kama zinazotegemea efavirenz) kwenda mchanganyiko unaopendelewa unaotegemea dolutegravir',
      sw_mtaa: 'Matibabu yanayoendelea kwa watu wanaobadili kutoka regimens za zamani (kama zinazotegemea efavirenz) kwenda mchanganyiko unaopendelewa unaotegemea dolutegravir',
    },
    {
      en: 'Treatment of HIV in pregnancy — TLD is used in pregnancy and breastfeeding',
      sw: 'Matibabu ya VVU katika mimba — TLD hutumika katika mimba na kunyonyesha',
      sw_mtaa: 'Matibabu ya VVU katika mimba — TLD inatumika katika mimba na kunyonyesha',
    },
    {
      en: 'Treatment of HIV alongside TB treatment — with a dose adjustment to dolutegravir while on the TB drug rifampicin',
      sw: 'Matibabu ya VVU pamoja na matibabu ya TB — na marekebisho ya dose ya dolutegravir ukiwa kwenye dawa ya TB rifampicin',
      sw_mtaa: 'Matibabu ya VVU pamoja na matibabu ya TB — na marekebisho ya dose ya dolutegravir ukiwa kwenye dawa ya TB rifampicin',
    },
  ],

  howItIsTaken: {
    en: 'TLD is taken as one tablet, once a day, every day, for life. It can be taken with or without food — pick a time that fits a daily habit (a meal, brushing teeth, a phone alarm) and keep it consistent. If a dose is missed and remembered within several hours, take it then; if the next dose is very close, skip the missed one and continue — never double up. The medicine is collected free at a CTC; many stable patients collect 3-6 months at a time. Never share TLD, never stretch doses to make a supply last, and never stop without a clinician\'s guidance — stopping lets the virus rebound and can breed resistance. Keep a small buffer of pills and arrange refills before the supply runs out, including before travel.',
    sw: 'TLD huchukuliwa kama kidonge kimoja, mara moja kwa siku, kila siku, maisha yote. Inaweza kuchukuliwa na au bila chakula — chagua wakati unaoendana na tabia ya kila siku (chakula, kupiga mswaki, tahadhari ya simu) na uweke wa mfululizo. Ikiwa dose imekoswa na kukumbukwa ndani ya masaa kadhaa, ichukue wakati huo; ikiwa dose inayofuata iko karibu sana, ruka iliyokoswa na uendelee — kamwe usichukue mara mbili. Dawa huchukuliwa bure katika CTC; wagonjwa wengi imara huchukua miezi 3-6 kwa wakati mmoja. Kamwe usishiriki TLD, kamwe usinyooshe dose kufanya ugavi udumu, na kamwe usisimame bila mwongozo wa daktari — kusimama huruhusu virusi kurudi na kunaweza kuzaa usugu. Weka akiba ndogo ya vidonge na upange refills kabla ya ugavi kuisha, ikiwa ni pamoja na kabla ya safari.',
    sw_mtaa: 'TLD inachukuliwa kama kidonge kimoja, mara moja kwa siku, kila siku, maisha yote. Inaweza kuchukuliwa na au bila chakula — chagua wakati unaoendana na tabia ya kila siku (chakula, kupiga mswaki, alarm ya simu) na uweke wa mfululizo. Ikiwa dose imekoswa na kukumbukwa ndani ya masaa kadhaa, ichukue wakati huo; ikiwa next dose iko karibu sana, ruka iliyokoswa na uendelee — kamwe usichukue mara mbili. Dawa inachukuliwa bure katika CTC; wagonjwa wengi imara wanachukua miezi 3-6 kwa wakati mmoja. Kamwe usishiriki TLD, kamwe usinyooshe dose kufanya stock idumu, na kamwe usisimame bila mwongozo wa daktari — kusimama kunaruhusu virusi kurudi na kunaweza kuzaa usugu. Weka akiba ndogo ya vidonge na upange refills kabla ya stock kuisha, ikiwa ni pamoja na kabla ya safari.',
  },

  commonSideEffects: [
    {
      en: 'Mild headache, especially in the first weeks — usually settles as the body adjusts',
      sw: 'Kichwa kidogo, hasa katika wiki za kwanza — kawaida hutulia mwili unapozoea',
      sw_mtaa: 'Kichwa kidogo, hasa katika wiki za kwanza — kawaida inatulia mwili unapozoea',
    },
    {
      en: 'Mild nausea or stomach upset early on — often improves with time; taking the dose with food can help',
      sw: 'Kichefuchefu kidogo au tumbo kuvurugika mwanzoni — mara nyingi huboresha na wakati; kuchukua dose na chakula kunaweza kusaidia',
      sw_mtaa: 'Kichefuchefu kidogo au tumbo kuvurugika mwanzoni — mara nyingi inaboresha na wakati; kuchukua dose na chakula kunaweza kusaidia',
    },
    {
      en: 'Difficulty sleeping or unusual dreams in the early weeks — usually temporary',
      sw: 'Ugumu wa kulala au ndoto zisizo za kawaida katika wiki za mapema — kawaida za muda',
      sw_mtaa: 'Ugumu wa kulala au ndoto zisizo za kawaida katika wiki za mapema — kawaida za muda',
    },
    {
      en: 'Some weight gain — reported with dolutegravir-based regimens; discuss with the clinician if it is significant',
      sw: 'Kuongezeka uzito kidogo — kumeripotiwa na regimens zinazotegemea dolutegravir; jadili na daktari ikiwa ni kwa kiasi kikubwa',
      sw_mtaa: 'Kuongezeka uzito kidogo — kumeripotiwa na regimens zinazotegemea dolutegravir; jadili na daktari ikiwa ni kwa kiasi kikubwa',
    },
    {
      en: 'Mild tiredness or dizziness early in treatment — usually settles',
      sw: 'Uchovu kidogo au kizunguzungu mapema katika matibabu — kawaida hutulia',
      sw_mtaa: 'Uchovu kidogo au kizunguzungu mapema katika matibabu — kawaida inatulia',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Swelling of the legs or face, reduced urine output, or foamy urine — possible kidney problem from tenofovir. Tell the CTC clinician promptly; kidney function will be checked.',
        sw: 'Uvimbe wa miguu au uso, kupungua kwa mkojo, au mkojo wenye povu — uwezekano wa tatizo la figo kutokana na tenofovir. Mwambie daktari wa CTC haraka; utendaji wa figo utakaguliwa.',
        sw_mtaa: 'Uvimbe wa miguu au uso, kupungua kwa mkojo, au mkojo wenye povu — uwezekano wa tatizo la figo kutokana na tenofovir. Mwambie daktari wa CTC haraka; utendaji wa figo utakaguliwa.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellow eyes, dark urine, severe nausea, or right-upper abdominal pain — possible liver problem. Seek care within 24 hours.',
        sw: 'Macho ya njano, mkojo wa giza, kichefuchefu kikali, au maumivu ya tumbo upande wa juu wa kulia — uwezekano wa tatizo la ini. Tafuta huduma ndani ya masaa 24.',
        sw_mtaa: 'Macho ya njano, mkojo wa giza, kichefuchefu kikali, au maumivu ya tumbo upande wa juu wa kulia — uwezekano wa tatizo la ini. Tafuta huduma ndani ya masaa 24.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'A new severe rash, blistering skin, or mouth ulcers — possible serious drug reaction. Stop and seek care urgently.',
        sw: 'Vipele vipya vikali, ngozi inayotoka malenge, au vidonda mdomoni — uwezekano wa athari mbaya ya dawa. Acha na utafute huduma kwa haraka.',
        sw_mtaa: 'Vipele vipya vikali, ngozi inayotoka malenge, au vidonda mdomoni — uwezekano wa athari mbaya ya dawa. Acha na utafute huduma kwa haraka.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe muscle pain or weakness, deep fast breathing, or severe abdominal pain — rare but possible lactic acidosis. EMERGENCY assessment.',
        sw: 'Maumivu makali ya misuli au udhaifu, kupumua kwa kina haraka, au maumivu makali ya tumbo — nadra lakini uwezekano wa lactic acidosis. Tathmini ya DHARURA.',
        sw_mtaa: 'Maumivu makali ya misuli au udhaifu, kupumua kwa kina haraka, au maumivu makali ya tumbo — nadra lakini uwezekano wa lactic acidosis. Tathmini ya DHARURA.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Worsening symptoms or a new fever in the first weeks after starting ART — possible IRIS (immune reconstitution inflammatory syndrome). Get reviewed promptly.',
        sw: 'Dalili zinazozidi au homa mpya katika wiki za kwanza baada ya kuanza ART — uwezekano wa IRIS (immune reconstitution inflammatory syndrome). Pata ukaguzi haraka.',
        sw_mtaa: 'Dalili zinazozidi au homa mpya katika wiki za kwanza baada ya kuanza ART — uwezekano wa IRIS (immune reconstitution inflammatory syndrome). Pata ukaguzi haraka.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'rifampicin',
      withDisplay: {
        en: 'Rifampicin (in RHZE / TB treatment)',
        sw: 'Rifampicin (katika RHZE / matibabu ya TB)',
      },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin, a key TB drug, speeds up the breakdown of dolutegravir (the "D" in TLD) and lowers its blood level. The Tanzania solution is to add an extra dose of dolutegravir — taking it twice daily instead of once daily — for the whole time rifampicin is being taken, then returning to once daily 2 weeks after rifampicin ends. Do NOT stop TLD because of TB. This is one of the most important interactions in TB-HIV care, and the CTC and TB clinic coordinate it.',
        sw: 'Rifampicin, dawa muhimu ya TB, huharakisha kuvunjwa kwa dolutegravir ("D" katika TLD) na hushusha kiwango chake cha damu. Suluhisho la Tanzania ni kuongeza dose ya ziada ya dolutegravir — kuichukua mara mbili kwa siku badala ya mara moja kwa siku — kwa muda wote rifampicin inachukuliwa, kisha kurudi mara moja kwa siku wiki 2 baada ya rifampicin kuisha. USISIMAMISHE TLD kwa sababu ya TB. Huu ni mojawapo ya mwingiliano muhimu zaidi katika huduma ya TB-VVU, na CTC na kliniki ya TB huiratibu.',
        sw_mtaa: 'Rifampicin, dawa muhimu ya TB, inaharakisha kuvunjwa kwa dolutegravir ("D" katika TLD) na inashusha kiwango chake cha damu. Suluhisho la Tanzania ni kuongeza dose ya ziada ya dolutegravir — kuichukua mara mbili kwa siku badala ya mara moja kwa siku — kwa muda wote rifampicin inachukuliwa, kisha kurudi mara moja kwa siku wiki 2 baada ya rifampicin kuisha. USISIMAMISHE TLD kwa sababu ya TB. Huu ni mojawapo ya muhimu zaidi interactions katika TB-HIV care, na CTC na TB clinic zinairatibu.',
      },
      sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
    },
    {
      with: 'rhze',
      withDisplay: {
        en: 'RHZE (the TB four-drug combination)',
        sw: 'RHZE (mchanganyiko wa dawa nne za TB)',
      },
      severity: 'caution',
      explanation: {
        en: 'RHZE contains rifampicin, which lowers dolutegravir levels — so while on TB treatment, dolutegravir is given twice daily, returning to once daily 2 weeks after the rifampicin-containing phase ends. TB treatment and TLD are taken together, never one instead of the other. The CTC and DOT centre coordinate the timing and dosing. See the dedicated TB and RHZE guidance for the full picture.',
        sw: 'RHZE ina rifampicin, ambayo hushusha viwango vya dolutegravir — hivyo ukiwa kwenye matibabu ya TB, dolutegravir hutolewa mara mbili kwa siku, kurudi mara moja kwa siku wiki 2 baada ya hatua yenye rifampicin kuisha. Matibabu ya TB na TLD huchukuliwa pamoja, kamwe moja badala ya nyingine. CTC na kituo cha DOT huratibu wakati na dose. Ona muongozo maalum wa TB na RHZE kwa picha kamili.',
        sw_mtaa: 'RHZE ina rifampicin, ambayo inashusha viwango vya dolutegravir — hivyo ukiwa kwenye matibabu ya TB, dolutegravir inatolewa mara mbili kwa siku, inarudi mara moja kwa siku wiki 2 baada ya hatua yenye rifampicin kuisha. Matibabu ya TB na TLD yanachukuliwa pamoja, kamwe moja badala ya nyingine. CTC na DOT centre zinaratibu wakati na dose. Ona muongozo maalum wa TB na RHZE kwa picha kamili.',
      },
      sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
    },
    {
      with: 'antacids',
      withDisplay: {
        en: 'Antacids and supplements containing magnesium, aluminium, calcium, or iron',
        sw: 'Antacids na virutubisho vyenye magnesium, aluminium, calcium, au madini ya chuma',
      },
      severity: 'caution',
      explanation: {
        en: 'Antacids and mineral supplements (magnesium, aluminium, calcium, iron) can bind dolutegravir in the gut and reduce how much is absorbed. They are not forbidden, but the timing matters: take TLD at least 2 hours before, or 6 hours after, these products. Calcium or iron can be taken at the same time as TLD only if also taken with food. Mention any antacids or supplements to the CTC clinician.',
        sw: 'Antacids na virutubisho vya madini (magnesium, aluminium, calcium, madini ya chuma) vinaweza kufunga dolutegravir tumboni na kupunguza kiasi kinachofyonzwa. Havikatazwi, lakini wakati unajali: chukua TLD angalau masaa 2 kabla, au masaa 6 baada, ya bidhaa hizi. Calcium au madini ya chuma yanaweza kuchukuliwa wakati mmoja na TLD ikiwa tu pia yanachukuliwa na chakula. Taja antacids au virutubisho vyovyote kwa daktari wa CTC.',
        sw_mtaa: 'Antacids na virutubisho vya madini (magnesium, aluminium, calcium, madini ya chuma) vinaweza kufunga dolutegravir tumboni na kupunguza kiasi kinachofyonzwa. Havikatazwi, lakini wakati unajali: chukua TLD angalau masaa 2 kabla, au masaa 6 baada, ya bidhaa hizi. Calcium au madini ya chuma yanaweza kuchukuliwa wakati mmoja na TLD ikiwa tu pia yanachukuliwa na chakula. Taja antacids au virutubisho vyovyote kwa daktari wa CTC.',
      },
      sources: [src('NACP_ART_2024'), src('EMC_CURRENT')],
    },
    {
      with: 'metformin',
      withDisplay: {
        en: 'Metformin (for diabetes)',
        sw: 'Metformin (kwa kisukari)',
      },
      severity: 'note',
      explanation: {
        en: 'Dolutegravir can raise the blood level of metformin. This is usually manageable — the diabetes clinician may monitor blood sugar a little more closely or adjust the metformin dose. It is not a reason to avoid either medicine; just make sure every clinician knows about both the HIV treatment and the diabetes treatment.',
        sw: 'Dolutegravir inaweza kuinua kiwango cha damu cha metformin. Hii kawaida inaweza kudhibitiwa — daktari wa kisukari anaweza kufuatilia sukari ya damu kwa karibu kidogo zaidi au kurekebisha dose ya metformin. Sio sababu ya kuepuka dawa yoyote; hakikisha tu kila daktari anajua kuhusu matibabu ya VVU na matibabu ya kisukari.',
        sw_mtaa: 'Dolutegravir inaweza kuinua kiwango cha damu cha metformin. Hii kawaida inaweza kudhibitiwa — daktari wa kisukari anaweza kufuatilia sugar kwa karibu kidogo zaidi au kurekebisha dose ya metformin. Sio sababu ya kuepuka dawa yoyote; hakikisha tu kila daktari anajua kuhusu matibabu ya VVU na matibabu ya kisukari.',
      },
      sources: [src('NACP_ART_2024'), src('EMC_CURRENT')],
    },
    {
      with: 'alcohol',
      withDisplay: {
        en: 'Alcohol (beer, wine, spirits, traditional brews)',
        sw: 'Pombe (bia, mvinyo, vinywaji vikali, vinywaji vya jadi)',
      },
      severity: 'caution',
      explanation: {
        en: 'Alcohol does not have a dangerous direct chemical clash with TLD, but it is still important to be careful. The real problem is that drinking — especially heavy drinking — makes it much harder to remember the daily dose, can worsen mood and depression, and adds strain to the liver. Missed doses are the main route to treatment failure. If alcohol is making adherence difficult, the CTC can connect you with support; honesty about drinking helps the clinician help you.',
        sw: 'Pombe haina mgongano hatari wa moja kwa moja wa kemikali na TLD, lakini bado ni muhimu kuwa makini. Tatizo halisi ni kwamba kunywa — hasa kunywa kwa wingi — hufanya iwe vigumu zaidi kukumbuka dose ya kila siku, kunaweza kuzidisha hali ya moyo na unyogovu, na huongeza mzigo kwa ini. Dose zilizokoswa ni njia kuu ya kushindwa kwa matibabu. Ikiwa pombe inafanya kuzingatia kuwa vigumu, CTC inaweza kukuunganisha na msaada; uaminifu kuhusu kunywa humsaidia daktari kukusaidia.',
        sw_mtaa: 'Pombe haina mgongano hatari wa moja kwa moja wa kemikali na TLD, lakini bado ni muhimu kuwa makini. Tatizo halisi ni kwamba kunywa — hasa kunywa kwa wingi — kunafanya iwe vigumu zaidi kukumbuka dose ya kila siku, kunaweza kuzidisha mood na depression, na kunaongeza mzigo kwa ini. Missed doses ndio njia kuu ya treatment failure. Ikiwa pombe inafanya adherence kuwa vigumu, CTC inaweza kukuunganisha na msaada; uaminifu kuhusu kunywa unamsaidia daktari kukusaidia.',
      },
      sources: [src('NACP_ART_2024')],
    },
    {
      with: 'herbal_remedies',
      withDisplay: {
        en: 'Herbal remedies and unprescribed traditional medicines',
        sw: 'Dawa za mitishamba na dawa za jadi zisizoagizwa',
      },
      severity: 'caution',
      explanation: {
        en: 'Some herbal products can change how ART medicines are processed by the body — either lowering their level (so the virus is not controlled) or raising it (more side effects). The bigger danger is when herbal or faith-based remedies are used as a REPLACEMENT for ART — nothing replaces ART, and people who stop ART for unproven cures get sick. Faith and traditional support can sit alongside ART, but always tell the CTC clinician about any other products being taken so interactions can be checked.',
        sw: 'Baadhi ya bidhaa za mitishamba zinaweza kubadilisha jinsi dawa za ART zinavyochakatwa na mwili — ama kushusha kiwango chao (hivyo virusi havidhibitiwi) au kuinua (athari zaidi). Hatari kubwa zaidi ni wakati dawa za mitishamba au za kidini zinatumika KAMA MBADALA wa ART — hakuna kinachorudisha ART, na watu wanaosimamisha ART kwa tiba zisizothibitishwa huugua. Imani na msaada wa jadi vinaweza kukaa pamoja na ART, lakini daima mwambie daktari wa CTC kuhusu bidhaa zingine zozote zinazochukuliwa ili mwingiliano ukaguliwe.',
        sw_mtaa: 'Baadhi ya bidhaa za mitishamba zinaweza kubadilisha jinsi dawa za ART zinavyochakatwa na mwili — ama kushusha kiwango chao (hivyo virusi havidhibitiwi) au kuinua (athari zaidi). Hatari kubwa zaidi ni wakati dawa za mitishamba au za kidini zinatumika KAMA MBADALA wa ART — hakuna kinachorudisha ART, na watu wanaosimamisha ART kwa tiba zisizothibitishwa wanaugua. Imani na msaada wa jadi vinaweza kukaa pamoja na ART, lakini daima mwambie daktari wa CTC kuhusu bidhaa zingine zozote zinazochukuliwa ili interactions zikaguliwe.',
      },
      sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
    },
  ],

  lifestyleNotes: [
    {
      topic: {
        en: 'Taking it for life',
        sw: 'Kuichukua maisha yote',
      },
      note: {
        en: 'TLD is lifelong — there is no "course" that finishes. Feeling completely well is the goal of the medicine, not a reason to stop. The virus stays in the body and rebounds within days to weeks if TLD is stopped. Build the daily dose into a routine and never let the supply run out.',
        sw: 'TLD ni ya maisha — hakuna "kozi" inayoisha. Kujisikia vizuri kabisa ndio lengo la dawa, sio sababu ya kusimama. Virusi hubaki mwilini na hurudi ndani ya siku hadi wiki ikiwa TLD itasimamishwa. Jenga dose ya kila siku katika utaratibu na kamwe usiruhusu ugavi kuisha.',
        sw_mtaa: 'TLD ni ya maisha — hakuna "kozi" inayoisha. Kujisikia vizuri kabisa ndio lengo la dawa, sio sababu ya kusimama. Virusi vinabaki mwilini na vinarudi ndani ya siku hadi wiki ikiwa TLD itasimamishwa. Jenga dose ya kila siku katika utaratibu na kamwe usiruhusu stock kuisha.',
      },
    },
    {
      topic: {
        en: 'Food and timing',
        sw: 'Chakula na wakati',
      },
      note: {
        en: 'TLD can be taken with or without food. What matters most is consistency — the same time each day. If antacids or mineral supplements are also used, separate them from the TLD dose (TLD at least 2 hours before or 6 hours after).',
        sw: 'TLD inaweza kuchukuliwa na au bila chakula. Kinachojali zaidi ni mfululizo — wakati ule ule kila siku. Ikiwa antacids au virutubisho vya madini pia vinatumika, vitenganishe na dose ya TLD (TLD angalau masaa 2 kabla au masaa 6 baada).',
        sw_mtaa: 'TLD inaweza kuchukuliwa na au bila chakula. Kinachojali zaidi ni mfululizo — wakati ule ule kila siku. Ikiwa antacids au virutubisho vya madini pia vinatumika, vitenganishe na dose ya TLD (TLD angalau masaa 2 kabla au masaa 6 baada).',
      },
    },
    {
      topic: {
        en: 'Pregnancy and breastfeeding',
        sw: 'Mimba na kunyonyesha',
      },
      note: {
        en: 'TLD is used in pregnancy and breastfeeding — staying on effective ART protects both the mother\'s health and the baby (see the PMTCT guidance). Anyone planning a pregnancy, or who becomes pregnant while on TLD, should tell the CTC so care can be coordinated with antenatal services — but TLD is not a reason to delay or avoid pregnancy.',
        sw: 'TLD hutumika katika mimba na kunyonyesha — kubaki kwenye ART yenye ufanisi hulinda afya ya mama na mtoto (ona muongozo wa PMTCT). Yeyote anayepanga mimba, au anayepata mimba akiwa kwenye TLD, anapaswa kumwambia CTC ili huduma iratibiwe na huduma za ujauzito — lakini TLD sio sababu ya kuchelewesha au kuepuka mimba.',
        sw_mtaa: 'TLD inatumika katika mimba na kunyonyesha — kubaki kwenye ART yenye ufanisi kunalinda afya ya mama na mtoto (ona muongozo wa PMTCT). Yeyote anayepanga mimba, au anayepata mimba akiwa kwenye TLD, anapaswa kumwambia CTC ili huduma iratibiwe na huduma za ujauzito — lakini TLD sio sababu ya kuchelewesha au kuepuka mimba.',
      },
    },
    {
      topic: {
        en: 'The kidneys',
        sw: 'Figo',
      },
      note: {
        en: 'Tenofovir (the "T" in TLD) is processed by the kidneys, so kidney function is checked at baseline and periodically. Protect the kidneys by staying hydrated, controlling blood pressure and diabetes if present, and avoiding unnecessary painkillers and unprescribed medicines. Report any swelling, foamy urine, or change in urine output to the CTC.',
        sw: 'Tenofovir ("T" katika TLD) huchakatwa na figo, hivyo utendaji wa figo hukaguliwa wakati wa msingi na mara kwa mara. Linda figo kwa kubaki na maji ya kutosha, kudhibiti shinikizo la damu na kisukari ikiwa vipo, na kuepuka dawa za maumivu zisizo za lazima na dawa zisizoagizwa. Ripoti uvimbe wowote, mkojo wenye povu, au mabadiliko ya mkojo kwa CTC.',
        sw_mtaa: 'Tenofovir ("T" katika TLD) inachakatwa na figo, hivyo utendaji wa figo unakaguliwa wakati wa msingi na mara kwa mara. Linda figo kwa kubaki na maji ya kutosha, kudhibiti presha na kisukari ikiwa vipo, na kuepuka dawa za maumivu zisizo za lazima na dawa zisizoagizwa. Ripoti uvimbe wowote, mkojo wenye povu, au mabadiliko ya mkojo kwa CTC.',
      },
    },
    {
      topic: {
        en: 'U=U — protecting partners',
        sw: 'U=U — kulinda wenza',
      },
      note: {
        en: 'Taken consistently, TLD drives the viral load down to undetectable — and an undetectable person cannot transmit HIV to a sexual partner (U=U). This is one of the most powerful reasons to take it every day. Condoms still add protection against other sexually transmitted infections and unplanned pregnancy, and an HIV-negative partner can also consider PrEP.',
        sw: 'Ikichukuliwa kwa mfululizo, TLD hushusha viral load hadi isiyoonekana — na mtu asiyeonekana hawezi kupitisha VVU kwa mwenza wa kingono (U=U). Hii ni mojawapo ya sababu zenye nguvu zaidi za kuichukua kila siku. Kondomu bado huongeza ulinzi dhidi ya maambukizi mengine ya zinaa na mimba isiyopangwa, na mwenza asiye na VVU anaweza pia kufikiria PrEP.',
        sw_mtaa: 'Ikichukuliwa kwa mfululizo, TLD inashusha viral load hadi isiyoonekana — na mtu asiyeonekana hawezi kupitisha VVU kwa mwenza wa kingono (U=U). Hii ni mojawapo ya sababu zenye nguvu zaidi za kuichukua kila siku. Kondomu bado zinaongeza ulinzi dhidi ya magonjwa mengine ya zinaa na mimba isiyopangwa, na mwenza asiye na VVU anaweza pia kufikiria PrEP.',
      },
    },
    {
      topic: {
        en: 'Travel and supply',
        sw: 'Safari na ugavi',
      },
      note: {
        en: 'When travelling, carry enough TLD for the whole trip plus a few extra days, and keep it in hand luggage. Know the next refill date and arrange collection before the supply runs out. Running out of pills is the most preventable cause of treatment interruption.',
        sw: 'Unaposafiri, beba TLD ya kutosha kwa safari nzima pamoja na siku chache za ziada, na uiweke katika mzigo wa mkononi. Jua tarehe ya refill inayofuata na upange kuchukua kabla ya ugavi kuisha. Kuishiwa na vidonge ni sababu inayoweza kuzuilika zaidi ya kukatiza matibabu.',
        sw_mtaa: 'Unaposafiri, beba TLD ya kutosha kwa safari nzima pamoja na siku chache za ziada, na uiweke katika hand luggage. Jua tarehe ya refill inayofuata na upange kuchukua kabla ya stock kuisha. Kuishiwa na vidonge ni sababu inayoweza kuzuilika zaidi ya kukatiza matibabu.',
      },
    },
  ],

  sources: [
    src('NACP_ART_2024'),
    src('WHO_HIV_2024'),
    src('NTLG_STG_2023'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
