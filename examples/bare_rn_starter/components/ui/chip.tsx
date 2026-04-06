import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "flex-row items-center rounded-full min-h-8",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-input bg-transparent",
        destructive: "bg-destructive",
      },
      size: {
        sm: "px-2.5 py-1 gap-1",
        md: "px-3 py-1.5 gap-1.5",
        lg: "px-4 py-2 gap-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

const chipTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ChipProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof chipVariants> {
  className?: string;
  textClassName?: string;
  children: string;
  selected?: boolean;
  onClose?: () => void;
}

export function Chip({ variant, size, className, textClassName, children, selected, onClose, ...props }: ChipProps) {
  const v = selected ? "default" : (variant ?? "outline");
  return (
    <Pressable className={cn(chipVariants({ variant: v, size }), className)} accessible={true} accessibilityRole="button" accessibilityState={{ selected }} {...props}>
      <Text className={cn(chipTextVariants({ variant: v, size }), textClassName)}>{children}</Text>
      {onClose && (
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={`Remove ${children}`} className="ml-0.5">
          <Text className={cn("text-xs", v === "outline" ? "text-muted-foreground" : chipTextVariants({ variant: v, size: "sm" }))}>✕</Text>
        </Pressable>
      )}
    </Pressable>
  );
}
