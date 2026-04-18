import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drawer",
  description: "AniUI Drawer component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/drawer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
