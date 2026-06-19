/**
 * Salmeterol / LABA — Drug Knowledge (Phase 10 COPD block)
 *
 * Sources: GOLD 2025, WHO PEN 2020, GINA 2024 (as referenced via NTLG),
 *          BNF current, EMC current, NTLG STG 2023, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   This file represents the LABA class — Long-Acting Beta-2 Agonists.
 *   Common members:
 *     • Salmeterol (Serevent) — twice daily
 *     • Formoterol (Oxis, Foradil) — twice daily, faster onset
 *     • Indacaterol — once daily
 *     • Vilanterol — once daily, usually in combination inhalers
 *   Tanzanian availability is uneven; salmeterol and formoterol are the
 *   most commonly encountered. The crucial safety teaching: in ASTHMA,
 *   LABAs must NEVER be used alone — they must be paired with an ICS
 *   (the FDA black-box warning era). In COPD, LABA monotherapy is an
 *   acceptable starting point.
 *
 * Scope note:
 *   We educate on what LABAs do, the difference between asthma and COPD
 *   use, side effects (tremor, tachycardia, hypokalaemia at high doses),
 *   and the asthma-specific "never alone" rule. We do NOT prescribe doses.
 */

import { DrugKnowledge } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const SALMETEROL: DrugKnowledge = {
  id: 'salmeterol',
  aliases: DRUG_ALIASES.salmeterol,

  drugClass: {
    en: 'Long-acting beta-2 agonist (LABA) — daily inhaled bronchodilator that keeps airways relaxed over 12-24 hours. A foundational maintenance class in COPD; used only with an inhaled steroid in asthma.',
    sw: 'Long-acting beta-2 agonist (LABA) — bronchodilator inayopulizwa kila siku inayoweka njia za hewa zikiwa zimepumzika kwa masaa 12-24. Kategoria ya msingi ya matengenezo katika COPD; inatumika tu pamoja na steroid ya kupuliza katika pumu.',
  },

  whatItDoes: {
    en: 'LABAs (salmeterol, formoterol, indacaterol, vilanterol) work in the same way as salbutamol — they activate beta-2 receptors on airway muscle and relax it — but they bind tightly and last much longer. Salmeterol and formoterol last about 12 hours and are taken twice daily; indacaterol and vilanterol last 24 hours and are taken once daily. Formoterol has a fast onset (a few minutes), so it can be used in some combination inhalers as both controller and reliever; salmeterol, indacaterol, and vilanterol are slower onset and not used as rescue. In COPD, regular LABA reduces breathlessness, improves exercise tolerance, and reduces exacerbations. In ASTHMA, LABAs must never be used alone — they must always be paired with an inhaled corticosteroid, because LABA-monotherapy in asthma raises the risk of severe attacks and asthma death.',
    sw: 'LABAs (salmeterol, formoterol, indacaterol, vilanterol) hufanya kazi kwa namna ile ile kama salbutamol — huamsha beta-2 receptor kwenye misuli ya njia ya hewa na huilegezea — lakini hujifunga kwa nguvu na kudumu kwa muda mrefu zaidi. Salmeterol na formoterol hudumu kama masaa 12 na huchukuliwa mara mbili kwa siku; indacaterol na vilanterol hudumu masaa 24 na huchukuliwa mara moja kwa siku. Formoterol ina kuanza haraka (dakika chache), kwa hiyo inaweza kutumika katika baadhi ya inhaler za mchanganyiko kama controller na reliever; salmeterol, indacaterol, na vilanterol ni za kuanza polepole na hazitumiwi kama uokoaji. Katika COPD, LABA ya kawaida hupunguza kushindwa kupumua, huboresha uvumilivu wa mazoezi, na hupunguza milipuko. Katika PUMU, LABAs lazima zisitumike peke yake — lazima zioanishwe daima na inhaled corticosteroid, kwa sababu LABA-pekee katika pumu huongeza hatari ya mashambulizi makali na vifo vya pumu.',
    sw_mtaa: 'LABAs (salmeterol, formoterol, indacaterol, vilanterol) zinafanya kazi kwa same way kama salbutamol — zinaactivate beta-2 receptors kwenye airway muscle na zinarelax it — lakini zinabind tightly na zinadumu much longer. Salmeterol na formoterol zinadumu about masaa 12 na zinachukuliwa twice daily; indacaterol na vilanterol zinadumu masaa 24 na zinachukuliwa once daily. Formoterol ina fast onset (dakika chache), kwa hiyo inaweza kutumika katika baadhi ya combination inhalers kama controller na reliever; salmeterol, indacaterol, na vilanterol ni slower onset na haziitumiwi kama rescue. Katika COPD, regular LABA inareduce breathlessness, inaboresha exercise tolerance, na inareduce exacerbations. Katika ASTHMA, LABAs lazima never used alone — lazima daima zipaired na inhaled corticosteroid, kwa sababu LABA-monotherapy katika asthma inaongeza risk ya severe attacks na asthma death.',
  },

  commonUses: [
    {
      en: 'Maintenance treatment of COPD — alone or, more commonly, combined with LAMA and/or ICS',
      sw: 'Matibabu ya matengenezo ya COPD — peke yake au, mara nyingi zaidi, ikichanganywa na LAMA na/au ICS',
      sw_mtaa: 'Maintenance treatment ya COPD — peke yake au, more commonly, combined na LAMA na/au ICS',
    },
    {
      en: 'Maintenance treatment of moderate-severe asthma — ALWAYS combined with an inhaled corticosteroid, never alone',
      sw: 'Matibabu ya matengenezo ya pumu ya wastani-kali — DAIMA pamoja na inhaled corticosteroid, kamwe sio pekee',
      sw_mtaa: 'Maintenance treatment ya moderate-severe asthma — DAIMA combined na inhaled corticosteroid, never alone',
    },
  ],

  howItIsTaken: {
    en: 'Inhaled via metered-dose inhaler (with a spacer ideally), dry-powder inhaler, or in a combination inhaler. Twice daily for salmeterol/formoterol; once daily for indacaterol/vilanterol. Take at the same time(s) each day. LABA is a maintenance treatment — not a rescue inhaler. For sudden breathlessness, salbutamol (or formoterol-combination as part of an action plan) is still the reliever.',
    sw: 'Inapulizwa kupitia metered-dose inhaler (na spacer ikiwezekana), dry-powder inhaler, au katika inhaler ya mchanganyiko. Mara mbili kwa siku kwa salmeterol/formoterol; mara moja kwa siku kwa indacaterol/vilanterol. Chukua kwa wakati huo huo kila siku. LABA ni tiba ya matengenezo — sio inhaler ya uokoaji. Kwa kushindwa kupumua kwa ghafla, salbutamol (au formoterol-mchanganyiko kama sehemu ya mpango wa hatua) bado ni reliever.',
    sw_mtaa: 'Inhaled via metered-dose inhaler (na spacer ideally), dry-powder inhaler, au katika combination inhaler. Twice daily kwa salmeterol/formoterol; once daily kwa indacaterol/vilanterol. Chukua kwa same time(s) kila siku. LABA ni maintenance treatment — sio rescue inhaler. Kwa sudden breathlessness, salbutamol (au formoterol-combination kama sehemu ya action plan) bado ni reliever.',
  },

  commonSideEffects: [
    {
      en: 'Fine tremor (especially of the hands) — most patients feel it for a few days then it settles',
      sw: 'Mtetemo mwepesi (hasa wa mikono) — wagonjwa wengi huuhisi kwa siku chache kisha hutulia',
      sw_mtaa: 'Fine tremor (especially ya hands) — most patients wanafeel kwa siku chache kisha inasettle',
    },
    {
      en: 'Tachycardia / palpitations — heart racing or pounding, usually mild',
      sw: 'Tachycardia / mapigo ya moyo — moyo kupiga haraka au kwa nguvu, kawaida kidogo',
      sw_mtaa: 'Tachycardia / palpitations — heart racing au pounding, usually mild',
    },
    {
      en: 'Headache, muscle cramps, dry/irritated throat',
      sw: 'Maumivu ya kichwa, msitiriko wa misuli, koo kavu/lililoudhi',
      sw_mtaa: 'Headache, muscle cramps, dry/irritated throat',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Worsening asthma if LABA used alone (without ICS) — increased risk of severe asthma attack and death',
        sw: 'Pumu inayozidi ikiwa LABA inatumika peke yake (bila ICS) — hatari iliyoongezeka ya shambulizi kali la pumu na kifo',
        sw_mtaa: 'Worsening asthma ikiwa LABA inatumika peke yake (bila ICS) — increased risk ya severe asthma attack na death',
      },
      urgency: 'emergency',
    },
    {
      effect: {
        en: 'Paradoxical bronchospasm — sudden worsening of breathlessness after inhaling. Stop and seek care.',
        sw: 'Bronchospasm ya paradox — kushindwa kupumua kwa ghafla kuzidi baada ya kuvuta. Simamisha na tafuta huduma.',
        sw_mtaa: 'Paradoxical bronchospasm — sudden worsening ya breathlessness baada ya inhaling. Stop na tafuta care.',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Severe palpitations, chest pain, or fainting — could indicate arrhythmia. Seek urgent care.',
        sw: 'Mapigo makali ya moyo, maumivu ya kifua, au kuzimia — yanaweza kuashiria arrhythmia. Tafuta huduma ya haraka.',
        sw_mtaa: 'Severe palpitations, chest pain, au fainting — inaweza kuindicate arrhythmia. Tafuta urgent care.',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Severe allergic reaction — facial swelling, severe rash, anaphylaxis. Emergency.',
        sw: 'Mzio mkali — uvimbe wa uso, upele mkali, anaphylaxis. Dharura.',
        sw_mtaa: 'Severe allergic reaction — facial swelling, severe rash, anaphylaxis. Emergency.',
      },
      urgency: 'emergency',
    },
  ],

  interactions: [
    {
      with: 'beta_blockers',
      withDisplay: {
        en: 'Non-selective beta-blockers (propranolol, etc.)',
        sw: 'Beta-blocker zisizochagua (propranolol, n.k.)',
      },
      severity: 'avoid',
      explanation: {
        en: 'Non-selective beta-blockers oppose the action of LABAs and can precipitate bronchospasm. Cardio-selective beta-blockers (bisoprolol, metoprolol) are usually safe even in COPD and asthma, but consult a clinician.',
        sw: 'Beta-blocker zisizochagua huzuia hatua ya LABAs na zinaweza kusababisha bronchospasm. Beta-blocker zinazochagua moyo (bisoprolol, metoprolol) kawaida ni salama hata katika COPD na pumu, lakini wasiliana na daktari.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'qtc_prolonging_drugs',
      withDisplay: {
        en: 'QT-prolonging drugs (some antibiotics, antimalarials, antipsychotics)',
        sw: 'Dawa zinazorefusha QT (baadhi ya antibiotic, antimalarial, antipsychotic)',
      },
      severity: 'caution',
      explanation: {
        en: 'High-dose beta-agonists can prolong the QT interval slightly. When combined with other QT-prolonging drugs (e.g. ondansetron, some macrolides, quinine, haloperidol), monitor for palpitations and consider ECG.',
        sw: 'Beta-agonist za dose ya juu zinaweza kurefusha QT interval kidogo. Zinapochanganywa na dawa nyingine zinazorefusha QT (mfano ondansetron, baadhi ya macrolide, quinine, haloperidol), fuatilia mapigo ya moyo na fikiria ECG.',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'loop_diuretics',
      withDisplay: {
        en: 'Loop and thiazide diuretics (furosemide, hydrochlorothiazide)',
        sw: 'Loop na thiazide diuretics (furosemide, hydrochlorothiazide)',
      },
      severity: 'caution',
      explanation: {
        en: 'Both LABAs and diuretics can lower blood potassium. Together they raise the risk of significant hypokalaemia, especially in patients on high LABA doses for severe COPD/asthma exacerbations.',
        sw: 'LABAs na diuretics zote zinaweza kushusha potasiamu ya damu. Pamoja huongeza hatari ya hypokalaemia kubwa, hasa kwa wagonjwa wenye dose za juu za LABA kwa milipuko mikali ya COPD/pumu.',
      },
      sources: [src('BNF_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: {
        en: 'In asthma — never alone',
        sw: 'Katika pumu — kamwe peke yake',
      },
      note: {
        en: 'If you have asthma and your LABA inhaler is not combined with a steroid, raise this with your clinician — modern asthma guidelines do not endorse LABA monotherapy in asthma.',
        sw: 'Ikiwa una pumu na inhaler yako ya LABA haijachanganywa na steroid, mwambie daktari wako — miongozo ya kisasa ya pumu haiendelezi LABA peke yake katika pumu.',
      },
    },
    {
      topic: {
        en: 'Daily routine',
        sw: 'Mwendo wa kila siku',
      },
      note: {
        en: 'Take at the same time(s) each day — morning and evening for twice-daily, morning for once-daily. Skipping doses lets symptoms creep back.',
        sw: 'Chukua kwa wakati huo huo kila siku — asubuhi na jioni kwa mara mbili kwa siku, asubuhi kwa mara moja kwa siku. Kuruka dose hufanya dalili kurudi nyuma.',
      },
    },
    {
      topic: {
        en: 'Tremor settles',
        sw: 'Mtetemo unatulia',
      },
      note: {
        en: 'If you notice hand tremor in the first few days, it usually settles. If it persists or is severe, speak with your clinician — the dose or device may need adjusting.',
        sw: 'Ukigundua mtetemo wa mikono katika siku chache za kwanza, kawaida hutulia. Ikiwa unaendelea au ni mkali, ongea na daktari wako — dose au kifaa kinaweza kuhitaji kurekebishwa.',
      },
    },
  ],

  sources: [
    src('GOLD_COPD_2025'),
    src('WHO_PEN_2020'),
    src('BNF_CURRENT'),
    src('EMC_CURRENT'),
    src('NTLG_STG_2023'),
    src('MUHIMBILI_PROTOCOLS'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
