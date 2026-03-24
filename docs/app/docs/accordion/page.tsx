"use client";
import { PreviewAccordion, PreviewAccordionItem } from "@/components/preview/accordion";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";

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
const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const AccordionContext = createContext<{
  expanded: string | null;
  toggle: (value: string) => void;
}>({ expanded: null, toggle: () => {} });
export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue?: string;
  children?: React.ReactNode;
}
export function Accordion({ className, defaultValue, children, ...props }: AccordionProps) {
  const [expanded, setExpanded] = useState<string | null>(defaultValue ?? null);
  const toggle = (value: string) => setExpanded((prev) => (prev === value ? null : value));
  return (
    <AccordionContext.Provider value={{ expanded, toggle }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </AccordionContext.Provider>
  );
}
export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  trigger: string;
  children?: React.ReactNode;
}
export function AccordionItem({ value, trigger, className, children, ...props }: AccordionItemProps) {
  const { expanded, toggle } = useContext(AccordionContext);
  const isOpen = expanded === value;
  return (
    <View className={cn("border-b border-border", className)} {...props}>
      <Pressable
        className="flex-row items-center justify-between py-4 min-h-12"
        onPress={() => toggle(value)}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text className="text-base font-medium text-foreground flex-1">{trigger}</Text>
        <Text className="text-muted-foreground text-lg">{isOpen ? "\u2212" : "+"}</Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
          <View className="pb-4">{children}</View>
        </Animated.View>
      )}
    </View>
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
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
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
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">AccordionItem</h3>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "trigger", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/accordion.tsx" />
      </div>
    </div>
  );
}