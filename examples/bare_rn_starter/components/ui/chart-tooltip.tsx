import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface ChartTooltipProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label?: string;
  value?: string | number;
  indicator?: "line" | "dot" | "dashed";
  color?: string;
  items?: { label: string; value: string | number; color: string }[];
}

export function ChartTooltip({
  className,
  label,
  value,
  indicator = "dot",
  color = "#000",
  items,
  ...props
}: ChartTooltipProps) {
  const indicatorEl = (c: string) =>
    indicator === "line" ? (
      <View className="w-1 h-3 rounded-full" style={{ backgroundColor: c }} />
    ) : indicator === "dashed" ? (
      <View
        className="w-1 h-3 rounded-full"
        style={{ backgroundColor: c, opacity: 0.5 }}
      />
    ) : (
      <View
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: c }}
      />
    );

  return (
    <View
      className={cn(
        "rounded-lg border border-border bg-card px-3 py-2 shadow-sm",
        className
      )}
      accessibilityRole="summary"
      {...props}
    >
      {label && (
        <Text className="text-xs text-muted-foreground mb-1">{label}</Text>
      )}
      {items ? (
        items.map((item, i) => (
          <View key={i} className="flex-row items-center gap-2 py-0.5">
            {indicatorEl(item.color)}
            <Text className="text-xs text-muted-foreground">{item.label}</Text>
            <Text className="text-xs font-medium text-foreground ms-auto">
              {item.value}
            </Text>
          </View>
        ))
      ) : (
        <View className="flex-row items-center gap-2">
          {indicatorEl(color)}
          <Text className="text-sm font-medium text-foreground">{value}</Text>
        </View>
      )}
    </View>
  );
}
