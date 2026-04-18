import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description: "AniUI Timeline component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/timeline" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
