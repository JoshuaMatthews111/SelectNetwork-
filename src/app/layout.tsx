import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Select Network | Private Investors Group LLC",
  description: "A premium private investor platform connected to Lorenzo's nationwide dog training company. Exclusive founder unit opportunity, member dashboard, and financial reporting.",
};

export default function SelectNetworkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
