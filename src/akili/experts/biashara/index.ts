// experts/biashara/index.ts — Akili's Biashara (small business & money) expert.
//
// A sovereign, curated Kiswahili knowledge base for financial literacy and small
// enterprise: kuanzisha biashara, mtaji, faida/hasara, kodi (TRA/VAT), pesa za simu
// (M-Pesa/Tigo Pesa/Airtel Money), na akiba/SACCOS. Pure/deterministic TS — no
// external LLM, no network. NOT personal financial advice.

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

const BIASHARA_CUES = [
  // Kiswahili — business & money
  'biashara', 'mfanyabiashara', 'mjasiriamali', 'ujasiriamali', 'duka', 'kampuni',
  'mtaji', 'faida', 'hasara', 'mapato', 'matumizi', 'gharama', 'bei', 'mauzo',
  'mteja', 'wateja', 'soko', 'kodi', 'ushuru', 'leseni', 'usajili',
  // Kiswahili — finance
  'pesa', 'fedha', 'akiba', 'mkopo', 'riba', 'benki', 'sacco', 'vicoba', 'kibubu',
  'mpesa', 'm pesa', 'tigo pesa', 'airtel money', 'simu banking', 'malipo',
  // English
  'business', 'entrepreneur', 'startup', 'shop', 'company', 'capital', 'profit',
  'loss', 'income', 'expenses', 'cost', 'price', 'sales', 'customer', 'customers',
  'market', 'tax', 'vat', 'licence', 'license', 'money', 'savings', 'loan',
  'interest', 'bank', 'mobile money', 'payment', 'budget', 'finance',
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
    id: 'kuanzisha-biashara',
    cues: ['kuanzisha', 'biashara', 'usajili', 'leseni', 'duka', 'start', 'startup', 'register', 'licence', 'business'],
    sw:
      'Kuanzisha biashara:\n' +
      '• Anza na wazo linalotatua tatizo la wateja na uhakikishe kuna soko.\n' +
      '• Sajili jina la biashara BRELA; chukua leseni ya biashara halmashauri yako.\n' +
      '• Pata namba ya mlipakodi (TIN) kutoka TRA.\n' +
      '• Tenganisha pesa za biashara na za nyumbani; weka kumbukumbu za mauzo na matumizi tangu siku ya kwanza.\n' +
      '• Anza kidogo, jaribu, kisha kua taratibu kulingana na faida.',
    en:
      'Starting a business:\n' +
      '• Begin with an idea that solves a customer problem and confirm there is a market.\n' +
      '• Register the business name at BRELA; get a business licence from your council.\n' +
      '• Obtain a Taxpayer Identification Number (TIN) from TRA.\n' +
      '• Keep business money separate from household money; record sales and expenses from day one.\n' +
      '• Start small, test, then grow gradually with profit.',
    sources: [
      { label: 'BRELA — Wakala wa Usajili wa Biashara' },
      { label: 'TRA — Mamlaka ya Mapato Tanzania' },
    ],
  },
  {
    id: 'mtaji',
    cues: ['mtaji', 'capital', 'mkopo', 'loan', 'fedha za kuanzia', 'funding', 'sacco', 'benki', 'bank'],
    sw:
      'Mtaji (pesa za kuanzia/kukuza):\n' +
      '• Vyanzo: akiba yako, familia/marafiki, vikundi (VICOBA/SACCOS), mikopo ya benki au taasisi ndogo.\n' +
      '• Anza na mtaji mdogo unaoweza kuumudu; epuka mkopo mkubwa kabla biashara haijasimama.\n' +
      '• Mkopo una RIBA — hesabu kama faida inaweza kulipa riba na bado kubaki na ziada.\n' +
      '• Andaa mpango rahisi wa biashara unaoonyesha mapato, gharama na muda wa kurudisha mtaji.',
    en:
      'Capital (startup/growth money):\n' +
      '• Sources: your savings, family/friends, groups (VICOBA/SACCOS), bank or microfinance loans.\n' +
      '• Start with capital you can afford; avoid big loans before the business stands.\n' +
      '• A loan carries INTEREST — check that profit can cover the interest and still leave a surplus.\n' +
      '• Prepare a simple business plan showing income, costs and payback time.',
    sources: [{ label: 'Akili KB — Biashara', ref: 'Misingi ya mtaji' }],
  },
  {
    id: 'faida-hasara',
    cues: ['faida', 'hasara', 'mapato', 'gharama', 'bei', 'profit', 'loss', 'income', 'cost', 'pricing', 'margin'],
    sw:
      'Faida na hasara (misingi):\n' +
      '• FAIDA = mauzo (mapato) − gharama zote (manunuzi, kodi ya pango, usafiri, mishahara, n.k.).\n' +
      '• Ukipata namba hasi, ni HASARA — punguza gharama au ongeza mauzo/bei.\n' +
      '• Panga bei kwa kujumlisha gharama ya bidhaa + faida unayotaka, huku ukizingatia bei ya soko.\n' +
      '• Weka kumbukumbu za kila siku; bila kumbukumbu huwezi kujua kama unapata faida.\n' +
      '• Tofautisha PESA TASLIMU na faida — mauzo ya mkopo si pesa mkononi bado.',
    en:
      'Profit and loss (basics):\n' +
      '• PROFIT = sales (income) − all costs (stock, rent, transport, wages, etc.).\n' +
      '• A negative number is a LOSS — cut costs or raise sales/price.\n' +
      '• Set price as cost of goods + desired profit, while respecting the market price.\n' +
      '• Keep daily records; without records you cannot know if you are making a profit.\n' +
      '• Distinguish CASH from profit — credit sales are not yet money in hand.',
    sources: [{ label: 'Akili KB — Biashara', ref: 'Uhasibu rahisi' }],
  },
  {
    id: 'kodi-tra',
    cues: ['kodi', 'ushuru', 'tra', 'vat', 'tin', 'tax', 'risiti', 'efd', 'receipt', 'presumptive'],
    sw:
      'Kodi (misingi ya TRA):\n' +
      '• Sajili na upate TIN; biashara hutozwa kodi kulingana na mapato.\n' +
      '• Biashara ndogo zenye mauzo madogo mara nyingi hulipa KODI YA MAKADIRIO (presumptive) badala ya kuandaa hesabu kamili.\n' +
      '• VAT (Kodi ya Ongezeko la Thamani, 18%) hutozwa biashara zinazofikia kiwango cha mauzo kinachotakiwa kujisajili.\n' +
      '• Toa RISITI ya kielektroniki (EFD/risiti za TRA) kwa kila mauzo — ni takwa la kisheria.\n' +
      '• Lipa kodi kwa wakati ili kuepuka faini; weka kumbukumbu safi.',
    en:
      'Tax (TRA basics):\n' +
      '• Register for a TIN; businesses are taxed based on income.\n' +
      '• Small businesses with low turnover often pay PRESUMPTIVE tax instead of full accounts.\n' +
      '• VAT (Value Added Tax, 18%) applies to businesses that reach the registration turnover threshold.\n' +
      '• Issue electronic RECEIPTS (EFD/TRA receipts) for every sale — it is a legal requirement.\n' +
      '• Pay on time to avoid penalties; keep clean records.',
    sources: [{ label: 'TRA — Mamlaka ya Mapato Tanzania', ref: 'Kodi ya mapato & VAT' }],
  },
  {
    id: 'pesa-za-simu',
    cues: ['pesa za simu', 'mpesa', 'm pesa', 'tigo pesa', 'airtel money', 'mobile money', 'mtandao', 'malipo', 'kutuma pesa', 'send money'],
    sw:
      'Pesa za simu (M-Pesa, Tigo Pesa, Airtel Money — jinsi zinavyofanya kazi):\n' +
      '• Sajili akaunti ya pesa za simu kwa kitambulisho; pata namba siri (PIN) — usishirikishe mtu yeyote.\n' +
      '• WEKA pesa (deposit) kupitia wakala, kisha unaweza KUTUMA, KULIPIA bili/bidhaa, au KUTOA kupitia wakala.\n' +
      '• Miamala mingi hutoza ada ndogo; angalia ada kabla ya kutuma.\n' +
      '• Hakikisha namba ya mpokeaji ni sahihi; hifadhi ujumbe wa uthibitisho.\n' +
      '• Tahadhari na utapeli: hakuna mtu halali atakuomba PIN yako au "kurudisha pesa iliyotumwa kimakosa".',
    en:
      'Mobile money (M-Pesa, Tigo Pesa, Airtel Money — how it works):\n' +
      '• Register an account with your ID; set a secret PIN — never share it.\n' +
      '• DEPOSIT cash via an agent, then SEND, PAY bills/goods, or WITHDRAW through an agent.\n' +
      '• Most transactions carry a small fee; check the fee before sending.\n' +
      '• Confirm the recipient number is correct; keep the confirmation SMS.\n' +
      '• Beware fraud: no legitimate person asks for your PIN or to "reverse money sent by mistake".',
    sources: [
      { label: 'TCRA — Mamlaka ya Mawasiliano' },
      { label: 'BOT — Benki Kuu ya Tanzania', ref: 'Huduma za fedha kidijitali' },
    ],
  },
  {
    id: 'akiba-saccos',
    cues: ['akiba', 'savings', 'sacco', 'saccos', 'vicoba', 'kibubu', 'kuweka akiba', 'save', 'group', 'mfuko'],
    sw:
      'Kuweka akiba na vikundi (SACCOS/VICOBA):\n' +
      '• Weka akiba kidogo mara kwa mara — hata kiasi kidogo cha kila siku hukua kwa muda.\n' +
      '• SACCOS na VICOBA ni vikundi vya kuweka na kukopa: wanachama huchangia, kisha hukopeshana kwa riba nafuu.\n' +
      '• Faida: nidhamu ya kuweka akiba, mikopo rahisi, na kujengeana mtaji wa pamoja.\n' +
      '• Chagua kikundi/SACCOS iliyosajiliwa na yenye uongozi wa uwazi; soma masharti kabla ya kujiunga.\n' +
      '• Tenga akiba ya dharura kabla ya kuwekeza kwenye vitu vya hatari.',
    en:
      'Saving and groups (SACCOS/VICOBA):\n' +
      '• Save a little regularly — even small daily amounts grow over time.\n' +
      '• SACCOS and VICOBA are savings-and-credit groups: members contribute, then lend to each other at affordable interest.\n' +
      '• Benefits: saving discipline, easier loans, and building shared capital.\n' +
      '• Choose a registered group/SACCO with transparent leadership; read the terms before joining.\n' +
      '• Set aside an emergency fund before investing in risky ventures.',
    sources: [
      { label: 'TCDC — Tume ya Maendeleo ya Ushirika' },
      { label: 'Akili KB — Biashara' },
    ],
  },
];

const DISCLAIMER_SW =
  'Kumbuka: haya ni maelezo ya jumla kwa elimu tu — SI ushauri wa kifedha binafsi. ' +
  'Kwa maamuzi makubwa ya pesa, shauriana na mtaalamu wa fedha au taasisi husika.';
const DISCLAIMER_EN =
  'Note: this is general information for education only — NOT personal financial advice. ' +
  'For major money decisions, consult a finance professional or the relevant institution.';

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

export const biasharaExpert: DomainExpert = {
  id: 'biashara-msingi',
  domain: 'biashara',
  label: 'Biashara',

  match(q: AkiliQuery): number {
    return cueScore(q.text ?? '', BIASHARA_CUES);
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const { entry, score: s } = bestEntry(q.text ?? '');
    const confidence: AkiliConfidence = s >= 4 ? 'high' : s >= 2 ? 'medium' : 'low';

    const sw = `${entry.sw}\n\n${DISCLAIMER_SW}`;
    const en = entry.en ? `${entry.en}\n\n${DISCLAIMER_EN}` : undefined;

    return {
      domain: 'biashara',
      expert: biasharaExpert.id,
      text: en ? { sw, en } : { sw },
      confidence,
      sources: [...entry.sources, { label: 'Akili KB — Biashara', ref: 'Laetoli' }],
      data: { entry: entry.id, score: s },
    };
  },
};

export default biasharaExpert;
