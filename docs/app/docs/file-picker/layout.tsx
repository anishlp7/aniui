import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Picker",
  description: "AniUI File Picker component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/file-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
