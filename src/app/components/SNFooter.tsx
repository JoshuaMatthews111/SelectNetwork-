"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Investment Focus", href: "/investment-focus" },
  { label: "Investment Reports", href: "/reports" },
  { label: "Invest Now", href: "/invest-now" },
  { label: "Contact", href: "/contact" },
  { label: "Member Portal", href: "/login" },
];

export default function SNFooter() {
  return (
    <footer style={{ background: "#061a33", color: "#fff" }}>
      {/* tagline strip */}
      <div
        style={{
          textAlign: "center",
          padding: "18px 24px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          color: "#d5a83d",
          fontSize: 15,
        }}
      >
        Investing in Purpose. Building Legacy. Creating Impact.
      </div>

      <div
        className="sn-footer-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: 40,
          padding: "44px 40px",
        }}
      >
        <div>
          <Image src="/assets/select-network/select-network-logo.png" alt="The Select Network" width={220} height={54} style={{ width: 210, height: "auto" }} />
          <p style={{ marginTop: 16, color: "#9fb1c7", fontSize: 13, lineHeight: 1.7, maxWidth: 360 }}>
            The Select Network Private Investors Group LLC is a private, invitation-only investor
            platform. Lorenzo&apos;s Dog Training Team is the operating company whose historical
            business record is referenced for due diligence.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "#d5a83d", margin: "0 0 16px" }}>Navigate</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "#c6d2e1", fontSize: 13.5, textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "#d5a83d", margin: "0 0 16px" }}>Contact</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, color: "#c6d2e1", fontSize: 13.5 }}>
            <a href="tel:+12168651165" style={{ color: "#c6d2e1", textDecoration: "none" }}>(216) 865-1165</a>
            <a href="mailto:Selectprofits@gmail.com" style={{ color: "#c6d2e1", textDecoration: "none" }}>Selectprofits@gmail.com</a>
            <span>4805 Orchard Rd<br />Garfield Hts, OH 44128</span>
            <Link
              href="/login"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 6, color: "#ffd46f", fontWeight: 800, fontSize: 12.5, textDecoration: "none", textTransform: "uppercase", letterSpacing: ".04em" }}
            >
              <Lock size={13} /> Member Portal
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          padding: "18px 40px",
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <span style={{ color: "#7e90a8", fontSize: 12 }}>
          © {new Date().getFullYear()} The Select Network Private Investors Group LLC. All rights reserved.
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7e90a8", fontSize: 12 }}>
          <ShieldCheck size={14} color="#d5a83d" /> Secure by design · Privacy protected
        </span>
      </div>
    </footer>
  );
}
