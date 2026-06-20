// experts/elimu/index.ts — Akili's Elimu (study help) expert.
//
// A sovereign, curated Kiswahili knowledge base for learners: concept explanations
// in maths & science (kwa ufupi), study techniques, and the Tanzanian education
// system (darasa/kidato/NECTA). Pure/deterministic TS — no external LLM, no network.
// For actual computation it defers to the SNIL expert; for deeper learning it points
// to Jifunze / SNIL / Kasuku.

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliQuery,
  AkiliSource,
  DomainExpert,
} from '../../types';

const STRIP = /[^\p{L}\p{N}']+/gu;
const norm = (s: string): string =>
  (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ').replace(/\s+/g, ' ').trim();

function hasCue(hay: string, cue: string): boolean {
  return ` ${hay} `.includes(` ${cue} `) || hay === cue;
}

function cueScore(text: string, cues: string[], cap = 0.92): number {
  const n = norm(text);
  if (!n) return 0;
  const seen = new Set<string>();
  for (const c of cues) {
    if (hasCue(n, c)) seen.add(c);
    if (seen.size >= 3) break;
  }
  const hits = seen.size;
  if (hits === 0) return 0;
  return Math.min(cap, 0.32 + hits * 0.23);
}

const ELIMU_CUES = [
  // Kiswahili — learning
  'elimu', 'shule', 'mwanafunzi', 'mwalimu', 'darasa', 'kidato', 'somo', 'masomo',
  'mtihani', 'mitihani', 'necta', 'kusoma', 'kujifunza', 'kufaulu', 'maelezo',
  'eleza', 'nini maana', 'fafanua', 'mbinu za kusoma', 'noti', 'kumbukumbu',
  // Kiswahili — subjects
  'hesabu', 'hisabati', 'sayansi', 'fizikia', 'kemia', 'biolojia', 'jiografia',
  'historia', 'kiingereza', 'kiswahili somo', 'algebra', 'jiometri',
  // Kiswahili — pathways & support
  'chuo', 'chuo kikuu', 'udahili', 'kujiunga', 'heslb', 'mkopo wa elimu', 'ufaulu',
  'kombo', 'ufundi', 'veta', 'nacte', 'tcu', 'tie', 'mtaala', 'insha', 'utungaji',
  'msongo', 'mafadhaiko', 'kuandika',
  // English
  'education', 'school', 'student', 'teacher', 'class', 'form', 'subject', 'exam',
  'exams', 'study', 'learn', 'learning', 'pass', 'explain', 'definition', 'concept',
  'maths', 'math', 'mathematics', 'science', 'physics', 'chemistry', 'biology',
  'geography', 'history', 'revision', 'notes',
  // English — pathways & support
  'university', 'college', 'admission', 'enrol', 'loan', 'scholarship', 'vocational',
  'curriculum', 'essay', 'writing', 'english', 'exam stress', 'anxiety', 'career',
];

interface KBEntry {
  id: string;
  cues: string[];
  sw: string;
  en?: string;
  sources: AkiliSource[];
}

const KB: KBEntry[] = [
  {
    id: 'mfumo-elimu-tz',
    cues: ['mfumo', 'elimu', 'darasa', 'kidato', 'necta', 'shule', 'system', 'form', 'standard', 'msingi', 'sekondari'],
    sw:
      'Mfumo wa elimu Tanzania (muhtasari):\n' +
      '• Elimu ya awali (chekechea), kisha SHULE YA MSINGI: Darasa la 1–7, mtihani wa Darasa la 7 (PSLE).\n' +
      '• SEKONDARI ya kawaida (O-Level): Kidato cha 1–4, mtihani wa CSEE (Kidato cha 4).\n' +
      '• SEKONDARI ya juu (A-Level): Kidato cha 5–6, mtihani wa ACSEE.\n' +
      '• Mafunzo ya ufundi (VETA) na elimu ya juu (vyuo/vyuo vikuu) baada ya hapo.\n' +
      '• Mitihani ya kitaifa husimamiwa na NECTA.',
    en:
      'Tanzanian education system (overview):\n' +
      '• Pre-primary, then PRIMARY: Standard 1–7, with the Standard 7 exam (PSLE).\n' +
      '• Ordinary SECONDARY (O-Level): Form 1–4, with the CSEE (Form 4) exam.\n' +
      '• Advanced SECONDARY (A-Level): Form 5–6, with the ACSEE exam.\n' +
      '• Vocational training (VETA) and higher education (colleges/universities) follow.\n' +
      '• National exams are administered by NECTA.',
    sources: [
      { label: 'NECTA — Baraza la Mitihani Tanzania' },
      { label: 'Wizara ya Elimu, Sayansi na Teknolojia' },
    ],
  },
  {
    id: 'mbinu-za-kusoma',
    cues: ['mbinu', 'kusoma', 'kujifunza', 'study', 'revision', 'noti', 'kumbukumbu', 'memory', 'how to study'],
    sw:
      'Mbinu bora za kusoma:\n' +
      '• Panga ratiba na soma kidogo kila siku badala ya kuvuruga usiku mmoja (spaced practice).\n' +
      '• Jiulize maswali na jaribu kukumbuka bila kuangalia (active recall) — ni bora kuliko kusoma tu.\n' +
      '• Andika noti fupi kwa maneno yako; fundisha mtu mwingine ili kupima uelewa.\n' +
      '• Fanya maswali ya mitihani ya zamani (past papers).\n' +
      '• Pumzika, lala vya kutosha, na epuka usumbufu wa simu wakati wa kusoma.',
    en:
      'Effective study techniques:\n' +
      '• Plan a schedule and study a little daily rather than cramming (spaced practice).\n' +
      '• Quiz yourself and recall without looking (active recall) — better than rereading.\n' +
      '• Make short notes in your own words; teach someone else to test understanding.\n' +
      '• Do past exam papers.\n' +
      '• Rest, sleep enough, and avoid phone distractions while studying.',
    sources: [{ label: 'Akili KB — Elimu', ref: 'Mbinu za ujifunzaji' }],
  },
  {
    id: 'hesabu',
    cues: ['hesabu', 'hisabati', 'maths', 'math', 'mathematics', 'algebra', 'jiometri', 'namba', 'kokotoa', 'compute', 'calculate'],
    sw:
      'Hesabu (dhana kwa ufupi):\n' +
      '• Fuata mpangilio wa kufanya operesheni (BODMAS): mabano, vipeo, kuzidisha/kugawanya, kisha kujumlisha/kutoa.\n' +
      '• Algebra: herufi (mfano x) huwakilisha namba isiyojulikana; lengo ni kuitenga.\n' +
      '• Sehemu/asilimia: asilimia ni sehemu kati ya mia (mfano 25% = 25/100 = robo).\n' +
      '• Jiometri: pembetatu ina jumla ya pembe 180°; eneo la mstatili = urefu × upana.\n' +
      'KUKOKOTOA jibu kamili: mtaalamu wa SNIL anaweza kuhesabu moja kwa moja — uliza hesabu yako kama "kokotoa 12 × (3+4)".',
    en:
      'Maths (concepts in brief):\n' +
      '• Order of operations (BODMAS): brackets, powers, multiply/divide, then add/subtract.\n' +
      '• Algebra: a letter (e.g. x) stands for an unknown number; the goal is to isolate it.\n' +
      '• Fractions/percent: percent is a part per hundred (e.g. 25% = 25/100 = a quarter).\n' +
      '• Geometry: a triangle\'s angles sum to 180°; area of a rectangle = length × width.\n' +
      'To COMPUTE an exact answer, the SNIL expert can calculate directly — ask it like "kokotoa 12 × (3+4)".',
    sources: [{ label: 'Akili KB — Elimu', ref: 'Hisabati ya msingi' }],
  },
  {
    id: 'sayansi',
    cues: ['sayansi', 'fizikia', 'kemia', 'biolojia', 'science', 'physics', 'chemistry', 'biology', 'seli', 'atomi', 'nguvu'],
    sw:
      'Sayansi (dhana kwa ufupi):\n' +
      '• FIZIKIA: huchunguza nguvu, mwendo na nishati. Mfano: nguvu = wingi × kasi-ongezi (F = m·a).\n' +
      '• KEMIA: huchunguza maada na mabadiliko yake; vitu vimeundwa na atomi na molekuli.\n' +
      '• BIOLOJIA: huchunguza viumbe hai; SELI ndiyo kiungo cha msingi cha uhai.\n' +
      '• Mbinu ya kisayansi: dhana → jaribio → uchunguzi → hitimisho.\n' +
      'Kwa maelezo ya kina zaidi, tumia majukwaa ya kujifunza kama Jifunze na Kasuku.',
    en:
      'Science (concepts in brief):\n' +
      '• PHYSICS: studies force, motion and energy. E.g. force = mass × acceleration (F = m·a).\n' +
      '• CHEMISTRY: studies matter and its changes; things are made of atoms and molecules.\n' +
      '• BIOLOGY: studies living things; the CELL is the basic unit of life.\n' +
      '• Scientific method: hypothesis → experiment → observation → conclusion.\n' +
      'For deeper detail, use learning platforms like Jifunze and Kasuku.',
    sources: [{ label: 'Akili KB — Elimu', ref: 'Sayansi ya msingi' }],
  },
  {
    id: 'mitihani-necta',
    cues: ['mtihani', 'mitihani', 'necta', 'csee', 'acsee', 'psle', 'exam', 'exams', 'kufaulu', 'matokeo', 'results', 'grade'],
    sw:
      'Mitihani ya kitaifa (NECTA):\n' +
      '• Mitihani mikuu: PSLE (Darasa 7), FTNA (Kidato 2), CSEE (Kidato 4), na ACSEE (Kidato 6).\n' +
      '• Madaraja ya O-Level kwa kawaida ni A, B, C, D, F kwa kila somo, na GPA/division kwa ujumla.\n' +
      '• Jiandae kwa kufanya past papers, kuelewa muundo wa maswali, na kupanga muda wa kujibu.\n' +
      '• Matokeo hutangazwa na NECTA; angalia namba yako ya mtihani.',
    en:
      'National exams (NECTA):\n' +
      '• Main exams: PSLE (Std 7), FTNA (Form 2), CSEE (Form 4), and ACSEE (Form 6).\n' +
      '• O-Level grades are typically A, B, C, D, F per subject, with an overall GPA/division.\n' +
      '• Prepare with past papers, learn the question formats, and budget answering time.\n' +
      '• Results are released by NECTA; check using your examination number.',
    sources: [{ label: 'NECTA — Baraza la Mitihani Tanzania' }],
  },
  {
    id: 'wapi-kujifunza',
    cues: ['jifunze', 'kasuku', 'snil', 'wapi', 'where', 'platform', 'kujiendeleza', 'msaada wa ziada', 'resources'],
    sw:
      'Wapi kujifunza zaidi (rasilimali za Laetoli):\n' +
      '• JIFUNZE — kozi za Kiswahili na masomo kwa hatua (mwanzo → umahiri).\n' +
      '• SNIL — Kiswahili → msimbo: nzuri kwa hesabu, mantiki na kujifunza programu.\n' +
      '• KASUKU — fasihi, vitabu, na miongozo ya usomaji.\n' +
      'Uliza Akili swali lolote; itakuelekeza kwa mtaalamu sahihi (afya, lugha, kilimo, sheria, biashara...).',
    en:
      'Where to learn more (Laetoli resources):\n' +
      '• JIFUNZE — step-by-step Swahili and subject courses (beginner → mastery).\n' +
      '• SNIL — Swahili → code: great for maths, logic and learning to program.\n' +
      '• KASUKU — literature, books and reading guides.\n' +
      'Ask Akili anything; it routes you to the right expert (health, language, agriculture, law, business…).',
    sources: [{ label: 'Akili KB — Elimu', ref: 'Laetoli (Jifunze / SNIL / Kasuku)' }],
  },
  {
    id: 'elimu-ya-juu',
    cues: ['chuo', 'chuo kikuu', 'udahili', 'kujiunga', 'tcu', 'nacte', 'university', 'college',
      'admission', 'enrol', 'a level', 'diploma', 'shahada', 'degree', 'baada ya kidato'],
    sw:
      'Elimu ya juu na udahili (baada ya sekondari):\n' +
      '• Njia kuu: ASTASHAHADA/STASHAHADA (certificate/diploma) au SHAHADA (degree) vyuoni.\n' +
      '• Vyuo vikuu husimamiwa na TCU; vyuo vya kati/ufundi husimamiwa na NACTE.\n' +
      '• Udahili wa shahada hutegemea ufaulu wa A-Level (ACSEE) au sifa sawa; angalia masharti ya kozi.\n' +
      '• Omba kupitia mfumo wa pamoja wa udahili (central admission) ndani ya muda; andaa vyeti halali.\n' +
      '• Chagua kozi kwa kuangalia kipaji chako, soko la ajira, na gharama.\n' +
      'Hakiki kozi/chuo kimetambuliwa na TCU/NACTE kabla ya kujiunga.',
    en:
      'Higher education and admission (after secondary):\n' +
      '• Main routes: a CERTIFICATE/DIPLOMA or a DEGREE at colleges/universities.\n' +
      '• Universities are regulated by TCU; technical colleges by NACTE.\n' +
      '• Degree admission depends on A-Level (ACSEE) results or equivalent; check course requirements.\n' +
      '• Apply through the central admission system within the deadline; prepare valid certificates.\n' +
      '• Choose a course by your talent, the job market, and cost.\n' +
      'Confirm a course/college is recognised by TCU/NACTE before enrolling.',
    sources: [
      { label: 'TCU — Tume ya Vyuo Vikuu Tanzania' },
      { label: 'NACTE — Baraza la Taifa la Elimu ya Ufundi' },
    ],
  },
  {
    id: 'mkopo-heslb',
    cues: ['heslb', 'mkopo wa elimu', 'mkopo', 'loan', 'scholarship', 'ufadhili', 'ada ya chuo',
      'student loan', 'fees', 'gharama za chuo', 'bodi ya mikopo'],
    sw:
      'Mkopo wa elimu ya juu (HESLB):\n' +
      '• HESLB hutoa mikopo kwa wanafunzi wa elimu ya juu wenye uhitaji, hasa kwa kozi za kipaumbele.\n' +
      '• Omba mtandaoni kupitia mfumo wa HESLB ndani ya muda; jaza taarifa za kweli na ambatanisha vielelezo.\n' +
      '• Mkopo HUREJESHWA baada ya kumaliza na kuanza kazi — ni deni, si zawadi.\n' +
      '• Zingatia vigezo vya uhitaji (yatima, kipato cha familia, ulemavu) vinavyoweza kukupa kipaumbele.\n' +
      '• Tafuta pia ufadhili (scholarships) wa serikali, mashirika na sekta binafsi.\n' +
      'Thibitisha tarehe za mwisho na masharti kwenye tovuti rasmi ya HESLB.',
    en:
      'Higher-education loans (HESLB):\n' +
      '• HESLB provides loans to needy higher-education students, especially for priority courses.\n' +
      '• Apply online through the HESLB system within the deadline; give true information and attach evidence.\n' +
      '• A loan is REPAID after you finish and start working — it is a debt, not a gift.\n' +
      '• Note needs criteria (orphanhood, family income, disability) that may give priority.\n' +
      '• Also look for scholarships from government, NGOs and the private sector.\n' +
      'Confirm deadlines and terms on the official HESLB website.',
    sources: [{ label: 'HESLB — Bodi ya Mikopo ya Wanafunzi wa Elimu ya Juu' }],
  },
  {
    id: 'ufundi-veta',
    cues: ['veta', 'ufundi', 'vocational', 'ujuzi', 'fundi', 'useremala', 'ushonaji', 'umeme',
      'mekanika', 'skills', 'trade', 'mafunzo ya ufundi'],
    sw:
      'Mafunzo ya ufundi stadi (VETA):\n' +
      '• VETA hutoa mafunzo ya ujuzi wa vitendo: useremala, umeme, mekanika, ushonaji, upishi, TEHAMA, n.k.\n' +
      '• Ni njia nzuri kwa anayependa kazi za mikono au kujiajiri — soko la mafundi ni kubwa.\n' +
      '• Mafunzo huwa ya muda mfupi hadi miaka kadhaa; baadhi hutoa vyeti vinavyotambulika kitaifa (NVA).\n' +
      '• Sifa za kujiunga ni nafuu kuliko chuo kikuu; baadhi hupokea hata waliomaliza darasa la saba.\n' +
      '• Ujuzi pamoja na elimu ya biashara hukuwezesha kuanzisha kazi yako mwenyewe.\n' +
      'Tafuta kituo cha VETA kilicho karibu na uangalie kozi zinazotolewa.',
    en:
      'Vocational training (VETA):\n' +
      '• VETA teaches practical skills: carpentry, electrical, mechanics, tailoring, cookery, ICT, etc.\n' +
      '• A great route for hands-on work or self-employment — demand for skilled artisans is high.\n' +
      '• Courses run from short to a few years; some give nationally recognised certificates (NVA).\n' +
      '• Entry requirements are lighter than university; some take even Standard 7 leavers.\n' +
      '• Skills plus business basics let you start your own trade.\n' +
      'Find a nearby VETA centre and check the courses offered.',
    sources: [{ label: 'VETA — Mamlaka ya Elimu na Mafunzo ya Ufundi Stadi' }],
  },
  {
    id: 'kuandika-insha',
    cues: ['insha', 'utungaji', 'kuandika', 'essay', 'writing', 'composition', 'aya', 'paragraph',
      'lugha', 'utungo', 'andika insha'],
    sw:
      'Kuandika insha vizuri:\n' +
      '• Panga kabla: UTANGULIZI (wazo kuu), KIINI (hoja kwa aya), na HITIMISHO (muhtasari/maoni).\n' +
      '• Aya moja = wazo moja; anza na sentensi-mwongozo, kisha eleza na toa mfano.\n' +
      '• Tumia lugha sahihi: alama za uakifishaji, sarufi, na maneno-unganishi (kwa hiyo, hata hivyo, mfano).\n' +
      '• Jibu SWALI hasa lililoulizwa; soma maagizo mara mbili.\n' +
      '• Soma tena ukimaliza ili kurekebisha makosa; andika kwa usafi.\n' +
      'Kwa Kiswahili fasaha na miongozo ya uandishi, tumia Jifunze na Kasuku.',
    en:
      'Writing a good essay:\n' +
      '• Plan first: INTRODUCTION (main idea), BODY (one argument per paragraph), CONCLUSION (summary/opinion).\n' +
      '• One paragraph = one idea; start with a topic sentence, then explain and give an example.\n' +
      '• Use correct language: punctuation, grammar, and linking words (therefore, however, for example).\n' +
      '• Answer the exact QUESTION asked; read the instructions twice.\n' +
      '• Re-read at the end to fix mistakes; write neatly.\n' +
      'For polished Swahili and writing guides, use Jifunze and Kasuku.',
    sources: [
      { label: 'TIE — Taasisi ya Elimu Tanzania', ref: 'Mtaala wa lugha' },
      { label: 'Akili KB — Elimu' },
    ],
  },
  {
    id: 'msongo-mitihani',
    cues: ['msongo', 'mafadhaiko', 'exam stress', 'anxiety', 'hofu', 'wasiwasi', 'kuchoka',
      'shinikizo', 'stress', 'kushindwa'],
    sw:
      'Kukabili msongo wa mitihani:\n' +
      '• Anza maandalizi mapema ili kuepuka kuvuruga (cramming) usiku wa mwisho.\n' +
      '• Gawa masomo katika vipande vidogo; sherehekea hatua ndogo unazofikia.\n' +
      '• Lala vya kutosha, kula vizuri, na fanya mazoezi mepesi — ubongo unahitaji mapumziko.\n' +
      '• Tumia mbinu za kupumua na mapumziko mafupi (mfano dakika 25 soma, 5 pumzika).\n' +
      '• Zungumza na mwalimu, mzazi au rafiki ukihisi shinikizo kupita kiasi; si dalili ya udhaifu.\n' +
      'Mtihani mmoja hauamui maisha yako yote — fanya bidii, lakini tunza afya yako ya akili.',
    en:
      'Coping with exam stress:\n' +
      '• Start preparing early to avoid last-night cramming.\n' +
      '• Break study into small chunks; celebrate small milestones.\n' +
      '• Sleep enough, eat well, and do light exercise — the brain needs rest.\n' +
      '• Use breathing techniques and short breaks (e.g. study 25 min, rest 5).\n' +
      '• Talk to a teacher, parent or friend if pressure feels overwhelming; it is not weakness.\n' +
      'One exam does not decide your whole life — work hard, but protect your mental health.',
    sources: [{ label: 'Akili KB — Elimu', ref: 'Ustawi wa mwanafunzi' }],
  },
];

function tokens(s: string): string[] {
  return norm(s).split(' ').filter(Boolean);
}

function score(entry: KBEntry, qTokens: string[], qNorm: string): number {
  let s = 0;
  for (const c of entry.cues) {
    if (hasCue(qNorm, c)) s += 2;
    else if (qTokens.includes(c)) s += 1;
  }
  return s;
}

function bestEntry(text: string): { entry: KBEntry; score: number } {
  const qNorm = norm(text);
  const qTokens = tokens(text);
  let best = KB[0];
  let bestScore = -1;
  for (const e of KB) {
    const s = score(e, qTokens, qNorm);
    if (s > bestScore) {
      best = e;
      bestScore = s;
    }
  }
  return { entry: best, score: bestScore };
}

export const elimuExpert: DomainExpert = {
  id: 'elimu-msingi',
  domain: 'elimu',
  label: 'Elimu',

  match(q: AkiliQuery): number {
    return cueScore(q.text ?? '', ELIMU_CUES);
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const { entry, score: s } = bestEntry(q.text ?? '');
    const confidence: AkiliConfidence = s >= 4 ? 'high' : s >= 2 ? 'medium' : 'low';

    return {
      domain: 'elimu',
      expert: elimuExpert.id,
      text: entry.en ? { sw: entry.sw, en: entry.en } : { sw: entry.sw },
      confidence,
      sources: [...entry.sources, { label: 'Akili KB — Elimu', ref: 'Laetoli' }],
      data: { entry: entry.id, score: s },
    };
  },
};

export default elimuExpert;
