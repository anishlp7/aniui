"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const plans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    features: ["5 projects", "1GB storage", "Email support"],
    cta: "Current Plan",
    variant: "outline" as const,
    disabled: true,
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$9.99",
    yearlyPrice: "$7.99",
    features: ["Everything in Free", "50 projects", "10GB storage", "Priority support"],
    cta: "Upgrade",
    variant: "default" as const,
    disabled: false,
    highlight: true,
    badge: "Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: "$29.99",
    yearlyPrice: "$24.99",
    features: ["Everything in Pro", "Unlimited projects", "100GB storage", "24/7 support"],
    cta: "Contact Sales",
    variant: "outline" as const,
    disabled: false,
    highlight: false,
  },
];

export function PricingScreen() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center px-5 pt-8 pb-4">
          <Text variant="h2" className="text-center mb-1">Choose a Plan</Text>
          <Text variant="muted" className="text-center mb-5">
            Start free. Scale as you grow.
          </Text>

          <View className="flex-row items-center bg-muted rounded-full p-1">
            <Pressable
              accessible={true}
              accessibilityRole="button"
              onPress={() => setIsYearly(false)}
              className={\`px-5 py-2 rounded-full \${!isYearly ? "bg-background shadow-sm" : ""}\`}
            >
              <Text variant="small" className={\`font-medium \${!isYearly ? "text-foreground" : "text-muted-foreground"}\`}>
                Monthly
              </Text>
            </Pressable>
            <Pressable
              accessible={true}
              accessibilityRole="button"
              onPress={() => setIsYearly(true)}
              className={\`px-5 py-2 rounded-full \${isYearly ? "bg-background shadow-sm" : ""}\`}
            >
              <Text variant="small" className={\`font-medium \${isYearly ? "text-foreground" : "text-muted-foreground"}\`}>
                Yearly
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="px-5 gap-4 pb-10">
          {plans.map((plan) => (
            <View
              key={plan.name}
              className={\`bg-card rounded-2xl border p-5 shadow-sm \${
                plan.highlight ? "border-2 border-primary" : "border-border"
              }\`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text variant="large" className="font-bold">{plan.name}</Text>
                {plan.badge && (
                  <Badge>{plan.badge}</Badge>
                )}
              </View>

              <View className="flex-row items-end gap-1 mb-4">
                <Text variant="h2">
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </Text>
                <Text variant="muted" className="mb-1">/month</Text>
              </View>

              <Separator className="mb-4" />

              <View className="gap-2.5 mb-4">
                {plan.features.map((feature) => (
                  <View key={feature} className="flex-row items-center gap-2">
                    <View className={\`w-4 h-4 rounded-full items-center justify-center \${
                      plan.highlight ? "bg-primary/10" : "bg-muted"
                    }\`}>
                      <Text className={\`text-xs font-bold \${plan.highlight ? "text-primary" : "text-muted-foreground"}\`}>
                        ✓
                      </Text>
                    </View>
                    <Text variant="small" className="text-foreground">{feature}</Text>
                  </View>
                ))}
              </View>

              <Button
                variant={plan.variant}
                className="rounded-xl h-11"
                disabled={plan.disabled}
                accessibilityLabel={\`\${plan.cta} for \${plan.name} plan\`}
              >
                {plan.cta}
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`;

function CheckIcon({ highlight }: { highlight: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke={highlight ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const plans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    perMonth: "/month",
    features: ["5 projects", "1GB storage", "Email support"],
    cta: "Current Plan",
    highlight: false,
    disabled: true,
    badge: null as string | null,
  },
  {
    name: "Pro",
    monthlyPrice: "$9.99",
    yearlyPrice: "$7.99",
    perMonth: "/month",
    features: ["Everything in Free", "50 projects", "10GB storage", "Priority support"],
    cta: "Upgrade",
    highlight: true,
    disabled: false,
    badge: "Popular" as string | null,
  },
  {
    name: "Enterprise",
    monthlyPrice: "$29.99",
    yearlyPrice: "$24.99",
    perMonth: "/month",
    features: ["Everything in Pro", "Unlimited projects", "100GB storage", "24/7 support"],
    cta: "Contact Sales",
    highlight: false,
    disabled: false,
    badge: null as string | null,
  },
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
      <div className="flex justify-center pt-2 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      <div className="flex justify-center pb-2 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function PricingPreview() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="max-h-[600px] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center px-5 pt-6 pb-4">
        <p className="text-xl font-bold text-foreground text-center mb-1">Choose a Plan</p>
        <p className="text-xs text-muted-foreground text-center mb-5">
          Start free. Scale as you grow.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-muted rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                !isYearly
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isYearly
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Yearly
            </button>
          </div>
          {isYearly && (
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium">
              Save 20%
            </span>
          )}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="px-5 pb-6 space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-card rounded-2xl border p-5 shadow-sm ${
              plan.highlight ? "border-2 border-primary" : "border-border"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className="absolute top-4 right-4 text-xs bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full font-medium">
                {plan.badge}
              </span>
            )}

            {/* Plan name */}
            <p className="text-sm font-bold text-foreground mb-2">{plan.name}</p>

            {/* Price */}
            <div className="flex items-end gap-0.5 mb-4">
              <span className="text-2xl font-bold text-foreground leading-none">
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-xs text-muted-foreground mb-0.5">{plan.perMonth}</span>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-border mb-4" />

            {/* Features */}
            <div className="space-y-2 mb-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckIcon highlight={plan.highlight} />
                  <span className="text-xs text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {plan.disabled ? (
              <button
                disabled
                className="w-full h-10 rounded-xl text-xs font-semibold bg-muted text-muted-foreground cursor-not-allowed"
              >
                {plan.cta}
              </button>
            ) : plan.highlight ? (
              <button className="w-full h-10 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                {plan.cta}
              </button>
            ) : (
              <button className="w-full h-10 rounded-xl text-xs font-semibold border border-border bg-background text-foreground hover:bg-accent transition-colors cursor-pointer">
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PricingBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Subscription plan selector with monthly/yearly toggle, feature lists, and highlighted Pro tier.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-lg border border-border p-8">
        <PhoneFrame>
          <PricingPreview />
        </PhoneFrame>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx @aniui/cli add text card button badge separator`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/pricing.tsx" />
      </div>
    </div>
  );
}
