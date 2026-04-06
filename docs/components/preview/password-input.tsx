"use client";

import React, { useState } from "react";

export function PreviewPasswordInputDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center rounded-md border border-input bg-background min-h-12 px-4">
        <input
          className="flex-1 bg-transparent text-foreground text-base outline-none"
          type={visible ? "text" : "password"}
          value="mypassword"
          readOnly
        />
        <button
          className="ml-2 text-muted-foreground text-sm cursor-pointer hover:text-foreground"
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
