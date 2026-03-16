You are building a screen/page using AniUI components. AniUI is a React Native component library (shadcn/ui-style) with NativeWind.

Ask the user what screen they want, then generate it using ONLY existing AniUI components.

## Rules
1. Output a single .tsx file
2. Import components from `@/components/ui/{name}`
3. Import cn from `@/lib/utils` if needed
4. Use SafeAreaView from react-native-safe-area-context as root
5. Use ScrollView for scrollable content
6. NO StyleSheet.create() — NativeWind className only
7. Named export for the screen component

## Available Components

### Tier 1 (always available)
- `Button` from button — variants: default, secondary, outline, ghost, destructive | sizes: sm, md, lg
- `Text` from text — variants: h1, h2, h3, h4, p, lead, large, small, muted
- `Input` from input — variants: default, ghost | sizes: sm, md, lg
- `Textarea` from textarea — variants: default, ghost
- `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter` from card
- `Badge` from badge — variants: default, secondary, outline, destructive
- `Separator` from separator — orientation: horizontal, vertical
- `Avatar` from avatar — sizes: sm, md, lg | props: source, fallback
- `Alert, AlertDescription` from alert — variants: default, destructive, success, warning
- `Label` from label
- `Switch` from switch — value/onValueChange
- `Checkbox` from checkbox — checked/onCheckedChange
- `RadioGroup, RadioGroupItem` from radio-group — value/onValueChange
- `Progress` from progress — value (0-100)
- `Spinner` from spinner — sizes: sm, md, lg
- `List, ListItem, ListItemTitle, ListItemDescription` from list

### Tier 2 (needs react-native-reanimated)
- `Skeleton` from skeleton
- `Accordion, AccordionItem` from accordion
- `Tabs, TabsList, TabsTrigger, TabsContent` from tabs
- `Collapsible, CollapsibleTrigger, CollapsibleContent` from collapsible
- `ToastProvider, useToast` from toast — variants: default, destructive, success
- `Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter` from dialog
- `AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel` from alert-dialog
- `Tooltip` from tooltip — side: top, bottom
- `Popover, PopoverTrigger, PopoverContent` from popover

### Tier 3 (needs extra packages)
- `BottomSheet` from bottom-sheet (needs @gorhom/bottom-sheet)
- `ActionSheet` from action-sheet (needs @gorhom/bottom-sheet)
- `Select` from select (needs @gorhom/bottom-sheet)
- `DatePicker` from date-picker (needs @react-native-community/datetimepicker)

## Theme Colors (Tailwind classes)
bg-background, bg-primary, bg-secondary, bg-muted, bg-accent, bg-destructive, bg-card
text-foreground, text-primary-foreground, text-muted-foreground, text-card-foreground
border-border, bg-input

## Screen Template
```tsx
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
// ... other imports

export function ScreenName() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-6 py-6">
        {/* screen content using AniUI components */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

Generate the screen file. After generating, list any Tier 2/3 components used so the user knows what extra deps to install.
