import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empty State",
  description: "AniUI Empty State component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/empty-state" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
