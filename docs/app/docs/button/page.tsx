"use client";

import { PreviewButton } from "@/components/preview/button";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add button`;

const usageCode = `import { Button } from "@/components/ui/button";

export function MyScreen() {
  return (
    <Button onPress={() => console.log("pressed")}>
      Click me
    </Button>
  );
}`;

const variantsCode = `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`;

const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

const sourceCode = `import React from "react";
import { Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "items-center justify-center rounded-md min-h-12 min-w-12",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-input bg-transparent",
        ghost: "bg-transparent",
        destructive: "bg-destructive",
      },
      size: {
        sm: "px-3 py-1.5",
        md: "px-4 py-2.5",
        lg: "px-6 py-3.5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      ghost: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  textClassName?: string;
  children: string;
}

export function Button({ variant, size, className, textClassName, children, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      accessibilityRole="button"
      accessible={true}
      {...props}
    >
      <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>
        {children}
      </Text>
    </Pressable>
  );
}`;

export default function ButtonPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Button</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A pressable button component with multiple variants and sizes.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewButton>Click me</PreviewButton>
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
          <div className="flex flex-wrap items-center gap-3">
            <PreviewButton variant="default">Default</PreviewButton>
            <PreviewButton variant="secondary">Secondary</PreviewButton>
            <PreviewButton variant="outline">Outline</PreviewButton>
            <PreviewButton variant="ghost">Ghost</PreviewButton>
            <PreviewButton variant="destructive">Destructive</PreviewButton>
          </div>
        </ComponentPlayground>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewButton size="sm">Small</PreviewButton>
            <PreviewButton size="md">Medium</PreviewButton>
            <PreviewButton size="lg">Large</PreviewButton>
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
                <td className="px-4 py-3 font-mono text-xs">{`"default" | "secondary" | "outline" | "ghost" | "destructive"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"default"`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 font-mono text-xs">{`"sm" | "md" | "lg"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"md"`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">textClassName</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/button.tsx" />
      </div>
    </div>
  );
}
