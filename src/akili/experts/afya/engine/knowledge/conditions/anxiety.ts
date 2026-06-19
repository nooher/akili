/**
 * Anxiety — Phase 14 (Mental Health block)
 *
 * Sources: WHO mhGAP 2023, NTLG STG 2023, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review.
 */

import { ConditionKnowledge } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const ANXIETY: ConditionKnowledge = {
  id: 'anxiety',
  aliases: CONDITION_ALIASES.anxiety,
  category: 'mental_health',

  whatItIs: {
    en: 'Anxiety becomes a disorder when worry, fear, or bodily tension persists, is hard to control, and interferes with daily life. Common forms include generalised anxiety (constant worry), panic disorder (sudden episodes of overwhelming fear with palpitations, breathlessness, sweating), social anxiety, and post-traumatic stress disorder. In Tanzania, anxiety often presents physically — chest tightness, palpitations, headache, abdominal pain, dizziness — rather than emotionally. People may go through many medical tests before mental health is considered.',
    sw: 'Wasiwasi huwa shida wakati wasiwasi, hofu, au mvutano wa mwili unapodumu, ni mgumu kudhibiti, na unaingilia maisha ya kila siku. Aina za kawaida ni pamoja na wasiwasi wa jumla (wasiwasi wa mara kwa mara), panic disorder (vipindi vya ghafla vya hofu kubwa na mapigo ya moyo, kushindwa kupumua, jasho), wasiwasi wa kijamii, na PTSD. Tanzania, wasiwasi mara nyingi hujitokeza kimwili — kifua kubana, mapigo ya moyo, maumivu ya kichwa, maumivu ya tumbo, kizunguzungu — badala ya kihisia. Watu wanaweza kupita kupitia vipimo vingi vya matibabu kabla afya ya akili kufikiriwa.',
    sw_mtaa: 'Anxiety inakuwa disorder wakati worry, fear, au bodily tension inapodumu, ni hard to control, na inainterfere na daily life. Common forms ni pamoja na generalised anxiety (constant worry), panic disorder (sudden episodes za overwhelming fear na palpitations, breathlessness, sweating), social anxiety, na PTSD. Tanzania, anxiety mara nyingi inapresent physically — chest tightness, palpitations, headache, abdominal pain, dizziness — badala ya emotionally. Watu wanaweza kugo through medical tests nyingi kabla mental health kufikiriwa.',
  },

  whyItMatters: {
    en: 'Untreated anxiety drives unnecessary medical investigations, missed work and school, family stress, comorbid depression, and substance use. It is highly treatable — relaxation training, cognitive-behavioural therapy, and where needed an SSRI (sertraline, fluoxetine) work well. Recognising that "kifua kinabana" or "kichwa kinakwenda" can be anxiety, not heart disease or stroke, saves time and money — though clinicians should always rule out cardiac and neurological causes first.',
    sw: 'Wasiwasi usiotibiwa huendesha uchunguzi wa kimatibabu usio wa lazima, kupotea kazi na shule, mfadhaiko wa familia, sonona inayosafiri pamoja, na matumizi ya dawa za kulevya. Inatibika sana — mafunzo ya kupumzika, tiba ya kitabia cha utambuzi, na pale inapohitajika SSRI (sertraline, fluoxetine) hufanya kazi vyema. Kutambua kwamba "kifua kinabana" au "kichwa kinakwenda" inaweza kuwa wasiwasi, sio ugonjwa wa moyo au kiharusi, kuokoa muda na pesa — ingawa madaktari daima wanapaswa kuondoa sababu za moyo na za neva kwanza.',
    sw_mtaa: 'Untreated anxiety inaendesha unnecessary medical investigations, missed work na school, family stress, comorbid depression, na substance use. Inatibika sana — relaxation training, CBT, na pale inahitajika SSRI (sertraline, fluoxetine) zinafanya kazi vizuri. Kurecognise kwamba "kifua kinabana" au "kichwa kinakwenda" inaweza kuwa anxiety, sio heart disease au stroke, kunaokoa time na money — ingawa clinicians daima wanapaswa kurule out cardiac na neurological causes kwanza.',
  },

  commonQuestions: [
    {
      q: { en: 'What is anxiety disorder?', sw: 'Ugonjwa wa wasiwasi ni nini?' },
      a: {
        en: 'Anxiety becomes a disorder when worry or fear is persistent, hard to control, and disrupts daily life. It includes generalised anxiety, panic disorder, social anxiety, and PTSD. It is real, common, and treatable.',
        sw: 'Wasiwasi huwa shida wakati wasiwasi au hofu inadumu, ni ngumu kudhibiti, na inavuruga maisha ya kila siku. Inajumuisha wasiwasi wa jumla, panic disorder, wasiwasi wa kijamii, na PTSD. Ni halisi, ya kawaida, na inatibika.',
        sw_mtaa: 'Anxiety inakuwa disorder wakati worry au fear inadumu, ni hard kudhibiti, na inadisrupt daily life. Inajumuisha generalised anxiety, panic disorder, social anxiety, na PTSD. Ni real, common, na inatibika.',
      },
    },
    {
      q: { en: 'What is a panic attack?', sw: 'Panic attack ni nini?' },
      a: {
        en: 'A sudden episode of intense fear with physical symptoms: racing heart, breathlessness, chest tightness, sweating, trembling, dizziness, fear of dying. It peaks within 10 minutes and usually settles within 30. The first time it happens, most people fear a heart attack — and getting checked is reasonable. Once cardiac causes are excluded, recognising future episodes as panic (and using slow breathing) shortens them.',
        sw: 'Kipindi cha ghafla cha hofu kubwa na dalili za kimwili: mapigo ya moyo ya haraka, kushindwa kupumua, kifua kubana, jasho, kutetemeka, kizunguzungu, hofu ya kufa. Hupanda kilele ndani ya dakika 10 na kawaida hutulia ndani ya 30. Mara ya kwanza inapotokea, watu wengi huogopa shambulizi la moyo — na kupimwa ni busara. Pindi sababu za moyo zimekwisha, kutambua vipindi vya baadaye kama panic (na kutumia kupumua polepole) hupunguza.',
        sw_mtaa: 'Sudden episode ya intense fear na physical symptoms: racing heart, breathlessness, chest tightness, sweating, trembling, dizziness, fear of dying. Inapeak ndani ya dakika 10 na kawaida inasettle ndani ya 30. First time inapotokea, watu wengi wanafear heart attack — na getting checked ni reasonable. Once cardiac causes zime-excluded, kurecognise future episodes kama panic (na kutumia slow breathing) inazi-shorten.',
      },
    },
    {
      q: { en: 'How do I calm a panic attack?', sw: 'Naitulizaje panic attack?' },
      a: {
        en: 'Slow breathing is the fastest technique: breathe in through the nose for 4 counts, hold for 2, breathe out through pursed lips for 6 counts. Repeat for several minutes. The slow out-breath calms the nervous system. Remind yourself: "this is a panic attack — it will pass in minutes — I have survived this before." Ground yourself in the present (name 5 things you can see, 4 you can touch, 3 you can hear). After the attack, gentle activity (a walk, a drink of water) helps the body settle.',
        sw: 'Kupumua polepole ni mbinu ya haraka zaidi: vuta hewa kupitia pua kwa hesabu 4, shikilia kwa 2, pumua nje kupitia midomo iliyofungwa kwa hesabu 6. Rudia kwa dakika kadhaa. Pumzi ya nje ya polepole hutuliza mfumo wa neva. Jikumbushe: "huu ni panic attack — utapita ndani ya dakika — nimenusurika hii kabla." Jiweke kwenye sasa (taja vitu 5 unavyoona, 4 unavyoweza kugusa, 3 unavyoweza kusikia). Baada ya shambulizi, shughuli ya upole (matembezi, kunywa maji) husaidia mwili kutulia.',
        sw_mtaa: 'Slow breathing ni fastest technique: vuta hewa kupitia pua kwa counts 4, hold kwa 2, pumua nje kupitia pursed lips kwa counts 6. Repeat kwa several minutes. Slow out-breath inatuliza nervous system. Jikumbushe: "this is a panic attack — itapita in minutes — nime-survive this before." Jiweke present (name vitu 5 unaoona, 4 unaweza kugusa, 3 unaweza kusikia). Baada ya attack, gentle activity (matembezi, kunywa maji) inasaidia body kusettle.',
      },
    },
    {
      q: { en: 'Are anxiety and depression different?', sw: 'Wasiwasi na sonona ni tofauti?' },
      a: {
        en: 'They are different conditions but very commonly occur together. About half of people with depression also have an anxiety disorder, and vice versa. Treatment overlaps — SSRIs (sertraline, fluoxetine) treat both, CBT helps both. Recognising which is dominant guides treatment, but addressing both at once is usually the right approach.',
        sw: 'Ni hali tofauti lakini mara nyingi sana hutokea pamoja. Takriban nusu ya watu wenye sonona pia wana ugonjwa wa wasiwasi, na kinyume chake. Matibabu yanaingiliana — SSRI (sertraline, fluoxetine) hutibu vyote, CBT inasaidia vyote. Kutambua ipi inatawala huongoza matibabu, lakini kushughulikia vyote kwa mara moja kawaida ni njia sahihi.',
        sw_mtaa: 'Ni different conditions lakini very commonly zinaoccur pamoja. About half ya watu wenye depression pia wana anxiety disorder, na vice versa. Treatment inaoverlap — SSRIs (sertraline, fluoxetine) zinatibu both, CBT inasaidia both. Kurecognise which ni dominant inaguide treatment, lakini kuaddress both at once kawaida ni right approach.',
      },
    },
  ],

  selfManagement: [
    { en: 'Practice slow breathing daily, not only during panic — 4-2-6 breathing for 5 minutes twice a day.', sw: 'Fanya kupumua polepole kila siku, sio tu wakati wa panic — kupumua 4-2-6 kwa dakika 5 mara mbili kwa siku.', sw_mtaa: 'Practice slow breathing kila siku, sio tu wakati wa panic — 4-2-6 breathing kwa dakika 5 twice a day.' },
    { en: 'Limit caffeine — coffee, energy drinks, and strong tea can trigger anxiety and panic.', sw: 'Punguza kafeini — kahawa, vinywaji vya nguvu, na chai kali zinaweza kusababisha wasiwasi na panic.', sw_mtaa: 'Limit caffeine — kahawa, energy drinks, na strong tea zinaweza kutrigger anxiety na panic.' },
    { en: 'Move daily — exercise reduces anxiety as reliably as medication for mild cases.', sw: 'Sogeza kila siku — mazoezi hupunguza wasiwasi kwa uhakika kama dawa kwa kesi ndogo.', sw_mtaa: 'Move daily — exercise inareduce anxiety kama reliably kama medication kwa mild cases.' },
    { en: 'Avoid alcohol and cannabis — they reduce anxiety in the moment but worsen it over weeks.', sw: 'Epuka pombe na bangi — hupunguza wasiwasi kwa wakati huo lakini huzidisha kwa wiki.', sw_mtaa: 'Epuka pombe na bangi — zinareduce anxiety in the moment lakini zinaworsen over weeks.' },
    { en: 'Sleep regularly — disturbed sleep amplifies anxiety, regular sleep dampens it.', sw: 'Lala kwa kawaida — usingizi mbovu huongeza wasiwasi, usingizi wa kawaida hupunguza.', sw_mtaa: 'Sleep regularly — disturbed sleep inaamplify anxiety, regular sleep inadampen it.' },
    { en: 'Talk to someone you trust about what is worrying you — anxiety thrives in silence.', sw: 'Ongea na mtu unayemwamini juu ya kinachokusumbua — wasiwasi hustawi katika ukimya.', sw_mtaa: 'Talk to someone unayemtrust about kinachokusumbua — anxiety inathrive katika silence.' },
  ],

  warningTriggers: [
    { en: 'Recent trauma — assault, accident, violence, displacement', sw: 'Mfadhaiko wa hivi karibuni — shambulio, ajali, ukatili, kuhamishwa', sw_mtaa: 'Recent trauma — assault, accident, violence, displacement' },
    { en: 'Chronic stress — work, finances, caring for a sick relative', sw: 'Mfadhaiko sugu — kazi, fedha, kutunza ndugu mgonjwa', sw_mtaa: 'Chronic stress — work, finances, kucare for sick relative' },
    { en: 'Excessive caffeine or stimulant use', sw: 'Matumizi ya kafeini au stimulant kupita kiasi', sw_mtaa: 'Excessive caffeine au stimulant use' },
    { en: 'Thyroid disease — hyperthyroidism can mimic anxiety', sw: 'Ugonjwa wa thyroid — hyperthyroidism inaweza kuiga wasiwasi', sw_mtaa: 'Thyroid disease — hyperthyroidism inaweza ku-mimic anxiety' },
    { en: 'Alcohol or benzodiazepine withdrawal', sw: 'Kuacha pombe au benzodiazepine', sw_mtaa: 'Alcohol au benzodiazepine withdrawal' },
  ],

  whenToSeekCare: [
    { sign: { en: 'Severe chest pain — always rule out heart attack first, even if panic attacks are known', sw: 'Maumivu makali ya kifua — daima toa shambulizi la moyo kwanza, hata kama panic attack zinajulikana', sw_mtaa: 'Severe chest pain — always rule out heart attack kwanza, hata kama panic attacks zinajulikana' }, urgency: 'emergency' },
    { sign: { en: 'Sudden one-sided weakness or speech change — exclude stroke', sw: 'Udhaifu wa ghafla wa upande mmoja au mabadiliko ya kuongea — toa kiharusi', sw_mtaa: 'Sudden one-sided weakness au speech change — exclude stroke' }, urgency: 'emergency' },
    { sign: { en: 'Suicidal thoughts during severe anxiety', sw: 'Mawazo ya kujiua wakati wa wasiwasi mkali', sw_mtaa: 'Suicidal thoughts wakati wa severe anxiety' }, urgency: 'emergency' },
    { sign: { en: 'Anxiety interfering with work, study, or relationships for more than 4 weeks', sw: 'Wasiwasi unaoingilia kazi, masomo, au mahusiano kwa zaidi ya wiki 4', sw_mtaa: 'Anxiety inayointerfere na work, study, au relationships kwa zaidi ya wiki 4' }, urgency: 'routine' },
  ],

  comorbidityNotes: [
    {
      coCondition: 'depression',
      note: {
        en: 'Anxiety and depression co-occur in about half of cases. SSRIs treat both. CBT covers both. Address both rather than treating them as separate sequential conditions.',
        sw: 'Wasiwasi na sonona huingiliana takriban nusu ya kesi. SSRI hutibu vyote. CBT inafunika vyote. Shughulikia vyote badala ya kuvitendea kama hali tofauti za mfululizo.',
        sw_mtaa: 'Anxiety na depression zinaco-occur katika about half ya cases. SSRIs zinatreat both. CBT inacover both. Address both badala ya kuzitreat kama separate sequential conditions.',
      },
    },
  ],

  sources: [
    src('WHO_MHGAP_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
