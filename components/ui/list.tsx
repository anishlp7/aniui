import React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface ListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function List({ className, ...props }: ListProps) {
  return <View className={cn("", className)} {...props} />;
}

export interface ListItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function ListItem({ className, ...props }: ListItemProps) {
  return (
    <Pressable
      className={cn("flex-row items-center px-4 py-3 min-h-12 border-b border-border", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    />
  );
}

export interface ListItemTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function ListItemTitle({ className, ...props }: ListItemTitleProps) {
  return <Text className={cn("text-base font-medium text-foreground", className)} {...props} />;
}

export interface ListItemDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function ListItemDescription({ className, ...props }: ListItemDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
