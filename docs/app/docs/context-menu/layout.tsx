import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Context Menu",
  description: "AniUI Context Menu component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/context-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
