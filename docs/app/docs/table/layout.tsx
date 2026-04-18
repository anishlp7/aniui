import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table",
  description: "AniUI Table component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/table" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
