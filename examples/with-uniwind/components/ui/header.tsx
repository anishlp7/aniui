import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerVariants = cva("flex-row items-center min-h-14 px-4", {
  variants: {
    variant: {
      default: "bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800",
      transparent: "bg-transparent",
      primary: "bg-zinc-900 dark:bg-zinc-50",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface HeaderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof headerVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Header({ variant, className, children, ...props }: HeaderProps) {
  return (
    <View className={cn(headerVariants({ variant }), className)} {...props}>
      {children}
    </View>
  );
}

export interface HeaderLeftProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function HeaderLeft({ className, children, ...props }: HeaderLeftProps) {
  return <View className={cn("flex-row items-center mr-3", className)} {...props}>{children}</View>;
}

export interface HeaderTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function HeaderTitle({ className, ...props }: HeaderTitleProps) {
  return (
    <Text
      className={cn("flex-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50", className)}
      numberOfLines={1}
      {...props}
    />
  );
}

export interface HeaderRightProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function HeaderRight({ className, children, ...props }: HeaderRightProps) {
  return <View className={cn("flex-row items-center ml-3 gap-2", className)} {...props}>{children}</View>;
}

export interface HeaderBackButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  label?: string;
  onPress: () => void;
}

export function HeaderBackButton({ className, label = "←", onPress, ...props }: HeaderBackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
      {...props}
    >
      <Text className="text-zinc-900 dark:text-zinc-50 text-lg">{label}</Text>
    </Pressable>
  );
}
