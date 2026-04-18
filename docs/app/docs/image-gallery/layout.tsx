import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "AniUI Image Gallery component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/image-gallery" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
