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
  // Kiswahili — added
  'bustani', 'nyanya', 'kitunguu', 'kabichi', 'bilinganya', 'pilipili', 'tikiti',
  'ufugaji', 'maziwa', 'nyama', 'mayai', 'samaki', 'ufugaji wa samaki', 'nyuki',
  'asali', 'ugani', 'pembejeo', 'ruzuku', 'mboji', 'kilimo hai', 'matandazo',
  // English
  'agriculture', 'farm', 'farmer', 'farming', 'crop', 'crops', 'plant', 'planting',
  'seed', 'seeds', 'fertilizer', 'fertiliser', 'manure', 'pest', 'pests',
  'harvest', 'storage', 'season', 'rains', 'soil', 'market', 'maize', 'rice',
  'cassava', 'beans', 'coffee', 'cashew', 'cotton', 'livestock', 'irrigation',
  // English — added
  'vegetables', 'tomato', 'onion', 'horticulture', 'poultry', 'chicken', 'goat',
  'cattle', 'dairy', 'milk', 'fish', 'aquaculture', 'beekeeping', 'honey',
  'compost', 'organic', 'mulch', 'extension', 'subsidy', 'sunflower', 'groundnuts',
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
  {
    id: 'mboga-bustani',
    cues: ['mboga', 'bustani', 'nyanya', 'kitunguu', 'kabichi', 'pilipili', 'bilinganya',
      'vegetables', 'tomato', 'onion', 'horticulture', 'kitalu', 'umwagiliaji wa matone'],
    sw:
      'Mboga za majani na bustani (kilimo cha bustani):\n' +
      '• Mboga huleta kipato cha haraka — hukomaa ndani ya wiki chache hadi miezi michache.\n' +
      '• Andaa KITALU chenye udongo laini wenye mboji; hamishia miche (nyanya, kabichi, vitunguu) shambani ikifikia urefu sahihi.\n' +
      '• Mwagilia mara kwa mara; umwagiliaji wa MATONE (drip) huokoa maji na hupunguza magonjwa.\n' +
      '• Zungusha mboga na epuka kupanda jamii moja mahali pamoja kila msimu (kuzuia wadudu/magonjwa).\n' +
      '• Vuna asubuhi/jioni na peleka sokoni haraka — mboga huharibika upesi.\n' +
      'Mboga zinafaa hata kwenye eneo dogo karibu na nyumbani kwa lishe na biashara.',
    en:
      'Vegetables and gardening (horticulture):\n' +
      '• Vegetables bring quick income — they mature in a few weeks to a few months.\n' +
      '• Prepare a NURSERY with fine, compost-rich soil; transplant seedlings (tomato, cabbage, onion) at the right height.\n' +
      '• Water regularly; DRIP irrigation saves water and reduces disease.\n' +
      '• Rotate vegetables and avoid planting the same family in one place each season (to curb pests/disease).\n' +
      '• Harvest morning/evening and get to market fast — vegetables spoil quickly.\n' +
      'Vegetables suit even a small plot near the home, for nutrition and income.',
    sources: [
      { label: 'Wizara ya Kilimo', ref: 'Kilimo cha bustani (horticulture)' },
      { label: 'TAHA — Chama cha Wadau wa Kilimo cha Bustani' },
    ],
  },
  {
    id: 'mifugo-kuku',
    cues: ['mifugo', 'kuku', 'ng ombe', 'mbuzi', 'ufugaji', 'maziwa', 'nyama', 'mayai',
      'poultry', 'chicken', 'cattle', 'goat', 'dairy', 'milk', 'chanjo', 'banda'],
    sw:
      'Ufugaji bora (kuku, mbuzi, ng\'ombe):\n' +
      '• KUKU: anza na idadi ndogo; toa BANDA safi, kavu na lenye hewa; chanja dhidi ya mdondo (Newcastle) na kideri.\n' +
      '• Toa chakula bora na maji safi kila siku; tenga wagonjwa ili kuzuia maambukizi.\n' +
      '• MBUZI/NG\'OMBE: hakikisha malisho/maji ya kutosha, ogesha dhidi ya kupe, na kinga minyoo.\n' +
      '• NG\'OMBE WA MAZIWA: usafi wa kukamua na kuhifadhi maziwa ni muhimu kwa bei na afya.\n' +
      '• Weka kumbukumbu za chanjo, uzazi na gharama; wasiliana na afisa MIFUGO/mhudumu wa mifugo.\n' +
      'Chanjo na usafi wa banda ni nafuu kuliko kutibu mlipuko wa ugonjwa.',
    en:
      'Better livestock keeping (poultry, goats, cattle):\n' +
      '• POULTRY: start small; provide a clean, dry, airy house; vaccinate against Newcastle and fowl pox.\n' +
      '• Give good feed and clean water daily; isolate sick birds to stop spread.\n' +
      '• GOATS/CATTLE: ensure enough pasture/water, dip against ticks, and deworm.\n' +
      '• DAIRY CATTLE: clean milking and storage matter for price and health.\n' +
      '• Keep records of vaccinations, births and costs; consult a LIVESTOCK officer/para-vet.\n' +
      'Vaccination and a clean house are cheaper than treating a disease outbreak.',
    sources: [
      { label: 'Wizara ya Mifugo na Uvuvi' },
      { label: 'Bodi ya Maziwa Tanzania (TDB)' },
    ],
  },
  {
    id: 'ufugaji-samaki-nyuki',
    cues: ['samaki', 'ufugaji wa samaki', 'bwawa', 'nyuki', 'asali', 'mizinga', 'fish',
      'aquaculture', 'beekeeping', 'honey', 'fish pond'],
    sw:
      'Ufugaji wa samaki na nyuki (kipato cha ziada):\n' +
      '• SAMAKI: chimba BWAWA mahali penye maji ya kutosha; perege (tilapia) na kambare hufaa kwa wengi.\n' +
      '• Weka vifaranga vyenye afya, lisha kwa kiasi, na badilisha/safisha maji kuepuka magonjwa.\n' +
      '• NYUKI: weka MIZINGA mahali tulivu, penye maua na maji karibu; vaa kinga wakati wa kurina.\n' +
      '• Asali, nta na uchavushaji wa mazao ni faida za ufugaji nyuki; soko la asali halisi ni kubwa.\n' +
      '• Anza kidogo, jifunze, kisha ongeza mabwawa/mizinga kadiri unavyopata uzoefu.\n' +
      'Wasiliana na afisa UVUVI/maliasili kwa mbinu na vibali pale vinapohitajika.',
    en:
      'Fish and bee keeping (extra income):\n' +
      '• FISH: dig a POND where water is sufficient; tilapia and catfish suit many farmers.\n' +
      '• Stock healthy fingerlings, feed moderately, and refresh/clean water to avoid disease.\n' +
      '• BEES: place HIVES in a calm spot with flowers and water nearby; wear protection when harvesting.\n' +
      '• Honey, wax and crop pollination are the gains of beekeeping; demand for real honey is high.\n' +
      '• Start small, learn, then add ponds/hives as you gain experience.\n' +
      'Consult a FISHERIES/natural-resources officer for methods and any required permits.',
    sources: [
      { label: 'Wizara ya Mifugo na Uvuvi', ref: 'Ufugaji wa samaki (aquaculture)' },
      { label: 'Wakala wa Huduma za Misitu Tanzania (TFS)', ref: 'Ufugaji nyuki' },
    ],
  },
  {
    id: 'udongo-mboji',
    cues: ['udongo', 'mboji', 'kilimo hai', 'matandazo', 'rutuba', 'soil', 'compost', 'organic',
      'mulch', 'kupima udongo', 'soil health'],
    sw:
      'Afya ya udongo na mboji (rutuba endelevu):\n' +
      '• Udongo wenye afya ndio msingi wa mavuno — utunze kama mtaji.\n' +
      '• Tengeneza MBOJI kutoka mabaki ya mazao, samadi na majani; hurutubisha udongo bila gharama kubwa.\n' +
      '• Weka MATANDAZO (mulch) kuzuia upotevu wa maji, kupunguza magugu na kulinda udongo.\n' +
      '• Zungusha mazao na panda jamii ya mikunde (maharage, kunde) ili kuongeza naitrojeni.\n' +
      '• Epuka kuchoma mabaki ya shamba na kulima kupita kiasi — huharibu rutuba na kusababisha mmomonyoko.\n' +
      'Pima udongo pale inapowezekana ili kujua aina sahihi ya mbolea/marekebisho.',
    en:
      'Soil health and compost (lasting fertility):\n' +
      '• Healthy soil is the basis of yield — treat it as capital.\n' +
      '• Make COMPOST from crop residues, manure and leaves; it enriches soil cheaply.\n' +
      '• Use MULCH to cut water loss, suppress weeds and protect the soil.\n' +
      '• Rotate crops and plant legumes (beans, cowpeas) to add nitrogen.\n' +
      '• Avoid burning residues and over-tilling — they destroy fertility and cause erosion.\n' +
      'Test your soil where possible to know the right fertiliser/amendment.',
    sources: [
      { label: 'Wizara ya Kilimo', ref: 'Afya ya udongo na rutuba' },
      { label: 'TARI — Taasisi ya Utafiti wa Kilimo Tanzania' },
    ],
  },
  {
    id: 'ugani-pembejeo',
    cues: ['ugani', 'afisa ugani', 'pembejeo', 'ruzuku', 'extension', 'subsidy', 'msaada wa kilimo',
      'vocha', 'inputs', 'mkopo wa kilimo', 'taarifa za kilimo'],
    sw:
      'Huduma za ugani na pembejeo (wapi kupata msaada):\n' +
      '• AFISA UGANI wa kata/kijiji hutoa ushauri wa bure: aina za mbegu, mbolea, na udhibiti wa wadudu kwa eneo lako.\n' +
      '• Nunua PEMBEJEO (mbegu, mbolea, dawa) kutoka mawakala walioidhinishwa; epuka bidhaa bandia.\n' +
      '• Serikali mara nyingine hutoa RUZUKU/vocha za pembejeo kwa wakulima — uliza ofisi ya kilimo ya wilaya.\n' +
      '• Jiunge na VIKUNDI/ushirika (AMCOS) ili kupata pembejeo, mikopo na soko kwa pamoja kwa bei nafuu.\n' +
      '• Fuata utafiti wa TARI na taarifa za masoko ili kufanya maamuzi sahihi.\n' +
      'Ushauri wa afisa ugani ni nafuu na hupunguza hasara za kubahatisha.',
    en:
      'Extension services and inputs (where to get help):\n' +
      '• A ward/village EXTENSION OFFICER gives free advice: seed varieties, fertiliser, and pest control for your area.\n' +
      '• Buy INPUTS (seed, fertiliser, chemicals) from authorised agents; avoid fake products.\n' +
      '• Government sometimes offers input SUBSIDIES/vouchers to farmers — ask the district agriculture office.\n' +
      '• Join GROUPS/cooperatives (AMCOS) to access inputs, credit and markets together at better prices.\n' +
      '• Follow TARI research and market information to make good decisions.\n' +
      'Extension advice is cheap and reduces the losses of guesswork.',
    sources: [
      { label: 'Wizara ya Kilimo', ref: 'Huduma za ugani' },
      { label: 'TARI — Taasisi ya Utafiti wa Kilimo Tanzania' },
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
