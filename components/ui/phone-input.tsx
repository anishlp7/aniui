import React, { useState, useCallback } from "react";
import { View, TextInput, Pressable, Text, ScrollView, Modal } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "onChangeText">,
    VariantProps<typeof phoneVariants> {
  className?: string;
  defaultCountry?: string;
  onChangeText?: (phone: string, dial: string, raw: string) => void;
}

export function PhoneInput({
  variant,
  size,
  className,
  defaultCountry = "US",
  onChangeText,
  ...props
}: PhoneInputProps) {
  const [country, setCountry] = useState(countries.find((c) => c.code === defaultCountry) ?? countries[0]);
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (text: string) => {
      const raw = text.replace(/\D/g, "");
      onChangeText?.(`${country.dial}${raw}`, country.dial, raw);
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
        className="flex-row items-center mr-2 pr-2 border-r border-border min-h-8"
      >
        <Text className="text-foreground text-base">{country.dial}</Text>
        <Text className="text-muted-foreground ml-1 text-xs">▼</Text>
      </Pressable>
      <TextInput
        className="flex-1 text-foreground p-0 text-base"
        placeholderTextColor="hsl(var(--muted-foreground))"
        keyboardType="phone-pad"
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
