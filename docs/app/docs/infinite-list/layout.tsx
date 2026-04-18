import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infinite List",
  description: "AniUI Infinite List component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/infinite-list" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
