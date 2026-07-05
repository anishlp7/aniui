import React, { useCallback } from "react";
import { TextInput, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const maskedVariants = cva(
  "rounded-md border py-2 text-foreground placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "min-h-9 px-3 text-sm",
        md: "min-h-12 px-4 text-base",
        lg: "min-h-14 px-5 text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type MaskPreset = "credit-card" | "phone" | "date";

const masks: Record<MaskPreset, string> = {
  "credit-card": "#### #### #### ####",
  phone: "(###) ###-####",
  date: "##/##/####",
};

function applyMask(raw: string, mask: string): string {
  const digits = raw.replace(/\D/g, "");
  let result = "";
  let digitIdx = 0;
  for (let i = 0; i < mask.length && digitIdx < digits.length; i++) {
    if (mask[i] === "#") {
      result += digits[digitIdx++];
    } else {
      result += mask[i];
    }
  }
  return result;
}

export interface MaskedInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "onChangeText">,
    VariantProps<typeof maskedVariants> {
  className?: string;
  mask?: string;
  preset?: MaskPreset;
  onChangeText?: (masked: string, raw: string) => void;
}

export const MaskedInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  MaskedInputProps & { value?: string }
>(function MaskedInput(
  { variant, size, className, mask: customMask, preset, onChangeText, value: controlledValue, ...props },
  ref
) {
  const maskPattern = customMask ?? (preset ? masks[preset] : "");
  const [internal, setInternal] = React.useState("");
  const displayValue = controlledValue ?? internal;

  const handleChange = useCallback(
    (text: string) => {
      if (!maskPattern) {
        setInternal(text);
        onChangeText?.(text, text);
        return;
      }
      const raw = text.replace(/\D/g, "");
      const masked = applyMask(raw, maskPattern);
      setInternal(masked);
      onChangeText?.(masked, raw);
    },
    [maskPattern, onChangeText]
  );

  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";

  return (
    <TextInput
      ref={ref}
      className={cn(maskedVariants({ variant, size }), className)}
      placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
      keyboardAppearance={dark ? "dark" : "light"}
      selectionColor={caret}
      cursorColor={caret}
      keyboardType="number-pad"
      value={displayValue}
      onChangeText={handleChange}
      accessibilityRole="text"
      {...props}
    />
  );
});
