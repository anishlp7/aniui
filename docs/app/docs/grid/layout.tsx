import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grid",
  description: "AniUI Grid component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/grid" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
