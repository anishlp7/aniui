import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Input",
  description: "AniUI Password Input component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/password-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
