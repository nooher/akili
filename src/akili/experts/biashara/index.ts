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
  // Kiswahili — added
  'mpango wa biashara', 'bajeti', 'kumbukumbu', 'hesabu za biashara', 'utangazaji',
  'masoko', 'matangazo', 'mtandaoni', 'bima', 'hatari', 'deni', 'madeni', 'hisa',
  'ushirika', 'brela', 'tin', 'efd', 'risiti', 'kuuza', 'wadeni',
  // English
  'business', 'entrepreneur', 'startup', 'shop', 'company', 'capital', 'profit',
  'loss', 'income', 'expenses', 'cost', 'price', 'sales', 'customer', 'customers',
  'market', 'tax', 'vat', 'licence', 'license', 'money', 'savings', 'loan',
  'interest', 'bank', 'mobile money', 'payment', 'budget', 'finance',
  // English — added
  'business plan', 'bookkeeping', 'records', 'marketing', 'advertising', 'branding',
  'online', 'social media', 'insurance', 'risk', 'debt', 'credit', 'shares',
  'cooperative', 'receipt', 'selling', 'pricing', 'cashflow', 'cash flow',
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
  {
    id: 'mpango-wa-biashara',
    cues: ['mpango wa biashara', 'mpango', 'business plan', 'plan', 'wazo', 'idea', 'mkakati',
      'lengo', 'utafiti wa soko', 'market research'],
    sw:
      'Mpango wa biashara (rahisi lakini muhimu):\n' +
      '• WAZO & TATIZO: unauza nini, na unatatua tatizo gani la wateja?\n' +
      '• SOKO: wateja wako ni nani, wapo wapi, na washindani wako ni akina nani?\n' +
      '• BEI & MAUZO: utauzaje, kwa bei gani, na unatarajia kuuza kiasi gani?\n' +
      '• GHARAMA & MTAJI: utahitaji pesa kiasi gani kuanza na kuendesha kila mwezi?\n' +
      '• FAIDA & MUDA: utaanza kupata faida lini, na mtaji utarejea baada ya muda gani?\n' +
      'Mpango wa kurasa 1–2 unatosha kuanzia; uboreshe unapojifunza zaidi kutoka sokoni.',
    en:
      'Business plan (simple but essential):\n' +
      '• IDEA & PROBLEM: what do you sell, and what customer problem does it solve?\n' +
      '• MARKET: who are your customers, where are they, and who are your competitors?\n' +
      '• PRICE & SALES: how will you sell, at what price, and how much do you expect to sell?\n' +
      '• COSTS & CAPITAL: how much do you need to start and to run each month?\n' +
      '• PROFIT & TIME: when will you start profiting, and how soon will capital return?\n' +
      'A 1–2 page plan is enough to start; refine it as you learn from the market.',
    sources: [{ label: 'Akili KB — Biashara', ref: 'Mpango wa biashara' }],
  },
  {
    id: 'kumbukumbu-bajeti',
    cues: ['kumbukumbu', 'hesabu za biashara', 'bookkeeping', 'records', 'bajeti', 'budget',
      'daftari', 'ledger', 'cashflow', 'cash flow', 'mtiririko wa fedha'],
    sw:
      'Kumbukumbu na bajeti (uhasibu rahisi):\n' +
      '• Weka DAFTARI moja: andika kila MAUZO (kinachoingia) na kila MATUMIZI (kinachotoka) kwa tarehe.\n' +
      '• Hifadhi risiti zote; linganisha pesa za mkononi na daftari kila siku/jioni.\n' +
      '• BAJETI: panga mapema kiasi cha kutumia kwa manunuzi, pango, usafiri na akiba.\n' +
      '• Fuatilia MTIRIRIKO WA FEDHA — biashara inaweza kuwa na faida lakini ikakosa pesa taslimu (cashflow).\n' +
      '• Jilipe mshahara wako badala ya kuchukua pesa za biashara ovyo.\n' +
      'Programu rahisi za simu au daftari la kawaida zote zinafaa — muhimu ni uthabiti.',
    en:
      'Records and budgeting (simple bookkeeping):\n' +
      '• Keep ONE book: record every SALE (money in) and every EXPENSE (money out) with the date.\n' +
      '• Keep all receipts; reconcile cash on hand against the book each day/evening.\n' +
      '• BUDGET: plan in advance what to spend on stock, rent, transport and savings.\n' +
      '• Track CASH FLOW — a business can be profitable yet run out of cash.\n' +
      '• Pay yourself a wage rather than randomly taking business money.\n' +
      'A simple phone app or an ordinary notebook both work — consistency is what matters.',
    sources: [{ label: 'Akili KB — Biashara', ref: 'Uhasibu na bajeti' }],
  },
  {
    id: 'masoko-wateja',
    cues: ['masoko', 'utangazaji', 'matangazo', 'marketing', 'advertising', 'branding', 'mtandaoni',
      'online', 'social media', 'mitandao ya kijamii', 'wateja', 'customers', 'kutangaza'],
    sw:
      'Masoko na kuhudumia wateja:\n' +
      '• Elewa mteja wako: anahitaji nini, analalamika nini, na yuko wapi (sokoni au mtandaoni)?\n' +
      '• Jenga JINA (brand) thabiti: jina, nembo, na ubora unaotabirika hujenga uaminifu.\n' +
      '• Tumia njia nafuu: maneno ya mdomo (referrals), WhatsApp/Instagram/TikTok, na ushiriki wa jamii.\n' +
      '• Huduma bora kwa mteja huleta wateja warudio — wao ni nafuu kuliko kutafuta wapya.\n' +
      '• Pokea malalamiko kwa heshima na yarekebishe; mteja mmoja asiyeridhika huwaambia wengi.\n' +
      'Pima kinachofanya kazi (nani alinunua kwa sababu gani) kisha ongeza juhudi huko.',
    en:
      'Marketing and customer service:\n' +
      '• Understand your customer: what they need, what they complain about, and where they are (market or online).\n' +
      '• Build a consistent BRAND: a name, a logo, and predictable quality build trust.\n' +
      '• Use cheap channels: word of mouth (referrals), WhatsApp/Instagram/TikTok, and community presence.\n' +
      '• Great service brings repeat customers — they are cheaper than finding new ones.\n' +
      '• Handle complaints respectfully and fix them; one unhappy customer tells many.\n' +
      'Measure what works (who bought and why), then put more effort there.',
    sources: [{ label: 'Akili KB — Biashara', ref: 'Masoko ya biashara ndogo' }],
  },
  {
    id: 'bima-hatari',
    cues: ['bima', 'insurance', 'hatari', 'risk', 'kuwaka moto', 'wizi', 'kinga', 'protection',
      'majanga', 'dharura'],
    sw:
      'Bima na kudhibiti hatari:\n' +
      '• Biashara inakabili hatari: moto, wizi, mafuriko, ugonjwa, au mteja asiyelipa.\n' +
      '• BIMA hubadilisha hasara kubwa isiyotarajiwa kuwa malipo madogo ya kawaida (premium).\n' +
      '• Aina za kawaida: bima ya mali/moto, bima ya mizigo, bima ya afya, na bima ya gari (ni lazima kisheria).\n' +
      '• Soma masharti vizuri: nini kimebimwa, kiasi cha kulipwa, na vighairi (exclusions).\n' +
      '• Tumia kampuni za bima zilizosajiliwa; thibitisha usajili na TIRA.\n' +
      '• Mbali na bima: tenga akiba ya dharura na usiweke mayai yote kapu moja.',
    en:
      'Insurance and managing risk:\n' +
      '• A business faces risks: fire, theft, floods, illness, or a non-paying customer.\n' +
      '• INSURANCE turns a large unexpected loss into a small regular payment (premium).\n' +
      '• Common types: property/fire, goods-in-transit, health, and motor cover (legally required).\n' +
      '• Read the terms: what is covered, the payout, and the exclusions.\n' +
      '• Use registered insurers; confirm registration with TIRA.\n' +
      '• Beyond insurance: keep an emergency fund and don\'t put all eggs in one basket.',
    sources: [
      { label: 'TIRA — Mamlaka ya Usimamizi wa Bima Tanzania' },
      { label: 'Akili KB — Biashara' },
    ],
  },
  {
    id: 'madeni-mikopo',
    cues: ['deni', 'madeni', 'wadeni', 'debt', 'credit', 'kukopesha', 'kudai', 'mteja anadaiwa',
      'kulipa deni', 'overdue', 'mauzo ya mkopo'],
    sw:
      'Kusimamia madeni na mauzo ya mkopo:\n' +
      '• Ukiuza kwa mkopo, ANDIKA: nani, kiasi gani, tarehe ya kulipa — bila kumbukumbu ni hasara.\n' +
      '• Weka kikomo cha mkopo unaotoa; usikopeshe zaidi ya unavyoweza kuvumilia kupoteza.\n' +
      '• Fuatilia wadeni kwa heshima lakini kwa uthabiti; kumbushia kabla na baada ya tarehe.\n' +
      '• Wewe ukikopa: kopa kwa lengo la kuzalisha (mtaji), si kwa matumizi; hakikisha faida inalipa riba.\n' +
      '• Epuka kuchukua mkopo mmoja kulipa mwingine (mzunguko wa madeni).\n' +
      'Deni likigoma kabisa, mkataba/risiti ni ushahidi; suluhisho la mazungumzo ni bora kuliko ugomvi.',
    en:
      'Managing debts and credit sales:\n' +
      '• If you sell on credit, RECORD it: who, how much, due date — without records it becomes a loss.\n' +
      '• Set a credit limit; never lend more than you can afford to lose.\n' +
      '• Follow up debtors respectfully but firmly; remind before and after the due date.\n' +
      '• When you borrow: borrow to produce (capital), not to consume; ensure profit covers the interest.\n' +
      '• Avoid taking one loan to repay another (a debt spiral).\n' +
      'If a debt is refused, a contract/receipt is evidence; a negotiated solution beats a quarrel.',
    sources: [{ label: 'Akili KB — Biashara', ref: 'Usimamizi wa madeni' }],
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
