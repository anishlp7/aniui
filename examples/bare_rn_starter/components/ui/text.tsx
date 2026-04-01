import React from "react";
import { Text as RNText } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight",
      h2: "text-3xl font-bold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      p: "text-base leading-7",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TextProps
  extends React.ComponentPropsWithoutRef<typeof RNText>,
    VariantProps<typeof textVariants> {
  className?: string;
}

export function Text({ variant, className, ...props }: TextProps) {
  return (
    <RNText
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
}
