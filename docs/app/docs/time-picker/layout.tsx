import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Picker",
  description: "AniUI Time Picker — custom scroll-wheel time selection and DateAndTimePicker (calendar + time) for React Native.",
  alternates: { canonical: "/docs/time-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
