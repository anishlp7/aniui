import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status Indicator",
  description: "AniUI Status Indicator component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/status-indicator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
