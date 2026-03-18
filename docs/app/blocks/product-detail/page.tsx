"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
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
                  accessibilityLabel={\`Size \${size}\`}
                  accessibilityState={{ selected: selectedSize === size }}
                  onPress={() => setSelectedSize(size)}
                  className={\`min-w-12 h-10 items-center justify-center rounded-xl border px-3 \${
                    selectedSize === size
                      ? "border-primary bg-primary"
                      : "border-border bg-background"
                  }\`}
                >
                  <Text
                    className={\`text-sm font-semibold \${
                      selectedSize === size ? "text-primary-foreground" : "text-foreground"
                    }\`}
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
}`;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
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

const SIZES = ["S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number];

function ProductDetailPreview() {
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <PhoneFrame>
      <div className="max-h-[600px] overflow-y-auto">
        {/* Product Image */}
        <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center relative">
          {/* Back button */}
          <button
            aria-label="Go back"
            className="absolute top-3 left-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center cursor-pointer hover:bg-background transition-colors shadow-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Heart button */}
          <button
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center cursor-pointer hover:bg-background transition-colors shadow-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Product placeholder silhouette */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary/30"
          >
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
          </svg>
        </div>

        <div className="px-5 pt-5 pb-6 space-y-4">
          {/* Name */}
          <p className="text-xl font-bold text-foreground leading-tight">Classic T-Shirt</p>

          {/* Price Row */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">$29.99</span>
            <span className="text-sm text-muted-foreground line-through">$39.99</span>
            <span className="text-xs font-semibold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
              -25%
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-400"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-sm font-medium text-foreground">4.5</span>
            <span className="text-xs text-muted-foreground">(128 reviews)</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            A timeless staple made from 100% organic cotton. Soft, breathable, and perfectly
            fitted — wear it dressed up or down. Available in multiple sizes and colors.
          </p>

          {/* Separator */}
          <div className="h-px bg-border" />

          {/* Size Selector */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Size</p>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 h-10 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-border" />

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-xl border border-border bg-background text-foreground font-semibold cursor-pointer hover:bg-accent transition-colors flex items-center justify-center"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-foreground w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-10 w-10 rounded-xl border border-border bg-background text-foreground font-semibold cursor-pointer hover:bg-accent transition-colors flex items-center justify-center"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-border" />

          {/* CTAs */}
          <div className="space-y-2 pt-0.5">
            <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity flex items-center justify-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </button>
            <button className="w-full h-12 rounded-xl border border-border bg-background text-foreground text-sm font-semibold cursor-pointer hover:bg-accent active:bg-accent/80 transition-colors flex items-center justify-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function ProductDetailBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Product Detail</h1>
        <p className="text-muted-foreground text-lg">
          A product detail screen with image, pricing, size selector, quantity picker, and add-to-cart CTA.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-xl border border-border p-10">
        <ProductDetailPreview />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx aniui add text button badge separator`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires <code className="text-xs bg-muted px-1.5 py-0.5 rounded">react-native-safe-area-context</code> for SafeAreaView.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Copy this screen into your app and wire up cart and wishlist handlers. Works with React Navigation or Expo Router.
        </p>
        <CodeBlock
          code={`import { ProductDetailScreen } from "@/screens/product-detail";

// In your navigator:
<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />`}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/product-detail.tsx" />
      </div>
    </div>
  );
}
