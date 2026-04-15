"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Person {
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: Person[] = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Engineer", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", role: "Designer", status: "Active" },
  { name: "Carol Williams", email: "carol@example.com", role: "Manager", status: "Away" },
  { name: "David Brown", email: "david@example.com", role: "Engineer", status: "Inactive" },
  { name: "Eva Martinez", email: "eva@example.com", role: "Designer", status: "Active" },
];

type SortKey = keyof Person;

export function PreviewDataTableDemo() {
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 3;

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setPage(0);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return sampleData;
    const q = search.toLowerCase();
    return sampleData.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q) ||
        row.role.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q)
    );
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const cmp = a[sortBy].localeCompare(b[sortBy]);
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const columns: { key: SortKey; header: string }[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Away": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Inactive": return "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400";
      default: return "";
    }
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Search */}
      <div className="px-4 py-3 border-b border-border bg-card">
        <input
          type="text"
          className="w-full h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {sortBy === col.key && (
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        {sortOrder === "asc" ? <path d="m18 15-6-6-6 6" /> : <path d="m6 9 6 6 6-6" />}
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                  No data
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={row.email} className={cn("border-t border-border", i % 2 === 1 && "bg-muted/20")}>
                  <td className="px-4 py-3 text-foreground font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                  <td className="px-4 py-3 text-foreground">{row.role}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", statusColor(row.status))}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
        <span className="text-xs text-muted-foreground">
          {sorted.length > 0
            ? `${page * pageSize + 1}-${Math.min((page + 1) * pageSize, sorted.length)} of ${sorted.length}`
            : "0 results"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className={cn(
              "px-3 py-1.5 rounded-md border border-input text-xs text-foreground cursor-pointer transition-colors hover:bg-muted",
              page === 0 && "opacity-40 cursor-not-allowed"
            )}
          >
            Prev
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className={cn(
              "px-3 py-1.5 rounded-md border border-input text-xs text-foreground cursor-pointer transition-colors hover:bg-muted",
              page >= totalPages - 1 && "opacity-40 cursor-not-allowed"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
