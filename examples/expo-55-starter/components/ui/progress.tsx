import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: number;
  indicatorClassName?: string;
}

export function Progress({ value = 0, className, indicatorClassName, ...props }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <View
      className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
      {...props}
    >
      <View
        className={cn("h-full rounded-full bg-primary", indicatorClassName)}
        style={{ width: `${clampedValue}%` }}
      />
    </View>
  );
}
