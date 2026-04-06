"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type SortKey = "name" | "status" | "role";
type SortDir = "asc" | "desc";

const data = [
  { name: "Alice", status: "Active", role: "Admin", active: true },
  { name: "Bob", status: "Inactive", role: "User", active: false },
  { name: "Charlie", status: "Active", role: "Editor", active: true },
];

export function PreviewTable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = [...data].sort((a, b) => {
    const cmp = a[sortKey].localeCompare(b[sortKey]);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const arrow = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " \u2191" : " \u2193") : "";

  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-border bg-card", className)} {...props}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {(["name", "status", "role"] as SortKey[]).map((key) => (
              <th key={key} onClick={() => handleSort(key)} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground select-none">
                {key}{arrow(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.name} className={cn("border-b border-border last:border-b-0 transition-colors hover:bg-muted/30", i % 2 === 1 && "bg-muted/20")}>
              <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium", row.active ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-muted text-muted-foreground")}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", row.active ? "bg-green-500" : "bg-muted-foreground/50")} />{row.status}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
