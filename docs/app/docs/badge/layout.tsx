import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge",
  description: "AniUI Badge component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/badge" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
