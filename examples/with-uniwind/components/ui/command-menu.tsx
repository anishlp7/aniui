import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Pressable, Modal, SectionList } from "react-native";
import { cn } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

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

  const handleSelect = (item: CommandItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    onSelect?.(item.value);
    onOpenChange(false);
    setSearch("");
  };

  const close = () => {
    onOpenChange(false);
    setSearch("");
  };

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <Pressable className="flex-1 bg-black/50 justify-start pt-24" onPress={close}>
        <Pressable
          className={cn("mx-4 rounded-xl border border-border bg-card shadow-lg overflow-hidden max-h-[70%]", className)}
          onPress={() => {}}
          {...props}
        >
          {/* Search Input */}
          <View className="flex-row items-center px-4 border-b border-border">
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5Z" />
              <Path d="m16 16 4.5 4.5" />
            </Svg>
            <TextInput
              className="flex-1 min-h-12 ps-3 text-base text-foreground"
              placeholder={placeholder}
              placeholderTextColor="#71717a"
              value={search}
              onChangeText={setSearch}
              autoFocus
              accessibilityLabel="Command search"
            />
          </View>
          {/* Results */}
          {filtered.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-sm text-muted-foreground">{emptyText}</Text>
            </View>
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.value}
              renderSectionHeader={({ section }) =>
                section.title ? (
                  <View className="px-4 pt-3 pb-1.5 bg-card">
                    <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </Text>
                  </View>
                ) : null
              }
              renderItem={({ item }) => (
                <Pressable
                  className={cn(
                    "flex-row items-center px-4 py-2.5 gap-3",
                    item.disabled && "opacity-40"
                  )}
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// Convenience sub-components for composition pattern
export interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <TextInput
      className={cn("min-h-12 px-4 text-base text-foreground border-b border-border", className)}
      placeholderTextColor="#71717a"
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
