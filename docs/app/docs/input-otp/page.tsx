"use client";

import { PreviewInputOTP } from "@/components/preview/input-otp";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add input-otp`;

const usageCode = `import { InputOTP } from "@/components/ui/input-otp";
import { useState } from "react";

export function MyScreen() {
  const [otp, setOtp] = useState("");

  return (
    <InputOTP
      length={6}
      value={otp}
      onValueChange={setOtp}
    />
  );
}`;

const defaultCode = `<InputOTP length={6} value={otp} onValueChange={setOtp} />`;

const fourDigitCode = `<InputOTP length={4} value={pin} onValueChange={setPin} />`;

const sourceCode = `import React, { useRef, useState } from "react";
import { View, TextInput } from "react-native";
import { cn } from "@/lib/utils";

export interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function InputOTP({ length = 6, value = "", onValueChange, className, ...props }: InputOTPProps) {
  const refs = useRef<(TextInput | null)[]>([]);
  const [focused, setFocused] = useState(0);
  const digits = value.padEnd(length, "").slice(0, length).split("");

  const handleChange = (text: string, index: number) => {
    const char = text.slice(-1);
    const next = [...digits];
    next[index] = char;
    onValueChange?.(next.join(""));
    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View className={cn("flex-row gap-2", className)} accessibilityRole="none" {...props}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={cn(
            "h-12 w-10 rounded-md border text-center text-lg font-semibold text-foreground bg-background",
            focused === i ? "border-ring" : "border-input"
          )}
          value={digit}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          onFocus={() => setFocused(i)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          accessible={true}
          accessibilityLabel={\`Digit \${i + 1} of \${length}\`}
        />
      ))}
    </View>
  );
}`;

export default function InputOtpPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">InputOTP</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A one-time password input component with auto-focus and backspace navigation.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={defaultCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewInputOTP />
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Examples</h2>

        <h3 className="text-lg font-medium text-foreground">Default (6-digit)</h3>
        <ComponentPlayground code={defaultCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewInputOTP />
          </div>
        </ComponentPlayground>

        <h3 className="text-lg font-medium text-foreground">4-digit OTP</h3>
        <ComponentPlayground code={fourDigitCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewInputOTP length={4} />
          </div>
        </ComponentPlayground>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">length</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">6</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">{`""`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(value: string) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/input-otp.tsx" />
      </div>
    </div>
  );
}
