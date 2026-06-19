/**
 * Tuberculosis (TB) — Full Condition Knowledge (100% all-in coverage)
 *
 * Sources: NTLP Tanzania Manual 2024, WHO Consolidated Guidelines on TB 2024,
 *          NTLG STG 2023, Muhimbili Protocols, NACP HIV-TB Guidelines 2024,
 *          IMCI 2024 (pediatric TB module).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Coverage (all-in):
 *   • Drug-susceptible pulmonary TB (DS-TB) — RHZE-based therapy
 *   • Smear-negative TB — GeneXpert-confirmed, clinical-radiologic
 *   • Extrapulmonary TB (EPTB) — pleural, lymph node, abdominal, spinal, meningitis
 *   • Pediatric TB — IMCI-aligned, child-specific dosing concepts
 *   • TB in pregnancy — RHZE generally safe, streptomycin avoided
 *   • TB-HIV co-infection — ART timing, IPT/3HP, drug-drug interactions
 *   • Multidrug-resistant TB (MDR-TB) — recognition, referral, BPaL/BPaLM awareness
 *   • Latent TB infection (LTBI) — IPT/3HP, contact tracing
 *   • Treatment interruption — recovery pathways
 *   • Post-TB lung disease — chronic respiratory sequelae
 *
 * Comorbidities: HIV, diabetes, CKD, alcohol use disorder, malnutrition, silicosis.
 *
 * SCOPE: We educate patients on what TB IS, the LONG treatment journey, side
 * effects to watch, the importance of completion, infection control at home,
 * and continuity after cure. We do NOT diagnose TB — confirmation is by
 * GeneXpert MTB/RIF, smear microscopy, culture, or histology.
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const TB: ConditionKnowledge = {
  id: 'tb',
  aliases: CONDITION_ALIASES.tb,
  category: 'infectious',

  whatItIs: {
    en: 'Tuberculosis (TB) is an infection caused by a slow-growing bacterium called Mycobacterium tuberculosis. It most commonly attacks the lungs (pulmonary TB), but it can affect any organ — lymph nodes, spine, brain (TB meningitis), abdomen, kidneys, joints — and we call those "extrapulmonary TB." TB spreads when a person with active lung TB coughs or sneezes; tiny droplets in the air carry the bacteria to another person. Once breathed in, the bacteria can stay quiet for years (latent TB) or grow and cause illness (active TB). TB is curable with the right combination of medicines taken for the full 6 months — but it is one of the leading infectious causes of death worldwide.',
    sw: 'Kifua kikuu (TB) ni maambukizi yanayosababishwa na bakteria wanaokua polepole wanaoitwa Mycobacterium tuberculosis. Kwa kawaida hushambulia mapafu (TB ya mapafu), lakini inaweza kuathiri kiungo chochote — tezi za limfu, uti wa mgongo, ubongo (TB ya ubongo), tumbo, figo, viungo — na hizi tunaita "TB ya nje ya mapafu." TB inaambukiza wakati mtu mwenye TB hai ya mapafu anapokohoa au kupiga chafya; matone madogo angani hubeba bakteria kwa mtu mwingine. Mara baada ya kuvutwa, bakteria wanaweza kukaa kimya kwa miaka (TB iliyofichwa) au kukua na kusababisha ugonjwa (TB hai). TB inatibika kwa mchanganyiko sahihi wa dawa zinazochukuliwa kwa miezi 6 kamili — lakini ni miongoni mwa sababu kubwa za maambukizi ya vifo duniani.',
    sw_mtaa: 'Kifua kikuu (TB) ni maambukizi yanayosababishwa na bakteria wanaokua polepole. Kwa kawaida hushambulia mapafu (TB ya mapafu), lakini inaweza kuathiri kiungo chochote — tezi (lymph nodes), uti wa mgongo, ubongo, tumbo, figo, viungo — na hizi tunaita "TB ya nje ya mapafu." TB inaambukiza wakati mtu mwenye TB hai ya mapafu anakohoa au kupiga chafya; matone madogo angani yanabeba bakteria kwa mtu mwingine. Mara unapozivuta, bakteria zinaweza kukaa kimya kwa miaka (latent TB) au kukua na kusababisha ugonjwa (active TB). TB inatibika kwa mchanganyiko wa dawa kwa miezi 6 kamili — lakini ni miongoni mwa sababu kubwa za vifo duniani.',
  },

  whyItMatters: {
    en: 'Tanzania reports about 80,000 new TB cases each year, and TB remains a top-ten cause of death. Without treatment, half of people with pulmonary TB die within 5 years. With the right treatment taken in full, more than 85% are cured. The danger is not the bacterium itself — it is delays: late diagnosis (people cough for weeks before testing), incomplete treatment (people stop pills when they feel better at 2 months), and missed HIV co-infection (which makes TB much more deadly). TB is also a public-health issue: one untreated person can infect 10-15 others in a year. Every completed treatment protects a whole household.',
    sw: 'Tanzania huripoti karibu kesi mpya 80,000 za TB kila mwaka, na TB inabaki miongoni mwa sababu kumi za juu za vifo. Bila matibabu, nusu ya watu wenye TB ya mapafu hufa ndani ya miaka 5. Kwa matibabu sahihi yanayochukuliwa kikamilifu, zaidi ya 85% hupona. Hatari sio bakteria yenyewe — ni ucheleweshaji: utambuzi wa kuchelewa (watu wanakohoa kwa wiki kabla ya kupima), matibabu yasiyokamilika (watu wanasimamisha vidonge wanapojisikia vizuri miezi 2), na kupotea kwa maambukizi ya pamoja na VVU (ambayo hufanya TB iwe hatari zaidi). TB pia ni suala la afya ya umma: mtu mmoja asiyetibiwa anaweza kuwaambukiza watu 10-15 kwa mwaka. Kila matibabu yaliyokamilika yanalinda kaya nzima.',
    sw_mtaa: 'Tanzania huripoti karibu kesi mpya 80,000 za TB kila mwaka, na TB inabaki miongoni mwa sababu kumi za juu za vifo. Bila matibabu, nusu ya watu wenye TB ya mapafu wanafariki ndani ya miaka 5. Kwa matibabu sahihi yaliyokamilika, zaidi ya 85% wanapona. Hatari sio bakteria yenyewe — ni ucheleweshaji: utambuzi wa kuchelewa (watu wanakohoa wiki kadhaa kabla ya kupima), matibabu yasiyokamilika (watu wanasimamisha vidonge wanapojisikia poa miezi 2), na kupotea kwa maambukizi pamoja na VVU (ambayo inafanya TB iwe hatari zaidi). TB pia ni suala la afya ya umma: mtu mmoja asiyetibiwa anaweza kuambukiza watu 10-15 kwa mwaka. Kila matibabu yaliyokamilika yanalinda familia nzima.',
  },

  commonQuestions: [
    {
      q: {
        en: 'How do I know I have TB and not just a long cough?',
        sw: 'Najuaje nina TB na sio kikohozi cha muda mrefu tu?',
      },
      a: {
        en: 'A cough lasting more than 2 weeks — especially with one or more of: night sweats that soak the sheets, unexplained weight loss, fever in the evenings, coughing up blood, chest pain, severe tiredness — should be tested for TB. The test is simple: you cough up sputum into a cup, and a GeneXpert machine looks for TB DNA in 2 hours, or microscopy looks for the bacteria. Sputum tests are free at NTLP-supported facilities in Tanzania. Do not buy and try cough medicines for weeks — go for testing. A long cough is not normal.',
        sw: 'Kikohozi kinachodumu zaidi ya wiki 2 — hasa pamoja na moja au zaidi ya: jasho la usiku linalolowanisha shuka, kupungua uzito bila sababu, homa za jioni, kukohoa damu, maumivu ya kifua, uchovu mkubwa — kinafaa kupimwa TB. Kipimo ni rahisi: unakohoa makohozi kwenye kikombe, na mashine ya GeneXpert hutafuta DNA ya TB ndani ya masaa 2, au darubini hutafuta bakteria. Vipimo vya makohozi ni bure katika vituo vinavyoungwa mkono na NTLP Tanzania. Usinunue na kujaribu dawa za kikohozi kwa wiki kadhaa — nenda kupimwa. Kikohozi cha muda mrefu sio cha kawaida.',
        sw_mtaa: 'Kikohozi kinachodumu zaidi ya wiki 2 — hasa pamoja na moja au zaidi ya: jasho la usiku linalolowanisha shuka, kupungua uzito bila sababu, homa za jioni, kukohoa damu, maumivu ya kifua, uchovu mkubwa — kinafaa kupimwa TB. Kipimo ni rahisi: unakohoa makohozi kwenye kikombe, na GeneXpert machine inatafuta DNA ya TB ndani ya masaa 2, au darubini inatafuta bakteria. Vipimo vya makohozi ni bure NTLP facilities Tanzania. Usinunue na kujaribu cough syrup kwa wiki kadhaa — nenda upimwe. Kikohozi cha muda mrefu sio cha kawaida.',
      },
    },
    {
      q: {
        en: 'How long is TB treatment? Why so long?',
        sw: 'Matibabu ya TB ni ya muda gani? Kwa nini ni ya muda mrefu?',
      },
      a: {
        en: 'For drug-susceptible TB, the standard treatment is 6 months: 2 months of intensive phase (4 drugs together — RHZE: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol) and 4 months of continuation phase (2 drugs — RH: Rifampicin and Isoniazid). TB takes that long because the bacterium grows very slowly and hides inside cells where medicines reach it slowly. Stopping early — even by a few weeks — lets surviving bacteria multiply and develop resistance to the drugs. This is how MDR-TB is born. Take every dose, every day, for the full 6 months. Some forms (TB meningitis, bone TB, MDR-TB) need even longer regimens — 9 to 24 months.',
        sw: 'Kwa TB inayoshambulika na dawa, matibabu ya kawaida ni miezi 6: miezi 2 ya hatua kali (dawa 4 pamoja — RHZE: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol) na miezi 4 ya hatua ya kuendelea (dawa 2 — RH: Rifampicin na Isoniazid). TB huchukua muda huo kwa sababu bakteria hukua polepole sana na hujificha ndani ya seli ambapo dawa hufika polepole. Kusimama mapema — hata kwa wiki chache — kunaruhusu bakteria walionusurika kuongezeka na kuendeleza upinzani dhidi ya dawa. Hivi ndivyo MDR-TB inavyozaliwa. Tumia kila dose, kila siku, kwa miezi 6 kamili. Aina zingine (TB ya ubongo, TB ya mfupa, MDR-TB) zinahitaji regimens ndefu zaidi — miezi 9 hadi 24.',
        sw_mtaa: 'Kwa TB ya kawaida (DS-TB), matibabu ya kawaida ni miezi 6: miezi 2 ya intensive phase (dawa 4 pamoja — RHZE) na miezi 4 ya continuation phase (dawa 2 — RH). TB inachukua muda huo kwa sababu bakteria zinakua polepole sana na zinajificha ndani ya cells ambazo dawa zinafika polepole. Kusimama mapema — hata kwa wiki chache — kunaruhusu bakteria zilizonusurika kuongezeka na ku-develop resistance dhidi ya dawa. Hivi ndivyo MDR-TB inavyozaliwa. Tumia kila dose, kila siku, miezi 6 kamili. Aina zingine (TB meningitis, TB ya mfupa, MDR-TB) zinahitaji muda mrefu zaidi — miezi 9 hadi 24.',
      },
    },
    {
      q: {
        en: 'I feel completely fine after 2 months — can I stop?',
        sw: 'Najisikia poa kabisa baada ya miezi 2 — naweza kusimama?',
      },
      a: {
        en: 'No. This is the single biggest reason TB treatment fails. Symptoms improve early because the most active bacteria die first — but the "dormant" bacteria hiding in lung tissue need months of medicine to be killed. Stopping at 2 months leaves them alive. They multiply, the disease comes back, and now those bacteria have learned to resist your drugs. Then you need MDR-TB treatment — 9 to 24 months of harsher medicines, including injections, with serious side effects. Every patient who completes the full 6 months protects themselves and their family from MDR-TB. The 4 months of continuation phase is the most important investment of your life — finish it.',
        sw: 'Hapana. Hii ni sababu kubwa zaidi ya matibabu ya TB kushindwa. Dalili huimarika mapema kwa sababu bakteria walio hai zaidi hufa kwanza — lakini bakteria "wanaolala" wanaojificha kwenye tishu za mapafu wanahitaji miezi ya dawa kuuawa. Kusimama miezi 2 kunawaacha hai. Wanaongezeka, ugonjwa unarudi, na sasa bakteria hao wamejifunza kupinga dawa zako. Kisha unahitaji matibabu ya MDR-TB — miezi 9 hadi 24 ya dawa kali zaidi, ikiwa ni pamoja na sindano, zikiwa na athari mbaya. Kila mgonjwa anayemaliza miezi 6 kamili anajilinda na familia yake kutokana na MDR-TB. Miezi 4 ya hatua ya kuendelea ni uwekezaji muhimu zaidi wa maisha yako — malizia.',
        sw_mtaa: 'Hapana. Hii ndio sababu kubwa zaidi ya matibabu ya TB kushindwa. Dalili zinapungua mapema kwa sababu bakteria zilizo hai zaidi zinafa kwanza — lakini bakteria "dormant" zinazojificha kwenye tishu za mapafu zinahitaji miezi ya dawa kuuawa. Kusimama miezi 2 kunawaacha hai. Wanaongezeka, ugonjwa unarudi, na sasa bakteria hizo zimejifunza kupinga dawa zako. Halafu unahitaji MDR-TB treatment — miezi 9 hadi 24 ya dawa kali zaidi, ikiwa ni pamoja na sindano, na side effects mbaya. Kila mgonjwa anayemaliza miezi 6 anajilinda na familia yake kutokana na MDR-TB. Miezi 4 ya continuation phase ni uwekezaji muhimu zaidi wa maisha yako — malizia.',
      },
    },
    {
      q: {
        en: 'Will my family catch TB from me?',
        sw: 'Familia yangu itaambukizwa TB kutoka kwangu?',
      },
      a: {
        en: 'Active pulmonary TB is contagious through the air — close contacts (people sharing your bedroom, kitchen, or sitting room for hours daily) are at highest risk. The good news: within 2 weeks of starting effective treatment, you become much less contagious. In that first 2 weeks: cover your mouth when coughing, open windows for cross-ventilation, sleep alone if possible, and wear a simple mask in the house if someone vulnerable lives with you (a baby, pregnant woman, HIV-positive person, or elderly relative). NTLP will offer "contact tracing" — screening every household member for TB or latent TB. Children under 5 and HIV-positive household contacts may be offered preventive therapy (IPT). Do not hide your diagnosis from family — early screening protects everyone.',
        sw: 'TB hai ya mapafu inaambukiza kupitia hewa — watu wa karibu (wanaoshiriki chumba chako cha kulala, jiko, au sebule kwa masaa kila siku) wako katika hatari kubwa zaidi. Habari njema: ndani ya wiki 2 baada ya kuanza matibabu yenye ufanisi, unakuwa hauambukizi sana. Katika wiki hizo 2 za kwanza: funika mdomo unapokohoa, fungua madirisha kwa hewa, lala peke yako ikiwezekana, na vaa barakoa rahisi nyumbani ikiwa mtu hatarini anaishi nawe (mtoto mchanga, mjamzito, mtu mwenye VVU, au jamaa mzee). NTLP itatoa "ufuatiliaji wa watu wa karibu" — uchunguzi wa kila mwanafamilia kwa TB au TB iliyofichwa. Watoto chini ya miaka 5 na watu wenye VVU walio katika kaya wanaweza kupewa tiba ya kuzuia (IPT). Usifiche utambuzi wako kutoka kwa familia — uchunguzi wa mapema unalinda kila mtu.',
        sw_mtaa: 'TB hai ya mapafu inaambukiza kupitia hewa — watu wa karibu (wanaoshiriki chumba chako cha kulala, jiko, au sebule kwa masaa kila siku) wako katika hatari kubwa zaidi. Habari njema: ndani ya wiki 2 baada ya kuanza matibabu yenye ufanisi, hauambukizi sana. Wiki hizo 2 za kwanza: funika mdomo unapokohoa, fungua madirisha kwa hewa, lala peke yako ikiwezekana, na vaa barakoa rahisi nyumbani kama kuna mtu hatarini anayeishi nawe (mtoto mchanga, mjamzito, mtu mwenye VVU, au mzee). NTLP itatoa "contact tracing" — uchunguzi wa kila mwanafamilia kwa TB au latent TB. Watoto chini ya miaka 5 na watu wenye VVU walio kwenye kaya wanaweza kupewa IPT (kinga). Usifiche utambuzi kutoka kwa familia — uchunguzi wa mapema unalinda kila mtu.',
      },
    },
    {
      q: {
        en: 'My urine turned orange after starting TB medicine — is this dangerous?',
        sw: 'Mkojo wangu umekuwa wa rangi ya machungwa baada ya kuanza dawa za TB — ni hatari?',
      },
      a: {
        en: 'No — this is rifampicin doing what it does. Rifampicin colors body fluids orange-red: urine, tears, sweat, even contact lenses can get stained. It is harmless and stops when the medicine is finished. What it tells you is good news: the rifampicin is being absorbed properly. The serious side effects to actually watch for are different: yellow eyes or dark urine (with the orange tint — that signals liver injury), severe nausea or vomiting that prevents eating, joint pain, numbness or tingling in feet and hands, rash, changes in vision (especially with ethambutol). Report any of those to your DOT centre right away.',
        sw: 'Hapana — hii ni rifampicin inafanya kile inavyofanya. Rifampicin hupaka maji ya mwili rangi ya machungwa-nyekundu: mkojo, machozi, jasho, hata lensi za mguso zinaweza kupakwa rangi. Si hatari na huacha dawa inapomalizika. Inayokuambia ni habari njema: rifampicin inafyonzwa vizuri. Athari kubwa za kweli kuangalia ni tofauti: macho ya njano au mkojo wa giza (pamoja na rangi ya machungwa — hiyo inaonyesha uharibifu wa ini), kichefuchefu kikali au kutapika kunakozuia kula, maumivu ya viungo, ganzi au kuchomoa kwenye miguu na mikono, vipele, mabadiliko ya kuona (hasa na ethambutol). Ripoti yoyote ya hizo kwa kituo chako cha DOT mara moja.',
        sw_mtaa: 'Hapana — hii ni rifampicin inafanya kazi yake. Rifampicin inapaka maji ya mwili rangi ya machungwa-nyekundu: mkojo, machozi, jasho, hata contact lenses zinaweza kupakwa rangi. Si hatari na inaacha dawa inapomalizika. Inayokuambia ni habari njema: rifampicin inafyonzwa vizuri. Athari kubwa za kweli kuangalia ni tofauti: macho ya njano au mkojo wa giza zaidi (pamoja na rangi ya machungwa — hiyo inaonyesha liver injury), kichefuchefu kikali au kutapika kunakozuia kula, maumivu ya viungo, ganzi au kuchomoa kwenye miguu na mikono, vipele, mabadiliko ya kuona (hasa na ethambutol). Ripoti yoyote ya hizo kwa DOT centre yako mara moja.',
      },
    },
    {
      q: {
        en: 'I have HIV and now TB — which medicine do I start first?',
        sw: 'Nina VVU na sasa nimepata TB — naanza dawa gani kwanza?',
      },
      a: {
        en: 'TB treatment first, then ART within 2-8 weeks (sooner if your CD4 is very low). Starting both at the same time is risky because of IRIS (immune reconstitution inflammatory syndrome) — your recovering immune system can overreact to the dying TB bacteria and cause severe inflammation. For TB meningitis specifically, ART is usually delayed to 4-8 weeks for safety. There is also a key interaction: rifampicin lowers blood levels of some ART drugs (especially dolutegravir/TLD). In Tanzania, the solution is to give a higher dose of dolutegravir (50mg twice daily instead of once) while on rifampicin. NEVER stop your ART because of TB — both diseases need their treatment. Tell every clinician about both diagnoses.',
        sw: 'Matibabu ya TB kwanza, kisha ART ndani ya wiki 2-8 (mapema ikiwa CD4 yako iko chini sana). Kuanza zote kwa wakati mmoja ni hatari kwa sababu ya IRIS (immune reconstitution inflammatory syndrome) — kinga yako inayopona inaweza kuitikia kwa kupita kiasi kwa bakteria wa TB wanaokufa na kusababisha uvimbe mkubwa. Kwa TB ya ubongo hasa, ART kawaida huchelewa hadi wiki 4-8 kwa usalama. Pia kuna mwingiliano muhimu: rifampicin inashusha viwango vya damu vya baadhi ya dawa za ART (hasa dolutegravir/TLD). Tanzania, suluhisho ni kutoa dose kubwa zaidi ya dolutegravir (50mg mara mbili kwa siku badala ya mara moja) ukiwa kwenye rifampicin. KAMWE usisimamishe ART yako kwa sababu ya TB — magonjwa yote yanahitaji matibabu yao. Mwambie kila daktari kuhusu utambuzi wote.',
        sw_mtaa: 'Matibabu ya TB kwanza, kisha ART ndani ya wiki 2-8 (mapema kama CD4 yako iko chini sana). Kuanza zote kwa wakati mmoja ni hatari kwa sababu ya IRIS — kinga yako inayopona inaweza kupiga jeki dhidi ya bakteria wa TB wanaokufa na kusababisha uvimbe mkubwa. Kwa TB meningitis hasa, ART kawaida inacheleweshwa hadi wiki 4-8 kwa usalama. Pia kuna interaction muhimu: rifampicin inashusha viwango vya baadhi ya dawa za ART (hasa dolutegravir/TLD). Tanzania, suluhisho ni dose kubwa zaidi ya dolutegravir (50mg mara mbili kwa siku badala ya mara moja) ukiwa kwenye rifampicin. KAMWE usisimamishe ART kwa sababu ya TB — magonjwa yote yanahitaji matibabu yao. Mwambie kila daktari uko na zote.',
      },
    },
    {
      q: {
        en: 'I am pregnant and have TB — is the medicine safe for my baby?',
        sw: 'Nina mimba na nina TB — dawa ni salama kwa mtoto wangu?',
      },
      a: {
        en: 'Yes — the standard four drugs (rifampicin, isoniazid, pyrazinamide, ethambutol) are all considered safe in pregnancy and breastfeeding. The drug to AVOID in pregnancy is streptomycin (causes baby deafness), which is not part of the standard regimen anyway. Untreated TB in pregnancy is far more dangerous than the medicines — it causes miscarriage, premature delivery, low birth weight, and TB transmission to the newborn. Take vitamin B6 (pyridoxine) supplements while on isoniazid in pregnancy (mandatory) and during breastfeeding (recommended) to prevent nerve issues. After delivery, the baby will be screened and may receive 6 months of preventive isoniazid (IPT) if you are still infectious. Breastfeeding is encouraged — TB does not pass through breast milk.',
        sw: 'Ndio — dawa nne za kawaida (rifampicin, isoniazid, pyrazinamide, ethambutol) zote zinachukuliwa kuwa salama katika mimba na kunyonyesha. Dawa ya KUEPUKA katika mimba ni streptomycin (husababisha uziwi wa mtoto), ambayo sio sehemu ya regimen ya kawaida hata hivyo. TB isiyotibiwa katika mimba ni hatari zaidi kuliko dawa — inasababisha kuharibika kwa mimba, kuzaliwa kabla ya wakati, uzito mdogo, na kuambukiza TB kwa mtoto mchanga. Tumia virutubisho vya vitamin B6 (pyridoxine) ukiwa kwenye isoniazid katika mimba (lazima) na wakati wa kunyonyesha (inashauriwa) kuzuia matatizo ya neva. Baada ya kuzaa, mtoto atachunguzwa na anaweza kupokea miezi 6 ya isoniazid ya kuzuia (IPT) ikiwa bado unaambukiza. Kunyonyesha kunashauriwa — TB haipiti kupitia maziwa ya mama.',
        sw_mtaa: 'Ndio — dawa nne za kawaida (rifampicin, isoniazid, pyrazinamide, ethambutol) zote ni salama katika mimba na kunyonyesha. Dawa ya KUEPUKA katika mimba ni streptomycin (inasababisha uziwi wa mtoto), ambayo sio sehemu ya regimen ya kawaida tena. TB isiyotibiwa katika mimba ni hatari zaidi kuliko dawa — inasababisha mimba kuharibika, kuzaliwa kabla ya wakati, uzito mdogo, na kuambukiza TB kwa mtoto mchanga. Tumia vitamin B6 (pyridoxine) supplements ukiwa kwenye isoniazid katika mimba (lazima) na wakati wa kunyonyesha (inashauriwa) kuzuia matatizo ya neva. Baada ya kujifungua, mtoto atachunguzwa na anaweza kupokea miezi 6 ya isoniazid ya kuzuia (IPT) ikiwa bado unaambukiza. Kunyonyesha kunashauriwa — TB haipiti kupitia maziwa ya mama.',
      },
    },
    {
      q: {
        en: 'My child has TB — is treatment different for children?',
        sw: 'Mtoto wangu ana TB — matibabu ni tofauti kwa watoto?',
      },
      a: {
        en: 'Same four drugs (RHZE), but in child-friendly fixed-dose combinations that dissolve in water, and doses are based on the child\'s weight — not adult tablets cut in half. NTLP provides these as weight-banded packs at all DOT centres. Most children with drug-susceptible pulmonary TB tolerate treatment well and recover fully. Children often have non-pulmonary TB (lymph node, abdominal, meningitis) which can be harder to confirm with sputum — diagnosis may rely on the contact history, tuberculin skin test, and clinical assessment. Children with TB meningitis need 12 months of treatment plus steroids. After cure, screen any other children in the household, and ensure all under-5 contacts received IPT during treatment.',
        sw: 'Dawa nne zile zile (RHZE), lakini katika mchanganyiko wa dose iliyofixed inayofaa kwa watoto inayoyeyuka katika maji, na dose hutegemea uzito wa mtoto — sio vidonge vya watu wazima vilivyokatwa nusu. NTLP hutoa hizi kama pakti zilizopangwa kwa uzito katika vituo vyote vya DOT. Watoto wengi wenye TB inayoshambulika ya mapafu huvumilia matibabu vizuri na hupona kabisa. Watoto mara nyingi wana TB isiyo ya mapafu (tezi za limfu, tumboni, ubongoni) ambayo inaweza kuwa ngumu kuthibitisha kwa makohozi — utambuzi unaweza kutegemea historia ya kuwasiliana, kipimo cha ngozi cha tuberculin, na tathmini ya kliniki. Watoto wenye TB ya ubongo wanahitaji miezi 12 ya matibabu pamoja na steroids. Baada ya kupona, chunguza watoto wengine wowote kwenye kaya, na hakikisha watoto wote wa chini ya miaka 5 walio karibu walipokea IPT wakati wa matibabu.',
        sw_mtaa: 'Dawa nne zile zile (RHZE), lakini katika mchanganyiko wa fixed-dose inayofaa kwa watoto inayoyeyuka kwenye maji, na dose hutegemea uzito wa mtoto — sio vidonge vya watu wazima vilivyokatwa nusu. NTLP inatoa hizi kama weight-banded packs vituo vyote vya DOT. Watoto wengi wenye DS-TB ya mapafu wanavumilia matibabu vizuri na wanapona kabisa. Watoto mara nyingi wana TB isiyo ya mapafu (tezi za limfu, tumboni, ubongoni) ambayo inaweza kuwa ngumu kuthibitisha kwa makohozi — utambuzi unategemea contact history, tuberculin skin test, na clinical assessment. Watoto wenye TB meningitis wanahitaji miezi 12 ya matibabu pamoja na steroids. Baada ya kupona, chunguza watoto wengine wote kwenye kaya, na hakikisha watoto wote chini ya miaka 5 walio karibu walipokea IPT wakati wa matibabu.',
      },
    },
    {
      q: {
        en: 'What is MDR-TB and how is it different?',
        sw: 'MDR-TB ni nini na ni tofauti vipi?',
      },
      a: {
        en: 'MDR-TB (multidrug-resistant TB) is TB caused by bacteria that no longer respond to the two most powerful first-line drugs (rifampicin and isoniazid). It happens when treatment is incomplete or interrupted — the surviving bacteria learn to resist. MDR-TB is suspected when someone\'s TB does not improve after 2-3 months of RHZE, when symptoms come back after completing treatment, when GeneXpert detects rifampicin resistance, or in people who lived with an MDR-TB case. Treatment is much harder: 9-24 months of medicines, often including bedaquiline, linezolid, levofloxacin, clofazimine, and sometimes injections. Side effects are heavier, but cure is still possible — Tanzania has dedicated MDR-TB centres at Muhimbili, KCMC, and Mbeya. New shorter regimens (BPaL/BPaLM) are being introduced. If you suspect MDR-TB, urgent referral to a specialised centre is needed.',
        sw: 'MDR-TB (TB inayopinga dawa nyingi) ni TB inayosababishwa na bakteria ambao hawajibii tena dawa mbili zenye nguvu zaidi za awali (rifampicin na isoniazid). Hutokea wakati matibabu hayajakamilika au yamesimama — bakteria walionusurika hujifunza kupinga. MDR-TB inashukiwa wakati TB ya mtu haiboresheki baada ya miezi 2-3 ya RHZE, wakati dalili zinarudi baada ya kumaliza matibabu, wakati GeneXpert inagundua upinzani wa rifampicin, au kwa watu walioishi na kesi ya MDR-TB. Matibabu ni magumu zaidi: miezi 9-24 ya dawa, mara nyingi ikiwa na bedaquiline, linezolid, levofloxacin, clofazimine, na wakati mwingine sindano. Athari ni nzito zaidi, lakini kupona bado kunawezekana — Tanzania ina vituo maalum vya MDR-TB Muhimbili, KCMC, na Mbeya. Regimens mpya fupi (BPaL/BPaLM) zinaanzishwa. Ikiwa unashuku MDR-TB, rufaa ya haraka kwa kituo maalum inahitajika.',
        sw_mtaa: 'MDR-TB (multidrug-resistant TB) ni TB inayosababishwa na bakteria ambao hawajibu tena dawa mbili zenye nguvu zaidi za first-line (rifampicin na isoniazid). Inatokea wakati matibabu hayajakamilika au yamesimama — bakteria zilizonusurika zinajifunza kupinga. MDR-TB inashukiwa wakati TB ya mtu haiboreshi baada ya miezi 2-3 ya RHZE, wakati dalili zinarudi baada ya kumaliza matibabu, wakati GeneXpert inagundua rifampicin resistance, au kwa watu walioishi na case ya MDR-TB. Matibabu ni magumu zaidi: miezi 9-24 ya dawa, mara nyingi ikiwa na bedaquiline, linezolid, levofloxacin, clofazimine, na wakati mwingine sindano. Side effects ni nzito zaidi, lakini kupona bado kunawezekana — Tanzania ina vituo maalum vya MDR-TB Muhimbili, KCMC, na Mbeya. Regimens mpya fupi (BPaL/BPaLM) zinaanzishwa. Ikiwa unashuku MDR-TB, rufaa ya haraka kwa kituo maalum inahitajika.',
      },
    },
    {
      q: {
        en: 'What is latent TB and should I be treated for it?',
        sw: 'Latent TB ni nini na nitibiwe kwa hilo?',
      },
      a: {
        en: 'Latent TB infection (LTBI) means TB bacteria are sleeping inside your body, but you have no symptoms and cannot infect others. Roughly a quarter of the world has latent TB. Most never become sick — but 5-10% develop active TB during their lifetime, more if their immunity weakens (HIV, diabetes, malnutrition, immunosuppressants, age). For most healthy adults, latent TB is monitored but not treated. But for some — close contacts of TB patients (especially under-5 children), people with HIV, people starting immunosuppression — preventive therapy is offered: 6 months of isoniazid (IPT), or the newer 3-month rifapentine + isoniazid weekly (3HP). Preventive therapy cuts the risk of active TB by 60-90%. Ask your clinician whether you qualify, especially after household exposure.',
        sw: 'Maambukizi ya TB iliyofichwa (LTBI) maana yake bakteria wa TB wanalala ndani ya mwili wako, lakini huna dalili na huwezi kuambukiza wengine. Karibu robo ya dunia ina TB iliyofichwa. Wengi hawawi wagonjwa kamwe — lakini 5-10% huendeleza TB hai katika maisha yao, zaidi ikiwa kinga yao inadhoofika (VVU, kisukari, utapiamlo, dawa za kukandamiza kinga, umri). Kwa watu wazima wenye afya, TB iliyofichwa hufuatiliwa lakini haitibiwi. Lakini kwa wengine — watu wa karibu wa wagonjwa wa TB (hasa watoto chini ya miaka 5), watu wenye VVU, watu wanaoanza kukandamiza kinga — tiba ya kuzuia hutolewa: miezi 6 ya isoniazid (IPT), au mpya wa miezi 3 wa rifapentine + isoniazid kila wiki (3HP). Tiba ya kuzuia hupunguza hatari ya TB hai kwa 60-90%. Muulize daktari wako kama unastahili, hasa baada ya kuwasiliana na kaya.',
        sw_mtaa: 'Latent TB infection (LTBI) maana yake bakteria wa TB wanalala ndani ya mwili wako, lakini huna dalili na huwezi kuambukiza wengine. Karibu robo ya dunia ina latent TB. Wengi hawawi wagonjwa kamwe — lakini 5-10% wanaendeleza active TB katika maisha yao, zaidi kama kinga yao inadhoofika (VVU, kisukari, utapiamlo, immunosuppressants, umri). Kwa watu wazima wenye afya, latent TB inafuatiliwa lakini haitibiwi. Lakini kwa wengine — watu wa karibu wa wagonjwa wa TB (hasa watoto chini ya miaka 5), watu wenye VVU, watu wanaoanza immunosuppression — kinga inatolewa: miezi 6 ya isoniazid (IPT), au mpya wa miezi 3 wa rifapentine + isoniazid kila wiki (3HP). Preventive therapy inapunguza hatari ya active TB kwa 60-90%. Muulize daktari kama unastahili, hasa baada ya household exposure.',
      },
    },
    {
      q: {
        en: 'I missed a few doses of my TB medicine — what should I do?',
        sw: 'Nimekosa dose chache za dawa za TB — nifanye nini?',
      },
      a: {
        en: 'It depends on how many you missed and when. A single missed dose: take it as soon as you remember (unless the next dose is close — then skip and continue) and tell your DOT nurse at the next visit. Missed 1 week or more during the intensive (first 2 months) phase: the regimen may need to be restarted — your DOT centre will decide. Missed more than 2 months total during the entire treatment course: it counts as "treatment after loss to follow-up" and you may need GeneXpert re-testing to check for resistance. Do not silently restart on your own — go back to the DOT centre, explain honestly, and they will guide the right next step. Hiding missed doses is dangerous; clinicians are not there to judge you, they are there to help you finish.',
        sw: 'Inategemea ngapi ulizokosa na wakati gani. Dose moja iliyokosa: ichukue mara unapokumbuka (isipokuwa dose inayofuata iko karibu — basi ruka na endelea) na mwambie muuguzi wako wa DOT katika ziara inayofuata. Wiki 1 au zaidi iliyokosa wakati wa hatua ya kali (miezi 2 ya kwanza): regimen huenda ikahitaji kuanzishwa upya — kituo chako cha DOT kitaamua. Zaidi ya miezi 2 jumla iliyokosa katika kozi nzima ya matibabu: inahesabu kama "matibabu baada ya kupotea kwa ufuatiliaji" na huenda ukahitaji kupimwa upya na GeneXpert kuangalia upinzani. Usianzishe upya kimya peke yako — rudi kituo cha DOT, eleza kwa uwazi, na watakuongoza hatua sahihi inayofuata. Kuficha dose zilizokosa ni hatari; madaktari sio kuwahukumu, ni kuwasaidia kumaliza.',
        sw_mtaa: 'Inategemea ngapi ulizokosa na lini. Dose moja iliyokosa: ichukue mara unapokumbuka (isipokuwa next dose iko karibu — basi ruka na endelea) na mwambie DOT nurse ziara inayofuata. Wiki 1 au zaidi iliyokosa wakati wa intensive phase (miezi 2 ya kwanza): regimen inaweza kuhitaji kuanzishwa upya — DOT centre yako itaamua. Zaidi ya miezi 2 jumla iliyokosa katika treatment yote: inahesabu kama "treatment after loss to follow-up" na unaweza kuhitaji GeneXpert re-testing kuangalia resistance. Usianzishe upya kimya peke yako — rudi DOT centre, eleza kwa uwazi, na watakuongoza next step. Kuficha missed doses ni hatari; madaktari sio kukuhukumu, ni kukusaidia umalize.',
      },
    },
    {
      q: {
        en: 'After 6 months of treatment, will my lungs be normal again?',
        sw: 'Baada ya miezi 6 ya matibabu, mapafu yangu yatakuwa kawaida tena?',
      },
      a: {
        en: 'For most people, lung function returns substantially — but TB can leave permanent damage called post-TB lung disease (PTLD): fibrosis (scarring), bronchiectasis (widened airways that trap mucus), and reduced lung capacity. Symptoms can include chronic cough, breathlessness on exertion, occasional blood-tinged sputum, and recurrent chest infections. PTLD is more common in people who had severe TB, delayed treatment, multiple episodes, smokers, or HIV co-infection. Stop smoking. Get the annual flu vaccine and pneumococcal vaccine if eligible. Pulmonary rehabilitation (breathing exercises, gentle physical activity) helps. Any new bleeding, severe breathlessness, or fever after cure must be checked — TB can recur or other lung diseases can develop.',
        sw: 'Kwa watu wengi, utendaji wa mapafu hurudi kwa kiasi kikubwa — lakini TB inaweza kuacha uharibifu wa kudumu unaoitwa post-TB lung disease (PTLD): fibrosis (kovu), bronchiectasis (njia za hewa zilizopanuka zinazonasa makamasi), na uwezo wa mapafu uliopungua. Dalili zinaweza kuwa pamoja na kikohozi cha kudumu, kushindwa kupumua kwa juhudi, makohozi yenye damu mara kwa mara, na maambukizi ya kifua yanayorudi. PTLD ni ya kawaida zaidi kwa watu waliokuwa na TB kali, matibabu yaliyochelewa, vipindi vingi, wavutaji wa sigara, au maambukizi ya pamoja na VVU. Acha kuvuta sigara. Pata chanjo ya mafua ya kila mwaka na chanjo ya pneumococcal ikiwa unastahili. Ukarabati wa mapafu (mazoezi ya kupumua, mazoezi ya kimwili ya upole) husaidia. Damu yoyote mpya, ugumu mkubwa wa kupumua, au homa baada ya kupona lazima vichunguzwe — TB inaweza kurudi au magonjwa mengine ya mapafu yanaweza kuendeleza.',
        sw_mtaa: 'Kwa watu wengi, utendaji wa mapafu unarudi kwa kiasi kikubwa — lakini TB inaweza kuacha uharibifu wa kudumu unaoitwa post-TB lung disease (PTLD): fibrosis (scarring), bronchiectasis (airways zilizopanuka zinazonasa makamasi), na lung capacity iliyopungua. Dalili zinaweza kuwa pamoja na kikohozi cha kudumu, kushindwa kupumua kwa juhudi, makohozi yenye damu mara kwa mara, na chest infections zinazorudi. PTLD ni ya kawaida zaidi kwa watu waliokuwa na TB kali, treatment iliyochelewa, vipindi vingi, smokers, au HIV co-infection. Acha kuvuta sigara. Pata flu vaccine ya kila mwaka na pneumococcal vaccine kama unastahili. Pulmonary rehabilitation (mazoezi ya kupumua, mazoezi ya kimwili ya upole) inasaidia. Damu yoyote mpya, kushindwa kupumua kali, au homa baada ya kupona lazima vichunguzwe — TB inaweza kurudi au magonjwa mengine ya mapafu yanaweza kuendelea.',
      },
    },
    {
      q: {
        en: 'I have TB outside the lungs (lymph node / abdominal / spine) — is treatment the same?',
        sw: 'Nina TB nje ya mapafu (tezi za limfu / tumboni / uti wa mgongo) — matibabu ni sawa?',
      },
      a: {
        en: 'The drugs are the same (RHZE), but the duration is often longer and the diagnosis pathway is different. Lymph node TB and pleural TB: usually 6 months. Abdominal TB and bone/spinal TB (Pott\'s disease): 9-12 months. TB meningitis: 12 months plus 6-8 weeks of corticosteroids (to reduce dangerous brain inflammation). Diagnosis often needs a biopsy or fluid sample (lymph node aspiration, pleural tap, lumbar puncture, abdominal fluid) because sputum may be negative. Surgery is sometimes needed for spine TB with neurologic damage or for very large abscesses. Most extrapulmonary TB is not contagious — you do not need to isolate unless lung TB is also present.',
        sw: 'Dawa ni zile zile (RHZE), lakini muda mara nyingi ni mrefu zaidi na njia ya utambuzi ni tofauti. TB ya tezi za limfu na TB ya pleura: kawaida miezi 6. TB ya tumboni na TB ya mfupa/uti wa mgongo (Pott\'s disease): miezi 9-12. TB ya ubongo: miezi 12 pamoja na wiki 6-8 za corticosteroids (kupunguza uvimbe hatari wa ubongo). Utambuzi mara nyingi unahitaji biopsy au sampuli ya maji (kuondoa kioevu kutoka tezi ya limfu, kuchimba pleura, lumbar puncture, kioevu cha tumbo) kwa sababu makohozi yanaweza kuwa negative. Upasuaji wakati mwingine unahitajika kwa TB ya uti wa mgongo yenye uharibifu wa neva au kwa abscesses kubwa sana. TB nyingi za nje ya mapafu hazaambukizi — huhitaji kujitenga isipokuwa TB ya mapafu pia ipo.',
        sw_mtaa: 'Dawa ni zile zile (RHZE), lakini duration mara nyingi ni mrefu zaidi na njia ya utambuzi ni tofauti. TB ya tezi za limfu na pleural TB: kawaida miezi 6. Abdominal TB na bone/spinal TB (Pott\'s disease): miezi 9-12. TB meningitis: miezi 12 pamoja na wiki 6-8 za corticosteroids (kupunguza uvimbe hatari wa ubongo). Utambuzi mara nyingi unahitaji biopsy au fluid sample (lymph node aspiration, pleural tap, lumbar puncture, abdominal fluid) kwa sababu sputum inaweza kuwa negative. Surgery wakati mwingine inahitajika kwa spine TB yenye neurologic damage au abscesses kubwa sana. Extrapulmonary TB nyingi hazaambukizi — huhitaji kujitenga isipokuwa pulmonary TB pia ipo.',
      },
    },
    {
      q: {
        en: 'Can I drink alcohol or smoke during TB treatment?',
        sw: 'Naweza kunywa pombe au kuvuta sigara wakati wa matibabu ya TB?',
      },
      a: {
        en: 'Best to avoid both, but for different reasons. Alcohol + TB medicines (especially isoniazid, rifampicin, pyrazinamide) puts a heavy load on the liver — the risk of drug-induced hepatitis is several times higher in heavy drinkers. Yellow eyes, dark urine, nausea, and severe weakness while on TB treatment with alcohol can mean serious liver injury. Smoking damages the same lung tissue the bacteria are destroying — it delays healing, reduces oxygen levels, worsens cough, and increases the risk of post-TB lung disease. Tanzania has free smoking cessation support at many DOT centres. If you cannot stop completely, cut down significantly, and tell your clinician honestly so they can monitor your liver more closely (regular LFTs) and your lung recovery.',
        sw: 'Bora kuepuka zote, lakini kwa sababu tofauti. Pombe + dawa za TB (hasa isoniazid, rifampicin, pyrazinamide) huweka mzigo mzito kwenye ini — hatari ya hepatitis inayosababishwa na dawa ni mara kadhaa zaidi kwa wanywaji wazito. Macho ya njano, mkojo wa giza, kichefuchefu, na udhaifu mkubwa wakati wa matibabu ya TB pamoja na pombe vinaweza maanisha uharibifu mkubwa wa ini. Kuvuta sigara huharibu tishu hizo hizo za mapafu ambazo bakteria wanaharibu — huchelewesha uponaji, hupunguza viwango vya oksijeni, huzidisha kikohozi, na huongeza hatari ya post-TB lung disease. Tanzania ina msaada wa bure wa kuacha sigara katika vituo vingi vya DOT. Ikiwa huwezi kuacha kabisa, punguza sana, na mwambie daktari wako kwa uwazi ili afuatilie ini lako kwa karibu zaidi (LFTs mara kwa mara) na kupona kwa mapafu yako.',
        sw_mtaa: 'Bora kuepuka zote, lakini kwa sababu tofauti. Pombe + dawa za TB (hasa isoniazid, rifampicin, pyrazinamide) inaweka mzigo mzito kwenye ini — hatari ya drug-induced hepatitis ni mara kadhaa zaidi kwa wanywaji wazito. Macho ya njano, mkojo wa giza, kichefuchefu, na udhaifu mkubwa wakati wa TB treatment na pombe inaweza maanisha liver injury kubwa. Kuvuta sigara inaharibu tishu hizo hizo za mapafu ambazo bakteria wanaharibu — inachelewesha uponaji, inapunguza oxygen levels, inazidisha kikohozi, na inaongeza hatari ya post-TB lung disease. Tanzania ina msaada wa bure wa kuacha sigara katika DOT centres nyingi. Ikiwa huwezi kuacha kabisa, punguza sana, na mwambie daktari kwa uwazi ili afuatilie ini lako kwa karibu zaidi (LFTs mara kwa mara) na kupona kwa mapafu yako.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take every dose, every day, at the same time of day. Most TB drugs work best on an empty stomach (1 hour before food or 2 hours after). Set a daily phone alarm. DOT (Directly Observed Therapy) is offered at clinics — going daily is hard, but it doubles cure rates.',
      sw: 'Tumia kila dose, kila siku, kwa wakati huo huo wa siku. Dawa nyingi za TB hufanya kazi vizuri zaidi tumbo tupu (saa 1 kabla ya chakula au saa 2 baada). Weka tahadhari ya simu kila siku. DOT (Tiba ya Kuonewa Moja kwa Moja) hutolewa kliniki — kwenda kila siku ni ngumu, lakini huongeza viwango vya kupona mara mbili.',
      sw_mtaa: 'Tumia kila dose, kila siku, kwa wakati huo huo wa siku. Dawa nyingi za TB zinafanya kazi vizuri zaidi tumbo tupu (saa 1 kabla ya chakula au saa 2 baada). Weka alarm ya simu kila siku. DOT (Directly Observed Therapy) inatolewa kliniki — kwenda kila siku ni ngumu, lakini inaongeza cure rates mara mbili.',
    },
    {
      en: 'Eat enough — at least three meals a day with protein (beans, fish, eggs, milk, meat). TB causes weight loss and malnutrition makes recovery slower. NTLP provides nutrition support packages for underweight patients.',
      sw: 'Kula vya kutosha — angalau milo mitatu kwa siku yenye protini (maharage, samaki, mayai, maziwa, nyama). TB husababisha kupungua uzito na utapiamlo hufanya kupona kuwa polepole. NTLP hutoa pakti za msaada wa lishe kwa wagonjwa wenye uzito mdogo.',
      sw_mtaa: 'Kula vya kutosha — angalau milo mitatu kwa siku yenye protini (maharage, samaki, mayai, maziwa, nyama). TB inasababisha kupungua uzito na utapiamlo unafanya kupona kuwa polepole. NTLP inatoa nutrition support packages kwa wagonjwa wenye uzito mdogo.',
    },
    {
      en: 'Open windows daily. Sunlight and fresh air kill TB bacteria. Sleep alone for the first 2 weeks if you have a contagious form. Cover your mouth and nose when coughing. Dispose of used tissues by burning or in a closed bin.',
      sw: 'Fungua madirisha kila siku. Mwanga wa jua na hewa safi huua bakteria wa TB. Lala peke yako kwa wiki 2 za kwanza ikiwa una aina inayoambukiza. Funika mdomo na pua unapokohoa. Tupa karatasi za matumizi kwa kuziachota au kwenye pipa lililofungwa.',
      sw_mtaa: 'Fungua madirisha kila siku. Mwanga wa jua na hewa safi inaua bakteria wa TB. Lala peke yako wiki 2 za kwanza ikiwa una aina inayoambukiza. Funika mdomo na pua unapokohoa. Tupa karatasi za matumizi kwa kuziachota au kwenye pipa lililofungwa.',
    },
    {
      en: 'Track your weight weekly during treatment — gaining weight is a sign treatment is working. Persistent weight loss after the first month is a warning sign.',
      sw: 'Fuatilia uzito wako kila wiki wakati wa matibabu — kuongezeka uzito ni ishara matibabu yanafanya kazi. Kupungua uzito kwa kudumu baada ya mwezi wa kwanza ni ishara ya onyo.',
      sw_mtaa: 'Fuatilia uzito wako kila wiki wakati wa matibabu — kuongezeka uzito ni ishara matibabu inafanya kazi. Kupungua uzito kwa kudumu baada ya mwezi wa kwanza ni ishara ya warning.',
    },
    {
      en: 'Get HIV tested at TB diagnosis — every TB patient in Tanzania is offered HIV testing. If positive, ART is started within 2-8 weeks. Knowing your status improves your TB outcome.',
      sw: 'Pima VVU wakati wa utambuzi wa TB — kila mgonjwa wa TB Tanzania hupewa fursa ya kupima VVU. Ikiwa chanya, ART huanzishwa ndani ya wiki 2-8. Kujua hali yako huboresha matokeo ya TB.',
      sw_mtaa: 'Pima VVU wakati wa utambuzi wa TB — kila mgonjwa wa TB Tanzania anapewa fursa ya kupima VVU. Kama positive, ART inaanzishwa ndani ya wiki 2-8. Kujua status yako inaboresha matokeo ya TB.',
    },
    {
      en: 'Test for diabetes and blood pressure too. Diabetes makes TB harder to treat and TB worsens blood sugar control. Both deserve management alongside TB.',
      sw: 'Pima pia kisukari na shinikizo la damu. Kisukari hufanya TB kuwa ngumu zaidi kutibu na TB huzidisha udhibiti wa sukari ya damu. Zote zinahitaji usimamizi pamoja na TB.',
      sw_mtaa: 'Pima pia kisukari na shinikizo la damu. Kisukari inafanya TB kuwa ngumu zaidi kutibu na TB inazidisha sugar control. Zote zinahitaji management pamoja na TB.',
    },
    {
      en: 'Take vitamin B6 (pyridoxine) supplements while on isoniazid — especially in pregnancy, breastfeeding, HIV, diabetes, alcohol use, malnutrition, or elderly. It prevents nerve damage (peripheral neuropathy).',
      sw: 'Tumia virutubisho vya vitamin B6 (pyridoxine) ukiwa kwenye isoniazid — hasa katika mimba, kunyonyesha, VVU, kisukari, matumizi ya pombe, utapiamlo, au wazee. Inazuia uharibifu wa neva (peripheral neuropathy).',
      sw_mtaa: 'Tumia vitamin B6 (pyridoxine) supplements ukiwa kwenye isoniazid — hasa katika mimba, kunyonyesha, VVU, kisukari, matumizi ya pombe, utapiamlo, au wazee. Inazuia nerve damage (peripheral neuropathy).',
    },
    {
      en: 'Bring family contacts for screening — especially children under 5 and HIV-positive household members. Early screening can prevent active TB in them.',
      sw: 'Lete watu wa familia wa karibu kwa uchunguzi — hasa watoto chini ya miaka 5 na wanafamilia wenye VVU. Uchunguzi wa mapema unaweza kuzuia TB hai kwao.',
      sw_mtaa: 'Lete household contacts kwa screening — hasa watoto chini ya miaka 5 na wanafamilia wenye VVU. Screening ya mapema inaweza kuzuia active TB kwao.',
    },
    {
      en: 'Attend every follow-up: sputum check at 2 months, 5 months, and end of treatment. These confirm that you are responding and that you can be declared cured.',
      sw: 'Hudhuria kila ufuatiliaji: ukaguzi wa makohozi miezi 2, miezi 5, na mwisho wa matibabu. Hizi huthibitisha kuwa unajibu na kwamba unaweza kutangazwa kuwa umepona.',
      sw_mtaa: 'Hudhuria kila follow-up: sputum check miezi 2, miezi 5, na mwisho wa matibabu. Hizi zinathibitisha kuwa unajibu na unaweza kutangazwa umepona.',
    },
    {
      en: 'Mental health matters. TB diagnosis brings stigma, depression, anxiety. Talk to a counsellor at the DOT centre or join a peer support group. Treatment completion rates are much higher with social support.',
      sw: 'Afya ya akili ni muhimu. Utambuzi wa TB huleta unyanyapaa, huzuni, wasiwasi. Ongea na mshauri kituoni cha DOT au jiunge na kikundi cha msaada wa wenzako. Viwango vya kumaliza matibabu ni vya juu zaidi kwa msaada wa kijamii.',
      sw_mtaa: 'Mental health ni muhimu. TB diagnosis inaleta stigma, depression, wasiwasi. Ongea na counsellor kituoni cha DOT au jiunge na peer support group. Cure rates ni za juu zaidi kwa social support.',
    },
  ],

  warningTriggers: [
    {
      en: 'Stopping medicine before completion — single biggest cause of MDR-TB.',
      sw: 'Kusimamisha dawa kabla ya kumaliza — sababu kubwa zaidi ya MDR-TB.',
      sw_mtaa: 'Kusimamisha dawa kabla ya kumaliza — sababu kubwa zaidi ya MDR-TB.',
    },
    {
      en: 'Taking TB medicines with alcohol — multiplies the risk of liver injury.',
      sw: 'Kutumia dawa za TB pamoja na pombe — huongeza hatari ya uharibifu wa ini.',
      sw_mtaa: 'Kutumia dawa za TB pamoja na pombe — inaongeza hatari ya liver injury.',
    },
    {
      en: 'Hiding the diagnosis from family — they remain at risk, untested, untreated.',
      sw: 'Kuficha utambuzi kutoka kwa familia — wanabaki katika hatari, bila kupimwa, bila kutibiwa.',
      sw_mtaa: 'Kuficha diagnosis kutoka kwa family — wanabaki katika hatari, bila kupimwa, bila kutibiwa.',
    },
    {
      en: 'Sharing medicines or stretching doses to save them — the doses are calculated for full effect; partial doses breed resistance.',
      sw: 'Kushiriki dawa au kupunguza dose kuokoa — dose zimehesabiwa kwa athari kamili; dose za sehemu huzaa upinzani.',
      sw_mtaa: 'Kushiriki dawa au kupunguza dose kuokoa — dose zimecalculated kwa athari kamili; partial doses zinazaa resistance.',
    },
    {
      en: 'Continuing to smoke during treatment — slows lung healing, raises post-TB lung disease risk.',
      sw: 'Kuendelea kuvuta sigara wakati wa matibabu — hupunguza uponaji wa mapafu, huongeza hatari ya post-TB lung disease.',
      sw_mtaa: 'Kuendelea kuvuta sigara wakati wa matibabu — inapunguza uponaji wa mapafu, inaongeza hatari ya post-TB lung disease.',
    },
    {
      en: 'Refusing HIV testing — undiagnosed HIV makes TB much more deadly.',
      sw: 'Kukataa kupimwa VVU — VVU isiyogundulika hufanya TB iwe hatari zaidi.',
      sw_mtaa: 'Kukataa kupimwa VVU — VVU isiyogundulika inafanya TB iwe hatari zaidi.',
    },
    {
      en: 'Buying TB drugs privately without DOT supervision — risk of counterfeits, wrong doses, untraced resistance.',
      sw: 'Kununua dawa za TB kibinafsi bila usimamizi wa DOT — hatari ya bandia, dose zisizo sahihi, upinzani usio na ufuatiliaji.',
      sw_mtaa: 'Kununua TB drugs kibinafsi bila DOT supervision — hatari ya counterfeits, dose zisizo sahihi, untraced resistance.',
    },
    {
      en: 'Severe malnutrition during treatment — slows cure and risks malabsorption of TB drugs.',
      sw: 'Utapiamlo mkubwa wakati wa matibabu — hupunguza kupona na huhatarisha kunyonyeshwa kwa dawa za TB.',
      sw_mtaa: 'Utapiamlo mkubwa wakati wa matibabu — inapunguza kupona na inahatarisha malabsorption ya TB drugs.',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Coughing up blood (more than a streak) — could be severe pulmonary TB, cavitation, or aspergilloma',
        sw: 'Kukohoa damu (zaidi ya mstari) — inaweza kuwa TB kali ya mapafu, cavitation, au aspergilloma',
        sw_mtaa: 'Kukohoa damu (zaidi ya mstari mdogo) — inaweza kuwa TB kali ya mapafu, cavitation, au aspergilloma',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe shortness of breath at rest — could be pneumothorax, pleural effusion, or worsening TB',
        sw: 'Kushindwa kupumua kali ukiwa umepumzika — inaweza kuwa pneumothorax, mkusanyiko wa maji kwenye pleura, au TB inayozidi',
        sw_mtaa: 'Kushindwa kupumua kali ukiwa umepumzika — inaweza kuwa pneumothorax, pleural effusion, au TB inayozidi',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Yellow eyes, dark urine, severe nausea, right-upper-quadrant pain — likely drug-induced hepatitis. Stop drugs, see clinician within 24 hours',
        sw: 'Macho ya njano, mkojo wa giza, kichefuchefu kikali, maumivu ya tumbo upande wa kulia juu — uwezekano wa hepatitis inayosababishwa na dawa. Acha dawa, ona daktari ndani ya masaa 24',
        sw_mtaa: 'Macho ya njano, mkojo wa giza, kichefuchefu kikali, maumivu ya tumbo upande wa kulia juu — uwezekano wa drug-induced hepatitis. Acha dawa, ona daktari ndani ya masaa 24',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe rash with skin peeling, blistering, or mouth ulcers — possible Stevens-Johnson syndrome (rare but life-threatening)',
        sw: 'Vipele vikali na ngozi kubanduka, malenge, au vidonda mdomoni — uwezekano wa Stevens-Johnson syndrome (nadra lakini hatari ya maisha)',
        sw_mtaa: 'Vipele vikali na ngozi kubanduka, malenge, au vidonda mdomoni — uwezekano wa Stevens-Johnson syndrome (nadra lakini hatari ya maisha)',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'New numbness or burning in feet/hands — peripheral neuropathy from isoniazid. Add or increase vitamin B6, see clinician',
        sw: 'Ganzi mpya au kuwaka katika miguu/mikono — peripheral neuropathy kutokana na isoniazid. Ongeza au pandisha vitamin B6, ona daktari',
        sw_mtaa: 'Ganzi mpya au kuwaka katika miguu/mikono — peripheral neuropathy kutokana na isoniazid. Ongeza au pandisha vitamin B6, ona daktari',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Vision changes (blurriness, color loss, especially red-green) — possible ethambutol optic neuropathy. Stop ethambutol, urgent ophthalmology review',
        sw: 'Mabadiliko ya kuona (ukungu, kupotea rangi, hasa nyekundu-kijani) — uwezekano wa ethambutol optic neuropathy. Acha ethambutol, ukaguzi wa haraka wa daktari wa macho',
        sw_mtaa: 'Mabadiliko ya kuona (ukungu, kupotea rangi, hasa red-green) — uwezekano wa ethambutol optic neuropathy. Acha ethambutol, urgent ophthalmology review',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Confusion, severe headache, neck stiffness, vomiting — possible TB meningitis or worsening of known TB meningitis. EMERGENCY',
        sw: 'Kuchanganyikiwa, kichwa kikali, ukakavu wa shingo, kutapika — uwezekano wa TB ya ubongo au kuzidi kwa TB ya ubongo ijulikanayo. DHARURA',
        sw_mtaa: 'Kuchanganyikiwa, kichwa kikali, shingo ngumu, kutapika — uwezekano wa TB meningitis au kuzidi kwa TB meningitis ijulikanayo. DHARURA',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Fever or cough returning after symptom-free period during treatment — possible treatment failure, paradoxical reaction, or new infection',
        sw: 'Homa au kikohozi kurudi baada ya kipindi cha bila dalili wakati wa matibabu — uwezekano wa kushindwa kwa matibabu, paradoxical reaction, au maambukizi mapya',
        sw_mtaa: 'Homa au kikohozi kurudi baada ya kipindi cha bila dalili wakati wa matibabu — uwezekano wa treatment failure, paradoxical reaction, au maambukizi mapya',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe weakness, fainting, or rapid weight loss — possible Addisonian crisis from adrenal TB (rare but serious)',
        sw: 'Udhaifu mkubwa, kuzimia, au kupungua uzito haraka — uwezekano wa Addisonian crisis kutoka kwa TB ya adrenal (nadra lakini muhimu)',
        sw_mtaa: 'Udhaifu mkubwa, kuzimia, au kupungua uzito haraka — uwezekano wa Addisonian crisis kutoka kwa adrenal TB (nadra lakini muhimu)',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Symptoms not improving after 2 months of treatment — possible drug resistance, malabsorption, or non-adherence. Sputum re-test needed',
        sw: 'Dalili hazipungui baada ya miezi 2 ya matibabu — uwezekano wa upinzani wa dawa, kunyonyeshwa, au kutozingatia. Kipimo cha makohozi kinahitajika tena',
        sw_mtaa: 'Dalili hazipungui baada ya miezi 2 ya matibabu — uwezekano wa drug resistance, malabsorption, au non-adherence. Sputum re-test inahitajika',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  // ════════════════════════════════════════════════════════════════════
  // VARIANTS — severity / population / form-specific presentations
  // ════════════════════════════════════════════════════════════════════
  variants: [
    {
      id: 'tb_pulmonary_ds',
      severity: 'uncomplicated',
      label: {
        en: 'Drug-susceptible pulmonary TB',
        sw: 'TB ya mapafu inayoshambulika na dawa',
      },
      presentation: {
        en: 'Cough lasting more than 2 weeks, often with sputum (sometimes blood-tinged), night sweats that soak the bedding, fevers especially in the evenings, unexplained weight loss, fatigue, loss of appetite, and chest pain. Adults often look thin and tired. Diagnosis is confirmed by GeneXpert MTB/RIF (preferred — gives result in 2 hours and screens for rifampicin resistance) or sputum smear microscopy. Chest X-ray supports the diagnosis but does not confirm it alone.',
        sw: 'Kikohozi kinachodumu zaidi ya wiki 2, mara nyingi pamoja na makohozi (wakati mwingine yenye damu), jasho la usiku linalolowanisha matandiko, homa hasa jioni, kupungua uzito bila sababu, uchovu, kupoteza hamu ya kula, na maumivu ya kifua. Watu wazima mara nyingi huonekana wembamba na wamechoka. Utambuzi unathibitishwa na GeneXpert MTB/RIF (inayopendekezwa — hutoa matokeo masaa 2 na huchunguza upinzani wa rifampicin) au darubini ya makohozi. X-ray ya kifua husaidia utambuzi lakini haithibitishi peke yake.',
        sw_mtaa: 'Kikohozi kinachodumu zaidi ya wiki 2, mara nyingi pamoja na makohozi (wakati mwingine yenye damu), jasho la usiku linalolowanisha matandiko, homa hasa jioni, kupungua uzito bila sababu, uchovu, kupoteza hamu ya kula, na maumivu ya kifua. Watu wazima mara nyingi wanaonekana wembamba na wamechoka. Utambuzi unathibitishwa na GeneXpert MTB/RIF (inayopendelewa — inatoa matokeo masaa 2 na inachunguza rifampicin resistance) au darubini ya makohozi. Chest X-ray inasaidia utambuzi lakini haithibitishi peke yake.',
      },
      recognitionSigns: [
        {
          en: 'Cough >2 weeks, productive (with sputum)',
          sw: 'Kikohozi cha zaidi ya wiki 2, kinachotoa makohozi',
          sw_mtaa: 'Kikohozi zaidi ya wiki 2, na makohozi',
        },
        {
          en: 'Night sweats that soak the sheets',
          sw: 'Jasho la usiku linalolowanisha shuka',
          sw_mtaa: 'Jasho la usiku linalolowanisha shuka',
        },
        {
          en: 'Unexplained weight loss',
          sw: 'Kupungua uzito bila sababu',
          sw_mtaa: 'Kupungua uzito bila sababu',
        },
        {
          en: 'Evening fevers',
          sw: 'Homa za jioni',
          sw_mtaa: 'Homa za jioni',
        },
        {
          en: 'Positive GeneXpert MTB/RIF or sputum smear',
          sw: 'GeneXpert MTB/RIF au darubini ya makohozi chanya',
          sw_mtaa: 'GeneXpert MTB/RIF positive au darubini ya makohozi positive',
        },
      ],
      treatmentJourney: {
        en: 'Six months total in two phases. Intensive phase (months 1-2): four drugs daily — Rifampicin + Isoniazid + Pyrazinamide + Ethambutol (RHZE). Continuation phase (months 3-6): two drugs daily — Rifampicin + Isoniazid (RH). All drugs are provided free at NTLP-supported DOT centres. Sputum is re-checked at 2 months (must be smear-negative to move to continuation phase), 5 months, and end of treatment. Most patients feel substantially better within 2-3 weeks. Cure rate exceeds 85% when treatment is completed in full.',
        sw: 'Jumla ya miezi sita katika hatua mbili. Hatua kali (miezi 1-2): dawa nne kila siku — Rifampicin + Isoniazid + Pyrazinamide + Ethambutol (RHZE). Hatua ya kuendelea (miezi 3-6): dawa mbili kila siku — Rifampicin + Isoniazid (RH). Dawa zote hutolewa bure katika vituo vya DOT vinavyoungwa mkono na NTLP. Makohozi hupimwa tena miezi 2 (ni lazima yawe negative ya darubini ili kuhamia hatua ya kuendelea), miezi 5, na mwisho wa matibabu. Wagonjwa wengi hujisikia vizuri zaidi ndani ya wiki 2-3. Kiwango cha kupona kinazidi 85% wakati matibabu yanakamilika kikamilifu.',
        sw_mtaa: 'Jumla ya miezi sita katika hatua mbili. Intensive phase (miezi 1-2): dawa nne kila siku — Rifampicin + Isoniazid + Pyrazinamide + Ethambutol (RHZE). Continuation phase (miezi 3-6): dawa mbili kila siku — Rifampicin + Isoniazid (RH). Dawa zote zinatolewa bure kwenye DOT centres za NTLP. Makohozi yanapimwa tena miezi 2 (yawe smear-negative kuhamia continuation phase), miezi 5, na mwisho wa matibabu. Wagonjwa wengi wanajisikia vizuri zaidi ndani ya wiki 2-3. Cure rate inazidi 85% wakati matibabu yanakamilika kikamilifu.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Massive haemoptysis (coughing up large amounts of blood)',
            sw: 'Kukohoa damu nyingi sana',
            sw_mtaa: 'Kukohoa damu nyingi sana',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Severe shortness of breath, fast breathing at rest',
            sw: 'Kushindwa kupumua kali, kupumua haraka ukiwa umepumzika',
            sw_mtaa: 'Kushindwa kupumua kali, kupumua haraka ukiwa umepumzika',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Yellow eyes or dark urine on TB drugs — possible hepatotoxicity',
            sw: 'Macho ya njano au mkojo wa giza kwenye dawa za TB — uwezekano wa hepatotoxicity',
            sw_mtaa: 'Macho ya njano au mkojo wa giza kwenye dawa za TB — uwezekano wa hepatotoxicity',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Monthly DOT visit for drug pickup and clinical review. Sputum smear at month 2 (decides whether to move to continuation phase), month 5, and end of treatment. Weight, side effect screening, and adherence counselling at every visit. Cure is declared when symptoms resolve and end-of-treatment sputum is negative. Post-treatment: clinical follow-up at 6 and 12 months for relapse screening, especially in HIV co-infected, smokers, and those with cavitary disease.',
        sw: 'Ziara ya kila mwezi ya DOT kwa kuchukua dawa na ukaguzi wa kliniki. Darubini ya makohozi mwezi 2 (huamua kuhamia hatua ya kuendelea), mwezi 5, na mwisho wa matibabu. Uzito, uchunguzi wa athari, na ushauri wa kuzingatia katika kila ziara. Kupona hutangazwa wakati dalili zinapungua na makohozi ya mwisho wa matibabu ni negative. Baada ya matibabu: ufuatiliaji wa kliniki miezi 6 na 12 kwa uchunguzi wa kurudia, hasa kwa wenye VVU, wavutaji sigara, na walio na ugonjwa wa cavitary.',
        sw_mtaa: 'Monthly DOT visit kwa kuchukua dawa na clinical review. Sputum smear mwezi 2 (inaamua kuhamia continuation phase), mwezi 5, na mwisho wa matibabu. Uzito, side effects screening, na adherence counselling kila ziara. Cure inatangazwa wakati dalili zinapungua na end-of-treatment sputum ni negative. Post-treatment: clinical follow-up miezi 6 na 12 kwa relapse screening, hasa kwa wenye VVU, smokers, na walio na cavitary disease.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('NTLG_STG_2023')],
    },

    // ─── PEDIATRIC TB ─────────────────────────────────────────────────
    {
      id: 'tb_pediatric',
      severity: 'uncomplicated',
      population: 'pediatric',
      label: {
        en: 'TB in children (under 15)',
        sw: 'TB kwa watoto (chini ya miaka 15)',
      },
      presentation: {
        en: 'Children with TB often look different from adults. Classic signs: persistent cough longer than 2 weeks, fever, poor weight gain or weight loss, failure to thrive, listlessness, contact with a known TB case. Younger children may have non-specific signs — irritability, drowsiness, persistent fever. Sputum is often not produced (or swallowed) so diagnosis may use gastric aspirate, induced sputum, stool GeneXpert, lymph node biopsy, or chest X-ray plus tuberculin skin test. Pediatric TB is often paucibacillary (low bacterial burden) and less contagious. Extrapulmonary forms (lymph node, miliary, meningitis) are more common in young children.',
        sw: 'Watoto wenye TB mara nyingi huonekana tofauti na watu wazima. Ishara za kawaida: kikohozi cha kudumu zaidi ya wiki 2, homa, uzito mbaya au kupungua uzito, kushindwa kustawi, uchovu, kuwasiliana na kesi ya TB inayojulikana. Watoto wadogo wanaweza kuwa na ishara zisizo maalum — uhasira, usingizi, homa ya kudumu. Makohozi mara nyingi hayatolewi (au humezwa) hivyo utambuzi unaweza kutumia gastric aspirate, induced sputum, stool GeneXpert, biopsy ya tezi ya limfu, au X-ray ya kifua pamoja na tuberculin skin test. TB ya watoto mara nyingi ni paucibacillary (mzigo mdogo wa bakteria) na inaambukiza kidogo. Aina za nje ya mapafu (tezi za limfu, miliary, ubongo) ni za kawaida zaidi kwa watoto wadogo.',
        sw_mtaa: 'Watoto wenye TB mara nyingi wanaonekana tofauti na watu wazima. Classic signs: kikohozi cha kudumu zaidi ya wiki 2, homa, uzito mbaya au kupungua uzito, kushindwa kustawi, uchovu, kuwasiliana na case ya TB inayojulikana. Watoto wadogo wanaweza kuwa na non-specific signs — uhasira, usingizi, homa ya kudumu. Sputum mara nyingi haitolewi (au inamezwa) hivyo utambuzi unaweza kutumia gastric aspirate, induced sputum, stool GeneXpert, lymph node biopsy, au chest X-ray pamoja na tuberculin skin test. Pediatric TB mara nyingi ni paucibacillary (low bacterial burden) na inaambukiza kidogo. Forms za extrapulmonary (lymph node, miliary, meningitis) ni za kawaida zaidi kwa watoto wadogo.',
      },
      recognitionSigns: [
        {
          en: 'Cough >2 weeks unresponsive to standard antibiotics',
          sw: 'Kikohozi zaidi ya wiki 2 kisichotibika kwa antibiotics za kawaida',
          sw_mtaa: 'Kikohozi zaidi ya wiki 2 kisichotibika kwa antibiotics za kawaida',
        },
        {
          en: 'Failure to gain weight or weight loss over weeks',
          sw: 'Kushindwa kuongeza uzito au kupungua uzito kwa wiki',
          sw_mtaa: 'Kushindwa kuongeza uzito au kupungua uzito kwa wiki',
        },
        {
          en: 'Known household contact with TB',
          sw: 'Mwanafamilia mwenye TB anayejulikana',
          sw_mtaa: 'Household contact anayejulikana na TB',
        },
        {
          en: 'Persistent low-grade fever, no other explanation',
          sw: 'Homa ya kiwango cha chini cha kudumu, hakuna maelezo mengine',
          sw_mtaa: 'Homa ya kiwango cha chini cha kudumu, hakuna explanation nyingine',
        },
        {
          en: 'Enlarged lymph nodes (often neck), painless, more than 4 weeks',
          sw: 'Tezi za limfu kubwa (mara nyingi shingoni), zisizo na maumivu, zaidi ya wiki 4',
          sw_mtaa: 'Tezi za limfu kubwa (mara nyingi shingoni), zisizo na maumivu, zaidi ya wiki 4',
        },
      ],
      treatmentJourney: {
        en: 'Same four drugs (RHZE) but as child-friendly dispersible fixed-dose combinations, dosed by weight band. Treatment duration: 6 months for most pulmonary TB and lymph node TB; 9-12 months for bone TB or extensive disease; 12 months plus corticosteroids for TB meningitis. NTLP provides all drugs free in age- and weight-appropriate packaging. All household contacts under 5 are eligible for IPT (isoniazid preventive therapy). Children also need pyridoxine (vitamin B6) while on isoniazid, especially if HIV-positive, malnourished, or breastfed by an isoniazid-treated mother.',
        sw: 'Dawa nne zile zile (RHZE) lakini kama mchanganyiko wa fixed-dose inayofaa kwa watoto, dose kwa kipimo cha uzito. Muda wa matibabu: miezi 6 kwa TB nyingi ya mapafu na TB ya tezi za limfu; miezi 9-12 kwa TB ya mfupa au ugonjwa mkubwa; miezi 12 pamoja na corticosteroids kwa TB ya ubongo. NTLP hutoa dawa zote bure katika pakiti zinazofaa umri na uzito. Watu wote wa kaya chini ya miaka 5 wanastahili IPT (isoniazid preventive therapy). Watoto pia wanahitaji pyridoxine (vitamin B6) wakiwa kwenye isoniazid, hasa ikiwa wana VVU, utapiamlo, au wanaonyonyeshwa na mama anayetibiwa na isoniazid.',
        sw_mtaa: 'Dawa nne zile zile (RHZE) lakini kama mchanganyiko wa fixed-dose dispersible inayofaa kwa watoto, dose kwa weight band. Treatment duration: miezi 6 kwa pulmonary TB nyingi na lymph node TB; miezi 9-12 kwa bone TB au extensive disease; miezi 12 pamoja na corticosteroids kwa TB meningitis. NTLP inatoa dawa zote bure katika packaging zinazofaa umri na uzito. Household contacts wote chini ya miaka 5 wanastahili IPT. Watoto pia wanahitaji pyridoxine (vitamin B6) wakiwa kwenye isoniazid, hasa ikiwa wana VVU, utapiamlo, au wanaonyonyeshwa na mama anayetibiwa na isoniazid.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Convulsions, severe drowsiness, neck stiffness — possible TB meningitis. EMERGENCY',
            sw: 'Kifafa, usingizi mzito, ukakavu wa shingo — uwezekano wa TB ya ubongo. DHARURA',
            sw_mtaa: 'Kifafa, usingizi mzito, shingo ngumu — uwezekano wa TB meningitis. DHARURA',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Severe difficulty breathing, fast breathing, chest indrawing',
            sw: 'Ugumu mkubwa wa kupumua, kupumua haraka, mbavu kuingia ndani',
            sw_mtaa: 'Ugumu mkubwa wa kupumua, kupumua haraka, mbavu kuingia ndani',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Worsening malnutrition during treatment — needs urgent nutritional rehabilitation',
            sw: 'Utapiamlo unaozidi wakati wa matibabu — unahitaji ukarabati wa lishe wa haraka',
            sw_mtaa: 'Utapiamlo unaozidi wakati wa matibabu — unahitaji nutritional rehabilitation ya haraka',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Monthly review with weight, height, side-effect screen, and adherence. Re-evaluate growth at 2, 5, and end of treatment. All household contacts must be screened: parents/siblings >5 years with sputum or X-ray; under-5 with skin test, X-ray, and IPT. After cure, monitor growth and lung function for 1-2 years — many children regain full growth, but bronchiectasis or chronic respiratory symptoms can occur. School should not exclude a child once they are confirmed non-contagious after 2-4 weeks of treatment.',
        sw: 'Ukaguzi wa kila mwezi na uzito, urefu, uchunguzi wa athari, na kuzingatia. Tathmini upya ukuaji miezi 2, 5, na mwisho wa matibabu. Watu wote wa kaya lazima wachunguzwe: wazazi/ndugu zaidi ya miaka 5 na makohozi au X-ray; chini ya miaka 5 na skin test, X-ray, na IPT. Baada ya kupona, fuatilia ukuaji na utendaji wa mapafu kwa miaka 1-2 — watoto wengi hupata ukuaji kamili, lakini bronchiectasis au dalili sugu za kupumua zinaweza kutokea. Shule haifai kumtenga mtoto mara anapothibitishwa kuwa hauambukizi baada ya wiki 2-4 za matibabu.',
        sw_mtaa: 'Monthly review na uzito, urefu, side-effects screen, na adherence. Tathmini upya ukuaji miezi 2, 5, na mwisho wa matibabu. Household contacts wote lazima wachunguzwe: wazazi/ndugu zaidi ya miaka 5 na sputum au X-ray; chini ya miaka 5 na skin test, X-ray, na IPT. Baada ya kupona, fuatilia ukuaji na lung function kwa miaka 1-2 — watoto wengi wanapata ukuaji kamili, lakini bronchiectasis au chronic respiratory symptoms zinaweza kutokea. Shule isimtenge mtoto mara anapothibitishwa hauambukizi baada ya wiki 2-4 za matibabu.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('IMCI_2024')],
    },

    // ─── TB IN PREGNANCY ──────────────────────────────────────────────
    {
      id: 'tb_pregnancy',
      severity: 'uncomplicated',
      population: 'pregnancy',
      label: {
        en: 'TB in pregnancy',
        sw: 'TB wakati wa mimba',
      },
      presentation: {
        en: 'Pregnant women with TB are at higher risk of severe disease, poor outcomes, and transmission to the newborn (congenital TB is rare but serious). Symptoms overlap with normal pregnancy fatigue, so diagnosis can be delayed. Cough >2 weeks, night sweats, weight loss instead of weight gain, evening fever — all should trigger TB testing in any trimester. Active TB during pregnancy raises risks of miscarriage, preterm birth, intrauterine growth restriction, low birth weight, and maternal mortality. Treatment is essential and protective.',
        sw: 'Wajawazito wenye TB wako katika hatari kubwa zaidi ya ugonjwa mbaya, matokeo mabaya, na kuambukiza mtoto mchanga (congenital TB ni nadra lakini muhimu). Dalili huingiliana na uchovu wa kawaida wa mimba, hivyo utambuzi unaweza kucheleweshwa. Kikohozi zaidi ya wiki 2, jasho la usiku, kupungua uzito badala ya kuongezeka, homa ya jioni — yote yanafaa kuchochea uchunguzi wa TB katika trimester yoyote. TB hai wakati wa mimba huongeza hatari za kuharibika kwa mimba, kuzaliwa kabla ya wakati, intrauterine growth restriction, uzito mdogo, na vifo vya mama. Matibabu ni muhimu na ya kulinda.',
        sw_mtaa: 'Wajawazito wenye TB wako katika hatari kubwa zaidi ya ugonjwa mbaya, matokeo mabaya, na kuambukiza mtoto mchanga (congenital TB ni nadra lakini muhimu). Dalili zinaingiliana na uchovu wa kawaida wa mimba, hivyo utambuzi unaweza kucheleweshwa. Kikohozi zaidi ya wiki 2, jasho la usiku, kupungua uzito badala ya kuongezeka, homa ya jioni — yote yanafaa kuchochea TB testing katika trimester yoyote. Active TB wakati wa mimba inaongeza hatari za miscarriage, preterm birth, IUGR, low birth weight, na maternal mortality. Treatment ni muhimu na ya kulinda.',
      },
      recognitionSigns: [
        {
          en: 'Persistent cough not improving in pregnancy',
          sw: 'Kikohozi cha kudumu kisichoboreka katika mimba',
          sw_mtaa: 'Kikohozi cha kudumu kisichoboreka katika mimba',
        },
        {
          en: 'Failure to gain expected pregnancy weight, or loss',
          sw: 'Kushindwa kuongeza uzito wa mimba unaotarajiwa, au kupoteza',
          sw_mtaa: 'Kushindwa kuongeza uzito unaotarajiwa wa mimba, au kupoteza',
        },
        {
          en: 'Night sweats unrelated to ambient heat',
          sw: 'Jasho la usiku lisilohusiana na joto la mazingira',
          sw_mtaa: 'Jasho la usiku lisilohusiana na joto la mazingira',
        },
        {
          en: 'Contact history with TB',
          sw: 'Historia ya kuwasiliana na TB',
          sw_mtaa: 'Contact history na TB',
        },
      ],
      treatmentJourney: {
        en: 'RHZE for 6 months — the same regimen used in non-pregnant adults. All four drugs are considered safe in pregnancy. Streptomycin (causes congenital deafness) is AVOIDED entirely. Pyridoxine (vitamin B6) is mandatory throughout treatment in pregnancy to prevent isoniazid-related peripheral neuropathy in mother and baby. Vitamin K may be given to mother and newborn in the last weeks to prevent bleeding (rifampicin can deplete it). Breastfeeding is encouraged — TB drugs in breast milk are at very low levels and not harmful, but the dose is not therapeutic for the baby. If the mother is still infectious at delivery, the newborn receives 6 months of preventive isoniazid and BCG vaccination is delayed.',
        sw: 'RHZE kwa miezi 6 — regimen ile ile inayotumika kwa watu wazima wasio wajawazito. Dawa zote nne zinachukuliwa kuwa salama katika mimba. Streptomycin (husababisha uziwi wa kuzaliwa) HUEPUKWA kabisa. Pyridoxine (vitamin B6) ni lazima katika matibabu yote katika mimba kuzuia peripheral neuropathy inayohusiana na isoniazid kwa mama na mtoto. Vitamin K inaweza kutolewa kwa mama na mtoto mchanga katika wiki za mwisho kuzuia damu (rifampicin inaweza kuipunguza). Kunyonyesha kunashauriwa — dawa za TB katika maziwa ya mama ziko katika viwango vya chini sana na sio hatari, lakini dose sio ya kutibu kwa mtoto. Ikiwa mama bado anaambukiza wakati wa kuzaa, mtoto mchanga hupokea miezi 6 ya isoniazid ya kuzuia na chanjo ya BCG huchelewa.',
        sw_mtaa: 'RHZE kwa miezi 6 — regimen ile ile inayotumika kwa watu wazima wasio wajawazito. Dawa zote nne ni salama katika mimba. Streptomycin (inasababisha congenital deafness) inAVOIDED kabisa. Pyridoxine (vitamin B6) ni lazima katika matibabu yote katika mimba kuzuia isoniazid-related peripheral neuropathy kwa mama na mtoto. Vitamin K inaweza kutolewa kwa mama na mtoto mchanga katika wiki za mwisho kuzuia bleeding (rifampicin inaweza kuipunguza). Kunyonyesha kunashauriwa — TB drugs katika maziwa ya mama ziko katika viwango vya chini sana na sio hatari, lakini dose sio therapeutic kwa mtoto. Ikiwa mama bado anaambukiza wakati wa delivery, mtoto mchanga anapata miezi 6 ya isoniazid preventive na BCG inacheleweshwa.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Severe vomiting that prevents medication intake — risk of treatment interruption',
            sw: 'Kutapika kali kunakozuia kunywa dawa — hatari ya kusimama matibabu',
            sw_mtaa: 'Kutapika kali kunakozuia kunywa dawa — hatari ya treatment interruption',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Yellow eyes, dark urine — drug-induced hepatitis, more frequent in pregnancy',
            sw: 'Macho ya njano, mkojo wa giza — hepatitis inayosababishwa na dawa, ya kawaida zaidi katika mimba',
            sw_mtaa: 'Macho ya njano, mkojo wa giza — drug-induced hepatitis, ya kawaida zaidi katika mimba',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Reduced fetal movements during treatment — assess urgently',
            sw: 'Mwendo wa fetasi uliopungua wakati wa matibabu — tathmini kwa haraka',
            sw_mtaa: 'Fetal movements zilizopungua wakati wa matibabu — assess urgently',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Combined ANC and TB clinic follow-up. Monthly weight, fetal growth ultrasound at 28-32 weeks, baseline and monthly liver function tests (LFTs). Delivery planning involves both obstetric and TB teams. At delivery: screen the newborn (clinical assessment, chest X-ray if symptomatic), start IPT in the baby if mother still smear-positive at delivery, delay BCG until IPT is complete, and continue breastfeeding. Postpartum: full course of TB treatment continues per the original schedule.',
        sw: 'Ufuatiliaji wa pamoja wa ANC na kliniki ya TB. Uzito wa kila mwezi, ultrasound ya ukuaji wa fetasi wiki 28-32, vipimo vya ini vya msingi na kila mwezi (LFTs). Mpango wa kujifungua unahusisha timu za uzazi na TB. Wakati wa kujifungua: chunguza mtoto mchanga (tathmini ya kliniki, X-ray ya kifua ikiwa kuna dalili), anza IPT kwa mtoto ikiwa mama bado ni smear-positive wakati wa kujifungua, chelewesha BCG hadi IPT ikamilike, na endelea kunyonyesha. Baada ya kujifungua: kozi kamili ya matibabu ya TB inaendelea kwa ratiba ya awali.',
        sw_mtaa: 'Combined ANC na TB clinic follow-up. Uzito wa kila mwezi, fetal growth ultrasound wiki 28-32, baseline na monthly liver function tests (LFTs). Delivery planning inahusisha obstetric na TB teams. Wakati wa delivery: chunguza newborn (clinical assessment, chest X-ray kama una symptoms), anza IPT kwa mtoto kama mama bado smear-positive wakati wa delivery, chelewesha BCG hadi IPT iishe, na endelea kunyonyesha. Postpartum: kozi kamili ya TB treatment inaendelea kwa ratiba ya awali.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('MOH_TZ_MATERNAL_2024')],
    },

    // ─── TB-HIV CO-INFECTION ──────────────────────────────────────────
    {
      id: 'tb_hiv_coinfection',
      severity: 'complicated',
      label: {
        en: 'TB-HIV co-infection',
        sw: 'Maambukizi ya pamoja ya TB na VVU',
      },
      presentation: {
        en: 'TB is the leading cause of death among people living with HIV in Tanzania. HIV roughly multiplies a person\'s lifetime TB risk by 20-30. With low CD4 (<200), pulmonary TB may present atypically — minimal cough, normal chest X-ray, smear-negative — and extrapulmonary TB (lymph node, miliary, meningitis, pericarditis, abdominal) is much more common. Diagnosis must be aggressive: GeneXpert MTB/RIF on sputum and any other available specimen (lymph node aspirate, pleural fluid, urine LF-LAM if very ill), chest X-ray, and clinical assessment together.',
        sw: 'TB ni sababu kuu ya vifo miongoni mwa watu wanaoishi na VVU Tanzania. VVU huzidisha hatari ya maisha ya TB kwa mara 20-30. Kwa CD4 ya chini (<200), TB ya mapafu inaweza kujitokeza tofauti — kikohozi kidogo, X-ray ya kifua ya kawaida, smear-negative — na TB ya nje ya mapafu (tezi za limfu, miliary, ubongo, pericarditis, tumbo) ni ya kawaida zaidi. Utambuzi lazima uwe wa nguvu: GeneXpert MTB/RIF kwenye makohozi na sampuli yoyote nyingine inayopatikana (lymph node aspirate, pleural fluid, urine LF-LAM ikiwa mgonjwa sana), X-ray ya kifua, na tathmini ya kliniki pamoja.',
        sw_mtaa: 'TB ni sababu kuu ya vifo miongoni mwa watu wanaoishi na VVU Tanzania. VVU inazidisha lifetime TB risk ya mtu kwa mara 20-30. Kwa CD4 ya chini (<200), pulmonary TB inaweza kujionyesha tofauti — kikohozi kidogo, chest X-ray ya kawaida, smear-negative — na extrapulmonary TB (lymph node, miliary, meningitis, pericarditis, abdominal) ni ya kawaida zaidi. Utambuzi lazima uwe wa nguvu: GeneXpert MTB/RIF kwenye sputum na specimen nyingine yoyote inayopatikana (lymph node aspirate, pleural fluid, urine LF-LAM kama mgonjwa sana), chest X-ray, na clinical assessment pamoja.',
      },
      recognitionSigns: [
        {
          en: 'Any TB symptom in a person with HIV — investigate immediately',
          sw: 'Dalili yoyote ya TB kwa mtu mwenye VVU — chunguza mara moja',
          sw_mtaa: 'Dalili yoyote ya TB kwa mtu mwenye VVU — investigate mara moja',
        },
        {
          en: 'CD4 < 200 with prolonged fever, weight loss, or lymph node enlargement',
          sw: 'CD4 chini ya 200 yenye homa ya muda mrefu, kupungua uzito, au tezi za limfu kubwa',
          sw_mtaa: 'CD4 chini ya 200 yenye prolonged fever, weight loss, au lymph node enlargement',
        },
        {
          en: 'Positive urine LF-LAM in advanced HIV (sensitive in CD4 <100)',
          sw: 'LF-LAM ya mkojo chanya katika VVU iliyokomaa (nyeti katika CD4 chini ya 100)',
          sw_mtaa: 'Urine LF-LAM positive katika advanced HIV (sensitive katika CD4 <100)',
        },
      ],
      treatmentJourney: {
        en: 'Standard RHZE for 6 months, with three additions: (1) Co-trimoxazole preventive therapy (CPT) — one tablet daily, prevents bacterial pneumonia and PCP. (2) ART started within 2 weeks if CD4<50, within 2-8 weeks otherwise. For TB meningitis: ART delayed to 4-8 weeks. (3) Pyridoxine (vitamin B6) is mandatory throughout treatment. The major interaction: rifampicin lowers dolutegravir (in TLD) — dolutegravir is doubled (50mg twice daily instead of once daily) while on rifampicin, returning to 50mg once daily 2 weeks after rifampicin is stopped. Some older ART regimens (EFV, NVP) are also affected — discuss with HIV clinician. Watch for IRIS (paradoxical reaction) in the first 6 weeks of ART — usually managed with steroids and continued treatment.',
        sw: 'RHZE ya kawaida kwa miezi 6, pamoja na nyongeza tatu: (1) Tiba ya kuzuia ya co-trimoxazole (CPT) — kidonge kimoja kila siku, huzuia bacterial pneumonia na PCP. (2) ART huanzishwa ndani ya wiki 2 ikiwa CD4<50, ndani ya wiki 2-8 vinginevyo. Kwa TB ya ubongo: ART huchelewa hadi wiki 4-8. (3) Pyridoxine (vitamin B6) ni lazima katika matibabu yote. Mwingiliano mkubwa: rifampicin inashusha dolutegravir (katika TLD) — dolutegravir huongezewa (50mg mara mbili kwa siku badala ya mara moja) ukiwa kwenye rifampicin, kurudi 50mg mara moja kwa siku wiki 2 baada ya rifampicin kusimamishwa. Baadhi ya regimens za zamani za ART (EFV, NVP) pia huathirika — jadili na daktari wa VVU. Angalia IRIS (paradoxical reaction) katika wiki 6 za kwanza za ART — kawaida hutibiwa kwa steroids na kuendelea kwa matibabu.',
        sw_mtaa: 'Standard RHZE kwa miezi 6, pamoja na nyongeza tatu: (1) Co-trimoxazole preventive therapy (CPT) — kidonge kimoja kila siku, inazuia bacterial pneumonia na PCP. (2) ART inaanzishwa ndani ya wiki 2 ikiwa CD4<50, ndani ya wiki 2-8 vinginevyo. Kwa TB meningitis: ART inacheleweshwa hadi wiki 4-8. (3) Pyridoxine (vitamin B6) ni lazima katika matibabu yote. Major interaction: rifampicin inashusha dolutegravir (katika TLD) — dolutegravir inaongezewa (50mg mara mbili kwa siku badala ya mara moja) ukiwa kwenye rifampicin, inarudi 50mg mara moja kwa siku wiki 2 baada ya rifampicin kusimama. Baadhi ya older ART regimens (EFV, NVP) pia zinaathirika — jadili na HIV clinician. Angalia IRIS (paradoxical reaction) katika wiki 6 za kwanza za ART — kawaida inatibiwa kwa steroids na treatment kuendelea.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Worsening symptoms 2-6 weeks after starting ART — possible IRIS, urgent review',
            sw: 'Dalili zinazozidi wiki 2-6 baada ya kuanza ART — uwezekano wa IRIS, ukaguzi wa haraka',
            sw_mtaa: 'Dalili zinazozidi wiki 2-6 baada ya kuanza ART — uwezekano wa IRIS, urgent review',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'New neurological symptoms (confusion, seizures, severe headache) — possible TB meningitis or cryptococcal meningitis',
            sw: 'Dalili mpya za neva (kuchanganyikiwa, kifafa, kichwa kikali) — uwezekano wa TB ya ubongo au cryptococcal meningitis',
            sw_mtaa: 'New neurological symptoms (confusion, seizures, severe headache) — uwezekano wa TB meningitis au cryptococcal meningitis',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Severe rash with mucous membrane involvement — possible drug reaction, can be from multiple drugs',
            sw: 'Vipele vikali na ushiriki wa utando wa kamasi — uwezekano wa athari ya dawa, inaweza kuwa kutoka kwa dawa nyingi',
            sw_mtaa: 'Severe rash na mucous membrane involvement — uwezekano wa drug reaction, inaweza kuwa kutoka kwa dawa nyingi',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Integrated TB-HIV care at CTC. Monthly drug pickup for both regimens. CD4 and viral load monitoring on standard HIV schedule. LFTs more frequent (baseline, 2 weeks, monthly) given higher hepatotoxicity risk. Mental health and adherence support intensive — pill burden is heavy. After TB cure, return to standard CTC schedule. Lifelong ART continues. Long-term: increased risk of TB recurrence, post-TB lung disease, and other opportunistic infections — continue vigilance.',
        sw: 'Huduma jumuishi ya TB-VVU katika CTC. Kuchukua dawa kila mwezi kwa regimens zote mbili. CD4 na viral load ufuatiliaji kwa ratiba ya kawaida ya VVU. LFTs mara nyingi zaidi (msingi, wiki 2, kila mwezi) kutokana na hatari kubwa ya hepatotoxicity. Afya ya akili na msaada wa kuzingatia ni mkubwa — mzigo wa vidonge ni mzito. Baada ya kupona TB, rudi ratiba ya kawaida ya CTC. ART ya maisha inaendelea. Muda mrefu: hatari iliyoongezeka ya kurudia kwa TB, post-TB lung disease, na maambukizi mengine ya nafasi — endelea uangalifu.',
        sw_mtaa: 'Integrated TB-HIV care kwenye CTC. Monthly drug pickup kwa regimens zote mbili. CD4 na viral load monitoring kwa standard HIV schedule. LFTs mara nyingi zaidi (baseline, wiki 2, kila mwezi) kutokana na higher hepatotoxicity risk. Mental health na adherence support kubwa — pill burden ni mzito. Baada ya TB cure, rudi standard CTC schedule. Lifelong ART inaendelea. Long-term: increased risk ya TB recurrence, post-TB lung disease, na opportunistic infections nyingine — endelea kuangalia.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('NACP_ART_2024')],
    },

    // ─── EXTRAPULMONARY TB ────────────────────────────────────────────
    {
      id: 'tb_extrapulmonary',
      severity: 'complicated',
      label: {
        en: 'Extrapulmonary TB (EPTB)',
        sw: 'TB ya nje ya mapafu (EPTB)',
      },
      presentation: {
        en: 'TB outside the lungs. Most common forms in Tanzania: lymph node TB (painless neck swelling, often in young adults and HIV), pleural TB (chest pain and breathlessness from fluid in the chest), abdominal TB (chronic abdominal pain, ascites, weight loss), spinal TB or Pott\'s disease (back pain, leg weakness, vertebral collapse), TB meningitis (headache, confusion, neck stiffness), pericardial TB (chest pain, ankle swelling), and genitourinary TB (sterile pyuria, infertility). Diagnosis often requires biopsy or fluid sampling because sputum may be negative or absent. Each form has its own duration: most 6 months, bone/joint 9 months, meningitis 12 months with steroids.',
        sw: 'TB nje ya mapafu. Aina za kawaida zaidi Tanzania: TB ya tezi za limfu (uvimbe wa shingo usio na maumivu, mara nyingi kwa vijana na VVU), TB ya pleura (maumivu ya kifua na kushindwa kupumua kutokana na maji kifuani), TB ya tumbo (maumivu ya tumbo ya muda mrefu, ascites, kupungua uzito), TB ya uti wa mgongo au Pott\'s disease (maumivu ya mgongo, udhaifu wa miguu, kuporomoka kwa vertebra), TB ya ubongo (kichwa, kuchanganyikiwa, ukakavu wa shingo), TB ya pericardium (maumivu ya kifua, uvimbe wa miguu), na TB ya genitourinary (sterile pyuria, ugumba). Utambuzi mara nyingi unahitaji biopsy au sampuli ya kioevu kwa sababu makohozi yanaweza kuwa negative au hayatoki. Kila aina ina muda wake: nyingi miezi 6, mfupa/kiungo miezi 9, ubongo miezi 12 na steroids.',
        sw_mtaa: 'TB nje ya mapafu. Common forms Tanzania: lymph node TB (uvimbe wa shingo usio na maumivu, mara nyingi kwa vijana na VVU), pleural TB (maumivu ya kifua na breathlessness kutokana na fluid kifuani), abdominal TB (maumivu ya tumbo ya muda mrefu, ascites, kupungua uzito), spinal TB au Pott\'s disease (maumivu ya mgongo, leg weakness, vertebral collapse), TB meningitis (kichwa, kuchanganyikiwa, shingo ngumu), pericardial TB (maumivu ya kifua, ankle swelling), na genitourinary TB (sterile pyuria, ugumba). Utambuzi mara nyingi unahitaji biopsy au fluid sampling kwa sababu sputum inaweza kuwa negative au haitoki. Kila form ina duration yake: nyingi miezi 6, bone/joint miezi 9, meningitis miezi 12 na steroids.',
      },
      recognitionSigns: [
        {
          en: 'Painless lymph node enlargement >4 weeks (especially neck)',
          sw: 'Tezi za limfu kubwa zisizo na maumivu zaidi ya wiki 4 (hasa shingoni)',
          sw_mtaa: 'Painless lymph node enlargement zaidi ya wiki 4 (hasa shingoni)',
        },
        {
          en: 'Chronic back pain with associated weight loss or night sweats',
          sw: 'Maumivu ya mgongo ya muda mrefu na kupungua uzito au jasho la usiku',
          sw_mtaa: 'Chronic back pain na kupungua uzito au night sweats',
        },
        {
          en: 'Headache with confusion, fever, neck stiffness — TB meningitis',
          sw: 'Kichwa na kuchanganyikiwa, homa, ukakavu wa shingo — TB ya ubongo',
          sw_mtaa: 'Kichwa na kuchanganyikiwa, homa, shingo ngumu — TB meningitis',
        },
        {
          en: 'Chronic abdominal pain, ascites, low-grade fever — abdominal TB',
          sw: 'Maumivu ya tumbo ya muda mrefu, ascites, homa ya kiwango cha chini — TB ya tumbo',
          sw_mtaa: 'Chronic abdominal pain, ascites, low-grade fever — abdominal TB',
        },
      ],
      treatmentJourney: {
        en: 'Standard RHZE drugs but variable duration. Lymph node TB and pleural TB: 6 months. Abdominal TB: 6-9 months. Bone and joint TB (Pott\'s disease): 9-12 months. TB meningitis: 12 months PLUS 6-8 weeks of corticosteroids (dexamethasone tapering) to reduce dangerous inflammation. Pericardial TB also benefits from corticosteroids. Surgery is reserved for specific complications: large abscesses, spinal instability with neurological compromise, perforated bowel in abdominal TB, drainage of pericardial effusion. Most EPTB is not contagious — household contact tracing focuses on the index case\'s pulmonary status if any.',
        sw: 'Dawa za kawaida za RHZE lakini muda unaobadilika. TB ya tezi za limfu na TB ya pleura: miezi 6. TB ya tumbo: miezi 6-9. TB ya mfupa na kiungo (Pott\'s disease): miezi 9-12. TB ya ubongo: miezi 12 PAMOJA NA wiki 6-8 za corticosteroids (dexamethasone inayopungua) kupunguza uvimbe hatari. TB ya pericardium pia hufaidika na corticosteroids. Upasuaji huhifadhiwa kwa matatizo maalum: abscesses kubwa, kutoshika kwa uti wa mgongo na uharibifu wa neva, utumbo uliopasuka katika TB ya tumbo, kutoa maji ya pericardium. EPTB nyingi hazaambukizi — ufuatiliaji wa watu wa karibu wa kaya unakazia hali ya mapafu ya kesi ya msingi ikiwa ipo.',
        sw_mtaa: 'Standard RHZE drugs lakini variable duration. Lymph node TB na pleural TB: miezi 6. Abdominal TB: miezi 6-9. Bone na joint TB (Pott\'s disease): miezi 9-12. TB meningitis: miezi 12 PAMOJA NA wiki 6-8 za corticosteroids (dexamethasone tapering) kupunguza inflammation hatari. Pericardial TB pia inafaidika na corticosteroids. Surgery inahifadhiwa kwa specific complications: abscesses kubwa, spinal instability na neurological compromise, perforated bowel katika abdominal TB, drainage ya pericardial effusion. EPTB nyingi hazaambukizi — household contact tracing inakazia pulmonary status ya index case ikiwa ipo.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'New neurological symptoms in suspected TB meningitis — EMERGENCY',
            sw: 'Dalili mpya za neva katika TB ya ubongo inayoshukiwa — DHARURA',
            sw_mtaa: 'New neurological symptoms katika TB meningitis inayoshukiwa — DHARURA',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Progressive leg weakness in spinal TB — emergency neurosurgical referral',
            sw: 'Udhaifu wa miguu unaozidi katika TB ya uti wa mgongo — rufaa ya haraka ya neurosurgery',
            sw_mtaa: 'Progressive leg weakness katika spinal TB — emergency neurosurgical referral',
          },
          urgency: 'emergency',
        },
        {
          sign: {
            en: 'Constrictive pericarditis signs (raised JVP, oedema, hepatomegaly) — surgical referral',
            sw: 'Dalili za constrictive pericarditis (JVP iliyoinuka, uvimbe, hepatomegaly) — rufaa ya upasuaji',
            sw_mtaa: 'Constrictive pericarditis signs (raised JVP, edema, hepatomegaly) — surgical referral',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Monthly review with form-specific assessment: lymph node size, neurological exam for meningitis or spinal TB, abdominal exam for abdominal TB, echocardiogram for pericardial TB. Imaging at end of treatment for documentation of healing. After cure: follow lymph nodes for paradoxical enlargement (can occur even after cure), monitor spinal stability for years, neurological rehabilitation for residual deficits, fertility counselling for genitourinary TB. EPTB recovery can be incomplete — function may not fully return.',
        sw: 'Ukaguzi wa kila mwezi na tathmini maalum ya aina: ukubwa wa tezi za limfu, uchunguzi wa neva kwa TB ya ubongo au TB ya uti wa mgongo, uchunguzi wa tumbo kwa TB ya tumbo, echocardiogram kwa TB ya pericardium. Imaging mwisho wa matibabu kwa kuandika kupona. Baada ya kupona: fuatilia tezi za limfu kwa kuongezeka kwa paradoxical (inaweza kutokea hata baada ya kupona), fuatilia utulivu wa uti wa mgongo kwa miaka, ukarabati wa neva kwa nakisi zilizobaki, ushauri wa uzazi kwa TB ya genitourinary. Kupona kwa EPTB kunaweza kutokuwa kamili — utendaji unaweza usirudi kabisa.',
        sw_mtaa: 'Monthly review na form-specific assessment: lymph node size, neurological exam kwa meningitis au spinal TB, abdominal exam kwa abdominal TB, echocardiogram kwa pericardial TB. Imaging mwisho wa matibabu kwa documentation ya healing. Baada ya kupona: fuatilia lymph nodes kwa paradoxical enlargement (inaweza kutokea hata baada ya kupona), monitor spinal stability kwa miaka, neurological rehabilitation kwa residual deficits, fertility counselling kwa genitourinary TB. EPTB recovery inaweza kuwa incomplete — function inaweza isirudi kabisa.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('MUHIMBILI_PROTOCOLS')],
    },

    // ─── MDR-TB ───────────────────────────────────────────────────────
    {
      id: 'tb_mdr',
      severity: 'critical',
      label: {
        en: 'Multidrug-resistant TB (MDR-TB)',
        sw: 'TB inayopinga dawa nyingi (MDR-TB)',
      },
      presentation: {
        en: 'TB caused by bacteria resistant to at least rifampicin and isoniazid — the two most powerful first-line drugs. Suspected when: sputum smear remains positive at 2 months despite RHZE, symptoms return after completing treatment, GeneXpert detects rifampicin resistance, the patient is a known contact of an MDR-TB case, or the patient is from a high-MDR-TB area. Confirmation requires drug susceptibility testing (DST) by culture or molecular methods (line probe assays, second-line LPA). Pre-XDR and XDR-TB are further resistant forms — managed by specialised teams only.',
        sw: 'TB inayosababishwa na bakteria walio na upinzani angalau dhidi ya rifampicin na isoniazid — dawa mbili zenye nguvu zaidi za first-line. Inashukiwa wakati: smear ya makohozi inabaki chanya miezi 2 licha ya RHZE, dalili zinarudi baada ya kumaliza matibabu, GeneXpert inagundua upinzani wa rifampicin, mgonjwa ni mwasiliani anayejulikana wa kesi ya MDR-TB, au mgonjwa anatoka eneo lenye MDR-TB nyingi. Uthibitisho unahitaji uchunguzi wa kushambuliwa na dawa (DST) kwa utamaduni au mbinu za molekuli (line probe assays, second-line LPA). Pre-XDR na XDR-TB ni aina zinazoendelea zaidi za upinzani — husimamiwa na timu maalum tu.',
        sw_mtaa: 'TB inayosababishwa na bakteria wenye resistance angalau dhidi ya rifampicin na isoniazid — dawa mbili zenye nguvu zaidi za first-line. Inashukiwa wakati: sputum smear inabaki positive miezi 2 licha ya RHZE, dalili zinarudi baada ya kumaliza treatment, GeneXpert inagundua rifampicin resistance, mgonjwa ni known contact wa MDR-TB case, au mgonjwa anatoka high-MDR-TB area. Confirmation inahitaji drug susceptibility testing (DST) kwa culture au molecular methods (line probe assays, second-line LPA). Pre-XDR na XDR-TB ni aina zinazoendelea zaidi za resistance — zinasimamiwa na specialised teams tu.',
      },
      recognitionSigns: [
        {
          en: 'Smear-positive at 2 months despite full RHZE adherence',
          sw: 'Smear-positive baada ya miezi 2 licha ya kuzingatia RHZE kikamilifu',
          sw_mtaa: 'Smear-positive miezi 2 licha ya full RHZE adherence',
        },
        {
          en: 'TB symptoms returning after declared cure',
          sw: 'Dalili za TB kurudi baada ya kupona kutangazwa',
          sw_mtaa: 'TB symptoms kurudi baada ya kupona kutangazwa',
        },
        {
          en: 'GeneXpert MTB/RIF detects rifampicin resistance',
          sw: 'GeneXpert MTB/RIF inagundua rifampicin resistance',
          sw_mtaa: 'GeneXpert MTB/RIF inagundua rifampicin resistance',
        },
        {
          en: 'Known contact with MDR-TB case',
          sw: 'Mwasiliani anayejulikana na kesi ya MDR-TB',
          sw_mtaa: 'Known contact na MDR-TB case',
        },
      ],
      treatmentJourney: {
        en: 'Referral to a specialised MDR-TB centre is mandatory (in Tanzania: Muhimbili, KCMC, Mbeya, and selected regional centres). Treatment is 9-24 months depending on the regimen. Newer shorter regimens (BPaL, BPaLM — Bedaquiline + Pretomanid + Linezolid ± Moxifloxacin) are 6-9 months and increasingly available. Older regimens (longer all-oral or injectable-based) are still used in some cases. Side effects are heavier: hearing loss (with aminoglycoside injectables, now mostly avoided), psychiatric symptoms (linezolid, cycloserine), QT prolongation (bedaquiline, moxifloxacin), severe nausea, peripheral neuropathy. Cure rate has improved to 70-80% with newer regimens but treatment is still hard. Strict counselling, mental health support, and adherence monitoring are essential. Hospitalisation may be needed for initial weeks.',
        sw: 'Rufaa kwa kituo maalum cha MDR-TB ni lazima (Tanzania: Muhimbili, KCMC, Mbeya, na vituo vilivyochaguliwa vya kikanda). Matibabu ni miezi 9-24 kulingana na regimen. Regimens mpya fupi (BPaL, BPaLM — Bedaquiline + Pretomanid + Linezolid ± Moxifloxacin) ni miezi 6-9 na zinazidi kupatikana. Regimens za zamani (zinazoendelea zote-mdomo au zenye sindano) bado zinatumika katika kesi zingine. Athari ni nzito zaidi: kupoteza usikiaji (kwa sindano za aminoglycoside, sasa mara nyingi huepukwa), dalili za akili (linezolid, cycloserine), QT prolongation (bedaquiline, moxifloxacin), kichefuchefu kikali, peripheral neuropathy. Kiwango cha kupona kimeboresha hadi 70-80% kwa regimens mpya lakini matibabu bado ni magumu. Ushauri madhubuti, msaada wa afya ya akili, na ufuatiliaji wa kuzingatia ni muhimu. Kulazwa hospitalini huenda kukahitajika kwa wiki za awali.',
        sw_mtaa: 'Referral kwa specialised MDR-TB centre ni lazima (Tanzania: Muhimbili, KCMC, Mbeya, na selected regional centres). Treatment ni miezi 9-24 kulingana na regimen. Newer shorter regimens (BPaL, BPaLM — Bedaquiline + Pretomanid + Linezolid ± Moxifloxacin) ni miezi 6-9 na zinazidi kupatikana. Older regimens (longer all-oral au injectable-based) bado zinatumika katika baadhi ya cases. Side effects ni nzito zaidi: hearing loss (na aminoglycoside injectables, sasa mara nyingi huepukwa), psychiatric symptoms (linezolid, cycloserine), QT prolongation (bedaquiline, moxifloxacin), kichefuchefu kikali, peripheral neuropathy. Cure rate imeboresha hadi 70-80% kwa newer regimens lakini matibabu bado ni magumu. Strict counselling, mental health support, na adherence monitoring ni muhimu. Hospitalisation inaweza kuhitajika kwa wiki za awali.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Hearing loss or balance problems — possible aminoglycoside toxicity',
            sw: 'Kupoteza usikiaji au matatizo ya usawa — uwezekano wa aminoglycoside toxicity',
            sw_mtaa: 'Hearing loss au balance problems — uwezekano wa aminoglycoside toxicity',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Suicidal thoughts or severe depression — possible cycloserine/linezolid psychiatric toxicity',
            sw: 'Mawazo ya kujidhuru au huzuni kali — uwezekano wa cycloserine/linezolid psychiatric toxicity',
            sw_mtaa: 'Suicidal thoughts au severe depression — uwezekano wa cycloserine/linezolid psychiatric toxicity',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Palpitations or fainting — possible QT prolongation (bedaquiline, moxifloxacin)',
            sw: 'Mapigo ya moyo au kuzimia — uwezekano wa QT prolongation (bedaquiline, moxifloxacin)',
            sw_mtaa: 'Palpitations au kuzimia — uwezekano wa QT prolongation (bedaquiline, moxifloxacin)',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Weekly review for the first 2 months, then monthly. Audiometry, ECG, LFTs, renal function, thyroid (for ethionamide), full blood count (for linezolid) all monitored on schedule. Monthly sputum smear and culture until conversion, then less frequent. Mental health screening at every visit. After cure: lifelong follow-up at 6 monthly intervals for the first 2 years (relapse risk higher than DS-TB), then annually. Hearing aids and other rehabilitation may be needed for those with treatment-related disability.',
        sw: 'Ukaguzi wa kila wiki kwa miezi 2 ya kwanza, kisha kila mwezi. Audiometry, ECG, LFTs, utendaji wa figo, tezi ya thyroid (kwa ethionamide), hesabu kamili ya damu (kwa linezolid) zote zinafuatiliwa kwa ratiba. Smear na utamaduni wa makohozi wa kila mwezi hadi conversion, kisha mara chache zaidi. Uchunguzi wa afya ya akili katika kila ziara. Baada ya kupona: ufuatiliaji wa maisha katika muda wa miezi 6 kwa miaka 2 ya kwanza (hatari ya kurudia ni kubwa kuliko DS-TB), kisha kila mwaka. Vifaa vya kusikia na ukarabati mwingine vinaweza kuhitajika kwa wenye ulemavu unaohusiana na matibabu.',
        sw_mtaa: 'Weekly review kwa miezi 2 ya kwanza, kisha monthly. Audiometry, ECG, LFTs, renal function, thyroid (kwa ethionamide), full blood count (kwa linezolid) zote zinafuatiliwa kwa schedule. Monthly sputum smear na culture hadi conversion, kisha less frequent. Mental health screening kila ziara. Baada ya kupona: lifelong follow-up kwa 6 monthly intervals kwa miaka 2 ya kwanza (relapse risk ni kubwa kuliko DS-TB), kisha annually. Hearing aids na rehabilitation nyingine inaweza kuhitajika kwa wenye treatment-related disability.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024')],
    },

    // ─── LATENT TB / IPT ──────────────────────────────────────────────
    {
      id: 'tb_latent',
      severity: 'prevention',
      label: {
        en: 'Latent TB infection (LTBI)',
        sw: 'Maambukizi ya TB iliyofichwa (LTBI)',
      },
      presentation: {
        en: 'A person infected with TB bacteria but with no symptoms, no signs of active disease, no contagiousness, and a normal chest X-ray. Latent TB is invisible — found only through targeted testing: tuberculin skin test (TST/Mantoux) or interferon-gamma release assay (IGRA, e.g. QuantiFERON). Who should be tested? Close contacts of an active TB case (especially household contacts under 5 and HIV-positive), people starting immunosuppressive therapy, healthcare workers in high-risk settings, refugees from high-TB countries. Most people with latent TB never develop active disease — but 5-10% will, and the risk is higher with HIV, diabetes, malnutrition, age, and immunosuppression.',
        sw: 'Mtu aliyeambukizwa na bakteria wa TB lakini bila dalili, bila ishara za ugonjwa hai, bila kuambukiza, na X-ray ya kifua ya kawaida. TB iliyofichwa haionekani — hupatikana tu kupitia uchunguzi unaolengwa: kipimo cha ngozi cha tuberculin (TST/Mantoux) au interferon-gamma release assay (IGRA, mfano QuantiFERON). Nani anatakiwa kuchunguzwa? Watu wa karibu wa kesi ya TB hai (hasa watu wa kaya chini ya miaka 5 na wenye VVU), watu wanaoanza tiba ya kukandamiza kinga, wafanyakazi wa afya katika mazingira ya hatari, wakimbizi kutoka nchi zenye TB nyingi. Watu wengi wenye TB iliyofichwa hawatakuwa na ugonjwa hai — lakini 5-10% watakuwa, na hatari ni kubwa zaidi na VVU, kisukari, utapiamlo, umri, na kukandamiza kinga.',
        sw_mtaa: 'Mtu aliyeambukizwa na TB bacteria lakini bila symptoms, bila signs za active disease, bila contagiousness, na chest X-ray ya kawaida. Latent TB haionekani — inapatikana tu kupitia targeted testing: tuberculin skin test (TST/Mantoux) au IGRA (mfano QuantiFERON). Nani anatakiwa kuchunguzwa? Close contacts wa active TB case (hasa household contacts chini ya miaka 5 na wenye VVU), watu wanaoanza immunosuppressive therapy, healthcare workers katika high-risk settings, refugees kutoka high-TB countries. Watu wengi wenye latent TB hawatakuwa na active disease — lakini 5-10% watakuwa, na risk ni kubwa zaidi na VVU, kisukari, utapiamlo, umri, na immunosuppression.',
      },
      recognitionSigns: [
        {
          en: 'Positive TST (skin test) or IGRA — but no symptoms of active TB',
          sw: 'TST chanya (kipimo cha ngozi) au IGRA — lakini hakuna dalili za TB hai',
          sw_mtaa: 'Positive TST (skin test) au IGRA — lakini hakuna dalili za active TB',
        },
        {
          en: 'Household member of an active TB case, no symptoms in self',
          sw: 'Mwanafamilia wa kesi ya TB hai, hakuna dalili kwako',
          sw_mtaa: 'Household member wa active TB case, hakuna dalili kwako',
        },
        {
          en: 'HIV-positive person screening negative for active TB — eligible for IPT',
          sw: 'Mtu mwenye VVU akichunguzwa negative kwa TB hai — anastahili IPT',
          sw_mtaa: 'HIV-positive person akichunguzwa negative kwa active TB — anastahili IPT',
        },
      ],
      treatmentJourney: {
        en: 'Preventive therapy options: (1) 6 months of daily isoniazid (IPT, 300mg in adults, weight-banded in children) — the long-standing standard, used in Tanzania. (2) 3 months of weekly rifapentine + isoniazid (3HP) — newer, shorter, equally effective; rolling out in Tanzania. (3) 4 months of daily rifampicin — alternative when isoniazid not tolerated. Take pyridoxine (vitamin B6) with isoniazid. Before starting: confirm no active TB (no cough, no fever, no weight loss, normal chest X-ray). Monitor for hepatitis (yellow eyes, dark urine), peripheral neuropathy, and rash. The benefit: 60-90% reduction in future active TB.',
        sw: 'Chaguzi za tiba ya kuzuia: (1) miezi 6 ya isoniazid kila siku (IPT, 300mg kwa watu wazima, kwa weight band kwa watoto) — kiwango cha muda mrefu, kinachotumika Tanzania. (2) miezi 3 ya rifapentine + isoniazid kila wiki (3HP) — mpya, fupi, yenye ufanisi sawa; inaanza Tanzania. (3) miezi 4 ya rifampicin kila siku — mbadala wakati isoniazid haivumiliwi. Tumia pyridoxine (vitamin B6) pamoja na isoniazid. Kabla ya kuanza: thibitisha hakuna TB hai (hakuna kikohozi, hakuna homa, hakuna kupungua uzito, X-ray ya kifua ya kawaida). Fuatilia kwa hepatitis (macho ya njano, mkojo wa giza), peripheral neuropathy, na vipele. Faida: kupungua kwa 60-90% kwa TB hai ya baadaye.',
        sw_mtaa: 'Preventive therapy options: (1) miezi 6 ya isoniazid daily (IPT, 300mg kwa watu wazima, weight-banded kwa watoto) — the long-standing standard, used Tanzania. (2) miezi 3 ya weekly rifapentine + isoniazid (3HP) — mpya, fupi, equally effective; inaanza Tanzania. (3) miezi 4 ya rifampicin daily — alternative wakati isoniazid haivumiliwi. Tumia pyridoxine (vitamin B6) na isoniazid. Kabla ya kuanza: thibitisha no active TB (no cough, no fever, no weight loss, normal chest X-ray). Monitor kwa hepatitis (yellow eyes, dark urine), peripheral neuropathy, na rash. Benefit: 60-90% reduction katika future active TB.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'New cough, fever, or weight loss while on IPT — possible active TB. Stop IPT, investigate',
            sw: 'Kikohozi kipya, homa, au kupungua uzito ukiwa kwenye IPT — uwezekano wa TB hai. Acha IPT, chunguza',
            sw_mtaa: 'Kikohozi kipya, homa, au kupungua uzito ukiwa kwenye IPT — uwezekano wa active TB. Acha IPT, investigate',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Yellow eyes or dark urine on IPT — possible hepatitis. Stop, see clinician',
            sw: 'Macho ya njano au mkojo wa giza kwenye IPT — uwezekano wa hepatitis. Acha, ona daktari',
            sw_mtaa: 'Macho ya njano au mkojo wa giza kwenye IPT — uwezekano wa hepatitis. Acha, ona daktari',
          },
          urgency: 'urgent',
        },
      ],
      followUp: {
        en: 'Monthly review during IPT: symptom screen, adherence, side effects, LFTs at baseline and as clinically indicated. After completion of IPT: document completion in CTC/TB record. The preventive effect lasts years but is not permanent — re-exposure can still cause infection. People with HIV may benefit from a second round of IPT 5 years later. Always re-screen if new exposure occurs.',
        sw: 'Ukaguzi wa kila mwezi wakati wa IPT: uchunguzi wa dalili, kuzingatia, athari, LFTs msingi na kama inavyoonyeshwa kliniki. Baada ya kumaliza IPT: andika kumaliza katika rekodi ya CTC/TB. Athari ya kuzuia hudumu miaka lakini sio ya kudumu — kuwasiliana tena bado kunaweza kusababisha maambukizi. Watu wenye VVU wanaweza kufaidika na duru ya pili ya IPT miaka 5 baadaye. Daima chunguza tena ikiwa kuwasiliana kupya kunatokea.',
        sw_mtaa: 'Monthly review wakati wa IPT: symptom screen, adherence, side effects, LFTs baseline na as clinically indicated. Baada ya kumaliza IPT: document completion katika CTC/TB record. Preventive effect inadumu miaka lakini sio permanent — re-exposure bado inaweza kusababisha infection. Watu wenye VVU wanaweza kufaidika na second round ya IPT miaka 5 baadaye. Daima re-screen ikiwa new exposure inatokea.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('NACP_ART_2024')],
    },

    // ─── POST-TB CONTINUITY ───────────────────────────────────────────
    {
      id: 'tb_continuity',
      severity: 'continuity',
      label: {
        en: 'Post-TB recovery and long-term continuity',
        sw: 'Kupona baada ya TB na ufuatiliaji wa muda mrefu',
      },
      presentation: {
        en: 'TB cure is a beginning, not an end. Many survivors carry the marks of the disease — post-TB lung disease (PTLD: fibrosis, bronchiectasis, reduced lung capacity), persistent cough, recurrent chest infections, breathlessness on exertion, and sometimes chronic respiratory failure. Mental health sequelae include anxiety, depression, and post-traumatic stress, especially after long MDR-TB treatment. Children may have lasting growth deficits. Bone and joint TB survivors may have permanent kyphosis or limb shortening. Genitourinary TB can cause infertility. EPTB can leave specific organ deficits. The risk of recurrence is real — about 2-5% within 2 years, higher in HIV, smokers, and incomplete treatment.',
        sw: 'Kupona TB ni mwanzo, sio mwisho. Wengi waliopona wanabeba alama za ugonjwa — post-TB lung disease (PTLD: fibrosis, bronchiectasis, uwezo wa mapafu uliopungua), kikohozi cha kudumu, maambukizi ya kifua yanayorudi, kushindwa kupumua kwa juhudi, na wakati mwingine kushindwa kupumua kwa muda mrefu. Sequelae za afya ya akili ni pamoja na wasiwasi, huzuni, na post-traumatic stress, hasa baada ya matibabu marefu ya MDR-TB. Watoto wanaweza kuwa na vikwazo vya ukuaji vya kudumu. Waliopona TB ya mfupa na kiungo wanaweza kuwa na kyphosis ya kudumu au kufupisha kwa kiungo. TB ya genitourinary inaweza kusababisha ugumba. EPTB inaweza kuacha kasoro maalum za viungo. Hatari ya kurudia ni ya kweli — karibu 2-5% ndani ya miaka 2, kubwa zaidi katika VVU, wavutaji sigara, na matibabu yasiyokamilika.',
        sw_mtaa: 'TB cure ni mwanzo, sio mwisho. Wengi survivors wanabeba alama za ugonjwa — post-TB lung disease (PTLD: fibrosis, bronchiectasis, reduced lung capacity), persistent cough, recurrent chest infections, breathlessness on exertion, na wakati mwingine chronic respiratory failure. Mental health sequelae ni pamoja na anxiety, depression, na post-traumatic stress, hasa baada ya MDR-TB treatment ndefu. Watoto wanaweza kuwa na lasting growth deficits. Bone na joint TB survivors wanaweza kuwa na permanent kyphosis au limb shortening. Genitourinary TB inaweza kusababisha infertility. EPTB inaweza kuacha specific organ deficits. Risk ya recurrence ni ya kweli — karibu 2-5% ndani ya miaka 2, kubwa zaidi katika VVU, smokers, na incomplete treatment.',
      },
      recognitionSigns: [
        {
          en: 'New persistent cough after declared TB cure — must rule out recurrence',
          sw: 'Kikohozi kipya cha kudumu baada ya kupona TB kutangazwa — lazima kuondoa kurudia',
          sw_mtaa: 'New persistent cough baada ya TB cure — lazima kuondoa recurrence',
        },
        {
          en: 'Breathlessness limiting daily activity after cure',
          sw: 'Kushindwa kupumua kunakozuia shughuli za kila siku baada ya kupona',
          sw_mtaa: 'Breathlessness inayozuia daily activity baada ya cure',
        },
        {
          en: 'Recurrent chest infections (3+ per year) after TB',
          sw: 'Maambukizi ya kifua yanayorudi (3+ kwa mwaka) baada ya TB',
          sw_mtaa: 'Recurrent chest infections (3+ kwa mwaka) baada ya TB',
        },
        {
          en: 'Persistent depression, anxiety, or fatigue 6+ months after cure',
          sw: 'Huzuni ya kudumu, wasiwasi, au uchovu miezi 6+ baada ya kupona',
          sw_mtaa: 'Persistent depression, anxiety, au uchovu miezi 6+ baada ya cure',
        },
      ],
      treatmentJourney: {
        en: 'Management is symptom-based: pulmonary rehabilitation (breathing exercises, gradual physical activity, education), inhaled bronchodilators if obstruction is present, antibiotics for acute exacerbations of bronchiectasis (often with prolonged courses), and physiotherapy for sputum clearance. Smoking cessation is the single biggest modifiable factor. Annual influenza vaccination and pneumococcal vaccination are recommended. Nutrition support continues — malnutrition lingers after TB. Mental health: counselling, peer support, antidepressants if indicated. Spinal TB survivors may need orthopaedic follow-up and bracing. Genitourinary TB survivors may need fertility evaluation. Long-term oxygen therapy is reserved for severe post-TB respiratory failure.',
        sw: 'Usimamizi unatokana na dalili: ukarabati wa mapafu (mazoezi ya kupumua, mazoezi ya kimwili ya hatua kwa hatua, elimu), bronchodilator za kuvuta ikiwa kuna mzuiaji, antibiotics kwa mashambulizi ya papo hapo ya bronchiectasis (mara nyingi na kozi ndefu), na physiotherapy kwa kusafisha makohozi. Kuacha kuvuta sigara ni jambo kubwa zaidi linaloweza kubadilishwa. Chanjo ya mafua ya kila mwaka na chanjo ya pneumococcal zinashauriwa. Msaada wa lishe unaendelea — utapiamlo unabaki baada ya TB. Afya ya akili: ushauri, msaada wa wenzao, antidepressants ikiwa inaonyeshwa. Waliopona TB ya uti wa mgongo huenda wakahitaji ufuatiliaji wa orthopaedic na bracing. Waliopona TB ya genitourinary huenda wakahitaji tathmini ya uzazi. Tiba ya oksijeni ya muda mrefu huhifadhiwa kwa kushindwa kupumua kali kwa post-TB.',
        sw_mtaa: 'Management ni symptom-based: pulmonary rehabilitation (breathing exercises, gradual physical activity, education), inhaled bronchodilators ikiwa kuna obstruction, antibiotics kwa acute exacerbations za bronchiectasis (mara nyingi na prolonged courses), na physiotherapy kwa sputum clearance. Smoking cessation ni single biggest modifiable factor. Annual influenza vaccination na pneumococcal vaccination zinashauriwa. Nutrition support inaendelea — utapiamlo unabaki baada ya TB. Mental health: counselling, peer support, antidepressants ikiwa zinaonyeshwa. Spinal TB survivors wanaweza kuhitaji orthopaedic follow-up na bracing. Genitourinary TB survivors wanaweza kuhitaji fertility evaluation. Long-term oxygen therapy inahifadhiwa kwa severe post-TB respiratory failure.',
      },
      dangerSigns: [
        {
          sign: {
            en: 'Coughing up blood after TB cure — could be aspergilloma, bronchiectasis bleed, or TB recurrence',
            sw: 'Kukohoa damu baada ya kupona TB — inaweza kuwa aspergilloma, kutoka damu kwa bronchiectasis, au TB kurudia',
            sw_mtaa: 'Kukohoa damu baada ya TB cure — inaweza kuwa aspergilloma, bronchiectasis bleed, au TB recurrence',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Severe breathlessness at rest or while sleeping — possible cor pulmonale or severe PTLD',
            sw: 'Kushindwa kupumua kali ukiwa umepumzika au unalala — uwezekano wa cor pulmonale au PTLD kali',
            sw_mtaa: 'Severe breathlessness at rest au unalala — uwezekano wa cor pulmonale au severe PTLD',
          },
          urgency: 'urgent',
        },
        {
          sign: {
            en: 'Suicidal ideation post-TB — urgent mental health referral',
            sw: 'Mawazo ya kujidhuru baada ya TB — rufaa ya haraka ya afya ya akili',
            sw_mtaa: 'Suicidal ideation post-TB — urgent mental health referral',
          },
          urgency: 'emergency',
        },
      ],
      followUp: {
        en: 'Clinical follow-up at 6 and 12 months after cure as baseline. Symptom-based thereafter. Annual chest X-ray if PTLD diagnosed. Spirometry where available. Vaccination check yearly. Mental health screen at every visit. Bring TB history to every new clinician — past TB matters for chest pain evaluation, immunosuppression decisions, surgery planning, and travel medicine. The TibaHub vault should keep treatment records, sputum results, X-rays, and any complications — these guide care for life.',
        sw: 'Ufuatiliaji wa kliniki miezi 6 na 12 baada ya kupona kama msingi. Unaotegemea dalili baadaye. X-ray ya kifua ya kila mwaka ikiwa PTLD imegunduliwa. Spirometry mahali inapopatikana. Ukaguzi wa chanjo kila mwaka. Uchunguzi wa afya ya akili katika kila ziara. Lete historia ya TB kwa kila daktari mpya — TB ya zamani ni muhimu kwa tathmini ya maumivu ya kifua, maamuzi ya kukandamiza kinga, mpango wa upasuaji, na dawa ya safari. Vault ya TibaHub inafaa kuhifadhi rekodi za matibabu, matokeo ya makohozi, X-rays, na matatizo yoyote — hizi huongoza huduma kwa maisha.',
        sw_mtaa: 'Clinical follow-up miezi 6 na 12 baada ya cure kama baseline. Symptom-based thereafter. Annual chest X-ray ikiwa PTLD imegunduliwa. Spirometry mahali inapopatikana. Vaccination check kila mwaka. Mental health screen kila ziara. Lete TB history kwa kila daktari mpya — past TB ni muhimu kwa chest pain evaluation, immunosuppression decisions, surgery planning, na travel medicine. TibaHub vault inafaa kuhifadhi treatment records, sputum results, X-rays, na complications zozote — hizi zinaongoza care kwa maisha.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024'), src('MUHIMBILI_PROTOCOLS')],
    },
  ],

  comorbidityNotes: [
    {
      coCondition: 'hiv',
      note: {
        en: 'HIV multiplies TB risk 20-30 fold and increases TB mortality dramatically. TB-HIV co-infection requires integrated care: TB drugs + ART + co-trimoxazole + pyridoxine. The biggest interaction is rifampicin lowering dolutegravir — TLD users on rifampicin take dolutegravir twice daily (50mg BD) instead of once. Never stop ART because of TB. Watch for IRIS (paradoxical reaction) 2-6 weeks after ART start. Every TB patient in Tanzania is offered HIV testing — accept it.',
        sw: 'VVU huzidisha hatari ya TB mara 20-30 na huongeza vifo vya TB sana. Maambukizi ya pamoja ya TB-VVU yanahitaji huduma jumuishi: dawa za TB + ART + co-trimoxazole + pyridoxine. Mwingiliano mkubwa ni rifampicin inashusha dolutegravir — watumiaji wa TLD walio kwenye rifampicin huchukua dolutegravir mara mbili kwa siku (50mg BD) badala ya mara moja. Kamwe usisimamishe ART kwa sababu ya TB. Angalia IRIS (paradoxical reaction) wiki 2-6 baada ya kuanza ART. Kila mgonjwa wa TB Tanzania hupewa fursa ya kupima VVU — kubali.',
        sw_mtaa: 'VVU inazidisha TB risk mara 20-30 na inaongeza TB mortality sana. TB-HIV co-infection inahitaji integrated care: TB drugs + ART + co-trimoxazole + pyridoxine. Major interaction ni rifampicin inashusha dolutegravir — TLD users walio kwenye rifampicin wanachukua dolutegravir mara mbili kwa siku (50mg BD) badala ya mara moja. KAMWE usisimamishe ART kwa sababu ya TB. Angalia IRIS (paradoxical reaction) wiki 2-6 baada ya kuanza ART. Kila TB patient Tanzania anapewa fursa ya kupima VVU — kubali.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Diabetes triples the risk of active TB and worsens outcomes. TB also disrupts blood sugar control — many people are first diagnosed with diabetes during TB treatment. Rifampicin can lower blood levels of some oral hypoglycaemic drugs (especially sulfonylureas and DPP-4 inhibitors). Metformin is generally safe. Insulin may be needed temporarily for severe hyperglycaemia during TB illness. Monitor blood sugar frequently. Both conditions need lifelong management — TB ends, diabetes does not.',
        sw: 'Kisukari huzidisha hatari ya TB hai mara tatu na huzidisha matokeo. TB pia huvuruga udhibiti wa sukari ya damu — watu wengi hugundulika kwanza na kisukari wakati wa matibabu ya TB. Rifampicin inaweza kushusha viwango vya damu vya baadhi ya dawa za kisukari za kumeza (hasa sulfonylureas na DPP-4 inhibitors). Metformin kwa kawaida ni salama. Insulin inaweza kuhitajika kwa muda kwa sukari kubwa wakati wa ugonjwa wa TB. Pima sukari ya damu mara kwa mara. Hali zote zinahitaji usimamizi wa maisha — TB inaisha, kisukari hakiishi.',
        sw_mtaa: 'Kisukari inazidisha hatari ya active TB mara tatu na inazidisha outcomes. TB pia inavuruga sugar control — watu wengi wanagundulika kwanza na kisukari wakati wa TB treatment. Rifampicin inaweza kushusha viwango vya baadhi ya oral hypoglycaemic drugs (hasa sulfonylureas na DPP-4 inhibitors). Metformin kwa kawaida ni salama. Insulin inaweza kuhitajika kwa muda kwa severe hyperglycaemia wakati wa TB illness. Pima sugar mara kwa mara. Conditions zote zinahitaji lifelong management — TB inaisha, kisukari hakiishi.',
      },
    },
    {
      coCondition: 'alcohol',
      note: {
        en: 'Heavy alcohol use multiplies TB risk and triples the risk of drug-induced hepatitis during treatment. Cutting down (or stopping) during TB treatment is one of the most protective things you can do. Tanzania has free brief intervention counselling at many DOT centres. Liver function tests should be done at baseline and during treatment if alcohol use is significant. Severe hepatitis on TB drugs + alcohol can be fatal — yellow eyes, dark urine, severe fatigue → stop drugs and see a clinician within 24 hours.',
        sw: 'Matumizi mazito ya pombe huzidisha hatari ya TB na huzidisha mara tatu hatari ya hepatitis inayosababishwa na dawa wakati wa matibabu. Kupunguza (au kusimamisha) wakati wa matibabu ya TB ni mojawapo ya vitu vya kulinda zaidi unavyoweza kufanya. Tanzania ina ushauri wa bure wa intervention fupi katika vituo vingi vya DOT. Vipimo vya utendaji wa ini vinafaa kufanywa msingi na wakati wa matibabu ikiwa matumizi ya pombe ni makubwa. Hepatitis kali kwenye dawa za TB + pombe inaweza kuua — macho ya njano, mkojo wa giza, uchovu mkubwa → acha dawa na ona daktari ndani ya masaa 24.',
        sw_mtaa: 'Heavy alcohol use inazidisha TB risk na inazidisha mara tatu hatari ya drug-induced hepatitis wakati wa treatment. Kupunguza (au kusimamisha) wakati wa TB treatment ni jambo moja la kulinda zaidi unaloweza kufanya. Tanzania ina free brief intervention counselling katika DOT centres nyingi. LFTs zinafaa kufanywa baseline na wakati wa treatment kama alcohol use ni significant. Severe hepatitis kwenye TB drugs + pombe inaweza kuua — macho ya njano, mkojo wa giza, uchovu mkubwa → acha dawa na ona daktari ndani ya masaa 24.',
      },
    },
    {
      coCondition: 'malnutrition',
      note: {
        en: 'TB and malnutrition feed each other: malnutrition increases TB risk, TB causes more weight loss, and malnourished patients respond worse to treatment. Tanzania has a National TB Nutrition Care and Support package — eligible patients receive food supplements, nutrition counselling, and growth monitoring. Underweight at TB diagnosis (BMI <18.5 in adults, weight-for-age below 2 SD in children) qualifies. Pyridoxine, vitamin D, and multivitamin supplementation may be needed. Recovery weight gain typically takes 6-12 months after cure.',
        sw: 'TB na utapiamlo hulisha kila mmoja: utapiamlo huongeza hatari ya TB, TB husababisha kupungua uzito zaidi, na wagonjwa wenye utapiamlo hujibu vibaya zaidi kwa matibabu. Tanzania ina pakti ya kitaifa ya huduma ya lishe ya TB na msaada — wagonjwa wanaostahili hupokea virutubisho vya chakula, ushauri wa lishe, na ufuatiliaji wa ukuaji. Uzito mdogo wakati wa utambuzi wa TB (BMI <18.5 kwa watu wazima, uzito-kwa-umri chini ya SD 2 kwa watoto) hustahili. Pyridoxine, vitamin D, na virutubisho vya vitamin nyingi vinaweza kuhitajika. Uongezekaji wa uzito wa kupona kwa kawaida huchukua miezi 6-12 baada ya kupona.',
        sw_mtaa: 'TB na utapiamlo zinalisha kila mmoja: utapiamlo inaongeza TB risk, TB inasababisha kupungua uzito zaidi, na malnourished patients wanajibu vibaya zaidi kwa treatment. Tanzania ina National TB Nutrition Care and Support package — eligible patients wanapokea food supplements, nutrition counselling, na growth monitoring. Underweight wakati wa TB diagnosis (BMI <18.5 kwa watu wazima, weight-for-age chini ya 2 SD kwa watoto) anastahili. Pyridoxine, vitamin D, na multivitamin supplementation zinaweza kuhitajika. Recovery weight gain kawaida inachukua miezi 6-12 baada ya cure.',
      },
    },
    {
      coCondition: 'pregnancy',
      note: {
        en: 'RHZE (rifampicin, isoniazid, pyrazinamide, ethambutol) is safe in pregnancy. Streptomycin is the only standard drug to AVOID (causes congenital deafness). Pyridoxine (vitamin B6) is mandatory throughout pregnancy on isoniazid. Vitamin K in the last weeks reduces bleeding risk for mother and newborn. Untreated TB causes much greater harm than the medicines: miscarriage, preterm birth, low birth weight, congenital TB, maternal death. Combined ANC + TB clinic care is the standard. Breastfeeding is encouraged.',
        sw: 'RHZE (rifampicin, isoniazid, pyrazinamide, ethambutol) ni salama katika mimba. Streptomycin ni dawa pekee ya kawaida ya KUEPUKA (husababisha uziwi wa kuzaliwa). Pyridoxine (vitamin B6) ni lazima katika mimba yote kwenye isoniazid. Vitamin K katika wiki za mwisho hupunguza hatari ya damu kwa mama na mtoto mchanga. TB isiyotibiwa husababisha madhara makubwa zaidi kuliko dawa: kuharibika kwa mimba, kuzaliwa kabla ya wakati, uzito mdogo, congenital TB, kifo cha mama. Huduma ya pamoja ya ANC + kliniki ya TB ni kiwango. Kunyonyesha kunashauriwa.',
        sw_mtaa: 'RHZE (rifampicin, isoniazid, pyrazinamide, ethambutol) ni salama katika mimba. Streptomycin ni dawa pekee ya standard ya KUEPUKA (inasababisha congenital deafness). Pyridoxine (vitamin B6) ni lazima katika mimba yote kwenye isoniazid. Vitamin K katika wiki za mwisho inapunguza bleeding risk kwa mama na mtoto mchanga. Untreated TB inasababisha madhara makubwa zaidi kuliko dawa: miscarriage, preterm birth, low birth weight, congenital TB, maternal death. Combined ANC + TB clinic care ni standard. Kunyonyesha kunashauriwa.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'TB drugs need dose adjustment in chronic kidney disease. Isoniazid and rifampicin are usually dosed normally. Pyrazinamide and ethambutol need dose reduction or extended dosing intervals in eGFR <30. Aminoglycoside injectables (streptomycin, amikacin) are nephrotoxic and largely avoided in modern regimens. Dialysis affects drug levels — dosing is often after dialysis. CKD also increases TB risk through immune suppression. Annual TB screening is reasonable in advanced CKD.',
        sw: 'Dawa za TB zinahitaji marekebisho ya dose katika ugonjwa wa figo sugu. Isoniazid na rifampicin kwa kawaida hutolewa dose ya kawaida. Pyrazinamide na ethambutol zinahitaji upunguzaji wa dose au vipindi vya dose vilivyopanuliwa katika eGFR <30. Sindano za aminoglycoside (streptomycin, amikacin) ni nephrotoxic na kwa kiasi kikubwa huepukwa katika regimens za kisasa. Dialysis huathiri viwango vya dawa — dosing mara nyingi ni baada ya dialysis. CKD pia huongeza hatari ya TB kupitia kukandamiza kinga. Uchunguzi wa TB wa kila mwaka ni mzuri katika CKD iliyokomaa.',
        sw_mtaa: 'TB drugs zinahitaji dose adjustment katika chronic kidney disease. Isoniazid na rifampicin kwa kawaida zinatolewa normal dose. Pyrazinamide na ethambutol zinahitaji dose reduction au extended dosing intervals katika eGFR <30. Aminoglycoside injectables (streptomycin, amikacin) ni nephrotoxic na zinaepukwa katika modern regimens. Dialysis inaathiri drug levels — dosing mara nyingi ni baada ya dialysis. CKD pia inaongeza TB risk kupitia immune suppression. Annual TB screening ni reasonable katika advanced CKD.',
      },
    },
  ],

  sources: [
    src('NTLP_TB_2024'),
    src('WHO_TB_2024'),
    src('NTLG_STG_2023'),
    src('IMCI_2024'),
    src('NACP_ART_2024'),
    src('MOH_TZ_MATERNAL_2024'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
