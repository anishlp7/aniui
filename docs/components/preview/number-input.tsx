"use client";

import React, { useState } from "react";

export function PreviewNumberInputDemo() {
  const [value, setValue] = useState(5);
  return (
    <div className="flex items-center rounded-md border border-input bg-background min-h-12 px-3 w-36">
      <button
        className="min-h-10 min-w-10 flex items-center justify-center text-lg font-bold text-foreground cursor-pointer hover:opacity-70"
        onClick={() => setValue((v) => Math.max(0, v - 1))}
      >
        &#8722;
      </button>
      <span className="flex-1 text-center text-foreground text-base">{value}</span>
      <button
        className="min-h-10 min-w-10 flex items-center justify-center text-lg font-bold text-foreground cursor-pointer hover:opacity-70"
        onClick={() => setValue((v) => Math.min(99, v + 1))}
      >
        +
      </button>
    </div>
  );
}
