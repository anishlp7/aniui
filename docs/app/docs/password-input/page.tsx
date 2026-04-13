import { PreviewPasswordInputDemo } from "@/components/preview/password-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add password-input`;
const usageCode = `import { PasswordInput } from "@/components/ui/password-input";

export function MyScreen() {
  return (
    <PasswordInput
      placeholder="Enter password"
      showStrength
      onChangeText={(text) => console.log(text)}
    />
  );
}`;
const sourceCode = `import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const passwordVariants = cva(
  "flex-row items-center rounded-md border py-2 text-foreground",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "min-h-9 px-3",
        md: "min-h-12 px-4",
        lg: "min-h-14 px-5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface PasswordInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "secureTextEntry">,
    VariantProps<typeof passwordVariants> {
  className?: string;
  showStrength?: boolean;
}

function getStrength(value: string): number {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

const strengthColors = ["bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

export function PasswordInput({
  variant,
  size,
  className,
  showStrength,
  onChangeText,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const strength = getStrength(value);

  return (
    <View className="gap-2">
      <View className={cn(passwordVariants({ variant, size }), className)}>
        <TextInput
          className="flex-1 text-foreground p-0 text-base"
          placeholderTextColor="hsl(240 3.8% 46.1%)"
          secureTextEntry={!visible}
          onChangeText={(text) => { setValue(text); onChangeText?.(text); }}
          accessibilityLabel="Password"
          {...props}
        />
        <Pressable
          onPress={() => setVisible(!visible)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          className="ml-2 min-h-8 min-w-8 items-center justify-center"
        >
          <Text className="text-muted-foreground text-sm">{visible ? "Hide" : "Show"}</Text>
        </Pressable>
      </View>
      {showStrength && value.length > 0 && (
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row gap-1">
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                className={cn("flex-1 h-1 rounded-full", i < strength ? strengthColors[strength - 1] : "bg-muted")}
              />
            ))}
          </View>
          <Text className="text-xs text-muted-foreground">{strengthLabels[strength - 1] ?? ""}</Text>
        </View>
      )}
    </View>
  );
}`;
export default function PasswordInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Password Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Password input with show/hide toggle and optional strength indicator.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="password-input" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewPasswordInputDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: '"default" | "ghost"', default: '"default"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "showStrength", type: "boolean", default: "false" },
          { name: "className", type: "string", default: "-" },
          { name: "onChangeText", type: "(text: string) => void", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">secureTextEntry</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Secure text entry with show/hide toggle button.</li>
          <li>Toggle button has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> indicating current visibility state.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/password-input.tsx" />
      </div>
    </div>
  );
}
