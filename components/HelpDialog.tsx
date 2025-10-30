"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">How the Calculator Works</DialogTitle>
          <DialogDescription>
            Formulas, assumptions, and example calculations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Adjusted Vehicle Price */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Adjusted Vehicle Price</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The vehicle price increases by 4% for each additional 6-month period beyond the first 6 months (simple increments, not compounding):
            </p>
            <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
              termFactor = 1 + 0.04 × ((termMonths ÷ 6) - 1)
              <br />
              adjustedVehiclePrice = baseVehiclePrice × termFactor
            </div>
            <p className="text-sm">
              <strong>Example at £33,000:</strong>
            </p>
            <ul className="text-sm space-y-1 mt-2 ml-4">
              <li>• 6m: £33,000 × 1.00 = £33,000</li>
              <li>• 12m: £33,000 × 1.04 = £34,320</li>
              <li>• 24m: £33,000 × 1.12 = £36,960</li>
              <li>• 36m: £33,000 × 1.20 = £39,600</li>
              <li>• 60m: £33,000 × 1.36 = £44,880</li>
            </ul>
          </section>

          <Separator />

          {/* Mileage Add-on */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Mileage Add-on</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The calculator includes a baseline of 12,000 miles per year at no additional charge. For every 1,000 miles per year beyond 12k, add £100 per 6-month period of the term:
            </p>
            <div className="bg-muted p-3 rounded-md font-mono text-sm mb-2">
              mileageAddon = £100 × Math.max(0, mileageThousandsPerYear - 12) × (termMonths ÷ 6)
            </div>
            <p className="text-sm">
              <strong>Examples:</strong>
            </p>
            <ul className="text-sm space-y-1 mt-2 ml-4">
              <li>• 10k miles/year on 24m term = £0 (below 12k baseline)</li>
              <li>• 12k miles/year on 24m term = £0 (at baseline)</li>
              <li>• 15k miles/year on 24m term = £100 × 3 × 4 = £1,200</li>
              <li>• 20k miles/year on 24m term = £100 × 8 × 4 = £3,200</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Note: The mileage slider shows total annual mileage. Only miles beyond 12k/year are charged.
            </p>
          </section>

          <Separator />

          {/* Balloon Percentage */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Balloon Percentage</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The balloon percentage (residual value) applies to the adjusted vehicle price and reduces the amount amortized in monthly payments:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• 6 months: 85%</li>
              <li>• 12 months: 72%</li>
              <li>• 18 months: 64.5% (linear interpolation between 12m and 24m)</li>
              <li>• 24 months: 57%</li>
              <li>• 36 months: 45%</li>
              <li>• 48 months: 35%</li>
              <li>• 60 months: 28%</li>
            </ul>
            <div className="bg-muted p-3 rounded-md font-mono text-sm mt-2">
              balloonValue = adjustedVehiclePrice × balloonPct
            </div>
          </section>

          <Separator />

          {/* Monthly Payment Calculation */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Monthly Payment Calculation</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The monthly payment uses an industry-typical &ldquo;prepaid months&rdquo; approach:
            </p>
            <div className="bg-muted p-3 rounded-md font-mono text-sm space-y-1">
              <div>amortizable = adjustedPrice - balloonValue + mileageAddon</div>
              <div>monthly = amortizable ÷ (termMonths + depositMonths)</div>
              <div>upfrontInitialRental = monthly × depositMonths</div>
            </div>
            <p className="text-sm mt-2 text-muted-foreground">
              This formula deducts the balloon value and spreads the remaining cost (plus mileage) over the term plus deposit months, then calculates the upfront rental based on the monthly payment.
            </p>
          </section>

          <Separator />

          {/* Example Calculation */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Example Calculation (24 months)</h3>
            <p className="text-sm mb-2">
              <strong>Inputs:</strong> Vehicle Price = £33,000, Mileage = 0k/yr, Deposit = 3 months
            </p>
            <div className="bg-muted p-4 rounded-md text-sm space-y-1">
              <div>1. Adjusted Price: £33,000 × 1.12 = <strong>£36,960</strong></div>
              <div>2. Balloon (57%): £36,960 × 0.57 = <strong>£21,067.20</strong></div>
              <div>3. Mileage Add-on: £0 (no extra mileage)</div>
              <div>4. Amortizable: £36,960 - £21,067.20 + £0 = <strong>£15,892.80</strong></div>
              <div>5. Monthly: £15,892.80 ÷ (24 + 3) = <strong>£588.62</strong></div>
              <div>6. Initial Rental: £588.62 × 3 = <strong>£1,765.86</strong></div>
            </div>
          </section>

          <Separator />

          {/* Rounding Policy */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Rounding Policy</h3>
            <p className="text-sm text-muted-foreground">
              All calculations use full precision internally. Display values are rounded to 2 decimal places for currency (£) and 1 decimal place for percentages (%).
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
