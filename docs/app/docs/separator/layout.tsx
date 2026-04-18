import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Separator",
  description: "AniUI Separator component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/separator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
