/**
 * RHZE — Rifampicin + Isoniazid + Pyrazinamide + Ethambutol — Drug Knowledge
 *
 * First-line treatment for drug-susceptible tuberculosis in Tanzania.
 * Fixed-dose combination tablets supplied free by NTLP.
 *
 * Standard regimen:
 *   • Intensive phase (months 1-2): RHZE — Rifampicin + Isoniazid + Pyrazinamide + Ethambutol
 *   • Continuation phase (months 3-6): RH — Rifampicin + Isoniazid
 *
 * Standard formulations in Tanzania:
 *   - Adult fixed-dose: 4-FDC (RHZE 150/75/400/275 mg) and 2-FDC (RH 150/75 mg)
 *     dosed by weight band (30-39 kg, 40-54 kg, 55-70 kg, >70 kg)
 *   - Pediatric dispersible: 3-FDC (RHZ 75/50/150 mg) intensive,
 *     2-FDC (RH 75/50 mg) continuation — dosed by weight band
 *
 * Sources: NTLP Tanzania Manual 2024, WHO Consolidated TB Guidelines 2024,
 *          NTLG STG 2023, BNF current, EMC current.
 *
 * NOTE: This file does NOT prescribe specific doses. Engine educates on
 * what to expect, side effects, interactions, and continuity — NOT dosing.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const RHZE: DrugKnowledge = {
  id: 'rhze',
  aliases: DRUG_ALIASES.rhze,
  drugClass: {
    en: 'First-line antitubercular combination (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)',
    sw: 'Mchanganyiko wa dawa za kifua kikuu wa kwanza (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)',
  },

  whatItDoes: {
    en: 'RHZE is a combination of four antibiotics that together kill the TB bacterium. Each drug attacks the bacterium differently: Rifampicin blocks how the bacterium reads its DNA into protein; Isoniazid stops it building its protective outer cell wall; Pyrazinamide attacks dormant bacteria hiding inside cells in acidic conditions; Ethambutol prevents the bacterium from completing its cell wall and adds protection against the development of resistance. The four are taken together for the first 2 months (the intensive phase) because TB bacteria are wily — they evolve resistance quickly when faced with only one drug. After 2 months, when the bacterial population has crashed, the combination drops to just two drugs (Rifampicin + Isoniazid) for the remaining 4 months — enough to mop up the survivors.',
    sw: 'RHZE ni mchanganyiko wa dawa nne za antibiotiki ambazo kwa pamoja huua bakteria wa TB. Kila dawa hushambulia bakteria tofauti: Rifampicin huzuia jinsi bakteria husoma DNA yake kuwa protini; Isoniazid huzuia kujenga ukuta wake wa nje wa kinga; Pyrazinamide hushambulia bakteria walalao wanaojificha ndani ya seli katika hali ya tindikali; Ethambutol huzuia bakteria kumaliza ukuta wake wa seli na huongeza ulinzi dhidi ya kuendelea kwa upinzani. Hizi nne huchukuliwa pamoja kwa miezi 2 ya kwanza (hatua kali) kwa sababu bakteria wa TB ni werevu — huendeleza upinzani haraka wakati wanakabiliwa na dawa moja tu. Baada ya miezi 2, wakati idadi ya bakteria imeporomoka, mchanganyiko hupungua hadi dawa mbili tu (Rifampicin + Isoniazid) kwa miezi 4 iliyobaki — ya kutosha kufuta walionusurika.',
    sw_mtaa: 'RHZE ni mchanganyiko wa dawa nne za antibiotics ambazo kwa pamoja zinaua bakteria wa TB. Kila dawa inashambulia bakteria tofauti: Rifampicin inazuia jinsi bakteria inasoma DNA yake kuwa protini; Isoniazid inazuia kujenga ukuta wake wa nje wa kinga; Pyrazinamide inashambulia bakteria walalao wanaojificha ndani ya seli katika hali ya acidic; Ethambutol inazuia bakteria kumaliza cell wall yake na inaongeza ulinzi dhidi ya kuendelea kwa resistance. Hizi nne zinachukuliwa pamoja miezi 2 ya kwanza (intensive phase) kwa sababu TB bacteria ni werevu — wanaendeleza resistance haraka wakati wanakabiliwa na dawa moja tu. Baada ya miezi 2, wakati bacterial population imeporomoka, combination inapungua hadi dawa mbili tu (Rifampicin + Isoniazid) kwa miezi 4 iliyobaki — ya kutosha kufuta survivors.',
  },

  commonUses: [
    {
      en: 'Treatment of newly diagnosed drug-susceptible pulmonary TB (the most common use)',
      sw: 'Matibabu ya TB ya mapafu mpya iliyogundulika inayoshambulika na dawa (matumizi ya kawaida zaidi)',
      sw_mtaa: 'Matibabu ya newly diagnosed drug-susceptible pulmonary TB (matumizi ya kawaida zaidi)',
    },
    {
      en: 'Treatment of extrapulmonary TB — lymph node, pleural, abdominal (6 months); bone or joint (9-12 months); meningeal (12 months plus steroids)',
      sw: 'Matibabu ya TB ya nje ya mapafu — tezi za limfu, pleura, tumbo (miezi 6); mfupa au kiungo (miezi 9-12); ubongo (miezi 12 pamoja na steroids)',
      sw_mtaa: 'Matibabu ya extrapulmonary TB — lymph node, pleural, abdominal (miezi 6); bone au joint (miezi 9-12); meningeal (miezi 12 pamoja na steroids)',
    },
    {
      en: 'Treatment of pediatric TB using child-friendly weight-banded dispersible fixed-dose combinations',
      sw: 'Matibabu ya TB ya watoto kwa kutumia mchanganyiko wa fixed-dose unaoyeyuka unaofaa kwa watoto kwa weight band',
      sw_mtaa: 'Matibabu ya pediatric TB kwa weight-banded dispersible FDC zinazofaa watoto',
    },
    {
      en: 'Treatment of TB in HIV co-infection (alongside ART and co-trimoxazole preventive therapy)',
      sw: 'Matibabu ya TB katika maambukizi ya pamoja na VVU (pamoja na ART na co-trimoxazole ya kuzuia)',
      sw_mtaa: 'Matibabu ya TB katika HIV co-infection (pamoja na ART na co-trimoxazole preventive therapy)',
    },
    {
      en: 'Treatment of TB in pregnancy — all four drugs are considered safe; streptomycin (NOT in RHZE) is avoided',
      sw: 'Matibabu ya TB wakati wa mimba — dawa zote nne zinachukuliwa kuwa salama; streptomycin (HAIPO katika RHZE) huepukwa',
      sw_mtaa: 'Matibabu ya TB wakati wa mimba — dawa zote nne ni salama; streptomycin (HAIPO katika RHZE) inaepukwa',
    },
  ],

  howItIsTaken: {
    en: 'RHZE is taken once a day, every day, ideally on an empty stomach — that means 1 hour before breakfast or 2 hours after the last meal. Take it with a full glass of water. If it causes serious nausea, it may be taken with a small light snack, but absorption is slightly reduced. The dose is calculated by your weight at the start of treatment — your DOT centre gives you fixed-dose combination tablets in a weight-banded blister pack so there is no counting or mixing. After 2 months, the four drugs are replaced by a two-drug tablet (RH — Rifampicin + Isoniazid) for the remaining 4 months. Take pyridoxine (vitamin B6) with each dose — especially if pregnant, breastfeeding, HIV-positive, diabetic, alcohol-using, malnourished, or elderly. Set a daily phone alarm. Treatment is given under DOT (Directly Observed Therapy) — you visit your DOT centre to collect (or take in front of) your dose. Do not skip, do not stop early, do not share. The full 6 months is the entire investment.',
    sw: 'RHZE huchukuliwa mara moja kwa siku, kila siku, ikiwezekana tumbo tupu — hiyo ni saa 1 kabla ya kifungua kinywa au saa 2 baada ya chakula cha mwisho. Tumia na glasi kamili ya maji. Ikiwa inasababisha kichefuchefu kikubwa, inaweza kuchukuliwa na chakula kidogo cha mwepesi, lakini kunyonyeshwa hupungua kidogo. Dose huhesabiwa kwa uzito wako mwanzoni mwa matibabu — kituo chako cha DOT hukupa vidonge vya mchanganyiko wa fixed-dose katika blister pack iliyopangwa kwa uzito hivyo hakuna kuhesabu au kuchanganya. Baada ya miezi 2, dawa nne hubadilishwa na kidonge cha dawa mbili (RH — Rifampicin + Isoniazid) kwa miezi 4 iliyobaki. Tumia pyridoxine (vitamin B6) na kila dose — hasa ikiwa una mimba, kunyonyesha, VVU, kisukari, unatumia pombe, utapiamlo, au mzee. Weka tahadhari ya simu ya kila siku. Matibabu hutolewa chini ya DOT (Tiba ya Kuonewa Moja kwa Moja) — unatembelea kituo chako cha DOT kuchukua (au kutumia mbele ya) dose yako. Usiruke, usisimame mapema, usishiriki. Miezi 6 kamili ni uwekezaji wote.',
    sw_mtaa: 'RHZE inachukuliwa mara moja kwa siku, kila siku, ikiwezekana tumbo tupu — hiyo ni saa 1 kabla ya breakfast au saa 2 baada ya chakula cha mwisho. Tumia na glasi kamili ya maji. Ikiwa inasababisha kichefuchefu kikubwa, inaweza kuchukuliwa na chakula kidogo cha light, lakini absorption inapungua kidogo. Dose inahesabiwa kwa uzito wako mwanzoni mwa treatment — DOT centre yako inakupa fixed-dose combination tablets katika weight-banded blister pack hivyo hakuna kuhesabu au kuchanganya. Baada ya miezi 2, dawa nne zinabadilishwa na kidonge cha dawa mbili (RH — Rifampicin + Isoniazid) kwa miezi 4 iliyobaki. Tumia pyridoxine (vitamin B6) na kila dose — hasa kama una mimba, kunyonyesha, VVU, kisukari, unatumia pombe, utapiamlo, au mzee. Weka daily phone alarm. Treatment inatolewa chini ya DOT (Directly Observed Therapy) — unatembelea DOT centre yako kuchukua (au kutumia mbele ya) dose yako. Usiruke, usisimame mapema, usishiriki. Miezi 6 kamili ndio uwekezaji wote.',
  },

  commonSideEffects: [
    {
      en: 'Orange-red discolouration of urine, tears, sweat, and other body fluids (from rifampicin) — completely harmless, expected, and a sign the drug is being absorbed. Stains soft contact lenses permanently — use glasses or daily disposables.',
      sw: 'Rangi ya machungwa-nyekundu ya mkojo, machozi, jasho, na maji mengine ya mwili (kutoka kwa rifampicin) — bila madhara kabisa, inayotarajiwa, na ishara dawa inafyonzwa. Hupaka rangi lensi za mguso laini kwa kudumu — tumia miwani au lensi za kutupwa za kila siku.',
      sw_mtaa: 'Rangi ya machungwa-nyekundu ya mkojo, machozi, jasho, na maji mengine ya mwili (kutoka kwa rifampicin) — bila madhara kabisa, inayotarajiwa, na ishara dawa inafyonzwa. Inapaka rangi soft contact lenses kwa kudumu — tumia miwani au daily disposables.',
    },
    {
      en: 'Mild nausea, loss of appetite, or stomach upset — especially in the first 2-4 weeks. Often improves with time. If severe, can be taken with a light snack.',
      sw: 'Kichefuchefu kidogo, kupoteza hamu ya kula, au tumbo kuvurugika — hasa katika wiki 2-4 za kwanza. Mara nyingi huboresha na wakati. Ikiwa kikubwa, inaweza kuchukuliwa na chakula kidogo.',
      sw_mtaa: 'Kichefuchefu kidogo, kupoteza hamu ya kula, au tumbo kuvurugika — hasa wiki 2-4 za kwanza. Mara nyingi inaboresha na wakati. Kama kubwa, inaweza kuchukuliwa na chakula kidogo.',
    },
    {
      en: 'Mild fatigue, especially in the first weeks — body is healing and inflammation is settling',
      sw: 'Uchovu kidogo, hasa katika wiki za kwanza — mwili unapona na uvimbe unatulia',
      sw_mtaa: 'Uchovu kidogo, hasa wiki za kwanza — mwili unapona na uvimbe unatulia',
    },
    {
      en: 'Mild joint aches (from pyrazinamide raising uric acid) — usually manageable; if severe see clinician',
      sw: 'Maumivu kidogo ya viungo (kutoka kwa pyrazinamide inayoinua uric acid) — kawaida yanaweza kudhibitiwa; ikiwa makali ona daktari',
      sw_mtaa: 'Maumivu kidogo ya viungo (kutoka kwa pyrazinamide inayoinua uric acid) — kawaida yanaweza kudhibitiwa; kama makali ona daktari',
    },
    {
      en: 'Mild skin flushing or itching — usually transient, often without rash',
      sw: 'Wekundu wa ngozi au kuwasha kidogo — kawaida kwa muda mfupi, mara nyingi bila vipele',
      sw_mtaa: 'Skin flushing au itching kidogo — kawaida kwa muda mfupi, mara nyingi bila rash',
    },
    {
      en: 'Headache or dizziness — common in early weeks',
      sw: 'Kichwa au kizunguzungu — kawaida katika wiki za mapema',
      sw_mtaa: 'Kichwa au kizunguzungu — kawaida wiki za mapema',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Yellow eyes, yellow skin, dark urine (more than just the orange tint), severe nausea or vomiting, right-upper abdominal pain — possible drug-induced hepatitis. STOP THE DRUGS and see the DOT clinician within 24 hours. Risk is higher with alcohol use, HIV, pre-existing liver disease, age >60, malnutrition.',
        sw: 'Macho ya njano, ngozi ya njano, mkojo wa giza (zaidi ya rangi ya machungwa tu), kichefuchefu kikali au kutapika, maumivu ya tumbo upande wa juu wa kulia — uwezekano wa hepatitis inayosababishwa na dawa. ACHA DAWA na ona daktari wa DOT ndani ya masaa 24. Hatari ni kubwa zaidi kwa matumizi ya pombe, VVU, ugonjwa wa ini uliokuwepo, umri zaidi ya miaka 60, utapiamlo.',
        sw_mtaa: 'Macho ya njano, ngozi ya njano, mkojo wa giza (zaidi ya orange tint tu), kichefuchefu kikali au kutapika, maumivu ya tumbo upande wa juu wa kulia — uwezekano wa drug-induced hepatitis. ACHA DAWA na ona DOT clinician ndani ya masaa 24. Risk ni kubwa zaidi kwa alcohol use, VVU, pre-existing liver disease, umri zaidi ya 60, utapiamlo.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'New numbness, tingling, or burning in the feet and hands — peripheral neuropathy from isoniazid. Add pyridoxine (vitamin B6) and see the DOT clinician. Most resolves; severe cases may need isoniazid dose adjustment.',
        sw: 'Ganzi mpya, kuchomoa, au kuwaka katika miguu na mikono — peripheral neuropathy kutoka kwa isoniazid. Ongeza pyridoxine (vitamin B6) na ona daktari wa DOT. Nyingi hupona; kesi kubwa zinaweza kuhitaji marekebisho ya dose ya isoniazid.',
        sw_mtaa: 'Ganzi mpya, kuchomoa, au kuwaka katika miguu na mikono — peripheral neuropathy kutoka kwa isoniazid. Ongeza pyridoxine (vitamin B6) na ona DOT clinician. Nyingi zinapona; severe cases zinaweza kuhitaji isoniazid dose adjustment.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Vision changes — blurriness, difficulty seeing colours (especially red-green), loss of central vision — ETHAMBUTOL optic neuropathy. STOP ETHAMBUTOL and seek urgent ophthalmology review. Reversible if caught early; can be permanent if continued.',
        sw: 'Mabadiliko ya kuona — ukungu, ugumu wa kuona rangi (hasa nyekundu-kijani), kupoteza maono ya kati — ETHAMBUTOL optic neuropathy. ACHA ETHAMBUTOL na utafute ukaguzi wa haraka wa daktari wa macho. Hurudi ikiwa imegunduliwa mapema; inaweza kudumu ikiwa imeendelea.',
        sw_mtaa: 'Mabadiliko ya kuona — blurriness, ugumu wa kuona rangi (hasa red-green), kupoteza central vision — ETHAMBUTOL optic neuropathy. ACHA ETHAMBUTOL na utafute urgent ophthalmology review. Inarudi ikiwa imegunduliwa mapema; inaweza kudumu ikiwa imeendelea.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe rash with blistering or peeling skin, mouth ulcers, fever — possible Stevens-Johnson syndrome or toxic epidermal necrolysis. EMERGENCY. Stop all drugs, go to hospital immediately.',
        sw: 'Vipele vikali na malenge au ngozi kubanduka, vidonda mdomoni, homa — uwezekano wa Stevens-Johnson syndrome au toxic epidermal necrolysis. DHARURA. Acha dawa zote, nenda hospitali mara moja.',
        sw_mtaa: 'Severe rash na malenge au ngozi inabanduka, vidonda mdomoni, homa — uwezekano wa Stevens-Johnson syndrome au toxic epidermal necrolysis. DHARURA. Acha dawa zote, nenda hospitali mara moja.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe joint pain or new gout attack — pyrazinamide raises uric acid. Reduction or symptomatic relief may be needed. Discuss with DOT clinician.',
        sw: 'Maumivu makali ya viungo au shambulizi jipya la gout — pyrazinamide huinua uric acid. Upunguzaji au msaada wa dalili unaweza kuhitajika. Jadili na daktari wa DOT.',
        sw_mtaa: 'Severe joint pain au new gout attack — pyrazinamide inainua uric acid. Reduction au symptomatic relief inaweza kuhitajika. Jadili na DOT clinician.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Easy bruising or unusual bleeding — rifampicin can lower vitamin K and platelets in rare cases. Tell DOT clinician at next visit.',
        sw: 'Michubuko rahisi au damu isiyo ya kawaida — rifampicin inaweza kushusha vitamin K na platelets katika kesi nadra. Mwambie daktari wa DOT katika ziara inayofuata.',
        sw_mtaa: 'Easy bruising au unusual bleeding — rifampicin inaweza kushusha vitamin K na platelets katika rare cases. Mwambie DOT clinician next visit.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe weakness, persistent fever, or collapse — possible severe drug reaction, sepsis, or paradoxical TB reaction (especially in HIV). EMERGENCY assessment.',
        sw: 'Udhaifu mkubwa, homa ya kudumu, au kuanguka — uwezekano wa athari mbaya ya dawa, sepsis, au paradoxical TB reaction (hasa katika VVU). Tathmini ya DHARURA.',
        sw_mtaa: 'Severe weakness, persistent fever, au kuanguka — uwezekano wa severe drug reaction, sepsis, au paradoxical TB reaction (hasa katika VVU). EMERGENCY assessment.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'dolutegravir',
      withDisplay: {
        en: 'Dolutegravir (TLD HIV regimen)',
        sw: 'Dolutegravir (TLD regimen ya VVU)',
      },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin (in RHZE) accelerates the breakdown of dolutegravir, reducing its blood levels by about 75%. In Tanzania, the NACP solution is to give dolutegravir 50mg twice daily (instead of once daily) for the duration of rifampicin treatment. Return to 50mg once daily 2 weeks after rifampicin is stopped. Do NOT stop ART. This is one of the most important interactions in TB-HIV care.',
        sw: 'Rifampicin (katika RHZE) huharakisha kuvunjwa kwa dolutegravir, kupunguza viwango vyake vya damu kwa karibu 75%. Tanzania, suluhisho la NACP ni kutoa dolutegravir 50mg mara mbili kwa siku (badala ya mara moja kwa siku) kwa muda wa matibabu ya rifampicin. Rudi 50mg mara moja kwa siku wiki 2 baada ya rifampicin kusimamishwa. USISIMAMISHE ART. Huu ni mojawapo ya mwingiliano muhimu zaidi katika huduma ya TB-VVU.',
        sw_mtaa: 'Rifampicin (katika RHZE) inaharakisha kuvunjwa kwa dolutegravir, kupunguza blood levels zake kwa karibu 75%. Tanzania, NACP solution ni kutoa dolutegravir 50mg mara mbili kwa siku (badala ya mara moja kwa siku) kwa muda wa rifampicin treatment. Rudi 50mg mara moja kwa siku wiki 2 baada ya rifampicin kusimama. USISIMAMISHE ART. Huu ni mojawapo ya muhimu zaidi interactions katika TB-HIV care.',
      },
      sources: [src('NACP_ART_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'efavirenz',
      withDisplay: {
        en: 'Efavirenz / Nevirapine (older HIV regimens)',
        sw: 'Efavirenz / Nevirapine (regimens za zamani za VVU)',
      },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin also lowers nevirapine levels and changes efavirenz pharmacokinetics. Newer regimens (TLD with dolutegravir) are preferred for people on TB treatment, but if on older NNRTIs, the HIV clinician will guide. Never switch ART without specialist input.',
        sw: 'Rifampicin pia hushusha viwango vya nevirapine na hubadilisha pharmacokinetics ya efavirenz. Regimens mpya (TLD na dolutegravir) hupendekezwa kwa watu walio kwenye matibabu ya TB, lakini ikiwa kwenye NNRTIs za zamani, daktari wa VVU ataongoza. Kamwe usibadilishe ART bila mwongozo wa mtaalamu.',
        sw_mtaa: 'Rifampicin pia inashusha viwango vya nevirapine na inabadilisha efavirenz pharmacokinetics. Newer regimens (TLD na dolutegravir) zinapendekezwa kwa watu walio kwenye TB treatment, lakini kama uko kwenye older NNRTIs, HIV clinician ataongoza. KAMWE usibadilishe ART bila specialist input.',
      },
      sources: [src('NACP_ART_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'hormonal_contraceptives',
      withDisplay: {
        en: 'Hormonal contraceptives (pills, patches, injectables, implants)',
        sw: 'Vidhibiti vya mimba vya homoni (vidonge, viraka, sindano, vipandikizi)',
      },
      severity: 'avoid',
      explanation: {
        en: 'Rifampicin substantially reduces the effectiveness of hormonal contraceptives. Pregnancy can occur even on the pill, the injection, or the implant. Use a non-hormonal backup method during TB treatment AND for at least 4 weeks after rifampicin is stopped. Best choices: copper IUD (no interaction), condoms (consistent use). Discuss with your TB clinic — they will counsel and provide.',
        sw: 'Rifampicin hupunguza kwa kiasi kikubwa ufanisi wa vidhibiti vya mimba vya homoni. Mimba inaweza kutokea hata kwenye kidonge, sindano, au implant. Tumia njia mbadala isiyo ya homoni wakati wa matibabu ya TB NA kwa angalau wiki 4 baada ya rifampicin kusimamishwa. Chaguzi bora: copper IUD (hakuna mwingiliano), kondomu (matumizi thabiti). Jadili na kliniki yako ya TB — wataongoza na kutoa.',
        sw_mtaa: 'Rifampicin inapunguza kwa kiasi kikubwa ufanisi wa hormonal contraceptives. Mimba inaweza kutokea hata kwenye kidonge, sindano, au implant. Tumia njia mbadala isiyo ya homoni wakati wa TB treatment NA kwa angalau wiki 4 baada ya rifampicin kusimama. Best choices: copper IUD (hakuna interaction), kondomu (consistent use). Jadili na TB clinic yako — watakuongoza na kutoa.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'warfarin',
      withDisplay: {
        en: 'Warfarin (blood thinner)',
        sw: 'Warfarin (dawa ya kupunguza damu)',
      },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin dramatically reduces warfarin\'s effect — a fixed warfarin dose will become inadequate, raising clot risk. INR must be monitored more often and warfarin dose increased. After rifampicin is stopped, the dose must be brought back down. Coordinate with your cardiology or general medicine team.',
        sw: 'Rifampicin hupunguza sana athari ya warfarin — dose iliyofixed ya warfarin itakuwa haitoshi, kuongeza hatari ya kuganda kwa damu. INR lazima ifuatiliwe mara nyingi zaidi na dose ya warfarin iongezwe. Baada ya rifampicin kusimamishwa, dose lazima irudishwe chini. Ratibu na timu yako ya moyo au tiba ya jumla.',
        sw_mtaa: 'Rifampicin inapunguza sana effect ya warfarin — fixed warfarin dose itakuwa inadequate, ikiongeza clot risk. INR lazima ifuatiliwe mara nyingi zaidi na warfarin dose iongezwe. Baada ya rifampicin kusimama, dose lazima irudishwe chini. Coordinate na cardiology au general medicine team yako.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'sulfonylureas',
      withDisplay: {
        en: 'Sulfonylureas (glibenclamide, gliclazide) for diabetes',
        sw: 'Sulfonylureas (glibenclamide, gliclazide) kwa kisukari',
      },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin lowers the effect of sulfonylureas, raising blood sugar. Diabetics on TB treatment should monitor blood sugar more frequently — daily if possible. Dose adjustment, insulin temporarily, or switch to non-affected agents may be needed. Metformin is generally safe with rifampicin.',
        sw: 'Rifampicin hushusha athari ya sulfonylureas, kupandisha sukari ya damu. Wenye kisukari walio kwenye matibabu ya TB wanafaa kufuatilia sukari ya damu mara nyingi zaidi — kila siku ikiwezekana. Marekebisho ya dose, insulin kwa muda, au kubadili kwa mawakala wasioathiriwa kunaweza kuhitajika. Metformin kwa kawaida ni salama na rifampicin.',
        sw_mtaa: 'Rifampicin inashusha effect ya sulfonylureas, ikiinua blood sugar. Diabetics walio kwenye TB treatment wanafaa kufuatilia sugar mara nyingi zaidi — kila siku ikiwezekana. Dose adjustment, insulin kwa muda, au switch kwa non-affected agents inaweza kuhitajika. Metformin kwa kawaida ni salama na rifampicin.',
      },
      sources: [src('NTLP_TB_2024'), src('NTLG_STG_2023')],
    },
    {
      with: 'alcohol',
      withDisplay: {
        en: 'Alcohol (beer, wine, spirits, traditional brews)',
        sw: 'Pombe (bia, mvinyo, vinywaji vikali, vinywaji vya jadi)',
      },
      severity: 'avoid',
      explanation: {
        en: 'Alcohol multiplies the risk of liver injury from RHZE — particularly from isoniazid, rifampicin, and pyrazinamide. Heavy drinkers are 3+ times more likely to develop drug-induced hepatitis. Reduce to zero or absolute minimum during the 6 months. Honest disclosure of drinking helps your DOT clinician monitor liver function more closely. If you cannot stop, free brief intervention counselling is available at most DOT centres.',
        sw: 'Pombe huzidisha hatari ya uharibifu wa ini kutoka kwa RHZE — hasa kutoka kwa isoniazid, rifampicin, na pyrazinamide. Wanywaji wazito wana uwezekano mara 3+ wa kuendeleza hepatitis inayosababishwa na dawa. Punguza hadi sifuri au kima cha chini kabisa wakati wa miezi 6. Ufichuzi wa uaminifu wa kunywa husaidia daktari wako wa DOT kufuatilia utendaji wa ini kwa karibu zaidi. Ikiwa huwezi kuacha, ushauri wa bure wa intervention fupi unapatikana katika vituo vingi vya DOT.',
        sw_mtaa: 'Pombe inazidisha hatari ya liver injury kutoka kwa RHZE — hasa kutoka kwa isoniazid, rifampicin, na pyrazinamide. Heavy drinkers wana uwezekano mara 3+ wa kuendeleza drug-induced hepatitis. Punguza hadi sifuri au absolute minimum wakati wa miezi 6. Honest disclosure ya kunywa inasaidia DOT clinician yako kufuatilia liver function kwa karibu zaidi. Kama huwezi kuacha, free brief intervention counselling inapatikana DOT centres nyingi.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'antacids',
      withDisplay: {
        en: 'Antacids and milk taken with the dose',
        sw: 'Antacids na maziwa kuchukuliwa pamoja na dose',
      },
      severity: 'note',
      explanation: {
        en: 'Antacids reduce isoniazid absorption. If you need antacids, separate them by at least 1-2 hours from your RHZE dose. Milk and dairy do not block absorption significantly, but for best absorption take RHZE on an empty stomach.',
        sw: 'Antacids hupunguza kunyonyeshwa kwa isoniazid. Ikiwa unahitaji antacids, zitenganishe kwa angalau saa 1-2 kutoka kwa dose yako ya RHZE. Maziwa na bidhaa za maziwa hazizuii kunyonyeshwa kwa kiasi kikubwa, lakini kwa kunyonyeshwa bora chukua RHZE tumbo tupu.',
        sw_mtaa: 'Antacids zinapunguza isoniazid absorption. Kama unahitaji antacids, zitenganishe kwa angalau saa 1-2 kutoka kwa RHZE dose yako. Maziwa na dairy haziblocki absorption sana, lakini kwa best absorption chukua RHZE tumbo tupu.',
      },
      sources: [src('NTLP_TB_2024')],
    },
    {
      with: 'phenytoin',
      withDisplay: {
        en: 'Phenytoin / carbamazepine (anti-seizure drugs)',
        sw: 'Phenytoin / carbamazepine (dawa za kifafa)',
      },
      severity: 'caution',
      explanation: {
        en: 'Isoniazid raises phenytoin levels (toxicity risk), while rifampicin lowers carbamazepine levels (loss of seizure control). People on these drugs need careful monitoring with their neurologist during TB treatment.',
        sw: 'Isoniazid huinua viwango vya phenytoin (hatari ya sumu), wakati rifampicin hushusha viwango vya carbamazepine (kupoteza udhibiti wa kifafa). Watu walio kwenye dawa hizi wanahitaji ufuatiliaji wa makini na daktari wao wa neva wakati wa matibabu ya TB.',
        sw_mtaa: 'Isoniazid inainua phenytoin levels (toxicity risk), wakati rifampicin inashusha carbamazepine levels (loss of seizure control). Watu walio kwenye dawa hizi wanahitaji careful monitoring na neurologist wao wakati wa TB treatment.',
      },
      sources: [src('NTLP_TB_2024'), src('WHO_TB_2024')],
    },
    {
      with: 'paracetamol',
      withDisplay: {
        en: 'Paracetamol (high-dose, regular)',
        sw: 'Paracetamol (dose kubwa, mara kwa mara)',
      },
      severity: 'caution',
      explanation: {
        en: 'Regular high-dose paracetamol on top of RHZE adds liver load. Single occasional doses for pain are fine; daily long-term use should be discussed with your DOT clinician. Avoid combining with alcohol.',
        sw: 'Paracetamol ya dose kubwa ya mara kwa mara juu ya RHZE huongeza mzigo wa ini. Dose moja moja za maumivu ni sawa; matumizi ya kila siku ya muda mrefu yanafaa kujadiliwa na daktari wako wa DOT. Epuka kuchanganya na pombe.',
        sw_mtaa: 'Regular high-dose paracetamol juu ya RHZE inaongeza liver load. Single occasional doses kwa maumivu ni sawa; daily long-term use inafaa kujadiliwa na DOT clinician yako. Epuka kuchanganya na pombe.',
      },
      sources: [src('NTLP_TB_2024')],
    },
  ],

  lifestyleNotes: [
    {
      topic: {
        en: 'Pyridoxine (Vitamin B6) — mandatory companion',
        sw: 'Pyridoxine (Vitamin B6) — mwenzi wa lazima',
      },
      note: {
        en: 'Isoniazid (the "H" in RHZE) can cause peripheral neuropathy — tingling, numbness, or burning in feet and hands. Pyridoxine (vitamin B6) prevents this. NTLP provides pyridoxine alongside RHZE for high-risk patients: pregnancy, breastfeeding, HIV, diabetes, alcohol use, malnutrition, elderly, and infants on isoniazid through breast milk. Take it daily for the full duration. If symptoms develop, dose can be increased — discuss with DOT clinician.',
        sw: 'Isoniazid ("H" katika RHZE) inaweza kusababisha peripheral neuropathy — kuchomoa, ganzi, au kuwaka katika miguu na mikono. Pyridoxine (vitamin B6) huzuia hii. NTLP hutoa pyridoxine pamoja na RHZE kwa wagonjwa wa hatari kubwa: mimba, kunyonyesha, VVU, kisukari, matumizi ya pombe, utapiamlo, wazee, na watoto wachanga walio kwenye isoniazid kupitia maziwa ya mama. Tumia kila siku kwa muda wote. Ikiwa dalili zinaendelea, dose inaweza kuongezwa — jadili na daktari wa DOT.',
        sw_mtaa: 'Isoniazid ("H" katika RHZE) inaweza kusababisha peripheral neuropathy — kuchomoa, ganzi, au kuwaka katika miguu na mikono. Pyridoxine (vitamin B6) inazuia hii. NTLP inatoa pyridoxine pamoja na RHZE kwa high-risk patients: mimba, kunyonyesha, VVU, kisukari, alcohol use, utapiamlo, wazee, na infants walio kwenye isoniazid kupitia maziwa ya mama. Tumia kila siku kwa muda wote. Ikiwa dalili zinaendelea, dose inaweza kuongezwa — jadili na DOT clinician.',
      },
    },
    {
      topic: {
        en: 'Food timing',
        sw: 'Wakati wa chakula',
      },
      note: {
        en: 'For best absorption, take RHZE on an empty stomach: 1 hour before food or 2 hours after the last meal. If it causes intolerable nausea, a small light snack with the dose is acceptable — absorption drops slightly but most of the drug still works. Avoid taking with high-fat meals on a regular basis.',
        sw: 'Kwa kunyonyeshwa bora, chukua RHZE tumbo tupu: saa 1 kabla ya chakula au saa 2 baada ya chakula cha mwisho. Ikiwa inasababisha kichefuchefu kisichovumilika, chakula kidogo cha mwepesi na dose kinaweza kukubaliwa — kunyonyeshwa hupungua kidogo lakini dawa nyingi bado hufanya kazi. Epuka kuchukua na chakula chenye mafuta mengi mara kwa mara.',
        sw_mtaa: 'Kwa best absorption, chukua RHZE tumbo tupu: saa 1 kabla ya chakula au saa 2 baada ya chakula cha mwisho. Kama inasababisha kichefuchefu kisichovumilika, chakula kidogo cha light na dose kinaweza kukubaliwa — absorption inapungua kidogo lakini dawa nyingi bado zinafanya kazi. Epuka kuchukua na high-fat meals mara kwa mara.',
      },
    },
    {
      topic: {
        en: 'Alcohol',
        sw: 'Pombe',
      },
      note: {
        en: 'Best to stop drinking entirely for 6 months. The liver is metabolising four heavy drugs daily; alcohol adds load that can tip the balance into hepatitis. If full abstinence is not possible, reduce drastically and disclose to your DOT clinician so they can monitor your liver more closely.',
        sw: 'Bora kuacha kunywa kabisa kwa miezi 6. Ini linachakata dawa nne nzito kila siku; pombe inaongeza mzigo unaoweza kuangusha usawa kuwa hepatitis. Ikiwa kuacha kabisa hakuwezekani, punguza sana na ufichue kwa daktari wako wa DOT ili afuatilie ini lako kwa karibu zaidi.',
        sw_mtaa: 'Bora kuacha kunywa kabisa kwa miezi 6. Ini linachakata dawa nne nzito kila siku; pombe inaongeza load inayoweza kuangusha balance kuwa hepatitis. Kama full abstinence haiwezekani, punguza sana na disclose kwa DOT clinician yako ili afuatilie ini lako kwa karibu zaidi.',
      },
    },
    {
      topic: {
        en: 'Pregnancy and breastfeeding',
        sw: 'Mimba na kunyonyesha',
      },
      note: {
        en: 'All four drugs in RHZE are considered safe in pregnancy and breastfeeding. The drug to AVOID in pregnancy is streptomycin (not part of RHZE). Pyridoxine is mandatory throughout. Vitamin K may be given in late pregnancy. Breastfeeding is encouraged — drug levels in breast milk are low and not harmful.',
        sw: 'Dawa zote nne katika RHZE zinachukuliwa kuwa salama katika mimba na kunyonyesha. Dawa ya KUEPUKA katika mimba ni streptomycin (haipo katika RHZE). Pyridoxine ni lazima kabisa. Vitamin K inaweza kutolewa katika mimba ya marehemu. Kunyonyesha kunashauriwa — viwango vya dawa katika maziwa ya mama ni vya chini na sio hatari.',
        sw_mtaa: 'Dawa zote nne katika RHZE ni salama katika mimba na kunyonyesha. Dawa ya KUEPUKA katika mimba ni streptomycin (haipo katika RHZE). Pyridoxine ni lazima kabisa. Vitamin K inaweza kutolewa late pregnancy. Kunyonyesha kunashauriwa — drug levels katika maziwa ya mama ni za chini na sio hatari.',
      },
    },
    {
      topic: {
        en: 'Contraception during treatment',
        sw: 'Vidhibiti vya mimba wakati wa matibabu',
      },
      note: {
        en: 'Rifampicin substantially reduces effectiveness of hormonal contraceptives (pills, injections, implants). Use a non-hormonal backup: copper IUD or condoms — for the entire 6 months and at least 4 weeks after stopping rifampicin. Counsel your TB clinic about this at the start of treatment — unplanned pregnancy on TB treatment is more complicated to manage.',
        sw: 'Rifampicin hupunguza kwa kiasi kikubwa ufanisi wa vidhibiti vya mimba vya homoni (vidonge, sindano, vipandikizi). Tumia mbadala isiyo ya homoni: copper IUD au kondomu — kwa miezi 6 yote na angalau wiki 4 baada ya kusimamisha rifampicin. Shauri kliniki yako ya TB kuhusu hili mwanzoni mwa matibabu — mimba isiyopangwa kwenye matibabu ya TB ni ngumu zaidi kusimamia.',
        sw_mtaa: 'Rifampicin inapunguza kwa kiasi kikubwa effectiveness ya hormonal contraceptives (vidonge, sindano, implants). Tumia non-hormonal backup: copper IUD au kondomu — kwa miezi 6 yote na angalau wiki 4 baada ya kusimamisha rifampicin. Counsel TB clinic yako kuhusu hili mwanzoni mwa treatment — unplanned pregnancy kwenye TB treatment ni complicated zaidi kusimamia.',
      },
    },
    {
      topic: {
        en: 'Contact lenses',
        sw: 'Lensi za mguso',
      },
      note: {
        en: 'Rifampicin permanently stains soft contact lenses orange. Switch to glasses, daily disposable lenses, or rigid gas-permeable lenses for the duration of treatment. Tears, sweat, and saliva also turn orange — this is harmless.',
        sw: 'Rifampicin hupaka lensi za mguso laini rangi ya machungwa kwa kudumu. Badili kwa miwani, lensi za kutupwa za kila siku, au lensi rigid za kupita gesi kwa muda wa matibabu. Machozi, jasho, na mate pia hugeuka machungwa — hii haina madhara.',
        sw_mtaa: 'Rifampicin inapaka soft contact lenses rangi ya machungwa kwa kudumu. Badili kwa miwani, daily disposables, au rigid gas-permeable lenses kwa muda wa treatment. Machozi, jasho, na mate pia yanageuka machungwa — hii haina madhara.',
      },
    },
    {
      topic: {
        en: 'Smoking',
        sw: 'Kuvuta sigara',
      },
      note: {
        en: 'Smoking slows lung healing during TB treatment, worsens cough, and significantly increases risk of post-TB lung disease (bronchiectasis, fibrosis). Stop completely if possible. Free smoking cessation support is available at many DOT centres in Tanzania.',
        sw: 'Kuvuta sigara hupunguza uponyaji wa mapafu wakati wa matibabu ya TB, huzidisha kikohozi, na huongeza kwa kiasi kikubwa hatari ya post-TB lung disease (bronchiectasis, fibrosis). Acha kabisa ikiwezekana. Msaada wa bure wa kuacha sigara unapatikana katika vituo vingi vya DOT Tanzania.',
        sw_mtaa: 'Kuvuta sigara inapunguza uponyaji wa mapafu wakati wa TB treatment, inazidisha kikohozi, na inaongeza kwa kiasi kikubwa hatari ya post-TB lung disease (bronchiectasis, fibrosis). Acha kabisa ikiwezekana. Free smoking cessation support inapatikana DOT centres nyingi Tanzania.',
      },
    },
    {
      topic: {
        en: 'Liver monitoring',
        sw: 'Ufuatiliaji wa ini',
      },
      note: {
        en: 'Baseline liver function tests (LFTs) before starting RHZE. Repeat if symptoms suggest hepatitis (yellow eyes, dark urine, severe nausea, right-upper abdominal pain, severe fatigue) or routinely in higher-risk patients (HIV, alcohol use, age>60, pre-existing liver disease, pregnancy). Mild ALT/AST rise is common and may not require stopping; significant rise or symptoms = stop and review urgently.',
        sw: 'Vipimo vya utendaji wa ini vya msingi (LFTs) kabla ya kuanza RHZE. Rudia ikiwa dalili zinaonyesha hepatitis (macho ya njano, mkojo wa giza, kichefuchefu kikali, maumivu ya tumbo upande wa juu wa kulia, uchovu mkubwa) au mara kwa mara kwa wagonjwa wa hatari kubwa (VVU, matumizi ya pombe, umri zaidi ya 60, ugonjwa wa ini uliokuwepo, mimba). Kupanda kidogo kwa ALT/AST ni kawaida na huenda kusihitaji kusimamisha; kupanda kwa kiasi kikubwa au dalili = simamisha na pitia kwa haraka.',
        sw_mtaa: 'Baseline liver function tests (LFTs) kabla ya kuanza RHZE. Rudia ikiwa symptoms zinaonyesha hepatitis (yellow eyes, dark urine, severe nausea, right-upper abdominal pain, severe fatigue) au routinely kwa higher-risk patients (VVU, alcohol use, age>60, pre-existing liver disease, mimba). Mild ALT/AST rise ni kawaida na huenda hakuhitaji kusimamisha; significant rise au symptoms = simamisha na pitia urgently.',
      },
    },
    {
      topic: {
        en: 'Driving and machinery',
        sw: 'Kuendesha gari na mashine',
      },
      note: {
        en: 'Most people on RHZE drive and work normally. Dizziness, blurred vision, or severe nausea in the first weeks may temporarily affect driving — wait until you know how the medicine affects you. If ethambutol causes vision changes, stop driving and seek urgent ophthalmology review.',
        sw: 'Watu wengi kwenye RHZE huendesha na kufanya kazi kawaida. Kizunguzungu, ukungu wa kuona, au kichefuchefu kikali katika wiki za kwanza vinaweza kuathiri uendeshaji kwa muda — subiri hadi ujue jinsi dawa inakuathiri. Ikiwa ethambutol husababisha mabadiliko ya kuona, simamisha kuendesha na utafute ukaguzi wa haraka wa daktari wa macho.',
        sw_mtaa: 'Watu wengi kwenye RHZE wanaendesha na kufanya kazi kawaida. Dizziness, blurred vision, au severe nausea katika wiki za kwanza zinaweza kuathiri driving kwa muda — subiri hadi ujue jinsi dawa inakuathiri. Kama ethambutol inasababisha vision changes, simamisha kuendesha na utafute urgent ophthalmology review.',
      },
    },
  ],

  sources: [
    src('NTLP_TB_2024'),
    src('WHO_TB_2024'),
    src('NTLG_STG_2023'),
    src('NACP_ART_2024'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
