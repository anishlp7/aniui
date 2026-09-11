import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { ArrowLeft } from "lucide-react-native";

const headerVariants = cva("flex-row items-center min-h-14 px-4", {
  variants: {
    variant: {
      default: "bg-background border-b border-border",
      transparent: "bg-transparent",
      primary: "bg-primary",
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
  return <View className={cn("flex-row items-center me-3", className)} {...props}>{children}</View>;
}

export interface HeaderTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function HeaderTitle({ className, ...props }: HeaderTitleProps) {
  return (
    <Text
      className={cn("flex-1 text-lg font-semibold text-foreground", className)}
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
  return <View className={cn("flex-row items-center ms-3 gap-2", className)} {...props}>{children}</View>;
}

export interface HeaderBackButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  label?: React.ReactNode;
  onPress: () => void;
}

export function HeaderBackButton({ className, label, onPress, ...props }: HeaderBackButtonProps) {
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className={cn("min-h-12 min-w-12 flex-row items-center justify-center", className)}
      {...props}
    >
      {label === undefined ? (
        <ArrowLeft size={24} color={colors.mutedForeground} />
      ) : typeof label === "string" || typeof label === "number" ? (
        <Text className="text-primary text-lg">{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}
