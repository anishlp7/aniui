import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combobox",
  description: "AniUI Combobox component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/combobox" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
