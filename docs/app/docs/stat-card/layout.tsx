import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stat Card",
  description: "AniUI Stat Card component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/stat-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
