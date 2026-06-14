"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, FileSignature, PhoneCall, CheckCircle2, Star, Target, BarChart3, Lock, Building2 } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

export default function JoinPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    dob: "", ssn: "", dlNumber: "", dlState: "", dlExpiration: "",
    phone: "", phone2: "", email: "", emailConfirm: "",
    street: "", apt: "", city: "", state: "", zip: "", country: "United States",
    sameAddress: true,
    mailStreet: "", mailApt: "", mailCity: "", mailState: "", mailZip: "", mailCountry: "United States",
    status: "", agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const u = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));

  const valid = form.firstName && form.lastName && form.email && form.emailConfirm && form.phone && form.dob && form.status && form.agree;

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* Hero */}
      <section className="sn-section-pad" style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "70px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Join The Network</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 auto", maxWidth: 700 }}>
            Become a Member. <span style={{ color: GOLD }}>Make an Impact.</span>
          </h1>
          <p style={{ color: "#c6d2e1", maxWidth: 640, margin: "20px auto 0", lineHeight: 1.7, fontSize: 16 }}>
            Join a community of like-minded investors building wealth and creating long-term value in the pet industry.
          </p>
        </div>
      </section>

      {/* 3-step */}
      <section style={{ padding: "70px 0 40px", background: "#fff" }}>
        <div className="sn-shell">
          <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {[
              { n: 1, icon: <FileText size={26} />, title: "Select Your Units", desc: "Choose the number of units and your participation role." },
              { n: 2, icon: <FileSignature size={26} />, title: "Review & Sign Agreement", desc: "Read and accept the Participation Agreement." },
              { n: 3, icon: <PhoneCall size={26} />, title: "Submit Payment", desc: "Complete payment via ACH or card to activate your investor dashboard automatically." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 16, padding: 30, height: "100%", position: "relative" }}>
                  <div style={{ position: "absolute", top: 20, right: 22, fontFamily: "Georgia, serif", fontSize: 40, color: "#e7dcc2", fontWeight: 700 }}>{s.n}</div>
                  <div style={{ width: 60, height: 60, borderRadius: 14, background: "#edf6ef", color: GREEN, display: "grid", placeItems: "center", marginBottom: 18 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 21, margin: "0 0 10px" }}>{s.title}</h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.6, margin: 0, fontSize: 14 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + benefits */}
      <section style={{ padding: "20px 0 78px", background: "#fff" }}>
        <div className="sn-shell sn-split" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 30, alignItems: "start" }}>
          {/* Form */}
          <Reveal>
            <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 18, padding: 34, boxShadow: "0 14px 40px rgba(5,20,45,.07)" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 6px" }}>Your Information</h2>
              <p style={{ color: "#667085", fontSize: 13.5, margin: "0 0 24px" }}>Complete the form below to get started with The Select Network.</p>

              {submitted ? (
                <div style={{ background: "#edf6ef", border: "1px solid #c7e2d0", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
                  <CheckCircle2 size={44} color={GREEN} style={{ margin: "0 auto 12px" }} />
                  <h3 style={{ margin: "0 0 8px", color: NAVY }}>Information Received</h3>
                  <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6, margin: 0 }}>Thank you, {form.firstName}. Proceed to the Invest Now page to select your units, review the agreement, and submit your payment to activate your dashboard.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (valid) setSubmitted(true); }}>
                  <SectionHead>Applicant Information</SectionHead>
                  <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <Field label="Legal First Name *"><input value={form.firstName} onChange={(e) => u("firstName", e.target.value)} placeholder="First" style={inputStyle} /></Field>
                    <Field label="Middle Name"><input value={form.middleName} onChange={(e) => u("middleName", e.target.value)} placeholder="Middle" style={inputStyle} /></Field>
                    <Field label="Last Name *"><input value={form.lastName} onChange={(e) => u("lastName", e.target.value)} placeholder="Last" style={inputStyle} /></Field>
                  </div>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Date of Birth *"><input type="date" value={form.dob} onChange={(e) => u("dob", e.target.value)} style={inputStyle} /></Field>
                    <Field label="Social Security Number"><input value={form.ssn} onChange={(e) => u("ssn", e.target.value)} placeholder="XXX-XX-XXXX" style={inputStyle} /></Field>
                  </div>
                  <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <Field label="Driver License Number"><input value={form.dlNumber} onChange={(e) => u("dlNumber", e.target.value)} style={inputStyle} /></Field>
                    <Field label="State of Issue"><input value={form.dlState} onChange={(e) => u("dlState", e.target.value)} style={inputStyle} /></Field>
                    <Field label="DL Expiration Date"><input type="date" value={form.dlExpiration} onChange={(e) => u("dlExpiration", e.target.value)} style={inputStyle} /></Field>
                  </div>

                  <SectionHead>Contact Information</SectionHead>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Primary Phone Number *"><input value={form.phone} onChange={(e) => u("phone", e.target.value)} placeholder="(555) 123-4567" style={inputStyle} /></Field>
                    <Field label="Secondary Phone (Optional)"><input value={form.phone2} onChange={(e) => u("phone2", e.target.value)} placeholder="(555) 765-4321" style={inputStyle} /></Field>
                  </div>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Email Address *"><input type="email" value={form.email} onChange={(e) => u("email", e.target.value)} placeholder="you@example.com" style={inputStyle} /></Field>
                    <Field label="Confirm Email Address *"><input type="email" value={form.emailConfirm} onChange={(e) => u("emailConfirm", e.target.value)} placeholder="Confirm email" style={inputStyle} /></Field>
                  </div>

                  <SectionHead>Residential Address</SectionHead>
                  <Field label="Street Address *"><input value={form.street} onChange={(e) => u("street", e.target.value)} style={inputStyle} /></Field>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Apartment / Suite"><input value={form.apt} onChange={(e) => u("apt", e.target.value)} style={inputStyle} /></Field>
                    <Field label="City"><input value={form.city} onChange={(e) => u("city", e.target.value)} style={inputStyle} /></Field>
                  </div>
                  <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <Field label="State"><input value={form.state} onChange={(e) => u("state", e.target.value)} style={inputStyle} /></Field>
                    <Field label="Zip Code"><input value={form.zip} onChange={(e) => u("zip", e.target.value)} style={inputStyle} /></Field>
                    <Field label="Country"><input value={form.country} onChange={(e) => u("country", e.target.value)} style={inputStyle} /></Field>
                  </div>

                  <SectionHead>Mailing Address</SectionHead>
                  <label style={{ display: "flex", gap: 10, alignItems: "center", margin: "0 0 16px", cursor: "pointer" }}>
                    <input type="checkbox" checked={form.sameAddress} onChange={(e) => u("sameAddress", e.target.checked)} />
                    <span style={{ fontSize: 13, color: "#4b5563" }}>Same as Residential Address</span>
                  </label>
                  {!form.sameAddress && (
                    <>
                      <Field label="Street Address"><input value={form.mailStreet} onChange={(e) => u("mailStreet", e.target.value)} style={inputStyle} /></Field>
                      <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <Field label="Apartment / Suite"><input value={form.mailApt} onChange={(e) => u("mailApt", e.target.value)} style={inputStyle} /></Field>
                        <Field label="City"><input value={form.mailCity} onChange={(e) => u("mailCity", e.target.value)} style={inputStyle} /></Field>
                      </div>
                      <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                        <Field label="State"><input value={form.mailState} onChange={(e) => u("mailState", e.target.value)} style={inputStyle} /></Field>
                        <Field label="Zip Code"><input value={form.mailZip} onChange={(e) => u("mailZip", e.target.value)} style={inputStyle} /></Field>
                        <Field label="Country"><input value={form.mailCountry} onChange={(e) => u("mailCountry", e.target.value)} style={inputStyle} /></Field>
                      </div>
                    </>
                  )}

                  <SectionHead>Investor Status</SectionHead>
                  <Field label="Investor Classification *">
                    <select value={form.status} onChange={(e) => u("status", e.target.value)} style={inputStyle}>
                      <option value="">Select an option</option>
                      <option>Accredited Investor</option>
                      <option>Non-Accredited Investor</option>
                      <option>Institutional Investor</option>
                      <option>Exploring Options</option>
                    </select>
                  </Field>
                  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "8px 0 22px", cursor: "pointer" }}>
                    <input type="checkbox" checked={form.agree} onChange={(e) => u("agree", e.target.checked)} style={{ marginTop: 3 }} />
                    <span style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>I agree to the <span style={{ color: GOLD, fontWeight: 700 }}>Terms &amp; Conditions</span> and <span style={{ color: GOLD, fontWeight: 700 }}>Privacy Policy</span>.</span>
                  </label>
                  <button type="submit" disabled={!valid} style={{ width: "100%", background: valid ? "linear-gradient(135deg,#0b5b34,#08431f)" : "#c3ccc6", color: "#fff", border: 0, borderRadius: 10, padding: "16px", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: ".04em", cursor: valid ? "pointer" : "not-allowed", transition: ".25s" }}>
                    Apply For Membership
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Benefits */}
          <Reveal delay={120}>
            <div style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", borderRadius: 18, padding: 34 }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "0 0 22px" }}>Member Benefits</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { icon: <Star size={20} />, t: "Exclusive opportunities" },
                  { icon: <Target size={20} />, t: "Purpose-driven impact" },
                  { icon: <BarChart3 size={20} />, t: "Transparent reporting" },
                  { icon: <Lock size={20} />, t: "Secure member portal access" },
                  { icon: <Building2 size={20} />, t: "Aligned for long-term value" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(213,168,61,.15)", color: "#ffd46f", display: "grid", placeItems: "center", flexShrink: 0 }}>{b.icon}</div>
                    <span style={{ fontSize: 15, color: "#eaf0f7" }}>{b.t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.1)" }}>
                <p style={{ color: "#9fb1c7", fontSize: 13, lineHeight: 1.6, margin: 0 }}>Already a member?</p>
                <Link href="/login" style={{ color: "#ffd46f", fontWeight: 800, fontSize: 13.5, textDecoration: "none" }}>Access the Member Portal →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SNFooter />
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, color: "#071a33", margin: "24px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e7e2d8" }}>{children}</h3>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11.5, fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#f9f7f2",
  border: "1px solid #e2dccf",
  borderRadius: 9,
  padding: "13px 15px",
  fontSize: 14,
  outline: "none",
  color: NAVY,
};
