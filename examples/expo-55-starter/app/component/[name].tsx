import React, { useState } from "react";
import { ScrollView, View, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack } from "expo-router";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "../_layout";

// Forms
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Stepper } from "@/components/ui/stepper";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Rating } from "@/components/ui/rating";
import { Chip } from "@/components/ui/chip";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SearchBar } from "@/components/ui/search-bar";
import { InputOTP } from "@/components/ui/input-otp";
import { PasswordInput } from "@/components/ui/password-input";
import { MaskedInput } from "@/components/ui/masked-input";
import { NumberInput } from "@/components/ui/number-input";
import { DatePicker } from "@/components/ui/date-picker";
import { PhoneInput } from "@/components/ui/phone-input";
import { Combobox } from "@/components/ui/combobox";
import { CommandMenu } from "@/components/ui/command-menu";
import { DataTable } from "@/components/ui/data-table";
import { FilePicker } from "@/components/ui/file-picker";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton, InputGroupText } from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { DirectionProvider, useDirection } from "@/components/ui/direction-provider";

// Display
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LabeledSeparator } from "@/components/ui/labeled-separator";
import { Image as AniImage } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { ProgressSteps, ProgressStep } from "@/components/ui/progress-steps";
import { EmptyState } from "@/components/ui/empty-state";
import { List, ListItem, ListItemTitle, ListItemDescription } from "@/components/ui/list";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { StatCard } from "@/components/ui/stat-card";
import { Price } from "@/components/ui/price";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { ConnectionBanner } from "@/components/ui/connection-banner";
import { AreaChart } from "@/components/ui/area-chart";
import { BarChart } from "@/components/ui/bar-chart";
import { LineChart } from "@/components/ui/line-chart";
import { PieChart } from "@/components/ui/pie-chart";
import { RadarChart } from "@/components/ui/radar-chart";
import { RadialChart } from "@/components/ui/radial-chart";

// Feedback
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Banner } from "@/components/ui/banner";
import { ToastProvider, useToast } from "@/components/ui/toast";

// Navigation
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { TabsDemo } from "@/components/tabs-demo";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FAB } from "@/components/ui/fab";
import { Header, HeaderLeft, HeaderTitle, HeaderRight, HeaderBackButton } from "@/components/ui/header";
import { TabBar, TabBarItem } from "@/components/ui/tab-bar";
import { Carousel } from "@/components/ui/carousel";
import { Pagination } from "@/components/ui/pagination";
import { SwipeableListItem } from "@/components/ui/swipeable-list-item";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Non-modal notifications that appear briefly at the top of the screen. Supports default, success, and destructive variants.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</Text>
        <View className="gap-3">
          <Button onPress={() => toast({ title: "Hello!", description: "This is a default toast message." })}>Default Toast</Button>
          <Button variant="secondary" onPress={() => toast({ title: "Saved!", description: "Your changes have been saved.", variant: "success" })}>Success Toast</Button>
          <Button variant="destructive" onPress={() => toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" })}>Destructive Toast</Button>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title Only</Text>
        <Button variant="outline" onPress={() => toast({ title: "Quick notification" })}>Title Only Toast</Button>
      </View>
    </View>
  );
}

const demos: Record<string, () => React.ReactElement> = {
  button: () => {
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A pressable button component with multiple visual variants and sizes. Supports loading states, icons, and full accessibility.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium (default)</Button>
            <Button size="lg">Large</Button>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">States</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </View>
        </View>
      </View>
    );
  },
  input: () => {
    const [val, setVal] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A styled text input with variant and size options. Supports leading/trailing icons and integrates with Label for form fields.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Default</Label>
            <Input placeholder="you@example.com" value={val} onChangeText={setVal} />
            <Label>Ghost</Label>
            <Input variant="ghost" placeholder="Ghost variant" />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input (default)" />
            <Input size="lg" placeholder="Large input" />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Icons</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Input placeholder="Search..." leadingIcon={<Text className="text-muted-foreground">🔍</Text>} />
            <Input placeholder="Amount" trailingIcon={<Text className="text-muted-foreground">USD</Text>} />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Disabled</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <Input placeholder="Disabled input" editable={false} className="opacity-50" />
          </View>
        </View>
      </View>
    );
  },
  textarea: () => {
    const [val, setVal] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A multi-line text input for longer-form content like bios, comments, or messages. Supports variant and size props.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-2">
            <Label>Bio</Label>
            <Textarea placeholder="Tell us about yourself..." value={val} onChangeText={setVal} />
            <Text className="text-xs text-muted-foreground text-right">{val.length}/200</Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ghost Variant</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <Textarea variant="ghost" placeholder="Ghost textarea..." />
          </View>
        </View>
      </View>
    );
  },
  checkbox: () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(true);
    const [c, setC] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A toggleable checkbox for binary choices in forms. Supports checked, unchecked, and disabled states.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">States</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <View className="flex-row items-center gap-2"><Checkbox checked={a} onCheckedChange={setA} /><Text>Unchecked</Text></View>
            <View className="flex-row items-center gap-2"><Checkbox checked={b} onCheckedChange={setB} /><Text>Checked</Text></View>
            <View className="flex-row items-center gap-2 opacity-50"><Checkbox checked={false} disabled /><Text>Disabled</Text></View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Form Group</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <View className="flex-row items-center gap-2"><Checkbox checked={a} onCheckedChange={setA} /><Text>Accept terms and conditions</Text></View>
            <View className="flex-row items-center gap-2"><Checkbox checked={b} onCheckedChange={setB} /><Text>Send me notifications</Text></View>
            <View className="flex-row items-center gap-2"><Checkbox checked={c} onCheckedChange={setC} /><Text>Subscribe to newsletter</Text></View>
          </View>
        </View>
      </View>
    );
  },
  switch: () => {
    const [notif, setNotif] = useState(true);
    const [dark, setDark] = useState(false);
    const [sound, setSound] = useState(true);
    const [auto, setAuto] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A themed toggle switch for binary on/off settings. Wraps the native Switch component with consistent styling.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings Example</Text>
          <View className="rounded-lg border border-border bg-card divide-y divide-border">
            <View className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-sm text-foreground">Notifications</Text>
              <Switch value={notif} onValueChange={setNotif} />
            </View>
            <View className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-sm text-foreground">Dark Mode</Text>
              <Switch value={dark} onValueChange={setDark} />
            </View>
            <View className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-sm text-foreground">Sound Effects</Text>
              <Switch value={sound} trackColorOff="red" trackColorOn="green" thumbColorAndroid="#18181b" onValueChange={setSound} />
            </View>
            <View className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-sm text-foreground">Auto-Update</Text>
              <Switch value={auto} onValueChange={setAuto} />
            </View>
          </View>
        </View>
      </View>
    );
  },
  "radio-group": () => {
    const [val, setVal] = useState("a");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A group of mutually exclusive radio options. Only one item can be selected at a time.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Options</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <RadioGroup value={val} onValueChange={setVal}>
              <RadioGroupItem value="a" label="Option A" />
              <RadioGroupItem value="b" label="Option B" />
              <RadioGroupItem value="c" label="Option C" />
            </RadioGroup>
          </View>
        </View>
        <Text variant="muted">Selected: {val.toUpperCase()}</Text>
      </View>
    );
  },
  select: () => {
    const [val, setVal] = useState("");
    const [val2, setVal2] = useState("");
    const fruits = [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
      { label: "Grape", value: "grape" },
      { label: "Mango", value: "mango" },
      { label: "Orange", value: "orange" },
      { label: "Strawberry", value: "strawberry" },
    ];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A dropdown picker for selecting a single value from a list. Supports an optional searchable mode for filtering options.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic</Text>
          <Select placeholder="Pick a fruit..." options={fruits} value={val} onValueChange={setVal} />
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Searchable</Text>
          <Select placeholder="Search fruits..." options={fruits} value={val2} onValueChange={setVal2} searchable />
        </View>
      </View>
    );
  },
  slider: () => {
    const [val, setVal] = useState(50);
    const [vol, setVol] = useState(75);
    const [bright, setBright] = useState(30);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A draggable slider for selecting a numeric value within a range. Supports multiple sizes and a disabled state.</Text>
        <View className="gap-2">
          <View className="flex-row justify-between"><Text variant="small">Volume</Text><Text variant="muted">{vol}%</Text></View>
          <Slider value={vol} onValueChange={setVol} />
        </View>
        <View className="gap-2">
          <View className="flex-row justify-between"><Text variant="small">Brightness</Text><Text variant="muted">{bright}%</Text></View>
          <Slider value={bright} onValueChange={setBright} size="lg" />
        </View>
        <View className="gap-2">
          <View className="flex-row justify-between"><Text variant="small">Small</Text><Text variant="muted">{val}</Text></View>
          <Slider value={val} onValueChange={setVal} size="sm" />
        </View>
        <View className="gap-2">
          <Text variant="small" className="text-muted-foreground">Disabled</Text>
          <Slider value={60} disabled />
        </View>
      </View>
    );
  },
  stepper: () => {
    const [val, setVal] = useState(3);
    const [val2, setVal2] = useState(1);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A numeric stepper with increment and decrement buttons. Supports min, max, and step constraints.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default (0-10)</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <Stepper value={val} onChange={setVal} min={0} max={10} />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Small Range (1-5)</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <Stepper value={val2} onChange={setVal2} min={1} max={5} />
          </View>
        </View>
      </View>
    );
  },
  toggle: () => {
    const [on, setOn] = useState(false);
    const [bold, setBold] = useState(true);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A pressable toggle button that switches between pressed and unpressed states. Useful for binary options like bold/italic.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">States</Text>
          <View className="rounded-lg border border-border bg-card p-4 flex-row gap-3">
            <Toggle pressed={on} onPressedChange={setOn}><Text>{on ? "On" : "Off"}</Text></Toggle>
            <Toggle pressed={bold} onPressedChange={setBold}><Text className="font-bold">B</Text></Toggle>
          </View>
        </View>
        <Text variant="muted">Toggle 1: {on ? "Pressed" : "Unpressed"} | Toggle 2: {bold ? "Pressed" : "Unpressed"}</Text>
      </View>
    );
  },
  "toggle-group": () => {
    const [val, setVal] = useState("a");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A group of toggle buttons where one item is selected at a time. Works like a segmented control with toggle styling.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selection</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <ToggleGroup value={val} onValueChange={setVal}>
              <ToggleGroupItem value="a"><Text>Left</Text></ToggleGroupItem>
              <ToggleGroupItem value="b"><Text>Center</Text></ToggleGroupItem>
              <ToggleGroupItem value="c"><Text>Right</Text></ToggleGroupItem>
            </ToggleGroup>
          </View>
        </View>
        <Text variant="muted">Selected: {val === "a" ? "Left" : val === "b" ? "Center" : "Right"}</Text>
      </View>
    );
  },
  rating: () => {
    const [val, setVal] = useState(3);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">An interactive star rating input for collecting user feedback. Supports small, medium, and large sizes.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <Text variant="small" className="text-muted-foreground">Small</Text>
            <Rating size="sm" value={val} onChange={setVal} />
            <Text variant="small" className="text-muted-foreground">Medium</Text>
            <Rating size="md" value={val} onChange={setVal} />
            <Text variant="small" className="text-muted-foreground">Large</Text>
            <Rating size="lg" value={val} onChange={setVal} />
          </View>
        </View>
        <Text variant="muted">Rating: {val}/5</Text>
      </View>
    );
  },
  chip: () => {
    const [tags, setTags] = useState(["React Native", "TypeScript", "NativeWind"]);
    const [selected, setSelected] = useState<string[]>(["React Native"]);
    const toggle = (t: string) => setSelected((s) => s.includes(t) ? s.filter((x) => x !== t) : [...s, t]);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A compact, pressable tag element for filtering, categorizing, or selecting options. Supports sizes, selection state, and a close button.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
          <View className="flex-row flex-wrap gap-2">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selectable</Text>
          <View className="flex-row flex-wrap gap-2">
            {tags.map((t) => (
              <Chip key={t} selected={selected.includes(t)} onPress={() => toggle(t)}>{t}</Chip>
            ))}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Close</Text>
          <View className="flex-row flex-wrap gap-2">
            {tags.map((t) => (
              <Chip key={t} variant="secondary" onClose={() => setTags((prev) => prev.filter((x) => x !== t))}>{t}</Chip>
            ))}
          </View>
        </View>
      </View>
    );
  },
  "segmented-control": () => {
    const [val, setVal] = useState("Day");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">An animated segmented control for switching between a small set of options. The active indicator slides smoothly between segments.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example</Text>
          <SegmentedControl options={["Day", "Week", "Month"]} value={val} onValueChange={setVal} />
        </View>
        <Text variant="muted">Selected: {val}</Text>
      </View>
    );
  },
  "search-bar": () => {
    const [v1, setV1] = useState("");
    const [v2, setV2] = useState("");
    const [v3, setV3] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A search input with a built-in search icon and clear button. Supports small, medium, and large sizes.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
          <View className="gap-3">
            <SearchBar value={v2} onChangeText={setV2} placeholder="Small" size="sm" />
            <SearchBar value={v1} onChangeText={setV1} placeholder="Medium (default)" />
            <SearchBar value={v3} onChangeText={setV3} placeholder="Large" size="lg" />
          </View>
        </View>
      </View>
    );
  },
  "input-otp": () => {
    const [val4, setVal4] = useState("");
    const [val6, setVal6] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A one-time password input with individual character cells. Supports configurable length and auto-focus advancement.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">4-Digit Code</Text>
          <InputOTP value={val4} onValueChange={setVal4} length={4} />
          {val4.length === 4 && <Text variant="muted">Code: {val4}</Text>}
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">6-Digit Code</Text>
          <InputOTP value={val6} onValueChange={setVal6} length={6} />
          {val6.length === 6 && <Text variant="muted">Code: {val6}</Text>}
        </View>
      </View>
    );
  },
  "password-input": () => {
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A password text input with a show/hide toggle and optional strength indicator. Masks input by default.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-2">
            <Label>Password</Label>
            <PasswordInput value={p1} onChangeText={setP1} placeholder="Enter password" />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Strength Indicator</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-2">
            <Label>Password</Label>
            <PasswordInput value={p2} onChangeText={setP2} placeholder="Enter password" showStrength />
          </View>
        </View>
      </View>
    );
  },
  "masked-input": () => {
    const [card, setCard] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A text input that automatically formats input with a mask pattern. Includes presets for credit cards, phone numbers, and dates.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Presets</Text>
          <View className="gap-4">
            <View className="gap-1">
              <Label>Credit Card</Label>
              <MaskedInput preset="credit-card" placeholder="0000 0000 0000 0000" onChangeText={(masked) => setCard(masked)} />
            </View>
            <View className="gap-1">
              <Label>Phone</Label>
              <MaskedInput preset="phone" placeholder="(000) 000-0000" onChangeText={(masked) => setPhone(masked)} />
            </View>
            <View className="gap-1">
              <Label>Date</Label>
              <MaskedInput preset="date" placeholder="MM/DD/YYYY" onChangeText={(masked) => setDate(masked)} />
            </View>
          </View>
        </View>
      </View>
    );
  },
  "date-picker": () => {
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState<Date | undefined>(undefined);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A calendar-based date picker in a modal overlay. Opens a full month view for date selection with navigation between months.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-3">
            <Label>Event date</Label>
            <DatePicker value={date} onChange={setDate} />
            <Text variant="muted">Selected: {date.toLocaleDateString()}</Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Placeholder</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-3">
            <Label>Date of birth</Label>
            <DatePicker value={dob} onChange={setDob} placeholder="Pick your birthday" />
            {dob && <Text variant="muted">Birthday: {dob.toLocaleDateString()}</Text>}
          </View>
        </View>
      </View>
    );
  },
  "number-input": () => {
    const [val, setVal] = useState(5);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A numeric input with increment and decrement buttons. Supports min, max, and step constraints for controlled numeric entry.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Min/Max (0-20)</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <NumberInput value={val} onValueChange={setVal} min={0} max={20} />
          </View>
        </View>
        <Text variant="muted">Value: {val}</Text>
      </View>
    );
  },
  "phone-input": () => {
    const [val, setVal] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A phone number input with a country code selector. Automatically formats the number based on the selected country.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Phone number</Label>
            <PhoneInput value={val} onChangeText={setVal} placeholder="5551234567" />
            {val ? <Text variant="muted">Full: {val}</Text> : null}
          </View>
        </View>
      </View>
    );
  },
  combobox: () => {
    const [val, setVal] = useState("");
    const [multiVal, setMultiVal] = useState<string[]>([]);
    const [groupVal, setGroupVal] = useState("");
    const [clearVal, setClearVal] = useState("rn");
    const [invalidVal, setInvalidVal] = useState("");
    const [popupVal, setPopupVal] = useState("");
    const frameworks = [
      { label: "React Native", value: "rn" },
      { label: "Flutter", value: "flutter" },
      { label: "Swift UI", value: "swiftui" },
      { label: "Jetpack Compose", value: "compose" },
      { label: "Kotlin Multiplatform", value: "kmp" },
    ];
    const tags = [
      { label: "React Native", value: "rn" },
      { label: "TypeScript", value: "ts" },
      { label: "NativeWind", value: "nw" },
      { label: "Expo", value: "expo" },
      { label: "Reanimated", value: "reanimated" },
    ];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A searchable select with multi-select, groups, clear button, custom rendering, and more. Type to filter, then select from matching results.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Framework</Label>
            <Combobox placeholder="Select framework..." searchPlaceholder="Search..." options={frameworks} value={val} onValueChange={setVal} />
            {val ? <Text variant="muted">Selected: {val}</Text> : null}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Multiple Selection</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Tags</Label>
            <Combobox multiple placeholder="Select tags..." searchPlaceholder="Search tags..." options={tags} selectedValues={multiVal} onSelectedValuesChange={setMultiVal} />
            {multiVal.length > 0 ? <Text variant="muted">Selected: {multiVal.join(", ")}</Text> : null}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Groups</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Technology</Label>
            <Combobox placeholder="Select..." searchPlaceholder="Search..." options={[]} groups={[{ label: "Frameworks", options: [{ label: "React Native", value: "rn" }, { label: "Flutter", value: "flutter" }, { label: "Swift UI", value: "swiftui" }] }, { label: "Languages", options: [{ label: "TypeScript", value: "ts" }, { label: "Dart", value: "dart" }, { label: "Swift", value: "swift" }] }]} value={groupVal} onValueChange={setGroupVal} />
            {groupVal ? <Text variant="muted">Selected: {groupVal}</Text> : null}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clear Button</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Framework (clearable)</Label>
            <Combobox placeholder="Select framework..." options={frameworks} value={clearVal} onValueChange={setClearVal} clearable />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Custom Items</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Choose with custom rendering</Label>
            <Combobox placeholder="Select..." options={frameworks} value={val} onValueChange={setVal} renderItem={(option, selected) => (<View className="flex-row items-center px-5 py-3 gap-3"><View className={selected ? "h-4 w-4 rounded-full bg-primary" : "h-4 w-4 rounded-full border border-input"} /><Text className="text-foreground">{option.label}</Text></View>)} />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invalid</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Required field</Label>
            <Combobox placeholder="Select framework..." options={frameworks} value={invalidVal} onValueChange={setInvalidVal} invalid />
            <Text className="text-sm text-destructive">Please select a framework</Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Disabled</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Combobox placeholder="Cannot interact..." options={frameworks} disabled />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Auto Highlight</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Auto-highlights first match</Label>
            <Combobox placeholder="Start typing..." options={frameworks} value={val} onValueChange={setVal} autoHighlight />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Popup Mode</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Button-style trigger</Label>
            <Combobox placeholder="Choose..." options={frameworks} value={popupVal} onValueChange={setPopupVal} mode="popup" />
            {popupVal ? <Text variant="muted">Selected: {popupVal}</Text> : null}
          </View>
        </View>
      </View>
    );
  },
  form: () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const validate = () => {
      const e: typeof errors = {};
      if (!name.trim()) e.name = "Name is required";
      if (!email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email format";
      setErrors(e);
      return Object.keys(e).length === 0;
    };
    const handleSubmit = () => {
      if (validate()) { setSubmitted(true); setTimeout(() => setSubmitted(false), 2000); }
    };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A form layout with validation and error messages. Combines Label, Input, and error text for a complete form experience.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Form</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <View className="gap-1">
              <Label>Name</Label>
              <Input placeholder="John Doe" value={name} onChangeText={(t) => { setName(t); if (errors.name) setErrors((e) => ({ ...e, name: undefined })); }} />
              {errors.name && <Text className="text-destructive text-xs">{errors.name}</Text>}
            </View>
            <View className="gap-1">
              <Label>Email</Label>
              <Input placeholder="john@example.com" value={email} onChangeText={(t) => { setEmail(t); if (errors.email) setErrors((e) => ({ ...e, email: undefined })); }} keyboardType="email-address" autoCapitalize="none" />
              {errors.email && <Text className="text-destructive text-xs">{errors.email}</Text>}
            </View>
            <Button onPress={handleSubmit}>{submitted ? "Submitted!" : "Submit"}</Button>
          </View>
        </View>
      </View>
    );
  },
  "file-picker": () => {
    const [file, setFile] = useState<{ name: string; size?: number } | null>(null);
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "failed">("idle");
    const [progress, setProgress] = useState(0);
    /* Description is injected below in the return */
    const selectFile = () => {
      setFile({ name: "quarterly-report.pdf", size: 2400000 });
      setStatus("idle");
      setProgress(0);
    };
    const upload = () => {
      setStatus("uploading");
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(interval); setStatus(Math.random() > 0.2 ? "success" : "failed"); return 100; }
          return p + 20;
        });
      }, 400);
    };
    const reset = () => { setFile(null); setStatus("idle"); setProgress(0); };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A file upload area with dashed border, file preview, and upload progress. Simulates a real upload workflow with status feedback.</Text>
        <View className="gap-4">
        <FilePicker file={file ?? undefined} onPress={selectFile} onRemove={reset} label="Select a document" />
        {file && status === "idle" && (
          <View className="flex-row gap-3">
            <Button onPress={upload} className="flex-1">Upload</Button>
            <Button variant="outline" onPress={reset} className="flex-1">Cancel</Button>
          </View>
        )}
        {status === "uploading" && (
          <View className="gap-2">
            <Progress value={progress} />
            <Text variant="small" className="text-muted-foreground text-center">Uploading... {progress}%</Text>
          </View>
        )}
        {status === "success" && (
          <View className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
            <Text className="text-green-600 text-sm font-medium text-center">Upload successful!</Text>
          </View>
        )}
        {status === "failed" && (
          <View className="gap-2">
            <View className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
              <Text className="text-destructive text-sm font-medium text-center">Upload failed. Please try again.</Text>
            </View>
            <Button variant="outline" onPress={upload}>Retry</Button>
          </View>
        )}
        </View>
      </View>
    );
  },
  field: () => {
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Combine labels, controls, and help text to compose accessible form fields. Supports vertical and horizontal orientations.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vertical (default)</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="you@example.com" />
              <FieldDescription>We will never share your email.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input placeholder="••••••••" secureTextEntry />
              <FieldDescription>Must be at least 8 characters.</FieldDescription>
            </Field>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Horizontal</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <Field orientation="horizontal">
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="John Doe" className="flex-1" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel>Bio</FieldLabel>
              <Textarea placeholder="Tell us about yourself..." className="flex-1" />
            </Field>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Error State</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input placeholder="username" defaultValue="ab" />
              <FieldError errors={["Username must be at least 3 characters", "Username can only contain letters and numbers"]} />
            </Field>
          </View>
        </View>
      </View>
    );
  },
  "input-group": () => {
    const [search, setSearch] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Add addons, buttons, and helper content to inputs. Prefixes, suffixes, and action buttons compose flexibly.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prefix Addon</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Price</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" keyboardType="numeric" />
            </InputGroup>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suffix Addon</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Domain</Label>
            <InputGroup>
              <InputGroupInput placeholder="mysite" />
              <InputGroupAddon align="end">
                <InputGroupText>.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Button</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Search</Label>
            <InputGroup>
              <InputGroupInput placeholder="Search..." value={search} onChangeText={setSearch} />
              <InputGroupButton onPress={() => {}}>
                <Text className="text-sm text-foreground">Go</Text>
              </InputGroupButton>
            </InputGroup>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Both Sides</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Transfer</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" keyboardType="numeric" />
              <InputGroupButton onPress={() => {}}>
                <Text className="text-sm text-foreground">Send</Text>
              </InputGroupButton>
            </InputGroup>
          </View>
        </View>
      </View>
    );
  },
  kbd: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Display keyboard input keys. Useful for showing shortcuts in help screens, tooltips, and iPad external keyboard hints.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Single Keys</Text>
        <View className="rounded-lg border border-border bg-card p-4">
          <View className="flex-row flex-wrap gap-2">
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Alt</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Groups</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">Copy</Text>
            <KbdGroup><Kbd>Cmd</Kbd><Kbd>C</Kbd></KbdGroup>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">Paste</Text>
            <KbdGroup><Kbd>Cmd</Kbd><Kbd>V</Kbd></KbdGroup>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">Find</Text>
            <KbdGroup><Kbd>Cmd</Kbd><Kbd>Shift</Kbd><Kbd>F</Kbd></KbdGroup>
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-muted-foreground w-8">sm</Text>
            <Kbd size="sm">Esc</Kbd>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-muted-foreground w-8">md</Text>
            <Kbd size="md">Esc</Kbd>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-muted-foreground w-8">lg</Text>
            <Kbd size="lg">Esc</Kbd>
          </View>
        </View>
      </View>
    </View>
  ),
  "hover-card": () => {
    const [open, setOpen] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Preview content behind a trigger. On mobile, triggered by long-press instead of hover. Uses @rn-primitives for positioning.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example</Text>
          <View className="rounded-lg border border-border bg-card p-4 items-start">
            <HoverCard open={open} onOpenChange={setOpen}>
              <HoverCardTrigger>
                <Text className="text-sm font-medium text-primary underline underline-offset-4">@aniui</Text>
              </HoverCardTrigger>
              <HoverCardContent>
                <View className="gap-2">
                  <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 rounded-full bg-primary items-center justify-center">
                      <Text className="text-sm font-bold text-primary-foreground">A</Text>
                    </View>
                    <View>
                      <Text className="text-sm font-semibold text-foreground">AniUI</Text>
                      <Text className="text-xs text-muted-foreground">@aniui</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-muted-foreground">Beautiful React Native components. Copy. Paste. Ship.</Text>
                </View>
              </HoverCardContent>
            </HoverCard>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Note</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <Text className="text-sm text-muted-foreground">On mobile, long-press the trigger to open. Requires PortalHost at app root.</Text>
          </View>
        </View>
      </View>
    );
  },
  "direction-provider": () => {
    const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">RTL/LTR direction context for right-to-left language support. Wraps I18nManager and provides a useDirection hook.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direction Toggle</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <View className="flex-row gap-2">
              <Pressable onPress={() => setDir("ltr")} className={`flex-1 items-center py-3 rounded-md border ${dir === "ltr" ? "bg-primary border-primary" : "border-input bg-background"}`}>
                <Text className={`text-sm font-medium ${dir === "ltr" ? "text-primary-foreground" : "text-foreground"}`}>LTR</Text>
              </Pressable>
              <Pressable onPress={() => setDir("rtl")} className={`flex-1 items-center py-3 rounded-md border ${dir === "rtl" ? "bg-primary border-primary" : "border-input bg-background"}`}>
                <Text className={`text-sm font-medium ${dir === "rtl" ? "text-primary-foreground" : "text-foreground"}`}>RTL</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preview ({dir.toUpperCase()})</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3" style={{ direction: dir }}>
            <Text className="text-sm font-medium text-foreground">{dir === "rtl" ? "مرحبا بالعالم" : "Hello World"}</Text>
            <Text className="text-xs text-muted-foreground">{dir === "rtl" ? "هذا مثال على تخطيط من اليمين إلى اليسار" : "This is a left-to-right layout example"}</Text>
            <View className="flex-row gap-2">
              <View className="flex-1 min-h-10 rounded-md border border-input bg-background px-3 justify-center">
                <Text className="text-xs text-muted-foreground">{dir === "rtl" ? "بحث..." : "Search..."}</Text>
              </View>
              <View className="min-h-10 px-4 rounded-md bg-primary justify-center">
                <Text className="text-xs font-medium text-primary-foreground">{dir === "rtl" ? "إرسال" : "Go"}</Text>
              </View>
            </View>
            <View className="gap-1.5">
              <Text className="text-xs font-medium text-foreground">{dir === "rtl" ? "البريد الإلكتروني" : "Email"}</Text>
              <View className="flex-row items-center rounded-md border border-input bg-background">
                <View className="px-3 self-stretch justify-center border-e border-input">
                  <Text className="text-xs text-muted-foreground">@</Text>
                </View>
                <View className="flex-1 px-3 min-h-10 justify-center">
                  <Text className="text-xs text-muted-foreground">{dir === "rtl" ? "أدخل بريدك" : "you@example.com"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Supported Languages</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-2">
            <View className="flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-primary" /><Text className="text-sm text-foreground">Arabic (العربية)</Text><Text className="text-xs text-muted-foreground">RTL</Text></View>
            <View className="flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-primary" /><Text className="text-sm text-foreground">Hebrew (עברית)</Text><Text className="text-xs text-muted-foreground">RTL</Text></View>
            <View className="flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-primary" /><Text className="text-sm text-foreground">Persian (فارسی)</Text><Text className="text-xs text-muted-foreground">RTL</Text></View>
            <View className="flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-primary" /><Text className="text-sm text-foreground">Urdu (اردو)</Text><Text className="text-xs text-muted-foreground">RTL</Text></View>
            <View className="flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-muted" /><Text className="text-sm text-foreground">English</Text><Text className="text-xs text-muted-foreground">LTR</Text></View>
            <View className="flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-muted" /><Text className="text-sm text-foreground">French</Text><Text className="text-xs text-muted-foreground">LTR</Text></View>
          </View>
        </View>
      </View>
    );
  },
  text: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A typography component with semantic variants for headings, body text, and utility styles. Maps to React Native Text with NativeWind classes.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Headings</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text variant="lead">Lead text for introductions</Text>
          <Text variant="p">Paragraph text for body content with comfortable line height for readability.</Text>
          <Text variant="large">Large emphasized text</Text>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Utility</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text variant="small">Small text for captions</Text>
          <Text variant="muted">Muted text for secondary info</Text>
        </View>
      </View>
    </View>
  ),
  badge: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Small status labels for categorizing, counting, or highlighting items. Supports four visual variants.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</Text>
        <View className="rounded-lg border border-border bg-card p-4">
          <View className="flex-row flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Use Cases</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">Notifications</Text>
            <Badge variant="destructive">3 new</Badge>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">Status</Text>
            <Badge>Active</Badge>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">Version</Text>
            <Badge variant="outline">v2.0</Badge>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">Plan</Text>
            <Badge variant="secondary">Pro</Badge>
          </View>
        </View>
      </View>
    </View>
  ),
  card: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A container component with header, content, and footer sections. Use for grouping related information with consistent styling.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Card</Text>
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>Get access to all premium features and priority support.</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="gap-2">
              <View className="flex-row items-center gap-2"><Text className="text-green-600">*</Text><Text className="text-sm text-foreground">Unlimited projects</Text></View>
              <View className="flex-row items-center gap-2"><Text className="text-green-600">*</Text><Text className="text-sm text-foreground">Advanced analytics</Text></View>
              <View className="flex-row items-center gap-2"><Text className="text-green-600">*</Text><Text className="text-sm text-foreground">Priority support</Text></View>
            </View>
          </CardContent>
          <CardFooter>
            <Button className="flex-1">Upgrade Now</Button>
          </CardFooter>
        </Card>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Simple Card</Text>
        <Card>
          <CardContent>
            <Text className="text-sm text-foreground">A minimal card with only content, no header or footer.</Text>
          </CardContent>
        </Card>
      </View>
    </View>
  ),
  avatar: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A circular avatar component that displays an image with a fallback to initials. Supports three sizes.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
        <View className="rounded-lg border border-border bg-card p-4">
          <View className="flex-row items-center gap-4">
            <View className="items-center gap-1">
              <Avatar size="sm" src="https://i.pravatar.cc/150?img=1" fallback="SM" />
              <Text className="text-xs text-muted-foreground">sm</Text>
            </View>
            <View className="items-center gap-1">
              <Avatar size="md" src="https://i.pravatar.cc/150?img=2" fallback="MD" />
              <Text className="text-xs text-muted-foreground">md</Text>
            </View>
            <View className="items-center gap-1">
              <Avatar size="lg" src="https://i.pravatar.cc/150?img=3" fallback="LG" />
              <Text className="text-xs text-muted-foreground">lg</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fallback Initials</Text>
        <View className="rounded-lg border border-border bg-card p-4">
          <View className="flex-row items-center gap-3">
            <Avatar fallback="AN" />
            <Avatar fallback="JD" />
            <Avatar fallback="XY" />
            <Avatar fallback="?" />
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">User List</Text>
        <View className="rounded-lg border border-border bg-card divide-y divide-border">
          <View className="flex-row items-center gap-3 px-4 py-3">
            <Avatar size="sm" src="https://i.pravatar.cc/150?img=5" fallback="AJ" />
            <Text className="text-sm text-foreground">Alice Johnson</Text>
          </View>
          <View className="flex-row items-center gap-3 px-4 py-3">
            <Avatar size="sm" fallback="BS" />
            <Text className="text-sm text-foreground">Bob Smith</Text>
          </View>
        </View>
      </View>
    </View>
  ),
  separator: () => (
    <View className="rounded-lg border border-border bg-card p-4 gap-3">
      <Text>Above the separator</Text>
      <Separator />
      <Text>Below the separator</Text>
    </View>
  ),
  label: () => (
    <View className="gap-2">
      <Label>Email address</Label>
      <Input placeholder="you@example.com" />
    </View>
  ),
  skeleton: () => (
    <View className="rounded-lg border border-border bg-card p-4 gap-3">
      <View className="flex-row items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <View className="gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </View>
      </View>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </View>
  ),
  spinner: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">An activity indicator for loading states. Wraps React Native ActivityIndicator with consistent sizing.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</Text>
        <View className="rounded-lg border border-border bg-card p-4">
          <View className="flex-row items-center gap-6">
            <View className="items-center gap-2">
              <Spinner size="sm" />
              <Text className="text-xs text-muted-foreground">sm</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner size="md" />
              <Text className="text-xs text-muted-foreground">md</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner size="lg" />
              <Text className="text-xs text-muted-foreground">lg</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inline Loading</Text>
        <View className="rounded-lg border border-border bg-card p-4 flex-row items-center gap-3">
          <Spinner size="sm" />
          <Text className="text-sm text-muted-foreground">Loading content...</Text>
        </View>
      </View>
    </View>
  ),
  progress: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A horizontal progress bar that fills to indicate completion. Accepts a value from 0 to 100.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Values</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-4">
          <View className="gap-1">
            <View className="flex-row justify-between"><Text className="text-xs text-muted-foreground">25%</Text></View>
            <Progress value={25} />
          </View>
          <View className="gap-1">
            <View className="flex-row justify-between"><Text className="text-xs text-muted-foreground">50%</Text></View>
            <Progress value={50} />
          </View>
          <View className="gap-1">
            <View className="flex-row justify-between"><Text className="text-xs text-muted-foreground">75%</Text></View>
            <Progress value={75} />
          </View>
          <View className="gap-1">
            <View className="flex-row justify-between"><Text className="text-xs text-muted-foreground">100%</Text></View>
            <Progress value={100} />
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Storage Usage</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-2">
          <View className="flex-row justify-between">
            <Text className="text-sm text-foreground">Storage</Text>
            <Text className="text-sm text-muted-foreground">7.2 GB / 10 GB</Text>
          </View>
          <Progress value={72} />
        </View>
      </View>
    </View>
  ),
  "empty-state": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A placeholder view for empty lists, search results, or error states. Supports title, description, icon, and an optional action button.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">No Search Results</Text>
        <View className="rounded-xl border border-border bg-card p-6">
          <EmptyState title="No results found" description="Try adjusting your search terms or filters to find what you're looking for." action={{ label: "Clear search", onPress: () => {} }} />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Empty Inbox</Text>
        <View className="rounded-xl border border-border bg-card p-6">
          <EmptyState title="Your inbox is empty" description="When you receive messages, they'll appear here." />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Error State</Text>
        <View className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <EmptyState title="Something went wrong" description="We couldn't load your data. Please check your connection and try again." action={{ label: "Retry", onPress: () => {} }} />
        </View>
      </View>
    </View>
  ),
  alert: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Contextual feedback messages for important information. Supports default, destructive, success, and warning variants.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</Text>
        <View className="gap-3">
          <Alert variant="default" title="Info">
            <AlertDescription>This is a general informational alert for the user.</AlertDescription>
          </Alert>
          <Alert variant="success" title="Success">
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning" title="Warning">
            <AlertDescription>Your trial expires in 3 days. Upgrade to continue.</AlertDescription>
          </Alert>
          <Alert variant="destructive" title="Error">
            <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
          </Alert>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title Only</Text>
        <Alert variant="default" title="A simple alert with just a title." />
      </View>
    </View>
  ),
  banner: () => (
    <View className="gap-3">
      <Banner variant="info">A new update is available for your app.</Banner>
      <Banner variant="warning">Your trial expires in 3 days.</Banner>
      <Banner variant="destructive" onDismiss={() => {}}>Something went wrong. Please try again.</Banner>
    </View>
  ),
  toast: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),

  accordion: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A collapsible content panel for organizing information into expandable sections. Only one item can be open at a time by default.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">FAQ Example</Text>
        <View className="rounded-lg border border-border bg-card overflow-hidden">
          <Accordion defaultValue="item-1">
            <AccordionItem value="item-1" trigger="What is AniUI?">
              <Text className="text-sm text-muted-foreground">AniUI is a shadcn/ui-style component library for React Native. Components are copied into your project as source files that you own and customize.</Text>
            </AccordionItem>
            <AccordionItem value="item-2" trigger="How do I install components?">
              <Text className="text-sm text-muted-foreground">Run npx @aniui/cli add button to add individual components, or npx @aniui/cli init to set up the project.</Text>
            </AccordionItem>
            <AccordionItem value="item-3" trigger="Does it support dark mode?">
              <Text className="text-sm text-muted-foreground">Yes! All components use CSS variables for theming and support light and dark mode out of the box.</Text>
            </AccordionItem>
            <AccordionItem value="item-4" trigger="What platforms are supported?">
              <Text className="text-sm text-muted-foreground">AniUI supports iOS 15+, Android API 24+, Expo SDK 54/55, and bare React Native CLI 0.76+.</Text>
            </AccordionItem>
          </Accordion>
        </View>
      </View>
    </View>
  ),
  "tabs": () => <TabsDemo />,
  collapsible: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(true);
    return (
      <View className="gap-3">
        <Collapsible open={open1} onOpenChange={setOpen1}>
          <View className="rounded-lg border border-border bg-card overflow-hidden">
            <CollapsibleTrigger>
              <View className="flex-row items-center justify-between px-4 py-3">
                <Text className="text-sm font-medium text-foreground">What is AniUI?</Text>
                <Text className="text-muted-foreground">{open1 ? "−" : "+"}</Text>
              </View>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <View className="px-4 pb-3"><Text className="text-xs text-muted-foreground">A shadcn/ui-style component library for React Native with 87 components.</Text></View>
            </CollapsibleContent>
          </View>
        </Collapsible>
        <Collapsible open={open2} onOpenChange={setOpen2}>
          <View className="rounded-lg border border-border bg-card overflow-hidden">
            <CollapsibleTrigger>
              <View className="flex-row items-center justify-between px-4 py-3">
                <Text className="text-sm font-medium text-foreground">How do I install it?</Text>
                <Text className="text-muted-foreground">{open2 ? "−" : "+"}</Text>
              </View>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <View className="px-4 pb-3"><Text className="text-xs text-muted-foreground">Run npx @aniui/cli init and the CLI will set up everything automatically.</Text></View>
            </CollapsibleContent>
          </View>
        </Collapsible>
      </View>
    );
  },
  "labeled-separator": () => (
    <View className="rounded-lg border border-border bg-card p-4 gap-4">
      <Text>Content above</Text>
      <LabeledSeparator label="OR" />
      <Text>Content below</Text>
    </View>
  ),
  image: () => (
    <View className="gap-4">
      <AniImage src="https://picsum.photos/300/200" alt="Sample" width={300} height={200} rounded="md" />
      <AniImage src="https://invalid-url.com/img.jpg" alt="Broken" width={300} height={200} fallback={<View className="flex-1 items-center justify-center bg-muted rounded-md"><Text className="text-xs text-muted-foreground">Image not found</Text></View>} rounded="md" />
    </View>
  ),
  "progress-steps": () => {
    const [step, setStep] = useState(1);
    const stepContent = [
      { title: "Create Account", desc: "Enter your email and choose a password to get started." },
      { title: "Set Up Profile", desc: "Add your name, photo, and bio so others can find you." },
      { title: "Review & Submit", desc: "Double-check your details and confirm to complete setup." },
    ];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A multi-step wizard indicator for onboarding flows, checkout processes, or form wizards. Shows completed, active, and pending steps.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Onboarding Flow</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-4">
            <ProgressSteps current={step}>
              <ProgressStep label="Account" />
              <ProgressStep label="Profile" />
              <ProgressStep label="Review" />
            </ProgressSteps>
            <View className="rounded-lg bg-secondary/30 p-4 gap-1">
              <Text className="text-sm font-semibold text-foreground">{step < 3 ? stepContent[step].title : "All Done!"}</Text>
              <Text className="text-xs text-muted-foreground">{step < 3 ? stepContent[step].desc : "Your account has been created successfully."}</Text>
            </View>
            <View className="flex-row gap-3">
              <Button variant="outline" className="flex-1" onPress={() => setStep(Math.max(0, step - 1))} disabled={step <= 0}>Back</Button>
              <Button className="flex-1" onPress={() => setStep(Math.min(3, step + 1))} disabled={step >= 3}>{step >= 2 ? "Submit" : "Next"}</Button>
            </View>
          </View>
        </View>
      </View>
    );
  },
  list: () => (
    <View className="rounded-xl border border-border bg-card overflow-hidden">
      <List>
        <ListItem>
          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center"><Text className="text-primary text-sm font-bold">N</Text></View>
            <View className="flex-1"><ListItemTitle>Notifications</ListItemTitle><ListItemDescription>Manage your notification preferences</ListItemDescription></View>
            <Text className="text-muted-foreground text-xs">→</Text>
          </View>
        </ListItem>
        <ListItem>
          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center"><Text className="text-primary text-sm font-bold">P</Text></View>
            <View className="flex-1"><ListItemTitle>Privacy</ListItemTitle><ListItemDescription>Control your privacy settings</ListItemDescription></View>
            <Text className="text-muted-foreground text-xs">→</Text>
          </View>
        </ListItem>
        <ListItem>
          <View className="flex-row items-center gap-3">
            <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center"><Text className="text-primary text-sm font-bold">S</Text></View>
            <View className="flex-1"><ListItemTitle>Security</ListItemTitle><ListItemDescription>Password and authentication</ListItemDescription></View>
            <Text className="text-muted-foreground text-xs">→</Text>
          </View>
        </ListItem>
      </List>
    </View>
  ),
  table: () => (
    <View className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell>Alice Johnson</TableCell><TableCell>Admin</TableCell><TableCell><View className="rounded-full bg-green-500/10 px-2 py-0.5 self-start"><Text className="text-green-600 text-xs font-medium">Active</Text></View></TableCell></TableRow>
          <TableRow><TableCell>Bob Smith</TableCell><TableCell>Editor</TableCell><TableCell><View className="rounded-full bg-green-500/10 px-2 py-0.5 self-start"><Text className="text-green-600 text-xs font-medium">Active</Text></View></TableCell></TableRow>
          <TableRow><TableCell>Charlie Lee</TableCell><TableCell>Viewer</TableCell><TableCell><View className="rounded-full bg-muted px-2 py-0.5 self-start"><Text className="text-muted-foreground text-xs font-medium">Inactive</Text></View></TableCell></TableRow>
        </TableBody>
      </Table>
    </View>
  ),
  grid: () => {
    const items = [
      { id: "1", title: "Photos", count: 128, color: "bg-blue-500/10" },
      { id: "2", title: "Videos", count: 32, color: "bg-purple-500/10" },
      { id: "3", title: "Music", count: 64, color: "bg-green-500/10" },
      { id: "4", title: "Documents", count: 256, color: "bg-orange-500/10" },
      { id: "5", title: "Downloads", count: 18, color: "bg-red-500/10" },
      { id: "6", title: "Bookmarks", count: 42, color: "bg-cyan-500/10" },
    ];
    return (
      <View className="flex-row flex-wrap gap-3">
        {items.map((item) => (
          <View key={item.id} className="rounded-xl border border-border bg-card p-4 gap-2" style={{ width: "47%" }}>
            <View className={`h-10 w-10 rounded-lg ${item.color} items-center justify-center`}>
              <Text className="text-foreground text-lg font-bold">{item.title.charAt(0)}</Text>
            </View>
            <Text className="text-sm font-medium text-foreground">{item.title}</Text>
            <Text className="text-xs text-muted-foreground">{item.count} items</Text>
          </View>
        ))}
      </View>
    );
  },
  timeline: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Vertical event timeline with status dots and connecting lines. Perfect for order tracking, activity feeds, and step-by-step flows.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Tracking</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <Timeline>
            <TimelineItem title="Order placed" description="Order #1234 confirmed and payment processed." time="Mar 15, 9:00 AM" variant="completed" />
            <TimelineItem title="Processing" description="Your items are being packed and prepared." time="Mar 15, 10:30 AM" variant="completed" />
            <TimelineItem title="Shipped" description="Package picked up by carrier. Tracking: TRK-8821." time="Mar 16, 2:00 PM" variant="active" />
            <TimelineItem title="Out for delivery" description="Package is on the way to your address." variant="pending" />
            <TimelineItem title="Delivered" description="Estimated arrival today by 5:00 PM." variant="pending" isLast />
          </Timeline>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity Log</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <Timeline>
            <TimelineItem title="John updated the design" description="Changed header layout and color scheme." time="2 min ago" variant="default" />
            <TimelineItem title="Sarah left a comment" description="Looks great! Can we add more padding?" time="15 min ago" variant="default" />
            <TimelineItem title="Project created" description="New project 'AniUI Dashboard' initialized." time="1 hour ago" variant="muted" isLast />
          </Timeline>
        </View>
      </View>
    </View>
  ),
  "chat-bubble": () => (
    <View className="gap-2 px-2">
      <ChatBubble variant="received" timestamp="2:30 PM">Hey, how are you?</ChatBubble>
      <ChatBubble variant="sent" timestamp="2:31 PM" status="read">I'm doing great, thanks!</ChatBubble>
      <ChatBubble variant="sent" timestamp="2:31 PM" status="delivered">How about you?</ChatBubble>
      <ChatBubble variant="received" timestamp="2:32 PM">Pretty good! Working on a new project.</ChatBubble>
    </View>
  ),
  "stat-card": () => (
    <View className="gap-3">
      <StatCard label="Revenue" value="$12,345" change={12.5} trend="up" />
      <StatCard label="Users" value="1,024" change={-3.2} trend="down" />
      <StatCard label="Orders" value="89" change={8.1} trend="up" />
    </View>
  ),
  price: () => (
    <View className="gap-5">
      <View className="rounded-lg border border-border bg-card p-4 gap-1">
        <Text variant="small" className="text-muted-foreground">Regular price</Text>
        <Price amount={49.99} currency="USD" />
      </View>
      <View className="rounded-lg border border-border bg-card p-4 gap-1">
        <Text variant="small" className="text-muted-foreground">Sale price</Text>
        <View className="flex-row items-center gap-3">
          <Price amount={99.99} currency="USD" strikethrough />
          <Price amount={29.99} currency="USD" />
        </View>
      </View>
      <View className="rounded-lg border border-border bg-card p-4 gap-1">
        <Text variant="small" className="text-muted-foreground">With prefix</Text>
        <Price amount={9.99} currency="USD" prefix="From " />
      </View>
      <View className="rounded-lg border border-border bg-card p-4 gap-1">
        <Text variant="small" className="text-muted-foreground">Free</Text>
        <Price amount={0} currency="USD" />
      </View>
    </View>
  ),
  "status-indicator": () => (
    <View className="gap-4">
      <View className="flex-row items-center gap-3"><StatusIndicator status="online" /><Text>Online</Text></View>
      <View className="flex-row items-center gap-3"><StatusIndicator status="away" /><Text>Away</Text></View>
      <View className="flex-row items-center gap-3"><StatusIndicator status="busy" /><Text>Busy</Text></View>
      <View className="flex-row items-center gap-3"><StatusIndicator status="offline" /><Text>Offline</Text></View>
      <View className="flex-row items-center gap-3"><StatusIndicator status="online" pulse /><Text>Online (pulse)</Text></View>
    </View>
  ),
  "typing-indicator": () => (
    <View className="rounded-lg border border-border bg-card p-4 items-start">
      <TypingIndicator />
    </View>
  ),
  "connection-banner": () => {
    const [connected, setConnected] = useState(true);
    return (
      <View className="gap-4">
        <ConnectionBanner connected={connected} />
        <Button variant="outline" onPress={() => setConnected(!connected)}>{connected ? "Simulate offline" : "Go online"}</Button>
      </View>
    );
  },
  dialog: () => {
    const [open, setOpen] = useState(false);
    return (
      <View className="gap-4">
        <Button onPress={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Make changes to your profile here.</DialogDescription>
            </DialogHeader>
            <View className="gap-2 py-2">
              <Label>Name</Label>
              <Input placeholder="John Doe" />
            </View>
            <DialogFooter>
              <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
              <Button onPress={() => setOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
  "alert-dialog": () => {
    const [open, setOpen] = useState(false);
    return (
      <View className="gap-4">
        <Button variant="destructive" onPress={() => setOpen(true)}>Delete Account</Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. Your account and data will be permanently deleted.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onPress={() => setOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onPress={() => setOpen(false)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </View>
    );
  },
  drawer: () => {
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A slide-in panel from the left or right edge. Use for navigation menus, filters, or settings.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Left Drawer</Text>
          <Button onPress={() => setLeftOpen(true)}>Open Navigation</Button>
          <Drawer open={leftOpen} onOpenChange={setLeftOpen} side="left">
            <DrawerContent>
              <View className="gap-1 pt-14 px-4">
                <Text className="text-lg font-bold text-foreground mb-4">Navigation</Text>
                {["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile", "Settings"].map((item) => (
                  <Pressable key={item} className="flex-row items-center gap-3 py-3 px-2 rounded-lg active:bg-accent" onPress={() => setLeftOpen(false)}>
                    <View className="h-8 w-8 rounded-full bg-primary/10 items-center justify-center"><Text className="text-primary text-xs font-bold">{item[0]}</Text></View>
                    <Text className="text-foreground text-sm">{item}</Text>
                  </Pressable>
                ))}
              </View>
            </DrawerContent>
          </Drawer>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Right Drawer</Text>
          <Button variant="outline" onPress={() => setRightOpen(true)}>Open Filters</Button>
          <Drawer open={rightOpen} onOpenChange={setRightOpen} side="right">
            <DrawerContent>
              <View className="gap-4 pt-14 px-4">
                <Text className="text-lg font-bold text-foreground">Filters</Text>
                <View className="gap-3">
                  <View className="flex-row items-center gap-2"><Checkbox checked={true} onCheckedChange={() => {}} /><Text className="text-sm text-foreground">In stock only</Text></View>
                  <View className="flex-row items-center gap-2"><Checkbox checked={false} onCheckedChange={() => {}} /><Text className="text-sm text-foreground">Free shipping</Text></View>
                  <View className="flex-row items-center gap-2"><Checkbox checked={false} onCheckedChange={() => {}} /><Text className="text-sm text-foreground">On sale</Text></View>
                </View>
                <View className="flex-row gap-3 mt-4">
                  <Button className="flex-1" onPress={() => setRightOpen(false)}>Apply</Button>
                  <Button variant="outline" className="flex-1" onPress={() => setRightOpen(false)}>Reset</Button>
                </View>
              </View>
            </DrawerContent>
          </Drawer>
        </View>
      </View>
    );
  },
  header: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">App header bar with back button, title, and action buttons. Supports default and transparent variants.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default</Text>
        <View className="rounded-xl border border-border overflow-hidden">
          <Header>
            <HeaderLeft><HeaderBackButton onPress={() => {}} /></HeaderLeft>
            <HeaderTitle>Settings</HeaderTitle>
            <HeaderRight>
              <Pressable onPress={() => {}} className="px-3 py-1.5"><Text className="text-primary text-sm font-semibold">Save</Text></Pressable>
            </HeaderRight>
          </Header>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Search</Text>
        <View className="rounded-xl border border-border overflow-hidden">
          <Header>
            <HeaderLeft><HeaderBackButton onPress={() => {}} /></HeaderLeft>
            <HeaderTitle>Explore</HeaderTitle>
            <HeaderRight>
              <Pressable onPress={() => {}} className="h-9 w-9 rounded-full bg-secondary items-center justify-center">
                <Text className="text-foreground text-sm">🔍</Text>
              </Pressable>
            </HeaderRight>
          </Header>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transparent</Text>
        <View className="rounded-xl border border-border overflow-hidden bg-primary/5">
          <Header variant="transparent">
            <HeaderLeft><HeaderBackButton onPress={() => {}} /></HeaderLeft>
            <HeaderTitle>Profile</HeaderTitle>
            <HeaderRight>
              <Pressable onPress={() => {}} className="h-9 w-9 rounded-full bg-secondary items-center justify-center">
                <Text className="text-foreground text-sm">⚙</Text>
              </Pressable>
            </HeaderRight>
          </Header>
        </View>
      </View>
    </View>
  ),
  "tab-bar": () => {
    const [active, setActive] = useState("home");
    const [active2, setActive2] = useState("feed");
    const content: Record<string, string> = {
      home: "Welcome to the home feed with latest updates.",
      search: "Search for people, topics, and content.",
      notifications: "You have 3 new notifications.",
      profile: "View and edit your profile settings.",
      feed: "Discover trending posts and stories.",
      chat: "Your recent conversations.",
      settings: "App preferences and account settings.",
    };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Bottom navigation bar for switching between main app sections. Supports icons, labels, and notification badges.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Badges</Text>
          <View className="rounded-xl border border-border overflow-hidden">
            <View className="px-4 py-6 items-center"><Text className="text-sm text-muted-foreground">{content[active]}</Text></View>
            <TabBar>
              <TabBarItem label="Home" active={active === "home"} onPress={() => setActive("home")} icon={<Text>🏠</Text>} />
              <TabBarItem label="Search" active={active === "search"} onPress={() => setActive("search")} icon={<Text>🔍</Text>} />
              <TabBarItem label="Alerts" active={active === "notifications"} onPress={() => setActive("notifications")} icon={<Text>🔔</Text>} badge={3} />
              <TabBarItem label="Profile" active={active === "profile"} onPress={() => setActive("profile")} icon={<Text>👤</Text>} />
            </TabBar>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Minimal (Labels Only)</Text>
          <View className="rounded-xl border border-border overflow-hidden">
            <View className="px-4 py-6 items-center"><Text className="text-sm text-muted-foreground">{content[active2]}</Text></View>
            <TabBar>
              <TabBarItem label="Feed" active={active2 === "feed"} onPress={() => setActive2("feed")} />
              <TabBarItem label="Chat" active={active2 === "chat"} onPress={() => setActive2("chat")} />
              <TabBarItem label="Settings" active={active2 === "settings"} onPress={() => setActive2("settings")} />
            </TabBar>
          </View>
        </View>
      </View>
    );
  },
  carousel: () => {
    const { width } = require("react-native").Dimensions.get("window");
    const itemW = width - 40;
    return (
      <Carousel
        data={[
          <View className="h-44 rounded-xl bg-primary/10 items-center justify-center"><Text className="text-primary text-lg font-semibold">Slide 1</Text></View>,
          <View className="h-44 rounded-xl bg-primary/20 items-center justify-center"><Text className="text-primary text-lg font-semibold">Slide 2</Text></View>,
          <View className="h-44 rounded-xl bg-primary/30 items-center justify-center"><Text className="text-primary text-lg font-semibold">Slide 3</Text></View>,
        ]}
        itemWidth={itemW}
        autoPlay
        interval={4000}
      />
    );
  },
  pagination: () => {
    const [page, setPage] = useState(1);
    return (
      <View className="gap-4">
        <Pagination current={page} total={5} onPageChange={setPage} />
        <Text variant="muted" className="text-center">Page {page} of 5</Text>
      </View>
    );
  },
  "infinite-list": () => (
    <View className="rounded-xl border border-border bg-card overflow-hidden">
      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i} className="flex-row items-center gap-3 px-4 py-3 border-b border-border">
          <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center">
            <Text className="text-primary font-bold">{i}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground">Item {i}</Text>
            <Text className="text-xs text-muted-foreground">Auto-loaded on scroll</Text>
          </View>
        </View>
      ))}
      <View className="py-3 items-center"><Spinner size="sm" /></View>
    </View>
  ),
  "swipeable-list-item": () => {
    const [deleted, setDeleted] = useState<number[]>([]);
    const [archived, setArchived] = useState<number[]>([]);
    const allItems = [
      { id: 1, title: "Design Review", desc: "Review the new dashboard mockups", time: "10:30 AM" },
      { id: 2, title: "Team Standup", desc: "Daily sync with the engineering team", time: "Yesterday" },
      { id: 3, title: "Bug Report #142", desc: "Fix navigation crash on Android", time: "2 days ago" },
      { id: 4, title: "Release Notes", desc: "Draft v2.0 changelog for review", time: "Last week" },
    ];
    const items = allItems.filter((i) => !deleted.includes(i.id) && !archived.includes(i.id));
    return (
      <View className="gap-4">
        {/* Action Legend */}
        <View className="rounded-xl border border-border bg-card p-4 gap-3">
          <Text className="text-sm font-medium text-foreground">Swipe Actions</Text>
          <View className="gap-2">
            <Text className="text-xs text-muted-foreground">Swipe right →</Text>
            <View className="flex-row gap-2">
              <View className="flex-row items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1"><View className="h-2.5 w-2.5 rounded-full bg-amber-500" /><Text className="text-xs text-amber-600 font-medium">Pin</Text></View>
              <View className="flex-row items-center gap-1.5 rounded-md bg-green-500/10 px-2.5 py-1"><View className="h-2.5 w-2.5 rounded-full bg-green-600" /><Text className="text-xs text-green-600 font-medium">Archive</Text></View>
            </View>
            <Text className="text-xs text-muted-foreground mt-1">← Swipe left</Text>
            <View className="flex-row gap-2">
              <View className="flex-row items-center gap-1.5 rounded-md bg-blue-500/10 px-2.5 py-1"><View className="h-2.5 w-2.5 rounded-full bg-blue-500" /><Text className="text-xs text-blue-600 font-medium">Edit</Text></View>
              <View className="flex-row items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1"><View className="h-2.5 w-2.5 rounded-full bg-destructive" /><Text className="text-xs text-destructive font-medium">Delete</Text></View>
            </View>
          </View>
        </View>

        {/* Swipeable List */}
        <View className="rounded-xl border border-border overflow-hidden">
          {items.map((item, i) => (
            <SwipeableListItem
              key={item.id}
              leftActions={[
                { key: "pin", label: "Pin", color: "bg-amber-500", onPress: () => {} },
                { key: "archive", label: "Archive", color: "bg-green-600", onPress: () => setArchived([...archived, item.id]) },
              ]}
              rightActions={[
                { key: "edit", label: "Edit", color: "bg-blue-500", onPress: () => {} },
                { key: "delete", label: "Delete", color: "bg-destructive", onPress: () => setDeleted([...deleted, item.id]) },
              ]}
            >
              <View className={`bg-card px-4 py-3.5 ${i < items.length - 1 ? "border-b border-border" : ""}`}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-medium text-foreground flex-1">{item.title}</Text>
                  <Text className="text-[10px] text-muted-foreground">{item.time}</Text>
                </View>
                <Text className="text-xs text-muted-foreground mt-0.5">{item.desc}</Text>
              </View>
            </SwipeableListItem>
          ))}
          {items.length === 0 && (
            <View className="bg-card px-4 py-10 items-center gap-3">
              <Text className="text-sm text-muted-foreground">All items cleared</Text>
              <Button variant="outline" size="sm" onPress={() => { setDeleted([]); setArchived([]); }}>Reset</Button>
            </View>
          )}
        </View>

        {/* Status */}
        {(archived.length > 0 || deleted.length > 0) && (
          <View className="rounded-lg border border-border bg-card px-4 py-3 flex-row justify-between">
            {archived.length > 0 && <Text className="text-xs text-green-600">{archived.length} archived</Text>}
            {deleted.length > 0 && <Text className="text-xs text-destructive">{deleted.length} deleted</Text>}
          </View>
        )}
      </View>
    );
  },
  "safe-area": () => (
    <View className="rounded-xl border border-border bg-card p-4 gap-2">
      <Text className="text-sm font-medium text-foreground">SafeArea</Text>
      <Text className="text-xs text-muted-foreground">Wraps content with safe area insets to avoid notch, status bar, and home indicator. Already used in this app&apos;s root layout.</Text>
      <View className="rounded-lg border-2 border-dashed border-primary/30 p-4 mt-2 items-center">
        <Text className="text-xs text-primary">Safe content area</Text>
      </View>
    </View>
  ),
  "refresh-control": () => {
    const [refreshing, setRefreshing] = useState(false);
    return (
      <View className="gap-4">
        <Button variant="outline" onPress={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 2000); }}>
          {refreshing ? "Refreshing..." : "Simulate Pull to Refresh"}
        </Button>
        {refreshing && <View className="items-center py-4"><Spinner size="sm" /><Text variant="muted" className="mt-2">Refreshing...</Text></View>}
      </View>
    );
  },
  popover: () => {
    const [open, setOpen] = useState(false);
    return (
      <View className="gap-4">
        <Button onPress={() => setOpen(!open)}>Toggle Popover</Button>
        {open && (
          <View className="rounded-lg border border-border bg-card p-4 shadow-lg">
            <Text variant="small" className="font-semibold text-foreground">Popover Content</Text>
            <Text variant="muted" className="mt-1">This is a popover panel with extra info.</Text>
          </View>
        )}
      </View>
    );
  },
  "dropdown-menu": () => {
    const [selected, setSelected] = useState("");
    return (
      <View className="gap-4">
        <Select
          placeholder="Choose action..."
          options={[{ label: "Edit", value: "edit" }, { label: "Duplicate", value: "duplicate" }, { label: "Delete", value: "delete" }]}
          value={selected}
          onValueChange={setSelected}
        />
        {selected ? <Text variant="muted">Selected: {selected}</Text> : null}
      </View>
    );
  },
  "context-menu": () => {
    const [action, setAction] = useState("");
    return (
      <View className="gap-4">
        <Pressable
          onLongPress={() => setAction("long-pressed")}
          className="h-32 rounded-xl border-2 border-dashed border-border items-center justify-center"
        >
          <Text className="text-muted-foreground text-sm">Long press me</Text>
        </Pressable>
        {action ? (
          <View className="rounded-xl border border-border bg-card overflow-hidden">
            <Pressable className="px-4 py-3 active:bg-accent" onPress={() => setAction("Edit")}><Text className="text-sm text-foreground">Edit</Text></Pressable>
            <Pressable className="px-4 py-3 active:bg-accent border-t border-border" onPress={() => setAction("Duplicate")}><Text className="text-sm text-foreground">Duplicate</Text></Pressable>
            <Pressable className="px-4 py-3 active:bg-accent border-t border-border" onPress={() => setAction("Delete")}><Text className="text-sm text-destructive">Delete</Text></Pressable>
          </View>
        ) : null}
        {action && action !== "long-pressed" ? <Text variant="muted">Action: {action}</Text> : null}
      </View>
    );
  },
  tooltip: () => {
    const [show, setShow] = useState(false);
    return (
      <View className="gap-4 items-center">
        <Pressable
          onPressIn={() => setShow(true)}
          onPressOut={() => setShow(false)}
          className="rounded-lg bg-primary px-4 py-2.5"
        >
          <Text className="text-primary-foreground text-sm font-medium">Hold for tooltip</Text>
        </Pressable>
        {show && (
          <View className="rounded-md bg-foreground px-3 py-1.5">
            <Text className="text-background text-xs">This is a helpful tooltip</Text>
          </View>
        )}
      </View>
    );
  },
  "bottom-sheet": () => {
    const [open, setOpen] = useState(false);
    return (
      <View className="gap-4">
        <Button onPress={() => setOpen(true)}>Open Bottom Sheet</Button>
        <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
          <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)} />
          <View className="bg-card rounded-t-2xl p-6 pb-10">
            <View className="items-center mb-4"><View className="w-10 h-1 rounded-full bg-muted" /></View>
            <Text variant="h3" className="mb-2">Bottom Sheet</Text>
            <Text variant="muted" className="mb-4">This slides up from the bottom. Tap backdrop or button to close.</Text>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </View>
        </Modal>
      </View>
    );
  },
  "action-sheet": () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const pick = (action: string) => { setSelected(action); setOpen(false); };
    return (
      <View className="gap-4">
        <Button variant="outline" onPress={() => setOpen(true)}>Show Action Sheet</Button>
        {selected ? <Text variant="muted">Selected: {selected}</Text> : null}
        <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
          <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)} />
          <View className="bg-card rounded-t-2xl pb-10">
            <View className="items-center py-3"><View className="w-10 h-1 rounded-full bg-muted" /></View>
            <Text className="text-sm text-muted-foreground text-center py-2">Choose an action</Text>
            <Pressable className="py-4 items-center border-t border-border" onPress={() => pick("Share")}><Text className="text-foreground text-base">Share</Text></Pressable>
            <Pressable className="py-4 items-center border-t border-border" onPress={() => pick("Copy Link")}><Text className="text-foreground text-base">Copy Link</Text></Pressable>
            <Pressable className="py-4 items-center border-t border-border" onPress={() => pick("Delete")}><Text className="text-destructive text-base">Delete</Text></Pressable>
            <Pressable className="py-4 items-center border-t border-border" onPress={() => setOpen(false)}><Text className="text-muted-foreground text-base font-semibold">Cancel</Text></Pressable>
          </View>
        </Modal>
      </View>
    );
  },
  fab: () => {
    const [count, setCount] = useState(0);
    return (
      <View className="gap-4 h-48 justify-end items-end">
        {count > 0 && <Text variant="muted">Tapped {count} times</Text>}
        <FAB onPress={() => setCount(count + 1)} label="Add" />
      </View>
    );
  },
  "area-chart": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">SVG area chart with gradient fill. Supports curved/linear lines, grid, labels, and multi-series stacking.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue Trend</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <AreaChart data={[{ label: "Jan", value: 186 }, { label: "Feb", value: 305 }, { label: "Mar", value: 237 }, { label: "Apr", value: 173 }, { label: "May", value: 409 }, { label: "Jun", value: 214 }]} height={180} color="#3b82f6" showGrid showLabels />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Curved with High Fill</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <AreaChart data={[{ label: "W1", value: 40 }, { label: "W2", value: 80 }, { label: "W3", value: 55 }, { label: "W4", value: 95 }, { label: "W5", value: 70 }]} height={160} color="#8b5cf6" curved fillOpacity={0.4} showLabels />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Multi-Series</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <AreaChart data={[{ label: "Q1", value: 0 }, { label: "Q2", value: 0 }, { label: "Q3", value: 0 }, { label: "Q4", value: 0 }]} height={180} series={[{ data: [{ label: "Q1", value: 120 }, { label: "Q2", value: 200 }, { label: "Q3", value: 170 }, { label: "Q4", value: 250 }], color: "#3b82f6" }, { data: [{ label: "Q1", value: 80 }, { label: "Q2", value: 150 }, { label: "Q3", value: 130 }, { label: "Q4", value: 180 }], color: "#f59e0b" }]} showGrid showLabels />
        </View>
      </View>
    </View>
  ),
  "bar-chart": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">SVG bar chart with vertical or horizontal orientation. Supports rounded bars, grid lines, labels, and grouped data.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Sales</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <BarChart data={[{ label: "Jan", value: 450 }, { label: "Feb", value: 320 }, { label: "Mar", value: 580 }, { label: "Apr", value: 420 }, { label: "May", value: 690 }, { label: "Jun", value: 530 }]} height={200} color="#8b5cf6" showGrid showLabels barRadius={4} />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Horizontal</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <BarChart data={[{ label: "React Native", value: 85, color: "#3b82f6" }, { label: "Flutter", value: 65, color: "#06b6d4" }, { label: "SwiftUI", value: 45, color: "#f59e0b" }, { label: "Compose", value: 40, color: "#10b981" }]} height={180} horizontal showLabels barRadius={6} />
        </View>
      </View>
    </View>
  ),
  "line-chart": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">SVG line chart with dot markers. Supports curved/linear lines, multi-series, grid, and labels.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weekly Active Users</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <LineChart data={[{ label: "Mon", value: 120 }, { label: "Tue", value: 245 }, { label: "Wed", value: 180 }, { label: "Thu", value: 360 }, { label: "Fri", value: 290 }, { label: "Sat", value: 410 }, { label: "Sun", value: 350 }]} height={200} color="#10b981" showDots showGrid showLabels />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Curved Multi-Series</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <LineChart height={200} curved showDots showGrid showLabels series={[{ data: [{ label: "Jan", value: 150 }, { label: "Feb", value: 230 }, { label: "Mar", value: 280 }, { label: "Apr", value: 320 }], color: "#3b82f6" }, { data: [{ label: "Jan", value: 100 }, { label: "Feb", value: 180 }, { label: "Mar", value: 220 }, { label: "Apr", value: 260 }], color: "#10b981" }]} />
        </View>
      </View>
    </View>
  ),
  "pie-chart": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">SVG pie/donut chart with segments, labels, and configurable inner radius for donut style.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Donut Chart</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <PieChart data={[{ label: "Organic", value: 65, color: "#3b82f6" }, { label: "Social", value: 20, color: "#8b5cf6" }, { label: "Direct", value: 15, color: "#f59e0b" }]} height={220} innerRadius={0.6} showLabels />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Pie</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <PieChart data={[{ label: "Mobile", value: 55, color: "#3b82f6" }, { label: "Desktop", value: 30, color: "#8b5cf6" }, { label: "Tablet", value: 10, color: "#10b981" }, { label: "Other", value: 5, color: "#f59e0b" }]} height={220} innerRadius={0} showLabels />
        </View>
      </View>
    </View>
  ),
  "radar-chart": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">SVG radar/spider chart for comparing multiple variables. Supports dots, grid levels, and multi-series overlay.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skill Assessment</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <RadarChart data={[{ label: "Frontend", value: 90 }, { label: "Backend", value: 70 }, { label: "Design", value: 60 }, { label: "DevOps", value: 50 }, { label: "Mobile", value: 85 }]} height={250} color="#3b82f6" showDots showLabels gridLevels={4} />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Multi-Series Comparison</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <RadarChart height={250} showDots showLabels gridLevels={4} series={[{ data: [{ label: "Sales", value: 80 }, { label: "Marketing", value: 65 }, { label: "Support", value: 90 }, { label: "Dev", value: 75 }, { label: "Design", value: 55 }], color: "#3b82f6" }, { data: [{ label: "Sales", value: 90 }, { label: "Marketing", value: 80 }, { label: "Support", value: 70 }, { label: "Dev", value: 85 }, { label: "Design", value: 75 }], color: "#ef4444" }]} />
        </View>
      </View>
    </View>
  ),
  "radial-chart": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">SVG radial progress rings for showing completion or goal tracking. Supports center text, labels, and multiple rings.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Goal Progress</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <RadialChart data={[{ label: "Tasks", value: 72, maxValue: 100, color: "#3b82f6" }, { label: "Bugs", value: 45, maxValue: 60, color: "#ef4444" }, { label: "Features", value: 28, maxValue: 40, color: "#10b981" }]} height={220} showLabels centerText="72%" centerSubText="Tasks done" />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Single Ring</Text>
        <View className="rounded-xl border border-border bg-card p-4">
          <RadialChart data={[{ label: "Storage", value: 7.2, maxValue: 10, color: "#8b5cf6" }]} height={180} strokeWidth={12} showLabels centerText="72%" centerSubText="7.2 / 10 GB" />
        </View>
      </View>
    </View>
  ),
};

function formatName(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function ComponentPage() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [ready, setReady] = useState(false);
  const { theme } = useAppTheme();
  const colors = theme === "dark"
    ? { bg: "#09090b", fg: "#fafafa", mutedFg: "#a1a1aa" }
    : { bg: "#ffffff", fg: "#09090b", mutedFg: "#71717a" };
  const title = formatName(name || "");
  const Demo = demos[name || ""];

  // Delay render to avoid expo-router pre-render context issues
  React.useEffect(() => { setReady(true); }, []);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["bottom"]}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} contentContainerStyle={{ paddingVertical: 24 }}>
          <Text style={{ fontSize: 22, fontWeight: "700", color: colors.fg, marginBottom: 4 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: colors.mutedFg, marginBottom: 24 }}>Live preview</Text>
          {ready && Demo ? <Demo /> : (
            <View style={{ alignItems: "center", paddingVertical: 48 }}>
              <Text style={{ color: colors.mutedFg }}>{ready ? "Demo coming soon" : ""}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
