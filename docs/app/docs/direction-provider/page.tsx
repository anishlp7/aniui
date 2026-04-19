import { Heading } from "@/components/heading";
import { PreviewDirectionProviderDemo } from "@/components/preview/direction-provider";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const usageCode = `import { DirectionProvider } from "@/components/ui/direction-provider";

export default function App() {
  return (
    <DirectionProvider defaultDirection="rtl">
      {/* Your app content */}
    </DirectionProvider>
  );
}`;
const hookCode = `import { useDirection } from "@/components/ui/direction-provider";

export function LanguageToggle() {
  const { direction, isRTL, setDirection } = useDirection();

  return (
    <Button onPress={() => setDirection(isRTL ? "ltr" : "rtl")}>
      Current: {direction.toUpperCase()}
    </Button>
  );
}`;
const sourceCode = `import React, { createContext, useContext, useState, useCallback } from "react";
import { I18nManager, View } from "react-native";
import { cn } from "@/lib/utils";

type Direction = "ltr" | "rtl";

interface DirectionContextValue {
  direction: Direction;
  isRTL: boolean;
  setDirection: (dir: Direction) => void;
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: I18nManager.isRTL ? "rtl" : "ltr",
  isRTL: I18nManager.isRTL,
  setDirection: () => {},
});

export function useDirection() {
  return useContext(DirectionContext);
}

export interface DirectionProviderProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  defaultDirection?: Direction;
  className?: string;
}

export function DirectionProvider({
  children,
  defaultDirection,
  className,
  ...props
}: DirectionProviderProps) {
  const initial = defaultDirection ?? (I18nManager.isRTL ? "rtl" : "ltr");
  const [direction, setDir] = useState<Direction>(initial);

  const setDirection = useCallback((dir: Direction) => {
    setDir(dir);
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(dir === "rtl");
  }, []);

  return (
    <DirectionContext.Provider
      value={{ direction, isRTL: direction === "rtl", setDirection }}
    >
      <View className={cn("flex-1", className)} {...props}>
        {children}
      </View>
    </DirectionContext.Provider>
  );
}`;
export default function DirectionProviderPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Direction Provider</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          RTL/LTR direction context for right-to-left language support.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="direction-provider" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewDirectionProviderDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/_layout.tsx" />
      </div>
      {/* useDirection Hook */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">useDirection Hook</Heading>
        <p className="text-sm text-muted-foreground">
          Access the current direction, RTL state, and direction controls from any child component.
        </p>
        <CodeBlock code={hookCode} title="Using useDirection" />
        <PropsTable props={[
          { name: "direction", type: '"ltr" | "rtl"', default: "-" },
          { name: "isRTL", type: "boolean", default: "-" },
          { name: "setDirection", type: "(dir: Direction) => void", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required" },
          { name: "defaultDirection", type: '"ltr" | "rtl"', default: "system default" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Important */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Important</Heading>
        <p className="text-sm text-muted-foreground">
          Calling <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">setDirection</code> updates the React context immediately, but the full layout flip via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">I18nManager</code> requires an app restart. This is a React Native limitation.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Respects <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">I18nManager</code> for system-level RTL detection.</li>
          <li>Supports right-to-left languages such as Arabic, Hebrew, and Persian.</li>
          <li>Uses logical properties so layout adapts to direction context.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/direction-provider.tsx" />
      </div>
    </div>
  );
}
