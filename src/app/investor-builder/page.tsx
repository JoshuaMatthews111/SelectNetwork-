"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvestorBuilderRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/investor"); }, [router]);
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", fontFamily: "Inter, sans-serif", color: "#667085" }}>
      Redirecting to your dashboard...
    </div>
  );
}
