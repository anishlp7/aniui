"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
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
              className={\`h-2 rounded-full \${
                i === step ? "w-8 bg-primary" : "w-2 bg-primary/20"
              }\`}
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
}`;

// SVG icons for each slide
function RocketIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 6C32 6 18 20 18 34c0 7.732 6.268 14 14 14s14-6.268 14-14C46 20 32 6 32 6z"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 42l-7 7M46 42l7 7"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="34" r="4.5" fill="hsl(var(--primary))" opacity="0.8" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="16" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="6" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="2.5" fill="hsl(var(--primary))" />
      <path d="M32 6v6M32 52v6M6 32h6M52 32h6" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="9" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <circle cx="44" cy="22" r="9" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <path d="M4 54c0-9.941 8.059-18 18-18h4" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 54c0-9.941-8.059-18-18-18h-4" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 36h12" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const slides = [
  {
    icon: <RocketIcon />,
    title: "Welcome",
    description: "Discover a new way to manage your tasks and boost productivity.",
  },
  {
    icon: <TargetIcon />,
    title: "Stay Focused",
    description: "Set goals, track progress, and achieve more every day.",
  },
  {
    icon: <UsersIcon />,
    title: "Connect",
    description: "Collaborate with your team and share updates in real-time.",
  },
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
      <div className="flex justify-center pt-3 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      <div className="flex justify-center pb-3 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function OnboardingPreview() {
  const [step, setStep] = useState(0);
  const isLast = step === slides.length - 1;
  const current = slides[step];

  return (
    <PhoneFrame>
      <div className="flex flex-col justify-between px-5 py-5 min-h-[540px]">
        {/* Skip */}
        <div className="flex justify-end">
          <button
            onClick={() => setStep(slides.length - 1)}
            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Slide content */}
        <div className="flex flex-col items-center justify-center flex-1 gap-7 py-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            {current.icon}
          </div>
          <div className="text-center space-y-2.5">
            <p className="text-xl font-bold text-foreground tracking-tight">{current.title}</p>
            <p className="text-sm text-muted-foreground px-3 leading-relaxed">{current.description}</p>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mb-5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </div>

        {/* Next / Get Started */}
        <button
          onClick={() => {
            if (isLast) {
              setStep(0);
            } else {
              setStep((s) => s + 1);
            }
          }}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all duration-150"
        >
          {isLast ? "Get Started" : "Next"}
        </button>
      </div>
    </PhoneFrame>
  );
}

export default function OnboardingBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Onboarding</h1>
        <p className="text-muted-foreground text-lg">
          A welcome carousel with step indicators, slide content, and a skip option. Drop it in before your main navigator.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-xl border border-border p-10">
        <OnboardingPreview />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx aniui add text button`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires <code>react-native-safe-area-context</code> for SafeAreaView.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Render this screen before your main app navigator. Call <code>onFinish</code> to push users into the app and persist a flag so it only shows once.
        </p>
        <CodeBlock
          code={`import { OnboardingScreen } from "@/screens/onboarding";

// In your root navigator:
<Stack.Screen name="Onboarding" component={OnboardingScreen} />`}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/onboarding.tsx" />
      </div>
    </div>
  );
}
