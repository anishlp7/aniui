import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uniwind Compatibility",
  description: "AniUI works with both NativeWind and Uniwind. Same components, same className API — use --style uniwind to get started.",
  alternates: { canonical: "/docs/uniwind" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
