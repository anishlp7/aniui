import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field",
  description: "AniUI Field — form field layout combining label, input, description, and error. Vertical or horizontal.",
  alternates: { canonical: "/docs/field" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
