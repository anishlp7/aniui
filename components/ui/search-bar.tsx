import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchBarVariants = cva(
  "flex-row items-center rounded-lg bg-muted px-3 min-h-12",
  {
    variants: {
      size: {
        sm: "min-h-10 px-2.5",
        md: "min-h-12 px-3",
        lg: "min-h-14 px-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface SearchBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "placeholderTextColor">,
    VariantProps<typeof searchBarVariants> {
  className?: string;
  onClear?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
}

export function SearchBar({ size, className, value, onClear, showCancel, onCancel, ...props }: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2">
      <View className={cn(searchBarVariants({ size }), className)}>
        <Text className="text-muted-foreground mr-2 text-base">⌕</Text>
        <TextInput
          className="flex-1 text-base text-foreground p-0"
          placeholderTextColor="hsl(240,3.8%,46.1%)"
          placeholder="Search..."
          value={value}
          accessibilityRole="search"
          {...props}
        />
        {value ? (
          <Pressable onPress={onClear} className="ml-1 h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/20" accessible={true} accessibilityRole="button" accessibilityLabel="Clear search">
            <Text className="text-xs text-muted-foreground">✕</Text>
          </Pressable>
        ) : null}
      </View>
      {showCancel && (
        <Pressable onPress={onCancel} accessible={true} accessibilityRole="button">
          <Text className="text-base text-primary">Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}
