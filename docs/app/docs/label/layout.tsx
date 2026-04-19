import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Label",
  description: "AniUI Label — styled text label for form fields in React Native.",
  alternates: { canonical: "/docs/label" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
