import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List",
  description: "AniUI List component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/list" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
