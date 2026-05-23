import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "items-center justify-center rounded-md border border-border bg-muted",
  {
    variants: {
      size: {
        sm: "min-h-5 px-1",
        md: "min-h-6 px-1.5",
        lg: "min-h-7 px-2",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const kbdTextVariants = cva("font-mono text-muted-foreground", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
});

export interface KbdProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof kbdVariants> {
  className?: string;
  textClassName?: string;
  children: string;
}

export function Kbd({ size, className, textClassName, children, ...props }: KbdProps) {
  return (
    <View className={cn(kbdVariants({ size }), className)} {...props}>
      <Text className={cn(kbdTextVariants({ size }), textClassName)}>{children}</Text>
    </View>
  );
}

export interface KbdGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  separator?: string;
  children: React.ReactNode;
}

export function KbdGroup({ className, separator = "+", children, ...props }: KbdGroupProps) {
  const items = React.Children.toArray(children);

  return (
    <View className={cn("flex-row items-center gap-1", className)} {...props}>
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {child}
          {i < items.length - 1 && (
            <Text className="text-xs text-muted-foreground">{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
