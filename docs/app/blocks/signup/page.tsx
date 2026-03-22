"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function SignUpScreen({ onSignIn }: { onSignIn?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">

        {/* Logo */}
        <View className="items-center mb-8">
          <View className="h-16 w-16 rounded-2xl bg-primary items-center justify-center mb-4">
            {/* user-plus icon rendered via accessibilityLabel */}
          </View>
          <Text variant="h2" className="text-center">Create account</Text>
          <Text variant="muted" className="text-center mt-1">
            Start your journey today
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View className="gap-1.5">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View className="gap-1.5">
            <Label>Email</Label>
            <Input
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="gap-1.5">
            <Label>Password</Label>
            <Input
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text variant="small" className="text-muted-foreground">
              Must be at least 8 characters
            </Text>
          </View>

          <Pressable
            className="flex-row items-center gap-2"
            onPress={() => setAgreed(!agreed)}
            accessible={true}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
          >
            <Checkbox checked={agreed} onChange={setAgreed} />
            <Text variant="small" className="text-muted-foreground flex-1">
              I agree to the{" "}
              <Text variant="small" className="text-primary font-medium">Terms of Service</Text>
              {" "}and{" "}
              <Text variant="small" className="text-primary font-medium">Privacy Policy</Text>
            </Text>
          </Pressable>

          <Button onPress={() => {}} className="mt-2 h-12 rounded-xl">
            Create Account
          </Button>
        </View>

        {/* Separator */}
        <View className="my-6 flex-row items-center gap-3">
          <Separator className="flex-1" />
          <Text variant="small" className="text-muted-foreground">or continue with</Text>
          <Separator className="flex-1" />
        </View>

        {/* Social Buttons */}
        <View className="flex-row gap-3">
          <Button variant="outline" className="flex-1" onPress={() => {}}>
            Google
          </Button>
          <Button variant="outline" className="flex-1" onPress={() => {}}>
            Apple
          </Button>
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-8 gap-1">
          <Text variant="small" className="text-muted-foreground">
            Already have an account?
          </Text>
          <Pressable onPress={onSignIn} accessible={true} accessibilityRole="link">
            <Text className="text-sm font-medium text-primary">Sign in</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}`;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
      <div className="flex justify-center pt-2 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div className="px-5 py-4">{children}</div>
      <div className="flex justify-center pb-2 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function SignUpPreview() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <PhoneFrame>
      <div className="flex flex-col justify-center min-h-[580px]">

        {/* Logo area */}
        <div className="flex flex-col items-center mb-7">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-sm mb-4">
            <svg
              className="h-7 w-7 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">Create account</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Start your journey today</p>
        </div>

        {/* Form fields */}
        <div className="space-y-3">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Full Name</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
              />
            </div>
            <p className="text-[10px] text-muted-foreground pl-0.5">Must be at least 8 characters</p>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 cursor-pointer pt-0.5">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 h-4 w-4 shrink-0 rounded-md border cursor-pointer transition-colors flex items-center justify-center ${
                agreed ? "bg-primary border-primary" : "border-border bg-background"
              }`}
            >
              {agreed && (
                <svg
                  className="h-3 w-3 text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </button>
            <span className="text-[11px] text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <span className="text-primary font-medium cursor-pointer hover:underline">Terms of Service</span>
              {" "}and{" "}
              <span className="text-primary font-medium cursor-pointer hover:underline">Privacy Policy</span>
            </span>
          </label>

          {/* CTA Button */}
          <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold mt-1 cursor-pointer hover:opacity-90 transition-opacity shadow-sm">
            Create Account
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          <button className="flex-1 h-10 rounded-xl border border-border bg-card text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors flex items-center justify-center gap-2 shadow-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
              <path d="M17.13 17.13A8 8 0 0 1 5.42 5.42" />
            </svg>
            Google
          </button>
          <button className="flex-1 h-10 rounded-xl border border-border bg-card text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors flex items-center justify-center gap-2 shadow-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Apple
          </button>
        </div>

        {/* Sign in link */}
        <p className="text-center mt-5 text-[11px] text-muted-foreground">
          Already have an account?{" "}
          <button className="text-primary font-semibold cursor-pointer hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </PhoneFrame>
  );
}

export default function SignupBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sign Up</h1>
        <p className="text-muted-foreground text-lg">
          Registration screen with name, email, password, terms checkbox, and social sign-up options.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-2xl border border-border p-10">
        <SignUpPreview />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">Installation</h2>
        <CodeBlock code={`npx @aniui/cli add button input text separator label checkbox`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires <code className="text-foreground font-mono text-xs bg-muted px-1.5 py-0.5 rounded">react-native-safe-area-context</code> for <code className="text-foreground font-mono text-xs bg-muted px-1.5 py-0.5 rounded">SafeAreaView</code>.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">Usage</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Copy this screen into your app and wire up form submission and navigation callbacks.
        </p>
        <CodeBlock code={`import { SignUpScreen } from "@/screens/signup";

// In your navigator:
<Stack.Screen name="SignUp" component={SignUpScreen} />`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/signup.tsx" />
      </div>
    </div>
  );
}
