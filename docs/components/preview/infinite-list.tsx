"use client";

import React, { useState } from "react";

const TOTAL_ITEMS = 40;
const PAGE_SIZE = 10;

export function PreviewInfiniteListDemo() {
  const [count, setCount] = useState(PAGE_SIZE);
  const items = Array.from({ length: count }, (_, i) => i + 1);
  const hasMore = count < TOTAL_ITEMS;

  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      {items.map((item) => (
        <div key={item} className="px-4 py-3.5 border-b border-border last:border-b-0">
          <p className="text-sm font-medium text-foreground">Update #{item}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Loaded automatically on scroll</p>
        </div>
      ))}
      <div className="py-3 flex justify-center">
        {hasMore ? (
          <button onClick={() => setCount((c) => Math.min(c + PAGE_SIZE, TOTAL_ITEMS))} className="text-sm text-primary font-medium cursor-pointer hover:text-primary/80">
            Load more
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">All items loaded</span>
        )}
      </div>
    </div>
  );
}
