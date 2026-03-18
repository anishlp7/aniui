"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
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
}`;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
      {/* Dynamic island */}
      <div className="flex justify-center pt-3 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div className="px-6 py-5">{children}</div>
      {/* Home indicator */}
      <div className="flex justify-center pb-3 pt-2 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

// SVG Icons
function LockIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailCheckIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="m16 19 2 2 4-4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ForgotPasswordPreview() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <PhoneFrame>
        <div className="flex flex-col items-center justify-center min-h-[420px] text-center">
          {/* Icon circle */}
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
            <MailCheckIcon />
          </div>

          <h3 className="text-[17px] font-bold text-foreground mb-2 leading-snug">
            Check your email
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-7 px-2">
            We&apos;ve sent a password reset link to{" "}
            <span className="text-foreground font-medium">{email || "your email"}</span>
          </p>

          {/* Open Email App button */}
          <button
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity mb-5 shadow-sm"
          >
            Open Email App
          </button>

          {/* Resend link */}
          <p className="text-[12px] text-muted-foreground mb-6">
            Didn&apos;t receive the email?{" "}
            <button
              onClick={() => setSent(false)}
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              Resend
            </button>
          </p>

          {/* Back to sign in */}
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeftIcon />
            Back to sign in
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col justify-center min-h-[420px]">
        {/* Icon circle */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-foreground shadow-sm">
            <LockIcon />
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-[19px] font-bold text-center text-foreground mb-1.5 tracking-tight">
          Reset password
        </h2>
        <p className="text-[13px] text-muted-foreground text-center mb-7 leading-relaxed px-1">
          Enter your email and we&apos;ll send you a reset link
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-foreground tracking-wide uppercase">
              Email address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <MailIcon />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-background pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow shadow-sm"
              />
            </div>
          </div>

          <button
            onClick={() => setSent(true)}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity shadow-sm"
          >
            Send Reset Link
          </button>
        </div>

        {/* Back link */}
        <div className="flex justify-center mt-7">
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeftIcon />
            Back to sign in
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function ForgotPasswordBlockPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Forgot Password</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Password reset flow with two states — email input form and a confirmation screen
          prompting the user to check their inbox.
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-2xl border border-border p-10 shadow-sm">
        <ForgotPasswordPreview />
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Installation</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Add the required components to your project.
        </p>
        <CodeBlock code={`npx aniui add button input text label`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
            react-native-safe-area-context
          </code>{" "}
          for <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">SafeAreaView</code>.
        </p>
      </div>

      {/* Usage */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Usage</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The component manages its own state internally. Pass an optional{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">onBack</code> handler to
          navigate back to sign in.
        </p>
        <CodeBlock
          code={`import { ForgotPasswordScreen } from "@/screens/forgot-password";

// In your navigator:
<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />`}
        />
      </div>

      {/* Source */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/forgot-password.tsx" />
      </div>
    </div>
  );
}
