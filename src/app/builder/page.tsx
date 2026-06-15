"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Star, TrendingUp, FolderOpen, Wallet, Network, Megaphone, Settings, Bell, Mail, Diamond, CheckCircle, FileText, CircleDot, Menu, LogOut, MessageSquare, Award, Target } from "lucide-react";

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

/* ─── Matrix member data ─── */
const matrixMembers = {
  self: { name: "Lorenzo", pic: "L", joined: "May 19, 2025", invested: "$50,000", units: 50, location: "Cleveland, OH", source: "Founder", status: "Active", label: "Founder Member" },
  l1: [
    { name: "Maria Santos", pic: "M", joined: "May 20, 2025", invested: "$25,000", units: 25, location: "Miami, FL", source: "Lorenzo", status: "Active", label: "Investor + Builder" },
    { name: "David Chen", pic: "D", joined: "May 22, 2025", invested: "$10,000", units: 10, location: "New York, NY", source: "Lorenzo", status: "Pending", label: "Investor" },
    { name: "James Wilson", pic: "J", joined: "May 28, 2025", invested: "$15,000", units: 15, location: "Dallas, TX", source: "Lorenzo", status: "Active", label: "Builder" },
  ],
  l2: [
    { name: "Sophia Lee", pic: "S", status: "Active", invested: "$5,000", units: 5, joined: "Jun 1, 2025", location: "LA, CA", source: "Maria Santos", label: "Investor" },
    { name: "Michael Brown", pic: "M", status: "Active", invested: "$8,000", units: 8, joined: "Jun 5, 2025", location: "Chicago, IL", source: "Maria Santos", label: "Investor + Builder" },
    { name: "Emily Davis", pic: "E", status: "Pending", invested: "$3,000", units: 3, joined: "Jun 8, 2025", location: "Houston, TX", source: "Maria Santos", label: "Early Access Member" },
    { name: "Chris Park", pic: "C", status: "Active", invested: "$12,000", units: 12, joined: "Jun 10, 2025", location: "Atlanta, GA", source: "David Chen", label: "Investor" },
    { name: "Ana Torres", pic: "A", status: "Active", invested: "$6,000", units: 6, joined: "Jun 12, 2025", location: "San Diego, CA", source: "David Chen", label: "Builder" },
    null, null, null, null,
  ],
};

const MEMBER_ROLE: "Investor" | "Builder" = "Builder";
// Builder = Investor + Referral Matrix

const allTabs = [
  { id: "overview", label: "Overview", ico: <LayoutDashboard size={20} />, roles: ["Investor", "Builder"] },
  { id: "units", label: "Founder Units", ico: <Star size={20} />, roles: ["Investor", "Builder"] },
  { id: "reports", label: "Reports & Documents", ico: <TrendingUp size={20} />, roles: ["Investor", "Builder"] },
  { id: "docs", label: "Documents", ico: <FolderOpen size={20} />, roles: ["Investor", "Builder"] },
  { id: "withdrawals", label: "Withdrawals", ico: <Wallet size={20} />, roles: ["Investor", "Builder"] },
  { id: "matrix", label: "Referral Matrix", ico: <Network size={20} />, roles: ["Builder"] },
  { id: "announcements", label: "Announcements", ico: <Megaphone size={20} />, roles: ["Investor", "Builder"] },
  { id: "chat", label: "Support / Chat", ico: <MessageSquare size={20} />, roles: ["Investor", "Builder"] },
  { id: "milestones", label: "Milestones", ico: <Award size={20} />, roles: ["Investor", "Builder"] },
  { id: "certificates", label: "Certificates", ico: <FileText size={20} />, roles: ["Investor", "Builder"] },
  { id: "settings", label: "Settings", ico: <Settings size={20} />, roles: ["Investor", "Builder"] },
];

const tabs = allTabs.filter(t => t.roles.includes(MEMBER_ROLE));

export default function BuilderPortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerMember, setDrawerMember] = useState<typeof matrixMembers.l1[0] | null>(null);
  const [matrixFull, setMatrixFull] = useState(false);
  const [compOpen, setCompOpen] = useState(false);
  const [matrixAnimated, setMatrixAnimated] = useState(false);
  const [chartDraw, setChartDraw] = useState(false);
  const [donutAnim, setDonutAnim] = useState(false);
  // Supabase-backed announcements
  const [announcements, setAnnouncements] = useState<any[]>([]);
  // Supabase-backed support
  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [activeTicket, setActiveTicket] = useState<any>(null);
  const [ticketMessages, setTicketMessages] = useState<any[]>([]);
  const [chatMsg, setChatMsg] = useState("");
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMsg, setNewTicketMsg] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);
  // Certificate generation
  const [certName, setCertName] = useState("");
  const [certUnits, setCertUnits] = useState(10);
  const [certGenerated, setCertGenerated] = useState(false);
  // Onboarding tutorial
  const [showTutorial, setShowTutorial] = useState(true);

  const switchTab = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  useEffect(() => { setTimeout(() => setChartDraw(true), 300); setTimeout(() => setDonutAnim(true), 600); fetchAnnouncements(); fetchMyTickets(); }, []);

  const fetchAnnouncements = async () => {
    try {
      const role = MEMBER_ROLE === "Builder" ? "builder" : "investor";
      const res = await fetch(`/api/announcements?role=${role}`);
      if (res.ok) { const data = await res.json(); setAnnouncements(data); }
    } catch (err) { console.error(err); }
  };

  const fetchMyTickets = async () => {
    try {
      const res = await fetch('/api/support?member_id=lorenzo');
      if (res.ok) { const data = await res.json(); setMyTickets(data.tickets || []); }
    } catch (err) { console.error(err); }
  };

  const fetchMessages = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/support?ticket_id=${ticketId}`);
      if (res.ok) { const data = await res.json(); setTicketMessages(data.messages || []); }
    } catch (err) { console.error(err); }
  };

  const handleCreateTicket = async () => {
    if (!newTicketSubject.trim()) return;
    try {
      const res = await fetch('/api/support', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_ticket', member_id: 'lorenzo', member_name: 'Lorenzo', member_email: 'lorenzo@selectnetwork.com', member_role: MEMBER_ROLE === 'Builder' ? 'builder' : 'investor', subject: newTicketSubject, message: newTicketMsg, priority: 'normal' })
      });
      if (res.ok) {
        const data = await res.json();
        setNewTicketSubject(''); setNewTicketMsg(''); setShowNewTicket(false);
        fetchMyTickets();
        if (data?.[0]) { setActiveTicket(data[0]); fetchMessages(data[0].id); }
      }
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = async () => {
    if (!chatMsg.trim() || !activeTicket) return;
    try {
      await fetch('/api/support', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_message', ticket_id: activeTicket.id, sender_id: 'lorenzo', sender_name: 'Lorenzo', sender_role: 'member', message: chatMsg })
      });
      setChatMsg('');
      fetchMessages(activeTicket.id);
    } catch (err) { console.error(err); }
  };
  useEffect(() => { if (activeTab === "matrix") setTimeout(() => setMatrixAnimated(true), 100); }, [activeTab]);

  const units = useCountUp(50);
  const reports = useCountUp(8);
  const balance = useCountUp(5230);
  const referrals = useCountUp(28);

  const openDrawer = (m: typeof matrixMembers.l1[0]) => setDrawerMember(m);

  const labelStyle = (label?: string): React.CSSProperties => {
    const map: Record<string, { bg: string; fg: string }> = {
      "Founder Member": { bg: "#fff3d6", fg: "#8a5a00" },
      "Investor": { bg: "#e3f5eb", fg: "#087345" },
      "Builder": { bg: "#e7f0ff", fg: "#1e4fa3" },
      "Investor + Builder": { bg: "#efe7ff", fg: "#5b34a3" },
      "Early Access Member": { bg: "#fde8f3", fg: "#a3346e" },
    };
    const c = map[label || ""] || { bg: "#f0f2f5", fg: "#667085" };
    return { padding: "2px 8px", borderRadius: 99, background: c.bg, color: c.fg, fontSize: 9, fontWeight: 900, textTransform: "uppercase" as const, letterSpacing: ".03em" };
  };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: "#071a33", background: "#fcfbf8" }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="sn-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="sn-portal-grid" style={{ display: "grid", gridTemplateColumns: "296px 1fr", minHeight: "100vh" }}>
        {/* ─── Sidebar ─── */}
        <aside className={`sn-sidebar ${sidebarOpen ? "open" : ""}`} style={{ background: "linear-gradient(180deg,#fff 0%,#fbf8f1 54%,#edf6ef 100%)", borderRight: "1px solid #e7e2d8", padding: "24px 18px", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
          <div style={{ marginBottom: 28 }}>
            <Link href=""><Image src="/assets/select-network/select-network-logo.png" alt="Select Network" width={245} height={60} style={{ width: 220, height: "auto", display: "block" }} /></Link>
          </div>
          <nav style={{ display: "grid", gap: 7 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => switchTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "14px 16px", border: 0, borderRadius: 12, background: activeTab === t.id ? "linear-gradient(135deg,#075933,#0d6d42)" : "transparent", color: activeTab === t.id ? "#fff" : "#10233b", fontWeight: 800, fontSize: 15, transition: ".25s", transform: activeTab === t.id ? "translateX(3px)" : "none", boxShadow: activeTab === t.id ? "0 0 22px rgba(213,168,61,.55)" : "none", cursor: "pointer" }}>
                <span style={{ width: 27, color: activeTab === t.id ? "#ffd46f" : "#c48817", display: "flex", justifyContent: "center" }}>{t.ico}</span>{t.label}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 34, background: "linear-gradient(135deg,#075933,#06351f)", color: "#fff", border: "1px solid rgba(213,168,61,.55)", boxShadow: "0 16px 40px rgba(5,20,45,.10)", padding: 20, borderRadius: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontFamily: "Georgia, serif", color: "#f6d486" }}>Need Assistance?</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13 }}>Our team is here to help.</p>
            <button className="sn-btn-gold sn-btn" style={{ padding: "12px 16px", fontSize: 12, borderRadius: 8, border: 0, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer" }}>Contact Support →</button>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main style={{ padding: "28px 30px 48px", minWidth: 0 }}>
          {/* ── MOBILE APP HEADER (hidden on desktop via CSS) ── */}
          <div className="sn-app-topbar" style={{ display: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="sn-mobile-toggle" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#bd8e28", textTransform: "uppercase" }}>Investor Portal</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{tabs.find(t => t.id === activeTab)?.label || "Overview"}</div>
              </div>
            </div>
            <div className="sn-topbar-right">
              <span style={{ position: "relative", cursor: "pointer" }}><Bell size={20} color="#ffd46f" /><span style={{ position: "absolute", top: -4, right: -6, background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 900, padding: "1px 4px", borderRadius: 99 }}>2</span></span>
              <div className="sn-avatar-sm">L</div>
            </div>
          </div>

          {/* ── DESKTOP TOP BAR (hidden on mobile via CSS) ── */}
          <div className="sn-desktop-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="sn-mobile-toggle" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
              <div>
              <div style={{ fontSize: 13, color: "#667085" }}>Welcome back to your builder portal</div>
              <h1 style={{ margin: "4px 0 0", fontSize: 28, fontFamily: "Georgia, serif", fontWeight: 400 }}>Good morning, Lorenzo.</h1>
            </div></div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <span style={{ position: "relative", cursor: "pointer" }}><Bell size={22} color="#667085" /><span style={{ position: "absolute", top: -4, right: -8, background: "#dc2626", color: "#fff", fontSize: 10, fontWeight: 900, padding: "2px 5px", borderRadius: 99 }}>2</span></span>
              <span style={{ position: "relative", cursor: "pointer" }}><Mail size={22} color="#667085" /><span style={{ position: "absolute", top: -4, right: -8, background: "#dc2626", color: "#fff", fontSize: 10, fontWeight: 900, padding: "2px 5px", borderRadius: 99 }}>1</span></span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 16 }}>L</div>
                <div className="sn-user-desktop"><b style={{ fontSize: 14 }}>Lorenzo</b> <span style={{ background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 7px", borderRadius: 4, verticalAlign: "middle" }}>Foundation Partner</span><br /><small style={{ color: "#667085" }}>Founder · Investor + Builder</small></div>
              </div>
            </div>
          </div>

          {/* ─── OVERVIEW ─── */}
          {activeTab === "overview" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              {/* Onboarding Tutorial */}
              {showTutorial && (
                <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", border: "2px solid #bd8e28", borderRadius: 16, padding: "24px 28px", marginBottom: 22, position: "relative" }}>
                  <button onClick={() => setShowTutorial(false)} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", color: "#ffd46f", fontSize: 18, cursor: "pointer", fontWeight: 900 }}>✕</button>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, color: "#fff", margin: "0 0 4px" }}>Welcome to Your Builder Dashboard!</h3>
                  <p style={{ color: "#c6d2e1", fontSize: 12.5, margin: "0 0 16px" }}>You have full investor access plus the Referral Matrix. Here&apos;s a quick guide:</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                    {[
                      { title: "Overview", desc: "KPIs, charts, portfolio at a glance", highlight: false },
                      { title: "Referral Matrix", desc: "Your downline tree & builder tools", highlight: true },
                      { title: "Certificates", desc: "View & download your certificates", highlight: true },
                      { title: "Support", desc: "Contact our team directly", highlight: false },
                    ].map((t, i) => (
                      <div key={i} style={{ background: t.highlight ? "rgba(189,142,40,.15)" : "rgba(255,255,255,.06)", border: t.highlight ? "1px solid #bd8e28" : "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                        <b style={{ fontSize: 11, color: t.highlight ? "#ffd46f" : "#fff", display: "block", marginBottom: 3 }}>{t.title}</b>
                        <span style={{ fontSize: 10, color: "#9cb3d0" }}>{t.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* KPIs */}
              <div className="sn-kpi-grid-6" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14, marginBottom: 22 }}>
                {[
                  { ico: <Diamond size={20} />, label: "Member Status", value: "Active", color: "#075933" },
                  { ico: <Star size={20} />, label: "Founder Units", value: String(units), color: "#071a33" },
                  { ico: <Wallet size={20} />, label: "Unit Price", value: "$100", color: "#071a33" },
                  { ico: <CheckCircle size={20} />, label: "KYC Status", value: "Verified", color: "#075933" },
                  { ico: <FileText size={20} />, label: "Reports", value: String(reports), color: "#071a33" },
                  { ico: <TrendingUp size={20} />, label: "Available Balance", value: `$${balance.toLocaleString()}`, color: "#075933" },
                ].map((k, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 16px", boxShadow: "0 8px 24px rgba(5,20,45,.06)", display: "flex", alignItems: "center", gap: 14, transition: ".3s", cursor: "pointer", animationDelay: `${i * 80}ms` }} className="hover:translate-y-[-3px] hover:shadow-[0_16px_40px_rgba(5,20,45,.10)]">
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#c48817" }}>{k.ico}</div>
                    <div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{k.label}</small><br /><b style={{ fontSize: 18, color: k.color }}>{k.value}</b></div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, marginBottom: 18 }}>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 4px" }}>Quarterly Distribution Overview</h2>
                  <p style={{ fontSize: 12, color: "#667085", margin: "0 0 16px" }}>Placeholder values — updated each quarter when distributions are posted.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                    {[
                      { q: "Q1", val: "$0", note: "Baseline" },
                      { q: "Q2", val: "$0", note: "Baseline" },
                      { q: "Q3", val: "—", note: "Pending" },
                      { q: "Q4", val: "—", note: "Pending" },
                    ].map((d) => (
                      <div key={d.q} style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>{d.q}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#071a33" }}>{d.val}</div>
                        <div style={{ fontSize: 10, color: "#9aa0ab", marginTop: 4 }}>{d.note}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, borderLeft: "3px solid #bd8e28", background: "#fffaf0", color: "#604b17", padding: "10px 14px", fontSize: 12, borderRadius: "0 6px 6px 0", lineHeight: 1.5 }}>
                    Distribution values are posted quarterly when profits are available through The Select Network reporting system.
                  </div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)", textAlign: "center" }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 16px" }}>Founder Units</h2>
                  <div style={{ width: 170, height: 170, border: "22px solid #075933", borderTopColor: "#d5a83d", borderRadius: "50%", display: "grid", placeItems: "center", margin: "20px auto", transition: "transform 1s ease", transform: donutAnim ? "rotate(360deg)" : "rotate(0deg)" }}>
                    <div style={{ textAlign: "center" }}><b style={{ fontSize: 34 }}>{units}</b><br /><small>Total Units</small></div>
                  </div>
                  <button onClick={() => setActiveTab("units")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "10px 16px", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: ".04em", cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">View Founder Units →</button>
                </div>
              </div>

              {/* Recent Reports + Announcements */}
              <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Recent Reports</h2>
                  {[{ title: "Q2 2025 Investment Report", type: "Quarterly", status: "Published" }, { title: "April 2025 Performance", type: "Monthly", status: "Published" }, { title: "Expansion Milestone", type: "Growth", status: "New" }].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                      <div><b style={{ fontSize: 14 }}>{r.title}</b><br /><small style={{ color: "#667085" }}>{r.type}</small></div>
                      <span style={{ padding: "4px 10px", borderRadius: 99, background: r.status === "New" ? "#fffaf0" : "#e3f5eb", color: r.status === "New" ? "#bd8e28" : "#087345", fontSize: 11, fontWeight: 900 }}>{r.status}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Announcements</h2>
                  {[{ title: "Q2 Report is now available", type: "New Report" }, { title: "Upcoming Investor Webinar", type: "Event" }].map((a, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                      <div><b style={{ fontSize: 14 }}>{a.title}</b><br /><small style={{ color: "#667085" }}>{a.type}</small></div>
                      <span style={{ padding: "4px 10px", borderRadius: 99, background: a.type === "New Report" ? "#e3f5eb" : "#fffaf0", color: a.type === "New Report" ? "#087345" : "#bd8e28", fontSize: 11, fontWeight: 900 }}>{a.type === "New Report" ? "New" : "Event"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── FOUNDER UNITS ─── */}
          {activeTab === "units" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 14, padding: "20px 24px", marginBottom: 22, display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Star size={22} color="#ffd46f" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ margin: 0, color: "#c6d2e1", fontSize: 13.5, lineHeight: 1.7 }}>
                  <b style={{ color: "#ffd46f" }}>What is a Unit?</b> A Unit is a proportional participation allocation within the Select Network investment structure, used to determine an investor&apos;s share of designated company distributions and growth-based revenue participation.
                </p>
              </div>
              <div className="sn-kpi-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
                {[{ ico: <Star size={20} />, label: "Total Owned", value: "50" }, { ico: <Wallet size={20} />, label: "Unit Price", value: "$100" }, { ico: <CheckCircle size={20} />, label: "Active Units", value: "50" }, { ico: <CircleDot size={20} />, label: "Pending Units", value: "0" }].map((k, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 16px", boxShadow: "0 8px 24px rgba(5,20,45,.06)", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#c48817" }}>{k.ico}</div>
                    <div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{k.label}</small><br /><b style={{ fontSize: 18 }}>{k.value}</b></div>
                  </div>
                ))}
              </div>
              <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Unit Ledger</h2>
                  <div className="sn-desktop-table">
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead><tr style={{ borderBottom: "1px solid #e9edf3" }}>{["Date", "Type", "Units", "Amount", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: 10, color: "#667085", fontSize: 11, textTransform: "uppercase", fontWeight: 900 }}>{h}</th>)}</tr></thead>
                      <tbody><tr style={{ borderBottom: "1px solid #eef2f6" }}><td style={{ padding: 12 }}>May 19, 2025</td><td style={{ padding: 12 }}>Initial Founder Units</td><td style={{ padding: 12 }}>50</td><td style={{ padding: 12 }}>$5,000</td><td style={{ padding: 12 }}><span style={{ padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 11, fontWeight: 900 }}>Active</span></td></tr></tbody>
                    </table>
                  </div>
                  <div className="sn-mobile-cards" style={{ display: "none" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><b style={{ fontSize: 15 }}>Initial Founder Units</b><span style={{ padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 11, fontWeight: 900 }}>Active</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Date</span><span className="sn-m-value">May 19, 2025</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Units</span><span className="sn-m-value">50</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Amount</span><span className="sn-m-value">$5,000</span></div>
                    </div>
                  </div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Unit Timeline</h2>
                  <p style={{ color: "#667085", lineHeight: 1.7 }}>Payment submitted → agreement signed → founder units assigned → dashboard activated automatically.</p>
                  <div style={{ marginTop: 16, height: 8, background: "#edf6ef", borderRadius: 99, overflow: "hidden" }}><div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg,#075933,#d5a83d)", borderRadius: 99 }} /></div>
                </div>
              </div>
            </div>
          )}

          {/* ─── REPORTS & DOCUMENTS ─── */}
          {activeTab === "reports" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 14, padding: "20px 24px", marginBottom: 20, display: "flex", gap: 14, alignItems: "flex-start" }}>
                <FolderOpen size={22} color="#ffd46f" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ margin: 0, color: "#c6d2e1", fontSize: 13.5, lineHeight: 1.7 }}>
                  <b style={{ color: "#ffd46f" }}>Member Reports &amp; Documents</b> — This is where you can view unlocked reports, financial summaries, quarterly updates, tax-related documents, and company performance information that are not available on the public report page. Access is provided here because your participation has been completed.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" as const }}>
                <input placeholder="Search reports" style={{ flex: 1, background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" }} />
                <select style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" }}><option>All Types</option><option>Monthly</option><option>Quarterly</option><option>Annual</option><option>Tax</option></select>
                <button style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 18px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">Apply Filters</button>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)", marginBottom: 18 }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Reports &amp; Progress</h2>
                {/* Desktop table */}
                <div className="sn-desktop-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead><tr style={{ borderBottom: "1px solid #e9edf3" }}>{["Report", "Type", "Date", "Status", "Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: 10, color: "#667085", fontSize: 11, textTransform: "uppercase", fontWeight: 900 }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      { title: "Q2 2025 Investment Report", type: "Quarterly", date: "Apr 30", status: "Published" },
                      { title: "April 2025 Performance Report", type: "Monthly", date: "Apr 30", status: "Published" },
                      { title: "Expansion Milestone", type: "Growth", date: "Mar 15", status: "Published" },
                      { title: "Q1 2025 Financial Snapshot", type: "Quarterly", date: "Mar 31", status: "Published" },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #eef2f6" }}>
                        <td style={{ padding: 12, fontWeight: 700 }}>{r.title}</td>
                        <td style={{ padding: 12, color: "#667085" }}>{r.type}</td>
                        <td style={{ padding: 12, color: "#667085" }}>{r.date}</td>
                        <td style={{ padding: 12 }}><span style={{ padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 11, fontWeight: 900 }}>{r.status}</span></td>
                        <td style={{ padding: 12 }}>
                          <button style={{ background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "6px 12px", fontWeight: 900, fontSize: 11, cursor: "pointer", marginRight: 6, transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">View</button>
                          <button style={{ background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "6px 12px", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                {/* Mobile cards */}
                <div className="sn-mobile-cards">
                  {[
                    { title: "Q2 2025 Investment Report", type: "Quarterly", date: "Apr 30", status: "Published" },
                    { title: "April 2025 Performance Report", type: "Monthly", date: "Apr 30", status: "Published" },
                    { title: "Expansion Milestone", type: "Growth", date: "Mar 15", status: "Published" },
                    { title: "Q1 2025 Financial Snapshot", type: "Quarterly", date: "Mar 31", status: "Published" },
                  ].map((r, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <b style={{ fontSize: 14 }}>{r.title}</b>
                        <span style={{ padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>{r.status}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#667085", marginBottom: 10 }}>
                        <span>{r.type}</span><span>•</span><span>{r.date}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "8px 14px", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>View</button>
                        <button style={{ background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "8px 14px", fontWeight: 900, fontSize: 11, cursor: "pointer" }}>Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private documents section — unlocked for members */}
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 6px" }}>Quarterly &amp; Tax Reports</h2>
                <p style={{ color: "#667085", fontSize: 13, lineHeight: 1.6, margin: "0 0 18px" }}>Full quarterly updates, tax-related documents, and detailed financial report files — available exclusively inside the investor dashboard after participation is completed.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                  {[
                    { label: "Q1 2025 Quarterly Update", scope: "Q1 2025", status: "Published" },
                    { label: "Q2 2025 Quarterly Update", scope: "Q2 2025", status: "Published" },
                    { label: "2024 Annual Tax Report", scope: "FY 2024", status: "Available" },
                    { label: "Q1 2025 Tax Summary", scope: "Q1 2025", status: "Available" },
                    { label: "Q2 2025 Tax Summary", scope: "Q2 2025", status: "Available" },
                    { label: "IRS Supporting Docs", scope: "All Years", status: "Available" },
                  ].map((r, i) => (
                    <div key={i} style={{ background: "#fbf9f4", border: "1px solid #e7e2d8", borderRadius: 10, padding: "14px 16px" }}>
                      <b style={{ fontSize: 13, display: "block", marginBottom: 4 }}>{r.label}</b>
                      <span style={{ fontSize: 11, color: "#667085", display: "block", marginBottom: 10 }}>{r.scope}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ padding: "3px 8px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 10, fontWeight: 900 }}>{r.status}</span>
                        <button style={{ background: "linear-gradient(135deg,#0b5b34,#08431f)", color: "#fff", border: 0, borderRadius: 6, padding: "5px 10px", fontWeight: 900, fontSize: 10, cursor: "pointer" }}>View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── DOCUMENTS ─── */}
          {activeTab === "docs" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              {/* Featured: Compensation Plan */}
              <div style={{ background: "linear-gradient(135deg,#fbf9f4,#fff)", border: "1px solid #e7d9b6", borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 30px rgba(5,20,45,.07)", marginBottom: 18 }}>
                <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 0, alignItems: "stretch" }}>
                  <button onClick={() => setCompOpen(true)} style={{ position: "relative", border: 0, padding: 0, cursor: "pointer", background: "#0a2240", minHeight: 180, overflow: "hidden" }} aria-label="Open compensation plan">
                    <Image src="/assets/select-network/select-network-comp-plan.png" alt="Select Network Compensation Plan" width={520} height={340} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(7,26,51,.3)" }}><span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(7,26,51,.7)", color: "#fff", padding: "8px 14px", borderRadius: 99, fontSize: 11, fontWeight: 800, textTransform: "uppercase", border: "1px solid rgba(213,168,61,.5)" }}>View</span></span>
                  </button>
                  <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#bd8e28", fontSize: 10.5, fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}><FileText size={14} /> Official Document</div>
                    <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 8px" }}>Select Network Compensation Plan</h3>
                    <p style={{ color: "#667085", fontSize: 13, lineHeight: 1.6, margin: "0 0 16px", maxWidth: 480 }}>Official unit investment and quarterly profit distribution overview. $100 per unit; available quarterly profit distributed equally across all units.</p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button onClick={() => setCompOpen(true)} style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "10px 16px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer" }}>View Document</button>
                      <a href="/assets/select-network/select-network-comp-plan.png" download="Select-Network-Compensation-Plan.png" style={{ background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", borderRadius: 8, padding: "10px 16px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Download</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Other documents */}
              <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                {[
                  { title: "Signed Agreement", desc: "Member agreement and approval package." },
                  { title: "KYC Documents", desc: "Identity confirmation and compliance files." },
                  { title: "Investor Notices", desc: "Published notices and updates." },
                  { title: "Financial Documents", desc: "Approved financial summaries and reports." },
                  { title: "Legal Updates", desc: "Operating agreement amendments and legal notices." },
                  { title: "Tax Documents", desc: "W-9 forms and year-end tax documents." },
                ].map((d, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)", transition: ".3s" }} className="hover:translate-y-[-3px] hover:shadow-[0_16px_40px_rgba(5,20,45,.10)]">
                    <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>{d.title}</h3>
                    <p style={{ color: "#667085", fontSize: 13, lineHeight: 1.5, margin: "0 0 16px" }}>{d.desc}</p>
                    <button style={{ background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "8px 14px", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── WITHDRAWALS ─── */}
          {activeTab === "withdrawals" && (
            <div className="sn-mobile-content sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Request Withdrawal</h2>
                <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", marginBottom: 6 }}>Amount</label><input defaultValue="$500" style={{ width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" }} /></div>
                <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", marginBottom: 6 }}>Status</label><select style={{ width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" }}><option>Pending Review</option></select></div>
                <button style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "14px 20px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", transition: ".25s", width: "100%" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">Submit Request</button>
                <div style={{ marginTop: 14, borderLeft: "4px solid #bd8e28", background: "#fffaf0", color: "#604b17", padding: "12px 14px", lineHeight: 1.55, fontSize: 12, borderRadius: "0 6px 6px 0" }}>Withdrawal requests remain pending until admin approval.</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Withdrawal History</h2>
                <div className="sn-desktop-table">
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: "1px solid #e9edf3" }}>{["Date", "Amount", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: 10, color: "#667085", fontSize: 11, textTransform: "uppercase", fontWeight: 900 }}>{h}</th>)}</tr></thead>
                    <tbody><tr style={{ borderBottom: "1px solid #eef2f6" }}><td style={{ padding: 12 }}>Jun 1</td><td style={{ padding: 12 }}>$500</td><td style={{ padding: 12 }}><span style={{ padding: "4px 10px", borderRadius: 99, background: "#fffaf0", color: "#bd8e28", fontSize: 11, fontWeight: 900 }}>Pending</span></td></tr></tbody>
                  </table>
                </div>
                <div className="sn-mobile-cards" style={{ display: "none" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><b style={{ fontSize: 15 }}>Withdrawal Request</b><span style={{ padding: "4px 10px", borderRadius: 99, background: "#fffaf0", color: "#bd8e28", fontSize: 11, fontWeight: 900 }}>Pending</span></div>
                    <div className="sn-m-card-row"><span className="sn-m-label">Date</span><span className="sn-m-value">Jun 1</span></div>
                    <div className="sn-m-card-row"><span className="sn-m-label">Amount</span><span className="sn-m-value">$500</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── REFERRAL MATRIX ─── */}
          {activeTab === "matrix" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div className="sn-kpi-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
                {[{ ico: <Network size={20} />, label: "My Network", value: String(referrals) }, { ico: <Network size={20} />, label: "Direct Referrals", value: "3" }, { ico: <CheckCircle size={20} />, label: "Active Members", value: String(referrals) }, { ico: <Network size={20} />, label: "Downline Capacity", value: `${referrals} / 40` }].map((k, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 16px", boxShadow: "0 8px 24px rgba(5,20,45,.06)", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#c48817" }}>{k.ico}</div>
                    <div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase" }}>{k.label}</small><br /><b style={{ fontSize: 18 }}>{k.value}</b></div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" as const }}>
                <input placeholder="Search members..." style={{ flex: 1, minWidth: 180, background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "10px 16px", fontSize: 13, outline: "none" }} />
                {["All", "Active", "Pending", "Paused"].map(f => (
                  <button key={f} style={{ background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "8px 14px", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px]">{f}</button>
                ))}
                <button onClick={() => setMatrixFull(true)} style={{ background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", border: 0, borderRadius: 8, padding: "8px 16px", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">View Full Matrix</button>
              </div>

              {/* Matrix Board */}
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)", overflow: "auto" }}>
                <h2 className="serif" style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 6px" }}>My Referral Network</h2>
                <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "#667085", lineHeight: 1.5 }}>The Select Network investor referral matrix. As an individual member, your personal downline participation is capped at <b>40 members</b>. The structure below expands in depth and width as your team grows, up to your personal cap. This is separate from Lorenzo&apos;s Dog Training Team trainer hierarchy shown under Investment Reports.</p>
                {/* Downline Capacity Tracker */}
                <div style={{ background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 12, padding: "14px 18px", marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <small style={{ fontSize: 11.5, fontWeight: 900, color: "#075933", textTransform: "uppercase", letterSpacing: ".04em" }}>Personal Downline Capacity</small>
                    <b style={{ fontSize: 13, color: "#075933" }}>{referrals} / 40 used</b>
                  </div>
                  <div style={{ height: 10, borderRadius: 99, background: "#e7e2d8", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(100, (referrals / 40) * 100)}%`, borderRadius: 99, background: "linear-gradient(90deg,#0d6d42,#bd8e28)", transition: "width .8s ease" }} />
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 11.5, color: "#667085" }}>{40 - referrals} participation slots remaining in your personal downline. Once your cap is reached, new members are placed in your extended organization but no longer count toward your personal participation limit.</p>
                </div>
                {/* Self */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(20px)", transition: "all .6s ease" }}>
                  <div onClick={() => openDrawer(matrixMembers.self as any)} style={{ background: "#fff", border: "2px solid #bd8e28", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 8px 24px rgba(5,20,45,.06)", transition: ".3s" }} className="hover:translate-y-[-3px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 18 }}>L</div>
                    <div><b>Lorenzo</b><br /><small style={{ color: "#667085" }}>You • Joined May 19, 2025</small><div style={{ fontSize: 12, color: "#5b6675", marginTop: 2 }}>Invested $50,000 | Units 50</div><span style={{ padding: "3px 8px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 10, fontWeight: 900 }}>Active</span></div>
                  </div>
                </div>
                {/* Connector */}
                <div style={{ height: 24, width: 2, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto", opacity: matrixAnimated ? 1 : 0, transition: "opacity .4s ease .3s" }} />
                {/* Level 1 */}
                <div style={{ marginBottom: 10, opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(20px)", transition: "all .6s ease .4s" }}>
                  <div style={{ textAlign: "center", fontSize: 12, fontWeight: 900, color: "#075933", marginBottom: 8 }}>Level 1 — 3 Members</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {matrixMembers.l1.map((m, i) => (
                      <div key={i} onClick={() => openDrawer(m)} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 12, padding: 14, cursor: "pointer", transition: ".3s", boxShadow: "0 8px 22px rgba(5,20,45,.06)" }} className="hover:translate-y-[-3px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)] hover:border-[#bd8e28]">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#075933", fontWeight: 900, fontSize: 14 }}>{m.pic}</div>
                          <div><b style={{ fontSize: 13 }}>{m.name}</b><br /><small style={{ color: "#667085", fontSize: 11 }}>Joined {m.joined.split(",")[0].split(" ").slice(0, 2).join(" ")}</small></div>
                        </div>
                        <div style={{ fontSize: 11, color: "#5b6675", marginTop: 8 }}>{m.invested} | {m.units} Units</div>
                        <span style={{ padding: "3px 8px", borderRadius: 99, background: m.status === "Active" ? "#e3f5eb" : "#fffaf0", color: m.status === "Active" ? "#087345" : "#bd8e28", fontSize: 10, fontWeight: 900 }}>{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Connector */}
                <div style={{ height: 20, width: 2, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto", opacity: matrixAnimated ? 1 : 0, transition: "opacity .4s ease .7s" }} />
                {/* Level 2 — All 9 slots */}
                <div style={{ opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(20px)", transition: "all .6s ease .8s" }}>
                  <div style={{ textAlign: "center", fontSize: 12, fontWeight: 900, color: "#075933", marginBottom: 8 }}>Level 2 — 9 Slots</div>
                  <div className="sn-matrix-l2" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                    {Array.from({ length: 9 }).map((_, i) => {
                      const m = matrixMembers.l2[i];
                      return m ? (
                        <div key={i} onClick={() => openDrawer(m)} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 10, padding: 10, textAlign: "center", cursor: "pointer", transition: ".3s", fontSize: 12, boxShadow: "0 4px 12px rgba(5,20,45,.04)" }} className="hover:translate-y-[-2px] hover:border-[#bd8e28]">
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 4px", fontSize: 11, fontWeight: 900, color: "#075933" }}>{m.pic}</div>
                          <b style={{ fontSize: 11 }}>{m.name.split(" ")[0]}</b><br />
                          <span style={{ padding: "2px 6px", borderRadius: 99, background: m.status === "Active" ? "#e3f5eb" : "#fffaf0", color: m.status === "Active" ? "#087345" : "#bd8e28", fontSize: 9, fontWeight: 900 }}>{m.status}</span>
                        </div>
                      ) : (
                        <div key={i} style={{ background: "#f9f6ef", border: "1px dashed #e7e2d8", borderRadius: 10, padding: 10, textAlign: "center", fontSize: 11, color: "#667085" }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px dashed #c7e2d0", margin: "0 auto 4px", background: "#fff" }} />
                          <span style={{ fontSize: 10 }}>Available</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Connector */}
                <div style={{ height: 20, width: 2, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto", opacity: matrixAnimated ? 1 : 0, transition: "opacity .4s ease 1s" }} />
                {/* Level 3 — All 27 slots */}
                <div style={{ opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(20px)", transition: "all .6s ease 1.1s" }}>
                  <div style={{ textAlign: "center", fontSize: 12, fontWeight: 900, color: "#075933", marginBottom: 8 }}>Level 3 — 27 Slots</div>
                  <div className="sn-matrix-l3" style={{ display: "grid", gridTemplateColumns: "repeat(9,1fr)", gap: 6 }}>
                    {Array.from({ length: 27 }).map((_, i) => {
                      const filledL3 = [
                        { name: "Tyler Reed", pic: "T", status: "Active" },
                        { name: "Keisha Moore", pic: "K", status: "Active" },
                        { name: "Ryan Scott", pic: "R", status: "Pending" },
                      ];
                      const m = i < filledL3.length ? filledL3[i] : null;
                      return m ? (
                        <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "8px 4px", textAlign: "center", fontSize: 10, transition: ".3s", cursor: "pointer" }} className="hover:translate-y-[-2px] hover:border-[#bd8e28]">
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 3px", fontSize: 9, fontWeight: 900, color: "#075933" }}>{m.pic}</div>
                          <b style={{ fontSize: 9 }}>{m.name.split(" ")[0]}</b><br />
                          <span style={{ padding: "1px 4px", borderRadius: 99, background: m.status === "Active" ? "#e3f5eb" : "#fffaf0", color: m.status === "Active" ? "#087345" : "#bd8e28", fontSize: 8, fontWeight: 900 }}>{m.status}</span>
                        </div>
                      ) : (
                        <div key={i} style={{ background: "#f9f6ef", border: "1px dashed #e7e2d8", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px dashed #c7e2d0", margin: "0 auto 3px", background: "#fff" }} />
                          <span style={{ fontSize: 9, color: "#667085" }}>Open</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── INVESTOR COMMUNICATIONS ─── */}
          {activeTab === "announcements" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 14, padding: "20px 24px", color: "#fff", marginBottom: 18, display: "flex", alignItems: "center", gap: 14 }}>
                <Megaphone size={26} color="#ffd46f" />
                <div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: 0 }}>Announcements</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#c6d2e1" }}>Official announcements from the Select Network team. {announcements.length > 0 ? `${announcements.length} announcement${announcements.length > 1 ? "s" : ""}.` : ""}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {announcements.length === 0 && (
                  <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 12, padding: "40px 20px", textAlign: "center", color: "#667085" }}>
                    <Megaphone size={32} color="#e7e2d8" style={{ margin: "0 auto 12px", display: "block" }} />
                    <p style={{ fontSize: 14, margin: 0 }}>No announcements yet. Check back soon.</p>
                  </div>
                )}
                {announcements.map((a: any) => (
                  <div key={a.id} style={{ background: "#fff", border: "1px solid #e7e2d8", borderLeft: a.priority === "urgent" ? "4px solid #dc2626" : "1px solid #e7e2d8", borderRadius: 12, padding: "18px 20px", boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>SN</div>
                        <div>
                          <b style={{ fontSize: 15 }}>{a.title}</b>
                          <div style={{ fontSize: 11.5, color: "#667085", margin: "2px 0 8px" }}>Select Network Team · {a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"}</div>
                          {a.message && <p style={{ margin: 0, fontSize: 13.5, color: "#3d4a57", lineHeight: 1.6, maxWidth: 640 }}>{a.message}</p>}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        {a.priority === "urgent" && <span style={{ padding: "4px 10px", borderRadius: 99, background: "#fde8e8", color: "#dc2626", fontSize: 10, fontWeight: 900 }}>Urgent</span>}
                        <span style={{ padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 10, fontWeight: 900 }}>{a.audience === "all" ? "All" : a.audience}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CHAT / SUPPORT ─── */}
          {activeTab === "chat" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 4px" }}>Support / Chat</h2>
                    <p style={{ color: "#667085", fontSize: 12.5, margin: 0 }}>Contact the Select Network support team. All conversations are private.</p>
                  </div>
                  <button onClick={() => setShowNewTicket(true)} style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "10px 16px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer" }}>+ New Ticket</button>
                </div>

                {/* New Ticket Form */}
                {showNewTicket && (
                  <div style={{ background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 12, padding: 20, marginBottom: 16 }}>
                    <h3 style={{ margin: "0 0 12px", fontSize: 16, fontFamily: "Georgia, serif", fontWeight: 400 }}>Create Support Ticket</h3>
                    <div style={{ marginBottom: 10 }}><label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>Subject</label><input value={newTicketSubject} onChange={(e) => setNewTicketSubject(e.target.value)} placeholder="What do you need help with?" style={{ width: "100%", background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none" }} /></div>
                    <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>Message</label><textarea value={newTicketMsg} onChange={(e) => setNewTicketMsg(e.target.value)} rows={3} placeholder="Describe your question or issue..." style={{ width: "100%", background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none", resize: "none" as const }} /></div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={handleCreateTicket} disabled={!newTicketSubject.trim()} style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "10px 16px", fontWeight: 900, fontSize: 12, cursor: "pointer", opacity: newTicketSubject.trim() ? 1 : 0.5 }}>Submit Ticket</button>
                      <button onClick={() => setShowNewTicket(false)} style={{ background: "#fff", color: "#667085", border: "1px solid #e7e2d8", borderRadius: 8, padding: "10px 16px", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 0, minHeight: 360, border: "1px solid #e7e2d8", borderRadius: 12, overflow: "hidden" }}>
                  {/* Ticket List */}
                  <div style={{ background: "#f9f6ef", borderRight: "1px solid #e7e2d8", overflowY: "auto", maxHeight: 400 }}>
                    {myTickets.length === 0 && <p style={{ padding: 16, color: "#667085", fontSize: 13 }}>No support tickets. Click &quot;+ New Ticket&quot; to start.</p>}
                    {myTickets.map((t: any) => (
                      <div key={t.id} onClick={() => { setActiveTicket(t); fetchMessages(t.id); }} style={{ padding: "12px 14px", borderBottom: "1px solid #eef2f6", cursor: "pointer", background: activeTicket?.id === t.id ? "#fff" : "transparent", transition: ".2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                          <b style={{ fontSize: 12 }}>{t.subject}</b>
                          <span style={{ padding: "2px 6px", borderRadius: 99, background: t.status === "open" ? "#e3f5eb" : t.status === "resolved" ? "#e7f0ff" : "#f0f2f5", color: t.status === "open" ? "#087345" : t.status === "resolved" ? "#1e4fa3" : "#667085", fontSize: 9, fontWeight: 900 }}>{t.status}</span>
                        </div>
                        <span style={{ fontSize: 10, color: "#9ca3af" }}>{new Date(t.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </div>
                    ))}
                  </div>
                  {/* Message Thread */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {activeTicket ? (
                      <>
                        <div style={{ padding: "10px 16px", borderBottom: "1px solid #e7e2d8", background: "#fff", fontSize: 13 }}>
                          <b>{activeTicket.subject}</b> · <span style={{ color: "#667085" }}>{activeTicket.status}</span>
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", padding: 14, maxHeight: 260, background: "#fafaf8" }}>
                          {ticketMessages.length === 0 && <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", marginTop: 30 }}>No messages yet.</p>}
                          {ticketMessages.map((m: any) => (
                            <div key={m.id} style={{ alignSelf: m.sender_role === "member" ? "flex-end" : "flex-start", background: m.sender_role === "member" ? "linear-gradient(135deg,#075933,#0b7346)" : "#fff", color: m.sender_role === "member" ? "#fff" : "#071a33", border: m.sender_role === "admin" ? "1px solid #e7e2d8" : "none", borderRadius: m.sender_role === "member" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "10px 14px", maxWidth: "80%", fontSize: 13 }}>
                              {m.sender_role === "admin" && <b style={{ fontSize: 11, display: "block", marginBottom: 3, color: "#075933" }}>Support</b>}
                              {m.message}
                              <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>{new Date(m.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</div>
                            </div>
                          ))}
                        </div>
                        {activeTicket.status !== "closed" && (
                          <div style={{ display: "flex", gap: 10, padding: "10px 14px", borderTop: "1px solid #e7e2d8" }}>
                            <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }} placeholder="Type a message..." style={{ flex: 1, background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none" }} />
                            <button onClick={handleSendMessage} disabled={!chatMsg.trim()} style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "10px 16px", fontWeight: 900, fontSize: 12, cursor: "pointer", opacity: chatMsg.trim() ? 1 : 0.5 }}>Send</button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#9ca3af", fontSize: 13, padding: 20 }}>Select a ticket or create a new one</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── MILESTONES ─── */}
          {activeTab === "milestones" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 14px" }}>Milestones & Progress</h2>
                <p style={{ color: "#667085", fontSize: 13, marginBottom: 18 }}>Track your journey through Select Network achievements.</p>
                {[
                  { title: "Payment Completed", desc: "Your payment was confirmed and your investor dashboard was activated automatically.", done: true },
                  { title: "First Investment Completed", desc: "Successfully purchased your first founder units.", done: true },
                  { title: "First Referral Made", desc: "Referred your first member to the network.", done: true },
                  { title: "10 Active Referrals", desc: "Built a team of 10 active members in your downline.", done: true },
                  { title: "25 Active Referrals", desc: "Reached 25 active members — growing strong.", done: true },
                  { title: "$1,000 Sharing Incentive", desc: "Qualified for the sharing incentive program.", done: false },
                  { title: "40 Member Downline Cap", desc: "Maximum personal downline achieved.", done: false },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #eef2f6" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.done ? "#e3f5eb" : "#f0f2f5", display: "grid", placeItems: "center", color: m.done ? "#087345" : "#9aa0ab", flexShrink: 0 }}>{m.done ? <CheckCircle size={18} /> : <Target size={18} />}</div>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: 14, color: m.done ? "#071a33" : "#9aa0ab" }}>{m.title}</b>
                      <p style={{ fontSize: 12, color: "#667085", margin: "2px 0 0" }}>{m.desc}</p>
                    </div>
                    {m.done && <span style={{ padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>Completed</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CERTIFICATES ─── */}
          {activeTab === "certificates" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              {!certGenerated ? (
                <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 32, boxShadow: "0 8px 24px rgba(5,20,45,.06)", maxWidth: 560, margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}><Award size={28} color="#ffd46f" /></div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "0 0 8px" }}>Generate Your Investment Certificate</h2>
                    <p style={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}>Enter your full name and select how many units you have invested. A branded certificate will be issued directly to your dashboard.</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>Full Name (as it will appear on certificate)</label>
                    <input value={certName} onChange={(e) => setCertName(e.target.value)} placeholder="Enter your full legal name" style={{ width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "14px 16px", fontSize: 15, outline: "none" }} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>Units Invested</label>
                    <select value={certUnits} onChange={(e) => setCertUnits(Number(e.target.value))} style={{ width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "14px 16px", fontSize: 15, outline: "none" }}>
                      {[5, 10, 15, 20, 25, 30, 40, 50, 75, 100].map(u => <option key={u} value={u}>{u} Units (${(u * 100).toLocaleString()})</option>)}
                    </select>
                  </div>
                  <button onClick={() => { if (certName.trim()) setCertGenerated(true); }} disabled={!certName.trim()} style={{ width: "100%", background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 10, padding: "16px 20px", fontWeight: 900, fontSize: 14, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer", opacity: certName.trim() ? 1 : 0.5, transition: ".25s" }}>Generate Certificate</button>
                </div>
              ) : (
                <div>
                  <div id="cert-display" style={{ background: "#fff", border: "3px solid #bd8e28", borderRadius: 16, padding: "48px 56px", maxWidth: 820, margin: "0 auto", boxShadow: "0 20px 60px rgba(5,20,45,.12)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 16, left: 16, width: 60, height: 60, borderTop: "3px solid #d5a83d", borderLeft: "3px solid #d5a83d", borderRadius: "4px 0 0 0" }} />
                    <div style={{ position: "absolute", top: 16, right: 16, width: 60, height: 60, borderTop: "3px solid #d5a83d", borderRight: "3px solid #d5a83d", borderRadius: "0 4px 0 0" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16, width: 60, height: 60, borderBottom: "3px solid #d5a83d", borderLeft: "3px solid #d5a83d", borderRadius: "0 0 0 4px" }} />
                    <div style={{ position: "absolute", bottom: 16, right: 16, width: 60, height: 60, borderBottom: "3px solid #d5a83d", borderRight: "3px solid #d5a83d", borderRadius: "0 0 4px 0" }} />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ marginBottom: 20 }}><Image src="/assets/select-network/select-network-logo.png" alt="Select Network" width={280} height={70} style={{ width: 240, height: "auto", margin: "0 auto", display: "block" }} /></div>
                      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase", color: "#bd8e28", marginBottom: 8 }}>Certificate of Investment</div>
                      <div style={{ width: 80, height: 2, background: "linear-gradient(90deg,transparent,#d5a83d,transparent)", margin: "0 auto 20px" }} />
                      <p style={{ fontSize: 14, color: "#667085", margin: "0 0 12px" }}>This certifies that</p>
                      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 400, color: "#071a33", margin: "0 0 12px", borderBottom: "2px solid #e7e2d8", display: "inline-block", padding: "0 30px 8px" }}>{certName}</h1>
                      <p style={{ fontSize: 14, color: "#667085", margin: "16px 0 8px" }}>has successfully invested in</p>
                      <div style={{ fontSize: 48, fontWeight: 900, color: "#075933", margin: "8px 0" }}>{certUnits} Founder Units</div>
                      <p style={{ fontSize: 16, color: "#071a33", margin: "4px 0 24px" }}>valued at <b style={{ color: "#bd8e28" }}>${(certUnits * 100).toLocaleString()}</b></p>
                      <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,transparent,#d5a83d,transparent)", margin: "0 auto 20px" }} />
                      <p style={{ fontSize: 13, color: "#667085", margin: "0 0 8px" }}>through The Select Network investment structure</p>
                      <p style={{ fontSize: 12, color: "#9aa0ab", margin: "0 0 24px" }}>Issued: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 30, paddingTop: 20, borderTop: "1px solid #eef2f6" }}>
                        <div style={{ textAlign: "left" }}><div style={{ width: 140, borderBottom: "1px solid #071a33", marginBottom: 4 }} /><div style={{ fontSize: 11, color: "#667085" }}>Authorized Signature</div></div>
                        <div style={{ textAlign: "center" }}><div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px solid #bd8e28", display: "grid", placeItems: "center", margin: "0 auto 4px" }}><Diamond size={24} color="#bd8e28" /></div><div style={{ fontSize: 9, color: "#bd8e28", fontWeight: 900, letterSpacing: ".1em" }}>VERIFIED</div></div>
                        <div style={{ textAlign: "right" }}><div style={{ width: 140, borderBottom: "1px solid #071a33", marginBottom: 4 }} /><div style={{ fontSize: 11, color: "#667085" }}>Date of Issue</div></div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 24 }}>
                    <button onClick={() => setCertGenerated(false)} style={{ background: "#fff", color: "#667085", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 20px", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>← Generate Another</button>
                    <button onClick={() => { if (typeof window !== "undefined") window.print(); }} style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 20px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer" }}>Print / Save as PDF</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activeTab === "settings" && (
            <div className="sn-mobile-content" style={{ maxWidth: 500, animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Settings</h2>
                {[["Name", "Lorenzo"], ["Email", "lorenzo@email.com"]].map(([l, v], i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", marginBottom: 6 }}>{l}</label>
                    <input defaultValue={v} style={{ width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" }} />
                  </div>
                ))}
                <button style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "14px 20px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", transition: ".25s" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">Save Changes</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─── MEMBER DETAIL DRAWER ─── */}
      {drawerMember && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex" }}>
          <div onClick={() => setDrawerMember(null)} style={{ flex: 1, background: "rgba(7,26,51,.3)", backdropFilter: "blur(2px)" }} />
          <div className="sn-drawer" style={{ width: 380, background: "#fff", boxShadow: "-10px 0 40px rgba(5,20,45,.15)", padding: 28, overflow: "auto", animation: "slideInRight .3s ease" }}>
            <button onClick={() => setDrawerMember(null)} style={{ float: "right", background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#667085" }}>✕</button>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 24, margin: "0 auto 12px" }}>{drawerMember.pic}</div>
              <b style={{ fontSize: 20 }}>{drawerMember.name}</b><br />
              <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 6, flexWrap: "wrap" }}>
                <span style={{ padding: "4px 10px", borderRadius: 99, background: drawerMember.status === "Active" ? "#e3f5eb" : "#fffaf0", color: drawerMember.status === "Active" ? "#087345" : "#bd8e28", fontSize: 11, fontWeight: 900 }}>{drawerMember.status}</span>
                {drawerMember.label && <span style={labelStyle(drawerMember.label)}>{drawerMember.label}</span>}
              </div>
            </div>
            {[
              ["Date Joined", drawerMember.joined],
              ["Amount Invested", drawerMember.invested],
              ["Units", String(drawerMember.units)],
              ["Location", drawerMember.location],
              ["Referral Source", drawerMember.source],
              ["Classification", drawerMember.label || "—"],
              ["Status", drawerMember.status],
            ].map(([label, value], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef2f6", fontSize: 14 }}>
                <span style={{ color: "#667085" }}>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── FULL MATRIX MODAL ─── */}
      {matrixFull && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#fcfbf8", overflow: "auto", padding: 40, animation: "fadeIn .3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, margin: 0 }}>Full Referral Matrix</h2>
            <button onClick={() => setMatrixFull(false)} style={{ background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 20px", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>✕ Close</button>
          </div>
          <p style={{ color: "#667085", marginBottom: 24 }}>Your personal downline participation is capped at <b>40 members</b> ({referrals} of 40 currently used). The view below is your starting structure; deeper levels appear as your organization expands, up to your personal cap.</p>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#667085" }}>Full interactive matrix view — connects to live data and reflects your 40-member personal participation cap.</p>
          </div>
        </div>
      )}

      {/* Compensation Plan Lightbox */}
      {compOpen && (
        <div onClick={() => setCompOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(7,26,51,.82)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 24 }}>
          <button onClick={() => setCompOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "#fff", border: 0, borderRadius: "50%", width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer", fontSize: 22, color: "#071a33", boxShadow: "0 6px 20px rgba(0,0,0,.25)" }} aria-label="Close">✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1100, width: "100%", maxHeight: "88vh", overflow: "auto", borderRadius: 12 }}>
            <Image src="/assets/select-network/select-network-comp-plan.png" alt="Select Network Compensation Plan" width={1024} height={640} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
