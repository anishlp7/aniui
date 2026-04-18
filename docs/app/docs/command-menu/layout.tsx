import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Menu",
  description: "AniUI Command Menu component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/command-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
