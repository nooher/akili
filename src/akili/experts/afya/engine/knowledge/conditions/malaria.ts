/**
 * Malaria — Full Condition Knowledge (100% all-in coverage)
 *
 * Sources: NMCP Tanzania 2024, WHO Guidelines for Malaria 2024, IMCI 2024,
 *          NTLG STG 2023, Muhimbili Protocols, MoH-TZ Maternal Guidelines 2024.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in):
 *   • Uncomplicated malaria (base case + ALu pathway)
 *   • Severe malaria — recognition + artesunate IV emergency
 *   • Cerebral malaria — neurologic involvement
 *   • Malaria in pregnancy — trimester-specific (quinine vs ALu)
 *   • Malaria in children under 5 — IMCI-aligned, weight-based
 *   • Treatment failure — recrudescence vs reinfection, second-line ACT
 *   • Prevention & prophylaxis — LLINs, IRS, IPTp-SP, traveller, sickle cell, SMC
 *   • Post-malaria continuity — anemia recovery, post-cerebral neurology
 *
 * Comorbidities: HIV, diabetes, CKD, TB, sickle cell.
 *
 * SCOPE: We educate patients on what malaria IS, what to expect during
 * treatment, when to worry, and continuity after diagnosis. We do not
 * diagnose malaria from symptoms — confirmation is by mRDT or microscopy.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const MALARIA: ConditionKnowledge = {
  id: 'malaria',
  aliases: CONDITION_ALIASES.malaria,
  category: 'infectious',

  whatItIs: {
    en: 'Malaria is a disease caused by Plasmodium parasites that enter your blood when an infected female Anopheles mosquito bites you. In Tanzania, the most common and most dangerous type is Plasmodium falciparum. Once inside, the parasites grow in your red blood cells and destroy them in cycles, causing the fever, chills, and tiredness you feel.',
    sw: 'Malaria ni ugonjwa unaosababishwa na vimelea aina ya Plasmodium ambavyo huingia kwenye damu yako wakati mbu jike wa aina ya Anopheles aliyeambukizwa anapokuuma. Tanzania, aina inayopatikana zaidi na hatari zaidi ni Plasmodium falciparum. Vikiingia ndani, vimelea hivi hukua ndani ya seli zako nyekundu za damu na kuziharibu kwa mizunguko, na ndiyo maana unaona homa, baridi, na uchovu.',
    sw_mtaa: 'Malaria husababishwa na vimelea (plasmodium) vinavyoingizwa kwenye damu yako na mbu wa kike. Tanzania, malaria ya Plasmodium falciparum ndiyo inayopatikana sana na ni hatari zaidi. Vimelea hukula seli za damu yako — ndio maana unapata homa, baridi, na unajisikia uchovu sana.',
  },

  whyItMatters: {
    en: 'Malaria is one of the leading causes of illness and death in Tanzania, especially in children under 5 and pregnant women. Uncomplicated malaria, when treated early with the right medicine, almost always heals fully. But malaria untreated for even 24-48 hours can progress to severe malaria — coma, kidney failure, severe anemia, breathing problems — which kills quickly. This is why every fever needs a malaria test, and every confirmed malaria needs treatment that same day.',
    sw: 'Malaria ni miongoni mwa sababu kubwa za maradhi na vifo nchini Tanzania, hasa kwa watoto walio chini ya miaka 5 na wajawazito. Malaria isiyo na matatizo, ikitibiwa mapema kwa dawa sahihi, karibu daima hupona kabisa. Lakini malaria isiyotibiwa hata kwa masaa 24-48 inaweza kuzidi kuwa malaria kali — kuzimia, figo kushindwa kufanya kazi, upungufu mkubwa wa damu, matatizo ya kupumua — na hii huua haraka. Ndiyo maana kila homa inahitaji kipimo cha malaria, na kila malaria iliyothibitishwa inahitaji matibabu siku hiyo hiyo.',
    sw_mtaa: 'Malaria ni miongoni mwa magonjwa yanayoua sana Tanzania, hasa watoto wadogo na wajawazito. Ukitibiwa mapema kwa dawa sahihi, malaria ya kawaida inapona. Lakini ukiichelewesha hata masaa 24-48 tu, inaweza kuwa malaria kali — kuzimia, figo kufeli, damu kupungua sana — na hii inaua haraka sana. Ndio maana kila homa inahitaji kipimo cha malaria, na ukithibitika tu, anza dawa hiyo hiyo siku.',
  },

  commonQuestions: [
    {
      q: {
        en: 'I have fever — is it malaria?',
        sw: 'Nina homa — ni malaria?',
      },
      a: {
        en: 'Maybe. Fever can come from many things — malaria, typhoid, pneumonia, UTI, viral illness, COVID. In Tanzania, malaria is so common that any fever should be tested. Go to a clinic or pharmacy with an mRDT (rapid test) — results take 15 minutes. Do not start malaria medicine without a positive test. Wrong treatment delays the real diagnosis.',
        sw: 'Inawezekana. Homa inaweza kutoka kwa vitu vingi — malaria, homa ya matumbo (typhoid), nimonia, maambukizi ya njia ya mkojo, virusi, COVID. Tanzania, malaria ni ya kawaida sana kiasi kwamba kila homa inafaa kupimwa. Nenda kliniki au duka la dawa lenye mRDT (kipimo cha haraka) — matokeo huja ndani ya dakika 15. Usianzishe dawa za malaria bila kipimo chenye majibu chanya. Matibabu yasiyo sahihi yanachelewesha utambuzi halisi.',
        sw_mtaa: 'Inawezekana. Homa inaweza kuwa malaria, typhoid, nimonia, UTI, virusi, COVID, na vingine vingi. Tanzania, malaria ni kawaida sana, hivyo kila homa inafaa kupimwa. Nenda kliniki au duka lenye mRDT (kipimo cha haraka) — majibu yanakuja dakika 15. Usinywe dawa ya malaria bila kupimwa kwanza. Ukinywa dawa bila kupimwa, unachelewesha utambuzi wa ugonjwa halisi.',
      },
    },
    {
      q: {
        en: 'How do I know my malaria is severe?',
        sw: 'Najuaje malaria yangu ni kali?',
      },
      a: {
        en: 'Severe malaria has danger signs that uncomplicated malaria does not. The big ones: cannot drink or breastfeed, vomits everything, convulsions or fits, unconscious or very drowsy, fast or difficult breathing, very pale (severe anemia), yellow eyes, very little urine or no urine, bleeding from nose or gums. Any one of these = go to a hospital with admission capacity, NOT just a dispensary.',
        sw: 'Malaria kali ina dalili za hatari ambazo malaria ya kawaida haina. Kuu ni: kushindwa kunywa au kunyonya, kutapika kila kitu, kifafa au mishtuko, kuzimia au usingizi mkubwa, kupumua haraka au kwa shida, kuwa weupe sana (upungufu mkubwa wa damu), macho ya njano, mkojo kidogo sana au hakuna kabisa, kutoka damu puani au kwenye fizi. Yoyote moja kati ya hizi = nenda hospitali yenye uwezo wa kulaza, SIO zahanati tu.',
        sw_mtaa: 'Malaria kali ina dalili za hatari ambazo malaria ya kawaida haina. Hizi ni: kushindwa kunywa au kunyonya (mtoto), kutapika kila kitu, kifafa au mishtuko, kuzimia au usingizi mkubwa, kupumua haraka au kwa shida, weupe sana, macho ya njano, mkojo kidogo au hakuna kabisa, damu kutoka puani au fizi. Yoyote moja kati ya hizi = nenda HOSPITALI inayoweza kulaza, sio dispensari tu.',
      },
    },
    {
      q: {
        en: 'My fever started yesterday but the test was negative. Should I retest?',
        sw: 'Homa yangu ilianza jana lakini kipimo cha malaria kilikuwa hasi. Nipime tena?',
      },
      a: {
        en: 'Yes — if your fever continues, retest after 24 hours. Early in malaria, the parasite count in your blood can be too low for the rapid test to catch. A negative test today does not mean no malaria forever. If you stay febrile, retest, and ask the clinician to also test for typhoid and check your full clinical picture.',
        sw: 'Ndiyo — kama homa yako inaendelea, pima tena baada ya masaa 24. Mwanzoni mwa malaria, idadi ya vimelea kwenye damu inaweza kuwa ndogo mno kwa kipimo cha haraka kuviona. Kipimo kuwa hasi leo haimaanishi huna malaria kabisa. Kama homa inaendelea, pima tena, na muombe daktari akupimie pia typhoid na kuchunguza hali yako yote.',
        sw_mtaa: 'Ndio — kama homa inaendelea, pima tena baada ya masaa 24. Mwanzoni mwa malaria, vimelea kwenye damu vinaweza kuwa vichache mno kwa kipimo kuviona. Kipimo kikiwa hasi leo haimaanishi huna malaria. Kama homa inaendelea, pima tena, na muambie daktari akupimie typhoid pia.',
      },
    },
    {
      q: {
        en: 'I started ALu yesterday but I still feel feverish. Is the medicine working?',
        sw: 'Nilianza ALu jana lakini bado nina homa. Dawa inafanya kazi?',
      },
      a: {
        en: 'Probably yes — fever usually takes 48-72 hours to fully clear after starting ALu. The medicine kills parasites within hours, but your body needs time to recover. Keep taking ALu exactly as instructed (twice daily with fatty food or milk for 3 days). If by day 3 you still have high fever, or if you develop any danger signs, return to the clinic urgently. Do not stop the medicine early even if you feel better.',
        sw: 'Pengine ndiyo — kwa kawaida homa huchukua masaa 48-72 kuisha kabisa baada ya kuanza ALu. Dawa huua vimelea ndani ya masaa machache, lakini mwili wako unahitaji muda kupona. Endelea kutumia ALu kama ilivyoelekezwa (mara mbili kwa siku pamoja na chakula chenye mafuta au maziwa kwa siku 3). Ukifika siku ya 3 bado una homa kali, au ukianza kuwa na dalili za hatari, rudi kliniki haraka. Usisimamishe dawa mapema hata ukijisikia vizuri.',
        sw_mtaa: 'Pengine ndio — homa kwa kawaida huchukua masaa 48-72 kuisha baada ya kuanza ALu. Dawa huua vimelea ndani ya masaa machache, lakini mwili unahitaji muda kupona. Endelea kunywa ALu kama ulivyoambiwa (mara mbili kwa siku, na chakula chenye mafuta au maziwa, siku 3). Siku ya 3 kama bado una homa kubwa, au ukianza kuona dalili za hatari, rudi kliniki haraka. Usisimamishe dawa mapema hata ukijihisi poa.',
      },
    },
    {
      q: {
        en: 'I am pregnant and I have malaria. Is the medicine safe?',
        sw: 'Nina ujauzito na nina malaria. Dawa ni salama?',
      },
      a: {
        en: 'Malaria in pregnancy is more dangerous than malaria when not pregnant — for you and for the baby. The good news: there are safe treatments at every stage of pregnancy. In the first trimester, quinine plus clindamycin is preferred. From the second trimester onwards, ALu is approved and safe. Untreated malaria causes miscarriage, low birth weight, severe anemia, and stillbirth — far more harm than the medicine. Go to a maternity clinic today and tell them you are pregnant before they choose treatment.',
        sw: 'Malaria wakati wa ujauzito ni hatari zaidi kuliko malaria isiyokuwa kwenye ujauzito — kwako na kwa mtoto. Habari njema: kuna matibabu salama katika kila hatua ya ujauzito. Trimester ya kwanza, quinine pamoja na clindamycin ni vipendekezo. Kuanzia trimester ya pili kuendelea, ALu inakubaliwa na ni salama. Malaria isiyotibiwa husababisha mimba kuharibika, uzito mdogo wa mtoto, upungufu mkubwa wa damu, na mtoto kufa tumboni — madhara makubwa zaidi kuliko dawa. Nenda kliniki ya wajawazito leo na waambie una ujauzito kabla hawajachagua matibabu.',
        sw_mtaa: 'Malaria kwenye ujauzito ni hatari zaidi kuliko malaria ya kawaida — kwako na kwa mtoto. Habari njema: kuna matibabu salama kila hatua ya mimba. Mimba ya miezi 1-3, quinine na clindamycin ndio dawa ya kwanza. Kuanzia miezi 4 kuendelea, ALu inafaa na ni salama. Ukiacha malaria bila matibabu, mimba inaweza kuharibika, mtoto akazaliwa mdogo, damu ikapungua sana, au mtoto akafa tumboni — madhara makubwa zaidi kuliko dawa. Nenda kliniki ya wajawazito LEO, na waambie una mimba kabla ya kuchagua dawa.',
      },
    },
    {
      q: {
        en: 'Can my child get malaria more than once?',
        sw: 'Mtoto wangu anaweza kupata malaria zaidi ya mara moja?',
      },
      a: {
        en: 'Yes, many times. Malaria does not give lasting immunity like measles. A child in a high-transmission area like much of Tanzania can have malaria several times a year. This is why prevention matters: insecticide-treated bed nets every night (especially for children and pregnant women), no standing water around the house, and seeking care at the first fever — every fever, every time.',
        sw: 'Ndiyo, mara nyingi. Malaria haitoi kinga ya kudumu kama surua. Mtoto anayeishi katika eneo lenye maambukizi ya juu kama sehemu nyingi za Tanzania anaweza kupata malaria mara kadhaa kwa mwaka. Ndiyo maana kinga ni muhimu: vyandarua vyenye dawa kila usiku (hasa kwa watoto na wajawazito), kutokuwa na maji yaliyotuama karibu na nyumba, na kutafuta huduma kwenye homa ya kwanza — kila homa, kila mara.',
        sw_mtaa: 'Ndio, mara nyingi. Malaria haitoi kinga ya kudumu kama surua. Mtoto wa Tanzania anaweza kupata malaria mara kadhaa kwa mwaka. Ndio maana kinga ni muhimu: chandarua chenye dawa kila usiku (hasa watoto na wajawazito), kuondoa maji yaliyotuama karibu na nyumba, na kwenda kliniki kwa homa ya kwanza — kila homa, kila mara.',
      },
    },
    {
      q: {
        en: 'Why does my doctor want to admit me — can I not take medicine at home?',
        sw: 'Kwa nini daktari ananitaka nilale hospitali — siwezi kunywa dawa nyumbani?',
      },
      a: {
        en: 'If your doctor is recommending admission, it means they see signs that your malaria is severe or that you cannot keep oral medicine down (you are vomiting, very weak, drowsy, or showing danger signs). Severe malaria needs intravenous artesunate, monitoring for organ failure, and supportive care — not pills. Do not refuse admission against a doctor\'s advice in severe malaria. The death rate in severe malaria can be high in the first 24 hours.',
        sw: 'Kama daktari anapendekeza ulazwe, maana yake anaona dalili kwamba malaria yako ni kali au huwezi kushikilia dawa za kumeza (unatapika, una udhaifu mkubwa, una usingizi, au unaonyesha dalili za hatari). Malaria kali inahitaji dawa ya kuchomwa (artesunate ya mishipa), ufuatiliaji wa viungo, na huduma ya msaada — sio vidonge. Usikatae kulazwa kinyume na ushauri wa daktari katika malaria kali. Kiwango cha vifo katika malaria kali kinaweza kuwa kikubwa katika masaa 24 ya kwanza.',
        sw_mtaa: 'Kama daktari anasema ulalazwe, ni kwa sababu anaona malaria yako ni kali au huwezi kushikilia dawa za kumeza (unatapika, una udhaifu mkubwa, una usingizi, au una dalili za hatari). Malaria kali inahitaji dawa za kuchoma (artesunate ya mishipa), kufuatiliwa kwa viungo, na huduma ya msaada — sio vidonge tu. Usikatae kulazwa kinyume na ushauri wa daktari. Watu wengi wanafariki katika masaa 24 ya kwanza ya malaria kali.',
      },
    },
    {
      q: {
        en: 'Why am I being treated when my friend got malaria and never took anything?',
        sw: 'Kwa nini ninatibiwa wakati rafiki yangu alipata malaria na hakunywa chochote?',
      },
      a: {
        en: 'Untreated malaria can resolve on its own — but it can also progress to severe malaria and death, often without warning. Tanzanian guidelines say every confirmed malaria gets treated, no exceptions, because we cannot predict who will be the unlucky one. Even people who "feel fine" carry parasites that can multiply suddenly. Your friend was lucky; that is not a treatment plan. Always finish the full course of ALu, even if you feel better after one day.',
        sw: 'Malaria isiyotibiwa inaweza kupona yenyewe — lakini pia inaweza kuzidi kuwa malaria kali na kifo, mara nyingi bila onyo. Miongozo ya Tanzania inasema kila malaria iliyothibitishwa inatibiwa, hakuna ubaguzi, kwa sababu hatuwezi kutabiri nani atakuwa wa bahati mbaya. Hata watu wanaojisikia "sawa" wana vimelea ambavyo vinaweza kuongezeka ghafla. Rafiki yako alikuwa na bahati; hiyo si mpango wa matibabu. Daima maliza kozi kamili ya ALu, hata kama unajisikia vizuri baada ya siku moja.',
        sw_mtaa: 'Malaria isiyotibiwa inaweza kupona yenyewe — lakini pia inaweza kuwa malaria kali na kifo, mara nyingi bila warning. Miongozo ya Tanzania inasema kila malaria iliyothibitishwa lazima itibiwe, hakuna ubaguzi, kwa sababu hatuwezi kutabiri nani atakuwa wa bahati mbaya. Hata watu wanaojisikia "poa" wana vimelea ambavyo vinaweza kuongezeka ghafla. Rafiki yako alikuwa na bahati; hiyo si mpango. Daima maliza ALu yote, hata kama unajisikia poa baada ya siku moja.',
      },
    },
    {
      q: {
        en: 'I am pregnant and have malaria — will the medicine harm my baby?',
        sw: 'Nina mimba na nina malaria — dawa itamdhuru mtoto wangu?',
      },
      a: {
        en: 'Untreated malaria in pregnancy is much more dangerous to the baby than the medicine. It causes miscarriage, stillbirth, premature delivery, low birth weight, and severe maternal anemia. The good news: artemether-lumefantrine (ALu) is safe in the second and third trimesters, and quinine is the choice in the first trimester. Both are well-studied. Doctors will pick the right one for your pregnancy stage. Take it as prescribed — completing treatment protects you both.',
        sw: 'Malaria isiyotibiwa katika mimba ni hatari zaidi kwa mtoto kuliko dawa. Inasababisha kuharibika kwa mimba, kuzaliwa kafiri, kuzaliwa kabla ya wakati, uzito mdogo, na upungufu mkubwa wa damu kwa mama. Habari njema: artemether-lumefantrine (ALu) ni salama katika trimester ya pili na ya tatu, na quinine ndio chaguo katika trimester ya kwanza. Zote zimechunguzwa vizuri. Madaktari watachagua sahihi kwa hatua ya ujauzito wako. Tumia kama ilivyoagizwa — kumaliza matibabu kunakulinda wewe na mtoto.',
        sw_mtaa: 'Malaria isiyotibiwa wakati wa mimba ni hatari zaidi kwa mtoto kuliko dawa. Inasababisha mimba kuharibika, mtoto kufa tumboni, mtoto kuzaliwa kabla ya wakati, uzito mdogo, na mama kupungukiwa damu sana. Habari njema: ALu ni salama katika trimester ya 2 na 3, na quinine ndio chaguo trimester ya 1. Zote zimechunguzwa vizuri. Madaktari watachagua sahihi kwa hatua yako. Tumia kama ilivyoagizwa — kumaliza matibabu kunakulinda wewe na mtoto.',
      },
    },
    {
      q: {
        en: 'Can I use traditional herbs (like neem, mwarobaini) instead of ALu?',
        sw: 'Naweza kutumia mitishamba (kama mwarobaini) badala ya ALu?',
      },
      a: {
        en: 'No. Some traditional herbs, including mwarobaini (neem), have small effects against early-stage parasites — but they cannot reliably clear malaria, especially severe malaria. People who relied on herbs alone are the most common admissions to ICU with cerebral malaria across East Africa. ALu is cheap, freely available at public facilities, and proven. If you also want to use herbs as a comfort measure, tell your doctor first — some herbs damage the liver or interact with ALu. The artemisinin in ALu was originally discovered from a plant, so modern medicine and traditional knowledge are not enemies — they work best together when guided by evidence.',
        sw: 'Hapana. Mitishamba mingine, ikiwemo mwarobaini, ina athari ndogo dhidi ya vimelea vya hatua ya mwanzo — lakini haiwezi kuondoa malaria kwa uhakika, hasa malaria kali. Watu walioitegemea mitishamba peke yake ni wa kawaida zaidi katika ICU wenye malaria ya ubongo Afrika Mashariki. ALu ni ya bei rahisi, inapatikana bure katika vituo vya umma, na imethibitishwa. Ukitaka kutumia mitishamba kama faraja, mwambie daktari kwanza — mitishamba mingine inaharibu ini au inaingiliana na ALu. Artemisinin iliyomo ndani ya ALu iligunduliwa kutoka kwa mmea, hivyo tiba ya kisasa na elimu ya kienyeji sio adui — vinafanya kazi pamoja vizuri vikiongozwa na ushahidi.',
        sw_mtaa: 'Hapana. Mitishamba mingine, ikiwemo mwarobaini, ina athari ndogo dhidi ya vimelea vya hatua ya mwanzo — lakini haiwezi kuondoa malaria kwa uhakika, hasa malaria kali. Watu walioitegemea mitishamba peke yake ndio mara nyingi wanaishia ICU na malaria ya ubongo Afrika Mashariki. ALu ni ya bei rahisi, inapatikana bure vituo vya umma, na imethibitishwa. Ukitaka kutumia mitishamba kama "comfort," mwambie daktari kwanza — mingine inaharibu ini au inagongana na ALu. Artemisinin iliyo ndani ya ALu iligunduliwa kutoka kwa mmea — tiba ya kisasa na elimu ya kienyeji sio adui, zinafanya kazi pamoja vizuri vikiongozwa na ushahidi.',
      },
    },
    {
      q: {
        en: 'Does sleeping under a bed net really make a difference?',
        sw: 'Kulala chini ya chandarua kweli kuna tofauti?',
      },
      a: {
        en: 'Yes — a huge difference. Long-lasting insecticidal nets (LLINs) reduce malaria infections by about 50% and child deaths by about 20% across Africa. The Anopheles mosquito that carries malaria bites mostly between 10pm and 5am, when you are in bed. A net that covers the bed, is tucked under the mattress, and has no holes works even on nights without bug spray. Use it every night, every season — not just rainy season. Wash it gently (no scrubbing), do not lay it on the floor. The net is free or subsidized in Tanzania — claim yours at your local dispensary or ANC clinic.',
        sw: 'Ndio — tofauti kubwa. Vyandarua vya muda mrefu vyenye dawa ya kuua wadudu (LLINs) hupunguza maambukizi ya malaria kwa karibu 50% na vifo vya watoto kwa karibu 20% Afrika. Mbu wa Anopheles anayeleta malaria anauma hasa kati ya saa 4 usiku na saa 11 alfajiri, wakati uko kitandani. Chandarua kinachofunika kitanda, kinawekwa chini ya godoro, na hakina mashimo kinafanya kazi hata usiku bila dawa ya kunyunyuza. Tumia kila usiku, kila msimu — sio msimu wa mvua tu. Osha kwa upole (usisugue), usiweke sakafuni. Chandarua ni bure au cha bei nafuu Tanzania — kichukue kwenye zahanati au kliniki ya ANC.',
        sw_mtaa: 'Ndio — tofauti kubwa. Vyandarua vya muda mrefu vyenye dawa ya kuua wadudu (LLINs) vinapunguza maambukizi ya malaria kwa karibu 50% na vifo vya watoto kwa karibu 20% Afrika. Mbu wa Anopheles anayeleta malaria anauma hasa kati ya saa 4 usiku na saa 11 alfajiri, wakati uko kitandani. Chandarua kinachofunika kitanda kabisa, kimewekwa chini ya godoro, hakina mashimo — kinafanya kazi hata bila mosquito spray. Tumia kila usiku, kila msimu — sio mvua tu. Osha pole pole (usisugue sana), usiweke sakafuni. Chandarua ni bure au rahisi Tanzania — kichukue kwenye zahanati au ANC clinic.',
      },
    },
    {
      q: {
        en: 'Why do some people seem to never get malaria?',
        sw: 'Kwa nini watu wengine wanaonekana hawapati malaria kabisa?',
      },
      a: {
        en: 'Three reasons. First, partial immunity: people who grew up in malaria-heavy areas and have had malaria multiple times in childhood often develop "semi-immunity" — they still get infected but with milder symptoms, sometimes not enough to feel sick. Second, genetics: people with sickle cell trait, G6PD deficiency, or certain blood-group variants resist malaria parasites more effectively (this is why these conditions stayed in African populations). Third, exposure differences: someone who sleeps under a net, lives in screened housing, or simply has fewer mosquitoes around them gets fewer bites. None of this means immunity is complete — semi-immune adults still die of severe malaria, especially during pregnancy or with HIV. Never assume you are "protected."',
        sw: 'Sababu tatu. Kwanza, ulinzi wa sehemu: watu walikua katika maeneo yenye malaria nyingi na wamepata malaria mara nyingi utotoni mara nyingi wanaendeleza "kinga ya nusu" — bado wanaambukizwa lakini na dalili nyepesi, wakati mwingine hawajisikii kuwa wagonjwa. Pili, jenetiki: watu wenye sifa ya sickle cell, upungufu wa G6PD, au baadhi ya aina za vikundi vya damu wanapinga vimelea vya malaria kwa ufanisi zaidi (ndio maana hali hizi zimebaki katika watu wa Afrika). Tatu, tofauti za kuwasiliana: mtu anayelala chini ya chandarua, anayeishi katika nyumba zilizo na grille, au anayemzunguka mbu wachache anapata kuumwa kuchache. Hakuna kati ya haya inamaanisha kinga kamili — watu wazima wa nusu-kinga bado wanafariki kwa malaria kali, hasa wakati wa mimba au na VVU. Kamwe usidhani umelindwa kabisa.',
        sw_mtaa: 'Sababu tatu. Moja, "semi-immunity": watu waliokua maeneo ya malaria nyingi na wamepata malaria mara nyingi utotoni mara nyingi wanaendeleza kinga ya nusu — bado wanaambukizwa lakini dalili nyepesi, wakati mwingine hawajisikii kuwa wagonjwa kabisa. Pili, jeni: watu wenye sickle cell trait, G6PD deficiency, au baadhi ya blood groups wanapinga vimelea vya malaria zaidi (ndio maana hali hizi zimebaki kwenye Waafrika). Tatu, exposure tofauti: mtu anayelala chini ya chandarua, anayeishi kwenye nyumba zenye nets za madirisha, au sehemu zenye mbu wachache anapata bite chache. Lakini hakuna ya hizi ni kinga kamili — hata wenye semi-immunity wanafariki kwa malaria kali, hasa wakati wa mimba au na VVU. Usidhani wewe umelindwa kabisa.',
      },
    },
    {
      q: {
        en: 'I got malaria three weeks ago — now I feel sick again. Is it the same malaria or new?',
        sw: 'Nilipata malaria wiki tatu zilizopita — sasa nahisi mgonjwa tena. Ni malaria ile ile au mpya?',
      },
      a: {
        en: 'It could be either, and the distinction matters for treatment. "Recrudescence" means the original parasites were not fully cleared by ALu (treatment failure) — this usually happens within 4 weeks and may need a different drug. "Reinfection" means a new mosquito bite gave you a new dose of parasites — common in high-transmission areas, treated the same way as new malaria. Either way, go back to a clinic and get a fresh mRDT or microscopy. Do not just start ALu again — your clinician will decide based on timing, prior response, and your risk factors. If you have danger signs, go to hospital.',
        sw: 'Inaweza kuwa moja au nyingine, na tofauti ni muhimu kwa matibabu. "Recrudescence" maana yake vimelea vya awali havikuondolewa kabisa na ALu (kushindwa kwa matibabu) — mara nyingi hutokea ndani ya wiki 4 na huenda inahitaji dawa tofauti. "Reinfection" maana yake mbu mpya alikupa dose mpya ya vimelea — kawaida katika maeneo ya maambukizi mengi, kutibiwa kama malaria mpya. Vyovyote vile, rudi kliniki na pata mRDT mpya au darubini. Usianzishe tu ALu tena — daktari wako atatoa uamuzi kwa kuzingatia muda, mwitikio wa awali, na sababu zako za hatari. Ukiwa na dalili za hatari, nenda hospitali.',
        sw_mtaa: 'Inaweza kuwa moja au nyingine, na tofauti ni muhimu kwa matibabu. "Recrudescence" maana yake vimelea vya awali havikuondolewa kabisa na ALu (treatment failure) — mara nyingi hutokea ndani ya wiki 4 na huenda inahitaji dawa tofauti. "Reinfection" maana yake mbu mpya alikupa dose mpya ya vimelea — kawaida maeneo ya maambukizi mengi, kutibiwa kama malaria mpya. Vyovyote vile, rudi kliniki upimwe mRDT mpya au darubini. Usianzishe tu ALu tena — daktari atatoa uamuzi kwa kuzingatia muda, mwitikio wa awali, na sababu zako za hatari. Ukiwa na dalili za hatari, nenda hospitali.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take ALu exactly as prescribed — twice daily for 3 days (6 doses total), with fatty food or milk to help absorption. Even if you feel better by day 2, complete all 6 doses. Stopping early lets parasites survive and come back stronger.',
      sw: 'Tumia ALu kama ulivyoelekezwa — mara mbili kwa siku kwa siku 3 (jumla dose 6), pamoja na chakula chenye mafuta au maziwa kusaidia kufyonzwa. Hata ukijisikia vizuri siku ya 2, malizia dose zote 6. Kusimamisha mapema kunaruhusu vimelea kunusurika na kurudi vikiwa na nguvu zaidi.',
      sw_mtaa: 'Tumia ALu kama ulivyoambiwa — mara mbili kwa siku, siku 3 (dose 6 jumla), na chakula chenye mafuta au maziwa. Hata ukijihisi poa siku ya 2, malizia dose zote 6. Ukisimamisha mapema, vimelea vinaweza kurudi vikiwa na nguvu zaidi.',
    },
    {
      en: 'Drink plenty of fluids — water, oral rehydration solution (ORS), uji, soup. Fever loses you water fast. If you cannot keep fluids down due to vomiting, return to the clinic immediately.',
      sw: 'Kunywa maji mengi — maji, ORS, uji, supu. Homa inakupotezea maji kwa haraka. Kama huwezi kushikilia majimaji kutokana na kutapika, rudi kliniki mara moja.',
      sw_mtaa: 'Kunywa majimaji mengi — maji, ORS, uji, supu. Homa inakupotezea maji haraka. Kama unatapika usiweze kushikilia maji, rudi kliniki haraka.',
    },
    {
      en: 'Take paracetamol for fever and aches — 1g for adults every 6-8 hours, max 4g per day. Do not use ibuprofen or diclofenac during malaria as they can worsen kidney stress.',
      sw: 'Tumia paracetamol kwa homa na maumivu — 1g kwa mtu mzima kila masaa 6-8, kiwango cha juu 4g kwa siku. Usitumie ibuprofen au diclofenac wakati wa malaria kwa sababu zinaweza kuongeza msongo wa figo.',
      sw_mtaa: 'Tumia paracetamol kwa homa na maumivu — 1g kwa mtu mzima kila masaa 6-8, isizidi 4g kwa siku. Usitumie ibuprofen au diclofenac wakati wa malaria — zinaweza kuharibu figo.',
    },
    {
      en: 'Rest. Malaria is exhausting and the body needs energy to fight. Light food is fine — uji, rice, banana, soup. Heavy fried food during illness is harder to keep down.',
      sw: 'Pumzika. Malaria inachosha na mwili unahitaji nguvu ya kupambana. Chakula chepesi ni sawa — uji, wali, ndizi, supu. Chakula kizito chenye mafuta wakati wa kuumwa ni kigumu kushikilia.',
      sw_mtaa: 'Pumzika. Malaria inachosha sana. Kula chakula chepesi — uji, wali, ndizi, supu. Vyakula vizito vya kukaanga wakati wa kuumwa ni vigumu kushikilia.',
    },
    {
      en: 'Sleep under an insecticide-treated bed net every night — not just during illness. You and your family. This is the single most important malaria prevention.',
      sw: 'Lala chini ya chandarua chenye dawa kila usiku — sio tu wakati wa kuumwa. Wewe na familia yako. Hii ndiyo kinga muhimu kabisa ya malaria.',
      sw_mtaa: 'Lala chini ya chandarua chenye dawa kila usiku — sio tu wakati wa kuumwa. Wewe na familia. Hii ndio kinga muhimu kabisa ya malaria.',
    },
    {
      en: 'Return for follow-up if your doctor asks. After malaria, some people become severely anemic — a simple haemoglobin check can catch this early. Children especially benefit from a 1-week check.',
      sw: 'Rudi kwa ufuatiliaji daktari akiomba. Baada ya malaria, watu wengine wanapata upungufu mkubwa wa damu — kipimo rahisi cha hemoglobini kinaweza kugundua hili mapema. Watoto hasa wananufaika na ukaguzi wa wiki moja.',
      sw_mtaa: 'Rudi kuangaliwa daktari akikuomba. Baada ya malaria, wengine wanapata upungufu mkubwa wa damu — kipimo cha hemoglobini kinaweza kugundua mapema. Watoto hasa wanahitaji ukaguzi wa wiki moja.',
    },
  ],

  warningTriggers: [
    {
      en: 'Delaying testing or treatment — malaria progresses fast, especially in children and pregnant women',
      sw: 'Kuchelewesha kupima au matibabu — malaria inazidi kwa haraka, hasa kwa watoto na wajawazito',
      sw_mtaa: 'Kuchelewesha kupima au matibabu — malaria inaongezeka haraka, hasa watoto na wajawazito',
    },
    {
      en: 'Self-medicating with leftover or pharmacy-bought ALu without a test — wrong treatment delays the right one',
      sw: 'Kujitibu na ALu iliyobaki au kununuliwa duka la dawa bila kupima — matibabu yasiyo sahihi yanachelewesha sahihi',
      sw_mtaa: 'Kujitibu na ALu iliyobaki au kununuliwa duka bila kupimwa — dawa zisizo sahihi zinachelewesha matibabu halisi',
    },
    {
      en: 'Not using a bed net consistently — mosquitoes bite mostly between dusk and dawn',
      sw: 'Kutotumia chandarua mara kwa mara — mbu wanauma zaidi kati ya jioni na alfajiri',
      sw_mtaa: 'Kutolala chini ya chandarua kila siku — mbu wanauma zaidi kati ya jioni na alfajiri',
    },
    {
      en: 'Standing water near the home — old tyres, buckets, gutters, plant pots — these breed mosquitoes',
      sw: 'Maji yaliyotuama karibu na nyumba — matairi ya zamani, ndoo, mifereji, vyungu vya mimea — hivi vinazalisha mbu',
      sw_mtaa: 'Maji yaliyotuama karibu na nyumba — matairi, ndoo, mifereji, vyungu vya maua — hivi vinazalisha mbu',
    },
    {
      en: 'Not completing all 6 doses of ALu — leaves parasites alive that come back resistant',
      sw: 'Kutomalizia dose zote 6 za ALu — kuacha vimelea hai vinavyorudi vikiwa sugu',
      sw_mtaa: 'Kutomaliza dose 6 za ALu — vimelea vinabaki hai na vinaweza kurudi vikiwa sugu kwa dawa',
    },
    {
      en: 'Pregnancy without IPTp (intermittent preventive treatment) at antenatal visits — IPTp prevents malaria in pregnancy',
      sw: 'Ujauzito bila IPTp (matibabu ya kuzuia ya mara kwa mara) kwenye ziara za kliniki — IPTp huzuia malaria kwenye ujauzito',
      sw_mtaa: 'Mimba bila IPTp (dawa ya kuzuia malaria) kwenye kliniki za wajawazito — IPTp inazuia malaria wakati wa mimba',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Any fever — go to a clinic same day for an mRDT (rapid test)',
        sw: 'Homa yoyote — nenda kliniki siku hiyo hiyo kupimwa mRDT (kipimo cha haraka)',
        sw_mtaa: 'Homa yoyote — nenda kliniki siku hiyo upimwe mRDT',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Convulsions, fits, or sudden unresponsiveness — possible cerebral malaria, emergency',
        sw: 'Kifafa, mishtuko, au kushindwa kujibu ghafla — uwezekano wa malaria ya ubongo, dharura',
        sw_mtaa: 'Kifafa, mishtuko, au kuzimia ghafla — inaweza kuwa malaria ya ubongo, ni dharura',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Cannot drink or breastfeed, or vomiting everything for over 6 hours',
        sw: 'Kushindwa kunywa au kunyonya, au kutapika kila kitu kwa zaidi ya masaa 6',
        sw_mtaa: 'Kushindwa kunywa au kunyonya (mtoto), au kutapika kila kitu kwa masaa 6+',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Very pale skin, palms, or inside of lower eyelid — severe anemia',
        sw: 'Ngozi, viganja, au ndani ya kope la chini ni weupe sana — upungufu mkubwa wa damu',
        sw_mtaa: 'Mtoto au mtu mzima ana weupe sana ngozini, viganja, au ndani ya kope — damu ya chini sana',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Fast breathing or difficulty breathing in a person with fever',
        sw: 'Kupumua haraka au kwa shida kwa mtu mwenye homa',
        sw_mtaa: 'Kupumua haraka au kwa shida pamoja na homa',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Yellow eyes or yellow palms with fever — possible severe malaria',
        sw: 'Macho ya njano au viganja vya njano pamoja na homa — uwezekano wa malaria kali',
        sw_mtaa: 'Macho au viganja vya njano pamoja na homa — inaweza kuwa malaria kali',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Very little urine, or no urine in 8+ hours, with malaria — possible kidney injury',
        sw: 'Mkojo kidogo sana, au hakuna mkojo kwa masaa 8+, pamoja na malaria — uwezekano wa kuumia kwa figo',
        sw_mtaa: 'Mkojo kidogo sana, au hakuna mkojo kwa masaa 8+, pamoja na malaria — figo zinaweza kuwa zinaharibika',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Bleeding from nose, gums, or in vomit/stool with malaria',
        sw: 'Damu kutoka puani, kwenye fizi, au kwenye matapishi/kinyesi pamoja na malaria',
        sw_mtaa: 'Damu kutoka puani, fizi, au kwenye matapishi/choo pamoja na malaria',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Pregnant woman with fever — every fever in pregnancy needs same-day care',
        sw: 'Mjamzito mwenye homa — kila homa katika ujauzito inahitaji huduma siku hiyo hiyo',
        sw_mtaa: 'Mjamzito mwenye homa — kila homa wakati wa mimba inahitaji huduma siku hiyo hiyo',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Child under 5 with fever — same-day clinic visit and mRDT',
        sw: 'Mtoto chini ya miaka 5 mwenye homa — ziara ya kliniki siku hiyo na mRDT',
        sw_mtaa: 'Mtoto chini ya miaka 5 mwenye homa — nenda kliniki siku hiyo upimwe',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Fever continues beyond day 3 of ALu treatment',
        sw: 'Homa inaendelea baada ya siku ya 3 ya matibabu ya ALu',
        sw_mtaa: 'Homa inaendelea baada ya siku ya 3 ya ALu',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  // ════════════════════════════════════════════════════════════════════
  // VARIANTS — severity / population specific presentations
  // ════════════════════════════════════════════════════════════════════
  variants: [
    {
      id: 'malaria_uncomplicated',
      severity: 'uncomplicated',
      label: {
        en: 'Uncomplicated malaria',
        sw: 'Malaria ya kawaida',
      },
      presentation: {
        en: 'Fever (often with chills and sweats in cycles), headache, body aches, tiredness, sometimes nausea or mild vomiting, sometimes diarrhea. No danger signs. The person can still eat, drink, and walk. This is what most malaria looks like — and what ALu treats fully at home.',
        sw: 'Homa (mara nyingi pamoja na baridi na jasho kwa mizunguko), kichwa, maumivu ya mwili, uchovu, wakati mwingine kichefuchefu au kutapika kidogo, wakati mwingine kuhara. Hakuna dalili za hatari. Mtu bado anaweza kula, kunywa, na kutembea. Hivi ndivyo malaria nyingi inavyokuwa — na ndivyo ALu inavyotibu kabisa nyumbani.',
        sw_mtaa: 'Homa (mara nyingi na baridi na jasho mizunguko), kichwa, mwili kuuma, uchovu, wakati mwingine kichefuchefu au kutapika kidogo, wakati mwingine kuhara. Hakuna dalili za hatari. Mtu anaweza bado kula, kunywa, na kutembea. Hivi ndivyo malaria nyingi inavyokuwa — na ALu inatibu kabisa nyumbani.',
      },
      recognitionSigns: [
        {
          en: 'Fever, with chills, headache, body aches',
          sw: 'Homa, na baridi, kichwa, maumivu ya mwili',
          sw_mtaa: 'Homa, baridi, kichwa kuuma, mwili kuuma',
        },
        {
          en: 'Positive mRDT or microscopy',
          sw: 'mRDT chanya au darubini',
          sw_mtaa: 'mRDT positive au damu kwenye darubini imeonyesha vimelea',
        },
        {
          en: 'Still able to drink, eat, walk',
          sw: 'Bado anaweza kunywa, kula, kutembea',
          sw_mtaa: 'Bado anaweza kunywa, kula, kutembea',
        },
      ],
      treatmentJourney: {
        en: 'ALu (artemether-lumefantrine) by mouth, twice daily for 3 days — total 6 doses. Taken with fatty food or milk so it absorbs. Symptoms usually improve within 24-48 hours. Even if you feel better, complete all 6 doses. A follow-up after 1 week is wise, especially for children and pregnant women — to check for anemia.',
        sw: 'ALu (artemether-lumefantrine) kwa kumeza, mara mbili kwa siku kwa siku 3 — jumla dose 6. Inakunywa pamoja na chakula chenye mafuta au maziwa ili ifyonzwe. Dalili kwa kawaida hupungua ndani ya masaa 24-48. Hata ukijisikia vizuri, malizia dose zote 6. Ufuatiliaji baada ya wiki 1 ni vizuri, hasa kwa watoto na wajawazito — kuangalia upungufu wa damu.',
        sw_mtaa: 'ALu (artemether-lumefantrine) kwa kumeza, mara mbili kwa siku, siku 3 — jumla dose 6. Inakunywa pamoja na chakula chenye mafuta au maziwa. Dalili huanza kupungua ndani ya masaa 24-48. Hata ukijihisi poa, malizia dose 6. Ufuatiliaji baada ya wiki 1 ni vizuri, hasa watoto na wajawazito — kuangalia damu.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Persistent vomiting (cannot keep ALu down)',
            sw: 'Kutapika kunaendelea (huwezi kushikilia ALu)',
            sw_mtaa: 'Unatapika sana huwezi kushikilia ALu',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Symptoms worsen instead of improving after 48 hours of ALu',
            sw: 'Dalili zinazidi badala ya kupungua baada ya masaa 48 ya ALu',
            sw_mtaa: 'Dalili zinazidi badala ya kupungua baada ya masaa 48 ya ALu',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Return for a check at 1 week if you are a child, pregnant, or had severe symptoms initially. Check haemoglobin if very pale or very tired. Most adults do not need a routine follow-up if fully recovered.',
        sw: 'Rudi kwa ukaguzi baada ya wiki 1 kama wewe ni mtoto, mjamzito, au ulikuwa na dalili kali mwanzoni. Pima hemoglobini kama wewe ni weupe sana au una uchovu mkubwa. Watu wengi wazima hawahitaji ukaguzi wa kawaida kama wamepona kabisa.',
        sw_mtaa: 'Rudi kuangaliwa baada ya wiki 1 kama wewe ni mtoto, mjamzito, au ulikuwa na dalili kali mwanzoni. Pima damu kama ni weupe sana au una uchovu mkubwa. Watu wazima wengi hawahitaji ukaguzi kama wamepona kabisa.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('NTLG_STG_2023')],
    },

    {
      id: 'malaria_severe',
      severity: 'severe',
      label: {
        en: 'Severe malaria',
        sw: 'Malaria kali',
      },
      presentation: {
        en: 'Severe malaria has one or more danger signs that put the body at immediate risk: convulsions, very deep drowsiness or unconsciousness, inability to drink or feed, repeated vomiting, severe pallor (very pale palms, tongue, lower eyelid), fast or difficult breathing, very dark urine, very little or no urine, yellow eyes (jaundice), bleeding from nose or gums, signs of shock (cold extremities, weak pulse). The person needs hospital admission and intravenous artesunate — not pills.',
        sw: 'Malaria kali ina dalili moja au zaidi za hatari zinazoweka mwili katika hatari ya haraka: kifafa, usingizi mzito sana au kuzimia, kushindwa kunywa au kula, kutapika mara kwa mara, weupe wa hatari (viganja, ulimi, kope la chini ni weupe sana), kupumua haraka au kwa shida, mkojo wa giza sana, mkojo kidogo sana au hakuna kabisa, macho ya njano, kutoka damu puani au kwenye fizi, dalili za mshtuko (mikono na miguu baridi, mapigo dhaifu). Mtu anahitaji kulazwa hospitalini na artesunate ya mishipa — sio vidonge.',
        sw_mtaa: 'Malaria kali ina dalili moja au zaidi za hatari: kifafa, usingizi mzito au kuzimia, kushindwa kunywa au kula, kutapika sana, weupe wa hatari (viganja, ulimi, kope la chini ni weupe sana), kupumua haraka au kwa shida, mkojo wa giza, mkojo kidogo au hakuna, macho ya njano, damu kutoka puani au fizi, mikono na miguu baridi. Mtu anahitaji kulazwa hospitali na artesunate ya mishipa — sio vidonge.',
      },
      recognitionSigns: [
        {
          en: 'Convulsions or unconscious or very drowsy',
          sw: 'Kifafa au kuzimia au usingizi mzito sana',
          sw_mtaa: 'Kifafa, kuzimia, au usingizi mzito sana',
        },
        {
          en: 'Cannot drink or breastfeed; repeated vomiting',
          sw: 'Kushindwa kunywa au kunyonya; kutapika mara kwa mara',
          sw_mtaa: 'Kushindwa kunywa au kunyonya (mtoto); kutapika sana',
        },
        {
          en: 'Severe pallor — very white palms, tongue, lower eyelid',
          sw: 'Weupe mkubwa — viganja, ulimi, kope la chini ni weupe sana',
          sw_mtaa: 'Weupe mkubwa — viganja, ulimi, kope ni weupe sana',
        },
        {
          en: 'Fast or difficult breathing, chest indrawing in a child',
          sw: 'Kupumua haraka au kwa shida, mbavu kuingia ndani kwa mtoto',
          sw_mtaa: 'Kupumua haraka au kwa shida, mbavu kuingia ndani (mtoto)',
        },
        {
          en: 'Jaundice (yellow eyes), dark urine, or no urine',
          sw: 'Macho ya njano, mkojo wa giza, au hakuna mkojo',
          sw_mtaa: 'Macho ya njano, mkojo wa giza, au hakuna mkojo',
        },
        {
          en: 'Bleeding from nose, gums, or in vomit/stool',
          sw: 'Damu kutoka puani, fizi, au kwenye matapishi/kinyesi',
          sw_mtaa: 'Damu kutoka puani, fizi, au kwenye matapishi/choo',
        },
        {
          en: 'Cold hands and feet, very weak pulse — shock',
          sw: 'Mikono na miguu baridi, mapigo dhaifu sana — mshtuko',
          sw_mtaa: 'Mikono na miguu baridi, mapigo dhaifu sana — mshtuko',
        },
      ],
      treatmentJourney: {
        en: 'Severe malaria is treated as a medical emergency. Standard care is intravenous (or intramuscular if IV not available) artesunate for at least 24 hours, then completed with full oral ALu course once the person can eat and drink. Hospitals also monitor for and treat low blood sugar, anemia needing transfusion, kidney injury, breathing problems, and other complications. Recovery is usually faster with early treatment. Death rates rise sharply with every hour of delay.',
        sw: 'Malaria kali inatibiwa kama dharura ya kimatibabu. Huduma ya kawaida ni artesunate ya mishipa (au ya misuli kama mishipa haipo) kwa angalau masaa 24, kisha kukamilishwa na kozi kamili ya ALu ya kumeza pale mtu anapoweza kula na kunywa. Hospitali pia hufuatilia na kutibu sukari ya chini, upungufu wa damu unaohitaji utiwaji wa damu, kuumia kwa figo, matatizo ya kupumua, na matatizo mengine. Kupona kwa kawaida ni haraka pamoja na matibabu ya mapema. Kiwango cha vifo kinapanda haraka kwa kila saa la kuchelewa.',
        sw_mtaa: 'Malaria kali ni dharura. Matibabu ya kawaida ni artesunate ya mishipa (au ya misuli kama mishipa haipo) kwa angalau masaa 24, kisha kukamilisha na ALu ya kumeza pale mtu anaweza kula na kunywa. Hospitali pia hufuatilia na kutibu sukari ya chini, upungufu wa damu, figo, kupumua, na mengine. Kupona ni haraka kwa matibabu ya mapema. Vifo vinaongezeka kwa kila saa la kuchelewa.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Any of the severe malaria recognition signs above — go to a hospital with admission capacity NOW, not a dispensary',
            sw: 'Dalili yoyote ya utambuzi wa malaria kali hapo juu — nenda hospitali yenye uwezo wa kulaza SASA, sio zahanati',
            sw_mtaa: 'Dalili yoyote ya hatari hapo juu — nenda HOSPITALI inayoweza kulaza SASA, sio dispensari',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Worsening drowsiness, breathing difficulty, or bleeding during treatment',
            sw: 'Usingizi unaongezeka, ugumu wa kupumua, au kutoka damu wakati wa matibabu',
            sw_mtaa: 'Usingizi unaongezeka, kupumua kwa shida, au damu kutoka wakati wa matibabu',
          },
          urgency: 'emergency',
        },
      ],
      followUp: {
        en: 'After discharge from hospital, complete the oral ALu course. Return for haemoglobin check at 1 week — anemia after severe malaria is very common and may need iron or transfusion. Children especially need a 1-month neuro-developmental check if they had cerebral malaria. Take the IPTp tablets as advised if pregnant.',
        sw: 'Baada ya kuruhusiwa hospitalini, malizia kozi ya ALu ya kumeza. Rudi kwa kipimo cha hemoglobini baada ya wiki 1 — upungufu wa damu baada ya malaria kali ni wa kawaida sana na unaweza kuhitaji chuma au kutiwa damu. Watoto hasa wanahitaji ukaguzi wa ubongo baada ya mwezi 1 kama walikuwa na malaria ya ubongo. Tumia vidonge vya IPTp kama ulivyoshauriwa kama una ujauzito.',
        sw_mtaa: 'Baada ya kuruhusiwa hospitalini, malizia kozi ya ALu ya kumeza. Rudi kupimwa damu baada ya wiki 1 — upungufu wa damu baada ya malaria kali ni wa kawaida na unaweza kuhitaji chuma au damu. Watoto hasa wanahitaji ukaguzi wa ubongo baada ya mwezi 1 kama walikuwa na malaria ya ubongo. Tumia IPTp kama ulivyoshauriwa kama una mimba.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('NTLG_STG_2023'), src('MUHIMBILI_PROTOCOLS')],
    },

    {
      id: 'malaria_cerebral',
      severity: 'critical',
      label: {
        en: 'Cerebral malaria',
        sw: 'Malaria ya ubongo',
      },
      presentation: {
        en: 'Cerebral malaria is severe malaria where the parasites affect the brain. The person becomes deeply drowsy, confused, unable to recognize family, has convulsions, or falls into coma. It is most common in children under 5 and in pregnant women. Without urgent IV treatment in a hospital, it has a high death rate — and even with treatment, some survivors have lasting neurologic effects (weakness, learning difficulty, epilepsy). Speed matters more than choice of hospital.',
        sw: 'Malaria ya ubongo ni malaria kali ambapo vimelea vinashambulia ubongo. Mtu anakuwa na usingizi mzito sana, kuchanganyikiwa, kushindwa kutambua familia, anapata kifafa, au anaingia katika koma. Ni ya kawaida zaidi kwa watoto walio chini ya miaka 5 na kwa wajawazito. Bila matibabu ya haraka ya mishipa hospitalini, ina kiwango kikubwa cha vifo — na hata na matibabu, baadhi ya wanaonusurika wana athari za muda mrefu za ubongo (udhaifu, ugumu wa kujifunza, kifafa). Kasi ni muhimu zaidi ya chaguo la hospitali.',
        sw_mtaa: 'Malaria ya ubongo ni malaria kali ambapo vimelea vinashambulia ubongo. Mtu anakuwa na usingizi mzito sana, kuchanganyikiwa, kushindwa kutambua familia, anapata kifafa, au anaingia koma. Ni ya kawaida zaidi kwa watoto chini ya miaka 5 na wajawazito. Bila matibabu ya haraka ya mishipa hospitalini, watu wengi wanafariki — na hata na matibabu, baadhi wana athari za muda mrefu (udhaifu, kuwa na shida kujifunza, kifafa). Kasi ni muhimu zaidi ya chaguo la hospitali.',
      },
      recognitionSigns: [
        {
          en: 'Convulsions (fits) in a person with fever',
          sw: 'Kifafa (mishtuko) kwa mtu mwenye homa',
          sw_mtaa: 'Kifafa pamoja na homa',
        },
        {
          en: 'Unconscious, cannot be woken, or very deeply drowsy',
          sw: 'Kuzimia, kushindwa kuamshwa, au usingizi mzito sana',
          sw_mtaa: 'Kuzimia, kushindwa kuamshwa, au usingizi mzito sana',
        },
        {
          en: 'Confusion, does not recognize people, abnormal behavior',
          sw: 'Kuchanganyikiwa, kushindwa kutambua watu, tabia isiyo ya kawaida',
          sw_mtaa: 'Kuchanganyikiwa, kushindwa kutambua watu, tabia ya ajabu',
        },
        {
          en: 'In children: child cannot sit, cannot drink, repeated convulsions',
          sw: 'Kwa watoto: mtoto hawezi kukaa, hawezi kunywa, kifafa mara kwa mara',
          sw_mtaa: 'Mtoto: hawezi kukaa, hawezi kunywa, kifafa kinarudia',
        },
      ],
      treatmentJourney: {
        en: 'Cerebral malaria requires immediate hospital admission. IV artesunate is given for at least 24 hours, plus seizure control, blood sugar correction, oxygen if needed, and intensive monitoring. Some patients need ICU. After waking, they continue with oral ALu and gradual recovery. Family should expect the hospital stay to be several days at minimum. Long-term follow-up is essential because of possible brain effects, especially in children.',
        sw: 'Malaria ya ubongo inahitaji kulazwa hospitalini mara moja. Artesunate ya mishipa hutolewa kwa angalau masaa 24, pamoja na udhibiti wa kifafa, kurekebisha sukari ya damu, oksijeni ikiwa inahitajika, na ufuatiliaji wa makini. Wagonjwa wengine wanahitaji ICU. Baada ya kuamka, wanaendelea na ALu ya kumeza na kupona polepole. Familia itarajie kukaa hospitalini siku kadhaa angalau. Ufuatiliaji wa muda mrefu ni muhimu kwa sababu ya athari zinazoweza kuwa za ubongo, hasa kwa watoto.',
        sw_mtaa: 'Malaria ya ubongo inahitaji kulazwa hospitali mara moja. Artesunate ya mishipa kwa angalau masaa 24, pamoja na udhibiti wa kifafa, kurekebisha sukari, oksijeni ikiwa inahitajika, na ufuatiliaji wa makini. Wengine wanahitaji ICU. Baada ya kuamka, wanaendelea na ALu ya kumeza na kupona polepole. Familia itarajie kukaa hospitali siku kadhaa angalau. Ufuatiliaji wa muda mrefu ni muhimu kwa athari za ubongo, hasa watoto.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Anyone with fever AND convulsions or unconsciousness — call ambulance or get to a hospital NOW',
            sw: 'Mtu yeyote mwenye homa NA kifafa au kuzimia — piga ambulensi au fika hospitalini SASA',
            sw_mtaa: 'Mtu yeyote mwenye homa NA kifafa au kuzimia — piga ambulensi au fika hospitali SASA',
          },
          urgency: 'emergency',
        },
      ],
      followUp: {
        en: 'After cerebral malaria, especially in children, follow up at 1 month, 3 months, and 6 months for neuro-developmental check. Some children develop epilepsy or learning difficulties that respond to early support. Iron and folate supplementation usually needed during recovery from anemia.',
        sw: 'Baada ya malaria ya ubongo, hasa kwa watoto, fuatilia baada ya mwezi 1, miezi 3, na miezi 6 kwa ukaguzi wa maendeleo ya ubongo. Baadhi ya watoto wanaendeleza kifafa au ugumu wa kujifunza unaojibu msaada wa mapema. Vidonge vya chuma na folate kwa kawaida vinahitajika wakati wa kupona kutoka upungufu wa damu.',
        sw_mtaa: 'Baada ya malaria ya ubongo, hasa watoto, fuatilia baada ya mwezi 1, miezi 3, na miezi 6 kwa ukaguzi wa ubongo. Baadhi ya watoto wanapata kifafa au ugumu wa kujifunza ambao unajibu msaada wa mapema. Vidonge vya chuma na folate kwa kawaida vinahitajika wakati wa kupona kutoka upungufu wa damu.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('MUHIMBILI_PROTOCOLS')],
    },

    {
      id: 'malaria_pregnancy',
      severity: 'complicated',
      population: 'pregnancy',
      label: {
        en: 'Malaria in pregnancy',
        sw: 'Malaria katika ujauzito',
      },
      presentation: {
        en: 'Malaria in pregnancy is more dangerous for both mother and baby. The mother can develop severe anemia and may not always show typical symptoms. The placenta can harbor parasites that harm the baby — causing low birth weight, premature birth, stillbirth, and miscarriage. Symptoms may be milder than expected (fever may not be very high), so every fever in pregnancy must be tested same-day.',
        sw: 'Malaria katika ujauzito ni hatari zaidi kwa mama na mtoto. Mama anaweza kupata upungufu mkubwa wa damu na huenda hasionyeshe dalili za kawaida kila wakati. Kondo la nyuma linaweza kuhifadhi vimelea ambavyo vinamuumiza mtoto — kusababisha uzito mdogo wa kuzaliwa, kuzaliwa kabla ya wakati, mtoto kufa tumboni, na mimba kuharibika. Dalili zinaweza kuwa nyepesi kuliko inavyotarajiwa (homa inaweza isiwe kubwa sana), hivyo kila homa katika ujauzito lazima ipimwe siku hiyo hiyo.',
        sw_mtaa: 'Malaria kwenye ujauzito ni hatari zaidi kwa mama na mtoto. Mama anaweza kupata upungufu mkubwa wa damu na huenda hasionyeshe dalili za kawaida. Kondo la nyuma linaweza kuhifadhi vimelea vinavyomuumiza mtoto — kusababisha uzito mdogo wa kuzaliwa, kuzaliwa kabla ya wakati, mtoto kufa tumboni, na mimba kuharibika. Dalili zinaweza kuwa nyepesi (homa inaweza isiwe kubwa), hivyo kila homa katika mimba LAZIMA ipimwe siku hiyohiyo.',
      },
      recognitionSigns: [
        {
          en: 'Any fever in pregnancy — even low-grade — needs same-day mRDT',
          sw: 'Homa yoyote katika ujauzito — hata kidogo — inahitaji mRDT siku hiyo hiyo',
          sw_mtaa: 'Homa yoyote katika mimba — hata kidogo — inahitaji mRDT siku hiyo',
        },
        {
          en: 'Increasing tiredness, paleness during pregnancy may signal silent malaria',
          sw: 'Uchovu unaoongezeka, kuwa weupe wakati wa ujauzito unaweza kuwa malaria iliyofichwa',
          sw_mtaa: 'Uchovu unaoongezeka, kuwa weupe wakati wa mimba unaweza kuwa malaria iliyojificha',
        },
        {
          en: 'Headache, body aches, chills with or without fever',
          sw: 'Kichwa, maumivu ya mwili, baridi pamoja na au bila homa',
          sw_mtaa: 'Kichwa kuuma, mwili kuuma, baridi na au bila homa',
        },
      ],
      treatmentJourney: {
        en: 'Treatment depends on stage of pregnancy. In the FIRST trimester, quinine plus clindamycin is the preferred treatment for uncomplicated malaria (because the safety data is strongest). From the SECOND trimester onwards, ALu is approved and effective. SEVERE malaria at any trimester is treated with IV artesunate — the life-saving benefit far outweighs theoretical risk. Hospitals also check haemoglobin and may give iron, folate, or transfusion. All pregnant women should receive IPTp-SP (intermittent preventive treatment with sulfadoxine-pyrimethamine) at antenatal visits starting in the second trimester — this prevents malaria episodes.',
        sw: 'Matibabu yanategemea hatua ya ujauzito. Katika trimester ya KWANZA, quinine pamoja na clindamycin ni matibabu yanayopendekezwa kwa malaria ya kawaida (kwa sababu data ya usalama ni imara zaidi). Kuanzia trimester ya PILI kuendelea, ALu inakubaliwa na inafanya kazi. Malaria KALI katika trimester yoyote inatibiwa na artesunate ya mishipa — faida ya kuokoa maisha inashinda hatari ya kinadharia. Hospitali pia hupima hemoglobini na huenda zikatoa chuma, folate, au utiaji wa damu. Wajawazito wote wanapaswa kupata IPTp-SP (matibabu ya kuzuia ya mara kwa mara na sulfadoxine-pyrimethamine) kwenye ziara za antenatal kuanzia trimester ya pili — hii huzuia matukio ya malaria.',
        sw_mtaa: 'Matibabu yanategemea hatua ya mimba. Trimester ya KWANZA (miezi 1-3), quinine pamoja na clindamycin ndio dawa ya kwanza (data ya usalama ni imara zaidi). Kuanzia trimester ya PILI (miezi 4 na zaidi), ALu inafaa. Malaria KALI katika trimester yoyote inatibiwa na artesunate ya mishipa — faida ya kuokoa maisha inashinda hatari ya kinadharia. Hospitali pia hupima damu na huenda zikatoa chuma, folate, au damu. Wajawazito wote wanapaswa kupata IPTp-SP (dawa ya kuzuia malaria) kwenye kliniki za wajawazito kuanzia trimester ya pili — hii inazuia malaria.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Any fever in pregnancy — go to a maternity clinic the same day',
            sw: 'Homa yoyote katika ujauzito — nenda kliniki ya wajawazito siku hiyo hiyo',
            sw_mtaa: 'Homa yoyote katika mimba — nenda kliniki ya wajawazito siku hiyo',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Reduced baby movements with fever or fatigue',
            sw: 'Mtoto kupunguza miondoko pamoja na homa au uchovu',
            sw_mtaa: 'Mtoto kupunguza miondoko pamoja na homa au uchovu',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Bleeding from vagina with malaria',
            sw: 'Damu kutoka uke pamoja na malaria',
            sw_mtaa: 'Damu kutoka uke pamoja na malaria',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Severe pallor (very pale palms, tongue, eyelid) in pregnancy',
            sw: 'Weupe wa hatari (viganja, ulimi, kope nyeupe sana) katika ujauzito',
            sw_mtaa: 'Weupe wa hatari (viganja, ulimi, kope nyeupe sana) katika mimba',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'After malaria treatment in pregnancy, return for haemoglobin check, fetal heart and movement check. Continue IPTp-SP at antenatal visits. Daily iron and folate supplementation typically continues throughout pregnancy. The baby will be checked at birth — birth weight, look for anemia signs.',
        sw: 'Baada ya matibabu ya malaria katika ujauzito, rudi kwa kipimo cha hemoglobini, ukaguzi wa mapigo ya moyo ya mtoto na miondoko. Endelea na IPTp-SP kwenye ziara za antenatal. Vidonge vya chuma na folate kila siku kwa kawaida vinaendelea katika ujauzito wote. Mtoto atachunguzwa wakati wa kuzaliwa — uzito wa kuzaliwa, kuangalia dalili za upungufu wa damu.',
        sw_mtaa: 'Baada ya matibabu ya malaria katika mimba, rudi kupimwa hemoglobini, ukaguzi wa moyo wa mtoto na miondoko. Endelea na IPTp-SP kwenye kliniki za wajawazito. Vidonge vya chuma na folate kila siku kwa kawaida vinaendelea katika mimba yote. Mtoto atachunguzwa wakati wa kuzaliwa — uzito wa kuzaliwa, kuangalia dalili za upungufu wa damu.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('MOH_TZ_MATERNAL_2024'), src('FIGO_PREECLAMPSIA_2024')],
    },

    {
      id: 'malaria_pediatric',
      severity: 'complicated',
      population: 'pediatric',
      label: {
        en: 'Malaria in children under 5',
        sw: 'Malaria kwa watoto chini ya miaka 5',
      },
      presentation: {
        en: 'Children under 5 are the highest-risk group for severe malaria. They progress from "well" to "very sick" much faster than adults — sometimes in hours. Early signs in children: fever, fussiness, refusing to eat or breastfeed, vomiting, sleepiness, fast breathing. Watch the IMCI danger signs: convulsions, cannot drink/breastfeed, vomits everything, lethargy or unconsciousness. Any one of these means the child needs urgent hospital care, not a dispensary.',
        sw: 'Watoto walio chini ya miaka 5 ndio kundi lenye hatari kubwa zaidi ya malaria kali. Wanazidi kutoka "vizuri" hadi "mgonjwa sana" haraka zaidi kuliko watu wazima — wakati mwingine ndani ya masaa. Dalili za mapema kwa watoto: homa, kuvuruga, kukataa kula au kunyonya, kutapika, usingizi, kupumua haraka. Angalia dalili za hatari za IMCI: kifafa, kushindwa kunywa/kunyonya, kutapika kila kitu, uchovu mkubwa au kuzimia. Yoyote moja ya hizi maana yake mtoto anahitaji huduma ya hospitali haraka, sio zahanati.',
        sw_mtaa: 'Watoto chini ya miaka 5 ndio kundi lenye hatari kubwa zaidi ya malaria kali. Wanazidi kutoka "poa" hadi "mgonjwa sana" haraka zaidi kuliko watu wazima — wakati mwingine ndani ya masaa machache. Dalili za mapema: homa, kuvuruga, kukataa kula au kunyonya, kutapika, usingizi, kupumua haraka. Angalia dalili za hatari za IMCI: kifafa, kushindwa kunywa/kunyonya, kutapika kila kitu, uchovu mkubwa au kuzimia. Yoyote moja maana yake mtoto anahitaji HOSPITALI haraka, sio dispensari.',
      },
      recognitionSigns: [
        {
          en: 'Fever, may be very high or sometimes low temperature',
          sw: 'Homa, inaweza kuwa kubwa sana au wakati mwingine joto la chini',
          sw_mtaa: 'Homa, inaweza kuwa kubwa sana au wakati mwingine joto la chini',
        },
        {
          en: 'Fussiness, irritability, sleeping more than usual',
          sw: 'Kuvuruga, kushindwa kutulia, kulala zaidi ya kawaida',
          sw_mtaa: 'Kuvuruga, kushindwa kutulia, kulala zaidi ya kawaida',
        },
        {
          en: 'Refusing to breastfeed or eat',
          sw: 'Kukataa kunyonya au kula',
          sw_mtaa: 'Kukataa kunyonya au kula',
        },
        {
          en: 'Vomiting, especially repeatedly',
          sw: 'Kutapika, hasa mara kwa mara',
          sw_mtaa: 'Kutapika, hasa mara kwa mara',
        },
        {
          en: 'Fast breathing or chest indrawing',
          sw: 'Kupumua haraka au mbavu kuingia ndani',
          sw_mtaa: 'Kupumua haraka au mbavu kuingia ndani',
        },
        {
          en: 'Convulsions — any convulsion in a child with fever is severe malaria until proven otherwise',
          sw: 'Kifafa — kifafa chochote kwa mtoto mwenye homa ni malaria kali mpaka ithibitishwe vinginevyo',
          sw_mtaa: 'Kifafa — kifafa chochote kwa mtoto mwenye homa ni malaria kali mpaka ithibitishwe vinginevyo',
        },
      ],
      treatmentJourney: {
        en: 'Uncomplicated childhood malaria: weight-based ALu dispersible tablets (designed to dissolve in water for small children), twice daily for 3 days with food or milk. Severe malaria in children: IV or rectal artesunate immediately, hospital admission, IV fluids, blood sugar correction (children get hypoglycemia easily), and transfusion if anemic. Follow-up includes haemoglobin check at 1 week and again at 1 month — malaria-related anemia in children can be deep and lasting.',
        sw: 'Malaria ya kawaida kwa watoto: vidonge vya ALu vinavyoyeyuka kulingana na uzito (vilivyoundwa kuyeyuka katika maji kwa watoto wadogo), mara mbili kwa siku kwa siku 3 pamoja na chakula au maziwa. Malaria kali kwa watoto: artesunate ya mishipa au ya msamba mara moja, kulazwa hospitalini, majimaji ya mishipa, kurekebisha sukari ya damu (watoto wanapata sukari ya chini kwa urahisi), na utiaji wa damu kama wana upungufu wa damu. Ufuatiliaji unajumuisha kipimo cha hemoglobini wiki 1 na tena mwezi 1 — upungufu wa damu unaohusiana na malaria kwa watoto unaweza kuwa mzito na wa kudumu.',
        sw_mtaa: 'Malaria ya kawaida kwa watoto: vidonge vya ALu vinavyoyeyuka kulingana na uzito (vilivyoundwa kuyeyuka katika maji kwa watoto wadogo), mara mbili kwa siku kwa siku 3 pamoja na chakula au maziwa. Malaria kali kwa watoto: artesunate ya mishipa au ya msamba mara moja, kulazwa hospitali, maji ya mishipa, kurekebisha sukari (watoto wanapata sukari ya chini kwa urahisi), na damu kama wana upungufu. Ufuatiliaji unajumuisha kipimo cha damu wiki 1 na tena mwezi 1 — upungufu wa damu kwa watoto baada ya malaria unaweza kuwa mzito na wa kudumu.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Child cannot drink, breastfeed, or keep anything down — emergency',
            sw: 'Mtoto hawezi kunywa, kunyonya, au kushikilia chochote — dharura',
            sw_mtaa: 'Mtoto hawezi kunywa, kunyonya, au kushikilia chochote — DHARURA',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Child has any convulsion — emergency',
            sw: 'Mtoto ana kifafa chochote — dharura',
            sw_mtaa: 'Mtoto ana kifafa chochote — DHARURA',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Very drowsy, hard to wake, or unconscious',
            sw: 'Usingizi mzito sana, mgumu kuamshwa, au kuzimia',
            sw_mtaa: 'Usingizi mzito sana, mgumu kuamshwa, au kuzimia',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Very pale palms, tongue, or inner lower eyelid',
            sw: 'Viganja, ulimi, au ndani ya kope la chini ni weupe sana',
            sw_mtaa: 'Viganja, ulimi, au ndani ya kope la chini ni weupe sana',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Fast breathing or chest indrawing',
            sw: 'Kupumua haraka au mbavu kuingia ndani',
            sw_mtaa: 'Kupumua haraka au mbavu kuingia ndani',
          },
          urgency: 'emergency',
        },
      ],
      followUp: {
        en: 'After childhood malaria, return at 1 week and 1 month for haemoglobin and growth check. Anemia after malaria is very common and can affect a child\'s development if untreated. Make sure the child sleeps under a bed net every night — children re-infect easily. If your child has had malaria three or more times in a year, talk to the clinician about prevention strategies and any underlying conditions.',
        sw: 'Baada ya malaria ya utotoni, rudi baada ya wiki 1 na mwezi 1 kwa kipimo cha hemoglobini na ukaguzi wa ukuaji. Upungufu wa damu baada ya malaria ni wa kawaida sana na unaweza kuathiri maendeleo ya mtoto kama hautatibiwa. Hakikisha mtoto analala chini ya chandarua kila usiku — watoto wanaambukizwa tena kwa urahisi. Kama mtoto wako amekuwa na malaria mara tatu au zaidi kwa mwaka, ongea na daktari kuhusu mikakati ya kuzuia na hali zinazoweza kuwa za msingi.',
        sw_mtaa: 'Baada ya malaria ya mtoto, rudi baada ya wiki 1 na mwezi 1 kwa kipimo cha damu na ukaguzi wa ukuaji. Upungufu wa damu baada ya malaria ni wa kawaida na unaweza kuathiri maendeleo ya mtoto kama hautatibiwa. Hakikisha mtoto analala chini ya chandarua kila usiku — watoto wanaambukizwa tena kwa urahisi. Kama mtoto wako amekuwa na malaria mara tatu au zaidi kwa mwaka, ongea na daktari kuhusu kuzuia na hali za chini.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('IMCI_2024'), src('MUHIMBILI_PROTOCOLS')],
    },

    // ─── TREATMENT FAILURE ─────────────────────────────────────────────
    {
      id: 'malaria_treatment_failure',
      severity: 'treatment_failure',
      label: {
        en: 'Treatment failure / recurrent malaria',
        sw: 'Kushindwa kwa matibabu / malaria kurudia',
      },
      presentation: {
        en: 'Malaria that does not respond to treatment in the expected way: fever still present beyond day 3 of ALu, parasitaemia rising or unchanged on follow-up smear, or full clinical recovery followed by return of symptoms within 28 days. The first is "early treatment failure," the third is "recrudescence" (the original parasites were not fully killed) — both differ from "reinfection," which is a fresh mosquito bite after cure (more common in high-transmission areas).',
        sw: 'Malaria ambayo haitiki matibabu kwa njia inayotarajiwa: homa bado iko baada ya siku ya 3 ya ALu, idadi ya vimelea inapanda au haijabadilika kwenye smear ya ufuatiliaji, au kupona kabisa kunafuatiwa na kurudi kwa dalili ndani ya siku 28. Ya kwanza ni "early treatment failure," ya tatu ni "recrudescence" (vimelea vya awali havikuuawa kabisa) — zote zinatofautiana na "reinfection," ambayo ni kuumwa mpya na mbu baada ya tiba (kawaida zaidi katika maeneo ya maambukizi mengi).',
        sw_mtaa: 'Malaria ambayo haitiki matibabu kawaida: homa bado iko baada ya siku 3 ya ALu, vimelea vinapanda au havibadiliki kwenye smear, au kupona kamili kisha dalili zinarudi ndani ya siku 28. Ya kwanza ni "early treatment failure," ya tatu ni "recrudescence" (vimelea vya awali havikuuawa kabisa) — zote tofauti na "reinfection" (kuumwa mpya na mbu baada ya tiba).',
      },
      recognitionSigns: [
        {
          en: 'Fever persists or returns after day 3 of ALu',
          sw: 'Homa inaendelea au inarudi baada ya siku ya 3 ya ALu',
          sw_mtaa: 'Homa inaendelea au inarudi baada ya siku 3 ya ALu',
        },
        {
          en: 'Repeat positive mRDT or microscopy within 28 days of treatment',
          sw: 'mRDT au darubini chanya tena ndani ya siku 28 za matibabu',
          sw_mtaa: 'mRDT au darubini positive tena ndani ya siku 28 za matibabu',
        },
        {
          en: 'Worsening rather than improving in the first 48 hours',
          sw: 'Kuzidi badala ya kuboreka katika masaa 48 ya kwanza',
          sw_mtaa: 'Hali kuwa mbaya zaidi badala ya kupungua katika masaa 48 ya kwanza',
        },
      ],
      treatmentJourney: {
        en: 'A second-line ACT is usually used — in Tanzania this is dihydroartemisinin-piperaquine (DHA-PPQ) or artesunate-amodiaquine, depending on availability. The clinician will confirm with microscopy before re-treating (mRDT can stay positive for weeks after cure, so a positive mRDT alone is not enough). If the second treatment also fails, parenteral artesunate is given and the case is reported to the malaria programme for surveillance. Drug resistance to ACT is being watched closely across East Africa.',
        sw: 'ACT ya pili kwa kawaida hutumika — Tanzania hii ni dihydroartemisinin-piperaquine (DHA-PPQ) au artesunate-amodiaquine, kulingana na upatikanaji. Daktari atathibitisha kwa darubini kabla ya kutibu tena (mRDT inaweza kubaki chanya kwa wiki baada ya tiba, hivyo mRDT chanya peke yake haitoshi). Kama matibabu ya pili pia yatashindwa, artesunate ya mishipa hutolewa na kesi inaripotiwa kwa mpango wa malaria kwa ufuatiliaji. Upinzani wa dawa kwa ACT unaangaliwa kwa makini Afrika Mashariki.',
        sw_mtaa: 'ACT ya pili kwa kawaida hutumika — Tanzania hii ni dihydroartemisinin-piperaquine (DHA-PPQ) au artesunate-amodiaquine, kulingana na upatikanaji. Daktari atathibitisha kwa darubini kabla ya kutibu tena (mRDT inaweza kubaki positive kwa wiki baada ya tiba, hivyo mRDT positive peke yake haitoshi). Kama matibabu ya pili pia ikashindwa, artesunate ya mishipa hutolewa na kesi inaripotiwa kwa malaria programme. Drug resistance kwa ACT inaangaliwa Afrika Mashariki.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Any danger sign of severe malaria during a treatment-failure episode',
            sw: 'Dalili yoyote ya hatari ya malaria kali wakati wa kipindi cha kushindwa kwa matibabu',
            sw_mtaa: 'Dalili yoyote ya hatari ya malaria kali wakati wa treatment failure',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Heavy parasitaemia (>4% red cells infected) on repeat smear',
            sw: 'Vimelea vingi (>4% ya seli nyekundu zimeambukizwa) kwenye smear ya kurudiwa',
            sw_mtaa: 'Vimelea vingi (>4% ya seli nyekundu zimeambukizwa) kwenye smear ya kurudiwa',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'After successful second-line treatment, return for a check at 1 week and again at 4 weeks. If you have had two episodes of malaria within a few months in a low-transmission area, ask the clinician to confirm species (Plasmodium falciparum vs vivax — the latter can hide in the liver and relapse). Always carry a record of which drug was used and when — this guides the next clinician if it happens again.',
        sw: 'Baada ya matibabu ya pili yenye mafanikio, rudi kwa ukaguzi baada ya wiki 1 na tena wiki 4. Kama umekuwa na vipindi viwili vya malaria ndani ya miezi michache katika eneo la maambukizi ya chini, mwombe daktari athibitishe aina (Plasmodium falciparum dhidi ya vivax — ya pili inaweza kujificha kwenye ini na kurudi). Daima beba rekodi ya dawa iliyotumika na lini — hii inamwongoza daktari ajaye ikiwa itatokea tena.',
        sw_mtaa: 'Baada ya matibabu ya pili kufaulu, rudi kwa ukaguzi baada ya wiki 1 na wiki 4. Kama umekuwa na vipindi viwili vya malaria ndani ya miezi michache katika eneo la maambukizi machache, mwombe daktari athibitishe aina (Plasmodium falciparum vs vivax — vivax inaweza kujificha kwenye ini na kurudi). Daima beba rekodi ya dawa iliyotumika na lini — inamwongoza daktari ajaye.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024')],
    },

    // ─── PREVENTION / PROPHYLAXIS ──────────────────────────────────────
    {
      id: 'malaria_prevention',
      severity: 'prevention',
      label: {
        en: 'Malaria prevention & prophylaxis',
        sw: 'Kuzuia malaria & prophylaxis',
      },
      presentation: {
        en: 'Prevention applies to everyone living in or visiting a malaria area. There are four pillars: insecticide-treated bed nets (LLINs) used every night, indoor residual spraying (IRS) on house walls, prompt treatment of every confirmed case (to reduce community transmission), and chemoprophylaxis for specific groups — pregnant women on IPTp-SP at every ANC visit from week 13, sickle cell patients on daily proguanil, and travellers from non-endemic areas on doxycycline or atovaquone-proguanil.',
        sw: 'Kinga inahusu kila mtu anayeishi au kutembelea eneo lenye malaria. Kuna nguzo nne: vyandarua vya kulala vyenye dawa ya kuua wadudu (LLINs) vinavyotumika kila usiku, kunyunyizia kuta za ndani ya nyumba dawa (IRS), matibabu ya haraka ya kila kesi iliyothibitishwa (kupunguza maambukizi ya jamii), na kemoprofilaksia kwa makundi maalum — wajawazito kwa IPTp-SP katika kila ziara ya ANC kuanzia wiki 13, wagonjwa wa sickle cell kwa proguanil kila siku, na wasafiri kutoka maeneo yasiyo na malaria kwa doxycycline au atovaquone-proguanil.',
        sw_mtaa: 'Kinga inahusu kila mtu anayeishi au kutembelea eneo lenye malaria. Nguzo nne: vyandarua vyenye dawa (LLINs) kila usiku, kunyunyiza dawa kwenye kuta za ndani ya nyumba (IRS), matibabu ya haraka ya kila kesi iliyothibitishwa (kupunguza maambukizi ya jamii), na kemoprofilaksia kwa makundi maalum — wajawazito kwa IPTp-SP kila ziara ya ANC tangu wiki 13, wagonjwa wa sickle cell kwa proguanil kila siku, na wasafiri kutoka maeneo yasiyo na malaria kwa doxycycline au atovaquone-proguanil.',
      },
      recognitionSigns: [
        {
          en: 'Pregnant from 13 weeks onwards — needs IPTp-SP at every ANC visit',
          sw: 'Mjamzito kuanzia wiki 13 — anahitaji IPTp-SP kwa kila ziara ya ANC',
          sw_mtaa: 'Mjamzito kuanzia wiki 13 — anahitaji IPTp-SP kwa kila ziara ya ANC',
        },
        {
          en: 'Sickle cell patient (homozygous SS) — daily proguanil reduces malaria crises',
          sw: 'Mgonjwa wa sickle cell (SS) — proguanil ya kila siku inapunguza mizozo ya malaria',
          sw_mtaa: 'Mgonjwa wa sickle cell (SS) — proguanil ya kila siku inapunguza mashambulizi ya malaria',
        },
        {
          en: 'Traveller from non-malaria country going to endemic area — must take prophylaxis starting before travel',
          sw: 'Msafiri kutoka nchi isiyo na malaria akielekea eneo lenye malaria — lazima atumie prophylaxis kabla ya safari',
          sw_mtaa: 'Msafiri kutoka nchi isiyo na malaria akielekea eneo lenye malaria — lazima atumie prophylaxis kabla ya safari',
        },
        {
          en: 'Children under 5 in seasonal transmission areas may qualify for seasonal malaria chemoprevention (SMC) — ask local NMCP',
          sw: 'Watoto chini ya miaka 5 katika maeneo ya maambukizi ya msimu wanaweza kustahili kemoprofilaksia ya msimu (SMC) — uliza NMCP ya hapo',
          sw_mtaa: 'Watoto chini ya miaka 5 katika maeneo ya maambukizi ya msimu wanaweza kustahili kemoprofilaksia ya msimu (SMC) — uliza NMCP ya hapo',
        },
      ],
      treatmentJourney: {
        en: 'For pregnancy IPTp-SP: sulfadoxine-pyrimethamine 3 tablets at each ANC visit from 13 weeks, minimum 3 doses, at least one month apart. Do not give in first trimester. For travellers: start before entering the malaria zone (atovaquone-proguanil 1 day before, doxycycline 1-2 days before, mefloquine 2-3 weeks before) and continue after leaving (atovaquone-proguanil 7 days, doxycycline 4 weeks). For sickle cell: proguanil 100mg daily lifelong, with folic acid 5mg daily. None of these is a guarantee — bed nets, repellents, and treating fevers promptly are still essential.',
        sw: 'Kwa IPTp-SP ya mimba: sulfadoxine-pyrimethamine vidonge 3 katika kila ziara ya ANC tangu wiki 13, angalau dose 3, zikitenganishwa kwa angalau mwezi mmoja. Usitoe katika trimester ya kwanza. Kwa wasafiri: anza kabla ya kuingia eneo la malaria (atovaquone-proguanil siku 1 kabla, doxycycline siku 1-2 kabla, mefloquine wiki 2-3 kabla) na endelea baada ya kuondoka (atovaquone-proguanil siku 7, doxycycline wiki 4). Kwa sickle cell: proguanil 100mg kila siku maishani, pamoja na folic acid 5mg kila siku. Hakuna ya hizi ni hakika — vyandarua, dawa za kufukuza mbu, na kutibu homa haraka bado ni muhimu.',
        sw_mtaa: 'IPTp-SP ya mimba: sulfadoxine-pyrimethamine vidonge 3 kila ziara ya ANC tangu wiki 13, angalau dose 3, zikitenganishwa angalau mwezi. Usitoe trimester ya kwanza. Wasafiri: anza kabla ya kuingia eneo la malaria (atovaquone-proguanil siku 1 kabla, doxycycline siku 1-2 kabla, mefloquine wiki 2-3 kabla) na endelea baada ya kuondoka. Sickle cell: proguanil 100mg kila siku maishani, na folic acid 5mg kila siku. Hakuna ya hizi ni kinga kamili — vyandarua, mosquito repellent, na kutibu homa haraka bado ni muhimu.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Fever in a prophylaxis user — no medicine prevents 100%. Get tested.',
            sw: 'Homa kwa mtumiaji wa prophylaxis — hakuna dawa inazuia 100%. Pima.',
            sw_mtaa: 'Homa kwa mtu anayetumia prophylaxis — hakuna dawa inazuia 100%. Pima.',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'For IPTp: every ANC visit; document doses. For travellers: continue post-travel as instructed; see a doctor if fever develops within 3 months of return (malaria can incubate that long). For sickle cell: yearly clinic review of prophylaxis adherence.',
        sw: 'Kwa IPTp: kila ziara ya ANC; rekodi dose. Kwa wasafiri: endelea baada ya safari kama ulivyoelekezwa; ona daktari kama homa inatokea ndani ya miezi 3 ya kurudi (malaria inaweza ku-incubate muda huo). Kwa sickle cell: ukaguzi wa kliniki kila mwaka wa ufuatiliaji wa prophylaxis.',
        sw_mtaa: 'Kwa IPTp: kila ziara ya ANC; rekodi dose. Wasafiri: endelea baada ya safari; ona daktari kama homa inatokea ndani ya miezi 3 ya kurudi (malaria inaweza ku-incubate muda huo). Sickle cell: ukaguzi wa kliniki kila mwaka.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('MOH_TZ_MATERNAL_2024')],
    },

    // ─── POST-MALARIA CONTINUITY ───────────────────────────────────────
    {
      id: 'malaria_continuity',
      severity: 'continuity',
      label: {
        en: 'Recovery & continuity after malaria',
        sw: 'Kupona & ufuatiliaji baada ya malaria',
      },
      presentation: {
        en: 'Recovery from malaria is not just about the fever ending. Common after-effects: anemia (sometimes lasting weeks to months — eat iron-rich foods, take iron tablets if prescribed, recheck haemoglobin at 1 and 4 weeks), persistent tiredness, low appetite, and rarely "post-malaria neurological syndrome" after cerebral malaria (irritability, tremor, behavior changes that usually resolve in days to weeks). Children may have growth or developmental setbacks after a severe episode — close follow-up matters.',
        sw: 'Kupona kutoka kwa malaria sio tu kuhusu homa kuisha. Athari za kawaida za baadaye: upungufu wa damu (wakati mwingine unadumu wiki hadi miezi — kula vyakula vyenye chuma, tumia vidonge vya chuma ikiwa umeagizwa, pima tena hemoglobini wiki 1 na 4), uchovu wa kudumu, hamu ya chakula chini, na nadra "post-malaria neurological syndrome" baada ya malaria ya ubongo (uhasira, kutetemeka, mabadiliko ya tabia ambayo kawaida hupotea ndani ya siku hadi wiki). Watoto wanaweza kuwa na vikwazo vya ukuaji au maendeleo baada ya tukio kali — ufuatiliaji wa karibu ni muhimu.',
        sw_mtaa: 'Kupona kutoka kwa malaria sio tu homa kuisha. Athari za baadaye za kawaida: damu kupungua (wakati mwingine inadumu wiki hadi miezi — kula vyakula vyenye chuma, tumia vidonge vya chuma ikiwa umeagizwa, pima tena damu wiki 1 na 4), uchovu wa muda mrefu, hamu ya chakula chini, na nadra "post-malaria neurological syndrome" baada ya malaria ya ubongo (uhasira, kutetemeka, mabadiliko ya tabia ambayo kawaida hupotea ndani ya siku hadi wiki). Watoto wanaweza kuwa na vikwazo vya ukuaji baada ya malaria kali — ufuatiliaji wa karibu ni muhimu.',
      },
      recognitionSigns: [
        {
          en: 'Pale palms, very tired, breathless on minimal effort after recovery — anemia',
          sw: 'Viganja weupe, uchovu mkubwa, kushindwa kupumua kwa juhudi ndogo baada ya kupona — upungufu wa damu',
          sw_mtaa: 'Viganja weupe, uchovu mkubwa, kushindwa kupumua kwa juhudi ndogo baada ya kupona — damu chini',
        },
        {
          en: 'A child not regaining appetite or playfulness 1 week after recovery',
          sw: 'Mtoto ambaye hapati tena hamu ya chakula au tabia ya kucheza baada ya wiki 1 ya kupona',
          sw_mtaa: 'Mtoto ambaye hapati hamu ya chakula au tabia ya kucheza baada ya wiki 1 ya kupona',
        },
        {
          en: 'Persistent confusion, behavior change, or tremor after cerebral malaria',
          sw: 'Kuchanganyikiwa kwa kudumu, mabadiliko ya tabia, au kutetemeka baada ya malaria ya ubongo',
          sw_mtaa: 'Kuchanganyikiwa kwa muda mrefu, mabadiliko ya tabia, au kutetemeka baada ya malaria ya ubongo',
        },
      ],
      treatmentJourney: {
        en: 'For anemia: iron supplementation if haemoglobin below normal, blood transfusion only if severe and symptomatic. Diet matters — beans, dark leafy vegetables, liver, fortified flour. For post-cerebral neurology: most resolve in 2-4 weeks; persistent deficits need referral to a neurologist. For children: nutrition support, growth monitoring, and another haemoglobin at 4 weeks. Ensure follow-up of any other conditions discovered during the malaria episode (HIV, sickle cell, anemia of other causes).',
        sw: 'Kwa upungufu wa damu: virutubisho vya chuma kama hemoglobini iko chini ya kawaida, kuongezewa damu tu kama ni kali na ina dalili. Chakula ni muhimu — maharage, mboga za majani za giza, ini, unga wenye virutubisho. Kwa post-cerebral neurology: nyingi hupotea ndani ya wiki 2-4; vikwazo vya kudumu vinahitaji rufaa kwa daktari wa neva. Kwa watoto: usaidizi wa lishe, ufuatiliaji wa ukuaji, na hemoglobini nyingine wiki 4. Hakikisha ufuatiliaji wa hali nyingine zilizogundulika wakati wa tukio la malaria (VVU, sickle cell, upungufu wa damu wa sababu nyingine).',
        sw_mtaa: 'Damu chini: virutubisho vya chuma kama hemoglobini iko chini, kuongezewa damu tu kama ni kali na ina dalili. Chakula ni muhimu — maharage, mboga za majani za giza, ini, unga wenye virutubisho. Post-cerebral neurology: nyingi hupotea ndani ya wiki 2-4; vikwazo vya kudumu vinahitaji rufaa kwa daktari wa neva. Watoto: lishe, ufuatiliaji wa ukuaji, na hemoglobini nyingine wiki 4. Hakikisha ufuatiliaji wa hali nyingine zilizogundulika wakati wa malaria (VVU, sickle cell, damu chini ya sababu nyingine).',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Worsening pallor, fast breathing, or fainting during recovery — severe anemia needs urgent transfusion',
            sw: 'Weupe unaozidi, kupumua haraka, au kuzimia wakati wa kupona — upungufu mkubwa wa damu unahitaji kuongezewa damu haraka',
            sw_mtaa: 'Weupe unaozidi, kupumua haraka, au kuzimia wakati wa kupona — damu chini sana inahitaji kuongezewa damu haraka',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'New fever within 4 weeks of cure — possible recrudescence or reinfection',
            sw: 'Homa mpya ndani ya wiki 4 baada ya kupona — uwezekano wa recrudescence au reinfection',
            sw_mtaa: 'Homa mpya ndani ya wiki 4 baada ya kupona — uwezekano wa recrudescence au reinfection',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Default schedule: 1 week and 4 weeks after a severe episode; 1 week after uncomplicated malaria in a child or pregnant woman. Bring previous prescriptions, lab results, and the bed-net status to every follow-up. Use the TibaHub vault to keep records — they will guide the next clinician.',
        sw: 'Ratiba ya msingi: wiki 1 na wiki 4 baada ya tukio kali; wiki 1 baada ya malaria ya kawaida kwa mtoto au mjamzito. Lete maagizo ya zamani, matokeo ya maabara, na hali ya chandarua kwa kila ufuatiliaji. Tumia vault ya TibaHub kuhifadhi rekodi — zitamwongoza daktari ajaye.',
        sw_mtaa: 'Ratiba ya msingi: wiki 1 na wiki 4 baada ya tukio kali; wiki 1 baada ya malaria ya kawaida kwa mtoto au mjamzito. Lete maagizo ya zamani, matokeo ya maabara, na hali ya chandarua kwa kila ufuatiliaji. Tumia vault ya TibaHub kuhifadhi rekodi — zitamwongoza daktari ajaye.',
      },
      sources: [src('NMCP_MALARIA_2024'), src('WHO_MALARIA_2024'), src('IMCI_2024')],
    },
  ],

  comorbidityNotes: [
    {
      coCondition: 'hiv',
      note: {
        en: 'People living with HIV have higher risk of severe malaria, especially with low CD4. They should continue their ART during malaria treatment — no need to stop. Some drug interactions exist (e.g. nevirapine with ALu) but ALu plus TLD (the standard ART in Tanzania) is fine. Tell every clinician about your HIV status so the right choices are made together.',
        sw: 'Watu wanaoishi na VVU wana hatari kubwa zaidi ya malaria kali, hasa wakiwa na CD4 ya chini. Wanapaswa kuendelea na ART wakati wa matibabu ya malaria — sio lazima kusimamisha. Kuna mwingiliano kati ya baadhi ya dawa (mfano nevirapine na ALu) lakini ALu pamoja na TLD (ART ya kawaida Tanzania) ni sawa. Mwambie kila daktari hali yako ya VVU ili maamuzi sahihi yafanywe pamoja.',
        sw_mtaa: 'Watu wanaoishi na VVU wana hatari kubwa zaidi ya malaria kali, hasa wakiwa na CD4 ya chini. Wanapaswa kuendelea na ART wakati wa matibabu ya malaria — sio lazima kusimamisha. Kuna mwingiliano kati ya baadhi ya dawa lakini ALu na TLD (ART ya kawaida Tanzania) ni sawa. Mwambie kila daktari una VVU ili maamuzi sahihi yafanywe pamoja.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Malaria can disrupt blood sugar control — fever and reduced eating can cause hypoglycemia, while infection stress can cause hyperglycemia. Check your blood sugar more often during malaria treatment. If on insulin or sulfonylureas, watch for low-sugar symptoms (shakiness, sweating, confusion). Drink fluids generously.',
        sw: 'Malaria inaweza kuvuruga udhibiti wa sukari ya damu — homa na kupungua kula vinaweza kusababisha sukari ya chini, wakati msongo wa maambukizi unaweza kusababisha sukari ya juu. Pima sukari yako mara nyingi zaidi wakati wa matibabu ya malaria. Kama uko kwenye insulin au sulfonylurea, angalia dalili za sukari ya chini (kutetemeka, kutoa jasho, kuchanganyikiwa). Kunywa majimaji kwa wingi.',
        sw_mtaa: 'Malaria inaweza kuvuruga udhibiti wa sukari — homa na kupungua kula vinaweza kusababisha sukari ya chini, wakati maambukizi yanaweza kusababisha sukari ya juu. Pima sukari mara nyingi zaidi wakati wa malaria. Kama uko kwenye insulin au sulfonylurea, angalia dalili za sukari ya chini (kutetemeka, jasho, kuchanganyikiwa). Kunywa maji mengi.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'Severe malaria can cause acute kidney injury on top of existing CKD. If you have known kidney disease, tell the clinician immediately — they will avoid certain drugs and check your kidney function more closely. ALu itself is okay in CKD; quinine doses may need adjustment.',
        sw: 'Malaria kali inaweza kusababisha kuumia kwa figo kwa haraka juu ya CKD iliyopo. Kama una ugonjwa wa figo ujulikanao, mwambie daktari mara moja — wataepuka baadhi ya dawa na kuangalia utendaji wa figo zako kwa makini zaidi. ALu yenyewe ni sawa katika CKD; dose za quinine huenda zikahitaji kurekebishwa.',
        sw_mtaa: 'Malaria kali inaweza kuumiza figo zilizo dhaifu tayari. Kama una ugonjwa wa figo, mwambie daktari mara moja — wataepuka baadhi ya dawa na kuangalia figo zako kwa makini zaidi. ALu yenyewe ni sawa katika CKD; dose za quinine huenda zikahitaji kurekebishwa.',
      },
    },
    {
      coCondition: 'tb',
      note: {
        en: 'TB and malaria can occur together, especially in HIV co-infection. Symptoms can overlap (fever, weight loss, fatigue) and either can be missed. Continue TB treatment during malaria — rifampicin in the TB regimen does not stop ALu from working. Watch out for hepatotoxicity, which both ALu and TB drugs can contribute to: nausea, yellow eyes, dark urine, right-upper-quadrant pain. If these appear, see a clinician within 24 hours. Anti-TB drugs are NOT a treatment for malaria — both diseases need their own specific treatments.',
        sw: 'TB na malaria zinaweza kutokea pamoja, hasa katika maambukizi pamoja na VVU. Dalili zinaweza kuingiliana (homa, kupungua uzito, uchovu) na yoyote inaweza kukosekana. Endelea matibabu ya TB wakati wa malaria — rifampicin katika regimen ya TB haisimamishi ALu kufanya kazi. Angalia hepatotoxicity, ambayo zote ALu na dawa za TB zinaweza kuchangia: kichefuchefu, macho ya njano, mkojo wa giza, maumivu ya tumbo upande wa kulia juu. Ikitokea, ona daktari ndani ya masaa 24. Dawa za TB SI tiba ya malaria — magonjwa yote yanahitaji matibabu yake maalum.',
        sw_mtaa: 'TB na malaria zinaweza kutokea pamoja, hasa kwa mwenye VVU. Dalili zinaweza kuingiliana (homa, kupungua uzito, uchovu) na yoyote inaweza kukosekana. Endelea matibabu ya TB wakati wa malaria — rifampicin haisimamishi ALu kufanya kazi. Angalia hepatotoxicity, ambayo ALu na dawa za TB zote zinaweza kuchangia: kichefuchefu, macho ya njano, mkojo wa giza, maumivu ya tumbo upande wa kulia juu. Ikitokea, ona daktari ndani ya masaa 24. Dawa za TB SIO tiba ya malaria — magonjwa yote yanahitaji matibabu yake maalum.',
      },
    },
    {
      coCondition: 'sickle_cell',
      note: {
        en: 'Sickle cell disease and malaria are a dangerous combination — malaria can trigger sickle cell crises (severe pain, organ injury) and aggravate the chronic anemia. Patients with sickle cell SS should take daily proguanil prophylaxis lifelong, sleep under a bed net every night, and seek care at the FIRST sign of fever — do not wait. During malaria, hydration is critical. Folic acid 5mg daily continues; iron is usually NOT given unless iron-deficient on testing. Tell every clinician about your sickle cell — some drugs are avoided.',
        sw: 'Ugonjwa wa sickle cell na malaria ni mchanganyiko wa hatari — malaria inaweza kuanzisha mizozo ya sickle cell (maumivu makali, uharibifu wa viungo) na kuzidisha upungufu wa damu wa kudumu. Wagonjwa wa sickle cell SS wanapaswa kutumia prophylaxis ya proguanil kila siku maishani, kulala chini ya chandarua kila usiku, na kutafuta huduma katika ishara ya KWANZA ya homa — usisubiri. Wakati wa malaria, maji ni muhimu sana. Folic acid 5mg kila siku inaendelea; chuma KAWAIDA hakitolewi isipokuwa una upungufu wa chuma kwa kipimo. Mwambie kila daktari kuhusu sickle cell yako — baadhi ya dawa huepukwa.',
        sw_mtaa: 'Sickle cell na malaria ni hatari kubwa pamoja — malaria inaweza kuanzisha mizozo ya sickle cell (maumivu makali, uharibifu wa viungo) na kuzidisha upungufu wa damu. Wagonjwa wa sickle cell SS wanapaswa kutumia proguanil prophylaxis kila siku maishani, kulala chini ya chandarua kila usiku, na kutafuta msaada katika ishara ya KWANZA ya homa — usisubiri. Wakati wa malaria, kunywa maji mengi ni muhimu sana. Folic acid 5mg kila siku inaendelea; chuma KAWAIDA hakitolewi isipokuwa kipimo kinaonyesha una upungufu wa chuma. Mwambie kila daktari una sickle cell — baadhi ya dawa zinapukwa.',
      },
    },
  ],

  sources: [
    src('NMCP_MALARIA_2024'),
    src('WHO_MALARIA_2024'),
    src('NTLG_STG_2023'),
    src('IMCI_2024'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.2.0',
  },
};
