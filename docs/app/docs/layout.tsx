import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="mx-auto max-w-3xl px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
