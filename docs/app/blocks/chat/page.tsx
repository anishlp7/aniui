"use client";

import React, { useState, useRef, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState, useRef } from "react";
import { View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
};

const initialMessages: Message[] = [
  { id: "1", text: "Hey! How's the project going?", sender: "them", time: "10:30 AM" },
  { id: "2", text: "Going great! Just finished the UI.", sender: "me", time: "10:31 AM" },
  { id: "3", text: "Awesome! Can you share the designs?", sender: "them", time: "10:32 AM" },
  { id: "4", text: "Sure, sending them now", sender: "me", time: "10:33 AM" },
];

export function ChatScreen({ onBack }: { onBack?: () => void }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  function sendMessage() {
    if (!draft.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text: draft.trim(), sender: "me", time },
    ]);
    setDraft("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-border gap-3">
          <Pressable
            onPress={onBack}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="min-h-12 min-w-12 items-center justify-center rounded-full"
          >
            {/* arrow-left */}
            <View className="h-8 w-8 items-center justify-center">
              {/* inline SVG not available in RN — use a Text chevron or react-native-svg */}
              <Text className="text-lg text-foreground">‹</Text>
            </View>
          </Pressable>
          <Avatar fallback="SK" size="sm" />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">Sarah K.</Text>
            <View className="flex-row items-center gap-1">
              <View className="h-2 w-2 rounded-full bg-green-500" />
              <Text className="text-xs text-muted-foreground">Online</Text>
            </View>
          </View>
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Call Sarah"
            className="min-h-12 min-w-12 items-center justify-center rounded-full"
          >
            <View className="h-8 w-8 items-center justify-center">
              <Text className="text-base text-foreground">📞</Text>
            </View>
          </Pressable>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 py-3"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={\`mb-3 \${msg.sender === "me" ? "items-end" : "items-start"}\`}
            >
              <View
                className={\`max-w-[75%] rounded-2xl px-4 py-2.5 \${
                  msg.sender === "me"
                    ? "bg-primary rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                }\`}
              >
                <Text
                  className={\`text-sm leading-relaxed \${
                    msg.sender === "me" ? "text-primary-foreground" : "text-foreground"
                  }\`}
                >
                  {msg.text}
                </Text>
              </View>
              <Text className="text-xs text-muted-foreground mt-1 px-1">{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View className="flex-row items-center gap-2 px-4 py-3 border-t border-border">
          <Input
            className="flex-1 rounded-full"
            placeholder="Type a message..."
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable
            onPress={sendMessage}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            className="min-h-12 min-w-12 h-11 w-11 rounded-full bg-primary items-center justify-center"
          >
            <Text className="text-primary-foreground text-base font-semibold">↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}`;

type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
};

const initialMessages: Message[] = [
  { id: "1", text: "Hey! How's the project going?", sender: "them", time: "10:30 AM" },
  { id: "2", text: "Going great! Just finished the UI.", sender: "me", time: "10:31 AM" },
  { id: "3", text: "Awesome! Can you share the designs?", sender: "them", time: "10:32 AM" },
  { id: "4", text: "Sure, sending them now", sender: "me", time: "10:33 AM" },
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
      <div className="flex justify-center pt-2 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      <div className="flex justify-center pb-2 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function ChatPreview() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!draft.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text: draft.trim(), sender: "me", time },
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col h-[580px]">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border bg-background/95 backdrop-blur-sm">
        {/* Back button */}
        <button
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors cursor-pointer shrink-0 text-foreground"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0 ring-2 ring-primary/20">
          SK
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight truncate">Sarah K.</p>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <p className="text-[10px] text-muted-foreground leading-none">Online</p>
          </div>
        </div>

        {/* Phone button */}
        <button
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors cursor-pointer shrink-0 text-foreground"
          aria-label="Call Sarah"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                msg.sender === "me"
                  ? "bg-primary rounded-br-sm"
                  : "bg-muted rounded-bl-sm"
              }`}
            >
              <p
                className={`text-xs leading-relaxed ${
                  msg.sender === "me" ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {msg.text}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-background/95 backdrop-blur-sm">
        <input
          type="text"
          placeholder="Type a message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          className="flex-1 h-9 rounded-full border border-input bg-muted px-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
        />
        <button
          onClick={sendMessage}
          className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all text-primary-foreground shadow-sm"
          aria-label="Send message"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ChatBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat</h1>
        <p className="text-muted-foreground text-lg">
          A messaging screen with incoming and outgoing bubbles, a live-typing input bar, and an online status header.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-lg border border-border p-8">
        <PhoneFrame>
          <ChatPreview />
        </PhoneFrame>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx @aniui/cli add text avatar input`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">react-native-safe-area-context</code> for SafeAreaView.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Copy this screen into your app. Pass an <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">onBack</code> callback to wire up your navigator&apos;s back action.
        </p>
        <CodeBlock code={`import { ChatScreen } from "@/screens/chat";

// In your navigator:
<Stack.Screen name="Chat" component={ChatScreen} />`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/chat.tsx" />
      </div>
    </div>
  );
}
