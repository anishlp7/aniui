import React from "react";
import { TextInput, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "rounded-md border text-foreground placeholder:text-muted-foreground align-top",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof textareaVariants> {
  className?: string;
}

export const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextareaProps
>(function Textarea({ variant, className, ...props }, ref) {
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  return (
    <TextInput
      ref={ref}
      className={cn(textareaVariants({ variant }), "min-h-24 px-4 py-3 text-base", className)}
      placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
      keyboardAppearance={dark ? "dark" : "light"}
      selectionColor={caret}
      cursorColor={caret}
      multiline
      textAlignVertical="top"
      {...props}
    />
  );
});
