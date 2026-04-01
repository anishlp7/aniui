import React, { useRef, useState, useCallback } from "react";
import { View, Pressable, Text, ScrollView } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";

export interface SelectOption { label: string; value: string }

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

export function Select({ placeholder = "Select...", options, value, onValueChange, label }: SelectProps) {
  const ref = useRef<BottomSheetModal>(null);
  const [internal, setInternal] = useState(value ?? "");
  const selected = value ?? internal;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;
  const isPlaceholder = !selected;

  const pick = (val: string) => {
    setInternal(val);
    onValueChange?.(val);
    ref.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ), []
  );

  return (
    <>
      <Pressable
        style={{
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          height: 48, paddingHorizontal: 16, borderWidth: 1,
          borderColor: "#e4e4e7", borderRadius: 8, backgroundColor: "#ffffff",
        }}
        onPress={() => ref.current?.present()}
        accessible={true} accessibilityRole="button" accessibilityLabel={label ?? placeholder}
      >
        <Text style={{ fontSize: 16, color: isPlaceholder ? "#a1a1aa" : "#09090b" }}>{selectedLabel}</Text>
        <Text style={{ fontSize: 12, color: "#a1a1aa" }}>▾</Text>
      </Pressable>

      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: "#d4d4d8" }}
      >
        <BottomSheetView>
          <View style={{ paddingBottom: 34 }}>
            {/* Title + Done */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#09090b" }}>{label ?? placeholder}</Text>
              <Pressable onPress={() => ref.current?.dismiss()} accessible={true} accessibilityRole="button" accessibilityLabel="Done">
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#3b82f6" }}>Done</Text>
              </Pressable>
            </View>

            <View style={{ height: 1, backgroundColor: "#f4f4f5" }} />

            {/* Options */}
            <ScrollView bounces={false} style={{ maxHeight: 320 }}>
              {options.map((o) => {
                const isSelected = o.value === selected;
                return (
                  <Pressable key={o.value} style={{
                    flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14,
                    backgroundColor: isSelected ? "#f4f4f5" : "transparent",
                  }} onPress={() => pick(o.value)} accessible={true} accessibilityRole="button" accessibilityState={{ selected: isSelected }}>
                    <Text style={{ flex: 1, fontSize: 16, color: "#09090b", fontWeight: isSelected ? "600" : "400" }}>{o.label}</Text>
                    {isSelected && <Text style={{ fontSize: 16, color: "#3b82f6", fontWeight: "700" }}>✓</Text>}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
