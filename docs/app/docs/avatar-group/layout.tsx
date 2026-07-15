import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar Group",
  description: "AniUI Avatar Group — overlapping avatar stack with +N overflow, max limit, and 3 spacing options.",
  alternates: { canonical: "/docs/avatar-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
