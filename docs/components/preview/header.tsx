"use client";

import React from "react";

export function PreviewHeaderDemo() {
  return (
    <div className="w-full flex items-center min-h-14 px-4 bg-background border-b border-border rounded-lg">
      <button className="min-h-10 min-w-10 flex items-center justify-center text-primary text-lg mr-3 cursor-pointer">
        &#8592;
      </button>
      <span className="flex-1 text-lg font-semibold text-foreground truncate">Settings</span>
      <button className="text-sm text-primary font-medium cursor-pointer hover:opacity-80">Save</button>
    </div>
  );
}
