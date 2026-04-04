import React, { useState, useMemo } from "react";
import { View, TextInput, Pressable, Text, FlatList, Modal } from "react-native";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/ui/icons";

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
        className="flex-row items-center justify-between min-h-12 px-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={selected ? `Selected: ${selected.label}` : placeholder}
      >
        <Text className={cn("text-base", selected ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400")}>
          {selected?.label ?? placeholder}
        </Text>
        <ChevronDownIcon size={16} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setOpen(false)}>
          <Pressable className="bg-white dark:bg-zinc-950 rounded-t-2xl max-h-96 pb-8" onPress={() => {}}>
            <View className="items-center py-3">
              <View className="w-10 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            </View>
            <View className="px-4 pb-3">
              <TextInput
                className="min-h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 text-base"
                placeholder={searchPlaceholder}
                placeholderTextColor="#71717a"
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
                <Text className="text-zinc-500 dark:text-zinc-400 text-center py-4">{emptyText}</Text>
              }
              renderItem={({ item }) => (
                <Pressable
                  className={cn("px-5 py-3", item.value === value && "bg-zinc-100 dark:bg-zinc-800")}
                  onPress={() => { onValueChange?.(item.value); setOpen(false); setSearch(""); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: item.value === value }}
                >
                  <Text className="text-zinc-950 dark:text-zinc-50">{item.label}</Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
