"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add masked-input`;
const usageCode = `import { MaskedInput } from "@/components/ui/masked-input";

export function MyScreen() {
  return (
    <View className="gap-4">
      {/* Credit card preset */}
      <MaskedInput
        preset="credit-card"
        placeholder="1234 5678 9012 3456"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
      {/* Phone preset */}
      <MaskedInput
        preset="phone"
        placeholder="(555) 123-4567"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
      {/* Date preset */}
      <MaskedInput
        preset="date"
        placeholder="MM/DD/YYYY"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
      {/* Custom mask */}
      <MaskedInput
        mask="###-##-####"
        placeholder="SSN"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
    </View>
  );
}`;
const sourceCode = `import React, { useCallback } from "react";
import { TextInput } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const maskedVariants = cva(
  "rounded-md border py-2 text-foreground placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "min-h-9 px-3 text-sm",
        md: "min-h-12 px-4 text-base",
        lg: "min-h-14 px-5 text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type MaskPreset = "credit-card" | "phone" | "date";

const masks: Record<MaskPreset, string> = {
  "credit-card": "#### #### #### ####",
  phone: "(###) ###-####",
  date: "##/##/####",
};

function applyMask(raw: string, mask: string): string {
  const digits = raw.replace(/\\D/g, "");
  let result = "";
  let digitIdx = 0;
  for (let i = 0; i < mask.length && digitIdx < digits.length; i++) {
    if (mask[i] === "#") {
      result += digits[digitIdx++];
    } else {
      result += mask[i];
    }
  }
  return result;
}

export interface MaskedInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "onChangeText">,
    VariantProps<typeof maskedVariants> {
  className?: string;
  mask?: string;
  preset?: MaskPreset;
  onChangeText?: (masked: string, raw: string) => void;
}

export function MaskedInput({
  variant,
  size,
  className,
  mask: customMask,
  preset,
  onChangeText,
  ...props
}: MaskedInputProps) {
  const maskPattern = customMask ?? (preset ? masks[preset] : "");

  const handleChange = useCallback(
    (text: string) => {
      if (!maskPattern) {
        onChangeText?.(text, text);
        return;
      }
      const raw = text.replace(/\\D/g, "");
      const masked = applyMask(raw, maskPattern);
      onChangeText?.(masked, raw);
    },
    [maskPattern, onChangeText]
  );

  return (
    <TextInput
      className={cn(maskedVariants({ variant, size }), className)}
      placeholderTextColor="hsl(240 3.8% 46.1%)"
      keyboardType="number-pad"
      onChangeText={handleChange}
      {...props}
    />
  );
}`;
export default function MaskedInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Masked Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Text input with auto-formatting masks for credit cards, phones, and dates.
        </p>
      </div>
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
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: '"default" | "ghost"', default: '"default"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "mask", type: "string", default: "-" },
          { name: "preset", type: '"credit-card" | "phone" | "date"', default: "-" },
          { name: "onChangeText", type: "(masked: string, raw: string) => void", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code>.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/masked-input.tsx" />
      </div>
    </div>
  );
}
