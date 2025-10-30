# Vehicle Leasing Matrix Dashboard

An interactive vehicle leasing calculator built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Calculate monthly lease costs across fixed terms (6, 12, 18, 24, 36, 48, 60 months) with flexible deposits and mileage options.

## Features

- **Multiple Term Options**: Calculate lease payments for 6, 12, 18, 24, 36, 48, and 60-month terms
- **Flexible Deposits**: Adjust initial rental deposits from 0-12 months
- **Mileage Calculator**: Add extra mileage (0-30k miles per year) to calculations
- **Per-Term Overrides**: Customize deposit amounts for individual terms
- **Export/Copy**: Export results to CSV or copy to clipboard
- **Responsive Design**: Optimized for desktop and mobile devices
- **Local Storage**: Automatically saves your inputs
- **Help Documentation**: Built-in formula explanations and examples

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Validation**: zod

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Business Logic

### Adjusted Vehicle Price
For each additional 6 months beyond the first 6, add +4% of the base vehicle price (simple increments, not compounding):

```
termFactor = 1 + 0.04 × ((termMonths ÷ 6) - 1)
adjustedVehiclePrice = baseVehiclePrice × termFactor
```

### Mileage Add-on
For every extra 1000 miles per year selected, add £100 per 6 months:

```
mileageAddon = £100 × mileageThousandsPerYear × (termMonths ÷ 6)
```

### Balloon Percentage
- 6 months: 85%
- 12 months: 72%
- 18 months: 64.5% (linear interpolation)
- 24 months: 57%
- 36 months: 45%
- 48 months: 35%
- 60 months: 28%

### Monthly Payment
Using industry-typical "prepaid months" approach:

```
amortizable = adjustedPrice - balloonValue + mileageAddon
monthly = amortizable ÷ (termMonths + depositMonths)
upfrontInitialRental = monthly × depositMonths
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Toaster
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── LeaseCalculator.tsx # Main container with state management
│   ├── ControlsPanel.tsx   # Input controls panel
│   ├── TermRow.tsx         # Individual term result row/card
│   ├── HelpDialog.tsx      # Formula documentation dialog
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   ├── calc.ts             # Pure calculation functions
│   ├── format.ts           # Currency/number formatting
│   ├── storage.ts          # localStorage helpers
│   └── utils.ts            # Utility functions
└── hooks/
    └── use-toast.ts        # Toast notification hook
```

## Validation Tests

Run calculation validation tests:

```bash
npx tsx lib/test-calc.ts
```

Expected results for £33,000 vehicle, 0k mileage, 3 months deposit:
- 6m: £550.00/month
- 12m: £640.64/month
- 18m: £602.49/month
- 24m: £588.62/month
- 36m: £558.46/month
- 48m: £538.35/month
- 60m: £512.91/month

## License

MIT
