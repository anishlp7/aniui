import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radio Group",
  description: "AniUI Radio Group component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/radio-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
