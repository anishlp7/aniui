import React, { useState } from "react";
import { View, TextInput, Pressable, Text, ScrollView, Keyboard, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react-native";
import { useThemeColors } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

// Matches input.tsx's size scale so Input, SearchBar, and AutoComplete read as one family.
const autoCompleteVariants = cva("flex-row items-center rounded-md border py-2", {
  variants: {
    variant: {
      default: "border-input bg-background",
      ghost: "border-transparent bg-transparent",
    },
    size: {
      sm: "min-h-9 px-3",
      md: "min-h-12 px-4",
      lg: "min-h-14 px-5",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

const fontSizes = { sm: 14, md: 16, lg: 18 } as const;

export interface AutoCompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface AutoCompleteProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "value" | "onChangeText">,
    VariantProps<typeof autoCompleteVariants> {
  className?: string;
  options: AutoCompleteOption[];
  value?: string;
  onChangeText?: (text: string) => void;
  onSelect?: (option: AutoCompleteOption) => void;
  filterFn?: (option: AutoCompleteOption, query: string) => boolean;
  minCharsToTrigger?: number;
  loading?: boolean;
  emptyText?: string;
  maxVisibleOptions?: number;
}

const defaultFilter = (option: AutoCompleteOption, query: string) =>
  option.label.toLowerCase().includes(query.toLowerCase());

// Suggestions render as a normal View below the input, not position: "absolute" —
// RN has no reliable viewport-relative overlay without a portal, so this pushes
// sibling content down instead; keep AutoComplete out of tight-height rows.
export function AutoComplete({
  variant, size = "md", className, options, value, onChangeText, onSelect,
  filterFn = defaultFilter, minCharsToTrigger = 1, loading, emptyText = "No results",
  maxVisibleOptions = 5, style, ...props
}: AutoCompleteProps) {
  const [internal, setInternal] = useState("");
  const [open, setOpen] = useState(false);
  const dark = useColorScheme() === "dark";
  const colors = useThemeColors();
  const caret = colors.foreground;
  const resolvedSize = size ?? "md";
  const text = value ?? internal;

  const setText = (t: string) => {
    if (value === undefined) setInternal(t);
    onChangeText?.(t);
    setOpen(t.length >= minCharsToTrigger);
  };

  const handleSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    onSelect?.(option);
    if (value === undefined) setInternal(option.label);
    setOpen(false);
    Keyboard.dismiss();
  };

  const showDropdown = open && text.length >= minCharsToTrigger;
  const filtered = showDropdown ? options.filter((o) => filterFn(o, text)) : [];

  return (
    <View>
      <View className={cn(autoCompleteVariants({ variant, size }), className)}>
        <TextInput
          value={text}
          onChangeText={setText}
          onFocus={() => setOpen(text.length >= minCharsToTrigger)}
          className="flex-1 self-stretch p-0 text-foreground placeholder:text-muted-foreground"
          style={[{ fontSize: fontSizes[resolvedSize] }, style]}
          textAlignVertical="center"
          placeholderTextColor={colors.mutedForeground}
          keyboardAppearance={dark ? "dark" : "light"}
          selectionColor={caret}
          cursorColor={caret}
          {...props}
        />
        {!!text && (
          <Pressable
            onPress={() => { setText(""); setOpen(false); }}
            className="ms-2 min-h-8 min-w-8 items-center justify-center"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Clear"
          >
            <X size={16} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>
      {showDropdown && (
        <View className="mt-1 rounded-md border border-border bg-card shadow-lg overflow-hidden">
          <ScrollView
            style={{ maxHeight: maxVisibleOptions * 48 }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {loading ? (
              <View className="h-12 items-center justify-center"><Text className="text-sm text-muted-foreground">Loading…</Text></View>
            ) : filtered.length === 0 ? (
              <View className="h-12 items-center justify-center"><Text className="text-sm text-muted-foreground">{emptyText}</Text></View>
            ) : (
              filtered.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={cn("min-h-12 min-w-12 justify-center px-4", option.disabled && "opacity-40")}
                  accessible
                  accessibilityRole="button"
                  accessibilityState={{ disabled: option.disabled }}
                >
                  <Text className="text-base text-foreground" numberOfLines={1}>{option.label}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
