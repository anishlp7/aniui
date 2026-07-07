import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { DocsPagination } from "@/components/docs-pagination";
import { ScrollToTop } from "@/components/scroll-to-top";
import { DocsPageTransition } from "@/components/docs-page-transition";

export const metadata: Metadata = {
  title: {
    default: "Components",
    template: "%s | AniUI",
  },
  description: "Browse 93 React Native components. Button, Card, Dialog, Select, Toast, Data Table, Command Menu, and more. Built with Uniwind or NativeWind and rn-primitives. AniUI.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem-73px)] overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 md:ml-64 min-w-0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
          <ScrollToTop />
          <DocsPageTransition>{children}</DocsPageTransition>
          <DocsPagination />
        </div>
      </main>
    </div>
  );
}
