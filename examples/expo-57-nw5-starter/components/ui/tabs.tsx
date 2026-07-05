import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TabsVariant = "filled" | "line";
type TabsSize = "sm" | "md" | "lg";
type TabsOrientation = "horizontal" | "vertical";

const TabsCtx = createContext<{
  value: string;
  onValueChange: (v: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
}>({ value: "", onValueChange: () => {}, variant: "filled", size: "md", orientation: "horizontal" });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue: string;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  children?: React.ReactNode;
}

export function Tabs({
  defaultValue, variant = "filled", size = "md", orientation = "horizontal",
  className, children, ...props
}: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value, onValueChange: setValue, variant, size, orientation }}>
      <View className={cn(orientation === "vertical" && "flex-row", className)} {...props}>
        {children}
      </View>
    </TabsCtx.Provider>
  );
}

const listVariants = cva("", {
  variants: {
    variant: { filled: "rounded-lg bg-muted p-1", line: "border-b border-border" },
    orientation: { horizontal: "flex-row", vertical: "flex-col border-b-0 border-e border-border rounded-none" },
  },
  defaultVariants: { variant: "filled", orientation: "horizontal" },
});

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export function TabsList({ className, ...props }: TabsListProps) {
  const { variant, orientation } = useContext(TabsCtx);
  return <View className={cn(listVariants({ variant, orientation }), className)} accessibilityRole="tablist" {...props} />;
}

const triggerSize = cva("will-change-variable items-center justify-center", {
  variants: {
    size: { sm: "min-h-8 py-1 px-2.5", md: "min-h-10 py-2 px-3", lg: "min-h-12 py-2.5 px-4" },
  },
  defaultVariants: { size: "md" },
});

const triggerTextSize = cva("will-change-variable font-medium", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { size: "md" },
});

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  textClassName?: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function TabsTrigger({
  value, disabled = false, icon, className, textClassName, children, ...props
}: TabsTriggerProps) {
  const { value: selected, onValueChange, variant, size, orientation } = useContext(TabsCtx);
  const isActive = selected === value;

  return (
    <Pressable
      className={cn(
        triggerSize({ size }),
        orientation === "horizontal" ? "flex-1" : "self-stretch",
        variant === "filled" && "rounded-md",
        variant === "filled" && isActive && "bg-background shadow-sm",
        variant === "line" && isActive && (orientation === "horizontal" ? "border-b-2 border-primary" : "border-e-2 border-primary"),
        disabled && "opacity-40",
        className
      )}
      onPress={() => !disabled && onValueChange(value)}
      disabled={disabled}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled }}
      {...props}
    >
      <View className="flex-row items-center gap-1.5">
        {icon}
        {typeof children === "string" ? (
          <Text className={cn(triggerTextSize({ size }), isActive ? "text-foreground" : "text-muted-foreground", textClassName)}>
            {children}
          </Text>
        ) : children}
      </View>
    </Pressable>
  );
}

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selected, orientation } = useContext(TabsCtx);
  if (selected !== value) return null;
  return <View className={cn(orientation === "horizontal" ? "mt-2" : "ms-4 flex-1", className)} role="tabpanel" {...props} />;
}
