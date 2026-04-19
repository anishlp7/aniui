import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tooltip",
  description: "AniUI Tooltip — accessible hint overlay with fade animation. Top, bottom, left, right sides.",
  alternates: { canonical: "/docs/tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
