import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price",
  description: "AniUI Price component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/price" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
