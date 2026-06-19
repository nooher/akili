/**
 * CD4 Count — Lab Knowledge & Interpretation
 *
 * Sources: NACP National Guidelines for the Management of HIV and AIDS 2024,
 *          WHO Consolidated Guidelines on HIV 2024, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * What CD4 measures: the number of CD4 T-lymphocytes per cubic millimetre
 * of blood — a direct read-out of immune-system strength.
 *
 * Reference framing (NACP / WHO):
 *   - Normal (HIV-negative adult):  ~500-1500 cells/mm³
 *   - >500   : immune system in good shape
 *   - 200-500: some immune suppression, vulnerability rising
 *   - <200   : advanced HIV disease — high OI risk, defines AIDS-stage
 *   - <100   : profound suppression — highest risk (cryptococcal, etc.)
 *   - <50    : critical — CMV, disseminated MAC risk
 *
 * Modern monitoring note: in routine HIV care, VIRAL LOAD is now the main
 * monitoring test. CD4 matters most (a) at diagnosis / baseline, (b) when
 * someone is unwell, and (c) to decide OI prophylaxis. A person can have a
 * fully suppressed viral load while their CD4 is still slowly recovering —
 * the two answer different questions.
 *
 * Context-awareness: the same number means different things at diagnosis
 * versus on long-term ART, so interpretCd4(value, context) branches.
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type Cd4Context =
  | 'at_diagnosis'      // baseline CD4 around the time of HIV diagnosis
  | 'on_art'           // person established on ART, monitoring recovery
  | 'unwell'           // person currently has symptoms / is sick
  | 'unknown';

export type Cd4Band =
  | 'critical'         // < 100
  | 'advanced'         // 100-199
  | 'suppressed'       // 200-499
  | 'good';            // >= 500

export interface Cd4Interpretation {
  value: number;
  band: Cd4Band;
  context: Cd4Context;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

export function bandForCd4(value: number): Cd4Band {
  if (value < 100) return 'critical';
  if (value < 200) return 'advanced';
  if (value < 500) return 'suppressed';
  return 'good';
}

export function interpretCd4(
  value: number,
  context: Cd4Context = 'unknown',
): Cd4Interpretation {
  const band = bandForCd4(value);

  // ── CRITICAL: CD4 < 100 ───────────────────────────────────────────
  if (band === 'critical') {
    return {
      value,
      band,
      context,
      headline: {
        en: `A CD4 count of ${value} is very low — the immune system is profoundly weakened and needs urgent, structured care.`,
        sw: `CD4 count ya ${value} iko chini sana — mfumo wa kinga umedhoofika sana na unahitaji huduma ya haraka, iliyopangwa.`,
        sw_mtaa: `CD4 count ya ${value} iko chini sana — kinga imedhoofika sana na inahitaji huduma ya haraka, iliyopangwa.`,
      },
      meaning: {
        en: 'A CD4 below 100 means the body has very few of the immune cells it needs to fight infection — this is advanced HIV disease, the stage where opportunistic infections like cryptococcal meningitis, PCP, severe TB, and others are most dangerous. It is serious, but it is not hopeless: this is exactly the situation the "advanced HIV disease package of care" is designed for. With OI screening, prompt treatment of any infection found, co-trimoxazole, and effective ART, the immune system can recover and the CD4 count climbs again over the following months and years. The number is a snapshot of risk right now, not a verdict on the future.',
        sw: 'CD4 chini ya 100 inamaanisha mwili una seli chache sana za kinga zinazohitajika kupambana na maambukizi — hii ni VVU iliyokomaa, hatua ambapo maambukizi nyemelezi kama cryptococcal meningitis, PCP, TB kali, na mengine ni hatari zaidi. Ni jambo zito, lakini sio bila matumaini: hii ndiyo hali hasa ambayo "pakti ya huduma ya VVU iliyokomaa" imebuniwa kwa ajili yake. Kwa uchunguzi wa OI, matibabu ya haraka ya maambukizi yoyote yanayopatikana, co-trimoxazole, na ART yenye ufanisi, mfumo wa kinga unaweza kupona na CD4 count inapanda tena katika miezi na miaka inayofuata. Namba ni picha ya hatari sasa hivi, sio hukumu ya wakati ujao.',
        sw_mtaa: 'CD4 chini ya 100 inamaanisha mwili una seli chache sana za kinga zinazohitajika kupambana na maambukizi — hii ni advanced HIV disease, hatua ambapo maambukizi nyemelezi kama cryptococcal meningitis, PCP, TB kali, na mengine ni hatari zaidi. Ni jambo zito, lakini sio bila matumaini: hii ndiyo hali hasa ambayo "advanced HIV disease package of care" imebuniwa kwa ajili yake. Kwa uchunguzi wa OI, matibabu ya haraka ya maambukizi yoyote yanayopatikana, co-trimoxazole, na ART yenye ufanisi, kinga inaweza kupona na CD4 count inapanda tena katika miezi na miaka inayofuata. Namba ni picha ya hatari sasa hivi, sio hukumu ya wakati ujao.',
      },
      nextSteps: {
        en: 'This needs prompt clinical attention. Your CTC team should screen for opportunistic infections — including TB (sputum GeneXpert, urine LF-LAM), cryptococcal infection (a CrAg blood test), and others — treat anything found, start or continue co-trimoxazole, and start or restart ART with careful timing. Watch closely for warning signs: severe headache, neck stiffness, confusion, breathlessness, or high fever all need emergency care. Do not face this alone — bring a treatment supporter and keep every appointment during the recovery period.',
        sw: 'Hii inahitaji umakini wa haraka wa kliniki. Timu yako ya CTC inapaswa kuchunguza maambukizi nyemelezi — ikiwa ni pamoja na TB (sputum GeneXpert, urine LF-LAM), maambukizi ya cryptococcal (kipimo cha damu cha CrAg), na mengine — kutibu chochote kinachopatikana, kuanza au kuendelea na co-trimoxazole, na kuanza au kuanza upya ART kwa wakati wa makini. Angalia kwa karibu ishara za onyo: kichwa kikali, ukakavu wa shingo, kuchanganyikiwa, kushindwa kupumua, au homa kali zote zinahitaji huduma ya dharura. Usikabiliane na hili peke yako — lete msaidizi wa matibabu na uweke kila miadi wakati wa kipindi cha kupona.',
        sw_mtaa: 'Hii inahitaji umakini wa haraka wa kliniki. Timu yako ya CTC inapaswa kuchunguza maambukizi nyemelezi — ikiwa ni pamoja na TB (sputum GeneXpert, urine LF-LAM), maambukizi ya cryptococcal (kipimo cha damu cha CrAg), na mengine — kutibu chochote kinachopatikana, kuanza au kuendelea na co-trimoxazole, na kuanza au kuanza upya ART kwa wakati wa makini. Angalia kwa karibu ishara za onyo: kichwa kikali, shingo ngumu, kuchanganyikiwa, kushindwa kupumua, au homa kali zote zinahitaji huduma ya dharura. Usikabiliane na hili peke yako — lete treatment supporter na uweke kila miadi wakati wa kipindi cha kupona.',
      },
      urgency: 'urgent',
    };
  }

  // ── ADVANCED: CD4 100-199 ─────────────────────────────────────────
  if (band === 'advanced') {
    return {
      value,
      band,
      context,
      headline: {
        en: `A CD4 count of ${value} indicates advanced HIV disease — the immune system is significantly weakened and needs a structured package of care.`,
        sw: `CD4 count ya ${value} inaonyesha VVU iliyokomaa — mfumo wa kinga umedhoofika sana na unahitaji pakti iliyopangwa ya huduma.`,
        sw_mtaa: `CD4 count ya ${value} inaonyesha advanced HIV disease — kinga imedhoofika sana na inahitaji package iliyopangwa ya huduma.`,
      },
      meaning: {
        en: 'A CD4 between 100 and 200 is in the "advanced HIV disease" range — the body is more vulnerable to opportunistic infections such as TB, PCP, and others. This often happens with late diagnosis or after a treatment interruption. The good news is that this stage has a clear, effective package of care, and with treatment the immune system recovers — the CD4 count rises steadily once ART is working. This number is a call to act promptly and thoroughly, not a reason to lose hope.',
        sw: 'CD4 kati ya 100 na 200 iko katika kiwango cha "VVU iliyokomaa" — mwili uko hatarini zaidi kwa maambukizi nyemelezi kama TB, PCP, na mengine. Hii mara nyingi hutokea na utambuzi wa kuchelewa au baada ya kukatiza matibabu. Habari njema ni kwamba hatua hii ina pakti wazi, yenye ufanisi ya huduma, na kwa matibabu mfumo wa kinga hupona — CD4 count inapanda kwa kasi mara ART inapofanya kazi. Namba hii ni wito wa kuchukua hatua haraka na kwa ukamilifu, sio sababu ya kupoteza matumaini.',
        sw_mtaa: 'CD4 kati ya 100 na 200 iko katika kiwango cha "advanced HIV disease" — mwili uko hatarini zaidi kwa maambukizi nyemelezi kama TB, PCP, na mengine. Hii mara nyingi inatokea na utambuzi wa kuchelewa au baada ya kukatiza matibabu. Habari njema ni kwamba hatua hii ina package wazi, yenye ufanisi ya huduma, na kwa matibabu kinga inapona — CD4 count inapanda kwa kasi mara ART inapofanya kazi. Namba hii ni wito wa kuchukua hatua haraka na kwa ukamilifu, sio sababu ya kupoteza matumaini.',
      },
      nextSteps: {
        en: 'Your CTC will follow the advanced HIV disease package: screening for opportunistic infections (especially TB and cryptococcal infection), treating anything found, co-trimoxazole preventive therapy, and starting or continuing ART. Take ART exactly as prescribed and never miss doses — this is what drives the CD4 recovery. Attend every follow-up, and seek urgent care for any severe headache, breathlessness, persistent fever, or confusion.',
        sw: 'CTC yako itafuata pakti ya VVU iliyokomaa: uchunguzi wa maambukizi nyemelezi (hasa TB na maambukizi ya cryptococcal), kutibu chochote kinachopatikana, tiba ya kuzuia ya co-trimoxazole, na kuanza au kuendelea na ART. Chukua ART hasa kama ilivyoagizwa na kamwe usikose dose — hii ndiyo inayoendesha kupona kwa CD4. Hudhuria kila ufuatiliaji, na utafute huduma ya haraka kwa kichwa kikali chochote, kushindwa kupumua, homa ya kudumu, au kuchanganyikiwa.',
        sw_mtaa: 'CTC yako itafuata package ya advanced HIV disease: uchunguzi wa maambukizi nyemelezi (hasa TB na maambukizi ya cryptococcal), kutibu chochote kinachopatikana, co-trimoxazole preventive therapy, na kuanza au kuendelea na ART. Chukua ART hasa kama ilivyoagizwa na kamwe usikose dose — hii ndiyo inayoendesha kupona kwa CD4. Hudhuria kila ufuatiliaji, na utafute huduma ya haraka kwa kichwa kikali chochote, kushindwa kupumua, homa ya kudumu, au kuchanganyikiwa.',
      },
      urgency: 'soon',
    };
  }

  // ── SUPPRESSED: CD4 200-499 ───────────────────────────────────────
  if (band === 'suppressed') {
    if (context === 'on_art') {
      return {
        value,
        band,
        context,
        headline: {
          en: `A CD4 count of ${value} on ART shows an immune system that is recovering — keep going, the trend matters more than the single number.`,
          sw: `CD4 count ya ${value} ukiwa kwenye ART inaonyesha mfumo wa kinga unaopona — endelea, mwelekeo unajali zaidi kuliko namba moja.`,
          sw_mtaa: `CD4 count ya ${value} ukiwa kwenye ART inaonyesha kinga inayopona — endelea, mwelekeo unajali zaidi kuliko namba moja.`,
        },
        meaning: {
          en: 'A CD4 in the 200-500 range while on ART is a common and reassuring picture, especially if it started lower — it shows the immune system rebuilding. Recovery is gradual: CD4 can take months to years to climb back toward the normal range, and for some people it settles at a "new normal" that is lower than before but still protective. What matters most is the direction of travel. If your viral load is undetectable and your CD4 is trending upward over successive tests, your treatment is doing its job.',
          sw: 'CD4 katika kiwango cha 200-500 ukiwa kwenye ART ni picha ya kawaida na ya kufariji, hasa ikiwa ilianza chini zaidi — inaonyesha mfumo wa kinga unajijenga upya. Kupona ni hatua kwa hatua: CD4 inaweza kuchukua miezi hadi miaka kupanda kurudi kuelekea kiwango cha kawaida, na kwa baadhi ya watu hukaa kwenye "kawaida mpya" iliyo chini kuliko awali lakini bado inalinda. Kinachojali zaidi ni mwelekeo wa safari. Ikiwa viral load yako haionekani na CD4 yako inaelekea juu kwenye vipimo vinavyofuatana, matibabu yako yanafanya kazi yake.',
          sw_mtaa: 'CD4 katika kiwango cha 200-500 ukiwa kwenye ART ni picha ya kawaida na ya kufariji, hasa ikiwa ilianza chini zaidi — inaonyesha kinga inajijenga upya. Kupona ni hatua kwa hatua: CD4 inaweza kuchukua miezi hadi miaka kupanda kurudi kuelekea kiwango cha kawaida, na kwa baadhi ya watu inakaa kwenye "kawaida mpya" iliyo chini kuliko awali lakini bado inalinda. Kinachojali zaidi ni mwelekeo wa safari. Ikiwa viral load yako haionekani na CD4 yako inaelekea juu kwenye vipimo vinavyofuatana, matibabu yako yanafanya kazi yake.',
        },
        nextSteps: {
          en: 'Keep taking ART every day — adherence is what sustains the recovery. Continue routine monitoring (viral load is the main test; CD4 is checked less often once you are stable). Stay alert for TB symptoms and attend every CTC visit. If your clinician had started co-trimoxazole, they will advise when your CD4 has recovered enough to consider stopping it. Bring all results to each visit so the trend is visible.',
          sw: 'Endelea kuchukua ART kila siku — kuzingatia ndiko kunakodumisha kupona. Endelea na ufuatiliaji wa kawaida (viral load ni kipimo kikuu; CD4 hukaguliwa mara chache mara unapokuwa imara). Baki macho kwa dalili za TB na uhudhurie kila ziara ya CTC. Ikiwa daktari wako alikuwa ameanzisha co-trimoxazole, watakushauri wakati CD4 yako imepona vya kutosha kufikiria kuisimamisha. Lete matokeo yote katika kila ziara ili mwelekeo uonekane.',
          sw_mtaa: 'Endelea kuchukua ART kila siku — adherence ndiko kunakodumisha kupona. Endelea na ufuatiliaji wa kawaida (viral load ni kipimo kikuu; CD4 inakaguliwa mara chache mara unapokuwa imara). Baki macho kwa dalili za TB na uhudhurie kila ziara ya CTC. Ikiwa daktari wako alikuwa ameanzisha co-trimoxazole, watakushauri wakati CD4 yako imepona vya kutosha kufikiria kuisimamisha. Lete matokeo yote katika kila ziara ili mwelekeo uonekane.',
        },
        urgency: 'routine',
      };
    }
    // at_diagnosis / unwell / unknown
    return {
      value,
      band,
      context,
      headline: {
        en: `A CD4 count of ${value} shows some immune suppression — starting and staying on ART is what turns this around.`,
        sw: `CD4 count ya ${value} inaonyesha udhoofu fulani wa kinga — kuanza na kubaki kwenye ART ndiko kunakobadilisha hili.`,
        sw_mtaa: `CD4 count ya ${value} inaonyesha udhoofu fulani wa kinga — kuanza na kubaki kwenye ART ndiko kunakobadilisha hili.`,
      },
      meaning: {
        en: 'A CD4 between 200 and 500 means the immune system has taken some damage but is not in the most vulnerable range. There is more reserve here than in advanced HIV disease — but the goal is to protect and rebuild it. Starting ART promptly and taking it consistently stops further loss and allows the count to recover over time. This is a solidly treatable starting point.',
        sw: 'CD4 kati ya 200 na 500 inamaanisha mfumo wa kinga umepata uharibifu fulani lakini hauko katika kiwango cha hatari zaidi. Kuna akiba zaidi hapa kuliko katika VVU iliyokomaa — lakini lengo ni kuilinda na kuijenga upya. Kuanza ART haraka na kuichukua mara kwa mara husimamisha upotevu zaidi na huruhusu count kupona kwa muda. Hii ni hatua ya kuanzia inayotibika imara.',
        sw_mtaa: 'CD4 kati ya 200 na 500 inamaanisha kinga imepata uharibifu fulani lakini haiko katika kiwango cha hatari zaidi. Kuna akiba zaidi hapa kuliko katika advanced HIV disease — lakini lengo ni kuilinda na kuijenga upya. Kuanza ART haraka na kuichukua mara kwa mara kunasimamisha upotevu zaidi na kunaruhusu count kupona kwa muda. Hii ni hatua ya kuanzia inayotibika imara.',
      },
      nextSteps: {
        en: 'Start ART as soon as your CTC arranges it, and build a solid daily routine — never missing doses is what allows the CD4 to recover. You will also have a TB symptom screen and other baseline checks. Attend every appointment, find a treatment supporter, and seek care for any new fever, cough, or feeling unwell. Over the following months, repeat tests should show the count climbing.',
        sw: 'Anza ART mara tu CTC yako inapoipanga, na ujenge utaratibu imara wa kila siku — kutokosa dose ndiko kunakoruhusu CD4 kupona. Pia utakuwa na uchunguzi wa dalili za TB na ukaguzi mwingine wa msingi. Hudhuria kila miadi, tafuta msaidizi wa matibabu, na utafute huduma kwa homa yoyote mpya, kikohozi, au kujisikia si mzima. Katika miezi inayofuata, vipimo vinavyorudiwa vinapaswa kuonyesha count ikipanda.',
        sw_mtaa: 'Anza ART mara tu CTC yako inapoipanga, na ujenge utaratibu imara wa kila siku — kutokosa dose ndiko kunakoruhusu CD4 kupona. Pia utakuwa na uchunguzi wa dalili za TB na ukaguzi mwingine wa msingi. Hudhuria kila miadi, tafuta treatment supporter, na utafute huduma kwa homa yoyote mpya, kikohozi, au kujisikia si mzima. Katika miezi inayofuata, vipimo vinavyorudiwa vinapaswa kuonyesha count ikipanda.',
      },
      urgency: 'soon',
    };
  }

  // ── GOOD: CD4 >= 500 ──────────────────────────────────────────────
  return {
    value,
    band,
    context,
    headline: {
      en: `A CD4 count of ${value} is in the healthy range — the immune system is in good shape. Keep it there with consistent ART.`,
      sw: `CD4 count ya ${value} iko katika kiwango chenye afya — mfumo wa kinga uko vizuri. Iweke hapo kwa ART ya mfululizo.`,
      sw_mtaa: `CD4 count ya ${value} iko katika kiwango chenye afya — kinga iko vizuri. Iweke hapo kwa ART ya mfululizo.`,
    },
    meaning: {
      en: 'A CD4 of 500 or above is in the range seen in people without HIV — it means the immune system is strong and well able to defend the body. For someone on ART, reaching and holding this level is exactly the goal: it reflects an immune system that has recovered or been protected. The way to keep it here is simple and powerful — take ART every day, without gaps. CD4 naturally fluctuates a little between tests, so do not be alarmed by small ups and downs; the overall picture is what counts.',
      sw: 'CD4 ya 500 au zaidi iko katika kiwango kinachoonekana kwa watu wasio na VVU — inamaanisha mfumo wa kinga uko imara na unaweza vizuri kuulinda mwili. Kwa mtu aliye kwenye ART, kufikia na kushikilia kiwango hiki ndilo lengo hasa: inaakisi mfumo wa kinga uliopona au uliolindwa. Njia ya kuiweka hapa ni rahisi na yenye nguvu — chukua ART kila siku, bila mapengo. CD4 hubadilika kidogo kiasili kati ya vipimo, hivyo usishtuke na kupanda na kushuka kidogo; picha ya jumla ndiyo inayohesabika.',
      sw_mtaa: 'CD4 ya 500 au zaidi iko katika kiwango kinachoonekana kwa watu wasio na VVU — inamaanisha kinga iko imara na inaweza vizuri kuulinda mwili. Kwa mtu aliye kwenye ART, kufikia na kushikilia kiwango hiki ndilo lengo hasa: inaonyesha kinga iliyopona au iliyolindwa. Njia ya kuiweka hapa ni rahisi na yenye nguvu — chukua ART kila siku, bila mapengo. CD4 inabadilika kidogo kiasili kati ya vipimo, hivyo usishtuke na kupanda na kushuka kidogo; picha ya jumla ndiyo inayohesabika.',
    },
    nextSteps: {
      en: 'Keep doing what works: take ART every day, attend routine CTC visits, and keep up viral load monitoring (the main routine test). Continue TB symptom screening at visits and age-appropriate health checks. A strong CD4 with an undetectable viral load is the picture of well-controlled HIV — protect it by never interrupting treatment.',
      sw: 'Endelea kufanya kinachofanya kazi: chukua ART kila siku, hudhuria ziara za kawaida za CTC, na uendelee na ufuatiliaji wa viral load (kipimo kikuu cha kawaida). Endelea na uchunguzi wa dalili za TB katika ziara na ukaguzi wa afya unaofaa umri. CD4 imara na viral load isiyoonekana ni picha ya VVU iliyodhibitiwa vizuri — ilinde kwa kutokatiza matibabu kamwe.',
      sw_mtaa: 'Endelea kufanya kinachofanya kazi: chukua ART kila siku, hudhuria ziara za kawaida za CTC, na uendelee na ufuatiliaji wa viral load (kipimo kikuu cha kawaida). Endelea na uchunguzi wa dalili za TB katika ziara na ukaguzi wa afya unaofaa umri. CD4 imara na viral load isiyoonekana ni picha ya VVU iliyodhibitiwa vizuri — ilinde kwa kutokatiza matibabu kamwe.',
    },
    urgency: 'routine',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE OBJECT
// ──────────────────────────────────────────────────────────────────────

export const CD4: LabKnowledge = {
  id: 'cd4',
  aliases: LAB_ALIASES.cd4,
  unit: 'cells/mm³',

  whatItMeasures: {
    en: 'The CD4 count measures how many CD4 T-lymphocytes — a type of white blood cell — are in a cubic millimetre of blood. CD4 cells are the "commanders" of the immune system: they coordinate the body\'s defence against infections. HIV specifically targets and destroys CD4 cells, so the CD4 count is a direct measure of how much immune strength a person has. In an HIV-negative adult the count is roughly 500-1500. As untreated HIV progresses the count falls; with effective ART it recovers. Note that CD4 naturally varies between tests and with infections, time of day, and other factors — the trend across several tests is more meaningful than any single value.',
    sw: 'CD4 count hupima ni CD4 T-lymphocytes ngapi — aina ya seli nyeupe za damu — ziko katika milimita ya ujazo ya damu. Seli za CD4 ni "makamanda" wa mfumo wa kinga: huratibu ulinzi wa mwili dhidi ya maambukizi. VVU hulenga na kuharibu seli za CD4 hasa, hivyo CD4 count ni kipimo cha moja kwa moja cha kiasi cha nguvu ya kinga mtu alichonacho. Kwa mtu mzima asiye na VVU count ni takriban 500-1500. Kadri VVU isiyotibiwa inavyoendelea count hushuka; kwa ART yenye ufanisi hupona. Kumbuka CD4 hubadilika kiasili kati ya vipimo na kwa maambukizi, wakati wa siku, na sababu nyingine — mwelekeo katika vipimo kadhaa una maana zaidi kuliko thamani moja yoyote.',
    sw_mtaa: 'CD4 count inapima ni CD4 T-lymphocytes ngapi — aina ya seli nyeupe za damu — ziko katika milimita ya ujazo ya damu. Seli za CD4 ni "makamanda" wa kinga: zinaratibu ulinzi wa mwili dhidi ya maambukizi. VVU inalenga na kuharibu seli za CD4 hasa, hivyo CD4 count ni kipimo cha moja kwa moja cha kiasi cha nguvu ya kinga mtu alichonacho. Kwa mtu mzima asiye na VVU count ni takriban 500-1500. Kadri VVU isiyotibiwa inavyoendelea count inashuka; kwa ART yenye ufanisi inapona. Kumbuka CD4 inabadilika kiasili kati ya vipimo na kwa maambukizi, wakati wa siku, na sababu nyingine — mwelekeo katika vipimo kadhaa una maana zaidi kuliko thamani moja yoyote.',
  },

  whyItsOrdered: {
    en: 'CD4 is ordered to assess immune-system strength and risk. It matters most at three points: (1) at HIV diagnosis or baseline — to see how much immune damage has already occurred and whether advanced HIV disease care is needed; (2) when someone is unwell — a low CD4 widens the range of infections to consider; (3) to decide on opportunistic-infection prophylaxis such as co-trimoxazole, and when it might safely be stopped. In modern HIV care, routine ongoing monitoring is done mainly with viral load (which shows whether ART is working), while CD4 is checked less frequently once a person is stable. CD4 and viral load answer different questions — CD4 is "how strong is my immune system," viral load is "is my treatment controlling the virus."',
    sw: 'CD4 huombwa kutathmini nguvu ya mfumo wa kinga na hatari. Inajali zaidi katika pointi tatu: (1) wakati wa utambuzi wa VVU au msingi — kuona ni uharibifu kiasi gani wa kinga umeshatokea na kama huduma ya VVU iliyokomaa inahitajika; (2) wakati mtu si mzima — CD4 ya chini hupanua wigo wa maambukizi ya kuzingatia; (3) kuamua kuhusu kuzuia maambukizi nyemelezi kama co-trimoxazole, na lini inaweza kusimamishwa kwa usalama. Katika huduma ya kisasa ya VVU, ufuatiliaji wa kawaida unaoendelea hufanywa hasa kwa viral load (inayoonyesha kama ART inafanya kazi), wakati CD4 hukaguliwa mara chache mara mtu anapokuwa imara. CD4 na viral load hujibu maswali tofauti — CD4 ni "kinga yangu ina nguvu kiasi gani," viral load ni "matibabu yangu yanadhibiti virusi."',
    sw_mtaa: 'CD4 inaombwa kutathmini nguvu ya kinga na hatari. Inajali zaidi katika pointi tatu: (1) wakati wa utambuzi wa VVU au baseline — kuona ni uharibifu kiasi gani wa kinga umeshatokea na kama huduma ya advanced HIV disease inahitajika; (2) wakati mtu si mzima — CD4 ya chini inapanua wigo wa maambukizi ya kuzingatia; (3) kuamua kuhusu kuzuia maambukizi nyemelezi kama co-trimoxazole, na lini inaweza kusimamishwa kwa usalama. Katika huduma ya kisasa ya VVU, ufuatiliaji wa kawaida unaoendelea unafanywa hasa kwa viral load (inayoonyesha kama ART inafanya kazi), wakati CD4 inakaguliwa mara chache mara mtu anapokuwa imara. CD4 na viral load zinajibu maswali tofauti — CD4 ni "kinga yangu ina nguvu kiasi gani," viral load ni "matibabu yangu yanadhibiti virusi."',
  },

  ranges: [
    {
      applies: { sex: 'any', ageMin: 13 },
      normalLow: 500,
      normalHigh: 1500,
    },
  ],

  interpretations: [
    {
      band: 'critical_low',
      meaning: {
        en: 'CD4 below 100 — profound immune suppression, advanced HIV disease with the highest risk of serious opportunistic infections.',
        sw: 'CD4 chini ya 100 — udhoofu mkubwa wa kinga, VVU iliyokomaa yenye hatari kubwa zaidi ya maambukizi nyemelezi makubwa.',
        sw_mtaa: 'CD4 chini ya 100 — udhoofu mkubwa wa kinga, advanced HIV disease yenye hatari kubwa zaidi ya maambukizi nyemelezi makubwa.',
      },
      nextSteps: {
        en: 'Prompt CTC attention: opportunistic infection screening (TB, cryptococcal, others), treat what is found, co-trimoxazole, and ART with careful timing. Seek emergency care for severe headache, breathlessness, confusion, or high fever.',
        sw: 'Umakini wa haraka wa CTC: uchunguzi wa maambukizi nyemelezi (TB, cryptococcal, mengine), tibu kinachopatikana, co-trimoxazole, na ART kwa wakati wa makini. Tafuta huduma ya dharura kwa kichwa kikali, kushindwa kupumua, kuchanganyikiwa, au homa kali.',
        sw_mtaa: 'Umakini wa haraka wa CTC: uchunguzi wa maambukizi nyemelezi (TB, cryptococcal, mengine), tibu kinachopatikana, co-trimoxazole, na ART kwa wakati wa makini. Tafuta huduma ya dharura kwa kichwa kikali, kushindwa kupumua, kuchanganyikiwa, au homa kali.',
      },
      urgency: 'urgent',
    },
    {
      band: 'low',
      meaning: {
        en: 'CD4 between 100 and 500 — some to significant immune suppression. Below 200 is advanced HIV disease; 200-500 is a treatable starting point with more reserve.',
        sw: 'CD4 kati ya 100 na 500 — udhoofu fulani hadi mkubwa wa kinga. Chini ya 200 ni VVU iliyokomaa; 200-500 ni hatua ya kuanzia inayotibika yenye akiba zaidi.',
        sw_mtaa: 'CD4 kati ya 100 na 500 — udhoofu fulani hadi mkubwa wa kinga. Chini ya 200 ni advanced HIV disease; 200-500 ni hatua ya kuanzia inayotibika yenye akiba zaidi.',
      },
      nextSteps: {
        en: 'Start or continue ART without missing doses, have a TB symptom screen, and follow your CTC plan including co-trimoxazole where indicated. The CD4 should recover over the following months with consistent treatment.',
        sw: 'Anza au endelea na ART bila kukosa dose, fanya uchunguzi wa dalili za TB, na fuata mpango wa CTC yako ikiwa ni pamoja na co-trimoxazole pale inapoonyeshwa. CD4 inapaswa kupona katika miezi inayofuata kwa matibabu ya mfululizo.',
        sw_mtaa: 'Anza au endelea na ART bila kukosa dose, fanya uchunguzi wa dalili za TB, na fuata mpango wa CTC yako ikiwa ni pamoja na co-trimoxazole pale inapoonyeshwa. CD4 inapaswa kupona katika miezi inayofuata kwa matibabu ya mfululizo.',
      },
      urgency: 'soon',
    },
    {
      band: 'normal',
      meaning: {
        en: 'CD4 of 500 or above — the immune system is in a healthy range. For someone on ART this is the goal: a recovered or well-protected immune system.',
        sw: 'CD4 ya 500 au zaidi — mfumo wa kinga uko katika kiwango chenye afya. Kwa mtu aliye kwenye ART hili ndilo lengo: mfumo wa kinga uliopona au uliolindwa vizuri.',
        sw_mtaa: 'CD4 ya 500 au zaidi — kinga iko katika kiwango chenye afya. Kwa mtu aliye kwenye ART hili ndilo lengo: kinga iliyopona au iliyolindwa vizuri.',
      },
      nextSteps: {
        en: 'Keep taking ART every day, attend routine CTC visits, and continue viral load monitoring and TB screening. A strong CD4 with an undetectable viral load is well-controlled HIV — protect it by never interrupting treatment.',
        sw: 'Endelea kuchukua ART kila siku, hudhuria ziara za kawaida za CTC, na uendelee na ufuatiliaji wa viral load na uchunguzi wa TB. CD4 imara na viral load isiyoonekana ni VVU iliyodhibitiwa vizuri — ilinde kwa kutokatiza matibabu kamwe.',
        sw_mtaa: 'Endelea kuchukua ART kila siku, hudhuria ziara za kawaida za CTC, na uendelee na ufuatiliaji wa viral load na uchunguzi wa TB. CD4 imara na viral load isiyoonekana ni VVU iliyodhibitiwa vizuri — ilinde kwa kutokatiza matibabu kamwe.',
      },
      urgency: 'routine',
    },
    {
      band: 'high',
      meaning: {
        en: 'CD4 above the typical range — this is generally not a concern in itself; CD4 varies between people and tests. Your clinician interprets it alongside your viral load and overall picture.',
        sw: 'CD4 juu ya kiwango cha kawaida — kwa ujumla hili sio jambo la wasiwasi lenyewe; CD4 hubadilika kati ya watu na vipimo. Daktari wako huitafsiri pamoja na viral load yako na picha ya jumla.',
        sw_mtaa: 'CD4 juu ya kiwango cha kawaida — kwa ujumla hili sio jambo la wasiwasi lenyewe; CD4 inabadilika kati ya watu na vipimo. Daktari wako anaitafsiri pamoja na viral load yako na picha ya jumla.',
      },
      nextSteps: {
        en: 'No special action — continue ART and routine monitoring as usual. Bring the result to your next CTC visit so it is recorded alongside your viral load.',
        sw: 'Hakuna hatua maalum — endelea na ART na ufuatiliaji wa kawaida kama kawaida. Lete matokeo katika ziara yako ijayo ya CTC ili yarekodiwe pamoja na viral load yako.',
        sw_mtaa: 'Hakuna hatua maalum — endelea na ART na ufuatiliaji wa kawaida kama kawaida. Lete matokeo katika ziara yako ijayo ya CTC ili yarekodiwe pamoja na viral load yako.',
      },
      urgency: 'routine',
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
