/**
 * COPD — Chronic Obstructive Pulmonary Disease (Phase 10, full all-in)
 *
 * Sources: GOLD 2025, WHO PEN 2020, WHO Oxygen 2023, WHO AMR 2023,
 *          NTLG STG 2023, Muhimbili Protocols, NTLP TB 2024 (post-TB lung
 *          disease overlap cross-ref), NACP ART 2024 (HIV cross-ref).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Tanzania-specific framing:
 *   COPD in Tanzania is NOT primarily a smoker's disease. The dominant
 *   driver is biomass-fuel smoke exposure — firewood and charcoal cooking
 *   indoors, mostly affecting women who have cooked over open fires for
 *   30+ years. Tobacco is the second driver. Post-TB lung disease — the
 *   structural and obstructive damage left behind after successfully
 *   treated TB — is the third major driver, and explains why a non-smoker
 *   in their 40s who had TB at 18 can present with disabling breathlessness.
 *   The clinical language in this file deliberately puts biomass-smoke
 *   exposure first, because that is what a Tanzanian patient or daughter
 *   asking "kwa nini bibi anapumua kwa shida hivi?" actually needs.
 *
 * Coverage (all-in via variants):
 *   • COPD stable — outpatient, mild-moderate disease
 *   • COPD severe stable — Group D / advanced, frequent exacerbations
 *   • Acute exacerbation of COPD (AECOPD) — outpatient/non-severe
 *   • AECOPD severe — needs admission, ± controlled oxygen, ± NIV
 *   • Cor pulmonale / pulmonary hypertension from COPD
 *   • Post-TB obstructive lung disease — the Tanzanian "phenotype X"
 *
 * Comorbidities: heart failure (overlap symptoms, dual diagnosis common),
 * HIV (worse prognosis, accelerated decline, lower threshold for infection),
 * TB (history + active surveillance), diabetes (steroid-induced
 * hyperglycaemia during exacerbations), depression (under-recognised,
 * very common in advanced COPD).
 *
 * SCOPE: We educate patients, caregivers, and clinicians on what COPD is,
 * how biomass and tobacco cause it, why it is different from asthma,
 * when an exacerbation needs urgent care, how the inhalers actually work,
 * and the difference between controlled and uncontrolled oxygen in chronic
 * lung disease. We do NOT prescribe specific dose regimens or replace
 * clinical judgment.
 */

import { ConditionKnowledge } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { COPD_VARIANTS } from './copd.variants';

export const COPD: ConditionKnowledge = {
  id: 'copd',
  aliases: CONDITION_ALIASES.copd,
  category: 'respiratory',

  whatItIs: {
    en: 'Chronic Obstructive Pulmonary Disease — COPD — is a long-term lung disease in which the airways are permanently narrowed and the air sacs are damaged, so air gets trapped in the lungs and breathing out becomes hard work. The two main causes worldwide are tobacco smoke and biomass-fuel smoke (cooking with firewood or charcoal over an open fire indoors). In Tanzania, biomass smoke is the leading cause and affects women in particular — decades of breathing wood smoke while cooking damages the lungs in the same way long-term cigarette smoking does, and the damage is permanent. Unlike asthma, where airway narrowing comes and goes, COPD narrowing is mostly fixed — inhalers improve symptoms and reduce flare-ups but cannot fully open the airways back up. A third major cause in Tanzania is the lung damage left behind after a successfully treated case of tuberculosis (post-TB lung disease), which explains why a non-smoker in their 40s can present with severe breathlessness.',
    sw: 'Ugonjwa Sugu wa Kuziba kwa Mapafu — COPD — ni ugonjwa wa muda mrefu wa mapafu ambapo mirija ya hewa imebanwa kwa kudumu na vifuko vya hewa vimeharibika, kwa hiyo hewa hubaki ndani ya mapafu na kupumua nje kunakuwa kazi ngumu. Sababu kuu mbili duniani ni moshi wa tumbaku na moshi wa nishati ya kuni (kupika kwa kuni au mkaa juu ya moto wazi ndani ya nyumba). Tanzania, moshi wa kuni ni sababu kuu na huathiri wanawake hasa — miongo ya kuvuta moshi wa kuni wakati wa kupika huharibu mapafu kwa njia ile ile kuvuta sigara kwa muda mrefu kunavyofanya, na uharibifu huo ni wa kudumu. Tofauti na pumu, ambapo kubanwa kwa mirija ya hewa kuja na kuondoka, kubanwa kwa COPD ni cha kudumu — inhaler huboresha dalili na kupunguza milipuko lakini haiwezi kufungua mirija ya hewa kabisa tena. Sababu ya tatu kubwa Tanzania ni uharibifu wa mapafu uliobaki baada ya kesi ya kifua kikuu iliyotibika vyema (ugonjwa wa mapafu baada ya TB), ambao unaelezea kwa nini mtu asiyevuta sigara wa miaka ya 40 anaweza kuwa na kushindwa kupumua kwa kiasi kikubwa.',
    sw_mtaa: 'COPD (Chronic Obstructive Pulmonary Disease) ni long-term lung disease ambapo airways zimebanwa permanently na air sacs zimeharibika, kwa hiyo hewa inakwama ndani ya lungs na kupumua nje kunakuwa hard work. Two main causes worldwide ni tobacco smoke na biomass-fuel smoke (kupika na kuni au mkaa juu ya open fire ndani ya nyumba). Tanzania, biomass smoke ni leading cause na inaaffect wanawake especially — miongo ya kuvuta wood smoke wakati wa kupika inaharibu lungs kwa njia ile ile long-term cigarette smoking inavyofanya, na damage hiyo ni permanent. Tofauti na asthma, ambapo airway narrowing inakuja na kuondoka, COPD narrowing ni mostly fixed — inhalers zinaboresha symptoms na kupunguza flare-ups lakini haziwezi kufungua airways back up kabisa. Third major cause Tanzania ni lung damage iliyobaki baada ya successfully treated TB (post-TB lung disease), inayoexplain kwa nini non-smoker wa miaka ya 40 anaweza ku-present na severe breathlessness.',
  },

  whyItMatters: {
    en: 'COPD progresses slowly, silently, for years before the patient or family notices — by which point one-third to one-half of lung function is already gone and the damage cannot be undone. Three points carry the weight of the disease. First, the cause matters: a Tanzanian woman who has cooked over firewood for forty years and now gets breathless climbing one short flight has COPD until proven otherwise — not "old age" and not "just heart trouble." Second, exacerbations matter more than the day-to-day symptoms: every severe flare leaves the patient slightly worse than before, and the patients who die from COPD usually die during or shortly after one. Third, oxygen in COPD is different from oxygen in young lungs — too much oxygen in a person with advanced COPD can paradoxically worsen breathing by suppressing the drive to breathe and causing CO2 retention. The target SpO2 in chronic COPD is usually 88–92%, not 95+. Knowing this single fact prevents avoidable deaths.',
    sw: 'COPD huendelea polepole, kwa kimya kimya, kwa miaka kabla ya mgonjwa au familia kutambua — hadi pale ambapo theluthi moja hadi nusu ya utendaji wa mapafu tayari imepotea na uharibifu hauwezi kurekebishwa. Mambo matatu hubeba uzito wa ugonjwa. Kwanza, sababu ni muhimu: mwanamke wa Kitanzania aliyepika juu ya kuni kwa miaka arobaini na sasa anashindwa kupumua akipanda ngazi moja fupi ana COPD hadi ithibitishwe vinginevyo — sio "umri mzee" na sio "shida ya moyo tu." Pili, milipuko ni muhimu zaidi kuliko dalili za kila siku: kila mlipuko mkali humuacha mgonjwa kuwa mbaya kidogo kuliko hapo awali, na wagonjwa wanaokufa kwa COPD kawaida hufa wakati wa au muda mfupi baada ya mmoja. Tatu, oksijeni katika COPD ni tofauti na oksijeni katika mapafu mchanga — oksijeni nyingi sana katika mtu mwenye COPD ya juu inaweza kufanya kupumua kuwa mbaya zaidi kwa kuzuia gari la kupumua na kusababisha mkusanyiko wa CO2. Lengo la SpO2 katika COPD sugu kawaida ni 88–92%, sio 95+. Kujua ukweli huu mmoja huzuia vifo vinavyozuilika.',
    sw_mtaa: 'COPD inaprogress slowly, kimya kimya, kwa miaka kabla ya patient au family kunoteice — by which point theluthi hadi nusu ya lung function tayari imepotea na damage haiwezi ku-undone. Mambo matatu yanabeba uzito wa disease. Kwanza, cause ni muhimu: mwanamke wa Kitanzania aliye-cook over firewood kwa miaka arobaini na sasa anashindwa kupumua akipanda one short flight ana COPD hadi proven otherwise — sio "old age" na sio "heart trouble tu." Pili, exacerbations ni muhimu zaidi kuliko day-to-day symptoms: kila severe flare inamuacha patient slightly worse kuliko before, na patients wanaodie from COPD kawaida wanadie wakati wa au muda mfupi baada ya moja. Tatu, oxygen katika COPD ni tofauti na oxygen katika young lungs — too much oxygen kwa mtu mwenye advanced COPD inaweza paradoxically ku-worsen breathing kwa kuzuia drive to breathe na kusababisha CO2 retention. Target ya SpO2 katika chronic COPD kawaida ni 88–92%, sio 95+. Kujua single fact hii inazuia avoidable deaths.',
  },

  commonQuestions: [
    // ── What is COPD ───────────────────────────────────────────────────
    {
      q: { en: 'What is COPD?', sw: 'COPD ni nini?' },
      a: {
        en: 'COPD stands for Chronic Obstructive Pulmonary Disease — a permanent narrowing of the airways and damage to the air sacs in the lungs that makes it hard to breathe out. The two big causes are tobacco smoke and biomass-fuel smoke (firewood or charcoal cooking indoors). In Tanzania, biomass smoke is the leading cause and most patients are women in their 50s, 60s, or 70s who have cooked over open fires for decades. The damage is permanent — what we treat is symptoms, flare-ups, and slowing the next stage. We do not "cure" COPD, but we can give back years of better breathing.',
        sw: 'COPD ina maana ya Ugonjwa Sugu wa Kuziba kwa Mapafu — kubanwa kwa kudumu kwa mirija ya hewa na uharibifu wa vifuko vya hewa kwenye mapafu ambao hufanya iwe ngumu kupumua nje. Sababu kubwa mbili ni moshi wa tumbaku na moshi wa nishati ya kuni (kupika kwa kuni au mkaa ndani ya nyumba). Tanzania, moshi wa kuni ni sababu kuu na wagonjwa wengi ni wanawake wa miaka 50, 60, au 70 waliopika juu ya moto wazi kwa miongo. Uharibifu ni wa kudumu — kile tunachotibu ni dalili, milipuko, na kupunguza kasi ya hatua inayofuata. Hatutibu COPD kabisa, lakini tunaweza kurudisha miaka ya kupumua bora zaidi.',
        sw_mtaa: 'COPD inastand for Chronic Obstructive Pulmonary Disease — permanent narrowing ya airways na damage ya air sacs kwenye lungs ambayo inafanya iwe hard kupumua nje. Two big causes ni tobacco smoke na biomass-fuel smoke (firewood au charcoal cooking indoors). Tanzania, biomass smoke ni leading cause na wagonjwa wengi ni wanawake wa miaka 50, 60, au 70 waliocook over open fires kwa decades. Damage ni permanent — kile tunachotibu ni symptoms, flare-ups, na kuslow next stage. Hatutibu COPD kabisa, lakini tunaweza kurudisha years of better breathing.',
      },
    },
    // ── Smoke + women ───────────────────────────────────────────────
    {
      q: { en: 'My mother does not smoke — how can she have COPD?', sw: 'Mama yangu havuti sigara — anawezaje kuwa na COPD?' },
      a: {
        en: 'Most COPD in Tanzania is not caused by cigarettes — it is caused by years of cooking smoke. A woman who has cooked three meals a day over a firewood or charcoal fire inside a small kitchen for thirty or forty years has inhaled the equivalent of a heavy smoker\'s cumulative exposure. The smoke from burning biomass contains the same kinds of toxic particles as tobacco smoke and causes the same kind of lung damage. This is why COPD in Tanzania often presents in women who have never touched a cigarette, and why "she does not smoke" should never be used to rule it out. The single most effective intervention is moving the cooking outdoors, switching to a cleaner cookstove or LPG/gas, and improving kitchen ventilation. The damage already done cannot be reversed, but stopping further exposure slows progression.',
        sw: 'COPD nyingi Tanzania hazisababishwi na sigara — zinasababishwa na miaka ya moshi wa kupika. Mwanamke aliyepika milo mitatu kwa siku juu ya moto wa kuni au mkaa ndani ya jiko ndogo kwa miaka thelathini au arobaini amevuta sawa na kuvuta sigara nyingi kwa muda mrefu. Moshi wa kuchoma nishati ya kuni una aina hiyo hiyo ya chembe sumu kama moshi wa tumbaku na husababisha aina hiyo hiyo ya uharibifu wa mapafu. Hii ndiyo sababu COPD Tanzania mara nyingi hujitokeza kwa wanawake ambao hawajawahi kugusa sigara, na kwa nini "havuti sigara" haipaswi kutumika kuiondoa. Hatua moja yenye matokeo zaidi ni kuhamisha upishi nje, kubadilisha kwa jiko safi au LPG/gesi, na kuboresha hewa ya jikoni. Uharibifu uliofanyika tayari hauwezi kurekebishwa, lakini kusimamisha mfiduo zaidi hupunguza kasi ya kuendelea.',
        sw_mtaa: 'COPD nyingi Tanzania hazisababishwi na cigarettes — zinasababishwa na miaka ya cooking smoke. Mwanamke aliye-cook three meals a day over firewood au charcoal fire ndani ya small kitchen kwa miaka thirty au forty amevuta equivalent ya heavy smoker\'s cumulative exposure. Smoke ya kuchoma biomass ina same kinds of toxic particles kama tobacco smoke na inasababisha same kind of lung damage. Hii ndiyo sababu COPD Tanzania mara nyingi inapresent kwa wanawake ambao hawajawahi kugusa cigarette, na kwa nini "havuti sigara" haipaswi kutumika ku-rule it out. Single most effective intervention ni kumove cooking outdoors, kubadilisha kwa cleaner cookstove au LPG/gas, na kuboresha kitchen ventilation. Damage iliyofanyika tayari haiwezi ku-reversed, lakini kusimamisha further exposure inaslow progression.',
      },
    },
    // ── COPD vs asthma ───────────────────────────────────────────────
    {
      q: { en: 'Is COPD the same as asthma?', sw: 'COPD na pumu ni kitu kimoja?' },
      a: {
        en: 'No — they are related but importantly different. Asthma is reversible airway narrowing — between attacks the lungs work normally and a salbutamol inhaler restores airflow nearly to baseline. COPD is mostly fixed narrowing — even at the patient\'s best, lung function is reduced compared to a healthy person of the same age, and inhalers improve things only partially. Asthma usually starts in childhood, has clear triggers (cold air, exercise, allergens, viral infections), and responds dramatically to inhaled steroids. COPD usually starts after age 40, is driven by years of smoke exposure (tobacco or biomass), and inhaled steroids are used more selectively — for patients with frequent exacerbations or with an asthma-COPD overlap. The two diseases can co-exist (ACO — asthma-COPD overlap), particularly in someone who had childhood asthma and then went on to a long smoking or biomass-exposure history. Distinguishing them matters because the treatment ladder is different.',
        sw: 'Hapana — vinahusiana lakini ni tofauti kwa namna muhimu. Pumu ni kubanwa kwa mirija ya hewa kunakoweza kurudi — kati ya mashambulizi mapafu hufanya kazi kwa kawaida na inhaler ya salbutamol hurejesha mtiririko wa hewa karibu kabisa. COPD ni kubanwa kilichowekwa kabisa — hata katika hali bora zaidi ya mgonjwa, utendaji wa mapafu umepunguzwa ikilinganishwa na mtu mwenye afya wa umri huo huo, na inhaler huboresha vitu kwa sehemu tu. Pumu kawaida huanza utotoni, ina vichocheo wazi (hewa baridi, mazoezi, allergens, maambukizi ya virusi), na hujibu kwa kasi kwa steroid za kupuliza. COPD kawaida huanza baada ya miaka 40, husababishwa na miaka ya kufunua na moshi (tumbaku au nishati ya kuni), na steroid za kupuliza hutumika kwa uangalifu zaidi — kwa wagonjwa wenye milipuko ya mara kwa mara au na ACO. Magonjwa mawili yanaweza kuko pamoja (ACO — asthma-COPD overlap), hasa kwa mtu aliyekuwa na pumu ya utotoni kisha akawa na historia ndefu ya kuvuta sigara au mfiduo wa nishati ya kuni. Kutofautisha vyote ni muhimu kwa sababu ngazi ya matibabu ni tofauti.',
        sw_mtaa: 'Hapana — vinahusiana lakini ni tofauti kwa namna muhimu. Asthma ni reversible airway narrowing — between attacks lungs zinafanya kazi normally na salbutamol inhaler inarestore airflow nearly to baseline. COPD ni mostly fixed narrowing — hata at patient\'s best, lung function imepunguzwa ikilinganishwa na healthy person wa same age, na inhalers zinaboresha vitu only partially. Asthma kawaida inastart utotoni, ina clear triggers (cold air, exercise, allergens, viral infections), na inajibu dramatically kwa inhaled steroids. COPD kawaida inastart baada ya miaka 40, inadrive na years of smoke exposure (tobacco au biomass), na inhaled steroids zinatumika more selectively — kwa wagonjwa wenye frequent exacerbations au na asthma-COPD overlap. Two diseases zinaweza ku-coexist (ACO — asthma-COPD overlap), hasa kwa mtu aliyekuwa na childhood asthma kisha akawa na long smoking au biomass-exposure history. Distinguishing them ni muhimu kwa sababu treatment ladder ni tofauti.',
      },
    },
    // ── post-TB lung disease ─────────────────────────────────────────
    {
      q: { en: 'I had TB years ago — can it cause COPD now?', sw: 'Nilikuwa na TB miaka iliyopita — inaweza kusababisha COPD sasa?' },
      a: {
        en: 'Yes — this is post-TB lung disease, and it is one of the most under-recognised respiratory conditions in Tanzania. Even after a successful course of TB treatment, the scarring and structural damage left in the airways can mimic COPD: chronic cough, breathlessness, recurrent chest infections, and reduced exercise tolerance. People in their 30s and 40s who had TB at 18 or 20 can present with disability that is mistaken for "weak chest" or "old TB." The diagnosis matters because treatment is similar to COPD (bronchodilators, sometimes inhaled steroid, pulmonary rehabilitation, infection control, vaccination), and because every cough in a post-TB patient must first be evaluated for TB recurrence — not assumed to be COPD. If you had TB and now have ongoing breathlessness or cough, ask a clinician for spirometry and a chest X-ray.',
        sw: 'Ndio — huu ni ugonjwa wa mapafu baada ya TB, na ni mojawapo ya hali za kupumua zinazotambuliwa kidogo zaidi Tanzania. Hata baada ya kozi ya matibabu ya TB iliyofanikiwa, kovu na uharibifu wa muundo uliobaki katika mirija ya hewa unaweza kuiga COPD: kikohozi cha kudumu, kushindwa kupumua, maambukizi ya kifua ya mara kwa mara, na kupungua kwa uvumilivu wa mazoezi. Watu wa miaka 30 na 40 waliokuwa na TB miaka 18 au 20 wanaweza kuwasilisha ulemavu unaodhaniwa kuwa "kifua dhaifu" au "TB ya zamani." Utambuzi ni muhimu kwa sababu matibabu ni sawa na COPD (bronchodilators, wakati mwingine steroid ya kupuliza, ukarabati wa mapafu, udhibiti wa maambukizi, chanjo), na kwa sababu kila kikohozi katika mgonjwa wa baada ya TB lazima kwanza kichunguzwe kwa kurudia kwa TB — kisidhaniwe kuwa COPD. Ikiwa ulikuwa na TB na sasa una kushindwa kupumua au kikohozi kinachoendelea, omba daktari spirometry na X-ray ya kifua.',
        sw_mtaa: 'Ndio — huu ni post-TB lung disease, na ni mojawapo ya most under-recognised respiratory conditions Tanzania. Hata baada ya successful course ya TB treatment, scarring na structural damage iliyobaki katika airways inaweza ku-mimic COPD: chronic cough, breathlessness, recurrent chest infections, na reduced exercise tolerance. Watu wa miaka 30 na 40 waliokuwa na TB miaka 18 au 20 wanaweza kupresent na disability inayodhaniwa kuwa "weak chest" au "old TB." Diagnosis ni muhimu kwa sababu treatment ni similar na COPD (bronchodilators, wakati mwingine inhaled steroid, pulmonary rehabilitation, infection control, vaccination), na kwa sababu kila cough katika post-TB patient lazima kwanza ipimwe kwa TB recurrence — kisidhaniwe kuwa COPD. Ikiwa ulikuwa na TB na sasa una ongoing breathlessness au cough, omba clinician spirometry na chest X-ray.',
      },
    },
    // ── Oxygen target ────────────────────────────────────────────────
    {
      q: { en: 'Why is the oxygen target lower in COPD?', sw: 'Kwa nini lengo la oksijeni ni la chini katika COPD?' },
      a: {
        en: 'In healthy lungs and in acute illness, we aim for SpO2 ≥ 94%. In someone with chronic, advanced COPD, that same target can be dangerous. The body of a person with advanced COPD has adapted over years to slightly low oxygen levels — the drive to breathe in these patients is partly maintained by low oxygen (the "hypoxic drive"). If you give them too much supplemental oxygen, you remove that drive, breathing slows, CO2 builds up in the blood, and the patient becomes drowsy, confused, then unconscious — this is called CO2 retention or oxygen-induced hypercapnic respiratory failure. The right target in chronic, stable COPD or during a COPD exacerbation is SpO2 88–92%, given with controlled, titrated oxygen (typically a Venturi mask starting at 24–28%), monitored closely. This single fact — "in COPD, do not push the saturation above 92%" — has saved many lives. It does not mean withhold oxygen if needed; it means give it carefully and to the right target.',
        sw: 'Katika mapafu yenye afya na katika ugonjwa wa papo hapo, tunalenga SpO2 ≥ 94%. Katika mtu mwenye COPD sugu, ya hali ya juu, lengo hilo hilo linaweza kuwa hatari. Mwili wa mtu mwenye COPD ya juu umezoea kwa miaka kwa viwango vya chini kidogo vya oksijeni — gari la kupumua kwa wagonjwa hawa hudumishwa kwa sehemu na oksijeni ya chini ("hypoxic drive"). Ukiwapa oksijeni ya nyongeza nyingi sana, unaondoa gari hilo, kupumua hupunguza kasi, CO2 hujikusanya katika damu, na mgonjwa huwa na usingizi, mkanganyiko, kisha kupoteza fahamu — hii inaitwa mkusanyiko wa CO2 au hypercapnic respiratory failure inayosababishwa na oksijeni. Lengo sahihi katika COPD sugu, thabiti au wakati wa mlipuko wa COPD ni SpO2 88–92%, ikipewa kwa oksijeni iliyorekebishwa (kawaida Venturi mask kuanzia 24–28%), ikifuatiliwa kwa karibu. Ukweli huu mmoja — "katika COPD, usisukume saturation juu ya 92%" — umeokoa maisha mengi. Haimaanishi kuzuia oksijeni kama inahitajika; inamaanisha ipe kwa uangalifu na kwa lengo sahihi.',
        sw_mtaa: 'Katika healthy lungs na katika acute illness, tunalenga SpO2 ≥ 94%. Katika mtu mwenye chronic, advanced COPD, same target hiyo inaweza kuwa hatari. Body ya mtu mwenye advanced COPD ime-adapt over years kwa slightly low oxygen levels — drive to breathe kwa wagonjwa hawa ina-maintained partly na low oxygen ("hypoxic drive"). Ukiwapa too much supplemental oxygen, unaondoa drive hiyo, breathing inaslow, CO2 inajenga up katika damu, na patient anakuwa drowsy, confused, kisha unconscious — hii inaitwa CO2 retention au oxygen-induced hypercapnic respiratory failure. Right target katika chronic, stable COPD au wakati wa COPD exacerbation ni SpO2 88–92%, ikipewa kwa controlled, titrated oxygen (kawaida Venturi mask kuanzia 24–28%), ikimonitorwa kwa karibu. Single fact hii — "katika COPD, usisukume saturation juu ya 92%" — imeokoa maisha mengi. Haimaanishi withhold oxygen kama inahitajika; inamaanisha ipe carefully na to the right target.',
      },
    },
    // ── Inhalers — how they actually work ───────────────────────────
    {
      q: { en: 'How do COPD inhalers work?', sw: 'Inhaler za COPD hufanyaje kazi?' },
      a: {
        en: 'COPD inhalers come in three main classes: long-acting bronchodilators that relax airway muscles (LABAs — like salmeterol or formoterol — and LAMAs — like tiotropium), short-acting relievers for sudden tightness (salbutamol, ipratropium), and inhaled corticosteroids (ICS — like beclomethasone, budesonide, fluticasone) that reduce inflammation. In COPD the workhorses are the long-acting bronchodilators (LABA, LAMA, or LABA+LAMA combined), used every day to keep airways as open as possible. Inhaled steroids are added more selectively — for patients with frequent exacerbations, raised blood eosinophils, or a history of asthma overlap — because in pure COPD they raise the risk of pneumonia and are not the foundation of treatment the way they are in asthma. Salbutamol (the blue inhaler) is the rescue inhaler for sudden breathlessness, not a daily treatment. Inhaler technique matters more than which inhaler you have — a spacer makes a huge difference, especially in older patients.',
        sw: 'Inhaler za COPD zinakuja katika makundi makuu matatu: bronchodilator za muda mrefu zinazolegeza misuli ya mirija ya hewa (LABAs — kama salmeterol au formoterol — na LAMAs — kama tiotropium), reliever za muda mfupi kwa kubanwa ghafla (salbutamol, ipratropium), na inhaled corticosteroid (ICS — kama beclomethasone, budesonide, fluticasone) zinazopunguza uvimbe. Katika COPD nyenzo kuu ni long-acting bronchodilator (LABA, LAMA, au LABA+LAMA pamoja), zinazotumiwa kila siku kuweka mirija ya hewa wazi kadiri inavyowezekana. Inhaled steroid huongezwa kwa uangalifu zaidi — kwa wagonjwa wenye milipuko ya mara kwa mara, eosinophil za damu zilizoinuliwa, au historia ya asthma overlap — kwa sababu katika COPD safi huongeza hatari ya nimonia na sio msingi wa matibabu kama ilivyo katika pumu. Salbutamol (inhaler ya bluu) ni inhaler ya kuokoa kwa kushindwa kupumua kwa ghafla, sio matibabu ya kila siku. Mbinu ya inhaler ni muhimu zaidi kuliko inhaler gani uliyonayo — spacer huleta tofauti kubwa, hasa kwa wagonjwa wakubwa.',
        sw_mtaa: 'COPD inhalers zinakuja katika three main classes: long-acting bronchodilators zinazolegeza airway muscles (LABAs — kama salmeterol au formoterol — na LAMAs — kama tiotropium), short-acting relievers kwa sudden tightness (salbutamol, ipratropium), na inhaled corticosteroids (ICS — kama beclomethasone, budesonide, fluticasone) zinazopunguza inflammation. Katika COPD workhorses ni long-acting bronchodilators (LABA, LAMA, au LABA+LAMA combined), zinazotumiwa kila siku kuweka airways open as much as possible. Inhaled steroids zinaongezwa more selectively — kwa wagonjwa wenye frequent exacerbations, raised blood eosinophils, au history ya asthma overlap — kwa sababu katika pure COPD zinaraise risk ya pneumonia na sio foundation ya treatment kama ilivyo katika asthma. Salbutamol (blue inhaler) ni rescue inhaler kwa sudden breathlessness, sio daily treatment. Inhaler technique ni muhimu zaidi kuliko inhaler gani unayo — spacer inaleta huge difference, especially kwa older patients.',
      },
    },
    // ── Exacerbations ─────────────────────────────────────────────────
    {
      q: { en: 'What is a COPD exacerbation?', sw: 'Mlipuko wa COPD ni nini?' },
      a: {
        en: 'An exacerbation (or "flare-up") of COPD is a period — usually triggered by a viral or bacterial chest infection, or sometimes by smoke, dust, or pollution — when symptoms worsen beyond the patient\'s usual daily level: more breathlessness, more cough, more sputum, or sputum changing colour (from clear to yellow or green), and sometimes fever. The exacerbation can last days to weeks. Most are managed at home or as an outpatient with stepped-up bronchodilators, a short course of oral prednisolone (typically 30–40 mg daily for 5 days), and antibiotics only if there are signs of bacterial infection (purulent sputum, fever, raised inflammatory markers) — antibiotics are not automatic. Severe exacerbations need admission, controlled oxygen, sometimes non-invasive ventilation (NIV/BiPAP), and a much closer eye on CO2 levels. Every severe exacerbation makes the long-term disease worse — preventing them is one of the main goals of COPD care.',
        sw: 'Mlipuko (au "flare-up") wa COPD ni kipindi — kawaida husababishwa na maambukizi ya kifua ya virusi au bakteria, au wakati mwingine moshi, vumbi, au uchafuzi — wakati dalili huzidi zaidi ya kiwango cha kawaida cha kila siku cha mgonjwa: kushindwa kupumua zaidi, kikohozi zaidi, makohozi zaidi, au makohozi kubadilisha rangi (kutoka safi hadi njano au kijani), na wakati mwingine homa. Mlipuko unaweza kudumu siku hadi wiki. Mingi husimamiwa nyumbani au kama wagonjwa wa nje na bronchodilator zilizoongezwa, kozi fupi ya prednisolone ya kumeza (kawaida 30–40 mg kila siku kwa siku 5), na antibiotic tu ikiwa kuna ishara za maambukizi ya bakteria (makohozi ya usaha, homa, alama za uvimbe zilizoinuliwa) — antibiotic sio za moja kwa moja. Milipuko mikali inahitaji kulazwa, oksijeni iliyorekebishwa, wakati mwingine non-invasive ventilation (NIV/BiPAP), na umakini mkubwa zaidi kwa viwango vya CO2. Kila mlipuko mkali hufanya ugonjwa wa muda mrefu kuwa mbaya zaidi — kuwazuia ni mojawapo ya malengo makuu ya huduma ya COPD.',
        sw_mtaa: 'Exacerbation (au "flare-up") ya COPD ni period — kawaida inatriggwa na viral au bacterial chest infection, au wakati mwingine smoke, dust, au pollution — wakati symptoms zinazidi beyond usual daily level ya patient: more breathlessness, more cough, more sputum, au sputum kubadilisha colour (kutoka clear hadi yellow au green), na wakati mwingine fever. Exacerbation inaweza kudumu siku hadi wiki. Most zinamanaged nyumbani au as outpatient na stepped-up bronchodilators, short course ya oral prednisolone (kawaida 30–40 mg daily kwa siku 5), na antibiotics tu ikiwa kuna signs za bacterial infection (purulent sputum, fever, raised inflammatory markers) — antibiotics sio automatic. Severe exacerbations zinahitaji admission, controlled oxygen, wakati mwingine non-invasive ventilation (NIV/BiPAP), na closer eye on CO2 levels. Kila severe exacerbation inafanya long-term disease iwe worse — kuziprevent ni mojawapo ya main goals ya COPD care.',
      },
    },
    // ── Smoking cessation ────────────────────────────────────────────
    {
      q: { en: 'If I stop smoking now, can my lungs heal?', sw: 'Nikiacha kuvuta sigara sasa, mapafu yangu yanaweza kupona?' },
      a: {
        en: 'Stopping smoking — at any age and any stage of COPD — is the single most important treatment, more powerful than any inhaler. The damage already done cannot be reversed: the lung tissue that has been destroyed does not grow back. But what stopping does is slow the future rate of decline back down to that of a non-smoker — so a 55-year-old who stops today will still lose lung function with age, but at the same speed as her neighbour who never smoked, not at the accelerated rate of someone who keeps smoking. People often think "the damage is done, why bother stopping now" — that is the wrong way round. Stopping protects whatever lung function you still have, which is the only lung function you will ever have. The same logic applies to biomass smoke: moving cooking outdoors or to a clean cookstove slows the next decade of decline.',
        sw: 'Kuacha kuvuta sigara — katika umri wowote na hatua yoyote ya COPD — ni matibabu muhimu zaidi peke yake, yenye nguvu zaidi kuliko inhaler yoyote. Uharibifu uliofanyika tayari hauwezi kurekebishwa: tishu ya mapafu iliyoharibiwa haikui tena. Lakini kile kuacha kunafanya ni kupunguza kasi ya kushuka kwa siku zijazo hadi kufikia ya mtu asiyevuta sigara — kwa hiyo mtu wa miaka 55 anayeacha leo bado atapoteza utendaji wa mapafu kwa umri, lakini kwa kasi ile ile na jirani yake ambaye hajawahi kuvuta sigara, sio kwa kasi iliyoongezwa ya mtu anayeendelea kuvuta. Watu mara nyingi hufikiri "uharibifu umeshafanyika, kwa nini niache sasa" — hiyo ni njia mbaya ya kufikiria. Kuacha hulinda utendaji wowote wa mapafu ambao bado unayo, ambao ni utendaji pekee wa mapafu utakaowahi kuwa nao. Mantiki ile ile inatumika kwa moshi wa kuni: kuhamisha upishi nje au kwa jiko safi hupunguza kasi ya muongo unaofuata wa kushuka.',
        sw_mtaa: 'Kuacha kuvuta sigara — katika age yoyote na stage yoyote ya COPD — ni single most important treatment, yenye nguvu zaidi kuliko inhaler yoyote. Damage iliyofanyika tayari haiwezi ku-reversed: lung tissue iliyoharibiwa haiukui back. Lakini kile kuacha kinafanya ni kuslow future rate ya decline back down hadi ya non-smoker — kwa hiyo 55-year-old anayeacha leo bado atapoteza lung function kwa age, lakini kwa same speed na jirani yake ambaye hajawahi kuvuta, sio kwa accelerated rate ya mtu anayeendelea kuvuta. Watu mara nyingi wanafikiri "damage imefanyika, kwa nini niache sasa" — hiyo ni wrong way round. Kuacha kunaprotect whatever lung function bado unayo, ambayo ni only lung function utakayowahi kuwa nayo. Same logic inatumika kwa biomass smoke: kumove cooking outdoors au kwa clean cookstove kunaslow next decade ya decline.',
      },
    },
    // ── Vaccinations ─────────────────────────────────────────────────
    {
      q: { en: 'Do I need vaccinations if I have COPD?', sw: 'Nahitaji chanjo ikiwa nina COPD?' },
      a: {
        en: 'Yes — vaccination is one of the highest-value interventions in COPD because every chest infection can trigger an exacerbation, and every severe exacerbation accelerates the disease. Annual influenza vaccination is recommended for every patient with COPD. Pneumococcal vaccination (PCV13 followed by PPSV23, or PPSV23 alone depending on local protocol) protects against the most common bacterial cause of pneumonia. COVID-19 vaccination remains relevant. Patients with COPD plus HIV, plus diabetes, or over 65 should be at the top of the priority list. The vaccines do not stop all chest infections, but they reduce the frequency and severity of the ones that matter most.',
        sw: 'Ndio — chanjo ni mojawapo ya hatua zenye thamani ya juu katika COPD kwa sababu kila maambukizi ya kifua yanaweza kusababisha mlipuko, na kila mlipuko mkali huharakisha ugonjwa. Chanjo ya kila mwaka ya influenza inashauriwa kwa kila mgonjwa wa COPD. Chanjo ya pneumococcal (PCV13 ikifuatiwa na PPSV23, au PPSV23 peke yake kulingana na itifaki ya ndani) hulinda dhidi ya sababu ya kawaida ya bakteria ya nimonia. Chanjo ya COVID-19 bado inafaa. Wagonjwa wa COPD pamoja na VVU, pamoja na kisukari, au zaidi ya miaka 65 wanapaswa kuwa juu ya orodha ya kipaumbele. Chanjo hazizuiwi maambukizi yote ya kifua, lakini hupunguza marudio na ukali wa zile zinazojali zaidi.',
        sw_mtaa: 'Ndio — vaccination ni mojawapo ya highest-value interventions katika COPD kwa sababu kila chest infection inaweza kutrigger exacerbation, na kila severe exacerbation inaccelerate disease. Annual influenza vaccination inashauriwa kwa kila patient wa COPD. Pneumococcal vaccination (PCV13 ikifuatiwa na PPSV23, au PPSV23 peke yake depending on local protocol) inalinda dhidi ya most common bacterial cause ya pneumonia. COVID-19 vaccination bado inafaa. Wagonjwa wa COPD plus HIV, plus diabetes, au zaidi ya miaka 65 wanapaswa kuwa juu ya priority list. Vaccines hazizuiwi all chest infections, lakini zinapunguza frequency na severity ya zile zinazomatter most.',
      },
    },
    // ── Pulmonary rehab ──────────────────────────────────────────────
    {
      q: { en: 'What is pulmonary rehabilitation?', sw: 'Ukarabati wa mapafu ni nini?' },
      a: {
        en: 'Pulmonary rehabilitation is a structured programme of supervised exercise, breathing techniques, education, and nutrition advice for patients with chronic lung disease. It is one of the single most effective non-drug treatments in COPD — patients who complete a programme breathe better, walk further, get fewer exacerbations, and feel less afraid of breathlessness. The exercise component is the heart of it: gradually building lower-limb and upper-body strength so the patient can do daily activities without becoming exhausted. The breathing-technique component — pursed-lip breathing, diaphragmatic breathing, controlled coughing — teaches the patient how to manage breathlessness during activity. Programmes typically run 6–8 weeks, twice weekly. Where formal programmes are not available, a clinician can teach the core exercises and breathing techniques and a family member can supervise.',
        sw: 'Ukarabati wa mapafu ni programu iliyopangwa ya mazoezi yanayosimamiwa, mbinu za kupumua, elimu, na ushauri wa lishe kwa wagonjwa wenye ugonjwa sugu wa mapafu. Ni mojawapo ya matibabu yenye matokeo zaidi yasiyo ya dawa katika COPD — wagonjwa wanaomaliza programu hupumua vyema zaidi, hutembea mbali zaidi, hupata milipuko michache zaidi, na huhisi hofu kidogo ya kushindwa kupumua. Kipengele cha mazoezi ndio moyo wake: hatua kwa hatua kujenga nguvu ya viungo vya chini na vya juu vya mwili ili mgonjwa aweze kufanya shughuli za kila siku bila kuchoka. Kipengele cha mbinu za kupumua — kupumua kupitia midomo iliyofungwa, kupumua kwa kiwambo cha tumbo, kikohozi kilichodhibitiwa — humfundisha mgonjwa jinsi ya kusimamia kushindwa kupumua wakati wa shughuli. Programu kawaida huchukua wiki 6–8, mara mbili kwa wiki. Ambapo programu rasmi hazipatikani, daktari anaweza kufundisha mazoezi ya msingi na mbinu za kupumua na mtu wa familia anaweza kusimamia.',
        sw_mtaa: 'Pulmonary rehabilitation ni structured programme ya supervised exercise, breathing techniques, education, na nutrition advice kwa wagonjwa wenye chronic lung disease. Ni mojawapo ya single most effective non-drug treatments katika COPD — wagonjwa wanaocomplete programme wanapumua better, wanatembea further, wanapata fewer exacerbations, na wanafeel less afraid wa breathlessness. Exercise component ndio heart yake: gradually building lower-limb na upper-body strength ili patient aweze kudo daily activities bila kuchoka. Breathing-technique component — pursed-lip breathing, diaphragmatic breathing, controlled coughing — inamfundisha patient jinsi ya kumanage breathlessness wakati wa activity. Programmes kawaida zinarun wiki 6–8, twice weekly. Ambapo formal programmes hazipatikani, clinician anaweza kufundisha core exercises na breathing techniques na family member anaweza kusupervise.',
      },
    },
    // ── End-of-life / advanced disease ────────────────────────────────
    {
      q: { en: 'Is COPD a death sentence?', sw: 'COPD ni hukumu ya kifo?' },
      a: {
        en: 'No — COPD is a long, chronic illness, and most people live for many years after the diagnosis. Even in advanced disease the focus of care is keeping breathing as good as possible, treating exacerbations early, and protecting against infections. That said, COPD is a serious progressive disease and in its later stages it can be life-limiting. What we do not do is wait until breath has run out to talk about it. Advanced-disease conversations — what kind of care the patient wants, who can speak for them if they become too unwell to speak, whether they want resuscitation, what role family and faith will play — are best had while the patient can still participate. These are not "giving up" conversations; they are honest planning, and they protect both the patient and the family from decisions made in panic. The technical word for this is advance care planning, and it is part of good COPD care.',
        sw: 'Hapana — COPD ni ugonjwa mrefu, sugu, na watu wengi huishi kwa miaka mingi baada ya utambuzi. Hata katika ugonjwa wa hali ya juu lengo la huduma ni kuweka kupumua kuwa kwema kadiri inavyowezekana, kutibu milipuko mapema, na kulinda dhidi ya maambukizi. Hata hivyo, COPD ni ugonjwa mzito unaoendelea na katika hatua zake za baadaye unaweza kupunguza maisha. Kile tusichofanya ni kusubiri hadi pumzi imeisha kuzungumza juu yake. Mazungumzo ya ugonjwa wa hali ya juu — aina gani ya huduma mgonjwa anataka, ni nani anaweza kuzungumza kwa niaba yake ikiwa atakuwa mgonjwa sana hawezi kuzungumza, kama anataka ufufuo, jukumu gani familia na imani vitaocheza — ni bora kufanywa wakati mgonjwa bado anaweza kushiriki. Haya sio mazungumzo ya "kukata tamaa"; ni mipango ya ukweli, na hulinda mgonjwa na familia kutokana na maamuzi yanayofanywa katika hofu. Neno la kiufundi la hii ni mipango ya huduma ya mapema, na ni sehemu ya huduma nzuri ya COPD.',
        sw_mtaa: 'Hapana — COPD ni long, chronic illness, na watu wengi wanaishi kwa miaka mingi baada ya diagnosis. Hata katika advanced disease focus ya care ni kuweka breathing kuwa kwema as much as possible, kutibu exacerbations mapema, na kulinda dhidi ya infections. Hata hivyo, COPD ni serious progressive disease na katika later stages inaweza kuwa life-limiting. Kile tusichofanya ni kusubiri hadi breath imerun out kuzungumza juu yake. Advanced-disease conversations — aina gani ya care patient anataka, ni nani anaweza speak for them ikiwa atakuwa too unwell kusema, kama wanataka resuscitation, jukumu gani family na faith vitaplay — ni bora kufanywa wakati patient bado anaweza kushiriki. Haya sio "giving up" conversations; ni honest planning, na inalinda patient na family kutokana na decisions zinazofanywa katika panic. Technical word ya hii ni advance care planning, na ni sehemu ya good COPD care.',
      },
    },
    // ── How is it diagnosed ──────────────────────────────────────────
    {
      q: { en: 'How is COPD diagnosed?', sw: 'COPD inatambuliwaje?' },
      a: {
        en: 'COPD is diagnosed by combining the right history (chronic cough, breathlessness, sputum, with smoke exposure — tobacco, biomass, or post-TB), the right examination (long expiration, wheeze, hyperinflated chest, sometimes a barrel chest in advanced disease), and the right test: spirometry. The defining number is a post-bronchodilator FEV1/FVC ratio < 0.7, meaning the patient cannot blow out as fast as expected even after a salbutamol inhaler. Spirometry is essential — without it, "COPD" is a guess. In Tanzania spirometry is more accessible in district and referral hospitals than at health-centre level, so referral for spirometry is part of good practice. Chest X-ray rules out other causes (TB, lung cancer, heart failure). HIV testing should be offered. Pulse oximetry gives a quick severity check at the bedside.',
        sw: 'COPD hutambuliwa kwa kuchanganya historia sahihi (kikohozi sugu, kushindwa kupumua, makohozi, na kufunua na moshi — tumbaku, nishati ya kuni, au baada ya TB), uchunguzi sahihi (kuvuta nje kwa muda mrefu, miluzi, kifua kilichoinuliwa kupita kiasi, wakati mwingine kifua cha tarumbeta katika ugonjwa wa hali ya juu), na kipimo sahihi: spirometry. Namba inayofafanua ni baada ya bronchodilator FEV1/FVC ratio < 0.7, ikimaanisha mgonjwa hawezi kupuliza nje haraka kama ilivyotarajiwa hata baada ya inhaler ya salbutamol. Spirometry ni muhimu — bila hiyo, "COPD" ni kisio. Tanzania spirometry inapatikana zaidi katika hospitali za wilaya na za rufaa kuliko katika ngazi ya kituo cha afya, kwa hiyo rufaa kwa spirometry ni sehemu ya mazoezi mazuri. X-ray ya kifua huondoa sababu nyingine (TB, saratani ya mapafu, kushindwa kwa moyo). Upimaji wa VVU unapaswa kutolewa. Pulse oximetry hutoa ukaguzi wa haraka wa ukali kitandani.',
        sw_mtaa: 'COPD inadiagnosed kwa kuchanganya right history (chronic cough, breathlessness, sputum, na smoke exposure — tobacco, biomass, au post-TB), right examination (long expiration, wheeze, hyperinflated chest, wakati mwingine barrel chest katika advanced disease), na right test: spirometry. Defining number ni post-bronchodilator FEV1/FVC ratio < 0.7, ikimaanisha patient hawezi kublow out as fast as expected hata baada ya salbutamol inhaler. Spirometry ni essential — bila hiyo, "COPD" ni guess. Tanzania spirometry inaaccessible zaidi katika district na referral hospitals kuliko katika health-centre level, kwa hiyo referral kwa spirometry ni sehemu ya good practice. Chest X-ray inarule out other causes (TB, lung cancer, heart failure). HIV testing inapaswa kutolewa. Pulse oximetry inatoa quick severity check at bedside.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Stop smoking — and stay stopped. This is more powerful than any inhaler. If you cook over firewood or charcoal, move the cooking outdoors or to a cleaner stove (LPG, biogas, or an improved cookstove with a chimney).',
      sw: 'Acha kuvuta sigara — na endelea kuwa umeacha. Hii ina nguvu zaidi kuliko inhaler yoyote. Ikiwa unapika kwa kuni au mkaa, hamishia upishi nje au kwa jiko safi zaidi (LPG, biogas, au jiko bora la kupika lenye chimney).',
      sw_mtaa: 'Acha kuvuta sigara — na endelea kubaki umeacha. Hii ina nguvu zaidi kuliko inhaler yoyote. Ikiwa unapika over firewood au charcoal, hamishia cooking outdoors au kwa cleaner stove (LPG, biogas, au improved cookstove na chimney).',
    },
    {
      en: 'Use your inhalers exactly as prescribed, every day, even when you feel well. The long-acting inhaler (LABA / LAMA / combination) keeps airways open day after day; missing doses lets symptoms creep back. Always use a spacer with a metered-dose inhaler — it doubles or triples the amount of medicine that reaches the lungs.',
      sw: 'Tumia inhaler zako kama ilivyoagizwa hasa, kila siku, hata unapojihisi vizuri. Inhaler ya muda mrefu (LABA / LAMA / mchanganyiko) huweka mirija ya hewa wazi siku baada ya siku; kukosa dose huruhusu dalili kurudi nyuma. Daima tumia spacer na metered-dose inhaler — huongeza maradufu au mara tatu kiasi cha dawa kinachofika mapafuni.',
      sw_mtaa: 'Tumia inhalers zako exactly kama ilivyoprescribed, kila siku, hata unapojihisi vizuri. Long-acting inhaler (LABA / LAMA / combination) inaweka airways open day after day; kukosa doses kunaruhusu symptoms kurudi back. Always tumia spacer na metered-dose inhaler — inadouble au triple kiasi cha dawa inayofika lungs.',
    },
    {
      en: 'Get the seasonal influenza vaccine every year, and ask about pneumococcal vaccination. Every chest infection can trigger an exacerbation.',
      sw: 'Pata chanjo ya influenza ya msimu kila mwaka, na uulize juu ya chanjo ya pneumococcal. Kila maambukizi ya kifua yanaweza kusababisha mlipuko.',
      sw_mtaa: 'Pata seasonal influenza vaccine kila mwaka, na uulize about pneumococcal vaccination. Kila chest infection inaweza kutrigger exacerbation.',
    },
    {
      en: 'Stay active. Even short, slow daily walks help — deconditioning makes breathlessness worse, not better. Pulmonary rehabilitation, where available, is one of the highest-value treatments in COPD.',
      sw: 'Endelea kuwa hai. Hata matembezi mafupi, ya polepole ya kila siku husaidia — deconditioning hufanya kushindwa kupumua kuwa mbaya zaidi, sio bora zaidi. Ukarabati wa mapafu, pale unapopatikana, ni mojawapo ya matibabu yenye thamani ya juu zaidi katika COPD.',
      sw_mtaa: 'Endelea kuwa active. Hata short, slow daily walks zinasaidia — deconditioning inafanya breathlessness kuwa worse, sio better. Pulmonary rehabilitation, pale inapopatikana, ni mojawapo ya highest-value treatments katika COPD.',
    },
    {
      en: 'Eat well. Many people with advanced COPD lose weight without trying because the work of breathing burns more calories than usual. Small, frequent, energy-dense meals are easier than three large ones.',
      sw: 'Kula vyema. Watu wengi wenye COPD ya hali ya juu hupoteza uzito bila kujaribu kwa sababu kazi ya kupumua huchoma kalori zaidi kuliko kawaida. Milo midogo, ya mara kwa mara, yenye nguvu nyingi ni rahisi zaidi kuliko mitatu mikubwa.',
      sw_mtaa: 'Kula well. Watu wengi wenye advanced COPD wanapoteza uzito bila kutrying kwa sababu kazi ya kupumua inachoma calories zaidi kuliko kawaida. Small, frequent, energy-dense meals ni rahisi zaidi kuliko three large ones.',
    },
    {
      en: 'Learn pursed-lip breathing: breathe in through the nose for two counts, then breathe out gently through pursed lips (as if blowing out a candle slowly) for four counts. This is the fastest way to settle sudden breathlessness without an inhaler.',
      sw: 'Jifunze kupumua kupitia midomo iliyofungwa: vuta hewa kupitia pua kwa hesabu mbili, kisha pumua nje kwa upole kupitia midomo iliyofungwa (kama unaenda kuzima mshumaa polepole) kwa hesabu nne. Hii ni njia ya haraka zaidi ya kutuliza kushindwa kupumua kwa ghafla bila inhaler.',
      sw_mtaa: 'Jifunze pursed-lip breathing: vuta hewa through nose kwa counts mbili, kisha pumua out gently through pursed lips (kama unablow out candle slowly) kwa counts nne. Hii ni fastest way ya kusettle sudden breathlessness bila inhaler.',
    },
    {
      en: 'Know your action plan. Write down, with your clinician, what to do when symptoms get worse — when to step up bronchodilators, when to start the oral steroid course you have at home, when antibiotics may be appropriate, and when to come in immediately.',
      sw: 'Jua mpango wako wa hatua. Andika, na daktari wako, nini cha kufanya wakati dalili zinapozidi kuwa mbaya — wakati wa kuongeza bronchodilator, wakati wa kuanza kozi ya steroid ya kumeza uliyo nayo nyumbani, wakati antibiotic zinaweza kufaa, na wakati wa kuja moja kwa moja.',
      sw_mtaa: 'Jua action plan yako. Andika, na clinician wako, nini cha kufanya wakati symptoms zinapozidi kuwa worse — wakati wa kustep up bronchodilators, wakati wa kuanza oral steroid course unayo nyumbani, wakati antibiotics zinaweza kuappropriate, na wakati wa kuja immediately.',
    },
    {
      en: 'Treat anxiety and depression — they are very common in COPD and worsen breathlessness. Talking to someone, joining a patient group, or asking a clinician about treatment is not a luxury; it is part of standard care.',
      sw: 'Tibu wasiwasi na unyong\'onyevu — ni vya kawaida sana katika COPD na huzidisha kushindwa kupumua. Kuongea na mtu, kujiunga na kikundi cha wagonjwa, au kuuliza daktari juu ya matibabu sio anasa; ni sehemu ya huduma ya kawaida.',
      sw_mtaa: 'Tibu anxiety na depression — ni very common katika COPD na zinazidisha breathlessness. Kuongea na mtu, kujoin patient group, au kuuliza clinician about treatment sio luxury; ni sehemu ya standard care.',
    },
    {
      en: 'Watch sputum colour. Clear or white sputum is the baseline. A change to yellow, green, or thicker sputum often signals an infection beginning — this is the moment to start your action plan or call your clinician, not three days later.',
      sw: 'Angalia rangi ya makohozi. Makohozi safi au meupe ni baseline. Mabadiliko hadi njano, kijani, au makohozi mazito mara nyingi yanaashiria maambukizi yanaanza — huu ni wakati wa kuanza mpango wako wa hatua au kupiga simu kwa daktari wako, sio siku tatu baadaye.',
      sw_mtaa: 'Angalia sputum colour. Clear au white sputum ni baseline. Change kwenda yellow, green, au thicker sputum mara nyingi ni signal ya infection inayoanza — huu ni moment ya kuanza action plan yako au kucall clinician wako, sio days three baadaye.',
    },
    {
      en: 'Keep a small home pulse oximeter if you can. Knowing your usual baseline SpO2 (which in advanced COPD may be 88–92%, not 95+) means you can tell when a reading is a flare versus normal for you.',
      sw: 'Weka pulse oximeter ndogo ya nyumbani ikiwezekana. Kujua baseline yako ya kawaida ya SpO2 (ambayo katika COPD ya hali ya juu inaweza kuwa 88–92%, sio 95+) inamaanisha unaweza kusema wakati kipimo ni mlipuko dhidi ya kawaida kwako.',
      sw_mtaa: 'Weka small home pulse oximeter ikiwezekana. Kujua usual baseline yako ya SpO2 (ambayo katika advanced COPD inaweza kuwa 88–92%, sio 95+) inamaanisha unaweza kutell wakati reading ni flare versus normal kwako.',
    },
  ],

  warningTriggers: [
    {
      en: 'Tobacco smoking — current or past — is the leading cause of COPD worldwide and a major cause in Tanzania.',
      sw: 'Kuvuta tumbaku — kwa sasa au zamani — ni sababu kuu ya COPD duniani na sababu kubwa Tanzania.',
      sw_mtaa: 'Tobacco smoking — current au past — ni leading cause ya COPD worldwide na major cause Tanzania.',
    },
    {
      en: 'Indoor biomass smoke from cooking over firewood or charcoal — the leading cause of COPD in Tanzanian women, often after decades of daily exposure.',
      sw: 'Moshi wa nishati ya kuni ndani ya nyumba kutoka kupika juu ya kuni au mkaa — sababu kuu ya COPD kwa wanawake wa Kitanzania, mara nyingi baada ya miongo ya mfiduo wa kila siku.',
      sw_mtaa: 'Indoor biomass smoke kutoka kupika over firewood au charcoal — leading cause ya COPD kwa Tanzanian women, mara nyingi baada ya decades ya daily exposure.',
    },
    {
      en: 'Previous tuberculosis — even successfully treated TB can leave behind structural lung damage that behaves like COPD (post-TB obstructive lung disease).',
      sw: 'Kifua kikuu cha awali — hata TB iliyotibiwa kwa mafanikio inaweza kuacha uharibifu wa muundo wa mapafu unaotenda kama COPD (ugonjwa wa mapafu wa kuziba baada ya TB).',
      sw_mtaa: 'Previous TB — hata successfully treated TB inaweza kuacha structural lung damage inayotenda kama COPD (post-TB obstructive lung disease).',
    },
    {
      en: 'Occupational dust exposure — mining, construction, cement, cotton, and grain dust over years all contribute.',
      sw: 'Mfiduo wa vumbi la kazi — uchimbaji wa madini, ujenzi, saruji, pamba, na vumbi la nafaka kwa miaka yote huchangia.',
      sw_mtaa: 'Occupational dust exposure — mining, construction, cement, cotton, na grain dust over years zote zinachangia.',
    },
    {
      en: 'Outdoor air pollution — high traffic exhaust, industrial emissions, and burning of crop residues contribute, especially in urban centres.',
      sw: 'Uchafuzi wa hewa wa nje — moshi wa magari mengi, utoaji wa viwanda, na kuchoma masalia ya mazao huchangia, hasa katika vituo vya mijini.',
      sw_mtaa: 'Outdoor air pollution — high traffic exhaust, industrial emissions, na kuchoma crop residues zinachangia, hasa katika urban centres.',
    },
    {
      en: 'Childhood respiratory infections — severe lung infections in early childhood can leave damage that emerges as COPD in adulthood, particularly when combined with smoke exposure later in life.',
      sw: 'Maambukizi ya kupumua ya utotoni — maambukizi makali ya mapafu katika utoto wa mapema yanaweza kuacha uharibifu unaojitokeza kama COPD katika utu uzima, hasa yakichanganywa na mfiduo wa moshi baadaye maishani.',
      sw_mtaa: 'Childhood respiratory infections — severe lung infections katika early childhood zinaweza kuacha damage inayoemerge kama COPD katika adulthood, particularly when combined na smoke exposure baadaye maishani.',
    },
    {
      en: 'Alpha-1 antitrypsin deficiency — a rare genetic cause; consider in young (< 45 years) patients with COPD especially if there is family history.',
      sw: 'Upungufu wa Alpha-1 antitrypsin — sababu nadra ya kijenetiki; fikiria kwa wagonjwa wadogo (< miaka 45) wenye COPD hasa ikiwa kuna historia ya familia.',
      sw_mtaa: 'Alpha-1 antitrypsin deficiency — rare genetic cause; consider kwa wagonjwa wadogo (< miaka 45) wenye COPD especially ikiwa kuna family history.',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Severe breathlessness at rest, unable to speak in full sentences, or breathing harder than during any previous flare',
        sw: 'Kushindwa kupumua kwa kasi wakati wa kupumzika, kushindwa kuzungumza katika sentensi kamili, au kupumua kwa nguvu zaidi kuliko wakati wa mlipuko wowote uliopita',
        sw_mtaa: 'Severe breathlessness at rest, kushindwa kuzungumza katika full sentences, au kupumua harder kuliko wakati wa flare yoyote iliyopita',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'Blue lips or fingertips (cyanosis), drowsiness, confusion, or feeling unusually sleepy — signs of low oxygen and/or CO2 retention',
        sw: 'Midomo au ncha za vidole vyenye rangi ya bluu (cyanosis), usingizi, mkanganyiko, au kujihisi una usingizi kuliko kawaida — ishara za oksijeni ya chini na/au mkusanyiko wa CO2',
        sw_mtaa: 'Blue lips au fingertips (cyanosis), drowsiness, confusion, au kujihisi una usingizi kuliko kawaida — signs za low oxygen na/au CO2 retention',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'New chest pain, especially sudden sharp pain on one side — possible pneumothorax (collapsed lung), more common in advanced COPD',
        sw: 'Maumivu mapya ya kifua, hasa maumivu ya ghafla makali upande mmoja — uwezekano wa pneumothorax (mapafu yaliyoanguka), ni ya kawaida zaidi katika COPD ya hali ya juu',
        sw_mtaa: 'New chest pain, hasa sudden sharp pain on one side — possible pneumothorax (collapsed lung), more common katika advanced COPD',
      },
      urgency: 'emergency',
    },
    {
      sign: {
        en: 'Ankle swelling appearing or worsening — possible cor pulmonale (right heart strain from chronic lung disease)',
        sw: 'Uvimbe wa vifundoni unajitokeza au unazidi kuwa mbaya — uwezekano wa cor pulmonale (mfadhaiko wa moyo wa kulia kutoka ugonjwa sugu wa mapafu)',
        sw_mtaa: 'Ankle swelling inajitokeza au inazidi kuwa mbaya — possible cor pulmonale (right heart strain kutoka chronic lung disease)',
      },
      urgency: 'urgent',
    },
    {
      sign: {
        en: 'Coughing up blood (haemoptysis) — needs urgent assessment; in Tanzania always exclude active TB and lung cancer',
        sw: 'Kukohoa damu (haemoptysis) — inahitaji tathmini ya haraka; Tanzania daima toa TB hai na saratani ya mapafu',
        sw_mtaa: 'Coughing up damu (haemoptysis) — inahitaji urgent assessment; Tanzania always exclude active TB na lung cancer',
      },
      urgency: 'urgent',
    },
    {
      sign: {
        en: 'Increased breathlessness, increased sputum, or sputum changing colour for more than 24 hours — start your action plan; same-day clinical review if not improving',
        sw: 'Kushindwa kupumua kuongezeka, makohozi kuongezeka, au makohozi kubadilisha rangi kwa zaidi ya masaa 24 — anza mpango wako wa hatua; mapitio ya kliniki ya siku ile ile ikiwa haiboresheki',
        sw_mtaa: 'Increased breathlessness, increased sputum, au sputum kubadilisha colour kwa zaidi ya masaa 24 — anza action plan yako; same-day clinical review ikiwa haiboresheki',
      },
      urgency: 'urgent',
    },
    {
      sign: {
        en: 'Persistent fever, weight loss, night sweats, or coughing up sputum streaked with blood — always rule out TB, especially in Tanzania',
        sw: 'Homa ya kudumu, kupungua uzito, jasho la usiku, au kukohoa makohozi yenye damu — daima toa TB, hasa Tanzania',
        sw_mtaa: 'Persistent homa, kupungua uzito, jasho la usiku, au kukohoa sputum yenye damu — always rule out TB, especially Tanzania',
      },
      urgency: 'urgent',
    },
  ],

  comorbidityNotes: [
    {
      coCondition: 'heart_failure',
      note: {
        en: 'COPD and heart failure overlap in symptoms (breathlessness, fatigue, leg swelling, exercise intolerance) and in risk factors (smoking, age), and very commonly co-exist. Distinguishing the dominant contributor and treating both matters: under-treating heart failure leaves the patient with avoidable fluid overload; under-treating COPD leaves them with avoidable bronchospasm. Cardio-selective beta-blockers (e.g. bisoprolol) are safe and often beneficial even in COPD; the old teaching that "no beta-blocker in COPD" is outdated. BNP, echocardiogram, and ECG help separate the two. Treat both.',
        sw: 'COPD na kushindwa kwa moyo huingiliana katika dalili (kushindwa kupumua, uchovu, uvimbe wa miguu, kushindwa mazoezi) na katika sababu za hatari (kuvuta sigara, umri), na ni kawaida sana kuko pamoja. Kutofautisha mchangiaji mkuu na kutibu vyote ni muhimu: kutotibu kushindwa kwa moyo huacha mgonjwa na ujazo wa maji unaozuilika; kutotibu COPD huacha na bronchospasm inayozuilika. Beta-blocker zinazochagua moyo (mfano bisoprolol) ni salama na mara nyingi ni za manufaa hata katika COPD; fundisho la zamani la "hakuna beta-blocker katika COPD" limepitwa na wakati. BNP, echocardiogram, na ECG husaidia kutenganisha vyote. Tibu vyote.',
        sw_mtaa: 'COPD na heart failure zinaoverlap katika symptoms (breathlessness, fatigue, leg swelling, exercise intolerance) na katika risk factors (smoking, age), na very commonly zinacoexist. Kudistinguish dominant contributor na kutibu both ni muhimu: under-treating heart failure inaacha patient na avoidable fluid overload; under-treating COPD inaacha na avoidable bronchospasm. Cardio-selective beta-blockers (mfano bisoprolol) ni safe na mara nyingi ni beneficial hata katika COPD; old teaching ya "no beta-blocker katika COPD" imeoutdated. BNP, echocardiogram, na ECG zinasaidia kuseparate two. Tibu both.',
      },
    },
    {
      coCondition: 'hiv',
      note: {
        en: 'People with HIV have a higher risk of COPD at younger ages, faster decline, and worse outcomes — even when virologically suppressed on ART. Smoking is the dominant additional risk factor; smoking cessation is even higher priority in HIV. Recurrent pneumonia (bacterial and PCP) accelerates lung damage. Cross-reference the HIV block for ART, OI prophylaxis, and TB screening when working up an HIV patient with chronic cough or breathlessness.',
        sw: 'Watu wenye VVU wana hatari kubwa zaidi ya COPD katika umri mdogo, kushuka kwa kasi zaidi, na matokeo mabaya zaidi — hata wanapodhibitiwa kwa viral load kwenye ART. Kuvuta sigara ndio sababu kuu ya hatari ya nyongeza; kuacha kuvuta sigara ni kipaumbele cha juu zaidi katika VVU. Nimonia ya mara kwa mara (ya bakteria na PCP) huongeza kasi ya uharibifu wa mapafu. Rejea block ya VVU kwa ART, prophylaxis ya OI, na uchunguzi wa TB unapomshughulikia mgonjwa wa VVU na kikohozi sugu au kushindwa kupumua.',
        sw_mtaa: 'Watu wenye HIV wana higher risk ya COPD katika younger ages, faster decline, na worse outcomes — hata wanapokuwa virologically suppressed on ART. Smoking ni dominant additional risk factor; smoking cessation ni even higher priority katika HIV. Recurrent pneumonia (bacterial na PCP) inaaccelerate lung damage. Cross-reference HIV block kwa ART, OI prophylaxis, na TB screening unapowork up HIV patient na chronic cough au breathlessness.',
      },
    },
    {
      coCondition: 'tb',
      note: {
        en: 'Active TB must be excluded in any new cough or breathlessness in a Tanzanian adult — even a patient with established COPD. Post-TB lung disease (PTLD) is a distinct entity: structural and obstructive damage after a treated TB episode that behaves like COPD. PTLD is one of the major causes of chronic respiratory disability in Tanzania and is under-recognised. Every patient with COPD-like symptoms should have a TB history taken, and any new productive cough lasting ≥ 2 weeks should be evaluated for TB recurrence before being attributed to a COPD exacerbation.',
        sw: 'TB hai lazima itolewe katika kikohozi kipya chochote au kushindwa kupumua kwa mtu mzima wa Kitanzania — hata mgonjwa mwenye COPD iliyothibitishwa. Ugonjwa wa mapafu baada ya TB (PTLD) ni hali tofauti: uharibifu wa muundo na wa kuziba baada ya kipindi cha TB kilichotibika ambao hutenda kama COPD. PTLD ni mojawapo ya sababu kuu za ulemavu wa kupumua sugu Tanzania na haijatambuliwa vyema. Kila mgonjwa mwenye dalili kama za COPD anapaswa kuchukuliwa historia ya TB, na kikohozi chochote kipya cha makohozi kinachodumu ≥ wiki 2 kinapaswa kuchunguzwa kwa kurudia kwa TB kabla ya kuhusishwa na mlipuko wa COPD.',
        sw_mtaa: 'Active TB lazima itolewe katika new cough yoyote au breathlessness kwa Tanzanian adult — hata patient mwenye established COPD. Post-TB lung disease (PTLD) ni distinct entity: structural na obstructive damage baada ya treated TB episode inayotenda kama COPD. PTLD ni mojawapo ya major causes ya chronic respiratory disability Tanzania na imeunder-recognised. Kila patient mwenye COPD-like symptoms anapaswa kuchukuliwa TB history, na new productive cough yoyote inayodumu ≥ wiki 2 inapaswa kuevaluated kwa TB recurrence kabla ya kuattributed kwa COPD exacerbation.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'COPD exacerbations are often treated with a short course of oral prednisolone, which raises blood glucose substantially — patients with diabetes need extra glucose monitoring during steroid courses, and insulin doses often need temporary upward adjustment. Conversely, hyperglycaemia worsens chest-infection outcomes, so good diabetes control reduces COPD exacerbation severity.',
        sw: 'Milipuko ya COPD mara nyingi hutibiwa kwa kozi fupi ya prednisolone ya kumeza, ambayo huongeza glukosi ya damu kwa kiasi kikubwa — wagonjwa wenye kisukari wanahitaji ufuatiliaji wa ziada wa glukosi wakati wa kozi za steroid, na dose za insulin mara nyingi zinahitaji marekebisho ya muda ya kupanda. Kinyume chake, hyperglycaemia huzidisha matokeo ya maambukizi ya kifua, kwa hiyo udhibiti mzuri wa kisukari hupunguza ukali wa mlipuko wa COPD.',
        sw_mtaa: 'COPD exacerbations mara nyingi zinatibiwa na short course ya oral prednisolone, ambayo inaraise blood glucose substantially — wagonjwa wenye diabetes wanahitaji extra glucose monitoring wakati wa steroid courses, na insulin doses mara nyingi zinahitaji temporary upward adjustment. Conversely, hyperglycaemia inaworsen chest-infection outcomes, kwa hiyo good diabetes control inareduce COPD exacerbation severity.',
      },
    },
    {
      coCondition: 'depression',
      note: {
        en: 'Anxiety and depression are very common in COPD and often under-recognised — they worsen breathlessness, reduce treatment adherence, and increase exacerbation risk. Screening (PHQ-9 / GAD-7 or equivalent in Swahili) is part of good COPD care. Treating depression — pharmacological, psychological, or both — measurably improves COPD outcomes. Patients often present anxiety as "nina hofu ya kupumua" rather than as "nina huzuni"; listen for both.',
        sw: 'Wasiwasi na unyong\'onyevu ni vya kawaida sana katika COPD na mara nyingi havijatambuliwa vyema — huzidisha kushindwa kupumua, hupunguza ufuasi wa matibabu, na huongeza hatari ya mlipuko. Uchunguzi (PHQ-9 / GAD-7 au sawa katika Kiswahili) ni sehemu ya huduma nzuri ya COPD. Kutibu unyong\'onyevu — kwa dawa, kisaikolojia, au vyote — huboresha matokeo ya COPD kwa namna inayopimika. Wagonjwa mara nyingi huwasilisha wasiwasi kama "nina hofu ya kupumua" badala ya "nina huzuni"; sikiliza vyote.',
        sw_mtaa: 'Anxiety na depression ni very common katika COPD na mara nyingi zime-under-recognised — zinaworsen breathlessness, zinareduce treatment adherence, na zinaongeza exacerbation risk. Screening (PHQ-9 / GAD-7 au equivalent katika Kiswahili) ni sehemu ya good COPD care. Kutreating depression — pharmacological, psychological, au both — inameasurably improve COPD outcomes. Wagonjwa mara nyingi wanapresent anxiety kama "nina hofu ya kupumua" badala ya kama "nina huzuni"; sikiliza both.',
      },
    },
    {
      coCondition: 'asthma',
      note: {
        en: 'Asthma-COPD overlap (ACO) is increasingly recognised — a patient with features of both diseases, typically someone with childhood or young-adult asthma who has gone on to a long smoking or biomass-exposure history. Treatment leans on inhaled corticosteroids (because of the asthma component) plus long-acting bronchodilators (because of the COPD component). Identifying ACO matters because pure-COPD treatment without inhaled steroid would under-treat the asthma component, and pure-asthma treatment without a LABA/LAMA may under-treat the COPD component.',
        sw: 'Mwingiliano wa pumu-COPD (ACO) unazidi kutambuliwa — mgonjwa mwenye sifa za magonjwa yote mawili, kawaida mtu mwenye pumu ya utotoni au ya mtu mzima mdogo aliyekuwa na historia ndefu ya kuvuta sigara au mfiduo wa nishati ya kuni. Matibabu hutegemea inhaled corticosteroid (kwa sababu ya kipengele cha pumu) pamoja na bronchodilator za muda mrefu (kwa sababu ya kipengele cha COPD). Kutambua ACO ni muhimu kwa sababu matibabu ya COPD safi bila steroid ya kupuliza yangepuuza kipengele cha pumu, na matibabu ya pumu safi bila LABA/LAMA yanaweza kupuuza kipengele cha COPD.',
        sw_mtaa: 'Asthma-COPD overlap (ACO) inazidi kurecognised — patient mwenye features za diseases zote mbili, typically mtu mwenye childhood au young-adult asthma aliyegone on kwa long smoking au biomass-exposure history. Treatment inalean on inhaled corticosteroids (kwa sababu ya asthma component) plus long-acting bronchodilators (kwa sababu ya COPD component). Identifying ACO ni muhimu kwa sababu pure-COPD treatment bila inhaled steroid ingeunder-treat asthma component, na pure-asthma treatment bila LABA/LAMA inaweza kuunder-treat COPD component.',
      },
    },
  ],

  variants: COPD_VARIANTS,

  sources: [
    src('GOLD_COPD_2025'),
    src('WHO_PEN_2020'),
    src('WHO_OXYGEN_2023'),
    src('WHO_AMR_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NTLP_TB_2024'),
    src('NACP_ART_2024'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
