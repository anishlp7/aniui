import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tooltip",
  description: "AniUI Tooltip component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
