// CargoLink customs duty engine — PURE, side-effect-free.
// Computes import duty, VAT and excise on the customs (CIF) value of an
// international shipment under Tanzania / EAC rules. Kept dependency-free so it
// can be unit-tested (see duty.test.mjs) and reused on the (future) backend and
// TANCIS integration without change.
//
// TODO: wire to backend /api/v1/customs — the live assessment comes from TANCIS;
// this engine produces the indicative estimate shown pre-clearance.

export interface DutyInput {
  // Customs value (CIF) in TZS — the dutiable base.
  customsValue: number
  // Import duty rate as a fraction (e.g. 0.25 for 25% EAC CET).
  dutyRate: number
  // VAT rate (Tanzania standard rate). Defaults to 18%.
  vatRate?: number
  // Excise rate where the item is excisable (e.g. spirits, vehicles). Default 0.
  exciseRate?: number
}

export interface DutyResult {
  customsValue: number
  duty: number // import duty = customsValue * dutyRate
  excise: number // excise = (customsValue + duty) * exciseRate
  vat: number // VAT = (customsValue + duty + excise) * vatRate
  total: number // duty + excise + vat (total taxes payable)
  landedCost: number // customsValue + total taxes
}

// Core estimate. Order matters: excise sits on (value + duty), and VAT is
// charged on (value + duty + excise) — the standard EAC/TRA cascade.
//   estimateDuty({ customsValue: 10_000_000, dutyRate: 0.25 })
//     → { duty: 2_500_000, vat: 2_250_000, excise: 0, total: 4_750_000, ... }
export function estimateDuty(input: DutyInput): DutyResult {
  const customsValue = Math.max(0, input.customsValue || 0)
  const dutyRate = Math.max(0, input.dutyRate || 0)
  const vatRate = input.vatRate ?? 0.18
  const exciseRate = Math.max(0, input.exciseRate ?? 0)

  const duty = Math.round(customsValue * dutyRate)
  const excise = Math.round((customsValue + duty) * exciseRate)
  const vat = Math.round((customsValue + duty + excise) * vatRate)
  const total = duty + excise + vat
  const landedCost = customsValue + total

  return { customsValue, duty, excise, vat, total, landedCost }
}

// EAC Common External Tariff (CET) three-band logic + sensitive items.
//   raw materials / capital goods → 0%
//   intermediate goods          → 10%
//   finished goods              → 25%
//   sensitive items            → above 25% (e.g. 35%/specific) — flagged
export type CetBand = "raw" | "intermediate" | "finished" | "sensitive"

export interface CetBandInfo {
  band: CetBand
  rate: number
  label: string
}

export const CET_BANDS: Record<CetBand, CetBandInfo> = {
  raw: { band: "raw", rate: 0, label: "Raw materials & capital goods (0%)" },
  intermediate: { band: "intermediate", rate: 0.1, label: "Intermediate goods (10%)" },
  finished: { band: "finished", rate: 0.25, label: "Finished goods (25%)" },
  sensitive: { band: "sensitive", rate: 0.35, label: "Sensitive items (35%+)" },
}

// Resolve a CET band to its duty rate.
export function cetRate(band: CetBand): number {
  return CET_BANDS[band].rate
}

// Best-effort band guess from the first 2 digits of an HS code (chapter).
// Indicative only — the legal tariff classification is TANCIS/TRA's call.
export function cetBandForHs(hsCode: string): CetBand {
  const chapter = parseInt((hsCode || "").replace(/\D/g, "").slice(0, 2), 10)
  if (Number.isNaN(chapter)) return "finished"
  // Live animals, raw agricultural, ores, mineral fuels, raw textiles fibres.
  if (chapter <= 14 || (chapter >= 25 && chapter <= 27) || [50, 51, 52, 53].includes(chapter)) return "raw"
  // Chemicals, plastics primary, base metals, intermediate manufactures.
  if ((chapter >= 28 && chapter <= 40) || (chapter >= 72 && chapter <= 81)) return "intermediate"
  // Sugar, spirits, tobacco → typically sensitive/excisable.
  if ([17, 22, 24].includes(chapter)) return "sensitive"
  // Everything else (machinery, electronics, vehicles, apparel) → finished.
  return "finished"
}

// Money formatting helper local to the customs feature (TZS, no decimals).
export function formatTzs(amount: number): string {
  const n = Number.isFinite(amount) ? amount : 0
  return `TZS ${Math.round(n).toLocaleString("en-US")}`
}
