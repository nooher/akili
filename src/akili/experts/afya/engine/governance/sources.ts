/**
 * Source Catalog — every reference cited in TibaAI content.
 *
 * This is the single source of truth for citations. Content files reference
 * by key. If a citation changes (new edition), we update it here once.
 *
 * RULE: Every claim shown to a patient MUST trace back to one of these.
 */

import { SourceCitation } from '../types';

export const SOURCES: Record<string, SourceCitation> = {
  // ── Tanzania National Programmes ──────────────────────────────────
  NTLG_STG_2023: {
    org: 'NTLG',
    title: 'Standard Treatment Guidelines & National Essential Medicines List (STG & NEMLIT)',
    section: 'Tanzania Ministry of Health',
    year: 2023,
  },
  MUHIMBILI_PROTOCOLS: {
    org: 'Muhimbili',
    title: 'Muhimbili National Hospital Clinical Protocols',
    year: 2024,
  },
  NMCP_MALARIA_2024: {
    org: 'NMCP',
    title: 'National Guidelines for Diagnosis and Treatment of Malaria (Tanzania)',
    year: 2024,
  },
  NTLP_TB_2024: {
    org: 'NTLP',
    title: 'National TB & Leprosy Programme — Manual for Management of TB & Leprosy',
    year: 2024,
  },
  NACP_ART_2024: {
    org: 'NACP',
    title: 'National Guidelines for the Management of HIV and AIDS',
    year: 2024,
  },
  MOH_TZ_MATERNAL_2024: {
    org: 'MoH-TZ',
    title: 'National Guidelines on Comprehensive Reproductive, Maternal, Newborn & Child Health',
    year: 2024,
  },

  // ── WHO ────────────────────────────────────────────────────────────
  WHO_HEARTS_2023: {
    org: 'WHO',
    title: 'HEARTS Technical Package for Cardiovascular Disease Management',
    section: 'Hypertension protocol',
    year: 2023,
  },
  WHO_PEN_2020: {
    org: 'WHO',
    title: 'Package of Essential NCD Interventions',
    year: 2020,
  },
  WHO_DIABETES_2024: {
    org: 'WHO',
    title: 'WHO Global Diabetes Compact Standards',
    year: 2024,
  },
  WHO_KIDNEY_2022: {
    org: 'WHO',
    title: 'WHO Guidance on Kidney Care',
    year: 2022,
  },
  WHO_MALARIA_2024: {
    org: 'WHO',
    title: 'WHO Guidelines for Malaria',
    year: 2024,
  },
  WHO_TB_2024: {
    org: 'WHO',
    title: 'WHO Consolidated Guidelines on Tuberculosis',
    year: 2024,
  },
  WHO_HIV_2024: {
    org: 'WHO',
    title: 'WHO Consolidated Guidelines on HIV Prevention, Testing, Treatment, Service Delivery and Monitoring',
    year: 2024,
  },
  WHO_PREECLAMPSIA_2023: {
    org: 'WHO',
    title: 'WHO Recommendations on Drug Treatment for Non-Severe Hypertension in Pregnancy',
    year: 2023,
  },
  WHO_PPH_2017: {
    org: 'WHO',
    title: 'WHO Recommendations: Prevention and Treatment of Postpartum Haemorrhage',
    year: 2017,
  },
  WHO_ANC_2016: {
    org: 'WHO',
    title: 'WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience (8-contact model)',
    year: 2016,
  },
  IMCI_2024: {
    org: 'IMCI',
    title: 'Integrated Management of Childhood Illness Chart Booklet',
    year: 2024,
  },
  WHO_PNEUMONIA_2022: {
    org: 'WHO',
    title: 'Revised WHO Classification and Treatment of Childhood Pneumonia at Health Facilities',
    year: 2022,
  },
  WHO_AMR_2023: {
    org: 'WHO',
    title: 'WHO AWaRe (Access, Watch, Reserve) Antibiotic Book',
    year: 2023,
  },
  WHO_OXYGEN_2023: {
    org: 'WHO',
    title: 'WHO Manual on Use of Pulse Oximetry and Oxygen Therapy',
    year: 2023,
  },

  // ── International societies ───────────────────────────────────────
  ISH_2020: {
    org: 'ISH',
    title: 'International Society of Hypertension Global Hypertension Practice Guidelines',
    year: 2020,
  },
  AHA_2017_BP: {
    org: 'AHA',
    title: 'ACC/AHA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure',
    year: 2017,
  },
  ADA_2024: {
    org: 'ADA',
    title: 'Standards of Care in Diabetes',
    year: 2024,
  },
  KDIGO_CKD_2024: {
    org: 'KDIGO',
    title: 'KDIGO Clinical Practice Guideline for the Evaluation and Management of CKD',
    year: 2024,
  },
  IDF_DIABETES_2025: {
    org: 'IDF',
    title: 'IDF Diabetes Atlas & Clinical Recommendations',
    year: 2025,
  },
  FIGO_PREECLAMPSIA_2024: {
    org: 'FIGO',
    title: 'FIGO Initiative on Pre-eclampsia',
    year: 2024,
  },
  GOLD_COPD_2025: {
    org: 'GOLD',
    title: 'Global Initiative for Chronic Obstructive Lung Disease — Global Strategy for Prevention, Diagnosis and Management of COPD',
    year: 2025,
  },
  ESC_HF_2023: {
    org: 'ESC',
    title: 'ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure',
    year: 2023,
  },
  AHA_STROKE_2024: {
    org: 'AHA',
    title: 'AHA/ASA Guidelines for the Early Management of Patients with Acute Ischemic Stroke',
    year: 2024,
  },
  WHO_MHGAP_2023: {
    org: 'mhGAP',
    title: 'WHO mhGAP Intervention Guide — Mental, Neurological and Substance Use Disorders',
    year: 2023,
  },
  WHO_SICKLE_2024: {
    org: 'WHO',
    title: 'WHO Guidance on Sickle Cell Disease Management in Sub-Saharan Africa',
    year: 2024,
  },
  NORTAB_SICKLE_2023: {
    org: 'NORTAB',
    title: 'Muhimbili Sickle Cell Programme Clinical Protocols (Tanzania)',
    year: 2023,
  },
  WHO_SNAKEBITE_2023: {
    org: 'WHO',
    title: 'WHO Guidelines for the Management of Snakebites — African Region',
    year: 2023,
  },
  WHO_HEPB_2024: {
    org: 'WHO',
    title: 'WHO Guidelines on the Prevention, Care and Treatment of Persons with Chronic Hepatitis B Infection',
    year: 2024,
  },
  WHO_CERVICAL_2022: {
    org: 'WHO',
    title: 'WHO Guideline for Screening and Treatment of Cervical Pre-cancer Lesions',
    year: 2022,
  },
  WHO_TYPHOID_2018: {
    org: 'WHO',
    title: 'WHO Position Paper on Typhoid Vaccines + Treatment Guidance',
    year: 2018,
  },
  WHO_EPILEPSY_2022: {
    org: 'WHO',
    title: 'WHO Intersectoral Global Action Plan on Epilepsy and Other Neurological Disorders',
    year: 2022,
  },
  WHO_ANAEMIA_2023: {
    org: 'WHO',
    title: 'WHO Guideline on Anaemia in Women, Children and Adolescents',
    year: 2023,
  },

  // ── Drug formularies ──────────────────────────────────────────────
  BNF_CURRENT: {
    org: 'BNF',
    title: 'British National Formulary',
    year: 2025,
  },
  EMC_CURRENT: {
    org: 'EMC',
    title: 'Electronic Medicines Compendium',
    year: 2025,
  },
};

/** Convenience helper. */
export function src(key: keyof typeof SOURCES): SourceCitation {
  return SOURCES[key];
}
