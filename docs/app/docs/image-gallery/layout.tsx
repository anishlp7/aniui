import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "AniUI Image Gallery — horizontal carousel with fullscreen modal viewer and pagination.",
  alternates: { canonical: "/docs/image-gallery" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
