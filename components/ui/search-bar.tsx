import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "@/components/ui/icons";

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

const iconSizes = { sm: 14, md: 16, lg: 20 } as const;

export interface SearchBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "placeholderTextColor">,
    VariantProps<typeof searchBarVariants> {
  className?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
}

export function SearchBar({ size = "md", className, value, icon, onClear, showCancel, onCancel, ...props }: SearchBarProps) {
  const iconSize = iconSizes[size ?? "md"];

  return (
    <View className="flex-row items-center gap-2">
      <View className={cn(searchBarVariants({ size }), className)}>
        <View className="mr-2">
          {icon ?? <SearchIcon size={iconSize}  />}
        </View>
        <TextInput
          className="flex-1 text-base text-foreground p-0"
          placeholderTextColor="#71717a"
          placeholder="Search..."
          value={value}
          accessibilityRole="search"
          {...props}
        />
        {value ? (
          <Pressable onPress={() => { onClear?.(); props.onChangeText?.(""); }} className="ml-1 h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/20" accessible={true} accessibilityRole="button" accessibilityLabel="Clear search">
            <XIcon size={12} />
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
