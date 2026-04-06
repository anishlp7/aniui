"use client";

import React from "react";

export function PreviewTypingIndicatorDemo() {
  return (
    <div className="inline-flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-secondary rounded-bl-sm">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-muted-foreground"
          style={{
            animation: "typingBounce 1.4s ease-in-out infinite",
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
      <style>{`@keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0) } 30% { transform: translateY(-6px) } }`}</style>
    </div>
  );
}
