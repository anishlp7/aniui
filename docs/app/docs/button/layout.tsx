import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "uutton",
  description: "AniUI uutton component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/button" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
