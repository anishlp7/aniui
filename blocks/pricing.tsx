import React, { useState } from "react";
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
              className={`px-5 py-2 rounded-full ${!isYearly ? "bg-background shadow-sm" : ""}`}
            >
              <Text variant="small" className={`font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </Text>
            </Pressable>
            <Pressable
              accessible={true}
              accessibilityRole="button"
              onPress={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full ${isYearly ? "bg-background shadow-sm" : ""}`}
            >
              <Text variant="small" className={`font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
                Yearly
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="px-5 gap-4 pb-10">
          {plans.map((plan) => (
            <View
              key={plan.name}
              className={`bg-card rounded-2xl border p-5 shadow-sm ${
                plan.highlight ? "border-2 border-primary" : "border-border"
              }`}
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
                    <View className={`w-4 h-4 rounded-full items-center justify-center ${
                      plan.highlight ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Text className={`text-xs font-bold ${plan.highlight ? "text-primary" : "text-muted-foreground"}`}>
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
                accessibilityLabel={`${plan.cta} for ${plan.name} plan`}
              >
                {plan.cta}
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
