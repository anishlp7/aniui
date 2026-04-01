import React, { useCallback } from "react";
import { TextInput } from "react-native";
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

export function MaskedInput({
  variant,
  size,
  className,
  mask: customMask,
  preset,
  onChangeText,
  ...props
}: MaskedInputProps) {
  const maskPattern = customMask ?? (preset ? masks[preset] : "");

  const handleChange = useCallback(
    (text: string) => {
      if (!maskPattern) {
        onChangeText?.(text, text);
        return;
      }
      const raw = text.replace(/\D/g, "");
      const masked = applyMask(raw, maskPattern);
      onChangeText?.(masked, raw);
    },
    [maskPattern, onChangeText]
  );

  return (
    <TextInput
      className={cn(maskedVariants({ variant, size }), className)}
      placeholderTextColor="hsl(240 3.8% 46.1%)"
      keyboardType="number-pad"
      onChangeText={handleChange}
      {...props}
    />
  );
}
