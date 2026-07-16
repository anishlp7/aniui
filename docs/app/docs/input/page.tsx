import { Heading } from "@/components/heading";
import { PreviewInput, PreviewInputLeadingIcon, PreviewInputTrailingIcon, PreviewInputPasswordToggle } from "@/components/preview/input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add input`;
const usageCode = `import { Input } from "@/components/ui/input";

export function MyScreen() {
  return (
    <Input placeholder="Enter your email..." />
  );
}`;
const variantsCode = `<Input variant="default" placeholder="Default input" />
<Input variant="ghost" placeholder="Ghost input" />`;
const sizesCode = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;
const leadingIconCode = `import { Input } from "@/components/ui/input";
import { Search } from "lucide-react-native";

<Input
  leadingIcon={<Search size={18} color="#71717a" />}
  placeholder="Search..."
/>`;
const trailingIconCode = `import { Input } from "@/components/ui/input";
import { Pressable } from "react-native";
import { XCircle } from "lucide-react-native";

<Input
  trailingIcon={
    <Pressable onPress={() => setValue("")}>
      <XCircle size={18} color="#71717a" />
    </Pressable>
  }
  placeholder="Type something..."
  value={value}
/>`;
const passwordCode = `import { Input } from "@/components/ui/input";
import { Pressable } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

const [visible, setVisible] = useState(false);

<Input
  secureTextEntry={!visible}
  trailingIcon={
    <Pressable onPress={() => setVisible(!visible)}>
      {visible ? <EyeOff size={18} color="#71717a" /> : <Eye size={18} color="#71717a" />}
    </Pressable>
  }
  placeholder="Password"
/>`;
const refCode = `import { useRef } from "react";
import { TextInput } from "react-native";
import { Input } from "@/components/ui/input";

export function MyScreen() {
  const inputRef = useRef<TextInput>(null);

  return (
    <Input
      ref={inputRef}
      placeholder="Enter your email..."
      onSubmitEditing={() => inputRef.current?.blur()}
    />
  );
}

// Anywhere — e.g. after a button press:
//   inputRef.current?.focus();
//   inputRef.current?.blur();
//   inputRef.current?.clear();`;
const sourceCode = `import React from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Padding lives on the wrapping View, never on the raw TextInput — a TextInput
// doesn't honor \`px-*\` reliably, so keeping padding on the View gives a
// consistent inset with or without icons, under both NativeWind and Uniwind.
const inputVariants = cva(
  "flex-row items-center rounded-md border py-2",
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
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const fontSizes = { sm: 14, md: 16, lg: 18 } as const;

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  className?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(function Input(
  { variant, size, className, leadingIcon, trailingIcon, style, ...props },
  ref
) {
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  const resolvedSize = size ?? "md";

  return (
    <View className={cn(inputVariants({ variant, size }), className)}>
      {leadingIcon && <View className="me-2">{leadingIcon}</View>}
      <TextInput
        ref={ref}
        // font-size is set inline (no lineHeight) so the cursor stays centered
        // on iOS while the size still matches the variant on every platform.
        // self-stretch makes the TextInput fill the row height so taps on the
        // wrapper's vertical padding still focus the field.
        className="flex-1 self-stretch p-0 text-foreground placeholder:text-muted-foreground"
        style={[{ fontSize: fontSizes[resolvedSize] }, style]}
        textAlignVertical="center"
        placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
        keyboardAppearance={dark ? "dark" : "light"}
        selectionColor={caret}
        cursorColor={caret}
        {...props}
      />
      {trailingIcon && <View className="ms-2">{trailingIcon}</View>}
    </View>
  );
});`;
export default function InputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Text input with variants and states.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap items-center gap-4 w-full max-w-sm">
            <PreviewInput placeholder="Enter your email..." />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="input" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Password Toggle */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Password Toggle</Heading>
        <p className="text-sm text-muted-foreground">Show/hide password with a trailing eye icon.</p>
        <ComponentPlayground code={passwordCode}>
          <div className="w-full max-w-sm">
            <PreviewInputPasswordToggle />
          </div>
        </ComponentPlayground>
      </div>
      {/* Clear Button */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Clear Button</Heading>
        <p className="text-sm text-muted-foreground">Add a pressable clear icon to reset the input value.</p>
        <ComponentPlayground code={trailingIconCode}>
          <div className="w-full max-w-sm">
            <PreviewInputTrailingIcon />
          </div>
        </ComponentPlayground>
      </div>
      {/* Leading Icon */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Leading Icon</Heading>
        <p className="text-sm text-muted-foreground">Add an icon before the input text.</p>
        <ComponentPlayground code={leadingIconCode}>
          <div className="w-full max-w-sm">
            <PreviewInputLeadingIcon />
          </div>
        </ComponentPlayground>
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Variants</Heading>
        <ComponentPlayground code={variantsCode}>
          <div className="space-y-3 w-full max-w-sm">
            <PreviewInput variant="default" placeholder="Default input" />
            <PreviewInput variant="ghost" placeholder="Ghost input" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <div className="space-y-3 w-full max-w-sm">
            <PreviewInput size="sm" placeholder="Small" />
            <PreviewInput size="md" placeholder="Medium" />
            <PreviewInput size="lg" placeholder="Large" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Refs */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Refs</Heading>
        <p className="text-sm text-muted-foreground">
          The ref is forwarded to the underlying React Native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code>, so you can call <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">focus()</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">blur()</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">clear()</code> imperatively. Same applies to Textarea, PasswordInput, SearchBar, MaskedInput, PhoneInput, and NumberInput.
        </p>
        <CodeBlock code={refCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"ghost\"", default: "\"default\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "leadingIcon", type: "React.ReactNode", default: "\u2014" },
          { name: "trailingIcon", type: "React.ReactNode", default: "\u2014" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props from React Native, and forwards <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ref</code> to the underlying TextInput.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole</code> is set on the underlying <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code>.</li>
          <li>Placeholder text color uses the theme variable for consistent contrast.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/input.tsx" />
      </div>
    </div>
  );
}
