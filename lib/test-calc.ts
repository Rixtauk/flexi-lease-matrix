/**
 * Test file to validate calculations against acceptance criteria
 * Run with: npx tsx lib/test-calc.ts
 */

import { computeRow, getBalloonPct } from "./calc";
import { gbp } from "./format";

console.log("=== Vehicle Leasing Matrix - Calculation Tests ===\n");

// Test 1: With Vehicle Price = £33,000, Mileage = 0k/yr, Initial Rental = 3 months
console.log("Test 1: £33,000, 0k mileage, 3 months deposit");
console.log("Expected monthly payments:");
console.log("  6m ≈ £550.00");
console.log("  12m ≈ £640.64");
console.log("  18m ≈ £602.49");
console.log("  24m ≈ £588.62");
console.log("  36m ≈ £558.46");
console.log("  48m ≈ £538.35");
console.log("  60m ≈ £512.91");
console.log("\nActual results:");

const terms = [6, 12, 18, 24, 36, 48, 60] as const;
terms.forEach((term) => {
  const result = computeRow(33000, 0, term, 3);
  console.log(`  ${term}m: ${gbp(result.monthly)}`);
});

// Test 2: 24-month detailed calculation
console.log("\n\nTest 2: 24-month detailed calculation");
console.log("Expected:");
console.log("  Adjusted = £36,960");
console.log("  Balloon 57% = £21,067.20");
console.log("  Amortizable = £15,892.80");
console.log("  Monthly ≈ £588.62");
console.log("  Upfront initial rental ≈ £1,765.86");

const result24 = computeRow(33000, 0, 24, 3);
console.log("\nActual:");
console.log(`  Adjusted = ${gbp(result24.adjustedVehiclePrice)}`);
console.log(`  Balloon ${(result24.balloonPct * 100).toFixed(1)}% = ${gbp(result24.balloonValue)}`);
console.log(`  Amortizable = ${gbp(result24.amortizable)}`);
console.log(`  Monthly = ${gbp(result24.monthly)}`);
console.log(`  Upfront initial rental = ${gbp(result24.upfrontInitialRental)}`);

// Test 3: With mileage add-on (12k baseline)
console.log("\n\nTest 3a: £33,000, 10k mileage (below 12k baseline), 3 months deposit, 24 months");
console.log("Expected:");
console.log("  Mileage add-on = £0 (10k < 12k baseline)");
console.log("  Amortizable = £15,892.80");
console.log("  Monthly ≈ £588.62");
console.log("  Initial rental ≈ £1,765.86");

const result24Mileage10k = computeRow(33000, 10, 24, 3);
console.log("\nActual:");
console.log(`  Mileage add-on = ${gbp(result24Mileage10k.mileageAddon)}`);
console.log(`  Amortizable = ${gbp(result24Mileage10k.amortizable)}`);
console.log(`  Monthly = ${gbp(result24Mileage10k.monthly)}`);
console.log(`  Initial rental = ${gbp(result24Mileage10k.upfrontInitialRental)}`);

console.log("\n\nTest 3b: £33,000, 20k mileage (above 12k baseline), 3 months deposit, 24 months");
console.log("Expected:");
console.log("  Mileage add-on = £100 × (20-12) × 4 = £3,200");
console.log("  Amortizable = £19,092.80");
console.log("  Monthly ≈ £707.14");
console.log("  Initial rental ≈ £2,121.41");

const result24Mileage20k = computeRow(33000, 20, 24, 3);
console.log("\nActual:");
console.log(`  Mileage add-on = ${gbp(result24Mileage20k.mileageAddon)}`);
console.log(`  Amortizable = ${gbp(result24Mileage20k.amortizable)}`);
console.log(`  Monthly = ${gbp(result24Mileage20k.monthly)}`);
console.log(`  Initial rental = ${gbp(result24Mileage20k.upfrontInitialRental)}`);

// Test 4: 18-month balloon interpolation
console.log("\n\nTest 4: 18-month balloon interpolation");
console.log("Expected: 64.5% (linear interpolation between 12m@72% and 24m@57%)");
const balloon18 = getBalloonPct(18);
console.log(`Actual: ${(balloon18 * 100).toFixed(1)}%`);

console.log("\n=== All Tests Complete ===");
