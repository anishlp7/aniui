import React, { useRef, useState } from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { cn } from "@/lib/utils";

export interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function InputOTP({ length = 6, value = "", onValueChange, className, ...props }: InputOTPProps) {
  const refs = useRef<(TextInput | null)[]>([]);
  const [focused, setFocused] = useState(-1);
  const dark = useColorScheme() === "dark";
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const handleChange = (text: string, index: number) => {
    const char = text.slice(-1);
    const next = [...digits];
    next[index] = char;
    onValueChange?.(next.join(""));
    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const bg = dark ? "#27272a" : "#ffffff";
  const borderDefault = dark ? "#3f3f46" : "#e4e4e7";
  const borderFocused = dark ? "#fafafa" : "#18181b";
  const textColor = dark ? "#fafafa" : "#09090b";

  return (
    <View className={cn("flex-row gap-2", className)} accessibilityRole="none" {...props}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            height: 48,
            width: 40,
            borderRadius: 8,
            borderWidth: focused === i ? 2 : 1,
            borderColor: focused === i ? borderFocused : borderDefault,
            backgroundColor: bg,
            textAlign: "center" as const,
            fontSize: 18,
            fontWeight: "600",
            color: textColor,
          }}
          value={digit}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(-1)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          accessible={true}
          accessibilityLabel={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </View>
  );
}