import React from "react";
import { Pressable, View } from "react-native";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Check } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ checked = false, onCheckedChange, className, disabled, ...props }: CheckboxProps) {
  const colors = useThemeColors();
  // Primitive's Root requires a non-nullish onCheckedChange and a plain
  // boolean checked (no boolean | "indeterminate"-style widening). Fall back
  // to a no-op callback for the uncontrolled case so the Pressable below
  // still drives the visual state via its own onPress.
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange ?? (() => {})}
      // Pressable's `disabled` is `boolean | null | undefined`; primitive
      // only accepts `boolean | undefined`. Normalize null → false.
      disabled={disabled ?? false}
      asChild
    >
      <Pressable
        className="min-h-12 min-w-12 items-center justify-center"
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled: !!disabled }}
        onPress={() => !disabled && onCheckedChange?.(!checked)}
        {...props}
      >
        <View
          className={cn(
            "h-5 w-5 items-center justify-center rounded border",
            checked ? "border-primary bg-primary" : "border-input bg-background",
            disabled && "opacity-50",
            className
          )}
        >
          <CheckboxPrimitive.Indicator>
            <Check size={14} color={colors.primaryForeground} strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </View>
      </Pressable>
    </CheckboxPrimitive.Root>
  );
}
