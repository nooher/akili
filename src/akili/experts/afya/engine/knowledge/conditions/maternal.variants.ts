/**
 * Maternal Care — Variants (Phase 7)
 *
 * Four variants representing the highest-impact patterns in Tanzanian
 * maternal care:
 *   • preeclampsia_eclampsia (critical) — hypertensive emergencies of
 *     pregnancy, HELLP, magnesium sulfate, delivery as definitive cure
 *   • pph (critical) — postpartum haemorrhage, uterotonics, recognition
 *     and first response
 *   • gdm_deep (complicated, pregnancy population) — pregnancy-specific
 *     glucose management; complements the gestational_diabetes alias in
 *     the Phase 2 diabetes block
 *   • anc_continuity (prevention) — WHO 8-contact ANC model, what each
 *     contact achieves, danger sign teaching
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const MATERNAL_VARIANTS: ConditionVariant[] = [
  // ──────────────────────────────────────────────────────────────────────
  // PRE-ECLAMPSIA / ECLAMPSIA
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'preeclampsia_eclampsia',
    severity: 'critical',
    population: 'pregnancy',
    label: {
      en: 'Pre-eclampsia / Eclampsia (including HELLP)',
      sw: 'Kifafa cha Mimba (Pre-eclampsia / Eclampsia, ikijumuisha HELLP)',
    },
    presentation: {
      en: 'A pregnant woman, typically after 20 weeks, with rising blood pressure (≥140/90) and protein in the urine. Severe pre-eclampsia adds danger features: BP ≥160/110, severe headache that does not respond to paracetamol, blurred or double vision, severe upper-right abdominal pain (just below the ribs, where the liver capsule stretches), sudden swelling of the face and hands, very low platelets, abnormal liver tests, or impaired kidney function. Eclampsia is when a woman with pre-eclampsia has a generalised seizure — it can happen suddenly, sometimes as the first sign, and can recur. HELLP syndrome (Haemolysis, Elevated Liver enzymes, Low Platelets) is a related severe form that can present mainly with that upper-right pain and feeling unwell, sometimes WITHOUT high blood pressure being prominent — which is exactly why it gets missed. All of these can develop in days, sometimes hours.',
      sw: 'Mwanamke mjamzito, kawaida baada ya wiki 20, na shinikizo la damu linaloongezeka (≥140/90) na protini kwenye mkojo. Pre-eclampsia kali huongeza dalili za hatari: BP ≥160/110, kichwa kikali kisichojibu paracetamol, kuona ukungu au mara mbili, maumivu makali ya tumbo la juu upande wa kulia (chini ya mbavu, ambapo capsule ya ini hunyooshwa), uvimbe wa ghafla wa uso na mikono, platelets za chini sana, vipimo vya ini visivyo vya kawaida, au utendaji wa figo uliodhoofika. Eclampsia ni wakati mwanamke mwenye pre-eclampsia ana degedege la jumla — linaweza kutokea ghafla, wakati mwingine kama dalili ya kwanza, na linaweza kurudia. HELLP syndrome (Haemolysis, Elevated Liver enzymes, Low Platelets) ni aina inayohusiana kali inayoweza kujitokeza hasa na maumivu hayo ya juu-kulia na kujihisi si mzima, wakati mwingine BILA shinikizo la damu kuonekana — ndio sababu inapotea. Yote haya yanaweza kuendelea ndani ya siku, wakati mwingine masaa.',
      sw_mtaa: 'Mwanamke mjamzito, kawaida baada ya wiki 20, na presha inayoongezeka (≥140/90) na protini kwenye mkojo. Severe pre-eclampsia inaongeza danger features: BP ≥160/110, kichwa kikali kisichojibu paracetamol, kuona ukungu au mara mbili, maumivu makali ya tumbo la juu upande wa kulia (chini ya mbavu, ambapo liver capsule inavutwa), uvimbe wa ghafla wa uso na mikono, platelets za chini sana, abnormal liver tests, au impaired kidney function. Eclampsia ni wakati mwanamke mwenye pre-eclampsia ana generalised seizure — inaweza kutokea ghafla, wakati mwingine kama first sign, na inaweza kurudia. HELLP syndrome (Haemolysis, Elevated Liver enzymes, Low Platelets) ni related severe form inayoweza kujitokeza hasa na maumivu hayo ya juu-kulia na kujihisi si mzima, wakati mwingine BILA presha kuonekana — ndio sababu inapotea. Yote haya yanaweza kuendelea ndani ya siku, wakati mwingine masaa.',
    },
    recognitionSigns: [
      {
        en: 'Blood pressure ≥140/90 on two readings, with protein in the urine, after 20 weeks of pregnancy',
        sw: 'Shinikizo la damu ≥140/90 katika usomaji mawili, na protini kwenye mkojo, baada ya wiki 20 za mimba',
        sw_mtaa: 'Presha ≥140/90 katika readings mbili, na protini kwenye mkojo, baada ya wiki 20 za mimba',
      },
      {
        en: 'BP ≥160/110 — severe range, regardless of symptoms',
        sw: 'BP ≥160/110 — kiwango kali, bila kujali dalili',
        sw_mtaa: 'BP ≥160/110 — severe range, bila kujali symptoms',
      },
      {
        en: 'Severe headache, blurred or double vision, flashing lights',
        sw: 'Kichwa kikali, kuona ukungu au mara mbili, mwanga unaomulika',
        sw_mtaa: 'Kichwa kikali, kuona ukungu au mara mbili, flashing lights',
      },
      {
        en: 'Severe upper-right abdominal pain (the liver-capsule pain of HELLP / severe pre-eclampsia)',
        sw: 'Maumivu makali ya tumbo la juu upande wa kulia (maumivu ya capsule ya ini ya HELLP / pre-eclampsia kali)',
        sw_mtaa: 'Maumivu makali ya tumbo la juu upande wa kulia (liver-capsule pain ya HELLP / severe pre-eclampsia)',
      },
      {
        en: 'Sudden swelling of the face and hands (different from the gradual ankle swelling many pregnant women get)',
        sw: 'Uvimbe wa ghafla wa uso na mikono (tofauti na uvimbe wa polepole wa vifundoni ambao wajawazito wengi hupata)',
        sw_mtaa: 'Sudden swelling wa uso na mikono (tofauti na gradual ankle swelling ambayo pregnant women wengi wanapata)',
      },
      {
        en: 'A generalised seizure in a pregnant or recently-delivered woman = eclampsia until proven otherwise',
        sw: 'Degedege la jumla kwa mwanamke mjamzito au aliyejifungua hivi karibuni = eclampsia hadi ithibitishwe vinginevyo',
        sw_mtaa: 'Generalised seizure kwa pregnant au recently-delivered woman = eclampsia hadi proven otherwise',
      },
    ],
    treatmentJourney: {
      en: 'Pre-eclampsia and eclampsia are treated in hospital with a team approach. The cornerstones: control the blood pressure with pregnancy-safe medicines (commonly labetalol, nifedipine, or methyldopa); give magnesium sulfate intravenously or intramuscularly to prevent or stop seizures — this is the single most life-saving intervention; give corticosteroids if the baby is preterm to help lung maturity; deliver the baby — the only definitive cure. Timing of delivery balances mother and baby: at term, deliver soon; preterm severe pre-eclampsia, deliver when stabilised regardless of gestation if the mother is at significant risk. Mode of delivery (vaginal vs caesarean) is decided per case. Continued magnesium sulfate cover for 24 hours after delivery, because seizures can still occur postpartum. Blood pressure and proteinuria are followed in the early postnatal period; some women need ongoing antihypertensives for weeks. This is hospital-level, specialist-supported care — not something to manage at home.',
      sw: 'Pre-eclampsia na eclampsia hutibiwa hospitalini kwa mbinu ya timu. Misingi: dhibiti shinikizo la damu kwa dawa salama za mimba (kawaida labetalol, nifedipine, au methyldopa); toa magnesium sulfate kwa njia ya mshipa au misuli kuzuia au kusimamisha degedege — hii ni hatua moja inayookoa maisha zaidi; toa corticosteroids ikiwa mtoto ni wa kabla ya wakati kusaidia kukomaa kwa mapafu; mzaa mtoto — tiba pekee ya uhakika. Wakati wa kujifungua hulinganisha mama na mtoto: katika muda kamili, jifungue hivi karibuni; pre-eclampsia kali ya kabla ya wakati, jifungue inapotulia bila kujali umri wa mimba ikiwa mama yuko katika hatari kubwa. Njia ya kujifungua (ukeni vs upasuaji) huamuliwa kwa kila kesi. Magnesium sulfate kuendelea kwa masaa 24 baada ya kujifungua, kwa sababu degedege bado linaweza kutokea baada ya kujifungua. Shinikizo la damu na proteinuria hufuatiliwa katika kipindi cha mapema cha baada ya kujifungua; baadhi ya wanawake huhitaji antihypertensives zinazoendelea kwa wiki. Hii ni huduma ya kiwango cha hospitali, inayoungwa mkono na wataalamu — sio kitu cha kusimamia nyumbani.',
      sw_mtaa: 'Pre-eclampsia na eclampsia zinatibiwa hospitalini kwa team approach. Misingi: dhibiti presha kwa pregnancy-safe medicines (kawaida labetalol, nifedipine, au methyldopa); toa magnesium sulfate IV au IM kuzuia au kusimamisha seizures — hii ni single most life-saving intervention; toa corticosteroids ikiwa mtoto ni preterm kusaidia lung maturity; mzaa mtoto — only definitive cure. Timing ya delivery inalinganisha mama na mtoto: at term, deliver soon; preterm severe pre-eclampsia, deliver inapotulia bila kujali gestation ikiwa mama yuko katika significant risk. Mode ya delivery (vaginal vs C-section) inaamuliwa per case. Continued magnesium sulfate cover kwa masaa 24 baada ya delivery, kwa sababu seizures bado zinaweza kutokea postpartum. Presha na proteinuria zinafuatiliwa katika early postnatal period; baadhi ya wanawake wanahitaji ongoing antihypertensives kwa wiki. Hii ni hospital-level, specialist-supported care — sio kitu cha kusimamia nyumbani.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'A seizure (eclampsia) — EMERGENCY: protect the airway, lay her on her side, get to hospital immediately; do not try to restrain or put anything in the mouth',
          sw: 'Degedege (eclampsia) — DHARURA: linda njia ya hewa, mlaze upande wake, fika hospitali mara moja; usijaribu kumzuia au kuweka kitu mdomoni',
          sw_mtaa: 'Seizure (eclampsia) — DHARURA: linda airway, mlaze upande wake, fika hospitali mara moja; usijaribu kumzuia au kuweka kitu mdomoni',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'BP ≥160/110, or severe headache with vision changes — EMERGENCY: severe pre-eclampsia, seizure is imminent without urgent treatment',
          sw: 'BP ≥160/110, au kichwa kikali na mabadiliko ya kuona — DHARURA: pre-eclampsia kali, degedege liko karibu bila matibabu ya haraka',
          sw_mtaa: 'BP ≥160/110, au kichwa kikali na vision changes — DHARURA: severe pre-eclampsia, seizure iko karibu bila urgent treatment',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Severe upper-right abdominal pain, feeling very unwell, with bleeding-easily / bruising-easily — possible HELLP. EMERGENCY',
          sw: 'Maumivu makali ya tumbo la juu upande wa kulia, kujihisi si mzima sana, pamoja na kuvuja damu kwa urahisi / kupata michubuko kwa urahisi — uwezekano wa HELLP. DHARURA',
          sw_mtaa: 'Maumivu makali ya tumbo la juu upande wa kulia, kujihisi si mzima sana, pamoja na kuvuja damu kwa urahisi / bruising — uwezekano wa HELLP. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Reduced fetal movements alongside any pre-eclampsia feature — EMERGENCY assessment',
          sw: 'Mwendo wa fetasi uliopungua pamoja na dalili yoyote ya pre-eclampsia — tathmini ya DHARURA',
          sw_mtaa: 'Reduced fetal movements pamoja na pre-eclampsia feature yoyote — EMERGENCY assessment',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'After delivery, BP is monitored closely for the first 48-72 hours and again at the 1-week and 6-week postnatal visits; pre-eclampsia can persist or even first appear postnatally. Some women need ongoing antihypertensives for weeks. The longer-term message matters: having had pre-eclampsia roughly doubles future cardiovascular risk, so this woman should have her BP checked yearly, manage her weight, eat well, exercise, and avoid smoking — and future pregnancies need early ANC referral and low-dose aspirin from week 12. Pre-eclampsia is not just a one-off pregnancy event; it is a window into long-term cardiovascular health.',
      sw: 'Baada ya kujifungua, BP hufuatiliwa kwa karibu kwa masaa 48-72 ya kwanza na tena katika ziara za wiki 1 na wiki 6 baada ya kujifungua; pre-eclampsia inaweza kuendelea au hata kujitokeza kwa mara ya kwanza baada ya kujifungua. Baadhi ya wanawake huhitaji antihypertensives zinazoendelea kwa wiki. Ujumbe wa muda mrefu zaidi unajali: kuwa na pre-eclampsia kwa takriban huongeza maradufu hatari ya moyo ya baadaye, hivyo mwanamke huyu anapaswa kupimwa BP kila mwaka, kudhibiti uzito wake, kula vizuri, kufanya mazoezi, na kuepuka kuvuta — na mimba za baadaye zinahitaji rufaa ya mapema ya ANC na aspirin ya dose ndogo kuanzia wiki 12. Pre-eclampsia sio tu tukio la mimba moja; ni dirisha la afya ya moyo ya muda mrefu.',
      sw_mtaa: 'Baada ya delivery, BP inafuatiliwa kwa karibu kwa masaa 48-72 ya kwanza na tena katika week-1 na week-6 postnatal visits; pre-eclampsia inaweza kuendelea au hata kujitokeza kwa first time postnatally. Baadhi ya wanawake wanahitaji ongoing antihypertensives kwa wiki. Long-term message inajali: kuwa na pre-eclampsia inaongeza roughly maradufu future cardiovascular risk, hivyo mwanamke huyu anapaswa kupimwa BP yearly, kudhibiti weight, kula vizuri, exercise, na kuepuka smoking — na future pregnancies zinahitaji early ANC referral na low-dose aspirin kuanzia wiki 12. Pre-eclampsia sio tu one-off pregnancy event; ni window katika long-term cardiovascular health.',
    },
    sources: [
      src('MOH_TZ_MATERNAL_2024'),
      src('WHO_PREECLAMPSIA_2023'),
      src('FIGO_PREECLAMPSIA_2024'),
      src('MUHIMBILI_PROTOCOLS'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // POSTPARTUM HAEMORRHAGE (PPH)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'pph',
    severity: 'critical',
    population: 'postpartum',
    label: {
      en: 'Postpartum Haemorrhage (PPH)',
      sw: 'Kutoka Damu Baada ya Kujifungua (PPH)',
    },
    presentation: {
      en: 'A woman who has just delivered (or delivered within the last 6 weeks) bleeding more than expected. Primary PPH is heavy bleeding in the first 24 hours after delivery — most commonly because the uterus has not contracted down properly (atonic uterus, by far the most common cause), or because of retained placental tissue, a tear (lower genital tract laceration), or a clotting problem. Secondary PPH is heavier-than-expected bleeding from 24 hours up to 6 weeks postpartum, often from retained tissue or infection. PPH can be deceptive: a woman can lose a dangerous volume of blood before she looks "shocky," especially if she started with anaemia (very common in Tanzanian pregnancies). The early signs of significant blood loss — paleness, racing heart, lightheadedness, sweating, low BP, confusion — must be recognised by family and birth attendants, not just clinical signs.',
      sw: 'Mwanamke ambaye amejifungua tu (au amejifungua ndani ya wiki 6 zilizopita) akitoka damu zaidi ya inavyotarajiwa. PPH ya msingi ni kutoka damu kwingi katika masaa 24 ya kwanza baada ya kujifungua — mara nyingi kwa sababu mji wa mimba haujajifunga vizuri (atonic uterus, sababu ya kawaida zaidi sana), au kwa sababu ya tishu ya placenta iliyobaki, mpasuko (laceration ya njia ya chini ya uzazi), au tatizo la ugando. PPH ya pili ni damu nzito zaidi ya inavyotarajiwa kutoka masaa 24 hadi wiki 6 baada ya kujifungua, mara nyingi kutoka kwa tishu iliyobaki au maambukizi. PPH inaweza kudanganya: mwanamke anaweza kupoteza kiasi cha hatari cha damu kabla ya kuonekana "anashokwa," hasa ikiwa alianza na upungufu wa damu (wa kawaida sana katika mimba za Tanzania). Dalili za mapema za kupoteza damu kubwa — kupauka, moyo unaopiga haraka, kuhisi nyepesi kichwani, jasho, BP ya chini, kuchanganyikiwa — lazima zitambuliwe na familia na wahudumu wa kujifungua, sio tu na dalili za kliniki.',
      sw_mtaa: 'Mwanamke ambaye amejifungua tu (au amejifungua ndani ya wiki 6 zilizopita) akitoka damu zaidi ya inavyotarajiwa. Primary PPH ni heavy bleeding katika masaa 24 ya kwanza baada ya delivery — mara nyingi kwa sababu uterus haijajifunga vizuri (atonic uterus, by far sababu ya kawaida zaidi), au kwa sababu ya retained placental tissue, tear (lower genital tract laceration), au clotting problem. Secondary PPH ni heavier-than-expected bleeding kutoka masaa 24 hadi wiki 6 postpartum, mara nyingi kutoka retained tissue au infection. PPH inaweza kuwa deceptive: mwanamke anaweza kupoteza dangerous volume ya damu kabla ya kuonekana "shocky," hasa ikiwa alianza na anaemia (very common katika mimba za Tanzania). Early signs za significant blood loss — paleness, racing heart, lightheadedness, sweating, low BP, kuchanganyikiwa — lazima zitambuliwe na family na birth attendants, sio tu clinical signs.',
    },
    recognitionSigns: [
      {
        en: 'Bleeding that soaks more than one pad an hour in the first 24 hours after delivery',
        sw: 'Damu inayolowanisha zaidi ya pedi moja kwa saa katika masaa 24 ya kwanza baada ya kujifungua',
        sw_mtaa: 'Bleeding inayolowanisha zaidi ya pedi moja kwa saa katika masaa 24 ya kwanza baada ya delivery',
      },
      {
        en: 'Passing large blood clots (bigger than a chicken egg), repeatedly',
        sw: 'Kutoa vipande vikubwa vya damu (vikubwa kuliko yai la kuku), mara kwa mara',
        sw_mtaa: 'Kutoa large blood clots (vikubwa kuliko yai la kuku), mara kwa mara',
      },
      {
        en: 'A sudden gush of blood after the first few quiet hours postpartum',
        sw: 'Damu inayobubujika ghafla baada ya masaa machache ya kwanza tulivu baada ya kujifungua',
        sw_mtaa: 'Sudden gush ya damu baada ya masaa machache ya kwanza tulivu postpartum',
      },
      {
        en: 'Feeling faint, dizzy, racing heart, sweating, paleness, confusion — signs of significant blood loss even if the visible bleeding looks moderate',
        sw: 'Kuhisi unazimia, kizunguzungu, moyo unaopiga haraka, jasho, kupauka, kuchanganyikiwa — dalili za kupoteza damu kubwa hata kama damu inayoonekana inaonekana wastani',
        sw_mtaa: 'Kuhisi unazimia, dizziness, racing heart, sweating, paleness, kuchanganyikiwa — signs za significant blood loss hata kama visible bleeding inaonekana moderate',
      },
      {
        en: 'A soft, "boggy" uterus that does not feel firm when pressed (atonic uterus, the leading cause)',
        sw: 'Mji wa mimba laini, "boggy" usiohisi imara unaposhindiliwa (atonic uterus, sababu kuu)',
        sw_mtaa: 'Soft, "boggy" uterus isiyohisi firm inaposhindiliwa (atonic uterus, leading cause)',
      },
    ],
    treatmentJourney: {
      en: 'PPH is a true obstetric emergency where minutes matter. Active management of the third stage of labour at every delivery — a uterotonic given right after the baby is born (oxytocin first-line; misoprostol where oxytocin storage or supply is not feasible) plus controlled cord traction — already prevents most cases. When PPH happens, the response is parallel: call for help, get IV access (two lines, large bore), give fluids, give more uterotonics (oxytocin infusion, then ergometrine, carboprost, or misoprostol per the local protocol and contraindications), uterine massage to encourage contraction, examine for retained tissue and tears, and check for clotting problems. Blood transfusion if blood loss is significant. If bleeding does not stop with medical measures, surgical/procedural options follow (balloon tamponade, compression sutures, uterine artery ligation, hysterectomy as last resort). For secondary PPH, the focus shifts to retained tissue and infection — often needing antibiotics and uterine evacuation. The entire pathway is hospital-based, team-based, and time-critical.',
      sw: 'PPH ni dharura halisi ya uzazi ambapo dakika zinajali. Usimamizi hai wa hatua ya tatu ya leba katika kila kujifungua — uterotonic inayotolewa mara baada ya mtoto kuzaliwa (oxytocin first-line; misoprostol mahali ambapo uhifadhi au ugavi wa oxytocin haupatikani) pamoja na controlled cord traction — tayari huzuia kesi nyingi. PPH inapotokea, jibu ni sambamba: piga simu kwa msaada, pata IV access (mistari miwili, mikubwa), toa kioevu, toa uterotonics zaidi (oxytocin infusion, kisha ergometrine, carboprost, au misoprostol kulingana na itifaki ya kienyeji na contraindications), uterine massage kuhimiza kupungua, chunguza tishu iliyobaki na mipasuko, na angalia matatizo ya ugando. Uhamisho wa damu ikiwa kupoteza damu ni kubwa. Ikiwa damu haisimami na hatua za kimatibabu, chaguzi za upasuaji/utaratibu zinafuata (balloon tamponade, compression sutures, uterine artery ligation, hysterectomy kama suluhisho la mwisho). Kwa PPH ya pili, mkazo unahamia kwa tishu iliyobaki na maambukizi — mara nyingi inahitaji antibiotics na uterine evacuation. Njia yote ni ya kiwango cha hospitali, ya timu, na ya wakati muhimu.',
      sw_mtaa: 'PPH ni true obstetric emergency ambapo dakika zinajali. Active management of third stage of labour katika kila delivery — uterotonic inayotolewa mara baada ya mtoto kuzaliwa (oxytocin first-line; misoprostol mahali ambapo oxytocin storage au supply haifeasible) pamoja na controlled cord traction — tayari inazuia most cases. PPH inapotokea, response ni parallel: piga simu kwa msaada, pata IV access (mistari miwili, large bore), toa fluids, toa uterotonics zaidi (oxytocin infusion, kisha ergometrine, carboprost, au misoprostol per local protocol na contraindications), uterine massage kuhimiza contraction, chunguza retained tissue na tears, na angalia clotting problems. Blood transfusion ikiwa blood loss ni significant. Ikiwa bleeding haisimami na medical measures, surgical/procedural options zinafuata (balloon tamponade, compression sutures, uterine artery ligation, hysterectomy kama last resort). Kwa secondary PPH, focus inahamia kwa retained tissue na infection — mara nyingi inahitaji antibiotics na uterine evacuation. Entire pathway ni hospital-based, team-based, na time-critical.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Heavy bleeding that does not slow down, large clots, sudden gushes — EMERGENCY: go to a facility NOW, do not wait',
          sw: 'Damu nyingi isiyopungua, vipande vikubwa, kububujika kwa ghafla — DHARURA: nenda kituo SASA, usisubiri',
          sw_mtaa: 'Heavy bleeding isiyopungua, large clots, sudden gushes — DHARURA: nenda kituo SASA, usisubiri',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Feeling faint, racing heart, paleness, sweating, confusion postpartum — EMERGENCY even if the visible bleeding seems "ok"',
          sw: 'Kuhisi unazimia, moyo unaopiga haraka, kupauka, jasho, kuchanganyikiwa baada ya kujifungua — DHARURA hata kama damu inayoonekana inaonekana "sawa"',
          sw_mtaa: 'Kuhisi unazimia, racing heart, paleness, sweating, kuchanganyikiwa postpartum — DHARURA hata kama visible bleeding inaonekana "ok"',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Fever, foul-smelling discharge, lower abdominal tenderness, with heavier-than-expected bleeding in the weeks after delivery — possible secondary PPH with infection. URGENT',
          sw: 'Homa, usaha wenye harufu mbaya, maumivu ya tumbo la chini, pamoja na damu nzito kuliko inavyotarajiwa katika wiki baada ya kujifungua — uwezekano wa PPH ya pili na maambukizi. HARAKA',
          sw_mtaa: 'Homa, foul-smelling discharge, lower abdominal tenderness, pamoja na heavier-than-expected bleeding katika wiki baada ya delivery — uwezekano wa secondary PPH na infection. URGENT',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'A woman who has had PPH needs careful postnatal follow-up — iron replacement (often for months), monitoring for anaemia, and screening for postnatal depression which is more common after a traumatic delivery. Counselling about future pregnancies matters: she is at higher risk of PPH again, so future deliveries should be at a facility with the staff and supplies to handle it. Some women want to talk through the event — psychological after-effects are real and valid. Record all the details in the vault: estimated blood loss, cause(s), interventions used, transfusions received — this matters for every future medical encounter.',
      sw: 'Mwanamke aliyepata PPH anahitaji ufuatiliaji wa makini wa baada ya kujifungua — uingizaji wa chuma (mara nyingi kwa miezi), ufuatiliaji wa upungufu wa damu, na uchunguzi wa unyogovu wa baada ya kujifungua ambao ni wa kawaida zaidi baada ya kujifungua kwa kiwewe. Ushauri kuhusu mimba za baadaye unajali: yuko katika hatari kubwa ya PPH tena, hivyo kujifungua kwa baadaye kunapaswa kuwa katika kituo chenye wafanyakazi na vifaa vya kushughulikia. Baadhi ya wanawake wanataka kuongea kuhusu tukio — athari za kisaikolojia ni za kweli na halali. Rekodi maelezo yote katika vault: kupoteza damu inayokadiriwa, sababu, hatua zilizotumika, transfusions zilizopokelewa — hii inajali kwa kila mkutano wa kimatibabu wa baadaye.',
      sw_mtaa: 'Mwanamke aliyepata PPH anahitaji careful postnatal follow-up — iron replacement (mara nyingi kwa miezi), monitoring kwa anaemia, na screening kwa postnatal depression ambayo ni more common baada ya traumatic delivery. Counselling kuhusu future pregnancies inajali: yuko katika higher risk ya PPH tena, hivyo future deliveries zinapaswa kuwa katika facility chenye staff na supplies za kushughulikia. Baadhi ya wanawake wanataka kuongea kuhusu event — psychological after-effects ni za kweli na valid. Record details zote katika vault: estimated blood loss, cause(s), interventions used, transfusions received — hii inajali kwa kila future medical encounter.',
    },
    sources: [
      src('MOH_TZ_MATERNAL_2024'),
      src('WHO_PPH_2017'),
      src('MUHIMBILI_PROTOCOLS'),
      src('NTLG_STG_2023'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // GESTATIONAL DIABETES (DEEP DIVE)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'gdm_deep',
    severity: 'complicated',
    population: 'pregnancy',
    label: {
      en: 'Gestational Diabetes Mellitus (GDM) — deep dive',
      sw: 'Kisukari cha Ujauzito (GDM) — kwa kina',
    },
    presentation: {
      en: 'A pregnant woman with high blood sugar first appearing in pregnancy — usually detected on routine screening between 24 and 28 weeks (sometimes earlier if there are risk factors: previous GDM, family history of diabetes, obesity, previous large baby, polycystic ovary syndrome). Most women feel completely well — GDM is silent, which is exactly why we screen. A minority present with the classic diabetes symptoms (excessive thirst, frequent urination, fatigue), and rarely the first sign is a complication: a baby growing larger than expected, polyhydramnios (extra amniotic fluid), or recurrent infections. The story differs from pre-existing type 1 or type 2 diabetes: GDM starts in pregnancy and usually resolves after delivery, but it leaves the mother at much higher lifetime risk of type 2 diabetes — which is why postnatal follow-up matters as much as pregnancy care.',
      sw: 'Mwanamke mjamzito mwenye sukari ya juu ya damu inayoonekana kwa mara ya kwanza katika mimba — kawaida hugunduliwa kwenye uchunguzi wa kawaida kati ya wiki 24 na 28 (wakati mwingine mapema ikiwa kuna risk factors: GDM ya awali, historia ya familia ya kisukari, unene, mtoto mkubwa wa awali, polycystic ovary syndrome). Wanawake wengi hujihisi vizuri kabisa — GDM ni kimya, ndio sababu hasa tunachunguza. Wachache hujitokeza na dalili za kawaida za kisukari (kiu kupita kiasi, kukojoa mara kwa mara, uchovu), na nadra dalili ya kwanza ni shida: mtoto anakua mkubwa zaidi ya inavyotarajiwa, polyhydramnios (kioevu cha ziada cha amniotic), au maambukizi yanayorudia. Hadithi inatofautiana na kisukari cha awali aina ya 1 au 2: GDM huanza katika mimba na kawaida hupotea baada ya kujifungua, lakini huacha mama katika hatari kubwa zaidi ya maisha ya kisukari aina ya 2 — ndio sababu ufuatiliaji wa baada ya kujifungua unajali kama huduma ya mimba.',
      sw_mtaa: 'Mwanamke mjamzito mwenye sugar ya juu ya damu inayoonekana kwa first time katika mimba — kawaida inagunduliwa kwenye routine screening kati ya wiki 24 na 28 (wakati mwingine mapema ikiwa kuna risk factors: previous GDM, family history ya kisukari, unene, previous large baby, PCOS). Wanawake wengi wanajihisi vizuri kabisa — GDM ni silent, ndio sababu hasa tunachunguza. Wachache wanajitokeza na classic diabetes symptoms (excessive thirst, frequent urination, fatigue), na nadra first sign ni complication: mtoto anakua mkubwa zaidi ya inavyotarajiwa, polyhydramnios (extra amniotic fluid), au recurrent infections. Hadithi inatofautiana na pre-existing type 1 au type 2 diabetes: GDM inaanza katika mimba na kawaida inapotea baada ya delivery, lakini inaacha mama katika much higher lifetime risk ya type 2 diabetes — ndio sababu postnatal follow-up inajali kama pregnancy care.',
    },
    recognitionSigns: [
      {
        en: 'Positive screening test (oral glucose tolerance test or fasting/random glucose) at routine ANC, usually 24-28 weeks',
        sw: 'Kipimo cha uchunguzi chanya (oral glucose tolerance test au fasting/random glucose) katika ANC ya kawaida, kawaida wiki 24-28',
        sw_mtaa: 'Positive screening test (oral glucose tolerance test au fasting/random glucose) katika routine ANC, kawaida wiki 24-28',
      },
      {
        en: 'Risk-factor profile: previous GDM, family diabetes, obesity, previous baby > 4 kg, PCOS, age > 35, certain ethnicities',
        sw: 'Wasifu wa risk factors: GDM ya awali, kisukari cha familia, unene, mtoto wa awali > kg 4, PCOS, umri > 35, makabila fulani',
        sw_mtaa: 'Risk-factor profile: previous GDM, family diabetes, obesity, previous baby > 4 kg, PCOS, umri > 35, certain ethnicities',
      },
      {
        en: 'Baby measuring large for gestational age on growth ultrasound or fundal-height measurement',
        sw: 'Mtoto akipima mkubwa kuliko umri wa mimba kwenye ultrasound ya ukuaji au kipimo cha fundal-height',
        sw_mtaa: 'Mtoto akipima large for gestational age kwenye growth ultrasound au fundal-height measurement',
      },
      {
        en: 'Glucose in the urine on dipstick — needs confirmation by blood test, but a clue',
        sw: 'Glukosi kwenye mkojo kwenye dipstick — inahitaji uthibitisho kwa kipimo cha damu, lakini ni dalili',
        sw_mtaa: 'Glucose kwenye mkojo kwenye dipstick — inahitaji uthibitisho kwa blood test, lakini ni clue',
      },
    ],
    treatmentJourney: {
      en: 'The treatment ladder for GDM in Tanzania: first, education and lifestyle — split meals into smaller, more frequent portions; reduce refined carbohydrates and sugary drinks; choose whole grains, beans, vegetables, fruit in moderation; gentle daily walking is helpful. Second, home blood glucose monitoring (fasting and 1-2 hours after meals), with targets set by the team (commonly fasting < 5.3 mmol/L; 1-hour postprandial < 7.8 mmol/L; 2-hour < 6.7 mmol/L — confirm against local protocol). Many women reach targets on lifestyle alone. Third, if targets are not met, add medicine: insulin is the gold standard in pregnancy, dosed and adjusted by the team; metformin is increasingly used in Tanzania and is considered safe. Fourth, regular ANC contacts intensified — growth scans to watch baby size, BP and urine to watch for pre-eclampsia (much more common in GDM), and delivery planning. Delivery is usually planned between 38 and 40 weeks if well-controlled; earlier if not. Mode of delivery is decided per case — well-controlled GDM does not in itself need a caesarean.',
      sw: 'Ngazi ya matibabu ya GDM Tanzania: kwanza, elimu na mtindo wa maisha — gawanya milo katika sehemu ndogo, za mara kwa mara zaidi; punguza wanga uliosafishwa na vinywaji vyenye sukari; chagua nafaka kamili, maharage, mboga, matunda kwa kiasi; kutembea kidogo kila siku husaidia. Pili, ufuatiliaji wa glukosi wa damu nyumbani (tumbo tupu na masaa 1-2 baada ya milo), na malengo yaliyowekwa na timu (kawaida fasting < 5.3 mmol/L; 1-hour postprandial < 7.8 mmol/L; 2-hour < 6.7 mmol/L — thibitisha dhidi ya itifaki ya kienyeji). Wanawake wengi hufikia malengo kwa mtindo wa maisha pekee. Tatu, ikiwa malengo hayafikiwi, ongeza dawa: insulin ni kiwango cha dhahabu katika mimba, dose na kurekebishwa na timu; metformin inazidi kutumika Tanzania na inachukuliwa kuwa salama. Nne, mawasiliano ya kawaida ya ANC yaliyoongezwa — growth scans kuangalia ukubwa wa mtoto, BP na mkojo kuangalia pre-eclampsia (ya kawaida zaidi katika GDM), na kupanga kujifungua. Kujifungua kawaida hupangwa kati ya wiki 38 na 40 ikiwa imedhibitiwa vizuri; mapema kama sio. Njia ya kujifungua huamuliwa kwa kila kesi — GDM iliyodhibitiwa vizuri haihitaji upasuaji wenyewe.',
      sw_mtaa: 'Treatment ladder ya GDM Tanzania: kwanza, education na lifestyle — split milo katika smaller, more frequent portions; punguza refined carbohydrates na sugary drinks; chagua whole grains, beans, mboga, fruit kwa moderation; gentle daily walking inasaidia. Pili, home blood glucose monitoring (fasting na masaa 1-2 baada ya milo), na targets zilizowekwa na team (kawaida fasting < 5.3 mmol/L; 1-hour postprandial < 7.8 mmol/L; 2-hour < 6.7 mmol/L — thibitisha against local protocol). Wanawake wengi wanafikia targets on lifestyle alone. Tatu, ikiwa targets hazifikiwi, ongeza dawa: insulin ni gold standard katika mimba, dosed na kurekebishwa na team; metformin inazidi kutumika Tanzania na inachukuliwa kuwa salama. Nne, regular ANC contacts intensified — growth scans kuangalia baby size, BP na mkojo kuangalia pre-eclampsia (much more common katika GDM), na delivery planning. Delivery kawaida inapangwa kati ya wiki 38 na 40 ikiwa well-controlled; earlier kama sio. Mode ya delivery inaamuliwa per case — well-controlled GDM haihitaji C-section yenyewe.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Symptoms suggesting pre-eclampsia (severe headache, vision changes, upper-right abdominal pain, sudden swelling) — much more common in GDM. EMERGENCY',
          sw: 'Dalili zinazoashiria pre-eclampsia (kichwa kikali, mabadiliko ya kuona, maumivu ya tumbo la juu upande wa kulia, uvimbe wa ghafla) — ya kawaida zaidi katika GDM. DHARURA',
          sw_mtaa: 'Symptoms zinazoashiria pre-eclampsia (kichwa kikali, vision changes, maumivu ya tumbo la juu upande wa kulia, sudden swelling) — much more common katika GDM. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Reduced fetal movements — possible problem with the baby; urgent assessment',
          sw: 'Mwendo wa fetasi uliopungua — uwezekano wa shida na mtoto; tathmini ya haraka',
          sw_mtaa: 'Reduced fetal movements — uwezekano wa problem na mtoto; urgent assessment',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Persistent very high or very low blood glucose readings despite adherence — needs prompt clinical review and treatment adjustment',
          sw: 'Usomaji wa glukosi ya damu ya juu sana au ya chini sana inayoendelea licha ya kuzingatia — kunahitaji mapitio ya haraka ya kliniki na marekebisho ya matibabu',
          sw_mtaa: 'Persistent very high au very low blood glucose readings licha ya adherence — inahitaji prompt clinical review na treatment adjustment',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Postnatal follow-up is essential and often neglected. Glucose targets relax to non-pregnancy ranges after delivery. Get screened for type 2 diabetes about 6-12 weeks postpartum with a fasting glucose or oral glucose tolerance test, and then every 1-3 years for life — having had GDM raises lifetime type 2 diabetes risk roughly 7-10 fold. Breastfeeding is encouraged: it benefits the baby and modestly lowers the mother\'s long-term diabetes risk. Lifestyle (weight management, activity, diet) continues to matter — this is one of the strongest opportunities to prevent type 2 diabetes that the health system gets. For future pregnancies, plan early ANC and early glucose screening, because GDM is likely to recur. Record all the details in the vault: targets, medications used, glucose log, delivery outcome, postpartum screening results.',
      sw: 'Ufuatiliaji wa baada ya kujifungua ni muhimu na mara nyingi unapuuzwa. Malengo ya glukosi hupumzika kwa viwango visivyo vya mimba baada ya kujifungua. Pimwa kisukari aina ya 2 karibu wiki 6-12 baada ya kujifungua kwa glukosi ya tumbo tupu au oral glucose tolerance test, na kisha kila miaka 1-3 maisha — kuwa na GDM huongeza hatari ya kisukari aina ya 2 ya maisha takriban mara 7-10. Kunyonyesha kunashauriwa: huleta faida kwa mtoto na hupunguza kwa kiasi cha wastani hatari ya kisukari ya muda mrefu ya mama. Mtindo wa maisha (usimamizi wa uzito, shughuli, lishe) bado unajali — hii ni mojawapo ya fursa zenye nguvu zaidi za kuzuia kisukari aina ya 2 ambayo mfumo wa afya hupata. Kwa mimba za baadaye, panga ANC ya mapema na uchunguzi wa glukosi wa mapema, kwa sababu GDM inaweza kurudia. Rekodi maelezo yote katika vault: malengo, dawa zilizotumika, glucose log, matokeo ya kujifungua, matokeo ya uchunguzi wa baada ya kujifungua.',
      sw_mtaa: 'Postnatal follow-up ni muhimu na mara nyingi unapuuzwa. Glucose targets zinapumzika kwa non-pregnancy ranges baada ya delivery. Pimwa type 2 diabetes karibu wiki 6-12 postpartum na fasting glucose au OGTT, na kisha kila miaka 1-3 maisha — kuwa na GDM inaongeza lifetime type 2 diabetes risk roughly mara 7-10. Kunyonyesha kunashauriwa: inaleta faida kwa mtoto na inapunguza kwa modest long-term diabetes risk ya mama. Lifestyle (weight management, activity, diet) bado inajali — hii ni mojawapo ya strongest opportunities za kuzuia type 2 diabetes ambayo health system inapata. Kwa future pregnancies, panga early ANC na early glucose screening, kwa sababu GDM inaweza kurudia. Record details zote katika vault: targets, medications used, glucose log, delivery outcome, postpartum screening results.',
    },
    sources: [
      src('MOH_TZ_MATERNAL_2024'),
      src('WHO_DIABETES_2024'),
      src('ADA_2024'),
      src('IDF_DIABETES_2025'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // ANC CONTINUITY — WHO 8-CONTACT MODEL
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'anc_continuity',
    severity: 'prevention',
    population: 'pregnancy',
    label: {
      en: 'Antenatal Care (ANC) — the 8-contact WHO model',
      sw: 'Huduma za Ujauzito (ANC) — modeli ya mawasiliano 8 ya WHO',
    },
    presentation: {
      en: 'Any pregnant woman engaging with antenatal care. The current WHO recommendation, adopted in Tanzania, is a minimum of 8 contacts during pregnancy — replacing the older 4-visit "focused ANC" model, because the evidence shows more contacts find and prevent more problems, especially in the second half of pregnancy. The expected schedule: first contact before 12 weeks, then around 20, 26, 30, 34, 36, 38, and 40 weeks. The aim is not just to "tick boxes" — each contact has a job. Early contacts confirm pregnancy and dating, screen blood for anaemia/HIV/syphilis/blood group/other tests, start protective medicines (iron, folate, tetanus, IPTp), and assess social and mental risks. Mid-pregnancy contacts monitor growth, screen for pre-eclampsia and GDM, start IPTp doses. Late contacts monitor baby position, plan the delivery, and watch closely for pre-eclampsia and reduced fetal movements. The biggest single predictor of complications being caught late is missing contacts.',
      sw: 'Mwanamke yeyote mjamzito anayeshiriki katika huduma za ujauzito. Mapendekezo ya sasa ya WHO, yaliyokubaliwa Tanzania, ni kiwango cha chini cha mawasiliano 8 wakati wa mimba — yakichukua nafasi ya modeli ya zamani ya ziara 4 ya "focused ANC", kwa sababu ushahidi unaonyesha mawasiliano zaidi hupata na kuzuia matatizo zaidi, hasa katika nusu ya pili ya mimba. Ratiba inayotarajiwa: mawasiliano ya kwanza kabla ya wiki 12, kisha karibu wiki 20, 26, 30, 34, 36, 38, na 40. Lengo sio tu "kujaza visanduku" — kila mawasiliano yana kazi. Mawasiliano ya mapema huthibitisha mimba na tarehe, huchunguza damu kwa upungufu wa damu/VVU/kaswende/kundi la damu/vipimo vingine, huanza dawa za kulinda (chuma, folate, pepopunda, IPTp), na hutathmini hatari za kijamii na kiakili. Mawasiliano ya katikati ya mimba hufuatilia ukuaji, huchunguza pre-eclampsia na GDM, huanza dose za IPTp. Mawasiliano ya marehemu hufuatilia nafasi ya mtoto, hupanga kujifungua, na huangalia kwa karibu pre-eclampsia na mwendo wa fetasi uliopungua. Kiashiria kikubwa zaidi cha matatizo kugundulika kuchelewa ni kukosa mawasiliano.',
      sw_mtaa: 'Mwanamke yeyote pregnant anayeshiriki katika antenatal care. Current WHO recommendation, iliyokubaliwa Tanzania, ni minimum ya contacts 8 wakati wa mimba — ikichukua nafasi ya older 4-visit "focused ANC" model, kwa sababu evidence inaonyesha more contacts zinapata na kuzuia more problems, hasa katika second half ya mimba. Expected schedule: first contact kabla ya wiki 12, kisha karibu wiki 20, 26, 30, 34, 36, 38, na 40. Lengo sio tu "kujaza checkboxes" — kila contact ina job. Early contacts zinathibitisha pregnancy na dating, zinachunguza damu kwa anaemia/VVU/kaswende/blood group/vipimo vingine, zinaanza protective medicines (chuma, folate, tetanus, IPTp), na zinatathmini social na mental risks. Mid-pregnancy contacts zinafuatilia growth, zinachunguza pre-eclampsia na GDM, zinaanza IPTp doses. Late contacts zinafuatilia baby position, zinapanga delivery, na zinaangalia kwa karibu pre-eclampsia na reduced fetal movements. Biggest single predictor ya complications kugundulika late ni kukosa contacts.',
    },
    recognitionSigns: [
      {
        en: 'Pregnant — and the earlier ANC starts, the more leverage on the whole pregnancy',
        sw: 'Mjamzito — na mapema ANC inavyoanza, ndivyo nguvu kubwa zaidi kwenye mimba nzima',
        sw_mtaa: 'Pregnant — na mapema ANC inavyoanza, ndivyo nguvu kubwa zaidi kwenye mimba nzima',
      },
      {
        en: 'Women who have completed fewer than the recommended 8 contacts have higher rates of preventable complications',
        sw: 'Wanawake ambao wamemaliza mawasiliano machache kuliko 8 yaliyopendekezwa wana viwango vya juu vya matatizo yanayoweza kuzuiwa',
        sw_mtaa: 'Wanawake ambao wamemaliza fewer kuliko recommended 8 contacts wana higher rates za preventable complications',
      },
      {
        en: 'Higher-risk pregnancies (twins, previous caesarean, diabetes, hypertension, HIV, age extremes, previous loss) need extra contacts beyond the standard 8',
        sw: 'Mimba zenye hatari kubwa zaidi (mapacha, upasuaji wa awali, kisukari, shinikizo la damu, VVU, umri uliokithiri, kupoteza mimba ya awali) zinahitaji mawasiliano ya ziada zaidi ya 8 ya kawaida',
        sw_mtaa: 'Higher-risk pregnancies (mapacha, previous C-section, diabetes, hypertension, VVU, age extremes, previous loss) zinahitaji extra contacts beyond standard 8',
      },
    ],
    treatmentJourney: {
      en: 'The 8-contact pathway, broken down by what each contact achieves. CONTACT 1 (<12 weeks): confirm pregnancy and dating; full history and risk screen; blood pressure, weight, height, urine dipstick; bloods for anaemia, HIV, syphilis, hepatitis B, blood group, glucose, malaria where indicated; ultrasound where available; start iron, folic acid, tetanus vaccination; counsel on diet, alcohol, smoking, traditional medicines, danger signs. CONTACT 2 (around 20 weeks): growth check; BP/urine; start IPTp-SP for malaria (if not on cotrimoxazole); detailed ultrasound for anomalies where available. CONTACT 3 (26 weeks): BP/urine; second IPTp; screen for GDM (24-28 weeks). CONTACT 4 (30 weeks): BP/urine; growth; assess fetal lie; third IPTp; review delivery plan. CONTACT 5 (34 weeks): BP/urine; growth; reinforce danger sign teaching; finalise delivery plan and birth-preparedness. CONTACT 6 (36 weeks): BP/urine; growth; check fetal lie (head-down by now); fourth IPTp if needed. CONTACT 7 (38 weeks): BP/urine; readiness for delivery; signs of labour education. CONTACT 8 (40 weeks): BP/urine; assessment for post-term planning if no labour. Throughout: any sign of danger triggers an unscheduled visit. After delivery, postnatal contacts at <24 hours, week 1, and ~6 weeks complete the continuity.',
      sw: 'Njia ya mawasiliano 8, iliyogawanywa na kile kila mawasiliano hufikia. MAWASILIANO 1 (<wiki 12): thibitisha mimba na tarehe; historia kamili na uchunguzi wa hatari; shinikizo la damu, uzito, urefu, dipstick ya mkojo; damu kwa upungufu wa damu, VVU, kaswende, hepatitis B, kundi la damu, glukosi, malaria pale inapoonyeshwa; ultrasound pale inapopatikana; anza chuma, folate, chanjo ya pepopunda; shauri kuhusu lishe, pombe, sigara, dawa za jadi, dalili za hatari. MAWASILIANO 2 (karibu wiki 20): ukaguzi wa ukuaji; BP/mkojo; anza IPTp-SP kwa malaria (kama hauko kwenye cotrimoxazole); ultrasound ya kina kwa anomalies pale inapopatikana. MAWASILIANO 3 (wiki 26): BP/mkojo; IPTp ya pili; uchunguzi wa GDM (wiki 24-28). MAWASILIANO 4 (wiki 30): BP/mkojo; ukuaji; tathmini fetal lie; IPTp ya tatu; pitia mpango wa kujifungua. MAWASILIANO 5 (wiki 34): BP/mkojo; ukuaji; imarisha mafunzo ya dalili za hatari; kamilisha mpango wa kujifungua na maandalizi ya kuzaa. MAWASILIANO 6 (wiki 36): BP/mkojo; ukuaji; angalia fetal lie (head-down sasa); IPTp ya nne ikihitajika. MAWASILIANO 7 (wiki 38): BP/mkojo; utayari wa kujifungua; elimu ya dalili za leba. MAWASILIANO 8 (wiki 40): BP/mkojo; tathmini ya kupanga baada ya muda kamili kama hakuna leba. Katika muda wote: dalili yoyote ya hatari husababisha ziara isiyopangwa. Baada ya kujifungua, mawasiliano ya baada ya kujifungua katika <masaa 24, wiki 1, na ~wiki 6 yanakamilisha mwendelezo.',
      sw_mtaa: 'Pathway ya contacts 8, iliyogawanywa kwa kile kila contact inafikia. CONTACT 1 (<wiki 12): thibitisha pregnancy na dating; full history na risk screen; presha, uzito, urefu, urine dipstick; bloods za anaemia, VVU, kaswende, hep B, blood group, glucose, malaria pale inapoonyeshwa; ultrasound pale inapopatikana; anza chuma, folate, tetanus; counsel kuhusu diet, pombe, sigara, traditional medicines, danger signs. CONTACT 2 (karibu wiki 20): growth check; BP/mkojo; anza IPTp-SP kwa malaria (kama hauko kwenye cotrimoxazole); detailed ultrasound kwa anomalies pale inapopatikana. CONTACT 3 (wiki 26): BP/mkojo; second IPTp; screen kwa GDM (wiki 24-28). CONTACT 4 (wiki 30): BP/mkojo; growth; assess fetal lie; third IPTp; review delivery plan. CONTACT 5 (wiki 34): BP/mkojo; growth; reinforce danger sign teaching; finalise delivery plan na birth-preparedness. CONTACT 6 (wiki 36): BP/mkojo; growth; check fetal lie (head-down by now); fourth IPTp ikihitajika. CONTACT 7 (wiki 38): BP/mkojo; readiness ya delivery; signs of labour education. CONTACT 8 (wiki 40): BP/mkojo; assessment ya post-term planning kama hakuna labour. Throughout: any danger sign inasababisha unscheduled visit. Baada ya delivery, postnatal contacts katika <masaa 24, wiki 1, na ~wiki 6 zinakamilisha continuity.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe headache, vision changes, swelling, upper-belly pain, seizures, heavy bleeding, severe pain, fever, reduced fetal movements, leaking fluid before 37 weeks — these are the universal pregnancy danger signs taught at every ANC contact. They mean: go in NOW, do not wait',
          sw: 'Kichwa kikali, mabadiliko ya kuona, uvimbe, maumivu ya tumbo la juu, degedege, kutoka damu nyingi, maumivu makali, homa, mwendo wa fetasi uliopungua, kuvuja maji kabla ya wiki 37 — hizi ni dalili za ulimwengu za hatari za mimba zinazofundishwa katika kila mawasiliano ya ANC. Zinamaanisha: ingia SASA, usisubiri',
          sw_mtaa: 'Kichwa kikali, vision changes, uvimbe, maumivu ya tumbo la juu, degedege, heavy bleeding, severe pain, homa, reduced fetal movements, leaking fluid kabla ya wiki 37 — hizi ni universal pregnancy danger signs zinazofundishwa katika kila ANC contact. Zinamaanisha: ingia SASA, usisubiri',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Going past 40-41 weeks without labour signs — needs assessment for post-term pregnancy management (the placenta starts working less well after 41 weeks)',
          sw: 'Kupita wiki 40-41 bila dalili za leba — kunahitaji tathmini ya usimamizi wa mimba ya baada ya muda kamili (placenta huanza kufanya kazi vibaya zaidi baada ya wiki 41)',
          sw_mtaa: 'Kupita wiki 40-41 bila labour signs — inahitaji assessment kwa post-term pregnancy management (placenta inaanza kufanya kazi less well baada ya wiki 41)',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'The continuity does not end with delivery. Three postnatal contacts complete the cycle: within 24 hours of birth (a critical window — most maternal and newborn deaths happen here), at week 1, and around 6 weeks postpartum. These check the mother (BP for residual pre-eclampsia, bleeding, infection, breastfeeding problems, contraception planning, mental health) and the baby (feeding, growth, jaundice, infections, immunisations). For women with conditions diagnosed in pregnancy (GDM, hypertension, anaemia), postnatal contacts also start the long-term plan — postnatal glucose screening for GDM, BP monitoring for women who had pre-eclampsia, iron continuation if anaemic. ANC and postnatal records belong in the personal vault for every future medical encounter.',
      sw: 'Mwendelezo hauishi na kujifungua. Mawasiliano matatu ya baada ya kujifungua hukamilisha mzunguko: ndani ya masaa 24 ya kuzaliwa (dirisha la muhimu — vifo vingi vya kimama na vya mtoto mchanga hutokea hapa), katika wiki 1, na karibu wiki 6 baada ya kujifungua. Hizi huchunguza mama (BP kwa pre-eclampsia iliyobaki, kutoka damu, maambukizi, matatizo ya kunyonyesha, kupanga uzazi, afya ya akili) na mtoto (kulisha, ukuaji, manjano, maambukizi, chanjo). Kwa wanawake walio na hali zilizogundulika katika mimba (GDM, shinikizo la damu, upungufu wa damu), mawasiliano ya baada ya kujifungua pia huanza mpango wa muda mrefu — uchunguzi wa glukosi wa baada ya kujifungua kwa GDM, ufuatiliaji wa BP kwa wanawake waliokuwa na pre-eclampsia, kuendelea kwa chuma ikiwa upungufu wa damu. Rekodi za ANC na za baada ya kujifungua ni za vault ya kibinafsi kwa kila mkutano wa kimatibabu wa baadaye.',
      sw_mtaa: 'Continuity haiishi na delivery. Three postnatal contacts zinakamilisha cycle: ndani ya masaa 24 ya kuzaliwa (critical window — vifo vingi vya kimama na neonatal vinatokea hapa), katika wiki 1, na karibu wiki 6 postpartum. Hizi zinachunguza mama (BP kwa residual pre-eclampsia, bleeding, infection, breastfeeding problems, contraception planning, mental health) na mtoto (feeding, growth, jaundice, infections, immunisations). Kwa wanawake walio na conditions zilizogundulika katika mimba (GDM, hypertension, anaemia), postnatal contacts pia zinaanza long-term plan — postnatal glucose screening kwa GDM, BP monitoring kwa wanawake waliokuwa na pre-eclampsia, iron continuation ikiwa anaemic. ANC na postnatal records ni za personal vault kwa kila future medical encounter.',
    },
    sources: [
      src('WHO_ANC_2016'),
      src('MOH_TZ_MATERNAL_2024'),
      src('IMCI_2024'),
    ],
  },
];
