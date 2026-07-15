import React from "react";
import { View, Pressable, Text, useColorScheme } from "react-native";
import * as AccordionPrimitive from "@rn-primitives/accordion";
import Animated from "react-native-reanimated";
import { ChevronDown } from "lucide-react-native";
import { entering, exiting } from "@/components/ui/animate";
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

// Rendered inside the Item so useItemContext can read the open state.
function AccordionTrigger({ label }: { label: string }) {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  const dark = useColorScheme() === "dark";
  return (
    <AccordionPrimitive.Trigger asChild>
      <Pressable
        className="flex-row items-center justify-between px-4 py-4 min-h-12"
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <Text className="text-base font-medium text-foreground flex-1">{label}</Text>
        <ChevronDown
          size={16}
          color={dark ? "#a1a1aa" : "#71717a"}
          strokeWidth={2}
          style={{ transform: [{ rotate: isExpanded ? "180deg" : "0deg" }] }}
        />
      </Pressable>
    </AccordionPrimitive.Trigger>
  );
}

export function AccordionItem({ value, trigger, className, children, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item value={value} asChild>
      <View className={cn("border-b border-border", className)} {...props}>
        <AccordionTrigger label={trigger} />
        <AccordionPrimitive.Content>
          <Animated.View entering={entering.fadeInDown} exiting={exiting.fadeOutUp}>
            <View className="px-4 pb-4">{children}</View>
          </Animated.View>
        </AccordionPrimitive.Content>
      </View>
    </AccordionPrimitive.Item>
  );
}
