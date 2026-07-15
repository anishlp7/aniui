import { Heading } from "@/components/heading";
import { PreviewTextarea } from "@/components/preview/textarea";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add textarea`;
const usageCode = `import { Textarea } from "@/components/ui/textarea";

export function MyScreen() {
  return (
    <Textarea
      placeholder="Type your message here..."
      onChangeText={(text) => console.log(text)}
    />
  );
}`;
const variantsCode = `<Textarea variant="default" placeholder="Default variant" />
<Textarea variant="ghost" placeholder="Ghost variant" />`;
const sourceCode = `import React from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Padding lives on the wrapping View (a raw TextInput doesn't honor \`px-*\`
// reliably), so the text inset matches Input and is consistent on all sides —
// under both NativeWind and Uniwind.
const textareaVariants = cva(
  "rounded-md border px-4 py-3 min-h-24",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof textareaVariants> {
  className?: string;
}

export const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextareaProps
>(function Textarea({ variant, className, ...props }, ref) {
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  return (
    <View className={cn(textareaVariants({ variant }), className)}>
      <TextInput
        ref={ref}
        className="flex-1 p-0 text-foreground placeholder:text-muted-foreground text-base"
        placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
        keyboardAppearance={dark ? "dark" : "light"}
        selectionColor={caret}
        cursorColor={caret}
        multiline
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
});`;
export default function TextareaPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Textarea</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A multiline text input component with variants for forms and content entry.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <PreviewTextarea placeholder="Type your message here..." />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="textarea" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Variants</Heading>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <PreviewTextarea variant="default" placeholder="Default variant" />
            <PreviewTextarea variant="ghost" placeholder="Ghost variant" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"ghost\"", default: "\"default\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole</code> is set on the underlying multi-line <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code>.</li>
          <li>Supports all standard React Native accessibility props.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/textarea.tsx" />
      </div>
    </div>
  );
}