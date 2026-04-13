"use client";
import { useState } from "react";
import { PreviewToggle } from "@/components/preview/toggle";

export function ToggleDemo() {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <PreviewToggle pressed={bold} onPressedChange={setBold}><span className="font-bold">B</span></PreviewToggle>
      <PreviewToggle pressed={italic} onPressedChange={setItalic}><span className="italic">I</span></PreviewToggle>
      <PreviewToggle pressed={underline} onPressedChange={setUnderline}><span className="underline">U</span></PreviewToggle>
    </div>
  );
}

export function ToggleVariantsDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PreviewToggle variant="default" pressed={a} onPressedChange={setA}>Default</PreviewToggle>
      <PreviewToggle variant="outline" pressed={b} onPressedChange={setB}>Outline</PreviewToggle>
    </div>
  );
}

export function ToggleSizesDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PreviewToggle size="sm" pressed={a} onPressedChange={setA}>S</PreviewToggle>
      <PreviewToggle size="md" pressed={b} onPressedChange={setB}>M</PreviewToggle>
      <PreviewToggle size="lg" pressed={c} onPressedChange={setC}>L</PreviewToggle>
    </div>
  );
}
