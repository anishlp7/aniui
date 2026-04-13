"use client";
import { useState } from "react";
import { PreviewStepper } from "@/components/preview/stepper";

export function InteractiveDemo() {
  const [count, setCount] = useState(1);
  return <PreviewStepper value={count} onChange={setCount} min={0} max={10} />;
}

export function SizesDemo() {
  const [s1, setS1] = useState(1);
  const [s2, setS2] = useState(1);
  const [s3, setS3] = useState(1);
  return (
    <div className="space-y-3" style={{ maxWidth: 180 }}>
      <PreviewStepper size="sm" value={s1} onChange={setS1} />
      <PreviewStepper size="md" value={s2} onChange={setS2} />
      <PreviewStepper size="lg" value={s3} onChange={setS3} />
    </div>
  );
}

export function StepDemo() {
  const [val, setVal] = useState(0);
  return (
    <div className="flex items-center gap-4">
      <PreviewStepper value={val} onChange={setVal} min={0} max={100} step={5} />
      <span className="text-sm text-muted-foreground">Step: 5</span>
    </div>
  );
}
