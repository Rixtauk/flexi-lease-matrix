"use client";

import { useState, useEffect, useMemo } from "react";
import { LeaseInputs, TermMonths } from "@/lib/types";
import { computeRow } from "@/lib/calc";
import { loadInputs, saveInputs, DEFAULT_INPUTS } from "@/lib/storage";
import { gbp, pct } from "@/lib/format";
import { exportToPdf } from "@/lib/exportPdf";
import { ControlsPanel } from "./ControlsPanel";
import { HelpDialog } from "./HelpDialog";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function LeaseCalculator() {
  const [inputs, setInputs] = useState<LeaseInputs>(DEFAULT_INPUTS);
  const [showHelp, setShowHelp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  // Load inputs from localStorage on mount
  useEffect(() => {
    setInputs(loadInputs());
    setIsMounted(true);
  }, []);

  // Save inputs to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      saveInputs(inputs);
    }
  }, [inputs, isMounted]);

  // Compute single row for selected term with memoization
  const result = useMemo(() => {
    const deposit = inputs.applyDepositGlobally
      ? inputs.globalDepositMonths
      : Math.max(0, Math.min(12, inputs.perTermDeposits?.[inputs.selectedTerm] ?? inputs.globalDepositMonths));
    return computeRow(inputs.vehiclePrice, inputs.mileageThousandsPerYear, inputs.selectedTerm, deposit);
  }, [inputs]);

  const handleInputsChange = (newInputs: LeaseInputs) => {
    setInputs(newInputs);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    toast({
      title: "Reset Complete",
      description: "All inputs have been reset to defaults.",
    });
  };

  const handleDepositChange = (term: TermMonths, deposit: number) => {
    setInputs((prev) => ({
      ...prev,
      perTermDeposits: {
        ...prev.perTermDeposits,
        [term]: deposit,
      },
    }));
  };

  const handleExportCSV = () => {
    const headers = [
      "Term",
      "Monthly",
      "DepositMonths",
      "InitialRentalGBP",
      "BalloonPct",
      "BalloonGBP",
      "AdjustedPriceGBP",
    ];

    const row = [
      result.term.toString(),
      result.monthly.toFixed(2),
      result.depositMonthsUsed.toString(),
      result.upfrontInitialRental.toFixed(2),
      (result.balloonPct * 100).toFixed(1),
      result.balloonValue.toFixed(2),
      result.adjustedVehiclePrice.toFixed(2),
    ];

    const csv = [headers.join(","), row.join(",")].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lease-quote-${result.term}m-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "CSV Exported",
      description: "The lease quote has been exported to CSV.",
    });
  };

  const handleExportPDF = () => {
    try {
      exportToPdf(result, inputs);
      toast({
        title: "PDF Exported",
        description: "The lease quote has been exported to PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyMatrix = async () => {
    const text = `${result.term}m Lease Quote
Monthly Payment: ${gbp(result.monthly)}
Initial Rental: ${result.depositMonthsUsed}m (${gbp(result.upfrontInitialRental)})
Balloon: ${pct(result.balloonPct)} (${gbp(result.balloonValue)})
Adjusted Price: ${gbp(result.adjustedVehiclePrice)}`;

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Quote Copied",
        description: "The lease quote has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy quote to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Vehicle Leasing Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your monthly lease costs with flexible terms and deposits
        </p>
      </div>

      <ControlsPanel
        inputs={inputs}
        onInputsChange={handleInputsChange}
        onReset={handleReset}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
        onCopyMatrix={handleCopyMatrix}
        onShowHelp={() => setShowHelp(true)}
      />

      {/* Info line */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <strong>Formula:</strong> Monthly = (Adjusted Price - Balloon + Mileage Add-on) ÷
        (Months + Deposit Months). Initial rental is prepaid monthly × deposit months.
      </div>

      {/* Single Result Card */}
      <Card className="p-8 mb-6 bg-gradient-to-br from-card to-muted/20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">{result.term} Month Lease</h2>
          <div className="text-6xl font-bold" style={{ color: "#D53847" }}>
            {gbp(result.monthly)}
          </div>
          <p className="text-lg text-muted-foreground mt-2">per month</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <p className="text-sm text-muted-foreground mb-1">Initial Rental</p>
            <p className="text-2xl font-bold">{gbp(result.upfrontInitialRental)}</p>
            <p className="text-xs text-muted-foreground mt-1">{result.depositMonthsUsed} months deposit</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <p className="text-sm text-muted-foreground mb-1">Balloon Payment</p>
            <p className="text-2xl font-bold">{gbp(result.balloonValue)}</p>
            <p className="text-xs text-muted-foreground mt-1">{pct(result.balloonPct)} of adjusted price</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <p className="text-sm text-muted-foreground mb-1">Adjusted Vehicle Price</p>
            <p className="text-2xl font-bold">{gbp(result.adjustedVehiclePrice)}</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-brand/50 hover:bg-card/80 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <p className="text-sm text-muted-foreground mb-1">Mileage Add-on</p>
            <p className="text-2xl font-bold">{gbp(result.mileageAddon)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {inputs.mileageThousandsPerYear}k miles/year
            </p>
          </div>
        </div>
      </Card>

      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  );
}
