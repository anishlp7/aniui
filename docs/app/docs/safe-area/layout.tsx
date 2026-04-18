import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safe Area",
  description: "AniUI Safe Area component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/safe-area" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
