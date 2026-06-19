// Swahili pronunciation exceptions — the curated lexicon the rule engine can't
// derive on its own: proper names, places, historical figures, and a handful of
// loanwords whose spelling hides their sound. Looked up BEFORE the rule engine
// (phonemize.ts). Keys are lowercase; ng' keeps its apostrophe.
//
// Each entry gives the three render forms; `stress` is implied by the UPPERCASE
// syllable in `respell`.

export interface ExceptionEntry {
  syllables: string[];
  ipa: string;
  respell: string;
}

export const PRONUNCIATION_EXCEPTIONS: Record<string, ExceptionEntry> = {
  // ── Places (East Africa) ──────────────────────────────────────────────────
  tanzania: { syllables: ['ta', 'nza', 'ni', 'a'], ipa: '/tɑnˈzɑniɑ/', respell: 'tahn-ZAH-nee-ah' },
  zanzibar: { syllables: ['za', 'nzi', 'bar'], ipa: '/zɑnziˈbɑr/', respell: 'zahn-zee-BAR' },
  mwanza: { syllables: ['mwa', 'nza'], ipa: '/ˈmwɑnzɑ/', respell: 'MWAHN-zah' },
  arusha: { syllables: ['a', 'ru', 'sha'], ipa: '/ɑˈɾuʃɑ/', respell: 'ah-ROO-shah' },
  dodoma: { syllables: ['do', 'do', 'ma'], ipa: '/dɔˈdɔmɑ/', respell: 'doh-DOH-mah' },
  kilimanjaro: { syllables: ['ki', 'li', 'ma', 'nja', 'ro'], ipa: '/kilimɑnˈdʒɑɾɔ/', respell: 'kee-lee-mahn-JAH-roh' },
  ngorongoro: { syllables: ["ngo", 'ro', "ngo", 'ro'], ipa: '/ŋɡɔɾɔŋˈɡɔɾɔ/', respell: 'ngoh-roh-NGOH-roh' },
  serengeti: { syllables: ['se', 're', 'nge', 'ti'], ipa: '/sɛɾɛŋˈɡɛti/', respell: 'seh-reh-NGEH-tee' },
  kigoma: { syllables: ['ki', 'go', 'ma'], ipa: '/kiˈɡɔmɑ/', respell: 'kee-GOH-mah' },
  mbeya: { syllables: ['mbe', 'ya'], ipa: '/ˈmbɛjɑ/', respell: 'MBEH-yah' },
  morogoro: { syllables: ['mo', 'ro', 'go', 'ro'], ipa: '/mɔɾɔˈɡɔɾɔ/', respell: 'moh-roh-GOH-roh' },
  tanga: { syllables: ['ta', 'nga'], ipa: '/ˈtɑŋɡɑ/', respell: 'TAHN-gah' },
  // ── People (historical / common given names) ──────────────────────────────
  nyerere: { syllables: ['nye', 're', 're'], ipa: '/ɲɛˈɾɛɾɛ/', respell: 'nyeh-REH-reh' },
  mwinyi: { syllables: ['mwi', 'nyi'], ipa: '/ˈmwiɲi/', respell: 'MWEE-nyee' },
  mkapa: { syllables: ['mka', 'pa'], ipa: '/mˈkɑpɑ/', respell: 'm-KAH-pah' },
  kikwete: { syllables: ['ki', 'kwe', 'te'], ipa: '/kiˈkwɛtɛ/', respell: 'kee-KWEH-teh' },
  magufuli: { syllables: ['ma', 'gu', 'fu', 'li'], ipa: '/mɑɡuˈfuli/', respell: 'mah-goo-FOO-lee' },
  // ── The ng' (velar nasal ŋ) set — must NEVER be read as "n-g" ──────────────
  "ng'ombe": { syllables: ["ng'o", 'mbe'], ipa: '/ˈŋɔmbɛ/', respell: 'NGOHM-beh' },
  "ng'ara": { syllables: ["ng'a", 'ra'], ipa: '/ˈŋɑɾɑ/', respell: 'NGAH-rah' },
  "ng'oa": { syllables: ["ng'o", 'a'], ipa: '/ˈŋɔɑ/', respell: 'NGOH-ah' },
  "ng'aa": { syllables: ["ng'a", 'a'], ipa: '/ˈŋɑɑ/', respell: 'NGAH-ah' },
  // ── Loanwords whose stress/sound the plain rules slightly miss ─────────────
  rais: { syllables: ['ra', 'is'], ipa: '/ˈɾɑis/', respell: 'RAH-ees' },
  saa: { syllables: ['sa', 'a'], ipa: '/ˈsɑɑ/', respell: 'SAH-ah' },
};
