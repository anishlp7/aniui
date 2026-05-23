import React from "react";
import { View, Pressable, Text, useColorScheme } from "react-native";
import { cn } from "@/lib/utils";

const heights = { sm: 36, md: 44, lg: 56 } as const;

export type SegmentedOption<T extends string | number> = {
  value: T;
  label?: string;
  disabled?: boolean;
};

export interface SegmentedControlProps<T extends string | number = string>
  extends Omit<React.ComponentProps<typeof View>, "children"> {
  className?: string;
  options: T[] | SegmentedOption<T>[];
  labels?: string[];
  value: T;
  onValueChange: (value: T) => void;
  size?: "sm" | "md" | "lg";
}

function isOptionObject<T extends string | number>(o: T | SegmentedOption<T>): o is SegmentedOption<T> {
  return typeof o === "object" && o !== null && "value" in (o as object);
}

export function SegmentedControl<T extends string | number = string>({
  size = "md",
  className,
  style,
  options,
  labels,
  value,
  onValueChange,
  ...rest
}: SegmentedControlProps<T>) {
  const dark = useColorScheme() === "dark";
  const activeBg = dark ? "#37373a" : "#ffffff";
  const activeFg = dark ? "#fafafa" : "#09090b";
  const inactiveFg = dark ? "#a1a1aa" : "#71717a";
  const disabledFg = dark ? "#52525b" : "#d4d4d8";

  const items: SegmentedOption<T>[] = options.map((o, i) =>
    isOptionObject(o)
      ? { value: o.value, label: o.label ?? String(o.value), disabled: o.disabled }
      : { value: o, label: labels?.[i] ?? String(o) }
  );

  return (
    <View
      className={cn("rounded-lg bg-muted", className)}
      style={[{ height: heights[size], padding: 4, flexDirection: "row", borderRadius: 8 }, style]}
      accessibilityRole="tablist"
      {...rest}
    >
      {items.map(({ value: v, label, disabled }) => {
        const active = v === value;
        return (
          <Pressable
            key={String(v)}
            disabled={disabled}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              opacity: disabled ? 0.5 : 1,
              backgroundColor: active ? activeBg : "transparent",
              ...(active
                ? {
                    shadowColor: "#000",
                    shadowOpacity: dark ? 0.4 : 0.08,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 1,
                  }
                : {}),
            }}
            onPress={() => {
              if (!active) onValueChange(v);
            }}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: active, disabled: !!disabled }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: disabled ? disabledFg : active ? activeFg : inactiveFg,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
