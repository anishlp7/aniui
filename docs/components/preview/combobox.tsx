"use client";

import React, { useState } from "react";

const options = ["React Native", "Flutter", "SwiftUI", "Kotlin Multiplatform", "Xamarin"];

export function PreviewComboboxDemo() {
  const [selected, setSelected] = useState("React Native");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full max-w-xs space-y-1">
      <button onClick={() => { setOpen(!open); setSearch(""); }} className="flex items-center justify-between w-full min-h-12 px-4 rounded-md border border-input bg-background cursor-pointer">
        <span className="text-sm text-foreground">{selected}</span>
        <span className="text-muted-foreground text-xs">&#9660;</span>
      </button>
      {open && (
        <div className="rounded-md border border-input bg-card shadow-md overflow-hidden">
          <div className="px-3 py-2 border-b border-border">
            <input className="w-full text-xs text-foreground bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Search frameworks..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
          </div>
          {filtered.length === 0 && <div className="px-4 py-2.5 text-sm text-muted-foreground">No results</div>}
          {filtered.map((o) => (
            <button key={o} onClick={() => { setSelected(o); setOpen(false); }} className={`w-full px-4 py-2.5 text-sm text-foreground text-left cursor-pointer ${o === selected ? "bg-accent" : "hover:bg-muted"}`}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
