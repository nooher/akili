/**
 * Sickle Cell Disease — Full Condition Knowledge (Phase 13)
 *
 * Sources: WHO Sickle Cell SSA 2024, Muhimbili Sickle Cell Programme (NORTAB),
 *          NTLG STG 2023, NMCP Malaria 2024 (lifelong prophylaxis), Cochrane,
 *          BNF/EMC.
 *
 * GOVERNANCE: DRAFT — pending clinical review.
 *
 * Tanzania-specific framing:
 *   Tanzania has one of the world's highest sickle cell prevalences: ~13% of
 *   the population are sickle cell trait carriers, and ~1-2% have full
 *   disease. Muhimbili National Hospital runs a flagship sickle cell
 *   programme. Critical SCD facts every TZ patient should know:
 *   - LIFELONG malaria prophylaxis (proguanil) — falciparum is a major
 *     cause of mortality in SCD children
 *   - Penicillin V prophylaxis in childhood (functional asplenia)
 *   - All routine vaccines plus pneumococcal + meningococcal
 *   - Hydroxyurea is the disease-modifying drug; increasingly available
 *   - Acute chest syndrome and vaso-occlusive crisis are the two
 *     emergency presentations every family must recognise
 *   - Hydration + analgesia + warmth + early infection treatment save lives
 *
 * Coverage (via variants):
 *   • vaso_occlusive_crisis — the painful crisis
 *   • acute_chest_syndrome — the highest-mortality SCD complication
 */

import { ConditionKnowledge } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';
import { SICKLE_CELL_VARIANTS } from './sickle_cell.variants';

export const SICKLE_CELL: ConditionKnowledge = {
  id: 'sickle_cell',
  aliases: CONDITION_ALIASES.sickle_cell ?? { canonical_en: 'Sickle Cell Disease', canonical_sw: 'Ugonjwa wa Selimundu', en: [], sw: [], sw_mtaa: [], slang: [] },
  category: 'hematologic',

  whatItIs: {
    en: 'Sickle cell disease (SCD) is an inherited disorder of haemoglobin — the protein in red blood cells that carries oxygen. In SCD, an abnormal haemoglobin (HbS) makes red blood cells stiff and shaped like a sickle (a curved farming knife) instead of round. These sickled cells get stuck in small blood vessels, causing pain (vaso-occlusive crisis), organ damage, and anaemia. The disease is inherited — a child gets one HbS gene from each parent. Sickle cell TRAIT (one gene only) usually causes no symptoms but the person can pass the gene to children. Tanzania has one of the highest sickle cell prevalences in the world — about 13% of the population are carriers, and 1-2% have the disease itself. With consistent care — daily folic acid, malaria prophylaxis, infection prevention, hydroxyurea where indicated — most patients live productive adult lives.',
    sw: 'Ugonjwa wa selimundu (SCD) ni ugonjwa wa kurithi wa hemoglobini — protini katika seli nyekundu za damu inayobeba oksijeni. Katika SCD, hemoglobini isiyo ya kawaida (HbS) hufanya seli nyekundu za damu kuwa ngumu na umbo la mundu (kisu cha kupinda cha kilimo) badala ya mviringo. Seli hizi za mundu hukwama katika mishipa midogo ya damu, kusababisha maumivu (mzozo wa kuziba mishipa), uharibifu wa viungo, na upungufu wa damu. Ugonjwa unarithiwa — mtoto hupata jeni moja la HbS kutoka kwa kila mzazi. Trait ya selimundu (jeni moja tu) kawaida haileti dalili lakini mtu anaweza kupitisha jeni kwa watoto. Tanzania ina mojawapo ya prevalence ya juu zaidi ya selimundu duniani — takriban 13% ya watu ni wabebaji, na 1-2% wana ugonjwa wenyewe. Kwa huduma thabiti — folic acid kila siku, prophylaxis ya malaria, kuzuia maambukizi, hydroxyurea pale inapoonyeshwa — wagonjwa wengi huishi maisha ya watu wazima yenye uzalishaji.',
    sw_mtaa: 'Sickle cell disease (SCD) ni inherited disorder ya haemoglobin — protein katika red blood cells inayobeba oxygen. Katika SCD, abnormal haemoglobin (HbS) inafanya red blood cells kuwa stiff na shaped kama sickle (kisu cha mundu) badala ya round. Sickled cells hizi zinakwama katika small blood vessels, kusababisha pain (vaso-occlusive crisis), organ damage, na anaemia. Disease inarithiwa — mtoto anapata one HbS gene from kila parent. Sickle cell TRAIT (gene moja tu) kawaida haisababishi symptoms lakini mtu anaweza kupass gene kwa watoto. Tanzania ina mojawapo ya highest sickle cell prevalences duniani — about 13% ya population ni carriers, na 1-2% wana disease yenyewe. Na consistent care — daily folic acid, malaria prophylaxis, infection prevention, hydroxyurea pale inavyoonyeshwa — most patients wanaishi productive adult lives.',
  },

  whyItMatters: {
    en: 'Sickle cell disease is one of Tanzania\'s most common inherited illnesses, and unrecognised or untreated SCD remains a leading cause of childhood death in high-prevalence regions. Three things change outcomes the most. First, screening — newborn screening where available, or testing in any child with unexplained recurrent pain, severe anaemia, or recurrent infections. Second, malaria prophylaxis with proguanil (or alternative per local policy) is LIFELONG in SCD because falciparum malaria can be rapidly fatal in these patients. Third, recognising the two emergencies: vaso-occlusive crisis (severe pain that needs strong analgesia and hydration) and acute chest syndrome (chest pain + breathlessness + new lung infiltrate — high mortality without urgent care). Families with one SCD child often have other children also at risk; genetic counselling matters. Pregnancy planning matters. Daily folic acid, infection prevention, and adherence to clinic visits at the sickle cell programme add years of life.',
    sw: 'Ugonjwa wa selimundu ni mojawapo ya magonjwa ya kurithi yanayotokea sana Tanzania, na SCD isiyotambuliwa au isiyotibiwa inabaki kuwa sababu kuu ya kifo cha utotoni katika mikoa yenye prevalence kubwa. Mambo matatu hubadilisha matokeo zaidi. Kwanza, uchunguzi — uchunguzi wa watoto wachanga pale unapopatikana, au upimaji wa mtoto yeyote mwenye maumivu ya mara kwa mara yasiyojulikana, upungufu mkali wa damu, au maambukizi ya mara kwa mara. Pili, prophylaxis ya malaria na proguanil (au mbadala kulingana na sera ya ndani) ni YA MAISHA katika SCD kwa sababu malaria ya falciparum inaweza kuua haraka katika wagonjwa hawa. Tatu, kutambua dharura mbili: mzozo wa kuziba mishipa (maumivu makali yanayohitaji analgesia kali na maji) na ugonjwa wa kifua wa papo hapo (maumivu ya kifua + kushindwa kupumua + uwiano mpya wa mapafu — vifo vingi bila huduma ya haraka). Familia zenye mtoto mmoja wa SCD mara nyingi wana watoto wengine pia katika hatari; ushauri wa kijenetiki ni muhimu. Mipango ya mimba ni muhimu. Folic acid kila siku, kuzuia maambukizi, na kufuata ziara za kliniki katika programu ya selimundu vinaongeza miaka ya maisha.',
    sw_mtaa: 'SCD ni mojawapo ya most common inherited illnesses Tanzania, na unrecognised au untreated SCD inabaki leading cause ya childhood death katika high-prevalence regions. Three things zinabadilisha outcomes most. First, screening — newborn screening pale inapopatikana, au testing kwa mtoto yeyote mwenye unexplained recurrent pain, severe anaemia, au recurrent infections. Second, malaria prophylaxis na proguanil (au alternative per local policy) ni LIFELONG katika SCD kwa sababu falciparum malaria inaweza kuua rapidly katika wagonjwa hawa. Third, kurecognise emergencies mbili: vaso-occlusive crisis (severe pain inayohitaji strong analgesia na hydration) na acute chest syndrome (chest pain + breathlessness + new lung infiltrate — high mortality bila urgent care). Families zenye one SCD child mara nyingi wana other children pia at risk; genetic counselling ni muhimu. Pregnancy planning ni muhimu. Daily folic acid, infection prevention, na adherence kwa clinic visits kwenye sickle cell programme zinaongeza years of life.',
  },

  commonQuestions: [
    {
      q: { en: 'What is sickle cell disease?', sw: 'Ugonjwa wa selimundu ni nini?' },
      a: {
        en: 'Sickle cell disease is an inherited blood disorder where the red blood cells become hard and curved (like a sickle) instead of round and flexible. The curved cells get stuck in blood vessels, causing pain, anaemia, and over time damage to organs. It is inherited from both parents. In Tanzania about 13% of people carry one sickle gene (sickle cell trait — no symptoms) and 1-2% inherit two copies and have the disease.',
        sw: 'Ugonjwa wa selimundu ni ugonjwa wa damu wa kurithi ambapo seli nyekundu za damu huwa ngumu na zilizopinda (kama mundu) badala ya mviringo na zinazoweza kuinama. Seli zilizopinda hukwama katika mishipa ya damu, kusababisha maumivu, upungufu wa damu, na baada ya muda uharibifu wa viungo. Hurithiwa kutoka kwa wazazi wote wawili. Tanzania takriban 13% ya watu hubeba jeni moja la selimundu (trait — hakuna dalili) na 1-2% hurithi nakala mbili na wana ugonjwa.',
        sw_mtaa: 'Sickle cell disease ni inherited blood disorder ambapo red blood cells zinakuwa hard na curved (kama sickle) badala ya round na flexible. Curved cells zinakwama katika blood vessels, zinasababisha pain, anaemia, na over time damage kwa organs. Inarithiwa kutoka kwa both parents. Tanzania about 13% ya watu wanabeba one sickle gene (sickle cell trait — hakuna symptoms) na 1-2% wanarithi two copies na wana disease.',
      },
    },
    {
      q: { en: 'Why does sickle cell cause pain?', sw: 'Kwa nini selimundu inasababisha maumivu?' },
      a: {
        en: 'When red blood cells sickle, they become rigid and stick to each other and to blood vessel walls. They block the small blood vessels, stopping oxygen reaching the tissues downstream. That oxygen-starved tissue gives the deep, throbbing pain of a sickle cell crisis — often in the bones, chest, back, or abdomen. Triggers include cold, dehydration, infection, low oxygen (high altitude), and stress. Treating a crisis early with hydration, warmth, and strong painkillers shortens the pain and prevents complications.',
        sw: 'Wakati seli nyekundu za damu zinapinda, huwa ngumu na hukwama kwa nyingine na kwa kuta za mishipa ya damu. Huziba mishipa midogo ya damu, kusimamisha oksijeni kufikia tishu nyuma. Tishu hiyo iliyokosa oksijeni hutoa maumivu makali, ya kupiga ya mzozo wa selimundu — mara nyingi mifupani, kifuani, mgongoni, au tumboni. Vichocheo ni pamoja na baridi, kukosa maji, maambukizi, oksijeni ya chini (urefu wa juu), na mfadhaiko. Kutibu mzozo mapema na maji, joto, na dawa kali za maumivu hupunguza maumivu na huzuia matatizo.',
        sw_mtaa: 'Wakati red blood cells zina-sickle, zinakuwa rigid na zinakwama kwa nyingine na kwa blood vessel walls. Zinablock small blood vessels, kusimamisha oxygen kufikia tissues downstream. Hiyo oxygen-starved tissue inatoa deep, throbbing pain ya sickle cell crisis — mara nyingi katika bones, chest, back, au abdomen. Triggers ni pamoja na cold, dehydration, infection, low oxygen (high altitude), na stress. Kutreating crisis early na hydration, warmth, na strong painkillers kunashortenпa pain na kuzuia complications.',
      },
    },
    {
      q: { en: 'Why do sickle cell patients need lifelong malaria prophylaxis?', sw: 'Kwa nini wagonjwa wa selimundu wanahitaji prophylaxis ya malaria ya maisha?' },
      a: {
        en: 'Falciparum malaria is one of the most dangerous infections in sickle cell disease. The spleen — normally the body\'s filter for old or infected red blood cells — is damaged from a young age in SCD (functional asplenia). That means malaria can cause overwhelming, rapidly fatal disease in someone with SCD. For this reason, Tanzanian SCD patients take LIFELONG malaria prophylaxis — usually proguanil daily — and also sleep under insecticide-treated nets and clear standing water around the home. Even with prophylaxis, any fever in a sickle cell patient needs urgent malaria testing and treatment, not just observation.',
        sw: 'Malaria ya falciparum ni mojawapo ya maambukizi hatari zaidi katika ugonjwa wa selimundu. Wengu — kawaida kichujio cha mwili kwa seli nyekundu za damu zilizozeeka au zilizoambukizwa — umeharibika kutoka umri mdogo katika SCD (functional asplenia). Hiyo inamaanisha malaria inaweza kusababisha ugonjwa wa kushinda, unaouua haraka katika mtu mwenye SCD. Kwa sababu hii, wagonjwa wa SCD wa Tanzania huchukua prophylaxis ya malaria YA MAISHA — kawaida proguanil kila siku — na pia hulala chini ya neti zilizo na dawa ya kuua wadudu na husafisha maji yaliyosimama karibu na nyumba. Hata na prophylaxis, homa yoyote katika mgonjwa wa selimundu inahitaji upimaji wa haraka wa malaria na matibabu, sio uchunguzi tu.',
        sw_mtaa: 'Falciparum malaria ni mojawapo ya most dangerous infections katika sickle cell disease. Spleen — normally body\'s filter kwa old au infected red blood cells — imeharibika kutoka young age katika SCD (functional asplenia). Hiyo inamaanisha malaria inaweza kusababisha overwhelming, rapidly fatal disease katika mtu mwenye SCD. Kwa sababu hii, Tanzanian SCD patients wanachukua LIFELONG malaria prophylaxis — kawaida proguanil kila siku — na pia wanalala chini ya insecticide-treated nets na wanaclear standing water karibu na nyumba. Hata na prophylaxis, fever yoyote katika sickle cell patient inahitaji urgent malaria testing na treatment, sio just observation.',
      },
    },
    {
      q: { en: 'What is hydroxyurea?', sw: 'Hydroxyurea ni nini?' },
      a: {
        en: 'Hydroxyurea is a medicine that reduces the severity and frequency of sickle cell crises. It works by increasing fetal haemoglobin (HbF), which does not sickle — so the red blood cells contain a mix of sickling and non-sickling haemoglobin, and behave better. Patients on hydroxyurea have fewer pain crises, fewer hospital admissions, less acute chest syndrome, and live longer. Side effects include lowering of blood counts (so regular blood tests are needed), and it should not be used in pregnancy. In Tanzania hydroxyurea availability has improved through Muhimbili and other major centres. Discuss with your sickle cell clinic whether you or your child should start it.',
        sw: 'Hydroxyurea ni dawa inayopunguza ukali na marudio ya mzozo wa selimundu. Hufanya kazi kwa kuongeza hemoglobini ya fetasi (HbF), ambayo haipindi — kwa hiyo seli nyekundu za damu zina mchanganyiko wa hemoglobini ya kupinda na isiyo ya kupinda, na hutenda vyema zaidi. Wagonjwa wanaotumia hydroxyurea wana mzozo wa maumivu michache, kulazwa hospitalini kidogo, ugonjwa wa kifua wa papo hapo kidogo, na huishi muda mrefu zaidi. Athari ni pamoja na kupunguza hesabu ya damu (kwa hiyo vipimo vya damu vya kawaida vinahitajika), na haipaswi kutumika katika mimba. Tanzania upatikanaji wa hydroxyurea umeboreshwa kupitia Muhimbili na vituo vingine vikuu. Jadili na kliniki yako ya selimundu kama wewe au mtoto wako anapaswa kuianza.',
        sw_mtaa: 'Hydroxyurea ni dawa inayoreduce severity na frequency ya sickle cell crises. Inafanya kazi kwa kuongeza fetal haemoglobin (HbF), ambayo hai-sickle — kwa hiyo red blood cells zina mix ya sickling na non-sickling haemoglobin, na zinabehave better. Patients on hydroxyurea wana fewer pain crises, fewer hospital admissions, less acute chest syndrome, na wanaishi longer. Side effects ni pamoja na lowering ya blood counts (kwa hiyo regular blood tests zinahitajika), na haipaswi kutumika katika pregnancy. Tanzania hydroxyurea availability imeimprove kupitia Muhimbili na other major centres. Discuss na sickle cell clinic yako whether wewe au mtoto wako anapaswa kuianza.',
      },
    },
    {
      q: { en: 'Can sickle cell patients have children?', sw: 'Wagonjwa wa selimundu wanaweza kuwa na watoto?' },
      a: {
        en: 'Yes, but it needs planning. Pregnancy in SCD is higher risk for both mother and baby — more crises, more infection risk, more pre-eclampsia, higher chance of preterm or low birth weight babies. With early antenatal booking, joint care between obstetrics and the sickle cell clinic, daily folic acid (5 mg in pregnancy, not the usual prenatal 0.4 mg), malaria prophylaxis (the safer regimens in pregnancy), VTE prevention where indicated, and stopping hydroxyurea before pregnancy, most SCD mothers deliver healthy babies. Partner testing tells you the chance of having a child with SCD: if your partner has trait, every pregnancy has a 50% chance of trait and 50% chance of disease. Genetic counselling is part of pre-pregnancy care.',
        sw: 'Ndio, lakini inahitaji mipango. Mimba katika SCD ni hatari kubwa kwa mama na mtoto — mzozo mwingi zaidi, hatari kubwa ya maambukizi, pre-eclampsia zaidi, nafasi kubwa ya watoto wa mapema au wenye uzito mdogo. Kwa kuandikishwa mapema kwenye ANC, huduma ya pamoja kati ya uzazi na kliniki ya selimundu, folic acid kila siku (5 mg katika mimba, sio 0.4 mg ya kawaida), prophylaxis ya malaria (regimens salama zaidi katika mimba), kuzuia VTE pale inapoonyeshwa, na kusimamisha hydroxyurea kabla ya mimba, akina mama wengi wa SCD huzaa watoto wenye afya. Upimaji wa mwenza unakuambia nafasi ya kuwa na mtoto mwenye SCD: ikiwa mwenza wako ana trait, kila mimba ina nafasi ya 50% ya trait na 50% ya ugonjwa. Ushauri wa kijenetiki ni sehemu ya huduma ya kabla ya mimba.',
        sw_mtaa: 'Ndio, lakini inahitaji planning. Pregnancy katika SCD ni higher risk kwa mother na baby — more crises, more infection risk, more pre-eclampsia, higher chance ya preterm au low birth weight babies. Na early antenatal booking, joint care between obstetrics na sickle cell clinic, daily folic acid (5 mg katika pregnancy, sio usual 0.4 mg), malaria prophylaxis (safer regimens katika pregnancy), VTE prevention pale inapoonyeshwa, na kusimamisha hydroxyurea kabla ya pregnancy, most SCD mothers wanazaa healthy babies. Partner testing inakuambia chance ya kuwa na child mwenye SCD: ikiwa partner wako ana trait, kila pregnancy ina 50% chance ya trait na 50% chance ya disease. Genetic counselling ni sehemu ya pre-pregnancy care.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take daily folic acid (5 mg in adults and children with SCD) for life — it supports red cell production.',
      sw: 'Chukua folic acid kila siku (5 mg kwa watu wazima na watoto wenye SCD) kwa maisha — husaidia uzalishaji wa seli nyekundu.',
      sw_mtaa: 'Chukua daily folic acid (5 mg kwa adults na watoto wenye SCD) kwa life — inasupport red cell production.',
    },
    {
      en: 'Take your malaria prophylaxis every day for life. Sleep under an insecticide-treated bednet. Clear standing water around the home.',
      sw: 'Chukua prophylaxis yako ya malaria kila siku kwa maisha. Lala chini ya neti yenye dawa ya kuua wadudu. Safisha maji yaliyosimama karibu na nyumba.',
      sw_mtaa: 'Chukua malaria prophylaxis yako kila siku kwa life. Lala chini ya insecticide-treated bednet. Clear standing water karibu na nyumba.',
    },
    {
      en: 'Drink plenty of water — dehydration is one of the commonest triggers of a crisis. Aim for clear urine throughout the day.',
      sw: 'Kunywa maji mengi — kukosa maji ni mojawapo ya vichocheo vya kawaida zaidi vya mzozo. Lenga mkojo safi siku nzima.',
      sw_mtaa: 'Kunywa maji mengi — dehydration ni mojawapo ya commonest triggers ya crisis. Lenga clear urine siku nzima.',
    },
    {
      en: 'Stay warm. Cold exposure triggers crises. In cool weather, wear extra layers and avoid swimming in cold water.',
      sw: 'Endelea kuwa joto. Mfiduo wa baridi husababisha mzozo. Katika hali ya hewa baridi, vaa nguo za ziada na epuka kuogelea katika maji baridi.',
      sw_mtaa: 'Stay warm. Cold exposure inatrigger crises. Katika cool weather, vaa extra layers na epuka kuogelea katika cold water.',
    },
    {
      en: 'Treat any fever immediately. Fever in a sickle cell patient is a medical emergency until malaria and serious infection are ruled out.',
      sw: 'Tibu homa yoyote mara moja. Homa katika mgonjwa wa selimundu ni dharura ya matibabu hadi malaria na maambukizi makali yatakaposhindwa.',
      sw_mtaa: 'Treat any fever immediately. Fever katika sickle cell patient ni medical emergency until malaria na serious infection zita-ruled out.',
    },
    {
      en: 'Get all routine vaccinations plus pneumococcal vaccine, meningococcal vaccine, and annual influenza vaccine — these protect against the infections SCD patients are most vulnerable to.',
      sw: 'Pata chanjo zote za kawaida pamoja na chanjo ya pneumococcal, chanjo ya meningococcal, na chanjo ya influenza ya kila mwaka — hizi hulinda dhidi ya maambukizi ambayo wagonjwa wa SCD wako katika hatari zaidi.',
      sw_mtaa: 'Pata routine vaccinations zote plus pneumococcal vaccine, meningococcal vaccine, na annual influenza vaccine — hizi zinalinda dhidi ya infections ambazo SCD patients wako vulnerable zaidi.',
    },
    {
      en: 'Attend your sickle cell clinic regularly even when you feel well. Many complications (kidney damage, retinopathy, pulmonary hypertension, leg ulcers) develop silently before symptoms appear.',
      sw: 'Hudhuria kliniki yako ya selimundu mara kwa mara hata unapojihisi vizuri. Matatizo mengi (uharibifu wa figo, retinopathy, pulmonary hypertension, vidonda vya miguu) hukua kimya kabla dalili kujitokeza.',
      sw_mtaa: 'Hudhuria sickle cell clinic yako regularly hata unapojihisi vizuri. Many complications (kidney damage, retinopathy, pulmonary hypertension, leg ulcers) zinakua silently kabla symptoms kuappear.',
    },
    {
      en: 'In children, parents should learn to feel the spleen — a sudden enlarging spleen (splenic sequestration) is a life-threatening emergency in young children with SCD.',
      sw: 'Kwa watoto, wazazi wanapaswa kujifunza kupapasa wengu — wengu unaokua kwa ghafla (splenic sequestration) ni dharura ya kutishia maisha katika watoto wadogo wenye SCD.',
      sw_mtaa: 'Katika watoto, parents wanapaswa kujifunza kufeel spleen — sudden enlarging spleen (splenic sequestration) ni life-threatening emergency katika young children wenye SCD.',
    },
  ],

  warningTriggers: [
    { en: 'Dehydration — not drinking enough, especially in hot weather or with vomiting/diarrhoea', sw: 'Kukosa maji — kutonywa vya kutosha, hasa katika hali ya hewa ya joto au na kutapika/kuhara', sw_mtaa: 'Dehydration — kutonywa enough, especially katika hot weather au na vomiting/diarrhoea' },
    { en: 'Cold exposure — cold air, cold water swimming, sudden temperature drops', sw: 'Mfiduo wa baridi — hewa baridi, kuogelea katika maji baridi, kushuka ghafla kwa joto', sw_mtaa: 'Cold exposure — cold air, cold water swimming, sudden temperature drops' },
    { en: 'Infections — especially malaria, pneumonia, urinary tract infection', sw: 'Maambukizi — hasa malaria, nimonia, maambukizi ya njia ya mkojo', sw_mtaa: 'Infections — especially malaria, pneumonia, UTI' },
    { en: 'Stress, physical or emotional', sw: 'Mfadhaiko, wa kimwili au wa kihisia', sw_mtaa: 'Stress, physical au emotional' },
    { en: 'Low oxygen — high altitude flights, mountain travel, unpressurised aircraft', sw: 'Oksijeni ya chini — safari za urefu wa juu, kusafiri milimani, ndege zisizo na shinikizo', sw_mtaa: 'Low oxygen — high altitude flights, mountain travel, unpressurised aircraft' },
  ],

  whenToSeekCare: [
    { sign: { en: 'Severe pain not relieved by usual home painkillers within 1-2 hours', sw: 'Maumivu makali yasiyopungua na dawa za nyumbani za maumivu ndani ya masaa 1-2', sw_mtaa: 'Severe pain not relieved na usual home painkillers within masaa 1-2' }, urgency: 'urgent' },
    { sign: { en: 'Fever (≥38°C) — always urgent in SCD, exclude malaria and sepsis', sw: 'Homa (≥38°C) — daima ya haraka katika SCD, toa malaria na sepsis', sw_mtaa: 'Fever (≥38°C) — always urgent katika SCD, exclude malaria na sepsis' }, urgency: 'urgent' },
    { sign: { en: 'Chest pain, breathlessness, cough, or low SpO2 — possible acute chest syndrome, emergency', sw: 'Maumivu ya kifua, kushindwa kupumua, kikohozi, au SpO2 ya chini — uwezekano wa ugonjwa wa kifua wa papo hapo, dharura', sw_mtaa: 'Chest pain, breathlessness, cough, au low SpO2 — possible acute chest syndrome, emergency' }, urgency: 'emergency' },
    { sign: { en: 'Sudden severe abdominal pain or enlarging belly (splenic sequestration in children) — emergency', sw: 'Maumivu makali ya tumbo ya ghafla au tumbo linaloongezeka (splenic sequestration kwa watoto) — dharura', sw_mtaa: 'Sudden severe abdominal pain au enlarging belly (splenic sequestration katika watoto) — emergency' }, urgency: 'emergency' },
    { sign: { en: 'Stroke symptoms — sudden weakness, slurred speech, facial droop — SCD raises stroke risk significantly, especially in children', sw: 'Dalili za kiharusi — udhaifu wa ghafla, kuongea visivyo, kushuka kwa uso — SCD inaongeza hatari ya kiharusi sana, hasa kwa watoto', sw_mtaa: 'Stroke symptoms — sudden weakness, slurred speech, facial droop — SCD inaraise stroke risk significantly, especially katika watoto' }, urgency: 'emergency' },
    { sign: { en: 'Priapism (painful prolonged erection > 4 hours) — urological emergency', sw: 'Priapism (kusimama kwa uchungu kwa muda mrefu > masaa 4) — dharura ya urology', sw_mtaa: 'Priapism (painful prolonged erection > masaa 4) — urological emergency' }, urgency: 'emergency' },
    { sign: { en: 'Pale, very weak, fast heart rate — possible aplastic crisis or severe anaemia', sw: 'Rangi ya kufifia, dhaifu sana, mapigo ya haraka ya moyo — uwezekano wa mzozo wa aplastic au upungufu mkali wa damu', sw_mtaa: 'Pale, very weak, fast heart rate — possible aplastic crisis au severe anaemia' }, urgency: 'urgent' },
  ],

  comorbidityNotes: [
    {
      coCondition: 'malaria',
      note: {
        en: 'Falciparum malaria in SCD is a life-threatening emergency — the spleen damage of SCD removes a key defence against it. Lifelong prophylaxis (proguanil) is standard. Any fever in SCD needs immediate malaria testing AND empirical treatment if testing is delayed.',
        sw: 'Malaria ya falciparum katika SCD ni dharura inayotishia maisha — uharibifu wa wengu wa SCD huondoa ulinzi muhimu dhidi yake. Prophylaxis ya maisha (proguanil) ni ya kawaida. Homa yoyote katika SCD inahitaji upimaji wa haraka wa malaria NA matibabu ya kibahati ikiwa upimaji umechelewa.',
        sw_mtaa: 'Falciparum malaria katika SCD ni life-threatening emergency — spleen damage ya SCD inaondoa key defence dhidi yake. Lifelong prophylaxis (proguanil) ni standard. Fever yoyote katika SCD inahitaji immediate malaria testing AND empirical treatment ikiwa testing imedelayed.',
      },
    },
    {
      coCondition: 'pneumonia',
      note: {
        en: 'Pneumococcal infection is the classic killer in SCD (functional asplenia from early childhood). Lifelong pneumococcal vaccination + penicillin V prophylaxis in young children + low threshold to treat any chest infection. Pneumonia and acute chest syndrome can look identical and overlap — treat both.',
        sw: 'Maambukizi ya pneumococcal ni mwuaji wa kawaida katika SCD (functional asplenia kutoka utoto wa mapema). Chanjo ya pneumococcal ya maisha + prophylaxis ya penicillin V kwa watoto wadogo + kizingiti cha chini cha kutibu maambukizi yoyote ya kifua. Nimonia na ugonjwa wa kifua wa papo hapo zinaweza kuonekana sawa na huingiliana — tibu vyote.',
        sw_mtaa: 'Pneumococcal infection ni classic killer katika SCD (functional asplenia kutoka early childhood). Lifelong pneumococcal vaccination + penicillin V prophylaxis katika young children + low threshold to treat chest infection yoyote. Pneumonia na acute chest syndrome zinaweza kuonekana identical na overlap — treat both.',
      },
    },
    {
      coCondition: 'maternal_care',
      note: {
        en: 'Pregnancy in SCD requires joint obstetric and haematology care from early in the first trimester. Pre-eclampsia rates are higher, preterm delivery is common, VTE risk is raised. Hydroxyurea is stopped before pregnancy. Folic acid is increased to 5 mg daily. Discuss family planning between pregnancies to allow recovery.',
        sw: 'Mimba katika SCD inahitaji huduma ya pamoja ya uzazi na hematology kutoka mapema katika trimester ya kwanza. Viwango vya pre-eclampsia ni juu zaidi, kuzaa mapema ni kawaida, hatari ya VTE imeongezeka. Hydroxyurea inasimamishwa kabla ya mimba. Folic acid inaongezwa hadi 5 mg kila siku. Jadili upangaji wa familia kati ya mimba ili kuruhusu kupona.',
        sw_mtaa: 'Pregnancy katika SCD inahitaji joint obstetric na haematology care kutoka early katika first trimester. Pre-eclampsia rates ni higher, preterm delivery ni common, VTE risk ime-raised. Hydroxyurea inasimamishwa kabla ya pregnancy. Folic acid inaongezwa hadi 5 mg daily. Discuss family planning between pregnancies kuruhusu recovery.',
      },
    },
    {
      coCondition: 'ckd',
      note: {
        en: 'Sickle cell nephropathy — kidney damage from repeated sickling in the kidney medulla — develops silently and affects most SCD patients by adulthood. Annual urine protein and creatinine checks at the sickle cell clinic. ACE-i may slow progression. Avoid NSAIDs (kidney-toxic) for chronic pain in SCD where possible.',
        sw: 'Sickle cell nephropathy — uharibifu wa figo kutoka kupinda mara kwa mara katika medulla ya figo — hukua kimya na huathiri wagonjwa wengi wa SCD wakati wa utu uzima. Vipimo vya protini ya mkojo na creatinine vya kila mwaka katika kliniki ya selimundu. ACE-i inaweza kupunguza kasi. Epuka NSAID (zenye sumu kwa figo) kwa maumivu sugu katika SCD pale inapowezekana.',
        sw_mtaa: 'Sickle cell nephropathy — kidney damage kutoka repeated sickling katika kidney medulla — inakua silently na inaaffect most SCD patients by adulthood. Annual urine protein na creatinine checks katika sickle cell clinic. ACE-i inaweza kupunguza progression. Epuka NSAIDs (kidney-toxic) kwa chronic pain katika SCD pale inapowezekana.',
      },
    },
  ],

  variants: SICKLE_CELL_VARIANTS,

  sources: [
    src('WHO_SICKLE_2024'),
    src('NORTAB_SICKLE_2023'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
    src('NMCP_MALARIA_2024'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
