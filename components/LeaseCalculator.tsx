"use client";

import { useState, useEffect, useMemo } from "react";
import { LeaseInputs, TermMonths } from "@/lib/types";
import { computeMatrix } from "@/lib/calc";
import { loadInputs, saveInputs, DEFAULT_INPUTS } from "@/lib/storage";
import { gbp, pct } from "@/lib/format";
import { exportToPdf } from "@/lib/exportPdf";
import { ControlsPanel } from "./ControlsPanel";
import { TermRow } from "./TermRow";
import { HelpDialog } from "./HelpDialog";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

  // Compute matrix with memoization
  const matrix = useMemo(() => computeMatrix(inputs), [inputs]);

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
      "MileageAddonGBP",
      "AmortizableGBP",
    ];

    const rows = matrix.map((row) => [
      row.term.toString(),
      row.monthly.toFixed(2),
      row.depositMonthsUsed.toString(),
      row.upfrontInitialRental.toFixed(2),
      (row.balloonPct * 100).toFixed(1),
      row.balloonValue.toFixed(2),
      row.adjustedVehiclePrice.toFixed(2),
      row.mileageAddon.toFixed(2),
      row.amortizable.toFixed(2),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lease-matrix-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "CSV Exported",
      description: "The lease matrix has been exported to CSV.",
    });
  };

  const handleExportPDF = () => {
    try {
      exportToPdf(matrix, inputs);
      toast({
        title: "PDF Exported",
        description: "The lease matrix has been exported to PDF.",
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
    const text = matrix
      .map(
        (row) =>
          `${row.term}m | Monthly ${gbp(row.monthly)} | Deposit ${
            row.depositMonthsUsed
          }m (${gbp(row.upfrontInitialRental)}) | Balloon ${pct(row.balloonPct)} (${gbp(
            row.balloonValue
          )}) | Adjusted ${gbp(row.adjustedVehiclePrice)} | Mileage add-on ${gbp(
            row.mileageAddon
          )}`
      )
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Matrix Copied",
        description: "The lease matrix has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy matrix to clipboard.",
        variant: "destructive",
      });
    }
  };

  // Detect mobile/desktop for responsive layout
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Vehicle Leasing Matrix</h1>
        <p className="text-muted-foreground">
          Calculate monthly lease costs across multiple terms with flexible deposits
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
      <div className="mb-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <strong>Formula:</strong> Monthly = (Adjusted Price - Balloon + Mileage Add-on) ÷
        (Months + Deposit Months). Initial rental is prepaid monthly × deposit months.
      </div>

      {/* Matrix Display */}
      {isMobile ? (
        <div className="space-y-4">
          {matrix.map((row) => (
            <TermRow
              key={row.term}
              row={row}
              showDepositOverride={!inputs.applyDepositGlobally}
              onDepositChange={handleDepositChange}
              isMobile={true}
            />
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Term</TableHead>
                <TableHead>Monthly</TableHead>
                <TableHead>Initial Rental</TableHead>
                <TableHead>Balloon</TableHead>
                <TableHead>Adjusted Price</TableHead>
                <TableHead>Mileage Add-on</TableHead>
                {!inputs.applyDepositGlobally && <TableHead>Deposit Override</TableHead>}
                <TableHead>Copy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrix.map((row) => (
                <TermRow
                  key={row.term}
                  row={row}
                  showDepositOverride={!inputs.applyDepositGlobally}
                  onDepositChange={handleDepositChange}
                  isMobile={false}
                />
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  );
}
