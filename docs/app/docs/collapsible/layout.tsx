import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collapsible",
  description: "AniUI Collapsible component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/collapsible" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
