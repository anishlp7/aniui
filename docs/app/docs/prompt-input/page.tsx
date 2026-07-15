import { Heading } from "@/components/heading";
import {
  PreviewPromptInputDemo,
  PreviewPromptInputStreamingDemo,
  PreviewPromptInputAttachDemo,
} from "@/components/preview/prompt-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add prompt-input`;
const usageCode = `import { useState } from "react";
import { View } from "react-native";
import { PromptInput } from "@/components/ui/prompt-input";
import { ChatBubble } from "@/components/ui/chat-bubble";

export function ChatScreen() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <View className="flex-1 justify-end gap-3 p-4">
      {messages.map((m, i) => (
        <ChatBubble key={i} variant="sent">{m}</ChatBubble>
      ))}
      <PromptInput
        placeholder="Ask anything..."
        onSend={(text) => setMessages((prev) => [...prev, text])}
      />
    </View>
  );
}`;
const streamingCode = `// While \`streaming\` is true the send arrow becomes a stop button
// that fires \`onStop\` instead of \`onSend\`.
const [streaming, setStreaming] = useState(false);
const controller = useRef<AbortController | null>(null);

<PromptInput
  streaming={streaming}
  onSend={async (text) => {
    setStreaming(true);
    controller.current = new AbortController();
    await streamCompletion(text, { signal: controller.current.signal });
    setStreaming(false);
  }}
  onStop={() => {
    controller.current?.abort();
    setStreaming(false);
  }}
/>`;
const attachCode = `// The + button renders only when \`onAttach\` is provided.
// The mic renders only when \`onVoice\` is provided AND the input
// is empty and not streaming — exactly like the ChatGPT composer.
<PromptInput
  onSend={(text) => sendMessage(text)}
  onAttach={() => pickImage()}
  onVoice={() => startDictation()}
/>`;
const controlledCode = `// Controlled — you own the value. \`clearOnSend\` only auto-clears
// in uncontrolled mode, so clear the state yourself in \`onSend\`.
const [draft, setDraft] = useState("");

<PromptInput
  value={draft}
  onChangeText={setDraft}
  onSend={(text) => {
    sendMessage(text);
    setDraft("");
  }}
/>`;
const sourceCode = `import React, { useState } from "react";
import { View, TextInput, Pressable, useColorScheme } from "react-native";
import { Plus, Mic, ArrowUp, Square } from "lucide-react-native";
import { cn } from "@/lib/utils";

export interface PromptInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "multiline"> {
  className?: string;
  onSend?: (text: string) => void;
  /** Rendered while \`streaming\` — the send button becomes a stop button. */
  onStop?: () => void;
  onAttach?: () => void;
  onVoice?: () => void;
  streaming?: boolean;
  /** Max height the input grows to before scrolling (default 132). */
  maxHeight?: number;
  clearOnSend?: boolean;
}

export const PromptInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  PromptInputProps
>(function PromptInput(
  { className, value, onChangeText, onSend, onStop, onAttach, onVoice,
    streaming, maxHeight = 132, clearOnSend = true, style, ...props },
  ref
) {
  // Internal fallback so the composer works uncontrolled.
  const [internal, setInternal] = useState("");
  const [height, setHeight] = useState(0);
  const text = value ?? internal;
  const dark = useColorScheme() === "dark";
  const muted = dark ? "#a1a1aa" : "#71717a";
  const canSend = text.trim().length > 0;

  const handleChange = (t: string) => {
    if (value === undefined) setInternal(t);
    onChangeText?.(t);
  };
  const handleSend = () => {
    if (streaming) return onStop?.();
    if (!canSend) return;
    onSend?.(text.trim());
    if (clearOnSend && value === undefined) {
      setInternal("");
      setHeight(0);
    }
  };

  return (
    <View className={cn("flex-row items-end gap-2 rounded-3xl border border-input bg-background p-2", className)}>
      {onAttach && (
        <Pressable
          onPress={onAttach}
          className="h-9 w-9 items-center justify-center rounded-full"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Add attachment"
        >
          <Plus size={20} color={muted} />
        </Pressable>
      )}
      <TextInput
        ref={ref}
        multiline
        value={text}
        onChangeText={handleChange}
        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
        // Grow with content up to maxHeight, then scroll (font size inline so
        // the cursor stays centered on iOS — same convention as input.tsx).
        style={[{ fontSize: 16, maxHeight, height: Math.min(Math.max(36, height), maxHeight) }, style]}
        className="flex-1 p-0 px-1 pb-2 text-foreground placeholder:text-muted-foreground"
        placeholder="Message..."
        placeholderTextColor={muted}
        keyboardAppearance={dark ? "dark" : "light"}
        selectionColor={dark ? "#fafafa" : "#18181b"}
        cursorColor={dark ? "#fafafa" : "#18181b"}
        {...props}
      />
      {onVoice && !canSend && !streaming && (
        <Pressable
          onPress={onVoice}
          className="h-9 w-9 items-center justify-center rounded-full"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Voice input"
        >
          <Mic size={20} color={muted} />
        </Pressable>
      )}
      <Pressable
        onPress={handleSend}
        disabled={!canSend && !streaming}
        className={cn("h-9 w-9 items-center justify-center rounded-full bg-primary", !canSend && !streaming && "opacity-40")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={streaming ? "Stop generating" : "Send message"}
        accessibilityState={{ disabled: !canSend && !streaming }}
      >
        {streaming ? (
          <Square size={14} color={dark ? "#18181b" : "#fafafa"} fill={dark ? "#18181b" : "#fafafa"} />
        ) : (
          <ArrowUp size={18} color={dark ? "#18181b" : "#fafafa"} strokeWidth={2.5} />
        )}
      </Pressable>
    </View>
  );
});`;
export default function PromptInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Prompt Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          ChatGPT/Claude-style AI chat composer — auto-growing input, attach and voice buttons, and a send arrow that becomes a stop button while streaming.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewPromptInputDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="prompt-input" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <p className="text-sm text-muted-foreground">Wire <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onSend</code> and you have a working composer — the input grows with the message up to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">maxHeight</code> (132 by default), then scrolls. It clears itself after sending unless you turn <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">clearOnSend</code> off.</p>
        <CodeBlock code={usageCode} title="app/chat.tsx" />
      </div>
      {/* Streaming */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Streaming</Heading>
        <p className="text-sm text-muted-foreground">While the model is responding, set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">streaming</code> — the send arrow turns into a stop button that fires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onStop</code>, so the user can cancel generation.</p>
        <ComponentPlayground code={streamingCode}>
          <PreviewPromptInputStreamingDemo />
        </ComponentPlayground>
      </div>
      {/* Attach & voice */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Attach &amp; voice</Heading>
        <p className="text-sm text-muted-foreground">Both buttons are opt-in: pass <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onAttach</code> to get the + button, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onVoice</code> to get the mic — which only shows while the input is empty and nothing is streaming.</p>
        <ComponentPlayground code={attachCode}>
          <PreviewPromptInputAttachDemo />
        </ComponentPlayground>
      </div>
      {/* Controlled */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Controlled</Heading>
        <p className="text-sm text-muted-foreground">Uncontrolled by default. Pass <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">value</code> + <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code> to control the draft yourself (e.g. to persist it or inject suggested prompts).</p>
        <CodeBlock code={controlledCode} title="Controlled composer" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "onSend", type: "(text: string) => void" },
          { name: "onStop", type: "() => void", description: "Fired by the send button while streaming — it renders as a stop button." },
          { name: "onAttach", type: "() => void", description: "Renders the + attachment button when provided." },
          { name: "onVoice", type: "() => void", description: "Renders the mic button when provided — only while empty and not streaming." },
          { name: "streaming", type: "boolean", default: "false" },
          { name: "maxHeight", type: "number", default: "132", description: "Max height the input grows to before scrolling." },
          { name: "clearOnSend", type: "boolean", default: "true", description: "Auto-clear after send (uncontrolled mode only)." },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props from React Native except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">multiline</code> (always on). Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">value</code> / <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code> for controlled mode. Needs <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">lucide-react-native</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Every button has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> and a descriptive label — the send button announces &ldquo;Stop generating&rdquo; while streaming.</li>
          <li>The send button exposes its disabled state via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> when the input is empty.</li>
          <li>Keyboard appearance, selection, and cursor colors follow the system color scheme.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/prompt-input.tsx" />
      </div>
    </div>
  );
}
