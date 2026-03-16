import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const TabsContext = createContext<{ value: string; onValueChange: (v: string) => void }>({
  value: "",
  onValueChange: () => {},
});

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue: string;
  children?: React.ReactNode;
}

export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <View className={cn("flex-row rounded-lg bg-muted p-1", className)} {...props} />
  );
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: selected, onValueChange } = useContext(TabsContext);
  const isActive = selected === value;
  const opacity = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0, { duration: 150 });
  }, [isActive, opacity]);

  const bgStyle = useAnimatedStyle(() => ({
    position: "absolute" as const, top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 6, backgroundColor: "hsl(0, 0%, 100%)", opacity: opacity.value,
  }));

  return (
    <Pressable
      className={cn("flex-1 items-center justify-center py-2 min-h-12 relative", className)}
      onPress={() => onValueChange(value)}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      {...props}
    >
      <Animated.View style={bgStyle} />
      <Text className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
        {typeof children === "string" ? children : null}
      </Text>
      {typeof children !== "string" ? children : null}
    </Pressable>
  );
}

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  children?: React.ReactNode;
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selected } = useContext(TabsContext);
  if (selected !== value) return null;
  return <View className={cn("mt-2", className)} {...props} />;
}
