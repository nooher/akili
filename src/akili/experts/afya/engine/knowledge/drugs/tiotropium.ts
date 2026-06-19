/**
 * Tiotropium — Drug Knowledge (Phase 10 COPD block)
 *
 * Sources: GOLD 2025, WHO PEN 2020, BNF current, EMC current,
 *          NTLG STG 2023, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Tiotropium is the prototype long-acting muscarinic antagonist (LAMA) —
 *   a once-daily inhaler that is one of the two foundational classes of
 *   maintenance treatment in COPD (the other being LABAs). It is delivered
 *   via either a capsule-based HandiHaler or a soft-mist Respimat device.
 *   In Tanzania, availability is improving but still uneven outside major
 *   hospitals; brand and device matter because technique is different
 *   between the two devices, and patients confuse capsules-for-inhalation
 *   with capsules-for-swallowing — a teaching point of real importance.
 *
 * Scope note:
 *   We educate on what tiotropium does, how it differs from a reliever
 *   inhaler, how to use the HandiHaler vs Respimat correctly, common
 *   side effects (dry mouth, urinary retention in BPH), and the
 *   "every day even when well" framing. We do NOT prescribe doses —
 *   that is clinician territory.
 */

import { DrugKnowledge } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const TIOTROPIUM: DrugKnowledge = {
  id: 'tiotropium',
  aliases: DRUG_ALIASES.tiotropium,

  drugClass: {
    en: 'Long-acting muscarinic antagonist (LAMA) — once-daily inhaled bronchodilator. A foundational maintenance treatment in COPD.',
    sw: 'Long-acting muscarinic antagonist (LAMA) — bronchodilator inayopulizwa mara moja kwa siku. Tiba ya msingi ya matengenezo katika COPD.',
  },

  whatItDoes: {
    en: 'Tiotropium blocks the muscarinic receptors on airway muscle, preventing the muscle from contracting and keeping airways open over 24 hours. Unlike salbutamol, which works in minutes and lasts a few hours, tiotropium is slow to start and long to act — taken once daily, every day, to keep airways open in the background. It does not act fast enough to be a rescue inhaler for sudden breathlessness; for that, salbutamol is still needed. In COPD, regular use of tiotropium reduces exacerbations, improves exercise tolerance, and improves quality of life — measurably more than salbutamol alone. It also has a role in moderate-severe asthma not controlled on ICS+LABA, where it is added as a third agent.',
    sw: 'Tiotropium huzuia receptor za muscarinic kwenye misuli ya njia za hewa, kuzuia misuli kuvuta na kuweka njia za hewa wazi kwa masaa 24. Tofauti na salbutamol, inayofanya kazi katika dakika na kudumu masaa machache, tiotropium ni polepole kuanza na ndefu kuchukua hatua — inachukuliwa mara moja kwa siku, kila siku, kuweka njia za hewa wazi nyuma. Haifanyi haraka vya kutosha kuwa inhaler ya kuokoa kwa kushindwa kupumua kwa ghafla; kwa hiyo, salbutamol bado inahitajika. Katika COPD, matumizi ya kawaida ya tiotropium hupunguza milipuko, huboresha uvumilivu wa mazoezi, na huboresha ubora wa maisha — kwa namna inayopimika zaidi kuliko salbutamol pekee. Pia ina jukumu katika pumu ya wastani-kali isiyodhibitiwa kwenye ICS+LABA, ambapo huongezwa kama wakala wa tatu.',
    sw_mtaa: 'Tiotropium inazuia muscarinic receptors kwenye airway muscle, kuzuia muscle ku-contract na kuweka airways open over masaa 24. Tofauti na salbutamol, inayofanya kazi katika dakika na kudumu masaa machache, tiotropium ni slow to start na long to act — inachukuliwa once daily, kila siku, kuweka airways open katika background. Haifanyi haraka vya kutosha kuwa rescue inhaler kwa sudden breathlessness; kwa hiyo, salbutamol bado inahitajika. Katika COPD, regular use ya tiotropium inareduce exacerbations, inaboresha exercise tolerance, na inaboresha quality of life — measurably more kuliko salbutamol alone. Pia ina role katika moderate-severe asthma isiyo controlled on ICS+LABA, ambapo inaongezwa kama third agent.',
  },

  commonUses: [
    {
      en: 'Maintenance treatment of moderate to severe COPD — taken every day, not for sudden breathlessness',
      sw: 'Matibabu ya matengenezo ya COPD ya wastani hadi kali — inachukuliwa kila siku, sio kwa kushindwa kupumua kwa ghafla',
      sw_mtaa: 'Maintenance treatment ya moderate hadi severe COPD — inachukuliwa kila siku, sio kwa sudden breathlessness',
    },
    {
      en: 'Add-on therapy in poorly controlled asthma (specialist decision) on top of inhaled steroid + LABA',
      sw: 'Tiba ya nyongeza katika pumu isiyodhibitiwa vyema (uamuzi wa mtaalam) juu ya steroid ya kupuliza + LABA',
      sw_mtaa: 'Add-on therapy katika poorly controlled asthma (specialist decision) on top of inhaled steroid + LABA',
    },
  ],

  howItIsTaken: {
    en: 'Tiotropium is INHALED, not swallowed. Two devices exist: (1) HandiHaler — a powder capsule is pierced inside the device, and the patient takes a deep, slow breath in to draw the powder into the lungs; the capsule itself is never swallowed. (2) Respimat — a soft-mist inhaler that releases a slow mist; the patient takes a slow deep breath in coordinated with the puff. Either way, it is once daily, at the same time each day. Rinse mouth afterwards to reduce dry mouth. Tiotropium does NOT work fast — if the patient feels sudden breathlessness they must use their reliever (salbutamol), not an extra tiotropium dose.',
    sw: 'Tiotropium HUPULIZWA, haimezwi. Kuna vifaa viwili: (1) HandiHaler — capsule ya unga huchomwa ndani ya kifaa, na mgonjwa huchukua pumzi ndefu, polepole ndani kuvuta unga kwenda mapafuni; capsule yenyewe haimezwi kamwe. (2) Respimat — inhaler ya ukungu laini inayotoa ukungu wa polepole; mgonjwa huchukua pumzi ndefu ya polepole iliyoratibiwa na puff. Vyovyote, ni mara moja kwa siku, kwa wakati huo huo kila siku. Suuza kinywa baadaye kupunguza kinywa kavu. Tiotropium HAIFANYI haraka — ikiwa mgonjwa anajihisi kushindwa kupumua kwa ghafla lazima atumie reliever yake (salbutamol), sio dose ya ziada ya tiotropium.',
    sw_mtaa: 'Tiotropium INAINHALED, haimezwi. Kuna devices mbili: (1) HandiHaler — powder capsule inachomwa ndani ya device, na patient anachukua deep, slow breath in kudraw powder kwenda lungs; capsule yenyewe haimezwi kamwe. (2) Respimat — soft-mist inhaler inayorelease slow mist; patient anachukua slow deep breath in coordinated na puff. Either way, ni once daily, kwa same time kila siku. Rinse mouth afterwards kupunguza dry mouth. Tiotropium HAIFANYI fast — ikiwa patient anafeel sudden breathlessness lazima atumie reliever yake (salbutamol), sio extra tiotropium dose.',
  },

  commonSideEffects: [
    {
      en: 'Dry mouth — the most common side effect; helped by rinsing after dose and sipping water through the day',
      sw: 'Kinywa kavu — athari ya kawaida zaidi; husaidiwa na suuza baada ya dose na kunywa maji siku nzima',
      sw_mtaa: 'Dry mouth — most common side effect; inasaidiwa na rinsing baada ya dose na sipping water through the day',
    },
    {
      en: 'Dry, irritated throat or mild cough on inhalation',
      sw: 'Koo kavu, lililoudhi au kikohozi kidogo kwa kuvuta',
      sw_mtaa: 'Dry, irritated throat au mild cough on inhalation',
    },
    {
      en: 'Headache, dizziness in some patients',
      sw: 'Maumivu ya kichwa, kizunguzungu kwa baadhi ya wagonjwa',
      sw_mtaa: 'Headache, dizziness kwa baadhi ya wagonjwa',
    },
    {
      en: 'Bitter taste, especially with Respimat formulation',
      sw: 'Ladha chungu, hasa na utengenezaji wa Respimat',
      sw_mtaa: 'Bitter taste, especially na Respimat formulation',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Acute urinary retention — sudden inability to pass urine, especially in older men with prostate enlargement (BPH). Seek care immediately.',
        sw: 'Kushindwa kutoa mkojo kwa ghafla — kushindwa ghafla kutoa mkojo, hasa kwa wanaume wakubwa wenye prostate iliyoongezeka (BPH). Tafuta huduma mara moja.',
        sw_mtaa: 'Acute urinary retention — sudden inability ya kutoa mkojo, especially kwa older men wenye prostate enlargement (BPH). Tafuta care immediately.',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Acute narrow-angle glaucoma — sudden eye pain, blurred vision, halos around lights, headache, nausea. Eye emergency.',
        sw: 'Glaucoma ya kona nyembamba ya papo hapo — maumivu ya jicho ya ghafla, kuona vibaya, halos kuzunguka mwanga, maumivu ya kichwa, kichefuchefu. Dharura ya jicho.',
        sw_mtaa: 'Acute narrow-angle glaucoma — sudden eye pain, blurred vision, halos around lights, headache, nausea. Eye emergency.',
      },
      urgency: 'emergency',
    },
    {
      effect: {
        en: 'Paradoxical bronchospasm — sudden worsening of breathlessness right after inhaling. Stop the dose and seek care.',
        sw: 'Bronchospasm ya paradox — kushindwa kupumua kwa ghafla kuzidi mara baada ya kuvuta. Simamisha dose na tafuta huduma.',
        sw_mtaa: 'Paradoxical bronchospasm — sudden worsening ya breathlessness right after inhaling. Stop dose na tafuta care.',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Allergic reaction — facial swelling, hives, severe rash, anaphylaxis. Stop and seek emergency care.',
        sw: 'Mzio — uvimbe wa uso, vipele, upele mkali, anaphylaxis. Simamisha na tafuta huduma ya dharura.',
        sw_mtaa: 'Allergic reaction — facial swelling, hives, severe rash, anaphylaxis. Stop na tafuta emergency care.',
      },
      urgency: 'emergency',
    },
  ],

  interactions: [
    {
      with: 'other_anticholinergics',
      withDisplay: {
        en: 'Other anticholinergic drugs (oxybutynin, scopolamine, some antihistamines)',
        sw: 'Dawa nyingine za anticholinergic (oxybutynin, scopolamine, baadhi ya antihistamines)',
      },
      severity: 'caution',
      explanation: {
        en: 'Combined use can worsen anticholinergic side effects: severe dry mouth, urinary retention, constipation, confusion (especially in the elderly).',
        sw: 'Matumizi ya pamoja yanaweza kuzidisha athari za anticholinergic: kinywa kavu kali, kushindwa kutoa mkojo, kufunga choo, mkanganyiko (hasa kwa wazee).',
      },
      sources: [src('BNF_CURRENT')],
    },
    {
      with: 'ipratropium',
      withDisplay: {
        en: 'Ipratropium (short-acting muscarinic antagonist)',
        sw: 'Ipratropium (anticholinergic ya muda mfupi)',
      },
      severity: 'avoid',
      explanation: {
        en: 'Do not use long-acting (tiotropium) and short-acting (ipratropium) muscarinic antagonists together as regular maintenance — they target the same receptor class. During acute exacerbation, however, nebulised ipratropium may be added short-term under clinician direction.',
        sw: 'Usitumie muscarinic antagonist ya muda mrefu (tiotropium) na ya muda mfupi (ipratropium) pamoja kama matengenezo ya kawaida — zinakusudia kategoria hiyo hiyo ya receptor. Hata hivyo, wakati wa mlipuko wa papo hapo, ipratropium ya nebuliser inaweza kuongezwa kwa muda mfupi chini ya maelekezo ya daktari.',
      },
      sources: [src('BNF_CURRENT'), src('GOLD_COPD_2025')],
    },
  ],

  lifestyleNotes: [
    {
      topic: {
        en: 'Daily routine',
        sw: 'Mwendo wa kila siku',
      },
      note: {
        en: 'Take at the same time each day — morning is most common. If you forget a dose, take it as soon as you remember on the same day, but do not double-dose the next day.',
        sw: 'Chukua kwa wakati huo huo kila siku — asubuhi ni kawaida zaidi. Ukisahau dose, ichukue mara unapokumbuka siku hiyo hiyo, lakini usichukue mara mbili siku inayofuata.',
      },
    },
    {
      topic: {
        en: 'Device technique',
        sw: 'Mbinu ya kifaa',
      },
      note: {
        en: 'Whichever device you have (HandiHaler vs Respimat), ask the pharmacist or clinician to watch you use it once — incorrect technique is the most common reason tiotropium "stops working."',
        sw: 'Chochote kifaa ulichonacho (HandiHaler vs Respimat), uombe mfamasia au daktari akutazame ukikitumia mara moja — mbinu isiyo sahihi ndio sababu ya kawaida zaidi tiotropium "kuacha kufanya kazi."',
      },
    },
    {
      topic: {
        en: 'BPH and glaucoma',
        sw: 'BPH na glaucoma',
      },
      note: {
        en: 'Tell your clinician if you have prostate symptoms (slow stream, hesitancy, frequency) or any history of narrow-angle glaucoma — tiotropium can worsen both.',
        sw: 'Mwambie daktari wako kama una dalili za prostate (mtiririko polepole, kusita, mara kwa mara) au historia yoyote ya glaucoma ya kona nyembamba — tiotropium inaweza kuzidisha vyote.',
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
