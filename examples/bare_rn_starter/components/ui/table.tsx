import React from "react";
import { View, Text, ScrollView } from "react-native";
import { cn } from "@/lib/utils";

export type TableViewProps = React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode };
export interface TableCellProps extends TableViewProps { textClassName?: string }

export function Table({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollView> & { className?: string; children?: React.ReactNode }) {
  return (
    <ScrollView horizontal className={cn("rounded-md border border-border", className)} {...props}>
      <View className="min-w-full">{children}</View>
    </ScrollView>
  );
}

export function TableHeader({ className, ...props }: TableViewProps) {
  return <View className={cn("bg-muted/50", className)} {...props} />;
}

export function TableBody({ className, ...props }: TableViewProps) {
  return <View className={cn("", className)} {...props} />;
}

export function TableRow({ className, ...props }: TableViewProps) {
  return <View className={cn("flex-row border-b border-border", className)} {...props} />;
}

export function TableHead({ className, textClassName, children, ...props }: TableCellProps) {
  const isText = typeof children === "string" || typeof children === "number";
  return (
    <View className={cn("flex-1 px-4 py-3", className)} {...props}>
      {isText ? <Text className={cn("text-sm font-medium text-muted-foreground", textClassName)}>{children}</Text> : children}
    </View>
  );
}

export function TableCell({ className, textClassName, children, ...props }: TableCellProps) {
  const isText = typeof children === "string" || typeof children === "number";
  return (
    <View className={cn("flex-1 px-4 py-3", className)} {...props}>
      {isText ? <Text className={cn("text-sm text-foreground", textClassName)}>{children}</Text> : children}
    </View>
  );
}
