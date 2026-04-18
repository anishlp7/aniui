import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner",
  description: "AniUI Banner component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/banner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
