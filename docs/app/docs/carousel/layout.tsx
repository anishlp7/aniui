import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel",
  description: "AniUI Carousel component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/carousel" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
