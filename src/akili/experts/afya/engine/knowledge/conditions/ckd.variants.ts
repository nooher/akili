/**
 * CKD — Condition Variants (Phase 6, CKD Full All-In)
 *
 * Six variants covering the full chronic kidney disease continuum:
 *   1. ckd_early           — stages G1-G2, silent, the prevention window
 *   2. ckd_moderate        — stage G3, the "act now" turning point
 *   3. ckd_advanced        — stage G4, pre-dialysis planning
 *   4. ckd_kidney_failure  — stage G5, end-stage kidney disease
 *   5. ckd_dialysis        — life on haemodialysis / peritoneal dialysis
 *   6. ckd_transplant      — kidney transplant awareness and journey
 *
 * Sources: KDIGO Clinical Practice Guideline for the Evaluation and
 *          Management of CKD 2024, NTLG STG 2023, Muhimbili Protocols,
 *          BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * SCOPE: educational continuity content. No diagnosis (CKD is confirmed by
 * eGFR/creatinine over time plus urine testing), no medicine selection, no
 * dosing. The clinician owns staging, medicine, and dialysis/transplant
 * decisions. A core message throughout: many everyday medicines need dose
 * adjustment in CKD — "ask before you take".
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const CKD_VARIANTS: ConditionVariant[] = [
  // ════════════════════════════════════════════════════════════════════
  // 1. EARLY CKD — STAGES G1-G2
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'ckd_early',
    severity: 'uncomplicated',
    label: {
      en: 'CKD — early stage (G1-G2)',
      sw: 'CKD — hatua za awali (G1-G2)',
    },
    presentation: {
      en: 'Early CKD means the kidneys still filter well (eGFR is 60 or above) but there is evidence of kidney damage — most often protein in the urine, or a structural change seen on a scan — that has been present for at least three months. Almost everyone at this stage feels completely well; there are no symptoms. It is found through a blood test (eGFR) and a urine test (for protein), usually done because the person has diabetes, high blood pressure, or another risk factor. This is not a frightening stage — it is the most hopeful one. Caught here, the right steps can often slow or even halt progression for many years.',
      sw: 'CKD ya awali maana yake figo bado huchuja vizuri (eGFR ni 60 au zaidi) lakini kuna ushahidi wa uharibifu wa figo — mara nyingi protini katika mkojo, au mabadiliko ya muundo yanayoonekana kwenye picha — ambayo yamekuwepo kwa angalau miezi mitatu. Karibu kila mtu katika hatua hii hujisikia vizuri kabisa; hakuna dalili. Hugunduliwa kupitia kipimo cha damu (eGFR) na kipimo cha mkojo (kwa protini), kawaida hufanywa kwa sababu mtu ana kisukari, shinikizo la juu la damu, au sababu nyingine ya hatari. Hii sio hatua ya kutisha — ni yenye matumaini zaidi. Ikigunduliwa hapa, hatua sahihi mara nyingi zinaweza kupunguza au hata kusimamisha maendeleo kwa miaka mingi.',
      sw_mtaa: 'CKD ya awali maana yake figo bado zinachuja vizuri (eGFR ni 60 au zaidi) lakini kuna ushahidi wa uharibifu wa figo — mara nyingi protini kwenye mkojo, au mabadiliko ya muundo yanayoonekana kwenye picha — ambayo yamekuwepo kwa angalau miezi mitatu. Karibu kila mtu katika hatua hii anajisikia poa kabisa; hakuna dalili. Inagunduliwa kupitia kipimo cha damu (eGFR) na kipimo cha mkojo (kwa protini), kawaida kinafanywa kwa sababu mtu ana kisukari, presha ya juu, au sababu nyingine ya hatari. Hii sio hatua ya kutisha — ni yenye matumaini zaidi. Ikigunduliwa hapa, hatua sahihi mara nyingi zinaweza kupunguza au hata kusimamisha maendeleo kwa miaka mingi.',
    },
    recognitionSigns: [
      {
        en: 'eGFR of 60 or above, with a marker of kidney damage (usually urine protein) for 3+ months',
        sw: 'eGFR ya 60 au zaidi, na alama ya uharibifu wa figo (kawaida protini ya mkojo) kwa miezi 3+',
        sw_mtaa: 'eGFR ya 60 au zaidi, na alama ya uharibifu wa figo (kawaida protini ya mkojo) kwa miezi 3+',
      },
      {
        en: 'No symptoms — almost always found on testing, not from feeling unwell',
        sw: 'Hakuna dalili — karibu daima hugunduliwa kwa kupima, sio kwa kujisikia mgonjwa',
        sw_mtaa: 'Hakuna dalili — karibu daima inagunduliwa kwa kupima, sio kwa kujisikia mgonjwa',
      },
      {
        en: 'Usually found in someone with diabetes, high blood pressure, or a family history of kidney disease',
        sw: 'Kawaida hugunduliwa kwa mtu mwenye kisukari, shinikizo la juu la damu, au historia ya familia ya ugonjwa wa figo',
        sw_mtaa: 'Kawaida inagunduliwa kwa mtu mwenye kisukari, presha ya juu, au historia ya familia ya ugonjwa wa figo',
      },
    ],
    treatmentJourney: {
      en: 'Early CKD is managed, not "treated" with a special medicine — and the management is powerful. The core is controlling the cause: keeping blood pressure in the target range and, if diabetic, keeping blood sugar well controlled. The clinician may start a kidney-protective medicine (often an ACE inhibitor or ARB, which both lower blood pressure and directly reduce protein leaking into the urine). Everyday protection matters enormously here: reduce salt, stay active, keep a healthy weight, do not smoke, drink alcohol only in moderation, and — very important — avoid regular use of NSAID painkillers (like ibuprofen and diclofenac) and never take medicines or herbal remedies without checking they are kidney-safe. Monitoring is simple: eGFR and urine protein checked on a schedule the clinician sets, usually once or twice a year at this stage.',
      sw: 'CKD ya awali husimamiwa, haitibiwi kwa dawa maalum — na usimamizi una nguvu. Msingi ni kudhibiti chanzo: kuweka shinikizo la damu katika kiwango kinacholengwa na, ikiwa una kisukari, kuweka sukari ya damu ikidhibitiwa vizuri. Daktari anaweza kuanza dawa ya kulinda figo (mara nyingi ACE inhibitor au ARB, ambazo zote hushusha shinikizo la damu na kupunguza moja kwa moja protini inayovuja kwenye mkojo). Ulinzi wa kila siku ni muhimu sana hapa: punguza chumvi, kaa hai, weka uzito wenye afya, usivute sigara, kunywa pombe kwa kiasi tu, na — muhimu sana — epuka matumizi ya mara kwa mara ya dawa za maumivu za NSAID (kama ibuprofen na diclofenac) na kamwe usitumie dawa au mitishamba bila kuangalia ni salama kwa figo. Ufuatiliaji ni rahisi: eGFR na protini ya mkojo huangaliwa kwa ratiba ambayo daktari anaweka, kawaida mara moja au mbili kwa mwaka katika hatua hii.',
      sw_mtaa: 'CKD ya awali inasimamiwa, haitibiwi kwa dawa maalum — na usimamizi una nguvu. Msingi ni kudhibiti chanzo: kuweka presha katika kiwango kinacholengwa na, ikiwa una kisukari, kuweka sukari ikidhibitiwa vizuri. Daktari anaweza kuanza dawa ya kulinda figo (mara nyingi ACE inhibitor au ARB, ambazo zote zinashusha presha na kupunguza moja kwa moja protini inayovuja kwenye mkojo). Ulinzi wa kila siku ni muhimu sana hapa: punguza chumvi, kaa hai, weka uzito mzuri, usivute sigara, kunywa pombe kwa kiasi tu, na — muhimu sana — epuka matumizi ya mara kwa mara ya dawa za maumivu za NSAID (kama ibuprofen na diclofenac) na kamwe usitumie dawa au mitishamba bila kuangalia ni salama kwa figo. Ufuatiliaji ni rahisi: eGFR na protini ya mkojo zinaangaliwa kwa ratiba ambayo daktari anaweka, kawaida mara moja au mbili kwa mwaka katika hatua hii.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'A sudden drop in urine output, swelling, or feeling very unwell — could be acute kidney injury on top of CKD. Seek care urgently',
          sw: 'Kupungua kwa ghafla kwa mkojo, uvimbe, au kujisikia mgonjwa sana — inaweza kuwa jeraha la papo hapo la figo juu ya CKD. Tafuta huduma kwa haraka',
          sw_mtaa: 'Kupungua kwa ghafla kwa mkojo, uvimbe, au kujisikia mgonjwa sana — inaweza kuwa jeraha la papo hapo la figo juu ya CKD. Tafuta huduma kwa haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Blood in the urine, or urine that is persistently foamy — should be checked even though early CKD is usually silent',
          sw: 'Damu katika mkojo, au mkojo wenye povu la kudumu — unapaswa kuangaliwa ingawa CKD ya awali kawaida ni kimya',
          sw_mtaa: 'Damu katika mkojo, au mkojo wenye povu la kudumu — unapaswa kuangaliwa ingawa CKD ya awali kawaida ni kimya',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'At this stage follow-up is light but it must be regular — usually eGFR and urine protein once or twice a year, plus blood pressure and (if diabetic) blood sugar reviews. The whole point of early-stage follow-up is to catch any change in the eGFR trend early. Record every eGFR and urine result in the TibaHub vault with its date — a line of results over time tells the clinician far more than any single value. Keep blood pressure and blood sugar logs alongside. The message at this stage: you feel well, and the goal is to keep it that way for as many years as possible.',
      sw: 'Katika hatua hii ufuatiliaji ni mwepesi lakini lazima uwe wa mara kwa mara — kawaida eGFR na protini ya mkojo mara moja au mbili kwa mwaka, pamoja na mapitio ya shinikizo la damu na (ikiwa una kisukari) sukari ya damu. Lengo zima la ufuatiliaji wa hatua ya awali ni kugundua mabadiliko yoyote katika mwelekeo wa eGFR mapema. Rekodi kila eGFR na matokeo ya mkojo katika vault ya TibaHub pamoja na tarehe yake — mstari wa matokeo kwa muda huambia daktari mengi zaidi kuliko thamani moja yoyote. Weka kumbukumbu za shinikizo la damu na sukari ya damu pamoja. Ujumbe katika hatua hii: unajisikia vizuri, na lengo ni kuiweka hivyo kwa miaka mingi iwezekanavyo.',
      sw_mtaa: 'Katika hatua hii ufuatiliaji ni mwepesi lakini lazima uwe wa mara kwa mara — kawaida eGFR na protini ya mkojo mara moja au mbili kwa mwaka, pamoja na mapitio ya presha na (ikiwa una kisukari) sukari. Lengo zima la ufuatiliaji wa hatua ya awali ni kugundua mabadiliko yoyote katika mwelekeo wa eGFR mapema. Rekodi kila eGFR na matokeo ya mkojo katika vault ya TibaHub pamoja na tarehe — mstari wa matokeo kwa muda unaambia daktari mengi zaidi kuliko thamani moja. Weka kumbukumbu za presha na sukari pamoja. Ujumbe katika hatua hii: unajisikia vizuri, na lengo ni kuiweka hivyo kwa miaka mingi iwezekanavyo.',
    },
    sources: [src('KDIGO_CKD_2024'), src('NTLG_STG_2023')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 2. MODERATE CKD — STAGE G3
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'ckd_moderate',
    severity: 'complicated',
    label: {
      en: 'CKD — moderate stage (G3)',
      sw: 'CKD — hatua ya wastani (G3)',
    },
    presentation: {
      en: 'Moderate CKD (stage G3, eGFR 30-59) is the turning point. Kidney function is now noticeably reduced — roughly a third to half of normal — and this is the stage where complications begin to appear and where careful management makes the biggest difference. Many people still feel well, but some start to notice tiredness, mild swelling in the ankles, or changes in urination. This is also where the kidneys begin to struggle with their other jobs: blood pressure becomes harder to control, anaemia can begin, and the balance of calcium, phosphate, and acid in the blood can shift. Stage G3 is not an emergency, but it is a clear call to act — the steps taken here strongly shape whether CKD ever reaches the advanced stages.',
      sw: 'CKD ya wastani (hatua G3, eGFR 30-59) ni kipindi cha mageuzi. Utendaji wa figo sasa umepungua kwa kuonekana — takriban theluthi moja hadi nusu ya kawaida — na hii ni hatua ambapo matatizo huanza kuonekana na ambapo usimamizi wa makini huleta tofauti kubwa zaidi. Watu wengi bado hujisikia vizuri, lakini wengine huanza kugundua uchovu, uvimbe mdogo katika vifundo vya miguu, au mabadiliko katika kukojoa. Hii pia ni ambapo figo huanza kuhangaika na kazi zao zingine: shinikizo la damu huwa gumu zaidi kudhibiti, upungufu wa damu unaweza kuanza, na uwiano wa kalsiamu, fosfati, na asidi katika damu unaweza kubadilika. Hatua G3 sio dharura, lakini ni wito wazi wa kuchukua hatua — hatua zinazochukuliwa hapa huunda kwa nguvu kama CKD itawahi kufikia hatua za juu.',
      sw_mtaa: 'CKD ya wastani (hatua G3, eGFR 30-59) ni kipindi cha mageuzi. Kazi ya figo sasa imepungua kwa kuonekana — takriban theluthi moja hadi nusu ya kawaida — na hii ni hatua ambapo matatizo yanaanza kuonekana na ambapo usimamizi wa makini unaleta tofauti kubwa zaidi. Watu wengi bado wanajisikia vizuri, lakini wengine wanaanza kugundua uchovu, uvimbe mdogo kwenye vifundo vya miguu, au mabadiliko katika kukojoa. Hii pia ni ambapo figo zinaanza kuhangaika na kazi zao zingine: presha inakuwa ngumu zaidi kudhibiti, upungufu wa damu unaweza kuanza, na uwiano wa kalsiamu, fosfati, na asidi katika damu unaweza kubadilika. Hatua G3 sio dharura, lakini ni wito wazi wa kuchukua hatua — hatua zinazochukuliwa hapa zinaunda kwa nguvu kama CKD itawahi kufikia hatua za juu.',
    },
    recognitionSigns: [
      {
        en: 'eGFR between 30 and 59, confirmed over at least 3 months',
        sw: 'eGFR kati ya 30 na 59, iliyothibitishwa kwa angalau miezi 3',
        sw_mtaa: 'eGFR kati ya 30 na 59, iliyothibitishwa kwa angalau miezi 3',
      },
      {
        en: 'May still feel well, or may notice mild tiredness, ankle swelling, or changes in urination',
        sw: 'Anaweza bado kujisikia vizuri, au anaweza kugundua uchovu mdogo, uvimbe wa vifundo vya miguu, au mabadiliko katika kukojoa',
        sw_mtaa: 'Anaweza bado kujisikia vizuri, au anaweza kugundua uchovu mdogo, uvimbe wa vifundo vya miguu, au mabadiliko katika kukojoa',
      },
      {
        en: 'Blood pressure becoming harder to control; early anaemia or bone-mineral changes may begin',
        sw: 'Shinikizo la damu kuwa gumu zaidi kudhibiti; upungufu wa damu wa awali au mabadiliko ya madini ya mfupa yanaweza kuanza',
        sw_mtaa: 'Presha kuwa ngumu zaidi kudhibiti; upungufu wa damu wa awali au mabadiliko ya madini ya mfupa yanaweza kuanza',
      },
    ],
    treatmentJourney: {
      en: 'Stage G3 management intensifies the same foundations and adds monitoring for complications. Blood pressure and blood sugar control remain central, and a kidney-protective medicine (ACE inhibitor or ARB) is commonly used if not already. The clinician now also watches for and treats complications as they appear: anaemia (a blood count, iron checks), bone-mineral balance (calcium, phosphate), and acid balance. Diet may become more specific — often guidance to moderate salt firmly, and sometimes to adjust protein or potassium, ideally with a dietitian. Crucially, this is the stage where a medication review really matters: many common drugs need dose adjustment at this eGFR, and some — including certain diabetes medicines, some antibiotics, and NSAID painkillers — need changing or avoiding. The rule becomes firm: check every new medicine, prescription or over-the-counter, against your kidney function.',
      sw: 'Usimamizi wa hatua G3 huimarisha misingi ile ile na huongeza ufuatiliaji wa matatizo. Udhibiti wa shinikizo la damu na sukari ya damu hubaki msingi, na dawa ya kulinda figo (ACE inhibitor au ARB) hutumika kwa kawaida ikiwa bado haijatumika. Daktari sasa pia huangalia na kutibu matatizo yanapotokea: upungufu wa damu (hesabu ya damu, ukaguzi wa madini ya chuma), uwiano wa madini ya mfupa (kalsiamu, fosfati), na uwiano wa asidi. Lishe inaweza kuwa maalum zaidi — mara nyingi mwongozo wa kupunguza chumvi kwa uthabiti, na wakati mwingine kurekebisha protini au potasiamu, ikiwezekana na mtaalamu wa lishe. Muhimu, hii ni hatua ambapo mapitio ya dawa yana umuhimu mkubwa: dawa nyingi za kawaida zinahitaji marekebisho ya dose katika eGFR hii, na baadhi — ikiwa ni pamoja na dawa fulani za kisukari, baadhi ya antibiotics, na dawa za maumivu za NSAID — zinahitaji kubadilishwa au kuepukwa. Sheria inakuwa thabiti: angalia kila dawa mpya, ya daktari au ya dukani, dhidi ya utendaji wa figo zako.',
      sw_mtaa: 'Usimamizi wa hatua G3 unaimarisha misingi ile ile na unaongeza ufuatiliaji wa matatizo. Udhibiti wa presha na sukari unabaki msingi, na dawa ya kulinda figo (ACE inhibitor au ARB) inatumika kwa kawaida ikiwa bado haijatumika. Daktari sasa pia anaangalia na kutibu matatizo yanapotokea: upungufu wa damu (hesabu ya damu, ukaguzi wa madini ya chuma), uwiano wa madini ya mfupa (kalsiamu, fosfati), na uwiano wa asidi. Lishe inaweza kuwa maalum zaidi — mara nyingi mwongozo wa kupunguza chumvi kwa uthabiti, na wakati mwingine kurekebisha protini au potasiamu, ikiwezekana na mtaalamu wa lishe. Muhimu, hii ni hatua ambapo mapitio ya dawa yana umuhimu mkubwa: dawa nyingi za kawaida zinahitaji marekebisho ya dose katika eGFR hii, na baadhi — ikiwa ni pamoja na dawa fulani za kisukari, baadhi ya antibiotics, na dawa za maumivu za NSAID — zinahitaji kubadilishwa au kuepukwa. Sheria inakuwa thabiti: angalia kila dawa mpya, ya daktari au ya dukani, dhidi ya kazi ya figo zako.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'A rapid fall in eGFR between tests, or a sudden rise in creatinine — needs prompt clinician review',
          sw: 'Kushuka kwa kasi kwa eGFR kati ya vipimo, au kupanda kwa ghafla kwa creatinine — kunahitaji ukaguzi wa haraka wa daktari',
          sw_mtaa: 'Kushuka kwa kasi kwa eGFR kati ya vipimo, au kupanda kwa ghafla kwa creatinine — kunahitaji ukaguzi wa haraka wa daktari',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Worsening swelling, breathlessness, or being unable to lie flat — possible fluid overload, seek care',
          sw: 'Uvimbe unaozidi, kushindwa kupumua, au kushindwa kulala kwa gorofa — uwezekano wa maji kupita kiasi, tafuta huduma',
          sw_mtaa: 'Uvimbe unaozidi, kushindwa kupumua, au kushindwa kulala kwa gorofa — uwezekano wa maji kupita kiasi, tafuta huduma',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Muscle weakness, palpitations, or feeling faint — could be a potassium imbalance, which needs urgent checking in CKD',
          sw: 'Udhaifu wa misuli, mapigo ya moyo, au kuhisi kuzimia — inaweza kuwa kutofautiana kwa potasiamu, ambako kunahitaji ukaguzi wa haraka katika CKD',
          sw_mtaa: 'Udhaifu wa misuli, mapigo ya moyo, au kuhisi kuzimia — inaweza kuwa kutofautiana kwa potasiamu, ambako kunahitaji ukaguzi wa haraka katika CKD',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Follow-up at stage G3 is more structured: eGFR, urine protein, and a set of blood tests (for anaemia, calcium, phosphate, potassium, and acid balance) on a schedule the clinician sets — often every 3-6 months, more often if things are changing. Blood pressure and blood sugar are reviewed at every contact. Some people are referred to a kidney specialist at this stage, especially if the eGFR is falling, protein is high, or the cause is unclear. The continuity goal: keep a clear, dated record of every eGFR and blood result in the vault, so the trend is visible — at G3, the direction of travel matters as much as the current number.',
      sw: 'Ufuatiliaji katika hatua G3 una mpangilio zaidi: eGFR, protini ya mkojo, na seti ya vipimo vya damu (kwa upungufu wa damu, kalsiamu, fosfati, potasiamu, na uwiano wa asidi) kwa ratiba ambayo daktari anaweka — mara nyingi kila miezi 3-6, mara nyingi zaidi ikiwa mambo yanabadilika. Shinikizo la damu na sukari ya damu huangaliwa katika kila mawasiliano. Watu wengine hupelekwa kwa mtaalamu wa figo katika hatua hii, hasa ikiwa eGFR inashuka, protini iko juu, au chanzo hakijulikani wazi. Lengo la kuendelea: weka rekodi wazi, yenye tarehe ya kila eGFR na matokeo ya damu katika vault, ili mwelekeo uonekane — katika G3, mwelekeo wa safari una umuhimu sawa na namba ya sasa.',
      sw_mtaa: 'Ufuatiliaji katika hatua G3 una mpangilio zaidi: eGFR, protini ya mkojo, na seti ya vipimo vya damu (kwa upungufu wa damu, kalsiamu, fosfati, potasiamu, na uwiano wa asidi) kwa ratiba ambayo daktari anaweka — mara nyingi kila miezi 3-6, mara nyingi zaidi ikiwa mambo yanabadilika. Presha na sukari zinaangaliwa katika kila mawasiliano. Watu wengine wanapelekwa kwa mtaalamu wa figo katika hatua hii, hasa ikiwa eGFR inashuka, protini iko juu, au chanzo hakijulikani wazi. Lengo la kuendelea: weka rekodi wazi, yenye tarehe ya kila eGFR na matokeo ya damu katika vault, ili mwelekeo uonekane — katika G3, mwelekeo wa safari una umuhimu sawa na namba ya sasa.',
    },
    sources: [src('KDIGO_CKD_2024'), src('NTLG_STG_2023'), src('MUHIMBILI_PROTOCOLS')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 3. ADVANCED CKD — STAGE G4
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'ckd_advanced',
    severity: 'critical',
    label: {
      en: 'CKD — advanced stage (G4)',
      sw: 'CKD — hatua ya juu (G4)',
    },
    presentation: {
      en: 'Advanced CKD (stage G4, eGFR 15-29) means kidney function is severely reduced — less than a third of normal. Symptoms are more likely now: persistent tiredness, poor appetite, nausea, itching, difficulty sleeping, swelling, and breathlessness can all appear, though some people still feel relatively well. This is the stage of active preparation. It does not mean dialysis is starting tomorrow — many people stay in stage G4 for a long time — but it is the stage where the kidney team and the person plan together for what may come: learning about the treatment options for kidney failure, and protecting the body so that, if dialysis or transplant is ever needed, the person enters it in the best possible condition.',
      sw: 'CKD ya juu (hatua G4, eGFR 15-29) maana yake utendaji wa figo umepungua sana — chini ya theluthi moja ya kawaida. Dalili zina uwezekano zaidi sasa: uchovu wa kudumu, hamu mbaya ya kula, kichefuchefu, kuwasha, ugumu wa kulala, uvimbe, na kushindwa kupumua vyote vinaweza kuonekana, ingawa watu wengine bado hujisikia vizuri kiasi. Hii ni hatua ya maandalizi hai. Haimaanishi dialysis inaanza kesho — watu wengi hubaki katika hatua G4 kwa muda mrefu — lakini ni hatua ambapo timu ya figo na mtu hupanga pamoja kwa kile kinachoweza kuja: kujifunza kuhusu chaguo za matibabu kwa figo kushindwa, na kulinda mwili ili, ikiwa dialysis au upandikizaji utahitajika, mtu aingie katika hali bora iwezekanavyo.',
      sw_mtaa: 'CKD ya juu (hatua G4, eGFR 15-29) maana yake kazi ya figo imepungua sana — chini ya theluthi moja ya kawaida. Dalili zina uwezekano zaidi sasa: uchovu wa kudumu, hamu mbaya ya kula, kichefuchefu, kuwasha, ugumu wa kulala, uvimbe, na kushindwa kupumua vyote vinaweza kuonekana, ingawa watu wengine bado wanajisikia vizuri kiasi. Hii ni hatua ya maandalizi hai. Haimaanishi dialysis inaanza kesho — watu wengi wanabaki katika hatua G4 kwa muda mrefu — lakini ni hatua ambapo timu ya figo na mtu wanapanga pamoja kwa kile kinachoweza kuja: kujifunza kuhusu chaguo za matibabu kwa figo kushindwa, na kulinda mwili ili, ikiwa dialysis au upandikizaji utahitajika, mtu aingie katika hali bora iwezekanavyo.',
    },
    recognitionSigns: [
      {
        en: 'eGFR between 15 and 29, confirmed over time',
        sw: 'eGFR kati ya 15 na 29, iliyothibitishwa kwa muda',
        sw_mtaa: 'eGFR kati ya 15 na 29, iliyothibitishwa kwa muda',
      },
      {
        en: 'Symptoms more likely: tiredness, poor appetite, nausea, itching, poor sleep, swelling, breathlessness',
        sw: 'Dalili zina uwezekano zaidi: uchovu, hamu mbaya ya kula, kichefuchefu, kuwasha, usingizi mbaya, uvimbe, kushindwa kupumua',
        sw_mtaa: 'Dalili zina uwezekano zaidi: uchovu, hamu mbaya ya kula, kichefuchefu, kuwasha, usingizi mbaya, uvimbe, kushindwa kupumua',
      },
      {
        en: 'Anaemia, bone-mineral changes, and acid imbalance commonly need active treatment now',
        sw: 'Upungufu wa damu, mabadiliko ya madini ya mfupa, na kutofautiana kwa asidi kwa kawaida vinahitaji matibabu hai sasa',
        sw_mtaa: 'Upungufu wa damu, mabadiliko ya madini ya mfupa, na kutofautiana kwa asidi kwa kawaida vinahitaji matibabu hai sasa',
      },
    ],
    treatmentJourney: {
      en: 'Stage G4 care is led by a kidney team and runs on two tracks at once. The first track continues everything from before — controlling blood pressure and blood sugar, managing anaemia, bone-mineral balance and acid balance, careful diet, and strict avoidance of anything that harms the kidneys — to protect the function that remains and keep the person feeling as well as possible. The second track is planning: education about the options if the kidneys eventually fail (haemodialysis, peritoneal dialysis, transplant, or in some situations conservative care focused on comfort), and the practical preparation that takes time — for example, protecting the blood vessels of one arm for a possible future dialysis access, or beginning a transplant assessment. None of this means giving up; it means being prepared so that decisions are made calmly and in advance, not in a crisis.',
      sw: 'Huduma ya hatua G4 huongozwa na timu ya figo na huendesha kwa njia mbili kwa wakati mmoja. Njia ya kwanza huendelea kila kitu kutoka kabla — kudhibiti shinikizo la damu na sukari ya damu, kusimamia upungufu wa damu, uwiano wa madini ya mfupa na uwiano wa asidi, lishe ya makini, na kuepuka kwa uthabiti chochote kinachodhuru figo — kulinda utendaji uliobaki na kumweka mtu akijisikia vizuri iwezekanavyo. Njia ya pili ni kupanga: elimu kuhusu chaguo ikiwa figo zitashindwa hatimaye (haemodialysis, peritoneal dialysis, upandikizaji, au katika hali zingine huduma ya kihafidhina inayolenga faraja), na maandalizi ya kivitendo ambayo huchukua muda — kwa mfano, kulinda mishipa ya damu ya mkono mmoja kwa ufikiaji wa dialysis wa baadaye iwezekanavyo, au kuanza tathmini ya upandikizaji. Hakuna katika haya kunamaanisha kukata tamaa; kunamaanisha kuwa tayari ili maamuzi yafanywe kwa utulivu na mapema, sio katika mzozo.',
      sw_mtaa: 'Huduma ya hatua G4 inaongozwa na timu ya figo na inaendesha kwa njia mbili kwa wakati mmoja. Njia ya kwanza inaendelea kila kitu kutoka kabla — kudhibiti presha na sukari, kusimamia upungufu wa damu, uwiano wa madini ya mfupa na uwiano wa asidi, lishe ya makini, na kuepuka kwa uthabiti chochote kinachodhuru figo — kulinda kazi iliyobaki na kumweka mtu akijisikia vizuri iwezekanavyo. Njia ya pili ni kupanga: elimu kuhusu chaguo ikiwa figo zitashindwa hatimaye (haemodialysis, peritoneal dialysis, upandikizaji, au katika hali zingine huduma ya kihafidhina inayolenga faraja), na maandalizi ya kivitendo ambayo yanachukua muda — kwa mfano, kulinda mishipa ya damu ya mkono mmoja kwa ufikiaji wa dialysis wa baadaye, au kuanza tathmini ya upandikizaji. Hakuna katika haya kunamaanisha kukata tamaa; kunamaanisha kuwa tayari ili maamuzi yafanywe kwa utulivu na mapema, sio katika mzozo.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe breathlessness, unable to lie flat, or marked swelling — possible dangerous fluid overload. EMERGENCY',
          sw: 'Kushindwa kupumua kali, kushindwa kulala kwa gorofa, au uvimbe mkubwa — uwezekano wa maji kupita kiasi hatari. DHARURA',
          sw_mtaa: 'Kushindwa kupumua kali, kushindwa kulala kwa gorofa, au uvimbe mkubwa — uwezekano wa maji kupita kiasi hatari. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Muscle weakness, slow or irregular heartbeat, or collapse — possible severe high potassium. EMERGENCY',
          sw: 'Udhaifu wa misuli, mapigo ya moyo ya polepole au yasiyo ya kawaida, au kuanguka — uwezekano wa potasiamu ya juu kali. DHARURA',
          sw_mtaa: 'Udhaifu wa misuli, mapigo ya moyo ya polepole au yasiyo ya kawaida, au kuanguka — uwezekano wa potasiamu ya juu kali. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Persistent vomiting, confusion, or being unable to eat or drink — possible build-up of waste (uraemia). Seek urgent care',
          sw: 'Kutapika kwa kudumu, kuchanganyikiwa, au kushindwa kula au kunywa — uwezekano wa mlundikano wa taka (uraemia). Tafuta huduma ya haraka',
          sw_mtaa: 'Kutapika kwa kudumu, kuchanganyikiwa, au kushindwa kula au kunywa — uwezekano wa mlundikano wa taka (uraemia). Tafuta huduma ya haraka',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Follow-up at stage G4 is frequent and specialist-led — usually under a kidney clinic, with eGFR, blood tests, blood pressure, and symptom review every few weeks to months depending on stability, plus appointments dedicated to education and planning. The continuity record matters more than ever here: a clear, dated vault history of eGFR trend, blood results, current medicines (with doses), blood pressure, weight, and any decisions made about future treatment. This record is what lets any clinician — at the kidney clinic, in an emergency, or at a new facility — pick up care safely. The message at G4: this is a stage of careful preparation and active protection, walked alongside a specialist team.',
      sw: 'Ufuatiliaji katika hatua G4 ni wa mara kwa mara na unaoongozwa na mtaalamu — kawaida chini ya kliniki ya figo, na eGFR, vipimo vya damu, shinikizo la damu, na mapitio ya dalili kila wiki chache hadi miezi kulingana na uthabiti, pamoja na miadi iliyojitolea kwa elimu na kupanga. Rekodi ya kuendelea ina umuhimu zaidi kuliko hapo awali hapa: historia wazi, yenye tarehe ya vault ya mwelekeo wa eGFR, matokeo ya damu, dawa za sasa (pamoja na dose), shinikizo la damu, uzito, na maamuzi yoyote yaliyofanywa kuhusu matibabu ya baadaye. Rekodi hii ndiyo inayoruhusu daktari yeyote — katika kliniki ya figo, katika dharura, au katika kituo kipya — kuendelea na huduma kwa usalama. Ujumbe katika G4: hii ni hatua ya maandalizi ya makini na ulinzi hai, inayotembewa pamoja na timu ya wataalamu.',
      sw_mtaa: 'Ufuatiliaji katika hatua G4 ni wa mara kwa mara na unaoongozwa na mtaalamu — kawaida chini ya kliniki ya figo, na eGFR, vipimo vya damu, presha, na mapitio ya dalili kila wiki chache hadi miezi kulingana na uthabiti, pamoja na miadi iliyojitolea kwa elimu na kupanga. Rekodi ya kuendelea ina umuhimu zaidi kuliko hapo awali hapa: historia wazi, yenye tarehe ya vault ya mwelekeo wa eGFR, matokeo ya damu, dawa za sasa (pamoja na dose), presha, uzito, na maamuzi yoyote yaliyofanywa kuhusu matibabu ya baadaye. Rekodi hii ndiyo inayoruhusu daktari yeyote — katika kliniki ya figo, katika dharura, au katika kituo kipya — kuendelea na huduma kwa usalama. Ujumbe katika G4: hii ni hatua ya maandalizi ya makini na ulinzi hai, inayotembewa pamoja na timu ya wataalamu.',
    },
    sources: [src('KDIGO_CKD_2024'), src('NTLG_STG_2023'), src('MUHIMBILI_PROTOCOLS')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 4. KIDNEY FAILURE — STAGE G5 / END-STAGE
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'ckd_kidney_failure',
    severity: 'critical',
    label: {
      en: 'Kidney failure — end-stage kidney disease (G5)',
      sw: 'Figo kushindwa — hatua ya mwisho (G5)',
    },
    presentation: {
      en: 'Kidney failure (stage G5, eGFR below 15) means the kidneys can no longer do enough of their work to keep the body well on their own. This is also called end-stage kidney disease. Symptoms are usually present and can be significant: severe tiredness, nausea and poor appetite, swelling, breathlessness, itching, difficulty concentrating, and disturbed sleep. At this stage, a treatment to replace kidney function — dialysis or a transplant — is usually needed, or, for some people (often those who are elderly or have other serious illnesses), a carefully chosen path of conservative care focused on symptom control and quality of life. This is a serious stage, but it is one that is reached by a planned path for most people, and there are real, well-established treatment options. The decisions here are made together — the person, their family, and the kidney team.',
      sw: 'Figo kushindwa (hatua G5, eGFR chini ya 15) maana yake figo haziwezi tena kufanya kazi yao ya kutosha kuweka mwili vizuri peke yao. Hii pia inaitwa ugonjwa wa figo wa hatua ya mwisho. Dalili kwa kawaida zipo na zinaweza kuwa kubwa: uchovu mkali, kichefuchefu na hamu mbaya ya kula, uvimbe, kushindwa kupumua, kuwasha, ugumu wa kuzingatia, na usingizi uliovurugika. Katika hatua hii, matibabu ya kubadilisha utendaji wa figo — dialysis au upandikizaji — kwa kawaida yanahitajika, au, kwa watu wengine (mara nyingi wale walio wazee au wenye magonjwa mengine makubwa), njia iliyochaguliwa kwa makini ya huduma ya kihafidhina inayolenga udhibiti wa dalili na ubora wa maisha. Hii ni hatua kubwa, lakini ni ambayo hufikiwa kwa njia iliyopangwa kwa watu wengi, na kuna chaguo za matibabu za kweli, zilizowekwa vizuri. Maamuzi hapa hufanywa pamoja — mtu, familia yake, na timu ya figo.',
      sw_mtaa: 'Figo kushindwa (hatua G5, eGFR chini ya 15) maana yake figo haziwezi tena kufanya kazi yao ya kutosha kuweka mwili vizuri peke yao. Hii pia inaitwa ugonjwa wa figo wa hatua ya mwisho. Dalili kwa kawaida zipo na zinaweza kuwa kubwa: uchovu mkali, kichefuchefu na hamu mbaya ya kula, uvimbe, kushindwa kupumua, kuwasha, ugumu wa kuzingatia, na usingizi uliovurugika. Katika hatua hii, matibabu ya kubadilisha kazi ya figo — dialysis au upandikizaji — kwa kawaida yanahitajika, au, kwa watu wengine (mara nyingi wale walio wazee au wenye magonjwa mengine makubwa), njia iliyochaguliwa kwa makini ya huduma ya kihafidhina inayolenga udhibiti wa dalili na ubora wa maisha. Hii ni hatua kubwa, lakini ni ambayo inafikiwa kwa njia iliyopangwa kwa watu wengi, na kuna chaguo za matibabu za kweli, zilizowekwa vizuri. Maamuzi hapa yanafanywa pamoja — mtu, familia yake, na timu ya figo.',
    },
    recognitionSigns: [
      {
        en: 'eGFR below 15',
        sw: 'eGFR chini ya 15',
        sw_mtaa: 'eGFR chini ya 15',
      },
      {
        en: 'Symptoms usually present: severe tiredness, nausea, poor appetite, swelling, breathlessness, itching',
        sw: 'Dalili kwa kawaida zipo: uchovu mkali, kichefuchefu, hamu mbaya ya kula, uvimbe, kushindwa kupumua, kuwasha',
        sw_mtaa: 'Dalili kwa kawaida zipo: uchovu mkali, kichefuchefu, hamu mbaya ya kula, uvimbe, kushindwa kupumua, kuwasha',
      },
      {
        en: 'A treatment to replace kidney function (dialysis or transplant) — or planned conservative care — is needed',
        sw: 'Matibabu ya kubadilisha utendaji wa figo (dialysis au upandikizaji) — au huduma ya kihafidhina iliyopangwa — yanahitajika',
        sw_mtaa: 'Matibabu ya kubadilisha kazi ya figo (dialysis au upandikizaji) — au huduma ya kihafidhina iliyopangwa — yanahitajika',
      },
    ],
    treatmentJourney: {
      en: 'At kidney failure there are three broad paths, chosen together with the kidney team based on the person\'s health, wishes, and circumstances. Haemodialysis uses a machine to filter the blood, usually at a dialysis centre several times a week. Peritoneal dialysis uses the lining of the abdomen to filter, and can often be done at home. Kidney transplant — receiving a healthy kidney from a living or deceased donor — offers the closest thing to normal kidney function, though it involves an assessment process, surgery, and lifelong medicines to protect the new kidney. For some people, especially those who are frail or have other serious conditions, conservative (non-dialysis) care is a valid and dignified choice, focused on managing symptoms and quality of life. Alongside whichever path is chosen, the management of blood pressure, anaemia, bone-mineral balance, fluid, and diet continues. In Tanzania, access to dialysis and transplant varies by region, so planning early — while still in stage G4 — makes these paths smoother.',
      sw: 'Katika figo kushindwa kuna njia kuu tatu, zinazochaguliwa pamoja na timu ya figo kulingana na afya ya mtu, matakwa, na mazingira. Haemodialysis hutumia mashine kuchuja damu, kawaida katika kituo cha dialysis mara kadhaa kwa wiki. Peritoneal dialysis hutumia utando wa tumbo kuchuja, na mara nyingi inaweza kufanywa nyumbani. Upandikizaji wa figo — kupokea figo yenye afya kutoka kwa mtoaji aliye hai au aliyefariki — hutoa kitu cha karibu zaidi na utendaji wa kawaida wa figo, ingawa unahusisha mchakato wa tathmini, upasuaji, na dawa za maisha za kulinda figo mpya. Kwa watu wengine, hasa wale walio dhaifu au wenye hali zingine kubwa, huduma ya kihafidhina (isiyo ya dialysis) ni chaguo halali na lenye heshima, linalolenga kusimamia dalili na ubora wa maisha. Pamoja na njia yoyote inayochaguliwa, usimamizi wa shinikizo la damu, upungufu wa damu, uwiano wa madini ya mfupa, maji, na lishe huendelea. Tanzania, ufikiaji wa dialysis na upandikizaji hutofautiana kwa eneo, hivyo kupanga mapema — wakati bado katika hatua G4 — hufanya njia hizi laini.',
      sw_mtaa: 'Katika figo kushindwa kuna njia kuu tatu, zinazochaguliwa pamoja na timu ya figo kulingana na afya ya mtu, matakwa, na mazingira. Haemodialysis inatumia mashine kuchuja damu, kawaida katika kituo cha dialysis mara kadhaa kwa wiki. Peritoneal dialysis inatumia utando wa tumbo kuchuja, na mara nyingi inaweza kufanywa nyumbani. Upandikizaji wa figo — kupokea figo yenye afya kutoka kwa mtoaji aliye hai au aliyefariki — unatoa kitu cha karibu zaidi na kazi ya kawaida ya figo, ingawa unahusisha mchakato wa tathmini, upasuaji, na dawa za maisha za kulinda figo mpya. Kwa watu wengine, hasa wale walio dhaifu au wenye hali zingine kubwa, huduma ya kihafidhina (isiyo ya dialysis) ni chaguo halali na lenye heshima, linalolenga kusimamia dalili na ubora wa maisha. Pamoja na njia yoyote inayochaguliwa, usimamizi wa presha, upungufu wa damu, uwiano wa madini ya mfupa, maji, na lishe unaendelea. Tanzania, ufikiaji wa dialysis na upandikizaji unatofautiana kwa eneo, hivyo kupanga mapema — wakati bado katika hatua G4 — kunafanya njia hizi laini.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe breathlessness or unable to lie flat — possible life-threatening fluid overload. EMERGENCY',
          sw: 'Kushindwa kupumua kali au kushindwa kulala kwa gorofa — uwezekano wa maji kupita kiasi hatari kwa maisha. DHARURA',
          sw_mtaa: 'Kushindwa kupumua kali au kushindwa kulala kwa gorofa — uwezekano wa maji kupita kiasi hatari kwa maisha. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Chest pain, palpitations, severe muscle weakness, or collapse — possible dangerous potassium level. EMERGENCY',
          sw: 'Maumivu ya kifua, mapigo ya moyo, udhaifu mkali wa misuli, au kuanguka — uwezekano wa kiwango cha potasiamu hatari. DHARURA',
          sw_mtaa: 'Maumivu ya kifua, mapigo ya moyo, udhaifu mkali wa misuli, au kuanguka — uwezekano wa kiwango cha potasiamu hatari. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Confusion, severe drowsiness, or seizures — possible severe uraemia. EMERGENCY',
          sw: 'Kuchanganyikiwa, usingizi mzito sana, au kifafa — uwezekano wa uraemia kali. DHARURA',
          sw_mtaa: 'Kuchanganyikiwa, usingizi mzito sana, au kifafa — uwezekano wa uraemia kali. DHARURA',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Follow-up at kidney failure is intensive and led by the kidney team, shaped by the path chosen — regular dialysis sessions and reviews, transplant assessment and preparation, or structured conservative-care reviews. Across all paths, blood tests, fluid and weight monitoring, blood pressure, and symptom control continue. The continuity record is critical: the vault should hold the eGFR history, the treatment decision and its reasoning, the current medicine list with doses, dialysis access details if relevant, transplant assessment status if relevant, and an up-to-date summary that any clinician or emergency team can read quickly. The message: kidney failure is a serious stage, but it is a stage with real treatment paths — and good record-keeping keeps care safe and coordinated across every facility involved.',
      sw: 'Ufuatiliaji katika figo kushindwa ni mkubwa na unaoongozwa na timu ya figo, ukiwa umeundwa na njia iliyochaguliwa — vipindi vya dialysis vya mara kwa mara na mapitio, tathmini na maandalizi ya upandikizaji, au mapitio ya huduma ya kihafidhina yenye mpangilio. Katika njia zote, vipimo vya damu, ufuatiliaji wa maji na uzito, shinikizo la damu, na udhibiti wa dalili huendelea. Rekodi ya kuendelea ni muhimu sana: vault inapaswa kushikilia historia ya eGFR, uamuzi wa matibabu na sababu zake, orodha ya dawa za sasa pamoja na dose, maelezo ya ufikiaji wa dialysis ikiwa yanahusika, hali ya tathmini ya upandikizaji ikiwa inahusika, na muhtasari wa kisasa ambao daktari yeyote au timu ya dharura inaweza kusoma haraka. Ujumbe: figo kushindwa ni hatua kubwa, lakini ni hatua yenye njia za matibabu za kweli — na uwekaji rekodi mzuri huweka huduma salama na iliyoratibiwa katika kila kituo kinachohusika.',
      sw_mtaa: 'Ufuatiliaji katika figo kushindwa ni mkubwa na unaoongozwa na timu ya figo, ukiwa umeundwa na njia iliyochaguliwa — vipindi vya dialysis vya mara kwa mara na mapitio, tathmini na maandalizi ya upandikizaji, au mapitio ya huduma ya kihafidhina yenye mpangilio. Katika njia zote, vipimo vya damu, ufuatiliaji wa maji na uzito, presha, na udhibiti wa dalili vinaendelea. Rekodi ya kuendelea ni muhimu sana: vault inapaswa kushikilia historia ya eGFR, uamuzi wa matibabu na sababu zake, orodha ya dawa za sasa pamoja na dose, maelezo ya ufikiaji wa dialysis ikiwa yanahusika, hali ya tathmini ya upandikizaji ikiwa inahusika, na muhtasari wa kisasa ambao daktari yeyote au timu ya dharura inaweza kusoma haraka. Ujumbe: figo kushindwa ni hatua kubwa, lakini ni hatua yenye njia za matibabu za kweli — na uwekaji rekodi mzuri unaweka huduma salama na iliyoratibiwa katika kila kituo kinachohusika.',
    },
    sources: [src('KDIGO_CKD_2024'), src('NTLG_STG_2023'), src('MUHIMBILI_PROTOCOLS')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 5. DIALYSIS — LIFE ON RENAL REPLACEMENT THERAPY
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'ckd_dialysis',
    severity: 'continuity',
    label: {
      en: 'CKD — life on dialysis',
      sw: 'CKD — maisha kwenye dialysis',
    },
    presentation: {
      en: 'Dialysis is a treatment that does some of the work the kidneys can no longer do — removing waste and extra fluid and helping balance the blood. A person on dialysis is living with kidney failure, but with a treatment that makes a full life possible: many people on dialysis work, travel, and care for their families. There are two main types. Haemodialysis filters the blood through a machine, usually at a dialysis centre, typically three times a week for a few hours each session. Peritoneal dialysis uses the lining of the abdomen as a natural filter, with fluid exchanges done several times a day, often at home. Both are demanding routines, and life on dialysis has its hard days — but it is a stable, ongoing form of care, not a crisis, and it is a routine that thousands of people sustain for many years.',
      sw: 'Dialysis ni matibabu yanayofanya baadhi ya kazi ambazo figo haziwezi tena kufanya — kuondoa taka na maji ya ziada na kusaidia kusawazisha damu. Mtu aliye kwenye dialysis anaishi na figo kushindwa, lakini na matibabu yanayofanya maisha kamili yawezekane: watu wengi walio kwenye dialysis hufanya kazi, husafiri, na kutunza familia zao. Kuna aina kuu mbili. Haemodialysis huchuja damu kupitia mashine, kawaida katika kituo cha dialysis, kwa kawaida mara tatu kwa wiki kwa masaa machache kila kipindi. Peritoneal dialysis hutumia utando wa tumbo kama kichujio cha asili, na ubadilishaji wa maji unaofanywa mara kadhaa kwa siku, mara nyingi nyumbani. Zote ni taratibu zinazohitaji bidii, na maisha kwenye dialysis yana siku zake ngumu — lakini ni aina imara, inayoendelea ya huduma, sio mzozo, na ni utaratibu ambao maelfu ya watu hudumisha kwa miaka mingi.',
      sw_mtaa: 'Dialysis ni matibabu yanayofanya baadhi ya kazi ambazo figo haziwezi tena kufanya — kuondoa taka na maji ya ziada na kusaidia kusawazisha damu. Mtu aliye kwenye dialysis anaishi na figo kushindwa, lakini na matibabu yanayofanya maisha kamili yawezekane: watu wengi walio kwenye dialysis wanafanya kazi, wanasafiri, na kutunza familia zao. Kuna aina kuu mbili. Haemodialysis inachuja damu kupitia mashine, kawaida katika kituo cha dialysis, kwa kawaida mara tatu kwa wiki kwa masaa machache kila kipindi. Peritoneal dialysis inatumia utando wa tumbo kama kichujio cha asili, na ubadilishaji wa maji unaofanywa mara kadhaa kwa siku, mara nyingi nyumbani. Zote ni taratibu zinazohitaji bidii, na maisha kwenye dialysis yana siku zake ngumu — lakini ni aina imara, inayoendelea ya huduma, sio mzozo, na ni utaratibu ambao maelfu ya watu wanadumisha kwa miaka mingi.',
    },
    recognitionSigns: [
      {
        en: 'Established on haemodialysis or peritoneal dialysis for kidney failure',
        sw: 'Ameimarishwa kwenye haemodialysis au peritoneal dialysis kwa figo kushindwa',
        sw_mtaa: 'Ameimarishwa kwenye haemodialysis au peritoneal dialysis kwa figo kushindwa',
      },
      {
        en: 'Living with a structured treatment routine — sessions at a centre, or fluid exchanges at home',
        sw: 'Anaishi na utaratibu wa matibabu wenye mpangilio — vipindi kituoni, au ubadilishaji wa maji nyumbani',
        sw_mtaa: 'Anaishi na utaratibu wa matibabu wenye mpangilio — vipindi kituoni, au ubadilishaji wa maji nyumbani',
      },
      {
        en: 'Ongoing attention to fluid, diet, the dialysis access, and other medicines',
        sw: 'Uangalifu unaoendelea kwa maji, lishe, ufikiaji wa dialysis, na dawa zingine',
        sw_mtaa: 'Uangalifu unaoendelea kwa maji, lishe, ufikiaji wa dialysis, na dawa zingine',
      },
    ],
    treatmentJourney: {
      en: 'Life on dialysis runs on a steady set of routines, and getting good at them is what keeps a person well. Attending every dialysis session in full matters — missed or shortened sessions allow waste and fluid to build up. Between sessions, managing fluid intake as advised is one of the most important daily tasks, because the kidneys are no longer removing extra fluid. Diet guidance is usually specific — often around salt, potassium, phosphate, and fluid — and is best worked out with a dietitian. Protecting the dialysis access (the fistula or catheter) from injury and infection is essential, and any redness, pain, or swelling around it should be reported promptly. Other medicines continue — for blood pressure, anaemia, bone-mineral balance, and any other conditions — and the dialysis team coordinates them. Many people also remain on a transplant assessment pathway while on dialysis, since a transplant may still be an option later.',
      sw: 'Maisha kwenye dialysis huendesha kwa seti thabiti ya taratibu, na kuwa hodari katika hizo ndiko kunakomweka mtu vizuri. Kuhudhuria kila kipindi cha dialysis kikamilifu ni muhimu — vipindi vilivyokoswa au vilivyofupishwa huruhusu taka na maji kujilundika. Kati ya vipindi, kusimamia ulaji wa maji kama ilivyoshauriwa ni mojawapo ya kazi muhimu zaidi za kila siku, kwa sababu figo haziondoi tena maji ya ziada. Mwongozo wa lishe kwa kawaida ni maalum — mara nyingi kuhusu chumvi, potasiamu, fosfati, na maji — na ni bora kufanyiwa kazi na mtaalamu wa lishe. Kulinda ufikiaji wa dialysis (fistula au catheter) kutoka kwa jeraha na maambukizi ni muhimu, na wekundu wowote, maumivu, au uvimbe karibu nayo unapaswa kuripotiwa haraka. Dawa zingine huendelea — kwa shinikizo la damu, upungufu wa damu, uwiano wa madini ya mfupa, na hali nyingine yoyote — na timu ya dialysis huziratibu. Watu wengi pia hubaki kwenye njia ya tathmini ya upandikizaji wakiwa kwenye dialysis, kwani upandikizaji unaweza bado kuwa chaguo baadaye.',
      sw_mtaa: 'Maisha kwenye dialysis yanaendesha kwa seti thabiti ya taratibu, na kuwa hodari katika hizo ndiko kunakomweka mtu vizuri. Kuhudhuria kila kipindi cha dialysis kikamilifu ni muhimu — vipindi vilivyokoswa au vilivyofupishwa vinaruhusu taka na maji kujilundika. Kati ya vipindi, kusimamia ulaji wa maji kama ilivyoshauriwa ni mojawapo ya kazi muhimu zaidi za kila siku, kwa sababu figo haziondoi tena maji ya ziada. Mwongozo wa lishe kwa kawaida ni maalum — mara nyingi kuhusu chumvi, potasiamu, fosfati, na maji — na ni bora kufanyiwa kazi na mtaalamu wa lishe. Kulinda ufikiaji wa dialysis (fistula au catheter) kutoka kwa jeraha na maambukizi ni muhimu, na wekundu wowote, maumivu, au uvimbe karibu nayo unapaswa kuripotiwa haraka. Dawa zingine zinaendelea — kwa presha, upungufu wa damu, uwiano wa madini ya mfupa, na hali nyingine yoyote — na timu ya dialysis inaziratibu. Watu wengi pia wanabaki kwenye njia ya tathmini ya upandikizaji wakiwa kwenye dialysis, kwani upandikizaji unaweza bado kuwa chaguo baadaye.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe breathlessness or unable to lie flat, especially before a session — possible dangerous fluid overload. EMERGENCY',
          sw: 'Kushindwa kupumua kali au kushindwa kulala kwa gorofa, hasa kabla ya kipindi — uwezekano wa maji kupita kiasi hatari. DHARURA',
          sw_mtaa: 'Kushindwa kupumua kali au kushindwa kulala kwa gorofa, hasa kabla ya kipindi — uwezekano wa maji kupita kiasi hatari. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Fever, or redness, pain, pus, or swelling around the dialysis access — possible serious infection. Seek care urgently',
          sw: 'Homa, au wekundu, maumivu, usaha, au uvimbe karibu na ufikiaji wa dialysis — uwezekano wa maambukizi makubwa. Tafuta huduma kwa haraka',
          sw_mtaa: 'Homa, au wekundu, maumivu, usaha, au uvimbe karibu na ufikiaji wa dialysis — uwezekano wa maambukizi makubwa. Tafuta huduma kwa haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Chest pain, palpitations, severe weakness, or collapse — possible dangerous potassium or heart problem. EMERGENCY',
          sw: 'Maumivu ya kifua, mapigo ya moyo, udhaifu mkali, au kuanguka — uwezekano wa potasiamu hatari au tatizo la moyo. DHARURA',
          sw_mtaa: 'Maumivu ya kifua, mapigo ya moyo, udhaifu mkali, au kuanguka — uwezekano wa potasiamu hatari au tatizo la moyo. DHARURA',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Follow-up on dialysis is built into the routine itself — at each session the team checks weight, blood pressure, the access, and how the person is feeling, with regular blood tests to guide fluid removal, anaemia treatment, bone-mineral management, and overall balance. Periodic reviews look at the bigger picture, including transplant eligibility. The continuity record stays central: the vault should hold the dialysis schedule and type, access details, the medicine list with doses, recent blood results, a stable "dry weight" target, and a current summary — so that if the person needs care anywhere else (an emergency, travel, a new facility), the new team understands their situation immediately. The message: dialysis is a sustained, structured form of care — demanding, but liveable, and many people build full and meaningful lives around it.',
      sw: 'Ufuatiliaji kwenye dialysis umejengwa ndani ya utaratibu wenyewe — katika kila kipindi timu huangalia uzito, shinikizo la damu, ufikiaji, na jinsi mtu anavyojisikia, na vipimo vya damu vya mara kwa mara kuongoza uondoaji wa maji, matibabu ya upungufu wa damu, usimamizi wa madini ya mfupa, na uwiano wa jumla. Mapitio ya mara kwa mara huangalia picha kubwa zaidi, ikiwa ni pamoja na ustahiki wa upandikizaji. Rekodi ya kuendelea hubaki msingi: vault inapaswa kushikilia ratiba ya dialysis na aina, maelezo ya ufikiaji, orodha ya dawa pamoja na dose, matokeo ya damu ya hivi karibuni, lengo thabiti la "uzito kavu", na muhtasari wa sasa — ili ikiwa mtu anahitaji huduma mahali pengine popote (dharura, safari, kituo kipya), timu mpya inaelewa hali yake mara moja. Ujumbe: dialysis ni aina endelevu, yenye mpangilio ya huduma — inayohitaji bidii, lakini inayowezekana kuishi, na watu wengi hujenga maisha kamili na yenye maana karibu nayo.',
      sw_mtaa: 'Ufuatiliaji kwenye dialysis umejengwa ndani ya utaratibu wenyewe — katika kila kipindi timu inaangalia uzito, presha, ufikiaji, na jinsi mtu anavyojisikia, na vipimo vya damu vya mara kwa mara kuongoza uondoaji wa maji, matibabu ya upungufu wa damu, usimamizi wa madini ya mfupa, na uwiano wa jumla. Mapitio ya mara kwa mara yanaangalia picha kubwa zaidi, ikiwa ni pamoja na ustahiki wa upandikizaji. Rekodi ya kuendelea inabaki msingi: vault inapaswa kushikilia ratiba ya dialysis na aina, maelezo ya ufikiaji, orodha ya dawa pamoja na dose, matokeo ya damu ya hivi karibuni, lengo thabiti la "uzito kavu", na muhtasari wa sasa — ili ikiwa mtu anahitaji huduma mahali pengine popote (dharura, safari, kituo kipya), timu mpya inaelewa hali yake mara moja. Ujumbe: dialysis ni aina endelevu, yenye mpangilio ya huduma — inayohitaji bidii, lakini inayowezekana kuishi, na watu wengi wanajenga maisha kamili na yenye maana karibu nayo.',
    },
    sources: [src('KDIGO_CKD_2024'), src('MUHIMBILI_PROTOCOLS'), src('NTLG_STG_2023')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 6. KIDNEY TRANSPLANT — AWARENESS AND JOURNEY
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'ckd_transplant',
    severity: 'continuity',
    label: {
      en: 'CKD — kidney transplant',
      sw: 'CKD — upandikizaji wa figo',
    },
    presentation: {
      en: 'A kidney transplant is an operation to place a healthy kidney — from a living donor (often a relative) or a deceased donor — into a person with kidney failure. A successful transplant offers the closest thing to natural kidney function, and for many people a better quality of life than dialysis, with fewer dietary and fluid restrictions. It is not a cure and not effortless: it requires a thorough assessment to make sure it is safe, an operation, and lifelong medicines (immunosuppressants) that stop the body rejecting the new kidney. Those medicines bring their own responsibilities — they must be taken exactly as prescribed, every day, for the life of the transplant, and they raise the risk of infections, so attention to health is ongoing. For the right person, a transplant is a transformative option; the journey to it, and the care after it, are both lifelong commitments walked with a specialist team.',
      sw: 'Upandikizaji wa figo ni operesheni ya kuweka figo yenye afya — kutoka kwa mtoaji aliye hai (mara nyingi jamaa) au mtoaji aliyefariki — ndani ya mtu mwenye figo kushindwa. Upandikizaji uliofanikiwa hutoa kitu cha karibu zaidi na utendaji wa asili wa figo, na kwa watu wengi ubora bora wa maisha kuliko dialysis, na vizuizi vichache vya lishe na maji. Sio tiba na sio bila juhudi: unahitaji tathmini ya kina kuhakikisha ni salama, operesheni, na dawa za maisha (immunosuppressants) zinazozuia mwili kukataa figo mpya. Dawa hizo huleta majukumu yao — lazima zichukuliwe hasa kama zilivyoagizwa, kila siku, kwa maisha ya upandikizaji, na huongeza hatari ya maambukizi, hivyo uangalifu kwa afya unaendelea. Kwa mtu sahihi, upandikizaji ni chaguo la kubadilisha; safari ya kuufikia, na huduma baada yake, zote ni ahadi za maisha zinazotembewa na timu ya wataalamu.',
      sw_mtaa: 'Upandikizaji wa figo ni operesheni ya kuweka figo yenye afya — kutoka kwa mtoaji aliye hai (mara nyingi jamaa) au mtoaji aliyefariki — ndani ya mtu mwenye figo kushindwa. Upandikizaji uliofanikiwa unatoa kitu cha karibu zaidi na kazi ya asili ya figo, na kwa watu wengi ubora bora wa maisha kuliko dialysis, na vizuizi vichache vya lishe na maji. Sio tiba na sio bila juhudi: unahitaji tathmini ya kina kuhakikisha ni salama, operesheni, na dawa za maisha (immunosuppressants) zinazozuia mwili kukataa figo mpya. Dawa hizo zinaleta majukumu yao — lazima zichukuliwe hasa kama zilivyoagizwa, kila siku, kwa maisha ya upandikizaji, na zinaongeza hatari ya maambukizi, hivyo uangalifu kwa afya unaendelea. Kwa mtu sahihi, upandikizaji ni chaguo la kubadilisha; safari ya kuufikia, na huduma baada yake, zote ni ahadi za maisha zinazotembewa na timu ya wataalamu.',
    },
    recognitionSigns: [
      {
        en: 'Being assessed for, waiting for, or living after a kidney transplant',
        sw: 'Kufanyiwa tathmini ya, kusubiri, au kuishi baada ya upandikizaji wa figo',
        sw_mtaa: 'Kufanyiwa tathmini ya, kusubiri, au kuishi baada ya upandikizaji wa figo',
      },
      {
        en: 'After transplant: on lifelong immunosuppressant medicines that must never be missed',
        sw: 'Baada ya upandikizaji: kwenye dawa za maisha za immunosuppressant ambazo kamwe haziwezi kukoswa',
        sw_mtaa: 'Baada ya upandikizaji: kwenye dawa za maisha za immunosuppressant ambazo kamwe haziwezi kukoswa',
      },
      {
        en: 'Higher attention to infections, and regular monitoring of the transplanted kidney',
        sw: 'Uangalifu wa juu kwa maambukizi, na ufuatiliaji wa mara kwa mara wa figo iliyopandikizwa',
        sw_mtaa: 'Uangalifu wa juu kwa maambukizi, na ufuatiliaji wa mara kwa mara wa figo iliyopandikizwa',
      },
    ],
    treatmentJourney: {
      en: 'The transplant journey has clear phases. Assessment makes sure a transplant would be safe and worthwhile, and checks the health of both the recipient and any potential living donor. The wait can be long, especially for a deceased-donor kidney, and dialysis usually continues during it. The operation places the new kidney; the original kidneys are usually left in place. After the transplant, the central, lifelong task is taking immunosuppressant medicines exactly as prescribed — these are what keep the body from rejecting the kidney, and missing them is the biggest avoidable cause of losing a transplant. Because these medicines lower the body\'s defences, protecting against infection becomes a daily habit, and any fever or feeling unwell is taken seriously. Monitoring is frequent at first — blood tests for kidney function and medicine levels — then settles into a regular long-term schedule. In Tanzania, transplant services are concentrated in specialist centres, so the journey usually involves referral and coordinated care.',
      sw: 'Safari ya upandikizaji ina awamu wazi. Tathmini huhakikisha upandikizaji ungekuwa salama na wenye thamani, na huangalia afya ya mpokeaji na mtoaji yeyote anayewezekana aliye hai. Kusubiri kunaweza kuwa kwa muda mrefu, hasa kwa figo ya mtoaji aliyefariki, na dialysis kwa kawaida huendelea wakati huo. Operesheni huweka figo mpya; figo za awali kwa kawaida huachwa mahali pake. Baada ya upandikizaji, kazi kuu ya maisha ni kuchukua dawa za immunosuppressant hasa kama zilivyoagizwa — hizi ndizo zinazozuia mwili kukataa figo, na kuzikosa ni sababu kubwa zaidi inayoweza kuepukwa ya kupoteza upandikizaji. Kwa sababu dawa hizi hushusha ulinzi wa mwili, kujilinda dhidi ya maambukizi kunakuwa tabia ya kila siku, na homa yoyote au kujisikia mgonjwa huchukuliwa kwa uzito. Ufuatiliaji ni wa mara kwa mara mwanzoni — vipimo vya damu kwa utendaji wa figo na viwango vya dawa — kisha hukaa katika ratiba ya kawaida ya muda mrefu. Tanzania, huduma za upandikizaji zimejikita katika vituo vya wataalamu, hivyo safari kwa kawaida huhusisha rufaa na huduma iliyoratibiwa.',
      sw_mtaa: 'Safari ya upandikizaji ina awamu wazi. Tathmini inahakikisha upandikizaji ungekuwa salama na wenye thamani, na inaangalia afya ya mpokeaji na mtoaji yeyote anayewezekana aliye hai. Kusubiri kunaweza kuwa kwa muda mrefu, hasa kwa figo ya mtoaji aliyefariki, na dialysis kwa kawaida inaendelea wakati huo. Operesheni inaweka figo mpya; figo za awali kwa kawaida zinaachwa mahali pake. Baada ya upandikizaji, kazi kuu ya maisha ni kuchukua dawa za immunosuppressant hasa kama zilivyoagizwa — hizi ndizo zinazozuia mwili kukataa figo, na kuzikosa ni sababu kubwa zaidi inayoweza kuepukwa ya kupoteza upandikizaji. Kwa sababu dawa hizi zinashusha ulinzi wa mwili, kujilinda dhidi ya maambukizi kunakuwa tabia ya kila siku, na homa yoyote au kujisikia mgonjwa kunachukuliwa kwa uzito. Ufuatiliaji ni wa mara kwa mara mwanzoni — vipimo vya damu kwa kazi ya figo na viwango vya dawa — kisha unakaa katika ratiba ya kawaida ya muda mrefu. Tanzania, huduma za upandikizaji zimejikita katika vituo vya wataalamu, hivyo safari kwa kawaida inahusisha rufaa na huduma iliyoratibiwa.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Fever, feeling unwell, or any sign of infection — in someone on immunosuppressants this is taken seriously and needs prompt care',
          sw: 'Homa, kujisikia mgonjwa, au ishara yoyote ya maambukizi — kwa mtu aliye kwenye immunosuppressants hili huchukuliwa kwa uzito na linahitaji huduma ya haraka',
          sw_mtaa: 'Homa, kujisikia mgonjwa, au ishara yoyote ya maambukizi — kwa mtu aliye kwenye immunosuppressants hili linachukuliwa kwa uzito na linahitaji huduma ya haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Pain or tenderness over the transplanted kidney, a sudden drop in urine output, or rapid swelling — possible rejection. Seek care urgently',
          sw: 'Maumivu au uchungu juu ya figo iliyopandikizwa, kupungua kwa ghafla kwa mkojo, au uvimbe wa haraka — uwezekano wa kukataliwa. Tafuta huduma kwa haraka',
          sw_mtaa: 'Maumivu au uchungu juu ya figo iliyopandikizwa, kupungua kwa ghafla kwa mkojo, au uvimbe wa haraka — uwezekano wa kukataliwa. Tafuta huduma kwa haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Running low on immunosuppressant medicine, or having missed doses — contact the transplant team immediately, do not just wait',
          sw: 'Kuwa na dawa kidogo ya immunosuppressant, au kukosa dose — wasiliana na timu ya upandikizaji mara moja, usisubiri tu',
          sw_mtaa: 'Kuwa na dawa kidogo ya immunosuppressant, au kukosa dose — wasiliana na timu ya upandikizaji mara moja, usisubiri tu',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Transplant follow-up is intensive at first — frequent blood tests for kidney function and medicine levels, and close review — then settles into a regular lifelong schedule with the transplant team. Across all of it, the immunosuppressant routine and infection awareness never relax. The continuity record is especially important after a transplant: the vault should hold the transplant date, the immunosuppressant regimen with exact doses, baseline and recent kidney function, the history of any rejection episodes or infections, and a clear summary — because any clinician who sees this person, anywhere, needs to know immediately that they have a transplant and are immunosuppressed. The message: a transplant can be life-changing, and protecting it is a lifelong partnership — between the person, the transplant team, and a well-kept record that travels with them.',
      sw: 'Ufuatiliaji wa upandikizaji ni mkubwa mwanzoni — vipimo vya damu vya mara kwa mara kwa utendaji wa figo na viwango vya dawa, na mapitio ya karibu — kisha hukaa katika ratiba ya kawaida ya maisha na timu ya upandikizaji. Katika yote hayo, utaratibu wa immunosuppressant na uelewa wa maambukizi kamwe hauregei. Rekodi ya kuendelea ni muhimu hasa baada ya upandikizaji: vault inapaswa kushikilia tarehe ya upandikizaji, regimen ya immunosuppressant pamoja na dose halisi, utendaji wa figo wa msingi na wa hivi karibuni, historia ya vipindi vyovyote vya kukataliwa au maambukizi, na muhtasari wazi — kwa sababu daktari yeyote anayemwona mtu huyu, popote, anahitaji kujua mara moja kwamba ana upandikizaji na ana kinga iliyokandamizwa. Ujumbe: upandikizaji unaweza kubadilisha maisha, na kuulinda ni ushirikiano wa maisha — kati ya mtu, timu ya upandikizaji, na rekodi iliyowekwa vizuri inayosafiri naye.',
      sw_mtaa: 'Ufuatiliaji wa upandikizaji ni mkubwa mwanzoni — vipimo vya damu vya mara kwa mara kwa kazi ya figo na viwango vya dawa, na mapitio ya karibu — kisha unakaa katika ratiba ya kawaida ya maisha na timu ya upandikizaji. Katika yote hayo, utaratibu wa immunosuppressant na uelewa wa maambukizi kamwe haupumziki. Rekodi ya kuendelea ni muhimu hasa baada ya upandikizaji: vault inapaswa kushikilia tarehe ya upandikizaji, regimen ya immunosuppressant pamoja na dose halisi, kazi ya figo ya msingi na ya hivi karibuni, historia ya vipindi vyovyote vya kukataliwa au maambukizi, na muhtasari wazi — kwa sababu daktari yeyote anayemwona mtu huyu, popote, anahitaji kujua mara moja kwamba ana upandikizaji na ana kinga iliyokandamizwa. Ujumbe: upandikizaji unaweza kubadilisha maisha, na kuulinda ni ushirikiano wa maisha — kati ya mtu, timu ya upandikizaji, na rekodi iliyowekwa vizuri inayosafiri naye.',
    },
    sources: [src('KDIGO_CKD_2024'), src('MUHIMBILI_PROTOCOLS'), src('NTLG_STG_2023')],
  },
];
