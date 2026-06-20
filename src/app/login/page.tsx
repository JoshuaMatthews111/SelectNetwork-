"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, ShieldCheck, UserPlus, Loader2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"choice" | "investor" | "staff" | "apply">("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fieldLabel: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 900, color: "#667085", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 };
  const fieldInput: React.CSSProperties = { width: "100%", background: "#f9f6ef", border: "1px solid #e7e2d8", borderRadius: 4, padding: "14px 16px", fontSize: 14, outline: "none", color: "#071a33" };

  const [applyForm, setApplyForm] = useState({ firstName: "", lastName: "", email: "", phone: "", amount: "", referral: "", message: "" });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyLoading(true);
    try {
      const res = await fetch("/api/member-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${applyForm.firstName} ${applyForm.lastName}`,
          email: applyForm.email,
          phone: applyForm.phone,
          interest_amount: parseInt(applyForm.amount.replace(/[^0-9]/g, "")) || 0,
          notes: `Referral: ${applyForm.referral}\nMessage: ${applyForm.message}`
        })
      });
      if (res.ok) {
        setApplySuccess(true);
        setApplyForm({ firstName: "", lastName: "", email: "", phone: "", amount: "", referral: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    }
    setApplyLoading(false);
  };

  const renderApply = () => (
    <div style={{ maxWidth: 520, width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <Link href="/"><Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={250} height={120} className="sn-glow" style={{ height: 57, width: "auto", margin: "0 auto 20px", display: "block" }} /></Link>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px", color: "#071a33" }}>Complete Your Participation</h1>
        <p style={{ color: "#667085", fontSize: 14, margin: 0 }}>Submit your information to get started with The Select Network Member Group</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e7e2d8", boxShadow: "0 18px 45px rgba(5,20,45,.12)", padding: 32, borderRadius: 6 }}>
        {applySuccess ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#dcfce7", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, margin: "0 0 8px" }}>Information Received!</h3>
            <p style={{ color: "#667085", fontSize: 14, margin: "0 0 20px" }}>Thank you. Visit the Invest Now page to select your units, review the agreement, and submit your payment.</p>
            <button onClick={() => { setApplySuccess(false); setMode("choice"); }} style={{ background: "linear-gradient(135deg,#d1a645,#bc8b25)", color: "#fff", border: 0, borderRadius: 8, padding: "12px 24px", fontWeight: 800, cursor: "pointer" }}>Back to Login</button>
          </div>
        ) : (
        <>
        <form onSubmit={handleApply}>
          <div className="sn-apply-name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={fieldLabel}>First Name</label><input required value={applyForm.firstName} onChange={(e) => setApplyForm({...applyForm, firstName: e.target.value})} style={fieldInput} /></div>
            <div><label style={fieldLabel}>Last Name</label><input required value={applyForm.lastName} onChange={(e) => setApplyForm({...applyForm, lastName: e.target.value})} style={fieldInput} /></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Email</label><input type="email" required value={applyForm.email} onChange={(e) => setApplyForm({...applyForm, email: e.target.value})} placeholder="you@email.com" style={fieldInput} /></div>
          <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Phone</label><input required value={applyForm.phone} onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})} placeholder="(555) 000-0000" style={fieldInput} /></div>
          <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Desired Investment Amount</label><input required value={applyForm.amount} onChange={(e) => setApplyForm({...applyForm, amount: e.target.value})} placeholder="$25,000" style={fieldInput} /></div>
          <div style={{ marginBottom: 12 }}><label style={fieldLabel}>Referral Code (Optional)</label><input value={applyForm.referral} onChange={(e) => setApplyForm({...applyForm, referral: e.target.value})} placeholder="Enter referral code" style={fieldInput} /></div>
          <div style={{ marginBottom: 16 }}>
            <label style={fieldLabel}>Message</label>
            <textarea rows={3} value={applyForm.message} onChange={(e) => setApplyForm({...applyForm, message: e.target.value})} placeholder="Tell us about your interest..." style={{ ...fieldInput, resize: "none" as const }} />
          </div>
          <button type="submit" disabled={applyLoading} className="sn-btn-gold sn-btn" style={{ width: "100%", padding: "16px 0", opacity: applyLoading ? 0.7 : 1 }}>
            {applyLoading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</> : "Continue to Invest Now →"}
          </button>
        </form>
        <button onClick={() => setMode("choice")} style={{ display: "block", width: "100%", textAlign: "center", marginTop: 14, background: "none", border: "none", color: "#667085", fontSize: 13, cursor: "pointer" }}>← Back to login options</button>
        </>
        )}
      </div>
    </div>
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo login bypass
    if ((email === "demo" || email === "demo@demo.com") && password === "demo") {
      router.push('/investor');
      return;
    }
    
    const supabase = getSupabaseBrowser();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    
    // Get user role and redirect accordingly
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('members')
        .select('role')
        .eq('email', email)
        .single() as { data: { role?: string } | null };
      
      if (profile?.role === 'admin') {
        router.push('/admin');
      } else if (profile?.role === 'builder') {
        router.push('/builder');
      } else {
        router.push('/investor');
      }
    }
    setLoading(false);
  };

  const renderLogin = () => (
    <div style={{ maxWidth: 420, width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <Link href="/"><Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={250} height={120} className="sn-glow" style={{ height: 57, width: "auto", margin: "0 auto 20px", display: "block" }} /></Link>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px", color: "#071a33" }}>{mode === "investor" ? "Investor Login" : "Staff / Admin Login"}</h1>
        <p style={{ color: "#667085", fontSize: 14, margin: 0 }}>{mode === "investor" ? "Access your private member dashboard" : "Access the admin back office"}</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e7e2d8", boxShadow: "0 18px 45px rgba(5,20,45,.12)", padding: 32, borderRadius: 6 }}>
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
            <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}><label style={fieldLabel}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" style={fieldInput} /></div>
          <div style={{ marginBottom: 20 }}><label style={fieldLabel}>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={fieldInput} /></div>
          <button type="submit" disabled={loading} className="sn-btn-gold sn-btn" style={{ width: "100%", padding: "16px 0", opacity: loading ? 0.7 : 1 }}>
            {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Signing In...</> : "Sign In →"}
          </button>
        </form>
        <button onClick={() => setMode("choice")} style={{ display: "block", width: "100%", textAlign: "center", marginTop: 14, background: "none", border: "none", color: "#667085", fontSize: 13, cursor: "pointer" }}>← Back to login options</button>
      </div>
    </div>
  );

  const renderChoice = () => (
    <div style={{ maxWidth: 700, width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <Link href="/"><Image src="/assets/select-network/select-network-logo.png" alt="The Select Network Member Group" width={300} height={145} className="sn-glow" style={{ height: 70, width: "auto", margin: "0 auto 24px", display: "block" }} /></Link>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 400, margin: "0 0 8px", color: "#071a33" }}>Member Access</h1>
        <p style={{ color: "#667085", fontSize: 15, margin: 0 }}>Select your login type below</p>
      </div>
      <div className="sn-login-choice-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <button onClick={() => setMode("investor")} style={{ textAlign: "left", background: "#fff", border: "1px solid #e7e2d8", boxShadow: "0 18px 45px rgba(5,20,45,.12)", padding: 28, borderRadius: 10, cursor: "pointer", transition: ".35s" }} className="hover:translate-y-[-4px] hover:border-[#bd8e28]">
          <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid #bd8e28", display: "grid", placeItems: "center", color: "#bd8e28", marginBottom: 16, background: "linear-gradient(135deg,#fffaf0,#fff3d6)" }}><TrendingUp size={26} /></div>
          <b style={{ display: "block", fontSize: 20, color: "#071a33", marginBottom: 8 }}>Investor Portal</b>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: "#667085", margin: "0 0 12px" }}>Access your private dashboard, units, growth chart, documents, referrals, and account updates.</p>
          <span style={{ fontSize: 11, color: "#bd8e28", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>Demo: demo / demo</span>
        </button>
        <button onClick={() => setMode("staff")} style={{ textAlign: "left", background: "#fff", border: "1px solid #e7e2d8", boxShadow: "0 18px 45px rgba(5,20,45,.12)", padding: 28, borderRadius: 10, cursor: "pointer", transition: ".35s" }} className="hover:translate-y-[-4px] hover:border-[#075933]">
          <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid #075933", display: "grid", placeItems: "center", color: "#075933", marginBottom: 16, background: "linear-gradient(135deg,#e3f5eb,#d4eddf)" }}><ShieldCheck size={26} /></div>
          <b style={{ display: "block", fontSize: 20, color: "#071a33", marginBottom: 8 }}>Staff / Admin Portal</b>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: "#667085", margin: "0 0 12px" }}>Access the back office to manage members, requests, payments, documents, reports, and the referral network.</p>
          <span style={{ fontSize: 11, color: "#075933", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>Admin email: tmillerk999@gmail.com</span>
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link href="/invest-now" style={{ background: "none", border: "none", color: "#bd8e28", fontSize: 13, fontWeight: 800, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Not a member? Complete Your Participation →</Link>
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Link href="/" style={{ color: "#667085", fontSize: 12 }}>← Back to The Select Network Member Group</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f7f5ef,#fff)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Inter, Arial, sans-serif" }}>
      {mode === "apply" ? renderApply() : mode === "investor" || mode === "staff" ? renderLogin() : renderChoice()}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .sn-login-choice-grid,
          .sn-apply-name-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
