/**
 * Format a number as GBP currency with 2 decimal places.
 */
export const gbp = (n: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(n);

/**
 * Format a decimal as a percentage with 1 decimal place.
 */
export const pct = (p: number): string =>
  (p * 100).toFixed(1) + "%";
