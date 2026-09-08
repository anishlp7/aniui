"use client";
import { useState } from "react";
import { PreviewRadioGroup, PreviewRadioGroupItem } from "@/components/preview/radio-group";

export function RadioGroupDemo() {
  const [value, setValue] = useState("pro");
  return (
    <div className="w-full max-w-sm">
      <PreviewRadioGroup value={value} onValueChange={setValue}>
        <PreviewRadioGroupItem value="free" label="Free — $0/mo" />
        <PreviewRadioGroupItem value="pro" label="Pro — $12/mo" />
        <PreviewRadioGroupItem value="team" label="Team — $29/mo per seat" />
      </PreviewRadioGroup>
    </div>
  );
}
