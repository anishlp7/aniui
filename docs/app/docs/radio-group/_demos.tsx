"use client";
import { useState } from "react";
import { PreviewRadioGroup, PreviewRadioGroupItem } from "@/components/preview/radio-group";

export function RadioGroupDemo() {
  const [value, setValue] = useState("option-1");
  return (
    <div className="w-full max-w-sm">
      <PreviewRadioGroup value={value} onValueChange={setValue}>
        <PreviewRadioGroupItem value="option-1" label="Option 1" />
        <PreviewRadioGroupItem value="option-2" label="Option 2" />
        <PreviewRadioGroupItem value="option-3" label="Option 3" />
      </PreviewRadioGroup>
    </div>
  );
}
