"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarGroupItemVariants = cva("rounded-full border-2 border-background", {
  variants: {
    spacing: {
      sm: "-ml-2",
      md: "-ml-3",
      lg: "-ml-4",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export interface PreviewAvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupItemVariants> {
  className?: string;
  max?: number;
  children?: React.ReactNode;
}

export function PreviewAvatarGroup({ spacing, max = 4, className, children, ...props }: PreviewAvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("flex flex-row items-center", className)} {...props}>
      {visible.map((child, index) => (
        <div
          key={index}
          className={cn(avatarGroupItemVariants({ spacing }), index === 0 && "ml-0")}
        >
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            avatarGroupItemVariants({ spacing }),
            "h-10 w-10 flex items-center justify-center bg-muted",
            visible.length === 0 && "ml-0"
          )}
        >
          <span className="text-sm font-medium text-muted-foreground">+{overflow}</span>
        </div>
      )}
    </div>
  );
}
