"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, BookOpen, Building2, Handshake, Home, TrendingUp, DollarSign, PawPrint, CheckCircle2 } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

export default function InvestmentFocusPage() {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* Hero */}
      <section className="sn-section-pad" style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "70px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Capital Focus</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 auto", maxWidth: 760 }}>
            Current Membership Stake Opportunities
          </h1>
          <p style={{ color: "#c6d2e1", maxWidth: 660, margin: "20px auto 0", lineHeight: 1.7, fontSize: 16 }}>
            The Select Network Member Group identifies and develops high-impact, purpose-driven opportunities designed to create sustainable long-term growth for our members.
          </p>
        </div>
      </section>

      {/* LDTT Opportunity Card — Primary Focus */}
      <section style={{ padding: "78px 0", background: "#fbf9f4" }}>
        <div className="sn-shell" style={{ maxWidth: 900 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ width: 40, height: 3, background: GOLD, margin: "0 auto 18px" }} />
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, margin: "0 0 8px" }}>Current Capital Focus</h2>
              <p style={{ color: "#5b6675", fontSize: 14.5, margin: 0 }}>Our first membership stake opportunity inside The Select Network Member Group.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Link href="/investment-focus/ldtt" style={{ textDecoration: "none", display: "block" }}>
              <div className="sn-ldtt-opportunity-card" style={{
                background: "#fff",
                border: "1px solid #e7e2d8",
                borderRadius: 20,
                padding: "44px 40px",
                boxShadow: "0 12px 40px rgba(5,20,45,.08)",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 36,
                alignItems: "center",
                transition: "all .3s ease",
                cursor: "pointer",
              }}>
                <Image
                  src="/assets/select-network/lorenzos-dog-training-team-logo.png"
                  alt="Lorenzo's Dog Training Team"
                  width={300}
                  height={300}
                  style={{ width: 200, height: "auto" }}
                />
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: GOLD, marginBottom: 10, display: "block" }}>First Capital Focus</span>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 14px", color: NAVY }}>Lorenzo&apos;s Dog Training Team</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3d4a57", margin: "0 0 22px" }}>
                    Lorenzo&apos;s Dog Training Team is the first current capital focus inside The Select Network Member Group. This opportunity highlights a growing dog training brand connected to systems, expansion, service impact, and long-term business development.
                  </p>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: `linear-gradient(135deg, ${GREEN}, #064a28)`,
                    color: "#fff",
                    borderRadius: 8,
                    padding: "14px 24px",
                    fontWeight: 800,
                    fontSize: 12.5,
                    textTransform: "uppercase",
                    letterSpacing: ".04em",
                  }}>
                    View Opportunity <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Where We Build Value */}
      <section style={{ padding: "70px 0", background: "#fff" }}>
        <div className="sn-shell">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ width: 40, height: 3, background: GOLD, margin: "0 auto 18px" }} />
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 32, margin: 0 }}>Where We Build Value</h2>
            </div>
          </Reveal>
          <div className="sn-grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}>
            {[
              { icon: <GraduationCap size={26} />, title: "Elite Dog Training Programs", desc: "Industry-leading training, behavior solutions, and certification courses." },
              { icon: <Users size={26} />, title: "Trainer Network Expansion", desc: "Scaling a multi-state network of skilled, certified trainers." },
              { icon: <BookOpen size={26} />, title: "Leadership & Education", desc: "Developing leaders through structured education and mentorship." },
              { icon: <Building2 size={26} />, title: "Operational Infrastructure", desc: "Systems, facilities, and tools built to scale responsibly." },
              { icon: <Handshake size={26} />, title: "Strategic Partnerships", desc: "Aligned relationships that expand reach and create value." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{ background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 16, padding: "26px 20px", height: "100%" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "#edf6ef", color: GREEN, display: "grid", placeItems: "center", marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 16.5, margin: "0 0 8px", color: NAVY }}>{c.title}</h3>
                  <p style={{ color: "#5b6675", lineHeight: 1.6, margin: 0, fontSize: 13.5 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why this market + Member Lens */}
      <section style={{ padding: "20px 0 78px", background: "#fff" }}>
        <div className="sn-shell sn-split" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 30, alignItems: "start" }}>
          <Reveal>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, margin: "0 0 8px" }}>Why This Market</h2>
              <p style={{ color: "#5b6675", lineHeight: 1.7, margin: "0 0 24px", maxWidth: 560 }}>The pet industry is one of the fastest-growing sectors in the U.S. — and we&apos;re building businesses that lead with impact.</p>
              <div className="sn-grid-4m" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: <Home size={22} />, value: "90.5M+", label: "U.S. Households Own Pets" },
                  { icon: <TrendingUp size={22} />, value: "6.3%", label: "Projected Industry Growth" },
                  { icon: <DollarSign size={22} />, value: "$147B+", label: "U.S. Pet Industry Market Size" },
                  { icon: <PawPrint size={22} />, value: "High Demand", label: "Training, Rescue & Pet Services" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 14, padding: "22px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, color: GREEN }}>{s.icon}<b style={{ fontSize: 22, color: NAVY }}>{s.value}</b></div>
                    <small style={{ color: "#667085", fontSize: 13 }}>{s.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ background: "linear-gradient(135deg,#0b5b34,#06351f)", color: "#fff", borderRadius: 18, padding: 32, boxShadow: "0 18px 45px rgba(7,67,31,.25)" }}>
              <span style={{ color: "#ffd46f", fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>Member Lens</span>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: "14px 0 22px", color: "#eaf3ee" }}>
                We take a long-term view, focusing on disciplined growth, strong leadership, and systems built to scale.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Purpose-driven opportunities with measurable impact",
                  "Select participation with experienced leadership",
                  "Scalable models and operational discipline",
                  "Long-term value creation for select members and communities",
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 size={20} color="#ffd46f" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: "#eaf3ee" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="sn-section-pad" style={{ padding: "60px 0", background: "#fbf9f4", textAlign: "center" }}>
        <div className="sn-shell">
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 18px" }}>Review the operating record behind the opportunity.</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/reports" className="sn-btn" style={{ background: `linear-gradient(135deg,#0b5b34,#08431f)` }}>View Network Performance Reports <ArrowRight size={16} /></Link>
            <Link href="/invest-now" className="sn-btn sn-btn-outline">Select Tier</Link>
          </div>
        </div>
      </section>

      <SNFooter />

      <style jsx global>{`
        .sn-ldtt-opportunity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(189,142,40,.15), 0 0 0 2px rgba(189,142,40,.2) !important;
        }
        @media (max-width: 768px) {
          .sn-ldtt-opportunity-card { grid-template-columns: 1fr !important; text-align: center; padding: 28px 20px !important; }
          .sn-ldtt-opportunity-card img { margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}
