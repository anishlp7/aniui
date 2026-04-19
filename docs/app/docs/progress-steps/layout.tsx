import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Steps",
  description: "AniUI Progress Steps — multi-step wizard indicator for onboarding and checkout flows.",
  alternates: { canonical: "/docs/progress-steps" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
