import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ForgotPasswordScreen({ onBack }: { onBack?: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center px-6 items-center">
          <View className="h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-6">
            {/* Mail check icon */}
            <Text className="text-primary text-2xl">✓</Text>
          </View>

          <Text variant="h3" className="text-center mb-2">
            Check your email
          </Text>
          <Text variant="muted" className="text-center mb-8 px-4">
            We sent a password reset link to{" "}
            <Text className="text-foreground font-medium">{email}</Text>
          </Text>

          <Button className="w-full mb-4">Open Email App</Button>

          <Pressable onPress={() => setSent(false)} accessible accessibilityRole="button">
            <Text variant="muted" className="text-sm text-center">
              Didn&apos;t receive the email?{" "}
              <Text className="text-primary font-semibold text-sm">Resend</Text>
            </Text>
          </Pressable>

          <Pressable onPress={onBack} className="mt-6 flex-row items-center gap-1" accessible accessibilityRole="button">
            <Text className="text-sm font-medium text-primary">Back to sign in</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="self-center h-16 w-16 rounded-full bg-muted items-center justify-center mb-6">
          {/* Lock icon placeholder — swap with SVG icon library */}
        </View>

        <Text variant="h2" className="text-center mb-2">
          Reset password
        </Text>
        <Text variant="muted" className="text-center mb-8 px-2">
          Enter your email and we&apos;ll send you a reset link
        </Text>

        <View className="gap-4">
          <View className="gap-1.5">
            <Label>Email address</Label>
            <Input
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <Button onPress={() => setSent(true)} className="w-full">
            Send Reset Link
          </Button>
        </View>

        <Pressable onPress={onBack} className="mt-8 self-center flex-row items-center gap-1" accessible accessibilityRole="button">
          <Text className="text-sm font-medium text-primary">Back to sign in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
