"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CalendarClock, CheckCircle2 } from "lucide-react";
import SNNav from "../components/SNNav";
import SNFooter from "../components/SNFooter";
import Reveal from "../components/Reveal";

const NAVY = "#071a33";
const GOLD = "#bd8e28";
const GREEN = "#075933";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const valid = form.name && form.email && form.message;

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: NAVY, background: "#fff" }}>
      <SNNav />

      {/* Hero */}
      <section className="sn-section-pad" style={{ background: "linear-gradient(135deg,#061a33,#030b17)", color: "#fff", padding: "70px 0" }}>
        <div className="sn-shell" style={{ textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
          <h1 className="sn-page-hero-h1" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: 0 }}>We&apos;re Here to Help</h1>
          <p style={{ color: "#c6d2e1", maxWidth: 560, margin: "18px auto 0", lineHeight: 1.7, fontSize: 16 }}>
            We&apos;re here to support your investment journey.
          </p>
        </div>
      </section>

      <section style={{ padding: "70px 0 78px", background: "#fff" }}>
        <div className="sn-shell sn-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 30, alignItems: "start" }}>
          {/* Details */}
          <Reveal>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 22px" }}>Contact Details</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: <Phone size={22} />, label: "Phone", value: "(216) 865-1165", href: "tel:+12168651165" },
                  { icon: <Mail size={22} />, label: "Email", value: "Selectprofits@gmail.com", href: "mailto:Selectprofits@gmail.com" },
                  { icon: <MapPin size={22} />, label: "Address", value: "4805 Orchard Rd, Garfield Hts, OH 44128", href: null },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 14, padding: "20px 22px" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "#edf6ef", color: GREEN, display: "grid", placeItems: "center", flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <small style={{ fontSize: 11.5, color: "#667085", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em" }}>{c.label}</small>
                      {c.href ? (
                        <a href={c.href} style={{ display: "block", fontSize: 15.5, color: NAVY, fontWeight: 700, textDecoration: "none", marginTop: 3 }}>{c.value}</a>
                      ) : (
                        <div style={{ fontSize: 15, color: NAVY, fontWeight: 600, marginTop: 3, lineHeight: 1.5 }}>{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <a href="tel:+12168651165" style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", borderRadius: 10, padding: "14px 22px", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: ".03em", textDecoration: "none" }}>
                <CalendarClock size={16} /> Schedule a Call
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 18, padding: 34, boxShadow: "0 14px 40px rgba(5,20,45,.07)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "30px 10px" }}>
                  <CheckCircle2 size={48} color={GREEN} style={{ margin: "0 auto 14px" }} />
                  <h3 style={{ margin: "0 0 8px", color: NAVY }}>Message Sent</h3>
                  <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6, margin: 0 }}>Thank you for reaching out. Our team will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true); }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "0 0 20px" }}>Send Us a Message</h2>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Full Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inputStyle} /></Field>
                    <Field label="Email Address"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" style={inputStyle} /></Field>
                  </div>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Phone Number"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone" style={inputStyle} /></Field>
                    <Field label="Subject"><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" style={inputStyle} /></Field>
                  </div>
                  <Field label="Message"><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={5} style={{ ...inputStyle, resize: "vertical" }} /></Field>
                  <button type="submit" disabled={!valid} style={{ width: "100%", marginTop: 6, background: valid ? "linear-gradient(135deg,#0b5b34,#08431f)" : "#c3ccc6", color: "#fff", border: 0, borderRadius: 10, padding: "16px", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: ".04em", cursor: valid ? "pointer" : "not-allowed", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <Send size={16} /> Send Us a Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <SNFooter />
    </div>
  );
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
  fontFamily: "inherit",
};
