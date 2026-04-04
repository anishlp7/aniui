import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

const TabsCtx = createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue: string;
  children?: React.ReactNode;
}

export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value, onValueChange: setValue }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </TabsCtx.Provider>
  );
}

export function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("flex-row rounded-lg bg-muted p-1", className)} {...props} />;
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: selected, onValueChange } = useContext(TabsCtx);
  const isActive = selected === value;

  return (
    <Pressable
      className={cn("flex-1 items-center justify-center py-2 min-h-12 rounded-md", isActive && "bg-background shadow-sm", className)}
      onPress={() => onValueChange(value)}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{children}</Text>
      ) : children}
    </Pressable>
  );
}

export function TabsContent({ value, className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; value: string }) {
  const { value: selected } = useContext(TabsCtx);
  if (selected !== value) return null;
  return <View className={cn("mt-2", className)} {...props} />;
}
