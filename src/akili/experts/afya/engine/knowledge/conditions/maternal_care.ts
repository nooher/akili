/**
 * Maternal Care — Full Condition Knowledge (Phase 7, 100% all-in coverage)
 *
 * Sources: MoH-TZ Maternal Guidelines 2024, WHO ANC Recommendations 2016
 *          (8-contact model), WHO Pre-eclampsia 2023, WHO PPH 2017,
 *          FIGO Pre-eclampsia 2024, Muhimbili Protocols, NTLG STG 2023.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in via variants):
 *   • Pre-eclampsia / eclampsia (incl. HELLP) — recognition, magnesium
 *     sulfate, antihypertensives, delivery as the cure
 *   • Postpartum haemorrhage (PPH) — uterotonics, recognition, first response
 *   • Gestational diabetes (GDM) — pregnancy-specific glucose targets,
 *     monitoring, delivery planning (deep dive complementing Phase 2)
 *   • ANC continuity — WHO 8-contact schedule, danger signs at each visit
 *
 * Comorbidities: HIV (PMTCT cross-ref to Phase 5), TB (RHZE in pregnancy
 * cross-ref to Phase 4), malaria (IPTp-SP cross-ref to Phase 3), CKD,
 * hypertension, diabetes.
 *
 * SCOPE: We educate women, partners, and families on what to expect, what
 * is normal vs dangerous, how to recognise emergencies, and why each ANC
 * visit and each medicine matters. We do NOT diagnose pregnancy
 * complications, prescribe magnesium sulfate dosing, or replace skilled
 * birth attendance — those are clinician/midwife roles.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { MATERNAL_VARIANTS } from './maternal.variants';

export const MATERNAL_CARE: ConditionKnowledge = {
  id: 'maternal_care',
  aliases: CONDITION_ALIASES.maternal_care,
  category: 'maternal',

  whatItIs: {
    en: 'Maternal care covers everything a woman needs from the start of pregnancy through delivery and the weeks after birth (the postnatal period). Most pregnancies in Tanzania end safely — but maternal complications remain among the leading causes of death in women of childbearing age. The biggest dangers are pre-eclampsia (high blood pressure with organ involvement), postpartum haemorrhage (heavy bleeding after delivery), infection, obstructed labour, and unsafe abortion. Almost all of these are preventable or treatable when caught early, which is exactly what antenatal care (ANC) is designed to do. ANC visits are not a formality — they screen for danger signs the mother cannot feel yet, monitor the baby\'s growth, give protective treatments (iron, folate, IPTp for malaria, tetanus vaccination), and create a delivery plan with a skilled attendant.',
    sw: 'Huduma za mama zinajumuisha kila kitu mwanamke anachohitaji tangu mwanzo wa mimba hadi kujifungua na wiki za baada ya kuzaa (kipindi cha baada ya kujifungua). Mimba nyingi Tanzania huisha salama — lakini matatizo ya kimama yanabaki miongoni mwa sababu kuu za vifo vya wanawake wa umri wa kuzaa. Hatari kubwa zaidi ni kifafa cha mimba (shinikizo la damu la juu pamoja na uharibifu wa viungo), kutoka damu baada ya kujifungua, maambukizi, leba ngumu, na uavyaji mimba usio salama. Karibu yote haya yanaweza kuzuiwa au kutibiwa yanapogundulika mapema, ambayo ndiyo lengo hasa la huduma za ujauzito (ANC). Ziara za ANC sio kawaida tu — zinachunguza dalili za hatari ambazo mama hawezi kuzihisi bado, zinafuatilia ukuaji wa mtoto, zinatoa matibabu ya kulinda (chuma, folate, IPTp kwa malaria, chanjo ya pepopunda), na zinatengeneza mpango wa kujifungua na mtaalamu wa afya.',
    sw_mtaa: 'Huduma za mama zinajumuisha kila kitu mama anachohitaji tangu kupata mimba hadi kujifungua na wiki za baada ya kuzaa. Mimba nyingi Tanzania zinaisha salama — lakini matatizo ya mama bado ni sababu kubwa ya vifo vya wanawake. Hatari kubwa zaidi ni kifafa cha mimba (presha kupanda na viungo kuathirika), damu nyingi baada ya kuzaa, maambukizi, leba ngumu, na kuavya mimba kwa njia mbaya. Karibu yote haya yanaweza kuzuiwa au kutibiwa kama yanagunduliwa mapema, ndio sababu ANC ipo. Ziara za ANC sio kawaida tu — zinachunguza dalili za hatari ambazo mama hawezi kuhisi bado, zinafuatilia ukuaji wa mtoto, zinatoa kinga (chuma, folate, IPTp kwa malaria, chanjo ya pepopunda), na zinatengeneza plan ya kujifungua na mtaalamu.',
  },

  whyItMatters: {
    en: 'Tanzania has made progress on maternal mortality but the burden remains high — every preventable maternal death is a family broken. The four conditions that cause most of these deaths — pre-eclampsia/eclampsia, postpartum haemorrhage, sepsis, and obstructed labour — share one feature: they are usually survivable when recognised early and treated by a skilled provider. That is the entire logic of ANC and facility delivery: not because pregnancy is an illness, but because the few mothers who develop complications need to be inside the system when those complications arrive. The same logic protects babies: most stillbirths and newborn deaths come from conditions that ANC, skilled birth attendance, and immediate newborn care prevent or treat. This is also where many lifelong chronic-disease pathways begin — gestational diabetes raises a woman\'s lifetime type 2 diabetes risk; pre-eclampsia raises future cardiovascular risk. Good maternal care protects two generations at once.',
    sw: 'Tanzania imepiga hatua kuhusu vifo vya wajawazito lakini mzigo bado uko juu — kila kifo cha mama kinachoweza kuzuiwa ni familia iliyovunjika. Hali nne zinazosababisha vifo vingi hivi — kifafa cha mimba, kutoka damu baada ya kujifungua, sepsis, na leba ngumu — zinashiriki kitu kimoja: kwa kawaida zinaweza kunusurika zinapogundulika mapema na kutibiwa na mtoa huduma stadi. Hiyo ni mantiki yote ya ANC na kujifungua katika kituo: sio kwa sababu mimba ni ugonjwa, bali kwa sababu mama wachache wanaopata matatizo wanahitaji kuwa ndani ya mfumo wakati matatizo hayo yanapokuja. Mantiki ile ile inalinda watoto: vifo vingi vya watoto wachanga na kabla ya kuzaliwa vinatokana na hali ambazo ANC, kujifungua na mtaalamu, na huduma ya haraka ya mtoto mchanga huzuia au kutibu. Hapa pia ni mahali ambapo njia nyingi za magonjwa sugu ya maisha huanza — kisukari cha mimba huongeza hatari ya kisukari aina ya 2 ya maisha; kifafa cha mimba huongeza hatari ya magonjwa ya moyo ya baadaye. Huduma nzuri za mama hulinda vizazi viwili kwa pamoja.',
    sw_mtaa: 'Tanzania imepiga hatua kuhusu vifo vya wajawazito lakini mzigo bado uko juu — kila kifo cha mama kinachoweza kuzuiwa ni familia iliyovunjika. Hali nne zinazosababisha vifo vingi — kifafa cha mimba, damu nyingi baada ya kuzaa, sepsis, na leba ngumu — zinashiriki kitu kimoja: kwa kawaida zinaweza kunusurika zinapogundulika mapema na kutibiwa na mtaalamu. Hiyo ni mantiki yote ya ANC na kujifungua kituoni: sio kwa sababu mimba ni ugonjwa, bali kwa sababu wachache wanaopata matatizo wanahitaji kuwa ndani ya mfumo wakati matatizo yanakuja. Logic ile ile inalinda watoto: vifo vingi vya watoto wachanga vinatokana na hali ambazo ANC, skilled birth attendance, na huduma ya haraka ya mtoto mchanga zinazuia au kutibu. Hapa pia ndio njia nyingi za magonjwa sugu zinaanzia — GDM inaongeza risk ya kisukari aina ya 2; pre-eclampsia inaongeza risk ya magonjwa ya moyo baadaye. Huduma nzuri za mama zinalinda vizazi viwili kwa pamoja.',
  },

  commonQuestions: [
    {
      q: {
        en: 'I just found out I am pregnant — what should I do first?',
        sw: 'Nimegundua nina mimba — nifanye nini kwanza?',
      },
      a: {
        en: 'Go to your nearest health facility to start antenatal care (ANC) as soon as possible — ideally in the first 12 weeks. At your first visit they will confirm the pregnancy, calculate when the baby is due, check your blood pressure, weight, urine, blood (for anaemia, HIV, syphilis, blood group, and other tests), and start protective medicines: iron and folic acid daily, tetanus vaccination, and IPTp-SP for malaria prevention starting in the second trimester. They will also discuss your delivery plan. Begin taking folic acid right away if you can (it protects the baby\'s spine in the first weeks), avoid alcohol and smoking, and eat well. If you are on any chronic medicines (for hypertension, diabetes, HIV, TB, epilepsy), tell the ANC team — some medicines need to be reviewed or adjusted in pregnancy.',
        sw: 'Nenda kituo cha afya cha karibu kuanza huduma za ujauzito (ANC) haraka iwezekanavyo — ikiwezekana katika wiki 12 za kwanza. Katika ziara yako ya kwanza watathibitisha mimba, watahesabu wakati mtoto atatakuzaliwa, watapima shinikizo lako la damu, uzito, mkojo, damu (kwa upungufu wa damu, VVU, kaswende, kundi la damu, na vipimo vingine), na wataanza dawa za kulinda: chuma na folate kila siku, chanjo ya pepopunda, na IPTp-SP kuzuia malaria kuanzia trimester ya pili. Watajadili pia mpango wako wa kujifungua. Anza kutumia folate mara moja ikiwa unaweza (inalinda uti wa mgongo wa mtoto katika wiki za kwanza), epuka pombe na sigara, na kula vizuri. Ikiwa unatumia dawa zozote za muda mrefu (shinikizo la damu, kisukari, VVU, TB, kifafa), waambie timu ya ANC — baadhi ya dawa zinahitaji kupitiwa au kurekebishwa katika mimba.',
        sw_mtaa: 'Nenda kituo cha afya cha karibu kuanza ANC haraka iwezekanavyo — ikiwezekana wiki 12 za kwanza. Ziara yako ya kwanza watathibitisha mimba, watahesabu lini mtoto atazaliwa, watapima presha yako, uzito, mkojo, damu (kwa upungufu wa damu, VVU, kaswende, kundi la damu, na vipimo vingine), na wataanza dawa za kulinda: chuma na folate kila siku, chanjo ya pepopunda, na IPTp-SP kuzuia malaria kuanzia trimester ya pili. Watajadili pia plan ya kujifungua. Anza folate mara moja kama unaweza (inalinda uti wa mgongo wa mtoto wiki za kwanza), epuka pombe na sigara, na kula vizuri. Ikiwa unatumia dawa za muda mrefu (presha, kisukari, VVU, TB, kifafa), waambie ANC team — baadhi ya dawa zinahitaji kupitiwa au kurekebishwa katika mimba.',
      },
    },
    {
      q: {
        en: 'How many ANC visits do I need?',
        sw: 'Nahitaji ziara ngapi za kliniki ya mimba?',
      },
      a: {
        en: 'The current WHO recommendation, which Tanzania follows, is at least 8 contacts during pregnancy — not the old 4-visit schedule. The expected timing: first contact before 12 weeks, then around weeks 20, 26, 30, 34, 36, 38, and 40. More visits mean more chances to catch problems early — pre-eclampsia, anaemia, abnormal growth, malposition, infections — when they are still treatable. Each contact is short: weight, blood pressure, urine dipstick, listening to the baby\'s heartbeat, measuring the bump, asking about danger signs, and refilling iron and folate. If your pregnancy is high-risk (twins, previous caesarean, diabetes, hypertension, HIV, age under 18 or over 35, previous loss), you may need extra contacts or earlier referral. Missing visits is one of the strongest predictors of complications being caught late.',
        sw: 'Mapendekezo ya sasa ya WHO, ambayo Tanzania inafuata, ni angalau mawasiliano 8 wakati wa mimba — sio ratiba ya zamani ya ziara 4. Wakati unaotarajiwa: mawasiliano ya kwanza kabla ya wiki 12, kisha karibu wiki 20, 26, 30, 34, 36, 38, na 40. Ziara zaidi humaanisha nafasi zaidi za kugundua matatizo mapema — kifafa cha mimba, upungufu wa damu, ukuaji usio wa kawaida, mtoto kukaa vibaya, maambukizi — wakati bado yanaweza kutibika. Kila mawasiliano ni mafupi: uzito, shinikizo la damu, kipimo cha mkojo, kusikia mapigo ya moyo wa mtoto, kupima tumbo, kuuliza kuhusu dalili za hatari, na kuongeza chuma na folate. Ikiwa mimba yako ina hatari kubwa (mapacha, upasuaji wa awali, kisukari, shinikizo la damu, VVU, umri chini ya 18 au zaidi ya 35, kupoteza mimba ya awali), unaweza kuhitaji mawasiliano ya ziada au rufaa ya mapema. Kukosa ziara ni mojawapo ya viashiria vikuu vya matatizo kugundulika kuchelewa.',
        sw_mtaa: 'Mapendekezo ya sasa ya WHO, ambayo Tanzania inafuata, ni angalau contacts 8 wakati wa mimba — sio ratiba ya zamani ya ziara 4. Wakati unaotarajiwa: contact ya kwanza kabla ya wiki 12, kisha karibu wiki 20, 26, 30, 34, 36, 38, na 40. Ziara zaidi maana yake nafasi zaidi za kugundua matatizo mapema — pre-eclampsia, upungufu wa damu, ukuaji usio wa kawaida, mtoto kukaa vibaya, maambukizi — wakati bado yanaweza kutibika. Kila contact ni fupi: uzito, presha, kipimo cha mkojo, kusikia mapigo ya moyo wa mtoto, kupima tumbo, kuuliza kuhusu danger signs, na kuongeza chuma na folate. Ikiwa mimba yako ina high-risk (mapacha, C-section ya awali, kisukari, presha, VVU, umri chini ya 18 au zaidi ya 35, miscarriage ya awali), unaweza kuhitaji contacts za ziada au referral ya mapema. Kukosa ziara ni mojawapo ya predictors kuu za matatizo kugundulika kuchelewa.',
      },
    },
    {
      q: {
        en: 'What danger signs in pregnancy mean I should go to the hospital right now?',
        sw: 'Dalili gani za hatari katika mimba zinamaanisha niende hospitali sasa hivi?',
      },
      a: {
        en: 'These are emergencies — do not wait, do not try home remedies: severe headache that will not go away, blurred or double vision, swelling of the face and hands (especially with the headache), upper-belly pain on the right side (just below the ribs), seizures or fits, vaginal bleeding (any amount in early pregnancy, more than spotting later on), severe abdominal pain, the baby moving much less than usual or not at all, fluid leaking from the vagina before 37 weeks, severe vomiting that prevents you keeping anything down, high fever, severe weakness or fainting. Pre-eclampsia and its complication eclampsia (the seizures) can develop in hours; postpartum haemorrhage can be fatal within minutes if untreated. Many of these signs feel "not that bad" at first — that is exactly why women die from them. If in doubt, go in. Your ANC team would rather see you for a false alarm than miss a real one.',
        sw: 'Hizi ni dharura — usisubiri, usijaribu tiba za nyumbani: kichwa kikali kisichoisha, kuona ukungu au mara mbili, uvimbe wa uso na mikono (hasa pamoja na kichwa), maumivu ya tumbo la juu upande wa kulia (chini ya mbavu), kifafa au degedege, kutoka damu ukeni (kiasi chochote katika mimba ya mwanzo, zaidi ya doa kidogo baadaye), maumivu makali ya tumbo, mtoto kusonga kidogo sana kuliko kawaida au kutosonga kabisa, maji kutoka ukeni kabla ya wiki 37, kutapika kali kunakokuzuia kushikilia chochote, homa kali, udhaifu mkubwa au kuzimia. Kifafa cha mimba na shida yake eclampsia (degedege) zinaweza kuendelea ndani ya masaa; kutoka damu baada ya kujifungua kunaweza kuua ndani ya dakika kama hakijatibiwa. Dalili nyingi hizi huhisi "sio mbaya sana" mwanzoni — hiyo ndiyo sababu wanawake hufa kutokana nazo. Ikiwa una shaka, ingia. Timu yako ya ANC ingependa kukuona kwa tahadhari ya uongo kuliko kukosa ya kweli.',
        sw_mtaa: 'Hizi ni dharura — usisubiri, usijaribu tiba za nyumbani: kichwa kikali kisichoisha, kuona ukungu au mara mbili, uvimbe wa uso na mikono (hasa pamoja na kichwa), maumivu ya tumbo la juu upande wa kulia (chini ya mbavu), kifafa au degedege, kutoka damu ukeni (kiasi chochote katika mimba ya mwanzo, zaidi ya spotting baadaye), maumivu makali ya tumbo, mtoto kusonga kidogo sana kuliko kawaida au kutosonga kabisa, maji kutoka ukeni kabla ya wiki 37, kutapika kali kunakokuzuia kushikilia chochote, homa kali, udhaifu mkubwa au kuzimia. Pre-eclampsia na shida yake eclampsia (degedege) zinaweza kuendelea ndani ya masaa; PPH inaweza kuua ndani ya dakika bila kutibiwa. Dalili nyingi hizi zinahisi "sio mbaya sana" mwanzoni — ndio sababu wanawake wanafa kutokana nazo. Ikiwa una shaka, ingia. ANC team yako wangependa kukuona kwa false alarm kuliko kukosa ya kweli.',
      },
    },
    {
      q: {
        en: 'What is pre-eclampsia and why is everyone so worried about my blood pressure?',
        sw: 'Pre-eclampsia ni nini na kwa nini kila mtu ana wasiwasi kuhusu shinikizo langu la damu?',
      },
      a: {
        en: 'Pre-eclampsia is a pregnancy complication where the blood pressure rises and the kidneys start leaking protein into the urine — usually after 20 weeks. It happens when the placenta does not embed into the womb wall properly in early pregnancy, and weeks later the mother\'s blood vessels react. Mild pre-eclampsia can become severe in days, and severe pre-eclampsia can progress to eclampsia (seizures), HELLP syndrome (liver and blood-clotting damage), stroke, or placental separation — any of which can kill mother and baby. That is why every ANC visit checks blood pressure and urine: catching the rise early lets the team start treatment (medicines to lower the pressure, magnesium sulfate to prevent seizures) and plan a safe delivery. The definitive cure is delivery of the baby — sometimes early. If your blood pressure is being followed closely, that is not over-caution: it is exactly the right level of care.',
        sw: 'Pre-eclampsia ni shida ya mimba ambapo shinikizo la damu hupanda na figo huanza kuvuja protini kwenye mkojo — kawaida baada ya wiki 20. Hutokea wakati placenta haingii kwenye ukuta wa mji wa mimba vizuri katika mimba ya mwanzo, na wiki baadaye mishipa ya damu ya mama inaitikia. Pre-eclampsia ndogo inaweza kuwa kali ndani ya siku, na pre-eclampsia kali inaweza kuendelea hadi eclampsia (degedege), HELLP syndrome (uharibifu wa ini na uganda wa damu), kiharusi, au placenta kujitenga — yoyote inaweza kuua mama na mtoto. Hiyo ndiyo sababu kila ziara ya ANC huchunguza shinikizo la damu na mkojo: kugundua kupanda mapema kunaruhusu timu kuanza matibabu (dawa za kupunguza shinikizo, magnesium sulfate kuzuia degedege) na kupanga kujifungua salama. Tiba kamili ni kuzaliwa kwa mtoto — wakati mwingine mapema. Ikiwa shinikizo lako la damu linafuatiliwa kwa karibu, hiyo sio tahadhari kupita kiasi: ni ngazi sahihi ya huduma.',
        sw_mtaa: 'Pre-eclampsia ni shida ya mimba ambapo presha inapanda na figo zinaanza kuvuja protini kwenye mkojo — kawaida baada ya wiki 20. Inatokea wakati placenta hainjii kwenye ukuta wa uterus vizuri katika mimba ya mwanzo, na wiki baadaye blood vessels za mama zinajibu. Mild pre-eclampsia inaweza kuwa severe ndani ya siku, na severe pre-eclampsia inaweza kuendelea hadi eclampsia (degedege), HELLP syndrome (uharibifu wa ini na uganda wa damu), stroke, au placental separation — yoyote inaweza kuua mama na mtoto. Ndio sababu kila ziara ya ANC inachunguza presha na mkojo: kugundua kupanda mapema kunaruhusu team kuanza matibabu (dawa za kupunguza presha, magnesium sulfate kuzuia degedege) na kupanga delivery salama. Tiba kamili ni delivery ya mtoto — wakati mwingine mapema. Ikiwa presha yako inafuatiliwa kwa karibu, hiyo sio over-caution: ndio ngazi sahihi ya huduma.',
      },
    },
    {
      q: {
        en: 'What is postpartum haemorrhage and how can I tell if I am bleeding too much after delivery?',
        sw: 'PPH ni nini na nitajuaje kama ninatoka damu nyingi mno baada ya kujifungua?',
      },
      a: {
        en: 'Postpartum haemorrhage (PPH) means bleeding too heavily after delivery — and it is the leading direct cause of maternal death in Tanzania. Some bleeding is normal: a steady flow that gradually lightens over hours and days, like a heavy period. The dangerous picture is different: blood soaking through more than one pad an hour, large clots (bigger than a chicken egg) coming out repeatedly, a sudden gush after the first few hours, weakness, dizziness, racing heart, pale lips or eye-whites, feeling cold or sweaty, or feeling like you will faint. Most PPH happens in the first 24 hours, but secondary PPH can occur up to 6 weeks after delivery. The team at delivery uses uterotonic medicines (oxytocin, or misoprostol where oxytocin is not available) routinely to prevent it — but if PPH starts, every minute matters. Go straight to the nearest facility or call for transport; do not "wait and see". Even after going home, any of those signs in the first 6 weeks must trigger an urgent return.',
        sw: 'Postpartum haemorrhage (PPH) maana yake kutoka damu kupita kiasi baada ya kujifungua — na ni sababu kuu ya moja kwa moja ya vifo vya wajawazito Tanzania. Damu fulani ni ya kawaida: mtiririko thabiti unaopungua polepole kwa masaa na siku, kama hedhi nzito. Picha ya hatari ni tofauti: damu inayolowanisha zaidi ya pedi moja kwa saa, vipande vikubwa vya damu (vikubwa kuliko yai la kuku) vinavyotoka mara kwa mara, damu inayobubujika ghafla baada ya masaa machache ya kwanza, udhaifu, kizunguzungu, moyo unaopiga haraka, midomo au weupe wa macho uliopauka, kuhisi baridi au jasho, au kuhisi kama utazimia. PPH nyingi hutokea katika masaa 24 ya kwanza, lakini PPH ya pili inaweza kutokea hadi wiki 6 baada ya kujifungua. Timu ya kujifungua hutumia dawa za uterotonic (oxytocin, au misoprostol mahali ambapo oxytocin haipatikani) mara kwa mara kuzuia — lakini ikianza PPH, kila dakika ni muhimu. Nenda moja kwa moja kwenye kituo cha karibu au piga simu ya usafiri; usisubiri "kuangalia". Hata baada ya kwenda nyumbani, dalili yoyote hiyo katika wiki 6 za kwanza lazima isababishe kurudi haraka.',
        sw_mtaa: 'PPH (postpartum haemorrhage) maana yake kutoka damu kupita kiasi baada ya kujifungua — na ni sababu kuu ya moja kwa moja ya vifo vya wajawazito Tanzania. Damu fulani ni ya kawaida: flow thabiti inayopungua polepole kwa masaa na siku, kama hedhi nzito. Picha ya hatari ni tofauti: damu inayolowanisha zaidi ya pedi moja kwa saa, vipande vikubwa vya damu (vikubwa kuliko yai la kuku) vinavyotoka mara kwa mara, damu inayobubujika ghafla baada ya masaa machache ya kwanza, udhaifu, kizunguzungu, moyo unaopiga haraka, midomo au macho yaliyopauka, kuhisi baridi au jasho, au kuhisi kama utazimia. PPH nyingi zinatokea katika masaa 24 ya kwanza, lakini secondary PPH inaweza kutokea hadi wiki 6 baada ya kujifungua. Team ya delivery inatumia uterotonics (oxytocin, au misoprostol mahali ambapo oxytocin haipatikani) routinely kuzuia — lakini ikianza PPH, kila dakika ni muhimu. Nenda moja kwa moja kituo cha karibu au piga simu ya usafiri; usisubiri "kuangalia". Hata baada ya kwenda nyumbani, dalili yoyote hiyo katika wiki 6 za kwanza lazima isababishe kurudi haraka.',
      },
    },
    {
      q: {
        en: 'I have HIV and I am pregnant — will my baby get HIV?',
        sw: 'Nina VVU na nina mimba — mtoto wangu atapata VVU?',
      },
      a: {
        en: 'Most likely NOT — with PMTCT care, the risk of passing HIV to the baby drops to under 1-2%. The plan: start or continue ART immediately and take it every single day through pregnancy, delivery, and breastfeeding; the goal is an undetectable viral load before delivery. Deliver at a health facility where the team knows your status. The baby receives preventive ARV medicine (usually nevirapine) for several weeks after birth and is tested for HIV at intervals — the first early test around 4-6 weeks, with confirmatory testing later. In Tanzania, breastfeeding is recommended when the mother is on ART with good adherence, exclusively for the first 6 months. Untreated HIV in pregnancy carries a much higher transmission risk — so the most protective thing you can do for your baby is take your ART consistently and attend every ANC and PMTCT visit. Your HIV team and ANC team work together for you.',
        sw: 'Uwezekano mkubwa HAPANA — kwa huduma ya PMTCT, hatari ya kupitisha VVU kwa mtoto inashuka chini ya 1-2%. Mpango: anza au endelea na ART mara moja na uichukue kila siku katika mimba, kujifungua, na kunyonyesha; lengo ni viral load isiyoonekana kabla ya kujifungua. Jifungue katika kituo cha afya ambapo timu inajua hali yako. Mtoto hupokea dawa ya ARV ya kuzuia (kawaida nevirapine) kwa wiki kadhaa baada ya kuzaliwa na hupimwa VVU kwa vipindi — kipimo cha kwanza cha mapema karibu wiki 4-6, na upimaji wa uthibitisho baadaye. Tanzania, kunyonyesha kunashauriwa wakati mama yuko kwenye ART na anazingatia vizuri, kwa maziwa ya mama pekee kwa miezi 6 ya kwanza. VVU isiyotibiwa katika mimba ina hatari kubwa zaidi ya maambukizi — hivyo jambo la kulinda zaidi unaloweza kufanya kwa mtoto ni kuchukua ART mara kwa mara na kuhudhuria kila ziara ya ANC na PMTCT. Timu yako ya VVU na timu ya ANC zinafanya kazi pamoja kwa ajili yako.',
        sw_mtaa: 'Uwezekano mkubwa HAPANA — kwa PMTCT care, hatari ya kupitisha VVU kwa mtoto inashuka chini ya 1-2%. Plan: anza au endelea na ART mara moja na uichukue kila siku katika mimba, kujifungua, na kunyonyesha; lengo ni undetectable viral load kabla ya delivery. Jifungue kituoni ambapo team inajua status yako. Mtoto anapokea dawa ya ARV ya kuzuia (kawaida nevirapine) kwa wiki kadhaa baada ya kuzaliwa na anapimwa VVU kwa vipindi — kipimo cha kwanza cha mapema karibu wiki 4-6, na confirmatory testing baadaye. Tanzania, kunyonyesha kunashauriwa wakati mama yuko kwenye ART na ana good adherence, exclusively miezi 6 ya kwanza. Untreated HIV katika mimba ina risk kubwa zaidi ya maambukizi — hivyo jambo la kulinda zaidi unaloweza kufanya kwa mtoto ni kuchukua ART consistently na kuhudhuria kila ziara ya ANC na PMTCT. HIV team yako na ANC team zinafanya kazi pamoja kwa ajili yako.',
      },
    },
    {
      q: {
        en: 'I have been told I have gestational diabetes — what does this mean?',
        sw: 'Nimeambiwa nina kisukari cha ujauzito — hii inamaanisha nini?',
      },
      a: {
        en: 'Gestational diabetes (GDM) is high blood sugar that first appears during pregnancy — usually picked up at routine ANC screening, often between weeks 24 and 28. The placenta produces hormones that make the mother\'s body less responsive to insulin; in some women the pancreas can compensate, in others it cannot, and sugar rises. The good news is that GDM is highly manageable when caught early. The plan typically starts with diet changes (smaller, more frequent meals; reducing refined carbs and sugary drinks) and gentle physical activity; many women reach their targets this way. Daily home blood sugar monitoring is the key tool — your team will set targets for fasting and after meals. If diet alone is not enough, insulin or metformin may be added (both safe in pregnancy). Well-controlled GDM gives normal birth outcomes; uncontrolled GDM raises risks of a large baby, birth complications, and longer-term type 2 diabetes for the mother. After delivery, GDM usually resolves, but you should be screened for type 2 diabetes about 6-12 weeks postpartum and then regularly — having had GDM raises lifetime type 2 diabetes risk severalfold.',
        sw: 'Kisukari cha ujauzito (GDM) ni sukari ya damu iliyo juu inayoonekana kwa mara ya kwanza wakati wa mimba — kawaida hugunduliwa kwenye uchunguzi wa kawaida wa ANC, mara nyingi kati ya wiki 24 na 28. Placenta hutoa homoni zinazofanya mwili wa mama uwe na uwezo mdogo wa kujibu insulin; kwa baadhi ya wanawake kongosho linaweza kulipia, kwa wengine haliwezi, na sukari hupanda. Habari njema ni kwamba GDM inaweza kudhibitiwa vizuri inapogundulika mapema. Mpango kawaida huanza na mabadiliko ya chakula (milo midogo zaidi, mara kwa mara zaidi; kupunguza wanga uliosafishwa na vinywaji vyenye sukari) na mazoezi ya kimwili ya upole; wanawake wengi hufikia malengo yao kwa njia hii. Ufuatiliaji wa kila siku wa sukari ya damu nyumbani ni zana muhimu — timu yako itaweka malengo ya tumbo tupu na baada ya milo. Ikiwa lishe peke yake haitoshi, insulin au metformin inaweza kuongezwa (zote ni salama katika mimba). GDM iliyodhibitiwa vizuri hutoa matokeo ya kawaida ya kuzaliwa; GDM isiyodhibitiwa huongeza hatari za mtoto mkubwa, matatizo ya kuzaa, na kisukari aina ya 2 ya muda mrefu kwa mama. Baada ya kujifungua, GDM kawaida hupotea, lakini unapaswa kuchunguzwa kisukari aina ya 2 karibu wiki 6-12 baada ya kujifungua na kisha mara kwa mara — kuwa na GDM huongeza hatari ya kisukari aina ya 2 ya maisha mara kadhaa.',
        sw_mtaa: 'GDM (kisukari cha ujauzito) ni sugar ya damu iliyo juu inayoonekana kwa mara ya kwanza wakati wa mimba — kawaida inagunduliwa kwenye routine screening ya ANC, mara nyingi kati ya wiki 24 na 28. Placenta inatoa homoni zinazofanya mwili wa mama uwe less responsive kwa insulin; kwa baadhi ya wanawake kongosho linaweza kulipia, kwa wengine haliwezi, na sugar inapanda. Habari njema ni kwamba GDM inaweza kudhibitiwa vizuri inapogundulika mapema. Plan kawaida inaanza na mabadiliko ya chakula (milo midogo zaidi, mara kwa mara zaidi; kupunguza refined carbs na sugary drinks) na light physical activity; wanawake wengi wanafikia targets zao kwa njia hii. Daily home blood sugar monitoring ni key tool — team yako itaweka targets za fasting na baada ya milo. Ikiwa diet peke yake haitoshi, insulin au metformin inaweza kuongezwa (zote ni salama katika mimba). Well-controlled GDM inatoa matokeo ya kawaida ya kuzaliwa; uncontrolled GDM inaongeza risks za mtoto mkubwa, birth complications, na long-term type 2 diabetes kwa mama. Baada ya delivery, GDM kawaida inapotea, lakini unapaswa kuchunguzwa type 2 diabetes karibu wiki 6-12 postpartum na kisha mara kwa mara — kuwa na GDM kunaongeza lifetime type 2 diabetes risk mara kadhaa.',
      },
    },
    {
      q: {
        en: 'Why do they keep checking my urine at ANC visits?',
        sw: 'Kwa nini wanaendelea kupima mkojo wangu kwenye ziara za ANC?',
      },
      a: {
        en: 'Urine dipstick at each ANC visit is one of the most powerful and cheapest screening tools in maternal care — it checks for protein (the early sign of pre-eclampsia and kidney problems), glucose (gestational diabetes), nitrites and leucocytes (urinary tract infection, common in pregnancy and can trigger preterm labour if missed), and ketones (poor nutrition or severe vomiting). The test takes 60 seconds. A positive result does not mean something is wrong — it means the team will look more closely, which is exactly the point of screening. Protein on the dipstick combined with a rising blood pressure is the classic early warning of pre-eclampsia; catching it at the dipstick stage rather than at the seizure stage saves lives.',
        sw: 'Dipstick ya mkojo katika kila ziara ya ANC ni mojawapo ya zana zenye nguvu na za bei nafuu zaidi za uchunguzi katika huduma za mama — huchunguza protini (ishara ya mapema ya pre-eclampsia na matatizo ya figo), glukosi (kisukari cha ujauzito), nitrites na leucocytes (maambukizi ya njia ya mkojo, ya kawaida katika mimba na yanaweza kusababisha leba ya kuzaa kabla ya wakati ikikoswa), na ketoni (lishe duni au kutapika kali). Kipimo huchukua sekunde 60. Matokeo chanya hayamaanishi kuna kitu kibaya — yanamaanisha timu itaangalia kwa karibu zaidi, ambayo ndiyo lengo hasa la uchunguzi. Protini kwenye dipstick pamoja na shinikizo la damu linaloongezeka ni onyo la kale la pre-eclampsia; kuigundua katika hatua ya dipstick badala ya hatua ya degedege huokoa maisha.',
        sw_mtaa: 'Dipstick ya mkojo kila ziara ya ANC ni mojawapo ya zana zenye nguvu na za bei nafuu zaidi za screening katika huduma za mama — inachunguza protini (ishara ya mapema ya pre-eclampsia na matatizo ya figo), glucose (GDM), nitrites na leucocytes (UTI, ya kawaida katika mimba na inaweza kusababisha preterm labour ikikoswa), na ketones (lishe duni au kutapika kali). Test inachukua sekunde 60. Positive result haina maana kuna kitu kibaya — inamaanisha team itaangalia kwa karibu zaidi, ambayo ndio lengo hasa la screening. Protini kwenye dipstick pamoja na presha inayoongezeka ni classic early warning ya pre-eclampsia; kuigundua katika hatua ya dipstick badala ya hatua ya degedege inaokoa maisha.',
      },
    },
    {
      q: {
        en: 'Should I still take malaria prevention pills during pregnancy?',
        sw: 'Bado nichukue dawa za kuzuia malaria wakati wa mimba?',
      },
      a: {
        en: 'Yes — Tanzania follows the WHO recommendation for IPTp-SP (Intermittent Preventive Treatment in pregnancy with sulfadoxine-pyrimethamine): at least three doses, given at ANC visits from the second trimester onward (not earlier than 13 weeks), spaced at least 4 weeks apart, and continued until delivery. Why this matters: malaria in pregnancy can cause severe anaemia in the mother, miscarriage, stillbirth, preterm delivery, and low birth weight — and it can be silent (parasites in the placenta without obvious symptoms). On top of IPTp, sleep under an insecticide-treated net every night, and get any fever investigated promptly with a malaria test. If you are on cotrimoxazole because of HIV, IPTp-SP is NOT given (the medicines overlap and combine badly) — your cotrimoxazole protects against malaria instead.',
        sw: 'Ndio — Tanzania inafuata mapendekezo ya WHO kwa IPTp-SP (Tiba ya Kuzuia ya Vipindi katika mimba kwa sulfadoxine-pyrimethamine): angalau dose tatu, zinazotolewa katika ziara za ANC kuanzia trimester ya pili (sio mapema kuliko wiki 13), zikitenganishwa angalau wiki 4, na kuendelea hadi kujifungua. Kwa nini hii ni muhimu: malaria katika mimba inaweza kusababisha upungufu mkubwa wa damu kwa mama, kuharibika kwa mimba, mtoto kufariki kabla ya kuzaliwa, kujifungua kabla ya wakati, na uzito mdogo wa kuzaliwa — na inaweza kuwa kimya (vimelea kwenye placenta bila dalili zilizo wazi). Juu ya IPTp, lala chini ya neti iliyotiwa dawa kila usiku, na pata homa yoyote ichunguzwe haraka na kipimo cha malaria. Ikiwa uko kwenye cotrimoxazole kwa sababu ya VVU, IPTp-SP HAITOTOLEWI (dawa hizo zinaingiliana na kuchanganywa vibaya) — cotrimoxazole yako inalinda dhidi ya malaria badala yake.',
        sw_mtaa: 'Ndio — Tanzania inafuata mapendekezo ya WHO kwa IPTp-SP: angalau dose tatu, zinazotolewa katika ziara za ANC kuanzia trimester ya pili (sio mapema kuliko wiki 13), zikitenganishwa angalau wiki 4, na kuendelea hadi delivery. Kwa nini hii ni muhimu: malaria katika mimba inaweza kusababisha severe anaemia kwa mama, miscarriage, stillbirth, preterm delivery, na low birth weight — na inaweza kuwa silent (parasites kwenye placenta bila dalili wazi). Juu ya IPTp, lala chini ya neti iliyotiwa dawa kila usiku, na pata homa yoyote ichunguzwe haraka na kipimo cha malaria. Ikiwa uko kwenye cotrimoxazole kwa sababu ya VVU, IPTp-SP HAITOTOLEWI (dawa zinaingiliana vibaya) — cotrimoxazole yako inalinda dhidi ya malaria badala yake.',
      },
    },
    {
      q: {
        en: 'I am taking blood pressure medicine — is it safe to continue in pregnancy?',
        sw: 'Natumia dawa ya shinikizo la damu — ni salama kuendelea katika mimba?',
      },
      a: {
        en: 'It depends on WHICH medicine — some are safe in pregnancy and some are not, so this must be reviewed at the first ANC visit. The medicines to AVOID in pregnancy are ACE inhibitors (enalapril, lisinopril, captopril) and ARBs (losartan, telmisartan) — they can cause serious harm to the developing baby\'s kidneys and bones, especially after the first trimester. The safe pregnancy options most commonly used in Tanzania are methyldopa (Aldomet) — the long-standing first choice — labetalol, and nifedipine. Do NOT just stop your blood pressure medicine — uncontrolled blood pressure also harms the pregnancy. Bring your medicines to the ANC visit and ask for them to be reviewed. The same applies to many other long-term medicines (epilepsy drugs, statins, some antibiotics) — pregnancy is a reason to review, not to stop unilaterally.',
        sw: 'Inategemea NI dawa GANI — baadhi ni salama katika mimba na baadhi sio, hivyo hii lazima ipitiwe katika ziara ya kwanza ya ANC. Dawa za KUEPUKA katika mimba ni ACE inhibitors (enalapril, lisinopril, captopril) na ARBs (losartan, telmisartan) — zinaweza kusababisha madhara makubwa kwa figo na mifupa ya mtoto anayekua, hasa baada ya trimester ya kwanza. Chaguzi salama za mimba zinazotumika zaidi Tanzania ni methyldopa (Aldomet) — chaguo la kwanza la muda mrefu — labetalol, na nifedipine. USISIMAMISHE TU dawa yako ya shinikizo la damu — shinikizo la damu lisilodhibitiwa pia huumiza mimba. Lete dawa zako kwenye ziara ya ANC na uombe zipitiwe. Hali hiyo hiyo inatumika kwa dawa nyingine nyingi za muda mrefu (dawa za kifafa, statins, baadhi ya antibiotics) — mimba ni sababu ya kupitia, sio kusimamisha peke yako.',
        sw_mtaa: 'Inategemea ni dawa GANI — baadhi ni salama katika mimba na baadhi sio, hivyo hii lazima ipitiwe kwenye ziara ya kwanza ya ANC. Dawa za KUEPUKA katika mimba ni ACE inhibitors (enalapril, lisinopril, captopril) na ARBs (losartan, telmisartan) — zinaweza kusababisha madhara makubwa kwa figo na mifupa ya mtoto anayekua, hasa baada ya trimester ya kwanza. Pregnancy-safe options zinazotumika zaidi Tanzania ni methyldopa (Aldomet) — first choice ya muda mrefu — labetalol, na nifedipine. USISIMAMISHE TU dawa yako ya presha — uncontrolled presha pia inaumiza mimba. Lete dawa zako ANC visit na uombe zipitiwe. Hali hiyo hiyo inatumika kwa dawa nyingine nyingi za muda mrefu (anti-epileptics, statins, baadhi ya antibiotics) — mimba ni sababu ya kupitia, sio kusimamisha peke yako.',
      },
    },
    {
      q: {
        en: 'I have TB and I am pregnant — is my treatment safe for the baby?',
        sw: 'Nina TB na nina mimba — matibabu yangu ni salama kwa mtoto?',
      },
      a: {
        en: 'Yes — the standard TB four-drug combination (RHZE: rifampicin, isoniazid, pyrazinamide, ethambutol) is considered safe in pregnancy and breastfeeding. The drug to AVOID is streptomycin (it can cause congenital deafness) — but it is not part of standard first-line therapy. Pyridoxine (vitamin B6) is mandatory throughout treatment in pregnancy to prevent isoniazid-related nerve damage in mother and baby. Untreated TB is far more dangerous than the medicines: it causes miscarriage, preterm delivery, low birth weight, and can transmit to the newborn. Take every dose, attend both the DOT centre and ANC, and tell each team about the other. Breastfeeding is encouraged.',
        sw: 'Ndio — mchanganyiko wa kawaida wa dawa nne za TB (RHZE: rifampicin, isoniazid, pyrazinamide, ethambutol) unachukuliwa kuwa salama katika mimba na kunyonyesha. Dawa ya KUEPUKA ni streptomycin (inaweza kusababisha uziwi wa kuzaliwa) — lakini sio sehemu ya matibabu ya kawaida ya awali. Pyridoxine (vitamin B6) ni lazima katika matibabu yote katika mimba kuzuia uharibifu wa neva unaohusiana na isoniazid kwa mama na mtoto. TB isiyotibiwa ni hatari zaidi kuliko dawa: husababisha kuharibika kwa mimba, kujifungua kabla ya wakati, uzito mdogo wa kuzaliwa, na inaweza kuambukizwa kwa mtoto mchanga. Tumia kila dose, hudhuria kituo cha DOT na ANC, na waambie kila timu kuhusu nyingine. Kunyonyesha kunashauriwa.',
        sw_mtaa: 'Ndio — standard TB regimen ya dawa nne (RHZE: rifampicin, isoniazid, pyrazinamide, ethambutol) ni salama katika mimba na kunyonyesha. Dawa ya KUEPUKA ni streptomycin (inaweza kusababisha congenital deafness) — lakini sio sehemu ya standard first-line. Pyridoxine (vitamin B6) ni lazima katika treatment yote katika mimba kuzuia isoniazid-related nerve damage kwa mama na mtoto. Untreated TB ni hatari zaidi kuliko dawa: inasababisha miscarriage, preterm delivery, low birth weight, na inaweza kuambukizwa kwa mtoto mchanga. Tumia kila dose, hudhuria DOT centre na ANC, na waambie kila team kuhusu nyingine. Kunyonyesha kunashauriwa.',
      },
    },
    {
      q: {
        en: 'I feel sad and overwhelmed after delivery — is this normal?',
        sw: 'Najisikia huzuni na kulemewa baada ya kujifungua — hii ni kawaida?',
      },
      a: {
        en: 'Some emotional ups and downs in the first 1-2 weeks after delivery are very common — many women call them the "baby blues" — and they usually pass on their own. But when the low mood, hopelessness, exhaustion, anxiety, trouble bonding with the baby, or feelings of worthlessness last for more than 2 weeks, or are severe at any point, this is postnatal depression — a real medical condition that affects a meaningful share of mothers and is treatable. It does not mean you are a bad mother. Talk to a health worker at the postnatal clinic, a counsellor, or a trusted person. Treatment works — counselling, peer support, sometimes medication. Two things are urgent and need immediate help: any thoughts of harming yourself or harming the baby, or feeling you cannot keep the baby safe — go to a health facility today and ask for the mental health team. You and your baby both deserve this care.',
        sw: 'Mabadiliko ya kihisia katika wiki 1-2 za kwanza baada ya kujifungua ni ya kawaida sana — wanawake wengi huyaita "baby blues" — na kawaida hupita yenyewe. Lakini wakati hali ya chini ya moyo, kukata tamaa, uchovu, wasiwasi, ugumu wa kushikamana na mtoto, au hisia za kutokuwa na thamani zinapodumu zaidi ya wiki 2, au ni kali wakati wowote, hii ni unyogovu wa baada ya kujifungua — hali halisi ya kimatibabu inayoathiri sehemu kubwa ya akina mama na inatibika. Haimaanishi wewe ni mama mbaya. Ongea na mfanyakazi wa afya katika kliniki ya baada ya kujifungua, mshauri, au mtu unayemwamini. Matibabu hufanya kazi — ushauri, msaada wa wenzako, wakati mwingine dawa. Mambo mawili ni ya dharura na yanahitaji msaada wa haraka: mawazo yoyote ya kujidhuru au kumdhuru mtoto, au kuhisi huwezi kumweka mtoto salama — nenda kituo cha afya leo na uombe timu ya afya ya akili. Wewe na mtoto wako wote mnastahili huduma hii.',
        sw_mtaa: 'Mabadiliko ya kihisia katika wiki 1-2 za kwanza baada ya delivery ni ya kawaida sana — wanawake wengi wanayaita "baby blues" — na kawaida zinapita zenyewe. Lakini wakati low mood, hopelessness, uchovu, wasiwasi, ugumu wa kushikamana na mtoto, au hisia za kutokuwa na thamani zinapodumu zaidi ya wiki 2, au ni kali wakati wowote, hii ni postnatal depression — hali halisi ya kimatibabu inayoathiri share kubwa ya akina mama na inatibika. Haina maana wewe ni mama mbaya. Ongea na health worker kwenye postnatal clinic, counsellor, au mtu unayemwamini. Matibabu yanafanya kazi — counselling, peer support, wakati mwingine dawa. Mambo mawili ni urgent na yanahitaji msaada wa haraka: mawazo yoyote ya kujidhuru au kumdhuru mtoto, au kuhisi huwezi kumweka mtoto salama — nenda kituo cha afya leo na uombe mental health team. Wewe na mtoto wako wote mnastahili huduma hii.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Start ANC early — ideally before 12 weeks — and attend every contact. The 8-contact schedule exists because most maternal complications are catchable when looked for, and invisible when not.',
      sw: 'Anza ANC mapema — ikiwezekana kabla ya wiki 12 — na uhudhurie kila mawasiliano. Ratiba ya mawasiliano 8 ipo kwa sababu matatizo mengi ya kimama yanaweza kupatikana yanapotafutwa, na hayaonekani yasipotafutwa.',
      sw_mtaa: 'Anza ANC mapema — ikiwezekana kabla ya wiki 12 — na hudhuria kila contact. Ratiba ya contacts 8 ipo kwa sababu matatizo mengi ya kimama yanaweza kupatikana yanapotafutwa, na hayaonekani yasipotafutwa.',
    },
    {
      en: 'Take daily iron and folic acid throughout pregnancy as supplied at ANC — these prevent maternal anaemia and protect the baby\'s neural development.',
      sw: 'Tumia chuma na folate kila siku katika mimba yote kama unavyopewa ANC — hivi huzuia upungufu wa damu wa mama na hulinda maendeleo ya neva ya mtoto.',
      sw_mtaa: 'Tumia chuma na folate kila siku katika mimba yote kama unavyopewa ANC — hivi vinazuia upungufu wa damu wa mama na vinalinda neural development ya mtoto.',
    },
    {
      en: 'Take IPTp-SP for malaria prevention from the second trimester as offered at ANC, and sleep under an insecticide-treated net every night.',
      sw: 'Tumia IPTp-SP kuzuia malaria kuanzia trimester ya pili kama unavyopewa ANC, na lala chini ya neti iliyotiwa dawa kila usiku.',
      sw_mtaa: 'Tumia IPTp-SP kuzuia malaria kuanzia trimester ya pili kama unavyopewa ANC, na lala chini ya neti iliyotiwa dawa kila usiku.',
    },
    {
      en: 'Eat a varied diet — enough energy, protein (beans, fish, eggs, meat, milk), vegetables and fruit, iron-rich foods. You do not need to "eat for two" — eat well for one and a half.',
      sw: 'Kula chakula cha aina mbalimbali — nishati ya kutosha, protini (maharage, samaki, mayai, nyama, maziwa), mboga na matunda, vyakula vyenye chuma. Huhitaji "kula kwa wawili" — kula vizuri kwa mmoja na nusu.',
      sw_mtaa: 'Kula chakula cha aina mbalimbali — nishati ya kutosha, protini (maharage, samaki, mayai, nyama, maziwa), mboga na matunda, vyakula vyenye chuma. Huhitaji "kula kwa wawili" — kula vizuri kwa mmoja na nusu.',
    },
    {
      en: 'Avoid alcohol completely. Stop smoking. Limit caffeine. Discuss any traditional medicines or supplements with your ANC team before taking them — some are unsafe in pregnancy.',
      sw: 'Epuka pombe kabisa. Acha kuvuta sigara. Punguza kahawa. Jadili dawa zozote za jadi au virutubisho na timu yako ya ANC kabla ya kuzitumia — baadhi si salama katika mimba.',
      sw_mtaa: 'Epuka pombe kabisa. Acha kuvuta sigara. Punguza kahawa. Jadili dawa zozote za jadi au virutubisho na ANC team yako kabla ya kuzitumia — baadhi si salama katika mimba.',
    },
    {
      en: 'If you take long-term medicines (for blood pressure, diabetes, HIV, TB, epilepsy, mental health), bring them to the first ANC visit — some need to be switched to pregnancy-safe alternatives, but do not stop them on your own.',
      sw: 'Ikiwa unatumia dawa za muda mrefu (kwa shinikizo la damu, kisukari, VVU, TB, kifafa, afya ya akili), zilete kwenye ziara ya kwanza ya ANC — baadhi zinahitaji kubadilishwa kwa mbadala salama wa mimba, lakini usizisimamishe peke yako.',
      sw_mtaa: 'Ikiwa unatumia dawa za muda mrefu (kwa presha, kisukari, VVU, TB, kifafa, mental health), zilete kwenye first ANC visit — baadhi zinahitaji kubadilishwa kwa pregnancy-safe alternatives, lakini usizisimamishe peke yako.',
    },
    {
      en: 'Make a delivery plan in advance: which facility, how you will get there (transport), who will accompany you, where the money for transport and supplies will come from, and a back-up plan. Many maternal emergencies are lost in the time it takes to decide and travel.',
      sw: 'Tengeneza mpango wa kujifungua mapema: kituo gani, utafikaje (usafiri), nani atakufuatana, pesa za usafiri na vifaa zitatoka wapi, na mpango wa akiba. Dharura nyingi za kimama hupotea katika muda inaochukua kuamua na kusafiri.',
      sw_mtaa: 'Tengeneza plan ya delivery mapema: kituo gani, utafikaje (usafiri), nani atakufuatana, pesa za usafiri na vifaa zitatoka wapi, na backup plan. Dharura nyingi za kimama zinapotea katika muda inaochukua kuamua na kusafiri.',
    },
    {
      en: 'Deliver at a health facility with a skilled birth attendant — this single decision dramatically reduces the risk of both maternal and newborn death, because complications are recognised and treated immediately.',
      sw: 'Jifungue katika kituo cha afya na mtaalamu wa afya wa kujifungua — uamuzi huu mmoja hupunguza kwa kiasi kikubwa hatari ya vifo vya mama na mtoto mchanga, kwa sababu matatizo hugundulika na kutibiwa mara moja.',
      sw_mtaa: 'Jifungue kituoni na skilled birth attendant — uamuzi huu mmoja unapunguza kwa kiasi kikubwa risk ya vifo vya mama na mtoto mchanga, kwa sababu complications zinagundulika na kutibiwa mara moja.',
    },
    {
      en: 'Learn the danger signs of pregnancy and the early days after delivery — and trust them. If you have severe headache, vision changes, swelling, upper-belly pain, seizures, heavy bleeding, severe pain, fever, or the baby moves much less — go in immediately, do not wait until morning.',
      sw: 'Jifunze dalili za hatari za mimba na siku za mwanzo baada ya kujifungua — na uziamini. Ikiwa una kichwa kikali, mabadiliko ya kuona, uvimbe, maumivu ya tumbo la juu, degedege, kutoka damu nyingi, maumivu makali, homa, au mtoto kusonga kidogo zaidi — ingia mara moja, usisubiri hadi asubuhi.',
      sw_mtaa: 'Jifunze danger signs za mimba na siku za mwanzo baada ya delivery — na uziamini. Ikiwa una kichwa kikali, vision changes, uvimbe, maumivu ya tumbo la juu, degedege, damu nyingi, maumivu makali, homa, au mtoto kusonga kidogo zaidi — ingia mara moja, usisubiri hadi asubuhi.',
    },
    {
      en: 'Attend the postnatal contacts — the first within 24 hours of birth, then again at week 1 and around 6 weeks. Many maternal deaths happen in the first week after delivery, and the postnatal visit catches problems including bleeding, infection, blood pressure issues, breastfeeding problems, and postnatal depression.',
      sw: 'Hudhuria mawasiliano ya baada ya kujifungua — ya kwanza ndani ya masaa 24 ya kuzaliwa, kisha tena wiki ya 1 na karibu wiki 6. Vifo vingi vya kimama hutokea katika wiki ya kwanza baada ya kujifungua, na ziara ya baada ya kujifungua hugundua matatizo ikiwa ni pamoja na kutoka damu, maambukizi, masuala ya shinikizo la damu, matatizo ya kunyonyesha, na unyogovu wa baada ya kujifungua.',
      sw_mtaa: 'Hudhuria postnatal contacts — ya kwanza ndani ya masaa 24 ya kuzaliwa, kisha tena wiki ya 1 na karibu wiki 6. Vifo vingi vya kimama vinatokea katika wiki ya kwanza baada ya delivery, na postnatal visit inagundua matatizo ikiwa ni pamoja na bleeding, infection, BP issues, matatizo ya kunyonyesha, na postnatal depression.',
    },
  ],

  warningTriggers: [
    {
      en: 'Delaying ANC start past the first trimester — the most leverage on the whole pregnancy comes from early identification of risk.',
      sw: 'Kuchelewesha kuanza ANC zaidi ya trimester ya kwanza — nguvu kubwa zaidi kwenye mimba nzima inatoka kwa kutambua hatari mapema.',
      sw_mtaa: 'Kuchelewesha kuanza ANC zaidi ya first trimester — nguvu kubwa zaidi kwenye mimba nzima inatoka kwa kutambua hatari mapema.',
    },
    {
      en: 'Skipping ANC visits because "I feel fine" — pre-eclampsia, growth restriction, and gestational diabetes can be silent until late.',
      sw: 'Kuruka ziara za ANC kwa sababu "najisikia mzima" — pre-eclampsia, growth restriction, na kisukari cha mimba vinaweza kuwa kimya hadi marehemu.',
      sw_mtaa: 'Kuruka ANC visits kwa sababu "najisikia mzima" — pre-eclampsia, growth restriction, na GDM vinaweza kuwa silent hadi late.',
    },
    {
      en: 'Stopping a chronic medicine on your own when you become pregnant — uncontrolled hypertension, diabetes, epilepsy, HIV, and TB are all far more harmful to the pregnancy than a properly chosen, pregnancy-safe medicine.',
      sw: 'Kusimamisha dawa ya muda mrefu peke yako unapopata mimba — shinikizo la damu, kisukari, kifafa, VVU, na TB visivyodhibitiwa vinadhuru zaidi mimba kuliko dawa iliyochaguliwa vizuri, salama ya mimba.',
      sw_mtaa: 'Kusimamisha dawa ya muda mrefu peke yako unapopata mimba — uncontrolled hypertension, diabetes, epilepsy, VVU, na TB vinadhuru zaidi mimba kuliko dawa iliyochaguliwa vizuri, pregnancy-safe.',
    },
    {
      en: 'Taking ACE inhibitors or ARBs in pregnancy — these can cause serious fetal harm; they must be switched at the first ANC visit.',
      sw: 'Kutumia ACE inhibitors au ARBs katika mimba — hizi zinaweza kusababisha madhara makubwa kwa fetasi; ni lazima zibadilishwe katika ziara ya kwanza ya ANC.',
      sw_mtaa: 'Kutumia ACE inhibitors au ARBs katika mimba — hizi zinaweza kusababisha fetal harm kubwa; ni lazima zibadilishwe kwenye first ANC visit.',
    },
    {
      en: 'Untested traditional remedies, especially uterotonic herbs or "to bring on labour" preparations — these can cause uterine rupture, fetal distress, or PPH.',
      sw: 'Tiba za jadi zisizojaribiwa, hasa mimea ya uterotonic au maandalizi ya "kuleta leba" — yanaweza kusababisha kupasuka kwa mji wa mimba, fetal distress, au PPH.',
      sw_mtaa: 'Traditional remedies zisizojaribiwa, hasa uterotonic herbs au "kuleta leba" preparations — zinaweza kusababisha uterine rupture, fetal distress, au PPH.',
    },
    {
      en: 'Choosing home delivery without a skilled attendant — most pregnancies are uncomplicated, but the ones that develop emergencies need facility-level help fast, and home delivery in those cases is where many maternal deaths happen.',
      sw: 'Kuchagua kujifungua nyumbani bila mtaalamu wa afya — mimba nyingi hazina shida, lakini zile zinazoendeleza dharura zinahitaji msaada wa kiwango cha kituo haraka, na kujifungua nyumbani katika kesi hizo ni mahali ambapo vifo vingi vya kimama hutokea.',
      sw_mtaa: 'Kuchagua home delivery bila skilled attendant — mimba nyingi hazina shida, lakini zile zinazoendeleza dharura zinahitaji facility-level help haraka, na home delivery katika cases hizo ni mahali ambapo vifo vingi vya kimama vinatokea.',
    },
    {
      en: 'Hiding symptoms (headache, vision changes, swelling, reduced fetal movement, bleeding) hoping they will pass — every danger sign in pregnancy is more dangerous when reported late.',
      sw: 'Kuficha dalili (kichwa, mabadiliko ya kuona, uvimbe, mwendo wa fetasi uliopungua, kutoka damu) ukitumaini zitapita — kila dalili ya hatari katika mimba ni hatari zaidi inaporipotiwa kuchelewa.',
      sw_mtaa: 'Kuficha symptoms (kichwa, vision changes, uvimbe, reduced fetal movement, bleeding) ukitumaini zitapita — kila danger sign katika mimba ni hatari zaidi inaporipotiwa kuchelewa.',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Seizures, severe headache that will not go away, blurred or double vision, severe upper-belly pain on the right side — possible severe pre-eclampsia or eclampsia. EMERGENCY',
        sw: 'Degedege, kichwa kikali kisichoisha, kuona ukungu au mara mbili, maumivu makali ya tumbo la juu upande wa kulia — uwezekano wa pre-eclampsia kali au eclampsia. DHARURA',
        sw_mtaa: 'Degedege, kichwa kikali kisichoisha, kuona ukungu au mara mbili, maumivu makali ya tumbo la juu upande wa kulia — uwezekano wa severe pre-eclampsia au eclampsia. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Heavy vaginal bleeding at any stage of pregnancy, or after delivery soaking more than one pad an hour or with large clots — possible miscarriage, placental abruption, or PPH. EMERGENCY',
        sw: 'Kutoka damu nyingi ukeni katika hatua yoyote ya mimba, au baada ya kujifungua kulowanisha zaidi ya pedi moja kwa saa au kwa vipande vikubwa — uwezekano wa kuharibika kwa mimba, placental abruption, au PPH. DHARURA',
        sw_mtaa: 'Damu nyingi ukeni katika hatua yoyote ya mimba, au baada ya delivery inayolowanisha zaidi ya pedi moja kwa saa au kwa vipande vikubwa — uwezekano wa miscarriage, placental abruption, au PPH. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Baby moving much less than usual, or not at all, especially after 28 weeks — possible fetal distress. EMERGENCY assessment',
        sw: 'Mtoto kusonga kidogo zaidi ya kawaida, au kutosonga kabisa, hasa baada ya wiki 28 — uwezekano wa fetal distress. Tathmini ya DHARURA',
        sw_mtaa: 'Mtoto kusonga kidogo zaidi ya kawaida, au kutosonga kabisa, hasa baada ya wiki 28 — uwezekano wa fetal distress. EMERGENCY assessment',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Fluid leaking from the vagina before 37 weeks — possible preterm premature rupture of membranes. Go in urgently',
        sw: 'Maji kutoka ukeni kabla ya wiki 37 — uwezekano wa kupasuka kwa membrane kabla ya wakati. Ingia kwa haraka',
        sw_mtaa: 'Maji kutoka ukeni kabla ya wiki 37 — uwezekano wa preterm premature rupture of membranes. Ingia kwa haraka',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'High fever in pregnancy or after delivery, with chills, abdominal pain, or foul-smelling discharge — possible serious infection / sepsis. EMERGENCY',
        sw: 'Homa kali katika mimba au baada ya kujifungua, pamoja na baridi, maumivu ya tumbo, au usaha wenye harufu mbaya — uwezekano wa maambukizi makubwa / sepsis. DHARURA',
        sw_mtaa: 'Homa kali katika mimba au baada ya delivery, pamoja na baridi, maumivu ya tumbo, au usaha wenye harufu mbaya — uwezekano wa serious infection / sepsis. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe vomiting that prevents keeping any food or fluid down, especially in early pregnancy — possible hyperemesis gravidarum needing fluids and anti-emetics',
        sw: 'Kutapika kali kunakozuia kushikilia chakula au kioevu chochote, hasa mimba ya mwanzo — uwezekano wa hyperemesis gravidarum unaohitaji kioevu na dawa za kuzuia kutapika',
        sw_mtaa: 'Kutapika kali kunakozuia kushikilia chakula au kioevu chochote, hasa early pregnancy — uwezekano wa hyperemesis gravidarum unaohitaji fluids na anti-emetics',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'New sudden swelling of the face, hands, or one leg, especially with calf pain — possible pre-eclampsia or deep vein thrombosis. Urgent assessment',
        sw: 'Uvimbe mpya wa ghafla wa uso, mikono, au mguu mmoja, hasa pamoja na maumivu ya muundi — uwezekano wa pre-eclampsia au deep vein thrombosis. Tathmini ya haraka',
        sw_mtaa: 'New sudden uvimbe wa uso, mikono, au mguu mmoja, hasa pamoja na maumivu ya calf — uwezekano wa pre-eclampsia au DVT. Urgent assessment',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Burning urination, fever, or back pain in pregnancy — possible urinary tract infection or kidney infection, can trigger preterm labour if untreated',
        sw: 'Kuwaka wakati wa kukojoa, homa, au maumivu ya mgongo katika mimba — uwezekano wa maambukizi ya njia ya mkojo au figo, yanaweza kusababisha leba ya mapema yasipotibiwa',
        sw_mtaa: 'Kuwaka wakati wa kukojoa, homa, au maumivu ya mgongo katika mimba — uwezekano wa UTI au kidney infection, inaweza kusababisha preterm labour yasipotibiwa',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Thoughts of self-harm or harming the baby in pregnancy or postnatally — urgent mental health support; help is available and effective',
        sw: 'Mawazo ya kujidhuru au kumdhuru mtoto katika mimba au baada ya kujifungua — msaada wa haraka wa afya ya akili; msaada unapatikana na unafanya kazi',
        sw_mtaa: 'Mawazo ya kujidhuru au kumdhuru mtoto katika mimba au postnatally — urgent mental health support; msaada unapatikana na unafanya kazi',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Persistent severe abdominal pain, or sudden severe lower-belly pain in early pregnancy — possible ectopic pregnancy (life-threatening) or other surgical emergency',
        sw: 'Maumivu makali ya tumbo yanayoendelea, au maumivu makali ya ghafla ya tumbo la chini katika mimba ya mwanzo — uwezekano wa mimba ya nje (hatari ya maisha) au dharura nyingine ya upasuaji',
        sw_mtaa: 'Maumivu makali ya tumbo yanayoendelea, au sudden severe lower-belly pain katika early pregnancy — uwezekano wa ectopic pregnancy (life-threatening) au surgical emergency nyingine',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  variants: MATERNAL_VARIANTS,

  comorbidityNotes: [
    {
      coCondition: 'hiv',
      note: {
        en: 'Pregnancy with HIV is highly manageable through PMTCT: continue ART through pregnancy, delivery, and breastfeeding; aim for an undetectable viral load before delivery; the baby gets preventive ARV and is tested at intervals; breastfeed exclusively for 6 months if you are adherent and undetectable. Untreated HIV in pregnancy is far more dangerous than the medicines. Combined ANC + CTC care is the standard.',
        sw: 'Mimba na VVU inaweza kudhibitiwa vizuri kupitia PMTCT: endelea na ART katika mimba, kujifungua, na kunyonyesha; lenga viral load isiyoonekana kabla ya kujifungua; mtoto hupata ARV ya kuzuia na hupimwa kwa vipindi; nyonyesha kwa maziwa ya mama pekee kwa miezi 6 ikiwa unazingatia na huonekani. VVU isiyotibiwa katika mimba ni hatari zaidi kuliko dawa. Huduma ya pamoja ya ANC + CTC ni kiwango.',
        sw_mtaa: 'Mimba na VVU inaweza kudhibitiwa vizuri kupitia PMTCT: endelea na ART katika mimba, delivery, na kunyonyesha; lenga undetectable viral load kabla ya delivery; mtoto anapata preventive ARV na anapimwa kwa vipindi; nyonyesha exclusively kwa miezi 6 ikiwa una adherence na undetectable. Untreated VVU katika mimba ni hatari zaidi kuliko dawa. Combined ANC + CTC care ni standard.',
      },
    },
    {
      coCondition: 'tb',
      note: {
        en: 'RHZE (rifampicin, isoniazid, pyrazinamide, ethambutol) is safe in pregnancy. Avoid streptomycin (congenital deafness). Take pyridoxine throughout. Untreated TB in pregnancy raises miscarriage, preterm birth, and neonatal TB risks far above the risks of the medicines. Combined ANC + DOT clinic follow-up.',
        sw: 'RHZE (rifampicin, isoniazid, pyrazinamide, ethambutol) ni salama katika mimba. Epuka streptomycin (uziwi wa kuzaliwa). Tumia pyridoxine katika muda wote. TB isiyotibiwa katika mimba huongeza hatari za kuharibika kwa mimba, kujifungua kabla ya wakati, na TB ya mtoto mchanga zaidi ya hatari za dawa. Ufuatiliaji wa pamoja wa ANC + kituo cha DOT.',
        sw_mtaa: 'RHZE (rifampicin, isoniazid, pyrazinamide, ethambutol) ni salama katika mimba. Epuka streptomycin (congenital deafness). Tumia pyridoxine throughout. Untreated TB katika mimba inaongeza miscarriage, preterm birth, na neonatal TB risks zaidi ya risks za dawa. Combined ANC + DOT clinic follow-up.',
      },
    },
    {
      coCondition: 'malaria',
      note: {
        en: 'Malaria in pregnancy can be severe and silent (placental sequestration). Prevention is essential: IPTp-SP from the second trimester, at least three doses spaced ≥4 weeks apart; insecticide-treated nets every night. For treatment of confirmed malaria in pregnancy, ACT (artemether-lumefantrine) is now recommended throughout pregnancy in line with current WHO guidance; quinine is no longer the routine first-line in the first trimester in most settings. Severe malaria in pregnancy is treated with IV artesunate. Cross-reference the malaria block for full pathways.',
        sw: 'Malaria katika mimba inaweza kuwa kali na kimya (placental sequestration). Kuzuia ni muhimu: IPTp-SP kuanzia trimester ya pili, angalau dose tatu zikitenganishwa wiki ≥4; neti zenye dawa kila usiku. Kwa matibabu ya malaria iliyothibitishwa katika mimba, ACT (artemether-lumefantrine) sasa inashauriwa katika mimba yote kwa kufuata mwongozo wa sasa wa WHO; quinine sio tena first-line ya kawaida katika trimester ya kwanza katika maeneo mengi. Malaria kali katika mimba hutibiwa kwa IV artesunate. Rejea block ya malaria kwa njia kamili.',
        sw_mtaa: 'Malaria katika mimba inaweza kuwa severe na silent (placental sequestration). Prevention ni muhimu: IPTp-SP kuanzia trimester ya pili, angalau dose tatu zikitenganishwa wiki ≥4; insecticide-treated nets kila usiku. Kwa treatment ya confirmed malaria katika mimba, ACT (artemether-lumefantrine) sasa inashauriwa katika mimba yote kwa kufuata current WHO guidance; quinine sio tena routine first-line katika first trimester katika maeneo mengi. Severe malaria katika mimba inatibiwa kwa IV artesunate. Cross-reference malaria block kwa full pathways.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Pre-existing type 1 or type 2 diabetes in a woman planning pregnancy needs careful pre-conception optimisation: target HbA1c < 6.5% before conception if possible, switch off teratogenic medicines (statins, ACE inhibitors, ARBs, most non-insulin agents) to insulin or metformin where appropriate, and take 5 mg/day folic acid pre-conceptionally. Tight glucose control through pregnancy reduces congenital malformations, large-for-gestational-age babies, and stillbirth. GDM is covered in its own variant.',
        sw: 'Kisukari cha awali aina ya 1 au aina ya 2 kwa mwanamke anayepanga mimba kinahitaji uboreshaji wa makini wa kabla ya kupata mimba: lenga HbA1c < 6.5% kabla ya kupata mimba ikiwezekana, badili dawa za teratogenic (statins, ACE inhibitors, ARBs, mawakala wengi wasio insulin) kwa insulin au metformin pale inapofaa, na chukua folate mg 5/siku kabla ya kupata mimba. Udhibiti madhubuti wa sukari katika mimba hupunguza ulemavu wa kuzaliwa, watoto wakubwa kwa umri wa mimba, na vifo kabla ya kuzaliwa. GDM imefunikwa katika variant yake.',
        sw_mtaa: 'Pre-existing type 1 au type 2 diabetes kwa mwanamke anayepanga mimba inahitaji careful pre-conception optimisation: target HbA1c < 6.5% kabla ya conception ikiwezekana, badili dawa za teratogenic (statins, ACE inhibitors, ARBs, non-insulin agents wengi) kwa insulin au metformin pale inapofaa, na chukua folate mg 5/siku pre-conceptionally. Tight glucose control katika mimba inapunguza congenital malformations, large-for-gestational-age babies, na stillbirth. GDM imefunikwa katika variant yake.',
      },
    },
    {
      coCondition: 'hypertension',
      note: {
        en: 'Pre-existing hypertension in pregnancy: switch ACE inhibitors / ARBs to a pregnancy-safe option (methyldopa first-line in Tanzania, with labetalol or nifedipine as alternatives). Monitor for superimposed pre-eclampsia. Low-dose aspirin from week 12 reduces pre-eclampsia risk in selected high-risk women.',
        sw: 'Shinikizo la damu la awali katika mimba: badili ACE inhibitors / ARBs kwa chaguo salama la mimba (methyldopa first-line Tanzania, na labetalol au nifedipine kama mbadala). Fuatilia kwa pre-eclampsia iliyoongezwa. Aspirin ya dose ndogo kutoka wiki 12 hupunguza hatari ya pre-eclampsia kwa wanawake walio katika hatari kubwa waliochaguliwa.',
        sw_mtaa: 'Pre-existing hypertension katika mimba: badili ACE inhibitors / ARBs kwa pregnancy-safe option (methyldopa first-line Tanzania, na labetalol au nifedipine kama alternatives). Monitor kwa superimposed pre-eclampsia. Low-dose aspirin kutoka wiki 12 inapunguza pre-eclampsia risk kwa selected high-risk women.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'CKD in pregnancy raises risks of pre-eclampsia, preterm delivery, and accelerated kidney function decline. Pre-conception counselling matters: women with eGFR < 60 have higher complication rates, and those with eGFR < 30 should plan pregnancies very carefully with a nephrology and obstetric team. ACE inhibitors / ARBs (often used in CKD) must be switched before or as soon as pregnancy is confirmed. Joint nephrology + ANC care, more frequent visits, and tight blood pressure control are standard.',
        sw: 'CKD katika mimba huongeza hatari za pre-eclampsia, kujifungua kabla ya wakati, na kushuka kwa kasi kwa utendaji wa figo. Ushauri kabla ya kupata mimba ni muhimu: wanawake wenye eGFR < 60 wana viwango vya juu vya matatizo, na wale wenye eGFR < 30 wanapaswa kupanga mimba kwa makini sana na timu ya magonjwa ya figo na uzazi. ACE inhibitors / ARBs (mara nyingi hutumika kwa CKD) lazima zibadilishwe kabla au mara mimba inapothibitishwa. Huduma ya pamoja ya nephrology + ANC, ziara za mara kwa mara zaidi, na udhibiti madhubuti wa shinikizo la damu ni kiwango.',
        sw_mtaa: 'CKD katika mimba inaongeza risks za pre-eclampsia, preterm delivery, na accelerated kidney function decline. Pre-conception counselling ni muhimu: wanawake wenye eGFR < 60 wana higher complication rates, na wale wenye eGFR < 30 wanapaswa kupanga mimba kwa makini sana na nephrology na obstetric team. ACE inhibitors / ARBs (mara nyingi zinatumika katika CKD) lazima zibadilishwe kabla au mara mimba inapothibitishwa. Joint nephrology + ANC care, more frequent visits, na tight BP control ni standard.',
      },
    },
  ],

  sources: [
    src('MOH_TZ_MATERNAL_2024'),
    src('WHO_ANC_2016'),
    src('WHO_PREECLAMPSIA_2023'),
    src('WHO_PPH_2017'),
    src('FIGO_PREECLAMPSIA_2024'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NTLG_STG_2023'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
