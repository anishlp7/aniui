import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connection Banner",
  description: "AniUI Connection Banner component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/connection-banner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
