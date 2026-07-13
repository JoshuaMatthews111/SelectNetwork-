"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BarChart3, TrendingUp, PieChart, Network, CalendarClock, Eye, Download, Info, ArrowRight, FileText, X, Lock } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";
import ReportsCharts from "../components/ReportsCharts";
import { ldttDisclaimer, ldttCategoryTotals, ldttTotalProfit, fmtUSD } from "../data/ldtt";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

const scrollToCharts = () => {
  document.getElementById("live-charts")?.scrollIntoView({ behavior: "smooth" });
};

export default function ReportsPage() {
  const [compOpen, setCompOpen] = useState(false);
  const reportCards = [
    { icon: <BarChart3 size={24} />, title: "Revenue Performance Overview", desc: "Total sales and category revenue from Lorenzo's Dog Training Team historical records, 2016–2025.", pdf: null },
    { icon: <TrendingUp size={24} />, title: "Profit & Margin Summary", desc: "Operating profit and margin by year from the client-provided LDTT record.", pdf: null },
    { icon: <PieChart size={24} />, title: "Category Sales Breakdown", desc: "Training, boarding, equipment/misc, and tuition totals across all years.", pdf: null },
    { icon: <Network size={24} />, title: "Trainer Hierarchy 2026", desc: "Visual overview of LDTT's trainer network and leadership structure. Separate from the member referral network.", pdf: "/reports/trainer-hierarchy-2026.png", viewHref: "/reports/trainer-hierarchy-2026.png" },
    { icon: <FileText size={24} />, title: "Explaining the Drop & Rebuild", desc: "A detailed explanation of why LDTT's sales volume declined and the current recovery and growth strategy moving forward.", pdf: "/reports/explaining-the-drop-and-rebuild.pages", viewHref: "#live-charts", dropDoc: true },
    { icon: <CalendarClock size={24} />, title: "Quarterly Select Member Updates", desc: "Full quarterly updates, communications, and financial summaries are available exclusively inside the member dashboard after participation is completed.", pdf: null, portal: true },
  ];

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* Hero */}
      <section className="sn-section-pad" style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "70px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Network Performance Reports</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 auto", maxWidth: 720 }}>
            Transparency You Can Trust
          </h1>
          <p style={{ color: "#c6d2e1", maxWidth: 760, margin: "20px auto 0", lineHeight: 1.8, fontSize: 15.5 }}>
            At The Select Network Member Group, we believe informed select members make confident decisions. Our network performance reports provide clear, consistent, and data-driven visibility into the historical operating performance of Lorenzo&apos;s Dog Training Team so qualified select members can review the business record with confidence.
          </p>
        </div>
      </section>

      {/* Report cards */}
      <section style={{ padding: "70px 0 40px", background: "#fff" }}>
        <div className="sn-shell">
          <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {reportCards.map((r, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: 26, boxShadow: "0 10px 30px rgba(5,20,45,.05)", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: "#edf6ef", color: GREEN, display: "grid", placeItems: "center", marginBottom: 16 }}>{r.icon}</div>
                  <h3 style={{ fontSize: 18, margin: "0 0 10px", color: NAVY }}>{r.title}</h3>
                  <p style={{ color: "#5b6675", lineHeight: 1.6, margin: "0 0 20px", fontSize: 13.5, flex: 1 }}>{r.desc}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {r.portal ? (
                      <Link href="/login" style={btnGreen}><Eye size={15} /> View in Portal</Link>
                    ) : r.viewHref ? (
                      <a href={r.viewHref} target="_blank" rel="noopener noreferrer" style={btnGreen}><Eye size={15} /> View Report</a>
                    ) : (
                      <button onClick={scrollToCharts} style={btnGreen}><Eye size={15} /> View Report</button>
                    )}
                    {r.pdf ? (
                      <a href={r.pdf} download target="_blank" rel="noopener noreferrer" style={btnGold}><Download size={15} /> Download PDF</a>
                    ) : !r.portal ? (
                      <button onClick={() => window.print()} style={btnOutline}><Download size={15} /> Download PDF</button>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Official Compensation Plan Document */}
      <section style={{ padding: "20px 0 50px", background: "#fff" }}>
        <div className="sn-shell">
          <Reveal>
            <div style={{ background: "linear-gradient(135deg,#fbf9f4,#fff)", border: "1px solid #e7d9b6", borderRadius: 18, overflow: "hidden", boxShadow: "0 14px 40px rgba(5,20,45,.07)" }}>
              <div className="sn-comp-doc" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 0, alignItems: "stretch" }}>
                {/* Thumbnail */}
                <button onClick={() => setCompOpen(true)} style={{ position: "relative", border: 0, padding: 0, cursor: "pointer", background: "#0a2240", display: "block", minHeight: 220, overflow: "hidden" }} aria-label="Open compensation plan preview">
                  <Image src="/assets/select-network/select-network-comp-plan.png" alt="The Select Network Member Group Compensation Plan" width={640} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.96 }} />
                  <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(7,26,51,.32)", color: "#fff", transition: ".25s" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(7,26,51,.7)", padding: "10px 16px", borderRadius: 99, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", border: "1px solid rgba(213,168,61,.5)" }}><Eye size={14} /> Click to View</span>
                  </span>
                </button>
                {/* Details */}
                <div style={{ padding: "30px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: GOLD, fontSize: 11, fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 12 }}>
                    <FileText size={15} /> Official The Select Network Member Group Document
                  </div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 10px" }}>The Select Network Member Group Compensation Plan</h2>
                  <p style={{ color: "#5b6675", lineHeight: 1.7, fontSize: 14.5, margin: "0 0 22px", maxWidth: 560 }}>
                    Review the official unit allocation and quarterly distribution overview. A Unit is a proportional participation allocation within The Select Network Member Group membership stake structure, used to determine a Select member&apos;s share of designated company distributions and growth-based revenue participation. This document illustrates how units are purchased ($100 per unit) and how available quarterly profit is distributed across all units.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button onClick={() => setCompOpen(true)} style={btnGreen}><Eye size={15} /> View Document</button>
                    <a href="/assets/select-network/select-network-comp-plan.png" download="Select-Network-Compensation-Plan.png" style={btnGold}><Download size={15} /> Download</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Snapshot intro */}
      <section id="live-charts" style={{ padding: "30px 0 20px", background: "#fbf9f4", scrollMarginTop: 100 }}>
        <div className="sn-shell">
          <Reveal>
            <div style={{ marginBottom: 8 }}>
              <div style={{ width: 40, height: 3, background: GOLD, marginBottom: 16 }} />
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 32, margin: "0 0 12px" }}>Lorenzo&apos;s Dog Training Team Historical Operating Snapshot</h2>
              <p style={{ color: "#5b6675", lineHeight: 1.75, maxWidth: 820, margin: 0 }}>
                The charts below summarize Lorenzo&apos;s Dog Training Team sales, category revenue, trainer count, expenses, and operating profit based on the records provided. The purpose is to give qualified select members visibility into the operating history connected to the opportunity.
              </p>
            </div>
          </Reveal>

          {/* KPI summary */}
          <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, margin: "26px 0" }}>
            {[
              { label: "Total Sales Generated (2016–2025)", value: fmtUSD(ldttCategoryTotals.totalSales) },
              { label: "Total Operating Profit (2016–2025)", value: fmtUSD(ldttTotalProfit) },
              { label: "Training Sales (largest category)", value: fmtUSD(ldttCategoryTotals.training) },
            ].map((k, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "20px 22px" }}>
                <small style={{ fontSize: 11.5, color: "#667085", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{k.label}</small>
                <div style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginTop: 6 }}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive charts */}
      <section style={{ padding: "10px 0 40px", background: "#fbf9f4" }}>
        <div className="sn-shell">
          <ReportsCharts />
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: "0 0 70px", background: "#fbf9f4" }}>
        <div className="sn-shell">
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", border: "1px solid #e7d9b6", borderLeft: `4px solid ${GOLD}`, borderRadius: "0 12px 12px 0", padding: "20px 22px" }}>
            <Info size={22} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, color: "#604b17", fontSize: 13.5, lineHeight: 1.7 }}>{ldttDisclaimer}</p>
          </div>
        </div>
      </section>

      {/* Private Reports — locked for public */}
      <section style={{ padding: "50px 0", background: "#fff" }}>
        <div className="sn-shell" style={{ maxWidth: 800 }}>
          <Reveal>
            <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <Lock size={20} color={GOLD} />
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: 0 }}>Quarterly Reports &amp; Tax Documents</h2>
              </div>
              <p style={{ color: "#3d4a57", lineHeight: 1.7, fontSize: 14.5, margin: "0 0 20px" }}>
                Full reports, quarterly updates, and tax-related documents are available inside the member dashboard after participation is completed.
              </p>

              {/* Blurred/locked document tiles */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Q1 2025 Quarterly Update", scope: "Q1 2025" },
                  { label: "Q2 2025 Quarterly Update", scope: "Q2 2025" },
                  { label: "2024 Annual Tax Report", scope: "FY 2024" },
                  { label: "Q1 2025 Tax Summary", scope: "Q1 2025" },
                  { label: "Q2 2025 Tax Summary", scope: "Q2 2025" },
                  { label: "IRS Supporting Docs", scope: "All Years" },
                ].map((r, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 10, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
                    <div style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none" }}>
                      <b style={{ fontSize: 13, display: "block", marginBottom: 4 }}>{r.label}</b>
                      <span style={{ fontSize: 11, color: "#667085", display: "block", marginBottom: 10 }}>{r.scope}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ ...btnBase, padding: "6px 10px", fontSize: 11, background: `linear-gradient(135deg,${GREEN},#064a28)`, color: "#fff" }}>View</div>
                        <div style={{ ...btnBase, padding: "6px 10px", fontSize: 11, background: `linear-gradient(135deg,${GOLD},#a07520)`, color: "#fff" }}>PDF</div>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.80)" }}>
                      <div style={{ textAlign: "center" }}>
                        <Lock size={18} color={GOLD} style={{ margin: "0 auto 4px" }} />
                        <span style={{ fontSize: 10.5, fontWeight: 900, color: "#604b17", textTransform: "uppercase", letterSpacing: ".03em" }}>Members Only</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 12, padding: "18px 22px", display: "flex", gap: 14, alignItems: "center" }}>
                <Lock size={18} color="#ffd46f" style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, color: "#c6d2e1", fontSize: 13, lineHeight: 1.6 }}>
                  Full reports, quarterly updates, and tax-related documents are available inside the member dashboard after participation is completed.
                  <Link href="/invest-now" style={{ color: "#ffd46f", fontWeight: 700, marginLeft: 8 }}>Complete Your Participation →</Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="sn-section-pad" style={{ padding: "60px 0", background: "#fff", textAlign: "center" }}>
        <div className="sn-shell">
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 18px" }}>Review the full record inside the Member Portal.</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/invest-now" className="sn-btn" style={{ background: `linear-gradient(135deg,#0b5b34,#08431f)` }}>Select Tier <ArrowRight size={16} /></Link>
            <Link href="/login" className="sn-btn sn-btn-outline">Member Portal</Link>
          </div>
        </div>
      </section>

      {/* Compensation Plan Lightbox */}
      {compOpen && (
        <div onClick={() => setCompOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(7,26,51,.82)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 24, animation: "snFade .2s ease" }}>
          <button onClick={() => setCompOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "#fff", border: 0, borderRadius: "50%", width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 6px 20px rgba(0,0,0,.25)" }} aria-label="Close"><X size={22} color={NAVY} /></button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1100, width: "100%", maxHeight: "88vh", overflow: "auto", borderRadius: 12, boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}>
            <Image src="/assets/select-network/select-network-comp-plan.png" alt="The Select Network Member Group Compensation Plan" width={1024} height={640} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />
          </div>
        </div>
      )}

      <SNFooter />

      <style jsx global>{`
        @keyframes snFade { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 760px) {
          .sn-comp-doc { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  borderRadius: 8,
  padding: "10px 14px",
  fontWeight: 800,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: ".03em",
  cursor: "pointer",
  textDecoration: "none",
  border: 0,
};
const btnGreen: React.CSSProperties = { ...btnBase, background: "linear-gradient(135deg,#0b5b34,#08431f)", color: "#fff" };
const btnGold: React.CSSProperties = { ...btnBase, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff" };
const btnOutline: React.CSSProperties = { ...btnBase, background: "#fff", color: "#a46a00", border: "1px solid #bd8e28" };
