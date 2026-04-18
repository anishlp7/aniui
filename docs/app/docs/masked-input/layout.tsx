import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masked Input",
  description: "AniUI Masked Input component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/masked-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
