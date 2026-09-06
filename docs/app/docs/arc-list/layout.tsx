import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arc List",
  description: "AniUI Arc List — items laid out along a curved arc with proximity scale/opacity, snap-to-focus, and a haptic tick on snap.",
  alternates: { canonical: "/docs/arc-list" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
