import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stepper",
  description: "AniUI Stepper — numeric increment/decrement control with min, max, and step validation.",
  alternates: { canonical: "/docs/stepper" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
