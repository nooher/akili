/**
 * Inhaled Corticosteroid (ICS) — Drug Knowledge (Phase 9 asthma block)
 *
 * Represents the class — beclomethasone, budesonide, fluticasone,
 * mometasone, ciclesonide — the cornerstone controller for asthma.
 *
 * Sources: WHO PEN 2020, GINA 2024 (acknowledged in NTLG STG 2023),
 *          NTLG STG 2023, Muhimbili Protocols, BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   The ICS is the single most important medicine in asthma. Salbutamol
 *   relieves the symptom; the ICS treats the underlying inflammation that
 *   causes the symptom. People who take their ICS reliably almost never
 *   have severe attacks; people who rely on salbutamol alone are at high
 *   risk of dying from asthma. The most important teaching points: take
 *   it EVERY day even when you feel well, use a spacer, rinse the mouth
 *   after every dose, and be patient — it works on inflammation slowly,
 *   over days to weeks. It is NOT the same as oral steroid (prednisolone)
 *   and does NOT carry the same side-effect burden.
 *
 * Scope note:
 *   We educate on what the ICS does, why it must be taken daily, spacer
 *   technique, mouth rinsing, oral thrush prevention, and the safety
 *   profile vs oral steroid. We do NOT prescribe specific doses — those
 *   are by molecule, device, age, and severity.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const INHALED_CORTICOSTEROID: DrugKnowledge = {
  id: 'inhaled_corticosteroid',
  aliases: DRUG_ALIASES.inhaled_corticosteroid,

  drugClass: {
    en: 'Inhaled corticosteroid (ICS) — the cornerstone controller (preventer) for asthma. Common molecules: beclomethasone, budesonide, fluticasone, mometasone, ciclesonide.',
    sw: 'Corticosteroid ya kuvuta (ICS) — controller (preventer) ya msingi ya pumu. Molekuli za kawaida: beclomethasone, budesonide, fluticasone, mometasone, ciclesonide.',
  },

  whatItDoes: {
    en: 'The inhaled steroid works directly on the lining of the airways, calming the chronic inflammation that is the real engine of asthma. When the lining is calm, the airways do not twitch as readily in response to triggers, mucus production drops, and attacks become less frequent and less severe. Unlike salbutamol (which opens narrowed airways within minutes), the ICS does not work fast — it takes days to start, weeks to reach full effect, and months to show its full preventive power. That is why it must be taken every day, even when symptoms are absent — the goal is to suppress the underlying inflammation continuously, not to relieve an acute symptom. Crucially, an ICS is NOT the same as an oral steroid (prednisolone). The dose that reaches the bloodstream from a properly used inhaled steroid is tiny — a fraction of an oral dose — which is why ICS does not cause the systemic side effects (weight gain, diabetes, bone loss, mood change) that frequent oral steroid does. Used correctly, it is one of the safest long-term medicines in medicine.',
    sw: 'Steroid ya kuvuta hufanya kazi moja kwa moja kwenye kitambaa cha njia za hewa, hutuliza uvimbe sugu ambao ndio injini halisi ya pumu. Wakati kitambaa kimepoa, njia za hewa hazitetemekei kwa urahisi kwa kujibu vichocheo, uzalishaji wa kamasi hupungua, na mashambulizi huwa machache zaidi na yasiyo makali. Tofauti na salbutamol (ambayo hufungua njia za hewa zilizopunguza ndani ya dakika), ICS haifanyi kazi haraka — huchukua siku kuanza, wiki kufikia athari kamili, na miezi kuonyesha nguvu yake kamili ya kuzuia. Ndio sababu lazima ichukuliwe kila siku, hata wakati dalili haziko — lengo ni kukandamiza uvimbe wa msingi mara kwa mara, sio kupunguza dalili ya papo hapo. Muhimu, ICS SIO sawa na steroid ya kumeza (prednisolone). Dose inayofikia mfumo wa damu kutoka kwa steroid ya kuvuta iliyotumika vizuri ni ndogo sana — sehemu ya dose ya kumeza — ndio sababu ICS haiusi athari za mwili (kuongezeka uzito, kisukari, kupoteza mfupa, mabadiliko ya hisia) ambazo steroid ya kumeza ya mara kwa mara hufanya. Ikitumiwa kwa usahihi, ni mojawapo ya dawa salama zaidi za muda mrefu katika dawa.',
    sw_mtaa: 'Inhaled steroid inafanya kazi directly kwenye airway lining, inacalm chronic inflammation ambao ndio real engine ya pumu. Wakati lining iko calm, airways hazitwitchi readily kwa response ya triggers, mucus production inadrop, na attacks zinakuwa less frequent na less severe. Unlike salbutamol (ambayo inafungua narrowed airways within minutes), ICS haifanyi kazi fast — inachukua siku kuanza, weeks kufikia full effect, na miezi kuonyesha full preventive power. Ndio sababu lazima ichukuliwe every day, hata wakati symptoms haziko — goal ni kusuppress underlying inflammation continuously, sio kurelieve acute symptom. Crucially, ICS SIO same na oral steroid (prednisolone). Dose inayofikia bloodstream kutoka properly used inhaled steroid ni tiny — fraction ya oral dose — ndio sababu ICS haisababishi systemic side effects (weight gain, diabetes, bone loss, mood change) ambazo frequent oral steroid inafanya. Used correctly, ni one of the safest long-term medicines katika medicine.',
  },

  commonUses: [
    {
      en: 'Daily controller for asthma at every level of severity — from mild persistent (GINA Step 1-2) through severe (Step 5). Modern guidance recommends ICS for almost everyone with asthma, including people who only have symptoms once or twice a week.',
      sw: 'Controller ya kila siku ya pumu katika kila kiwango cha ukali — kutoka mild persistent (GINA Step 1-2) hadi kali (Step 5). Mwongozo wa kisasa hupendekeza ICS kwa karibu kila mtu mwenye pumu, ikijumuisha watu walio na dalili mara moja au mbili tu kwa wiki.',
      sw_mtaa: 'Daily controller kwa asthma katika kila level ya severity — kutoka mild persistent (GINA Step 1-2) hadi severe (Step 5). Modern guidance inarecommend ICS kwa karibu kila mtu mwenye pumu, ikijumuisha watu walio na symptoms mara moja au mbili tu kwa wiki.',
    },
    {
      en: 'In combination with a long-acting bronchodilator (LABA) — usually formoterol or salmeterol — in one inhaler ("ICS-LABA") for moderate-to-severe asthma. Common combinations: budesonide-formoterol, beclomethasone-formoterol, fluticasone-salmeterol.',
      sw: 'Pamoja na long-acting bronchodilator (LABA) — kawaida formoterol au salmeterol — katika inhaler moja ("ICS-LABA") kwa pumu ya kati hadi kali. Mchanganyiko wa kawaida: budesonide-formoterol, beclomethasone-formoterol, fluticasone-salmeterol.',
      sw_mtaa: 'Combination na long-acting bronchodilator (LABA) — kawaida formoterol au salmeterol — katika inhaler moja ("ICS-LABA") kwa moderate-to-severe asthma. Common combinations: budesonide-formoterol, beclomethasone-formoterol, fluticasone-salmeterol.',
    },
    {
      en: 'COPD with frequent exacerbations or eosinophilic phenotype — different from asthma in this context (more discriminating use of ICS, with care about pneumonia risk in COPD).',
      sw: 'COPD na exacerbations za mara kwa mara au phenotype ya eosinophilic — tofauti na pumu katika muktadha huu (matumizi ya ICS yenye uchunguzi zaidi, na uangalifu juu ya hatari ya nimonia katika COPD).',
      sw_mtaa: 'COPD na frequent exacerbations au eosinophilic phenotype — tofauti na pumu katika context hii (more discriminating use ya ICS, na care kuhusu pneumonia risk katika COPD).',
    },
  ],

  howItIsTaken: {
    en: 'Through a metered-dose inhaler (MDI) or dry-powder inhaler (DPI), one or two times a day depending on which molecule, what dose, and what is being achieved. ALWAYS use a spacer with the MDI if you can — far more medicine reaches the lungs, and far less hits the back of the throat (where it causes thrush). Take it on the same schedule every day. After every dose, rinse your mouth with water and spit it out, and rinse your throat too — this prevents oral thrush and hoarseness. Do not stop the ICS just because you feel well — that is exactly when it is doing its job. Inhaler technique is the most under-checked part of asthma care: the same dose, taken with poor technique, can be a fraction as effective. Ask the clinician or nurse to watch you take a dose at every visit.',
    sw: 'Kupitia metered-dose inhaler (MDI) au dry-powder inhaler (DPI), mara moja au mbili kwa siku kulingana na molekuli, dose, na kile kinachofanikishwa. DAIMA tumia spacer na MDI ikiwa unaweza — dawa nyingi zaidi inafikia mapafu, na kidogo zaidi inagonga nyuma ya koo (mahali inasababisha thrush). Ichukue kwa ratiba ile ile kila siku. Baada ya kila dose, suuza mdomo wako kwa maji na utema, na suuza koo pia — hii huzuia thrush ya kinywa na ukame wa sauti. Usisimamishe ICS kwa sababu tu unajihisi vizuri — hicho ndicho wakati inafanya kazi yake. Mbinu ya inhaler ni sehemu isiyochunguzwa zaidi ya huduma ya pumu: dose ile ile, iliyochukuliwa kwa mbinu mbaya, inaweza kuwa sehemu kama ya ufanisi. Mwombe daktari au muuguzi akuangalie ukichukua dose kila ziara.',
    sw_mtaa: 'Through metered-dose inhaler (MDI) au dry-powder inhaler (DPI), mara moja au mbili kwa siku kulingana na molecule gani, dose gani, na kile kinachoachievable. ALWAYS tumia spacer na MDI ikiwa unaweza — far more medicine inafikia lungs, na far less inahit back ya throat (mahali inasababisha thrush). Ichukue kwa same schedule every day. Baada ya kila dose, suuza mdomo wako kwa maji na utema, na suuza throat pia — hii inazuia oral thrush na hoarseness. Usisimamishe ICS kwa sababu tu unajihisi well — hicho ndicho wakati inafanya kazi yake. Inhaler technique ni most under-checked part ya asthma care: same dose, iliyochukuliwa kwa poor technique, inaweza kuwa fraction kama effective. Ask clinician au nurse akuangalie ukichukua dose kila visit.',
  },

  commonSideEffects: [
    {
      en: 'Oral thrush (white patches in the mouth that hurt and taste metallic) — almost entirely preventable by using a spacer and rinsing the mouth after each dose. If it develops, ask for nystatin or another antifungal mouth treatment and have your inhaler technique checked.',
      sw: 'Thrush ya kinywa (vipande vyeupe mdomoni vinavyouma na vinaonja metali) — inazuiwa karibu kabisa kwa kutumia spacer na kusuuza mdomo baada ya kila dose. Ikiendelea, omba nystatin au matibabu mengine ya antifungal ya kinywa na uchunguze mbinu yako ya inhaler.',
      sw_mtaa: 'Oral thrush (white patches mdomoni zinazouma na zinaonja metallic) — almost entirely preventable kwa kutumia spacer na kusuuza mouth baada ya kila dose. Ikidevelop, ask kwa nystatin au other antifungal mouth treatment na uchunguze inhaler technique yako.',
    },
    {
      en: 'Hoarseness of voice (dysphonia) — from steroid contact with the vocal cords. Improves with spacer use and mouth/throat rinsing. Singers and teachers may notice this most.',
      sw: 'Ukame wa sauti (dysphonia) — kutoka mawasiliano ya steroid na vocal cords. Inaboreka kwa matumizi ya spacer na kusuuza mdomo/koo. Wasanii na walimu wanaweza kugundua hii zaidi.',
      sw_mtaa: 'Hoarseness ya voice (dysphonia) — kutoka steroid contact na vocal cords. Inaimprove na spacer use na mouth/throat rinsing. Singers na teachers wanaweza kunotice hii zaidi.',
    },
    {
      en: 'Mild throat irritation or cough during inhalation — common and settles, much reduced with a spacer.',
      sw: 'Muwasho mdogo wa koo au kikohozi wakati wa kuvuta — ya kawaida na hutulia, hupunguzwa sana na spacer.',
      sw_mtaa: 'Mild throat irritation au cough during inhalation — common na inatulia, much reduced na spacer.',
    },
    {
      en: 'Bad taste — usually a sign of technique that delivers medicine to the throat instead of the lungs. Spacer plus rinse solves it.',
      sw: 'Ladha mbaya — kawaida ni ishara ya mbinu inayotoa dawa kwenye koo badala ya mapafu. Spacer pamoja na suuza huitatua.',
      sw_mtaa: 'Bad taste — kawaida ni sign ya technique inayotoa medicine kwenye throat badala ya lungs. Spacer plus rinse inai-solve.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Allergic reaction (rare) — swelling, hives, breathing trouble. Stop and seek emergency care.',
        sw: 'Athari ya mzio (nadra) — uvimbe, urticaria, tatizo la kupumua. Simamisha na tafuta huduma ya dharura.',
        sw_mtaa: 'Allergic reaction (rare) — swelling, hives, breathing trouble. Stop na tafuta emergency care.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Adrenal suppression (very rare at standard doses, more risk with high-dose long-term ICS — especially fluticasone) — can show up as fatigue, weight loss, dizziness on standing, low blood sugar. Mainly relevant in children on high doses, or when stopping high-dose ICS abruptly. Never stop a long-term high-dose ICS suddenly without clinician guidance.',
        sw: 'Kukandamizwa kwa adrenal (nadra sana katika dose za kawaida, hatari zaidi na ICS ya dose ya juu ya muda mrefu — hasa fluticasone) — inaweza kuonekana kama uchovu, kupungua uzito, kizunguzungu kusimama, sukari ya chini ya damu. Hasa muhimu kwa watoto kwenye dose za juu, au wakati wa kusimamisha ICS ya dose ya juu ghafla. Kamwe usisimamishe ICS ya dose ya juu ya muda mrefu ghafla bila mwongozo wa daktari.',
        sw_mtaa: 'Adrenal suppression (very rare katika standard doses, more risk na high-dose long-term ICS — especially fluticasone) — inaweza kushow up kama fatigue, weight loss, dizziness kusimama, low blood sugar. Mainly relevant kwa watoto kwa high doses, au wakati wa stopping high-dose ICS abruptly. Never stop long-term high-dose ICS suddenly without clinician guidance.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      effect: {
        en: 'In long-term high-dose ICS only — small but real increased risk of cataracts and glaucoma, mild reduction in bone density, and (in children) a small reduction in adult height (~1 cm). These risks are far smaller than the risk of uncontrolled asthma — but they are why the dose is kept at the minimum needed.',
        sw: 'Katika ICS ya dose ya juu ya muda mrefu pekee — hatari ndogo lakini ya kweli iliyoongezeka ya cataracts na glaucoma, kupungua kidogo kwa msongamano wa mfupa, na (kwa watoto) kupungua kidogo kwa urefu wa watu wazima (~1 cm). Hatari hizi ni ndogo zaidi kuliko hatari ya pumu isiyodhibitiwa — lakini ndio sababu dose huwekwa katika kiwango cha chini kinachohitajika.',
        sw_mtaa: 'Katika long-term high-dose ICS pekee — small lakini real increased risk ya cataracts na glaucoma, mild reduction katika bone density, na (kwa watoto) small reduction katika adult height (~1 cm). Risks hizi ni far smaller kuliko risk ya uncontrolled asthma — lakini ndio sababu dose inawekwa katika minimum needed.',
      },
      urgency: 'routine' as UrgencyLevel,
    },
    {
      effect: {
        en: 'In COPD only — increased risk of pneumonia at high ICS doses (less of a concern in asthma); this is one reason ICS is used more selectively in COPD.',
        sw: 'Katika COPD pekee — hatari iliyoongezeka ya nimonia katika dose za juu za ICS (sio wasiwasi zaidi katika pumu); hii ni sababu moja ICS hutumika kwa uchunguzi zaidi katika COPD.',
        sw_mtaa: 'Katika COPD pekee — increased risk ya pneumonia katika high ICS doses (less of a concern katika asthma); hii ni one reason ICS inatumika more selectively katika COPD.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'cyp3a4_inhibitor',
      withDisplay: { en: 'strong CYP3A4 inhibitors (ritonavir, cobicistat, ketoconazole, itraconazole, clarithromycin)', sw: 'CYP3A4 inhibitors kali (ritonavir, cobicistat, ketoconazole, itraconazole, clarithromycin)' },
      severity: 'caution',
      explanation: {
        en: 'These drugs slow the breakdown of inhaled steroid in the body — particularly fluticasone — and can raise the small systemic dose to where it acts more like an oral steroid (causing adrenal suppression and Cushingoid features). Most relevant in HIV care (ritonavir, cobicistat) and in some antifungal courses. Tell the prescriber about every inhaler you use — the clinician may switch to a different ICS molecule (beclomethasone, ciclesonide, mometasone) with less interaction.',
        sw: 'Dawa hizi hupunguza kasi ya kuvunjwa kwa steroid ya kuvuta mwilini — hasa fluticasone — na zinaweza kuinua dose ndogo ya mwili hadi mahali inafanya kazi zaidi kama steroid ya kumeza (kusababisha kukandamizwa kwa adrenal na sifa za Cushingoid). Muhimu zaidi katika huduma ya VVU (ritonavir, cobicistat) na katika kozi za antifungal. Mwambie mwandishi kuhusu kila inhaler unayotumia — daktari anaweza kubadilisha hadi molekuli tofauti ya ICS (beclomethasone, ciclesonide, mometasone) yenye mwingiliano mdogo.',
        sw_mtaa: 'Dawa hizi zinaslow breakdown ya inhaled steroid mwilini — hasa fluticasone — na zinaweza kuinua small systemic dose hadi mahali inaact more like oral steroid (kusababisha adrenal suppression na Cushingoid features). Most relevant katika HIV care (ritonavir, cobicistat) na katika some antifungal courses. Mwambie prescriber kuhusu kila inhaler unayotumia — clinician anaweza kuswitch hadi different ICS molecule (beclomethasone, ciclesonide, mometasone) yenye less interaction.',
      },
      sources: [src('BNF_CURRENT'), src('NACP_ART_2024')],
    },
    {
      with: 'oral_corticosteroid',
      withDisplay: { en: 'oral corticosteroid (prednisolone, dexamethasone)', sw: 'corticosteroid ya kumeza (prednisolone, dexamethasone)' },
      severity: 'note',
      explanation: {
        en: 'During a short oral steroid course for an exacerbation, continue the inhaled steroid as before — both work, and stopping the inhaled one risks rebound when the oral course finishes. Long-term combined high doses can add to systemic side effects, which is part of why steroid-sparing alternatives are pursued for severe asthma.',
        sw: 'Wakati wa kozi fupi ya steroid ya kumeza kwa exacerbation, endelea na steroid ya kuvuta kama kabla — vyote vinafanya kazi, na kusimamisha ya kuvuta huleta hatari ya kurudia wakati kozi ya kumeza inapomalizika. Dose za juu zilizounganishwa za muda mrefu zinaweza kuongeza athari za mwili, ambayo ni sehemu ya sababu mbadala za kupunguza steroid zinafuatwa kwa pumu kali.',
        sw_mtaa: 'During short oral steroid course kwa exacerbation, continue inhaled steroid kama before — both zinafanya kazi, na kusimamisha inhaled one inarisk rebound wakati oral course inapofinish. Long-term combined high doses zinaweza kuadd kwa systemic side effects, ambayo ni sehemu ya sababu steroid-sparing alternatives zinafuatwa kwa severe asthma.',
      },
      sources: [src('BNF_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Every day, even when you feel well', sw: 'Kila siku, hata unapojihisi vizuri' },
      note: {
        en: 'The hardest concept in asthma: take the controller exactly the same on days you feel completely well as on days you have symptoms. The reason you feel well is that the controller is doing its job. Stopping it because "I do not need it any more" is the single most common pathway back to severe attacks and hospital. If your asthma has been excellent for three months, the clinician — not you — may decide to step down. Never stop on your own.',
        sw: 'Dhana ngumu zaidi katika pumu: chukua controller sawa kabisa siku unazojihisi vizuri kabisa kama siku una dalili. Sababu unajihisi vizuri ni kwamba controller inafanya kazi yake. Kuisimamisha kwa sababu "siihitaji tena" ni njia moja ya kawaida zaidi kurudi kwa mashambulizi makali na hospitali. Ikiwa pumu yako imekuwa bora kwa miezi mitatu, daktari — sio wewe — anaweza kuamua kushuka. Kamwe usisimamishe peke yako.',
        sw_mtaa: 'Hardest concept katika pumu: chukua controller exactly same siku unajihisi well completely kama siku una symptoms. Reason unajihisi vizuri ni kwamba controller inafanya kazi yake. Kusimamisha kwa sababu "siihitaji tena" ni single most common pathway back to severe attacks na hospitali. Ikiwa asthma yako imekuwa excellent kwa miezi mitatu, clinician — sio wewe — anaweza kuamua step down. Never simamisha peke yako.',
      },
    },
    {
      topic: { en: 'Spacer + rinse — the two free upgrades', sw: 'Spacer + suuza — uboreshaji wawili wa bure' },
      note: {
        en: 'Two changes triple the value of every dose: (1) use a spacer with every inhaled dose — two to three times more medicine reaches the lungs and less hits the throat; (2) rinse the mouth and throat with water after every dose, spit it out — almost completely prevents the main side effect (thrush) and the bad taste. Both are free and last forever. If you have not been given a spacer, ask.',
        sw: 'Mabadiliko mawili huongeza mara tatu thamani ya kila dose: (1) tumia spacer na kila dose ya kuvuta — dawa mara mbili hadi tatu zaidi inafikia mapafu na kidogo zaidi inagonga koo; (2) suuza mdomo na koo kwa maji baada ya kila dose, utema — huzuia karibu kabisa athari kuu (thrush) na ladha mbaya. Vyote ni vya bure na hudumu milele. Ikiwa hujapewa spacer, uliza.',
        sw_mtaa: 'Mabadiliko mawili yanatriple value ya kila dose: (1) tumia spacer na kila inhaled dose — two to three times more medicine inafikia lungs na less inahit throat; (2) rinse mouth na throat na water baada ya kila dose, spit it out — almost completely inazuia main side effect (thrush) na bad taste. Both ni free na zinadumu forever. Ikiwa hujapewa spacer, ask.',
      },
    },
    {
      topic: { en: 'ICS vs oral steroid — they are NOT the same', sw: 'ICS dhidi ya steroid ya kumeza — SI sawa' },
      note: {
        en: 'A common worry: "I do not want to take steroids long-term — I have heard about the side effects." Those side effects (weight gain, diabetes, bone loss, mood change, easy bruising, high blood pressure) come from ORAL steroids taken in much higher doses, reaching the whole body. The inhaled steroid in standard doses delivers a tiny fraction to the bloodstream — local effect in the airways, almost no systemic exposure. Used correctly with a spacer and mouth rinse, the inhaled steroid is one of the safest long-term medicines in all of medicine. The risk of uncontrolled asthma is far higher than the risk of the controller.',
        sw: 'Wasiwasi wa kawaida: "Sitaki kuchukua steroids kwa muda mrefu — nimesikia kuhusu madhara." Madhara hayo (kuongezeka uzito, kisukari, kupotea kwa mfupa, mabadiliko ya hisia, kupata michubuko kwa urahisi, shinikizo la juu la damu) hutoka kwa steroids za KUMEZA zilizochukuliwa katika dose za juu zaidi, zikifikia mwili mzima. Steroid ya kuvuta katika dose za kawaida hutoa sehemu ndogo sana kwenye mfumo wa damu — athari ya kienyeji katika njia za hewa, karibu hakuna mfichuo wa mwili. Ikitumika kwa usahihi na spacer na kusuuza mdomo, steroid ya kuvuta ni mojawapo ya dawa salama zaidi za muda mrefu katika dawa zote. Hatari ya pumu isiyodhibitiwa ni kubwa zaidi kuliko hatari ya controller.',
        sw_mtaa: 'Common worry: "Sitaki kuchukua steroids long-term — nimesikia kuhusu side effects." Hizo side effects (weight gain, diabetes, bone loss, mood change, easy bruising, high BP) zinatoka kwa ORAL steroids zilizochukuliwa katika much higher doses, zikifikia whole body. Inhaled steroid katika standard doses inadeliver tiny fraction kwa bloodstream — local effect katika airways, almost no systemic exposure. Used correctly na spacer na mouth rinse, inhaled steroid ni one of the safest long-term medicines katika all medicine. Risk ya uncontrolled asthma ni far higher kuliko risk ya controller.',
      },
    },
    {
      topic: { en: 'Pregnancy and breastfeeding', sw: 'Mimba na kunyonyesha' },
      note: {
        en: 'Inhaled corticosteroids are well-studied and safe across pregnancy and breastfeeding. Most data is on budesonide and beclomethasone (the longest track record). The fetal and infant risk of uncontrolled asthma is far greater than any small theoretical risk from the inhaler. Continue your ICS exactly as before pregnancy. Never stop "because of the baby."',
        sw: 'Corticosteroids za kuvuta zimesomwa vizuri na ni salama katika mimba na kunyonyesha. Data nyingi ni juu ya budesonide na beclomethasone (rekodi ya muda mrefu zaidi). Hatari ya mtoto na mtoto mchanga ya pumu isiyodhibitiwa ni kubwa zaidi kuliko hatari yoyote ndogo ya kinadharia kutoka kwa inhaler. Endelea na ICS yako kama kabla ya mimba. Kamwe usisimamishe "kwa sababu ya mtoto."',
        sw_mtaa: 'Inhaled corticosteroids ni well-studied na safe kwa pregnancy na breastfeeding yote. Most data iko juu ya budesonide na beclomethasone (longest track record). Fetal na infant risk ya uncontrolled asthma ni far greater kuliko any small theoretical risk kutoka inhaler. Continue ICS yako exactly as before pregnancy. Never simamisha "kwa sababu ya baby."',
      },
    },
    {
      topic: { en: 'Children and growth', sw: 'Watoto na ukuaji' },
      note: {
        en: 'A common parental concern is that the inhaled steroid will stunt the child\'s growth. Long-term studies show a small effect — about 1 cm less final adult height in children who took daily ICS through childhood, compared to those who did not. This is real but small, and it is dwarfed by the height difference caused by severe uncontrolled asthma (which suppresses growth far more, through chronic inflammation, oral steroid courses, and missed activity). Use the minimum dose that keeps the asthma well controlled, check growth at regular reviews, and remember that the alternative is not "no steroid" — it is uncontrolled asthma.',
        sw: 'Wasiwasi wa kawaida wa wazazi ni kwamba steroid ya kuvuta itazuia ukuaji wa mtoto. Tafiti za muda mrefu zinaonyesha athari ndogo — karibu cm 1 chini ya urefu wa mwisho wa mtu mzima kwa watoto walichukua ICS ya kila siku katika utoto wote, kulinganishwa na wale walio hawakuchukua. Hii ni ya kweli lakini ndogo, na inazidiwa na tofauti ya urefu inayosababishwa na pumu kali isiyodhibitiwa (ambayo huzuia ukuaji zaidi, kupitia uvimbe sugu, kozi za steroid ya kumeza, na kukosa shughuli). Tumia dose ya chini zaidi inayoweka pumu kuwa imedhibitiwa vizuri, angalia ukuaji katika mapitio ya kawaida, na kumbuka kwamba mbadala sio "hakuna steroid" — ni pumu isiyodhibitiwa.',
        sw_mtaa: 'Common parental concern ni kwamba inhaled steroid itastunt ukuaji wa mtoto. Long-term studies zinaonyesha small effect — about 1 cm less final adult height kwa watoto waliochukua daily ICS through childhood, ikilinganishwa na wale walio hawakuchukua. Hii ni real lakini small, na inadwarfed na height difference inayosababishwa na severe uncontrolled asthma (ambayo inasuppress growth far more, through chronic inflammation, oral steroid courses, na missed activity). Tumia minimum dose inayokeep asthma well controlled, check growth katika regular reviews, na kumbuka kwamba alternative sio "no steroid" — ni uncontrolled asthma.',
      },
    },
  ],

  sources: [
    src('WHO_PEN_2020'),
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
