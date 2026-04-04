import React from "react";
import { TextInput } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "rounded-md border text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 align-top",
  {
    variants: {
      variant: {
        default: "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950",
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

export function Textarea({ variant, className, ...props }: TextareaProps) {
  return (
    <TextInput
      className={cn(textareaVariants({ variant }), "min-h-24 px-4 py-3 text-base", className)}
      placeholderTextColor="#71717a"
      multiline
      textAlignVertical="top"
      {...props}
    />
  );
}
