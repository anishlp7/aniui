import React, { createContext, useContext, useState } from "react";
import { View, TextInput, Pressable, useColorScheme } from "react-native";
import { ArrowUp, Square } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

// Compound composer (ChatGPT/Claude-style): textarea on top, toolbar below.
// <PromptInput onSend={…}><PromptInputTextarea /><PromptInputToolbar>…</PromptInputToolbar></PromptInput>

type PromptInputCtx = {
  text: string;
  setText: (t: string) => void;
  send: () => void;
  streaming?: boolean;
  dark: boolean;
  colors: ReturnType<typeof useThemeColors>;
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
  /** While `streaming`, PromptInputSend becomes a stop button firing this. */
  onStop?: () => void;
  streaming?: boolean;
  clearOnSend?: boolean;
}

export function PromptInput({
  className, value, onChangeText, onSend, onStop, streaming, clearOnSend = true, children, ...props
}: PromptInputProps) {
  const [internal, setInternal] = useState("");
  const dark = useColorScheme() === "dark";
  const colors = useThemeColors();
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
    <Ctx.Provider value={{ text, setText, send, streaming, dark, colors }}>
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
  const { text, setText, dark, colors } = usePromptInput();
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
      placeholderTextColor={colors.mutedForeground}
      keyboardAppearance={dark ? "dark" : "light"}
      selectionColor={colors.foreground}
      cursorColor={colors.foreground}
      // keep in sync with textarea.tsx's caret/placeholder colors
      textAlignVertical="top"
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
      className={cn("h-12 min-w-12 flex-row items-center justify-center gap-1 rounded-full px-2 active:bg-muted", className)}
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
  const { text, send, streaming, colors } = usePromptInput();
  const canSend = text.trim().length > 0;
  const fg = colors.primaryForeground;
  if (!canSend && !streaming && emptyFallback) return <>{emptyFallback}</>;
  return (
    <Pressable
      onPress={send}
      disabled={!canSend && !streaming}
      className={cn("h-12 w-12 items-center justify-center rounded-full bg-primary", !canSend && !streaming && "opacity-40", className)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={streaming ? "Stop generating" : "Send message"}
      accessibilityState={{ disabled: !canSend && !streaming }}
      {...props}
    >
      {streaming ? <Square size={14} color={fg} fill={fg} /> : <ArrowUp size={20} color={fg} strokeWidth={2.5} />}
    </Pressable>
  );
}
