"use client";

import React, { useState } from "react";

const codes = ["+1", "+44", "+91", "+81", "+49", "+33"];

export function PreviewPhoneInputDemo() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("+1");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-xs relative">
      <div className="flex items-center rounded-md border border-input bg-background min-h-12 px-4">
        <button onClick={() => setOpen(!open)} className="flex items-center mr-2 pr-2 border-r border-border cursor-pointer">
          <span className="text-foreground text-base">{code}</span>
          <span className="text-muted-foreground ml-1 text-xs">&#9660;</span>
        </button>
        <input
          className="flex-1 bg-transparent text-foreground text-base outline-none"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d\s()-]/g, ""))}
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-24 rounded-md border border-border bg-card shadow-md z-10">
          {codes.map((c) => (
            <button key={c} className="w-full px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer text-left" onClick={() => { setCode(c); setOpen(false); }}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
