export type TermMonths = 6 | 12 | 18 | 24 | 36 | 48 | 60;

export interface LeaseInputs {
  vehiclePrice: number;              // base price, e.g., 33000
  mileageThousandsPerYear: number;   // 0..30
  globalDepositMonths: number;       // 0..12
  perTermDeposits?: Partial<Record<TermMonths, number>>;
  applyDepositGlobally: boolean;
  selectedTerm: TermMonths;          // selected term to display, e.g., 24
}

export interface LeaseOutputRow {
  term: TermMonths;
  adjustedVehiclePrice: number;
  balloonPct: number;
  balloonValue: number;
  mileageAddon: number;
  amortizable: number;
  monthly: number;
  upfrontInitialRental: number;
  depositMonthsUsed: number;
}
