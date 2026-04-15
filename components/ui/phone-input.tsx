import React, { useState, useCallback } from "react";
import { View, TextInput, Pressable, Text, ScrollView, Modal } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

const phoneVariants = cva("flex-row items-center rounded-md border", {
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
});

type Country = { code: string; dial: string; name: string };

const countries: Country[] = [
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "IN", dial: "+91", name: "India" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "BR", dial: "+55", name: "Brazil" },
  { code: "MX", dial: "+52", name: "Mexico" },
];

export interface PhoneInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "onChangeText" | "value">,
    VariantProps<typeof phoneVariants> {
  className?: string;
  defaultCountry?: string;
  value?: string;
  onChangeText?: (fullPhone: string) => void;
}

export function PhoneInput({
  variant, size, className, defaultCountry = "US",
  value = "", onChangeText, ...props
}: PhoneInputProps) {
  const [country, setCountry] = useState(countries.find((c) => c.code === defaultCountry) ?? countries[0]);
  const [open, setOpen] = useState(false);

  // Strip the dial code prefix to get just the number for display
  const rawNumber = value.startsWith(country.dial) ? value.slice(country.dial.length) : value.replace(/^\+\d+/, "");

  const handleChange = useCallback(
    (text: string) => {
      const digits = text.replace(/\D/g, "");
      onChangeText?.(`${country.dial}${digits}`);
    },
    [country, onChangeText]
  );

  return (
    <View className={cn(phoneVariants({ variant, size }), className)}>
      <Pressable
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Country: ${country.name}`}
        className="flex-row items-center me-2 pe-2 border-e border-border min-h-8"
      >
        <Text className="text-foreground text-base">{country.dial}</Text>
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="m6 9 6 6 6-6" />
    </Svg>
      </Pressable>
      <TextInput
        className="flex-1 text-foreground p-0 text-base"
        placeholderTextColor="#71717a"
        keyboardType="phone-pad"
        value={rawNumber}
        onChangeText={handleChange}
        placeholder="Phone number"
        {...props}
      />
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setOpen(false)}>
          <View className="bg-card rounded-t-2xl max-h-80 pb-8">
            <View className="items-center py-3">
              <View className="w-10 h-1 rounded-full bg-muted" />
            </View>
            <ScrollView>
              {countries.map((c) => (
                <Pressable
                  key={c.code}
                  className={cn("flex-row items-center px-5 py-3", c.code === country.code && "bg-accent")}
                  onPress={() => { setCountry(c); setOpen(false); }}
                  accessibilityRole="button"
                >
                  <Text className="text-foreground flex-1">{c.name}</Text>
                  <Text className="text-muted-foreground">{c.dial}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
