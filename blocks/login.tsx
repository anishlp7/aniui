import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
// Use your preferred icon library, e.g. lucide-react-native:
// import { ShieldCheck, Mail, Lock } from "lucide-react-native";

export function LoginScreen({
  onSignUp,
  onForgotPassword,
  onSignIn,
}: {
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onSignIn?: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6 py-8">

        {/* Logo area */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-4 shadow-sm">
            {/* <ShieldCheck size={32} color="white" strokeWidth={1.5} /> */}
          </View>
          <Text variant="h2" className="text-center font-bold">
            Welcome back
          </Text>
          <Text variant="muted" className="text-center mt-1">
            Sign in to your account
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View className="gap-1.5">
            <Label>Email address</Label>
            <View className="relative">
              {/* <Mail size={16} color="gray" className="absolute left-3 top-3.5 z-10" /> */}
              <Input
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                className="pl-10"
              />
            </View>
          </View>

          <View className="gap-1.5">
            <View className="flex-row justify-between items-center">
              <Label>Password</Label>
              <Pressable onPress={onForgotPassword} accessible accessibilityRole="button">
                <Text className="text-sm font-medium text-primary">
                  Forgot password?
                </Text>
              </Pressable>
            </View>
            <View className="relative">
              {/* <Lock size={16} color="gray" className="absolute left-3 top-3.5 z-10" /> */}
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                className="pl-10"
              />
            </View>
          </View>

          <Button
            onPress={() => onSignIn?.(email, password)}
            className="mt-2 h-12 rounded-xl"
            accessible
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            Sign In
          </Button>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3 my-6">
          <Separator className="flex-1" />
          <Text variant="small" className="text-muted-foreground">
            or continue with
          </Text>
          <Separator className="flex-1" />
        </View>

        {/* Social buttons */}
        <View className="flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onPress={() => {}}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Sign in with Google"
          >
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onPress={() => {}}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Sign in with Apple"
          >
            Apple
          </Button>
        </View>

        {/* Sign up link */}
        <View className="flex-row justify-center items-center mt-8 gap-1">
          <Text variant="small" className="text-muted-foreground">
            Don't have an account?
          </Text>
          <Pressable onPress={onSignUp} accessible accessibilityRole="button">
            <Text className="text-sm font-semibold text-primary">Sign up</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}
