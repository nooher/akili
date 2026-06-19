/**
 * ARB — Angiotensin Receptor Blocker (Losartan / Telmisartan, the "-sartan"
 * class) — Drug Knowledge
 *
 * Sources: KDIGO CKD 2024, NTLG STG 2023, AHA/ACC 2017 BP, ISH 2020,
 *          BNF (current), EMC (current).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Relationship to ACE inhibitors:
 *   ARBs and ACE inhibitors do almost the same job — lower blood pressure,
 *   protect the kidneys, ease the heart. The defining practical difference:
 *   ARBs do NOT cause the dry cough. In Tanzania an ARB is the standard
 *   switch when an ACE inhibitor causes an intolerable cough, and it is
 *   also a valid first choice. The two are alternatives, never combined.
 *
 * Scope note:
 *   Educate on what it does, why prescribed, what to expect, warning signs.
 *   No doses. High-value teaching: no cough (vs ACE-i), still needs the
 *   same potassium/creatinine monitoring, still absolutely avoided in
 *   pregnancy, still a silent long-term protector.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const ARB: DrugKnowledge = {
  id: 'arb',
  aliases: DRUG_ALIASES.arb,

  drugClass: {
    en: 'ARB — angiotensin receptor blocker; a blood-pressure and kidney-protecting medicine (the "-sartan" family: losartan, telmisartan, valsartan)',
    sw: 'ARB — kizuia kipokezi cha angiotensin; dawa ya shinikizo la damu inayolinda figo (familia ya "-sartan": losartan, telmisartan, valsartan)',
  },

  whatItDoes: {
    en: 'An ARB blocks the action of a body chemical (angiotensin) that tightens blood vessels. By blocking it, the vessels relax, blood pressure falls, and — importantly — the pressure inside the kidney\'s tiny filters drops too, which protects the kidney over the long term. It does almost exactly the same job as an ACE inhibitor, with one practical difference that matters a lot to patients: an ARB does not cause the dry, tickly cough that ACE inhibitors are known for. ARBs also ease the heart\'s workload and are used in heart failure.',
    sw: 'ARB huzuia kitendo cha kemikali ya mwili (angiotensin) inayokaza mishipa ya damu. Kwa kuizuia, mishipa hulegea, shinikizo la damu hushuka, na — kwa umuhimu — shinikizo ndani ya vichujio vidogo vya figo hushuka pia, ambayo hulinda figo kwa muda mrefu. Hufanya kazi karibu sawa kabisa na kizuizi cha ACE, ikiwa na tofauti moja ya kivitendo inayowajali sana wagonjwa: ARB haisababishi kikohozi kikavu ambacho vizuizi vya ACE hujulikana kwacho. ARB pia hupunguza mzigo wa kazi wa moyo na hutumika katika kushindwa kwa moyo.',
    sw_mtaa: 'ARB inazuia kitendo cha kemikali ya mwili (angiotensin) inayokaza mishipa ya damu. Kwa kuizuia, mishipa inalegea, presha inashuka, na — kitu muhimu — presha ndani ya vichujio vidogo vya figo inashuka pia, inalinda figo kwa muda mrefu. Inafanya kazi karibu sawa kabisa na dawa ya ACE, ikiwa na tofauti moja muhimu kwa wagonjwa: ARB haisababishi kikohozi kikavu ambacho dawa za ACE zinajulikana kwacho. ARB pia inapunguza kazi ya moyo na inatumika kwa moyo dhaifu.',
  },

  commonUses: [
    {
      en: 'High blood pressure — a first-line option, and the usual choice for people who could not tolerate an ACE inhibitor.',
      sw: 'Shinikizo la damu la juu — chaguo la kwanza, na chaguo la kawaida kwa watu ambao hawakuweza kuvumilia kizuizi cha ACE.',
      sw_mtaa: 'Presha ya juu — ni dawa ya kwanza, na ndiyo chaguo la kawaida kwa watu ambao hawakuweza kuvumilia dawa ya ACE.',
    },
    {
      en: 'Kidney protection in CKD — especially with protein in the urine; slows the long-term decline of kidney function.',
      sw: 'Kulinda figo katika CKD — hasa pamoja na protini kwenye mkojo; hupunguza kasi ya kushuka kwa muda mrefu kwa utendaji wa figo.',
      sw_mtaa: 'Kulinda figo kwa mtu mwenye CKD — hasa kama kuna protini kwenye mkojo; inapunguza kasi ya figo kuharibika kwa muda mrefu.',
    },
    {
      en: 'Diabetes with kidney involvement — protects the kidneys of people with diabetes.',
      sw: 'Kisukari chenye kuathiri figo — hulinda figo za watu wenye kisukari.',
      sw_mtaa: 'Kisukari kinachoathiri figo — inalinda figo za watu wenye kisukari.',
    },
    {
      en: 'Heart failure — reduces the heart\'s workload and improves symptoms and survival.',
      sw: 'Kushindwa kwa moyo — hupunguza mzigo wa kazi wa moyo na huboresha dalili na uhai.',
      sw_mtaa: 'Moyo dhaifu — inapunguza kazi ya moyo na inaboresha dalili na maisha.',
    },
    {
      en: 'As the switch from an ACE inhibitor when the ACE-inhibitor cough is intolerable.',
      sw: 'Kama mbadala wa kizuizi cha ACE wakati kikohozi cha kizuizi cha ACE hakivumiliki.',
      sw_mtaa: 'Kama mbadala wa dawa ya ACE wakati kikohozi cha ACE hakivumiliki.',
    },
  ],

  howItIsTaken: {
    en: 'Usually one tablet a day, swallowed with water, at the same time each day. As with ACE inhibitors, the dose is started low and stepped up slowly, and a blood test is done within 1-2 weeks of starting and after any dose increase to check kidney function and potassium. The first dose can lower blood pressure noticeably, so stand up slowly in the first days. It is a long-term medicine — taken every day, indefinitely, even when you feel completely well. Do not stop it on your own.',
    sw: 'Kwa kawaida kidonge kimoja kwa siku, kumezwa na maji, kwa wakati ule ule kila siku. Kama ilivyo kwa vizuizi vya ACE, dose huanzishwa ndogo na kuongezwa polepole, na kipimo cha damu hufanywa ndani ya wiki 1-2 za kuanza na baada ya kuongeza dose yoyote kuangalia utendaji wa figo na potassium. Dose ya kwanza inaweza kushusha shinikizo la damu kwa kiasi kinachoonekana, hivyo simama polepole katika siku za kwanza. Ni dawa ya muda mrefu — kuchukuliwa kila siku, bila kikomo, hata unapojisikia mzima kabisa. Usiiache peke yako.',
    sw_mtaa: 'Kwa kawaida kidonge kimoja kwa siku, unameza na maji, kwa wakati ule ule kila siku. Kama dawa za ACE, dose inaanza ndogo na kuongezwa polepole, na kipimo cha damu kinafanywa ndani ya wiki 1-2 za kuanza na baada ya kuongeza dose yoyote kuangalia figo na potassium. Dose ya kwanza inaweza kushusha presha kwa kiasi kinachoonekana, hivyo simama polepole siku za kwanza. Ni dawa ya muda mrefu — unaichukua kila siku, bila kikomo, hata ukijisikia mzima kabisa. Usiiache peke yako.',
  },

  commonSideEffects: [
    {
      en: 'Dizziness or light-headedness, especially in the first days or when standing up quickly — your blood pressure is adjusting. Stand up slowly; it usually settles.',
      sw: 'Kizunguzungu au kuhisi kichwa chepesi, hasa katika siku za kwanza au unaposimama haraka — shinikizo lako la damu linajirekebisha. Simama polepole; kwa kawaida hutulia.',
      sw_mtaa: 'Kizunguzungu au kuhisi kichwa chepesi, hasa siku za kwanza au unaposimama haraka — presha yako inajirekebisha. Simama polepole; kwa kawaida inatulia.',
    },
    {
      en: 'A mild headache or tiredness in the first week or two as your body adjusts.',
      sw: 'Maumivu madogo ya kichwa au uchovu katika wiki ya kwanza au mbili wakati mwili wako unajirekebisha.',
      sw_mtaa: 'Maumivu kidogo ya kichwa au uchovu wiki ya kwanza au mbili wakati mwili unajizoesha.',
    },
    {
      en: 'Unlike ACE inhibitors, an ARB does not typically cause a dry cough — this is the main reason people are switched to it.',
      sw: 'Tofauti na vizuizi vya ACE, ARB kwa kawaida haisababishi kikohozi kikavu — hii ndiyo sababu kuu watu hubadilishwa kwenda kwacho.',
      sw_mtaa: 'Tofauti na dawa za ACE, ARB kwa kawaida haisababishi kikohozi kikavu — hii ndiyo sababu kuu watu wanabadilishiwa kwenda kwacho.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Sudden swelling of the lips, tongue, face or throat, or difficulty breathing or swallowing — angioedema. It is rarer with ARBs than with ACE inhibitors, but it can still happen. Stop the medicine and get emergency care immediately.',
        sw: 'Kuvimba kwa ghafla kwa midomo, ulimi, uso au koo, au ugumu wa kupumua au kumeza — angioedema. Ni nadra zaidi kwa ARB kuliko kwa vizuizi vya ACE, lakini bado inaweza kutokea. Acha dawa na utafute huduma ya dharura mara moja.',
        sw_mtaa: 'Kuvimba kwa ghafla kwa midomo, ulimi, uso au koo, au kushindwa kupumua au kumeza — angioedema. Ni nadra zaidi kwa ARB kuliko dawa za ACE, lakini bado inaweza kutokea. Acha dawa na utafute huduma ya dharura mara moja.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Very little urine, worsening swelling of the legs, or feeling very unwell — possible sharp drop in kidney function. Needs urgent assessment and a blood test.',
        sw: 'Mkojo kidogo sana, kuvimba kwa miguu kunakozidi, au kujisikia vibaya sana — uwezekano wa kushuka kwa kasi kwa utendaji wa figo. Inahitaji tathmini ya haraka na kipimo cha damu.',
        sw_mtaa: 'Mkojo kidogo sana, miguu kuvimba zaidi, au kujisikia vibaya sana — inawezekana figo zimeshuka kazi kwa kasi. Inahitaji tathmini ya haraka na kipimo cha damu.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Muscle weakness, an unusually slow or irregular heartbeat, or numbness — possible high potassium, which ARBs can cause, especially with kidney disease. Needs an urgent blood test.',
        sw: 'Udhaifu wa misuli, mapigo ya moyo ya polepole au yasiyo ya kawaida, au ganzi — uwezekano wa potassium ya juu, ambayo ARB zinaweza kusababisha, hasa pamoja na ugonjwa wa figo. Inahitaji kipimo cha damu cha haraka.',
        sw_mtaa: 'Udhaifu wa misuli, moyo kupiga polepole au visivyo kawaida, au ganzi — inawezekana potassium ya juu, ambayo ARB zinaweza kusababisha, hasa kwa mtu mwenye ugonjwa wa figo. Inahitaji kipimo cha damu cha haraka.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Fainting, or dizziness so severe you cannot stand — blood pressure may have dropped too low. Sit or lie down and contact your clinician.',
        sw: 'Kuzimia, au kizunguzungu kikali kiasi kwamba huwezi kusimama — shinikizo la damu huenda limeshuka chini sana. Kaa au lala chini na wasiliana na daktari wako.',
        sw_mtaa: 'Kuzimia, au kizunguzungu kikali kiasi huwezi kusimama — presha huenda imeshuka chini sana. Kaa au lala chini na wasiliana na daktari.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'pregnancy',
      withDisplay: { en: 'Pregnancy', sw: 'Ujauzito' },
      severity: 'avoid',
      explanation: {
        en: 'ARBs must NOT be used in pregnancy — exactly like ACE inhibitors, they can seriously harm the developing baby\'s kidneys and growth, especially in the second and third trimesters. Switching to an ARB does not remove this risk. A woman who could become pregnant should discuss this with her clinician, and anyone who finds they are pregnant while taking an ARB should contact their clinician promptly to switch to a pregnancy-safe blood-pressure medicine.',
        sw: 'ARB HAZIPASWI kutumika katika ujauzito — kama vizuizi vya ACE haswa, zinaweza kudhuru vibaya figo na ukuaji wa mtoto anayekua, hasa katika miezi mitatu ya pili na ya tatu. Kubadilisha kwenda ARB hakuondoi hatari hii. Mwanamke anayeweza kupata ujauzito anapaswa kujadili hili na daktari wake, na yeyote anayegundua ana ujauzito akiwa anatumia ARB anapaswa kuwasiliana na daktari wake haraka ili kubadilisha kwenda dawa ya shinikizo la damu salama kwa ujauzito.',
        sw_mtaa: 'ARB HAZIPASWI kutumika katika ujauzito — kama dawa za ACE haswa, zinaweza kudhuru vibaya figo na ukuaji wa mtoto, hasa miezi mitatu ya pili na ya tatu. Kubadilisha kwenda ARB hakuondoi hatari hii. Mwanamke anayeweza kushika mimba ajadiliane na daktari, na yeyote anayegundua ana mimba akiwa anatumia ARB awasiliane na daktari haraka ili abadilishiwe dawa ya presha salama kwa mimba.',
      },
      sources: [src('NTLG_STG_2023'), src('BNF_CURRENT')],
    },
    {
      with: 'ace_inhibitor',
      withDisplay: { en: 'ACE inhibitors (enalapril, lisinopril)', sw: 'Vizuizi vya ACE (enalapril, lisinopril)' },
      severity: 'avoid',
      explanation: {
        en: 'ARBs and ACE inhibitors act on the same body system, so they are not taken together — combining them does not add meaningful benefit but markedly raises the risk of high potassium and kidney injury. They are alternatives to one another. If you were switched from an ACE inhibitor to an ARB because of the cough, the ACE inhibitor should have been stopped, not continued alongside.',
        sw: 'ARB na vizuizi vya ACE hufanya kazi kwenye mfumo ule ule wa mwili, hivyo havichukuliwi pamoja — kuvichanganya hakuongezi faida ya maana lakini huongeza sana hatari ya potassium ya juu na jeraha la figo. Ni mbadala kwa kila kimoja. Ikiwa ulibadilishwa kutoka kizuizi cha ACE kwenda ARB kwa sababu ya kikohozi, kizuizi cha ACE kilipaswa kusimamishwa, si kuendelea pamoja.',
        sw_mtaa: 'ARB na dawa za ACE zinafanya kazi kwenye mfumo ule ule wa mwili, hivyo hazichukuliwi pamoja — kuzichanganya hakuongezi faida ya maana lakini kunaongeza sana hatari ya potassium ya juu na figo kuumia. Ni mbadala kwa kila moja. Kama ulibadilishwa kutoka dawa ya ACE kwenda ARB kwa sababu ya kikohozi, dawa ya ACE ilipaswa kusimamishwa, si kuendelea pamoja.',
      },
      sources: [src('KDIGO_CKD_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'nsaid',
      withDisplay: { en: 'Painkillers like ibuprofen, diclofenac (NSAIDs)', sw: 'Dawa za maumivu kama ibuprofen, diclofenac (NSAID)' },
      severity: 'caution',
      explanation: {
        en: 'Anti-inflammatory painkillers (ibuprofen, diclofenac, and similar) strain the kidneys, and combined with an ARB — especially alongside a water tablet — they can reduce kidney function and raise potassium. An occasional single dose for pain is usually tolerable; regular use should be discussed with your clinician, who may suggest paracetamol instead.',
        sw: 'Dawa za maumivu zinazopunguza uvimbe (ibuprofen, diclofenac, na zinazofanana) hukaza figo, na zikichanganywa na ARB — hasa pamoja na kidonge cha maji — zinaweza kupunguza utendaji wa figo na kuongeza potassium. Dose moja ya mara kwa mara kwa maumivu kwa kawaida huvumilika; matumizi ya kawaida yanapaswa kujadiliwa na daktari wako, ambaye anaweza kupendekeza paracetamol badala yake.',
        sw_mtaa: 'Dawa za maumivu zinazopunguza uvimbe (ibuprofen, diclofenac, na zinazofanana) zinakaza figo, na zikichanganywa na ARB — hasa pamoja na kidonge cha maji — zinaweza kupunguza kazi ya figo na kuongeza potassium. Dose moja ya hapa na pale kwa maumivu kwa kawaida ni sawa; matumizi ya kila siku yajadiliwe na daktari, anaweza kukupa paracetamol badala yake.',
      },
      sources: [src('KDIGO_CKD_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'potassium_supplement',
      withDisplay: { en: 'Potassium supplements and potassium-based salt substitutes', sw: 'Virutubisho vya potassium na chumvi mbadala zenye potassium' },
      severity: 'caution',
      explanation: {
        en: 'ARBs raise blood potassium. Adding potassium supplements, or "low-sodium" salt substitutes that are actually potassium-based, can push potassium dangerously high — a risk to the heart. Tell your clinician about any supplements or salt substitutes you use, and do not start them without advice.',
        sw: 'ARB huongeza potassium ya damu. Kuongeza virutubisho vya potassium, au chumvi mbadala "zenye sodiamu kidogo" ambazo kwa kweli zimetengenezwa kwa potassium, kunaweza kupandisha potassium juu kwa hatari — hatari kwa moyo. Mwambie daktari wako kuhusu virutubisho au chumvi mbadala zozote unazotumia, na usizianzishe bila ushauri.',
        sw_mtaa: 'ARB zinaongeza potassium ya damu. Kuongeza virutubisho vya potassium, au chumvi mbadala "zenye sodiamu kidogo" ambazo kwa kweli zimetengenezwa kwa potassium, kunaweza kupandisha potassium juu kwa hatari — hatari kwa moyo. Mwambie daktari kuhusu virutubisho au chumvi mbadala unazotumia, na usizianze bila ushauri.',
      },
      sources: [src('KDIGO_CKD_2024')],
    },
    {
      with: 'diuretic',
      withDisplay: { en: 'Water tablets (diuretics like furosemide, hydrochlorothiazide)', sw: 'Vidonge vya maji (diuretics kama furosemide, hydrochlorothiazide)' },
      severity: 'caution',
      explanation: {
        en: 'ARBs and water tablets are often prescribed together on purpose and work well as a team. But the combination can sometimes lower blood pressure or kidney function more than expected, especially with dehydration from vomiting, diarrhoea, or hot weather. If you are unwell and not drinking normally, contact your clinician — these medicines are sometimes paused for a day or two ("sick day rules").',
        sw: 'ARB na vidonge vya maji mara nyingi huandikwa pamoja kwa makusudi na hufanya kazi vizuri kama timu. Lakini mchanganyiko huo wakati mwingine unaweza kushusha shinikizo la damu au utendaji wa figo zaidi ya inavyotarajiwa, hasa pamoja na upungufu wa maji kutokana na kutapika, kuhara, au hali ya hewa ya joto. Ikiwa huna afya na hunywi maji kawaida, wasiliana na daktari wako — dawa hizi wakati mwingine husimamishwa kwa siku moja au mbili ("sheria za siku za ugonjwa").',
        sw_mtaa: 'ARB na vidonge vya maji mara nyingi unaandikiwa pamoja kwa makusudi na zinafanya kazi vizuri kama timu. Lakini mchanganyiko huo wakati mwingine unaweza kushusha presha au kazi ya figo zaidi ya inavyotarajiwa, hasa pamoja na upungufu wa maji kutokana na kutapika, kuhara, au joto. Kama huna afya na hunywi maji kawaida, wasiliana na daktari — dawa hizi wakati mwingine zinasimamishwa kwa siku moja au mbili ("sick day rules").',
      },
      sources: [src('KDIGO_CKD_2024'), src('NTLG_STG_2023')],
    },
    {
      with: 'alcohol',
      withDisplay: { en: 'Alcohol', sw: 'Pombe' },
      severity: 'caution',
      explanation: {
        en: 'Alcohol can lower blood pressure further and add to dizziness, especially in the first days on an ARB or after a dose increase, and heavy drinking makes blood pressure harder to control overall. Occasional light drinking in a stable person is usually tolerable, but be cautious — stand up slowly, and discuss your drinking honestly with your clinician.',
        sw: 'Pombe inaweza kushusha shinikizo la damu zaidi na kuongeza kizunguzungu, hasa katika siku za kwanza za ARB au baada ya kuongeza dose, na kunywa kupita kiasi hufanya shinikizo la damu kuwa gumu kudhibiti kwa ujumla. Kunywa kidogo mara kwa mara kwa mtu aliye imara kwa kawaida huvumilika, lakini kuwa makini — simama polepole, na jadili kunywa kwako kwa uaminifu na daktari wako.',
        sw_mtaa: 'Pombe inaweza kushusha presha zaidi na kuongeza kizunguzungu, hasa siku za kwanza za ARB au baada ya kuongezewa dose, na kunywa kupita kiasi kunafanya presha kuwa ngumu kudhibiti. Kunywa kidogo mara chache kwa mtu aliye imara kwa kawaida ni sawa, lakini kuwa makini — simama polepole, na mwambie daktari ukweli kuhusu kunywa kwako.',
      },
      sources: [src('NTLG_STG_2023')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Same monitoring as an ACE inhibitor', sw: 'Ufuatiliaji ule ule kama kizuizi cha ACE' },
      note: {
        en: 'Switching to an ARB because of the cough does not mean you escape the blood tests. An ARB still needs kidney function and potassium checked shortly after starting, after any dose change, and then regularly. A small, stable rise in creatinine on starting is often expected and acceptable. Keep these appointments — they are how the medicine stays safe.',
        sw: 'Kubadilisha kwenda ARB kwa sababu ya kikohozi haimaanishi unaepuka vipimo vya damu. ARB bado inahitaji utendaji wa figo na potassium kuangaliwa muda mfupi baada ya kuanza, baada ya mabadiliko yoyote ya dose, na kisha mara kwa mara. Kupanda kidogo, kwa utulivu, kwa creatinine unapoanza mara nyingi hutarajiwa na kunakubalika. Hudhuria miadi hii — ndivyo dawa inavyobaki salama.',
        sw_mtaa: 'Kubadilisha kwenda ARB kwa sababu ya kikohozi haimaanishi unaepuka vipimo vya damu. ARB bado inahitaji figo na potassium kuangaliwa muda mfupi baada ya kuanza, baada ya kubadilisha dose, na kisha mara kwa mara. Creatinine kupanda kidogo kwa utulivu unapoanza mara nyingi inatarajiwa na inakubalika. Hudhuria miadi hii — ndivyo dawa inavyobaki salama.',
      },
    },
    {
      topic: { en: 'Sick day rules — when to pause', sw: 'Sheria za siku za ugonjwa — lini kusimamisha' },
      note: {
        en: 'If you become acutely unwell with vomiting, diarrhoea, or a high fever and cannot drink normally, the kidney is under strain. An ARB (and water tablets, and some diabetes medicines) is sometimes paused for a day or two until you recover. Ask your clinician in advance what your personal "sick day" plan should be.',
        sw: 'Ikiwa unakuwa mgonjwa ghafla na kutapika, kuhara, au homa kali na huwezi kunywa kawaida, figo iko katika mkazo. ARB (na vidonge vya maji, na baadhi ya dawa za kisukari) wakati mwingine husimamishwa kwa siku moja au mbili hadi upone. Muulize daktari wako mapema mpango wako binafsi wa "siku ya ugonjwa" unapaswa kuwaje.',
        sw_mtaa: 'Kama unakuwa mgonjwa ghafla na kutapika, kuhara, au homa kali na huwezi kunywa maji kawaida, figo iko kwenye mkazo. ARB (na vidonge vya maji, na baadhi ya dawa za kisukari) wakati mwingine inasimamishwa kwa siku moja au mbili hadi upone. Muulize daktari mapema mpango wako wa "sick day" uweje.',
      },
    },
    {
      topic: { en: 'Salt and potassium in food', sw: 'Chumvi na potassium kwenye chakula' },
      note: {
        en: 'Cutting back on salt helps an ARB control your blood pressure better. But be careful with "low-sodium" salt substitutes — many are potassium-based, and with an ARB they can raise potassium too high. If you have CKD, follow the specific potassium guidance from your clinician or nutritionist rather than general internet diets.',
        sw: 'Kupunguza chumvi husaidia ARB kudhibiti shinikizo lako la damu vizuri zaidi. Lakini kuwa makini na chumvi mbadala "zenye sodiamu kidogo" — nyingi zimetengenezwa kwa potassium, na pamoja na ARB zinaweza kupandisha potassium juu sana. Ikiwa una CKD, fuata mwongozo maalum wa potassium kutoka kwa daktari wako au mtaalamu wa lishe badala ya lishe za jumla za mtandaoni.',
        sw_mtaa: 'Kupunguza chumvi kunasaidia ARB kudhibiti presha yako vizuri zaidi. Lakini kuwa makini na chumvi mbadala "zenye sodiamu kidogo" — nyingi zimetengenezwa kwa potassium, na pamoja na ARB zinaweza kupandisha potassium juu sana. Kama una CKD, fuata mwongozo maalum wa potassium kutoka kwa daktari au mtaalamu wa lishe, si lishe za jumla za mtandaoni.',
      },
    },
    {
      topic: { en: 'It works even when you feel nothing', sw: 'Inafanya kazi hata usipohisi kitu' },
      note: {
        en: 'High blood pressure and early kidney disease usually cause no symptoms — so an ARB is doing its most important work silently, protecting your kidneys and heart for the years ahead. Feeling well is not a sign you can stop. Stopping lets blood pressure climb again and removes the kidney protection. This is a daily, long-term commitment.',
        sw: 'Shinikizo la damu la juu na ugonjwa wa figo wa mapema kwa kawaida hawasababishi dalili — hivyo ARB inafanya kazi yake muhimu zaidi kimya kimya, ikilinda figo na moyo wako kwa miaka ijayo. Kujisikia mzima si ishara kwamba unaweza kuacha. Kuacha huruhusu shinikizo la damu kupanda tena na huondoa ulinzi wa figo. Hii ni ahadi ya kila siku, ya muda mrefu.',
        sw_mtaa: 'Presha ya juu na ugonjwa wa figo wa mapema kwa kawaida havisababishi dalili — hivyo ARB inafanya kazi yake muhimu zaidi kimya kimya, ikilinda figo na moyo wako kwa miaka ijayo. Kujisikia mzima si ishara unaweza kuacha. Kuacha kunaruhusu presha kupanda tena na kunaondoa ulinzi wa figo. Hii ni ahadi ya kila siku, ya muda mrefu.',
      },
    },
  ],

  sources: [
    src('KDIGO_CKD_2024'),
    src('NTLG_STG_2023'),
    src('AHA_2017_BP'),
    src('ISH_2020'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
