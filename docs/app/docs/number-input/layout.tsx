import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Input",
  description: "AniUI Number Input — numeric field with increment/decrement buttons and min/max/step.",
  alternates: { canonical: "/docs/number-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
