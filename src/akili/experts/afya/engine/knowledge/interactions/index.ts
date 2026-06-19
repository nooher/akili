/**
 * TibaHub Knowledge Base — Drug Interactions v2.0
 * Built by Naim Systems
 *
 * Sources: Tanzania STG 2022, WHO Model Formulary 2023, BNF,
 * NACP Tanzania HIV Guidelines 2022, NTLP TB Guidelines 2021
 *
 * Coverage:
 *   A. Drug + Alcohol (pombe) — #1 query Tanzania
 *   B. Drug + Drug (clinically critical pairs)
 *   C. Drug + Food
 *   D. Drug + Pregnancy
 */

import type { AIResult } from '../../adapters/legacyTypes';

export interface InteractionEntry {
  drugs: string[];
  triggers: string[];
  result: AIResult;
}

export const INTERACTIONS: InteractionEntry[] = [

  // ═══════════════════════════════════════════════════════
  // A. ALCOHOL (POMBE) INTERACTIONS
  // ═══════════════════════════════════════════════════════

  {
    drugs: ['metronidazole','flagyl','metrogyl'],
    triggers: ['pombe','alcohol','beer','bia','gongo','konyagi','mnazi','togwa','kunywa','drinks','wine','spirits'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'Tanzania STG 2022. BNF.',
      text:`METRONIDAZOLE (FLAGYL) + ALCOHOL — HATARI KUBWA SANA. HIZI MBILI HAZICHANGANYANI KAMWE.\n\nMetronidazole inasababisha athari ya disulfiram-like na pombe yoyote:\n\n★ Dalili ndani ya dakika 30:\n· Kichefuchefu na kutapika kwa nguvu\n· Uso kuwa mwekundu na moto sana (flushing)\n· Mapigo ya moyo ya haraka na nguvu\n· Maumivu makali ya kichwa\n· Kizunguzungu — unaweza kuanguka\n· Katika hali mbaya: shinikizo la damu kushuka, kupoteza fahamu\n\n★ Sheria ya Dhahabu:\nPOMBE ZERO wakati wote wa kozi + masaa 48 BAADA ya kidonge cha mwisho.\n\nHii inajumuisha: bia, mvinyo, gongo, mnazi, togwa, konyagi, na vyakula vilivyopikwa na pombe.\n\nKama athari imetokea: Kunywa maji mengi, lala, nenda hospitali mara moja kama dalili ni kali.`,
      swahili:`METRONIDAZOLE (FLAGYL) + ALCOHOL — VERY SERIOUS. NEVER COMBINE.\n\nCauses a severe disulfiram-like reaction within 30 minutes:\n· Violent nausea and vomiting\n· Severe flushing — face red and burning\n· Rapid pounding heartbeat\n· Severe headache and dizziness — can cause collapse\n· In severe cases: blood pressure crash, loss of consciousness\n\nGolden Rule: ZERO alcohol for entire course PLUS 48 hours after the last tablet.\n\nIncludes all forms: beer, wine, spirits, traditional brews (gongo, mnazi, togwa), food cooked with alcohol.`,
    },
  },

  {
    drugs: ['tinidazole','fasigyn'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`TINIDAZOLE + POMBE — HATARI KUBWA. Sawa na Metronidazole.\n\nUSINYWE pombe wakati wa matibabu NA masaa 72 (siku 3) baada ya kidonge cha mwisho — muda mrefu zaidi kuliko metronidazole.\n\nDalili: Kutapika kwa nguvu, uso mwekundu, mapigo ya moyo haraka, maumivu makali ya kichwa, kizunguzungu.\n\nHata kiasi kidogo cha pombe kinaweza kusababisha athari hii.`,
      swahili:`TINIDAZOLE + ALCOHOL — SERIOUS. Same disulfiram-like reaction as Metronidazole.\n\nNO alcohol during treatment AND for 72 hours (3 full days) after last dose — longer window than metronidazole.\n\nEven small amounts of alcohol trigger the reaction.`,
    },
  },

  {
    drugs: ['isoniazid','inh','rimstar','rhze','rifampicin','pyrazinamide','dawa za tb','tb treatment','kifua kikuu','tuberculosis'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks','spirits','mnazi'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'NTLP Tanzania TB Guidelines 2021. WHO.',
      text:`DAWA ZA TB + POMBE — HATARI YA UHARIBIFU MKUBWA WA INI.\n\nIsoniazid, Rifampicin, na Pyrazinamide — dawa zote tatu za TB — zinashughulikiwa na ini. Pombe pia inadhuru ini.\n\nMchanganyiko huu:\n★ Unaongeza sana hatari ya hepatitis ya dawa (ini kuwaka)\n★ Unaweza kusababisha kushindwa kwa ini (liver failure)\n★ Unapunguza ufanisi wa matibabu ya TB\n★ Unakufanya usahau dozi — TB ya dawa sugu (MDR-TB) inaweza kutokea\n\nISHARA ZA ONYO — Simama dawa NA nenda hospitali MARA MOJA:\n· Macho au ngozi kuwa ya njano (jaundice)\n· Mkojo wa kahawia nyeusi\n· Kichefuchefu kikali, kutapika, kukosa hamu\n· Maumivu makali ya tumbo upande wa kulia juu\n· Uchovu usio wa kawaida\n\nUshauri: Acha pombe KABISA wakati wote wa miezi 6 ya matibabu ya TB.`,
      swahili:`TB MEDICATIONS + ALCOHOL — SERIOUS LIVER DAMAGE RISK.\n\nIsoniazid, Rifampicin, Pyrazinamide — all three metabolised by liver. Alcohol also damages liver.\n\nCombination:\n★ Dramatically increases drug-induced hepatitis risk\n★ Can cause liver failure\n★ Reduces TB treatment effectiveness\n★ Missed doses from alcohol → drug-resistant TB (MDR-TB)\n\nWARNING — Stop TB drugs and go to hospital IMMEDIATELY:\n· Yellow eyes or skin (jaundice)\n· Dark brown urine\n· Severe nausea, vomiting, appetite loss\n· Severe right upper abdominal pain\n· Extreme unusual tiredness\n\nRecommendation: Complete abstinence for entire 6-month TB course.`,
    },
  },

  {
    drugs: ['metformin','glucophage','metformin hcl'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks','mnazi'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'Tanzania STG 2022. BNF.',
      text:`METFORMIN + POMBE — HATARI KUBWA MBILI.\n\n1. LACTIC ACIDOSIS (nadra lakini inaweza kuua)\nPombe inaongeza hatari ya asidi ya lactic kujaa damu kwa njia ya hatari.\nDalili: Maumivu ya misuli, udhaifu, kupumua kwa shida, maumivu ya tumbo, hisia ya baridi mwilini.\nHii ni dharura ya kimatibabu — nenda hospitali MARA MOJA.\n\n2. SUKARI CHINI (hypoglycaemia)\nPombe inazuia ini kutoa glucose na inaweza kuficha ishara za onyo.\nDalili: Kutetemeka, jasho, kuchanganyikiwa, mapigo ya moyo ya haraka.\n\nKama utakunywa:\n· Usinywe tumbo tupu kamwe\n· Kula chakula chenye wanga kila unakonywa\n· Usinywe sana (binge drinking)\n· Pima sukari kabla ya kulala\n· Mwambie mtu kwamba una kisukari\n\nUshauri bora: Epuka pombe kabisa.`,
      swahili:`METFORMIN + ALCOHOL — TWO SERIOUS RISKS.\n\n1. LACTIC ACIDOSIS (rare but fatal)\nAlcohol increases risk of dangerous lactic acid build-up.\nSymptoms: Muscle pain, weakness, breathing difficulty, abdominal pain, feeling cold. Medical emergency — go to hospital IMMEDIATELY.\n\n2. HYPOGLYCAEMIA\nAlcohol blocks liver glucose release and masks warning signs.\nSymptoms: Shakiness, sweating, confusion, rapid heartbeat.\n\nIf you drink:\n· Never on an empty stomach\n· Eat carbohydrate food with every drink\n· Never binge drink\n· Check blood sugar before bed\n· Tell someone you are diabetic\n\nBest advice: Avoid alcohol completely.`,
    },
  },

  {
    drugs: ['insulin','insulini','actrapid','mixtard','novomix','lantus','glargine','humulin','biphasic insulin'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks','mnazi'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'Tanzania STG 2022. IDF.',
      text:`INSULINI + POMBE — HATARI YA SUKARI CHINI SANA.\n\nMchanganyiko huu ni hatari sana:\n★ Pombe inazuia ini kutoa glucose damu\n★ Inasababisha sukari chini sana kwa muda mrefu (prolonged hypoglycaemia)\n★ Unaweza kufikiri unalewa tu hali ukiwa katika hali ya hatari ya sukari\n★ Unaweza kupoteza fahamu bila onyo\n\nDalili za sukari chini kali: Kuchanganyikiwa, kutotamka vizuri, mshtuko wa mwili, kupoteza fahamu.\nPiga kelele mara moja — dharura.\n\nKama utakunywa pombe:\n· Kamwe usinywe tumbo tupu\n· Kula chakula chenye wanga nyingi\n· Pima sukari kabla ya kulala — weka kengele ya usiku\n· Vaa kitambulisho cha kimatibabu\n· Mwambie mtu anayekuwa nawe kwamba uko kwenye insulini\n\nUshauri mkubwa: Epuka pombe kabisa ukitumia insulini.`,
      swahili:`INSULIN + ALCOHOL — DANGEROUS HYPOGLYCAEMIA.\n\n★ Alcohol blocks liver glucose release\n★ Can cause severe, prolonged low blood sugar\n★ May confuse drunkenness with dangerous hypoglycaemia\n★ Can cause unconsciousness without warning\n\nSigns of severe hypoglycaemia: Confusion, slurred speech, seizures, unconsciousness. Call for help immediately — emergency.\n\nIf you drink:\n· Never on an empty stomach\n· Eat carbohydrate-rich meal\n· Check blood sugar before bed; set alarm to check again during night\n· Wear medical alert ID\n· Tell companions you are on insulin\n\nStrong recommendation: Avoid alcohol completely on insulin.`,
    },
  },

  {
    drugs: ['glibenclamide','gliclazide','glipizide','glimepiride','sulphonylurea','euglucon','diamicron'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'Tanzania STG 2022. BNF.',
      text:`GLIBENCLAMIDE/SULPHONYLUREAS + POMBE — HATARI YA SUKARI CHINI.\n\nGlibenclamide tayari inapunguza sukari kwa nguvu. Pombe inaongeza athari hii na inazuia ini kutoa glucose.\n\nInaweza kusababisha sukari chini sana kwa muda mrefu — hatari sana kwa sababu pombe inaficha ishara za onyo.\n\nDalili: Kutetemeka, jasho, kuchanganyikiwa, mapigo ya moyo ya haraka, njaa kali.\n\nTibu mara moja: Glukosi vidonge 3 AU juisi 150ml AU vijiko 3 vya sukari ndani ya maji.\nPima tena baada ya dakika 15. Kama hakuna nafuu — nenda hospitali.\n\nEpuka pombe. Kama utakunywa, kula chakula na upime sukari mara kwa mara.`,
      swahili:`GLIBENCLAMIDE/SULPHONYLUREAS + ALCOHOL — HYPOGLYCAEMIA RISK.\n\nGlibenclamide already powerfully lowers blood sugar. Alcohol adds to this and blocks liver glucose release.\n\nCan cause severe, prolonged hypoglycaemia — especially dangerous because alcohol masks warning signs.\n\nSymptoms: Shakiness, sweating, confusion, rapid heartbeat, intense hunger.\n\nTreat immediately: 3 glucose tablets OR 150ml juice OR 3 tsp sugar dissolved in water.\nRecheck after 15 min. No improvement — go to hospital.\n\nAvoid alcohol. If you drink, eat food and monitor blood sugar closely.`,
    },
  },

  {
    drugs: ['warfarin','coumadin','anticoagulant'],
    triggers: ['pombe','alcohol','beer','bia','kunywa','drinks'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`WARFARIN + POMBE — HATARI YA KUTOKWA NA DAMU.\n\nWarfarin na pombe vinaingiliana kwa njia isiyotabirika:\n★ Kunywa kidogo: Inaongeza athari ya warfarin — hatari ya kutokwa na damu\n★ Kunywa sana mara kwa mara: Inaweza kupunguza athari ya warfarin — hatari ya vifungo\n\nKwa njia yoyote, INR yako inakuwa isiyotabirika na hatari.\n\nDALILI ZA KUTOKWA NA DAMU KWA HATARI — Nenda hospitali MARA MOJA:\n· Michubuko isiyo ya kawaida\n· Mkojo wa pink au nyekundu\n· Kinyesi cheusi au kilicho na damu\n· Kutema damu\n· Kutoka damu kwa muda mrefu kutoka majeraha madogo\n· Maumivu makali ya kichwa (inaweza kuwa damu ya ubongo)\n\nUshauri: Acha pombe kabisa. Kama utakunywa kidogo, lazima upime INR mara nyingi zaidi.`,
      swahili:`WARFARIN + ALCOHOL — SERIOUS BLEEDING RISK.\n\nUnpredictable interaction:\n★ Occasional drinking: INCREASES warfarin effect → bleeding risk\n★ Regular heavy drinking: Can DECREASE warfarin effect → clotting risk\n\nEither way, INR becomes dangerously unstable.\n\nSIGNS OF DANGEROUS BLEEDING — Go to hospital IMMEDIATELY:\n· Unusual bruising\n· Pink or red urine\n· Black or bloody stools\n· Vomiting blood\n· Prolonged bleeding from cuts\n· Severe headache (possible brain bleed)\n\nRecommendation: Complete abstinence. If you drink at all, INR must be checked more frequently.`,
    },
  },

  {
    drugs: ['paracetamol','acetaminophen','panadol'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`PARACETAMOL (PANADOL) + POMBE — HATARI YA UHARIBIFU WA INI.\n\nParacetamol ni salama kwa kawaida. Lakini pombe inabadilisha jinsi mwili unavyoiharibu, ikisababisha sumu inayoharibu ini.\n\nHatari:\n★ Watu wanaokunywwa pombe mara kwa mara wana hatari kubwa zaidi ya uharibifu wa ini\n★ Kuchukua paracetamol kwa maumivu ya kichwa baada ya kunywa (hangover) ni HATARI SANA\n★ Mchanganyiko unaweza kusababisha kushindwa kwa ini kuhitaji upandikizaji au kusababisha kifo\n\nMatumizi salama:\n· Kunywa mara kwa mara: Chukua kipimo cha chini (500mg), si zaidi ya gramu 2 kwa siku\n· Kunywa sana: Epuka paracetamol kabisa\n· KAMWE usizidi gramu 4 (vidonge 8 × 500mg) kwa siku\n· Usiunganishe na dawa nyingine zenye paracetamol\n\nDalili za uharibifu wa ini: Macho ya njano, mkojo mweusi, maumivu makali ya tumbo kulia. Dharura ya kimatibabu.`,
      swahili:`PARACETAMOL (PANADOL) + ALCOHOL — LIVER DAMAGE RISK.\n\nParacetamol is normally safe. Alcohol changes how the body processes it, creating liver-toxic byproducts.\n\nRisks:\n★ Regular drinkers have significantly higher liver damage risk\n★ Taking paracetamol for hangover headache is PARTICULARLY DANGEROUS\n★ Combination can cause liver failure — requiring transplant or causing death\n\nSafe use:\n· Occasional drinker: Lowest dose (500mg), max 2g/day\n· Heavy drinker: Avoid paracetamol completely\n· NEVER exceed 4g (8 × 500mg tablets) per day\n· Don't combine with other paracetamol-containing products\n\nLiver damage signs: Yellow eyes, dark urine, severe upper right abdominal pain. Medical emergency.`,
    },
  },

  {
    drugs: ['art','arv','antiretroviral','dawa za ukimwi','dawa za vvu','tenofovir','efavirenz','lamivudine','nevirapine','lopinavir','ritonavir','dolutegravir','tdf','tle','tld','truvada','atripla'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks','mnazi'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'NACP Tanzania HIV Guidelines 2022. WHO.',
      text:`DAWA ZA VVU (ARV) + POMBE — HATARI NYINGI KUBWA.\n\n1. KUKOSA DOZI (Muhimu Zaidi Kabisa)\nPombe ndiyo sababu #1 ya kukosa dozi za ARV. Kukosa dozi husababisha upinzani wa dawa — dawa zinacha kufanya kazi. HAIWEZI KURUDISHWA.\n\n2. UHARIBIFU WA INI\nNevirapine, Efavirenz, Lopinavir/r — zote zinashughulikiwa na ini. Pombe inaongeza msongo mkubwa wa ini.\n\n3. EFAVIRENZ NA POMBE\nPombe inaongeza kiwango cha Efavirenz damu:\n· Kizunguzungu kikali\n· Ndoto za kutisha na wazi sana\n· Kuchanganyikiwa\n· Hisia za kufa\n\n4. UKANDAMIZAJI WA KINGA\nPombe inabanisha mfumo wa kinga — matatizo ya VVU yanaongezeka.\n\n5. TABIA HATARI\nPombe inaongeza hatari ya ngono zisizo salama.\n\nUshauri: Epuka pombe kabisa ukiwa kwenye dawa za VVU.\nKama utakunywa: Weka kengele ya simu kuhakikisha HUKOSI DOZI KAMWE.`,
      swahili:`ARV MEDICATIONS + ALCOHOL — MULTIPLE SERIOUS RISKS.\n\n1. MISSED DOSES (Most Critical)\nAlcohol is the #1 reason people miss ARV doses. Missing doses → drug resistance → medications stop working. IRREVERSIBLE.\n\n2. LIVER TOXICITY\nNevirapine, Efavirenz, Lopinavir/r — all liver-processed. Alcohol adds significant liver stress.\n\n3. EFAVIRENZ AMPLIFICATION\nAlcohol increases Efavirenz blood levels:\n· Severe dizziness\n· Vivid disturbing dreams\n· Confusion and dissociation\n· Suicidal feelings\n\n4. IMMUNE SUPPRESSION\nAlcohol independently suppresses immunity — HIV complications more likely.\n\n5. RISKY BEHAVIOUR\nIncreased risk of unprotected sex → HIV transmission.\n\nRecommendation: Avoid alcohol completely on ARVs.\nIf you drink: Set phone alarms — NEVER miss a dose.`,
    },
  },

  {
    drugs: ['diazepam','lorazepam','clonazepam','phenobarbitone','phenobarbital','carbamazepine','valproate','sodium valproate','epilepsy','kifafa','dawa za kifafa'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`DAWA ZA KIFAFA + POMBE — HATARI YA MSHTUKO NA KUPUMUA POLEPOLE.\n\nHATARI MBILI KUBWA:\n\n1. KUSABABISHA MSHTUKO\nKuacha pombe (uondoaji wa pombe) siku inayofuata ni moja ya vichocheo vikali zaidi vya mshtuko. Usiku mmoja wa kunywa unaweza kusababisha mshtuko asubuhi inayofuata.\n\n2. UKANDAMIZAJI WA MFUMO WA NEVA\nPombe na diazepam, phenobarbitone, au dawa nyingine za kutuliza:\n· Usingizi kupita kiasi — hatari sana\n· Kupumua polepole — inaweza kuua\n· Kuchanganyikiwa na kukosa uratibu\n· Kukoma kwa kupumua katika hali mbaya\n\nUshauri mkubwa: Acha pombe kabisa ukiwa kwenye dawa za kifafa.\n\nKama umepata mshtuko baada ya kunywa: Mwambie daktari wako mara moja.`,
      swahili:`EPILEPSY MEDICATIONS + ALCOHOL — SEIZURE AND BREATHING RISKS.\n\nTWO MAJOR DANGERS:\n\n1. SEIZURE TRIGGER\nAlcohol withdrawal (day after drinking) is one of the most powerful seizure triggers. Even one night of drinking can trigger a seizure the next morning.\n\n2. CNS DEPRESSION\nAlcohol + diazepam, phenobarbitone, or other sedating epilepsy drugs:\n· Dangerous excessive sedation\n· Slowed breathing — can be fatal\n· Confusion and loss of coordination\n· Respiratory arrest in severe cases\n\nStrong recommendation: Complete abstinence from alcohol on epilepsy medications.\n\nIf you have had a seizure after drinking: Tell your neurologist immediately.`,
    },
  },

  {
    drugs: ['aspirin','ibuprofen','diclofenac','naproxen','nsaid','brufen','voltaren','feldene','piroxicam'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`IBUPROFEN/DICLOFENAC/ASPIRIN (NSAIDs) + POMBE — HATARI YA DAMU YA TUMBO.\n\nDawa hizi tayari zinakereza ukuta wa tumbo. Pombe inaongeza hatari hii kwa kiasi kikubwa:\n★ Vidonda vya tumbo (peptic ulcers)\n★ Kutokwa na damu ya tumbo — inayoweza kuua\n★ Aspirin na pombe ni hatari hasa kwa kutokwa na damu\n\nDALILI ZA DAMU YA TUMBO — Nenda hospitali MARA MOJA:\n· Kinyesi cheusi, laini, chenye harufu (tarry stools)\n· Kutema damu (nyekundu au kama makahawa — coffee grounds)\n· Maumivu ya ghafla makali ya tumbo\n· Kizunguzungu, kupoteza fahamu\n\nEpuka mchanganyiko huu kabisa.`,
      swahili:`NSAIDs (ASPIRIN/IBUPROFEN/DICLOFENAC) + ALCOHOL — STOMACH BLEEDING RISK.\n\nNSAIDs already irritate the stomach lining. Alcohol dramatically increases:\n★ Peptic ulcers\n★ Serious gastric bleeding — life-threatening\n★ Aspirin + alcohol especially dangerous for bleeding\n\nSIGNS OF STOMACH BLEEDING — Go to hospital IMMEDIATELY:\n· Black, tarry, foul-smelling stools\n· Vomiting blood (bright red or coffee-ground appearance)\n· Sudden severe stomach pain\n· Dizziness, fainting\n\nAvoid this combination completely.`,
    },
  },

  {
    drugs: ['amitriptyline','imipramine','clomipramine','antidepressant','dawa za msongo','sertraline','fluoxetine','paroxetine','depression','huzuni'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF.',
      text:`DAWA ZA MSONGO WA MAWAZO + POMBE — HATARI.\n\nAmitriptyline na dawa nyingine za msongo wa mawazo pamoja na pombe:\n★ Zinasababisha usingizi mzito hatari — usiendeshe gari au kutumia mashine\n★ Pombe ni kizuia cha mfumo wa neva — inazidisha msongo wa mawazo na wasiwasi\n★ Inaongeza hatari ya kuanguka na ajali\n★ Inaweza kuzidisha mawazo ya kujidhuru\n\nKumbuka: Ingawa pombe inaweza kuhisi kupunguza msongo kwa muda mfupi, kwa kweli inaufanya kuwa mbaya zaidi kwa muda mrefu.\n\nEpuka pombe kabisa ukiwa kwenye dawa za msongo wa mawazo.`,
      swahili:`ANTIDEPRESSANTS + ALCOHOL — DANGEROUS.\n\nCombination causes:\n★ Excessive dangerous sedation — do not drive or operate machinery\n★ Alcohol is a CNS depressant — worsens depression and anxiety\n★ Increased falls and accident risk\n★ Can worsen suicidal thoughts\n\nRemember: Alcohol may feel temporarily relieving but makes depression significantly worse over time.\n\nAvoid alcohol completely while on antidepressants.`,
    },
  },

  {
    drugs: ['codeine','tramadol','morphine','pethidine','opioid','opiates','dawa za maumivu kali'],
    triggers: ['pombe','alcohol','beer','bia','gongo','kunywa','drinks'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'BNF.',
      text:`OPIOID PAINKILLERS + POMBE — HATARI YA MAUTI.\n\nCodeine, Tramadol, Morphine na pombe pamoja ni mchanganyiko wa hatari ya mauti:\n★ Zote mbili zinapunguza kasi ya kupumua\n★ Mchanganyiko unaweza kusababisha kupumua kuacha kabisa\n★ Unaweza kulala na kutolewa fahamu bila onyo\n\nISHARA ZA DHARURA: Kupumua polepole sana au kuacha, midomo ya bluu, kutolewa fahamu.\nPiga 112 au nenda hospitali MARA MOJA.\n\nKAMWE usiunganishe opioids na pombe.`,
      swahili:`OPIOID PAINKILLERS + ALCOHOL — LIFE-THREATENING.\n\nCodeine, Tramadol, Morphine with alcohol is a potentially fatal combination:\n★ Both suppress breathing\n★ Combination can cause breathing to stop completely\n★ Can cause unconsciousness without warning\n\nEMERGENCY SIGNS: Very slow or stopped breathing, blue lips, loss of consciousness.\nCall 112 or go to hospital IMMEDIATELY.\n\nNEVER combine opioids with alcohol.`,
    },
  },

  // ═══════════════════════════════════════════════════════
  // B. DRUG + DRUG INTERACTIONS
  // ═══════════════════════════════════════════════════════

  {
    drugs: ['metformin'],
    triggers: ['contrast','rangi ya eksirei','ct scan','angiogram','dye','scan','picha ya eksirei','x-ray','mri'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'KDIGO 2022. Radiology Society guidelines.',
      text:`METFORMIN + RANGI YA EKSIREI (CONTRAST) — SIMAMA METFORMIN KABLA YA PICHA.\n\nKama unahitaji CT scan, angiogram, au utaratibu wowote unaotumia rangi inayoingizwa kwenye mshipa:\n\n★ SIMAMA Metformin masaa 48 KABLA ya utaratibu\n★ USIANZE tena Metformin hadi masaa 48 BAADA ya utaratibu NA baada ya kuthibitisha figo zinafanya kazi vizuri\n\nKwa nini: Rangi inaweza kupunguza kazi ya figo kwa muda. Figo zikiwa dhaifu, Metformin inajilundika na inasababisha lactic acidosis — inayoweza kuua.\n\nMwambie KILA daktari na radiographer kwamba unachukua Metformin kabla ya picha yoyote na rangi.\nKama hukuambiwa kusimama kabla ya scan: Mwambie timu ya radiolojia MARA MOJA.`,
      swahili:`METFORMIN + CONTRAST DYE — STOP METFORMIN BEFORE SCANS.\n\nFor CT scan, angiogram, or any contrast-enhanced procedure:\n★ STOP Metformin 48 hours BEFORE procedure\n★ Do NOT restart until 48 hours AFTER AND kidney function confirmed normal\n\nWhy: Contrast dye can temporarily reduce kidney function. With impaired kidneys, Metformin accumulates → lactic acidosis — potentially fatal.\n\nTell EVERY doctor and radiographer you take Metformin before any contrast imaging.\nIf not told to stop before scan: Tell the radiology team IMMEDIATELY.`,
    },
  },

  {
    drugs: ['warfarin'],
    triggers: ['aspirin','ibuprofen','diclofenac','nsaid','brufen','voltaren','pamoja','maumivu','painkiller'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`WARFARIN + NSAIDs (IBUPROFEN/DICLOFENAC/ASPIRIN) — HATARI KUBWA YA DAMU.\n\nMchanganyiko huu unaongeza sana hatari ya kutokwa na damu kwa hatari ya maisha:\n★ NSAIDs zinaongeza athari ya warfarin kwa njia isiyotabirika\n★ NSAIDs pia zinadhuru ukuta wa tumbo — chanzo cha pili cha damu\n★ Hata dozi MOJA ya NSAID inaweza kusababisha mwingiliano hatari\n\nKAMWE usichukue NSAIDs na Warfarin bila idhini ya wazi ya daktari wako.\n\nKwa maumivu: Paracetamol ni salama zaidi (lakini angalia kipimo na daktari).\n\nDALILI ZA DHARURA: Kinyesi cheusi, kutema damu, maumivu makali ya kichwa, michubuko isiyo ya kawaida. Nenda hospitali MARA MOJA.`,
      swahili:`WARFARIN + NSAIDs — SERIOUS BLEEDING RISK.\n\nSignificantly increases risk of life-threatening bleeding:\n★ NSAIDs increase warfarin's anticoagulant effect unpredictably\n★ NSAIDs also damage stomach lining — second source of bleeding\n★ Even a SINGLE dose of NSAID can cause dangerous interaction\n\nNEVER take NSAIDs with Warfarin without explicit doctor approval.\n\nFor pain: Paracetamol is safer (check dose with doctor).\n\nEMERGENCY SIGNS: Black stools, vomiting blood, severe headache, unusual bruising. Go to hospital IMMEDIATELY.`,
    },
  },

  {
    drugs: ['rifampicin','art','arv','antiretroviral','efavirenz','nevirapine','lopinavir','dolutegravir','dawa za vvu'],
    triggers: ['rifampicin','tb','kifua kikuu','pamoja','together','both','zote mbili','combine','mchanganyiko'],
    result: {
      level:'urgent', confidence:'high', source:'offline',
      disclaimer:'NACP Tanzania HIV/TB Co-treatment Guidelines 2022. WHO.',
      text:`DAWA ZA TB + DAWA ZA VVU — MWINGILIANO MUHIMU SANA.\n\nRifampicin (dawa kuu ya TB) inaathiri kwa nguvu kiwango cha dawa za VVU damu:\n★ Rifampicin INAPUNGUZA kiwango cha dawa nyingi za VVU — ikizifanya zifanye kazi kidogo\n★ Inaweza kusababisha kushindwa kwa matibabu ya VVU na upinzani wa dawa\n\nMWINGILIANO MAALUM:\n· Rifampicin + Nevirapine: Kiwango hushuka 50% — HATARI, epuka mchanganyiko huu\n· Rifampicin + Lopinavir/r: Kiwango hushuka 75% — epuka au tumia kipimo kilichoboreshwa\n· Rifampicin + Efavirenz: Kipimo kinahitaji kuongezwa hadi 800mg (kawaida 600mg)\n· Rifampicin + Dolutegravir: Kipimo kinaongezwa mara mbili — mara mbili kwa siku\n\nKama una VVU na TB, LAZIMA udhibitiwe na daktari mwenye uzoefu wa VVU/TB.\nKAMWE usibadilishe dawa zako bila mwongozo wa mtaalamu.`,
      swahili:`TB TREATMENT + ARV MEDICATIONS — CRITICAL DRUG INTERACTIONS.\n\nRifampicin powerfully affects ARV blood levels:\n★ REDUCES levels of most ARVs — making them less effective\n★ Can lead to HIV treatment failure and drug resistance\n\nSPECIFIC INTERACTIONS:\n· Rifampicin + Nevirapine: Levels drop 50% — DANGEROUS, avoid combination\n· Rifampicin + Lopinavir/r: Levels drop 75% — avoid or use boosted dose\n· Rifampicin + Efavirenz: Dose must increase to 800mg (standard 600mg insufficient)\n· Rifampicin + Dolutegravir: Dose doubled to twice daily\n\nIf you have both HIV and TB, MUST be managed by experienced HIV/TB doctor.\nNEVER change ARV or TB medication without specialist guidance.`,
    },
  },

  {
    drugs: ['enalapril','lisinopril','ramipril','losartan','valsartan','irbesartan','ace inhibitor','arb','spironolactone'],
    triggers: ['potassium','potasiamu','vidonge vya potassium','coconut','nazi','maji ya nazi','supplement','zinc','salt substitute'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF. KDIGO 2022.',
      text:`ACE INHIBITORS/ARBs + POTASSIUM — HATARI YA POTASSIUM NYINGI.\n\nEnalapril, Lisinopril, Ramipril, Losartan, Spironolactone — dawa hizi zinasababisha figo kuhifadhi potassium.\n\nKuchanganya na potassium ya ziada ni hatari:\n★ Vidonge vya potassium\n★ Mbadala za chumvi (salt substitutes — zina potassium chloride)\n★ Maji ya nazi mengi sana\n★ Avocado, ndizi kwa wingi mkubwa\n★ Spironolactone (pia inahifadhi potassium)\n\nPotassium nyingi (hyperkalaemia) inaweza kusababisha:\n· Udhaifu wa misuli\n· Mfumo usio wa kawaida wa moyo — unaweza kusababisha moyo kusimama\n\nUSICHUKUE vidonge vya potassium ukiwa kwenye dawa hizi bila daktari kuamua.\nDaktari apime potassium yako damu mara kwa mara.`,
      swahili:`ACE INHIBITORS/ARBs + POTASSIUM — DANGEROUSLY HIGH POTASSIUM RISK.\n\nEnalapril, Lisinopril, Ramipril, Losartan, Spironolactone — all cause kidneys to retain potassium.\n\nCombining with extra potassium is dangerous:\n★ Potassium supplements\n★ Salt substitutes (contain potassium chloride)\n★ Large amounts of coconut water\n★ Very large amounts of avocado, banana\n★ Spironolactone (also retains potassium)\n\nHigh potassium (hyperkalaemia) can cause:\n· Muscle weakness\n· Abnormal heart rhythm — can cause cardiac arrest\n\nDo NOT take potassium supplements on these medications without doctor's prescription.\nDoctor should check your potassium level regularly.`,
    },
  },

  {
    drugs: ['tld','tle','dolutegravir','tenofovir','lamivudine','arv','dawa za vvu'],
    triggers: ['antacid','gaviscon','maalox','aluminium','calcium carbonate','magnesium','antasidi','dawa za tumbo'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'NACP Tanzania HIV Guidelines 2022.',
      text:`DAWA ZA VVU (DOLUTEGRAVIR) + ANTACIDS — UPUNGUZAJI WA UFANISI.\n\nDolutegravir (sehemu ya TLD) inashikamana na aluminium, calcium, au magnesium kwenye antacids, ikipunguza sana kiasi kinachoingia mwilini.\n\nEPUKA kuchukua antacids (Gaviscon, Maalox, Aluminium hydroxide, calcium carbonate) ndani ya masaa 2 ya TLD.\n\nNjia salama:\n· Chukua TLD: Kisha subiri masaa 2 kabla ya kuchukua antacid\n· AU: Chukua antacid kwanza, kisha subiri masaa 2 kabla ya TLD\n\nAu omba daktari wako dawa mbadala ya tumbo.`,
      swahili:`ARV MEDICATIONS (DOLUTEGRAVIR) + ANTACIDS — REDUCED EFFECTIVENESS.\n\nDolutegravir (in TLD) binds to aluminium, calcium, or magnesium in antacids, significantly reducing absorption.\n\nAVOID taking antacids (Gaviscon, Maalox, Aluminium hydroxide, calcium carbonate) within 2 hours of TLD.\n\nSafe timing:\n· Take TLD: Then wait 2 hours before taking antacid\n· OR: Take antacid first, then wait 2 hours before TLD\n\nOr ask your doctor for an alternative stomach medication.`,
    },
  },

  // ═══════════════════════════════════════════════════════
  // C. DRUG + FOOD INTERACTIONS
  // ═══════════════════════════════════════════════════════

  {
    drugs: ['warfarin'],
    triggers: ['sukuma wiki','spinach','mboga','cabbage','kale','greens','vitamin k','vitamini k','chakula','food','vegetable','mboga za majani'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF.',
      text:`WARFARIN + MBOGA ZA MAJANI — INAATHIRI UDHIBITI WA KUGANDA KWA DAMU.\n\nWarfarin inafanya kazi kwa kuzuia Vitamini K. Vyakula vyenye Vitamini K nyingi vinapunguza ufanisi wa warfarin.\n\nVyakula vyenye Vitamini K nyingi:\n· Sukuma wiki, spinach, kale, kabichi, mchicha, collard greens\n· Broccoli, Brussels sprouts\n\nSHERIA MUHIMU:\nUSIACHE mboga hizi kabisa — unahitaji virutubisho vyake.\n\nBadala yake:\n★ KULA KIASI SAWA kila wiki — sehemu moja au mbili kwa siku ni sawa\n★ USIBADILISHE ghafla kiasi chako cha mboga\n★ Mabadiliko ya ghafla yanasababisha INR kushuka au kupanda kwa hatari\n\nPima INR yako mara kwa mara. Mabadiliko ya chakula, afya, au dawa nyingine — pima INR.`,
      swahili:`WARFARIN + GREEN VEGETABLES — AFFECTS BLOOD CLOTTING CONTROL.\n\nWarfarin works by blocking Vitamin K. Vitamin K-rich foods reduce its effectiveness.\n\nHigh Vitamin K foods:\n· Sukuma wiki, spinach, kale, cabbage, collard greens\n· Broccoli, Brussels sprouts\n\nIMPORTANT RULE:\nDo NOT avoid these foods completely — you need their nutrition.\n\nInstead:\n★ EAT CONSISTENT AMOUNTS each week — one to two portions daily is fine\n★ Do NOT suddenly change your vegetable intake\n★ Sudden changes cause INR to swing dangerously\n\nCheck INR regularly. Any diet, health, or medication change → check INR.`,
    },
  },

  {
    drugs: ['doxycycline','tetracycline','ciprofloxacin','norfloxacin','levofloxacin','ofloxacin'],
    triggers: ['milk','maziwa','dairy','calcium','antacid','gaviscon','maalox','iron','chuma','chakula','food','minerals'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF. Tanzania STG 2022.',
      text:`DOXYCYCLINE/CIPROFLOXACIN + MAZIWA/ANTACIDS — DAWA HAIFANYI KAZI VIZURI.\n\nDawa hizi zinashikamana na calcium, chuma, na magnesium, ikipunguza sana kiasi kinachoingia mwilini — hadi 50-90%.\n\nEPUKA ndani ya masaa 2 ya kuchukua dawa hizi:\n· Maziwa, mtindi, jibini (bidhaa za maziwa)\n· Antacids (Gaviscon, Maalox, Aluminium hydroxide)\n· Virutubisho vya chuma\n· Virutubisho vya calcium, zinc, na magnesium\n\nJINSI YA KUCHUKUA:\n· Doxycycline: Na maji mengi, saa 1 kabla au saa 2 baada ya chakula\n· Ciprofloxacin: Saa 1 kabla au saa 2 baada ya maziwa/antacids\n\nTumbo nyeti: Ciprofloxacin inaweza kuchukuliwa na chakula (si maziwa) kupunguza kichefuchefu.`,
      swahili:`DOXYCYCLINE/CIPROFLOXACIN + DAIRY/ANTACIDS — SEVERELY REDUCED ANTIBIOTIC ABSORPTION.\n\nThese antibiotics bind to calcium, iron, and magnesium, reducing absorption by 50-90%.\n\nAVOID within 2 hours:\n· Milk, yoghurt, cheese (dairy)\n· Antacids (Gaviscon, Maalox, Aluminium hydroxide)\n· Iron supplements\n· Calcium, zinc, magnesium supplements\n\nHOW TO TAKE:\n· Doxycycline: Full glass of water, 1 hour before or 2 hours after food\n· Ciprofloxacin: 1 hour before or 2 hours after dairy/antacids\n\nSensitive stomach: Ciprofloxacin can be taken with food (not dairy) to reduce nausea.`,
    },
  },

  {
    drugs: ['levothyroxine','thyroxine','eltroxin','thyroid','tezi damu','tezi'],
    triggers: ['food','chakula','milk','maziwa','calcium','iron','chuma','soya','coffee','kahawa','asubuhi','morning','breakfast','kifungua kinywa'],
    result: {
      level:'action', confidence:'high', source:'offline',
      disclaimer:'BNF.',
      text:`LEVOTHYROXINE — LAZIMA ICHUKULIWE TUMBO TUPU ASUBUHI.\n\nLevothyroxine inafyonzwa vibaya sana na chakula na dawa nyingine:\n\n★ Chukua KWANZA KABISA ASUBUHI, dakika 30-60 kabla ya kula au kunywa chochote isipokuwa maji ya kawaida.\n\nEPUKA ndani ya masaa 4 ya kuchukua Levothyroxine:\n· Maziwa na bidhaa zake\n· Virutubisho vya chuma\n· Virutubisho vya calcium\n· Antacids\n· Vyakula vya soya\n· Kahawa\n\nKwa nini: Vitu hivi vinashikamana na Levothyroxine kwenye utumbo na kuzuia kufyonzwa — ikifanya dawa isifanye kazi.\n\nIsiyodhibiliwa: Ongezeko la uzito, uchovu, baridi, msongo wa mawazo, kuvimbiwa.\nIliyozidi: Mapigo ya moyo ya haraka, kutetemeka, wasiwasi, kupoteza uzito.\n\nPima TSH kila miezi 6.`,
      swahili:`LEVOTHYROXINE — MUST BE TAKEN ON EMPTY STOMACH IN THE MORNING.\n\n★ Take FIRST THING in the morning, 30-60 minutes before eating or drinking anything except plain water.\n\nAVOID within 4 hours:\n· Milk and dairy products\n· Iron supplements\n· Calcium supplements\n· Antacids\n· Soya foods\n· Coffee\n\nWhy: These bind to levothyroxine in the gut and prevent absorption — making medication ineffective.\n\nPoorly controlled: Weight gain, fatigue, cold intolerance, depression, constipation.\nOver-treated: Palpitations, tremor, anxiety, weight loss.\n\nCheck TSH every 6 months.`,
    },
  },

];

// ─── Public matcher ───────────────────────────────────────────────────────────

export function matchInteraction(query: string): AIResult | null {
  const q = query.toLowerCase();
  for (const entry of INTERACTIONS) {
    const hasDrug    = entry.drugs.some(d => q.includes(d));
    const hasTrigger = entry.triggers.some(t => q.includes(t));
    if (hasDrug && hasTrigger) return entry.result;
  }
  return null;
}
