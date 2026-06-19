/**
 * Stroke — Full Condition Knowledge (Phase 12)
 *
 * Sources: WHO PEN 2020, WHO HEARTS 2023, NTLG STG 2023, Muhimbili Protocols,
 *          NACP_ART 2024 (HIV-vascular cross-ref).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Tanzania-specific framing:
 *   Stroke is the leading cause of adult disability in Tanzania. The
 *   dominant driver is uncontrolled hypertension. Time-critical
 *   recognition matters more than any other single teaching: FAST.
 *
 * Scope: Educate on stroke recognition, the time-window concept, post-
 * stroke care, prevention via HTN/AF/HIV/diabetes control. We do NOT
 * direct thrombolysis or thrombectomy decisions — that is hospital-only.
 */

import { ConditionKnowledge } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const STROKE: ConditionKnowledge = {
  id: 'stroke',
  aliases: CONDITION_ALIASES.stroke,
  category: 'neurologic',

  whatItIs: {
    en: 'A stroke is when blood supply to part of the brain is suddenly interrupted — either because an artery is blocked (ischaemic stroke, about 80%) or because an artery bursts and bleeds (haemorrhagic stroke, about 20%). Brain cells starved of oxygen begin to die within minutes, and the longer they go without blood, the more permanent the damage. The symptoms depend on which part of the brain is affected: weakness on one side of the body, slurred speech, facial droop, sudden severe headache, visual loss, confusion, or sudden loss of balance. In Tanzania the leading cause is long-standing uncontrolled high blood pressure. Stroke is the leading cause of adult disability nationally.',
    sw: 'Stroke ni wakati ugavi wa damu kwa sehemu ya ubongo unakatika ghafla — ama kwa sababu ateri imezibwa (ischaemic stroke, karibu 80%) au kwa sababu ateri imepasuka na inatoa damu (haemorrhagic stroke, karibu 20%). Seli za ubongo zilizokosa oksijeni huanza kufa ndani ya dakika, na zinapokaa muda mrefu bila damu, uharibifu unakuwa wa kudumu zaidi. Dalili hutegemea sehemu ya ubongo iliyoathirika: udhaifu wa upande mmoja wa mwili, hotuba isiyo wazi, uso unaolegea, maumivu makali ya kichwa ya ghafla, kupoteza maono, mkanganyiko, au kupoteza uwiano ghafla. Tanzania sababu kuu ni shinikizo la juu la damu lisilodhibitiwa la muda mrefu. Stroke ni sababu kuu ya ulemavu wa watu wazima kitaifa.',
    sw_mtaa: 'Stroke ni wakati blood supply kwa sehemu ya brain inainterrupted ghafla — ama kwa sababu artery imezibwa (ischaemic stroke, karibu 80%) au kwa sababu artery imepasuka na inatoa damu (haemorrhagic stroke, karibu 20%). Brain cells zilizostarved of oxygen zinaanza kufa ndani ya dakika, na zinapokaa longer bila blood, damage inakuwa more permanent. Symptoms zinategemea sehemu ya brain iliyoaffected: weakness on one side, slurred speech, facial droop, sudden severe headache, visual loss, confusion, au sudden loss of balance. Tanzania leading cause ni long-standing uncontrolled high blood pressure. Stroke ni leading cause ya adult disability kitaifa.',
  },

  whyItMatters: {
    en: 'Stroke is a TIME-CRITICAL emergency. "Time is brain" — about 1.9 million brain cells die every minute that ischaemic stroke goes untreated. If the patient reaches a stroke-capable hospital within 4.5 hours of symptom onset, they may be eligible for clot-busting medication (thrombolysis) that can reverse the deficit. After that window, most treatment is supportive and the damage is fixed. The single most important community message is the FAST mnemonic: Face drooping, Arm weakness, Speech difficulty, Time to call for help NOW. The second message is prevention: every well-controlled blood pressure prevents future strokes, and aspirin after a first stroke prevents a second.',
    sw: 'Stroke ni dharura ya WAKATI-MUHIMU. "Wakati ni ubongo" — karibu seli 1.9 milioni za ubongo hufa kila dakika ambayo ischaemic stroke haijatibiwa. Ikiwa mgonjwa atafika hospitali yenye uwezo wa stroke ndani ya masaa 4.5 ya kuanza dalili, anaweza kustahiki dawa ya kuvunja damu (thrombolysis) ambayo inaweza kurudisha deficit. Baada ya dirisha hilo, matibabu mengi ni ya kuunga mkono na uharibifu umewekwa. Ujumbe muhimu zaidi wa jamii ni mnemonic ya FAST: Face inayolegea, Arm udhaifu, Speech ugumu, Time kuita msaada SASA. Ujumbe wa pili ni kinga: kila shinikizo la damu lililodhibitiwa vyema huzuia stroke za baadaye, na aspirin baada ya stroke ya kwanza huzuia ya pili.',
    sw_mtaa: 'Stroke ni TIME-CRITICAL emergency. "Time is brain" — karibu 1.9 million brain cells zinafa kila minute ambayo ischaemic stroke inagoes untreated. Ikiwa patient atareach stroke-capable hospital ndani ya masaa 4.5 ya symptom onset, anaweza kueligible kwa clot-busting medication (thrombolysis) inayoweza kureverse deficit. Baada ya window hiyo, most treatment ni supportive na damage imefixed. Single most important community message ni FAST mnemonic: Face drooping, Arm weakness, Speech difficulty, Time kucall for help NOW. Second message ni prevention: kila well-controlled blood pressure inazuia future strokes, na aspirin baada ya first stroke inazuia second.',
  },

  commonQuestions: [
    {
      q: { en: 'How do I recognise a stroke?', sw: 'Ninatambuaje stroke?' },
      a: {
        en: 'Use the FAST test. F — Face: ask the person to smile; does one side of the face droop? A — Arms: ask them to raise both arms; does one arm drift down? S — Speech: ask them to repeat a simple sentence; is the speech slurred or strange? T — Time: if any of these signs is present, call for emergency help and get to hospital NOW. Other stroke signs include: sudden severe headache "the worst of my life," sudden vision loss in one eye or both, sudden severe dizziness with loss of balance. Time matters more than anything else.',
        sw: 'Tumia mtihani wa FAST. F — Uso: muulize mtu atabasamu; je upande mmoja wa uso unalegea? A — Mikono: muulize ainue mikono yote miwili; je mkono mmoja unashuka chini? S — Hotuba: muulize arudie sentensi rahisi; je hotuba ni isiyo wazi au ya ajabu? T — Wakati: ikiwa ishara yoyote ya hizi ipo, ita msaada wa dharura na uende hospitali SASA. Ishara nyingine za stroke ni pamoja na: maumivu makali ya kichwa ghafla "mabaya zaidi maishani mwangu," kupoteza maono ghafla katika jicho moja au yote mawili, kizunguzungu kikali ghafla na kupoteza uwiano. Wakati ni muhimu zaidi kuliko kitu chochote.',
        sw_mtaa: 'Tumia FAST test. F — Face: muulize mtu atabasamu; je one side ya face inalegea? A — Arms: muulize ainue mikono yote miwili; je mkono mmoja unashuka chini? S — Speech: muulize arepeat simple sentence; je speech ni slurred au strange? T — Time: ikiwa sign yoyote ya hizi ipo, call emergency help na uende hospitali NOW. Other stroke signs ni pamoja na: sudden severe headache "the worst of my life," sudden vision loss katika jicho moja au yote mawili, sudden severe dizziness na loss of balance. Time inamatter zaidi kuliko kitu chochote.',
      },
    },
    {
      q: { en: 'Why is time so important in stroke?', sw: 'Kwa nini wakati ni muhimu sana katika stroke?' },
      a: {
        en: 'In an ischaemic stroke (blocked artery), brain cells start dying within minutes. About 1.9 million neurones die every minute the artery stays blocked. If the patient reaches hospital within 4.5 hours of symptom onset AND tests show no bleeding on CT scan, doctors may give a clot-busting medication called thrombolysis (tPA or tenecteplase) that can restore blood flow and reverse some of the damage. After 4.5 hours, this option is mostly closed and only supportive care remains. The earlier you reach hospital, the better — even within 90 minutes is dramatically better than 4 hours. Every minute matters.',
        sw: 'Katika ischaemic stroke (ateri iliyozibwa), seli za ubongo huanza kufa ndani ya dakika. Karibu neurones 1.9 milioni hufa kila dakika ambayo ateri inabaki imezibwa. Ikiwa mgonjwa atafika hospitali ndani ya masaa 4.5 ya kuanza dalili NA vipimo vinaonyesha hakuna damu kwenye CT scan, madaktari wanaweza kutoa dawa ya kuvunja damu inayoitwa thrombolysis (tPA au tenecteplase) inayoweza kurudisha mtiririko wa damu na kurudisha sehemu ya uharibifu. Baada ya masaa 4.5, chaguo hili ni karibu lililofungwa na huduma za kuunga mkono tu zinabaki. Mapema unapofika hospitali, ni bora zaidi — hata ndani ya dakika 90 ni bora dramatically kuliko masaa 4. Kila dakika ni muhimu.',
        sw_mtaa: 'Katika ischaemic stroke (blocked artery), brain cells zinaanza kufa ndani ya dakika. Karibu 1.9 million neurones zinafa kila minute ambayo artery inabaki blocked. Ikiwa patient atafika hospitali ndani ya masaa 4.5 ya symptom onset NA tests zinaonyesha hakuna bleeding kwenye CT scan, madaktari wanaweza kutoa clot-busting medication inayoitwa thrombolysis (tPA au tenecteplase) inayoweza kurestore blood flow na kureverse some damage. Baada ya masaa 4.5, option hili ni mostly closed na only supportive care inabaki. Mapema unapofika hospitali, ni better — hata ndani ya dakika 90 ni dramatically better kuliko masaa 4. Kila minute inamatter.',
      },
    },
    {
      q: { en: 'What causes stroke in Tanzania?', sw: 'Stroke husababishwa na nini Tanzania?' },
      a: {
        en: 'The dominant cause in Tanzania is uncontrolled hypertension — by far. Other major causes are atrial fibrillation (irregular heart rhythm that allows clots to form in the heart and shoot to the brain), diabetes (accelerates atherosclerosis), HIV (vascular disease at younger ages), smoking, high cholesterol, rheumatic heart disease (atrial fibrillation from mitral stenosis), and sickle cell disease (silent and clinical strokes from vaso-occlusion). Every well-controlled BP prevents future strokes; the BP target for stroke prevention is < 140/90, lower if tolerated and not elderly/frail.',
        sw: 'Sababu kuu Tanzania ni shinikizo la juu lisilodhibitiwa — kwa mbali. Sababu nyingine kuu ni atrial fibrillation (rhythm isiyo sawa ya moyo inayoruhusu donge kuunda moyoni na kupiga ubongo), kisukari (huongeza atherosclerosis), VVU (ugonjwa wa mishipa katika umri mdogo), kuvuta sigara, cholesterol ya juu, ugonjwa wa moyo wa rheumatic (atrial fibrillation kutoka mitral stenosis), na ugonjwa wa selimundu (strokes za kimya na kliniki kutoka vaso-occlusion). Kila BP iliyodhibitiwa vyema huzuia strokes za baadaye; lengo la BP kwa kinga ya stroke ni < 140/90, chini ikiwa inavumilika na sio mzee/dhaifu.',
        sw_mtaa: 'Dominant cause Tanzania ni uncontrolled hypertension — by far. Other major causes ni atrial fibrillation (irregular heart rhythm inayoruhusu clots kuunda kwenye heart na kushoot kwenye brain), diabetes (inaaccelerate atherosclerosis), HIV (vascular disease katika younger ages), kuvuta sigara, high cholesterol, rheumatic heart disease (atrial fibrillation kutoka mitral stenosis), na sickle cell disease (silent na clinical strokes kutoka vaso-occlusion). Kila well-controlled BP inazuia future strokes; BP target kwa stroke prevention ni < 140/90, chini ikiwa inatolerated na sio elderly/frail.',
      },
    },
    {
      q: { en: 'What is a TIA?', sw: 'TIA ni nini?' },
      a: {
        en: 'A TIA — transient ischaemic attack — is a "mini-stroke." The same symptoms as a stroke (one-sided weakness, slurred speech, vision change), but they resolve completely within 24 hours, usually within an hour. A TIA is NOT a relief — it is a WARNING. About 1 in 10 people who have a TIA will have a full stroke within 3 months, and the risk is highest in the first 48 hours. Every TIA needs urgent same-day assessment: BP control, antiplatelet (aspirin), statin, investigations for AF, and management of underlying risk factors. Do not ignore symptoms because they went away.',
        sw: 'TIA — transient ischaemic attack — ni "stroke ndogo." Dalili sawa na stroke (udhaifu wa upande mmoja, hotuba isiyo wazi, mabadiliko ya maono), lakini hurudi kabisa ndani ya masaa 24, kawaida ndani ya saa. TIA SIO faraja — ni ONYO. Karibu 1 kwa 10 watu wenye TIA watapata stroke kamili ndani ya miezi 3, na hatari ni kubwa zaidi katika masaa 48 ya kwanza. Kila TIA inahitaji tathmini ya haraka ya siku ile ile: udhibiti wa BP, antiplatelet (aspirin), statin, uchunguzi wa AF, na usimamizi wa sababu za hatari za msingi. Usipuuze dalili kwa sababu zimepotea.',
        sw_mtaa: 'TIA — transient ischaemic attack — ni "mini-stroke." Same symptoms kama stroke (one-sided weakness, slurred speech, vision change), lakini zinaresolve completely ndani ya masaa 24, kawaida ndani ya saa. TIA SIO relief — ni WARNING. Karibu 1 kwa 10 watu wanaopata TIA watapata full stroke ndani ya miezi 3, na risk ni highest katika first 48 hours. Kila TIA inahitaji urgent same-day assessment: BP control, antiplatelet (aspirin), statin, investigations kwa AF, na management ya underlying risk factors. Usipuuze symptoms kwa sababu zimegoneaway.',
      },
    },
    {
      q: { en: 'What is rehabilitation after stroke?', sw: 'Ukarabati baada ya stroke ni nini?' },
      a: {
        en: 'Rehabilitation begins in hospital and continues for months. The components: physiotherapy (regaining strength, balance, mobility), occupational therapy (relearning daily tasks — dressing, eating, washing), speech and language therapy (where speech or swallowing is affected), and psychological support (depression after stroke is very common). The brain has remarkable capacity to rewire (neuroplasticity), but recovery requires consistent, repeated practice. Family support is central. Practical adaptations at home (handrails, raised toilet seats, non-slip mats) prevent falls. Even small gains made in the first 6 months are meaningful and worth working for.',
        sw: 'Ukarabati huanza hospitalini na huendelea kwa miezi. Vipengele: physiotherapy (kupata tena nguvu, uwiano, mwendo), occupational therapy (kujifunza tena kazi za kila siku — kuvaa, kula, kuosha), tiba ya hotuba na lugha (pale hotuba au kumeza imeathirika), na msaada wa kisaikolojia (unyong\'onyevu baada ya stroke ni wa kawaida sana). Ubongo una uwezo wa ajabu wa kurewire (neuroplasticity), lakini kupona kunahitaji mazoezi ya mara kwa mara, yanayorudiwa. Msaada wa familia ni wa msingi. Marekebisho ya vitendo nyumbani (handrails, viti vya choo vilivyoinuliwa, mikeka isiyo telezi) huzuia kuanguka. Hata mafanikio madogo yaliyofanywa katika miezi 6 ya kwanza ni muhimu na yanafaa kufanyiwa kazi.',
        sw_mtaa: 'Rehabilitation inaanza hospitalini na inacontinue kwa miezi. Components: physiotherapy (kuregain strength, balance, mobility), occupational therapy (kurelearning daily tasks — kuvaa, kula, kuosha), speech na language therapy (pale speech au swallowing imeaffected), na psychological support (depression baada ya stroke ni very common). Brain ina remarkable capacity ya kurewire (neuroplasticity), lakini recovery inahitaji consistent, repeated practice. Family support ni central. Practical adaptations nyumbani (handrails, raised toilet seats, non-slip mats) zinazuia falls. Hata small gains zilizofanywa katika first 6 months ni meaningful na zinafaa kuworked for.',
      },
    },
    {
      q: { en: 'How do I prevent another stroke?', sw: 'Ninazuiaje stroke nyingine?' },
      a: {
        en: 'After a first stroke, recurrence prevention is structured: (1) Blood pressure to target — usually < 140/90, sometimes lower; this is the most important single intervention. (2) Antiplatelet — aspirin (or clopidogrel for some) lifelong unless contraindicated. (3) Statin — to lower LDL cholesterol. (4) Anticoagulation if AF was the cause — warfarin or DOAC. (5) Diabetes control. (6) Stop smoking entirely. (7) Treat sleep apnoea if present. (8) HIV viral suppression on ART. (9) Healthy diet, regular activity. The patients who do best with stroke prevention are those who treat the underlying risk factors aggressively forever — not just for a few months after the event.',
        sw: 'Baada ya stroke ya kwanza, kinga ya kurudia imepangwa: (1) Shinikizo la damu kwa target — kawaida < 140/90, wakati mwingine chini; hii ni hatua moja muhimu zaidi. (2) Antiplatelet — aspirin (au clopidogrel kwa wengine) maisha yote isipokuwa imecontraindicated. (3) Statin — kupunguza LDL cholesterol. (4) Anticoagulation ikiwa AF ilikuwa sababu — warfarin au DOAC. (5) Udhibiti wa kisukari. (6) Acha kuvuta sigara kabisa. (7) Tibu sleep apnoea ikiwa ipo. (8) HIV viral suppression kwenye ART. (9) Lishe yenye afya, shughuli ya kawaida. Wagonjwa wanaofanya vyema zaidi na kinga ya stroke ni wale wanaotibu sababu za hatari za msingi kwa nguvu milele — sio tu kwa miezi michache baada ya tukio.',
        sw_mtaa: 'Baada ya first stroke, recurrence prevention imestructured: (1) Blood pressure to target — kawaida < 140/90, wakati mwingine chini; hii ni single most important intervention. (2) Antiplatelet — aspirin (au clopidogrel kwa wengine) lifelong isipokuwa contraindicated. (3) Statin — kupunguza LDL cholesterol. (4) Anticoagulation ikiwa AF ilikuwa cause — warfarin au DOAC. (5) Diabetes control. (6) Acha smoking kabisa. (7) Treat sleep apnoea ikiwa present. (8) HIV viral suppression kwenye ART. (9) Healthy diet, regular activity. Wagonjwa wanaofanya best na stroke prevention ni wale wanaotibu underlying risk factors aggressively forever — sio tu kwa miezi michache baada ya event.',
      },
    },
  ],

  selfManagement: [
    { en: 'Take your BP medicines every day — uncontrolled BP is the leading cause of stroke', sw: 'Chukua dawa zako za BP kila siku — BP isiyodhibitiwa ni sababu kuu ya stroke', sw_mtaa: 'Chukua BP medicines zako kila siku — uncontrolled BP ni leading cause ya stroke' },
    { en: 'If you have AF, take your anticoagulant exactly as prescribed', sw: 'Ukiwa na AF, chukua anticoagulant yako hasa kama ilivyoagizwa', sw_mtaa: 'Ikiwa una AF, chukua anticoagulant yako exactly as prescribed' },
    { en: 'Take daily aspirin or clopidogrel after a stroke (if no bleeding concerns)', sw: 'Chukua aspirin au clopidogrel ya kila siku baada ya stroke (ikiwa hakuna wasiwasi wa kutoa damu)', sw_mtaa: 'Chukua daily aspirin au clopidogrel baada ya stroke (ikiwa hakuna bleeding concerns)' },
    { en: 'Stop smoking — and stay stopped', sw: 'Acha kuvuta sigara — na endelea kuwa umeacha', sw_mtaa: 'Acha smoking — na stay stopped' },
    { en: 'Engage in rehabilitation: physiotherapy, OT, speech therapy as needed', sw: 'Shiriki katika ukarabati: physiotherapy, OT, tiba ya hotuba kama inavyohitajika', sw_mtaa: 'Engage katika rehabilitation: physiotherapy, OT, speech therapy as needed' },
    { en: 'Address depression — it is common after stroke and treatable', sw: 'Shughulikia unyong\'onyevu — ni wa kawaida baada ya stroke na unatibika', sw_mtaa: 'Address depression — ni common baada ya stroke na inatreatable' },
    { en: 'Family education — they need to know the FAST signs to act fast next time', sw: 'Elimu ya familia — wanahitaji kujua ishara za FAST kutenda haraka mara nyingine', sw_mtaa: 'Family education — wanahitaji kujua FAST signs kutenda fast mara nyingine' },
  ],

  warningTriggers: [
    { en: 'Long-standing untreated or uncontrolled hypertension — the dominant cause in Tanzania', sw: 'Shinikizo la juu lisilotibika au lisilodhibitiwa la muda mrefu — sababu kuu Tanzania', sw_mtaa: 'Long-standing untreated au uncontrolled hypertension — dominant cause Tanzania' },
    { en: 'Atrial fibrillation — irregular heart rhythm allows clots to form', sw: 'Atrial fibrillation — rhythm isiyo sawa ya moyo inaruhusu donge kuunda', sw_mtaa: 'Atrial fibrillation — irregular heart rhythm inaruhusu clots kuunda' },
    { en: 'Diabetes — accelerates atherosclerosis', sw: 'Kisukari — huongeza atherosclerosis', sw_mtaa: 'Diabetes — inaaccelerate atherosclerosis' },
    { en: 'Smoking — current or past', sw: 'Kuvuta sigara — sasa au zamani', sw_mtaa: 'Smoking — current au past' },
    { en: 'HIV — vascular disease at younger ages', sw: 'VVU — ugonjwa wa mishipa katika umri mdogo', sw_mtaa: 'HIV — vascular disease katika younger ages' },
    { en: 'Sickle cell disease — silent and clinical strokes', sw: 'Ugonjwa wa selimundu — strokes za kimya na kliniki', sw_mtaa: 'Sickle cell disease — silent na clinical strokes' },
    { en: 'High cholesterol, family history, obesity, sedentary lifestyle', sw: 'Cholesterol ya juu, historia ya familia, kunenepa, maisha ya kukaa', sw_mtaa: 'High cholesterol, family history, obesity, sedentary lifestyle' },
  ],

  whenToSeekCare: [
    { sign: { en: 'Sudden one-sided weakness of face, arm, or leg — call for help and get to hospital NOW (FAST)', sw: 'Udhaifu wa upande mmoja ghafla wa uso, mkono, au mguu — ita msaada na uende hospitali SASA (FAST)', sw_mtaa: 'Sudden one-sided weakness wa face, arm, au leg — call for help na uende hospitali NOW (FAST)' }, urgency: 'emergency' },
    { sign: { en: 'Sudden slurred speech or inability to speak or understand', sw: 'Hotuba isiyo wazi ghafla au kushindwa kuzungumza au kuelewa', sw_mtaa: 'Sudden slurred speech au kushindwa kuspeak au kuelewa' }, urgency: 'emergency' },
    { sign: { en: 'Sudden severe headache "the worst of my life," especially with vomiting or stiff neck', sw: 'Maumivu makali ya kichwa ghafla "mabaya zaidi maishani mwangu," hasa na kutapika au shingo ngumu', sw_mtaa: 'Sudden severe headache "worst of my life," especially na vomiting au stiff neck' }, urgency: 'emergency' },
    { sign: { en: 'Sudden vision loss in one or both eyes', sw: 'Kupoteza maono ghafla katika jicho moja au yote mawili', sw_mtaa: 'Sudden vision loss katika jicho moja au yote mawili' }, urgency: 'emergency' },
    { sign: { en: 'Sudden severe dizziness with loss of balance and inability to walk', sw: 'Kizunguzungu kikali ghafla na kupoteza uwiano na kushindwa kutembea', sw_mtaa: 'Sudden severe dizziness na loss of balance na kushindwa kutembea' }, urgency: 'emergency' },
    { sign: { en: 'TIA — symptoms that resolved within 24 hours; needs urgent same-day assessment', sw: 'TIA — dalili zilizorudi ndani ya masaa 24; inahitaji tathmini ya haraka ya siku ile ile', sw_mtaa: 'TIA — symptoms zilizoresolve ndani ya masaa 24; inahitaji urgent same-day assessment' }, urgency: 'urgent' },
  ],

  comorbidityNotes: [
    {
      coCondition: 'hypertension',
      note: {
        en: 'Hypertension is the single biggest stroke risk factor. Every 10 mmHg reduction in systolic BP reduces stroke risk by about 30%. After a stroke, BP control is the single most powerful prevention. Target is usually < 140/90, sometimes lower depending on age and tolerance.',
        sw: 'Shinikizo la juu ni sababu kubwa zaidi peke yake ya hatari ya stroke. Kila kupungua kwa 10 mmHg katika BP ya systolic hupunguza hatari ya stroke kwa karibu 30%. Baada ya stroke, udhibiti wa BP ni kinga moja yenye nguvu zaidi. Lengo kawaida ni < 140/90, wakati mwingine chini kulingana na umri na uvumilivu.',
        sw_mtaa: 'Hypertension ni single biggest stroke risk factor. Kila 10 mmHg reduction katika systolic BP inareduce stroke risk kwa karibu 30%. Baada ya stroke, BP control ni single most powerful prevention. Target kawaida ni < 140/90, wakati mwingine chini depending on age na tolerance.',
      },
    },
    {
      coCondition: 'heart_failure',
      note: {
        en: 'Heart failure and stroke share risk factors. AF + HF dramatically raises stroke risk — anticoagulation is mandatory unless contraindicated. Peripartum cardiomyopathy can throw embolic strokes from LV thrombus.',
        sw: 'Kushindwa kwa moyo na stroke vinashiriki sababu za hatari. AF + HF huongeza hatari ya stroke dramatically — anticoagulation ni mandatory isipokuwa imecontraindicated. Peripartum cardiomyopathy inaweza kutoa embolic strokes kutoka LV thrombus.',
        sw_mtaa: 'Heart failure na stroke zinashare risk factors. AF + HF inadramatically raise stroke risk — anticoagulation ni mandatory unless contraindicated. Peripartum cardiomyopathy inaweza kuthrow embolic strokes kutoka LV thrombus.',
      },
    },
    {
      coCondition: 'diabetes',
      note: {
        en: 'Diabetes doubles stroke risk via accelerated atherosclerosis. Tight glycaemic control + BP + statin are all part of stroke prevention in diabetes.',
        sw: 'Kisukari huongeza hatari ya stroke maradufu kupitia atherosclerosis iliyoongezwa. Udhibiti mkali wa glycaemic + BP + statin ni sehemu ya kinga ya stroke katika kisukari.',
        sw_mtaa: 'Diabetes inadouble stroke risk via accelerated atherosclerosis. Tight glycaemic control + BP + statin ni sehemu ya stroke prevention katika diabetes.',
      },
    },
    {
      coCondition: 'hiv',
      note: {
        en: 'HIV raises stroke risk at younger ages via accelerated vascular disease, opportunistic CNS infections, and HIV-associated vasculopathy. ART with viral suppression reduces but does not eliminate this excess risk. Stroke in a young Tanzanian adult should always trigger HIV testing.',
        sw: 'VVU huongeza hatari ya stroke katika umri mdogo kupitia ugonjwa wa mishipa ulioongezwa, maambukizi nyemelezi ya CNS, na vasculopathy inayohusiana na VVU. ART na viral suppression inapunguza lakini haitoi hatari hii ya ziada. Stroke kwa mtu mzima mdogo wa Kitanzania inapaswa kila wakati kusababisha upimaji wa VVU.',
        sw_mtaa: 'HIV inaraise stroke risk katika younger ages via accelerated vascular disease, opportunistic CNS infections, na HIV-associated vasculopathy. ART na viral suppression inareduce lakini haieliminate excess risk. Stroke kwa young Tanzanian adult inapaswa kila wakati kutrigger HIV testing.',
      },
    },
    {
      coCondition: 'sickle_cell',
      note: {
        en: 'Sickle cell disease is a major preventable cause of stroke in Tanzanian children and young adults — silent strokes are also common. Transcranial Doppler screening in childhood identifies high-risk patients; chronic transfusion programmes prevent stroke in those identified. Hydroxyurea reduces stroke risk in untransfused patients.',
        sw: 'Ugonjwa wa selimundu ni sababu kubwa inayoweza kuzuilika ya stroke katika watoto wa Kitanzania na watu wazima wadogo — strokes za kimya pia ni za kawaida. Uchunguzi wa Transcranial Doppler utotoni hutambua wagonjwa wenye hatari kubwa; programu za kuongezewa damu sugu zinazuia stroke katika wale waliotambuliwa. Hydroxyurea inapunguza hatari ya stroke katika wagonjwa wasiopata transfusion.',
        sw_mtaa: 'Sickle cell disease ni major preventable cause ya stroke katika Tanzanian children na young adults — silent strokes pia ni common. Transcranial Doppler screening katika childhood inatambua high-risk patients; chronic transfusion programmes zinazuia stroke katika wale waliotambuliwa. Hydroxyurea inareduce stroke risk katika untransfused patients.',
      },
    },
  ],

  sources: [
    src('WHO_PEN_2020'),
    src('WHO_HEARTS_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NACP_ART_2024'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
