import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Android",
  description: "Android-specific setup and troubleshooting for AniUI React Native components.",
  alternates: { canonical: "/docs/android" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
