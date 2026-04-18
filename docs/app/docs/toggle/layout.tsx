import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle",
  description: "AniUI Toggle component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/toggle" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
