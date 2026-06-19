/**
 * Azithromycin — Drug Knowledge (Phase 8 pneumonia block)
 *
 * Sources: WHO AWaRe 2023 (Watch category), WHO Pneumonia 2022,
 *          NTLG STG 2023, BNF current, EMC current.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Azithromycin (a macrolide) covers the atypical organisms that
 *   amoxicillin misses (Mycoplasma, Chlamydia, Legionella). In severe
 *   adult CAP it is added to ceftriaxone for double coverage; in
 *   penicillin-allergic patients it is the oral alternative. It also
 *   appears in typhoid, gonorrhoea, trachoma, and traveller's
 *   diarrhoea regimens. Its short course (3-5 days) and once-daily
 *   dosing make it practical, but QT prolongation is the safety story
 *   that everyone using it needs to know.
 *
 * Scope note:
 *   We educate on what azithromycin is, when it is used (including the
 *   atypical-pneumonia coverage role), the short-course practicality,
 *   the QT prolongation interaction story, and what side effects to
 *   watch for. We do NOT prescribe doses.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const AZITHROMYCIN: DrugKnowledge = {
  id: 'azithromycin',
  aliases: DRUG_ALIASES.azithromycin,

  drugClass: {
    en: 'Macrolide antibiotic — WHO Watch category, the practical option for atypical pneumonia coverage and for many people with penicillin allergy',
    sw: 'Macrolide antibiotic — kategoria ya Watch ya WHO, chaguo la vitendo kwa kufunika atypical pneumonia na kwa watu wengi wenye mzio wa penicillin',
  },

  whatItDoes: {
    en: 'Azithromycin stops bacteria from making the proteins they need to grow — it binds to the bacterial ribosome and disables it. Where amoxicillin breaks the cell wall (and so works against streptococci and other "typical" organisms), azithromycin reaches inside cells and works particularly well against "atypical" organisms like Mycoplasma pneumoniae, Chlamydia pneumoniae, and Legionella — the bugs that cause "walking pneumonia" and a significant share of more severe pneumonia, especially in younger adults. It also has activity against many gram-positive bacteria, some gram-negatives, and certain sexually transmitted infections. Its long tissue half-life is the reason it can be given as a 3-day course in some indications rather than the usual 5-7 days of other antibiotics.',
    sw: 'Azithromycin huzuia bakteria kutengeneza protini wanazohitaji kukua — hujifunga kwa ribosome ya bakteria na kuilemaza. Wakati amoxicillin huvunja ukuta wa seli (na hivyo hufanya kazi dhidi ya streptococci na viumbe wengine "wa kawaida"), azithromycin huingia ndani ya seli na hufanya kazi vizuri hasa dhidi ya viumbe "atypical" kama Mycoplasma pneumoniae, Chlamydia pneumoniae, na Legionella — wadudu wanaosababisha "walking pneumonia" na sehemu kubwa ya nimonia kali zaidi, hasa kwa watu wazima wadogo. Pia ina shughuli dhidi ya bakteria wengi wa gram-positive, baadhi ya gram-negatives, na maambukizi fulani ya kupitia ngono. Maisha yake marefu ya tishu ni sababu inaweza kutolewa kama kozi ya siku 3 katika baadhi ya dalili badala ya siku 5-7 za kawaida za antibiotic nyingine.',
    sw_mtaa: 'Azithromycin inazuia bakteria kutengeneza protini wanazohitaji kukua — inajifunga kwa bacterial ribosome na kuilemaza. Wakati amoxicillin inavunja cell wall (na hivyo inafanya kazi dhidi ya streptococci na other "typical" organisms), azithromycin inaingia ndani ya cells na inafanya kazi vizuri hasa dhidi ya "atypical" organisms kama Mycoplasma pneumoniae, Chlamydia pneumoniae, na Legionella — bugs zinazosababisha "walking pneumonia" na significant share ya more severe pneumonia, hasa kwa younger adults. Pia ina activity dhidi ya gram-positive bacteria wengi, baadhi ya gram-negatives, na certain STIs. Long tissue half-life yake ni sababu inaweza kutolewa kama 3-day course katika baadhi ya indications badala ya usual siku 5-7 za other antibiotics.',
  },

  commonUses: [
    {
      en: 'Atypical or suspected-atypical community-acquired pneumonia in adults — either alone for mild outpatient cases or added to ceftriaxone in severe CAP for double coverage.',
      sw: 'Atypical au CAP inayoshukiwa kuwa atypical kwa watu wazima — ama peke yake kwa kesi za nje za upole au kuongezwa kwa ceftriaxone katika CAP kali kwa kufunika mara mbili.',
      sw_mtaa: 'Atypical au suspected-atypical CAP kwa adults — ama peke yake kwa mild outpatient cases au added kwa ceftriaxone katika severe CAP kwa double coverage.',
    },
    {
      en: 'Alternative to amoxicillin in patients with penicillin allergy who need outpatient antibiotic for pneumonia, sinusitis, or otitis media.',
      sw: 'Mbadala wa amoxicillin kwa wagonjwa wenye mzio wa penicillin wanaohitaji antibiotic ya nje kwa nimonia, sinusitis, au otitis media.',
      sw_mtaa: 'Alternative ya amoxicillin kwa patients wenye penicillin allergy wanaohitaji outpatient antibiotic kwa pneumonia, sinusitis, au otitis media.',
    },
    {
      en: 'Single-dose treatment for chlamydia genital infection (still used in many guidelines) and as part of regimens for gonorrhoea and trachoma.',
      sw: 'Matibabu ya dose moja kwa maambukizi ya genital chlamydia (bado yanatumika katika miongozo mingi) na kama sehemu ya regimens kwa kisonono na trachoma.',
      sw_mtaa: 'Single-dose treatment kwa chlamydia genital infection (bado inatumika katika miongozo mingi) na kama sehemu ya regimens kwa kisonono na trachoma.',
    },
    {
      en: 'Severe typhoid fever as an alternative or addition to fluoroquinolones or ceftriaxone, especially where resistance is documented.',
      sw: 'Homa kali ya typhoid kama mbadala au nyongeza kwa fluoroquinolones au ceftriaxone, hasa pale upinzani umeandikwa.',
      sw_mtaa: 'Severe typhoid fever kama alternative au addition kwa fluoroquinolones au ceftriaxone, hasa pale resistance imedocumented.',
    },
  ],

  howItIsTaken: {
    en: 'Azithromycin is taken by mouth, once a day. The classic regimens are 500 mg once daily for 3 days OR 500 mg on day 1 then 250 mg once daily for 4 more days — the prescriber will tell you which. It can be taken with or without food, though some people find taking it with a small snack reduces stomach upset. The 3-day course works because azithromycin stays in lung tissues for days after the last dose. Once-daily dosing makes adherence easier than twice- or three-times-daily antibiotics. Even though the course is short, complete it — stopping early after one or two doses is not enough to clear the infection and contributes to resistance. The most common pediatric form is a flavoured oral suspension.',
    sw: 'Azithromycin huchukuliwa kwa mdomo, mara moja kwa siku. Regimens za kawaida ni 500 mg mara moja kwa siku kwa siku 3 AU 500 mg siku ya 1 kisha 250 mg mara moja kwa siku kwa siku 4 zaidi — mwandishi atakwambia ipi. Inaweza kuchukuliwa na chakula au bila, ingawa baadhi ya watu hupata kuichukua na vitafunwa vidogo hupunguza usumbufu wa tumbo. Kozi ya siku 3 inafanya kazi kwa sababu azithromycin hubaki kwenye tishu za mapafu kwa siku baada ya dose ya mwisho. Dose ya mara moja kwa siku hurahisisha kuzingatia kuliko antibiotic za mara mbili au tatu kwa siku. Hata kama kozi ni fupi, ikamilishe — kusimamisha mapema baada ya dose moja au mbili haitoshi kuondoa maambukizi na huchangia upinzani. Fomu ya kawaida ya watoto ni suspension ya kumeza yenye ladha.',
    sw_mtaa: 'Azithromycin inachukuliwa kwa mdomo, once daily. Classic regimens ni 500 mg once daily kwa siku 3 AU 500 mg day 1 kisha 250 mg once daily kwa siku 4 zaidi — prescriber atakwambia ipi. Inaweza kuchukuliwa na chakula au bila, ingawa baadhi ya watu wanapata kuichukua na small snack inapunguza stomach upset. 3-day course inafanya kazi kwa sababu azithromycin inabaki kwenye lung tissues kwa siku baada ya last dose. Once-daily dosing inarahisisha adherence kuliko twice- au three-times-daily antibiotics. Hata kama kozi ni short, complete it — kusimamisha mapema baada ya dose moja au mbili haitoshi kuclear infection na inachangia resistance. Most common pediatric form ni flavoured oral suspension.',
  },

  commonSideEffects: [
    {
      en: 'Mild stomach upset, nausea, abdominal cramps, or diarrhoea — common with macrolides; taking with food helps.',
      sw: 'Usumbufu mdogo wa tumbo, kichefuchefu, kubana kwa tumbo, au kuharisha — ya kawaida kwa macrolides; kuichukua na chakula husaidia.',
      sw_mtaa: 'Mild stomach upset, nausea, abdominal cramps, au diarrhoea — common na macrolides; kuichukua na chakula inasaidia.',
    },
    {
      en: 'Mild headache or dizziness — usually settles within a day or two.',
      sw: 'Kichwa kidogo au kizunguzungu — kawaida hutulia ndani ya siku moja au mbili.',
      sw_mtaa: 'Mild headache au dizziness — kawaida inatulia ndani ya siku moja au mbili.',
    },
    {
      en: 'Temporary metallic or bitter taste in the mouth — settles after the course.',
      sw: 'Ladha ya muda ya metali au chungu kinywani — hutulia baada ya kozi.',
      sw_mtaa: 'Temporary metallic au bitter taste kinywani — inatulia baada ya kozi.',
    },
    {
      en: 'Mild vaginal thrush in women (gut flora disruption letting Candida grow) — antifungal cream or pessary settles it.',
      sw: 'Vaginal thrush kidogo kwa wanawake (usumbufu wa flora ya tumbo unaoruhusu Candida kukua) — krimu ya antifungal au pessary huitatua.',
      sw_mtaa: 'Mild vaginal thrush kwa wanawake (gut flora disruption inayoruhusu Candida kukua) — antifungal cream au pessary inatatua.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Palpitations, fainting, irregular pulse, or seizure — possible QT prolongation leading to a dangerous heart rhythm. EMERGENCY: stop the medicine, go to a facility for ECG and assessment',
        sw: 'Mapigo ya moyo yasiyo ya kawaida, kuzimia, pulse isiyo ya kawaida, au degedege — uwezekano wa QT prolongation kupelekea rhythm hatari ya moyo. DHARURA: simamisha dawa, ingia kituoni kwa ECG na tathmini',
        sw_mtaa: 'Palpitations, fainting, irregular pulse, au seizure — uwezekano wa QT prolongation kupelekea dangerous heart rhythm. DHARURA: simamisha dawa, ingia kituoni kwa ECG na assessment',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Sudden hives, swelling of face/lips/tongue, wheeze, breathing difficulty — anaphylaxis. EMERGENCY: stop the medicine, get to a facility immediately',
        sw: 'Vipele vya ghafla, uvimbe wa uso/midomo/ulimi, mfululizo wa pumzi, ugumu wa kupumua — anaphylaxis. DHARURA: simamisha dawa, fika kituoni mara moja',
        sw_mtaa: 'Sudden hives, swelling ya uso/midomo/ulimi, wheeze, breathing difficulty — anaphylaxis. DHARURA: simamisha dawa, fika kituoni mara moja',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe skin rash with blistering, peeling, or mouth/eye sores (Stevens-Johnson syndrome) — EMERGENCY: stop the medicine, urgent assessment',
        sw: 'Vipele vikali vya ngozi na malenge, kutoka, au vidonda mdomoni/machoni (Stevens-Johnson syndrome) — DHARURA: simamisha dawa, tathmini ya haraka',
        sw_mtaa: 'Severe skin rash na blistering, peeling, au mouth/eye sores (Stevens-Johnson syndrome) — DHARURA: simamisha dawa, urgent assessment',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Yellowing of skin or eyes, dark urine, severe right-upper belly pain — possible drug-induced liver injury (rare). URGENT: stop the medicine, blood tests',
        sw: 'Kuwa manjano kwa ngozi au macho, mkojo wa rangi nyeusi, maumivu makali ya tumbo la juu upande wa kulia — uwezekano wa drug-induced liver injury (nadra). HARAKA: simamisha dawa, vipimo vya damu',
        sw_mtaa: 'Yellowing ya ngozi au macho, dark urine, severe right-upper belly pain — uwezekano wa drug-induced liver injury (rare). URGENT: simamisha dawa, blood tests',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Severe watery diarrhoea sometimes with blood — possible C. difficile colitis. URGENT: needs different treatment',
        sw: 'Kuharisha kali kwa maji wakati mwingine na damu — uwezekano wa C. difficile colitis. HARAKA: inahitaji matibabu tofauti',
        sw_mtaa: 'Severe watery diarrhoea wakati mwingine na damu — uwezekano wa C. difficile colitis. URGENT: inahitaji different treatment',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'qt_prolonging_drugs',
      withDisplay: { en: 'other QT-prolonging medicines (e.g. some antimalarials, antipsychotics, certain antiarrhythmics)', sw: 'dawa nyingine zinazoextend QT (mfano baadhi ya antimalarials, antipsychotics, certain antiarrhythmics)' },
      severity: 'caution',
      explanation: {
        en: 'Azithromycin slightly lengthens the QT interval on the ECG. Combining it with other medicines that do the same (some antimalarials like quinine; some antipsychotics; certain antiarrhythmics) or with low potassium/magnesium can — rarely — trigger a dangerous heart rhythm. Tell the prescriber about all other medicines you take.',
        sw: 'Azithromycin huongeza kidogo muda wa QT kwenye ECG. Kuichanganya na dawa nyingine zinazofanya hivyo (baadhi ya antimalarials kama quinine; baadhi ya antipsychotics; certain antiarrhythmics) au na potassium/magnesium ya chini inaweza — kwa nadra — kuchochea rhythm hatari ya moyo. Mwambie mwandishi kuhusu dawa zote nyingine unazochukua.',
        sw_mtaa: 'Azithromycin inaongeza slightly QT interval kwenye ECG. Kuichanganya na other medicines zinazofanya hivyo (baadhi ya antimalarials kama quinine; baadhi ya antipsychotics; certain antiarrhythmics) au na low potassium/magnesium inaweza — rarely — kuchochea dangerous heart rhythm. Mwambie prescriber kuhusu dawa zote nyingine unazochukua.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'warfarin',
      withDisplay: { en: 'warfarin (blood thinner)', sw: 'warfarin (dawa ya kupunguza damu)' },
      severity: 'caution',
      explanation: {
        en: 'Azithromycin can raise the effect of warfarin in some people (raising INR and bleeding risk). Extra INR monitoring is sensible during and shortly after the course.',
        sw: 'Azithromycin inaweza kuongeza athari ya warfarin kwa baadhi ya watu (kuongeza INR na hatari ya kutoka damu). Ufuatiliaji wa ziada wa INR ni busara wakati na muda mfupi baada ya kozi.',
        sw_mtaa: 'Azithromycin inaweza kuongeza athari ya warfarin kwa baadhi ya watu (kuongeza INR na bleeding risk). Extra INR monitoring ni sensible wakati na shortly baada ya kozi.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
    {
      with: 'antacids',
      withDisplay: { en: 'antacids containing aluminium or magnesium', sw: 'antacids zenye aluminium au magnesium' },
      severity: 'note',
      explanation: {
        en: 'Aluminium- or magnesium-containing antacids reduce azithromycin absorption when taken at the same time. Separate the doses by at least 2 hours.',
        sw: 'Antacids zenye aluminium au magnesium hupunguza ufyonzaji wa azithromycin zinapochukuliwa wakati mmoja. Tenganisha dose kwa angalau masaa 2.',
        sw_mtaa: 'Antacids zenye aluminium au magnesium zinapunguza azithromycin absorption zinapochukuliwa wakati mmoja. Tenganisha doses kwa angalau masaa 2.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Short course, real course', sw: 'Kozi fupi, kozi halisi' },
      note: {
        en: 'Three days may feel too short to be a "real" antibiotic course, but azithromycin keeps working for several days after the last dose because of how it lingers in tissues. Take all three (or all five, depending on what was prescribed). The same finish-the-course principle applies.',
        sw: 'Siku tatu zinaweza kuhisi fupi sana kuwa kozi ya "kweli" ya antibiotic, lakini azithromycin huendelea kufanya kazi kwa siku kadhaa baada ya dose ya mwisho kwa sababu ya jinsi inavyokaa kwenye tishu. Tumia zote tatu (au zote tano, kulingana na kilichoandikwa). Kanuni ile ile ya kumaliza kozi inatumika.',
        sw_mtaa: 'Siku tatu zinaweza kuhisi too short to be "real" antibiotic course, lakini azithromycin inaendelea kufanya kazi kwa siku kadhaa baada ya last dose kwa sababu ya jinsi inavyolinger kwenye tissues. Tumia zote tatu (au zote tano, kulingana na kilichoprescribed). Same finish-the-course principle inatumika.',
      },
    },
    {
      topic: { en: 'Heart rhythm', sw: 'Rhythm ya moyo' },
      note: {
        en: 'For most people azithromycin is very safe. If you have a known heart rhythm problem, take heart medicines, or have ever fainted or felt your heart skip, mention this to the prescriber — sometimes an ECG before the course or a different antibiotic is the safer choice.',
        sw: 'Kwa watu wengi azithromycin ni salama sana. Ikiwa una tatizo la rhythm ya moyo unaojulikana, unachukua dawa za moyo, au umewahi kuzimia au kuhisi moyo wako kuruka, taja hii kwa mwandishi — wakati mwingine ECG kabla ya kozi au antibiotic tofauti ni chaguo salama zaidi.',
        sw_mtaa: 'Kwa watu wengi azithromycin ni safe sana. Ikiwa una known heart rhythm problem, unachukua heart medicines, au umewahi kuzimia au kuhisi heart yako kuskip, mention hii kwa prescriber — wakati mwingine ECG kabla ya kozi au different antibiotic ni safer choice.',
      },
    },
    {
      topic: { en: 'Pregnancy and breastfeeding', sw: 'Mimba na kunyonyesha' },
      note: {
        en: 'Azithromycin is considered safe in pregnancy and during breastfeeding for the indications where it is used. Tell the prescriber if you are or might be pregnant, but in most cases it remains a reasonable choice for atypical pneumonia in pregnancy.',
        sw: 'Azithromycin inachukuliwa kuwa salama katika mimba na wakati wa kunyonyesha kwa dalili ambazo hutumiwa. Mwambie mwandishi ikiwa una mimba au unaweza kuwa na mimba, lakini katika kesi nyingi inabaki chaguo la busara kwa atypical pneumonia katika mimba.',
        sw_mtaa: 'Azithromycin inaconsidered safe katika pregnancy na wakati wa breastfeeding kwa indications ambapo inatumika. Mwambie prescriber ikiwa una mimba au unaweza kuwa na mimba, lakini katika kesi nyingi inabaki reasonable choice kwa atypical pneumonia katika pregnancy.',
      },
    },
  ],

  sources: [
    src('WHO_PNEUMONIA_2022'),
    src('WHO_AMR_2023'),
    src('NTLG_STG_2023'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
