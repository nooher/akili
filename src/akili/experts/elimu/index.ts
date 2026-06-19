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
  // English
  'education', 'school', 'student', 'teacher', 'class', 'form', 'subject', 'exam',
  'exams', 'study', 'learn', 'learning', 'pass', 'explain', 'definition', 'concept',
  'maths', 'math', 'mathematics', 'science', 'physics', 'chemistry', 'biology',
  'geography', 'history', 'revision', 'notes',
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
