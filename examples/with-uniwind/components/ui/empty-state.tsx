import React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <View className={cn("items-center justify-center px-8 py-16", className)} {...props}>
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 text-center mb-1">{title}</Text>
      {description && <Text className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-6 max-w-[280px]">{description}</Text>}
      {action && (
        <Pressable
          onPress={action.onPress}
          className="rounded-lg bg-zinc-900 dark:bg-zinc-50 px-6 py-2.5 min-h-12 items-center justify-center"
          accessible={true}
          accessibilityRole="button"
        >
          <Text className="text-sm font-medium text-zinc-50 dark:text-zinc-900">{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}
