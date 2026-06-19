/**
 * Chronic Kidney Disease (CKD) — Full Condition Knowledge (100% all-in coverage)
 *
 * Sources: KDIGO Clinical Practice Guideline for the Evaluation and Management
 *          of CKD 2024, NTLG STG 2023, WHO guidance on non-communicable
 *          diseases, Muhimbili Protocols, BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in):
 *   • CKD stages 1-2 (early — eGFR ≥60 with kidney damage markers)
 *   • CKD stage 3 (moderate — eGFR 30-59, the "act now" stage)
 *   • CKD stages 4-5 (advanced / kidney failure — eGFR <30, dialysis prep)
 *   • Dialysis (haemodialysis and peritoneal — life on treatment)
 *   • Transplant awareness (what it is, who is eligible, the journey)
 *   • Diabetic kidney disease (the leading cause in Tanzania)
 *   • Hypertensive kidney disease (the other leading cause)
 *   • CKD in pregnancy (shared care, risks, monitoring)
 *
 * Comorbidities: diabetes, hypertension, HIV (cross-references Phase 5),
 * TB (cross-references Phase 4), heart disease, anaemia of CKD.
 *
 * SCOPE: We educate patients on what CKD IS, why it is usually silent until
 * late, how the stages work, what eGFR and creatinine mean, how to slow
 * progression, what dialysis and transplant involve, and which everyday
 * choices protect the kidneys. We do NOT diagnose CKD (it is confirmed by
 * eGFR/creatinine over time plus urine testing) and do NOT prescribe or
 * dose medicines — that is the clinician's role. Many common drugs need
 * dose adjustment in CKD, so "ask before you take" is a core message.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { CKD_VARIANTS } from './ckd.variants';

export const CKD: ConditionKnowledge = {
  id: 'ckd',
  aliases: CONDITION_ALIASES.ckd,
  category: 'renal',

  whatItIs: {
    en: 'Chronic kidney disease (CKD) means the kidneys have been gradually losing their ability to do their job — and have been doing so for at least three months. The kidneys are two bean-shaped organs that filter waste and extra water from the blood into urine, balance the body\'s salts and acid, control blood pressure, keep bones healthy, and signal the body to make red blood cells. In CKD this filtering slowly weakens. It is measured by a number called eGFR (estimated glomerular filtration rate) — roughly, the percentage of normal kidney function remaining — and divided into five stages, from mild (stage 1-2) to kidney failure (stage 5). CKD is usually silent in its early stages: most people feel completely well and only find out through a blood or urine test. It cannot usually be reversed, but its progression can very often be slowed — sometimes dramatically — when it is caught and managed early.',
    sw: 'Ugonjwa wa figo sugu (CKD) maana yake figo zimekuwa zikipoteza taratibu uwezo wao wa kufanya kazi yao — na zimekuwa zikifanya hivyo kwa angalau miezi mitatu. Figo ni viungo viwili vyenye umbo la maharage vinavyochuja taka na maji ya ziada kutoka damuni kwenda kwenye mkojo, husawazisha chumvi na asidi za mwili, hudhibiti shinikizo la damu, huweka mifupa yenye afya, na huashiria mwili kutengeneza chembe nyekundu za damu. Katika CKD uchujaji huu unadhoofika polepole. Hupimwa kwa namba inayoitwa eGFR (kiwango cha uchujaji) — takriban, asilimia ya utendaji wa kawaida wa figo uliobaki — na hugawanywa katika hatua tano, kutoka ndogo (hatua 1-2) hadi figo kushindwa kabisa (hatua 5). CKD kawaida ni kimya katika hatua za awali: watu wengi hujisikia vizuri kabisa na hugundua tu kupitia kipimo cha damu au mkojo. Kawaida haiwezi kurudishwa nyuma, lakini maendeleo yake mara nyingi yanaweza kupunguzwa — wakati mwingine sana — yanapogunduliwa na kusimamiwa mapema.',
    sw_mtaa: 'Ugonjwa wa figo sugu (CKD) maana yake figo zimekuwa zikipoteza taratibu uwezo wa kufanya kazi yao — kwa angalau miezi mitatu. Figo ni viungo viwili vyenye umbo la maharage vinavyochuja taka na maji ya ziada kutoka kwenye damu kwenda kwenye mkojo, husawazisha chumvi za mwili, hudhibiti presha, huweka mifupa imara, na huambia mwili utengeneze damu. Katika CKD uchujaji huu unadhoofika polepole. Hupimwa kwa namba inayoitwa eGFR — takriban asilimia ya kazi ya figo iliyobaki — na imegawanywa hatua tano, kutoka ndogo (hatua 1-2) hadi figo kushindwa kabisa (hatua 5). CKD kawaida ni kimya mwanzoni: watu wengi wanajisikia poa kabisa na wanagundua tu kwa kipimo cha damu au mkojo. Kawaida haiwezi kurudi nyuma, lakini kasi yake mara nyingi inaweza kupunguzwa sana ikigundulika mapema.',
  },

  whyItMatters: {
    en: 'CKD matters because it is common, it is silent, and it is dangerous when ignored — but it is also one of the most modifiable chronic conditions when caught in time. In Tanzania the two biggest causes are diabetes and high blood pressure, both of which are rising. The danger of CKD is twofold. First, if it progresses to kidney failure (stage 5), the only treatments are dialysis or a kidney transplant — both demanding, and dialysis is not available everywhere in Tanzania. Second, even before failure, CKD sharply raises the risk of heart attack, stroke, and heart failure — in fact most people with CKD are more likely to develop heart disease than to ever reach dialysis. The hopeful side: when CKD is found early and the underlying cause (blood sugar, blood pressure) is controlled well, progression can be slowed by years or even halted. Every blood pressure reading in target, every controlled HbA1c, every avoided harmful painkiller is kidney protection. Knowing your kidney numbers is one of the most useful things you can do for your long-term health.',
    sw: 'CKD ni muhimu kwa sababu ni ya kawaida, ni kimya, na ni hatari ikipuuzwa — lakini pia ni mojawapo ya hali sugu zinazoweza kubadilishwa zaidi ikigunduliwa kwa wakati. Tanzania sababu mbili kubwa ni kisukari na shinikizo la damu, zote zinaongezeka. Hatari ya CKD ni ya pande mbili. Kwanza, ikiendelea hadi figo kushindwa (hatua 5), matibabu pekee ni dialysis au kupandikizwa figo — yote magumu, na dialysis haipatikani kila mahali Tanzania. Pili, hata kabla ya kushindwa, CKD huongeza sana hatari ya mshtuko wa moyo, kiharusi, na moyo kushindwa kufanya kazi — kwa kweli watu wengi wenye CKD wana uwezekano mkubwa wa kupata ugonjwa wa moyo kuliko kufikia dialysis. Upande wa matumaini: CKD ikigunduliwa mapema na chanzo (sukari ya damu, shinikizo la damu) kikidhibitiwa vizuri, maendeleo yanaweza kupunguzwa kwa miaka au hata kusimamishwa. Kila kipimo cha shinikizo la damu kilicho lengwa, kila HbA1c iliyodhibitiwa, kila dawa ya maumivu hatari iliyoepukwa ni ulinzi wa figo. Kujua namba zako za figo ni mojawapo ya mambo muhimu zaidi unayoweza kufanya kwa afya yako ya muda mrefu.',
    sw_mtaa: 'CKD ni muhimu kwa sababu ni ya kawaida, ni kimya, na ni hatari ikipuuzwa — lakini pia ni mojawapo ya hali sugu zinazoweza kubadilishwa zaidi ikigunduliwa kwa wakati. Tanzania sababu mbili kubwa ni kisukari na presha, zote zinaongezeka. Hatari ya CKD ni ya pande mbili. Kwanza, ikiendelea hadi figo kushindwa (hatua 5), matibabu pekee ni dialysis au kupandikizwa figo — yote magumu, na dialysis haipatikani kila mahali Tanzania. Pili, hata kabla ya kushindwa, CKD inaongeza sana hatari ya mshtuko wa moyo, kiharusi, na moyo kushindwa — kwa kweli watu wengi wenye CKD wana uwezekano mkubwa wa kupata ugonjwa wa moyo kuliko kufikia dialysis. Upande wa matumaini: CKD ikigunduliwa mapema na chanzo (sukari, presha) kikidhibitiwa vizuri, kasi yake inaweza kupunguzwa kwa miaka au hata kusimamishwa. Kila presha iliyo lengwa, kila HbA1c iliyodhibitiwa, kila dawa ya maumivu hatari iliyoepukwa ni ulinzi wa figo. Kujua namba zako za figo ni mojawapo ya mambo muhimu zaidi kwa afya yako ya muda mrefu.',
  },

  commonQuestions: [
    {
      q: {
        en: 'How do I know if I have kidney disease? I feel completely fine.',
        sw: 'Najuaje kama nina ugonjwa wa figo? Najisikia mzima kabisa.',
      },
      a: {
        en: 'That is exactly the problem with CKD — in its early and middle stages it usually causes no symptoms at all. Feeling fine does not mean the kidneys are fine. CKD is found through tests, not feelings: a blood test for creatinine (which is used to calculate your eGFR) and a urine test for protein or albumin. By the time symptoms appear — tiredness, swelling in the legs or face, poor appetite, itching, breathlessness, foamy urine, needing to pass urine more at night — the disease is often already advanced. This is why people at higher risk should be tested regularly even when they feel well: anyone with diabetes, high blood pressure, a family history of kidney disease, HIV, or who is older. If you are in one of those groups, ask your clinician for a kidney check — it is a simple blood and urine test.',
        sw: 'Hiyo ndiyo shida hasa ya CKD — katika hatua zake za awali na za kati kawaida haisababishi dalili kabisa. Kujisikia mzima haimaanishi figo ziko sawa. CKD hugunduliwa kupitia vipimo, sio hisia: kipimo cha damu cha creatinine (kinachotumika kuhesabu eGFR yako) na kipimo cha mkojo cha protini au albumin. Kufikia wakati dalili zinaonekana — uchovu, uvimbe miguuni au usoni, hamu mbaya ya kula, kuwashwa, kushindwa kupumua, mkojo wenye povu, kuhitaji kukojoa zaidi usiku — ugonjwa mara nyingi tayari umeendelea. Ndiyo maana watu walio katika hatari kubwa wanapaswa kupimwa mara kwa mara hata wanapojisikia vizuri: yeyote mwenye kisukari, shinikizo la damu, historia ya familia ya ugonjwa wa figo, VVU, au mzee. Ikiwa uko katika mojawapo ya makundi hayo, muulize daktari wako ukaguzi wa figo — ni kipimo rahisi cha damu na mkojo.',
        sw_mtaa: 'Hiyo ndiyo shida hasa ya CKD — katika hatua zake za mwanzo na za kati kawaida haina dalili kabisa. Kujisikia poa haimaanishi figo ziko sawa. CKD inagunduliwa kwa vipimo, sio hisia: kipimo cha damu cha creatinine (kinachotumika kuhesabu eGFR yako) na kipimo cha mkojo cha protini. Kufikia wakati dalili zinaonekana — uchovu, uvimbe miguuni au usoni, hamu mbaya ya kula, kuwashwa mwili, kushindwa kupumua, mkojo wenye povu, kukojoa sana usiku — ugonjwa mara nyingi tayari umeendelea. Ndiyo maana watu walio hatarini wapimwe mara kwa mara hata wanapojisikia poa: yeyote mwenye kisukari, presha, historia ya familia ya figo, VVU, au mzee. Ukiwa kwenye mojawapo ya makundi hayo, muulize daktari ukaguzi wa figo — ni kipimo rahisi cha damu na mkojo.',
      },
    },
    {
      q: {
        en: 'What do my eGFR and creatinine numbers actually mean?',
        sw: 'Namba zangu za eGFR na creatinine zinamaanisha nini hasa?',
      },
      a: {
        en: 'They answer the same question — how well are the kidneys filtering — from two directions. Creatinine is a waste product the kidneys normally clear; when the kidneys are weaker, creatinine builds up, so a higher creatinine usually means worse kidney function. eGFR is calculated from the creatinine (along with age and sex) and is easier to interpret: think of it roughly as the percentage of normal kidney function you have left. An eGFR of 90 or above is normal; 60-89 is mildly reduced; 30-59 is moderately reduced (CKD stage 3); 15-29 is severely reduced (stage 4); below 15 is kidney failure (stage 5). One important caution: a single result can be misleading — dehydration, certain medicines, a recent illness, or even a high-protein meal can shift it. CKD is diagnosed from results that stay abnormal over at least three months, not from one test. Always look at the trend over time, and always bring previous results to your clinic so the doctor can compare.',
        sw: 'Zinajibu swali lile lile — figo zinachuja vizuri kiasi gani — kutoka pande mbili. Creatinine ni taka ambayo figo kawaida huiondoa; figo zikiwa dhaifu, creatinine hujikusanya, hivyo creatinine ya juu zaidi kawaida humaanisha utendaji mbaya zaidi wa figo. eGFR huhesabiwa kutoka creatinine (pamoja na umri na jinsia) na ni rahisi zaidi kuelewa: ifikirie takriban kama asilimia ya utendaji wa kawaida wa figo uliobaki. eGFR ya 90 au zaidi ni ya kawaida; 60-89 imepungua kidogo; 30-59 imepungua wastani (CKD hatua 3); 15-29 imepungua sana (hatua 4); chini ya 15 ni figo kushindwa (hatua 5). Tahadhari moja muhimu: matokeo moja yanaweza kupotosha — upungufu wa maji mwilini, dawa fulani, ugonjwa wa hivi karibuni, au hata mlo wenye protini nyingi unaweza kuyabadilisha. CKD hugunduliwa kutoka matokeo yanayobaki si ya kawaida kwa angalau miezi mitatu, sio kutoka kipimo kimoja. Daima angalia mwelekeo kwa muda, na daima lete matokeo ya awali kliniki ili daktari aweze kulinganisha.',
        sw_mtaa: 'Zinajibu swali lile lile — figo zinachuja vizuri kiasi gani — kutoka pande mbili. Creatinine ni taka ambayo figo kawaida huiondoa; figo zikiwa dhaifu, creatinine inajikusanya, hivyo creatinine ya juu zaidi kawaida inamaanisha kazi mbaya zaidi ya figo. eGFR inahesabiwa kutoka creatinine (pamoja na umri na jinsia) na ni rahisi zaidi kuelewa: ifikirie kama asilimia ya kazi ya kawaida ya figo iliyobaki. eGFR ya 90 au zaidi ni ya kawaida; 60-89 imepungua kidogo; 30-59 imepungua wastani (CKD hatua 3); 15-29 imepungua sana (hatua 4); chini ya 15 ni figo kushindwa (hatua 5). Tahadhari moja muhimu: matokeo moja yanaweza kupotosha — kukosa maji mwilini, dawa fulani, ugonjwa wa hivi karibuni, au hata mlo wa protini nyingi unaweza kuyabadilisha. CKD inagunduliwa kutoka matokeo yanayobaki si ya kawaida kwa angalau miezi mitatu, sio kipimo kimoja. Daima angalia mwelekeo kwa muda, na lete matokeo ya zamani kliniki ili daktari alinganishe.',
      },
    },
    {
      q: {
        en: 'Can kidney disease be cured? Will my kidneys get better?',
        sw: 'Ugonjwa wa figo unaweza kuponywa? Figo zangu zitapona?',
      },
      a: {
        en: 'Chronic kidney disease usually cannot be cured or reversed — the kidney damage that has already happened is generally permanent. But that is not the most important fact. The most important fact is that progression can very often be slowed, and sometimes nearly stopped, especially when CKD is caught early. Think of it less like a switch and more like a slope: the goal of treatment is to make that slope as gentle as possible, so that someone diagnosed in their forties may never reach kidney failure in their lifetime. What slows progression: tight control of blood pressure and blood sugar, specific kidney-protective medicines your clinician may prescribe, avoiding things that harm the kidneys (certain painkillers, dehydration, unprescribed herbal remedies), not smoking, and treating other conditions well. There is also a separate situation called acute kidney injury — a sudden drop in function from dehydration, infection, or medicines — and that one often CAN recover if treated quickly. So the honest answer is: chronic damage usually stays, but your future is still very much in your hands.',
        sw: 'Ugonjwa wa figo sugu kawaida hauwezi kuponywa au kurudishwa nyuma — uharibifu wa figo uliokwisha tokea kwa ujumla ni wa kudumu. Lakini hiyo sio ukweli muhimu zaidi. Ukweli muhimu zaidi ni kwamba maendeleo mara nyingi yanaweza kupunguzwa, na wakati mwingine karibu kusimamishwa, hasa CKD ikigunduliwa mapema. Ifikirie si kama swichi bali kama mteremko: lengo la matibabu ni kufanya mteremko huo uwe wa upole iwezekanavyo, ili mtu aliyegunduliwa katika miaka yake ya arobaini huenda asifikie figo kushindwa katika maisha yake. Kinachopunguza maendeleo: udhibiti madhubuti wa shinikizo la damu na sukari ya damu, dawa maalum za kulinda figo ambazo daktari wako anaweza kuagiza, kuepuka vitu vinavyodhuru figo (dawa fulani za maumivu, upungufu wa maji, dawa za mitishamba zisizoagizwa), kutovuta sigara, na kutibu hali zingine vizuri. Pia kuna hali tofauti inayoitwa jeraha la figo la ghafla — kushuka kwa ghafla kwa utendaji kutokana na upungufu wa maji, maambukizi, au dawa — na hiyo mara nyingi INAWEZA kupona ikitibiwa haraka. Hivyo jibu la kweli ni: uharibifu sugu kawaida hubaki, lakini wakati wako ujao bado uko mikononi mwako sana.',
        sw_mtaa: 'Ugonjwa wa figo sugu kawaida hauwezi kuponywa au kurudishwa nyuma — uharibifu uliokwisha tokea kwa ujumla ni wa kudumu. Lakini hiyo sio ukweli muhimu zaidi. Ukweli muhimu zaidi ni kwamba kasi yake mara nyingi inaweza kupunguzwa, na wakati mwingine karibu kusimamishwa, hasa CKD ikigunduliwa mapema. Ifikirie si kama swichi bali kama mteremko: lengo la matibabu ni kufanya mteremko uwe wa upole iwezekanavyo, ili mtu aliyegunduliwa akiwa na miaka arobaini huenda asifikie figo kushindwa katika maisha yake. Kinachopunguza kasi: udhibiti madhubuti wa presha na sukari, dawa maalum za kulinda figo ambazo daktari anaweza kuagiza, kuepuka vinavyodhuru figo (dawa fulani za maumivu, kukosa maji, dawa za mitishamba zisizoagizwa), kutovuta sigara, na kutibu hali zingine vizuri. Pia kuna hali tofauti inayoitwa acute kidney injury — kushuka kwa ghafla kutokana na kukosa maji, maambukizi, au dawa — na hiyo mara nyingi INAWEZA kupona ikitibiwa haraka. Hivyo jibu la kweli: uharibifu sugu kawaida unabaki, lakini wakati wako ujao uko mikononi mwako.',
      },
    },
    {
      q: {
        en: 'What can I do to protect my kidneys and slow this down?',
        sw: 'Nifanye nini kulinda figo zangu na kupunguza kasi ya hili?',
      },
      a: {
        en: 'A great deal — CKD is one of the conditions where daily choices genuinely change the outcome. The biggest levers: keep blood pressure in the target your clinician sets (this is the single most powerful thing for most people), and if you have diabetes keep blood sugar well controlled. Take the kidney-protective medicines your clinician prescribes exactly as directed, and keep every clinic appointment so your numbers are tracked. Reduce salt — it raises blood pressure and makes the kidneys work harder. Stay well hydrated with water, but do not force huge amounts. Avoid the things that quietly harm kidneys: regular use of certain painkillers (the anti-inflammatory type — ask your clinician before taking any painkiller), unprescribed herbal and traditional remedies (some are directly toxic to kidneys), smoking, and excess alcohol. Stay physically active and keep a healthy weight. Treat infections promptly and stay up to date with recommended vaccines. And crucially — tell every health worker you see that you have CKD, because many ordinary medicines and some scan dyes need dose adjustment or avoidance.',
        sw: 'Mengi sana — CKD ni mojawapo ya hali ambapo maamuzi ya kila siku hubadilisha kweli matokeo. Vidhibiti vikubwa zaidi: weka shinikizo la damu katika lengo ambalo daktari wako anaweka (hili ni jambo moja lenye nguvu zaidi kwa watu wengi), na ikiwa una kisukari weka sukari ya damu ikidhibitiwa vizuri. Tumia dawa za kulinda figo ambazo daktari wako anaagiza hasa kama alivyoelekeza, na weka kila miadi ya kliniki ili namba zako zifuatiliwe. Punguza chumvi — huongeza shinikizo la damu na hufanya figo zifanye kazi zaidi. Kaa na maji ya kutosha kwa maji, lakini usilazimishe kiasi kikubwa. Epuka vitu vinavyodhuru figo kimya kimya: matumizi ya mara kwa mara ya dawa fulani za maumivu (aina ya kuzuia uvimbe — muulize daktari wako kabla ya kutumia dawa yoyote ya maumivu), dawa za mitishamba na za jadi zisizoagizwa (baadhi ni sumu moja kwa moja kwa figo), kuvuta sigara, na pombe kupita kiasi. Kaa hai kimwili na weka uzito wenye afya. Tibu maambukizi haraka na kaa na chanjo zinazoshauriwa. Na muhimu — mwambie kila mfanyakazi wa afya unayemwona kwamba una CKD, kwa sababu dawa nyingi za kawaida na rangi za baadhi ya skani zinahitaji marekebisho ya dose au kuepukwa.',
        sw_mtaa: 'Mengi sana — CKD ni mojawapo ya hali ambapo maamuzi ya kila siku yanabadilisha kweli matokeo. Vidhibiti vikubwa zaidi: weka presha katika lengo ambalo daktari anaweka (hili ni jambo moja lenye nguvu zaidi kwa watu wengi), na ikiwa una kisukari weka sukari ikidhibitiwa vizuri. Tumia dawa za kulinda figo ambazo daktari anaagiza hasa kama alivyoelekeza, na weka kila miadi ya kliniki ili namba zako zifuatiliwe. Punguza chumvi — inaongeza presha na inafanya figo zifanye kazi zaidi. Kunywa maji ya kutosha, lakini usilazimishe kiasi kikubwa sana. Epuka vinavyodhuru figo kimya kimya: matumizi ya mara kwa mara ya dawa fulani za maumivu (za kuzuia uvimbe — muulize daktari kabla ya dawa yoyote ya maumivu), dawa za mitishamba zisizoagizwa (baadhi ni sumu moja kwa moja kwa figo), kuvuta sigara, na pombe kupita kiasi. Kaa hai kimwili na weka uzito mzuri. Tibu maambukizi haraka na kaa na chanjo. Na muhimu — mwambie kila mfanyakazi wa afya kwamba una CKD, kwa sababu dawa nyingi za kawaida na rangi za baadhi ya skani zinahitaji marekebisho au kuepukwa.',
      },
    },
    {
      q: {
        en: 'Do I need a special diet? Should I stop eating protein?',
        sw: 'Nahitaji lishe maalum? Niache kula protini?',
      },
      a: {
        en: 'Diet does matter in CKD, but the right diet depends on your stage, your other conditions, and your blood test results — which is why this should be guided by your clinician or a nutritionist rather than by general rules from friends or the internet. A few principles hold for most people: reducing salt helps blood pressure and the kidneys at every stage. As for protein — do NOT cut it out. Your body needs protein to stay strong, and being undernourished is itself dangerous in CKD. In earlier stages most people simply eat a normal balanced amount of protein; in more advanced stages a clinician may suggest a moderate adjustment, but never elimination. In advanced CKD some people also need to watch foods very high in potassium or phosphorus, but this is individual and based on blood results — it is not something to guess at. The safe summary: reduce salt, keep eating enough good food including protein, and ask your clinic for a diet plan matched to your specific stage and lab results rather than following a generic "kidney diet" you found somewhere.',
        sw: 'Lishe ni muhimu katika CKD, lakini lishe sahihi inategemea hatua yako, hali zako zingine, na matokeo ya vipimo vyako vya damu — ndiyo maana hili linapaswa kuongozwa na daktari wako au mtaalam wa lishe badala ya kanuni za jumla kutoka kwa marafiki au mtandao. Kanuni chache zinashikilia kwa watu wengi: kupunguza chumvi husaidia shinikizo la damu na figo katika kila hatua. Kuhusu protini — USIIONDOE. Mwili wako unahitaji protini kubaki imara, na kuwa na utapiamlo wenyewe ni hatari katika CKD. Katika hatua za awali watu wengi hula tu kiasi cha kawaida cha protini chenye uwiano; katika hatua za juu zaidi daktari anaweza kupendekeza marekebisho ya wastani, lakini kamwe sio kuondoa. Katika CKD ya juu baadhi ya watu pia wanahitaji kuangalia vyakula vyenye potasiamu au fosforasi nyingi sana, lakini hii ni ya mtu binafsi na inategemea matokeo ya damu — sio kitu cha kukisia. Muhtasari salama: punguza chumvi, endelea kula chakula kizuri cha kutosha ikiwa ni pamoja na protini, na uombe kliniki yako mpango wa lishe unaolingana na hatua yako maalum na matokeo ya vipimo badala ya kufuata "lishe ya figo" ya jumla uliyoipata mahali fulani.',
        sw_mtaa: 'Lishe ni muhimu katika CKD, lakini lishe sahihi inategemea hatua yako, hali zako zingine, na matokeo ya vipimo vyako — ndiyo maana hili linapaswa kuongozwa na daktari au mtaalam wa lishe badala ya kanuni za jumla kutoka kwa marafiki au mtandao. Kanuni chache kwa watu wengi: kupunguza chumvi kunasaidia presha na figo kila hatua. Kuhusu protini — USIIONDOE. Mwili unahitaji protini kubaki imara, na utapiamlo wenyewe ni hatari katika CKD. Katika hatua za mwanzo watu wengi wanakula tu kiasi cha kawaida cha protini; katika hatua za juu daktari anaweza kupendekeza marekebisho ya wastani, lakini kamwe sio kuondoa. Katika CKD ya juu baadhi ya watu wanahitaji kuangalia vyakula vyenye potasiamu au fosforasi nyingi, lakini hii ni ya mtu binafsi na inategemea matokeo ya damu — sio kitu cha kukisia. Muhtasari salama: punguza chumvi, endelea kula chakula kizuri cha kutosha pamoja na protini, na uombe kliniki mpango wa lishe unaolingana na hatua yako badala ya kufuata "kidney diet" ya jumla.',
      },
    },
    {
      q: {
        en: 'Which painkillers and medicines are dangerous for my kidneys?',
        sw: 'Dawa gani za maumivu na dawa zipi ni hatari kwa figo zangu?',
      },
      a: {
        en: 'This is one of the most important practical things to know with CKD, because some very common medicines can quietly worsen kidney function. The main group to be careful with is the anti-inflammatory painkillers — drugs like ibuprofen, diclofenac, and similar (often sold over the counter and in many "joint pain" or "body pain" mixtures). Used regularly, they can reduce kidney blood flow and accelerate CKD. For everyday pain, paracetamol is generally the safer choice in CKD, but still check with your clinician. Other things to be cautious about: many herbal and traditional remedies (some contain substances directly toxic to kidneys — and "natural" does not mean "safe for kidneys"), certain antibiotics and other prescription drugs that need dose reduction in CKD, and the contrast dye used in some CT scans. The rule that keeps you safe is simple: before you take ANY new medicine — including ones from a pharmacy, a shop, a relative, or a traditional healer — tell whoever is giving it that you have kidney disease, and ask whether it is safe and whether the dose needs adjusting. When in doubt, ask first.',
        sw: 'Hili ni mojawapo ya mambo muhimu zaidi ya kivitendo kujua na CKD, kwa sababu baadhi ya dawa za kawaida sana zinaweza kuzidisha kimya kimya utendaji wa figo. Kundi kuu la kuwa makini nalo ni dawa za maumivu za kuzuia uvimbe — dawa kama ibuprofen, diclofenac, na zinazofanana (mara nyingi huuzwa bila agizo na katika michanganyiko mingi ya "maumivu ya viungo" au "maumivu ya mwili"). Zikitumika mara kwa mara, zinaweza kupunguza mtiririko wa damu kwenye figo na kuharakisha CKD. Kwa maumivu ya kila siku, paracetamol kwa ujumla ni chaguo salama zaidi katika CKD, lakini bado angalia na daktari wako. Vitu vingine vya kuwa na tahadhari navyo: dawa nyingi za mitishamba na za jadi (baadhi zina vitu vyenye sumu moja kwa moja kwa figo — na "asili" haimaanishi "salama kwa figo"), antibiotics fulani na dawa zingine za agizo zinazohitaji kupunguzwa dose katika CKD, na rangi ya tofauti inayotumika katika baadhi ya skani za CT. Kanuni inayokuweka salama ni rahisi: kabla ya kutumia dawa YOYOTE mpya — ikiwa ni pamoja na zile za duka la dawa, duka, jamaa, au mganga wa jadi — mwambie anayekupa kwamba una ugonjwa wa figo, na uulize kama ni salama na kama dose inahitaji kurekebishwa. Ukiwa na shaka, uliza kwanza.',
        sw_mtaa: 'Hili ni mojawapo ya mambo muhimu zaidi ya kivitendo kujua na CKD, kwa sababu baadhi ya dawa za kawaida sana zinaweza kuzidisha kimya kimya kazi ya figo. Kundi kuu la kuwa makini nalo ni dawa za maumivu za kuzuia uvimbe — kama ibuprofen, diclofenac, na zinazofanana (mara nyingi zinauzwa bila agizo na katika michanganyiko mingi ya "maumivu ya viungo" au "maumivu ya mwili"). Zikitumika mara kwa mara, zinaweza kupunguza mtiririko wa damu kwenye figo na kuharakisha CKD. Kwa maumivu ya kila siku, paracetamol kwa ujumla ni chaguo salama zaidi katika CKD, lakini bado angalia na daktari. Vingine vya kuwa na tahadhari: dawa nyingi za mitishamba na za jadi (baadhi zina sumu moja kwa moja kwa figo — "asili" haimaanishi "salama kwa figo"), antibiotics fulani zinazohitaji kupunguzwa dose katika CKD, na rangi ya CT scan. Kanuni inayokuweka salama: kabla ya dawa YOYOTE mpya — ya duka la dawa, duka, jamaa, au mganga wa jadi — mwambie anayekupa kwamba una ugonjwa wa figo, na uulize kama ni salama na kama dose inahitaji kurekebishwa. Ukiwa na shaka, uliza kwanza.',
      },
    },
    {
      q: {
        en: 'My doctor mentioned dialysis. What is it, and does CKD always lead to it?',
        sw: 'Daktari wangu alitaja dialysis. Ni nini, na je CKD daima huishia hapo?',
      },
      a: {
        en: 'First, the reassuring part: most people with CKD never reach dialysis. CKD has five stages, and dialysis only becomes relevant at the most advanced stage (kidney failure, stage 5) — and even then, only when the kidneys can no longer keep the body safe. Many people, especially those diagnosed early and managed well, stay in the earlier stages for the rest of their lives. Dialysis is a treatment that does the filtering job the kidneys can no longer do. There are two main types: haemodialysis, where blood is filtered through a machine, usually a few times a week at a centre; and peritoneal dialysis, which uses the lining of the abdomen to filter, and can often be done at home. In Tanzania dialysis is available at major referral hospitals but not everywhere, so if a clinician thinks it may be needed in the future, planning ahead matters. If your doctor mentioned it, it does not necessarily mean you need it now — it may mean they want you to understand the road ahead and start preparing. Ask them directly: what stage am I, how fast is it progressing, and what are we doing to slow it down? Those answers will tell you far more than the word "dialysis" alone.',
        sw: 'Kwanza, sehemu ya kufariji: watu wengi wenye CKD hawafikii dialysis kamwe. CKD ina hatua tano, na dialysis huwa muhimu tu katika hatua ya juu zaidi (figo kushindwa, hatua 5) — na hata hapo, tu wakati figo haziwezi tena kuuweka mwili salama. Watu wengi, hasa wale waliogunduliwa mapema na kusimamiwa vizuri, hubaki katika hatua za awali kwa maisha yao yote. Dialysis ni matibabu yanayofanya kazi ya uchujaji ambayo figo haziwezi tena kufanya. Kuna aina kuu mbili: haemodialysis, ambapo damu huchujwa kupitia mashine, kawaida mara chache kwa wiki katika kituo; na peritoneal dialysis, ambayo hutumia utando wa tumbo kuchuja, na mara nyingi inaweza kufanywa nyumbani. Tanzania dialysis inapatikana katika hospitali kuu za rufaa lakini sio kila mahali, hivyo ikiwa daktari anafikiri inaweza kuhitajika baadaye, kupanga mapema ni muhimu. Ikiwa daktari wako aliitaja, haimaanishi lazima uihitaji sasa — inaweza maanisha wanataka uelewe njia iliyo mbele na uanze kujiandaa. Waulize moja kwa moja: niko hatua gani, inaendelea kwa kasi gani, na tunafanya nini kupunguza kasi yake? Majibu hayo yatakuambia mengi zaidi kuliko neno "dialysis" peke yake.',
        sw_mtaa: 'Kwanza, sehemu ya kufariji: watu wengi wenye CKD hawafikii dialysis kamwe. CKD ina hatua tano, na dialysis inakuwa muhimu tu katika hatua ya juu zaidi (figo kushindwa, hatua 5) — na hata hapo, tu wakati figo haziwezi tena kuuweka mwili salama. Watu wengi, hasa waliogunduliwa mapema na kusimamiwa vizuri, wanabaki katika hatua za mwanzo maisha yao yote. Dialysis ni matibabu yanayofanya kazi ya uchujaji ambayo figo haziwezi tena. Kuna aina kuu mbili: haemodialysis, ambapo damu inachujwa kupitia mashine, kawaida mara chache kwa wiki kituoni; na peritoneal dialysis, inayotumia utando wa tumbo kuchuja, na mara nyingi inaweza kufanywa nyumbani. Tanzania dialysis inapatikana katika hospitali kuu za rufaa lakini sio kila mahali, hivyo daktari akifikiri inaweza kuhitajika baadaye, kupanga mapema ni muhimu. Daktari akiitaja, haimaanishi lazima uihitaji sasa — inaweza maanisha wanataka uelewe njia iliyo mbele na uanze kujiandaa. Waulize moja kwa moja: niko hatua gani, inaendelea kwa kasi gani, na tunafanya nini kupunguza kasi? Majibu hayo yatakuambia mengi zaidi kuliko neno "dialysis" peke yake.',
      },
    },
    {
      q: {
        en: 'I have diabetes — how does that affect my kidneys?',
        sw: 'Nina kisukari — hilo linaathiri vipi figo zangu?',
      },
      a: {
        en: 'Diabetes is the leading cause of CKD in Tanzania and worldwide, so this connection matters a great deal. Over years, high blood sugar damages the tiny filtering units inside the kidneys — this is called diabetic kidney disease, and it usually develops slowly and silently. The good news is that this is also one of the most preventable and slowable forms of CKD. The protective steps are clear: keep blood sugar well controlled (your HbA1c in the range your clinician sets), keep blood pressure in target, and take any kidney-protective medicine your clinician prescribes — for people with both diabetes and CKD there are specific medicines that protect the kidneys, and your clinician will guide this. Equally important is monitoring: everyone with diabetes should have their kidney function (eGFR) and urine protein checked regularly — often once a year, more if there is already a problem — so that any kidney involvement is caught early when there is the most to gain. If you have diabetes, ask at your next visit when your kidneys were last checked.',
        sw: 'Kisukari ni sababu kuu ya CKD Tanzania na duniani kote, hivyo uhusiano huu ni muhimu sana. Kwa miaka, sukari ya juu ya damu huharibu vipande vidogo vya uchujaji ndani ya figo — hii inaitwa ugonjwa wa figo wa kisukari, na kawaida hukua polepole na kimya. Habari njema ni kwamba hii pia ni mojawapo ya aina za CKD zinazoweza kuzuiwa na kupunguzwa kasi zaidi. Hatua za kulinda ziko wazi: weka sukari ya damu ikidhibitiwa vizuri (HbA1c yako katika kiwango ambacho daktari wako anaweka), weka shinikizo la damu katika lengo, na tumia dawa yoyote ya kulinda figo ambayo daktari wako anaagiza — kwa watu wenye kisukari na CKD pamoja kuna dawa maalum zinazolinda figo, na daktari wako ataongoza hili. Muhimu sawa ni ufuatiliaji: kila mtu mwenye kisukari anapaswa kupimwa utendaji wa figo (eGFR) na protini ya mkojo mara kwa mara — mara nyingi mara moja kwa mwaka, zaidi ikiwa tayari kuna tatizo — ili ushiriki wowote wa figo ugunduliwe mapema wakati kuna mengi zaidi ya kupata. Ikiwa una kisukari, uliza katika ziara yako inayofuata figo zako zilipimwa lini mwisho.',
        sw_mtaa: 'Kisukari ni sababu kuu ya CKD Tanzania na duniani kote, hivyo uhusiano huu ni muhimu sana. Kwa miaka, sukari ya juu inaharibu vipande vidogo vya uchujaji ndani ya figo — hii inaitwa diabetic kidney disease, na kawaida inakua polepole na kimya. Habari njema ni kwamba hii pia ni mojawapo ya aina za CKD zinazoweza kuzuiwa na kupunguzwa kasi zaidi. Hatua za kulinda ziko wazi: weka sukari ikidhibitiwa vizuri (HbA1c yako katika kiwango ambacho daktari anaweka), weka presha katika lengo, na tumia dawa yoyote ya kulinda figo ambayo daktari anaagiza — kwa watu wenye kisukari na CKD pamoja kuna dawa maalum zinazolinda figo, na daktari ataongoza hili. Muhimu sawa ni ufuatiliaji: kila mtu mwenye kisukari apimwe kazi ya figo (eGFR) na protini ya mkojo mara kwa mara — mara nyingi mara moja kwa mwaka, zaidi ikiwa tayari kuna tatizo — ili ushiriki wowote wa figo ugunduliwe mapema. Ukiwa na kisukari, uliza ziara inayofuata figo zako zilipimwa lini mwisho.',
      },
    },
    {
      q: {
        en: 'I have high blood pressure — is that damaging my kidneys too?',
        sw: 'Nina shinikizo la juu la damu — hilo linaharibu figo zangu pia?',
      },
      a: {
        en: 'Yes — high blood pressure and kidney disease are tightly linked, in both directions, which is why this matters so much. Uncontrolled high blood pressure damages the small blood vessels inside the kidneys over time, making it one of the two leading causes of CKD. And it works the other way too: damaged kidneys are less able to regulate blood pressure, which pushes the pressure even higher — a cycle that feeds itself. The encouraging part is that breaking this cycle is very achievable, and blood pressure control is the single most powerful thing most people with CKD can do to protect their kidneys. That means taking blood pressure medicines exactly as prescribed every day (not just when you feel unwell — high blood pressure is usually silent), reducing salt, staying active, and keeping every clinic appointment so the numbers are tracked. Your clinician will set a blood pressure target for you and may choose specific medicines that both lower pressure and directly protect the kidneys. If you have high blood pressure, treating it well is not separate from kidney care — it IS kidney care.',
        sw: 'Ndio — shinikizo la juu la damu na ugonjwa wa figo vimeunganishwa kwa karibu, kwa pande zote mbili, ndiyo maana hili ni muhimu sana. Shinikizo la juu la damu lisilodhibitiwa huharibu mishipa midogo ya damu ndani ya figo kwa muda, na kuifanya kuwa mojawapo ya sababu mbili kuu za CKD. Na hufanya kazi upande mwingine pia: figo zilizoharibika hazina uwezo mzuri wa kudhibiti shinikizo la damu, ambalo husukuma shinikizo juu zaidi — mzunguko unaojilisha. Sehemu ya kutia moyo ni kwamba kuvunja mzunguko huu kunawezekana sana, na udhibiti wa shinikizo la damu ni jambo moja lenye nguvu zaidi watu wengi wenye CKD wanaloweza kufanya kulinda figo zao. Hiyo inamaanisha kutumia dawa za shinikizo la damu hasa kama zilivyoagizwa kila siku (sio tu unapojisikia vibaya — shinikizo la juu la damu kawaida ni kimya), kupunguza chumvi, kukaa hai, na kuweka kila miadi ya kliniki ili namba zifuatiliwe. Daktari wako atakuwekea lengo la shinikizo la damu na anaweza kuchagua dawa maalum zinazoshusha shinikizo na kulinda figo moja kwa moja. Ikiwa una shinikizo la juu la damu, kulitibu vizuri sio tofauti na huduma ya figo — NDIO huduma ya figo.',
        sw_mtaa: 'Ndio — presha ya juu na ugonjwa wa figo vimeunganishwa kwa karibu, pande zote mbili, ndiyo maana hili ni muhimu sana. Presha ya juu isiyodhibitiwa inaharibu mishipa midogo ya damu ndani ya figo kwa muda, na kuifanya kuwa mojawapo ya sababu mbili kuu za CKD. Na inafanya kazi upande mwingine pia: figo zilizoharibika hazina uwezo mzuri wa kudhibiti presha, inayosukuma presha juu zaidi — mzunguko unaojilisha. Sehemu ya kutia moyo ni kwamba kuvunja mzunguko huu kunawezekana sana, na udhibiti wa presha ni jambo moja lenye nguvu zaidi watu wengi wenye CKD wanaloweza kufanya kulinda figo. Hiyo inamaanisha kutumia dawa za presha hasa kama zilivyoagizwa kila siku (sio tu unapojisikia vibaya — presha ya juu kawaida ni kimya), kupunguza chumvi, kukaa hai, na kuweka kila miadi ili namba zifuatiliwe. Daktari atakuwekea lengo la presha na anaweza kuchagua dawa maalum zinazoshusha presha na kulinda figo moja kwa moja. Ukiwa na presha ya juu, kuitibu vizuri sio tofauti na huduma ya figo — NDIO huduma ya figo.',
      },
    },
    {
      q: {
        en: 'Why am I so tired, and why are my legs swelling?',
        sw: 'Kwa nini nimechoka sana, na kwa nini miguu yangu inavimba?',
      },
      a: {
        en: 'These are two of the more common symptoms once CKD reaches its later stages, and each has a kidney-related explanation. Tiredness in CKD often comes from anaemia — healthy kidneys send a signal that tells the body to make red blood cells, and as kidney function falls that signal weakens, so fewer red cells are made and the body gets less oxygen. Tiredness can also come from waste products building up in the blood, or from other conditions alongside CKD. Leg, ankle, or facial swelling usually means the body is holding on to extra fluid and salt that healthy kidneys would normally remove — sometimes it also relates to protein being lost in the urine. Neither of these should be ignored or simply tolerated. They are signs to bring to your clinician, who can check for and treat anaemia, review your fluid and salt balance, adjust medicines, and look for anything else contributing. If the swelling is worsening quickly, you are becoming breathless, or you cannot lie flat to sleep, that is more urgent — seek care promptly, because it can mean fluid is affecting the lungs or heart.',
        sw: 'Hizi ni mbili kati ya dalili za kawaida zaidi mara CKD inapofikia hatua zake za baadaye, na kila moja ina maelezo yanayohusiana na figo. Uchovu katika CKD mara nyingi hutoka kwa upungufu wa damu — figo zenye afya hutuma ishara inayoambia mwili kutengeneza chembe nyekundu za damu, na kadri utendaji wa figo unavyoshuka ishara hiyo hudhoofika, hivyo chembe nyekundu chache hutengenezwa na mwili hupata oksijeni kidogo. Uchovu pia unaweza kutoka kwa taka zinazojikusanya damuni, au kutoka hali zingine pamoja na CKD. Uvimbe wa miguu, vifundoni, au usoni kawaida humaanisha mwili unashikilia maji na chumvi za ziada ambazo figo zenye afya kawaida zingeziondoa — wakati mwingine pia unahusiana na protini kupotea katika mkojo. Hakuna kati ya hizi inayopaswa kupuuzwa au kuvumiliwa tu. Ni ishara za kuleta kwa daktari wako, ambaye anaweza kuangalia na kutibu upungufu wa damu, kupitia uwiano wako wa maji na chumvi, kurekebisha dawa, na kutafuta kitu kingine chochote kinachochangia. Ikiwa uvimbe unazidi haraka, unakuwa unashindwa kupumua, au huwezi kulala ukiwa umelala chali, hiyo ni ya haraka zaidi — tafuta huduma haraka, kwa sababu inaweza maanisha maji yanaathiri mapafu au moyo.',
        sw_mtaa: 'Hizi ni mbili kati ya dalili za kawaida zaidi mara CKD inapofikia hatua za baadaye, na kila moja ina maelezo yanayohusiana na figo. Uchovu katika CKD mara nyingi unatoka kwa upungufu wa damu — figo zenye afya zinatuma ishara inayoambia mwili utengeneze chembe nyekundu za damu, na kadri kazi ya figo inavyoshuka ishara hiyo inadhoofika, hivyo chembe nyekundu chache zinatengenezwa na mwili unapata oksijeni kidogo. Uchovu pia unaweza kutoka kwa taka zinazojikusanya damuni. Uvimbe wa miguu, vifundoni, au usoni kawaida unamaanisha mwili unashikilia maji na chumvi za ziada ambazo figo zenye afya zingeziondoa — wakati mwingine pia unahusiana na protini kupotea kwenye mkojo. Hakuna kati ya hizi inayopaswa kupuuzwa au kuvumiliwa tu. Ni ishara za kuleta kwa daktari, anayeweza kuangalia na kutibu upungufu wa damu, kupitia uwiano wa maji na chumvi, kurekebisha dawa, na kutafuta kingine chochote. Ikiwa uvimbe unazidi haraka, unashindwa kupumua, au huwezi kulala chali, hiyo ni ya haraka zaidi — tafuta huduma haraka, inaweza maanisha maji yanaathiri mapafu au moyo.',
      },
    },
    {
      q: {
        en: 'Can I still get pregnant if I have kidney disease?',
        sw: 'Bado naweza kupata mimba nikiwa na ugonjwa wa figo?',
      },
      a: {
        en: 'Many women with CKD do have successful pregnancies — but it needs careful planning and shared care, so the most important step is to talk to your clinician BEFORE becoming pregnant rather than after. CKD can make pregnancy higher-risk: there is a greater chance of high blood pressure in pregnancy (including pre-eclampsia), the baby being born early or small, and pregnancy can sometimes speed up the loss of kidney function. How much risk depends a lot on your CKD stage, your blood pressure, and how much protein is in your urine — which is why an individual assessment matters more than any general rule. Planning ahead allows several protective things: getting blood pressure well controlled before conception, reviewing your medicines (some kidney and blood pressure medicines are not safe in pregnancy and need to be changed in advance — never stop them on your own, but do raise it early), and arranging joint care between a kidney specialist and a high-risk pregnancy team. The message is not "you cannot" — it is "plan it carefully, with your clinicians, before rather than after."',
        sw: 'Wanawake wengi wenye CKD huwa na mimba zenye mafanikio — lakini inahitaji kupanga kwa makini na huduma ya pamoja, hivyo hatua muhimu zaidi ni kuongea na daktari wako KABLA ya kuwa mjamzito badala ya baada. CKD inaweza kufanya mimba kuwa hatari zaidi: kuna nafasi kubwa zaidi ya shinikizo la juu la damu katika mimba (ikiwa ni pamoja na pre-eclampsia), mtoto kuzaliwa mapema au mdogo, na mimba wakati mwingine inaweza kuharakisha upotevu wa utendaji wa figo. Kiasi gani cha hatari kinategemea sana hatua yako ya CKD, shinikizo lako la damu, na kiasi gani cha protini kiko katika mkojo wako — ndiyo maana tathmini ya mtu binafsi ni muhimu zaidi kuliko kanuni yoyote ya jumla. Kupanga mapema kunaruhusu mambo kadhaa ya kulinda: kupata shinikizo la damu likidhibitiwa vizuri kabla ya mimba, kupitia dawa zako (baadhi ya dawa za figo na shinikizo la damu sio salama katika mimba na zinahitaji kubadilishwa mapema — kamwe usiziache peke yako, lakini liibue mapema), na kupanga huduma ya pamoja kati ya mtaalam wa figo na timu ya mimba ya hatari kubwa. Ujumbe sio "huwezi" — ni "ipange kwa makini, na madaktari wako, kabla badala ya baada."',
        sw_mtaa: 'Wanawake wengi wenye CKD wanakuwa na mimba zenye mafanikio — lakini inahitaji kupanga kwa makini na huduma ya pamoja, hivyo hatua muhimu zaidi ni kuongea na daktari KABLA ya kuwa mjamzito badala ya baada. CKD inaweza kufanya mimba kuwa hatari zaidi: kuna nafasi kubwa zaidi ya presha ya juu katika mimba (pamoja na pre-eclampsia), mtoto kuzaliwa mapema au mdogo, na mimba wakati mwingine inaweza kuharakisha upotevu wa kazi ya figo. Kiasi cha hatari kinategemea sana hatua yako ya CKD, presha yako, na kiasi cha protini kwenye mkojo wako — ndiyo maana tathmini ya mtu binafsi ni muhimu zaidi kuliko kanuni ya jumla. Kupanga mapema kunaruhusu mambo ya kulinda: kupata presha ikidhibitiwa vizuri kabla ya mimba, kupitia dawa zako (baadhi ya dawa za figo na presha sio salama katika mimba na zinahitaji kubadilishwa mapema — kamwe usiziache peke yako, lakini liibue mapema), na kupanga huduma ya pamoja kati ya mtaalam wa figo na timu ya mimba ya hatari kubwa. Ujumbe sio "huwezi" — ni "ipange kwa makini, na madaktari wako, kabla badala ya baada."',
      },
    },
    {
      q: {
        en: 'How often should my kidneys be checked, and what tests are done?',
        sw: 'Figo zangu zinapaswa kupimwa mara ngapi, na vipimo gani hufanywa?',
      },
      a: {
        en: 'How often depends on your situation, and your clinician sets the schedule — but the general pattern is useful to understand. If you have a risk factor but no diagnosed CKD (for example diabetes or high blood pressure), kidney checks are often done about once a year. If you already have CKD, monitoring is more frequent — the earlier and more stable the stage, the less often; the more advanced or the faster it is changing, the more often, sometimes every few months. The core tests are simple and few: a blood test for creatinine, which gives your eGFR (your filtering function), and a urine test for protein or albumin (a sign of kidney damage, and one of the earliest signs at that). Your clinician may also check things that CKD affects — blood pressure at every visit, and in later stages blood counts (for anaemia), potassium, calcium and phosphate, and others. The single most useful habit for you is to keep your results over time and bring them to every appointment: CKD is best understood as a trend, and the trend tells the story far better than any one number.',
        sw: 'Mara ngapi kunategemea hali yako, na daktari wako huweka ratiba — lakini muundo wa jumla ni muhimu kuelewa. Ikiwa una sababu ya hatari lakini huna CKD iliyogunduliwa (kwa mfano kisukari au shinikizo la juu la damu), ukaguzi wa figo mara nyingi hufanywa karibu mara moja kwa mwaka. Ikiwa tayari una CKD, ufuatiliaji ni wa mara kwa mara zaidi — hatua ya awali na imara zaidi, mara chache; ya juu zaidi au inayobadilika kwa kasi, mara nyingi zaidi, wakati mwingine kila miezi michache. Vipimo vya msingi ni rahisi na vichache: kipimo cha damu cha creatinine, kinachotoa eGFR yako (utendaji wako wa uchujaji), na kipimo cha mkojo cha protini au albumin (ishara ya uharibifu wa figo, na mojawapo ya ishara za mapema zaidi). Daktari wako anaweza pia kuangalia vitu ambavyo CKD huathiri — shinikizo la damu katika kila ziara, na katika hatua za baadaye hesabu za damu (kwa upungufu wa damu), potasiamu, kalsiamu na fosfeti, na vingine. Tabia moja muhimu zaidi kwako ni kuweka matokeo yako kwa muda na kuyaleta katika kila miadi: CKD inaeleweka vizuri zaidi kama mwelekeo, na mwelekeo huelezea hadithi vizuri zaidi kuliko namba yoyote moja.',
        sw_mtaa: 'Mara ngapi kunategemea hali yako, na daktari wako huweka ratiba — lakini muundo wa jumla ni muhimu kuelewa. Ikiwa una sababu ya hatari lakini huna CKD iliyogunduliwa (kwa mfano kisukari au presha ya juu), ukaguzi wa figo mara nyingi unafanywa karibu mara moja kwa mwaka. Ikiwa tayari una CKD, ufuatiliaji ni wa mara kwa mara zaidi — hatua ya mwanzo na imara zaidi, mara chache; ya juu zaidi au inayobadilika kwa kasi, mara nyingi zaidi, wakati mwingine kila miezi michache. Vipimo vya msingi ni rahisi na vichache: kipimo cha damu cha creatinine, kinachotoa eGFR yako, na kipimo cha mkojo cha protini (ishara ya uharibifu wa figo, na mojawapo ya za mapema zaidi). Daktari anaweza pia kuangalia vitu ambavyo CKD inaathiri — presha kila ziara, na katika hatua za baadaye hesabu za damu, potasiamu, kalsiamu na fosfeti. Tabia moja muhimu zaidi kwako ni kuweka matokeo yako kwa muda na kuyaleta kila miadi: CKD inaeleweka vizuri zaidi kama mwelekeo, na mwelekeo unaelezea hadithi vizuri zaidi kuliko namba yoyote moja.',
      },
    },
    {
      q: {
        en: 'What is a kidney transplant, and could it be an option for me?',
        sw: 'Kupandikizwa figo ni nini, na je inaweza kuwa chaguo kwangu?',
      },
      a: {
        en: 'A kidney transplant is an operation that places a healthy kidney — from a living donor (often a relative) or a deceased donor — into a person whose own kidneys have failed. For many people with kidney failure it offers a better quality of life and longer survival than long-term dialysis. It is a major step: it needs careful matching and testing, a lifelong commitment to anti-rejection medicines that stop the body attacking the new kidney, and ongoing specialist follow-up. Whether it could be an option for you depends on many things — your overall health, other conditions, the availability of a suitable donor, and access to a transplant programme. Transplant services in the region are growing but are still concentrated at major referral centres, and access varies. If you are at or approaching kidney failure, transplant is one of the paths worth discussing openly with your kidney specialist, alongside the different forms of dialysis, so you understand all the options well before a decision is needed. It is not the right or available choice for everyone — but it is a real option for many, and an honest conversation with your specialist is the way to find out where you stand.',
        sw: 'Kupandikizwa figo ni upasuaji unaoweka figo yenye afya — kutoka kwa mtoaji aliye hai (mara nyingi jamaa) au mtoaji aliyefariki — ndani ya mtu ambaye figo zake zimeshindwa. Kwa watu wengi wenye figo kushindwa hutoa ubora bora wa maisha na uhai mrefu zaidi kuliko dialysis ya muda mrefu. Ni hatua kubwa: inahitaji kulinganisha na kupima kwa makini, ahadi ya maisha yote ya dawa za kuzuia kukataliwa zinazozuia mwili kushambulia figo mpya, na ufuatiliaji wa mtaalam unaoendelea. Kama inaweza kuwa chaguo kwako kunategemea mambo mengi — afya yako kwa ujumla, hali zingine, upatikanaji wa mtoaji anayefaa, na ufikiaji wa programu ya kupandikiza. Huduma za kupandikiza katika eneo hili zinakua lakini bado zimejikita katika vituo vikuu vya rufaa, na ufikiaji unatofautiana. Ikiwa uko au unakaribia figo kushindwa, kupandikiza ni mojawapo ya njia zinazostahili kujadiliwa kwa uwazi na mtaalam wako wa figo, pamoja na aina tofauti za dialysis, ili uelewe chaguzi zote vizuri kabla ya uamuzi kuhitajika. Sio chaguo sahihi au linalopatikana kwa kila mtu — lakini ni chaguo halisi kwa wengi, na mazungumzo ya uwazi na mtaalam wako ndiyo njia ya kujua uko wapi.',
        sw_mtaa: 'Kupandikizwa figo ni upasuaji unaoweka figo yenye afya — kutoka kwa mtoaji aliye hai (mara nyingi jamaa) au mtoaji aliyefariki — ndani ya mtu ambaye figo zake zimeshindwa. Kwa watu wengi wenye figo kushindwa inatoa maisha bora na uhai mrefu zaidi kuliko dialysis ya muda mrefu. Ni hatua kubwa: inahitaji kulinganisha na kupima kwa makini, ahadi ya maisha yote ya dawa za kuzuia kukataliwa zinazozuia mwili kushambulia figo mpya, na ufuatiliaji wa mtaalam unaoendelea. Kama inaweza kuwa chaguo kwako kunategemea mambo mengi — afya yako kwa ujumla, hali zingine, upatikanaji wa mtoaji anayefaa, na ufikiaji wa programu. Huduma za kupandikiza katika eneo hili zinakua lakini bado zimejikita katika vituo vikuu vya rufaa, na ufikiaji unatofautiana. Ikiwa uko au unakaribia figo kushindwa, kupandikiza ni mojawapo ya njia zinazostahili kujadiliwa kwa uwazi na mtaalam wako wa figo, pamoja na aina tofauti za dialysis, ili uelewe chaguzi zote kabla ya uamuzi kuhitajika. Sio chaguo sahihi au linalopatikana kwa kila mtu — lakini ni chaguo halisi kwa wengi, na mazungumzo ya uwazi na mtaalam ndiyo njia ya kujua uko wapi.',
      },
    },
    {
      q: {
        en: 'I was told I have a little protein in my urine. Is that serious?',
        sw: 'Niliambiwa nina protini kidogo katika mkojo wangu. Je hilo ni zito?',
      },
      a: {
        en: 'Protein in the urine — sometimes called proteinuria or albuminuria — is worth taking seriously, because it is one of the earliest and most important signs that the kidneys\' filters are leaking. Healthy kidneys keep protein in the blood where it belongs; when protein starts appearing in the urine, it usually means the filtering units are damaged. It matters for two reasons: it can be an early warning of CKD even when the eGFR still looks normal, and the amount of protein is one of the strongest predictors of how the kidney disease will progress over time. The good news is that this early signal gives you and your clinician something to act on while there is the most to gain. A single result can sometimes be raised by a temporary cause — a urine infection, fever, intense exercise, or being unwell — so your clinician will usually confirm it with a repeat test. If it is confirmed, it does not mean disaster; it means the kidneys need attention now: controlling blood pressure and blood sugar tightly, and often a specific kidney-protective medicine, can substantially reduce the protein leak and slow progression. Take it as useful early information, not as a verdict.',
        sw: 'Protini katika mkojo — wakati mwingine huitwa proteinuria au albuminuria — inastahili kuchukuliwa kwa uzito, kwa sababu ni mojawapo ya ishara za mapema na muhimu zaidi kwamba vichujio vya figo vinavuja. Figo zenye afya huweka protini katika damu ambapo inastahili kuwa; protini inapoanza kuonekana katika mkojo, kawaida humaanisha vipande vya uchujaji vimeharibika. Inajalisha kwa sababu mbili: inaweza kuwa onyo la mapema la CKD hata wakati eGFR bado inaonekana ya kawaida, na kiasi cha protini ni mojawapo ya watabiri wenye nguvu zaidi wa jinsi ugonjwa wa figo utakavyoendelea kwa muda. Habari njema ni kwamba ishara hii ya mapema inakupa wewe na daktari wako kitu cha kuchukua hatua wakati kuna mengi zaidi ya kupata. Matokeo moja wakati mwingine yanaweza kupandishwa na sababu ya muda — maambukizi ya mkojo, homa, mazoezi makali, au kuwa mgonjwa — hivyo daktari wako kawaida atayathibitisha kwa kipimo cha kurudia. Yakithibitishwa, haimaanishi maafa; inamaanisha figo zinahitaji uangalifu sasa: kudhibiti shinikizo la damu na sukari ya damu kwa nguvu, na mara nyingi dawa maalum ya kulinda figo, kunaweza kupunguza sana uvujaji wa protini na kupunguza kasi ya maendeleo. Ichukue kama habari ya mapema yenye manufaa, sio kama hukumu.',
        sw_mtaa: 'Protini katika mkojo — wakati mwingine inaitwa proteinuria au albuminuria — inastahili kuchukuliwa kwa uzito, kwa sababu ni mojawapo ya ishara za mapema na muhimu zaidi kwamba vichujio vya figo vinavuja. Figo zenye afya zinaweka protini katika damu ambapo inastahili kuwa; protini inapoanza kuonekana katika mkojo, kawaida inamaanisha vipande vya uchujaji vimeharibika. Inajalisha kwa sababu mbili: inaweza kuwa onyo la mapema la CKD hata wakati eGFR bado inaonekana ya kawaida, na kiasi cha protini ni mojawapo ya watabiri wenye nguvu zaidi wa jinsi ugonjwa utakavyoendelea. Habari njema ni kwamba ishara hii ya mapema inakupa wewe na daktari kitu cha kuchukua hatua wakati kuna mengi zaidi ya kupata. Matokeo moja wakati mwingine yanaweza kupandishwa na sababu ya muda — maambukizi ya mkojo, homa, mazoezi makali, au kuwa mgonjwa — hivyo daktari kawaida atayathibitisha kwa kipimo cha kurudia. Yakithibitishwa, haimaanishi maafa; inamaanisha figo zinahitaji uangalifu sasa: kudhibiti presha na sukari kwa nguvu, na mara nyingi dawa maalum ya kulinda figo, kunaweza kupunguza sana uvujaji wa protini na kupunguza kasi. Ichukue kama habari ya mapema yenye manufaa, sio hukumu.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Keep your blood pressure in the target your clinician sets — for most people with CKD this is the single most powerful way to protect the kidneys. Take blood pressure medicines every day, even when you feel well, because high blood pressure is usually silent.',
      sw: 'Weka shinikizo lako la damu katika lengo ambalo daktari wako anaweka — kwa watu wengi wenye CKD hii ni njia moja yenye nguvu zaidi ya kulinda figo. Tumia dawa za shinikizo la damu kila siku, hata unapojisikia vizuri, kwa sababu shinikizo la juu la damu kawaida ni kimya.',
      sw_mtaa: 'Weka presha yako katika lengo ambalo daktari anaweka — kwa watu wengi wenye CKD hii ni njia moja yenye nguvu zaidi ya kulinda figo. Tumia dawa za presha kila siku, hata unapojisikia poa, kwa sababu presha ya juu kawaida ni kimya.',
    },
    {
      en: 'If you have diabetes, keep your blood sugar well controlled — aim for the HbA1c range your clinician sets. Diabetes is the leading cause of kidney disease, and good control slows it.',
      sw: 'Ikiwa una kisukari, weka sukari yako ya damu ikidhibitiwa vizuri — lenga kiwango cha HbA1c ambacho daktari wako anaweka. Kisukari ni sababu kuu ya ugonjwa wa figo, na udhibiti mzuri huupunguza kasi.',
      sw_mtaa: 'Ikiwa una kisukari, weka sukari yako ikidhibitiwa vizuri — lenga kiwango cha HbA1c ambacho daktari anaweka. Kisukari ni sababu kuu ya ugonjwa wa figo, na udhibiti mzuri unapunguza kasi yake.',
    },
    {
      en: 'Take your kidney-protective and other prescribed medicines exactly as directed, every day. Do not stop them because you feel fine — they are working precisely because they are keeping things stable.',
      sw: 'Tumia dawa zako za kulinda figo na dawa zingine zilizoagizwa hasa kama ulivyoelekezwa, kila siku. Usiziache kwa sababu unajisikia vizuri — zinafanya kazi hasa kwa sababu zinaweka mambo imara.',
      sw_mtaa: 'Tumia dawa zako za kulinda figo na dawa zingine zilizoagizwa hasa kama ulivyoelekezwa, kila siku. Usiziache kwa sababu unajisikia poa — zinafanya kazi hasa kwa sababu zinaweka mambo imara.',
    },
    {
      en: 'Before taking ANY new medicine — from a pharmacy, shop, relative, or traditional healer — tell them you have kidney disease and ask if it is safe. Many ordinary medicines need dose adjustment or avoidance in CKD.',
      sw: 'Kabla ya kutumia dawa YOYOTE mpya — kutoka duka la dawa, duka, jamaa, au mganga wa jadi — waambie una ugonjwa wa figo na uulize kama ni salama. Dawa nyingi za kawaida zinahitaji marekebisho ya dose au kuepukwa katika CKD.',
      sw_mtaa: 'Kabla ya kutumia dawa YOYOTE mpya — kutoka duka la dawa, duka, jamaa, au mganga wa jadi — waambie una ugonjwa wa figo na uulize kama ni salama. Dawa nyingi za kawaida zinahitaji marekebisho ya dose au kuepukwa katika CKD.',
    },
    {
      en: 'Avoid regular use of anti-inflammatory painkillers (ibuprofen, diclofenac and similar). For everyday pain, paracetamol is generally safer in CKD — but still check with your clinician.',
      sw: 'Epuka matumizi ya mara kwa mara ya dawa za maumivu za kuzuia uvimbe (ibuprofen, diclofenac na zinazofanana). Kwa maumivu ya kila siku, paracetamol kwa ujumla ni salama zaidi katika CKD — lakini bado angalia na daktari wako.',
      sw_mtaa: 'Epuka matumizi ya mara kwa mara ya dawa za maumivu za kuzuia uvimbe (ibuprofen, diclofenac na zinazofanana). Kwa maumivu ya kila siku, paracetamol kwa ujumla ni salama zaidi katika CKD — lakini bado angalia na daktari.',
    },
    {
      en: 'Reduce salt in your food. Too much salt raises blood pressure and makes the kidneys work harder. Cook with less, avoid adding salt at the table, and limit very salty processed foods.',
      sw: 'Punguza chumvi katika chakula chako. Chumvi nyingi sana huongeza shinikizo la damu na hufanya figo zifanye kazi zaidi. Pika kwa chumvi kidogo, epuka kuongeza chumvi mezani, na punguza vyakula vilivyosindikwa vyenye chumvi nyingi.',
      sw_mtaa: 'Punguza chumvi katika chakula chako. Chumvi nyingi inaongeza presha na inafanya figo zifanye kazi zaidi. Pika kwa chumvi kidogo, epuka kuongeza chumvi mezani, na punguza vyakula vilivyosindikwa vyenye chumvi nyingi.',
    },
    {
      en: 'Drink water steadily through the day to stay well hydrated, but do not force unusually large amounts. In advanced CKD your clinician may give you a specific fluid target — follow that.',
      sw: 'Kunywa maji kwa utaratibu mchana kutwa kubaki na maji ya kutosha, lakini usilazimishe kiasi kikubwa kisicho cha kawaida. Katika CKD ya juu daktari wako anaweza kukupa lengo maalum la maji — fuata hilo.',
      sw_mtaa: 'Kunywa maji kwa utaratibu mchana kutwa kubaki na maji ya kutosha, lakini usilazimishe kiasi kikubwa kisicho cha kawaida. Katika CKD ya juu daktari anaweza kukupa lengo maalum la maji — fuata hilo.',
    },
    {
      en: 'Do not use unprescribed herbal or traditional remedies for the kidneys — some are directly toxic to kidney tissue. "Natural" does not mean "safe for kidneys." Discuss anything you are considering with your clinician first.',
      sw: 'Usitumie dawa za mitishamba au za jadi zisizoagizwa kwa figo — baadhi ni sumu moja kwa moja kwa tishu za figo. "Asili" haimaanishi "salama kwa figo." Jadili chochote unachofikiria na daktari wako kwanza.',
      sw_mtaa: 'Usitumie dawa za mitishamba au za jadi zisizoagizwa kwa figo — baadhi ni sumu moja kwa moja kwa tishu za figo. "Asili" haimaanishi "salama kwa figo." Jadili chochote unachofikiria na daktari kwanza.',
    },
    {
      en: 'Do not smoke, and keep alcohol within safe limits. Both speed up kidney and blood vessel damage. Stopping smoking is one of the clearest protective steps you can take.',
      sw: 'Usivute sigara, na weka pombe ndani ya mipaka salama. Vyote huharakisha uharibifu wa figo na mishipa ya damu. Kuacha kuvuta sigara ni mojawapo ya hatua za kulinda zilizo wazi zaidi unazoweza kuchukua.',
      sw_mtaa: 'Usivute sigara, na weka pombe ndani ya mipaka salama. Vyote vinaharakisha uharibifu wa figo na mishipa ya damu. Kuacha kuvuta sigara ni mojawapo ya hatua za kulinda zilizo wazi zaidi unazoweza kuchukua.',
    },
    {
      en: 'Stay physically active, keep a healthy weight, and attend every clinic appointment with your previous results so the trend in your kidney numbers can be tracked over time.',
      sw: 'Kaa hai kimwili, weka uzito wenye afya, na hudhuria kila miadi ya kliniki na matokeo yako ya awali ili mwelekeo wa namba zako za figo uweze kufuatiliwa kwa muda.',
      sw_mtaa: 'Kaa hai kimwili, weka uzito mzuri, na hudhuria kila miadi ya kliniki na matokeo yako ya zamani ili mwelekeo wa namba zako za figo uweze kufuatiliwa kwa muda.',
    },
  ],

  warningTriggers: [
    {
      en: 'Regular use of anti-inflammatory painkillers (ibuprofen, diclofenac and similar) — they reduce kidney blood flow and can accelerate CKD.',
      sw: 'Matumizi ya mara kwa mara ya dawa za maumivu za kuzuia uvimbe (ibuprofen, diclofenac na zinazofanana) — hupunguza mtiririko wa damu kwenye figo na zinaweza kuharakisha CKD.',
      sw_mtaa: 'Matumizi ya mara kwa mara ya dawa za maumivu za kuzuia uvimbe (ibuprofen, diclofenac na zinazofanana) — zinapunguza mtiririko wa damu kwenye figo na zinaweza kuharakisha CKD.',
    },
    {
      en: 'Uncontrolled blood pressure — the most powerful driver of CKD progression, and usually silent so it is easy to neglect.',
      sw: 'Shinikizo la damu lisilodhibitiwa — kichocheo chenye nguvu zaidi cha maendeleo ya CKD, na kawaida ni kimya hivyo ni rahisi kupuuza.',
      sw_mtaa: 'Presha isiyodhibitiwa — kichocheo chenye nguvu zaidi cha kasi ya CKD, na kawaida ni kimya hivyo ni rahisi kupuuza.',
    },
    {
      en: 'Uncontrolled blood sugar in diabetes — sustained high sugar steadily damages the kidney filters.',
      sw: 'Sukari ya damu isiyodhibitiwa katika kisukari — sukari ya juu inayoendelea huharibu hatua kwa hatua vichujio vya figo.',
      sw_mtaa: 'Sukari isiyodhibitiwa katika kisukari — sukari ya juu inayoendelea inaharibu hatua kwa hatua vichujio vya figo.',
    },
    {
      en: 'Unprescribed herbal and traditional kidney remedies — some are directly toxic to kidney tissue and can cause sudden, severe damage.',
      sw: 'Dawa za mitishamba na za jadi za figo zisizoagizwa — baadhi ni sumu moja kwa moja kwa tishu za figo na zinaweza kusababisha uharibifu wa ghafla, mkubwa.',
      sw_mtaa: 'Dawa za mitishamba na za jadi za figo zisizoagizwa — baadhi ni sumu moja kwa moja kwa tishu za figo na zinaweza kusababisha uharibifu wa ghafla, mkubwa.',
    },
    {
      en: 'Dehydration — repeated episodes of becoming very dry (from vomiting, diarrhoea, heat, or not drinking enough) can injure already-vulnerable kidneys.',
      sw: 'Upungufu wa maji mwilini — vipindi vya mara kwa mara vya kukauka sana (kutoka kutapika, kuhara, joto, au kutokunywa vya kutosha) vinaweza kujeruhi figo ambazo tayari ziko hatarini.',
      sw_mtaa: 'Kukosa maji mwilini — vipindi vya mara kwa mara vya kukauka sana (kutoka kutapika, kuhara, joto, au kutokunywa vya kutosha) vinaweza kujeruhi figo ambazo tayari ziko hatarini.',
    },
    {
      en: 'Stopping prescribed medicines because you feel well — CKD is usually silent, and feeling well is the medicines working, not a reason to stop.',
      sw: 'Kusimamisha dawa zilizoagizwa kwa sababu unajisikia vizuri — CKD kawaida ni kimya, na kujisikia vizuri ni dawa zinafanya kazi, sio sababu ya kusimama.',
      sw_mtaa: 'Kusimamisha dawa zilizoagizwa kwa sababu unajisikia poa — CKD kawaida ni kimya, na kujisikia poa ni dawa zinafanya kazi, sio sababu ya kusimama.',
    },
    {
      en: 'Smoking and heavy alcohol use — both accelerate damage to the kidneys and the blood vessels that supply them.',
      sw: 'Kuvuta sigara na matumizi mazito ya pombe — vyote huharakisha uharibifu wa figo na mishipa ya damu inayoziletea.',
      sw_mtaa: 'Kuvuta sigara na matumizi mazito ya pombe — vyote vinaharakisha uharibifu wa figo na mishipa ya damu inayoziletea.',
    },
    {
      en: 'Untreated urinary infections or blockages — repeated or unresolved, they can cause lasting kidney damage; get them treated promptly.',
      sw: 'Maambukizi ya mkojo au vizuizi visivyotibiwa — yakirudiwa au yasiyotatuliwa, vinaweza kusababisha uharibifu wa kudumu wa figo; vipate kutibiwa haraka.',
      sw_mtaa: 'Maambukizi ya mkojo au vizuizi visivyotibiwa — yakirudiwa au yasiyotatuliwa, vinaweza kusababisha uharibifu wa kudumu wa figo; vipate kutibiwa haraka.',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Passing very little or no urine, or a sudden sharp drop in how much urine you pass — possible acute kidney injury. EMERGENCY',
        sw: 'Kukojoa mkojo kidogo sana au kutokojoa kabisa, au kushuka kwa ghafla kwa kiasi cha mkojo unaokojoa — uwezekano wa jeraha la figo la ghafla. DHARURA',
        sw_mtaa: 'Kukojoa mkojo kidogo sana au kutokojoa kabisa, au kushuka kwa ghafla kwa kiasi cha mkojo — uwezekano wa acute kidney injury. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe breathlessness, or being unable to lie flat to sleep — possible fluid overload affecting the lungs. EMERGENCY',
        sw: 'Kushindwa kupumua kali, au kushindwa kulala ukiwa umelala chali — uwezekano wa maji kupita kiasi yanayoathiri mapafu. DHARURA',
        sw_mtaa: 'Kushindwa kupumua kali, au kushindwa kulala ukiwa umelala chali — uwezekano wa maji kupita kiasi yanayoathiri mapafu. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Chest pain, a very irregular or slow heartbeat, severe weakness or near-collapse — possible dangerous potassium disturbance. EMERGENCY',
        sw: 'Maumivu ya kifua, mapigo ya moyo yasiyo ya kawaida sana au ya polepole, udhaifu mkubwa au karibu kuanguka — uwezekano wa usumbufu hatari wa potasiamu. DHARURA',
        sw_mtaa: 'Maumivu ya kifua, mapigo ya moyo yasiyo ya kawaida sana au ya polepole, udhaifu mkubwa au karibu kuanguka — uwezekano wa usumbufu hatari wa potasiamu. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Confusion, drowsiness, severe nausea and vomiting, or hiccups that will not stop — possible severe build-up of waste in advanced CKD. EMERGENCY',
        sw: 'Kuchanganyikiwa, usingizi mzito, kichefuchefu kikali na kutapika, au kwikwi zisizoacha — uwezekano wa mkusanyiko mkubwa wa taka katika CKD ya juu. DHARURA',
        sw_mtaa: 'Kuchanganyikiwa, usingizi mzito, kichefuchefu kikali na kutapika, au kwikwi zisizoacha — uwezekano wa mkusanyiko mkubwa wa taka katika CKD ya juu. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Rapidly worsening swelling of the legs, face, or whole body over days — needs prompt review of fluid balance and medicines',
        sw: 'Uvimbe unaozidi kwa kasi wa miguu, uso, au mwili mzima kwa siku — unahitaji ukaguzi wa haraka wa uwiano wa maji na dawa',
        sw_mtaa: 'Uvimbe unaozidi kwa kasi wa miguu, uso, au mwili mzima kwa siku — unahitaji ukaguzi wa haraka wa uwiano wa maji na dawa',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Blood in the urine, or urine that has turned cola-coloured or very dark — needs prompt assessment',
        sw: 'Damu katika mkojo, au mkojo uliogeuka rangi ya cola au giza sana — kunahitaji tathmini ya haraka',
        sw_mtaa: 'Damu katika mkojo, au mkojo uliogeuka rangi ya cola au giza sana — kunahitaji tathmini ya haraka',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Fever with pain in the side or back and burning on passing urine — possible kidney infection, which can damage kidneys if not treated quickly',
        sw: 'Homa na maumivu ya ubavu au mgongo na kuwaka unapokojoa — uwezekano wa maambukizi ya figo, ambayo yanaweza kuharibu figo ikiwa hayatibiwi haraka',
        sw_mtaa: 'Homa na maumivu ya ubavu au mgongo na kuwaka unapokojoa — uwezekano wa maambukizi ya figo, ambayo yanaweza kuharibu figo ikiwa hayatibiwi haraka',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'A new eGFR result that has dropped sharply from your usual level, or a creatinine that has risen quickly — bring it to your clinician promptly',
        sw: 'Matokeo mapya ya eGFR ambayo yameshuka sana kutoka kiwango chako cha kawaida, au creatinine iliyopanda haraka — yalete kwa daktari wako haraka',
        sw_mtaa: 'Matokeo mapya ya eGFR ambayo yameshuka sana kutoka kiwango chako cha kawaida, au creatinine iliyopanda haraka — yalete kwa daktari haraka',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Worsening tiredness, breathlessness on mild activity, or looking very pale — possible anaemia of CKD that should be checked and treated',
        sw: 'Uchovu unaozidi, kushindwa kupumua kwa shughuli ndogo, au kuonekana rangi nyeupe sana — uwezekano wa upungufu wa damu wa CKD unaopaswa kuangaliwa na kutibiwa',
        sw_mtaa: 'Uchovu unaozidi, kushindwa kupumua kwa shughuli ndogo, au kuonekana rangi nyeupe sana — uwezekano wa upungufu wa damu wa CKD unaopaswa kuangaliwa na kutibiwa',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Persistent nausea, loss of appetite, a metallic taste, or itching all over — symptoms of advancing CKD that should be reviewed at your next visit',
        sw: 'Kichefuchefu cha kudumu, kupoteza hamu ya kula, ladha ya chuma, au kuwashwa mwili mzima — dalili za CKD inayoendelea zinazopaswa kupitiwa katika ziara yako inayofuata',
        sw_mtaa: 'Kichefuchefu cha kudumu, kupoteza hamu ya kula, ladha ya chuma, au kuwashwa mwili mzima — dalili za CKD inayoendelea zinazopaswa kupitiwa katika ziara yako inayofuata',
      },
      urgency: 'soon' as UrgencyLevel,
    },
  ],

  variants: CKD_VARIANTS,

  comorbidityNotes: [
    {
      coCondition: 'diabetes',
      note: {
        en: 'Diabetes is the leading cause of CKD. High blood sugar over years damages the kidney filters (diabetic kidney disease). The two conditions must be managed together: tight blood sugar and blood pressure control, regular eGFR and urine protein checks, and kidney-protective medicines. Some diabetes medicines need dose adjustment as kidney function falls, and a few are avoided in advanced CKD — your clinician will manage this. See the diabetes guidance for blood sugar self-management.',
        sw: 'Kisukari ni sababu kuu ya CKD. Sukari ya juu ya damu kwa miaka huharibu vichujio vya figo (ugonjwa wa figo wa kisukari). Hali hizo mbili lazima zisimamiwe pamoja: udhibiti madhubuti wa sukari na shinikizo la damu, ukaguzi wa mara kwa mara wa eGFR na protini ya mkojo, na dawa za kulinda figo. Baadhi ya dawa za kisukari zinahitaji marekebisho ya dose kadri utendaji wa figo unavyoshuka, na chache huepukwa katika CKD ya juu — daktari wako atasimamia hili. Ona muongozo wa kisukari kwa usimamizi binafsi wa sukari ya damu.',
        sw_mtaa: 'Kisukari ni sababu kuu ya CKD. Sukari ya juu kwa miaka inaharibu vichujio vya figo (diabetic kidney disease). Hali hizo mbili lazima zisimamiwe pamoja: udhibiti madhubuti wa sukari na presha, ukaguzi wa mara kwa mara wa eGFR na protini ya mkojo, na dawa za kulinda figo. Baadhi ya dawa za kisukari zinahitaji marekebisho ya dose kadri kazi ya figo inavyoshuka, na chache zinaepukwa katika CKD ya juu — daktari atasimamia hili. Ona muongozo wa kisukari kwa usimamizi wa sukari.',
      },
    },
    {
      coCondition: 'hypertension',
      note: {
        en: 'High blood pressure both causes CKD and is worsened by it — a two-way cycle. Blood pressure control is the single most powerful way to slow CKD for most people. Take blood pressure medicines daily, reduce salt, and keep every appointment. Your clinician may choose medicines that both lower pressure and directly protect the kidneys. See the hypertension guidance for blood pressure self-management.',
        sw: 'Shinikizo la juu la damu husababisha CKD na pia huzidishwa nayo — mzunguko wa pande mbili. Udhibiti wa shinikizo la damu ni njia moja yenye nguvu zaidi ya kupunguza kasi ya CKD kwa watu wengi. Tumia dawa za shinikizo la damu kila siku, punguza chumvi, na weka kila miadi. Daktari wako anaweza kuchagua dawa zinazoshusha shinikizo na kulinda figo moja kwa moja. Ona muongozo wa shinikizo la damu kwa usimamizi binafsi.',
        sw_mtaa: 'Presha ya juu inasababisha CKD na pia inazidishwa nayo — mzunguko wa pande mbili. Udhibiti wa presha ni njia moja yenye nguvu zaidi ya kupunguza kasi ya CKD kwa watu wengi. Tumia dawa za presha kila siku, punguza chumvi, na weka kila miadi. Daktari anaweza kuchagua dawa zinazoshusha presha na kulinda figo moja kwa moja. Ona muongozo wa presha kwa usimamizi binafsi.',
      },
    },
    {
      coCondition: 'hiv',
      note: {
        en: 'HIV and CKD intersect in a few ways: HIV itself can affect the kidneys, some kidney problems are linked to HIV, and kidney function guides ART choices — the tenofovir in TLD is processed by the kidneys, so eGFR is monitored and the regimen may be reviewed if kidney function falls significantly. Co-trimoxazole and some other medicines also need attention in CKD. The key practical point: HIV care and kidney care must be coordinated — make sure your HIV clinic knows your kidney numbers and your kidney care knows your ART. See the HIV guidance for ART self-management.',
        sw: 'VVU na CKD hukutana kwa njia chache: VVU yenyewe inaweza kuathiri figo, baadhi ya matatizo ya figo yanahusiana na VVU, na utendaji wa figo huongoza chaguo za ART — tenofovir iliyo katika TLD huchakatwa na figo, hivyo eGFR hufuatiliwa na regimen inaweza kupitiwa ikiwa utendaji wa figo unashuka sana. Co-trimoxazole na dawa zingine pia zinahitaji uangalifu katika CKD. Jambo muhimu la kivitendo: huduma ya VVU na huduma ya figo lazima ziratibiwe — hakikisha kliniki yako ya VVU inajua namba zako za figo na huduma yako ya figo inajua ART yako. Ona muongozo wa VVU kwa usimamizi binafsi wa ART.',
        sw_mtaa: 'VVU na CKD zinakutana kwa njia chache: VVU yenyewe inaweza kuathiri figo, baadhi ya matatizo ya figo yanahusiana na VVU, na kazi ya figo inaongoza chaguo za ART — tenofovir iliyo katika TLD inachakatwa na figo, hivyo eGFR inafuatiliwa na regimen inaweza kupitiwa ikiwa kazi ya figo inashuka sana. Co-trimoxazole na dawa zingine pia zinahitaji uangalifu katika CKD. Jambo muhimu: huduma ya VVU na huduma ya figo lazima ziratibiwe — hakikisha kliniki yako ya VVU inajua namba zako za figo na huduma yako ya figo inajua ART yako. Ona muongozo wa VVU kwa usimamizi wa ART.',
      },
    },
    {
      coCondition: 'tb',
      note: {
        en: 'TB and CKD can occur together, and CKD (especially advanced CKD and dialysis) somewhat weakens immunity, raising TB risk. Importantly, several TB medicines need dose adjustment in significant CKD — the standard TB regimen is still used, but doses and dosing intervals may change, and in dialysis some doses are timed around dialysis sessions. Never adjust TB medicine yourself — but do make sure whoever manages your TB knows your kidney function. See the TB guidance for TB treatment self-management.',
        sw: 'TB na CKD vinaweza kutokea pamoja, na CKD (hasa CKD ya juu na dialysis) hudhoofisha kidogo kinga, kuongeza hatari ya TB. Muhimu, dawa kadhaa za TB zinahitaji marekebisho ya dose katika CKD kubwa — regimen ya kawaida ya TB bado hutumika, lakini dose na vipindi vya dose vinaweza kubadilika, na katika dialysis baadhi ya dose hupangwa kuzunguka vipindi vya dialysis. Kamwe usirekebishe dawa ya TB mwenyewe — lakini hakikisha yeyote anayesimamia TB yako anajua utendaji wako wa figo. Ona muongozo wa TB kwa usimamizi binafsi wa matibabu ya TB.',
        sw_mtaa: 'TB na CKD zinaweza kutokea pamoja, na CKD (hasa CKD ya juu na dialysis) inadhoofisha kidogo kinga, inaongeza hatari ya TB. Muhimu, dawa kadhaa za TB zinahitaji marekebisho ya dose katika CKD kubwa — regimen ya kawaida ya TB bado inatumika, lakini dose na vipindi vya dose vinaweza kubadilika, na katika dialysis baadhi ya dose zinapangwa kuzunguka vipindi vya dialysis. Kamwe usirekebishe dawa ya TB mwenyewe — lakini hakikisha yeyote anayesimamia TB yako anajua kazi yako ya figo. Ona muongozo wa TB kwa usimamizi wa matibabu ya TB.',
      },
    },
    {
      coCondition: 'heart_disease',
      note: {
        en: 'CKD and heart disease are deeply linked — they share causes (high blood pressure, diabetes) and each worsens the other. In fact, most people with CKD are more likely to develop heart disease than to reach kidney failure. The same steps protect both organs: blood pressure and blood sugar control, not smoking, staying active, a healthy weight, and managing cholesterol as your clinician advises. Fluid balance matters for both — too much fluid strains the heart, and the heart and kidneys constantly affect each other. Caring for your kidneys IS caring for your heart, and vice versa.',
        sw: 'CKD na ugonjwa wa moyo vimeunganishwa kwa kina — hushiriki sababu (shinikizo la juu la damu, kisukari) na kila kimoja huzidisha kingine. Kwa kweli, watu wengi wenye CKD wana uwezekano mkubwa wa kupata ugonjwa wa moyo kuliko kufikia figo kushindwa. Hatua zile zile hulinda viungo vyote viwili: udhibiti wa shinikizo la damu na sukari ya damu, kutovuta sigara, kukaa hai, uzito wenye afya, na kusimamia lehemu kama daktari wako anavyoshauri. Uwiano wa maji ni muhimu kwa vyote — maji mengi sana hukaza moyo, na moyo na figo huathiriana daima. Kutunza figo zako NI kutunza moyo wako, na kinyume chake.',
        sw_mtaa: 'CKD na ugonjwa wa moyo vimeunganishwa kwa kina — vinashiriki sababu (presha ya juu, kisukari) na kila kimoja kinazidisha kingine. Kwa kweli, watu wengi wenye CKD wana uwezekano mkubwa wa kupata ugonjwa wa moyo kuliko kufikia figo kushindwa. Hatua zile zile zinalinda viungo vyote viwili: udhibiti wa presha na sukari, kutovuta sigara, kukaa hai, uzito mzuri, na kusimamia lehemu kama daktari anavyoshauri. Uwiano wa maji ni muhimu kwa vyote — maji mengi sana yanakaza moyo, na moyo na figo vinaathiriana daima. Kutunza figo zako NI kutunza moyo wako, na kinyume chake.',
      },
    },
    {
      coCondition: 'anaemia',
      note: {
        en: 'Anaemia — too few healthy red blood cells — is common as CKD advances, because healthy kidneys produce a hormone that tells the body to make red cells, and that signal weakens as kidney function falls. Anaemia of CKD causes tiredness, breathlessness, and looking pale, and it adds strain to the heart. It is checkable with a simple blood count and treatable — your clinician may look at iron levels and, in more advanced CKD, use specific treatments. If you have CKD and are increasingly tired or breathless, ask to have your blood count checked rather than assuming it is "just" the kidney disease.',
        sw: 'Upungufu wa damu — chembe nyekundu chache za damu zenye afya — ni wa kawaida kadri CKD inavyoendelea, kwa sababu figo zenye afya hutengeneza homoni inayoambia mwili kutengeneza chembe nyekundu, na ishara hiyo hudhoofika kadri utendaji wa figo unavyoshuka. Upungufu wa damu wa CKD husababisha uchovu, kushindwa kupumua, na kuonekana rangi nyeupe, na huongeza mzigo kwa moyo. Unaweza kuangaliwa kwa hesabu rahisi ya damu na unatibika — daktari wako anaweza kuangalia viwango vya madini ya chuma na, katika CKD ya juu zaidi, kutumia matibabu maalum. Ikiwa una CKD na unazidi kuchoka au kushindwa kupumua, omba kuangaliwa hesabu yako ya damu badala ya kudhani ni "tu" ugonjwa wa figo.',
        sw_mtaa: 'Upungufu wa damu — chembe nyekundu chache za damu zenye afya — ni wa kawaida kadri CKD inavyoendelea, kwa sababu figo zenye afya zinatengeneza homoni inayoambia mwili utengeneze chembe nyekundu, na ishara hiyo inadhoofika kadri kazi ya figo inavyoshuka. Upungufu wa damu wa CKD unasababisha uchovu, kushindwa kupumua, na kuonekana rangi nyeupe, na unaongeza mzigo kwa moyo. Unaweza kuangaliwa kwa hesabu rahisi ya damu na unatibika — daktari anaweza kuangalia viwango vya madini ya chuma na, katika CKD ya juu zaidi, kutumia matibabu maalum. Ikiwa una CKD na unazidi kuchoka au kushindwa kupumua, omba kuangaliwa hesabu yako ya damu badala ya kudhani ni "tu" ugonjwa wa figo.',
      },
    },
  ],

  sources: [
    src('KDIGO_CKD_2024'),
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
