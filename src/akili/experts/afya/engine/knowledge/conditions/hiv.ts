/**
 * HIV / AIDS — Full Condition Knowledge (100% all-in coverage)
 *
 * Sources: NACP National Guidelines for the Management of HIV and AIDS 2024,
 *          WHO Consolidated Guidelines on HIV 2024, NTLG STG 2023,
 *          Muhimbili Protocols, IMCI 2024 (pediatric HIV),
 *          MoH-TZ Maternal Guidelines 2024 (PMTCT).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in):
 *   • Newly diagnosed HIV — what the diagnosis means, starting ART
 *   • Established on ART (TLD) — adherence, U=U, life on treatment
 *   • Treatment failure — viral load monitoring, resistance, second-line
 *   • Advanced HIV disease (low CD4) — OI screening, package of care
 *   • Opportunistic infections — TB, cryptococcal meningitis, PCP, others
 *   • PMTCT — pregnancy, delivery, infant prophylaxis, breastfeeding
 *   • Pediatric HIV — infant diagnosis, weight-based ART, disclosure
 *   • Prevention — PrEP, PEP, condoms, partner testing
 *
 * Comorbidities: TB (cross-references Phase 4), diabetes, hypertension,
 * CKD, mental health, pregnancy.
 *
 * SCOPE: We educate patients on what HIV IS, what U=U means, why lifelong
 * adherence matters, how to navigate stigma, what monitoring to expect,
 * and how to protect partners and children. We do NOT diagnose HIV
 * (confirmed by NACP testing algorithm) and do NOT prescribe ART regimens
 * or doses — that is the CTC clinician's role.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { HIV_VARIANTS } from './hiv.variants';

export const HIV: ConditionKnowledge = {
  id: 'hiv',
  aliases: CONDITION_ALIASES.hiv,
  category: 'infectious',

  whatItIs: {
    en: 'HIV (Human Immunodeficiency Virus) is a virus that attacks the body\'s immune system — specifically the CD4 cells, the soldiers that coordinate the fight against infection. Untreated, HIV slowly destroys these cells over years, leaving the body unable to defend itself; that advanced stage is called AIDS. But here is the most important truth: HIV today is a manageable, long-term condition — not a death sentence. With antiretroviral therapy (ART) taken every day, the virus is suppressed to undetectable levels, the immune system recovers and stays strong, and a person with HIV can live a full, normal lifespan. ART does not cure HIV — the virus stays in the body — but it controls it completely, the way medicine controls diabetes or blood pressure.',
    sw: 'VVU (Virusi Vya Ukimwi) ni virusi vinavyoshambulia mfumo wa kinga ya mwili — hasa seli za CD4, askari wanaoratibu mapambano dhidi ya maambukizi. Bila matibabu, VVU huharibu polepole seli hizi kwa miaka, kuacha mwili usiweze kujikinga; hatua hiyo iliyokomaa inaitwa UKIMWI. Lakini hii ndio ukweli muhimu zaidi: VVU leo ni hali inayoweza kudhibitiwa, ya muda mrefu — sio hukumu ya kifo. Kwa tiba ya kupunguza makali ya virusi (ART) inayochukuliwa kila siku, virusi hudhibitiwa hadi viwango visivyoonekana, mfumo wa kinga hupona na kubaki imara, na mtu mwenye VVU anaweza kuishi maisha kamili, ya kawaida. ART haiponyi VVU — virusi hubaki mwilini — lakini huidhibiti kabisa, kama dawa inavyodhibiti kisukari au shinikizo la damu.',
    sw_mtaa: 'VVU (Virusi Vya Ukimwi) ni virusi vinavyoshambulia kinga ya mwili — hasa seli za CD4, askari wanaoongoza mapambano dhidi ya maambukizi. Bila matibabu, VVU inaharibu polepole seli hizi kwa miaka, inaacha mwili hauwezi kujikinga; hatua hiyo iliyokomaa inaitwa UKIMWI. Lakini hii ndio ukweli muhimu zaidi: VVU leo ni hali inayoweza kudhibitiwa, ya muda mrefu — sio hukumu ya kifo. Kwa dawa za ART zinazochukuliwa kila siku, virusi vinadhibitiwa hadi haviwezi kuonekana, kinga inapona na inabaki imara, na mtu mwenye VVU anaweza kuishi maisha kamili ya kawaida. ART haiponyi VVU — virusi vinabaki mwilini — lakini inavidhibiti kabisa, kama dawa inavyodhibiti kisukari au presha.',
  },

  whyItMatters: {
    en: 'About 1.5 million people live with HIV in Tanzania, and the country has made huge progress — most people on treatment now have undetectable virus. The danger is no longer the virus itself for those who know their status and take treatment. The real dangers today are: not knowing your status (late diagnosis, when the immune system is already damaged), stopping or interrupting ART (which lets the virus rebound and develop drug resistance), and stigma (which stops people testing, disclosing, and staying in care). Two facts change everything. First: U=U — Undetectable equals Untransmittable. A person with a consistently undetectable viral load cannot pass HIV to a sexual partner. Second: a mother with well-controlled HIV can have an HIV-negative baby. HIV care is not just personal survival — it protects partners, children, and breaks the chain of transmission.',
    sw: 'Karibu watu milioni 1.5 wanaishi na VVU Tanzania, na nchi imepiga hatua kubwa — watu wengi walio kwenye matibabu sasa wana virusi visivyoonekana. Hatari sio tena virusi vyenyewe kwa wale wanaojua hali yao na kuchukua matibabu. Hatari halisi leo ni: kutojua hali yako (utambuzi wa kuchelewa, wakati mfumo wa kinga tayari umeharibika), kusimamisha au kukatiza ART (ambayo huruhusu virusi kurudi na kuendeleza usugu wa dawa), na unyanyapaa (ambao huzuia watu kupima, kufichua, na kubaki kwenye huduma). Mambo mawili hubadilisha kila kitu. Kwanza: U=U — Visivyoonekana ni Visivyoambukiza. Mtu mwenye viral load isiyoonekana mara kwa mara hawezi kupitisha VVU kwa mwenza wa kingono. Pili: mama mwenye VVU iliyodhibitiwa vizuri anaweza kupata mtoto asiye na VVU. Huduma ya VVU sio tu kuishi kwako binafsi — inalinda wenza, watoto, na huvunja mnyororo wa maambukizi.',
    sw_mtaa: 'Karibu watu milioni 1.5 wanaishi na VVU Tanzania, na nchi imepiga hatua kubwa — watu wengi walio kwenye matibabu sasa wana virusi visivyoonekana. Hatari sio tena virusi vyenyewe kwa wanaojua hali yao na kuchukua matibabu. Hatari halisi leo ni: kutojua hali yako (kuchelewa kugundulika, wakati kinga tayari imeharibika), kusimamisha au kukatiza ART (inaruhusu virusi kurudi na kuwa sugu kwa dawa), na unyanyapaa (unaowazuia watu kupima, kufichua, na kubaki kwenye huduma). Mambo mawili yanabadilisha kila kitu. Kwanza: U=U — Havionekani ni Haviambukizi. Mtu mwenye viral load isiyoonekana mara kwa mara hawezi kupitisha VVU kwa mwenza wa kingono. Pili: mama mwenye VVU iliyodhibitiwa vizuri anaweza kupata mtoto asiye na VVU. Huduma ya VVU sio tu kuishi kwako — inalinda wenza, watoto, na inavunja mnyororo wa maambukizi.',
  },

  commonQuestions: [
    {
      q: {
        en: 'I just tested positive for HIV — what does this mean for my life?',
        sw: 'Nimepima nikakuta nina VVU — hii inamaanisha nini kwa maisha yangu?',
      },
      a: {
        en: 'It means you have a long-term condition that is now very treatable — it does not mean your life is over. Take a breath. Today, a person who starts ART early and takes it consistently can expect a near-normal lifespan. The single most important step is to start ART and stay on it for life. You will be linked to a CTC (Care and Treatment Clinic), have a baseline check (CD4, viral load, screening for TB and other infections), and usually start treatment quickly — often the same day or within a week. The diagnosis feels heavy now, but thousands of Tanzanians live full lives — working, marrying, raising HIV-negative children — because they took this one step. You are not alone, and this is manageable.',
        sw: 'Inamaanisha una hali ya muda mrefu ambayo sasa inatibika sana — haimaanishi maisha yako yameisha. Pumua. Leo, mtu anayeanza ART mapema na kuichukua mara kwa mara anaweza kutarajia maisha karibu ya kawaida. Hatua moja muhimu zaidi ni kuanza ART na kubaki nayo maisha yote. Utaunganishwa na CTC (Kliniki ya Huduma na Matibabu), utafanya ukaguzi wa msingi (CD4, viral load, uchunguzi wa TB na maambukizi mengine), na kawaida utaanza matibabu haraka — mara nyingi siku ile ile au ndani ya wiki. Utambuzi unaonekana mzito sasa, lakini maelfu ya Watanzania wanaishi maisha kamili — wakifanya kazi, wakioa, wakilea watoto wasio na VVU — kwa sababu walichukua hatua hii moja. Hauko peke yako, na hii inaweza kudhibitiwa.',
        sw_mtaa: 'Inamaanisha una hali ya muda mrefu ambayo sasa inatibika sana — haimaanishi maisha yako yameisha. Pumua. Leo, mtu anayeanza ART mapema na kuichukua mara kwa mara anaweza kutarajia maisha karibu ya kawaida. Hatua moja muhimu zaidi ni kuanza ART na kubaki nayo maisha yote. Utaunganishwa na CTC (Care and Treatment Clinic), utafanya baseline check (CD4, viral load, uchunguzi wa TB na maambukizi mengine), na kawaida utaanza matibabu haraka — mara nyingi siku ile ile au ndani ya wiki. Diagnosis inaonekana nzito sasa, lakini maelfu ya Watanzania wanaishi maisha kamili — wanafanya kazi, wanaoa, wanalea watoto wasio na VVU — kwa sababu walichukua hatua hii moja. Hauko peke yako, na hii inaweza kudhibitiwa.',
      },
    },
    {
      q: {
        en: 'What is U=U? Can I really not pass HIV to my partner?',
        sw: 'U=U ni nini? Kweli siwezi kupitisha VVU kwa mwenza wangu?',
      },
      a: {
        en: 'U=U means Undetectable = Untransmittable. When you take ART consistently and your viral load becomes — and stays — undetectable (usually after about 6 months of good adherence), the amount of virus in your body is so low that you cannot pass HIV to a sexual partner. This is backed by large international studies. It is one of the most powerful reasons to take your ART every single day: you protect yourself AND your partner. Two important conditions: the viral load must be confirmed undetectable by a test (not assumed), and adherence must stay consistent — if you stop ART, the virus rebounds within weeks and U=U no longer applies. U=U is about sexual transmission; condoms still also protect against other sexually transmitted infections and pregnancy.',
        sw: 'U=U inamaanisha Visivyoonekana = Visivyoambukiza. Unapochukua ART mara kwa mara na viral load yako inakuwa — na kubaki — isiyoonekana (kawaida baada ya miezi 6 ya kuzingatia vizuri), kiasi cha virusi mwilini mwako ni kidogo sana kiasi kwamba huwezi kupitisha VVU kwa mwenza wa kingono. Hii inaungwa mkono na tafiti kubwa za kimataifa. Ni mojawapo ya sababu zenye nguvu zaidi za kuchukua ART yako kila siku: unajilinda WEWE NA mwenza wako. Masharti mawili muhimu: viral load lazima ithibitishwe kuwa haionekani kwa kipimo (sio kudhani), na kuzingatia lazima kubaki kwa mfululizo — ukisimamisha ART, virusi vinarudi ndani ya wiki na U=U haitumiki tena. U=U inahusu maambukizi ya kingono; kondomu bado pia hulinda dhidi ya maambukizi mengine ya zinaa na mimba.',
        sw_mtaa: 'U=U inamaanisha Havionekani = Haviambukizi. Unapochukua ART mara kwa mara na viral load yako inakuwa — na inabaki — haionekani (kawaida baada ya miezi 6 ya kuzingatia vizuri), kiasi cha virusi mwilini ni kidogo sana kiasi huwezi kupitisha VVU kwa mwenza wa kingono. Hii inaungwa mkono na tafiti kubwa za kimataifa. Ni mojawapo ya sababu zenye nguvu zaidi za kuchukua ART kila siku: unajilinda WEWE NA mwenza wako. Masharti mawili muhimu: viral load lazima ithibitishwe kuwa haionekani kwa kipimo (sio kudhani tu), na kuzingatia lazima kubaki mfululizo — ukisimamisha ART, virusi vinarudi ndani ya wiki na U=U haitumiki tena. U=U inahusu maambukizi ya kingono; kondomu bado zinalinda dhidi ya magonjwa mengine ya zinaa na mimba.',
      },
    },
    {
      q: {
        en: 'Do I have to take ART forever? What if I feel completely fine?',
        sw: 'Lazima nichukue ART milele? Vipi kama najisikia mzima kabisa?',
      },
      a: {
        en: 'Yes — ART is for life, and feeling fine is exactly the goal, not a reason to stop. ART does not remove the virus from your body; it keeps it suppressed. The moment you stop, the virus starts multiplying again within days to weeks — your viral load rises, your CD4 falls, and you become infectious again. Worse, stopping and restarting repeatedly teaches the virus to resist your drugs, which can force a switch to harder second-line treatment. Think of it like blood pressure medicine: a person with controlled hypertension feels fine because of the medicine, not instead of it. Modern ART (TLD) is one pill, once a day, with few side effects. The "feeling fine" you have is ART working — protect it by never missing doses.',
        sw: 'Ndio — ART ni ya maisha, na kujisikia mzima ndio lengo hasa, sio sababu ya kusimama. ART haiondoi virusi mwilini mwako; huviweka chini. Wakati unaposimama, virusi huanza kuongezeka tena ndani ya siku hadi wiki — viral load yako inapanda, CD4 yako inashuka, na unakuwa unaambukiza tena. Mbaya zaidi, kusimama na kuanza tena mara kwa mara hufundisha virusi kupinga dawa zako, ambayo inaweza kulazimisha kubadili kwa matibabu magumu ya mstari wa pili. Fikiria kama dawa ya shinikizo la damu: mtu mwenye shinikizo lililodhibitiwa anajisikia mzima KWA SABABU YA dawa, sio BADALA YAKE. ART ya kisasa (TLD) ni kidonge kimoja, mara moja kwa siku, na athari chache. "Kujisikia mzima" ulionao ni ART inafanya kazi — ilinde kwa kutokosa dose kamwe.',
        sw_mtaa: 'Ndio — ART ni ya maisha, na kujisikia mzima ndio lengo hasa, sio sababu ya kusimama. ART haiondoi virusi mwilini; inaviweka chini. Wakati unaposimama, virusi vinaanza kuongezeka tena ndani ya siku hadi wiki — viral load inapanda, CD4 inashuka, na unaambukiza tena. Mbaya zaidi, kusimama na kuanza tena mara kwa mara kunafundisha virusi kupinga dawa zako, kunaweza kukulazimisha kubadili kwa second-line treatment ngumu. Fikiria kama dawa ya presha: mtu mwenye presha iliyodhibitiwa anajisikia mzima KWA SABABU YA dawa, sio BADALA YAKE. ART ya kisasa (TLD) ni kidonge kimoja, mara moja kwa siku, athari chache. "Kujisikia mzima" ulionao ni ART inafanya kazi — ilinde kwa kutokosa dose kamwe.',
      },
    },
    {
      q: {
        en: 'I missed some doses of my ART — what should I do?',
        sw: 'Nimekosa dose kadhaa za ART yangu — nifanye nini?',
      },
      a: {
        en: 'First: do not panic, and do not stop. If you remember a missed dose and your next dose is many hours away, take it now. If the next dose is very close, skip the missed one and continue normally — never double up. Then tell your CTC clinician honestly at your next visit how many doses you missed and why. Missing occasional doses is common and recoverable; what matters is getting back on track quickly and finding out WHY it happened — running out of pills, side effects, travel, depression, stigma at home — so the problem can be solved. If you missed many doses over weeks, your clinician may check your viral load to make sure the virus has not rebounded or developed resistance. Adherence counsellors and treatment-supporter programmes exist for exactly this. Honesty with your clinician is not judged — it is what keeps your treatment working.',
        sw: 'Kwanza: usiogope, na usisimame. Ukikumbuka dose uliyokosa na dose yako inayofuata iko masaa mengi mbele, ichukue sasa. Ikiwa dose inayofuata iko karibu sana, ruka ile uliyokosa na uendelee kawaida — kamwe usichukue mara mbili. Kisha mwambie daktari wako wa CTC kwa uaminifu katika ziara inayofuata ulikosa dose ngapi na kwa nini. Kukosa dose mara kwa mara ni jambo la kawaida na linarekebishika; kinachojali ni kurudi kwenye mstari haraka na kujua KWA NINI ilitokea — kuishiwa na vidonge, athari, safari, huzuni, unyanyapaa nyumbani — ili tatizo lisuluhishwe. Ukikosa dose nyingi kwa wiki, daktari wako anaweza kuangalia viral load yako kuhakikisha virusi havijarudi au kuendeleza usugu. Washauri wa kuzingatia na programu za wasaidizi wa matibabu zipo kwa ajili ya hili hasa. Uaminifu kwa daktari wako hauhukumiwi — ndio unaofanya matibabu yako yaendelee kufanya kazi.',
        sw_mtaa: 'Kwanza: usiogope, na usisimame. Ukikumbuka dose uliyokosa na next dose iko masaa mengi mbele, ichukue sasa. Ikiwa next dose iko karibu sana, ruka ile uliyokosa na uendelee kawaida — kamwe usichukue mara mbili. Kisha mwambie daktari wako wa CTC kwa uaminifu next visit ulikosa dose ngapi na kwa nini. Kukosa dose mara kwa mara ni kawaida na linarekebishika; kinachojali ni kurudi kwenye mstari haraka na kujua KWA NINI ilitokea — kuishiwa vidonge, athari, safari, huzuni, stigma nyumbani — ili tatizo lisuluhishwe. Ukikosa dose nyingi kwa wiki, daktari anaweza kuangalia viral load yako kuhakikisha virusi havijarudi au kuwa sugu. Adherence counsellors na treatment-supporter programs zipo kwa ajili ya hili hasa. Uaminifu kwa daktari hauhukumiwi — ndio unaofanya matibabu yako yaendelee kufanya kazi.',
      },
    },
    {
      q: {
        en: 'Should I tell anyone I have HIV? I am afraid of stigma.',
        sw: 'Niwaambie watu nina VVU? Naogopa unyanyapaa.',
      },
      a: {
        en: 'Disclosure is your choice, your timing, and your right — there is no rule that you must tell everyone. But thoughtful disclosure to the right people genuinely helps. Telling a trusted person — a partner, close family member, or friend — gives you someone to lean on, remind you about appointments, and support adherence; people with a treatment supporter do better. Telling a current sexual partner matters both ethically and practically: they can test, access PrEP, and you can plan safe conception together. You do NOT have to tell employers, neighbours, or extended family if you do not want to. Stigma is real and painful, but it is fading as understanding grows — and U=U is a powerful message: a person on effective treatment cannot transmit HIV. Your CTC has counsellors who can help you plan disclosure, practise difficult conversations, and even support disclosure to a partner if you wish. Take it at your own pace.',
        sw: 'Kufichua ni chaguo lako, wakati wako, na haki yako — hakuna sheria kwamba lazima uwaambie kila mtu. Lakini kufichua kwa busara kwa watu sahihi husaidia kweli. Kumwambia mtu unayemwamini — mwenza, mwanafamilia wa karibu, au rafiki — kunakupa mtu wa kutegemea, kukukumbusha kuhusu miadi, na kusaidia kuzingatia; watu wenye msaidizi wa matibabu hufanya vizuri zaidi. Kumwambia mwenza wa kingono wa sasa ni muhimu kimaadili na kivitendo: wanaweza kupima, kupata PrEP, na mnaweza kupanga mimba salama pamoja. HUNA lazima kuwaambia waajiri, majirani, au familia kubwa ikiwa hutaki. Unyanyapaa ni wa kweli na unaumiza, lakini unapungua kadri uelewa unavyokua — na U=U ni ujumbe wenye nguvu: mtu aliye kwenye matibabu yenye ufanisi hawezi kupitisha VVU. CTC yako ina washauri wanaoweza kukusaidia kupanga kufichua, kufanya mazoezi ya mazungumzo magumu, na hata kusaidia kufichua kwa mwenza ukitaka. Ichukue kwa kasi yako mwenyewe.',
        sw_mtaa: 'Kufichua ni chaguo lako, wakati wako, na haki yako — hakuna sheria kwamba lazima uwaambie kila mtu. Lakini kufichua kwa busara kwa watu sahihi kunasaidia kweli. Kumwambia mtu unayemwamini — mwenza, mwanafamilia wa karibu, au rafiki — kunakupa mtu wa kutegemea, kukukumbusha miadi, na kusaidia kuzingatia; watu wenye treatment supporter wanafanya vizuri zaidi. Kumwambia mwenza wa kingono wa sasa ni muhimu kimaadili na kivitendo: wanaweza kupima, kupata PrEP, na mnaweza kupanga mimba salama pamoja. HUNA lazima kuwaambia waajiri, majirani, au familia kubwa kama hutaki. Stigma ni ya kweli na inaumiza, lakini inapungua kadri uelewa unavyokua — na U=U ni ujumbe wenye nguvu: mtu aliye kwenye matibabu yenye ufanisi hawezi kupitisha VVU. CTC yako ina counsellors wanaoweza kukusaidia kupanga kufichua, kufanya mazoezi ya mazungumzo magumu, na hata kusaidia kufichua kwa mwenza ukitaka. Ichukue kwa kasi yako mwenyewe.',
      },
    },
    {
      q: {
        en: 'I am pregnant and HIV positive — will my baby have HIV?',
        sw: 'Nina mimba na nina VVU — mtoto wangu atakuwa na VVU?',
      },
      a: {
        en: 'Most likely NOT — if you engage with PMTCT care. With a mother on effective ART and an undetectable viral load, the risk of passing HIV to the baby drops to less than 1-2%. This is one of the great successes of modern HIV care. The PMTCT package: start or continue ART immediately and take it every day through pregnancy, delivery, and breastfeeding; deliver at a health facility; the baby receives preventive ARV medicine (usually nevirapine, sometimes with zidovudine) for several weeks after birth; the baby is tested for HIV at intervals (first test around 4-6 weeks, with later confirmatory tests). Breastfeeding IS recommended in Tanzania when the mother is on ART with good adherence — exclusive breastfeeding for 6 months, because mixed feeding raises transmission risk. Untreated HIV in pregnancy carries a much higher transmission risk — so the most protective thing you can do for your baby is take your ART consistently and attend every ANC and PMTCT visit.',
        sw: 'Uwezekano mkubwa HAPANA — ikiwa unashiriki katika huduma ya PMTCT. Kwa mama aliye kwenye ART yenye ufanisi na viral load isiyoonekana, hatari ya kupitisha VVU kwa mtoto inashuka hadi chini ya 1-2%. Huu ni mojawapo ya mafanikio makubwa ya huduma ya kisasa ya VVU. Pakti ya PMTCT: anza au endelea na ART mara moja na uichukue kila siku katika mimba, kujifungua, na kunyonyesha; jifungue katika kituo cha afya; mtoto hupokea dawa ya ARV ya kuzuia (kawaida nevirapine, wakati mwingine pamoja na zidovudine) kwa wiki kadhaa baada ya kuzaliwa; mtoto hupimwa VVU kwa vipindi (kipimo cha kwanza karibu wiki 4-6, na vipimo vya uthibitisho baadaye). Kunyonyesha KUNASHAURIWA Tanzania wakati mama yuko kwenye ART na anazingatia vizuri — kunyonyesha kwa maziwa ya mama pekee kwa miezi 6, kwa sababu kuchanganya chakula huongeza hatari ya maambukizi. VVU isiyotibiwa katika mimba ina hatari kubwa zaidi ya maambukizi — hivyo jambo la kulinda zaidi unaloweza kufanya kwa mtoto wako ni kuchukua ART yako mara kwa mara na kuhudhuria kila ziara ya ANC na PMTCT.',
        sw_mtaa: 'Uwezekano mkubwa HAPANA — ikiwa unashiriki katika huduma ya PMTCT. Kwa mama aliye kwenye ART yenye ufanisi na viral load isiyoonekana, hatari ya kupitisha VVU kwa mtoto inashuka hadi chini ya 1-2%. Huu ni mojawapo ya mafanikio makubwa ya huduma ya kisasa ya VVU. PMTCT package: anza au endelea na ART mara moja na uichukue kila siku katika mimba, kujifungua, na kunyonyesha; jifungue kituo cha afya; mtoto anapokea dawa ya ARV ya kuzuia (kawaida nevirapine, wakati mwingine na zidovudine) kwa wiki kadhaa baada ya kuzaliwa; mtoto anapimwa VVU kwa vipindi (kipimo cha kwanza karibu wiki 4-6, na vipimo vya uthibitisho baadaye). Kunyonyesha KUNASHAURIWA Tanzania wakati mama yuko kwenye ART na anazingatia vizuri — kunyonyesha kwa maziwa ya mama pekee miezi 6, kwa sababu kuchanganya chakula kunaongeza hatari ya maambukizi. Untreated HIV katika mimba ina hatari kubwa zaidi ya maambukizi — hivyo jambo la kulinda zaidi unaloweza kufanya kwa mtoto ni kuchukua ART mara kwa mara na kuhudhuria kila ziara ya ANC na PMTCT.',
      },
    },
    {
      q: {
        en: 'What do my CD4 count and viral load actually tell me?',
        sw: 'CD4 count na viral load yangu zinaniambia nini hasa?',
      },
      a: {
        en: 'They answer two different questions. Viral load measures how much HIV is in your blood — it tells you whether your ART is working. The goal is "undetectable" (usually below 50 copies/mL, sometimes reported below 1000). An undetectable viral load means the treatment is controlling the virus well and you cannot transmit HIV sexually (U=U). CD4 count measures how strong your immune system is — how many soldier cells you have. A normal CD4 is roughly 500-1500. A low CD4 (especially below 200) means the immune system is weakened and you are more vulnerable to opportunistic infections. When you start ART, the aim is for viral load to become undetectable (showing the drug works) and CD4 to slowly rise over months and years (showing the immune system is recovering). In modern care, viral load is the main routine monitoring test; CD4 matters most at diagnosis and when someone is unwell. Bring both results to every clinic visit.',
        sw: 'Zinajibu maswali mawili tofauti. Viral load hupima kiasi cha VVU kilicho katika damu yako — inakuambia kama ART yako inafanya kazi. Lengo ni "isiyoonekana" (kawaida chini ya copies 50/mL, wakati mwingine huripotiwa chini ya 1000). Viral load isiyoonekana inamaanisha matibabu yanadhibiti virusi vizuri na huwezi kupitisha VVU kingono (U=U). CD4 count hupima jinsi mfumo wako wa kinga ulivyo imara — una seli askari ngapi. CD4 ya kawaida ni takriban 500-1500. CD4 ya chini (hasa chini ya 200) inamaanisha mfumo wa kinga umedhoofika na uko hatarini zaidi kwa maambukizi nyemelezi. Unapoanza ART, lengo ni viral load iwe isiyoonekana (kuonyesha dawa inafanya kazi) na CD4 ipande polepole kwa miezi na miaka (kuonyesha mfumo wa kinga unapona). Katika huduma ya kisasa, viral load ni kipimo kikuu cha ufuatiliaji wa kawaida; CD4 inajali zaidi wakati wa utambuzi na wakati mtu si mzima. Lete matokeo yote mawili katika kila ziara ya kliniki.',
        sw_mtaa: 'Zinajibu maswali mawili tofauti. Viral load inapima kiasi cha VVU kilicho katika damu yako — inakuambia kama ART yako inafanya kazi. Lengo ni "haionekani" (kawaida chini ya copies 50/mL, wakati mwingine inaripotiwa chini ya 1000). Viral load isiyoonekana inamaanisha matibabu yanadhibiti virusi vizuri na huwezi kupitisha VVU kingono (U=U). CD4 count inapima jinsi kinga yako ilivyo imara — una seli askari ngapi. CD4 ya kawaida ni takriban 500-1500. CD4 ya chini (hasa chini ya 200) inamaanisha kinga imedhoofika na uko hatarini zaidi kwa maambukizi nyemelezi. Unapoanza ART, lengo ni viral load iwe haionekani (kuonyesha dawa inafanya kazi) na CD4 ipande polepole kwa miezi na miaka (kuonyesha kinga inapona). Katika huduma ya kisasa, viral load ni kipimo kikuu cha ufuatiliaji wa kawaida; CD4 inajali zaidi wakati wa utambuzi na wakati mtu si mzima. Lete matokeo yote mawili kila ziara ya kliniki.',
      },
    },
    {
      q: {
        en: 'My viral load came back detectable — does this mean my treatment failed?',
        sw: 'Viral load yangu imerudi inaonekana — inamaanisha matibabu yangu yameshindwa?',
      },
      a: {
        en: 'Not necessarily — one detectable result is a signal to investigate, not an automatic verdict. The most common reason a viral load becomes detectable is missed doses, not drug resistance. Your CTC will usually do three things: first, intensive adherence counselling to find and fix whatever is interfering with daily dosing; second, a repeat viral load test after about 3 months of supported adherence; third, only if the repeat is still high, consider drug resistance and a possible switch to a second-line regimen. So a single detectable result often means "we need to support your adherence better," not "the drugs no longer work." Be honest with your clinician about missed doses, side effects, or life problems — that honesty is what gets you back to undetectable. While viral load is detectable, you may be infectious again, so use condoms until it is suppressed once more.',
        sw: 'Sio lazima — matokeo moja yanayoonekana ni ishara ya kuchunguza, sio hukumu ya moja kwa moja. Sababu ya kawaida zaidi viral load kuonekana ni dose zilizokoswa, sio usugu wa dawa. CTC yako kawaida hufanya mambo matatu: kwanza, ushauri mkubwa wa kuzingatia kupata na kurekebisha chochote kinachoingilia dose ya kila siku; pili, kipimo cha viral load kinachorudiwa baada ya miezi 3 ya kuzingatia kunakoungwa mkono; tatu, ikiwa tu kinachorudiwa bado kiko juu, fikiria usugu wa dawa na uwezekano wa kubadili kwa regimen ya mstari wa pili. Hivyo matokeo moja yanayoonekana mara nyingi yanamaanisha "tunahitaji kusaidia kuzingatia kwako vizuri zaidi," sio "dawa hazifanyi kazi tena." Kuwa mkweli kwa daktari wako kuhusu dose zilizokoswa, athari, au matatizo ya maisha — uaminifu huo ndio unaokurudisha kwenye kutokuonekana. Wakati viral load inaonekana, unaweza kuwa unaambukiza tena, hivyo tumia kondomu hadi idhibitiwe tena.',
        sw_mtaa: 'Sio lazima — matokeo moja yanayoonekana ni ishara ya kuchunguza, sio hukumu ya moja kwa moja. Sababu ya kawaida zaidi viral load kuonekana ni dose zilizokoswa, sio drug resistance. CTC yako kawaida inafanya mambo matatu: kwanza, adherence counselling kubwa kupata na kurekebisha chochote kinachoingilia dose ya kila siku; pili, viral load test inayorudiwa baada ya miezi 3 ya kuzingatia kunakoungwa mkono; tatu, ikiwa tu inayorudiwa bado iko juu, fikiria drug resistance na uwezekano wa kubadili kwa second-line regimen. Hivyo matokeo moja yanayoonekana mara nyingi yanamaanisha "tunahitaji kusaidia adherence yako vizuri zaidi," sio "dawa hazifanyi kazi tena." Kuwa mkweli kwa daktari kuhusu missed doses, athari, au matatizo ya maisha — uaminifu huo ndio unaokurudisha kwenye undetectable. Wakati viral load inaonekana, unaweza kuwa unaambukiza tena, hivyo tumia kondomu hadi idhibitiwe tena.',
      },
    },
    {
      q: {
        en: 'I have HIV and a cough that will not go away — should I worry about TB?',
        sw: 'Nina VVU na kikohozi kisichoisha — niwe na wasiwasi kuhusu TB?',
      },
      a: {
        en: 'Yes — take this seriously and get tested for TB now. TB is the leading cause of serious illness and death among people living with HIV, and HIV increases TB risk many times over. Any cough lasting more than 2 weeks — especially with night sweats, weight loss, fever, or loss of appetite — must be investigated. The test is a sputum sample for GeneXpert MTB/RIF, which can detect TB and rifampicin resistance in about 2 hours. In advanced HIV (low CD4), TB can be harder to find — it may be smear-negative or entirely outside the lungs — so your clinician may use extra tests like urine LF-LAM. The good news: TB-HIV co-infection is treatable when both diseases are managed together. TB treatment comes first, then ART is started or continued within 2-8 weeks, with an important dose adjustment (dolutegravir is taken twice daily while on the TB drug rifampicin). Never stop your ART because of TB. Go to your CTC or DOT centre — do not wait.',
        sw: 'Ndio — chukua hili kwa uzito na upime TB sasa. TB ni sababu kuu ya ugonjwa mkubwa na vifo miongoni mwa watu wanaoishi na VVU, na VVU huongeza hatari ya TB mara nyingi. Kikohozi chochote kinachodumu zaidi ya wiki 2 — hasa pamoja na jasho la usiku, kupungua uzito, homa, au kupoteza hamu ya kula — lazima kichunguzwe. Kipimo ni sampuli ya makohozi kwa GeneXpert MTB/RIF, ambayo inaweza kugundua TB na usugu wa rifampicin ndani ya masaa 2. Katika VVU iliyokomaa (CD4 ya chini), TB inaweza kuwa ngumu kupatikana — inaweza kuwa smear-negative au kabisa nje ya mapafu — hivyo daktari wako anaweza kutumia vipimo vya ziada kama urine LF-LAM. Habari njema: maambukizi ya pamoja ya TB-VVU yanatibika wakati magonjwa yote yanasimamiwa pamoja. Matibabu ya TB huja kwanza, kisha ART huanzishwa au kuendelea ndani ya wiki 2-8, na marekebisho muhimu ya dose (dolutegravir huchukuliwa mara mbili kwa siku ukiwa kwenye dawa ya TB rifampicin). Kamwe usisimamishe ART yako kwa sababu ya TB. Nenda CTC au kituo cha DOT — usisubiri.',
        sw_mtaa: 'Ndio — chukua hili kwa uzito na upime TB sasa. TB ni sababu kuu ya ugonjwa mkubwa na vifo miongoni mwa watu wanaoishi na VVU, na VVU inaongeza hatari ya TB mara nyingi. Kikohozi chochote kinachodumu zaidi ya wiki 2 — hasa pamoja na jasho la usiku, kupungua uzito, homa, au kupoteza hamu ya kula — lazima kichunguzwe. Kipimo ni sampuli ya makohozi kwa GeneXpert MTB/RIF, ambayo inaweza kugundua TB na rifampicin resistance ndani ya masaa 2. Katika advanced HIV (CD4 ya chini), TB inaweza kuwa ngumu kupatikana — inaweza kuwa smear-negative au kabisa nje ya mapafu — hivyo daktari anaweza kutumia vipimo vya ziada kama urine LF-LAM. Habari njema: TB-HIV co-infection inatibika wakati magonjwa yote yanasimamiwa pamoja. Matibabu ya TB yanakuja kwanza, kisha ART inaanzishwa au inaendelea ndani ya wiki 2-8, na marekebisho muhimu ya dose (dolutegravir inachukuliwa mara mbili kwa siku ukiwa kwenye dawa ya TB rifampicin). Kamwe usisimamishe ART kwa sababu ya TB. Nenda CTC au DOT centre — usisubiri.',
      },
    },
    {
      q: {
        en: 'What is co-trimoxazole (Septrin) and why was I given it?',
        sw: 'Co-trimoxazole (Septrin) ni nini na kwa nini nimepewa?',
      },
      a: {
        en: 'Co-trimoxazole — often called Septrin or CPT (co-trimoxazole preventive therapy) — is a low-cost daily tablet that prevents several dangerous infections while your immune system is recovering. It guards against PCP (a serious pneumonia), toxoplasmosis (a brain infection), some bacterial infections, and helps against malaria. It is usually started at HIV diagnosis, especially when CD4 is low or when someone has active TB, and is taken every day. As your CD4 recovers well on ART and stays high, your clinician may eventually decide it can be stopped — but only on their advice, never on your own. The most common side effects are mild (nausea, rash); a severe rash or signs of an allergic reaction should be reported promptly. It does not replace ART — it works alongside it as a protective shield during the vulnerable early period.',
        sw: 'Co-trimoxazole — mara nyingi huitwa Septrin au CPT (tiba ya kuzuia ya co-trimoxazole) — ni kidonge cha bei nafuu cha kila siku kinachozuia maambukizi kadhaa hatari wakati mfumo wako wa kinga unapona. Hulinda dhidi ya PCP (nimonia kali), toxoplasmosis (maambukizi ya ubongo), baadhi ya maambukizi ya bakteria, na husaidia dhidi ya malaria. Kawaida huanzishwa wakati wa utambuzi wa VVU, hasa wakati CD4 iko chini au wakati mtu ana TB hai, na huchukuliwa kila siku. Kadri CD4 yako inavyopona vizuri kwenye ART na kubaki juu, daktari wako anaweza hatimaye kuamua inaweza kusimamishwa — lakini kwa ushauri wao tu, kamwe sio peke yako. Athari za kawaida zaidi ni ndogo (kichefuchefu, vipele); vipele vikali au ishara za athari ya mzio zinapaswa kuripotiwa haraka. Hairudishi ART — hufanya kazi pamoja nayo kama ngao ya kulinda katika kipindi cha mapema cha hatari.',
        sw_mtaa: 'Co-trimoxazole — mara nyingi inaitwa Septrin au CPT (co-trimoxazole preventive therapy) — ni kidonge cha bei nafuu cha kila siku kinachozuia maambukizi kadhaa hatari wakati kinga yako inapona. Inalinda dhidi ya PCP (nimonia kali), toxoplasmosis (maambukizi ya ubongo), baadhi ya maambukizi ya bakteria, na inasaidia dhidi ya malaria. Kawaida inaanzishwa wakati wa utambuzi wa VVU, hasa wakati CD4 iko chini au wakati mtu ana TB hai, na inachukuliwa kila siku. Kadri CD4 yako inavyopona vizuri kwenye ART na inabaki juu, daktari anaweza hatimaye kuamua inaweza kusimamishwa — lakini kwa ushauri wao tu, kamwe sio peke yako. Athari za kawaida zaidi ni ndogo (kichefuchefu, vipele); vipele vikali au ishara za allergic reaction zinapaswa kuripotiwa haraka. Hairudishi ART — inafanya kazi pamoja nayo kama ngao ya kulinda katika kipindi cha mapema cha hatari.',
      },
    },
    {
      q: {
        en: 'Can I have a normal sex life and relationships with HIV?',
        sw: 'Naweza kuwa na maisha ya kawaida ya ngono na mahusiano nikiwa na VVU?',
      },
      a: {
        en: 'Yes — absolutely. People with HIV date, marry, have satisfying relationships, and have children. The key facts: if you take ART consistently and your viral load is confirmed undetectable, you cannot transmit HIV to a sexual partner (U=U). For extra protection and to prevent other sexually transmitted infections and unplanned pregnancy, condoms remain useful. If your partner is HIV-negative, they can also take PrEP (a preventive medicine) for added peace of mind. If you want children, safe conception is very achievable — when the HIV-positive partner is undetectable, natural conception carries essentially no transmission risk; your CTC can also discuss timing and options. Honest conversation with a partner, ideally supported by a counsellor, builds trust. HIV is a manageable condition, not the end of intimacy or family life.',
        sw: 'Ndio — kabisa. Watu wenye VVU huchumbiana, huoa, huwa na mahusiano yenye kuridhisha, na huwa na watoto. Mambo muhimu: ukichukua ART mara kwa mara na viral load yako imethibitishwa kuwa haionekani, huwezi kupitisha VVU kwa mwenza wa kingono (U=U). Kwa ulinzi wa ziada na kuzuia maambukizi mengine ya zinaa na mimba isiyopangwa, kondomu zinabaki muhimu. Ikiwa mwenza wako hana VVU, anaweza pia kuchukua PrEP (dawa ya kuzuia) kwa amani zaidi ya akili. Ukitaka watoto, mimba salama inawezekana sana — wakati mwenza mwenye VVU haonekani, mimba ya asili haina hatari ya maambukizi; CTC yako pia inaweza kujadili wakati na chaguzi. Mazungumzo ya uaminifu na mwenza, ikiwezekana yakiungwa mkono na mshauri, hujenga uaminifu. VVU ni hali inayoweza kudhibitiwa, sio mwisho wa ukaribu au maisha ya familia.',
        sw_mtaa: 'Ndio — kabisa. Watu wenye VVU wanachumbiana, wanaoa, wanakuwa na mahusiano yenye kuridhisha, na wanakuwa na watoto. Mambo muhimu: ukichukua ART mara kwa mara na viral load yako imethibitishwa kuwa haionekani, huwezi kupitisha VVU kwa mwenza wa kingono (U=U). Kwa ulinzi wa ziada na kuzuia magonjwa mengine ya zinaa na mimba isiyopangwa, kondomu zinabaki muhimu. Ikiwa mwenza wako hana VVU, anaweza pia kuchukua PrEP (dawa ya kuzuia) kwa amani zaidi. Ukitaka watoto, mimba salama inawezekana sana — wakati mwenza mwenye VVU haonekani, mimba ya asili haina hatari ya maambukizi; CTC yako inaweza kujadili wakati na chaguzi. Mazungumzo ya uaminifu na mwenza, ikiwezekana yakiungwa mkono na counsellor, yanajenga uaminifu. VVU ni hali inayoweza kudhibitiwa, sio mwisho wa ukaribu au maisha ya familia.',
      },
    },
    {
      q: {
        en: 'My child has HIV — how is treatment different for children?',
        sw: 'Mtoto wangu ana VVU — matibabu ni tofauti vipi kwa watoto?',
      },
      a: {
        en: 'Children with HIV can grow up healthy on ART, but their care has child-specific features. Diagnosis in infants under 18 months uses a special test (DNA PCR) because the standard antibody test would still detect the mother\'s antibodies. ART is started as early as possible — in infants, immediately on diagnosis — using child-friendly formulations (dispersible tablets or pediatric dolutegravir) dosed by the child\'s weight, which means doses are reviewed and adjusted as the child grows. Children also need co-trimoxazole, growth and developmental monitoring, full immunisations, and nutrition support. As the child gets older, age-appropriate disclosure — gradually helping them understand their own status — becomes important and improves long-term adherence; CTC counsellors guide this. The teenage years bring new adherence challenges and need extra support. With consistent treatment, a child diagnosed today can expect to reach adulthood healthy.',
        sw: 'Watoto wenye VVU wanaweza kukua wenye afya kwenye ART, lakini huduma yao ina vipengele maalum vya watoto. Utambuzi kwa watoto wachanga chini ya miezi 18 hutumia kipimo maalum (DNA PCR) kwa sababu kipimo cha kawaida cha antibody bado kingegundua antibodies za mama. ART huanzishwa mapema iwezekanavyo — kwa watoto wachanga, mara moja wakati wa utambuzi — kwa kutumia formulations zinazofaa watoto (vidonge vinavyoyeyuka au dolutegravir ya watoto) dose kwa uzito wa mtoto, ambayo inamaanisha dose hupitiwa na kurekebishwa kadri mtoto anavyokua. Watoto pia wanahitaji co-trimoxazole, ufuatiliaji wa ukuaji na maendeleo, chanjo kamili, na msaada wa lishe. Kadri mtoto anavyokua, kufichua kunakofaa umri — kumsaidia polepole kuelewa hali yake mwenyewe — kunakuwa muhimu na huboresha kuzingatia kwa muda mrefu; washauri wa CTC huongoza hili. Miaka ya ujana huleta changamoto mpya za kuzingatia na huhitaji msaada wa ziada. Kwa matibabu thabiti, mtoto aliyegundulika leo anaweza kutarajia kufikia utu uzima akiwa na afya.',
        sw_mtaa: 'Watoto wenye VVU wanaweza kukua wenye afya kwenye ART, lakini huduma yao ina vipengele maalum vya watoto. Utambuzi kwa watoto wachanga chini ya miezi 18 unatumia kipimo maalum (DNA PCR) kwa sababu kipimo cha kawaida cha antibody bado kingegundua antibodies za mama. ART inaanzishwa mapema iwezekanavyo — kwa watoto wachanga, mara moja wakati wa utambuzi — kwa kutumia formulations zinazofaa watoto (vidonge vinavyoyeyuka au dolutegravir ya watoto) dose kwa uzito wa mtoto, inamaanisha dose zinapitiwa na kurekebishwa kadri mtoto anavyokua. Watoto pia wanahitaji co-trimoxazole, ufuatiliaji wa ukuaji na maendeleo, chanjo kamili, na msaada wa lishe. Kadri mtoto anavyokua, age-appropriate disclosure — kumsaidia polepole kuelewa hali yake — inakuwa muhimu na inaboresha adherence ya muda mrefu; CTC counsellors wanaongoza hili. Miaka ya ujana inaleta changamoto mpya za adherence na inahitaji msaada wa ziada. Kwa matibabu thabiti, mtoto aliyegundulika leo anaweza kutarajia kufikia utu uzima akiwa na afya.',
      },
    },
    {
      q: {
        en: 'I was exposed to HIV — is there anything I can take to prevent it?',
        sw: 'Nimeathiriwa na VVU — kuna kitu ninachoweza kuchukua kuzuia?',
      },
      a: {
        en: 'Yes — but timing is critical. PEP (post-exposure prophylaxis) is a 28-day course of ART medicine that can prevent HIV infection after a possible exposure — for example, condom failure with a partner of unknown or positive status, sexual assault, or a needlestick injury. PEP must be started as soon as possible, ideally within hours and absolutely within 72 hours of exposure — after that window it does not work. Go to a health facility, hospital emergency department, or CTC immediately and explain what happened. For people with ongoing risk — such as having an HIV-positive partner who is not yet undetectable, or other repeated exposures — PrEP (pre-exposure prophylaxis) is a daily medicine taken in advance to prevent infection, and it is highly effective when taken consistently. Both PEP and PrEP are available in Tanzania. Do not wait and hope — if you have had a real exposure, seek care today.',
        sw: 'Ndio — lakini wakati ni muhimu sana. PEP (kinga baada ya kuathiriwa) ni kozi ya siku 28 ya dawa ya ART inayoweza kuzuia maambukizi ya VVU baada ya kuathiriwa kunakowezekana — kwa mfano, kondomu kupasuka na mwenza wa hali isiyojulikana au chanya, ubakaji, au jeraha la sindano. PEP lazima ianzishwe haraka iwezekanavyo, ikiwezekana ndani ya masaa na kabisa ndani ya masaa 72 ya kuathiriwa — baada ya dirisha hilo haifanyi kazi. Nenda kituo cha afya, idara ya dharura ya hospitali, au CTC mara moja na ueleze kilichotokea. Kwa watu wenye hatari inayoendelea — kama kuwa na mwenza mwenye VVU ambaye bado haonekani, au kuathiriwa kwingine kunakorudiwa — PrEP (kinga kabla ya kuathiriwa) ni dawa ya kila siku inayochukuliwa mapema kuzuia maambukizi, na ina ufanisi mkubwa inapochukuliwa mara kwa mara. PEP na PrEP zote zinapatikana Tanzania. Usisubiri na kutumaini — ikiwa umekuwa na kuathiriwa halisi, tafuta huduma leo.',
        sw_mtaa: 'Ndio — lakini wakati ni muhimu sana. PEP (kinga baada ya kuathiriwa) ni kozi ya siku 28 ya dawa ya ART inayoweza kuzuia maambukizi ya VVU baada ya kuathiriwa kunakowezekana — kwa mfano, kondomu kupasuka na mwenza wa hali isiyojulikana au chanya, ubakaji, au jeraha la sindano. PEP lazima ianzishwe haraka iwezekanavyo, ikiwezekana ndani ya masaa na kabisa ndani ya masaa 72 ya kuathiriwa — baada ya dirisha hilo haifanyi kazi. Nenda kituo cha afya, emergency department ya hospitali, au CTC mara moja na ueleze kilichotokea. Kwa watu wenye hatari inayoendelea — kama kuwa na mwenza mwenye VVU ambaye bado haonekani, au kuathiriwa kunakorudiwa — PrEP (kinga kabla ya kuathiriwa) ni dawa ya kila siku inayochukuliwa mapema kuzuia maambukizi, na ina ufanisi mkubwa inapochukuliwa mara kwa mara. PEP na PrEP zote zinapatikana Tanzania. Usisubiri na kutumaini — ikiwa umekuwa na kuathiriwa halisi, tafuta huduma leo.',
      },
    },
    {
      q: {
        en: 'I feel depressed and overwhelmed since my diagnosis — is this normal?',
        sw: 'Najisikia huzuni na kulemewa tangu nigundulike — hii ni kawaida?',
      },
      a: {
        en: 'Yes, this is very common — and it is important, not something to ignore or be ashamed of. An HIV diagnosis is a major life event, and feelings of shock, grief, fear, anger, or low mood are a normal human response. But when low mood, hopelessness, sleep problems, or loss of interest persist for weeks, it becomes something that needs support — and untreated depression is also one of the biggest reasons people struggle to take ART consistently. The good news is that this is treatable. CTC clinics have counsellors, and many have links to mental health services. Talking to a trusted person, joining a peer support group of others living with HIV, and counselling all genuinely help. If feelings are severe — especially any thoughts of harming yourself — tell a clinician or counsellor right away; this is urgent and help is available. Caring for your mental health is part of caring for your HIV, not separate from it.',
        sw: 'Ndio, hii ni ya kawaida sana — na ni muhimu, sio kitu cha kupuuza au kuona aibu. Utambuzi wa VVU ni tukio kubwa la maisha, na hisia za mshtuko, huzuni, hofu, hasira, au hali ya chini ya moyo ni jibu la kawaida la kibinadamu. Lakini wakati hali ya chini ya moyo, kukata tamaa, matatizo ya usingizi, au kupoteza hamu vinapodumu kwa wiki, inakuwa kitu kinachohitaji msaada — na unyogovu usiotibiwa pia ni mojawapo ya sababu kubwa watu kushindwa kuchukua ART mara kwa mara. Habari njema ni kwamba hii inatibika. Kliniki za CTC zina washauri, na nyingi zina uhusiano na huduma za afya ya akili. Kuongea na mtu unayemwamini, kujiunga na kikundi cha msaada wa wenzako wanaoishi na VVU, na ushauri vyote husaidia kweli. Ikiwa hisia ni kali — hasa mawazo yoyote ya kujidhuru — mwambie daktari au mshauri mara moja; hili ni la dharura na msaada unapatikana. Kutunza afya yako ya akili ni sehemu ya kutunza VVU yako, sio tofauti nayo.',
        sw_mtaa: 'Ndio, hii ni ya kawaida sana — na ni muhimu, sio kitu cha kupuuza au kuona aibu. Utambuzi wa VVU ni tukio kubwa la maisha, na hisia za mshtuko, huzuni, hofu, hasira, au hali ya chini ya moyo ni jibu la kawaida la kibinadamu. Lakini wakati hali ya chini ya moyo, kukata tamaa, matatizo ya usingizi, au kupoteza hamu vinapodumu kwa wiki, inakuwa kitu kinachohitaji msaada — na unyogovu usiotibiwa pia ni mojawapo ya sababu kubwa watu kushindwa kuchukua ART mara kwa mara. Habari njema ni kwamba hii inatibika. Kliniki za CTC zina counsellors, na nyingi zina uhusiano na huduma za afya ya akili. Kuongea na mtu unayemwamini, kujiunga na peer support group ya wenzako wanaoishi na VVU, na ushauri vyote vinasaidia kweli. Ikiwa hisia ni kali — hasa mawazo yoyote ya kujidhuru — mwambie daktari au counsellor mara moja; hili ni la dharura na msaada unapatikana. Kutunza afya yako ya akili ni sehemu ya kutunza VVU yako, sio tofauti nayo.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take your ART every single day, at roughly the same time. One pill of TLD, once a day, for life. Link it to a daily habit — a meal, brushing teeth, a phone alarm. Consistency is everything: it is what makes you undetectable and keeps you there.',
      sw: 'Chukua ART yako kila siku, kwa wakati takriban ule ule. Kidonge kimoja cha TLD, mara moja kwa siku, maisha yote. Iunganishe na tabia ya kila siku — chakula, kupiga mswaki, tahadhari ya simu. Mfululizo ndio kila kitu: ndio unaokufanya usionekane na kukuweka hapo.',
      sw_mtaa: 'Chukua ART yako kila siku, kwa wakati takriban ule ule. Kidonge kimoja cha TLD, mara moja kwa siku, maisha yote. Iunganishe na tabia ya kila siku — chakula, kupiga mswaki, alarm ya simu. Mfululizo ndio kila kitu: ndio unaokufanya usionekane na kukuweka hapo.',
    },
    {
      en: 'Never run out of pills. Collect your refill before the old supply finishes — know your appointment dates and keep a small buffer. If you are travelling, carry enough for the whole trip plus extra. Running out is the most preventable cause of treatment interruption.',
      sw: 'Kamwe usiishiwe na vidonge. Chukua refill yako kabla ya ugavi wa zamani kuisha — jua tarehe zako za miadi na uweke akiba ndogo. Ikiwa unasafiri, beba ya kutosha kwa safari nzima pamoja na ziada. Kuishiwa ndio sababu inayoweza kuzuilika zaidi ya kukatiza matibabu.',
      sw_mtaa: 'Kamwe usiishiwe na vidonge. Chukua refill yako kabla ya stock ya zamani kuisha — jua tarehe zako za miadi na uweke akiba ndogo. Ikiwa unasafiri, beba ya kutosha kwa safari nzima pamoja na ziada. Kuishiwa ndio sababu inayoweza kuzuilika zaidi ya kukatiza matibabu.',
    },
    {
      en: 'Attend every CTC appointment. Routine viral load monitoring (usually at 6 months, 12 months, then yearly when stable) confirms the treatment is working. Missed appointments mean missed problems. Bring your clinic card and any other medicines you take.',
      sw: 'Hudhuria kila miadi ya CTC. Ufuatiliaji wa kawaida wa viral load (kawaida miezi 6, miezi 12, kisha kila mwaka unapokuwa imara) huthibitisha matibabu yanafanya kazi. Miadi iliyokoswa inamaanisha matatizo yaliyokoswa. Lete kadi yako ya kliniki na dawa zingine zozote unazochukua.',
      sw_mtaa: 'Hudhuria kila miadi ya CTC. Ufuatiliaji wa kawaida wa viral load (kawaida miezi 6, miezi 12, kisha kila mwaka unapokuwa imara) unathibitisha matibabu yanafanya kazi. Miadi iliyokoswa inamaanisha matatizo yaliyokoswa. Lete kadi yako ya kliniki na dawa zingine zozote unazochukua.',
    },
    {
      en: 'Get screened for TB at every visit — a simple symptom check (cough, fever, night sweats, weight loss). TB is the biggest threat to people with HIV, and catching it early saves lives.',
      sw: 'Pimwa TB katika kila ziara — ukaguzi rahisi wa dalili (kikohozi, homa, jasho la usiku, kupungua uzito). TB ni tishio kubwa zaidi kwa watu wenye VVU, na kuigundua mapema huokoa maisha.',
      sw_mtaa: 'Pimwa TB katika kila ziara — ukaguzi rahisi wa dalili (kikohozi, homa, jasho la usiku, kupungua uzito). TB ni tishio kubwa zaidi kwa watu wenye VVU, na kuigundua mapema kunaokoa maisha.',
    },
    {
      en: 'Take co-trimoxazole (Septrin) every day if it was prescribed — it shields you from PCP, toxoplasmosis, and other infections while your immune system recovers. Only stop it if your clinician advises so.',
      sw: 'Chukua co-trimoxazole (Septrin) kila siku ikiwa imeagizwa — hukukinga kutoka PCP, toxoplasmosis, na maambukizi mengine wakati mfumo wako wa kinga unapona. Simamisha tu ikiwa daktari wako anashauri hivyo.',
      sw_mtaa: 'Chukua co-trimoxazole (Septrin) kila siku ikiwa imeagizwa — inakukinga kutoka PCP, toxoplasmosis, na maambukizi mengine wakati kinga yako inapona. Simamisha tu ikiwa daktari wako anashauri hivyo.',
    },
    {
      en: 'Eat well and stay active. There is no special "HIV diet" — eat a balanced variety of foods, enough to maintain a healthy weight. Good nutrition supports immune recovery. Treat any other conditions (diabetes, blood pressure) alongside HIV.',
      sw: 'Kula vizuri na ubaki hai. Hakuna "lishe maalum ya VVU" — kula aina mbalimbali za vyakula vyenye uwiano, vya kutosha kudumisha uzito wenye afya. Lishe nzuri husaidia kupona kwa kinga. Tibu hali zingine zozote (kisukari, shinikizo la damu) pamoja na VVU.',
      sw_mtaa: 'Kula vizuri na ubaki hai. Hakuna "lishe maalum ya VVU" — kula aina mbalimbali za vyakula vyenye uwiano, vya kutosha kudumisha uzito wenye afya. Lishe nzuri inasaidia kupona kwa kinga. Tibu hali zingine zozote (kisukari, presha) pamoja na VVU.',
    },
    {
      en: 'Use condoms with partners and encourage partner testing. Even with U=U protecting against HIV transmission, condoms prevent other sexually transmitted infections and unplanned pregnancy. An HIV-negative partner can also consider PrEP.',
      sw: 'Tumia kondomu na wenza na uhimize upimaji wa wenza. Hata na U=U ikilinda dhidi ya maambukizi ya VVU, kondomu huzuia maambukizi mengine ya zinaa na mimba isiyopangwa. Mwenza asiye na VVU anaweza pia kufikiria PrEP.',
      sw_mtaa: 'Tumia kondomu na wenza na uhimize upimaji wa wenza. Hata na U=U ikilinda dhidi ya maambukizi ya VVU, kondomu zinazuia magonjwa mengine ya zinaa na mimba isiyopangwa. Mwenza asiye na VVU anaweza pia kufikiria PrEP.',
    },
    {
      en: 'Find a treatment supporter — a trusted person who knows your status and helps you stay on track. People with a supporter have better adherence and better outcomes. Peer support groups of others living with HIV are also powerful.',
      sw: 'Tafuta msaidizi wa matibabu — mtu unayemwamini anayejua hali yako na anayekusaidia kubaki kwenye mstari. Watu wenye msaidizi wana kuzingatia bora na matokeo bora. Vikundi vya msaada wa wenzako wanaoishi na VVU pia vina nguvu.',
      sw_mtaa: 'Tafuta treatment supporter — mtu unayemwamini anayejua hali yako na anayekusaidia kubaki kwenye mstari. Watu wenye supporter wana adherence bora na matokeo bora. Peer support groups za wenzako wanaoishi na VVU pia zina nguvu.',
    },
    {
      en: 'Avoid heavy alcohol and recreational drugs. They make it harder to remember doses, can worsen mood, and add strain to the liver and kidneys. If you are struggling to cut down, your CTC can connect you with support.',
      sw: 'Epuka pombe nyingi na dawa za starehe. Hufanya iwe vigumu kukumbuka dose, zinaweza kuzidisha hali ya moyo, na huongeza mzigo kwa ini na figo. Ikiwa unahangaika kupunguza, CTC yako inaweza kukuunganisha na msaada.',
      sw_mtaa: 'Epuka pombe nyingi na dawa za starehe. Zinafanya iwe vigumu kukumbuka dose, zinaweza kuzidisha mood, na zinaongeza mzigo kwa ini na figo. Ikiwa unahangaika kupunguza, CTC yako inaweza kukuunganisha na msaada.',
    },
    {
      en: 'Look after your mental health. Low mood, anxiety, and stigma stress are common and treatable — and untreated, they undermine adherence. Talk to a counsellor, join a support group, lean on trusted people. Your mental wellbeing is part of your HIV care.',
      sw: 'Tunza afya yako ya akili. Hali ya chini ya moyo, wasiwasi, na msongo wa unyanyapaa ni vya kawaida na vinatibika — na bila kutibiwa, vinadhoofisha kuzingatia. Ongea na mshauri, jiunge na kikundi cha msaada, tegemea watu unaowaamini. Ustawi wako wa akili ni sehemu ya huduma yako ya VVU.',
      sw_mtaa: 'Tunza afya yako ya akili. Hali ya chini ya moyo, wasiwasi, na stress ya stigma ni vya kawaida na vinatibika — na bila kutibiwa, vinadhoofisha adherence. Ongea na counsellor, jiunge na support group, tegemea watu unaowaamini. Ustawi wako wa akili ni sehemu ya huduma yako ya VVU.',
    },
  ],

  warningTriggers: [
    {
      en: 'Stopping or interrupting ART — even for a short time — lets the virus rebound and develop drug resistance. This is the single biggest threat to your treatment.',
      sw: 'Kusimamisha au kukatiza ART — hata kwa muda mfupi — huruhusu virusi kurudi na kuendeleza usugu wa dawa. Hili ni tishio kubwa zaidi kwa matibabu yako.',
      sw_mtaa: 'Kusimamisha au kukatiza ART — hata kwa muda mfupi — kunaruhusu virusi kurudi na kuwa sugu kwa dawa. Hili ni tishio kubwa zaidi kwa matibabu yako.',
    },
    {
      en: 'Buying or sharing ART outside the CTC system — risk of counterfeit drugs, wrong regimens, gaps in supply, and untraced resistance.',
      sw: 'Kununua au kushiriki ART nje ya mfumo wa CTC — hatari ya dawa bandia, regimens zisizo sahihi, mapengo katika ugavi, na usugu usio na ufuatiliaji.',
      sw_mtaa: 'Kununua au kushiriki ART nje ya mfumo wa CTC — hatari ya dawa bandia, regimens zisizo sahihi, mapengo katika ugavi, na usugu usio na ufuatiliaji.',
    },
    {
      en: 'Using unproven "cures", herbal remedies, or faith-based claims as a REPLACEMENT for ART. Faith and traditional support can sit alongside ART — but nothing replaces it. People who stop ART for unproven cures get sick and can die.',
      sw: 'Kutumia "tiba" zisizothibitishwa, dawa za mitishamba, au madai ya kidini KAMA MBADALA wa ART. Imani na msaada wa jadi vinaweza kukaa pamoja na ART — lakini hakuna kinachoirudisha. Watu wanaosimamisha ART kwa tiba zisizothibitishwa huugua na wanaweza kufa.',
      sw_mtaa: 'Kutumia "tiba" zisizothibitishwa, dawa za mitishamba, au madai ya kidini KAMA MBADALA wa ART. Imani na msaada wa jadi vinaweza kukaa pamoja na ART — lakini hakuna kinachoirudisha. Watu wanaosimamisha ART kwa tiba zisizothibitishwa wanaugua na wanaweza kufa.',
    },
    {
      en: 'Hiding your status from a current sexual partner — they remain at risk, untested, and unable to access PrEP. Disclosure to partners matters.',
      sw: 'Kuficha hali yako kwa mwenza wa kingono wa sasa — wanabaki hatarini, bila kupimwa, na hawawezi kupata PrEP. Kufichua kwa wenza ni muhimu.',
      sw_mtaa: 'Kuficha hali yako kwa mwenza wa kingono wa sasa — wanabaki hatarini, bila kupimwa, na hawawezi kupata PrEP. Kufichua kwa wenza ni muhimu.',
    },
    {
      en: 'Skipping CTC appointments and viral load monitoring — problems like treatment failure or a new infection go undetected until they become serious.',
      sw: 'Kuruka miadi ya CTC na ufuatiliaji wa viral load — matatizo kama kushindwa kwa matibabu au maambukizi mapya hayagunduliwi hadi yanapokuwa makubwa.',
      sw_mtaa: 'Kuruka miadi ya CTC na ufuatiliaji wa viral load — matatizo kama treatment failure au maambukizi mapya hayagunduliwi hadi yanapokuwa makubwa.',
    },
    {
      en: 'Ignoring a persistent cough, fever, weight loss, or severe headache — in HIV these can signal TB, cryptococcal meningitis, or PCP, which are dangerous when missed.',
      sw: 'Kupuuza kikohozi cha kudumu, homa, kupungua uzito, au kichwa kikali — katika VVU hizi zinaweza kuashiria TB, cryptococcal meningitis, au PCP, ambazo ni hatari zinapokoswa.',
      sw_mtaa: 'Kupuuza kikohozi cha kudumu, homa, kupungua uzito, au kichwa kikali — katika VVU hizi zinaweza kuashiria TB, cryptococcal meningitis, au PCP, ambazo ni hatari zinapokoswa.',
    },
    {
      en: 'Untreated low mood, heavy alcohol use, or unmanaged stigma stress — these quietly erode adherence and are among the most common reasons treatment fails.',
      sw: 'Hali ya chini ya moyo isiyotibiwa, matumizi mazito ya pombe, au msongo wa unyanyapaa usiosimamiwa — hivi hudhoofisha kuzingatia kimya kimya na ni miongoni mwa sababu za kawaida za matibabu kushindwa.',
      sw_mtaa: 'Hali ya chini ya moyo isiyotibiwa, matumizi mazito ya pombe, au stress ya stigma isiyosimamiwa — hivi vinadhoofisha adherence kimya kimya na ni miongoni mwa sababu za kawaida za matibabu kushindwa.',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Severe headache, neck stiffness, confusion, or fever — possible cryptococcal or TB meningitis, especially with low CD4. EMERGENCY',
        sw: 'Kichwa kikali, ukakavu wa shingo, kuchanganyikiwa, au homa — uwezekano wa cryptococcal au TB meningitis, hasa na CD4 ya chini. DHARURA',
        sw_mtaa: 'Kichwa kikali, shingo ngumu, kuchanganyikiwa, au homa — uwezekano wa cryptococcal au TB meningitis, hasa na CD4 ya chini. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe shortness of breath, fast breathing, or chest pain — possible PCP or severe pneumonia. EMERGENCY',
        sw: 'Kushindwa kupumua kali, kupumua haraka, au maumivu ya kifua — uwezekano wa PCP au nimonia kali. DHARURA',
        sw_mtaa: 'Kushindwa kupumua kali, kupumua haraka, au maumivu ya kifua — uwezekano wa PCP au nimonia kali. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Cough lasting more than 2 weeks, night sweats, or unexplained weight loss — possible TB. Get tested urgently',
        sw: 'Kikohozi kinachodumu zaidi ya wiki 2, jasho la usiku, au kupungua uzito bila sababu — uwezekano wa TB. Pimwa kwa haraka',
        sw_mtaa: 'Kikohozi kinachodumu zaidi ya wiki 2, jasho la usiku, au kupungua uzito bila sababu — uwezekano wa TB. Pimwa kwa haraka',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'New severe rash, blistering skin, or mouth ulcers after starting a medicine — possible serious drug reaction. Seek care within 24 hours',
        sw: 'Vipele vipya vikali, ngozi inayotoka malenge, au vidonda mdomoni baada ya kuanza dawa — uwezekano wa athari mbaya ya dawa. Tafuta huduma ndani ya masaa 24',
        sw_mtaa: 'Vipele vipya vikali, ngozi inayotoka malenge, au vidonda mdomoni baada ya kuanza dawa — uwezekano wa athari mbaya ya dawa. Tafuta huduma ndani ya masaa 24',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Worsening symptoms in the first weeks after starting ART — possible IRIS (immune reconstitution inflammatory syndrome). Get reviewed promptly',
        sw: 'Dalili zinazozidi katika wiki za kwanza baada ya kuanza ART — uwezekano wa IRIS (immune reconstitution inflammatory syndrome). Pata ukaguzi haraka',
        sw_mtaa: 'Dalili zinazozidi katika wiki za kwanza baada ya kuanza ART — uwezekano wa IRIS (immune reconstitution inflammatory syndrome). Pata ukaguzi haraka',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Difficulty or pain swallowing, white patches in the mouth or throat — possible oral or oesophageal candidiasis. Seek care soon',
        sw: 'Ugumu au maumivu ya kumeza, mabaka meupe mdomoni au kooni — uwezekano wa candidiasis ya mdomo au umio. Tafuta huduma hivi karibuni',
        sw_mtaa: 'Ugumu au maumivu ya kumeza, mabaka meupe mdomoni au kooni — uwezekano wa candidiasis ya mdomo au umio. Tafuta huduma hivi karibuni',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Persistent diarrhoea, ongoing fever, or steady weight loss despite ART — possible opportunistic infection or treatment problem. Get reviewed soon',
        sw: 'Kuhara kwa kudumu, homa inayoendelea, au kupungua uzito kwa kasi licha ya ART — uwezekano wa maambukizi nyemelezi au tatizo la matibabu. Pata ukaguzi hivi karibuni',
        sw_mtaa: 'Kuhara kwa kudumu, homa inayoendelea, au kupungua uzito kwa kasi licha ya ART — uwezekano wa maambukizi nyemelezi au tatizo la matibabu. Pata ukaguzi hivi karibuni',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'New problems with vision, especially blurring or floaters — possible CMV retinitis in advanced HIV. Seek urgent eye review',
        sw: 'Matatizo mapya ya kuona, hasa ukungu au vitu vinavyoelea — uwezekano wa CMV retinitis katika VVU iliyokomaa. Tafuta ukaguzi wa haraka wa macho',
        sw_mtaa: 'Matatizo mapya ya kuona, hasa ukungu au vitu vinavyoelea — uwezekano wa CMV retinitis katika advanced HIV. Tafuta urgent eye review',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Thoughts of harming yourself, or feeling unable to cope — this is urgent. Tell a clinician, counsellor, or trusted person right away; help is available',
        sw: 'Mawazo ya kujidhuru, au kuhisi huwezi kukabiliana — hili ni la dharura. Mwambie daktari, mshauri, au mtu unayemwamini mara moja; msaada unapatikana',
        sw_mtaa: 'Mawazo ya kujidhuru, au kuhisi huwezi kukabiliana — hili ni la dharura. Mwambie daktari, counsellor, au mtu unayemwamini mara moja; msaada unapatikana',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'A detectable viral load result, or a CD4 count that is falling rather than rising — bring this to your CTC promptly so adherence and treatment can be reviewed',
        sw: 'Matokeo ya viral load yanayoonekana, au CD4 count inayoshuka badala ya kupanda — lete hili kwa CTC yako haraka ili kuzingatia na matibabu vipitiwe',
        sw_mtaa: 'Matokeo ya viral load yanayoonekana, au CD4 count inayoshuka badala ya kupanda — lete hili kwa CTC yako haraka ili adherence na matibabu vipitiwe',
      },
      urgency: 'soon' as UrgencyLevel,
    },
  ],

  variants: HIV_VARIANTS,

  comorbidityNotes: [
    {
      coCondition: 'tb',
      note: {
        en: 'TB is the leading cause of illness and death among people living with HIV — HIV multiplies TB risk many times over. Every person with HIV should be screened for TB at every clinic visit (cough, fever, night sweats, weight loss). When both are present, TB treatment starts first, then ART within 2-8 weeks (delayed to 4-8 weeks for TB meningitis). The key interaction: the TB drug rifampicin lowers dolutegravir levels, so dolutegravir is taken twice daily while on rifampicin, returning to once daily 2 weeks after rifampicin ends. Never stop ART because of TB — both diseases need their treatment together. See the dedicated TB guidance for the full picture.',
        sw: 'TB ni sababu kuu ya ugonjwa na vifo miongoni mwa watu wanaoishi na VVU — VVU huzidisha hatari ya TB mara nyingi. Kila mtu mwenye VVU anapaswa kupimwa TB katika kila ziara ya kliniki (kikohozi, homa, jasho la usiku, kupungua uzito). Wakati zote zipo, matibabu ya TB huanza kwanza, kisha ART ndani ya wiki 2-8 (huchelewa hadi wiki 4-8 kwa TB meningitis). Mwingiliano muhimu: dawa ya TB rifampicin hushusha viwango vya dolutegravir, hivyo dolutegravir huchukuliwa mara mbili kwa siku ukiwa kwenye rifampicin, kurudi mara moja kwa siku wiki 2 baada ya rifampicin kuisha. Kamwe usisimamishe ART kwa sababu ya TB — magonjwa yote yanahitaji matibabu yao pamoja. Ona muongozo maalum wa TB kwa picha kamili.',
        sw_mtaa: 'TB ni sababu kuu ya ugonjwa na vifo miongoni mwa watu wanaoishi na VVU — VVU inazidisha hatari ya TB mara nyingi. Kila mtu mwenye VVU anapaswa kupimwa TB katika kila ziara ya kliniki (kikohozi, homa, jasho la usiku, kupungua uzito). Wakati zote zipo, matibabu ya TB yanaanza kwanza, kisha ART ndani ya wiki 2-8 (inacheleweshwa hadi wiki 4-8 kwa TB meningitis). Interaction muhimu: dawa ya TB rifampicin inashusha viwango vya dolutegravir, hivyo dolutegravir inachukuliwa mara mbili kwa siku ukiwa kwenye rifampicin, inarudi mara moja kwa siku wiki 2 baada ya rifampicin kuisha. Kamwe usisimamishe ART kwa sababu ya TB — magonjwa yote yanahitaji matibabu yao pamoja. Ona muongozo maalum wa TB kwa picha kamili.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Diabetes and HIV often coexist, especially as people on ART live longer. ART itself, and some older drugs in particular, can affect blood sugar and cholesterol, so screening for diabetes is part of routine HIV care. Both conditions need lifelong daily medicine and regular monitoring — the good news is that the discipline of HIV adherence often helps with diabetes adherence too. Both raise the importance of not smoking, eating well, and staying active. Tell every clinician about both conditions so medicines are checked for interactions and the heart, kidneys, and eyes are monitored.',
        sw: 'Kisukari na VVU mara nyingi huishi pamoja, hasa kadri watu walio kwenye ART wanavyoishi muda mrefu zaidi. ART yenyewe, na baadhi ya dawa za zamani hasa, zinaweza kuathiri sukari ya damu na cholesterol, hivyo uchunguzi wa kisukari ni sehemu ya huduma ya kawaida ya VVU. Hali zote zinahitaji dawa ya kila siku ya maisha na ufuatiliaji wa kawaida — habari njema ni kwamba nidhamu ya kuzingatia VVU mara nyingi husaidia na kuzingatia kisukari pia. Zote huongeza umuhimu wa kutovuta sigara, kula vizuri, na kubaki hai. Mwambie kila daktari kuhusu hali zote ili dawa zikaguliwe kwa mwingiliano na moyo, figo, na macho vifuatiliwe.',
        sw_mtaa: 'Kisukari na VVU mara nyingi vinaishi pamoja, hasa kadri watu walio kwenye ART wanavyoishi muda mrefu zaidi. ART yenyewe, na baadhi ya dawa za zamani hasa, zinaweza kuathiri sugar na cholesterol, hivyo uchunguzi wa kisukari ni sehemu ya huduma ya kawaida ya VVU. Hali zote zinahitaji dawa ya kila siku ya maisha na ufuatiliaji wa kawaida — habari njema ni kwamba nidhamu ya kuzingatia VVU mara nyingi inasaidia na kuzingatia kisukari pia. Zote zinaongeza umuhimu wa kutovuta sigara, kula vizuri, na kubaki hai. Mwambie kila daktari kuhusu hali zote ili dawa zikaguliwe kwa interaction na moyo, figo, na macho vifuatiliwe.',
      },
    },
    {
      coCondition: 'hypertension',
      note: {
        en: 'High blood pressure becomes more common as people with HIV age on successful treatment. It is usually silent — found only by measuring — so blood pressure should be checked at routine CTC visits. Managing both means two sets of daily medicine, but the principles align: consistent adherence, not smoking, reducing salt, staying active, and regular monitoring. Most blood pressure medicines work well alongside ART; tell your clinician about all your medicines so any interactions are checked. Controlling both protects the heart, kidneys, and brain over the long life that modern HIV treatment makes possible.',
        sw: 'Shinikizo la damu la juu hukuwa la kawaida zaidi kadri watu wenye VVU wanavyozeeka kwenye matibabu yenye mafanikio. Kawaida ni kimya — hupatikana tu kwa kupima — hivyo shinikizo la damu linapaswa kukaguliwa katika ziara za kawaida za CTC. Kusimamia zote kunamaanisha seti mbili za dawa ya kila siku, lakini kanuni zinalingana: kuzingatia kwa mfululizo, kutovuta sigara, kupunguza chumvi, kubaki hai, na ufuatiliaji wa kawaida. Dawa nyingi za shinikizo la damu hufanya kazi vizuri pamoja na ART; mwambie daktari wako kuhusu dawa zako zote ili mwingiliano wowote ukaguliwe. Kudhibiti zote hulinda moyo, figo, na ubongo katika maisha marefu ambayo matibabu ya kisasa ya VVU huwezesha.',
        sw_mtaa: 'Presha ya juu inakuwa ya kawaida zaidi kadri watu wenye VVU wanavyozeeka kwenye matibabu yenye mafanikio. Kawaida ni kimya — inapatikana tu kwa kupima — hivyo presha inapaswa kukaguliwa katika ziara za kawaida za CTC. Kusimamia zote kunamaanisha seti mbili za dawa ya kila siku, lakini kanuni zinalingana: kuzingatia kwa mfululizo, kutovuta sigara, kupunguza chumvi, kubaki hai, na ufuatiliaji wa kawaida. Dawa nyingi za presha zinafanya kazi vizuri pamoja na ART; mwambie daktari kuhusu dawa zako zote ili interactions zikaguliwe. Kudhibiti zote kunalinda moyo, figo, na ubongo katika maisha marefu ambayo matibabu ya kisasa ya VVU yanawezesha.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'The kidneys deserve attention in HIV care. HIV itself can affect the kidneys, and some ART drugs — particularly tenofovir (the "T" in TLD) — are processed by the kidneys and need monitoring. Kidney function is checked at baseline and periodically. If chronic kidney disease develops, the ART regimen may need adjusting, and the clinician will coordinate care. Other things that protect the kidneys matter even more in HIV: controlling blood pressure and diabetes, staying hydrated, and avoiding unnecessary painkillers and unprescribed medicines. Tell your CTC about any swelling, changes in urine, or known kidney problems.',
        sw: 'Figo zinastahili umakini katika huduma ya VVU. VVU yenyewe inaweza kuathiri figo, na baadhi ya dawa za ART — hasa tenofovir ("T" katika TLD) — huchakatwa na figo na zinahitaji ufuatiliaji. Utendaji wa figo hukaguliwa wakati wa msingi na mara kwa mara. Ikiwa ugonjwa wa figo sugu unaendelea, regimen ya ART inaweza kuhitaji kurekebishwa, na daktari ataratibu huduma. Mambo mengine yanayolinda figo yanajali zaidi katika VVU: kudhibiti shinikizo la damu na kisukari, kubaki na maji ya kutosha, na kuepuka dawa za maumivu zisizo za lazima na dawa zisizoagizwa. Mwambie CTC yako kuhusu uvimbe wowote, mabadiliko ya mkojo, au matatizo ya figo yanayojulikana.',
        sw_mtaa: 'Figo zinastahili umakini katika huduma ya VVU. VVU yenyewe inaweza kuathiri figo, na baadhi ya dawa za ART — hasa tenofovir ("T" katika TLD) — zinachakatwa na figo na zinahitaji ufuatiliaji. Utendaji wa figo unakaguliwa wakati wa msingi na mara kwa mara. Ikiwa ugonjwa wa figo sugu unaendelea, regimen ya ART inaweza kuhitaji kurekebishwa, na daktari ataratibu huduma. Mambo mengine yanayolinda figo yanajali zaidi katika VVU: kudhibiti presha na kisukari, kubaki na maji ya kutosha, na kuepuka dawa za maumivu zisizo za lazima na dawa zisizoagizwa. Mwambie CTC yako kuhusu uvimbe wowote, mabadiliko ya mkojo, au matatizo ya figo yanayojulikana.',
      },
    },
    {
      coCondition: 'pregnancy',
      note: {
        en: 'Pregnancy and HIV together are managed through PMTCT — one of the great successes of modern HIV care. With the mother on effective ART and an undetectable viral load, the risk of passing HIV to the baby drops below 1-2%. TLD is used in pregnancy. The mother takes ART every day through pregnancy, delivery, and breastfeeding; delivers at a facility; the baby receives preventive medicine and HIV testing at intervals. Breastfeeding is recommended when the mother is on ART with good adherence — exclusively for 6 months. The mother stays on ART for life, for her own health. See the PMTCT guidance for the full pathway.',
        sw: 'Mimba na VVU pamoja husimamiwa kupitia PMTCT — mojawapo ya mafanikio makubwa ya huduma ya kisasa ya VVU. Kwa mama aliye kwenye ART yenye ufanisi na viral load isiyoonekana, hatari ya kupitisha VVU kwa mtoto inashuka chini ya 1-2%. TLD hutumika katika mimba. Mama huchukua ART kila siku katika mimba, kujifungua, na kunyonyesha; hujifungua katika kituo; mtoto hupokea dawa ya kuzuia na upimaji wa VVU kwa vipindi. Kunyonyesha kunashauriwa wakati mama yuko kwenye ART na anazingatia vizuri — kwa maziwa ya mama pekee kwa miezi 6. Mama hubaki kwenye ART maisha yote, kwa afya yake mwenyewe. Ona muongozo wa PMTCT kwa njia kamili.',
        sw_mtaa: 'Mimba na VVU pamoja vinasimamiwa kupitia PMTCT — mojawapo ya mafanikio makubwa ya huduma ya kisasa ya VVU. Kwa mama aliye kwenye ART yenye ufanisi na viral load isiyoonekana, hatari ya kupitisha VVU kwa mtoto inashuka chini ya 1-2%. TLD inatumika katika mimba. Mama anachukua ART kila siku katika mimba, kujifungua, na kunyonyesha; anajifungua katika kituo; mtoto anapokea dawa ya kuzuia na upimaji wa VVU kwa vipindi. Kunyonyesha kunashauriwa wakati mama yuko kwenye ART na anazingatia vizuri — kwa maziwa ya mama pekee miezi 6. Mama anabaki kwenye ART maisha yote, kwa afya yake mwenyewe. Ona muongozo wa PMTCT kwa njia kamili.',
      },
    },
    {
      coCondition: 'mental_health',
      note: {
        en: 'Mental health and HIV are deeply linked. Low mood, anxiety, and the stress of stigma are common — especially around diagnosis, disclosure, and life changes — and untreated, they are among the biggest reasons people struggle to take ART consistently. This is not weakness; it is a treatable, expected part of living with a long-term condition. CTC clinics have counsellors, peer support groups connect people who understand, and where needed there are links to mental health services. Caring for mental wellbeing is not separate from HIV care — it is part of what keeps treatment working. Any thoughts of self-harm should be raised urgently with a clinician or counsellor.',
        sw: 'Afya ya akili na VVU vimeunganishwa kwa kina. Hali ya chini ya moyo, wasiwasi, na msongo wa unyanyapaa ni vya kawaida — hasa karibu na utambuzi, kufichua, na mabadiliko ya maisha — na bila kutibiwa, ni miongoni mwa sababu kubwa watu kushindwa kuchukua ART mara kwa mara. Hii sio udhaifu; ni sehemu inayotibika, inayotarajiwa ya kuishi na hali ya muda mrefu. Kliniki za CTC zina washauri, vikundi vya msaada wa wenzao huunganisha watu wanaoelewa, na pale inapohitajika kuna uhusiano na huduma za afya ya akili. Kutunza ustawi wa akili sio tofauti na huduma ya VVU — ni sehemu ya kinachofanya matibabu yaendelee kufanya kazi. Mawazo yoyote ya kujidhuru yanapaswa kuibuliwa kwa haraka na daktari au mshauri.',
        sw_mtaa: 'Afya ya akili na VVU vimeunganishwa kwa kina. Hali ya chini ya moyo, wasiwasi, na stress ya stigma ni vya kawaida — hasa karibu na utambuzi, kufichua, na mabadiliko ya maisha — na bila kutibiwa, ni miongoni mwa sababu kubwa watu kushindwa kuchukua ART mara kwa mara. Hii sio udhaifu; ni sehemu inayotibika, inayotarajiwa ya kuishi na hali ya muda mrefu. Kliniki za CTC zina counsellors, peer support groups zinaunganisha watu wanaoelewa, na pale inapohitajika kuna uhusiano na huduma za afya ya akili. Kutunza ustawi wa akili sio tofauti na huduma ya VVU — ni sehemu ya kinachofanya matibabu yaendelee kufanya kazi. Mawazo yoyote ya kujidhuru yanapaswa kuibuliwa kwa haraka na daktari au counsellor.',
      },
    },
  ],

  sources: [
    src('NACP_ART_2024'),
    src('WHO_HIV_2024'),
    src('NTLG_STG_2023'),
    src('IMCI_2024'),
    src('MOH_TZ_MATERNAL_2024'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
