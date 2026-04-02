"use client";

import React, { useState } from "react";

export function PreviewConnectionBannerDemo() {
  const [online, setOnline] = useState(true);

  return (
    <div className="w-full space-y-3">
      <div className={`px-4 py-2 text-center rounded-md transition-colors ${online ? "bg-green-600" : "bg-destructive"}`}>
        <span className="text-white text-sm font-medium">{online ? "Back online" : "No internet connection"}</span>
      </div>
      <button
        onClick={() => setOnline(!online)}
        className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground text-sm font-medium cursor-pointer hover:bg-accent transition-colors"
      >
        Toggle: {online ? "Go Offline" : "Go Online"}
      </button>
    </div>
  );
}
