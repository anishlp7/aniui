import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stepper",
  description: "AniUI Stepper component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/stepper" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
