import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kbd",
  description: "AniUI Kbd component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/kbd" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
