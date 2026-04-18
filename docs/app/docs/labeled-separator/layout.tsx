import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labeled Separator",
  description: "AniUI Labeled Separator component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/labeled-separator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
