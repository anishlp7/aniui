import { Heading } from "@/components/heading";
import { PreviewProgress } from "@/components/preview/progress";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add progress`;
const usageCode = `import { Progress } from "@/components/ui/progress";

export function MyScreen() {
  return (
    <Progress value={60} />
  );
}`;
const examplesCode = `<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`;
const sourceCode = `import React from "react";
import { View } from "react-native";
import * as ProgressPrimitive from "@rn-primitives/progress";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  indicatorClassName?: string;
}

export function Progress({ value = 0, className, indicatorClassName, ...props }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <ProgressPrimitive.Root value={clampedValue} asChild>
      <View
        className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
        {...props}
      >
        <ProgressPrimitive.Indicator asChild>
          <View
            className={cn("h-full rounded-full bg-primary", indicatorClassName)}
            style={{ width: \`\${clampedValue}%\` }}
          />
        </ProgressPrimitive.Indicator>
      </View>
    </ProgressPrimitive.Root>
  );
}`;
export default function ProgressPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Progress</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Progress bar indicating completion percentage.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewProgress value={60} />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="progress" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Examples */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Examples</Heading>
        <ComponentPlayground code={examplesCode}>
          <div className="space-y-4 w-full max-w-sm">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">0%</span>
              <PreviewProgress value={0} />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">25%</span>
              <PreviewProgress value={25} />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">50%</span>
              <PreviewProgress value={50} />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">75%</span>
              <PreviewProgress value={75} />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">100%</span>
              <PreviewProgress value={100} />
            </div>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "number", default: "0" },
          { name: "className", type: "string" },
          { name: "indicatorClassName", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native. Value is clamped between 0 and 100.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/progress</code> for semantic progress reporting.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="progressbar"</code> with min/max/now values exposed to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/progress.tsx" />
      </div>
    </div>
  );
}