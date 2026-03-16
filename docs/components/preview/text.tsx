"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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

type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span";

const variantElementMap: Record<string, TextElement> = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4",
  p: "p", lead: "p", large: "p", small: "p", muted: "p",
};

export interface PreviewTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  className?: string;
  as?: TextElement;
}

export function PreviewText({ variant, className, as, ...props }: PreviewTextProps) {
  const Component = as || variantElementMap[variant || "p"] || "p";
  return (
    <Component
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
}
