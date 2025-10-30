import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LeaseInputs, LeaseOutputRow } from "./types";
import { gbp, pct } from "./format";

/**
 * Export a single lease quote to a PDF file
 */
export function exportToPdf(
  row: LeaseOutputRow,
  inputs: LeaseInputs
): void {
  // Create a new PDF document
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Vehicle Lease Quote", 14, 20);

  // Add subtitle
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-GB")}`, 14, 27);

  // Add input parameters section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Input Parameters", 14, 37);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const parametersY = 43;
  doc.text(`Vehicle Price: ${gbp(inputs.vehiclePrice)}`, 14, parametersY);
  doc.text(
    `Extra Mileage: ${inputs.mileageThousandsPerYear}k miles/year`,
    14,
    parametersY + 6
  );
  doc.text(
    `Initial Rental (Default): ${inputs.globalDepositMonths} months`,
    14,
    parametersY + 12
  );
  doc.text(
    `Apply to All Terms: ${inputs.applyDepositGlobally ? "Yes" : "No"}`,
    14,
    parametersY + 18
  );

  // Prepare table data (single row)
  const tableHeaders = [
    "Term",
    "Monthly",
    "Deposit",
    "Initial Rental",
    "Balloon %",
    "Balloon £",
    "Adjusted Price",
  ];

  const tableData = [[
    `${row.term}m`,
    gbp(row.monthly),
    `${row.depositMonthsUsed}m`,
    gbp(row.upfrontInitialRental),
    pct(row.balloonPct),
    gbp(row.balloonValue),
    gbp(row.adjustedVehiclePrice),
  ]];

  // Add the table
  autoTable(doc, {
    startY: parametersY + 28,
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    margin: { left: 14, right: 14 },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [213, 56, 71], // First Flexi Lease brand red #D53847
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 20 },
      1: { halign: "right", cellWidth: 28 },
      2: { halign: "center", cellWidth: 22 },
      3: { halign: "right", cellWidth: 30 },
      4: { halign: "center", cellWidth: 24 },
      5: { halign: "right", cellWidth: 28 },
      6: { halign: "right", cellWidth: 30 },
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  // Add footer with formula explanation
  const finalY = (doc as any).lastAutoTable.finalY || parametersY + 28;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Formula: Monthly = (Adjusted Price - Balloon + Mileage Add-on) ÷ (Months + Deposit Months)",
    14,
    finalY + 10
  );
  doc.text(
    "Initial rental is prepaid monthly payment × deposit months",
    14,
    finalY + 15
  );

  // Add page number at bottom
  doc.setFontSize(8);
  doc.text(
    `Page 1`,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" }
  );

  // Save the PDF
  const filename = `lease-quote-${row.term}m-${Date.now()}.pdf`;
  doc.save(filename);
}
