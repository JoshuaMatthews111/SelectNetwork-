"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, Target, Building2, Leaf, Lock, TrendingUp, Sun, Settings, BarChart3, ShieldPlus, Star, ArrowRight, Menu, X } from "lucide-react";

export default function SelectNetworkHomePage() {
  /* ─── Focus card rotation ─── */
  const [activeCard, setActiveCard] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroPhrase, setHeroPhrase] = useState(0);
  const HERO_PHRASES = [
    "Access Private Opportunities.",
    "Connect Capital to Growing Companies.",
    "Build Strategic Partnerships.",
    "Expand With Proven Systems.",
    "Join a Private Select Member Network.",
  ];
  useEffect(() => {
    const timer = setInterval(() => setActiveCard((i) => (i + 1) % 6), 1700);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const phraseTimer = setInterval(() => setHeroPhrase((i) => (i + 1) % 5), 3200);
    return () => clearInterval(phraseTimer);
  }, []);

  return (
    <div className="sn-home">
      {/* ═══ TOP LINE ═══ */}
      <div className="sn-top-line">TRUST · PRIVACY · EXCELLENCE</div>

      {/* ═══ HEADER ═══ */}
      <header className="sn-header">
        <nav className="sn-nav-bar">
          <Link href="/" className="sn-brand">
            <Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={410} height={200} priority style={{ height: 94, width: "auto" }} />
          </Link>
          <div className="sn-nav-links">
            <Link href="/about">About</Link>
            <Link href="/investment-focus">Capital Focus</Link>
            <Link href="/reports">Network Performance Reports</Link>
            <Link href="/invest-now">Select Units</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <Link href="/login" className="sn-portal-btn sn-hide-mobile">🔒 Member Portal</Link>
          <button className="sn-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={24} /></button>
        </nav>
      </header>

      {/* ═══ MOBILE DRAWER ═══ */}
      {mobileOpen && (
        <div className="sn-mobile-drawer-overlay">
          <div className="sn-mobile-drawer-bg" onClick={() => setMobileOpen(false)} />
          <div className="sn-mobile-drawer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center" }}>
                <Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={160} height={40} style={{ width: 160, height: "auto" }} />
              </Link>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#071a33" }}><X size={24} /></button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{ label: "About", href: "/about" }, { label: "Capital Focus", href: "/investment-focus" }, { label: "Network Performance Reports", href: "/reports" }, { label: "Select Units", href: "/invest-now" }, { label: "Contact", href: "/contact" }].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "14px 16px", borderRadius: 10, fontSize: 14, fontWeight: 800, letterSpacing: ".03em", textTransform: "uppercase", color: "#0d2845", textDecoration: "none" }}>{l.label}</Link>
              ))}
            </nav>
            <Link href="/login" onClick={() => setMobileOpen(false)} style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", borderRadius: 8, padding: "14px 18px", fontWeight: 900, fontSize: 13, textTransform: "uppercase", textDecoration: "none" }}><Lock size={14} /> Member Portal</Link>
          </div>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <main className="sn-page">
        <section className="sn-hero" aria-label="The Select Network Member Group homepage hero">
          {/* Left — Copy */}
          <div className="sn-hero-copy">
            <div className="sn-editorial-kicker">Private select members.<br />Strategic partners.<br />Lasting impact.</div>
            <h1 className="sn-rotator-headline">
              {HERO_PHRASES.map((phrase, i) => {
                const words = phrase.split(" ");
                const gold = words.slice(0, 2).join(" ");
                const rest = words.slice(2).join(" ");
                return (
                  <span key={i} className={`sn-rotator-phrase${heroPhrase === i ? " active" : ""}`}>
                    <span className="sn-rp-gold">{gold}</span>{rest ? " " : ""}<span className="sn-rp-navy">{rest}</span>
                  </span>
                );
              })}
            </h1>
            <div className="sn-gold-rule"><span className="sn-rule-diamond">◇</span></div>
            <h2 className="sn-hero-subtitle">Building the Next Wave of Private Membership Stake Opportunities</h2>
            <p className="sn-hero-paragraph">The Select Network Member Group exists to connect capital with vision, strong company systems, and strategic private membership stake opportunities designed to create sustainable long-term growth.</p>
          </div>

          {/* Center — Video Header */}
          <div className="sn-showcase-wrap" aria-label="The Select Network Member Group video header">
            <div className="sn-video-frame">
              <video
                className="sn-hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/assets/select-network/hero-video-poster.jpg"
                aria-label="The Select Network Member Group brand motion video"
              >
                <source src="/assets/select-network/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="sn-video-fallback sn-current-brand-showcase" aria-hidden="true">
                <Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={420} height={205} priority style={{ width: "74%", maxWidth: 330, height: "auto" }} />
              </div>
              <div className="sn-video-ring" aria-hidden="true"></div>
              <div className="sn-video-caption"><span>TRUST · PRIVACY · EXCELLENCE</span></div>
            </div>
          </div>

          {/* Right — Focus Cards */}
          <aside className="sn-focus-panel" aria-label="Rotating The Select Network Member Group focus areas">
            {[
              { icon: <Users size={24} />, label: "Private Select Member Group" },
              { icon: <Target size={24} />, label: "Strategic Opportunities" },
              { icon: <Building2 size={24} />, label: "Strong Company Systems" },
              { icon: <Leaf size={24} />, label: "Sustainable Growth" },
              { icon: <Lock size={24} />, label: "Member-Based Access" },
              { icon: <TrendingUp size={24} />, label: "Future Capital Focuses" },
            ].map((card, i) => (
              <div key={i} className={`sn-focus-card${activeCard === i ? " active" : ""}`}>
                <span className="sn-focus-icon">{card.icon}</span>
                <span className="sn-focus-label">{card.label}</span>
              </div>
            ))}
          </aside>
        </section>

        {/* ═══ HOW SELECT NETWORK WORKS ═══ */}
        <section className="sn-works" id="about" aria-label="How The Select Network Member Group works">
          <h2 className="sn-section-title"><span>How The Select Network Member Group Works</span></h2>
          <div className="sn-work-grid">
            <article className="sn-work-card">
              <div className="sn-icon-ring"><Sun size={38} /></div>
              <div>
                <h3>Identify Opportunity</h3>
                <p>We evaluate private membership stake opportunities with strong potential and long-term impact.</p>
              </div>
            </article>
            <div className="sn-arrow">→</div>
            <article className="sn-work-card">
              <div className="sn-icon-ring"><Settings size={38} /></div>
              <div>
                <h3>Build the System</h3>
                <p>We partner with capable teams to establish the structure, strategy, and systems for success.</p>
              </div>
            </article>
            <div className="sn-arrow">→</div>
            <article className="sn-work-card">
              <div className="sn-icon-ring"><BarChart3 size={38} /></div>
              <div>
                <h3>Create Long-Term Value</h3>
                <p>We support growth, drive efficiency, and build value for lasting wealth and future opportunities.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ═══ GROW YOUR MONEY NOW ═══ */}
        <section className="sn-money" id="investment-focus" aria-label="Grow your money now capital focus section">
          <div className="sn-money-copy">
            <h2>GROW YOUR MONEY NOW</h2>
            <div className="sn-small-rule"></div>
            <p>Explore our current capital focus and discover how The Select Network Member Group is creating value across real private membership stake opportunities.</p>
            <Link href="/investment-focus" className="sn-btn-gold">View Capital Focus <ArrowRight size={16} /></Link>
          </div>
          <div className="sn-chart" aria-label="Illustrative platform growth visualization">
            <svg viewBox="0 0 360 200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="snAreaFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d5a83d" stopOpacity=".25" /><stop offset="1" stopColor="#d5a83d" stopOpacity="0" /></linearGradient>
                <linearGradient id="snArrowGrad" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#d5a83d" /><stop offset="1" stopColor="#fff" /></linearGradient>
              </defs>
              {/* Grid */}
              <g stroke="rgba(255,255,255,.06)" strokeWidth="1"><path d="M30 40H340M30 80H340M30 120H340M30 160H340" /></g>
              {/* Area under curve */}
              <path className="sn-area" d="M30 168 C70 160,110 145,150 130 S220 100,260 80 S310 45,340 30 L340 180 L30 180Z" fill="url(#snAreaFill)" />
              {/* Growth line */}
              <path className="sn-growth-line" d="M30 168 C70 160,110 145,150 130 S220 100,260 80 S310 45,340 30" fill="none" stroke="#d5a83d" strokeWidth="3" strokeLinecap="round" />
              {/* Data points */}
              <g fill="#fff" stroke="#d5a83d" strokeWidth="3" className="sn-dots"><circle cx="30" cy="168" r="4" /><circle cx="110" cy="145" r="4" /><circle cx="190" cy="110" r="4" /><circle cx="270" cy="72" r="4" /><circle cx="340" cy="30" r="5" /></g>
              {/* Upward arrow at tip */}
              <polygon points="340,8 332,26 340,22 348,26" fill="url(#snArrowGrad)" className="sn-up-arrow" />
              {/* Labels */}
              <text x="34" y="18" fill="#9fb6d4" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">GROWTH</text>
              <text x="280" y="18" fill="#ffd46f" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">↑ EXPANDING</text>
            </svg>
            <div className="sn-chart-legend">
              <span><i style={{ background: "#d5a83d" }}></i>Network Growth</span>
              <span><i style={{ background: "#9fb6d4" }}></i>Member Activity</span>
            </div>
            <div className="sn-chart-caption">Illustrative platform overview · not a guarantee of returns</div>
          </div>
          <article className="sn-ldtt-card">
            <Image src="/assets/select-network/lorenzos-dog-training-team-logo.png" alt="Lorenzo&apos;s Dog Training Team" width={200} height={200} style={{ width: 72, height: "auto", borderRadius: 6 }} />
            <div>
              <small>Current Capital Focus</small>
              <h3>Lorenzo&apos;s Dog Training Team</h3>
              <p>A Proven Brand. A Growing Mission. Professional Training. Positive Impact. Built for Long-Term Growth.</p>
              <Link href="/investment-focus/ldtt">Learn More About Lorenzo&apos;s →</Link>
            </div>
          </article>
        </section>

        {/* ═══ TRUST STRIP ═══ */}
        <section className="sn-trust-strip" aria-label="Trust features">
          <article className="sn-trust-item">
            <div className="sn-trust-icon"><ShieldPlus size={36} /></div>
            <div>
              <h4>Invitation-Only Membership</h4>
              <p>Access is reserved for qualified select members and strategic partners who share our mission.</p>
            </div>
          </article>
          <article className="sn-trust-item">
            <div className="sn-trust-icon"><Lock size={36} /></div>
            <div>
              <h4>Confidential by Design</h4>
              <p>Your information and membership records are protected with the highest standard of privacy.</p>
            </div>
          </article>
          <article className="sn-trust-item">
            <div className="sn-trust-icon"><Star size={36} /></div>
            <div>
              <h4>Aligned for Long-Term Value</h4>
              <p>We focus on sustainable growth, measurable impact, and generational wealth creation.</p>
            </div>
          </article>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="sn-footer-home">
        <strong>TRUST. PRIVACY. EXCELLENCE.</strong>
        <div className="sn-script">Built for discerning select members who value impact and integrity.</div>
        <div className="sn-footer-right">
          <span>Become by Design</span>
          <span>🔒 Private Protected</span>
        </div>
      </footer>

      {/* ═══ SCOPED STYLES ═══ */}
      <style jsx global>{`
        /* ─── ROOT ─── */
        .sn-home {
          --ivory: #ffffff;
          --ivory-2: #fffdf8;
          --navy: #051f45;
          --navy-2: #082d61;
          --gold: #c48628;
          --gold-2: #e0b461;
          --green: #075629;
          --emerald: #0a6b3b;
          --ink: #071a34;
          --muted: #5f6f82;
          --line: rgba(196,134,40,.35);
          --shadow: 0 24px 65px rgba(14,32,58,.12);
          --soft: 0 14px 32px rgba(122,82,18,.12);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color-scheme: light;
          color: var(--ink);
          background-color: #fff !important;
          background:
            radial-gradient(circle at 50% 0%, rgba(255,255,255,.98) 0 28%, transparent 58%),
            linear-gradient(180deg, #ffffff 0%, #fffdf9 52%, #fbf8f1 100%);
          overflow-x: hidden;
          position: relative;
        }
        .sn-home:before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(90deg, rgba(196,134,40,.035) 1px, transparent 1px),
            linear-gradient(0deg, rgba(196,134,40,.025) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.7), transparent 70%);
          z-index: 0;
        }

        /* ─── TOP LINE ─── */
        .sn-top-line {
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: .34em;
          color: #9b650c;
          font-weight: 800;
          font-size: 12px;
          background: rgba(255,255,255,.82);
          border-bottom: 1px solid rgba(196,134,40,.14);
        }

        /* ─── HEADER ─── */
        .sn-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(196,134,40,.18);
        }
        .sn-nav-bar {
          max-width: 1500px;
          margin: 0 auto;
          padding: 18px 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .sn-brand { display: flex; align-items: center; min-width: 270px; text-decoration: none; }
        .sn-brand img { filter: drop-shadow(0 8px 14px rgba(0,0,0,.12)); }
        .sn-nav-links { display: flex; align-items: center; gap: 38px; font-size: 14px; font-weight: 850; letter-spacing: .04em; text-transform: uppercase; color: var(--navy); }
        .sn-nav-links a { text-decoration: none; color: var(--navy); position: relative; white-space: nowrap; }
        .sn-nav-links a:after { content: ""; position: absolute; left: 0; right: 100%; bottom: -8px; height: 2px; background: var(--gold); transition: .28s ease; }
        .sn-nav-links a:hover:after { right: 0; }
        .sn-portal-btn {
          border: 0;
          padding: 17px 30px;
          border-radius: 8px;
          background: linear-gradient(180deg, #08733a, #035226);
          color: #fff5d2;
          font-weight: 900;
          letter-spacing: .04em;
          box-shadow: 0 13px 28px rgba(2,69,32,.22), inset 0 0 0 1px rgba(255,214,125,.28);
          cursor: pointer;
          text-transform: uppercase;
          white-space: nowrap;
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
          font-size: 13px;
        }

        /* ─── PAGE ─── */
        .sn-page { max-width: 1500px; margin: 0 auto; padding: 0 46px 26px; position: relative; z-index: 1; }

        /* ─── HERO ─── */
        .sn-hero {
          display: grid;
          grid-template-columns: 35% 43% 22%;
          gap: 28px;
          min-height: 526px;
          padding-top: 24px;
          align-items: center;
          position: relative;
          isolation: isolate;
        }
        .sn-hero:after { content: ""; position: absolute; inset: auto 30px 0; height: 1px; background: linear-gradient(90deg, transparent, var(--line), transparent); }

        .sn-editorial-kicker { color: #b97820; font-size: 13px; line-height: 1.45; text-transform: uppercase; letter-spacing: .28em; font-weight: 900; margin-bottom: 18px; }
        .sn-hero-copy { align-self: center; padding-top: 15px; }

        /* Headline Rotator */
        .sn-rotator-headline {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(32px, 3.4vw, 50px);
          line-height: 1.2;
          letter-spacing: -.025em;
          color: var(--navy);
          margin: 0 0 14px;
          font-weight: 500;
          max-width: 520px;
          position: relative;
          min-height: 2.5em;
        }
        .sn-rotator-phrase {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: block;
          opacity: 0;
          transform: rotateX(90deg) translateY(-10px);
          transform-origin: center bottom;
          transition: opacity .15s, transform .15s;
          pointer-events: none;
        }
        .sn-rotator-phrase.active {
          opacity: 1;
          transform: rotateX(0deg) translateY(0);
          animation: snFlipIn .6s cubic-bezier(.23,1,.32,1) forwards;
          pointer-events: auto;
        }
        .sn-rp-gold {
          background: linear-gradient(90deg, #8d5518, #d7a64b, #c98a2e, #805112);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
          display: inline;
        }
        .sn-rotator-phrase.active .sn-rp-gold::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 45%;
          left: -60%;
          background: linear-gradient(100deg, transparent, rgba(255,228,148,.55) 45%, rgba(255,240,190,.85) 50%, rgba(255,228,148,.55) 55%, transparent);
          animation: snShineSlide 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        .sn-rp-navy {
          color: var(--navy);
        }
        @keyframes snFlipIn {
          0% { opacity: 0; transform: rotateX(90deg) translateY(-10px); filter: blur(2px); }
          40% { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: rotateX(0deg) translateY(0); }
        }
        @keyframes snShineSlide {
          0%, 30% { left: -60%; opacity: 0; }
          40% { opacity: 1; }
          70%, 100% { left: 130%; opacity: 0; }
        }

        /* Hamburger */
        .sn-hamburger { display: none; background: none; border: 1px solid rgba(196,134,40,.4); border-radius: 8px; padding: 8px; cursor: pointer; color: var(--navy); }
        .sn-mobile-drawer-overlay { position: fixed; inset: 0; z-index: 99999; }
        .sn-mobile-drawer-bg { position: absolute; inset: 0; background: rgba(7,26,51,.4); backdrop-filter: blur(3px); }
        .sn-mobile-drawer { position: absolute; top: 0; right: 0; width: 300px; max-width: 85vw; height: 100vh; background: #fff; box-shadow: -10px 0 40px rgba(0,0,0,.15); padding: 24px; overflow: auto; animation: snDrawerIn .25s ease; }
        @keyframes snDrawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

        .sn-hero-subtitle { color: #a76418; font-weight: 900; font-size: 18px; margin: 0 0 10px; line-height: 1.3; letter-spacing: .02em; max-width: 520px; }
        .sn-hero-paragraph { font-size: 15px; line-height: 1.6; color: #23354e; font-weight: 600; max-width: 480px; margin: 0; }
        .sn-gold-rule { width: 80%; max-width: 420px; height: 1px; background: linear-gradient(90deg, var(--gold), rgba(196,134,40,.15), transparent); margin: 8px 0 20px; position: relative; }
        .sn-rule-diamond { position: absolute; left: 49%; top: -10px; color: var(--gold); font-size: 18px; background: var(--ivory-2); padding: 0 8px; }

        /* ─── VIDEO HEADER ─── */
        .sn-showcase-wrap { height: 420px; position: relative; display: flex; align-items: center; justify-content: center; }
        .sn-video-frame {
          position: relative;
          width: min(460px, 100%);
          aspect-ratio: 1 / 1;
          max-height: 400px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(160deg, #061d3d 0%, #0a2e5e 45%, #05203f 100%);
          border: 1px solid rgba(224,180,97,.4);
          box-shadow:
            0 30px 60px rgba(7,26,51,.28),
            0 8px 20px rgba(0,0,0,.12),
            inset 0 0 0 1px rgba(255,255,255,.08);
          animation: snVideoFloat 6s ease-in-out infinite;
        }
        .sn-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          display: block;
        }
        .sn-video-fallback {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 40%, rgba(224,180,97,.12), transparent 60%), linear-gradient(160deg, #061d3d, #05203f);
        }
        .sn-current-brand-showcase {
          background:
            radial-gradient(circle at 50% 34%, rgba(255,255,255,.96) 0%, rgba(251,248,241,.9) 45%, rgba(236,216,168,.72) 67%, rgba(7,26,51,.14) 100%),
            linear-gradient(160deg, #fbf8f1 0%, #fffaf0 52%, #edf6ef 100%);
        }
        .sn-current-brand-showcase::before {
          content: "";
          position: absolute;
          width: 82%;
          height: 40%;
          bottom: 20%;
          border-radius: 999px;
          border: 1px solid rgba(189,142,40,.45);
          box-shadow: 0 0 42px rgba(213,168,61,.24), inset 0 0 24px rgba(255,255,255,.55);
          animation: snRingPulse 4.5s ease-in-out infinite;
        }
        .sn-current-brand-showcase::after {
          content: "";
          position: absolute;
          inset: 12%;
          border-radius: 18px;
          border: 1px solid rgba(7,89,51,.16);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent);
          transform: translateX(-90%);
          animation: snBrandSheen 5s ease-in-out infinite;
        }
        .sn-current-brand-showcase img {
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 14px 20px rgba(7,26,51,.2));
          animation: snLogoFloat 5.5s ease-in-out infinite;
        }
        .sn-video-ring {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          border-radius: 20px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.14), inset 0 0 40px rgba(7,26,51,.35);
          background: linear-gradient(180deg, transparent 60%, rgba(5,31,69,.55) 100%);
        }
        .sn-video-caption {
          position: absolute;
          left: 0; right: 0; bottom: 14px;
          z-index: 4;
          text-align: center;
          pointer-events: none;
        }
        .sn-video-caption span {
          font-size: 10px;
          letter-spacing: .26em;
          color: #ffe7b0;
          font-weight: 800;
          background: rgba(5,31,69,.55);
          backdrop-filter: blur(4px);
          padding: 6px 16px;
          border-radius: 99px;
          border: 1px solid rgba(224,180,97,.4);
        }
        @keyframes snVideoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes snLogoFloat { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.012); } }
        @keyframes snRingPulse { 0%, 100% { opacity: .58; transform: scale(.96); } 50% { opacity: 1; transform: scale(1.04); } }
        @keyframes snBrandSheen {
          0%, 45% { transform: translateX(-90%); opacity: 0; }
          55% { opacity: .65; }
          72%, 100% { transform: translateX(90%); opacity: 0; }
        }

        /* ─── FOCUS PANEL ─── */
        .sn-focus-panel { border-left: 1px solid rgba(196,134,40,.26); padding-left: 32px; align-self: center; display: flex; flex-direction: column; gap: 14px; }
        .sn-focus-card { display: flex; align-items: center; gap: 14px; min-width: 0; border: 1px solid rgba(196,134,40,.35); background: rgba(255,250,241,.72); border-radius: 10px; padding: 13px 14px; color: var(--navy); font-weight: 850; box-shadow: 0 8px 20px rgba(86,58,11,.05); position: relative; overflow: hidden; transition: all .32s ease; }
        .sn-focus-icon { color: #bd7723; flex: 0 0 auto; transition: .32s ease; display: flex; }
        .sn-focus-label { font-size: 13px; line-height: 1.25; white-space: normal; min-width: 0; }
        .sn-focus-card.active { background: linear-gradient(180deg, #fff, #fff6df); box-shadow: 0 14px 30px rgba(196,134,40,.16); border-color: rgba(196,134,40,.72); }
        .sn-focus-card.active:before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,221,144,.48), transparent); animation: snShutter 1.2s ease both; }
        .sn-focus-card.active .sn-focus-icon { transform: scale(1.13); color: #0a6b3b; filter: drop-shadow(0 0 7px rgba(224,180,97,.55)); }
        @keyframes snShutter { 0% { transform: translateX(-110%); } 100% { transform: translateX(110%); } }

        /* ─── HOW IT WORKS ─── */
        .sn-works { margin-top: 10px; padding: 16px 0 18px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .sn-section-title { font-weight: 950; text-align: center; letter-spacing: .16em; color: var(--navy); font-size: 14px; text-transform: uppercase; margin: 0 0 14px; display: flex; justify-content: center; align-items: center; gap: 16px; }
        .sn-section-title:before, .sn-section-title:after { content: "◆"; color: var(--gold); font-size: 10px; }
        .sn-work-grid { display: grid; grid-template-columns: 1fr 42px 1fr 42px 1fr; align-items: center; gap: 6px; }
        .sn-work-card { display: grid; grid-template-columns: 68px 1fr; align-items: center; gap: 14px; min-height: 80px; padding: 0 10px; }
        .sn-work-card h3 { font-family: Georgia, serif; color: var(--navy); font-size: 17px; margin: 0 0 5px; }
        .sn-work-card p { color: #1e3554; font-weight: 600; line-height: 1.4; font-size: 13px; margin: 0; }
        .sn-icon-ring {
          width: 62px; height: 62px;
          border: 1px solid rgba(196,134,40,.55);
          border-radius: 50%;
          display: grid; place-items: center;
          background: linear-gradient(145deg, #fffaf1 0%, #f3d18a 34%, #a96d1f 58%, #fff2c0 76%, #7e531a 100%);
          box-shadow: inset 0 2px 4px rgba(255,255,255,.85), inset 0 -8px 14px rgba(81,52,13,.16), 0 10px 20px rgba(152,96,19,.15);
          position: relative;
          animation: snMetalPulse 4s ease-in-out infinite;
          overflow: hidden;
        }
        .sn-icon-ring:before {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 22%, #fffef8 0%, #fff7de 33%, #e0b461 58%, #8e5b18 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.7);
        }
        .sn-icon-ring:after {
          content: "";
          position: absolute;
          top: -35%; bottom: -35%;
          width: 30%; left: -55%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent);
          transform: rotate(22deg);
          animation: snMetalSweep 2.8s ease-in-out infinite;
        }
        .sn-icon-ring svg { width: 30px; height: 30px; color: #063f26; position: relative; z-index: 2; filter: drop-shadow(0 2px 1px rgba(255,255,255,.45)) drop-shadow(0 4px 6px rgba(67,38,5,.18)); }
        .sn-arrow { font-size: 28px; color: var(--gold); justify-self: center; animation: snArrowPulse 1.9s ease-in-out infinite; opacity: .7; }
        @keyframes snMetalPulse { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.035); } }
        @keyframes snMetalSweep { 0%, 35% { left: -60%; opacity: 0; } 48% { opacity: 1; } 78%, 100% { left: 135%; opacity: 0; } }
        @keyframes snArrowPulse { 0%, 100% { transform: translateX(0); opacity: .62; } 50% { transform: translateX(7px); opacity: 1; } }

        /* ─── GROW YOUR MONEY ─── */
        .sn-money {
          margin: 24px 0 22px;
          border-radius: 12px;
          border: 1px solid rgba(224,180,97,.45);
          background: linear-gradient(90deg, #061d3d 0%, #082e62 48%, #061d3d 100%);
          box-shadow: 0 20px 40px rgba(5,31,69,.18);
          display: grid;
          grid-template-columns: 48% 22% 30%;
          overflow: hidden;
          min-height: 200px;
          position: relative;
        }
        .sn-money-copy { padding: 30px 34px; color: white; position: relative; z-index: 2; }
        .sn-money h2 { font-family: Georgia, serif; font-size: 28px; letter-spacing: .02em; margin: 0; color: #fff; line-height: 1.1; font-weight: 500; }
        .sn-small-rule { width: 100px; height: 1px; background: linear-gradient(90deg, var(--gold), transparent); margin: 14px 0 12px; }
        .sn-money p { font-size: 14px; line-height: 1.55; color: #f6eee0; margin: 0 0 18px; max-width: 420px; }
        .sn-btn-gold { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; border: 1px solid rgba(255,225,149,.8); border-radius: 6px; color: white; background: linear-gradient(180deg, #d7a246, #a76816); padding: 12px 20px; font-weight: 900; text-transform: uppercase; letter-spacing: .045em; box-shadow: 0 12px 24px rgba(0,0,0,.2); font-size: 12px; }

        /* Chart */
        .sn-chart { position: relative; min-height: 200px; background: radial-gradient(circle at 80% 28%, rgba(255,211,106,.1), transparent 24%), linear-gradient(90deg, rgba(6,29,61,0), rgba(8,46,98,.35)); overflow: hidden; animation: snChartBounce 4.5s ease-in-out infinite; opacity: .85; }
        .sn-chart:before { content: ""; position: absolute; inset: 16px; border-radius: 12px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent); animation: snChartScan 3s linear infinite; z-index: 1; pointer-events: none; }
        .sn-chart svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .sn-bars rect { transform-origin: bottom; animation: snBarRise 1.7s ease forwards, snBarBounce 2.6s ease-in-out 2s infinite; transform: scaleY(0); }
        .sn-bars rect:nth-child(2) { animation-delay: .1s; }
        .sn-bars rect:nth-child(3) { animation-delay: .18s; }
        .sn-bars rect:nth-child(4) { animation-delay: .28s; }
        .sn-bars rect:nth-child(5) { animation-delay: .38s; }
        .sn-bars rect:nth-child(6) { animation-delay: .5s; }
        .sn-bars rect:nth-child(7) { animation-delay: .62s; }
        .sn-bars rect:nth-child(8) { animation-delay: .75s; }
        .sn-bars rect:nth-child(9) { animation-delay: .9s; }
        .sn-growth-line { stroke-dasharray: 520; stroke-dashoffset: 520; animation: snDrawLine 2.4s ease 1.1s forwards; filter: drop-shadow(0 0 7px #ffc55a); }
        .sn-area { opacity: 0; animation: snAreaFade 1.6s ease 1.8s forwards; }
        .sn-dots { opacity: 0; animation: snAreaFade 1s ease 1.2s forwards; }
        .sn-up-arrow { opacity: 0; animation: snUpArrow 2.5s ease 2s infinite; }
        @keyframes snUpArrow { 0% { opacity: 0; transform: translateY(6px); } 20%,60% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-4px); } }
        .sn-chart-legend { position: absolute; top: 12px; left: 16px; z-index: 2; display: flex; flex-direction: column; gap: 5px; }
        .sn-chart-legend span { display: inline-flex; align-items: center; gap: 6px; font-size: 9.5px; font-weight: 700; color: #cfe0f5; text-transform: uppercase; letter-spacing: .04em; }
        .sn-chart-legend i { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }
        .sn-chart-caption { position: absolute; bottom: 10px; left: 0; right: 0; z-index: 2; text-align: center; font-size: 9px; color: #9fb6d4; letter-spacing: .03em; font-style: italic; }
        @keyframes snAreaFade { to { opacity: 1; } }
        @keyframes snBarRise { to { transform: scaleY(1); } }
        @keyframes snBarBounce { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.38); } }
        @keyframes snDrawLine { to { stroke-dashoffset: 0; } }
        @keyframes snSparkMove { 0%, 100% { opacity: .75; transform: translateY(0) scale(1); } 50% { opacity: 1; transform: translateY(-14px) scale(1.22); } }
        @keyframes snChartBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes snChartScan { to { transform: translateX(130%); } }

        /* LDTT Card */
        .sn-ldtt-card { background: #fffaf1; margin: 12px; border-radius: 11px; padding: 20px 22px; display: grid; grid-template-columns: 80px 1fr; gap: 18px; align-items: center; border: 1px solid rgba(196,134,40,.35); box-shadow: inset 0 0 0 1px rgba(255,255,255,.65), 0 10px 20px rgba(0,0,0,.08); }
        .sn-ldtt-card small { display: block; color: var(--navy); font-weight: 950; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; font-size: 10px; }
        .sn-ldtt-card h3 { font-family: Georgia, serif; color: var(--navy); font-size: 18px; line-height: 1.15; margin: 0 0 6px; text-transform: uppercase; }
        .sn-ldtt-card p { margin: 0; color: #23354e; font-weight: 700; line-height: 1.4; font-size: 12px; }
        .sn-ldtt-card a { display: inline-flex; margin-top: 8px; color: #b26e18; text-transform: uppercase; font-weight: 950; letter-spacing: .05em; text-decoration: none; font-size: 11px; }
        .sn-ldtt-card a:hover { text-decoration: underline; }

        /* ─── TRUST STRIP ─── */
        .sn-trust-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin: 16px 0 18px; border-bottom: 1px solid var(--line); padding-bottom: 16px; }
        .sn-trust-item { display: grid; grid-template-columns: 56px 1fr; gap: 14px; align-items: center; border-right: 1px solid var(--line); padding-right: 18px; }
        .sn-trust-item:last-child { border-right: 0; }
        .sn-trust-icon { width: 50px; height: 50px; display: grid; place-items: center; border-radius: 50%; background: radial-gradient(circle, #fff, #fff4dd); border: 1px solid rgba(196,134,40,.4); box-shadow: 0 4px 12px rgba(152,96,19,.1); }
        .sn-trust-icon svg { width: 28px; height: 28px; color: var(--green); }
        .sn-trust-item h4 { font-family: Georgia, serif; color: var(--navy); font-size: 16px; margin: 0 0 4px; }
        .sn-trust-item p { font-size: 12px; line-height: 1.4; color: #23354e; font-weight: 600; margin: 0; }

        /* ─── FOOTER ─── */
        .sn-footer-home { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 0 46px 25px; color: var(--navy); max-width: 1500px; margin: 0 auto; }
        .sn-footer-home strong { font-family: Georgia, serif; font-size: 20px; letter-spacing: .07em; }
        .sn-script { font-family: "Brush Script MT", "Segoe Script", cursive; color: #c17a2a; font-size: 22px; }
        .sn-footer-right { display: flex; align-items: center; gap: 24px; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; font-weight: 850; }

        /* ─── RESPONSIVE: TABLET ─── */
        @media (max-width: 1180px) {
          .sn-nav-bar { padding: 16px 24px; }
          .sn-nav-links { gap: 18px; }
          .sn-page { padding: 0 24px 24px; }
          .sn-hero { grid-template-columns: 1fr; gap: 10px; }
          .sn-hero-copy { order: 1; }
          .sn-showcase-wrap { order: 2; height: auto; padding: 10px 0 20px; }
          .sn-focus-panel { order: 3; border-left: 0; padding-left: 0; display: grid; grid-template-columns: repeat(3, 1fr); }
          .sn-focus-label { white-space: normal; }
          .sn-work-grid { grid-template-columns: 1fr; }
          .sn-arrow { transform: rotate(90deg); animation: none; }
          .sn-money { grid-template-columns: 1fr; }
          .sn-chart { height: 170px; }
          .sn-trust-strip { grid-template-columns: 1fr; }
          .sn-trust-item { border-right: 0; border-bottom: 1px solid var(--line); padding-bottom: 18px; padding-right: 0; }
          .sn-trust-item:last-child { border-bottom: 0; }
        }

        /* ─── RESPONSIVE: MOBILE ─── */
        @media (max-width: 760px) {
          .sn-home {
            --ink: #071a34;
            --navy: #051f45;
            --ivory: #ffffff;
            color: #071a34 !important;
            background-color: #ffffff !important;
            background: linear-gradient(180deg, #ffffff 0%, #ffffff 62%, #fbf8f1 100%) !important;
          }
          .sn-home:before { opacity: .55; background-image: linear-gradient(90deg, rgba(196,134,40,.035) 1px, transparent 1px), linear-gradient(0deg, rgba(196,134,40,.025) 1px, transparent 1px); }
          .sn-home .sn-rp-navy,
          .sn-home .sn-hero-paragraph,
          .sn-home .sn-focus-label,
          .sn-home .sn-work-card h3,
          .sn-home .sn-trust-item h4 {
            color: #071a34 !important;
          }
          .sn-top-line { font-size: 10px; letter-spacing: .18em; }
          .sn-header { background: rgba(255,255,255,.97); }
          .sn-brand img { height: 70px !important; }
          .sn-nav-links, .sn-hide-mobile { display: none !important; }
          .sn-hamburger { display: flex; }
          .sn-nav-bar { padding: 14px 16px; }
          .sn-page { padding: 0 16px 20px; }
          .sn-hero { padding-top: 10px; }
          .sn-editorial-kicker { font-size: 11px; }
          .sn-home h1 { font-size: 36px; }
          .sn-static-headline { font-size: 36px; }
          .sn-hero-subtitle { font-size: 17px; }
          .sn-showcase-wrap { padding: 6px 0 18px; }
          .sn-video-frame { width: 100%; max-width: 360px; border-radius: 16px; }
          .sn-focus-panel { grid-template-columns: 1fr; }
          .sn-work-card { grid-template-columns: 72px 1fr; padding: 8px 0; }
          .sn-money h2 { font-size: 30px; }
          .sn-money-copy { padding: 28px 22px; }
          .sn-ldtt-card { grid-template-columns: 1fr; text-align: center; }
          .sn-trust-item { grid-template-columns: 60px 1fr; }
          .sn-footer-home { flex-direction: column; text-align: center; padding: 0 16px 25px; }
          .sn-footer-right { flex-wrap: wrap; justify-content: center; }
          .sn-script { font-size: 18px; }
        }
      `}</style>
    </div>
  );
}
