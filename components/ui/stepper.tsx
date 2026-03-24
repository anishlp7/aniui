import React from "react";
import { View, Text, Pressable } from "react-native";

const sizes = {
  sm: { height: 36, width: 36 },
  md: { height: 44, width: 44 },
  lg: { height: 56, width: 56 },
} as const;

export interface StepperProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
}

export function Stepper({ size = "md", className, value, onChange, min = 0, max = 99, step = 1, ...props }: StepperProps) {
  const s = sizes[size];
  const canDec = value - step >= min;
  const canInc = value + step <= max;

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", height: s.height, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8, alignSelf: "flex-start" }}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      {...props}
    >
      <Pressable
        style={{ width: s.width, height: "100%", alignItems: "center", justifyContent: "center", borderRightWidth: 1, borderRightColor: "#e4e4e7", opacity: canDec ? 1 : 0.3 }}
        onPress={() => { if (canDec) onChange(value - step); }}
        disabled={!canDec}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
      >
        <Text style={{ fontSize: 18, color: "#09090b" }}>−</Text>
      </Pressable>
      <View style={{ width: 56, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#09090b" }}>{value}</Text>
      </View>
      <Pressable
        style={{ width: s.width, height: "100%", alignItems: "center", justifyContent: "center", borderLeftWidth: 1, borderLeftColor: "#e4e4e7", opacity: canInc ? 1 : 0.3 }}
        onPress={() => { if (canInc) onChange(value + step); }}
        disabled={!canInc}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
      >
        <Text style={{ fontSize: 18, color: "#09090b" }}>+</Text>
      </Pressable>
    </View>
  );
}
