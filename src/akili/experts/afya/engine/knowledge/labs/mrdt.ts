/**
 * Malaria Rapid Diagnostic Test (mRDT) — Lab Knowledge
 *
 * Qualitative test that detects malaria parasite antigens in a finger-prick
 * blood sample. Result is positive (parasite detected) or negative.
 *
 * Sources: NMCP Tanzania 2024, WHO Guidelines for Malaria 2024,
 *          IMCI 2024, Muhimbili Protocols.
 *
 * Note: Unlike numeric labs (HbA1c, glucose), mRDT has no numeric range —
 * its interpretation is by RESULT type (positive/negative/invalid) and
 * CONTEXT (recent treatment, severity of illness, age group).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type MrdtResult = 'positive' | 'negative' | 'invalid';
export type MrdtContext =
  | 'fever_current'        // currently has fever
  | 'recent_treatment'     // had malaria treatment in past 4 weeks
  | 'asymptomatic'         // routine screen, no symptoms
  | 'severe_symptoms'      // danger signs present
  | 'unknown';

export interface MrdtInterpretation {
  result: MrdtResult;
  context: MrdtContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

export function interpretMrdt(
  result: MrdtResult,
  context: MrdtContext = 'unknown',
): MrdtInterpretation {
  // Positive results — almost always means treat
  if (result === 'positive') {
    if (context === 'severe_symptoms') {
      return {
        result,
        context,
        headline: {
          en: 'mRDT is POSITIVE and you have danger signs — this is severe malaria.',
          sw: 'mRDT ni POSITIVE na una dalili za hatari — hii ni malaria kali.',
          sw_mtaa: 'mRDT ni POSITIVE na una dalili za hatari — hii ni malaria kali.',
        },
        meaning: {
          en: 'A positive mRDT in someone with danger signs (convulsions, unconsciousness, repeated vomiting, very pale, severe weakness) means severe malaria. This is not treated at home with pills — it needs intravenous artesunate in a hospital with admission capacity. The first 24 hours are the most dangerous.',
          sw: 'mRDT chanya kwa mtu mwenye dalili za hatari (kifafa, kuzimia, kutapika mara kwa mara, weupe mkubwa, udhaifu mkubwa) maana yake malaria kali. Hii haitibiwi nyumbani kwa vidonge — inahitaji artesunate ya mishipa katika hospitali yenye uwezo wa kulaza. Masaa 24 ya kwanza ndio hatari zaidi.',
          sw_mtaa: 'mRDT positive kwa mtu mwenye dalili za hatari (kifafa, kuzimia, kutapika mara kwa mara, weupe mkubwa, udhaifu mkubwa) maana yake malaria kali. Hii haitibiwi nyumbani kwa vidonge — inahitaji artesunate ya mishipa kwenye hospitali yenye uwezo wa kulaza. Masaa 24 ya kwanza ndio hatari zaidi.',
        },
        nextSteps: {
          en: 'Go to the nearest hospital with admission capacity NOW. Do not wait. Bring all medicines you are currently taking. If pregnant or with a child, tell the staff immediately — they need to be triaged first.',
          sw: 'Nenda hospitali ya karibu yenye uwezo wa kulaza SASA. Usisubiri. Lete dawa zote unazotumia. Kama una mimba au pamoja na mtoto, mwambie mfanyakazi mara moja — wanahitaji kutibiwa kwanza.',
          sw_mtaa: 'Nenda hospitali ya karibu yenye uwezo wa kulaza SASA. Usisubiri. Lete dawa zote unazotumia. Kama una mimba au pamoja na mtoto, mwambie staff mara moja — wanahitaji kutibiwa kwanza.',
        },
        urgency: 'emergency',
      };
    }

    if (context === 'recent_treatment') {
      return {
        result,
        context,
        headline: {
          en: 'mRDT is POSITIVE — but you were recently treated. This may not mean active infection.',
          sw: 'mRDT ni POSITIVE — lakini ulitibiwa hivi karibuni. Hii inaweza isimaanishe maambukizi hai.',
          sw_mtaa: 'mRDT ni POSITIVE — lakini ulitibiwa hivi karibuni. Inaweza isiwe maambukizi hai.',
        },
        meaning: {
          en: 'mRDT can remain positive for 2-6 weeks after successful malaria treatment because it detects parasite proteins that linger in the blood even after the parasite is dead. If you completed your full ALu course and feel well, this is likely "antigen persistence," not a new infection. But if you have new fever or symptoms, it may be treatment failure or reinfection — which DOES need new treatment.',
          sw: 'mRDT inaweza kubaki chanya kwa wiki 2-6 baada ya matibabu ya malaria yaliyofanikiwa kwa sababu inagundua protini za vimelea ambazo zinakaa kwenye damu hata baada ya vimelea kufa. Ikiwa ulimaliza kozi yako yote ya ALu na unajisikia vizuri, hii pengine ni "antigen persistence," sio maambukizi mapya. Lakini ikiwa una homa mpya au dalili, inaweza kuwa kushindwa kwa matibabu au reinfection — ambayo INAHITAJI matibabu mapya.',
          sw_mtaa: 'mRDT inaweza kubaki positive kwa wiki 2-6 baada ya matibabu ya malaria yaliyofaulu kwa sababu inagundua protini za vimelea ambazo zinakaa kwenye damu hata baada ya vimelea kufa. Ikiwa ulimaliza kozi yote ya ALu na unajisikia poa, hii pengine ni "antigen persistence," sio maambukizi mapya. Lakini ukiwa na homa mpya au dalili mpya, inaweza kuwa treatment failure au reinfection — ambayo INAHITAJI matibabu mapya.',
        },
        nextSteps: {
          en: 'Ask the clinician to confirm with microscopy (blood smear). Microscopy actually sees the live parasites — if the smear is negative, the positive mRDT is likely just residual antigen and you do NOT need re-treatment. If the smear is positive, you do need treatment, and the clinician will choose the right drug based on which one you took before.',
          sw: 'Mwombe daktari athibitishe kwa darubini (smear ya damu). Darubini inaona vimelea hai — ikiwa smear ni negative, mRDT chanya pengine ni antigen iliyobaki tu na HUHITAJI matibabu tena. Ikiwa smear ni chanya, unahitaji matibabu, na daktari atachagua dawa sahihi kulingana na ulichotumia hapo awali.',
          sw_mtaa: 'Mwombe daktari athibitishe kwa darubini (smear ya damu). Darubini inaona vimelea hai — ikiwa smear ni negative, mRDT positive pengine ni antigen iliyobaki tu na HUHITAJI matibabu tena. Ikiwa smear ni positive, unahitaji matibabu, na daktari atachagua dawa sahihi kulingana na ulichotumia hapo awali.',
        },
        urgency: 'urgent',
      };
    }

    // Standard positive — symptomatic, no recent treatment, no severe signs
    return {
      result,
      context,
      headline: {
        en: 'mRDT is POSITIVE — you have malaria.',
        sw: 'mRDT ni POSITIVE — una malaria.',
        sw_mtaa: 'mRDT ni POSITIVE — una malaria.',
      },
      meaning: {
        en: 'A positive mRDT means malaria parasite antigens were detected in your blood. In someone with fever and no recent treatment, this confirms malaria. In Tanzania, the standard treatment is ALu (artemether-lumefantrine) — 6 doses over 3 days, taken with fatty food. Most people start feeling better within 24-48 hours. The full course must be completed even if you feel better.',
        sw: 'mRDT chanya maana yake antijeni za vimelea vya malaria zilipatikana kwenye damu yako. Kwa mtu mwenye homa na bila matibabu ya hivi karibuni, hii inathibitisha malaria. Tanzania, matibabu ya kawaida ni ALu (artemether-lumefantrine) — dose 6 kwa siku 3, zinazochukuliwa pamoja na chakula chenye mafuta. Watu wengi wanaanza kujisikia vizuri ndani ya masaa 24-48. Kozi nzima lazima imalizwe hata ukijisikia vizuri.',
        sw_mtaa: 'mRDT positive maana yake antijeni za vimelea vya malaria zilipatikana kwenye damu yako. Kwa mtu mwenye homa na bila matibabu ya hivi karibuni, hii inathibitisha malaria. Tanzania, matibabu ya kawaida ni ALu (Coartem) — dose 6 kwa siku 3, pamoja na chakula chenye mafuta. Wengi wanaanza kujisikia poa ndani ya masaa 24-48. Maliza dose zote 6 hata ukijisikia poa.',
      },
      nextSteps: {
        en: 'Start ALu the same day if not already prescribed. Take it with milk or fatty food. Drink plenty of fluids. Take paracetamol for fever if needed. Watch for danger signs (cannot drink, repeated vomiting, confusion, convulsions, very pale, severe weakness, fast breathing) — these mean go to hospital immediately. If you do not feel improvement after 48 hours, return to the clinic.',
        sw: 'Anza ALu siku ile ile kama haijaagizwa. Tumia pamoja na maziwa au chakula chenye mafuta. Kunywa vimiminika vingi. Tumia paracetamol kwa homa ikiwa inahitajika. Angalia dalili za hatari (kushindwa kunywa, kutapika mara kwa mara, kuchanganyikiwa, kifafa, weupe mkubwa, udhaifu mkubwa, kupumua haraka) — hizi maana yake nenda hospitali mara moja. Kama haujisiki kuboreka baada ya masaa 48, rudi kliniki.',
        sw_mtaa: 'Anza ALu siku ile ile kama haijaagizwa. Tumia pamoja na maziwa au chakula chenye mafuta. Kunywa maji mengi. Tumia paracetamol kwa homa ikiwa inahitajika. Angalia dalili za hatari (kushindwa kunywa, kutapika mara kwa mara, kuchanganyikiwa, kifafa, weupe mkubwa, udhaifu mkubwa, kupumua haraka) — hizi maana yake nenda hospitali mara moja. Kama haujisikii kuboreka baada ya masaa 48, rudi kliniki.',
      },
      urgency: 'soon',
    };
  }

  // Negative result
  if (result === 'negative') {
    if (context === 'fever_current' || context === 'severe_symptoms') {
      return {
        result,
        context,
        headline: {
          en: 'mRDT is NEGATIVE — but you have fever. Something else is causing it.',
          sw: 'mRDT ni NEGATIVE — lakini una homa. Kitu kingine kinaisababisha.',
          sw_mtaa: 'mRDT ni NEGATIVE — lakini una homa. Kitu kingine kinaisababisha.',
        },
        meaning: {
          en: 'A negative mRDT in someone with fever does not mean nothing is wrong — it means malaria is unlikely the cause. Other common causes of fever in Tanzania: typhoid (Salmonella), bacterial pneumonia, urinary tract infection, viral illnesses (including COVID), early dengue, brucellosis, leptospirosis. mRDT can rarely miss very early malaria (parasites too few to detect), low-grade Plasmodium ovale or vivax infection, or in HIV with very low immunity. If fever persists, the cause needs to be found.',
          sw: 'mRDT negative kwa mtu mwenye homa haimaanishi hakuna kitu — inamaanisha malaria pengine sio sababu. Sababu nyingine za kawaida za homa Tanzania: typhoid (Salmonella), nimonia ya bakteria, maambukizi ya njia ya mkojo (UTI), magonjwa ya virusi (ikiwemo COVID), dengue ya mapema, brucellosis, leptospirosis. mRDT inaweza nadra kupoteza malaria ya mapema sana (vimelea vidogo kupatikana), maambukizi ya kiwango cha chini ya Plasmodium ovale au vivax, au katika VVU yenye kinga ya chini sana. Ikiwa homa inaendelea, sababu inahitaji kupatikana.',
          sw_mtaa: 'mRDT negative kwa mtu mwenye homa haimaanishi hakuna kitu — inamaanisha malaria pengine sio sababu. Sababu nyingine za kawaida za homa Tanzania: typhoid (homa ya matumbo), nimonia ya bakteria, UTI, virusi (pamoja na COVID), dengue ya mapema, brucellosis, leptospirosis. mRDT inaweza nadra kukosa malaria ya mapema sana (vimelea vidogo kupatikana), au katika VVU yenye kinga ya chini sana. Ikiwa homa inaendelea, sababu inahitaji kupatikana.',
        },
        nextSteps: {
          en: 'Do not start anti-malarial drugs — they will not help and may delay the real diagnosis. The clinician should examine you (lungs, abdomen, throat, urine), and may order additional tests based on what is found: full blood count, urine test, chest X-ray, blood cultures, Widal test, or COVID test. If fever persists for more than 3 days, return — sometimes a second mRDT or microscopy is done to catch a malaria that was missed.',
          sw: 'Usianzishe dawa za malaria — hazitasaidia na zinaweza kuchelewesha utambuzi halisi. Daktari atakuchunguza (mapafu, tumbo, koo, mkojo), na anaweza kuagiza vipimo vingine kulingana na kile kinachopatikana: hesabu kamili ya damu, kipimo cha mkojo, X-ray ya kifua, vipimo vya damu, Widal, au COVID. Ikiwa homa inaendelea kwa zaidi ya siku 3, rudi — wakati mwingine mRDT ya pili au darubini hufanywa kukamata malaria iliyokosekana.',
          sw_mtaa: 'Usianzishe dawa za malaria — hazitasaidia na zinaweza kuchelewesha utambuzi halisi. Daktari atakuchunguza (mapafu, tumbo, koo, mkojo), na anaweza kuagiza vipimo vingine: CBC, kipimo cha mkojo, X-ray ya kifua, blood cultures, Widal, au COVID test. Ikiwa homa inaendelea zaidi ya siku 3, rudi — wakati mwingine mRDT ya pili au darubini hufanywa kukamata malaria iliyokosekana.',
        },
        urgency: context === 'severe_symptoms' ? 'urgent' : 'soon',
      };
    }

    // Negative + asymptomatic
    return {
      result,
      context,
      headline: {
        en: 'mRDT is NEGATIVE — no malaria detected.',
        sw: 'mRDT ni NEGATIVE — hakuna malaria iliyogundulika.',
        sw_mtaa: 'mRDT ni NEGATIVE — hakuna malaria iliyogundulika.',
      },
      meaning: {
        en: 'A negative mRDT in someone without symptoms is reassuring. mRDT does not screen well for very low parasite densities, so in high-transmission areas a negative result in a healthy person does not "prove" you have no parasites — but it does mean you are not currently sick with malaria.',
        sw: 'mRDT negative kwa mtu asiye na dalili ni hakikisho. mRDT haichunguzi vizuri kwa idadi ya chini sana ya vimelea, hivyo katika maeneo ya maambukizi mengi matokeo negative kwa mtu mwenye afya hayathibitishi kuwa huna vimelea — lakini yanamaanisha hauko mgonjwa wa malaria sasa.',
        sw_mtaa: 'mRDT negative kwa mtu asiye na dalili ni hakikisho. mRDT haichunguzi vizuri kwa idadi ya chini sana ya vimelea, hivyo katika maeneo ya malaria mengi, matokeo negative kwa mtu mwenye afya hayathibitishi kuwa huna vimelea — lakini yanamaanisha hauko mgonjwa wa malaria sasa.',
      },
      nextSteps: {
        en: 'Continue prevention measures: sleep under a bed net every night, finish any prophylaxis if prescribed (pregnancy IPTp, sickle cell, traveller). If you develop fever or other symptoms in the future, get re-tested — do not assume "I tested negative once so I do not have malaria."',
        sw: 'Endelea hatua za kuzuia: lala chini ya chandarua kila usiku, malizia prophylaxis yoyote ikiwa umeagizwa (IPTp ya mimba, sickle cell, msafiri). Ikiwa unapata homa au dalili nyingine baadaye, jipime tena — usidhanie "nilipima negative mara moja hivyo sina malaria."',
        sw_mtaa: 'Endelea hatua za kuzuia: lala chini ya chandarua kila usiku, malizia prophylaxis ikiwa umeagizwa (IPTp ya mimba, sickle cell, msafiri). Ukiwa na homa au dalili nyingine baadaye, jipime tena — usidhanie "nilipima negative mara moja hivyo sina malaria."',
      },
      urgency: 'info',
    };
  }

  // Invalid result
  return {
    result,
    context,
    headline: {
      en: 'mRDT result is INVALID — the test must be repeated.',
      sw: 'Matokeo ya mRDT ni INVALID — kipimo kinatakiwa kurudiwa.',
      sw_mtaa: 'Matokeo ya mRDT ni INVALID — kipimo kinatakiwa kurudiwa.',
    },
    meaning: {
      en: 'An invalid mRDT means the control line did not appear — the test did not work properly. This can happen if too little or too much blood was added, the test expired, or the buffer was wrong. The test cannot tell us anything about your malaria status.',
      sw: 'mRDT invalid maana yake mstari wa kudhibiti haukuonekana — kipimo hakikufanya kazi vizuri. Hii inaweza kutokea ikiwa damu kidogo sana au nyingi ilipowekwa, kipimo kimekwisha muda, au buffer ilikuwa si sahihi. Kipimo hakiwezi kutuambia chochote kuhusu hali yako ya malaria.',
      sw_mtaa: 'mRDT invalid maana yake control line haikujionyesha — test haikufanya kazi vizuri. Inaweza kutokea kama damu ilikuwa kidogo sana au nyingi, test imekwisha muda, au buffer haikuwa sahihi. Test haiwezi kutuambia chochote kuhusu malaria yako.',
    },
    nextSteps: {
      en: 'Repeat the test with a new mRDT cassette. If invalid again, request microscopy (a blood smear examined under a microscope) — this is the gold standard and not subject to the same failures.',
      sw: 'Rudia kipimo na mRDT mpya. Ikiwa invalid tena, omba darubini (smear ya damu inayochunguzwa chini ya darubini) — hii ni kiwango cha juu zaidi na haina matatizo yale yale.',
      sw_mtaa: 'Rudia kipimo na mRDT mpya. Ikiwa invalid tena, omba darubini (smear ya damu chini ya microscope) — hii ni gold standard na haina matatizo yale yale.',
    },
    urgency: 'soon',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE
// ──────────────────────────────────────────────────────────────────────

export const MRDT: LabKnowledge = {
  id: 'mrdt',
  aliases: LAB_ALIASES.mrdt,
  unit: 'qualitative',  // not numeric

  whatItMeasures: {
    en: 'The Malaria Rapid Diagnostic Test (mRDT) detects malaria parasite proteins in a small drop of blood from your finger. Most mRDTs in Tanzania detect Plasmodium falciparum specifically (the most common and dangerous species locally). Some can also detect P. vivax, ovale, and malariae. Results appear within 15 minutes as colored bands on the test strip.',
    sw: 'mRDT (Kipimo cha Haraka cha Malaria) hugundua protini za vimelea vya malaria katika tone dogo la damu kutoka kidoleni. mRDT nyingi Tanzania zinagundua Plasmodium falciparum hasa (aina ya kawaida na hatari zaidi hapa). Baadhi pia zinaweza kugundua P. vivax, ovale, na malariae. Matokeo yanajitokeza ndani ya dakika 15 kama mistari ya rangi kwenye strip ya kipimo.',
    sw_mtaa: 'mRDT (Kipimo cha Haraka cha Malaria) hugundua protini za vimelea vya malaria katika tone dogo la damu kutoka kidoleni. mRDT nyingi Tanzania zinagundua Plasmodium falciparum hasa (aina ya kawaida na hatari zaidi). Baadhi pia zinaweza kugundua P. vivax, ovale, na malariae. Matokeo yanajitokeza ndani ya dakika 15 kama mistari ya rangi kwenye strip.',
  },

  whyItsOrdered: {
    en: 'Every fever in Tanzania should prompt a malaria test — this is national policy. mRDT is the test of first choice because it is fast (15 minutes), does not need a laboratory or electricity, can be done at the lowest-level facility, and is free or low-cost in public facilities. Microscopy (smear) is used to confirm difficult cases, monitor severe malaria, and check for treatment failure.',
    sw: 'Kila homa Tanzania inafaa kuchochea kipimo cha malaria — hii ni sera ya kitaifa. mRDT ni kipimo cha kwanza kwa sababu ni cha haraka (dakika 15), hakuhitaji maabara au umeme, kinaweza kufanywa kwenye kituo cha kiwango cha chini zaidi, na ni bure au cha bei nafuu katika vituo vya umma. Darubini (smear) hutumika kuthibitisha kesi ngumu, kufuatilia malaria kali, na kuangalia kushindwa kwa matibabu.',
    sw_mtaa: 'Kila homa Tanzania inafaa kuchochea kipimo cha malaria — hii ni sera ya kitaifa. mRDT ni kipimo cha kwanza kwa sababu ni cha haraka (dakika 15), hakuhitaji maabara au umeme, kinaweza kufanywa kwenye zahanati ndogo zaidi, na ni bure au cha bei nafuu vituo vya umma. Darubini (smear) hutumika kuthibitisha kesi ngumu, kufuatilia malaria kali, na kuangalia treatment failure.',
  },

  ranges: [
    // mRDT is qualitative — these are placeholders for type compliance.
    // Real interpretation happens via interpretMrdt() above.
    {
      applies: { sex: 'any' },
      normalLow: 0,  // negative
      normalHigh: 0, // negative
    },
  ],

  interpretations: [
    {
      band: 'normal',
      meaning: {
        en: 'mRDT negative — no malaria parasite antigens detected in the blood sample.',
        sw: 'mRDT negative — hakuna antijeni za vimelea vya malaria kupatikana kwenye sampuli ya damu.',
        sw_mtaa: 'mRDT negative — hakuna antijeni za vimelea vya malaria kupatikana kwenye damu.',
      },
      nextSteps: {
        en: 'If you have fever, look for another cause. If asymptomatic, continue prevention measures.',
        sw: 'Ikiwa una homa, tafuta sababu nyingine. Ikiwa huna dalili, endelea hatua za kuzuia.',
        sw_mtaa: 'Ikiwa una homa, tafuta sababu nyingine. Ikiwa huna dalili, endelea hatua za kuzuia.',
      },
      urgency: 'info',
    },
    {
      band: 'high',
      meaning: {
        en: 'mRDT positive — malaria parasite antigens detected. This usually means active malaria infection (but can be antigen persistence after recent treatment).',
        sw: 'mRDT chanya — antijeni za vimelea vya malaria zimepatikana. Hii kawaida maana yake maambukizi ya malaria hai (lakini inaweza kuwa antigen persistence baada ya matibabu ya hivi karibuni).',
        sw_mtaa: 'mRDT positive — antijeni za vimelea vya malaria zimepatikana. Hii kawaida maana yake maambukizi ya malaria hai (lakini inaweza kuwa antigen persistence baada ya matibabu ya hivi karibuni).',
      },
      nextSteps: {
        en: 'Begin ALu treatment same day in uncomplicated cases. Go to hospital if any danger signs are present. If recently treated, request microscopy to distinguish active infection from residual antigen.',
        sw: 'Anza matibabu ya ALu siku ile ile katika kesi za kawaida. Nenda hospitali ikiwa kuna dalili yoyote ya hatari. Ikiwa ulitibiwa hivi karibuni, omba darubini kutofautisha maambukizi hai kutoka kwa antigen iliyobaki.',
        sw_mtaa: 'Anza matibabu ya ALu siku ile ile katika kesi za kawaida. Nenda hospitali ikiwa kuna dalili yoyote ya hatari. Ikiwa ulitibiwa hivi karibuni, omba darubini kutofautisha maambukizi hai kutoka kwa antigen iliyobaki.',
      },
      urgency: 'soon',
    },
    {
      band: 'critical_high',
      meaning: {
        en: 'mRDT positive WITH danger signs — severe malaria. This is a medical emergency.',
        sw: 'mRDT chanya PAMOJA NA dalili za hatari — malaria kali. Hii ni dharura ya kimatibabu.',
        sw_mtaa: 'mRDT positive PAMOJA NA dalili za hatari — malaria kali. Hii ni dharura ya matibabu.',
      },
      nextSteps: {
        en: 'Go to the nearest hospital with admission capacity immediately. Severe malaria needs intravenous artesunate within hours.',
        sw: 'Nenda hospitali ya karibu yenye uwezo wa kulaza mara moja. Malaria kali inahitaji artesunate ya mishipa ndani ya masaa.',
        sw_mtaa: 'Nenda hospitali ya karibu yenye uwezo wa kulaza mara moja. Malaria kali inahitaji artesunate ya mishipa ndani ya masaa.',
      },
      urgency: 'emergency',
    },
  ],

  sources: [
    src('NMCP_MALARIA_2024'),
    src('WHO_MALARIA_2024'),
    src('IMCI_2024'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
