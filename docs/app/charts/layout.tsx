import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charts",
  description: "AniUI chart components for React Native. Area, Bar, Line, Pie, Radar, and Radial charts built with react-native-svg.",
  alternates: { canonical: "/charts" },
};

export default function ChartsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
