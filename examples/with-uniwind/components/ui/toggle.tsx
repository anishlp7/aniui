import React from "react";
import { Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "items-center justify-center rounded-md min-h-12 min-w-12",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent",
      },
      size: {
        sm: "px-2 py-1.5",
        md: "px-3 py-2",
        lg: "px-4 py-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof toggleVariants> {
  className?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
}

export function Toggle({
  pressed = false, onPressedChange, variant, size, className, children, ...props
}: ToggleProps) {
  return (
    <Pressable
      className={cn(
        toggleVariants({ variant, size }),
        pressed && "bg-zinc-100 dark:bg-zinc-800",
        className
      )}
      onPress={() => onPressedChange?.(!pressed)}
      accessibilityRole="button"
      accessibilityState={{ selected: pressed }}
      accessible={true}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", pressed ? "text-accent-zinc-950 dark:accent-zinc-50" : "text-zinc-500 dark:text-zinc-400")}>
          {children}
        </Text>
      ) : children}
    </Pressable>
  );
}
