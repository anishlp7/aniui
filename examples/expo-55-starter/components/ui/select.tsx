import React, { useState, useRef } from "react";
import { View, Text, Pressable, TextInput, Modal, ScrollView, Dimensions, LayoutChangeEvent } from "react-native";
import { cn } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

export interface SelectOption { label: string; value: string }

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function Select({
  className, placeholder = "Select...", options, value,
  onValueChange, label, searchable = false, searchPlaceholder = "Search...",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const triggerRef = useRef<View>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const selected = options.find((o) => o.value === value);
  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleOpen = () => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setPos({ x: pageX, y: pageY, w: width, h: height });
      setOpen(true);
    });
  };

  const close = () => { setOpen(false); setSearch(""); };
  const pick = (val: string) => { onValueChange?.(val); close(); };

  const screenH = Dimensions.get("window").height;
  const belowY = pos.y + pos.h + 4;
  const listH = Math.min(options.length * 48, 264);
  const totalH = listH + (searchable ? 60 : 0);
  const fitsBelow = belowY + totalH < screenH - 20;

  return (
    <View>
      <Pressable
        ref={triggerRef}
        className={cn("flex-row items-center justify-between h-12 px-4 border border-input rounded-lg bg-background active:bg-accent/30", className)}
        onPress={handleOpen}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
      >
        <Text className={cn("text-base flex-1", selected ? "text-foreground" : "text-muted-foreground")} numberOfLines={1}>
          {selected?.label ?? placeholder}
        </Text>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="m6 9 6 6 6-6" />
    </Svg>
      </Pressable>

      <Modal visible={open} transparent animationType="none" onRequestClose={close}>
        {/* Backdrop */}
        <Pressable style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} onPress={close} />

        {/* Dropdown */}
        <View
          style={{
            position: "absolute",
            left: pos.x,
            width: pos.w,
            ...(fitsBelow
              ? { top: belowY }
              : { bottom: screenH - pos.y + 4 }),
          }}
          className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {searchable && (
            <View className="px-3 pt-3 pb-2">
              <TextInput
                className="h-11 px-4 rounded-lg border border-input bg-background text-foreground text-base"
                placeholder={searchPlaceholder}
                placeholderTextColor="#71717a"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            </View>
          )}

          <ScrollView style={{ height: listH }} bounces={false} keyboardShouldPersistTaps="handled">
            {filtered.map((o) => {
              const isSelected = o.value === value;
              return (
                <Pressable
                  key={o.value}
                  className={cn("flex-row items-center h-12 px-4 active:bg-accent/50", isSelected && "bg-accent")}
                  onPress={() => pick(o.value)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text className={cn("flex-1 text-base text-foreground", isSelected && "font-semibold")} numberOfLines={1}>{o.label}</Text>
                  {isSelected && <Text className="text-base text-primary font-bold">✓</Text>}
                </Pressable>
              );
            })}
            {filtered.length === 0 && (
              <View className="h-12 items-center justify-center">
                <Text className="text-sm text-muted-foreground">No results</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}