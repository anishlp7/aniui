import React, { useState, useRef } from "react";
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
              className={`mb-3 ${msg.sender === "me" ? "items-end" : "items-start"}`}
            >
              <View
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  msg.sender === "me"
                    ? "bg-primary rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                }`}
              >
                <Text
                  className={`text-sm leading-relaxed ${
                    msg.sender === "me" ? "text-primary-foreground" : "text-foreground"
                  }`}
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
}
