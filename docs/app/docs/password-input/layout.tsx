import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Input",
  description: "AniUI Password Input — secure field with show/hide toggle and strength indicator bar.",
  alternates: { canonical: "/docs/password-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
