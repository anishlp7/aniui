import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Picker",
  description: "AniUI Date Picker — calendar popup with single date and range selection for React Native.",
  alternates: { canonical: "/docs/date-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
