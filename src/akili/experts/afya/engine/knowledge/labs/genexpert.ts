/**
 * GeneXpert MTB/RIF — Lab Knowledge
 *
 * Qualitative molecular test (NAAT) that detects Mycobacterium tuberculosis
 * DNA in sputum or other clinical samples, and simultaneously screens for
 * rifampicin resistance (a marker for MDR-TB). Result in ~2 hours.
 *
 * Tanzania first-line diagnostic for TB since 2014 (NTLP). Increasingly
 * replaces sputum smear microscopy for initial diagnosis.
 *
 * Sources: NTLP Tanzania Manual 2024, WHO Consolidated TB Guidelines 2024,
 *          NTLG STG 2023, Muhimbili Protocols.
 *
 * Note: Like mRDT, GeneXpert has no numeric range — it is interpreted by
 * RESULT TYPE (4 possible outcomes) and CONTEXT (initial workup, treatment
 * failure suspicion, HIV co-infection, pediatric, contact screening).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { LabKnowledge, UrgencyLevel } from '../../types';
import { LAB_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

// ──────────────────────────────────────────────────────────────────────
// CONTEXT-AWARE INTERPRETATION
// ──────────────────────────────────────────────────────────────────────

export type GenexpertResult =
  | 'mtb_detected_rif_sensitive'   // TB found, rifampicin works
  | 'mtb_detected_rif_resistant'   // TB found, rifampicin resistant — MDR suspected
  | 'mtb_detected_rif_indeterminate' // TB found, RIF result unclear, retest
  | 'mtb_not_detected'              // No TB DNA above detection threshold
  | 'invalid';                      // Test failed, repeat needed

export type GenexpertContext =
  | 'initial_diagnosis'         // first workup for cough/symptoms
  | 'treatment_failure_workup'  // not improving / relapsed
  | 'hiv_coinfection'           // PLHIV with possible TB
  | 'pediatric_workup'          // child with suspected TB
  | 'contact_screening'         // household contact of TB case
  | 'unknown';

export interface GenexpertInterpretation {
  result: GenexpertResult;
  context: GenexpertContext;
  headline: { en: string; sw: string; sw_mtaa: string };
  meaning: { en: string; sw: string; sw_mtaa: string };
  nextSteps: { en: string; sw: string; sw_mtaa: string };
  urgency: UrgencyLevel;
}

export function interpretGenexpert(
  result: GenexpertResult,
  context: GenexpertContext = 'unknown',
): GenexpertInterpretation {
  // ── MTB DETECTED, RIFAMPICIN SENSITIVE — typical TB ────────────────
  if (result === 'mtb_detected_rif_sensitive') {
    if (context === 'treatment_failure_workup') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert detected TB and rifampicin still works — but TB has returned after prior treatment.',
          sw: 'GeneXpert imegundua TB na rifampicin bado inafanya kazi — lakini TB imerudi baada ya matibabu ya awali.',
          sw_mtaa: 'GeneXpert imegundua TB na rifampicin bado inafanya kazi — lakini TB imerudi baada ya matibabu ya awali.',
        },
        meaning: {
          en: 'A rifampicin-sensitive positive result during treatment failure workup usually means one of three things: (1) reinfection with a new TB strain, (2) suboptimal adherence to the first course (drug levels were never adequate), or (3) malabsorption issues. The bacterium is not resistant to rifampicin, which is good news — but full drug susceptibility testing is still needed because resistance to other drugs (isoniazid, ethambutol, pyrazinamide) might be missed by GeneXpert alone. Treatment may need to be restarted with the standard regimen, often under stricter DOT.',
          sw: 'Matokeo chanya yanayoshambulika na rifampicin wakati wa uchunguzi wa kushindwa kwa matibabu kwa kawaida humaanisha mojawapo ya mambo matatu: (1) kuambukizwa tena na aina mpya ya TB, (2) kutozingatia kikamilifu kwa kozi ya kwanza (viwango vya dawa havikuwa vya kutosha), au (3) matatizo ya kunyonyeshwa. Bakteria sio sugu kwa rifampicin, ambayo ni habari njema — lakini uchunguzi kamili wa kushambuliwa na dawa bado unahitajika kwa sababu upinzani dhidi ya dawa zingine (isoniazid, ethambutol, pyrazinamide) unaweza kukosa kuonekana na GeneXpert peke yake. Matibabu yanaweza kuhitaji kuanzishwa upya na regimen ya kawaida, mara nyingi chini ya DOT madhubuti zaidi.',
          sw_mtaa: 'Rif-sensitive positive wakati wa treatment failure workup kwa kawaida inamaanisha mojawapo ya mambo matatu: (1) reinfection na new TB strain, (2) suboptimal adherence kwa kozi ya kwanza (drug levels hazikuwa adequate), au (3) malabsorption issues. Bakteria sio sugu kwa rifampicin, ambayo ni habari njema — lakini full drug susceptibility testing bado inahitajika kwa sababu resistance dhidi ya dawa zingine (isoniazid, ethambutol, pyrazinamide) inaweza kukosa kuonekana na GeneXpert peke yake. Treatment inaweza kuhitaji kuanzishwa upya na standard regimen, mara nyingi chini ya stricter DOT.',
        },
        nextSteps: {
          en: 'Return to your DOT centre with this result. Drug susceptibility testing on first-line drugs will be ordered. Treatment is restarted under closer supervision. Honest disclosure of any missed doses helps the clinical team plan correctly.',
          sw: 'Rudi kituo chako cha DOT na matokeo haya. Uchunguzi wa kushambuliwa na dawa za awali utaombwa. Matibabu yatarudishwa chini ya usimamizi wa karibu zaidi. Ufichuzi wa uaminifu wa dose zilizokosa husaidia timu ya kliniki kupanga vizuri.',
          sw_mtaa: 'Rudi DOT centre yako na matokeo haya. Drug susceptibility testing kwenye first-line drugs zitaombwa. Treatment inaanzishwa upya chini ya closer supervision. Honest disclosure ya missed doses inasaidia clinical team kupanga vizuri.',
        },
        urgency: 'urgent',
      };
    }

    if (context === 'hiv_coinfection') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert confirms TB and rifampicin works — but you also have HIV, so integrated care is essential.',
          sw: 'GeneXpert inathibitisha TB na rifampicin inafanya kazi — lakini pia una VVU, hivyo huduma jumuishi ni muhimu.',
          sw_mtaa: 'GeneXpert inathibitisha TB na rifampicin inafanya kazi — lakini pia una VVU, hivyo integrated care ni muhimu.',
        },
        meaning: {
          en: 'Rifampicin-sensitive TB in a person with HIV is treatable with the standard 6-month RHZE regimen — but with three important additions: (1) Co-trimoxazole preventive therapy (CPT) — one tablet daily, prevents bacterial pneumonia and PCP. (2) ART started within 2 weeks if CD4<50, within 2-8 weeks otherwise. For TB meningitis, ART is delayed to 4-8 weeks. (3) The major drug interaction: rifampicin lowers dolutegravir (in TLD). The Tanzania solution is to give dolutegravir 50mg twice daily (instead of once daily) while on rifampicin, then back to once daily 2 weeks after rifampicin stops. Never stop ART.',
          sw: 'TB inayoshambulika na rifampicin kwa mtu mwenye VVU inatibika na regimen ya kawaida ya RHZE ya miezi 6 — lakini na nyongeza tatu muhimu: (1) Tiba ya kuzuia ya co-trimoxazole (CPT) — kidonge kimoja kila siku, huzuia bacterial pneumonia na PCP. (2) ART huanzishwa ndani ya wiki 2 ikiwa CD4<50, ndani ya wiki 2-8 vinginevyo. Kwa TB ya ubongo, ART huchelewa hadi wiki 4-8. (3) Mwingiliano mkubwa wa dawa: rifampicin inashusha dolutegravir (katika TLD). Suluhisho la Tanzania ni kutoa dolutegravir 50mg mara mbili kwa siku (badala ya mara moja kwa siku) ukiwa kwenye rifampicin, kisha kurudi mara moja kwa siku wiki 2 baada ya rifampicin kusimama. Kamwe usisimamishe ART.',
          sw_mtaa: 'Rif-sensitive TB kwa mtu mwenye VVU inatibika na standard 6-month RHZE regimen — lakini na nyongeza tatu muhimu: (1) Co-trimoxazole preventive therapy (CPT) — kidonge kimoja kila siku, inazuia bacterial pneumonia na PCP. (2) ART inaanzishwa ndani ya wiki 2 ikiwa CD4<50, ndani ya wiki 2-8 vinginevyo. Kwa TB meningitis, ART inacheleweshwa hadi wiki 4-8. (3) Major drug interaction: rifampicin inashusha dolutegravir (katika TLD). Tanzania solution ni kutoa dolutegravir 50mg mara mbili kwa siku (badala ya mara moja kwa siku) ukiwa kwenye rifampicin, halafu kurudi mara moja kwa siku wiki 2 baada ya rifampicin kusimama. KAMWE usisimamishe ART.',
        },
        nextSteps: {
          en: 'Start TB treatment at your DOT centre immediately. ART will be coordinated by the CTC — they will adjust dolutegravir dose. Take pyridoxine (vitamin B6) daily. Watch for IRIS (paradoxical worsening) in the first 6 weeks of ART — see clinician promptly if symptoms worsen on therapy.',
          sw: 'Anza matibabu ya TB katika kituo chako cha DOT mara moja. ART itaratibiwa na CTC — watarekebisha dose ya dolutegravir. Tumia pyridoxine (vitamin B6) kila siku. Angalia IRIS (kuzidi kwa paradoxical) katika wiki 6 za kwanza za ART — ona daktari haraka ikiwa dalili zinazidi kwenye tiba.',
          sw_mtaa: 'Anza TB treatment kwenye DOT centre yako mara moja. ART itacoordinated na CTC — watarekebisha dolutegravir dose. Tumia pyridoxine (vitamin B6) kila siku. Angalia IRIS (paradoxical worsening) katika wiki 6 za kwanza za ART — ona daktari haraka kama dalili zinazidi kwenye therapy.',
        },
        urgency: 'urgent',
      };
    }

    if (context === 'pediatric_workup') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert confirms TB in your child — and rifampicin works. Treatment is curable.',
          sw: 'GeneXpert imethibitisha TB kwa mtoto wako — na rifampicin inafanya kazi. Matibabu yanapona.',
          sw_mtaa: 'GeneXpert imethibitisha TB kwa mtoto wako — na rifampicin inafanya kazi. Matibabu yanapona.',
        },
        meaning: {
          en: 'A positive GeneXpert in a child is a meaningful diagnostic finding — sputum and other paediatric samples are often paucibacillary (low bacterial load), so detection here strongly supports treatment. Rifampicin-sensitive disease means the child can be treated with child-friendly dispersible fixed-dose combinations of RHZE. Treatment duration is 6 months for most pulmonary and lymph node TB, 9-12 months for bone TB or extensive disease, 12 months plus steroids for TB meningitis. Cure rates in children with drug-sensitive TB exceed 90% when treatment is completed.',
          sw: 'GeneXpert chanya kwa mtoto ni ugunduzi muhimu wa utambuzi — makohozi na sampuli zingine za watoto mara nyingi ni paucibacillary (mzigo mdogo wa bakteria), hivyo ugunduzi hapa unaunga mkono matibabu. Ugonjwa unaoshambulika na rifampicin unamaanisha mtoto anaweza kutibiwa kwa mchanganyiko wa fixed-dose unaoyeyuka unaofaa kwa watoto wa RHZE. Muda wa matibabu ni miezi 6 kwa TB nyingi ya mapafu na tezi za limfu, miezi 9-12 kwa TB ya mfupa au ugonjwa mkubwa, miezi 12 pamoja na steroids kwa TB ya ubongo. Viwango vya kupona kwa watoto na TB inayoshambulika na dawa vinazidi 90% wakati matibabu yanakamilika.',
          sw_mtaa: 'Positive GeneXpert kwa mtoto ni meaningful diagnostic finding — sputum na pediatric samples zingine mara nyingi ni paucibacillary (low bacterial load), hivyo detection hapa inasupport treatment. Rif-sensitive disease maana yake mtoto anaweza kutibiwa kwa child-friendly dispersible fixed-dose combinations za RHZE. Treatment duration ni miezi 6 kwa pulmonary na lymph node TB nyingi, miezi 9-12 kwa bone TB au extensive disease, miezi 12 pamoja na steroids kwa TB meningitis. Cure rates kwa watoto na drug-sensitive TB zinazidi 90% wakati treatment inakamilika.',
        },
        nextSteps: {
          en: 'Start treatment at the DOT centre with weight-banded pediatric fixed-dose tablets. Screen all household contacts: adults via sputum, under-5 children with skin test and X-ray, and offer IPT to under-5 contacts. Monitor growth weekly. Watch for any worsening, breathing problems, or neurological symptoms and report immediately.',
          sw: 'Anza matibabu katika kituo cha DOT na vidonge vya fixed-dose vya watoto kwa uzito. Chunguza watu wote wa kaya: watu wazima kupitia makohozi, watoto chini ya miaka 5 na skin test na X-ray, na utoe IPT kwa watu wa karibu chini ya miaka 5. Fuatilia ukuaji kila wiki. Angalia kuzidi kwa lolote, matatizo ya kupumua, au dalili za neva na ripoti mara moja.',
          sw_mtaa: 'Anza treatment kwenye DOT centre na weight-banded pediatric fixed-dose tablets. Chunguza household contacts wote: adults kupitia sputum, under-5 children na skin test na X-ray, na utoe IPT kwa under-5 contacts. Fuatilia ukuaji kila wiki. Angalia kuzidi kwa lolote, breathing problems, au neurological symptoms na ripoti mara moja.',
        },
        urgency: 'urgent',
      };
    }

    // initial_diagnosis or unknown
    return {
      result,
      context,
      headline: {
        en: 'GeneXpert detected TB and rifampicin works — treatment can start.',
        sw: 'GeneXpert imegundua TB na rifampicin inafanya kazi — matibabu yanaweza kuanza.',
        sw_mtaa: 'GeneXpert imegundua TB na rifampicin inafanya kazi — matibabu yanaweza kuanza.',
      },
      meaning: {
        en: 'The test confirms tuberculosis bacteria in your sample and shows that rifampicin (a key first-line drug) will work against them. This is the most common and most treatable form of TB. The standard regimen is RHZE for 6 months: 4 drugs for the first 2 months (intensive phase), then 2 drugs for the remaining 4 months (continuation phase). Drugs are free at NTLP-supported DOT centres. Cure rate exceeds 85% when treatment is completed. The risk now is stopping early — the bacterium needs the full 6 months to be killed.',
        sw: 'Kipimo kinathibitisha bakteria wa kifua kikuu katika sampuli yako na kinaonyesha kuwa rifampicin (dawa muhimu ya awali) itafanya kazi dhidi yao. Hii ni aina ya kawaida zaidi na inayotibika zaidi ya TB. Regimen ya kawaida ni RHZE kwa miezi 6: dawa 4 kwa miezi 2 ya kwanza (hatua kali), kisha dawa 2 kwa miezi 4 iliyobaki (hatua ya kuendelea). Dawa ni bure katika vituo vya DOT vinavyoungwa mkono na NTLP. Kiwango cha kupona kinazidi 85% wakati matibabu yanakamilika. Hatari sasa ni kusimama mapema — bakteria anahitaji miezi 6 kamili kuuawa.',
        sw_mtaa: 'Kipimo kinathibitisha bakteria wa kifua kikuu katika sampuli yako na kinaonyesha kuwa rifampicin (key first-line drug) itafanya kazi dhidi yao. Hii ni aina ya kawaida zaidi na inayotibika zaidi ya TB. Standard regimen ni RHZE kwa miezi 6: dawa 4 kwa miezi 2 ya kwanza (intensive phase), kisha dawa 2 kwa miezi 4 iliyobaki (continuation phase). Dawa ni bure katika DOT centres za NTLP. Cure rate inazidi 85% wakati treatment inakamilika. Risk sasa ni kusimama mapema — bakteria anahitaji miezi 6 kamili kuuawa.',
      },
      nextSteps: {
        en: 'Register at your nearest NTLP-supported DOT centre to start treatment. Also get tested for HIV (offered free), and screen for diabetes and blood pressure. Bring all household contacts (especially under-5 children and HIV-positive members) for screening. Tell your DOT clinician about all medicines and conditions, especially HIV, diabetes, hormonal contraception, alcohol use, and pregnancy plans.',
        sw: 'Jisajili katika kituo chako cha karibu cha DOT cha NTLP kuanza matibabu. Pia pima VVU (hutolewa bure), na chunguza kisukari na shinikizo la damu. Lete watu wote wa kaya (hasa watoto chini ya miaka 5 na wanafamilia wenye VVU) kwa uchunguzi. Mwambie daktari wako wa DOT kuhusu dawa zote na hali, hasa VVU, kisukari, vidhibiti vya mimba vya homoni, matumizi ya pombe, na mipango ya mimba.',
        sw_mtaa: 'Jisajili kwenye DOT centre yako ya karibu ya NTLP kuanza treatment. Pia pima VVU (inatolewa bure), na chunguza kisukari na shinikizo la damu. Lete household contacts wote (hasa under-5 watoto na HIV-positive members) kwa screening. Mwambie DOT clinician yako kuhusu dawa zote na conditions, hasa VVU, kisukari, hormonal contraception, alcohol use, na pregnancy plans.',
      },
      urgency: 'urgent',
    };
  }

  // ── MTB DETECTED, RIFAMPICIN RESISTANT — MDR-TB SUSPECTED ──────────
  if (result === 'mtb_detected_rif_resistant') {
    return {
      result,
      context,
      headline: {
        en: 'GeneXpert detected TB AND rifampicin resistance — this signals MDR-TB. Urgent specialist referral needed.',
        sw: 'GeneXpert imegundua TB NA upinzani wa rifampicin — hii inaonyesha MDR-TB. Rufaa ya haraka ya mtaalamu inahitajika.',
        sw_mtaa: 'GeneXpert imegundua TB NA rifampicin resistance — hii inaonyesha MDR-TB. Urgent specialist referral inahitajika.',
      },
      meaning: {
        en: 'Rifampicin is one of the two most powerful first-line TB drugs. Resistance to rifampicin almost always means resistance to isoniazid too, which together defines MDR-TB (multidrug-resistant TB). Standard RHZE will NOT cure MDR-TB — and giving it can worsen resistance. Treatment requires specialised regimens (often 9-24 months, with newer shorter regimens like BPaL/BPaLM increasingly available) and management at a designated MDR-TB centre. In Tanzania, the main centres are Muhimbili, KCMC, and Mbeya, with additional regional sites. Cure rates have improved to 70-80% with newer drugs but treatment is still tough.',
        sw: 'Rifampicin ni mojawapo ya dawa mbili zenye nguvu zaidi za first-line za TB. Upinzani dhidi ya rifampicin karibu kila wakati humaanisha upinzani dhidi ya isoniazid pia, ambayo pamoja hufafanua MDR-TB (TB inayopinga dawa nyingi). RHZE ya kawaida HAITAPONA MDR-TB — na kuitoa kunaweza kuzidisha upinzani. Matibabu yanahitaji regimens maalum (mara nyingi miezi 9-24, na regimens mpya fupi kama BPaL/BPaLM zinazidi kupatikana) na usimamizi katika kituo kilichoteuliwa cha MDR-TB. Tanzania, vituo vikuu ni Muhimbili, KCMC, na Mbeya, na maeneo ya ziada ya kikanda. Viwango vya kupona vimeboresha hadi 70-80% kwa dawa mpya lakini matibabu bado ni magumu.',
        sw_mtaa: 'Rifampicin ni mojawapo ya first-line TB drugs mbili zenye nguvu zaidi. Resistance dhidi ya rifampicin karibu kila wakati inamaanisha resistance dhidi ya isoniazid pia, ambayo pamoja inafafanua MDR-TB (multidrug-resistant TB). Standard RHZE HAITAPONA MDR-TB — na kuitoa kunaweza kuzidisha resistance. Treatment inahitaji specialised regimens (mara nyingi miezi 9-24, na newer shorter regimens kama BPaL/BPaLM zinazidi kupatikana) na management kwenye designated MDR-TB centre. Tanzania, main centres ni Muhimbili, KCMC, na Mbeya, na maeneo ya ziada ya kikanda. Cure rates zimeboresha hadi 70-80% kwa newer drugs lakini treatment bado ni mgumu.',
      },
      nextSteps: {
        en: 'Do NOT start standard RHZE. Your DOT clinician will arrange urgent referral to an MDR-TB centre. Further drug susceptibility testing (second-line LPA or culture-based DST) will guide the regimen. While awaiting referral: isolate at home (open windows, sleep alone, wear mask near vulnerable people), screen close contacts, get HIV tested. Counselling, mental health support, and family support are essential — MDR-TB treatment is long and tough. You are not alone — Tanzania has experienced MDR-TB teams.',
        sw: 'USIANZE RHZE ya kawaida. Daktari wako wa DOT atapanga rufaa ya haraka kwa kituo cha MDR-TB. Uchunguzi zaidi wa kushambuliwa na dawa (second-line LPA au DST inayotegemea utamaduni) utaongoza regimen. Wakati unasubiri rufaa: jitenge nyumbani (fungua madirisha, lala peke yako, vaa barakoa karibu na watu hatarini), chunguza watu wa karibu, pima VVU. Ushauri, msaada wa afya ya akili, na msaada wa familia ni muhimu — matibabu ya MDR-TB ni marefu na magumu. Hauko peke yako — Tanzania ina timu zenye uzoefu za MDR-TB.',
        sw_mtaa: 'USIANZE standard RHZE. DOT clinician wako atapanga urgent referral kwa MDR-TB centre. Further drug susceptibility testing (second-line LPA au culture-based DST) itaongoza regimen. Wakati unasubiri referral: jitenge nyumbani (fungua madirisha, lala peke yako, vaa barakoa karibu na watu hatarini), chunguza close contacts, pima VVU. Counselling, mental health support, na family support ni muhimu — MDR-TB treatment ni ndefu na mgumu. Hauko peke yako — Tanzania ina experienced MDR-TB teams.',
      },
      urgency: 'urgent',
    };
  }

  // ── MTB DETECTED, RIFAMPICIN RESULT INDETERMINATE ──────────────────
  if (result === 'mtb_detected_rif_indeterminate') {
    return {
      result,
      context,
      headline: {
        en: 'GeneXpert detected TB but the rifampicin result is unclear — repeat testing needed.',
        sw: 'GeneXpert imegundua TB lakini matokeo ya rifampicin hayako wazi — uchunguzi tena unahitajika.',
        sw_mtaa: 'GeneXpert imegundua TB lakini matokeo ya rifampicin hayako wazi — uchunguzi tena unahitajika.',
      },
      meaning: {
        en: 'TB is confirmed, but the rifampicin resistance result was indeterminate — meaning the machine could not reliably tell whether rifampicin will work. This can happen with very low bacterial loads or technical issues. A repeat sputum sample with full drug susceptibility testing is needed before deciding regimen. In the meantime, your clinician may start RHZE empirically if MDR-TB risk is low (no contact history, no prior treatment), or refer to MDR-TB workup if risk is high.',
        sw: 'TB imethibitishwa, lakini matokeo ya upinzani wa rifampicin yalikuwa hayako wazi — maana yake mashine haikuweza kueleza kwa uhakika kama rifampicin itafanya kazi. Hii inaweza kutokea na mizigo midogo sana ya bakteria au matatizo ya kiufundi. Sampuli ya makohozi inayorudiwa na uchunguzi kamili wa kushambuliwa na dawa inahitajika kabla ya kuamua regimen. Wakati huo, daktari wako anaweza kuanza RHZE kwa empiric ikiwa hatari ya MDR-TB iko chini (hakuna historia ya kuwasiliana, hakuna matibabu ya awali), au kupeleka kwa uchunguzi wa MDR-TB ikiwa hatari iko juu.',
        sw_mtaa: 'TB imethibitishwa, lakini rifampicin resistance result ilikuwa indeterminate — maana yake machine haikuweza kueleza kwa uhakika kama rifampicin itafanya kazi. Hii inaweza kutokea na very low bacterial loads au technical issues. Repeat sputum sample na full drug susceptibility testing inahitajika kabla ya kuamua regimen. Wakati huo, clinician wako anaweza kuanza RHZE empirically kama MDR-TB risk iko chini (no contact history, no prior treatment), au kupeleka kwa MDR-TB workup kama risk iko juu.',
      },
      nextSteps: {
        en: 'Give another sputum sample at the DOT centre. Drug susceptibility testing will be requested. Your clinician will decide whether to start treatment now or wait based on your risk factors. Be honest about prior TB treatment and contact history.',
        sw: 'Toa sampuli nyingine ya makohozi katika kituo cha DOT. Uchunguzi wa kushambuliwa na dawa utaombwa. Daktari wako ataamua kuanza matibabu sasa au kusubiri kulingana na sababu zako za hatari. Kuwa mkweli kuhusu matibabu ya awali ya TB na historia ya kuwasiliana.',
        sw_mtaa: 'Toa sputum sample nyingine kwenye DOT centre. Drug susceptibility testing itaombwa. Clinician wako ataamua kuanza treatment sasa au kusubiri kulingana na risk factors zako. Kuwa honest kuhusu prior TB treatment na contact history.',
      },
      urgency: 'urgent',
    };
  }

  // ── MTB NOT DETECTED — but context shapes interpretation ───────────
  if (result === 'mtb_not_detected') {
    if (context === 'hiv_coinfection') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert did not detect TB — but in HIV, this does NOT rule it out. Further workup may be needed.',
          sw: 'GeneXpert haikugundua TB — lakini katika VVU, hii HAINA maana kuwa hakuna TB. Uchunguzi zaidi unaweza kuhitajika.',
          sw_mtaa: 'GeneXpert haikugundua TB — lakini katika VVU, hii HAIONDOI TB. Further workup inaweza kuhitajika.',
        },
        meaning: {
          en: 'In people with HIV, especially with CD4<200, TB can be present even when GeneXpert on sputum is negative. The bacterial load may be low, the sputum sample may be inadequate, or the TB may be entirely extrapulmonary (lymph node, miliary, meningitis, abdominal). Additional investigations to consider: urine LF-LAM (more sensitive in advanced HIV), repeat or induced sputum, chest X-ray, lymph node biopsy if any nodes are enlarged, lumbar puncture if neurologic symptoms. Empirical TB treatment is sometimes started in severely unwell HIV patients with high clinical suspicion despite negative tests.',
          sw: 'Kwa watu wenye VVU, hasa na CD4<200, TB inaweza kuwepo hata wakati GeneXpert kwenye makohozi ni negative. Mzigo wa bakteria unaweza kuwa mdogo, sampuli ya makohozi inaweza kuwa haitoshi, au TB inaweza kuwa kabisa nje ya mapafu (tezi za limfu, miliary, ubongo, tumbo). Uchunguzi wa ziada wa kuzingatia: urine LF-LAM (nyeti zaidi katika VVU iliyokomaa), makohozi yanayorudiwa au yaliyochochewa, X-ray ya kifua, biopsy ya tezi ya limfu ikiwa kuna tezi kubwa, lumbar puncture ikiwa kuna dalili za neva. Matibabu ya TB ya empirical wakati mwingine huanzishwa kwa wagonjwa wenye VVU walio wagonjwa sana na shaka kubwa ya kliniki licha ya vipimo negative.',
          sw_mtaa: 'Kwa watu wenye VVU, hasa na CD4<200, TB inaweza kuwepo hata wakati GeneXpert kwenye sputum ni negative. Bacterial load inaweza kuwa low, sputum sample inaweza kuwa inadequate, au TB inaweza kuwa kabisa extrapulmonary (lymph node, miliary, meningitis, abdominal). Additional investigations za kuzingatia: urine LF-LAM (more sensitive katika advanced HIV), repeat au induced sputum, chest X-ray, lymph node biopsy kama kuna nodes kubwa, lumbar puncture kama una neurologic symptoms. Empirical TB treatment wakati mwingine inaanzishwa kwa severely unwell HIV patients na high clinical suspicion licha ya negative tests.',
        },
        nextSteps: {
          en: 'Discuss with your clinician — additional tests are often needed in HIV with TB symptoms. Symptoms to keep watching: cough that persists or worsens, night sweats, weight loss, fever, lymph node enlargement, severe headache. Return for review if symptoms continue. Optimise HIV care: take ART daily, take co-trimoxazole if prescribed, monitor CD4 and viral load.',
          sw: 'Jadili na daktari wako — vipimo vya ziada mara nyingi vinahitajika katika VVU yenye dalili za TB. Dalili za kuendelea kuangalia: kikohozi kinachoendelea au kuzidi, jasho la usiku, kupungua uzito, homa, tezi za limfu kukua, kichwa kikali. Rudi kwa ukaguzi ikiwa dalili zinaendelea. Boresha huduma ya VVU: tumia ART kila siku, tumia co-trimoxazole ikiwa imeagizwa, fuatilia CD4 na viral load.',
          sw_mtaa: 'Jadili na clinician wako — additional tests mara nyingi zinahitajika katika VVU yenye TB symptoms. Symptoms za kuendelea kuangalia: kikohozi kinachoendelea au kuzidi, night sweats, weight loss, homa, lymph node enlargement, severe headache. Rudi kwa review kama symptoms zinaendelea. Optimise HIV care: tumia ART kila siku, tumia co-trimoxazole kama imeagizwa, fuatilia CD4 na viral load.',
        },
        urgency: 'soon',
      };
    }

    if (context === 'pediatric_workup') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert did not detect TB in the sample — but in children, this does NOT rule out TB.',
          sw: 'GeneXpert haikugundua TB katika sampuli — lakini kwa watoto, hii HAIONDOI TB.',
          sw_mtaa: 'GeneXpert haikugundua TB katika sample — lakini kwa watoto, hii HAIONDOI TB.',
        },
        meaning: {
          en: 'Pediatric TB is often paucibacillary — the bacterial load is too low for GeneXpert to detect. Children also frequently swallow rather than produce sputum, so gastric aspirate or induced sputum may be needed. The diagnosis in children often relies on a combination: clinical history (especially TB contact), physical exam, tuberculin skin test (TST) or IGRA, chest X-ray, and response to a trial of treatment. Do not consider the child "TB-free" based on a single negative GeneXpert if symptoms and contact history suggest TB.',
          sw: 'TB ya watoto mara nyingi ni paucibacillary — mzigo wa bakteria ni mdogo sana kwa GeneXpert kugundua. Watoto pia mara nyingi humeza badala ya kutoa makohozi, hivyo gastric aspirate au makohozi yaliyochochewa yanaweza kuhitajika. Utambuzi kwa watoto mara nyingi unategemea mchanganyiko: historia ya kliniki (hasa kuwasiliana na TB), uchunguzi wa kimwili, kipimo cha ngozi cha tuberculin (TST) au IGRA, X-ray ya kifua, na jibu kwa jaribio la matibabu. Usimchukulie mtoto "bila TB" kwa msingi wa GeneXpert moja negative ikiwa dalili na historia ya kuwasiliana zinaonyesha TB.',
          sw_mtaa: 'Pediatric TB mara nyingi ni paucibacillary — bacterial load ni low sana kwa GeneXpert kudetect. Watoto pia mara nyingi wanameza badala ya kutoa sputum, hivyo gastric aspirate au induced sputum inaweza kuhitajika. Diagnosis kwa watoto mara nyingi inategemea combination: clinical history (hasa TB contact), physical exam, tuberculin skin test (TST) au IGRA, chest X-ray, na response kwa trial ya treatment. Usimchukulie mtoto "TB-free" kwa msingi wa GeneXpert moja negative kama symptoms na contact history zinaonyesha TB.',
        },
        nextSteps: {
          en: 'Return to your DOT centre or pediatric clinic for full assessment. Bring TB exposure history (any household member with cough or TB). The clinician may order further tests, X-ray, or a trial of treatment if clinical suspicion is strong. Continue monitoring the child\'s weight and symptoms closely.',
          sw: 'Rudi katika kituo chako cha DOT au kliniki ya watoto kwa tathmini kamili. Lete historia ya kufichuliwa na TB (mwanafamilia yeyote mwenye kikohozi au TB). Daktari anaweza kuomba vipimo zaidi, X-ray, au jaribio la matibabu ikiwa shaka ya kliniki ni kubwa. Endelea kufuatilia uzito wa mtoto na dalili kwa karibu.',
          sw_mtaa: 'Rudi DOT centre yako au pediatric clinic kwa full assessment. Lete TB exposure history (household member yeyote na cough au TB). Clinician anaweza kuomba further tests, X-ray, au trial ya treatment kama clinical suspicion ni kubwa. Endelea kufuatilia uzito wa mtoto na symptoms kwa karibu.',
        },
        urgency: 'soon',
      };
    }

    if (context === 'contact_screening') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert did not detect TB — that is good news. But you may still have latent TB.',
          sw: 'GeneXpert haikugundua TB — hiyo ni habari njema. Lakini bado unaweza kuwa na TB iliyofichwa.',
          sw_mtaa: 'GeneXpert haikugundua TB — hiyo ni habari njema. Lakini bado unaweza kuwa na latent TB.',
        },
        meaning: {
          en: 'A negative GeneXpert in a contact screening means there is no active, infectious TB in your sputum at this time. That is reassuring — you are not infectious and treatment for active TB is not needed. However, GeneXpert does not detect latent TB infection (bacteria sleeping inside you without symptoms). Latent TB is checked with a tuberculin skin test (TST/Mantoux) or interferon-gamma release assay (IGRA). For high-risk contacts (under-5 children, HIV-positive, immunocompromised), preventive therapy (IPT or 3HP) may be offered even without skin test confirmation, because the benefit outweighs the risk.',
          sw: 'GeneXpert negative katika uchunguzi wa kuwasiliana inamaanisha hakuna TB hai inayoambukiza katika makohozi yako kwa wakati huu. Hiyo ni faraja — hauambukizi na matibabu ya TB hai hayahitajiki. Hata hivyo, GeneXpert haigundui maambukizi ya TB iliyofichwa (bakteria walalao ndani yako bila dalili). TB iliyofichwa huangaliwa kwa kipimo cha ngozi cha tuberculin (TST/Mantoux) au IGRA. Kwa watu wa karibu wa hatari kubwa (watoto chini ya miaka 5, wenye VVU, kinga iliyodhoofika), tiba ya kuzuia (IPT au 3HP) inaweza kutolewa hata bila uthibitisho wa kipimo cha ngozi, kwa sababu faida inazidi hatari.',
          sw_mtaa: 'Negative GeneXpert katika contact screening inamaanisha hakuna active, infectious TB katika sputum yako kwa wakati huu. Hiyo ni reassuring — hauambukizi na treatment ya active TB haihitajiki. Hata hivyo, GeneXpert haidetekti latent TB infection (bacteria walalao ndani yako bila symptoms). Latent TB inachecked kwa tuberculin skin test (TST/Mantoux) au IGRA. Kwa high-risk contacts (under-5 watoto, HIV-positive, immunocompromised), preventive therapy (IPT au 3HP) inaweza kutolewa hata bila skin test confirmation, kwa sababu benefit inazidi risk.',
        },
        nextSteps: {
          en: 'Continue monitoring for symptoms over the next 6-12 months (new cough, weight loss, night sweats) — return if any develop. If you are under 5, HIV-positive, or on immunosuppressive therapy, ask your clinician about IPT or 3HP preventive therapy. Strengthen household ventilation, encourage the index case to complete their treatment, and rescreen any new symptoms.',
          sw: 'Endelea kufuatilia dalili katika miezi 6-12 ijayo (kikohozi kipya, kupungua uzito, jasho la usiku) — rudi ikiwa yoyote inakua. Ikiwa una umri wa chini ya miaka 5, una VVU, au uko kwenye tiba ya kukandamiza kinga, muulize daktari wako kuhusu IPT au 3HP ya kuzuia. Imarisha mfumo wa hewa wa kaya, himiza kesi ya msingi kumaliza matibabu yao, na chunguza tena dalili zozote mpya.',
          sw_mtaa: 'Endelea kufuatilia symptoms katika miezi 6-12 ijayo (new cough, weight loss, night sweats) — rudi kama yoyote inakua. Kama una under 5, HIV-positive, au uko kwenye immunosuppressive therapy, muulize clinician wako kuhusu IPT au 3HP preventive therapy. Imarisha household ventilation, encourage index case kumaliza treatment yao, na rescreen any new symptoms.',
        },
        urgency: 'routine',
      };
    }

    if (context === 'treatment_failure_workup') {
      return {
        result,
        context,
        headline: {
          en: 'GeneXpert is negative — but your TB symptoms are not improving. Other causes need to be explored.',
          sw: 'GeneXpert ni negative — lakini dalili zako za TB hazipungui. Sababu zingine zinahitaji kuchunguzwa.',
          sw_mtaa: 'GeneXpert ni negative — lakini symptoms zako za TB hazipungui. Other causes zinahitaji kuchunguzwa.',
        },
        meaning: {
          en: 'A negative GeneXpert during treatment failure workup is informative — it suggests either: (1) treatment is working and bacteria have cleared but symptoms persist for other reasons (post-TB lung disease, secondary bacterial infection, paradoxical reaction in HIV, IRIS), (2) the current sample missed bacteria (the disease is paucibacillary, especially common in HIV), or (3) the underlying problem is NOT TB at all and another diagnosis is causing the symptoms. Further investigations: chest X-ray, full blood count, repeat sputum culture, screen for fungal infections (aspergilloma, Pneumocystis), lymph node biopsy if enlarged, lung scan if available.',
          sw: 'GeneXpert negative wakati wa uchunguzi wa kushindwa kwa matibabu inafundisha — inaonyesha kwamba: (1) matibabu yanafanya kazi na bakteria wamepunguzwa lakini dalili zinaendelea kwa sababu zingine (post-TB lung disease, maambukizi ya pili ya bakteria, paradoxical reaction katika VVU, IRIS), (2) sampuli ya sasa imekosa bakteria (ugonjwa ni paucibacillary, hasa wa kawaida katika VVU), au (3) tatizo la msingi SIO TB kabisa na utambuzi mwingine unasababisha dalili. Uchunguzi zaidi: X-ray ya kifua, hesabu kamili ya damu, kupima makohozi tena, chunguza maambukizi ya fungal (aspergilloma, Pneumocystis), biopsy ya tezi ya limfu ikiwa kubwa, scan ya mapafu inapopatikana.',
          sw_mtaa: 'Negative GeneXpert wakati wa treatment failure workup inafundisha — inaonyesha kwamba: (1) treatment inafanya kazi na bakteria zimepunguzwa lakini symptoms zinaendelea kwa sababu zingine (post-TB lung disease, secondary bacterial infection, paradoxical reaction katika VVU, IRIS), (2) current sample imekosa bakteria (disease ni paucibacillary, hasa common katika VVU), au (3) underlying problem SIO TB kabisa na another diagnosis inasababisha symptoms. Further investigations: chest X-ray, full blood count, repeat sputum culture, screen kwa fungal infections (aspergilloma, Pneumocystis), lymph node biopsy ikiwa kubwa, lung scan inapopatikana.',
        },
        nextSteps: {
          en: 'Return to your DOT centre with this result. Your clinician will plan further investigations and decide whether to continue, modify, or stop TB treatment. Do not stop drugs on your own — this can confuse the assessment. Bring a written list of all symptoms with dates if possible.',
          sw: 'Rudi katika kituo chako cha DOT na matokeo haya. Daktari wako atapanga uchunguzi zaidi na ataamua kuendelea, kubadilisha, au kusimamisha matibabu ya TB. Usisimamishe dawa peke yako — hii inaweza kuvuruga tathmini. Lete orodha iliyoandikwa ya dalili zote na tarehe ikiwezekana.',
          sw_mtaa: 'Rudi DOT centre yako na result hii. Clinician wako atapanga further investigations na ataamua kuendelea, kubadilisha, au kusimamisha TB treatment. Usisimamishe dawa peke yako — hii inaweza kuvuruga assessment. Lete written list ya symptoms zote na tarehe ikiwezekana.',
        },
        urgency: 'urgent',
      };
    }

    // initial_diagnosis or unknown
    return {
      result,
      context,
      headline: {
        en: 'GeneXpert did not detect TB in your sample — but if symptoms persist, further investigation is needed.',
        sw: 'GeneXpert haikugundua TB katika sampuli yako — lakini ikiwa dalili zinaendelea, uchunguzi zaidi unahitajika.',
        sw_mtaa: 'GeneXpert haikugundua TB katika sample yako — lakini kama symptoms zinaendelea, further investigation inahitajika.',
      },
      meaning: {
        en: 'A negative GeneXpert means no TB bacterial DNA was found above the test\'s detection threshold in the sample provided. In a person with classic TB symptoms (cough >2 weeks, night sweats, weight loss, fever), a negative result reduces — but does not entirely rule out — TB. False negatives can happen with low bacterial loads, poor-quality sputum samples, or with TB outside the lungs. If symptoms persist, repeat sputum, chest X-ray, and clinical assessment are usually next. If symptoms resolve, TB is unlikely and other causes (acute bronchitis, asthma, gastric reflux, post-viral cough, pneumonia) should be considered.',
        sw: 'GeneXpert negative inamaanisha hakuna DNA ya bakteria ya TB iliyopatikana juu ya kizingiti cha kugundua cha kipimo katika sampuli iliyotolewa. Kwa mtu mwenye dalili za kawaida za TB (kikohozi zaidi ya wiki 2, jasho la usiku, kupungua uzito, homa), matokeo negative hupunguza — lakini hayaondoi kabisa — TB. False negatives zinaweza kutokea na mizigo midogo ya bakteria, sampuli za makohozi za ubora wa chini, au na TB nje ya mapafu. Ikiwa dalili zinaendelea, makohozi yanayorudiwa, X-ray ya kifua, na tathmini ya kliniki kwa kawaida ni hatua zinazofuata. Ikiwa dalili zinaisha, TB haina uwezekano na sababu zingine (bronchitis ya papo hapo, pumu, gastric reflux, kikohozi cha baada ya virusi, pneumonia) zinapaswa kuzingatiwa.',
        sw_mtaa: 'Negative GeneXpert maana yake hakuna TB bacterial DNA iliyopatikana juu ya test\'s detection threshold katika sample iliyotolewa. Kwa mtu mwenye classic TB symptoms (cough zaidi ya wiki 2, night sweats, weight loss, homa), negative result inapunguza — lakini haitaondoi kabisa — TB. False negatives zinaweza kutokea na low bacterial loads, poor-quality sputum samples, au na TB nje ya mapafu. Kama symptoms zinaendelea, repeat sputum, chest X-ray, na clinical assessment kwa kawaida ni hatua zinazofuata. Kama symptoms zinaisha, TB haina uwezekano na other causes (acute bronchitis, pumu, gastric reflux, post-viral cough, pneumonia) zinapaswa kuzingatiwa.',
      },
      nextSteps: {
        en: 'If your symptoms continue beyond 2-3 weeks, return for re-evaluation — repeat sputum, chest X-ray, and possibly a trial of broad-spectrum antibiotics may follow. If you feel better, monitor for any return of symptoms. Quit smoking, manage other chest conditions (asthma, COPD), and seek care for any new cough lasting more than 2 weeks in future.',
        sw: 'Ikiwa dalili zako zinaendelea zaidi ya wiki 2-3, rudi kwa tathmini upya — makohozi yanayorudiwa, X-ray ya kifua, na huenda jaribio la antibiotics za wigo mpana zinaweza kufuata. Ikiwa unajisikia vizuri, fuatilia kurudi kwa dalili zozote. Acha kuvuta sigara, simamia hali zingine za kifua (pumu, COPD), na utafute huduma kwa kikohozi chochote kipya kinachodumu zaidi ya wiki 2 baadaye.',
        sw_mtaa: 'Kama symptoms zinaendelea zaidi ya wiki 2-3, rudi kwa re-evaluation — repeat sputum, chest X-ray, na huenda trial ya broad-spectrum antibiotics inaweza kufuata. Kama unajisikia vizuri, fuatilia kurudi kwa symptoms zozote. Acha kuvuta sigara, simamia other chest conditions (pumu, COPD), na utafute huduma kwa kikohozi chochote kipya kinachodumu zaidi ya wiki 2 baadaye.',
      },
      urgency: 'routine',
    };
  }

  // ── INVALID — test failed, must repeat ─────────────────────────────
  return {
    result,
    context,
    headline: {
      en: 'GeneXpert test was invalid — the sample needs to be repeated.',
      sw: 'Kipimo cha GeneXpert kilikuwa batili — sampuli inahitaji kurudiwa.',
      sw_mtaa: 'GeneXpert test ilikuwa invalid — sample inahitaji kurudiwa.',
    },
    meaning: {
      en: 'An invalid result means the machine could not complete the test — usually because the sample was inadequate (too little, too watery, mixed with other fluids, contaminated, or transported incorrectly), or because of a technical error with the cartridge. This is NOT a diagnosis. Another sputum sample must be collected and run. A good sputum sample looks thick and mucusy (not just saliva) — coughing from deep in the chest, ideally early in the morning, gives the best result.',
      sw: 'Matokeo batili yanamaanisha mashine haikuweza kukamilisha kipimo — kwa kawaida kwa sababu sampuli haikuwa ya kutosha (kidogo sana, ya maji sana, iliyochanganywa na maji mengine, iliyochafuliwa, au iliyosafirishwa vibaya), au kwa sababu ya kosa la kiufundi na cartridge. Hii SIO utambuzi. Sampuli nyingine ya makohozi lazima ikusanywe na kukimbizwa. Sampuli nzuri ya makohozi huonekana nzito na kamasi (sio mate tu) — kukohoa kutoka ndani sana ya kifua, ikiwezekana mapema asubuhi, hutoa matokeo bora.',
      sw_mtaa: 'Invalid result inamaanisha machine haikuweza kukamilisha test — kwa kawaida kwa sababu sample haikuwa adequate (kidogo sana, ya watery, mixed na other fluids, contaminated, au transported vibaya), au kwa sababu ya technical error na cartridge. Hii SIO diagnosis. Another sputum sample lazima ikusanywe na kukimbizwa. Good sputum sample inaonekana thick na mucusy (sio mate tu) — kukohoa kutoka ndani sana ya kifua, ikiwezekana mapema asubuhi, inatoa best result.',
    },
    nextSteps: {
      en: 'Return to the DOT centre or lab to give another sputum sample. Best technique: rinse mouth with water first, take a deep breath, cough forcefully from the chest (not just throat), spit into the container. First-morning samples are usually best. Avoid eating or drinking for 30 minutes before. The test will be repeated free of charge.',
      sw: 'Rudi katika kituo cha DOT au maabara kutoa sampuli nyingine ya makohozi. Mbinu bora: suuza kinywa na maji kwanza, chukua pumzi nzito, kohoa kwa nguvu kutoka kifuani (sio kooni tu), tema kwenye chombo. Sampuli za asubuhi ya kwanza kwa kawaida ni bora. Epuka kula au kunywa kwa dakika 30 kabla. Kipimo kitarudiwa bila malipo.',
      sw_mtaa: 'Rudi DOT centre au lab kutoa another sputum sample. Best technique: suuza kinywa na maji kwanza, chukua pumzi nzito, kohoa kwa nguvu kutoka chest (sio koo tu), tema kwenye container. First-morning samples kwa kawaida ni best. Epuka kula au kunywa kwa dakika 30 kabla. Test itarudiwa bila malipo.',
    },
    urgency: 'soon',
  };
}

// ──────────────────────────────────────────────────────────────────────
// LAB KNOWLEDGE OBJECT
// ──────────────────────────────────────────────────────────────────────

export const GENEXPERT: LabKnowledge = {
  id: 'genexpert',
  aliases: LAB_ALIASES.genexpert,
  unit: 'qualitative',  // not numeric — interpreted by interpretGenexpert()

  whatItMeasures: {
    en: 'GeneXpert MTB/RIF is a molecular test that detects Mycobacterium tuberculosis (TB bacterium) DNA in a sputum or tissue sample. In the same run, it also detects whether the bacterium has the genetic change (rpoB mutation) that causes resistance to rifampicin — one of the two most powerful first-line TB drugs. It is sensitive (catches TB that microscopy might miss), specific (rarely positive when TB is not present), and fast (about 2 hours). It is the preferred initial TB test in Tanzania since NTLP rollout. Note: sample quality matters — saliva-only or watery samples often give invalid or false-negative results; first-morning sputum tends to give the highest yield. Recent antibiotic use can lower bacterial load below the detection threshold. In HIV with low CD4 or in children, sputum is often paucibacillary, so a negative result does not rule out TB — additional samples (gastric aspirate, induced sputum, urine LF-LAM) may be needed.',
    sw: 'GeneXpert MTB/RIF ni kipimo cha molekuli kinachogundua DNA ya Mycobacterium tuberculosis (bakteria wa TB) katika sampuli ya makohozi au tishu. Katika mzunguko huo huo, pia hugundua kama bakteria ana mabadiliko ya kijeni (rpoB mutation) yanayosababisha upinzani dhidi ya rifampicin. Ni nyeti, mahususi, na ya haraka (karibu masaa 2). Ni kipimo cha awali kinachopendelewa cha TB Tanzania tangu kuzinduliwa kwa NTLP. Kumbuka: ubora wa sampuli ni muhimu — sampuli za mate tu au za maji mara nyingi hutoa matokeo batili au negative ya uongo; makohozi ya asubuhi ya kwanza huwa na mavuno makubwa zaidi. Matumizi ya hivi karibuni ya antibiotics yanaweza kushusha mzigo wa bakteria chini ya kizingiti cha kugundua. Katika VVU yenye CD4 ya chini au kwa watoto, makohozi mara nyingi ni paucibacillary, hivyo matokeo negative hayaondoi TB — sampuli za ziada (gastric aspirate, makohozi yaliyochochewa, urine LF-LAM) zinaweza kuhitajika.',
    sw_mtaa: 'GeneXpert MTB/RIF ni molecular test inayodetect DNA ya Mycobacterium tuberculosis (bakteria wa TB) katika sputum au tissue sample. Katika run hiyo hiyo, pia inadetect kama bakteria ana genetic change (rpoB mutation) inayosababisha resistance dhidi ya rifampicin. Ni sensitive, specific, na fast (karibu masaa 2). Ni preferred initial TB test Tanzania tangu NTLP rollout. Kumbuka: sample quality ni muhimu — mate tu au watery samples mara nyingi zinatoa invalid au false-negative results; first-morning sputum inatoa highest yield. Recent antibiotic use inaweza kushusha bacterial load chini ya detection threshold. Katika VVU yenye low CD4 au kwa watoto, sputum mara nyingi ni paucibacillary, hivyo negative result haitoi TB — additional samples (gastric aspirate, induced sputum, urine LF-LAM) zinaweza kuhitajika.',
  },

  whyItsOrdered: {
    en: 'GeneXpert is used for: (1) initial workup of any cough lasting more than 2 weeks or other TB symptoms, (2) screening close contacts of TB cases, (3) HIV-positive people with any TB-related symptoms (or routinely at HIV diagnosis if symptomatic), (4) pediatric workup when TB is suspected, (5) treatment failure workup, and (6) MDR-TB suspicion. The rifampicin-resistance flag is particularly valuable: in 2 hours the test can identify probable MDR-TB and prompt urgent referral, avoiding wasted weeks on standard treatment that will fail. GeneXpert transformed TB diagnosis in Tanzania — before it, sputum smear microscopy missed up to half of TB cases. A positive GeneXpert is enough to start treatment without waiting for culture.',
    sw: 'GeneXpert hutumika kwa: (1) uchunguzi wa awali wa kikohozi chochote kinachodumu zaidi ya wiki 2 au dalili zingine za TB, (2) uchunguzi wa watu wa karibu wa kesi za TB, (3) watu wenye VVU walio na dalili zozote zinazohusiana na TB (au mara kwa mara wakati wa utambuzi wa VVU ikiwa kuna dalili), (4) uchunguzi wa watoto wakati TB inashukiwa, (5) uchunguzi wa kushindwa kwa matibabu, na (6) shaka ya MDR-TB. Bendera ya upinzani wa rifampicin ni muhimu hasa: katika masaa 2 kipimo kinaweza kutambua MDR-TB inayowezekana na kuchochea rufaa ya haraka, kuepuka wiki za upotevu kwenye matibabu ya kawaida ambayo yataishindwa. GeneXpert imebadilisha utambuzi wa TB Tanzania — kabla yake, darubini ya makohozi ilikosa hadi nusu ya kesi za TB. GeneXpert chanya inatosha kuanza matibabu bila kusubiri utamaduni.',
    sw_mtaa: 'GeneXpert inatumika kwa: (1) initial workup ya kikohozi chochote kinachodumu zaidi ya wiki 2 au TB symptoms zingine, (2) screening ya close contacts wa TB cases, (3) HIV-positive people walio na TB-related symptoms zozote (au routinely wakati wa HIV diagnosis ikiwa kuna symptoms), (4) pediatric workup wakati TB inashukiwa, (5) treatment failure workup, na (6) MDR-TB suspicion. Rifampicin-resistance flag ni muhimu hasa: katika masaa 2 test inaweza kutambua probable MDR-TB na kuchochea urgent referral, kuepuka wiki za upotevu kwenye standard treatment ambayo itashindwa. GeneXpert imebadilisha TB diagnosis Tanzania — kabla yake, sputum smear microscopy ilikosa hadi nusu ya TB cases. Positive GeneXpert inatosha kuanza treatment bila kusubiri culture.',
  },

  ranges: [
    // GeneXpert is qualitative — placeholder for type compliance.
    // Real interpretation happens via interpretGenexpert() above.
    {
      applies: { sex: 'any' },
      normalLow: 0,  // mtb_not_detected
      normalHigh: 0,
    },
  ],

  interpretations: [
    {
      band: 'normal',
      meaning: {
        en: 'GeneXpert — MTB not detected. No TB bacterial DNA found above the detection threshold in this sample.',
        sw: 'GeneXpert — MTB haijagunduliwa. Hakuna DNA ya bakteria ya TB iliyopatikana juu ya kizingiti cha kugundua katika sampuli hii.',
        sw_mtaa: 'GeneXpert — MTB haijadetectiwa. Hakuna TB bacterial DNA iliyopatikana juu ya detection threshold katika sample hii.',
      },
      nextSteps: {
        en: 'If symptoms persist beyond 2-3 weeks, return for re-evaluation (repeat sputum, chest X-ray, clinical assessment). In HIV with low CD4 or in children, a negative result does NOT rule out TB — additional samples may be needed.',
        sw: 'Ikiwa dalili zinaendelea zaidi ya wiki 2-3, rudi kwa tathmini upya (makohozi yanayorudiwa, X-ray ya kifua, tathmini ya kliniki). Katika VVU yenye CD4 ya chini au kwa watoto, matokeo negative HAYAONDOI TB — sampuli za ziada zinaweza kuhitajika.',
        sw_mtaa: 'Kama symptoms zinaendelea zaidi ya wiki 2-3, rudi kwa re-evaluation (repeat sputum, chest X-ray, clinical assessment). Katika VVU yenye low CD4 au kwa watoto, negative result HAITOI TB — additional samples zinaweza kuhitajika.',
      },
      urgency: 'routine',
    },
    {
      band: 'high',
      meaning: {
        en: 'GeneXpert — MTB DETECTED, rifampicin-sensitive. Active TB confirmed; rifampicin (a key first-line drug) will work.',
        sw: 'GeneXpert — MTB IMEGUNDULIWA, inayoshambulika na rifampicin. TB hai imethibitishwa; rifampicin (dawa muhimu ya awali) itafanya kazi.',
        sw_mtaa: 'GeneXpert — MTB DETECTED, rifampicin-sensitive. Active TB imethibitishwa; rifampicin (key first-line drug) itafanya kazi.',
      },
      nextSteps: {
        en: 'Register at the nearest NTLP DOT centre to start standard RHZE treatment for 6 months. Get tested for HIV. Bring household contacts for screening, especially under-5 children and HIV-positive members.',
        sw: 'Jisajili katika kituo cha karibu cha DOT cha NTLP kuanza matibabu ya kawaida ya RHZE kwa miezi 6. Pima VVU. Lete watu wa kaya kwa uchunguzi, hasa watoto chini ya miaka 5 na wanafamilia wenye VVU.',
        sw_mtaa: 'Jisajili kwenye DOT centre ya karibu ya NTLP kuanza standard RHZE treatment kwa miezi 6. Pima VVU. Lete household contacts kwa screening, hasa under-5 children na HIV-positive members.',
      },
      urgency: 'urgent',
    },
    {
      band: 'critical_high',
      meaning: {
        en: 'GeneXpert — MTB DETECTED, RIFAMPICIN RESISTANT. This signals MDR-TB. Standard RHZE will not cure this disease.',
        sw: 'GeneXpert — MTB IMEGUNDULIWA, INAPINGA RIFAMPICIN. Hii inaonyesha MDR-TB. RHZE ya kawaida haitaponya ugonjwa huu.',
        sw_mtaa: 'GeneXpert — MTB DETECTED, RIFAMPICIN RESISTANT. Hii inaonyesha MDR-TB. Standard RHZE haitaponya ugonjwa huu.',
      },
      nextSteps: {
        en: 'Do NOT start standard RHZE. Urgent referral to a specialised MDR-TB centre (Muhimbili, KCMC, Mbeya, or designated regional sites in Tanzania). Further drug-susceptibility testing will guide the regimen. Isolate at home in the meantime, screen close contacts, and get HIV tested.',
        sw: 'USIANZE RHZE ya kawaida. Rufaa ya haraka kwa kituo maalum cha MDR-TB (Muhimbili, KCMC, Mbeya, au vituo vilivyochaguliwa Tanzania). Uchunguzi zaidi wa kushambuliwa na dawa utaongoza regimen. Jitenge nyumbani kwa wakati huo, chunguza watu wa karibu, na pima VVU.',
        sw_mtaa: 'USIANZE standard RHZE. Urgent referral kwa specialised MDR-TB centre (Muhimbili, KCMC, Mbeya, au designated regional sites Tanzania). Further drug-susceptibility testing itaongoza regimen. Jitenge nyumbani kwa wakati huo, chunguza close contacts, na pima VVU.',
      },
      urgency: 'urgent',
    },
  ],

  sources: [
    src('NTLP_TB_2024'),
    src('WHO_TB_2024'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
