import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  FlatList,
  SectionList,
  Modal,
  ScrollView,
} from "react-native";
import { cn } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

export interface ComboboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  multiple?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  groups?: ComboboxGroup[];
  renderItem?: (option: ComboboxOption, selected: boolean) => React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  autoHighlight?: boolean;
  mode?: "select" | "popup";
  triggerClassName?: string;
}

// Inline chip for multi-select display
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <View className="flex-row items-center rounded-full bg-secondary ps-2.5 pe-1 py-0.5 me-1.5 mb-1">
      <Text className="text-xs text-secondary-foreground me-1">{label}</Text>
      <Pressable
        onPress={onRemove}
        className="rounded-full p-0.5"
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${label}`}
      >
        <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2.5}>
          <Path d="M18 6 6 18M6 6l12 12" />
        </Svg>
      </Pressable>
    </View>
  );
}

export function Combobox({
  className,
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  multiple = false,
  selectedValues = [],
  onSelectedValuesChange,
  groups,
  renderItem: renderItemProp,
  invalid = false,
  disabled = false,
  clearable = false,
  autoHighlight = false,
  mode = "select",
  triggerClassName,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allOptions = useMemo(
    () => (groups ? groups.flatMap((g) => g.options) : options),
    [groups, options]
  );

  const selected = allOptions.find((o) => o.value === value);

  const isSelected = useCallback(
    (val: string) => (multiple ? selectedValues.includes(val) : val === value),
    [multiple, selectedValues, value]
  );

  // Filter logic
  const filterFn = (opts: ComboboxOption[]) =>
    opts.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  const filteredOptions = useMemo(() => filterFn(allOptions), [allOptions, search]);

  const filteredSections = useMemo(() => {
    if (!groups) return [];
    return groups
      .map((g) => ({ title: g.label, data: filterFn(g.options) }))
      .filter((s) => s.data.length > 0);
  }, [groups, search]);

  const handleSelect = (val: string) => {
    if (multiple) {
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      onSelectedValuesChange?.(next);
    } else {
      onValueChange?.(val);
      setOpen(false);
    }
    setSearch("");
  };

  const handleClear = () => {
    if (multiple) {
      onSelectedValuesChange?.([]);
    } else {
      onValueChange?.("");
    }
  };

  const hasValue = multiple ? selectedValues.length > 0 : !!value;

  // Trigger display
  const triggerLabel = multiple
    ? selectedValues.length > 0
      ? `${selectedValues.length} selected`
      : placeholder
    : selected?.label ?? placeholder;

  const renderOption = (item: ComboboxOption) => {
    const sel = isSelected(item.value);
    if (renderItemProp) {
      return (
        <Pressable
          key={item.value}
          onPress={() => !item.disabled && handleSelect(item.value)}
          disabled={item.disabled}
          className={cn(item.disabled && "opacity-40")}
        >
          {renderItemProp(item, sel)}
        </Pressable>
      );
    }
    return (
      <Pressable
        className={cn(
          "ps-5 pe-5 py-3",
          sel && "bg-accent",
          item.disabled && "opacity-40",
          autoHighlight && filteredOptions[0]?.value === item.value && !sel && "bg-accent/50"
        )}
        onPress={() => !item.disabled && handleSelect(item.value)}
        disabled={item.disabled}
        accessibilityRole="button"
        accessibilityState={{ selected: sel }}
      >
        <Text className="text-foreground">{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View className={cn("", className)} {...props}>
      {/* Trigger */}
      <Pressable
        className={cn(
          "flex-row items-center justify-between min-h-12 px-4 rounded-md border bg-background",
          invalid ? "border-destructive" : "border-input",
          disabled && "opacity-50",
          mode === "popup" && "bg-secondary",
          triggerClassName
        )}
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={selected ? `Selected: ${selected.label}` : placeholder}
        accessibilityState={{ disabled }}
      >
        <Text
          className={cn(
            "text-base flex-1",
            hasValue ? "text-foreground" : "text-muted-foreground",
            invalid && "text-destructive"
          )}
          numberOfLines={1}
        >
          {triggerLabel}
        </Text>
        <View className="flex-row items-center">
          {clearable && hasValue && (
            <Pressable
              onPress={(e) => { e.stopPropagation(); handleClear(); }}
              className="p-1 me-1"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
            >
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2}>
                <Path d="M18 6 6 18M6 6l12 12" />
              </Svg>
            </Pressable>
          )}
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="m6 9 6 6 6-6" />
          </Svg>
        </View>
      </Pressable>

      {/* Multi-select chips */}
      {multiple && selectedValues.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
          <View className="flex-row flex-wrap">
            {selectedValues.map((val) => {
              const opt = allOptions.find((o) => o.value === val);
              return opt ? (
                <Chip
                  key={val}
                  label={opt.label}
                  onRemove={() => {
                    onSelectedValuesChange?.(selectedValues.filter((v) => v !== val));
                  }}
                />
              ) : null;
            })}
          </View>
        </ScrollView>
      )}

      {/* Modal */}
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
                placeholderTextColor="#71717a"
                value={search}
                onChangeText={setSearch}
                autoFocus
                accessibilityLabel="Search options"
              />
            </View>
            {groups ? (
              <SectionList
                sections={filteredSections}
                keyExtractor={(item) => item.value}
                renderSectionHeader={({ section }) => (
                  <View className="px-5 py-2 bg-card">
                    <Text className="text-xs font-semibold text-muted-foreground uppercase">
                      {section.title}
                    </Text>
                  </View>
                )}
                renderItem={({ item }) => renderOption(item)}
                ListEmptyComponent={
                  <Text className="text-muted-foreground text-center py-4">{emptyText}</Text>
                }
              />
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                ListEmptyComponent={
                  <Text className="text-muted-foreground text-center py-4">{emptyText}</Text>
                }
                renderItem={({ item }) => renderOption(item)}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
