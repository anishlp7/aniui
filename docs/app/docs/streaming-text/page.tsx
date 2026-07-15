import { Heading } from "@/components/heading";
import {
  PreviewStreamingTextDemo,
  PreviewStreamingTextChunksDemo,
  PreviewStreamingTextBubbleDemo,
} from "@/components/preview/streaming-text";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add streaming-text`;
const usageCode = `import { StreamingText } from "@/components/ui/streaming-text";

export function AssistantReply() {
  return (
    <StreamingText
      text="AniUI is a copy-paste component library for React Native. Components are source files you own."
      speed={60}
      onComplete={() => console.log("reveal finished")}
    />
  );
}`;
const apiCode = `// \`text\` can GROW over time — appends continue the reveal seamlessly,
// replacing the text restarts it. Keep \`streaming\` true between chunks
// so the cursor keeps blinking while waiting for more tokens.
const [reply, setReply] = useState("");
const [streaming, setStreaming] = useState(false);

const ask = async (prompt: string) => {
  setReply("");
  setStreaming(true);
  for await (const chunk of streamCompletion(prompt)) {
    setReply((prev) => prev + chunk); // append — the typewriter keeps going
  }
  setStreaming(false); // cursor disappears once caught up
};

<StreamingText text={reply} streaming={streaming} />`;
const bubbleCode = `import { ChatBubble } from "@/components/ui/chat-bubble";
import { StreamingText } from "@/components/ui/streaming-text";

<ChatBubble variant="received">
  <StreamingText text={reply} streaming={streaming} className="text-sm" />
</ChatBubble>`;
const instantCode = `// History messages shouldn't replay the animation —
// typewriter={false} renders the full text instantly, no cursor.
<StreamingText text={message} typewriter={false} />`;
const sourceCode = `import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, cancelAnimation } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface StreamingTextProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  /** Target text — may grow over time as tokens stream in from an API. */
  text: string;
  /** Reveal \`text\` progressively (default true). false renders it instantly. */
  typewriter?: boolean;
  /** Reveal speed in characters per second (default 60). */
  speed?: number;
  /** Keep the cursor blinking even when caught up (e.g. between API chunks). */
  streaming?: boolean;
  showCursor?: boolean;
  onComplete?: () => void;
}

function Cursor() {
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
    return () => cancelAnimation(opacity);
  }, [opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  // The cursor is a typographic block glyph (not an icon) so it flows inline
  // with the revealed text; Animated.Text lets it blink via opacity.
  return <Animated.Text style={style} className="text-foreground">▍</Animated.Text>;
}

export function StreamingText({
  className, text, typewriter = true, speed = 60, streaming, showCursor = true, onComplete, ...props
}: StreamingTextProps) {
  const [count, setCount] = useState(typewriter ? 0 : text.length);
  const shown = useRef("");

  // If \`text\` was replaced (not appended to), restart the reveal.
  useEffect(() => {
    if (!text.startsWith(shown.current)) setCount(typewriter ? 0 : text.length);
  }, [text, typewriter]);

  useEffect(() => {
    if (!typewriter || count >= text.length) return;
    const tick = 33;
    const chars = Math.max(1, Math.round((speed * tick) / 1000));
    const timer = setInterval(() => {
      setCount((c) => Math.min(text.length, c + chars));
    }, tick);
    return () => clearInterval(timer);
  }, [typewriter, count, text, speed]);

  // Fire onComplete once per reveal, only when fully caught up and not streaming.
  const completed = useRef(false);
  useEffect(() => {
    const isDone = count >= text.length && text.length > 0 && !streaming;
    if (isDone && !completed.current) { completed.current = true; onComplete?.(); }
    if (!isDone) completed.current = false;
  }, [count, text, streaming, onComplete]);

  const visible = typewriter ? text.slice(0, count) : text;
  shown.current = visible;
  const done = visible.length >= text.length && !streaming;

  return (
    <Text className={cn("text-base text-foreground", className)} {...props}>
      {visible}
      {showCursor && !done && <Cursor />}
    </Text>
  );
}`;
export default function StreamingTextPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Streaming Text</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Typewriter reveal for AI responses — blinking cursor while revealing, append-safe when tokens stream in from an API.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewStreamingTextDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="streaming-text" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <p className="text-sm text-muted-foreground">Pass the final <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">text</code> and it reveals at <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">speed</code> characters per second (default 60), cursor blinking until done.</p>
        <CodeBlock code={usageCode} title="app/assistant.tsx" />
      </div>
      {/* Streaming from an API */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Streaming from an API</Heading>
        <p className="text-sm text-muted-foreground">Append chunks to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">text</code> as they arrive — the reveal continues without restarting. Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">streaming</code> so the cursor keeps blinking between chunks even when the typewriter has caught up.</p>
        <ComponentPlayground code={apiCode}>
          <PreviewStreamingTextChunksDemo />
        </ComponentPlayground>
      </div>
      {/* In a chat bubble */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">In a chat bubble</Heading>
        <p className="text-sm text-muted-foreground">Drop it inside a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ChatBubble</code> for the classic AI assistant look.</p>
        <ComponentPlayground code={bubbleCode}>
          <PreviewStreamingTextBubbleDemo />
        </ComponentPlayground>
      </div>
      {/* Instant */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Instant render</Heading>
        <CodeBlock code={instantCode} title="Skip the animation" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "text", type: "string", description: "Target text — may grow over time; appends continue the reveal, replacements restart it." },
          { name: "typewriter", type: "boolean", default: "true", description: "false renders the text instantly." },
          { name: "speed", type: "number", default: "60", description: "Reveal speed in characters per second." },
          { name: "streaming", type: "boolean", default: "false", description: "Keep the cursor blinking while waiting for more tokens." },
          { name: "showCursor", type: "boolean", default: "true" },
          { name: "onComplete", type: "() => void", description: "Fired once when fully revealed and not streaming." },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native. Needs <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for the blinking cursor.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Renders as a single <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> element — screen readers read the revealed content as ordinary text.</li>
          <li>The cursor is a typographic glyph that blinks via opacity only, safe for reduced-motion sensitivity.</li>
          <li>For long responses, consider <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">typewriter=&#123;false&#125;</code> so assistive tech gets the full message immediately.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/streaming-text.tsx" />
      </div>
    </div>
  );
}
