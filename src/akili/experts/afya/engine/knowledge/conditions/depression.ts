/**
 * Depression — Phase 14 (Mental Health block)
 *
 * Sources: WHO mhGAP 2023, NTLG STG 2023, Muhimbili Protocols,
 *          WHO Maternal Mental Health, NACP ART 2024 (HIV-depression).
 *
 * Cross-referenced from HIV, maternal_care, COPD comorbidity notes.
 *
 * Tanzanian context:
 *   Depression and anxiety carry massive treatment gaps in Tanzania.
 *   Mental health is heavily stigmatised — people describe symptoms as
 *   "nina huzuni" or "moyo wangu hauko sawa" rather than "depression."
 *   The mhGAP intervention guide is the WHO framework most aligned with
 *   primary care in Tanzania, and Muhimbili's psychiatry department
 *   runs the country's largest training and referral programme.
 */

import { ConditionKnowledge } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const DEPRESSION: ConditionKnowledge = {
  id: 'depression',
  aliases: CONDITION_ALIASES.depression,
  category: 'mental_health',

  whatItIs: {
    en: 'Depression is a medical condition where low mood, loss of interest in things you used to enjoy, low energy, and changes in sleep, appetite, or concentration persist for at least two weeks and interfere with daily life. It is not weakness, lack of faith, or a moral failing. It is a real illness involving brain chemistry, life stressors, and sometimes physical illness or hormones. Depression is treatable — most people recover with the right combination of talking therapy, medication, social support, and time. In Tanzania, depression is common in people with chronic illness (HIV, diabetes, COPD, cancer), in mothers after childbirth, in adolescents, and in carers of people with serious illness. The first step is recognising it; the second is asking for help.',
    sw: 'Sonona (depression) ni hali ya kimatibabu ambapo hali ya chini ya akili, kupoteza hamu katika vitu ulivyokuwa unapenda, uchovu mwingi, na mabadiliko katika usingizi, hamu ya kula, au umakini hudumu kwa angalau wiki mbili na huingilia maisha ya kila siku. Sio udhaifu, ukosefu wa imani, au kushindwa kimaadili. Ni ugonjwa halisi unaohusisha kemia ya ubongo, mfadhaiko wa maisha, na wakati mwingine ugonjwa wa kimwili au homoni. Sonona inatibika — watu wengi hupona kwa mchanganyiko sahihi wa tiba ya mazungumzo, dawa, msaada wa kijamii, na muda. Tanzania, sonona ni ya kawaida kwa watu wenye magonjwa sugu (VVU, kisukari, COPD, saratani), kwa akina mama baada ya kujifungua, kwa vijana, na kwa walezi wa watu wenye ugonjwa mzito. Hatua ya kwanza ni kuitambua; ya pili ni kuomba msaada.',
    sw_mtaa: 'Depression ni medical condition ambapo low mood, kupoteza interest katika vitu ulivyokuwa unaenjoy, low energy, na changes katika sleep, appetite, au concentration zinapersist kwa angalau wiki mbili na zinainterfere na daily life. Sio udhaifu, lack of faith, au moral failing. Ni real illness inayohusisha brain chemistry, life stressors, na wakati mwingine physical illness au hormones. Depression inatibika — watu wengi wanapona na right combination ya talking therapy, medication, social support, na time. Tanzania, depression ni common kwa watu wenye chronic illness (HIV, diabetes, COPD, cancer), kwa mothers baada ya childbirth, kwa adolescents, na kwa carers wa watu wenye serious illness. First step ni kuitambua; second ni kuomba help.',
  },

  whyItMatters: {
    en: 'Untreated depression worsens every other illness — patients with HIV miss ART doses, patients with diabetes miss insulin, patients with hypertension don\'t take their pills, mothers struggle to bond with babies, students stop attending school, families fragment. Untreated depression also carries the risk of suicide, which is preventable when help is offered early. The Tanzanian framing is important: many people describe depression through the body ("kichwa kinaniuma," "kifua kinabana," "siwezi kulala") rather than the mind, and traditional and faith healers are often the first point of contact. None of that should stop someone getting medical care — the two can work together. Asking about mood, suicide thoughts, and ability to function is part of good primary care for everyone with a chronic illness, every postpartum mother, and every adolescent presenting with vague unexplained symptoms.',
    sw: 'Sonona isiyotibiwa huzidisha kila ugonjwa mwingine — wagonjwa wa VVU hukosa dose za ART, wagonjwa wa kisukari hukosa insulin, wagonjwa wa shinikizo la juu la damu hawakuchukui dawa zao, akina mama hupambana kuwa na uhusiano na watoto wachanga, wanafunzi huacha kuhudhuria shule, familia zinasambaratika. Sonona isiyotibiwa pia hubeba hatari ya kujiua, ambayo inazuilika msaada unapotolewa mapema. Muundo wa Kitanzania ni muhimu: watu wengi huelezea sonona kupitia mwili ("kichwa kinaniuma," "kifua kinabana," "siwezi kulala") badala ya akili, na waganga wa jadi na wa imani mara nyingi ni hatua ya kwanza ya mawasiliano. Hakuna chochote kati ya hivyo kinapaswa kumzuia mtu kupata huduma ya matibabu — hizi mbili zinaweza kufanya kazi pamoja. Kuuliza juu ya hali ya akili, mawazo ya kujiua, na uwezo wa kufanya kazi ni sehemu ya huduma nzuri ya msingi kwa kila mtu mwenye ugonjwa sugu, kila mama baada ya kuzaa, na kila kijana anayewasilisha na dalili zisizoeleweka zisizo wazi.',
    sw_mtaa: 'Untreated depression inaworsen kila illness nyingine — patients wa HIV wanakosa ART doses, patients wa diabetes wanakosa insulin, patients wa hypertension hawachukui pills zao, mothers wanastruggle kubond na babies, students wanaacha kuattend school, families zinafragment. Untreated depression pia inabeba risk ya suicide, ambayo inapreventable when help inaofferred early. Tanzanian framing ni muhimu: watu wengi wanaelezea depression kupitia body ("kichwa kinaniuma," "kifua kinabana," "siwezi kulala") badala ya mind, na traditional na faith healers mara nyingi ni first point of contact. None of that should stop mtu kupata medical care — two zinaweza kufanya kazi together. Kuuliza about mood, suicide thoughts, na ability to function ni sehemu ya good primary care kwa kila mtu mwenye chronic illness, kila postpartum mother, na kila adolescent anayepresent na vague unexplained symptoms.',
  },

  commonQuestions: [
    {
      q: { en: 'What is depression?', sw: 'Sonona ni nini?' },
      a: {
        en: 'Depression is a medical condition where you feel persistently low, lose interest in things, feel tired, and have changes in sleep, appetite, or concentration for at least two weeks. It is different from normal sadness — sadness comes and goes, depression stays. It is treatable with a combination of support, talking therapy, and sometimes medication. It is not weakness or laziness — it is an illness like diabetes or hypertension.',
        sw: 'Sonona ni hali ya kimatibabu ambapo unahisi kushuka kwa muda mrefu, unapoteza hamu katika vitu, unahisi uchovu, na una mabadiliko katika usingizi, hamu ya kula, au umakini kwa angalau wiki mbili. Ni tofauti na huzuni ya kawaida — huzuni huja na kuondoka, sonona inakaa. Inatibika kwa mchanganyiko wa msaada, tiba ya mazungumzo, na wakati mwingine dawa. Sio udhaifu au uvivu — ni ugonjwa kama kisukari au shinikizo la juu la damu.',
        sw_mtaa: 'Depression ni medical condition ambapo unafeel persistently low, unapoteza interest katika vitu, unafeel tired, na una changes katika sleep, appetite, au concentration kwa angalau wiki mbili. Ni tofauti na normal sadness — sadness inakuja na kuondoka, depression inakaa. Inatibika na combination ya support, talking therapy, na wakati mwingine medication. Sio weakness au laziness — ni illness kama diabetes au hypertension.',
      },
    },
    {
      q: { en: 'How do I know if I have depression?', sw: 'Nitajuaje kama nina sonona?' },
      a: {
        en: 'Common signs include: low mood most of the day, loss of pleasure in things you used to enjoy, low energy or tiredness, trouble sleeping (or sleeping too much), changes in appetite or weight, difficulty concentrating, feelings of worthlessness or guilt, slowed movement or restlessness, and thoughts that life is not worth living. If five or more of these have been present for at least two weeks, and they affect your ability to work, study, or look after your family, it is likely depression — and treatable. A clinician can confirm using the PHQ-9 questionnaire (also available in Kiswahili).',
        sw: 'Ishara za kawaida ni pamoja na: hali ya chini ya akili siku nzima, kupoteza furaha katika vitu ulivyokuwa unapenda, uchovu au nguvu kidogo, shida ya usingizi (au kulala sana), mabadiliko ya hamu ya kula au uzito, ugumu wa kuzingatia, hisia za kutokuwa na thamani au hatia, mwendo wa polepole au kutotulia, na mawazo kwamba maisha hayana thamani ya kuishi. Ikiwa tano au zaidi ya hizi zimekuwepo kwa angalau wiki mbili, na zinaathiri uwezo wako wa kufanya kazi, kusoma, au kutunza familia, kuna uwezekano ni sonona — na inatibika. Daktari anaweza kuthibitisha kwa kutumia dodoso la PHQ-9 (linapatikana pia kwa Kiswahili).',
        sw_mtaa: 'Common signs ni pamoja na: low mood most of the day, kupoteza pleasure katika vitu ulivyokuwa unaenjoy, low energy au tiredness, trouble sleeping (au kulala sana), changes katika appetite au weight, difficulty concentrating, feelings za worthlessness au guilt, slowed movement au restlessness, na thoughts kwamba life is not worth living. Ikiwa five au more ya hizi zimekuwepo kwa angalau wiki mbili, na zinaaffect ability yako ya kufanya kazi, kusoma, au kulook after family, kuna likely ni depression — na inatibika. Clinician anaweza kuconfirm kwa kutumia PHQ-9 questionnaire (inapatikana pia kwa Kiswahili).',
      },
    },
    {
      q: { en: 'Is depression caused by weak faith?', sw: 'Sonona inasababishwa na imani dhaifu?' },
      a: {
        en: 'No. Depression is a medical illness, not a spiritual failing. People with strong faith get depression — including pastors, imams, religious leaders. Faith can be a powerful source of support and comfort, and many people find healing through both prayer/spiritual practice AND medical treatment together. The two are not in conflict. Saying "just pray harder" to someone with depression is like saying "just believe more" to someone with malaria. Treat both the soul and the body.',
        sw: 'Hapana. Sonona ni ugonjwa wa kimatibabu, sio kushindwa kiroho. Watu wenye imani kali wanapata sonona — wakiwemo wachungaji, mashehe, viongozi wa kidini. Imani inaweza kuwa chanzo cha nguvu cha msaada na faraja, na watu wengi hupata uponyaji kupitia maombi/desturi za kiroho NA matibabu pamoja. Hizi mbili hazipingani. Kumwambia mtu mwenye sonona "tu omba zaidi" ni kama kumwambia mtu mwenye malaria "tu amini zaidi." Tibu roho na mwili pia.',
        sw_mtaa: 'Hapana. Depression ni medical illness, sio spiritual failing. Watu wenye strong faith wanapata depression — wakiwemo pastors, imams, religious leaders. Faith inaweza kuwa powerful source ya support na comfort, na watu wengi wanapata healing kupitia both prayer/spiritual practice NA medical treatment together. Two hazipingani. Kumwambia mtu mwenye depression "just pray harder" ni kama kumwambia mtu mwenye malaria "just believe more." Treat both soul na body.',
      },
    },
    {
      q: { en: 'How is depression treated?', sw: 'Sonona inatibiwaje?' },
      a: {
        en: 'Treatment depends on severity. Mild depression: structured social support, regular exercise, sleep regularity, behavioural activation (deliberately doing small valued activities even when not in the mood), and brief counselling can work. Moderate to severe: combine talking therapy (cognitive behavioural therapy, problem-solving therapy, interpersonal therapy) with antidepressant medication (most commonly an SSRI like fluoxetine or sertraline; amitriptyline is older and cheaper but with more side effects). Medication takes 2-4 weeks to start working and should usually continue for at least 6-9 months after recovery. Stopping suddenly can cause discontinuation symptoms — taper under clinician guidance. Treat any contributing physical illness (thyroid disease, anaemia, vitamin B12 deficiency, chronic infections, HIV without ART).',
        sw: 'Matibabu hutegemea ukali. Sonona ndogo: msaada wa kijamii uliopangwa, mazoezi ya kawaida, ukawaida wa usingizi, behavioural activation (kufanya kwa makusudi shughuli ndogo zenye thamani hata pasipo na hali), na ushauri mfupi unaweza kufanya kazi. Wastani hadi mkali: changanya tiba ya mazungumzo (cognitive behavioural therapy, problem-solving therapy, interpersonal therapy) na dawa za sonona (mara nyingi zaidi SSRI kama fluoxetine au sertraline; amitriptyline ni ya zamani na rahisi zaidi lakini na athari zaidi). Dawa huchukua wiki 2-4 kuanza kufanya kazi na kawaida zinapaswa kuendelea kwa angalau miezi 6-9 baada ya kupona. Kuacha ghafla kunaweza kusababisha dalili za kuacha — punguza chini ya maelekezo ya daktari. Tibu ugonjwa wowote wa kimwili unaochangia (ugonjwa wa thyroid, upungufu wa damu, upungufu wa vitamini B12, maambukizi sugu, VVU bila ART).',
        sw_mtaa: 'Treatment inategemea severity. Mild depression: structured social support, regular exercise, sleep regularity, behavioural activation (deliberately kufanya small valued activities hata when not in mood), na brief counselling inaweza kufanya kazi. Moderate hadi severe: combine talking therapy (CBT, problem-solving therapy, interpersonal therapy) na antidepressant medication (most commonly SSRI kama fluoxetine au sertraline; amitriptyline ni older na cheaper lakini na more side effects). Medication inachukua wiki 2-4 kuanza kufanya kazi na kawaida inapaswa kuendelea kwa angalau miezi 6-9 baada ya recovery. Kuacha suddenly kunaweza kusababisha discontinuation symptoms — taper chini ya clinician guidance. Treat physical illness yoyote inayocontribute (thyroid disease, anaemia, vitamin B12 deficiency, chronic infections, HIV without ART).',
      },
    },
    {
      q: { en: 'What if I am having thoughts of suicide?', sw: 'Je, kama nina mawazo ya kujiua?' },
      a: {
        en: 'Suicidal thoughts can be part of depression, and you are not alone — many people who go through this recover fully. Please reach out to someone right now: a doctor, nurse, clinical officer, family member, religious leader, or a trusted friend. Talking about it helps, not harms. If you have a specific plan or feel you might act on the thoughts, this is a medical emergency — go to the nearest hospital or call someone to bring you. Remove access to anything you could use to hurt yourself (medicines, weapons, ropes, pesticides) until you have professional support. These thoughts can pass with the right help, and depression is treatable.',
        sw: 'Mawazo ya kujiua yanaweza kuwa sehemu ya sonona, na hauko peke yako — watu wengi wanaopita katika hii hupona kabisa. Tafadhali wasiliana na mtu sasa hivi: daktari, muuguzi, clinical officer, mwanafamilia, kiongozi wa kidini, au rafiki unayemwamini. Kuongea juu yake husaidia, hailei. Ikiwa una mpango maalum au unahisi unaweza kutekeleza mawazo, hii ni dharura ya kimatibabu — nenda hospitali ya karibu zaidi au mpigie mtu akuletee. Ondoa upatikanaji wa chochote ungeweza kutumia kujidhuru (dawa, silaha, kamba, sumu) hadi uwe na msaada wa kitaalamu. Mawazo haya yanaweza kupita kwa msaada sahihi, na sonona inatibika.',
        sw_mtaa: 'Suicidal thoughts zinaweza kuwa sehemu ya depression, na hauko peke yako — watu wengi wanaogo through hii wanarecover fully. Please reach out kwa mtu sasa hivi: doctor, nurse, clinical officer, family member, religious leader, au trusted friend. Kuongea juu yake kunasaidia, sio kuharm. Ikiwa una specific plan au unafeel unaweza kuact on the thoughts, hii ni medical emergency — nenda nearest hospital au call mtu akuletee. Remove access kwa chochote ungeweza kutumia kujidhuru (dawa, weapons, ropes, pesticides) until una professional support. Thoughts hizi zinaweza kupita na right help, na depression inatibika.',
      },
    },
    {
      q: { en: 'Can mothers get depression after childbirth?', sw: 'Akina mama wanaweza kupata sonona baada ya kuzaa?' },
      a: {
        en: 'Yes — this is called postpartum depression, and it affects roughly 1 in 5 mothers worldwide and is well-recognised in Tanzania. It can start within days of delivery or appear over the first year. Symptoms are the same as other depression but often include difficulty bonding with the baby, intrusive worries about harming the baby (which are NOT acting wishes but a sign of needing help), and feeling overwhelmed by the demands of caring for an infant. It is treatable — talking therapy first-line, antidepressants if needed (sertraline is safest in breastfeeding). It is NOT a failure of motherhood. Getting treatment helps both the mother and the baby. Antenatal and postnatal clinics should ask about mood every visit.',
        sw: 'Ndio — hii inaitwa sonona ya baada ya kuzaa, na huathiri takriban 1 kati ya akina mama 5 duniani na inatambuliwa vyema Tanzania. Inaweza kuanza ndani ya siku za kuzaa au kujitokeza wakati wa mwaka wa kwanza. Dalili ni sawa na sonona nyingine lakini mara nyingi hujumuisha ugumu wa kuwa na uhusiano na mtoto, wasiwasi unaoingilia juu ya kumdhuru mtoto (ambao SI matamanio ya kutenda bali ishara ya kuhitaji msaada), na kujihisi umelemewa na mahitaji ya kumtunza mtoto mchanga. Inatibika — tiba ya mazungumzo ni ya kwanza, dawa za sonona ikihitajika (sertraline ni salama zaidi katika kunyonyesha). Sio kushindwa kwa umama. Kupata matibabu husaidia mama na mtoto. Kliniki za kabla na baada ya kuzaa zinapaswa kuuliza juu ya hali ya akili kila ziara.',
        sw_mtaa: 'Ndio — hii inaitwa postpartum depression, na inaaffect roughly 1 kati ya mothers 5 worldwide na inarecognised vizuri Tanzania. Inaweza kuanza ndani ya siku za delivery au kuappear wakati wa first year. Symptoms ni same na other depression lakini mara nyingi zinajumuisha difficulty kubond na baby, intrusive worries about kuharm baby (ambazo SI acting wishes bali sign ya kuhitaji help), na kujihisi overwhelmed na demands za kucare for infant. Inatibika — talking therapy first-line, antidepressants ikihitajika (sertraline ni safest katika breastfeeding). Sio failure of motherhood. Kupata treatment kunasaidia both mother na baby. Antenatal na postnatal clinics zinapaswa kuuliza about mood kila visit.',
      },
    },
  ],

  selfManagement: [
    { en: 'Reach out to one trusted person and tell them how you are feeling — isolation feeds depression, connection counters it.', sw: 'Wasiliana na mtu mmoja unayemwamini na umwambie unavyojihisi — kutengwa hulisha sonona, mawasiliano huipinga.', sw_mtaa: 'Reach out kwa one trusted person na uwaambie unavyofeel — isolation inafeed depression, connection inacounter it.' },
    { en: 'Move your body daily — even a 20-minute walk has antidepressant effect, comparable in mild depression to medication.', sw: 'Sogeza mwili wako kila siku — hata kutembea kwa dakika 20 kuna athari ya kupambana na sonona, kulinganishwa katika sonona ndogo na dawa.', sw_mtaa: 'Sogeza body yako daily — hata 20-minute walk ina antidepressant effect, comparable katika mild depression na medication.' },
    { en: 'Regular sleep — same time to bed, same time up, no phone the last hour. Disturbed sleep deepens depression.', sw: 'Usingizi wa kawaida — saa sawa za kulala, saa sawa za kuamka, hakuna simu saa moja ya mwisho. Usingizi mbovu huzidisha sonona.', sw_mtaa: 'Regular sleep — same time to bed, same time up, no phone last hour. Disturbed sleep inadeepen depression.' },
    { en: 'Do small valued activities even when you don\'t feel like it — behavioural activation. The motivation often follows the action, not the other way round.', sw: 'Fanya shughuli ndogo zenye thamani hata kama hujihisi — behavioural activation. Hamu mara nyingi hufuata hatua, sio kinyume chake.', sw_mtaa: 'Fanya small valued activities hata when hujihisi — behavioural activation. Motivation mara nyingi inafuata action, sio other way round.' },
    { en: 'Avoid alcohol — it is a depressant. People often use it to cope, but it deepens depression and interacts with antidepressants.', sw: 'Epuka pombe — ni depressant. Watu mara nyingi huitumia kukabiliana, lakini huzidisha sonona na inaingiliana na dawa za sonona.', sw_mtaa: 'Epuka pombe — ni depressant. Watu mara nyingi wanaitumia kukabiliana, lakini inadeepen depression na inaingiliana na antidepressants.' },
    { en: 'Limit time alone with negative thoughts — open the curtains, step outside, listen to something that lifts you. Rumination is the engine of depression.', sw: 'Punguza muda peke yako na mawazo mabaya — fungua mapazia, toka nje, sikiliza kitu kinachokuinua. Kutafakari sana ni injini ya sonona.', sw_mtaa: 'Limit time alone na negative thoughts — fungua curtains, step outside, sikiliza kitu kinachokulift. Rumination ni engine ya depression.' },
    { en: 'If you are taking an antidepressant, take it every day at the same time even when you feel better — stopping early is the commonest reason for relapse.', sw: 'Ikiwa unatumia dawa ya sonona, ichukue kila siku kwa wakati ule ule hata unapojihisi vizuri — kuacha mapema ni sababu ya kawaida zaidi ya kurudia.', sw_mtaa: 'Ikiwa unatumia antidepressant, ichukue kila siku kwa same time hata unapojihisi better — stopping early ni commonest reason ya relapse.' },
  ],

  warningTriggers: [
    { en: 'Chronic illness — HIV, diabetes, COPD, cancer, kidney disease all raise depression risk', sw: 'Magonjwa sugu — VVU, kisukari, COPD, saratani, ugonjwa wa figo yote huongeza hatari ya sonona', sw_mtaa: 'Chronic illness — HIV, diabetes, COPD, cancer, kidney disease zote zinaraise depression risk' },
    { en: 'Recent childbirth, miscarriage, or fertility difficulty', sw: 'Kuzaa hivi karibuni, kuharibika kwa mimba, au ugumu wa uzazi', sw_mtaa: 'Recent childbirth, miscarriage, au fertility difficulty' },
    { en: 'Bereavement or major loss (death of loved one, divorce, job loss)', sw: 'Msiba au hasara kubwa (kifo cha mpendwa, talaka, kupoteza kazi)', sw_mtaa: 'Bereavement au major loss (death of loved one, divorce, job loss)' },
    { en: 'Trauma — domestic violence, sexual assault, war, displacement', sw: 'Mfadhaiko — ukatili wa nyumbani, ubakaji, vita, kuhamishwa', sw_mtaa: 'Trauma — domestic violence, sexual assault, war, displacement' },
    { en: 'Alcohol use, cannabis use, or other substance use', sw: 'Matumizi ya pombe, bangi, au matumizi ya dawa za kulevya', sw_mtaa: 'Alcohol use, cannabis use, au other substance use' },
    { en: 'Family history of depression or suicide', sw: 'Historia ya familia ya sonona au kujiua', sw_mtaa: 'Family history ya depression au suicide' },
  ],

  whenToSeekCare: [
    { sign: { en: 'Any thoughts of suicide, self-harm, or wanting to "not be here anymore"', sw: 'Mawazo yoyote ya kujiua, kujidhuru, au kutaka "kutokuwepo tena"', sw_mtaa: 'Thoughts yoyote ya suicide, self-harm, au kutaka "not be here anymore"' }, urgency: 'emergency' },
    { sign: { en: 'Specific suicide plan, access to means, or attempt — go to hospital immediately', sw: 'Mpango maalum wa kujiua, upatikanaji wa njia, au jaribio — nenda hospitali mara moja', sw_mtaa: 'Specific suicide plan, access to means, au attempt — nenda hospital immediately' }, urgency: 'emergency' },
    { sign: { en: 'Unable to look after yourself or your children — not eating, not washing, not getting out of bed', sw: 'Kushindwa kujitunza wewe au watoto wako — kutokula, kutoosha, kutotoka kitandani', sw_mtaa: 'Unable to look after yourself au watoto wako — not eating, not washing, not getting out of bed' }, urgency: 'urgent' },
    { sign: { en: 'Hearing voices, seeing things others don\'t, or unusual beliefs — psychotic depression needs urgent specialist care', sw: 'Kusikia sauti, kuona vitu wengine hawaoni, au imani zisizo za kawaida — sonona ya kisaikolojia inahitaji huduma ya haraka ya mtaalam', sw_mtaa: 'Kusikia voices, kuona vitu wengine hawaoni, au unusual beliefs — psychotic depression inahitaji urgent specialist care' }, urgency: 'urgent' },
    { sign: { en: 'Postnatal mother with intrusive thoughts about harming the baby — needs urgent assessment, not judgement', sw: 'Mama wa baada ya kuzaa na mawazo ya kuingilia juu ya kumdhuru mtoto — anahitaji tathmini ya haraka, sio hukumu', sw_mtaa: 'Postnatal mother na intrusive thoughts about kuharm baby — anahitaji urgent assessment, sio judgement' }, urgency: 'urgent' },
    { sign: { en: 'Symptoms persistent for 2+ weeks and interfering with work, study, or family life', sw: 'Dalili zinazoendelea kwa wiki 2+ na kuingilia kazi, masomo, au maisha ya familia', sw_mtaa: 'Symptoms persistent kwa wiki 2+ na zinainterfere na work, study, au family life' }, urgency: 'routine' },
  ],

  comorbidityNotes: [
    {
      coCondition: 'hiv',
      note: {
        en: 'Depression is 2-3 times more common in people living with HIV. It directly worsens ART adherence — which worsens virological control — which worsens depression. Treating depression in HIV improves both viral load and quality of life. SSRIs are safe with most ART; check for QT-prolongation interactions with efavirenz.',
        sw: 'Sonona ni mara 2-3 zaidi katika watu wanaoishi na VVU. Huzidisha ufuasi wa ART moja kwa moja — ambao huzidisha udhibiti wa virological — ambao huzidisha sonona. Kutibu sonona katika VVU huboresha viral load na ubora wa maisha. SSRI ni salama na ART nyingi; angalia mwingiliano wa kurefusha QT na efavirenz.',
        sw_mtaa: 'Depression ni 2-3 times more common katika people living with HIV. Inaworsen ART adherence directly — ambayo inaworsen virological control — ambayo inaworsen depression. Kutreating depression katika HIV inaimprove both viral load na quality of life. SSRIs ni safe na most ART; check for QT-prolongation interactions na efavirenz.',
      },
    },
    {
      coCondition: 'maternal_care',
      note: {
        en: 'Postpartum depression affects ~1 in 5 mothers. Routine screening with PHQ-9 (Kiswahili version validated) at antenatal and postnatal visits catches cases early. Treating maternal depression improves infant development outcomes. Sertraline is the SSRI of choice in breastfeeding.',
        sw: 'Sonona ya baada ya kuzaa huathiri takriban 1 kati ya akina mama 5. Uchunguzi wa kawaida na PHQ-9 (toleo la Kiswahili limethibitishwa) katika ziara za kabla na baada ya kuzaa hukamata kesi mapema. Kutibu sonona ya kimama huboresha matokeo ya ukuaji wa mtoto. Sertraline ni SSRI ya chaguo katika kunyonyesha.',
        sw_mtaa: 'Postpartum depression inaaffect ~1 kati ya mothers 5. Routine screening na PHQ-9 (Kiswahili version validated) katika antenatal na postnatal visits inakamata cases early. Kutreating maternal depression inaimprove infant development outcomes. Sertraline ni SSRI of choice katika breastfeeding.',
      },
    },
    {
      coCondition: 'copd',
      note: {
        en: 'Anxiety and depression are very common in COPD and often present as "fear of breathlessness" rather than as low mood. They worsen breathlessness, reduce treatment adherence, and increase exacerbation risk. Treatment of depression measurably improves COPD outcomes.',
        sw: 'Wasiwasi na sonona ni vya kawaida sana katika COPD na mara nyingi hujitokeza kama "hofu ya kushindwa kupumua" badala ya hali ya chini ya akili. Huzidisha kushindwa kupumua, hupunguza ufuasi wa matibabu, na huongeza hatari ya mlipuko. Matibabu ya sonona huboresha matokeo ya COPD kwa namna inayopimika.',
        sw_mtaa: 'Anxiety na depression ni very common katika COPD na mara nyingi zinapresent kama "fear of breathlessness" badala ya low mood. Zinaworsen breathlessness, zinareduce treatment adherence, na zinaongeza exacerbation risk. Treatment of depression inaimprove COPD outcomes measurably.',
      },
    },
  ],

  sources: [
    src('WHO_MHGAP_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NACP_ART_2024'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
