"use client";

import { Sidebar } from "@/components/sidebar";
import { ChartNav, ChartPagination } from "@/components/chart-nav";

export default function ChartPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <ChartNav />
          {children}
          <ChartPagination />
        </div>
      </main>
    </div>
  );
}
