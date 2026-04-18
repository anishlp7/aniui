import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accordion",
  description: "AniUI Accordion component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/accordion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
