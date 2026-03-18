"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
import { View, ScrollView, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "Clothing", "Shoes", "Accessories"];

const PRODUCTS = [
  { id: "1", name: "Classic T-Shirt", price: "$29.99", rating: 4.5, bg: "bg-primary/5 to bg-primary/10" },
  { id: "2", name: "Denim Jacket", price: "$89.99", rating: 4.8, bg: "bg-accent to bg-accent/50" },
  { id: "3", name: "Running Shoes", price: "$119.99", rating: 4.6, bg: "bg-secondary to bg-secondary/70" },
  { id: "4", name: "Leather Bag", price: "$149.99", rating: 4.7, bg: "bg-muted to bg-muted/60" },
];

function StarIcon() {
  return (
    <View style={{ width: 12, height: 12 }}>
      {/* Inline SVG not available in RN — use a text star or react-native-svg */}
    </View>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return null; // Replace with react-native-svg Heart
}

function FilterIcon() {
  return null; // Replace with react-native-svg SlidersHorizontal
}

export function ProductListScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text variant="h3" className="font-bold">Shop</Text>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Filter products"
          className="min-h-12 min-w-12 items-center justify-center rounded-full bg-muted"
        >
          {/* SlidersHorizontal icon via react-native-svg */}
        </Pressable>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-6 mb-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={\`Filter by \${cat}\`}
            onPress={() => setActiveCategory(cat)}
            className={\`rounded-full px-4 py-1.5 \${
              activeCategory === cat
                ? "bg-primary"
                : "bg-muted"
            }\`}
          >
            <Text
              variant="small"
              className={\`font-medium \${
                activeCategory === cat
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }\`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product grid */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={\`\${item.name}, \${item.price}, rated \${item.rating} stars\`}
            className="flex-1"
          >
            <Card className="flex-1 rounded-2xl overflow-hidden border border-border shadow-sm">
              <View className={\`h-32 relative \${item.bg}\`}>
                <Pressable
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Save to wishlist"
                  onPress={() => toggleLike(item.id)}
                  className="absolute top-2 right-2 h-8 w-8 items-center justify-center rounded-full bg-background/80"
                >
                  {/* Heart icon via react-native-svg */}
                </Pressable>
              </View>
              <CardContent className="py-2.5 px-3">
                <Text variant="small" className="font-medium text-foreground mb-0.5" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text variant="small" className="font-semibold text-foreground mb-1">
                  {item.price}
                </Text>
                <View className="flex-row items-center gap-1">
                  {/* Star icon via react-native-svg */}
                  <Text variant="small" className="text-muted-foreground">{item.rating}</Text>
                </View>
              </CardContent>
            </Card>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}`;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
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

const CATEGORIES = ["All", "Clothing", "Shoes", "Accessories"];

const PRODUCTS = [
  {
    id: "1",
    name: "Classic T-Shirt",
    price: "$29.99",
    rating: 4.5,
    gradient: "from-primary/5 to-primary/10",
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: "$89.99",
    rating: 4.8,
    gradient: "from-accent to-accent/50",
  },
  {
    id: "3",
    name: "Running Shoes",
    price: "$119.99",
    rating: 4.6,
    gradient: "from-secondary to-secondary/70",
  },
  {
    id: "4",
    name: "Leather Bag",
    price: "$149.99",
    rating: 4.7,
    gradient: "from-muted to-muted/60",
  },
];

function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-400"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ProductListPreview() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <PhoneFrame>
      <div className="max-h-[580px] overflow-y-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-xl font-bold text-foreground">Shop</span>
          <button
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/70 transition-colors text-foreground"
            aria-label="Filter products"
          >
            <FilterIcon />
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 px-5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Image area with gradient */}
              <div className={`relative h-32 bg-gradient-to-br ${product.gradient}`}>
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-colors hover:bg-background ${
                    liked.includes(product.id)
                      ? "text-rose-500"
                      : "text-muted-foreground"
                  }`}
                  aria-label={`${liked.includes(product.id) ? "Remove from" : "Save to"} wishlist`}
                >
                  <HeartIcon filled={liked.includes(product.id)} />
                </button>
              </div>

              {/* Product info */}
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground truncate mb-0.5">
                  {product.name}
                </p>
                <p className="text-xs font-semibold text-foreground mb-1">
                  {product.price}
                </p>
                <div className="flex items-center gap-1">
                  <StarIcon />
                  <span className="text-xs text-muted-foreground">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function ProductListBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Product List</h1>
        <p className="text-muted-foreground text-lg">
          E-commerce product grid with category filter pills, a 2-column card layout, heart wishlist toggle, and per-product price and rating display.
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-lg border border-border p-8">
        <ProductListPreview />
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx aniui add text card badge`} />
        <p className="text-sm text-muted-foreground mt-3">
          Also requires <code className="text-xs bg-muted px-1.5 py-0.5 rounded">react-native-safe-area-context</code> for{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">SafeAreaView</code>.
        </p>
      </div>

      {/* Usage */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Copy this screen into your app and wire up your product data source. Works with React Navigation or Expo Router.
        </p>
        <CodeBlock
          code={`import { ProductListScreen } from "@/screens/product-list";

// In your navigator:
<Stack.Screen name="ProductList" component={ProductListScreen} />`}
        />
      </div>

      {/* Source */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/product-list.tsx" />
      </div>
    </div>
  );
}
