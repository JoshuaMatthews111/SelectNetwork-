"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lock, Menu, X } from "lucide-react";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Capital Focus", href: "/investment-focus" },
  { label: "Network Performance Reports", href: "/reports" },
  { label: "Select Units", href: "/invest-now" },
  { label: "Contact", href: "/contact" },
];

export default function SNNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top trust strip */}
      <div
        style={{
          height: 30,
          background: "linear-gradient(90deg,#f4efe4,#fff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#a07c1e",
          fontSize: 11,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Trust · Privacy · Excellence
      </div>

      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #ece6da",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 0 rgba(0,0,0,.02)",
        }}
      >
        <div
          className="sn-header-inner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            height: 104,
            gap: 24,
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              className="sn-front-nav-logo"
              src="/assets/select-network/select-network-logo.png"
              alt="The Select Network Member Group"
              width={310}
              height={151}
              style={{ width: 300, height: "auto", display: "block" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="sn-desktop-nav" style={{ display: "flex", gap: 30, alignItems: "center" }}>
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    color: active ? "#bd8e28" : "#0d2845",
                    textDecoration: "none",
                    paddingBottom: 4,
                    borderBottom: active ? "2px solid #bd8e28" : "2px solid transparent",
                    transition: ".2s",
                  }}
                  className="sn-nav-link"
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <Link
              href="/login"
              className="sn-member-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg,#0b5b34,#08431f)",
                color: "#fff",
                border: "1px solid rgba(213,168,61,.5)",
                borderRadius: 6,
                padding: "11px 18px",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 6px 16px rgba(7,67,31,.2)",
                transition: ".25s",
              }}
            >
              <Lock size={13} /> Member Portal
            </Link>

            {/* Mobile hamburger */}
            <button
              className="sn-burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                border: "1px solid #e7e2d8",
                borderRadius: 8,
                background: "#fff",
                color: "#0d2845",
                cursor: "pointer",
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
          <div onClick={() => setOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(7,26,51,.45)", backdropFilter: "blur(2px)" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "min(82%, 320px)",
              background: "linear-gradient(180deg,#fff,#fbf8f1)",
              boxShadow: "-12px 0 40px rgba(5,20,45,.2)",
              padding: "22px 22px 40px",
              display: "flex",
              flexDirection: "column",
              animation: "slideInRight .28s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
              <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center" }}>
                <Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={200} height={98} style={{ width: 190, height: "auto" }} />
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", color: "#0d2845", cursor: "pointer" }}>
                <X size={26} />
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV.map((n) => {
                const active = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "15px 14px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: ".03em",
                      textTransform: "uppercase",
                      color: active ? "#fff" : "#0d2845",
                      background: active ? "linear-gradient(135deg,#0b5b34,#08431f)" : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 22,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg,#d1a645,#bc8b25)",
                color: "#fff",
                borderRadius: 8,
                padding: "15px 18px",
                fontWeight: 900,
                fontSize: 13,
                letterSpacing: ".04em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <Lock size={14} /> Member Portal
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
