// experts/sheria/index.ts — Akili's Sheria (Tanzanian law & civic rights) expert.
//
// A sovereign, curated Kiswahili knowledge base covering the basics every citizen
// should know: haki za msingi (Katiba), haki za mtumiaji, ndoa & mirathi, ajira,
// na jinsi ya kupata msaada wa kisheria. Pure/deterministic TS — no external LLM,
// no network. NOT legal advice; every answer points the user to a wakili.

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliQuery,
  AkiliSource,
  DomainExpert,
} from '../../types';

// ── normalisation + matching helpers ───────────────────────────────────────────
const STRIP = /[^\p{L}\p{N}']+/gu;
const norm = (s: string): string =>
  (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ').replace(/\s+/g, ' ').trim();

/** Whole-word / phrase membership (a cue never fires inside a larger word). */
function hasCue(hay: string, cue: string): boolean {
  return ` ${hay} `.includes(` ${cue} `) || hay === cue;
}

/**
 * Saturating distinct-cue score → 0..1. 1 hit → 0.55, 2 → 0.78, 3+ → 0.92, 0 → 0.
 * Cheap and deterministic; identical curve to the other Akili KB experts.
 */
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

const SHERIA_CUES = [
  // Kiswahili — system & rights
  'sheria', 'haki', 'haki za', 'katiba', 'mahakama', 'wakili', 'hakimu', 'jaji',
  'kesi', 'mashtaka', 'mshtakiwa', 'mlalamikaji', 'polisi', 'dhamana', 'kifungo',
  'kutozwa', 'kosa', 'jinai', 'madai', 'kisheria',
  // Kiswahili — topics
  'mtumiaji', 'mlaji', 'mteja', 'bidhaa', 'huduma', 'ndoa', 'talaka', 'mirathi',
  'urithi', 'wosia', 'ajira', 'mfanyakazi', 'mwajiri', 'mkataba', 'mshahara',
  'kufukuzwa', 'likizo', 'ardhi', 'kumiliki', 'usajili',
  // English
  'law', 'legal', 'rights', 'constitution', 'court', 'lawyer', 'advocate',
  'arrest', 'arrested', 'bail', 'consumer', 'marriage', 'divorce', 'inheritance',
  'will', 'employment', 'employee', 'employer', 'contract', 'wages', 'dismissal',
  'tenant', 'land', 'legal aid', 'sue', 'compensation',
];

// ── the curated knowledge base ──────────────────────────────────────────────────
interface KBEntry {
  id: string;
  cues: string[]; // retrieval keywords (token overlap)
  sw: string;
  en?: string;
  sources: AkiliSource[];
}

const KB: KBEntry[] = [
  {
    id: 'haki-za-msingi',
    cues: ['haki', 'msingi', 'katiba', 'uhuru', 'rights', 'constitution', 'freedom'],
    sw:
      'Haki za msingi (Katiba ya Jamhuri ya Muungano wa Tanzania):\n' +
      '• Haki ya kuishi na usalama wa mwili.\n' +
      '• Usawa mbele ya sheria — bila ubaguzi wa rangi, kabila, jinsia, dini au siasa.\n' +
      '• Uhuru wa kutoa maoni, kuabudu, kukusanyika na kutembea.\n' +
      '• Haki ya faragha na heshima ya utu.\n' +
      '• Haki ya kusikilizwa kwa haki mahakamani (fair hearing) na kudhaniwa huna hatia hadi ithibitishwe.\n' +
      'Ukivunjiwa haki hizi, unaweza kufungua kesi ya kikatiba Mahakama Kuu.',
    en:
      'Basic rights (Constitution of the United Republic of Tanzania):\n' +
      '• Right to life and personal security.\n' +
      '• Equality before the law — no discrimination by race, tribe, sex, religion or politics.\n' +
      '• Freedom of expression, worship, assembly and movement.\n' +
      '• Right to privacy and human dignity.\n' +
      '• Right to a fair hearing and the presumption of innocence.\n' +
      'If these are violated you may file a constitutional petition in the High Court.',
    sources: [
      { label: 'Katiba ya Tanzania', ref: 'Sehemu ya III — Haki za Msingi (Ibara 12–29)' },
    ],
  },
  {
    id: 'kukamatwa-polisi',
    cues: ['polisi', 'kukamatwa', 'nimekamatwa', 'kamatwa', 'arrest', 'arrested', 'dhamana', 'bail', 'mahakamani'],
    sw:
      'Ukikamatwa na polisi una haki hizi:\n' +
      '• Kuelezwa sababu ya kukamatwa kwa lugha unayoielewa.\n' +
      '• Kukaa kimya — huna lazima ya kujishtaki mwenyewe.\n' +
      '• Kuwasiliana na ndugu au wakili.\n' +
      '• Kupelekwa mahakamani ndani ya muda unaofaa (kawaida saa 24, bila kuhesabu safari).\n' +
      '• Kuomba dhamana kwa makosa yanayodhaminika.\n' +
      'Usitie saini maelezo usiyoyaelewa; sisitiza kuwepo kwa wakili.',
    en:
      'If you are arrested you have the right to:\n' +
      '• Be told the reason in a language you understand.\n' +
      '• Remain silent — you cannot be forced to incriminate yourself.\n' +
      '• Contact a relative or a lawyer.\n' +
      '• Be brought before a court within a reasonable time (usually 24 hours, travel excluded).\n' +
      '• Apply for bail for bailable offences.\n' +
      'Do not sign a statement you do not understand; insist on a lawyer.',
    sources: [
      { label: 'Katiba ya Tanzania', ref: 'Ibara 13 & 15 — haki mbele ya sheria' },
      { label: 'Sheria ya Mwenendo wa Makosa ya Jinai (CPA)' },
    ],
  },
  {
    id: 'haki-za-mtumiaji',
    cues: ['mtumiaji', 'mlaji', 'mteja', 'bidhaa', 'huduma', 'consumer', 'product', 'service'],
    sw:
      'Haki za mtumiaji (mlaji):\n' +
      '• Kupata bidhaa salama na zenye ubora ulioelezwa.\n' +
      '• Kupata taarifa za kweli — bei, kipimo, tarehe ya mwisho wa matumizi.\n' +
      '• Kurudisha bidhaa yenye kasoro au kudai fidia.\n' +
      '• Kulalamika. Hifadhi risiti kama ushahidi.\n' +
      'Lalamiko linaweza kupelekwa kwa muuzaji, halmashauri, au mamlaka husika (mfano FCC kwa ushindani, EWURA/TCRA kwa huduma za nishati/mawasiliano).',
    en:
      'Consumer rights:\n' +
      '• Safe goods of the quality described.\n' +
      '• Truthful information — price, measure, expiry date.\n' +
      '• Return of defective goods or compensation.\n' +
      '• To complain. Keep your receipt as evidence.\n' +
      'Complaints can go to the seller, the local council, or the relevant authority (e.g. FCC for competition, EWURA/TCRA for energy/communications).',
    sources: [
      { label: 'Sheria ya Ushindani wa Haki (Fair Competition Act)' },
      { label: 'FCC — Tume ya Ushindani' },
    ],
  },
  {
    id: 'ndoa',
    cues: ['ndoa', 'talaka', 'marriage', 'divorce', 'mke', 'mume', 'kuoa', 'kuolewa'],
    sw:
      'Ndoa (msingi wa kisheria):\n' +
      '• Aina za ndoa: ya mke mmoja (monogamous) na ya wake wengi (polygamous), pamoja na ndoa za kidini na za kimila.\n' +
      '• Ndoa hutakiwa kusajiliwa; cheti cha ndoa ni ushahidi muhimu.\n' +
      '• Mali zilizochumwa pamoja zinazingatiwa wakati wa mgawanyo.\n' +
      '• Talaka hupatikana mahakamani baada ya kuthibitisha ndoa imevunjika kabisa; mahakama hujali ustawi wa watoto.\n' +
      'Masuala ya matunzo ya watoto na mgawanyo wa mali yanapaswa kuamuliwa na mahakama.',
    en:
      'Marriage (legal basics):\n' +
      '• Types: monogamous and polygamous, plus religious and customary marriages.\n' +
      '• Marriages should be registered; a marriage certificate is key evidence.\n' +
      '• Jointly acquired property is considered on division.\n' +
      '• Divorce is granted by a court once the marriage is shown to have irreparably broken down; the court prioritises children\'s welfare.\n' +
      'Child maintenance and property division should be decided by a court.',
    sources: [{ label: 'Sheria ya Ndoa ya Tanzania (Law of Marriage Act)' }],
  },
  {
    id: 'mirathi',
    cues: ['mirathi', 'urithi', 'wosia', 'inheritance', 'will', 'kufa', 'marehemu', 'msimamizi'],
    sw:
      'Mirathi (urithi):\n' +
      '• Ukiandika WOSIA (will), mali zako zinagawanywa kama ulivyoelekeza; ni vyema uweke mashahidi na uhifadhi nakala salama.\n' +
      '• Bila wosia, mirathi hufuata sheria/mila husika (kidini, kimila au ya kawaida) kulingana na muktadha wa marehemu.\n' +
      '• Mahakama humteua MSIMAMIZI WA MIRATHI (administrator) kukusanya na kugawa mali.\n' +
      '• Wajane na watoto wana haki ya kulindwa; usidhulumiwe urithi.\n' +
      'Mirathi yenye migogoro inahitaji msaada wa wakili na mahakama.',
    en:
      'Inheritance:\n' +
      '• A WILL distributes your estate as you direct; use witnesses and keep a safe copy.\n' +
      '• Without a will, inheritance follows the applicable law/custom (religious, customary or statutory) for the deceased\'s context.\n' +
      '• A court appoints an ADMINISTRATOR to collect and distribute the estate.\n' +
      '• Widows and children have protected rights; do not be deprived of inheritance.\n' +
      'Contested estates need a lawyer and the court.',
    sources: [
      { label: 'Sheria za Mirathi za Tanzania', ref: 'Indian Succession / Islamic / Customary law kulingana na muktadha' },
    ],
  },
  {
    id: 'ajira',
    cues: ['ajira', 'mfanyakazi', 'mwajiri', 'mkataba', 'mshahara', 'kufukuzwa', 'likizo',
      'employment', 'employee', 'employer', 'contract', 'wages', 'dismissal', 'leave'],
    sw:
      'Haki za mfanyakazi (ajira):\n' +
      '• Mkataba wa kazi (ulioandikwa kwa ajira ndefu) ukieleza kazi, mshahara na masharti.\n' +
      '• Mshahara usiopungua kima cha chini cha sekta yako, ukilipwa kwa wakati.\n' +
      '• Saa za kazi zinazokubalika, mapumziko, na malipo ya ziada (overtime).\n' +
      '• Likizo ya mwaka yenye malipo na likizo ya uzazi/ugonjwa.\n' +
      '• Kutofukuzwa kazi bila sababu halali na bila utaratibu wa haki.\n' +
      'Mgogoro wa ajira hupelekwa Tume ya Usuluhishi na Uamuzi (CMA).',
    en:
      'Employee (labour) rights:\n' +
      '• An employment contract (written for longer engagements) stating duties, pay and terms.\n' +
      '• At least the sector minimum wage, paid on time.\n' +
      '• Lawful working hours, rest, and overtime pay.\n' +
      '• Paid annual leave and maternity/sick leave.\n' +
      '• No dismissal without valid reason and a fair procedure.\n' +
      'Labour disputes go to the Commission for Mediation and Arbitration (CMA).',
    sources: [
      { label: 'Sheria ya Ajira na Mahusiano Kazini (ELRA 2004)' },
      { label: 'CMA — Tume ya Usuluhishi na Uamuzi' },
    ],
  },
  {
    id: 'msaada-wa-kisheria',
    cues: ['msaada', 'kisheria', 'legal aid', 'wakili', 'bure', 'lawyer', 'free', 'help'],
    sw:
      'Kupata msaada wa kisheria (Legal Aid):\n' +
      '• Kama huwezi kumudu wakili, tafuta watoa-msaada wa kisheria walioidhinishwa (legal aid providers) chini ya Sheria ya Msaada wa Kisheria.\n' +
      '• Mashirika kama WLAC, LHRC, na vituo vya msaada vya vyuo vya sheria husaidia bila malipo au kwa gharama ndogo.\n' +
      '• Ofisi za maafisa wa msaada wa kisheria zipo ngazi ya wilaya.\n' +
      '• Andaa nyaraka zako (mikataba, risiti, vitambulisho) kabla ya kuonana nao.\n' +
      'Kwa makosa ya jinai mazito, mahakama inaweza kukupatia wakili.',
    en:
      'Getting legal aid:\n' +
      '• If you cannot afford a lawyer, seek accredited legal aid providers under the Legal Aid Act.\n' +
      '• Bodies like WLAC, LHRC and law-school clinics help for free or at low cost.\n' +
      '• Legal aid officers operate at district level.\n' +
      '• Prepare your documents (contracts, receipts, IDs) before meeting them.\n' +
      'For serious criminal charges, the court may assign you counsel.',
    sources: [
      { label: 'Sheria ya Msaada wa Kisheria (Legal Aid Act 2017)' },
      { label: 'LHRC / WLAC' },
    ],
  },
];

const DISCLAIMER_SW =
  'Kumbuka: haya ni maelezo ya jumla kwa elimu tu — SI ushauri wa kisheria. ' +
  'Kwa hali yako halisi, tafadhali ona wakili au mtoa-msaada wa kisheria.';
const DISCLAIMER_EN =
  'Note: this is general information for education only — NOT legal advice. ' +
  'For your actual situation, please see a lawyer or legal-aid provider.';

// ── retrieval: best KB entry by token overlap + cue match ───────────────────────
function tokens(s: string): string[] {
  return norm(s).split(' ').filter(Boolean);
}

function score(entry: KBEntry, qTokens: string[], qNorm: string): number {
  let s = 0;
  for (const c of entry.cues) {
    if (hasCue(qNorm, c)) s += 2; // exact cue phrase/word
    else if (qTokens.includes(c)) s += 1; // bare token overlap
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

export const sheriaExpert: DomainExpert = {
  id: 'sheria-msingi',
  domain: 'sheria',
  label: 'Sheria',

  match(q: AkiliQuery): number {
    return cueScore(q.text ?? '', SHERIA_CUES);
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const { entry, score: s } = bestEntry(q.text ?? '');
    const confidence: AkiliConfidence = s >= 4 ? 'high' : s >= 2 ? 'medium' : 'low';

    const sw = `${entry.sw}\n\n${DISCLAIMER_SW}`;
    const en = entry.en ? `${entry.en}\n\n${DISCLAIMER_EN}` : undefined;

    return {
      domain: 'sheria',
      expert: sheriaExpert.id,
      text: en ? { sw, en } : { sw },
      confidence,
      sources: [...entry.sources, { label: 'Akili KB — Sheria', ref: 'Laetoli' }],
      data: { entry: entry.id, score: s },
    };
  },
};

export default sheriaExpert;
