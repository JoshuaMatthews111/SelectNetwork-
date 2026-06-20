"use client";

import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import SNNav from "../components/SNNav";
import SNBrandVideo from "../components/SNBrandVideo";
import SNFooter from "../components/SNFooter";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

export default function CompPlanPage() {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />
      <SNBrandVideo />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "70px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Compensation Plan</div>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 38, lineHeight: 1.2, margin: "0 auto", maxWidth: 700 }}>
            How The Select Network Member Group Compensation Plan Works
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "70px 0", background: "#fbf9f4" }}>
        <div className="sn-shell" style={{ maxWidth: 760 }}>
          <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: "40px 32px" }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3d4a57", margin: "0 0 24px" }}>
              The full compensation plan will be added here once the official structure, member terms, and legal language are finalized. This section will explain unit ownership, quarterly profit distributions, Builder participation, Foundation Partner status, referral network growth, bonus opportunities, and withdrawal rules.
            </p>

            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fffaf0", border: "1px solid #e7d9b6", borderLeft: `4px solid ${GOLD}`, borderRadius: "0 12px 12px 0", padding: "18px 20px", marginBottom: 28 }}>
              <Info size={20} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, color: "#604b17", fontSize: 13.5, lineHeight: 1.7 }}>
                This page is for informational purposes and must be finalized with approved company terms before public launch.
              </p>
            </div>

            <h3 style={{ fontSize: 18, margin: "0 0 14px" }}>Topics to be Covered:</h3>
            <ul style={{ color: "#3d4a57", fontSize: 14.5, lineHeight: 2, paddingLeft: 22, margin: "0 0 28px" }}>
              <li>Unit definition, ownership, and pricing structure — A Unit is a proportional participation allocation within The Select Network Member Group investment structure, used to determine an investor&apos;s share of designated company distributions and growth-based revenue participation</li>
              <li>Quarterly profit distribution mechanics</li>
              <li>Builder referral network (3-wide structure)</li>
              <li>Foundation Partner status and benefits</li>
              <li>Referral network growth and completion milestones</li>
              <li>Bonus unit opportunities</li>
              <li>Withdrawal rules and approval process</li>
              <li>Member terms and official disclosures</li>
            </ul>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/invest-now" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${GREEN}, #064a28)`, color: "#fff", borderRadius: 8, padding: "14px 22px", fontWeight: 800, fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".04em", textDecoration: "none" }}>
                Back to Invest Now <ArrowRight size={14} />
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: NAVY, border: "1.5px solid #d4cdbf", borderRadius: 8, padding: "14px 22px", fontWeight: 800, fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".04em", textDecoration: "none" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SNFooter />
    </div>
  );
}
