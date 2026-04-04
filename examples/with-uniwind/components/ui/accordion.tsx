import React from "react";
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
      <View className={cn("border-b border-zinc-200 dark:border-zinc-800", className)} {...props}>
        <AccordionPrimitive.Trigger asChild>
          <Pressable className="flex-row items-center justify-between px-4 py-4 min-h-12" accessible={true} accessibilityRole="button">
            <Text className="text-base font-medium text-zinc-950 dark:text-zinc-50 flex-1">{trigger}</Text>
            <Text className="text-zinc-500 dark:text-zinc-400 text-lg">+</Text>
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
}
