import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spinner",
  description: "AniUI Spinner component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/spinner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
