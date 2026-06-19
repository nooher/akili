/**
 * Ceftriaxone — Drug Knowledge (Phase 8 pneumonia block)
 *
 * Sources: WHO AWaRe 2023 (Watch category), WHO Pneumonia 2022,
 *          NTLG STG 2023, Muhimbili Protocols, BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Ceftriaxone is the IV/IM workhorse for severe pneumonia, severe
 *   community-acquired infections, sepsis, meningitis (where it crosses
 *   the blood-brain barrier well), and many in-hospital infections in
 *   Tanzania. Its once-daily dosing makes it practical even in
 *   resource-limited settings. It is a WHO Watch antibiotic — broad
 *   spectrum, important to preserve through stewardship, not for routine
 *   outpatient use.
 *
 * Scope note:
 *   We educate on what ceftriaxone is, when it is given by injection,
 *   what to expect during treatment, and the important precautions
 *   (calcium-containing IV fluids in neonates is contraindicated;
 *   penicillin-allergy cross-reactivity is much lower than once thought
 *   but still relevant). We do NOT give doses.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const CEFTRIAXONE: DrugKnowledge = {
  id: 'ceftriaxone',
  aliases: DRUG_ALIASES.ceftriaxone,

  drugClass: {
    en: 'Third-generation cephalosporin antibiotic (broad-spectrum beta-lactam, IV or IM) — WHO Watch category, the hospital workhorse for severe infections',
    sw: 'Cephalosporin ya kizazi cha tatu antibiotic (beta-lactam ya wigo mpana, IV au IM) — kategoria ya Watch ya WHO, dawa kuu ya hospitalini kwa maambukizi makubwa',
  },

  whatItDoes: {
    en: 'Ceftriaxone is a powerful broad-spectrum antibiotic given by injection (into a vein or muscle), reaching higher blood levels faster than oral antibiotics — which is why it is the first choice when a person is too unwell for tablets to be enough. It kills bacteria by breaking their cell wall, similar to penicillin, but works against a wider range — including many gram-negative organisms that penicillin misses. It crosses into the cerebrospinal fluid well, which is why it is the antibiotic of choice for bacterial meningitis. Once-daily dosing makes it manageable in busy wards. It does NOT cover Pseudomonas reliably (a different agent is chosen if Pseudomonas is suspected), and it does NOT cover atypical pneumonia organisms (Mycoplasma, Chlamydia) — which is why in adult severe CAP, ceftriaxone is often paired with a macrolide.',
    sw: 'Ceftriaxone ni antibiotic yenye nguvu ya wigo mpana inayotolewa kwa sindano (kwenye mshipa au misuli), ikifikia viwango vya juu vya damu haraka kuliko antibiotic za kumeza — ndio sababu ni chaguo la kwanza wakati mtu hayuko vizuri kiasi cha vidonge kutosha. Inauwa bakteria kwa kuvunja ukuta wao wa seli, sawa na penicillin, lakini inafanya kazi dhidi ya anuwai pana zaidi — ikijumuisha viumbe wengi wa gram-negative ambao penicillin hukosa. Inaingia vizuri kwenye cerebrospinal fluid, ndio sababu ni antibiotic ya chaguo kwa meningitis ya bakteria. Dose ya mara moja kwa siku huifanya iweze kusimamiwa katika wodi zenye shughuli. HAIFUNIKI Pseudomonas kwa uhakika (wakala tofauti huchaguliwa ikiwa Pseudomonas inashukiwa), na HAIFUNIKI viumbe vya atypical vya nimonia (Mycoplasma, Chlamydia) — ndio sababu katika CAP kali ya watu wazima, ceftriaxone mara nyingi huoanishwa na macrolide.',
    sw_mtaa: 'Ceftriaxone ni powerful broad-spectrum antibiotic inayotolewa kwa injection (IV au IM), reaching higher blood levels haraka kuliko oral antibiotics — ndio sababu ni first choice wakati mtu hayuko vizuri kiasi cha tablets kutosha. Inauwa bakteria kwa kuvunja cell wall wao, similar to penicillin, lakini inafanya kazi dhidi ya wider range — ikijumuisha gram-negative organisms wengi ambao penicillin inakosa. Inaingia vizuri katika CSF, ndio sababu ni antibiotic of choice kwa bacterial meningitis. Once-daily dosing inaifanya manageable katika busy wards. HAIFUNIKI Pseudomonas reliably (different agent inachaguliwa ikiwa Pseudomonas inashukiwa), na HAIFUNIKI atypical pneumonia organisms (Mycoplasma, Chlamydia) — ndio sababu katika adult severe CAP, ceftriaxone mara nyingi inapaired na macrolide.',
  },

  commonUses: [
    {
      en: 'Severe community-acquired pneumonia needing admission — IV ceftriaxone, often plus a macrolide in adults to cover atypicals.',
      sw: 'CAP kali inayohitaji kulazwa — ceftriaxone ya IV, mara nyingi pamoja na macrolide kwa watu wazima kufunika atypicals.',
      sw_mtaa: 'Severe CAP inayohitaji admission — IV ceftriaxone, mara nyingi plus macrolide kwa adults kufunika atypicals.',
    },
    {
      en: 'Bacterial meningitis (suspected or confirmed) — high-dose ceftriaxone is the empirical first-line in adults and older children.',
      sw: 'Meningitis ya bakteria (inayoshukiwa au kuthibitishwa) — ceftriaxone ya dose ya juu ni empirical first-line kwa watu wazima na watoto wakubwa.',
      sw_mtaa: 'Bacterial meningitis (suspected au confirmed) — high-dose ceftriaxone ni empirical first-line kwa adults na older children.',
    },
    {
      en: 'Sepsis from an unknown source — covers most common community-onset organisms while cultures return.',
      sw: 'Sepsis kutoka chanzo kisichojulikana — hufunika viumbe wengi wa kawaida wa mwanzo wa jamii wakati cultures zinaporudi.',
      sw_mtaa: 'Sepsis kutoka unknown source — inafunika most common community-onset organisms wakati cultures zinaporudi.',
    },
    {
      en: 'Severe typhoid fever, pyelonephritis (kidney infection), gonorrhoea, and certain bone or joint infections.',
      sw: 'Homa kali ya typhoid, pyelonephritis (maambukizi ya figo), kisonono, na baadhi ya maambukizi ya mifupa au viungo.',
      sw_mtaa: 'Severe typhoid fever, pyelonephritis (kidney infection), kisonono, na baadhi ya bone au joint infections.',
    },
  ],

  howItIsTaken: {
    en: 'Ceftriaxone is given by injection — either into a vein over 30 minutes (slow IV) or into a large muscle (IM), once a day in most cases (occasionally twice daily for meningitis). It is NEVER given by mouth — there is no oral form. The drug is reconstituted by trained staff just before each dose. IM injection can be painful; staff add a local anaesthetic (lidocaine) to reduce this — tell them if you have a lidocaine allergy. Most courses last 5-7 days for severe pneumonia, longer for meningitis or complicated infections. Once the person is improving, eating, and the team is confident in source control, ceftriaxone is often switched to an oral antibiotic (step-down therapy) to complete the course.',
    sw: 'Ceftriaxone hutolewa kwa sindano — ama kwenye mshipa kwa dakika 30 (slow IV) au kwenye misuli mikubwa (IM), mara moja kwa siku katika kesi nyingi (wakati mwingine mara mbili kwa siku kwa meningitis). HAITOLEWI KAMWE kwa mdomo — hakuna fomu ya kumeza. Dawa hutengenezwa upya na wafanyakazi waliofunzwa kabla tu ya kila dose. Sindano ya IM inaweza kuwa na maumivu; wafanyakazi huongeza dawa ya kufanya ganzi ya ndani (lidocaine) kupunguza hii — waambie ikiwa una mzio wa lidocaine. Kozi nyingi hudumu siku 5-7 kwa nimonia kali, ndefu zaidi kwa meningitis au maambukizi ya ugumu. Mara mtu anapoboresha, anakula, na timu ina uhakika katika udhibiti wa chanzo, ceftriaxone mara nyingi hubadilishwa kwa antibiotic ya kumeza (step-down therapy) kukamilisha kozi.',
    sw_mtaa: 'Ceftriaxone inatolewa kwa injection — ama IV kwa dakika 30 (slow IV) au IM (kwenye large muscle), once daily katika cases nyingi (occasionally twice daily kwa meningitis). HAITOLEWI KAMWE kwa mdomo — hakuna oral form. Dawa inareconstituted na trained staff kabla tu ya kila dose. IM injection inaweza kuwa painful; staff wanaongeza local anaesthetic (lidocaine) kupunguza hii — waambie ikiwa una lidocaine allergy. Most courses zinadumu siku 5-7 kwa severe pneumonia, longer kwa meningitis au complicated infections. Once mtu anaimprove, anakula, na team ina confidence katika source control, ceftriaxone mara nyingi inabadilishwa kwa oral antibiotic (step-down therapy) kukamilisha kozi.',
  },

  commonSideEffects: [
    {
      en: 'Pain or stinging at the injection site (especially IM) — lidocaine in the diluent helps; tell staff if it persists.',
      sw: 'Maumivu au kuchoma mahali pa sindano (hasa IM) — lidocaine kwenye diluent husaidia; waambie wafanyakazi ikiwa hudumu.',
      sw_mtaa: 'Pain au stinging kwenye injection site (hasa IM) — lidocaine kwenye diluent inasaidia; waambie staff ikiwa inaendelea.',
    },
    {
      en: 'Mild nausea or stomach upset, occasional diarrhoea — usually mild and improves quickly.',
      sw: 'Kichefuchefu kidogo au usumbufu wa tumbo, kuharisha mara kwa mara — kawaida ndogo na huboresha haraka.',
      sw_mtaa: 'Mild nausea au stomach upset, occasional diarrhoea — kawaida mild na inaboresha haraka.',
    },
    {
      en: 'Mild headache, occasional dizziness — usually settles; tell staff if it worsens.',
      sw: 'Kichwa kidogo, kizunguzungu mara kwa mara — kawaida hutulia; waambie wafanyakazi ikiwa kunazidi.',
      sw_mtaa: 'Mild headache, occasional dizziness — kawaida inatulia; waambie staff ikiwa kunazidi.',
    },
    {
      en: 'Mild rash — sometimes the medicine, sometimes the infection; report it for the team to assess.',
      sw: 'Vipele vidogo — wakati mwingine ni dawa, wakati mwingine maambukizi; ripoti ili timu itathmini.',
      sw_mtaa: 'Mild rash — wakati mwingine ni dawa, wakati mwingine infection; ripoti ili team i-assess.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Sudden hives, swelling of the face/lips/tongue, wheeze, difficulty breathing, or collapse — anaphylaxis. EMERGENCY: stop the infusion, alert staff immediately, treat with adrenaline and supportive care; ceftriaxone is then avoided lifelong',
        sw: 'Vipele vya ghafla, uvimbe wa uso/midomo/ulimi, mfululizo wa pumzi, ugumu wa kupumua, au kuanguka — anaphylaxis. DHARURA: simamisha infusion, taarifu wafanyakazi mara moja, tibu kwa adrenaline na huduma ya kuunga mkono; ceftriaxone kisha huepukwa maisha',
        sw_mtaa: 'Sudden hives, swelling ya uso/midomo/ulimi, wheeze, difficulty breathing, au collapse — anaphylaxis. DHARURA: simamisha infusion, alert staff mara moja, tibu na adrenaline na supportive care; ceftriaxone kisha inaepukwa lifelong',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe rash with blistering, peeling, or mouth/eye sores (Stevens-Johnson syndrome) — EMERGENCY: stop the medicine, intensive care assessment',
        sw: 'Vipele vikali na malenge, kutoka, au vidonda mdomoni/machoni (Stevens-Johnson syndrome) — DHARURA: simamisha dawa, tathmini ya huduma kubwa',
        sw_mtaa: 'Severe rash na blistering, peeling, au mouth/eye sores (Stevens-Johnson syndrome) — DHARURA: simamisha dawa, intensive care assessment',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe watery diarrhoea with or without blood — possible C. difficile colitis. URGENT: needs a different treatment',
        sw: 'Kuharisha kali kwa maji bila au na damu — uwezekano wa C. difficile colitis. HARAKA: inahitaji matibabu tofauti',
        sw_mtaa: 'Severe watery diarrhoea na au bila damu — uwezekano wa C. difficile colitis. URGENT: inahitaji different treatment',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellowing of skin or eyes, dark urine, right-upper belly pain — possible bile-duct or liver effect (rare); staff will check liver tests and bilirubin',
        sw: 'Kuwa manjano kwa ngozi au macho, mkojo wa rangi nyeusi, maumivu ya tumbo la juu upande wa kulia — uwezekano wa athari ya bile-duct au ini (nadra); wafanyakazi watachunguza vipimo vya ini na bilirubin',
        sw_mtaa: 'Yellowing ya ngozi au macho, dark urine, right-upper belly pain — uwezekano wa bile-duct au liver effect (rare); staff watachunguza liver tests na bilirubin',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'iv_calcium',
      withDisplay: { en: 'IV calcium-containing fluids (especially in neonates)', sw: 'Kioevu cha IV chenye calcium (hasa kwa watoto wachanga)' },
      severity: 'avoid',
      explanation: {
        en: 'Ceftriaxone must NEVER be mixed with or given through the same IV line as calcium-containing fluids (Ringer\'s lactate, calcium gluconate) in neonates — fatal calcium-ceftriaxone precipitates can form in the lungs and kidneys. In older children and adults, the two should be given through separate lines and not simultaneously.',
        sw: 'Ceftriaxone HAIPASWI KAMWE kuchanganywa na au kutolewa kupitia line ile ile ya IV kama kioevu chenye calcium (Ringer\'s lactate, calcium gluconate) kwa watoto wachanga — precipitates za calcium-ceftriaxone zinaweza kuunda kwenye mapafu na figo na kuwa mauti. Kwa watoto wakubwa na watu wazima, mbili zinapaswa kutolewa kupitia lines tofauti na sio wakati mmoja.',
        sw_mtaa: 'Ceftriaxone HAIPASWI KAMWE kuchanganywa na au kutolewa through same IV line kama calcium-containing fluids (Ringer\'s lactate, calcium gluconate) kwa neonates — fatal calcium-ceftriaxone precipitates zinaweza kuunda kwenye mapafu na figo. Kwa older children na adults, two zinapaswa kutolewa through separate lines na sio simultaneously.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'penicillin_allergy',
      withDisplay: { en: 'severe penicillin allergy', sw: 'mzio mkali wa penicillin' },
      severity: 'caution',
      explanation: {
        en: 'Cross-reactivity between penicillin and ceftriaxone is much lower than once thought (around 1-2% for third-generation cephalosporins) — but in someone with a documented severe penicillin reaction (anaphylaxis, Stevens-Johnson), the prescriber will choose a non-beta-lactam alternative when possible.',
        sw: 'Cross-reactivity kati ya penicillin na ceftriaxone ni ya chini zaidi kuliko ilivyofikiriwa awali (karibu 1-2% kwa cephalosporins za kizazi cha tatu) — lakini kwa mtu mwenye historia iliyoandikwa ya athari kali ya penicillin (anaphylaxis, Stevens-Johnson), mwandishi atachagua mbadala isiyo ya beta-lactam pale inapowezekana.',
        sw_mtaa: 'Cross-reactivity kati ya penicillin na ceftriaxone ni much lower kuliko ilivyofikiriwa awali (around 1-2% kwa third-generation cephalosporins) — lakini kwa mtu mwenye documented severe penicillin reaction (anaphylaxis, Stevens-Johnson), prescriber atachagua non-beta-lactam alternative pale inapowezekana.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'warfarin',
      withDisplay: { en: 'warfarin (blood thinner)', sw: 'warfarin (dawa ya kupunguza damu)' },
      severity: 'caution',
      explanation: {
        en: 'Like many antibiotics, ceftriaxone can increase the effect of warfarin (and the INR) — more frequent INR monitoring is sensible during and shortly after the course.',
        sw: 'Kama antibiotic nyingi, ceftriaxone inaweza kuongeza athari ya warfarin (na INR) — ufuatiliaji wa mara kwa mara wa INR ni busara wakati na muda mfupi baada ya kozi.',
        sw_mtaa: 'Kama antibiotics nyingi, ceftriaxone inaweza kuongeza athari ya warfarin (na INR) — more frequent INR monitoring ni sensible wakati na shortly baada ya kozi.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'During the course', sw: 'Wakati wa kozi' },
      note: {
        en: 'Tell the staff right away if you feel a sudden itch, rash, swelling, breathlessness, or feel faint during or just after an injection — these can be early signs of an allergic reaction. Most people complete the course without trouble. Once-daily dosing means you only get one injection per day, which is one of the reasons this medicine is so practical in busy wards.',
        sw: 'Waambie wafanyakazi mara moja ikiwa unahisi muwasho wa ghafla, vipele, uvimbe, kushindwa kupumua, au unahisi kuzimia wakati au mara baada ya sindano — hizi zinaweza kuwa dalili za mapema za athari ya mzio. Watu wengi humaliza kozi bila tatizo. Dose ya mara moja kwa siku humaanisha unapata sindano moja tu kwa siku, ambayo ni mojawapo ya sababu dawa hii ni ya vitendo sana katika wodi zenye shughuli.',
        sw_mtaa: 'Waambie staff mara moja ikiwa unahisi sudden itch, rash, swelling, breathlessness, au unahisi faint wakati au tu baada ya injection — hizi zinaweza kuwa early signs za allergic reaction. Watu wengi wanacomplete course without trouble. Once-daily dosing maana yake unapata injection moja tu kwa siku, ambayo ni mojawapo ya sababu dawa hii ni practical sana katika busy wards.',
      },
    },
    {
      topic: { en: 'Why is this not a tablet?', sw: 'Kwa nini hii sio kidonge?' },
      note: {
        en: 'Ceftriaxone is too poorly absorbed when taken by mouth to be useful — that is why it is only given as an injection. Once you are well enough to take oral medicines reliably and the infection is under control, the team will usually switch you to an oral antibiotic to complete the course at home (step-down therapy).',
        sw: 'Ceftriaxone hufyonzwa vibaya sana inapochukuliwa kwa mdomo kuwa muhimu — ndio sababu hutolewa tu kama sindano. Mara unapokuwa mzima wa kutosha kuchukua dawa za kumeza kwa uhakika na maambukizi yamedhibitiwa, timu kawaida itakubadilisha kwa antibiotic ya kumeza kukamilisha kozi nyumbani (step-down therapy).',
        sw_mtaa: 'Ceftriaxone inafyonzwa vibaya sana inapochukuliwa kwa mdomo to be useful — ndio sababu inatolewa tu kama injection. Mara unapokuwa well enough kuchukua oral medicines reliably na infection iko under control, team kawaida itakubadilisha kwa oral antibiotic kukamilisha kozi nyumbani (step-down therapy).',
      },
    },
    {
      topic: { en: 'Allergy history', sw: 'Historia ya mzio' },
      note: {
        en: 'Always tell the staff if you have ever had any reaction to penicillin, amoxicillin, ampicillin, ceftriaxone, ceftazidime, cefuroxime, or any "cef-" family antibiotic — especially hives, swelling, breathing trouble, or severe rash. The risk of cross-reaction is low but real, and the team can choose an alternative.',
        sw: 'Daima waambie wafanyakazi ikiwa umewahi kupata athari yoyote kwa penicillin, amoxicillin, ampicillin, ceftriaxone, ceftazidime, cefuroxime, au antibiotic yoyote ya familia ya "cef-" — hasa vipele, uvimbe, tatizo la kupumua, au vipele vikali. Hatari ya kuingiliana ni ya chini lakini halisi, na timu inaweza kuchagua mbadala.',
        sw_mtaa: 'Daima waambie staff ikiwa umewahi kupata reaction yoyote kwa penicillin, amoxicillin, ampicillin, ceftriaxone, ceftazidime, cefuroxime, au antibiotic yoyote ya "cef-" family — hasa hives, swelling, breathing trouble, au severe rash. Risk ya cross-reaction ni low lakini real, na team inaweza kuchagua alternative.',
      },
    },
  ],

  sources: [
    src('WHO_PNEUMONIA_2022'),
    src('WHO_AMR_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
