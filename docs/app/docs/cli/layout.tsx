import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI",
  description: "AniUI CLI — init, add, theme, doctor. Set up your project and add components with one command.",
  alternates: { canonical: "/docs/cli" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
