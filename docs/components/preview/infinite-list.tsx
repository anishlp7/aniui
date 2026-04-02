"use client";

import React, { useState } from "react";

const allItems = [
  "Build UI components", "Write unit tests", "Deploy to production",
  "Code review", "Update docs", "Fix bugs", "Add analytics", "Optimize perf",
];

export function PreviewInfiniteListDemo() {
  const [count, setCount] = useState(3);
  const items = allItems.slice(0, count);
  const hasMore = count < allItems.length;

  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="px-4 py-3.5 border-b border-border last:border-b-0">
          <p className="text-sm font-medium text-foreground">{item}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Task {i + 1}</p>
        </div>
      ))}
      <div className="py-3 flex justify-center">
        {hasMore ? (
          <button onClick={() => setCount((c) => Math.min(c + 3, allItems.length))} className="text-sm text-primary font-medium cursor-pointer hover:text-primary/80">
            Load more
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">All items loaded</span>
        )}
      </div>
    </div>
  );
}
