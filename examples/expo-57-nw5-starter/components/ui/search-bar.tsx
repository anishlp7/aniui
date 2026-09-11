import React from "react";
import { View, TextInput, Pressable, Text, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { Search, X } from "lucide-react-native";

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

export const SearchBar = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  SearchBarProps
>(function SearchBar(
  { size = "md", className, value, icon, onClear, showCancel, onCancel, ...props },
  ref
) {
  const iconSize = iconSizes[size ?? "md"];
  const dark = useColorScheme() === "dark";
  const colors = useThemeColors();
  const caret = colors.foreground;

  return (
    <View className="flex-row items-center gap-2">
      <View className={cn(searchBarVariants({ size }), className)}>
        <View className="me-2">
          {icon ?? <Search size={iconSize} color={colors.mutedForeground} />}
        </View>
        <TextInput
          ref={ref}
          className="flex-1 text-base text-foreground p-0"
          placeholderTextColor={colors.mutedForeground}
          keyboardAppearance={dark ? "dark" : "light"}
          selectionColor={caret}
          cursorColor={caret}
          placeholder="Search..."
          value={value}
          accessibilityRole="search"
          {...props}
        />
        {value ? (
          <Pressable onPress={() => { onClear?.(); props.onChangeText?.(""); }} className="ms-1 h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/20" accessible={true} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <X size={14} color={colors.mutedForeground} />
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
});
