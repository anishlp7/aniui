import { Heading } from "@/components/heading";
import { PreviewGradient } from "@/components/preview/gradient";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add gradient`;
const usageCode = `import { Gradient } from "@/components/ui/gradient";
import { Text } from "react-native";

export function HeroCard() {
  return (
    <Gradient
      colors={["#0f172a", "#334155"]}
      className="h-48 rounded-xl items-center justify-center"
    >
      <Text className="text-2xl font-bold text-white">Pro Membership</Text>
      <Text className="mt-1 text-white/70">Unlock every component</Text>
    </Gradient>
  );
}`;
const horizontalCode = `// Left-to-right gradient: start at the left edge, end at the right edge
<Gradient
  colors={["#7c3aed", "#db2777"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  className="h-24 rounded-lg items-center justify-center"
>
  <Text className="font-semibold text-white">Horizontal gradient</Text>
</Gradient>`;
const buttonCode = `import { Pressable, Text } from "react-native";
import { Gradient } from "@/components/ui/gradient";

<Pressable accessibilityRole="button" accessible={true} onPress={() => {}}>
  <Gradient
    colors={["#2563eb", "#7c3aed"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="min-h-12 items-center justify-center rounded-lg px-6"
  >
    <Text className="font-semibold text-white">Get Started</Text>
  </Gradient>
</Pressable>`;
const sourceCode = `import React from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface GradientPoint {
  x: number;
  y: number;
}

export interface GradientProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  colors?: string[];
  start?: GradientPoint;
  end?: GradientPoint;
  children?: React.ReactNode;
}

export function Gradient({
  colors = ["#18181b", "#3f3f46"],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  className,
  children,
  ...props
}: GradientProps) {
  // useId output contains ":" which is unsafe inside url(#...) references.
  const id = \`grad-\${React.useId().replace(/[^a-zA-Z0-9]/g, "")}\`;

  return (
    <View className={cn("overflow-hidden", className)} {...props}>
      <Svg
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Defs>
          <SvgLinearGradient
            id={id}
            x1={\`\${start.x * 100}%\`}
            y1={\`\${start.y * 100}%\`}
            x2={\`\${end.x * 100}%\`}
            y2={\`\${end.y * 100}%\`}
          >
            {colors.map((color, i) => (
              <Stop
                key={i}
                offset={\`\${(i / Math.max(colors.length - 1, 1)) * 100}%\`}
                stopColor={color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={\`url(#\${id})\`} />
      </Svg>
      {children}
    </View>
  );
}`;
export default function GradientPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gradient</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Linear gradient background container built on react-native-svg — use it behind hero cards, buttons, and headers.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewGradient colors={["#0f172a", "#334155"]} className="h-48 rounded-xl flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">Pro Membership</span>
              <span className="mt-1 text-white/70">Unlock every component</span>
            </PreviewGradient>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="gradient" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Direction */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Direction</Heading>
        <p className="text-sm text-muted-foreground">The gradient runs from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">start</code> to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">end</code> — both are <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{"{ x, y }"}</code> points from 0 to 1. The default is vertical (top to bottom).</p>
        <ComponentPlayground code={horizontalCode}>
          <div className="w-full max-w-sm">
            <PreviewGradient colors={["#7c3aed", "#db2777"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-24 rounded-lg flex items-center justify-center">
              <span className="font-semibold text-white">Horizontal gradient</span>
            </PreviewGradient>
          </div>
        </ComponentPlayground>
      </div>
      {/* Gradient Button */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Gradient Button</Heading>
        <p className="text-sm text-muted-foreground">Wrap the gradient in a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> to use it as a button backdrop.</p>
        <ComponentPlayground code={buttonCode}>
          <button type="button" className="cursor-pointer">
            <PreviewGradient colors={["#2563eb", "#7c3aed"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="min-h-12 flex items-center justify-center rounded-lg px-6">
              <span className="font-semibold text-white">Get Started</span>
            </PreviewGradient>
          </button>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "colors", type: "string[]", default: "[\"#18181b\", \"#3f3f46\"]" },
          { name: "start", type: "{ x: number; y: number }", default: "{ x: 0, y: 0 }" },
          { name: "end", type: "{ x: number; y: number }", default: "{ x: 0, y: 1 }" },
          { name: "children", type: "ReactNode" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native. Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-svg</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>The gradient layer is decorative and marked <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pointerEvents=&quot;none&quot;</code> so it never intercepts touches.</li>
          <li>Ensure text placed on the gradient keeps sufficient color contrast against all stops.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/gradient.tsx" />
      </div>
    </div>
  );
}
