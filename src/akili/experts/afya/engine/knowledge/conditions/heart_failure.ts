/**
 * Heart Failure — Full Condition Knowledge (Phase 11)
 *
 * Sources: ESC Heart Failure 2023 (via WHO HEARTS adaptation), WHO PEN 2020,
 *          NTLG STG 2023, Muhimbili Protocols, WHO HEARTS 2023,
 *          NACP_ART 2024 (HIV cardiomyopathy), MOH_TZ_MATERNAL_2024 (PPCM).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Tanzania-specific framing:
 *   HF in Tanzania is NOT primarily an ischaemic disease (unlike Europe/US).
 *   The dominant drivers are:
 *     • Hypertensive heart disease (#1) — long-standing untreated HTN
 *     • Rheumatic heart disease (RHD) — still endemic, mitral/aortic valves
 *     • HIV cardiomyopathy — dilated, often in young adults
 *     • Post-partum cardiomyopathy (PPCM) — within 5 months of delivery
 *     • Cor pulmonale — from chronic lung disease (cross-ref Phase 10)
 *     • Endomyocardial fibrosis — tropical-restrictive
 *     • Ischaemic HF — increasing but not yet dominant
 *
 * Coverage (variants embedded as sub-presentations):
 *   • HFrEF (reduced ejection fraction)
 *   • HFpEF (preserved ejection fraction)
 *   • Acute decompensated heart failure
 *   • Post-partum cardiomyopathy
 *   • Rheumatic heart disease HF
 *   • HIV cardiomyopathy
 *
 * SCOPE: Educate on what HF is, why salt/fluid matter, the foundation-four
 * drug classes, when to come urgently, post-partum red flags. We do NOT
 * prescribe doses.
 */

import { ConditionKnowledge } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { HEART_FAILURE_VARIANTS } from './heart_failure.variants';

export const HEART_FAILURE: ConditionKnowledge = {
  id: 'heart_failure',
  aliases: CONDITION_ALIASES.heart_failure,
  category: 'cardiovascular',

  whatItIs: {
    en: 'Heart failure means the heart cannot pump enough blood to meet the body\'s needs — either because the muscle is too weak to squeeze (HFrEF, reduced ejection fraction), too stiff to fill (HFpEF, preserved ejection fraction), or because a valve is leaking or narrowed. In Tanzania the most common causes are long-standing untreated high blood pressure, rheumatic heart disease (damage from childhood strep infection), HIV-related cardiomyopathy, and post-partum cardiomyopathy in mothers within five months of delivery. Symptoms come from fluid backing up: breathlessness (especially lying flat), waking gasping at night, swollen ankles, fatigue, and weight gain from retained fluid. Heart failure is a chronic disease but very treatable — patients on the right combination of medicines, with attention to salt, fluid, and weight, live for years with good quality of life.',
    sw: 'Kushindwa kwa moyo kunamaanisha moyo hauwezi kusukuma damu ya kutosha kufikia mahitaji ya mwili — ama kwa sababu misuli ni dhaifu sana kukamua (HFrEF, ejection fraction iliyopungua), imekauka sana kujaa (HFpEF, ejection fraction iliyohifadhiwa), au kwa sababu valve inavuja au imebanwa. Tanzania sababu za kawaida zaidi ni shinikizo la juu la damu lisilotibika kwa muda mrefu, ugonjwa wa moyo wa rheumatic (uharibifu kutoka maambukizi ya strep ya utotoni), cardiomyopathy inayohusiana na VVU, na cardiomyopathy ya baada ya kuzaa kwa akina mama ndani ya miezi mitano baada ya kujifungua. Dalili huja kutoka maji yanayorudi nyuma: kushindwa kupumua (hasa kulala chini), kuamka ukikorota usiku, vifundo vilivyovimba, uchovu, na kuongezeka uzito kutoka maji yaliyobaki. Kushindwa kwa moyo ni ugonjwa sugu lakini unatibika sana — wagonjwa wenye mchanganyiko sahihi wa dawa, na umakini kwa chumvi, maji, na uzito, huishi kwa miaka mingi na ubora mzuri wa maisha.',
    sw_mtaa: 'Heart failure inamaanisha moyo hauwezi kusukuma damu ya kutosha kumeet body\'s needs — ama kwa sababu muscle ni weak sana kusqueeze (HFrEF, reduced ejection fraction), stiff sana kujaa (HFpEF, preserved ejection fraction), au kwa sababu valve inaleak au imebanwa. Tanzania most common causes ni long-standing untreated high BP, rheumatic heart disease (damage kutoka childhood strep infection), HIV cardiomyopathy, na post-partum cardiomyopathy kwa akina mama ndani ya miezi 5 baada ya kujifungua. Symptoms zinakuja kutoka fluid kurudi nyuma: breathlessness (especially kulala flat), kuamka gasping usiku, swollen ankles, fatigue, na weight gain kutoka retained fluid. Heart failure ni chronic disease lakini very treatable — wagonjwa kwenye right combination ya medicines, na attention kwa salt, fluid, na weight, wanaishi miaka mingi na good quality of life.',
  },

  whyItMatters: {
    en: 'Heart failure in Tanzania often presents late — by the time a patient cannot lie flat or wakes gasping at night, the disease has been working in the background for months. Three points carry the weight. First, every untreated case of high blood pressure is a future heart failure — controlling BP is the single most powerful prevention. Second, the foundation drugs (ACE-inhibitor or ARB, beta-blocker, mineralocorticoid receptor antagonist, and where available SGLT2 inhibitor) extend life and reduce hospitalisations measurably — missing doses is not a minor matter. Third, post-partum cardiomyopathy can present as breathlessness easily mistaken for "normal recovery from childbirth" — but PPCM kills mothers if missed. Any new mother who is more breathless at 6 weeks than at 6 days needs urgent assessment.',
    sw: 'Kushindwa kwa moyo Tanzania mara nyingi hujitokeza marehemu — wakati mgonjwa hawezi kulala chini au anaamka akikorota usiku, ugonjwa umekuwa ukifanya kazi nyuma kwa miezi. Mambo matatu hubeba uzito. Kwanza, kila kesi ya shinikizo la juu lisilotibika ni kushindwa kwa moyo siku zijazo — kudhibiti BP ni kinga moja yenye nguvu zaidi. Pili, dawa za msingi (ACE-inhibitor au ARB, beta-blocker, mineralocorticoid receptor antagonist, na pale inapopatikana SGLT2 inhibitor) huongeza maisha na kupunguza kulazwa hospitalini kwa namna inayopimika — kukosa dose si jambo dogo. Tatu, cardiomyopathy ya baada ya kuzaa inaweza kujitokeza kama kushindwa kupumua kunakohesabiwa kirahisi kama "kupona kwa kawaida baada ya kujifungua" — lakini PPCM huua akina mama ikipuuzwa. Mama yeyote mpya ambaye anashindwa kupumua zaidi katika wiki 6 kuliko katika siku 6 anahitaji tathmini ya haraka.',
    sw_mtaa: 'Heart failure Tanzania mara nyingi inapresent late — by the time patient hawezi kulala flat au anaamka gasping usiku, disease imekuwa working katika background kwa miezi. Mambo matatu yanabeba uzito. Kwanza, kila untreated case ya high BP ni future heart failure — kucontrol BP ni single most powerful prevention. Pili, foundation drugs (ACE-inhibitor au ARB, beta-blocker, mineralocorticoid receptor antagonist, na pale inapopatikana SGLT2 inhibitor) zinaextend maisha na kureduce hospitalisations measurably — kumiss doses sio minor matter. Tatu, post-partum cardiomyopathy inaweza kupresent kama breathlessness inayoeasily mistaken kuwa "normal recovery from childbirth" — lakini PPCM inaua akina mama if missed. Mama yeyote mpya ambaye ana more breathless katika weeks 6 kuliko katika siku 6 anahitaji urgent assessment.',
  },

  commonQuestions: [
    {
      q: { en: 'What is heart failure?', sw: 'Kushindwa kwa moyo ni nini?' },
      a: {
        en: 'Heart failure does not mean the heart has stopped — it means the heart is not pumping or filling as well as it should. The body responds by holding onto salt and water, which is why patients with heart failure develop ankle swelling, breathlessness when lying flat, and weight gain. The two big types are HFrEF (the heart muscle is weak — ejection fraction below 40%) and HFpEF (the heart squeezes well but cannot relax to fill properly — ejection fraction preserved). The treatment ladder is different between the two, which is why echocardiography (looking at the heart with ultrasound) is important.',
        sw: 'Kushindwa kwa moyo hakumaanishi moyo umesimama — kunamaanisha moyo haupampu au haujai kama unavyopaswa. Mwili hujibu kwa kushikilia chumvi na maji, ndiyo maana wagonjwa wa kushindwa kwa moyo hupata uvimbe wa vifundo, kushindwa kupumua kulala chini, na kuongezeka uzito. Aina mbili kubwa ni HFrEF (misuli ya moyo ni dhaifu — ejection fraction chini ya 40%) na HFpEF (moyo unakamua vyema lakini hauwezi kupumzika kujaa vizuri — ejection fraction imehifadhiwa). Ngazi ya matibabu ni tofauti kati ya hizo mbili, ndiyo maana echocardiography (kuangalia moyo kwa ultrasound) ni muhimu.',
        sw_mtaa: 'Heart failure haimaanishi moyo umestop — inamaanisha moyo haupump au haufill as well as unavyopaswa. Body inarespond kwa kushikilia salt na water, ndiyo maana wagonjwa wa heart failure wanapata ankle swelling, breathlessness kulala flat, na weight gain. Two big types ni HFrEF (heart muscle ni weak — ejection fraction chini ya 40%) na HFpEF (heart inasqueeze vyema lakini haiwezi kurelax kujaa properly — ejection fraction preserved). Treatment ladder ni tofauti kati ya hizo mbili, ndiyo maana echocardiography (kuangalia moyo na ultrasound) ni muhimu.',
      },
    },
    {
      q: { en: 'What causes heart failure in Tanzania?', sw: 'Kushindwa kwa moyo Tanzania husababishwa na nini?' },
      a: {
        en: 'In Tanzania the leading cause is long-standing untreated high blood pressure (hypertensive heart disease). Second is rheumatic heart disease — damage to the heart valves from a streptococcal throat infection in childhood that was not treated. Third is HIV-related cardiomyopathy, which can occur even on ART. Fourth is post-partum cardiomyopathy, where the heart muscle weakens in the last month of pregnancy or first five months after delivery. Fifth is cor pulmonale, where chronic lung disease (COPD, post-TB lung damage) backs up pressure into the right side of the heart. Ischaemic heart failure (from heart attacks and coronary disease) is rising but still less common than in Europe or the US.',
        sw: 'Tanzania sababu kuu ni shinikizo la juu la damu lisilotibika kwa muda mrefu (ugonjwa wa moyo wa shinikizo). Ya pili ni ugonjwa wa moyo wa rheumatic — uharibifu wa valve za moyo kutoka maambukizi ya strep ya koo katika utoto yasiyotibiwa. Ya tatu ni cardiomyopathy inayohusiana na VVU, ambayo inaweza kutokea hata kwenye ART. Ya nne ni cardiomyopathy ya baada ya kuzaa, ambapo misuli ya moyo hudhoofika katika mwezi wa mwisho wa mimba au miezi mitano ya kwanza baada ya kujifungua. Ya tano ni cor pulmonale, ambapo ugonjwa sugu wa mapafu (COPD, uharibifu wa mapafu baada ya TB) hurudisha shinikizo kwenye upande wa kulia wa moyo. Kushindwa kwa moyo kwa ischaemic (kutoka mashambulizi ya moyo na ugonjwa wa coronary) inaongezeka lakini bado ni nadra kuliko Ulaya au Marekani.',
        sw_mtaa: 'Tanzania leading cause ni long-standing untreated high blood pressure (hypertensive heart disease). Second ni rheumatic heart disease — damage to heart valves kutoka streptococcal throat infection katika childhood ambayo haikutibiwa. Third ni HIV-related cardiomyopathy, ambayo inaweza kutokea hata on ART. Fourth ni post-partum cardiomyopathy, ambapo heart muscle inaweaken katika last month ya pregnancy au first five months baada ya delivery. Fifth ni cor pulmonale, ambapo chronic lung disease (COPD, post-TB lung damage) inabacks up pressure kwenye right side ya heart. Ischaemic heart failure (kutoka heart attacks na coronary disease) inaongezeka lakini bado ni less common kuliko Europe au US.',
      },
    },
    {
      q: { en: 'Why am I more breathless lying down than sitting up?', sw: 'Kwa nini ninashindwa kupumua zaidi nikilala kuliko nikikaa?' },
      a: {
        en: 'This symptom — called orthopnoea — is one of the most specific signs of heart failure. When you lie flat, the fluid that was pooled in your legs during the day shifts back into the chest, increasing the load on a failing heart. Many patients with heart failure end up sleeping propped up on two or three pillows, or even sitting in a chair. A related symptom is paroxysmal nocturnal dyspnoea — waking up suddenly at night gasping for air after a couple of hours of sleep. Both symptoms warrant urgent clinical assessment because they signal worsening heart failure that may need treatment intensification.',
        sw: 'Dalili hii — inayoitwa orthopnoea — ni mojawapo ya ishara maalum zaidi za kushindwa kwa moyo. Unapolala chini, maji yaliyokusanyika miguuni mwako wakati wa mchana hurudi kwenye kifua, kuongeza mzigo kwa moyo unaoshindwa. Wagonjwa wengi wa kushindwa kwa moyo hulala wameinuliwa juu kwenye mito miwili au mitatu, au hata wamekaa kwenye kiti. Dalili inayohusiana ni paroxysmal nocturnal dyspnoea — kuamka ghafla usiku ukikorota baada ya masaa kadhaa ya kulala. Dalili zote mbili zinahitaji tathmini ya haraka ya kliniki kwa sababu zinaashiria kushindwa kwa moyo kunakozidi ambacho kinaweza kuhitaji kuongeza matibabu.',
        sw_mtaa: 'Symptom hii — inaitwa orthopnoea — ni mojawapo ya most specific signs za heart failure. Unapolala flat, fluid iliyokuwa pooled katika legs zako during the day inashift back kwenye chest, kuongeza load kwa failing heart. Wagonjwa wengi wa heart failure wana-end up wakilala propped up kwenye pillows mbili au tatu, au hata wakikaa kwenye chair. Related symptom ni paroxysmal nocturnal dyspnoea — kuamka suddenly usiku gasping for air baada ya masaa kadhaa ya sleep. Symptoms zote mbili zinawarrant urgent clinical assessment kwa sababu zinasignal worsening heart failure inayoweza kuhitaji treatment intensification.',
      },
    },
    {
      q: { en: 'I just had a baby and feel very breathless — could it be my heart?', sw: 'Nimezaa hivi karibuni na ninashindwa kupumua sana — inaweza kuwa moyo wangu?' },
      a: {
        en: 'YES — this is exactly what we worry about. Post-partum cardiomyopathy (PPCM) is heart failure that develops in the last month of pregnancy or the first five months after delivery. The symptoms are easily mistaken for normal post-delivery fatigue: breathlessness, swollen ankles, tiredness, sometimes a cough. The clue is that things get WORSE rather than better as the weeks go by. A new mother who is more breathless at 6 weeks postpartum than at 6 days postpartum needs urgent assessment with an examination, ECG, chest X-ray, and echocardiogram. PPCM can be life-threatening but is also one of the most reversible forms of heart failure — about half of mothers recover heart function fully with prompt treatment. Future pregnancies need cardiology counselling because the risk of recurrence is high.',
        sw: 'NDIO — hii ndio tunayoogopa hasa. Cardiomyopathy ya baada ya kuzaa (PPCM) ni kushindwa kwa moyo kunakojitokeza katika mwezi wa mwisho wa mimba au miezi mitano ya kwanza baada ya kujifungua. Dalili huhesabiwa kirahisi kama uchovu wa kawaida baada ya kujifungua: kushindwa kupumua, vifundo vilivyovimba, uchovu, wakati mwingine kikohozi. Ishara ni kwamba mambo huwa MABAYA badala ya mazuri kadiri wiki zinavyopita. Mama mpya ambaye anashindwa kupumua zaidi katika wiki 6 baada ya kuzaa kuliko katika siku 6 baada ya kuzaa anahitaji tathmini ya haraka na uchunguzi, ECG, X-ray ya kifua, na echocardiogram. PPCM inaweza kutishia maisha lakini pia ni mojawapo ya aina za kushindwa kwa moyo zinazoweza kurudi zaidi — karibu nusu ya akina mama hupona utendaji wa moyo kabisa na matibabu ya haraka. Mimba za baadaye zinahitaji ushauri wa cardiology kwa sababu hatari ya kurudia ni kubwa.',
        sw_mtaa: 'YES — hii ndio tunayoogopa exactly. Post-partum cardiomyopathy (PPCM) ni heart failure inayodevelopa katika last month ya pregnancy au first five months baada ya delivery. Symptoms zinaeasily mistaken kuwa normal post-delivery fatigue: breathlessness, swollen ankles, tiredness, wakati mwingine cough. Clue ni kwamba mambo yanaWORSE badala ya better kadiri weeks zinavyopita. New mother ambaye ana more breathless katika weeks 6 postpartum kuliko katika siku 6 postpartum anahitaji urgent assessment na examination, ECG, chest X-ray, na echocardiogram. PPCM inaweza ku-life-threatening lakini pia ni mojawapo ya most reversible forms za heart failure — karibu half ya mothers wanarecover heart function fully na prompt treatment. Future pregnancies zinahitaji cardiology counselling kwa sababu risk ya recurrence ni high.',
      },
    },
    {
      q: { en: 'What is the "foundation four" treatment?', sw: 'Matibabu ya "foundation four" ni nini?' },
      a: {
        en: 'For HFrEF (heart failure with reduced ejection fraction), four drug classes form the foundation of treatment, started in low doses and titrated up: (1) ACE inhibitor (enalapril, lisinopril) or ARB (losartan) — relaxes blood vessels, reduces strain on the heart; (2) Beta-blocker (carvedilol, bisoprolol, metoprolol succinate) — slows the heart and lets it pump more efficiently; (3) MRA (spironolactone or eplerenone) — blocks aldosterone, reduces fluid retention and remodelling; (4) SGLT2 inhibitor (dapagliflozin, empagliflozin) — added in modern guidelines, helps the heart and protects the kidneys. In HFpEF (preserved ejection fraction) the foundation is mainly SGLT2 inhibitor plus treatment of underlying conditions (hypertension, diabetes). All four foundation drugs extend life and reduce hospitalisations — they are not optional.',
        sw: 'Kwa HFrEF (kushindwa kwa moyo na ejection fraction iliyopungua), madarasa manne ya dawa hutengeneza msingi wa matibabu, yanayoanzishwa kwa dose za chini na kupandishwa: (1) ACE inhibitor (enalapril, lisinopril) au ARB (losartan) — hupumzisha mishipa ya damu, hupunguza mfadhaiko kwenye moyo; (2) Beta-blocker (carvedilol, bisoprolol, metoprolol succinate) — hupunguza kasi ya moyo na kuruhusu uupampu kwa ufanisi zaidi; (3) MRA (spironolactone au eplerenone) — huzuia aldosterone, hupunguza kuhifadhi maji na remodelling; (4) SGLT2 inhibitor (dapagliflozin, empagliflozin) — imeongezwa katika miongozo ya kisasa, husaidia moyo na kulinda figo. Katika HFpEF (ejection fraction iliyohifadhiwa) msingi ni hasa SGLT2 inhibitor pamoja na matibabu ya hali za msingi (shinikizo la juu la damu, kisukari). Dawa zote nne za msingi huongeza maisha na kupunguza kulazwa hospitalini — sio hiari.',
        sw_mtaa: 'Kwa HFrEF (heart failure na reduced ejection fraction), four drug classes zinaform foundation ya treatment, started katika low doses na titrated up: (1) ACE inhibitor (enalapril, lisinopril) au ARB (losartan) — inarelax blood vessels, inareduce strain kwenye heart; (2) Beta-blocker (carvedilol, bisoprolol, metoprolol succinate) — inaslow heart na kuruhusu kupump more efficiently; (3) MRA (spironolactone au eplerenone) — inablock aldosterone, inareduce fluid retention na remodelling; (4) SGLT2 inhibitor (dapagliflozin, empagliflozin) — added katika modern guidelines, inasaidia heart na kuprotect kidneys. Katika HFpEF (preserved ejection fraction) foundation ni mainly SGLT2 inhibitor plus treatment ya underlying conditions (hypertension, diabetes). All four foundation drugs zinaextend life na zinareduce hospitalisations — sio optional.',
      },
    },
    {
      q: { en: 'How much salt and water can I have?', sw: 'Naweza kula chumvi na kunywa maji kiasi gani?' },
      a: {
        en: 'Salt restriction matters more than fluid restriction in most heart failure. Aim for less than 2 grams of sodium per day — that means no added salt at the table, avoid processed foods, avoid stock cubes and seasoning powders, and watch out for hidden salt in bread, biscuits, and prepared sauces. For fluid, most stable heart failure patients do not need strict restriction, but during a flare or with advanced disease, 1.5-2 litres per day is usually recommended. The single most important home measurement is your weight — weigh yourself each morning after passing urine, before breakfast, in the same clothing. A gain of more than 2 kg in 3 days means fluid is building up and you should contact your clinic.',
        sw: 'Kupunguza chumvi ni muhimu zaidi kuliko kupunguza maji katika kushindwa kwa moyo nyingi. Lenga chini ya gramu 2 za sodium kwa siku — hiyo inamaanisha bila kuongeza chumvi mezani, epuka vyakula vilivyochakatwa, epuka stock cubes na unga wa kuongeza ladha, na angalia chumvi iliyofichwa katika mkate, biskuti, na michuzi iliyoandaliwa. Kwa maji, wagonjwa wengi wa kushindwa kwa moyo thabiti hawahitaji kizuizi kikali, lakini wakati wa mlipuko au na ugonjwa wa hali ya juu, lita 1.5-2 kwa siku kawaida hupendekezwa. Kipimo muhimu zaidi nyumbani ni uzito wako — jipime kila asubuhi baada ya kutoa mkojo, kabla ya kifungua kinywa, kwa nguo hizo hizo. Kuongezeka kwa zaidi ya kilo 2 katika siku 3 kunamaanisha maji yanajenga na unapaswa kuwasiliana na kliniki yako.',
        sw_mtaa: 'Salt restriction inamatter zaidi kuliko fluid restriction katika most heart failure. Lenga less than 2 grams ya sodium kwa siku — hiyo inamaanisha hakuna added salt mezani, epuka processed foods, epuka stock cubes na seasoning powders, na watch out kwa hidden salt katika bread, biscuits, na prepared sauces. Kwa fluid, most stable heart failure patients hawahitaji strict restriction, lakini wakati wa flare au na advanced disease, 1.5-2 litres kwa siku kawaida zinarecommended. Single most important home measurement ni weight yako — jipime kila asubuhi baada ya kupass urine, before breakfast, katika same clothing. Gain ya more than 2 kg katika siku 3 inamaanisha fluid inajenga na unapaswa kucontact clinic yako.',
      },
    },
    {
      q: { en: 'What is rheumatic heart disease?', sw: 'Ugonjwa wa moyo wa rheumatic ni nini?' },
      a: {
        en: 'Rheumatic heart disease (RHD) is heart valve damage left behind after one or more episodes of rheumatic fever — an inflammatory reaction to a streptococcal throat infection in childhood. The body\'s immune response, instead of just attacking the strep bacteria, also attacks the heart valves, scarring them so they no longer open or close properly. The mitral valve is most commonly affected, sometimes the aortic valve. RHD has been almost eliminated in Europe and the US but remains common in Tanzania because untreated strep throats in childhood are still common. Prevention is treating any sore throat that could be streptococcal with penicillin, and giving long-term penicillin prophylaxis to anyone who has had rheumatic fever. Established valve damage may need valve repair or replacement surgery.',
        sw: 'Ugonjwa wa moyo wa rheumatic (RHD) ni uharibifu wa valve za moyo uliobaki baada ya kipindi kimoja au zaidi cha homa ya rheumatic — mwitikio wa uvimbe kwa maambukizi ya strep ya koo katika utoto. Mwitikio wa kinga ya mwili, badala ya kushambulia tu bakteria ya strep, hushambulia pia valve za moyo, ukizifanya kovu ili zisifunguke au kufunga vyema tena. Valve ya mitral huathirika zaidi, wakati mwingine valve ya aortic. RHD imeondolewa karibu kabisa Ulaya na Marekani lakini inabaki ya kawaida Tanzania kwa sababu strep za koo zisizotibiwa katika utoto bado ni za kawaida. Kinga ni kutibu koo lolote la maumivu linaloweza kuwa la streptococcal kwa penicillin, na kutoa prophylaxis ya muda mrefu ya penicillin kwa yeyote aliyewahi kuwa na homa ya rheumatic. Uharibifu wa valve uliokwisha unaweza kuhitaji upasuaji wa kurekebisha au kubadilisha valve.',
        sw_mtaa: 'Rheumatic heart disease (RHD) ni heart valve damage iliyobaki baada ya episode moja au zaidi ya rheumatic fever — inflammatory reaction kwa streptococcal throat infection katika childhood. Body\'s immune response, badala ya kushambulia tu strep bacteria, inashambulia pia heart valves, ikiziscar ili zisi-open au kufunga properly tena. Mitral valve huathirika zaidi, wakati mwingine aortic valve. RHD imekaribia kueliminated katika Europe na US lakini inabaki common Tanzania kwa sababu untreated strep throats katika childhood bado ni common. Prevention ni kutreating sore throat yoyote inayoweza kuwa streptococcal na penicillin, na kupewa long-term penicillin prophylaxis kwa yeyote aliyewahi kuwa na rheumatic fever. Established valve damage inaweza kuhitaji valve repair au replacement surgery.',
      },
    },
    {
      q: { en: 'Can HIV cause heart failure?', sw: 'VVU inaweza kusababisha kushindwa kwa moyo?' },
      a: {
        en: 'Yes. HIV-associated cardiomyopathy is a recognised cause of heart failure, especially in patients diagnosed late, with poor ART adherence, or with low CD4. The mechanism is multifactorial: direct viral effects on the heart muscle, chronic inflammation, opportunistic infections, and sometimes the long-term effects of certain ART drugs. The good news is that early ART and good adherence reduce the risk, and HIV cardiomyopathy on a patient who achieves viral suppression often improves. Any new diagnosis of heart failure in Tanzania should include HIV testing as part of the workup.',
        sw: 'Ndio. Cardiomyopathy inayohusiana na VVU ni sababu inayotambulika ya kushindwa kwa moyo, hasa kwa wagonjwa waliogundulika marehemu, na ufuasi mbaya wa ART, au na CD4 ya chini. Mfumo ni wa sababu nyingi: athari za moja kwa moja za virusi kwa misuli ya moyo, uvimbe sugu, maambukizi nyemelezi, na wakati mwingine athari za muda mrefu za dawa fulani za ART. Habari njema ni kwamba ART ya mapema na ufuasi mzuri hupunguza hatari, na cardiomyopathy ya VVU kwa mgonjwa anayepata viral suppression mara nyingi huboreka. Utambuzi wowote mpya wa kushindwa kwa moyo Tanzania unapaswa kujumuisha upimaji wa VVU kama sehemu ya uchunguzi.',
        sw_mtaa: 'Yes. HIV-associated cardiomyopathy ni recognised cause ya heart failure, especially kwa wagonjwa waliodiagnosed late, na poor ART adherence, au na low CD4. Mechanism ni multifactorial: direct viral effects kwa heart muscle, chronic inflammation, opportunistic infections, na wakati mwingine long-term effects za certain ART drugs. Good news ni kwamba early ART na good adherence zinareduce risk, na HIV cardiomyopathy kwa patient anayeachieve viral suppression mara nyingi inaimprove. New diagnosis yoyote ya heart failure Tanzania inapaswa kuinclude HIV testing kama sehemu ya workup.',
      },
    },
    {
      q: { en: 'What are the warning signs that my heart failure is getting worse?', sw: 'Ishara za onyo kwamba kushindwa kwa moyo wangu kunazidi ni zipi?' },
      a: {
        en: 'Six signs to know. (1) Weight gain of more than 2 kg in 3 days — fluid is accumulating before you notice swelling. (2) New or worsening ankle/leg swelling. (3) Needing more pillows to sleep, or waking at night gasping. (4) Breathlessness with smaller and smaller efforts (washing, dressing, walking to the toilet). (5) Persistent dry cough, especially when lying down. (6) Loss of appetite, nausea, or abdominal swelling — congestion in the liver and gut. Any of these means contact your clinic the same day. Two or more together, or any breathlessness at rest, means seek care now.',
        sw: 'Ishara sita za kujua. (1) Kuongezeka uzito kwa zaidi ya kilo 2 katika siku 3 — maji yanakusanyika kabla ya kugundua uvimbe. (2) Uvimbe mpya au unaozidi wa vifundo/miguu. (3) Kuhitaji mito zaidi kulala, au kuamka usiku ukikorota. (4) Kushindwa kupumua kwa juhudi ndogo na ndogo zaidi (kuosha, kuvaa, kutembea kwenda chooni). (5) Kikohozi kavu cha kudumu, hasa unapolala chini. (6) Kupoteza hamu, kichefuchefu, au uvimbe wa tumbo — congestion katika ini na utumbo. Yoyote ya hizi inamaanisha wasiliana na kliniki yako siku ile ile. Mbili au zaidi pamoja, au kushindwa kupumua wakati wa kupumzika, kunamaanisha tafuta huduma sasa.',
        sw_mtaa: 'Six signs za kujua. (1) Weight gain ya more than 2 kg katika siku 3 — fluid inajengeka kabla ya kunoteice swelling. (2) New au worsening ankle/leg swelling. (3) Kuhitaji more pillows kulala, au kuamka usiku gasping. (4) Breathlessness na smaller na smaller efforts (kuosha, kuvaa, kutembea kwenda toilet). (5) Persistent dry cough, especially unapolala flat. (6) Loss of appetite, nausea, au abdominal swelling — congestion katika liver na gut. Yoyote ya hizi inamaanisha contact clinic yako same day. Two au more pamoja, au breathlessness yoyote at rest, inamaanisha tafuta care sasa.',
      },
    },
    {
      q: { en: 'Can I exercise with heart failure?', sw: 'Naweza kufanya mazoezi nikiwa na kushindwa kwa moyo?' },
      a: {
        en: 'Yes — and you should. The old advice of "rest, do not strain the heart" is wrong for stable, well-treated heart failure. Regular moderate exercise (walking, gentle cycling, swimming) improves symptoms, exercise tolerance, and quality of life. The rule is to start low, go slow, and listen to the body — increasing breathlessness, chest pain, or dizziness means stop. Cardiac rehabilitation programmes, where available, give the most benefit. The patients who do worst with heart failure are not the ones who exercise too much; they are the ones who become completely sedentary, lose muscle, and then cannot do anything without becoming breathless.',
        sw: 'Ndio — na unapaswa. Ushauri wa zamani wa "pumzika, usimsumbue moyo" si sahihi kwa kushindwa kwa moyo thabiti, kunakotibiwa vyema. Mazoezi ya wastani ya kawaida (kutembea, kuendesha baiskeli kwa upole, kuogelea) huboresha dalili, uvumilivu wa mazoezi, na ubora wa maisha. Sheria ni kuanza chini, nenda polepole, na sikiliza mwili — kuongezeka kwa kushindwa kupumua, maumivu ya kifua, au kizunguzungu kunamaanisha simama. Programu za ukarabati wa moyo, pale zinapopatikana, hutoa faida zaidi. Wagonjwa wanaofanya vibaya zaidi na kushindwa kwa moyo si wale wanaofanya mazoezi mengi sana; ni wale wanaokuwa wanyamavu kabisa, hupoteza misuli, kisha hawawezi kufanya chochote bila kushindwa kupumua.',
        sw_mtaa: 'Yes — na unapaswa. Old advice ya "rest, usimstrain heart" ni wrong kwa stable, well-treated heart failure. Regular moderate exercise (kutembea, gentle cycling, swimming) inaboresha symptoms, exercise tolerance, na quality of life. Rule ni kuanza low, nenda slow, na kusikiliza body — increasing breathlessness, chest pain, au dizziness inamaanisha stop. Cardiac rehabilitation programmes, pale zinapopatikana, zinatoa most benefit. Wagonjwa wanaofanya worst na heart failure sio wale wanaoexercise too much; ni wale wanaobecome completely sedentary, wanaopoteza muscle, kisha hawawezi kufanya chochote bila kuwa breathless.',
      },
    },
    {
      q: { en: 'Will I die from heart failure?', sw: 'Nitakufa kwa kushindwa kwa moyo?' },
      a: {
        en: 'Heart failure is a serious chronic disease and yes, in advanced stages it can shorten life. But with modern treatment — the foundation four drugs, salt management, weight monitoring, vaccinations, treating underlying causes — many patients live for many years with good quality of life. The patients who do worst are the ones who stop their medicines when they feel better, eat salty foods, or do not seek care when symptoms worsen. The patients who do best stay on their full medicines forever, attend follow-up visits, weigh themselves daily, and act early when warning signs appear. Cardiology referral, where available, is appropriate for any patient with HFrEF, severe valve disease, or repeated hospital admissions.',
        sw: 'Kushindwa kwa moyo ni ugonjwa mzito sugu na ndio, katika hatua za hali ya juu kunaweza kufupisha maisha. Lakini na matibabu ya kisasa — dawa nne za msingi, usimamizi wa chumvi, ufuatiliaji wa uzito, chanjo, kutibu sababu za msingi — wagonjwa wengi huishi kwa miaka mingi na ubora mzuri wa maisha. Wagonjwa wanaofanya vibaya zaidi ni wale wanaoacha dawa zao wanapojisikia vizuri, wanakula vyakula vya chumvi, au hawatafuti huduma dalili zinapozidi. Wagonjwa wanaofanya vyema zaidi hubaki kwenye dawa zao kamili milele, huhudhuria ziara za ufuatiliaji, hujipima uzito kila siku, na hutenda mapema ishara za onyo zinapojitokeza. Rufaa ya cardiology, pale inapopatikana, inafaa kwa mgonjwa yeyote mwenye HFrEF, ugonjwa mkali wa valve, au kulazwa hospitalini mara kwa mara.',
        sw_mtaa: 'Heart failure ni serious chronic disease na yes, katika advanced stages inaweza kushorten life. Lakini na modern treatment — foundation four drugs, salt management, weight monitoring, vaccinations, kutibu underlying causes — wagonjwa wengi wanaishi kwa miaka mingi na good quality of life. Wagonjwa wanaofanya worst ni wale wanaostop medicines zao wanapofeel better, wanaokula salty foods, au hawaseek care symptoms zinapoworsen. Wagonjwa wanaofanya best wanastay on full medicines zao forever, wanaattend follow-up visits, wanajipima uzito kila siku, na wanatenda early warning signs zinapoappear. Cardiology referral, pale inapopatikana, inafaa kwa patient yeyote mwenye HFrEF, severe valve disease, au repeated hospital admissions.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take every dose of your medicines every day. Foundation drugs only work when taken every day, and missing doses is the most common cause of decompensation.',
      sw: 'Chukua kila dose ya dawa zako kila siku. Dawa za msingi zinafanya kazi tu zinapochukuliwa kila siku, na kukosa dose ni sababu ya kawaida zaidi ya decompensation.',
      sw_mtaa: 'Chukua kila dose ya medicines zako kila siku. Foundation drugs zinafanya kazi tu zinapochukuliwa kila siku, na kukosa doses ni most common cause ya decompensation.',
    },
    {
      en: 'Weigh yourself every morning, same time, same clothes. Gain of more than 2 kg in 3 days means contact the clinic.',
      sw: 'Jipime uzito kila asubuhi, wakati huo huo, nguo hizo hizo. Kuongezeka kwa zaidi ya kilo 2 katika siku 3 kunamaanisha wasiliana na kliniki.',
      sw_mtaa: 'Jipime uzito kila asubuhi, same time, same clothes. Gain ya more than 2 kg katika siku 3 inamaanisha contact clinic.',
    },
    {
      en: 'Restrict salt aggressively — no added salt at the table, avoid stock cubes, processed snacks, prepared sauces. Cook with fresh herbs and lemon for flavour.',
      sw: 'Punguza chumvi kwa nguvu — bila kuongeza chumvi mezani, epuka stock cubes, vitafunwa vilivyochakatwa, michuzi iliyoandaliwa. Pika kwa mboga za kunusisha na limau kwa ladha.',
      sw_mtaa: 'Restrict salt aggressively — no added salt mezani, epuka stock cubes, processed snacks, prepared sauces. Pika na fresh herbs na lemon kwa flavour.',
    },
    {
      en: 'Stay active. Daily walking, even short distances, protects muscle and improves how the heart copes with daily activity.',
      sw: 'Endelea kuwa hai. Kutembea kila siku, hata umbali mfupi, hulinda misuli na kuboresha jinsi moyo unavyoshughulikia shughuli za kila siku.',
      sw_mtaa: 'Endelea active. Daily walking, hata short distances, inaprotect muscle na inaboresha jinsi heart inavyocope na daily activity.',
    },
    {
      en: 'Get the annual flu vaccine and pneumococcal vaccine. Chest infections trigger heart failure decompensations.',
      sw: 'Pata chanjo ya kila mwaka ya flu na chanjo ya pneumococcal. Maambukizi ya kifua husababisha decompensation za kushindwa kwa moyo.',
      sw_mtaa: 'Pata annual flu vaccine na pneumococcal vaccine. Chest infections zinatrigger heart failure decompensations.',
    },
    {
      en: 'Avoid NSAIDs (ibuprofen, diclofenac) — they cause salt and water retention and worsen heart failure. Use paracetamol for pain instead.',
      sw: 'Epuka NSAIDs (ibuprofen, diclofenac) — husababisha kuhifadhi chumvi na maji na huzidisha kushindwa kwa moyo. Tumia paracetamol kwa maumivu badala yake.',
      sw_mtaa: 'Epuka NSAIDs (ibuprofen, diclofenac) — zinasababisha salt na water retention na zinaworsen heart failure. Tumia paracetamol kwa pain badala yake.',
    },
    {
      en: 'Limit alcohol. Some patients should avoid it entirely (alcoholic cardiomyopathy); all heart failure patients benefit from moderation.',
      sw: 'Punguza pombe. Wagonjwa wengine wanapaswa kuiepuka kabisa (alcoholic cardiomyopathy); wagonjwa wote wa kushindwa kwa moyo wanafaidika na uwiano.',
      sw_mtaa: 'Limit alcohol. Wagonjwa wengine wanapaswa kuiavoid kabisa (alcoholic cardiomyopathy); all heart failure patients wanabenefit na moderation.',
    },
    {
      en: 'Treat depression and anxiety actively — they are very common in heart failure, worsen adherence, and increase hospitalisations.',
      sw: 'Tibu unyong\'onyevu na wasiwasi kwa bidii — vya kawaida sana katika kushindwa kwa moyo, huzidisha ufuasi, na huongeza kulazwa hospitalini.',
      sw_mtaa: 'Tibu depression na anxiety actively — ni very common katika heart failure, zinaworsen adherence, na zinaongeza hospitalisations.',
    },
  ],

  warningTriggers: [
    {
      en: 'Long-standing untreated or poorly controlled hypertension — the leading cause of heart failure in Tanzania',
      sw: 'Shinikizo la juu la damu la muda mrefu lisilotibika au lisilodhibitiwa vyema — sababu kuu ya kushindwa kwa moyo Tanzania',
      sw_mtaa: 'Long-standing untreated au poorly controlled hypertension — leading cause ya heart failure Tanzania',
    },
    {
      en: 'Rheumatic heart disease — childhood streptococcal infection causing valve damage',
      sw: 'Ugonjwa wa moyo wa rheumatic — maambukizi ya streptococcal ya utotoni yanayosababisha uharibifu wa valve',
      sw_mtaa: 'Rheumatic heart disease — childhood streptococcal infection inayosababisha valve damage',
    },
    {
      en: 'HIV — direct viral cardiomyopathy plus indirect effects via opportunistic infections',
      sw: 'VVU — cardiomyopathy ya virusi moja kwa moja pamoja na athari zisizo za moja kwa moja kupitia maambukizi nyemelezi',
      sw_mtaa: 'HIV — direct viral cardiomyopathy plus indirect effects via opportunistic infections',
    },
    {
      en: 'Pregnancy and the first 5 months post-partum — risk of peripartum cardiomyopathy',
      sw: 'Mimba na miezi 5 ya kwanza baada ya kuzaa — hatari ya cardiomyopathy ya peripartum',
      sw_mtaa: 'Pregnancy na first 5 months post-partum — risk ya peripartum cardiomyopathy',
    },
    {
      en: 'Diabetes — accelerates atherosclerosis and causes diabetic cardiomyopathy',
      sw: 'Kisukari — huongeza atherosclerosis na husababisha cardiomyopathy ya kisukari',
      sw_mtaa: 'Diabetes — inaaccelerate atherosclerosis na inasababisha diabetic cardiomyopathy',
    },
    {
      en: 'Chronic kidney disease — cardiorenal syndrome, fluid overload, electrolyte derangement',
      sw: 'Ugonjwa sugu wa figo — cardiorenal syndrome, mzigo wa maji, mvurugiko wa electrolyte',
      sw_mtaa: 'Chronic kidney disease — cardiorenal syndrome, fluid overload, electrolyte derangement',
    },
    {
      en: 'Chronic lung disease (COPD, post-TB lung disease) — cor pulmonale from chronic hypoxia',
      sw: 'Ugonjwa sugu wa mapafu (COPD, ugonjwa wa mapafu baada ya TB) — cor pulmonale kutoka hypoxia sugu',
      sw_mtaa: 'Chronic lung disease (COPD, post-TB lung disease) — cor pulmonale kutoka chronic hypoxia',
    },
    {
      en: 'Excessive alcohol intake over years — alcoholic cardiomyopathy',
      sw: 'Unywaji wa pombe kupita kiasi kwa miaka — alcoholic cardiomyopathy',
      sw_mtaa: 'Excessive alcohol intake over years — alcoholic cardiomyopathy',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Severe breathlessness at rest, unable to lie flat, breathing fast and shallow — possible acute pulmonary oedema',
        sw: 'Kushindwa kupumua kwa kasi wakati wa kupumzika, kushindwa kulala chini, kupumua haraka na kifupi — pulmonary oedema ya papo hapo inawezekana',
        sw_mtaa: 'Severe breathlessness at rest, kushindwa kulala flat, kupumua haraka na shallow — possible acute pulmonary oedema',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'Coughing up pink frothy sputum — pulmonary oedema, true emergency',
        sw: 'Kukohoa makohozi ya povu ya pink — pulmonary oedema, dharura halisi',
        sw_mtaa: 'Kukohoa pink frothy sputum — pulmonary oedema, true emergency',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'Chest pain with breathlessness — possible myocardial infarction triggering heart failure',
        sw: 'Maumivu ya kifua na kushindwa kupumua — myocardial infarction inayowezekana ikisababisha kushindwa kwa moyo',
        sw_mtaa: 'Chest pain na breathlessness — possible myocardial infarction inayotrigger heart failure',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'Fainting or near-fainting (syncope) — possible arrhythmia or severe valve disease',
        sw: 'Kuzimia au karibu kuzimia (syncope) — arrhythmia inayowezekana au ugonjwa mkali wa valve',
        sw_mtaa: 'Fainting au near-fainting (syncope) — possible arrhythmia au severe valve disease',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'New mother with breathlessness, swelling, or fatigue worsening at 6 weeks rather than improving — possible peripartum cardiomyopathy',
        sw: 'Mama mpya mwenye kushindwa kupumua, uvimbe, au uchovu unaozidi katika wiki 6 badala ya kuimarika — peripartum cardiomyopathy inawezekana',
        sw_mtaa: 'New mother na breathlessness, swelling, au fatigue inayoworsen katika weeks 6 badala ya kuimprove — possible peripartum cardiomyopathy',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'Weight gain of more than 2 kg in 3 days, new or worsening ankle swelling, or needing more pillows to sleep',
        sw: 'Kuongezeka uzito kwa zaidi ya kilo 2 katika siku 3, uvimbe mpya au unaozidi wa vifundo, au kuhitaji mito zaidi kulala',
        sw_mtaa: 'Weight gain ya more than 2 kg katika siku 3, new au worsening ankle swelling, au kuhitaji more pillows kulala',
      },
      urgency: 'urgent',
    },
    {
      sign: {
        en: 'New palpitations (irregular heartbeat), especially in known heart failure — possible atrial fibrillation',
        sw: 'Mapigo mapya ya moyo (yasiyo sawa), hasa katika kushindwa kwa moyo kunakojulikana — atrial fibrillation inawezekana',
        sw_mtaa: 'New palpitations (irregular heartbeat), especially katika known heart failure — possible atrial fibrillation',
      },
      urgency: 'urgent',
    },
  ],

  variants: HEART_FAILURE_VARIANTS,

  comorbidityNotes: [
    {
      coCondition: 'hypertension',
      note: {
        en: 'Long-standing untreated hypertension is the leading cause of heart failure in Tanzania. Aggressive BP control with ACE-i or ARB plus thiazide and/or calcium channel blocker prevents progression to heart failure. Once HF is established, the same ACE-i/ARB is part of the foundation four.',
        sw: 'Shinikizo la juu lisilotibika la muda mrefu ni sababu kuu ya kushindwa kwa moyo Tanzania. Udhibiti mkali wa BP na ACE-i au ARB pamoja na thiazide na/au calcium channel blocker huzuia kuendelea hadi kushindwa kwa moyo. Mara HF inapothibitishwa, ACE-i/ARB hiyo hiyo ni sehemu ya foundation four.',
        sw_mtaa: 'Long-standing untreated hypertension ni leading cause ya heart failure Tanzania. Aggressive BP control na ACE-i au ARB plus thiazide na/au calcium channel blocker inazuia progression to heart failure. Mara HF inapoestablished, same ACE-i/ARB ni sehemu ya foundation four.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'Cardiorenal syndrome — heart failure and CKD frequently coexist and worsen each other. Diuretics must be titrated carefully (over-diuresis causes pre-renal AKI; under-diuresis worsens congestion). ACE-i/ARB use is appropriate down to eGFR 30 but requires creatinine and potassium monitoring. SGLT2 inhibitors are beneficial in both HFrEF and CKD and should be used together where available.',
        sw: 'Cardiorenal syndrome — kushindwa kwa moyo na CKD mara nyingi huko pamoja na kuzidishana. Diuretics lazima zirekebishwe kwa uangalifu (over-diuresis husababisha pre-renal AKI; under-diuresis huzidisha congestion). Matumizi ya ACE-i/ARB yanafaa hadi eGFR 30 lakini yanahitaji ufuatiliaji wa creatinine na potasiamu. SGLT2 inhibitors ni za manufaa katika HFrEF na CKD na zinapaswa kutumika pamoja pale zinapopatikana.',
        sw_mtaa: 'Cardiorenal syndrome — heart failure na CKD frequently zinacoexist na zinaworsen each other. Diuretics lazima zititrated carefully (over-diuresis inasababisha pre-renal AKI; under-diuresis inaworsen congestion). ACE-i/ARB use ni appropriate down to eGFR 30 lakini inahitaji creatinine na potassium monitoring. SGLT2 inhibitors ni beneficial katika HFrEF na CKD na zinapaswa kutumika pamoja pale zinapopatikana.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Diabetes accelerates heart failure progression via diabetic cardiomyopathy and accelerated atherosclerosis. SGLT2 inhibitors are now first-line for diabetic patients with heart failure — they treat both. Avoid pioglitazone (causes fluid retention). Watch metformin in advanced HF with low GFR — pause if eGFR drops or during acute decompensation.',
        sw: 'Kisukari huongeza kuendelea kwa kushindwa kwa moyo kupitia cardiomyopathy ya kisukari na atherosclerosis iliyoongezwa. SGLT2 inhibitors sasa ni za safu ya kwanza kwa wagonjwa wa kisukari wenye kushindwa kwa moyo — hutibu vyote. Epuka pioglitazone (husababisha kuhifadhi maji). Angalia metformin katika HF ya hali ya juu na GFR ya chini — simamisha ikiwa eGFR inashuka au wakati wa decompensation ya papo hapo.',
        sw_mtaa: 'Diabetes inaaccelerate heart failure progression via diabetic cardiomyopathy na accelerated atherosclerosis. SGLT2 inhibitors sasa ni first-line kwa diabetic patients wenye heart failure — zinatreat both. Epuka pioglitazone (inasababisha fluid retention). Angalia metformin katika advanced HF na low GFR — pause ikiwa eGFR inashuka au wakati wa acute decompensation.',
      },
    },
    {
      coCondition: 'hiv',
      note: {
        en: 'HIV cardiomyopathy is an important cause of HF in young Tanzanian adults. Test for HIV in any new HF diagnosis. Continue ART without interruption. Some older ART regimens have cardiac effects; modern dolutegravir-based regimens (TLD) are cardiac-friendly. Manage HF with the same foundation four — none of these drugs interact problematically with TLD.',
        sw: 'Cardiomyopathy ya VVU ni sababu muhimu ya HF kwa watu wazima wadogo wa Kitanzania. Pima VVU katika utambuzi wowote mpya wa HF. Endelea na ART bila kukatiza. Baadhi ya regimens za ART za zamani zina athari za moyo; regimens za kisasa za dolutegravir (TLD) ni rafiki kwa moyo. Simamia HF kwa foundation four hiyo hiyo — hakuna dawa hizi inayoingiliana kwa shida na TLD.',
        sw_mtaa: 'HIV cardiomyopathy ni important cause ya HF kwa young Tanzanian adults. Test for HIV katika new HF diagnosis yoyote. Continue ART bila interruption. Baadhi ya older ART regimens zina cardiac effects; modern dolutegravir-based regimens (TLD) ni cardiac-friendly. Manage HF na same foundation four — hakuna ya drugs hizi inainteract problematically na TLD.',
      },
    },
    {
      coCondition: 'copd',
      note: {
        en: 'COPD and HF overlap in symptoms (breathlessness, fatigue, leg swelling) and very frequently coexist. The old teaching that beta-blockers are contraindicated in COPD is outdated — cardio-selective beta-blockers (bisoprolol, carvedilol) are safe and improve HF outcomes even in COPD. Cor pulmonale is a separate entity (right-heart strain from chronic lung disease) and is treated by treating the underlying lung disease + LTOT, not by ACE-i and beta-blockers alone.',
        sw: 'COPD na HF huingiliana katika dalili (kushindwa kupumua, uchovu, uvimbe wa miguu) na mara nyingi sana huko pamoja. Fundisho la zamani kwamba beta-blockers ni contraindicated katika COPD limepitwa na wakati — cardio-selective beta-blockers (bisoprolol, carvedilol) ni salama na huboresha matokeo ya HF hata katika COPD. Cor pulmonale ni hali tofauti (mfadhaiko wa moyo wa kulia kutoka ugonjwa sugu wa mapafu) na hutibiwa kwa kutibu ugonjwa wa msingi wa mapafu + LTOT, sio kwa ACE-i na beta-blockers peke yake.',
        sw_mtaa: 'COPD na HF zinaoverlap katika symptoms (breathlessness, fatigue, leg swelling) na very frequently zinacoexist. Old teaching kwamba beta-blockers ni contraindicated katika COPD imeoutdated — cardio-selective beta-blockers (bisoprolol, carvedilol) ni safe na zinaboresha HF outcomes hata katika COPD. Cor pulmonale ni separate entity (right-heart strain kutoka chronic lung disease) na inatibiwa kwa kutreat underlying lung disease + LTOT, sio kwa ACE-i na beta-blockers peke yake.',
      },
    },
    {
      coCondition: 'maternal_care',
      note: {
        en: 'Peripartum cardiomyopathy is heart failure in pregnancy (last month) or post-partum (first 5 months). Risk factors: hypertension, twin pregnancy, older mothers, African ancestry. Diagnosis is often delayed because symptoms mimic normal post-delivery fatigue. Bromocriptine (specialist decision) may speed recovery. Future pregnancies need cardiology counselling — recurrence risk is significant.',
        sw: 'Peripartum cardiomyopathy ni kushindwa kwa moyo katika mimba (mwezi wa mwisho) au baada ya kuzaa (miezi 5 ya kwanza). Sababu za hatari: shinikizo la juu, mimba ya mapacha, akina mama wakubwa zaidi, asili ya Kiafrika. Utambuzi mara nyingi huchelewa kwa sababu dalili huiga uchovu wa kawaida baada ya kuzaa. Bromocriptine (uamuzi wa mtaalam) inaweza kuharakisha kupona. Mimba za baadaye zinahitaji ushauri wa cardiology — hatari ya kurudia ni muhimu.',
        sw_mtaa: 'Peripartum cardiomyopathy ni heart failure katika pregnancy (last month) au post-partum (first 5 months). Risk factors: hypertension, twin pregnancy, older mothers, African ancestry. Diagnosis mara nyingi inadelayed kwa sababu symptoms zinamimic normal post-delivery fatigue. Bromocriptine (specialist decision) inaweza kuspeed recovery. Future pregnancies zinahitaji cardiology counselling — recurrence risk ni significant.',
      },
    },
  ],

  sources: [
    src('WHO_HEARTS_2023'),
    src('WHO_PEN_2020'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NACP_ART_2024'),
    src('MOH_TZ_MATERNAL_2024'),
    src('BNF_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
