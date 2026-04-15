import { PreviewHoverCardDemo } from "@/components/preview/hover-card";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const usageCode = `import { Text } from "react-native";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export function MyScreen() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Text className="text-sm font-medium text-primary underline">@aniui</Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <Text className="text-sm text-card-foreground">
          Beautiful React Native components. Copy. Paste. Ship.
        </Text>
      </HoverCardContent>
    </HoverCard>
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable } from "react-native";
import * as HoverCardPrimitive from "@rn-primitives/hover-card";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

export function HoverCard({ children, open, onOpenChange, openDelay, closeDelay }: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      {children}
    </HoverCardPrimitive.Root>
  );
}

export interface HoverCardTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function HoverCardTrigger({ className, children, ...props }: HoverCardTriggerProps) {
  return (
    <HoverCardPrimitive.Trigger asChild>
      <Pressable
        className={cn("min-h-12 min-w-12", className)}
        accessible={true}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    </HoverCardPrimitive.Trigger>
  );
}

export interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function HoverCardContent({
  className,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Overlay className="absolute inset-0" />
      <HoverCardPrimitive.Content
        side={side}
        sideOffset={sideOffset}
        align={align}
        avoidCollisions
      >
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
          <View
            className={cn("w-64 rounded-lg border border-border bg-card p-4 shadow-lg", className)}
            {...props}
          >
            {children}
          </View>
        </Animated.View>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}`;
export default function HoverCardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Hover Card</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Preview content behind a link. On mobile, triggered by long-press.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode} variant="inline">
        <PreviewHoverCardDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="hover-card" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/hover-card</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code>.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">
          HoverCard is a compound component made up of several parts:
        </p>
        <ComponentTable components={[
          { name: "HoverCard", description: "Root component that manages open/closed state. Supports both controlled and uncontrolled usage." },
          { name: "HoverCardTrigger", description: "The pressable element that toggles the hover card. On mobile, activated by long-press." },
          { name: "HoverCardContent", description: "The floating panel that displays the hover card content. Supports side, sideOffset, and align props." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">HoverCard</h3>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "-" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
          { name: "openDelay", type: "number", default: "-" },
          { name: "closeDelay", type: "number", default: "-" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">HoverCardContent</h3>
        <PropsTable props={[
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
          { name: "sideOffset", type: "number", default: "8" },
          { name: "align", type: '"start" | "center" | "end"', default: '"center"' },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          All sub-components also accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/hover-card</code> for proper trigger-relative positioning.</li>
          <li>Collision detection prevents overflow off screen edges.</li>
          <li>Long-press trigger on mobile devices where hover is not available.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger.</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at app root.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/hover-card.tsx" />
      </div>
    </div>
  );
}
