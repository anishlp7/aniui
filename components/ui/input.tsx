import React from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Padding lives on the wrapping View, never on the raw TextInput — a TextInput
// doesn't honor `px-*` reliably, so keeping padding on the View gives a
// consistent inset with or without icons, under both NativeWind and Uniwind.
const inputVariants = cva(
  "flex-row items-center rounded-md border py-2",
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
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const fontSizes = { sm: 14, md: 16, lg: 18 } as const;

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  className?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(function Input(
  { variant, size, className, leadingIcon, trailingIcon, style, ...props },
  ref
) {
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  const resolvedSize = size ?? "md";

  return (
    <View className={cn(inputVariants({ variant, size }), className)}>
      {leadingIcon && <View className="me-2">{leadingIcon}</View>}
      <TextInput
        ref={ref}
        // font-size is set inline (no lineHeight) so the cursor stays centered
        // on iOS while the size still matches the variant on every platform.
        // self-stretch makes the TextInput fill the row height so taps on the
        // wrapper's vertical padding still focus the field.
        className="flex-1 self-stretch p-0 text-foreground placeholder:text-muted-foreground"
        style={[{ fontSize: fontSizes[resolvedSize] }, style]}
        textAlignVertical="center"
        placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
        keyboardAppearance={dark ? "dark" : "light"}
        selectionColor={caret}
        cursorColor={caret}
        {...props}
      />
      {trailingIcon && <View className="ms-2">{trailingIcon}</View>}
    </View>
  );
});
