import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hover Card",
  description: "AniUI Hover Card component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/hover-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
