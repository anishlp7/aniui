"use client";
import { useState } from "react";
import { PreviewAutoComplete } from "@/components/preview/autocomplete";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Apricot", value: "apricot" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape", disabled: true },
];

export function AutoCompleteDemo() {
  return <PreviewAutoComplete options={FRUITS} />;
}

export function AsyncDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-xs space-y-2">
      <PreviewAutoComplete options={FRUITS} loading={loading} />
      <button
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }}
        className="text-xs text-primary hover:underline cursor-pointer"
      >
        Simulate a slow search (1.2s)
      </button>
    </div>
  );
}
