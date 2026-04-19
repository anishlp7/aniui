import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Mode",
  description: "AniUI Dark Mode — dark mode support for all AniUI components. CSS variables automatically switch between light and dark themes.",
  alternates: { canonical: "/docs/dark-mode" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
