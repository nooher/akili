/**
 * Ipratropium — Drug Knowledge (Phase 10 COPD block)
 *
 * Sources: GOLD 2025, WHO PEN 2020, BNF current, EMC current,
 *          NTLG STG 2023, Muhimbili Protocols.
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Why this file exists:
 *   Ipratropium is the prototype short-acting muscarinic antagonist
 *   (SAMA), the partner of salbutamol in acute COPD exacerbation
 *   management. Often nebulised together with salbutamol (the Combivent
 *   or Duoneb combination) to give stacked bronchodilation during a flare.
 *   It has a slower onset than salbutamol and a longer duration, and
 *   targets a different receptor — so the two drugs are complementary
 *   during an exacerbation rather than redundant.
 *
 * Scope note:
 *   We educate on what ipratropium does, when it is used (especially
 *   during exacerbations), how it differs from long-acting LAMAs like
 *   tiotropium, side effects, and the same BPH/glaucoma cautions that
 *   apply to all anticholinergic inhalers. We do NOT prescribe doses.
 */

import { DrugKnowledge } from '../../types';
import { DRUG_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const IPRATROPIUM: DrugKnowledge = {
  id: 'ipratropium',
  aliases: DRUG_ALIASES.ipratropium,

  drugClass: {
    en: 'Short-acting muscarinic antagonist (SAMA) — inhaled bronchodilator used during COPD exacerbations and in some acute asthma protocols. Onset within 15-30 minutes, duration 4-6 hours.',
    sw: 'Short-acting muscarinic antagonist (SAMA) — bronchodilator inayopulizwa inayotumika wakati wa milipuko ya COPD na katika baadhi ya itifaki za pumu kali. Inaanza ndani ya dakika 15-30, hudumu masaa 4-6.',
  },

  whatItDoes: {
    en: 'Ipratropium blocks the muscarinic receptors on airway muscle — the same target as tiotropium, but short-acting. It complements salbutamol because it works through a different receptor (muscarinic vs beta-2) and slightly different timing, so the two together give better bronchodilation than either alone during an acute exacerbation. The most common use is combined nebulisation with salbutamol during a COPD exacerbation (or sometimes a severe asthma attack). Outside exacerbations, ipratropium has been largely replaced for maintenance use by tiotropium and the other long-acting LAMAs, because once-daily dosing is much easier to keep up than four-times-daily.',
    sw: 'Ipratropium huzuia receptor za muscarinic kwenye misuli ya njia za hewa — lengo lile lile na tiotropium, lakini ya muda mfupi. Huikamilisha salbutamol kwa sababu inafanya kazi kupitia receptor tofauti (muscarinic vs beta-2) na muda tofauti kidogo, kwa hiyo zote mbili pamoja hutoa bronchodilation bora zaidi kuliko zote mbili peke yake wakati wa mlipuko wa papo hapo. Matumizi ya kawaida ni nebulization ya pamoja na salbutamol wakati wa mlipuko wa COPD (au wakati mwingine shambulizi kali la pumu). Nje ya milipuko, ipratropium imebadilishwa kwa kiasi kikubwa kwa matumizi ya matengenezo na tiotropium na LAMAs nyingine za muda mrefu, kwa sababu dose ya mara moja kwa siku ni rahisi zaidi kushikilia kuliko mara nne kwa siku.',
    sw_mtaa: 'Ipratropium inazuia muscarinic receptors kwenye airway muscle — same target kama tiotropium, lakini short-acting. Inacomplement salbutamol kwa sababu inafanya kazi kupitia different receptor (muscarinic vs beta-2) na slightly different timing, kwa hiyo two together zinatoa better bronchodilation kuliko either alone wakati wa acute exacerbation. Most common use ni combined nebulisation na salbutamol wakati wa COPD exacerbation (au wakati mwingine severe asthma attack). Outside exacerbations, ipratropium imelargely replaced for maintenance use na tiotropium na other long-acting LAMAs, kwa sababu once-daily dosing ni much easier kushikilia kuliko four-times-daily.',
  },

  commonUses: [
    {
      en: 'Acute exacerbation of COPD — nebulised, often combined with salbutamol (Combivent)',
      sw: 'Mlipuko wa papo hapo wa COPD — kupitia nebulizer, mara nyingi pamoja na salbutamol (Combivent)',
      sw_mtaa: 'Acute exacerbation ya COPD — nebulised, mara nyingi combined na salbutamol (Combivent)',
    },
    {
      en: 'Severe acute asthma exacerbation — added to salbutamol nebulisations and oral steroid',
      sw: 'Mlipuko mkali wa papo hapo wa pumu — huongezwa kwa salbutamol nebulization na steroid ya kumeza',
      sw_mtaa: 'Severe acute asthma exacerbation — added kwa salbutamol nebulisations na oral steroid',
    },
    {
      en: 'Maintenance bronchodilator (historical role) — largely replaced by tiotropium for daily COPD use',
      sw: 'Bronchodilator ya matengenezo (jukumu la kihistoria) — imebadilishwa kwa kiasi kikubwa na tiotropium kwa matumizi ya kila siku ya COPD',
      sw_mtaa: 'Maintenance bronchodilator (historical role) — largely replaced na tiotropium kwa daily COPD use',
    },
  ],

  howItIsTaken: {
    en: 'Inhaled — via metered-dose inhaler (with spacer), via nebuliser (a wet aerosol delivered via a mask or mouthpiece), or as part of a fixed-dose combination (Combivent, Duoneb). During an exacerbation, nebulisation is the most common route. Ipratropium does NOT relieve breathlessness in seconds the way salbutamol can — that is the reliever job. When given together with salbutamol, the two drugs are usually mixed in the nebuliser chamber.',
    sw: 'Inapulizwa — kupitia metered-dose inhaler (na spacer), kupitia nebulizer (aerosol ya unyevu inayotolewa kupitia mask au mdomoni), au kama sehemu ya mchanganyiko wa dose iliyowekwa (Combivent, Duoneb). Wakati wa mlipuko, nebulization ni njia ya kawaida zaidi. Ipratropium HAIPUNGUZI kushindwa kupumua katika sekunde namna salbutamol inavyoweza — hiyo ni kazi ya reliever. Inapotolewa pamoja na salbutamol, dawa mbili kawaida huchanganywa katika chumba cha nebulizer.',
    sw_mtaa: 'Inhaled — via metered-dose inhaler (na spacer), via nebuliser (wet aerosol delivered via mask au mouthpiece), au kama sehemu ya fixed-dose combination (Combivent, Duoneb). Wakati wa exacerbation, nebulisation ni most common route. Ipratropium HAIRELIEVE breathlessness katika seconds kama salbutamol inaweza — hiyo ni reliever job. Inapotolewa pamoja na salbutamol, two drugs kawaida zinachanganywa katika nebuliser chamber.',
  },

  commonSideEffects: [
    {
      en: 'Dry mouth, bitter taste',
      sw: 'Kinywa kavu, ladha chungu',
      sw_mtaa: 'Dry mouth, bitter taste',
    },
    {
      en: 'Throat irritation, cough on inhalation',
      sw: 'Kuwasha koo, kikohozi kwa kuvuta',
      sw_mtaa: 'Throat irritation, cough on inhalation',
    },
    {
      en: 'Headache, nausea',
      sw: 'Maumivu ya kichwa, kichefuchefu',
      sw_mtaa: 'Headache, nausea',
    },
  ],

  seriousSideEffects: [
    {
      effect: {
        en: 'Acute urinary retention, especially in older men with prostate enlargement (BPH)',
        sw: 'Kushindwa kutoa mkojo kwa ghafla, hasa kwa wanaume wakubwa wenye prostate iliyoongezeka (BPH)',
        sw_mtaa: 'Acute urinary retention, especially kwa older men wenye prostate enlargement (BPH)',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Acute narrow-angle glaucoma — particularly if nebulised mist enters the eyes (always shield the eyes during nebulisation)',
        sw: 'Glaucoma ya kona nyembamba ya papo hapo — hasa ikiwa ukungu wa nebulizer unaingia machoni (daima kinga macho wakati wa nebulization)',
        sw_mtaa: 'Acute narrow-angle glaucoma — particularly ikiwa nebulised mist inaingia kwenye macho (always shield macho wakati wa nebulisation)',
      },
      urgency: 'emergency',
    },
    {
      effect: {
        en: 'Paradoxical bronchospasm — sudden worsening of breathlessness after the dose',
        sw: 'Bronchospasm ya paradox — kushindwa kupumua kwa ghafla kuzidi baada ya dose',
        sw_mtaa: 'Paradoxical bronchospasm — sudden worsening ya breathlessness baada ya dose',
      },
      urgency: 'urgent',
    },
    {
      effect: {
        en: 'Severe allergic reaction — facial swelling, anaphylaxis. Emergency.',
        sw: 'Mzio mkali — uvimbe wa uso, anaphylaxis. Dharura.',
        sw_mtaa: 'Severe allergic reaction — facial swelling, anaphylaxis. Emergency.',
      },
      urgency: 'emergency',
    },
  ],

  interactions: [
    {
      with: 'tiotropium',
      withDisplay: {
        en: 'Tiotropium (long-acting muscarinic antagonist)',
        sw: 'Tiotropium (anticholinergic ya muda mrefu)',
      },
      severity: 'avoid',
      explanation: {
        en: 'Do not use short-acting (ipratropium) and long-acting (tiotropium) muscarinic antagonists together as ROUTINE maintenance — they hit the same receptor class. During an exacerbation, however, short-term added nebulised ipratropium on top of tiotropium is acceptable under clinician direction.',
        sw: 'Usitumie short-acting (ipratropium) na long-acting (tiotropium) muscarinic antagonist pamoja kama matengenezo YA KAWAIDA — zinakusudia kategoria hiyo hiyo ya receptor. Wakati wa mlipuko, hata hivyo, nyongeza ya muda mfupi ya ipratropium ya nebulizer juu ya tiotropium inakubalika chini ya maelekezo ya daktari.',
      },
      sources: [src('BNF_CURRENT'), src('GOLD_COPD_2025')],
    },
    {
      with: 'other_anticholinergics',
      withDisplay: {
        en: 'Other anticholinergic drugs (oxybutynin, scopolamine, sedating antihistamines, TCAs)',
        sw: 'Dawa nyingine za anticholinergic (oxybutynin, scopolamine, antihistamine za usingizi, TCAs)',
      },
      severity: 'caution',
      explanation: {
        en: 'Combined use raises anticholinergic burden: dry mouth, urinary retention, constipation, confusion (especially in the elderly). Reassess the medication list in elderly patients.',
        sw: 'Matumizi ya pamoja huongeza mzigo wa anticholinergic: kinywa kavu, kushindwa kutoa mkojo, kufunga choo, mkanganyiko (hasa kwa wazee). Pitia tena orodha ya dawa kwa wagonjwa wazee.',
      },
      sources: [src('BNF_CURRENT')],
    },
  ],

  lifestyleNotes: [
    {
      topic: {
        en: 'Eye protection during nebulisation',
        sw: 'Ulinzi wa macho wakati wa nebulization',
      },
      note: {
        en: 'When ipratropium is nebulised, use a mouthpiece if possible — or close the eyes if a mask is used — to prevent the mist from reaching the eyes, which can trigger narrow-angle glaucoma in susceptible patients.',
        sw: 'Wakati ipratropium inapulizwa, tumia mdomoni ikiwezekana — au funga macho kama mask inatumika — kuzuia ukungu kufikia macho, ambao unaweza kusababisha glaucoma ya kona nyembamba kwa wagonjwa wanaohusika.',
      },
    },
    {
      topic: {
        en: 'Not a reliever',
        sw: 'Sio reliever',
      },
      note: {
        en: 'For sudden breathlessness, your reliever is salbutamol. Ipratropium is a slower-onset bronchodilator usually added during exacerbations, not used to abort an attack in seconds.',
        sw: 'Kwa kushindwa kupumua kwa ghafla, reliever yako ni salbutamol. Ipratropium ni bronchodilator yenye mwanzo wa polepole inayoongezwa wakati wa milipuko, sio kutumika kukomesha shambulizi katika sekunde.',
      },
    },
    {
      topic: {
        en: 'BPH and glaucoma',
        sw: 'BPH na glaucoma',
      },
      note: {
        en: 'Tell your clinician if you have prostate symptoms or any history of narrow-angle glaucoma — ipratropium can worsen both, as can tiotropium.',
        sw: 'Mwambie daktari wako kama una dalili za prostate au historia yoyote ya glaucoma ya kona nyembamba — ipratropium inaweza kuzidisha vyote, kama vile tiotropium.',
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
