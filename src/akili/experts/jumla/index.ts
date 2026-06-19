// experts/jumla/index.ts — the general / about-Akili / fallback expert.
// A small sovereign KB: greetings, "what is Akili / what can you do", and a
// graceful catch-all. Scores low (~0.05) so it only wins when nothing else does.
// Swahili-first, with English alongside.

import type { AkiliAnswer, AkiliQuery, DomainExpert } from '../../types';

const norm = (s: string) => s.toLowerCase().trim();

const RX_GREETING =
  /\b(habari|jambo|salama|salamu|mambo|shikamoo|hujambo|hello|hi|hey|niaje|vipi)\b/i;
const RX_ABOUT =
  /\b(akili ni nini|wewe ni nani|unaweza nini|unaweza kufanya nini|what is akili|what can you do|who are you|akili|nisaidie|help|msaada)\b/i;

function reply(
  sw: string,
  en: string,
  confidence: AkiliAnswer['confidence'],
): AkiliAnswer {
  return {
    domain: 'jumla',
    expert: jumlaExpert.id,
    text: { sw, en },
    confidence,
    sources: [{ label: 'Akili KB', ref: 'Laetoli' }],
  };
}

const ABOUT_SW =
  'Mimi ni Akili — akili ya Kiswahili ya Laetoli, inayofanya kazi bila mtandao (sovereign, ' +
  'bila LLM ya nje). Naelekeza swali lako kwa mtaalamu sahihi:\n' +
  '• Afya — ushauri wa kiafya/kitabibu (TibaAI)\n' +
  '• Fasihi — fasihi, usomaji na ushairi (Kasuku)\n' +
  '• Lugha — sarufi, tafsiri na matamshi ya Kiswahili (Kasuku)\n' +
  '• SNIL — Kiswahili → msimbo → kuendesha (kokotoa, hesabu, programu)\n' +
  'Niulize chochote.';

const ABOUT_EN =
  'I am Akili — Laetoli\'s sovereign Swahili AI, running fully offline (no external LLM). ' +
  'I route your question to the right expert:\n' +
  '• Afya — health/clinical guidance (TibaAI)\n' +
  '• Fasihi — literature, reading and poetry (Kasuku)\n' +
  '• Lugha — Swahili grammar, translation and pronunciation (Kasuku)\n' +
  '• SNIL — Swahili → code → execution (compute, math, programs)\n' +
  'Ask me anything.';

export const jumlaExpert: DomainExpert = {
  id: 'jumla-general',
  domain: 'jumla',
  label: 'Jumla',

  match(q: AkiliQuery): number {
    const text = q.text ?? '';
    if (!text.trim()) return 0.05; // still claim empty input as fallback
    if (RX_GREETING.test(text)) return 0.6;
    if (RX_ABOUT.test(text)) return 0.55;
    return 0.05; // baseline fallback — only wins when nothing else scores
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const text = q.text ?? '';
    const low = norm(text);

    if (RX_GREETING.test(low)) {
      return reply(
        'Habari! Mimi ni Akili. Naweza kukusaidia na afya, fasihi, lugha ya Kiswahili, ' +
          'na kuendesha programu za SNIL. Una swali gani?',
        'Hello! I am Akili. I can help with health, literature, the Swahili language, ' +
          'and running SNIL programs. What would you like to ask?',
        'high',
      );
    }

    if (RX_ABOUT.test(low)) {
      return reply(ABOUT_SW, ABOUT_EN, 'high');
    }

    // graceful fallback
    return reply(
      'Samahani, sijaweza kuelewa swali hilo vizuri. Ninaweza kukusaidia na: afya (Afya), ' +
        'fasihi na ushairi (Fasihi), lugha ya Kiswahili (Lugha), na kuendesha msimbo wa SNIL ' +
        '(kokotoa/hesabu). Tafadhali jaribu kuuliza kwa namna nyingine.',
      'Sorry, I could not quite understand that. I can help with: health (Afya), literature and ' +
        'poetry (Fasihi), the Swahili language (Lugha), and running SNIL code (compute/math). ' +
        'Please try rephrasing your question.',
      'low',
    );
  },
};

export default jumlaExpert;
