import React, { useState } from "react";
import { View, TextInput, Pressable, Text, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { Eye, EyeOff } from "lucide-react-native";

const passwordVariants = cva(
  "flex-row items-center rounded-md border py-2 text-foreground",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "min-h-9 px-3",
        md: "min-h-12 px-4",
        lg: "min-h-14 px-5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface PasswordInputProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "secureTextEntry">,
    VariantProps<typeof passwordVariants> {
  className?: string;
  showStrength?: boolean;
}

function getStrength(value: string): number {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

const strengthColors = [
  "bg-destructive",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

export const PasswordInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  PasswordInputProps
>(function PasswordInput(
  { variant, size, className, showStrength, onChangeText, ...props },
  ref
) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const strength = getStrength(value);
  const dark = useColorScheme() === "dark";
  const colors = useThemeColors();
  const caret = colors.foreground;

  return (
    <View className="gap-2">
      <View className={cn(passwordVariants({ variant, size }), className)}>
        <TextInput
          ref={ref}
          className="flex-1 text-foreground p-0 text-base"
          placeholderTextColor={colors.mutedForeground}
          keyboardAppearance={dark ? "dark" : "light"}
          selectionColor={caret}
          cursorColor={caret}
          secureTextEntry={!visible}
          onChangeText={(text) => {
            setValue(text);
            onChangeText?.(text);
          }}
          accessibilityLabel="Password"
          {...props}
        />
        <Pressable onPress={() => setVisible(!visible)} accessible={true} accessibilityRole="button" accessibilityLabel={visible ? "Hide password" : "Show password"} className="ms-2 min-h-8 min-w-8 items-center justify-center" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          {visible ? <Eye size={20} color={colors.mutedForeground} /> : <EyeOff size={20} color={colors.mutedForeground} />}
        </Pressable>
      </View>
      {showStrength && value.length > 0 && (
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row gap-1">
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                className={cn(
                  "flex-1 h-1 rounded-full",
                  i < strength ? strengthColors[strength - 1] : "bg-muted",
                )}
              />
            ))}
          </View>
          <Text className="text-xs text-muted-foreground">
            {strengthLabels[strength - 1] ?? ""}
          </Text>
        </View>
      )}
    </View>
  );
});
