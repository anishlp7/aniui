import React, { useState } from "react";
import { View, Pressable, Text, Modal, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from "react-native-reanimated";

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
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(value ?? "");
  const selected = value ?? internal;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;
  const isPlaceholder = !selected;

  const pick = (val: string) => {
    setInternal(val);
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 48,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: "#e4e4e7",
          borderRadius: 8,
          backgroundColor: "#ffffff",
        }}
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
      >
        <Text style={{ fontSize: 16, color: isPlaceholder ? "#a1a1aa" : "#09090b" }}>{selectedLabel}</Text>
        <Text style={{ fontSize: 12, color: "#a1a1aa" }}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="none" onRequestClose={() => setOpen(false)}>
        {/* Backdrop */}
        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}>
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} />
        </Pressable>

        {/* Sheet */}
        <Animated.View
          entering={SlideInUp.duration(300)}
          exiting={SlideOutDown.duration(200)}
          style={{ backgroundColor: "#ffffff", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 34 }}
        >
          {/* Handle */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: "#d4d4d8" }} />
          </View>

          {/* Title + Done */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#09090b" }}>{label ?? placeholder}</Text>
            <Pressable onPress={() => setOpen(false)} accessible={true} accessibilityRole="button" accessibilityLabel="Done">
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#3b82f6" }}>Done</Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: "#f4f4f5" }} />

          {/* Options */}
          <ScrollView bounces={false} style={{ maxHeight: 320 }}>
            {options.map((o) => {
              const isSelected = o.value === selected;
              return (
                <Pressable
                  key={o.value}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: isSelected ? "#f4f4f5" : "transparent",
                  }}
                  onPress={() => pick(o.value)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text style={{ flex: 1, fontSize: 16, color: "#09090b", fontWeight: isSelected ? "600" : "400" }}>{o.label}</Text>
                  {isSelected && <Text style={{ fontSize: 16, color: "#3b82f6", fontWeight: "700" }}>✓</Text>}
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>
      </Modal>
    </>
  );
}
