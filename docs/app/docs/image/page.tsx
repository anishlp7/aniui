"use client";

import React from "react";
import { PreviewImage } from "@/components/preview/image";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add image`;

const usageCode = `import { Image } from "@/components/ui/image";

<Image src="https://picsum.photos/400/300" alt="Sample" width={200} height={150} />`;

const roundedCode = `<Image src="https://picsum.photos/200/200" rounded="none" width={100} height={100} />
<Image src="https://picsum.photos/200/200" rounded="md" width={100} height={100} />
<Image src="https://picsum.photos/200/200" rounded="xl" width={100} height={100} />
<Image src="https://picsum.photos/200/200" rounded="full" width={100} height={100} />`;

const fallbackCode = `<Image
  src="https://invalid-url.example.com/broken.png"
  alt="Broken image"
  width={200}
  height={150}
/>`;

const sourceCode = `import React, { useState } from "react";
import { Image as RNImage, View, Text } from "react-native";
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

export interface ImageProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RNImage>, "source">,
    VariantProps<typeof imageVariants> {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fallback?: React.ReactNode;
}

export function Image({ rounded, className, src, alt, width, height, fallback, style, ...props }: ImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <View className={cn(imageVariants({ rounded }), className)} style={[width && height ? { width, height } : undefined, style as object]}>
      {status === "loading" && (
        <View className="absolute inset-0 items-center justify-center bg-muted">
          <View className="h-8 w-8 rounded-full bg-muted-foreground/10" />
        </View>
      )}
      {status === "error" ? (
        fallback ?? (
          <View className="flex-1 items-center justify-center bg-muted">
            <Text className="text-xs text-muted-foreground">Failed to load</Text>
          </View>
        )
      ) : (
        <RNImage
          source={{ uri: src }}
          className="w-full h-full"
          accessibilityLabel={alt}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          {...props}
        />
      )}
    </View>
  );
}`;

export default function ImagePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Image</h1>
        <p className="text-muted-foreground text-lg">Image component with loading placeholder, error fallback, and rounded variants.</p>
      </div>

      <ComponentPlayground code={usageCode}>
        <PreviewImage src="https://picsum.photos/400/300" alt="Sample" width={200} height={150} />
      </ComponentPlayground>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Rounded Variants</h2>
        <ComponentPlayground code={roundedCode}>
          <div className="flex flex-wrap items-center gap-4">
            <PreviewImage src="https://picsum.photos/200/200" rounded="none" width={80} height={80} />
            <PreviewImage src="https://picsum.photos/200/200" rounded="md" width={80} height={80} />
            <PreviewImage src="https://picsum.photos/200/200" rounded="xl" width={80} height={80} />
            <PreviewImage src="https://picsum.photos/200/200" rounded="full" width={80} height={80} />
          </div>
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Error Fallback</h2>
        <p className="text-sm text-muted-foreground mb-4">When the image fails to load, a fallback message is shown. You can provide a custom <code>fallback</code> prop.</p>
        <ComponentPlayground code={fallbackCode}>
          <PreviewImage src="https://invalid-url.example.com/broken.png" alt="Broken" width={200} height={150} />
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2 pr-4">Prop</th><th className="text-left py-2 pr-4">Type</th><th className="text-left py-2">Default</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">src</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">alt</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">rounded</td><td className="py-2 pr-4 font-mono text-xs">{`"none" | "sm" | "md" | "lg" | "xl" | "full"`}</td><td className="py-2 font-mono text-xs">{`"md"`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">width</td><td className="py-2 pr-4 font-mono text-xs">number</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">height</td><td className="py-2 pr-4 font-mono text-xs">number</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">fallback</td><td className="py-2 pr-4 font-mono text-xs">ReactNode</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">className</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/image.tsx" />
      </div>
    </div>
  );
}
