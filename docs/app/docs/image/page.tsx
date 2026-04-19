import { Heading } from "@/components/heading";
import React from "react";
import { PreviewImage } from "@/components/preview/image";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add image`;
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
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewImage src="https://picsum.photos/400/300" alt="Sample" width={200} height={150} />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="image" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Rounded Variants</Heading>
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
        <Heading as="h2" className="text-xl font-semibold mb-3">Error Fallback</Heading>
        <p className="text-sm text-muted-foreground mb-4">When the image fails to load, a fallback message is shown. You can provide a custom <code>fallback</code> prop.</p>
        <ComponentPlayground code={fallbackCode}>
          <PreviewImage src="https://invalid-url.example.com/broken.png" alt="Broken" width={200} height={150} />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "src", type: "string" },
          { name: "alt", type: "string" },
          { name: "rounded", type: "\"none\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"full\"", default: "\"md\"" },
          { name: "width", type: "number" },
          { name: "height", type: "number" },
          { name: "fallback", type: "ReactNode" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="image"</code> with loading placeholder.</li>
          <li>Always provide an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">alt</code> prop for screen reader descriptions.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/image.tsx" />
      </div>
    </div>
  );
}