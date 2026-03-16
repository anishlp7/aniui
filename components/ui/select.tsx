import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { View, Pressable, Text } from "react-native";
import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<GorhomBottomSheet, SelectProps>(
  ({ className, placeholder = "Select...", options, value, onValueChange }, ref) => {
    const [internalValue, setInternalValue] = useState(value ?? "");
    const selected = value ?? internalValue;
    const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;
    const sheetRef = useRef<GorhomBottomSheet>(null);

    useImperativeHandle(ref, () => sheetRef.current as GorhomBottomSheet);

    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    const handleSelect = (val: string) => {
      setInternalValue(val);
      onValueChange?.(val);
      sheetRef.current?.close();
    };

    return (
      <>
        <Pressable
          className={cn("flex-row items-center justify-between rounded-md border border-input bg-background px-4 min-h-12", className)}
          onPress={() => sheetRef.current?.expand()}
          accessible={true}
          accessibilityRole="button"
        >
          <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
            {selectedLabel}
          </Text>
          <Text className="text-muted-foreground">▾</Text>
        </Pressable>

        <GorhomBottomSheet
          ref={sheetRef}
          index={-1}
          enableDynamicSizing
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: "hsl(0, 0%, 100%)" }}
          handleIndicatorStyle={{ backgroundColor: "hsl(240, 3.8%, 46.1%)" }}
        >
          <BottomSheetView>
            <View className="pb-8">
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  className={cn(
                    "flex-row items-center px-4 py-3 min-h-12",
                    option.value === selected && "bg-accent"
                  )}
                  onPress={() => handleSelect(option.value)}
                  accessible={true}
                  accessibilityRole="button"
                >
                  <Text className={cn("text-base flex-1", option.value === selected ? "text-accent-foreground font-medium" : "text-foreground")}>
                    {option.label}
                  </Text>
                  {option.value === selected && <Text className="text-primary">✓</Text>}
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
