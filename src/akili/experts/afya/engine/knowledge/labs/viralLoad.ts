/**
 * HIV Viral Load — Lab Knowledge & Interpretation
 *
 * Sources: NACP National Guidelines for the Management of HIV and AIDS 2024,
 *          WHO Consolidated Guidelines on HIV 2024, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * What viral load measures: the number of copies of HIV genetic material
 * (RNA) per millilitre of blood — a direct read-out of how active the
 * virus is and, therefore, whether ART is working.
 *
 * Key thresholds (NACP / WHO framing):
 *   - Undetectable / suppressed: below the assay's detection limit
 *     (commonly reported as "<50 copies/mL", sometimes "target not detected").
 *   - Low-level viraemia:        roughly 50-1000 copies/mL — a grey zone
 *     that prompts adherence review and a repeat test.
 *   - Unsuppressed:              ≥ 1000 copies/mL — the WHO threshold that
 *     triggers the treatment-failure pathway (adherence support → repeat VL).
 *
 * U=U: a person with a consistently undetectable viral load cannot transmit
 * HIV to a sexual partner. This is one of the most important facts in HIV
 * care and a powerful motivator for adherence.
 *
 * Context-awareness: the same number means different things at the first
 * post-ART check, on long-term stable treatment, or as a repeat after a
 * previous high result — so interpretViralLoad(value, context) branches.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type ViralLoadContext =
  | 'first_check'        // first VL after starting ART (~6 months)
  | 'routine_monitoring' // routine VL on someone previously suppressed
  | 'repeat_after_high'  // repeat VL after a prior high result + adherence support
  | 'unknown';

export type ViralLoadBand =
  | 'undetectable'       // below detection limit / suppressed
  | 'low_level'          // ~50-1000 copies/mL
  | 'unsuppressed';      // >= 1000 copies/mL

export interface ViralLoadInterpretation {
  value: number;         // copies/mL; 0 represents "undetectable / target not detected"
  band: ViralLoadBand;
  context: ViralLoadContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

/**
 * Band thresholds. A value of 0 (or any value below 50) is treated as
 * undetectable/suppressed. 50-999 is low-level viraemia. >=1000 is the
 * WHO unsuppressed threshold.
 */
export function bandForViralLoad(value: number): ViralLoadBand {
  if (value < 50) return 'undetectable';
  if (value < 1000) return 'low_level';
  return 'unsuppressed';
}

export function interpretViralLoad(
  value: number,
  context: ViralLoadContext = 'unknown',
): ViralLoadInterpretation {
  const band = bandForViralLoad(value);

  // ── UNDETECTABLE / SUPPRESSED ─────────────────────────────────────
  if (band === 'undetectable') {
    return {
      value,
      band,
      context,
      headline: {
        en: 'An undetectable viral load — this is the goal of HIV treatment. Your ART is working, and U=U applies.',
        sw: 'Viral load isiyoonekana — hili ndilo lengo la matibabu ya VVU. ART yako inafanya kazi, na U=U inatumika.',
        sw_mtaa: 'Viral load isiyoonekana — hili ndilo lengo la matibabu ya VVU. ART yako inafanya kazi, na U=U inatumika.',
      },
      meaning: {
        en: 'An undetectable result means there is so little HIV in your blood that the test cannot find it. This is exactly what successful treatment looks like. Two powerful things follow. First: your immune system is protected and can recover and stay strong. Second — U=U — Undetectable equals Untransmittable: while your viral load stays undetectable, you cannot pass HIV to a sexual partner. The virus is still in your body — it is controlled, not cured — so the result depends entirely on continuing ART every day. An undetectable result is not a finish line; it is a state you maintain.',
        sw: 'Matokeo yasiyoonekana yanamaanisha kuna VVU kidogo sana katika damu yako kiasi kwamba kipimo hakiwezi kuipata. Hivi ndivyo matibabu yenye mafanikio yanavyoonekana. Mambo mawili yenye nguvu hufuata. Kwanza: mfumo wako wa kinga umelindwa na unaweza kupona na kubaki imara. Pili — U=U — Isiyoonekana ni Isiyoambukiza: wakati viral load yako inabaki isiyoonekana, huwezi kupitisha VVU kwa mwenza wa kingono. Virusi bado viko mwilini mwako — vimedhibitiwa, havijaponywa — hivyo matokeo hutegemea kabisa kuendelea na ART kila siku. Matokeo yasiyoonekana sio mstari wa kumaliza; ni hali unayodumisha.',
        sw_mtaa: 'Matokeo yasiyoonekana yanamaanisha kuna VVU kidogo sana katika damu yako kiasi kwamba kipimo hakiwezi kuvipata. Hivi ndivyo matibabu yenye mafanikio yanavyoonekana. Mambo mawili yenye nguvu yanafuata. Kwanza: kinga yako imelindwa na inaweza kupona na kubaki imara. Pili — U=U — Haionekani ni Haiambukizi: wakati viral load yako inabaki haionekani, huwezi kupitisha VVU kwa mwenza wa kingono. Virusi bado viko mwilini mwako — vimedhibitiwa, havijaponywa — hivyo matokeo yanategemea kabisa kuendelea na ART kila siku. Matokeo yasiyoonekana sio finish line; ni hali unayodumisha.',
      },
      nextSteps: {
        en: 'Keep doing exactly what you are doing — take ART every single day, never skip, never run out. Attend routine CTC visits and your next scheduled viral load test (usually yearly once stable). Continue TB symptom screening. If you have an HIV-negative partner, U=U protects them sexually while you stay undetectable — and condoms still also prevent other sexually transmitted infections and pregnancy. Record this result in your health vault alongside the date.',
        sw: 'Endelea kufanya hasa unachofanya — chukua ART kila siku, kamwe usiruke, kamwe usiishiwe. Hudhuria ziara za kawaida za CTC na kipimo chako kijacho cha viral load kilichopangwa (kawaida kila mwaka mara unapokuwa imara). Endelea na uchunguzi wa dalili za TB. Ikiwa una mwenza asiye na VVU, U=U inamlinda kingono wakati unabaki usioonekana — na kondomu bado pia huzuia maambukizi mengine ya zinaa na mimba. Rekodi matokeo haya katika vault yako ya afya pamoja na tarehe.',
        sw_mtaa: 'Endelea kufanya hasa unachofanya — chukua ART kila siku, kamwe usiruke, kamwe usiishiwe. Hudhuria ziara za kawaida za CTC na kipimo chako kijacho cha viral load kilichopangwa (kawaida kila mwaka mara unapokuwa imara). Endelea na uchunguzi wa dalili za TB. Ikiwa una mwenza asiye na VVU, U=U inamlinda kingono wakati unabaki usioonekana — na kondomu bado zinazuia magonjwa mengine ya zinaa na mimba. Rekodi matokeo haya katika vault yako ya afya pamoja na tarehe.',
      },
      urgency: 'routine',
    };
  }

  // ── LOW-LEVEL VIRAEMIA: 50-999 ────────────────────────────────────
  if (band === 'low_level') {
    return {
      value,
      band,
      context,
      headline: {
        en: `A viral load of ${value} is low-level but detectable — a signal to strengthen adherence and recheck, not a verdict.`,
        sw: `Viral load ya ${value} iko chini lakini inaonekana — ishara ya kuimarisha kuzingatia na kupima tena, sio hukumu.`,
        sw_mtaa: `Viral load ya ${value} iko chini lakini inaonekana — ishara ya kuimarisha kuzingatia na kupima tena, sio hukumu.`,
      },
      meaning: {
        en: 'A result in the low-level range (roughly 50-1000 copies/mL) means the virus is detectable but at a low level — the treatment is mostly working but not fully suppressing. This is a grey zone, and the most common reason is small gaps in taking ART — occasional missed or late doses. It is usually not drug resistance, and it is very recoverable. The important response is to look honestly at what might be interfering with daily, on-time dosing, fix it, and recheck the viral load. Until it is suppressed again, treat yourself as potentially infectious — U=U does not apply at a detectable level.',
        sw: 'Matokeo katika kiwango cha chini (takriban copies 50-1000/mL) yanamaanisha virusi vinaonekana lakini katika kiwango cha chini — matibabu yanafanya kazi zaidi lakini hayadhibiti kabisa. Hii ni eneo la kijivu, na sababu ya kawaida zaidi ni mapengo madogo katika kuchukua ART — dose zinazokoswa au kuchelewa mara kwa mara. Kawaida sio usugu wa dawa, na inarekebishika sana. Jibu muhimu ni kuangalia kwa uaminifu ni nini kinachoweza kuingilia dose ya kila siku, kwa wakati, kukirekebisha, na kupima tena viral load. Hadi idhibitiwe tena, jichukulie kama unayeweza kuambukiza — U=U haitumiki katika kiwango kinachoonekana.',
        sw_mtaa: 'Matokeo katika kiwango cha chini (takriban copies 50-1000/mL) yanamaanisha virusi vinaonekana lakini katika kiwango cha chini — matibabu yanafanya kazi zaidi lakini hayadhibiti kabisa. Hii ni eneo la kijivu, na sababu ya kawaida zaidi ni mapengo madogo katika kuchukua ART — dose zinazokoswa au kuchelewa mara kwa mara. Kawaida sio drug resistance, na inarekebishika sana. Jibu muhimu ni kuangalia kwa uaminifu ni nini kinachoweza kuingilia dose ya kila siku, kwa wakati, kukirekebisha, na kupima tena viral load. Hadi idhibitiwe tena, jichukulie kama unayeweza kuambukiza — U=U haitumiki katika kiwango kinachoonekana.',
      },
      nextSteps: {
        en: 'Bring this result to your CTC. They will go through adherence with you — looking for and solving anything getting in the way (running out of pills, side effects, depression, stigma, travel, alcohol) — and arrange a repeat viral load test, usually after about 3 months of supported adherence. Be completely honest about missed doses; that honesty is what gets you back to undetectable. Keep taking ART every day in the meantime, and use condoms until the result is suppressed again.',
        sw: 'Lete matokeo haya kwa CTC yako. Watapitia kuzingatia pamoja nawe — wakitafuta na kutatua chochote kinachozuia (kuishiwa kwa vidonge, athari, unyogovu, unyanyapaa, safari, pombe) — na watapanga kipimo cha viral load kinachorudiwa, kawaida baada ya miezi 3 ya kuzingatia kunakoungwa mkono. Kuwa mkweli kabisa kuhusu dose zilizokoswa; uaminifu huo ndio unaokurudisha kwenye kutokuonekana. Endelea kuchukua ART kila siku kwa wakati huo, na utumie kondomu hadi matokeo yadhibitiwe tena.',
        sw_mtaa: 'Lete matokeo haya kwa CTC yako. Watapitia adherence pamoja nawe — wakitafuta na kutatua chochote kinachozuia (kuishiwa vidonge, athari, unyogovu, stigma, safari, pombe) — na watapanga viral load test inayorudiwa, kawaida baada ya miezi 3 ya supported adherence. Kuwa mkweli kabisa kuhusu dose zilizokoswa; uaminifu huo ndio unaokurudisha kwenye undetectable. Endelea kuchukua ART kila siku kwa wakati huo, na utumie kondomu hadi matokeo yadhibitiwe tena.',
      },
      urgency: 'soon',
    };
  }

  // ── UNSUPPRESSED: >= 1000 ─────────────────────────────────────────
  // repeat_after_high → this confirms treatment failure
  if (context === 'repeat_after_high') {
    return {
      value,
      band,
      context,
      headline: {
        en: `A repeat viral load of ${value} after adherence support confirms treatment failure — your CTC will consider a regimen change.`,
        sw: `Viral load inayorudiwa ya ${value} baada ya msaada wa kuzingatia inathibitisha kushindwa kwa matibabu — CTC yako itafikiria kubadili regimen.`,
        sw_mtaa: `Viral load inayorudiwa ya ${value} baada ya msaada wa kuzingatia inathibitisha kushindwa kwa matibabu — CTC yako itafikiria kubadili regimen.`,
      },
      meaning: {
        en: 'When a viral load stays at or above 1000 copies/mL even after a period of supported, improved adherence, this confirms treatment failure — the current ART regimen is no longer controlling the virus, often because the virus has developed resistance to one or more of the drugs. This is a recognised, manageable situation with a clear pathway: the CTC considers drug-resistance testing and a switch to a second-line regimen. It is not the end of effective treatment — second-line ART works, and most people who switch return to an undetectable viral load. The earlier this is acted on, the better.',
        sw: 'Wakati viral load inabaki katika au juu ya copies 1000/mL hata baada ya kipindi cha kuzingatia kunakoungwa mkono, kulikoboreshwa, hii inathibitisha kushindwa kwa matibabu — regimen ya sasa ya ART haidhibiti tena virusi, mara nyingi kwa sababu virusi vimeendeleza usugu dhidi ya dawa moja au zaidi. Hii ni hali inayotambulika, inayoweza kusimamiwa yenye njia wazi: CTC inafikiria upimaji wa usugu wa dawa na kubadili kwa regimen ya mstari wa pili. Sio mwisho wa matibabu yenye ufanisi — ART ya mstari wa pili inafanya kazi, na wengi wanaobadili hurudi kwenye viral load isiyoonekana. Mapema hili linaposhughulikiwa, ndivyo bora zaidi.',
        sw_mtaa: 'Wakati viral load inabaki katika au juu ya copies 1000/mL hata baada ya kipindi cha supported adherence, kulikoboreshwa, hii inathibitisha treatment failure — regimen ya sasa ya ART haidhibiti tena virusi, mara nyingi kwa sababu virusi vimeendeleza resistance dhidi ya dawa moja au zaidi. Hii ni hali inayotambulika, inayoweza kusimamiwa yenye njia wazi: CTC inafikiria drug-resistance testing na kubadili kwa second-line regimen. Sio mwisho wa matibabu yenye ufanisi — second-line ART inafanya kazi, na wengi wanaobadili wanarudi kwenye viral load isiyoonekana. Mapema hili linaposhughulikiwa, ndivyo bora zaidi.',
      },
      nextSteps: {
        en: 'Your CTC will move to the next step — drug-resistance assessment where available and a switch to a second-line regimen. Keep taking your current ART until the team changes it; do not stop on your own. Adherence support continues, because the new regimen also depends on consistent daily dosing. Use condoms, as you may be infectious while unsuppressed. Treatment failure is a solvable problem — the goal now is getting back to undetectable on the new regimen.',
        sw: 'CTC yako itahamia hatua inayofuata — tathmini ya usugu wa dawa pale inapopatikana na kubadili kwa regimen ya mstari wa pili. Endelea kuchukua ART yako ya sasa hadi timu itakapoibadilisha; usisimame peke yako. Msaada wa kuzingatia unaendelea, kwa sababu regimen mpya pia hutegemea dose ya kila siku ya mfululizo. Tumia kondomu, kwa kuwa unaweza kuwa unaambukiza wakati hujadhibitiwa. Kushindwa kwa matibabu ni tatizo linaloweza kutatuliwa — lengo sasa ni kurudi kwenye kutokuonekana kwenye regimen mpya.',
        sw_mtaa: 'CTC yako itahamia hatua inayofuata — tathmini ya drug resistance pale inapopatikana na kubadili kwa second-line regimen. Endelea kuchukua ART yako ya sasa hadi timu itakapoibadilisha; usisimame peke yako. Adherence support inaendelea, kwa sababu regimen mpya pia inategemea dose ya kila siku ya mfululizo. Tumia kondomu, kwa kuwa unaweza kuwa unaambukiza wakati hujadhibitiwa. Treatment failure ni tatizo linaloweza kutatuliwa — lengo sasa ni kurudi kwenye undetectable kwenye regimen mpya.',
      },
      urgency: 'urgent',
    };
  }

  // unsuppressed, first_check / routine_monitoring / unknown
  return {
    value,
    band,
    context,
    headline: {
      en: `A viral load of ${value} is unsuppressed — this needs adherence support and a repeat test, not panic.`,
      sw: `Viral load ya ${value} haijadhibitiwa — hii inahitaji msaada wa kuzingatia na kipimo cha kurudia, sio hofu.`,
      sw_mtaa: `Viral load ya ${value} haijadhibitiwa — hii inahitaji msaada wa kuzingatia na kipimo cha kurudia, sio hofu.`,
    },
    meaning: {
      en: 'A viral load at or above 1000 copies/mL means the virus is not being suppressed — the treatment is not yet controlling it well. The most important thing to understand: this is most commonly caused by gaps in taking ART, NOT by drug resistance. A single unsuppressed result does not confirm treatment failure. The standard pathway is: intensive adherence support to find and fix whatever is interfering with daily dosing, then a repeat viral load test after about 3 months. If the repeat is suppressed, the original regimen continues — the problem was adherence, now solved. Only if the repeat is still high is treatment failure confirmed and a regimen switch considered. So this number is a prompt to strengthen adherence, not a final answer.',
      sw: 'Viral load katika au juu ya copies 1000/mL inamaanisha virusi havidhibitiwi — matibabu bado hayavidhibiti vizuri. Jambo muhimu zaidi kuelewa: hii mara nyingi husababishwa na mapengo katika kuchukua ART, SIO usugu wa dawa. Matokeo moja yasiyodhibitiwa hayathibitishi kushindwa kwa matibabu. Njia ya kawaida ni: msaada mkubwa wa kuzingatia kupata na kurekebisha chochote kinachoingilia dose ya kila siku, kisha kipimo cha viral load kinachorudiwa baada ya miezi 3. Ikiwa kinachorudiwa kimedhibitiwa, regimen ya awali inaendelea — tatizo lilikuwa kuzingatia, sasa limetatuliwa. Ikiwa tu kinachorudiwa bado kiko juu ndipo kushindwa kwa matibabu kunathibitishwa na kubadili regimen kunafikiriwa. Hivyo namba hii ni kichocheo cha kuimarisha kuzingatia, sio jibu la mwisho.',
      sw_mtaa: 'Viral load katika au juu ya copies 1000/mL inamaanisha virusi havidhibitiwi — matibabu bado hayavidhibiti vizuri. Jambo muhimu zaidi kuelewa: hii mara nyingi inasababishwa na mapengo katika kuchukua ART, SIO drug resistance. Matokeo moja yasiyodhibitiwa hayathibitishi treatment failure. Njia ya kawaida ni: adherence support kubwa kupata na kurekebisha chochote kinachoingilia dose ya kila siku, kisha viral load test inayorudiwa baada ya miezi 3. Ikiwa inayorudiwa imedhibitiwa, regimen ya awali inaendelea — tatizo lilikuwa adherence, sasa limetatuliwa. Ikiwa tu inayorudiwa bado iko juu ndipo treatment failure inathibitishwa na kubadili regimen kunafikiriwa. Hivyo namba hii ni kichocheo cha kuimarisha adherence, sio jibu la mwisho.',
    },
    nextSteps: {
      en: 'Bring this result to your CTC promptly. They will work through adherence with you — honestly identifying and solving the real barriers (pill stockouts, side effects, depression, stigma, disclosure issues, alcohol, travel) — and arrange a repeat viral load after about 3 months of supported adherence. Keep taking ART every day; do not stop. Use condoms in the meantime, as you may be infectious. The great majority of people in this situation return to an undetectable viral load once the underlying barrier is addressed.',
      sw: 'Lete matokeo haya kwa CTC yako haraka. Watapitia kuzingatia pamoja nawe — wakitambua na kutatua kwa uaminifu vizuizi halisi (kuishiwa kwa vidonge, athari, unyogovu, unyanyapaa, masuala ya kufichua, pombe, safari) — na watapanga viral load inayorudiwa baada ya miezi 3 ya kuzingatia kunakoungwa mkono. Endelea kuchukua ART kila siku; usisimame. Tumia kondomu kwa wakati huo, kwa kuwa unaweza kuwa unaambukiza. Wengi sana katika hali hii hurudi kwenye viral load isiyoonekana mara kizuizi cha msingi kinaposhughulikiwa.',
      sw_mtaa: 'Lete matokeo haya kwa CTC yako haraka. Watapitia adherence pamoja nawe — wakitambua na kutatua kwa uaminifu vizuizi halisi (kuishiwa vidonge, athari, unyogovu, stigma, masuala ya kufichua, pombe, safari) — na watapanga viral load inayorudiwa baada ya miezi 3 ya supported adherence. Endelea kuchukua ART kila siku; usisimame. Tumia kondomu kwa wakati huo, kwa kuwa unaweza kuwa unaambukiza. Wengi sana katika hali hii wanarudi kwenye viral load isiyoonekana mara kizuizi cha msingi kinaposhughulikiwa.',
    },
    urgency: 'soon',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE OBJECT
// ──────────────────────────────────────────────────────────────────────

export const VIRAL_LOAD: LabKnowledge = {
  id: 'viral_load',
  aliases: LAB_ALIASES.viral_load,
  unit: 'copies/mL',

  whatItMeasures: {
    en: 'The HIV viral load measures how many copies of HIV genetic material (RNA) are present in a millilitre of blood. It is the most direct measure of how active the virus is and, therefore, of whether antiretroviral treatment is working. When ART is taken consistently, the viral load falls — within about 6 months it usually becomes "undetectable", meaning below the level the test can find. A rising or detectable viral load is an early signal that something needs attention, usually adherence. Viral load is the main routine monitoring test in modern HIV care. A value reported as "undetectable", "target not detected", or "<50" all mean the virus is suppressed.',
    sw: 'Viral load ya VVU hupima ni nakala ngapi za nyenzo za kijeni za VVU (RNA) zilizopo katika milimita ya damu. Ni kipimo cha moja kwa moja zaidi cha jinsi virusi vilivyo hai na, hivyo, cha kama matibabu ya kupunguza makali ya virusi yanafanya kazi. Wakati ART inachukuliwa kwa mfululizo, viral load hushuka — ndani ya karibu miezi 6 kawaida huwa "isiyoonekana", maana yake chini ya kiwango ambacho kipimo kinaweza kupata. Viral load inayopanda au inayoonekana ni ishara ya mapema kwamba kuna kitu kinahitaji umakini, kawaida kuzingatia. Viral load ni kipimo kikuu cha ufuatiliaji wa kawaida katika huduma ya kisasa ya VVU. Thamani inayoripotiwa kama "isiyoonekana", "target not detected", au "<50" zote zinamaanisha virusi vimedhibitiwa.',
    sw_mtaa: 'Viral load ya VVU inapima ni nakala ngapi za nyenzo za kijeni za VVU (RNA) zilizopo katika milimita ya damu. Ni kipimo cha moja kwa moja zaidi cha jinsi virusi vilivyo hai na, hivyo, cha kama matibabu ya kupunguza makali ya virusi yanafanya kazi. Wakati ART inachukuliwa kwa mfululizo, viral load inashuka — ndani ya karibu miezi 6 kawaida inakuwa "haionekani", maana yake chini ya kiwango ambacho kipimo kinaweza kupata. Viral load inayopanda au inayoonekana ni ishara ya mapema kwamba kuna kitu kinahitaji umakini, kawaida adherence. Viral load ni kipimo kikuu cha ufuatiliaji wa kawaida katika huduma ya kisasa ya VVU. Thamani inayoripotiwa kama "haionekani", "target not detected", au "<50" zote zinamaanisha virusi vimedhibitiwa.',
  },

  whyItsOrdered: {
    en: 'Viral load is ordered to answer one central question: is the ART working? It is checked at the first post-treatment milestone (commonly around 6 months after starting ART) to confirm the virus is being suppressed, then at routine intervals (often yearly once a person is stable and undetectable). It is also checked whenever there is concern — a new illness, suspected adherence problems, or before and after a regimen change. A detectable viral load triggers a defined response: adherence support followed by a repeat test, and only then, if still high, consideration of treatment failure and a regimen switch. Viral load is also the basis of U=U: a confirmed, sustained undetectable result means HIV cannot be transmitted to a sexual partner. It works alongside the CD4 count, which separately measures immune-system strength.',
    sw: 'Viral load huombwa kujibu swali moja kuu: je, ART inafanya kazi? Hukaguliwa katika hatua ya kwanza baada ya matibabu (kawaida karibu miezi 6 baada ya kuanza ART) kuthibitisha virusi vinadhibitiwa, kisha katika vipindi vya kawaida (mara nyingi kila mwaka mara mtu anapokuwa imara na asiyeonekana). Pia hukaguliwa wakati wowote kuna wasiwasi — ugonjwa mpya, matatizo ya kuzingatia yanayoshukiwa, au kabla na baada ya kubadili regimen. Viral load inayoonekana huchochea jibu lililofafanuliwa: msaada wa kuzingatia ukifuatiwa na kipimo cha kurudia, na ndipo tu, ikiwa bado iko juu, kufikiria kushindwa kwa matibabu na kubadili regimen. Viral load pia ni msingi wa U=U: matokeo yaliyothibitishwa, ya kudumu yasiyoonekana yanamaanisha VVU haiwezi kupitishwa kwa mwenza wa kingono. Inafanya kazi pamoja na CD4 count, ambayo hupima nguvu ya mfumo wa kinga kando.',
    sw_mtaa: 'Viral load inaombwa kujibu swali moja kuu: je, ART inafanya kazi? Inakaguliwa katika hatua ya kwanza baada ya matibabu (kawaida karibu miezi 6 baada ya kuanza ART) kuthibitisha virusi vinadhibitiwa, kisha katika vipindi vya kawaida (mara nyingi kila mwaka mara mtu anapokuwa imara na asiyeonekana). Pia inakaguliwa wakati wowote kuna wasiwasi — ugonjwa mpya, matatizo ya adherence yanayoshukiwa, au kabla na baada ya kubadili regimen. Viral load inayoonekana inachochea jibu lililofafanuliwa: adherence support ikifuatiwa na kipimo cha kurudia, na ndipo tu, ikiwa bado iko juu, kufikiria treatment failure na kubadili regimen. Viral load pia ni msingi wa U=U: matokeo yaliyothibitishwa, ya kudumu yasiyoonekana yanamaanisha VVU haiwezi kupitishwa kwa mwenza wa kingono. Inafanya kazi pamoja na CD4 count, ambayo inapima nguvu ya kinga kando.',
  },

  ranges: [
    {
      // "Normal" for a person on ART = undetectable/suppressed (< 50 copies/mL).
      applies: { sex: 'any', ageMin: 0 },
      normalLow: 0,
      normalHigh: 50,
    },
  ],

  interpretations: [
    {
      band: 'normal',
      meaning: {
        en: 'Undetectable / suppressed viral load (below ~50 copies/mL) — the goal of HIV treatment. ART is working, the immune system is protected, and U=U applies: HIV cannot be transmitted sexually while suppression is sustained.',
        sw: 'Viral load isiyoonekana / iliyodhibitiwa (chini ya ~copies 50/mL) — lengo la matibabu ya VVU. ART inafanya kazi, mfumo wa kinga umelindwa, na U=U inatumika: VVU haiwezi kupitishwa kingono wakati udhibiti unadumu.',
        sw_mtaa: 'Viral load isiyoonekana / iliyodhibitiwa (chini ya ~copies 50/mL) — lengo la matibabu ya VVU. ART inafanya kazi, kinga imelindwa, na U=U inatumika: VVU haiwezi kupitishwa kingono wakati udhibiti unadumu.',
      },
      nextSteps: {
        en: 'Keep taking ART every day without gaps. Attend routine CTC visits and your next scheduled viral load test. Continue TB screening. Record the result and date in your health vault.',
        sw: 'Endelea kuchukua ART kila siku bila mapengo. Hudhuria ziara za kawaida za CTC na kipimo chako kijacho cha viral load kilichopangwa. Endelea na uchunguzi wa TB. Rekodi matokeo na tarehe katika vault yako ya afya.',
        sw_mtaa: 'Endelea kuchukua ART kila siku bila mapengo. Hudhuria ziara za kawaida za CTC na kipimo chako kijacho cha viral load kilichopangwa. Endelea na uchunguzi wa TB. Rekodi matokeo na tarehe katika vault yako ya afya.',
      },
      urgency: 'routine',
    },
    {
      band: 'high',
      meaning: {
        en: 'Detectable viral load (roughly 50-1000 copies/mL is low-level; at or above 1000 is unsuppressed). Most often caused by gaps in taking ART rather than drug resistance. A single detectable result does not confirm treatment failure — it calls for adherence support and a repeat test.',
        sw: 'Viral load inayoonekana (takriban copies 50-1000/mL ni kiwango cha chini; katika au juu ya 1000 haijadhibitiwa). Mara nyingi husababishwa na mapengo katika kuchukua ART badala ya usugu wa dawa. Matokeo moja yanayoonekana hayathibitishi kushindwa kwa matibabu — yanahitaji msaada wa kuzingatia na kipimo cha kurudia.',
        sw_mtaa: 'Viral load inayoonekana (takriban copies 50-1000/mL ni kiwango cha chini; katika au juu ya 1000 haijadhibitiwa). Mara nyingi inasababishwa na mapengo katika kuchukua ART badala ya drug resistance. Matokeo moja yanayoonekana hayathibitishi treatment failure — yanahitaji adherence support na kipimo cha kurudia.',
      },
      nextSteps: {
        en: 'Bring the result to your CTC. Expect intensive adherence support to find and fix the cause, then a repeat viral load after about 3 months. Keep taking ART every day, be honest about missed doses, and use condoms until suppression returns.',
        sw: 'Lete matokeo kwa CTC yako. Tarajia msaada mkubwa wa kuzingatia kupata na kurekebisha sababu, kisha viral load inayorudiwa baada ya miezi 3. Endelea kuchukua ART kila siku, kuwa mkweli kuhusu dose zilizokoswa, na utumie kondomu hadi udhibiti urudi.',
        sw_mtaa: 'Lete matokeo kwa CTC yako. Tarajia adherence support kubwa kupata na kurekebisha sababu, kisha viral load inayorudiwa baada ya miezi 3. Endelea kuchukua ART kila siku, kuwa mkweli kuhusu dose zilizokoswa, na utumie kondomu hadi udhibiti urudi.',
      },
      urgency: 'soon',
    },
    {
      band: 'critical_high',
      meaning: {
        en: 'A persistently high viral load — at or above 1000 copies/mL on a repeat test after adherence support — confirms treatment failure. The current ART regimen is no longer controlling the virus, and a switch to a second-line regimen is considered. This is a recognised, manageable situation: second-line ART works.',
        sw: 'Viral load iliyo juu kwa kudumu — katika au juu ya copies 1000/mL kwenye kipimo cha kurudia baada ya msaada wa kuzingatia — inathibitisha kushindwa kwa matibabu. Regimen ya sasa ya ART haidhibiti tena virusi, na kubadili kwa regimen ya mstari wa pili kunafikiriwa. Hii ni hali inayotambulika, inayoweza kusimamiwa: ART ya mstari wa pili inafanya kazi.',
        sw_mtaa: 'Viral load iliyo juu kwa kudumu — katika au juu ya copies 1000/mL kwenye kipimo cha kurudia baada ya adherence support — inathibitisha treatment failure. Regimen ya sasa ya ART haidhibiti tena virusi, na kubadili kwa second-line regimen kunafikiriwa. Hii ni hali inayotambulika, inayoweza kusimamiwa: second-line ART inafanya kazi.',
      },
      nextSteps: {
        en: 'Your CTC will move to drug-resistance assessment where available and a switch to a second-line regimen. Keep taking your current ART until the team changes it — do not stop on your own. Adherence support continues. Use condoms while unsuppressed. The goal now is getting back to undetectable on the new regimen.',
        sw: 'CTC yako itahamia tathmini ya usugu wa dawa pale inapopatikana na kubadili kwa regimen ya mstari wa pili. Endelea kuchukua ART yako ya sasa hadi timu itakapoibadilisha — usisimame peke yako. Msaada wa kuzingatia unaendelea. Tumia kondomu wakati hujadhibitiwa. Lengo sasa ni kurudi kwenye kutokuonekana kwenye regimen mpya.',
        sw_mtaa: 'CTC yako itahamia tathmini ya drug resistance pale inapopatikana na kubadili kwa second-line regimen. Endelea kuchukua ART yako ya sasa hadi timu itakapoibadilisha — usisimame peke yako. Adherence support inaendelea. Tumia kondomu wakati hujadhibitiwa. Lengo sasa ni kurudi kwenye undetectable kwenye regimen mpya.',
      },
      urgency: 'urgent',
    },
  ],

  sources: [
    src('NACP_ART_2024'),
    src('WHO_HIV_2024'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
