import React, { useState, useMemo } from "react";
import { View, TextInput, Pressable, Text, FlatList, Modal } from "react-native";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function Combobox({
  className,
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())),
    [options, search]
  );

  return (
    <View className={cn("", className)} {...props}>
      <Pressable
        className="flex-row items-center justify-between min-h-12 px-4 rounded-md border border-input bg-background"
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={selected ? `Selected: ${selected.label}` : placeholder}
      >
        <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
          {selected?.label ?? placeholder}
        </Text>
        <Text className="text-muted-foreground text-xs">▼</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setOpen(false)}>
          <Pressable className="bg-card rounded-t-2xl max-h-96 pb-8" onPress={() => {}}>
            <View className="items-center py-3">
              <View className="w-10 h-1 rounded-full bg-muted" />
            </View>
            <View className="px-4 pb-3">
              <TextInput
                className="min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-base"
                placeholder={searchPlaceholder}
                placeholderTextColor="hsl(var(--muted-foreground))"
                value={search}
                onChangeText={setSearch}
                autoFocus
                accessibilityLabel="Search options"
              />
            </View>
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              ListEmptyComponent={
                <Text className="text-muted-foreground text-center py-4">{emptyText}</Text>
              }
              renderItem={({ item }) => (
                <Pressable
                  className={cn("px-5 py-3", item.value === value && "bg-accent")}
                  onPress={() => { onValueChange?.(item.value); setOpen(false); setSearch(""); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: item.value === value }}
                >
                  <Text className="text-foreground">{item.label}</Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
