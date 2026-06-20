// experts/logistiki/index.ts — Akili's Logistiki (logistics & trade) expert.
//
// Wraps CargoLink's sovereign "Rubani" brain (vendored in ./engine) — a
// deterministic, offline knowledge engine covering pan-African customs, ports,
// corridors, trade blocs, Incoterms, duty/landed-cost/CBM calculators and
// step-by-step playbooks. No external LLM, no network. Swahili-first.

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliQuery,
  AkiliSource,
  DomainExpert,
} from '../../types';
import { askLogistics, type LxAnswer } from './engine/logistics-ai';

const STRIP = /[^\p{L}\p{N}']+/gu;
const norm = (s: string): string =>
  (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ').replace(/\s+/g, ' ').trim();

function hasCue(hay: string, cue: string): boolean {
  return ` ${hay} `.includes(` ${cue} `) || hay === cue;
}

function cueScore(text: string, cues: string[], cap = 0.93): number {
  const n = norm(text);
  if (!n) return 0;
  const seen = new Set<string>();
  for (const c of cues) {
    if (hasCue(n, c)) seen.add(c);
    if (seen.size >= 3) break;
  }
  const hits = seen.size;
  if (hits === 0) return 0;
  return Math.min(cap, 0.34 + hits * 0.23);
}

// Logistics / customs / trade cues — Swahili-first, then English. Kept tight so
// it doesn't poach business/finance questions that belong to other experts.
const LOGISTIKI_CUES = [
  // Kiswahili
  'forodha', 'bandari', 'meli', 'mzigo', 'mizigo', 'kontena', 'usafirishaji',
  'kusafirisha', 'ushuru', 'wakala wa forodha', 'kuagiza', 'kuuza nje',
  'korido', 'reli', 'sgr', 'malori', 'lori', 'mpakani', 'transit',
  'fuatilia mzigo', 'nyaraka za forodha', 'tansad', 'incoterm', 'cbm',
  // Authorities / blocs (strong logistics signal)
  'tra', 'tancis', 'tasac', 'taffa', 'tpa', 'tbs', 'eac', 'comesa', 'afcfta',
  'kra', 'asycuda',
  // English
  'logistics', 'customs', 'clearing', 'freight', 'shipping', 'shipment',
  'port', 'container', 'cargo', 'haulage', 'import', 'export', 'duty',
  'landed cost', 'corridor', 'incoterms', 'bill of lading', 'demurrage',
  'consignment', 'forwarder', 'warehouse receipt', 'phytosanitary',
];

function mapSources(lx: LxAnswer): AkiliSource[] {
  const out: AkiliSource[] = (lx.sources ?? []).map((s) => ({ label: s.name, ref: s.note }));
  out.push({ label: 'CargoLink Rubani', ref: 'Laetoli' });
  return out;
}

export const logistikiExpert: DomainExpert = {
  id: 'logistiki-rubani',
  domain: 'logistiki',
  label: 'Logistiki',

  match(q: AkiliQuery): number {
    return cueScore(q.text ?? '', LOGISTIKI_CUES);
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const lang = q.lang === 'en' ? 'en' : 'sw';
    const lx: LxAnswer = askLogistics(q.text ?? '', {
      entities: (q.context?.logistics as { entities?: Record<string, string> } | undefined)?.entities,
      lastTopic: (q.context?.logistics as { lastTopic?: string } | undefined)?.lastTopic,
    });

    // Rubani is curated/deterministic; treat a real topic hit as high confidence,
    // a generic fallback as medium.
    const isFallback = /fallback|unknown|general/i.test(lx.topic);
    const confidence: AkiliConfidence = isFallback ? 'medium' : 'high';

    const sw = lx.text.sw;
    const en = lx.text.en;
    void lang; // both languages are carried; the UI picks per preference

    return {
      domain: 'logistiki',
      expert: logistikiExpert.id,
      text: en ? { sw, en } : { sw },
      confidence,
      sources: mapSources(lx),
      data: lx, // full LxAnswer — topic, steps, actions, entities
    };
  },
};

export default logistikiExpert;
