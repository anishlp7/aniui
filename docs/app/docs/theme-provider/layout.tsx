import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Provider",
  description: "AniUI Theme Provider component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/theme-provider" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
