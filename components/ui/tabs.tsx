import React from "react";
import { View, Pressable, Text } from "react-native";
import * as TabsPrimitive from "@rn-primitives/tabs";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue: string;
  children?: React.ReactNode;
}

export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} asChild>
      <View className={cn("", className)} {...props}>{children}</View>
    </TabsPrimitive.Root>
  );
}

export function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return (
    <TabsPrimitive.List asChild>
      <View className={cn("flex-row rounded-lg bg-muted p-1", className)} {...props} />
    </TabsPrimitive.List>
  );
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const opacity = useSharedValue(0);
  const bgStyle = useAnimatedStyle(() => ({
    position: "absolute" as const, inset: 0, borderRadius: 6,
    backgroundColor: "hsl(var(--card))", opacity: opacity.value,
  }));

  return (
    <TabsPrimitive.Trigger value={value} asChild>
      <Pressable
        className={cn("flex-1 items-center justify-center py-2 min-h-12 relative", className)}
        accessible={true} accessibilityRole="tab"
        onLayout={() => { /* primitive manages selected state */ }}
        {...props}
      >
        <Animated.View style={bgStyle} />
        {typeof children === "string" ? (
          <Text className="text-sm font-medium text-foreground">{children}</Text>
        ) : children}
      </Pressable>
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({ value, className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; value: string }) {
  return (
    <TabsPrimitive.Content value={value} asChild>
      <View className={cn("mt-2", className)} {...props} />
    </TabsPrimitive.Content>
  );
}
