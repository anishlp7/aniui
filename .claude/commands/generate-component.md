You are generating a new AniUI component. AniUI is a shadcn/ui-style React Native component library using NativeWind v4 + Tailwind v3.

Ask the user what component they want, then generate it following these EXACT rules:

## Rules
1. Single file at `components/ui/{name}.tsx`
2. Named exports only — NO default exports
3. ALL styling via NativeWind className — NO StyleSheet.create()
4. Support `className` prop on every component
5. Spread `...props` LAST
6. Set `accessibilityRole` on interactive elements
7. Add `accessible={true}` and `min-h-12 min-w-12` on Pressable
8. Wrap text inside Pressable in `<Text>`
9. Keep under 80 lines
10. NO `any` types — strict TypeScript
11. Export the Props interface

## Template
```tsx
import React from "react";
import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "..." },
    size: { md: "..." },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ComponentProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof componentVariants> {
  className?: string;
}

export function Component({ variant, size, className, ...props }: ComponentProps) {
  return <View className={cn(componentVariants({ variant, size }), className)} {...props} />;
}
```

## Theme Tokens (use these Tailwind classes)
- bg-background / text-foreground — page
- bg-primary / text-primary-foreground — buttons, CTA
- bg-secondary / text-secondary-foreground — secondary
- bg-muted / text-muted-foreground — subtle, disabled
- bg-accent / text-accent-foreground — highlights
- bg-destructive / text-destructive-foreground — danger
- bg-card / text-card-foreground — cards
- border-border, bg-input, ring

## Dependencies Available
- Tier 1: React Native core + NativeWind + cva + clsx + tailwind-merge
- Tier 2: + react-native-reanimated v3 (for animations)
- Tier 3: + @gorhom/bottom-sheet, @react-native-community/datetimepicker

Generate the component file and place it at `components/ui/{name}.tsx`. Then update `cli/src/registry.ts` to add the new entry.
