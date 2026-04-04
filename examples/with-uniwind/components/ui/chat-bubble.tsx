import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bubbleVariants = cva("max-w-[80%] rounded-2xl px-4 py-2.5", {
  variants: {
    variant: {
      sent: "bg-zinc-900 dark:bg-zinc-50 self-end rounded-br-sm",
      received: "bg-zinc-100 dark:bg-zinc-800 self-start rounded-bl-sm",
    },
  },
  defaultVariants: { variant: "received" },
});

const textVariants = cva("text-base", {
  variants: {
    variant: {
      sent: "text-zinc-50 dark:text-zinc-900",
      received: "text-zinc-900 dark:text-zinc-50",
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
  sent: "✓",
  delivered: "✓✓",
  read: "✓✓",
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
            <Text className={cn("text-[10px]", isSent ? "text-zinc-50/60 dark:text-zinc-900/60" : "text-zinc-500 dark:text-zinc-400")}>
              {timestamp}
            </Text>
          )}
          {status && isSent && (
            <Text className={cn("text-[10px]", status === "read" ? "text-blue-300" : "text-zinc-50/60 dark:text-zinc-900/60")}>
              {statusIcons[status]}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
