import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Select Network Member Group",
  description: "A premium private investor platform connected to Lorenzo's nationwide dog training company. Exclusive unit opportunity, member dashboard, and financial reporting.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SelectNetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
