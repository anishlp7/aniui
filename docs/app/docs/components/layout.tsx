import type { Metadata } from "next";
import { COMPONENT_COUNT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Components",
  description: `AniUI Components — all ${COMPONENT_COUNT} AniUI React Native components. Searchable, categorized, with live examples.`,
  alternates: { canonical: "/docs/components" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
