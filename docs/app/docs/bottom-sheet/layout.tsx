import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bottom Sheet",
  description: "AniUI Bottom Sheet component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/bottom-sheet" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
