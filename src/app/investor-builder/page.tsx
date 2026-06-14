"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Star, TrendingUp, FolderOpen, Wallet, Network, Megaphone, Settings, Bell, Mail, Diamond, CheckCircle, FileText, Menu, Award, Target, Users, MessageSquare } from "lucide-react";

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

const tabs = [
  { id: "overview", label: "Overview", ico: <LayoutDashboard size={20} /> },
  { id: "units", label: "Founder Units", ico: <Star size={20} /> },
  { id: "reports", label: "Reports", ico: <TrendingUp size={20} /> },
  { id: "docs", label: "Documents", ico: <FolderOpen size={20} /> },
  { id: "withdrawals", label: "Withdrawals", ico: <Wallet size={20} /> },
  { id: "matrix", label: "Referral Matrix", ico: <Network size={20} /> },
  { id: "milestones", label: "Milestones", ico: <Award size={20} /> },
  { id: "certificates", label: "Certificates", ico: <FileText size={20} /> },
  { id: "comms", label: "Communications", ico: <Megaphone size={20} /> },
  { id: "chat", label: "Chat", ico: <MessageSquare size={20} /> },
  { id: "settings", label: "Settings", ico: <Settings size={20} /> },
];

export default function InvestorBuilderPortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const units = useCountUp(50);
  const balance = useCountUp(5230);
  const referrals = useCountUp(28);

  const switchTab = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: "#071a33", background: "#fcfbf8" }}>
      {sidebarOpen && <div className="sn-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="sn-portal-grid" style={{ display: "grid", gridTemplateColumns: "296px 1fr", minHeight: "100vh" }}>
        <aside className={`sn-sidebar ${sidebarOpen ? "open" : ""}`} style={{ background: "linear-gradient(180deg,#fff 0%,#fbf8f1 54%,#efe7ff 100%)", borderRight: "1px solid #e7e2d8", padding: "24px 18px", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
          <div style={{ marginBottom: 28 }}>
            <Link href=""><Image src="/assets/select-network/select-network-logo.png" alt="Select Network" width={245} height={60} style={{ width: 220, height: "auto", display: "block" }} /></Link>
          </div>
          <nav style={{ display: "grid", gap: 7 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => switchTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "14px 16px", border: 0, borderRadius: 12, background: activeTab === t.id ? "linear-gradient(135deg,#5b34a3,#7c52d4)" : "transparent", color: activeTab === t.id ? "#fff" : "#10233b", fontWeight: 800, fontSize: 15, transition: ".25s", cursor: "pointer", boxShadow: activeTab === t.id ? "0 0 22px rgba(91,52,163,.35)" : "none" }}>
                <span style={{ width: 27, color: activeTab === t.id ? "#d4b8ff" : "#5b34a3", display: "flex", justifyContent: "center" }}>{t.ico}</span>{t.label}
              </button>
            ))}
          </nav>
        </aside>

        <main style={{ padding: "28px 30px 48px", minWidth: 0 }}>
          <div className="sn-app-topbar" style={{ display: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="sn-mobile-toggle" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#5b34a3", textTransform: "uppercase" }}>Investor + Builder Portal</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{tabs.find(t => t.id === activeTab)?.label || "Overview"}</div>
              </div>
            </div>
          </div>

          <div className="sn-desktop-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="sn-mobile-toggle" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
              <div>
                <div style={{ fontSize: 13, color: "#667085" }}>Welcome back to your portal</div>
                <h1 style={{ margin: "4px 0 0", fontSize: 28, fontFamily: "Georgia, serif", fontWeight: 400 }}>Good morning, Maria.</h1>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <span style={{ position: "relative", cursor: "pointer" }}><Bell size={22} color="#667085" /><span style={{ position: "absolute", top: -4, right: -8, background: "#dc2626", color: "#fff", fontSize: 10, fontWeight: 900, padding: "2px 5px", borderRadius: 99 }}>3</span></span>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#5b34a3,#7c52d4)", color: "#d4b8ff", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 16 }}>M</div>
              <div className="sn-user-desktop"><b style={{ fontSize: 14 }}>Maria Santos</b> <span style={{ background: "linear-gradient(135deg,#5b34a3,#7c52d4)", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 7px", borderRadius: 4, verticalAlign: "middle" }}>Investor-Builder</span><br /><small style={{ color: "#667085" }}>Foundation Partner</small></div>
            </div>
          </div>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14, marginBottom: 22 }}>
                {[
                  { ico: <Diamond size={20} />, label: "Status", value: "Active", color: "#5b34a3" },
                  { ico: <Star size={20} />, label: "Units", value: String(units) },
                  { ico: <Wallet size={20} />, label: "Balance", value: `$${balance.toLocaleString()}` },
                  { ico: <Network size={20} />, label: "Network", value: String(referrals) },
                  { ico: <Target size={20} />, label: "Downline Cap", value: `${referrals}/40` },
                  { ico: <TrendingUp size={20} />, label: "Role", value: "I+B" },
                ].map((k, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: "18px 16px", boxShadow: "0 8px 24px rgba(5,20,45,.06)", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#efe7ff", border: "1px solid #d4b8ff", display: "grid", placeItems: "center", color: "#5b34a3" }}>{k.ico}</div>
                    <div><small style={{ fontSize: 11, color: "#667085", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{k.label}</small><br /><b style={{ fontSize: 18, color: k.color || "#071a33" }}>{k.value}</b></div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fbf9f4", border: "1px solid #eee7d8", borderRadius: 12, padding: "14px 18px", marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <small style={{ fontSize: 11.5, fontWeight: 900, color: "#5b34a3", textTransform: "uppercase", letterSpacing: ".04em" }}>Personal Downline Capacity</small>
                  <b style={{ fontSize: 13, color: "#5b34a3" }}>{referrals} / 40 used</b>
                </div>
                <div style={{ height: 10, borderRadius: 99, background: "#e7e2d8", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (referrals / 40) * 100)}%`, borderRadius: 99, background: "linear-gradient(90deg,#5b34a3,#bd8e28)", transition: "width .8s ease" }} />
                </div>
              </div>

              <p style={{ color: "#667085", fontSize: 14, lineHeight: 1.7 }}>As an <b>Investor-Builder</b>, you have full access to investment returns, referral tools, milestones, and builder incentives. Eligible Investor-Builders may qualify for referral or marketing incentives according to official program terms.</p>
            </div>
          )}

          {/* MATRIX */}
          {activeTab === "matrix" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 12px" }}>Referral Matrix</h2>
                <p style={{ color: "#667085", fontSize: 13, marginBottom: 20 }}>Your personal downline participation is capped at <b>40 members</b> ({referrals} of 40 currently used).</p>
                <div style={{ textAlign: "center", padding: "40px 0", background: "#f9f6ef", borderRadius: 12, border: "1px solid #e7e2d8" }}>
                  <Network size={48} color="#5b34a3" style={{ marginBottom: 12 }} />
                  <p style={{ color: "#667085", fontSize: 14 }}>Full interactive matrix view — connects to live data.</p>
                </div>
              </div>
            </div>
          )}

          {/* MILESTONES */}
          {activeTab === "milestones" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 14px" }}>Milestones & Progress</h2>
                {[
                  { title: "Payment Completed", done: true },
                  { title: "First Investment Completed", done: true },
                  { title: "First Referral Made", done: true },
                  { title: "10 Active Referrals", done: true },
                  { title: "25 Active Referrals", done: true },
                  { title: "$1,000 Sharing Incentive Earned", done: false },
                  { title: "40 Member Cap Reached", done: false },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #eef2f6" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.done ? "#e3f5eb" : "#f0f2f5", display: "grid", placeItems: "center", color: m.done ? "#087345" : "#9aa0ab" }}>{m.done ? <CheckCircle size={16} /> : <Target size={16} />}</div>
                    <b style={{ fontSize: 14, color: m.done ? "#071a33" : "#9aa0ab" }}>{m.title}</b>
                    {m.done && <span style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: 99, background: "#e3f5eb", color: "#087345", fontSize: 10, fontWeight: 900 }}>Done</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATES */}
          {activeTab === "certificates" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 14px" }}>Certificates & Achievements</h2>
                {[
                  { title: "Foundation Partner Certificate", date: "May 20, 2025", available: true },
                  { title: "Participation Certificate", date: "May 20, 2025", available: true },
                  { title: "Investor-Builder Achievement — 10 Referrals", date: "Jun 5, 2025", available: true },
                  { title: "Top Builder Q2 2025", date: "Pending", available: false },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #eef2f6", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <b style={{ fontSize: 14 }}>{c.title}</b>
                      <div style={{ fontSize: 12, color: "#667085" }}>{c.date}</div>
                    </div>
                    {c.available ? (
                      <button style={{ background: "linear-gradient(135deg,#5b34a3,#7c52d4)", color: "#fff", border: 0, borderRadius: 8, padding: "8px 16px", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer" }}>Download PDF</button>
                    ) : (
                      <span style={{ padding: "4px 10px", borderRadius: 99, background: "#f0f2f5", color: "#667085", fontSize: 11, fontWeight: 900 }}>Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMMS */}
          {activeTab === "comms" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "linear-gradient(135deg,#071a33,#0d3366)", borderRadius: 14, padding: "20px 24px", color: "#fff", marginBottom: 18 }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, margin: 0 }}>Communications</h2>
                <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#c6d2e1" }}>Official broadcasts from The Select Network team.</p>
              </div>
              {[
                { title: "Q2 2025 Report Published", body: "The Q2 report is now available in your Documents section.", date: "May 28, 2025" },
                { title: "Builder Incentive Update", body: "Updated sharing incentive guidelines.", date: "Jun 1, 2025" },
              ].map((a, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 12, padding: "18px 20px", marginBottom: 12, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                  <b style={{ fontSize: 15 }}>{a.title}</b>
                  <div style={{ fontSize: 11, color: "#667085", margin: "4px 0 8px" }}>{a.date}</div>
                  <p style={{ fontSize: 13, color: "#3d4a57", margin: 0, lineHeight: 1.6 }}>{a.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* CHAT */}
          {activeTab === "chat" && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 14px" }}>Chat</h2>
                <div style={{ borderLeft: "4px solid #bd8e28", background: "#fffaf0", color: "#604b17", padding: "12px 14px", fontSize: 12.5, borderRadius: "0 6px 6px 0", marginBottom: 16 }}>
                  Chat is a controlled communication channel. Use it to message the Select Network support team directly. Member-to-member messaging is not available.
                </div>
                <div style={{ background: "#f9f6ef", borderRadius: 12, padding: 20, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ color: "#667085", textAlign: "center" }}>No messages yet. Start a conversation with the support team.</p>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <input placeholder="Type a message..." style={{ flex: 1, background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 8, padding: "12px 16px", fontSize: 14, outline: "none" }} />
                  <button style={{ background: "linear-gradient(135deg,#5b34a3,#7c52d4)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 18px", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer" }}>Send</button>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs show placeholder */}
          {["units", "reports", "docs", "withdrawals", "settings"].includes(activeTab) && (
            <div style={{ animation: "fadeIn .5s ease" }}>
              <div style={{ background: "#fff", border: "1px solid #e7e2d8", borderRadius: 14, padding: 24, boxShadow: "0 8px 24px rgba(5,20,45,.06)" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 14px" }}>{tabs.find(t => t.id === activeTab)?.label}</h2>
                <p style={{ color: "#667085", fontSize: 14, lineHeight: 1.7 }}>This section mirrors the Investor portal functionality. As an Investor + Builder, you have full access to all investment features plus builder tools, milestones, and referral matrix.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
