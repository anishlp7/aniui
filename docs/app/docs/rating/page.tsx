import { PreviewRating } from "@/components/preview/rating";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { InteractiveDemo } from "./_demos";

const installCode = `npx @aniui/cli add rating`;
const usageCode = `import { Rating } from "@/components/ui/rating";

const [value, setValue] = useState(3);
<Rating value={value} onChange={setValue} />`;
const sizesCode = `<Rating size="sm" value={3} readOnly />
<Rating size="md" value={3} readOnly />
<Rating size="lg" value={3} readOnly />`;
const readOnlyCode = `<Rating value={4} readOnly />
<Rating value={2} max={10} readOnly />`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ratingVariants = cva("flex-row items-center", {
  variants: {
    size: {
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1.5",
    },
  },
  defaultVariants: { size: "md" },
});
const starSizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" } as const;
export interface RatingProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof ratingVariants> {
  className?: string;
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}
export function Rating({ size, className, value, max = 5, onChange, readOnly, ...props }: RatingProps) {
  const s = size ?? "md";
  return (
    <View className={cn(ratingVariants({ size }), className)} accessibilityRole="adjustable" accessibilityValue={{ min: 0, max, now: value }} {...props}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        const star = (
          <Text className={cn(starSizes[s], filled ? "text-yellow-400" : "text-muted-foreground/30")}>★</Text>
        );
        return readOnly ? (
          <View key={i}>{star}</View>
        ) : (
          <Pressable key={i} onPress={() => onChange?.(i + 1)} accessible={true} accessibilityRole="button" accessibilityLabel={\`\${i + 1} star\`}>
            {star}
          </Pressable>
        );
      })}
    </View>
  );
}`;
export default function RatingPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Rating</h1>
        <p className="text-muted-foreground text-lg">Star rating component with interactive and read-only modes. Supports custom max value and sizes.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <InteractiveDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="rating" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="space-y-3">
            <PreviewRating size="sm" value={3} readOnly />
            <PreviewRating size="md" value={3} readOnly />
            <PreviewRating size="lg" value={3} readOnly />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Read-Only</h2>
        <p className="text-sm text-muted-foreground mb-4">Use <code>readOnly</code> to display a non-interactive rating. Use <code>max</code> to customize the number of stars.</p>
        <ComponentPlayground code={readOnlyCode}>
          <div className="space-y-3">
            <PreviewRating value={4} readOnly />
            <PreviewRating value={2} max={10} readOnly />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { name: "value", type: "number" },
          { name: "max", type: "number", default: "5" },
          { name: "onChange", type: "(value: number) => void" },
          { name: "readOnly", type: "boolean", default: "false" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with star labels.</li>
          <li>Each star is individually labeled for screen readers (e.g., "1 of 5 stars").</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/rating.tsx" />
      </div>
    </div>
  );
}
