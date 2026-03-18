"use client";
import { PreviewButton } from "@/components/preview/button";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function SendIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function TrashIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
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
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`;
const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;
const iconCode = `import { Ionicons } from "@expo/vector-icons";
// Icon before text
<Button icon={<Ionicons name="add" size={18} color="#fff" />}>
  Create
</Button>
// Icon after text
<Button iconAfter={<Ionicons name="send" size={18} color="#fff" />}>
  Send
</Button>
// Icon only
<Button size="icon" icon={<Ionicons name="heart" size={18} color="#fff" />} />`;
const loadingCode = `<Button loading>Saving...</Button>
<Button loading variant="outline">Loading</Button>
<Button loading variant="destructive">Deleting</Button>`;
const disabledCode = `<Button disabled>Disabled</Button>
<Button disabled variant="outline">Disabled</Button>`;
const blockCode = `<Button className="w-full">Full Width Button</Button>
<Button className="w-full" variant="outline">Full Width Outline</Button>`;
const sourceCode = `import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md min-h-12 min-w-12",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-input bg-transparent",
        ghost: "bg-transparent",
        destructive: "bg-destructive",
        link: "bg-transparent",
      },
      size: {
        sm: "px-3 py-1.5 gap-1.5",
        md: "px-4 py-2.5 gap-2",
        lg: "px-6 py-3.5 gap-2.5",
        icon: "h-10 w-10 p-0",
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
      link: "text-primary underline",
    },
    size: { sm: "text-sm", md: "text-base", lg: "text-lg", icon: "text-sm" },
  },
  defaultVariants: { variant: "default", size: "md" },
});
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  textClassName?: string;
  children?: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  loading?: boolean;
}
export function Button({ variant, size, className, textClassName, children, icon, iconAfter, loading, disabled, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const light = variant === "default" || variant === "destructive";
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), isDisabled && "opacity-50", className)}
      accessibilityRole="button"
      accessible={true}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={light ? "hsl(0,0%,98%)" : "hsl(240,5.9%,10%)"} />
      ) : icon ?? null}
      {children ? (
        <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>{children}</Text>
      ) : null}
      {!loading && iconAfter ? iconAfter : null}
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
          A pressable button with variants, sizes, icons, and loading states.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-3">
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
        <p className="text-sm text-muted-foreground">
          Six visual styles for different contexts and emphasis levels.
        </p>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewButton variant="default">Default</PreviewButton>
            <PreviewButton variant="secondary">Secondary</PreviewButton>
            <PreviewButton variant="outline">Outline</PreviewButton>
            <PreviewButton variant="ghost">Ghost</PreviewButton>
            <PreviewButton variant="destructive">Destructive</PreviewButton>
            <PreviewButton variant="link">Link</PreviewButton>
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
      {/* With Icons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">With Icons</h2>
        <p className="text-sm text-muted-foreground">
          Pass any React Native element as <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">icon</code> (leading) or <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">iconAfter</code> (trailing). Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">size="icon"</code> for icon-only buttons.
        </p>
        <ComponentPlayground code={iconCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewButton><PlusIcon className="mr-1.5 text-primary-foreground" />Create</PreviewButton>
            <PreviewButton>Send<SendIcon className="ml-1.5 text-primary-foreground" /></PreviewButton>
            <PreviewButton variant="outline"><SearchIcon className="mr-1.5" />Search</PreviewButton>
            <PreviewButton variant="destructive"><TrashIcon className="mr-1.5 text-destructive-foreground" />Delete</PreviewButton>
            <PreviewButton size="icon"><HeartIcon className="text-primary-foreground" /></PreviewButton>
            <PreviewButton size="icon" variant="outline"><PlusIcon /></PreviewButton>
            <PreviewButton size="icon" variant="ghost"><SearchIcon /></PreviewButton>
          </div>
        </ComponentPlayground>
      </div>
      {/* Loading */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Loading</h2>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">loading</code> to show a spinner and disable interaction. The spinner color adapts to the variant.
        </p>
        <ComponentPlayground code={loadingCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewButton loading>Saving...</PreviewButton>
            <PreviewButton loading variant="outline">Loading</PreviewButton>
            <PreviewButton loading variant="destructive">Deleting</PreviewButton>
          </div>
        </ComponentPlayground>
      </div>
      {/* Disabled */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Disabled</h2>
        <ComponentPlayground code={disabledCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewButton disabled>Disabled</PreviewButton>
            <PreviewButton disabled variant="secondary">Disabled</PreviewButton>
            <PreviewButton disabled variant="outline">Disabled</PreviewButton>
          </div>
        </ComponentPlayground>
      </div>
      {/* Full Width */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Full Width</h2>
        <p className="text-sm text-muted-foreground">
          Add <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className="w-full"</code> for block-level buttons.
        </p>
        <ComponentPlayground code={blockCode}>
          <div className="flex flex-col gap-3 w-full">
            <PreviewButton className="w-full">Full Width Button</PreviewButton>
            <PreviewButton className="w-full" variant="outline">Full Width Outline</PreviewButton>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"secondary\" | \"outline\" | \"ghost\" | \"destructive\" | \"link\"", default: "\"default\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\" | \"icon\"", default: "\"md\"" },
          { name: "icon", type: "React.ReactNode" },
          { name: "iconAfter", type: "React.ReactNode" },
          { name: "loading", type: "boolean", default: "false" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "className", type: "string" },
          { name: "textClassName", type: "string" },
          { name: "children", type: "string" },
        ]} />
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