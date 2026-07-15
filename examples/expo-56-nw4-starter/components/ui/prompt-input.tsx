import React, { useState } from "react";
import { View, TextInput, Pressable, useColorScheme } from "react-native";
import { Plus, Mic, ArrowUp, Square } from "lucide-react-native";
import { cn } from "@/lib/utils";

export interface PromptInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "multiline"> {
  className?: string;
  onSend?: (text: string) => void;
  /** Rendered while `streaming` — the send button becomes a stop button. */
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
});
