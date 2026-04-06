"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewThemeProviderDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div className={cn("rounded-lg border border-border p-6 flex flex-col items-center gap-4 transition-colors", dark ? "bg-zinc-950" : "bg-white")}>
      <div className="flex items-center gap-3">
        <span className={cn("text-sm font-medium", dark ? "text-zinc-400" : "text-zinc-600")}>Light</span>
        <button
          className={cn("w-12 h-7 rounded-full relative transition-colors cursor-pointer", dark ? "bg-white" : "bg-zinc-800")}
          onClick={() => setDark(!dark)}
        >
          <div className={cn("h-5 w-5 rounded-full absolute top-1 transition-all", dark ? "left-6 bg-zinc-900" : "left-1 bg-white")} />
        </button>
        <span className={cn("text-sm font-medium", dark ? "text-zinc-400" : "text-zinc-600")}>Dark</span>
      </div>
      <div className={cn("rounded-md px-4 py-2 text-sm", dark ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-900")}>
        {dark ? "Dark mode enabled" : "Light mode enabled"}
      </div>
    </div>
  );
}
