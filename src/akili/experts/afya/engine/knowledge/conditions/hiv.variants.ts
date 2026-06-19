/**
 * HIV — Condition Variants (Phase 5, HIV Full All-In)
 *
 * Eight variants covering the full HIV care continuum:
 *   1. hiv_newly_diagnosed   — just received a confirmed positive result
 *   2. hiv_on_art            — established on ART, the long stable phase
 *   3. hiv_treatment_failure — detectable viral load, stepwise workup
 *   4. hiv_advanced          — advanced HIV disease (low CD4), OI risk
 *   5. hiv_oi                — opportunistic infections (TB, crypto, PCP...)
 *   6. hiv_pmtct             — HIV in pregnancy, prevention of MTCT
 *   7. hiv_pediatric         — HIV in children
 *   8. hiv_prevention        — PrEP and PEP for HIV-negative people
 *
 * Sources: NACP National Guidelines for the Management of HIV and AIDS 2024,
 *          WHO Consolidated Guidelines on HIV 2024, IMCI 2024,
 *          MoH-TZ Maternal Guidelines 2024, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * SCOPE: educational continuity content. No diagnosis, no ART regimen
 * selection, no dosing. The CTC clinician owns regimen and dose decisions.
 */

import { ConditionVariant } from '../../types';
import { src } from '../../governance/sources';

export const HIV_VARIANTS: ConditionVariant[] = [
  // ════════════════════════════════════════════════════════════════════
  // 1. NEWLY DIAGNOSED
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_newly_diagnosed',
    severity: 'uncomplicated',
    label: {
      en: 'HIV — newly diagnosed',
      sw: 'VVU — umegundulika hivi karibuni',
    },
    presentation: {
      en: 'A person who has just received a confirmed HIV-positive result through the NACP testing algorithm. They may feel completely well with no symptoms, or may have had a recent illness that prompted testing. Emotionally this is often the hardest moment — shock, fear, grief, and worry about the future are all normal. Clinically the priorities are calm and clear: link to a CTC, complete a baseline assessment (CD4, viral load, TB symptom screen, screening for other infections, pregnancy status for women), and start ART quickly — often the same day or within 7 days. This stage is about emotional stabilisation and beginning treatment, not about complications.',
      sw: 'Mtu ambaye amepokea tu matokeo yaliyothibitishwa ya VVU chanya kupitia algorithm ya upimaji ya NACP. Wanaweza kujisikia vizuri kabisa bila dalili, au wanaweza kuwa na ugonjwa wa hivi karibuni uliosababisha upimaji. Kihisia hii mara nyingi ni wakati mgumu zaidi — mshtuko, hofu, huzuni, na wasiwasi kuhusu siku zijazo vyote ni vya kawaida. Kikliniki vipaumbele ni vya utulivu na wazi: kuunganisha na CTC, kukamilisha tathmini ya msingi (CD4, viral load, uchunguzi wa dalili za TB, uchunguzi wa maambukizi mengine, hali ya mimba kwa wanawake), na kuanza ART haraka — mara nyingi siku ile ile au ndani ya siku 7. Hatua hii ni kuhusu kutulia kihisia na kuanza matibabu, sio kuhusu matatizo.',
      sw_mtaa: 'Mtu ambaye amepokea tu matokeo yaliyothibitishwa ya VVU chanya kupitia algorithm ya upimaji ya NACP. Wanaweza kujisikia vizuri kabisa bila dalili, au wanaweza kuwa na ugonjwa wa hivi karibuni uliosababisha upimaji. Kihisia hii mara nyingi ni wakati mgumu zaidi — mshtuko, hofu, huzuni, na wasiwasi kuhusu siku zijazo vyote ni vya kawaida. Kikliniki vipaumbele ni vya utulivu na wazi: kuunganisha na CTC, kukamilisha baseline assessment (CD4, viral load, uchunguzi wa dalili za TB, uchunguzi wa maambukizi mengine, hali ya mimba kwa wanawake), na kuanza ART haraka — mara nyingi siku ile ile au ndani ya siku 7. Hatua hii ni kuhusu kutulia kihisia na kuanza matibabu, sio kuhusu matatizo.',
    },
    recognitionSigns: [
      {
        en: 'Confirmed HIV-positive result through the testing algorithm',
        sw: 'Matokeo ya VVU chanya yaliyothibitishwa kupitia algorithm ya upimaji',
        sw_mtaa: 'Matokeo ya VVU chanya yaliyothibitishwa kupitia algorithm ya upimaji',
      },
      {
        en: 'Often no symptoms — many people are diagnosed while feeling well',
        sw: 'Mara nyingi hakuna dalili — watu wengi hugundulika wakiwa wanajisikia vizuri',
        sw_mtaa: 'Mara nyingi hakuna dalili — watu wengi wanagundulika wakiwa wanajisikia vizuri',
      },
      {
        en: 'Emotional distress — shock, fear, grief — is common and expected',
        sw: 'Msongo wa kihisia — mshtuko, hofu, huzuni — ni wa kawaida na unaotarajiwa',
        sw_mtaa: 'Msongo wa kihisia — mshtuko, hofu, huzuni — ni wa kawaida na unaotarajiwa',
      },
    ],
    treatmentJourney: {
      en: 'Linkage to a CTC happens right away. Baseline workup: CD4 count, viral load, TB symptom screen (with GeneXpert if any symptoms are present), screening for other infections, and pregnancy testing for women. ART is started quickly — Tanzania follows a same-day or rapid-start approach where possible — with TLD (tenofovir + lamivudine + dolutegravir) as the preferred first-line regimen: one pill, once a day. Co-trimoxazole is usually started too, especially if CD4 is low. The first months focus on adherence counselling, building a daily pill routine, identifying a treatment supporter, and emotional support. The goal: a viral load that becomes undetectable by around 6 months.',
      sw: 'Kuunganishwa na CTC hutokea mara moja. Uchunguzi wa msingi: CD4 count, viral load, uchunguzi wa dalili za TB (na GeneXpert ikiwa kuna dalili zozote), uchunguzi wa maambukizi mengine, na upimaji wa mimba kwa wanawake. ART huanzishwa haraka — Tanzania hufuata mbinu ya siku ile ile au kuanza haraka inapowezekana — na TLD (tenofovir + lamivudine + dolutegravir) kama regimen ya kwanza inayopendelewa: kidonge kimoja, mara moja kwa siku. Co-trimoxazole kawaida huanzishwa pia, hasa ikiwa CD4 iko chini. Miezi ya kwanza inajikita katika ushauri wa kuzingatia, kujenga utaratibu wa vidonge wa kila siku, kutambua msaidizi wa matibabu, na msaada wa kihisia. Lengo: viral load inayokuwa isiyoonekana ifikapo karibu miezi 6.',
      sw_mtaa: 'Kuunganishwa na CTC kunatokea mara moja. Baseline workup: CD4 count, viral load, uchunguzi wa dalili za TB (na GeneXpert ikiwa kuna dalili zozote), uchunguzi wa maambukizi mengine, na upimaji wa mimba kwa wanawake. ART inaanzishwa haraka — Tanzania inafuata mbinu ya same-day au rapid-start inapowezekana — na TLD (tenofovir + lamivudine + dolutegravir) kama first-line regimen inayopendelewa: kidonge kimoja, mara moja kwa siku. Co-trimoxazole kawaida inaanzishwa pia, hasa ikiwa CD4 iko chini. Miezi ya kwanza inajikita katika adherence counselling, kujenga utaratibu wa vidonge wa kila siku, kutambua treatment supporter, na msaada wa kihisia. Lengo: viral load inayokuwa undetectable ifikapo karibu miezi 6.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe headache, confusion, or neck stiffness — possible meningitis, especially if CD4 is low. EMERGENCY',
          sw: 'Kichwa kikali, kuchanganyikiwa, au ukakavu wa shingo — uwezekano wa meningitis, hasa ikiwa CD4 iko chini. DHARURA',
          sw_mtaa: 'Kichwa kikali, kuchanganyikiwa, au shingo ngumu — uwezekano wa meningitis, hasa ikiwa CD4 iko chini. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Severe breathlessness or a persistent cough — possible PCP or TB. Urgent assessment',
          sw: 'Kushindwa kupumua kali au kikohozi cha kudumu — uwezekano wa PCP au TB. Tathmini ya haraka',
          sw_mtaa: 'Kushindwa kupumua kali au kikohozi cha kudumu — uwezekano wa PCP au TB. Tathmini ya haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Thoughts of harming yourself in the period after diagnosis — urgent counselling and support; help is available',
          sw: 'Mawazo ya kujidhuru katika kipindi baada ya utambuzi — ushauri na msaada wa haraka; msaada unapatikana',
          sw_mtaa: 'Mawazo ya kujidhuru katika kipindi baada ya utambuzi — counselling na msaada wa haraka; msaada unapatikana',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Frequent early contact with the CTC: adherence support in the first weeks, then a viral load check at around 6 months to confirm suppression, again at 12 months, then yearly when stable. CD4 is monitored especially if it was low at baseline. Every visit includes a TB symptom screen, a side-effect check, and a chance to raise emotional or practical problems. This is the foundation phase — getting adherence solid now sets up decades of good health.',
      sw: 'Mawasiliano ya mara kwa mara ya mapema na CTC: msaada wa kuzingatia katika wiki za kwanza, kisha ukaguzi wa viral load karibu miezi 6 kuthibitisha udhibiti, tena miezi 12, kisha kila mwaka unapokuwa imara. CD4 hufuatiliwa hasa ikiwa ilikuwa chini wakati wa msingi. Kila ziara inajumuisha uchunguzi wa dalili za TB, ukaguzi wa athari, na nafasi ya kuibua matatizo ya kihisia au ya vitendo. Hii ni hatua ya msingi — kupata kuzingatia imara sasa kunaweka miongo ya afya nzuri.',
      sw_mtaa: 'Mawasiliano ya mara kwa mara ya mapema na CTC: adherence support katika wiki za kwanza, kisha viral load check karibu miezi 6 kuthibitisha suppression, tena miezi 12, kisha kila mwaka unapokuwa imara. CD4 inafuatiliwa hasa ikiwa ilikuwa chini wakati wa baseline. Kila ziara inajumuisha uchunguzi wa dalili za TB, side-effect check, na nafasi ya kuibua matatizo ya kihisia au ya vitendo. Hii ni foundation phase — kupata adherence imara sasa kunaweka miongo ya afya nzuri.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 2. ESTABLISHED ON ART
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_on_art',
    severity: 'continuity',
    label: {
      en: 'HIV — established on ART',
      sw: 'VVU — unaendelea na ART',
    },
    presentation: {
      en: 'A person who has been on ART for months or years, ideally with a suppressed (undetectable) viral load. They are clinically well and living a normal life. The focus shifts entirely to maintenance: sustained adherence, routine viral load monitoring, screening for TB and other conditions, managing any side effects or co-existing conditions, and protecting partners through U=U and prevention. This is the long stable phase that should last decades — the work is keeping it boring and uneventful.',
      sw: 'Mtu ambaye amekuwa kwenye ART kwa miezi au miaka, ikiwezekana na viral load iliyodhibitiwa (isiyoonekana). Wako vizuri kikliniki na wanaishi maisha ya kawaida. Mkazo unahamia kabisa kwenye matunzo: kuzingatia kwa kudumu, ufuatiliaji wa kawaida wa viral load, uchunguzi wa TB na hali zingine, kusimamia athari zozote au hali zinazoambatana, na kulinda wenza kupitia U=U na kuzuia. Hii ni hatua ndefu imara ambayo inapaswa kudumu miongo — kazi ni kuiweka ya kuchosha na isiyo na matukio.',
      sw_mtaa: 'Mtu ambaye amekuwa kwenye ART kwa miezi au miaka, ikiwezekana na viral load iliyodhibitiwa (isiyoonekana). Wako vizuri kikliniki na wanaishi maisha ya kawaida. Mkazo unahamia kabisa kwenye maintenance: adherence ya kudumu, ufuatiliaji wa kawaida wa viral load, uchunguzi wa TB na hali zingine, kusimamia athari zozote au hali zinazoambatana, na kulinda wenza kupitia U=U na kuzuia. Hii ni hatua ndefu imara ambayo inapaswa kudumu miongo — kazi ni kuiweka ya kuchosha na isiyo na matukio.',
    },
    recognitionSigns: [
      {
        en: 'On ART for months or years, clinically well',
        sw: 'Kwenye ART kwa miezi au miaka, vizuri kikliniki',
        sw_mtaa: 'Kwenye ART kwa miezi au miaka, vizuri kikliniki',
      },
      {
        en: 'Viral load undetectable on recent monitoring — the goal state',
        sw: 'Viral load isiyoonekana kwenye ufuatiliaji wa hivi karibuni — hali inayolengwa',
        sw_mtaa: 'Viral load isiyoonekana kwenye ufuatiliaji wa hivi karibuni — hali inayolengwa',
      },
      {
        en: 'Living a normal life — working, relationships, family',
        sw: 'Anaishi maisha ya kawaida — kufanya kazi, mahusiano, familia',
        sw_mtaa: 'Anaishi maisha ya kawaida — kufanya kazi, mahusiano, familia',
      },
    ],
    treatmentJourney: {
      en: 'The regimen is usually one pill of TLD once a day, continued indefinitely. Routine viral load monitoring confirms ongoing suppression — typically yearly once stable. Each CTC visit includes a TB symptom screen, weight and blood pressure check, side-effect review, and screening for conditions that become more common with age (diabetes, hypertension, kidney issues, cervical screening for women). Refills are collected regularly, and many stable patients use multi-month dispensing (collecting 3-6 months at once) and community drug pickup points to make life easier. The aim is a stable, low-burden routine that fits invisibly into normal life.',
      sw: 'Regimen kawaida ni kidonge kimoja cha TLD mara moja kwa siku, kinachoendelea bila kikomo. Ufuatiliaji wa kawaida wa viral load huthibitisha udhibiti unaoendelea — kawaida kila mwaka mara unapokuwa imara. Kila ziara ya CTC inajumuisha uchunguzi wa dalili za TB, ukaguzi wa uzito na shinikizo la damu, mapitio ya athari, na uchunguzi wa hali zinazokuwa za kawaida zaidi na umri (kisukari, shinikizo la damu, matatizo ya figo, uchunguzi wa shingo ya kizazi kwa wanawake). Refills huchukuliwa mara kwa mara, na wagonjwa wengi imara hutumia ugavi wa miezi mingi (kuchukua miezi 3-6 kwa wakati mmoja) na vituo vya jamii vya kuchukua dawa kufanya maisha rahisi. Lengo ni utaratibu imara, wenye mzigo mdogo unaoendana bila kuonekana na maisha ya kawaida.',
      sw_mtaa: 'Regimen kawaida ni kidonge kimoja cha TLD mara moja kwa siku, kinachoendelea bila kikomo. Ufuatiliaji wa kawaida wa viral load unathibitisha suppression inayoendelea — kawaida kila mwaka mara unapokuwa imara. Kila ziara ya CTC inajumuisha uchunguzi wa dalili za TB, ukaguzi wa uzito na presha, mapitio ya athari, na uchunguzi wa hali zinazokuwa za kawaida zaidi na umri (kisukari, presha, matatizo ya figo, cervical screening kwa wanawake). Refills zinachukuliwa mara kwa mara, na wagonjwa wengi imara wanatumia multi-month dispensing (kuchukua miezi 3-6 kwa wakati mmoja) na community pickup points kufanya maisha rahisi. Lengo ni utaratibu imara, wenye mzigo mdogo unaoendana bila kuonekana na maisha ya kawaida.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'A detectable viral load on routine monitoring — bring it to the CTC for adherence review and possible repeat testing',
          sw: 'Viral load inayoonekana kwenye ufuatiliaji wa kawaida — lete CTC kwa mapitio ya kuzingatia na uwezekano wa kupima tena',
          sw_mtaa: 'Viral load inayoonekana kwenye ufuatiliaji wa kawaida — lete CTC kwa mapitio ya adherence na uwezekano wa kupima tena',
        },
        urgency: 'soon',
      },
      {
        sign: {
          en: 'New persistent cough, fever, or weight loss — screen for TB urgently',
          sw: 'Kikohozi kipya cha kudumu, homa, au kupungua uzito — pimwa TB kwa haraka',
          sw_mtaa: 'Kikohozi kipya cha kudumu, homa, au kupungua uzito — pimwa TB kwa haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Running low on pills with no refill arranged — contact the CTC before the supply runs out',
          sw: 'Vidonge vinakaribia kuisha bila refill kupangwa — wasiliana na CTC kabla ya ugavi kuisha',
          sw_mtaa: 'Vidonge vinakaribia kuisha bila refill kupangwa — wasiliana na CTC kabla ya stock kuisha',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'Stable patients are typically seen once or twice a year, with a yearly viral load test, ongoing TB screening, and age-appropriate health checks. The continuity message: an undetectable result is not a finish line but a state to maintain — keep taking ART daily, keep appointments, keep refills ahead of need. The TibaHub vault should hold the ART start date, regimen history, every viral load and CD4 result, and any side effects or switches — this record makes care safer at every future clinic, hospital, or referral.',
      sw: 'Wagonjwa imara kawaida huonwa mara moja au mbili kwa mwaka, na kipimo cha viral load cha kila mwaka, uchunguzi wa TB unaoendelea, na ukaguzi wa afya unaofaa umri. Ujumbe wa kuendelea: matokeo yasiyoonekana sio mstari wa kumaliza bali hali ya kudumisha — endelea kuchukua ART kila siku, endelea na miadi, endelea na refills kabla ya hitaji. Vault ya TibaHub inapaswa kushikilia tarehe ya kuanza ART, historia ya regimen, kila matokeo ya viral load na CD4, na athari zozote au mabadiliko — rekodi hii hufanya huduma iwe salama zaidi katika kila kliniki, hospitali, au rufaa ya baadaye.',
      sw_mtaa: 'Wagonjwa imara kawaida wanaonwa mara moja au mbili kwa mwaka, na viral load test ya kila mwaka, uchunguzi wa TB unaoendelea, na ukaguzi wa afya unaofaa umri. Ujumbe wa kuendelea: matokeo yasiyoonekana sio finish line bali hali ya kudumisha — endelea kuchukua ART kila siku, endelea na miadi, endelea na refills kabla ya hitaji. TibaHub vault inapaswa kushikilia tarehe ya kuanza ART, historia ya regimen, kila matokeo ya viral load na CD4, na athari zozote au switches — rekodi hii inafanya huduma iwe salama zaidi katika kila kliniki, hospitali, au rufaa ya baadaye.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 3. TREATMENT FAILURE
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_treatment_failure',
    severity: 'complicated',
    label: {
      en: 'HIV — treatment failure',
      sw: 'VVU — kushindwa kwa matibabu',
    },
    presentation: {
      en: 'A person on ART whose viral load is detectable when it should be suppressed — the marker of possible treatment failure. It is most often discovered on routine viral load monitoring, sometimes alongside a falling CD4 count, weight loss, new infections, or a return of symptoms. The crucial point: a detectable viral load is most commonly caused by adherence gaps, NOT by drug resistance. Treatment failure is only confirmed after supported adherence and a repeat viral load. This stage is about careful, stepwise investigation — not panic, and not an immediate regimen switch.',
      sw: 'Mtu aliye kwenye ART ambaye viral load yake inaonekana wakati inapaswa kudhibitiwa — alama ya uwezekano wa kushindwa kwa matibabu. Mara nyingi hugunduliwa kwenye ufuatiliaji wa kawaida wa viral load, wakati mwingine pamoja na CD4 count inayoshuka, kupungua uzito, maambukizi mapya, au kurudi kwa dalili. Jambo la muhimu: viral load inayoonekana mara nyingi husababishwa na mapengo ya kuzingatia, SIO usugu wa dawa. Kushindwa kwa matibabu huthibitishwa tu baada ya kuzingatia kunakoungwa mkono na viral load inayorudiwa. Hatua hii ni kuhusu uchunguzi wa makini, wa hatua kwa hatua — sio hofu, na sio kubadili regimen mara moja.',
      sw_mtaa: 'Mtu aliye kwenye ART ambaye viral load yake inaonekana wakati inapaswa kudhibitiwa — alama ya uwezekano wa kushindwa kwa matibabu. Mara nyingi inagunduliwa kwenye ufuatiliaji wa kawaida wa viral load, wakati mwingine pamoja na CD4 count inayoshuka, kupungua uzito, maambukizi mapya, au kurudi kwa dalili. Jambo la muhimu: viral load inayoonekana mara nyingi inasababishwa na adherence gaps, SIO drug resistance. Treatment failure inathibitishwa tu baada ya supported adherence na viral load inayorudiwa. Hatua hii ni kuhusu uchunguzi wa makini, wa hatua kwa hatua — sio hofu, na sio kubadili regimen mara moja.',
    },
    recognitionSigns: [
      {
        en: 'A detectable viral load on a person who should be suppressed',
        sw: 'Viral load inayoonekana kwa mtu anayepaswa kudhibitiwa',
        sw_mtaa: 'Viral load inayoonekana kwa mtu anayepaswa kudhibitiwa',
      },
      {
        en: 'A history of missed doses, treatment gaps, or pill-supply problems',
        sw: 'Historia ya dose zilizokoswa, mapengo ya matibabu, au matatizo ya ugavi wa vidonge',
        sw_mtaa: 'Historia ya dose zilizokoswa, mapengo ya matibabu, au matatizo ya stock ya vidonge',
      },
      {
        en: 'Sometimes a falling CD4, weight loss, or a return of symptoms',
        sw: 'Wakati mwingine CD4 inayoshuka, kupungua uzito, au kurudi kwa dalili',
        sw_mtaa: 'Wakati mwingine CD4 inayoshuka, kupungua uzito, au kurudi kwa dalili',
      },
    ],
    treatmentJourney: {
      en: 'The stepwise pathway: first, intensive adherence counselling — identifying and solving the real reason for missed doses (stockouts, side effects, depression, stigma, travel, disclosure problems, alcohol). Second, a repeat viral load test after about 3 months of supported adherence. If the repeat is suppressed, the original regimen continues — the problem was adherence, now fixed. If the repeat is still high, this confirms treatment failure, and the clinician considers drug-resistance testing and a switch to a second-line regimen. Throughout, ART is NOT stopped — the person stays on treatment while the investigation proceeds. While viral load is detectable, condoms should be used as the person may be infectious again.',
      sw: 'Njia ya hatua kwa hatua: kwanza, ushauri mkubwa wa kuzingatia — kutambua na kutatua sababu halisi ya dose zilizokoswa (kuishiwa kwa dawa, athari, unyogovu, unyanyapaa, safari, matatizo ya kufichua, pombe). Pili, kipimo cha viral load kinachorudiwa baada ya miezi 3 ya kuzingatia kunakoungwa mkono. Ikiwa kinachorudiwa kimedhibitiwa, regimen ya awali inaendelea — tatizo lilikuwa kuzingatia, sasa limerekebishwa. Ikiwa kinachorudiwa bado kiko juu, hii inathibitisha kushindwa kwa matibabu, na daktari hufikiria upimaji wa usugu wa dawa na kubadili kwa regimen ya mstari wa pili. Katika hatua zote, ART HAISIMAMISHWI — mtu hubaki kwenye matibabu wakati uchunguzi unaendelea. Wakati viral load inaonekana, kondomu zinapaswa kutumika kwa kuwa mtu anaweza kuwa anaambukiza tena.',
      sw_mtaa: 'Njia ya hatua kwa hatua: kwanza, adherence counselling kubwa — kutambua na kutatua sababu halisi ya dose zilizokoswa (stockouts, athari, depression, stigma, safari, matatizo ya kufichua, pombe). Pili, viral load test inayorudiwa baada ya miezi 3 ya supported adherence. Ikiwa inayorudiwa imedhibitiwa, regimen ya awali inaendelea — tatizo lilikuwa adherence, sasa limerekebishwa. Ikiwa inayorudiwa bado iko juu, hii inathibitisha treatment failure, na daktari anafikiria drug-resistance testing na kubadili kwa second-line regimen. Katika hatua zote, ART HAISIMAMISHWI — mtu anabaki kwenye matibabu wakati uchunguzi unaendelea. Wakati viral load inaonekana, kondomu zinapaswa kutumika kwa kuwa mtu anaweza kuwa anaambukiza tena.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'New opportunistic infection symptoms (severe cough, headache, breathlessness) alongside a detectable viral load — urgent assessment',
          sw: 'Dalili mpya za maambukizi nyemelezi (kikohozi kikali, kichwa, kushindwa kupumua) pamoja na viral load inayoonekana — tathmini ya haraka',
          sw_mtaa: 'Dalili mpya za maambukizi nyemelezi (kikohozi kikali, kichwa, kushindwa kupumua) pamoja na viral load inayoonekana — tathmini ya haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'A rapidly falling CD4 count — the immune system is losing ground; needs prompt clinical review',
          sw: 'CD4 count inayoshuka kwa kasi — mfumo wa kinga unapoteza nafasi; unahitaji ukaguzi wa haraka wa kliniki',
          sw_mtaa: 'CD4 count inayoshuka kwa kasi — kinga inapoteza nafasi; inahitaji ukaguzi wa haraka wa kliniki',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Thoughts of giving up on treatment, or of self-harm — urgent counselling; treatment failure is recoverable',
          sw: 'Mawazo ya kuacha matibabu, au ya kujidhuru — ushauri wa haraka; kushindwa kwa matibabu kunarekebishika',
          sw_mtaa: 'Mawazo ya kuacha matibabu, au ya kujidhuru — counselling ya haraka; treatment failure inarekebishika',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Close follow-up during the adherence-support period, then a clear decision point at the repeat viral load. If switched to second-line ART, monitoring intensifies again — viral load is rechecked to confirm the new regimen is working, and adherence support continues. The key continuity message for the patient: treatment failure is usually a solvable adherence problem, not a personal failure, and the great majority of people return to an undetectable viral load once the underlying barrier is addressed. Every viral load result and any regimen change should be recorded in the vault.',
      sw: 'Ufuatiliaji wa karibu wakati wa kipindi cha msaada wa kuzingatia, kisha hatua ya wazi ya uamuzi kwenye viral load inayorudiwa. Ikiwa imebadilishwa kwa ART ya mstari wa pili, ufuatiliaji huongezeka tena — viral load hupimwa tena kuthibitisha regimen mpya inafanya kazi, na msaada wa kuzingatia unaendelea. Ujumbe muhimu wa kuendelea kwa mgonjwa: kushindwa kwa matibabu kawaida ni tatizo la kuzingatia linaloweza kutatuliwa, sio kushindwa binafsi, na wengi sana hurudi kwenye viral load isiyoonekana mara kizuizi cha msingi kinaposhughulikiwa. Kila matokeo ya viral load na mabadiliko yoyote ya regimen yanapaswa kurekodiwa kwenye vault.',
      sw_mtaa: 'Ufuatiliaji wa karibu wakati wa kipindi cha adherence support, kisha decision point ya wazi kwenye viral load inayorudiwa. Ikiwa imebadilishwa kwa second-line ART, ufuatiliaji unaongezeka tena — viral load inapimwa tena kuthibitisha regimen mpya inafanya kazi, na adherence support inaendelea. Ujumbe muhimu wa kuendelea kwa mgonjwa: treatment failure kawaida ni tatizo la adherence linaloweza kutatuliwa, sio kushindwa binafsi, na wengi sana wanarudi kwenye undetectable viral load mara underlying barrier inaposhughulikiwa. Kila matokeo ya viral load na mabadiliko yoyote ya regimen yanapaswa kurekodiwa kwenye vault.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 4. ADVANCED HIV DISEASE
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_advanced',
    severity: 'critical',
    label: {
      en: 'Advanced HIV disease (low CD4)',
      sw: 'VVU iliyokomaa (CD4 ya chini)',
    },
    presentation: {
      en: 'A person whose immune system is significantly weakened — usually a CD4 count below 200, or an AIDS-defining illness. This happens with late diagnosis, or after a long treatment interruption. The person is highly vulnerable to opportunistic infections: TB, cryptococcal meningitis, PCP, severe candidiasis, toxoplasmosis, and others. They may present unwell — with fever, weight loss, cough, headache, breathlessness, or difficulty swallowing. Advanced HIV disease is a medical priority: it carries real risk, but with the right package of care most people recover and rebuild their immune system.',
      sw: 'Mtu ambaye mfumo wake wa kinga umedhoofika sana — kawaida CD4 count chini ya 200, au ugonjwa unaofafanua UKIMWI. Hii hutokea na utambuzi wa kuchelewa, au baada ya kukatiza matibabu kwa muda mrefu. Mtu yuko hatarini sana kwa maambukizi nyemelezi: TB, cryptococcal meningitis, PCP, candidiasis kali, toxoplasmosis, na mengine. Wanaweza kujitokeza wakiwa si wazima — na homa, kupungua uzito, kikohozi, kichwa, kushindwa kupumua, au ugumu wa kumeza. VVU iliyokomaa ni kipaumbele cha kimatibabu: ina hatari halisi, lakini kwa pakti sahihi ya huduma watu wengi hupona na kujenga upya mfumo wao wa kinga.',
      sw_mtaa: 'Mtu ambaye kinga yake imedhoofika sana — kawaida CD4 count chini ya 200, au ugonjwa unaofafanua UKIMWI. Hii inatokea na utambuzi wa kuchelewa, au baada ya kukatiza matibabu kwa muda mrefu. Mtu yuko hatarini sana kwa maambukizi nyemelezi: TB, cryptococcal meningitis, PCP, candidiasis kali, toxoplasmosis, na mengine. Wanaweza kujitokeza wakiwa si wazima — na homa, kupungua uzito, kikohozi, kichwa, kushindwa kupumua, au ugumu wa kumeza. Advanced HIV disease ni kipaumbele cha kimatibabu: ina hatari halisi, lakini kwa package sahihi ya huduma watu wengi wanapona na kujenga upya kinga yao.',
    },
    recognitionSigns: [
      {
        en: 'A CD4 count below 200, or an AIDS-defining illness',
        sw: 'CD4 count chini ya 200, au ugonjwa unaofafanua UKIMWI',
        sw_mtaa: 'CD4 count chini ya 200, au ugonjwa unaofafanua UKIMWI',
      },
      {
        en: 'Unwell — fever, weight loss, cough, headache, breathlessness, difficulty swallowing',
        sw: 'Si mzima — homa, kupungua uzito, kikohozi, kichwa, kushindwa kupumua, ugumu wa kumeza',
        sw_mtaa: 'Si mzima — homa, kupungua uzito, kikohozi, kichwa, kushindwa kupumua, ugumu wa kumeza',
      },
      {
        en: 'Often a history of late diagnosis or a long treatment interruption',
        sw: 'Mara nyingi historia ya utambuzi wa kuchelewa au kukatiza matibabu kwa muda mrefu',
        sw_mtaa: 'Mara nyingi historia ya utambuzi wa kuchelewa au kukatiza matibabu kwa muda mrefu',
      },
    ],
    treatmentJourney: {
      en: 'Advanced HIV disease has a defined package of care. It includes: screening for the major opportunistic infections — TB (sputum GeneXpert, urine LF-LAM), cryptococcal infection (a blood test called CrAg), and assessment for PCP and others; treating any OI that is found; co-trimoxazole preventive therapy; and starting or restarting ART — but with careful timing. ART is usually started rapidly, EXCEPT when there is cryptococcal or TB meningitis, where ART is deliberately delayed by a few weeks to reduce the risk of IRIS (a dangerous inflammatory reaction as the immune system recovers). The person is often managed in hospital initially if seriously unwell. With this package, even people who present very late can recover — the CD4 count rises again over the following months and years.',
      sw: 'VVU iliyokomaa ina pakti iliyofafanuliwa ya huduma. Inajumuisha: uchunguzi wa maambukizi nyemelezi makubwa — TB (sputum GeneXpert, urine LF-LAM), maambukizi ya cryptococcal (kipimo cha damu kinachoitwa CrAg), na tathmini ya PCP na mengine; kutibu OI yoyote inayopatikana; tiba ya kuzuia ya co-trimoxazole; na kuanza au kuanza upya ART — lakini kwa wakati wa makini. ART kawaida huanzishwa haraka, ISIPOKUWA wakati kuna cryptococcal au TB meningitis, ambapo ART huchelewa kwa makusudi kwa wiki chache kupunguza hatari ya IRIS (athari hatari ya uvimbe wakati mfumo wa kinga unapona). Mtu mara nyingi husimamiwa hospitalini awali ikiwa si mzima sana. Kwa pakti hii, hata watu wanaojitokeza kuchelewa sana wanaweza kupona — CD4 count hupanda tena katika miezi na miaka inayofuata.',
      sw_mtaa: 'Advanced HIV disease ina package iliyofafanuliwa ya huduma. Inajumuisha: uchunguzi wa maambukizi nyemelezi makubwa — TB (sputum GeneXpert, urine LF-LAM), maambukizi ya cryptococcal (kipimo cha damu kinachoitwa CrAg), na tathmini ya PCP na mengine; kutibu OI yoyote inayopatikana; co-trimoxazole preventive therapy; na kuanza au kuanza upya ART — lakini kwa wakati wa makini. ART kawaida inaanzishwa haraka, ISIPOKUWA wakati kuna cryptococcal au TB meningitis, ambapo ART inacheleweshwa kwa makusudi kwa wiki chache kupunguza hatari ya IRIS (athari hatari ya uvimbe wakati kinga inapona). Mtu mara nyingi anasimamiwa hospitalini awali ikiwa si mzima sana. Kwa package hii, hata watu wanaojitokeza kuchelewa sana wanaweza kupona — CD4 count inapanda tena katika miezi na miaka inayofuata.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe headache, neck stiffness, confusion, or seizures — possible cryptococcal or TB meningitis. EMERGENCY',
          sw: 'Kichwa kikali, ukakavu wa shingo, kuchanganyikiwa, au kifafa — uwezekano wa cryptococcal au TB meningitis. DHARURA',
          sw_mtaa: 'Kichwa kikali, shingo ngumu, kuchanganyikiwa, au kifafa — uwezekano wa cryptococcal au TB meningitis. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Severe breathlessness or rapid breathing — possible PCP or severe pneumonia. EMERGENCY',
          sw: 'Kushindwa kupumua kali au kupumua haraka — uwezekano wa PCP au nimonia kali. DHARURA',
          sw_mtaa: 'Kushindwa kupumua kali au kupumua haraka — uwezekano wa PCP au nimonia kali. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Inability to eat or drink, severe weakness, or collapse — needs emergency hospital assessment',
          sw: 'Kushindwa kula au kunywa, udhaifu mkubwa, au kuanguka — kunahitaji tathmini ya dharura ya hospitali',
          sw_mtaa: 'Kushindwa kula au kunywa, udhaifu mkubwa, au kuanguka — kunahitaji tathmini ya dharura ya hospitali',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Intensive follow-up initially — often hospital-based or with frequent clinic visits — until the acute illness is controlled and ART is established. As the immune system recovers, follow-up gradually returns to the standard CTC schedule. Watch for IRIS in the early weeks of ART. CD4 is monitored to confirm recovery; viral load confirms the ART is working. The continuity message: advanced HIV disease is a serious but recoverable stage — the people who do best are those who complete OI treatment, stay on ART, and keep every follow-up appointment during the rebuilding phase.',
      sw: 'Ufuatiliaji mkubwa awali — mara nyingi wa hospitalini au na ziara za mara kwa mara za kliniki — hadi ugonjwa wa papo hapo udhibitiwe na ART iimarishwe. Kadri mfumo wa kinga unavyopona, ufuatiliaji hurudi polepole kwenye ratiba ya kawaida ya CTC. Angalia IRIS katika wiki za mapema za ART. CD4 hufuatiliwa kuthibitisha kupona; viral load huthibitisha ART inafanya kazi. Ujumbe wa kuendelea: VVU iliyokomaa ni hatua muhimu lakini inayorekebishika — watu wanaofanya vizuri zaidi ni wale wanaomaliza matibabu ya OI, kubaki kwenye ART, na kuweka kila miadi ya ufuatiliaji wakati wa hatua ya kujenga upya.',
      sw_mtaa: 'Ufuatiliaji mkubwa awali — mara nyingi wa hospitalini au na ziara za mara kwa mara za kliniki — hadi ugonjwa wa papo hapo udhibitiwe na ART iimarishwe. Kadri kinga inavyopona, ufuatiliaji unarudi polepole kwenye ratiba ya kawaida ya CTC. Angalia IRIS katika wiki za mapema za ART. CD4 inafuatiliwa kuthibitisha kupona; viral load inathibitisha ART inafanya kazi. Ujumbe wa kuendelea: advanced HIV disease ni hatua muhimu lakini inayorekebishika — watu wanaofanya vizuri zaidi ni wale wanaomaliza matibabu ya OI, kubaki kwenye ART, na kuweka kila miadi ya ufuatiliaji wakati wa hatua ya kujenga upya.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024'), src('MUHIMBILI_PROTOCOLS')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 5. OPPORTUNISTIC INFECTIONS
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_oi',
    severity: 'complicated',
    label: {
      en: 'HIV — opportunistic infections',
      sw: 'VVU — maambukizi nyemelezi',
    },
    presentation: {
      en: 'Infections that take advantage of a weakened immune system — they are "opportunistic." They are most common when CD4 is low (especially below 200) and are often the first sign that someone has HIV, or that ART has been interrupted. The major ones in Tanzania: TB (the most common, and a leading cause of death — see the dedicated TB guidance), cryptococcal meningitis (severe headache, fever, neck stiffness, confusion), PCP / Pneumocystis pneumonia (worsening breathlessness, dry cough, fever), oral and oesophageal candidiasis (white mouth patches, painful swallowing), toxoplasmosis (headache, seizures, weakness on one side), Kaposi sarcoma (purple skin or mouth lesions), and CMV (vision problems). Each is dangerous if missed but treatable when caught.',
      sw: 'Maambukizi yanayotumia fursa ya mfumo wa kinga uliodhoofika — ni "nyemelezi." Ni ya kawaida zaidi wakati CD4 iko chini (hasa chini ya 200) na mara nyingi ni ishara ya kwanza kwamba mtu ana VVU, au kwamba ART imekatizwa. Makubwa Tanzania: TB (ya kawaida zaidi, na sababu kuu ya vifo — ona muongozo maalum wa TB), cryptococcal meningitis (kichwa kikali, homa, ukakavu wa shingo, kuchanganyikiwa), PCP / Pneumocystis pneumonia (kushindwa kupumua kunakozidi, kikohozi kikavu, homa), candidiasis ya mdomo na umio (mabaka meupe mdomoni, kumeza kwa maumivu), toxoplasmosis (kichwa, kifafa, udhaifu upande mmoja), Kaposi sarcoma (vidonda vya zambarau vya ngozi au mdomo), na CMV (matatizo ya kuona). Kila moja ni hatari ikikoswa lakini inatibika ikipatikana.',
      sw_mtaa: 'Maambukizi yanayotumia fursa ya kinga iliyodhoofika — ni "nyemelezi." Ni ya kawaida zaidi wakati CD4 iko chini (hasa chini ya 200) na mara nyingi ni ishara ya kwanza kwamba mtu ana VVU, au kwamba ART imekatizwa. Makubwa Tanzania: TB (ya kawaida zaidi, na sababu kuu ya vifo — ona muongozo maalum wa TB), cryptococcal meningitis (kichwa kikali, homa, shingo ngumu, kuchanganyikiwa), PCP / Pneumocystis pneumonia (kushindwa kupumua kunakozidi, kikohozi kikavu, homa), candidiasis ya mdomo na umio (mabaka meupe mdomoni, kumeza kwa maumivu), toxoplasmosis (kichwa, kifafa, udhaifu upande mmoja), Kaposi sarcoma (vidonda vya zambarau vya ngozi au mdomo), na CMV (matatizo ya kuona). Kila moja ni hatari ikikoswa lakini inatibika ikipatikana.',
    },
    recognitionSigns: [
      {
        en: 'Severe headache, neck stiffness, confusion — suggests cryptococcal or TB meningitis',
        sw: 'Kichwa kikali, ukakavu wa shingo, kuchanganyikiwa — inaashiria cryptococcal au TB meningitis',
        sw_mtaa: 'Kichwa kikali, shingo ngumu, kuchanganyikiwa — inaashiria cryptococcal au TB meningitis',
      },
      {
        en: 'Worsening breathlessness with a dry cough — suggests PCP',
        sw: 'Kushindwa kupumua kunakozidi na kikohozi kikavu — inaashiria PCP',
        sw_mtaa: 'Kushindwa kupumua kunakozidi na kikohozi kikavu — inaashiria PCP',
      },
      {
        en: 'White patches in the mouth, painful swallowing — suggests candidiasis',
        sw: 'Mabaka meupe mdomoni, kumeza kwa maumivu — inaashiria candidiasis',
        sw_mtaa: 'Mabaka meupe mdomoni, kumeza kwa maumivu — inaashiria candidiasis',
      },
      {
        en: 'Cough over 2 weeks, night sweats, weight loss — suggests TB (see the TB guidance)',
        sw: 'Kikohozi zaidi ya wiki 2, jasho la usiku, kupungua uzito — inaashiria TB (ona muongozo wa TB)',
        sw_mtaa: 'Kikohozi zaidi ya wiki 2, jasho la usiku, kupungua uzito — inaashiria TB (ona muongozo wa TB)',
      },
    ],
    treatmentJourney: {
      en: 'Each opportunistic infection has its own specific treatment, delivered by clinicians: cryptococcal meningitis needs antifungal medicines and often repeated lumbar punctures to relieve pressure; PCP is treated with high-dose co-trimoxazole, sometimes with steroids; candidiasis responds to antifungal treatment; TB follows the standard RHZE pathway (see the TB guidance). Alongside treating the specific infection, two things matter: getting onto effective ART (so the immune system rebuilds and OIs stop recurring) and using co-trimoxazole preventive therapy. ART timing is handled carefully — for most OIs it is started within about 2 weeks, but for cryptococcal and TB meningitis it is delayed several weeks to avoid a dangerous IRIS reaction. Many OIs need initial hospital care. The lasting solution to opportunistic infections is a recovered immune system — which means staying on ART for life.',
      sw: 'Kila maambukizi nyemelezi yana matibabu yake maalum, yanayotolewa na madaktari: cryptococcal meningitis inahitaji dawa za antifungal na mara nyingi lumbar punctures zinazorudiwa kupunguza shinikizo; PCP hutibiwa kwa co-trimoxazole ya dose kubwa, wakati mwingine na steroids; candidiasis hujibu matibabu ya antifungal; TB hufuata njia ya kawaida ya RHZE (ona muongozo wa TB). Pamoja na kutibu maambukizi maalum, mambo mawili yanajali: kupata ART yenye ufanisi (ili mfumo wa kinga ujenge upya na OIs ziache kurudia) na kutumia co-trimoxazole preventive therapy. Wakati wa ART hushughulikiwa kwa makini — kwa OIs nyingi huanzishwa ndani ya karibu wiki 2, lakini kwa cryptococcal na TB meningitis huchelewa wiki kadhaa kuepuka athari hatari ya IRIS. OIs nyingi zinahitaji huduma ya awali ya hospitali. Suluhisho la kudumu kwa maambukizi nyemelezi ni mfumo wa kinga uliopona — ambayo inamaanisha kubaki kwenye ART maisha yote.',
      sw_mtaa: 'Kila maambukizi nyemelezi yana matibabu yake maalum, yanayotolewa na madaktari: cryptococcal meningitis inahitaji dawa za antifungal na mara nyingi lumbar punctures zinazorudiwa kupunguza shinikizo; PCP inatibiwa kwa co-trimoxazole ya dose kubwa, wakati mwingine na steroids; candidiasis inajibu matibabu ya antifungal; TB inafuata njia ya kawaida ya RHZE (ona muongozo wa TB). Pamoja na kutibu maambukizi maalum, mambo mawili yanajali: kupata ART yenye ufanisi (ili kinga ijenge upya na OIs ziache kurudia) na kutumia co-trimoxazole preventive therapy. Wakati wa ART unashughulikiwa kwa makini — kwa OIs nyingi inaanzishwa ndani ya karibu wiki 2, lakini kwa cryptococcal na TB meningitis inacheleweshwa wiki kadhaa kuepuka athari hatari ya IRIS. OIs nyingi zinahitaji huduma ya awali ya hospitali. Suluhisho la kudumu kwa maambukizi nyemelezi ni kinga iliyopona — ambayo inamaanisha kubaki kwenye ART maisha yote.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe headache with confusion, neck stiffness, or seizures — possible meningitis. EMERGENCY',
          sw: 'Kichwa kikali na kuchanganyikiwa, ukakavu wa shingo, au kifafa — uwezekano wa meningitis. DHARURA',
          sw_mtaa: 'Kichwa kikali na kuchanganyikiwa, shingo ngumu, au kifafa — uwezekano wa meningitis. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Severe or rapidly worsening breathlessness — possible PCP. EMERGENCY',
          sw: 'Kushindwa kupumua kali au kunakozidi haraka — uwezekano wa PCP. DHARURA',
          sw_mtaa: 'Kushindwa kupumua kali au kunakozidi haraka — uwezekano wa PCP. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Weakness on one side of the body, or new seizures — possible toxoplasmosis or another brain infection. EMERGENCY',
          sw: 'Udhaifu upande mmoja wa mwili, au kifafa kipya — uwezekano wa toxoplasmosis au maambukizi mengine ya ubongo. DHARURA',
          sw_mtaa: 'Udhaifu upande mmoja wa mwili, au kifafa kipya — uwezekano wa toxoplasmosis au maambukizi mengine ya ubongo. DHARURA',
        },
        urgency: 'emergency',
      },
    ],
    followUp: {
      en: 'Follow-up depends on the specific infection but is intensive during treatment, then transitions back to routine CTC care as the person recovers and ART takes effect. Some OIs need a period of "maintenance" or "secondary prevention" treatment (continuing a lower dose to stop the infection returning) until the CD4 count has recovered well. The big-picture message: opportunistic infections are a sign the immune system needs rebuilding — treat the infection, get firmly onto ART, take co-trimoxazole as prescribed, and the long-term risk of further OIs falls as the CD4 count climbs.',
      sw: 'Ufuatiliaji hutegemea maambukizi maalum lakini ni mkubwa wakati wa matibabu, kisha hubadilika kurudi kwenye huduma ya kawaida ya CTC kadri mtu anavyopona na ART inavyofanya kazi. OIs zingine zinahitaji kipindi cha matibabu ya "matunzo" au "kuzuia kwa pili" (kuendelea na dose ndogo kuzuia maambukizi kurudi) hadi CD4 count itakapopona vizuri. Ujumbe wa picha kubwa: maambukizi nyemelezi ni ishara mfumo wa kinga unahitaji kujengwa upya — tibu maambukizi, pata ART imara, chukua co-trimoxazole kama ilivyoagizwa, na hatari ya muda mrefu ya OIs zaidi inashuka kadri CD4 count inavyopanda.',
      sw_mtaa: 'Ufuatiliaji unategemea maambukizi maalum lakini ni mkubwa wakati wa matibabu, kisha unabadilika kurudi kwenye huduma ya kawaida ya CTC kadri mtu anavyopona na ART inavyofanya kazi. OIs zingine zinahitaji kipindi cha matibabu ya "maintenance" au "secondary prevention" (kuendelea na dose ndogo kuzuia maambukizi kurudi) hadi CD4 count itakapopona vizuri. Ujumbe wa picha kubwa: maambukizi nyemelezi ni ishara kinga inahitaji kujengwa upya — tibu maambukizi, pata ART imara, chukua co-trimoxazole kama ilivyoagizwa, na hatari ya muda mrefu ya OIs zaidi inashuka kadri CD4 count inavyopanda.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024'), src('MUHIMBILI_PROTOCOLS')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 6. PMTCT — HIV IN PREGNANCY
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_pmtct',
    severity: 'prevention',
    population: 'pregnancy',
    label: {
      en: 'HIV in pregnancy — PMTCT',
      sw: 'VVU wakati wa mimba — PMTCT',
    },
    presentation: {
      en: 'A pregnant woman living with HIV — either diagnosed before pregnancy, or newly diagnosed during routine antenatal HIV testing. PMTCT (Prevention of Mother-to-Child Transmission) is one of the great successes of modern HIV care: with the right steps, the risk of passing HIV to the baby drops to under 1-2%. The woman may be newly diagnosed and emotionally shaken, or already established on ART. Either way, the pregnancy is an opportunity — engaged PMTCT care protects the baby, the mother, and future children.',
      sw: 'Mwanamke mjamzito anayeishi na VVU — ama aliyegundulika kabla ya mimba, au aliyegundulika hivi karibuni wakati wa upimaji wa kawaida wa VVU wa ujauzito. PMTCT (Kuzuia Maambukizi kutoka Mama kwenda Mtoto) ni mojawapo ya mafanikio makubwa ya huduma ya kisasa ya VVU: kwa hatua sahihi, hatari ya kupitisha VVU kwa mtoto inashuka chini ya 1-2%. Mwanamke anaweza kuwa amegundulika hivi karibuni na kushtushwa kihisia, au tayari ameimarishwa kwenye ART. Vyovyote vile, mimba ni fursa — huduma ya PMTCT inayoshirikiwa hulinda mtoto, mama, na watoto wa baadaye.',
      sw_mtaa: 'Mwanamke mjamzito anayeishi na VVU — ama aliyegundulika kabla ya mimba, au aliyegundulika hivi karibuni wakati wa upimaji wa kawaida wa VVU wa ujauzito. PMTCT (Kuzuia Maambukizi kutoka Mama kwenda Mtoto) ni mojawapo ya mafanikio makubwa ya huduma ya kisasa ya VVU: kwa hatua sahihi, hatari ya kupitisha VVU kwa mtoto inashuka chini ya 1-2%. Mwanamke anaweza kuwa amegundulika hivi karibuni na kushtushwa kihisia, au tayari ameimarishwa kwenye ART. Vyovyote vile, mimba ni fursa — huduma ya PMTCT inayoshirikiwa inalinda mtoto, mama, na watoto wa baadaye.',
    },
    recognitionSigns: [
      {
        en: 'Pregnant and HIV-positive — diagnosed before or during this pregnancy',
        sw: 'Mjamzito na VVU chanya — aliyegundulika kabla au wakati wa mimba hii',
        sw_mtaa: 'Mjamzito na VVU chanya — aliyegundulika kabla au wakati wa mimba hii',
      },
      {
        en: 'May be already on ART, or starting it for the first time in pregnancy',
        sw: 'Anaweza kuwa tayari kwenye ART, au anaanza kwa mara ya kwanza katika mimba',
        sw_mtaa: 'Anaweza kuwa tayari kwenye ART, au anaanza kwa mara ya kwanza katika mimba',
      },
      {
        en: 'Engaged with antenatal care — the entry point for PMTCT',
        sw: 'Anashiriki na huduma ya ujauzito — mlango wa kuingia wa PMTCT',
        sw_mtaa: 'Anashiriki na huduma ya ujauzito — mlango wa kuingia wa PMTCT',
      },
    ],
    treatmentJourney: {
      en: 'The PMTCT package runs across pregnancy, delivery, and breastfeeding. During pregnancy: start ART immediately if newly diagnosed, or continue it if already on treatment — TLD is used in pregnancy — and take it every single day; the goal is an undetectable viral load before delivery. At delivery: deliver in a health facility, where the team knows the HIV status and can manage safely. After birth: the baby receives preventive ARV medicine (commonly nevirapine, sometimes with zidovudine) for several weeks, and is tested for HIV at intervals — an early test around 4-6 weeks, with later confirmatory testing. Feeding: in Tanzania, breastfeeding is recommended when the mother is on ART with good adherence — exclusively for the first 6 months, because mixed feeding raises transmission risk. Throughout, the mother stays on ART for her own health for life — PMTCT is not a course that ends after delivery.',
      sw: 'Pakti ya PMTCT inaendesha katika mimba, kujifungua, na kunyonyesha. Wakati wa mimba: anza ART mara moja ikiwa umegundulika hivi karibuni, au endelea nayo ikiwa tayari kwenye matibabu — TLD hutumika katika mimba — na uichukue kila siku; lengo ni viral load isiyoonekana kabla ya kujifungua. Wakati wa kujifungua: jifungue katika kituo cha afya, ambapo timu inajua hali ya VVU na inaweza kusimamia kwa usalama. Baada ya kuzaliwa: mtoto hupokea dawa ya ARV ya kuzuia (kawaida nevirapine, wakati mwingine na zidovudine) kwa wiki kadhaa, na hupimwa VVU kwa vipindi — kipimo cha mapema karibu wiki 4-6, na upimaji wa uthibitisho baadaye. Kulisha: Tanzania, kunyonyesha kunashauriwa wakati mama yuko kwenye ART na anazingatia vizuri — kwa maziwa ya mama pekee kwa miezi 6 ya kwanza, kwa sababu kuchanganya chakula huongeza hatari ya maambukizi. Katika hatua zote, mama hubaki kwenye ART kwa afya yake mwenyewe maisha yote — PMTCT sio kozi inayoisha baada ya kujifungua.',
      sw_mtaa: 'PMTCT package inaendesha katika mimba, kujifungua, na kunyonyesha. Wakati wa mimba: anza ART mara moja ikiwa umegundulika hivi karibuni, au endelea nayo ikiwa tayari kwenye matibabu — TLD inatumika katika mimba — na uichukue kila siku; lengo ni viral load isiyoonekana kabla ya kujifungua. Wakati wa kujifungua: jifungue katika kituo cha afya, ambapo timu inajua hali ya VVU na inaweza kusimamia kwa usalama. Baada ya kuzaliwa: mtoto anapokea dawa ya ARV ya kuzuia (kawaida nevirapine, wakati mwingine na zidovudine) kwa wiki kadhaa, na anapimwa VVU kwa vipindi — kipimo cha mapema karibu wiki 4-6, na upimaji wa uthibitisho baadaye. Kulisha: Tanzania, kunyonyesha kunashauriwa wakati mama yuko kwenye ART na anazingatia vizuri — kwa maziwa ya mama pekee miezi 6 ya kwanza, kwa sababu kuchanganya chakula kunaongeza hatari ya maambukizi. Katika hatua zote, mama anabaki kwenye ART kwa afya yake mwenyewe maisha yote — PMTCT sio kozi inayoisha baada ya kujifungua.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'Severe vomiting that prevents taking ART — risk of treatment interruption; contact ANC/CTC promptly',
          sw: 'Kutapika kali kunakozuia kuchukua ART — hatari ya kukatiza matibabu; wasiliana na ANC/CTC haraka',
          sw_mtaa: 'Kutapika kali kunakozuia kuchukua ART — hatari ya kukatiza matibabu; wasiliana na ANC/CTC haraka',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Fever, cough, or feeling unwell in pregnancy — needs prompt assessment, including for TB and other infections',
          sw: 'Homa, kikohozi, au kujisikia si mzima katika mimba — kunahitaji tathmini ya haraka, ikiwa ni pamoja na TB na maambukizi mengine',
          sw_mtaa: 'Homa, kikohozi, au kujisikia si mzima katika mimba — kunahitaji tathmini ya haraka, ikiwa ni pamoja na TB na maambukizi mengine',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Reduced fetal movements or signs of labour complications — go to the health facility',
          sw: 'Mwendo wa fetasi uliopungua au ishara za matatizo ya leba — nenda kituo cha afya',
          sw_mtaa: 'Mwendo wa fetasi uliopungua au ishara za matatizo ya leba — nenda kituo cha afya',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Combined antenatal and CTC follow-up through pregnancy, with monitoring of viral load and the mother\'s wellbeing. After delivery: the mother continues lifelong ART on the standard CTC schedule, and the HIV-exposed infant is followed on its own schedule — preventive medicine, HIV testing at intervals, growth monitoring, and a final test after breastfeeding ends to confirm the baby is HIV-negative. The continuity message: PMTCT works — the great majority of babies born to mothers in PMTCT care are HIV-negative — and the mother\'s own ART continues for life, protecting her health and any future pregnancies.',
      sw: 'Ufuatiliaji wa pamoja wa ujauzito na CTC katika mimba, na ufuatiliaji wa viral load na ustawi wa mama. Baada ya kujifungua: mama huendelea na ART ya maisha kwenye ratiba ya kawaida ya CTC, na mtoto aliyeathiriwa na VVU hufuatiliwa katika ratiba yake mwenyewe — dawa ya kuzuia, upimaji wa VVU kwa vipindi, ufuatiliaji wa ukuaji, na kipimo cha mwisho baada ya kunyonyesha kuisha kuthibitisha mtoto hana VVU. Ujumbe wa kuendelea: PMTCT inafanya kazi — wengi sana wa watoto wanaozaliwa na mama walio katika huduma ya PMTCT hawana VVU — na ART ya mama mwenyewe inaendelea maisha yote, ikilinda afya yake na mimba zozote za baadaye.',
      sw_mtaa: 'Ufuatiliaji wa pamoja wa ujauzito na CTC katika mimba, na ufuatiliaji wa viral load na ustawi wa mama. Baada ya kujifungua: mama anaendelea na ART ya maisha kwenye ratiba ya kawaida ya CTC, na mtoto aliyeathiriwa na VVU anafuatiliwa katika ratiba yake mwenyewe — dawa ya kuzuia, upimaji wa VVU kwa vipindi, ufuatiliaji wa ukuaji, na kipimo cha mwisho baada ya kunyonyesha kuisha kuthibitisha mtoto hana VVU. Ujumbe wa kuendelea: PMTCT inafanya kazi — wengi sana wa watoto wanaozaliwa na mama walio katika huduma ya PMTCT hawana VVU — na ART ya mama mwenyewe inaendelea maisha yote, ikilinda afya yake na mimba zozote za baadaye.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024'), src('MOH_TZ_MATERNAL_2024')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 7. HIV IN CHILDREN
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_pediatric',
    severity: 'complicated',
    population: 'pediatric',
    label: {
      en: 'HIV in children',
      sw: 'VVU kwa watoto',
    },
    presentation: {
      en: 'A child living with HIV — most often acquired from the mother around pregnancy, birth, or breastfeeding, sometimes diagnosed in infancy and sometimes later in childhood. Infants and young children can become unwell faster than adults, so early diagnosis and early ART are critical. A child may present well (diagnosed through testing of an HIV-exposed infant) or unwell (poor growth, recurrent infections, developmental delay). With timely ART and good care, children with HIV grow up healthy and reach adulthood — but their care needs child-specific attention to diagnosis, dosing, growth, immunisation, and disclosure.',
      sw: 'Mtoto anayeishi na VVU — mara nyingi alipata kutoka kwa mama karibu na mimba, kuzaliwa, au kunyonyesha, wakati mwingine hugundulika utotoni na wakati mwingine baadaye katika utoto. Watoto wachanga na wadogo wanaweza kuwa si wazima haraka zaidi kuliko watu wazima, hivyo utambuzi wa mapema na ART ya mapema ni muhimu. Mtoto anaweza kujitokeza vizuri (aliyegundulika kupitia upimaji wa mtoto aliyeathiriwa na VVU) au si mzima (ukuaji mbaya, maambukizi yanayorudia, ucheleweshaji wa maendeleo). Kwa ART ya wakati na huduma nzuri, watoto wenye VVU hukua wenye afya na kufikia utu uzima — lakini huduma yao inahitaji umakini maalum wa watoto kwa utambuzi, dose, ukuaji, chanjo, na kufichua.',
      sw_mtaa: 'Mtoto anayeishi na VVU — mara nyingi alipata kutoka kwa mama karibu na mimba, kuzaliwa, au kunyonyesha, wakati mwingine anagundulika utotoni na wakati mwingine baadaye katika utoto. Watoto wachanga na wadogo wanaweza kuwa si wazima haraka zaidi kuliko watu wazima, hivyo utambuzi wa mapema na ART ya mapema ni muhimu. Mtoto anaweza kujitokeza vizuri (aliyegundulika kupitia upimaji wa mtoto aliyeathiriwa na VVU) au si mzima (ukuaji mbaya, maambukizi yanayorudia, ucheleweshaji wa maendeleo). Kwa ART ya wakati na huduma nzuri, watoto wenye VVU wanakua wenye afya na kufikia utu uzima — lakini huduma yao inahitaji umakini maalum wa watoto kwa utambuzi, dose, ukuaji, chanjo, na kufichua.',
    },
    recognitionSigns: [
      {
        en: 'An HIV-exposed infant identified through PMTCT, needing confirmatory testing',
        sw: 'Mtoto aliyeathiriwa na VVU aliyetambuliwa kupitia PMTCT, anayehitaji upimaji wa uthibitisho',
        sw_mtaa: 'Mtoto aliyeathiriwa na VVU aliyetambuliwa kupitia PMTCT, anayehitaji upimaji wa uthibitisho',
      },
      {
        en: 'Poor growth, recurrent infections, or developmental delay in an undiagnosed child',
        sw: 'Ukuaji mbaya, maambukizi yanayorudia, au ucheleweshaji wa maendeleo kwa mtoto asiyegundulika',
        sw_mtaa: 'Ukuaji mbaya, maambukizi yanayorudia, au ucheleweshaji wa maendeleo kwa mtoto asiyegundulika',
      },
      {
        en: 'A child whose mother is known to be living with HIV',
        sw: 'Mtoto ambaye mama yake anajulikana kuishi na VVU',
        sw_mtaa: 'Mtoto ambaye mama yake anajulikana kuishi na VVU',
      },
    ],
    treatmentJourney: {
      en: 'Diagnosis: in infants under 18 months, a virological test (DNA PCR) is used, because a standard antibody test would still pick up the mother\'s antibodies; older children can use the standard test. ART: started as early as possible — in diagnosed infants, immediately — using child-friendly formulations such as dispersible tablets or pediatric dolutegravir, dosed by the child\'s weight. Because children grow, doses are reviewed and adjusted regularly. The package also includes co-trimoxazole, full routine immunisations, growth and developmental monitoring, nutrition support, and TB screening. Disclosure: as the child grows, age-appropriate disclosure — gradually and supportively helping the child understand their own health — is encouraged, because children who understand their status tend to have better long-term adherence. CTC counsellors guide families through this. The transition into adolescence needs its own extra support.',
      sw: 'Utambuzi: kwa watoto wachanga chini ya miezi 18, kipimo cha virological (DNA PCR) hutumika, kwa sababu kipimo cha kawaida cha antibody bado kingechukua antibodies za mama; watoto wakubwa wanaweza kutumia kipimo cha kawaida. ART: huanzishwa mapema iwezekanavyo — kwa watoto wachanga waliogundulika, mara moja — kwa kutumia formulations zinazofaa watoto kama vidonge vinavyoyeyuka au dolutegravir ya watoto, dose kwa uzito wa mtoto. Kwa sababu watoto hukua, dose hupitiwa na kurekebishwa mara kwa mara. Pakti pia inajumuisha co-trimoxazole, chanjo kamili za kawaida, ufuatiliaji wa ukuaji na maendeleo, msaada wa lishe, na uchunguzi wa TB. Kufichua: kadri mtoto anavyokua, kufichua kunakofaa umri — polepole na kwa msaada kumsaidia mtoto kuelewa afya yake mwenyewe — kunahimizwa, kwa sababu watoto wanaoelewa hali yao huwa na kuzingatia bora kwa muda mrefu. Washauri wa CTC huongoza familia kupitia hili. Mpito wa kuingia ujana unahitaji msaada wake wa ziada.',
      sw_mtaa: 'Utambuzi: kwa watoto wachanga chini ya miezi 18, kipimo cha virological (DNA PCR) kinatumika, kwa sababu kipimo cha kawaida cha antibody bado kingechukua antibodies za mama; watoto wakubwa wanaweza kutumia kipimo cha kawaida. ART: inaanzishwa mapema iwezekanavyo — kwa watoto wachanga waliogundulika, mara moja — kwa kutumia formulations zinazofaa watoto kama vidonge vinavyoyeyuka au dolutegravir ya watoto, dose kwa uzito wa mtoto. Kwa sababu watoto wanakua, dose zinapitiwa na kurekebishwa mara kwa mara. Package pia inajumuisha co-trimoxazole, chanjo kamili za kawaida, ufuatiliaji wa ukuaji na maendeleo, msaada wa lishe, na uchunguzi wa TB. Kufichua: kadri mtoto anavyokua, age-appropriate disclosure — polepole na kwa msaada kumsaidia mtoto kuelewa afya yake — kunahimizwa, kwa sababu watoto wanaoelewa hali yao wanakuwa na adherence bora kwa muda mrefu. CTC counsellors wanaongoza familia kupitia hili. Mpito wa kuingia ujana unahitaji msaada wake wa ziada.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'A child with breathing difficulty, persistent fever, or refusing to feed — needs urgent assessment',
          sw: 'Mtoto mwenye ugumu wa kupumua, homa ya kudumu, au anayekataa kula — anahitaji tathmini ya haraka',
          sw_mtaa: 'Mtoto mwenye ugumu wa kupumua, homa ya kudumu, au anayekataa kula — anahitaji tathmini ya haraka',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Drowsiness, convulsions, or neck stiffness in a child — possible meningitis. EMERGENCY',
          sw: 'Usingizi mzito, kifafa, au ukakavu wa shingo kwa mtoto — uwezekano wa meningitis. DHARURA',
          sw_mtaa: 'Usingizi mzito, kifafa, au shingo ngumu kwa mtoto — uwezekano wa meningitis. DHARURA',
        },
        urgency: 'emergency',
      },
      {
        sign: {
          en: 'Faltering growth or weight loss despite treatment — needs prompt review of ART, dosing, and nutrition',
          sw: 'Ukuaji unaoyumba au kupungua uzito licha ya matibabu — kunahitaji mapitio ya haraka ya ART, dose, na lishe',
          sw_mtaa: 'Ukuaji unaoyumba au kupungua uzito licha ya matibabu — kunahitaji mapitio ya haraka ya ART, dose, na lishe',
        },
        urgency: 'urgent',
      },
    ],
    followUp: {
      en: 'Regular CTC follow-up with weight and height at every visit (to keep dosing correct as the child grows), viral load monitoring, TB screening, immunisation checks, and developmental review. As the child becomes a teenager, adherence support is stepped up and the care team helps with the transition toward adult services. The continuity message for caregivers: a child diagnosed and treated today can grow up healthy — the keys are never missing doses, attending every visit, adjusting the dose as the child grows, and supporting age-appropriate understanding of their own health.',
      sw: 'Ufuatiliaji wa kawaida wa CTC na uzito na urefu katika kila ziara (kuweka dose sahihi kadri mtoto anavyokua), ufuatiliaji wa viral load, uchunguzi wa TB, ukaguzi wa chanjo, na mapitio ya maendeleo. Kadri mtoto anavyokuwa kijana, msaada wa kuzingatia huongezwa na timu ya huduma husaidia na mpito kuelekea huduma za watu wazima. Ujumbe wa kuendelea kwa walezi: mtoto aliyegundulika na kutibiwa leo anaweza kukua mwenye afya — funguo ni kutokosa dose kamwe, kuhudhuria kila ziara, kurekebisha dose kadri mtoto anavyokua, na kusaidia uelewa unaofaa umri wa afya yake mwenyewe.',
      sw_mtaa: 'Ufuatiliaji wa kawaida wa CTC na uzito na urefu katika kila ziara (kuweka dose sahihi kadri mtoto anavyokua), ufuatiliaji wa viral load, uchunguzi wa TB, ukaguzi wa chanjo, na mapitio ya maendeleo. Kadri mtoto anavyokuwa kijana, adherence support inaongezwa na timu ya huduma inasaidia na mpito kuelekea huduma za watu wazima. Ujumbe wa kuendelea kwa walezi: mtoto aliyegundulika na kutibiwa leo anaweza kukua mwenye afya — funguo ni kutokosa dose kamwe, kuhudhuria kila ziara, kurekebisha dose kadri mtoto anavyokua, na kusaidia uelewa unaofaa umri wa afya yake.',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024'), src('IMCI_2024')],
  },

  // ════════════════════════════════════════════════════════════════════
  // 8. HIV PREVENTION — PrEP & PEP
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'hiv_prevention',
    severity: 'prevention',
    label: {
      en: 'HIV prevention — PrEP and PEP',
      sw: 'Kuzuia VVU — PrEP na PEP',
    },
    presentation: {
      en: 'A person who does NOT have HIV but is at risk, or has had a possible exposure, and wants to prevent infection. Two distinct tools. PrEP (pre-exposure prophylaxis) is for people with ongoing risk — for example, having an HIV-positive partner who is not yet undetectable, a partner of unknown status, or other repeated exposures — and is a medicine taken regularly BEFORE exposure to prevent infection. PEP (post-exposure prophylaxis) is for AFTER a specific possible exposure — condom failure, sexual assault, a needlestick injury — and is an emergency 28-day course that must start within 72 hours. The right tool depends on whether the risk is ongoing (PrEP) or has just happened (PEP).',
      sw: 'Mtu ambaye HANA VVU lakini yuko hatarini, au amekuwa na kuathiriwa kunakowezekana, na anataka kuzuia maambukizi. Zana mbili tofauti. PrEP (kinga kabla ya kuathiriwa) ni kwa watu wenye hatari inayoendelea — kwa mfano, kuwa na mwenza mwenye VVU ambaye bado haonekani, mwenza wa hali isiyojulikana, au kuathiriwa kwingine kunakorudiwa — na ni dawa inayochukuliwa mara kwa mara KABLA ya kuathiriwa kuzuia maambukizi. PEP (kinga baada ya kuathiriwa) ni kwa BAADA ya kuathiriwa maalum kunakowezekana — kondomu kupasuka, ubakaji, jeraha la sindano — na ni kozi ya dharura ya siku 28 ambayo lazima ianze ndani ya masaa 72. Zana sahihi inategemea kama hatari inaendelea (PrEP) au imetokea tu (PEP).',
      sw_mtaa: 'Mtu ambaye HANA VVU lakini yuko hatarini, au amekuwa na kuathiriwa kunakowezekana, na anataka kuzuia maambukizi. Zana mbili tofauti. PrEP (kinga kabla ya kuathiriwa) ni kwa watu wenye hatari inayoendelea — kwa mfano, kuwa na mwenza mwenye VVU ambaye bado haonekani, mwenza wa hali isiyojulikana, au kuathiriwa kunakorudiwa — na ni dawa inayochukuliwa mara kwa mara KABLA ya kuathiriwa kuzuia maambukizi. PEP (kinga baada ya kuathiriwa) ni kwa BAADA ya kuathiriwa maalum kunakowezekana — kondomu kupasuka, ubakaji, jeraha la sindano — na ni kozi ya dharura ya siku 28 ambayo lazima ianze ndani ya masaa 72. Zana sahihi inategemea kama hatari inaendelea (PrEP) au imetokea tu (PEP).',
    },
    recognitionSigns: [
      {
        en: 'HIV-negative, with ongoing risk — points toward PrEP',
        sw: 'Hana VVU, na hatari inayoendelea — inaelekeza kwenye PrEP',
        sw_mtaa: 'Hana VVU, na hatari inayoendelea — inaelekeza kwenye PrEP',
      },
      {
        en: 'A specific possible exposure within the last 72 hours — points toward PEP, urgently',
        sw: 'Kuathiriwa maalum kunakowezekana ndani ya masaa 72 yaliyopita — inaelekeza kwenye PEP, kwa haraka',
        sw_mtaa: 'Kuathiriwa maalum kunakowezekana ndani ya masaa 72 yaliyopita — inaelekeza kwenye PEP, kwa haraka',
      },
      {
        en: 'An HIV-negative partner of someone living with HIV — a clear PrEP conversation',
        sw: 'Mwenza asiye na VVU wa mtu anayeishi na VVU — mazungumzo wazi ya PrEP',
        sw_mtaa: 'Mwenza asiye na VVU wa mtu anayeishi na VVU — mazungumzo wazi ya PrEP',
      },
    ],
    treatmentJourney: {
      en: 'PEP: this is time-critical. After a possible exposure, go to a health facility, hospital emergency department, or CTC as soon as possible — ideally within hours, and absolutely within 72 hours, because after that window PEP does not work. It is a 28-day course of ART medicine, taken every day, with an HIV test at the start and follow-up tests afterward. PrEP: for ongoing risk, PrEP is started after confirming the person is HIV-negative, and is then taken regularly — it is highly effective at preventing HIV when taken consistently. PrEP users have regular check-ins and repeat HIV testing. Both PrEP and PEP are available in Tanzania, free or low-cost, through health facilities. Neither replaces condoms, which also protect against other sexually transmitted infections and pregnancy — prevention works best in layers.',
      sw: 'PEP: hii ni ya wakati muhimu. Baada ya kuathiriwa kunakowezekana, nenda kituo cha afya, idara ya dharura ya hospitali, au CTC haraka iwezekanavyo — ikiwezekana ndani ya masaa, na kabisa ndani ya masaa 72, kwa sababu baada ya dirisha hilo PEP haifanyi kazi. Ni kozi ya siku 28 ya dawa ya ART, inayochukuliwa kila siku, na kipimo cha VVU mwanzoni na vipimo vya ufuatiliaji baadaye. PrEP: kwa hatari inayoendelea, PrEP huanzishwa baada ya kuthibitisha mtu hana VVU, na kisha huchukuliwa mara kwa mara — ina ufanisi mkubwa kuzuia VVU inapochukuliwa mara kwa mara. Watumiaji wa PrEP wana ukaguzi wa kawaida na upimaji wa VVU unaorudiwa. PrEP na PEP zote zinapatikana Tanzania, bure au bei nafuu, kupitia vituo vya afya. Hakuna inayorudisha kondomu, ambazo pia hulinda dhidi ya maambukizi mengine ya zinaa na mimba — kuzuia hufanya kazi vizuri zaidi kwa tabaka.',
      sw_mtaa: 'PEP: hii ni ya wakati muhimu. Baada ya kuathiriwa kunakowezekana, nenda kituo cha afya, emergency department ya hospitali, au CTC haraka iwezekanavyo — ikiwezekana ndani ya masaa, na kabisa ndani ya masaa 72, kwa sababu baada ya dirisha hilo PEP haifanyi kazi. Ni kozi ya siku 28 ya dawa ya ART, inayochukuliwa kila siku, na kipimo cha VVU mwanzoni na vipimo vya ufuatiliaji baadaye. PrEP: kwa hatari inayoendelea, PrEP inaanzishwa baada ya kuthibitisha mtu hana VVU, na kisha inachukuliwa mara kwa mara — ina ufanisi mkubwa kuzuia VVU inapochukuliwa mara kwa mara. Watumiaji wa PrEP wana ukaguzi wa kawaida na upimaji wa VVU unaorudiwa. PrEP na PEP zote zinapatikana Tanzania, bure au bei nafuu, kupitia vituo vya afya. Hakuna inayorudisha kondomu, ambazo pia zinalinda dhidi ya magonjwa mengine ya zinaa na mimba — kuzuia kunafanya kazi vizuri zaidi kwa tabaka.',
    },
    dangerSigns: [
      {
        sign: {
          en: 'A possible HIV exposure more than 72 hours ago — PEP may no longer work; see a clinician now for testing and advice',
          sw: 'Kuathiriwa kunakowezekana na VVU zaidi ya masaa 72 yaliyopita — PEP huenda isifanye kazi tena; ona daktari sasa kwa upimaji na ushauri',
          sw_mtaa: 'Kuathiriwa kunakowezekana na VVU zaidi ya masaa 72 yaliyopita — PEP huenda isifanye kazi tena; ona daktari sasa kwa upimaji na ushauri',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'After sexual assault — go to a health facility urgently; PEP, emergency contraception, and support are all available',
          sw: 'Baada ya ubakaji — nenda kituo cha afya kwa haraka; PEP, kinga ya dharura ya mimba, na msaada vyote vinapatikana',
          sw_mtaa: 'Baada ya ubakaji — nenda kituo cha afya kwa haraka; PEP, kinga ya dharura ya mimba, na msaada vyote vinapatikana',
        },
        urgency: 'urgent',
      },
      {
        sign: {
          en: 'Flu-like illness (fever, rash, sore throat) a few weeks after a possible exposure — could be early HIV infection; get tested promptly',
          sw: 'Ugonjwa kama mafua (homa, vipele, koo kuuma) wiki chache baada ya kuathiriwa kunakowezekana — inaweza kuwa maambukizi ya VVU ya mapema; pimwa haraka',
          sw_mtaa: 'Ugonjwa kama mafua (homa, vipele, koo kuuma) wiki chache baada ya kuathiriwa kunakowezekana — inaweza kuwa maambukizi ya VVU ya mapema; pimwa haraka',
        },
        urgency: 'soon',
      },
    ],
    followUp: {
      en: 'PEP: an HIV test at the start, completion of the full 28-day course, and follow-up HIV testing afterward to confirm the exposure did not result in infection — usually with a final test some weeks later. PrEP: regular check-ins, repeat HIV testing on schedule, and ongoing assessment of whether PrEP is still needed as life circumstances change. The continuity message: prevention is active, not passive — PEP is an emergency that needs action within 72 hours, and PrEP only works while it is actually being taken. Both sit alongside condoms and partner testing as layers of protection. For people whose risk comes from a partner with HIV, the strongest protection of all is that partner being on effective treatment and undetectable (U=U).',
      sw: 'PEP: kipimo cha VVU mwanzoni, kumaliza kozi kamili ya siku 28, na upimaji wa VVU wa ufuatiliaji baadaye kuthibitisha kuathiriwa hakukusababisha maambukizi — kawaida na kipimo cha mwisho wiki kadhaa baadaye. PrEP: ukaguzi wa kawaida, upimaji wa VVU unaorudiwa kwa ratiba, na tathmini inayoendelea ya kama PrEP bado inahitajika kadri mazingira ya maisha yanavyobadilika. Ujumbe wa kuendelea: kuzuia ni shughuli, sio kukaa tu — PEP ni dharura inayohitaji hatua ndani ya masaa 72, na PrEP hufanya kazi tu wakati inachukuliwa kweli. Zote zinakaa pamoja na kondomu na upimaji wa wenza kama tabaka za ulinzi. Kwa watu ambao hatari yao inatoka kwa mwenza mwenye VVU, ulinzi wenye nguvu zaidi wa yote ni mwenza huyo kuwa kwenye matibabu yenye ufanisi na asionekane (U=U).',
      sw_mtaa: 'PEP: kipimo cha VVU mwanzoni, kumaliza kozi kamili ya siku 28, na upimaji wa VVU wa ufuatiliaji baadaye kuthibitisha kuathiriwa hakukusababisha maambukizi — kawaida na kipimo cha mwisho wiki kadhaa baadaye. PrEP: ukaguzi wa kawaida, upimaji wa VVU unaorudiwa kwa ratiba, na tathmini inayoendelea ya kama PrEP bado inahitajika kadri mazingira ya maisha yanavyobadilika. Ujumbe wa kuendelea: kuzuia ni shughuli, sio kukaa tu — PEP ni dharura inayohitaji hatua ndani ya masaa 72, na PrEP inafanya kazi tu wakati inachukuliwa kweli. Zote zinakaa pamoja na kondomu na upimaji wa wenza kama tabaka za ulinzi. Kwa watu ambao hatari yao inatoka kwa mwenza mwenye VVU, ulinzi wenye nguvu zaidi wa yote ni mwenza huyo kuwa kwenye matibabu yenye ufanisi na asionekane (U=U).',
    },
    sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
  },
];
