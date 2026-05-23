import React from "react";
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
}
