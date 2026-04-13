import { PreviewAccordion, PreviewAccordionItem } from "@/components/preview/accordion";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add accordion`;
const usageCode = `import { Accordion, AccordionItem } from "@/components/ui/accordion";

export function MyScreen() {
  return (
    <Accordion defaultValue="item-1">
      <AccordionItem value="item-1" trigger="Is it accessible?">
        <Text>Yes. It uses accessibilityRole and accessibilityState.</Text>
      </AccordionItem>
      <AccordionItem value="item-2" trigger="Is it animated?">
        <Text>Yes. It uses react-native-reanimated for smooth animations.</Text>
      </AccordionItem>
      <AccordionItem value="item-3" trigger="Can I customize it?">
        <Text>Yes. Use className to override any styles.</Text>
      </AccordionItem>
    </Accordion>
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
import * as AccordionPrimitive from "@rn-primitives/accordion";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue?: string;
  children?: React.ReactNode;
  type?: "single" | "multiple";
}

export function Accordion({ className, defaultValue, children, type = "single", ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type={type}
      defaultValue={type === "single" ? defaultValue : defaultValue ? [defaultValue] : undefined}
      asChild
    >
      <View className={cn("", className)} {...props}>{children}</View>
    </AccordionPrimitive.Root>
  );
}

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  trigger: string;
  children?: React.ReactNode;
}

export function AccordionItem({ value, trigger, className, children, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item value={value} asChild>
      <View className={cn("border-b border-border", className)} {...props}>
        <AccordionPrimitive.Trigger asChild>
          <Pressable className="flex-row items-center justify-between px-4 py-4 min-h-12" accessible={true} accessibilityRole="button">
            <Text className="text-base font-medium text-foreground flex-1">{trigger}</Text>
            <Text className="text-muted-foreground text-lg">+</Text>
          </Pressable>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content>
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
            <View className="px-4 pb-4">{children}</View>
          </Animated.View>
        </AccordionPrimitive.Content>
      </View>
    </AccordionPrimitive.Item>
  );
}`;
export default function AccordionPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Accordion</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Expandable content sections with animated height transitions.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewAccordion defaultValue="item-1">
              <PreviewAccordionItem value="item-1" trigger="Is it accessible?">
                <p className="text-sm text-muted-foreground">Yes. It uses accessibilityRole and accessibilityState.</p>
              </PreviewAccordionItem>
              <PreviewAccordionItem value="item-2" trigger="Is it animated?">
                <p className="text-sm text-muted-foreground">Yes. It uses react-native-reanimated for smooth animations.</p>
              </PreviewAccordionItem>
              <PreviewAccordionItem value="item-3" trigger="Can I customize it?">
                <p className="text-sm text-muted-foreground">Yes. Use className to override any styles.</p>
              </PreviewAccordionItem>
            </PreviewAccordion>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="accordion" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for animations.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <ComponentTable components={[
          { name: "Accordion", description: "Root container that manages expanded state" },
          { name: "AccordionItem", description: "Individual collapsible section with trigger text" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Accordion</h3>
        <PropsTable props={[
          { name: "defaultValue", type: "string" },
          { name: "type", type: "\"single\" | \"multiple\"", default: "\"single\"" },
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">AccordionItem</h3>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "trigger", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/accordion</code> for keyboard navigation and ARIA compliance.</li>
          <li>Supports single and multiple open modes.</li>
          <li>Each trigger has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> for expanded/collapsed.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/accordion.tsx" />
      </div>
    </div>
  );
}