import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Picker",
  description: "AniUI File Picker — upload area with dashed border, file preview, and progress indicator.",
  alternates: { canonical: "/docs/file-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
