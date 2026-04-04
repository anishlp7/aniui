import React, { createContext, useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const itemVariants = cva(
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

type GroupCtx = { value: string; onValueChange: (v: string) => void };
const Ctx = createContext<GroupCtx>({ value: "", onValueChange: () => {} });

export interface ToggleGroupProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof itemVariants> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function ToggleGroup({ value, onValueChange, variant, size, className, children, ...props }: ToggleGroupProps) {
  return (
    <Ctx.Provider value={{ value, onValueChange }}>
      <View className={cn("flex-row gap-1", className)} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </Ctx.Provider>
  );
}

export interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}

export function ToggleGroupItem({ value, className, children, ...props }: ToggleGroupItemProps) {
  const { value: selected, onValueChange } = useContext(Ctx);
  const active = selected === value;
  return (
    <Pressable
      className={cn(itemVariants({ variant: "default", size: "md" }), active && "bg-zinc-100 dark:bg-zinc-800", className)}
      onPress={() => onValueChange(value)}
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      accessible={true}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", active ? "text-accent-zinc-950 dark:accent-zinc-50" : "text-zinc-500 dark:text-zinc-400")}>
          {children}
        </Text>
      ) : children}
    </Pressable>
  );
}
