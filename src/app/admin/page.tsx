"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Binoculars, ClipboardList, Users, Star, CreditCard, BarChart3, FolderOpen, TreePine, Megaphone, Contact, CalendarDays, Settings, ShieldCheck, Bell, Mail, CheckCircle, CircleDot, TrendingUp, Wallet, Menu, LogOut, UserCircle, MessageSquare, Award, Ribbon, FileBarChart, UserRoundPlus } from "lucide-react";
import ReferralNetwork from "../components/ReferralNetwork";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => { if (started.current) return; started.current = true; const s = performance.now(); const step = (n: number) => { const p = Math.min((n - s) / duration, 1); setCount(Math.round(target * p)); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }, [target, duration]);
  return count;
}

const adminTabs = [
  { id: "overview", label: "Overview", ico: "binoculars" },
  { id: "requests", label: "Member Requests", ico: "request" },
  { id: "members", label: "Members", ico: "users" },
  { id: "units", label: "Units", ico: "star" },
  { id: "payments", label: "Payments", ico: "credit" },
  { id: "crm", label: "Prospect CRM", ico: "contact" },
  { id: "scheduler", label: "Scheduler", ico: "calendar" },
  { id: "reports", label: "Reports", ico: "chart" },
  { id: "docs", label: "Documents", ico: "folder" },
  { id: "matrix", label: "My Referral Network", ico: "tree" },
  { id: "announcements", label: "Updates", ico: "megaphone" },
  { id: "chat", label: "Support", ico: "chat" },
  { id: "milestones", label: "Milestones", ico: "award" },
  { id: "certificates", label: "Certificates", ico: "ribbon" },
  { id: "settings", label: "Settings", ico: "settings" },
  { id: "audit", label: "Audit Logs", ico: "shield" },
];

const matrixL1 = [
  { name: "Maria Santos", pic: "M", invested: "$25,000", units: 25, status: "Active", joined: "May 20", location: "Miami, FL", source: "Lorenzo", labels: ["Investor-Builder", "Founder Member", "Qualified for Incentive"] },
  { name: "David Chen", pic: "D", invested: "$10,000", units: 10, status: "Pending", joined: "May 22", location: "New York, NY", source: "Lorenzo", labels: ["Investor", "Pending Review"] },
  { name: "James Wilson", pic: "J", invested: "$15,000", units: 15, status: "Active", joined: "May 28", location: "Dallas, TX", source: "Lorenzo", labels: ["Builder", "Top Builder", "Early Access Member"] },
];

const calendarDays = (() => {
  const days = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
})();

const meetings = [
  { id: 1, title: "Investor Call - Michael Anderson", date: "Jun 2, 2025", time: "10:00 AM", type: "Zoom Presentation", status: "Confirmed", zoom: "https://zoom.us/j/987654321" },
  { id: 2, title: "Onboarding - Sophia Martinez", date: "Jun 4, 2025", time: "2:00 PM", type: "Onboarding Call", status: "Pending", zoom: "" },
  { id: 3, title: "Follow-up - David Thompson", date: "Jun 6, 2025", time: "11:30 AM", type: "Follow-up", status: "Confirmed", zoom: "https://zoom.us/j/123456789" },
  { id: 4, title: "Quarterly Review - Lorenzo", date: "Jun 10, 2025", time: "9:00 AM", type: "Zoom Presentation", status: "Confirmed", zoom: "https://zoom.us/j/111222333" },
];

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerMember, setDrawerMember] = useState<typeof matrixL1[0] | null>(null);
  const [matrixAnimated, setMatrixAnimated] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [showGcal, setShowGcal] = useState(false);
  const [chartDraw, setChartDraw] = useState(false);
  const [zoomLink, setZoomLink] = useState("");
  const [meetingCreated, setMeetingCreated] = useState(false);
  const [compOpen, setCompOpen] = useState(false);
  const [announcePosted, setAnnouncePosted] = useState(false);
  const [annTitle, setAnnTitle] = useState("");
  const [annMsg, setAnnMsg] = useState("");
  const [annAudience, setAnnAudience] = useState("all");
  const [annPriority, setAnnPriority] = useState("normal");
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [editingAnn, setEditingAnn] = useState<any>(null);
  const [viewCert, setViewCert] = useState<{cert:string;member:string;date:string}|null>(null);
  // Support state
  const [tickets, setTickets] = useState<any[]>([]);
  const [activeTicket, setActiveTicket] = useState<any>(null);
  const [ticketMessages, setTicketMessages] = useState<any[]>([]);
  const [replyMsg, setReplyMsg] = useState("");
  const [ticketFilter, setTicketFilter] = useState("all");
  const [prospects, setProspects] = useState<any[]>([]);
  const [memberRequests, setMemberRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [crmNote, setCrmNote] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<number|null>(null);
  const [newProspect, setNewProspect] = useState({ name: "", phone: "", email: "", interest_amount: "", source: "", notes: "" });
  // Matrix fullscreen state
  const [matrixFullscreen, setMatrixFullscreen] = useState(false);
  const [matrixZoom, setMatrixZoom] = useState(1);
  const [matrixSearch, setMatrixSearch] = useState("");
  const [matrixFilter, setMatrixFilter] = useState("all");
  const [hoveredMember, setHoveredMember] = useState<any>(null);
  const [viewingReferralNetwork, setViewingReferralNetwork] = useState<any>(null);

  // Fetch data from API
  useEffect(() => { 
    setTimeout(() => setChartDraw(true), 300); 
    fetchProspects();
    fetchMemberRequests();
    fetchAnnouncements();
    fetchTickets();
  }, []);
  useEffect(() => { if (activeTab === "matrix") setTimeout(() => setMatrixAnimated(true), 100); }, [activeTab]);

  const fetchProspects = async () => {
    try {
      const res = await fetch("/api/prospects");
      if (res.ok) {
        const data = await res.json();
        setProspects(data.map((p: any) => ({
          id: p.id,
          name: p.name,
          phone: p.phone || "",
          email: p.email || "",
          interest: p.interest_amount ? `$${p.interest_amount.toLocaleString()}` : "",
          source: p.source,
          status: p.status === "hot" ? "Hot Lead" : p.status === "warm" ? "Warm" : "New",
          lastContact: p.last_contact ? new Date(p.last_contact).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "",
          notes: p.notes || ""
        })));
      }
    } catch (err) {
      console.error("Failed to fetch prospects:", err);
    }
  };

  const fetchMemberRequests = async () => {
    try {
      const res = await fetch("/api/member-requests");
      if (res.ok) {
        const data = await res.json();
        setMemberRequests(data);
      }
    } catch (err) {
      console.error("Failed to fetch member requests:", err);
    }
  };

  const addProspect = async () => {
    if (!newProspect.name) return;
    setLoading(true);
    try {
      const res = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProspect.name,
          phone: newProspect.phone,
          email: newProspect.email,
          interest_amount: parseInt(newProspect.interest_amount.replace(/[^0-9]/g, "")) || 0,
          source: newProspect.source || "Manual Entry",
          status: "new",
          notes: newProspect.notes
        })
      });
      if (res.ok) {
        setNewProspect({ name: "", phone: "", email: "", interest_amount: "", source: "", notes: "" });
        fetchProspects();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateProspectNote = async (id: number, note: string) => {
    if (!note.trim()) return;
    try {
      const res = await fetch("/api/prospects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: note })
      });
      if (res.ok) {
        setCrmNote("");
        fetchProspects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const membersCount = useCountUp(128);
  const apps = useCountUp(23);
  const issued = useCountUp(3450);
  const remaining = useCountUp(46550);

  const card: React.CSSProperties = { background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" };
  const kpiBox: React.CSSProperties = { ...card, display: "flex", alignItems: "center", gap: 14, padding: "18px 16px", transition: ".3s", cursor: "pointer" };
  const thS: React.CSSProperties = { textAlign: "left", padding: 10, color: "#667085", fontSize: 11, textTransform: "uppercase", fontWeight: 900, borderBottom: "1px solid #e9edf3" };
  const tdS: React.CSSProperties = { padding: 12, borderBottom: "1px solid #eef2f6" };
  const btnGreen: React.CSSProperties = { background: "linear-gradient(135deg,#075933,#0b7346)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 16px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer", transition: ".25s" };
  const btnGold: React.CSSProperties = { background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 16px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer", transition: ".25s" };
  const btnOutline: React.CSSProperties = { background: "#fff", color: "#a46a00", border: "1px solid #bd8e28", borderRadius: 8, padding: "8px 14px", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: ".25s" };
  const fieldLabel: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 };
  const fieldInput: React.CSSProperties = { width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" };
  const statusBadge = (s: string) => ({ padding: "4px 10px", borderRadius: 99, background: s === "Active" || s === "Published" || s === "Confirmed" ? "#e3f5eb" : s === "Pending" || s === "Review" ? "#fffaf0" : "#f5f7fb", color: s === "Active" || s === "Published" || s === "Confirmed" ? "#087345" : s === "Pending" || s === "Review" ? "#bd8e28" : "#667085", fontSize: 11, fontWeight: 900 as const, textTransform: "uppercase" as const });

  const labelStyle = (label: string): React.CSSProperties => {
    const map: Record<string, { bg: string; fg: string }> = {
      "Investor": { bg: "#e3f5eb", fg: "#087345" },
      "Builder": { bg: "#e7f0ff", fg: "#1e4fa3" },
      "Investor-Builder": { bg: "#efe7ff", fg: "#5b34a3" },
      "Founder Member": { bg: "#fff3d6", fg: "#8a5a00" },
      "Early Access Member": { bg: "#fde8f3", fg: "#a3346e" },
      "Pending Review": { bg: "#fffaf0", fg: "#bd8e28" },
      "Active": { bg: "#e3f5eb", fg: "#087345" },
      "Inactive": { bg: "#f0f2f5", fg: "#667085" },
      "Needs Follow-Up": { bg: "#fff0e6", fg: "#b3541e" },
      "Top Builder": { bg: "#e7f0ff", fg: "#1e4fa3" },
      "Qualified for Incentive": { bg: "#e3f5eb", fg: "#076b40" },
      "Not Yet Qualified": { bg: "#f0f2f5", fg: "#667085" },
      "Foundation Partner": { bg: "#fff3d6", fg: "#8a5a00" },
      "Special Benefits Eligible": { bg: "#efe7ff", fg: "#5b34a3" },
    };
    const c = map[label] || { bg: "#f0f2f5", fg: "#667085" };
    return { padding: "2px 8px", borderRadius: 99, background: c.bg, color: c.fg, fontSize: 9, fontWeight: 900, textTransform: "uppercase" as const, letterSpacing: ".02em", display: "inline-block" };
  };

  const allLabels = ["Investor", "Investor-Builder", "Founder Member", "Foundation Partner", "Early Access Member", "Pending Review", "Active", "Inactive", "Needs Follow-Up", "Top Builder", "Qualified for Incentive", "Not Yet Qualified", "Special Benefits Eligible"];
  const requestRows = memberRequests.length
    ? memberRequests.map((request: any) => ({
      name: request.name || "New member",
      interest: request.interest_amount ? `$${Number(request.interest_amount).toLocaleString()}` : "Not listed",
      date: request.submitted_at ? new Date(request.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "New",
      status: request.status === "pending" ? "Pending" : request.status === "approved" ? "Active" : "Review",
    }))
    : [
      { name: "Michael Anderson", interest: "$10,000", date: "May 20", status: "Review" },
      { name: "Sophia Martinez", interest: "$25,000", date: "May 19", status: "Review" },
      { name: "David Thompson", interest: "$50,000", date: "May 18", status: "Pending" },
    ];

  const switchTab = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      if (res.ok) { const data = await res.json(); setBroadcasts(data); }
    } catch (err) { console.error('Failed to fetch announcements:', err); }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/support');
      if (res.ok) { const data = await res.json(); setTickets(data.tickets || []); }
    } catch (err) { console.error('Failed to fetch tickets:', err); }
  };

  const fetchMessages = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/support?ticket_id=${ticketId}`);
      if (res.ok) { const data = await res.json(); setTicketMessages(data.messages || []); }
    } catch (err) { console.error('Failed to fetch messages:', err); }
  };

  const handlePublishAnnouncement = async () => {
    if (!annTitle.trim()) return;
    setLoading(true);
    try {
      if (editingAnn) {
        await fetch('/api/announcements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingAnn.id, title: annTitle, message: annMsg, audience: annAudience, priority: annPriority, status: 'published', published_at: new Date().toISOString() }) });
        setEditingAnn(null);
      } else {
        await fetch('/api/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: annTitle, message: annMsg, audience: annAudience, priority: annPriority, status: 'published' }) });
      }
      setAnnouncePosted(true);
      setAnnTitle(''); setAnnMsg(''); setAnnPriority('normal');
      fetchAnnouncements();
      setTimeout(() => setAnnouncePosted(false), 3000);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSaveDraft = async () => {
    if (!annTitle.trim()) return;
    setLoading(true);
    try {
      if (editingAnn) {
        await fetch('/api/announcements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingAnn.id, title: annTitle, message: annMsg, audience: annAudience, priority: annPriority, status: 'draft' }) });
        setEditingAnn(null);
      } else {
        await fetch('/api/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: annTitle, message: annMsg, audience: annAudience, priority: annPriority, status: 'draft' }) });
      }
      setAnnTitle(''); setAnnMsg(''); setAnnPriority('normal');
      fetchAnnouncements();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
      fetchAnnouncements();
    } catch (err) { console.error(err); }
  };

  const handleArchiveAnnouncement = async (id: string) => {
    try {
      await fetch('/api/announcements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'archived' }) });
      fetchAnnouncements();
    } catch (err) { console.error(err); }
  };

  const handleSendReply = async () => {
    if (!replyMsg.trim() || !activeTicket) return;
    try {
      await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'send_message', ticket_id: activeTicket.id, sender_id: 'admin', sender_name: 'Admin', sender_role: 'admin', message: replyMsg }) });
      setReplyMsg('');
      fetchMessages(activeTicket.id);
      fetchTickets();
    } catch (err) { console.error(err); }
  };

  const handleUpdateTicketStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/support', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
      fetchTickets();
      if (activeTicket?.id === id) setActiveTicket({ ...activeTicket, status });
    } catch (err) { console.error(err); }
  };

  const handleCreateZoom = () => {
    const id = Math.floor(100000000 + Math.random() * 900000000);
    setZoomLink(`https://zoom.us/j/${id}`);
    setShowZoom(true);
  };

  const handleCreateMeeting = () => {
    setMeetingCreated(true);
    setTimeout(() => setMeetingCreated(false), 3000);
  };

  const icoMap: Record<string, React.ReactNode> = {
    binoculars: <Binoculars size={18} />,
    request: <UserRoundPlus size={18} />,
    clipboard: <ClipboardList size={18} />,
    users: <Users size={18} />,
    star: <Star size={18} />,
    credit: <CreditCard size={18} />,
    chart: <FileBarChart size={18} />,
    folder: <FolderOpen size={18} />,
    tree: <TreePine size={18} />,
    megaphone: <Megaphone size={18} />,
    chat: <MessageSquare size={18} />,
    award: <Award size={18} />,
    ribbon: <Ribbon size={18} />,
    contact: <Contact size={18} />,
    calendar: <CalendarDays size={18} />,
    settings: <Settings size={18} />,
    shield: <ShieldCheck size={18} />,
  };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: "#071a33", background: "#fcfbf8" }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="sn-sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: "none" }} />}

      <div className="sn-portal-grid" style={{ display: "grid", gridTemplateColumns: "296px 1fr", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside className={`sn-sidebar ${sidebarOpen ? "open" : ""}`} style={{ background: "linear-gradient(180deg,#fff 0%,#fbf8f1 54%,#edf6ef 100%)", borderRight: "1px solid #e7e2d8", padding: "24px 18px", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
          <div style={{ marginBottom: 28 }}><Link href=""><Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={260} height={127} priority style={{ width: 260, height: "auto" }} /></Link></div>
          <nav style={{ display: "grid", gap: 7 }}>
            {adminTabs.map((t) => (
              <button key={t.id} onClick={() => switchTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "14px 16px", border: 0, borderRadius: 12, background: activeTab === t.id ? "linear-gradient(135deg,#075933,#0d6d42)" : "transparent", color: activeTab === t.id ? "#fff" : "#10233b", fontWeight: 800, fontSize: 14, transition: ".25s", transform: activeTab === t.id ? "translateX(3px)" : "none", boxShadow: activeTab === t.id ? "0 0 22px rgba(213,168,61,.55)" : "none", cursor: "pointer" }}>
                <span style={{ width: 27, color: activeTab === t.id ? "#ffd46f" : "#c48817", display: "flex", justifyContent: "center" }}>{icoMap[t.ico] || t.ico}</span>{t.label}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 34, background: "#fff", border: "1px solid #e7e2d8", boxShadow: "0 16px 40px rgba(5,20,45,.10)", padding: 20, borderRadius: 12 }}>
            <h3 style={{ margin: "0 0 8px", fontFamily: "Georgia, serif" }}>Staff Support</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "#667085" }}>Staff support center.</p>
            <button style={btnGreen}>Contact Support →</button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ padding: "28px 30px 48px", minWidth: 0 }}>
          {/* ── MOBILE APP HEADER (hidden on desktop via CSS) ── */}
          <div className="sn-app-topbar" style={{ display: "none" }}>
            <div className="sn-mobile-brand-lockup" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="sn-mobile-toggle" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
              <Image className="sn-mobile-header-logo" src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={120} height={59} priority style={{ width: 96, height: "auto", display: "block", flexShrink: 0 }} />
              <div className="sn-mobile-title-copy">
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#bd8e28", textTransform: "uppercase" }}>Admin Portal</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{adminTabs.find(t => t.id === activeTab)?.label || "Overview"}</div>
              </div>
            </div>
            <div className="sn-topbar-right">
              <span style={{ position: "relative", cursor: "pointer" }}><Bell size={20} color="#ffd46f" /><span style={{ position: "absolute", top: -4, right: -6, background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 900, padding: "1px 4px", borderRadius: 99 }}>4</span></span>
              <div className="sn-avatar-sm">A</div>
            </div>
          </div>

          {/* ── DESKTOP TOP BAR (hidden on mobile via CSS) ── */}
          <div className="sn-desktop-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="sn-mobile-toggle" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
              <div><div style={{ fontSize: 13, color: "#667085" }}>Welcome back, Admin.</div><h1 style={{ margin: "4px 0 0", fontSize: 28, fontFamily: "Georgia, serif", fontWeight: 400 }}>Admin Overview</h1></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <span style={{ position: "relative", cursor: "pointer" }}><Bell size={22} color="#667085" /><span style={{ position: "absolute", top: -4, right: -8, background: "#dc2626", color: "#fff", fontSize: 10, fontWeight: 900, padding: "2px 5px", borderRadius: 99 }}>1</span></span>
              <span style={{ position: "relative", cursor: "pointer" }}><Mail size={22} color="#667085" /><span style={{ position: "absolute", top: -4, right: -8, background: "#dc2626", color: "#fff", fontSize: 10, fontWeight: 900, padding: "2px 5px", borderRadius: 99 }}>3</span></span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 16 }}>A</div><div className="sn-user-desktop"><b style={{ fontSize: 14 }}>Admin User</b><br /><small style={{ color: "#667085" }}>Administrator</small></div></div>
            </div>
          </div>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              {/* KPI Row */}
              <div className="sn-kpi-grid-6" style={{ display: "grid", gap: 14, marginBottom: 22 }}>
                {[{ ico: <Users size={20} />, label: "Active Members", value: String(membersCount) }, { ico: <UserRoundPlus size={20} />, label: "New Requests", value: String(apps) }, { ico: <Star size={20} />, label: "Units Issued", value: issued.toLocaleString() }, { ico: <CircleDot size={20} />, label: "Remaining", value: remaining.toLocaleString() }, { ico: <CreditCard size={20} />, label: "Revenue (MTD)", value: "$84,200" }, { ico: <TrendingUp size={20} />, label: "Growth", value: "+18.4%" }].map((k, i) => (
                  <div key={i} style={kpiBox} className="hover:translate-y-[-3px] hover:shadow-[0_16px_40px_rgba(5,20,45,.10)]">
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#c48817" }}>{k.ico}</div>
                    <div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{k.label}</small><br /><b style={{ fontSize: 18 }}>{k.value}</b></div>
                  </div>
                ))}
              </div>

              {/* Foundation Partner Tracker */}
              <div style={{ ...card, marginBottom: 18, background: "linear-gradient(135deg,#071a33,#0d3366)", color: "#fff", border: "1px solid rgba(213,168,61,.5)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Star size={22} color="#ffd46f" />
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: 0, color: "#fff" }}>Foundation Partner Tracker</h2>
                  </div>
                  <span style={{ fontSize: 12, color: "#c6d2e1" }}>Members with $10,000+ investment</span>
                </div>
                <div className="sn-kpi-grid-4" style={{ display: "grid", gap: 12 }}>
                  {[
                    { label: "Foundation Partners", value: "12", c: "#ffd46f" },
                    { label: "Total Members", value: "87", c: "#fff" },
                    { label: "Incentive Eligible", value: "41", c: "#9ff5c0" },
                    { label: "Pending Payment", value: "9", c: "#ffd0a0" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "12px 14px" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: s.c }}>{s.value}</div>
                      <small style={{ fontSize: 10.5, color: "#9fb1c7", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 700 }}>{s.label}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Analytics — Real Data */}
              <div style={{ ...card, marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: 0 }}>Platform Analytics</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ padding: "4px 10px", borderRadius: 6, background: "#edf6ef", color: "#075933", fontSize: 11, fontWeight: 800 }}>Live</span>
                    <span style={{ fontSize: 11, color: "#667085" }}>Last 6 months</span>
                  </div>
                </div>
                <div className="sn-analytics-grid" style={{ display: "grid", gap: 14, marginBottom: 18 }}>
                  {[
                    { label: "Total Revenue", value: "$345,000", change: "+22%" },
                    { label: "New Members (MTD)", value: "18", change: "+12%" },
                    { label: "Units Sold (MTD)", value: "240", change: "+15%" },
                    { label: "Avg Investment", value: "$8,625", change: "+8%" },
                  ].map((d, i) => (
                    <div key={i} style={{ background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 10, padding: "14px 16px" }}>
                      <small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase" }}>{d.label}</small>
                      <div style={{ fontSize: 22, fontWeight: 900, margin: "4px 0 2px" }}>{d.value}</div>
                      <span style={{ fontSize: 11, color: "#087345", fontWeight: 800 }}>{d.change} ↑</span>
                    </div>
                  ))}
                </div>
                {/* Animated Chart with Real Numbers */}
                <div style={{ position: "relative" }}>
                  <svg viewBox="0 0 640 220" style={{ width: "100%", height: 180 }}>
                    {/* Y-axis labels */}
                    <text x="0" y="30" fill="#667085" fontSize="10">$80K</text>
                    <text x="0" y="70" fill="#667085" fontSize="10">$60K</text>
                    <text x="0" y="110" fill="#667085" fontSize="10">$40K</text>
                    <text x="0" y="150" fill="#667085" fontSize="10">$20K</text>
                    <text x="0" y="190" fill="#667085" fontSize="10">$0</text>
                    {/* Grid */}
                    <g stroke="#e7e2d8" strokeWidth="0.5"><path d="M40 28H620M40 68H620M40 108H620M40 148H620M40 188H620" /></g>
                    {/* Revenue line (gold) */}
                    <polyline points="70,168 170,148 270,128 370,108 470,78 570,38" fill="none" stroke="#bd8e28" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 900, strokeDashoffset: chartDraw ? 0 : 900, transition: "stroke-dashoffset 2s ease" }} />
                    {/* Members line (green) */}
                    <polyline points="70,178 170,168 270,158 370,148 470,128 570,98" fill="none" stroke="#075933" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 900, strokeDashoffset: chartDraw ? 0 : 900, transition: "stroke-dashoffset 2s ease .3s" }} />
                    {/* Data points with values */}
                    <g style={{ opacity: chartDraw ? 1 : 0, transition: "opacity .5s ease 1.5s" }}>
                      <circle cx="70" cy="168" r="5" fill="#fff" stroke="#bd8e28" strokeWidth="3" />
                      <circle cx="170" cy="148" r="5" fill="#fff" stroke="#bd8e28" strokeWidth="3" />
                      <circle cx="270" cy="128" r="5" fill="#fff" stroke="#bd8e28" strokeWidth="3" />
                      <circle cx="370" cy="108" r="5" fill="#fff" stroke="#bd8e28" strokeWidth="3" />
                      <circle cx="470" cy="78" r="5" fill="#fff" stroke="#bd8e28" strokeWidth="3" />
                      <circle cx="570" cy="38" r="5" fill="#fff" stroke="#bd8e28" strokeWidth="3" />
                      <text x="60" y="160" fill="#bd8e28" fontSize="9" fontWeight="700">$22K</text>
                      <text x="160" y="140" fill="#bd8e28" fontSize="9" fontWeight="700">$38K</text>
                      <text x="260" y="120" fill="#bd8e28" fontSize="9" fontWeight="700">$52K</text>
                      <text x="360" y="100" fill="#bd8e28" fontSize="9" fontWeight="700">$61K</text>
                      <text x="460" y="70" fill="#bd8e28" fontSize="9" fontWeight="700">$72K</text>
                      <text x="556" y="30" fill="#bd8e28" fontSize="9" fontWeight="700">$84K</text>
                    </g>
                    {/* X-axis labels */}
                    <text x="60" y="210" fill="#667085" fontSize="10">Jan</text>
                    <text x="160" y="210" fill="#667085" fontSize="10">Feb</text>
                    <text x="260" y="210" fill="#667085" fontSize="10">Mar</text>
                    <text x="360" y="210" fill="#667085" fontSize="10">Apr</text>
                    <text x="460" y="210" fill="#667085" fontSize="10">May</text>
                    <text x="560" y="210" fill="#667085" fontSize="10">Jun</text>
                  </svg>
                  <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><span style={{ width: 12, height: 3, background: "#bd8e28", borderRadius: 2 }} />Revenue</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><span style={{ width: 12, height: 3, background: "#075933", borderRadius: 2 }} />Member Growth</span>
                  </div>
                </div>
              </div>

              <ReferralNetwork mode="admin" preview onOpenFull={() => switchTab("matrix")} />

              {/* Briefing Grid */}
              <div className="sn-admin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 18 }}>
                {/* Recent Activity */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Recent Activity</h2>
                  {[
                    { action: "Member Request Approved", who: "Michael Anderson", time: "2 hours ago", color: "#087345" },
                    { action: "Payment Received", who: "$10,000 — Maria Santos", time: "5 hours ago", color: "#bd8e28" },
                    { action: "New Member Request", who: "Jessica Moore", time: "8 hours ago", color: "#1e4fa3" },
                    { action: "Certificate Issued", who: "James Wilson — Builder 10", time: "1 day ago", color: "#5b34a3" },
                    { action: "Units Assigned", who: "25 units → David Chen", time: "1 day ago", color: "#075933" },
                  ].map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} />
                      <div><b style={{ fontSize: 12.5 }}>{a.action}</b><br /><small style={{ color: "#667085", fontSize: 11.5 }}>{a.who} · {a.time}</small></div>
                    </div>
                  ))}
                </div>

                {/* Member Requests Queue */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Member Requests</h2>
                  {[{ name: "Michael Anderson", loc: "Miami, FL", amt: "$10,000" }, { name: "Sophia Martinez", loc: "Austin, TX", amt: "$25,000" }, { name: "David Thompson", loc: "Dallas, TX", amt: "$50,000" }, { name: "Jessica Moore", loc: "Cleveland, OH", amt: "$5,000" }].map((a, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                      <div><b style={{ fontSize: 13 }}>{a.name}</b><br /><small style={{ color: "#667085" }}>{a.loc} · {a.amt}</small></div>
                      <button onClick={() => switchTab("requests")} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px" }}>Review</button>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Quick Actions</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {["Review Requests", "Approve Reports", "Schedule Meeting", "Export Data", "Add Member", "Upload CSV", "Send Update", "Open Referrals"].map((a, i) => (
                      <button key={i} onClick={() => { if (a === "Review Requests") switchTab("requests"); if (a === "Approve Reports") switchTab("reports"); if (a === "Schedule Meeting") switchTab("scheduler"); if (a === "Open Referrals") switchTab("matrix"); }} style={{ padding: "10px 8px", background: i % 2 === 0 ? "#f9f6ef" : "#edf6ef", border: "1px solid #e7e2d8", borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: "pointer", transition: ".25s", color: "#071a33" }} className="hover:translate-y-[-2px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)]">{a} →</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Summary + Prospects + Upcoming */}
              <div className="sn-overview-stack-grid" style={{ display: "grid", gap: 18 }}>
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Financial Summary</h2>
                  {[
                    { label: "Total Raised (All Time)", value: "$345,000" },
                    { label: "Total Disbursed", value: "$42,300" },
                    { label: "Operating Account Balance", value: "$302,700" },
                    { label: "Monthly Burn Rate", value: "$18,400" },
                    { label: "Projected Q3 Revenue", value: "$125,000" },
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eef2f6", fontSize: 14 }}>
                      <span style={{ color: "#667085" }}>{f.label}</span><b>{f.value}</b>
                    </div>
                  ))}
                </div>
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Upcoming This Week</h2>
                  {[
                    { title: "Investor Call — Michael Anderson", time: "Today, 10:00 AM", type: "Zoom" },
                    { title: "Onboarding — Sophia Martinez", time: "Wed, 2:00 PM", type: "Zoom" },
                    { title: "Follow-up — David Thompson", time: "Fri, 11:30 AM", type: "Call" },
                    { title: "Q2 Report Publish Deadline", time: "Fri, EOD", type: "Task" },
                  ].map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                      <div><b style={{ fontSize: 13 }}>{m.title}</b><br /><small style={{ color: "#667085" }}>{m.time}</small></div>
                      <span style={{ padding: "4px 8px", borderRadius: 6, background: m.type === "Zoom" ? "#e7f0ff" : m.type === "Call" ? "#edf6ef" : "#fffaf0", color: m.type === "Zoom" ? "#1e4fa3" : m.type === "Call" ? "#075933" : "#bd8e28", fontSize: 10, fontWeight: 800 }}>{m.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEMBER REQUESTS */}
          {activeTab === "requests" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}><input placeholder="Search member requests" style={{ flex: 1, minWidth: 200, ...fieldInput }} /><select style={{ ...fieldInput, width: "auto" }}><option>All Statuses</option></select><button style={btnGreen}>Filter</button></div>
              <div className="sn-table-wrap" style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Member Requests</h2>
                <div className="sn-desktop-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                  <thead><tr>{["Name", "Interest", "Date", "Status", "Actions"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                  <tbody>
                    {requestRows.map((a, i) => (
                      <tr key={i}><td style={tdS}><b>{a.name}</b></td><td style={{ ...tdS, color: "#bd8e28", fontWeight: 700 }}>{a.interest}</td><td style={{ ...tdS, color: "#667085" }}>{a.date}</td><td style={tdS}><span style={statusBadge(a.status)}>{a.status}</span></td><td style={tdS}><button style={btnOutline}>Approve</button> <button style={{ ...btnOutline, borderColor: "#dc2626", color: "#dc2626", marginLeft: 4 }}>Reject</button></td></tr>
                    ))}
                  </tbody>
                </table>
                </div>
                <div className="sn-mobile-cards" style={{ display: "none" }}>
                  {requestRows.map((a, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><b style={{ fontSize: 15 }}>{a.name}</b><span style={statusBadge(a.status)}>{a.status}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Interest</span><span className="sn-m-value" style={{ color: "#bd8e28" }}>{a.interest}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Date</span><span className="sn-m-value">{a.date}</span></div>
                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}><button style={{ ...btnGreen, flex: 1, padding: "10px" }}>Approve</button><button style={{ ...btnOutline, flex: 1, borderColor: "#dc2626", color: "#dc2626" }}>Reject</button></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEMBERS */}
          {activeTab === "members" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}><input placeholder="Search members" style={{ flex: 1, minWidth: 200, ...fieldInput }} /><button style={btnGreen}>Add Member</button><button style={btnOutline}>Upload CSV</button></div>
              <div className="sn-table-wrap" style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Members</h2>
                <div className="sn-desktop-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                  <thead><tr>{["Name", "Status", "Units", "Invested", "Joined", "Action"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[{ name: "Lorenzo", status: "Active", units: 50, invested: "$5,000", joined: "May 12", role: "Founder", fp: true }, { name: "Maria Santos", status: "Active", units: 25, invested: "$2,500", joined: "May 20", role: "Investor-Builder", fp: true }, { name: "David Chen", status: "Pending", units: 10, invested: "$1,000", joined: "May 22", role: "Investor", fp: true }, { name: "James Wilson", status: "Active", units: 15, invested: "$1,500", joined: "May 28", role: "Builder", fp: true }].map((m, i) => (
                      <tr key={i}><td style={{ ...tdS, fontWeight: 700 }}>{m.name}{m.fp && <span style={{ marginLeft: 6, background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 7px", borderRadius: 4, verticalAlign: "middle" }}>Foundation Partner</span>}</td><td style={tdS}><span style={statusBadge(m.status)}>{m.status}</span></td><td style={tdS}>{m.units}</td><td style={tdS}>{m.invested}</td><td style={{ ...tdS, color: "#667085" }}>{m.joined}</td><td style={tdS}><span style={labelStyle(m.role)}>{m.role}</span> <button style={{ ...btnOutline, marginLeft: 6 }}>View</button></td></tr>
                    ))}
                  </tbody>
                </table>
                </div>
                <div className="sn-mobile-cards" style={{ display: "none" }}>
                  {[{ name: "Lorenzo", status: "Active", units: 50, invested: "$5,000", joined: "May 12", role: "Founder", fp: true }, { name: "Maria Santos", status: "Active", units: 25, invested: "$2,500", joined: "May 20", role: "Investor-Builder", fp: true }, { name: "David Chen", status: "Pending", units: 10, invested: "$1,000", joined: "May 22", role: "Investor", fp: true }, { name: "James Wilson", status: "Active", units: 15, invested: "$1,500", joined: "May 28", role: "Builder", fp: true }].map((m, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><b style={{ fontSize: 15 }}>{m.name}</b><span style={statusBadge(m.status)}>{m.status}</span></div>
                      {m.fp && <div style={{ marginBottom: 8, display: "flex", gap: 5, flexWrap: "wrap" }}><span style={{ background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", fontSize: 9, fontWeight: 900, padding: "3px 8px", borderRadius: 4 }}>Foundation Partner</span> <span style={labelStyle(m.role)}>{m.role}</span></div>}
                      <div className="sn-m-card-row"><span className="sn-m-label">Units</span><span className="sn-m-value">{m.units}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Invested</span><span className="sn-m-value">{m.invested}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Joined</span><span className="sn-m-value">{m.joined}</span></div>
                      <button style={{ ...btnOutline, width: "100%", marginTop: 10 }}>View Profile</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FOUNDER UNITS */}
          {activeTab === "units" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div className="sn-kpi-grid-4" style={{ display: "grid", gap: 14, marginBottom: 22 }}>
                {[{ ico: <Star size={20} />, label: "Total Planned", value: "50,000" }, { ico: <CheckCircle size={20} />, label: "Issued", value: "3,450" }, { ico: <CircleDot size={20} />, label: "Remaining", value: "46,550" }, { ico: <Wallet size={20} />, label: "Unit Price", value: "$100" }].map((k, i) => (
                  <div key={i} style={kpiBox}><div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#c48817" }}>{k.ico}</div><div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase" }}>{k.label}</small><br /><b style={{ fontSize: 18 }}>{k.value}</b></div></div>
                ))}
              </div>
              <div style={{ ...card, marginBottom: 16 }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Unit Management</h2>
                <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                  <div><label style={fieldLabel}>Issue Units</label><input placeholder="Number of units" style={fieldInput} /></div>
                  <div><label style={fieldLabel}>Assign To Member</label><input placeholder="Search member" style={fieldInput} /></div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><button style={btnGreen}>Issue Units</button><button style={btnOutline}>Pause Available</button><button style={btnOutline}>Update Availability</button></div>
                <div style={{ marginTop: 18, height: 12, background: "#edf6ef", borderRadius: 99, overflow: "hidden" }}><div style={{ height: "100%", width: "6.9%", background: "linear-gradient(90deg,#bd8e28,#075933)", borderRadius: 99, transition: "width 1.5s ease" }} /></div>
                <p style={{ fontSize: 12, color: "#667085", marginTop: 8 }}>3,450 of 50,000 units issued (6.9%)</p>
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab === "payments" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div className="sn-table-wrap" style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Payments</h2>
                <div className="sn-desktop-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 550 }}>
                  <thead><tr>{["Member", "Amount", "Processor", "Status", "Action"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[{ name: "David Chen", amount: "$1,000", status: "Pending" }, { name: "Maria Santos", amount: "$2,500", status: "Active" }, { name: "James Wilson", amount: "$1,500", status: "Active" }].map((p, i) => (
                      <tr key={i}><td style={{ ...tdS, fontWeight: 700 }}>{p.name}</td><td style={tdS}>{p.amount}</td><td style={{ ...tdS, color: "#667085" }}>Placeholder</td><td style={tdS}><span style={statusBadge(p.status)}>{p.status}</span></td><td style={tdS}><button style={btnOutline}>Review</button></td></tr>
                    ))}
                  </tbody>
                </table>
                </div>
                <div className="sn-mobile-cards" style={{ display: "none" }}>
                  {[{ name: "David Chen", amount: "$1,000", status: "Pending" }, { name: "Maria Santos", amount: "$2,500", status: "Active" }, { name: "James Wilson", amount: "$1,500", status: "Active" }].map((p, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><b style={{ fontSize: 15 }}>{p.name}</b><span style={statusBadge(p.status)}>{p.status}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Amount</span><span className="sn-m-value">{p.amount}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Processor</span><span className="sn-m-value" style={{ color: "#667085" }}>Placeholder</span></div>
                      <button style={{ ...btnOutline, width: "100%", marginTop: 10 }}>Review</button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, borderLeft: "4px solid #3b82f6", background: "#f0f7ff", color: "#1e40af", padding: "12px 14px", fontSize: 12, borderRadius: "0 6px 6px 0" }}>Payment processor placeholder. Final integration after attorney/accountant review.</div>
              </div>
            </div>
          )}

          {/* FINANCIAL REPORTS */}
          {activeTab === "reports" && (
            <div className="sn-mobile-content sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, animation: "fadeIn .5s ease" }}>
              <div style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Upload Financial Report</h2>
                <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><label style={fieldLabel}>Title</label><input placeholder="Q2 Financial Snapshot" style={fieldInput} /></div>
                  <div><label style={fieldLabel}>Category</label><select style={fieldInput}><option>Monthly Financials</option><option>Quarterly Progress</option><option>Annual Report</option><option>Major Win</option><option>Investor Notice</option></select></div>
                </div>
                <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Summary</label><textarea rows={3} style={{ ...fieldInput, resize: "none" as const }} /></div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><button style={btnGreen}>Save Draft</button><button style={btnGold}>Publish</button></div>
                <div style={{ marginTop: 14, borderLeft: "4px solid #bd8e28", background: "#fffaf0", color: "#604b17", padding: "12px 14px", fontSize: 12, borderRadius: "0 6px 6px 0" }}>Reports must be approved before investors can see them.</div>
              </div>
              <div style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>Reports Pending Approval</h2>
                {[{ title: "Q2 Financial Report", date: "May 20" }, { title: "Expansion Milestone", date: "May 18" }].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eef2f6", flexWrap: "wrap", gap: 8 }}>
                    <div><b style={{ fontSize: 14 }}>{r.title}</b><br /><small style={{ color: "#667085" }}>Submitted {r.date}</small></div>
                    <div style={{ display: "flex", gap: 6 }}><span style={statusBadge("Pending")}>Pending</span><button style={btnOutline}>Approve</button></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {activeTab === "docs" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}><button style={btnGreen}>+ Upload Document</button></div>
              {/* Featured: Compensation Plan */}
              <div style={{ background: "linear-gradient(135deg,#fbf9f4,#fff)", border: "1px solid #e7d9b6", borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 24px rgba(5,20,45,.06)", marginBottom: 18 }}>
                <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0, alignItems: "stretch" }}>
                  <button onClick={() => setCompOpen(true)} style={{ position: "relative", border: 0, padding: 0, cursor: "pointer", background: "#0a2240", minHeight: 160, overflow: "hidden" }}>
                    <Image src="/assets/select-network/select-network-comp-plan.png" alt="Compensation Plan" width={480} height={300} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                  <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ color: "#bd8e28", fontSize: 10.5, fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Official Document · Shared with Members</div>
                    <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 21, margin: "0 0 8px" }}>The Select Network Member Group Compensation Plan</h3>
                    <p style={{ color: "#667085", fontSize: 13, lineHeight: 1.6, margin: "0 0 14px", maxWidth: 460 }}>Unit investment and quarterly profit distribution overview. Visible in every investor back office under Documents.</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button onClick={() => setCompOpen(true)} style={btnGreen}>View</button>
                      <a href="/assets/select-network/select-network-comp-plan.png" download="Select-Network-Compensation-Plan.png" style={{ ...btnOutline, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Download</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sn-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                {["Membership Agreement", "Operating Agreement", "Investment Disclosure", "Tax Form W-9", "Track Record", "Legal Updates"].map((d, i) => (
                  <div key={i} style={{ ...card, transition: ".3s" }} className="hover:translate-y-[-3px] hover:shadow-[0_16px_40px_rgba(5,20,45,.10)]">
                    <h3 style={{ margin: "0 0 8px" }}>{d}</h3>
                    <p style={{ color: "#667085", fontSize: 13, margin: "0 0 14px" }}>Document management</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><button style={btnOutline}>View</button><button style={{ ...btnOutline, borderColor: "#dc2626", color: "#dc2626" }}>Delete</button></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERRAL NETWORK */}
          {activeTab === "matrix" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <ReferralNetwork mode="admin" />
            </div>
          )}

          {/* LEGACY REFERRAL NETWORK */}
          {activeTab === "matrixLegacy" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              {!matrixFullscreen ? (
                <div className="sn-mobile-content">
                  <div className="sn-kpi-grid-4" style={{ display: "grid", gap: 14, marginBottom: 18 }}>
                    {[{ ico: <Network size={20} />, label: "Total Organization", value: "128" }, { ico: <Users size={20} />, label: "Max Depth", value: "Unlimited" }, { ico: <CheckCircle size={20} />, label: "Active", value: "117" }, { ico: <CircleDot size={20} />, label: "Pending", value: "11" }].map((k, i) => (
                      <div key={i} style={kpiBox}><div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#c48817" }}>{k.ico}</div><div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase" }}>{k.label}</small><br /><b style={{ fontSize: 18 }}>{k.value}</b></div></div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                    <input placeholder="Search members..." value={matrixSearch} onChange={(e) => setMatrixSearch(e.target.value)} style={{ flex: 1, minWidth: 200, ...fieldInput }} />
                    <select value={matrixFilter} onChange={(e) => setMatrixFilter(e.target.value)} style={{ ...fieldInput, width: "auto" }}><option value="all">All Statuses</option><option value="Active">Active</option><option value="Pending">Pending</option><option value="Paused">Paused</option></select>
                    <button onClick={() => setMatrixFullscreen(true)} style={{ ...btnGreen, display: "inline-flex", alignItems: "center", gap: 6 }}>⛶ Expand Full Screen</button>
                  </div>
                  <div style={card}>
                    <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "#667085", lineHeight: 1.5 }}>Click <b>Expand Full Screen</b> to view the interactive referral network across your full screen with zoom, pan, hover data, and click-to-inspect. The admin referral network has <b>no cap</b> — it shows the entire organization tree.</p>
                    {/* Compact preview — L1 through L3 */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(20px)", transition: "all .6s ease" }}>
                      <div style={{ background: "#fff", border: "2px solid #bd8e28", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 18 }}>L</div>
                        <div><b>Lorenzo (Admin)</b><br /><small style={{ color: "#667085" }}>Origin • Active • Sees entire network</small><div style={{ fontSize: 12, color: "#5b6675" }}>Units: 50 | Invested: $50,000 | 3 Direct</div></div>
                      </div>
                    </div>
                    <div style={{ height: 24, width: 2, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto" }} />
                    {/* Level 1 */}
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ textAlign: "center", fontSize: 12, fontWeight: 900, color: "#075933", marginBottom: 8 }}>Level 1 — 3 Members <span style={{ fontWeight: 400, color: "#667085" }}>(click to view their referral network)</span></div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                        {matrixL1.filter(m => (matrixFilter === "all" || m.status === matrixFilter) && (!matrixSearch || m.name.toLowerCase().includes(matrixSearch.toLowerCase()))).map((m, i) => (
                          <div key={i} onClick={() => setViewingReferralNetwork(m)} style={{ background: viewingReferralNetwork?.name === m.name ? "linear-gradient(135deg,#071a33,#0d3366)" : "#fff", color: viewingReferralNetwork?.name === m.name ? "#fff" : "inherit", border: viewingReferralNetwork?.name === m.name ? "2px solid #bd8e28" : "1px solid #e7e2d8", borderRadius: 12, padding: 14, cursor: "pointer", transition: ".3s", boxShadow: "0 8px 22px rgba(5,20,45,.06)" }} className="hover:translate-y-[-3px] hover:shadow-[0_0_22px_rgba(213,168,61,.55)] hover:border-[#bd8e28]">
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#edf6ef", border: "1px solid #c7e2d0", display: "grid", placeItems: "center", color: "#075933", fontWeight: 900, fontSize: 14 }}>{m.pic}</div>
                              <div><b style={{ fontSize: 13 }}>{m.name}</b><br /><small style={{ color: viewingReferralNetwork?.name === m.name ? "#c6d2e1" : "#667085", fontSize: 11 }}>{m.invested} | {m.units} Units</small></div>
                            </div>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
                              <span style={statusBadge(m.status)}>{m.status}</span>
                              {m.labels.slice(0, 2).map((lb) => <span key={lb} style={labelStyle(lb)}>{lb}</span>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Level 2 */}
                    <div style={{ height: 20, width: 2, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto", opacity: matrixAnimated ? 1 : 0, transition: "opacity .4s ease .5s" }} />
                    <div style={{ opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(12px)", transition: "all .5s ease .6s", marginBottom: 10 }}>
                      <div style={{ textAlign: "center", fontSize: 12, fontWeight: 900, color: "#075933", marginBottom: 8 }}>Level 2 — 5 Active</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                        {["Sophia Lee", "Michael Brown", "Emily Davis", "Chris Park", "Ana Torres"].filter(n => !matrixSearch || n.toLowerCase().includes(matrixSearch.toLowerCase())).map((n, i) => (
                          <div key={i} onClick={() => setViewingReferralNetwork({ name: n, pic: n.charAt(0), invested: "$5,000", units: 5, status: "Active", joined: "Jun 2025", location: "US", source: "L1", labels: ["Investor"] })} style={{ background: viewingReferralNetwork?.name === n ? "linear-gradient(135deg,#071a33,#0d3366)" : "#fff", color: viewingReferralNetwork?.name === n ? "#fff" : "inherit", border: viewingReferralNetwork?.name === n ? "2px solid #bd8e28" : "1px solid #e7e2d8", borderRadius: 10, padding: 10, textAlign: "center", fontSize: 12, transition: ".3s", cursor: "pointer" }} className="hover:translate-y-[-2px] hover:border-[#bd8e28]">
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 4px", fontSize: 11, fontWeight: 900, color: "#075933" }}>{n.charAt(0)}</div>
                            <b style={{ fontSize: 11 }}>{n.split(" ")[0]}</b><br /><span style={{ ...statusBadge("Active"), fontSize: 9 }}>Active</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Level 3 */}
                    <div style={{ height: 20, width: 2, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto", opacity: matrixAnimated ? 1 : 0, transition: "opacity .4s ease .8s" }} />
                    <div style={{ opacity: matrixAnimated ? 1 : 0, transform: matrixAnimated ? "translateY(0)" : "translateY(12px)", transition: "all .5s ease .9s", marginBottom: 10 }}>
                      <div style={{ textAlign: "center", fontSize: 12, fontWeight: 900, color: "#075933", marginBottom: 8 }}>Level 3 — 3 Active, Expanding</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(9,1fr)", gap: 6 }}>
                        {["Tyler Reed", "Keisha Moore", "Ryan Scott"].map((n, i) => (
                          <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "8px 4px", textAlign: "center", fontSize: 10, cursor: "pointer" }} className="hover:translate-y-[-2px] hover:border-[#bd8e28]">
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 3px", fontSize: 9, fontWeight: 900, color: "#075933" }}>{n.charAt(0)}</div>
                            <b style={{ fontSize: 9 }}>{n.split(" ")[0]}</b>
                          </div>
                        ))}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={`o${i}`} style={{ background: "#f9f6ef", border: "1px dashed #e7e2d8", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}><div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px dashed #c7e2d0", margin: "0 auto 3px", background: "#fff" }} /><span style={{ fontSize: 9, color: "#667085" }}>Open</span></div>
                        ))}
                      </div>
                    </div>

                    {/* Member Referral Network Panel — shows when you click a member */}
                    {viewingReferralNetwork && (
                      <div style={{ marginTop: 20, background: "#f9f6ef", border: "2px solid #bd8e28", borderRadius: 14, padding: "20px 24px", animation: "fadeIn .3s ease" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 16 }}>{viewingReferralNetwork.pic}</div>
                            <div><b style={{ fontSize: 15 }}>{viewingReferralNetwork.name}&apos;s Referral Network</b><br /><small style={{ color: "#667085" }}>Personal referral network — up to 40 members</small></div>
                          </div>
                          <button onClick={() => setViewingReferralNetwork(null)} style={btnOutline}>✕ Close</button>
                        </div>
                        <div className="sn-member-mini-grid" style={{ display: "grid", gap: 10 }}>
                          {[
                            { name: "Sub Member 1", status: "Active", units: 3 },
                            { name: "Sub Member 2", status: "Active", units: 5 },
                            { name: "Sub Member 3", status: "Pending", units: 2 },
                          ].map((sub, i) => (
                            <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 10, padding: 12, textAlign: "center" }}>
                              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 6px", fontSize: 11, fontWeight: 900, color: "#075933" }}>{sub.name.charAt(4)}</div>
                              <b style={{ fontSize: 11 }}>{sub.name}</b><br />
                              <small style={{ color: "#667085", fontSize: 10 }}>{sub.units} units</small><br />
                              <span style={{ ...statusBadge(sub.status), fontSize: 9, marginTop: 4, display: "inline-block" }}>{sub.status}</span>
                            </div>
                          ))}
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`emp-${i}`} style={{ background: "#fff", border: "1px dashed #e7e2d8", borderRadius: 10, padding: 12, textAlign: "center" }}>
                              <div style={{ width: 30, height: 30, borderRadius: "50%", border: "1px dashed #c7e2d0", margin: "0 auto 6px", background: "#f9f6ef" }} />
                              <span style={{ fontSize: 10, color: "#9aa0ab" }}>Available Slot</span>
                            </div>
                          ))}
                        </div>
                        <p style={{ fontSize: 11.5, color: "#667085", marginTop: 12, marginBottom: 0 }}>This member&apos;s personal referral network cap is <b>40 members</b>. {viewingReferralNetwork.name} has 3 of 40 slots filled. As admin, you can see all member referral networks from the full-screen referral network.</p>
                      </div>
                    )}

                    <div style={{ textAlign: "center", marginTop: 20 }}>
                      <button onClick={() => setMatrixFullscreen(true)} style={{ ...btnGreen, padding: "14px 28px", fontSize: 13 }}>⛶ Open Full Referral Network</button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ─── FULLSCREEN INTERACTIVE MATRIX ─── */
                <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#fcfbf8", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Toolbar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid #e7e2d8", background: "#fff", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Full Organization Referral Network</h2>
                      <span style={{ fontSize: 12, color: "#667085" }}>128 members · Unlimited depth</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input placeholder="Search members..." value={matrixSearch} onChange={(e) => setMatrixSearch(e.target.value)} style={{ ...fieldInput, width: 220, padding: "8px 14px", fontSize: 12 }} />
                      <select value={matrixFilter} onChange={(e) => setMatrixFilter(e.target.value)} style={{ ...fieldInput, width: "auto", padding: "8px 12px", fontSize: 12 }}><option value="all">All</option><option value="Active">Active</option><option value="Pending">Pending</option></select>
                      <button onClick={() => setMatrixZoom(Math.min(2, matrixZoom + 0.2))} style={{ ...btnOutline, padding: "6px 12px", fontSize: 14 }}>+</button>
                      <button onClick={() => setMatrixZoom(Math.max(0.4, matrixZoom - 0.2))} style={{ ...btnOutline, padding: "6px 12px", fontSize: 14 }}>−</button>
                      <span style={{ fontSize: 11, color: "#667085", minWidth: 50 }}>{Math.round(matrixZoom * 100)}%</span>
                      <button onClick={() => setMatrixFullscreen(false)} style={{ ...btnGreen, padding: "8px 16px" }}>✕ Close</button>
                    </div>
                  </div>
                  {/* Matrix Canvas — scrollable and zoomable */}
                  <div style={{ flex: 1, overflow: "auto", padding: 40 }}>
                    <div style={{ transform: `scale(${matrixZoom})`, transformOrigin: "top center", transition: "transform .3s ease", minWidth: 1200 }}>
                      {/* Root */}
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                        <div onMouseEnter={() => setHoveredMember({ name: "Lorenzo", invested: "$50,000", units: 50, status: "Active", joined: "May 19, 2025", location: "Cleveland, OH", role: "Founder", email: "lorenzo@selectnetwork.com", referrals: 3 })} onMouseLeave={() => setHoveredMember(null)} style={{ background: "#fff", border: "3px solid #bd8e28", borderRadius: 16, padding: "18px 28px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 12px 36px rgba(5,20,45,.10)", cursor: "pointer" }}>
                          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 22 }}>L</div>
                          <div><b style={{ fontSize: 16 }}>Lorenzo</b><br /><small style={{ color: "#667085" }}>Origin · Founder</small><div style={{ fontSize: 12, color: "#075933", marginTop: 2 }}>$50,000 | 50 Units | 3 Direct</div></div>
                        </div>
                      </div>
                      {/* Connector */}
                      <div style={{ height: 30, width: 3, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto" }} />
                      {/* Level 1 */}
                      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 900, color: "#075933", marginBottom: 12 }}>Level 1 — Direct Referrals (3)</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 900, margin: "0 auto 20px" }}>
                        {[
                          { name: "Maria Santos", pic: "M", invested: "$25,000", units: 25, status: "Active", joined: "May 20, 2025", location: "Miami, FL", role: "Builder", email: "maria@email.com", referrals: 3 },
                          { name: "David Chen", pic: "D", invested: "$10,000", units: 10, status: "Pending", joined: "May 22, 2025", location: "New York, NY", role: "Investor", email: "david@email.com", referrals: 2 },
                          { name: "James Wilson", pic: "J", invested: "$15,000", units: 15, status: "Active", joined: "May 28, 2025", location: "Dallas, TX", role: "Builder", email: "james@email.com", referrals: 0 },
                        ].filter(m => (matrixFilter === "all" || m.status === matrixFilter) && (!matrixSearch || m.name.toLowerCase().includes(matrixSearch.toLowerCase()))).map((m, i) => (
                          <div key={i} onMouseEnter={() => setHoveredMember(m)} onMouseLeave={() => setHoveredMember(null)} onClick={() => setDrawerMember({ ...m, labels: [m.role] } as any)} style={{ background: "#fff", border: "2px solid #e7e2d8", borderRadius: 14, padding: 18, cursor: "pointer", transition: ".3s", boxShadow: "0 8px 22px rgba(5,20,45,.06)" }} className="hover:translate-y-[-4px] hover:shadow-[0_0_30px_rgba(213,168,61,.55)] hover:border-[#bd8e28]">
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#edf6ef", border: "2px solid #c7e2d0", display: "grid", placeItems: "center", color: "#075933", fontWeight: 900, fontSize: 16 }}>{m.pic}</div>
                              <div><b style={{ fontSize: 14 }}>{m.name}</b><br /><small style={{ color: "#667085", fontSize: 11 }}>{m.role} · {m.location}</small></div>
                            </div>
                            <div style={{ fontSize: 12, color: "#5b6675", marginBottom: 8 }}>{m.invested} | {m.units} Units | {m.referrals} referral{m.referrals !== 1 ? "s" : ""}</div>
                            <div style={{ display: "flex", gap: 6 }}>
                              <span style={statusBadge(m.status)}>{m.status}</span>
                              <span style={{ padding: "3px 8px", borderRadius: 99, background: "#e7f0ff", color: "#1e4fa3", fontSize: 10, fontWeight: 900 }}>{m.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Connector */}
                      <div style={{ height: 24, width: 3, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto" }} />
                      {/* Level 2 */}
                      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 900, color: "#075933", marginBottom: 12 }}>Level 2 — 5 Active, 4 Open Slots</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, maxWidth: 1100, margin: "0 auto 20px" }}>
                        {[
                          { name: "Sophia Lee", pic: "S", invested: "$5,000", units: 5, status: "Active", location: "LA, CA", role: "Investor", email: "sophia@email.com", referrals: 1, joined: "Jun 1, 2025" },
                          { name: "Michael Brown", pic: "M", invested: "$8,000", units: 8, status: "Active", location: "Chicago, IL", role: "Builder", email: "michael@email.com", referrals: 2, joined: "Jun 5, 2025" },
                          { name: "Emily Davis", pic: "E", invested: "$3,000", units: 3, status: "Pending", location: "Houston, TX", role: "Investor", email: "emily@email.com", referrals: 0, joined: "Jun 8, 2025" },
                          { name: "Chris Park", pic: "C", invested: "$12,000", units: 12, status: "Active", location: "Atlanta, GA", role: "Investor", email: "chris@email.com", referrals: 0, joined: "Jun 10, 2025" },
                          { name: "Ana Torres", pic: "A", invested: "$6,000", units: 6, status: "Active", location: "San Diego, CA", role: "Builder", email: "ana@email.com", referrals: 0, joined: "Jun 12, 2025" },
                        ].filter(m => (matrixFilter === "all" || m.status === matrixFilter) && (!matrixSearch || m.name.toLowerCase().includes(matrixSearch.toLowerCase()))).map((m, i) => (
                          <div key={i} onMouseEnter={() => setHoveredMember(m)} onMouseLeave={() => setHoveredMember(null)} onClick={() => setDrawerMember({ ...m, labels: [m.role] } as any)} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 12, padding: 12, textAlign: "center", cursor: "pointer", transition: ".3s", boxShadow: "0 4px 14px rgba(5,20,45,.05)" }} className="hover:translate-y-[-3px] hover:border-[#bd8e28] hover:shadow-[0_0_22px_rgba(213,168,61,.4)]">
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 6px", fontSize: 13, fontWeight: 900, color: "#075933" }}>{m.pic}</div>
                            <b style={{ fontSize: 12 }}>{m.name}</b><br />
                            <small style={{ fontSize: 10, color: "#667085" }}>{m.invested} · {m.units}u</small><br />
                            <span style={{ ...statusBadge(m.status), fontSize: 9, marginTop: 4, display: "inline-block" }}>{m.status}</span>
                          </div>
                        ))}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={`open-${i}`} style={{ background: "#f9f6ef", border: "1px dashed #e7e2d8", borderRadius: 12, padding: 12, textAlign: "center" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1px dashed #c7e2d0", margin: "0 auto 6px", background: "#fff" }} />
                            <span style={{ fontSize: 11, color: "#9aa0ab" }}>Available</span>
                          </div>
                        ))}
                      </div>
                      {/* Connector */}
                      <div style={{ height: 24, width: 3, background: "linear-gradient(#bd8e28,#075933)", margin: "0 auto" }} />
                      {/* Level 3 */}
                      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 900, color: "#075933", marginBottom: 12 }}>Level 3 — 3 Active, Expanding</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(9,1fr)", gap: 8, maxWidth: 1200, margin: "0 auto 20px" }}>
                        {[
                          { name: "Tyler Reed", pic: "T", invested: "$4,000", units: 4, status: "Active", location: "Denver, CO", role: "Investor", email: "tyler@email.com", referrals: 0, joined: "Jun 20, 2025" },
                          { name: "Keisha Moore", pic: "K", invested: "$7,000", units: 7, status: "Active", location: "Boston, MA", role: "Builder", email: "keisha@email.com", referrals: 1, joined: "Jun 22, 2025" },
                          { name: "Ryan Scott", pic: "R", invested: "$2,500", units: 2, status: "Pending", location: "Phoenix, AZ", role: "Investor", email: "ryan@email.com", referrals: 0, joined: "Jun 25, 2025" },
                        ].filter(m => (matrixFilter === "all" || m.status === matrixFilter) && (!matrixSearch || m.name.toLowerCase().includes(matrixSearch.toLowerCase()))).map((m, i) => (
                          <div key={i} onMouseEnter={() => setHoveredMember(m)} onMouseLeave={() => setHoveredMember(null)} onClick={() => setDrawerMember({ ...m, labels: [m.role] } as any)} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "8px 6px", textAlign: "center", cursor: "pointer", transition: ".3s" }} className="hover:translate-y-[-2px] hover:border-[#bd8e28]">
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#edf6ef", display: "grid", placeItems: "center", margin: "0 auto 3px", fontSize: 10, fontWeight: 900, color: "#075933" }}>{m.pic}</div>
                            <b style={{ fontSize: 10 }}>{m.name.split(" ")[0]}</b><br />
                            <span style={{ fontSize: 8, color: "#667085" }}>{m.units}u</span>
                          </div>
                        ))}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={`o3-${i}`} style={{ background: "#f9f6ef", border: "1px dashed #e7e2d8", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px dashed #c7e2d0", margin: "0 auto 3px", background: "#fff" }} />
                            <span style={{ fontSize: 9, color: "#9aa0ab" }}>Open</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ textAlign: "center", marginTop: 20, color: "#667085", fontSize: 13 }}>
                        <p>Organization continues expanding — no cap on admin view. All levels render as members enroll.</p>
                      </div>
                    </div>
                  </div>
                  {/* Hover tooltip */}
                  {hoveredMember && (
                    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "#071a33", color: "#fff", borderRadius: 14, padding: "16px 24px", boxShadow: "0 16px 48px rgba(5,20,45,.4)", display: "flex", gap: 20, alignItems: "center", zIndex: 100000, maxWidth: 600, animation: "fadeIn .2s ease" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>{hoveredMember.name?.charAt(0)}</div>
                      <div style={{ flex: 1 }}>
                        <b style={{ fontSize: 15 }}>{hoveredMember.name}</b>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px 16px", marginTop: 6, fontSize: 12 }}>
                          <span><b style={{ color: "#ffd46f" }}>Invested:</b> {hoveredMember.invested}</span>
                          <span><b style={{ color: "#ffd46f" }}>Units:</b> {hoveredMember.units}</span>
                          <span><b style={{ color: "#ffd46f" }}>Status:</b> {hoveredMember.status}</span>
                          <span><b style={{ color: "#ffd46f" }}>Location:</b> {hoveredMember.location}</span>
                          <span><b style={{ color: "#ffd46f" }}>Role:</b> {hoveredMember.role}</span>
                          <span><b style={{ color: "#ffd46f" }}>Joined:</b> {hoveredMember.joined}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ANNOUNCEMENTS / COMMUNICATIONS */}
          {activeTab === "announcements" && (
            <div className="sn-mobile-content sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, animation: "fadeIn .5s ease" }}>
              {announcePosted && <div style={{ position: "fixed", top: 20, right: 20, zIndex: 99999, background: "#e3f5eb", border: "1px solid #87d4a5", borderRadius: 10, padding: "14px 20px", boxShadow: "0 10px 30px rgba(5,20,45,.15)" }}><b style={{ color: "#075933" }}>✓ Announcement {editingAnn ? "Updated" : "Published"}</b></div>}
              <div style={card}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 6px" }}>{editingAnn ? "Edit Announcement" : "Compose Announcement"}</h2>
                <p style={{ fontSize: 12.5, color: "#667085", margin: "0 0 14px", lineHeight: 1.5 }}>Create and publish announcements. They appear in investor and builder dashboards based on audience targeting.</p>
                <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Title</label><input value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} placeholder="Announcement title" style={fieldInput} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><label style={fieldLabel}>Audience</label><select value={annAudience} onChange={(e) => setAnnAudience(e.target.value)} style={fieldInput}><option value="all">All Members</option><option value="investors">Investors Only</option><option value="builders">Builders Only</option><option value="foundation_partners">Foundation Partners</option></select></div>
                  <div><label style={fieldLabel}>Priority</label><select value={annPriority} onChange={(e) => setAnnPriority(e.target.value)} style={fieldInput}><option value="normal">Normal</option><option value="urgent">Urgent</option></select></div>
                </div>
                <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Message</label><textarea value={annMsg} onChange={(e) => setAnnMsg(e.target.value)} rows={4} placeholder="Write your announcement..." style={{ ...fieldInput, resize: "none" as const }} /></div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={handlePublishAnnouncement} disabled={loading || !annTitle.trim()} style={{ ...btnGreen, opacity: loading || !annTitle.trim() ? 0.6 : 1 }}>{loading ? "Publishing..." : editingAnn ? "Update & Publish" : "Publish Now"}</button>
                  <button onClick={handleSaveDraft} disabled={loading || !annTitle.trim()} style={{ ...btnOutline, opacity: loading || !annTitle.trim() ? 0.6 : 1 }}>Save Draft</button>
                  {editingAnn && <button onClick={() => { setEditingAnn(null); setAnnTitle(""); setAnnMsg(""); setAnnPriority("normal"); }} style={btnOutline}>Cancel Edit</button>}
                </div>
              </div>
              <div style={card}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>All Announcements</h2>
                {broadcasts.length === 0 && <p style={{ color: "#667085", fontSize: 13 }}>No announcements yet. Create one to get started.</p>}
                {broadcasts.map((b: any) => (
                  <div key={b.id} style={{ padding: "12px 0", borderBottom: "1px solid #eef2f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <b style={{ fontSize: 14 }}>{b.title}</b>
                          {b.priority === "urgent" && <span style={{ background: "#fde8e8", color: "#dc2626", fontSize: 9, fontWeight: 900, padding: "2px 6px", borderRadius: 4 }}>URGENT</span>}
                        </div>
                        <small style={{ color: "#667085" }}>{b.published_at ? new Date(b.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"} · To: {b.audience}</small>
                        {b.message && <p style={{ fontSize: 12, color: "#4b5563", margin: "6px 0 0", lineHeight: 1.5 }}>{b.message.substring(0, 120)}{b.message.length > 120 ? "..." : ""}</p>}
                      </div>
                      <span style={statusBadge(b.status === "published" ? "Active" : b.status === "draft" ? "Pending" : "Inactive")}>{b.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <button onClick={() => { setEditingAnn(b); setAnnTitle(b.title); setAnnMsg(b.message || ""); setAnnAudience(b.audience || "all"); setAnnPriority(b.priority || "normal"); }} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px" }}>Edit</button>
                      {b.status === "published" && <button onClick={() => handleArchiveAnnouncement(b.id)} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px", borderColor: "#667085", color: "#667085" }}>Archive</button>}
                      {b.status === "draft" && <button onClick={async () => { await fetch("/api/announcements", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: b.id, status: "published", published_at: new Date().toISOString() }) }); fetchAnnouncements(); }} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px", borderColor: "#075933", color: "#075933" }}>Publish</button>}
                      <button onClick={() => handleDeleteAnnouncement(b.id)} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px", borderColor: "#dc2626", color: "#dc2626" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROSPECTS CRM */}
          {activeTab === "crm" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                {/* Add New Prospect Form */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Add New Prospect</h2>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div><label style={fieldLabel}>Name</label><input value={newProspect.name} onChange={(e) => setNewProspect({...newProspect, name: e.target.value})} placeholder="Full name" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Phone</label><input value={newProspect.phone} onChange={(e) => setNewProspect({...newProspect, phone: e.target.value})} placeholder="(555) 000-0000" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Email</label><input type="email" value={newProspect.email} onChange={(e) => setNewProspect({...newProspect, email: e.target.value})} placeholder="email@example.com" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Interest</label><input value={newProspect.interest_amount} onChange={(e) => setNewProspect({...newProspect, interest_amount: e.target.value})} placeholder="$5,000" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Referred By</label><input value={newProspect.source} onChange={(e) => setNewProspect({...newProspect, source: e.target.value})} placeholder="Source" style={fieldInput} /></div>
                  </div>
                  <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Notes</label><textarea value={newProspect.notes} onChange={(e) => setNewProspect({...newProspect, notes: e.target.value})} placeholder="Initial notes about this prospect..." rows={3} style={{ ...fieldInput, resize: "none" as const }} /></div>
                  <button onClick={addProspect} disabled={loading || !newProspect.name} style={{...btnGreen, opacity: loading || !newProspect.name ? 0.6 : 1}}>{loading ? "Adding..." : "Add Prospect"}</button>
                </div>
                {/* CRM Summary */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>CRM Summary</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                    {[{ label: "Total Prospects", value: String(prospects.length), color: "#071a33" }, { label: "Hot Leads", value: String(prospects.filter(p => p.status === "Hot Lead").length), color: "#dc2626" }, { label: "Warm", value: String(prospects.filter(p => p.status === "Warm").length), color: "#bd8e28" }, { label: "New", value: String(prospects.filter(p => p.status === "New").length), color: "#1e4fa3" }].map((s, i) => (
                      <div key={i} style={{ background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                        <small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase" }}>{s.label}</small>
                      </div>
                    ))}
                  </div>
                  <p style={{ color: "#667085", fontSize: 13, lineHeight: 1.6 }}>All prospect data is stored in the CRM. Click any prospect below to view details and manage notes. Data is private and only visible to admin users.</p>
                </div>
              </div>

              {/* Prospects List */}
              <div style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: 0 }}>All Prospects</h2>
                  <input placeholder="Search prospects..." style={{ ...fieldInput, width: 240, padding: "10px 14px" }} />
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 700 }}>
                    <thead><tr>{["Name", "Phone", "Interest", "Source", "Status", "Last Contact", "Actions"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {prospects.map((p) => (
                        <tr key={p.id} style={{ background: selectedProspect === p.id ? "#f9f6ef" : "transparent", cursor: "pointer" }} onClick={() => setSelectedProspect(selectedProspect === p.id ? null : p.id)}>
                          <td style={{ ...tdS, fontWeight: 700 }}>{p.name}</td>
                          <td style={tdS}>{p.phone}</td>
                          <td style={{ ...tdS, color: "#bd8e28", fontWeight: 700 }}>{p.interest}</td>
                          <td style={{ ...tdS, color: "#667085" }}>{p.source}</td>
                          <td style={tdS}><span style={{ padding: "4px 10px", borderRadius: 99, background: p.status === "Hot Lead" ? "#fde8e8" : p.status === "Warm" ? "#fffaf0" : "#e7f0ff", color: p.status === "Hot Lead" ? "#dc2626" : p.status === "Warm" ? "#bd8e28" : "#1e4fa3", fontSize: 11, fontWeight: 900 }}>{p.status}</span></td>
                          <td style={{ ...tdS, color: "#667085" }}>{p.lastContact}</td>
                          <td style={tdS}><button style={btnOutline} onClick={(e) => { e.stopPropagation(); setSelectedProspect(p.id); }}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Expanded Prospect Detail */}
                {selectedProspect && (() => {
                  const p = prospects.find(pr => pr.id === selectedProspect);
                  if (!p) return null;
                  return (
                    <div style={{ marginTop: 18, background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 12, padding: 20, animation: "fadeIn .3s ease" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                        <div>
                          <h3 style={{ margin: "0 0 4px", fontSize: 18, fontFamily: "Georgia, serif", fontWeight: 400 }}>{p.name}</h3>
                          <span style={{ padding: "4px 10px", borderRadius: 99, background: p.status === "Hot Lead" ? "#fde8e8" : p.status === "Warm" ? "#fffaf0" : "#e7f0ff", color: p.status === "Hot Lead" ? "#dc2626" : p.status === "Warm" ? "#bd8e28" : "#1e4fa3", fontSize: 11, fontWeight: 900 }}>{p.status}</span>
                        </div>
                        <button onClick={() => setSelectedProspect(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#667085" }}>✕</button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                        {[["Phone", p.phone], ["Email", p.email], ["Interest", p.interest], ["Source", p.source], ["Last Contact", p.lastContact], ["Status", p.status]].map(([l, v], i) => (
                          <div key={i}><small style={{ fontSize: 10, color: "#667085", fontWeight: 800, textTransform: "uppercase" }}>{l}</small><div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div></div>
                        ))}
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <label style={fieldLabel}>Notes & Follow-up</label>
                        <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 14px", fontSize: 13.5, lineHeight: 1.6, marginBottom: 10, color: "#3d4a57" }}>{p.notes}</div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <textarea value={crmNote} onChange={(e) => setCrmNote(e.target.value)} placeholder="Add a new note..." rows={2} style={{ flex: 1, ...fieldInput, resize: "none" as const }} />
                          <button onClick={() => updateProspectNote(p.id, crmNote)} disabled={loading} style={{ ...btnGreen, alignSelf: "flex-end", opacity: loading ? 0.6 : 1 }}>{loading ? "Saving..." : "Save Note"}</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button onClick={() => switchTab("scheduler")} style={btnGold}>Schedule Meeting</button>
                        <button style={btnOutline}>Convert to Member</button>
                        <button style={{ ...btnOutline, borderColor: "#dc2626", color: "#dc2626" }}>Remove</button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* SCHEDULER — Enhanced */}
          {activeTab === "scheduler" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              {/* Success Toast */}
              {meetingCreated && <div style={{ position: "fixed", top: 20, right: 20, zIndex: 99999, background: "#e3f5eb", border: "1px solid #87d4a5", borderRadius: 10, padding: "14px 20px", boxShadow: "0 10px 30px rgba(5,20,45,.15)", animation: "fadeIn .3s ease" }}><b style={{ color: "#075933" }}>✓ Meeting Created Successfully</b></div>}

              <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                {/* Schedule Form */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Schedule Meeting</h2>
                  <div className="sn-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div><label style={fieldLabel}>Prospect / Member Name</label><input placeholder="Enter name" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Email</label><input type="email" placeholder="email@example.com" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Phone</label><input type="tel" placeholder="(555) 000-0000" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Date</label><input type="date" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Time</label><input type="time" style={fieldInput} /></div>
                    <div><label style={fieldLabel}>Meeting Type</label><select style={fieldInput}><option>Zoom Presentation</option><option>Onboarding Call</option><option>Follow-up</option><option>Investor Review</option><option>Prospect Introduction</option></select></div>
                  </div>
                  <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Meeting Notes</label><textarea rows={2} placeholder="Pre-meeting notes, agenda items..." style={{ ...fieldInput, resize: "none" as const }} /></div>
                  <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Follow-up Notes</label><textarea rows={2} placeholder="Post-meeting follow-up..." style={{ ...fieldInput, resize: "none" as const }} /></div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button onClick={handleCreateMeeting} style={btnGreen}>Create Invite</button>
                    <button onClick={handleCreateZoom} style={btnGold}>Create Zoom Meeting</button>
                    <button onClick={() => setShowGcal(true)} style={btnOutline}>Connect Google Calendar</button>
                  </div>
                </div>

                {/* Monthly Calendar */}
                <div style={card}>
                  <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 18, margin: "0 0 14px" }}>June 2025</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 16 }}>
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                      <div key={d} style={{ textAlign: "center", padding: "6px 0", fontSize: 11, fontWeight: 900, color: "#667085" }}>{d}</div>
                    ))}
                    {calendarDays.map((day, i) => {
                      const hasEvent = day === 2 || day === 4 || day === 6 || day === 10;
                      const isToday = day === new Date().getDate();
                      return (
                        <div key={i} style={{ textAlign: "center", padding: "8px 4px", borderRadius: 6, fontSize: 12, fontWeight: isToday ? 900 : 500, background: isToday ? "#075933" : hasEvent ? "#f9f6ef" : "transparent", color: isToday ? "#fff" : day ? "#071a33" : "transparent", border: hasEvent && !isToday ? "1px solid #e7e2d8" : "1px solid transparent", cursor: day ? "pointer" : "default", transition: ".2s", minHeight: 32 }}>
                          {day || ""}
                          {hasEvent && !isToday && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#bd8e28", margin: "2px auto 0" }} />}
                        </div>
                      );
                    })}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 10px", color: "#071a33" }}>Upcoming Meetings</h3>
                  {meetings.map((m) => (
                    <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef2f6", gap: 8, flexWrap: "wrap" }}>
                      <div>
                        <b style={{ fontSize: 13 }}>{m.title}</b><br />
                        <small style={{ color: "#667085" }}>{m.date} • {m.time} • {m.type}</small>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={statusBadge(m.status)}>{m.status}</span>
                        {m.zoom && <button style={{ ...btnOutline, fontSize: 9, padding: "4px 8px" }}>Join Zoom</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="sn-mobile-content" style={{ maxWidth: 600, animation: "fadeIn .5s ease" }}>
              <div style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>System Settings</h2>
                {[["Admin Email", "admin@selectnetwork.com"], ["Company Name", "The Select Network Member Group"], ["Unit Price", "$100"], ["Total Units", "50,000"]].map(([l, v], i) => (
                  <div key={i} style={{ marginBottom: 14 }}><label style={fieldLabel}>{l}</label><input defaultValue={v} style={fieldInput} /></div>
                ))}
                <h3 style={{ margin: "20px 0 10px", fontSize: 16 }}>Integrations</h3>
                {["Stripe / Stripe Treasury", "Zoom API", "Google Calendar", "Supabase"].map((n, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eef2f6", flexWrap: "wrap", gap: 8 }}><span style={{ fontWeight: 700, fontSize: 14 }}>{n}</span><span style={statusBadge("Pending")}>Ready</span></div>
                ))}
                <button style={{ ...btnGreen, marginTop: 16 }}>Save Settings</button>
              </div>
            </div>
          )}

          {/* CHAT / SUPPORT */}
          {activeTab === "chat" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 4px" }}>Support Inbox</h2>
                    <p style={{ color: "#667085", fontSize: 13, margin: 0 }}>View and respond to member support tickets. All messages are stored in Supabase.</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select value={ticketFilter} onChange={(e) => setTicketFilter(e.target.value)} style={{ ...fieldInput, width: "auto", padding: "8px 12px", fontSize: 12 }}>
                      <option value="all">All Tickets</option><option value="open">Open</option><option value="pending">Pending</option><option value="resolved">Resolved</option><option value="closed">Closed</option>
                    </select>
                    <button onClick={fetchTickets} style={btnOutline}>Refresh</button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 0, minHeight: 420, border: "1px solid #e7e2d8", borderRadius: 12, overflow: "hidden" }}>
                  {/* Ticket List */}
                  <div style={{ background: "#f9f6ef", borderRight: "1px solid #e7e2d8", overflowY: "auto", maxHeight: 500 }}>
                    {tickets.length === 0 && <p style={{ padding: 16, color: "#667085", fontSize: 13 }}>No support tickets yet.</p>}
                    {tickets.filter((t: any) => ticketFilter === "all" || t.status === ticketFilter).map((t: any) => (
                      <div key={t.id} onClick={() => { setActiveTicket(t); fetchMessages(t.id); }} style={{ padding: "14px 16px", borderBottom: "1px solid #eef2f6", cursor: "pointer", background: activeTicket?.id === t.id ? "#fff" : "transparent", transition: ".2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <b style={{ fontSize: 13 }}>{t.member_name || "Unknown"}</b>
                          <span style={{ ...statusBadge(t.status === "open" ? "Active" : t.status === "pending" ? "Pending" : "Inactive"), fontSize: 9 }}>{t.status}</span>
                        </div>
                        <p style={{ fontSize: 12, color: "#667085", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.subject}</p>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 10, color: "#9ca3af" }}>{new Date(t.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          {t.priority === "urgent" && <span style={{ background: "#fde8e8", color: "#dc2626", fontSize: 8, fontWeight: 900, padding: "1px 4px", borderRadius: 3 }}>URGENT</span>}
                          <span style={{ fontSize: 10, color: "#9ca3af" }}>{t.member_role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Message Thread */}
                  <div style={{ display: "flex", flexDirection: "column", padding: 0 }}>
                    {activeTicket ? (
                      <>
                        <div style={{ padding: "14px 18px", borderBottom: "1px solid #e7e2d8", background: "#fff" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                            <div>
                              <b style={{ fontSize: 15 }}>{activeTicket.member_name}</b>
                              <span style={{ marginLeft: 8, fontSize: 11, color: "#667085" }}>{activeTicket.member_email}</span>
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                              {activeTicket.status !== "resolved" && <button onClick={() => handleUpdateTicketStatus(activeTicket.id, "resolved")} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px", borderColor: "#075933", color: "#075933" }}>Resolve</button>}
                              {activeTicket.status !== "closed" && <button onClick={() => handleUpdateTicketStatus(activeTicket.id, "closed")} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px", borderColor: "#667085", color: "#667085" }}>Close</button>}
                              {activeTicket.status === "closed" && <button onClick={() => handleUpdateTicketStatus(activeTicket.id, "open")} style={{ ...btnOutline, fontSize: 10, padding: "4px 10px", borderColor: "#1e4fa3", color: "#1e4fa3" }}>Reopen</button>}
                            </div>
                          </div>
                          <div style={{ fontSize: 12, color: "#667085", marginTop: 4 }}>Subject: {activeTicket.subject} · Priority: {activeTicket.priority} · Status: {activeTicket.status}</div>
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", padding: 16, maxHeight: 280, background: "#fafaf8" }}>
                          {ticketMessages.length === 0 && <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", marginTop: 40 }}>No messages yet.</p>}
                          {ticketMessages.map((m: any) => (
                            <div key={m.id} style={{ alignSelf: m.sender_role === "admin" ? "flex-end" : "flex-start", background: m.sender_role === "admin" ? "linear-gradient(135deg,#075933,#0b7346)" : "#f0f2f5", color: m.sender_role === "admin" ? "#fff" : "#071a33", borderRadius: m.sender_role === "admin" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "10px 14px", maxWidth: "80%", fontSize: 13 }}>
                              {m.sender_role !== "admin" && <b style={{ fontSize: 11, display: "block", marginBottom: 3 }}>{m.sender_name}</b>}
                              {m.message}
                              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4 }}>{new Date(m.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 10, padding: "12px 16px", borderTop: "1px solid #e7e2d8" }}>
                          <input value={replyMsg} onChange={(e) => setReplyMsg(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSendReply(); }} placeholder="Type a reply..." style={{ flex: 1, ...fieldInput, padding: "10px 14px" }} />
                          <button onClick={handleSendReply} disabled={!replyMsg.trim()} style={{ ...btnGreen, opacity: replyMsg.trim() ? 1 : 0.5 }}>Send</button>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#9ca3af", fontSize: 14, padding: 20 }}>Select a ticket to view the conversation</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MILESTONES */}
          {activeTab === "milestones" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={card}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 6px" }}>Member Milestones</h2>
                <p style={{ color: "#667085", fontSize: 13, margin: "0 0 16px" }}>Track and manage milestone achievements across the network.</p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                    <thead><tr>{["Milestone", "Required", "Members Achieved", "Status"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        { name: "Payment Completed", req: "Payment confirmed", achieved: 48, status: "Active" },
                        { name: "First Investment", req: "1+ units purchased", achieved: 42, status: "Active" },
                        { name: "10 Referrals", req: "10 active referrals", achieved: 12, status: "Active" },
                        { name: "25 Referrals", req: "25 active referrals", achieved: 4, status: "Active" },
                        { name: "40 Member Cap", req: "Full referral network (40)", achieved: 1, status: "Active" },
                        { name: "$1,000 Incentive Earned", req: "Qualified sharing incentive", achieved: 8, status: "Active" },
                        { name: "Foundation Partner", req: "$10,000+ investment", achieved: 12, status: "Active" },
                      ].map((m, i) => (
                        <tr key={i}><td style={tdS}><b>{m.name}</b></td><td style={{ ...tdS, color: "#667085" }}>{m.req}</td><td style={tdS}>{m.achieved}</td><td style={tdS}><span style={statusBadge(m.status)}>{m.status}</span></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div style={card}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 6px" }}>Certificates</h2>
                <p style={{ color: "#667085", fontSize: 13, margin: "0 0 16px" }}>Manage and issue certificates for member achievements. Click &quot;View&quot; to preview a certificate.</p>
                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <button style={btnGreen}>+ Issue New Certificate</button>
                  <button style={btnOutline}>Download Template</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                    <thead><tr>{["Certificate", "Member", "Issue Date", "Status", "Action"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        { cert: "Foundation Partner", member: "Maria Santos", date: "May 20, 2025", status: "Issued" },
                        { cert: "Participation Certificate", member: "David Chen", date: "May 22, 2025", status: "Issued" },
                        { cert: "Builder Achievement — 10 Referrals", member: "James Wilson", date: "Jun 5, 2025", status: "Issued" },
                        { cert: "Top Builder Q2", member: "Maria Santos", date: "Pending", status: "Draft" },
                      ].map((c, i) => (
                        <tr key={i}><td style={tdS}><b>{c.cert}</b></td><td style={tdS}>{c.member}</td><td style={{ ...tdS, color: "#667085" }}>{c.date}</td><td style={tdS}><span style={statusBadge(c.status === "Issued" ? "Active" : c.status === "Pending" ? "Pending" : "Pending")}>{c.status}</span></td><td style={tdS}>{c.status === "Issued" ? <button style={btnOutline} onClick={() => setViewCert({ cert: c.cert, member: c.member, date: c.date })}>View</button> : <button style={btnOutline}>Issue</button>}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT LOGS */}
          {activeTab === "audit" && (
            <div className="sn-mobile-content" style={{ animation: "fadeIn .5s ease" }}>
              <div className="sn-table-wrap" style={card}><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: "0 0 14px" }}>Audit Logs</h2>
                <div className="sn-desktop-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 500 }}>
                  <thead><tr>{["Timestamp", "User", "Action", "Details"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[{ time: "May 28, 10:45 AM", user: "Admin", action: "Approved Member Request", details: "Michael Anderson" }, { time: "May 27, 3:20 PM", user: "Admin", action: "Published Report", details: "Q2 Financial Snapshot" }, { time: "May 26, 9:00 AM", user: "System", action: "New Member Request", details: "Sophia Martinez" }].map((l, i) => (
                      <tr key={i}><td style={{ ...tdS, color: "#667085" }}>{l.time}</td><td style={tdS}>{l.user}</td><td style={tdS}>{l.action}</td><td style={{ ...tdS, color: "#667085" }}>{l.details}</td></tr>
                    ))}
                  </tbody>
                </table>
                </div>
                <div className="sn-mobile-cards" style={{ display: "none" }}>
                  {[{ time: "May 28, 10:45 AM", user: "Admin", action: "Approved Member Request", details: "Michael Anderson" }, { time: "May 27, 3:20 PM", user: "Admin", action: "Published Report", details: "Q2 Financial Snapshot" }, { time: "May 26, 9:00 AM", user: "System", action: "New Member Request", details: "Sophia Martinez" }].map((l, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><b style={{ fontSize: 14 }}>{l.action}</b><span style={{ fontSize: 11, color: "#667085" }}>{l.time}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">User</span><span className="sn-m-value">{l.user}</span></div>
                      <div className="sn-m-card-row"><span className="sn-m-label">Details</span><span className="sn-m-value">{l.details}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Admin Member Drawer */}
      {drawerMember && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex" }}>
          <div onClick={() => setDrawerMember(null)} style={{ flex: 1, background: "rgba(7,26,51,.3)", backdropFilter: "blur(2px)" }} />
          <div className="sn-drawer" style={{ width: 400, background: "#fff", boxShadow: "-10px 0 40px rgba(5,20,45,.15)", padding: 28, overflow: "auto", animation: "slideInRight .3s ease" }}>
            <button onClick={() => setDrawerMember(null)} style={{ float: "right", background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#667085" }}>✕</button>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 24, margin: "0 auto 12px" }}>{drawerMember.pic}</div>
              <b style={{ fontSize: 20 }}>{drawerMember.name}</b><br /><span style={statusBadge(drawerMember.status)}>{drawerMember.status}</span>
            </div>
            {/* Assigned Labels */}
            <div style={{ marginBottom: 16 }}>
              <div style={fieldLabel}>Member Labels</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                {drawerMember.labels.map((lb) => <span key={lb} style={{ ...labelStyle(lb), fontSize: 10, padding: "4px 9px" }}>{lb}</span>)}
              </div>
              <details>
                <summary style={{ fontSize: 11.5, color: "#a46a00", fontWeight: 800, cursor: "pointer" }}>+ Assign / Edit Labels</summary>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
                  {allLabels.map((lb) => {
                    const active = drawerMember.labels.includes(lb);
                    return <span key={lb} style={{ ...labelStyle(lb), fontSize: 9.5, padding: "4px 9px", cursor: "pointer", opacity: active ? 1 : 0.4, border: active ? "1px solid currentColor" : "1px solid transparent" }}>{lb}</span>;
                  })}
                </div>
              </details>
            </div>
            {[["Joined", drawerMember.joined], ["Amount Invested", drawerMember.invested], ["Units", String(drawerMember.units)], ["Location", drawerMember.location], ["Referral Source", drawerMember.source], ["Status", drawerMember.status]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef2f6", fontSize: 14 }}><span style={{ color: "#667085" }}>{l}</span><b>{v}</b></div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20 }}>
              <button style={btnGreen}>Approve</button>
              <button style={btnOutline}>Pause</button>
              <button style={btnOutline}>Move</button>
              <button style={btnOutline}>View Full Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {showZoom && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "grid", placeItems: "center", background: "rgba(7,26,51,.4)", backdropFilter: "blur(3px)" }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, maxWidth: 440, width: "90%", boxShadow: "0 24px 60px rgba(5,20,45,.2)", animation: "fadeIn .3s ease" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, margin: "0 0 6px" }}>Zoom Meeting Created</h2>
            <p style={{ color: "#667085", fontSize: 13, margin: "0 0 14px" }}>Your meeting link is ready. Share it with the participant.</p>
            <div style={{ background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "14px 16px", fontSize: 14, marginBottom: 16, fontFamily: "monospace", wordBreak: "break-all" }}>{zoomLink || "https://zoom.us/j/123456789"}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => { navigator.clipboard.writeText(zoomLink); }} style={btnGreen}>Copy Link</button>
              <button style={btnGold}>Send Invite</button>
              <button style={btnOutline}>Add to Google Calendar</button>
              <button style={{ ...btnOutline, borderColor: "#667085", color: "#667085" }} onClick={() => setShowZoom(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Google Calendar Modal */}
      {showGcal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "grid", placeItems: "center", background: "rgba(7,26,51,.4)", backdropFilter: "blur(3px)" }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, maxWidth: 440, width: "90%", boxShadow: "0 24px 60px rgba(5,20,45,.2)", animation: "fadeIn .3s ease" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, margin: "0 0 14px" }}>Google Calendar</h2>
            <p style={{ color: "#667085", lineHeight: 1.7, marginBottom: 16 }}>Google Calendar connection placeholder. OAuth integration will be connected in production.</p>
            <button onClick={() => setShowGcal(false)} style={btnGreen}>Close</button>
          </div>
        </div>
      )}

      {/* Certificate Viewer */}
      {viewCert && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(7,26,51,.82)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 24, animation: "fadeIn .3s ease" }}>
          <button onClick={() => setViewCert(null)} style={{ position: "absolute", top: 20, right: 20, background: "#fff", border: 0, borderRadius: "50%", width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer", fontSize: 22, color: "#071a33", boxShadow: "0 6px 20px rgba(0,0,0,.25)" }} aria-label="Close">✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 800, width: "100%", background: "#fff", borderRadius: 16, padding: 0, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}>
            {/* Certificate Body */}
            <div style={{ background: "linear-gradient(135deg,#fbf9f4 0%,#fff9ec 50%,#fbf9f4 100%)", padding: "50px 60px", textAlign: "center", position: "relative", border: "12px solid transparent", borderImage: "linear-gradient(135deg, #d5a83d 0%, #f5e4a8 25%, #d5a83d 50%, #f5e4a8 75%, #d5a83d 100%) 1" }}>
              {/* Corner ornaments */}
              <div style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40, borderTop: "3px solid #d5a83d", borderLeft: "3px solid #d5a83d" }} />
              <div style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderTop: "3px solid #d5a83d", borderRight: "3px solid #d5a83d" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, width: 40, height: 40, borderBottom: "3px solid #d5a83d", borderLeft: "3px solid #d5a83d" }} />
              <div style={{ position: "absolute", bottom: 20, right: 20, width: 40, height: 40, borderBottom: "3px solid #d5a83d", borderRight: "3px solid #d5a83d" }} />

              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".3em", textTransform: "uppercase", color: "#bd8e28", marginBottom: 12 }}>The Select Network Member Group</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 400, color: "#071a33", margin: "0 0 8px", letterSpacing: "-.02em" }}>Certificate of Achievement</h2>
              <div style={{ width: 120, height: 2, background: "linear-gradient(90deg, transparent, #d5a83d, transparent)", margin: "0 auto 24px" }} />
              <p style={{ color: "#667085", fontSize: 14, margin: "0 0 8px" }}>This certifies that</p>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: 48, fontWeight: 400, color: "#071a33", margin: "0 0 8px", borderBottom: "2px solid #d5a83d", display: "inline-block", paddingBottom: 8 }}>{viewCert.member}</h1>
              <p style={{ color: "#667085", fontSize: 14, margin: "16px 0 8px" }}>has been recognized for</p>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 400, color: "#bd8e28", margin: "0 0 24px" }}>{viewCert.cert}</h3>
              <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 28px" }}>
                Presented in recognition of outstanding commitment to The Select Network Member Group community, demonstrating excellence in partnership, growth, and leadership.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 32, paddingTop: 20, borderTop: "1px solid #e7e2d8" }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontStyle: "italic", color: "#071a33" }}>Lorenzo Miller</div>
                  <div style={{ fontSize: 11, color: "#667085", marginTop: 4 }}>Founder & CEO</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px solid #d5a83d", background: "linear-gradient(135deg,#075933,#0d6d42)", color: "#ffd46f", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 12, margin: "0 auto" }}>SN</div>
                  <div style={{ fontSize: 10, color: "#667085", marginTop: 6 }}>Official Seal</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, color: "#071a33", fontWeight: 700 }}>Date Issued</div>
                  <div style={{ fontSize: 13, color: "#667085" }}>{viewCert.date}</div>
                </div>
              </div>
            </div>
            {/* Actions bar */}
            <div style={{ padding: "16px 24px", background: "#f9f6ef", borderTop: "1px solid #e7e2d8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#667085" }}>Certificate ID: SN-{Math.floor(1000 + Math.random() * 9000)}</span>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btnGreen}>Download PDF</button>
                <button style={btnOutline} onClick={() => setViewCert(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compensation Plan Lightbox */}
      {compOpen && (
        <div onClick={() => setCompOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(7,26,51,.82)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 24 }}>
          <button onClick={() => setCompOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "#fff", border: 0, borderRadius: "50%", width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer", fontSize: 22, color: "#071a33", boxShadow: "0 6px 20px rgba(0,0,0,.25)" }} aria-label="Close">✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1100, width: "100%", maxHeight: "88vh", overflow: "auto", borderRadius: 12 }}>
            <Image src="/assets/select-network/select-network-comp-plan.png" alt="The Select Network Member Group Compensation Plan" width={1024} height={640} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />
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
