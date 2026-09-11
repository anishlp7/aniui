import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Card",
  description: "AniUI Profile Card — Profile summary card with avatar, role, bio, and badge.",
  alternates: { canonical: "/docs/profile-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
