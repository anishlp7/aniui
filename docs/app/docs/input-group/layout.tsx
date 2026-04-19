import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input Group",
  description: "AniUI Input Group — compose inputs with addons, buttons, and text. Focus-aware container.",
  alternates: { canonical: "/docs/input-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
