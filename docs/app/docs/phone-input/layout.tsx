import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phone Input",
  description: "AniUI Phone Input component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/phone-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
