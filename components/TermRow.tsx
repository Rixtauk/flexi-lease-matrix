"use client";

import { LeaseOutputRow, TermMonths } from "@/lib/types";
import { gbp, pct } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface TermRowProps {
  row: LeaseOutputRow;
  showDepositOverride: boolean;
  onDepositChange?: (term: TermMonths, deposit: number) => void;
  isMobile?: boolean;
}

export function TermRow({
  row,
  showDepositOverride,
  onDepositChange,
  isMobile = false,
}: TermRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${row.term}m | Monthly ${gbp(row.monthly)} | Deposit ${row.depositMonthsUsed}m (${gbp(
      row.upfrontInitialRental
    )}) | Balloon ${pct(row.balloonPct)} (${gbp(row.balloonValue)}) | Adjusted ${gbp(
      row.adjustedVehiclePrice
    )} | Mileage add-on ${gbp(row.mileageAddon)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (isMobile) {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{row.term} months</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="bg-primary/5 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Monthly Payment</p>
            <p className="text-3xl font-bold text-primary">{gbp(row.monthly)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Initial Rental</p>
              <p className="font-semibold">{gbp(row.upfrontInitialRental)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Deposit</p>
              <p className="font-semibold">{row.depositMonthsUsed} months</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Balloon</p>
              <p className="font-semibold">
                {pct(row.balloonPct)} ({gbp(row.balloonValue)})
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Adjusted Price</p>
              <p className="font-semibold">{gbp(row.adjustedVehiclePrice)}</p>
            </div>
          </div>

          {row.mileageAddon > 0 && (
            <div className="text-sm">
              <p className="text-muted-foreground">Mileage Add-on</p>
              <p className="font-semibold">{gbp(row.mileageAddon)}</p>
            </div>
          )}

          {showDepositOverride && onDepositChange && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor={`deposit-${row.term}`} className="text-sm">
                  Deposit Override: {row.depositMonthsUsed} months
                </Label>
                <Slider
                  id={`deposit-${row.term}`}
                  min={0}
                  max={12}
                  step={1}
                  value={[row.depositMonthsUsed]}
                  onValueChange={(value) => onDepositChange(row.term, value[0])}
                />
              </div>
            </>
          )}
        </div>
      </Card>
    );
  }

  // Desktop table row
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-semibold">{row.term}m</TableCell>
      <TableCell>
        <div className="text-2xl font-bold text-primary">{gbp(row.monthly)}</div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-semibold">{gbp(row.upfrontInitialRental)}</div>
          <div className="text-muted-foreground">{row.depositMonthsUsed} months</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-semibold">{pct(row.balloonPct)}</div>
          <div className="text-muted-foreground">{gbp(row.balloonValue)}</div>
        </div>
      </TableCell>
      <TableCell className="text-sm">{gbp(row.adjustedVehiclePrice)}</TableCell>
      <TableCell className="text-sm">
        {row.mileageAddon > 0 ? gbp(row.mileageAddon) : "—"}
      </TableCell>
      {showDepositOverride && onDepositChange && (
        <TableCell>
          <div className="space-y-1 min-w-[120px]">
            <div className="text-xs text-muted-foreground">
              {row.depositMonthsUsed}m
            </div>
            <Slider
              min={0}
              max={12}
              step={1}
              value={[row.depositMonthsUsed]}
              onValueChange={(value) => onDepositChange(row.term, value[0])}
            />
          </div>
        </TableCell>
      )}
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
}
