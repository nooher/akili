/**
 * Urine Protein (Proteinuria) — Lab Knowledge (Phase 7 maternal block)
 *
 * Sources: WHO Pre-eclampsia 2023, MoH-TZ Maternal Guidelines 2024,
 *          FIGO Pre-eclampsia 2024, KDIGO CKD 2024, NTLG STG 2023,
 *          Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Urine protein on dipstick is one of the cheapest, fastest, and most
 *   life-saving tests in maternal care. A single dipstick at every ANC
 *   visit catches the early signal of pre-eclampsia — protein leaking
 *   from kidneys that are reacting to a pregnancy-specific vascular
 *   problem. Combined with rising BP after 20 weeks, ≥1+ proteinuria is
 *   classic pre-eclampsia until proven otherwise.
 *
 *   Outside pregnancy, proteinuria is a key marker in CKD — quantifying
 *   it (urine protein:creatinine ratio or 24-hour collection) is part of
 *   the KDIGO staging. The dipstick is the first-look tool there too.
 *
 * Scope note:
 *   We interpret the dipstick result IN CONTEXT — pregnancy ANC routine,
 *   suspected pre-eclampsia, UTI workup, or unknown context. The same
 *   "1+" means very different things depending on why the test was done.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type UrineProteinResult =
  | 'negative'
  | 'trace'
  | 'one_plus'
  | 'two_plus'
  | 'three_plus'
  | 'four_plus';

export type UrineProteinContext =
  | 'anc_routine'              // routine ANC dipstick in pregnancy
  | 'suspected_preeclampsia'   // BP up, headache, swelling, etc.
  | 'uti_workup'               // possible urinary tract infection
  | 'ckd_monitoring'           // known CKD, watching proteinuria
  | 'unknown';

export interface UrineProteinInterpretation {
  result: UrineProteinResult;
  context: UrineProteinContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

/**
 * Interpret a urine protein dipstick result in context.
 *
 * The same dipstick value carries different weight in different scenarios:
 *   - 1+ in ANC routine with normal BP → confirm with another sample
 *     (contamination, transient proteinuria are common false signals)
 *   - 1+ with raised BP after 20 weeks → suspected pre-eclampsia, urgent
 *   - 2+ or higher → significant proteinuria regardless of context, more
 *     workup needed (ratio quantification, kidney workup, pre-eclampsia
 *     assessment depending on the picture)
 */
export function interpretUrineProtein(
  result: UrineProteinResult,
  context: UrineProteinContext = 'unknown',
): UrineProteinInterpretation {
  // ── NEGATIVE / TRACE ────────────────────────────────────────────────
  if (result === 'negative' || result === 'trace') {
    const isTrace = result === 'trace';
    return {
      result,
      context,
      headline: {
        en: isTrace
          ? 'Urine dipstick: trace protein — usually not significant on its own'
          : 'Urine dipstick: no protein detected — normal',
        sw: isTrace
          ? 'Dipstick ya mkojo: protini kidogo (trace) — kawaida si muhimu yenyewe'
          : 'Dipstick ya mkojo: hakuna protini iliyogundulika — ya kawaida',
        sw_mtaa: isTrace
          ? 'Urine dipstick: trace protein — kawaida si significant yenyewe'
          : 'Urine dipstick: hakuna protini iliyogundulika — normal',
      },
      meaning: {
        en: isTrace
          ? 'A trace of protein on the dipstick can be normal — it can come from a slightly concentrated sample (dehydration), small amounts of vaginal fluid contaminating the sample, or after exercise. It is usually rechecked at the next visit rather than treated as a problem on its own.'
          : 'The dipstick did not pick up protein leaking into the urine. In pregnancy this is reassuring for the pre-eclampsia question; in CKD monitoring it is a good sign. The dipstick is a screen, not a perfect test, so it is repeated at each visit.',
        sw: isTrace
          ? 'Protini kidogo (trace) kwenye dipstick inaweza kuwa ya kawaida — inaweza kutoka kwa sampuli iliyokolezwa kidogo (upungufu wa maji mwilini), kiasi kidogo cha kioevu cha uke kikichanganywa na sampuli, au baada ya mazoezi. Kawaida hupimwa tena katika ziara inayofuata badala ya kuchukuliwa kama tatizo yenyewe.'
          : 'Dipstick haikupata protini ikivuja kwenye mkojo. Katika mimba hii ni ya kutuliza kwa swali la pre-eclampsia; katika ufuatiliaji wa CKD ni ishara nzuri. Dipstick ni uchunguzi, sio kipimo kamilifu, hivyo hurudiwa katika kila ziara.',
        sw_mtaa: isTrace
          ? 'Trace ya protini kwenye dipstick inaweza kuwa ya kawaida — inaweza kutoka kwa concentrated sample (dehydration), small amounts za vaginal fluid zinazocontaminate sample, au baada ya exercise. Kawaida inapimwa tena katika next visit badala ya kuchukuliwa kama tatizo yenyewe.'
          : 'Dipstick haikupata protini ikivuja kwenye mkojo. Katika mimba hii ni reassuring kwa pre-eclampsia question; katika CKD monitoring ni good sign. Dipstick ni screen, sio perfect test, hivyo inarudiwa katika kila ziara.',
      },
      nextSteps: {
        en: 'Continue routine ANC monitoring at the planned schedule. If you develop a severe headache, vision changes, swelling, upper-belly pain, or reduced fetal movements, go in straight away regardless of this dipstick.',
        sw: 'Endelea na ufuatiliaji wa kawaida wa ANC kwa ratiba iliyopangwa. Ukipata kichwa kikali, mabadiliko ya kuona, uvimbe, maumivu ya tumbo la juu, au mwendo wa fetasi uliopungua, ingia mara moja bila kujali dipstick hii.',
        sw_mtaa: 'Endelea na routine ANC monitoring kwa planned schedule. Ukipata severe headache, vision changes, uvimbe, maumivu ya tumbo la juu, au reduced fetal movements, ingia mara moja regardless of dipstick hii.',
      },
      urgency: 'routine',
    };
  }

  // ── ONE PLUS (1+) ────────────────────────────────────────────────────
  if (result === 'one_plus') {
    if (context === 'suspected_preeclampsia') {
      return {
        result,
        context,
        headline: {
          en: 'Urine dipstick: 1+ protein with suspected pre-eclampsia — URGENT review',
          sw: 'Dipstick ya mkojo: protini 1+ na pre-eclampsia inayoshukiwa — mapitio ya HARAKA',
          sw_mtaa: 'Urine dipstick: 1+ protein na suspected pre-eclampsia — URGENT review',
        },
        meaning: {
          en: '1+ protein on the dipstick combined with raised blood pressure after 20 weeks is classic for pre-eclampsia until shown otherwise. The combination matters more than either alone. This needs prompt clinical assessment — blood pressure check, fuller bloods (full blood count, liver, kidneys), and a quantified urine protein test (urine protein:creatinine ratio or 24-hour collection), with the team deciding on monitoring versus admission.',
          sw: 'Protini 1+ kwenye dipstick pamoja na shinikizo la damu lililoinuka baada ya wiki 20 ni ya kawaida kwa pre-eclampsia hadi ionyeshwe vinginevyo. Mchanganyiko unajali zaidi kuliko kila moja peke yake. Hii inahitaji tathmini ya haraka ya kliniki — ukaguzi wa shinikizo la damu, damu kamili zaidi (hesabu kamili ya damu, ini, figo), na kipimo cha protini cha mkojo kilichohesabiwa (urine protein:creatinine ratio au mkusanyiko wa masaa 24), pamoja na timu kuamua kuhusu ufuatiliaji dhidi ya kulazwa.',
          sw_mtaa: '1+ protein kwenye dipstick pamoja na raised BP baada ya wiki 20 ni classic kwa pre-eclampsia hadi shown otherwise. Combination inajali zaidi kuliko each alone. Hii inahitaji prompt clinical assessment — BP check, fuller bloods (FBC, liver, kidneys), na quantified urine protein test (urine protein:creatinine ratio au 24-hour collection), na team kuamua kuhusu monitoring vs admission.',
        },
        nextSteps: {
          en: 'Go to a facility today — same day, not "tomorrow if it gets worse." Severe pre-eclampsia can develop in hours. If you have a severe headache, vision changes, upper-belly pain, or any seizure: EMERGENCY, go now.',
          sw: 'Nenda kituoni leo — siku ile ile, sio "kesho ikiwa itazidi kuwa mbaya." Pre-eclampsia kali inaweza kuendelea ndani ya masaa. Ikiwa una kichwa kikali, mabadiliko ya kuona, maumivu ya tumbo la juu, au degedege lolote: DHARURA, nenda sasa.',
          sw_mtaa: 'Nenda kituoni leo — siku ile ile, sio "kesho ikiwa itazidi kuwa mbaya." Severe pre-eclampsia inaweza kuendelea ndani ya masaa. Ikiwa una severe headache, vision changes, maumivu ya tumbo la juu, au seizure yoyote: DHARURA, nenda sasa.',
        },
        urgency: 'urgent',
      };
    }
    if (context === 'anc_routine') {
      return {
        result,
        context,
        headline: {
          en: 'Urine dipstick: 1+ protein at routine ANC — needs a closer look',
          sw: 'Dipstick ya mkojo: protini 1+ kwenye ANC ya kawaida — inahitaji ukaguzi wa karibu',
          sw_mtaa: 'Urine dipstick: 1+ protein kwenye routine ANC — inahitaji closer look',
        },
        meaning: {
          en: 'A 1+ result on routine ANC dipstick can be a real signal or a false alarm — contamination, a urinary infection, or transient proteinuria can all cause it. The team will check your blood pressure carefully and either repeat the dipstick on a clean midstream sample, send a quantified test (protein:creatinine ratio), or screen for UTI. If your BP is up, the picture shifts toward pre-eclampsia and review is more urgent.',
          sw: 'Matokeo ya 1+ kwenye dipstick ya ANC ya kawaida yanaweza kuwa ishara halisi au tahadhari ya uongo — uchafuzi, maambukizi ya njia ya mkojo, au protinuria ya muda mfupi yote yanaweza kuyasababisha. Timu itachunguza shinikizo lako la damu kwa makini na ama kurudia dipstick kwenye sampuli safi ya midstream, kutuma kipimo kilichohesabiwa (protein:creatinine ratio), au kuchunguza UTI. Ikiwa BP yako iko juu, picha inahamia kuelekea pre-eclampsia na mapitio ni ya haraka zaidi.',
          sw_mtaa: '1+ result kwenye routine ANC dipstick inaweza kuwa real signal au false alarm — contamination, UTI, au transient proteinuria yote zinaweza kusababisha. Team itachunguza BP yako kwa makini na ama kurudia dipstick kwenye clean midstream sample, kutuma quantified test (protein:creatinine ratio), au screen kwa UTI. Ikiwa BP yako iko juu, picha inahamia kuelekea pre-eclampsia na review ni urgent zaidi.',
        },
        nextSteps: {
          en: 'Stay at the ANC visit until the team has rechecked your BP and decided on the next step. Watch for and report immediately any severe headache, vision changes, swelling, upper-belly pain, or reduced fetal movements.',
          sw: 'Baki kwenye ziara ya ANC hadi timu iwe imerudia BP yako na kuamua hatua inayofuata. Angalia na ripoti mara moja kichwa kikali chochote, mabadiliko ya kuona, uvimbe, maumivu ya tumbo la juu, au mwendo wa fetasi uliopungua.',
          sw_mtaa: 'Baki kwenye ANC visit hadi team imerudia BP yako na kuamua next step. Angalia na ripoti mara moja severe headache yoyote, vision changes, uvimbe, maumivu ya tumbo la juu, au reduced fetal movements.',
        },
        urgency: 'soon',
      };
    }
    if (context === 'uti_workup') {
      return {
        result,
        context,
        headline: {
          en: 'Urine dipstick: 1+ protein in a UTI workup',
          sw: 'Dipstick ya mkojo: protini 1+ katika uchunguzi wa UTI',
          sw_mtaa: 'Urine dipstick: 1+ protein katika UTI workup',
        },
        meaning: {
          en: 'A small amount of protein on dipstick is common in urinary tract infections — the inflammation lets a little protein leak through. The other dipstick lines (nitrites, leucocytes), the symptoms (burning, frequency, fever, back pain), and a culture if available drive the UTI decision more than the protein. Treat the UTI; the protein typically clears once the infection is gone.',
          sw: 'Kiasi kidogo cha protini kwenye dipstick ni cha kawaida katika maambukizi ya njia ya mkojo — uvimbe huruhusu protini kidogo kuvuja. Mistari mingine ya dipstick (nitrites, leucocytes), dalili (kuwaka, mara kwa mara, homa, maumivu ya mgongo), na utamaduni kama unapatikana huongoza uamuzi wa UTI zaidi kuliko protini. Tibu UTI; protini kawaida hupotea mara maambukizi yanapoondoka.',
          sw_mtaa: 'Kiasi kidogo cha protini kwenye dipstick ni cha kawaida katika UTIs — inflammation inaruhusu protini kidogo kuvuja. Mistari mingine ya dipstick (nitrites, leucocytes), symptoms (burning, frequency, fever, back pain), na culture kama inapatikana zinaongoza UTI decision zaidi kuliko protein. Tibu UTI; protein kawaida inaclear mara infection inapoondoka.',
        },
        nextSteps: {
          en: 'Complete the prescribed UTI treatment fully, drink enough fluids, and arrange a follow-up urine check after treatment to make sure the protein has cleared. If you are pregnant, UTI treatment matters more, because untreated UTI raises the risk of preterm labour.',
          sw: 'Maliza matibabu yaliyoagizwa ya UTI kikamilifu, kunywa kioevu cha kutosha, na panga ukaguzi wa mkojo wa kufuatilia baada ya matibabu kuhakikisha protini imeondoka. Ikiwa una mimba, matibabu ya UTI yanajali zaidi, kwa sababu UTI isiyotibiwa huongeza hatari ya leba ya kabla ya wakati.',
          sw_mtaa: 'Maliza prescribed UTI treatment fully, kunywa fluids za kutosha, na panga follow-up urine check baada ya treatment kuhakikisha protein imeclear. Ikiwa una mimba, UTI treatment inajali zaidi, kwa sababu untreated UTI inaongeza preterm labour risk.',
        },
        urgency: 'soon',
      };
    }
    if (context === 'ckd_monitoring') {
      return {
        result,
        context,
        headline: {
          en: 'Urine dipstick: 1+ protein in CKD monitoring — quantify it',
          sw: 'Dipstick ya mkojo: protini 1+ katika ufuatiliaji wa CKD — ihesabu',
          sw_mtaa: 'Urine dipstick: 1+ protein katika CKD monitoring — quantify',
        },
        meaning: {
          en: 'Persistent proteinuria is a key marker in CKD — it predicts faster kidney function decline and higher cardiovascular risk, and it is one of the things ACE inhibitors and ARBs reduce. A dipstick 1+ should be quantified (urine albumin:creatinine ratio or protein:creatinine ratio) — the exact number guides treatment decisions, including whether to start or up-titrate an ACE inhibitor / ARB (outside pregnancy).',
          sw: 'Protinuria inayoendelea ni alama muhimu katika CKD — hutabiri kushuka kwa kasi kwa utendaji wa figo na hatari kubwa zaidi ya moyo, na ni mojawapo ya mambo ambayo ACE inhibitors na ARBs hupunguza. Dipstick 1+ inapaswa kuhesabiwa (urine albumin:creatinine ratio au protein:creatinine ratio) — nambari halisi inaongoza maamuzi ya matibabu, ikiwa ni pamoja na kama kuanza au kuongeza ACE inhibitor / ARB (nje ya mimba).',
          sw_mtaa: 'Persistent proteinuria ni key marker katika CKD — inatabiri faster kidney function decline na higher cardiovascular risk, na ni mojawapo ya vitu ambavyo ACE inhibitors na ARBs zinapunguza. Dipstick 1+ inapaswa kuquantify (urine ACR au PCR) — exact number inaongoza treatment decisions, including kama kuanza au up-titrate ACE inhibitor / ARB (nje ya mimba).',
        },
        nextSteps: {
          en: 'Bring this dipstick result to your CKD clinic visit — they will order a urine protein:creatinine ratio (or ACR) for a precise number and decide on treatment optimisation. Continue your ACE inhibitor / ARB if already prescribed (unless pregnant — in which case it must be switched).',
          sw: 'Lete matokeo haya ya dipstick kwa ziara yako ya kliniki ya CKD — wataagiza urine protein:creatinine ratio (au ACR) kwa nambari halisi na kuamua juu ya uboreshaji wa matibabu. Endelea na ACE inhibitor / ARB yako ikiwa tayari umeagizwa (isipokuwa mjamzito — ambapo lazima ibadilishwe).',
          sw_mtaa: 'Lete dipstick result hii kwa CKD clinic visit yako — wataagiza urine PCR (au ACR) kwa precise number na kuamua kuhusu treatment optimisation. Endelea na ACE inhibitor / ARB yako ikiwa tayari imeprescribed (isipokuwa pregnant — ambapo lazima ibadilishwe).',
        },
        urgency: 'soon',
      };
    }
    // unknown context
    return {
      result,
      context,
      headline: {
        en: 'Urine dipstick: 1+ protein — context matters',
        sw: 'Dipstick ya mkojo: protini 1+ — muktadha unajali',
        sw_mtaa: 'Urine dipstick: 1+ protein — context inajali',
      },
      meaning: {
        en: 'A 1+ on a urine dipstick is a signal worth investigating but does not by itself diagnose anything. The meaning depends entirely on why the test was done: pregnancy ANC with raised BP points to pre-eclampsia, urinary symptoms point to UTI, known CKD points to monitoring quantification, and a one-off test in a well person often clears on a repeat sample.',
        sw: '1+ kwenye dipstick ya mkojo ni ishara inayostahili kuchunguzwa lakini haitambui kitu chochote yenyewe. Maana inategemea kabisa kwa nini kipimo kilifanywa: ANC ya mimba na BP iliyoinuka inaelekeza kwa pre-eclampsia, dalili za mkojo zinaelekeza kwa UTI, CKD inayojulikana inaelekeza kuhesabu kwa ufuatiliaji, na kipimo cha mara moja kwa mtu mzima mara nyingi husafisha kwenye sampuli ya kurudia.',
        sw_mtaa: '1+ kwenye urine dipstick ni signal inayostahili kuchunguzwa lakini haina diagnose kitu chochote yenyewe. Meaning inategemea kabisa kwa nini test ilifanywa: pregnancy ANC na raised BP inaelekeza kwa pre-eclampsia, urinary symptoms zinaelekeza kwa UTI, known CKD inaelekeza kwa monitoring quantification, na one-off test kwa mtu mzima mara nyingi inaclear kwenye repeat sample.',
      },
      nextSteps: {
        en: 'Bring this result to a clinician who can place it in the right context — they will check blood pressure, ask about symptoms, and decide whether to repeat the test, screen for UTI, or quantify the protein.',
        sw: 'Lete matokeo haya kwa daktari anayeweza kuyaweka katika muktadha sahihi — atachunguza shinikizo la damu, atauliza kuhusu dalili, na kuamua kama kurudia kipimo, kuchunguza UTI, au kuhesabu protini.',
        sw_mtaa: 'Lete result hii kwa clinician anayeweza kuiweka katika right context — atachunguza BP, atauliza kuhusu symptoms, na kuamua kama kurudia test, screen kwa UTI, au quantify protein.',
      },
      urgency: 'soon',
    };
  }

  // ── TWO PLUS (2+) and HIGHER ─────────────────────────────────────────
  const isThreeOrFour = result === 'three_plus' || result === 'four_plus';
  const plusLabel =
    result === 'two_plus' ? '2+' : result === 'three_plus' ? '3+' : '4+';

  if (context === 'suspected_preeclampsia' || context === 'anc_routine') {
    return {
      result,
      context,
      headline: {
        en: `Urine dipstick: ${plusLabel} protein in pregnancy — significant proteinuria, URGENT`,
        sw: `Dipstick ya mkojo: protini ${plusLabel} katika mimba — protinuria muhimu, HARAKA`,
        sw_mtaa: `Urine dipstick: ${plusLabel} protein katika mimba — significant proteinuria, URGENT`,
      },
      meaning: {
        en: `${plusLabel} protein on the dipstick in pregnancy is significant proteinuria. Combined with any blood-pressure elevation, this is pre-eclampsia until proven otherwise — and ${isThreeOrFour ? 'at this level the team usually moves quickly toward admission, full bloods (FBC, liver, kidneys, urate, clotting), magnesium sulfate cover if severe features are present, and delivery planning.' : 'at this level it warrants prompt full assessment — BP series, bloods (FBC, liver, kidneys), and decisions about admission and treatment.'}`,
        sw: `Protini ${plusLabel} kwenye dipstick katika mimba ni protinuria muhimu. Pamoja na kupanda kwa shinikizo la damu kokote, hii ni pre-eclampsia hadi ithibitishwe vinginevyo — na ${isThreeOrFour ? 'katika kiwango hiki timu kawaida huhamia haraka kuelekea kulazwa, damu kamili (FBC, ini, figo, urate, ugando), kifuniko cha magnesium sulfate ikiwa dalili kali zipo, na kupanga kujifungua.' : 'katika kiwango hiki kunastahili tathmini kamili ya haraka — mfululizo wa BP, damu (FBC, ini, figo), na maamuzi kuhusu kulazwa na matibabu.'}`,
        sw_mtaa: `${plusLabel} protein kwenye dipstick katika mimba ni significant proteinuria. Pamoja na BP elevation yoyote, hii ni pre-eclampsia hadi proven otherwise — na ${isThreeOrFour ? 'katika level hii team kawaida inahamia haraka kuelekea admission, full bloods (FBC, liver, kidneys, urate, clotting), magnesium sulfate cover ikiwa severe features zipo, na delivery planning.' : 'katika level hii kunastahili prompt full assessment — BP series, bloods (FBC, liver, kidneys), na decisions kuhusu admission na treatment.'}`,
      },
      nextSteps: {
        en: 'Go to a facility now — not tomorrow. If you have severe headache, vision changes, upper-belly pain, breathlessness, or any seizure: EMERGENCY, go immediately. Do not wait for further symptoms.',
        sw: 'Nenda kituoni sasa — sio kesho. Ikiwa una kichwa kikali, mabadiliko ya kuona, maumivu ya tumbo la juu, kushindwa kupumua, au degedege lolote: DHARURA, nenda mara moja. Usisubiri dalili zaidi.',
        sw_mtaa: 'Nenda kituoni sasa — sio kesho. Ikiwa una severe headache, vision changes, maumivu ya tumbo la juu, breathlessness, au seizure yoyote: DHARURA, nenda mara moja. Usisubiri dalili zaidi.',
      },
      urgency: isThreeOrFour ? 'emergency' : 'urgent',
    };
  }

  if (context === 'ckd_monitoring') {
    return {
      result,
      context,
      headline: {
        en: `Urine dipstick: ${plusLabel} protein in CKD — nephrotic-range concern, urgent quantification`,
        sw: `Dipstick ya mkojo: protini ${plusLabel} katika CKD — wasiwasi wa nephrotic-range, kuhesabu haraka`,
        sw_mtaa: `Urine dipstick: ${plusLabel} protein katika CKD — nephrotic-range concern, urgent quantification`,
      },
      meaning: {
        en: 'Heavy proteinuria on dipstick in CKD raises concern for nephrotic-range proteinuria (urine protein loss large enough to drop blood albumin, cause swelling, raise clot risk, and accelerate kidney decline). It needs quantification (protein:creatinine ratio) and a fuller assessment — kidney function, albumin, lipid panel, and review of treatment to maximise kidney protection (often optimising ACE inhibitor / ARB doses).',
        sw: 'Protinuria nzito kwenye dipstick katika CKD huongeza wasiwasi wa protinuria ya nephrotic-range (kupoteza protini ya mkojo kubwa ya kutosha kushusha albumin ya damu, kusababisha uvimbe, kuongeza hatari ya kuganda, na kuharakisha kushuka kwa figo). Inahitaji kuhesabiwa (protein:creatinine ratio) na tathmini kamili zaidi — utendaji wa figo, albumin, lipid panel, na mapitio ya matibabu kuongeza ulinzi wa figo (mara nyingi kuboresha dose za ACE inhibitor / ARB).',
        sw_mtaa: 'Heavy proteinuria kwenye dipstick katika CKD inaongeza concern kwa nephrotic-range proteinuria (urine protein loss kubwa ya kutosha kushusha blood albumin, kusababisha swelling, kuongeza clot risk, na kuharakisha kidney decline). Inahitaji quantification (PCR) na fuller assessment — kidney function, albumin, lipid panel, na review ya treatment kumaximize kidney protection (mara nyingi optimising ACE inhibitor / ARB doses).',
      },
      nextSteps: {
        en: 'Contact your CKD clinic this week — bring the dipstick result, list of medicines, and a recent BP record. They will arrange the quantified test and the wider workup, and adjust treatment as needed.',
        sw: 'Wasiliana na kliniki yako ya CKD wiki hii — lete matokeo ya dipstick, orodha ya dawa, na rekodi ya hivi karibuni ya BP. Watapanga kipimo kilichohesabiwa na uchunguzi mpana zaidi, na kurekebisha matibabu inapohitajika.',
        sw_mtaa: 'Wasiliana na CKD clinic yako wiki hii — lete dipstick result, list ya dawa, na recent BP record. Watapanga quantified test na wider workup, na kurekebisha treatment inapohitajika.',
      },
      urgency: 'urgent',
    };
  }

  // unknown / uti_workup with 2+ or higher
  return {
    result,
    context,
    headline: {
      en: `Urine dipstick: ${plusLabel} protein — needs prompt clinical assessment`,
      sw: `Dipstick ya mkojo: protini ${plusLabel} — inahitaji tathmini ya haraka ya kliniki`,
      sw_mtaa: `Urine dipstick: ${plusLabel} protein — inahitaji prompt clinical assessment`,
    },
    meaning: {
      en: `${plusLabel} protein on dipstick is significant regardless of context — it should not be left as "let\'s see at the next visit." The possible causes range from pre-eclampsia (if pregnant), to active kidney disease, to nephrotic syndrome, to severe urinary infection. A clinician needs to take the history, check BP, examine for swelling, and arrange quantification of the protein plus kidney function tests.`,
      sw: `Protini ${plusLabel} kwenye dipstick ni muhimu bila kujali muktadha — haipaswi kuachwa kama "tuone katika ziara inayofuata." Sababu zinazowezekana ni kuanzia pre-eclampsia (ikiwa mjamzito), hadi ugonjwa wa figo unaoendelea, hadi nephrotic syndrome, hadi maambukizi makali ya mkojo. Daktari anahitaji kuchukua historia, kuchunguza BP, kuchunguza uvimbe, na kupanga kuhesabu protini pamoja na vipimo vya utendaji wa figo.`,
      sw_mtaa: `${plusLabel} protein kwenye dipstick ni significant regardless of context — haipaswi kuachwa kama "tuone katika next visit." Possible causes zinaanzia pre-eclampsia (ikiwa pregnant), hadi active kidney disease, hadi nephrotic syndrome, hadi severe urinary infection. Clinician anahitaji kuchukua history, kuchunguza BP, examine kwa swelling, na kupanga quantification ya protein pamoja na kidney function tests.`,
    },
    nextSteps: {
      en: 'Go to a facility within 24 hours — sooner if pregnant or unwell. Bring any recent BP readings and a list of medicines you take.',
      sw: 'Nenda kituoni ndani ya masaa 24 — mapema ikiwa mjamzito au si mzima. Lete usomaji wowote wa hivi karibuni wa BP na orodha ya dawa unazotumia.',
      sw_mtaa: 'Nenda kituoni ndani ya masaa 24 — mapema ikiwa pregnant au si mzima. Lete recent BP readings na list ya dawa unazotumia.',
    },
    urgency: isThreeOrFour ? 'urgent' : 'soon',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE
// ──────────────────────────────────────────────────────────────────────

export const URINE_PROTEIN: LabKnowledge = {
  id: 'urine_protein',
  aliases: LAB_ALIASES.urine_protein,

  unit: 'dipstick (qualitative)',

  whatItMeasures: {
    en: 'Urine protein measures whether protein is leaking from the bloodstream through the kidneys into the urine. Healthy kidneys keep large protein molecules (mainly albumin) in the blood; when the filters are damaged or under abnormal pressure, protein slips through. The dipstick gives a quick semi-quantitative read — negative, trace, 1+, 2+, 3+, 4+ — within a minute. For precise numbers, a urine protein:creatinine ratio (PCR) or albumin:creatinine ratio (ACR) on a spot sample, or a 24-hour urine collection, is used.',
    sw: 'Protini ya mkojo hupima kama protini inavuja kutoka mfumo wa damu kupitia figo hadi mkojo. Figo zenye afya huweka molekuli kubwa za protini (hasa albumin) katika damu; vichujio vinapoharibika au kuwa chini ya shinikizo lisilo la kawaida, protini huteleza. Dipstick hutoa usomaji wa haraka wa kiasi nusu — negative, trace, 1+, 2+, 3+, 4+ — ndani ya dakika. Kwa nambari halisi, urine protein:creatinine ratio (PCR) au albumin:creatinine ratio (ACR) kwenye sampuli ya doa, au mkusanyiko wa masaa 24 wa mkojo, hutumika.',
    sw_mtaa: 'Urine protein inapima kama protini inavuja kutoka bloodstream kupitia figo hadi mkojo. Healthy kidneys zinaweka large protein molecules (mainly albumin) katika damu; vichujio vinapoharibika au kuwa under abnormal pressure, protini inateleza. Dipstick inatoa quick semi-quantitative read — negative, trace, 1+, 2+, 3+, 4+ — ndani ya minute. Kwa precise numbers, urine PCR au ACR kwenye spot sample, au 24-hour urine collection, inatumika.',
  },

  whyItsOrdered: {
    en: 'At every ANC visit — to screen for pre-eclampsia, which silently leaks protein into the urine before the dangerous symptoms appear. In suspected UTI — protein supports the diagnosis alongside nitrites and leucocytes. In known or suspected CKD — to track kidney protection, especially when ACE inhibitors or ARBs are being adjusted. In any sudden swelling or unexplained tiredness — to screen for nephrotic syndrome or other glomerular disease. The dipstick is cheap, fast, and one of the highest-yield screening tools in primary care.',
    sw: 'Katika kila ziara ya ANC — kuchunguza pre-eclampsia, ambayo huvuja protini kimya kimya kwenye mkojo kabla ya dalili za hatari kujitokeza. Katika UTI inayoshukiwa — protini huunga mkono utambuzi pamoja na nitrites na leucocytes. Katika CKD inayojulikana au inayoshukiwa — kufuatilia ulinzi wa figo, hasa wakati ACE inhibitors au ARBs zinarekebishwa. Katika uvimbe wowote wa ghafla au uchovu usio na maelezo — kuchunguza nephrotic syndrome au ugonjwa mwingine wa glomerular. Dipstick ni ya bei nafuu, haraka, na mojawapo ya zana zenye mavuno makubwa zaidi ya uchunguzi katika huduma ya msingi.',
    sw_mtaa: 'Katika kila ANC visit — screen kwa pre-eclampsia, ambayo inavuja protini silently kwenye mkojo kabla ya dangerous symptoms kuonekana. Katika suspected UTI — protein inasupport diagnosis pamoja na nitrites na leucocytes. Katika known au suspected CKD — kufuatilia kidney protection, hasa wakati ACE inhibitors au ARBs zinarekebishwa. Katika sudden swelling yoyote au unexplained tiredness — screen kwa nephrotic syndrome au other glomerular disease. Dipstick ni cheap, fast, na mojawapo ya highest-yield screening tools katika primary care.',
  },

  ranges: [],

  interpretations: [
    {
      band: 'normal',
      meaning: {
        en: 'No significant protein detected. In pregnancy this is reassuring; outside pregnancy it points away from active glomerular disease at this moment.',
        sw: 'Hakuna protini muhimu iliyogundulika. Katika mimba hii ni ya kutuliza; nje ya mimba huelekeza mbali na ugonjwa wa glomerular unaoendelea kwa wakati huu.',
        sw_mtaa: 'Hakuna significant protein detected. Katika mimba hii ni reassuring; nje ya mimba inaelekeza away from active glomerular disease at this moment.',
      },
      nextSteps: {
        en: 'Continue routine monitoring as scheduled.',
        sw: 'Endelea na ufuatiliaji wa kawaida kama ilivyopangwa.',
        sw_mtaa: 'Endelea na routine monitoring kama scheduled.',
      },
      urgency: 'routine',
    },
    {
      band: 'high',
      meaning: {
        en: '1+ protein on dipstick — a real signal that needs context. With raised BP in pregnancy after 20 weeks, this is pre-eclampsia until proven otherwise — urgent review. Outside pregnancy, repeat the test on a clean midstream sample, screen for UTI, and consider quantification.',
        sw: 'Protini 1+ kwenye dipstick — ishara halisi inayohitaji muktadha. Na BP iliyoinuka katika mimba baada ya wiki 20, hii ni pre-eclampsia hadi ithibitishwe vinginevyo — mapitio ya haraka. Nje ya mimba, rudia kipimo kwenye sampuli safi ya midstream, chunguza UTI, na fikiria kuhesabu.',
        sw_mtaa: '1+ protein kwenye dipstick — real signal inayohitaji context. Na raised BP katika mimba baada ya wiki 20, hii ni pre-eclampsia hadi proven otherwise — urgent review. Nje ya mimba, rudia test kwenye clean midstream sample, screen kwa UTI, na fikiria quantification.',
      },
      nextSteps: {
        en: 'Same-day clinical assessment if pregnant with raised BP; otherwise prompt follow-up.',
        sw: 'Tathmini ya kliniki ya siku ile ile ikiwa mjamzito na BP iliyoinuka; vinginevyo ufuatiliaji wa haraka.',
        sw_mtaa: 'Same-day clinical assessment ikiwa pregnant na raised BP; vinginevyo prompt follow-up.',
      },
      urgency: 'urgent',
    },
    {
      band: 'critical_high',
      meaning: {
        en: '2+ protein or higher — significant proteinuria, not "wait and see." Causes range from pre-eclampsia (if pregnant) to active kidney disease and nephrotic syndrome. Needs prompt assessment and quantification.',
        sw: 'Protini 2+ au zaidi — protinuria muhimu, sio "subiri na uone." Sababu ni kuanzia pre-eclampsia (ikiwa mjamzito) hadi ugonjwa wa figo unaoendelea na nephrotic syndrome. Inahitaji tathmini ya haraka na kuhesabu.',
        sw_mtaa: '2+ protein au zaidi — significant proteinuria, sio "wait and see." Causes zinaanzia pre-eclampsia (ikiwa pregnant) hadi active kidney disease na nephrotic syndrome. Inahitaji prompt assessment na quantification.',
      },
      nextSteps: {
        en: 'Same-day facility review if pregnant; otherwise within 24 hours, sooner if unwell.',
        sw: 'Mapitio ya kituoni ya siku ile ile ikiwa mjamzito; vinginevyo ndani ya masaa 24, mapema ikiwa si mzima.',
        sw_mtaa: 'Same-day facility review ikiwa pregnant; vinginevyo ndani ya masaa 24, mapema ikiwa si mzima.',
      },
      urgency: 'urgent',
    },
  ],

  sources: [
    src('WHO_PREECLAMPSIA_2023'),
    src('MOH_TZ_MATERNAL_2024'),
    src('FIGO_PREECLAMPSIA_2024'),
    src('KDIGO_CKD_2024'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
