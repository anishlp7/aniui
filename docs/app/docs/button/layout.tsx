import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button",
  description: "AniUI Button component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/button" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
