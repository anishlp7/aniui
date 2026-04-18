import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Label",
  description: "AniUI Label component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/label" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
