"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Target, Sparkles, HandCoins, TrendingUp, Award, Users, Clock, Compass } from "lucide-react";
import SNNav from "../components/SNNav";
import SNBrandVideo from "../components/SNBrandVideo";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />
      <SNBrandVideo />

      {/* Hero */}
      <section className="sn-section-pad" style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "70px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>About The Select Network Member Group</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 auto", maxWidth: 820 }}>
            Invest With Purpose. <span style={{ color: GOLD }}>Back a Vision Built on Results.</span>
          </h1>
          <p style={{ color: "#c6d2e1", maxWidth: 680, margin: "20px auto 0", lineHeight: 1.7, fontSize: 16 }}>
            The Select Network Member Group is a private investor platform connecting qualified members to opportunities built on integrity, leadership, and long-term value.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "78px 0", background: "#fff" }}>
        <div className="sn-shell sn-split" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 40, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <Image src="/assets/select-network/lorenzo-team.jpg" alt="Lorenzo Miller and Team" width={760} height={620} style={{ width: "100%", height: "auto", borderRadius: 16, border: "1px solid #e7e2d8", boxShadow: "0 18px 45px rgba(5,20,45,.12)", objectFit: "cover" }} />
              <div style={{ marginTop: 16, background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 12, padding: "18px 20px" }}>
                <b style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, display: "block" }}>Lorenzo Miller</b>
                <span style={{ color: GOLD, fontSize: 13, fontWeight: 700 }}>Founder · Entrepreneur · Investor · Visionary</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, margin: "0 0 18px" }}>A Vision Built on a Decade of Results</h2>
              <p style={{ color: "#4b5563", lineHeight: 1.8, margin: "0 0 18px", fontSize: 15.5 }}>
                Over the last decade, Lorenzo Miller has generated more than <b style={{ color: NAVY }}>$60.5 million in revenue</b> by identifying opportunities, building scalable systems, and transforming vision into measurable results. What began as a passion for helping dogs and their owners evolved into a comprehensive ecosystem focused on leadership development, talent acquisition, operational excellence, strategic partnerships, and sustainable growth.
              </p>
              <div style={{ background: "#fbf9f4", borderLeft: `4px solid ${GOLD}`, borderRadius: "0 10px 10px 0", padding: "20px 24px", margin: "8px 0 4px" }}>
                <Quote size={26} color={GOLD} />
                <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.5, margin: "8px 0 0", color: NAVY }}>
                  Identify opportunity. Understand risk. Create value.
                </p>
              </div>
              <p style={{ color: "#667085", fontSize: 13.5, marginTop: 16, lineHeight: 1.7 }}>
                Lorenzo&apos;s Dog Training Team is the operating company whose historical business record demonstrates the proven track record connected to this opportunity. The Select Network Member Group is the private investor platform built around it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three content blocks */}
      <section style={{ padding: "20px 0 78px", background: "#fff" }}>
        <div className="sn-shell">
          <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {[
              { icon: <Target size={28} />, title: "Our Mission", desc: "To deliver financial return, build critical infrastructure, and create measurable impact across the pet industry and the communities we serve." },
              { icon: <Sparkles size={28} />, title: "What Makes This Different", desc: "A disciplined, purpose-driven approach backed by a proven operating record, experienced leadership, and systems built to scale responsibly." },
              { icon: <HandCoins size={28} />, title: "Why Investors Join", desc: "Qualified members gain private access to vetted opportunities, transparent reporting, and alignment focused on long-term value creation." },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 16, padding: 30, height: "100%" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 14, background: "#edf6ef", color: GREEN, display: "grid", placeItems: "center", marginBottom: 18 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 10px" }}>{b.title}</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ padding: "64px 0", background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff" }}>
        <div className="sn-shell">
          <div className="sn-grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}>
            {[
              { icon: <TrendingUp size={24} />, value: "$60.5M+", label: "Revenue Generated Over the Last Decade" },
              { icon: <Clock size={24} />, value: "10+ Years", label: "of Proven Entrepreneurial Success" },
              { icon: <Users size={24} />, value: "Hundreds", label: "of Trainers, Leaders & Partners Developed" },
              { icon: <Award size={24} />, value: "21+ Years", label: "Leadership & Training Experience" },
              { icon: <Compass size={24} />, value: "Built For", label: "Long-Term Growth" },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ textAlign: "center", padding: "10px 12px" }}>
                  <div style={{ width: 54, height: 54, borderRadius: "50%", border: "1px solid rgba(213,168,61,.5)", color: "#d5a83d", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>{m.icon}</div>
                  <b style={{ display: "block", fontSize: 22, marginBottom: 6 }}>{m.value}</b>
                  <small style={{ color: "#9fb1c7", fontSize: 12.5, lineHeight: 1.5, display: "block" }}>{m.label}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sn-section-pad" style={{ padding: "60px 0", background: "#fbf9f4", textAlign: "center" }}>
        <div className="sn-shell">
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 18px" }}>Ready to learn more?</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/join" className="sn-btn" style={{ background: `linear-gradient(135deg,#0b5b34,#08431f)` }}>Apply For Membership <ArrowRight size={16} /></Link>
            <Link href="/reports" className="sn-btn sn-btn-outline">View Investment Reports</Link>
          </div>
        </div>
      </section>

      <SNFooter />
    </div>
  );
}
