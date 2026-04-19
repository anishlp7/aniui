import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masked Input",
  description: "AniUI Masked Input — auto-format input with credit card, phone, and date mask presets.",
  alternates: { canonical: "/docs/masked-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
