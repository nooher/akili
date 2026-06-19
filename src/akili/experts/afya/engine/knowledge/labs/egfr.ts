/**
 * eGFR (estimated Glomerular Filtration Rate) — Lab Knowledge & Interpretation
 *
 * Sources: KDIGO Clinical Practice Guideline for the Evaluation and Management
 *          of CKD 2024, NTLG STG 2023, WHO guidance on kidney health,
 *          Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * What eGFR measures: an estimate, calculated from a blood creatinine result
 * (plus age and sex), of how many millilitres of blood the kidneys filter
 * per minute — roughly, the percentage of normal kidney function remaining.
 *
 * KDIGO G-stages (the framing this file uses):
 *   - G1   : eGFR >=90    normal or high (CKD only if kidney damage markers present)
 *   - G2   : eGFR 60-89   mildly reduced (CKD only if damage markers present)
 *   - G3a  : eGFR 45-59   mild-to-moderate reduction
 *   - G3b  : eGFR 30-44   moderate-to-severe reduction
 *   - G4   : eGFR 15-29   severely reduced — prepare for kidney replacement
 *   - G5   : eGFR <15     kidney failure — dialysis or transplant territory
 *
 * IMPORTANT — eGFR runs OPPOSITE to most labs: a LOWER number is WORSE.
 * The LabKnowledge `interpretations` bands are mapped accordingly:
 *   critical_low = G5 (<15), low = G4 (15-29), normal-ish = G3 (30-59),
 *   high = G1-G2 (>=60, the healthiest band here).
 *
 * Two critical interpretation caveats, both handled in interpretEgfr():
 *   1. A SINGLE low eGFR is not CKD. CKD requires the reduction to persist
 *      >=3 months. One low value can be acute kidney injury (AKI) — which is
 *      often reversible and is a different, sometimes emergency, situation.
 *   2. eGFR is least reliable when kidney function is changing fast, at
 *      extremes of body size/muscle mass, in pregnancy, and soon after very
 *      high-protein meals or heavy exercise. The trend matters more than one
 *      value.
 *
 * Context-awareness: the same eGFR means different things as a first-ever
 * result, on monitoring of known CKD, or when someone is acutely unwell —
 * so interpretEgfr(value, context) branches.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type EgfrContext =
  | 'first_result'       // first-ever / one-off eGFR — CKD not yet established
  | 'known_ckd'          // monitoring a person already diagnosed with CKD
  | 'unwell'             // person is acutely unwell — AKI must be considered
  | 'unknown';

export type EgfrBand =
  | 'failure'            // G5  : <15  — kidney failure
  | 'severe'             // G4  : 15-29 — severely reduced
  | 'moderate'           // G3  : 30-59 — moderate reduction
  | 'mild'               // G2  : 60-89 — mildly reduced
  | 'normal';            // G1  : >=90  — normal or high

export interface EgfrInterpretation {
  value: number;
  band: EgfrBand;
  stageLabel: string;    // e.g. "G3a", "G5"
  context: EgfrContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

export function bandForEgfr(value: number): EgfrBand {
  if (value < 15) return 'failure';
  if (value < 30) return 'severe';
  if (value < 60) return 'moderate';
  if (value < 90) return 'mild';
  return 'normal';
}

/** Fine-grained KDIGO stage label (G3 splits into G3a/G3b). */
export function stageLabelForEgfr(value: number): string {
  if (value < 15) return 'G5';
  if (value < 30) return 'G4';
  if (value < 45) return 'G3b';
  if (value < 60) return 'G3a';
  if (value < 90) return 'G2';
  return 'G1';
}

export function interpretEgfr(
  value: number,
  context: EgfrContext = 'unknown',
): EgfrInterpretation {
  const band = bandForEgfr(value);
  const stageLabel = stageLabelForEgfr(value);

  // ── G5: KIDNEY FAILURE — eGFR < 15 ────────────────────────────────
  if (band === 'failure') {
    const base = {
      value,
      band,
      stageLabel,
      context,
    };
    if (context === 'unwell') {
      return {
        ...base,
        headline: {
          en: `An eGFR of ${value} in someone who is unwell needs urgent medical assessment — it could be kidney failure, or sudden (acute) kidney injury that may be reversible.`,
          sw: `eGFR ya ${value} kwa mtu asiye mzima inahitaji tathmini ya haraka ya kimatibabu — inaweza kuwa figo kushindwa kabisa, au jeraha la ghafla la figo ambalo linaweza kurekebishika.`,
          sw_mtaa: `eGFR ya ${value} kwa mtu asiye mzima inahitaji tathmini ya haraka ya daktari — inaweza kuwa figo kushindwa kabisa, au jeraha la ghafla la figo ambalo linaweza kurekebishika.`,
        },
        meaning: {
          en: 'An eGFR below 15 means the kidneys are filtering at less than about 15% of normal. When this appears in someone who is acutely unwell — vomiting, not passing much urine, very dehydrated, septic, or recently on certain medicines — it may not be long-standing CKD at all but acute kidney injury (AKI): a sudden drop that can sometimes be reversed if the cause is treated quickly. It can also be chronic kidney disease reaching its final stage. The two are managed very differently, and only a clinician with the full picture — examination, urine output, the trend of recent results, and other tests — can tell them apart. Either way, this number plus feeling unwell is not something to manage at home.',
          sw: 'eGFR chini ya 15 inamaanisha figo zinachuja kwa chini ya takriban asilimia 15 ya kawaida. Inapotokea kwa mtu asiye mzima — anatapika, hatoi mkojo mwingi, amepungukiwa maji sana, ana sepsis, au ametumia dawa fulani hivi karibuni — inaweza isiwe CKD ya muda mrefu kabisa bali jeraha la ghafla la figo (AKI): kushuka kwa ghafla kunakoweza kurekebishika ikiwa chanzo kinatibiwa haraka. Inaweza pia kuwa ugonjwa wa figo sugu unaofikia hatua yake ya mwisho. Hizi mbili husimamiwa kwa namna tofauti sana, na ni daktari pekee mwenye picha kamili — uchunguzi, kiasi cha mkojo, mwelekeo wa matokeo ya hivi karibuni, na vipimo vingine — anaweza kuzitofautisha. Vyovyote vile, namba hii pamoja na kujisikia vibaya sio jambo la kusimamia nyumbani.',
          sw_mtaa: 'eGFR chini ya 15 inamaanisha figo zinachuja kwa chini ya takriban asilimia 15 ya kawaida. Inapotokea kwa mtu asiye mzima — anatapika, hatoi mkojo mwingi, amepungukiwa maji sana, ana sepsis, au ametumia dawa fulani karibuni — inaweza isiwe CKD ya muda mrefu kabisa bali AKI (jeraha la ghafla la figo): kushuka kwa ghafla kunakoweza kurekebishika ikiwa chanzo kinatibiwa haraka. Inaweza pia kuwa figo sugu inafikia hatua ya mwisho. Hizi mbili zinasimamiwa kwa namna tofauti sana, na ni daktari pekee mwenye picha kamili anaweza kuzitofautisha. Vyovyote vile, namba hii pamoja na kujisikia vibaya sio jambo la kusimamia nyumbani.',
        },
        nextSteps: {
          en: 'Go to a health facility now. Bring any previous kidney results and a list of all medicines and supplements you take, including anything bought over the counter or any herbal remedies. Warning signs that mean emergency care cannot wait: passing very little or no urine, severe breathlessness, swelling of the face or legs with difficulty breathing, confusion or drowsiness, chest pain, or vomiting that stops you keeping fluids down.',
          sw: 'Nenda kituo cha afya sasa. Lete matokeo yoyote ya awali ya figo na orodha ya dawa zote na virutubisho unavyotumia, ikiwa ni pamoja na chochote kilichonunuliwa bila cheti au dawa zozote za mitishamba. Ishara za onyo zinazomaanisha huduma ya dharura haiwezi kusubiri: kutoa mkojo kidogo sana au kutotoa kabisa, kushindwa kupumua kwa kiasi kikubwa, uvimbe wa uso au miguu pamoja na ugumu wa kupumua, kuchanganyikiwa au usingizi mzito, maumivu ya kifua, au kutapika kunakokuzuia kushikilia maji.',
          sw_mtaa: 'Nenda kituo cha afya sasa. Lete matokeo yoyote ya awali ya figo na orodha ya dawa zote na virutubisho unavyotumia, ikiwa ni pamoja na chochote ulichonunua bila cheti au dawa za mitishamba. Ishara za onyo zinazomaanisha huduma ya dharura haiwezi kusubiri: kutoa mkojo kidogo sana au kutotoa kabisa, kushindwa kupumua sana, uvimbe wa uso au miguu pamoja na ugumu wa kupumua, kuchanganyikiwa au usingizi mzito, maumivu ya kifua, au kutapika kunakokuzuia kushikilia maji.',
        },
        urgency: 'emergency',
      };
    }
    // first_result / known_ckd / unknown
    return {
      ...base,
      headline: {
        en: `An eGFR of ${value} is in the kidney-failure range (KDIGO stage G5). This needs specialist kidney care — but it is a recognised, manageable stage with a clear path.`,
        sw: `eGFR ya ${value} iko katika kiwango cha figo kushindwa (hatua ya KDIGO G5). Hii inahitaji huduma maalum ya figo — lakini ni hatua inayotambulika, inayoweza kusimamiwa yenye njia wazi.`,
        sw_mtaa: `eGFR ya ${value} iko katika kiwango cha figo kushindwa (hatua ya KDIGO G5). Hii inahitaji huduma maalum ya figo — lakini ni hatua inayotambulika, inayoweza kusimamiwa yenye njia wazi.`,
      },
      meaning: {
        en: 'An eGFR below 15 means the kidneys are working at less than about 15% of normal — KDIGO stage G5, also called kidney failure or end-stage kidney disease. At this level the kidneys can no longer reliably keep the blood clean and balanced on their own, and waste products, fluid, salts, and acid begin to build up. This is the stage where kidney replacement therapy — dialysis or, for some people, a kidney transplant — comes into the picture, alongside a careful "conservative care" path for those for whom dialysis is not the right choice. Reaching G5 is serious, but it is a defined, well-mapped stage: nephrology teams in Tanzania manage it every day, and planning ahead makes a large difference to how well a person does.',
        sw: 'eGFR chini ya 15 inamaanisha figo zinafanya kazi kwa chini ya takriban asilimia 15 ya kawaida — hatua ya KDIGO G5, pia inaitwa figo kushindwa au ugonjwa wa figo wa hatua ya mwisho. Katika kiwango hiki figo haziwezi tena kuiweka damu safi na yenye uwiano peke yao kwa uhakika, na taka, maji, chumvi, na asidi huanza kujilundika. Hii ni hatua ambapo tiba mbadala ya figo — dialysis au, kwa baadhi ya watu, upandikizaji wa figo — huingia katika picha, pamoja na njia ya makini ya "huduma ya kihafidhina" kwa wale ambao dialysis sio chaguo sahihi kwao. Kufikia G5 ni jambo zito, lakini ni hatua iliyofafanuliwa, iliyochorwa vizuri: timu za figo Tanzania huisimamia kila siku, na kupanga mapema kunaleta tofauti kubwa kwa jinsi mtu anavyofanya.',
        sw_mtaa: 'eGFR chini ya 15 inamaanisha figo zinafanya kazi kwa chini ya takriban asilimia 15 ya kawaida — hatua ya KDIGO G5, pia inaitwa figo kushindwa au ugonjwa wa figo wa hatua ya mwisho. Katika kiwango hiki figo haziwezi tena kuiweka damu safi na yenye uwiano peke yao kwa uhakika, na taka, maji, chumvi, na asidi vinaanza kujilundika. Hii ni hatua ambapo tiba mbadala ya figo — dialysis au, kwa baadhi ya watu, upandikizaji wa figo — inaingia katika picha, pamoja na njia ya makini ya "conservative care" kwa wale ambao dialysis sio chaguo sahihi kwao. Kufikia G5 ni jambo zito, lakini ni hatua iliyofafanuliwa vizuri: timu za figo Tanzania zinaisimamia kila siku, na kupanga mapema kunaleta tofauti kubwa.',
      },
      nextSteps: {
        en: 'This result should be discussed with a kidney specialist (nephrologist) without delay if you are not already under one. The conversation usually covers: confirming the result and the trend, planning for kidney replacement therapy or conservative care, managing the complications that come with G5 (anaemia, bone and mineral changes, fluid and salt balance, blood pressure, acid build-up), reviewing every medicine for dose adjustment, and vaccination. Bring all previous results and your full medicine list. Seek urgent care if you develop breathlessness, very low urine output, severe swelling, confusion, or chest pain.',
        sw: 'Matokeo haya yanapaswa kujadiliwa na daktari bingwa wa figo (nephrologist) bila kuchelewa ikiwa hauko tayari chini ya mmoja. Mazungumzo kawaida hujumuisha: kuthibitisha matokeo na mwelekeo, kupanga kwa tiba mbadala ya figo au huduma ya kihafidhina, kusimamia matatizo yanayokuja na G5 (upungufu wa damu, mabadiliko ya mifupa na madini, uwiano wa maji na chumvi, shinikizo la damu, kujilundika kwa asidi), kupitia kila dawa kwa marekebisho ya kipimo, na chanjo. Lete matokeo yote ya awali na orodha kamili ya dawa zako. Tafuta huduma ya haraka ukipata kushindwa kupumua, mkojo mdogo sana, uvimbe mkubwa, kuchanganyikiwa, au maumivu ya kifua.',
        sw_mtaa: 'Matokeo haya yanapaswa kujadiliwa na daktari bingwa wa figo (nephrologist) bila kuchelewa ikiwa hauko chini ya mmoja. Mazungumzo kawaida yanajumuisha: kuthibitisha matokeo na mwelekeo, kupanga kwa tiba mbadala ya figo au conservative care, kusimamia matatizo yanayokuja na G5 (upungufu wa damu, mabadiliko ya mifupa na madini, uwiano wa maji na chumvi, presha, kujilundika kwa asidi), kupitia kila dawa kwa marekebisho ya kipimo, na chanjo. Lete matokeo yote ya awali na orodha kamili ya dawa zako. Tafuta huduma ya haraka ukipata kushindwa kupumua, mkojo mdogo sana, uvimbe mkubwa, kuchanganyikiwa, au maumivu ya kifua.',
      },
      urgency: 'urgent',
    };
  }

  // ── G4: SEVERELY REDUCED — eGFR 15-29 ─────────────────────────────
  if (band === 'severe') {
    return {
      value,
      band,
      stageLabel,
      context,
      headline: {
        en: `An eGFR of ${value} means severely reduced kidney function (KDIGO stage G4) — the stage to actively prepare for what comes next, guided by a kidney specialist.`,
        sw: `eGFR ya ${value} inamaanisha utendaji wa figo uliopungua sana (hatua ya KDIGO G4) — hatua ya kujiandaa kikamilifu kwa kinachofuata, ukiongozwa na daktari bingwa wa figo.`,
        sw_mtaa: `eGFR ya ${value} inamaanisha utendaji wa figo uliopungua sana (hatua ya KDIGO G4) — hatua ya kujiandaa kikamilifu kwa kinachofuata, ukiongozwa na daktari bingwa wa figo.`,
      },
      meaning: {
        en: 'An eGFR between 15 and 29 is KDIGO stage G4 — the kidneys are working at roughly 15-29% of normal. Many people at this stage still feel reasonably well, which is exactly why the number matters: it gives a window to plan. G4 is the "prepare" stage. Slowing further decline is still very worthwhile — good blood pressure control, kidney-protective medicines where appropriate, blood sugar control if diabetic, and avoiding things that harm the kidneys can all change the trajectory. At the same time, the kidney team starts preparing for the possibility of kidney replacement therapy later: explaining the options, and for some, early planning such as protecting the blood vessels in one arm. Complications also need watching now — anaemia, bone and mineral balance, and acid build-up.',
        sw: 'eGFR kati ya 15 na 29 ni hatua ya KDIGO G4 — figo zinafanya kazi kwa takriban asilimia 15-29 ya kawaida. Watu wengi katika hatua hii bado hujisikia vizuri kiasi, ndio sababu hasa namba ni muhimu: inatoa dirisha la kupanga. G4 ni hatua ya "kujiandaa". Kupunguza kushuka zaidi bado kuna thamani kubwa — udhibiti mzuri wa shinikizo la damu, dawa zinazolinda figo pale zinapofaa, udhibiti wa sukari ya damu ikiwa una kisukari, na kuepuka vitu vinavyodhuru figo vyote vinaweza kubadilisha mwenendo. Wakati huo huo, timu ya figo huanza kujiandaa kwa uwezekano wa tiba mbadala ya figo baadaye: kueleza chaguzi, na kwa baadhi, kupanga mapema kama kulinda mishipa ya damu katika mkono mmoja. Matatizo pia yanahitaji kuangaliwa sasa — upungufu wa damu, uwiano wa mifupa na madini, na kujilundika kwa asidi.',
        sw_mtaa: 'eGFR kati ya 15 na 29 ni hatua ya KDIGO G4 — figo zinafanya kazi kwa takriban asilimia 15-29 ya kawaida. Watu wengi katika hatua hii bado wanajisikia vizuri kiasi, ndio sababu hasa namba ni muhimu: inatoa dirisha la kupanga. G4 ni hatua ya "kujiandaa". Kupunguza kushuka zaidi bado kuna thamani kubwa — udhibiti mzuri wa presha, dawa zinazolinda figo pale zinapofaa, udhibiti wa sukari ikiwa una kisukari, na kuepuka vitu vinavyodhuru figo vyote vinaweza kubadilisha mwenendo. Wakati huo huo, timu ya figo inaanza kujiandaa kwa uwezekano wa tiba mbadala ya figo baadaye: kueleza chaguzi, na kwa baadhi, kupanga mapema kama kulinda mishipa ya damu katika mkono mmoja. Matatizo pia yanahitaji kuangaliwa sasa — upungufu wa damu, uwiano wa mifupa na madini, na kujilundika kwa asidi.',
      },
      nextSteps: {
        en: 'You should be under the care of a kidney specialist (nephrologist) at this stage. Keep every appointment — monitoring is closer here. Key things to discuss and act on: tight blood pressure and (if diabetic) blood sugar control, whether a kidney-protective medicine is right for you, a full review of all your medicines and supplements for kidney safety and dose, screening for and treating anaemia and bone-mineral problems, diet guidance from a clinician or dietitian, vaccinations, and an early, unhurried conversation about kidney replacement options. Avoid NSAID painkillers (like ibuprofen, diclofenac) and check before taking any new medicine, herbal product, or supplement.',
        sw: 'Unapaswa kuwa chini ya uangalizi wa daktari bingwa wa figo (nephrologist) katika hatua hii. Hudhuria kila miadi — ufuatiliaji uko karibu zaidi hapa. Mambo muhimu ya kujadili na kuchukua hatua: udhibiti mkali wa shinikizo la damu na (ikiwa una kisukari) sukari ya damu, kama dawa inayolinda figo inakufaa, mapitio kamili ya dawa zako zote na virutubisho kwa usalama wa figo na kipimo, uchunguzi na matibabu ya upungufu wa damu na matatizo ya mifupa-madini, mwongozo wa lishe kutoka kwa daktari au mtaalamu wa lishe, chanjo, na mazungumzo ya mapema, yasiyo na haraka kuhusu chaguzi za tiba mbadala ya figo. Epuka dawa za maumivu za NSAID (kama ibuprofen, diclofenac) na angalia kabla ya kuchukua dawa yoyote mpya, bidhaa ya mitishamba, au kirutubisho.',
        sw_mtaa: 'Unapaswa kuwa chini ya uangalizi wa daktari bingwa wa figo (nephrologist) katika hatua hii. Hudhuria kila miadi — ufuatiliaji uko karibu zaidi hapa. Mambo muhimu ya kujadili na kuchukua hatua: udhibiti mkali wa presha na (ikiwa una kisukari) sukari, kama dawa inayolinda figo inakufaa, mapitio kamili ya dawa zako zote na virutubisho kwa usalama wa figo na kipimo, uchunguzi na matibabu ya upungufu wa damu na matatizo ya mifupa-madini, mwongozo wa lishe kutoka kwa daktari au mtaalamu wa lishe, chanjo, na mazungumzo ya mapema yasiyo na haraka kuhusu chaguzi za tiba mbadala ya figo. Epuka dawa za maumivu za NSAID (kama ibuprofen, diclofenac) na angalia kabla ya kuchukua dawa yoyote mpya, bidhaa ya mitishamba, au kirutubisho.',
      },
      urgency: 'soon',
    };
  }

  // ── G3: MODERATE REDUCTION — eGFR 30-59 ───────────────────────────
  if (band === 'moderate') {
    const isG3b = value < 45;
    return {
      value,
      band,
      stageLabel,
      context,
      headline: {
        en: `An eGFR of ${value} means moderately reduced kidney function (KDIGO stage ${stageLabel}) — the "act now" stage, where good management can meaningfully slow further decline.`,
        sw: `eGFR ya ${value} inamaanisha utendaji wa figo uliopungua kwa wastani (hatua ya KDIGO ${stageLabel}) — hatua ya "chukua hatua sasa", ambapo usimamizi mzuri unaweza kupunguza kushuka zaidi kwa kiasi kikubwa.`,
        sw_mtaa: `eGFR ya ${value} inamaanisha utendaji wa figo uliopungua kwa wastani (hatua ya KDIGO ${stageLabel}) — hatua ya "chukua hatua sasa", ambapo usimamizi mzuri unaweza kupunguza kushuka zaidi kwa kiasi kikubwa.`,
      },
      meaning: {
        en: `An eGFR between 30 and 59 is KDIGO stage G3 — the kidneys are filtering at roughly 30-59% of normal. ${isG3b ? 'At G3b (30-44) the reduction is moderate-to-severe and monitoring becomes closer.' : 'At G3a (45-59) the reduction is mild-to-moderate.'} This is often the stage where CKD is first picked up, frequently on a routine test in someone with diabetes or high blood pressure, because earlier stages are usually silent. G3 is the crucial "act now" window: the kidney function lost so far does not usually come back, but the speed of further decline is very much influenceable. Many people stay stable in this range for years with good management. It is also the stage where CKD's own complications — anaemia, bone-mineral changes, raised potassium, acid build-up — start to need watching.`,
        sw: `eGFR kati ya 30 na 59 ni hatua ya KDIGO G3 — figo zinachuja kwa takriban asilimia 30-59 ya kawaida. ${isG3b ? 'Katika G3b (30-44) upungufu ni wa wastani-hadi-mkubwa na ufuatiliaji unakuwa karibu zaidi.' : 'Katika G3a (45-59) upungufu ni mdogo-hadi-wastani.'} Hii mara nyingi ni hatua ambapo CKD hugunduliwa kwa mara ya kwanza, mara kwa mara kwenye kipimo cha kawaida kwa mtu mwenye kisukari au shinikizo la damu, kwa sababu hatua za awali kawaida ni kimya. G3 ni dirisha muhimu la "chukua hatua sasa": utendaji wa figo uliopotea hadi sasa kawaida haurudi, lakini kasi ya kushuka zaidi inaweza kuathiriwa sana. Watu wengi hubaki imara katika kiwango hiki kwa miaka kwa usimamizi mzuri. Pia ni hatua ambapo matatizo ya CKD yenyewe — upungufu wa damu, mabadiliko ya mifupa-madini, potasiamu iliyoinuka, kujilundika kwa asidi — huanza kuhitaji kuangaliwa.`,
        sw_mtaa: `eGFR kati ya 30 na 59 ni hatua ya KDIGO G3 — figo zinachuja kwa takriban asilimia 30-59 ya kawaida. ${isG3b ? 'Katika G3b (30-44) upungufu ni wa wastani-hadi-mkubwa na ufuatiliaji unakuwa karibu zaidi.' : 'Katika G3a (45-59) upungufu ni mdogo-hadi-wastani.'} Hii mara nyingi ni hatua ambapo CKD inagunduliwa kwa mara ya kwanza, mara kwa mara kwenye kipimo cha kawaida kwa mtu mwenye kisukari au presha, kwa sababu hatua za awali kawaida ni kimya. G3 ni dirisha muhimu la "chukua hatua sasa": utendaji wa figo uliopotea hadi sasa kawaida haurudi, lakini kasi ya kushuka zaidi inaweza kuathiriwa sana. Watu wengi wanabaki imara katika kiwango hiki kwa miaka kwa usimamizi mzuri. Pia ni hatua ambapo matatizo ya CKD yenyewe — upungufu wa damu, mabadiliko ya mifupa-madini, potasiamu iliyoinuka, kujilundika kwa asidi — yanaanza kuhitaji kuangaliwa.`,
      },
      nextSteps: {
        en: 'This result should be confirmed and followed up — a single eGFR is a snapshot, and CKD is diagnosed when the reduction persists over at least 3 months, alongside a urine test for protein. Bring it to your clinician and discuss: confirming the result and trend, a urine protein (ACR) test, tight blood pressure and blood sugar control, whether a kidney-protective medicine is appropriate, a review of all your medicines for kidney safety, and lifestyle steps that protect the kidneys. Avoid NSAID painkillers and always ask before starting any new medicine, herbal remedy, or supplement. Referral to a kidney specialist is considered especially at G3b or if protein is present in the urine.',
        sw: 'Matokeo haya yanapaswa kuthibitishwa na kufuatiliwa — eGFR moja ni picha ya papo hapo, na CKD hugunduliwa wakati upungufu unadumu kwa angalau miezi 3, pamoja na kipimo cha mkojo cha protini. Lete kwa daktari wako na ujadili: kuthibitisha matokeo na mwelekeo, kipimo cha protini ya mkojo (ACR), udhibiti mkali wa shinikizo la damu na sukari ya damu, kama dawa inayolinda figo inafaa, mapitio ya dawa zako zote kwa usalama wa figo, na hatua za maisha zinazolinda figo. Epuka dawa za maumivu za NSAID na daima uliza kabla ya kuanza dawa yoyote mpya, dawa ya mitishamba, au kirutubisho. Rufaa kwa daktari bingwa wa figo huzingatiwa hasa katika G3b au ikiwa protini ipo katika mkojo.',
        sw_mtaa: 'Matokeo haya yanapaswa kuthibitishwa na kufuatiliwa — eGFR moja ni picha ya papo hapo, na CKD inagunduliwa wakati upungufu unadumu kwa angalau miezi 3, pamoja na kipimo cha mkojo cha protini. Lete kwa daktari wako na ujadili: kuthibitisha matokeo na mwelekeo, kipimo cha protini ya mkojo (ACR), udhibiti mkali wa presha na sukari, kama dawa inayolinda figo inafaa, mapitio ya dawa zako zote kwa usalama wa figo, na hatua za maisha zinazolinda figo. Epuka dawa za maumivu za NSAID na daima uliza kabla ya kuanza dawa yoyote mpya, dawa ya mitishamba, au kirutubisho. Rufaa kwa daktari bingwa wa figo inazingatiwa hasa katika G3b au ikiwa protini ipo katika mkojo.',
      },
      urgency: 'soon',
    };
  }

  // ── G2: MILDLY REDUCED — eGFR 60-89 ───────────────────────────────
  if (band === 'mild') {
    return {
      value,
      band,
      stageLabel,
      context,
      headline: {
        en: `An eGFR of ${value} is only mildly below the typical range — on its own this is often not CKD, but it is a useful prompt to check kidney health and protect it.`,
        sw: `eGFR ya ${value} iko chini kidogo tu ya kiwango cha kawaida — peke yake hii mara nyingi sio CKD, lakini ni kichocheo muhimu cha kuangalia afya ya figo na kuilinda.`,
        sw_mtaa: `eGFR ya ${value} iko chini kidogo tu ya kiwango cha kawaida — peke yake hii mara nyingi sio CKD, lakini ni kichocheo muhimu cha kuangalia afya ya figo na kuilinda.`,
      },
      meaning: {
        en: 'An eGFR between 60 and 89 is labelled KDIGO stage G2 — but this is an important point: a mildly reduced eGFR is NOT chronic kidney disease by itself. It only counts as CKD if there is also evidence of kidney damage — most often protein or blood in the urine, or an abnormality on a scan — and the situation has persisted for at least 3 months. eGFR also naturally drifts down a little with age. So a value in this range can be completely normal for the person, OR it can be early CKD. The way to tell them apart is a urine test for protein and a look at the trend over time. Either way, this is a good moment to make sure blood pressure and (if relevant) blood sugar are well controlled, because those are what most often damage kidneys over years.',
        sw: 'eGFR kati ya 60 na 89 huitwa hatua ya KDIGO G2 — lakini hii ni pointi muhimu: eGFR iliyopungua kidogo SIO ugonjwa wa figo sugu peke yake. Huhesabika kama CKD tu ikiwa pia kuna ushahidi wa uharibifu wa figo — mara nyingi protini au damu katika mkojo, au kasoro kwenye picha ya skani — na hali imedumu kwa angalau miezi 3. eGFR pia hupungua kidogo kiasili na umri. Hivyo thamani katika kiwango hiki inaweza kuwa ya kawaida kabisa kwa mtu, AU inaweza kuwa CKD ya mapema. Njia ya kuzitofautisha ni kipimo cha mkojo cha protini na kuangalia mwelekeo kwa muda. Vyovyote vile, huu ni wakati mzuri wa kuhakikisha shinikizo la damu na (ikiwa inahusika) sukari ya damu vimedhibitiwa vizuri, kwa sababu hivyo ndivyo vinavyoharibu figo zaidi kwa miaka.',
        sw_mtaa: 'eGFR kati ya 60 na 89 inaitwa hatua ya KDIGO G2 — lakini hii ni pointi muhimu: eGFR iliyopungua kidogo SIO ugonjwa wa figo sugu peke yake. Inahesabika kama CKD tu ikiwa pia kuna ushahidi wa uharibifu wa figo — mara nyingi protini au damu katika mkojo, au kasoro kwenye skani — na hali imedumu kwa angalau miezi 3. eGFR pia inapungua kidogo kiasili na umri. Hivyo thamani katika kiwango hiki inaweza kuwa ya kawaida kabisa kwa mtu, AU inaweza kuwa CKD ya mapema. Njia ya kuzitofautisha ni kipimo cha mkojo cha protini na kuangalia mwelekeo kwa muda. Vyovyote vile, huu ni wakati mzuri wa kuhakikisha presha na (ikiwa inahusika) sukari vimedhibitiwa vizuri, kwa sababu hivyo ndivyo vinavyoharibu figo zaidi kwa miaka.',
      },
      nextSteps: {
        en: 'Bring this result to your clinician so it can be put in context. Helpful next steps usually include: a urine test for protein (ACR), checking whether there is a trend by comparing with any earlier results, and making sure blood pressure and blood sugar are well controlled. If you have diabetes, high blood pressure, a family history of kidney disease, HIV, or take medicines that affect the kidneys, regular kidney checks are worthwhile. Protect your kidneys: stay well hydrated, keep salt moderate, avoid routine NSAID painkillers, and ask before taking new medicines or herbal products.',
        sw: 'Lete matokeo haya kwa daktari wako ili yawekwe katika muktadha. Hatua zinazosaidia zinazofuata kawaida hujumuisha: kipimo cha mkojo cha protini (ACR), kuangalia kama kuna mwelekeo kwa kulinganisha na matokeo yoyote ya awali, na kuhakikisha shinikizo la damu na sukari ya damu vimedhibitiwa vizuri. Ikiwa una kisukari, shinikizo la damu kubwa, historia ya familia ya ugonjwa wa figo, VVU, au unatumia dawa zinazoathiri figo, ukaguzi wa figo wa kawaida una thamani. Linda figo zako: kunywa maji ya kutosha, weka chumvi kwa wastani, epuka dawa za maumivu za NSAID za kawaida, na uliza kabla ya kuchukua dawa mpya au bidhaa za mitishamba.',
        sw_mtaa: 'Lete matokeo haya kwa daktari wako ili yawekwe katika muktadha. Hatua zinazosaidia zinazofuata kawaida zinajumuisha: kipimo cha mkojo cha protini (ACR), kuangalia kama kuna mwelekeo kwa kulinganisha na matokeo yoyote ya awali, na kuhakikisha presha na sukari vimedhibitiwa vizuri. Ikiwa una kisukari, presha kubwa, historia ya familia ya ugonjwa wa figo, VVU, au unatumia dawa zinazoathiri figo, ukaguzi wa figo wa kawaida una thamani. Linda figo zako: kunywa maji ya kutosha, weka chumvi kwa wastani, epuka dawa za maumivu za NSAID za kawaida, na uliza kabla ya kuchukua dawa mpya au bidhaa za mitishamba.',
      },
      urgency: 'routine',
    };
  }

  // ── G1: NORMAL OR HIGH — eGFR >= 90 ───────────────────────────────
  return {
    value,
    band,
    stageLabel,
    context,
    headline: {
      en: `An eGFR of ${value} is in the normal range — the kidneys are filtering well. The healthy goal is to keep it that way.`,
      sw: `eGFR ya ${value} iko katika kiwango cha kawaida — figo zinachuja vizuri. Lengo lenye afya ni kuiweka hivyo.`,
      sw_mtaa: `eGFR ya ${value} iko katika kiwango cha kawaida — figo zinachuja vizuri. Lengo lenye afya ni kuiweka hivyo.`,
    },
    meaning: {
      en: 'An eGFR of 90 or above means the kidneys are filtering blood at a normal rate. One important note: a normal eGFR does not by itself completely rule out early kidney disease — in the earliest stages, the filtering rate can still be normal while damage shows up only as protein in the urine. That is why, in people at higher risk (diabetes, high blood pressure, HIV, family history), a urine protein test is checked alongside eGFR. But for most people, a normal eGFR is reassuring: the kidneys are doing their job of cleaning the blood, balancing salts and fluid, supporting bone health, and helping make red blood cells.',
      sw: 'eGFR ya 90 au zaidi inamaanisha figo zinachuja damu kwa kiwango cha kawaida. Dokezo moja muhimu: eGFR ya kawaida peke yake haiondoi kabisa ugonjwa wa figo wa mapema — katika hatua za mwanzo kabisa, kiwango cha uchujaji kinaweza bado kuwa cha kawaida wakati uharibifu unajitokeza tu kama protini katika mkojo. Ndio sababu, kwa watu walio katika hatari kubwa zaidi (kisukari, shinikizo la damu kubwa, VVU, historia ya familia), kipimo cha protini ya mkojo hukaguliwa pamoja na eGFR. Lakini kwa watu wengi, eGFR ya kawaida ni ya kufariji: figo zinafanya kazi yao ya kusafisha damu, kusawazisha chumvi na maji, kusaidia afya ya mifupa, na kusaidia kutengeneza chembe nyekundu za damu.',
      sw_mtaa: 'eGFR ya 90 au zaidi inamaanisha figo zinachuja damu kwa kiwango cha kawaida. Dokezo moja muhimu: eGFR ya kawaida peke yake haiondoi kabisa ugonjwa wa figo wa mapema — katika hatua za mwanzo kabisa, kiwango cha uchujaji kinaweza bado kuwa cha kawaida wakati uharibifu unajitokeza tu kama protini katika mkojo. Ndio sababu, kwa watu walio katika hatari kubwa zaidi (kisukari, presha kubwa, VVU, historia ya familia), kipimo cha protini ya mkojo kinakaguliwa pamoja na eGFR. Lakini kwa watu wengi, eGFR ya kawaida ni ya kufariji: figo zinafanya kazi yao ya kusafisha damu, kusawazisha chumvi na maji, kusaidia afya ya mifupa, na kusaidia kutengeneza chembe nyekundu za damu.',
    },
    nextSteps: {
      en: 'No specific action is needed for the eGFR itself — keep the result in your health records so the trend can be seen over time. To keep kidneys healthy: control blood pressure and blood sugar if those are issues, stay well hydrated, keep salt intake moderate, stay physically active, avoid smoking, use NSAID painkillers (ibuprofen, diclofenac) only sparingly, and ask before taking new medicines, herbal products, or supplements. If you have diabetes, high blood pressure, HIV, or a family history of kidney disease, having eGFR and urine protein checked periodically is sensible.',
      sw: 'Hakuna hatua maalum inayohitajika kwa eGFR yenyewe — weka matokeo katika rekodi zako za afya ili mwelekeo uweze kuonekana kwa muda. Kuweka figo zenye afya: dhibiti shinikizo la damu na sukari ya damu ikiwa hizo ni masuala, kunywa maji ya kutosha, weka ulaji wa chumvi kwa wastani, baki hai kimwili, epuka kuvuta sigara, tumia dawa za maumivu za NSAID (ibuprofen, diclofenac) kwa uchache tu, na uliza kabla ya kuchukua dawa mpya, bidhaa za mitishamba, au virutubisho. Ikiwa una kisukari, shinikizo la damu kubwa, VVU, au historia ya familia ya ugonjwa wa figo, kukagua eGFR na protini ya mkojo mara kwa mara ni jambo la busara.',
      sw_mtaa: 'Hakuna hatua maalum inayohitajika kwa eGFR yenyewe — weka matokeo katika rekodi zako za afya ili mwelekeo uweze kuonekana kwa muda. Kuweka figo zenye afya: dhibiti presha na sukari ikiwa hizo ni masuala, kunywa maji ya kutosha, weka ulaji wa chumvi kwa wastani, baki hai kimwili, epuka kuvuta sigara, tumia dawa za maumivu za NSAID (ibuprofen, diclofenac) kwa uchache tu, na uliza kabla ya kuchukua dawa mpya, bidhaa za mitishamba, au virutubisho. Ikiwa una kisukari, presha kubwa, VVU, au historia ya familia ya ugonjwa wa figo, kukagua eGFR na protini ya mkojo mara kwa mara ni jambo la busara.',
    },
    urgency: 'routine',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE OBJECT
// ──────────────────────────────────────────────────────────────────────

export const EGFR: LabKnowledge = {
  id: 'egfr',
  aliases: LAB_ALIASES.egfr,
  unit: 'mL/min/1.73m²',

  whatItMeasures: {
    en: 'eGFR — estimated glomerular filtration rate — is a number that estimates how well the kidneys are filtering. It is not measured directly; it is calculated from a blood creatinine result together with the person\'s age and sex. Roughly, it can be read as the percentage of normal kidney function remaining: an eGFR of 60 means the kidneys are filtering at about 60% of the expected rate. It is the main number used to stage chronic kidney disease, from G1 (normal, ≥90) down to G5 (kidney failure, <15). One key point: a LOWER eGFR is WORSE — the opposite direction to most lab tests. eGFR is least reliable when kidney function is changing quickly, at the extremes of body size or muscle mass, in pregnancy, and right after very high-protein meals or heavy exercise — so the trend across several results matters more than any single value.',
    sw: 'eGFR — kiwango cha makadirio cha uchujaji wa figo — ni namba inayokadiria jinsi figo zinavyochuja vizuri. Haupimwi moja kwa moja; hukokotolewa kutoka matokeo ya creatinine ya damu pamoja na umri na jinsia ya mtu. Takriban, inaweza kusomwa kama asilimia ya utendaji wa kawaida wa figo uliobaki: eGFR ya 60 inamaanisha figo zinachuja kwa takriban asilimia 60 ya kiwango kinachotarajiwa. Ni namba kuu inayotumika kupanga ugonjwa wa figo sugu, kutoka G1 (kawaida, ≥90) hadi G5 (figo kushindwa, <15). Pointi moja muhimu: eGFR ya CHINI ni MBAYA ZAIDI — mwelekeo kinyume na vipimo vingi vya maabara. eGFR haitegemeki zaidi wakati utendaji wa figo unabadilika haraka, katika ncha za ukubwa wa mwili au misuli, katika mimba, na mara baada ya milo yenye protini nyingi sana au mazoezi mazito — hivyo mwelekeo katika matokeo kadhaa una maana zaidi kuliko thamani moja yoyote.',
    sw_mtaa: 'eGFR — kiwango cha makadirio cha uchujaji wa figo — ni namba inayokadiria jinsi figo zinavyochuja vizuri. Haupimwi moja kwa moja; unakokotolewa kutoka matokeo ya creatinine ya damu pamoja na umri na jinsia ya mtu. Takriban, inaweza kusomwa kama asilimia ya kazi ya figo iliyobaki: eGFR ya 60 inamaanisha figo zinachuja kwa takriban asilimia 60. Ni namba kuu inayotumika kupanga ugonjwa wa figo sugu, kutoka G1 (kawaida, ≥90) hadi G5 (figo kushindwa, <15). Pointi moja muhimu: eGFR ya CHINI ni MBAYA ZAIDI — kinyume na vipimo vingi. eGFR haitegemeki zaidi wakati kazi ya figo inabadilika haraka, katika ncha za ukubwa wa mwili au misuli, katika mimba, na mara baada ya milo yenye protini nyingi au mazoezi mazito — hivyo mwelekeo katika matokeo kadhaa una maana zaidi kuliko thamani moja.',
  },

  whyItsOrdered: {
    en: 'eGFR is ordered to check how well the kidneys are working and to stage chronic kidney disease. It is checked routinely in people at higher risk — those with diabetes, high blood pressure, HIV, heart disease, a family history of kidney disease, or who take medicines that can affect the kidneys — because early CKD is usually silent and a blood test is often the only way to find it. It is also checked when someone is unwell in a way that could involve the kidneys, before and after certain medicines or scans that use contrast dye, and to guide the dosing of many drugs (a large number of common medicines need a lower dose, or need to be avoided, when eGFR is reduced). It is almost always interpreted together with a urine test for protein, because the two together define and stage CKD better than either alone.',
    sw: 'eGFR huombwa kuangalia jinsi figo zinavyofanya kazi vizuri na kupanga ugonjwa wa figo sugu. Hukaguliwa kawaida kwa watu walio katika hatari kubwa zaidi — wenye kisukari, shinikizo la damu kubwa, VVU, ugonjwa wa moyo, historia ya familia ya ugonjwa wa figo, au wanaotumia dawa zinazoweza kuathiri figo — kwa sababu CKD ya mapema kawaida ni kimya na kipimo cha damu mara nyingi ndio njia pekee ya kuigundua. Pia hukaguliwa wakati mtu si mzima kwa namna inayoweza kuhusisha figo, kabla na baada ya dawa fulani au skani zinazotumia rangi ya kutofautisha, na kuongoza kipimo cha dawa nyingi (idadi kubwa ya dawa za kawaida zinahitaji kipimo cha chini, au zinahitaji kuepukwa, wakati eGFR imepungua). Karibu daima hutafsiriwa pamoja na kipimo cha mkojo cha protini, kwa sababu hizi mbili kwa pamoja hufafanua na kupanga CKD vizuri zaidi kuliko yoyote peke yake.',
    sw_mtaa: 'eGFR inaombwa kuangalia jinsi figo zinavyofanya kazi vizuri na kupanga ugonjwa wa figo sugu. Inakaguliwa kawaida kwa watu walio katika hatari kubwa zaidi — wenye kisukari, presha kubwa, VVU, ugonjwa wa moyo, historia ya familia ya ugonjwa wa figo, au wanaotumia dawa zinazoweza kuathiri figo — kwa sababu CKD ya mapema kawaida ni kimya na kipimo cha damu mara nyingi ndio njia pekee ya kuigundua. Pia inakaguliwa wakati mtu si mzima kwa namna inayoweza kuhusisha figo, kabla na baada ya dawa fulani au skani zinazotumia rangi ya contrast, na kuongoza kipimo cha dawa nyingi (dawa nyingi za kawaida zinahitaji kipimo cha chini, au zinahitaji kuepukwa, wakati eGFR imepungua). Karibu daima inatafsiriwa pamoja na kipimo cha mkojo cha protini, kwa sababu hizi mbili kwa pamoja zinafafanua na kupanga CKD vizuri zaidi kuliko yoyote peke yake.',
  },

  // eGFR ranges: "normal" is >=90. Lower is worse — encoded so the generic
  // band logic still has something sane, but the real interpretation is in
  // interpretEgfr().
  ranges: [
    {
      applies: { sex: 'any', ageMin: 18 },
      normalLow: 90,
      normalHigh: 120,
    },
  ],

  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'eGFR below 15 — kidney failure (KDIGO stage G5). The kidneys can no longer reliably keep the blood clean and balanced on their own.',
        sw: 'eGFR chini ya 15 — figo kushindwa (hatua ya KDIGO G5). Figo haziwezi tena kuiweka damu safi na yenye uwiano peke yao kwa uhakika.',
        sw_mtaa: 'eGFR chini ya 15 — figo kushindwa (hatua ya KDIGO G5). Figo haziwezi tena kuiweka damu safi na yenye uwiano peke yao kwa uhakika.',
      },
      nextSteps: {
        en: 'Specialist kidney (nephrology) care without delay — planning for dialysis, transplant, or conservative care, and managing the complications of kidney failure. Seek emergency care for breathlessness, very low urine output, severe swelling, confusion, or chest pain.',
        sw: 'Huduma maalum ya figo (nephrology) bila kuchelewa — kupanga kwa dialysis, upandikizaji, au huduma ya kihafidhina, na kusimamia matatizo ya figo kushindwa. Tafuta huduma ya dharura kwa kushindwa kupumua, mkojo mdogo sana, uvimbe mkubwa, kuchanganyikiwa, au maumivu ya kifua.',
        sw_mtaa: 'Huduma maalum ya figo (nephrology) bila kuchelewa — kupanga kwa dialysis, upandikizaji, au conservative care, na kusimamia matatizo ya figo kushindwa. Tafuta huduma ya dharura kwa kushindwa kupumua, mkojo mdogo sana, uvimbe mkubwa, kuchanganyikiwa, au maumivu ya kifua.',
      },
      urgency: 'urgent',
    },
    {
      band: 'low',
      meaning: {
        en: 'eGFR between 15 and 59 — moderately to severely reduced kidney function (KDIGO stages G3-G4). This is the "act now and prepare" range where management meaningfully changes the path.',
        sw: 'eGFR kati ya 15 na 59 — utendaji wa figo uliopungua kwa wastani hadi sana (hatua za KDIGO G3-G4). Hiki ni kiwango cha "chukua hatua sasa na ujiandae" ambapo usimamizi hubadilisha njia kwa kiasi kikubwa.',
        sw_mtaa: 'eGFR kati ya 15 na 59 — utendaji wa figo uliopungua kwa wastani hadi sana (hatua za KDIGO G3-G4). Hiki ni kiwango cha "chukua hatua sasa na ujiandae" ambapo usimamizi unabadilisha njia kwa kiasi kikubwa.',
      },
      nextSteps: {
        en: 'Confirm the result and trend, get a urine protein test, and work with your clinician — and a kidney specialist at G3b or G4 — on tight blood pressure and blood sugar control, kidney-protective medicines where appropriate, a full medicine review for kidney safety, and management of CKD complications. Avoid NSAID painkillers and check before any new medicine or herbal product.',
        sw: 'Thibitisha matokeo na mwelekeo, pata kipimo cha protini ya mkojo, na fanya kazi na daktari wako — na daktari bingwa wa figo katika G3b au G4 — kuhusu udhibiti mkali wa shinikizo la damu na sukari ya damu, dawa zinazolinda figo pale zinapofaa, mapitio kamili ya dawa kwa usalama wa figo, na usimamizi wa matatizo ya CKD. Epuka dawa za maumivu za NSAID na angalia kabla ya dawa yoyote mpya au bidhaa ya mitishamba.',
        sw_mtaa: 'Thibitisha matokeo na mwelekeo, pata kipimo cha protini ya mkojo, na fanya kazi na daktari wako — na daktari bingwa wa figo katika G3b au G4 — kuhusu udhibiti mkali wa presha na sukari, dawa zinazolinda figo pale zinapofaa, mapitio kamili ya dawa kwa usalama wa figo, na usimamizi wa matatizo ya CKD. Epuka dawa za maumivu za NSAID na angalia kabla ya dawa yoyote mpya au bidhaa ya mitishamba.',
      },
      urgency: 'soon',
    },
    {
      band: 'normal',
      meaning: {
        en: 'eGFR of 60 or above — kidney filtration is in or near the normal range. Note that an eGFR of 60-89 (stage G2) is only CKD if there is also kidney damage such as protein in the urine; on its own it is often normal, especially with age.',
        sw: 'eGFR ya 60 au zaidi — uchujaji wa figo uko katika au karibu na kiwango cha kawaida. Kumbuka eGFR ya 60-89 (hatua G2) ni CKD tu ikiwa pia kuna uharibifu wa figo kama protini katika mkojo; peke yake mara nyingi ni ya kawaida, hasa na umri.',
        sw_mtaa: 'eGFR ya 60 au zaidi — uchujaji wa figo uko katika au karibu na kiwango cha kawaida. Kumbuka eGFR ya 60-89 (hatua G2) ni CKD tu ikiwa pia kuna uharibifu wa figo kama protini katika mkojo; peke yake mara nyingi ni ya kawaida, hasa na umri.',
      },
      nextSteps: {
        en: 'Keep the result in your records so the trend is visible over time. Protect kidney health: control blood pressure and blood sugar, stay hydrated, keep salt moderate, avoid routine NSAID painkillers, and ask before new medicines or herbal products. If you are at higher risk (diabetes, high blood pressure, HIV, family history), periodic eGFR and urine protein checks are sensible.',
        sw: 'Weka matokeo katika rekodi zako ili mwelekeo uonekane kwa muda. Linda afya ya figo: dhibiti shinikizo la damu na sukari ya damu, kunywa maji ya kutosha, weka chumvi kwa wastani, epuka dawa za maumivu za NSAID za kawaida, na uliza kabla ya dawa mpya au bidhaa za mitishamba. Ikiwa uko katika hatari kubwa zaidi (kisukari, shinikizo la damu kubwa, VVU, historia ya familia), ukaguzi wa eGFR na protini ya mkojo mara kwa mara ni jambo la busara.',
        sw_mtaa: 'Weka matokeo katika rekodi zako ili mwelekeo uonekane kwa muda. Linda afya ya figo: dhibiti presha na sukari, kunywa maji ya kutosha, weka chumvi kwa wastani, epuka dawa za maumivu za NSAID za kawaida, na uliza kabla ya dawa mpya au bidhaa za mitishamba. Ikiwa uko katika hatari kubwa zaidi (kisukari, presha kubwa, VVU, historia ya familia), ukaguzi wa eGFR na protini ya mkojo mara kwa mara ni jambo la busara.',
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
