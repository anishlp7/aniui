import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popover",
  description: "AniUI Popover component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/popover" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
