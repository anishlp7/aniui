"use client";

import React, { useState } from "react";

type Msg = { text: string; sent: boolean; time: string };

const initial: Msg[] = [
  { text: "Hey, how are you?", sent: false, time: "2:30 PM" },
  { text: "I'm doing great, thanks!", sent: true, time: "2:31 PM" },
];

export function PreviewChatBubbleDemo() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages([...messages, { text: input.trim(), sent: true, time }]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {messages.map((m, i) => (
        <div key={i} className={`${m.sent ? "self-end" : "self-start"} max-w-[80%] rounded-2xl ${m.sent ? "rounded-br-sm bg-primary" : "rounded-bl-sm bg-secondary"} px-4 py-2.5`}>
          <p className={`text-sm ${m.sent ? "text-primary-foreground" : "text-secondary-foreground"}`}>{m.text}</p>
          <span className={`text-[10px] mt-1 block ${m.sent ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>{m.time}</span>
        </div>
      ))}
      <div className="flex gap-2 mt-1">
        <input className="flex-1 min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <button onClick={send} className="px-4 min-h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:bg-primary/90">Send</button>
      </div>
    </div>
  );
}
