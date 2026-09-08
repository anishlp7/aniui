"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type SortKey = "feature" | "free" | "pro";
type SortDir = "asc" | "desc";

const data = [
  { feature: "Projects", free: "3", pro: "Unlimited" },
  { feature: "Team members", free: "1", pro: "Unlimited" },
  { feature: "Priority support", free: "No", pro: "Yes" },
];

export function PreviewTable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [sortKey, setSortKey] = useState<SortKey>("feature");
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
            {([{ key: "feature", label: "Feature" }, { key: "free", label: "Free" }, { key: "pro", label: "Pro" }] as { key: SortKey; label: string }[]).map(({ key, label }) => (
              <th key={key} onClick={() => handleSort(key)} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground select-none">
                {label}{arrow(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.feature} className={cn("border-b border-border last:border-b-0 transition-colors hover:bg-muted/30", i % 2 === 1 && "bg-muted/20")}>
              <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.free}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.pro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
