import React from "react";
import { View, Text, ScrollView } from "react-native";
import { cn } from "@/lib/utils";

export type TableViewProps = React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode };
export type TableTextProps = React.ComponentPropsWithoutRef<typeof Text> & { className?: string };

export function Table({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollView> & { className?: string; children?: React.ReactNode }) {
  return (
    <ScrollView horizontal className={cn("rounded-md border border-zinc-200 dark:border-zinc-800", className)} {...props}>
      <View className="min-w-full">{children}</View>
    </ScrollView>
  );
}

export function TableHeader({ className, ...props }: TableViewProps) {
  return <View className={cn("bg-zinc-100/50 dark:bg-zinc-800/50", className)} {...props} />;
}

export function TableBody({ className, ...props }: TableViewProps) {
  return <View className={cn("", className)} {...props} />;
}

export function TableRow({ className, ...props }: TableViewProps) {
  return <View className={cn("flex-row border-b border-zinc-200 dark:border-zinc-800", className)} {...props} />;
}

export function TableHead({ className, ...props }: TableTextProps) {
  return (
    <Text className={cn("flex-1 px-4 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400", className)} {...props} />
  );
}

export function TableCell({ className, ...props }: TableTextProps) {
  return (
    <Text className={cn("flex-1 px-4 py-3 text-sm text-zinc-950 dark:text-zinc-50", className)} {...props} />
  );
}
