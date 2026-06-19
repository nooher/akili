/**
 * Methyldopa (Aldomet) — Drug Knowledge (Phase 7 maternal block)
 *
 * Sources: MoH-TZ Maternal Guidelines 2024, WHO Pre-eclampsia 2023,
 *          NTLG STG 2023, Muhimbili Protocols, BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Methyldopa is the long-standing first-line antihypertensive in
 *   pregnancy in Tanzania — used for both pre-existing hypertension that
 *   needs switching from ACE inhibitors / ARBs, and for new gestational
 *   hypertension / non-severe pre-eclampsia. Decades of safety data in
 *   pregnancy make it the default; labetalol and nifedipine are common
 *   alternatives.
 *
 * Scope note:
 *   We educate on what methyldopa does, why it is chosen IN pregnancy,
 *   what side effects to expect, and what NOT to do (stop suddenly). We
 *   do NOT give doses. The drowsiness in the first days, the rare but
 *   important liver and blood reactions, and the fact that it is replaced
 *   after delivery by other agents — these are the high-value teaching
 *   points.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const METHYLDOPA: DrugKnowledge = {
  id: 'methyldopa',
  aliases: DRUG_ALIASES.methyldopa,

  drugClass: {
    en: 'Centrally-acting antihypertensive — the pregnancy-safe blood-pressure medicine of first choice in Tanzania',
    sw: 'Dawa ya shinikizo la damu inayofanya kazi kati — dawa salama ya kwanza ya presha katika mimba Tanzania',
  },

  whatItDoes: {
    en: 'Methyldopa lowers blood pressure by acting on the brainstem to reduce the nerve signals that keep blood vessels tight. The result is a gentler, smoother fall in blood pressure than many other antihypertensives. Most importantly, methyldopa has been used safely in pregnancy for decades, with long follow-up showing no harm to babies — which is why it is the default choice when an ACE inhibitor or ARB has to be switched, or when a new diagnosis of pregnancy hypertension or non-severe pre-eclampsia needs treatment. It does not lower the placenta\'s blood supply, which is why obstetricians trust it.',
    sw: 'Methyldopa hushusha shinikizo la damu kwa kufanya kazi kwenye shina la ubongo kupunguza ishara za neva zinazoweka mishipa ya damu kuwa imara. Matokeo ni kushuka laini, kupole zaidi kwa shinikizo la damu kuliko antihypertensives nyingine nyingi. Muhimu zaidi, methyldopa imetumika kwa usalama katika mimba kwa miongo, na ufuatiliaji wa muda mrefu unaonyesha hakuna madhara kwa watoto — ndio sababu ni chaguo la kawaida wakati ACE inhibitor au ARB inalazimika kubadilishwa, au wakati utambuzi mpya wa shinikizo la damu la mimba au pre-eclampsia isiyo kali unahitaji matibabu. Haipunguzi ugavi wa damu wa placenta, ndio sababu madaktari wa uzazi wanaitumaini.',
    sw_mtaa: 'Methyldopa inashusha presha kwa kufanya kazi kwenye brainstem kupunguza nerve signals zinazoweka blood vessels tight. Matokeo ni kushuka laini, smoother kuliko antihypertensives nyingi nyingine. Muhimu zaidi, methyldopa imetumika safely katika mimba kwa miongo, na long follow-up inaonyesha hakuna harm kwa watoto — ndio sababu ni default choice wakati ACE inhibitor au ARB inalazimika kubadilishwa, au wakati new diagnosis ya pregnancy hypertension au non-severe pre-eclampsia inahitaji treatment. Haipunguzi placental blood supply, ndio sababu obstetricians wanaitrust.',
  },

  commonUses: [
    {
      en: 'Non-severe high blood pressure in pregnancy — the first-line choice in Tanzania (the alternatives are labetalol and nifedipine).',
      sw: 'Shinikizo la damu lisilo kali katika mimba — chaguo la kwanza Tanzania (mbadala ni labetalol na nifedipine).',
      sw_mtaa: 'Non-severe presha katika mimba — first-line choice Tanzania (alternatives ni labetalol na nifedipine).',
    },
    {
      en: 'Pre-existing hypertension in a woman who becomes pregnant, when her ACE inhibitor or ARB must be switched immediately.',
      sw: 'Shinikizo la damu la awali kwa mwanamke anayepata mimba, wakati ACE inhibitor au ARB yake lazima ibadilishwe mara moja.',
      sw_mtaa: 'Pre-existing hypertension kwa mwanamke anayepata mimba, wakati ACE inhibitor au ARB yake lazima ibadilishwe mara moja.',
    },
    {
      en: 'As one component of multi-drug blood-pressure control in pre-eclampsia, alongside labetalol or nifedipine when one agent is not enough.',
      sw: 'Kama sehemu moja ya udhibiti wa shinikizo la damu wa dawa nyingi katika pre-eclampsia, pamoja na labetalol au nifedipine wakati dawa moja haitoshi.',
      sw_mtaa: 'Kama component moja ya multi-drug BP control katika pre-eclampsia, pamoja na labetalol au nifedipine wakati dawa moja haitoshi.',
    },
  ],

  howItIsTaken: {
    en: 'Taken by mouth, usually divided through the day — your team will set the exact dose and frequency based on your blood pressure response. Take it at the same times every day; do not skip doses. The blood pressure response builds up over several days, so the team may adjust the dose gradually. Continue methyldopa through delivery unless the team instructs otherwise. After delivery, most women are switched off methyldopa onto a non-pregnancy antihypertensive (often an ACE inhibitor again, even while breastfeeding, depending on which agent is best for the longer term) — do not just stop without that review.',
    sw: 'Inachukuliwa kwa mdomo, kawaida hugawanywa katika muda wa siku — timu yako itaweka dose halisi na mara kwa mara kulingana na jibu lako la shinikizo la damu. Tumia kwa nyakati zile zile kila siku; usiruke dose. Jibu la shinikizo la damu hujengwa kwa siku kadhaa, hivyo timu inaweza kurekebisha dose taratibu. Endelea na methyldopa wakati wa kujifungua isipokuwa timu ielekeze vinginevyo. Baada ya kujifungua, wanawake wengi hubadilishwa kutoka methyldopa kwenda antihypertensive isiyo ya mimba (mara nyingi ACE inhibitor tena, hata wakati wa kunyonyesha, kulingana na dawa gani ni bora kwa muda mrefu) — usisimame tu bila mapitio hayo.',
    sw_mtaa: 'Inachukuliwa kwa mdomo, kawaida inagawanywa katika muda wa siku — team yako itaweka exact dose na frequency kulingana na blood pressure response yako. Tumia kwa nyakati zile zile kila siku; usiruke doses. BP response inajengwa kwa siku kadhaa, hivyo team inaweza kurekebisha dose gradually. Endelea na methyldopa wakati wa delivery isipokuwa team itaelekeza vinginevyo. Baada ya delivery, wanawake wengi wanabadilishwa kutoka methyldopa kwenda non-pregnancy antihypertensive (mara nyingi ACE inhibitor tena, hata wakati wa breastfeeding, kulingana na dawa gani ni bora kwa long term) — usisimame tu bila review hiyo.',
  },

  commonSideEffects: [
    {
      en: 'Drowsiness and tiredness, especially in the first few days — this usually settles within a week or two; do not drive until you know how it affects you.',
      sw: 'Usingizi na uchovu, hasa katika siku chache za kwanza — kawaida hutulia ndani ya wiki moja au mbili; usiendeshe gari hadi ujue jinsi inavyokuathiri.',
      sw_mtaa: 'Usingizi na uchovu, hasa katika siku chache za kwanza — kawaida inatulia ndani ya wiki moja au mbili; usiendeshe gari hadi ujue jinsi inavyokuathiri.',
    },
    {
      en: 'Dry mouth, mild dizziness on standing up quickly (orthostatic hypotension) — rise slowly from sitting or lying.',
      sw: 'Mdomo mkavu, kizunguzungu kidogo unaposimama haraka (orthostatic hypotension) — inuka polepole kutoka kukaa au kulala.',
      sw_mtaa: 'Mdomo mkavu, dizziness kidogo unaposimama haraka (orthostatic hypotension) — inuka polepole kutoka kukaa au kulala.',
    },
    {
      en: 'Headache or stuffy nose in the first weeks — usually mild and improving with time.',
      sw: 'Kichwa au pua iliyojaa katika wiki za kwanza — kawaida ndogo na inaboresha kwa muda.',
      sw_mtaa: 'Headache au stuffy nose katika wiki za kwanza — kawaida mild na inaboresha kwa muda.',
    },
    {
      en: 'Mild fluid retention or weight gain — tell your team if it is more than expected for pregnancy.',
      sw: 'Uhifadhi wa kioevu mdogo au kuongeza uzito — mwambie timu yako kama ni zaidi ya inavyotarajiwa kwa mimba.',
      sw_mtaa: 'Mild fluid retention au weight gain — mwambie team yako kama ni zaidi ya inavyotarajiwa kwa mimba.',
    },
    {
      en: 'Mild low mood or feeling flat — bring this up at the next ANC visit; rarely the medicine needs to be changed.',
      sw: 'Hali ya chini ya moyo kidogo au kuhisi tambarare — leta hili katika ziara inayofuata ya ANC; nadra dawa inahitaji kubadilishwa.',
      sw_mtaa: 'Mild low mood au kuhisi flat — leta hili katika next ANC visit; rarely dawa inahitaji kubadilishwa.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Yellowing of the skin or eyes (jaundice), dark urine, severe right-upper abdominal pain, fever — possible drug-induced liver injury, rare but important. Stop the medicine and contact your team urgently',
        sw: 'Kuwa manjano kwa ngozi au macho (homa ya manjano), mkojo wa rangi nyeusi, maumivu makali ya tumbo la juu upande wa kulia, homa — uwezekano wa uharibifu wa ini unaosababishwa na dawa, nadra lakini muhimu. Simamisha dawa na wasiliana na timu yako haraka',
        sw_mtaa: 'Kuwa yellow kwa ngozi au macho (jaundice), mkojo wa rangi nyeusi, maumivu makali ya tumbo la juu upande wa kulia, homa — uwezekano wa drug-induced liver injury, rare lakini muhimu. Simamisha dawa na wasiliana na team yako urgently',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe paleness, tiredness, breathlessness, dark urine — possible haemolytic anaemia (rare but recognised methyldopa reaction). Get a blood test urgently',
        sw: 'Kupauka sana, uchovu, kushindwa kupumua, mkojo wa rangi nyeusi — uwezekano wa upungufu wa damu wa kuvunjika (haemolytic anaemia, athari nadra lakini inayotambulika ya methyldopa). Pata kipimo cha damu haraka',
        sw_mtaa: 'Kupauka sana, uchovu, kushindwa kupumua, mkojo wa rangi nyeusi — uwezekano wa haemolytic anaemia (rare lakini recognised methyldopa reaction). Pata blood test urgently',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe drowsiness, confusion, very slow heart rate, very low blood pressure with collapse — possible overdose or excessive effect; emergency assessment',
        sw: 'Usingizi mkubwa sana, kuchanganyikiwa, moyo unaopiga polepole sana, shinikizo la damu la chini sana na kuanguka — uwezekano wa overdose au athari kupita kiasi; tathmini ya dharura',
        sw_mtaa: 'Severe drowsiness, kuchanganyikiwa, very slow heart rate, very low BP na collapse — uwezekano wa overdose au excessive effect; emergency assessment',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'New severe rash, blistering skin, or fever after starting the medicine — possible serious allergic reaction. Stop and seek care',
        sw: 'Vipele vipya vikali, ngozi inayotoka malenge, au homa baada ya kuanza dawa — uwezekano wa athari mbaya ya mzio. Simamisha na tafuta huduma',
        sw_mtaa: 'New severe rash, blistering ngozi, au homa baada ya kuanza dawa — uwezekano wa serious allergic reaction. Stop na tafuta huduma',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'iron_supplements',
      withDisplay: { en: 'iron tablets', sw: 'vidonge vya chuma' },
      severity: 'caution',
      explanation: {
        en: 'Iron tablets (which most pregnant women take) can reduce methyldopa absorption — separate the two by at least 2 hours.',
        sw: 'Vidonge vya chuma (ambavyo wajawazito wengi hutumia) vinaweza kupunguza ufyonzaji wa methyldopa — tenganisha kati ya hizi mbili kwa angalau masaa 2.',
        sw_mtaa: 'Vidonge vya chuma (ambavyo wajawazito wengi wanatumia) vinaweza kupunguza absorption ya methyldopa — separate two kwa angalau masaa 2.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'maois',
      withDisplay: { en: 'MAOI antidepressants', sw: 'dawa za unyogovu za MAOI' },
      severity: 'avoid',
      explanation: {
        en: 'Combining methyldopa with MAOI antidepressants can cause dangerous blood-pressure swings — avoid this combination.',
        sw: 'Kuchanganya methyldopa na dawa za unyogovu za MAOI kunaweza kusababisha mabadiliko ya hatari ya shinikizo la damu — epuka mchanganyiko huu.',
        sw_mtaa: 'Kuchanganya methyldopa na MAOI antidepressants kunaweza kusababisha dangerous BP swings — avoid combination hii.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'alcohol',
      withDisplay: { en: 'alcohol', sw: 'pombe' },
      severity: 'caution',
      explanation: {
        en: 'Alcohol increases the drowsiness and the blood-pressure-lowering effect — and alcohol should be avoided in pregnancy anyway because of harm to the baby.',
        sw: 'Pombe huongeza usingizi na athari ya kushusha shinikizo la damu — na pombe inapaswa kuepukwa katika mimba kwa vyovyote kwa sababu ya madhara kwa mtoto.',
        sw_mtaa: 'Pombe inaongeza drowsiness na BP-lowering effect — na pombe inapaswa kuepukwa katika mimba kwa vyovyote kwa sababu ya harm kwa mtoto.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'When the drowsiness will pass', sw: 'Wakati usingizi utapita' },
      note: {
        en: 'Most women feel sleepy or sluggish for the first 5-10 days of methyldopa, then it settles. Plan the start for a quieter period if you can; do not drive or operate machinery until you know how it affects you. If the drowsiness is severe or persistent beyond two weeks, mention it at the next ANC visit.',
        sw: 'Wanawake wengi huhisi usingizi au unyogovu kwa siku 5-10 za kwanza za methyldopa, kisha hutulia. Panga kuanza kwa kipindi cha utulivu zaidi ikiwa unaweza; usiendeshe gari au mashine hadi ujue jinsi inavyokuathiri. Ikiwa usingizi ni mkubwa au unaendelea zaidi ya wiki mbili, taja katika ziara inayofuata ya ANC.',
        sw_mtaa: 'Wanawake wengi wanahisi usingizi au sluggish kwa siku 5-10 za kwanza za methyldopa, kisha inatulia. Panga kuanza kwa quieter period ikiwa unaweza; usiendeshe gari au machinery hadi ujue jinsi inavyokuathiri. Ikiwa drowsiness ni severe au persistent beyond wiki mbili, taja katika next ANC visit.',
      },
    },
    {
      topic: { en: 'Home BP monitoring', sw: 'Ufuatiliaji wa BP nyumbani' },
      note: {
        en: 'If you have a home BP monitor, keep a log — fasting morning reading and evening reading. Bring the log to every ANC visit; this helps the team adjust the dose based on real-life patterns rather than a single in-clinic measurement.',
        sw: 'Ikiwa una mfuatiliaji wa BP nyumbani, weka rekodi — usomaji wa asubuhi wa tumbo tupu na usomaji wa jioni. Lete rekodi katika kila ziara ya ANC; hii husaidia timu kurekebisha dose kulingana na mifumo ya maisha halisi badala ya kipimo kimoja cha kliniki.',
        sw_mtaa: 'Ikiwa una home BP monitor, weka log — fasting morning reading na evening reading. Lete log katika kila ANC visit; hii inasaidia team kurekebisha dose based on real-life patterns badala ya single in-clinic measurement.',
      },
    },
    {
      topic: { en: 'After delivery', sw: 'Baada ya kujifungua' },
      note: {
        en: 'Methyldopa is usually stopped or switched within days to weeks of delivery, because better options exist outside pregnancy. The postnatal visit is the time to review the long-term blood-pressure plan — including whether to return to an ACE inhibitor (which is compatible with breastfeeding in most cases). Do not just stop on your own.',
        sw: 'Methyldopa kawaida husimamishwa au kubadilishwa ndani ya siku hadi wiki baada ya kujifungua, kwa sababu chaguzi bora zipo nje ya mimba. Ziara ya baada ya kujifungua ni wakati wa kupitia mpango wa muda mrefu wa shinikizo la damu — ikiwa ni pamoja na kama kurudi kwa ACE inhibitor (ambayo inafaa na kunyonyesha katika kesi nyingi). Usisimame tu peke yako.',
        sw_mtaa: 'Methyldopa kawaida inasimamishwa au kubadilishwa ndani ya siku hadi wiki baada ya delivery, kwa sababu better options zipo nje ya mimba. Postnatal visit ni wakati wa kupitia long-term BP plan — including kama kurudi kwa ACE inhibitor (ambayo inafaa na breastfeeding katika cases nyingi). Usisimame tu peke yako.',
      },
    },
    {
      topic: { en: 'Do not stop suddenly', sw: 'Usisimame ghafla' },
      note: {
        en: 'Stopping methyldopa suddenly can cause a sharp rebound in blood pressure, which is dangerous in pregnancy. If side effects bother you, bring them to the ANC visit so the dose or medicine can be adjusted — do not stop without that conversation.',
        sw: 'Kusimamisha methyldopa ghafla kunaweza kusababisha kuruka kwa kasi kwa shinikizo la damu, ambayo ni hatari katika mimba. Ikiwa athari zinakusumbua, zilete katika ziara ya ANC ili dose au dawa irekebishwe — usisimame bila mazungumzo hayo.',
        sw_mtaa: 'Kusimamisha methyldopa ghafla kunaweza kusababisha sharp rebound katika BP, ambayo ni hatari katika mimba. Ikiwa side effects zinakusumbua, zilete katika ANC visit ili dose au dawa irekebishwe — usisimame bila conversation hiyo.',
      },
    },
  ],

  sources: [
    src('MOH_TZ_MATERNAL_2024'),
    src('WHO_PREECLAMPSIA_2023'),
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
