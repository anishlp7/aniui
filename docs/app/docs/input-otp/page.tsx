"use client";
import { PreviewInputOTP } from "@/components/preview/input-otp";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

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
        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-sm font-medium text-foreground">Enter verification code</p>
          <PreviewInputOTP length={6} value="38" />
          <p className="text-xs text-muted-foreground">We sent a code to your email</p>
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
        <h3 className="text-lg font-medium text-foreground">6-digit verification code</h3>
        <ComponentPlayground code={defaultCode}>
          <div className="flex flex-col items-center gap-2 w-full">
            <PreviewInputOTP length={6} value="492817" />
          </div>
        </ComponentPlayground>
        <h3 className="text-lg font-medium text-foreground mt-4">4-digit PIN</h3>
        <ComponentPlayground code={fourDigitCode}>
          <div className="flex flex-col items-center gap-2 w-full">
            <PreviewInputOTP length={4} value="1738" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "length", type: "number", default: "6" },
          { name: "value", type: "string", default: "\"\"" },
          { name: "onValueChange", type: "(value: string) => void" },
          { name: "className", type: "string" },
        ]} />
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