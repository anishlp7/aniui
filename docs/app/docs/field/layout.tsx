import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field",
  description: "AniUI Field component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/field" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
