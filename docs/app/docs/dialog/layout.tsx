import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dialog",
  description: "AniUI dialog component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/dialog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
