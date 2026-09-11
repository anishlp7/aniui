import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoComplete",
  description: "AniUI AutoComplete — free-text input with inline filtered suggestions, keyboard-safe dropdown, and async loading state.",
  alternates: { canonical: "/docs/autocomplete" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
