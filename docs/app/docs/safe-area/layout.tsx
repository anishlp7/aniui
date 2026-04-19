import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safe Area",
  description: "AniUI Safe Area — SafeAreaView wrapper with theme variants. Handles notch and status bar.",
  alternates: { canonical: "/docs/safe-area" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
