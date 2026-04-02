"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", icon: "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" },
  { label: "Search", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Profile", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" },
];

export function PreviewTabBarDemo() {
  const [active, setActive] = useState("Home");

  return (
    <div className="w-full max-w-sm flex border-t border-border bg-background rounded-b-lg pt-2 pb-4 px-2">
      {tabs.map((tab) => (
        <button key={tab.label} onClick={() => setActive(tab.label)} className="flex-1 flex flex-col items-center gap-1 cursor-pointer">
          <svg className={cn("h-5 w-5", tab.label === active ? "text-primary" : "text-muted-foreground")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={tab.icon} />
          </svg>
          <span className={cn("text-xs", tab.label === active ? "text-primary font-medium" : "text-muted-foreground")}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
