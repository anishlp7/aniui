"use client";

import React from "react";

const statuses = [
  { label: "Online", color: "bg-green-500" },
  { label: "Away", color: "bg-amber-500" },
  { label: "Busy", color: "bg-destructive" },
  { label: "Offline", color: "bg-muted-foreground" },
];

export function PreviewStatusIndicatorDemo() {
  return (
    <div className="flex items-center gap-5">
      {statuses.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${s.color}`} />
          <span className="text-sm text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
