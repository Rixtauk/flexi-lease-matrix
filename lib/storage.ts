import { LeaseInputs, TermMonths } from "./types";

const STORAGE_KEY = "flexi-lease-matrix-inputs";

/**
 * Default lease inputs used on first load or reset.
 */
export const DEFAULT_INPUTS: LeaseInputs = {
  vehiclePrice: 33000,
  mileageThousandsPerYear: 0,
  globalDepositMonths: 3,
  perTermDeposits: {},
  applyDepositGlobally: true,
};

/**
 * Save lease inputs to localStorage.
 */
export function saveInputs(inputs: LeaseInputs): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch (error) {
    console.error("Failed to save inputs to localStorage:", error);
  }
}

/**
 * Load lease inputs from localStorage, or return defaults if not found.
 */
export function loadInputs(): LeaseInputs {
  if (typeof window === "undefined") return DEFAULT_INPUTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_INPUTS;

    const parsed = JSON.parse(stored);
    // Validate that the loaded data has the expected structure
    return {
      vehiclePrice: typeof parsed.vehiclePrice === "number" ? parsed.vehiclePrice : DEFAULT_INPUTS.vehiclePrice,
      mileageThousandsPerYear: typeof parsed.mileageThousandsPerYear === "number" ? parsed.mileageThousandsPerYear : DEFAULT_INPUTS.mileageThousandsPerYear,
      globalDepositMonths: typeof parsed.globalDepositMonths === "number" ? parsed.globalDepositMonths : DEFAULT_INPUTS.globalDepositMonths,
      perTermDeposits: parsed.perTermDeposits || {},
      applyDepositGlobally: typeof parsed.applyDepositGlobally === "boolean" ? parsed.applyDepositGlobally : DEFAULT_INPUTS.applyDepositGlobally,
    };
  } catch (error) {
    console.error("Failed to load inputs from localStorage:", error);
    return DEFAULT_INPUTS;
  }
}

/**
 * Clear saved inputs from localStorage.
 */
export function clearInputs(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear inputs from localStorage:", error);
  }
}
