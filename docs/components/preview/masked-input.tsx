"use client";

import React, { useState } from "react";

function formatCard(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function PreviewMaskedInputDemo() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatCard(e.target.value));
  };

  return (
    <div className="w-full max-w-xs">
      <input
        className="w-full min-h-12 px-4 rounded-md border border-input bg-background text-foreground text-base tracking-wider"
        value={value}
        onChange={handleChange}
        placeholder="0000 0000 0000 0000"
        maxLength={19}
      />
    </div>
  );
}
