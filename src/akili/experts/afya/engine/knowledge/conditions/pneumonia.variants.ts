/**
 * Pneumonia — Variants (Phase 8)
 *
 * Six variants representing the highest-impact patterns of pneumonia in
 * Tanzania:
 *   • cap_adult (community-acquired pneumonia, outpatient/mild-moderate
 *     adult — the workhorse pattern)
 *   • severe_pneumonia (critical — chest indrawing, SpO2 < 90%, needs
 *     admission and oxygen)
 *   • pediatric_pneumonia (pediatric population — IMCI thresholds, fast
 *     breathing by age, danger signs in <5s; the top killer of Tanzanian
 *     children)
 *   • hap_hcap (hospital-acquired / healthcare-associated — different
 *     organisms, broader antibiotic choice)
 *   • aspiration_pneumonia (elderly, post-stroke, post-op, NG-tube
 *     patients — different organism profile and prevention focus)
 *   • pjp (Pneumocystis pneumonia — HIV-associated, advanced HIV,
 *     cross-reference to Phase 5)
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const PNEUMONIA_VARIANTS: ConditionVariant[] = [
  // ──────────────────────────────────────────────────────────────────────
  // COMMUNITY-ACQUIRED PNEUMONIA (ADULT, OUTPATIENT)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'cap_adult',
    severity: 'uncomplicated',
    population: 'adult',
    label: {
      en: 'Community-Acquired Pneumonia — adult, outpatient',
      sw: 'Nimonia ya Jamii — mtu mzima, anayetibika nyumbani',
    },
    presentation: {
      en: 'An adult who develops cough, fever, and feeling unwell over a few days — not seriously sick enough to need admission. They are still up and walking, eating reasonably, drinking, and their breathing — though faster than normal — is not laboured. Sputum can be present (often discoloured: yellow, green, sometimes blood-tinged). Sharp chest pain on deep breaths (pleuritic pain) is common. The classic CAP organism in this setting is Streptococcus pneumoniae, with atypicals (Mycoplasma, Chlamydia) more common in younger adults with a more "dry" presentation. The decision-point at the clinic is severity — vital signs, SpO2, and risk-factor profile decide outpatient versus admission.',
      sw: 'Mtu mzima anayepata kikohozi, homa, na kujihisi si mzima kwa siku chache — hajaugua sana kiasi cha kuhitaji kulazwa. Bado yuko amesimama na anatembea, anakula kwa wastani, anakunywa, na kupumua kwake — ingawa kunaharaka zaidi ya kawaida — sio kwa nguvu sana. Makohozi yanaweza kuwepo (mara nyingi ya rangi: njano, kijani, wakati mwingine na damu kidogo). Maumivu makali ya kifua wakati wa kupumua kwa kina (pleuritic pain) ni ya kawaida. Kiumbe cha kawaida cha CAP katika hali hii ni Streptococcus pneumoniae, na atypicals (Mycoplasma, Chlamydia) wa kawaida zaidi kwa watu wazima wadogo na uwasilishaji "mkavu" zaidi. Kipengele cha uamuzi kliniki ni ukali — ishara muhimu, SpO2, na wasifu wa hatari huamua nje dhidi ya kulazwa.',
      sw_mtaa: 'Mtu mzima anayepata cough, homa, na kujihisi si mzima kwa siku chache — hajaugua sana kiasi cha kuhitaji admission. Bado yuko up and walking, anakula reasonably, anakunywa, na breathing yake — ingawa ni faster kuliko normal — sio laboured. Sputum inaweza kuwepo (mara nyingi discoloured: yellow, green, wakati mwingine na damu kidogo). Sharp chest pain wakati wa deep breaths (pleuritic pain) ni ya kawaida. Classic CAP organism katika setting hii ni Streptococcus pneumoniae, na atypicals (Mycoplasma, Chlamydia) more common kwa younger adults na "dry" presentation zaidi. Decision-point kliniki ni severity — vital signs, SpO2, na risk-factor profile zinaamua outpatient vs admission.',
    },
    recognitionSigns: [
      {
        en: 'Cough (usually productive) plus fever (≥38°C) for a few days, with feeling genuinely unwell',
        sw: 'Kikohozi (kawaida cha makohozi) pamoja na homa (≥38°C) kwa siku chache, pamoja na kujihisi si mzima kweli',
        sw_mtaa: 'Cough (kawaida productive) pamoja na homa (≥38°C) kwa siku chache, pamoja na kujihisi genuinely unwell',
      },
      {
        en: 'Breathing faster than usual at rest, but not gasping; SpO2 ≥ 92% on room air',
        sw: 'Kupumua haraka kuliko kawaida wakati wa kupumzika, lakini sio kushindwa; SpO2 ≥ 92% kwa hewa ya kawaida',
        sw_mtaa: 'Breathing faster kuliko kawaida wakati wa kupumzika, lakini sio gasping; SpO2 ≥ 92% kwa room air',
      },
      {
        en: 'Sharp chest pain on deep breath (pleuritic) — points to lung involvement rather than upper-airway',
        sw: 'Maumivu makali ya kifua wakati wa pumzi ya kina (pleuritic) — yanaelekeza kwa uhusika wa mapafu badala ya njia ya juu ya hewa',
        sw_mtaa: 'Sharp chest pain wakati wa deep breath (pleuritic) — inaelekeza kwa lung involvement badala ya upper-airway',
      },
      {
        en: 'Crackles or bronchial breath sounds on chest examination at the affected area',
        sw: 'Crackles au bronchial breath sounds katika uchunguzi wa kifua katika eneo lililoathirika',
        sw_mtaa: 'Crackles au bronchial breath sounds katika chest examination katika eneo lililoathirika',
      },
    ],
    treatmentJourney: {
      en: 'Outpatient adult CAP in Tanzania is typically treated with oral amoxicillin (high-dose) for 5 days as the first-line WHO Access antibiotic — covering Streptococcus pneumoniae well. For penicillin allergy or atypical-pattern presentation, a macrolide (azithromycin or erythromycin) is the alternative. Co-amoxiclav (amoxicillin-clavulanate) is used when there is a concern for resistant organisms or when comorbidities raise the bar. Doxycycline is another option in adults (avoided in pregnancy and young children). Supportive care matters: paracetamol for fever and pain, plenty of fluids, rest, avoid smoking, complete the full course even when feeling better by day 2-3. Review at day 3 — if no improvement or worsening, return to the clinic; sometimes the antibiotic needs changing, sometimes the diagnosis needs revisiting (TB, atypical organism, lung pathology beyond pneumonia).',
      sw: 'CAP ya watu wazima ya nje Tanzania kawaida hutibiwa kwa amoxicillin ya kumeza (dose ya juu) kwa siku 5 kama antibiotic ya kwanza ya WHO Access — inashughulika vizuri na Streptococcus pneumoniae. Kwa mzio wa penicillin au uwasilishaji wa muundo wa atypical, macrolide (azithromycin au erythromycin) ni mbadala. Co-amoxiclav (amoxicillin-clavulanate) hutumika wakati kuna wasiwasi wa viumbe sugu au wakati hali zinazoongezeka huinua kizingiti. Doxycycline ni chaguo lingine kwa watu wazima (huepukwa katika mimba na watoto wadogo). Huduma ya kuunga mkono inajali: paracetamol kwa homa na maumivu, kioevu cha kutosha, kupumzika, epuka kuvuta sigara, kamilisha kozi yote hata unapojihisi vizuri kufikia siku ya 2-3. Mapitio katika siku ya 3 — ikiwa hakuna uboreshaji au kuzidi kuwa mbaya, rudi kliniki; wakati mwingine antibiotic inahitaji kubadilishwa, wakati mwingine utambuzi unahitaji kupitiwa upya (TB, kiumbe atypical, ugonjwa wa mapafu zaidi ya nimonia).',
      sw_mtaa: 'Outpatient adult CAP Tanzania kawaida inatibiwa kwa oral amoxicillin (high-dose) kwa siku 5 kama first-line WHO Access antibiotic — inashughulika vizuri na Streptococcus pneumoniae. Kwa penicillin allergy au atypical-pattern presentation, macrolide (azithromycin au erythromycin) ni alternative. Co-amoxiclav (amoxicillin-clavulanate) inatumika wakati kuna concern ya resistant organisms au wakati comorbidities zinainua bar. Doxycycline ni another option kwa watu wazima (inaepukwa katika mimba na watoto wadogo). Supportive care inajali: paracetamol kwa homa na maumivu, fluids za kutosha, rest, epuka kuvuta sigara, complete full course hata unapojihisi vizuri by day 2-3. Review at day 3 — ikiwa hakuna improvement au worsening, rudi kliniki; wakati mwingine antibiotic inahitaji kubadilishwa, wakati mwingine diagnosis inahitaji revisiting (TB, atypical organism, lung pathology beyond pneumonia).',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Not improving by day 3 of antibiotics, or getting worse — return to the clinic for review',
          sw: 'Kutoboresha kufikia siku ya 3 ya antibiotics, au kuzidi kuwa mbaya — rudi kliniki kwa mapitio',
          sw_mtaa: 'Not improving by day 3 ya antibiotics, au kuzidi kuwa mbaya — rudi kliniki kwa review',
        },
        urgency: 'soon',
      },
      {
        sign: {
          en: 'New chest pain that is worsening, breathlessness at rest, SpO2 < 92%, or coughing up significant blood — go in URGENTLY',
          sw: 'Maumivu mapya ya kifua yanayozidi kuwa mabaya, kushindwa kupumua wakati wa kupumzika, SpO2 < 92%, au kukohoa damu kubwa — ingia HARAKA',
          sw_mtaa: 'New chest pain inayozidi kuwa mabaya, breathlessness at rest, SpO2 < 92%, au kukohoa significant blood — ingia URGENTLY',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Confusion, severe weakness, unable to keep fluids down — EMERGENCY, this is severe pneumonia or sepsis',
          sw: 'Kuchanganyikiwa, udhaifu mkubwa, kushindwa kushikilia kioevu — DHARURA, hii ni nimonia kali au sepsis',
          sw_mtaa: 'Kuchanganyikiwa, severe weakness, kushindwa kushikilia fluids — DHARURA, hii ni severe pneumonia au sepsis',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Most adults with outpatient CAP feel better by day 3 and back to normal by 2-3 weeks. A cough can linger for 4-6 weeks even after the infection is cleared. Follow-up review is recommended if symptoms persist beyond expected, especially if cough goes past 2-3 weeks — this is when to consider TB workup (sputum GeneXpert) and chest X-ray. Smoking cessation matters: smoking doubles pneumonia recurrence risk. For adults at higher risk (>65 years, chronic disease), discuss pneumococcal and annual influenza vaccination at the recovery visit.',
      sw: 'Watu wazima wengi wenye CAP ya nje hujisikia vizuri kufikia siku ya 3 na kurudi kawaida kwa wiki 2-3. Kikohozi kinaweza kudumu kwa wiki 4-6 hata baada ya maambukizi kuondoka. Mapitio ya kufuatilia yanashauriwa ikiwa dalili zinaendelea zaidi ya inavyotarajiwa, hasa ikiwa kikohozi kinapita wiki 2-3 — hapa ndipo kufikiria uchunguzi wa TB (GeneXpert ya makohozi) na X-ray ya kifua. Kuacha kuvuta kunajali: kuvuta huongeza maradufu hatari ya kurudia kwa nimonia. Kwa watu wazima walio katika hatari kubwa (>miaka 65, magonjwa sugu), jadili chanjo ya pneumococcal na influenza ya kila mwaka katika ziara ya kupona.',
      sw_mtaa: 'Most adults na outpatient CAP wanajisikia vizuri by day 3 na back to normal kwa wiki 2-3. Cough inaweza kudumu kwa wiki 4-6 hata baada ya infection kuondoka. Follow-up review inashauriwa ikiwa symptoms zinaendelea beyond expected, hasa ikiwa cough inapita wiki 2-3 — hapa ndipo kufikiria TB workup (sputum GeneXpert) na chest X-ray. Smoking cessation inajali: smoking inaongeza maradufu pneumonia recurrence risk. Kwa adults walio katika higher risk (>miaka 65, chronic disease), jadili pneumococcal na annual influenza vaccination katika recovery visit.',
    },
    sources: [
      src('WHO_PNEUMONIA_2022'),
      src('WHO_AMR_2023'),
      src('NTLG_STG_2023'),
      src('MUHIMBILI_PROTOCOLS'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEVERE PNEUMONIA (NEEDS ADMISSION + OXYGEN)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'severe_pneumonia',
    severity: 'severe',
    label: {
      en: 'Severe Pneumonia — needs admission and oxygen',
      sw: 'Nimonia Kali — inayohitaji kulazwa na oksijeni',
    },
    presentation: {
      en: 'A person with pneumonia who has crossed the threshold to severe disease — labored breathing, SpO2 below 90% on room air, chest indrawing (in children), inability to feed or drink (in young children), confusion (in adults, especially elderly), shock features (low blood pressure, fast thready pulse), or a quick deterioration over hours. The same infection that started as a mild cough has now overwhelmed the body\'s reserves: oxygen is not reaching tissues adequately, the inflammatory response is causing wider damage, and without oxygen plus IV antibiotics and supportive care the trajectory can be hours from collapse. This is a hospital-level emergency, not something to manage with oral antibiotics at home.',
      sw: 'Mtu mwenye nimonia ambaye amepita kizingiti kwa ugonjwa mkali — kupumua kwa nguvu, SpO2 chini ya 90% kwa hewa ya kawaida, kifua kuingia ndani (kwa watoto), kushindwa kula au kunywa (kwa watoto wadogo), kuchanganyikiwa (kwa watu wazima, hasa wazee), dalili za shock (shinikizo la damu la chini, pulse ya haraka thready), au kuharibika haraka katika masaa. Maambukizi yale yale yaliyoanza kama kikohozi kidogo sasa yamezidi akiba ya mwili: oksijeni haifikii tishu vizuri, jibu la uvimbe linasababisha uharibifu mpana zaidi, na bila oksijeni pamoja na antibiotic za IV na huduma ya kuunga mkono mwelekeo unaweza kuwa masaa kutoka kuanguka. Hii ni dharura ya kiwango cha hospitali, sio kitu cha kusimamia na antibiotic ya kumeza nyumbani.',
      sw_mtaa: 'Mtu mwenye pneumonia ambaye amepita threshold kwa severe disease — labored breathing, SpO2 chini ya 90% kwa room air, chest indrawing (kwa watoto), inability kula au kunywa (kwa young children), kuchanganyikiwa (kwa adults, hasa elderly), shock features (low BP, fast thready pulse), au quick deterioration kwa masaa. Same infection iliyoanza kama mild cough sasa imezidi body\'s reserves: oksijeni haifikii tissues adequately, inflammatory response inasababisha wider damage, na bila oksijeni plus IV antibiotics na supportive care trajectory inaweza kuwa masaa kutoka collapse. Hii ni hospital-level emergency, sio kitu cha kusimamia na oral antibiotics nyumbani.',
    },
    recognitionSigns: [
      {
        en: 'SpO2 below 90% on room air — needs oxygen now',
        sw: 'SpO2 chini ya 90% kwa hewa ya kawaida — inahitaji oksijeni sasa',
        sw_mtaa: 'SpO2 chini ya 90% kwa room air — inahitaji oxygen sasa',
      },
      {
        en: 'Chest indrawing in a child, grunting, head bobbing, or nasal flaring',
        sw: 'Kifua kuingia ndani kwa mtoto, kugruna, kichwa kupiga juu na chini, au pua kuvuma',
        sw_mtaa: 'Chest indrawing kwa mtoto, grunting, head bobbing, au nasal flaring',
      },
      {
        en: 'Confusion or extreme drowsiness — brain is being affected by low oxygen or sepsis',
        sw: 'Kuchanganyikiwa au usingizi mkubwa sana — ubongo unaathiriwa na oksijeni ya chini au sepsis',
        sw_mtaa: 'Kuchanganyikiwa au extreme drowsiness — brain inaathiriwa na low oxygen au sepsis',
      },
      {
        en: 'Unable to drink, feed, or breastfeed — particularly in young children or the very ill',
        sw: 'Kushindwa kunywa, kula, au kunyonya — hasa kwa watoto wadogo au wagonjwa sana',
        sw_mtaa: 'Kushindwa kunywa, kula, au kunyonya — particularly kwa young children au very ill',
      },
      {
        en: 'Vital signs of sepsis: very fast or very slow heart rate, low BP, mottled skin, very fast breathing',
        sw: 'Ishara muhimu za sepsis: moyo unaopiga haraka sana au polepole sana, BP ya chini, ngozi ya rangi, kupumua haraka sana',
        sw_mtaa: 'Vital signs za sepsis: very fast au very slow heart rate, low BP, mottled skin, very fast breathing',
      },
    ],
    treatmentJourney: {
      en: 'Severe pneumonia treatment runs in parallel: oxygen first — by nasal prongs, face mask, or higher-flow systems depending on what is available and how unwell the person is — aiming for SpO2 ≥ 90%; IV antibiotics started without waiting for cultures (commonly IV ceftriaxone, often with a macrolide in adults to cover atypicals, or with ampicillin + gentamicin in young children per WHO guidance); IV fluids cautiously (severe pneumonia is fluid-vulnerable); paracetamol for fever; and monitoring of vitals, urine output, and consciousness. Investigations — chest X-ray, blood cultures, full blood count, glucose, kidney function, sometimes a sputum GeneXpert for TB if the picture fits — guide ongoing decisions. Step-down to oral antibiotics happens once the person is improving, eating, and SpO2 is stable on room air. In Tanzania, oxygen availability is the single most important bottleneck — facility-based oxygen plants and pulse oximeters at every level are health-system priorities.',
      sw: 'Matibabu ya nimonia kali yanaendesha sambamba: oksijeni kwanza — kwa pua, kinywa, au mifumo ya juu zaidi kulingana na kile kinachopatikana na jinsi mtu alivyo mgonjwa — kulenga SpO2 ≥ 90%; antibiotic za IV zinaanza bila kusubiri cultures (kawaida IV ceftriaxone, mara nyingi na macrolide kwa watu wazima kufunika atypicals, au na ampicillin + gentamicin kwa watoto wadogo kwa mwongozo wa WHO); kioevu cha IV kwa tahadhari (nimonia kali ni fluid-vulnerable); paracetamol kwa homa; na ufuatiliaji wa ishara muhimu, utokaji wa mkojo, na ufahamu. Uchunguzi — X-ray ya kifua, blood cultures, full blood count, glukosi, utendaji wa figo, wakati mwingine GeneXpert ya makohozi kwa TB ikiwa picha inafaa — huongoza maamuzi yanayoendelea. Step-down kwa antibiotic za kumeza hutokea mara mtu anapoboresha, anakula, na SpO2 iko thabiti kwa hewa ya kawaida. Tanzania, upatikanaji wa oksijeni ni kizingiti muhimu zaidi cha kichwa — viwanda vya oksijeni vya kituo na pulse oximeters katika kila ngazi ni vipaumbele vya mfumo wa afya.',
      sw_mtaa: 'Severe pneumonia treatment inaendesha in parallel: oksijeni kwanza — kwa nasal prongs, face mask, au higher-flow systems kulingana na kinachopatikana na jinsi mtu alivyo unwell — aiming for SpO2 ≥ 90%; IV antibiotics zinaanza without kusubiri cultures (kawaida IV ceftriaxone, mara nyingi na macrolide kwa adults kufunika atypicals, au na ampicillin + gentamicin kwa young children per WHO guidance); IV fluids cautiously (severe pneumonia ni fluid-vulnerable); paracetamol kwa homa; na monitoring ya vitals, urine output, na consciousness. Investigations — chest X-ray, blood cultures, FBC, glucose, kidney function, wakati mwingine sputum GeneXpert kwa TB ikiwa picha inafit — zinaongoza ongoing decisions. Step-down kwa oral antibiotics inatokea once mtu anaimprove, anakula, na SpO2 iko stable kwa room air. Tanzania, oxygen availability ni single most important bottleneck — facility-based oxygen plants na pulse oximeters katika kila level ni health-system priorities.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'SpO2 not rising above 90% despite oxygen, or dropping further — EMERGENCY: escalate the level of care immediately',
          sw: 'SpO2 isiyopanda zaidi ya 90% licha ya oksijeni, au kushuka zaidi — DHARURA: panua kiwango cha huduma mara moja',
          sw_mtaa: 'SpO2 isiyopanda zaidi ya 90% licha ya oxygen, au kushuka zaidi — DHARURA: escalate level of care mara moja',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Drowsiness, confusion, or seizure during treatment — EMERGENCY: brain hypoxia or sepsis worsening',
          sw: 'Usingizi, kuchanganyikiwa, au degedege wakati wa matibabu — DHARURA: brain hypoxia au sepsis kuzidi',
          sw_mtaa: 'Drowsiness, kuchanganyikiwa, au seizure wakati wa treatment — DHARURA: brain hypoxia au sepsis kuzidi',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Refusing to drink/feed in a child despite trying — EMERGENCY: dehydration on top of pneumonia is dangerous',
          sw: 'Kukataa kunywa/kula kwa mtoto licha ya kujaribu — DHARURA: upungufu wa maji juu ya nimonia ni hatari',
          sw_mtaa: 'Refusing kunywa/kula kwa mtoto licha ya kujaribu — DHARURA: dehydration juu ya pneumonia ni hatari',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'After severe pneumonia, the lungs and the person take weeks to fully recover. Discharge planning includes completing the antibiotic course (often switching to oral for the last days), pulmonary rehabilitation exercises (deep breathing, gentle walking), nutrition support, smoking cessation if applicable, and a follow-up review at 1-2 weeks plus a chest X-ray at 6 weeks for adults to ensure resolution (and to rule out underlying lung pathology). For people with HIV, this is a moment to optimise ART, check viral load, and consider cotrimoxazole prophylaxis if not already on it. Pneumococcal vaccination at the recovery visit is recommended in eligible adults.',
      sw: 'Baada ya nimonia kali, mapafu na mtu huchukua wiki kupona kabisa. Mpango wa kutoka unajumuisha kukamilisha kozi ya antibiotic (mara nyingi kubadilisha kwenda kumeza kwa siku za mwisho), mazoezi ya kurudisha utendaji wa mapafu (kupumua kwa kina, kutembea kidogo), msaada wa lishe, kuacha kuvuta sigara ikiwa inafaa, na mapitio ya kufuatilia katika wiki 1-2 pamoja na X-ray ya kifua katika wiki 6 kwa watu wazima kuhakikisha utatuzi (na kuondoa ugonjwa wa msingi wa mapafu). Kwa watu wenye VVU, huu ni wakati wa kuboresha ART, kuangalia viral load, na kufikiria kinga ya cotrimoxazole ikiwa hayo ya tayari ya juu. Chanjo ya pneumococcal katika ziara ya kupona inashauriwa kwa watu wazima wanaostahili.',
      sw_mtaa: 'Baada ya severe pneumonia, lungs na mtu wanachukua wiki kupona kabisa. Discharge planning inajumuisha kukamilisha antibiotic course (mara nyingi kubadilisha kwenda oral kwa last days), pulmonary rehabilitation exercises (deep breathing, gentle walking), nutrition support, smoking cessation kama inafaa, na follow-up review katika wiki 1-2 plus chest X-ray katika wiki 6 kwa adults kuhakikisha resolution (na kuondoa underlying lung pathology). Kwa watu wenye VVU, huu ni wakati wa kuoptimise ART, kuangalia viral load, na kufikiria cotrimoxazole prophylaxis ikiwa hayuko tayari. Pneumococcal vaccination katika recovery visit inashauriwa kwa eligible adults.',
    },
    sources: [
      src('WHO_PNEUMONIA_2022'),
      src('WHO_OXYGEN_2023'),
      src('WHO_AMR_2023'),
      src('NTLG_STG_2023'),
      src('MUHIMBILI_PROTOCOLS'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PEDIATRIC PNEUMONIA (IMCI)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'pediatric_pneumonia',
    severity: 'complicated',
    population: 'pediatric',
    label: {
      en: 'Pneumonia in Children Under 5 (IMCI)',
      sw: 'Nimonia kwa Watoto Chini ya Miaka 5 (IMCI)',
    },
    presentation: {
      en: 'A child under 5 with cough or difficulty breathing — the IMCI entry point. The single most useful sign is fast breathing, counted over a full minute. The age-adjusted thresholds: ≥60 breaths/min for infants under 2 months, ≥50/min for 2-11 months, ≥40/min for 1-5 years. Fast breathing with no danger signs = pneumonia, treated with oral antibiotics at home. Fast breathing PLUS any general danger sign — unable to drink or breastfeed, vomiting everything, convulsions, lethargic or unconscious, severe malnutrition — or any specific severe sign (chest indrawing in 2-59 months, SpO2 <90%, stridor in a calm child) = severe pneumonia, needs urgent referral and inpatient care with oxygen and IV antibiotics. The under-2-month infant has the lowest threshold of all: any breathing problem, fever, or feeding poorly is treated as serious until proven otherwise.',
      sw: 'Mtoto chini ya miaka 5 mwenye kikohozi au ugumu wa kupumua — mahali pa kuingia kwa IMCI. Dalili moja muhimu zaidi ni kupumua haraka, kuhesabiwa kwa dakika kamili. Vizingiti vilivyorekebishwa kwa umri: ≥60 pumzi/dakika kwa watoto chini ya miezi 2, ≥50/dakika kwa miezi 2-11, ≥40/dakika kwa miaka 1-5. Kupumua haraka bila dalili za hatari = nimonia, hutibiwa kwa antibiotic za kumeza nyumbani. Kupumua haraka PAMOJA NA dalili yoyote ya jumla ya hatari — kushindwa kunywa au kunyonya, kutapika kila kitu, kifafa, ulegevu au kuzimia, utapiamlo mkali — au dalili yoyote maalum ya kali (kifua kuingia ndani katika miezi 2-59, SpO2 <90%, stridor kwa mtoto mtulivu) = nimonia kali, inahitaji rufaa ya haraka na huduma ya hospitali na oksijeni na antibiotic za IV. Mtoto wa chini ya miezi 2 ana kizingiti cha chini zaidi kuliko wote: tatizo lolote la kupumua, homa, au kula vibaya hutibiwa kama kubwa hadi ithibitishwe vinginevyo.',
      sw_mtaa: 'Mtoto chini ya miaka 5 mwenye cough au difficulty breathing — IMCI entry point. Single most useful sign ni fast breathing, kuhesabiwa kwa full minute. Age-adjusted thresholds: ≥60 breaths/min kwa infants chini ya miezi 2, ≥50/min kwa miezi 2-11, ≥40/min kwa miaka 1-5. Fast breathing na no danger signs = pneumonia, treated na oral antibiotics nyumbani. Fast breathing PLUS general danger sign yoyote — unable kunywa au kunyonya, kutapika kila kitu, convulsions, lethargic au unconscious, severe malnutrition — au specific severe sign yoyote (chest indrawing katika miezi 2-59, SpO2 <90%, stridor kwa calm child) = severe pneumonia, inahitaji urgent referral na inpatient care na oxygen na IV antibiotics. Under-2-month infant ana lowest threshold ya wote: breathing problem yoyote, fever, au poor feeding inatibiwa kama serious hadi proven otherwise.',
    },
    recognitionSigns: [
      {
        en: 'Fast breathing by age: ≥60/min <2 months; ≥50/min 2-11 months; ≥40/min 1-5 years',
        sw: 'Kupumua haraka kwa umri: ≥60/dakika <miezi 2; ≥50/dakika miezi 2-11; ≥40/dakika miaka 1-5',
        sw_mtaa: 'Fast breathing kwa umri: ≥60/min <miezi 2; ≥50/min miezi 2-11; ≥40/min miaka 1-5',
      },
      {
        en: 'Chest indrawing — the lower chest sucks in with each breath (severe sign, 2-59 months)',
        sw: 'Kifua kuingia ndani — kifua cha chini kinakaribia kuvutwa ndani kwa kila pumzi (dalili kali, miezi 2-59)',
        sw_mtaa: 'Chest indrawing — lower chest inajisuck in kwa kila breath (severe sign, miezi 2-59)',
      },
      {
        en: 'Any general danger sign: unable to drink/breastfeed, vomiting everything, convulsions, lethargy, unconsciousness',
        sw: 'Dalili yoyote ya jumla ya hatari: kushindwa kunywa/kunyonya, kutapika kila kitu, kifafa, ulegevu, kuzimia',
        sw_mtaa: 'General danger sign yoyote: unable kunywa/kunyonya, kutapika kila kitu, convulsions, lethargy, unconsciousness',
      },
      {
        en: 'SpO2 below 90%, grunting, head bobbing, nasal flaring, cyanosis — severe pneumonia, urgent referral',
        sw: 'SpO2 chini ya 90%, kugruna, kichwa kupiga juu na chini, pua kuvuma, cyanosis — nimonia kali, rufaa ya haraka',
        sw_mtaa: 'SpO2 chini ya 90%, grunting, head bobbing, nasal flaring, cyanosis — severe pneumonia, urgent referral',
      },
      {
        en: 'Any breathing problem or fever in a baby under 2 months — serious until proven otherwise',
        sw: 'Tatizo lolote la kupumua au homa kwa mtoto chini ya miezi 2 — kubwa hadi ithibitishwe vinginevyo',
        sw_mtaa: 'Breathing problem yoyote au fever kwa baby chini ya miezi 2 — serious hadi proven otherwise',
      },
    ],
    treatmentJourney: {
      en: 'IMCI pneumonia (fast breathing only, no danger signs) in a 2-59 month-old: oral amoxicillin dispersible tablets at the WHO-recommended dose for 5 days, with home advice on feeding, fluids, fever management, and when to come back. Severe pneumonia in a child: urgent referral with a first dose of antibiotic given before transfer if delay is expected (oral amoxicillin if able to swallow, or IM ampicillin/penicillin); at the hospital, IV ampicillin + gentamicin is the WHO first-line for severe pneumonia in children, plus oxygen by nasal prongs or face mask aiming for SpO2 ≥ 90%, fluids cautiously, treat malnutrition or malaria if co-existing, and monitor for response. Under 2 months: refer urgently — these infants need IV antibiotics covering a wider organism range (often ampicillin plus gentamicin) and close observation. Vaccination history matters: PCV (pneumococcal conjugate vaccine) and Hib are in the Tanzania national schedule and dramatically reduce severe pneumonia risk; check whether the child is up to date.',
      sw: 'Nimonia ya IMCI (kupumua haraka tu, hakuna dalili za hatari) kwa mtoto wa miezi 2-59: amoxicillin ya kumeza ya vidonge vinavyoyeyuka katika dose iliyopendekezwa ya WHO kwa siku 5, na ushauri wa nyumbani kuhusu kula, kioevu, kushughulikia homa, na wakati wa kurudi. Nimonia kali kwa mtoto: rufaa ya haraka na dose ya kwanza ya antibiotic kutolewa kabla ya kuhama ikiwa ucheleweshaji unatarajiwa (amoxicillin ya kumeza ikiwa anaweza kumeza, au ampicillin/penicillin ya IM); hospitalini, ampicillin + gentamicin ya IV ni first-line ya WHO kwa nimonia kali kwa watoto, pamoja na oksijeni kwa pua au mask kulenga SpO2 ≥ 90%, kioevu kwa tahadhari, tibu utapiamlo au malaria ikiwa zinaambatana, na fuatilia jibu. Chini ya miezi 2: rejea haraka — watoto hawa wanahitaji antibiotic za IV zinazofunika anuwai kubwa ya viumbe (mara nyingi ampicillin pamoja na gentamicin) na uchunguzi wa karibu. Historia ya chanjo inajali: PCV (chanjo ya pneumococcal conjugate) na Hib ziko katika ratiba ya kitaifa ya Tanzania na hupunguza sana hatari ya nimonia kali; angalia kama mtoto yuko up to date.',
      sw_mtaa: 'IMCI pneumonia (fast breathing tu, hakuna danger signs) kwa mtoto wa miezi 2-59: oral amoxicillin dispersible tablets katika WHO-recommended dose kwa siku 5, na home advice kuhusu feeding, fluids, fever management, na lini kurudi. Severe pneumonia kwa mtoto: urgent referral na first dose ya antibiotic kupewa kabla ya transfer ikiwa delay inatarajiwa (oral amoxicillin ikiwa anaweza kumeza, au IM ampicillin/penicillin); hospitalini, IV ampicillin + gentamicin ni WHO first-line kwa severe pneumonia kwa watoto, plus oxygen kwa nasal prongs au face mask aiming for SpO2 ≥ 90%, fluids cautiously, tibu malnutrition au malaria ikiwa zinacoexist, na monitor for response. Under miezi 2: rejea urgently — infants hawa wanahitaji IV antibiotics zinazofunika wider organism range (mara nyingi ampicillin plus gentamicin) na close observation. Vaccination history inajali: PCV (pneumococcal conjugate vaccine) na Hib ziko katika Tanzania national schedule na zinapunguza dramatically severe pneumonia risk; check kama mtoto yuko up to date.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Inability to drink or breastfeed, vomiting everything, convulsions, lethargy — EMERGENCY referral',
          sw: 'Kushindwa kunywa au kunyonya, kutapika kila kitu, kifafa, ulegevu — rufaa ya DHARURA',
          sw_mtaa: 'Kushindwa kunywa au kunyonya, kutapika kila kitu, convulsions, lethargy — DHARURA referral',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Chest indrawing, grunting, cyanosis (bluish lips or tongue), SpO2 <90% — EMERGENCY, oxygen needed',
          sw: 'Kifua kuingia ndani, kugruna, cyanosis (midomo au ulimi wa bluu), SpO2 <90% — DHARURA, oksijeni inahitajika',
          sw_mtaa: 'Chest indrawing, grunting, cyanosis (bluish lips au tongue), SpO2 <90% — DHARURA, oxygen inahitajika',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Any breathing problem, fever, or poor feeding in an infant under 2 months — EMERGENCY same-day assessment',
          sw: 'Tatizo lolote la kupumua, homa, au kula vibaya kwa mtoto chini ya miezi 2 — tathmini ya DHARURA siku ile ile',
          sw_mtaa: 'Breathing problem yoyote, fever, au poor feeding kwa infant chini ya miezi 2 — DHARURA same-day assessment',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Severe malnutrition with any breathing problem — EMERGENCY, much higher mortality risk',
          sw: 'Utapiamlo mkali na tatizo lolote la kupumua — DHARURA, hatari kubwa zaidi ya vifo',
          sw_mtaa: 'Severe malnutrition na breathing problem yoyote — DHARURA, much higher mortality risk',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'IMCI says return in 2 days for a follow-up review of any child treated for pneumonia at home — improving, the same, or worse. Improving: continue antibiotics to complete 5 days. Same/worse: reassess, consider switching antibiotic or referring. After recovery, check the child\'s vaccination card: PCV and Hib catch-up if missed dramatically lowers future risk. Address smoke exposure in the home (cooking smoke, parental smoking — both are major modifiable risk factors). Treat malnutrition if present. Counsel on early-warning signs the parents should never ignore — the same fast-breathing and danger-sign teaching that they learned at this visit will protect future children.',
      sw: 'IMCI inasema rudi katika siku 2 kwa mapitio ya kufuatilia ya mtoto yeyote anayetibiwa kwa nimonia nyumbani — anaboresha, vivyo hivyo, au mbaya zaidi. Anaboresha: endelea na antibiotic kukamilisha siku 5. Vivyo hivyo/mbaya zaidi: kagua tena, fikiria kubadilisha antibiotic au kurejea. Baada ya kupona, angalia kadi ya chanjo ya mtoto: PCV na Hib catch-up ikiwa imekosekana hupunguza sana hatari ya baadaye. Shughulika na athari ya moshi nyumbani (moshi wa kupika, kuvuta kwa wazazi — zote ni sababu kuu zinazoweza kubadilishwa za hatari). Tibu utapiamlo ikiwa upo. Shauri kuhusu dalili za onyo la mapema ambazo wazazi hawapaswi kupuuza — mafunzo yale yale ya kupumua haraka na dalili za hatari waliyojifunza katika ziara hii yatalinda watoto wa baadaye.',
      sw_mtaa: 'IMCI inasema rudi katika siku 2 kwa follow-up review ya mtoto yeyote anayetibiwa kwa pneumonia nyumbani — anaimprove, same, au worse. Anaimprove: endelea na antibiotics kukamilisha siku 5. Same/worse: reassess, fikiria kubadilisha antibiotic au kurejea. Baada ya recovery, check kadi ya chanjo ya mtoto: PCV na Hib catch-up ikiwa imekosekana dramatically inapunguza future risk. Shughulika na smoke exposure nyumbani (cooking smoke, parental smoking — zote ni major modifiable risk factors). Tibu malnutrition kama ipo. Counsel kuhusu early-warning signs ambazo parents hawapaswi kupuuza — same fast-breathing na danger-sign teaching waliyojifunza katika visit hii itaprotect future children.',
    },
    sources: [
      src('IMCI_2024'),
      src('WHO_PNEUMONIA_2022'),
      src('WHO_OXYGEN_2023'),
      src('WHO_AMR_2023'),
      src('NTLG_STG_2023'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // HOSPITAL-ACQUIRED / HEALTHCARE-ASSOCIATED PNEUMONIA
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'hap_hcap',
    severity: 'complicated',
    label: {
      en: 'Hospital-Acquired / Healthcare-Associated Pneumonia (HAP/HCAP)',
      sw: 'Nimonia ya Hospitali / Inayohusishwa na Huduma za Afya (HAP/HCAP)',
    },
    presentation: {
      en: 'Pneumonia that develops 48 hours or more after hospital admission (HAP), or in a person who has had significant recent contact with healthcare facilities — recent admission, dialysis, nursing home, frequent IV care (HCAP). The clinical picture (cough, fever, dyspnoea, SpO2 drop, new chest signs, often with new infiltrates on X-ray) can look like community-acquired pneumonia — but the organism spectrum is wider and includes more resistant pathogens: Pseudomonas, Staphylococcus aureus (sometimes MRSA), Acinetobacter, Klebsiella, and other gram-negatives. The "community" antibiotic choice often fails or is inadequate. Mechanical ventilation adds a further category (VAP — ventilator-associated pneumonia). Risk factors: prolonged admission, recent broad-spectrum antibiotics, mechanical ventilation, immunosuppression, malnutrition, advanced age.',
      sw: 'Nimonia inayoendelea masaa 48 au zaidi baada ya kulazwa hospitalini (HAP), au kwa mtu aliyekuwa na mawasiliano makubwa ya hivi karibuni na vituo vya huduma za afya — kulazwa hivi karibuni, dialysis, makao ya wazee, huduma ya IV ya mara kwa mara (HCAP). Picha ya kliniki (kikohozi, homa, dyspnoea, kushuka kwa SpO2, dalili mpya za kifua, mara nyingi na infiltrates mpya kwenye X-ray) inaweza kuonekana kama nimonia ya jamii — lakini wigo wa viumbe ni mpana zaidi na unajumuisha pathogens sugu zaidi: Pseudomonas, Staphylococcus aureus (wakati mwingine MRSA), Acinetobacter, Klebsiella, na gram-negatives wengine. Chaguo la antibiotic la "jamii" mara nyingi hushindwa au halitoshi. Mechanical ventilation huongeza kategoria nyingine (VAP — nimonia inayohusishwa na ventilator). Sababu za hatari: kulazwa kwa muda mrefu, antibiotic za wigo mpana za hivi karibuni, mechanical ventilation, immunosuppression, utapiamlo, umri wa juu.',
      sw_mtaa: 'Pneumonia inayoendelea masaa 48 au zaidi baada ya admission (HAP), au kwa mtu aliyekuwa na significant recent contact na healthcare facilities — recent admission, dialysis, nursing home, frequent IV care (HCAP). Clinical picture (cough, fever, dyspnoea, SpO2 drop, new chest signs, mara nyingi na new infiltrates kwenye X-ray) inaweza kuonekana kama CAP — lakini organism spectrum ni wider na inajumuisha more resistant pathogens: Pseudomonas, Staphylococcus aureus (wakati mwingine MRSA), Acinetobacter, Klebsiella, na gram-negatives wengine. "Community" antibiotic choice mara nyingi inashindwa au inadequate. Mechanical ventilation inaongeza further category (VAP — ventilator-associated pneumonia). Risk factors: prolonged admission, recent broad-spectrum antibiotics, mechanical ventilation, immunosuppression, malnutrition, advanced age.',
    },
    recognitionSigns: [
      {
        en: 'New cough, fever, breathlessness, or worsening oxygen requirement ≥ 48 hours after admission',
        sw: 'Kikohozi kipya, homa, kushindwa kupumua, au kuongezeka kwa mahitaji ya oksijeni ≥ masaa 48 baada ya kulazwa',
        sw_mtaa: 'New cough, fever, breathlessness, au worsening oxygen requirement ≥ masaa 48 baada ya admission',
      },
      {
        en: 'New infiltrate on chest X-ray with clinical features of infection (fever, leukocytosis, purulent sputum)',
        sw: 'Infiltrate mpya kwenye X-ray ya kifua na sifa za kliniki za maambukizi (homa, leukocytosis, makohozi ya usaha)',
        sw_mtaa: 'New infiltrate kwenye chest X-ray na clinical features za infection (fever, leukocytosis, purulent sputum)',
      },
      {
        en: 'Failure to improve on standard CAP antibiotic — points to resistant organism or non-bacterial cause',
        sw: 'Kushindwa kuboresha kwa antibiotic ya kawaida ya CAP — kunaelekeza kwa kiumbe sugu au sababu isiyo ya bakteria',
        sw_mtaa: 'Failure to improve kwa standard CAP antibiotic — inaelekeza kwa resistant organism au non-bacterial cause',
      },
      {
        en: 'Risk-factor context: prolonged admission, recent broad-spectrum antibiotics, ventilator, immunosuppression',
        sw: 'Muktadha wa sababu za hatari: kulazwa kwa muda mrefu, antibiotic za wigo mpana za hivi karibuni, ventilator, immunosuppression',
        sw_mtaa: 'Risk-factor context: prolonged admission, recent broad-spectrum antibiotics, ventilator, immunosuppression',
      },
    ],
    treatmentJourney: {
      en: 'Empirical antibiotic therapy for HAP/HCAP needs to cover a wider organism range than CAP. The exact regimen depends on local resistance patterns, the patient\'s prior antibiotic exposure, and severity. Common starting choices include broad-spectrum beta-lactams (piperacillin-tazobactam, cefepime, meropenem) — sometimes combined with vancomycin (or linezolid) when MRSA is a concern. Sputum culture and sensitivity, blood cultures, and where available specific tracheal aspirate cultures help narrow the antibiotic choice within 48-72 hours — de-escalation matters as much as starting broad. Oxygen, fluid balance, glycaemic control, and prevention of further complications (DVT prophylaxis, head-of-bed elevation if ventilated to reduce aspiration) are part of the bundle. Source control matters: any device (catheter, line, drain) suspected of being infected gets removed or changed.',
      sw: 'Matibabu ya antibiotic ya empirical kwa HAP/HCAP yanahitaji kufunika anuwai pana zaidi ya viumbe kuliko CAP. Regimen halisi inategemea mifumo ya upinzani ya kienyeji, mfiduo wa awali wa antibiotic wa mgonjwa, na ukali. Chaguo za kawaida za kuanza ni pamoja na beta-lactams za wigo mpana (piperacillin-tazobactam, cefepime, meropenem) — wakati mwingine pamoja na vancomycin (au linezolid) wakati MRSA ni wasiwasi. Sputum culture na sensitivity, blood cultures, na pale yapatikanapo specific tracheal aspirate cultures husaidia kupunguza chaguo la antibiotic ndani ya masaa 48-72 — de-escalation inajali kama vile kuanza pana. Oksijeni, mizani ya kioevu, udhibiti wa glycaemic, na kuzuia matatizo zaidi (DVT prophylaxis, head-of-bed elevation ikiwa ventilated kupunguza aspiration) ni sehemu ya bundle. Source control inajali: kifaa chochote (catheter, line, drain) kinachoshukiwa kuambukizwa kinaondolewa au kubadilishwa.',
      sw_mtaa: 'Empirical antibiotic therapy kwa HAP/HCAP inahitaji kufunika wider organism range kuliko CAP. Exact regimen inategemea local resistance patterns, patient\'s prior antibiotic exposure, na severity. Common starting choices ni pamoja na broad-spectrum beta-lactams (piperacillin-tazobactam, cefepime, meropenem) — wakati mwingine pamoja na vancomycin (au linezolid) wakati MRSA ni concern. Sputum culture na sensitivity, blood cultures, na pale yapatikanapo specific tracheal aspirate cultures zinasaidia kupunguza antibiotic choice ndani ya masaa 48-72 — de-escalation inajali kama vile kuanza broad. Oxygen, fluid balance, glycaemic control, na prevention ya further complications (DVT prophylaxis, head-of-bed elevation ikiwa ventilated kupunguza aspiration) ni sehemu ya bundle. Source control inajali: kifaa chochote (catheter, line, drain) kinachoshukiwa kuambukizwa kinaondolewa au kubadilishwa.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Worsening despite broad-spectrum antibiotics, persistent fever after 72 hours — EMERGENCY: escalate, consider resistant organism, fungal infection, or non-infectious cause',
          sw: 'Kuzidi kuwa mbaya licha ya antibiotic za wigo mpana, homa inayoendelea baada ya masaa 72 — DHARURA: panua, fikiria kiumbe sugu, maambukizi ya fungal, au sababu isiyo ya maambukizi',
          sw_mtaa: 'Worsening licha ya broad-spectrum antibiotics, persistent fever baada ya masaa 72 — DHARURA: escalate, fikiria resistant organism, fungal infection, au non-infectious cause',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'New shock features (low BP, mottled skin, low urine output) — EMERGENCY: sepsis bundle, ICU-level care',
          sw: 'Dalili mpya za shock (BP ya chini, ngozi ya rangi, utokaji wa mkojo wa chini) — DHARURA: sepsis bundle, huduma ya kiwango cha ICU',
          sw_mtaa: 'New shock features (low BP, mottled skin, low urine output) — DHARURA: sepsis bundle, ICU-level care',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Antibiotic de-escalation when culture results return is a key step — narrowing the spectrum reduces resistance pressure and side-effect risk. Length of treatment is typically 7-8 days for most HAP, longer for Pseudomonas or complicated cases. Rehabilitation matters: HAP/HCAP patients are often deconditioned, and chest physiotherapy, mobilisation, and nutrition support speed recovery. Discharge planning includes review of the antibiotics taken (for future records and resistance pattern tracking), pneumococcal/influenza vaccination if appropriate, and management of the underlying conditions that put the person in hospital in the first place. Antibiotic stewardship reporting matters: every HAP case feeds local resistance surveillance.',
      sw: 'De-escalation ya antibiotic wakati matokeo ya culture yanaporudi ni hatua muhimu — kupunguza wigo hupunguza shinikizo la upinzani na hatari ya athari. Urefu wa matibabu kawaida ni siku 7-8 kwa HAP nyingi, ndefu zaidi kwa Pseudomonas au kesi za ugumu. Urejesho unajali: wagonjwa wa HAP/HCAP mara nyingi wamedhoofika, na chest physiotherapy, kuhamasishwa, na msaada wa lishe huharakisha kupona. Mpango wa kutoka unajumuisha mapitio ya antibiotic zilizochukuliwa (kwa rekodi za baadaye na ufuatiliaji wa mfumo wa upinzani), chanjo ya pneumococcal/influenza ikiwa inafaa, na usimamizi wa hali za msingi zilizomweka mtu hospitalini hapo kwanza. Antibiotic stewardship reporting inajali: kila kesi ya HAP inalisha local resistance surveillance.',
      sw_mtaa: 'Antibiotic de-escalation wakati culture results zinarudi ni key step — narrowing spectrum inapunguza resistance pressure na side-effect risk. Length of treatment kawaida ni siku 7-8 kwa most HAP, longer kwa Pseudomonas au complicated cases. Rehabilitation inajali: HAP/HCAP patients mara nyingi wamedhoofika, na chest physiotherapy, mobilisation, na nutrition support zinaharakisha recovery. Discharge planning inajumuisha review ya antibiotics zilizochukuliwa (kwa future records na resistance pattern tracking), pneumococcal/influenza vaccination kama inafaa, na management ya underlying conditions zilizomweka mtu hospitalini hapo kwanza. Antibiotic stewardship reporting inajali: kila HAP case inalisha local resistance surveillance.',
    },
    sources: [
      src('WHO_AMR_2023'),
      src('NTLG_STG_2023'),
      src('MUHIMBILI_PROTOCOLS'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // ASPIRATION PNEUMONIA
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'aspiration_pneumonia',
    severity: 'complicated',
    label: {
      en: 'Aspiration Pneumonia',
      sw: 'Nimonia ya Kuvuta Chakula / Tapika Mapafuni',
    },
    presentation: {
      en: 'Pneumonia developing after a person has inhaled (aspirated) gastric contents, food, secretions, or oral bacteria into the lungs — typically because the protective swallowing or cough reflexes were impaired. Classic settings: post-stroke patients with dysphagia, elderly people with reduced consciousness, post-operative patients, alcohol intoxication, seizures, severe head injury, patients with feeding tubes, advanced dementia, and end-of-life states. The infection often involves the right lower lobe (anatomy of the airways), is frequently polymicrobial (mouth flora plus anaerobes), and presents either acutely (fever, cough, breathlessness within days of the aspiration event) or more chronically (recurrent low-grade pneumonia in someone with ongoing swallowing trouble).',
      sw: 'Nimonia inayoendelea baada ya mtu kuvuta (aspirate) yaliyomo ya tumboni, chakula, secretions, au bakteria za kinywani mapafuni — kawaida kwa sababu reflexes za ulinzi za kumeza au kukohoa zilidhoofika. Mipangilio ya kawaida: wagonjwa baada ya kiharusi wenye dysphagia, watu wazee wenye ufahamu uliopungua, wagonjwa wa baada ya upasuaji, ulevi wa pombe, kifafa, jeraha kubwa la kichwa, wagonjwa wenye mirija ya kulisha, dementia ya hali ya juu, na hali za mwisho wa maisha. Maambukizi mara nyingi yanahusisha lobe ya chini ya kulia (anatomia ya njia za hewa), mara kwa mara ni polymicrobial (mouth flora pamoja na anaerobes), na hujitokeza ama kwa papo hapo (homa, kikohozi, kushindwa kupumua ndani ya siku za tukio la aspiration) au kwa muda mrefu zaidi (nimonia inayorudia ya kiwango cha chini kwa mtu mwenye matatizo ya kumeza yanayoendelea).',
      sw_mtaa: 'Pneumonia inayoendelea baada ya mtu kuvuta (aspirate) gastric contents, chakula, secretions, au oral bacteria mapafuni — kawaida kwa sababu protective swallowing au cough reflexes zilidhoofika. Classic settings: post-stroke patients wenye dysphagia, elderly people wenye reduced consciousness, post-operative patients, alcohol intoxication, seizures, severe head injury, patients wenye feeding tubes, advanced dementia, na end-of-life states. Infection mara nyingi inahusisha right lower lobe (anatomy ya airways), frequently ni polymicrobial (mouth flora plus anaerobes), na inajitokeza ama acutely (fever, cough, breathlessness ndani ya siku za aspiration event) au more chronically (recurrent low-grade pneumonia kwa mtu mwenye ongoing swallowing trouble).',
    },
    recognitionSigns: [
      {
        en: 'A history of aspiration event, dysphagia, reduced consciousness, or feeding-tube use',
        sw: 'Historia ya tukio la aspiration, dysphagia, ufahamu uliopungua, au matumizi ya mrija wa kulisha',
        sw_mtaa: 'History ya aspiration event, dysphagia, reduced consciousness, au feeding-tube use',
      },
      {
        en: 'Cough, fever, breathlessness, often with foul-smelling sputum (anaerobic flora)',
        sw: 'Kikohozi, homa, kushindwa kupumua, mara nyingi na makohozi yenye harufu mbaya (anaerobic flora)',
        sw_mtaa: 'Cough, fever, breathlessness, mara nyingi na foul-smelling sputum (anaerobic flora)',
      },
      {
        en: 'X-ray showing infiltrate typically in the right lower lobe (or wherever gravity took the aspirated material)',
        sw: 'X-ray ikionyesha infiltrate kawaida katika lobe ya chini ya kulia (au popote nguvu ya uvutano ilipoleta material iliyovutwa)',
        sw_mtaa: 'X-ray ikionyesha infiltrate kawaida katika right lower lobe (au popote gravity ilipoleta aspirated material)',
      },
      {
        en: 'Recurrent or non-resolving pneumonia in a person with chronic swallowing or consciousness problems',
        sw: 'Nimonia inayorudia au isiyotatua kwa mtu mwenye matatizo sugu ya kumeza au ufahamu',
        sw_mtaa: 'Recurrent au non-resolving pneumonia kwa mtu mwenye chronic swallowing au consciousness problems',
      },
    ],
    treatmentJourney: {
      en: 'Treatment of aspiration pneumonia covers both the infection and the underlying aspiration risk — without addressing the second, the first will recur. Antibiotic choice typically covers oral flora and anaerobes: co-amoxiclav is commonly first-line; metronidazole may be added for severe anaerobic involvement; severe cases need IV therapy. Supportive care: oxygen as needed, fluids cautiously, position the person upright (semi-Fowler\'s) to reduce further aspiration. Address the why: swallowing assessment by a speech and language therapist where available, modified consistency of food and fluids, head-of-bed elevation, oral care (the mouth-bacteria load matters), review of medications causing sedation, careful enteral feeding protocols, and in severe cases consideration of feeding-tube routes that bypass the swallow. Prevention is the long game: every recurrent aspiration pneumonia is a chance to do better next time.',
      sw: 'Matibabu ya nimonia ya aspiration yanafunika maambukizi na hatari ya aspiration ya msingi — bila kushughulika na ya pili, ya kwanza itarudia. Chaguo la antibiotic kawaida hufunika oral flora na anaerobes: co-amoxiclav kawaida ni first-line; metronidazole inaweza kuongezwa kwa uhusika mkubwa wa anaerobic; kesi kali zinahitaji IV therapy. Huduma ya kuunga mkono: oksijeni kama inavyohitajika, kioevu kwa tahadhari, weka mtu wima (semi-Fowler\'s) kupunguza aspiration zaidi. Shughulika na kwa nini: tathmini ya kumeza na speech and language therapist pale anapopatikana, urekebishaji wa msimamo wa chakula na kioevu, head-of-bed elevation, huduma ya kinywa (mzigo wa bakteria wa kinywa unajali), mapitio ya dawa zinazosababisha sedation, itifaki za makini za enteral feeding, na katika kesi kali kufikiria njia za feeding-tube zinazopita kumeza. Kuzuia ni mchezo wa muda mrefu: kila aspiration pneumonia inayorudia ni nafasi ya kufanya vizuri zaidi mara ijayo.',
      sw_mtaa: 'Treatment ya aspiration pneumonia inafunika both infection na underlying aspiration risk — without kushughulika na second, first itarudia. Antibiotic choice kawaida inafunika oral flora na anaerobes: co-amoxiclav kawaida ni first-line; metronidazole inaweza kuongezwa kwa severe anaerobic involvement; severe cases zinahitaji IV therapy. Supportive care: oxygen kama inahitajika, fluids cautiously, position mtu upright (semi-Fowler\'s) kupunguza further aspiration. Address the why: swallowing assessment na speech and language therapist pale inapopatikana, modified consistency ya chakula na fluids, head-of-bed elevation, oral care (mouth-bacteria load inajali), review ya medications zinazosababisha sedation, careful enteral feeding protocols, na katika severe cases consideration ya feeding-tube routes zinazobypass swallow. Prevention ni long game: kila recurrent aspiration pneumonia ni nafasi ya kufanya vizuri zaidi next time.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Sudden severe breathlessness during or just after a feed/swallow — possible massive aspiration. EMERGENCY',
          sw: 'Kushindwa kupumua kali kwa ghafla wakati au tu baada ya kula/kumeza — uwezekano wa aspiration kubwa. DHARURA',
          sw_mtaa: 'Sudden severe breathlessness wakati au tu baada ya kula/swallow — uwezekano wa massive aspiration. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Worsening despite antibiotics, new fever, or expanding chest signs — consider lung abscess, empyema, or resistant organism',
          sw: 'Kuzidi kuwa mbaya licha ya antibiotic, homa mpya, au dalili za kifua zinazopanua — fikiria lung abscess, empyema, au kiumbe sugu',
          sw_mtaa: 'Worsening licha ya antibiotics, new fever, au expanding chest signs — fikiria lung abscess, empyema, au resistant organism',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Long-term focus is preventing the next aspiration. Swallowing rehabilitation in post-stroke patients can return function in many cases. Oral hygiene programmes lower the bacterial load and reduce aspiration pneumonia even when the swallow itself remains impaired. Family training — how to feed safely, when to stop, how to position — is one of the highest-yield interventions. In end-of-life care, the goals shift to comfort: aggressive antibiotic and intubation strategies may not align with the person\'s wishes, and these conversations belong in the care plan early, not at the moment of the next crisis.',
      sw: 'Mkazo wa muda mrefu ni kuzuia aspiration inayofuata. Urejesho wa kumeza kwa wagonjwa baada ya kiharusi unaweza kurudisha kazi katika kesi nyingi. Programu za usafi wa mdomo hupunguza mzigo wa bakteria na kupunguza aspiration pneumonia hata wakati kumeza yenyewe inabaki imedhoofika. Mafunzo ya familia — jinsi ya kulisha kwa usalama, lini kusimama, jinsi ya kuweka — ni mojawapo ya hatua zenye mavuno makubwa zaidi. Katika huduma ya mwisho wa maisha, malengo huhama kwa faraja: mikakati ya ukali ya antibiotic na intubation huenda isilingane na matakwa ya mtu, na mazungumzo haya yanapaswa kuwa katika mpango wa huduma mapema, sio wakati wa mgogoro unaofuata.',
      sw_mtaa: 'Long-term focus ni preventing next aspiration. Swallowing rehabilitation kwa post-stroke patients inaweza kurudisha function katika kesi nyingi. Oral hygiene programmes zinapunguza bacterial load na kupunguza aspiration pneumonia hata wakati swallow yenyewe inabaki imedhoofika. Family training — jinsi ya kulisha safely, lini kusimama, jinsi ya kuweka — ni mojawapo ya highest-yield interventions. Katika end-of-life care, goals zinashift kwa comfort: aggressive antibiotic na intubation strategies huenda hazialignishi na person\'s wishes, na conversations hizi zinapaswa kuwa katika care plan mapema, sio wakati wa next crisis.',
    },
    sources: [
      src('WHO_AMR_2023'),
      src('NTLG_STG_2023'),
      src('MUHIMBILI_PROTOCOLS'),
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PNEUMOCYSTIS PNEUMONIA (PJP / PCP) — HIV-ASSOCIATED
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'pjp',
    severity: 'critical',
    population: 'with_hiv',
    label: {
      en: 'Pneumocystis Pneumonia (PJP / PCP) — HIV-associated',
      sw: 'Nimonia ya Pneumocystis (PJP / PCP) — Inayohusishwa na VVU',
    },
    presentation: {
      en: 'A person with advanced HIV (typically CD4 < 200) developing progressive cough — often dry, sometimes minimal sputum — and progressive breathlessness, particularly on exertion. The story usually unfolds over days to weeks rather than acutely. A characteristic feature is exercise desaturation: at rest the SpO2 may be near-normal, but a short walk or climbing stairs drops it sharply. Chest examination can be surprisingly unremarkable for how unwell the person is. Chest X-ray classically shows bilateral perihilar interstitial infiltrates, though it can be normal in early disease. Untreated PJP carries a high mortality in advanced HIV. Cotrimoxazole prophylaxis (the cornerstone of advanced HIV care in Tanzania) prevents most cases — its presence in the regimen is one of the strongest arguments against ever skipping doses.',
      sw: 'Mtu mwenye VVU ya hali ya juu (kawaida CD4 < 200) anayepata kikohozi kinachoendelea — mara nyingi kavu, wakati mwingine makohozi machache — na kushindwa kupumua kunakoendelea, hasa wakati wa juhudi. Hadithi kawaida hujitokeza kwa siku hadi wiki badala ya papo hapo. Sifa ya tabia ni exercise desaturation: wakati wa kupumzika SpO2 inaweza kuwa karibu-kawaida, lakini matembezi mafupi au kupanda ngazi huishusha kwa kasi. Uchunguzi wa kifua unaweza kuwa wa kushangaza usio wa kawaida kwa jinsi mtu alivyo mgonjwa. X-ray ya kifua kwa kawaida huonyesha bilateral perihilar interstitial infiltrates, ingawa inaweza kuwa ya kawaida katika ugonjwa wa mapema. PJP isiyotibiwa hubeba vifo vya juu katika VVU ya hali ya juu. Kinga ya cotrimoxazole (msingi wa huduma ya VVU ya hali ya juu Tanzania) huzuia kesi nyingi — uwepo wake katika regimen ni mojawapo ya hoja zenye nguvu zaidi dhidi ya kuwahi kuruka dose.',
      sw_mtaa: 'Mtu mwenye advanced VVU (kawaida CD4 < 200) anayepata progressive cough — mara nyingi dry, wakati mwingine minimal sputum — na progressive breathlessness, particularly on exertion. Story kawaida inajitokeza kwa siku hadi wiki badala ya acutely. Characteristic feature ni exercise desaturation: at rest SpO2 inaweza kuwa near-normal, lakini matembezi mafupi au kupanda ngazi inaishusha sharply. Chest examination inaweza kuwa surprisingly unremarkable kwa jinsi mtu alivyo unwell. Chest X-ray classically inaonyesha bilateral perihilar interstitial infiltrates, ingawa inaweza kuwa normal katika early disease. Untreated PJP inabeba high mortality katika advanced HIV. Cotrimoxazole prophylaxis (cornerstone ya advanced HIV care Tanzania) inazuia most cases — presence yake katika regimen ni mojawapo ya strongest arguments dhidi ya kuwahi kuskip doses.',
    },
    recognitionSigns: [
      {
        en: 'Progressive dry cough and breathlessness over days to weeks in someone with HIV (especially CD4 < 200)',
        sw: 'Kikohozi kavu kinachoendelea na kushindwa kupumua kwa siku hadi wiki kwa mtu mwenye VVU (hasa CD4 < 200)',
        sw_mtaa: 'Progressive dry cough na breathlessness kwa siku hadi wiki kwa mtu mwenye VVU (hasa CD4 < 200)',
      },
      {
        en: 'Exercise desaturation: SpO2 drops on a short walk or stair climb',
        sw: 'Exercise desaturation: SpO2 inashuka kwa matembezi mafupi au kupanda ngazi',
        sw_mtaa: 'Exercise desaturation: SpO2 inashuka kwa short walk au stair climb',
      },
      {
        en: 'Chest examination often quieter than expected for the breathlessness — "more sick than the chest suggests"',
        sw: 'Uchunguzi wa kifua mara nyingi mtulivu kuliko inavyotarajiwa kwa kushindwa kupumua — "mgonjwa zaidi kuliko kifua kinachosema"',
        sw_mtaa: 'Chest examination mara nyingi quieter kuliko expected kwa breathlessness — "more sick kuliko chest inavyosuggest"',
      },
      {
        en: 'Chest X-ray with bilateral perihilar infiltrates (classic) — but can be normal early',
        sw: 'X-ray ya kifua na bilateral perihilar infiltrates (ya kawaida) — lakini inaweza kuwa ya kawaida mapema',
        sw_mtaa: 'Chest X-ray na bilateral perihilar infiltrates (classic) — lakini inaweza kuwa normal mapema',
      },
      {
        en: 'Often the first sign of advanced HIV in someone not previously known to be HIV-positive — HIV testing is part of the workup',
        sw: 'Mara nyingi dalili ya kwanza ya VVU ya hali ya juu kwa mtu ambaye hajulikani awali kuwa na VVU — upimaji wa VVU ni sehemu ya uchunguzi',
        sw_mtaa: 'Mara nyingi first sign ya advanced HIV kwa mtu ambaye haijulikani previously kuwa HIV-positive — HIV testing ni sehemu ya workup',
      },
    ],
    treatmentJourney: {
      en: 'Treatment of PJP centres on high-dose cotrimoxazole (trimethoprim-sulfamethoxazole) — the same medicine many PLHIV already take as low-dose prophylaxis, given at a much higher dose for treatment for 21 days. For moderate-to-severe disease (PaO2 < 70 mmHg or SpO2 < 92% on room air), corticosteroids (prednisolone) are added — the steroids dampen the inflammatory damage that the dying organisms cause and meaningfully lower mortality. Oxygen is supportive. Alternatives for severe sulfa allergy include clindamycin-primaquine or IV pentamidine. ART is started or continued in parallel — early ART (within 2 weeks) is generally beneficial in PJP, unlike some other opportunistic infections where it is delayed. After 21 days of treatment, lifelong secondary prophylaxis (low-dose cotrimoxazole) continues until immune reconstitution (CD4 > 200 for 3-6 months on ART).',
      sw: 'Matibabu ya PJP yanazingatia cotrimoxazole ya dose ya juu (trimethoprim-sulfamethoxazole) — dawa ile ile ambayo PLHIV wengi tayari hutumia kama kinga ya dose ndogo, inayotolewa kwa dose ya juu zaidi kwa matibabu kwa siku 21. Kwa ugonjwa wa wastani-hadi-mkali (PaO2 < 70 mmHg au SpO2 < 92% kwa hewa ya kawaida), corticosteroids (prednisolone) zinaongezwa — steroids hupunguza uharibifu wa uvimbe ambao viumbe vinavyokufa husababisha na hupunguza kwa maana vifo. Oksijeni ni ya kuunga mkono. Mbadala kwa mzio mkali wa sulfa ni pamoja na clindamycin-primaquine au pentamidine ya IV. ART inaanzwa au inaendelea sambamba — ART ya mapema (ndani ya wiki 2) kwa ujumla ni ya manufaa katika PJP, tofauti na maambukizi mengine ya nyemelezi ambapo inacheleweshwa. Baada ya siku 21 za matibabu, kinga ya pili ya maisha (cotrimoxazole ya dose ndogo) huendelea hadi immune reconstitution (CD4 > 200 kwa miezi 3-6 kwenye ART).',
      sw_mtaa: 'Treatment ya PJP inazingatia high-dose cotrimoxazole (trimethoprim-sulfamethoxazole) — same dawa ambayo PLHIV wengi tayari wanatumia kama low-dose prophylaxis, given at much higher dose kwa treatment kwa siku 21. Kwa moderate-to-severe disease (PaO2 < 70 mmHg au SpO2 < 92% on room air), corticosteroids (prednisolone) zinaongezwa — steroids zinapunguza inflammatory damage ambayo dying organisms zinasababisha na zinapunguza meaningfully mortality. Oxygen ni supportive. Alternatives kwa severe sulfa allergy ni pamoja na clindamycin-primaquine au IV pentamidine. ART inaanzwa au inaendelea in parallel — early ART (within wiki 2) ni generally beneficial katika PJP, tofauti na other opportunistic infections ambapo inacheleweshwa. Baada ya siku 21 za treatment, lifelong secondary prophylaxis (low-dose cotrimoxazole) inaendelea hadi immune reconstitution (CD4 > 200 kwa miezi 3-6 on ART).',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Worsening breathlessness or SpO2 dropping despite treatment — EMERGENCY: consider switching to IV regimen, intensifying care',
          sw: 'Kushindwa kupumua kuzidi au SpO2 kushuka licha ya matibabu — DHARURA: fikiria kubadili kwa regimen ya IV, kuongeza nguvu ya huduma',
          sw_mtaa: 'Worsening breathlessness au SpO2 dropping licha ya treatment — DHARURA: fikiria kubadili kwa IV regimen, intensifying care',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Severe rash, jaundice, or blood test changes on high-dose cotrimoxazole — URGENT: drug toxicity, may need to switch',
          sw: 'Vipele vikali, manjano, au mabadiliko ya vipimo vya damu kwenye cotrimoxazole ya dose ya juu — HARAKA: sumu ya dawa, inaweza kuhitaji kubadilishwa',
          sw_mtaa: 'Severe rash, jaundice, au blood test changes kwenye high-dose cotrimoxazole — URGENT: drug toxicity, inaweza kuhitaji kubadilishwa',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'After PJP, the priority is preventing recurrence and getting the immune system back. Secondary cotrimoxazole prophylaxis continues until CD4 has been above 200 for 3-6 months on suppressive ART. ART adherence is critical — PJP often happens in people who have fallen out of HIV care, and re-engagement at this moment is one of the highest-yield interventions in the whole of HIV medicine. Screen for and treat other advanced-HIV opportunistic infections (cryptococcus, TB) that often coexist. Vaccinations as appropriate. Counsel about exercise tolerance returning gradually over weeks. This event is also a "teachable moment" — many people will engage with care more consistently after a near-miss like this.',
      sw: 'Baada ya PJP, kipaumbele ni kuzuia kurudia na kurudisha kinga. Kinga ya pili ya cotrimoxazole inaendelea hadi CD4 imekuwa juu ya 200 kwa miezi 3-6 kwenye ART inayodhibiti. Kuzingatia ART ni muhimu — PJP mara nyingi hutokea kwa watu walioanguka nje ya huduma ya VVU, na re-engagement kwa wakati huu ni mojawapo ya hatua zenye mavuno makubwa zaidi katika dawa yote ya VVU. Chunguza na utibu maambukizi mengine ya nyemelezi ya VVU ya hali ya juu (cryptococcus, TB) ambayo mara nyingi huambatana. Chanjo kama inavyofaa. Shauri kuhusu uvumilivu wa mazoezi kurudi taratibu kwa wiki. Tukio hili pia ni "wakati wa kufundishika" — watu wengi wataingia katika huduma kwa msimamo zaidi baada ya near-miss kama hii.',
      sw_mtaa: 'Baada ya PJP, priority ni preventing recurrence na kupata immune system back. Secondary cotrimoxazole prophylaxis inaendelea hadi CD4 imekuwa juu ya 200 kwa miezi 3-6 on suppressive ART. ART adherence ni critical — PJP mara nyingi inatokea kwa watu walioanguka nje ya HIV care, na re-engagement kwa wakati huu ni mojawapo ya highest-yield interventions katika whole of HIV medicine. Screen na utibu other advanced-HIV opportunistic infections (cryptococcus, TB) ambazo mara nyingi zinacoexist. Vaccinations kama inavyofaa. Counsel kuhusu exercise tolerance kurudi gradually kwa wiki. Event hii pia ni "teachable moment" — watu wengi wataengage na care more consistently baada ya near-miss kama hii.',
    },
    sources: [
      src('NACP_ART_2024'),
      src('WHO_HIV_2024'),
      src('NTLG_STG_2023'),
      src('MUHIMBILI_PROTOCOLS'),
    ],
  },
];
