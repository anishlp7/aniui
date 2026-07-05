import React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <View
      className={cn("flex-row flex-wrap items-center gap-1.5", className)}
      accessibilityRole="none"
      {...props}
    />
  );
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return <View className={cn("flex-row items-center gap-1.5", className)} {...props} />;
}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function BreadcrumbLink({ className, children, ...props }: BreadcrumbLinkProps) {
  return (
    <Pressable accessibilityRole="link" accessible {...props}>
      <Text className={cn("text-sm text-muted-foreground", className)}>{children}</Text>
    </Pressable>
  );
}

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <Text
      className={cn("text-sm font-medium text-foreground", className)}
      accessibilityRole="header"
      {...props}
    />
  );
}

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function BreadcrumbSeparator({ className, children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <Text className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children ?? "/"}
    </Text>
  );
}
