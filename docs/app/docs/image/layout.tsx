import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image",
  description: "AniUI Image — optimized image with loading placeholder, error fallback, and rounded variants.",
  alternates: { canonical: "/docs/image" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
