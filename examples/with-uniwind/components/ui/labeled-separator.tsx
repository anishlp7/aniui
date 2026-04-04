import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface LabeledSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label: string;
  labelClassName?: string;
}

export function LabeledSeparator({ label, className, labelClassName, ...props }: LabeledSeparatorProps) {
  return (
    <View className={cn("flex-row items-center gap-3 my-2", className)} {...props}>
      <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      <Text className={cn("text-sm text-zinc-500 dark:text-zinc-400", labelClassName)}>{label}</Text>
      <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
    </View>
  );
}
