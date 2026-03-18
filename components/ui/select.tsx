import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { View, Pressable, Text } from "react-native";
import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export interface SelectOption { label: string; value: string }

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<GorhomBottomSheet, SelectProps>(
  ({ className, placeholder = "Select...", options, value, onValueChange }, ref) => {
    const [internal, setInternal] = useState(value ?? "");
    const selected = value ?? internal;
    const label = options.find((o) => o.value === selected)?.label ?? placeholder;
    const sheetRef = useRef<GorhomBottomSheet>(null);
    useImperativeHandle(ref, () => sheetRef.current as GorhomBottomSheet);

    const backdrop = useCallback((p: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop {...p} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ), []);

    const pick = (val: string) => { setInternal(val); onValueChange?.(val); sheetRef.current?.close(); };

    return (
      <>
        <Pressable className={cn("flex-row items-center justify-between rounded-md border border-input bg-background px-4 min-h-12", className)} onPress={() => sheetRef.current?.expand()} accessible={true} accessibilityRole="button">
          <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>{label}</Text>
          <Text className="text-muted-foreground">▾</Text>
        </Pressable>
        <GorhomBottomSheet ref={sheetRef} index={-1} enableDynamicSizing enablePanDownToClose backdropComponent={backdrop} backgroundStyle={{ backgroundColor: "hsl(0,0%,100%)" }} handleIndicatorStyle={{ backgroundColor: "hsl(240,3.8%,46.1%)" }}>
          <BottomSheetView>
            <View className="pb-8">
              {options.map((o) => (
                <Pressable key={o.value} className={cn("flex-row items-center px-4 py-3 min-h-12", o.value === selected && "bg-accent")} onPress={() => pick(o.value)} accessible={true} accessibilityRole="button">
                  <Text className={cn("text-base flex-1", o.value === selected ? "text-accent-foreground font-medium" : "text-foreground")}>{o.label}</Text>
                  {o.value === selected && <Text className="text-primary">✓</Text>}
                </Pressable>
              ))}
            </View>
          </BottomSheetView>
        </GorhomBottomSheet>
      </>
    );
  }
);

Select.displayName = "Select";
