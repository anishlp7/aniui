import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "toast",
  description: "AniUI Toast — notification popup with auto-dismiss. Default, success, destructive variants.",
  alternates: { canonical: "/docs/toast" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
