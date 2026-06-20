// utils/logistics-ai.ts
//
// Rubani — CargoLink's sovereign, offline, LOGISTICS-ONLY reasoning engine.
//
// Pure TypeScript: no DOM, no network, no external LLM. Deterministic intent
// scoring over a local knowledge base. Tanzania-centric (TRA / TANCIS / TPA /
// SGR / LATRA …) plus universal freight concepts (Incoterms, FCL/LCL, CBM).
//
// This file is intentionally framework-free so it can be unit-tested with plain
// node and reused anywhere (Nuxt component, edge worker, CLI). Extend it by
// adding entries to the INTENTS array — nothing else needs to change.

import { estimateDuty } from "./duty";

/** A named authority/framework an answer leans on (e.g. TRA / TANCIS). */
export interface LxSource {
  name: string;
  note?: string;
}

/** A suggested in-app action. `kind` is from a fixed set the UI understands. */
export interface LxAction {
  kind: string; // "navigate" | "openForm" | "track" | "estimateDuty"
  label: { sw: string; en: string };
  payload?: Record<string, any>;
}

export interface LxAnswer {
  /** Bilingual answer body. Swahili is primary. */
  text: { sw: string; en: string };
  /** Stable topic key (also used for the UI "topic chip"). */
  topic: string;
  /** Ordered, bilingual steps when the answer is a procedure/playbook. */
  steps?: { sw: string[]; en: string[] };
  /** Named authorities / frameworks the answer references. */
  sources?: LxSource[];
  /** Suggested next in-app actions (0–2). */
  actions?: LxAction[];
  /** Optional structured payload (e.g. calculator results, extracted entities). */
  data?: any;
}

interface Intent {
  topic: string;
  /** Keywords (already lowercased). Match raises the score. */
  keys: string[];
  /** Strong keywords count double. */
  strong?: string[];
  answer: { sw: string; en: string };
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

function normalize(q: string): string {
  return (q || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s.,-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(q: string): string[] {
  return normalize(q).split(" ").filter(Boolean);
}

// ---------------------------------------------------------------------------
// Synonyms / aliases — map many surface forms to a canonical concept token.
// Used to expand the query's token set so e.g. "meli" also matches "ship"/
// "ocean". Deterministic, offline, hand-curated for Tanzanian + universal
// freight vocabulary.
// ---------------------------------------------------------------------------

const SYNONYM_GROUPS: string[][] = [
  ["ushuru", "duty", "import duty", "import tax", "kodi ya forodha", "customs duty"],
  ["forodha", "customs", "clearance", "clearing"],
  ["bandari", "port", "harbour", "harbor", "terminal"],
  ["meli", "ship", "ocean", "sea", "vessel", "maritime", "baharini"],
  ["ndege", "air", "aircraft", "airfreight", "air cargo", "anga"],
  ["reli", "rail", "sgr", "train", "treni", "railway"],
  ["barabara", "road", "truck", "lori", "trucking", "haulage"],
  ["bima", "insurance", "cover", "liability"],
  ["kontena", "container"],
  ["mzigo", "cargo", "freight", "shipment", "goods", "consignment"],
  ["bei", "price", "rate", "cost", "gharama", "nauli", "quote", "pricing", "tariff"],
  ["fuatilia", "track", "tracking", "trace", "kufuatilia", "locate"],
  ["wakala", "agent", "broker", "forwarder", "clearing agent", "c&f"],
  ["transit", "kupitisha", "kupita", "bonded", "t1"],
  ["nyaraka", "documents", "paperwork", "docs", "hati"],
  ["mauzo", "export", "exports", "kuuza nje"],
  ["uagizaji", "import", "imports", "kuagiza"],
  ["ghala", "warehouse", "storage", "depot"],
  ["mpaka", "border", "crossing", "cross-border", "mpakani"],
];

// concept-token -> set of all member tokens (lowercased). A query token that is
// any member expands to include the canonical (first) member so an intent
// keyed on the canonical also scores.
const SYNONYM_MAP: Record<string, string[]> = (() => {
  const m: Record<string, string[]> = {};
  for (const group of SYNONYM_GROUPS) {
    for (const term of group) {
      m[term] = group;
    }
  }
  return m;
})();

// ---------------------------------------------------------------------------
// Bounded Levenshtein — distance ≤ maxDist, early-exits. Used for light typo
// tolerance on longer tokens ("custmos" -> "customs").
// ---------------------------------------------------------------------------

function levensteinAtMost(a: string, b: string, maxDist: number): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > maxDist) return false;
  // classic DP, single rolling row
  let prev = new Array(lb + 1);
  let curr = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;
  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > maxDist) return false; // whole row already exceeds budget
    [prev, curr] = [curr, prev];
  }
  return prev[lb] <= maxDist;
}

/**
 * Build the set of synonym-group members reachable from the query's tokens —
 * but only the *canonical* member of each touched group (group[0]). This lets a
 * key match a query via concept ("meli" ↔ canonical "meli" for "ship") WITHOUT
 * injecting every alias of a group (which would let a single word like
 * "container" trigger fcl/lcl/kontena all at once and skew scoring).
 */
function synonymCanonicals(qTokens: string[]): Set<string> {
  const set = new Set<string>();
  for (const t of qTokens) {
    const group = SYNONYM_MAP[t];
    if (group) set.add(group[0]); // canonical only
  }
  return set;
}

/** Canonical of a single keyword's synonym group (or the key itself). */
function canonicalOf(key: string): string {
  const g = SYNONYM_MAP[key];
  return g ? g[0] : key;
}

// ---------------------------------------------------------------------------
// Guardrail — Rubani is logistics-only.
// ---------------------------------------------------------------------------

const OFF_TOPIC = [
  // health / medicine (sw + en)
  "dawa", "ugonjwa", "daktari", "malaria", "dalili", "afya", "hospitali",
  "medicine", "disease", "doctor", "symptom", "symptoms", "health", "clinic",
  "pregnant", "fever", "vaccine",
  // literature / books (sw + en)
  "shairi", "riwaya", "kitabu", "mwandishi", "mashairi",
  "poem", "poetry", "novel", "book", "author", "literature",
];

const REFUSAL: LxAnswer = {
  topic: "refusal",
  text: {
    sw: "Mimi ni msaidizi wa CargoLink kwa masuala ya usafirishaji na ugavi tu (forodha, bandari, kontena, Incoterms, bei ya mizigo, kufuatilia mizigo, n.k.). Siwezi kusaidia masuala ya tiba/afya au fasihi/vitabu. Niulize swali la usafirishaji.",
    en: "I am CargoLink's assistant for logistics & supply chain only (customs, ports, containers, Incoterms, freight pricing, shipment tracking, etc.). I cannot help with medicine/health or literature/books. Please ask me a logistics question.",
  },
};

// ---------------------------------------------------------------------------
// Knowledge base
// ---------------------------------------------------------------------------

const INTENTS: Intent[] = [
  // ----- CUSTOMS -----------------------------------------------------------
  {
    topic: "customs",
    strong: ["forodha", "customs", "tra", "tancis", "duty", "clearing"],
    keys: ["tax", "kodi", "ushuru", "import", "uagizaji", "taffa", "tasac", "vat", "excise", "tin", "agent", "wakala"],
    answer: {
      sw: "Forodha Tanzania inasimamiwa na TRA kupitia mfumo wa kielektroniki TANCIS. Mawakala wa kusafirisha mizigo (Clearing & Forwarding) lazima wawe na leseni ya TAFFA; TASAC inasimamia huduma za baharini. Kodi kuu: ushuru wa forodha (import duty), VAT, na excise kwa baadhi ya bidhaa. Nyaraka muhimu: Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin, na TIN ya mwagizaji. Kwa bidhaa zinazoondoka tena, kuna 'temporary import'.",
      en: "Tanzanian customs is run by the TRA via the electronic TANCIS system. Clearing & Forwarding agents must hold a TAFFA licence; TASAC regulates maritime services. Core charges: import duty, VAT, and excise on some goods. Required docs: Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin, and the importer's TIN. Goods that will leave again can use temporary import.",
    },
  },
  {
    topic: "customs-docs",
    strong: ["documents", "nyaraka", "paperwork", "bill of lading"],
    keys: ["invoice", "ankara", "packing list", "certificate of origin", "doc", "hati"],
    answer: {
      sw: "Nyaraka za kuagiza mizigo Tanzania: (1) Bill of Lading / Airway Bill, (2) Commercial Invoice, (3) Packing List, (4) Certificate of Origin, (5) TIN ya mwagizaji, na pale inapohitajika vibali (mfano TBS/TMDA kwa bidhaa husika). Zote huwasilishwa kupitia TANCIS na wakala wa TAFFA.",
      en: "Import documents for Tanzania: (1) Bill of Lading / Airway Bill, (2) Commercial Invoice, (3) Packing List, (4) Certificate of Origin, (5) importer's TIN, plus any required permits (e.g. TBS/TMDA for regulated goods). All are filed via TANCIS through a TAFFA agent.",
    },
  },
  // ----- PORTS -------------------------------------------------------------
  {
    topic: "ports",
    strong: ["bandari", "port", "tpa", "ticts", "dar"],
    keys: ["dar es salaam", "harbour", "terminal", "berth", "vessel", "meli", "central corridor", "transit", "drc", "zambia", "burundi", "rwanda", "uganda", "malawi"],
    answer: {
      sw: "Bandari ya Dar es Salaam inaendeshwa na TPA, na kituo cha makontena na TICTS. Ni lango kuu la Ukanda wa Kati (Central Corridor) kwa nchi zisizo na bahari: DRC, Zambia, Burundi, Rwanda, Uganda na Malawi. Mizigo ya transit hupita chini ya bondi (bond) hadi mpakani.",
      en: "Dar es Salaam port is operated by the TPA, with its container terminal run by TICTS. It is the main gateway of the Central Corridor for landlocked countries: DRC, Zambia, Burundi, Rwanda, Uganda and Malawi. Transit cargo moves under bond to the border.",
    },
  },
  {
    topic: "demurrage",
    strong: ["demurrage", "detention", "demaraji"],
    keys: ["free days", "siku za bure", "storage", "kontena", "container charges", "penalty", "faini"],
    answer: {
      sw: "Demurrage ni ada unayolipa kwa kontena kubaki bandarini/depo zaidi ya siku za bure (free days) za shirika la meli. Detention ni ada ya kuchelewesha kontena nje ya bandari (haujarudisha tupu kwa wakati). Ili kuepuka: kamilisha forodha mapema, panga usafiri wa kontena mapema, na rudisha kontena tupu ndani ya muda.",
      en: "Demurrage is a fee for a container sitting at the port/depot beyond the shipping line's free days. Detention is a fee for keeping the container out of the port too long (not returning it empty in time). To avoid both: clear customs early, pre-arrange haulage, and return empties on time.",
    },
  },
  // ----- RAIL --------------------------------------------------------------
  {
    topic: "rail",
    strong: ["reli", "rail", "sgr", "tazara", "trc"],
    keys: ["train", "treni", "icd", "dry port", "kwala", "kurasini", "gauge"],
    answer: {
      sw: "Usafiri wa reli: SGR (Standard Gauge Railway) inaendeshwa na TRC kwa mizigo na abiria kati ya Dar na bara. TAZARA inaunganisha Tanzania na Zambia. Bandari kavu (ICD / dry ports) kama Kwala na Kurasini hupokea makontena kutoka bandarini kwa njia ya reli ili kupunguza msongamano.",
      en: "Rail freight: the SGR (Standard Gauge Railway) is run by the TRC for cargo and passengers between Dar and the interior. TAZARA links Tanzania to Zambia. Inland container depots / dry ports such as Kwala and Kurasini receive containers from the port by rail to ease congestion.",
    },
  },
  // ----- ROAD / TRUCKING ---------------------------------------------------
  {
    topic: "road",
    strong: ["barabara", "road", "truck", "lori", "latra", "tanroads", "axle"],
    keys: ["weighbridge", "mizani", "haulage", "trucking", "load limit", "uzito", "transport"],
    answer: {
      sw: "Usafiri wa barabara unasimamiwa na LATRA (leseni za usafirishaji). TANROADS inaendesha mizani (weighbridges) kudhibiti uzito kwenye ekseli (axle-load limits) ili kulinda barabara. Lori linalozidi uzito hutozwa faini na kuzuiwa hadi lipunguze mzigo.",
      en: "Road transport is regulated by LATRA (transport licensing). TANROADS operates weighbridges enforcing axle-load limits to protect the roads. Overloaded trucks are fined and held until they shed weight.",
    },
  },
  // ----- FREIGHT MODES -----------------------------------------------------
  {
    topic: "freight-modes",
    strong: ["fcl", "lcl", "groupage", "container type", "reefer"],
    keys: ["20ft", "40ft", "40hc", "container", "kontena", "ocean", "air", "sea", "mode", "njia ya usafiri", "consolidation"],
    answer: {
      sw: "Njia za mizigo: FCL (Full Container Load) = kontena lako pekee; LCL / groupage = unachangia kontena na watu wengine (unalipa kwa ujazo). Aina za kontena: 20ft (~28 CBM), 40ft (~58 CBM), 40HC (refu zaidi, ~68 CBM), na reefer (lenye baridi kwa bidhaa zinazoharibika). Bahari = rahisi kwa wingi, ndege = haraka kwa uzito mdogo, barabara = kwa ndani/mpakani.",
      en: "Freight modes: FCL (Full Container Load) = your own container; LCL / groupage = you share a container and pay by volume. Container types: 20ft (~28 CBM), 40ft (~58 CBM), 40HC (taller, ~68 CBM), and reefer (refrigerated for perishables). Sea = cheap for volume, air = fast for light goods, road = for inland/cross-border.",
    },
  },
  // ----- INCOTERMS ---------------------------------------------------------
  {
    topic: "incoterms",
    strong: ["incoterm", "incoterms", "exw", "fob", "cif", "cfr", "dap", "ddp"],
    keys: ["delivery terms", "masharti ya uuzaji", "who pays", "nani analipa", "risk", "hatari"],
    answer: {
      sw: "Incoterms (masharti ya kibiashara): EXW = mnunuzi anabeba kila kitu kuanzia ghala la muuzaji. FOB = muuzaji hadi melini, mnunuzi anabeba kutoka hapo. CFR = muuzaji analipa nauli ya bahari (si bima). CIF = CFR + bima. DAP = muuzaji anafikisha mahali palipokubaliwa (bila forodha ya kuingiza). DDP = muuzaji analipa kila kitu pamoja na forodha hadi mlangoni.",
      en: "Incoterms (trade terms): EXW = buyer bears everything from the seller's warehouse. FOB = seller up to the ship's rail, buyer from there. CFR = seller pays sea freight (not insurance). CIF = CFR + insurance. DAP = seller delivers to the agreed place (import duty excluded). DDP = seller pays everything including import customs, to the door.",
    },
  },
  // ----- PRICING -----------------------------------------------------------
  {
    topic: "pricing",
    strong: ["bei", "price", "pricing", "rate", "nauli", "cost", "gharama", "quote"],
    keys: ["how much", "tariff", "ushuru wa usafiri", "fuel", "mafuta", "tolls", "fee", "ada"],
    answer: {
      sw: "Bei ya mizigo hujengwa kwa: umbali, uzito au ujazo (chargeable weight — kubwa kati ya hizo mbili), nyongeza ya mafuta (fuel surcharge), ada za barabara/mizani (tolls), na ada za bandari/forodha. Kwa bahari LCL hulipwa kwa CBM; FCL kwa kontena. Ongeza demurrage/detention iwapo kuna ucheleweshaji.",
      en: "Freight rates are built from: distance, weight or volume (chargeable weight — the greater of the two), fuel surcharge, road/weighbridge tolls, and port/customs fees. Sea LCL is charged per CBM; FCL per container. Add demurrage/detention if there are delays.",
    },
  },
  // ----- CARGOLINK HOW-TO --------------------------------------------------
  {
    topic: "cargolink-book",
    strong: ["cargoshipment", "book a shipment", "weka mzigo", "agiza usafiri", "create shipment"],
    keys: ["book", "booking", "post cargo", "weka mzigo", "tuma mzigo", "request", "order", "ship"],
    answer: {
      sw: "Kuweka CargoShipment kwenye CargoLink: fungua programu, chagua aina ya huduma, jaza chanzo na unakoenda, maelezo ya mzigo (uzito/ujazo/aina), kisha tuma ombi. Wabebaji (carriers) watatoa bei; chagua bora, lipa/thibitisha, na utafuatilia mzigo moja kwa moja.",
      en: "To book a CargoShipment on CargoLink: open the app, pick a service type, enter pickup and destination, cargo details (weight/volume/type), then submit the request. Carriers quote a price; pick the best, confirm/pay, and track the shipment live.",
    },
  },
  {
    topic: "cargolink-services",
    strong: ["cityxpress", "intransit", "city delivery", "inter-city"],
    keys: ["service", "huduma", "delivery", "usafirishaji wa mjini", "intercity", "mkoa", "ndani ya mji"],
    answer: {
      sw: "Huduma za CargoLink: CityXpress = usafirishaji wa haraka ndani ya mji (city delivery). InTransit = usafirishaji baina ya miji/mikoa (inter-city). CargoShipment = mizigo mikubwa/kontena. Chagua inayolingana na mzigo na umbali wako.",
      en: "CargoLink services: CityXpress = fast within-city delivery. InTransit = inter-city / regional transport. CargoShipment = larger freight / containers. Pick the one matching your cargo and distance.",
    },
  },
  {
    topic: "cargolink-track",
    strong: ["track", "fuatilia", "tracking", "kufuatilia", "where is my"],
    keys: ["status", "hali", "locate", "trace", "shipment status", "delivery status"],
    answer: {
      sw: "Kufuatilia mzigo: fungua orodha ya mizigo yako kwenye CargoLink, gusa mzigo husika, na utaona hali yake ya sasa (live tracking) — mahali, hatua iliyofikia, na muda unaotarajiwa. Utapokea pia arifa kila hali inapobadilika.",
      en: "To track a shipment: open your shipments list in CargoLink, tap the shipment, and you'll see its live status — location, current stage, and ETA. You'll also get notifications whenever the status changes.",
    },
  },
  {
    topic: "cargolink-rate",
    strong: ["dispute", "malalamiko", "rate", "review", "kadiria", "ukadiriaji"],
    keys: ["rating", "complaint", "report", "ripoti", "feedback", "star"],
    answer: {
      sw: "Baada ya safari unaweza kumkadiria mbebaji (nyota + maoni) ndani ya CargoLink. Kama kuna tatizo (uharibifu, ucheleweshaji, malipo), fungua malalamiko (dispute) kwenye mzigo husika; timu itashughulikia kwa kuangalia kumbukumbu za safari.",
      en: "After a trip you can rate the carrier (stars + a review) inside CargoLink. If something went wrong (damage, delay, payment), open a dispute on that shipment; the team handles it using the trip records.",
    },
  },
  {
    topic: "cargolink-partner",
    strong: ["become a partner", "carrier", "forwarder", "warehouse", "kuwa mshirika", "mbebaji"],
    keys: ["partner", "register", "jisajili", "join", "driver", "dereva", "ghala", "vendor", "onboard"],
    answer: {
      sw: "Kujiunga CargoLink kama mshirika: chagua jukumu — Carrier (mbebaji/dereva anayebeba mizigo), Forwarder (wakala wa kuratibu usafiri na forodha), au Warehouse (mwenye ghala la kuhifadhi mizigo). Jisajili, weka nyaraka/leseni, na ukikubaliwa utaanza kupokea kazi.",
      en: "To join CargoLink as a partner: choose a role — Carrier (hauler/driver who moves cargo), Forwarder (agent coordinating transport & customs), or Warehouse (storage provider). Register, upload documents/licences, and once approved you start receiving jobs.",
    },
  },

  // =========================================================================
  // TANZANIA GOVERNMENT & PARASTATAL AGENCIES — logistics / trade
  // =========================================================================

  // ----- TRA (Tanzania Revenue Authority) ----------------------------------
  {
    topic: "agency-tra",
    strong: ["tra", "tanzania revenue authority", "mamlaka ya mapato"],
    keys: ["revenue", "mapato", "duty", "ushuru", "vat", "vah", "excise", "tin", "efd", "receipt", "risiti", "kodi", "customs department", "idara ya forodha"],
    answer: {
      sw: "TRA (Tanzania Revenue Authority / Mamlaka ya Mapato Tanzania) ndiyo mamlaka ya kodi nchini. Idara ya Forodha (Customs & Excise) inakusanya ushuru wa forodha (import duty), VAT (18%), na excise duty kwa bidhaa kama mafuta, vileo na magari. TRA hutoa TIN (namba ya mlipakodi) na husimamia EFD (mashine za risiti za kielektroniki). Mfumo wake wa forodha ni TANCIS, na malipo hufanyika kupitia GePG.",
      en: "The TRA (Tanzania Revenue Authority) is the national tax authority. Its Customs & Excise department collects import duty, VAT (18%), and excise duty on goods like fuel, alcohol and vehicles. The TRA issues the TIN (taxpayer ID) and enforces EFDs (electronic fiscal devices / receipts). Its customs platform is TANCIS, and payments flow through GePG.",
    },
  },
  // ----- TANCIS ------------------------------------------------------------
  {
    topic: "agency-tancis",
    strong: ["tancis", "tansad", "single window", "declaration"],
    keys: ["tanzania customs integrated system", "tazimisho", "assessment", "release", "gepg", "lodge", "declare", "tamko la forodha", "kuachilia mzigo"],
    answer: {
      sw: "TANCIS (Tanzania Customs Integrated System) ni mfumo wa kielektroniki wa TRA wa kushughulikia forodha. Hatua: (1) wakala wa TAFFA anawasilisha tamko la forodha (TANSAD — declaration), (2) mfumo unakadiria kodi (assessment) na kupanga njia ya ukaguzi (channel — kijani/njano/nyekundu), (3) malipo hufanyika kupitia GePG (control number), (4) baada ya malipo na ukaguzi, mzigo huachiliwa (release order). TANCIS inaunganishwa na TPA, bandari, na mfumo wa transit wa eneo la EAC.",
      en: "TANCIS (Tanzania Customs Integrated System) is the TRA's electronic customs platform. Flow: (1) a TAFFA agent lodges the customs declaration (TANSAD), (2) the system assesses duties/taxes and assigns a control channel (green/yellow/red), (3) payment is made via GePG (a control number), (4) after payment and any inspection, the goods get a release order. TANCIS integrates with the TPA, the port, and the EAC transit system.",
    },
  },
  // ----- Customs regimes ---------------------------------------------------
  {
    topic: "customs-regimes",
    strong: ["regime", "transit", "warehousing", "bonded", "temporary admission", "re-export"],
    keys: ["home use", "matumizi ya nyumbani", "t1", "transit declaration", "temporary import", "uingizaji wa muda", "bond", "warehouse", "ghala la bondi", "re export", "kuondoa tena", "import for home use", "regimes"],
    answer: {
      sw: "Aina za regimes za forodha (TANCIS/EAC): (1) Import for home use — bidhaa zinabaki nchini, kodi zote zinalipwa; (2) Export — kupeleka nje; (3) Transit (T1) — mzigo unapita Tanzania kwenda nchi nyingine chini ya bondi, hauipiliwi kodi; (4) Temporary admission — bidhaa zinazoingia kwa muda (mfano vifaa vya maonyesho) bila kulipa kodi kamili; (5) Warehousing / bonded — bidhaa zinahifadhiwa kwenye ghala la bondi, kodi inalipwa zikitoka; (6) Re-export — kutoa tena bidhaa zilizoingizwa.",
      en: "Customs regimes (TANCIS/EAC): (1) Import for home use — goods stay in-country, all duties paid; (2) Export; (3) Transit (T1) — cargo passes through Tanzania to another country under bond, duty-suspended; (4) Temporary admission — goods entering for a limited time (e.g. exhibition gear) without full duty; (5) Warehousing / bonded — goods stored in a bonded warehouse, duty paid on removal; (6) Re-export — re-exporting previously imported goods.",
    },
  },
  // ----- TASAC -------------------------------------------------------------
  {
    topic: "agency-tasac",
    strong: ["tasac", "shipping agent", "wakala wa meli", "shipping agency"],
    keys: ["tanzania shipping agents corporation", "freight forwarding", "single customs declaration for shipping", "maritime", "baharini", "licensing", "leseni", "ushirika wa mawakala"],
    answer: {
      sw: "TASAC (Tanzania Shipping Agents Corporation) ndiyo msimamizi na pia mtoa huduma wa sekta ya meli. Majukumu: kutoa leseni na kusimamia mawakala wa meli (shipping agents) na freight forwarders, kushughulikia Single Customs Declaration kwa upande wa meli, na kusimamia usalama na ushindani wa huduma za baharini. Ilianzishwa baada ya SUMATRA kugawanywa (LATRA + TASAC + nyingine).",
      en: "TASAC (Tanzania Shipping Agents Corporation) is both the regulator and a service provider for the maritime sector. It licenses and regulates shipping agents and freight forwarders, handles the shipping-side single customs declaration, and oversees safety and fair competition in maritime services. It was created when SUMATRA was split (into LATRA + TASAC + others).",
    },
  },
  // ----- TPA + TICTS + dry ports -------------------------------------------
  {
    topic: "agency-tpa",
    strong: ["tpa", "tanzania ports authority", "ticts", "mamlaka ya bandari"],
    keys: ["dar port", "tanga", "mtwara", "gate", "yard", "geti", "yadi", "icd", "cfs", "dry port", "bandari kavu", "kwala", "kurasini", "berth", "terminal", "stevedoring"],
    answer: {
      sw: "TPA (Tanzania Ports Authority / Mamlaka ya Bandari Tanzania) inamiliki na kusimamia bandari za Dar es Salaam, Tanga na Mtwara, pamoja na maziwa. Kituo cha makontena cha Dar kinaendeshwa na TICTS. TPA inasimamia geti, yadi, kupakua/kupakia meli (stevedoring) na inatoza demurrage kwa mizigo inayokaa muda mrefu. Bandari kavu (ICD/CFS) kama Kwala na Kurasini hupunguza msongamano kwa kupokea makontena kwa reli/barabara.",
      en: "The TPA (Tanzania Ports Authority) owns and manages the ports of Dar es Salaam, Tanga and Mtwara, plus the lakes. Dar's container terminal is operated by TICTS. The TPA runs gates, yards, vessel handling (stevedoring) and charges storage/demurrage on cargo that overstays. Dry ports (ICD/CFS) such as Kwala and Kurasini ease congestion by receiving containers via rail/road.",
    },
  },
  // ----- TRC / SGR ---------------------------------------------------------
  {
    topic: "agency-sgr",
    strong: ["sgr", "standard gauge", "trc", "tanzania railway", "makutupora", "morogoro"],
    keys: ["reli ya kisasa", "electric", "umeme", "mwanza", "dodoma", "freight train", "treni ya mizigo", "icd link", "passenger", "abiria", "gauge ya kawaida"],
    answer: {
      sw: "SGR (Standard Gauge Railway) inaendeshwa na TRC (Tanzania Railway Corporation). Ni reli ya kisasa ya umeme inayobeba mizigo na abiria: Dar es Salaam – Morogoro – Makutupora (Dodoma), ikielekea Mwanza/Ziwa Victoria. Inafikia kasi na uzito mkubwa zaidi kuliko reli ya zamani (metre gauge), inaunganishwa na bandari kavu (ICD) ili kuhamisha makontena kutoka bandari ya Dar kwenda bara kwa haraka na gharama nafuu.",
      en: "The SGR (Standard Gauge Railway) is operated by the TRC (Tanzania Railway Corporation). It is a modern electric line carrying freight and passengers: Dar es Salaam – Morogoro – Makutupora (Dodoma), extending toward Mwanza / Lake Victoria. It offers higher speed and capacity than the old metre-gauge line and connects to inland container depots (ICDs) to shift containers from Dar port to the interior faster and cheaper.",
    },
  },
  {
    topic: "agency-tazara",
    strong: ["tazara", "kapiri mposhi", "tanzania zambia railway"],
    keys: ["zambia", "drc copperbelt", "copper", "shaba", "freedom railway", "uhuru railway", "reli ya uhuru"],
    answer: {
      sw: "TAZARA (Tanzania–Zambia Railway Authority, 'Reli ya Uhuru') inaunganisha Dar es Salaam na Kapiri Mposhi nchini Zambia, ikihudumia mzigo wa shaba (copper) kutoka Copperbelt ya Zambia na DRC. Ni reli ya ushirikiano kati ya Tanzania na Zambia na nyenzo muhimu ya Ukanda wa Kati kwa nchi za kusini zisizo na bahari.",
      en: "TAZARA (Tanzania–Zambia Railway Authority, the 'Freedom Railway') links Dar es Salaam to Kapiri Mposhi in Zambia, serving copper traffic from the Zambian/DRC Copperbelt. Jointly owned by Tanzania and Zambia, it is a key Central Corridor artery for the southern landlocked countries.",
    },
  },
  // ----- LATRA -------------------------------------------------------------
  {
    topic: "agency-latra",
    strong: ["latra", "land transport regulatory", "sumatra"],
    keys: ["road licensing", "leseni ya barabara", "rail regulation", "transport licence", "successor", "split", "land transport", "usafiri wa nchi kavu"],
    answer: {
      sw: "LATRA (Land Transport Regulatory Authority) inasimamia usafiri wa nchi kavu — barabara na reli (leseni za mabasi, malori ya kibiashara, na huduma za reli). Ilitokana na kugawanywa kwa SUMATRA ya zamani, ambapo majukumu ya baharini yalikwenda TASAC na ya nchi kavu yakabaki LATRA. Carriers wa kibiashara wanahitaji leseni ya LATRA kuendesha usafirishaji wa mizigo.",
      en: "LATRA (Land Transport Regulatory Authority) regulates land transport — road and rail (licensing buses, commercial trucks, and rail services). It was carved out of the former SUMATRA, with maritime duties going to TASAC and land duties staying with LATRA. Commercial carriers need a LATRA licence to operate freight transport.",
    },
  },
  // ----- TANROADS / weighbridge / axle load --------------------------------
  {
    topic: "agency-tanroads",
    strong: ["tanroads", "weighbridge", "axle load", "axle-load", "mizani"],
    keys: ["trunk roads", "barabara kuu", "regional roads", "overload", "uzito kupita kiasi", "vehicle load control", "eac load control", "gvm", "gross weight", "faini ya uzito", "axle weight"],
    answer: {
      sw: "TANROADS inasimamia barabara kuu (trunk) na za mikoa, na inaendesha mizani (weighbridges) kudhibiti uzito kwa kufuata EAC Vehicle Load Control Act. Kuna mipaka ya uzito kwa kila ekseli (axle-load) na uzito wa jumla (GVM); lori linalozidi hutozwa faini na kuzuiwa hadi lipunguze mzigo. Hii inalinda barabara dhidi ya uharibifu wa mapema.",
      en: "TANROADS manages trunk and regional roads and operates weighbridges to enforce axle-load and gross vehicle mass (GVM) limits under the EAC Vehicle Load Control Act. Overloaded trucks are fined and held until they shed weight. This protects roads from premature damage.",
    },
  },
  // ----- TBS / PVoC --------------------------------------------------------
  {
    topic: "agency-tbs",
    strong: ["tbs", "tanzania bureau of standards", "pvoc"],
    keys: ["standards", "viwango", "pre-shipment", "conformity", "coc", "certificate of conformity", "inspection abroad", "kabla ya kusafirisha", "ubora", "quality"],
    answer: {
      sw: "TBS (Tanzania Bureau of Standards) husimamia viwango vya ubora na usalama wa bidhaa. Kwa bidhaa zinazoagizwa, mpango wa PVoC (Pre-export Verification of Conformity) unahitaji ukaguzi nchi ya asili kabla ya kusafirisha, na hutoa Certificate of Conformity (CoC). Bila CoC, bidhaa husika zinaweza kuzuiwa au kutozwa ada za ziada za ukaguzi bandarini.",
      en: "TBS (Tanzania Bureau of Standards) sets product quality and safety standards. For regulated imports, the PVoC (Pre-export Verification of Conformity) scheme requires inspection in the country of origin before shipment, issuing a Certificate of Conformity (CoC). Without a CoC, affected goods can be held or face extra destination-inspection fees.",
    },
  },
  // ----- Other regulatory permit agencies ----------------------------------
  {
    topic: "agency-permits",
    strong: ["tmda", "tphpa", "tfra", "tvla", "taec", "nemc", "permit agencies", "vibali"],
    keys: ["tmda", "medicines device permit", "phytosanitary", "plant health", "afya ya mimea", "fertilizer", "mbolea", "livestock", "mifugo", "radioactive", "tochi za nyuklia", "government chemist", "fire and rescue", "dangerous goods", "bidhaa hatari", "wma", "weights and measures", "vipimo", "nemc", "eia", "mazingira", "osha", "fcc", "fair competition", "permit", "kibali"],
    answer: {
      sw: "Vibali maalum kwa bidhaa husika (mbali na TRA): TMDA — dawa na vifaa tiba; TPHPA — afya ya mimea / phytosanitary certificate; TFRA — mbolea; TVLA / Wizara ya Mifugo — wanyama na bidhaa za mifugo; Mkemia Mkuu wa Serikali (Government Chemist); TAEC — vyanzo vya mionzi (radioactive); Jeshi la Zimamoto — bidhaa hatari (dangerous goods); WMA — Vipimo (Weights & Measures); NEMC — mazingira / EIA; OSHA-TZ — usalama kazini; FCC (Fair Competition Commission) — ushindani wa haki. Bidhaa zinazohusika lazima ziwe na kibali husika kabla ya kuachiliwa forodha.",
      en: "Special permits for regulated goods (beyond the TRA): TMDA — medicines & medical devices; TPHPA — plant health / phytosanitary certificate; TFRA — fertilizers; TVLA / livestock ministry — animals & animal products; Government Chemist; TAEC — radioactive sources; Fire & Rescue Force — dangerous goods; WMA — Weights & Measures; NEMC — environment / EIA; OSHA-TZ — occupational safety; FCC (Fair Competition Commission) — fair competition. Affected goods must carry the relevant permit before customs release.",
    },
  },
  // ----- TCAA / air cargo --------------------------------------------------
  {
    topic: "agency-tcaa",
    strong: ["tcaa", "air cargo", "jnia", "kia", "civil aviation"],
    keys: ["tanzania civil aviation authority", "airport", "uwanja wa ndege", "kilimanjaro", "julius nyerere", "airway bill", "awb", "perishables air", "ndege mzigo", "abia"],
    answer: {
      sw: "TCAA (Tanzania Civil Aviation Authority) inasimamia usafiri wa anga ikiwemo mizigo ya ndege (air cargo). Viwanja vikuu vya mizigo: JNIA (Julius Nyerere, Dar es Salaam) na KIA (Kilimanjaro, kwa mauzo ya nje kama maua na mboga). Mzigo wa ndege hutumia Airway Bill (AWB) na hulipiwa kwa chargeable weight (kubwa kati ya uzito halisi na volumetric). Ni haraka, bora kwa bidhaa zinazoharibika au zenye thamani kubwa.",
      en: "TCAA (Tanzania Civil Aviation Authority) regulates aviation including air cargo. Main cargo airports: JNIA (Julius Nyerere, Dar es Salaam) and KIA (Kilimanjaro, used for exports such as flowers and vegetables). Air cargo uses an Airway Bill (AWB) and is charged on chargeable weight (the greater of actual and volumetric). It is fast, ideal for perishables or high-value goods.",
    },
  },
  // ----- Registration / payment rails --------------------------------------
  {
    topic: "agency-registration",
    strong: ["brela", "nida", "ega", "business registration", "company registration"],
    keys: ["tin registration", "sajili kampuni", "national id", "kitambulisho", "incorporation", "business name", "leseni ya biashara", "import licence", "egov"],
    answer: {
      sw: "Kabla ya kuagiza kibiashara: sajili biashara/kampuni BRELA (Business Registrations and Licensing Agency), pata TIN kutoka TRA, na NIDA hutoa kitambulisho cha taifa (national ID) kwa watu binafsi. eGA (e-Government Authority) inaratibu mifumo ya serikali mtandaoni. Hizi ndizo msingi wa kuwa mwagizaji/forwarder anayetambulika kisheria.",
      en: "Before importing commercially: register the business/company with BRELA (Business Registrations and Licensing Agency), get a TIN from the TRA, and NIDA issues the national ID for individuals. eGA (e-Government Authority) coordinates government online systems. These form the foundation for being a legally recognised importer/forwarder.",
    },
  },
  {
    topic: "agency-payments",
    strong: ["gepg", "tips", "bank of tanzania", "bot", "government payment"],
    keys: ["government e-payment gateway", "control number", "namba ya malipo", "instant payment", "malipo ya papo kwa papo", "tanzania instant payments", "mobile money", "central bank", "benki kuu"],
    answer: {
      sw: "Malipo ya serikali (ushuru, ada za bandari, vibali) hufanyika kupitia GePG (Government e-Payment Gateway) — mfumo unaotoa control number unayolipia benki au mobile money. Benki Kuu (Bank of Tanzania) inasimamia TIPS (Tanzania Instant Payments System) inayowezesha malipo ya papo kwa papo baina ya benki na watoa huduma za fedha. Kwenye forodha, control number ya GePG inathibitisha malipo kabla ya kuachiliwa mzigo.",
      en: "Government payments (duties, port fees, permits) flow through GePG (Government e-Payment Gateway), which issues a control number you pay at a bank or via mobile money. The Bank of Tanzania runs TIPS (Tanzania Instant Payments System) enabling instant interbank/wallet payments. In customs, the GePG control number confirms payment before cargo release.",
    },
  },
  {
    topic: "agency-immigration",
    strong: ["immigration", "uhamiaji", "crew permit", "driver permit", "work permit"],
    keys: ["visa", "kibali cha kazi", "cross-border driver", "dereva wa mpakani", "passport", "hati ya kusafiria", "crew", "wafanyakazi wa meli"],
    answer: {
      sw: "Idara ya Uhamiaji (Immigration) inasimamia vibali vya wafanyakazi wa kigeni wa meli (crew) na madereva wa kuvuka mpaka (cross-border drivers). Kwa usafirishaji wa kikanda, madereva wanahitaji hati halali za kusafiria na pale inapohitajika vibali vya kazi/transit. Hili ni muhimu kwa Ukanda wa Kati ambapo malori huvuka mipaka kwenda DRC, Zambia, Rwanda n.k.",
      en: "The Immigration Department handles permits for foreign vessel crew and cross-border drivers. For regional transport, drivers need valid travel documents and, where required, work/transit permits. This matters for the Central Corridor where trucks cross borders into the DRC, Zambia, Rwanda, etc.",
    },
  },

  // =========================================================================
  // REGIONAL & INTERNATIONAL FRAMEWORKS
  // =========================================================================
  {
    topic: "framework-eac",
    strong: ["eac", "single customs territory", "sct", "common external tariff", "cet"],
    keys: ["east african community", "jumuiya ya afrika mashariki", "customs union", "umoja wa forodha", "one declaration", "tamko moja", "first point of entry", "duty paid at entry"],
    answer: {
      sw: "EAC (East African Community) ina Customs Union yenye Common External Tariff (CET) — viwango vya pamoja vya ushuru kwa bidhaa kutoka nje ya jumuiya (kwa kawaida 0% malighafi, 10% bidhaa nusu-malighafi, 25% bidhaa kamili, na 'sensitive items' juu zaidi). Single Customs Territory (SCT) huruhusu kodi kulipwa mara moja katika eneo la kwanza la kuingia na bidhaa kutembea ndani ya EAC kwa tamko moja, kupunguza vituo vya forodha mpakani.",
      en: "The EAC (East African Community) operates a Customs Union with a Common External Tariff (CET) — shared duty bands on goods from outside the bloc (typically 0% raw materials, 10% intermediates, 25% finished goods, with higher 'sensitive items'). The Single Customs Territory (SCT) lets duty be paid once at the first point of entry and goods move within the EAC on a single declaration, cutting border customs stops.",
    },
  },
  {
    topic: "framework-regional-blocs",
    strong: ["comesa", "sadc", "afcfta", "regional bloc"],
    keys: ["common market", "soko la pamoja", "southern africa", "continental free trade", "biashara huria", "preferential tariff", "rules of origin", "kanuni za asili", "free trade area", "tripartite"],
    answer: {
      sw: "Mikataba ya biashara ya kikanda inayohusu Tanzania: COMESA (soko la pamoja la mashariki na kusini mwa Afrika), SADC (Jumuiya ya Maendeleo Kusini mwa Afrika), na AfCFTA (African Continental Free Trade Area) — eneo huria la bara zima. Faida: ushuru wa upendeleo (preferential/0%) kwa bidhaa zenye Certificate of Origin inayothibitisha 'rules of origin'. Tanzania ni mwanachama wa SADC na AfCFTA; hii inafungua masoko makubwa kwa mauzo ya nje.",
      en: "Regional trade arrangements relevant to Tanzania: COMESA (Common Market for Eastern & Southern Africa), SADC (Southern African Development Community), and AfCFTA (African Continental Free Trade Area) — the continent-wide free-trade zone. Benefit: preferential/zero tariffs for goods with a Certificate of Origin meeting 'rules of origin'. Tanzania is a SADC and AfCFTA member; this opens large markets for exports.",
    },
  },
  {
    topic: "framework-wto-wco",
    strong: ["wto", "wco", "trade facilitation agreement", "tfa", "hs code", "harmonized system", "revised kyoto"],
    keys: ["world trade organization", "world customs organization", "tariff classification", "uainishaji wa bidhaa", "hs", "harmonised", "kyoto convention", "single window", "risk management", "aeo"],
    answer: {
      sw: "Kanuni za kimataifa: WTO (World Trade Organization) ina Trade Facilitation Agreement (TFA) inayohamasisha kurahisisha forodha (transparency, single window, pre-arrival processing). WCO (World Customs Organization) inasimamia Harmonized System (HS code) — mfumo wa tarakimu 6+ wa kuainisha bidhaa duniani (msingi wa kukokotoa ushuru), na Revised Kyoto Convention kwa taratibu za kisasa za forodha. HS code sahihi ndio ufunguo wa kodi sahihi.",
      en: "International rules: the WTO (World Trade Organization) has a Trade Facilitation Agreement (TFA) promoting simpler customs (transparency, single window, pre-arrival processing). The WCO (World Customs Organization) maintains the Harmonized System (HS code) — the 6+ digit global goods-classification system that drives duty rates — and the Revised Kyoto Convention for modern customs procedures. The correct HS code is the key to the correct duty.",
    },
  },
  {
    topic: "framework-aeo",
    strong: ["aeo", "authorized economic operator", "authorised economic operator", "trusted trader"],
    keys: ["compliance", "fast track", "green channel", "njia ya kijani", "reduced inspection", "ukaguzi mdogo", "accreditation", "mfanyabiashara aminifu"],
    answer: {
      sw: "AEO (Authorized Economic Operator) ni hadhi inayotolewa na TRA/EAC kwa wafanyabiashara wanaoaminika (compliant). Faida: ukaguzi mdogo (mara nyingi njia ya kijani), kuachiliwa haraka kwa mizigo, kipaumbele bandarini, na malipo ya kodi yaliyorahisishwa. Ili kupata AEO unahitaji rekodi nzuri ya ulipaji kodi, vitabu vizuri vya hesabu, usalama wa ugavi (supply-chain security), na ukaguzi wa TRA. Ni sawa na mpango wa 'trusted trader' wa kimataifa.",
      en: "AEO (Authorized Economic Operator) is a status granted by the TRA/EAC to compliant, trusted traders. Benefits: reduced inspection (often green channel), faster cargo release, port priority, and simplified duty payment. To qualify you need a clean tax record, good bookkeeping, supply-chain security, and a TRA audit. It mirrors international 'trusted trader' programmes.",
    },
  },
  {
    topic: "incoterms-2020-full",
    strong: ["incoterms 2020", "fca", "cpt", "cip", "dpu", "fas", "all incoterms"],
    keys: ["eleven", "kumi na moja", "ddp", "dap", "exw", "fob", "cif", "cfr", "any mode", "sea only", "delivered duty paid", "carriage paid"],
    answer: {
      sw: "Incoterms 2020 — sheria 11: Njia yoyote ya usafiri — EXW (Ex Works), FCA (Free Carrier), CPT (Carriage Paid To), CIP (Carriage & Insurance Paid To), DAP (Delivered At Place), DPU (Delivered at Place Unloaded), DDP (Delivered Duty Paid). Bahari/maji tu — FAS (Free Alongside Ship), FOB (Free On Board), CFR (Cost & Freight), CIF (Cost, Insurance & Freight). Hatari na gharama huhamia kutoka muuzaji kwenda mnunuzi mahali tofauti kwa kila term — EXW ni mzigo mdogo kwa muuzaji, DDP ni mzigo mkubwa zaidi.",
      en: "Incoterms 2020 — the 11 rules: Any transport mode — EXW (Ex Works), FCA (Free Carrier), CPT (Carriage Paid To), CIP (Carriage & Insurance Paid To), DAP (Delivered At Place), DPU (Delivered at Place Unloaded), DDP (Delivered Duty Paid). Sea/inland-waterway only — FAS (Free Alongside Ship), FOB (Free On Board), CFR (Cost & Freight), CIF (Cost, Insurance & Freight). Risk and cost transfer from seller to buyer at a different point for each — EXW puts the least on the seller, DDP the most.",
    },
  },
  {
    topic: "corridors",
    strong: ["central corridor", "ukanda wa kati", "dar corridor"],
    keys: ["dar gateway", "landlocked", "isiyo na bahari", "burundi", "rwanda", "uganda", "malawi", "transit route", "njia ya transit", "competing ports"],
    answer: {
      sw: "Ukanda wa Kati (Central Corridor) unaanzia bandari ya Dar es Salaam kwenda nchi zisizo na bahari: DRC (mashariki), Burundi, Rwanda, Uganda, Zambia na Malawi — kwa barabara, SGR/reli na TAZARA. Ukanda wa Kaskazini (Northern Corridor) unaanzia Mombasa (Kenya). Wateja huchagua kati ya Dar na Mombasa kwa kuzingatia umbali, gharama, msongamano na muda wa transit. Dar ina nafasi nzuri kwa DRC ya kusini-mashariki, Burundi, Rwanda na Zambia.",
      en: "The Central Corridor starts at Dar es Salaam port serving landlocked countries: DRC (east), Burundi, Rwanda, Uganda, Zambia and Malawi — by road, SGR/rail and TAZARA. The Northern Corridor starts at Mombasa (Kenya). Shippers choose between Dar and Mombasa on distance, cost, congestion and transit time. Dar is well placed for south-eastern DRC, Burundi, Rwanda and Zambia.",
    },
  },

  // =========================================================================
  // WORLD-CLASS BENCHMARKS — best practice / how we compare
  // =========================================================================
  {
    topic: "benchmark-single-window",
    strong: ["tradenet", "uni-pass", "uni pass", "naccs", "single window benchmark", "best practice", "world class", "how do we compare"],
    keys: ["singapore", "korea", "japan", "china single window", "cbp", "ace", "cbsa", "carm", "ucc", "portbase", "dp world", "networked trade platform", "benchmark", "kiwango cha dunia", "tunalinganaje"],
    answer: {
      sw: "Mifumo bora ya dunia ya biashara/forodha: Singapore — TradeNet & Networked Trade Platform (single window ya kwanza duniani); Korea — UNI-PASS (forodha ya kielektroniki inayouzwa nje); Japan — NACCS; China — Single Window ya taifa; Marekani — CBP/ACE; Canada — CBSA/CARM; EU — Union Customs Code (UCC); Uholanzi — Portbase (community system ya bandari); na DP World kwa uendeshaji wa bandari. Lengo la CargoLink: kuunganisha forodha, bandari, reli/SGR, barabara na malipo kuwa mfumo mmoja wa biashara+ugavi wa Tanzania unaolingana au kuzidi viwango hivi — lakini wa kidijitali, wa wenyeji na wa bei nafuu.",
      en: "World-class trade/customs systems: Singapore — TradeNet & the Networked Trade Platform (the first national single window); Korea — UNI-PASS (an exported e-customs system); Japan — NACCS; China — national Single Window; USA — CBP/ACE; Canada — CBSA/CARM; EU — Union Customs Code (UCC); Netherlands — Portbase (a port community system); and DP World for port operations. CargoLink's ambition: unify customs, ports, rail/SGR, road and payments into one Tanzanian trade + supply-chain OS that matches or exceeds these benchmarks — but sovereign, locally owned and affordable.",
    },
  },

  // =========================================================================
  // PROCESS PLAYBOOKS (step-by-step)
  // =========================================================================
  {
    topic: "playbook-import-container",
    strong: ["how to import a container", "import a container", "kuagiza kontena", "jinsi ya kuagiza"],
    keys: ["import container", "steps to import", "hatua za kuagiza", "shipping a container to tanzania", "bring container", "leta kontena"],
    answer: {
      sw: "Kuagiza kontena Tanzania (hatua): (1) Sajili biashara BRELA + pata TIN (TRA); (2) Pata pro-forma invoice na kubaliana Incoterm na muuzaji; (3) Hakikisha vibali (TBS/PVoC, TMDA, n.k.) kama bidhaa zinahitaji; (4) Bidhaa zinasafirishwa, unapata Bill of Lading; (5) Mteue wakala wa TAFFA awasilishe TANSAD kwenye TANCIS; (6) Lipa ushuru/VAT kupitia control number ya GePG; (7) TPA/TICTS wanatoa kontena baada ya release order; (8) Panga usafiri (SGR/lori) hadi ghala lako — rudisha kontena tupu kuepuka detention.",
      en: "Importing a container into Tanzania (steps): (1) Register the business with BRELA + get a TIN (TRA); (2) Obtain a pro-forma invoice and agree an Incoterm with the seller; (3) Secure permits (TBS/PVoC, TMDA, etc.) if the goods are regulated; (4) Goods ship; you receive the Bill of Lading; (5) Appoint a TAFFA agent to lodge the TANSAD in TANCIS; (6) Pay duty/VAT via the GePG control number; (7) TPA/TICTS release the container after the release order; (8) Arrange haulage (SGR/truck) to your warehouse — return the empty to avoid detention.",
    },
  },
  {
    topic: "playbook-clear-customs",
    strong: ["how to clear customs", "clear customs", "kutoa mzigo forodha", "kupitisha forodha"],
    keys: ["clearance steps", "hatua za forodha", "clearing process", "customs clearance how", "release goods", "toa mzigo bandarini"],
    answer: {
      sw: "Kutoa mzigo forodha (clearance): (1) Kusanya nyaraka — Bill of Lading, Invoice, Packing List, Certificate of Origin, vibali; (2) Wakala wa TAFFA anawasilisha tamko (TANSAD) kwenye TANCIS na kuainisha HS code; (3) TANCIS inakadiria kodi na kupanga channel (kijani=hakuna ukaguzi, njano=ukaguzi wa nyaraka, nyekundu=ukaguzi wa kimwili); (4) Lipa kupitia GePG; (5) Kama ni nyekundu, mzigo unakaguliwa; (6) Release order inatolewa; (7) Lipa ada za TPA/shipping line, chukua mzigo. Kuwa AEO hupunguza ukaguzi na muda.",
      en: "Clearing customs: (1) Gather docs — Bill of Lading, Invoice, Packing List, Certificate of Origin, permits; (2) A TAFFA agent lodges the declaration (TANSAD) in TANCIS and classifies the HS code; (3) TANCIS assesses duty and assigns a channel (green=no inspection, yellow=document check, red=physical exam); (4) Pay via GePG; (5) If red, the cargo is examined; (6) A release order is issued; (7) Pay TPA/shipping-line charges and take delivery. AEO status reduces inspection and time.",
    },
  },
  {
    topic: "playbook-sgr-cargo",
    strong: ["how to move cargo by sgr", "move cargo by sgr", "kusafirisha kwa sgr", "mzigo kwa reli"],
    keys: ["sgr booking", "rail freight booking", "panga treni", "container on sgr", "icd loading", "reli mzigo hatua"],
    answer: {
      sw: "Kusafirisha mzigo kwa SGR: (1) Kamilisha forodha bandari ya Dar (au tumia transit kwenda ICD); (2) Kontena linahamishwa kutoka TICTS hadi kituo cha reli/ICD; (3) Weka booking ya mzigo na TRC kwa treni ya mizigo; (4) Kontena linapakiwa kwenye behewa, treni inaelekea Morogoro/Dodoma/Makutupora kuelekea Mwanza; (5) Kufika ICD ya bara, kontena linatolewa na kupelekwa kwa lori hadi mlangoni. Faida: nafuu na haraka zaidi kuliko lori kwa umbali mrefu, na kupunguza msongamano wa barabara.",
      en: "Moving cargo by SGR: (1) Clear customs at Dar port (or move under transit to an ICD); (2) The container transfers from TICTS to the rail/ICD terminal; (3) Place a freight booking with the TRC; (4) The container is loaded onto a wagon and the train runs to Morogoro/Dodoma/Makutupora toward Mwanza; (5) At the inland ICD the container is offloaded and trucked to the door. Benefits: cheaper and faster than trucking over long distances, and it eases road congestion.",
    },
  },
  {
    topic: "playbook-transit",
    strong: ["how to transit", "transit to zambia", "transit to drc", "kupitisha mzigo", "transit kwenda"],
    keys: ["transit cargo", "t1", "bond", "bonded transit", "drc", "zambia", "burundi", "rwanda", "cross border", "kuvuka mpaka", "landlocked transit", "kwenda nje ya nchi"],
    answer: {
      sw: "Kupitisha mzigo (transit) kwenda DRC/Zambia/nchi isiyo na bahari: (1) Mzigo unafika Dar kama transit (hauipiliwi kodi ya Tanzania); (2) Wakala anawasilisha transit declaration (T1) kwenye TANCIS chini ya bondi (customs bond) ya kuhakikisha mzigo unaondoka; (3) Mzigo unasafirishwa kwa SGR/TAZARA/lori chini ya ufuatiliaji (mfano electronic cargo tracking) kupitia Ukanda wa Kati; (4) Mpakani (mfano Tunduma kwa Zambia, Kasumbalesa/Kabanga kwa DRC) mzigo unathibitishwa kuondoka; (5) Bondi inafungwa (acquittal). Forodha halisi inalipwa nchi ya mwisho.",
      en: "Transiting cargo to the DRC/Zambia/a landlocked country: (1) Cargo arrives at Dar as transit (no Tanzanian duty); (2) The agent lodges a transit declaration (T1) in TANCIS under a customs bond guaranteeing the cargo leaves; (3) It moves by SGR/TAZARA/truck under tracking (e.g. electronic cargo tracking) via the Central Corridor; (4) At the border (e.g. Tunduma for Zambia, Kasumbalesa/Kabanga toward the DRC) exit is confirmed; (5) The bond is acquitted. Actual duty is paid in the destination country.",
    },
  },
  {
    topic: "playbook-become-agent",
    strong: ["become a clearing agent", "licensed clearing agent", "taffa licence", "kuwa wakala wa forodha", "clearing agent licence"],
    keys: ["taffa", "tasac licence", "freight forwarder licence", "leseni ya forwarding", "customs agent", "c&f licence", "how to be agent", "wakala wa forodha"],
    answer: {
      sw: "Kuwa wakala wa forodha/clearing & forwarding (C&F) aliyeidhinishwa: (1) Sajili kampuni BRELA + TIN; (2) Jiunge/ufuzu na TAFFA (Tanzania Freight Forwarders Association) na ufaulu mafunzo/mtihani wa weledi; (3) Pata leseni ya TASAC kwa huduma za freight forwarding (na za baharini); (4) Hakikisha una dhamana/bond ya forodha inayohitajika; (5) Pata akaunti ya kuingia TANCIS ili kuwasilisha matamko kwa niaba ya wateja. Kudumisha leseni kunahitaji uadilifu wa kodi na kufuata kanuni za TRA/TASAC.",
      en: "Becoming a licensed clearing & forwarding (C&F) agent: (1) Register a company with BRELA + TIN; (2) Join/qualify through TAFFA (Tanzania Freight Forwarders Association) and pass the competence training/exam; (3) Obtain a TASAC licence for freight-forwarding (and maritime) services; (4) Hold the required customs bond/guarantee; (5) Get a TANCIS login to lodge declarations on clients' behalf. Keeping the licence requires tax compliance and adherence to TRA/TASAC rules.",
    },
  },
  {
    topic: "playbook-export-docs",
    strong: ["export documents", "what documents for export", "nyaraka za kuuza nje", "kusafirisha nje"],
    keys: ["export", "mauzo ya nje", "export declaration", "tamko la mauzo", "certificate of origin export", "phytosanitary export", "export permit", "kuuza nje hatua"],
    answer: {
      sw: "Nyaraka za kuuza nje (export) Tanzania: (1) Commercial Invoice na Packing List; (2) Export declaration kwenye TANCIS (kupitia wakala wa TAFFA); (3) Certificate of Origin (mfano EAC/SADC/AfCFTA kwa upendeleo wa ushuru); (4) Bill of Lading / Airway Bill; (5) vyeti maalum kulingana na bidhaa — phytosanitary (TPHPA) kwa mazao, vyeti vya ubora (TBS), au vibali vya madini/mifugo. Baadhi ya bidhaa za asili zinahitaji vibali vya wizara husika kabla ya kusafirisha.",
      en: "Export documents for Tanzania: (1) Commercial Invoice and Packing List; (2) an export declaration in TANCIS (via a TAFFA agent); (3) Certificate of Origin (e.g. EAC/SADC/AfCFTA for tariff preference); (4) Bill of Lading / Airway Bill; (5) commodity-specific certificates — phytosanitary (TPHPA) for produce, quality certificates (TBS), or mineral/livestock permits. Some natural-resource goods need sector-ministry permits before shipment.",
    },
  },

  // =========================================================================
  // PAN-AFRICAN — REGIONAL ECONOMIC COMMUNITIES / CUSTOMS UNIONS
  // =========================================================================
  {
    topic: "africa-afcfta",
    strong: ["afcfta", "continental free trade", "guided trade initiative", "gti"],
    keys: ["african continental free trade area", "biashara huria ya bara", "au", "african union", "umoja wa afrika", "single market", "soko moja la afrika", "tariff liberalisation", "rules of origin", "kanuni za asili", "55 countries", "secretariat accra", "continental", "bara zima"],
    answer: {
      sw: "AfCFTA (African Continental Free Trade Area) ni eneo huria la biashara la bara zima la Afrika, lililoanzishwa na Umoja wa Afrika (AU) — wanachama 54/55, sekretarieti Accra (Ghana). Lengo: kuondoa ushuru kwa ~90% ya bidhaa hatua kwa hatua, kufungua soko moja la Afrika. Bidhaa hupata upendeleo zikiwa na AfCFTA Certificate of Origin inayothibitisha 'rules of origin'. Guided Trade Initiative (GTI) ndiyo awamu ya majaribio ya biashara halisi chini ya AfCFTA. AfCFTA haifuti EAC/SADC/COMESA — inazikusanya pamoja kibara.",
      en: "AfCFTA (African Continental Free Trade Area) is the continent-wide free-trade area established by the African Union (AU) — 54/55 members, secretariat in Accra (Ghana). Goal: progressively remove tariffs on ~90% of goods, creating a single African market. Goods get preference with an AfCFTA Certificate of Origin meeting the 'rules of origin'. The Guided Trade Initiative (GTI) is the live pilot phase of trading under AfCFTA. AfCFTA does not replace the EAC/SADC/COMESA — it brings them together continentally.",
    },
  },
  {
    topic: "africa-sadc",
    strong: ["sadc", "southern african development community", "north-south corridor", "north south corridor"],
    keys: ["sadc fta", "protocol on trade", "southern africa", "kusini mwa afrika", "south africa", "zambia", "zimbabwe", "mozambique", "namibia", "botswana", "malawi", "lesotho", "eswatini", "angola", "drc", "free trade area sadc", "preferential"],
    answer: {
      sw: "SADC (Southern African Development Community) ina Free Trade Area chini ya SADC Protocol on Trade — ushuru wa upendeleo (mara nyingi 0%) kwa bidhaa zenye SADC Certificate of Origin kati ya wanachama. Wanachama: Afrika Kusini, Tanzania, Zambia, Zimbabwe, Msumbiji, Namibia, Botswana, Malawi, Lesotho, Eswatini, Angola, DRC n.k. SADC si customs union kamili (haina CET ya pamoja) — kila nchi ina ushuru wake kwa nje. North–South Corridor (Durban→Zambia/DRC) ni njia kuu ya SADC. Tanzania ni mwanachama wa SADC na EAC kwa wakati mmoja.",
      en: "SADC (Southern African Development Community) runs a Free Trade Area under the SADC Protocol on Trade — preferential (often 0%) tariffs on goods with a SADC Certificate of Origin between members. Members: South Africa, Tanzania, Zambia, Zimbabwe, Mozambique, Namibia, Botswana, Malawi, Lesotho, Eswatini, Angola, DRC, etc. SADC is not a full customs union (no common CET) — each country keeps its own external tariff. The North–South Corridor (Durban→Zambia/DRC) is SADC's main artery. Tanzania belongs to both SADC and the EAC.",
    },
  },
  {
    topic: "africa-ecowas",
    strong: ["ecowas", "etls", "economic community of west african states"],
    keys: ["west africa", "afrika magharibi", "ecowas cet", "ecowas trade liberalisation scheme", "nigeria", "ghana", "cote d ivoire", "ivory coast", "senegal", "benin", "togo", "mali", "burkina faso", "niger", "ecowas certificate of origin", "common external tariff west"],
    answer: {
      sw: "ECOWAS (Economic Community of West African States) inaunganisha nchi 15 za Afrika Magharibi (Nigeria, Ghana, Côte d'Ivoire, Senegal, Benin, Togo, Mali, Burkina Faso, Niger n.k.). ETLS (ECOWAS Trade Liberalisation Scheme) huruhusu bidhaa zenye asili ya ECOWAS kuuzwa bila ushuru kati ya wanachama. ECOWAS ina Common External Tariff (CET) yenye mistari mitano: 0%, 5%, 10%, 20% na 35% kwa bidhaa za nje ya kanda. UEMOA/WAEMU (nchi zinazotumia faranga CFA) ni customs union ndani ya ECOWAS.",
      en: "ECOWAS (Economic Community of West African States) unites 15 West African countries (Nigeria, Ghana, Côte d'Ivoire, Senegal, Benin, Togo, Mali, Burkina Faso, Niger, etc.). The ETLS (ECOWAS Trade Liberalisation Scheme) lets ECOWAS-origin goods trade duty-free between members. ECOWAS has a Common External Tariff (CET) with five bands: 0%, 5%, 10%, 20% and 35% on goods from outside the region. UEMOA/WAEMU (the CFA-franc states) is a customs union within ECOWAS.",
    },
  },
  {
    topic: "africa-comesa",
    strong: ["comesa", "yellow card", "rctg", "common market for eastern and southern africa"],
    keys: ["comesa fta", "comesa cet", "comesa certificate of origin", "regional customs transit guarantee", "carnet", "yellow card insurance", "motor insurance", "bima ya gari", "eastern southern africa", "egypt", "kenya", "zambia", "zimbabwe", "drc", "comesa member"],
    answer: {
      sw: "COMESA (Common Market for Eastern & Southern Africa) ni soko la pamoja la nchi ~21 (Misri, Kenya, Zambia, Zimbabwe, DRC, Rwanda, Burundi n.k.). Ina Free Trade Area (ushuru 0% kwa bidhaa zenye COMESA Certificate of Origin) na inalenga COMESA CET. Vyombo muhimu: COMESA Yellow Card — bima ya gari (third-party) inayotambulika mipakani ya nchi wanachama; na RCTG Carnet (Regional Customs Transit Guarantee) — dhamana moja ya transit inayotumika nchi nzima badala ya bondi kila mpaka. Tanzania iliondoka COMESA lakini bado ipo SADC + EAC.",
      en: "COMESA (Common Market for Eastern & Southern Africa) is a common market of ~21 countries (Egypt, Kenya, Zambia, Zimbabwe, DRC, Rwanda, Burundi, etc.). It runs a Free Trade Area (0% duty on goods with a COMESA Certificate of Origin) and targets a COMESA CET. Key instruments: the COMESA Yellow Card — third-party motor insurance recognised across member borders; and the RCTG Carnet (Regional Customs Transit Guarantee) — a single transit bond honoured region-wide instead of a fresh bond at each border. Tanzania left COMESA but remains in SADC + the EAC.",
    },
  },
  {
    topic: "africa-other-blocs",
    strong: ["cemac", "eccas", "uma", "amu", "maghreb", "igad", "cen-sad", "cen sad"],
    keys: ["central africa", "afrika ya kati", "economic community of central african states", "arab maghreb union", "umoja wa maghreb", "morocco", "algeria", "tunisia", "libya", "mauritania", "igad horn", "djibouti", "ethiopia", "somalia", "south sudan", "cameroon", "gabon", "chad", "cfa central", "blocs"],
    answer: {
      sw: "Jumuiya nyingine za kikanda za Afrika: CEMAC/ECCAS — Afrika ya Kati (Cameroon, Gabon, Chad, CAR, Congo, Equatorial Guinea; CEMAC ni customs union ya faranga CFA ya kati). UMA/AMU (Arab Maghreb Union) — Maghreb (Morocco, Algeria, Tunisia, Libya, Mauritania). IGAD — Pembe ya Afrika (Ethiopia, Djibouti, Somalia, Sudan, South Sudan, Kenya, Uganda). CEN-SAD — nchi za Sahel-Sahara. Zote ni 'building blocks' za AfCFTA; nchi nyingi ni wanachama wa zaidi ya jumuiya moja (overlap), hivyo CET inayotumika hutegemea customs union husika ya nchi hiyo.",
      en: "Other African regional bodies: CEMAC/ECCAS — Central Africa (Cameroon, Gabon, Chad, CAR, Congo, Equatorial Guinea; CEMAC is the central CFA-franc customs union). UMA/AMU (Arab Maghreb Union) — the Maghreb (Morocco, Algeria, Tunisia, Libya, Mauritania). IGAD — the Horn of Africa (Ethiopia, Djibouti, Somalia, Sudan, South Sudan, Kenya, Uganda). CEN-SAD — the Sahel-Saharan states. All are AfCFTA 'building blocks'; many countries belong to more than one bloc (overlap), so the CET that applies depends on that country's actual customs union.",
    },
  },
  {
    topic: "africa-sacu",
    strong: ["sacu", "southern african customs union", "burs"],
    keys: ["south africa", "botswana", "namibia", "lesotho", "eswatini", "common revenue pool", "common external tariff sacu", "oldest customs union", "rand", "common customs area"],
    answer: {
      sw: "SACU (Southern African Customs Union) ni customs union kongwe zaidi duniani: Afrika Kusini, Botswana, Namibia, Lesotho na Eswatini. Ina Common External Tariff moja na eneo moja la forodha — bidhaa zinapoingia popote SACU hulipia ushuru mara moja na kutembea bila forodha ndani. Mapato ya ushuru hugawanywa kwa 'common revenue pool'. SARS (Afrika Kusini) ndiyo huendesha tariff; Botswana hutumia BURS. SACU ipo ndani ya SADC.",
      en: "SACU (Southern African Customs Union) is the world's oldest customs union: South Africa, Botswana, Namibia, Lesotho and Eswatini. It has a single Common External Tariff and one customs area — goods entering anywhere in SACU pay duty once and move duty-free internally. Duty revenue is shared via a 'common revenue pool'. SARS (South Africa) administers the tariff; Botswana uses BURS. SACU sits inside SADC.",
    },
  },

  // =========================================================================
  // PAN-AFRICAN — COUNTRY CUSTOMS / REVENUE AUTHORITIES + VAT
  // =========================================================================
  {
    topic: "country-kenya",
    strong: ["kra", "kenya revenue authority", "icms", "simba"],
    keys: ["kenya", "kenya customs", "mombasa", "vat 16", "vat 16%", "import duty kenya", "idf", "rdl", "railway development levy", "northern corridor", "nairobi icd", "kenyan vat"],
    answer: {
      sw: "Kenya: forodha husimamiwa na KRA (Kenya Revenue Authority) kupitia iCMS (zamani Simba system). VAT ni 16%. Tozo nyingine: Import Declaration Fee (IDF ~2.5%), Railway Development Levy (RDL ~2%), na import duty kwa EAC CET (0/10/25%). Lango kuu: bandari ya Mombasa (Ukanda wa Kaskazini) inayohudumia Kenya, Uganda, Rwanda, DRC mashariki na South Sudan. KRA ni mwanachama wa EAC SCT.",
      en: "Kenya: customs is run by the KRA (Kenya Revenue Authority) via iCMS (formerly the Simba system). VAT is 16%. Other charges: Import Declaration Fee (IDF ~2.5%), Railway Development Levy (RDL ~2%), plus import duty under the EAC CET (0/10/25%). Main gateway: the port of Mombasa (Northern Corridor) serving Kenya, Uganda, Rwanda, eastern DRC and South Sudan. The KRA participates in the EAC SCT.",
    },
  },
  {
    topic: "country-uganda",
    strong: ["ura", "uganda revenue authority"],
    keys: ["uganda", "asycuda", "asycudaworld", "vat 18", "vat 18%", "kampala", "landlocked", "northern corridor uganda", "malaba", "busia", "ugandan vat"],
    answer: {
      sw: "Uganda: forodha husimamiwa na URA (Uganda Revenue Authority) kwa kutumia ASYCUDAWorld. VAT ni 18%, pamoja na import duty ya EAC CET. Uganda haina bahari — hupokea mizigo kwa transit kupitia Mombasa (Ukanda wa Kaskazini) au Dar (Ukanda wa Kati), ikipita mpaka Malaba/Busia (Kenya) au mipaka ya Tanzania. URA ni sehemu ya EAC SCT (kodi hulipwa eneo la kwanza la kuingia).",
      en: "Uganda: customs is run by the URA (Uganda Revenue Authority) on ASYCUDAWorld. VAT is 18%, plus EAC CET import duty. Uganda is landlocked — cargo arrives in transit via Mombasa (Northern Corridor) or Dar (Central Corridor), crossing at Malaba/Busia (Kenya) or Tanzanian borders. The URA is part of the EAC SCT (duty paid at the first point of entry).",
    },
  },
  {
    topic: "country-rwanda-burundi",
    strong: ["rra", "rwanda revenue authority", "obr", "office burundais des recettes"],
    keys: ["rwanda", "burundi", "kigali", "bujumbura", "vat 18 rwanda", "vat 18%", "landlocked", "central corridor", "northern corridor", "gatuna", "rusumo", "kabanga", "rwandan vat"],
    answer: {
      sw: "Rwanda: forodha husimamiwa na RRA (Rwanda Revenue Authority), VAT 18%, EAC CET. Burundi: husimamiwa na OBR (Office Burundais des Recettes), VAT ~18%. Zote hazina bahari — hupokea mizigo kwa transit kupitia Dar (Ukanda wa Kati, mpaka Rusumo/Kabanga) au Mombasa (Ukanda wa Kaskazini, mpaka Gatuna). Rwanda na Burundi ni wanachama wa EAC; Rwanda pia COMESA. Kodi za EAC hulipwa eneo la kwanza la kuingia chini ya SCT.",
      en: "Rwanda: customs is run by the RRA (Rwanda Revenue Authority), VAT 18%, EAC CET. Burundi: run by the OBR (Office Burundais des Recettes), VAT ~18%. Both are landlocked — cargo arrives in transit via Dar (Central Corridor, borders Rusumo/Kabanga) or Mombasa (Northern Corridor, border Gatuna). Rwanda and Burundi are EAC members; Rwanda is also in COMESA. EAC duties are paid at the first point of entry under the SCT.",
    },
  },
  {
    topic: "country-drc",
    strong: ["dgda", "drc customs", "occ", "congo customs"],
    keys: ["drc", "dr congo", "congo", "kinshasa", "lubumbashi", "direction generale des douanes", "office congolais de controle", "lobito", "kasumbalesa", "copperbelt", "katanga", "landlocked east", "vat drc", "tva"],
    answer: {
      sw: "DRC (Jamhuri ya Kidemokrasia ya Kongo): forodha husimamiwa na DGDA (Direction Générale des Douanes et Accises), na ukaguzi wa ubora/wingi na OCC (Office Congolais de Contrôle). VAT (TVA) ~16%. DRC ni kubwa na mizigo huingia kwa njia nyingi: mashariki/kusini-mashariki (Katanga/Copperbelt) kupitia Dar (Ukanda wa Kati, mpaka Kasumbalesa/Kabanga) au Mombasa; magharibi kupitia bandari za Lobito (Angola) na Matadi. DRC ni mwanachama wa SADC, COMESA na EAC.",
      en: "DRC (Democratic Republic of Congo): customs is run by the DGDA (Direction Générale des Douanes et Accises), with quality/quantity inspection by the OCC (Office Congolais de Contrôle). VAT (TVA) ~16%. The DRC is vast and cargo enters many ways: east/south-east (Katanga/Copperbelt) via Dar (Central Corridor, borders Kasumbalesa/Kabanga) or Mombasa; west via the ports of Lobito (Angola) and Matadi. The DRC belongs to SADC, COMESA and the EAC.",
    },
  },
  {
    topic: "country-south-africa",
    strong: ["sars", "south african revenue service", "customs and excise act"],
    keys: ["south africa", "afrika kusini", "vat 15", "vat 15%", "durban", "sacu", "ad valorem", "cape town", "richards bay", "south african vat", "rsa"],
    answer: {
      sw: "Afrika Kusini: forodha/kodi husimamiwa na SARS (South African Revenue Service) chini ya Customs & Excise Act. VAT ni 15%. Afrika Kusini ni kiongozi wa SACU (Common External Tariff ya pamoja na Botswana, Namibia, Lesotho, Eswatini). Bandari kuu: Durban (kubwa zaidi Afrika Kusini mwa Sahara), Cape Town, Richards Bay. Ni kitovu cha North–South Corridor inayohudumia Zambia, Zimbabwe, Malawi na DRC. Pia mwanachama wa SADC.",
      en: "South Africa: customs/tax is run by SARS (South African Revenue Service) under the Customs & Excise Act. VAT is 15%. South Africa leads SACU (a common external tariff shared with Botswana, Namibia, Lesotho, Eswatini). Main ports: Durban (sub-Saharan Africa's largest), Cape Town, Richards Bay. It anchors the North–South Corridor serving Zambia, Zimbabwe, Malawi and the DRC. Also a SADC member.",
    },
  },
  {
    topic: "country-nigeria",
    strong: ["ncs", "nigeria customs service", "b'odogwu", "bodogwu", "nicis"],
    keys: ["nigeria", "lagos", "apapa", "tin can", "vat 7.5", "vat 7.5%", "ecowas cet", "naira", "destination inspection", "nigerian vat", "west africa"],
    answer: {
      sw: "Nigeria: forodha husimamiwa na NCS (Nigeria Customs Service). Mfumo mpya ni B'Odogwu (unaochukua nafasi ya NICIS II). VAT ni 7.5%. Ushuru wa nje hufuata ECOWAS CET (0/5/10/20/35%). Bandari kuu: Apapa na Tin Can (Lagos). Nigeria hutumia destination inspection (badala ya pre-shipment). Ni mwanachama wa ECOWAS na AfCFTA — uchumi mkubwa zaidi Afrika Magharibi.",
      en: "Nigeria: customs is run by the NCS (Nigeria Customs Service). The new platform is B'Odogwu (replacing NICIS II). VAT is 7.5%. External duty follows the ECOWAS CET (0/5/10/20/35%). Main ports: Apapa and Tin Can (Lagos). Nigeria uses destination inspection (rather than pre-shipment). It is an ECOWAS and AfCFTA member — West Africa's largest economy.",
    },
  },
  {
    topic: "country-ghana",
    strong: ["gra customs", "icums", "unipass ghana", "ghana revenue authority"],
    keys: ["ghana", "tema", "takoradi", "integrated customs management system", "ecowas cet ghana", "vat ghana", "accra", "ghanaian", "west africa"],
    answer: {
      sw: "Ghana: forodha husimamiwa na GRA Customs Division kupitia ICUMS (Integrated Customs Management System, zamani UNIPASS). VAT pamoja na tozo zinazohusiana (NHIL, GETFund) huleta jumla ~ chini ya 20%; ushuru wa nje hufuata ECOWAS CET. Bandari kuu: Tema (karibu Accra) na Takoradi. Ghana ni mwanachama wa ECOWAS na AfCFTA, na sekretarieti ya AfCFTA ipo Accra.",
      en: "Ghana: customs is run by the GRA Customs Division via ICUMS (Integrated Customs Management System, formerly UNIPASS). VAT plus related levies (NHIL, GETFund) total just under 20%; external duty follows the ECOWAS CET. Main ports: Tema (near Accra) and Takoradi. Ghana is an ECOWAS and AfCFTA member, and the AfCFTA secretariat is in Accra.",
    },
  },
  {
    topic: "country-francophone-west",
    strong: ["gainde", "orbus", "dgd senegal", "dgd cote d'ivoire", "douanes"],
    keys: ["senegal", "cote d ivoire", "ivory coast", "dakar", "abidjan", "direction generale des douanes", "gainde single window", "orbus", "uemoa", "waemu", "cfa", "francophone", "vat senegal", "tva"],
    answer: {
      sw: "Afrika Magharibi ya Kifaransa: Senegal — forodha DGD (Direction Générale des Douanes), single window GAINDE/Orbus, bandari ya Dakar. Côte d'Ivoire — forodha DGD, bandari ya Abidjan (sehemu ya Abidjan–Lagos Corridor). Zote ni wanachama wa UEMOA/WAEMU (customs union ya faranga CFA) ndani ya ECOWAS, hivyo hutumia ECOWAS CET. VAT (TVA) ~18%.",
      en: "Francophone West Africa: Senegal — customs DGD (Direction Générale des Douanes), single window GAINDE/Orbus, port of Dakar. Côte d'Ivoire — customs DGD, port of Abidjan (part of the Abidjan–Lagos Corridor). Both are UEMOA/WAEMU members (the CFA-franc customs union) within ECOWAS, so they apply the ECOWAS CET. VAT (TVA) ~18%.",
    },
  },
  {
    topic: "country-egypt",
    strong: ["eca", "egyptian customs authority", "nafeza", "aci", "advance cargo information"],
    keys: ["egypt", "cairo", "alexandria", "port said", "suez", "nafeza single window", "advance cargo information", "vat egypt", "north africa", "comesa egypt", "egyptian"],
    answer: {
      sw: "Misri: forodha husimamiwa na ECA (Egyptian Customs Authority) kupitia single window ya Nafeza, ikitumia mfumo wa ACI (Advance Cargo Information) — taarifa za mzigo lazima zitumwe kabla mzigo haujafika. VAT ~14%. Bandari kuu: Alexandria, Port Said, na njia ya Suez Canal (njia muhimu ya dunia). Misri ni mwanachama wa COMESA na AfCFTA — lango la Afrika Kaskazini.",
      en: "Egypt: customs is run by the ECA (Egyptian Customs Authority) via the Nafeza single window, using the ACI (Advance Cargo Information) system — cargo data must be filed before arrival. VAT ~14%. Main ports: Alexandria, Port Said, and the Suez Canal route (a global chokepoint). Egypt is a COMESA and AfCFTA member — North Africa's gateway.",
    },
  },
  {
    topic: "country-ethiopia",
    strong: ["ecc", "ethiopian customs commission", "esw ethiopia"],
    keys: ["ethiopia", "addis ababa", "djibouti corridor", "djibouti-addis", "electronic single window", "landlocked ethiopia", "modjo dry port", "vat ethiopia", "horn of africa", "igad ethiopia"],
    answer: {
      sw: "Ethiopia: forodha husimamiwa na ECC (Ethiopian Customs Commission), ikitumia eSW (electronic Single Window). VAT 15%. Ethiopia haina bahari — karibu mizigo yote hupita Djibouti–Addis Corridor (bandari ya Djibouti → Modjo dry port → Addis Ababa) kwa reli ya kisasa na barabara. Ni mwanachama wa IGAD, COMESA na AfCFTA.",
      en: "Ethiopia: customs is run by the ECC (Ethiopian Customs Commission), using an eSW (electronic Single Window). VAT 15%. Ethiopia is landlocked — almost all cargo moves on the Djibouti–Addis Corridor (port of Djibouti → Modjo dry port → Addis Ababa) by modern rail and road. It belongs to IGAD, COMESA and AfCFTA.",
    },
  },
  {
    topic: "country-southern-customs",
    strong: ["zra", "zimra", "agt angola", "burs", "zambia revenue", "zimbabwe revenue"],
    keys: ["zambia", "zimbabwe", "angola", "botswana", "namibia", "mozambique", "asycudaworld", "vat zambia", "vat zimbabwe", "lobito", "beira", "nacala", "walvis bay", "lusaka", "harare", "luanda", "gaborone", "single window mozambique"],
    answer: {
      sw: "Kusini mwa Afrika (forodha): Zambia — ZRA (Zambia Revenue Authority), ASYCUDAWorld, VAT 16%, isiyo na bahari (hutumia Dar/TAZARA, North–South, Beira au Lobito). Zimbabwe — ZIMRA, VAT 15%. Angola — AGT (Administração Geral Tributária), bandari ya Lobito/Luanda. Botswana — BURS (sehemu ya SACU). Namibia — bandari ya Walvis Bay (Trans-Kalahari/Trans-Caprivi). Msumbiji — single window, bandari za Beira, Nacala na Maputo. Wengi ni wanachama wa SADC; baadhi COMESA.",
      en: "Southern Africa (customs): Zambia — ZRA (Zambia Revenue Authority), ASYCUDAWorld, VAT 16%, landlocked (uses Dar/TAZARA, North–South, Beira or Lobito). Zimbabwe — ZIMRA, VAT 15%. Angola — AGT (Administração Geral Tributária), ports of Lobito/Luanda. Botswana — BURS (part of SACU). Namibia — port of Walvis Bay (Trans-Kalahari/Trans-Caprivi). Mozambique — single window, ports of Beira, Nacala and Maputo. Most are SADC members; some also COMESA.",
    },
  },
  {
    topic: "country-maghreb",
    strong: ["adii", "portnet", "douane morocco", "tunisia customs"],
    keys: ["morocco", "tunisia", "casablanca", "tangier med", "tanger med", "administration des douanes", "portnet single window", "vat morocco", "tva", "maghreb customs", "north africa", "tunis"],
    answer: {
      sw: "Maghreb (Afrika Kaskazini): Morocco — forodha ADII (Administration des Douanes et Impôts Indirects), single window PortNet, bandari ya Tanger Med (mojawapo kubwa zaidi Afrika/Mediterania) na Casablanca; VAT (TVA) ~20%. Tunisia — forodha (Douane Tunisienne), bandari ya Radès/Tunis, single window. Zote ni wanachama wa UMA/AMU; Morocco ameomba kujiunga ECOWAS na ni sehemu ya AfCFTA.",
      en: "Maghreb (North Africa): Morocco — customs ADII (Administration des Douanes et Impôts Indirects), the PortNet single window, ports of Tanger Med (one of Africa/the Mediterranean's largest) and Casablanca; VAT (TVA) ~20%. Tunisia — customs (Douane Tunisienne), port of Radès/Tunis, a single window. Both belong to UMA/AMU; Morocco has applied to ECOWAS and is part of AfCFTA.",
    },
  },
  {
    topic: "africa-asycuda",
    strong: ["asycuda", "asycudaworld", "unctad customs"],
    keys: ["automated system for customs data", "common customs platform", "single window", "shared system", "many african countries", "uncTad", "customs software", "declaration system"],
    answer: {
      sw: "ASYCUDA (Automated System for Customs Data), na toleo lake la kisasa ASYCUDAWorld, ni mfumo wa forodha wa kielektroniki uliotengenezwa na UNCTAD na unaotumika na nchi nyingi za Afrika (Uganda, Zambia, Rwanda, Msumbiji, n.k.) kwa kuwasilisha matamko, kukadiria kodi, risk management na single window. Ni 'lingua franca' ya forodha Afrika — ingawa baadhi ya nchi zina mifumo yao (TANCIS Tanzania, iCMS Kenya, B'Odogwu Nigeria, ICUMS Ghana).",
      en: "ASYCUDA (Automated System for Customs Data), and its modern release ASYCUDAWorld, is UNCTAD's electronic customs platform used by many African countries (Uganda, Zambia, Rwanda, Mozambique, etc.) for lodging declarations, assessing duty, risk management and single windows. It is the customs 'lingua franca' of Africa — though some countries run their own systems (Tanzania's TANCIS, Kenya's iCMS, Nigeria's B'Odogwu, Ghana's ICUMS).",
    },
  },

  // =========================================================================
  // PAN-AFRICAN — PORTS & CORRIDORS
  // =========================================================================
  {
    topic: "corridor-northern",
    strong: ["northern corridor", "mombasa", "ukanda wa kaskazini"],
    keys: ["kenya port", "kpa", "kenya ports authority", "nairobi icd", "naivasha", "uganda", "rwanda", "south sudan", "eastern drc", "malaba", "busia", "sgr kenya", "mombasa vs dar"],
    answer: {
      sw: "Ukanda wa Kaskazini (Northern Corridor) unaanzia bandari ya Mombasa (Kenya, inayoendeshwa na Kenya Ports Authority/KPA) kwenda nchi zisizo na bahari: Uganda, Rwanda, South Sudan na DRC mashariki, kupitia Nairobi/Naivasha ICD na SGR ya Kenya, mipaka ya Malaba/Busia. Mombasa hushindana na Dar (Ukanda wa Kati) kwa mizigo ya Uganda, Rwanda na DRC — wateja huchagua kwa umbali, gharama, msongamano na muda wa transit.",
      en: "The Northern Corridor starts at the port of Mombasa (Kenya, run by the Kenya Ports Authority/KPA) serving landlocked Uganda, Rwanda, South Sudan and eastern DRC, via the Nairobi/Naivasha ICD and Kenya's SGR, crossing at Malaba/Busia. Mombasa competes with Dar (Central Corridor) for Uganda, Rwanda and DRC traffic — shippers choose on distance, cost, congestion and transit time.",
    },
  },
  {
    topic: "corridor-southern",
    strong: ["lobito corridor", "north-south corridor", "maputo corridor", "beira corridor", "nacala corridor", "walvis bay", "trans-kalahari", "trans-caprivi"],
    keys: ["durban", "lobito", "angola", "benguela railway", "zambia", "zimbabwe", "drc copperbelt", "maputo", "beira", "nacala", "mozambique", "namibia", "botswana", "malawi", "southern corridor", "trans kalahari", "trans caprivi"],
    answer: {
      sw: "Korido za Kusini mwa Afrika: North–South Corridor (Durban→Zimbabwe→Zambia→DRC) ni njia yenye shughuli nyingi zaidi SADC. Lobito Corridor (bandari ya Lobito, Angola→DRC/Zambia kupitia reli ya Benguela) ni njia mpya muhimu ya madini ya Copperbelt. Maputo Corridor (Maputo→Afrika Kusini/eSwatini). Beira & Nacala Corridors (Msumbiji→Malawi, Zambia, Zimbabwe). Walvis Bay (Namibia) kupitia Trans-Kalahari (→Botswana/Gauteng) na Trans-Caprivi/Trans-Zambezi (→Zambia/DRC). Hizi humpa mteja chaguo dhidi ya Dar/Mombasa.",
      en: "Southern African corridors: the North–South Corridor (Durban→Zimbabwe→Zambia→DRC) is SADC's busiest route. The Lobito Corridor (port of Lobito, Angola→DRC/Zambia via the Benguela railway) is a major new artery for Copperbelt minerals. The Maputo Corridor (Maputo→South Africa/eSwatini). The Beira & Nacala Corridors (Mozambique→Malawi, Zambia, Zimbabwe). Walvis Bay (Namibia) via Trans-Kalahari (→Botswana/Gauteng) and Trans-Caprivi/Trans-Zambezi (→Zambia/DRC). These give shippers alternatives to Dar/Mombasa.",
    },
  },
  {
    topic: "corridor-west-horn",
    strong: ["abidjan-lagos corridor", "abidjan lagos", "djibouti-addis", "djibouti corridor", "berbera"],
    keys: ["tema", "apapa", "lagos", "cotonou", "dakar", "lome", "djibouti", "berbera", "somaliland", "ethiopia", "niger", "mali", "burkina faso", "chad", "landlocked west", "horn of africa", "west africa ports"],
    answer: {
      sw: "Afrika Magharibi & Pembe ya Afrika: Abidjan–Lagos Corridor unaunganisha bandari za Abidjan, Tema, Lomé, Cotonou, Lagos (Apapa) — uti wa mgongo wa biashara ya pwani ya ECOWAS. Bandari hizi + Dakar hupeleka mizigo kwa nchi zisizo na bahari: Mali, Burkina Faso, Niger, Chad (kupitia Cotonou/Lomé/Apapa). Pembe ya Afrika: Djibouti–Addis Corridor (Djibouti→Ethiopia) na Berbera (Somaliland) kama mbadala kwa Ethiopia. Kila korido huhudumia nchi zisizo na bahari zinazoizunguka.",
      en: "West Africa & the Horn: the Abidjan–Lagos Corridor links the ports of Abidjan, Tema, Lomé, Cotonou and Lagos (Apapa) — the spine of ECOWAS coastal trade. These plus Dakar feed landlocked Mali, Burkina Faso, Niger and Chad (via Cotonou/Lomé/Apapa). Horn of Africa: the Djibouti–Addis Corridor (Djibouti→Ethiopia) and Berbera (Somaliland) as an alternative for Ethiopia. Each corridor serves the landlocked countries around it.",
    },
  },

  // =========================================================================
  // CROSS-CUTTING LOGISTICS LAW / INSTRUMENTS
  // =========================================================================
  {
    topic: "law-rules-of-origin",
    strong: ["rules of origin", "certificate of origin", "eur.1", "eur1", "kanuni za asili"],
    keys: ["coo", "preferential origin", "wholly obtained", "value addition", "tariff shift", "eac coo", "sadc coo", "comesa coo", "afcfta coo", "cheti cha asili", "asili ya bidhaa", "origin criteria", "proof of origin"],
    answer: {
      sw: "Rules of origin (kanuni za asili) huamua 'utaifa wa kiuchumi' wa bidhaa ili kupata ushuru wa upendeleo ndani ya bloc. Vigezo: 'wholly obtained' (imezalishwa kabisa nchini) au value-addition/tariff-shift ya kutosha. Uthibitisho ni Certificate of Origin: EUR.1 (biashara na EU/EFTA), na CoO za EAC, SADC, COMESA na AfCFTA kwa biashara ndani ya Afrika. Bila CoO sahihi, bidhaa hulipia ushuru kamili (MFN) badala ya 0% ya upendeleo.",
      en: "Rules of origin determine a good's 'economic nationality' to qualify for preferential duty inside a bloc. Criteria: 'wholly obtained' (entirely produced in-country) or sufficient value-addition/tariff-shift. Proof is a Certificate of Origin: EUR.1 (trade with the EU/EFTA), and the EAC, SADC, COMESA and AfCFTA CoOs for intra-African trade. Without a valid CoO, goods pay full (MFN) duty instead of the 0% preference.",
    },
  },
  {
    topic: "law-transit-guarantee",
    strong: ["tir", "rctg", "regional customs transit guarantee", "transit bond", "carnet"],
    keys: ["tir carnet", "comesa carnet", "single bond", "transit guarantee", "cross border transit", "ects", "electronic cargo tracking", "dhamana ya transit", "one bond", "regional bond"],
    answer: {
      sw: "Dhamana ya transit ya kikanda: badala ya kuweka bondi mpya kila mpaka, mfumo wa RCTG (Regional Customs Transit Guarantee — COMESA/EAC) hutumia dhamana moja inayotambulika nchi nzima njiani, sawa na TIR Carnet ya kimataifa. Pamoja na ECTS (Electronic Cargo Tracking System), forodha hufuatilia mzigo wa transit ukiwa njiani. Hii hupunguza gharama, ucheleweshaji na ulanguzi kwa nchi zisizo na bahari.",
      en: "Regional transit guarantee: instead of posting a fresh bond at each border, the RCTG (Regional Customs Transit Guarantee — COMESA/EAC) uses one guarantee honoured along the whole route, much like the international TIR Carnet. Combined with an ECTS (Electronic Cargo Tracking System), customs monitors transit cargo en route. This cuts costs, delays and diversion for landlocked countries.",
    },
  },
  {
    topic: "law-yellow-card-insurance",
    strong: ["yellow card", "comesa yellow card", "third party insurance", "motor insurance"],
    keys: ["bima ya gari", "third-party", "cross border insurance", "regional insurance", "accident liability", "bima ya mpakani", "vehicle insurance", "comesa insurance"],
    answer: {
      sw: "COMESA Yellow Card ni mpango wa bima ya gari (third-party / liability) inayotambulika mipakani ya nchi wanachama wa COMESA. Dereva mmoja anakuwa na karatasi ya njano (Yellow Card) inayofidia ajali na madhara kwa watu wa tatu katika nchi zote zinazoshiriki — bila kununua bima mpya kila mpaka. Ni muhimu kwa malori ya transit yanayovuka nchi kadhaa. (Tanzania ipo SADC/EAC; kwa korido za COMESA, Yellow Card hutumika upande wa nchi wanachama.)",
      en: "The COMESA Yellow Card is a motor third-party/liability insurance scheme recognised across COMESA member borders. A driver carries one Yellow Card that covers accidents and third-party harm in all participating countries — without buying fresh insurance at each border. It is vital for transit trucks crossing several countries. (Tanzania is in SADC/EAC; on COMESA corridors the Yellow Card applies on member-state legs.)",
    },
  },
  {
    topic: "law-dangerous-goods",
    strong: ["dangerous goods", "imdg", "adr", "bidhaa hatari", "hazmat"],
    keys: ["hazardous", "imo class", "un number", "msds", "sds", "flammable", "corrosive", "explosives", "lithium battery", "placard", "dgr iata", "kemikali hatari", "spill"],
    answer: {
      sw: "Bidhaa hatari (dangerous goods) husafirishwa chini ya kanuni za kimataifa: IMDG Code (baharini), ADR (barabarani), na IATA DGR (angani). Bidhaa huainishwa kwa IMO/UN class (mfano flammable, corrosive, explosive, lithium batteries) na UN number, na lazima ziwe na packaging sahihi, lebo/placards, na nyaraka (SDS/MSDS, Dangerous Goods Declaration). Tanzania pia inahusisha Jeshi la Zimamoto na vibali maalum kwa baadhi ya kemikali.",
      en: "Dangerous goods move under international rules: the IMDG Code (sea), ADR (road), and IATA DGR (air). Goods are classified by IMO/UN class (e.g. flammable, corrosive, explosive, lithium batteries) and a UN number, and must have correct packaging, labels/placards, and documents (SDS/MSDS, Dangerous Goods Declaration). In Tanzania the Fire & Rescue Force and special permits also apply to certain chemicals.",
    },
  },
  {
    topic: "law-sps-phytosanitary",
    strong: ["phytosanitary", "sps", "sanitary", "spitosanitary", "afya ya mimea"],
    keys: ["plant health", "fumigation", "ufukizaji", "pest", "wadudu", "import permit plant", "ippc", " phytosanitary certificate", "food safety", "veterinary certificate", "tphpa", "produce export", "agricultural"],
    answer: {
      sw: "SPS (Sanitary & Phytosanitary) ni hatua za usalama wa afya ya binadamu, wanyama na mimea kwenye biashara. Mazao ya kilimo yanayouzwa nje/kuingizwa mara nyingi yanahitaji Phytosanitary Certificate (chini ya IPPC) inayothibitisha hayana wadudu/magonjwa, na pengine ufukizaji (fumigation). Bidhaa za wanyama zinahitaji veterinary/health certificate. Tanzania: TPHPA hutoa cheti cha phytosanitary; nchi nyingi za Afrika zina mamlaka sawa. Bila vyeti hivi, mzigo huzuiwa au kuharibiwa.",
      en: "SPS (Sanitary & Phytosanitary) measures protect human, animal and plant health in trade. Agricultural produce exported/imported usually needs a Phytosanitary Certificate (under the IPPC) attesting it is pest/disease-free, and sometimes fumigation. Animal products need a veterinary/health certificate. In Tanzania the TPHPA issues the phytosanitary certificate; most African countries have an equivalent authority. Without these, cargo is held or destroyed.",
    },
  },
  {
    topic: "law-inspection",
    strong: ["pvoc", "destination inspection", "pre-shipment inspection", "psi", "conformity assessment"],
    keys: ["certificate of conformity", "coc", "soncap nigeria", "pvoc kenya", "pca ghana", "inspection scheme", "ukaguzi wa ubora", "intertek", "sgs", "bureau veritas", "standards mark", "import inspection"],
    answer: {
      sw: "Ukaguzi wa kufuata viwango (conformity): nchi nyingi za Afrika zinataka bidhaa zilizodhibitiwa kukaguliwa kabla/zikifika ili kupata Certificate of Conformity (CoC). Mifano: PVoC (Tanzania TBS na Kenya KEBS), SONCAP (Nigeria), na programu za Ghana/Uganda — mara nyingi zinaendeshwa na makampuni kama SGS, Intertek au Bureau Veritas nchi ya asili (pre-shipment) au baadhi hutumia destination inspection. Bila CoC, bidhaa huzuiwa au hutozwa ada za ukaguzi wa ziada bandarini.",
      en: "Conformity inspection: many African countries require regulated goods to be checked before/on arrival to obtain a Certificate of Conformity (CoC). Examples: PVoC (Tanzania's TBS and Kenya's KEBS), SONCAP (Nigeria), and Ghana/Uganda schemes — often run by firms like SGS, Intertek or Bureau Veritas in the country of origin (pre-shipment), while some use destination inspection. Without a CoC, goods are held or hit with extra inspection fees at the port.",
    },
  },

  // =========================================================================
  // PAN-AFRICAN GENERAL OVERVIEW
  // =========================================================================
  {
    topic: "africa-overview",
    strong: ["africa logistics", "pan-african", "all of africa", "afrika nzima", "logistics across africa"],
    keys: ["which authority", "which port", "trade across africa", "continent", "biashara afrika", "cross-continent", "any country africa", "african trade", "import to africa", "export from africa"],
    answer: {
      sw: "Rubani anafahamu usafirishaji kote Afrika: jumuiya za kibiashara (EAC, SADC, ECOWAS, COMESA, CEMAC/ECCAS, UMA, IGAD, CEN-SAD, SACU, AfCFTA + WTO/WCO); mamlaka za forodha za nchi (TRA, KRA, URA, RRA, OBR, DGDA, SARS, NCS, GRA, DGD, ECA, ECC, ZRA, ZIMRA, AGT, ADII, BURS); mifumo (TANCIS, iCMS, ASYCUDA, B'Odogwu, ICUMS, Nafeza, PortNet); bandari na korido (Mombasa/Northern, Dar/Central, Durban/North–South, Lobito, Maputo, Beira, Nacala, Walvis Bay, Abidjan–Lagos, Djibouti–Addis); sheria (rules of origin, RCTG/TIR, COMESA Yellow Card, axle-load, IMDG/ADR, SPS, PVoC, Incoterms 2020); na hesabu (duty+VAT kwa nchi, CBM, volumetric). Niulize nchi au mada yoyote.",
      en: "Rubani covers logistics across all of Africa: trade blocs (EAC, SADC, ECOWAS, COMESA, CEMAC/ECCAS, UMA, IGAD, CEN-SAD, SACU, AfCFTA + WTO/WCO); national customs authorities (TRA, KRA, URA, RRA, OBR, DGDA, SARS, NCS, GRA, DGD, ECA, ECC, ZRA, ZIMRA, AGT, ADII, BURS); systems (TANCIS, iCMS, ASYCUDA, B'Odogwu, ICUMS, Nafeza, PortNet); ports and corridors (Mombasa/Northern, Dar/Central, Durban/North–South, Lobito, Maputo, Beira, Nacala, Walvis Bay, Abidjan–Lagos, Djibouti–Addis); laws (rules of origin, RCTG/TIR, COMESA Yellow Card, axle-load, IMDG/ADR, SPS, PVoC, Incoterms 2020); and maths (per-country duty+VAT, CBM, volumetric). Ask me about any country or topic.",
    },
  },
];

// ---------------------------------------------------------------------------
// Structured enrichment — steps (playbooks), sources (authority intents),
// and actions (next in-app step), keyed by topic. Kept separate from INTENTS
// so the prose `text` answers stay untouched and backward-compatible.
// ---------------------------------------------------------------------------

// Ordered bilingual steps for procedural intents. The prose `text` remains the
// summary; these power a structured/numbered UI.
const STEPS_BY_TOPIC: Record<string, { sw: string[]; en: string[] }> = {
  "playbook-import-container": {
    sw: [
      "Sajili biashara BRELA na upate TIN (TRA).",
      "Pata pro-forma invoice na kubaliana Incoterm na muuzaji.",
      "Hakikisha vibali (TBS/PVoC, TMDA, n.k.) kama bidhaa zinahitaji.",
      "Bidhaa zinasafirishwa; unapata Bill of Lading.",
      "Mteue wakala wa TAFFA awasilishe TANSAD kwenye TANCIS.",
      "Lipa ushuru/VAT kupitia control number ya GePG.",
      "TPA/TICTS wanatoa kontena baada ya release order.",
      "Panga usafiri (SGR/lori) hadi ghala; rudisha kontena tupu kuepuka detention.",
    ],
    en: [
      "Register the business with BRELA and get a TIN (TRA).",
      "Obtain a pro-forma invoice and agree an Incoterm with the seller.",
      "Secure permits (TBS/PVoC, TMDA, etc.) if the goods are regulated.",
      "Goods ship; you receive the Bill of Lading.",
      "Appoint a TAFFA agent to lodge the TANSAD in TANCIS.",
      "Pay duty/VAT via the GePG control number.",
      "TPA/TICTS release the container after the release order.",
      "Arrange haulage (SGR/truck) to your warehouse; return the empty to avoid detention.",
    ],
  },
  "playbook-clear-customs": {
    sw: [
      "Kusanya nyaraka — Bill of Lading, Invoice, Packing List, Certificate of Origin, vibali.",
      "Wakala wa TAFFA anawasilisha tamko (TANSAD) kwenye TANCIS na kuainisha HS code.",
      "TANCIS inakadiria kodi na kupanga channel (kijani/njano/nyekundu).",
      "Lipa kupitia GePG (control number).",
      "Kama ni nyekundu, mzigo unakaguliwa kimwili.",
      "Release order inatolewa.",
      "Lipa ada za TPA/shipping line, kisha chukua mzigo.",
    ],
    en: [
      "Gather docs — Bill of Lading, Invoice, Packing List, Certificate of Origin, permits.",
      "A TAFFA agent lodges the declaration (TANSAD) in TANCIS and classifies the HS code.",
      "TANCIS assesses duty and assigns a channel (green/yellow/red).",
      "Pay via GePG (control number).",
      "If red, the cargo is physically examined.",
      "A release order is issued.",
      "Pay TPA/shipping-line charges, then take delivery.",
    ],
  },
  "playbook-sgr-cargo": {
    sw: [
      "Kamilisha forodha bandari ya Dar (au tumia transit kwenda ICD).",
      "Kontena linahamishwa kutoka TICTS hadi kituo cha reli/ICD.",
      "Weka booking ya mzigo na TRC kwa treni ya mizigo.",
      "Kontena linapakiwa kwenye behewa; treni inaelekea Morogoro/Dodoma/Makutupora kuelekea Mwanza.",
      "Kufika ICD ya bara, kontena linatolewa na kupelekwa kwa lori hadi mlangoni.",
    ],
    en: [
      "Clear customs at Dar port (or move under transit to an ICD).",
      "The container transfers from TICTS to the rail/ICD terminal.",
      "Place a freight booking with the TRC.",
      "The container is loaded onto a wagon; the train runs to Morogoro/Dodoma/Makutupora toward Mwanza.",
      "At the inland ICD the container is offloaded and trucked to the door.",
    ],
  },
  "playbook-transit": {
    sw: [
      "Mzigo unafika Dar kama transit (hauipiliwi kodi ya Tanzania).",
      "Wakala anawasilisha transit declaration (T1) kwenye TANCIS chini ya bondi.",
      "Mzigo unasafirishwa kwa SGR/TAZARA/lori chini ya ufuatiliaji (ECTS) kupitia Ukanda wa Kati.",
      "Mpakani (Tunduma/Kasumbalesa/Kabanga) mzigo unathibitishwa kuondoka.",
      "Bondi inafungwa (acquittal); forodha halisi inalipwa nchi ya mwisho.",
    ],
    en: [
      "Cargo arrives at Dar as transit (no Tanzanian duty).",
      "The agent lodges a transit declaration (T1) in TANCIS under a customs bond.",
      "It moves by SGR/TAZARA/truck under tracking (ECTS) via the Central Corridor.",
      "At the border (Tunduma/Kasumbalesa/Kabanga) exit is confirmed.",
      "The bond is acquitted; actual duty is paid in the destination country.",
    ],
  },
  "playbook-become-agent": {
    sw: [
      "Sajili kampuni BRELA na upate TIN.",
      "Jiunge/ufuzu na TAFFA na ufaulu mafunzo/mtihani wa weledi.",
      "Pata leseni ya TASAC kwa huduma za freight forwarding (na za baharini).",
      "Hakikisha una dhamana/bond ya forodha inayohitajika.",
      "Pata akaunti ya kuingia TANCIS ili kuwasilisha matamko kwa niaba ya wateja.",
    ],
    en: [
      "Register a company with BRELA and get a TIN.",
      "Join/qualify through TAFFA and pass the competence training/exam.",
      "Obtain a TASAC licence for freight-forwarding (and maritime) services.",
      "Hold the required customs bond/guarantee.",
      "Get a TANCIS login to lodge declarations on clients' behalf.",
    ],
  },
  "playbook-export-docs": {
    sw: [
      "Andaa Commercial Invoice na Packing List.",
      "Wasilisha export declaration kwenye TANCIS (kupitia wakala wa TAFFA).",
      "Pata Certificate of Origin (EAC/SADC/AfCFTA kwa upendeleo wa ushuru).",
      "Pata Bill of Lading / Airway Bill.",
      "Pata vyeti maalum kulingana na bidhaa — phytosanitary (TPHPA), ubora (TBS), au vibali vya madini/mifugo.",
    ],
    en: [
      "Prepare the Commercial Invoice and Packing List.",
      "Lodge an export declaration in TANCIS (via a TAFFA agent).",
      "Obtain a Certificate of Origin (EAC/SADC/AfCFTA for tariff preference).",
      "Obtain the Bill of Lading / Airway Bill.",
      "Get commodity-specific certificates — phytosanitary (TPHPA), quality (TBS), or mineral/livestock permits.",
    ],
  },
};

// Named authorities / frameworks per topic (authority & framework intents).
const SOURCES_BY_TOPIC: Record<string, LxSource[]> = {
  customs: [{ name: "TRA" }, { name: "TANCIS" }, { name: "TAFFA" }, { name: "TASAC" }],
  "customs-docs": [{ name: "TANCIS" }, { name: "TAFFA" }],
  "customs-regimes": [{ name: "TANCIS" }, { name: "EAC" }],
  "agency-tra": [{ name: "TRA", note: "Tanzania Revenue Authority" }, { name: "TANCIS" }, { name: "GePG" }],
  "agency-tancis": [{ name: "TANCIS" }, { name: "TRA" }, { name: "GePG" }, { name: "TAFFA" }],
  "agency-tasac": [{ name: "TASAC", note: "Tanzania Shipping Agents Corporation" }],
  "agency-tpa": [{ name: "TPA", note: "Tanzania Ports Authority" }, { name: "TICTS" }],
  "agency-sgr": [{ name: "TRC", note: "Tanzania Railway Corporation" }],
  "agency-tazara": [{ name: "TAZARA" }],
  "agency-latra": [{ name: "LATRA" }],
  "agency-tanroads": [{ name: "TANROADS" }, { name: "EAC Vehicle Load Control Act" }],
  "agency-tbs": [{ name: "TBS", note: "Tanzania Bureau of Standards" }, { name: "PVoC" }],
  "agency-permits": [{ name: "TMDA" }, { name: "TPHPA" }, { name: "TBS" }, { name: "NEMC" }],
  "agency-tcaa": [{ name: "TCAA", note: "Tanzania Civil Aviation Authority" }],
  "agency-registration": [{ name: "BRELA" }, { name: "TRA" }, { name: "NIDA" }, { name: "eGA" }],
  "agency-payments": [{ name: "GePG" }, { name: "Bank of Tanzania" }, { name: "TIPS" }],
  "framework-eac": [{ name: "EAC", note: "Customs Union / SCT / CET" }],
  "framework-regional-blocs": [{ name: "COMESA" }, { name: "SADC" }, { name: "AfCFTA" }],
  "framework-wto-wco": [{ name: "WTO", note: "Trade Facilitation Agreement" }, { name: "WCO", note: "Harmonized System" }],
  "framework-aeo": [{ name: "TRA" }, { name: "EAC", note: "AEO programme" }],
  "africa-afcfta": [{ name: "AfCFTA" }, { name: "African Union" }],
  "africa-sadc": [{ name: "SADC" }],
  "africa-comesa": [{ name: "COMESA" }],
  "africa-asycuda": [{ name: "UNCTAD", note: "ASYCUDA / ASYCUDAWorld" }],
  "law-rules-of-origin": [{ name: "EAC" }, { name: "SADC" }, { name: "COMESA" }, { name: "AfCFTA" }],
  "law-transit-guarantee": [{ name: "RCTG", note: "COMESA/EAC" }, { name: "TIR" }],
  "law-yellow-card-insurance": [{ name: "COMESA", note: "Yellow Card scheme" }],
  "law-dangerous-goods": [{ name: "IMDG Code" }, { name: "ADR" }, { name: "IATA DGR" }],
  "law-sps-phytosanitary": [{ name: "IPPC" }, { name: "TPHPA" }],
  "law-inspection": [{ name: "PVoC" }, { name: "TBS" }, { name: "SGS / Intertek / Bureau Veritas" }],
  "country-kenya": [{ name: "KRA" }, { name: "iCMS" }],
  "country-uganda": [{ name: "URA" }, { name: "ASYCUDAWorld" }],
  "country-south-africa": [{ name: "SARS" }, { name: "SACU" }],
  "country-nigeria": [{ name: "NCS" }, { name: "B'Odogwu" }],
  "africa-sacu": [{ name: "SACU" }, { name: "SARS" }],
};

// Next-step actions per topic (kinds: navigate | openForm | track | estimateDuty).
const ACTIONS_BY_TOPIC: Record<string, LxAction[]> = {
  customs: [
    { kind: "navigate", label: { sw: "Fungua Forodha", en: "Open Customs" }, payload: { path: "/customs" } },
    { kind: "estimateDuty", label: { sw: "Kadiria ushuru", en: "Estimate duty" } },
  ],
  "customs-docs": [{ kind: "navigate", label: { sw: "Fungua Forodha", en: "Open Customs" }, payload: { path: "/customs" } }],
  "agency-tra": [{ kind: "estimateDuty", label: { sw: "Kadiria ushuru", en: "Estimate duty" } }],
  "agency-tancis": [
    { kind: "openForm", label: { sw: "Jaza TANSAD", en: "Fill TANSAD" }, payload: { templateId: "tansad-sad" } },
  ],
  "calc-duty": [{ kind: "navigate", label: { sw: "Nenda Fedha", en: "Open Finance" }, payload: { path: "/finance" } }],
  "calc-landed-cost": [{ kind: "navigate", label: { sw: "Nenda Fedha", en: "Open Finance" }, payload: { path: "/finance" } }],
  pricing: [{ kind: "navigate", label: { sw: "Pata quote", en: "Get a quote" }, payload: { path: "/finance" } }],
  "cargolink-track": [{ kind: "track", label: { sw: "Fuatilia mzigo", en: "Track shipment" } }],
  "cargolink-book": [{ kind: "navigate", label: { sw: "Weka mzigo", en: "Book shipment" }, payload: { path: "/marketplace" } }],
  "cargolink-partner": [
    { kind: "navigate", label: { sw: "Jiunge soko", en: "Join marketplace" }, payload: { path: "/marketplace" } },
  ],
  "agency-payments": [{ kind: "navigate", label: { sw: "Nenda Pochi", en: "Open Wallet" }, payload: { path: "/wallet" } }],
  "playbook-import-container": [
    { kind: "navigate", label: { sw: "Fungua Forodha", en: "Open Customs" }, payload: { path: "/customs" } },
    { kind: "estimateDuty", label: { sw: "Kadiria ushuru", en: "Estimate duty" } },
  ],
  "playbook-clear-customs": [
    { kind: "openForm", label: { sw: "Jaza TANSAD", en: "Fill TANSAD" }, payload: { templateId: "tansad-sad" } },
  ],
  "playbook-export-docs": [
    { kind: "navigate", label: { sw: "Fungua fomu", en: "Open forms" }, payload: { path: "/forms" } },
  ],
  "playbook-become-agent": [
    { kind: "navigate", label: { sw: "Jiunge soko", en: "Join marketplace" }, payload: { path: "/marketplace" } },
  ],
};

/** Attach steps/sources/actions to a base answer for a given topic (additive). */
function enrich(answer: LxAnswer): LxAnswer {
  const steps = STEPS_BY_TOPIC[answer.topic];
  const sources = SOURCES_BY_TOPIC[answer.topic];
  const actions = ACTIONS_BY_TOPIC[answer.topic];
  if (steps) answer.steps = steps;
  if (sources) answer.sources = sources;
  if (actions) answer.actions = actions;
  return answer;
}

// ---------------------------------------------------------------------------
// Calculators
// ---------------------------------------------------------------------------

function pickNumbers(q: string): number[] {
  const m = normalize(q).match(/\d+(?:\.\d+)?/g);
  return m ? m.map(Number) : [];
}

// Country -> standard VAT/sales-tax rate (%) used by the duty estimator.
// Each entry lists match aliases (already lowercased) + the rate.
const COUNTRY_VAT: { aliases: string[]; name: string; rate: number }[] = [
  { name: "Tanzania", rate: 18, aliases: ["tanzania", "tra", "tanzanian", "tz"] },
  { name: "Kenya", rate: 16, aliases: ["kenya", "kra", "kenyan", "mombasa"] },
  { name: "Uganda", rate: 18, aliases: ["uganda", "ura", "ugandan"] },
  { name: "Rwanda", rate: 18, aliases: ["rwanda", "rra", "rwandan"] },
  { name: "Burundi", rate: 18, aliases: ["burundi", "obr"] },
  { name: "DRC", rate: 16, aliases: ["drc", "dr congo", "dgda", "congo"] },
  { name: "South Africa", rate: 15, aliases: ["south africa", "sars", "afrika kusini", "rsa"] },
  { name: "Nigeria", rate: 7.5, aliases: ["nigeria", "ncs", "nigerian", "lagos"] },
  { name: "Ghana", rate: 15, aliases: ["ghana", "gra", "ghanaian", "tema"] },
  { name: "Egypt", rate: 14, aliases: ["egypt", "eca", "egyptian", "nafeza"] },
  { name: "Ethiopia", rate: 15, aliases: ["ethiopia", "ecc", "ethiopian", "addis"] },
  { name: "Zambia", rate: 16, aliases: ["zambia", "zra", "zambian", "lusaka"] },
  { name: "Zimbabwe", rate: 15, aliases: ["zimbabwe", "zimra", "harare"] },
  { name: "Morocco", rate: 20, aliases: ["morocco", "adii", "moroccan", "casablanca"] },
  { name: "Senegal", rate: 18, aliases: ["senegal", "dakar", "senegalese"] },
  { name: "Côte d'Ivoire", rate: 18, aliases: ["cote d ivoire", "ivory coast", "abidjan"] },
];

// Strongest single-token alias per country (matches that country's intent's
// `strong` keys) — used to bias follow-up resolution toward the concrete
// country topic rather than a generic keyword-sharing intent.
const COUNTRY_STRONG_ALIAS: Record<string, string> = {
  Tanzania: "tra",
  Kenya: "kra",
  Uganda: "ura",
  Rwanda: "rra",
  Burundi: "obr",
  DRC: "dgda",
  "South Africa": "sars",
  Nigeria: "ncs",
  Ghana: "gra",
  Egypt: "eca",
  Ethiopia: "ecc",
  Zambia: "zra",
  Zimbabwe: "zimra",
};

function pickCountryVat(qNorm: string): { name: string; rate: number } | null {
  const toks = new Set(qNorm.split(" ").filter(Boolean));
  // Pass 1: short/ambiguous aliases (≤4 chars like "tra","tz","kra") must match
  // a WHOLE token so "transit" doesn't trip "tra"=Tanzania.
  for (const c of COUNTRY_VAT) {
    for (const a of c.aliases) {
      if (a.length <= 4) {
        if (toks.has(a)) return { name: c.name, rate: c.rate };
      } else if (qNorm.includes(a)) {
        return { name: c.name, rate: c.rate };
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Entity extraction (for multi-turn memory). Pure: reads only the query.
// Returns a flat string map: { country, corridor, mode, value }.
// ---------------------------------------------------------------------------

const CORRIDOR_ALIASES: { name: string; aliases: string[] }[] = [
  { name: "Central Corridor", aliases: ["central corridor", "ukanda wa kati", "dar corridor"] },
  { name: "Northern Corridor", aliases: ["northern corridor", "ukanda wa kaskazini", "mombasa corridor"] },
  { name: "North-South Corridor", aliases: ["north-south corridor", "north south corridor"] },
  { name: "Lobito Corridor", aliases: ["lobito corridor", "lobito"] },
  { name: "Maputo Corridor", aliases: ["maputo corridor"] },
  { name: "Beira Corridor", aliases: ["beira corridor", "beira"] },
  { name: "Nacala Corridor", aliases: ["nacala corridor", "nacala"] },
  { name: "Djibouti-Addis Corridor", aliases: ["djibouti-addis", "djibouti corridor", "djibouti addis"] },
  { name: "Abidjan-Lagos Corridor", aliases: ["abidjan-lagos", "abidjan lagos"] },
];

const MODE_ALIASES: { name: string; aliases: string[] }[] = [
  { name: "sea", aliases: ["sea", "ocean", "meli", "baharini", "vessel", "maritime"] },
  { name: "air", aliases: ["air", "ndege", "airfreight", "air cargo", "anga"] },
  { name: "rail", aliases: ["rail", "sgr", "reli", "train", "treni", "tazara"] },
  { name: "road", aliases: ["road", "truck", "lori", "barabara", "trucking", "haulage"] },
];

function extractEntities(qNorm: string): Record<string, string> {
  const e: Record<string, string> = {};
  const country = pickCountryVat(qNorm);
  if (country) e.country = country.name;
  for (const c of CORRIDOR_ALIASES) {
    if (c.aliases.some((a) => qNorm.includes(a))) {
      e.corridor = c.name;
      break;
    }
  }
  for (const m of MODE_ALIASES) {
    if (m.aliases.some((a) => qNorm.includes(a))) {
      e.mode = m.name;
      break;
    }
  }
  const nums = pickNumbers(qNorm);
  if (nums.length) e.value = String(nums.reduce((a, b) => Math.max(a, b), 0));
  return e;
}

/** A query is a "follow-up" when it is short and lacks its own subject. */
function looksLikeFollowUp(qNorm: string): boolean {
  const t = qNorm.split(" ").filter(Boolean);
  if (t.length > 7) return false;
  // pronoun/anaphora cues in sw + en
  return /(there|hapo|huko|that|hiyo|hilo|hapohapo|vipi kuhusu|what about|and the|na je|je\b|its|yake)/.test(qNorm);
}

// ---------------------------------------------------------------------------
// HS-code chapter hint — map common goods words to a likely HS chapter.
// Indicative only; the legal classification is TRA/TANCIS's call.
// ---------------------------------------------------------------------------

const HS_HINTS: { aliases: string[]; chapter: string; desc: { sw: string; en: string } }[] = [
  { aliases: ["coffee", "kahawa"], chapter: "09", desc: { sw: "Kahawa, chai, viungo", en: "Coffee, tea, spices" } },
  { aliases: ["tea", "chai"], chapter: "09", desc: { sw: "Chai, kahawa, viungo", en: "Tea, coffee, spices" } },
  { aliases: ["rice", "mchele", "maize", "mahindi", "grain", "nafaka", "wheat", "ngano"], chapter: "10", desc: { sw: "Nafaka", en: "Cereals" } },
  { aliases: ["sugar", "sukari"], chapter: "17", desc: { sw: "Sukari (mara nyingi sensitive/excisable)", en: "Sugar (often sensitive/excisable)" } },
  { aliases: ["fertilizer", "fertiliser", "mbolea"], chapter: "31", desc: { sw: "Mbolea", en: "Fertilizers" } },
  { aliases: ["medicine", "medicament", "pharma", "dawa"], chapter: "30", desc: { sw: "Dawa (kibali TMDA)", en: "Pharmaceuticals (TMDA permit)" } },
  { aliases: ["plastic", "plastiki"], chapter: "39", desc: { sw: "Plastiki na bidhaa zake", en: "Plastics & articles" } },
  { aliases: ["cement", "saruji"], chapter: "25", desc: { sw: "Saruji, chumvi, madini", en: "Cement, salt, minerals" } },
  { aliases: ["fuel", "petrol", "diesel", "mafuta"], chapter: "27", desc: { sw: "Mafuta ya petroli (excisable)", en: "Mineral fuels (excisable)" } },
  { aliases: ["iron", "steel", "chuma"], chapter: "72", desc: { sw: "Chuma na vyuma", en: "Iron & steel" } },
  { aliases: ["machine", "machinery", "mashine", "engine", "injini"], chapter: "84", desc: { sw: "Mashine na vifaa vya mitambo", en: "Machinery & mechanical appliances" } },
  { aliases: ["electronic", "electronics", "phone", "simu", "computer", "kompyuta", "tv", "luninga"], chapter: "85", desc: { sw: "Vifaa vya umeme/elektroniki", en: "Electrical/electronic equipment" } },
  { aliases: ["vehicle", "car", "gari", "motor", "truck chassis"], chapter: "87", desc: { sw: "Magari (mara nyingi excisable)", en: "Vehicles (often excisable)" } },
  { aliases: ["clothes", "clothing", "apparel", "nguo", "mavazi", "garment"], chapter: "61", desc: { sw: "Mavazi (yaliyofumwa)", en: "Apparel (knitted)" } },
  { aliases: ["shoes", "footwear", "viatu"], chapter: "64", desc: { sw: "Viatu", en: "Footwear" } },
  { aliases: ["furniture", "samani", "fanicha"], chapter: "94", desc: { sw: "Samani / fanicha", en: "Furniture" } },
];

function tryHsHint(qNorm: string): LxAnswer | null {
  for (const h of HS_HINTS) {
    if (h.aliases.some((a) => qNorm.includes(a))) {
      return {
        topic: "hs-hint",
        data: { chapter: h.chapter, indicative: true },
        text: {
          sw: `Mwongozo wa HS code: bidhaa hii inaelekea kuanguka kwenye Sura ${h.chapter} ya HS (${h.desc.sw}). HII NI DALILI TU — thibitisha uainishaji kamili na TRA/TANCIS kabla ya kulipa ushuru.`,
          en: `HS code hint: this good likely falls under HS Chapter ${h.chapter} (${h.desc.en}). INDICATIVE ONLY — confirm the full classification with TRA/TANCIS before paying duty.`,
        },
      };
    }
  }
  return null;
}

/** Treat dimensions as cm unless they're clearly already metres (<= 10 and decimal-ish). */
function toMetres(values: number[]): { metres: number[]; assumedCm: boolean } {
  // If every value is small (<= 12) we assume metres; otherwise centimetres.
  const looksMetres = values.every((v) => v <= 12);
  if (looksMetres) return { metres: values, assumedCm: false };
  return { metres: values.map((v) => v / 100), assumedCm: true };
}

function fmt(n: number, dp = 2): string {
  return Number(n.toFixed(dp)).toString();
}

function containerHint(cbm: number): { code: string; note: { sw: string; en: string } } {
  if (cbm <= 28) return { code: "20ft", note: { sw: "linatosha kontena la 20ft (~28 CBM).", en: "fits a 20ft container (~28 CBM)." } };
  if (cbm <= 58) return { code: "40ft", note: { sw: "linahitaji kontena la 40ft (~58 CBM).", en: "needs a 40ft container (~58 CBM)." } };
  if (cbm <= 68) return { code: "40HC", note: { sw: "linahitaji kontena la 40HC (~68 CBM).", en: "needs a 40HC container (~68 CBM)." } };
  return { code: "multi", note: { sw: "linazidi kontena moja — utahitaji kontena zaidi ya moja au FCL nyingi.", en: "exceeds one container — you'll need more than one container / multiple FCL." } };
}

function tryCalculators(raw: string): LxAnswer | null {
  const q = normalize(raw);
  const nums = pickNumbers(raw);

  const wantsVolumetric = /(volumetric|chargeable|dimensional|dim weight|uzito wa ujazo)/.test(q) || (/(air|ndege|courier)/.test(q) && /(weight|uzito)/.test(q));
  const wantsCbm = /(cbm|ujazo|m3|cubic|volume)/.test(q);
  const wantsFit = /(container fit|kontena gani|which container|fit.*container|nawezaje.*kontena)/.test(q);
  // Landed-cost: explicit when freight + insurance/handling components are named.
  const wantsLanded =
    /(landed cost|landed-cost|gharama ya mwisho|jumla ya gharama|total cost of import)/.test(q) &&
    /(freight|nauli|shipping|insurance|bima|handling|port charges|ada za bandari)/.test(q);
  const wantsDuty = !wantsLanded && /(duty|ushuru|tozo la forodha|landed cost|import tax|kodi ya forodha|customs charge|compute duty|kokotoa ushuru|estimate duty)/.test(q);

  // --- Landed-cost calculator: CIF + freight + insurance + port/handling.
  // Reads labelled components from the query; unlabelled positional numbers fall
  // back to [goods, freight, insurance, handling]. Adds import duty + VAT via the
  // shared duty engine (utils/duty.ts) so the cascade matches TANCIS.
  if (wantsLanded && nums.length >= 1) {
    const country = pickCountryVat(q) || { name: "Tanzania", rate: 18 };
    const rawNorm = (raw || "").toLowerCase();
    const labelled = (re: RegExp): number | null => {
      const m = rawNorm.match(re);
      return m ? Number(m[1]) : null;
    };
    const goods = labelled(/(?:goods|value|cif|thamani|bidhaa)\s*(?:of|=|:)?\s*(\d+(?:\.\d+)?)/);
    const freight = labelled(/(?:freight|nauli|shipping)\s*(?:of|=|:)?\s*(\d+(?:\.\d+)?)/);
    const insurance = labelled(/(?:insurance|bima)\s*(?:of|=|:)?\s*(\d+(?:\.\d+)?)/);
    const handling = labelled(/(?:handling|port|bandari|ada)\s*(?:charges|fee|fees)?\s*(?:of|=|:)?\s*(\d+(?:\.\d+)?)/);

    let gGoods = goods ?? 0;
    let gFreight = freight ?? 0;
    let gIns = insurance ?? 0;
    let gHandling = handling ?? 0;
    // Positional fallback for unlabelled numbers.
    if (goods == null && freight == null && insurance == null && handling == null) {
      [gGoods = 0, gFreight = 0, gIns = 0, gHandling = 0] = nums;
    }

    const dutyRatePct = labelled(/(\d+(?:\.\d+)?)\s*(?:%|percent|asilimia)/);
    const dutyRate = (dutyRatePct ?? 0) / 100;

    // CIF = goods + freight + insurance (the dutiable base).
    const cif = gGoods + gFreight + gIns;
    const d = estimateDuty({ customsValue: cif, dutyRate, vatRate: country.rate / 100 });
    const landed = d.landedCost + gHandling;

    return {
      topic: "calc-landed-cost",
      data: {
        country: country.name,
        goods: gGoods,
        freight: gFreight,
        insurance: gIns,
        cif,
        dutyRate: dutyRatePct ?? 0,
        duty: d.duty,
        vatRate: country.rate,
        vat: d.vat,
        handling: gHandling,
        landedCost: landed,
      },
      text: {
        sw: `Gharama ya mwisho (landed cost, ${country.name}): bidhaa ${fmt(gGoods)} + nauli ${fmt(gFreight)} + bima ${fmt(gIns)} = CIF ${fmt(cif)}. Import duty ${fmt(dutyRatePct ?? 0)}% = ${fmt(d.duty)}; VAT ${fmt(country.rate)}% = ${fmt(d.vat)}; ada za bandari/handling ${fmt(gHandling)}. Jumla ya landed cost ≈ ${fmt(landed)}.`,
        en: `Landed cost (${country.name}): goods ${fmt(gGoods)} + freight ${fmt(gFreight)} + insurance ${fmt(gIns)} = CIF ${fmt(cif)}. Import duty ${fmt(dutyRatePct ?? 0)}% = ${fmt(d.duty)}; VAT ${fmt(country.rate)}% = ${fmt(d.vat)}; port/handling ${fmt(gHandling)}. Total landed cost ≈ ${fmt(landed)}.`,
      },
    };
  }

  // --- Country-aware duty + VAT estimator
  // Triggers on a duty/customs keyword with a goods value. Reads a duty rate
  // ("X%") if given, and picks the VAT rate from a named country (defaults to
  // Tanzania 18%). Customs value is the largest number; the duty% is a number
  // followed by "%" or the word "duty/ushuru".
  if (wantsDuty && nums.length >= 1) {
    const country = pickCountryVat(q) || { name: "Tanzania", rate: 18 };

    // Find an explicit duty rate. normalize() strips "%", so we also probe the
    // RAW string for "N%" / "N percent" / "asilimia N", and accept a number
    // adjacent to the word duty/ushuru ("25 duty", "duty 25"). Falling back: if
    // there are exactly two numbers, the smaller (<=100) is treated as the rate.
    let dutyRate: number | null = null;
    const rawNorm = (raw || "").toLowerCase();
    const pctMatch =
      rawNorm.match(/(\d+(?:\.\d+)?)\s*(?:%|percent|asilimia)/) ||
      rawNorm.match(/asilimia\s*(\d+(?:\.\d+)?)/);
    const dutyAdjMatch =
      q.match(/(?:duty|ushuru|import duty)\s*(?:of|at|wa|ya|=|:)?\s*(\d+(?:\.\d+)?)/) ||
      q.match(/(\d+(?:\.\d+)?)\s*(?:duty|ushuru)/);
    if (pctMatch) dutyRate = Number(pctMatch[1]);
    else if (dutyAdjMatch) dutyRate = Number(dutyAdjMatch[1]);
    else if (nums.length === 2) {
      const small = Math.min(nums[0], nums[1]);
      if (small <= 100) dutyRate = small;
    }

    // Customs (CIF) value = the largest number that is not the duty rate.
    const candidates = nums.filter((n) => n !== dutyRate);
    const customsValue = (candidates.length ? candidates : nums).reduce((a, b) => Math.max(a, b), 0);

    if (customsValue > 0) {
      const dr = dutyRate ?? 0;
      const dutyAmt = (customsValue * dr) / 100;
      const vatBase = customsValue + dutyAmt; // VAT is charged on CIF + duty
      const vatAmt = (vatBase * country.rate) / 100;
      const total = dutyAmt + vatAmt;
      const landed = customsValue + total;
      const drNote = dutyRate == null;
      return {
        topic: "calc-duty",
        data: {
          country: country.name,
          customsValue,
          dutyRate: dr,
          dutyAmount: Number(dutyAmt.toFixed(2)),
          vatRate: country.rate,
          vatAmount: Number(vatAmt.toFixed(2)),
          totalTaxes: Number(total.toFixed(2)),
          landedCost: Number(landed.toFixed(2)),
        },
        text: {
          sw: `Makadirio ya kodi (${country.name}, VAT ${fmt(country.rate)}%): thamani ya forodha (CIF) = ${fmt(customsValue)}.` +
            (drNote ? " (Hujataja kiwango cha import duty — nimetumia 0%; ongeza mfano '25% duty'.)" : ` Import duty ${fmt(dr)}% = ${fmt(dutyAmt)}.`) +
            ` VAT ${fmt(country.rate)}% kwa (CIF + duty = ${fmt(vatBase)}) = ${fmt(vatAmt)}. Jumla ya kodi = ${fmt(total)}. Gharama ya mwisho (landed) ≈ ${fmt(landed)}.`,
          en: `Tax estimate (${country.name}, VAT ${fmt(country.rate)}%): customs (CIF) value = ${fmt(customsValue)}.` +
            (drNote ? " (No import-duty rate given — used 0%; add e.g. '25% duty'.)" : ` Import duty ${fmt(dr)}% = ${fmt(dutyAmt)}.`) +
            ` VAT ${fmt(country.rate)}% on (CIF + duty = ${fmt(vatBase)}) = ${fmt(vatAmt)}. Total taxes = ${fmt(total)}. Landed cost ≈ ${fmt(landed)}.`,
        },
      };
    }
  }

  // --- Volumetric / chargeable weight (needs 3 dims, optional actual weight)
  if (wantsVolumetric && nums.length >= 3) {
    const [l, w, h, actual] = nums;
    const divisor = /courier/.test(q) ? 5000 : 6000;
    // volumetric expects cm; if metres, convert up
    const cm = l <= 12 && w <= 12 && h <= 12 ? [l * 100, w * 100, h * 100] : [l, w, h];
    const volWeight = (cm[0] * cm[1] * cm[2]) / divisor;
    const chargeable = actual != null ? Math.max(volWeight, actual) : volWeight;
    return {
      topic: "calc-volumetric",
      data: { volumetricKg: Number(volWeight.toFixed(2)), divisor, actualKg: actual ?? null, chargeableKg: Number(chargeable.toFixed(2)) },
      text: {
        sw: `Uzito wa ujazo (volumetric) = (${fmt(cm[0],0)}×${fmt(cm[1],0)}×${fmt(cm[2],0)}) ÷ ${divisor} = ${fmt(volWeight)} kg.` + (actual != null ? ` Uzito halisi = ${fmt(actual)} kg, hivyo uzito wa kulipia (chargeable) = ${fmt(chargeable)} kg.` : ` (Toa uzito halisi ili nipate chargeable = kubwa kati ya hizo mbili.)`),
        en: `Volumetric weight = (${fmt(cm[0],0)}×${fmt(cm[1],0)}×${fmt(cm[2],0)}) ÷ ${divisor} = ${fmt(volWeight)} kg.` + (actual != null ? ` Actual weight = ${fmt(actual)} kg, so chargeable weight = ${fmt(chargeable)} kg.` : ` (Give the actual weight too and chargeable = the greater of the two.)`),
      },
    };
  }

  // --- CBM (needs 3 dims)
  if ((wantsCbm || wantsFit) && nums.length >= 3) {
    const [a, b, c] = nums;
    const { metres, assumedCm } = toMetres([a, b, c]);
    const cbm = metres[0] * metres[1] * metres[2];
    const hint = containerHint(cbm);
    const unitSw = assumedCm ? "(nimedhani sentimita)" : "(mita)";
    const unitEn = assumedCm ? "(assumed centimetres)" : "(metres)";
    return {
      topic: "calc-cbm",
      data: { cbm: Number(cbm.toFixed(4)), dimsMetres: metres.map((m) => Number(m.toFixed(3))), assumedCm, container: hint.code },
      text: {
        sw: `Ujazo (CBM) = ${fmt(metres[0],3)}×${fmt(metres[1],3)}×${fmt(metres[2],3)} m = ${fmt(cbm,3)} m³ ${unitSw}. Kwa mwongozo, ${hint.note.sw}`,
        en: `Volume (CBM) = ${fmt(metres[0],3)}×${fmt(metres[1],3)}×${fmt(metres[2],3)} m = ${fmt(cbm,3)} m³ ${unitEn}. As a guide, it ${hint.note.en}`,
      },
    };
  }

  // --- Container fit from a single total CBM number
  if (wantsFit && nums.length === 1) {
    const cbm = nums[0];
    const hint = containerHint(cbm);
    return {
      topic: "calc-fit",
      data: { cbm, container: hint.code },
      text: {
        sw: `Kwa ujazo wa ${fmt(cbm)} m³, ${hint.note.sw}`,
        en: `For ${fmt(cbm)} m³ of cargo, it ${hint.note.en}`,
      },
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

// Match a single keyword against the query. Returns the weight earned:
//   whole-token match (synonym-aware) ........ full weight
//   typo-tolerant token match (len>=5, d<=1) . full weight (slightly damped)
//   substring fallback ....................... weak weight
// `base` is 2 for strong keys, 1 for normal keys.
function matchKeyword(
  key: string,
  base: number,
  qTokens: string[],
  qTokenSet: Set<string>,
  qCanon: Set<string>,
  qNorm: string,
): number {
  // Multi-word phrase: rely on substring (whole phrase present in query).
  if (key.includes(" ")) {
    return qNorm.includes(key) ? base + 1 : 0;
  }
  // 1) exact whole-token match — strongest signal.
  if (qTokenSet.has(key)) return base + 1;
  // 2) concept match via synonym group (key's canonical reachable from query).
  if (qCanon.has(canonicalOf(key))) return base + 0.5;
  // 3) typo tolerance for longer tokens.
  if (key.length >= 5) {
    for (const t of qTokens) {
      if (t.length >= 4 && levensteinAtMost(t, key, 1)) return base + 0.5;
    }
  }
  // 4) weak substring fallback (e.g. key inside a longer query word).
  if (qNorm.includes(key)) return base * 0.5;
  return 0;
}

function scoreIntent(
  qTokens: string[],
  qTokenSet: Set<string>,
  qCanon: Set<string>,
  qNorm: string,
  intent: Intent,
): number {
  let score = 0;
  for (const k of intent.strong || []) score += matchKeyword(k, 2, qTokens, qTokenSet, qCanon, qNorm);
  for (const k of intent.keys) score += matchKeyword(k, 1, qTokens, qTokenSet, qCanon, qNorm);
  return score;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function askLogistics(
  q: string,
  ctx?: { lastTopic?: string; entities?: Record<string, string> },
): LxAnswer {
  let qNorm = normalize(q);
  let qTokens = tokens(q);

  // Extract entities from THIS turn; merge with carried-over context so the
  // caller can feed them back next turn.
  const turnEntities = extractEntities(qNorm);
  const mergedEntities: Record<string, string> = { ...(ctx?.entities || {}), ...turnEntities };

  // 1. Guardrail — refuse non-logistics topics.
  if (OFF_TOPIC.some((w) => qNorm.includes(w))) {
    return REFUSAL;
  }

  // 2. Multi-turn follow-up resolution. A short anaphoric query ("VAT there?",
  // "vipi kuhusu hapo?") reuses the prior country/corridor/mode so it routes to
  // a concrete topic instead of falling back. We splice the remembered subject
  // into the working query before scoring.
  const isFollowUp =
    !!ctx && (looksLikeFollowUp(qNorm) || Object.keys(turnEntities).length === 0) && q.trim().split(/\s+/).length <= 7;
  if (isFollowUp) {
    const hints: string[] = [];
    if (ctx?.entities?.country) {
      hints.push(ctx.entities.country);
      // Add the country's strong alias (e.g. Kenya -> "kra") so the concrete
      // country intent decisively out-scores generic intents that merely
      // mention a shared keyword like "vat".
      const a = COUNTRY_STRONG_ALIAS[ctx.entities.country];
      if (a) hints.push(a);
    }
    if (ctx?.entities?.corridor) hints.push(ctx.entities.corridor);
    if (ctx?.entities?.mode) hints.push(ctx.entities.mode);
    if (hints.length) {
      qNorm = normalize(`${q} ${hints.join(" ")}`);
      qTokens = tokens(qNorm);
    }
  }

  const qTokenSet = new Set(qTokens);
  const qCanon = synonymCanonicals(qTokens);

  // 3. Calculators take precedence when dimensions/keywords are present.
  const calc = tryCalculators(q);
  if (calc) {
    calc.data = { ...(calc.data || {}), entities: mergedEntities };
    return enrich(calc);
  }

  // 4. HS-code hint (only when the query is clearly about HS/classification or
  // names a recognised good together with a duty/classify cue).
  if (/(hs code|hs-code|classif|uainishaji|tariff code|sura ya hs)/.test(qNorm)) {
    const hs = tryHsHint(qNorm);
    if (hs) {
      hs.data = { ...(hs.data || {}), entities: mergedEntities };
      return hs;
    }
  }

  // 5. Score intents.
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = scoreIntent(qTokens, qTokenSet, qCanon, qNorm, intent);
    if (s > bestScore) {
      bestScore = s;
      best = intent;
    }
  }

  if (best && bestScore > 0) {
    const ans: LxAnswer = { topic: best.topic, text: best.answer, data: { entities: mergedEntities } };
    return enrich(ans);
  }

  // 6. Fallback.
  return {
    topic: "fallback",
    data: { entities: mergedEntities },
    text: {
      sw: "Naweza kukusaidia na usafirishaji kote Afrika na CargoLink: forodha za nchi (TRA, KRA, URA, RRA, OBR, DGDA, SARS, NCS, GRA, DGD, ECA, ECC, ZRA, ZIMRA, AGT, ADII, BURS) + VAT yao; mifumo (TANCIS, iCMS, ASYCUDA, B'Odogwu, ICUMS, Nafeza, PortNet); jumuiya za kibiashara (EAC/SCT, SADC, ECOWAS/ETLS, COMESA, CEMAC/ECCAS, UMA, IGAD, CEN-SAD, SACU, AfCFTA, WTO/WCO HS code, AEO); bandari na korido (Mombasa/Northern, Dar/Central, Durban/North–South, Lobito, Maputo, Beira, Nacala, Walvis Bay, Abidjan–Lagos, Djibouti–Addis); sheria (rules of origin/EUR.1, RCTG/TIR, COMESA Yellow Card, axle-load, IMDG/ADR, SPS/phytosanitary, PVoC, Incoterms 2020); na hesabu (duty+VAT kwa nchi, CBM, volumetric). Niulize lolote kati ya haya.",
      en: "I can help with logistics across Africa & CargoLink: national customs (TRA, KRA, URA, RRA, OBR, DGDA, SARS, NCS, GRA, DGD, ECA, ECC, ZRA, ZIMRA, AGT, ADII, BURS) + their VAT; systems (TANCIS, iCMS, ASYCUDA, B'Odogwu, ICUMS, Nafeza, PortNet); trade blocs (EAC/SCT, SADC, ECOWAS/ETLS, COMESA, CEMAC/ECCAS, UMA, IGAD, CEN-SAD, SACU, AfCFTA, WTO/WCO HS code, AEO); ports & corridors (Mombasa/Northern, Dar/Central, Durban/North–South, Lobito, Maputo, Beira, Nacala, Walvis Bay, Abidjan–Lagos, Djibouti–Addis); laws (rules of origin/EUR.1, RCTG/TIR, COMESA Yellow Card, axle-load, IMDG/ADR, SPS/phytosanitary, PVoC, Incoterms 2020); and maths (per-country duty+VAT, CBM, volumetric). Ask me any of these.",
    },
  };
}

// Screen-scoped starter prompts. Pass a screen key to get context-relevant
// prompts; omit it for the global pan-African set. Swahili-first labels.
const STARTERS_GLOBAL: { label: string; q: string }[] = [
  { label: "AfCFTA ni nini", q: "AfCFTA ni nini na inanufaishaje biashara ya Afrika?" },
  { label: "Mombasa vs Dar", q: "Mombasa Northern Corridor dhidi ya Dar — nichague ipi?" },
  { label: "Lobito Corridor", q: "Lobito Corridor inafanyaje kazi kwa madini ya DRC/Zambia?" },
  { label: "KRA / URA / SARS", q: "KRA Kenya, URA Uganda na SARS Afrika Kusini — VAT ni ngapi?" },
  { label: "COMESA Yellow Card", q: "COMESA Yellow Card ni nini kwa bima ya malori ya mpakani?" },
  { label: "ASYCUDA", q: "ASYCUDA ni nini na nchi gani za Afrika zinaitumia?" },
  { label: "Rules of origin / EUR.1", q: "Rules of origin na Certificate of Origin (EUR.1) ni nini?" },
  { label: "Hesabu duty Kenya", q: "Compute duty for value 10000 at 25% duty in Kenya" },
  { label: "Hesabu CBM", q: "cbm 120 100 80" },
  { label: "Transit kwenda DRC", q: "Nataka kupitisha mzigo kwenda DRC, naanzaje?" },
];

const STARTERS_BY_SCREEN: Record<string, { label: string; q: string }[]> = {
  customs: [
    { label: "Kutoa mzigo forodha", q: "Ninawezaje kutoa mzigo forodha Tanzania?" },
    { label: "Nyaraka za kuagiza", q: "Nyaraka gani zinahitajika kuagiza mizigo?" },
    { label: "TANCIS / TANSAD", q: "TANCIS na TANSAD zinafanyaje kazi?" },
    { label: "Aina za regimes", q: "Aina za customs regimes (transit, bonded, home use) ni zipi?" },
    { label: "HS code", q: "HS code ni nini na inaainishaje bidhaa kwa ushuru?" },
  ],
  wallet: [
    { label: "GePG control number", q: "GePG control number inafanyaje kazi kulipa ushuru?" },
    { label: "Malipo ya forodha", q: "Ninalipaje ushuru wa forodha kwa mobile money?" },
    { label: "TIPS", q: "TIPS (Tanzania Instant Payments) ni nini?" },
  ],
  track: [
    { label: "Fuatilia mzigo", q: "Ninawezaje kufuatilia mzigo wangu kwenye CargoLink?" },
    { label: "ECTS transit", q: "Electronic Cargo Tracking (ECTS) ya transit inafanyaje kazi?" },
    { label: "Hali ya mzigo", q: "Hali za mzigo (status) zinamaanisha nini?" },
  ],
  marketplace: [
    { label: "Kuwa mshirika", q: "Ninawezaje kuwa mshirika (carrier/forwarder) CargoLink?" },
    { label: "Weka mzigo", q: "Ninawekaje CargoShipment kwenye CargoLink?" },
    { label: "Kuwa wakala forodha", q: "Ninawezaje kuwa wakala wa forodha (TAFFA/TASAC)?" },
  ],
  finance: [
    { label: "Hesabu duty Kenya", q: "Compute duty for value 10000 at 25% duty in Kenya" },
    { label: "Landed cost", q: "Landed cost: goods 10000 freight 1500 insurance 200 25% duty handling 300" },
    { label: "Bei ya mizigo", q: "Bei ya mizigo hujengwaje?" },
    { label: "Commission", q: "Commission/take-rate ya CargoLink ni ngapi?" },
  ],
  insurance: [
    { label: "Cargo insurance", q: "Bima ya mzigo (cargo insurance) inafanyaje kazi?" },
    { label: "COMESA Yellow Card", q: "COMESA Yellow Card ni nini kwa malori ya mpakani?" },
    { label: "CIF na bima", q: "Incoterm CIF inajumuishaje bima?" },
  ],
  forms: [
    { label: "Jaza TANSAD", q: "TANSAD declaration inajazwaje kwenye TANCIS?" },
    { label: "Nyaraka za export", q: "Nyaraka gani zinahitajika kuuza nje?" },
    { label: "Certificate of Origin", q: "Certificate of Origin na rules of origin ni nini?" },
  ],
};

export function getStarters(screen?: string): { label: string; q: string }[] {
  if (screen && STARTERS_BY_SCREEN[screen]) return STARTERS_BY_SCREEN[screen];
  return STARTERS_GLOBAL;
}
