import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animate",
  description: "AniUI Animate component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/animate" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
