import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabs",
  description: "AniUI Tabs component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/tabs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
