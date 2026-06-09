/**
 * Lorenzo's Dog Training Team (LDTT) — Historical Operating Records
 * ------------------------------------------------------------------
 * IMPORTANT: This data represents client-provided Lorenzo's Dog Training Team
 * historical SALES and OPERATING PERFORMANCE records (2016–2025).
 * It is NOT Select Network profit, Select Network revenue, or any
 * guaranteed / projected investor return. It is presented for informational
 * and due-diligence purposes only.
 */

export type YearSales = {
  year: number;
  training: number;
  boarding: number;
  equipment: number;
  tuition: number;
  total: number;
  trainers: number;
};

export type YearProfit = {
  year: number;
  total: number;
  ldttExpenses: number;
  takeFlightExpenses: number;
  profit: number;
  margin: number; // percent
};

/* ─── Sales by year & category (exact client-provided figures) ─── */
export const ldttSales: YearSales[] = [
  { year: 2016, training: 2612731.53, boarding: 131074.28, equipment: 318035.77, tuition: 86972.5, total: 3148814.08, trainers: 45 },
  { year: 2017, training: 3538235.21, boarding: 126774.5, equipment: 428302.49, tuition: 160037.5, total: 4253349.7, trainers: 53 },
  { year: 2018, training: 4710124.13, boarding: 168025.42, equipment: 539216.69, tuition: 256619.4, total: 5673985.64, trainers: 73 },
  { year: 2019, training: 5265635.65, boarding: 261547.71, equipment: 559218.21, tuition: 260140.6, total: 6346542.17, trainers: 88 },
  { year: 2020, training: 5447210.82, boarding: 1043642.88, equipment: 567161.43, tuition: 258452.0, total: 7316467.13, trainers: 98 },
  { year: 2021, training: 5937946.67, boarding: 975997.04, equipment: 599817.41, tuition: 210862.84, total: 7724623.96, trainers: 71 },
  { year: 2022, training: 5627981.26, boarding: 1173429.43, equipment: 573605.23, tuition: 432966.42, total: 7807982.34, trainers: 58 },
  { year: 2023, training: 5489999.69, boarding: 939167.39, equipment: 592181.44, tuition: 341219.52, total: 7362568.04, trainers: 66 },
  { year: 2024, training: 5283409.34, boarding: 1117328.39, equipment: 572185.06, tuition: 292270.0, total: 7265192.79, trainers: 69 },
  { year: 2025, training: 2600263.75, boarding: 582242.36, equipment: 217935.69, tuition: 151997.0, total: 3552438.8, trainers: 33 },
];

/* ─── Category totals (exact client-provided figures) ─── */
export const ldttCategoryTotals = {
  training: 46513538.05,
  boarding: 6519229.4,
  equipment: 4967659.42,
  tuition: 2451537.78,
  totalSales: 60451964.65,
};

/* ─── Operating profit / margin by year (exact client-provided figures) ─── */
export const ldttProfit: YearProfit[] = [
  { year: 2016, total: 3148814.08, ldttExpenses: 2489243.73, takeFlightExpenses: 13801.57, profit: 645768.78, margin: 20.51 },
  { year: 2017, total: 4253349.7, ldttExpenses: 3398473.79, takeFlightExpenses: 24777.04, profit: 830098.87, margin: 19.52 },
  { year: 2018, total: 5673985.64, ldttExpenses: 4609117.14, takeFlightExpenses: 25608.3, profit: 1039260.2, margin: 18.32 },
  { year: 2019, total: 6346542.17, ldttExpenses: 5544910.2, takeFlightExpenses: 275.69, profit: 801356.28, margin: 12.63 },
  { year: 2020, total: 7316467.13, ldttExpenses: 7333536.41, takeFlightExpenses: 0.0, profit: -17069.28, margin: -0.23 },
  { year: 2021, total: 7724623.96, ldttExpenses: 7417180.65, takeFlightExpenses: 25360.05, profit: 282083.26, margin: 3.65 },
  { year: 2022, total: 7807982.34, ldttExpenses: 6800595.97, takeFlightExpenses: 147500.0, profit: 859886.37, margin: 11.01 },
  { year: 2023, total: 7362568.04, ldttExpenses: 6416325.84, takeFlightExpenses: 163769.0, profit: 782473.2, margin: 10.63 },
  { year: 2024, total: 7265192.79, ldttExpenses: 6460639.72, takeFlightExpenses: 176760.0, profit: 627793.07, margin: 8.64 },
  { year: 2025, total: 3552438.8, ldttExpenses: 3572569.64, takeFlightExpenses: 3385.64, profit: -23516.48, margin: -0.66 },
];

/* Correct total operating profit across all years (client-provided chart) */
export const ldttTotalProfit = 5828134.27;

/* ─── Formatting helpers ─── */
export const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const fmtUSDfull = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtCompact = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

/* ─── Category metadata for charts ─── */
export const categoryMeta = [
  { key: "training" as const, label: "Training Sales", color: "#075933" },
  { key: "boarding" as const, label: "Boarding Sales", color: "#bd8e28" },
  { key: "equipment" as const, label: "Equipment/Misc Sales", color: "#0b7346" },
  { key: "tuition" as const, label: "Tuition Paid", color: "#9a6f12" },
];

/* ─── Standard investor-facing disclaimer ─── */
export const ldttDisclaimer =
  "These figures are based on client-provided Lorenzo's Dog Training Team historical sales and operating records. They are presented for informational and due diligence purposes only and should not be interpreted as guaranteed returns, investment projections, or Select Network profit.";
