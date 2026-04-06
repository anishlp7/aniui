import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "card",
  description: "AniUI card component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
