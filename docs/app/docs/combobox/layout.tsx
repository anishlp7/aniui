import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combobox",
  description: "AniUI Combobox — searchable select with multi-select, groups, clear button, and custom rendering.",
  alternates: { canonical: "/docs/combobox" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
