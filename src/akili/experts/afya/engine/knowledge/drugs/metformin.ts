/**
 * Metformin — Drug Knowledge
 *
 * Sources: BNF, EMC, ADA Standards 2024, WHO Essential Medicines, NTLG STG 2023.
 *
 * GOVERNANCE: DRAFT — pending clinical review.
 *
 * Note on alcohol interaction:
 *   - Metformin + alcohol risk = lactic acidosis (rare, but serious)
 *   - Risk rises with heavy/binge drinking, dehydration, liver disease, kidney disease
 *   - Moderate occasional drinking in stable patients is generally tolerable
 *     (this is the actual evidence-based position; BNF/EMC reflect this)
 *   - But we do NOT say "you can drink" — we explain the risk and defer to doctor.
 */

import { DrugKnowledge } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const METFORMIN: DrugKnowledge = {
  id: 'metformin',
  aliases: DRUG_ALIASES.metformin,
  drugClass: {
    en: 'Biguanide (oral medicine for type 2 diabetes)',
    sw: 'Biguanide (dawa ya kumeza kwa kisukari aina ya 2)',
  },

  whatItDoes: {
    en: 'Metformin helps your body respond better to insulin and reduces the amount of sugar your liver releases into the blood. It does not push your body to make more insulin — that is why it almost never causes very low blood sugar on its own.',
    sw: 'Metformin husaidia mwili wako kuitikia vizuri zaidi kwa insulin na hupunguza kiasi cha sukari ambacho ini lako linatoa kwenye damu. Haisukumi mwili kutengeneza insulin zaidi — ndiyo maana karibu haisababishi sukari ya chini sana ikiwa peke yake.',
    sw_mtaa: 'Metformin inasaidia mwili wako kufanya kazi vizuri na insulin yako mwenyewe, na inapunguza sukari inayotoka ini kwenda kwenye damu. Haifanyi mwili utengeneze insulin zaidi — ndio maana haisababishi sukari ya chini ukiwa peke yake.',
  },

  commonUses: [
    {
      en: 'Type 2 diabetes — usually the first medicine prescribed after diagnosis.',
      sw: 'Kisukari aina ya 2 — kwa kawaida dawa ya kwanza inayotolewa baada ya utambuzi.',
      sw_mtaa: 'Kisukari aina ya 2 — kwa kawaida ni dawa ya kwanza unayoanza nayo.',
    },
    {
      en: 'Pre-diabetes — sometimes prescribed to prevent progression, especially with risk factors.',
      sw: 'Pre-diabetes — wakati mwingine inatolewa kuzuia maendeleo, hasa pamoja na sababu za hatari.',
      sw_mtaa: 'Pre-diabetes — wakati mwingine inatolewa kuzuia usife na kisukari.',
    },
    {
      en: 'Polycystic ovary syndrome (PCOS) — to improve insulin response and sometimes help with fertility.',
      sw: 'PCOS (Polycystic ovary syndrome) — kuboresha mwitikio wa insulin na wakati mwingine kusaidia uwezo wa kupata mimba.',
      sw_mtaa: 'PCOS — kuboresha insulin na wakati mwingine kusaidia kupata mimba.',
    },
  ],

  howItIsTaken: {
    en: 'Metformin is taken by mouth, usually with food to reduce stomach upset. Doctors typically start with a low dose and increase it slowly over weeks. Always follow your doctor\'s exact instructions — dose depends on your kidney function, other medicines, and your blood sugar response.',
    sw: 'Metformin inakunywa kwa mdomo, kwa kawaida na chakula ili kupunguza usumbufu wa tumbo. Madaktari kwa kawaida huanza na dose ndogo na kuongeza polepole kwa wiki kadhaa. Daima fuata maagizo halisi ya daktari wako — dose inategemea utendaji wa figo zako, dawa zingine, na mwitikio wa sukari yako ya damu.',
    sw_mtaa: 'Metformin unakunywa kwa mdomo, kwa kawaida pamoja na chakula ili usisumbue tumbo. Madaktari huanza na dose ndogo na kuongeza polepole. Fuata maagizo ya daktari wako — dose inategemea figo zako, dawa zingine, na sukari yako.',
  },

  commonSideEffects: [
    {
      en: 'Stomach upset, nausea, loose stools — especially in the first 2-4 weeks. Usually improves as your body adjusts.',
      sw: 'Usumbufu wa tumbo, kichefuchefu, kuhara — hasa wiki 2-4 za mwanzo. Kwa kawaida huboreka mwili unapozoea.',
      sw_mtaa: 'Tumbo kusumbua, kichefuchefu, kuhara — hasa wiki 2-4 za mwanzo. Mwili unazoea, hupunguza.',
    },
    {
      en: 'A metallic taste in the mouth — annoying but harmless.',
      sw: 'Ladha ya metali mdomoni — inakera lakini sio madhara.',
      sw_mtaa: 'Ladha ya chuma mdomoni — inakera tu, sio hatari.',
    },
    {
      en: 'Reduced appetite — some people lose a little weight, which is usually welcome.',
      sw: 'Hamu ya chakula kupungua — watu wengine hupunguza uzito kidogo, ambalo kwa kawaida ni jambo zuri.',
      sw_mtaa: 'Hamu ya kula kupungua — wengine hupunguza uzito kidogo, kitu zuri kwa wengi.',
    },
    {
      en: 'Low vitamin B12 over years of use — your doctor may check this periodically.',
      sw: 'Vitamin B12 ya chini baada ya miaka mingi ya matumizi — daktari wako anaweza kuangalia hili mara kwa mara.',
      sw_mtaa: 'Vitamin B12 kupungua ukitumia kwa miaka mingi — daktari ataangalia mara kwa mara.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Severe muscle pain, very fast deep breathing, unusual tiredness, cold hands or feet, slow heart rate, or feeling very unwell — this can be lactic acidosis (rare but serious).',
        sw: 'Maumivu makali ya misuli, kupumua haraka kwa kina, uchovu usio wa kawaida, mikono au miguu baridi, mapigo ya moyo polepole, au kujisikia vibaya sana — hii inaweza kuwa lactic acidosis (nadra lakini hatari).',
        sw_mtaa: 'Maumivu makali ya misuli, kupumua haraka sana, uchovu usio wa kawaida, mikono na miguu baridi, moyo unapiga polepole, au kujisikia vibaya sana — hii inaweza kuwa lactic acidosis (nadra lakini ni serious).',
      },
      urgency: 'emergency',
    },
    {
      effect: {
        en: 'Persistent severe stomach pain with vomiting that does not stop.',
        sw: 'Maumivu makali yanayoendelea ya tumbo pamoja na kutapika ambako hakuachi.',
        sw_mtaa: 'Tumbo kuuma sana hadi unatapika hata bila kuacha.',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Signs of low blood sugar (shaking, sweating, confusion, fast heartbeat) — usually only happens if combined with insulin or sulfonylureas.',
        sw: 'Dalili za sukari ya chini (kutetemeka, kutoa jasho, kuchanganyikiwa, mapigo ya moyo haraka) — kwa kawaida hutokea tu ikiwa imeunganishwa na insulin au sulfonylurea.',
        sw_mtaa: 'Dalili za sukari ya chini (kutetemeka, jasho, kuchanganyikiwa, mapigo ya moyo haraka) — kwa kawaida ni tu ikiwa unachanganya na insulin au sulfonylurea.',
      },
      urgency: 'urgent',
    },
  ],

  interactions: [
    {
      with: 'alcohol',
      withDisplay: {
        en: 'Alcohol (pombe)',
        sw: 'Pombe',
      },
      severity: 'caution',
      explanation: {
        en: 'Metformin and alcohol both affect how the body handles lactic acid. Heavy or binge drinking — especially on an empty stomach, when dehydrated, or with liver/kidney problems — raises the risk of a rare but dangerous condition called lactic acidosis. Light, occasional drinking is generally tolerated in stable adults with normal kidney and liver function, but the safer practice is to drink less, drink with food, and never binge. Your doctor knows your kidney function and overall risk — they are the one to give you a personal answer.',
        sw: 'Metformin na pombe vyote vinaathiri jinsi mwili unavyoshughulika na lactic acid. Kunywa pombe nyingi au kwa pupa — hasa kwenye tumbo tupu, ukiwa umepungukiwa maji, au ukiwa na matatizo ya ini au figo — kunainua hatari ya hali nadra lakini hatari inayoitwa lactic acidosis. Kunywa kidogo, mara chache, kwa kawaida hustahimiliwa kwa watu wazima wenye figo na ini la kawaida, lakini njia salama ni kunywa kidogo, kunywa pamoja na chakula, na kamwe usinywe sana mara moja. Daktari wako anajua hali ya figo zako na hatari yako binafsi — yeye ndiye anayeweza kukupa jibu lako binafsi.',
        sw_mtaa: 'Metformin na pombe vyote vinaathiri jinsi mwili unavyoshughulika na lactic acid. Kunywa pombe nyingi au kwa nguvu — hasa tumbo tupu, ukiwa umepungukiwa maji, au una matatizo ya figo au ini — kunaongeza hatari ya kitu kinachoitwa lactic acidosis (nadra lakini hatari ya kweli). Kunywa kidogo mara chache, watu wazima wenye figo na ini la poa kwa kawaida wanaweza — lakini njia salama ni: kunywa kidogo, na chakula, na kamwe usilewe. Daktari wako anajua figo zako na hali yako — yeye ndiye anaweza kukupa jibu la kweli kwa wewe.',
      },
      sources: [src('BNF_CURRENT'), src('EMC_CURRENT'), src('ADA_2024')],
    },
    {
      with: 'contrast_dye',
      withDisplay: {
        en: 'CT scan or X-ray contrast dye',
        sw: 'Dawa ya CT scan au X-ray',
      },
      severity: 'avoid',
      explanation: {
        en: 'If you are going to have a CT scan or X-ray with contrast dye injected, tell the doctor you take metformin. They usually stop it 48 hours before the scan to protect your kidneys.',
        sw: 'Ikiwa utafanya CT scan au X-ray na dawa ya contrast inayodungwa, mwambie daktari kuwa unatumia metformin. Kwa kawaida wanasimamisha siku 2 kabla ya scan kulinda figo zako.',
        sw_mtaa: 'Kama utafanya CT scan au X-ray na dye inayodungwa, mwambie daktari unatumia metformin. Kwa kawaida wanasimamisha siku 2 kabla ya scan kulinda figo zako.',
      },
      sources: [src('BNF_CURRENT'), src('NTLG_STG_2023')],
    },
    {
      with: 'severe_dehydration',
      withDisplay: {
        en: 'Severe vomiting, diarrhea, or dehydration',
        sw: 'Kutapika sana, kuhara sana, au upungufu mkubwa wa maji',
      },
      severity: 'caution',
      explanation: {
        en: 'When you are very dehydrated, your kidneys cannot clear metformin well, raising the lactic acidosis risk. If you are severely sick with vomiting or diarrhea, stop metformin temporarily and contact your doctor — they will tell you when to restart.',
        sw: 'Unapokuwa umepungukiwa maji sana, figo zako haziwezi kufuta metformin vizuri, hivyo hatari ya lactic acidosis kuongezeka. Ukiwa mgonjwa sana na kutapika au kuhara, simamisha metformin kwa muda na wasiliana na daktari wako — atakuambia lini uanze tena.',
        sw_mtaa: 'Ukiwa umepungukiwa maji sana, figo haziwezi kufuta metformin vizuri, lactic acidosis inakuwa hatari. Ukiwa mgonjwa sana na kutapika au kuhara, simamisha metformin kwa muda na piga daktari — atakuambia lini uanze tena.',
      },
      sources: [src('BNF_CURRENT'), src('NTLG_STG_2023')],
    },
    {
      with: 'kidney_disease',
      withDisplay: {
        en: 'Kidney disease (low eGFR)',
        sw: 'Ugonjwa wa figo (eGFR ya chini)',
      },
      severity: 'caution',
      explanation: {
        en: 'Metformin is cleared by the kidneys. When kidney function drops, the dose may need to be reduced, or in severe kidney disease, metformin may need to be stopped entirely. Your doctor monitors your creatinine and eGFR for this reason.',
        sw: 'Metformin huondolewa na figo. Utendaji wa figo unaposhuka, dose huenda inahitaji kupunguzwa, au katika ugonjwa mkali wa figo, metformin huenda inahitaji kusimamishwa kabisa. Daktari wako anafuatilia creatinine yako na eGFR kwa sababu hii.',
        sw_mtaa: 'Metformin inaondolewa na figo. Figo zikianza kushuka, dose huenda unahitaji kupunguza, au kama ni mbaya sana, metformin inasimamishwa kabisa. Ndiyo maana daktari wako anaangalia creatinine na eGFR.',
      },
      sources: [src('KDIGO_CKD_2024'), src('BNF_CURRENT'), src('NTLG_STG_2023')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Taking with food', sw: 'Kunywa na chakula' },
      note: {
        en: 'Take metformin with the largest meal of the day, or right after eating, to reduce stomach side effects.',
        sw: 'Chukua metformin pamoja na mlo mkubwa wa siku, au mara tu baada ya kula, ili kupunguza madhara ya tumbo.',
        sw_mtaa: 'Kunywa metformin pamoja na mlo mkubwa, au mara baada ya kula, kupunguza usumbufu wa tumbo.',
      },
    },
    {
      topic: { en: 'Ramadan / fasting', sw: 'Ramadhani / kufunga' },
      note: {
        en: 'If you fast for Ramadan, talk to your doctor before you start. Most people on metformin can fast safely, but the timing of doses usually changes (often a smaller dose at suhoor, larger at iftar). Watch for dehydration during the day.',
        sw: 'Ikiwa unafunga Ramadhani, ongea na daktari wako kabla ya kuanza. Watu wengi wanaotumia metformin wanaweza kufunga salama, lakini muda wa dose kwa kawaida hubadilika (kwa kawaida dose ndogo daku, kubwa futari). Angalia upungufu wa maji wakati wa mchana.',
        sw_mtaa: 'Kama utafunga Ramadhani, ongea na daktari kabla ya kuanza. Watu wengi wanaotumia metformin wanaweza kufunga salama, lakini muda wa dose unabadilika (kwa kawaida ndogo daku, kubwa futari). Kunywa maji ya kutosha futari hadi daku.',
      },
    },
    {
      topic: { en: 'Pregnancy', sw: 'Mimba' },
      note: {
        en: 'If you become pregnant or are trying to conceive, tell your doctor immediately. Metformin is sometimes continued in pregnancy and sometimes switched to insulin — this is a doctor\'s decision based on your situation.',
        sw: 'Ikiwa unapata mimba au unajaribu kupata, mwambie daktari wako mara moja. Metformin wakati mwingine huendelezwa kwenye mimba na wakati mwingine hubadilishwa kwa insulin — hii ni uamuzi wa daktari kulingana na hali yako.',
        sw_mtaa: 'Ukipata mimba au unajaribu, mwambie daktari mara moja. Metformin wakati mwingine inaendelea kwenye mimba, wakati mwingine inabadilishwa na insulin — hii ni uamuzi wa daktari kulingana na hali yako.',
      },
    },
  ],

  sources: [
    src('ADA_2024'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
    src('NTLG_STG_2023'),
    src('WHO_DIABETES_2024'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
