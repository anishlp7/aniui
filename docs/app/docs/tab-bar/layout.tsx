import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tab Bar",
  description: "AniUI Tab Bar component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/tab-bar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
