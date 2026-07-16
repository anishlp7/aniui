import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, SectionList, useColorScheme, useWindowDimensions, Keyboard, Platform } from "react-native";
import * as DialogPrimitive from "@rn-primitives/dialog";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { Search } from "lucide-react-native";
import { cn } from "@/lib/utils";

export interface CommandItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandMenuProps extends React.ComponentPropsWithoutRef<typeof View> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

// Anchored below the status bar; the palette grows down and the results list
// scrolls within whatever space is left above the keyboard.
const TOP_OFFSET = 96;

export function CommandMenu({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search...",
  emptyText = "No results found.",
  onSelect,
  className,
  ...props
}: CommandMenuProps) {
  const [search, setSearch] = useState("");
  const dark = useColorScheme() === "dark";
  const { height: winH } = useWindowDimensions();
  const inputRef = useRef<TextInput>(null);
  const kb = useSharedValue(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q) ||
        (item.group ?? "").toLowerCase().includes(q)
    );
  }, [items, search]);

  const sections = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      const key = item.group ?? "";
      (groups[key] ??= []).push(item);
    }
    return Object.entries(groups).map(([title, data]) => ({ title, data }));
  }, [filtered]);

  // Track the keyboard directly. RN Modal doesn't resize for the keyboard on
  // Android, so the old version's results got covered — rendering via the rn-
  // primitives Portal plus this listener keeps the palette above the keyboard.
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const show = Keyboard.addListener(showEvt, (e) => {
      kb.value = withTiming(e.endCoordinates.height, { duration: 160 });
    });
    const hide = Keyboard.addListener(hideEvt, () => {
      kb.value = withTiming(0, { duration: 160 });
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [kb]);

  // Focus via ref on open (autoFocus is unreliable inside overlays on Android).
  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), Platform.OS === "android" ? 150 : 50);
    return () => clearTimeout(t);
  }, [open]);

  const cardStyle = useAnimatedStyle(() => ({
    maxHeight: Math.max(180, winH - TOP_OFFSET - kb.value - 24),
  }));

  const handleSelect = (item: CommandItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    onSelect?.(item.value);
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay closeOnPress className="absolute inset-0 bg-black/50" />
        <DialogPrimitive.Content style={{ position: "absolute", top: TOP_OFFSET, left: 16, right: 16 }}>
          <DialogPrimitive.Title style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}>
            Command menu
          </DialogPrimitive.Title>
          <Animated.View
            entering={entering.fadeInDown}
            exiting={exiting.fadeOutUp}
            style={cardStyle}
            className={cn("rounded-xl border border-border bg-card shadow-lg overflow-hidden", className)}
            {...props}
          >
            <View className="flex-row items-center px-4 border-b border-border">
              <Search size={16} color="#71717a" strokeWidth={2} />
              <TextInput
                ref={inputRef}
                className="flex-1 min-h-12 ps-3 text-base text-foreground"
                placeholder={placeholder}
                placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
                value={search}
                onChangeText={setSearch}
                accessibilityLabel="Command search"
              />
            </View>
            {filtered.length === 0 ? (
              <View className="py-8 items-center">
                <Text className="text-sm text-muted-foreground">{emptyText}</Text>
              </View>
            ) : (
              <SectionList
                sections={sections}
                keyExtractor={(item) => item.value}
                style={{ flexShrink: 1 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                renderSectionHeader={({ section }) =>
                  section.title ? (
                    <View className="px-4 pt-3 pb-1.5 bg-card">
                      <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</Text>
                    </View>
                  ) : null
                }
                renderItem={({ item }) => (
                  <Pressable
                    className={cn("flex-row items-center px-4 py-2.5 gap-3", item.disabled && "opacity-40")}
                    onPress={() => handleSelect(item)}
                    disabled={item.disabled}
                    accessibilityRole="button"
                    accessibilityState={{ disabled: item.disabled }}
                  >
                    {item.icon && <View className="w-5 items-center">{item.icon}</View>}
                    <Text className="flex-1 text-sm text-foreground">{item.label}</Text>
                    {item.shortcut && (
                      <View className="flex-row items-center gap-0.5">
                        {item.shortcut.split("+").map((key, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <Text className="text-[10px] text-muted-foreground">+</Text>}
                            <View className="items-center justify-center rounded border border-border bg-muted px-1.5 min-h-5">
                              <Text className="text-[10px] font-mono text-muted-foreground">{key.trim()}</Text>
                            </View>
                          </React.Fragment>
                        ))}
                      </View>
                    )}
                  </Pressable>
                )}
                stickySectionHeadersEnabled={false}
              />
            )}
          </Animated.View>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Convenience sub-components for composition pattern
export interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export function CommandInput({ className, ...props }: CommandInputProps) {
  const dark = useColorScheme() === "dark";
  return (
    <TextInput
      className={cn("min-h-12 px-4 text-base text-foreground border-b border-border", className)}
      placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
      {...props}
    />
  );
}

export function CommandEmpty({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <View className={cn("py-8 items-center", className)}>
      <Text className="text-sm text-muted-foreground">{children ?? "No results found."}</Text>
    </View>
  );
}

export function CommandSeparator({ className }: { className?: string }) {
  return <View className={cn("h-px bg-border", className)} />;
}
