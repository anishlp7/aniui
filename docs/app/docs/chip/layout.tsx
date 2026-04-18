import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chip",
  description: "AniUI Chip component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/chip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
