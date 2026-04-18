import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Bar",
  description: "AniUI Search Bar component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/search-bar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
