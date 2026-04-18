import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description: "AniUI Dropdown Menu component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/dropdown-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
