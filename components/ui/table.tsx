import React from "react";
import { View, Text, ScrollView } from "react-native";
import { cn } from "@/lib/utils";

type ViewProps = React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode };
type TextProps = React.ComponentPropsWithoutRef<typeof Text> & { className?: string };

export function Table({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollView> & { className?: string; children?: React.ReactNode }) {
  return (
    <ScrollView horizontal className={cn("rounded-md border border-border", className)} {...props}>
      <View className="min-w-full">{children}</View>
    </ScrollView>
  );
}

export function TableHeader({ className, ...props }: ViewProps) {
  return <View className={cn("bg-muted/50", className)} {...props} />;
}

export function TableBody({ className, ...props }: ViewProps) {
  return <View className={cn("", className)} {...props} />;
}

export function TableRow({ className, ...props }: ViewProps) {
  return <View className={cn("flex-row border-b border-border", className)} {...props} />;
}

export function TableHead({ className, ...props }: TextProps) {
  return (
    <Text className={cn("flex-1 px-4 py-3 text-sm font-medium text-muted-foreground", className)} {...props} />
  );
}

export function TableCell({ className, ...props }: TextProps) {
  return (
    <Text className={cn("flex-1 px-4 py-3 text-sm text-foreground", className)} {...props} />
  );
}
