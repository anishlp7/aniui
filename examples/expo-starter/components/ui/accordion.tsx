import React, { createContext, useContext, useState } from "react";
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
        <Text className="text-muted-foreground text-lg">{isOpen ? "−" : "+"}</Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
          <View className="pb-4">{children}</View>
        </Animated.View>
      )}
    </View>
  );
}
