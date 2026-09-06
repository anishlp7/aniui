import type { Metadata } from "next";
export const metadata: Metadata = { title: "Book Page", description: "AniUI Book Page — Book page spread with spine gutter and page number.", alternates: { canonical: "/docs/book-page" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
