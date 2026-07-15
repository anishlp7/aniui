import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  PreviewPromptInputDemo,
  PreviewPromptInputStreamingDemo,
  PreviewPromptInputRecordingDemo,
} from "@/components/preview/prompt-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add prompt-input`;
const usageCode = `import { Plus } from "lucide-react-native";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSpacer,
  PromptInputButton,
  PromptInputSend,
} from "@/components/ui/prompt-input";

export function Composer() {
  return (
    <PromptInput onSend={(text) => sendMessage(text)}>
      <PromptInputTextarea />
      <PromptInputToolbar>
        <PromptInputButton onPress={() => pickImage()} accessibilityLabel="Add attachment">
          <Plus size={20} color="#71717a" />
        </PromptInputButton>
        <PromptInputSpacer />
        <PromptInputSend />
      </PromptInputToolbar>
    </PromptInput>
  );
}`;
const toolbarCode = `import { Text } from "react-native";
import { Plus, ChevronDown, Mic, AudioLines } from "lucide-react-native";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

<PromptInput onSend={(text) => sendMessage(text)}>
  <PromptInputTextarea />
  <PromptInputToolbar>
    <PromptInputButton onPress={() => pickImage()} accessibilityLabel="Add attachment">
      <Plus size={20} color="#71717a" />
    </PromptInputButton>
    <PromptInputSpacer />
    {/* Model selector — any AniUI overlay works inside the toolbar */}
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PromptInputButton accessibilityLabel="Choose model">
          <Text className="text-sm text-muted-foreground">Opus 4.8</Text>
          <ChevronDown size={14} color="#71717a" />
        </PromptInputButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end">
        <DropdownMenuItem onPress={() => setModel("opus-4.8")}>Opus 4.8</DropdownMenuItem>
        <DropdownMenuItem onPress={() => setModel("sonnet-4.9")}>Sonnet 4.9</DropdownMenuItem>
        <DropdownMenuItem onPress={() => setModel("haiku-4.5")}>Haiku 4.5</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <PromptInputButton onPress={() => startDictation()} accessibilityLabel="Dictate">
      <Mic size={20} color="#71717a" />
    </PromptInputButton>
    {/* Voice mode while empty — the send arrow appears as soon as you type */}
    <PromptInputSend
      emptyFallback={
        <PromptInputButton onPress={() => startVoiceChat()} accessibilityLabel="Voice mode">
          <AudioLines size={20} color="#71717a" />
        </PromptInputButton>
      }
    />
  </PromptInputToolbar>
</PromptInput>`;
const attachMenuCode = `// npx @aniui/cli add dropdown-menu
import { Plus } from "lucide-react-native";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

<PromptInput onSend={(text) => sendMessage(text)}>
  <PromptInputTextarea />
  <PromptInputToolbar>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PromptInputButton accessibilityLabel="Open attachment menu">
          <Plus size={20} color="#71717a" />
        </PromptInputButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start">
        <DropdownMenuItem onPress={() => pickFiles()}>Add files or photos</DropdownMenuItem>
        <DropdownMenuItem onPress={() => takeScreenshot()}>Take a screenshot</DropdownMenuItem>
        <DropdownMenuItem onPress={() => setWebSearch(true)}>Web search</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <PromptInputSpacer />
    <PromptInputSend />
  </PromptInputToolbar>
</PromptInput>`;
const recordingCode = `// npx @aniui/cli add waveform
import { Mic, X, Check } from "lucide-react-native";
import { Waveform } from "@/components/ui/waveform";

const [recording, setRecording] = useState(false);

<PromptInput onSend={(text) => sendMessage(text)}>
  {!recording && <PromptInputTextarea />}
  <PromptInputToolbar>
    {recording ? (
      <>
        <PromptInputButton onPress={() => setRecording(false)} accessibilityLabel="Cancel recording">
          <X size={20} color="#71717a" />
        </PromptInputButton>
        <Waveform active size="sm" className="flex-1" />
        <PromptInputButton
          onPress={() => { setRecording(false); finishRecording(); }}
          accessibilityLabel="Finish recording"
          className="bg-primary"
        >
          <Check size={20} color="#fafafa" />
        </PromptInputButton>
      </>
    ) : (
      <>
        <PromptInputButton onPress={() => setRecording(true)} accessibilityLabel="Record voice message">
          <Mic size={20} color="#71717a" />
        </PromptInputButton>
        <PromptInputSpacer />
        <PromptInputSend />
      </>
    )}
  </PromptInputToolbar>
</PromptInput>`;
const streamingCode = `// While \`streaming\` is true, PromptInputSend renders a stop
// square that fires \`onStop\` instead of \`onSend\`.
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
>
  <PromptInputTextarea />
  <PromptInputToolbar>
    <PromptInputSpacer />
    <PromptInputSend />
  </PromptInputToolbar>
</PromptInput>`;
const keyboardCode = `// npx @aniui/cli add keyboard-view
import { KeyboardView } from "@/components/ui/keyboard-view";

<KeyboardView className="flex-1">
  <MessageList className="flex-1" />
  <PromptInput onSend={(text) => sendMessage(text)} className="mx-4 mb-4">
    <PromptInputTextarea />
    <PromptInputToolbar>
      <PromptInputSpacer />
      <PromptInputSend />
    </PromptInputToolbar>
  </PromptInput>
</KeyboardView>`;
const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, TextInput, Pressable, useColorScheme } from "react-native";
import { ArrowUp, Square } from "lucide-react-native";
import { cn } from "@/lib/utils";

// Compound composer (ChatGPT/Claude-style): textarea on top, toolbar below.
// <PromptInput onSend={…}><PromptInputTextarea /><PromptInputToolbar>…</PromptInputToolbar></PromptInput>

type PromptInputCtx = {
  text: string;
  setText: (t: string) => void;
  send: () => void;
  streaming?: boolean;
  dark: boolean;
};
const Ctx = createContext<PromptInputCtx | null>(null);

export function usePromptInput(): PromptInputCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("PromptInput.* components must be used inside <PromptInput>");
  return ctx;
}

export interface PromptInputProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: (text: string) => void;
  /** While \`streaming\`, PromptInputSend becomes a stop button firing this. */
  onStop?: () => void;
  streaming?: boolean;
  clearOnSend?: boolean;
}

export function PromptInput({
  className, value, onChangeText, onSend, onStop, streaming, clearOnSend = true, children, ...props
}: PromptInputProps) {
  const [internal, setInternal] = useState("");
  const dark = useColorScheme() === "dark";
  const text = value ?? internal;

  const setText = (t: string) => {
    if (value === undefined) setInternal(t);
    onChangeText?.(t);
  };
  const send = () => {
    if (streaming) return onStop?.();
    const t = text.trim();
    if (!t) return;
    onSend?.(t);
    if (clearOnSend && value === undefined) setInternal("");
  };

  return (
    <Ctx.Provider value={{ text, setText, send, streaming, dark }}>
      <View className={cn("rounded-3xl border border-input bg-background px-3 pt-3 pb-2", className)} {...props}>
        {children}
      </View>
    </Ctx.Provider>
  );
}

export interface PromptInputTextareaProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "multiline" | "value" | "onChangeText"> {
  className?: string;
  /** Max height before the textarea scrolls (default 120). */
  maxHeight?: number;
}

export const PromptInputTextarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  PromptInputTextareaProps
>(function PromptInputTextarea({ className, maxHeight = 120, style, ...props }, ref) {
  const { text, setText, dark } = usePromptInput();
  const [height, setHeight] = useState(0);
  return (
    <TextInput
      ref={ref}
      multiline
      value={text}
      onChangeText={setText}
      onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
      // Grows with content up to maxHeight, then scrolls. Font size is inline
      // so the cursor stays centered on iOS (same convention as input.tsx).
      style={[{ fontSize: 16, maxHeight, height: Math.min(Math.max(24, height), maxHeight) }, style]}
      className={cn("p-0 text-foreground placeholder:text-muted-foreground", className)}
      placeholder="How can I help you today?"
      placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
      keyboardAppearance={dark ? "dark" : "light"}
      selectionColor={dark ? "#fafafa" : "#18181b"}
      cursorColor={dark ? "#fafafa" : "#18181b"}
      {...props}
    />
  );
});

export interface PromptInputToolbarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

/** Bottom action row — put leading tools first, then <PromptInputSpacer />, then trailing tools. */
export function PromptInputToolbar({ className, ...props }: PromptInputToolbarProps) {
  return <View className={cn("flex-row items-center gap-1 pt-2", className)} {...props} />;
}

export function PromptInputSpacer() {
  return <View className="flex-1" />;
}

export interface PromptInputButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

/** Ghost icon button for toolbar actions (+, mic, model selector, …). */
export function PromptInputButton({ className, ...props }: PromptInputButtonProps) {
  return (
    <Pressable
      className={cn("h-11 min-w-11 flex-row items-center justify-center gap-1 rounded-full px-2 active:bg-muted", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    />
  );
}

export interface PromptInputSendProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  /** Shown when there is no text (e.g. a voice/waveform button); default hides into the send arrow. */
  emptyFallback?: React.ReactNode;
}

export function PromptInputSend({ className, emptyFallback, ...props }: PromptInputSendProps) {
  const { text, send, streaming, dark } = usePromptInput();
  const canSend = text.trim().length > 0;
  const fg = dark ? "#18181b" : "#fafafa";
  if (!canSend && !streaming && emptyFallback) return <>{emptyFallback}</>;
  return (
    <Pressable
      onPress={send}
      disabled={!canSend && !streaming}
      className={cn("h-11 w-11 items-center justify-center rounded-full bg-primary", !canSend && !streaming && "opacity-40", className)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={streaming ? "Stop generating" : "Send message"}
      accessibilityState={{ disabled: !canSend && !streaming }}
      {...props}
    >
      {streaming ? <Square size={14} color={fg} fill={fg} /> : <ArrowUp size={20} color={fg} strokeWidth={2.5} />}
    </Pressable>
  );
}`;
export default function PromptInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Prompt Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Compound ChatGPT/Claude-style AI composer — auto-growing textarea on top, a toolbar slot below for attach, model, and voice buttons, and a send arrow that becomes a stop button while streaming.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={toolbarCode}>
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
        <p className="text-sm text-muted-foreground">The composer is a compound component: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInput</code> owns the draft (and the send/stop logic), <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputTextarea</code> grows with the message up to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">maxHeight</code> (120 by default) then scrolls, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputToolbar</code> is the bottom action row — leading tools first, then <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputSpacer</code>, then trailing tools. Wire <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onSend</code> and you have a working composer; it clears itself after sending unless you turn <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">clearOnSend</code> off.</p>
        <CodeBlock code={usageCode} title="app/chat.tsx" />
      </div>
      {/* Claude-style toolbar */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Claude-style toolbar</Heading>
        <p className="text-sm text-muted-foreground">The full composer from the preview above: a + attachment button, a model selector wired to <a href="/docs/dropdown-menu" className="text-primary hover:underline">Dropdown Menu</a>, a mic for dictation, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputSend</code> with an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">emptyFallback</code> — the voice button shows while the draft is empty, and the send arrow takes its place as soon as you type.</p>
        <CodeBlock code={toolbarCode} title="Claude-style composer" />
      </div>
      {/* Attachment menu */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Attachment menu</Heading>
        <p className="text-sm text-muted-foreground">Toolbar buttons compose with any AniUI overlay. Here the + button is the trigger for a <a href="/docs/dropdown-menu" className="text-primary hover:underline">Dropdown Menu</a> that opens upward, ChatGPT-style.</p>
        <CodeBlock code={attachMenuCode} title="Attachment menu" />
      </div>
      {/* Voice recording */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Voice recording</Heading>
        <p className="text-sm text-muted-foreground">The toolbar is just a slot, so state can swap its contents entirely. While recording, replace the tools with an animated <a href="/docs/waveform" className="text-primary hover:underline">Waveform</a>, an X to cancel, and a check to confirm.</p>
        <ComponentPlayground code={recordingCode}>
          <PreviewPromptInputRecordingDemo />
        </ComponentPlayground>
      </div>
      {/* Streaming */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Streaming</Heading>
        <p className="text-sm text-muted-foreground">While the model is responding, set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">streaming</code> on <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInput</code> — <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputSend</code> turns into a stop button that fires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onStop</code>, so the user can cancel generation.</p>
        <ComponentPlayground code={streamingCode}>
          <PreviewPromptInputStreamingDemo />
        </ComponentPlayground>
      </div>
      {/* Keyboard */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Keyboard handling</Heading>
        <p className="text-sm text-muted-foreground">On mobile, wrap the screen in <Link href="/docs/keyboard-view" className="text-primary hover:underline">Keyboard View</Link> so the composer rises above the keyboard when the textarea focuses.</p>
        <CodeBlock code={keyboardCode} title="app/chat.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">PromptInput</Heading>
        <PropsTable props={[
          { name: "onSend", type: "(text: string) => void", default: "-" },
          { name: "onStop", type: "() => void", default: "-", description: "Fired by PromptInputSend while streaming — it renders as a stop button." },
          { name: "streaming", type: "boolean", default: "false" },
          { name: "value", type: "string", default: "-", description: "Controlled draft — pair with onChangeText." },
          { name: "onChangeText", type: "(text: string) => void", default: "-" },
          { name: "clearOnSend", type: "boolean", default: "true", description: "Auto-clear after send (uncontrolled mode only)." },
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">PromptInputTextarea</Heading>
        <PropsTable props={[
          { name: "maxHeight", type: "number", default: "120", description: "Max height the textarea grows to before scrolling." },
          { name: "placeholder", type: "string", default: '"How can I help you today?"' },
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">PromptInputToolbar</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">PromptInputSpacer</Heading>
        <p className="text-sm text-muted-foreground">No props — a flex spacer that pushes trailing tools to the right edge of the toolbar.</p>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">PromptInputButton</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">PromptInputSend</Heading>
        <PropsTable props={[
          { name: "emptyFallback", type: "React.ReactNode", default: "-", description: "Rendered instead of the send arrow while the draft is empty (e.g. a voice button)." },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputTextarea</code> also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">multiline</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">value</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code> (owned by the context); buttons accept all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props. For custom toolbar pieces, the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">usePromptInput()</code> hook exposes <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{"{ text, setText, send, streaming }"}</code>. Needs <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">lucide-react-native</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputButton</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputSend</code> set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> — give each toolbar button a descriptive <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code>.</li>
          <li>The send button announces &ldquo;Stop generating&rdquo; while streaming and exposes its disabled state via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> when the draft is empty.</li>
          <li>Toolbar buttons meet the 44dp minimum touch target; keyboard appearance, selection, and cursor colors follow the system color scheme.</li>
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
