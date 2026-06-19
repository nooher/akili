// experts/kilimo/index.ts — Akili's Kilimo (agriculture) expert.
//
// A sovereign, curated Kiswahili knowledge base for Tanzanian smallholder farmers:
// mazao makuu, kupanda/mbolea/wadudu, misimu ya mvua, kuhifadhi mavuno, na soko.
// Pure/deterministic TS — no external LLM, no network.

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

const KILIMO_CUES = [
  // Kiswahili — practice
  'kilimo', 'shamba', 'mkulima', 'kulima', 'kupanda', 'mbegu', 'mbolea', 'samadi',
  'wadudu', 'magonjwa ya mimea', 'palizi', 'umwagiliaji', 'mavuno', 'kuvuna',
  'kuhifadhi', 'ghala', 'msimu', 'mvua', 'jua', 'udongo', 'soko', 'bei',
  // Kiswahili — crops & livestock
  'mahindi', 'mpunga', 'mchele', 'mihogo', 'maharage', 'karanga', 'alizeti',
  'pamba', 'kahawa', 'korosho', 'chai', 'tumbaku', 'ndizi', 'viazi', 'mboga',
  'matunda', 'mifugo', 'ng ombe', 'kuku', 'mbuzi',
  // English
  'agriculture', 'farm', 'farmer', 'farming', 'crop', 'crops', 'plant', 'planting',
  'seed', 'seeds', 'fertilizer', 'fertiliser', 'manure', 'pest', 'pests',
  'harvest', 'storage', 'season', 'rains', 'soil', 'market', 'maize', 'rice',
  'cassava', 'beans', 'coffee', 'cashew', 'cotton', 'livestock', 'irrigation',
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
    id: 'mahindi',
    cues: ['mahindi', 'maize', 'kupanda mahindi', 'mbegu', 'corn'],
    sw:
      'Mahindi (zao kuu la chakula):\n' +
      '• Panda mwanzoni mwa msimu wa mvua udongo ukiwa na unyevu wa kutosha.\n' +
      '• Nafasi: takriban sm 75 kati ya mistari na sm 25–30 kati ya mimea.\n' +
      '• Weka mbolea ya kupandia (mfano DAP) wakati wa kupanda, na ya kukuzia (mfano Urea) baada ya wiki 3–5.\n' +
      '• Palilia mapema; dhibiti viwavi-jeshi (fall armyworm) ukiona dalili kwenye majani.\n' +
      '• Vuna wakati maganda yamekauka; kausha vizuri kabla ya kuhifadhi ili kuzuia ukungu.',
    en:
      'Maize (staple crop):\n' +
      '• Plant at the start of the rains when the soil is moist enough.\n' +
      '• Spacing: ~75 cm between rows, 25–30 cm between plants.\n' +
      '• Apply planting fertiliser (e.g. DAP) at sowing and top-dress (e.g. Urea) after 3–5 weeks.\n' +
      '• Weed early; control fall armyworm at the first sign on the leaves.\n' +
      '• Harvest when cobs are dry; dry well before storage to prevent mould.',
    sources: [{ label: 'Wizara ya Kilimo', ref: 'Kanuni bora za kilimo cha mahindi' }],
  },
  {
    id: 'mpunga',
    cues: ['mpunga', 'mchele', 'rice', 'paddy', 'kupanda mpunga'],
    sw:
      'Mpunga (mchele):\n' +
      '• Hustawi kwenye maeneo yenye maji ya kutosha au mabonde (umwagiliaji au mvua nyingi).\n' +
      '• Andaa kitalu, kisha hamishia miche shambani baada ya wiki 3–4.\n' +
      '• Hakikisha shamba lina maji ya kiwango sahihi; dhibiti magugu mapema.\n' +
      '• Weka mbolea kulingana na ushauri wa afisa ugani.\n' +
      '• Vuna masuke yakigeuka rangi ya dhahabu; pukuchua na kausha ili kupunguza unyevu.',
    en:
      'Rice (paddy):\n' +
      '• Thrives in areas with enough water or lowland valleys (irrigation or heavy rain).\n' +
      '• Raise a nursery, then transplant seedlings after 3–4 weeks.\n' +
      '• Keep correct water levels; weed early.\n' +
      '• Fertilise per extension-officer advice.\n' +
      '• Harvest when panicles turn golden; thresh and dry to reduce moisture.',
    sources: [{ label: 'Wizara ya Kilimo', ref: 'Mwongozo wa kilimo cha mpunga' }],
  },
  {
    id: 'mihogo',
    cues: ['mihogo', 'muhogo', 'cassava', 'batobato', 'mosaic'],
    sw:
      'Mihogo (zao sugu la ukame):\n' +
      '• Hustawi hata kwenye udongo wa kawaida na huvumilia ukame.\n' +
      '• Panda vipande vya shina (vikonyo) vyenye afya, urefu wa sm 20–30, kwa mteremko.\n' +
      '• Tumia mbegu/aina zinazostahimili ugonjwa wa batobato (cassava mosaic) na michirizi ya kahawia.\n' +
      '• Palilia mapema miezi mitatu ya kwanza.\n' +
      '• Vuna baada ya miezi 9–12; mihogo inaweza kubaki ardhini kama ghala hai.',
    en:
      'Cassava (drought-tolerant crop):\n' +
      '• Grows even in ordinary soils and tolerates drought.\n' +
      '• Plant healthy stem cuttings ~20–30 cm long, at an angle.\n' +
      '• Use varieties resistant to cassava mosaic and brown-streak disease.\n' +
      '• Weed early in the first three months.\n' +
      '• Harvest after 9–12 months; cassava can be left in the ground as a living store.',
    sources: [{ label: 'Wizara ya Kilimo', ref: 'Kilimo cha mihogo stahimilivu' }],
  },
  {
    id: 'kahawa-korosho',
    cues: ['kahawa', 'korosho', 'coffee', 'cashew', 'biashara za nje', 'export'],
    sw:
      'Mazao ya biashara (kahawa & korosho):\n' +
      '• Kahawa: hupendelea maeneo ya baridi/milima; pogoa, weka matandazo, na dhibiti wadudu kama vidukari na ugonjwa wa kutu.\n' +
      '• Korosho: hustawi maeneo ya pwani/joto; pulizia dawa dhidi ya ugonjwa wa ubwiri-vumbi (powdery mildew) kwa wakati.\n' +
      '• Vuna na uandae kwa ubora — soko la nje hulipa zaidi kwa daraja la juu.\n' +
      '• Uza kupitia vyama vya ushirika (AMCOS) na mfumo wa stakabadhi ghalani kwa bei nzuri.',
    en:
      'Cash crops (coffee & cashew):\n' +
      '• Coffee: prefers cool/highland areas; prune, mulch, and control pests like aphids and coffee leaf rust.\n' +
      '• Cashew: thrives in warm coastal areas; spray against powdery mildew on time.\n' +
      '• Harvest and prepare for quality — export markets pay more for higher grades.\n' +
      '• Sell through cooperatives (AMCOS) and the warehouse-receipt system for better prices.',
    sources: [
      { label: 'Bodi ya Kahawa Tanzania (TCB)' },
      { label: 'Bodi ya Korosho Tanzania (CBT)' },
    ],
  },
  {
    id: 'misimu',
    cues: ['msimu', 'mvua', 'masika', 'vuli', 'season', 'rains', 'hali ya hewa', 'weather', 'kupanda lini'],
    sw:
      'Misimu ya mvua na upandaji (Tanzania):\n' +
      '• Maeneo mengi ya kaskazini/mashariki yana mvua za VULI (Okt–Des) na MASIKA (Mar–Mei) — mvua mbili.\n' +
      '• Maeneo mengi ya kusini/magharibi yana msimu mmoja mrefu (Nov–Apr).\n' +
      '• Panda mara udongo unapopata unyevu wa kutosha mwanzoni mwa mvua; kuchelewa hupunguza mavuno.\n' +
      '• Fuata utabiri wa TMA na ushauri wa afisa ugani kwa tarehe sahihi za eneo lako.',
    en:
      'Rainfall seasons and planting (Tanzania):\n' +
      '• Many northern/eastern areas have bimodal rains: VULI (Oct–Dec) and MASIKA (Mar–May).\n' +
      '• Many southern/western areas have one long season (Nov–Apr).\n' +
      '• Plant as soon as the soil is moist enough at the onset of rains; late planting lowers yield.\n' +
      '• Follow TMA forecasts and local extension advice for exact dates.',
    sources: [
      { label: 'Mamlaka ya Hali ya Hewa Tanzania (TMA)' },
      { label: 'Wizara ya Kilimo' },
    ],
  },
  {
    id: 'mbolea-wadudu',
    cues: ['mbolea', 'samadi', 'wadudu', 'magonjwa', 'palizi', 'fertilizer', 'manure', 'pest', 'disease'],
    sw:
      'Mbolea na udhibiti wa wadudu:\n' +
      '• Pima/zingatia hali ya udongo; changanya mbolea za viwandani na samadi/mboji kwa rutuba endelevu.\n' +
      '• Weka mbolea ya kupandia wakati wa kupanda na ya kukuzia mimea ikiwa changa.\n' +
      '• Zungusha mazao (crop rotation) ili kupunguza wadudu na magonjwa.\n' +
      '• Tumia kinga jumuishi (IPM): mitego, dawa asilia, na dawa za viwandani kwa kiasi sahihi tu.\n' +
      '• Soma maelekezo ya dawa; vaa kinga, na zingatia muda wa kusubiri kabla ya kuvuna.',
    en:
      'Fertiliser and pest control:\n' +
      '• Mind your soil; combine mineral fertilisers with manure/compost for lasting fertility.\n' +
      '• Apply planting fertiliser at sowing and top-dressing while plants are young.\n' +
      '• Rotate crops to reduce pests and diseases.\n' +
      '• Use integrated pest management (IPM): traps, natural remedies, and only correct doses of pesticides.\n' +
      '• Read pesticide labels; wear protection and observe the pre-harvest waiting period.',
    sources: [{ label: 'Wizara ya Kilimo', ref: 'Kanuni bora za matumizi ya pembejeo' }],
  },
  {
    id: 'kuhifadhi-soko',
    cues: ['kuhifadhi', 'ghala', 'mavuno', 'soko', 'bei', 'storage', 'market', 'price', 'stakabadhi'],
    sw:
      'Kuhifadhi mavuno na soko:\n' +
      '• Kausha nafaka hadi unyevu salama (mfano mahindi ~chini ya 13%) kabla ya kuhifadhi.\n' +
      '• Tumia ghala safi, magunia ya kuzuia hewa (hermetic/PICS) au madawa salama dhidi ya dumuzi.\n' +
      '• Kagua mara kwa mara dhidi ya panya, unyevu na ukungu (aflatoxin ni hatari).\n' +
      '• Uza kwa pamoja kupitia ushirika (AMCOS) na mfumo wa STAKABADHI GHALANI ili kupata bei bora na kuepuka kuuza kwa bei ya chini wakati wa mavuno mengi.',
    en:
      'Post-harvest storage and market:\n' +
      '• Dry grain to a safe moisture (e.g. maize ~below 13%) before storage.\n' +
      '• Use clean stores, hermetic/PICS bags, or safe treatments against weevils.\n' +
      '• Inspect regularly for rodents, damp and mould (aflatoxin is dangerous).\n' +
      '• Sell collectively via cooperatives (AMCOS) and the WAREHOUSE-RECEIPT SYSTEM to get better prices and avoid dumping at harvest gluts.',
    sources: [
      { label: 'Wizara ya Kilimo' },
      { label: 'Bodi ya Usimamizi wa Stakabadhi za Ghala (WRRB)' },
    ],
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

export const kilimoExpert: DomainExpert = {
  id: 'kilimo-msingi',
  domain: 'kilimo',
  label: 'Kilimo',

  match(q: AkiliQuery): number {
    return cueScore(q.text ?? '', KILIMO_CUES);
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const { entry, score: s } = bestEntry(q.text ?? '');
    const confidence: AkiliConfidence = s >= 4 ? 'high' : s >= 2 ? 'medium' : 'low';

    return {
      domain: 'kilimo',
      expert: kilimoExpert.id,
      text: entry.en ? { sw: entry.sw, en: entry.en } : { sw: entry.sw },
      confidence,
      sources: [...entry.sources, { label: 'Akili KB — Kilimo', ref: 'Laetoli' }],
      data: { entry: entry.id, score: s },
    };
  },
};

export default kilimoExpert;
