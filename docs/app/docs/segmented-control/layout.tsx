import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Segmented Control",
  description: "AniUI Segmented Control component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/segmented-control" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
