"use client";

import { Sidebar } from "@/components/sidebar";
import { BlockNav, BlockPagination } from "@/components/block-nav";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <BlockNav />
          {children}
          <BlockPagination />
        </div>
      </main>
    </div>
  );
}
