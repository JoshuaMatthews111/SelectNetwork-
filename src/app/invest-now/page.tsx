"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Shield, Lock, CreditCard, Info, Users, UserPlus, FileText, Building2 } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

const UNIT_PRICE = 100;
const STEPS = ["Your Information", "Unit Selection", "Role Selection", "Agreement", "Payment"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#f9f7f2",
  border: "1px solid #e2dccf",
  borderRadius: 9,
  padding: "13px 15px",
  fontSize: 14,
  outline: "none",
  color: NAVY,
  fontFamily: "inherit",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11.5, fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7 }}>{label}</label>
      {children}
    </div>
  );
}

export default function InvestNowPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [units, setUnits] = useState(50);
  const [role, setRole] = useState("");
  const [payMethod, setPayMethod] = useState<"ach" | "card">("ach");
  const [contractRead, setContractRead] = useState(false);
  const contractRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", cityState: "", heard: "",
  });
  const [ack, setAck] = useState({ terms: false, distributions: false });

  const subtotal = units * UNIT_PRICE;
  const fmt = (n: number) => `$${n.toLocaleString()}`;
  const isFoundationPartner = subtotal >= 10000;

  const infoValid = !!(form.name && form.email && form.phone && form.cityState);
  const roleValid = !!role;
  const agreementValid = contractRead && ack.terms && ack.distributions;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleContractScroll = () => {
    const el = contractRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) setContractRead(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/member-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest_amount: subtotal,
          notes: `City/State: ${form.cityState}\nHow they heard: ${form.heard}\nRole: ${role}\nUnits: ${units}\nPayment Method: ${payMethod}\nAgreement Accepted: ${new Date().toISOString()}\nFoundation Partner: ${isFoundationPartner}`
        })
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#0b5b34,#08431f)", color: "#fff", border: 0, borderRadius: 10, padding: "14px 26px", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer" };
  const btnGhost: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#475569", border: "1px solid #d8d2c6", borderRadius: 10, padding: "14px 22px", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer" };
  const dis: React.CSSProperties = { opacity: 0.4, cursor: "not-allowed" };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "64px 0 56px" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Select Member Enrollment</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 44, lineHeight: 1.12, margin: "0 auto", maxWidth: 720 }}>
            Complete Your Participation in The Select Network Member Group
          </h1>
          <p style={{ color: "#c6d2e1", maxWidth: 700, margin: "20px auto 0", lineHeight: 1.7, fontSize: 16 }}>
            The Select Network Member Group provides qualified members with access to private growth opportunities, structured reports, and member benefits. Select your units, choose your role, review the agreement, and submit your payment to unlock your member dashboard.
          </p>
          {step === 0 && !submitted && (
            <button onClick={() => document.getElementById("sn-flow")?.scrollIntoView({ behavior: "smooth" })} style={{ ...btnPrimary, marginTop: 28, background: "linear-gradient(135deg,#d1a645,#bc8b25)" }}>
              Get Started <ArrowRight size={16} />
            </button>
          )}
        </div>
      </section>

      {/* Flow */}
      <section id="sn-flow" style={{ padding: "50px 0 70px", background: "#fbf9f4", scrollMarginTop: 90 }}>
        <div className="sn-shell" style={{ maxWidth: 880 }}>
          {submitted ? (
            <Reveal>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                {/* Success header */}
                <div style={{ textAlign: "center", marginBottom: 30 }}>
                  <CheckCircle size={48} color={GREEN} style={{ margin: "0 auto 12px" }} />
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 8px" }}>Welcome to The Select Network Member Group!</h2>
                  <p style={{ color: "#5b6675", fontSize: 14, margin: 0 }}>Your account has been activated. Here is your membership stake certificate.</p>
                </div>

                {/* ─── CERTIFICATE ─── */}
                <div style={{ background: "#fff", border: "3px solid #bd8e28", borderRadius: 16, padding: "44px 48px", maxWidth: 820, margin: "0 auto 32px", boxShadow: "0 20px 60px rgba(5,20,45,.12)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 14, left: 14, width: 56, height: 56, borderTop: "3px solid #d5a83d", borderLeft: "3px solid #d5a83d", borderRadius: "4px 0 0 0" }} />
                  <div style={{ position: "absolute", top: 14, right: 14, width: 56, height: 56, borderTop: "3px solid #d5a83d", borderRight: "3px solid #d5a83d", borderRadius: "0 4px 0 0" }} />
                  <div style={{ position: "absolute", bottom: 14, left: 14, width: 56, height: 56, borderBottom: "3px solid #d5a83d", borderLeft: "3px solid #d5a83d", borderRadius: "0 0 0 4px" }} />
                  <div style={{ position: "absolute", bottom: 14, right: 14, width: 56, height: 56, borderBottom: "3px solid #d5a83d", borderRight: "3px solid #d5a83d", borderRadius: "0 0 4px 0" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase", color: "#bd8e28", marginBottom: 6 }}>Membership Stake Certificate</div>
                    <div style={{ width: 70, height: 2, background: "linear-gradient(90deg,transparent,#d5a83d,transparent)", margin: "0 auto 16px" }} />
                    <p style={{ fontSize: 13, color: "#667085", margin: "0 0 8px" }}>This certifies that</p>
                    <h1 style={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 400, color: NAVY, margin: "0 0 8px", borderBottom: "2px solid #e7e2d8", display: "inline-block", padding: "0 24px 6px" }}>{form.name || "Member"}</h1>
                    <p style={{ fontSize: 13, color: "#667085", margin: "12px 0 6px" }}>has successfully secured a membership stake in</p>
                    <div style={{ fontSize: 44, fontWeight: 900, color: GREEN, margin: "6px 0" }}>{units} Units</div>
                    <p style={{ fontSize: 16, color: NAVY, margin: "4px 0 20px" }}>valued at <b style={{ color: GOLD }}>{fmt(subtotal)}</b></p>
                    <div style={{ width: 50, height: 2, background: "linear-gradient(90deg,transparent,#d5a83d,transparent)", margin: "0 auto 16px" }} />
                    <p style={{ fontSize: 12, color: "#667085", margin: "0 0 4px" }}>through The Select Network Member Group membership stake structure</p>
                    <p style={{ fontSize: 11, color: "#9aa0ab", margin: "0 0 20px" }}>Issued: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                    {isFoundationPartner && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", borderRadius: 99, padding: "6px 16px", fontSize: 11, fontWeight: 900, marginBottom: 14 }}>
                        <Building2 size={14} /> Foundation Partner
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 20, paddingTop: 16, borderTop: "1px solid #eef2f6" }}>
                      <div style={{ textAlign: "left" }}><div style={{ width: 120, borderBottom: "1px solid #071a33", marginBottom: 3 }} /><div style={{ fontSize: 10, color: "#667085" }}>Authorized Signature</div></div>
                      <div style={{ textAlign: "center" }}><div style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #bd8e28", display: "grid", placeItems: "center", margin: "0 auto 3px" }}><Shield size={18} color={GOLD} /></div><div style={{ fontSize: 8, color: GOLD, fontWeight: 900, letterSpacing: ".1em" }}>VERIFIED</div></div>
                      <div style={{ textAlign: "right" }}><div style={{ width: 120, borderBottom: "1px solid #071a33", marginBottom: 3 }} /><div style={{ fontSize: 10, color: "#667085" }}>Date of Issue</div></div>
                    </div>
                  </div>
                </div>

                {/* Print button */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                  <button onClick={() => { if (typeof window !== "undefined") window.print(); }} style={{ ...btnGhost, fontSize: 12 }}>Print / Save Certificate as PDF</button>
                </div>

                {/* ─── YOUR BACK OFFICE DATA ─── */}
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: "28px 30px", marginBottom: 28, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 16px" }}>Your Back Office Summary</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                    {[
                      { label: "Units Owned", value: `${units}`, sub: "Units" },
                      { label: "Capital Commitment", value: fmt(subtotal), sub: "Total capital commitment" },
                      { label: "Role", value: role || "Select Member", sub: "Your participation" },
                    ].map((d, i) => (
                      <div key={i} style={{ background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>{d.label}</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: NAVY }}>{d.value}</div>
                        <div style={{ fontSize: 11, color: "#9aa0ab", marginTop: 2 }}>{d.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─── TUTORIAL: HOW TO USE YOUR DASHBOARD ─── */}
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 6px", textAlign: "center" }}>How to Use Your Dashboard</h3>
                  <p style={{ textAlign: "center", color: "#667085", fontSize: 13, margin: "0 0 20px" }}>Your member dashboard gives you everything you need. Here&apos;s a quick guide:</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                    {[
                      { title: "Overview", desc: "See your total capital committed, current value, units owned, and quarterly distributions at a glance.", highlight: true },
                      { title: "Units", desc: "Track your unit allocation, purchase history, and current unit value over time.", highlight: true },
                      { title: "Reports & Documents", desc: "Access quarterly financial reports, official documents, and download PDFs.", highlight: false },
                      { title: "Payouts", desc: "Request earnings payouts from your available balance. Track pending and completed requests.", highlight: false },
                      { title: "Announcements", desc: "Stay updated with official announcements from The Select Network Member Group team.", highlight: false },
                      { title: "Support / Chat", desc: "Contact our support team directly. Create tickets and get responses in your dashboard.", highlight: false },
                      { title: "Certificates", desc: "View, generate, and download your membership stake certificates at any time.", highlight: true },
                      { title: "Milestones", desc: "Track your achievement progress — from first capital commitment to referral goals.", highlight: false },
                    ].map((t, i) => (
                      <div key={i} style={{ background: t.highlight ? "linear-gradient(135deg,#071a33,#0d3366)" : "#fff", color: t.highlight ? "#fff" : NAVY, border: t.highlight ? "2px solid #bd8e28" : "1px solid #e7e2d8", borderRadius: 14, padding: "20px 18px", boxShadow: t.highlight ? "0 10px 30px rgba(5,20,45,.15)" : "0 4px 12px rgba(5,20,45,.04)" }}>
                        <b style={{ fontSize: 14, display: "block", marginBottom: 6 }}>{t.title}</b>
                        <p style={{ fontSize: 12.5, margin: 0, lineHeight: 1.6, color: t.highlight ? "#c6d2e1" : "#667085" }}>{t.desc}</p>
                        {t.highlight && <div style={{ marginTop: 8, fontSize: 10, fontWeight: 900, color: "#ffd46f", textTransform: "uppercase", letterSpacing: ".06em" }}>★ Key Feature</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href={role === "Select Member-Builder" ? "/builder" : "/investor"} style={{ ...btnPrimary, padding: "16px 32px", fontSize: 14 }}>Enter Your Dashboard <ArrowRight size={16} /></Link>
                  <Link href="/contact" style={btnGhost}>Speak With Our Team</Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <>
              {/* Step indicator */}
              <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 34, flexWrap: "wrap" }}>
                {STEPS.map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 13, background: i <= step ? "linear-gradient(135deg,#075933,#0b7346)" : "#eae4d8", color: i <= step ? "#fff" : "#9aa0ab", transition: ".3s" }}>{i < step ? <CheckCircle size={18} /> : i + 1}</div>
                      <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: i <= step ? NAVY : "#9aa0ab", whiteSpace: "nowrap" }}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div style={{ width: 32, height: 2, background: i < step ? GREEN : "#eae4d8", margin: "0 4px 18px" }} className="sn-step-line" />}
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 18, padding: "34px 32px", boxShadow: "0 14px 40px rgba(5,20,45,.07)" }}>

                {/* ── STEP 1: Your Information ── */}
                {step === 0 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Your Information</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 24px" }}>Tell us about yourself to get started.</p>
                    <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <Field label="Full Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={inputStyle} /></Field>
                      <Field label="Email Address"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" style={inputStyle} /></Field>
                      <Field label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 000-0000" style={inputStyle} /></Field>
                      <Field label="City / State"><input value={form.cityState} onChange={(e) => setForm({ ...form, cityState: e.target.value })} placeholder="City, State" style={inputStyle} /></Field>
                      <Field label="How did you hear about The Select Network Member Group?"><input value={form.heard} onChange={(e) => setForm({ ...form, heard: e.target.value })} placeholder="Referral, event, online..." style={inputStyle} /></Field>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                      <button onClick={next} disabled={!infoValid} style={{ ...btnPrimary, ...(infoValid ? {} : dis) }}>Continue <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Unit Selection ── */}
                {step === 1 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Unit Selection</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 10px" }}>Select the number of units to participate with. Each unit is <b>${UNIT_PRICE}</b>.</p>

                    <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 12, padding: "18px 22px", marginBottom: 24, display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <Info size={20} color="#ffd46f" style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{ margin: 0, color: "#c6d2e1", fontSize: 13, lineHeight: 1.7 }}>
                        <b style={{ color: "#ffd46f" }}>What is a Unit?</b> A Unit is a proportional participation allocation within The Select Network Member Group membership stake structure, used to determine a select member&apos;s share of designated company distributions and growth-based revenue participation.
                      </p>
                    </div>

                    <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
                      {[{ u: 10, popular: false }, { u: 50, popular: true }, { u: 100, popular: false }].map((p) => (
                        <div key={p.u} onClick={() => setUnits(p.u)} style={{ position: "relative", border: units === p.u ? `2px solid ${GOLD}` : "1px solid #e7e2d8", background: units === p.u ? "linear-gradient(135deg,#071a33,#0d3366)" : "#fbf9f4", color: units === p.u ? "#fff" : NAVY, borderRadius: 14, padding: "28px 18px", textAlign: "center", cursor: "pointer", transition: ".25s" }}>
                          {p.popular && <span style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${GOLD},#a07520)`, color: "#fff", fontSize: 9, fontWeight: 900, padding: "3px 12px", borderRadius: 99, textTransform: "uppercase", letterSpacing: ".06em" }}>Most Popular</span>}
                          <div style={{ fontSize: 38, fontWeight: 800 }}>{p.u}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", opacity: .7 }}>Units</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: units === p.u ? "#ffd46f" : GREEN, marginTop: 8 }}>{fmt(p.u * UNIT_PRICE)}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em" }}>Selected</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: NAVY }}>{units} Units</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em" }}>Total</div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: NAVY }}>{fmt(subtotal)}</div>
                      </div>
                    </div>

                    {isFoundationPartner && (
                      <div style={{ display: "flex", gap: 12, alignItems: "center", background: "linear-gradient(135deg,#d1a645,#bc8b25)", borderRadius: 12, padding: "14px 18px", marginBottom: 14 }}>
                        <Building2 size={20} color="#fff" style={{ flexShrink: 0 }} />
                        <p style={{ margin: 0, fontSize: 13, color: "#fff", lineHeight: 1.6, fontWeight: 700 }}>
                          Foundation Partner — Your capital commitment level of {fmt(subtotal)} qualifies you for Foundation Partner recognition within The Select Network Member Group.
                        </p>
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={next} style={btnPrimary}>Continue <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Role Selection ── */}
                {step === 2 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Select Your Role</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 24px" }}>Choose how you&apos;d like to participate in The Select Network Member Group.</p>

                    <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                      {[
                        {
                          key: "Select Member",
                          icon: <Users size={32} />,
                          desc: "Acquire Units — proportional participation allocations that determine your share of designated company distributions and growth-based revenue participation. Receive quarterly distributions and access exclusive member reports. No referral activity required.",
                        },
                        {
                          key: "Select Member-Builder",
                          icon: <UserPlus size={32} />,
                          desc: "Combine membership stake participation with network-building activity. Access all select member benefits plus the referral network, builder tools, and referral tracking. Eligible Select Member-Builders may qualify for referral or marketing incentives according to official program terms.",
                        },
                      ].map((r) => (
                        <div key={r.key} onClick={() => setRole(r.key)} style={{ border: role === r.key ? `2px solid ${GREEN}` : "1px solid #e7e2d8", background: role === r.key ? "#edf6ef" : "#fff", borderRadius: 14, padding: "24px 20px", cursor: "pointer", transition: ".25s" }}>
                          <div style={{ color: role === r.key ? GREEN : GOLD, marginBottom: 12 }}>{r.icon}</div>
                          <b style={{ fontSize: 16, color: role === r.key ? GREEN : NAVY, display: "block", marginBottom: 8 }}>{r.key}</b>
                          <p style={{ fontSize: 13, color: "#5b6675", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#fffaf0", border: "1px solid #e7d9b6", borderLeft: `4px solid ${GOLD}`, borderRadius: "0 12px 12px 0", padding: "14px 18px" }}>
                      <Info size={18} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{ margin: 0, color: "#604b17", fontSize: 12.5, lineHeight: 1.7 }}>
                        Incentives, benefits, and participation opportunities are subject to eligibility, available program terms, and all applicable requirements. The Select Network Member Group may update or modify participation terms at any time.
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={next} disabled={!roleValid} style={{ ...btnPrimary, ...(roleValid ? {} : dis) }}>Continue <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Agreement ── */}
                {step === 3 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Participation Agreement</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 16px" }}>Read the full agreement below before checking the acknowledgment boxes.</p>

                    {/* Contract scroll box */}
                    <div
                      ref={contractRef}
                      onScroll={handleContractScroll}
                      style={{ height: 300, overflowY: "auto", background: "#f9f7f2", border: `2px solid ${contractRead ? GREEN : "#e2dccf"}`, borderRadius: 12, padding: "20px 22px", marginBottom: 14, fontSize: 13, lineHeight: 1.85, color: "#3d4a57", transition: "border-color .3s" }}
                    >
                      <b style={{ fontSize: 15, color: NAVY, display: "block", marginBottom: 12 }}>The Select Network Member Group — Participation Agreement</b>
                      <p>This Participation Agreement (&quot;Agreement&quot;) is entered into between the participating member (&quot;Member&quot;) and The Select Network Member Group (&quot;The Select Network Member Group&quot;). By completing this enrollment and submitting payment, the Member agrees to all terms below.</p>
                      <p><b>1. Unit Participation.</b> Each Unit represents a proportional participation allocation within The Select Network Member Group membership stake structure, used to determine the Member&apos;s share of designated company distributions and growth-based revenue participation. Units are priced at $100 each.</p>
                      <p><b>2. Distributions.</b> Approved participants may receive participation yield distributions quarterly when profits are available and posted through The Select Network Member Group reporting system. Distributions are not guaranteed. Initial capital commitments are not treated as available earnings. Members may request payouts only from available profit balances, subject to approval and official member terms.</p>
                      <p><b>3. Roles.</b> Members may participate as a Select Member or Select Member-Builder. Select Member accounts receive quarterly distribution access and member reports. Select Member-Builder accounts additionally receive access to the referral network, builder tools, and referral tracking. Role capabilities are subject to program requirements.</p>
                      <p><b>4. Foundation Partner.</b> Members with a capital commitment of $10,000 or more are recognized as Foundation Partners within The Select Network Member Group. This recognition is based solely on capital commitment level and is not limited by membership count.</p>
                      <p><b>5. Incentives.</b> Eligible Select Member-Builders may qualify for referral or marketing incentives according to official program terms. Incentives are not guaranteed and are subject to eligibility, compliance, and program requirements.</p>
                      <p><b>6. Payment &amp; Activation.</b> Dashboard access is activated automatically upon confirmed payment. There is no manual review or approval process after payment is confirmed.</p>
                      <p><b>7. No Guarantees.</b> The Select Network Member Group does not guarantee returns, distributions, profits, or any specific financial outcome. Past performance of associated businesses does not guarantee future results.</p>
                      <p><b>8. Member Records.</b> The Member&apos;s name, email, unit selection, role, agreement acceptance date/time, and payment status will be stored securely as part of the official participation record.</p>
                      <p><b>9. Modifications.</b> The Select Network Member Group reserves the right to update or modify program terms, incentives, and participation structures at any time with notice to members.</p>
                      <p style={{ marginBottom: 0 }}><b>10. Governing Agreement.</b> This Agreement represents the complete understanding between the Member and The Select Network Member Group with respect to participation and supersedes any prior representations, whether oral or written.</p>
                    </div>

                    {!contractRead && (
                      <div style={{ display: "flex", gap: 10, alignItems: "center", background: "#fffaf0", border: "1px solid #e7d9b6", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
                        <Info size={16} color={GOLD} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, color: "#604b17" }}>Please scroll to the bottom of the agreement to enable the acknowledgment boxes.</span>
                      </div>
                    )}

                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, cursor: contractRead ? "pointer" : "not-allowed", opacity: contractRead ? 1 : 0.45 }}>
                      <input type="checkbox" checked={ack.terms} disabled={!contractRead} onChange={(e) => setAck({ ...ack, terms: e.target.checked })} style={{ marginTop: 3 }} />
                      <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>I have read the full Participation Agreement and agree to its terms on behalf of myself as a participant in The Select Network Member Group.</span>
                    </label>
                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: contractRead ? "pointer" : "not-allowed", opacity: contractRead ? 1 : 0.45, marginBottom: 20 }}>
                      <input type="checkbox" checked={ack.distributions} disabled={!contractRead} onChange={(e) => setAck({ ...ack, distributions: e.target.checked })} style={{ marginTop: 3 }} />
                      <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>I acknowledge that distributions, benefits, and incentives are not guaranteed, and that no returns or specific financial outcomes are promised by The Select Network Member Group.</span>
                    </label>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={next} disabled={!agreementValid} style={{ ...btnPrimary, ...(agreementValid ? {} : dis) }}>Continue to Payment <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* ── STEP 5: Payment ── */}
                {step === 4 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Submit Your Payment</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 20px" }}>Review your selection and complete your payment to activate your member dashboard.</p>

                    {/* Summary */}
                    <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "20px 22px", marginBottom: 16 }}>
                      <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".05em", color: "#667085", margin: "0 0 12px" }}>Participation Summary</h3>
                      {[
                        ["Name", form.name],
                        ["Email", form.email],
                        ["Units", `${units} units (${fmt(subtotal)})`],
                        ["Role", role],
                        ...(isFoundationPartner ? [["Recognition", "Foundation Partner"]] : []),
                        ["Agreement", "Signed — " + new Date().toLocaleDateString()],
                      ].map(([l, v]) => (
                        <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #eef2f6", fontSize: 14 }}>
                          <span style={{ color: "#667085" }}>{l}</span>
                          <b style={{ color: l === "Recognition" ? "#a07520" : NAVY }}>{v}</b>
                        </div>
                      ))}
                    </div>

                    {/* Payment Method Toggle */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 800, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 10 }}>Payment Method</div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {[
                          { id: "ach" as const, label: "ACH Bank Transfer", sub: "via Authorize.net" },
                          { id: "card" as const, label: "Credit / Debit Card", sub: "via Authorize.net" },
                        ].map((m) => (
                          <div key={m.id} onClick={() => setPayMethod(m.id)} style={{ flex: 1, minWidth: 160, border: payMethod === m.id ? `2px solid ${GREEN}` : "1px solid #e7e2d8", background: payMethod === m.id ? "#edf6ef" : "#fff", borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: ".2s" }}>
                            <b style={{ fontSize: 14, color: payMethod === m.id ? GREEN : NAVY, display: "block" }}>{m.label}</b>
                            <span style={{ fontSize: 11.5, color: "#667085" }}>{m.sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ACH Fields */}
                    {payMethod === "ach" && (
                      <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, background: "#e8f4ed", borderRadius: 8, padding: "10px 14px" }}>
                          <FileText size={16} color={GREEN} />
                          <span style={{ fontSize: 12.5, color: GREEN, fontWeight: 700 }}>ACH Bank Transfer — Powered by Authorize.net (placeholder — credentials to be connected)</span>
                        </div>
                        <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                          <Field label="Account Holder Name"><input placeholder="Name on account" style={inputStyle} disabled /></Field>
                          <Field label="Bank Name"><input placeholder="Your bank name" style={inputStyle} disabled /></Field>
                          <Field label="Routing Number"><input placeholder="9-digit routing number" style={inputStyle} disabled /></Field>
                          <Field label="Account Number"><input placeholder="Account number" style={inputStyle} disabled /></Field>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #e7e2d8", marginTop: 4 }}>
                          <span style={{ fontSize: 12.5, color: "#667085", display: "inline-flex", alignItems: "center", gap: 6 }}><Lock size={13} /> Encrypted &amp; Secure</span>
                          <b style={{ fontSize: 20 }}>{fmt(subtotal)}</b>
                        </div>
                      </div>
                    )}

                    {/* Card Fields */}
                    {payMethod === "card" && (
                      <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, background: "#e8f4ed", borderRadius: 8, padding: "10px 14px" }}>
                          <CreditCard size={16} color={GREEN} />
                          <span style={{ fontSize: 12.5, color: GREEN, fontWeight: 700 }}>Credit / Debit Card — Powered by Authorize.net (placeholder — credentials to be connected)</span>
                        </div>
                        <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                          <Field label="Cardholder Name"><input placeholder="Name on card" style={inputStyle} disabled /></Field>
                          <Field label="Card Number"><input placeholder="•••• •••• •••• ••••" style={inputStyle} disabled /></Field>
                          <Field label="Expiry"><input placeholder="MM / YY" style={inputStyle} disabled /></Field>
                          <Field label="CVC"><input placeholder="•••" style={inputStyle} disabled /></Field>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #e7e2d8", marginTop: 4 }}>
                          <span style={{ fontSize: 12.5, color: "#667085", display: "inline-flex", alignItems: "center", gap: 6 }}><Lock size={13} /> Encrypted &amp; Secure</span>
                          <b style={{ fontSize: 20 }}>{fmt(subtotal)}</b>
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 10, alignItems: "center", background: "#f0f7ff", border: "1px solid #c7ddf5", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                      <Info size={16} color="#1e40af" style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, fontSize: 12.5, color: "#1e40af", lineHeight: 1.5 }}>
                        Payment processing via Authorize.net is currently in placeholder mode. No charges will be made until the processor is fully connected.
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={handleSubmit} disabled={submitting} style={{ ...btnPrimary, background: "linear-gradient(135deg,#d1a645,#bc8b25)", ...(submitting ? dis : {}) }}>
                        {submitting ? "Processing..." : <><CreditCard size={16} /> Submit Payment — {fmt(subtotal)}</>}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </>
          )}
        </div>
      </section>

      {/* Distribution explainer */}
      <section style={{ padding: "10px 0 70px", background: "#fbf9f4" }}>
        <div className="sn-shell" style={{ maxWidth: 860 }}>
          <Reveal>
            <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: "32px 28px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "0 0 16px" }}>How Quarterly Distributions Work</h2>
              <p style={{ color: "#3d4a57", lineHeight: 1.8, fontSize: 14.5, margin: "0 0 16px" }}>
                Each Unit represents a proportional participation allocation used to determine a select member&apos;s share of designated company distributions and growth-based revenue participation. Approved participants may receive participation yield distributions quarterly when profits are available and posted through The Select Network Member Group reporting system. Initial capital commitments are not treated as available earnings. Members may request payouts only from available profit balances, subject to approval and official member terms.
              </p>
              <p style={{ color: "#667085", fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>
                Full report access, quarterly updates, and member-only documents will be available inside the member dashboard after participation is completed.
              </p>
              <Link href="/comp-plan" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: GOLD, fontWeight: 700, fontSize: 13, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}>
                Learn More About How This Works <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SNFooter />

      <style jsx global>{`
        @media (max-width: 640px) {
          .sn-step-line { width: 14px !important; }
        }
      `}</style>
    </div>
  );
}
