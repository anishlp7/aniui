import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Header ScrollView",
  description: "AniUI Animated Header ScrollView — iOS-style collapsing large-title header ScrollView with blur backdrop on scroll.",
  alternates: { canonical: "/docs/animated-header-scrollview" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
