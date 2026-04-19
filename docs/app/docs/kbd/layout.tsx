import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kbd",
  description: "AniUI Kbd — keyboard key display with size variants and KbdGroup with customizable separator.",
  alternates: { canonical: "/docs/kbd" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
