import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image",
  description: "AniUI Image component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/image" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
