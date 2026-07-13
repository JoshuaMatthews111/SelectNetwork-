"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText, Lock, ShieldCheck, TrendingDown } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

const RISKS = [
  {
    icon: <TrendingDown size={24} />,
    title: "Possible loss of principal",
    body: "All participation involves risk, including possible loss of principal. No member should rely on projected outcomes as guaranteed results.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "No guaranteed distributions",
    body: "Quarterly distributions, participation yield, capital appreciation, and payouts are not guaranteed and depend on available results, official records, and program terms.",
  },
  {
    icon: <Lock size={24} />,
    title: "Limited liquidity",
    body: "Membership interests and Units may be subject to transfer limits, holding periods, approval requirements, and no public market.",
  },
  {
    icon: <FileText size={24} />,
    title: "Official documents control",
    body: "Member rights, responsibilities, allocations, and limitations are defined only by final membership agreements, offering documents, risk disclosures, and applicable law.",
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Business and operating risk",
    body: "Operating results can vary because of market conditions, management decisions, expenses, competition, timing, and other factors outside member control.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Eligibility and acceptance",
    body: "Access is private and subject to review, approval, availability, compliance requirements, and The Select Network Member Group's discretion.",
  },
];

export default function RiskFactorsPage() {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      <section className="sn-section-pad" style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "74px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center", maxWidth: 860 }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Private Member Review</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 44, lineHeight: 1.12, margin: "0 auto" }}>Risk Factors</h1>
          <p style={{ color: "#c6d2e1", maxWidth: 720, margin: "20px auto 0", lineHeight: 1.75, fontSize: 16 }}>
            This page is for informational purposes only. It is not an offer to sell, a solicitation to buy, or a guarantee of returns. Qualified individuals should review all official documents and consult independent advisors before participating.
          </p>
        </div>
      </section>

      <section style={{ padding: "74px 0", background: "#fbf9f4" }}>
        <div className="sn-shell">
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="sn-risk-grid">
              {RISKS.map((risk) => (
                <article key={risk.title} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: 28, minHeight: 240, boxShadow: "0 12px 34px rgba(5,20,45,.06)" }}>
                  <div style={{ width: 54, height: 54, borderRadius: 14, background: "#edf6ef", color: GREEN, display: "grid", placeItems: "center", marginBottom: 18 }}>{risk.icon}</div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 10px" }}>{risk.title}</h2>
                  <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: 14, margin: 0 }}>{risk.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "0 0 78px", background: "#fbf9f4" }}>
        <div className="sn-shell" style={{ maxWidth: 920 }}>
          <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", color: "#fff", borderRadius: 18, padding: "34px 32px", display: "flex", gap: 22, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ maxWidth: 620 }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 10px" }}>Review before requesting access.</h2>
              <p style={{ color: "#c6d2e1", lineHeight: 1.7, fontSize: 14, margin: 0 }}>
                Participation is subject to eligibility review, official documents, risk disclosures, and acceptance. Past performance does not guarantee future results.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/invest-now" className="sn-btn" style={{ background: `linear-gradient(135deg,${GOLD},#a07520)` }}>Request Private Access <ArrowRight size={16} /></Link>
              <Link href="/contact" className="sn-btn sn-btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,.36)" }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <SNFooter />

      <style jsx global>{`
        @media (max-width: 980px) {
          .sn-risk-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .sn-risk-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
