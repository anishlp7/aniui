import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAB",
  description: "AniUI FAB component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/fab" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
