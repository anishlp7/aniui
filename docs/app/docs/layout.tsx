import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: {
    default: "Components",
    template: "%s | AniUI",
  },
  description: "Browse 80+ React Native components. Button, Card, Dialog, Select, Toast, and more. Built with NativeWind and rn-primitives.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem-73px)]">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="mx-auto max-w-3xl px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
