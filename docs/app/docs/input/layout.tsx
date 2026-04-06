import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "input",
  description: "AniUI input component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
