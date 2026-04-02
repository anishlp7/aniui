import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

function DemoButton({ variant = "default", children }: { variant?: "default" | "secondary" | "outline" | "destructive"; children: string }) {
  const base = "items-center justify-center rounded-md px-4 py-2.5 min-h-12";
  const variants = {
    default: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-input bg-background",
    destructive: "bg-destructive",
  };
  const textVariants = {
    default: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    outline: "text-foreground",
    destructive: "text-destructive-foreground",
  };
  return (
    <Pressable className={cn(base, variants[variant])}>
      <Text className={cn("text-sm font-medium", textVariants[variant])}>{children}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ gap: 16, paddingVertical: 24 }}>
        <Text className="text-2xl font-bold text-foreground">AniUI + Uniwind</Text>
        <Text className="text-sm text-muted-foreground">
          This example demonstrates AniUI components running with Uniwind instead of NativeWind.
          Same className API, same theme tokens — different styling engine.
        </Text>

        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text className="text-lg font-semibold text-card-foreground">Buttons</Text>
          <View className="flex-row flex-wrap gap-2">
            <DemoButton>Primary</DemoButton>
            <DemoButton variant="secondary">Secondary</DemoButton>
            <DemoButton variant="outline">Outline</DemoButton>
            <DemoButton variant="destructive">Destructive</DemoButton>
          </View>
        </View>

        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text className="text-lg font-semibold text-card-foreground">Cards</Text>
          <View className="rounded-lg border border-border bg-background p-4">
            <Text className="text-base font-semibold text-foreground">Notification</Text>
            <Text className="text-sm text-muted-foreground mt-1">You have 3 unread messages</Text>
          </View>
        </View>

        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text className="text-lg font-semibold text-card-foreground">Badges</Text>
          <View className="flex-row gap-2">
            {["Default", "Secondary", "Destructive"].map((label) => (
              <View key={label} className={cn(
                "rounded-full px-2.5 py-0.5",
                label === "Destructive" ? "bg-destructive" : label === "Secondary" ? "bg-secondary" : "bg-primary"
              )}>
                <Text className={cn(
                  "text-xs font-medium",
                  label === "Secondary" ? "text-secondary-foreground" : "text-primary-foreground"
                )}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="rounded-lg border border-border bg-muted/30 p-4">
          <Text className="text-xs text-muted-foreground text-center">
            Note: Uniwind uses 16px rem (vs NativeWind's 14px). Components may appear ~14% larger.
          </Text>
        </View>

        <Text className="text-xs text-muted-foreground text-center mt-4">Built with AniUI + Uniwind</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
