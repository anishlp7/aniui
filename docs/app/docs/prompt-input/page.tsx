import { getComponentSource } from "@/lib/registry-source";
import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  PreviewPromptInputDemo,
  PreviewPromptInputStreamingDemo,
  PreviewPromptInputRecordingDemo,
  PreviewPromptInputAttachDemo,
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
const actionSheetCode = `// npx @aniui/cli add action-sheet
import { useRef } from "react";
import { Plus } from "lucide-react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ActionSheet } from "@/components/ui/action-sheet";

const sheetRef = useRef<BottomSheetModal>(null);

<>
  <PromptInput onSend={(text) => sendMessage(text)}>
    <PromptInputTextarea />
    <PromptInputToolbar>
      {/* Any PromptInputButton onPress can present an overlay */}
      <PromptInputButton onPress={() => sheetRef.current?.present()} accessibilityLabel="Add attachment">
        <Plus size={20} color="#71717a" />
      </PromptInputButton>
      <PromptInputSpacer />
      <PromptInputSend />
    </PromptInputToolbar>
  </PromptInput>
  <ActionSheet
    ref={sheetRef}
    title="Add to your message"
    actions={[
      { label: "Add photos", onPress: () => pickPhotos() },
      { label: "Take a screenshot", onPress: () => takeScreenshot() },
      { label: "Files", onPress: () => pickFiles() },
    ]}
    onCancel={() => sheetRef.current?.dismiss()}
  />
</>`;
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
        <Waveform active size="sm" className="flex-1" />
        <PromptInputButton onPress={() => setRecording(false)} accessibilityLabel="Cancel recording">
          <X size={20} color="#71717a" />
        </PromptInputButton>
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
const sourceCode = getComponentSource("prompt-input");
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
      {/* Composability note */}
      <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Every toolbar control is an optional slot.</span>{" "}
        Compose only what you need — a textarea and a send arrow is already a complete composer. And any{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PromptInputButton</code>&apos;s{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onPress</code> can open a{" "}
        <Link href="/docs/dropdown-menu" className="text-primary hover:underline">Dropdown Menu</Link>,{" "}
        <Link href="/docs/action-sheet" className="text-primary hover:underline">Action Sheet</Link>,{" "}
        <Link href="/docs/bottom-sheet" className="text-primary hover:underline">Bottom Sheet</Link>, or navigate to another screen.
      </div>
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
      {/* Attachment action sheet */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Attachment action sheet</Heading>
        <p className="text-sm text-muted-foreground">The mobile-first pattern: on phones, wire the + button&apos;s <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onPress</code> to an <Link href="/docs/action-sheet" className="text-primary hover:underline">Action Sheet</Link> — a thumb-reachable bottom sheet feels native and gives each option a full-width touch target.</p>
        <ComponentPlayground code={actionSheetCode}>
          <PreviewPromptInputAttachDemo />
        </ComponentPlayground>
      </div>
      {/* Attachment menu */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Attachment menu</Heading>
        <p className="text-sm text-muted-foreground">Toolbar buttons compose with any AniUI overlay. Here the + button is the trigger for a <a href="/docs/dropdown-menu" className="text-primary hover:underline">Dropdown Menu</a> that opens upward, ChatGPT-style. Prefer this anchored menu on larger screens and tablets, where a pointer or a wide layout makes it feel natural — and reach for the action sheet above on phones.</p>
        <CodeBlock code={attachMenuCode} title="Attachment menu" />
      </div>
      {/* Voice recording */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Voice recording</Heading>
        <p className="text-sm text-muted-foreground">The toolbar is just a slot, so state can swap its contents entirely. While recording, replace the tools with an animated <a href="/docs/waveform" className="text-primary hover:underline">Waveform</a>, an X to cancel, and a check to confirm. The Waveform can also follow real mic metering — pass expo-av amplitudes via its <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">levels</code> prop (see <Link href="/docs/waveform" className="text-primary hover:underline">Waveform</Link>).</p>
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
          <li>Toolbar buttons meet the 48dp minimum touch target; keyboard appearance, selection, and cursor colors follow the system color scheme.</li>
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
