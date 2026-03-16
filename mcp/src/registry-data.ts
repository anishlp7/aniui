// Inline registry data so the MCP server has zero dependency on the CLI build.
// Keep in sync with cli/src/registry.ts when components change.

export type ComponentEntry = {
  name: string;
  file: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  tier: 1 | 2 | 3;
};

export const registry: Record<string, ComponentEntry> = {
  button: { name: "Button", file: "components/ui/button.tsx", description: "A pressable button with variants", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  text: { name: "Text", file: "components/ui/text.tsx", description: "Typography with heading and body variants", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  input: { name: "Input", file: "components/ui/input.tsx", description: "Text input with variants and states", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  textarea: { name: "Textarea", file: "components/ui/textarea.tsx", description: "Multi-line text input", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  card: { name: "Card", file: "components/ui/card.tsx", description: "Card container with header, content, footer", dependencies: ["clsx", "tailwind-merge"], registryDependencies: ["text"], tier: 1 },
  badge: { name: "Badge", file: "components/ui/badge.tsx", description: "Small status indicator", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  separator: { name: "Separator", file: "components/ui/separator.tsx", description: "Visual divider", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  avatar: { name: "Avatar", file: "components/ui/avatar.tsx", description: "User avatar with image and fallback", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  alert: { name: "Alert", file: "components/ui/alert.tsx", description: "Alert message with variants", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  label: { name: "Label", file: "components/ui/label.tsx", description: "Form field label", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  switch: { name: "Switch", file: "components/ui/switch.tsx", description: "Toggle switch", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  checkbox: { name: "Checkbox", file: "components/ui/checkbox.tsx", description: "Checkbox with checked state", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  "radio-group": { name: "RadioGroup", file: "components/ui/radio-group.tsx", description: "Radio button group", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  progress: { name: "Progress", file: "components/ui/progress.tsx", description: "Progress bar", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  spinner: { name: "Spinner", file: "components/ui/spinner.tsx", description: "Loading spinner with sizes", dependencies: ["class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  list: { name: "List", file: "components/ui/list.tsx", description: "Styled list items", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], tier: 1 },
  skeleton: { name: "Skeleton", file: "components/ui/skeleton.tsx", description: "Animated loading placeholder", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  accordion: { name: "Accordion", file: "components/ui/accordion.tsx", description: "Expandable content sections", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  tabs: { name: "Tabs", file: "components/ui/tabs.tsx", description: "Tab navigation", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  collapsible: { name: "Collapsible", file: "components/ui/collapsible.tsx", description: "Animated show/hide content", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  toast: { name: "Toast", file: "components/ui/toast.tsx", description: "Notification toast with auto-dismiss", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  dialog: { name: "Dialog", file: "components/ui/dialog.tsx", description: "Modal dialog overlay", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  "alert-dialog": { name: "AlertDialog", file: "components/ui/alert-dialog.tsx", description: "Confirmation dialog with actions", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  tooltip: { name: "Tooltip", file: "components/ui/tooltip.tsx", description: "Fade-in tooltip on press", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  popover: { name: "Popover", file: "components/ui/popover.tsx", description: "Contextual overlay content", dependencies: ["react-native-reanimated", "clsx", "tailwind-merge"], registryDependencies: [], tier: 2 },
  "bottom-sheet": { name: "BottomSheet", file: "components/ui/bottom-sheet.tsx", description: "Bottom sheet overlay", dependencies: ["@gorhom/bottom-sheet", "react-native-gesture-handler", "clsx", "tailwind-merge"], registryDependencies: [], tier: 3 },
  "action-sheet": { name: "ActionSheet", file: "components/ui/action-sheet.tsx", description: "Action sheet with options", dependencies: ["@gorhom/bottom-sheet", "react-native-gesture-handler", "clsx", "tailwind-merge"], registryDependencies: ["bottom-sheet"], tier: 3 },
  select: { name: "Select", file: "components/ui/select.tsx", description: "Dropdown select", dependencies: ["@gorhom/bottom-sheet", "react-native-gesture-handler", "clsx", "tailwind-merge"], registryDependencies: ["bottom-sheet"], tier: 3 },
  "date-picker": { name: "DatePicker", file: "components/ui/date-picker.tsx", description: "Date and time picker", dependencies: ["@react-native-community/datetimepicker", "clsx", "tailwind-merge"], registryDependencies: [], tier: 3 },
};

export function getComponentNames(): string[] {
  return Object.keys(registry).sort();
}
