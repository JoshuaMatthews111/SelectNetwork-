"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  ldttSales,
  ldttProfit,
  ldttCategoryTotals,
  ldttTotalProfit,
  categoryMeta,
  fmtUSD,
  fmtCompact,
} from "../data/ldtt";

type TabId = "revenue" | "category" | "profit" | "trainers" | "hierarchy";

const TABS: { id: TabId; label: string }[] = [
  { id: "revenue", label: "Revenue" },
  { id: "category", label: "Category Breakdown" },
  { id: "profit", label: "Profit / Margin" },
  { id: "trainers", label: "Trainers" },
  { id: "hierarchy", label: "Trainer Hierarchy" },
];

const W = 820;
const H = 340;
const PAD = { l: 58, r: 24, t: 24, b: 42 };
const plotW = W - PAD.l - PAD.r;
const plotH = H - PAD.t - PAD.b;

function Tooltip({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%,-115%)",
        background: "#071a33",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        boxShadow: "0 8px 24px rgba(5,20,45,.3)",
        border: "1px solid rgba(213,168,61,.4)",
        zIndex: 5,
      }}
    >
      {children}
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: "24px 22px", boxShadow: "0 10px 30px rgba(5,20,45,.06)" }}>
      <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 21, margin: "0 0 4px", color: "#071a33" }}>{title}</h3>
      {subtitle && <p style={{ margin: "0 0 14px", color: "#667085", fontSize: 13 }}>{subtitle}</p>}
      <div style={{ position: "relative", width: "100%" }}>{children}</div>
    </div>
  );
}

/* ─── Revenue: Total Sales line chart ─── */
function SalesLine() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...ldttSales.map((d) => d.total)) * 1.08;
  const px = (i: number) => PAD.l + (i / (ldttSales.length - 1)) * plotW;
  const py = (v: number) => PAD.t + plotH - (v / max) * plotH;
  const pts = ldttSales.map((d, i) => `${px(i)},${py(d.total)}`).join(" ");
  const area = `${px(0)},${PAD.t + plotH} ${pts} ${px(ldttSales.length - 1)},${PAD.t + plotH}`;
  const ticks = [0, 2_000_000, 4_000_000, 6_000_000, 8_000_000];

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#075933" stopOpacity=".22" />
            <stop offset="1" stopColor="#075933" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} y1={py(t)} x2={W - PAD.r} y2={py(t)} stroke="#eef1f4" strokeWidth="1" />
            <text x={PAD.l - 10} y={py(t) + 4} textAnchor="end" fontSize="11" fill="#9aa4b2">{fmtCompact(t)}</text>
          </g>
        ))}
        <polygon points={area} fill="url(#salesFill)" />
        <polyline points={pts} fill="none" stroke="#075933" strokeWidth="3" strokeLinejoin="round" />
        {ldttSales.map((d, i) => (
          <g key={d.year}>
            <text x={px(i)} y={H - 16} textAnchor="middle" fontSize="11" fill="#667085">{d.year}</text>
            <circle cx={px(i)} cy={py(d.total)} r={hover === i ? 7 : 4.5} fill="#fff" stroke="#bd8e28" strokeWidth="3" style={{ transition: "r .15s" }} />
            <rect x={px(i) - plotW / (ldttSales.length * 2)} y={PAD.t} width={plotW / ldttSales.length} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} />
          </g>
        ))}
      </svg>
      {hover !== null && (
        <Tooltip x={(px(hover) / W) * 100} y={(py(ldttSales[hover].total) / H) * 100}>
          <b>{ldttSales[hover].year}</b> · Total Sales<br />
          {fmtUSD(ldttSales[hover].total)}
        </Tooltip>
      )}
    </>
  );
}

/* ─── Category: stacked bar chart ─── */
function CategoryStacked() {
  const [hover, setHover] = useState<{ i: number; k: number } | null>(null);
  const max = Math.max(...ldttSales.map((d) => d.total)) * 1.08;
  const py = (v: number) => PAD.t + plotH - (v / max) * plotH;
  const band = plotW / ldttSales.length;
  const bw = band * 0.6;
  const ticks = [0, 2_000_000, 4_000_000, 6_000_000, 8_000_000];

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} y1={py(t)} x2={W - PAD.r} y2={py(t)} stroke="#eef1f4" strokeWidth="1" />
            <text x={PAD.l - 10} y={py(t) + 4} textAnchor="end" fontSize="11" fill="#9aa4b2">{fmtCompact(t)}</text>
          </g>
        ))}
        {ldttSales.map((d, i) => {
          const x = PAD.l + i * band + (band - bw) / 2;
          let acc = 0;
          return (
            <g key={d.year}>
              {categoryMeta.map((c, k) => {
                const val = d[c.key];
                const yTop = py(acc + val);
                const hgt = (val / max) * plotH;
                acc += val;
                return (
                  <rect
                    key={c.key}
                    x={x}
                    y={yTop}
                    width={bw}
                    height={Math.max(hgt, 0)}
                    fill={c.color}
                    opacity={hover && (hover.i !== i || hover.k !== k) ? 0.55 : 1}
                    onMouseEnter={() => setHover({ i, k })}
                    style={{ transition: "opacity .15s" }}
                  />
                );
              })}
              <text x={x + bw / 2} y={H - 16} textAnchor="middle" fontSize="11" fill="#667085">{d.year}</text>
            </g>
          );
        })}
      </svg>
      {hover && (
        <Tooltip x={((PAD.l + hover.i * band + band / 2) / W) * 100} y={20}>
          <b>{ldttSales[hover.i].year}</b> · {categoryMeta[hover.k].label}<br />
          {fmtUSD(ldttSales[hover.i][categoryMeta[hover.k].key])}
        </Tooltip>
      )}
    </>
  );
}

/* ─── Category: donut of totals ─── */
function CategoryDonut() {
  const [hover, setHover] = useState<number | null>(null);
  const totals = categoryMeta.map((c) => ({ ...c, value: ldttCategoryTotals[c.key] }));
  const sum = totals.reduce((a, b) => a + b.value, 0);
  const R = 120;
  const r = 72;
  const cx = 160;
  const cy = 160;
  let angle = -Math.PI / 2;
  const arcs = totals.map((t) => {
    const frac = t.value / sum;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const xi1 = cx + r * Math.cos(a1), yi1 = cy + r * Math.sin(a1);
    const xi0 = cx + r * Math.cos(a0), yi0 = cy + r * Math.sin(a0);
    return { ...t, frac, d: `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${xi1},${yi1} A${r},${r} 0 ${large} 0 ${xi0},${yi0} Z` };
  });

  return (
    <div className="sn-split" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 320, height: "auto" }} onMouseLeave={() => setHover(null)}>
          {arcs.map((a, i) => (
            <path key={a.key} d={a.d} fill={a.color} opacity={hover !== null && hover !== i ? 0.55 : 1} onMouseEnter={() => setHover(i)} style={{ transition: "opacity .15s", cursor: "pointer" }} />
          ))}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fill="#667085">Total Sales</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize="22" fontWeight="700" fill="#071a33">{fmtCompact(sum)}</text>
        </svg>
        {hover !== null && (
          <Tooltip x={50} y={50}>
            <b>{arcs[hover].label}</b><br />
            {fmtUSD(arcs[hover].value)} · {(arcs[hover].frac * 100).toFixed(1)}%
          </Tooltip>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {totals.map((t) => (
          <div key={t.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: "#f9f7f2", border: "1px solid #eee" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13.5, fontWeight: 700, color: "#0d2845" }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: t.color }} /> {t.label}
            </span>
            <b style={{ fontSize: 14, color: "#071a33" }}>{fmtUSD(t.value)}</b>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "linear-gradient(135deg,#0b5b34,#08431f)", color: "#fff" }}>
          <span style={{ fontSize: 13.5, fontWeight: 800 }}>Total Sales Generated</span>
          <b style={{ fontSize: 14 }}>{fmtUSD(sum)}</b>
        </div>
      </div>
    </div>
  );
}

/* ─── Profit bar (with negatives) ─── */
function ProfitBar() {
  const [hover, setHover] = useState<number | null>(null);
  const vals = ldttProfit.map((d) => d.profit);
  const max = Math.max(...vals) * 1.12;
  const min = Math.min(...vals) * 1.3;
  const range = max - min;
  const py = (v: number) => PAD.t + plotH - ((v - min) / range) * plotH;
  const zeroY = py(0);
  const band = plotW / ldttProfit.length;
  const bw = band * 0.55;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
        <line x1={PAD.l} y1={zeroY} x2={W - PAD.r} y2={zeroY} stroke="#c2cad4" strokeWidth="1.5" />
        <text x={PAD.l - 10} y={zeroY + 4} textAnchor="end" fontSize="11" fill="#9aa4b2">$0</text>
        {ldttProfit.map((d, i) => {
          const x = PAD.l + i * band + (band - bw) / 2;
          const top = d.profit >= 0 ? py(d.profit) : zeroY;
          const hgt = Math.abs(py(d.profit) - zeroY);
          const neg = d.profit < 0;
          return (
            <g key={d.year} onMouseEnter={() => setHover(i)}>
              <rect x={x} y={top} width={bw} height={Math.max(hgt, 1)} rx={3} fill={neg ? "#c0392b" : "#075933"} opacity={hover !== null && hover !== i ? 0.55 : 1} style={{ transition: "opacity .15s" }} />
              <text x={x + bw / 2} y={H - 16} textAnchor="middle" fontSize="11" fill="#667085">{d.year}</text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <Tooltip x={((PAD.l + hover * band + band / 2) / W) * 100} y={(py(Math.max(ldttProfit[hover].profit, 0)) / H) * 100}>
          <b>{ldttProfit[hover].year}</b> · LDTT Operating Profit<br />
          {fmtUSD(ldttProfit[hover].profit)} · {ldttProfit[hover].margin}% margin
        </Tooltip>
      )}
    </>
  );
}

/* ─── Margin line ─── */
function MarginLine() {
  const [hover, setHover] = useState<number | null>(null);
  const vals = ldttProfit.map((d) => d.margin);
  const max = Math.max(...vals) + 4;
  const min = Math.min(...vals) - 3;
  const range = max - min;
  const px = (i: number) => PAD.l + (i / (ldttProfit.length - 1)) * plotW;
  const py = (v: number) => PAD.t + plotH - ((v - min) / range) * plotH;
  const pts = ldttProfit.map((d, i) => `${px(i)},${py(d.margin)}`).join(" ");
  const zeroY = py(0);

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
        <line x1={PAD.l} y1={zeroY} x2={W - PAD.r} y2={zeroY} stroke="#dde2e8" strokeWidth="1" strokeDasharray="4 4" />
        <text x={PAD.l - 10} y={zeroY + 4} textAnchor="end" fontSize="11" fill="#9aa4b2">0%</text>
        <polyline points={pts} fill="none" stroke="#bd8e28" strokeWidth="3" strokeLinejoin="round" />
        {ldttProfit.map((d, i) => (
          <g key={d.year}>
            <text x={px(i)} y={H - 16} textAnchor="middle" fontSize="11" fill="#667085">{d.year}</text>
            <circle cx={px(i)} cy={py(d.margin)} r={hover === i ? 7 : 4.5} fill="#fff" stroke="#075933" strokeWidth="3" style={{ transition: "r .15s" }} />
            <rect x={px(i) - plotW / (ldttProfit.length * 2)} y={PAD.t} width={plotW / ldttProfit.length} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} />
          </g>
        ))}
      </svg>
      {hover !== null && (
        <Tooltip x={(px(hover) / W) * 100} y={(py(ldttProfit[hover].margin) / H) * 100}>
          <b>{ldttProfit[hover].year}</b> · Profit Margin<br />
          {ldttProfit[hover].margin}%
        </Tooltip>
      )}
    </>
  );
}

/* ─── Trainers bar ─── */
function TrainersBar() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...ldttSales.map((d) => d.trainers)) * 1.15;
  const py = (v: number) => PAD.t + plotH - (v / max) * plotH;
  const band = plotW / ldttSales.length;
  const bw = band * 0.55;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={PAD.l} y1={py(t)} x2={W - PAD.r} y2={py(t)} stroke="#eef1f4" strokeWidth="1" />
            <text x={PAD.l - 10} y={py(t) + 4} textAnchor="end" fontSize="11" fill="#9aa4b2">{t}</text>
          </g>
        ))}
        {ldttSales.map((d, i) => {
          const x = PAD.l + i * band + (band - bw) / 2;
          return (
            <g key={d.year} onMouseEnter={() => setHover(i)}>
              <rect x={x} y={py(d.trainers)} width={bw} height={PAD.t + plotH - py(d.trainers)} rx={3} fill="#0b7346" opacity={hover !== null && hover !== i ? 0.55 : 1} style={{ transition: "opacity .15s" }} />
              <text x={x + bw / 2} y={H - 16} textAnchor="middle" fontSize="11" fill="#667085">{d.year}</text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <Tooltip x={((PAD.l + hover * band + band / 2) / W) * 100} y={(py(ldttSales[hover].trainers) / H) * 100}>
          <b>{ldttSales[hover].year}</b><br />
          {ldttSales[hover].trainers} trainers
        </Tooltip>
      )}
    </>
  );
}

function Legend() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, margin: "0 0 16px" }}>
      {categoryMeta.map((c) => (
        <span key={c.key} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#475569", fontWeight: 600 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: c.color }} /> {c.label}
        </span>
      ))}
    </div>
  );
}

export default function ReportsCharts() {
  const [tab, setTab] = useState<TabId>("revenue");

  return (
    <div>
      {/* Tabs */}
      <div className="sn-table-wrap" style={{ marginBottom: 22 }}>
        <div style={{ display: "inline-flex", gap: 6, background: "#f1ede3", padding: 6, borderRadius: 12 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                border: 0,
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: ".02em",
                whiteSpace: "nowrap",
                cursor: "pointer",
                color: tab === t.id ? "#fff" : "#5b6675",
                background: tab === t.id ? "linear-gradient(135deg,#0b5b34,#08431f)" : "transparent",
                transition: ".2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 22, animation: "fadeIn .4s ease" }}>
        {tab === "revenue" && (
          <ChartCard title="Total Sales Over Time" subtitle="Lorenzo's Dog Training Team historical total sales, 2016–2025 (client-provided records).">
            <SalesLine />
          </ChartCard>
        )}

        {tab === "category" && (
          <>
            <ChartCard title="Sales by Category" subtitle="Annual sales split by category — Lorenzo's Dog Training Team historical records.">
              <Legend />
              <CategoryStacked />
            </ChartCard>
            <ChartCard title="Category Total Breakdown" subtitle="Total category sales across 2016–2025.">
              <CategoryDonut />
            </ChartCard>
          </>
        )}

        {tab === "profit" && (
          <>
            <ChartCard title="LDTT Operating Profit by Year" subtitle="Operating profit from the client-provided LDTT record. 2020 and 2025 were negative years.">
              <ProfitBar />
            </ChartCard>
            <ChartCard title="LDTT Profit Margin by Year" subtitle="Operating profit margin percentage, 2016–2025.">
              <MarginLine />
            </ChartCard>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <div style={{ flex: 1, minWidth: 200, background: "linear-gradient(135deg,#0b5b34,#08431f)", color: "#fff", borderRadius: 14, padding: "18px 20px" }}>
                <small style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.85 }}>Total Operating Profit (2016–2025)</small>
                <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>{fmtUSD(ldttTotalProfit)}</div>
              </div>
              <div style={{ flex: 1, minWidth: 200, background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 20px" }}>
                <small style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#667085" }}>Peak Margin Year</small>
                <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6, color: "#071a33" }}>2016 · 20.51%</div>
              </div>
            </div>
          </>
        )}

        {tab === "trainers" && (
          <ChartCard title="Trainers by Year" subtitle="Number of trainers in the Lorenzo's Dog Training Team network by year.">
            <TrainersBar />
          </ChartCard>
        )}

        {tab === "hierarchy" && (
          <ChartCard title="Trainer Hierarchy 2026" subtitle="A visual overview of Lorenzo's Dog Training Team's current trainer network and leadership structure. This is separate from the Select Network investor referral matrix.">
            <div style={{ background: "#f9f7f2", border: "1px solid #eee", borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div className="sn-table-wrap">
                <img src="/reports/trainer-hierarchy-2026.png" alt="Lorenzo's Dog Training Team Trainer Hierarchy 2026" style={{ width: "100%", minWidth: 520, borderRadius: 8, display: "block" }} />
              </div>
            </div>
            <a
              href="/reports/trainer-hierarchy-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", border: 0, borderRadius: 8, padding: "13px 22px", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: ".03em", textDecoration: "none" }}
            >
              <Download size={16} /> Download Hierarchy PDF
            </a>
          </ChartCard>
        )}
      </div>
    </div>
  );
}
