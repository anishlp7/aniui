import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input Group",
  description: "AniUI Input Group component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/input-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
