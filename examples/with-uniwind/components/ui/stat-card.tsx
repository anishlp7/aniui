import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export function StatCard({ className, label, value, change, trend, icon, ...props }: StatCardProps) {
  const trendColor =
    trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500 dark:text-red-900" : "text-zinc-500 dark:text-zinc-400";
  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "";

  return (
    <View
      className={cn("rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4", className)}
      accessibilityRole="summary"
      {...props}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm text-zinc-500 dark:text-zinc-400">{label}</Text>
        {icon && <View>{icon}</View>}
      </View>
      <Text className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">{value}</Text>
      {change !== undefined && (
        <View className="flex-row items-center mt-1 gap-1">
          <Text className={cn("text-sm font-medium", trendColor)}>
            {trendArrow} {change > 0 ? "+" : ""}{change}%
          </Text>
        </View>
      )}
    </View>
  );
}
