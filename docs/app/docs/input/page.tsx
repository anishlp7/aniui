"use client";

import { PreviewInput } from "@/components/preview/input";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add input`;

const usageCode = `import { Input } from "@/components/ui/input";

export function MyScreen() {
  return (
    <Input placeholder="Enter your email..." />
  );
}`;

const variantsCode = `<Input variant="default" placeholder="Default input" />
<Input variant="ghost" placeholder="Ghost input" />`;

const sizesCode = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

const sourceCode = `import React from "react";
import { TextInput } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "rounded-md border text-foreground placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "min-h-9 px-3 text-sm",
        md: "min-h-12 px-4 text-base",
        lg: "min-h-14 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  className?: string;
}

export function Input({ variant, size, className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(inputVariants({ variant, size }), className)}
      placeholderTextColor="hsl(240 3.8% 46.1%)"
      {...props}
    />
  );
}`;

export default function InputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Text input with variants and states.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4 w-full max-w-sm">
          <PreviewInput placeholder="Enter your email..." />
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Variants</h2>
        <ComponentPlayground code={variantsCode}>
          <div className="space-y-3 w-full max-w-sm">
            <PreviewInput variant="default" placeholder="Default input" />
            <PreviewInput variant="ghost" placeholder="Ghost input" />
          </div>
        </ComponentPlayground>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="space-y-3 w-full max-w-sm">
            <PreviewInput size="sm" placeholder="Small" />
            <PreviewInput size="md" placeholder="Medium" />
            <PreviewInput size="lg" placeholder="Large" />
          </div>
        </ComponentPlayground>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 font-mono text-xs">{`"default" | "ghost"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"default"`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 font-mono text-xs">{`"sm" | "md" | "lg"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"md"`}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props from React Native.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/input.tsx" />
      </div>
    </div>
  );
}
