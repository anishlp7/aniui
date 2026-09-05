import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewChatBubbleDemo } from "@/components/preview/chat-bubble";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add chat-bubble`;
const usageCode = `import { ChatBubble } from "@/components/ui/chat-bubble";

export function MyScreen() {
  return (
    <View className="gap-3 p-4">
      <ChatBubble variant="received" timestamp="2:30 PM">
        Hey, how are you?
      </ChatBubble>
      <ChatBubble variant="sent" timestamp="2:31 PM" status="read">
        I'm doing great, thanks!
      </ChatBubble>
      <ChatBubble variant="sent" timestamp="2:31 PM" status="delivered">
        How about you?
      </ChatBubble>
    </View>
  );
}`;
const sourceCode = getComponentSource("chat-bubble");
export default function ChatBubblePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Chat Bubble</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Message bubble for chat interfaces with sent/received variants.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="chat-bubble" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewChatBubbleDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: '"sent" | "received"', default: '"received"' },
          { name: "children", type: "React.ReactNode", default: "-" },
          { name: "timestamp", type: "string", default: "-" },
          { name: "status", type: '"sent" | "delivered" | "read"', default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Message bubble with sent/received styling for visual distinction.</li>
          <li>Message content is readable by screen readers with sender context.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/chat-bubble.tsx" />
      </div>
    </div>
  );
}
