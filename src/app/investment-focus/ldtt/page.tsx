"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Phone, Clock, Heart, PawPrint, TrendingUp, ShieldCheck, EyeOff, BadgeCheck, Building2, Plus, Minus, ChevronDown, ChevronUp, Info } from "lucide-react";
import SNNav from "../../components/SNNav";
import SNFooter from "../../components/SNFooter";
import Reveal from "../../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

const FAQ_ITEMS = [
  { q: "Who is eligible to participate?", a: "Participation is open to qualified investors and strategic partners who share our mission of long-term value creation and impact in the pet industry." },
  { q: "What types of investment opportunities are available?", a: "Members gain access to carefully selected opportunities connected to Lorenzo's Dog Training Team and future growth initiatives within the expanding pet industry." },
  { q: "How is my information protected?", a: "All member information is protected with the highest standard of privacy and security protocols. We are confidential by design." },
  { q: "How does the participation process work?", a: "The process is straightforward: select your units, choose your role, review and sign the Participation Agreement, then complete payment via ACH or card. Your investor dashboard activates automatically once payment is confirmed." },
];

export default function LDTTOpportunityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDropExplanation, setShowDropExplanation] = useState(false);

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        className="sn-hero-home"
        style={{
          position: "relative",
          background: "linear-gradient(105deg, #fff 0%, #fff 45%, #f7f5ef 60%, #eef3ee 100%)",
          overflow: "hidden",
          padding: "60px 0 50px",
        }}
      >
        <Image
          className="sn-hero-dog"
          src="/assets/select-network/lorenzo-team.jpg"
          alt=""
          width={1400}
          height={900}
          priority
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
            opacity: 0.85,
          }}
        />
        <div
          className="sn-hero-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,.98) 42%, rgba(255,255,255,.7) 62%, rgba(255,255,255,.15) 100%)",
            zIndex: 1,
          }}
        />

        <div className="sn-shell sn-hero-inner" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ color: GOLD, fontSize: 11.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>
              Current Investment Focus — Lorenzo&apos;s Dog Training Team
            </div>
            <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 44, lineHeight: 1.12, margin: "0 0 20px", letterSpacing: "-.01em" }}>
              Your Opportunity to Invest in{" "}
              <span style={{ color: GREEN }}>Dog Training</span>,{" "}
              <span style={{ color: GREEN }}>Dog Rescue</span>, and the Future of the Pet Industry
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3d4a57", margin: "0 0 28px", maxWidth: 540 }}>
              Lorenzo&apos;s Dog Training Team is the first current investment focus inside The Select Network Member Group. This opportunity highlights a growing dog training brand connected to systems, expansion, service impact, and long-term business development.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link
                href="/invest-now"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: `linear-gradient(135deg, ${GREEN}, #064a28)`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "15px 26px",
                  fontWeight: 800,
                  fontSize: 12.5,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(7,89,51,.25)",
                }}
              >
                Invest Now <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#fff",
                  color: NAVY,
                  border: "1.5px solid #d4cdbf",
                  borderRadius: 6,
                  padding: "15px 26px",
                  fontWeight: 800,
                  fontSize: 12.5,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  textDecoration: "none",
                }}
              >
                <Phone size={15} /> Speak With Our Team
              </Link>
            </div>
          </div>

          <div className="sn-hero-logo-right" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <Image
              src="/assets/select-network/lorenzos-dog-training-team-logo.png"
              alt="Lorenzo's Dog Training Team"
              width={320}
              height={320}
              style={{ width: 260, height: "auto" }}
            />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: NAVY }}>Serious Training. Serious Results. ™</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          METRICS STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", borderTop: "1px solid #ece6da", borderBottom: "1px solid #ece6da" }}>
        <div className="sn-shell sn-metrics-strip" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, padding: "28px 40px" }}>
          {[
            { icon: <Clock size={24} color={GOLD} />, value: "21+", label: "Years of Dog Training Experience" },
            { icon: <Heart size={24} color={GOLD} />, value: "Hundreds", label: "of Dogs Trained" },
            { icon: <PawPrint size={24} color={GOLD} />, value: "Rescue, Rehabilitation,", label: " and Rehoming Mission" },
            { icon: <TrendingUp size={24} color={GOLD} />, value: "Built Around a", label: "Growing Pet Industry" },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "6px 20px",
                borderRight: i < 3 ? "1px solid #eee7d8" : "none",
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: "50%", border: `1.5px solid ${GOLD}`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                {m.icon}
              </div>
              <div>
                <b style={{ display: "block", fontSize: 17, color: NAVY, lineHeight: 1.2 }}>{m.value}</b>
                <small style={{ color: "#667085", fontSize: 12 }}>{m.label}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW VALUE IS CREATED
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "70px 0", background: "#fbf9f4", borderBottom: "1px solid #ece6da" }}>
        <div className="sn-shell">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ width: 40, height: 3, background: GOLD, margin: "0 auto 18px" }} />
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, margin: "0 0 10px" }}>How Value Is Created Through Lorenzo&apos;s Dog Training Team</h2>
              <p style={{ color: "#5b6675", fontSize: 14.5, maxWidth: 700, margin: "0 auto" }}>This opportunity is designed to support growth through proven systems, brand expansion, and operational excellence.</p>
            </div>
          </Reveal>
          <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { title: "Training Programs & Service Packages", desc: "Dog training programs and service packages designed to support revenue growth through proven client acquisition systems." },
              { title: "Rescue, Rehabilitation & Rehoming", desc: "Rescue, rehabilitation, and rehoming support initiatives that expand community impact and brand recognition." },
              { title: "System & Location Expansion", desc: "Expansion of training systems and locations positioned for sustainable market growth." },
              { title: "Brand Growth Through Proven Services", desc: "Brand growth through proven services, client testimonials, and operational track record." },
              { title: "Partnerships & Operational Structure", desc: "Partnerships, client acquisition, and operational structure intended to create long-term value." },
              { title: "Organized Growth Planning", desc: "Long-term value through organized systems, reporting, and growth planning based on available reports and company performance." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "24px 20px", height: "100%" }}>
                  <h3 style={{ fontSize: 16, margin: "0 0 8px", color: NAVY }}>{c.title}</h3>
                  <p style={{ color: "#5b6675", lineHeight: 1.65, margin: 0, fontSize: 13.5 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "#667085", fontSize: 12, marginTop: 24, fontStyle: "italic" }}>
            All statements are subject to member terms and official disclosures. Past performance does not guarantee future results.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY THE DROP HAPPENED + RECOVERY
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "70px 0", background: "#fff" }}>
        <div className="sn-shell" style={{ maxWidth: 900 }}>
          <Reveal>
            <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 16, padding: "32px 28px", marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setShowDropExplanation(!showDropExplanation)}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                  <Info size={22} color={GOLD} /> Why the Drop Happened
                </h2>
                {showDropExplanation ? <ChevronUp size={22} color={GOLD} /> : <ChevronDown size={22} color={GOLD} />}
              </div>
              {showDropExplanation && (
                <div style={{ marginTop: 18, animation: "fadeIn .3s ease" }}>
                  <p style={{ color: "#3d4a57", lineHeight: 1.8, fontSize: 14.5, margin: "0 0 16px" }}>
                    Lorenzo&apos;s Dog Training Team previously operated with a larger trainer network, reaching more than 100 trainers before major disruption affected the company&apos;s structure and operations. During the COVID period and the seasons that followed, the trainer count dropped to approximately 25 as the business adjusted to market changes, operational challenges, staffing shifts, and the need to rebuild with stronger systems.
                  </p>
                  <p style={{ color: "#5b6675", lineHeight: 1.7, fontSize: 13.5, margin: 0, fontStyle: "italic" }}>
                    This section helps investors understand that the drop represents a past disruption, not the final direction of the company.
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ background: "linear-gradient(135deg,#0b5b34,#06351f)", color: "#fff", borderRadius: 16, padding: "32px 28px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "0 0 16px", color: "#ffd46f" }}>Current Recovery and Growth Strategy</h2>
              <p style={{ lineHeight: 1.8, fontSize: 14.5, margin: 0, color: "#eaf3ee" }}>
                Lorenzo&apos;s Dog Training Team is currently on the path to outperform previous years through a renewed strategy, stronger branding, improved company systems, and the support of strategic investors. The focus is now on rebuilding with better structure, stronger operations, clearer reporting, and a growth plan designed to support long-term expansion.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          REVIEW INVESTMENT REPORTS LINK
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "50px 0", background: "#fbf9f4", borderTop: "1px solid #ece6da" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 12px" }}>Review Investment Reports</h2>
            <p style={{ color: "#5b6675", lineHeight: 1.7, maxWidth: 660, margin: "0 auto 24px", fontSize: 15 }}>
              Review available investment reports, business updates, financial summaries, tax documentation, and supporting materials connected to this current investment focus.
            </p>
            <Link
              href="/reports"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: `linear-gradient(135deg, ${GREEN}, #064a28)`,
                color: "#fff",
                borderRadius: 8,
                padding: "16px 28px",
                fontWeight: 800,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                textDecoration: "none",
                boxShadow: "0 6px 18px rgba(7,89,51,.25)",
              }}
            >
              View Investment Reports <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER SPOTLIGHT
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "60px 0", background: "#fff" }}>
        <div className="sn-shell">
          <Reveal>
            <div className="sn-founder-card" style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "26px 24px", boxShadow: "0 8px 24px rgba(5,20,45,.05)", display: "flex", gap: 24, alignItems: "flex-start", maxWidth: 700 }}>
              <Image
                src="/assets/select-network/IMG_9919.png"
                alt="Lorenzo Miller"
                width={340}
                height={470}
                style={{ width: 170, height: 235, borderRadius: 10, objectFit: "cover", objectPosition: "center 20%", flexShrink: 0, display: "block" }}
              />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 235 }}>
                <h3 style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400, fontSize: 42, lineHeight: 1, margin: "0 0 8px", color: "#b87522", whiteSpace: "nowrap" }}>Lorenzo Miller</h3>
                <span style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "#001b5d", display: "block", marginBottom: 10 }}>Founder &amp; CEO</span>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: "#4b5563", margin: "0 0 14px", fontStyle: "italic" }}>
                  &ldquo;At The Select Network Member Group, we believe wealth is more than numbers—it&apos;s impact, legacy, and freedom of choice. Our mission is to connect exceptional investors with exceptional opportunities.&rdquo;
                </p>
                <Link href="/about" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 18px", borderRadius: 8, background: "#005c2f", color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.8px", textTransform: "uppercase", textDecoration: "none" }}>
                  Learn More
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "50px 0", background: "#fbf9f4" }}>
        <div className="sn-shell" style={{ maxWidth: 700 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 24px", textAlign: "center" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid #eee7d8" }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, padding: "16px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: NAVY, lineHeight: 1.4 }}>{faq.q}</span>
                    {isOpen ? <Minus size={16} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} /> : <Plus size={16} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />}
                  </button>
                  {isOpen && (
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: "#5b6675", margin: "0 0 14px", paddingRight: 20 }}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST / PRIVACY / EXCELLENCE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "50px 0", background: "#fff" }}>
        <div className="sn-shell">
          <Reveal>
            <div style={{ marginBottom: 30 }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px", letterSpacing: ".02em" }}>Trust. Privacy. Excellence.</h2>
              <p style={{ color: "#8a7a52", fontFamily: "Georgia, serif", fontStyle: "italic", margin: 0, fontSize: 14.5 }}>Built for discerning investors who value impact and integrity.</p>
            </div>
          </Reveal>
          <div className="sn-grid-4m" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {[
              { icon: <BadgeCheck size={24} />, title: "Invitation-Only Membership", desc: "Access is reserved for qualified investors and strategic partners who share our mission." },
              { icon: <EyeOff size={24} />, title: "Confidential By Design", desc: "Your information and investments are protected with the highest standard of privacy." },
              { icon: <ShieldCheck size={24} />, title: "Vetted Opportunities", desc: "We conduct rigorous due diligence to ensure every opportunity meets our high standards." },
              { icon: <Building2 size={24} />, title: "Aligned for Long-Term Value", desc: "We focus on sustainable growth, meaningful impact, and generational value creation." },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", border: `1.5px solid ${GOLD}`, display: "grid", placeItems: "center", flexShrink: 0, color: GREEN }}>
                    {t.icon}
                  </div>
                  <div>
                    <b style={{ display: "block", fontSize: 14, color: NAVY, marginBottom: 5 }}>{t.title}</b>
                    <small style={{ color: "#5b6675", fontSize: 12.5, lineHeight: 1.55, display: "block" }}>{t.desc}</small>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SNFooter />
    </div>
  );
}
