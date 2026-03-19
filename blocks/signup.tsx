import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function SignUpScreen({ onSignIn }: { onSignIn?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">

        {/* Logo */}
        <View className="items-center mb-8">
          <View className="h-16 w-16 rounded-2xl bg-primary items-center justify-center mb-4">
            {/* user-plus icon rendered via accessibilityLabel */}
          </View>
          <Text variant="h2" className="text-center">Create account</Text>
          <Text variant="muted" className="text-center mt-1">
            Start your journey today
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View className="gap-1.5">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View className="gap-1.5">
            <Label>Email</Label>
            <Input
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="gap-1.5">
            <Label>Password</Label>
            <Input
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text variant="small" className="text-muted-foreground">
              Must be at least 8 characters
            </Text>
          </View>

          <Pressable
            className="flex-row items-center gap-2"
            onPress={() => setAgreed(!agreed)}
            accessible={true}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
          >
            <Checkbox checked={agreed} onChange={setAgreed} />
            <Text variant="small" className="text-muted-foreground flex-1">
              I agree to the{" "}
              <Text variant="small" className="text-primary font-medium">Terms of Service</Text>
              {" "}and{" "}
              <Text variant="small" className="text-primary font-medium">Privacy Policy</Text>
            </Text>
          </Pressable>

          <Button onPress={() => {}} className="mt-2 h-12 rounded-xl">
            Create Account
          </Button>
        </View>

        {/* Separator */}
        <View className="my-6 flex-row items-center gap-3">
          <Separator className="flex-1" />
          <Text variant="small" className="text-muted-foreground">or continue with</Text>
          <Separator className="flex-1" />
        </View>

        {/* Social Buttons */}
        <View className="flex-row gap-3">
          <Button variant="outline" className="flex-1" onPress={() => {}}>
            Google
          </Button>
          <Button variant="outline" className="flex-1" onPress={() => {}}>
            Apple
          </Button>
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-8 gap-1">
          <Text variant="small" className="text-muted-foreground">
            Already have an account?
          </Text>
          <Pressable onPress={onSignIn} accessible={true} accessibilityRole="link">
            <Text className="text-sm font-medium text-primary">Sign in</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}
