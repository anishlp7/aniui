import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collapsible",
  description: "AniUI Collapsible — animated show/hide content panel with fade transition for React Native.",
  alternates: { canonical: "/docs/collapsible" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
