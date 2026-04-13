import React from "react";
import { View, TextInput } from "react-native";
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

export function Input({
  variant,
  size,
  className,
  leadingIcon,
  trailingIcon,
  ...props
}: InputProps) {
  const hasIcons = !!(leadingIcon || trailingIcon);

  if (!hasIcons) {
    return (
      <TextInput
        className={cn(inputVariants({ variant, size }), className)}
        placeholderTextColor="#71717a"
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
        className="flex-1 text-foreground p-0 text-base"
        placeholderTextColor="#71717a"
        {...props}
      />
      {trailingIcon && <View className="ms-2">{trailingIcon}</View>}
    </View>
  );
}
