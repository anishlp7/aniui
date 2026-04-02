"use client";
import { CodeBlock } from "@/components/code-block";
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
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bubbleVariants = cva("max-w-[80%] rounded-2xl px-4 py-2.5", {
  variants: {
    variant: {
      sent: "bg-primary self-end rounded-br-sm",
      received: "bg-secondary self-start rounded-bl-sm",
    },
  },
  defaultVariants: { variant: "received" },
});

const textVariants = cva("text-base", {
  variants: {
    variant: {
      sent: "text-primary-foreground",
      received: "text-secondary-foreground",
    },
  },
  defaultVariants: { variant: "received" },
});

export interface ChatBubbleProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof bubbleVariants> {
  className?: string;
  children: React.ReactNode;
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
}

const statusIcons: Record<string, string> = {
  sent: "\u2713",
  delivered: "\u2713\u2713",
  read: "\u2713\u2713",
};

export function ChatBubble({
  variant,
  className,
  children,
  timestamp,
  status,
  ...props
}: ChatBubbleProps) {
  const isSent = variant === "sent";

  return (
    <View className={cn(bubbleVariants({ variant }), className)} {...props}>
      <Text className={textVariants({ variant })}>{children}</Text>
      {(timestamp || status) && (
        <View className={cn("flex-row items-center gap-1 mt-1", isSent ? "self-end" : "self-start")}>
          {timestamp && (
            <Text className={cn("text-[10px]", isSent ? "text-primary-foreground/60" : "text-muted-foreground")}>
              {timestamp}
            </Text>
          )}
          {status && isSent && (
            <Text className={cn("text-[10px]", status === "read" ? "text-blue-300" : "text-primary-foreground/60")}>
              {statusIcons[status]}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}`;
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="chat-bubble" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
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
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/chat-bubble.tsx" />
      </div>
    </div>
  );
}
