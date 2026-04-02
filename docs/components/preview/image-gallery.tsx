"use client";

import React from "react";

export function PreviewImageGalleryDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
            <svg className="h-8 w-8 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        <div className="w-4 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>
    </div>
  );
}
