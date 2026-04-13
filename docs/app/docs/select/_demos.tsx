"use client";
import { PreviewSelect } from "@/components/preview/select";

export function SelectDemo() {
  return (
    <PreviewSelect
      label="Fruit"
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Grape", value: "grape" },
      ]}
      placeholder="Pick a fruit..."
    />
  );
}
