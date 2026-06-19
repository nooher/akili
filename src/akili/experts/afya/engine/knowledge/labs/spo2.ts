/**
 * SpO2 — Oxygen Saturation (Phase 8 pneumonia block)
 *
 * Sources: WHO Pulse Oximetry & Oxygen Therapy 2023, WHO Pneumonia 2022,
 *          IMCI 2024, NTLG STG 2023.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   SpO2 (oxygen saturation, read from a pulse oximeter) is the single
 *   most useful bedside number in pneumonia and other acute respiratory
 *   illness. The WHO threshold for "needs oxygen" is SpO2 < 90% on room
 *   air. In Tanzania, pulse oximeters reaching every level of the health
 *   system has been a national priority — and the meaning of the number
 *   in context (acute vs chronic, exertional, altitude) deserves the same
 *   careful interpretation as creatinine or eGFR.
 *
 * What this interpreter does:
 *   Given a numeric SpO2 percentage AND a clinical context tag (acute
 *   illness / known chronic lung disease / exertional testing / unknown),
 *   produce a band-and-context-specific headline, meaning, next-steps, and
 *   urgency. PCP-specific guidance is surfaced where the context flags
 *   HIV — but it is referenced rather than asserted (the user does not
 *   always tell us they have HIV up front).
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export type SpO2Context =
  | 'acute_illness'        // person is acutely unwell — fever, cough, breathlessness
  | 'known_chronic_lung'   // person has known COPD / chronic lung disease (target may be lower)
  | 'exertional_testing'   // SpO2 measured after walking / climbing stairs
  | 'unknown';

export type SpO2Band =
  | 'critical'         // < 88% — life-threatening hypoxia
  | 'severe_hypoxia'   // 88-89% — WHO oxygen-required threshold crossed
  | 'borderline'       // 90-94% — below the typical "well person" range, needs context
  | 'normal';          // ≥ 95% — within usual healthy range at sea level

export interface SpO2Interpretation {
  value: number;
  band: SpO2Band;
  context: SpO2Context;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

/**
 * Bands follow the WHO oxygen-therapy guidance:
 *   < 88% — critical hypoxia
 *   88-89% — severe hypoxia, WHO "needs oxygen" threshold crossed
 *   90-94% — borderline; in acute illness still concerning
 *   ≥ 95% — normal at sea level
 *
 * Tanzania is mostly low-altitude — Dar es Salaam, Mwanza, Dodoma all sit
 * below 1500m. High-altitude regions (Arusha, Moshi at ~1400m) typically
 * still see normal SpO2 ≥ 94% in healthy people.
 */
export function bandForSpO2(value: number): SpO2Band {
  if (value < 88) return 'critical';
  if (value < 90) return 'severe_hypoxia';
  if (value < 95) return 'borderline';
  return 'normal';
}

export function interpretSpO2(
  value: number,
  context: SpO2Context = 'unknown',
): SpO2Interpretation {
  const band = bandForSpO2(value);

  // ── CRITICAL — < 88% ────────────────────────────────────────────────
  if (band === 'critical') {
    return {
      value,
      band,
      context,
      headline: {
        en: `SpO2 ${value}% — CRITICAL hypoxia, emergency oxygen needed now`,
        sw: `SpO2 ${value}% — hypoxia ya HATARI, oksijeni ya dharura inahitajika sasa`,
        sw_mtaa: `SpO2 ${value}% — CRITICAL hypoxia, emergency oxygen inahitajika sasa`,
      },
      meaning: {
        en: `An oxygen saturation of ${value}% means the blood is not carrying enough oxygen to keep the brain, heart, and other organs working safely. This is a life-threatening level and is treated as an emergency regardless of how the person looks — sometimes people feel "okay" right up until they collapse. Most causes are pneumonia, severe asthma or COPD exacerbation, heart failure, pulmonary embolism, or sepsis. In children, severe pneumonia is the leading cause at this saturation.`,
        sw: `Kueneza kwa oksijeni kwa ${value}% kunamaanisha damu haibebai oksijeni ya kutosha kuweka ubongo, moyo, na viungo vingine vikifanya kazi salama. Hiki ni kiwango kinachotishia maisha na hutibiwa kama dharura bila kujali mtu anaonekanaje — wakati mwingine watu hujihisi "vizuri" hadi wanapoanguka. Sababu nyingi ni nimonia, exacerbation kali ya pumu au COPD, kushindwa kwa moyo, pulmonary embolism, au sepsis. Kwa watoto, nimonia kali ndiyo sababu kuu katika kueneza huku.`,
        sw_mtaa: `Oxygen saturation ya ${value}% inamaanisha damu haibebai oksijeni ya kutosha kuweka brain, heart, na other organs zikifanya kazi safely. Hiki ni life-threatening level na inatibiwa kama emergency regardless of jinsi mtu anavyoonekana — wakati mwingine watu wanajihisi "okay" hadi wanapoanguka. Most causes ni pneumonia, severe asthma au COPD exacerbation, heart failure, pulmonary embolism, au sepsis. Kwa watoto, severe pneumonia ni leading cause katika saturation hii.`,
      },
      nextSteps: {
        en: 'EMERGENCY: start supplemental oxygen immediately (nasal prongs, mask, or higher-flow as available, titrated to SpO2 ≥ 90%), call for help, prepare for hospital admission. Do not wait for tests — start oxygen first.',
        sw: 'DHARURA: anza oksijeni ya nyongeza mara moja (nasal prongs, mask, au mtiririko wa juu kama inavyopatikana, kurekebishwa kufikia SpO2 ≥ 90%), piga simu kwa msaada, jiandae kwa kulazwa hospitalini. Usisubiri vipimo — anza oksijeni kwanza.',
        sw_mtaa: 'DHARURA: anza supplemental oxygen mara moja (nasal prongs, mask, au higher-flow kama inavyopatikana, titrated kufikia SpO2 ≥ 90%), call for help, jiandae kwa hospital admission. Usisubiri tests — start oxygen kwanza.',
      },
      urgency: 'emergency',
    };
  }

  // ── SEVERE HYPOXIA — 88-89% ─────────────────────────────────────────
  if (band === 'severe_hypoxia') {
    if (context === 'known_chronic_lung') {
      return {
        value,
        band,
        context,
        headline: {
          en: `SpO2 ${value}% in known chronic lung disease — at the lower edge of acceptable, needs same-day review`,
          sw: `SpO2 ${value}% kwa mtu mwenye ugonjwa wa mapafu sugu unaojulikana — kwenye ukingo wa chini wa kukubalika, inahitaji mapitio ya siku ile ile`,
          sw_mtaa: `SpO2 ${value}% kwa known chronic lung disease — kwenye lower edge ya acceptable, inahitaji same-day review`,
        },
        meaning: {
          en: `In people with established chronic lung disease (advanced COPD especially), the body has adapted over time to lower oxygen levels — SpO2 of 88-92% can be the baseline rather than a sign of an acute crisis. The question is: is this the usual baseline for this person, or is it lower than usual? A reading at ${value}% in someone whose baseline is 94% means acute deterioration and is treated urgently. Excessive oxygen in this group can actually be harmful by suppressing the drive to breathe — the target SpO2 in COPD is usually 88-92%.`,
          sw: `Kwa watu wenye ugonjwa wa mapafu sugu uliothibitishwa (COPD ya hali ya juu hasa), mwili umejirekebisha kwa muda kwa viwango vya chini vya oksijeni — SpO2 ya 88-92% inaweza kuwa baseline badala ya dalili ya mgogoro wa papo hapo. Swali ni: hii ndiyo baseline ya kawaida ya mtu huyu, au iko chini ya kawaida? Kipimo cha ${value}% kwa mtu ambaye baseline yake ni 94% kunamaanisha kuharibika kwa papo hapo na hutibiwa haraka. Oksijeni nyingi mno katika kundi hili inaweza kuwa hatari kwa kukandamiza nguvu ya kupumua — lengo la SpO2 katika COPD kawaida ni 88-92%.`,
          sw_mtaa: `Kwa watu wenye established chronic lung disease (advanced COPD especially), body imeadapt over time kwa lower oxygen levels — SpO2 ya 88-92% inaweza kuwa baseline badala ya sign ya acute crisis. Swali ni: hii ndiyo usual baseline ya person huyu, au iko lower kuliko usual? Reading ya ${value}% kwa mtu ambaye baseline yake ni 94% inamaanisha acute deterioration na inatibiwa urgently. Excessive oxygen katika group hii inaweza kuwa actually harmful kwa kusupress drive ya kupumua — target SpO2 katika COPD kawaida ni 88-92%.`,
        },
        nextSteps: {
          en: 'Same-day facility review. Compare to usual baseline if known. Controlled oxygen therapy (titrate to 88-92%, not higher) is the COPD-specific approach. Investigate the trigger: infection, missed inhalers, environmental.',
          sw: 'Mapitio ya kituoni ya siku ile ile. Linganisha na baseline ya kawaida ikiwa inajulikana. Tiba ya oksijeni iliyodhibitiwa (kurekebisha kufikia 88-92%, sio juu zaidi) ndio mbinu maalum ya COPD. Chunguza chanzo: maambukizi, inhalers zilizokosekana, mazingira.',
          sw_mtaa: 'Same-day facility review. Linganisha na usual baseline kama inajulikana. Controlled oxygen therapy (titrate kufikia 88-92%, sio higher) ni COPD-specific approach. Investigate trigger: infection, missed inhalers, environmental.',
        },
        urgency: 'urgent',
      };
    }
    // Default and acute_illness paths
    return {
      value,
      band,
      context,
      headline: {
        en: `SpO2 ${value}% — severe hypoxia, oxygen needed`,
        sw: `SpO2 ${value}% — hypoxia kali, oksijeni inahitajika`,
        sw_mtaa: `SpO2 ${value}% — severe hypoxia, oxygen inahitajika`,
      },
      meaning: {
        en: `The WHO threshold for needing supplemental oxygen is SpO2 < 90% on room air, and ${value}% crosses that line. In the context of an acute illness — pneumonia, severe asthma, exacerbation of chronic lung disease, sepsis — this is severe pneumonia or equivalent and the person needs urgent assessment, oxygen, and treatment of the underlying cause. In children with pneumonia, an SpO2 < 90% is a key criterion for severe pneumonia classification and inpatient management.`,
        sw: `Kizingiti cha WHO cha kuhitaji oksijeni ya nyongeza ni SpO2 < 90% kwa hewa ya kawaida, na ${value}% inavuka mstari huo. Katika muktadha wa ugonjwa wa papo hapo — nimonia, pumu kali, exacerbation ya ugonjwa wa mapafu sugu, sepsis — hii ni nimonia kali au sawa na mtu anahitaji tathmini ya haraka, oksijeni, na matibabu ya sababu ya msingi. Kwa watoto wenye nimonia, SpO2 < 90% ni kigezo muhimu kwa uainishaji wa nimonia kali na usimamizi wa hospitalini.`,
        sw_mtaa: `WHO threshold ya kuhitaji supplemental oxygen ni SpO2 < 90% on room air, na ${value}% inavuka mstari huo. Katika context ya acute illness — pneumonia, severe asthma, exacerbation ya chronic lung disease, sepsis — hii ni severe pneumonia au equivalent na mtu anahitaji urgent assessment, oxygen, na treatment ya underlying cause. Kwa watoto wenye pneumonia, SpO2 < 90% ni key criterion kwa severe pneumonia classification na inpatient management.`,
      },
      nextSteps: {
        en: 'URGENT: start supplemental oxygen, get to a facility with oxygen and IV antibiotics within the hour, treat the underlying cause. Do not delay for transport arrangements — start oxygen now if available.',
        sw: 'HARAKA: anza oksijeni ya nyongeza, fika kituoni chenye oksijeni na antibiotic za IV ndani ya saa, tibu sababu ya msingi. Usicheleweshe kwa mipango ya usafiri — anza oksijeni sasa kama inapatikana.',
        sw_mtaa: 'URGENT: anza supplemental oxygen, fika kituoni chenye oxygen na IV antibiotics ndani ya saa, tibu underlying cause. Usicheleweshe kwa transport arrangements — start oxygen sasa kama inapatikana.',
      },
      urgency: 'emergency',
    };
  }

  // ── BORDERLINE — 90-94% ─────────────────────────────────────────────
  if (band === 'borderline') {
    if (context === 'acute_illness') {
      return {
        value,
        band,
        context,
        headline: {
          en: `SpO2 ${value}% in acute illness — below the typical well-person range, needs close monitoring`,
          sw: `SpO2 ${value}% katika ugonjwa wa papo hapo — chini ya kiwango cha kawaida cha mtu mzima, inahitaji ufuatiliaji wa karibu`,
          sw_mtaa: `SpO2 ${value}% katika acute illness — chini ya typical well-person range, inahitaji close monitoring`,
        },
        meaning: {
          en: `SpO2 of 90-94% in someone acutely unwell sits below the typical well-person range (≥ 95%) but above the WHO oxygen-needed threshold (< 90%). It is a yellow flag, not green. In pneumonia, this saturation can drift downward over hours — repeating the measurement, watching the work of breathing, counting the respiratory rate, and looking at the trend matters more than the single reading. People with HIV and exercise desaturation (SpO2 drops on a short walk) at this level should be evaluated for PCP. Borderline saturation in a sick person earns same-day facility review.`,
          sw: `SpO2 ya 90-94% kwa mtu mgonjwa wa papo hapo iko chini ya kiwango cha kawaida cha mtu mzima (≥ 95%) lakini juu ya kizingiti cha oksijeni inayohitajika cha WHO (< 90%). Ni bendera ya manjano, sio kijani. Katika nimonia, kueneza huku kunaweza kushuka chini kwa masaa — kurudia kipimo, kuchunguza kazi ya kupumua, kuhesabu kasi ya kupumua, na kuangalia mwelekeo kunajali zaidi kuliko kipimo kimoja. Watu wenye VVU na exercise desaturation (SpO2 inashuka kwa matembezi mafupi) katika kiwango hiki wanapaswa kutathminiwa kwa PCP. Borderline saturation kwa mtu mgonjwa inastahili mapitio ya kituoni ya siku ile ile.`,
          sw_mtaa: `SpO2 ya 90-94% kwa mtu acutely unwell iko chini ya typical well-person range (≥ 95%) lakini juu ya WHO oxygen-needed threshold (< 90%). Ni yellow flag, sio green. Katika pneumonia, saturation hii inaweza kushuka downward over hours — kurudia measurement, kuchunguza work of breathing, kuhesabu respiratory rate, na kuangalia trend inajali zaidi kuliko single reading. People wenye VVU na exercise desaturation (SpO2 inashuka kwa short walk) katika level hii wanapaswa evaluated kwa PCP. Borderline saturation kwa sick person inastahili same-day facility review.`,
        },
        nextSteps: {
          en: 'Same-day facility review for assessment and possible chest X-ray and bloods. Monitor SpO2 again in 2-4 hours or sooner if symptoms worsen — a falling trend matters as much as the number.',
          sw: 'Mapitio ya kituoni ya siku ile ile kwa tathmini na uwezekano wa X-ray ya kifua na vipimo vya damu. Fuatilia SpO2 tena katika masaa 2-4 au mapema ikiwa dalili zinazidi — mwelekeo wa kushuka unajali kama vile namba.',
          sw_mtaa: 'Same-day facility review kwa assessment na possible chest X-ray na bloods. Monitor SpO2 tena katika masaa 2-4 au sooner ikiwa symptoms zinazidi — falling trend inajali kama vile number.',
        },
        urgency: 'urgent',
      };
    }
    return {
      value,
      band,
      context,
      headline: {
        en: `SpO2 ${value}% — below the typical well-person range, context matters`,
        sw: `SpO2 ${value}% — chini ya kiwango cha kawaida cha mtu mzima, muktadha unajali`,
        sw_mtaa: `SpO2 ${value}% — chini ya typical well-person range, context inajali`,
      },
      meaning: {
        en: `An SpO2 of 90-94% in someone who feels well and has no acute symptoms is unusual but not always pathological — pulse oximeters can read a percentage point low for many reasons (cold fingers, nail polish, poor signal, anaemia, dark skin pigmentation in some devices). Recheck the reading on a different finger, ensure the hand is warm, remove any polish, and wait for a steady waveform. If the reading is consistently in this range with no symptoms, a clinical review including a basic respiratory examination is sensible — sometimes early lung disease, anaemia, or even cardiac problems first show as a slightly-low resting saturation.`,
        sw: `SpO2 ya 90-94% kwa mtu anayejisikia vizuri na hana dalili za papo hapo ni isiyo ya kawaida lakini sio daima ya patholojia — pulse oximeters zinaweza kusoma asilimia chini kwa sababu nyingi (vidole baridi, polish ya kucha, ishara mbaya, upungufu wa damu, pigmentation ya ngozi ya giza katika baadhi ya vifaa). Pima tena kwenye kidole tofauti, hakikisha mkono umepasha moto, ondoa polish yoyote, na subiri waveform thabiti. Ikiwa kipimo kinaendelea kuwa katika kiwango hiki bila dalili, mapitio ya kliniki ikijumuisha uchunguzi wa msingi wa kupumua ni busara — wakati mwingine ugonjwa wa mapafu wa mapema, upungufu wa damu, au hata matatizo ya moyo huonekana kwanza kama saturation iliyo chini kidogo wakati wa kupumzika.`,
        sw_mtaa: `SpO2 ya 90-94% kwa mtu anayejisikia vizuri na hana acute symptoms ni isiyo ya kawaida lakini sio daima pathological — pulse oximeters zinaweza kusoma percentage point low kwa sababu nyingi (cold fingers, nail polish, poor signal, anaemia, dark skin pigmentation katika baadhi ya devices). Recheck reading kwenye different finger, hakikisha hand iko warm, ondoa polish yoyote, na subiri steady waveform. Ikiwa reading inaendelea katika range hii bila symptoms, clinical review including basic respiratory examination ni sensible — wakati mwingine early lung disease, anaemia, au hata cardiac problems zinaonekana kwanza kama slightly-low resting saturation.`,
      },
      nextSteps: {
        en: 'Recheck technique. If consistently in this range, see a clinician within a few days for a basic check including respiratory examination and possibly a chest X-ray or full blood count.',
        sw: 'Pima tena mbinu. Ikiwa inaendelea katika kiwango hiki, ona daktari ndani ya siku chache kwa ukaguzi wa msingi ikijumuisha uchunguzi wa kupumua na uwezekano wa X-ray ya kifua au full blood count.',
        sw_mtaa: 'Recheck technique. Ikiwa consistently katika range hii, ona clinician ndani ya siku chache kwa basic check including respiratory examination na possibly chest X-ray au FBC.',
      },
      urgency: 'soon',
    };
  }

  // ── NORMAL — ≥ 95% ──────────────────────────────────────────────────
  if (context === 'exertional_testing') {
    return {
      value,
      band,
      context,
      headline: {
        en: `SpO2 ${value}% after exertion — within normal range, no desaturation on effort`,
        sw: `SpO2 ${value}% baada ya juhudi — ndani ya kiwango cha kawaida, hakuna desaturation kwa juhudi`,
        sw_mtaa: `SpO2 ${value}% baada ya exertion — ndani ya normal range, no desaturation on effort`,
      },
      meaning: {
        en: 'Maintaining a saturation ≥ 95% after a short walk or stair climb is reassuring — it argues against the kind of exercise desaturation seen in early interstitial lung disease, pulmonary embolism, or PCP, where resting saturation can be near-normal but drops on effort. A single normal exertional reading does not exclude all lung disease, but it lowers the index of suspicion when symptoms are mild.',
        sw: 'Kudumisha kueneza ≥ 95% baada ya matembezi mafupi au kupanda ngazi kuna kutuliza — kunabishana dhidi ya aina ya exercise desaturation inayoonekana katika ugonjwa wa interstitial lung wa mapema, pulmonary embolism, au PCP, ambapo kueneza wakati wa kupumzika kunaweza kuwa karibu-kawaida lakini hushuka kwa juhudi. Kipimo kimoja cha kawaida cha exertional hakiondoi ugonjwa wote wa mapafu, lakini hupunguza index ya shaka wakati dalili ni ndogo.',
        sw_mtaa: 'Kudumisha saturation ≥ 95% baada ya short walk au stair climb ni reassuring — inabishana dhidi ya aina ya exercise desaturation inayoonekana katika early interstitial lung disease, pulmonary embolism, au PCP, ambapo resting saturation inaweza kuwa near-normal lakini inashuka kwa effort. Single normal exertional reading haina exclude all lung disease, lakini inapunguza index ya suspicion wakati symptoms ni mild.',
      },
      nextSteps: {
        en: 'If symptoms persist despite normal SpO2 — including after exertion — clinical evaluation is still indicated; not every pathology shows on the oximeter.',
        sw: 'Ikiwa dalili zinaendelea licha ya SpO2 ya kawaida — ikijumuisha baada ya juhudi — tathmini ya kliniki bado inahitajika; sio kila patholojia inaonekana kwenye oximeter.',
        sw_mtaa: 'Ikiwa symptoms zinaendelea licha ya normal SpO2 — including baada ya exertion — clinical evaluation bado inahitajika; sio kila pathology inaonekana kwenye oximeter.',
      },
      urgency: 'routine',
    };
  }

  return {
    value,
    band,
    context,
    headline: {
      en: `SpO2 ${value}% — within the normal range`,
      sw: `SpO2 ${value}% — ndani ya kiwango cha kawaida`,
      sw_mtaa: `SpO2 ${value}% — ndani ya normal range`,
    },
    meaning: {
      en: 'An oxygen saturation of 95% or higher on room air is in the usual healthy range at low altitude. This number alone does not exclude lung disease — early pneumonia, asthma, and other conditions can be present with a normal resting SpO2 — but it is reassuring as one data point, and especially reassuring when symptoms are mild.',
      sw: 'Kueneza kwa oksijeni kwa 95% au zaidi kwa hewa ya kawaida iko katika kiwango cha kawaida cha afya katika urefu wa chini. Namba hii peke yake haiondoi ugonjwa wa mapafu — nimonia ya mapema, pumu, na hali nyingine zinaweza kuwepo na SpO2 ya kawaida wakati wa kupumzika — lakini inatuliza kama hatua moja ya data, na kutuliza zaidi wakati dalili ni ndogo.',
      sw_mtaa: 'Oxygen saturation ya 95% au zaidi on room air iko katika usual healthy range katika low altitude. Number hii peke yake haina exclude lung disease — early pneumonia, asthma, na other conditions zinaweza kuwepo na normal resting SpO2 — lakini ni reassuring kama one data point, na especially reassuring wakati symptoms ni mild.',
    },
    nextSteps: {
      en: 'If symptoms (cough, fever, breathlessness) persist despite normal SpO2, see a clinician — the oximeter is one tool among several.',
      sw: 'Ikiwa dalili (kikohozi, homa, kushindwa kupumua) zinaendelea licha ya SpO2 ya kawaida, ona daktari — oximeter ni chombo kimoja kati ya kadhaa.',
      sw_mtaa: 'Ikiwa symptoms (cough, fever, breathlessness) zinaendelea licha ya normal SpO2, ona clinician — oximeter ni one tool among several.',
    },
    urgency: 'routine',
  };
}

export const SPO2: LabKnowledge = {
  id: 'spo2',
  aliases: LAB_ALIASES.spo2,
  unit: '%',

  whatItMeasures: {
    en: 'SpO2 (peripheral oxygen saturation) is the percentage of haemoglobin in the blood that is carrying oxygen, measured non-invasively through a finger clip (pulse oximeter). At sea level in healthy people, this is normally 95% or higher. The reading depends on getting a good signal — warm fingers, no nail polish, a steady waveform — and on the device being accurate for the person\'s skin tone (a well-known limitation: some older oximeters read slightly high on darker skin, masking real hypoxia).',
    sw: 'SpO2 (peripheral oxygen saturation) ni asilimia ya haemoglobin katika damu inayobeba oksijeni, ikipimwa bila uvamizi kupitia kifyetio cha kidole (pulse oximeter). Kwa urefu wa bahari kwa watu wenye afya, hii kawaida ni 95% au juu zaidi. Kipimo kinategemea kupata ishara nzuri — vidole vya joto, hakuna polish ya kucha, waveform thabiti — na kifaa kuwa sahihi kwa skin tone ya mtu (kizuizi kinachojulikana sana: baadhi ya oximeters za zamani husoma juu kidogo kwenye ngozi ya giza, kuficha hypoxia halisi).',
    sw_mtaa: 'SpO2 (peripheral oxygen saturation) ni percentage ya haemoglobin katika damu inayobeba oksijeni, ikipimwa non-invasively kupitia finger clip (pulse oximeter). Kwa sea level kwa healthy people, hii kawaida ni 95% au higher. Reading inategemea kupata good signal — warm fingers, hakuna nail polish, steady waveform — na device kuwa accurate kwa person\'s skin tone (well-known limitation: baadhi ya older oximeters zinasoma slightly high kwenye darker skin, kuficha real hypoxia).',
  },

  whyItsOrdered: {
    en: 'SpO2 is checked in any acute respiratory illness, in monitoring of pneumonia or asthma, when assessing suspected sepsis, in oxygen-therapy titration, and as a screening sign at triage. In Tanzania, pulse oximeters at every level of the health system are a priority because the WHO threshold for needing oxygen (< 90%) is a number, not a clinical judgment — and identifying who needs oxygen saves lives across pneumonia, severe malaria, neonatal illness, and many other conditions.',
    sw: 'SpO2 huchunguzwa katika ugonjwa wowote wa kupumua wa papo hapo, katika ufuatiliaji wa nimonia au pumu, wakati wa kutathmini sepsis inayoshukiwa, katika titration ya tiba ya oksijeni, na kama dalili ya uchunguzi katika triage. Tanzania, pulse oximeters katika kila ngazi ya mfumo wa afya ni kipaumbele kwa sababu kizingiti cha WHO cha kuhitaji oksijeni (< 90%) ni namba, sio uamuzi wa kliniki — na kutambua nani anahitaji oksijeni huokoa maisha katika nimonia, malaria kali, ugonjwa wa watoto wachanga, na hali nyingine nyingi.',
    sw_mtaa: 'SpO2 inachunguzwa katika acute respiratory illness yoyote, katika monitoring ya pneumonia au asthma, wakati wa kutathmini suspected sepsis, katika oxygen-therapy titration, na kama screening sign katika triage. Tanzania, pulse oximeters katika kila level ya health system ni priority kwa sababu WHO threshold ya kuhitaji oxygen (< 90%) ni number, sio clinical judgment — na kutambua nani anahitaji oxygen inaokoa maisha katika pneumonia, severe malaria, neonatal illness, na many other conditions.',
  },

  ranges: [
    {
      applies: { sex: 'any' },
      normalLow: 95,
      normalHigh: 100,
      criticalLow: 88,
    },
    {
      // Advanced COPD target band — accepted lower because of chronic adaptation
      applies: { sex: 'any' },
      normalLow: 88,
      normalHigh: 92,
      criticalLow: 85,
    },
  ],

  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'SpO2 below 88% is critical hypoxia — life-threatening regardless of how the person looks. Immediate oxygen and emergency assessment.',
        sw: 'SpO2 chini ya 88% ni hypoxia ya hatari — inayotishia maisha bila kujali jinsi mtu anavyoonekana. Oksijeni ya haraka na tathmini ya dharura.',
        sw_mtaa: 'SpO2 chini ya 88% ni critical hypoxia — life-threatening regardless ya jinsi mtu anavyoonekana. Immediate oxygen na emergency assessment.',
      },
      nextSteps: {
        en: 'Start oxygen immediately, prepare for hospital admission, do not delay for tests.',
        sw: 'Anza oksijeni mara moja, jiandae kwa kulazwa hospitalini, usicheleweshe kwa vipimo.',
        sw_mtaa: 'Anza oxygen mara moja, jiandae kwa hospital admission, usicheleweshe kwa tests.',
      },
      urgency: 'emergency',
    },
    {
      band: 'low',
      meaning: {
        en: 'SpO2 88-89% crosses the WHO oxygen-needed threshold. In acute illness this is severe pneumonia or equivalent; in advanced COPD it can be the patient\'s baseline. Context decides.',
        sw: 'SpO2 88-89% inavuka kizingiti cha WHO cha oksijeni inayohitajika. Katika ugonjwa wa papo hapo hii ni nimonia kali au sawa; katika COPD ya hali ya juu inaweza kuwa baseline ya mgonjwa. Muktadha unaamua.',
        sw_mtaa: 'SpO2 88-89% inavuka WHO oxygen-needed threshold. Katika acute illness hii ni severe pneumonia au equivalent; katika advanced COPD inaweza kuwa patient\'s baseline. Context inaamua.',
      },
      nextSteps: {
        en: 'Urgent facility review and oxygen as indicated; titrate carefully in known COPD (target 88-92%).',
        sw: 'Mapitio ya haraka ya kituoni na oksijeni kama inavyoonyeshwa; rekebisha kwa makini katika COPD inayojulikana (lengo 88-92%).',
        sw_mtaa: 'Urgent facility review na oxygen kama inavyoonyeshwa; titrate carefully katika known COPD (target 88-92%).',
      },
      urgency: 'urgent',
    },
    {
      band: 'normal',
      meaning: {
        en: 'SpO2 ≥ 95% on room air is in the usual healthy range at low altitude. Does not exclude all lung disease but is reassuring.',
        sw: 'SpO2 ≥ 95% kwa hewa ya kawaida iko katika kiwango cha kawaida cha afya katika urefu wa chini. Haiondoi ugonjwa wote wa mapafu lakini inatuliza.',
        sw_mtaa: 'SpO2 ≥ 95% on room air iko katika usual healthy range katika low altitude. Haina exclude all lung disease lakini ni reassuring.',
      },
      nextSteps: {
        en: 'Routine monitoring if asymptomatic; clinical review if symptoms persist.',
        sw: 'Ufuatiliaji wa kawaida ikiwa hakuna dalili; mapitio ya kliniki ikiwa dalili zinaendelea.',
        sw_mtaa: 'Routine monitoring ikiwa asymptomatic; clinical review ikiwa symptoms zinaendelea.',
      },
      urgency: 'routine',
    },
  ],

  sources: [
    src('WHO_OXYGEN_2023'),
    src('WHO_PNEUMONIA_2022'),
    src('IMCI_2024'),
    src('NTLG_STG_2023'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
