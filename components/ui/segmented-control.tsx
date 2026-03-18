import React from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentVariants = cva("rounded-lg bg-muted p-1 flex-row", {
  variants: {
    size: {
      sm: "h-9",
      md: "h-11",
      lg: "h-13",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SegmentedControlProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof segmentVariants> {
  className?: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SegmentedControl({ size, className, options, value, onValueChange, ...props }: SegmentedControlProps) {
  return (
    <View className={cn(segmentVariants({ size }), className)} accessibilityRole="tablist" {...props}>
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            className={cn("flex-1 items-center justify-center rounded-md", active && "bg-background shadow-sm")}
            onPress={() => onValueChange(option)}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
