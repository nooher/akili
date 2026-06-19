/**
 * Salbutamol — Drug Knowledge (Phase 9 asthma block)
 *
 * Sources: WHO PEN 2020, WHO AWaRe 2023 (Access category), NTLG STG 2023,
 *          Muhimbili Protocols, BNF current, EMC current, IMCI 2024.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Salbutamol (albuterol in the US, brand name Ventolin) is THE reliever
 *   for asthma. Almost every asthmatic in Tanzania has used a "blue inhaler"
 *   at some point. The crucial teaching points are NOT about dose — they
 *   are about the relationship between reliever and controller: salbutamol
 *   treats the SYMPTOM (bronchospasm), not the underlying inflammation,
 *   and over-reliance on it is the biggest single risk factor for severe
 *   asthma attacks and asthma death. People who use more than one canister
 *   a month are at highest risk.
 *
 * Scope note:
 *   We educate on what salbutamol does, when to use it, spacer technique,
 *   pre-exercise dosing, side effects (tremor, tachycardia), and the
 *   critical "if you need it >2x/week your asthma isn't controlled"
 *   teaching. We do NOT prescribe doses — clinician territory.
 */

import { DrugKnowledge, UrgencyLevel } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const SALBUTAMOL: DrugKnowledge = {
  id: 'salbutamol',
  aliases: DRUG_ALIASES.salbutamol,

  drugClass: {
    en: 'Short-acting beta-2 agonist (SABA) — quick-acting bronchodilator, WHO Access category, the standard reliever for asthma',
    sw: 'Beta-2 agonist inayofanya kazi haraka (SABA) — kipanua mishipa ya hewa kinachofanya kazi haraka, kategoria ya WHO Access, reliever ya kawaida ya pumu',
  },

  whatItDoes: {
    en: 'Salbutamol relaxes the muscle that wraps around the airways in the lung. In asthma, those muscles tighten in response to triggers, narrowing the airways and making breathing hard. Salbutamol acts within minutes to unclench them — within 5 minutes for inhaled doses, peaking around 15-30 minutes, lasting 3-6 hours. It is called a "reliever" because it relieves the symptom — the wheeze, tightness, breathlessness — fast. What it does NOT do is treat the underlying inflammation of the airway lining, which is the real engine of asthma. That is the job of the inhaled steroid (controller). Using only salbutamol is like using painkillers for a broken bone without setting it: you feel better in the moment, but the problem keeps getting worse.',
    sw: 'Salbutamol hutuliza misuli inayozungushwa kuzunguka njia za hewa mapafuni. Katika pumu, misuli hiyo hujikaza kwa kujibu vichocheo, kupunguza njia za hewa na kufanya kupumua kuwa kugumu. Salbutamol hutenda ndani ya dakika kuilegezea — ndani ya dakika 5 kwa dose za kuvuta, kilele cha dakika 15-30, hudumu masaa 3-6. Inaitwa "reliever" kwa sababu hupunguza dalili — wheeze, kubana, kushindwa kupumua — haraka. Kile ASIYO fanya ni kutibu uvimbe wa msingi wa kitambaa cha njia ya hewa, ambao ndio injini halisi ya pumu. Hiyo ni kazi ya steroid ya kuvuta (controller). Kutumia salbutamol pekee ni kama kutumia dawa za kupunguza maumivu kwa mfupa uliovunjika bila kuuweka: unajihisi vizuri sasa, lakini tatizo linaendelea kuwa baya.',
    sw_mtaa: 'Salbutamol inarelax misuli inayozungushwa kuzunguka airways katika lung. Katika pumu, misuli hiyo inatighten kwa response ya triggers, kupunguza airways na kufanya breathing kuwa hard. Salbutamol inaact within minutes kuiunclench — within dakika 5 kwa inhaled doses, peaking around dakika 15-30, inadumu masaa 3-6. Inaitwa "reliever" kwa sababu inarelieve symptom — wheeze, tightness, breathlessness — fast. What it does NOT do ni kutibu underlying inflammation ya airway lining, ambayo ndio real engine ya pumu. Hiyo ni job ya inhaled steroid (controller). Kutumia salbutamol pekee ni kama kutumia painkillers kwa broken bone without setting it: unajihisi better sasa, lakini problem inaendelea kuwa worse.',
  },

  commonUses: [
    {
      en: 'Reliever for asthma symptoms — wheeze, cough, chest tightness, breathlessness — used as needed (not on a fixed schedule unless directed by the clinician for a specific reason).',
      sw: 'Reliever kwa dalili za pumu — wheeze, kikohozi, kifua kubana, kushindwa kupumua — hutumika inapohitajika (sio kwa ratiba thabiti isipokuwa daktari ameelekeza kwa sababu maalum).',
      sw_mtaa: 'Reliever kwa asthma symptoms — wheeze, cough, chest tightness, breathlessness — inatumika as needed (sio kwa fixed schedule isipokuwa clinician ameelekeza kwa specific reason).',
    },
    {
      en: 'Pre-treatment 10-15 minutes before exercise to prevent exercise-induced bronchospasm.',
      sw: 'Matibabu ya kabla dakika 10-15 kabla ya mazoezi kuzuia bronchospasm inayochochewa na mazoezi.',
      sw_mtaa: 'Pre-treatment 10-15 minutes kabla ya exercise kuprevent exercise-induced bronchospasm.',
    },
    {
      en: 'Acute asthma exacerbation — through metered-dose inhaler with spacer (4-10 puffs every 20 minutes) or via nebuliser (5 mg every 20 minutes in adults).',
      sw: 'Shambulizi la pumu la papo hapo — kupitia metered-dose inhaler na spacer (puffs 4-10 kila dakika 20) au kupitia nebuliser (5 mg kila dakika 20 kwa watu wazima).',
      sw_mtaa: 'Acute asthma exacerbation — through metered-dose inhaler na spacer (4-10 puffs kila dakika 20) au via nebuliser (5 mg kila dakika 20 kwa adults).',
    },
    {
      en: 'COPD reliever (less effective in COPD than asthma but still useful). Also used in some hyperkalaemia protocols and in bronchospasm of any cause.',
      sw: 'Reliever ya COPD (yenye ufanisi mdogo katika COPD kuliko pumu lakini bado muhimu). Pia hutumika katika protocols za hyperkalaemia na bronchospasm ya sababu yoyote.',
      sw_mtaa: 'COPD reliever (less effective katika COPD kuliko pumu lakini bado useful). Pia inatumika katika some hyperkalaemia protocols na bronchospasm ya sababu yoyote.',
    },
  ],

  howItIsTaken: {
    en: 'Most often as a metered-dose inhaler (MDI) — the small pressurised "blue inhaler" with about 200 puffs in it. Each puff delivers 100 micrograms. The standard reliever dose for an adult is 1-2 puffs as needed; for an acute attack 4-10 puffs through a spacer, repeated every 20 minutes if needed. ALWAYS use a spacer if you have one — two to three times more medicine reaches the lungs that way, side effects are much less, and the technique is easier (you do not have to time the puff exactly with the breath). For children under 5 a spacer with a mask is essential. Other forms: nebuliser solution (used in clinics during attacks), oral tablets and syrup (less commonly used, more side effects), and dry-powder inhalers. Shake the MDI before each use, prime a new inhaler by spraying 2-4 test puffs into the air, and replace it before the dose counter reaches zero.',
    sw: 'Mara nyingi kama metered-dose inhaler (MDI) — "inhaler ya bluu" ndogo yenye shinikizo yenye karibu puffs 200 ndani yake. Kila puff hutoa micrograms 100. Dose ya kawaida ya reliever kwa mtu mzima ni puffs 1-2 inapohitajika; kwa shambulizi la papo hapo puffs 4-10 kupitia spacer, kurudiwa kila dakika 20 ikihitajika. DAIMA tumia spacer ikiwa unayo — dawa mara mbili hadi tatu zaidi inafikia mapafu kwa njia hiyo, madhara ni machache zaidi, na mbinu ni rahisi (huhitaji kuratibu puff hasa na pumzi). Kwa watoto chini ya miaka 5 spacer yenye mask ni muhimu. Aina nyingine: suluhisho la nebuliser (linalotumika katika kliniki wakati wa mashambulizi), vidonge vya kumeza na syrup (zinazotumika kidogo, madhara zaidi), na dry-powder inhalers. Tikisa MDI kabla ya kila matumizi, anzisha inhaler mpya kwa kunyunyizia puffs 2-4 za majaribio hewani, na ibadilishe kabla ya kihesabu cha dose kufika sifuri.',
    sw_mtaa: 'Most often kama metered-dose inhaler (MDI) — small pressurised "blue inhaler" yenye karibu 200 puffs ndani. Kila puff inadeliver 100 micrograms. Standard reliever dose kwa adult ni 1-2 puffs as needed; kwa acute attack 4-10 puffs through spacer, repeated kila dakika 20 ikihitajika. ALWAYS tumia spacer ikiwa unayo — two to three times more medicine inafikia lungs that way, side effects ni much less, na technique ni easier (huhitaji ku-time puff exactly na breath). Kwa watoto under 5 spacer na mask ni essential. Other forms: nebuliser solution (inayotumika katika clinics during attacks), oral tablets na syrup (less commonly used, more side effects), na dry-powder inhalers. Shake MDI before kila use, prime inhaler mpya kwa kuspray 2-4 test puffs hewani, na replace before dose counter inafika zero.',
  },

  commonSideEffects: [
    {
      en: 'Fine tremor — particularly of the hands, especially after several puffs in a short time. Settles within an hour; not harmful but uncomfortable.',
      sw: 'Tetemeko jema — hasa la mikono, hasa baada ya puffs kadhaa kwa muda mfupi. Hutulia ndani ya saa; sio hatari lakini ya usumbufu.',
      sw_mtaa: 'Fine tremor — hasa ya hands, hasa baada ya several puffs katika short time. Inatulia ndani ya saa; sio harmful lakini uncomfortable.',
    },
    {
      en: 'Fast heart rate or palpitations — the same beta-receptors that open airways also affect the heart. Mild and short-lived in standard doses.',
      sw: 'Mapigo ya haraka ya moyo au palpitations — beta-receptors zile zile zinazofungua njia za hewa pia huathiri moyo. Ndogo na za muda mfupi katika dose za kawaida.',
      sw_mtaa: 'Fast heart rate au palpitations — beta-receptors zile zile zinazofungua airways pia zinaathiri heart. Mild na short-lived katika standard doses.',
    },
    {
      en: 'Headache, especially after high-dose nebulised treatment.',
      sw: 'Kichwa kuuma, hasa baada ya matibabu ya nebulised ya dose ya juu.',
      sw_mtaa: 'Headache, hasa baada ya high-dose nebulised treatment.',
    },
    {
      en: 'Muscle cramps, particularly in the legs — more common with frequent high-dose use.',
      sw: 'Kuvuta kwa misuli, hasa miguuni — ya kawaida zaidi na matumizi ya mara kwa mara ya dose ya juu.',
      sw_mtaa: 'Muscle cramps, hasa katika miguu — more common na frequent high-dose use.',
    },
    {
      en: 'Mild irritation in the throat or mouth from inhaled spray hitting the tissue — much improved by using a spacer.',
      sw: 'Muwasho mdogo kwenye koo au mdomo kutokana na spray ya kuvuta inayogonga tishu — inaboresha sana kwa kutumia spacer.',
      sw_mtaa: 'Mild irritation katika throat au mouth kutokana na inhaled spray inayohit tissue — much improved kwa kutumia spacer.',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Severe paradoxical bronchospasm — wheezing actually getting worse after using the inhaler. Rare but serious; stop the inhaler and seek urgent review.',
        sw: 'Bronchospasm kali ya kinyume — wheeze inakuwa mbaya zaidi baada ya kutumia inhaler. Nadra lakini hatari; simamisha inhaler na tafuta mapitio ya haraka.',
        sw_mtaa: 'Severe paradoxical bronchospasm — wheeze inakuwa worse baada ya kutumia inhaler. Rare lakini serious; stop inhaler na tafuta urgent review.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Low blood potassium (hypokalaemia) — usually only with very high doses such as repeated nebulisers in hospital. Symptoms: weakness, muscle cramps, palpitations, irregular heartbeat.',
        sw: 'Potasiamu ya chini ya damu (hypokalaemia) — kawaida tu na dose za juu sana kama nebulizers za kurudiwa hospitalini. Dalili: udhaifu, kuvuta kwa misuli, palpitations, mapigo ya moyo yasiyo ya kawaida.',
        sw_mtaa: 'Low blood potassium (hypokalaemia) — kawaida tu na very high doses kama repeated nebulisers hospitalini. Symptoms: weakness, muscle cramps, palpitations, irregular heartbeat.',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Allergic reaction — angioedema (swelling of face, lips, tongue), hives, severe rash. Stop the inhaler and seek emergency care.',
        sw: 'Athari ya mzio — angioedema (uvimbe wa uso, midomo, ulimi), urticaria, vipele vikali. Simamisha inhaler na tafuta huduma ya dharura.',
        sw_mtaa: 'Allergic reaction — angioedema (swelling ya uso, midomo, ulimi), hives, severe rash. Stop inhaler na tafuta emergency care.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      effect: {
        en: 'Reliever no longer working — taking it every 20 minutes and still struggling. This is an EMERGENCY signal of severe asthma, not a side effect of the drug — go to hospital now and keep taking it on the way.',
        sw: 'Reliever haifanyi kazi tena — unaichukua kila dakika 20 na bado unashindwa. Hii ni ishara ya DHARURA ya pumu kali, sio athari ya dawa — nenda hospitali sasa na endelea kuichukua njiani.',
        sw_mtaa: 'Reliever haifanyi kazi tena — unaichukua kila dakika 20 na bado unashindwa. Hii ni EMERGENCY signal ya severe asthma, sio side effect ya drug — nenda hospital sasa na endelea kuichukua on the way.',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
  ],

  interactions: [
    {
      with: 'beta_blocker',
      withDisplay: { en: 'beta-blockers (atenolol, propranolol, bisoprolol, eye drops with timolol)', sw: 'beta-blockers (atenolol, propranolol, bisoprolol, matone ya jicho yenye timolol)' },
      severity: 'caution',
      explanation: {
        en: 'Beta-blockers block the receptors that salbutamol works on — they reduce its effectiveness and can themselves trigger bronchospasm in asthma. Non-selective beta-blockers (propranolol, timolol eye drops) are particularly problematic and generally avoided in asthma. Cardioselective ones (bisoprolol, atenolol, metoprolol) are safer but still need caution. If you have asthma, always mention it before any prescription for blood pressure, heart, or glaucoma — there are usually alternatives.',
        sw: 'Beta-blockers huzuia receptors ambazo salbutamol hufanya kazi juu yake — hupunguza ufanisi wake na zenyewe zinaweza kuchochea bronchospasm katika pumu. Beta-blockers zisizo na uchaguzi (propranolol, matone ya jicho ya timolol) ni za matatizo hasa na kawaida huepukwa katika pumu. Zile za cardioselective (bisoprolol, atenolol, metoprolol) ni salama zaidi lakini bado zinahitaji tahadhari. Ikiwa una pumu, daima taja kabla ya maagizo yoyote ya shinikizo la damu, moyo, au glaucoma — kawaida kuna mbadala.',
        sw_mtaa: 'Beta-blockers zinazuia receptors ambazo salbutamol inafanya kazi juu yake — zinapunguza effectiveness yake na zenyewe zinaweza kutrigger bronchospasm katika pumu. Non-selective beta-blockers (propranolol, timolol eye drops) ni particularly problematic na generally avoided katika pumu. Cardioselective ones (bisoprolol, atenolol, metoprolol) ni safer lakini bado zinahitaji caution. Ikiwa una pumu, always mention kabla ya prescription yoyote kwa BP, moyo, au glaucoma — kawaida kuna alternatives.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'theophylline',
      withDisplay: { en: 'theophylline / aminophylline', sw: 'theophylline / aminophylline' },
      severity: 'caution',
      explanation: {
        en: 'Combined with theophylline, salbutamol increases the risk of low potassium, fast heart rate, and palpitations. Patients on both should be monitored, especially during acute exacerbations when doses go up.',
        sw: 'Pamoja na theophylline, salbutamol huongeza hatari ya potasiamu ya chini, mapigo ya haraka ya moyo, na palpitations. Wagonjwa wanaotumia vyote wanapaswa kuchunguzwa, hasa wakati wa exacerbations za papo hapo wakati dose zinapanda.',
        sw_mtaa: 'Combined na theophylline, salbutamol inaongeza risk ya low potassium, fast heart rate, na palpitations. Wagonjwa kwa both wanapaswa kumonitored, especially wakati wa acute exacerbations wakati doses zinapanda.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'diuretics',
      withDisplay: { en: 'loop and thiazide diuretics (furosemide, bendroflumethiazide, hydrochlorothiazide)', sw: 'diuretics za loop na thiazide (furosemide, bendroflumethiazide, hydrochlorothiazide)' },
      severity: 'caution',
      explanation: {
        en: 'Both salbutamol and these diuretics lower blood potassium — combined, the effect adds up, especially during high-dose salbutamol (multiple nebulisers in an acute attack). Worth checking electrolytes in this combination.',
        sw: 'Salbutamol na diuretics hizi hupunguza potasiamu ya damu — pamoja, athari hujumlika, hasa wakati wa salbutamol ya dose ya juu (nebulizers nyingi katika shambulizi la papo hapo). Inafaa kuchunguza electrolytes katika mchanganyiko huu.',
        sw_mtaa: 'Both salbutamol na diuretics hizi zinapunguza blood potassium — combined, effect inaadd up, especially during high-dose salbutamol (multiple nebulisers katika acute attack). Worth checking electrolytes katika combination hii.',
      },
      sources: [src('BNF_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: { en: 'Use a spacer', sw: 'Tumia spacer' },
      note: {
        en: 'A spacer (a plastic chamber that fits between the inhaler and your mouth) transforms how much medicine reaches your lungs — two to three times more than direct inhaler use, far less in the throat. For children under 5 a spacer with a mask is essential — without it almost none of the medicine reaches the lungs. Spacers are inexpensive and last for years. Ask for one.',
        sw: 'Spacer (chemba ya plastiki inayowekwa kati ya inhaler na mdomo wako) hubadilisha ni kiasi gani cha dawa kinafikia mapafu yako — mara mbili hadi tatu zaidi ya matumizi ya inhaler ya moja kwa moja, kidogo zaidi katika koo. Kwa watoto chini ya 5 spacer yenye mask ni muhimu — bila yake karibu hakuna dawa inafikia mapafu. Spacers ni za bei nafuu na hudumu kwa miaka. Iulizie.',
        sw_mtaa: 'Spacer (plastic chamber inayowekwa between inhaler na mouth yako) inabadilisha how much medicine inafikia lungs yako — two to three times more kuliko direct inhaler use, far less katika throat. Kwa watoto under 5 spacer na mask ni essential — without it karibu hakuna medicine inafikia lungs. Spacers ni inexpensive na zinadumu kwa miaka. Iulizie.',
      },
    },
    {
      topic: { en: 'The reliever-control thermometer', sw: 'Kipima joto cha reliever-control' },
      note: {
        en: 'Track how often you actually need your salbutamol — it is the single best measure of asthma control. Needing it more than twice a week (not counting pre-exercise) means your asthma is NOT controlled and the controller plan needs review. Going through more than one canister a month puts you in a high-risk group for severe attacks. Do not see "I am using my reliever a lot" as proof your medicine is working — see it as a warning sign.',
        sw: 'Fuatilia mara ngapi unahitaji salbutamol yako kweli — ni kipimo bora zaidi cha udhibiti wa pumu. Kuihitaji zaidi ya mara mbili kwa wiki (bila kuhesabu kabla ya mazoezi) inamaanisha pumu yako HAIJADHIBITIWA na mpango wa controller unahitaji mapitio. Kupita zaidi ya canister moja kwa mwezi inakuweka katika kundi la hatari kubwa kwa mashambulizi makali. Usione "ninatumia reliever yangu sana" kama uthibitisho dawa yako inafanya kazi — ione kama ishara ya onyo.',
        sw_mtaa: 'Track how often unahitaji salbutamol yako kweli — ni single best measure ya asthma control. Kuihitaji zaidi ya mara mbili kwa wiki (bila kuhesabu pre-exercise) inamaanisha asthma yako HAIJADHIBITIWA na controller plan inahitaji review. Kupita zaidi ya canister moja kwa mwezi inakuweka katika high-risk group kwa severe attacks. Usione "ninatumia reliever yangu sana" kama proof medicine yako inafanya kazi — ione kama warning sign.',
      },
    },
    {
      topic: { en: 'Pre-exercise dosing', sw: 'Dose ya kabla ya mazoezi' },
      note: {
        en: 'If exercise consistently triggers wheeze, take 1-2 puffs of salbutamol (through spacer) 10-15 minutes before activity. Warm up gradually. If you still get symptoms despite this, your daily controller plan is inadequate — exercise tolerance is one of the best signs of control. Many top athletes have asthma and compete at world level — the answer is good control, not avoiding sport.',
        sw: 'Ikiwa mazoezi mara kwa mara huchochea wheeze, chukua puffs 1-2 za salbutamol (kupitia spacer) dakika 10-15 kabla ya shughuli. Pasha moto polepole. Ikiwa bado unapata dalili licha ya hii, mpango wako wa kila siku wa controller hautoshi — uvumilivu wa mazoezi ni mojawapo ya ishara bora zaidi za udhibiti. Wanariadha wengi wa kilele wana pumu na hushindana katika kiwango cha dunia — jibu ni udhibiti mzuri, sio kuepuka michezo.',
        sw_mtaa: 'Ikiwa exercise consistently inatrigger wheeze, chukua 1-2 puffs salbutamol (through spacer) dakika 10-15 kabla ya activity. Warm up gradually. Ikiwa bado unapata symptoms despite hii, daily controller plan yako haitoshi — exercise tolerance ni one of the best signs ya control. Top athletes wengi wana pumu na wana-compete katika world level — answer ni good control, sio kuavoid sport.',
      },
    },
    {
      topic: { en: 'Inhaler care', sw: 'Utunzaji wa inhaler' },
      note: {
        en: 'Shake the inhaler before each use. Check the dose counter and replace before it reaches zero — running out during an attack is a preventable emergency. Once or twice a week, remove the canister and rinse the plastic mouthpiece under warm water (without the canister), then let it air dry. Do not put the canister in water. Store at room temperature, away from direct sun and heat.',
        sw: 'Tikisa inhaler kabla ya kila matumizi. Angalia kihesabu cha dose na ibadilishe kabla ya kufika sifuri — kuishiwa wakati wa shambulizi ni dharura inayoweza kuzuiwa. Mara moja au mbili kwa wiki, ondoa canister na suuza mouthpiece ya plastiki chini ya maji ya joto (bila canister), kisha iruhusu hewa ikaushe. Usiweke canister kwenye maji. Hifadhi katika joto la chumba, mbali na jua moja kwa moja na joto.',
        sw_mtaa: 'Shake inhaler kabla ya kila use. Check dose counter na replace kabla ya kufika zero — kuishiwa during attack ni preventable emergency. Mara moja au mbili kwa wiki, remove canister na rinse plastic mouthpiece chini ya warm water (bila canister), kisha let it air dry. Usiweke canister kwenye maji. Store katika room temperature, mbali na direct sun na joto.',
      },
    },
    {
      topic: { en: 'Pregnancy and breastfeeding', sw: 'Mimba na kunyonyesha' },
      note: {
        en: 'Salbutamol is considered safe in pregnancy and breastfeeding — the risk of uncontrolled asthma to the baby is much greater than the small theoretical risk from the medicine. Continue using it exactly as before pregnancy. If you find you need it more often during pregnancy, the controller plan likely needs stepping up, not the reliever cut down.',
        sw: 'Salbutamol inachukuliwa salama katika mimba na kunyonyesha — hatari ya pumu isiyodhibitiwa kwa mtoto ni kubwa zaidi kuliko hatari ndogo ya kinadharia kutoka kwa dawa. Endelea kuitumia kama ulivyokuwa kabla ya mimba. Ukijikuta unaihitaji mara nyingi zaidi wakati wa mimba, mpango wa controller huenda ukahitaji kupanda, sio reliever kupungua.',
        sw_mtaa: 'Salbutamol inachukuliwa safe katika pregnancy na breastfeeding — risk ya uncontrolled asthma kwa mtoto ni much greater kuliko small theoretical risk kutoka medicine. Continue kuitumia exactly as before pregnancy. Ikiwa unaihitaji mara nyingi zaidi during pregnancy, controller plan likely inahitaji stepping up, sio reliever kupungua.',
      },
    },
  ],

  sources: [
    src('WHO_PEN_2020'),
    src('WHO_AMR_2023'),
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
