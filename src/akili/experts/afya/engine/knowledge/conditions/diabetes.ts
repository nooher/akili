/**
 * Diabetes Mellitus — Comprehensive Condition Knowledge (All-In)
 *
 * Sources: ADA Standards of Care 2024, IDF 2025, NTLG STG 2023,
 *          WHO Global Diabetes Compact 2024, Muhimbili protocols.
 *
 * Coverage scope (all-in for TIBA ecosystem):
 *   - Type 1, Type 2, gestational, MODY awareness
 *   - New diagnosis pathway and journey
 *   - Established daily management
 *   - Emergency states: DKA, HHS, hypoglycemia
 *   - Complications: retinopathy, nephropathy, neuropathy, foot, CVD
 *   - Sick day rules
 *   - Pregnancy planning and gestational management
 *   - Pediatric/young-onset considerations
 *   - Ramadan fasting (TZ-relevant)
 *   - Mental health overlay (diabetes distress, depression)
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const DIABETES: ConditionKnowledge = {
  id: 'diabetes',
  aliases: CONDITION_ALIASES.diabetes,
  category: 'metabolic',

  whatItIs: {
    en: 'Diabetes means your blood sugar (glucose) stays too high. Glucose is the fuel your body runs on, but it needs a hormone called insulin — made by the pancreas — to get into your cells. In type 2 diabetes (the most common), your body either does not respond well to insulin (insulin resistance) or does not make enough of it. In type 1 diabetes, the pancreas barely makes any insulin, so insulin must be injected. In gestational diabetes, blood sugar rises only during pregnancy.',
    sw: 'Kisukari maana yake sukari yako ya damu inabaki juu sana. Sukari ni nishati ambayo mwili wako unatumia, lakini inahitaji homoni inayoitwa insulin — inayotengenezwa na kongosho — ili kuingia ndani ya seli zako. Katika kisukari aina ya 2 (cha kawaida zaidi), mwili wako haitiki vizuri kwa insulin au hautengenezi insulin ya kutosha. Katika kisukari aina ya 1, kongosho karibu haitengenezi insulin kabisa, hivyo insulin lazima idungwe. Katika kisukari cha mimba, sukari ya damu inapanda tu wakati wa ujauzito.',
    sw_mtaa: 'Kisukari maana yake sukari yako ya damu iko juu sana, na haishuki. Sukari ndiyo "fuel" ya mwili — lakini inahitaji insulin (homoni ya kongosho) ili kuingia ndani ya seli na kufanya kazi. Aina ya 2 (ya kawaida): mwili haitiki na insulin, au hautengenezi ya kutosha. Aina ya 1: kongosho haitengenezi kabisa, lazima ujidunge insulin. Cha mimba: sukari inapanda tu ukiwa mjamzito.',
  },

  whyItMatters: {
    en: 'High blood sugar over years quietly damages small blood vessels in the eyes (leading to blindness), kidneys (leading to dialysis), nerves (leading to numbness, pain, foot ulcers, amputation), and large vessels (leading to heart attack and stroke). The damage is preventable. Good control today — even imperfect control — protects you decades from now. Diabetes is the leading cause of non-traumatic amputation, blindness in working-age adults, and kidney failure across most of Africa.',
    sw: 'Sukari ya juu kwa miaka mingi inaharibu kimya kimya mishipa midogo ya damu ya macho (inasababisha upofu), figo (inasababisha dialysis), neva (inasababisha ganzi, maumivu, vidonda vya miguu, kukatwa kwa mguu), na mishipa mikubwa (inasababisha mshtuko wa moyo na kiharusi). Uharibifu huu unaweza kuzuiwa. Udhibiti mzuri leo — hata kama si mkamilifu — unakulinda baada ya miongo. Kisukari ni sababu kuu ya kukatwa miguu, upofu kwa watu wa kufanya kazi, na figo kufeli barani Afrika.',
    sw_mtaa: 'Sukari ya juu kwa miaka mingi inaharibu kimya kimya: macho (upofu), figo (dialysis), neva (ganzi, maumivu, vidonda, mguu kukatwa), na mishipa mikubwa (heart attack, stroke). Lakini uharibifu huu unaweza kuzuiwa. Ukidhibiti sukari leo — hata kama si perfect — unalinda mwili kwa miongo. Kisukari ndio sababu kuu ya kukatwa miguu, upofu kwa watu wa kufanya kazi, na figo kufeli Afrika.',
  },

  commonQuestions: [
    {
      q: { en: 'Was I born with this? Did I cause it?', sw: 'Je nilizaliwa na hili? Au nimejisababishia?' },
      a: {
        en: 'Type 2 diabetes is mostly about genes meeting environment. If your parents or siblings have it, your risk is much higher — that part is not your fault. What raises the risk on top of genes: extra weight (especially around the belly), low activity, lots of sugary drinks and refined carbs, poor sleep, and chronic stress. So the cause is partly built in and partly built up. The good news: the parts you can change — weight, food, movement — have a powerful effect, even on people with strong family history.',
        sw: 'Kisukari aina ya 2 ni kuhusu jenetiki kukutana na mazingira. Ikiwa wazazi au ndugu wako wana kisukari, hatari yako ni kubwa zaidi — sehemu hii si kosa lako. Vinavyoongeza hatari juu ya jenetiki: uzito wa ziada (hasa tumboni), shughuli kidogo, vinywaji vingi vyenye sukari na carbs zilizosafishwa, kulala vibaya, na msongo wa muda mrefu. Hivyo sababu ni nusu imejengwa ndani na nusu imejengwa juu. Habari njema: vipande unavyoweza kubadilisha — uzito, chakula, mazoezi — vina athari kubwa, hata kwa watu wenye historia kubwa ya familia.',
        sw_mtaa: 'Kisukari aina ya 2 ni nusu jeni nusu mazingira. Kama wazazi au ndugu wana kisukari, hatari yako iko juu — hii si kosa lako. Vinavyoongeza zaidi: uzito mwingi (hasa tumboni), kukaa sana, vinywaji vya sukari, chakula cha kupakwa sana, kulala vibaya, stress. Habari njema: sehemu unayoweza kubadilisha — chakula, mazoezi, uzito — inafanya kazi sana, hata kama familia yako ina historia.',
      },
    },
    {
      q: { en: 'Can diabetes be cured?', sw: 'Kisukari kinaponywa?' },
      a: {
        en: 'Type 1 diabetes cannot be cured today — insulin is for life. Type 2 diabetes cannot be "cured" either, but it can be put into remission. Some people, especially after major weight loss (15+ kg) early in the disease, see their sugars return to normal without medication for months or years. Remission is not cure: the underlying tendency is still there, and it can come back if the weight comes back. Anyone selling you a guaranteed diabetes cure — herbal, traditional, or otherwise — is selling false hope. Real control, lifelong, is what protects you.',
        sw: 'Kisukari aina ya 1 hakiponywi leo — insulin ni ya maisha. Kisukari aina ya 2 hakiponywi pia, lakini kinaweza kuwekwa katika "remission." Watu wengine, hasa baada ya kupungua uzito mkubwa (15+ kg) mapema, wanaona sukari zinarudi kawaida bila dawa kwa miezi au miaka. Remission si tiba: utabiri wa msingi bado uko, na unaweza kurudi ikiwa uzito unarudi. Mtu yeyote anayekuuzia tiba ya hakika ya kisukari — ya mitishamba au nyinginezo — anakuuzia matumaini ya uongo.',
        sw_mtaa: 'Aina ya 1 haiponywi — insulin ni ya maisha. Aina ya 2 haiponywi pia, lakini inaweza kuwa "remission" — sukari inarudi kawaida bila dawa, kwa miezi au miaka. Hii inakuja kwa watu wanaopunguza uzito mkubwa (kg 15+) mapema. Lakini remission si tiba — ikirudi uzito, kisukari kinarudi. Mtu yeyote anayekuuzia "tiba ya hakika ya kisukari" — anakudanganya.',
      },
    },
    {
      q: { en: 'What is the difference between type 1 and type 2?', sw: 'Tofauti kati ya aina ya 1 na aina ya 2?' },
      a: {
        en: 'Type 1 usually starts in childhood or young adulthood, comes on fast (days to weeks), and the person is often slim. The body has attacked its own insulin-making cells, so insulin shots are needed from day one. Type 2 usually starts in adults over 35, comes on slowly (years), and is more common in people with extra weight or strong family history. The body still makes insulin but does not use it well. Type 2 may be managed at first with lifestyle and pills, then often needs insulin years later. Both raise blood sugar; both cause the same long-term complications if uncontrolled.',
        sw: 'Aina ya 1 huanza utotoni au ujanani, inakuja haraka (siku hadi wiki), mtu mara nyingi ni mwembamba. Mwili umeshambulia seli zake za kutengeneza insulin, hivyo sindano za insulin zinahitajika tangu siku ya kwanza. Aina ya 2 huanza kwa watu wazima zaidi ya miaka 35, inakuja polepole (miaka), ni ya kawaida zaidi kwa watu wenye uzito wa ziada au historia kubwa ya familia. Mwili bado unatengeneza insulin lakini hautumii vizuri. Aina ya 2 inaweza kusimamiwa mwanzoni kwa maisha na vidonge, kisha mara nyingi inahitaji insulin baada ya miaka.',
        sw_mtaa: 'Aina ya 1: huanza utotoni au ujanani, inakuja haraka (siku au wiki), mtu kwa kawaida ni mwembamba. Mwili umejishambulia seli zake za insulin, hivyo insulin lazima tangu siku ya kwanza. Aina ya 2: huanza ukubwa (miaka 35+), inakuja polepole (miaka), kwa wenye uzito au historia ya familia. Mwili bado unatengeneza insulin lakini hautumii vizuri. Inaanza na lifestyle + vidonge, baada ya miaka mara nyingi inahitaji insulin.',
      },
    },
    {
      q: { en: 'What is gestational diabetes?', sw: 'Kisukari cha mimba ni nini?' },
      a: {
        en: 'Gestational diabetes is high blood sugar that appears for the first time during pregnancy, usually after week 24. It happens when pregnancy hormones make the body less responsive to insulin. It almost always goes away after delivery — but it raises the risk of type 2 diabetes later in life by 50%. Babies of mothers with poorly controlled gestational diabetes can grow too large (making delivery difficult), have low sugar at birth, and have a higher lifelong risk of obesity and diabetes themselves. Most women control it with diet alone; some need insulin (metformin is also sometimes used). Glibenclamide is generally avoided in pregnancy.',
        sw: 'Kisukari cha mimba ni sukari ya juu ya damu inayotokea kwa mara ya kwanza wakati wa ujauzito, mara nyingi baada ya wiki 24. Inatokea wakati homoni za ujauzito zinafanya mwili usitikie vizuri kwa insulin. Karibu daima inaisha baada ya kujifungua — lakini inainua hatari ya kisukari aina ya 2 maishani kwa 50%. Watoto wa mama wenye kisukari cha mimba kisichodhibitiwa vizuri wanaweza kukua wakubwa sana (kufanya kujifungua kuwa kugumu), kuwa na sukari ya chini wakati wa kuzaliwa, na hatari kubwa ya unene na kisukari maishani. Wanawake wengi wanadhibiti kwa chakula tu; wengine wanahitaji insulin (metformin pia hutumika wakati mwingine). Glibenclamide kwa kawaida huepukwa katika mimba.',
        sw_mtaa: 'Kisukari cha mimba ni sukari ya juu inayotokea kwa mara ya kwanza wakati wa mimba, mara nyingi baada ya wiki 24. Inatokea kwa sababu homoni za mimba zinafanya mwili usitikie vizuri kwa insulin. Karibu daima inaisha baada ya kujifungua — lakini inainua hatari ya kisukari aina ya 2 baadaye maishani kwa nusu. Mtoto anaweza kukua mkubwa sana (kufanya kujifungua kugumu), kuwa na sukari ya chini wakati wa kuzaliwa, na hatari kubwa ya unene na kisukari maishani. Wanawake wengi wanadhibiti kwa chakula tu; wengine wanahitaji insulin au metformin. Glibenclamide kwa kawaida haitumiwi mimbani.',
      },
    },
    {
      q: { en: 'What should my sugar levels be?', sw: 'Sukari yangu inafaa iwe kiwango gani?' },
      a: {
        en: 'For most non-pregnant adults with diabetes: fasting (before eating in the morning) 4.4-7.0 mmol/L, two hours after a meal under 10 mmol/L, and HbA1c (the 3-month average) below 7.0%. Targets are gentler for older adults, people with frequent low sugars, or those with multiple other conditions — your doctor will personalize this. Pregnancy targets are tighter. Bottom line: targets are guides, not pass/fail tests. The aim is steady control over years, not perfection on any one day.',
        sw: 'Kwa watu wengi wazima wasio wajawazito wenye kisukari: kabla ya kula asubuhi 4.4-7.0 mmol/L, masaa mawili baada ya kula chini ya 10 mmol/L, na HbA1c (wastani wa miezi 3) chini ya 7.0%. Malengo ni laini zaidi kwa wazee, watu wenye sukari ya chini mara kwa mara, au wenye magonjwa mengine — daktari ataziweka kibinafsi. Malengo ya mimba ni makali zaidi. Ujumbe wa msingi: malengo ni mwongozo, si mtihani wa kufaulu/kushinda.',
        sw_mtaa: 'Kwa wengi wenye kisukari (sio wajawazito): kabla ya chakula asubuhi 4.4-7.0 mmol/L, masaa mawili baada ya kula chini ya 10 mmol/L, na HbA1c (wastani wa miezi 3) chini ya 7%. Wazee, watu wanaoteleza sukari chini mara kwa mara, au wenye magonjwa mengi mengine — malengo yao ni laini zaidi. Wajawazito: malengo makali zaidi. Ukweli: hizi ni malengo ya mwongozo, sio mtihani. Lengo ni udhibiti thabiti kwa miaka.',
      },
    },
    {
      q: { en: 'Will I have to inject insulin?', sw: 'Itanibidi nijidunge insulin?' },
      a: {
        en: 'For type 1: yes, from day one, for life. For type 2: maybe, eventually. Type 2 is a progressive condition — over years the pancreas makes less insulin, so many people who started on tablets need insulin after 10-15 years. This is not failure on your part. Insulin is not a "last resort" or a sign that you are dying. It is a tool that replaces what the body is no longer making enough of. Many people feel much better once on insulin because their sugars are finally under control.',
        sw: 'Kwa aina ya 1: ndio, tangu siku ya kwanza, kwa maisha. Kwa aina ya 2: labda, hatimaye. Aina ya 2 ni hali inayoendelea — kwa miaka kongosho linatengeneza insulin kidogo, hivyo watu wengi walioanza na vidonge wanahitaji insulin baada ya miaka 10-15. Hii si kushindwa kwako. Insulin si "njia ya mwisho" au ishara kwamba unakufa. Ni zana inayorudisha kile mwili ulichoacha kutengeneza vya kutosha.',
        sw_mtaa: 'Aina ya 1: ndio, tangu siku ya kwanza, kwa maisha yote. Aina ya 2: labda, baadaye. Kwa miaka kongosho linapunguza kutengeneza insulin, hivyo watu wengi walioanza vidonge wanaishia kwenye insulin baada ya miaka 10-15. Hii si kushindwa kwako wewe. Insulin sio "njia ya mwisho" wala ishara kwamba unakufa. Ni dawa tu inayobadilisha kile mwili hautengenezi tena.',
      },
    },
    {
      q: { en: 'Can I eat ugali, rice, and chapati?', sw: 'Naweza kula ugali, wali, na chapati?' },
      a: {
        en: 'Yes — diabetes does not mean giving up Tanzanian food. But portions matter. Ugali, white rice, and chapati turn into sugar fast. Try: smaller portion (half of what you used to eat), pair it with vegetables (which slow sugar absorption), choose brown rice or whole-meal chapati when possible, and avoid eating these on their own without protein or vegetables. Sweet drinks (soda, juice, sweetened tea) are the biggest hidden cause of high sugar. Water, plain tea, and unsweetened milk are safer.',
        sw: 'Ndio — kisukari haimaanishi kuacha chakula cha Kitanzania. Lakini sehemu ni muhimu. Ugali, wali mweupe, na chapati zinageuka kuwa sukari haraka. Jaribu: sehemu ndogo (nusu ya ulichokuwa unakula), kula pamoja na mboga (zinapunguza kasi ya kunyonya sukari), chagua wali mwekundu au chapati ya ngano kamili ikiwezekana, na epuka kula hizi peke yake. Vinywaji vitamu (soda, juice, chai tamu) ndio sababu kubwa iliyofichwa ya sukari ya juu.',
        sw_mtaa: 'Ndio — kisukari haimaanishi uache chakula cha Kitanzania. Lakini "portion" ni muhimu. Ugali, wali mweupe, chapati — zinageuka sukari haraka. Jaribu: kiasi kidogo (nusu ya kawaida), kula na mboga, chagua wali mwekundu au chapati ya ngano kamili ikiwezekana, na usile kabuni peke yake. Soda, juice, chai tamu — ndio "killer" iliyofichwa.',
      },
    },
    {
      q: { en: 'What if my sugar drops too low?', sw: 'Sukari yangu ikishuka sana, nifanyeje?' },
      a: {
        en: 'Low blood sugar (hypoglycemia) is sugar below 4 mmol/L. Symptoms: shaking, sweating, fast heartbeat, hunger, confusion, irritability, blurry vision. It usually happens to people on insulin or sulfonylureas (like glibenclamide) — not on metformin alone. The "15-15 rule": eat 15 grams of fast sugar (3-4 glucose tablets, half a glass of fruit juice, 3 teaspoons of sugar dissolved in water, or one tablespoon of honey). Wait 15 minutes. Recheck. If still low, repeat. Then eat a real meal. If you cannot swallow safely or are confused, someone else must help — and call for medical help.',
        sw: 'Sukari ya chini (hypoglycemia) ni sukari chini ya 4 mmol/L. Dalili: kutetemeka, kutoa jasho, mapigo ya moyo haraka, njaa, kuchanganyikiwa, hasira, kuona vibaya. Mara nyingi inatokea kwa watu wanaotumia insulin au sulfonylurea (kama glibenclamide) — si metformin peke yake. "Sheria ya 15-15": kula gramu 15 za sukari ya haraka (vidonge 3-4 vya glucose, nusu glasi ya juice, vijiko 3 vya sukari kwenye maji, au kijiko kimoja cha asali). Subiri dakika 15. Pima tena. Kama bado chini, rudia. Kisha kula mlo halisi. Ikiwa huwezi kumeza salama au umechanganyikiwa, mtu mwingine lazima asaidie.',
        sw_mtaa: 'Sukari ya chini (hypoglycemia) ni chini ya 4 mmol/L. Dalili: kutetemeka, jasho, moyo unapiga haraka, njaa kali, kuchanganyikiwa, hasira, kuona vibaya. Mara nyingi inatokea kwa wanaotumia insulin au sulfonylurea kama glibenclamide — sio metformin peke yake. "Sheria ya 15-15": kula gramu 15 za sukari ya haraka (vidonge 3-4 vya glucose, nusu glass ya juice, vijiko 3 vya sukari kwenye maji, au kijiko cha asali). Subiri dakika 15. Pima tena. Kama bado chini, rudia. Kisha kula chakula halisi. Ukiwa huwezi kumeza salama au umechanganyikiwa, mtu mwingine lazima asaidie.',
      },
    },
    {
      q: { en: 'My sugar is high — should I add more medicine on my own?', sw: 'Sukari yangu iko juu — niongeze dawa mwenyewe?' },
      a: {
        en: 'No. Never adjust your diabetes medicines on your own, especially insulin or sulfonylureas — adding more can cause dangerous low sugars. One high reading is not always a reason to change your dose. Patterns matter more than single readings: if your sugar has been high for several days, write down the readings and the times, and contact your doctor or clinic. They will adjust safely. The exception is short-acting insulin during sick days, where your doctor may have given you a written sick-day plan.',
        sw: 'Hapana. Kamwe usibadilishe dawa zako za kisukari mwenyewe, hasa insulin au sulfonylurea — kuongeza zaidi kunaweza kusababisha sukari ya chini hatari. Kipimo kimoja cha juu si daima sababu ya kubadilisha dose yako. Mtindo ni muhimu zaidi kuliko vipimo vimoja: ikiwa sukari yako imekuwa juu kwa siku kadhaa, andika vipimo na muda, na wasiliana na daktari wako au kliniki. Tofauti ni insulin ya haraka wakati wa siku za ugonjwa, ambapo daktari wako anaweza kukupa mpango wa siku za ugonjwa ulioandikwa.',
        sw_mtaa: 'Hapana. Usibadilishe dawa za kisukari mwenyewe, hasa insulin au sulfonylurea — kuongeza zaidi kunaweza kusababisha sukari ya chini hatari. Kipimo kimoja juu sio sababu ya kubadilisha dose. Mtindo ni muhimu zaidi: kama sukari yako imekuwa juu kwa siku kadhaa, andika vipimo na muda, halafu piga simu daktari. Tofauti ni insulin ya haraka siku za ugonjwa, kama daktari amekupa mpango wa "sick day" ulioandikwa.',
      },
    },
    {
      q: { en: 'What if I get sick — like flu or food poisoning?', sw: 'Nikipata ugonjwa — kama mafua au sumu ya chakula?' },
      a: {
        en: 'Sick days are dangerous in diabetes because illness raises sugar even if you eat less. Three rules: (1) Never stop your insulin entirely, even if you cannot eat — illness raises sugar despite hunger. Dose may need adjustment but not zero. (2) Drink plenty of fluids — water, unsweetened tea, broth. Dehydration plus high sugar is how DKA and HHS start. (3) Check your sugar more often — every 4 hours if on insulin. Go to a clinic if: vomiting prevents you keeping fluids down, sugar is above 16 for several readings, you have rapid breathing or fruity breath, or you feel confused. If you are on metformin and become very dehydrated, stop the metformin until you can eat and drink normally — then resume.',
        sw: 'Siku za ugonjwa ni hatari katika kisukari kwa sababu ugonjwa unainua sukari hata kama unakula kidogo. Sheria tatu: (1) Kamwe usisimamishe insulin yako kabisa, hata kama huwezi kula — ugonjwa unainua sukari licha ya njaa. Dose huenda inahitaji marekebisho lakini si sifuri. (2) Kunywa vimiminika vingi — maji, chai bila sukari, supu. Upungufu wa maji pamoja na sukari ya juu ndio jinsi DKA na HHS huanza. (3) Pima sukari yako mara nyingi zaidi — kila masaa 4 ikiwa uko kwenye insulin. Nenda kliniki ikiwa: kutapika kunazuia kunywa, sukari iko juu ya 16 kwa vipimo kadhaa, una kupumua kwa haraka au pumzi yenye harufu ya matunda, au unajisikia kuchanganyikiwa. Ikiwa uko kwenye metformin na upungufu mkubwa wa maji, simamisha metformin hadi uweze kula na kunywa kawaida.',
        sw_mtaa: 'Siku za ugonjwa ni hatari katika kisukari kwa sababu ugonjwa unapandisha sukari hata ukila kidogo. Sheria tatu: (1) Kamwe usisimamishe insulin yote, hata kama huwezi kula — ugonjwa unapandisha sukari licha ya njaa. Dose huenda inahitaji marekebisho lakini sio sifuri. (2) Kunywa vimiminika vingi — maji, chai bila sukari, supu. Upungufu wa maji + sukari ya juu = jinsi DKA na HHS huanza. (3) Pima sukari mara nyingi zaidi — kila masaa 4 ukiwa kwenye insulin. Nenda kliniki ikiwa: unatapika hadi husiwezi kunywa, sukari juu ya 16 vipimo kadhaa, kupumua haraka au pumzi ina harufu ya matunda, au umechanganyikiwa. Ukiwa kwenye metformin na upungufu mkubwa wa maji, simamisha metformin hadi uweze kula na kunywa kawaida.',
      },
    },
    {
      q: { en: 'Can I fast during Ramadan?', sw: 'Naweza kufunga Ramadhani?' },
      a: {
        en: 'Many people with diabetes can fast safely — but not all. You should NOT fast if: you have type 1 diabetes with frequent hypos, recent DKA, HbA1c above 10%, advanced kidney disease, severe complications, or are pregnant with diabetes. If you can fast: see your doctor 6-8 weeks before Ramadan to adjust doses. Common changes: metformin dose moved to iftar (larger) and suhoor (smaller), basal insulin reduced by 15-25%, sulfonylureas often switched or reduced. Break the fast immediately if sugar drops below 4 mmol/L or rises above 16 mmol/L. Check sugar at least at suhoor, midday, and iftar. Drink enough water from iftar to suhoor — dehydration is the biggest hidden risk.',
        sw: 'Watu wengi wenye kisukari wanaweza kufunga salama — lakini si wote. HUFAI kufunga ikiwa: una kisukari aina ya 1 chenye hypos za mara kwa mara, DKA ya hivi karibuni, HbA1c juu ya 10%, ugonjwa wa figo wa hali ya juu, matatizo makubwa, au una mimba pamoja na kisukari. Ikiwa unaweza kufunga: ona daktari wako wiki 6-8 kabla ya Ramadhani kurekebisha dose. Mabadiliko ya kawaida: dose ya metformin imehamishwa kwa futari (kubwa) na daku (ndogo), basal insulin imepunguzwa kwa 15-25%, sulfonylurea mara nyingi inabadilishwa au inapunguzwa. Vunja saumu mara moja ikiwa sukari inashuka chini ya 4 mmol/L au inapanda juu ya 16 mmol/L. Pima sukari angalau futari, mchana, na daku. Kunywa maji ya kutosha kati ya futari na daku — upungufu wa maji ni hatari kubwa iliyofichwa.',
        sw_mtaa: 'Watu wengi wenye kisukari wanaweza kufunga salama — lakini sio wote. HUFAI kufunga ikiwa: una aina ya 1 yenye hypos za mara kwa mara, ulipata DKA hivi karibuni, HbA1c juu ya 10%, figo zako ni mbaya, matatizo makubwa, au una mimba na kisukari. Ukiweza kufunga: ona daktari wiki 6-8 kabla ya Ramadhani kurekebisha dose. Mabadiliko ya kawaida: metformin kubwa futari, ndogo daku; basal insulin punguza 15-25%; sulfonylurea mara nyingi unabadilisha au punguza. Vunja saumu MARA MOJA ikiwa sukari inashuka chini ya 4 au inapanda juu ya 16. Pima sukari angalau futari, mchana, na daku. Kunywa maji mengi kati ya futari na daku — dehydration ni hatari iliyofichwa.',
      },
    },
    {
      q: { en: 'Will I lose my eyesight or my feet?', sw: 'Nitapoteza macho yangu au miguu?' },
      a: {
        en: 'Not if you stay in good control and screen regularly. The serious complications people fear — blindness, amputation, dialysis — happen mostly to people whose diabetes is uncontrolled for many years, or who never had a chance to be screened. Annual eye exams, foot checks at every visit, urine and creatinine tests yearly: these find problems early when they can still be reversed or slowed. Even with imperfect sugar control, regular screening dramatically reduces the worst outcomes. The diabetes patients who lose their sight or limbs are almost always those who never had access to or never attended these checks.',
        sw: 'Si ikiwa unabaki kwenye udhibiti mzuri na unachunguzwa mara kwa mara. Matatizo makubwa ambayo watu wanaogopa — upofu, kukatwa mguu, dialysis — yanatokea mara nyingi kwa watu ambao kisukari chao hakidhibitiwi kwa miaka mingi, au ambao hawajawahi kupata nafasi ya kuchunguzwa. Uchunguzi wa macho wa kila mwaka, ukaguzi wa miguu kila ziara, vipimo vya mkojo na creatinine kila mwaka: hivi hupata matatizo mapema wakati bado vinaweza kurudi nyuma au kupungua kasi. Hata na udhibiti usio kamili wa sukari, uchunguzi wa kawaida hupunguza kwa kiasi kikubwa matokeo mabaya.',
        sw_mtaa: 'Sio ikiwa unakaa kwenye udhibiti mzuri na unachunguzwa mara kwa mara. Matatizo makubwa watu wanayoogopa — upofu, kukatwa mguu, dialysis — yanatokea hasa kwa watu ambao kisukari hakidhibitiwi kwa miaka mingi, au hawajawahi kuchunguzwa. Uchunguzi wa macho mara moja kwa mwaka, ukaguzi wa miguu kila ziara, vipimo vya mkojo na creatinine kila mwaka: hivi hupata matatizo mapema wakati bado vinaweza kurudi nyuma. Wagonjwa wa kisukari wanaopoteza macho au miguu ni karibu daima wale ambao hawajawahi kupata screening au hawajazingatia.',
      },
    },
    {
      q: { en: 'What about traditional herbs and mitishamba?', sw: 'Na mitishamba je?' },
      a: {
        en: 'Some plants have small effects on blood sugar — but the evidence is weak, doses are unreliable, and the contents of "diabetes herbs" vary widely. Some herbs interact with diabetes medicines and can cause dangerous low sugars; others can damage the liver or kidneys. If you want to try a herbal remedy, tell your doctor first, do not stop your prescribed medicine, and check your sugar more often during the first weeks. Anyone promising that herbs will cure your diabetes is misleading you — there is no plant, anywhere, that has been shown to cure type 1 or type 2 diabetes.',
        sw: 'Mimea mingine ina athari ndogo kwa sukari ya damu — lakini ushahidi ni dhaifu, dose hazitabiriki, na yaliyomo kwenye "mitishamba ya kisukari" yanatofautiana sana. Mitishamba mingine inaingiliana na dawa za kisukari na inaweza kusababisha sukari ya chini hatari; nyingine inaweza kuharibu ini au figo. Ukitaka kujaribu mtishamba, mwambie daktari wako kwanza, usisimamishe dawa uliyoagizwa, na pima sukari yako mara kwa mara wakati wa wiki za kwanza. Mtu yeyote anayekuahidi kwamba mitishamba itaponya kisukari chako anakudanganya.',
        sw_mtaa: 'Mimea mingine ina athari ndogo kwa sukari — lakini ushahidi ni dhaifu, dose hazitabiriki, na yaliyomo kwenye "mitishamba ya kisukari" yanatofautiana sana. Mitishamba mingine inaingiliana na dawa zako na inaweza kushusha sukari sana (hatari); mingine inaharibu ini au figo. Ukitaka kujaribu, mwambie daktari kwanza, usisimamishe dawa za daktari, na pima sukari mara nyingi wiki za kwanza. Mtu yeyote anayekuahidi "mtishamba huu utaponya kisukari" — anakudanganya.',
      },
    },
    {
      q: { en: 'I have diabetes and I am planning to get pregnant — what should I do?', sw: 'Nina kisukari na ninapanga kupata mimba — nifanyeje?' },
      a: {
        en: 'Plan in advance — this is crucial. Sugar levels in the first 8 weeks of pregnancy (often before you know you are pregnant) shape the baby\'s organs. Poorly controlled sugar in early pregnancy raises the risk of birth defects and miscarriage significantly. Three steps before trying to conceive: (1) Get HbA1c to 6.5% or close to it, with your doctor\'s guidance. (2) Stop medicines unsafe in pregnancy — most oral diabetes pills are usually switched to insulin or metformin; statins, ACE inhibitors and ARBs are stopped. (3) Take folic acid 5 mg daily for 3 months before conception (higher dose than for non-diabetic women). See your doctor for a pre-pregnancy review. Once pregnant, you will see the diabetes team and obstetrician together for closer monitoring.',
        sw: 'Panga mapema — hii ni muhimu sana. Kiwango cha sukari katika wiki 8 za kwanza za ujauzito (mara nyingi kabla hujui una mimba) kinaunda viungo vya mtoto. Sukari isiyodhibitiwa katika mimba ya mapema inainua hatari ya kasoro za kuzaliwa na kuharibika kwa mimba kwa kiasi kikubwa. Hatua tatu kabla ya kujaribu kupata mimba: (1) Pata HbA1c hadi 6.5% au karibu, kwa mwongozo wa daktari. (2) Simamisha dawa zisizo salama katika ujauzito — vidonge vingi vya kisukari kwa kawaida hubadilishwa kwa insulin au metformin; statin, ACE inhibitor na ARB husimamishwa. (3) Chukua folic acid mg 5 kwa siku kwa miezi 3 kabla ya mimba (dose kubwa kuliko ya mwanamke asiye na kisukari). Ona daktari kwa ukaguzi kabla ya ujauzito. Mara unapokuwa mjamzito, utamwona timu ya kisukari na daktari wa kujifungua pamoja.',
        sw_mtaa: 'Panga mapema — hii ni muhimu sana. Kiwango cha sukari wiki 8 za kwanza za mimba (mara nyingi kabla hujui una mimba) kinaunda viungo vya mtoto. Sukari isiyodhibitiwa wakati wa mimba ya mapema inaongeza sana hatari ya kasoro za kuzaliwa na kuharibika kwa mimba. Hatua tatu kabla ya kujaribu kupata mimba: (1) Pata HbA1c chini ya 6.5% au karibu, na daktari. (2) Simamisha dawa zisizo salama mimbani — vidonge vingi vya kisukari hubadilishwa kwa insulin au metformin; statin, ACE inhibitor, ARB husimamishwa. (3) Kunywa folic acid mg 5 kwa siku kwa miezi 3 kabla ya mimba (dose kubwa kuliko mwanamke asiye na kisukari). Ona daktari kwa ukaguzi kabla ya kupata mimba. Ukiwa mjamzito, utahudumiwa na timu ya kisukari na daktari wa kujifungua pamoja.',
      },
    },
    {
      q: { en: 'I feel exhausted and hopeless about managing this every day. Is that normal?', sw: 'Nimechoka na sijaona matumaini ya kusimamia hili kila siku. Hii ni kawaida?' },
      a: {
        en: 'Yes — and it has a name: diabetes distress. It is not laziness or weakness. Diabetes asks for daily decisions about food, medicines, monitoring, foot care — every single day with no break, for years. About 1 in 3 people with diabetes feel this way at some point, and depression is 2-3 times more common in diabetes than in the general population. The exhausted feeling itself makes self-care harder, which raises sugars, which makes you feel worse — a real cycle. Two things to know: (1) it is treatable. Talking therapies and, sometimes, antidepressant medicine can help. (2) Telling your doctor about it is not a sign that you are failing — it is a sign you are taking the disease seriously enough to ask for the right kind of help. Many people feel much better after addressing this.',
        sw: 'Ndio — na ina jina: "diabetes distress." Si uvivu wala udhaifu. Kisukari kinaomba maamuzi ya kila siku kuhusu chakula, dawa, kupima, kutunza miguu — kila siku bila mapumziko, kwa miaka. Karibu 1 kati ya 3 wenye kisukari wanahisi hivi wakati fulani, na depression ni mara 2-3 ya kawaida zaidi katika kisukari kuliko kwa jamii kwa ujumla. Hisia ya uchovu yenyewe inafanya kujitunza kuwa kugumu zaidi, ambacho kinainua sukari, ambacho kinakufanya ujisikie vibaya zaidi — mzunguko wa kweli. Mambo mawili: (1) inatibika. Tiba za kuongea na, wakati mwingine, dawa ya kupambana na depression zinaweza kusaidia. (2) Kumwambia daktari wako kuhusu hili si ishara kwamba unashindwa — ni ishara unachukua ugonjwa kwa uzito wa kutosha kuomba msaada wa aina sahihi.',
        sw_mtaa: 'Ndio — na ina jina: "diabetes distress." Si uvivu wala udhaifu. Kisukari kinakuhitaji ufanye maamuzi kila siku kuhusu chakula, dawa, kupima, miguu — kila siku bila mapumziko, kwa miaka. Karibu 1 kati ya 3 wenye kisukari wanahisi hivi wakati fulani, na depression ni mara 2-3 zaidi kwa watu wenye kisukari. Hisia ya uchovu inafanya kujitunza kuwa kugumu zaidi, sukari inapanda, unajisikia vibaya zaidi — mzunguko wa kweli. Mambo mawili: (1) inatibika — therapy na wakati mwingine dawa za depression zinasaidia. (2) Kumwambia daktari sio ishara kwamba unashindwa — ni ishara unachukua ugonjwa kwa uzito wa kutosha kuomba msaada sahihi. Watu wengi wanajisikia poa sana baada ya kushughulikia hii.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take your diabetes medicines at the same time every day. Setting a phone reminder or linking the dose to a daily habit (morning tea, evening prayer) keeps you consistent. Missing doses for days is the most common reason sugars climb.',
      sw: 'Chukua dawa zako za kisukari wakati uleule kila siku. Kuweka kikumbusho cha simu au kufungamanisha dose na tabia ya kila siku (chai ya asubuhi, sala ya jioni) kunakuweka thabiti. Kukosa dose kwa siku ndiyo sababu ya kawaida ya sukari kupanda.',
      sw_mtaa: 'Kunywa dawa zako saa moja kila siku. Reminder ya simu, au kufungamanisha dose na chai ya asubuhi au sala ya jioni — inakuweka consistent. Kuruka dose siku za mfululizo ndio sababu kuu sukari inapanda.',
    },
    {
      en: 'Eat at regular times. Skipping meals while taking diabetes medicine can cause dangerous low sugars. Three meals a day at roughly the same times, with smaller portions of starches and more vegetables, gives the most stable control.',
      sw: 'Kula kwa muda thabiti. Kuruka milo wakati unatumia dawa ya kisukari kunaweza kusababisha sukari ya chini hatari. Milo mitatu kwa siku katika nyakati sawa, pamoja na sehemu ndogo za vyakula vyenye wanga na mboga zaidi, hutoa udhibiti thabiti zaidi.',
      sw_mtaa: 'Kula kwa nyakati thabiti. Kuruka milo wakati uko kwenye dawa za kisukari kunaweza kushusha sukari sana (hatari). Milo mitatu kwa siku saa zile zile, na portion ndogo za wanga na mboga nyingi — hii ni stable zaidi.',
    },
    {
      en: 'Walk briskly for at least 30 minutes, 5 days a week. Walking after meals is especially helpful — even 10 minutes after dinner can lower the blood sugar peak by 30%. Exercise makes the body more sensitive to insulin for up to 24 hours.',
      sw: 'Tembea kwa kasi kwa angalau dakika 30, siku 5 kwa wiki. Kutembea baada ya milo ni msaada hasa — hata dakika 10 baada ya chakula cha jioni kunaweza kupunguza kilele cha sukari kwa 30%. Mazoezi yanafanya mwili kuwa nyeti zaidi kwa insulin kwa hadi masaa 24.',
      sw_mtaa: 'Tembea kwa kasi dakika 30, siku 5 kwa wiki. Kutembea baada ya chakula ni nzuri sana — hata dakika 10 baada ya chakula cha jioni kunaweza kushusha sukari kwa 30%. Mazoezi yanaweka mwili "sensitive" zaidi kwa insulin masaa hadi 24.',
    },
    {
      en: 'Cut sweet drinks completely. Soda, sweetened tea, sweetened juice, energy drinks — these are the fastest way to spike blood sugar. Water, plain tea, unsweetened milk, and coconut water are safer. If you want a sweet taste occasionally, fruit (especially with the skin) is far better than juice.',
      sw: 'Acha kabisa vinywaji vitamu. Soda, chai tamu, juice tamu, vinywaji vya nguvu — hizi ni njia ya haraka zaidi ya kupandisha sukari ya damu. Maji, chai bila sukari, maziwa bila sukari, na maji ya nazi ni salama zaidi. Ukitaka ladha tamu mara chache, tunda (hasa pamoja na ngozi) ni bora zaidi kuliko juice.',
      sw_mtaa: 'Acha kabisa soda, chai tamu, juice tamu, energy drinks — hizi zinapandisha sukari haraka kuliko kitu chochote. Maji, chai bila sukari, maziwa bila sukari, maji ya nazi — salama. Ukitaka kitu tamu, kula tunda (hasa na ngozi yake) badala ya juice.',
    },
    {
      en: 'Check your blood sugar at home if you can afford a meter. For type 2 on tablets only: fasting morning sugar 2-3 times a week is usually enough. For people on insulin: check 2-4 times a day, more if sick. Write the numbers down with dates — bring this log to every clinic visit. Numbers from your own life are worth more than one clinic test.',
      sw: 'Pima sukari yako ya damu nyumbani ikiwa unaweza kumudu mita. Kwa aina ya 2 walio kwenye vidonge tu: sukari ya asubuhi kabla ya kula mara 2-3 kwa wiki kawaida inatosha. Kwa watu wanaotumia insulin: pima mara 2-4 kwa siku, zaidi ukiwa mgonjwa. Andika namba na tarehe — lete kitabu hiki kila ziara ya kliniki.',
      sw_mtaa: 'Pima sukari nyumbani ukiwa na mita. Aina ya 2 kwenye vidonge tu: sukari ya asubuhi mara 2-3 kwa wiki inatosha. Wanaotumia insulin: mara 2-4 kwa siku, zaidi ukiwa mgonjwa. Andika namba na tarehe kwenye kitabu kidogo — lete kliniki kila ziara.',
    },
    {
      en: 'Inspect your feet every single day. Look at the soles, between the toes, around the heels, and the tops. Look for cuts, blisters, redness, swelling, or color changes. Diabetes can numb your feet so you do not feel injuries — and small cuts can become serious wounds in days. Wash daily with clean water and mild soap, dry well (especially between toes), and never walk barefoot, even indoors.',
      sw: 'Kagua miguu yako kila siku moja. Angalia chini ya miguu, kati ya vidole, kuzunguka visigino, na juu ya miguu. Angalia majeraha, malenge, wekundu, uvimbe, au mabadiliko ya rangi. Kisukari kinaweza kuzuia hisia za miguu yako, hivyo hujisikii majeraha — na majeraha madogo yanaweza kuwa makubwa ndani ya siku. Osha kila siku kwa maji safi na sabuni laini, kausha vizuri (hasa kati ya vidole), na kamwe usitembee bila viatu, hata ndani ya nyumba.',
      sw_mtaa: 'Kagua miguu yako KILA siku. Chini ya miguu, kati ya vidole, kuzunguka visigino, juu ya miguu. Tafuta majeraha, malenge, wekundu, uvimbe, rangi imebadilika. Kisukari kinaweza kufanya miguu ipoteze hisia, hivyo huwezi kuhisi majeraha. Osha kila siku, kausha kati ya vidole, na kamwe usitembee bila viatu, hata ndani ya nyumba.',
    },
    {
      en: 'See an eye doctor once a year for a dilated retinal exam — even if your vision feels fine. Diabetic eye damage starts silently and can be reversed if caught early, but is irreversible once you see changes in vision. The Tanzania Diabetes Association recommends annual screening from diagnosis onwards.',
      sw: 'Ona daktari wa macho mara moja kwa mwaka kwa uchunguzi wa retina iliyopanuliwa — hata kama macho yanaonekana sawa. Uharibifu wa macho wa kisukari unaanza kimya na unaweza kurudi nyuma ikiwa unaonekana mapema, lakini hauwezi kurudishwa ukiwa tayari unaona mabadiliko ya kuona. Tanzania Diabetes Association inashauri uchunguzi wa kila mwaka.',
      sw_mtaa: 'Ona daktari wa macho mara moja kwa mwaka kwa "dilated retinal exam" — hata kama macho yanaonekana poa. Uharibifu wa macho wa kisukari unaanza kimya, unaweza kurudi nyuma ukikamatwa mapema, lakini ukiwa tayari unaona vibaya — ni late. Tanzania Diabetes Association inashauri screening kila mwaka.',
    },
    {
      en: 'Get a urine test for protein (microalbumin) and a blood test for creatinine at least once a year. These are early warnings for kidney damage — if caught at the protein-in-urine stage, the right medicines (ACE inhibitors or ARBs) can dramatically slow the progression to dialysis.',
      sw: 'Pata kipimo cha protini kwenye mkojo (microalbumin) na kipimo cha damu cha creatinine angalau mara moja kwa mwaka. Hizi ni onyo la mapema la uharibifu wa figo — ikikamatwa katika hatua ya protini kwenye mkojo, dawa sahihi (ACE inhibitors au ARBs) zinaweza kupunguza kwa kiasi kikubwa maendeleo ya kufikia dialysis.',
      sw_mtaa: 'Pata kipimo cha protini kwenye mkojo (microalbumin) na creatinine ya damu angalau mara moja kwa mwaka. Hii ni warning ya mapema ya uharibifu wa figo — ikikamatwa kwenye hatua ya protini-kwenye-mkojo, dawa sahihi zinaweza kuchelewesha sana kufika kwenye dialysis.',
    },
    {
      en: 'Sleep 7-8 hours a night when possible. Poor sleep raises blood sugar the next day — even in people without diabetes. Untreated sleep apnea (loud snoring, gasping at night, daytime exhaustion) is especially common in people with type 2 diabetes and worsens sugar control. If your partner says you stop breathing at night, tell your doctor.',
      sw: 'Lala masaa 7-8 kwa usiku ikiwezekana. Kulala vibaya kunainua sukari ya damu siku ya pili — hata kwa watu wasio na kisukari. Sleep apnea isiyotibiwa (kukoroma kwa sauti, kushindwa pumzi usiku, uchovu wa mchana) ni ya kawaida sana kwa watu wenye kisukari aina ya 2. Ikiwa mwenza wako anasema unasimamisha kupumua usiku, mwambie daktari wako.',
      sw_mtaa: 'Lala masaa 7-8 ukiwezekana. Kulala vibaya kunapandisha sukari siku ya pili — hata kwa wasio na kisukari. Sleep apnea isiyotibiwa (kukoroma kwa sauti, kushindwa pumzi usiku, uchovu wa mchana) ni kawaida sana kwa kisukari aina ya 2. Mwenza wako akisema unaacha kupumua usiku, mwambie daktari.',
    },
    {
      en: 'Get your blood pressure checked every visit, and your cholesterol once a year. Diabetes plus high BP plus high cholesterol multiplies heart and stroke risk far more than each alone. Most adults with diabetes also need a statin (cholesterol-lowering pill) by their 50s, even if cholesterol numbers look "okay."',
      sw: 'Pima shinikizo lako la damu kila ziara, na cholesterol mara moja kwa mwaka. Kisukari pamoja na BP ya juu pamoja na cholesterol ya juu inazidisha hatari ya moyo na kiharusi mbali zaidi kuliko kila moja peke yake. Watu wengi wazima wenye kisukari pia wanahitaji statin (kidonge cha kupunguza cholesterol) wakifika miaka ya 50, hata kama namba za cholesterol zinaonekana "sawa."',
      sw_mtaa: 'Pima BP kila ziara, na cholesterol mara moja kwa mwaka. Kisukari + BP juu + cholesterol juu inazidisha hatari ya moyo na stroke kuliko kila moja peke yake. Watu wengi wazima wenye kisukari wanahitaji statin (kidonge cha cholesterol) wakifika miaka ya 50.',
    },
    {
      en: 'Get a flu vaccine yearly and the pneumococcal vaccine once. People with diabetes have weaker immune responses; flu and pneumonia hit them harder. These vaccines reduce hospitalizations significantly.',
      sw: 'Pata chanjo ya mafua kila mwaka na chanjo ya pneumococcal mara moja. Watu wenye kisukari wana ulinzi wa kinga mdhaifu zaidi; mafua na nimonia vinawapiga zaidi. Chanjo hizi hupunguza kulazwa hospitali kwa kiasi kikubwa.',
      sw_mtaa: 'Pata chanjo ya mafua kila mwaka, na chanjo ya pneumococcal mara moja. Watu wenye kisukari wana kinga dhaifu zaidi; mafua na nimonia vinawapiga zaidi. Chanjo hizi zinapunguza kulazwa hospitali sana.',
    },
    {
      en: 'See a dentist twice a year. Diabetes raises the risk of gum disease, which in turn worsens sugar control — a two-way street. Untreated dental infections can dangerously raise blood sugar.',
      sw: 'Ona daktari wa meno mara mbili kwa mwaka. Kisukari kinainua hatari ya ugonjwa wa fizi, ambayo kwa upande wake inazidisha udhibiti wa sukari — barabara ya pande mbili. Maambukizi ya meno yasiyotibiwa yanaweza kuinua sukari ya damu kwa hatari.',
      sw_mtaa: 'Ona daktari wa meno mara mbili kwa mwaka. Kisukari kinaongeza hatari ya ugonjwa wa fizi, ambao unaharibu udhibiti wa sukari — vinazungushana. Maambukizi ya meno yasiyotibiwa yanaweza kupandisha sukari kwa hatari.',
    },
  ],

  warningTriggers: [
    {
      en: 'Sugary drinks (soda, juice, sweetened tea) — the fastest sugar spike, and the most underestimated.',
      sw: 'Vinywaji vitamu (soda, juice, chai tamu) — sukari inapanda haraka zaidi, na inadharauliwa zaidi.',
      sw_mtaa: 'Soda, juice, chai tamu — sukari inapanda haraka kuliko kitu kingine, na watu wanadharau.',
    },
    {
      en: 'Refined starches in large portions (white rice, ugali, chapati, mandazi, white bread).',
      sw: 'Wanga zilizosafishwa katika sehemu kubwa (wali mweupe, ugali, chapati, mandazi, mkate mweupe).',
      sw_mtaa: 'Portion kubwa za ugali, wali mweupe, chapati, mandazi, mkate mweupe.',
    },
    {
      en: 'Skipping diabetes medicines for days at a time.',
      sw: 'Kuruka dawa za kisukari kwa siku kadhaa mfululizo.',
      sw_mtaa: 'Kuruka dawa zako kwa siku kadhaa.',
    },
    {
      en: 'Steroid medicines (prednisolone, dexamethasone) prescribed for asthma, joint pain, or skin conditions — they significantly raise blood sugar. Always tell the prescribing doctor you have diabetes.',
      sw: 'Dawa za steroid (prednisolone, dexamethasone) zinazoagizwa kwa pumu, maumivu ya viungo, au hali za ngozi — zinainua sukari ya damu kwa kiasi kikubwa. Mwambie daima daktari anayeagiza dawa kuwa una kisukari.',
      sw_mtaa: 'Dawa za steroid (prednisolone, dexamethasone) zilizoandikwa kwa pumu, maumivu ya viungo, au ngozi — zinapandisha sukari sana. Mwambie daima daktari anayeagiza dawa unaye kisukari.',
    },
    {
      en: 'Untreated infections (UTI, dental abscesses, foot wounds, chest infections) — illness raises blood sugar even with the usual diet and medicines.',
      sw: 'Maambukizi yasiyotibiwa (UTI, jipu la jino, vidonda vya miguu, maambukizi ya kifua) — ugonjwa unainua sukari ya damu hata na chakula na dawa za kawaida.',
      sw_mtaa: 'Maambukizi yasiyotibiwa (UTI, jipu la jino, vidonda vya miguu, maambukizi ya kifua) — ugonjwa unapandisha sukari hata ukila kawaida na kunywa dawa zako.',
    },
    {
      en: 'Heavy alcohol use — both raises sugars after the drinking and causes dangerous low sugars hours later, especially if you skip meals while drinking.',
      sw: 'Kunywa pombe nyingi — inainua sukari baada ya kunywa na pia inasababisha sukari ya chini hatari masaa baadaye, hasa ukiruka milo wakati unakunywa.',
      sw_mtaa: 'Kunywa pombe sana — inapandisha sukari baada ya kunywa, halafu masaa baadaye inashusha sukari sana (hatari), hasa ukiruka milo ukinywa.',
    },
    {
      en: 'Severe stress and grief — these raise stress hormones that push blood sugar up for weeks at a time.',
      sw: 'Msongo mkubwa na huzuni — hizi zinainua homoni za msongo zinazosukuma sukari ya damu juu kwa wiki kwa wakati mmoja.',
      sw_mtaa: 'Stress kubwa na huzuni — zinapandisha homoni za stress, sukari inapanda kwa wiki.',
    },
    {
      en: 'Sedentary days in a row — even one week of not walking visibly raises fasting sugar.',
      sw: 'Siku mfululizo za kukaa bila kufanya kitu — hata wiki moja ya kutotembea inainua sukari ya kabla ya kula kwa kuonekana.',
      sw_mtaa: 'Siku za mfululizo za kukaa tu bila mazoezi — hata wiki moja ya kutotembea, sukari ya asubuhi inapanda.',
    },
    {
      en: 'Sleep loss for several nights — raises insulin resistance and fasting sugar.',
      sw: 'Kupoteza usingizi kwa usiku kadhaa — kunainua insulin resistance na sukari ya kabla ya kula.',
      sw_mtaa: 'Kupoteza usingizi usiku kadhaa — kunaongeza insulin resistance na sukari ya asubuhi.',
    },
  ],

  whenToSeekCare: [
    // ─── EMERGENCY ─────────────────────────────────────────────────────
    {
      sign: {
        en: 'Deep fast breathing, breath smelling of fruit or nail polish remover (acetone), severe stomach pain, vomiting, confusion — this can be diabetic ketoacidosis (DKA). Common in type 1, can happen in type 2.',
        sw: 'Kupumua kwa kina na haraka, pumzi yenye harufu ya matunda au asetoni, maumivu makali ya tumbo, kutapika, kuchanganyikiwa — hii inaweza kuwa diabetic ketoacidosis (DKA). Kawaida katika aina ya 1, inaweza kutokea katika aina ya 2.',
        sw_mtaa: 'Kupumua kwa kina na haraka, pumzi inanuka kama matunda au "nail polish remover," tumbo kuuma sana, kutapika, kuchanganyikiwa — hii inaweza kuwa DKA. Kawaida aina ya 1, lakini inaweza kutokea aina ya 2.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Severe thirst, very dry mouth, sunken eyes, no urination for many hours, drowsiness or confusion in an older adult with type 2 diabetes — this can be hyperosmolar hyperglycemic state (HHS). Sugars are often above 33 mmol/L. Mortality is high if not treated quickly.',
        sw: 'Kiu kali, mdomo mkavu sana, macho yamezama, kutokojoa kwa masaa mengi, usingizi au kuchanganyikiwa kwa mtu mzima mwenye kisukari aina ya 2 — hii inaweza kuwa hyperosmolar hyperglycemic state (HHS). Sukari mara nyingi iko juu ya 33 mmol/L. Vifo ni vya juu ikiwa haitatibiwa haraka.',
        sw_mtaa: 'Kiu kali sana, mdomo mkavu sana, macho yamezama, kutokojoa masaa mengi, usingizi au kuchanganyikiwa kwa mtu mzima mwenye kisukari aina ya 2 — hii inaweza kuwa HHS. Sukari mara nyingi juu ya 33 mmol/L. Hatari ya kifo iko juu sana kama haitatibiwa haraka.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Cannot wake up, having a seizure, or so confused they cannot safely swallow — severe hypoglycemia. If sugar can be checked and is below 4 mmol/L, give sugar by mouth only if alert; otherwise rush to hospital.',
        sw: 'Kushindwa kuamka, kifafa, au amechanganyikiwa sana kiasi kwamba hawezi kumeza salama — hypoglycemia kali. Ikiwa sukari inaweza kupimwa na iko chini ya 4 mmol/L, mpe sukari kwa mdomo tu ikiwa ana fahamu; vinginevyo kimbiza hospitali.',
        sw_mtaa: 'Hawezi kuamka, ana kifafa, au amechanganyikiwa sana hawezi kumeza salama — hypoglycemia kali. Ukipima sukari iko chini ya 4 mmol/L, mpe sukari kwa mdomo tu kama ana fahamu; vinginevyo kimbiza hospitali.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Foot wound that is red, hot, swollen, smelly, or with pus — diabetic foot infection can spread fast and threaten the limb. Do not wait for the next clinic day.',
        sw: 'Kidonda cha mguu chenye wekundu, joto, uvimbe, harufu mbaya, au usaha — maambukizi ya mguu ya kisukari yanaweza kuenea haraka na kutishia kiungo. Usisubiri siku ya kliniki inayofuata.',
        sw_mtaa: 'Kidonda cha mguu chenye wekundu, joto, uvimbe, harufu mbaya, au usaha — maambukizi ya mguu ya kisukari yanaweza kuenea haraka, hata kupelekea mguu kukatwa. Usisubiri siku ya kliniki ya kawaida.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Chest pain, jaw or arm pain, shortness of breath, cold sweats — heart attack symptoms can be unusual in diabetes (sometimes no chest pain at all, just shortness of breath or extreme fatigue).',
        sw: 'Maumivu ya kifua, maumivu ya taya au mkono, kushindwa kupumua, jasho baridi — dalili za mshtuko wa moyo zinaweza kuwa zisizo za kawaida katika kisukari (wakati mwingine bila maumivu ya kifua kabisa).',
        sw_mtaa: 'Maumivu ya kifua, taya, au mkono, kushindwa kupumua, jasho baridi — dalili za heart attack zinaweza kuwa "atypical" kwa watu wenye kisukari (wakati mwingine hakuna maumivu ya kifua kabisa, tu kushindwa kupumua au uchovu mkali).',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Sudden weakness on one side of the body, slurred speech, drooping face, sudden severe headache — stroke symptoms. Diabetes raises stroke risk 2-4 times.',
        sw: 'Udhaifu wa ghafla upande mmoja wa mwili, kushindwa kuongea vizuri, uso kushuka upande mmoja, kichwa kinachouma sana ghafla — dalili za kiharusi. Kisukari kinainua hatari ya kiharusi mara 2-4.',
        sw_mtaa: 'Udhaifu wa ghafla upande mmoja, kushindwa kuongea vizuri, uso umekaa upande mmoja, kichwa kinachouma sana ghafla — dalili za stroke. Kisukari kinaongeza hatari ya stroke mara 2-4.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    // ─── URGENT ────────────────────────────────────────────────────────
    {
      sign: {
        en: 'Repeated low blood sugars (3+ in a week), even after meals — your doses likely need adjustment.',
        sw: 'Sukari ya chini ya mara kwa mara (3+ kwa wiki), hata baada ya milo — dose zako huenda zinahitaji marekebisho.',
        sw_mtaa: 'Sukari kushuka chini mara kwa mara (3+ kwa wiki), hata baada ya milo — dose zako zinahitaji rekebisho.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Blood sugar consistently above 16 mmol/L for several days, especially with thirst, tiredness, frequent urination.',
        sw: 'Sukari ya damu inabaki juu ya 16 mmol/L kwa siku kadhaa, hasa pamoja na kiu, uchovu, kukojoa mara kwa mara.',
        sw_mtaa: 'Sukari kubaki juu ya 16 mmol/L kwa siku kadhaa, hasa pamoja na kiu, uchovu, kukojoa mara nyingi.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Sudden blurry vision, flashes of light, dark "floaters," or any sudden loss of vision in one eye — possible retinal hemorrhage or detachment.',
        sw: 'Kuona ukungu ghafla, miali ya mwanga, "floaters" za giza, au kupoteza ghafla kwa kuona katika jicho moja — uwezekano wa kuvuja kwa damu kwenye retina au kutengana.',
        sw_mtaa: 'Kuona vibaya ghafla, miali ya mwanga, "floaters" za giza, au kupoteza ghafla kuona kwenye jicho moja — uwezekano wa kuvuja kwa damu kwenye retina au kutengana.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Vomiting that prevents you from keeping fluids or medicines down for more than a few hours — risk of DKA/HHS without warning.',
        sw: 'Kutapika kunakuzuia kuhifadhi vimiminika au dawa kwa zaidi ya masaa machache — hatari ya DKA/HHS bila onyo.',
        sw_mtaa: 'Kutapika kunakuzuia kunywa au kunywa dawa kwa zaidi ya masaa machache — hatari ya DKA/HHS bila warning.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    // ─── SOON ──────────────────────────────────────────────────────────
    {
      sign: {
        en: 'New numbness, burning, or pain in feet at night that is severe enough to disturb sleep — diabetic nerve damage that may need treatment.',
        sw: 'Ganzi mpya, kuungua, au maumivu kwenye miguu usiku ya kiwango cha kuvuruga usingizi — uharibifu wa neva wa kisukari ambao unaweza kuhitaji matibabu.',
        sw_mtaa: 'Ganzi mpya, kuungua, au maumivu ya miguu usiku yanayokufanya ushindwe kulala — uharibifu wa neva wa kisukari ambao unaweza kuhitaji matibabu.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Foam in your urine, swelling of ankles or face that is new — possible kidney leak of protein.',
        sw: 'Povu kwenye mkojo, uvimbe wa vifundo vya miguu au uso ulio mpya — uwezekano wa figo kuvujisha protini.',
        sw_mtaa: 'Povu kwenye mkojo, uvimbe mpya wa vifundo vya miguu au uso — uwezekano figo zinavujisha protini.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    {
      sign: {
        en: 'A skin wound, especially on the legs, that has not healed in 2 weeks.',
        sw: 'Kidonda cha ngozi, hasa kwenye miguu, ambacho hakijapona ndani ya wiki 2.',
        sw_mtaa: 'Kidonda cha ngozi, hasa miguuni, ambacho hakijapona ndani ya wiki 2.',
      },
      urgency: 'soon' as UrgencyLevel,
    },
    // ─── ROUTINE ───────────────────────────────────────────────────────
    {
      sign: {
        en: 'Recurring fungal infections (under breasts, in groin, between toes, vaginal thrush) — common in poorly controlled diabetes. Manageable; tell your doctor.',
        sw: 'Maambukizi ya fangasi mara kwa mara (chini ya matiti, kinena, kati ya vidole, fangasi wa uke) — kawaida katika kisukari kisichodhibitiwa vizuri. Inaweza kudhibitiwa; mwambie daktari.',
        sw_mtaa: 'Maambukizi ya fangasi mara kwa mara (chini ya matiti, kinena, kati ya vidole, fangasi wa uke) — kawaida katika kisukari kisichodhibitiwa vizuri. Inaweza kudhibitiwa; mwambie daktari.',
      },
      urgency: 'routine' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Feeling persistently low, hopeless, exhausted, or finding diabetes self-care feels impossible — "diabetes distress" and depression are 2-3x more common in diabetes. They are real, treatable, and not a sign of weakness. Tell your doctor.',
        sw: 'Kujisikia chini, bila matumaini, uchovu kwa muda mrefu, au kuhisi kujitunza kisukari ni kazi isiyowezekana — "diabetes distress" na depression ni mara 2-3 ya kawaida zaidi katika kisukari. Ni za kweli, zinatibika, na sio ishara ya udhaifu. Mwambie daktari wako.',
        sw_mtaa: 'Kujisikia chini, bila matumaini, uchovu kwa muda mrefu, au kujisikia kujitunza kisukari "ni mzigo" — "diabetes distress" na depression ni mara 2-3 zaidi kwa watu wenye kisukari. Ni za kweli, zinatibika, na sio udhaifu. Mwambie daktari.',
      },
      urgency: 'routine' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Sexual difficulties — diabetes commonly affects erections in men, and lubrication and sensation in women. Treatable in most cases. Tell your doctor without embarrassment; this is medical territory.',
        sw: 'Matatizo ya kingono — kisukari mara nyingi huathiri uimara kwa wanaume, na unyevu na hisia kwa wanawake. Yanatibika katika hali nyingi. Mwambie daktari bila aibu; hii ni eneo la kimatibabu.',
        sw_mtaa: 'Matatizo ya kingono — kisukari mara nyingi huathiri uimara wa kiume kwa wanaume, na unyevu na hisia kwa wanawake. Inatibika kwa wengi. Mwambie daktari bila aibu; hii ni eneo la matibabu.',
      },
      urgency: 'routine' as UrgencyLevel,
    },
  ],

  sources: [
    src('ADA_2024'),
    src('IDF_DIABETES_2025'),
    src('WHO_DIABETES_2024'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.2.0',
  },
};
