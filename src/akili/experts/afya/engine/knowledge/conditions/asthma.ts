/**
 * Asthma — Full Condition Knowledge (Phase 9, 100% all-in coverage)
 *
 * Sources: GINA 2024 (Global Initiative for Asthma), WHO PEN 2020, NTLG STG
 *          2023, WHO AWaRe 2023 (antibiotic stewardship in asthma — usually
 *          NOT indicated), IMCI 2024 (pediatric wheeze framing), WHO Oxygen
 *          2023 (acute exacerbation oxygen targets).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in via variants):
 *   • Mild persistent asthma (controller + reliever, low burden)
 *   • Moderate persistent asthma (combination ICS + LABA, regular review)
 *   • Severe persistent asthma (high-dose ICS, add-on therapy, specialist)
 *   • Acute exacerbation (SABA + oral steroid, oxygen if SpO2 < 92%)
 *   • Life-threatening asthma (silent chest, exhaustion, cyanosis — ICU)
 *   • Pediatric asthma (IMCI age-banded, parental education focus)
 *   • Exercise-induced asthma (pre-treatment with SABA)
 *
 * Comorbidities: allergic rhinitis (very common comorbidity), GERD, obesity,
 * pregnancy (asthma can WORSEN, IMPROVE, or stay SAME — all three equally),
 * smoking, occupational exposures, viral URIs (most common trigger).
 *
 * SCOPE: We educate patients, families, and caregivers on what asthma is,
 * how to recognise an exacerbation early, the critical difference between
 * reliever (SABA) and controller (ICS), and when an attack is becoming
 * an emergency. We do NOT prescribe specific dose regimens, do NOT replace
 * the asthma action plan, and we emphasise that step-up/step-down decisions
 * belong with the clinician.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { ASTHMA_VARIANTS } from './asthma.variants';

export const ASTHMA: ConditionKnowledge = {
  id: 'asthma',
  aliases: CONDITION_ALIASES.asthma,
  category: 'respiratory',

  whatItIs: {
    en: 'Asthma is a chronic condition of the airways — the tubes that carry air in and out of the lungs. In asthma, those tubes are sensitive and inflamed, and they react to triggers (cold air, dust, smoke, exercise, viral colds, allergens) by tightening up and producing extra mucus. When the airways narrow, air whistles through them — that is the wheeze — and breathing becomes harder, often with cough and chest tightness. Between attacks, many people with asthma feel completely well, which is why it is easy to underestimate. Asthma is not contagious, it is not the same as pneumonia, and it does not "go away with antibiotics" — antibiotics treat infection, not airway inflammation. The cornerstone of good asthma control is daily controller medication (almost always an inhaled steroid), used even when the person feels well, plus a reliever for when symptoms break through.',
    sw: 'Pumu ni hali sugu ya njia za hewa — mirija inayobeba hewa kwenda na kutoka mapafuni. Katika pumu, mirija hiyo ni nyeti na imevimba, na inajibu vichocheo (hewa baridi, vumbi, moshi, mazoezi, mafua ya virusi, allergens) kwa kufunga na kutoa kamasi ya ziada. Mirija ya hewa inapopungua, hewa inapita ndani yake kwa sauti ya kuvuma — hilo ndilo wheeze — na kupumua kunakuwa kugumu, mara nyingi pamoja na kikohozi na kifua kuwa kinabana. Kati ya mashambulizi, watu wengi wenye pumu wanajihisi vizuri kabisa, ndio maana ni rahisi kuipuuza. Pumu si ya kuambukiza, sio sawa na nimonia, na "haiendi na antibiotics" — antibiotics zinatibu maambukizi, sio uvimbe wa njia za hewa. Msingi wa udhibiti mzuri wa pumu ni dawa ya kila siku ya kudhibiti (karibu daima ni steroid ya kuvuta), inayotumika hata mtu anapojihisi vizuri, pamoja na reliever kwa wakati dalili zinapotokea.',
    sw_mtaa: 'Pumu ni chronic condition ya airways — mirija inayobeba hewa kwenda na kutoka mapafuni. Katika pumu, mirija hiyo ni sensitive na inflamed, na inareact kwa triggers (hewa baridi, vumbi, moshi, mazoezi, viral colds, allergens) kwa kutighten na kutoa kamasi ya ziada. Airways zinapopungua, hewa inapita kwa whistle — hilo ndilo wheeze — na breathing inakuwa harder, mara nyingi pamoja na cough na chest tightness. Between attacks, watu wengi wenye pumu wanajihisi vizuri kabisa, ndio maana ni rahisi ku-underestimate. Pumu si ya kuambukiza, sio sawa na nimonia, na "haiendi na antibiotics" — antibiotics zinatibu infection, sio airway inflammation. Cornerstone ya good asthma control ni daily controller medication (karibu daima ni inhaled steroid), inayotumika hata mtu anapojihisi vizuri, pamoja na reliever kwa wakati symptoms zinapobreak through.',
  },

  whyItMatters: {
    en: 'Asthma kills people who did not need to die. Most asthma deaths happen in patients with mild or moderate disease — not the severe cases — because they treated their reliever inhaler as the whole treatment, ignored worsening symptoms over days, and arrived at hospital exhausted and too late. Three habits change outcomes. First: an inhaled steroid (controller) every day, every day, even when you feel well — this prevents 90% of attacks. Second: a written asthma action plan that tells you what to do when symptoms creep up — increase the controller, start oral steroid, when to come in. Third: recognise the danger signs that mean go to hospital now, not tomorrow — cannot speak full sentences, lips turning blue, reliever not working, exhausted from breathing. In Tanzania, asthma is often under-diagnosed (mistaken for "recurrent chest infection") and under-controlled (treated with antibiotics or syrups instead of inhaled steroid). Good asthma control means a normal life — sport, pregnancy, work, sleep — not a life arranged around the inhaler.',
    sw: 'Pumu inaua watu ambao hawakuhitaji kufa. Vifo vingi vya pumu hutokea kwa wagonjwa wa ugonjwa mdogo au wa kati — sio kesi kali — kwa sababu walitumia reliever inhaler kama matibabu yote, walipuuza dalili zinazozidi kuwa mbaya kwa siku, na walifika hospitalini wakiwa wamechoka na kuchelewa sana. Tabia tatu hubadilisha matokeo. Kwanza: steroid ya kuvuta (controller) kila siku, kila siku, hata unapojihisi vizuri — hii inazuia 90% ya mashambulizi. Pili: mpango ulioandikwa wa kitendo cha pumu unaokuelezea cha kufanya wakati dalili zinapojitokeza — ongeza controller, anza steroid ya kumeza, lini wa kuja. Tatu: tambua dalili za hatari zinazomaanisha nenda hospitali sasa, sio kesho — huwezi kusema sentensi kamili, midomo inageuka bluu, reliever haifanyi kazi, umechoka kwa kupumua. Tanzania, pumu mara nyingi haitambuliki vizuri (inadhaniwa "maambukizi ya kifua ya mara kwa mara") na haidhibitiwi vizuri (inatibiwa kwa antibiotics au syrups badala ya inhaled steroid). Udhibiti mzuri wa pumu unamaanisha maisha ya kawaida — michezo, mimba, kazi, usingizi — sio maisha yaliyopangwa kuzunguka inhaler.',
    sw_mtaa: 'Pumu inaua watu ambao hawakuhitaji kufa. Most asthma deaths zinatokea kwa patients wa mild au moderate disease — sio severe cases — kwa sababu walitumia reliever inhaler kama whole treatment, walipuuza worsening symptoms kwa siku, na walifika hospitalini wakiwa wamechoka na too late. Habits tatu zinabadilisha outcomes. Kwanza: inhaled steroid (controller) kila siku, kila siku, hata unapojihisi vizuri — hii inazuia 90% ya attacks. Pili: written asthma action plan unaokuelezea cha kufanya wakati symptoms zinapojitokeza — ongeza controller, anza oral steroid, lini wa kuja. Tatu: tambua danger signs zinazomaanisha nenda hospitali sasa, sio kesho — huwezi kusema full sentences, midomo inageuka bluu, reliever haifanyi kazi, umechoka kwa breathing. Tanzania, pumu mara nyingi ni under-diagnosed (inadhaniwa "recurrent chest infection") na under-controlled (inatibiwa kwa antibiotics au syrups badala ya inhaled steroid). Good asthma control inamaanisha normal life — sport, pregnancy, kazi, sleep — sio maisha yaliyopangwa around inhaler.',
  },

  commonQuestions: [
    {
      q: {
        en: 'What is the difference between asthma and bronchitis?',
        sw: 'Kuna tofauti gani kati ya pumu na bronchitis?',
      },
      a: {
        en: 'Bronchitis is inflammation of the bronchi — usually caused by a viral infection — and it comes on, lasts 1-3 weeks, and goes away. The cough may linger, but the underlying airway changes resolve. Asthma is a chronic, lifelong tendency of the airways to become inflamed and narrow in response to triggers — even between attacks the airway is still abnormally sensitive, which is why daily controller treatment matters even when you feel fine. The two can overlap: a viral chest infection often triggers an asthma exacerbation. Two clues that point to asthma rather than "just bronchitis": (1) the symptoms come and go — wheeze and cough that get worse at night, with exercise, with cold air, or with allergens, and ease between episodes; (2) the symptoms respond clearly to a reliever inhaler (salbutamol) within 5-15 minutes — antibiotics for "bronchitis" do nothing for asthma because the problem is inflammation and bronchospasm, not infection. If you find yourself getting "chest infection" three or more times a year, ask the clinician to consider asthma.',
        sw: 'Bronchitis ni uvimbe wa bronchi — kawaida husababishwa na maambukizi ya virusi — na hutokea, hudumu wiki 1-3, na huondoka. Kikohozi kinaweza kusalia, lakini mabadiliko ya msingi ya njia za hewa huisha. Pumu ni mwelekeo sugu, wa maisha yote wa njia za hewa kuvimba na kupungua kwa kujibu vichocheo — hata kati ya mashambulizi njia ya hewa bado ni nyeti isivyo kawaida, ndio sababu matibabu ya kila siku ya controller yanajali hata unapojihisi vizuri. Mbili zinaweza kuingiliana: maambukizi ya virusi ya kifua mara nyingi huchochea exacerbation ya pumu. Vidokezo viwili vinavyoelekeza kwa pumu badala ya "bronchitis tu": (1) dalili huja na kuondoka — wheeze na kikohozi vinazidi usiku, kwa mazoezi, na hewa baridi, au na allergens, na hupungua kati ya vipindi; (2) dalili hujibu wazi kwa reliever inhaler (salbutamol) ndani ya dakika 5-15 — antibiotics kwa "bronchitis" hazifanyi chochote kwa pumu kwa sababu tatizo ni uvimbe na bronchospasm, sio maambukizi. Ukijikuta unapata "maambukizi ya kifua" mara tatu au zaidi kwa mwaka, muulize daktari afikirie pumu.',
        sw_mtaa: 'Bronchitis ni inflammation ya bronchi — kawaida inasababishwa na viral infection — na inatokea, inadumu wiki 1-3, na inaondoka. Cough inaweza kusalia, lakini underlying airway changes zinaresolve. Pumu ni chronic, lifelong tendency ya airways kuwa inflamed na narrow kwa response ya triggers — hata between attacks airway bado ni abnormally sensitive, ndio sababu daily controller treatment inajali hata unapojihisi fine. Hizo mbili zinaweza ku-overlap: viral chest infection mara nyingi inatrigger asthma exacerbation. Clues mbili zinazoelekeza kwa pumu badala ya "just bronchitis": (1) symptoms zinakuja na kuondoka — wheeze na cough vinazidi usiku, kwa exercise, na cold air, au na allergens, na zinaease between episodes; (2) symptoms zinajibu clearly kwa reliever inhaler (salbutamol) ndani ya dakika 5-15 — antibiotics kwa "bronchitis" hazifanyi chochote kwa pumu kwa sababu problem ni inflammation na bronchospasm, sio infection. Ukijikuta unapata "chest infection" mara tatu au zaidi kwa mwaka, muulize clinician afikirie pumu.',
      },
    },
    {
      q: {
        en: 'My salbutamol inhaler works, so why do I need a steroid inhaler too?',
        sw: 'Salbutamol inhaler yangu inafanya kazi, kwa nini ninahitaji steroid inhaler pia?',
      },
      a: {
        en: 'This is one of the most important questions in asthma — and the most common reason people end up in hospital. The salbutamol (or "blue") inhaler is a reliever — it relaxes the muscle around the airways and opens them up, fast. It treats the symptom (narrowing) but does nothing for the underlying problem (inflammation). When you use only salbutamol, the airways stay inflamed and increasingly sensitive — you feel "fine" between attacks but each attack tends to come faster and bigger. The inhaled steroid (the "preventer" or "controller") works on the inflammation itself, slowly, over days to weeks. Used every day, it dramatically reduces how often and how badly attacks happen. There is a simple sign that warns of trouble: if you are needing your reliever more than twice a week (apart from before exercise), your asthma is not controlled — the controller dose needs to go up, or you need to start one if you are not on it yet. People who rely on the blue inhaler alone, who use more than one canister a month, are at the highest risk of dying from asthma. That is not a scare line — that is what the data show, and it is exactly the people the controller is built to save.',
        sw: 'Hili ni mojawapo ya maswali muhimu zaidi katika pumu — na sababu ya kawaida zaidi watu kuishia hospitalini. Salbutamol (au "ya bluu") inhaler ni reliever — inalegezea misuli inayozunguka njia za hewa na kuzifungua, haraka. Inatibu dalili (kupungua) lakini haifanyi chochote kwa tatizo la msingi (uvimbe). Unapotumia salbutamol pekee, njia za hewa hubaki na uvimbe na zinazidi kuwa nyeti — unajihisi "vizuri" kati ya mashambulizi lakini kila shambulizi linakuja haraka na kubwa zaidi. Steroid ya kuvuta ("preventer" au "controller") inafanya kazi kwa uvimbe wenyewe, polepole, kwa siku hadi wiki. Ikitumika kila siku, inapunguza sana mara ngapi na ukali wa mashambulizi. Kuna ishara rahisi inayoonya matatizo: ikiwa unahitaji reliever yako zaidi ya mara mbili kwa wiki (mbali na kabla ya mazoezi), pumu yako haijadhibitiwa — dose ya controller inahitaji kupanda, au unahitaji kuanza ikiwa hujaipata. Watu wanaotegemea inhaler ya bluu pekee, wanaotumia zaidi ya canister moja kwa mwezi, wako katika hatari ya juu zaidi ya kufa kutokana na pumu. Sio mstari wa kutisha — ndivyo data zinavyoonyesha, na ni hasa watu hao controller imejengwa kuwaokoa.',
        sw_mtaa: 'Hili ni one of the most important questions katika pumu — na most common reason watu kuishia hospitalini. Salbutamol (au "blue") inhaler ni reliever — inarelax misuli inayozunguka airways na kuzifungua, fast. Inatibu symptom (narrowing) lakini haifanyi chochote kwa underlying problem (inflammation). Unapotumia salbutamol pekee, airways zinabaki inflamed na zinazidi kuwa sensitive — unajihisi "fine" between attacks lakini kila attack linakuja faster na bigger. Inhaled steroid ("preventer" au "controller") inafanya kazi kwa inflammation yenyewe, slowly, kwa siku hadi wiki. Ikitumika kila siku, inapunguza dramatically mara ngapi na ukali wa attacks. Kuna simple sign inayowarning trouble: ikiwa unahitaji reliever yako zaidi ya mara mbili kwa wiki (apart from before exercise), pumu yako haijadhibitiwa — controller dose inahitaji kupanda, au unahitaji kuanza ikiwa hujaipata. Watu wanaotegemea blue inhaler alone, wanaotumia zaidi ya canister moja kwa mwezi, wako katika highest risk ya kufa kutokana na asthma. Sio scare line — ndivyo data zinavyoonyesha, na ni hasa watu hao controller imejengwa kuwasave.',
      },
    },
    {
      q: {
        en: 'How do I know when an asthma attack is bad enough to go to hospital?',
        sw: 'Najuaje wakati shambulizi la pumu ni mbaya sana hadi kuhitaji kwenda hospitali?',
      },
      a: {
        en: 'There are four signals that mean go in NOW, not wait. (1) The reliever inhaler is not working — you have taken salbutamol every 20 minutes for an hour and you are still struggling. (2) You cannot speak in full sentences — you can only get a few words out between breaths. (3) Your lips or fingertips are turning blue or grey. (4) You are exhausted from breathing — your shoulders are heaving, the muscles between your ribs are pulling in, or in a child, the lower chest is sinking in with each breath. Two more subtle danger signs that people miss: the wheeze suddenly gets quieter — that is NOT good, it can mean the airways are now too narrow for air to move enough to make a wheeze sound ("silent chest"); and SpO2 below 92% on a pulse oximeter. Any of these signs — call for transport and go to the nearest hospital with someone with you, keep taking the reliever every few minutes on the way, and if a steroid tablet (prednisolone) is available start it immediately. Do not drive yourself if you can avoid it.',
        sw: 'Kuna ishara nne zinazomaanisha ingia SASA, sio kusubiri. (1) Reliever inhaler haifanyi kazi — umechukua salbutamol kila dakika 20 kwa saa moja na bado unashindwa. (2) Huwezi kuzungumza sentensi kamili — unaweza tu kupata maneno machache kati ya pumzi. (3) Midomo yako au vidole vinageuka bluu au kijivu. (4) Umechoka kwa kupumua — mabega yako yanainua-inua, misuli kati ya mbavu inajivuta ndani, au kwa mtoto, kifua cha chini kinashuka ndani kwa kila pumzi. Ishara mbili zaidi za hatari zinazopuuzwa: wheeze ghafla inakuwa kimya zaidi — hii SI nzuri, inaweza kumaanisha njia za hewa sasa zimepungua sana hewa kuhama vya kutosha kufanya sauti ya wheeze ("kifua kimya"); na SpO2 chini ya 92% kwenye pulse oximeter. Yoyote ya ishara hizi — piga simu ya usafiri na nenda hospitali iliyo karibu zaidi na mtu pamoja nawe, endelea kuchukua reliever kila dakika chache njiani, na ikiwa kibao cha steroid (prednisolone) kinapatikana anzisha mara moja. Usijiendeshe mwenyewe ikiwezekana.',
        sw_mtaa: 'Kuna signals nne zinazomaanisha ingia SASA, sio kusubiri. (1) Reliever inhaler haifanyi kazi — umechukua salbutamol kila dakika 20 kwa saa moja na bado unashindwa. (2) Huwezi kuzungumza full sentences — unaweza tu kupata maneno machache between breaths. (3) Midomo yako au fingertips zinageuka bluu au kijivu. (4) Umechoka kwa breathing — mabega yako yanaheave, misuli between mbavu inajivuta ndani, au kwa mtoto, lower chest inashuka ndani kwa kila pumzi. Two more subtle danger signs watu wanamiss: wheeze ghafla inakuwa quieter — hii SI nzuri, inaweza kumaanisha airways sasa zimepungua sana hewa kuhama vya kutosha kufanya wheeze sound ("silent chest"); na SpO2 chini ya 92% kwenye pulse oximeter. Yoyote ya signs hizi — piga simu ya transport na nenda nearest hospital na mtu pamoja nawe, endelea kuchukua reliever kila dakika chache on the way, na ikiwa steroid tablet (prednisolone) inapatikana start immediately. Usijiendeshe mwenyewe ikiwezekana.',
      },
    },
    {
      q: {
        en: 'Can I exercise if I have asthma?',
        sw: 'Naweza kufanya mazoezi nikiwa na pumu?',
      },
      a: {
        en: 'Yes — exercise is good for asthma when control is good. Many top athletes have asthma and compete at the highest levels. The two things that matter: (1) make sure your daily controller is doing its job — if cold air, running, or laughter brings on a wheeze, your controller dose is too low and needs review; (2) use your reliever (salbutamol) 10-15 minutes BEFORE exercise as a pre-treatment, which prevents most exercise-induced bronchospasm. Warm up gradually — sudden cold-air sprint is the worst trigger. Cover your nose and mouth with a scarf in cold weather. Swimming in a warm, well-ventilated pool is usually one of the best-tolerated sports; running on a cold dry morning is one of the worst. If exercise consistently triggers attacks despite all of this, talk to your clinician — the controller plan may need stepping up.',
        sw: 'Ndio — mazoezi ni mazuri kwa pumu wakati udhibiti uko mzuri. Wanariadha wengi wa kilele wana pumu na wanashindana katika viwango vya juu zaidi. Mambo mawili yanayojali: (1) hakikisha controller yako ya kila siku inafanya kazi yake — ikiwa hewa baridi, kukimbia, au kucheka kunaleta wheeze, dose ya controller yako iko chini sana na inahitaji mapitio; (2) tumia reliever yako (salbutamol) dakika 10-15 KABLA ya mazoezi kama matibabu ya awali, ambayo huzuia bronchospasm nyingi za kuchochewa na mazoezi. Joto polepole — kukimbia ghafla katika hewa baridi ni kichocheo kibaya zaidi. Funika pua na mdomo kwa kitambaa katika hali ya hewa baridi. Kuogelea katika dimbwi la joto na lenye uingizaji hewa mzuri kawaida ni mojawapo ya michezo inayovumiliwa vizuri zaidi; kukimbia asubuhi baridi na kavu ni mojawapo ya mbaya zaidi. Ikiwa mazoezi mara kwa mara yanachochea mashambulizi licha ya yote hayo, zungumza na daktari wako — mpango wa controller unaweza kuhitaji kupandishwa.',
        sw_mtaa: 'Ndio — exercise ni mazuri kwa pumu wakati control iko nzuri. Top athletes wengi wana pumu na wana-compete katika highest levels. Mambo mawili yanayojali: (1) hakikisha daily controller yako inafanya kazi yake — ikiwa cold air, kukimbia, au kucheka kunaleta wheeze, controller dose yako iko chini sana na inahitaji review; (2) tumia reliever yako (salbutamol) dakika 10-15 BEFORE exercise kama pre-treatment, ambayo inazuia most exercise-induced bronchospasm. Warm up gradually — sudden cold-air sprint ni worst trigger. Cover pua na mdomo kwa scarf katika cold weather. Swimming katika warm, well-ventilated pool kawaida ni one of the best-tolerated sports; running katika cold dry morning ni one of the worst. Ikiwa exercise consistently inatrigger attacks despite all of this, zungumza na clinician yako — controller plan inaweza kuhitaji stepping up.',
      },
    },
    {
      q: {
        en: 'I am pregnant — is my asthma medication safe for the baby?',
        sw: 'Nina mimba — dawa zangu za pumu ni salama kwa mtoto?',
      },
      a: {
        en: 'Yes — the standard asthma medications are well-studied and safe in pregnancy, and the most dangerous thing for the baby is uncontrolled asthma, not the inhalers. Uncontrolled asthma in pregnancy is linked to low birth weight, prematurity, and pre-eclampsia. Inhaled salbutamol and inhaled corticosteroids (beclomethasone, budesonide) are first-line and safe across pregnancy. Oral prednisolone is also safe when needed for an exacerbation — the small theoretical risk is far outweighed by the much greater risk of an untreated asthma attack starving the baby of oxygen. About one in three women find their asthma gets better in pregnancy, one in three find it stays the same, and one in three find it gets worse — review with your clinician every trimester to make sure the controller dose is right. Continue taking your inhalers exactly as before, and never stop a controller because you are pregnant. If you have an attack, treat it the same way you would normally — reliever, oral steroid if needed, and come to the clinic — do not wait it out.',
        sw: 'Ndio — dawa za kawaida za pumu zimesomwa vizuri na ni salama katika mimba, na kitu hatari zaidi kwa mtoto ni pumu isiyodhibitiwa, sio inhalers. Pumu isiyodhibitiwa katika mimba inahusishwa na uzito mdogo wa kuzaliwa, kuzaliwa kabla ya wakati, na pre-eclampsia. Salbutamol ya kuvuta na corticosteroids za kuvuta (beclomethasone, budesonide) ni za kwanza na salama katika mimba yote. Prednisolone ya kumeza pia ni salama inapohitajika kwa exacerbation — hatari ndogo ya kinadharia inazidiwa sana na hatari kubwa zaidi ya shambulizi la pumu lisilotibiwa kumnyima mtoto oksijeni. Karibu mwanamke mmoja kati ya watatu hupata pumu yake inaboreka katika mimba, mmoja kati ya watatu hubaki sawa, na mmoja kati ya watatu inazidi kuwa mbaya — pitia na daktari wako kila trimester kuhakikisha dose ya controller iko sahihi. Endelea kuchukua inhalers zako kama kabla, na kamwe usisimamishe controller kwa sababu una mimba. Ukipata shambulizi, litibu jinsi ungeli-tibu kawaida — reliever, steroid ya kumeza ikiwa inahitajika, na njoo kliniki — usingoje.',
        sw_mtaa: 'Ndio — standard asthma medications zimesomwa vizuri na ni salama katika pregnancy, na most dangerous thing kwa mtoto ni uncontrolled asthma, sio inhalers. Uncontrolled asthma katika pregnancy inahusishwa na low birth weight, prematurity, na pre-eclampsia. Inhaled salbutamol na inhaled corticosteroids (beclomethasone, budesonide) ni first-line na safe kwa pregnancy yote. Oral prednisolone pia ni safe inapohitajika kwa exacerbation — small theoretical risk inazidiwa sana na much greater risk ya untreated asthma attack kumnyima mtoto oxygen. Karibu mwanamke mmoja kati ya watatu anapata asthma yake inaimprove katika pregnancy, one in three anabaki same, na one in three inazidi kuwa worse — review na clinician yako kila trimester kuhakikisha controller dose iko sahihi. Endelea kuchukua inhalers zako exactly kama before, na kamwe usisimamishe controller kwa sababu una mimba. Ukipata attack, litibu the same way ungeli-tibu normally — reliever, oral steroid ikiwa inahitajika, na njoo kliniki — usisubiri it out.',
      },
    },
    {
      q: {
        en: 'My child has been wheezing — does that mean asthma?',
        sw: 'Mtoto wangu amekuwa akiwheeze — je hiyo inamaanisha pumu?',
      },
      a: {
        en: 'Not necessarily — wheeze in young children is common and often caused by viral chest infections (especially RSV, bronchiolitis, in infants under 1 year). About a third of children wheeze in the first three years of life; most do not develop persistent asthma. The features that point toward asthma rather than viral wheeze are: (1) the wheeze comes back several times even when there is no obvious infection; (2) it is worse at night, with running or laughter, or after exposure to dust, animals, or cold air; (3) there is eczema or hay fever in the child or strong family history of asthma; (4) symptoms respond clearly to a trial of inhaled salbutamol. The clinician puts these together over time — there is no single test in young children. If wheeze is happening more than every few weeks, waking the child at night, or limiting play, ask about a trial of an inhaled steroid — even in very young children it is safe and effective when given through a spacer.',
        sw: 'Sio lazima — wheeze kwa watoto wadogo ni ya kawaida na mara nyingi husababishwa na maambukizi ya virusi ya kifua (haswa RSV, bronchiolitis, kwa watoto chini ya mwaka mmoja). Karibu theluthi ya watoto wanawheeze katika miaka mitatu ya kwanza ya maisha; wengi hawapati pumu sugu. Sifa zinazoelekeza kwa pumu badala ya wheeze ya virusi ni: (1) wheeze inarudi mara kadhaa hata wakati hakuna maambukizi dhahiri; (2) ni mbaya zaidi usiku, kwa kukimbia au kucheka, au baada ya kufichuliwa kwa vumbi, wanyama, au hewa baridi; (3) kuna eczema au hay fever kwa mtoto au historia kali ya familia ya pumu; (4) dalili zinajibu wazi kwa jaribio la salbutamol ya kuvuta. Daktari anaweka hizi pamoja kwa wakati — hakuna kipimo kimoja kwa watoto wadogo. Ikiwa wheeze inatokea zaidi ya kila wiki chache, kumuamsha mtoto usiku, au kupunguza michezo, uliza kuhusu jaribio la steroid ya kuvuta — hata kwa watoto wadogo sana ni salama na yenye ufanisi inapotolewa kupitia spacer.',
        sw_mtaa: 'Sio necessarily — wheeze kwa watoto wadogo ni common na mara nyingi inasababishwa na viral chest infections (haswa RSV, bronchiolitis, kwa infants under mwaka mmoja). Karibu third ya watoto wana-wheeze katika first three years ya maisha; wengi hawapati persistent asthma. Features zinazoelekeza kwa pumu badala ya viral wheeze ni: (1) wheeze inarudi mara kadhaa hata wakati hakuna obvious infection; (2) ni worse usiku, kwa running au kucheka, au after exposure kwa vumbi, wanyama, au cold air; (3) kuna eczema au hay fever kwa mtoto au strong family history ya pumu; (4) symptoms zinajibu clearly kwa trial ya inhaled salbutamol. Clinician anaweka hizi pamoja over time — hakuna single test kwa watoto wadogo. Ikiwa wheeze inatokea zaidi ya kila wiki chache, ku-wake mtoto usiku, au ku-limit play, uliza kuhusu trial ya inhaled steroid — hata kwa very young children ni safe na effective inapotolewa through spacer.',
      },
    },
    {
      q: {
        en: 'Do I need antibiotics every time my asthma gets worse?',
        sw: 'Ninahitaji antibiotics kila wakati pumu yangu inazidi kuwa mbaya?',
      },
      a: {
        en: 'Almost never. Asthma exacerbations are caused by inflammation and bronchospasm, not bacterial infection — the treatment is reliever (more salbutamol), controller (step up the inhaled steroid), and oral steroid (prednisolone) for moderate-to-severe attacks. Antibiotics only have a role if there is a clear bacterial chest infection on top of the asthma — for example, high fever, purulent sputum, focal crackles, and consolidation on chest X-ray. Most exacerbations are triggered by viral infections, allergens, smoke, or weather change — and antibiotics do nothing for any of those. Routine antibiotics for every asthma flare contribute to antibiotic resistance and the side effects without the benefit. If your clinician offers antibiotics, ask gently what specific sign of bacterial infection they are treating. This is a key teaching point of WHO AWaRe stewardship — saving the antibiotic for when it really matters.',
        sw: 'Karibu kamwe. Exacerbations za pumu husababishwa na uvimbe na bronchospasm, sio maambukizi ya bakteria — matibabu ni reliever (salbutamol zaidi), controller (panda steroid ya kuvuta), na steroid ya kumeza (prednisolone) kwa mashambulizi ya kati hadi makali. Antibiotics zina jukumu tu ikiwa kuna maambukizi dhahiri ya bakteria ya kifua juu ya pumu — kwa mfano, homa kali, makohozi ya usaha, crackles ya kiwendani, na consolidation kwa chest X-ray. Exacerbations nyingi huchochewa na maambukizi ya virusi, allergens, moshi, au mabadiliko ya hali ya hewa — na antibiotics hazifanyi chochote kwa yoyote ya hizo. Antibiotics za kawaida kwa kila flare ya pumu huchangia upinzani wa antibiotic na madhara bila faida. Ikiwa daktari wako anatoa antibiotics, uliza kwa upole ni ishara gani mahususi ya maambukizi ya bakteria wanayoitibu. Hii ni nukta muhimu ya ufundishaji wa stewardship wa WHO AWaRe — kuokoa antibiotic kwa wakati inapojali kweli.',
        sw_mtaa: 'Karibu kamwe. Asthma exacerbations zinasababishwa na inflammation na bronchospasm, sio bacterial infection — treatment ni reliever (salbutamol zaidi), controller (step up inhaled steroid), na oral steroid (prednisolone) kwa moderate-to-severe attacks. Antibiotics zina role tu ikiwa kuna clear bacterial chest infection juu ya pumu — kwa mfano, high fever, purulent sputum, focal crackles, na consolidation kwa chest X-ray. Most exacerbations zinatriggered na viral infections, allergens, smoke, au weather change — na antibiotics hazifanyi chochote kwa yoyote ya hizo. Routine antibiotics kwa kila asthma flare zinachangia antibiotic resistance na side effects without benefit. Ikiwa clinician yako anatoa antibiotics, uliza gently ni specific sign gani ya bacterial infection wanayoitibu. Hii ni key teaching point ya WHO AWaRe stewardship — kusave antibiotic kwa wakati inapojali kweli.',
      },
    },
    {
      q: {
        en: 'Can asthma be cured?',
        sw: 'Pumu inaweza kutibika kabisa?',
      },
      a: {
        en: 'Asthma cannot be "cured" in the sense of completely going away forever — but it can be controlled so well that for most of life it is essentially invisible. A person with well-controlled asthma sleeps through the night, exercises freely, never needs the reliever more than twice a week, and has no exacerbations needing oral steroid or hospital. Some children grow out of their asthma during adolescence (about a third), some have it return in adulthood, and some carry it lifelong but without symptoms because of good controller treatment. The realistic goal is not "cure" but "control" — and the right yardstick is the GINA Asthma Control test, not how you happen to feel today. Treatment is stepped up when control is poor and stepped down (carefully, with the clinician) when control has been excellent for at least three months. Never stop a controller on your own to "test" if you still need it.',
        sw: 'Pumu haiwezi "kutibika" kwa maana ya kuondoka kabisa milele — lakini inaweza kudhibitiwa vizuri kiasi kwamba kwa maisha mengi haionekani kabisa. Mtu mwenye pumu iliyodhibitiwa vizuri analala usingizi wa usiku, anafanya mazoezi kwa uhuru, hatumii reliever zaidi ya mara mbili kwa wiki, na hana exacerbations zinazohitaji steroid ya kumeza au hospitali. Watoto wengine hutoka katika pumu yao wakati wa ujana (karibu theluthi), wengine huipata tena katika utu uzima, na wengine wanaibeba maisha yote lakini bila dalili kwa sababu ya matibabu mazuri ya controller. Lengo halisi sio "tiba" bali "udhibiti" — na kipimo sahihi ni jaribio la Udhibiti wa Pumu la GINA, sio jinsi unavyohisi leo. Matibabu hupandishwa wakati udhibiti uko mbaya na hushushwa (kwa uangalifu, na daktari) wakati udhibiti umekuwa bora kwa angalau miezi mitatu. Kamwe usisimamishe controller mwenyewe "kujaribu" ikiwa bado unaihitaji.',
        sw_mtaa: 'Pumu haiwezi "ku-cure" kwa maana ya kuondoka kabisa forever — lakini inaweza kudhibitiwa vizuri kiasi kwamba kwa maisha mengi haionekani. Person na well-controlled asthma analala through the night, anafanya exercise kwa uhuru, hatumii reliever zaidi ya mara mbili kwa wiki, na hana exacerbations zinazohitaji oral steroid au hospital. Watoto wengine wana-grow out ya asthma yao during adolescence (karibu third), wengine wanairudi kwa adulthood, na wengine wanaibeba lifelong lakini bila symptoms kwa sababu ya good controller treatment. Realistic goal sio "cure" bali "control" — na right yardstick ni GINA Asthma Control test, sio jinsi unavyohisi leo. Treatment inastepped up wakati control iko poor na inastepped down (carefully, na clinician) wakati control imekuwa excellent kwa at least miezi mitatu. Never simamisha controller mwenyewe "kujaribu" ikiwa bado unaihitaji.',
      },
    },
    {
      q: {
        en: 'What is a spacer and do I really need one?',
        sw: 'Spacer ni nini na je ninahitaji kweli?',
      },
      a: {
        en: 'A spacer is a plastic chamber that you attach to the inhaler — you puff the inhaler into the chamber once and then breathe in from the chamber slowly. This is much more effective than puffing directly into the mouth, because most of the medicine from a direct puff hits the back of the throat instead of reaching the lungs. With a spacer, two to three times more medicine actually reaches where it needs to work, side effects in the mouth (thrush, hoarseness) are dramatically reduced, and the technique is much easier — no need to coordinate the puff exactly with the breath. For children under 5, a spacer with a mask is essentially mandatory — without it, almost none of the medicine reaches the lungs. For adults, the difference is also large. If you have not been offered a spacer, ask. They are inexpensive, they last for years, and they triple the value of every inhaler you buy.',
        sw: 'Spacer ni chemba ya plastiki unayoiambatanisha na inhaler — unapuff inhaler ndani ya chemba mara moja na kisha unapumua kutoka kwa chemba polepole. Hii ni yenye ufanisi zaidi kuliko kupuff moja kwa moja kinywani, kwa sababu dawa nyingi kutoka kwa puff ya moja kwa moja inagonga nyuma ya koo badala ya kufikia mapafu. Kwa spacer, dawa mara mbili hadi tatu zaidi inafikia mahali inapohitaji kufanya kazi, madhara kinywani (thrush, ukame wa sauti) yanapunguzwa sana, na mbinu ni rahisi zaidi — hakuna haja ya kuratibu puff hasa na pumzi. Kwa watoto chini ya miaka 5, spacer yenye mask ni ya lazima kweli — bila hiyo, karibu hakuna dawa yoyote inafikia mapafu. Kwa watu wazima, tofauti pia ni kubwa. Ikiwa hujapewa spacer, uliza. Ni za bei nafuu, hudumu kwa miaka, na zinatatatu thamani ya kila inhaler unayonunua.',
        sw_mtaa: 'Spacer ni plastic chamber unayoiattach kwa inhaler — unapuff inhaler ndani ya chamber mara moja na kisha unapumua kutoka kwa chamber slowly. Hii ni much more effective kuliko kupuff direct kinywani, kwa sababu most ya dawa kutoka direct puff inahit back ya throat badala ya kufikia lungs. Na spacer, two to three times more dawa inafikia mahali inapohitaji kufanya kazi, side effects kinywani (thrush, hoarseness) zinapunguzwa dramatically, na technique ni much easier — hakuna haja ya kuratibu puff exactly na breath. Kwa watoto under 5, spacer na mask ni essentially mandatory — without it, karibu hakuna medicine yoyote inafikia lungs. Kwa adults, tofauti pia ni kubwa. Ikiwa hujapewa spacer, uliza. Ni inexpensive, zinadumu kwa miaka, na zinatriple value ya kila inhaler unayonunua.',
      },
    },
    {
      q: {
        en: 'What are the most common triggers I should watch for?',
        sw: 'Vichocheo vya kawaida zaidi vya kuangalia ni vipi?',
      },
      a: {
        en: 'Triggers vary from person to person but the common ones in Tanzania are: (1) viral upper respiratory infections — the biggest single trigger of exacerbations, often a "cold" that goes to the chest; (2) tobacco smoke including second-hand exposure — even one cigarette in a room can trigger an attack; (3) cooking smoke from charcoal or wood stoves indoors — major in many households, ventilation helps; (4) dust mites in bedding and old mattresses — wash bedding weekly in hot water; (5) cockroach and mouse droppings — pest control matters; (6) animal dander — cats especially; (7) pollen and mould — seasonal; (8) cold dry air; (9) exercise especially in cold air; (10) strong emotions, laughter, crying; (11) certain medications — beta-blockers (for heart or eye pressure) and aspirin/NSAIDs in some people. Keep a simple diary for a few weeks of when symptoms get worse — patterns become obvious, and avoiding the top two or three triggers often makes a bigger difference than any medication change.',
        sw: 'Vichocheo hutofautiana kati ya mtu na mtu lakini vya kawaida Tanzania ni: (1) maambukizi ya virusi ya juu ya kupumua — kichocheo kimoja kikubwa zaidi cha exacerbations, mara nyingi "mafua" yanayoenda kifuani; (2) moshi wa tumbaku ikijumuisha mfichuo wa pili — hata sigara moja chumbani inaweza kuchochea shambulizi; (3) moshi wa kupika kutoka jiko la mkaa au kuni ndani ya nyumba — kubwa katika kaya nyingi, uingizaji hewa husaidia; (4) dust mites katika matandiko na magodoro ya zamani — osha matandiko kila wiki kwa maji ya moto; (5) kinyesi cha mende na panya — udhibiti wa wadudu unajali; (6) animal dander — paka haswa; (7) chavua na ukungu — msimu; (8) hewa baridi kavu; (9) mazoezi haswa katika hewa baridi; (10) hisia kali, kicheko, kulia; (11) dawa fulani — beta-blockers (kwa moyo au shinikizo la jicho) na aspirin/NSAIDs kwa watu wengine. Weka diary rahisi kwa wiki chache za wakati dalili zinapozidi kuwa mbaya — mifumo inakuwa dhahiri, na kuepuka vichocheo viwili au vitatu vya juu mara nyingi hufanya tofauti kubwa kuliko mabadiliko yoyote ya dawa.',
        sw_mtaa: 'Triggers zinatofautiana kati ya mtu na mtu lakini common ones Tanzania ni: (1) viral upper respiratory infections — biggest single trigger ya exacerbations, mara nyingi "cold" inayoenda kifuani; (2) tobacco smoke ikijumuisha second-hand exposure — hata sigara moja chumbani inaweza kutrigger attack; (3) cooking smoke kutoka charcoal au wood stoves ndani ya nyumba — major katika many households, ventilation inasaidia; (4) dust mites katika bedding na old mattresses — osha bedding kila wiki kwa hot water; (5) cockroach na mouse droppings — pest control inajali; (6) animal dander — paka especially; (7) pollen na mould — seasonal; (8) cold dry air; (9) exercise especially katika cold air; (10) strong emotions, kicheko, kulia; (11) certain medications — beta-blockers (kwa moyo au eye pressure) na aspirin/NSAIDs kwa watu wengine. Keep simple diary kwa weeks chache za wakati symptoms zinapozidi kuwa mbaya — patterns zinakuwa obvious, na kuepuka top two au three triggers mara nyingi inafanya tofauti kubwa kuliko medication change yoyote.',
      },
    },
    {
      q: {
        en: 'My inhaler tastes bad and makes my mouth sore — what can I do?',
        sw: 'Inhaler yangu ina ladha mbaya na inanifanya mdomo wangu uume — naweza kufanya nini?',
      },
      a: {
        en: 'This is almost always a sign that the inhaler technique needs improving, and the fix is easy and free. The bad taste means the medicine is hitting your throat and tongue instead of going down to the lungs. Two changes solve it. First: use a spacer (see above). Second: after every dose of an inhaled steroid (the controller), rinse your mouth with water and spit it out, and rinse your throat too. Brushing teeth afterwards also helps. If you do not do this, the steroid sitting in your mouth causes oral thrush (a white coating that hurts and tastes metallic) and a hoarse voice. Both are entirely preventable with rinsing. If thrush has already developed, the clinician can prescribe an antifungal mouth treatment (nystatin) and at the same time check that your spacer technique is right.',
        sw: 'Hii karibu daima ni ishara kwamba mbinu ya inhaler inahitaji kuboresha, na suluhisho ni rahisi na bure. Ladha mbaya inamaanisha dawa inagonga koo na ulimi badala ya kushuka mapafu. Mabadiliko mawili huitatua. Kwanza: tumia spacer (angalia hapo juu). Pili: baada ya kila dose ya steroid ya kuvuta (controller), suuza mdomo wako kwa maji na utema, na suuza koo pia. Kupiga mswaki baadaye pia husaidia. Ikiwa hufanyi hivi, steroid inayobaki mdomoni husababisha thrush ya kinywa (mfuniko mweupe unaouma na unaona ladha ya metali) na sauti ya ukame. Yote yanaweza kuzuiwa kabisa kwa kusuuza. Ikiwa thrush tayari imekua, daktari anaweza kuandika matibabu ya antifungal ya mdomo (nystatin) na wakati huo huo achunguze kwamba mbinu yako ya spacer iko sahihi.',
        sw_mtaa: 'Hii karibu daima ni sign kwamba inhaler technique inahitaji kuboresha, na fix ni easy na free. Bad taste inamaanisha medicine inahit throat na ulimi badala ya kushuka lungs. Mabadiliko mawili yana-solve. Kwanza: tumia spacer (angalia hapo juu). Pili: baada ya kila dose ya inhaled steroid (controller), suuza mdomo wako kwa maji na utema, na suuza throat pia. Kupiga mswaki afterwards pia inasaidia. Ikiwa hufanyi hivi, steroid inayobaki mdomoni inasababisha oral thrush (white coating inayouma na inaonja metallic) na hoarse voice. Both ni entirely preventable na rinsing. Ikiwa thrush tayari imekua, clinician anaweza kuandika antifungal mouth treatment (nystatin) na at the same time achunguze spacer technique yako iko sahihi.',
      },
    },
    {
      q: {
        en: 'Why does my asthma get worse at night?',
        sw: 'Kwa nini pumu yangu inazidi kuwa mbaya usiku?',
      },
      a: {
        en: 'Night-time worsening ("nocturnal asthma") is one of the strongest signals that asthma is not adequately controlled. Several normal night-time changes combine to narrow the airways: the body\'s natural cortisol level drops in the early hours, lying flat increases mucus pooling, the temperature falls, and exposure to dust mites in bedding peaks. In well-controlled asthma the controller inhaler covers these changes and the person sleeps through. Waking at night with cough or wheeze means the controller dose is too low, the technique is poor, the dust-mite/allergen load is high, or there is an unrecognised trigger like reflux. The single most useful question to track is: "how many nights in the last four weeks have you woken up with asthma?" — even one night a week is too many, and it tells the clinician control needs improving. Practical fixes: take the controller in the evening as well as the morning if the regimen allows, wash bedding weekly, avoid eating heavy meals close to bedtime if reflux is part of the picture, and check inhaler technique.',
        sw: 'Kuzidi kuwa mbaya usiku ("pumu ya usiku") ni mojawapo ya ishara kali zaidi kwamba pumu haijadhibitiwa vya kutosha. Mabadiliko kadhaa ya kawaida ya usiku huungana kupunguza njia za hewa: kiwango cha asili cha cortisol cha mwili hushuka katika masaa ya mapema, kulala gorofa huongeza mkusanyiko wa kamasi, joto hushuka, na mfichuo wa dust mites katika matandiko hupanda. Katika pumu iliyodhibitiwa vizuri, controller inhaler hufunika mabadiliko haya na mtu analala. Kuamka usiku na kikohozi au wheeze inamaanisha dose ya controller iko chini sana, mbinu ni mbaya, mzigo wa dust-mite/allergen ni mkubwa, au kuna kichocheo kisichotambuliwa kama reflux. Swali moja muhimu zaidi la kufuatilia ni: "ni usiku ngapi katika wiki nne zilizopita umeamka na pumu?" — hata usiku mmoja kwa wiki ni mwingi sana, na inamuambia daktari udhibiti unahitaji kuboresha. Suluhisho za kivitendo: chukua controller jioni pia kama asubuhi ikiwa regimen inaruhusu, osha matandiko kila wiki, epuka kula chakula kingi karibu na muda wa kulala ikiwa reflux ni sehemu ya picha, na angalia mbinu ya inhaler.',
        sw_mtaa: 'Night-time worsening ("nocturnal asthma") ni one of the strongest signals kwamba asthma haijadhibitiwa adequately. Several normal night-time changes zinaungana kupunguza airways: cortisol level ya kawaida ya body inashuka katika early hours, kulala flat inaongeza mucus pooling, temperature inashuka, na exposure ya dust mites katika bedding inapeak. Katika well-controlled asthma controller inhaler inafunika changes hizi na person analala through. Kuamka usiku na cough au wheeze inamaanisha controller dose iko chini sana, technique ni poor, dust-mite/allergen load ni high, au kuna unrecognised trigger kama reflux. Single most useful question ya kutrack ni: "ni nights ngapi katika last four weeks umeamka na asthma?" — hata night moja kwa wiki ni too many, na inamuambia clinician control inahitaji kuboresha. Practical fixes: chukua controller evening pia kama morning ikiwa regimen inaruhusu, osha bedding kila wiki, epuka kula heavy meals karibu na bedtime ikiwa reflux ni sehemu ya picture, na check inhaler technique.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take your controller (preventer) inhaler EVERY day, even when you feel completely well. This is the single most important habit in asthma. Most asthma deaths occur in people who used only the reliever.',
      sw: 'Chukua controller (preventer) inhaler yako KILA siku, hata unapojihisi vizuri kabisa. Hii ni tabia moja muhimu zaidi katika pumu. Vifo vingi vya pumu hutokea kwa watu waliotumia reliever pekee.',
      sw_mtaa: 'Chukua controller (preventer) inhaler yako EVERY day, hata unapojihisi vizuri kabisa. Hii ni single most important habit katika pumu. Most asthma deaths zinatokea kwa watu waliotumia reliever pekee.',
    },
    {
      en: 'Always use your reliever inhaler with a spacer if you have one — two to three times more of the medicine actually reaches your lungs that way. For children under 5, the spacer with mask is essential.',
      sw: 'Daima tumia reliever inhaler yako na spacer ikiwa unayo — dawa mara mbili hadi tatu zaidi inafikia mapafu yako kwa njia hiyo. Kwa watoto chini ya miaka 5, spacer yenye mask ni muhimu.',
      sw_mtaa: 'Always tumia reliever inhaler yako na spacer ikiwa unayo — two to three times more ya medicine inafikia lungs yako that way. Kwa watoto under 5, spacer yenye mask ni essential.',
    },
    {
      en: 'Track your reliever use as a control thermometer: needing it more than twice a week (other than before exercise) means your asthma is NOT controlled — see the clinician for a step-up.',
      sw: 'Fuatilia matumizi yako ya reliever kama kipima joto cha udhibiti: kuihitaji zaidi ya mara mbili kwa wiki (mbali na kabla ya mazoezi) inamaanisha pumu yako HAIJADHIBITIWA — onana na daktari kwa kupanda.',
      sw_mtaa: 'Track reliever use yako kama control thermometer: kuihitaji zaidi ya mara mbili kwa wiki (other than before exercise) inamaanisha asthma yako HAIJADHIBITIWA — onana na clinician kwa step-up.',
    },
    {
      en: 'Have a written asthma action plan from your clinician — it should tell you exactly what to do when symptoms get worse, what dose changes to make, when to start oral steroid, and when to come in.',
      sw: 'Kuwa na mpango ulioandikwa wa kitendo cha pumu kutoka kwa daktari wako — unapaswa kukuelezea hasa cha kufanya wakati dalili zinapozidi kuwa mbaya, mabadiliko gani ya dose ya kufanya, lini ya kuanza steroid ya kumeza, na lini ya kuja.',
      sw_mtaa: 'Be na written asthma action plan kutoka kwa clinician wako — inapaswa kukuelezea exactly cha kufanya wakati symptoms zinapozidi kuwa mbaya, dose changes gani ya kufanya, lini ya kuanza oral steroid, na lini ya kuja.',
    },
    {
      en: 'Identify your top 2-3 personal triggers (viral colds, smoke, dust, exercise in cold air, allergens) and plan how to avoid or pre-treat them. A two-week trigger diary often reveals patterns you did not notice.',
      sw: 'Tambua vichocheo vyako 2-3 vya juu vya kibinafsi (mafua ya virusi, moshi, vumbi, mazoezi katika hewa baridi, allergens) na panga jinsi ya kuepuka au kutibu mapema. Diary ya wiki mbili za vichocheo mara nyingi hufichua mifumo usiyoiona.',
      sw_mtaa: 'Tambua top 2-3 personal triggers yako (viral colds, smoke, vumbi, exercise katika cold air, allergens) na panga jinsi ya kuavoid au pre-treat. Two-week trigger diary mara nyingi inareveal patterns usiyoona.',
    },
    {
      en: 'After every dose of an inhaled steroid (controller), rinse your mouth with water and spit it out. This prevents oral thrush and hoarseness.',
      sw: 'Baada ya kila dose ya inhaled steroid (controller), suuza mdomo wako kwa maji na utema. Hii huzuia thrush ya kinywa na sauti ya ukame.',
      sw_mtaa: 'Baada ya kila dose ya inhaled steroid (controller), suuza mdomo wako kwa maji na utema. Hii inazuia oral thrush na hoarseness.',
    },
    {
      en: 'Avoid second-hand tobacco smoke and indoor cooking smoke as much as you can — both are major triggers and quietly degrade lung function over time.',
      sw: 'Epuka moshi wa tumbaku wa mfichuo wa pili na moshi wa kupika ndani ya nyumba kadri uwezavyo — vyote ni vichocheo vikuu na hupunguza utendaji wa mapafu polepole kwa wakati.',
      sw_mtaa: 'Epuka second-hand tobacco smoke na indoor cooking smoke kadri uwezavyo — both ni major triggers na quietly zinade-grade lung function over time.',
    },
    {
      en: 'Get an annual flu vaccine if available — viral chest infections are the single most common trigger of severe asthma exacerbations, and flu is the most preventable of them.',
      sw: 'Pata chanjo ya flu ya kila mwaka ikiwa inapatikana — maambukizi ya virusi ya kifua ni kichocheo kimoja cha kawaida zaidi cha exacerbations kali za pumu, na flu ni inayoweza kuzuiwa zaidi kati yao.',
      sw_mtaa: 'Pata annual flu vaccine ikiwa inapatikana — viral chest infections ni single most common trigger ya severe asthma exacerbations, na flu ni most preventable kati yao.',
    },
    {
      en: 'Use a peak-flow meter at home if your clinician recommends one — drops of more than 20% from your personal best, even without symptoms, are an early warning to step up treatment.',
      sw: 'Tumia peak-flow meter nyumbani ikiwa daktari wako anapendekeza — kushuka kwa zaidi ya 20% kutoka kwa bora yako binafsi, hata bila dalili, ni onyo la mapema kupanda matibabu.',
      sw_mtaa: 'Tumia peak-flow meter nyumbani ikiwa clinician wako anapendekeza — drops za zaidi ya 20% kutoka personal best yako, hata without symptoms, ni early warning kustep up treatment.',
    },
    {
      en: 'Never share inhalers, never let one expire without replacing it, and always check the dose counter — running out of medicine in the middle of an attack is a preventable emergency.',
      sw: 'Kamwe usishiriki inhalers, kamwe usiache moja iishe muda bila kubadilisha, na daima angalia kihesabu cha dose — kuishiwa dawa katikati ya shambulizi ni dharura inayoweza kuzuiwa.',
      sw_mtaa: 'Never share inhalers, never let one expire without replacing, na always check dose counter — kuishiwa medicine katikati ya attack ni preventable emergency.',
    },
  ],

  warningTriggers: [
    {
      en: 'Reliever inhaler not working — taken every 20 minutes for an hour and still struggling',
      sw: 'Reliever inhaler haifanyi kazi — imechukuliwa kila dakika 20 kwa saa moja na bado unashindwa',
      sw_mtaa: 'Reliever inhaler haifanyi kazi — imechukuliwa kila dakika 20 kwa saa moja na bado unashindwa',
    },
    {
      en: 'Cannot speak full sentences — only a few words at a time between breaths',
      sw: 'Huwezi kusema sentensi kamili — maneno machache tu kwa wakati kati ya pumzi',
      sw_mtaa: 'Huwezi kusema full sentences — maneno machache tu kwa wakati between breaths',
    },
    {
      en: 'Lips, tongue, or fingertips turning blue or grey (cyanosis)',
      sw: 'Midomo, ulimi, au vidole vinageuka bluu au kijivu (cyanosis)',
      sw_mtaa: 'Midomo, ulimi, au fingertips zinageuka bluu au kijivu (cyanosis)',
    },
    {
      en: 'SpO2 below 92% on room air',
      sw: 'SpO2 chini ya 92% kwa hewa ya kawaida',
      sw_mtaa: 'SpO2 chini ya 92% kwa room air',
    },
    {
      en: 'Wheeze suddenly becomes quieter or disappears (silent chest) — paradoxically a sign of severe airflow obstruction, not improvement',
      sw: 'Wheeze ghafla inakuwa kimya zaidi au inatoweka (kifua kimya) — kinyume na matarajio ni ishara ya kuzuia hewa kali, sio uboreshaji',
      sw_mtaa: 'Wheeze ghafla inakuwa quieter au inatoweka (silent chest) — paradoxically ni sign ya severe airflow obstruction, sio improvement',
    },
    {
      en: 'Exhausted from breathing — shoulders heaving, intercostal indrawing, child with chest sinking in with each breath',
      sw: 'Umechoka kwa kupumua — mabega yanainua-inua, kuingia kwa intercostal, mtoto na kifua kushuka ndani kwa kila pumzi',
      sw_mtaa: 'Umechoka kwa breathing — mabega yanaheave, intercostal indrawing, mtoto na kifua kushuka ndani kwa kila pumzi',
    },
    {
      en: 'Confusion, drowsiness, or unable to stay awake — late sign of carbon dioxide retention, this is a critical emergency',
      sw: 'Kuchanganyikiwa, usingizi, au kushindwa kuwa macho — ishara ya marehemu ya uhifadhi wa carbon dioxide, hii ni dharura ya hatari',
      sw_mtaa: 'Confusion, drowsiness, au kushindwa kuwa awake — late sign ya carbon dioxide retention, hii ni critical emergency',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Reliever needed more than twice a week (apart from before exercise) — control is inadequate, see clinician for review',
        sw: 'Reliever inahitajika zaidi ya mara mbili kwa wiki (mbali na kabla ya mazoezi) — udhibiti hautoshi, onana na daktari kwa mapitio',
        sw_mtaa: 'Reliever inahitajika zaidi ya mara mbili kwa wiki (apart from before exercise) — control haitoshi, onana na clinician kwa review',
      },
      urgency: 'routine' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Waking at night with asthma symptoms more than once a month — controller needs adjustment',
        sw: 'Kuamka usiku na dalili za pumu zaidi ya mara moja kwa mwezi — controller inahitaji marekebisho',
        sw_mtaa: 'Kuamka usiku na asthma symptoms zaidi ya mara moja kwa mwezi — controller inahitaji adjustment',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Symptoms limiting normal activity (cannot keep up with peers, missing school or work) — clinician review within days',
        sw: 'Dalili zinazoweka kikomo shughuli za kawaida (huwezi kuendelea na wenzio, kukosa shule au kazi) — mapitio ya daktari ndani ya siku',
        sw_mtaa: 'Symptoms zinazo-limit normal activity (huwezi keep up na peers, kumiss shule au kazi) — clinician review ndani ya siku',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Exacerbation requiring oral steroid (prednisolone) — start treatment per action plan and contact clinic same day',
        sw: 'Exacerbation inayohitaji steroid ya kumeza (prednisolone) — anza matibabu kwa mpango wa kitendo na wasiliana na kliniki siku hiyo hiyo',
        sw_mtaa: 'Exacerbation inayohitaji oral steroid (prednisolone) — anza treatment per action plan na contact clinic siku hiyo hiyo',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Two or more exacerbations needing oral steroid in a year — controller plan needs urgent re-review, this is high-risk asthma',
        sw: 'Exacerbations mbili au zaidi zinazohitaji steroid ya kumeza kwa mwaka — mpango wa controller unahitaji mapitio ya haraka, hii ni pumu ya hatari kubwa',
        sw_mtaa: 'Two au more exacerbations zinazohitaji oral steroid kwa mwaka — controller plan inahitaji urgent re-review, hii ni high-risk asthma',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe attack — cannot speak full sentences, exhausted, reliever not working, lips blue — EMERGENCY, go to hospital now',
        sw: 'Shambulizi kali — huwezi kusema sentensi kamili, umechoka, reliever haifanyi kazi, midomo bluu — DHARURA, nenda hospitali sasa',
        sw_mtaa: 'Severe attack — huwezi kusema full sentences, umechoka, reliever haifanyi kazi, midomo bluu — EMERGENCY, nenda hospitali sasa',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Any previous ICU admission for asthma or any near-fatal attack — lifelong high-risk; very low threshold for hospital, never delay',
        sw: 'Kulazwa ICU yoyote ya zamani kwa pumu au shambulizi lolote la karibu na kifo — hatari ya juu ya maisha yote; kizingiti cha chini sana kwa hospitali, kamwe usichelewe',
        sw_mtaa: 'Previous ICU admission yoyote kwa asthma au near-fatal attack yoyote — lifelong high-risk; very low threshold kwa hospital, never delay',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  variants: ASTHMA_VARIANTS,

  comorbidityNotes: [
    {
      coCondition: 'allergic_rhinitis',
      note: {
        en: 'Allergic rhinitis (hay fever, persistent runny/blocked nose) is present in 60-80% of people with asthma — the "one airway, one disease" concept. Treating the nose well (saline rinses, intranasal steroid) measurably improves asthma control. Ask about morning sneezing, blocked nose, postnasal drip — and treat them as part of asthma management, not a separate problem.',
        sw: 'Allergic rhinitis (hay fever, mafua ya kudumu/pua iliyoziba) iko kwa 60-80% ya watu wenye pumu — dhana ya "njia moja ya hewa, ugonjwa mmoja." Kutibu pua vizuri (saline rinses, intranasal steroid) huboresha udhibiti wa pumu kwa kipimo. Uliza kuhusu kupiga chafya asubuhi, pua iliyoziba, postnasal drip — na tibu kama sehemu ya usimamizi wa pumu, sio tatizo tofauti.',
        sw_mtaa: 'Allergic rhinitis (hay fever, persistent runny/blocked nose) iko kwa 60-80% ya watu wenye asthma — "one airway, one disease" concept. Kutibu pua vizuri (saline rinses, intranasal steroid) inaboresha asthma control kwa measurable. Uliza kuhusu morning sneezing, blocked nose, postnasal drip — na tibu kama sehemu ya asthma management, sio tatizo tofauti.',
      },
    },
    {
      coCondition: 'pneumonia',
      note: {
        en: 'Pneumonia and asthma exacerbation can look similar (cough, breathlessness, fever) and can co-exist — but the treatment is different. Asthma flare = inflammation + bronchospasm, treat with reliever, controller step-up, oral steroid. Bacterial pneumonia = lung infection, treat with antibiotic. Clues that lean toward pneumonia: high fever, productive sputum, focal crackles, consolidation on chest X-ray. When uncertain, the clinician treats both — but do not assume every asthma flare needs antibiotics.',
        sw: 'Nimonia na exacerbation ya pumu zinaweza kuonekana sawa (kikohozi, kushindwa kupumua, homa) na zinaweza kuwepo pamoja — lakini matibabu yanatofautiana. Flare ya pumu = uvimbe + bronchospasm, tibu kwa reliever, kupanda kwa controller, steroid ya kumeza. Nimonia ya bakteria = maambukizi ya mapafu, tibu kwa antibiotic. Vidokezo vinavyoelekea nimonia: homa kali, sputum yenye usaha, focal crackles, consolidation kwa chest X-ray. Wakati wa kutokuwa na uhakika, daktari hutibu vyote — lakini usidhani kila flare ya pumu inahitaji antibiotics.',
        sw_mtaa: 'Pneumonia na asthma exacerbation zinaweza kuonekana sawa (cough, breathlessness, fever) na zinaweza ku-co-exist — lakini treatment ni different. Asthma flare = inflammation + bronchospasm, treat na reliever, controller step-up, oral steroid. Bacterial pneumonia = lung infection, treat na antibiotic. Clues zinazolean kwa pneumonia: high fever, productive sputum, focal crackles, consolidation kwa chest X-ray. Wakati wa uncertain, clinician anatreat both — lakini usidhani kila asthma flare inahitaji antibiotics.',
      },
    },
    {
      coCondition: 'pregnancy',
      note: {
        en: 'Asthma in pregnancy follows the rule of thirds — one third improves, one third stays the same, one third worsens — and you cannot predict which. The most dangerous thing for the baby is uncontrolled asthma, not the medication. Inhaled salbutamol, inhaled corticosteroids, and oral prednisolone (when needed for exacerbation) are all considered safe across pregnancy. Continue all controllers as prescribed, never stop "because you are pregnant," and review with the clinician each trimester. Severe attacks in pregnancy carry maternal AND fetal risk and must be treated aggressively.',
        sw: 'Pumu katika mimba hufuata kanuni ya theluthi — theluthi moja inaboreka, theluthi moja inabaki sawa, theluthi moja inazidi kuwa mbaya — na huwezi kutabiri ipi. Kitu hatari zaidi kwa mtoto ni pumu isiyodhibitiwa, sio dawa. Salbutamol ya kuvuta, corticosteroids za kuvuta, na prednisolone ya kumeza (inapohitajika kwa exacerbation) zote zinachukuliwa kuwa salama katika mimba yote. Endelea na controllers zote kama ulivyoandikiwa, kamwe usisimamishe "kwa sababu una mimba," na pitia na daktari kila trimester. Mashambulizi makali katika mimba huleta hatari ya mama NA mtoto na lazima yatibiwe kwa nguvu.',
        sw_mtaa: 'Asthma katika pregnancy inafuata rule of thirds — one third inaimprove, one third inastay same, one third inazidi kuwa worse — na huwezi kupredict ipi. Most dangerous thing kwa mtoto ni uncontrolled asthma, sio medication. Inhaled salbutamol, inhaled corticosteroids, na oral prednisolone (inapohitajika kwa exacerbation) zote zinachukuliwa kuwa safe kwa pregnancy yote. Continue na controllers zote kama ulivyoandikiwa, never simamisha "kwa sababu una mimba," na review na clinician kila trimester. Severe attacks katika pregnancy zinaleta maternal AND fetal risk na lazima zitibiwe aggressively.',
      },
    },
    {
      coCondition: 'tb',
      note: {
        en: 'A "chronic cough" diagnosed as asthma that does not respond to controller treatment in 2-4 weeks should make you think of TB — especially in Tanzania, in HIV-positive patients, in close contacts of a known case, or with night sweats and weight loss. Both can co-exist; long-term high-dose inhaled steroid alone does not cause TB but can worsen an unrecognised case. Sputum GeneXpert is the right next investigation whenever asthma control is unexpectedly poor or systemic features are present.',
        sw: 'Kikohozi sugu kinachochunguzwa kama pumu na hakijibu matibabu ya controller katika wiki 2-4 inapaswa kukufanya ufikirie TB — haswa Tanzania, kwa wagonjwa wa VVU, kwa mawasiliano ya karibu ya kesi inayojulikana, au na jasho la usiku na kupungua kwa uzito. Vyote vinaweza kuwepo pamoja; steroid ya kuvuta ya kipimo cha juu cha muda mrefu peke yake haisababishi TB lakini inaweza kuzidisha kesi isiyotambuliwa. Sputum GeneXpert ni uchunguzi sahihi unaofuata wakati wowote udhibiti wa pumu uko mbaya isivyotarajiwa au sifa za mwili zinapatikana.',
        sw_mtaa: '"Chronic cough" inayodiagnosed kama asthma na haijibu controller treatment katika wiki 2-4 inapaswa kukufanya ufikirie TB — haswa Tanzania, kwa wagonjwa wa VVU, kwa close contacts ya known case, au na night sweats na weight loss. Both zinaweza ku-co-exist; long-term high-dose inhaled steroid alone haisababishi TB lakini inaweza kuzidisha unrecognised case. Sputum GeneXpert ni right next investigation wakati wowote asthma control iko poor unexpectedly au systemic features zinapatikana.',
      },
    },
    {
      coCondition: 'hiv',
      note: {
        en: 'Asthma is no more common in HIV than in the general population, but presentations can be more severe and other diagnoses (PCP, TB, bacterial pneumonia, Kaposi sarcoma in advanced disease) need to be kept in mind. Inhaled steroids do not significantly weaken HIV control. Cotrimoxazole prophylaxis (already taken at lower CD4) covers some respiratory pathogens — but it does not replace asthma control medication. Continue both, and the threshold for clinical review of any worsening respiratory symptom should be lower.',
        sw: 'Pumu sio ya kawaida zaidi katika VVU kuliko idadi ya watu kwa ujumla, lakini uwasilishaji unaweza kuwa mkali zaidi na utambuzi mwingine (PCP, TB, nimonia ya bakteria, Kaposi sarcoma katika ugonjwa wa hali ya juu) unahitaji kuwekwa akilini. Steroids za kuvuta hazidhoofishi sana udhibiti wa VVU. Cotrimoxazole prophylaxis (tayari inachukuliwa kwa CD4 ya chini) inafunika baadhi ya viumbe vya kupumua — lakini haibadilishi dawa ya udhibiti wa pumu. Endelea vyote, na kizingiti cha mapitio ya kliniki cha dalili yoyote ya kupumua inayozidi kuwa mbaya kinapaswa kuwa cha chini.',
        sw_mtaa: 'Asthma sio more common katika HIV kuliko general population, lakini presentations zinaweza kuwa more severe na other diagnoses (PCP, TB, bacterial pneumonia, Kaposi sarcoma katika advanced disease) zinahitaji kuwekwa akilini. Inhaled steroids hazidhoofishi significantly HIV control. Cotrimoxazole prophylaxis (tayari inachukuliwa kwa lower CD4) inafunika some respiratory pathogens — lakini haibadilishi asthma control medication. Continue both, na threshold ya clinical review ya worsening respiratory symptom yoyote inapaswa kuwa lower.',
      },
    },
    {
      coCondition: 'obesity',
      note: {
        en: 'Obesity worsens asthma in three ways — mechanical (extra weight on the chest wall), inflammatory (fat tissue releases inflammatory signals), and behavioural (less exercise → less aerobic reserve when an attack comes). Weight loss, even modest (5-10%), measurably improves asthma control. Reflux is also more common with obesity and itself a trigger. Address weight as part of the asthma plan, not as a separate problem.',
        sw: 'Unene huzidisha pumu kwa njia tatu — mitambo (uzito wa ziada kwenye ukuta wa kifua), uvimbe (tissue ya mafuta hutoa ishara za uvimbe), na tabia (mazoezi machache → akiba ndogo ya aerobic wakati shambulizi linapokuja). Kupungua uzito, hata kwa wastani (5-10%), huboresha udhibiti wa pumu kwa kipimo. Reflux pia ni ya kawaida zaidi na unene na yenyewe ni kichocheo. Shughulikia uzito kama sehemu ya mpango wa pumu, sio tatizo tofauti.',
        sw_mtaa: 'Obesity inazidisha asthma kwa njia tatu — mechanical (extra weight kwenye chest wall), inflammatory (fat tissue inatoa inflammatory signals), na behavioural (less exercise → less aerobic reserve wakati attack linapokuja). Weight loss, hata modest (5-10%), inaboresha asthma control measurably. Reflux pia ni more common na obesity na yenyewe ni trigger. Shughulikia weight kama sehemu ya asthma plan, sio tatizo tofauti.',
      },
    },
  ],

  sources: [
    src('NTLG_STG_2023'),
    src('WHO_PEN_2020'),
    src('WHO_AMR_2023'),
    src('WHO_OXYGEN_2023'),
    src('IMCI_2024'),
    src('WHO_PNEUMONIA_2022'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
