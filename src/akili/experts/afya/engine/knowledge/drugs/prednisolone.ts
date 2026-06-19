/**
 * Prednisolone — Drug Knowledge (Phase 9 asthma block, also widely used
 * in inflammatory and immune conditions across all phases)
 *
 * Sources: WHO PEN 2020, NTLG STG 2023, Muhimbili Protocols, BNF current,
 *          EMC current, IMCI 2024.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Prednisolone (or prednisone — the inactive form converted to
 *   prednisolone in the liver) is the workhorse oral steroid for asthma
 *   exacerbations and many inflammatory conditions. The key teaching is
 *   the safety contrast: a short course (5-7 days) at standard doses
 *   for an exacerbation is well tolerated and does NOT usually need
 *   tapering. Frequent or long courses, however, carry a serious burden
 *   of side effects (bone, glucose, mood, infection, weight, cataracts).
 *   The clinical goal is always to minimise oral steroid exposure by
 *   getting the inhaled controller right.
 *
 * Scope note:
 *   We educate on what prednisolone does, the short-course-vs-long-course
 *   distinction, side effects, when tapering matters, and key drug
 *   interactions. We do NOT prescribe doses — those are diagnosis-,
 *   weight-, and age-specific.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const PREDNISOLONE: DrugKnowledge = {
  id: 'prednisolone',
  aliases: DRUG_ALIASES.prednisolone,

  drugClass: {
    en: 'Oral corticosteroid (systemic glucocorticoid) — WHO Access category, used for moderate-to-severe inflammatory and immune conditions.',
    sw: 'Corticosteroid ya kumeza (systemic glucocorticoid) — kategoria ya WHO Access, inayotumika kwa hali za kati hadi kali za uvimbe na kinga.',
  },

  whatItDoes: {
    en: 'Prednisolone is a powerful anti-inflammatory and immune-suppressing medicine. In asthma, a short course (5-7 days) of oral prednisolone calms an exacerbation by turning down the airway inflammation at a level the inhaled steroid alone cannot reach quickly enough. It also works in many other conditions where overactive inflammation or immunity is causing harm — severe allergic reactions, autoimmune flares, certain skin conditions, some kidney and joint diseases. The benefits in an acute attack are huge: untreated severe exacerbations of asthma kill, and a few days of prednisolone reliably prevents that progression. The trade-off is that the same anti-inflammatory power, used long term or in repeated courses, takes a toll on the body in many ways — which is why "the shortest course of the lowest dose to control the disease" is the standard principle.',
    sw: 'Prednisolone ni dawa yenye nguvu ya kupinga uvimbe na kukandamiza kinga. Katika pumu, kozi fupi (siku 5-7) ya prednisolone ya kumeza hutuliza exacerbation kwa kupunguza uvimbe wa njia ya hewa katika kiwango ambacho steroid ya kuvuta pekee haiwezi kufikia haraka vya kutosha. Pia hufanya kazi katika hali nyingine nyingi ambapo uvimbe au kinga zinazofanya kazi kupita kiasi zinaleta madhara — athari kali za mzio, mwako wa autoimmune, hali fulani za ngozi, magonjwa fulani ya figo na viungo. Faida katika shambulizi la papo hapo ni kubwa: exacerbations kali za pumu zisizotibiwa huua, na siku chache za prednisolone huzuia kwa uhakika maendeleo hayo. Mbadala ni kwamba nguvu ile ile ya kupinga uvimbe, ikitumika muda mrefu au katika kozi za kurudia, huleta mzigo mwilini kwa njia nyingi — ndio sababu "kozi fupi zaidi ya dose ya chini zaidi kudhibiti ugonjwa" ni kanuni ya kawaida.',
    sw_mtaa: 'Prednisolone ni powerful anti-inflammatory na immune-suppressing medicine. Katika pumu, short course (5-7 days) ya oral prednisolone inacalm exacerbation kwa kuturn down airway inflammation katika level ambacho inhaled steroid alone haiwezi kufikia fast enough. Pia inafanya kazi katika many other conditions ambapo overactive inflammation au immunity inaleta harm — severe allergic reactions, autoimmune flares, certain skin conditions, some kidney na joint diseases. Benefits katika acute attack ni huge: untreated severe exacerbations ya asthma zinauwa, na few days za prednisolone reliably zinaprevent progression hiyo. Trade-off ni kwamba same anti-inflammatory power, used long term au katika repeated courses, inatake toll mwilini kwa njia nyingi — ndio sababu "shortest course ya lowest dose to control the disease" ni standard principle.',
  },

  commonUses: [
    {
      en: 'Acute asthma exacerbation — 40-50 mg daily for 5-7 days in adults; 1-2 mg/kg/day (max 40 mg) for 3-5 days in children. No taper needed for these short courses.',
      sw: 'Exacerbation ya pumu ya papo hapo — 40-50 mg kila siku kwa siku 5-7 kwa watu wazima; 1-2 mg/kg/siku (max 40 mg) kwa siku 3-5 kwa watoto. Hakuna taper inayohitajika kwa kozi hizi fupi.',
      sw_mtaa: 'Acute asthma exacerbation — 40-50 mg daily kwa siku 5-7 kwa adults; 1-2 mg/kg/day (max 40 mg) kwa siku 3-5 kwa watoto. Hakuna taper inahitajika kwa short courses hizi.',
    },
    {
      en: 'Severe allergic reactions, urticaria with angioedema (after adrenaline if anaphylaxis).',
      sw: 'Athari kali za mzio, urticaria na angioedema (baada ya adrenaline ikiwa anaphylaxis).',
      sw_mtaa: 'Severe allergic reactions, urticaria na angioedema (baada ya adrenaline ikiwa anaphylaxis).',
    },
    {
      en: 'Autoimmune and inflammatory conditions — rheumatoid arthritis flare, lupus, polymyalgia rheumatica, inflammatory bowel disease, certain skin diseases, nephrotic syndrome.',
      sw: 'Hali za autoimmune na za uvimbe — mwako wa rheumatoid arthritis, lupus, polymyalgia rheumatica, ugonjwa wa matumbo ya uvimbe, magonjwa fulani ya ngozi, nephrotic syndrome.',
      sw_mtaa: 'Autoimmune na inflammatory conditions — rheumatoid arthritis flare, lupus, polymyalgia rheumatica, inflammatory bowel disease, certain skin diseases, nephrotic syndrome.',
    },
    {
      en: 'Some opportunistic infections in advanced HIV — for example, moderate-to-severe PCP pneumonia uses prednisolone alongside the antibiotic. COPD exacerbations also use a short course.',
      sw: 'Baadhi ya maambukizi nyemelezi katika VVU ya hali ya juu — kwa mfano, nimonia ya PCP ya kati hadi kali hutumia prednisolone pamoja na antibiotic. Exacerbations za COPD pia hutumia kozi fupi.',
      sw_mtaa: 'Some opportunistic infections katika advanced HIV — kwa mfano, moderate-to-severe PCP pneumonia inatumia prednisolone alongside antibiotic. COPD exacerbations pia zinatumia short course.',
    },
  ],

  howItIsTaken: {
    en: 'By mouth, as tablets or oral suspension. Take in the morning with food — this matches the body\'s own natural cortisol rhythm and reduces stomach upset and insomnia. For a short course (5-7 days for an asthma exacerbation), take the full dose every day and STOP at the end of the course — no need to taper down. For courses longer than two weeks, the body slows its own cortisol production while on the medicine, and stopping suddenly can cause adrenal insufficiency — so the clinician will arrange a gradual taper. Never stop a long course of prednisolone abruptly without medical guidance. Carry a steroid card or note for any course longer than three weeks — paramedics and emergency staff need to know you are on it, especially in any acute illness or injury.',
    sw: 'Kwa mdomo, kama vidonge au suspension ya kumeza. Chukua asubuhi na chakula — hii inaambatana na mdundo wa asili wa cortisol wa mwili na hupunguza usumbufu wa tumbo na kukosa usingizi. Kwa kozi fupi (siku 5-7 kwa exacerbation ya pumu), chukua dose nzima kila siku na ACHA mwishoni mwa kozi — hakuna haja ya kushusha taper. Kwa kozi ndefu zaidi ya wiki mbili, mwili hupunguza uzalishaji wake mwenyewe wa cortisol wakati kwenye dawa, na kusimamisha ghafla kunaweza kusababisha kushindwa kwa adrenal — kwa hiyo daktari atapanga taper ya polepole. Kamwe usisimamishe kozi ndefu ya prednisolone ghafla bila mwongozo wa kitabibu. Beba kadi ya steroid au note kwa kozi yoyote ndefu zaidi ya wiki tatu — paramedics na wafanyakazi wa dharura wanahitaji kujua unaitumia, hasa katika ugonjwa wowote wa papo hapo au jeraha.',
    sw_mtaa: 'Kwa mdomo, kama tablets au oral suspension. Chukua morning na chakula — hii inamatch body\'s own natural cortisol rhythm na inapunguza stomach upset na insomnia. Kwa short course (5-7 days kwa asthma exacerbation), chukua full dose every day na STOP mwishoni mwa course — hakuna haja ya kutaper down. Kwa courses longer than two weeks, body inaslow its own cortisol production wakati kwa medicine, na stopping suddenly inaweza kusababisha adrenal insufficiency — kwa hiyo clinician atapanga gradual taper. Never stop long course ya prednisolone abruptly without medical guidance. Carry steroid card au note kwa course yoyote longer than weeks tatu — paramedics na emergency staff wanahitaji kujua unaitumia, especially katika acute illness yoyote au injury.',
  },

  commonSideEffects: [
    {
      en: 'Increased appetite, mild weight gain, fluid retention — most noticeable on long courses, minimal in 5-7 day asthma courses.',
      sw: 'Kuongezeka kwa hamu ya kula, kuongezeka uzito kidogo, kuhifadhi maji — kuonekana zaidi katika kozi ndefu, kidogo katika kozi za siku 5-7 za pumu.',
      sw_mtaa: 'Increased appetite, mild weight gain, fluid retention — most noticeable kwa long courses, minimal katika 5-7 day asthma courses.',
    },
    {
      en: 'Insomnia, sometimes hyperactivity or mood elevation — taking the dose in the morning helps a lot.',
      sw: 'Kukosa usingizi, wakati mwingine kupita kawaida au kupanda kwa hisia — kuchukua dose asubuhi husaidia sana.',
      sw_mtaa: 'Insomnia, wakati mwingine hyperactivity au mood elevation — kuchukua dose morning inasaidia sana.',
    },
    {
      en: 'Stomach upset, increased acidity — take with food; clinician may add stomach protection in high-risk patients (older, on aspirin or NSAID).',
      sw: 'Usumbufu wa tumbo, kuongezeka kwa asidi — chukua na chakula; daktari anaweza kuongeza ulinzi wa tumbo kwa wagonjwa wa hatari kubwa (wakubwa, kwa aspirin au NSAID).',
      sw_mtaa: 'Stomach upset, increased acidity — chukua na chakula; clinician anaweza kuongeza stomach protection kwa high-risk patients (older, on aspirin au NSAID).',
    },
    {
      en: 'Mild blood sugar rise — important to know if you have diabetes or pre-diabetes; sugar monitoring should continue and may need adjusted medication during the course.',
      sw: 'Kupanda kidogo kwa sukari ya damu — muhimu kujua ikiwa una kisukari au pre-diabetes; ufuatiliaji wa sukari unapaswa kuendelea na unaweza kuhitaji marekebisho ya dawa wakati wa kozi.',
      sw_mtaa: 'Mild blood sugar rise — muhimu kujua ikiwa una kisukari au pre-diabetes; sugar monitoring inapaswa kuendelea na inaweza kuhitaji adjusted medication during course.',
    },
    {
      en: 'Flushing, sweating, mild face puffiness — most prominent on longer courses (Cushingoid features at higher cumulative dose).',
      sw: 'Kuwaka, jasho, uvimbe mdogo wa uso — kuonekana zaidi katika kozi ndefu (sifa za Cushingoid katika dose ya juu zaidi ya jumla).',
      sw_mtaa: 'Flushing, sweating, mild face puffiness — most prominent katika longer courses (Cushingoid features katika higher cumulative dose).',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Severe blood sugar spike — particularly in known diabetics, can precipitate DKA in type 1 or severe hyperglycaemia in type 2. Monitor more closely during any steroid course.',
        sw: 'Kupanda kali kwa sukari ya damu — hasa kwa wagonjwa wanaojulikana wa kisukari, kunaweza kusababisha DKA katika aina 1 au hyperglycaemia kali katika aina 2. Fuatilia kwa karibu zaidi wakati wa kozi yoyote ya steroid.',
        sw_mtaa: 'Severe blood sugar spike — particularly kwa known diabetics, inaweza kuprecipitate DKA katika type 1 au severe hyperglycaemia katika type 2. Monitor more closely during steroid course yoyote.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'GI bleed — especially when combined with NSAIDs or aspirin, in elderly, or with prior peptic ulcer. Signs: black tarry stools, vomiting blood, severe abdominal pain.',
        sw: 'Kutokwa damu kwa GI — hasa pamoja na NSAIDs au aspirin, kwa wazee, au na peptic ulcer ya zamani. Ishara: kinyesi cheusi cha tar, kutapika damu, maumivu makali ya tumbo.',
        sw_mtaa: 'GI bleed — especially combined na NSAIDs au aspirin, kwa elderly, au na prior peptic ulcer. Signs: black tarry stools, vomiting blood, severe abdominal pain.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Reactivation of latent infection — TB, hepatitis B, strongyloides, herpes. Especially relevant on longer courses or in immunocompromised patients. Anyone with prior TB or significant exposure history should be assessed before a long course.',
        sw: 'Kuamsha kwa maambukizi yaliyofichika — TB, hepatitis B, strongyloides, herpes. Muhimu hasa katika kozi ndefu au kwa wagonjwa wenye kinga iliyoshuka. Yeyote mwenye TB ya zamani au historia muhimu ya mfichuo anapaswa kuchunguzwa kabla ya kozi ndefu.',
        sw_mtaa: 'Reactivation ya latent infection — TB, hepatitis B, strongyloides, herpes. Especially relevant katika longer courses au kwa immunocompromised patients. Yeyote mwenye prior TB au significant exposure history anapaswa kuassessed kabla ya long course.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Adrenal insufficiency on abrupt withdrawal of a long course — fatigue, low blood pressure, low blood sugar, nausea, can be life-threatening if combined with acute illness. Long courses ALWAYS require a planned taper.',
        sw: 'Kushindwa kwa adrenal kwa kuondolewa kwa ghafla kwa kozi ndefu — uchovu, shinikizo la chini la damu, sukari ya chini ya damu, kichefuchefu, inaweza kutishia maisha ikiunganishwa na ugonjwa wa papo hapo. Kozi ndefu DAIMA zinahitaji taper iliyopangwa.',
        sw_mtaa: 'Adrenal insufficiency on abrupt withdrawal ya long course — fatigue, low BP, low blood sugar, nausea, inaweza kuwa life-threatening ikiwa combined na acute illness. Long courses ALWAYS zinarequire planned taper.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe mood disturbance, psychosis — uncommon but recognised, more in higher doses; family and clinician should know to watch for marked mood change, insomnia, agitation, paranoia.',
        sw: 'Usumbufu mkali wa hisia, psychosis — sio kawaida lakini inatambulika, zaidi katika dose za juu; familia na daktari wanapaswa kujua kuangalia mabadiliko makubwa ya hisia, kukosa usingizi, kukasirika, paranoia.',
        sw_mtaa: 'Severe mood disturbance, psychosis — uncommon lakini recognised, more katika higher doses; family na clinician wanapaswa kujua kuangalia marked mood change, insomnia, agitation, paranoia.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'On long courses only — osteoporosis (bone thinning) with fracture risk, cataracts, glaucoma, skin thinning and easy bruising, proximal muscle weakness, growth suppression in children. Reasons to step up bone protection (calcium, vitamin D, sometimes bisphosphonate) and routine eye review.',
        sw: 'Katika kozi ndefu pekee — osteoporosis (kuwa nyembamba kwa mfupa) na hatari ya kuvunjika, cataracts, glaucoma, ngozi kuwa nyembamba na kupata michubuko kwa urahisi, udhaifu wa misuli wa karibu, kukandamizwa kwa ukuaji kwa watoto. Sababu za kuongeza ulinzi wa mfupa (kalsiamu, vitamin D, wakati mwingine bisphosphonate) na mapitio ya kawaida ya macho.',
        sw_mtaa: 'Katika long courses pekee — osteoporosis (bone thinning) na fracture risk, cataracts, glaucoma, skin thinning na easy bruising, proximal muscle weakness, growth suppression kwa watoto. Reasons za kustep up bone protection (calcium, vitamin D, sometimes bisphosphonate) na routine eye review.',
      },
      urgency: 'routine' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'nsaid',
      withDisplay: { en: 'NSAIDs (ibuprofen, diclofenac, naproxen) and aspirin', sw: 'NSAIDs (ibuprofen, diclofenac, naproxen) na aspirin' },
      severity: 'caution',
      explanation: {
        en: 'Combining oral steroid with NSAIDs or aspirin substantially raises the risk of stomach ulcer and GI bleed. If both are needed, the clinician adds a proton pump inhibitor (omeprazole, pantoprazole) for stomach protection. Paracetamol is a safer alternative for pain in patients on steroid.',
        sw: 'Kuunganisha steroid ya kumeza na NSAIDs au aspirin huongeza sana hatari ya kidonda cha tumbo na kutokwa damu kwa GI. Ikiwa vyote vinahitajika, daktari huongeza proton pump inhibitor (omeprazole, pantoprazole) kwa ulinzi wa tumbo. Paracetamol ni mbadala salama kwa maumivu kwa wagonjwa kwenye steroid.',
        sw_mtaa: 'Combining oral steroid na NSAIDs au aspirin inainua substantially risk ya stomach ulcer na GI bleed. Ikiwa both zinahitajika, clinician anaongeza proton pump inhibitor (omeprazole, pantoprazole) kwa stomach protection. Paracetamol ni safer alternative kwa pain kwa wagonjwa kwa steroid.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'rhze',
      withDisplay: { en: 'rifampicin (part of TB treatment)', sw: 'rifampicin (sehemu ya matibabu ya TB)' },
      severity: 'caution',
      explanation: {
        en: 'Rifampicin speeds up the breakdown of prednisolone in the liver — meaning the steroid dose needs to be increased to achieve the same effect. Important in patients on TB treatment who develop a condition needing oral steroid. Clinician will adjust.',
        sw: 'Rifampicin huharakisha kuvunjwa kwa prednisolone kwenye ini — kumaanisha dose ya steroid inahitaji kuongezeka kufanikisha athari ile ile. Muhimu kwa wagonjwa wa matibabu ya TB wanaopata hali inayohitaji steroid ya kumeza. Daktari atarekebisha.',
        sw_mtaa: 'Rifampicin inaspeed up breakdown ya prednisolone kwenye liver — meaning steroid dose inahitaji kuongezwa kufanikisha same effect. Muhimu kwa wagonjwa kwa TB treatment wanaopata condition inayohitaji oral steroid. Clinician atarekebisha.',
      },
      sources: [src('BNF_CURRENT'), src('NTLP_TB_2024')],
    },
    {
      with: 'live_vaccine',
      withDisplay: { en: 'live vaccines (yellow fever, BCG, oral polio, MMR, varicella)', sw: 'chanjo za viumbe hai (yellow fever, BCG, oral polio, MMR, varicella)' },
      severity: 'avoid',
      explanation: {
        en: 'Avoid live vaccines during high-dose or long-term oral steroid courses — the suppressed immune system can fail to control even the weakened vaccine virus. Discuss vaccine timing with the clinician; non-live vaccines (flu, hepatitis B, COVID, tetanus, pneumococcal) are generally fine.',
        sw: 'Epuka chanjo za viumbe hai wakati wa kozi za dose ya juu au za muda mrefu za steroid ya kumeza — mfumo wa kinga uliokandamizwa unaweza kushindwa kudhibiti hata virusi cha chanjo kilichodhoofishwa. Jadili wakati wa chanjo na daktari; chanjo zisizo hai (flu, hepatitis B, COVID, tetanus, pneumococcal) kwa ujumla ni sawa.',
        sw_mtaa: 'Avoid live vaccines during high-dose au long-term oral steroid courses — suppressed immune system inaweza kushindwa kudhibiti hata weakened vaccine virus. Discuss vaccine timing na clinician; non-live vaccines (flu, hepatitis B, COVID, tetanus, pneumococcal) ni generally fine.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'warfarin',
      withDisplay: { en: 'warfarin', sw: 'warfarin' },
      severity: 'caution',
      explanation: {
        en: 'Steroids can affect warfarin response and raise the risk of bleeding. Patients on warfarin need INR monitored more closely during and after a steroid course.',
        sw: 'Steroids zinaweza kuathiri jibu la warfarin na kuongeza hatari ya kutokwa damu. Wagonjwa kwa warfarin wanahitaji INR ifuatiliwe kwa karibu zaidi wakati na baada ya kozi ya steroid.',
        sw_mtaa: 'Steroids zinaweza kuaffect warfarin response na kuinua risk ya bleeding. Wagonjwa kwa warfarin wanahitaji INR kumonitored more closely during na baada ya steroid course.',
      },
      sources: [src('BNF_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Short course vs long course — they are different conversations', sw: 'Kozi fupi dhidi ya kozi ndefu — ni mazungumzo tofauti' },
      note: {
        en: 'A 5-7 day course for an asthma exacerbation is very different from a months-long course. The short course rarely needs tapering, has minimal long-term effect, and saves lives in severe attacks — the worry should be NOT taking it, not taking it. The long course (months to years) needs a different conversation about bone protection, eye checks, sugar monitoring, and a slow taper. Always confirm with the clinician which kind of course is being prescribed.',
        sw: 'Kozi ya siku 5-7 kwa exacerbation ya pumu ni tofauti sana na kozi ya miezi. Kozi fupi mara chache inahitaji taper, ina athari ndogo ya muda mrefu, na huokoa maisha katika mashambulizi makali — wasiwasi unapaswa kuwa wa KUTOICHUKUA, sio kuichukua. Kozi ndefu (miezi hadi miaka) inahitaji mazungumzo tofauti kuhusu ulinzi wa mfupa, ukaguzi wa macho, ufuatiliaji wa sukari, na taper ya polepole. Daima thibitisha na daktari ni aina gani ya kozi inayoandikwa.',
        sw_mtaa: 'Kozi ya 5-7 days kwa asthma exacerbation ni very different na months-long course. Short course rarely inahitaji tapering, ina minimal long-term effect, na inasave maisha katika severe attacks — worry inapaswa kuwa NOT kuichukua, sio kuichukua. Long course (months to years) inahitaji different conversation kuhusu bone protection, eye checks, sugar monitoring, na slow taper. Always confirm na clinician ni aina gani ya course inayoprescribed.',
      },
    },
    {
      topic: { en: 'Take in the morning, with food', sw: 'Chukua asubuhi, na chakula' },
      note: {
        en: 'The body releases its own cortisol in the morning, and timing prednisolone to match this rhythm reduces side effects on sleep, mood, and adrenal feedback. Taking with food (breakfast) reduces stomach upset. Take the same time each morning.',
        sw: 'Mwili hutoa cortisol yake mwenyewe asubuhi, na kupanga prednisolone kuendana na mdundo huu hupunguza athari kwa usingizi, hisia, na maoni ya adrenal. Kuchukua na chakula (kifungua kinywa) hupunguza usumbufu wa tumbo. Chukua wakati ule ule kila asubuhi.',
        sw_mtaa: 'Body inarelease cortisol yake yenyewe morning, na timing prednisolone to match rhythm hii inapunguza side effects kwa sleep, mood, na adrenal feedback. Kuchukua na food (breakfast) inapunguza stomach upset. Chukua same time kila morning.',
      },
    },
    {
      topic: { en: 'Diabetes monitoring during the course', sw: 'Ufuatiliaji wa kisukari wakati wa kozi' },
      note: {
        en: 'Even a 5-7 day course raises blood sugar to some degree — usually not a problem in someone without diabetes, but in known diabetics, sugars need closer monitoring during and after the course. Anti-diabetic medication may need temporary adjustment. Inform the clinician handling your diabetes if a steroid course is prescribed for any reason.',
        sw: 'Hata kozi ya siku 5-7 huinua sukari ya damu kwa kiwango fulani — kawaida sio tatizo kwa mtu asiye na kisukari, lakini kwa wagonjwa wa kisukari wanaojulikana, sukari zinahitaji ufuatiliaji wa karibu zaidi wakati na baada ya kozi. Dawa ya anti-diabetic inaweza kuhitaji marekebisho ya muda. Mjulishe daktari anayeshughulikia kisukari chako ikiwa kozi ya steroid inaagizwa kwa sababu yoyote.',
        sw_mtaa: 'Hata 5-7 day course inainua blood sugar to some degree — kawaida sio problem kwa someone without diabetes, lakini kwa known diabetics, sugars zinahitaji closer monitoring during na baada ya course. Anti-diabetic medication inaweza kuhitaji temporary adjustment. Inform clinician anayehandle diabetes yako ikiwa steroid course inaprescribed kwa reason yoyote.',
      },
    },
    {
      topic: { en: 'Pregnancy and breastfeeding', sw: 'Mimba na kunyonyesha' },
      note: {
        en: 'Short-course prednisolone in pregnancy is considered acceptable when needed — the placenta inactivates most of it before it reaches the baby, and the risk of an untreated severe asthma exacerbation to mother and baby is far greater. Breastfeeding is also compatible with standard doses; very little crosses into milk. Decisions about long-term high-dose use should be individualised with the clinician.',
        sw: 'Prednisolone ya kozi fupi katika mimba inachukuliwa kuwa inakubalika inapohitajika — placenta huzima sehemu kubwa kabla ya kufikia mtoto, na hatari ya exacerbation kali isiyotibiwa ya pumu kwa mama na mtoto ni kubwa zaidi. Kunyonyesha pia ni sambamba na dose za kawaida; kidogo sana huvuka kwenye maziwa. Maamuzi kuhusu matumizi ya dose ya juu ya muda mrefu yanapaswa kuwa ya kibinafsi na daktari.',
        sw_mtaa: 'Short-course prednisolone katika pregnancy inachukuliwa acceptable inapohitajika — placenta inainactivate most yake kabla ya kufikia baby, na risk ya untreated severe asthma exacerbation kwa mother na baby ni far greater. Breastfeeding pia ni compatible na standard doses; very little inavuka kwenye milk. Decisions kuhusu long-term high-dose use zinapaswa kuwa individualised na clinician.',
      },
    },
    {
      topic: { en: 'Steroid card / sick-day rules', sw: 'Kadi ya steroid / kanuni za siku ya ugonjwa' },
      note: {
        en: 'For courses longer than 3 weeks, or for anyone on long-term steroid (any dose), carry a steroid card or note. In any acute illness, surgery, or major injury, the body needs MORE cortisol than usual; on long-term steroid, the body cannot make extra on its own, so the clinician may temporarily double the dose ("sick-day rules") or give IV hydrocortisone. Stopping suddenly during an acute illness can cause adrenal crisis — a life-threatening drop in blood pressure with hypoglycaemia. Always tell any treating doctor that you are on steroid.',
        sw: 'Kwa kozi ndefu zaidi ya wiki 3, au kwa yeyote kwa steroid ya muda mrefu (dose yoyote), beba kadi ya steroid au note. Katika ugonjwa wowote wa papo hapo, upasuaji, au jeraha kubwa, mwili unahitaji cortisol ZAIDI ya kawaida; kwa steroid ya muda mrefu, mwili hauwezi kutengeneza ziada peke yake, kwa hiyo daktari anaweza kuongeza dose mara mbili kwa muda ("kanuni za siku ya ugonjwa") au kutoa hydrocortisone ya IV. Kusimamisha ghafla wakati wa ugonjwa wa papo hapo kunaweza kusababisha adrenal crisis — kushuka kwa shinikizo la damu kunakotishia maisha na hypoglycaemia. Daima mwambie daktari yeyote anayekutibu kwamba unaitumia steroid.',
        sw_mtaa: 'Kwa courses longer than weeks 3, au kwa yeyote kwa long-term steroid (dose yoyote), carry steroid card au note. Katika acute illness yoyote, surgery, au major injury, body inahitaji MORE cortisol kuliko usual; kwa long-term steroid, body haiwezi kumake extra peke yake, kwa hiyo clinician anaweza temporarily kudouble dose ("sick-day rules") au kutoa IV hydrocortisone. Stopping suddenly during acute illness inaweza kusababisha adrenal crisis — life-threatening drop katika BP na hypoglycaemia. Always mwambie treating doctor yoyote kwamba unaitumia steroid.',
      },
    },
  ],

  sources: [
    src('WHO_PEN_2020'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('IMCI_2024'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
