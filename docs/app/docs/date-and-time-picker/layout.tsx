import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date & Time Picker",
  description: "AniUI DateAndTimePicker — calendar plus scroll-wheel time selection for React Native.",
  alternates: { canonical: "/docs/date-and-time-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
