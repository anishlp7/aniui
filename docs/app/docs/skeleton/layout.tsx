import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skeleton",
  description: "AniUI Skeleton component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/skeleton" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
