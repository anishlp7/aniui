"use client";
import { useState } from "react";
import { PreviewChip } from "@/components/preview/chip";

export function SelectableDemo() {
  const [selected, setSelected] = useState<string[]>(["react-native"]);
  const toggle = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  return (
    <div className="flex flex-wrap gap-2">
      <PreviewChip selected={selected.includes("react-native")} onClick={() => toggle("react-native")}>React Native</PreviewChip>
      <PreviewChip selected={selected.includes("expo")} onClick={() => toggle("expo")}>Expo</PreviewChip>
      <PreviewChip selected={selected.includes("nativewind")} onClick={() => toggle("nativewind")}>NativeWind</PreviewChip>
      <PreviewChip selected={selected.includes("typescript")} onClick={() => toggle("typescript")}>TypeScript</PreviewChip>
    </div>
  );
}

export function ClosableDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <PreviewChip onClose={() => {}}>Removable</PreviewChip>
      <PreviewChip variant="secondary" onClose={() => {}}>Tag</PreviewChip>
    </div>
  );
}
