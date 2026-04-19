import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slider",
  description: "AniUI Slider — draggable range input with Gesture Handler and Reanimated for 120Hz performance.",
  alternates: { canonical: "/docs/slider" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
