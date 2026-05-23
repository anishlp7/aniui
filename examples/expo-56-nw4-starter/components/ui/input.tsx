import React from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
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
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

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
  { variant, size, className, leadingIcon, trailingIcon, ...props },
  ref
) {
  const hasIcons = !!(leadingIcon || trailingIcon);
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";

  if (!hasIcons) {
    return (
      <TextInput
        ref={ref}
        className={cn(inputVariants({ variant, size }), className)}
        placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
        keyboardAppearance={dark ? "dark" : "light"}
        selectionColor={caret}
        cursorColor={caret}
        {...props}
      />
    );
  }

  return (
    <View
      className={cn(
        "flex-row items-center",
        inputVariants({ variant, size }),
        className
      )}
    >
      {leadingIcon && <View className="me-2">{leadingIcon}</View>}
      <TextInput
        ref={ref}
        className="flex-1 text-foreground p-0 text-base"
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
