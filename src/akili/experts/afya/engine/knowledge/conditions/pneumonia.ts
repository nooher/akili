/**
 * Pneumonia — Full Condition Knowledge (Phase 8, 100% all-in coverage)
 *
 * Sources: WHO Revised Childhood Pneumonia 2022, IMCI 2024, WHO AWaRe 2023,
 *          WHO Oxygen 2023, NTLG STG 2023, Muhimbili Protocols, NACP_ART
 *          2024 (PCP cross-ref), NTLP TB 2024 (TB differential).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in via variants):
 *   • CAP adult (community-acquired pneumonia, outpatient/mild-moderate)
 *   • Severe pneumonia (chest indrawing or SpO2 <90% — needs admission)
 *   • Pediatric pneumonia (IMCI thresholds, fast breathing by age, danger
 *     signs in <5s — a top killer of Tanzanian children)
 *   • HAP/HCAP (hospital-acquired/health-care-associated — different
 *     organisms, broader antibiotics)
 *   • PJP/PCP (Pneumocystis pneumonia — HIV-associated, cross-ref Phase 5)
 *   • Aspiration pneumonia (elderly, post-stroke, post-op, NG tube)
 *
 * Comorbidities: HIV (PCP, lower threshold for severe disease), TB
 * (the cough differential), malnutrition (worsens outcomes), asthma/COPD,
 * diabetes, sickle cell, pregnancy.
 *
 * SCOPE: We educate patients, families, and caregivers on what pneumonia
 * is, how it presents, what the warning signs are (especially in children),
 * what antibiotics do and do not do, and when to seek care. We do NOT
 * prescribe specific dose regimens or replace clinical judgment.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { PNEUMONIA_VARIANTS } from './pneumonia.variants';

export const PNEUMONIA: ConditionKnowledge = {
  id: 'pneumonia',
  aliases: CONDITION_ALIASES.pneumonia,
  category: 'respiratory',

  whatItIs: {
    en: 'Pneumonia is an infection of the lung tissue — the tiny air sacs (alveoli) where oxygen crosses into the bloodstream. When the air sacs fill with pus, fluid, or inflammation, less oxygen gets through, breathing becomes harder and faster, and the person feels unwell. The infection can be caused by bacteria (most commonly Streptococcus pneumoniae), viruses (including influenza, RSV, and SARS-CoV-2), or — in people with weakened immunity — opportunistic organisms like Pneumocystis jirovecii. The right antibiotic depends on which organism is suspected, the severity, the patient\'s age, immune status, and whether they have been in hospital recently. In Tanzania, pneumonia remains a leading cause of death — especially in children under 5 and in adults with HIV, malnutrition, or chronic disease. The good news is that most pneumonia is treatable when caught early and given the right antibiotic plus, when needed, oxygen.',
    sw: 'Nimonia ni maambukizi ya tishu za mapafu — vifuko vidogo vya hewa (alveoli) ambapo oksijeni hupita kwenda kwenye damu. Vifuko hivyo vya hewa vinapojaa usaha, kioevu, au uvimbe, oksijeni kidogo hupita, kupumua kunakuwa kugumu na haraka, na mtu hajisikii vizuri. Maambukizi yanaweza kusababishwa na bakteria (mara nyingi Streptococcus pneumoniae), virusi (ikijumuisha influenza, RSV, na SARS-CoV-2), au — kwa watu wenye kinga dhaifu — viumbe nyemelezi kama Pneumocystis jirovecii. Antibiotic sahihi inategemea kiumbe gani kinashukiwa, ukali, umri wa mgonjwa, hali ya kinga, na kama amekuwa hospitalini hivi karibuni. Tanzania, nimonia bado ni sababu kuu ya vifo — hasa kwa watoto chini ya miaka 5 na watu wazima wenye VVU, utapiamlo, au magonjwa sugu. Habari njema ni kwamba nimonia nyingi zinatibika zinapogundulika mapema na kupewa antibiotic sahihi pamoja na, inapohitajika, oksijeni.',
    sw_mtaa: 'Nimonia ni maambukizi ya tissue ya mapafu — vifuko vidogo vya hewa (alveoli) ambapo oksijeni inapita kwenda kwenye damu. Vifuko hivyo vinapojaa pus, kioevu, au inflammation, oksijeni kidogo inapita, kupumua kunakuwa kugumu na haraka, na mtu hajisikii vizuri. Infection inaweza kusababishwa na bacteria (mara nyingi Streptococcus pneumoniae), virusi (ikijumuisha influenza, RSV, na SARS-CoV-2), au — kwa watu wenye kinga dhaifu — opportunistic organisms kama PCP. Antibiotic sahihi inategemea organism gani inashukiwa, severity, umri wa mgonjwa, immune status, na kama amekuwa hospitalini hivi karibuni. Tanzania, nimonia bado ni leading cause of death — hasa kwa watoto chini ya miaka 5 na watu wazima wenye VVU, malnutrition, au chronic disease. Habari njema ni kwamba nimonia nyingi zinatibika zinapogundulika mapema na kupewa right antibiotic plus oxygen inapohitajika.',
  },

  whyItMatters: {
    en: 'Pneumonia is the single biggest infectious killer of children worldwide and remains a top cause of death across all ages in Tanzania. What makes it so dangerous is also what makes it treatable: it can move from mild to life-threatening over hours, but it almost always announces itself first — through cough, fever, fast breathing, and a feeling of being unwell. Three habits save lives. First, recognise fast breathing in a child as a danger sign and not "just a cold." Second, do not wait days hoping a cough will pass when fever is high, breathing is hard, or the chest is drawing in. Third, complete the full antibiotic course — stopping early when you feel better is one of the biggest drivers of treatment failure and antibiotic resistance. For people with HIV, the threshold to seek care for any cough or breathlessness should be even lower, because pneumonia (including PCP and bacterial pneumonia) progresses faster and is more often the first sign of advanced disease.',
    sw: 'Nimonia ni mwuaji mkubwa zaidi wa watoto duniani na inabaki sababu kuu ya vifo katika rika zote Tanzania. Kinachoifanya iwe hatari ni pia kinachoifanya itibike: inaweza kuhama kutoka ndogo hadi inayotishia maisha katika masaa, lakini karibu daima hujitangaza kwanza — kupitia kikohozi, homa, kupumua haraka, na kujihisi si mzima. Tabia tatu huokoa maisha. Kwanza, tambua kupumua haraka kwa mtoto kama dalili ya hatari na sio "mafua tu." Pili, usisubiri siku ukitumaini kikohozi kitapita wakati homa iko juu, kupumua ni kugumu, au kifua kinaingia ndani. Tatu, kamilisha kozi yote ya antibiotic — kusimamisha mapema unapojihisi vizuri ni mojawapo ya viendeshi vikubwa zaidi vya kushindwa kwa matibabu na upinzani wa antibiotic. Kwa watu wenye VVU, kizingiti cha kutafuta huduma kwa kikohozi chochote au kushindwa kupumua kinapaswa kuwa cha chini zaidi, kwa sababu nimonia (ikijumuisha PCP na nimonia ya bakteria) huendelea haraka zaidi na mara nyingi ni dalili ya kwanza ya ugonjwa wa hali ya juu.',
    sw_mtaa: 'Nimonia ni biggest infectious killer wa watoto duniani na inabaki top cause of death katika rika zote Tanzania. Kinachoifanya iwe hatari ni pia kinachoifanya itibike: inaweza kuhama kutoka mild hadi life-threatening katika masaa, lakini karibu daima inajitangaza kwanza — kupitia kikohozi, homa, fast breathing, na kujihisi si mzima. Tabia tatu zinaokoa maisha. Kwanza, tambua fast breathing kwa mtoto kama danger sign na sio "mafua tu." Pili, usisubiri siku ukitumaini kikohozi kitapita wakati homa iko juu, kupumua ni kugumu, au kifua kinaingia ndani. Tatu, complete kozi yote ya antibiotic — kusimamisha mapema unapojihisi vizuri ni mojawapo ya biggest drivers ya treatment failure na antibiotic resistance. Kwa watu wenye VVU, threshold ya kutafuta huduma kwa kikohozi chochote au breathlessness inapaswa kuwa lower, kwa sababu nimonia (ikijumuisha PCP na bacterial pneumonia) inaendelea haraka zaidi na mara nyingi ni first sign ya advanced disease.',
  },

  commonQuestions: [
    {
      q: {
        en: 'How do I know if it is just a cold or actually pneumonia?',
        sw: 'Najuaje kama ni mafua tu au nimonia kweli?',
      },
      a: {
        en: 'A cold is mostly in the nose and throat — runny nose, sneezing, mild cough, maybe a low fever, but the person is still up and about. Pneumonia is in the lung tissue — the cough is deeper and often produces sputum, breathing becomes faster and harder than the cold should explain, fever is usually higher (38°C or more), there can be sharp chest pain on breathing in, and the person feels genuinely unwell — tired, weak, not wanting to eat. In children specifically, fast breathing (counted over a full minute) is the single most reliable sign of pneumonia: more than 60/min in babies under 2 months, more than 50/min in 2 months to 1 year, more than 40/min in 1-5 years. If you see chest indrawing (the lower chest sinking in with each breath), grunting, or bluish lips, this is severe pneumonia and an emergency. When in doubt with any of these signs, go in — pneumonia treated late is far more dangerous than a "false alarm."',
        sw: 'Mafua ni hasa puani na kooni — mafua, kupiga chafya, kikohozi kidogo, labda homa kidogo, lakini mtu bado yuko amesimama na anatembea. Nimonia iko kwenye tishu ya mapafu — kikohozi ni kirefu zaidi na mara nyingi hutoa makohozi, kupumua kunakuwa haraka na kugumu zaidi kuliko mafua yanavyopaswa kueleza, homa kawaida iko juu zaidi (38°C au zaidi), kunaweza kuwa na maumivu makali ya kifua wakati wa kupumua ndani, na mtu anajihisi hajisikii vizuri kweli — uchovu, dhaifu, hataki kula. Kwa watoto haswa, kupumua haraka (kuhesabiwa kwa dakika kamili) ni dalili moja ya kuaminika zaidi ya nimonia: zaidi ya 60/dakika kwa watoto chini ya miezi 2, zaidi ya 50/dakika kwa miezi 2 hadi mwaka 1, zaidi ya 40/dakika kwa miaka 1-5. Ukiona kifua kuingia ndani (chini ya kifua kikishuka ndani kwa kila pumzi), kugruna, au midomo ya bluu, hii ni nimonia kali na dharura. Ukiwa na shaka na dalili zozote hizi, ingia — nimonia inayotibiwa kuchelewa ni hatari zaidi kuliko "tahadhari ya uongo."',
        sw_mtaa: 'Mafua ni hasa puani na kooni — runny nose, kupiga chafya, kikohozi kidogo, labda homa kidogo, lakini mtu bado yuko up and about. Nimonia iko kwenye lung tissue — kikohozi ni deeper na mara nyingi inatoa makohozi, breathing inakuwa haraka na kugumu zaidi kuliko cold inavyopaswa kueleza, homa kawaida iko juu zaidi (38°C au zaidi), kunaweza kuwa na sharp chest pain wakati wa kupumua ndani, na mtu anajihisi genuinely unwell — uchovu, dhaifu, hataki kula. Kwa watoto haswa, fast breathing (kuhesabiwa kwa full minute) ni single most reliable sign ya nimonia: zaidi ya 60/dakika kwa watoto chini ya miezi 2, zaidi ya 50/dakika kwa miezi 2 hadi mwaka 1, zaidi ya 40/dakika kwa miaka 1-5. Ukiona chest indrawing (lower chest ikiingia ndani kwa kila pumzi), grunting, au bluish lips, hii ni severe pneumonia na emergency. Ukiwa na shaka na danger signs zozote, ingia — pneumonia treated late ni hatari zaidi kuliko "false alarm."',
      },
    },
    {
      q: {
        en: 'My child is breathing fast — when is it really an emergency?',
        sw: 'Mtoto wangu anapumua haraka — ni wakati gani ni dharura kweli?',
      },
      a: {
        en: 'Fast breathing is the IMCI screening sign for pneumonia in any child under 5 — but some signs raise it to severe pneumonia / emergency immediately: lower chest wall indrawing (the chest sucks in below the ribs with each breath), grunting on each exhale, head bobbing, bluish lips or tongue (cyanosis), unable to drink or breastfeed, vomiting everything, convulsions, lethargy or difficult to wake, severe malnutrition with any breathing problem, or an SpO2 below 90% if you have a pulse oximeter. Any one of these means go directly to the nearest health facility — do not "wait until morning" or try home remedies. While preparing to travel, keep the child upright if breathing is hard (not flat on their back), continue breastfeeding if they can swallow, keep them warm but not overheated, and bring the child\'s health card if you have one. The team will assess fast and start oxygen plus an antibiotic if severe pneumonia is confirmed.',
        sw: 'Kupumua haraka ni dalili ya IMCI ya uchunguzi wa nimonia kwa mtoto yeyote chini ya miaka 5 — lakini baadhi ya dalili huinua hii hadi nimonia kali / dharura mara moja: kifua cha chini kuingia ndani (kifua kinakaribia kuvutwa ndani chini ya mbavu kwa kila pumzi), kugruna kwa kila pumzi ya nje, kichwa kupiga juu na chini, midomo au ulimi wa bluu (cyanosis), kushindwa kunywa au kunyonya, kutapika kila kitu, kifafa, ulegevu au ugumu wa kuamka, utapiamlo mkali na tatizo lolote la kupumua, au SpO2 chini ya 90% ikiwa una pulse oximeter. Yoyote moja ya hizi humaanisha nenda moja kwa moja kwenye kituo cha karibu cha afya — usisubiri "hadi asubuhi" au kujaribu tiba za nyumbani. Wakati unajiandaa kusafiri, weka mtoto akiwa amesimama wima kama kupumua ni kugumu (sio amelala chali), endelea kunyonyesha ikiwa anaweza kumeza, mtuze joto lakini sio joto kupita kiasi, na lete kadi ya afya ya mtoto kama una. Timu itachunguza haraka na kuanza oksijeni pamoja na antibiotic ikiwa nimonia kali itathibitishwa.',
        sw_mtaa: 'Fast breathing ni IMCI screening sign ya nimonia kwa mtoto yeyote chini ya miaka 5 — lakini baadhi ya dalili zinainua hii hadi severe pneumonia / emergency mara moja: lower chest wall indrawing (kifua kinajisuck in chini ya mbavu kwa kila pumzi), grunting kwa kila exhale, head bobbing, midomo au ulimi wa bluu (cyanosis), unable kunywa au kunyonya, kutapika kila kitu, convulsions, lethargy au ugumu wa kuamka, severe malnutrition na breathing problem yoyote, au SpO2 chini ya 90% ikiwa una pulse oximeter. Yoyote moja ya hizi inamaanisha nenda directly kwenye kituo cha karibu cha afya — usisubiri "hadi asubuhi" au home remedies. Wakati unajiandaa kusafiri, weka mtoto akiwa amesimama wima kama breathing ni kugumu (sio amelala chali), endelea kunyonyesha ikiwa anaweza kumeza, mtuze joto lakini sio overheated, na lete kadi ya afya ya mtoto kama una. Team itaassess haraka na kuanza oxygen plus antibiotic ikiwa severe pneumonia itathibitishwa.',
      },
    },
    {
      q: {
        en: 'Why do I have to finish the antibiotics if I am already feeling better?',
        sw: 'Kwa nini lazima nimalize antibiotics ikiwa tayari najisikia vizuri?',
      },
      a: {
        en: 'Feeling better after 2-3 days of antibiotics is exactly what should happen — but it does not mean the infection is gone. The antibiotic has knocked down the easier-to-kill bacteria first; the remaining ones are tougher and are the ones most likely to cause a relapse or to become resistant if the medicine stops early. Stopping antibiotics early is one of the biggest drivers of antibiotic resistance in Tanzania: the surviving bacteria carry genes that defeat the antibiotic, they spread, and the next person who needs that antibiotic finds it does not work. The standard course for adult uncomplicated CAP is usually 5 days; pediatric pneumonia 5 days; severe pneumonia longer and often switching from injection to oral. Take every dose, at the same times each day, with or without food as instructed. If you do not feel better by day 3, or feel worse, go back to the clinic — sometimes the choice of antibiotic needs changing, not just continuing longer.',
        sw: 'Kujisikia vizuri baada ya siku 2-3 za antibiotics ni jinsi inavyopaswa kutokea — lakini haimaanishi maambukizi yameisha. Antibiotic imeshusha bakteria zilizo rahisi kuua kwanza; zilizobaki ni ngumu zaidi na ndizo zenye uwezekano mkubwa wa kusababisha kurudi tena au kuwa sugu ikiwa dawa imesimamishwa mapema. Kusimamisha antibiotics mapema ni mojawapo ya viendeshi vikubwa zaidi vya upinzani wa antibiotic Tanzania: bakteria zilizobaki hubeba jeni zinazoshinda antibiotic, huenea, na mtu anayefuata anayehitaji antibiotic hiyo hugundua haifanyi kazi. Kozi ya kawaida ya CAP isiyo na shida kwa watu wazima kawaida ni siku 5; nimonia ya watoto siku 5; nimonia kali ni ndefu zaidi na mara nyingi hubadilisha kutoka sindano kwenda oral. Tumia kila dose, kwa nyakati zile zile kila siku, na chakula au bila chakula kama unavyoagizwa. Ikiwa hujisikii vizuri kufikia siku ya 3, au unajisikia vibaya zaidi, rudi kliniki — wakati mwingine chaguo la antibiotic linahitaji kubadilishwa, sio tu kuendelea kwa muda mrefu.',
        sw_mtaa: 'Kujisikia vizuri baada ya siku 2-3 za antibiotics ni exactly inavyopaswa kutokea — lakini haina maana infection imeisha. Antibiotic imeshusha easier-to-kill bacteria kwanza; remaining ones ni tougher na ndizo most likely kusababisha relapse au kuwa resistant ikiwa dawa imesimamishwa mapema. Kusimamisha antibiotics mapema ni mojawapo ya biggest drivers ya antibiotic resistance Tanzania: surviving bacteria zinabeba genes zinazodefeat antibiotic, zinaspread, na next person anayehitaji antibiotic hiyo anagundua haifanyi kazi. Standard course ya adult uncomplicated CAP kawaida ni siku 5; pediatric pneumonia siku 5; severe pneumonia longer na mara nyingi inabadilisha kutoka injection kwenda oral. Tumia kila dose, kwa nyakati zile zile kila siku, na chakula au bila chakula kama unavyoagizwa. Ikiwa hujisikii vizuri kufikia siku ya 3, au unajisikia vibaya zaidi, rudi kliniki — wakati mwingine choice ya antibiotic inahitaji kubadilishwa, sio tu kuendelea kwa muda mrefu.',
      },
    },
    {
      q: {
        en: 'I have HIV and a cough — is this just a cold or could it be PCP?',
        sw: 'Nina VVU na kikohozi — ni mafua tu au inaweza kuwa PCP?',
      },
      a: {
        en: 'Anyone with HIV and a new cough, especially with fever, breathlessness, or a low CD4 count, should be assessed without delay — the differential is wider and the conditions move faster. Three main things to think about: bacterial pneumonia (more common in HIV at any CD4), TB (which is the leading cause of cough and death in PLHIV in Tanzania — needs sputum GeneXpert), and PCP/PJP (Pneumocystis pneumonia, classic in advanced HIV with CD4 < 200, presenting with a dry cough, progressive breathlessness on exertion, and an SpO2 that drops with effort). Cotrimoxazole prophylaxis is one of the most powerful interventions in advanced HIV partly because it prevents PCP. The take-home: do not wait — get a sputum test, an SpO2 measured, a chest X-ray if possible, and if PCP is suspected, treatment with high-dose cotrimoxazole (often plus steroids) is started promptly. Continue your ART throughout.',
        sw: 'Mtu yeyote mwenye VVU na kikohozi kipya, hasa na homa, kushindwa kupumua, au CD4 ya chini, anapaswa kuchunguzwa bila kucheleweshwa — differential ni pana na hali zinasonga haraka. Mambo matatu makuu ya kufikiria: nimonia ya bakteria (ya kawaida zaidi katika VVU katika CD4 yoyote), TB (ambayo ni sababu kuu ya kikohozi na vifo kwa watu wenye VVU Tanzania — inahitaji GeneXpert ya makohozi), na PCP/PJP (nimonia ya Pneumocystis, ya kawaida katika VVU ya hali ya juu na CD4 < 200, ikijitokeza na kikohozi kavu, kushindwa kupumua kunakoendelea wakati wa juhudi, na SpO2 inayoshuka na juhudi). Kinga ya cotrimoxazole ni mojawapo ya hatua zenye nguvu zaidi katika VVU ya hali ya juu kwa sababu inazuia PCP. Hitimisho: usisubiri — pata kipimo cha makohozi, SpO2 imepimwa, X-ray ya kifua ikiwezekana, na ikiwa PCP inashukiwa, matibabu na cotrimoxazole ya dose kubwa (mara nyingi pamoja na steroids) huanzishwa haraka. Endelea na ART katika muda wote.',
        sw_mtaa: 'Mtu yeyote mwenye VVU na new cough, hasa na fever, breathlessness, au CD4 ya chini, anapaswa kuassessed without delay — differential ni pana na conditions zinasonga haraka. Mambo matatu makuu ya kufikiria: bacterial pneumonia (more common katika VVU katika CD4 yoyote), TB (ambayo ni leading cause ya cough na vifo kwa PLHIV Tanzania — inahitaji sputum GeneXpert), na PCP/PJP (Pneumocystis pneumonia, classic katika advanced HIV na CD4 < 200, ikijitokeza na dry cough, progressive breathlessness on exertion, na SpO2 inayoshuka na effort). Cotrimoxazole prophylaxis ni mojawapo ya most powerful interventions katika advanced HIV partly kwa sababu inazuia PCP. Take-home: usisubiri — pata sputum test, SpO2 imepimwa, chest X-ray ikiwezekana, na ikiwa PCP inashukiwa, treatment na high-dose cotrimoxazole (mara nyingi plus steroids) inaanzishwa promptly. Endelea na ART throughout.',
      },
    },
    {
      q: {
        en: 'Can pneumonia and TB look the same? How are they different?',
        sw: 'Nimonia na TB zinaweza kufanana? Zinatofautianaje?',
      },
      a: {
        en: 'They can look very similar at first, and clinicians have to think about both — especially in Tanzania where both are common. Some clues lean toward TB rather than ordinary bacterial pneumonia: a cough lasting more than 2-3 weeks; drenching night sweats; significant unintentional weight loss; coughing blood; close contact with a known TB case; HIV (especially with low CD4); chronic disease background. Bacterial pneumonia tends to come on over days, with high fever, productive cough, sometimes one-sided chest pain — and improves within 2-3 days of the right antibiotic. The key test in Tanzania is sputum GeneXpert, which detects TB DNA directly and is the gateway to the TB treatment pathway. Any cough lasting 2 weeks or more, or any cough in a person with HIV, deserves a TB test before assuming it is "just pneumonia." Both conditions can coexist; finding one does not rule out the other.',
        sw: 'Zinaweza kuonekana sawa sana mwanzoni, na madaktari lazima wafikirie zote — hasa Tanzania ambapo zote ni za kawaida. Baadhi ya viashiria vinavyoegemea kwa TB kuliko nimonia ya kawaida ya bakteria: kikohozi kinachodumu zaidi ya wiki 2-3; jasho la usiku linaloloweka; kupungua uzito kwa kiasi kikubwa bila kukusudia; kukohoa damu; mawasiliano ya karibu na kesi inayojulikana ya TB; VVU (hasa na CD4 ya chini); historia ya magonjwa sugu. Nimonia ya bakteria huja kwa siku, na homa kali, kikohozi chenye makohozi, wakati mwingine maumivu ya kifua upande mmoja — na hupungua ndani ya siku 2-3 za antibiotic sahihi. Kipimo muhimu Tanzania ni GeneXpert ya makohozi, ambacho hugundua DNA ya TB moja kwa moja na ni mlango wa njia ya matibabu ya TB. Kikohozi chochote kinachodumu wiki 2 au zaidi, au kikohozi chochote kwa mtu mwenye VVU, kinastahili kipimo cha TB kabla ya kudhani ni "nimonia tu." Hali zote mbili zinaweza kuwepo pamoja; kupata moja hakuondoi nyingine.',
        sw_mtaa: 'Zinaweza kuonekana sawa sana mwanzoni, na clinicians wanapaswa kufikiria zote — hasa Tanzania ambapo zote ni za kawaida. Baadhi ya clues zinazoegemea kwa TB kuliko ordinary bacterial pneumonia: kikohozi kinachodumu zaidi ya wiki 2-3; drenching night sweats; significant unintentional weight loss; kukohoa damu; close contact na known TB case; VVU (hasa na low CD4); chronic disease background. Bacterial pneumonia inakuja kwa siku, na high fever, productive cough, wakati mwingine one-sided chest pain — na inaboresha ndani ya siku 2-3 za right antibiotic. Key test Tanzania ni sputum GeneXpert, ambayo inadetect TB DNA directly na ni gateway kwa TB treatment pathway. Kikohozi chochote kinachodumu wiki 2 au zaidi, au cough yoyote kwa mtu mwenye VVU, kinastahili TB test kabla ya kudhani ni "nimonia tu." Hali zote mbili zinaweza coexist; kupata moja hakuondoi nyingine.',
      },
    },
    {
      q: {
        en: 'My family member was started on injection ceftriaxone — when do they switch to tablets?',
        sw: 'Ndugu yangu ameanzishwa sindano ya ceftriaxone — atabadilishwa lini kwa vidonge?',
      },
      a: {
        en: 'In severe pneumonia, IV (or IM) ceftriaxone is the inpatient backbone in Tanzania — it gets a high concentration into the blood fast and reliably, which oral medicines cannot match in someone who is vomiting, very breathless, or unable to swallow. The switch to an oral antibiotic happens when several things are true at once: fever has come down for about 24 hours, breathing has improved, the patient is alert and able to drink and eat normally, the underlying oxygen saturation is fine on room air or low-flow oxygen has been weaned off, and they can absorb tablets. The team usually steps down to oral amoxicillin (or co-amoxiclav, or an alternative depending on local sensitivities) to complete the course. The total duration is typically 5-7 days, sometimes longer for complicated pneumonia. Ask the team what the planned end date is and what to watch for after going home: persistent fever, return of breathlessness, or chest pain means come back, do not wait.',
        sw: 'Katika nimonia kali, ceftriaxone ya IV (au IM) ni msingi wa wagonjwa wa ndani Tanzania — inapata mkusanyiko mkubwa katika damu haraka na kwa uhakika, ambayo dawa za oral haziwezi kufanana kwa mtu anayetapika, anayepumua kwa shida sana, au asiyeweza kumeza. Kubadilisha kwa antibiotic ya oral hutokea wakati mambo kadhaa ni ya kweli kwa wakati mmoja: homa imeshuka kwa takriban masaa 24, kupumua kumeboreshwa, mgonjwa yu macho na anaweza kunywa na kula kawaida, kiwango cha oksijeni ya msingi ni vizuri katika hewa ya chumba au oksijeni ya mtiririko wa chini imeondolewa, na anaweza kufyonza vidonge. Timu kawaida hushuka kwenda amoxicillin ya oral (au co-amoxiclav, au mbadala kulingana na hisia za kienyeji) kumalizia kozi. Muda wa jumla kawaida ni siku 5-7, wakati mwingine zaidi kwa nimonia iliyo na shida. Uliza timu tarehe ya mwisho iliyopangwa ni ipi na nini cha kuangalia baada ya kwenda nyumbani: homa inayoendelea, kurudi kwa kushindwa kupumua, au maumivu ya kifua humaanisha rudi, usisubiri.',
        sw_mtaa: 'Katika severe pneumonia, IV (au IM) ceftriaxone ni inpatient backbone Tanzania — inapata high concentration katika damu fast na reliably, ambayo oral medicines haziwezi kumatch kwa mtu anayetapika, very breathless, au unable kumeza. Switch kwa oral antibiotic inatokea wakati several things ni za kweli kwa wakati mmoja: fever imeshuka kwa takriban masaa 24, breathing imeboreshwa, patient yu alert na anaweza kunywa na kula normally, underlying oxygen saturation ni fine on room air au low-flow oxygen imeondolewa, na anaweza kuabsorb tablets. Team kawaida inastep down kwenda oral amoxicillin (au co-amoxiclav, au alternative depending on local sensitivities) kumalizia kozi. Total duration kawaida ni siku 5-7, wakati mwingine longer kwa complicated pneumonia. Uliza team end date iliyopangwa ni ipi na nini cha kuangalia baada ya kwenda nyumbani: persistent fever, return ya breathlessness, au chest pain inamaanisha rudi, usisubiri.',
      },
    },
    {
      q: {
        en: 'What does it mean when the doctor says my oxygen is 88%?',
        sw: 'Inamaanisha nini wakati daktari anasema oksijeni yangu ni 88%?',
      },
      a: {
        en: 'SpO2 (oxygen saturation) is the percentage of haemoglobin in your blood that is carrying oxygen. Healthy values at sea level in Tanzania are usually 95-100%. An SpO2 of 88% means the lungs are not transferring enough oxygen into the blood — and 88% is well below the WHO threshold of 90% that defines severe pneumonia (or hypoxia from any cause). Below 90% your tissues are starting to run short, and below 85% the brain and heart are at risk. This is why oxygen treatment is started promptly when SpO2 is below 90%, and why low SpO2 (alone) in pneumonia means admission rather than oral antibiotics at home. The pulse oximeter is one of the cheapest, most powerful tools in Tanzanian primary care. If you have a personal oximeter, a SpO2 reading below 92% — especially with breathlessness — is a reason to go in promptly, not to wait.',
        sw: 'SpO2 (kiwango cha oksijeni) ni asilimia ya haemoglobini katika damu yako inayobeba oksijeni. Thamani zenye afya kwa kiwango cha bahari Tanzania kawaida ni 95-100%. SpO2 ya 88% inamaanisha mapafu hayasambazi oksijeni ya kutosha kwenye damu — na 88% iko chini sana ya kizingiti cha WHO cha 90% kinachofafanua nimonia kali (au hypoxia kutoka sababu yoyote). Chini ya 90% tishu zako zinaanza kupata upungufu, na chini ya 85% ubongo na moyo viko hatarini. Hii ndiyo sababu matibabu ya oksijeni huanzishwa haraka wakati SpO2 iko chini ya 90%, na kwa nini SpO2 ya chini (peke yake) katika nimonia humaanisha kulazwa badala ya antibiotics za oral nyumbani. Pulse oximeter ni mojawapo ya zana za bei nafuu zaidi, zenye nguvu zaidi katika huduma ya msingi ya Tanzania. Ikiwa una oximeter ya kibinafsi, usomaji wa SpO2 chini ya 92% — hasa na kushindwa kupumua — ni sababu ya kuingia haraka, sio kusubiri.',
        sw_mtaa: 'SpO2 (oxygen saturation) ni percentage ya haemoglobin katika damu yako inayobeba oksijeni. Healthy values kwa sea level Tanzania kawaida ni 95-100%. SpO2 ya 88% inamaanisha lungs hazitransferi oksijeni ya kutosha kwenye damu — na 88% iko well below WHO threshold ya 90% inayodefine severe pneumonia (au hypoxia kutoka cause yoyote). Below 90% tissues zako zinaanza kupata shortage, na below 85% brain na heart ziko at risk. Ndio sababu oxygen treatment inaanzishwa promptly wakati SpO2 iko below 90%, na kwa nini low SpO2 (alone) katika pneumonia inamaanisha admission badala ya oral antibiotics nyumbani. Pulse oximeter ni mojawapo ya cheapest, most powerful tools katika Tanzanian primary care. Ikiwa una personal oximeter, SpO2 reading below 92% — hasa na breathlessness — ni sababu ya kuingia promptly, sio kusubiri.',
      },
    },
    {
      q: {
        en: 'Can I prevent pneumonia? What about vaccines?',
        sw: 'Naweza kuzuia nimonia? Vipi kuhusu chanjo?',
      },
      a: {
        en: 'A lot of pneumonia is preventable, and Tanzania has strong tools. For children, the routine immunisation schedule includes the pneumococcal conjugate vaccine (PCV, against Streptococcus pneumoniae — the most common bacterial cause), Haemophilus influenzae type b (Hib, given as part of pentavalent), and measles (because measles itself causes severe pneumonia complications). Complete the full childhood schedule on time. Adults at higher risk — chronic lung disease, sickle cell, diabetes, HIV, age over 60, splenectomy — benefit from pneumococcal and influenza vaccines where available. Beyond vaccines: stop smoking (the single biggest modifiable risk factor for adult pneumonia), avoid indoor wood/charcoal smoke where possible, treat HIV with ART and keep CD4 up, manage diabetes and chronic disease well, and seek prompt care for any cold that worsens rather than improves. For children especially: exclusive breastfeeding for 6 months, complete vaccinations, good nutrition, and avoiding cooking smoke exposure all reduce pneumonia risk meaningfully.',
        sw: 'Nimonia nyingi inaweza kuzuiwa, na Tanzania ina zana imara. Kwa watoto, ratiba ya kawaida ya chanjo inajumuisha chanjo ya pneumococcal conjugate (PCV, dhidi ya Streptococcus pneumoniae — sababu ya kawaida ya bakteria), Haemophilus influenzae aina b (Hib, hutolewa kama sehemu ya pentavalent), na surua (kwa sababu surua yenyewe husababisha shida za nimonia kali). Maliza ratiba kamili ya utotoni kwa wakati. Watu wazima walio katika hatari kubwa — ugonjwa sugu wa mapafu, sickle cell, kisukari, VVU, umri zaidi ya 60, splenectomy — hunufaika na chanjo za pneumococcal na influenza pale zinapopatikana. Zaidi ya chanjo: acha kuvuta sigara (sababu kubwa zaidi inayoweza kubadilishwa ya hatari kwa nimonia ya watu wazima), epuka moshi wa kuni/mkaa ndani inapowezekana, tibu VVU na ART na uweke CD4 juu, dhibiti kisukari na magonjwa sugu vizuri, na tafuta huduma haraka kwa mafua yoyote yanayozidi kuwa mabaya badala ya kuboreshwa. Kwa watoto hasa: kunyonyesha kwa maziwa ya mama tu kwa miezi 6, kamilisha chanjo, lishe nzuri, na kuepuka kufichuliwa na moshi wa kupika yote hupunguza hatari ya nimonia kwa maana.',
        sw_mtaa: 'Pneumonia nyingi inaweza kuzuiwa, na Tanzania ina strong tools. Kwa watoto, routine immunisation schedule inajumuisha pneumococcal conjugate vaccine (PCV, dhidi ya Streptococcus pneumoniae — most common bacterial cause), Haemophilus influenzae type b (Hib, inatolewa kama sehemu ya pentavalent), na measles (kwa sababu measles yenyewe inasababisha severe pneumonia complications). Complete full childhood schedule on time. Watu wazima walio katika higher risk — chronic lung disease, sickle cell, diabetes, VVU, umri zaidi ya 60, splenectomy — wananufaika na pneumococcal na influenza vaccines pale zinapopatikana. Beyond vaccines: stop smoking (single biggest modifiable risk factor kwa adult pneumonia), avoid indoor wood/charcoal smoke pale inapowezekana, tibu VVU na ART na keep CD4 up, manage diabetes na chronic disease well, na seek prompt care kwa baridi yoyote inayozidi kuwa worse badala ya improve. Kwa watoto hasa: exclusive breastfeeding kwa miezi 6, complete vaccinations, good nutrition, na kuepuka cooking smoke exposure zote zinapunguza pneumonia risk meaningfully.',
      },
    },
    {
      q: {
        en: 'What happens if pneumonia is not treated?',
        sw: 'Nini kinatokea ikiwa nimonia haitatibiwa?',
      },
      a: {
        en: 'Untreated bacterial pneumonia can progress in days from a productive cough and fever to severe respiratory distress (the lungs simply cannot oxygenate the blood), septic shock (the body-wide inflammatory response to the infection causing low blood pressure and organ failure), pleural effusion or empyema (infected fluid collecting around the lung, sometimes needing a chest drain), or lung abscess. Severe pneumonia is one of the top causes of admission to ICU in Tanzania, and one of the top causes of in-hospital death — particularly in children under 5, the elderly, people with HIV, and people with malnutrition or other chronic illness. The good news is that the trajectory bends sharply when the right antibiotic and, if needed, oxygen are started on time. The window matters: pneumonia caught at fast-breathing stage is mostly treatable as an outpatient; pneumonia caught at chest-indrawing or low-SpO2 stage needs inpatient care; pneumonia caught at shock stage is much harder. Going in early is not over-caution; it is the single biggest determinant of outcome.',
        sw: 'Nimonia ya bakteria isiyotibiwa inaweza kuendelea katika siku kutoka kikohozi chenye makohozi na homa hadi dhiki kali ya kupumua (mapafu hayawezi kuoksijenate damu), septic shock (jibu la mwili lote la uvimbe kwa maambukizi kusababisha shinikizo la damu la chini na kushindwa kwa viungo), pleural effusion au empyema (kioevu kilichoambukizwa kinachokusanyika karibu na pafu, wakati mwingine kinahitaji drain ya kifua), au jipu la pafu. Nimonia kali ni mojawapo ya sababu kuu za kulazwa ICU Tanzania, na mojawapo ya sababu kuu za vifo hospitalini — hasa kwa watoto chini ya miaka 5, wazee, watu wenye VVU, na watu wenye utapiamlo au ugonjwa mwingine sugu. Habari njema ni kwamba trajectory inajipinda kwa kasi wakati antibiotic sahihi na, inapohitajika, oksijeni vinaanzishwa kwa wakati. Dirisha linajali: nimonia iliyogundulika katika hatua ya kupumua haraka kwa kiasi kikubwa inaweza kutibiwa kama mgonjwa wa nje; nimonia iliyogundulika katika hatua ya kifua kuingia ndani au SpO2 ya chini inahitaji huduma ya wagonjwa wa ndani; nimonia iliyogundulika katika hatua ya shock ni ngumu zaidi. Kuingia mapema sio tahadhari kupita kiasi; ni kiashiria kikubwa zaidi cha matokeo.',
        sw_mtaa: 'Untreated bacterial pneumonia inaweza kuprogress katika siku kutoka productive cough na fever hadi severe respiratory distress (lungs hazi-oxygenate damu), septic shock (body-wide inflammatory response kwa infection causing low BP na organ failure), pleural effusion au empyema (infected fluid inakusanyika karibu na lung, wakati mwingine inahitaji chest drain), au lung abscess. Severe pneumonia ni mojawapo ya top causes za ICU admission Tanzania, na mojawapo ya top causes za in-hospital death — particularly kwa watoto chini ya miaka 5, elderly, watu wenye VVU, na watu wenye malnutrition au chronic illness. Habari njema ni kwamba trajectory inajipinda kwa kasi wakati right antibiotic na, ikiwa needed, oxygen vinaanzishwa on time. Window inajali: pneumonia iliyokatch katika fast-breathing stage mostly inaweza kutibiwa as outpatient; pneumonia iliyokatch katika chest-indrawing au low-SpO2 stage inahitaji inpatient care; pneumonia iliyokatch katika shock stage ni much harder. Going in early sio over-caution; ni single biggest determinant ya outcome.',
      },
    },
    {
      q: {
        en: 'I am pregnant — is pneumonia more dangerous? Can I take the antibiotics?',
        sw: 'Nina mimba — nimonia ni hatari zaidi? Naweza kutumia antibiotics?',
      },
      a: {
        en: 'Pneumonia in pregnancy is more dangerous than in non-pregnant women of the same age: pregnant lungs sit higher in the chest (the diaphragm is pushed up by the growing uterus), so respiratory reserve is lower, and any fever or low oxygen also stresses the baby. Get assessed early. Most first-line pneumonia antibiotics ARE safe in pregnancy: amoxicillin, co-amoxiclav, ceftriaxone, erythromycin, and azithromycin are all commonly used. Some antibiotics are usually AVOIDED in pregnancy (tetracyclines, fluoroquinolones in many settings, sulfa drugs near term) — the prescriber will choose around these. Do not avoid antibiotics out of fear: untreated pneumonia is far more dangerous to mother and baby than the safe antibiotic choices. Vaccinations matter: influenza vaccine in pregnancy is safe and protective; pneumococcal vaccination is offered where indicated. Cross-reference the maternal care block for the wider pregnancy framework.',
        sw: 'Nimonia katika mimba ni hatari zaidi kuliko kwa wanawake wasio na mimba wa umri huo huo: mapafu ya mimba huketi juu zaidi kifuani (diaphragm husukumwa juu na mji wa mimba unaokua), hivyo akiba ya kupumua ni ya chini, na homa yoyote au oksijeni ya chini pia humsumbua mtoto. Pata kuchunguzwa mapema. Antibiotic nyingi za awali za nimonia NI salama katika mimba: amoxicillin, co-amoxiclav, ceftriaxone, erythromycin, na azithromycin zote hutumika kwa kawaida. Baadhi ya antibiotics kawaida HUEPUKWA katika mimba (tetracyclines, fluoroquinolones katika maeneo mengi, sulfa drugs karibu na muda kamili) — mtoa dawa atachagua kuzunguka hizi. Usiepuke antibiotics kwa hofu: nimonia isiyotibiwa ni hatari zaidi kwa mama na mtoto kuliko chaguzi salama za antibiotic. Chanjo zinajali: chanjo ya influenza katika mimba ni salama na inalinda; chanjo ya pneumococcal hutolewa pale inapoonyeshwa. Rejea block ya huduma za mama kwa mfumo mpana wa mimba.',
        sw_mtaa: 'Pneumonia katika mimba ni hatari zaidi kuliko kwa wanawake wasio pregnant wa umri huo huo: pregnant lungs zinakaa juu zaidi kifuani (diaphragm inasukumwa juu na growing uterus), hivyo respiratory reserve ni lower, na fever yoyote au low oxygen pia inastress baby. Pata kuassessed mapema. Most first-line pneumonia antibiotics NI safe katika mimba: amoxicillin, co-amoxiclav, ceftriaxone, erythromycin, na azithromycin zote zinatumika kwa kawaida. Baadhi ya antibiotics kawaida zinaepukwa katika mimba (tetracyclines, fluoroquinolones katika settings nyingi, sulfa drugs karibu na term) — prescriber atachoose kuzunguka hizi. Usiepuke antibiotics kwa hofu: untreated pneumonia ni far more dangerous kwa mama na mtoto kuliko safe antibiotic choices. Vaccinations zinajali: influenza vaccine katika mimba ni safe na protective; pneumococcal vaccination inatolewa pale indicated. Cross-reference maternal care block kwa wider pregnancy framework.',
      },
    },
    {
      q: {
        en: 'How is pneumonia treated at home versus in hospital?',
        sw: 'Nimonia inatibiwaje nyumbani dhidi ya hospitalini?',
      },
      a: {
        en: 'The decision depends on severity and risk factors, not on what you prefer. Mild-to-moderate community-acquired pneumonia (no chest indrawing, SpO2 ≥ 90% on room air, alert, eating and drinking, no major co-morbidities) can usually be treated at home with oral antibiotics — typically amoxicillin in Tanzania — for 5 days, with rest, plenty of fluids, paracetamol for fever, and a follow-up plan. Severe pneumonia (any of: chest indrawing, SpO2 < 90%, inability to drink, vomiting everything, lethargy, severe respiratory distress, hypotension) needs admission — IV/IM ceftriaxone, oxygen if hypoxic, IV fluids if needed, and monitoring. Special groups always benefit from a lower threshold: children under 5 with any breathing problem, adults with HIV especially low CD4, severe malnutrition, pregnancy, age over 65, sickle cell disease, severe chronic illness. Going home from hospital does not mean treatment is over — finish the oral switch and attend the follow-up visit; a chest X-ray in 4-6 weeks may be advised in adults to confirm resolution.',
        sw: 'Uamuzi unategemea ukali na sababu za hatari, sio unachopendelea. Nimonia ya jamii ya kiwango cha wastani (hakuna kifua kuingia ndani, SpO2 ≥ 90% kwa hewa ya chumba, macho, anakula na anakunywa, hakuna magonjwa makubwa yanayoambatana) kawaida inaweza kutibiwa nyumbani na antibiotics za oral — kawaida amoxicillin Tanzania — kwa siku 5, na kupumzika, kioevu cha kutosha, paracetamol kwa homa, na mpango wa kufuatilia. Nimonia kali (yoyote ya: kifua kuingia ndani, SpO2 < 90%, kushindwa kunywa, kutapika kila kitu, ulegevu, dhiki kali ya kupumua, shinikizo la damu la chini) inahitaji kulazwa — IV/IM ceftriaxone, oksijeni ikiwa hypoxic, kioevu cha IV ikiwa kinahitajika, na ufuatiliaji. Vikundi maalum daima hunufaika na kizingiti cha chini: watoto chini ya miaka 5 wenye tatizo lolote la kupumua, watu wazima wenye VVU hasa CD4 ya chini, utapiamlo mkali, mimba, umri zaidi ya 65, ugonjwa wa sickle cell, ugonjwa sugu mkubwa. Kuondoka hospitali haimaanishi matibabu yameisha — maliza kubadilisha kwa oral na uhudhurie ziara ya kufuatilia; X-ray ya kifua katika wiki 4-6 inaweza kushauriwa kwa watu wazima kuthibitisha kuponywa.',
        sw_mtaa: 'Decision inategemea severity na risk factors, sio unachopendelea. Mild-to-moderate CAP (hakuna chest indrawing, SpO2 ≥ 90% on room air, alert, anakula na anakunywa, no major co-morbidities) kawaida inaweza kutibiwa nyumbani na oral antibiotics — typically amoxicillin Tanzania — kwa siku 5, na rest, plenty of fluids, paracetamol kwa fever, na follow-up plan. Severe pneumonia (yoyote ya: chest indrawing, SpO2 < 90%, inability kunywa, kutapika kila kitu, lethargy, severe respiratory distress, hypotension) inahitaji admission — IV/IM ceftriaxone, oxygen ikiwa hypoxic, IV fluids ikiwa needed, na monitoring. Special groups daima zinanufaika na lower threshold: watoto chini ya miaka 5 na breathing problem yoyote, watu wazima na VVU especially low CD4, severe malnutrition, mimba, umri zaidi ya 65, sickle cell disease, severe chronic illness. Going home from hospital haina maana treatment imeisha — maliza oral switch na uhudhurie follow-up visit; chest X-ray katika wiki 4-6 inaweza kushauriwa kwa watu wazima kuthibitisha resolution.',
      },
    },
    {
      q: {
        en: 'Will antibiotics work if pneumonia is caused by a virus (like flu or COVID)?',
        sw: 'Antibiotics zitafanya kazi ikiwa nimonia inasababishwa na virusi (kama mafua au COVID)?',
      },
      a: {
        en: 'Antibiotics kill bacteria — they do nothing to viruses directly. Viral pneumonias (influenza, RSV, SARS-CoV-2) are treated supportively: fluids, fever control, oxygen if SpO2 falls, and specific antivirals for some viruses where available. The complication is that viral pneumonia often weakens the lungs enough that a bacterial pneumonia develops on top (secondary bacterial pneumonia), which then DOES need antibiotics. That is one reason clinicians sometimes start antibiotics in a sick patient with what looks viral — they are covering the bacterial possibility while the picture clarifies. The take-home: trust the clinician\'s judgement rather than the popular idea that antibiotics fix any cough. Unnecessary antibiotic courses fuel resistance for everyone in the community. If a course is started, finish it; if it is not started, ask why, listen to the explanation, and watch for the signs that say "come back" — worsening breathing, persistent fever beyond 3-4 days, chest pain, confusion, or any IMCI danger sign in a child.',
        sw: 'Antibiotics huua bakteria — hazifanyi chochote kwa virusi moja kwa moja. Nimonia za virusi (influenza, RSV, SARS-CoV-2) hutibiwa kwa kuunga mkono: kioevu, kudhibiti homa, oksijeni ikiwa SpO2 inashuka, na antivirals maalum kwa baadhi ya virusi pale zinapopatikana. Shida ni kwamba nimonia ya virusi mara nyingi hudhoofisha mapafu vya kutosha kwamba nimonia ya bakteria huendelea juu (nimonia ya bakteria ya pili), ambayo HUHITAJI antibiotics. Hiyo ni sababu moja ambayo madaktari wakati mwingine huanza antibiotics kwa mgonjwa wa kuugua na kile kinachoonekana kuwa cha virusi — wanafunika uwezekano wa bakteria wakati picha inafafanua. Hitimisho: amini hukumu ya daktari badala ya wazo maarufu kwamba antibiotics hutibu kikohozi chochote. Kozi za antibiotic zisizo za lazima huongeza upinzani kwa kila mtu jamiini. Ikiwa kozi imeanzishwa, imalize; ikiwa haijaanzishwa, uliza kwa nini, sikiliza maelezo, na uangalie dalili zinazosema "rudi" — kupumua kunazidi kuwa kubaya, homa inayoendelea zaidi ya siku 3-4, maumivu ya kifua, kuchanganyikiwa, au dalili yoyote ya hatari ya IMCI kwa mtoto.',
        sw_mtaa: 'Antibiotics zinauua bacteria — hazifanyi chochote kwa virusi directly. Viral pneumonias (influenza, RSV, SARS-CoV-2) zinatibiwa supportively: fluids, fever control, oxygen ikiwa SpO2 inashuka, na specific antivirals kwa baadhi ya virusi pale zinapopatikana. Complication ni kwamba viral pneumonia mara nyingi inadhoofisha lungs enough kwamba bacterial pneumonia inadevelop juu (secondary bacterial pneumonia), ambayo then DOES inahitaji antibiotics. Hiyo ni sababu moja ambayo clinicians wakati mwingine wanaanza antibiotics kwa sick patient na kitu kinachoonekana viral — wanacover bacterial possibility wakati picture inaclarify. Take-home: trust clinician judgement badala ya popular idea kwamba antibiotics zinafix cough yoyote. Unnecessary antibiotic courses zinafuel resistance kwa kila mtu jamiini. Ikiwa course imeanzishwa, imalize; ikiwa haijaanzishwa, uliza kwa nini, sikiliza explanation, na uangalie signs zinazosema "rudi" — worsening breathing, persistent fever beyond siku 3-4, chest pain, confusion, au IMCI danger sign yoyote kwa mtoto.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'If treated at home, take every dose of the antibiotic at the same times each day until the course is finished — even if you feel better after 2-3 days. Stopping early is one of the biggest causes of relapse and antibiotic resistance.',
      sw: 'Ikiwa unatibiwa nyumbani, tumia kila dose ya antibiotic kwa nyakati zile zile kila siku hadi kozi imalize — hata ukijisikia vizuri baada ya siku 2-3. Kusimamisha mapema ni mojawapo ya sababu kubwa za kurudi na upinzani wa antibiotic.',
      sw_mtaa: 'Ikiwa unatibiwa nyumbani, tumia kila dose ya antibiotic kwa nyakati zile zile kila siku hadi course imalize — hata ukijisikia vizuri baada ya siku 2-3. Kusimamisha mapema ni mojawapo ya biggest causes za relapse na antibiotic resistance.',
    },
    {
      en: 'Rest, drink plenty of fluids (water, soups, oral rehydration), and use paracetamol for fever or chest discomfort as advised. Avoid ibuprofen if you have kidney disease or are dehydrated.',
      sw: 'Pumzika, kunywa kioevu cha kutosha (maji, supu, ORS), na utumie paracetamol kwa homa au usumbufu wa kifua kama unavyoshauriwa. Epuka ibuprofen ikiwa una ugonjwa wa figo au una upungufu wa maji.',
      sw_mtaa: 'Pumzika, kunywa fluids za kutosha (maji, supu, ORS), na utumie paracetamol kwa homa au chest discomfort kama unavyoshauriwa. Epuka ibuprofen ikiwa una kidney disease au una dehydration.',
    },
    {
      en: 'Sit upright or in a propped-up position when breathing is hard; lying completely flat makes breathing harder in pneumonia.',
      sw: 'Keti wima au katika nafasi iliyoinuliwa wakati kupumua ni kugumu; kulala chali kabisa hufanya kupumua kuwa kugumu zaidi katika nimonia.',
      sw_mtaa: 'Keti upright au katika propped-up position wakati breathing ni kugumu; lying completely flat inafanya breathing kuwa kugumu zaidi katika pneumonia.',
    },
    {
      en: 'Stop smoking immediately and avoid smoky environments (indoor wood/charcoal smoke, cigarette smoke) — these slow recovery and raise the risk of complications.',
      sw: 'Acha kuvuta sigara mara moja na epuka mazingira yenye moshi (moshi wa kuni/mkaa ndani, moshi wa sigara) — hivi hupunguza ahueni na huongeza hatari ya matatizo.',
      sw_mtaa: 'Acha smoking mara moja na epuka smoky environments (indoor wood/charcoal smoke, cigarette smoke) — hivi vinapunguza recovery na vinaongeza risk ya complications.',
    },
    {
      en: 'For children: continue breastfeeding or feeding small frequent meals; a child with pneumonia eats less but should still drink fluids. If the child cannot drink at all, that is an emergency.',
      sw: 'Kwa watoto: endelea kunyonyesha au kulisha milo midogo ya mara kwa mara; mtoto mwenye nimonia hula kidogo lakini bado anapaswa kunywa kioevu. Ikiwa mtoto hawezi kunywa kabisa, hiyo ni dharura.',
      sw_mtaa: 'Kwa watoto: endelea kunyonyesha au kulisha milo midogo ya mara kwa mara; mtoto mwenye nimonia anala kidogo lakini bado anapaswa kunywa fluids. Ikiwa mtoto hawezi kunywa kabisa, hiyo ni emergency.',
    },
    {
      en: 'Watch for signs that mean come back urgently: breathing getting harder rather than easier after 2-3 days of antibiotics, fever persisting beyond 3-4 days, chest pain worsening, new confusion, coughing blood, or in a child any IMCI danger sign.',
      sw: 'Angalia dalili zinazomaanisha rudi haraka: kupumua kunakuwa kugumu zaidi badala ya rahisi baada ya siku 2-3 za antibiotics, homa inayoendelea zaidi ya siku 3-4, maumivu ya kifua yanazidi, kuchanganyikiwa kupya, kukohoa damu, au kwa mtoto dalili yoyote ya hatari ya IMCI.',
      sw_mtaa: 'Angalia signs zinazomaanisha rudi urgently: breathing inakuwa kugumu zaidi badala ya easier baada ya siku 2-3 za antibiotics, fever inayoendelea beyond siku 3-4, chest pain inazidi, new confusion, kukohoa damu, au kwa mtoto IMCI danger sign yoyote.',
    },
    {
      en: 'Attend the follow-up visit even if you feel completely well — for adults a chest X-ray may be repeated in 4-6 weeks to confirm full resolution and to rule out underlying lung disease.',
      sw: 'Hudhuria ziara ya kufuatilia hata ukijisikia vizuri kabisa — kwa watu wazima X-ray ya kifua inaweza kurudiwa katika wiki 4-6 kuthibitisha kuponywa kabisa na kuondoa ugonjwa wa msingi wa mapafu.',
      sw_mtaa: 'Hudhuria follow-up visit hata ukijisikia vizuri kabisa — kwa watu wazima chest X-ray inaweza kurudiwa katika wiki 4-6 kuthibitisha full resolution na kuondoa underlying lung disease.',
    },
    {
      en: 'For prevention: complete childhood vaccinations on schedule (PCV, Hib via pentavalent, measles), wash hands regularly, cover coughs and sneezes, and treat HIV, diabetes, and chronic lung disease well — these are the strongest pneumonia risk modifiers.',
      sw: 'Kwa kuzuia: kamilisha chanjo za utotoni kwa ratiba (PCV, Hib kupitia pentavalent, surua), nawa mikono mara kwa mara, funika mikohozi na chafya, na tibu VVU, kisukari, na ugonjwa sugu wa mapafu vizuri — hivi ndio virekebishi vikuu vya hatari ya nimonia.',
      sw_mtaa: 'Kwa prevention: complete childhood vaccinations on schedule (PCV, Hib kupitia pentavalent, measles), nawa hands regularly, funika coughs na sneezes, na tibu VVU, diabetes, na chronic lung disease well — hivi ndio strongest pneumonia risk modifiers.',
    },
    {
      en: 'If you have a pulse oximeter at home, take an SpO2 reading whenever the cough or breathlessness changes — a reading below 92% (or below 90% definitively) is a reason to go in promptly.',
      sw: 'Ikiwa una pulse oximeter nyumbani, chukua usomaji wa SpO2 wakati wowote kikohozi au kushindwa kupumua kunabadilika — usomaji chini ya 92% (au chini ya 90% kwa uhakika) ni sababu ya kuingia haraka.',
      sw_mtaa: 'Ikiwa una pulse oximeter nyumbani, chukua SpO2 reading wakati wowote cough au breathlessness inabadilika — reading chini ya 92% (au chini ya 90% definitively) ni sababu ya kuingia promptly.',
    },
    {
      en: 'If you have HIV, attend your CTC and take your ART without interruption — a well-controlled CD4 count is one of the most powerful protections against pneumonia, including PCP and severe bacterial pneumonia.',
      sw: 'Ikiwa una VVU, hudhuria CTC yako na tumia ART yako bila kukatiza — CD4 iliyodhibitiwa vizuri ni mojawapo ya kinga zenye nguvu zaidi dhidi ya nimonia, ikijumuisha PCP na nimonia kali ya bakteria.',
      sw_mtaa: 'Ikiwa una VVU, hudhuria CTC yako na tumia ART yako bila kukatiza — well-controlled CD4 count ni mojawapo ya most powerful protections dhidi ya nimonia, ikijumuisha PCP na severe bacterial pneumonia.',
    },
  ],

  warningTriggers: [
    {
      en: 'Buying antibiotics over the counter without a clinical assessment — wrong antibiotic, wrong dose, wrong duration is one of the strongest contributors to treatment failure and resistance.',
      sw: 'Kununua antibiotics kwa duka bila tathmini ya kliniki — antibiotic isiyo sahihi, dose isiyo sahihi, muda usio sahihi ni mojawapo ya wachangiaji wakubwa zaidi wa kushindwa kwa matibabu na upinzani.',
      sw_mtaa: 'Kununua antibiotics over the counter bila clinical assessment — wrong antibiotic, wrong dose, wrong duration ni mojawapo ya strongest contributors kwa treatment failure na resistance.',
    },
    {
      en: 'Stopping antibiotics early because "I feel better" — feeling better at day 2-3 is expected, but the infection is not yet eradicated.',
      sw: 'Kusimamisha antibiotics mapema kwa sababu "najisikia vizuri" — kujisikia vizuri siku ya 2-3 kunatarajiwa, lakini maambukizi bado hayajaondolewa.',
      sw_mtaa: 'Kusimamisha antibiotics mapema kwa sababu "najisikia vizuri" — kujisikia vizuri siku ya 2-3 inatarajiwa, lakini infection bado haija-eradicate.',
    },
    {
      en: 'Treating a cough lasting more than 2 weeks as "just pneumonia" without testing for TB — especially in people with HIV.',
      sw: 'Kuchukua kikohozi kinachodumu zaidi ya wiki 2 kama "nimonia tu" bila kuchunguza TB — hasa kwa watu wenye VVU.',
      sw_mtaa: 'Kuchukua cough inayodumu zaidi ya wiki 2 kama "nimonia tu" bila TB testing — hasa kwa watu wenye VVU.',
    },
    {
      en: 'Ignoring fast breathing or chest indrawing in a child because "it might pass" — IMCI danger signs in a child do not pass on their own, they progress.',
      sw: 'Kupuuza kupumua haraka au kifua kuingia ndani kwa mtoto kwa sababu "inaweza kupita" — dalili za hatari za IMCI kwa mtoto hazipiti zenyewe, zinaendelea.',
      sw_mtaa: 'Kupuuza fast breathing au chest indrawing kwa mtoto kwa sababu "inaweza kupita" — IMCI danger signs kwa mtoto hazipiti zenyewe, zinaendelea.',
    },
    {
      en: 'Skipping cotrimoxazole prophylaxis when prescribed in advanced HIV — it prevents PCP, which is otherwise a leading cause of death in low-CD4 patients.',
      sw: 'Kuruka kinga ya cotrimoxazole inapoagizwa katika VVU ya hali ya juu — huzuia PCP, ambayo vinginevyo ni sababu kuu ya vifo kwa wagonjwa wenye CD4 ya chini.',
      sw_mtaa: 'Kuruka cotrimoxazole prophylaxis inapoagizwa katika advanced HIV — inazuia PCP, ambayo otherwise ni leading cause of death kwa low-CD4 patients.',
    },
    {
      en: 'Mixing traditional remedies with antibiotic treatment without telling the clinician — some herbs interact with antibiotics or with the disease itself.',
      sw: 'Kuchanganya tiba za jadi na matibabu ya antibiotic bila kumwambia daktari — baadhi ya mimea huingiliana na antibiotics au na ugonjwa wenyewe.',
      sw_mtaa: 'Kuchanganya traditional remedies na antibiotic treatment bila kumwambia clinician — baadhi ya herbs zinainteract na antibiotics au na disease yenyewe.',
    },
    {
      en: 'Assuming a cough in a child under 5 is "just a cold" without counting the breathing rate over a full minute and looking for chest indrawing.',
      sw: 'Kudhani kikohozi kwa mtoto chini ya miaka 5 ni "mafua tu" bila kuhesabu kasi ya kupumua kwa dakika kamili na kuangalia kifua kuingia ndani.',
      sw_mtaa: 'Kudhani cough kwa mtoto chini ya miaka 5 ni "mafua tu" bila kuhesabu breathing rate kwa full minute na kuangalia chest indrawing.',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'A child with fast breathing AND any of: chest indrawing, grunting, bluish lips, unable to drink/breastfeed, vomiting everything, convulsions, severe lethargy — EMERGENCY, severe pneumonia',
        sw: 'Mtoto mwenye kupumua haraka NA yoyote ya: kifua kuingia ndani, kugruna, midomo ya bluu, kushindwa kunywa/kunyonya, kutapika kila kitu, kifafa, ulegevu mkali — DHARURA, nimonia kali',
        sw_mtaa: 'Mtoto mwenye fast breathing NA yoyote ya: chest indrawing, grunting, midomo ya bluu, unable kunywa/kunyonya, kutapika kila kitu, convulsions, severe lethargy — DHARURA, severe pneumonia',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Any adult or child with SpO2 below 90% on a pulse oximeter — severe hypoxia, EMERGENCY, needs oxygen and admission',
        sw: 'Mtu mzima au mtoto yeyote mwenye SpO2 chini ya 90% kwenye pulse oximeter — hypoxia kali, DHARURA, anahitaji oksijeni na kulazwa',
        sw_mtaa: 'Adult au mtoto yeyote mwenye SpO2 below 90% on pulse oximeter — severe hypoxia, DHARURA, anahitaji oxygen na admission',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe breathlessness at rest, blue lips or fingertips, confusion or drowsiness, very fast heart rate, very low blood pressure — possible sepsis from pneumonia. EMERGENCY',
        sw: 'Kushindwa kupumua kali wakati wa kupumzika, midomo au vidole vya bluu, kuchanganyikiwa au usingizi, moyo unaopiga haraka sana, shinikizo la damu la chini sana — uwezekano wa sepsis kutoka nimonia. DHARURA',
        sw_mtaa: 'Severe breathlessness at rest, midomo au fingertips za bluu, confusion au drowsiness, very fast heart rate, very low BP — uwezekano wa sepsis kutoka pneumonia. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Coughing blood (haemoptysis), or chest pain that worsens sharply with breathing in — urgent assessment for possible pneumonia complication or alternative diagnosis (TB, pulmonary embolism, empyema)',
        sw: 'Kukohoa damu (haemoptysis), au maumivu ya kifua yanayozidi sana wakati wa kupumua ndani — tathmini ya haraka kwa uwezekano wa shida ya nimonia au utambuzi mbadala (TB, pulmonary embolism, empyema)',
        sw_mtaa: 'Kukohoa damu (haemoptysis), au chest pain inayozidi sharply na kupumua ndani — urgent assessment kwa possible pneumonia complication au alternative diagnosis (TB, PE, empyema)',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Fever continuing or rising beyond day 3-4 of antibiotic treatment, or worsening cough/breathlessness on treatment — possible wrong antibiotic, complication (empyema, abscess), or alternative diagnosis. Go back urgently',
        sw: 'Homa inayoendelea au kupanda zaidi ya siku 3-4 ya matibabu ya antibiotic, au kikohozi/kushindwa kupumua kunazidi katika matibabu — uwezekano wa antibiotic isiyo sahihi, shida (empyema, abscess), au utambuzi mbadala. Rudi haraka',
        sw_mtaa: 'Fever inayoendelea au kupanda beyond day 3-4 ya antibiotic treatment, au worsening cough/breathlessness on treatment — possible wrong antibiotic, complication (empyema, abscess), au alternative diagnosis. Rudi urgently',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'New cough or breathlessness in any person with HIV, especially with low CD4 — could be PCP, TB, or bacterial pneumonia, all of which need rapid assessment',
        sw: 'Kikohozi kipya au kushindwa kupumua kwa mtu yeyote mwenye VVU, hasa na CD4 ya chini — inaweza kuwa PCP, TB, au nimonia ya bakteria, zote zinahitaji tathmini ya haraka',
        sw_mtaa: 'New cough au breathlessness kwa mtu yeyote mwenye VVU, hasa na low CD4 — inaweza kuwa PCP, TB, au bacterial pneumonia, zote zinahitaji rapid assessment',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'A pregnant woman with cough, fever, or breathlessness — pneumonia in pregnancy progresses faster and stresses the baby; lower threshold for assessment',
        sw: 'Mwanamke mjamzito mwenye kikohozi, homa, au kushindwa kupumua — nimonia katika mimba huendelea haraka na humsumbua mtoto; kizingiti cha chini cha tathmini',
        sw_mtaa: 'Pregnant woman mwenye kikohozi, fever, au breathlessness — pneumonia katika mimba inaprogress faster na inastress baby; lower threshold ya assessment',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Cough lasting more than 2 weeks at any age — TB needs to be excluded with a sputum GeneXpert before assuming "pneumonia"',
        sw: 'Kikohozi kinachodumu zaidi ya wiki 2 katika umri wowote — TB inahitaji kuondolewa na GeneXpert ya makohozi kabla ya kudhani "nimonia"',
        sw_mtaa: 'Kikohozi kinachodumu zaidi ya wiki 2 katika umri wowote — TB inahitaji kuondolewa na sputum GeneXpert kabla ya kudhani "pneumonia"',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'An elderly person with confusion, falls, or "off-legs" — pneumonia in the elderly often presents without classic cough/fever; consider it for any acute decline',
        sw: 'Mtu mzee mwenye kuchanganyikiwa, kuanguka, au "miguu kuondoka" — nimonia kwa wazee mara nyingi hujitokeza bila kikohozi/homa ya kawaida; ifikirie kwa kushuka kwa papo hapo kokote',
        sw_mtaa: 'Elderly person mwenye confusion, falls, au "off-legs" — pneumonia kwa elderly mara nyingi inapresent bila classic cough/fever; ifikirie kwa acute decline yoyote',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'A baby under 2 months with fever, poor feeding, irritability, or any breathing problem — go in same day, threshold for serious infection in young infants is very low',
        sw: 'Mtoto chini ya miezi 2 mwenye homa, kunyonya vibaya, kuchukizwa, au tatizo lolote la kupumua — ingia siku ile ile, kizingiti cha maambukizi makubwa kwa watoto wachanga ni cha chini sana',
        sw_mtaa: 'Mtoto chini ya miezi 2 mwenye homa, poor feeding, irritability, au breathing problem yoyote — ingia siku ile ile, threshold ya serious infection kwa young infants ni very low',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  variants: PNEUMONIA_VARIANTS,

  comorbidityNotes: [
    {
      coCondition: 'hiv',
      note: {
        en: 'Pneumonia is one of the most common acute illnesses in PLHIV in Tanzania. Three things to think about with any cough: bacterial pneumonia (commoner at any CD4), TB (the leading cause of cough and death in PLHIV — needs sputum GeneXpert), and PCP/PJP (especially at CD4 < 200, presenting with dry cough, progressive breathlessness on exertion, and SpO2 that drops with effort). Cotrimoxazole prophylaxis is one of the most powerful tools in advanced HIV partly because it prevents PCP. Continue ART throughout pneumonia treatment — never stop it; the immune system needs every advantage.',
        sw: 'Nimonia ni mojawapo ya magonjwa ya kawaida ya papo hapo kwa watu wenye VVU Tanzania. Mambo matatu ya kufikiria na kikohozi chochote: nimonia ya bakteria (ya kawaida zaidi katika CD4 yoyote), TB (sababu kuu ya kikohozi na vifo kwa watu wenye VVU — inahitaji GeneXpert ya makohozi), na PCP/PJP (hasa katika CD4 < 200, ikijitokeza na kikohozi kavu, kushindwa kupumua kunakoendelea wakati wa juhudi, na SpO2 inayoshuka na juhudi). Kinga ya cotrimoxazole ni mojawapo ya zana zenye nguvu zaidi katika VVU ya hali ya juu kwa sababu inazuia PCP. Endelea na ART katika muda wote wa matibabu ya nimonia — kamwe usisimame; kinga inahitaji kila faida.',
        sw_mtaa: 'Nimonia ni mojawapo ya most common acute illnesses kwa PLHIV Tanzania. Mambo matatu ya kufikiria na cough yoyote: bacterial pneumonia (commoner katika CD4 yoyote), TB (leading cause ya cough na vifo kwa PLHIV — inahitaji sputum GeneXpert), na PCP/PJP (especially katika CD4 < 200, presenting na dry cough, progressive breathlessness on exertion, na SpO2 inayoshuka na effort). Cotrimoxazole prophylaxis ni mojawapo ya most powerful tools katika advanced HIV partly kwa sababu inazuia PCP. Endelea na ART throughout pneumonia treatment — never stop; immune system inahitaji every advantage.',
      },
    },
    {
      coCondition: 'tb',
      note: {
        en: 'Pneumonia and TB share clinical features. Cough lasting 2+ weeks, night sweats, weight loss, haemoptysis, low CD4, or known TB contact all push the differential toward TB. The gateway test in Tanzania is sputum GeneXpert. Both conditions can coexist — finding bacterial pneumonia does not rule out TB, and starting TB treatment does not exclude a bacterial co-infection that also needs antibiotics. Cross-reference the TB block for the full pathway.',
        sw: 'Nimonia na TB hushiriki sifa za kliniki. Kikohozi kinachodumu wiki 2+, jasho la usiku, kupungua uzito, haemoptysis, CD4 ya chini, au mawasiliano yanayojulikana ya TB yote husukuma differential kuelekea TB. Kipimo cha mlango Tanzania ni GeneXpert ya makohozi. Hali zote mbili zinaweza kuwepo pamoja — kupata nimonia ya bakteria hakuondoi TB, na kuanza matibabu ya TB hakuondoi co-infection ya bakteria ambayo pia inahitaji antibiotics. Rejea block ya TB kwa njia kamili.',
        sw_mtaa: 'Pneumonia na TB zinashare clinical features. Cough lasting 2+ weeks, night sweats, weight loss, haemoptysis, low CD4, au known TB contact zote zinasukuma differential kuelekea TB. Gateway test Tanzania ni sputum GeneXpert. Both conditions zinaweza coexist — kupata bacterial pneumonia haina rule out TB, na kuanza TB treatment haina exclude bacterial co-infection ambayo pia inahitaji antibiotics. Cross-reference TB block kwa full pathway.',
      },
    },
    {
      coCondition: 'maternal_care',
      note: {
        en: 'Pneumonia in pregnancy is more dangerous than at the same age non-pregnant: lower respiratory reserve from the elevated diaphragm, and any maternal hypoxia stresses the fetus. Most first-line antibiotics (amoxicillin, co-amoxiclav, ceftriaxone, erythromycin, azithromycin) are safe in pregnancy; tetracyclines and some fluoroquinolones are avoided. Influenza vaccine is recommended in pregnancy. Cross-reference the maternal care block.',
        sw: 'Nimonia katika mimba ni hatari zaidi kuliko umri huo huo isiyo na mimba: akiba ya chini ya kupumua kutoka diaphragm iliyoinuliwa, na hypoxia yoyote ya kimama humsumbua fetasi. Antibiotic nyingi za awali (amoxicillin, co-amoxiclav, ceftriaxone, erythromycin, azithromycin) ni salama katika mimba; tetracyclines na baadhi ya fluoroquinolones huepukwa. Chanjo ya influenza inashauriwa katika mimba. Rejea block ya huduma za mama.',
        sw_mtaa: 'Pneumonia katika mimba ni hatari zaidi kuliko same age non-pregnant: lower respiratory reserve kutoka elevated diaphragm, na maternal hypoxia yoyote inastress fetus. Most first-line antibiotics (amoxicillin, co-amoxiclav, ceftriaxone, erythromycin, azithromycin) ni safe katika mimba; tetracyclines na baadhi ya fluoroquinolones zinaepukwa. Influenza vaccine inashauriwa katika mimba. Cross-reference maternal care block.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Diabetes raises the risk of bacterial pneumonia and worsens outcomes — hyperglycaemia impairs neutrophil function, slows healing, and is itself worsened by the stress of acute infection (sometimes precipitating DKA). During pneumonia, monitor blood glucose more frequently, expect insulin requirements to rise, and treat hyperglycaemia actively. Pneumococcal and annual influenza vaccination are recommended in people with diabetes.',
        sw: 'Kisukari huongeza hatari ya nimonia ya bakteria na huzidisha matokeo — hyperglycaemia hudhoofisha kazi ya neutrophil, hupunguza uponaji, na yenyewe huzidishwa na mfadhaiko wa maambukizi ya papo hapo (wakati mwingine inasababisha DKA). Wakati wa nimonia, fuatilia glukosi ya damu mara kwa mara zaidi, tarajia mahitaji ya insulin kupanda, na utibu hyperglycaemia kwa bidii. Chanjo ya pneumococcal na influenza ya kila mwaka zinashauriwa kwa watu wenye kisukari.',
        sw_mtaa: 'Diabetes inaongeza risk ya bacterial pneumonia na inazidisha outcomes — hyperglycaemia inadhoofisha neutrophil function, inapunguza healing, na yenyewe inazidishwa na stress ya acute infection (wakati mwingine inasababisha DKA). Wakati wa pneumonia, monitor blood glucose more frequently, expect insulin requirements kupanda, na tibu hyperglycaemia actively. Pneumococcal na annual influenza vaccination zinashauriwa kwa watu wenye diabetes.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'CKD raises pneumonia risk and complicates antibiotic choice — many antibiotics need dose reduction based on eGFR. Avoid nephrotoxic antibiotics where possible (e.g. aminoglycosides) and review NSAIDs (paracetamol is the safer fever/pain option). Pneumococcal and influenza vaccines are recommended in CKD.',
        sw: 'CKD huongeza hatari ya nimonia na huleta ugumu wa chaguo la antibiotic — antibiotic nyingi zinahitaji kupunguza dose kulingana na eGFR. Epuka antibiotic za nephrotoxic pale inapowezekana (mfano aminoglycosides) na pitia NSAIDs (paracetamol ni chaguo salama zaidi la homa/maumivu). Chanjo za pneumococcal na influenza zinashauriwa katika CKD.',
        sw_mtaa: 'CKD inaongeza pneumonia risk na inacomplicate antibiotic choice — antibiotics nyingi zinahitaji dose reduction kulingana na eGFR. Epuka nephrotoxic antibiotics pale inapowezekana (e.g. aminoglycosides) na review NSAIDs (paracetamol ni safer fever/pain option). Pneumococcal na influenza vaccines zinashauriwa katika CKD.',
      },
    },
    {
      coCondition: 'sickle_cell',
      note: {
        en: 'People with sickle cell disease are at particularly high risk of pneumococcal infection (functional asplenia from a young age), and acute chest syndrome — a severe sickle complication that can present like pneumonia and needs urgent management with antibiotics, oxygen, hydration, analgesia, and sometimes transfusion. Lifelong penicillin prophylaxis in childhood and pneumococcal/Hib/influenza vaccination are protective. Any fever or chest symptom in a person with sickle cell should be treated as serious until proven otherwise.',
        sw: 'Watu wenye ugonjwa wa sickle cell wako katika hatari kubwa hasa ya maambukizi ya pneumococcal (functional asplenia kutoka umri mdogo), na acute chest syndrome — shida kali ya sickle inayoweza kujitokeza kama nimonia na inahitaji usimamizi wa haraka na antibiotics, oksijeni, kuongeza maji, analgesia, na wakati mwingine kuongezewa damu. Kinga ya penicillin ya maisha katika utoto na chanjo za pneumococcal/Hib/influenza zinalinda. Homa yoyote au dalili ya kifua kwa mtu mwenye sickle cell inapaswa kutibiwa kama kubwa hadi ithibitishwe vinginevyo.',
        sw_mtaa: 'Watu wenye sickle cell disease wako katika particularly high risk ya pneumococcal infection (functional asplenia kutoka young age), na acute chest syndrome — severe sickle complication inayoweza kupresent kama pneumonia na inahitaji urgent management na antibiotics, oxygen, hydration, analgesia, na wakati mwingine transfusion. Lifelong penicillin prophylaxis katika childhood na pneumococcal/Hib/influenza vaccination ni protective. Fever yoyote au chest symptom kwa mtu mwenye sickle cell inapaswa kutibiwa kama serious hadi proven otherwise.',
      },
    },
  ],

  sources: [
    src('WHO_PNEUMONIA_2022'),
    src('IMCI_2024'),
    src('WHO_AMR_2023'),
    src('WHO_OXYGEN_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NACP_ART_2024'),
    src('NTLP_TB_2024'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
