import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient",
  description: "AniUI Gradient — linear gradient background container with custom colors, start/end direction, and children.",
  alternates: { canonical: "/docs/gradient" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
