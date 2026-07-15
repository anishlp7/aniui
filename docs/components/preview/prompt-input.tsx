"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function PlusIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
}
function MicIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>;
}
function ArrowUpIcon() {
  return <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7M12 19V5" /></svg>;
}
function StopIcon() {
  return <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>;
}

export interface PreviewPromptInputProps {
  className?: string;
  placeholder?: string;
  onSend?: (text: string) => void;
  onStop?: () => void;
  onAttach?: () => void;
  onVoice?: () => void;
  streaming?: boolean;
  clearOnSend?: boolean;
}

export function PreviewPromptInput({
  className, placeholder = "Message...", onSend, onStop, onAttach, onVoice, streaming, clearOnSend = true,
}: PreviewPromptInputProps) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const canSend = text.trim().length > 0;

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  };

  const handleSend = () => {
    if (streaming) return onStop?.();
    if (!canSend) return;
    onSend?.(text.trim());
    if (clearOnSend) {
      setText("");
      requestAnimationFrame(() => {
        const el = ref.current;
        if (el) el.style.height = "auto";
      });
    }
  };

  return (
    <div className={cn("flex w-full max-w-sm items-end gap-2 rounded-3xl border border-input bg-background p-2", className)}>
      {onAttach && (
        <button
          type="button"
          onClick={onAttach}
          aria-label="Add attachment"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          <PlusIcon />
        </button>
      )}
      <textarea
        ref={ref}
        rows={1}
        value={text}
        placeholder={placeholder}
        onChange={(e) => { setText(e.target.value); resize(); }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
        }}
        className="max-h-[132px] flex-1 resize-none self-center bg-transparent px-1 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      {onVoice && !canSend && !streaming && (
        <button
          type="button"
          onClick={onVoice}
          aria-label="Voice input"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          <MicIcon />
        </button>
      )}
      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend && !streaming}
        aria-label={streaming ? "Stop generating" : "Send message"}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity cursor-pointer",
          !canSend && !streaming && "opacity-40 cursor-default"
        )}
      >
        {streaming ? <StopIcon /> : <ArrowUpIcon />}
      </button>
    </div>
  );
}

export function PreviewPromptInputDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <div className="w-full max-w-sm space-y-3">
      {messages.map((m, i) => (
        <div key={i} className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">{m}</div>
        </div>
      ))}
      <PreviewPromptInput placeholder="Ask anything..." onSend={(t) => setMessages((prev) => [...prev, t])} />
    </div>
  );
}

export function PreviewPromptInputStreamingDemo() {
  const [streaming, setStreaming] = useState(false);
  useEffect(() => {
    if (!streaming) return;
    const t = setTimeout(() => setStreaming(false), 5000);
    return () => clearTimeout(t);
  }, [streaming]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <PreviewPromptInput streaming={streaming} onSend={() => setStreaming(true)} onStop={() => setStreaming(false)} />
      <p className="text-xs text-muted-foreground">
        {streaming ? "Streaming — the arrow is now a stop button." : "Send a message to enter the streaming state."}
      </p>
    </div>
  );
}

export function PreviewPromptInputAttachDemo() {
  const [event, setEvent] = useState<string | null>(null);
  return (
    <div className="w-full max-w-sm space-y-2">
      <PreviewPromptInput
        onSend={(t) => setEvent(`onSend("${t}")`)}
        onAttach={() => setEvent("onAttach()")}
        onVoice={() => setEvent("onVoice()")}
      />
      <p className="text-xs text-muted-foreground font-mono">{event ?? "The mic hides once you start typing."}</p>
    </div>
  );
}
