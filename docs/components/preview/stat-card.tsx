"use client";

import React, { useState } from "react";

const stats = [
  { label: "Total Revenue", value: "$12,400", change: "+12.4%", up: true },
  { label: "Active Users", value: "3,204", change: "+4.1%", up: true },
  { label: "Orders", value: "182", change: "-2.6%", up: false },
];

export function PreviewStatCardDemo() {
  const [idx, setIdx] = useState(0);
  const stat = stats[idx];

  return (
    <button onClick={() => setIdx((i) => (i + 1) % stats.length)} className="rounded-lg border border-border bg-card p-4 w-full max-w-[200px] text-left cursor-pointer hover:bg-accent/50 transition-colors">
      <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
      <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className={`text-sm font-medium ${stat.up ? "text-green-500" : "text-destructive"}`}>
          {stat.up ? "\u2191" : "\u2193"} {stat.change}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">Click to cycle stats</p>
    </button>
  );
}
