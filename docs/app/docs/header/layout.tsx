import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Header",
  description: "AniUI Header component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/header" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
