"use client";
import { PreviewText } from "@/components/preview/text";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add text`;
const usageCode = `import { Text } from "@/components/ui/text";

export function MyScreen() {
  return (
    <>
      <Text variant="h1">Heading One</Text>
      <Text variant="p">This is a paragraph of text.</Text>
    </>
  );
}`;
const allVariantsCode = `<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="p">Paragraph text</Text>
<Text variant="lead">Lead text</Text>
<Text variant="large">Large text</Text>
<Text variant="small">Small text</Text>
<Text variant="muted">Muted text</Text>`;
const sourceCode = `import React from "react";
import { Text as RNText } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight",
      h2: "text-3xl font-bold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      p: "text-base leading-7",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: { variant: "p" },
});
export interface TextProps
  extends React.ComponentPropsWithoutRef<typeof RNText>,
    VariantProps<typeof textVariants> {
  className?: string;
}
export function Text({ variant, className, ...props }: TextProps) {
  return (
    <RNText
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
}`;
export default function TextPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Text</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Typography component with heading and body text variants.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="space-y-2">
          <PreviewText variant="h1">Heading One</PreviewText>
          <PreviewText variant="p">This is a paragraph of text.</PreviewText>
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="text" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* All Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Variants</h2>
        <ComponentPlayground code={allVariantsCode}>
          <div className="space-y-4 w-full">
            <PreviewText variant="h1">Heading 1</PreviewText>
            <PreviewText variant="h2">Heading 2</PreviewText>
            <PreviewText variant="h3">Heading 3</PreviewText>
            <PreviewText variant="h4">Heading 4</PreviewText>
            <PreviewText variant="p">Paragraph — The quick brown fox jumps over the lazy dog.</PreviewText>
            <PreviewText variant="lead">Lead text for introductions</PreviewText>
            <PreviewText variant="large">Large emphasized text</PreviewText>
            <PreviewText variant="small">Small utility text</PreviewText>
            <PreviewText variant="muted">Muted secondary information</PreviewText>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"p\" | \"lead\" | \"large\" | \"small\" | \"muted\"", default: "\"p\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Semantic text component with heading variants for proper screen reader hierarchy.</li>
          <li>All variants use the React Native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> component with full accessibility prop support.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/text.tsx" />
      </div>
    </div>
  );
}