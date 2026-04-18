import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slider",
  description: "AniUI Slider component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/slider" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
