// ushairi.ts — Kasuku Mshairi: sovereign Swahili poetry (arudhi) analyzer.
//
// Traditional Swahili verse is measured: each line has a count of mizani
// (syllables) and lines rhyme via vina (matching end-sounds). We DERIVE both
// from our own phonemizer — count the syllables per line, read the final
// syllable's sound for the rhyme, then report the meter and rhyme scheme. This
// is what lets Kasuku actually help a poet WRITE to form. No model, no network.

import { phonemize } from '../swahili/phonemize';

export interface LineScan {
  line: string;
  mizani: number;       // syllable count
  rhyme: string;        // the line's end-sound (rhyme key)
  rhymeLabel: string;   // A, B, C … grouping equal end-sounds
  onMeter: boolean;     // matches the poem's dominant mizani
}
export interface PoemReport {
  lines: LineScan[];
  dominantMizani: number;
  meterConsistent: boolean;
  rhymeScheme: string;  // e.g. "AABB", "ABAB", "—" (free)
  summary: { sw: string; en: string };
}

/** The rhyme key of a line = the sound of its final syllable (vowel-anchored). */
function endSound(line: string): string {
  const words = line.trim().replace(/[^\p{L}\s']/gu, '').split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  const last = words[words.length - 1];
  const syl = phonemize(last).syllables;
  if (!syl.length) return '';
  // Use the final syllable; collapse to its vowel + any preceding consonant sound,
  // which is what the ear hears as the vina in Swahili verse.
  return syl[syl.length - 1].toLowerCase();
}

function mizaniOf(line: string): number {
  const words = line.trim().replace(/[^\p{L}\s']/gu, '').split(/\s+/).filter(Boolean);
  return words.reduce((sum, w) => sum + phonemize(w).syllables.length, 0);
}

/** Analyze a poem's meter (mizani) and rhyme (vina). */
export function analyzePoem(text: string): PoemReport {
  const rawLines = (text || '').split(/\n+/).map((l) => l.trim()).filter(Boolean);

  // Dominant mizani = the most common non-zero line length.
  const counts = new Map<number, number>();
  const scans = rawLines.map((line) => ({ line, mizani: mizaniOf(line), rhyme: endSound(line) }));
  for (const s of scans) if (s.mizani) counts.set(s.mizani, (counts.get(s.mizani) || 0) + 1);
  const dominantMizani = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]?.[0] ?? 0;

  // Rhyme labels A, B, C … by distinct end-sound (first appearance order).
  const labelOf = new Map<string, string>();
  let next = 0;
  const lines: LineScan[] = scans.map((s) => {
    let label = '—';
    if (s.rhyme) {
      if (!labelOf.has(s.rhyme)) labelOf.set(s.rhyme, String.fromCharCode(65 + (next++ % 26)));
      label = labelOf.get(s.rhyme)!;
    }
    return { ...s, rhymeLabel: label, onMeter: s.mizani === dominantMizani };
  });

  const onMeterCount = lines.filter((l) => l.onMeter).length;
  const meterConsistent = lines.length > 0 && onMeterCount >= lines.length * 0.75;
  const rhymeScheme = lines.length ? lines.map((l) => l.rhymeLabel).join('') : '—';
  const distinctRhymes = labelOf.size;

  const summary = rawLines.length === 0
    ? { sw: 'Hakuna shairi la kuchambua.', en: 'No poem to analyse.' }
    : {
        sw: `Mistari ${lines.length}, mizani kuu ${dominantMizani} (${meterConsistent ? 'ulinganifu' : 'inabadilikabadilika'}). Mpangilio wa vina: ${rhymeScheme}. ${distinctRhymes <= 2 ? 'Vina vimeshikamana vyema.' : 'Vina vingi tofauti — kama ni shairi huru ni sawa, vinginevyo linganisha miisho.'}`,
        en: `${lines.length} lines, dominant mizani ${dominantMizani} (${meterConsistent ? 'consistent' : 'irregular'}). Rhyme scheme: ${rhymeScheme}. ${distinctRhymes <= 2 ? 'Rhymes hold together well.' : 'Many distinct end-sounds — fine for free verse, otherwise align the line-endings.'}`,
      };

  return { lines, dominantMizani, meterConsistent, rhymeScheme, summary };
}
