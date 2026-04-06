import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "select",
  description: "AniUI select component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/select" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
