"use client";
import { PreviewSelect } from "@/components/preview/select";

export function SelectDemo() {
  return (
    <PreviewSelect
      label="Sort Results"
      options={[
        { label: "Most Popular", value: "popular" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
        { label: "Newest", value: "newest" },
      ]}
      placeholder="Sort by..."
    />
  );
}
