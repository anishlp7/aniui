"use client";
import { useState } from "react";
import { PreviewAutoComplete } from "@/components/preview/autocomplete";

const CITIES = [
  { label: "New York, NY", value: "nyc" },
  { label: "Los Angeles, CA", value: "la" },
  { label: "Chicago, IL", value: "chi" },
  { label: "Houston, TX", value: "hou", disabled: true },
  { label: "Phoenix, AZ", value: "phx" },
  { label: "San Francisco, CA", value: "sf" },
  { label: "Seattle, WA", value: "sea" },
];

export function AutoCompleteDemo() {
  return <PreviewAutoComplete options={CITIES} />;
}

export function AsyncDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-xs space-y-2">
      <PreviewAutoComplete options={CITIES} loading={loading} />
      <button
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }}
        className="text-xs text-primary hover:underline cursor-pointer"
      >
        Simulate a slow search (1.2s)
      </button>
    </div>
  );
}
