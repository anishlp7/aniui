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
// Use your preferred icon library, e.g. lucide-react-native:
// import { ShieldCheck, Mail, Lock } from "lucide-react-native";

export function LoginScreen({
  onSignUp,
  onForgotPassword,
  onSignIn,
}: {
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onSignIn?: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6 py-8">

        {/* Logo area */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-4 shadow-sm">
            {/* <ShieldCheck size={32} color="white" strokeWidth={1.5} /> */}
          </View>
          <Text variant="h2" className="text-center font-bold">
            Welcome back
          </Text>
          <Text variant="muted" className="text-center mt-1">
            Sign in to your account
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View className="gap-1.5">
            <Label>Email address</Label>
            <View className="relative">
              {/* <Mail size={16} color="gray" className="absolute left-3 top-3.5 z-10" /> */}
              <Input
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                className="pl-10"
              />
            </View>
          </View>

          <View className="gap-1.5">
            <View className="flex-row justify-between items-center">
              <Label>Password</Label>
              <Pressable onPress={onForgotPassword} accessible accessibilityRole="button">
                <Text className="text-sm font-medium text-primary">
                  Forgot password?
                </Text>
              </Pressable>
            </View>
            <View className="relative">
              {/* <Lock size={16} color="gray" className="absolute left-3 top-3.5 z-10" /> */}
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                className="pl-10"
              />
            </View>
          </View>

          <Button
            onPress={() => onSignIn?.(email, password)}
            className="mt-2 h-12 rounded-xl"
            accessible
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            Sign In
          </Button>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3 my-6">
          <Separator className="flex-1" />
          <Text variant="small" className="text-muted-foreground">
            or continue with
          </Text>
          <Separator className="flex-1" />
        </View>

        {/* Social buttons */}
        <View className="flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onPress={() => {}}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Sign in with Google"
          >
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onPress={() => {}}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Sign in with Apple"
          >
            Apple
          </Button>
        </View>

        {/* Sign up link */}
        <View className="flex-row justify-center items-center mt-8 gap-1">
          <Text variant="small" className="text-muted-foreground">
            Don\\'t have an account?
          </Text>
          <Pressable onPress={onSignUp} accessible accessibilityRole="button">
            <Text className="text-sm font-semibold text-primary">Sign up</Text>
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

function LoginPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PhoneFrame>
      <div className="flex flex-col justify-center min-h-[520px] py-2">

        {/* Logo area */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-sm">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Email address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg
                  width="15"
                  height="15"
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
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-input bg-muted/40 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Password
              </label>
              <button className="text-xs font-medium text-primary hover:underline cursor-pointer">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-input bg-muted/40 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
              />
            </div>
          </div>

          <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold mt-1 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] font-medium text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social buttons */}
        <div className="flex gap-2.5">
          <button className="flex-1 h-11 rounded-xl border border-input bg-card text-sm font-medium text-foreground cursor-pointer hover:bg-muted/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button className="flex-1 h-11 rounded-xl border border-input bg-card text-sm font-medium text-foreground cursor-pointer hover:bg-muted/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm">
            <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-109.7C79.9 748.8 30.2 637.5 30.2 532c0-166.7 108.1-254.9 214.2-254.9 60.9 0 112.1 39.9 149.7 39.9 37.6 0 96.7-42.2 163.7-42.2 24.7 0 106.1 2.6 162.7 111.4zm-137.9-207.8c30.5-36.1 52.2-86.3 52.2-136.5 0-7.1-.7-14.3-2.1-20.7-50.3 1.9-109.2 33.5-144.7 74.7-28.1 31.7-54.8 81.9-54.8 133.1 0 8.4 1.3 16.8 1.9 19.4 3.2.5 8.4 1.3 13.6 1.3 44.8 0 100.3-30.1 134-71.3z" />
            </svg>
            Apple
          </button>
        </div>

        {/* Sign up */}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button className="text-primary font-semibold cursor-pointer hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </PhoneFrame>
  );
}

export default function LoginBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Login</h1>
        <p className="text-muted-foreground text-lg">
          A complete login screen with email/password inputs, social sign-in buttons, and navigation links.
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center items-center bg-muted/30 rounded-2xl border border-border p-10 min-h-[640px]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        <LoginPreview />
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-1">Installation</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Install the required AniUI components using the CLI.
        </p>
        <CodeBlock code={`npx @aniui/cli add button input text separator label`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">react-native-safe-area-context</code> for <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">SafeAreaView</code>.
        </p>
      </div>

      {/* Usage */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-1">Usage</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Copy this screen into your app and wire up the handlers. Compatible with React Navigation and Expo Router.
        </p>
        <CodeBlock code={`import { LoginScreen } from "@/screens/login";

// Expo Router (app/login.tsx):
export default function LoginPage() {
  const router = useRouter();
  return (
    <LoginScreen
      onSignIn={(email, password) => { /* call your auth */ }}
      onSignUp={() => router.push("/signup")}
      onForgotPassword={() => router.push("/forgot-password")}
    />
  );
}`} />
      </div>

      {/* Source */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-1">Source</h2>
        <p className="text-sm text-muted-foreground mb-3">
          The full screen source. Copy it to <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">screens/login.tsx</code> and customize to fit your app.
        </p>
        <CodeBlock code={rnCode} title="screens/login.tsx" />
      </div>
    </div>
  );
}
