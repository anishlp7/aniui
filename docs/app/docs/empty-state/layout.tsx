import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empty State",
  description: "AniUI Empty State — placeholder for empty lists with icon, title, description, and action.",
  alternates: { canonical: "/docs/empty-state" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
