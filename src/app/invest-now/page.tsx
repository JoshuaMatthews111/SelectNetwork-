"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Star, Shield, Lock, CreditCard, Info, Users, Briefcase, UserPlus } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

const UNIT_PRICE = 100;
const STEPS = ["Application", "Unit Selection", "Benefits & Role", "Agreement & Payment"];

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
  const [units, setUnits] = useState(50);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", cityState: "", heard: "", statement: "", agree: false,
  });
  const [ack, setAck] = useState({ approval: false, terms: false });

  const subtotal = units * UNIT_PRICE;
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const applicationValid = form.name && form.email && form.phone && form.cityState && form.agree;
  const benefitsValid = !!role;
  const agreementValid = ack.approval && ack.terms;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#0b5b34,#08431f)", color: "#fff", border: 0, borderRadius: 10, padding: "14px 26px", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer" };
  const btnGhost: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#475569", border: "1px solid #d8d2c6", borderRadius: 10, padding: "14px 22px", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer" };
  const disabled: React.CSSProperties = { opacity: 0.45, cursor: "not-allowed" };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "64px 0 56px" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Private Investment Application</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 44, lineHeight: 1.12, margin: "0 auto", maxWidth: 720 }}>
            Apply to Join Select Network
          </h1>
          <p style={{ color: "#c6d2e1", maxWidth: 700, margin: "20px auto 0", lineHeight: 1.7, fontSize: 16 }}>
            Select Network provides qualified members with access to private growth opportunities, structured reports, and member benefits connected to the expansion of our investment network.
          </p>
          {step === 0 && !submitted && (
            <button onClick={() => document.getElementById("sn-flow")?.scrollIntoView({ behavior: "smooth" })} style={{ ...btnPrimary, marginTop: 28, background: "linear-gradient(135deg,#d1a645,#bc8b25)" }}>
              Start Application <ArrowRight size={16} />
            </button>
          )}
        </div>
      </section>

      {/* Flow */}
      <section id="sn-flow" style={{ padding: "50px 0 70px", background: "#fbf9f4", scrollMarginTop: 90 }}>
        <div className="sn-shell" style={{ maxWidth: 860 }}>
          {submitted ? (
            <Reveal>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 18, padding: "48px 32px", textAlign: "center", boxShadow: "0 14px 40px rgba(5,20,45,.07)" }}>
                <CheckCircle size={56} color={GREEN} style={{ margin: "0 auto 18px" }} />
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, margin: "0 0 12px" }}>Application Submitted</h2>
                <p style={{ color: "#5b6675", fontSize: 15, lineHeight: 1.7, margin: "0 auto 8px", maxWidth: 560 }}>
                  Thank you, {form.name || "applicant"}. Your application and unit selection of <b>{units} units ({fmt(subtotal)})</b> has been received and is <b>subject to approval</b>.
                </p>
                <p style={{ color: "#667085", fontSize: 13.5, lineHeight: 1.7, margin: "0 auto 24px", maxWidth: 560 }}>
                  After approval and payment confirmation, you&apos;ll complete onboarding inside your member back office — including selecting your participation role (Investor, Builder, or Investor + Builder).
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/login" style={btnPrimary}>Go to Member Portal</Link>
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
                      <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: i <= step ? NAVY : "#9aa0ab" }}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div style={{ width: 40, height: 2, background: i < step ? GREEN : "#eae4d8", margin: "0 6px 18px" }} className="sn-step-line" />}
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 18, padding: "34px 32px", boxShadow: "0 14px 40px rgba(5,20,45,.07)" }}>
                {/* STEP 1 — Application */}
                {step === 0 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Application</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 24px" }}>Tell us about yourself. All applications are reviewed before approval.</p>
                    <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <Field label="Full Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={inputStyle} /></Field>
                      <Field label="Email Address"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" style={inputStyle} /></Field>
                      <Field label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 000-0000" style={inputStyle} /></Field>
                      <Field label="City / State"><input value={form.cityState} onChange={(e) => setForm({ ...form, cityState: e.target.value })} placeholder="City, State" style={inputStyle} /></Field>
                      <Field label="How did you hear about Select Network?"><input value={form.heard} onChange={(e) => setForm({ ...form, heard: e.target.value })} placeholder="Referral, event, online..." style={inputStyle} /></Field>
                    </div>
                    <Field label="Short Statement of Interest"><textarea value={form.statement} onChange={(e) => setForm({ ...form, statement: e.target.value })} rows={3} placeholder="Briefly share why you're interested in Select Network." style={{ ...inputStyle, resize: "vertical" }} /></Field>
                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 8, cursor: "pointer" }}>
                      <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} style={{ marginTop: 3 }} />
                      <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>I understand this is an application for review and that submitting it does not guarantee acceptance. I have read the disclaimer below.</span>
                    </label>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                      <button onClick={next} disabled={!applicationValid} style={{ ...btnPrimary, ...(applicationValid ? {} : disabled) }}>Continue <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Unit Selection (10, 50, or 100 only) */}
                {step === 1 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Unit Selection</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 24px" }}>Select the number of units you&apos;d like to apply for. Each unit is <b>${UNIT_PRICE}</b>.</p>

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

                    <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em" }}>Selected</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: NAVY }}>{units} Units</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em" }}>Estimated Total</div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: NAVY }}>{fmt(subtotal)}</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 16, borderLeft: `4px solid ${GOLD}`, background: "#fffaf0", color: "#604b17", padding: "12px 16px", fontSize: 12.5, borderRadius: "0 6px 6px 0", lineHeight: 1.6 }}>
                      All unit selections are <b>subject to approval</b>. Payment does not guarantee acceptance. Final unit availability and pricing are confirmed by Select Network during review.
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={next} style={btnPrimary}>Continue <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Benefits, Incentives & Participation Type */}
                {step === 2 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Benefits, Incentives & Participation Type</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 24px" }}>Learn about member benefits and select how you&apos;d like to participate.</p>

                    <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 14, padding: "26px 26px", color: "#fff", marginBottom: 16, display: "flex", gap: 18, alignItems: "flex-start" }}>
                      <Star size={34} color="#ffd46f" style={{ flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: 18, margin: "0 0 8px", color: "#ffd46f" }}>First 125 Approved Participants</h3>
                        <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, color: "#c6d2e1" }}>
                          Early qualified participants may receive access to special member benefits connected to the first 125 approved participants. These benefits may include priority access to upcoming private opportunities, enhanced member visibility, exclusive reports, and additional participation incentives subject to Select Network approval and program requirements.
                        </p>
                      </div>
                    </div>

                    <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "22px 24px", marginBottom: 16, display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <Shield size={28} color={GREEN} style={{ flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: 16, margin: "0 0 6px" }}>$1,000 Sharing Incentive</h3>
                        <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, color: "#3d4a57" }}>
                          Qualified members may have the opportunity to earn a <b>$1,000 incentive</b> when sharing the Select Network model with others, subject to eligibility, approval, compliance, and program requirements. This incentive is available to Builder and Investor + Builder participants.
                        </p>
                      </div>
                    </div>

                    {/* Participation Type Selection */}
                    <h3 style={{ fontSize: 17, margin: "24px 0 12px", fontFamily: "Georgia, serif", fontWeight: 400 }}>Will you be participating as an Investor, Builder, or Both?</h3>
                    <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
                      {[
                        { key: "Investor", icon: <Users size={28} />, desc: "Invest in units, receive quarterly profit distributions, and access exclusive reports. No referral activity required." },
                        { key: "Builder", icon: <Briefcase size={28} />, desc: "Grow the network by referring new members. Earn sharing incentives and builder bonuses. Personal downline capped at 40 members." },
                        { key: "Investor + Builder", icon: <UserPlus size={28} />, desc: "Combine investment returns with network-building rewards. Full access to all benefits: distributions, referrals, incentives, and builder tools." },
                      ].map((r) => (
                        <div key={r.key} onClick={() => setRole(r.key)} style={{ border: role === r.key ? `2px solid ${GREEN}` : "1px solid #e7e2d8", background: role === r.key ? "#edf6ef" : "#fff", borderRadius: 14, padding: "22px 18px", cursor: "pointer", transition: ".25s", textAlign: "center" }}>
                          <div style={{ color: role === r.key ? GREEN : "#bd8e28", marginBottom: 10 }}>{r.icon}</div>
                          <b style={{ fontSize: 14, color: role === r.key ? GREEN : NAVY }}>{r.key}</b>
                          <p style={{ fontSize: 12, color: "#5b6675", lineHeight: 1.5, margin: "8px 0 0" }}>{r.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#fff", border: "1px solid #e7d9b6", borderLeft: `4px solid ${GOLD}`, borderRadius: "0 12px 12px 0", padding: "16px 18px" }}>
                      <Info size={20} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{ margin: 0, color: "#604b17", fontSize: 12.5, lineHeight: 1.7 }}>
                        Incentives, benefits, and participation opportunities are subject to approval, eligibility, available program terms, and all applicable requirements. Select Network may update or modify participation terms at any time. This page does not guarantee returns, distributions, acceptance, or incentive approval.
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={next} disabled={!benefitsValid} style={{ ...btnPrimary, ...(benefitsValid ? {} : disabled) }}>Continue <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}

                {/* STEP 4 — Agreement & Payment */}
                {step === 3 && (
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Agreement & Payment</h2>
                    <p style={{ color: "#5b6675", fontSize: 14, margin: "0 0 20px" }}>Review your selection and complete your application submission.</p>

                    {/* Summary */}
                    <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "20px 22px", marginBottom: 16 }}>
                      <h3 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".05em", color: "#667085", margin: "0 0 14px" }}>Application Summary</h3>
                      {[["Name", form.name], ["Email", form.email], ["Phone", form.phone], ["City / State", form.cityState], ["Units", `${units} units (${fmt(subtotal)})`], ["Participation Type", role]].map(([l, v]) => (
                        <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #eef2f6", fontSize: 14 }}><span style={{ color: "#667085" }}>{l}</span><b>{v}</b></div>
                      ))}
                    </div>

                    {/* Acknowledgements */}
                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, cursor: "pointer" }}>
                      <input type="checkbox" checked={ack.approval} onChange={(e) => setAck({ ...ack, approval: e.target.checked })} style={{ marginTop: 3 }} />
                      <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>I understand my application and unit selection are subject to approval, and that payment does not guarantee acceptance.</span>
                    </label>
                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginBottom: 20 }}>
                      <input type="checkbox" checked={ack.terms} onChange={(e) => setAck({ ...ack, terms: e.target.checked })} style={{ marginTop: 3 }} />
                      <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>I acknowledge that all benefits and incentives are subject to eligibility, approval, and program requirements, and that no returns or distributions are guaranteed.</span>
                    </label>

                    {/* Mock Payment */}
                    <div style={{ display: "flex", gap: 12, alignItems: "center", background: "#f0f7ff", border: "1px solid #c7ddf5", borderRadius: 12, padding: "14px 18px", marginBottom: 20 }}>
                      <Info size={20} color="#1e40af" style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, fontSize: 12.5, color: "#1e40af", lineHeight: 1.6 }}>
                        <b>Demo payment step.</b> Live card processing (Stripe) is not yet connected. No card is charged here.
                      </p>
                    </div>

                    <div style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
                      <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <Field label="Cardholder Name"><input placeholder="Name on card" style={inputStyle} disabled /></Field>
                        <Field label="Card Number"><input placeholder="•••• •••• •••• ••••" style={inputStyle} disabled /></Field>
                        <Field label="Expiry"><input placeholder="MM / YY" style={inputStyle} disabled /></Field>
                        <Field label="CVC"><input placeholder="•••" style={inputStyle} disabled /></Field>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #e7e2d8", marginTop: 6 }}>
                        <span style={{ fontSize: 13, color: "#667085", display: "inline-flex", alignItems: "center", gap: 6 }}><Lock size={14} /> Encrypted at launch</span>
                        <b style={{ fontSize: 20 }}>{fmt(subtotal)}</b>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <button onClick={back} style={btnGhost}><ArrowLeft size={16} /> Back</button>
                      <button onClick={() => setSubmitted(true)} disabled={!agreementValid} style={{ ...btnPrimary, background: "linear-gradient(135deg,#d1a645,#bc8b25)", ...(agreementValid ? {} : disabled) }}><CreditCard size={16} /> Submit Application</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quarterly distribution explainer */}
      <section style={{ padding: "10px 0 70px", background: "#fbf9f4" }}>
        <div className="sn-shell" style={{ maxWidth: 860 }}>
          <Reveal>
            <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 16, padding: "32px 28px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "0 0 16px" }}>How Quarterly Profit Distributions Work</h2>
              <p style={{ color: "#3d4a57", lineHeight: 1.8, fontSize: 14.5, margin: "0 0 16px" }}>
                Approved participants may receive profit-based distributions quarterly when profits are available and posted through the Select Network reporting system. Initial investment amounts are not treated as withdrawable profit. Members may request withdrawals only from available profit balances, subject to approval and official member terms.
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
          .sn-step-line { width: 18px !important; }
        }
      `}</style>
    </div>
  );
}
