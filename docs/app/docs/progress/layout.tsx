import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress",
  description: "AniUI Progress component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/progress" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
