import React from "react";
import { View, Pressable, Text } from "react-native";

const heights = { sm: 36, md: 44, lg: 56 } as const;

export interface SegmentedControlProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
}

export function SegmentedControl({ size = "md", className, options, value, onValueChange, ...props }: SegmentedControlProps) {
  return (
    <View
      className="rounded-lg bg-muted"
      style={{ height: heights[size], padding: 4, flexDirection: "row", borderRadius: 8 }}
      accessibilityRole="tablist"
      {...props}
    >
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              backgroundColor: active ? "#ffffff" : "transparent",
              ...(active ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 1 } : {}),
            }}
            onPress={() => onValueChange(option)}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: active ? "#09090b" : "#71717a" }}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
