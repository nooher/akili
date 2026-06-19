/**
 * Amoxicillin — Drug Knowledge (Phase 8 pneumonia block)
 *
 * Sources: WHO AWaRe 2023 (Access category), WHO Pneumonia 2022, IMCI 2024,
 *          NTLG STG 2023, Muhimbili Protocols, BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Amoxicillin is the WHO Access-category workhorse for outpatient
 *   pneumonia in Tanzania — high-dose oral amoxicillin is first-line for
 *   adult community-acquired pneumonia, and amoxicillin dispersible
 *   tablets are first-line for IMCI pneumonia in children. It is also
 *   used in ENT infections, UTIs, dental infections, and as part of
 *   H. pylori eradication. Co-amoxiclav (amoxicillin + clavulanate)
 *   extends the spectrum to beta-lactamase-producing organisms.
 *
 * Scope note:
 *   We educate on what amoxicillin does, when it is used, the importance
 *   of completing the full course (antibiotic stewardship), what to expect
 *   in side effects, and what allergic reaction looks like. We do NOT
 *   prescribe doses — those are weight/age-based and clinician territory.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const AMOXICILLIN: DrugKnowledge = {
  id: 'amoxicillin',
  aliases: DRUG_ALIASES.amoxicillin,

  drugClass: {
    en: 'Penicillin-family antibiotic (broad-spectrum beta-lactam) — WHO Access category, the everyday first-line for many common infections',
    sw: 'Antibiotic ya familia ya penicillin (beta-lactam ya wigo mpana) — kategoria ya Access ya WHO, first-line ya kawaida kwa maambukizi mengi',
  },

  whatItDoes: {
    en: 'Amoxicillin kills bacteria by breaking the cell wall they need to survive — the wall splits, water rushes in, and the bacterial cell bursts. It is most effective against streptococci (the most common cause of community-acquired pneumonia, ear infections, and many throat infections), some staphylococci, and a range of other common bacteria. It does NOT work against viruses (so it does nothing for a common cold or flu), and it does NOT work well against some "atypical" pneumonia organisms (Mycoplasma, Chlamydia) — that is why the clinician sometimes chooses a different antibiotic. Adding clavulanic acid (making "co-amoxiclav" or Augmentin) widens the spectrum to cover bacteria that produce beta-lactamase enzymes.',
    sw: 'Amoxicillin huua bakteria kwa kuvunja ukuta wa seli wanaohitaji kuishi — ukuta hupasuka, maji hujaa ndani, na seli ya bakteria hupasuka. Inafanya kazi vizuri zaidi dhidi ya streptococci (sababu ya kawaida zaidi ya nimonia ya jamii, maambukizi ya sikio, na maambukizi mengi ya koo), baadhi ya staphylococci, na anuwai ya bakteria wengine wa kawaida. HAIFANYI kazi dhidi ya virusi (hivyo haifanyi chochote kwa mafua ya kawaida au influenza), na HAIFANYI vizuri dhidi ya baadhi ya viumbe vya "atypical" vya nimonia (Mycoplasma, Chlamydia) — ndio sababu daktari wakati mwingine huchagua antibiotic tofauti. Kuongeza clavulanic acid (kufanya "co-amoxiclav" au Augmentin) hupanua wigo kufunika bakteria wanaozalisha enzymes za beta-lactamase.',
    sw_mtaa: 'Amoxicillin inauwa bakteria kwa kuvunja cell wall wanaohitaji kuishi — wall inapasuka, maji yanajaa ndani, na bacterial cell inapasuka. Inafanya kazi vizuri zaidi dhidi ya streptococci (most common cause ya CAP, ear infections, na throat infections nyingi), baadhi ya staphylococci, na range ya other common bacteria. HAIFANYI kazi dhidi ya viruses (hivyo haifanyi chochote kwa common cold au flu), na HAIFANYI vizuri dhidi ya baadhi ya "atypical" pneumonia organisms (Mycoplasma, Chlamydia) — ndio sababu clinician wakati mwingine anachagua different antibiotic. Kuongeza clavulanic acid (kufanya "co-amoxiclav" au Augmentin) inapanua spectrum kufunika bakteria wanaozalisha beta-lactamase enzymes.',
  },

  commonUses: [
    {
      en: 'Community-acquired pneumonia in adults — high-dose oral amoxicillin for 5 days is the WHO Access first-line in outpatient CAP.',
      sw: 'Nimonia ya jamii kwa watu wazima — amoxicillin ya kumeza ya dose ya juu kwa siku 5 ni WHO Access first-line katika CAP ya nje.',
      sw_mtaa: 'CAP kwa watu wazima — high-dose oral amoxicillin kwa siku 5 ni WHO Access first-line katika outpatient CAP.',
    },
    {
      en: 'Pneumonia in children (IMCI) — amoxicillin dispersible tablets for 5 days is the first-line for non-severe pneumonia in children 2-59 months.',
      sw: 'Nimonia kwa watoto (IMCI) — amoxicillin dispersible tablets kwa siku 5 ni first-line kwa nimonia isiyo kali kwa watoto miezi 2-59.',
      sw_mtaa: 'Pneumonia kwa watoto (IMCI) — amoxicillin dispersible tablets kwa siku 5 ni first-line kwa non-severe pneumonia kwa watoto miezi 2-59.',
    },
    {
      en: 'Ear infections (otitis media) and throat infections (streptococcal pharyngitis), especially in children.',
      sw: 'Maambukizi ya sikio (otitis media) na maambukizi ya koo (streptococcal pharyngitis), hasa kwa watoto.',
      sw_mtaa: 'Ear infections (otitis media) na throat infections (streptococcal pharyngitis), hasa kwa watoto.',
    },
    {
      en: 'Dental infections, urinary tract infections in selected cases, and as part of H. pylori eradication for peptic ulcer disease.',
      sw: 'Maambukizi ya meno, maambukizi ya njia ya mkojo katika kesi zilizochaguliwa, na kama sehemu ya kuondoa H. pylori kwa peptic ulcer disease.',
      sw_mtaa: 'Dental infections, UTIs katika selected cases, na kama sehemu ya H. pylori eradication kwa peptic ulcer disease.',
    },
  ],

  howItIsTaken: {
    en: 'Amoxicillin is usually taken by mouth, two or three times a day depending on the dose and indication — your prescriber will tell you the exact timing. It can be taken with or without food, though taking it with a small snack reduces stomach upset. For children, dispersible tablets that dissolve in a small amount of clean water are easier than swallowing whole tablets — and the dose is calculated by weight, not age. Take every dose, at roughly the same times each day. Complete the full course even when you start to feel better — usually by day 2-3 of antibiotics. Stopping early is one of the biggest drivers of antibiotic resistance and of relapses. If you accidentally miss a dose, take it as soon as you remember unless it is nearly time for the next one; never double up.',
    sw: 'Amoxicillin kawaida huchukuliwa kwa mdomo, mara mbili au tatu kwa siku kulingana na dose na dalili — mwandishi wako atakwambia muda halisi. Inaweza kuchukuliwa na chakula au bila, ingawa kuichukua na vitafunwa vidogo hupunguza usumbufu wa tumbo. Kwa watoto, dispersible tablets zinazoyeyuka katika kiasi kidogo cha maji safi ni rahisi zaidi kuliko kumeza vidonge vizima — na dose huhesabiwa kwa uzito, sio umri. Tumia kila dose, kwa nyakati zile zile takribani kila siku. Kamilisha kozi yote hata unapojihisi vizuri zaidi — kawaida kufikia siku ya 2-3 ya antibiotic. Kusimamisha mapema ni mojawapo ya viendeshi vikubwa zaidi vya upinzani wa antibiotic na kurudia. Ikiwa unakosa dose kwa bahati mbaya, ichukue mara unapokumbuka isipokuwa muda wa dose inayofuata umekaribia; kamwe usichukue mbili.',
    sw_mtaa: 'Amoxicillin kawaida inachukuliwa kwa mdomo, mara mbili au tatu kwa siku kulingana na dose na indication — prescriber wako atakwambia exact timing. Inaweza kuchukuliwa na chakula au bila, ingawa kuichukua na small snack inapunguza stomach upset. Kwa watoto, dispersible tablets zinazoyeyuka katika kiasi kidogo cha maji safi ni rahisi zaidi kuliko kumeza vidonge vizima — na dose inahesabiwa kwa uzito, sio umri. Tumia kila dose, kwa nyakati zile zile roughly kila siku. Complete full course hata unapostart kujihisi vizuri — kawaida by day 2-3 ya antibiotics. Kusimamisha mapema ni mojawapo ya biggest drivers ya antibiotic resistance na ya relapses. Ikiwa unakosa dose kwa bahati mbaya, ichukue mara unapokumbuka isipokuwa muda wa next dose umekaribia; kamwe usichukue mbili.',
  },

  commonSideEffects: [
    {
      en: 'Mild nausea, mild stomach upset, or soft stools — common and usually settles; taking with food helps.',
      sw: 'Kichefuchefu kidogo, usumbufu mdogo wa tumbo, au kinyesi laini — ya kawaida na kawaida hutulia; kuichukua na chakula husaidia.',
      sw_mtaa: 'Mild nausea, mild stomach upset, au soft stools — common na kawaida inatulia; kuichukua na chakula inasaidia.',
    },
    {
      en: 'Mild skin rash that appears late in the course — sometimes a reaction to the medicine, sometimes part of the infection itself; mention it at follow-up so the team can decide.',
      sw: 'Vipele vya ngozi vidogo vinavyojitokeza mwishoni mwa kozi — wakati mwingine ni athari ya dawa, wakati mwingine ni sehemu ya maambukizi yenyewe; itaje katika kufuatilia ili timu iweze kuamua.',
      sw_mtaa: 'Mild skin rash inayojitokeza late katika kozi — wakati mwingine ni reaction ya dawa, wakati mwingine ni sehemu ya infection yenyewe; mention katika follow-up ili team iweze kuamua.',
    },
    {
      en: 'Mild diarrhoea from disruption of gut bacteria — usually mild and resolves; drink fluids; tell the team if severe or with blood.',
      sw: 'Kuharisha kidogo kutoka kwa usumbufu wa bakteria za utumbo — kawaida ndogo na hupotea; kunywa kioevu; mwambie timu ikiwa kali au na damu.',
      sw_mtaa: 'Mild diarrhoea kutoka disruption ya gut bacteria — kawaida mild na inapotea; kunywa fluids; mwambie team ikiwa severe au na damu.',
    },
    {
      en: 'Vaginal thrush in women (gut flora disruption letting Candida grow) — antifungal cream or pessary settles it; tell the prescriber for next time.',
      sw: 'Vaginal thrush kwa wanawake (usumbufu wa flora ya tumbo unaoruhusu Candida kukua) — krimu ya antifungal au pessary huitatua; mwambie mwandishi kwa wakati ujao.',
      sw_mtaa: 'Vaginal thrush kwa wanawake (gut flora disruption inayoruhusu Candida kukua) — antifungal cream au pessary inatatua; mwambie prescriber kwa next time.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Sudden generalised hives, swelling of the face/lips/tongue, wheeze, difficulty breathing, or collapse — anaphylaxis to penicillin. EMERGENCY: stop the medicine, get to a facility immediately, do not take any penicillin-family antibiotic again',
        sw: 'Vipele vya jumla vya ghafla, uvimbe wa uso/midomo/ulimi, mfululizo wa pumzi, ugumu wa kupumua, au kuanguka — anaphylaxis ya penicillin. DHARURA: simamisha dawa, fika kituoni mara moja, usichukue antibiotic yoyote ya familia ya penicillin tena',
        sw_mtaa: 'Sudden generalised hives, swelling ya uso/midomo/ulimi, wheeze, difficulty breathing, au collapse — anaphylaxis ya penicillin. DHARURA: simamisha dawa, fika kituoni mara moja, usichukue penicillin-family antibiotic yoyote tena',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe skin rash with blistering, peeling, or sores in the mouth or eyes (Stevens-Johnson syndrome) — EMERGENCY: stop the medicine, go in immediately',
        sw: 'Vipele vikali vya ngozi na malenge, kutoka, au vidonda mdomoni au machoni (Stevens-Johnson syndrome) — DHARURA: simamisha dawa, ingia mara moja',
        sw_mtaa: 'Severe skin rash na blistering, peeling, au sores kinywani au machoni (Stevens-Johnson syndrome) — DHARURA: simamisha dawa, ingia mara moja',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe watery diarrhoea, sometimes with blood, fever, and abdominal pain — possible C. difficile colitis (severe antibiotic-associated diarrhoea). URGENT: needs assessment and a different treatment',
        sw: 'Kuharisha kali kwa maji, wakati mwingine na damu, homa, na maumivu ya tumbo — uwezekano wa C. difficile colitis (kuharisha kali kunakohusishwa na antibiotic). HARAKA: inahitaji tathmini na matibabu tofauti',
        sw_mtaa: 'Severe watery diarrhoea, wakati mwingine na damu, fever, na abdominal pain — uwezekano wa C. difficile colitis (severe antibiotic-associated diarrhoea). URGENT: inahitaji assessment na different treatment',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellowing of skin or eyes, dark urine, severe right-upper belly pain — possible drug-induced liver injury (rare). URGENT: stop the medicine, blood tests needed',
        sw: 'Kuwa manjano kwa ngozi au macho, mkojo wa rangi nyeusi, maumivu makali ya tumbo la juu upande wa kulia — uwezekano wa uharibifu wa ini unaosababishwa na dawa (nadra). HARAKA: simamisha dawa, vipimo vya damu vinahitajika',
        sw_mtaa: 'Yellowing ya ngozi au macho, dark urine, severe right-upper belly pain — uwezekano wa drug-induced liver injury (rare). URGENT: simamisha dawa, blood tests zinahitajika',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'methotrexate',
      withDisplay: { en: 'methotrexate', sw: 'methotrexate' },
      severity: 'caution',
      explanation: {
        en: 'Amoxicillin can reduce kidney clearance of methotrexate (used in some cancers and autoimmune conditions), raising methotrexate toxicity — the prescriber needs to know about both medicines.',
        sw: 'Amoxicillin inaweza kupunguza utokaji wa figo wa methotrexate (inayotumika katika baadhi ya saratani na hali za autoimmune), kuongeza sumu ya methotrexate — mwandishi anahitaji kujua kuhusu dawa zote mbili.',
        sw_mtaa: 'Amoxicillin inaweza kupunguza kidney clearance ya methotrexate (inayotumika katika baadhi ya cancers na autoimmune conditions), kuongeza methotrexate toxicity — prescriber anahitaji kujua kuhusu dawa zote mbili.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'warfarin',
      withDisplay: { en: 'warfarin (blood thinner)', sw: 'warfarin (dawa ya kupunguza damu)' },
      severity: 'caution',
      explanation: {
        en: 'Amoxicillin can mildly increase the effect of warfarin in some people, raising bleeding risk — the INR may need extra monitoring during the course.',
        sw: 'Amoxicillin inaweza kuongeza athari ya warfarin kidogo kwa baadhi ya watu, kuongeza hatari ya kutoka damu — INR inaweza kuhitaji ufuatiliaji wa ziada wakati wa kozi.',
        sw_mtaa: 'Amoxicillin inaweza kuongeza athari ya warfarin kidogo kwa baadhi ya watu, kuongeza bleeding risk — INR inaweza kuhitaji extra monitoring wakati wa kozi.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'oral_contraceptives',
      withDisplay: { en: 'oral contraceptive pill', sw: 'kidonge cha uzazi wa mpango' },
      severity: 'note',
      explanation: {
        en: 'Although the older teaching was that antibiotics weaken the contraceptive pill, the current evidence is that amoxicillin does NOT meaningfully reduce its effectiveness for most women. If a woman has diarrhoea or vomiting from the antibiotic, that — not the antibiotic itself — can reduce pill absorption and back-up contraception is sensible until 7 days after symptoms settle.',
        sw: 'Ingawa mafundisho ya zamani yalikuwa kwamba antibiotic hudhoofisha kidonge cha uzazi wa mpango, ushahidi wa sasa ni kwamba amoxicillin HAIPUNGUZI kwa maana ufanisi wake kwa wanawake wengi. Ikiwa mwanamke ana kuharisha au kutapika kutoka kwa antibiotic, hilo — sio antibiotic yenyewe — linaweza kupunguza ufyonzaji wa kidonge na back-up contraception ni busara hadi siku 7 baada ya dalili kutulia.',
        sw_mtaa: 'Ingawa older teaching ilikuwa kwamba antibiotics zinadhoofisha contraceptive pill, current evidence ni kwamba amoxicillin HAIPUNGUZI meaningfully effectiveness yake kwa most women. Ikiwa mwanamke ana diarrhoea au kutapika kutoka kwa antibiotic, hilo — sio antibiotic yenyewe — linaweza kupunguza pill absorption na back-up contraception ni sensible hadi siku 7 baada ya symptoms kutulia.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'allopurinol',
      withDisplay: { en: 'allopurinol', sw: 'allopurinol' },
      severity: 'caution',
      explanation: {
        en: 'Taking amoxicillin and allopurinol together raises the chance of getting a skin rash; not a contraindication, just a higher-risk combination to flag.',
        sw: 'Kuchukua amoxicillin na allopurinol pamoja huongeza nafasi ya kupata vipele vya ngozi; sio kupingana, ni mchanganyiko wa hatari kubwa zaidi tu kutaja.',
        sw_mtaa: 'Kuchukua amoxicillin na allopurinol pamoja inaongeza chance ya kupata skin rash; sio contraindication, ni higher-risk combination tu kutaja.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Finish the course', sw: 'Maliza kozi' },
      note: {
        en: 'Feeling better by day 2-3 is exactly what should happen — but the infection is not fully cleared yet. Stopping early lets the toughest bacteria survive and breed resistance. Standard outpatient pneumonia courses are 5 days; complete every dose.',
        sw: 'Kujisikia vizuri kufikia siku ya 2-3 ni jinsi inavyopaswa kutokea — lakini maambukizi hayajaondolewa kabisa bado. Kusimamisha mapema huruhusu bakteria ngumu zaidi kuishi na kuzaa upinzani. Kozi za kawaida za nimonia ya nje ni siku 5; kamilisha kila dose.',
        sw_mtaa: 'Kujisikia vizuri by day 2-3 ni exactly inavyopaswa kutokea — lakini infection haijaclear kabisa bado. Kusimamisha mapema inaruhusu toughest bacteria kuishi na kuzaa resistance. Standard outpatient pneumonia courses ni siku 5; complete kila dose.',
      },
    },
    {
      topic: { en: 'Penicillin allergy history', sw: 'Historia ya mzio wa penicillin' },
      note: {
        en: 'Always tell the prescriber if you or your child has ever had a reaction to penicillin, amoxicillin, ampicillin, or co-amoxiclav — especially hives, swelling, or breathing trouble. Many people who think they are penicillin-allergic actually are not (childhood rashes during illness get mislabelled), and a clinician can sometimes test or "delabel" carefully — but never assume.',
        sw: 'Daima mwambie mwandishi ikiwa wewe au mtoto wako amewahi kupata athari kwa penicillin, amoxicillin, ampicillin, au co-amoxiclav — hasa vipele, uvimbe, au tatizo la kupumua. Watu wengi wanaofikiri wana mzio wa penicillin kwa kweli hawana (vipele vya utotoni wakati wa ugonjwa hupewa lebo mbaya), na daktari wakati mwingine anaweza kupima au "kuondoa lebo" kwa makini — lakini kamwe usidhani.',
        sw_mtaa: 'Daima mwambie prescriber ikiwa wewe au mtoto wako amewahi kupata reaction kwa penicillin, amoxicillin, ampicillin, au co-amoxiclav — hasa hives, swelling, au breathing trouble. Watu wengi wanaofikiri wana penicillin allergy kwa kweli hawana (childhood rashes wakati wa illness zinapewa mislabelled), na clinician wakati mwingine anaweza ku-test au "delabel" carefully — lakini kamwe usidhani.',
      },
    },
    {
      topic: { en: 'Storage', sw: 'Kuhifadhi' },
      note: {
        en: 'Amoxicillin tablets and capsules are stored at room temperature, away from heat and damp. Suspension (liquid) for children is usually reconstituted with water at the pharmacy and then needs refrigeration for the days it is used; check the bottle label.',
        sw: 'Amoxicillin za vidonge na capsules huhifadhiwa katika joto la chumba, mbali na joto na unyevu. Suspension (kioevu) kwa watoto kawaida hutengenezwa upya na maji katika duka la dawa na kisha inahitaji friji kwa siku zinazotumiwa; angalia lebo ya chupa.',
        sw_mtaa: 'Amoxicillin tablets na capsules zinahifadhiwa katika room temperature, mbali na joto na damp. Suspension (kioevu) kwa watoto kawaida inareconstituted na maji kwenye pharmacy na kisha inahitaji refrigeration kwa siku zinazotumiwa; angalia bottle label.',
      },
    },
    {
      topic: { en: 'Do not share antibiotics', sw: 'Usishiriki antibiotic' },
      note: {
        en: 'Leftover antibiotics from a previous course should not be taken for a new illness, and should not be given to family members. The right antibiotic, dose, and length depends on which infection — and using the wrong one drives resistance and delays correct treatment.',
        sw: 'Antibiotic zilizobaki kutoka kozi ya awali hazipaswi kuchukuliwa kwa ugonjwa mpya, na hazipaswi kupewa wanafamilia. Antibiotic sahihi, dose, na urefu hutegemea maambukizi gani — na kutumia mbaya kunaendesha upinzani na kuchelewesha matibabu sahihi.',
        sw_mtaa: 'Leftover antibiotics kutoka previous course hazipaswi kuchukuliwa kwa new illness, na hazipaswi kupewa family members. Right antibiotic, dose, na length inategemea infection gani — na kutumia wrong one inaendesha resistance na inachelewesha correct treatment.',
      },
    },
  ],

  sources: [
    src('WHO_PNEUMONIA_2022'),
    src('WHO_AMR_2023'),
    src('IMCI_2024'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
