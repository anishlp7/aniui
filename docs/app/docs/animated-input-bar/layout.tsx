import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Input Bar",
  description: "AniUI Animated Input Bar — Text input with a per-character animated placeholder that cycles through multiple strings.",
  alternates: { canonical: "/docs/animated-input-bar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
