import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Input",
  description: "AniUI Number Input component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/number-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
