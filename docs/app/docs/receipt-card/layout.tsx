import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receipt Card",
  description: "AniUI Receipt Card — Receipt-style card with line items and total.",
  alternates: { canonical: "/docs/receipt-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
