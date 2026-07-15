import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { cn } from "@/lib/utils";

export interface KeyboardViewProps
  extends React.ComponentPropsWithoutRef<typeof KeyboardAvoidingView> {
  className?: string;
  offset?: number;
}

export function KeyboardView({ className, offset, behavior, ...props }: KeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      className={cn("flex-1", className)}
      // iOS needs "padding"; Android's windowSoftInputMode="adjustResize" already
      // resizes the window, so no behavior avoids double-shifting the layout.
      behavior={behavior ?? (Platform.OS === "ios" ? "padding" : undefined)}
      keyboardVerticalOffset={offset}
      {...props}
    />
  );
}
