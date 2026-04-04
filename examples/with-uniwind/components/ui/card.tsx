import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface CardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn("rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6", className)}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export interface CardTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <Text
      className={cn("text-2xl font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight", className)}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <Text className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}

export interface CardContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <View className={cn("py-2", className)} {...props} />;
}

export interface CardFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <View className={cn("flex-row items-center pt-4", className)} {...props} />;
}
