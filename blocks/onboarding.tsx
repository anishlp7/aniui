import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Welcome",
    description: "Discover a new way to manage your tasks and boost productivity.",
    icon: (
      <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
        <Path
          d="M32 4C32 4 20 16 20 32c0 6.627 5.373 12 12 12s12-5.373 12-12C44 16 32 4 32 4z"
          stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <Path d="M20 40l-8 8M44 40l8 8" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
        <Circle cx="32" cy="32" r="4" fill="hsl(var(--primary))" />
      </Svg>
    ),
  },
  {
    title: "Stay Focused",
    description: "Set goals, track progress, and achieve more every day.",
    icon: (
      <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
        <Circle cx="32" cy="32" r="28" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <Circle cx="32" cy="32" r="18" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <Circle cx="32" cy="32" r="8" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <Circle cx="32" cy="32" r="3" fill="hsl(var(--primary))" />
        <Path d="M32 4v8M32 52v8M4 32h8M52 32h8" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      </Svg>
    ),
  },
  {
    title: "Connect",
    description: "Collaborate with your team and share updates in real-time.",
    icon: (
      <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
        <Circle cx="20" cy="24" r="8" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <Circle cx="44" cy="24" r="8" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <Path d="M4 52c0-8.837 7.163-16 16-16h4" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
        <Path d="M60 52c0-8.837-7.163-16-16-16h-4" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
        <Path d="M24 36h16" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      </Svg>
    ),
  },
];

export function OnboardingScreen({ onFinish }: { onFinish?: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;
  const current = steps[step];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-between px-6 py-8">
        {/* Skip */}
        <View className="items-end">
          <Pressable
            onPress={() => setStep(steps.length - 1)}
            accessible={true}
            accessibilityRole="button"
          >
            <Text className="text-sm text-muted-foreground">Skip</Text>
          </Pressable>
        </View>

        {/* Slide content */}
        <View className="flex-1 items-center justify-center gap-8">
          <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center">
            {current.icon}
          </View>
          <View className="items-center gap-3">
            <Text variant="h2" className="text-center">{current.title}</Text>
            <Text variant="muted" className="text-center px-4">
              {current.description}
            </Text>
          </View>
        </View>

        {/* Dots */}
        <View className="flex-row justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full ${
                i === step ? "w-8 bg-primary" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </View>

        {/* Next / Get Started */}
        <Button
          className="h-12 rounded-xl"
          onPress={() => {
            if (isLast) {
              onFinish?.();
            } else {
              setStep((s) => s + 1);
            }
          }}
        >
          {isLast ? "Get Started" : "Next"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
