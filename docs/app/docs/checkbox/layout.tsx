import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkbox",
  description: "AniUI Checkbox — accessible check input with checked, unchecked, and disabled states.",
  alternates: { canonical: "/docs/checkbox" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
