/**
 * Artemether-Lumefantrine (ALu / Coartem) — Drug Knowledge
 *
 * First-line treatment for uncomplicated Plasmodium falciparum malaria in Tanzania.
 *
 * Sources: NMCP Tanzania 2024, WHO Guidelines for Malaria 2024, NTLG STG 2023,
 *          BNF Current, EMC Current.
 *
 * Standard formulations in Tanzania:
 *   - Adult: 20/120 mg (artemether 20mg + lumefantrine 120mg) tablets
 *   - Pediatric dispersible: 20/120 mg dispersible tablets
 *   - Pediatric: weight-banded packaging (5-14kg, 15-24kg, 25-34kg, ≥35kg)
 *
 * NOTE: This file does NOT prescribe specific doses. Engine educates on
 * what to expect, side effects, interactions, and continuity — NOT dosing.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const ALU: DrugKnowledge = {
  id: 'alu',
  aliases: DRUG_ALIASES.alu,
  drugClass: {
    en: 'Artemisinin-based combination therapy (ACT)',
    sw: 'Tiba mchanganyiko wenye artemisinin (ACT)',
  },

  whatItDoes: {
    en: 'ALu (Artemether-Lumefantrine, brand name Coartem) is a combination of two anti-malaria medicines that work together to kill the malaria parasite in your blood. Artemether acts fast — it knocks down the parasite count within hours. Lumefantrine clears any parasites left behind, preventing the malaria from coming back. The combination prevents the parasite from developing resistance to either drug alone.',
    sw: 'ALu (Artemether-Lumefantrine, jina la biashara Coartem) ni mchanganyiko wa dawa mbili za malaria zinazofanya kazi pamoja kuua vimelea vya malaria katika damu yako. Artemether inafanya kazi haraka — inashusha idadi ya vimelea ndani ya masaa. Lumefantrine inaondoa vimelea vyovyote vilivyobaki, kuzuia malaria isirudi. Mchanganyiko huu unazuia vimelea kuendeleza upinzani dhidi ya dawa moja peke yake.',
    sw_mtaa: 'ALu (au Coartem) ni mchanganyiko wa dawa mbili za malaria zinazofanya kazi pamoja kuua vimelea vya malaria kwenye damu. Artemether inafanya kazi haraka — inashusha vimelea ndani ya masaa. Lumefantrine inaondoa vimelea vilivyobaki, kuzuia malaria isirudi. Kuwekwa pamoja kunazuia vimelea ku-develop upinzani dhidi ya dawa moja peke yake.',
  },

  commonUses: [
    {
      en: 'First-line treatment for uncomplicated Plasmodium falciparum malaria in adults and children — the standard of care in Tanzania since 2006.',
      sw: 'Matibabu ya kwanza ya malaria ya kawaida ya Plasmodium falciparum kwa watu wazima na watoto — kiwango cha utunzaji Tanzania tangu 2006.',
      sw_mtaa: 'Matibabu ya kwanza ya malaria ya kawaida (Plasmodium falciparum) kwa watu wazima na watoto — standard ya Tanzania tangu 2006.',
    },
    {
      en: 'Treatment of malaria in the second and third trimesters of pregnancy (first trimester usually treated with quinine instead).',
      sw: 'Matibabu ya malaria katika trimester ya pili na ya tatu ya ujauzito (trimester ya kwanza kawaida hutibiwa kwa quinine badala yake).',
      sw_mtaa: 'Matibabu ya malaria katika trimester ya pili na ya tatu ya mimba (trimester ya kwanza kawaida hutibiwa kwa quinine).',
    },
    {
      en: 'Completion of malaria treatment after initial parenteral artesunate in severe malaria — once the patient is well enough to swallow.',
      sw: 'Kumalizia matibabu ya malaria baada ya artesunate ya mishipa ya awali katika malaria kali — mara mgonjwa anaweza kumeza.',
      sw_mtaa: 'Kumalizia matibabu ya malaria baada ya artesunate ya mishipa katika malaria kali — mgonjwa anapoweza kumeza.',
    },
  ],

  howItIsTaken: {
    en: 'Twice a day for 3 days — that is 6 doses total. The doses are taken at 0 hours, 8 hours, 24, 36, 48, and 60 hours. In practice: first dose now, second 8 hours later (same day), then morning and evening of day 2 and day 3. CRITICAL: take with food containing fat — milk, peanut butter, eggs, or a fatty meal — because the lumefantrine half is poorly absorbed without fat. Take all 6 doses even if you feel better after the first day. If you vomit within 30 minutes of a dose, repeat the dose. If you miss a dose by more than 4 hours, take it as soon as you remember and continue the schedule.',
    sw: 'Mara mbili kwa siku kwa siku 3 — hiyo ni jumla ya dose 6. Dose huchukuliwa saa 0, masaa 8 baadaye, 24, 36, 48, na 60. Kivitendo: dose ya kwanza sasa, ya pili masaa 8 baadaye (siku ile ile), kisha asubuhi na jioni ya siku ya 2 na siku ya 3. MUHIMU SANA: kunywa pamoja na chakula chenye mafuta — maziwa, siagi ya karanga, mayai, au mlo wenye mafuta — kwa sababu sehemu ya lumefantrine haifyonzwi vizuri bila mafuta. Tumia dose zote 6 hata ukijisikia vizuri baada ya siku ya kwanza. Ikiwa unatapika ndani ya dakika 30 baada ya dose, rudia dose. Ukikosa dose kwa zaidi ya masaa 4, ichukue mara unapokumbuka na endelea na ratiba.',
    sw_mtaa: 'Mara mbili kwa siku kwa siku 3 — jumla dose 6. Dose huchukuliwa saa 0, masaa 8 baadaye, 24, 36, 48, na 60. Kivitendo: dose ya kwanza sasa, ya pili masaa 8 baadaye (siku ile ile), kisha asubuhi na jioni ya siku ya 2 na siku ya 3. MUHIMU SANA: kunywa na chakula chenye mafuta — maziwa, peanut butter, mayai, au mlo wenye mafuta — kwa sababu lumefantrine haifyonzwi vizuri bila mafuta. Maliza dose 6 hata ukijisikia poa baada ya siku ya kwanza. Ukitapika ndani ya dakika 30 baada ya kumeza, rudia dose. Ukikosa dose kwa zaidi ya masaa 4, ichukue mara unapokumbuka na endelea.',
  },

  commonSideEffects: [
    {
      en: 'Headache — usually mild, often improves as malaria itself improves.',
      sw: 'Kichwa — kawaida nyepesi, mara nyingi hupungua malaria yenyewe inavyoboreka.',
      sw_mtaa: 'Kichwa — kawaida nyepesi, mara nyingi hupungua malaria inavyopona.',
    },
    {
      en: 'Loss of appetite and nausea — mild, comes and goes, eat smaller meals if needed.',
      sw: 'Kupoteza hamu ya kula na kichefuchefu — kidogo, kinakuja na kunaenda, kula milo midogo ikiwa inahitajika.',
      sw_mtaa: 'Hamu ya kula chini na kichefuchefu — kidogo, inakuja na kuondoka, kula milo midogo ikiwa unahitaji.',
    },
    {
      en: 'Dizziness — usually mild; do not drive or operate machinery if affected.',
      sw: 'Kizunguzungu — kawaida kidogo; usiendeshe gari au mashine ikiwa unahisi.',
      sw_mtaa: 'Kizunguzungu — kawaida kidogo; usiendeshe gari au mashine ukiwa unahisi.',
    },
    {
      en: 'Sleep disturbance — vivid dreams or trouble falling asleep in the first few days.',
      sw: 'Usingizi wa kuvuruga — ndoto kali au shida ya kupata usingizi katika siku za kwanza.',
      sw_mtaa: 'Usingizi wa kuvuruga — ndoto kali au shida ya kupata usingizi katika siku za kwanza.',
    },
    {
      en: 'Muscle and joint aches — usually overlap with malaria itself; improve as treatment continues.',
      sw: 'Maumivu ya misuli na viungo — kwa kawaida yanaingiliana na malaria yenyewe; hupungua matibabu yanapoendelea.',
      sw_mtaa: 'Maumivu ya misuli na viungo — kwa kawaida yanaingiliana na malaria; hupungua matibabu yanapoendelea.',
    },
    {
      en: 'Mild palpitations (feeling your heart beat).',
      sw: 'Mapigo ya moyo kidogo (kuhisi mapigo ya moyo wako).',
      sw_mtaa: 'Mapigo ya moyo kidogo (kuhisi mapigo ya moyo wako).',
    },
    {
      en: 'Cough — mild, can occur, usually self-limiting.',
      sw: 'Kikohozi — kidogo, kinaweza kutokea, kawaida hupotea chenyewe.',
      sw_mtaa: 'Kikohozi — kidogo, kinaweza kutokea, kawaida hupotea chenyewe.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Severe allergic reaction — swelling of lips, tongue, face, throat; difficulty breathing; severe rash with peeling skin. Stop ALu and go to hospital immediately.',
        sw: 'Athari kali ya mzio — uvimbe wa midomo, ulimi, uso, koo; kushindwa kupumua; vipele vikali pamoja na ngozi kubanduka. Acha ALu na nenda hospitali mara moja.',
        sw_mtaa: 'Athari kali ya mzio — uvimbe wa midomo, ulimi, uso, koo; kushindwa kupumua; vipele vikali na ngozi kubanduka. Acha ALu na nenda hospitali MARA MOJA.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Persistent vomiting that prevents you from keeping doses down — the malaria itself or the medicine. Cannot complete treatment by mouth — needs reassessment, possibly intravenous treatment.',
        sw: 'Kutapika kunakoendelea kunakuzuia kushikilia dose — malaria yenyewe au dawa. Huwezi kumaliza matibabu kwa mdomo — inahitaji ukaguzi tena, huenda matibabu ya mishipa.',
        sw_mtaa: 'Kutapika kunakuzuia kushikilia dose — malaria yenyewe au dawa. Huwezi kumaliza matibabu kwa mdomo — inahitaji ukaguzi tena, huenda matibabu ya mishipa.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Fever that does not improve after 48 hours of ALu, or symptoms worsening instead of getting better — possible treatment failure or wrong diagnosis. See a clinician.',
        sw: 'Homa ambayo haitiki baada ya masaa 48 ya ALu, au dalili kuzidi badala ya kuboreka — uwezekano wa kushindwa kwa matibabu au utambuzi usio sahihi. Ona daktari.',
        sw_mtaa: 'Homa isiyopungua baada ya masaa 48 ya ALu, au dalili kuzidi badala ya kupona — uwezekano wa treatment failure au utambuzi usio sahihi. Ona daktari.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellow eyes, dark urine, severe upper-right abdominal pain — possible liver injury. Stop ALu and see a doctor within 24 hours.',
        sw: 'Macho ya njano, mkojo wa giza, maumivu makali ya tumbo upande wa kulia juu — uwezekano wa uharibifu wa ini. Acha ALu na ona daktari ndani ya masaa 24.',
        sw_mtaa: 'Macho ya njano, mkojo wa giza, maumivu makali ya tumbo upande wa kulia juu — uwezekano wa uharibifu wa ini. Acha ALu na ona daktari ndani ya masaa 24.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Fainting, rapid or irregular heartbeat — rare but serious. Lumefantrine can affect heart rhythm in certain people, especially with other QT-prolonging medicines. Go to a clinic immediately.',
        sw: 'Kuzimia, mapigo ya moyo haraka au yasiyo ya kawaida — nadra lakini muhimu. Lumefantrine inaweza kuathiri midundo ya moyo kwa baadhi ya watu, hasa pamoja na dawa nyingine zinazoongeza QT. Nenda kliniki mara moja.',
        sw_mtaa: 'Kuzimia, mapigo ya moyo haraka au yasiyo ya kawaida — nadra lakini muhimu. Lumefantrine inaweza kuathiri midundo ya moyo kwa baadhi ya watu, hasa pamoja na dawa nyingine. Nenda kliniki mara moja.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'New convulsions, severe drowsiness, confusion, or inability to wake — could mean malaria is worsening to cerebral malaria. EMERGENCY.',
        sw: 'Kifafa kipya, usingizi mzito, kuchanganyikiwa, au kushindwa kuamka — inaweza maanisha malaria inazidi kuwa malaria ya ubongo. DHARURA.',
        sw_mtaa: 'Kifafa kipya, usingizi mzito, kuchanganyikiwa, au kushindwa kuamka — inaweza maanisha malaria inazidi kuwa malaria ya ubongo. DHARURA.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'efavirenz',
      withDisplay: {
        en: 'Efavirenz (HIV medicine, part of older first-line ART regimens)',
        sw: 'Efavirenz (dawa ya VVU, sehemu ya regimen ya zamani ya ART)',
      },
      severity: 'caution',
      explanation: {
        en: 'Efavirenz lowers blood levels of lumefantrine, which can reduce ALu effectiveness. Most patients on efavirenz still respond to ALu, but watch closely for treatment failure. Tanzania moved most patients to TLD (dolutegravir-based), which does NOT have this problem. If you are on TLD, no issue.',
        sw: 'Efavirenz inashusha viwango vya lumefantrine kwenye damu, ambacho kinaweza kupunguza ufanisi wa ALu. Wagonjwa wengi wanaotumia efavirenz bado wanajibu ALu, lakini angalia kwa makini kushindwa kwa matibabu. Tanzania iliwahamisha wagonjwa wengi kwenda TLD (yenye dolutegravir), ambayo HAINA tatizo hili. Kama uko kwenye TLD, hakuna tatizo.',
        sw_mtaa: 'Efavirenz inashusha viwango vya lumefantrine kwenye damu, ambacho kinaweza kupunguza ufanisi wa ALu. Wengi wanaotumia efavirenz bado wanajibu ALu, lakini angalia treatment failure. Tanzania iliwahamisha wengi kwenda TLD (yenye dolutegravir), ambayo HAINA tatizo hili. Kama uko kwenye TLD, hakuna shida.',
      },
      sources: [src('WHO_MALARIA_2024'), src('NACP_ART_2024')],
    },
    {
      with: 'nevirapine',
      withDisplay: {
        en: 'Nevirapine (older HIV medicine)',
        sw: 'Nevirapine (dawa ya VVU ya zamani)',
      },
      severity: 'caution',
      explanation: {
        en: 'Similar to efavirenz, nevirapine can reduce lumefantrine levels. Most patients in Tanzania are no longer on nevirapine — if you are, tell the clinician so they can monitor your response carefully.',
        sw: 'Sawa na efavirenz, nevirapine inaweza kupunguza viwango vya lumefantrine. Wagonjwa wengi Tanzania hawatumii tena nevirapine — kama unatumia, mwambie daktari ili afuatilie mwitikio wako kwa makini.',
        sw_mtaa: 'Sawa na efavirenz, nevirapine inaweza kushusha viwango vya lumefantrine. Wagonjwa wengi Tanzania hawatumii tena nevirapine — kama unatumia, mwambie daktari ili afuatilie kwa makini.',
      },
      sources: [src('WHO_MALARIA_2024')],
    },
    {
      with: 'rifampicin',
      withDisplay: {
        en: 'Rifampicin (TB medicine, part of RHZE)',
        sw: 'Rifampicin (dawa ya TB, sehemu ya RHZE)',
      },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin can lower lumefantrine levels. ALu can still be used during TB treatment, but the clinician will monitor response. Do NOT skip TB drugs because of malaria — both diseases need their own treatment.',
        sw: 'Rifampicin inaweza kushusha viwango vya lumefantrine. ALu bado inaweza kutumiwa wakati wa matibabu ya TB, lakini daktari atafuatilia mwitikio. USIRUKE dawa za TB kwa sababu ya malaria — magonjwa yote yanahitaji matibabu yao.',
        sw_mtaa: 'Rifampicin inaweza kushusha viwango vya lumefantrine. ALu bado inaweza kutumiwa wakati wa matibabu ya TB, lakini daktari atafuatilia. USIRUKE dawa za TB kwa sababu ya malaria — magonjwa yote yanahitaji matibabu yao.',
      },
      sources: [src('WHO_MALARIA_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'qt_prolonging_drugs',
      withDisplay: {
        en: 'Other heart-rhythm-affecting drugs (some antipsychotics, certain antibiotics, antiarrhythmics, methadone)',
        sw: 'Dawa nyingine zinazoathiri mdundo wa moyo (baadhi ya antipsychotic, antibiotics fulani, antiarrhythmic, methadone)',
      },
      severity: 'caution',
      explanation: {
        en: 'ALu can prolong the QT interval on ECG slightly. Combined with other QT-prolonging drugs, this can increase the risk of dangerous heart rhythms. Tell the clinician all medicines you are on (including over-the-counter and herbal). The risk is small but real, especially in older adults or people with heart disease.',
        sw: 'ALu inaweza kuongeza kipindi cha QT kwenye ECG kidogo. Pamoja na dawa nyingine zinazoongeza QT, hii inaweza kuongeza hatari ya midundo hatari ya moyo. Mwambie daktari dawa zote unazotumia (ikiwa ni pamoja na zile zisizo na maagizo na mitishamba). Hatari ni ndogo lakini ya kweli, hasa kwa wazee au watu wenye ugonjwa wa moyo.',
        sw_mtaa: 'ALu inaweza kuongeza kipindi cha QT kwenye ECG kidogo. Pamoja na dawa nyingine zinazoongeza QT, hii inaweza kuongeza hatari ya midundo hatari ya moyo. Mwambie daktari dawa zote unazotumia (ikiwa ni pamoja na zile zisizo na maagizo na mitishamba). Hatari ni ndogo lakini ya kweli, hasa kwa wazee au wenye ugonjwa wa moyo.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'pregnancy_first_trimester',
      withDisplay: {
        en: 'First trimester of pregnancy (weeks 1-13)',
        sw: 'Trimester ya kwanza ya ujauzito (wiki 1-13)',
      },
      severity: 'caution',
      explanation: {
        en: 'For decades, ALu was avoided in the first trimester due to limited safety data — and quinine + clindamycin was recommended instead. WHO 2024 updated this: ALu can be used in the first trimester when quinine is not available or not tolerated, because data now show no excess risk of birth defects. The default in Tanzania is still quinine for first-trimester malaria. Discuss with the obstetric team.',
        sw: 'Kwa miongo, ALu iliepukwa katika trimester ya kwanza kutokana na data ndogo za usalama — na quinine pamoja na clindamycin ilipendekezwa badala yake. WHO 2024 ilibadilisha hii: ALu inaweza kutumika katika trimester ya kwanza wakati quinine haipatikani au haivumiliwi, kwa sababu data sasa zinaonyesha hakuna hatari ya ziada ya kasoro za kuzaliwa. Default Tanzania bado ni quinine kwa malaria ya trimester ya kwanza. Jadili na timu ya uzazi.',
        sw_mtaa: 'Kwa miongo, ALu iliepukwa trimester ya kwanza kutokana na data ndogo za usalama — na quinine pamoja na clindamycin ilipendekezwa badala yake. WHO 2024 ilibadilisha hii: ALu inaweza kutumika trimester ya kwanza wakati quinine haipatikani au haivumiliwi, kwa sababu data sasa zinaonyesha hakuna hatari ya ziada. Default Tanzania bado ni quinine kwa malaria ya trimester ya kwanza. Jadili na daktari wa uzazi.',
      },
      sources: [src('WHO_MALARIA_2024'), src('NMCP_MALARIA_2024')],
    },
    {
      with: 'grapefruit_juice',
      withDisplay: {
        en: 'Grapefruit juice',
        sw: 'Juice ya grapefruit',
      },
      severity: 'caution',
      explanation: {
        en: 'Grapefruit juice can raise blood levels of lumefantrine and may increase the risk of side effects, especially heart rhythm changes. Avoid grapefruit juice during the 3 days of ALu treatment.',
        sw: 'Juice ya grapefruit inaweza kuinua viwango vya lumefantrine kwenye damu na inaweza kuongeza hatari ya athari, hasa mabadiliko ya midundo ya moyo. Epuka juice ya grapefruit wakati wa siku 3 za matibabu ya ALu.',
        sw_mtaa: 'Juice ya grapefruit inaweza kupandisha viwango vya lumefantrine kwenye damu na kuongeza hatari ya side effects, hasa mabadiliko ya midundo ya moyo. Epuka juice ya grapefruit wakati wa siku 3 za matibabu ya ALu.',
      },
      sources: [src('EMC_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Food and how to take', sw: 'Chakula na jinsi ya kunywa' },
      note: {
        en: 'ALWAYS take with food containing fat — milk, peanut butter, eggs, avocado, or a fatty meal. Without fat, only about half of the lumefantrine is absorbed, which means the malaria may not be fully cleared and can come back. If a child does not eat well during malaria, breastmilk works for infants; for older children, full-fat milk or a small spoon of peanut butter does the job. Do not crush adult tablets for children — use dispersible tablets if a child cannot swallow.',
        sw: 'DAIMA tumia pamoja na chakula chenye mafuta — maziwa, siagi ya karanga, mayai, avocado, au mlo wenye mafuta. Bila mafuta, ni karibu nusu tu ya lumefantrine inafyonzwa, ambacho maana yake malaria huenda isiondolewe kabisa na inaweza kurudi. Ikiwa mtoto hali vizuri wakati wa malaria, maziwa ya mama yanafanya kazi kwa watoto wachanga; kwa watoto wakubwa, maziwa kamili au kijiko kidogo cha siagi ya karanga kinatosha. Usisake vidonge vya watu wazima kwa watoto — tumia vidonge vya dispersible ikiwa mtoto hawezi kumeza.',
        sw_mtaa: 'DAIMA tumia na chakula chenye mafuta — maziwa, peanut butter, mayai, avocado, au mlo wenye mafuta. Bila mafuta, ni karibu nusu tu ya lumefantrine inafyonzwa, maana yake malaria inaweza isiondolewe kabisa na kurudi. Mtoto akiwa hali vizuri wakati wa malaria, maziwa ya mama yanafanya kazi kwa watoto wachanga; watoto wakubwa, maziwa kamili au kijiko cha peanut butter. Usisake vidonge vya watu wazima kwa watoto — tumia dispersible tablets ikiwa mtoto hawezi kumeza.',
      },
    },
    {
      topic: { en: 'Alcohol', sw: 'Pombe' },
      note: {
        en: 'Avoid alcohol during the 3 days of ALu treatment. Alcohol can increase nausea, dizziness, and the small risk of heart rhythm effects. It also dehydrates you when malaria already does that. After completing all 6 doses, light alcohol can resume — but if you have had severe malaria with liver or kidney involvement, ask your doctor when it is safe.',
        sw: 'Epuka pombe wakati wa siku 3 za matibabu ya ALu. Pombe inaweza kuongeza kichefuchefu, kizunguzungu, na hatari ndogo ya athari za midundo ya moyo. Pia inakukauseni wakati malaria tayari inafanya hivyo. Baada ya kumaliza dose zote 6, pombe ya kidogo inaweza kuanza tena — lakini ikiwa umekuwa na malaria kali yenye uharibifu wa ini au figo, muulize daktari wakati ni salama.',
        sw_mtaa: 'Epuka pombe wakati wa siku 3 za matibabu ya ALu. Pombe inaweza kuongeza kichefuchefu, kizunguzungu, na hatari ndogo ya athari za moyo. Pia inakausha mwili wakati malaria tayari inafanya hivyo. Baada ya kumaliza dose 6 zote, pombe ya kidogo inaweza kuanza tena — lakini ikiwa ulipata malaria kali yenye uharibifu wa ini au figo, muulize daktari kwanza.',
      },
    },
    {
      topic: { en: 'Pregnancy and breastfeeding', sw: 'Mimba na kunyonyesha' },
      note: {
        en: 'ALu is safe in the second and third trimesters of pregnancy — and untreated malaria is far more dangerous than the medicine. In the first trimester, quinine is usually preferred, though ALu can be used when quinine is unavailable. During breastfeeding, very little ALu passes into breastmilk and it is considered safe to continue. Tell the doctor the age of your baby — for breastfed infants, the mother can usually continue normally.',
        sw: 'ALu ni salama katika trimester ya pili na ya tatu ya mimba — na malaria isiyotibiwa ni hatari zaidi kuliko dawa. Katika trimester ya kwanza, quinine kwa kawaida hupendelewa, ingawa ALu inaweza kutumika quinine inapokosekana. Wakati wa kunyonyesha, ALu kidogo sana inapita kwenye maziwa ya mama na inachukuliwa kuwa salama kuendelea. Mwambie daktari umri wa mtoto wako — kwa watoto wanaonyonya, mama anaweza kuendelea kawaida.',
        sw_mtaa: 'ALu ni salama trimester ya pili na ya tatu ya mimba — na malaria isiyotibiwa ni hatari zaidi kuliko dawa. Trimester ya kwanza, quinine kawaida hupendelewa, lakini ALu inaweza kutumika kama quinine haipatikani. Wakati wa kunyonyesha, ALu kidogo sana inapita kwenye maziwa ya mama na ni salama kuendelea. Mwambie daktari umri wa mtoto wako — watoto wanaonyonya, mama anaweza kuendelea kawaida.',
      },
    },
    {
      topic: { en: 'Driving and machinery', sw: 'Kuendesha gari na mashine' },
      note: {
        en: 'ALu can cause dizziness and fatigue, especially in the first 2 days. Avoid driving boda-boda, cars, or operating machinery until you know how it affects you. Malaria itself also reduces your alertness — even without ALu, do not drive while sick with malaria.',
        sw: 'ALu inaweza kusababisha kizunguzungu na uchovu, hasa katika siku 2 za kwanza. Epuka kuendesha boda-boda, gari, au kuendesha mashine hadi ujue inakuathiri vipi. Malaria yenyewe pia inapunguza tahadhari yako — hata bila ALu, usiendeshe ukiwa mgonjwa wa malaria.',
        sw_mtaa: 'ALu inaweza kusababisha kizunguzungu na uchovu, hasa siku 2 za kwanza. Epuka kuendesha boda-boda, gari, au mashine hadi ujue inakuathiri vipi. Malaria yenyewe pia inapunguza tahadhari — hata bila ALu, usiendeshe ukiwa mgonjwa wa malaria.',
      },
    },
    {
      topic: { en: 'Storage', sw: 'Kuhifadhi' },
      note: {
        en: 'Keep ALu in its original blister pack, in a cool dry place, away from direct sunlight. Do not store in a hot car or near the stove. Once you start a course, finish it within the 3-day schedule — do not save leftover doses for another time. If the tablets look discolored, broken, or have a strange smell, return them to a pharmacy.',
        sw: 'Hifadhi ALu katika pakti yake ya asili (blister), mahali pa baridi na kavu, mbali na jua moja kwa moja. Usihifadhi katika gari la moto au karibu na jiko. Mara unapoanza kozi, malizia ndani ya ratiba ya siku 3 — usihifadhi dose zilizobaki kwa wakati mwingine. Ikiwa vidonge vinaonekana kupungua rangi, kuvunjika, au vina harufu ya ajabu, virudishe kwa duka la dawa.',
        sw_mtaa: 'Hifadhi ALu katika pakti yake ya asili (blister), mahali pa baridi na kavu, mbali na jua moja kwa moja. Usihifadhi kwenye gari la moto au karibu na jiko. Mara unapoanza kozi, malizia ndani ya ratiba ya siku 3 — usihifadhi dose zilizobaki kwa wakati mwingine. Ikiwa vidonge vinaonekana kupungua rangi, kuvunjika, au vina harufu ya ajabu, virudishe duka la dawa.',
      },
    },
    {
      topic: { en: 'Completing the course', sw: 'Kumaliza kozi' },
      note: {
        en: 'You will likely feel better after 24-48 hours. DO NOT stop taking ALu just because you feel better. The medicine kills parasites in waves — stopping early leaves some alive, which can lead to treatment failure and resistance. Take all 6 doses. The full course is short — only 3 days. Save the empty blister pack to show your follow-up clinician if needed.',
        sw: 'Huenda utajisikia vizuri zaidi baada ya masaa 24-48. USISIMAMISHE ALu kwa sababu unajisikia vizuri. Dawa inaua vimelea kwa mawimbi — kusimamisha mapema kunaacha baadhi hai, ambayo inaweza kusababisha kushindwa kwa matibabu na upinzani. Tumia dose zote 6. Kozi nzima ni fupi — siku 3 tu. Hifadhi pakti tupu ya blister kuonyesha kwa daktari wa ufuatiliaji ikiwa inahitajika.',
        sw_mtaa: 'Huenda utajisikia vizuri zaidi baada ya masaa 24-48. USISIMAMISHE ALu kwa sababu unajisikia vizuri. Dawa inaua vimelea kwa mawimbi — kusimamisha mapema kunaacha baadhi hai, ambayo inaweza kusababisha treatment failure na resistance. Tumia dose zote 6. Kozi nzima ni fupi — siku 3 tu. Hifadhi blister tupu kuonyesha kwa daktari ikiwa inahitajika.',
      },
    },
  ],

  sources: [
    src('NMCP_MALARIA_2024'),
    src('WHO_MALARIA_2024'),
    src('NTLG_STG_2023'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
