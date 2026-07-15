"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewWaveform } from "@/components/preview/waveform";

function PlusIcon() {
  return <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
}
function ChevronDownIcon() {
  return <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>;
}
function MicIcon() {
  return <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>;
}
function AudioLinesIcon() {
  return <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3" /></svg>;
}
function ArrowUpIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7M12 19V5" /></svg>;
}
function StopIcon() {
  return <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>;
}
function XIcon() {
  return <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
}
function CheckIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
}

function ToolbarButton({ label, onClick, className, children }: {
  label: string; onClick?: () => void; className?: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn("flex h-9 min-w-9 shrink-0 items-center justify-center gap-1 rounded-full px-2 text-zinc-500 hover:bg-accent transition-colors cursor-pointer dark:text-zinc-400", className)}
    >
      {children}
    </button>
  );
}

export interface PreviewPromptInputProps {
  className?: string;
  placeholder?: string;
  onSend?: (text: string) => void;
  onStop?: () => void;
  streaming?: boolean;
  clearOnSend?: boolean;
  /** Renders the full Claude-style toolbar (+, model selector, mic, voice fallback). */
  fullToolbar?: boolean;
  /** Wired to the + button — e.g. opens an attachment sheet. */
  onAttach?: () => void;
}

// Web mimic of the compound composer: auto-growing textarea on top, action
// toolbar below. The trailing voice icon becomes a send arrow while typing.
export function PreviewPromptInput({
  className, placeholder = "How can I help you today?", onSend, onStop, streaming, clearOnSend = true, fullToolbar, onAttach,
}: PreviewPromptInputProps) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const canSend = text.trim().length > 0;

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
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
    <div className={cn("w-full max-w-sm rounded-3xl border border-input bg-background px-3 pt-3 pb-2", className)}>
      <textarea
        ref={ref}
        rows={1}
        value={text}
        placeholder={placeholder}
        onChange={(e) => { setText(e.target.value); resize(); }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
        }}
        className="max-h-[120px] w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <div className="flex items-center gap-1 pt-2">
        <ToolbarButton label="Add attachment" onClick={onAttach}><PlusIcon /></ToolbarButton>
        <div className="flex-1" />
        {fullToolbar && (
          <>
            <ToolbarButton label="Choose model" className="px-2">
              <span className="text-xs">Opus 4.8</span>
              <ChevronDownIcon />
            </ToolbarButton>
            <ToolbarButton label="Dictate"><MicIcon /></ToolbarButton>
          </>
        )}
        {!canSend && !streaming && fullToolbar ? (
          <ToolbarButton label="Voice mode"><AudioLinesIcon /></ToolbarButton>
        ) : (
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
        )}
      </div>
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
      <PreviewPromptInput fullToolbar onSend={(t) => setMessages((prev) => [...prev, t])} />
      <p className="text-xs text-muted-foreground">Type to swap the voice icon for the send arrow.</p>
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

export function PreviewPromptInputRecordingDemo() {
  const [recording, setRecording] = useState(false);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="rounded-3xl border border-input bg-background px-3 pt-3 pb-2">
        <textarea
          rows={1}
          readOnly
          placeholder={recording ? "Listening…" : "How can I help you today?"}
          className="w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center gap-1 pt-2">
          {recording ? (
            <>
              <PreviewWaveform active size="sm" className="flex-1 px-2" />
              <ToolbarButton label="Cancel recording" onClick={() => setRecording(false)}><XIcon /></ToolbarButton>
              <ToolbarButton
                label="Finish recording"
                onClick={() => setRecording(false)}
                className="w-9 bg-primary text-primary-foreground hover:bg-primary/90 dark:text-primary-foreground"
              >
                <CheckIcon />
              </ToolbarButton>
            </>
          ) : (
            <>
              <ToolbarButton label="Record voice message" onClick={() => setRecording(true)}><MicIcon /></ToolbarButton>
              <div className="flex-1" />
              <button
                type="button"
                disabled
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-40"
              >
                <ArrowUpIcon />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {recording ? "Recording — X cancels, the check confirms." : "Tap the mic to enter the recording state."}
      </p>
    </div>
  );
}

// Web mimic of the ActionSheet pattern: the + button presents a bottom sheet —
// the mobile-friendly attachment menu.
export function PreviewPromptInputAttachDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary/30">
        <div className="absolute inset-x-3 bottom-3">
          <PreviewPromptInput onAttach={() => setOpen(true)} />
        </div>
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            open ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        {/* Bottom sheet */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 rounded-t-2xl bg-background px-4 pb-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "translate-y-full"
          )}
          role="dialog"
          aria-label="Add to your message"
        >
          <div className="mx-auto mb-1 h-1 w-9 rounded-full bg-muted-foreground/40" />
          <p className="py-2 text-center text-sm text-muted-foreground">Add to your message</p>
          {["Add photos", "Take a screenshot", "Files"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setOpen(false)}
              className="w-full border-b border-border py-3 text-center text-sm font-medium text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-1 w-full py-3 text-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Tap + to present the action sheet — the thumb-friendly menu on phones.
      </p>
    </div>
  );
}
