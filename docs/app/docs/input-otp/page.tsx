import { Heading } from "@/components/heading";
import { PreviewInputOTP } from "@/components/preview/input-otp";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add input-otp`;
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
  const [focused, setFocused] = useState(-1);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");
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
          style={{
            height: 48, width: 40, borderRadius: 6,
            borderWidth: focused === i ? 2 : 1,
            borderColor: focused === i ? "#18181b" : "#e4e4e7",
            backgroundColor: "#ffffff",
            textAlign: "center", fontSize: 18, fontWeight: "600", color: "#09090b",
          }}
          value={digit}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(-1)}
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
      <PreviewToggle>
        <ComponentPlayground code={defaultCode}>
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-sm font-medium text-foreground">Enter verification code</p>
            <PreviewInputOTP length={6} value="38" />
            <p className="text-xs text-muted-foreground">We sent a code to your email</p>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="input-otp" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Examples */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Examples</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">6-digit verification code</Heading>
        <ComponentPlayground code={defaultCode}>
          <div className="flex flex-col items-center gap-2 w-full">
            <PreviewInputOTP length={6} value="492817" />
          </div>
        </ComponentPlayground>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-4">4-digit PIN</Heading>
        <ComponentPlayground code={fourDigitCode}>
          <div className="flex flex-col items-center gap-2 w-full">
            <PreviewInputOTP length={4} value="1738" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
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
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>OTP code input with individual digit cells.</li>
          <li>Focus moves automatically between cells as digits are entered.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/input-otp.tsx" />
      </div>
    </div>
  );
}
