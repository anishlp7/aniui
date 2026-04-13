"use client";
import { useState } from "react";
import { PreviewSearchBar } from "@/components/preview/search-bar";

export function SearchBarDemo() {
  const [query, setQuery] = useState("");
  return <PreviewSearchBar value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} />;
}

export function CancelDemo() {
  const [query, setQuery] = useState("react native");
  return <PreviewSearchBar value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} showCancel onCancel={() => setQuery("")} />;
}
