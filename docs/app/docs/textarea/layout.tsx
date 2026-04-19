import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textarea",
  description: "AniUI Textarea — multi-line text input with variant and size options for React Native.",
  alternates: { canonical: "/docs/textarea" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
