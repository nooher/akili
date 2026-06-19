/**
 * Knowledge Base Index
 *
 * Central registry. Engine looks up content from here by canonical id.
 * As we add more conditions/drugs/labs, register them in this file.
 */

import { ConditionKnowledge, DrugKnowledge, LabKnowledge } from '../types';

// Conditions
import { HYPERTENSION } from './conditions/hypertension';
import { DIABETES } from './conditions/diabetes';
import { MALARIA } from './conditions/malaria';
import { TB } from './conditions/tb';
import { HIV } from './conditions/hiv';
import { CKD } from './conditions/ckd';
import { MATERNAL_CARE } from './conditions/maternal_care';
import { PNEUMONIA } from './conditions/pneumonia';
import { ASTHMA } from './conditions/asthma';
import { COPD } from './conditions/copd';
import { HEART_FAILURE } from './conditions/heart_failure';
import { STROKE } from './conditions/stroke';
import { SICKLE_CELL } from './conditions/sickle_cell';
import { DEPRESSION } from './conditions/depression';
import { ANXIETY } from './conditions/anxiety';
import { UTI } from './conditions/uti';
import { TYPHOID } from './conditions/typhoid';
import { PEPTIC_ULCER } from './conditions/peptic_ulcer';
import { EPILEPSY } from './conditions/epilepsy';
import { SNAKE_BITE } from './conditions/snake_bite';
import { BRONCHIOLITIS } from './conditions/bronchiolitis';
import { ANAEMIA } from './conditions/anaemia';
import { HEPATITIS_B } from './conditions/hepatitis_b';
import { CERVICAL_CANCER } from './conditions/cervical_cancer';

// Drugs
import { METFORMIN } from './drugs/metformin';
import { ALU } from './drugs/alu';
import { RHZE } from './drugs/rhze';
import { TLD } from './drugs/tld';
import { COTRIMOXAZOLE } from './drugs/cotrimoxazole';
import { ACE_INHIBITOR } from './drugs/ace_inhibitor';
import { ARB } from './drugs/arb';
import { METHYLDOPA } from './drugs/methyldopa';
import { MAGNESIUM_SULFATE } from './drugs/magnesium_sulfate';
import { AMOXICILLIN } from './drugs/amoxicillin';
import { CEFTRIAXONE } from './drugs/ceftriaxone';
import { AZITHROMYCIN } from './drugs/azithromycin';
import { SALBUTAMOL } from './drugs/salbutamol';
import { INHALED_CORTICOSTEROID } from './drugs/inhaled_corticosteroid';
import { PREDNISOLONE } from './drugs/prednisolone';
import { TIOTROPIUM } from './drugs/tiotropium';
import { SALMETEROL } from './drugs/salmeterol';
import { IPRATROPIUM } from './drugs/ipratropium';

// Labs
import { BLOOD_PRESSURE } from './labs/bloodPressure';
import { HBA1C } from './labs/hba1c';
import { GLUCOSE } from './labs/glucose';
import { MRDT } from './labs/mrdt';
import { GENEXPERT } from './labs/genexpert';
import { CD4 } from './labs/cd4';
import { VIRAL_LOAD } from './labs/viralLoad';
import { CREATININE } from './labs/creatinine';
import { EGFR } from './labs/egfr';
import { URINE_PROTEIN } from './labs/urine_protein';
import { SPO2 } from './labs/spo2';
import { RESPIRATORY_RATE } from './labs/respiratory_rate';
import { PEAK_FLOW } from './labs/peak_flow';
import { SPIROMETRY } from './labs/spirometry';

// ──────────────────────────────────────────────────────────────────────
// REGISTRIES
// ──────────────────────────────────────────────────────────────────────

export const CONDITIONS: Record<string, ConditionKnowledge> = {
  [HYPERTENSION.id]: HYPERTENSION,
  [DIABETES.id]: DIABETES,
  [MALARIA.id]: MALARIA,
  [TB.id]: TB,
  [HIV.id]: HIV,
  [CKD.id]: CKD,
  [MATERNAL_CARE.id]: MATERNAL_CARE,
  [PNEUMONIA.id]: PNEUMONIA,
  [ASTHMA.id]: ASTHMA,
  [COPD.id]: COPD,
  [HEART_FAILURE.id]: HEART_FAILURE,
  [STROKE.id]: STROKE,
  [SICKLE_CELL.id]: SICKLE_CELL,
  // Phase 14 — Mental Health
  [DEPRESSION.id]: DEPRESSION,
  [ANXIETY.id]: ANXIETY,
  // Phase 15 — Breadth coverage layer
  [UTI.id]: UTI,
  [TYPHOID.id]: TYPHOID,
  [PEPTIC_ULCER.id]: PEPTIC_ULCER,
  [EPILEPSY.id]: EPILEPSY,
  [SNAKE_BITE.id]: SNAKE_BITE,
  [BRONCHIOLITIS.id]: BRONCHIOLITIS,
  [ANAEMIA.id]: ANAEMIA,
  [HEPATITIS_B.id]: HEPATITIS_B,
  [CERVICAL_CANCER.id]: CERVICAL_CANCER,
};

export const DRUGS: Record<string, DrugKnowledge> = {
  [METFORMIN.id]: METFORMIN,
  [ALU.id]: ALU,
  [RHZE.id]: RHZE,
  [TLD.id]: TLD,
  [COTRIMOXAZOLE.id]: COTRIMOXAZOLE,
  [ACE_INHIBITOR.id]: ACE_INHIBITOR,
  [ARB.id]: ARB,
  [METHYLDOPA.id]: METHYLDOPA,
  [MAGNESIUM_SULFATE.id]: MAGNESIUM_SULFATE,
  [AMOXICILLIN.id]: AMOXICILLIN,
  [CEFTRIAXONE.id]: CEFTRIAXONE,
  [AZITHROMYCIN.id]: AZITHROMYCIN,
  [SALBUTAMOL.id]: SALBUTAMOL,
  [INHALED_CORTICOSTEROID.id]: INHALED_CORTICOSTEROID,
  [PREDNISOLONE.id]: PREDNISOLONE,
  [TIOTROPIUM.id]: TIOTROPIUM,
  [SALMETEROL.id]: SALMETEROL,
  [IPRATROPIUM.id]: IPRATROPIUM,
};

export const LABS: Record<string, LabKnowledge> = {
  [BLOOD_PRESSURE.id]: BLOOD_PRESSURE,
  [HBA1C.id]: HBA1C,
  [GLUCOSE.id]: GLUCOSE,
  [MRDT.id]: MRDT,
  [GENEXPERT.id]: GENEXPERT,
  [CD4.id]: CD4,
  [VIRAL_LOAD.id]: VIRAL_LOAD,
  [CREATININE.id]: CREATININE,
  [EGFR.id]: EGFR,
  [URINE_PROTEIN.id]: URINE_PROTEIN,
  [SPO2.id]: SPO2,
  [RESPIRATORY_RATE.id]: RESPIRATORY_RATE,
  [PEAK_FLOW.id]: PEAK_FLOW,
  [SPIROMETRY.id]: SPIROMETRY,
};

// ──────────────────────────────────────────────────────────────────────
// LOOKUPS
// ──────────────────────────────────────────────────────────────────────

export function getCondition(id: string): ConditionKnowledge | null {
  return CONDITIONS[id] ?? null;
}

export function getDrug(id: string): DrugKnowledge | null {
  return DRUGS[id] ?? null;
}

export function getLab(id: string): LabKnowledge | null {
  return LABS[id] ?? null;
}

// ──────────────────────────────────────────────────────────────────────
// COVERAGE
// ──────────────────────────────────────────────────────────────────────

export function knowledgeCoverage() {
  return {
    conditions: Object.keys(CONDITIONS).length,
    drugs: Object.keys(DRUGS).length,
    labs: Object.keys(LABS).length,
    total:
      Object.keys(CONDITIONS).length +
      Object.keys(DRUGS).length +
      Object.keys(LABS).length,
  };
}
