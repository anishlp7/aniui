import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Picker",
  description: "AniUI Date Picker component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/date-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
