/**
 * ACE Inhibitor (Enalapril / Lisinopril and the "-pril" class) — Drug Knowledge
 *
 * Sources: KDIGO CKD 2024, NTLG STG 2023, AHA/ACC 2017 BP, ISH 2020,
 *          BNF (current), EMC (current).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   ACE inhibitors are the workhorse drug that ties the hypertension,
 *   diabetes, CKD and heart-failure blocks together. They are first-line
 *   in Tanzania (NTLG) for hypertension, and they specifically PROTECT THE
 *   KIDNEYS in people with CKD and diabetes — so the CKD block needs this.
 *
 * Scope note:
 *   We educate on what the drug does, why it is prescribed, what to expect,
 *   and which warning signs matter. We do NOT give doses. The dry cough,
 *   the first-dose dizziness, the potassium/creatinine monitoring, and the
 *   absolute contraindication in pregnancy are the high-value teaching points.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const ACE_INHIBITOR: DrugKnowledge = {
  id: 'ace_inhibitor',
  aliases: DRUG_ALIASES.ace_inhibitor,

  drugClass: {
    en: 'ACE inhibitor — a blood-pressure and kidney-protecting medicine (the "-pril" family: enalapril, lisinopril, ramipril)',
    sw: 'Kizuizi cha ACE — dawa ya shinikizo la damu inayolinda figo (familia ya "-pril": enalapril, lisinopril, ramipril)',
  },

  whatItDoes: {
    en: 'An ACE inhibitor relaxes and widens your blood vessels by blocking a body chemical (angiotensin) that normally tightens them. This lowers blood pressure and, just as importantly, reduces the pressure inside the tiny filters of the kidney. That second effect is why ACE inhibitors are not just blood-pressure pills — in people with kidney disease or diabetes, they slow down kidney damage and protect the kidney for the long term. They also ease the workload of the heart, which is why they are used in heart failure too.',
    sw: 'Kizuizi cha ACE hulegeza na kupanua mishipa yako ya damu kwa kuzuia kemikali ya mwili (angiotensin) ambayo kwa kawaida huikaza. Hii hushusha shinikizo la damu na, kwa umuhimu sawa, hupunguza shinikizo ndani ya vichujio vidogo vya figo. Athari hiyo ya pili ndiyo sababu vizuizi vya ACE si vidonge vya shinikizo la damu tu — kwa watu wenye ugonjwa wa figo au kisukari, hupunguza kasi ya uharibifu wa figo na hulinda figo kwa muda mrefu. Pia hupunguza mzigo wa kazi wa moyo, ndiyo sababu hutumika katika kushindwa kwa moyo pia.',
    sw_mtaa: 'Dawa ya ACE inalegeza na kupanua mishipa yako ya damu kwa kuzuia kemikali ya mwili (angiotensin) inayoikaza. Hii inashusha presha na, kitu muhimu zaidi, inapunguza presha ndani ya vichujio vidogo vya figo. Hiyo athari ya pili ndiyo sababu dawa za ACE si za presha tu — kwa watu wenye ugonjwa wa figo au kisukari, zinapunguza kasi ya uharibifu wa figo na zinalinda figo kwa muda mrefu. Pia zinapunguza kazi ya moyo, ndiyo maana zinatumika kwa watu wenye moyo dhaifu.',
  },

  commonUses: [
    {
      en: 'High blood pressure — a first-line choice in Tanzania, often the first or second medicine prescribed.',
      sw: 'Shinikizo la damu la juu — chaguo la kwanza Tanzania, mara nyingi dawa ya kwanza au ya pili kuandikwa.',
      sw_mtaa: 'Presha ya juu — ni dawa ya kwanza kupendekezwa Tanzania, mara nyingi unaanza nayo au ni ya pili.',
    },
    {
      en: 'Kidney protection in CKD — especially when there is protein in the urine; it slows the decline of kidney function over years.',
      sw: 'Kulinda figo katika CKD — hasa wakati kuna protini kwenye mkojo; hupunguza kasi ya kushuka kwa utendaji wa figo kwa miaka.',
      sw_mtaa: 'Kulinda figo kwa mtu mwenye CKD — hasa kama kuna protini kwenye mkojo; inapunguza kasi ya figo kuharibika kwa miaka.',
    },
    {
      en: 'Diabetes with kidney involvement — protects the kidneys of people with diabetes even before major damage appears.',
      sw: 'Kisukari chenye kuathiri figo — hulinda figo za watu wenye kisukari hata kabla uharibifu mkubwa haujajitokeza.',
      sw_mtaa: 'Kisukari kinachoanza kuathiri figo — inalinda figo za mtu mwenye kisukari hata kabla uharibifu mkubwa haujaonekana.',
    },
    {
      en: 'Heart failure — reduces the heart\'s workload, eases symptoms, and improves survival.',
      sw: 'Kushindwa kwa moyo — hupunguza mzigo wa kazi wa moyo, hupunguza dalili, na huboresha uhai.',
      sw_mtaa: 'Moyo dhaifu — inapunguza kazi ya moyo, inapunguza dalili, na inaongeza maisha.',
    },
    {
      en: 'After a heart attack — often started to protect the heart muscle from further weakening.',
      sw: 'Baada ya shambulio la moyo — mara nyingi huanzishwa kulinda misuli ya moyo isidhoofike zaidi.',
      sw_mtaa: 'Baada ya kupata shambulio la moyo — mara nyingi unaanzishiwa kulinda moyo usidhoofike zaidi.',
    },
  ],

  howItIsTaken: {
    en: 'Usually one tablet a day, often in the morning, swallowed with water — taken at the same time each day so it becomes a habit. The very first dose can drop blood pressure more than later doses, so the first dose is sometimes taken at bedtime, or your clinician may ask you to sit down for a while afterward. The dose is started low and stepped up slowly. After starting — and after any dose increase — a blood test is done within 1-2 weeks to check kidney function and potassium. It is a long-term medicine: in hypertension, CKD and heart failure it is taken every day, indefinitely, even when you feel completely well. Do not stop it on your own.',
    sw: 'Kwa kawaida kidonge kimoja kwa siku, mara nyingi asubuhi, kumezwa na maji — kuchukuliwa kwa wakati ule ule kila siku ili kiwe mazoea. Dose ya kwanza kabisa inaweza kushusha shinikizo la damu zaidi ya dose za baadaye, hivyo dose ya kwanza wakati mwingine huchukuliwa wakati wa kulala, au daktari wako anaweza kukuomba ukae chini kwa muda baadaye. Dose huanzishwa ndogo na kuongezwa polepole. Baada ya kuanza — na baada ya kuongeza dose yoyote — kipimo cha damu hufanywa ndani ya wiki 1-2 kuangalia utendaji wa figo na potassium. Ni dawa ya muda mrefu: katika shinikizo la damu, CKD na kushindwa kwa moyo huchukuliwa kila siku, bila kikomo, hata unapojisikia mzima kabisa. Usiiache peke yako.',
    sw_mtaa: 'Kwa kawaida kidonge kimoja kwa siku, mara nyingi asubuhi, unameza na maji — chukua kwa wakati ule ule kila siku ili kiwe mazoea. Dose ya kwanza kabisa inaweza kushusha presha zaidi ya dose za baadaye, hivyo dose ya kwanza wakati mwingine unaichukua wakati wa kulala, au daktari anaweza kukuambia ukae chini kidogo baada ya kuichukua. Dose inaanza ndogo na kuongezwa polepole. Baada ya kuanza — na baada ya kuongeza dose yoyote — kipimo cha damu kinafanywa ndani ya wiki 1-2 kuangalia figo na potassium. Ni dawa ya muda mrefu: kwa presha, CKD na moyo dhaifu unaichukua kila siku, bila kikomo, hata ukijisikia mzima kabisa. Usiiache peke yako.',
  },

  commonSideEffects: [
    {
      en: 'A persistent dry, tickly cough — the best-known side effect of this drug class. It is harmless but can be annoying; if it bothers you, tell your clinician, because a related medicine (an ARB) does the same job without the cough.',
      sw: 'Kikohozi kikavu cha kudumu — athari inayojulikana zaidi ya kundi hili la dawa. Si hatari lakini inaweza kuudhi; ikikusumbua, mwambie daktari wako, kwa sababu dawa inayohusiana (ARB) hufanya kazi ileile bila kikohozi.',
      sw_mtaa: 'Kikohozi kikavu kisichoisha — hii ndiyo athari inayojulikana zaidi ya dawa hizi. Si hatari lakini inaweza kuudhi; ikikusumbua, mwambie daktari, kwa sababu dawa nyingine inayofanana (ARB) inafanya kazi ileile bila kikohozi.',
    },
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
      en: 'A slightly altered sense of taste, which usually fades.',
      sw: 'Hisia ya ladha iliyobadilika kidogo, ambayo kwa kawaida hupotea.',
      sw_mtaa: 'Ladha kubadilika kidogo, kwa kawaida inapotea.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Sudden swelling of the lips, tongue, face or throat, or difficulty breathing or swallowing — this is angioedema, a rare but dangerous allergic-type reaction. Stop the medicine and get emergency care immediately.',
        sw: 'Kuvimba kwa ghafla kwa midomo, ulimi, uso au koo, au ugumu wa kupumua au kumeza — hii ni angioedema, athari nadra lakini hatari kama ya mzio. Acha dawa na utafute huduma ya dharura mara moja.',
        sw_mtaa: 'Kuvimba kwa ghafla kwa midomo, ulimi, uso au koo, au kushindwa kupumua au kumeza — hii ni angioedema, athari nadra lakini hatari kama ya allergy. Acha dawa na utafute huduma ya dharura mara moja.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Very little urine, swelling of the legs that is getting worse, or feeling very unwell — possible sharp drop in kidney function. This needs urgent assessment and a blood test.',
        sw: 'Mkojo kidogo sana, kuvimba kwa miguu kunakozidi, au kujisikia vibaya sana — uwezekano wa kushuka kwa kasi kwa utendaji wa figo. Hii inahitaji tathmini ya haraka na kipimo cha damu.',
        sw_mtaa: 'Mkojo kidogo sana, miguu kuvimba zaidi na zaidi, au kujisikia vibaya sana — inawezekana figo zimeshuka kazi kwa kasi. Hii inahitaji tathmini ya haraka na kipimo cha damu.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Muscle weakness, an unusually slow or irregular heartbeat, or numbness — can be a sign of high potassium, which ACE inhibitors can cause, especially with kidney disease. Needs an urgent blood test.',
        sw: 'Udhaifu wa misuli, mapigo ya moyo ya polepole au yasiyo ya kawaida, au ganzi — inaweza kuwa ishara ya potassium ya juu, ambayo vizuizi vya ACE vinaweza kusababisha, hasa pamoja na ugonjwa wa figo. Inahitaji kipimo cha damu cha haraka.',
        sw_mtaa: 'Udhaifu wa misuli, moyo kupiga polepole au visivyo kawaida, au ganzi — inaweza kuwa ishara ya potassium ya juu, ambayo dawa za ACE zinaweza kusababisha, hasa kwa mtu mwenye ugonjwa wa figo. Inahitaji kipimo cha damu cha haraka.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Fainting, or dizziness so severe you cannot stand — your blood pressure may have dropped too low. Sit or lie down, and contact your clinician.',
        sw: 'Kuzimia, au kizunguzungu kikali kiasi kwamba huwezi kusimama — shinikizo lako la damu huenda limeshuka chini sana. Kaa au lala chini, na wasiliana na daktari wako.',
        sw_mtaa: 'Kuzimia, au kizunguzungu kikali kiasi huwezi kusimama — presha yako huenda imeshuka chini sana. Kaa au lala chini, na wasiliana na daktari.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellow eyes or skin, or dark urine — a rare liver reaction. Stop the medicine and see a clinician promptly.',
        sw: 'Macho au ngozi ya njano, au mkojo wa giza — athari nadra ya ini. Acha dawa na umwone daktari haraka.',
        sw_mtaa: 'Macho au ngozi kuwa njano, au mkojo wa giza — athari nadra ya ini. Acha dawa na umwone daktari haraka.',
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
        en: 'ACE inhibitors must NOT be used in pregnancy — they can seriously harm the developing baby\'s kidneys and growth, particularly in the second and third trimesters. A woman who could become pregnant should discuss this with her clinician, and anyone who finds they are pregnant while taking an ACE inhibitor should contact their clinician promptly to switch to a pregnancy-safe blood-pressure medicine. This is one of the most important safety points for this drug class.',
        sw: 'Vizuizi vya ACE HAVIPASWI kutumika katika ujauzito — vinaweza kudhuru vibaya figo na ukuaji wa mtoto anayekua, hasa katika miezi mitatu ya pili na ya tatu. Mwanamke anayeweza kupata ujauzito anapaswa kujadili hili na daktari wake, na yeyote anayegundua ana ujauzito akiwa anatumia kizuizi cha ACE anapaswa kuwasiliana na daktari wake haraka ili kubadilisha kwenda dawa ya shinikizo la damu salama kwa ujauzito. Hili ni mojawapo ya mambo muhimu zaidi ya usalama kwa kundi hili la dawa.',
        sw_mtaa: 'Dawa za ACE HAZIPASWI kutumika katika ujauzito — zinaweza kudhuru vibaya figo na ukuaji wa mtoto, hasa miezi mitatu ya pili na ya tatu. Mwanamke anayeweza kushika mimba ajadiliane na daktari, na yeyote anayegundua ana mimba akiwa anatumia dawa ya ACE awasiliane na daktari haraka ili abadilishiwe dawa ya presha salama kwa mimba. Hili ni jambo muhimu sana la usalama kwa dawa hizi.',
      },
      sources: [src('NTLG_STG_2023'), src('BNF_CURRENT')],
    },
    {
      with: 'arb',
      withDisplay: { en: 'ARBs (losartan, telmisartan)', sw: 'ARB (losartan, telmisartan)' },
      severity: 'avoid',
      explanation: {
        en: 'ACE inhibitors and ARBs work on the same body system. Taking both together is generally avoided — it does not add much benefit but markedly raises the risk of high potassium and kidney injury. They are alternatives to each other, not partners. If the ACE inhibitor cough is a problem, the usual move is to switch to an ARB, not to add one.',
        sw: 'Vizuizi vya ACE na ARB hufanya kazi kwenye mfumo ule ule wa mwili. Kuchukua vyote pamoja kwa kawaida huepukwa — hakuongezi faida kubwa lakini huongeza sana hatari ya potassium ya juu na jeraha la figo. Ni mbadala kwa kila kimoja, si washirika. Ikiwa kikohozi cha kizuizi cha ACE ni tatizo, hatua ya kawaida ni kubadilisha kwenda ARB, si kuongeza.',
        sw_mtaa: 'Dawa za ACE na ARB zinafanya kazi kwenye mfumo ule ule wa mwili. Kuchukua zote pamoja kwa kawaida kunaepukwa — hakuongezi faida kubwa lakini kunaongeza sana hatari ya potassium ya juu na figo kuumia. Ni mbadala kwa kila moja, si washirika. Kama kikohozi cha ACE ni tatizo, kawaida unabadilishiwa ARB, si kuongezewa.',
      },
      sources: [src('KDIGO_CKD_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'nsaid',
      withDisplay: { en: 'Painkillers like ibuprofen, diclofenac (NSAIDs)', sw: 'Dawa za maumivu kama ibuprofen, diclofenac (NSAID)' },
      severity: 'caution',
      explanation: {
        en: 'Anti-inflammatory painkillers (ibuprofen, diclofenac, and similar) are hard on the kidneys, and combining them with an ACE inhibitor — especially if you also take a water tablet — can reduce kidney function and raise potassium. The occasional single dose for pain is usually tolerable, but regular use should be discussed with your clinician, who may suggest paracetamol instead.',
        sw: 'Dawa za maumivu zinazopunguza uvimbe (ibuprofen, diclofenac, na zinazofanana) ni ngumu kwa figo, na kuzichanganya na kizuizi cha ACE — hasa ikiwa pia unachukua kidonge cha maji — kunaweza kupunguza utendaji wa figo na kuongeza potassium. Dose moja ya mara kwa mara kwa maumivu kwa kawaida huvumilika, lakini matumizi ya kawaida yanapaswa kujadiliwa na daktari wako, ambaye anaweza kupendekeza paracetamol badala yake.',
        sw_mtaa: 'Dawa za maumivu zinazopunguza uvimbe (ibuprofen, diclofenac, na zinazofanana) ni ngumu kwa figo, na kuzichanganya na dawa ya ACE — hasa kama pia unatumia kidonge cha maji — kunaweza kupunguza kazi ya figo na kuongeza potassium. Dose moja ya hapa na pale kwa maumivu kwa kawaida ni sawa, lakini matumizi ya kila siku yajadiliwe na daktari, anaweza kukupa paracetamol badala yake.',
      },
      sources: [src('KDIGO_CKD_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'potassium_supplement',
      withDisplay: { en: 'Potassium supplements and potassium-based salt substitutes', sw: 'Virutubisho vya potassium na chumvi mbadala zenye potassium' },
      severity: 'caution',
      explanation: {
        en: 'ACE inhibitors raise blood potassium. Adding potassium supplements, or "low-sodium" salt substitutes that are actually made of potassium, can push potassium too high — which can be dangerous for the heart. Tell your clinician about any supplements or salt substitutes you use, and do not start them without advice.',
        sw: 'Vizuizi vya ACE huongeza potassium ya damu. Kuongeza virutubisho vya potassium, au chumvi mbadala "zenye sodiamu kidogo" ambazo kwa kweli zimetengenezwa kwa potassium, kunaweza kupandisha potassium juu sana — ambayo inaweza kuwa hatari kwa moyo. Mwambie daktari wako kuhusu virutubisho au chumvi mbadala zozote unazotumia, na usizianzishe bila ushauri.',
        sw_mtaa: 'Dawa za ACE zinaongeza potassium ya damu. Kuongeza virutubisho vya potassium, au chumvi mbadala "zenye sodiamu kidogo" ambazo kwa kweli zimetengenezwa kwa potassium, kunaweza kupandisha potassium juu sana — inaweza kuwa hatari kwa moyo. Mwambie daktari kuhusu virutubisho au chumvi mbadala unazotumia, na usizianze bila ushauri.',
      },
      sources: [src('KDIGO_CKD_2024')],
    },
    {
      with: 'diuretic',
      withDisplay: { en: 'Water tablets (diuretics like furosemide, hydrochlorothiazide)', sw: 'Vidonge vya maji (diuretics kama furosemide, hydrochlorothiazide)' },
      severity: 'caution',
      explanation: {
        en: 'ACE inhibitors and water tablets are often prescribed together on purpose — they work well as a team for blood pressure and heart failure. But the combination can sometimes drop blood pressure or kidney function more than expected, especially if you become dehydrated from vomiting, diarrhoea, or hot weather. If you are unwell and not drinking normally, contact your clinician — sometimes these medicines are paused for a day or two ("sick day rules").',
        sw: 'Vizuizi vya ACE na vidonge vya maji mara nyingi huandikwa pamoja kwa makusudi — hufanya kazi vizuri kama timu kwa shinikizo la damu na kushindwa kwa moyo. Lakini mchanganyiko huo wakati mwingine unaweza kushusha shinikizo la damu au utendaji wa figo zaidi ya inavyotarajiwa, hasa ikiwa unapungukiwa maji kutokana na kutapika, kuhara, au hali ya hewa ya joto. Ikiwa huna afya na hunywi maji kawaida, wasiliana na daktari wako — wakati mwingine dawa hizi husimamishwa kwa siku moja au mbili ("sheria za siku za ugonjwa").',
        sw_mtaa: 'Dawa za ACE na vidonge vya maji mara nyingi unaandikiwa pamoja kwa makusudi — zinafanya kazi vizuri kama timu kwa presha na moyo dhaifu. Lakini mchanganyiko huo wakati mwingine unaweza kushusha presha au kazi ya figo zaidi ya inavyotarajiwa, hasa kama umepungukiwa maji kwa sababu ya kutapika, kuhara, au joto. Kama huna afya na hunywi maji kawaida, wasiliana na daktari — wakati mwingine dawa hizi zinasimamishwa kwa siku moja au mbili ("sick day rules").',
      },
      sources: [src('KDIGO_CKD_2024'), src('NTLG_STG_2023')],
    },
    {
      with: 'alcohol',
      withDisplay: { en: 'Alcohol', sw: 'Pombe' },
      severity: 'caution',
      explanation: {
        en: 'Alcohol can lower blood pressure further and add to dizziness, especially in the first days on an ACE inhibitor or after a dose increase. Heavy drinking also makes blood pressure harder to control overall. Occasional light drinking in a stable person is usually tolerable, but it is worth being cautious — stand up slowly, and discuss your drinking honestly with your clinician.',
        sw: 'Pombe inaweza kushusha shinikizo la damu zaidi na kuongeza kizunguzungu, hasa katika siku za kwanza za kizuizi cha ACE au baada ya kuongeza dose. Kunywa kupita kiasi pia hufanya shinikizo la damu kuwa gumu kudhibiti kwa ujumla. Kunywa kidogo mara kwa mara kwa mtu aliye imara kwa kawaida huvumilika, lakini ni vyema kuwa makini — simama polepole, na jadili kunywa kwako kwa uaminifu na daktari wako.',
        sw_mtaa: 'Pombe inaweza kushusha presha zaidi na kuongeza kizunguzungu, hasa siku za kwanza za dawa ya ACE au baada ya kuongezewa dose. Kunywa kupita kiasi pia kunafanya presha kuwa ngumu kudhibiti. Kunywa kidogo mara chache kwa mtu aliye imara kwa kawaida ni sawa, lakini ni vyema kuwa makini — simama polepole, na mwambie daktari ukweli kuhusu kunywa kwako.',
      },
      sources: [src('NTLG_STG_2023')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Blood tests are part of the medicine', sw: 'Vipimo vya damu ni sehemu ya dawa' },
      note: {
        en: 'An ACE inhibitor comes with blood-test monitoring: kidney function and potassium are checked shortly after starting, after any dose change, and then regularly. A small, stable rise in creatinine when you start is often expected and acceptable — it is not a reason to panic or stop. Keep these appointments; they are how the medicine is kept safe.',
        sw: 'Kizuizi cha ACE huja na ufuatiliaji wa vipimo vya damu: utendaji wa figo na potassium huangaliwa muda mfupi baada ya kuanza, baada ya mabadiliko yoyote ya dose, na kisha mara kwa mara. Kupanda kidogo, kwa utulivu, kwa creatinine unapoanza mara nyingi hutarajiwa na kunakubalika — si sababu ya kuogopa au kuacha. Hudhuria miadi hii; ndivyo dawa inavyowekwa salama.',
        sw_mtaa: 'Dawa ya ACE inakuja na ufuatiliaji wa vipimo vya damu: figo na potassium vinaangaliwa muda mfupi baada ya kuanza, baada ya kubadilisha dose, na kisha mara kwa mara. Creatinine kupanda kidogo kwa utulivu unapoanza mara nyingi inatarajiwa na inakubalika — si sababu ya kuogopa au kuacha. Hudhuria miadi hii; ndivyo dawa inavyowekwa salama.',
      },
    },
    {
      topic: { en: 'Sick day rules — when to pause', sw: 'Sheria za siku za ugonjwa — lini kusimamisha' },
      note: {
        en: 'If you become acutely unwell with vomiting, diarrhoea, or a high fever and are not able to drink normally, the kidney can be put under strain. In that situation an ACE inhibitor (and water tablets, and some diabetes medicines) is sometimes paused for a day or two until you recover. Ask your clinician in advance what your personal "sick day" plan should be — do not guess.',
        sw: 'Ikiwa unakuwa mgonjwa ghafla na kutapika, kuhara, au homa kali na huwezi kunywa kawaida, figo inaweza kuwekwa katika mkazo. Katika hali hiyo kizuizi cha ACE (na vidonge vya maji, na baadhi ya dawa za kisukari) wakati mwingine husimamishwa kwa siku moja au mbili hadi upone. Muulize daktari wako mapema mpango wako binafsi wa "siku ya ugonjwa" unapaswa kuwaje — usikisie.',
        sw_mtaa: 'Kama unakuwa mgonjwa ghafla na kutapika, kuhara, au homa kali na huwezi kunywa maji kawaida, figo inaweza kupata mkazo. Katika hali hiyo dawa ya ACE (na vidonge vya maji, na baadhi ya dawa za kisukari) wakati mwingine inasimamishwa kwa siku moja au mbili hadi upone. Muulize daktari mapema mpango wako wa "sick day" uweje — usikisie.',
      },
    },
    {
      topic: { en: 'Salt and potassium in food', sw: 'Chumvi na potassium kwenye chakula' },
      note: {
        en: 'Cutting back on salt helps an ACE inhibitor work better for your blood pressure. But be careful with "low-sodium" salt substitutes — many are made of potassium, and combined with an ACE inhibitor they can raise potassium too high. If you have CKD, your clinician or a nutritionist may give you specific guidance on potassium-rich foods; follow their advice rather than general internet diets.',
        sw: 'Kupunguza chumvi husaidia kizuizi cha ACE kufanya kazi vizuri zaidi kwa shinikizo lako la damu. Lakini kuwa makini na chumvi mbadala "zenye sodiamu kidogo" — nyingi zimetengenezwa kwa potassium, na zikichanganywa na kizuizi cha ACE zinaweza kupandisha potassium juu sana. Ikiwa una CKD, daktari wako au mtaalamu wa lishe anaweza kukupa mwongozo maalum kuhusu vyakula vyenye potassium nyingi; fuata ushauri wao badala ya lishe za jumla za mtandaoni.',
        sw_mtaa: 'Kupunguza chumvi kunasaidia dawa ya ACE kufanya kazi vizuri zaidi kwa presha yako. Lakini kuwa makini na chumvi mbadala "zenye sodiamu kidogo" — nyingi zimetengenezwa kwa potassium, na zikichanganywa na dawa ya ACE zinaweza kupandisha potassium juu sana. Kama una CKD, daktari au mtaalamu wa lishe anaweza kukupa mwongozo maalum kuhusu vyakula vyenye potassium nyingi; fuata ushauri wao, si lishe za jumla za mtandaoni.',
      },
    },
    {
      topic: { en: 'The cough has a solution', sw: 'Kikohozi kina suluhisho' },
      note: {
        en: 'If you develop the dry ACE-inhibitor cough and it bothers you, you do not have to just put up with it. Tell your clinician — there is a closely related class of medicine, the ARBs, that gives the same blood-pressure and kidney protection without causing the cough. Switching is straightforward. Do not stop the medicine on your own; ask for the alternative.',
        sw: 'Ikiwa unapata kikohozi kikavu cha kizuizi cha ACE na kinakusumbua, huna haja ya kuvumilia tu. Mwambie daktari wako — kuna kundi la dawa linalohusiana kwa karibu, ARB, linalotoa ulinzi ule ule wa shinikizo la damu na figo bila kusababisha kikohozi. Kubadilisha ni rahisi. Usiache dawa peke yako; omba mbadala.',
        sw_mtaa: 'Kama unapata kikohozi kikavu cha dawa ya ACE na kinakusumbua, huna haja ya kuvumilia tu. Mwambie daktari — kuna dawa nyingine inayohusiana kwa karibu, ARB, inayotoa ulinzi ule ule wa presha na figo bila kusababisha kikohozi. Kubadilisha ni rahisi. Usiache dawa peke yako; omba mbadala.',
      },
    },
    {
      topic: { en: 'It works even when you feel nothing', sw: 'Inafanya kazi hata usipohisi kitu' },
      note: {
        en: 'High blood pressure and early kidney disease usually cause no symptoms at all — so an ACE inhibitor is doing its most important work silently, in the background, protecting your kidneys and heart for years to come. Feeling well is not a sign you can stop. Stopping lets blood pressure climb again and removes the kidney protection. This is a daily, long-term commitment.',
        sw: 'Shinikizo la damu la juu na ugonjwa wa figo wa mapema kwa kawaida hawasababishi dalili yoyote — hivyo kizuizi cha ACE kinafanya kazi yake muhimu zaidi kimya kimya, nyuma ya pazia, kikilinda figo na moyo wako kwa miaka ijayo. Kujisikia mzima si ishara kwamba unaweza kuacha. Kuacha huruhusu shinikizo la damu kupanda tena na huondoa ulinzi wa figo. Hii ni ahadi ya kila siku, ya muda mrefu.',
        sw_mtaa: 'Presha ya juu na ugonjwa wa figo wa mapema kwa kawaida havisababishi dalili yoyote — hivyo dawa ya ACE inafanya kazi yake muhimu zaidi kimya kimya, nyuma ya pazia, ikilinda figo na moyo wako kwa miaka ijayo. Kujisikia mzima si ishara unaweza kuacha. Kuacha kunaruhusu presha kupanda tena na kunaondoa ulinzi wa figo. Hii ni ahadi ya kila siku, ya muda mrefu.',
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
