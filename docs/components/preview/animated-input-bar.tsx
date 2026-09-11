"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const placeholders = ["Search flights", "Search hotels", "Search cars"];

export function PreviewAnimatedInputBar({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % placeholders.length);
      setKey((k) => k + 1);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("flex h-12 w-full max-w-[260px] items-center rounded-md border border-input bg-background px-4", className)}>
      <span key={key} className="animate-[fade-in_0.3s_ease-out] text-sm text-muted-foreground">
        {placeholders[index]}
      </span>
      <style>{`@keyframes fade-in { 0% { opacity: 0; transform: translateY(4px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
