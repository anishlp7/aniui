"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const imageVariants = cva("overflow-hidden bg-muted", {
  variants: {
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: { rounded: "md" },
});

export interface PreviewImageProps extends VariantProps<typeof imageVariants> {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function PreviewImage({ rounded, className, src, alt, width = 200, height = 150 }: PreviewImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  return (
    <div className={cn(imageVariants({ rounded }), className)} style={{ width, height, position: "relative" }}>
      {status === "loading" && <div className="absolute inset-0 flex items-center justify-center bg-muted"><div className="h-8 w-8 rounded-full bg-muted-foreground/10" /></div>}
      {status === "error" ? (
        <div className="flex items-center justify-center w-full h-full bg-muted"><span className="text-xs text-muted-foreground">Failed to load</span></div>
      ) : (
        <img src={src} alt={alt} className="w-full h-full object-cover" onLoad={() => setStatus("loaded")} onError={() => setStatus("error")} />
      )}
    </div>
  );
}
