/**
 * Co-trimoxazole (CPT) — Drug Knowledge
 *
 * Co-trimoxazole preventive therapy (CPT) — also called Septrin or Bactrim —
 * is a low-cost daily tablet given to people living with HIV (and HIV-exposed
 * infants) to prevent several dangerous opportunistic infections while the
 * immune system is recovering on ART.
 *
 * Composition: trimethoprim + sulfamethoxazole (a fixed-dose antibiotic).
 *
 * Sources: NACP National Guidelines for the Management of HIV and AIDS 2024,
 *          WHO Consolidated Guidelines on HIV 2024, NTLG STG 2023,
 *          IMCI 2024, BNF current.
 *
 * NOTE: This file does NOT prescribe specific doses. The engine educates on
 * what the medicine is for, what to expect, and when to seek care — dose and
 * duration decisions belong to the CTC clinician.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const COTRIMOXAZOLE: DrugKnowledge = {
  id: 'cotrimoxazole',
  aliases: DRUG_ALIASES.cotrimoxazole,
  drugClass: {
    en: 'Combination antibiotic used as preventive therapy (trimethoprim + sulfamethoxazole)',
    sw: 'Antibiotiki ya mchanganyiko inayotumika kama tiba ya kuzuia (trimethoprim + sulfamethoxazole)',
  },

  whatItDoes: {
    en: 'Co-trimoxazole is a combination antibiotic. In HIV care it is used not to treat one infection but to PREVENT several at once — this is called co-trimoxazole preventive therapy, or CPT. While the immune system is weakened, it acts as a daily protective shield: it guards against PCP (a severe pneumonia caused by Pneumocystis), toxoplasmosis (a brain infection), several bacterial infections that cause pneumonia and diarrhoea, and it also offers some protection against malaria. The two medicines inside it block steps that bacteria and certain parasites need to make their own folate, a building block they cannot survive without — human cells get folate from food, so they are not affected the same way. CPT does not treat HIV itself; it works alongside ART, covering the vulnerable period until the immune system has recovered.',
    sw: 'Co-trimoxazole ni antibiotiki ya mchanganyiko. Katika huduma ya VVU haitumiki kutibu maambukizi moja bali KUZUIA kadhaa kwa wakati mmoja — hii inaitwa tiba ya kuzuia ya co-trimoxazole, au CPT. Wakati mfumo wa kinga umedhoofika, hufanya kazi kama ngao ya kulinda ya kila siku: hulinda dhidi ya PCP (nimonia kali inayosababishwa na Pneumocystis), toxoplasmosis (maambukizi ya ubongo), maambukizi kadhaa ya bakteria yanayosababisha nimonia na kuhara, na pia hutoa ulinzi fulani dhidi ya malaria. Dawa mbili zilizomo huzuia hatua ambazo bakteria na vimelea fulani vinahitaji kutengeneza folate yao wenyewe, kitu cha msingi ambacho hawawezi kuishi bila — seli za binadamu hupata folate kutoka kwa chakula, hivyo haziathiriwi kwa namna ile ile. CPT haitibu VVU yenyewe; hufanya kazi pamoja na ART, ikifunika kipindi cha hatari hadi mfumo wa kinga utakapopona.',
    sw_mtaa: 'Co-trimoxazole ni antibiotiki ya mchanganyiko. Katika huduma ya VVU haitumiki kutibu maambukizi moja bali KUZUIA kadhaa kwa wakati mmoja — hii inaitwa co-trimoxazole preventive therapy, au CPT. Wakati kinga imedhoofika, inafanya kazi kama ngao ya kulinda ya kila siku: inalinda dhidi ya PCP (nimonia kali inayosababishwa na Pneumocystis), toxoplasmosis (maambukizi ya ubongo), maambukizi kadhaa ya bakteria yanayosababisha nimonia na kuhara, na pia inatoa ulinzi fulani dhidi ya malaria. Dawa mbili zilizomo zinazuia hatua ambazo bakteria na vimelea fulani vinahitaji kutengeneza folate yao wenyewe, kitu cha msingi ambacho hawawezi kuishi bila — seli za binadamu zinapata folate kutoka kwa chakula, hivyo haziathiriwi kwa namna ile ile. CPT haitibu VVU yenyewe; inafanya kazi pamoja na ART, ikifunika kipindi cha hatari hadi kinga itakapopona.',
  },

  commonUses: [
    {
      en: 'Preventing opportunistic infections in people living with HIV — especially when the CD4 count is low',
      sw: 'Kuzuia maambukizi nyemelezi kwa watu wanaoishi na VVU — hasa wakati CD4 count iko chini',
      sw_mtaa: 'Kuzuia maambukizi nyemelezi kwa watu wanaoishi na VVU — hasa wakati CD4 count iko chini',
    },
    {
      en: 'Protecting people with HIV who also have active TB, as part of the standard package of care',
      sw: 'Kulinda watu wenye VVU ambao pia wana TB hai, kama sehemu ya pakti ya kawaida ya huduma',
      sw_mtaa: 'Kulinda watu wenye VVU ambao pia wana TB hai, kama sehemu ya package ya kawaida ya huduma',
    },
    {
      en: 'Protecting HIV-exposed infants from birth until HIV infection is confidently ruled out',
      sw: 'Kulinda watoto wachanga walioathiriwa na VVU kutoka kuzaliwa hadi maambukizi ya VVU yatakapoondolewa kwa uhakika',
      sw_mtaa: 'Kulinda watoto wachanga walioathiriwa na VVU kutoka kuzaliwa hadi maambukizi ya VVU yatakapoondolewa kwa uhakika',
    },
    {
      en: 'Reducing bacterial infections and contributing some protection against malaria during the vulnerable period',
      sw: 'Kupunguza maambukizi ya bakteria na kuchangia ulinzi fulani dhidi ya malaria katika kipindi cha hatari',
      sw_mtaa: 'Kupunguza maambukizi ya bakteria na kuchangia ulinzi fulani dhidi ya malaria katika kipindi cha hatari',
    },
  ],

  howItIsTaken: {
    en: 'Co-trimoxazole for prevention is taken as a tablet, usually once a day, every day, for as long as the clinician advises. Take it with a glass of water, and drinking enough fluids through the day is sensible. It is collected free at the CTC, often alongside the ART refill. As the CD4 count recovers well on ART and stays high, the clinician may eventually decide CPT can be stopped — but this decision belongs to the clinician, never to the patient alone, because stopping too early removes the protective shield. For HIV-exposed infants, it is given as a syrup or dispersible tablet dosed by weight, and continued until HIV infection has been confidently excluded.',
    sw: 'Co-trimoxazole kwa kuzuia huchukuliwa kama kidonge, kawaida mara moja kwa siku, kila siku, kwa muda wote daktari anaposhauri. Chukua na glasi ya maji, na kunywa maji ya kutosha mchana ni jambo la busara. Huchukuliwa bure katika CTC, mara nyingi pamoja na refill ya ART. Kadri CD4 count inavyopona vizuri kwenye ART na kubaki juu, daktari anaweza hatimaye kuamua CPT inaweza kusimamishwa — lakini uamuzi huu ni wa daktari, kamwe sio wa mgonjwa peke yake, kwa sababu kusimama mapema sana huondoa ngao ya kulinda. Kwa watoto wachanga walioathiriwa na VVU, hutolewa kama sirapu au kidonge kinachoyeyuka dose kwa uzito, na huendelea hadi maambukizi ya VVU yatakapoondolewa kwa uhakika.',
    sw_mtaa: 'Co-trimoxazole kwa kuzuia inachukuliwa kama kidonge, kawaida mara moja kwa siku, kila siku, kwa muda wote daktari anaposhauri. Chukua na glasi ya maji, na kunywa maji ya kutosha mchana ni jambo la busara. Inachukuliwa bure katika CTC, mara nyingi pamoja na refill ya ART. Kadri CD4 count inavyopona vizuri kwenye ART na kubaki juu, daktari anaweza hatimaye kuamua CPT inaweza kusimamishwa — lakini uamuzi huu ni wa daktari, kamwe sio wa mgonjwa peke yake, kwa sababu kusimama mapema sana kunaondoa ngao ya kulinda. Kwa watoto wachanga walioathiriwa na VVU, inatolewa kama syrup au kidonge kinachoyeyuka dose kwa uzito, na inaendelea hadi maambukizi ya VVU yatakapoondolewa kwa uhakika.',
  },

  commonSideEffects: [
    {
      en: 'Mild nausea or stomach upset — often eases with time; taking it with food can help',
      sw: 'Kichefuchefu kidogo au tumbo kuvurugika — mara nyingi hupungua na wakati; kuichukua na chakula kunaweza kusaidia',
      sw_mtaa: 'Kichefuchefu kidogo au tumbo kuvurugika — mara nyingi inapungua na wakati; kuichukua na chakula kunaweza kusaidia',
    },
    {
      en: 'Mild skin rash — common and often not serious, but any rash should be mentioned to the clinician to be sure',
      sw: 'Vipele vidogo vya ngozi — vya kawaida na mara nyingi sio vibaya, lakini vipele vyovyote vinapaswa kutajwa kwa daktari kuhakikisha',
      sw_mtaa: 'Vipele vidogo vya ngozi — vya kawaida na mara nyingi sio vibaya, lakini vipele vyovyote vinapaswa kutajwa kwa daktari kuhakikisha',
    },
    {
      en: 'Loss of appetite or a metallic taste — usually mild and temporary',
      sw: 'Kupoteza hamu ya kula au ladha ya metali — kawaida ndogo na ya muda',
      sw_mtaa: 'Kupoteza hamu ya kula au ladha ya metali — kawaida ndogo na ya muda',
    },
    {
      en: 'Mild headache — common in the early period',
      sw: 'Kichwa kidogo — cha kawaida katika kipindi cha mapema',
      sw_mtaa: 'Kichwa kidogo — cha kawaida katika kipindi cha mapema',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'A severe or spreading rash, blistering or peeling skin, mouth or eye sores, with fever — possible Stevens-Johnson syndrome, a rare but life-threatening reaction. Stop the medicine and go to hospital immediately.',
        sw: 'Vipele vikali au vinavyoenea, ngozi inayotoka malenge au kubanduka, vidonda vya mdomo au macho, na homa — uwezekano wa Stevens-Johnson syndrome, athari nadra lakini hatari ya maisha. Acha dawa na nenda hospitali mara moja.',
        sw_mtaa: 'Vipele vikali au vinavyoenea, ngozi inayotoka malenge au kubanduka, vidonda vya mdomo au macho, na homa — uwezekano wa Stevens-Johnson syndrome, athari nadra lakini hatari ya maisha. Acha dawa na nenda hospitali mara moja.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellow eyes, dark urine, or severe abdominal pain — possible liver problem. Seek care within 24 hours.',
        sw: 'Macho ya njano, mkojo wa giza, au maumivu makali ya tumbo — uwezekano wa tatizo la ini. Tafuta huduma ndani ya masaa 24.',
        sw_mtaa: 'Macho ya njano, mkojo wa giza, au maumivu makali ya tumbo — uwezekano wa tatizo la ini. Tafuta huduma ndani ya masaa 24.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Unusual bruising, bleeding, a sore throat with fever, or extreme tiredness — possible effect on the blood cells. Tell the clinician promptly so a blood count can be checked.',
        sw: 'Michubuko isiyo ya kawaida, kutokwa na damu, koo kuuma na homa, au uchovu wa kupita kiasi — uwezekano wa athari kwa seli za damu. Mwambie daktari haraka ili hesabu ya damu ikaguliwe.',
        sw_mtaa: 'Michubuko isiyo ya kawaida, kutokwa na damu, koo kuuma na homa, au uchovu wa kupita kiasi — uwezekano wa athari kwa seli za damu. Mwambie daktari haraka ili hesabu ya damu ikaguliwe.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Swelling of the face, lips, or tongue, or difficulty breathing soon after a dose — possible allergic reaction. EMERGENCY.',
        sw: 'Uvimbe wa uso, midomo, au ulimi, au ugumu wa kupumua muda mfupi baada ya dose — uwezekano wa athari ya mzio. DHARURA.',
        sw_mtaa: 'Uvimbe wa uso, midomo, au ulimi, au ugumu wa kupumua muda mfupi baada ya dose — uwezekano wa athari ya mzio. DHARURA.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'sulfa_allergy',
      withDisplay: {
        en: 'A known sulfa (sulfonamide) allergy',
        sw: 'Mzio unaojulikana wa sulfa (sulfonamide)',
      },
      severity: 'avoid',
      explanation: {
        en: 'Co-trimoxazole contains a sulfonamide. Anyone who has had a serious reaction to a "sulfa" medicine before — a severe rash, swelling, or breathing difficulty — should not take co-trimoxazole, and the clinician will choose an alternative preventive medicine. Always tell the CTC clinician about any past drug allergy before starting.',
        sw: 'Co-trimoxazole ina sulfonamide. Yeyote aliyewahi kuwa na athari mbaya kwa dawa ya "sulfa" hapo awali — vipele vikali, uvimbe, au ugumu wa kupumua — hapaswi kuchukua co-trimoxazole, na daktari atachagua dawa mbadala ya kuzuia. Daima mwambie daktari wa CTC kuhusu mzio wowote wa dawa wa zamani kabla ya kuanza.',
        sw_mtaa: 'Co-trimoxazole ina sulfonamide. Yeyote aliyewahi kuwa na athari mbaya kwa dawa ya "sulfa" hapo awali — vipele vikali, uvimbe, au ugumu wa kupumua — hapaswi kuchukua co-trimoxazole, na daktari atachagua dawa mbadala ya kuzuia. Daima mwambie daktari wa CTC kuhusu mzio wowote wa dawa wa zamani kabla ya kuanza.',
      },
      sources: [src('NACP_ART_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'warfarin',
      withDisplay: {
        en: 'Warfarin (blood thinner)',
        sw: 'Warfarin (dawa ya kupunguza damu)',
      },
      severity: 'caution',
      explanation: {
        en: 'Co-trimoxazole can strengthen the effect of warfarin, raising the risk of bleeding. Anyone taking warfarin who is started on co-trimoxazole needs closer INR monitoring and possibly a warfarin dose adjustment. Tell both the CTC and the clinic that manages the warfarin about each other.',
        sw: 'Co-trimoxazole inaweza kuimarisha athari ya warfarin, kuongeza hatari ya kutokwa na damu. Yeyote anayechukua warfarin anayeanzishwa co-trimoxazole anahitaji ufuatiliaji wa karibu zaidi wa INR na huenda marekebisho ya dose ya warfarin. Mwambie CTC na kliniki inayosimamia warfarin kuhusu kila mmoja.',
        sw_mtaa: 'Co-trimoxazole inaweza kuimarisha athari ya warfarin, kuongeza hatari ya kutokwa na damu. Yeyote anayechukua warfarin anayeanzishwa co-trimoxazole anahitaji ufuatiliaji wa karibu zaidi wa INR na huenda marekebisho ya dose ya warfarin. Mwambie CTC na kliniki inayosimamia warfarin kuhusu kila mmoja.',
      },
      sources: [src('NACP_ART_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'sulfonylureas',
      withDisplay: {
        en: 'Sulfonylureas (glibenclamide, gliclazide) for diabetes',
        sw: 'Sulfonylureas (glibenclamide, gliclazide) kwa kisukari',
      },
      severity: 'caution',
      explanation: {
        en: 'Co-trimoxazole can increase the blood-sugar-lowering effect of sulfonylurea diabetes medicines, which can lead to low blood sugar (hypoglycaemia). Someone on both should watch for signs of low blood sugar (shakiness, sweating, confusion, hunger) and the diabetes clinician may monitor more closely. Tell every clinician about both the HIV care and the diabetes treatment.',
        sw: 'Co-trimoxazole inaweza kuongeza athari ya kushusha sukari ya damu ya dawa za kisukari za sulfonylurea, ambayo inaweza kusababisha sukari ya chini ya damu (hypoglycaemia). Mtu aliye na zote anapaswa kuangalia ishara za sukari ya chini ya damu (kutetemeka, kutokwa na jasho, kuchanganyikiwa, njaa) na daktari wa kisukari anaweza kufuatilia kwa karibu zaidi. Mwambie kila daktari kuhusu huduma ya VVU na matibabu ya kisukari.',
        sw_mtaa: 'Co-trimoxazole inaweza kuongeza athari ya kushusha sugar ya dawa za kisukari za sulfonylurea, inaweza kusababisha sukari ya chini ya damu (hypoglycaemia). Mtu aliye na zote anapaswa kuangalia ishara za sukari ya chini (kutetemeka, jasho, kuchanganyikiwa, njaa) na daktari wa kisukari anaweza kufuatilia kwa karibu zaidi. Mwambie kila daktari kuhusu huduma ya VVU na matibabu ya kisukari.',
      },
      sources: [src('NACP_ART_2024'), src('BNF_CURRENT')],
    },
    {
      with: 'pregnancy',
      withDisplay: {
        en: 'Pregnancy',
        sw: 'Mimba',
      },
      severity: 'note',
      explanation: {
        en: 'Co-trimoxazole may still be used in pregnancy when the protective benefit is needed, but it is a clinical decision — folic acid supplementation is often given alongside it, and the clinician weighs the timing in pregnancy. A pregnant woman on co-trimoxazole, or planning pregnancy, should discuss it with the CTC and antenatal team so the safest plan is made together.',
        sw: 'Co-trimoxazole inaweza bado kutumika katika mimba wakati faida ya kulinda inahitajika, lakini ni uamuzi wa kimatibabu — virutubisho vya folic acid mara nyingi hutolewa pamoja nayo, na daktari hupima wakati katika mimba. Mwanamke mjamzito aliye kwenye co-trimoxazole, au anayepanga mimba, anapaswa kuijadili na CTC na timu ya ujauzito ili mpango salama zaidi ufanywe pamoja.',
        sw_mtaa: 'Co-trimoxazole inaweza bado kutumika katika mimba wakati faida ya kulinda inahitajika, lakini ni uamuzi wa kimatibabu — virutubisho vya folic acid mara nyingi vinatolewa pamoja nayo, na daktari anapima wakati katika mimba. Mwanamke mjamzito aliye kwenye co-trimoxazole, au anayepanga mimba, anapaswa kuijadili na CTC na timu ya ujauzito ili mpango salama zaidi ufanywe pamoja.',
      },
      sources: [src('NACP_ART_2024'), src('WHO_HIV_2024')],
    },
  ],

  lifestyleNotes: [
    {
      topic: {
        en: 'Why it is given even when you feel well',
        sw: 'Kwa nini hutolewa hata unapojisikia vizuri',
      },
      note: {
        en: 'Co-trimoxazole is preventive — it is given precisely so that infections do NOT happen, not to treat something already there. Feeling well is the point. It is taken every day during the vulnerable period, alongside ART, and only stopped when the clinician judges the immune system has recovered enough.',
        sw: 'Co-trimoxazole ni ya kuzuia — hutolewa hasa ili maambukizi YASITOKEE, sio kutibu kitu kilichopo tayari. Kujisikia vizuri ndio lengo. Huchukuliwa kila siku katika kipindi cha hatari, pamoja na ART, na husimamishwa tu wakati daktari anapohukumu mfumo wa kinga umepona vya kutosha.',
        sw_mtaa: 'Co-trimoxazole ni ya kuzuia — inatolewa hasa ili maambukizi YASITOKEE, sio kutibu kitu kilichopo tayari. Kujisikia vizuri ndio lengo. Inachukuliwa kila siku katika kipindi cha hatari, pamoja na ART, na inasimamishwa tu wakati daktari anapohukumu kinga imepona vya kutosha.',
      },
    },
    {
      topic: {
        en: 'Fluids and sun',
        sw: 'Maji na jua',
      },
      note: {
        en: 'Drink enough water through the day while taking co-trimoxazole. The medicine can also make the skin a little more sensitive to strong sunlight in some people, so using shade and not over-exposing the skin is sensible.',
        sw: 'Kunywa maji ya kutosha mchana wakati wa kuchukua co-trimoxazole. Dawa pia inaweza kufanya ngozi kuwa nyeti kidogo zaidi kwa mwanga mkali wa jua kwa baadhi ya watu, hivyo kutumia kivuli na kutoiweka ngozi juani kupita kiasi ni jambo la busara.',
        sw_mtaa: 'Kunywa maji ya kutosha mchana wakati wa kuchukua co-trimoxazole. Dawa pia inaweza kufanya ngozi kuwa nyeti kidogo zaidi kwa mwanga mkali wa jua kwa baadhi ya watu, hivyo kutumia kivuli na kutoiweka ngozi juani kupita kiasi ni jambo la busara.',
      },
    },
    {
      topic: {
        en: 'Telling clinicians about allergies',
        sw: 'Kuwaambia madaktari kuhusu mzio',
      },
      note: {
        en: 'Before starting co-trimoxazole, tell the clinician about any past reaction to a "sulfa" medicine. If a rash, swelling, or breathing difficulty develops after a dose, stop and seek care — and make sure this allergy is recorded so it is known for the future.',
        sw: 'Kabla ya kuanza co-trimoxazole, mwambie daktari kuhusu athari yoyote ya zamani kwa dawa ya "sulfa." Ikiwa vipele, uvimbe, au ugumu wa kupumua unatokea baada ya dose, acha na utafute huduma — na hakikisha mzio huu umerekodiwa ili ujulikane kwa siku zijazo.',
        sw_mtaa: 'Kabla ya kuanza co-trimoxazole, mwambie daktari kuhusu athari yoyote ya zamani kwa dawa ya "sulfa." Ikiwa vipele, uvimbe, au ugumu wa kupumua unatokea baada ya dose, acha na utafute huduma — na hakikisha mzio huu umerekodiwa ili ujulikane kwa siku zijazo.',
      },
    },
    {
      topic: {
        en: 'It is not a replacement for ART',
        sw: 'Sio mbadala wa ART',
      },
      note: {
        en: 'Co-trimoxazole protects against opportunistic infections, but it does nothing against HIV itself. It works alongside ART, not instead of it. The lasting protection comes from ART rebuilding the immune system — co-trimoxazole simply covers the gap until that recovery is solid.',
        sw: 'Co-trimoxazole hulinda dhidi ya maambukizi nyemelezi, lakini haifanyi chochote dhidi ya VVU yenyewe. Hufanya kazi pamoja na ART, sio badala yake. Ulinzi wa kudumu hutoka kwa ART kujenga upya mfumo wa kinga — co-trimoxazole hufunika tu pengo hadi kupona huko kuwe imara.',
        sw_mtaa: 'Co-trimoxazole inalinda dhidi ya maambukizi nyemelezi, lakini haifanyi chochote dhidi ya VVU yenyewe. Inafanya kazi pamoja na ART, sio badala yake. Ulinzi wa kudumu unatoka kwa ART kujenga upya kinga — co-trimoxazole inafunika tu pengo hadi kupona huko kuwe imara.',
      },
    },
  ],

  sources: [
    src('NACP_ART_2024'),
    src('WHO_HIV_2024'),
    src('NTLG_STG_2023'),
    src('IMCI_2024'),
    src('BNF_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
