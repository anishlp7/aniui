import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Switch",
  description: "AniUI Switch component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/switch" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
