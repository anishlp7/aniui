import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form",
  description: "AniUI Form — validation context with required, pattern, and custom validators. Error messages.",
  alternates: { canonical: "/docs/form" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
