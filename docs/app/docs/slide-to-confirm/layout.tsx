import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slide to Confirm",
  description: "AniUI Slide to Confirm — slide-to-pay style confirmation control with spring-back, fade-out label, and a check icon on confirm.",
  alternates: { canonical: "/docs/slide-to-confirm" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
