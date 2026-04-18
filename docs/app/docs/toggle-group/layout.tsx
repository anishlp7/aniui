import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle Group",
  description: "AniUI Toggle Group component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/toggle-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
