"use client";
import React from "react";
import { PreviewFAB } from "@/components/preview/fab";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
const installCode = `npx @aniui/cli add fab`;
const usageCode = `import { FAB } from "@/components/ui/fab";
import { Ionicons } from "@expo/vector-icons";
// Basic FAB (bottom-right by default)
<FAB icon={<Ionicons name="add" size={24} color="white" />} onPress={() => {}} />`;
const variantsCode = `<FAB variant="default" icon={<PlusIcon />} />
<FAB variant="secondary" icon={<PlusIcon />} />
<FAB variant="destructive" icon={<TrashIcon />} />`;
const sizesCode = `<FAB size="sm" icon={<PlusIcon />} />
<FAB size="md" icon={<PlusIcon />} />
<FAB size="lg" icon={<PlusIcon />} />`;
const extendedCode = `<FAB icon={<PlusIcon />} label="New Post" onPress={() => {}} />
<FAB variant="secondary" icon={<EditIcon />} label="Compose" />`;
const positionCode = `// Wrap your screen in a relative container
<View className="flex-1 relative">
  {/* Screen content */}
  <FAB position="bottom-right" icon={<PlusIcon />} />
  <FAB position="bottom-left" icon={<MenuIcon />} />
  <FAB position="bottom-center" icon={<PlusIcon />} />
</View>`;
const sourceCode = `import React from "react";
import { Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fabVariants = cva(
  "items-center justify-center shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
      },
      size: {
        sm: "h-12 w-12 rounded-full",
        md: "h-14 w-14 rounded-full",
        lg: "h-16 w-16 rounded-full",
        extended: "h-14 rounded-full px-6 flex-row gap-2",
      },
      position: {
        "bottom-right": "absolute bottom-6 right-6",
        "bottom-left": "absolute bottom-6 left-6",
        "bottom-center": "absolute bottom-6 self-center",
        none: "",
      },
    },
    defaultVariants: { variant: "default", size: "md", position: "bottom-right" },
  }
);
const fabTextVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface FABProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof fabVariants> {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}
export function FAB({ variant, size, position, className, icon, label, ...props }: FABProps) {
  return (
    <Pressable className={cn(fabVariants({ variant, size: label ? "extended" : size, position }), className)} accessible={true} accessibilityRole="button" accessibilityLabel={label ?? "Action button"} {...props}>
      {icon}
      {label && <Text className={cn(fabTextVariants({ variant }), "text-base")}>{label}</Text>}
    </Pressable>
  );
}`;
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "h-6 w-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}
export default function FABPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">FAB</h1>
        <p className="text-muted-foreground text-lg">A floating action button for primary screen actions. Positions itself absolutely within its container.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewFAB />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="fab" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Variants</h2>
        <ComponentPlayground code={variantsCode}>
          <div className="flex items-center gap-4">
            <PreviewFAB variant="default" />
            <PreviewFAB variant="secondary" />
            <PreviewFAB variant="destructive" icon={<TrashIcon />} />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="flex items-center gap-4">
            <PreviewFAB size="sm" icon={<PlusIcon className="h-5 w-5" />} />
            <PreviewFAB size="md" />
            <PreviewFAB size="lg" />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Extended FAB</h2>
        <p className="text-sm text-muted-foreground mb-4">Add a label for more descriptive actions. The FAB automatically switches to the extended size.</p>
        <ComponentPlayground code={extendedCode}>
          <div className="flex flex-col items-start gap-3">
            <PreviewFAB label="New Post" />
            <PreviewFAB variant="secondary" icon={<EditIcon />} label="Compose" />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Positioning</h2>
        <p className="text-sm text-muted-foreground mb-4">The FAB positions itself absolutely. Wrap your screen in a <code>relative</code> container.</p>
        <CodeBlock code={positionCode} title="screen.tsx" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"secondary\" | \"destructive\"", default: "\"default\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "position", type: "\"bottom-right\" | \"bottom-left\" | \"bottom-center\" | \"none\"", default: "\"bottom-right\"" },
          { name: "icon", type: "ReactNode" },
          { name: "label", type: "string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with minimum 48dp touch target.</li>
          <li>Provide an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> describing the action since the FAB typically shows only an icon.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/fab.tsx" />
      </div>
    </div>
  );
}
