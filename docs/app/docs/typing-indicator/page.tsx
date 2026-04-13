import { PreviewTypingIndicatorDemo } from "@/components/preview/typing-indicator";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add typing-indicator`;
const usageCode = `import { TypingIndicator } from "@/components/ui/typing-indicator";

export function MyScreen() {
  const [isTyping, setIsTyping] = useState(true);

  return (
    <View className="gap-3 p-4">
      <ChatBubble variant="received">Hello!</ChatBubble>
      {isTyping && <TypingIndicator />}
    </View>
  );
}`;
const sourceCode = `import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

function Dot({ delay }: { delay: number }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(withSequence(withTiming(-4, { duration: 300 }), withTiming(0, { duration: 300 })), -1)
    );
  }, [delay, translateY]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return <Animated.View style={style} className="h-2 w-2 rounded-full bg-muted-foreground" />;
}

export interface TypingIndicatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export function TypingIndicator({ className, ...props }: TypingIndicatorProps) {
  return (
    <View
      className={cn("flex-row items-center gap-1 px-4 py-2.5 rounded-2xl bg-secondary self-start rounded-bl-sm", className)}
      accessibilityLabel="Typing"
      {...props}
    >
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
}`;
export default function TypingIndicatorPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Typing Indicator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animated typing dots for chat interfaces.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="typing-indicator" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewTypingIndicatorDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props. Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for bounce animations.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel="Typing"</code> for screen readers.</li>
          <li>Animated dots are decorative; the label conveys meaning to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/typing-indicator.tsx" />
      </div>
    </div>
  );
}
