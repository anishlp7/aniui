import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form",
  description: "AniUI Form component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/form" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
