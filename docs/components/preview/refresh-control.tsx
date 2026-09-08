"use client";

import React from "react";

const feed = ["New comment on your post", "Order #4821 shipped", "3 new followers this week"];

export function PreviewRefreshControlDemo() {
  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex flex-col items-center gap-2 py-4 border-b border-border">
        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-xs text-muted-foreground">Pull to refresh</span>
      </div>
      {feed.map((line, i) => (
        <div key={i} className="px-4 py-3 border-b border-border last:border-b-0">
          <p className="text-sm text-foreground">{line}</p>
        </div>
      ))}
    </div>
  );
}
