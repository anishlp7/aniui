import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar",
  description: "AniUI Avatar component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/avatar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
