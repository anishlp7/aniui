import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SIZES = ["S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number];

export function ProductDetailScreen() {
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="h-48 bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center relative">
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="absolute top-4 left-4 h-9 w-9 rounded-full bg-background/80 items-center justify-center"
          >
            {/* Back arrow icon */}
            <View className="w-5 h-5 items-center justify-center">
              <View className="w-2.5 h-0.5 bg-foreground rotate-45 translate-y-[1px]" />
              <View className="w-2.5 h-0.5 bg-foreground -rotate-45 -translate-y-[1px]" />
            </View>
          </Pressable>
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Add to wishlist"
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/80 items-center justify-center"
          >
            {/* Heart icon placeholder */}
            <View className="w-5 h-5 items-center justify-center">
              <View className="w-4 h-3 rounded-t-full border border-foreground" />
            </View>
          </Pressable>
        </View>

        <View className="px-5 pt-5 pb-8 gap-4">
          {/* Name */}
          <Text className="text-xl font-bold text-foreground">Classic T-Shirt</Text>

          {/* Price Row */}
          <View className="flex-row items-center gap-2">
            <Text className="text-xl font-bold text-foreground">$29.99</Text>
            <Text className="text-sm text-muted-foreground line-through">$39.99</Text>
            <Badge variant="destructive" className="bg-destructive/10 text-destructive rounded-full">
              -25%
            </Badge>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm text-foreground">4.5</Text>
            <Text className="text-sm text-muted-foreground">(128 reviews)</Text>
          </View>

          {/* Description */}
          <Text className="text-sm text-muted-foreground leading-relaxed">
            A timeless staple made from 100% organic cotton. Soft, breathable, and perfectly
            fitted — wear it dressed up or down. Available in multiple sizes and colors.
          </Text>

          <Separator />

          {/* Size Selector */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Size</Text>
            <View className="flex-row gap-2">
              {SIZES.map((size) => (
                <Pressable
                  key={size}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Size ${size}`}
                  accessibilityState={{ selected: selectedSize === size }}
                  onPress={() => setSelectedSize(size)}
                  className={`min-w-12 h-10 items-center justify-center rounded-xl border px-3 ${
                    selectedSize === size
                      ? "border-primary bg-primary"
                      : "border-border bg-background"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedSize === size ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Separator />

          {/* Quantity */}
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-foreground">Quantity</Text>
            <View className="flex-row items-center gap-3">
              <Pressable
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Decrease quantity"
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                className="min-h-12 min-w-12 items-center justify-center rounded-xl border border-border bg-background"
              >
                <Text className="text-base font-semibold text-foreground">−</Text>
              </Pressable>
              <Text className="text-sm font-semibold text-foreground w-6 text-center">
                {quantity}
              </Text>
              <Pressable
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Increase quantity"
                onPress={() => setQuantity((q) => q + 1)}
                className="min-h-12 min-w-12 items-center justify-center rounded-xl border border-border bg-background"
              >
                <Text className="text-base font-semibold text-foreground">+</Text>
              </Pressable>
            </View>
          </View>

          <Separator />

          {/* CTAs */}
          <View className="gap-3 mt-1">
            <Button onPress={() => {}} size="lg" className="w-full h-12 rounded-xl">
              Add to Cart
            </Button>
            <Button variant="outline" onPress={() => {}} size="lg" className="w-full h-12 rounded-xl">
              Add to Wishlist
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
