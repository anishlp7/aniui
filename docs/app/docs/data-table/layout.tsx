import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Table",
  description: "AniUI Data Table component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/data-table" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
