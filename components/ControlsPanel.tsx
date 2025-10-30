"use client";

import { LeaseInputs, LeaseOutputRow } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, RotateCcw, Download, Copy, FileDown } from "lucide-react";
import { useState } from "react";

interface ControlsPanelProps {
  inputs: LeaseInputs;
  onInputsChange: (inputs: LeaseInputs) => void;
  onReset: () => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
  onCopyMatrix: () => void;
  onShowHelp: () => void;
}

export function ControlsPanel({
  inputs,
  onInputsChange,
  onReset,
  onExportCSV,
  onExportPDF,
  onCopyMatrix,
  onShowHelp,
}: ControlsPanelProps) {
  const [vehiclePriceInput, setVehiclePriceInput] = useState(inputs.vehiclePrice.toString());

  const handleVehiclePriceChange = (value: string) => {
    setVehiclePriceInput(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) {
      onInputsChange({ ...inputs, vehiclePrice: parsed });
    }
  };

  const handleVehiclePriceBlur = () => {
    const parsed = parseFloat(vehiclePriceInput);
    if (isNaN(parsed) || parsed < 0) {
      setVehiclePriceInput(inputs.vehiclePrice.toString());
    }
  };

  return (
    <Card className="p-6 mb-6 sticky top-24 z-10 bg-card shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Lease Calculator Controls</h2>
        <Button variant="ghost" size="icon" onClick={onShowHelp}>
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Vehicle Price */}
        <div className="space-y-2">
          <Label htmlFor="vehicle-price" className="text-sm font-medium">
            Vehicle Price (£)
          </Label>
          <Input
            id="vehicle-price"
            type="number"
            min={0}
            step={100}
            value={vehiclePriceInput}
            onChange={(e) => handleVehiclePriceChange(e.target.value)}
            onBlur={handleVehiclePriceBlur}
            className="text-lg"
          />
          {parseFloat(vehiclePriceInput) < 0 && (
            <p className="text-sm text-destructive">Price must be positive</p>
          )}
        </div>

        {/* Mileage */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mileage" className="text-sm font-medium">
              Mileage (extra k/yr): {inputs.mileageThousandsPerYear}k
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Each +1 here = +£100 per 6 months to the total, scaled by term length.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Slider
            id="mileage"
            min={0}
            max={30}
            step={1}
            value={[inputs.mileageThousandsPerYear]}
            onValueChange={(value) =>
              onInputsChange({ ...inputs, mileageThousandsPerYear: value[0] })
            }
            className="w-full"
          />
        </div>

        {/* Initial Rental */}
        <div className="space-y-2">
          <Label htmlFor="deposit" className="text-sm font-medium">
            Initial Rental (months): {inputs.globalDepositMonths}
          </Label>
          <Slider
            id="deposit"
            min={0}
            max={12}
            step={1}
            value={[inputs.globalDepositMonths]}
            onValueChange={(value) =>
              onInputsChange({ ...inputs, globalDepositMonths: value[0] })
            }
            className="w-full"
          />
        </div>

        {/* Apply to all terms */}
        <div className="space-y-2">
          <Label htmlFor="apply-global" className="text-sm font-medium">
            Apply deposit to all terms
          </Label>
          <div className="flex items-center space-x-2 h-10">
            <Switch
              id="apply-global"
              checked={inputs.applyDepositGlobally}
              onCheckedChange={(checked) =>
                onInputsChange({ ...inputs, applyDepositGlobally: checked })
              }
            />
            <span className="text-sm text-muted-foreground">
              {inputs.applyDepositGlobally ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onReset} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button onClick={onExportCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button onClick={onExportPDF} variant="outline" size="sm">
          <FileDown className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button onClick={onCopyMatrix} variant="outline" size="sm">
          <Copy className="h-4 w-4 mr-2" />
          Copy Results
        </Button>
      </div>
    </Card>
  );
}
