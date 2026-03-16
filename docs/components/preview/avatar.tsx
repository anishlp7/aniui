"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-muted overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const avatarTextVariants = cva("font-medium text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface PreviewAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  className?: string;
  src?: string;
  alt?: string;
  fallback?: string;
}

export function PreviewAvatar({ size, className, src, alt, fallback, ...props }: PreviewAvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt ?? ""}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className={cn(avatarTextVariants({ size }))}>{fallback ?? "?"}</span>
      )}
    </div>
  );
}
