import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkbox",
  description: "AniUI Checkbox component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/checkbox" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
