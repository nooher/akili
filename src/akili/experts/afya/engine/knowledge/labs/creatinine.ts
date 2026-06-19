/**
 * Serum Creatinine — Lab Knowledge & Interpretation
 *
 * Sources: KDIGO Clinical Practice Guideline for the Evaluation and Management
 *          of CKD 2024, NTLG STG 2023, WHO guidance on kidney health,
 *          Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * What creatinine measures: a waste product from normal muscle activity that
 * healthy kidneys clear into the urine. When the kidneys filter less well,
 * creatinine builds up in the blood — so a HIGHER creatinine generally means
 * WORSE kidney filtering. It is the raw number from which eGFR is calculated.
 *
 * Units: Tanzanian labs most often report creatinine in micromoles per litre
 * (µmol/L). Some report mg/dL (1 mg/dL ≈ 88.4 µmol/L). This file works in
 * µmol/L; the interpreter accepts the value as given and frames it broadly.
 *
 * Rough adult reference (µmol/L), sex-dependent:
 *   - Women: ~50-90 µmol/L
 *   - Men:   ~60-110 µmol/L
 * (Men sit higher because creatinine tracks muscle mass.)
 *
 * IMPORTANT interpretation caveats, all handled in interpretCreatinine():
 *   1. Creatinine depends heavily on MUSCLE MASS. A very muscular person can
 *      have a "high" creatinine with perfectly normal kidneys; a frail,
 *      low-muscle, elderly, or malnourished person can have a "normal-looking"
 *      creatinine while kidney function is genuinely reduced. This is exactly
 *      why eGFR (which adjusts for age and sex) is the preferred staging
 *      number — creatinine is best read THROUGH its eGFR.
 *   2. A SINGLE raised creatinine is not CKD. It can be acute kidney injury
 *      (often reversible), dehydration, or a lab artefact. CKD needs the
 *      change to persist over time. The trend matters more than one value.
 *   3. Creatinine can rise sharply with dehydration, certain medicines, and
 *      acute illness — context changes everything.
 *
 * Context-awareness: interpretCreatinine(value, context) branches on whether
 * this is a first/one-off result, monitoring of known CKD, or someone who is
 * acutely unwell (where acute kidney injury must be on the table).
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type CreatinineContext =
  | 'first_result'   // first-ever / one-off creatinine
  | 'known_ckd'      // monitoring a person already diagnosed with CKD
  | 'unwell'         // person is acutely unwell — AKI must be considered
  | 'unknown';

export type CreatinineBand =
  | 'markedly_high'  // > 300 µmol/L — markedly raised
  | 'high'           // 120-300 µmol/L — raised
  | 'borderline'     // 100-119 µmol/L — upper edge / borderline
  | 'normal';        // < 100 µmol/L — within the broad normal range

export interface CreatinineInterpretation {
  value: number;
  band: CreatinineBand;
  context: CreatinineContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

/**
 * Bands are deliberately broad and framed in µmol/L. Because creatinine is
 * so muscle-mass dependent, these are orientation bands, not diagnostic
 * cut-offs — the interpreter always points back to eGFR and the trend.
 */
export function bandForCreatinine(value: number): CreatinineBand {
  if (value > 300) return 'markedly_high';
  if (value >= 120) return 'high';
  if (value >= 100) return 'borderline';
  return 'normal';
}

export function interpretCreatinine(
  value: number,
  context: CreatinineContext = 'unknown',
): CreatinineInterpretation {
  const band = bandForCreatinine(value);

  // ── MARKEDLY HIGH — > 300 µmol/L ──────────────────────────────────
  if (band === 'markedly_high') {
    if (context === 'unwell') {
      return {
        value,
        band,
        context,
        headline: {
          en: `A creatinine of ${value} µmol/L in someone who is unwell needs urgent medical assessment — it points to significantly reduced kidney filtering, which may be sudden and reversible, or long-standing.`,
          sw: `Creatinine ya ${value} µmol/L kwa mtu asiye mzima inahitaji tathmini ya haraka ya kimatibabu — inaashiria uchujaji wa figo uliopungua sana, ambao unaweza kuwa wa ghafla na unaorekebishika, au wa muda mrefu.`,
          sw_mtaa: `Creatinine ya ${value} µmol/L kwa mtu asiye mzima inahitaji tathmini ya haraka ya daktari — inaashiria uchujaji wa figo uliopungua sana, ambao unaweza kuwa wa ghafla na unaorekebishika, au wa muda mrefu.`,
        },
        meaning: {
          en: 'A markedly raised creatinine means the kidneys are clearing this waste product much less effectively than normal. When it appears in someone who is acutely unwell — dehydrated, vomiting, passing little urine, feverish, or recently started on certain medicines — it may be acute kidney injury (AKI): a sudden drop in kidney function that can often be reversed if the cause is found and treated quickly. It can also reflect long-standing chronic kidney disease, or both at once. A clinician needs the full picture — the trend of recent results, urine output, examination, eGFR, and other tests — to tell these apart and act. This combination of a high creatinine and feeling unwell is not safe to manage at home.',
          sw: 'Creatinine iliyoinuka sana inamaanisha figo zinaondoa taka hii kwa ufanisi mdogo zaidi kuliko kawaida. Inapotokea kwa mtu asiye mzima — amepungukiwa maji, anatapika, anatoa mkojo kidogo, ana homa, au ameanza dawa fulani hivi karibuni — inaweza kuwa jeraha la ghafla la figo (AKI): kushuka kwa ghafla kwa utendaji wa figo ambako mara nyingi kunaweza kurekebishika ikiwa chanzo kinapatikana na kutibiwa haraka. Inaweza pia kuonyesha ugonjwa wa figo sugu wa muda mrefu, au vyote viwili kwa wakati mmoja. Daktari anahitaji picha kamili — mwelekeo wa matokeo ya hivi karibuni, kiasi cha mkojo, uchunguzi, eGFR, na vipimo vingine — kuzitofautisha na kuchukua hatua. Mchanganyiko huu wa creatinine ya juu na kujisikia vibaya sio salama kusimamia nyumbani.',
          sw_mtaa: 'Creatinine iliyoinuka sana inamaanisha figo zinaondoa taka hii kwa ufanisi mdogo zaidi kuliko kawaida. Inapotokea kwa mtu asiye mzima — amepungukiwa maji, anatapika, anatoa mkojo kidogo, ana homa, au ameanza dawa fulani karibuni — inaweza kuwa AKI (jeraha la ghafla la figo): kushuka kwa ghafla kwa utendaji wa figo ambako mara nyingi kunaweza kurekebishika ikiwa chanzo kinapatikana na kutibiwa haraka. Inaweza pia kuonyesha figo sugu ya muda mrefu, au vyote viwili kwa wakati mmoja. Daktari anahitaji picha kamili kuzitofautisha na kuchukua hatua. Mchanganyiko huu wa creatinine ya juu na kujisikia vibaya sio salama kusimamia nyumbani.',
        },
        nextSteps: {
          en: 'Go to a health facility now. Bring any previous kidney results and a full list of every medicine, herbal remedy, and supplement you take. Emergency warning signs that mean care cannot wait: passing very little or no urine, severe breathlessness, swelling with difficulty breathing, confusion or drowsiness, chest pain, or vomiting that stops you keeping fluids down.',
          sw: 'Nenda kituo cha afya sasa. Lete matokeo yoyote ya awali ya figo na orodha kamili ya kila dawa, dawa ya mitishamba, na kirutubisho unavyotumia. Ishara za onyo za dharura zinazomaanisha huduma haiwezi kusubiri: kutoa mkojo kidogo sana au kutotoa kabisa, kushindwa kupumua kwa kiasi kikubwa, uvimbe pamoja na ugumu wa kupumua, kuchanganyikiwa au usingizi mzito, maumivu ya kifua, au kutapika kunakokuzuia kushikilia maji.',
          sw_mtaa: 'Nenda kituo cha afya sasa. Lete matokeo yoyote ya awali ya figo na orodha kamili ya kila dawa, dawa ya mitishamba, na kirutubisho unavyotumia. Ishara za onyo za dharura: kutoa mkojo kidogo sana au kutotoa kabisa, kushindwa kupumua sana, uvimbe pamoja na ugumu wa kupumua, kuchanganyikiwa au usingizi mzito, maumivu ya kifua, au kutapika kunakokuzuia kushikilia maji.',
        },
        urgency: 'emergency',
      };
    }
    return {
      value,
      band,
      context,
      headline: {
        en: `A creatinine of ${value} µmol/L is markedly raised — it should be interpreted through its eGFR and discussed with a clinician, ideally a kidney specialist, soon.`,
        sw: `Creatinine ya ${value} µmol/L imeinuka sana — inapaswa kutafsiriwa kupitia eGFR yake na kujadiliwa na daktari, ikiwezekana bingwa wa figo, hivi karibuni.`,
        sw_mtaa: `Creatinine ya ${value} µmol/L imeinuka sana — inapaswa kutafsiriwa kupitia eGFR yake na kujadiliwa na daktari, ikiwezekana bingwa wa figo, hivi karibuni.`,
      },
      meaning: {
        en: 'A markedly raised creatinine usually corresponds to significantly reduced kidney function — but the single most useful next step is to read it through the eGFR, the number that adjusts for age and sex and places kidney function on the KDIGO stage scale. A creatinine this high commonly maps to CKD stage G4 or G5, but only the eGFR, the trend over time, and a urine protein test together can confirm the stage and whether this is chronic, acute, or both. What it does signal clearly is that this needs proper clinical attention — not panic, but not waiting either.',
        sw: 'Creatinine iliyoinuka sana kawaida hulingana na utendaji wa figo uliopungua sana — lakini hatua moja muhimu zaidi inayofuata ni kuisoma kupitia eGFR, namba inayorekebisha umri na jinsia na kuweka utendaji wa figo kwenye mizani ya hatua za KDIGO. Creatinine ya juu kiasi hiki kawaida hulingana na CKD hatua G4 au G5, lakini ni eGFR, mwelekeo kwa muda, na kipimo cha protini ya mkojo pamoja tu vinavyoweza kuthibitisha hatua na kama hii ni sugu, ya ghafla, au vyote. Kinachoashiria wazi ni kwamba hii inahitaji umakini sahihi wa kimatibabu — sio hofu, lakini sio kusubiri pia.',
        sw_mtaa: 'Creatinine iliyoinuka sana kawaida inalingana na utendaji wa figo uliopungua sana — lakini hatua moja muhimu zaidi inayofuata ni kuisoma kupitia eGFR, namba inayorekebisha umri na jinsia na kuweka utendaji wa figo kwenye mizani ya hatua za KDIGO. Creatinine ya juu kiasi hiki kawaida inalingana na CKD hatua G4 au G5, lakini ni eGFR, mwelekeo kwa muda, na kipimo cha protini ya mkojo pamoja tu vinavyoweza kuthibitisha hatua na kama hii ni sugu, ya ghafla, au vyote. Kinachoashiria wazi ni kwamba hii inahitaji umakini sahihi wa kimatibabu — sio hofu, lakini sio kusubiri pia.',
      },
      nextSteps: {
        en: 'Bring this result, with its eGFR, to a clinician soon — referral to a kidney specialist (nephrologist) is usually appropriate at this level. Bring any previous kidney results so the trend can be seen, and a full list of every medicine, herbal product, and supplement. Avoid NSAID painkillers (ibuprofen, diclofenac) and do not start any new medicine or herbal remedy without checking. Seek urgent care if you become breathless, pass very little urine, develop severe swelling, or feel confused.',
        sw: 'Lete matokeo haya, pamoja na eGFR yake, kwa daktari hivi karibuni — rufaa kwa daktari bingwa wa figo (nephrologist) kawaida inafaa katika kiwango hiki. Lete matokeo yoyote ya awali ya figo ili mwelekeo uonekane, na orodha kamili ya kila dawa, bidhaa ya mitishamba, na kirutubisho. Epuka dawa za maumivu za NSAID (ibuprofen, diclofenac) na usianze dawa yoyote mpya au dawa ya mitishamba bila kuangalia. Tafuta huduma ya haraka ukianza kushindwa kupumua, kutoa mkojo kidogo sana, kupata uvimbe mkubwa, au kujisikia kuchanganyikiwa.',
        sw_mtaa: 'Lete matokeo haya, pamoja na eGFR yake, kwa daktari hivi karibuni — rufaa kwa daktari bingwa wa figo (nephrologist) kawaida inafaa katika kiwango hiki. Lete matokeo yoyote ya awali ya figo ili mwelekeo uonekane, na orodha kamili ya kila dawa, bidhaa ya mitishamba, na kirutubisho. Epuka dawa za maumivu za NSAID (ibuprofen, diclofenac) na usianze dawa yoyote mpya au dawa ya mitishamba bila kuangalia. Tafuta huduma ya haraka ukianza kushindwa kupumua, kutoa mkojo kidogo sana, kupata uvimbe mkubwa, au kujisikia kuchanganyikiwa.',
      },
      urgency: 'urgent',
    };
  }

  // ── HIGH — 120-300 µmol/L ─────────────────────────────────────────
  if (band === 'high') {
    return {
      value,
      band,
      context,
      headline: {
        en: `A creatinine of ${value} µmol/L is above the usual range — it is best understood through its eGFR, and is worth following up with a clinician.`,
        sw: `Creatinine ya ${value} µmol/L iko juu ya kiwango cha kawaida — inaeleweka vizuri zaidi kupitia eGFR yake, na inastahili kufuatiliwa na daktari.`,
        sw_mtaa: `Creatinine ya ${value} µmol/L iko juu ya kiwango cha kawaida — inaeleweka vizuri zaidi kupitia eGFR yake, na inastahili kufuatiliwa na daktari.`,
      },
      meaning: {
        en: 'A raised creatinine usually means the kidneys are filtering less effectively than expected — but how much less depends on age, sex, and muscle mass, which is exactly why the eGFR is the better number to act on. The same creatinine of, say, 150 means something quite different in a young muscular man versus a small elderly woman. A raised creatinine can reflect chronic kidney disease, a temporary drop from dehydration or illness, or the effect of certain medicines. It is also not a one-test diagnosis: CKD is confirmed when reduced function persists over at least three months. The result is a genuine prompt to look properly — check the eGFR, check the trend, and check the urine for protein.',
        sw: 'Creatinine iliyoinuka kawaida inamaanisha figo zinachuja kwa ufanisi mdogo zaidi kuliko inavyotarajiwa — lakini kiasi gani kidogo hutegemea umri, jinsia, na uzito wa misuli, ndio sababu hasa eGFR ni namba bora ya kuchukua hatua. Creatinine ile ile ya, tuseme, 150 inamaanisha kitu tofauti kabisa kwa kijana mwenye misuli mingi dhidi ya mwanamke mdogo mzee. Creatinine iliyoinuka inaweza kuonyesha ugonjwa wa figo sugu, kushuka kwa muda kutoka kwa upungufu wa maji au ugonjwa, au athari ya dawa fulani. Pia sio utambuzi wa kipimo kimoja: CKD huthibitishwa wakati utendaji uliopungua unadumu kwa angalau miezi mitatu. Matokeo ni kichocheo halisi cha kuangalia vizuri — angalia eGFR, angalia mwelekeo, na angalia mkojo kwa protini.',
        sw_mtaa: 'Creatinine iliyoinuka kawaida inamaanisha figo zinachuja kwa ufanisi mdogo zaidi kuliko inavyotarajiwa — lakini kiasi gani kidogo kinategemea umri, jinsia, na uzito wa misuli, ndio sababu hasa eGFR ni namba bora ya kuchukua hatua. Creatinine ile ile ya, tuseme, 150 inamaanisha kitu tofauti kabisa kwa kijana mwenye misuli mingi dhidi ya mwanamke mdogo mzee. Creatinine iliyoinuka inaweza kuonyesha figo sugu, kushuka kwa muda kutoka kwa upungufu wa maji au ugonjwa, au athari ya dawa fulani. Pia sio utambuzi wa kipimo kimoja: CKD inathibitishwa wakati utendaji uliopungua unadumu kwa angalau miezi mitatu. Matokeo ni kichocheo halisi cha kuangalia vizuri — angalia eGFR, angalia mwelekeo, na angalia mkojo kwa protini.',
      },
      nextSteps: {
        en: 'Bring this result to your clinician and ask to see it alongside the eGFR and a urine protein test. Useful steps: compare with any earlier results to see the trend, confirm whether this is stable or changing, and make sure blood pressure and (if diabetic) blood sugar are well controlled. Avoid NSAID painkillers and ask before any new medicine, herbal product, or supplement — several common drugs need a dose change when kidney function is reduced. Depending on the eGFR and urine result, your clinician will decide whether kidney-specialist referral is needed.',
        sw: 'Lete matokeo haya kwa daktari wako na uombe kuyaona pamoja na eGFR na kipimo cha protini ya mkojo. Hatua zinazosaidia: linganisha na matokeo yoyote ya awali kuona mwelekeo, thibitisha kama hii ni imara au inabadilika, na hakikisha shinikizo la damu na (ikiwa una kisukari) sukari ya damu vimedhibitiwa vizuri. Epuka dawa za maumivu za NSAID na uliza kabla ya dawa yoyote mpya, bidhaa ya mitishamba, au kirutubisho — dawa kadhaa za kawaida zinahitaji mabadiliko ya kipimo wakati utendaji wa figo umepungua. Kulingana na eGFR na matokeo ya mkojo, daktari wako ataamua kama rufaa kwa daktari bingwa wa figo inahitajika.',
        sw_mtaa: 'Lete matokeo haya kwa daktari wako na uombe kuyaona pamoja na eGFR na kipimo cha protini ya mkojo. Hatua zinazosaidia: linganisha na matokeo yoyote ya awali kuona mwelekeo, thibitisha kama hii ni imara au inabadilika, na hakikisha presha na (ikiwa una kisukari) sukari vimedhibitiwa vizuri. Epuka dawa za maumivu za NSAID na uliza kabla ya dawa yoyote mpya, bidhaa ya mitishamba, au kirutubisho — dawa kadhaa za kawaida zinahitaji mabadiliko ya kipimo wakati utendaji wa figo umepungua. Kulingana na eGFR na matokeo ya mkojo, daktari wako ataamua kama rufaa kwa daktari bingwa wa figo inahitajika.',
      },
      urgency: 'soon',
    };
  }

  // ── BORDERLINE — 100-119 µmol/L ───────────────────────────────────
  if (band === 'borderline') {
    return {
      value,
      band,
      context,
      headline: {
        en: `A creatinine of ${value} µmol/L is at the upper edge of the usual range — often nothing wrong, but a good moment to check the eGFR and kidney health.`,
        sw: `Creatinine ya ${value} µmol/L iko kwenye ukingo wa juu wa kiwango cha kawaida — mara nyingi hakuna tatizo, lakini ni wakati mzuri wa kuangalia eGFR na afya ya figo.`,
        sw_mtaa: `Creatinine ya ${value} µmol/L iko kwenye ukingo wa juu wa kiwango cha kawaida — mara nyingi hakuna tatizo, lakini ni wakati mzuri wa kuangalia eGFR na afya ya figo.`,
      },
      meaning: {
        en: 'A creatinine in this borderline range is very often completely normal — especially for men, younger people, and those with more muscle, where a slightly higher creatinine is simply expected. For a smaller, older, or low-muscle person the same value could carry a little more meaning. As always, the eGFR (which adjusts for age and sex) is the clearer guide, and a single value matters less than the trend over time. This is not a result to worry about on its own, but it is a sensible nudge to make sure kidney health is being looked after, especially if you have diabetes, high blood pressure, HIV, or a family history of kidney disease.',
        sw: 'Creatinine katika kiwango hiki cha ukingo mara nyingi ni ya kawaida kabisa — hasa kwa wanaume, watu wadogo kwa umri, na wenye misuli zaidi, ambapo creatinine ya juu kidogo inatarajiwa tu. Kwa mtu mdogo, mzee, au mwenye misuli kidogo thamani ile ile inaweza kubeba maana kidogo zaidi. Kama kawaida, eGFR (inayorekebisha umri na jinsia) ni mwongozo wazi zaidi, na thamani moja ina maana ndogo kuliko mwelekeo kwa muda. Hii sio matokeo ya kuwa na wasiwasi nayo peke yake, lakini ni kichocheo cha busara cha kuhakikisha afya ya figo inaangaliwa, hasa ikiwa una kisukari, shinikizo la damu kubwa, VVU, au historia ya familia ya ugonjwa wa figo.',
        sw_mtaa: 'Creatinine katika kiwango hiki cha ukingo mara nyingi ni ya kawaida kabisa — hasa kwa wanaume, watu wadogo kwa umri, na wenye misuli zaidi, ambapo creatinine ya juu kidogo inatarajiwa tu. Kwa mtu mdogo, mzee, au mwenye misuli kidogo thamani ile ile inaweza kubeba maana kidogo zaidi. Kama kawaida, eGFR (inayorekebisha umri na jinsia) ni mwongozo wazi zaidi, na thamani moja ina maana ndogo kuliko mwelekeo kwa muda. Hii sio matokeo ya kuwa na wasiwasi nayo peke yake, lakini ni kichocheo cha busara cha kuhakikisha afya ya figo inaangaliwa, hasa ikiwa una kisukari, presha kubwa, VVU, au historia ya familia ya ugonjwa wa figo.',
      },
      nextSteps: {
        en: 'No alarm needed — but bring the result to your clinician so it can be read alongside the eGFR and compared with any previous results. If you are at higher kidney risk (diabetes, high blood pressure, HIV, family history), periodic kidney checks are worthwhile. General kidney care helps everyone: stay well hydrated, keep salt moderate, use NSAID painkillers only sparingly, stay active, avoid smoking, and ask before taking new medicines or herbal products.',
        sw: 'Hakuna hofu inayohitajika — lakini lete matokeo kwa daktari wako ili yasomwe pamoja na eGFR na kulinganishwa na matokeo yoyote ya awali. Ikiwa uko katika hatari kubwa zaidi ya figo (kisukari, shinikizo la damu kubwa, VVU, historia ya familia), ukaguzi wa figo mara kwa mara una thamani. Huduma ya jumla ya figo husaidia kila mtu: kunywa maji ya kutosha, weka chumvi kwa wastani, tumia dawa za maumivu za NSAID kwa uchache tu, baki hai, epuka kuvuta sigara, na uliza kabla ya kuchukua dawa mpya au bidhaa za mitishamba.',
        sw_mtaa: 'Hakuna hofu inayohitajika — lakini lete matokeo kwa daktari wako ili yasomwe pamoja na eGFR na kulinganishwa na matokeo yoyote ya awali. Ikiwa uko katika hatari kubwa zaidi ya figo (kisukari, presha kubwa, VVU, historia ya familia), ukaguzi wa figo mara kwa mara una thamani. Huduma ya jumla ya figo inasaidia kila mtu: kunywa maji ya kutosha, weka chumvi kwa wastani, tumia dawa za maumivu za NSAID kwa uchache tu, baki hai, epuka kuvuta sigara, na uliza kabla ya kuchukua dawa mpya au bidhaa za mitishamba.',
      },
      urgency: 'routine',
    };
  }

  // ── NORMAL — < 100 µmol/L ─────────────────────────────────────────
  return {
    value,
    band,
    context,
    headline: {
      en: `A creatinine of ${value} µmol/L is within the broad normal range — the kidneys are clearing this waste product well.`,
      sw: `Creatinine ya ${value} µmol/L iko ndani ya kiwango kipana cha kawaida — figo zinaondoa taka hii vizuri.`,
      sw_mtaa: `Creatinine ya ${value} µmol/L iko ndani ya kiwango kipana cha kawaida — figo zinaondoa taka hii vizuri.`,
    },
    meaning: {
      en: 'A creatinine in the normal range generally means the kidneys are filtering this waste product effectively. One nuance worth knowing: because creatinine depends on muscle mass, a "normal" creatinine in a person with very low muscle — frail, elderly, or malnourished — can occasionally hide a genuine reduction in kidney function. That is why the eGFR, which adjusts for age and sex, is still the preferred number, and why people at higher risk also have a urine protein test. But for most people, a normal creatinine alongside a normal eGFR is reassuring: the kidneys are doing their filtering job.',
      sw: 'Creatinine katika kiwango cha kawaida kwa ujumla inamaanisha figo zinachuja taka hii kwa ufanisi. Jambo moja la kujua: kwa sababu creatinine hutegemea uzito wa misuli, creatinine ya "kawaida" kwa mtu mwenye misuli kidogo sana — dhaifu, mzee, au mwenye utapiamlo — inaweza wakati mwingine kuficha upungufu halisi wa utendaji wa figo. Ndio sababu eGFR, inayorekebisha umri na jinsia, bado ni namba inayopendelewa, na ndio sababu watu walio katika hatari kubwa zaidi pia hupata kipimo cha protini ya mkojo. Lakini kwa watu wengi, creatinine ya kawaida pamoja na eGFR ya kawaida ni ya kufariji: figo zinafanya kazi yao ya uchujaji.',
      sw_mtaa: 'Creatinine katika kiwango cha kawaida kwa ujumla inamaanisha figo zinachuja taka hii kwa ufanisi. Jambo moja la kujua: kwa sababu creatinine inategemea uzito wa misuli, creatinine ya "kawaida" kwa mtu mwenye misuli kidogo sana — dhaifu, mzee, au mwenye utapiamlo — inaweza wakati mwingine kuficha upungufu halisi wa utendaji wa figo. Ndio sababu eGFR, inayorekebisha umri na jinsia, bado ni namba inayopendelewa, na ndio sababu watu walio katika hatari kubwa zaidi pia wanapata kipimo cha protini ya mkojo. Lakini kwa watu wengi, creatinine ya kawaida pamoja na eGFR ya kawaida ni ya kufariji: figo zinafanya kazi yao ya uchujaji.',
    },
    nextSteps: {
      en: 'No specific action is needed — keep the result in your health records so the trend stays visible. To look after your kidneys: control blood pressure and blood sugar if those apply to you, stay well hydrated, keep salt moderate, stay active, avoid smoking, use NSAID painkillers only sparingly, and ask before taking new medicines, herbal products, or supplements. If you have diabetes, high blood pressure, HIV, or a family history of kidney disease, periodic creatinine/eGFR and urine protein checks are sensible.',
      sw: 'Hakuna hatua maalum inayohitajika — weka matokeo katika rekodi zako za afya ili mwelekeo ubaki ukionekana. Kutunza figo zako: dhibiti shinikizo la damu na sukari ya damu ikiwa hizo zinakuhusu, kunywa maji ya kutosha, weka chumvi kwa wastani, baki hai, epuka kuvuta sigara, tumia dawa za maumivu za NSAID kwa uchache tu, na uliza kabla ya kuchukua dawa mpya, bidhaa za mitishamba, au virutubisho. Ikiwa una kisukari, shinikizo la damu kubwa, VVU, au historia ya familia ya ugonjwa wa figo, ukaguzi wa creatinine/eGFR na protini ya mkojo mara kwa mara ni jambo la busara.',
      sw_mtaa: 'Hakuna hatua maalum inayohitajika — weka matokeo katika rekodi zako za afya ili mwelekeo ubaki ukionekana. Kutunza figo zako: dhibiti presha na sukari ikiwa hizo zinakuhusu, kunywa maji ya kutosha, weka chumvi kwa wastani, baki hai, epuka kuvuta sigara, tumia dawa za maumivu za NSAID kwa uchache tu, na uliza kabla ya kuchukua dawa mpya, bidhaa za mitishamba, au virutubisho. Ikiwa una kisukari, presha kubwa, VVU, au historia ya familia ya ugonjwa wa figo, ukaguzi wa creatinine/eGFR na protini ya mkojo mara kwa mara ni jambo la busara.',
    },
    urgency: 'routine',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE OBJECT
// ──────────────────────────────────────────────────────────────────────

export const CREATININE: LabKnowledge = {
  id: 'creatinine',
  aliases: LAB_ALIASES.creatinine,
  unit: 'µmol/L',
  alternateUnits: [{ unit: 'mg/dL', factor: 0.0113 }], // µmol/L × 0.0113 ≈ mg/dL (÷88.4)

  whatItMeasures: {
    en: 'Creatinine is a waste product made constantly by normal muscle activity. Healthy kidneys filter it out of the blood into the urine at a steady rate, so the amount left in the blood reflects how well the kidneys are filtering — when filtering falls, creatinine rises. It is the raw blood measurement from which eGFR is calculated. One important feature: because creatinine comes from muscle, the "normal" amount depends on a person\'s muscle mass — men tend to sit higher than women, and a very muscular person higher than a frail one. This is exactly why eGFR (which adjusts for age and sex) is the preferred number for staging kidney disease, and why creatinine is best read together with its eGFR rather than alone.',
    sw: 'Creatinine ni taka inayotengenezwa kila wakati na shughuli za kawaida za misuli. Figo zenye afya huichuja kutoka damuni kwenda kwenye mkojo kwa kiwango cha kudumu, hivyo kiasi kilichobaki damuni huonyesha jinsi figo zinavyochuja vizuri — uchujaji unaposhuka, creatinine hupanda. Ni kipimo cha damu cha msingi ambapo eGFR hukokotolewa. Kipengele kimoja muhimu: kwa sababu creatinine hutoka kwenye misuli, kiasi cha "kawaida" hutegemea uzito wa misuli wa mtu — wanaume huwa juu kuliko wanawake, na mtu mwenye misuli mingi juu kuliko dhaifu. Ndio sababu hasa eGFR (inayorekebisha umri na jinsia) ni namba inayopendelewa kupanga ugonjwa wa figo, na ndio sababu creatinine inasomwa vizuri pamoja na eGFR yake badala ya peke yake.',
    sw_mtaa: 'Creatinine ni taka inayotengenezwa kila wakati na shughuli za kawaida za misuli. Figo zenye afya zinaichuja kutoka damuni kwenda kwenye mkojo kwa kiwango cha kudumu, hivyo kiasi kilichobaki damuni kinaonyesha jinsi figo zinavyochuja vizuri — uchujaji unaposhuka, creatinine inapanda. Ni kipimo cha damu cha msingi ambapo eGFR inakokotolewa. Kipengele kimoja muhimu: kwa sababu creatinine inatoka kwenye misuli, kiasi cha "kawaida" kinategemea uzito wa misuli wa mtu — wanaume wako juu kuliko wanawake, na mtu mwenye misuli mingi juu kuliko dhaifu. Ndio sababu hasa eGFR (inayorekebisha umri na jinsia) ni namba inayopendelewa kupanga ugonjwa wa figo, na ndio sababu creatinine inasomwa vizuri pamoja na eGFR yake badala ya peke yake.',
  },

  whyItsOrdered: {
    en: 'Creatinine is ordered to assess kidney function — it is one of the most common blood tests in medicine. It is checked routinely in people with diabetes, high blood pressure, HIV, heart disease, or a family history of kidney disease; when someone is unwell in a way that could involve the kidneys; before and after certain scans and medicines; and to guide safe dosing, because a large number of common drugs need a lower dose, or must be avoided, when kidney function is reduced. The result is converted into an eGFR, which places kidney function on the KDIGO stage scale, and is almost always interpreted together with a urine test for protein. Because a single value can be misleading — affected by muscle mass, dehydration, acute illness, and recent diet — the trend across results is what matters most.',
    sw: 'Creatinine huombwa kutathmini utendaji wa figo — ni mojawapo ya vipimo vya damu vya kawaida zaidi katika tiba. Hukaguliwa kawaida kwa watu wenye kisukari, shinikizo la damu kubwa, VVU, ugonjwa wa moyo, au historia ya familia ya ugonjwa wa figo; wakati mtu si mzima kwa namna inayoweza kuhusisha figo; kabla na baada ya skani na dawa fulani; na kuongoza kipimo salama, kwa sababu idadi kubwa ya dawa za kawaida zinahitaji kipimo cha chini, au lazima ziepukwe, wakati utendaji wa figo umepungua. Matokeo hubadilishwa kuwa eGFR, inayoweka utendaji wa figo kwenye mizani ya hatua za KDIGO, na karibu daima hutafsiriwa pamoja na kipimo cha mkojo cha protini. Kwa sababu thamani moja inaweza kupotosha — huathiriwa na uzito wa misuli, upungufu wa maji, ugonjwa wa ghafla, na lishe ya hivi karibuni — mwelekeo katika matokeo ndio unaojali zaidi.',
    sw_mtaa: 'Creatinine inaombwa kutathmini utendaji wa figo — ni mojawapo ya vipimo vya damu vya kawaida zaidi katika tiba. Inakaguliwa kawaida kwa watu wenye kisukari, presha kubwa, VVU, ugonjwa wa moyo, au historia ya familia ya ugonjwa wa figo; wakati mtu si mzima kwa namna inayoweza kuhusisha figo; kabla na baada ya skani na dawa fulani; na kuongoza kipimo salama, kwa sababu dawa nyingi za kawaida zinahitaji kipimo cha chini, au lazima ziepukwe, wakati utendaji wa figo umepungua. Matokeo yanabadilishwa kuwa eGFR, inayoweka utendaji wa figo kwenye mizani ya hatua za KDIGO, na karibu daima yanatafsiriwa pamoja na kipimo cha mkojo cha protini. Kwa sababu thamani moja inaweza kupotosha — inaathiriwa na uzito wa misuli, upungufu wa maji, ugonjwa wa ghafla, na lishe ya hivi karibuni — mwelekeo katika matokeo ndio unaojali zaidi.',
  },

  ranges: [
    {
      applies: { sex: 'F', ageMin: 18 },
      normalLow: 50,
      normalHigh: 90,
    },
    {
      applies: { sex: 'M', ageMin: 18 },
      normalLow: 60,
      normalHigh: 110,
    },
    {
      applies: { sex: 'any', ageMin: 18 },
      normalLow: 50,
      normalHigh: 110,
    },
  ],

  interpretations: [
    {
      band: 'high',
      meaning: {
        en: 'Creatinine above the usual range — the kidneys may be filtering less effectively than expected. How much it matters depends on age, sex, and muscle mass, so it should be read through the eGFR and the trend over time. It can reflect chronic kidney disease, a temporary drop from dehydration or acute illness, or the effect of certain medicines.',
        sw: 'Creatinine juu ya kiwango cha kawaida — figo zinaweza kuwa zinachuja kwa ufanisi mdogo zaidi kuliko inavyotarajiwa. Kiasi gani inajali hutegemea umri, jinsia, na uzito wa misuli, hivyo inapaswa kusomwa kupitia eGFR na mwelekeo kwa muda. Inaweza kuonyesha ugonjwa wa figo sugu, kushuka kwa muda kutoka kwa upungufu wa maji au ugonjwa wa ghafla, au athari ya dawa fulani.',
        sw_mtaa: 'Creatinine juu ya kiwango cha kawaida — figo zinaweza kuwa zinachuja kwa ufanisi mdogo zaidi kuliko inavyotarajiwa. Kiasi gani inajali kinategemea umri, jinsia, na uzito wa misuli, hivyo inapaswa kusomwa kupitia eGFR na mwelekeo kwa muda. Inaweza kuonyesha figo sugu, kushuka kwa muda kutoka kwa upungufu wa maji au ugonjwa wa ghafla, au athari ya dawa fulani.',
      },
      nextSteps: {
        en: 'Bring the result to a clinician to read alongside the eGFR and a urine protein test, and compare with previous results for the trend. Make sure blood pressure and blood sugar are well controlled, avoid NSAID painkillers, and ask before any new medicine or herbal product. A markedly high creatinine, or any raised creatinine with feeling unwell, needs prompt or urgent assessment.',
        sw: 'Lete matokeo kwa daktari kuyasoma pamoja na eGFR na kipimo cha protini ya mkojo, na ulinganishe na matokeo ya awali kwa mwelekeo. Hakikisha shinikizo la damu na sukari ya damu vimedhibitiwa vizuri, epuka dawa za maumivu za NSAID, na uliza kabla ya dawa yoyote mpya au bidhaa ya mitishamba. Creatinine iliyoinuka sana, au creatinine yoyote iliyoinuka pamoja na kujisikia vibaya, inahitaji tathmini ya haraka au ya dharura.',
        sw_mtaa: 'Lete matokeo kwa daktari kuyasoma pamoja na eGFR na kipimo cha protini ya mkojo, na ulinganishe na matokeo ya awali kwa mwelekeo. Hakikisha presha na sukari vimedhibitiwa vizuri, epuka dawa za maumivu za NSAID, na uliza kabla ya dawa yoyote mpya au bidhaa ya mitishamba. Creatinine iliyoinuka sana, au creatinine yoyote iliyoinuka pamoja na kujisikia vibaya, inahitaji tathmini ya haraka au ya dharura.',
      },
      urgency: 'soon',
    },
    {
      band: 'normal',
      meaning: {
        en: 'Creatinine within the broad normal range — the kidneys are generally clearing this waste product well. Because creatinine depends on muscle mass, a normal value in a frail or low-muscle person is best confirmed with the eGFR, which adjusts for age and sex.',
        sw: 'Creatinine ndani ya kiwango kipana cha kawaida — figo kwa ujumla zinaondoa taka hii vizuri. Kwa sababu creatinine hutegemea uzito wa misuli, thamani ya kawaida kwa mtu dhaifu au mwenye misuli kidogo huthibitishwa vizuri zaidi kwa eGFR, inayorekebisha umri na jinsia.',
        sw_mtaa: 'Creatinine ndani ya kiwango kipana cha kawaida — figo kwa ujumla zinaondoa taka hii vizuri. Kwa sababu creatinine inategemea uzito wa misuli, thamani ya kawaida kwa mtu dhaifu au mwenye misuli kidogo inathibitishwa vizuri zaidi kwa eGFR, inayorekebisha umri na jinsia.',
      },
      nextSteps: {
        en: 'No specific action — keep the result in your records so the trend stays visible. General kidney care helps everyone: control blood pressure and blood sugar where relevant, stay hydrated, keep salt moderate, use NSAID painkillers sparingly, and ask before new medicines or herbal products. Higher-risk groups (diabetes, high blood pressure, HIV, family history) benefit from periodic creatinine/eGFR and urine protein checks.',
        sw: 'Hakuna hatua maalum — weka matokeo katika rekodi zako ili mwelekeo ubaki ukionekana. Huduma ya jumla ya figo husaidia kila mtu: dhibiti shinikizo la damu na sukari ya damu pale inapohusika, kunywa maji ya kutosha, weka chumvi kwa wastani, tumia dawa za maumivu za NSAID kwa uchache, na uliza kabla ya dawa mpya au bidhaa za mitishamba. Makundi ya hatari kubwa zaidi (kisukari, shinikizo la damu kubwa, VVU, historia ya familia) hufaidika na ukaguzi wa creatinine/eGFR na protini ya mkojo mara kwa mara.',
        sw_mtaa: 'Hakuna hatua maalum — weka matokeo katika rekodi zako ili mwelekeo ubaki ukionekana. Huduma ya jumla ya figo inasaidia kila mtu: dhibiti presha na sukari pale inapohusika, kunywa maji ya kutosha, weka chumvi kwa wastani, tumia dawa za maumivu za NSAID kwa uchache, na uliza kabla ya dawa mpya au bidhaa za mitishamba. Makundi ya hatari kubwa zaidi (kisukari, presha kubwa, VVU, historia ya familia) yanafaidika na ukaguzi wa creatinine/eGFR na protini ya mkojo mara kwa mara.',
      },
      urgency: 'routine',
    },
  ],

  sources: [
    src('KDIGO_CKD_2024'),
    src('NTLG_STG_2023'),
    src('WHO_KIDNEY_2022'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
