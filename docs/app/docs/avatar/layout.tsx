import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar",
  description: "AniUI Avatar — user image with fallback initials. Three sizes (sm, md, lg) for React Native.",
  alternates: { canonical: "/docs/avatar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
