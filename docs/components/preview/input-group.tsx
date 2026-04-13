"use client";

import React from "react";

export function PreviewInputGroupDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-row items-center rounded-md border border-input bg-background">
        <div className="flex items-center justify-center px-3 self-stretch border-r border-input">
          <span className="text-sm text-muted-foreground">$</span>
        </div>
        <input className="flex-1 min-h-12 px-3 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground" placeholder="0.00" />
      </div>
    </div>
  );
}

export function PreviewInputGroupSuffix() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-row items-center rounded-md border border-input bg-background">
        <input className="flex-1 min-h-12 px-3 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground" placeholder="example" />
        <div className="flex items-center justify-center px-3 self-stretch border-l border-input">
          <span className="text-sm text-muted-foreground">.com</span>
        </div>
      </div>
    </div>
  );
}

export function PreviewInputGroupButton() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-row items-center rounded-md border border-input bg-background">
        <input className="flex-1 min-h-12 px-3 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Search..." />
        <button className="flex items-center justify-center px-3 min-h-12 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
}
