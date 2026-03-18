export type ComponentEntry = {
  name: string;
  file: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  tier: 1 | 2 | 3;
};

export const registry: Record<string, ComponentEntry> = {
  button: {
    name: "Button",
    file: "components/ui/button.tsx",
    description: "A pressable button with variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  text: {
    name: "Text",
    file: "components/ui/text.tsx",
    description: "Typography with heading and body variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  input: {
    name: "Input",
    file: "components/ui/input.tsx",
    description: "Text input with variants and states",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  textarea: {
    name: "Textarea",
    file: "components/ui/textarea.tsx",
    description: "Multi-line text input",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  card: {
    name: "Card",
    file: "components/ui/card.tsx",
    description: "Card container with header, content, footer",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["text"],
    tier: 1,
  },
  badge: {
    name: "Badge",
    file: "components/ui/badge.tsx",
    description: "Small status indicator",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  separator: {
    name: "Separator",
    file: "components/ui/separator.tsx",
    description: "Visual divider",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  avatar: {
    name: "Avatar",
    file: "components/ui/avatar.tsx",
    description: "User avatar with image and fallback",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  alert: {
    name: "Alert",
    file: "components/ui/alert.tsx",
    description: "Alert message with variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  label: {
    name: "Label",
    file: "components/ui/label.tsx",
    description: "Form field label",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  skeleton: {
    name: "Skeleton",
    file: "components/ui/skeleton.tsx",
    description: "Animated loading placeholder",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  switch: {
    name: "Switch",
    file: "components/ui/switch.tsx",
    description: "Toggle switch",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  checkbox: {
    name: "Checkbox",
    file: "components/ui/checkbox.tsx",
    description: "Checkbox with checked state",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "radio-group": {
    name: "RadioGroup",
    file: "components/ui/radio-group.tsx",
    description: "Radio button group",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  progress: {
    name: "Progress",
    file: "components/ui/progress.tsx",
    description: "Progress bar",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  spinner: {
    name: "Spinner",
    file: "components/ui/spinner.tsx",
    description: "Loading spinner with sizes",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  list: {
    name: "List",
    file: "components/ui/list.tsx",
    description: "Styled list items",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  accordion: {
    name: "Accordion",
    file: "components/ui/accordion.tsx",
    description: "Expandable content sections",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  tabs: {
    name: "Tabs",
    file: "components/ui/tabs.tsx",
    description: "Tab navigation",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  collapsible: {
    name: "Collapsible",
    file: "components/ui/collapsible.tsx",
    description: "Animated show/hide content",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  toast: {
    name: "Toast",
    file: "components/ui/toast.tsx",
    description: "Notification toast with auto-dismiss",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  dialog: {
    name: "Dialog",
    file: "components/ui/dialog.tsx",
    description: "Modal dialog overlay",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  "alert-dialog": {
    name: "AlertDialog",
    file: "components/ui/alert-dialog.tsx",
    description: "Confirmation dialog with actions",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  tooltip: {
    name: "Tooltip",
    file: "components/ui/tooltip.tsx",
    description: "Fade-in tooltip on press",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  popover: {
    name: "Popover",
    file: "components/ui/popover.tsx",
    description: "Contextual overlay content",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  "bottom-sheet": {
    name: "BottomSheet",
    file: "components/ui/bottom-sheet.tsx",
    description: "Bottom sheet overlay",
    dependencies: ["@gorhom/bottom-sheet", "react-native-gesture-handler", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 3,
  },
  "action-sheet": {
    name: "ActionSheet",
    file: "components/ui/action-sheet.tsx",
    description: "Action sheet with options",
    dependencies: ["@gorhom/bottom-sheet", "react-native-gesture-handler", "clsx", "tailwind-merge"],
    registryDependencies: ["bottom-sheet"],
    tier: 3,
  },
  select: {
    name: "Select",
    file: "components/ui/select.tsx",
    description: "Dropdown select",
    dependencies: ["@gorhom/bottom-sheet", "react-native-gesture-handler", "clsx", "tailwind-merge"],
    registryDependencies: ["bottom-sheet"],
    tier: 3,
  },
  calendar: {
    name: "Calendar",
    file: "components/ui/calendar.tsx",
    description: "Month calendar with single and range selection",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "date-picker": {
    name: "DatePicker",
    file: "components/ui/date-picker.tsx",
    description: "Date picker with calendar popup and range support",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["calendar"],
    tier: 1,
  },
  slider: {
    name: "Slider",
    file: "components/ui/slider.tsx",
    description: "Draggable slider for numeric values",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  toggle: {
    name: "Toggle",
    file: "components/ui/toggle.tsx",
    description: "Two-state toggle button",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "toggle-group": {
    name: "ToggleGroup",
    file: "components/ui/toggle-group.tsx",
    description: "Group of exclusive toggle buttons",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["toggle"],
    tier: 1,
  },
  drawer: {
    name: "Drawer",
    file: "components/ui/drawer.tsx",
    description: "Slide-in side navigation panel",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  "input-otp": {
    name: "InputOTP",
    file: "components/ui/input-otp.tsx",
    description: "One-time password input with individual cells",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  table: {
    name: "Table",
    file: "components/ui/table.tsx",
    description: "Data table with header, body, rows, and cells",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "search-bar": {
    name: "SearchBar",
    file: "components/ui/search-bar.tsx",
    description: "Search input with icon, clear button, and cancel",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  chip: {
    name: "Chip",
    file: "components/ui/chip.tsx",
    description: "Interactive tag for filters and multi-select",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  fab: {
    name: "FAB",
    file: "components/ui/fab.tsx",
    description: "Floating action button for primary screen actions",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "empty-state": {
    name: "EmptyState",
    file: "components/ui/empty-state.tsx",
    description: "Placeholder for empty screens and error states",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "dropdown-menu": {
    name: "DropdownMenu",
    file: "components/ui/dropdown-menu.tsx",
    description: "Context menu with items, separators, and destructive actions",
    dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 2,
  },
  image: {
    name: "Image",
    file: "components/ui/image.tsx",
    description: "Image with loading placeholder, error fallback, and rounded variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  "segmented-control": {
    name: "SegmentedControl",
    file: "components/ui/segmented-control.tsx",
    description: "iOS-style segmented control for view switching",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  carousel: {
    name: "Carousel",
    file: "components/ui/carousel.tsx",
    description: "Horizontal scrollable carousel with pagination dots",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  rating: {
    name: "Rating",
    file: "components/ui/rating.tsx",
    description: "Star rating with interactive and read-only modes",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  stepper: {
    name: "Stepper",
    file: "components/ui/stepper.tsx",
    description: "Numeric increment/decrement control with min/max/step",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
  banner: {
    name: "Banner",
    file: "components/ui/banner.tsx",
    description: "Full-width notification banner with variants and dismiss",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    tier: 1,
  },
};

export function getComponentNames(): string[] {
  return Object.keys(registry).sort();
}

export function resolveRegistryDeps(names: string[]): string[] {
  const resolved = new Set<string>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.pop()!;
    if (resolved.has(name)) continue;
    resolved.add(name);

    const entry = registry[name];
    if (entry) {
      for (const dep of entry.registryDependencies) {
        if (!resolved.has(dep)) {
          queue.push(dep);
        }
      }
    }
  }

  return Array.from(resolved);
}
