import { TermMonths, LeaseInputs, LeaseOutputRow } from "./types";

export const TERMS: TermMonths[] = [6, 12, 18, 24, 36, 48, 60];

const BALLOON_MAP: Partial<Record<TermMonths, number>> = {
  6: 0.85,
  12: 0.72,
  24: 0.57,
  36: 0.45,
  48: 0.35,
  60: 0.28,
};

/**
 * Get balloon percentage for a given term, with linear interpolation for missing values.
 * For 18 months, interpolates between 12m (72%) and 24m (57%) = 64.5%
 */
export function getBalloonPct(term: TermMonths): number {
  if (BALLOON_MAP[term] != null) return BALLOON_MAP[term]!;

  // Linear interpolation for 18 months (and future gaps)
  const known = Object.keys(BALLOON_MAP)
    .map(k => Number(k) as TermMonths)
    .sort((a, b) => a - b);

  const lower = [...known].reverse().find(t => t < term)!;
  const upper = known.find(t => t > term)!;
  const pL = BALLOON_MAP[lower]!;
  const pU = BALLOON_MAP[upper]!;

  return pL + (pU - pL) * ((term - lower) / (upper - lower));
}

/**
 * Calculate adjusted vehicle price for a term.
 * Simple increments: +4% of base price for each additional 6 months beyond the first 6.
 * Formula: termFactor = 1 + 0.04 * ((termMonths / 6) - 1)
 */
export function adjustedPrice(base: number, term: TermMonths): number {
  const termFactor = 1 + 0.04 * ((term / 6) - 1);
  return base * termFactor;
}

/**
 * Calculate mileage add-on for a term.
 * Assumes 12k miles per year baseline (no charge for 0-12k).
 * For every 1000 miles per year beyond 12k, add £100 per 6 months.
 * Formula: £100 * Math.max(0, mileageThousandsPerYear - 12) * (termMonths / 6)
 */
export function mileageAddon(milesKPerYear: number, term: TermMonths): number {
  return 100 * Math.max(0, milesKPerYear - 12) * (term / 6);
}

/**
 * Compute a single lease output row for a given term.
 * Uses industry-typical prepaid months approach:
 * monthly = amortizable / (termMonths + depositMonths)
 * upfrontInitialRental = monthly * depositMonths
 */
export function computeRow(
  basePrice: number,
  milesKPerYear: number,
  term: TermMonths,
  depositMonths: number
): LeaseOutputRow {
  const adj = adjustedPrice(basePrice, term);
  const balloonPct = getBalloonPct(term);
  const balloonValue = adj * balloonPct;
  const addOn = mileageAddon(milesKPerYear, term);
  const amortizable = adj - balloonValue + addOn;
  const monthly = amortizable / (term + depositMonths);
  const upfrontInitialRental = monthly * depositMonths;

  return {
    term,
    adjustedVehiclePrice: adj,
    balloonPct,
    balloonValue,
    mileageAddon: addOn,
    amortizable,
    monthly,
    upfrontInitialRental,
    depositMonthsUsed: depositMonths,
  };
}

/**
 * Compute the full lease matrix for all terms based on inputs.
 * Respects global vs. per-term deposit settings.
 */
export function computeMatrix(inputs: LeaseInputs): LeaseOutputRow[] {
  const {
    vehiclePrice,
    mileageThousandsPerYear,
    globalDepositMonths,
    perTermDeposits = {},
    applyDepositGlobally,
  } = inputs;

  return TERMS.map(term => {
    const deposit = applyDepositGlobally
      ? globalDepositMonths
      : Math.max(0, Math.min(12, perTermDeposits[term] ?? globalDepositMonths));
    return computeRow(vehiclePrice, mileageThousandsPerYear, term, deposit);
  });
}
