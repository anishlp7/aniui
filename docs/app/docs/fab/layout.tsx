import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAB",
  description: "AniUI FAB — floating action button with 4 positions, 3 sizes, and extended label mode.",
  alternates: { canonical: "/docs/fab" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
