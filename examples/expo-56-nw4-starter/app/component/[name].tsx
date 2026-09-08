import React, { useState, useRef } from "react";
import { ScrollView, View, Pressable, Modal, Image, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  Plus, ChevronDown, Mic, X, Check, Bell, Mail, MessageSquare, Bold, Italic, Underline,
  List as ListIcon, LayoutGrid, Upload, Search, Inbox, AlertTriangle, Download, Play, Pause,
  MoreVertical, Home, User, LayoutDashboard, BarChart3, FolderKanban, Users, Settings,
  Eye, Lock, Shield, ChevronRight, DollarSign, ShoppingCart, Info, HelpCircle,
  Camera, Image as ImageIcon, Share2, Star, Heart, Bookmark, MapPin,
} from "lucide-react-native";
import { Text } from "@/components/ui/text";

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
import { AutoComplete } from "@/components/ui/autocomplete";
import { Calendar } from "@/components/ui/calendar";
import { SlideToConfirm } from "@/components/ui/slide-to-confirm";

// Display
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Menubar, MenubarMenu, MenubarItem } from "@/components/ui/menubar";
import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar";
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
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSpacer,
  PromptInputButton,
  PromptInputSend,
} from "@/components/ui/prompt-input";
import { ConnectionBanner } from "@/components/ui/connection-banner";
import { AreaChart } from "@/components/ui/area-chart";
import { BarChart } from "@/components/ui/bar-chart";
import { LineChart } from "@/components/ui/line-chart";
import { PieChart } from "@/components/ui/pie-chart";
import { RadarChart } from "@/components/ui/radar-chart";
import { RadialChart } from "@/components/ui/radial-chart";
import { ChartTooltip } from "@/components/ui/chart-tooltip";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Gradient } from "@/components/ui/gradient";
import { ImageGallery } from "@/components/ui/image-gallery";
import { StreamingText } from "@/components/ui/streaming-text";
import { Waveform } from "@/components/ui/waveform";

// Feedback
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Banner } from "@/components/ui/banner";
import { ToastProvider, useToast } from "@/components/ui/toast";

// Navigation
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { Carousel3D } from "@/components/ui/carousel-3d";
import { CarouselParallax } from "@/components/ui/carousel-parallax";
import { Shimmer } from "@/components/ui/shimmer";
import { Loader } from "@/components/ui/loader";
import { FlipCard } from "@/components/ui/flip-card";
import { Marquee } from "@/components/ui/marquee";
import { EventTicket } from "@/components/ui/event-ticket";
import { ReceiptCard } from "@/components/ui/receipt-card";
import { Coupon } from "@/components/ui/coupon";
import { Polaroid } from "@/components/ui/polaroid";
import { RollingCounter } from "@/components/ui/rolling-counter";
import { QrCode } from "@/components/ui/qr-code";
import { VerifiedBadge, VerifiedBadgeCheck, VerifiedBadgeContent, VerifiedBadgeName, VerifiedBadgeHandle } from "@/components/ui/verified-badge";
import { SocialButton } from "@/components/ui/social-button";
import { BarcodeBadge } from "@/components/ui/barcode-badge";
import { BookPage, BookPagePages, BookPageCover, BookPageAuthor, BookPageTitle, BookPageNote, BookPageFooter } from "@/components/ui/book-page";
import { PhotoStack } from "@/components/ui/photo-stack";
import { ProfileCard, ProfileCardCover, ProfileCardAvatar, ProfileCardBody, ProfileCardHeader, ProfileCardBio, ProfileCardLocation, ProfileCardAction } from "@/components/ui/profile-card";
import { FanMenu } from "@/components/ui/fan-menu";
import { MobileDock } from "@/components/ui/mobile-dock";
import { MorphingTabBar } from "@/components/ui/morphing-tabbar";
import { CurvedBottomTabs } from "@/components/ui/curved-bottom-tabs";
import { CarouselTilt } from "@/components/ui/carousel-tilt";
import { VerticalFlowCarousel } from "@/components/ui/vertical-flow-carousel";
import { VerticalPageCarousel } from "@/components/ui/vertical-page-carousel";
import { CarouselScale } from "@/components/ui/carousel-scale";
import { CarouselCircular } from "@/components/ui/carousel-circular";
import { Pagination } from "@/components/ui/pagination";
import { SwipeableListItem } from "@/components/ui/swipeable-list-item";
import { SwipeDeck } from "@/components/ui/swipe-deck";
import { ActionSheet } from "@/components/ui/action-sheet";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { InfiniteList } from "@/components/ui/infinite-list";
import { RefreshControl } from "@/components/ui/refresh-control";
import { Grid } from "@/components/ui/grid";
import { Form } from "@/components/ui/form";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu";
import { MorphFab, MorphFabTrigger, MorphFabItem, MorphFabItemIcon, MorphFabItemLabel } from "@/components/ui/morph-fab";
import { GooeyPopover, GooeyPopoverTrigger, GooeyPopoverContent } from "@/components/ui/gooey-popover";
import { GooeySearchTabs, GooeySearchTabsTrigger, GooeySearchTabsTabs, GooeySearchTabsTab, GooeySearchTabsTabIcon, GooeySearchTabsTabLabel } from "@/components/ui/gooey-search-tabs";
import { Tray, TrayTrigger, TrayContent, TrayHeader, TrayTitle, TrayClose, TrayBody, TrayFooter } from "@/components/ui/tray";
import { UnfoldMenu, UnfoldMenuTrigger, UnfoldMenuIcon, UnfoldMenuLabel, UnfoldMenuContent, UnfoldMenuHeader, UnfoldMenuTitle, UnfoldMenuClose, UnfoldMenuGrid, UnfoldMenuItem } from "@/components/ui/unfold-menu";
import { ActionRail, ActionRailGroup, ActionRailAction, ActionRailIcon, ActionRailLabel, ActionRailOverflow, ActionRailTrigger } from "@/components/ui/action-rail";
import { SplitView, SplitViewTop, SplitViewTitle, SplitViewHandle, SplitViewBottom } from "@/components/ui/split-view";
import { ExpandableView, ExpandableViewCollapsed, ExpandableViewExpanded, ExpandableViewClose } from "@/components/ui/expandable-view";
import { MatchedGeometryProvider, MatchedGeometryView } from "@/components/ui/matched-geometry";
import { ArcList, ArcListItem, ArcListLabel } from "@/components/ui/arc-list";
import { FlexiButton } from "@/components/ui/flexi-button";
import { SaveButton } from "@/components/ui/save-button";
import { SpinButton } from "@/components/ui/spin-button";
import { StackedChips, StackedChipsTrigger, StackedChipsContent } from "@/components/ui/stacked-chips";
import { FillingStack } from "@/components/ui/filling-stack";
import { Hamburger } from "@/components/ui/hamburger";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { AnimatedHeaderScrollView } from "@/components/ui/animated-header-scrollview";
import { AnimatedInputBar } from "@/components/ui/animated-input-bar";

// Providers
import { ThemeProvider, useTheme as useAniTheme } from "@/components/ui/theme-provider";
import { KeyboardView } from "@/components/ui/keyboard-view";
import Animated from "react-native-reanimated";
import { entering, usePressAnimation } from "@/components/ui/animate";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function ThemeProviderDemo() {
  const { theme, resolvedTheme, toggleTheme } = useAniTheme();
  return (
    <View className="rounded-lg border border-border bg-card p-4 gap-3">
      <Text variant="muted">theme: {theme} · resolved: {resolvedTheme}</Text>
      <Button onPress={toggleTheme}>Toggle light/dark</Button>
    </View>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Non-modal notifications that appear briefly at the top of the screen — triggered here by real save and delete actions.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document Actions</Text>
        <View className="flex-row flex-wrap gap-3">
          <Button onPress={() => toast({ title: "Saved successfully", description: "Your changes have been saved.", variant: "success" })}>Save document</Button>
          <Button variant="destructive" onPress={() => toast({ title: "Item removed", description: "The document was moved to trash.", variant: "destructive" })}>Delete document</Button>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Background Sync</Text>
        <Button variant="outline" onPress={() => toast({ title: "Sync failed", description: "Couldn't reach the server. We'll retry automatically.", position: "bottom" })}>Simulate sync failure</Button>
      </View>
    </View>
  );
}

const demos: Record<string, () => React.ReactElement> = {
  button: () => {
    const [dirty, setDirty] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setDirty(false);
      }, 1200);
    };

    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A settings screen's action row — primary, outline, and destructive buttons wired to real state, not just a variant grid.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account Settings</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Button onPress={handleSave} loading={saving} disabled={!dirty}>
              {saving ? "Saving..." : dirty ? "Save changes" : "Saved"}
            </Button>
            <Button variant="outline" onPress={() => setDirty(true)}>Edit again</Button>
            <Button variant="destructive" disabled={deleted} onPress={() => setDeleted(true)}>
              {deleted ? "Account deleted" : "Delete account"}
            </Button>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Variants</Text>
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
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes & States</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium (default)</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </View>
        </View>
      </View>
    );
  },
  input: () => {
    const [email, setEmail] = useState("");
    const touched = email.length > 0;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real sign-up field with live validation — the helper text and trailing icon respond as you type.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create Account</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-2">
            <Label>Email address</Label>
            <Input
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className={touched && !valid ? "border-destructive" : undefined}
              trailingIcon={touched ? (valid ? <Check size={18} color="#16a34a" /> : <X size={18} color="#ef4444" />) : undefined}
            />
            <Text className={`text-xs ${touched && !valid ? "text-destructive" : "text-muted-foreground"}`}>
              {touched && !valid ? "Enter a valid email address." : "We'll send a confirmation link here."}
            </Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants & Sizes</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Input variant="ghost" placeholder="Ghost variant" />
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input (default)" />
            <Input size="lg" placeholder="Large input" />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Icons & Disabled</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Input placeholder="Search..." leadingIcon={<Search size={16} color="#71717a" />} />
            <Input placeholder="Amount" trailingIcon={<Text className="text-muted-foreground">USD</Text>} />
            <Input placeholder="Disabled input" editable={false} className="opacity-50" />
          </View>
        </View>
      </View>
    );
  },
  textarea: () => {
    const [bio, setBio] = useState("Product designer based in Austin. I like clean interfaces and strong coffee.");
    const max = 160;
    const remaining = max - bio.length;
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real profile bio field — the character counter turns red once you're near the limit.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Edit Profile</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-2">
            <Label>Bio</Label>
            <Textarea placeholder="Tell us about yourself..." value={bio} onChangeText={(t) => setBio(t.slice(0, max))} />
            <Text className={`text-xs text-right ${remaining <= 20 ? "text-destructive" : "text-muted-foreground"}`}>
              {remaining} characters left
            </Text>
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
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real sign-up confirmation step — the primary action stays disabled until the required checkbox is checked.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create Account</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <View className="flex-row items-center gap-2">
              <Checkbox checked={terms} onCheckedChange={setTerms} />
              <Text className="flex-1 text-sm text-foreground">I agree to the Terms of Service and Privacy Policy</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Checkbox checked={newsletter} onCheckedChange={setNewsletter} />
              <Text className="flex-1 text-sm text-foreground">Send me product updates and tips</Text>
            </View>
            <Button disabled={!terms} onPress={() => {}}>Create Account</Button>
          </View>
        </View>
      </View>
    );
  },
  switch: () => {
    const [push, setPush] = useState(true);
    const [email, setEmail] = useState(true);
    const [sms, setSms] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real notification preferences screen — each row is an independent, wired-up setting.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notification Settings</Text>
          <View className="rounded-lg border border-border bg-card divide-y divide-border">
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-row items-center gap-3">
                <Bell size={18} color="#71717a" />
                <View>
                  <Text className="text-sm text-foreground">Push notifications</Text>
                  <Text className="text-xs text-muted-foreground">Alerts on this device</Text>
                </View>
              </View>
              <Switch value={push} onValueChange={setPush} />
            </View>
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-row items-center gap-3">
                <Mail size={18} color="#71717a" />
                <View>
                  <Text className="text-sm text-foreground">Email</Text>
                  <Text className="text-xs text-muted-foreground">Weekly summary & receipts</Text>
                </View>
              </View>
              <Switch value={email} onValueChange={setEmail} />
            </View>
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-row items-center gap-3">
                <MessageSquare size={18} color="#71717a" />
                <View>
                  <Text className="text-sm text-foreground">SMS</Text>
                  <Text className="text-xs text-muted-foreground">Order & delivery updates</Text>
                </View>
              </View>
              <Switch value={sms} onValueChange={setSms} />
            </View>
          </View>
        </View>
      </View>
    );
  },
  "radio-group": () => {
    const [plan, setPlan] = useState("pro");
    const plans = {
      free: { label: "Free — $0/mo", desc: "For trying things out. 1 project, community support." },
      pro: { label: "Pro — $12/mo", desc: "For solo builders. Unlimited projects, priority support." },
      team: { label: "Team — $29/mo per seat", desc: "For teams. Shared workspaces, SSO, audit logs." },
    };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real pricing plan selector — only one plan can be active, and the description below updates with the selection.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Choose a Plan</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <RadioGroup value={plan} onValueChange={setPlan}>
              <RadioGroupItem value="free" label={plans.free.label} />
              <RadioGroupItem value="pro" label={plans.pro.label} />
              <RadioGroupItem value="team" label={plans.team.label} />
            </RadioGroup>
          </View>
          <Text className="text-sm text-muted-foreground">{plans[plan as keyof typeof plans].desc}</Text>
        </View>
      </View>
    );
  },
  select: () => {
    const [sort, setSort] = useState("popular");
    const [country, setCountry] = useState("");
    const sortOptions = [
      { label: "Most Popular", value: "popular" },
      { label: "Price: Low to High", value: "price_asc" },
      { label: "Price: High to Low", value: "price_desc" },
      { label: "Newest", value: "newest" },
    ];
    const countries = [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
      { label: "India", value: "in" },
      { label: "Japan", value: "jp" },
      { label: "Australia", value: "au" },
    ];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Two real pickers from a shopping flow — sorting a results list, and a searchable country field for checkout.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sort Results</Text>
          <Select placeholder="Sort by..." options={sortOptions} value={sort} onValueChange={setSort} />
          <Text className="text-xs text-muted-foreground">Showing 128 products · sorted by {sortOptions.find((o) => o.value === sort)?.label}</Text>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipping Country</Text>
          <Label>Country</Label>
          <Select placeholder="Search countries..." options={countries} value={country} onValueChange={setCountry} searchable />
        </View>
      </View>
    );
  },
  slider: () => {
    const [volume, setVolume] = useState(75);
    const [maxPrice, setMaxPrice] = useState(250);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Two real sliders — a media volume control and a price filter for a shopping app, both showing their live value.</Text>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-foreground">Volume</Text>
            <Text className="text-sm text-muted-foreground">{volume}%</Text>
          </View>
          <Slider value={volume} onValueChange={setVolume} />
        </View>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-foreground">Max price</Text>
            <Text className="text-sm text-muted-foreground">${maxPrice}</Text>
          </View>
          <Slider value={maxPrice} min={0} max={1000} step={10} onValueChange={setMaxPrice} size="lg" />
          <Text className="text-xs text-muted-foreground">Showing items under ${maxPrice}</Text>
        </View>
      </View>
    );
  },
  stepper: () => {
    const [qty, setQty] = useState(1);
    const price = 24;
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real cart line item — the quantity stepper drives the line total directly.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cart</Text>
          <View className="rounded-lg border border-border bg-card p-4 flex-row items-center justify-between">
            <View className="gap-0.5">
              <Text className="text-sm font-medium text-foreground">Wireless Earbuds</Text>
              <Text className="text-xs text-muted-foreground">${price} each</Text>
            </View>
            <Stepper value={qty} onChange={setQty} min={1} max={10} />
          </View>
          <Text className="text-sm text-muted-foreground text-right">Line total: ${qty * price}</Text>
        </View>
      </View>
    );
  },
  toggle: () => {
    const [bold, setBold] = useState(true);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real text-formatting toolbar — each toggle is independent, and the preview below updates live.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Formatting</Text>
          <View className="rounded-lg border border-border bg-card p-3 gap-3">
            <View className="flex-row gap-2">
              <Toggle pressed={bold} onPressedChange={setBold} accessibilityLabel="Bold">
                <Bold size={16} color="#71717a" />
              </Toggle>
              <Toggle pressed={italic} onPressedChange={setItalic} accessibilityLabel="Italic">
                <Italic size={16} color="#71717a" />
              </Toggle>
              <Toggle pressed={underline} onPressedChange={setUnderline} accessibilityLabel="Underline">
                <Underline size={16} color="#71717a" />
              </Toggle>
            </View>
            <Text className={`text-base text-foreground ${bold ? "font-bold" : ""} ${italic ? "italic" : ""} ${underline ? "underline" : ""}`}>
              The quick brown fox jumps over the lazy dog.
            </Text>
          </View>
        </View>
      </View>
    );
  },
  "toggle-group": () => {
    const [view, setView] = useState("grid");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real view-mode switch for a product listing — exactly one option is active at a time.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">View</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-muted-foreground">42 items</Text>
            <ToggleGroup value={view} onValueChange={setView}>
              <ToggleGroupItem value="list" accessibilityLabel="List view">
                <ListIcon size={16} color="#71717a" />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" accessibilityLabel="Grid view">
                <LayoutGrid size={16} color="#71717a" />
              </ToggleGroupItem>
            </ToggleGroup>
          </View>
          <Text className="text-xs text-muted-foreground">Currently showing: {view === "grid" ? "Grid layout" : "List layout"}</Text>
        </View>
      </View>
    );
  },
  rating: () => {
    const [stars, setStars] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real post-order feedback prompt — tap a star, then submit.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rate This Order</Text>
          <View className="rounded-lg border border-border bg-card p-4 items-center gap-3">
            <Text className="text-sm text-foreground">How was your delivery from Green Leaf Cafe?</Text>
            <Rating size="lg" value={stars} onChange={(v) => { setStars(v); setSubmitted(false); }} />
            <Button size="sm" disabled={stars === 0} onPress={() => setSubmitted(true)}>Submit Rating</Button>
            {submitted && <Text className="text-sm text-green-600">Thanks for your feedback!</Text>}
          </View>
        </View>
      </View>
    );
  },
  chip: () => {
    const categories = ["Vegetarian", "Vegan", "Gluten-Free", "Spicy", "Under $15"];
    const [active, setActive] = useState<string[]>(["Vegetarian"]);
    const toggle = (c: string) => setActive((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Real filter chips for a restaurant search screen — tap to toggle, and clear individually from the active list.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filter By</Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} selected={active.includes(c)} onPress={() => toggle(c)}>{c}</Chip>
            ))}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Filters ({active.length})</Text>
          <View className="flex-row flex-wrap gap-2">
            {active.length === 0 ? (
              <Text className="text-sm text-muted-foreground">No filters applied</Text>
            ) : (
              active.map((c) => (
                <Chip key={c} variant="secondary" onClose={() => toggle(c)}>{c}</Chip>
              ))
            )}
          </View>
        </View>
      </View>
    );
  },
  "segmented-control": () => {
    const [range, setRange] = useState("Week");
    const stats: Record<string, string> = { Day: "$482", Week: "$3,140", Month: "$12,860" };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real analytics range switcher — the revenue figure below updates with the selected period.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <SegmentedControl options={["Day", "Week", "Month"]} value={range} onValueChange={setRange} />
            <Text className="text-2xl font-semibold text-foreground">{stats[range]}</Text>
            <Text className="text-xs text-muted-foreground">Total revenue this {range.toLowerCase()}</Text>
          </View>
        </View>
      </View>
    );
  },
  "search-bar": () => {
    const [query, setQuery] = useState("");
    const items = ["Avocado Toast", "Banana Bread", "Berry Smoothie", "Blueberry Pancakes", "Chicken Caesar Wrap"];
    const results = query ? items.filter((i) => i.toLowerCase().includes(query.toLowerCase())) : items;
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real search field wired to a live results list — clearing the query restores the full menu.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Search Menu</Text>
          <SearchBar value={query} onChangeText={setQuery} placeholder="Search dishes..." />
          <Text className="text-xs text-muted-foreground">{results.length} result{results.length === 1 ? "" : "s"}</Text>
          <View className="rounded-lg border border-border bg-card divide-y divide-border">
            {results.map((item) => (
              <View key={item} className="px-4 py-3">
                <Text className="text-sm text-foreground">{item}</Text>
              </View>
            ))}
            {results.length === 0 && (
              <View className="px-4 py-6 items-center">
                <Text className="text-sm text-muted-foreground">No dishes match "{query}"</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  },
  "input-otp": () => {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<"idle" | "verifying" | "error">("idle");
    const verify = () => {
      setStatus("verifying");
      setTimeout(() => setStatus(code === "123456" ? "idle" : "error"), 800);
    };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A six-digit verification code screen — auto-advancing cells, wired to a real verify flow.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verify Your Phone</Text>
          <Text className="text-sm text-muted-foreground">We sent a code to (415) 555-0182. Try 123456.</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-4">
            <InputOTP value={code} onValueChange={(v) => { setCode(v); setStatus("idle"); }} length={6} />
            {status === "error" && <Text className="text-sm text-destructive">Incorrect code. Please try again.</Text>}
            <Button onPress={verify} disabled={code.length !== 6}>{status === "verifying" ? "Verifying..." : "Verify"}</Button>
            <Button variant="ghost" onPress={() => { setCode(""); setStatus("idle"); }}>Resend code</Button>
          </View>
        </View>
      </View>
    );
  },
  "password-input": () => {
    const [password, setPassword] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A password field with a show/hide toggle and a live strength meter — used on a signup screen.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create Account</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-2">
            <Label>Password</Label>
            <PasswordInput value={password} onChangeText={setPassword} placeholder="At least 8 characters" showStrength />
            {password.length > 0 && password.length < 8 && (
              <Text className="text-xs text-muted-foreground">Use 8+ characters with a number and a symbol for a stronger password.</Text>
            )}
          </View>
        </View>
      </View>
    );
  },
  "masked-input": () => {
    const [card, setCard] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A text input that auto-formats digits as you type — used here for a card payment form.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Add Payment Method</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-4">
            <View className="gap-1">
              <Label>Card number</Label>
              <MaskedInput preset="credit-card" placeholder="0000 0000 0000 0000" onChangeText={(masked) => setCard(masked)} />
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 gap-1">
                <Label>Expiry</Label>
                <MaskedInput mask="##/##" placeholder="MM/YY" onChangeText={() => {}} />
              </View>
              <View className="flex-1 gap-1">
                <Label>CVV</Label>
                <Input placeholder="123" keyboardType="number-pad" maxLength={4} />
              </View>
            </View>
            {card.length === 19 && <Text variant="muted">Card ending in {card.slice(-4)}</Text>}
          </View>
        </View>
      </View>
    );
  },
  "date-picker": () => {
    const [appointment, setAppointment] = useState<Date | undefined>(undefined);
    const today = new Date();
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A calendar-based date picker in a modal overlay — used here to schedule an appointment no earlier than today.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Book an Appointment</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-3">
            <Label>Preferred date</Label>
            <DatePicker value={appointment} onChange={setAppointment} placeholder="Choose a date" min={today} />
            {appointment && <Text variant="muted">Appointment set for {appointment.toLocaleDateString()}</Text>}
          </View>
        </View>
      </View>
    );
  },
  "number-input": () => {
    const [qty, setQty] = useState(1);
    const price = 24;
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A quantity stepper with increment/decrement buttons — used here in a cart line item with a live subtotal.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cart Item</Text>
          <View className="rounded-xl border border-border bg-card p-4 flex-row items-center justify-between gap-3">
            <View className="flex-1 gap-0.5">
              <Text className="text-sm font-medium text-foreground">Wireless Earbuds</Text>
              <Text className="text-xs text-muted-foreground">${price.toFixed(2)} each</Text>
            </View>
            <NumberInput value={qty} onValueChange={setQty} min={1} max={10} />
          </View>
          <Text variant="muted">Subtotal: ${(qty * price).toFixed(2)}</Text>
        </View>
      </View>
    );
  },
  "phone-input": () => {
    const [phone, setPhone] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A phone input with a country code picker — used on a signup screen ahead of an SMS verification step.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create Account</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-3">
            <Label>Phone number</Label>
            <PhoneInput value={phone} onChangeText={setPhone} placeholder="5551234567" />
            <Text className="text-xs text-muted-foreground">We will text you a code to verify this number.</Text>
          </View>
        </View>
      </View>
    );
  },
  combobox: () => {
    const [assignee, setAssignee] = useState("");
    const [labels, setLabels] = useState<string[]>([]);
    const teammates = [
      { label: "Ava Chen", value: "ava" },
      { label: "Liam Brooks", value: "liam" },
      { label: "Sofia Reyes", value: "sofia" },
      { label: "Noah Patel", value: "noah" },
    ];
    const labelOptions = [
      { label: "Bug", value: "bug" },
      { label: "Feature", value: "feature" },
      { label: "Design", value: "design" },
      { label: "Urgent", value: "urgent" },
    ];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A searchable select for picking one or more values — type to filter, then tap to choose. Used here to triage a task.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assign To</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Assignee</Label>
            <Combobox
              placeholder="Select teammate..."
              searchPlaceholder="Search teammates..."
              options={teammates}
              value={assignee}
              onValueChange={setAssignee}
              clearable
              renderItem={(option, selected) => (
                <View className="flex-row items-center px-5 py-3 gap-3">
                  <Avatar fallback={option.label.split(" ").map((n) => n[0]).join("")} size="sm" />
                  <Text className={selected ? "text-foreground font-semibold" : "text-foreground"}>{option.label}</Text>
                </View>
              )}
            />
            {assignee ? <Text variant="muted">Assigned to {teammates.find((t) => t.value === assignee)?.label}</Text> : null}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Labels</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Tag this task</Label>
            <Combobox
              multiple
              placeholder="Select labels..."
              searchPlaceholder="Search labels..."
              options={labelOptions}
              selectedValues={labels}
              onSelectedValuesChange={setLabels}
            />
          </View>
        </View>
      </View>
    );
  },
  form: () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const validate = () => {
      const e: typeof errors = {};
      if (!name.trim()) e.name = "Name is required";
      if (!email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address";
      if (!message.trim()) e.message = "Tell us what's going on";
      setErrors(e);
      return Object.keys(e).length === 0;
    };
    const handleSubmit = () => {
      if (validate()) { setSubmitted(true); setTimeout(() => setSubmitted(false), 2000); }
    };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A multi-field form built from Field, Label, and inline error text, validated on submit.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Support</Text>
          <Form className="rounded-lg border border-border bg-card p-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Jane Cooper" value={name} onChangeText={(t) => { setName(t); if (errors.name) setErrors((e) => ({ ...e, name: undefined })); }} />
              <FieldError errors={errors.name ? [errors.name] : undefined} />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="jane@example.com" value={email} onChangeText={(t) => { setEmail(t); if (errors.email) setErrors((e) => ({ ...e, email: undefined })); }} keyboardType="email-address" autoCapitalize="none" />
              <FieldError errors={errors.email ? [errors.email] : undefined} />
            </Field>
            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea placeholder="How can we help?" value={message} onChangeText={(t) => { setMessage(t); if (errors.message) setErrors((e) => ({ ...e, message: undefined })); }} />
              <FieldError errors={errors.message ? [errors.message] : undefined} />
            </Field>
            <Button onPress={handleSubmit}>{submitted ? "Sent!" : "Send message"}</Button>
          </Form>
        </View>
      </View>
    );
  },
  "file-picker": () => {
    const [file, setFile] = useState<{ name: string; size?: number } | null>(null);
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "failed">("idle");
    const [progress, setProgress] = useState(0);
    const selectFile = () => {
      setFile({ name: "receipt-oct-14.jpg", size: 842000 });
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
        <Text className="text-sm text-muted-foreground">A file upload area with dashed border, file preview, and progress — used here to attach a receipt to an expense report.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Attach Receipt</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <FilePicker file={file ?? undefined} onPress={selectFile} onRemove={reset} label="Tap to attach a photo or PDF" />
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
                <Text className="text-green-600 text-sm font-medium text-center">Receipt uploaded — added to your expense report.</Text>
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
      </View>
    );
  },
  "data-table": () => {
      type Member = { name: string; email: string; role: string; status: string };
      const data: Member[] = [
        { name: "Alice Johnson", email: "alice@acme.com", role: "Admin", status: "Active" },
        { name: "Bob Smith", email: "bob@acme.com", role: "Editor", status: "Active" },
        { name: "Charlie Brown", email: "charlie@acme.com", role: "Viewer", status: "Inactive" },
        { name: "Diana Prince", email: "diana@acme.com", role: "Admin", status: "Active" },
        { name: "Eve Wilson", email: "eve@acme.com", role: "Editor", status: "Inactive" },
        { name: "Frank Miller", email: "frank@acme.com", role: "Viewer", status: "Active" },
      ];
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A sortable, searchable team members table. Tap a column header to sort, or search by name or email.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team Members</Text>
            <DataTable
              columns={[
                { key: "name", header: "Name", sortable: true },
                { key: "email", header: "Email", sortable: true },
                { key: "role", header: "Role", sortable: true },
                { key: "status", header: "Status", render: (val) => (
                  <View className={`rounded-full px-2 py-0.5 self-start ${val === "Active" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                    <Text className={`text-xs ${val === "Active" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>{String(val)}</Text>
                  </View>
                )},
              ]}
              data={data}
              searchable
              searchKeys={["name", "email"]}
              searchPlaceholder="Search by name or email..."
              pageSize={4}
              striped
            />
          </View>
        </View>
      );
    },
  "command-menu": () => {
      const [open, setOpen] = useState(false);
      const [log, setLog] = useState("");
      const { toggleTheme } = useAniTheme();
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A Cmd+K-style command palette. Opens as a searchable overlay with grouped commands that actually run.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example</Text>
            <View className="rounded-lg border border-border bg-card p-4 gap-3">
              <Pressable onPress={() => setOpen(true)} accessible accessibilityRole="button" className="flex-row items-center min-h-12 px-4 rounded-md border border-input bg-background">
                <Text className="text-muted-foreground text-sm flex-1">Type a command...</Text>
                <View className="flex-row gap-0.5">
                  <View className="items-center justify-center rounded border border-border bg-muted px-1.5 min-h-5"><Text className="text-[10px] font-mono text-muted-foreground">Cmd</Text></View>
                  <View className="items-center justify-center rounded border border-border bg-muted px-1.5 min-h-5"><Text className="text-[10px] font-mono text-muted-foreground">K</Text></View>
                </View>
              </Pressable>
              {log ? <Text variant="muted">{log}</Text> : null}
              <CommandMenu
                open={open}
                onOpenChange={setOpen}
                onSelect={(value) => {
                  if (value === "toggle-theme") { toggleTheme(); setLog("Theme toggled"); }
                  if (value === "profile") setLog("Navigated to Profile");
                  if (value === "signout") setLog("Signed out");
                }}
                items={[
                  { label: "Toggle Theme", value: "toggle-theme", group: "Actions", shortcut: "Cmd+J" },
                  { label: "Go to Profile", value: "profile", group: "Navigation" },
                  { label: "Sign Out", value: "signout", group: "Account" },
                ]}
              />
            </View>
          </View>
        </View>
      );
    },
  field: () => {
    const [username, setUsername] = useState("jcooper2");
    const [notify, setNotify] = useState(true);
    const taken = username.trim().toLowerCase() === "jcooper2";
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Field composes a label, control, and helper or error text into one accessible row — vertical by default, horizontal for compact settings rows.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Edit Profile</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-4">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input placeholder="username" value={username} onChangeText={setUsername} autoCapitalize="none" />
              <FieldError errors={taken ? ["That username is already taken"] : undefined} />
            </Field>
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Textarea placeholder="Tell us about yourself..." />
              <FieldDescription>Shown on your public profile.</FieldDescription>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel>Email notifications</FieldLabel>
              <Switch value={notify} onValueChange={setNotify} />
            </Field>
          </View>
        </View>
      </View>
    );
  },
  "input-group": () => {
    const [amount, setAmount] = useState("");
    const [query, setQuery] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Compose addons, icons, and buttons around an input — used here for a payment amount and an icon search bar.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Send Money</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>Amount</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
              <InputGroupAddon align="end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Search Products</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <InputGroup>
              <InputGroupAddon>
                <Search size={16} color="#71717a" />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search products..." value={query} onChangeText={setQuery} />
              <InputGroupButton onPress={() => {}} variant="default" size="sm">
                Go
              </InputGroupButton>
            </InputGroup>
          </View>
        </View>
      </View>
    );
  },
  kbd: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Keyboard shortcut hints the way a command palette or help screen shows them — paired with the action they trigger.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Command Palette</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">Open command palette</Text>
            <KbdGroup><Kbd>Cmd</Kbd><Kbd>K</Kbd></KbdGroup>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">New document</Text>
            <KbdGroup><Kbd>Cmd</Kbd><Kbd>N</Kbd></KbdGroup>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">Search everywhere</Text>
            <KbdGroup><Kbd>Cmd</Kbd><Kbd>Shift</Kbd><Kbd>F</Kbd></KbdGroup>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm text-foreground flex-1">Close this dialog</Text>
            <Kbd>Esc</Kbd>
          </View>
        </View>
      </View>
    </View>
  ),
  "hover-card": () => {
      const [open, setOpen] = useState(false);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">Press a username to preview their profile inline. No hover on mobile — this triggers on press instead.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comment</Text>
            <View className="rounded-lg border border-border bg-card p-4 gap-1">
              <View className="flex-row items-center gap-1 flex-wrap">
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
                          <Text className="text-xs text-muted-foreground">@aniui · 12.4k followers</Text>
                        </View>
                      </View>
                      <Text className="text-xs text-muted-foreground">Beautiful React Native components. Copy. Paste. Ship.</Text>
                    </View>
                  </HoverCardContent>
                </HoverCard>
                <Text className="text-sm text-foreground">shipped the new dropdown-menu component 🎉</Text>
              </View>
            </View>
          </View>
        </View>
      );
    },
  "direction-provider": () => {
    const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">RTL/LTR direction context for right-to-left language support — toggle to preview a real search bar flip layout.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direction Toggle</Text>
          <View className="rounded-lg border border-border bg-card p-4 flex-row gap-2">
            <Pressable onPress={() => setDir("ltr")} accessible accessibilityRole="button" className={`flex-1 items-center py-3 min-h-12 rounded-md border ${dir === "ltr" ? "bg-primary border-primary" : "border-input bg-background"}`}>
              <Text className={`text-sm font-medium ${dir === "ltr" ? "text-primary-foreground" : "text-foreground"}`}>LTR</Text>
            </Pressable>
            <Pressable onPress={() => setDir("rtl")} accessible accessibilityRole="button" className={`flex-1 items-center py-3 min-h-12 rounded-md border ${dir === "rtl" ? "bg-primary border-primary" : "border-input bg-background"}`}>
              <Text className={`text-sm font-medium ${dir === "rtl" ? "text-primary-foreground" : "text-foreground"}`}>RTL</Text>
            </Pressable>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preview ({dir.toUpperCase()})</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3" style={{ direction: dir }}>
            <Text className="text-sm font-medium text-foreground">{dir === "rtl" ? "مرحبا بالعالم" : "Hello World"}</Text>
            <View className="flex-row gap-2">
              <View className="flex-1 min-h-10 rounded-md border border-input bg-background px-3 justify-center">
                <Text className="text-xs text-muted-foreground">{dir === "rtl" ? "بحث..." : "Search..."}</Text>
              </View>
              <View className="min-h-10 px-4 rounded-md bg-primary justify-center">
                <Text className="text-xs font-medium text-primary-foreground">{dir === "rtl" ? "إرسال" : "Go"}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  },
  text: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Semantic typography variants shown as a real article preview, not just a bare heading list.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Article Preview</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-2">
          <Text variant="h2">The State of React Native in 2026</Text>
          <Text variant="lead">A look at the New Architecture, one year after it became the default.</Text>
          <Text variant="p">Most teams have now migrated their apps, and the ecosystem has largely caught up — from navigation libraries to gesture handling.</Text>
          <View className="flex-row gap-3">
            <Text variant="small">8 min read</Text>
            <Text variant="muted">Published Jan 3</Text>
          </View>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heading Scale</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
        </View>
      </View>
    </View>
  ),
  badge: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Status labels on a real order list — each variant maps to a meaningful state, not just a color swatch.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Orders</Text>
        <View className="rounded-lg border border-border bg-card p-4 gap-3">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">#4021 · Maya Chen</Text>
            <Badge>Shipped</Badge>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">#4020 · Theo Marsh</Text>
            <Badge variant="secondary">Processing</Badge>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">#4019 · Priya Nair</Text>
            <Badge variant="outline">Pending payment</Badge>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground flex-1">#4018 · Jonas Weber</Text>
            <Badge variant="destructive">Cancelled</Badge>
          </View>
        </View>
      </View>
    </View>
  ),
  card: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">A compound card — header, content, and footer — used here for a real pricing plan and a plain notice.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pricing Plan</Text>
        <Card>
          <CardHeader>
            <CardTitle>Pro plan</CardTitle>
            <CardDescription>$12/month · billed annually, cancel anytime.</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Check size={16} color="#71717a" />
                <Text className="text-sm text-foreground">Unlimited projects</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Check size={16} color="#71717a" />
                <Text className="text-sm text-foreground">Advanced analytics</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Check size={16} color="#71717a" />
                <Text className="text-sm text-foreground">Priority support</Text>
              </View>
            </View>
          </CardContent>
          <CardFooter>
            <Button className="flex-1">Upgrade to Pro</Button>
          </CardFooter>
        </Card>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plain Notice</Text>
        <Card>
          <CardContent>
            <Text className="text-sm text-foreground">Your trial ends in 3 days. Upgrade to keep access to premium features.</Text>
          </CardContent>
        </Card>
      </View>
    </View>
  ),
  avatar: () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A circular avatar that shows a photo with a graceful fallback to initials when there's no image or it fails to load.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile Header</Text>
          <View className="rounded-xl border border-border bg-card p-4 flex-row items-center gap-3">
            <Avatar size="lg" src="https://picsum.photos/seed/sarah-chen/150/150" fallback="SC" />
            <View className="flex-1 gap-1">
              <Text className="text-base font-semibold text-foreground">Sarah Chen</Text>
              <Text className="text-sm text-muted-foreground">Product Designer</Text>
            </View>
            <Badge variant="secondary">Pro</Badge>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comments</Text>
          <View className="rounded-xl border border-border bg-card divide-y divide-border">
            <View className="flex-row items-start gap-3 px-4 py-3">
              <Avatar size="sm" src="https://picsum.photos/seed/marcus-lee/150/150" fallback="ML" />
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">Marcus Lee</Text>
                <Text className="text-sm text-muted-foreground">Can we bump the padding on this card?</Text>
              </View>
            </View>
            <View className="flex-row items-start gap-3 px-4 py-3">
              <Avatar size="sm" fallback="JD" />
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">Jamie Diaz</Text>
                <Text className="text-sm text-muted-foreground">Agreed, looks a little tight on smaller screens.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ),
  "aspect-ratio": () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Locks a container to a fixed ratio — used here for a video thumbnail and a square photo thumbnail, the way a media feed would.</Text>
      <AspectRatio ratio={16 / 9} className="rounded-lg">
        <AniImage src="https://picsum.photos/seed/aniui-video/800/450" alt="Video thumbnail" className="w-full h-full" rounded="lg" />
      </AspectRatio>
      <AspectRatio ratio={1} className="w-28 rounded-lg">
        <AniImage src="https://picsum.photos/seed/aniui-thumb/400/400" alt="Photo thumbnail" className="w-full h-full" rounded="lg" />
      </AspectRatio>
    </View>
  ),
  breadcrumb: () => {
      const [path, setPath] = useState(["Home", "Electronics", "Laptops"]);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">Shows where the current screen sits in a navigation hierarchy — tap an earlier crumb to jump back.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category Browser</Text>
            <View className="rounded-xl border border-border bg-card p-4">
              <Breadcrumb>
                {path.map((label, i) => (
                  <React.Fragment key={label}>
                    <BreadcrumbItem>
                      {i === path.length - 1 ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink onPress={() => setPath(path.slice(0, i + 1))}>{label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {i < path.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </Breadcrumb>
              <Text className="mt-3 text-sm text-muted-foreground">Now viewing: {path[path.length - 1]}</Text>
            </View>
          </View>
        </View>
      );
    },
  menubar: () => {
      const [lastAction, setLastAction] = useState("No action yet");
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A desktop-style menu bar for larger-screen layouts — tap a menu to open it, pick an item to run it.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document Editor Toolbar</Text>
            <View className="gap-3 rounded-xl border border-border bg-card p-4">
              <Menubar>
                <MenubarMenu trigger="File">
                  <MenubarItem onPress={() => setLastAction("Created a new document")}>New Document</MenubarItem>
                  <MenubarItem onPress={() => setLastAction("Opened a document")}>Open…</MenubarItem>
                  <MenubarItem onPress={() => setLastAction("Saved the document")}>Save</MenubarItem>
                </MenubarMenu>
                <MenubarMenu trigger="Edit">
                  <MenubarItem onPress={() => setLastAction("Undid the last change")}>Undo</MenubarItem>
                  <MenubarItem onPress={() => setLastAction("Copied the selection")}>Copy</MenubarItem>
                  <MenubarItem onPress={() => setLastAction("Pasted from clipboard")}>Paste</MenubarItem>
                </MenubarMenu>
                <MenubarMenu trigger="View">
                  <MenubarItem onPress={() => setLastAction("Toggled the sidebar")}>Toggle Sidebar</MenubarItem>
                  <MenubarItem onPress={() => setLastAction("Zoomed in")}>Zoom In</MenubarItem>
                </MenubarMenu>
              </Menubar>
              <Text className="text-sm text-muted-foreground">{lastAction}</Text>
            </View>
          </View>
        </View>
      );
    },
  sidebar: () => {
      const [active, setActive] = useState("Dashboard");
      const navItems = [
        { label: "Dashboard", icon: LayoutDashboard },
        { label: "Analytics", icon: BarChart3 },
        { label: "Projects", icon: FolderKanban },
        { label: "Team", icon: Users },
        { label: "Settings", icon: Settings },
      ];
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">Collapsible side navigation for a dashboard app — tap the menu icon to toggle the panel.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dashboard Navigation</Text>
            <View className="h-80 overflow-hidden rounded-xl border border-border">
              <SidebarProvider>
                <Sidebar width={200}>
                  <Text className="mb-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Workspace</Text>
                  <View className="gap-1">
                    {navItems.map(({ label, icon: Icon }) => (
                      <Pressable
                        key={label}
                        onPress={() => setActive(label)}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityState={{ selected: active === label }}
                        className={active === label ? "flex-row items-center gap-3 rounded-lg px-3 py-2.5 min-h-12 bg-secondary" : "flex-row items-center gap-3 rounded-lg px-3 py-2.5 min-h-12"}
                      >
                        <Icon size={16} color={active === label ? "#18181b" : "#71717a"} />
                        <Text className={active === label ? "text-sm font-semibold text-foreground" : "text-sm text-muted-foreground"}>{label}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Sidebar>
                <View className="flex-1 p-4">
                  <View className="flex-row items-center gap-3">
                    <SidebarTrigger />
                    <Text className="text-base font-semibold text-foreground">{active}</Text>
                  </View>
                  <Text className="mt-3 text-sm text-muted-foreground">Content for the {active} section.</Text>
                </View>
              </SidebarProvider>
            </View>
          </View>
        </View>
      );
    },
  separator: () => (
    <View className="rounded-lg border border-border bg-card p-4 gap-3">
      <Text className="text-sm font-medium text-foreground">Notifications</Text>
      <Text className="text-sm font-medium text-foreground">Privacy</Text>
      <Separator />
      <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">More options</Text>
      <Text className="text-sm text-foreground">Sign out</Text>
      <Text className="text-sm text-destructive">Delete account</Text>
    </View>
  ),
  label: () => (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">A styled label above a form field — pairs directly with Input, Textarea, or any control.</Text>
      <View className="gap-2">
        <Label>Email address</Label>
        <Input placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      </View>
      <View className="gap-2">
        <Label>Full name</Label>
        <Input placeholder="Jane Cooper" />
      </View>
    </View>
  ),
  skeleton: () => (
    <View className="gap-2">
      <Text className="text-sm text-muted-foreground">Placeholder shapes matching a real contact-list item — avatar, name, and subtitle — shown while data loads.</Text>
      <View className="rounded-lg border border-border bg-card p-4 gap-4">
        <View className="flex-row items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <View className="gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <View className="gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </View>
        </View>
      </View>
    </View>
  ),
  spinner: () => {
    const [loaded, setLoaded] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">An activity indicator for real loading states — a feed screen before its data arrives.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Loading Your Feed</Text>
          <View className="rounded-lg border border-border bg-card p-8 items-center gap-3">
            {loaded ? (
              <Text className="text-sm text-foreground">Feed loaded — 12 new posts</Text>
            ) : (
              <>
                <Spinner size="lg" />
                <Text className="text-sm text-muted-foreground">Loading your feed...</Text>
              </>
            )}
          </View>
          <Button variant="outline" onPress={() => setLoaded((v) => !v)}>{loaded ? "Reset" : "Simulate load complete"}</Button>
        </View>
      </View>
    );
  },
  progress: () => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isComplete = progress >= 100;

    const startUpload = () => {
      if (uploading || isComplete) return;
      setUploading(true);
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(100, prev + 10);
          if (next >= 100 && timerRef.current) {
            clearInterval(timerRef.current);
            setUploading(false);
          }
          return next;
        });
      }, 300);
    };

    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A horizontal progress bar that fills to indicate completion — here driving a live file upload.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Uploading File</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 rounded-lg bg-secondary items-center justify-center">
                {isComplete ? <Check size={18} color="#71717a" /> : <Upload size={18} color="#71717a" />}
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-sm font-medium text-foreground" numberOfLines={1}>design-assets.zip</Text>
                <Progress value={progress} />
              </View>
              <Text className="text-xs text-muted-foreground w-10 text-right">{progress}%</Text>
            </View>
            <Button variant="outline" onPress={startUpload} disabled={uploading || isComplete}>
              {isComplete ? "Upload complete" : uploading ? "Uploading…" : "Start upload"}
            </Button>
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
    );
  },
  "empty-state": () => {
    const [searchCleared, setSearchCleared] = useState(false);
    const [retrying, setRetrying] = useState(false);

    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A placeholder view for empty lists, search results, or error states. Supports title, description, icon, and an optional action button.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">No Search Results</Text>
          <View className="rounded-xl border border-border bg-card p-6">
            {searchCleared ? (
              <EmptyState icon={<Search size={40} color="#71717a" />} title="Search cleared" description="Start typing to search again." />
            ) : (
              <EmptyState
                icon={<Search size={40} color="#71717a" />}
                title="No results found"
                description={'We couldn\'t find anything matching "wireless headphones".'}
                action={{ label: "Clear search", onPress: () => setSearchCleared(true) }}
              />
            )}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Empty Inbox</Text>
          <View className="rounded-xl border border-border bg-card p-6">
            <EmptyState icon={<Inbox size={40} color="#71717a" />} title="Your inbox is empty" description="When you receive messages, they'll appear here." />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Error State</Text>
          <View className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <EmptyState
              icon={<AlertTriangle size={40} color="#71717a" />}
              title="Something went wrong"
              description="We couldn't load your data. Please check your connection and try again."
              action={{ label: retrying ? "Retrying…" : "Retry", onPress: () => setRetrying(true) }}
            />
          </View>
        </View>
      </View>
    );
  },
  alert: () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Contextual feedback banners shown inline in a form or screen — e.g. payment failures or subscription notices.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Checkout Form</Text>
        <View className="gap-3">
          <Alert variant="destructive" title="Payment failed">
            <AlertDescription>Your card was declined. Check your card details or try a different payment method.</AlertDescription>
          </Alert>
          <Alert variant="success" title="Payment method saved">
            <AlertDescription>Your Visa ending in 4242 will be used for future charges.</AlertDescription>
          </Alert>
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subscription Status</Text>
        <View className="gap-3">
          <Alert variant="default" title="Your plan renews tomorrow">
            <AlertDescription>You'll be charged $12.00 for the Pro plan on Sept 6.</AlertDescription>
          </Alert>
          <Alert variant="warning" title="Trial ending soon">
            <AlertDescription>Your free trial ends in 3 days. Add a payment method to keep Pro features.</AlertDescription>
          </Alert>
        </View>
      </View>
    </View>
  ),
  banner: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View className="gap-3">
        {visible ? (
          <Banner
            variant="info"
            icon={<Download size={18} color="#71717a" />}
            action={{ label: "Update", onPress: () => setVisible(false) }}
            onDismiss={() => setVisible(false)}
          >
            A new version is available — update now for the latest features.
          </Banner>
        ) : (
          <Button variant="outline" onPress={() => setVisible(true)}>Show banner again</Button>
        )}
      </View>
    );
  },
  toast: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  accordion: () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A collapsible list of questions and answers — great for FAQ and help sections. Only one item opens at a time.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipping & Returns</Text>
          <View className="rounded-lg border border-border bg-card overflow-hidden">
            <Accordion defaultValue="shipping-time">
              <AccordionItem value="shipping-time" trigger="How long does shipping take?">
                <Text className="text-sm text-muted-foreground">Standard orders arrive in 3-5 business days. Express orders arrive in 1-2 business days.</Text>
              </AccordionItem>
              <AccordionItem value="returns" trigger="Can I return an item?">
                <Text className="text-sm text-muted-foreground">Yes — unused items can be returned within 30 days of delivery for a full refund.</Text>
              </AccordionItem>
              <AccordionItem value="international" trigger="Do you ship internationally?">
                <Text className="text-sm text-muted-foreground">We ship to over 40 countries. International orders may be subject to customs fees.</Text>
              </AccordionItem>
              <AccordionItem value="tracking" trigger="How do I track my order?">
                <Text className="text-sm text-muted-foreground">You'll get a tracking link by email as soon as your order ships.</Text>
              </AccordionItem>
            </Accordion>
          </View>
        </View>
      </View>
    ),
  tabs: () => {
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">Tab navigation for switching between related views without leaving the screen.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile</Text>
            <Text className="text-sm text-muted-foreground">A profile screen split into Posts, About, and Photos.</Text>
            <View className="rounded-lg border border-border bg-card p-4">
              <Tabs defaultValue="posts" variant="line">
                <TabsList>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>
                <TabsContent value="posts">
                  <View className="gap-2 py-3">
                    <Text className="text-sm text-foreground">Just shipped v0.3 of AniUI 🚀</Text>
                    <Text className="text-sm text-foreground">Working on dark mode polish this week.</Text>
                  </View>
                </TabsContent>
                <TabsContent value="about">
                  <Text className="text-sm text-muted-foreground py-3">Building open-source tools for React Native. Based in Bengaluru.</Text>
                </TabsContent>
                <TabsContent value="photos">
                  <View className="flex-row gap-2 py-3">
                    <View className="h-16 w-16 rounded-md bg-primary/10" />
                    <View className="h-16 w-16 rounded-md bg-primary/20" />
                    <View className="h-16 w-16 rounded-md bg-primary/30" />
                  </View>
                </TabsContent>
              </Tabs>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Page</Text>
            <Text className="text-sm text-muted-foreground">Overview, reviews, and specs for a single product.</Text>
            <View className="rounded-lg border border-border bg-card p-4">
              <Tabs defaultValue="overview" size="sm">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="specs">Specs</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Text className="text-sm text-muted-foreground py-3">Noise-cancelling over-ear headphones with 30-hour battery life.</Text>
                </TabsContent>
                <TabsContent value="reviews">
                  <View className="gap-2 py-3">
                    <Rating value={4} readOnly />
                    <Text className="text-sm text-muted-foreground">4.0 average from 128 reviews</Text>
                  </View>
                </TabsContent>
                <TabsContent value="specs">
                  <View className="gap-1 py-3">
                    <Text className="text-sm text-muted-foreground">Weight: 250g</Text>
                    <Text className="text-sm text-muted-foreground">Battery: 30 hours</Text>
                    <Text className="text-sm text-muted-foreground">Bluetooth: 5.3</Text>
                  </View>
                </TabsContent>
              </Tabs>
            </View>
          </View>
        </View>
      );
    },
  collapsible: () => {
      const [open, setOpen] = useState(false);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">An expandable section for details that don't need to be visible by default — like a price breakdown.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Summary</Text>
            <View className="rounded-lg border border-border bg-card overflow-hidden">
              <View className="flex-row items-center justify-between px-4 py-3">
                <Text className="text-sm text-muted-foreground">Total</Text>
                <Text className="text-base font-semibold text-foreground">$84.50</Text>
              </View>
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger className="flex-row items-center justify-between px-4 py-3 border-t border-border min-h-12">
                  <Text className="text-sm font-medium text-primary">{open ? "Hide price breakdown" : "Show price breakdown"}</Text>
                  <ChevronDown size={16} color="#71717a" style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <View className="gap-2 px-4 pb-4">
                    <View className="flex-row justify-between"><Text className="text-sm text-muted-foreground">Subtotal</Text><Text className="text-sm text-foreground">$76.00</Text></View>
                    <View className="flex-row justify-between"><Text className="text-sm text-muted-foreground">Shipping</Text><Text className="text-sm text-foreground">$4.50</Text></View>
                    <View className="flex-row justify-between"><Text className="text-sm text-muted-foreground">Tax</Text><Text className="text-sm text-foreground">$4.00</Text></View>
                  </View>
                </CollapsibleContent>
              </Collapsible>
            </View>
          </View>
        </View>
      );
    },
  "labeled-separator": () => (
    <View className="gap-2">
      <Text className="text-sm text-muted-foreground">A labeled divider splitting a sign-in form's email field from social auth options.</Text>
      <View className="rounded-lg border border-border bg-card p-4 gap-4">
        <Input placeholder="you@example.com" />
        <Button>Continue with email</Button>
        <LabeledSeparator label="OR CONTINUE WITH" />
        <Button variant="outline">Continue with Apple</Button>
        <Button variant="outline">Continue with Google</Button>
      </View>
    </View>
  ),
  image: () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A styled image with a loading placeholder and a graceful fallback when the source fails to load.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Photo</Text>
          <AniImage src="https://picsum.photos/seed/product-photo/300/200" alt="Wool scarf, folded on a table" width={300} height={200} rounded="md" />
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Broken Source (fallback)</Text>
          <AniImage
            src="https://invalid-url.example/photo.jpg"
            alt="Broken"
            width={300}
            height={200}
            rounded="md"
            fallback={<View className="flex-1 items-center justify-center bg-muted rounded-md"><Text className="text-xs text-muted-foreground">Photo unavailable</Text></View>}
          />
        </View>
      </View>
    ),
  "progress-steps": () => {
    const [step, setStep] = useState(0);
    const stepContent = [
      { title: "Create Account", desc: "Enter your email and choose a password to get started." },
      { title: "Set Up Profile", desc: "Add your name, photo, and bio so others can find you." },
      { title: "Review & Submit", desc: "Double-check your details and confirm to complete setup." },
    ];
    const isDone = step >= stepContent.length;
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A multi-step progress indicator for onboarding flows, checkout, or form wizards — advance through a real sign-up flow below.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sign-Up Flow</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-4">
            <ProgressSteps current={step}>
              <ProgressStep label="Account" />
              <ProgressStep label="Profile" />
              <ProgressStep label="Review" />
            </ProgressSteps>
            <View className="rounded-lg bg-secondary/30 p-4 gap-1">
              <Text className="text-sm font-semibold text-foreground">{isDone ? "All done!" : stepContent[step].title}</Text>
              <Text className="text-xs text-muted-foreground">{isDone ? "Your account has been created successfully." : stepContent[step].desc}</Text>
            </View>
            <View className="flex-row gap-3">
              <Button variant="outline" className="flex-1" onPress={() => setStep((s) => Math.max(0, s - 1))} disabled={step <= 0}>Back</Button>
              <Button className="flex-1" onPress={() => setStep((s) => Math.min(stepContent.length, s + 1))} disabled={isDone}>{step === stepContent.length - 1 ? "Submit" : "Next"}</Button>
            </View>
          </View>
        </View>
      </View>
    );
  },
  list: () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A settings-style list of tappable rows, each with a leading icon, title, description, and trailing chevron.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</Text>
          <View className="rounded-xl border border-border bg-card overflow-hidden">
            <List>
              <ListItem>
                <View className="flex-row items-center gap-3 flex-1">
                  <Bell size={18} color="#71717a" strokeWidth={2} />
                  <View className="flex-1">
                    <ListItemTitle>Notifications</ListItemTitle>
                    <ListItemDescription>Manage your notification preferences</ListItemDescription>
                  </View>
                  <ChevronRight size={16} color="#71717a" strokeWidth={2} />
                </View>
              </ListItem>
              <ListItem>
                <View className="flex-row items-center gap-3 flex-1">
                  <Lock size={18} color="#71717a" strokeWidth={2} />
                  <View className="flex-1">
                    <ListItemTitle>Privacy</ListItemTitle>
                    <ListItemDescription>Control your privacy settings</ListItemDescription>
                  </View>
                  <ChevronRight size={16} color="#71717a" strokeWidth={2} />
                </View>
              </ListItem>
              <ListItem>
                <View className="flex-row items-center gap-3 flex-1">
                  <Shield size={18} color="#71717a" strokeWidth={2} />
                  <View className="flex-1">
                    <ListItemTitle>Security</ListItemTitle>
                    <ListItemDescription>Password and authentication</ListItemDescription>
                  </View>
                  <ChevronRight size={16} color="#71717a" strokeWidth={2} />
                </View>
              </ListItem>
            </List>
          </View>
        </View>
      </View>
    ),
  table: () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A lightweight table for schedules or plan comparisons — plain rows and cells, styled to match the rest of the design system.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plan Comparison</Text>
          <View className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Feature</TableHead><TableHead>Free</TableHead><TableHead>Pro</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Projects</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Team members</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Text className="text-sm text-foreground">Priority support</Text></TableCell>
                  <TableCell><X size={16} color="#71717a" strokeWidth={2} /></TableCell>
                  <TableCell><Check size={16} color="#22c55e" strokeWidth={2.5} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </View>
        </View>
      </View>
    ),
  grid: () => {
      const products = [
        { id: "1", name: "Canvas Tote", price: 28, seed: "tote" },
        { id: "2", name: "Ceramic Mug", price: 16, seed: "mug" },
        { id: "3", name: "Wool Scarf", price: 42, seed: "scarf" },
        { id: "4", name: "Leather Wallet", price: 54, seed: "wallet" },
        { id: "5", name: "Desk Lamp", price: 65, seed: "lamp" },
        { id: "6", name: "Notebook Set", price: 19, seed: "notebook" },
      ];
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A column-based grid for browsing photo or product catalogs — scrolls vertically and wraps items into equal-width columns.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Grid</Text>
            <Grid
              data={products}
              columns={2}
              gap={12}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="rounded-xl border border-border bg-card overflow-hidden">
                  <AniImage src={`https://picsum.photos/seed/${item.seed}/300/300`} alt={item.name} rounded="none" className="w-full h-[140px]" />
                  <View className="p-3 gap-0.5">
                    <Text className="text-sm font-medium text-foreground">{item.name}</Text>
                    <Price amount={item.price} currency="USD" />
                  </View>
                </View>
              )}
            />
          </View>
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
  "chat-bubble": () => {
    const [status, setStatus] = useState<"sent" | "delivered" | "read">("delivered");
    const cycle = () => setStatus((s) => (s === "sent" ? "delivered" : s === "delivered" ? "read" : "sent"));
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A real support thread — sent bubbles show delivery status; tap the last one to cycle it.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Support Chat</Text>
          <View className="gap-2 rounded-2xl border border-border bg-card p-3">
            <ChatBubble variant="received" timestamp="2:30 PM">Hi! I'm Ava from support — how can I help?</ChatBubble>
            <ChatBubble variant="sent" timestamp="2:31 PM" status="read">My order #4821 hasn't shipped yet.</ChatBubble>
            <ChatBubble variant="received" timestamp="2:32 PM">Let me check that for you now.</ChatBubble>
            <Pressable accessibilityRole="button" onPress={cycle} className="self-end">
              <ChatBubble variant="sent" timestamp="2:33 PM" status={status}>Thanks, appreciate it!</ChatBubble>
            </Pressable>
          </View>
        </View>
      </View>
    );
  },
  "stat-card": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A compact KPI card for dashboards — a label, a value, and a trend delta versus the previous period.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dashboard</Text>
          <View className="gap-3">
            <StatCard label="Total Revenue" value="$12,400" change={12.4} trend="up" icon={<DollarSign size={16} color="#71717a" strokeWidth={2} />} />
            <StatCard label="Active Users" value="3,204" change={4.1} trend="up" icon={<Users size={16} color="#71717a" strokeWidth={2} />} />
            <StatCard label="Orders" value="182" change={-2.6} trend="down" icon={<ShoppingCart size={16} color="#71717a" strokeWidth={2} />} />
          </View>
        </View>
      </View>
    ),
  price: () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Formatted currency display via Intl.NumberFormat — supports a strikethrough original price alongside the current price.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Card</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-1">
            <Text className="text-sm font-medium text-foreground">Wireless Headphones</Text>
            <View className="flex-row items-center gap-3">
              <Price amount={129.99} currency="USD" strikethrough />
              <Price amount={89.99} currency="USD" />
              <View className="rounded-full bg-destructive/10 px-2 py-0.5">
                <Text className="text-destructive text-xs font-medium">Save 31%</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plan Pricing</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-1">
            <Text className="text-sm font-medium text-foreground">Pro Plan</Text>
            <Price amount={19} currency="USD" prefix="From " />
            <Text className="text-xs text-muted-foreground">Billed monthly, cancel anytime</Text>
          </View>
        </View>
      </View>
    ),
  "status-indicator": () => {
    const teammates: { name: string; status: "online" | "away" | "busy" | "offline" }[] = [
      { name: "Priya Sharma", status: "online" },
      { name: "Marcus Chen", status: "away" },
      { name: "Jordan Lee", status: "busy" },
      { name: "Sam Okafor", status: "offline" },
    ];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A small colored dot indicating presence — shown here next to each teammate in a team roster.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team Members</Text>
          <View className="rounded-lg border border-border bg-card">
            {teammates.map((person, index) => (
              <React.Fragment key={person.name}>
                {index > 0 && <Separator />}
                <View className="flex-row items-center gap-3 px-4 py-3">
                  <StatusIndicator status={person.status} pulse={person.status === "online"} />
                  <Text className="text-sm text-foreground flex-1">{person.name}</Text>
                  <Text className="text-xs text-muted-foreground capitalize">{person.status}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    );
  },
  "typing-indicator": () => {
    const [typing, setTyping] = useState(true);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Shown in place of the next message while a reply is being composed — swapped out once it actually arrives.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sarah is typing…</Text>
          <View className="gap-2 rounded-2xl border border-border bg-card p-3">
            <ChatBubble variant="sent" timestamp="9:14 AM" status="read">Are you still coming to the review at 10?</ChatBubble>
            {typing ? (
              <TypingIndicator />
            ) : (
              <ChatBubble variant="received" timestamp="9:15 AM">Yep, on my way now!</ChatBubble>
            )}
            <Button variant="outline" onPress={() => setTyping((t) => !t)}>{typing ? "Message arrives" : "Reset"}</Button>
          </View>
        </View>
      </View>
    );
  },
  "connection-banner": () => {
    const [connected, setConnected] = useState(true);
    return (
      <View className="gap-4">
        <Text className="text-sm text-muted-foreground">A slide-in banner that reports network status. Real connectivity can't be toggled in this preview, so the button below simulates it.</Text>
        <ConnectionBanner connected={connected} />
        <Button variant="outline" onPress={() => setConnected(!connected)}>{connected ? "Simulate going offline" : "Simulate coming back online"}</Button>
      </View>
    );
  },
  dialog: () => {
      const [open, setOpen] = useState(false);
      const [name, setName] = useState("Alex Rivera");
      const [draft, setDraft] = useState(name);
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">Edit profile details in a focused modal, then save back to the screen behind it.</Text>
          <View className="rounded-lg border border-border bg-card p-4 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-foreground">{name}</Text>
              <Text className="text-xs text-muted-foreground">Product Designer</Text>
            </View>
            <Button size="sm" onPress={() => { setDraft(name); setOpen(true); }}>Edit</Button>
          </View>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your display name.</DialogDescription>
              </DialogHeader>
              <View className="gap-2 py-2">
                <Label>Name</Label>
                <Input value={draft} onChangeText={setDraft} placeholder="Your name" />
              </View>
              <DialogFooter>
                <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
                <Button onPress={() => { setName(draft); setOpen(false); }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      );
    },
  "alert-dialog": () => {
      const [items, setItems] = useState(["Q3 Roadmap", "Marketing Site Redesign"]);
      const [pending, setPending] = useState<string | null>(null);
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">A destructive confirmation step before an action that can't be undone.</Text>
          <View className="rounded-lg border border-border bg-card overflow-hidden">
            {items.length === 0 ? (
              <View className="px-4 py-6 items-center"><Text className="text-sm text-muted-foreground">No projects left</Text></View>
            ) : items.map((item, i) => (
              <View key={item} className={`flex-row items-center justify-between px-4 py-3 ${i < items.length - 1 ? "border-b border-border" : ""}`}>
                <Text className="text-sm text-foreground">{item}</Text>
                <Button variant="destructive" size="sm" onPress={() => setPending(item)}>Delete</Button>
              </View>
            ))}
          </View>
          <AlertDialog open={pending !== null} onOpenChange={(o) => !o && setPending(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{pending}"?</AlertDialogTitle>
                <AlertDialogDescription>This project and all of its data will be permanently deleted. This can't be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onPress={() => setPending(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onPress={() => { setItems((prev) => prev.filter((i) => i !== pending)); setPending(null); }}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      );
    },
  drawer: () => {
      const [leftOpen, setLeftOpen] = useState(false);
      const [rightOpen, setRightOpen] = useState(false);
      const [filters, setFilters] = useState({ inStock: true, freeShip: false, sale: false });
      const [applied, setApplied] = useState({ inStock: true, freeShip: false, sale: false });
      const resultCount = 128 - (applied.inStock ? 40 : 0) - (applied.freeShip ? 20 : 0) - (applied.sale ? 15 : 0);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A slide-in panel from the left or right edge. Use for navigation menus or filters.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Left: Navigation</Text>
            <Button onPress={() => setLeftOpen(true)}>Open Navigation</Button>
            <Drawer open={leftOpen} onOpenChange={setLeftOpen} side="left">
              <DrawerContent>
                <View className="gap-1 pt-14 px-4">
                  <Text className="text-lg font-bold text-foreground mb-4">Navigation</Text>
                  {["Home", "Explore", "Notifications", "Messages", "Settings"].map((item) => (
                    <Pressable key={item} accessible accessibilityRole="button" className="flex-row items-center gap-3 py-3 px-2 rounded-lg min-h-12 active:bg-accent" onPress={() => setLeftOpen(false)}>
                      <View className="h-8 w-8 rounded-full bg-primary/10 items-center justify-center"><Text className="text-primary text-xs font-bold">{item[0]}</Text></View>
                      <Text className="text-foreground text-sm">{item}</Text>
                    </Pressable>
                  ))}
                </View>
              </DrawerContent>
            </Drawer>
          </View>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Right: Filters ({resultCount} results)</Text>
            <Button variant="outline" onPress={() => { setFilters(applied); setRightOpen(true); }}>Open Filters</Button>
            <Drawer open={rightOpen} onOpenChange={setRightOpen} side="right">
              <DrawerContent>
                <View className="gap-4 pt-14 px-4">
                  <Text className="text-lg font-bold text-foreground">Filters</Text>
                  <View className="gap-3">
                    <View className="flex-row items-center gap-2"><Checkbox checked={filters.inStock} onCheckedChange={() => setFilters((f) => ({ ...f, inStock: !f.inStock }))} /><Text className="text-sm text-foreground">In stock only</Text></View>
                    <View className="flex-row items-center gap-2"><Checkbox checked={filters.freeShip} onCheckedChange={() => setFilters((f) => ({ ...f, freeShip: !f.freeShip }))} /><Text className="text-sm text-foreground">Free shipping</Text></View>
                    <View className="flex-row items-center gap-2"><Checkbox checked={filters.sale} onCheckedChange={() => setFilters((f) => ({ ...f, sale: !f.sale }))} /><Text className="text-sm text-foreground">On sale</Text></View>
                  </View>
                  <View className="flex-row gap-3 mt-4">
                    <Button className="flex-1" onPress={() => { setApplied(filters); setRightOpen(false); }}>Apply</Button>
                    <Button variant="outline" className="flex-1" onPress={() => setRightOpen(false)}>Cancel</Button>
                  </View>
                </View>
              </DrawerContent>
            </Drawer>
          </View>
        </View>
      );
    },
  header: () => {
      const [saved, setSaved] = useState(false);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A screen header with a back button, title, and a real right-side action — swap in for your navigator's default header.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Edit Profile</Text>
            <Text className="text-sm text-muted-foreground">Back button on the left, a primary Save action on the right.</Text>
            <View className="rounded-xl border border-border overflow-hidden">
              <Header>
                <HeaderLeft><HeaderBackButton onPress={() => {}} /></HeaderLeft>
                <HeaderTitle>Edit Profile</HeaderTitle>
                <HeaderRight>
                  <Pressable
                    onPress={() => setSaved(true)}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Save changes"
                    className="min-h-12 min-w-12 flex-row items-center justify-center px-3"
                  >
                    <Text className="text-primary text-sm font-semibold">{saved ? "Saved" : "Save"}</Text>
                  </Pressable>
                </HeaderRight>
              </Header>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversation</Text>
            <Text className="text-sm text-muted-foreground">A title plus an overflow menu for less common actions.</Text>
            <View className="rounded-xl border border-border overflow-hidden">
              <Header>
                <HeaderLeft><HeaderBackButton onPress={() => {}} /></HeaderLeft>
                <HeaderTitle>Priya Sharma</HeaderTitle>
                <HeaderRight>
                  <Pressable
                    onPress={() => {}}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="More options"
                    className="min-h-12 min-w-12 items-center justify-center"
                  >
                    <MoreVertical size={20} color="#71717a" />
                  </Pressable>
                </HeaderRight>
              </Header>
            </View>
          </View>
        </View>
      );
    },
  "tab-bar": () => {
      const [active, setActive] = useState("home");
      const content: Record<string, string> = {
        home: "Your home feed — new posts from people you follow.",
        search: "Search for people, tags, and posts.",
        inbox: "3 unread messages waiting for a reply.",
        profile: "Your posts, followers, and saved items.",
      };
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A bottom tab bar for switching between an app's main sections, with an unread badge on Inbox.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Main Navigation</Text>
            <View className="rounded-xl border border-border overflow-hidden">
              <View className="px-4 py-8 items-center bg-card">
                <Text className="text-sm text-muted-foreground text-center">{content[active]}</Text>
              </View>
              <TabBar>
                <TabBarItem label="Home" active={active === "home"} onPress={() => setActive("home")} icon={<Home size={20} color={active === "home" ? "#18181b" : "#71717a"} />} />
                <TabBarItem label="Search" active={active === "search"} onPress={() => setActive("search")} icon={<Search size={20} color={active === "search" ? "#18181b" : "#71717a"} />} />
                <TabBarItem label="Inbox" active={active === "inbox"} onPress={() => setActive("inbox")} icon={<Bell size={20} color={active === "inbox" ? "#18181b" : "#71717a"} />} badge={3} />
                <TabBarItem label="Profile" active={active === "profile"} onPress={() => setActive("profile")} icon={<User size={20} color={active === "profile" ? "#18181b" : "#71717a"} />} />
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
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A paged horizontal carousel with dot indicators — a natural fit for onboarding flows and product photo galleries.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Onboarding</Text>
            <Carousel
              data={[
                <View className="h-44 rounded-xl bg-primary/10 items-center justify-center px-6"><Text className="text-foreground text-lg font-semibold text-center">Track every habit in one place</Text></View>,
                <View className="h-44 rounded-xl bg-primary/20 items-center justify-center px-6"><Text className="text-foreground text-lg font-semibold text-center">Get a nudge right when you need it</Text></View>,
                <View className="h-44 rounded-xl bg-primary/30 items-center justify-center px-6"><Text className="text-foreground text-lg font-semibold text-center">Celebrate every streak you build</Text></View>,
              ]}
              itemWidth={itemW}
              autoPlay
              interval={4000}
            />
          </View>
        </View>
      );
    },
  pagination: () => {
      const [page, setPage] = useState(3);
      const totalPages = 12;
      const resultsPerPage = 8;
      const totalResults = totalPages * resultsPerPage;
      const start = (page - 1) * resultsPerPage + 1;
      const end = Math.min(page * resultsPerPage, totalResults);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">Numbered page navigation for a long results list.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Search Results</Text>
            <View className="rounded-xl border border-border bg-card p-4 gap-4">
              <Text className="text-sm text-muted-foreground">Showing {start}-{end} of {totalResults} results</Text>
              <Pagination current={page} total={totalPages} onPageChange={setPage} />
              <Text className="text-center text-sm text-muted-foreground">Page {page} of {totalPages}</Text>
            </View>
          </View>
        </View>
      );
    },
  "infinite-list": () => {
      const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
      const [loading, setLoading] = useState(false);
      const hasMore = items.length < 40;
      const loadMore = () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setTimeout(() => {
          setItems((prev) => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
          setLoading(false);
        }, 900);
      };
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A feed that fetches the next page automatically as you approach the bottom of the list.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity Feed ({items.length} loaded)</Text>
            <View className="rounded-xl border border-border bg-card overflow-hidden h-80">
              <InfiniteList
                data={items}
                keyExtractor={(item) => String(item)}
                hasMore={hasMore}
                loading={loading}
                onLoadMore={loadMore}
                renderItem={({ item }) => (
                  <View className="flex-row items-center gap-3 px-4 py-3 border-b border-border">
                    <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center">
                      <Text className="text-primary font-bold">{item}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-foreground">Update #{item}</Text>
                      <Text className="text-xs text-muted-foreground">Loaded automatically on scroll</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      );
    },
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
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A task inbox with real swipe actions — swipe right to pin or archive, swipe left to edit or delete. Actions actually remove the item below.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inbox</Text>
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
          </View>
          {(archived.length > 0 || deleted.length > 0) && (
            <View className="gap-2">
              <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</Text>
              <View className="rounded-lg border border-border bg-card px-4 py-3 flex-row gap-4">
                {archived.length > 0 && <Text className="text-xs text-green-600">{archived.length} archived</Text>}
                {deleted.length > 0 && <Text className="text-xs text-destructive">{deleted.length} deleted</Text>}
              </View>
            </View>
          )}
        </View>
      );
    },
  "safe-area": () => (
    <View className="gap-2">
      <Text className="text-sm text-muted-foreground">Wraps content with safe area insets so it clears the notch, status bar, and home indicator — this whole example app's root layout uses it.</Text>
      <View className="rounded-xl border border-border bg-card p-4 gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Screen Preview</Text>
        <View className="rounded-lg border-2 border-dashed border-primary/30 p-4 items-center">
          <Text className="text-xs text-primary">Safe content area — never touches the notch or home indicator</Text>
        </View>
      </View>
    </View>
  ),
  "refresh-control": () => {
      const [refreshing, setRefreshing] = useState(false);
      const [updatedAt, setUpdatedAt] = useState(() => new Date());
      const feed = ["New comment on your post", "Order #4821 shipped", "3 new followers this week"];
      const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          setUpdatedAt(new Date());
          setRefreshing(false);
        }, 1200);
      };
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A themed pull-to-refresh control — drag the feed down to fetch the latest updates.</Text>
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feed</Text>
              <Text className="text-xs text-muted-foreground">Updated {updatedAt.toLocaleTimeString()}</Text>
            </View>
            <ScrollView
              className="rounded-xl border border-border bg-card h-64"
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              {feed.map((line, i) => (
                <View key={i} className="px-4 py-3 border-b border-border">
                  <Text className="text-sm text-foreground">{line}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      );
    },
  popover: () => {
      const [open, setOpen] = useState(false);
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">A small anchored panel for contextual help, without leaving the screen.</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-foreground">Monthly budget</Text>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Info size={18} color="#71717a" />
              </PopoverTrigger>
              <PopoverContent side="top" align="start">
                <Text className="text-sm font-semibold text-foreground">How this is calculated</Text>
                <Text className="text-xs text-muted-foreground mt-1">Your budget resets on the 1st of each month and includes all linked accounts.</Text>
                <Button size="sm" variant="outline" className="mt-3" onPress={() => setOpen(false)}>Got it</Button>
              </PopoverContent>
            </Popover>
          </View>
        </View>
      );
    },
  "dropdown-menu": () => {
      const [items, setItems] = useState(["Homepage Redesign", "API Migration", "Q4 Report"]);
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">A "..." row-actions menu — the pattern most list rows use for Edit / Duplicate / Delete.</Text>
          <View className="rounded-lg border border-border bg-card overflow-hidden">
            {items.map((item, i) => (
              <View key={item} className={`flex-row items-center justify-between px-4 py-3 ${i < items.length - 1 ? "border-b border-border" : ""}`}>
                <Text className="text-sm text-foreground flex-1">{item}</Text>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical size={18} color="#71717a" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onPress={() => setItems((prev) => prev.map((t, idx) => (idx === i ? `${t} (edited)` : t)))}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onPress={() => setItems((prev) => [...prev.slice(0, i + 1), `${prev[i]} copy`, ...prev.slice(i + 1)])}>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive onPress={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </View>
            ))}
            {items.length === 0 && <View className="px-4 py-6 items-center"><Text className="text-sm text-muted-foreground">No items left</Text></View>}
          </View>
        </View>
      );
    },
  "context-menu": () => {
      const [note, setNote] = useState("Long-press the card below for Copy / Share / Delete.");
      const [deleted, setDeleted] = useState(false);
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">A long-press context menu on a card — the same pattern as a Photos or Files app.</Text>
          {deleted ? (
            <View className="rounded-xl border border-dashed border-border p-6 items-center"><Text className="text-sm text-muted-foreground">Card deleted</Text></View>
          ) : (
            <ContextMenu>
              <ContextMenuTrigger>
                <View className="rounded-xl border border-border bg-card p-4 gap-1">
                  <Text className="text-sm font-medium text-foreground">Product Mockup.fig</Text>
                  <Text className="text-xs text-muted-foreground">2.4 MB · Edited 3h ago</Text>
                </View>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onPress={() => setNote("Copied to clipboard")}>Copy</ContextMenuItem>
                <ContextMenuItem onPress={() => setNote("Share sheet opened")}>Share</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem destructive onPress={() => setDeleted(true)}>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          )}
          <Text className="text-xs text-muted-foreground">{note}</Text>
        </View>
      );
    },
  tooltip: () => (
      <View className="gap-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">Press and hold an icon button to reveal a short explanation.</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-foreground">Sync status</Text>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle size={18} color="#71717a" />
            </TooltipTrigger>
            <TooltipContent side="top">Changes sync automatically every 30 seconds while you're online.</TooltipContent>
          </Tooltip>
        </View>
      </View>
    ),
  "bottom-sheet": () => {
      const sheetRef = useRef<BottomSheetModal>(null);
      const [status, setStatus] = useState("");
      const share = (dest: string) => { setStatus(`Shared to ${dest}`); sheetRef.current?.dismiss(); };
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">A native bottom sheet for secondary actions — pan-to-close, backdrop tap to dismiss.</Text>
          <Button onPress={() => sheetRef.current?.present()}>Share Post</Button>
          {status ? <Text variant="muted">{status}</Text> : null}
          <BottomSheet ref={sheetRef} snapPoints={["40%"]}>
            <Text variant="h3" className="mb-1">Share this post</Text>
            <Text variant="muted" className="mb-4">Choose where to send it.</Text>
            <View className="gap-2">
              <Button variant="outline" onPress={() => share("Messages")}>Messages</Button>
              <Button variant="outline" onPress={() => share("Twitter/X")}>Twitter / X</Button>
              <Button variant="outline" onPress={() => share("Copy link")}>Copy Link</Button>
            </View>
          </BottomSheet>
        </View>
      );
    },
  "action-sheet": () => {
      const sheetRef = useRef<BottomSheetModal>(null);
      const [photo, setPhoto] = useState<string | null>(null);
      const pick = (source: string) => { setPhoto(source); sheetRef.current?.dismiss(); };
      return (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">A native action sheet for choosing between a small set of options, like a photo source.</Text>
          <Pressable
            accessible
            accessibilityRole="button"
            onPress={() => sheetRef.current?.present()}
            className="h-32 rounded-xl border-2 border-dashed border-border items-center justify-center"
          >
            {photo ? <Text className="text-sm text-foreground">{photo}</Text> : <Text className="text-muted-foreground text-sm">Tap to add a photo</Text>}
          </Pressable>
          <ActionSheet
            ref={sheetRef}
            title="Add a photo"
            actions={[
              { label: "Take Photo", onPress: () => pick("Camera photo added") },
              { label: "Choose from Library", onPress: () => pick("Library photo added") },
            ]}
            onCancel={() => sheetRef.current?.dismiss()}
          />
        </View>
      );
    },
  fab: () => {
    const [notes, setNotes] = useState(["Grocery list", "Q3 roadmap draft", "Call dentist"]);
    const addNote = () => setNotes((prev) => [`Untitled note ${prev.length + 1}`, ...prev]);
    return (
      <View className="gap-2">
        <Text className="text-sm text-muted-foreground">A floating action button over a real notes list — tap it to add a new note to the top.</Text>
        <View className="h-64 rounded-lg border border-border bg-card p-4">
          <View className="gap-2">
            {notes.map((note, i) => (
              <View key={i} className="rounded-md bg-secondary px-3 py-2.5">
                <Text className="text-sm text-foreground">{note}</Text>
              </View>
            ))}
          </View>
          <FAB onPress={addNote} icon={<Plus size={22} color="#fafafa" />} accessibilityLabel="New note" />
        </View>
      </View>
    );
  },
  "area-chart": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">SVG area chart with gradient fill. Supports curved/linear lines, grid, labels, and multi-series stacking.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Recurring Revenue</Text>
          <Text className="text-sm text-muted-foreground">MRR for a SaaS product over the last six months, in thousands of dollars.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <AreaChart data={[{ label: "Jan", value: 42 }, { label: "Feb", value: 46 }, { label: "Mar", value: 51 }, { label: "Apr", value: 55 }, { label: "May", value: 62 }, { label: "Jun", value: 68 }]} height={180} color="#3b82f6" curved showGrid showLabels />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New Signups: This Year vs Last Year</Text>
          <Text className="text-sm text-muted-foreground">Weekly new user signups compared against the same period last year.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <AreaChart data={[{ label: "W1", value: 0 }, { label: "W2", value: 0 }, { label: "W3", value: 0 }, { label: "W4", value: 0 }]} height={180} showGrid showLabels series={[{ data: [{ label: "W1", value: 480 }, { label: "W2", value: 520 }, { label: "W3", value: 560 }, { label: "W4", value: 610 }], color: "#3b82f6" }, { data: [{ label: "W1", value: 360 }, { label: "W2", value: 400 }, { label: "W3", value: 420 }, { label: "W4", value: 450 }], color: "#8b5cf6" }]} />
          </View>
        </View>
      </View>
    ),
  "bar-chart": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">SVG bar chart with vertical or horizontal orientation. Supports rounded bars, grid lines, labels, and grouped data.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue by Day (This Week)</Text>
          <Text className="text-sm text-muted-foreground">Daily sales for a coffee shop, with the usual weekend spike.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <BarChart data={[{ label: "Mon", value: 620 }, { label: "Tue", value: 540 }, { label: "Wed", value: 710 }, { label: "Thu", value: 680 }, { label: "Fri", value: 890 }, { label: "Sat", value: 1240 }, { label: "Sun", value: 960 }]} height={200} color="#3b82f6" showGrid showLabels barRadius={4} />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue by Category (This Month)</Text>
          <Text className="text-sm text-muted-foreground">Which product categories are driving the most revenue.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <BarChart data={[{ label: "Electronics", value: 48200, color: "#3b82f6" }, { label: "Clothing", value: 32500, color: "#8b5cf6" }, { label: "Home", value: 21800, color: "#10b981" }, { label: "Beauty", value: 15400, color: "#f59e0b" }]} height={180} horizontal showLabels barRadius={6} />
          </View>
        </View>
      </View>
    ),
  "line-chart": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">SVG line chart with dot markers. Supports curved/linear lines, multi-series, grid, and labels.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Daily Active Users</Text>
          <Text className="text-sm text-muted-foreground">Usage typically dips on weekends for this B2B dashboard product.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <LineChart data={[{ label: "Mon", value: 8200 }, { label: "Tue", value: 8900 }, { label: "Wed", value: 9400 }, { label: "Thu", value: 9100 }, { label: "Fri", value: 10200 }, { label: "Sat", value: 6800 }, { label: "Sun", value: 6100 }]} height={200} color="#10b981" showDots showGrid showLabels />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Signups: This Month vs Last Month</Text>
          <Text className="text-sm text-muted-foreground">Weekly new signups compared to the previous month's cohort.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <LineChart height={200} curved showDots showGrid showLabels series={[{ data: [{ label: "W1", value: 210 }, { label: "W2", value: 265 }, { label: "W3", value: 240 }, { label: "W4", value: 310 }], color: "#3b82f6" }, { data: [{ label: "W1", value: 180 }, { label: "W2", value: 195 }, { label: "W3", value: 220 }, { label: "W4", value: 230 }], color: "#10b981" }]} />
          </View>
        </View>
      </View>
    ),
  "pie-chart": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">SVG pie/donut chart with segments, labels, and configurable inner radius for donut style.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Traffic Sources</Text>
          <Text className="text-sm text-muted-foreground">Where visitors to the marketing site came from last month.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <PieChart data={[{ label: "Direct", value: 38, color: "#3b82f6" }, { label: "Search", value: 29, color: "#8b5cf6" }, { label: "Social", value: 21, color: "#f59e0b" }, { label: "Referral", value: 12, color: "#10b981" }]} height={220} innerRadius={0.6} showLabels />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Marketing Budget Allocation</Text>
          <Text className="text-sm text-muted-foreground">How this quarter's marketing spend is split across channels.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <PieChart data={[{ label: "Paid Ads", value: 40, color: "#3b82f6" }, { label: "Content", value: 25, color: "#8b5cf6" }, { label: "Events", value: 20, color: "#10b981" }, { label: "Partnerships", value: 15, color: "#f59e0b" }]} height={220} innerRadius={0} showLabels />
          </View>
        </View>
      </View>
    ),
  "radar-chart": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">SVG radar/spider chart for comparing multiple variables. Supports dots, grid levels, and multi-series overlay.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vendor Evaluation</Text>
          <Text className="text-sm text-muted-foreground">Scorecard from a procurement review of a new analytics vendor, out of 100.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <RadarChart data={[{ label: "Speed", value: 78 }, { label: "Design", value: 85 }, { label: "Price", value: 60 }, { label: "Support", value: 72 }, { label: "Features", value: 90 }]} height={250} color="#3b82f6" showDots showLabels gridLevels={4} />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AniUI vs Competitor</Text>
          <Text className="text-sm text-muted-foreground">Head-to-head comparison across the criteria buyers care about most.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <RadarChart height={250} showDots showLabels gridLevels={4} series={[{ data: [{ label: "Speed", value: 92 }, { label: "Design", value: 88 }, { label: "Price", value: 95 }, { label: "Support", value: 80 }, { label: "Features", value: 85 }], color: "#3b82f6" }, { data: [{ label: "Speed", value: 70 }, { label: "Design", value: 75 }, { label: "Price", value: 60 }, { label: "Support", value: 65 }, { label: "Features", value: 78 }], color: "#ef4444" }]} />
          </View>
        </View>
      </View>
    ),
  "radial-chart": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">SVG radial progress rings for showing completion or goal tracking. Supports center text, labels, and multiple rings.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Daily Activity Rings</Text>
          <Text className="text-sm text-muted-foreground">Today's progress toward step, calorie, and standing goals.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <RadialChart data={[{ label: "Steps", value: 8400, maxValue: 10000, color: "#3b82f6" }, { label: "Calories", value: 420, maxValue: 500, color: "#ef4444" }, { label: "Stand", value: 9, maxValue: 12, color: "#10b981" }]} height={220} showLabels centerText="84%" centerSubText="8,400 / 10,000 steps" />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Storage Used</Text>
          <Text className="text-sm text-muted-foreground">iCloud storage plan usage for this account.</Text>
          <View className="rounded-xl border border-border bg-card p-4">
            <RadialChart data={[{ label: "Storage", value: 174, maxValue: 256, color: "#8b5cf6" }]} height={180} strokeWidth={12} showLabels centerText="68%" centerSubText="174 GB of 256 GB" />
          </View>
        </View>
      </View>
    ),
  "prompt-input": () => {
    const MODELS = ["Opus 4.8", "Sonnet 4.9", "Haiku 4.5"];
    const [messages, setMessages] = useState<string[]>([]);
    const [model, setModel] = useState(MODELS[0]);
    const [attachment, setAttachment] = useState<string | null>(null);
    const attachSheetRef = useRef<BottomSheetModal>(null);

    const [recording, setRecording] = useState(false);
    const [voiceNotes, setVoiceNotes] = useState<string[]>([]);

    const [streaming, setStreaming] = useState(false);
    const streamTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pickAttachment = (label: string) => {
      setAttachment(label);
      attachSheetRef.current?.dismiss();
    };

    return (
      <View className="gap-8">
        <Text className="text-sm text-muted-foreground">
          Compound ChatGPT/Claude-style AI composer. Every control below is fully wired up — this
          is what shipping a real chat screen with PromptInput actually looks like.
        </Text>

        {/* Claude-style composer — the primary, most complete scenario */}
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Claude-Style Composer</Text>
          <Text className="text-sm text-muted-foreground">
            + opens a real <Text className="text-foreground font-medium">ActionSheet</Text>, the model name opens a real{" "}
            <Text className="text-foreground font-medium">DropdownMenu</Text>, and messages actually send.
          </Text>
          <View className="rounded-2xl border border-border bg-card p-3 gap-2">
            {messages.map((m, i) => (
              <View key={i} className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2">
                <Text className="text-sm text-primary-foreground">{m}</Text>
              </View>
            ))}
            {attachment ? <Text variant="muted">📎 {attachment}</Text> : null}
            <PromptInput onSend={(text) => setMessages((prev) => [...prev, text])}>
              <PromptInputTextarea />
              <PromptInputToolbar>
                <PromptInputButton
                  onPress={() => attachSheetRef.current?.present()}
                  accessibilityLabel="Add attachment"
                >
                  <Plus size={20} color="#71717a" />
                </PromptInputButton>
                <PromptInputSpacer />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <PromptInputButton accessibilityLabel="Choose model">
                      <Text className="text-sm text-muted-foreground">{model}</Text>
                      <ChevronDown size={14} color="#71717a" />
                    </PromptInputButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="end">
                    {MODELS.map((m) => (
                      <DropdownMenuItem key={m} onPress={() => setModel(m)}>{m}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <PromptInputButton
                  onPress={() => setRecording(true)}
                  accessibilityLabel="Dictate"
                >
                  <Mic size={20} color="#71717a" />
                </PromptInputButton>
                <PromptInputSend />
              </PromptInputToolbar>
            </PromptInput>
          </View>
        </View>

        <ActionSheet
          ref={attachSheetRef}
          title="Add to your message"
          actions={[
            { label: "Add photos", onPress: () => pickAttachment("photo.jpg") },
            { label: "Take a screenshot", onPress: () => pickAttachment("screenshot.png") },
            { label: "Files", onPress: () => pickAttachment("report.pdf") },
          ]}
          onCancel={() => attachSheetRef.current?.dismiss()}
        />

        {/* Voice recording — the toolbar swaps to a live Waveform */}
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Voice Recording</Text>
          <Text className="text-sm text-muted-foreground">
            Tap the mic above, or below — the toolbar becomes an animated{" "}
            <Text className="text-foreground font-medium">Waveform</Text> with cancel/confirm while recording.
          </Text>
          <View className="rounded-2xl border border-border bg-card p-3 gap-2">
            {voiceNotes.map((v, i) => (
              <View key={i} className="self-end max-w-[85%] flex-row items-center gap-2 rounded-2xl rounded-br-sm bg-primary px-3.5 py-2">
                <Mic size={14} color="#fafafa" />
                <Text className="text-sm text-primary-foreground">{v}</Text>
              </View>
            ))}
            <PromptInput>
              {!recording && <PromptInputTextarea editable={false} placeholder="How can I help you today?" />}
              <PromptInputToolbar>
                {recording ? (
                  <>
                    <Waveform active size="sm" className="flex-1" />
                    <PromptInputButton onPress={() => setRecording(false)} accessibilityLabel="Cancel recording">
                      <X size={20} color="#71717a" />
                    </PromptInputButton>
                    <PromptInputButton
                      onPress={() => {
                        setRecording(false);
                        setVoiceNotes((prev) => [...prev, `Voice message (0:0${prev.length + 3})`]);
                      }}
                      accessibilityLabel="Finish recording"
                      className="bg-primary"
                    >
                      <Check size={20} color="#fafafa" />
                    </PromptInputButton>
                  </>
                ) : (
                  <>
                    <PromptInputButton onPress={() => setRecording(true)} accessibilityLabel="Record voice message">
                      <Mic size={20} color="#71717a" />
                    </PromptInputButton>
                    <PromptInputSpacer />
                  </>
                )}
              </PromptInputToolbar>
            </PromptInput>
          </View>
        </View>

        {/* Streaming — Send becomes Stop while the model "responds" */}
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Streaming</Text>
          <Text className="text-sm text-muted-foreground">
            While <Text className="text-foreground font-medium">streaming</Text> is true, the send arrow turns into a stop button.
          </Text>
          <View className="rounded-2xl border border-border bg-card p-3">
            <PromptInput
              streaming={streaming}
              onSend={() => {
                setStreaming(true);
                streamTimer.current = setTimeout(() => setStreaming(false), 3000);
              }}
              onStop={() => {
                if (streamTimer.current) clearTimeout(streamTimer.current);
                setStreaming(false);
              }}
            >
              <PromptInputTextarea />
              <PromptInputToolbar>
                <PromptInputSpacer />
                <PromptInputSend />
              </PromptInputToolbar>
            </PromptInput>
          </View>
          <Text variant="muted">{streaming ? "Streaming for 3s — tap stop to cancel early." : "Send a message to simulate a response."}</Text>
        </View>
      </View>
    );
  },
  autocomplete: () => {
    const cities = [
      { label: "New York, NY", value: "nyc" },
      { label: "Los Angeles, CA", value: "la" },
      { label: "Chicago, IL", value: "chi" },
      { label: "Houston, TX", value: "hou" },
      { label: "Phoenix, AZ", value: "phx" },
      { label: "San Francisco, CA", value: "sf" },
      { label: "Seattle, WA", value: "sea" },
    ];
    const [city, setCity] = useState("");
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A free-text input with an inline filtered suggestion list — type-ahead search for a shipping address form.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipping Address</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Label>City</Label>
            <AutoComplete options={cities} placeholder="Start typing a city..." onSelect={(o) => setCity(o.label)} />
            {city ? <Text variant="muted">Shipping to {city}</Text> : null}
          </View>
        </View>
      </View>
    );
  },
  "avatar-group": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Overlapping avatar stack with an automatic +N overflow badge — useful for showing who's present or who's on a team.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Currently Viewing</Text>
          <View className="rounded-xl border border-border bg-card p-4 flex-row items-center justify-between">
            <AvatarGroup max={3}>
              <Avatar size="sm" src="https://picsum.photos/seed/viewer-1/150/150" fallback="AL" />
              <Avatar size="sm" src="https://picsum.photos/seed/viewer-2/150/150" fallback="BK" />
              <Avatar size="sm" fallback="CJ" />
              <Avatar size="sm" fallback="DP" />
              <Avatar size="sm" fallback="EW" />
            </AvatarGroup>
            <View className="flex-row items-center gap-1.5">
              <Eye size={14} color="#71717a" strokeWidth={2} />
              <Text className="text-xs text-muted-foreground">5 people viewing this doc</Text>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team Roster</Text>
          <View className="rounded-xl border border-border bg-card p-4 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-foreground">Design Team</Text>
              <AvatarGroup spacing="sm" max={4}>
                <Avatar size="sm" fallback="A" />
                <Avatar size="sm" fallback="B" />
                <Avatar size="sm" fallback="C" />
              </AvatarGroup>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-foreground">Engineering</Text>
              <AvatarGroup spacing="sm" max={4}>
                <Avatar size="sm" fallback="D" />
                <Avatar size="sm" fallback="E" />
                <Avatar size="sm" fallback="F" />
                <Avatar size="sm" fallback="G" />
                <Avatar size="sm" fallback="H" />
              </AvatarGroup>
            </View>
          </View>
        </View>
      </View>
    ),
  calendar: () => {
    const [reservationDate, setReservationDate] = useState<Date | undefined>(new Date());
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
    const nights = checkIn && checkOut ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000) : 0;
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A month-view calendar grid with day/month/year navigation — single-select for a reservation date, range mode for a hotel stay.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Book a Table</Text>
          <View className="rounded-xl border border-border bg-card">
            <Calendar selected={reservationDate} onSelect={setReservationDate} min={new Date()} />
          </View>
          {reservationDate && <Text variant="muted">Reserved for {reservationDate.toLocaleDateString()}</Text>}
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hotel Stay</Text>
          <View className="rounded-xl border border-border bg-card">
            <Calendar rangeStart={checkIn} rangeEnd={checkOut} onRangeChange={(s, e) => { setCheckIn(s); setCheckOut(e); }} min={new Date()} />
          </View>
          {checkIn && (
            <Text variant="muted">
              {checkIn.toLocaleDateString()}{checkOut ? ` – ${checkOut.toLocaleDateString()} · ${nights} night${nights === 1 ? "" : "s"}` : ""}
            </Text>
          )}
        </View>
      </View>
    );
  },
  "chart-tooltip": () => {
      const revenueByMonth = [
        { label: "Jan", value: 42 },
        { label: "Feb", value: 46 },
        { label: "Mar", value: 51 },
        { label: "Apr", value: 55 },
        { label: "May", value: 62 },
        { label: "Jun", value: 68 },
      ];
      const [selected, setSelected] = useState(revenueByMonth.length - 1);
      const active = revenueByMonth[selected];
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A themed tooltip for chart data points — a single value, or a multi-series breakdown.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue Callout</Text>
            <Text className="text-sm text-muted-foreground">Tap a month to preview the tooltip that would appear over that point on the chart.</Text>
            <View className="rounded-xl border border-border bg-card p-4 gap-3">
              <AreaChart data={revenueByMonth} height={140} color="#3b82f6" curved showGrid />
              <View className="flex-row flex-wrap gap-2">
                {revenueByMonth.map((m, i) => (
                  <Pressable
                    key={m.label}
                    accessibilityRole="button"
                    accessible
                    onPress={() => setSelected(i)}
                    className={`min-h-12 min-w-12 items-center justify-center rounded-md border px-3 ${i === selected ? "bg-primary border-primary" : "border-border"}`}
                  >
                    <Text className={`text-sm ${i === selected ? "text-primary-foreground" : "text-foreground"}`}>{m.label}</Text>
                  </Pressable>
                ))}
              </View>
              <ChartTooltip label={active.label} value={`$${active.value}k MRR`} indicator="dot" color="#3b82f6" />
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Marketing Spend Breakdown</Text>
            <Text className="text-sm text-muted-foreground">A multi-series tooltip breaking a total down by channel.</Text>
            <View className="rounded-lg border border-border bg-card p-6 items-center">
              <ChartTooltip
                label="Q1 2026"
                items={[
                  { label: "Paid Ads", value: "$12.4k", color: "#3b82f6" },
                  { label: "Content", value: "$7.8k", color: "#8b5cf6" },
                  { label: "Events", value: "$4.1k", color: "#10b981" },
                ]}
              />
            </View>
          </View>
        </View>
      );
    },
  gradient: () => {
    const [upgraded, setUpgraded] = useState(false);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">An SVG linear-gradient background — used here as a real hero/CTA card, the way a paywall or onboarding screen would ship it.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upgrade CTA</Text>
          <Gradient colors={["#6366f1", "#8b5cf6"]} className="rounded-2xl p-6 gap-3">
            <Text className="text-white text-xl font-bold">Go Pro today</Text>
            <Text className="text-white/80 text-sm">Unlock unlimited projects, advanced analytics, and priority support.</Text>
            <Button variant="secondary" className="self-start" onPress={() => setUpgraded(true)}>
              {upgraded ? "You're on Pro" : "Upgrade now"}
            </Button>
          </Gradient>
        </View>
      </View>
    );
  },
  "image-gallery": () => (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A horizontal photo carousel with pagination dots — tap any photo to open the fullscreen viewer.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Photos</Text>
          <ImageGallery
            images={[
              { uri: "https://picsum.photos/seed/gallery-front/800/600", alt: "Front view" },
              { uri: "https://picsum.photos/seed/gallery-side/800/600", alt: "Side view" },
              { uri: "https://picsum.photos/seed/gallery-detail/800/600", alt: "Stitching detail" },
            ]}
          />
        </View>
      </View>
    ),
  "keyboard-view": () => {
    const [messages, setMessages] = useState(["Hey, are we still on for lunch?", "Yep, 12:30 works!"]);
    const [draft, setDraft] = useState("");
    const send = () => {
      if (!draft.trim()) return;
      setMessages((prev) => [...prev, draft.trim()]);
      setDraft("");
    };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">A themed KeyboardAvoidingView wrapper — put it around a whole screen (message list + composer) so the composer rises above the keyboard instead of being covered by it.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chat Screen</Text>
          <View className="rounded-lg border border-border bg-card p-4">
            <KeyboardView className="gap-2">
              <View className="h-24 rounded-lg bg-secondary p-2 gap-1.5 justify-end">
                {messages.map((m, i) => (
                  <Text key={i} className="text-xs text-foreground">{m}</Text>
                ))}
              </View>
              <View className="flex-row gap-2">
                <Input className="flex-1" placeholder="Message" value={draft} onChangeText={setDraft} />
                <Button size="sm" onPress={send}>Send</Button>
              </View>
            </KeyboardView>
          </View>
          <Text variant="muted">On a real device, focusing the input above lifts this whole block clear of the keyboard.</Text>
        </View>
      </View>
    );
  },
  "slide-to-confirm": () => {
      const [paid, setPaid] = useState(false);
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A slide-to-confirm control for destructive or high-stakes actions — pay, delete, submit. Confirms only once the thumb reaches the end, preventing accidental taps.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Summary</Text>
            <View className="rounded-xl border border-border bg-card p-4 gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-foreground">2x Flat White</Text>
                <Price amount={9.0} textClassName="text-sm text-foreground" />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-foreground">Delivery</Text>
                <Price amount={3.0} textClassName="text-sm text-foreground" />
              </View>
              <Separator />
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">Total</Text>
                <Price amount={12.0} textClassName="text-sm font-semibold text-foreground" />
              </View>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confirm Payment</Text>
            <SlideToConfirm key={paid ? "paid" : "unpaid"} label="Slide to pay $12.00" confirmedLabel="Payment sent!" onConfirm={() => setPaid(true)} />
            {paid && <Text variant="muted">Order confirmed — a receipt has been emailed to you.</Text>}
          </View>
        </View>
      );
    },
  "streaming-text": () => {
    const questions = ["What is AniUI?", "What's the default styling engine?"];
    const responses = [
      "AniUI ships 102 components you copy into your own project — no npm dependency, no black box.",
      "Uniwind is the default styling engine on New Architecture — 2-3x faster than NativeWind.",
    ];
    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0);
    const replay = () => { setIndex((i) => (i + 1) % responses.length); setKey((k) => k + 1); };
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Typewriter-style reveal for streaming AI responses, with a blinking cursor while more text is expected.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Reply</Text>
          <View className="gap-2 rounded-2xl border border-border bg-card p-3">
            <ChatBubble variant="sent">{questions[index]}</ChatBubble>
            <View className="self-start max-w-[90%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
              <StreamingText key={key} text={responses[index]} speed={40} />
            </View>
          </View>
          <Button variant="outline" onPress={replay}>Replay</Button>
        </View>
      </View>
    );
  },
  "swipe-deck": () => {
      const [remaining, setRemaining] = useState(0);
      const [empty, setEmpty] = useState(false);
      const cards = [
        { name: "Aria, 27", bio: "Product designer · 3 mi away" },
        { name: "Jules, 31", bio: "Backend engineer · 5 mi away" },
        { name: "Nova, 24", bio: "Mobile developer · 1 mi away" },
      ];
      return (
        <View className="gap-6">
          <Text className="text-sm text-muted-foreground">A Tinder-style swipeable card stack. Drag left/right past the threshold, or flick, to pass or like.</Text>
          <View className="gap-2">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Discover</Text>
            <View style={{ height: 240 }}>
              <SwipeDeck
                data={cards}
                onSwipeLeft={() => setRemaining((r) => r + 1)}
                onSwipeRight={() => setRemaining((r) => r + 1)}
                onEmpty={() => setEmpty(true)}
                renderCard={(item) => (
                  <View className="h-full rounded-2xl border border-border bg-card p-5 justify-end">
                    <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
                    <Text className="text-sm text-muted-foreground">{item.bio}</Text>
                  </View>
                )}
              />
            </View>
            <Text variant="muted">{empty ? "You're all caught up — check back later for new profiles." : `Swiped: ${remaining}/${cards.length}`}</Text>
          </View>
        </View>
      );
    },
  "theme-provider": () => (
    <View className="gap-6">
      <Text className="text-sm text-muted-foreground">Context + useTheme() hook for light/dark/system mode — bridges to Uniwind's setTheme when present, or RN's Appearance API otherwise. Tap below to actually flip the app's theme.</Text>
      <View className="gap-2">
        <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Toggle</Text>
        <ThemeProvider defaultTheme="light" className="flex-none">
          <ThemeProviderDemo />
        </ThemeProvider>
      </View>
    </View>
  ),
  waveform: () => {
    const [recording, setRecording] = useState(true);
    const [playing, setPlaying] = useState(false);
    const levels = [0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.6, 0.7, 0.2, 0.5, 0.6, 0.3, 0.8, 0.4];
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Ambient bars while recording a voice message, amplitude-driven bars with a scrubber once it's sent.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recording a Voice Message</Text>
          <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <Pressable accessibilityRole="button" onPress={() => setRecording((r) => !r)} className="h-12 w-12 items-center justify-center rounded-full bg-destructive">
              <Mic size={18} color="#fafafa" />
            </Pressable>
            <Waveform active={recording} size="md" className="flex-1" />
            <Text className="text-xs text-muted-foreground">{recording ? "0:07" : "Paused"}</Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sent Voice Message</Text>
          <View className="self-end max-w-[85%] flex-row items-center gap-3 rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5">
            <Pressable accessibilityRole="button" onPress={() => setPlaying((p) => !p)} className="h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
              {playing ? <Pause size={16} color="#fafafa" /> : <Play size={16} color="#fafafa" />}
            </Pressable>
            <Waveform levels={levels} active={false} progress={playing ? 0.55 : 0} size="sm" className="flex-1" color="#fafafa" />
            <Text className="text-xs text-primary-foreground/70">0:14</Text>
          </View>
        </View>
      </View>
    );
  },
  animate: () => {
    const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();
    const [replayKey, setReplayKey] = useState(0);
    return (
      <View className="gap-6">
        <Text className="text-sm text-muted-foreground">Shared spring presets, layout enter/exit animations, and a press-scale hook used across AniUI's own animated components.</Text>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Press Feedback</Text>
          <View className="rounded-lg border border-border bg-card p-4 items-start">
            <AnimatedPressable
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={animatedStyle}
              className="rounded-lg bg-primary px-5 py-3"
              accessibilityRole="button"
              accessibilityLabel="Press me"
            >
              <Text className="text-primary-foreground text-sm font-medium">Press me</Text>
            </AnimatedPressable>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Entering Animations (tap to replay)</Text>
          <View className="rounded-lg border border-border bg-card p-4 gap-3">
            <Button variant="outline" onPress={() => setReplayKey((k) => k + 1)}>Replay</Button>
            <Animated.View key={`fade-${replayKey}`} entering={entering.fadeInUp} className="rounded-lg bg-secondary p-3">
              <Text className="text-foreground text-sm">fadeInUp</Text>
            </Animated.View>
            <Animated.View key={`slide-${replayKey}`} entering={entering.slideInLeft} className="rounded-lg bg-secondary p-3">
              <Text className="text-foreground text-sm">slideInLeft (springy)</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  },

  "carousel-3d": () => (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">Pan a 3D cylindrical carousel — great for product galleries and featured collections.</Text>
      <Carousel3D
        data={[
          <Image key="1" source={{ uri: "https://picsum.photos/seed/aniui-3d-1/300/380" }} className="h-full w-full" resizeMode="cover" />,
          <Image key="2" source={{ uri: "https://picsum.photos/seed/aniui-3d-2/300/380" }} className="h-full w-full" resizeMode="cover" />,
          <Image key="3" source={{ uri: "https://picsum.photos/seed/aniui-3d-3/300/380" }} className="h-full w-full" resizeMode="cover" />,
          <Image key="4" source={{ uri: "https://picsum.photos/seed/aniui-3d-4/300/380" }} className="h-full w-full" resizeMode="cover" />,
        ]}
      />
    </View>
  ),

  "carousel-parallax": () => (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">Scale and fade parallax as you swipe — the photo itself shifts inside the frame.</Text>
      <CarouselParallax
        data={[
          <Image key="1" source={{ uri: "https://picsum.photos/seed/aniui-parallax-1/800/600" }} className="h-56 w-full" resizeMode="cover" />,
          <Image key="2" source={{ uri: "https://picsum.photos/seed/aniui-parallax-2/800/600" }} className="h-56 w-full" resizeMode="cover" />,
          <Image key="3" source={{ uri: "https://picsum.photos/seed/aniui-parallax-3/800/600" }} className="h-56 w-full" resizeMode="cover" />,
        ]}
      />
    </View>
  ),

  shimmer: () => (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">Shimmer placeholders while content loads.</Text>
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-32 w-full rounded-xl" />
    </View>
  ),

  loader: () => (
    <View className="gap-6">
      <View className="items-center gap-2"><Text className="text-xs text-muted-foreground uppercase">Circle</Text><Loader variant="circle" /></View>
      <View className="items-center gap-2"><Text className="text-xs text-muted-foreground uppercase">Dots</Text><Loader variant="dots" /></View>
    </View>
  ),

  "flip-card": () => (
    <FlipCard
      front={<Card className="h-40 items-center justify-center"><Text className="font-semibold">Tap to flip</Text></Card>}
      back={<Card className="h-40 items-center justify-center bg-primary"><Text className="text-primary-foreground font-semibold">Back side</Text></Card>}
    />
  ),

  marquee: () => <Marquee>AniUI — Beautiful React Native components. Copy. Paste. Ship.</Marquee>,

  "event-ticket": () => (
    <EventTicket title="AniUI Live" date="Sep 6, 2026 · 7:00 PM" venue="Mumbai, IN" seat="A-12" code="AX7K2" />
  ),

  "receipt-card": () => (
    <View className="items-center rounded-2xl bg-[#0a0a0a] py-8">
      <ReceiptCard
        merchant="Blue Bottle Coffee"
        date="Sep 6, 2026"
        lines={[
          { label: "Flat White", value: "$5.50" },
          { label: "Croissant", value: "$4.00" },
          { label: "Tax", value: "$0.86" },
        ]}
        total="$10.36"
      />
    </View>
  ),

  coupon: () => <Coupon code="ANIUI20" discount="20% OFF" description="First order discount" expires="Dec 31, 2026" />,

  polaroid: () => (
    <Polaroid source={{ uri: "https://picsum.photos/seed/aniui-polaroid/400/400" }} caption="Summer '26" />
  ),

  "profile-card": () => (
    <ProfileCard>
      <ProfileCardCover source={{ uri: "https://picsum.photos/seed/aniui-profile-cover/600/240" }} />
      <ProfileCardAvatar source="https://picsum.photos/seed/aniui-profile-avatar/150/150" fallback="A" />
      <ProfileCardBody>
        <ProfileCardHeader name="Anish" handle="@aniui" />
        <ProfileCardBio>Building beautiful React Native components, one file at a time.</ProfileCardBio>
        <ProfileCardLocation label="Mumbai, IN" />
        <ProfileCardAction label="Follow" onPress={() => {}} />
      </ProfileCardBody>
    </ProfileCard>
  ),

  "carousel-circular": () => (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">Swipe through the photo deck — the centered card lifts forward, its neighbors fall back.</Text>
      <CarouselCircular
        itemWidth={180}
        data={["1", "2", "3", "4", "5"].map((seed) => (
          <Image key={seed} source={{ uri: `https://picsum.photos/seed/aniui-circ-${seed}/180/180` }} className="w-full" style={{ height: 180 }} resizeMode="cover" />
        ))}
      />
    </View>
  ),

  "carousel-scale": () => (
    <CarouselScale
      data={["1", "2", "3", "4"].map((seed) => (
        <Image key={seed} source={{ uri: `https://picsum.photos/seed/aniui-scale-${seed}/300/380` }} className="h-44 w-full rounded-2xl" resizeMode="cover" />
      ))}
    />
  ),

  "carousel-tilt": () => (
    <CarouselTilt
      itemHeight={200}
      data={["1", "2", "3", "4"].map((seed) => (
        <Image key={seed} source={{ uri: `https://picsum.photos/seed/aniui-tilt-${seed}/260/200` }} className="h-full w-full rounded-xl" resizeMode="cover" />
      ))}
    />
  ),

  "vertical-flow-carousel": () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Scroll vertically — the centered card sharpens, the rest tilt and blur away.</Text>
      <View style={{ height: 340 }}>
        <VerticalFlowCarousel
          itemHeight={140}
          data={["1", "2", "3", "4", "5"].map((seed) => (
            <Image key={seed} source={{ uri: `https://picsum.photos/seed/aniui-vflow-${seed}/500/140` }} className="w-full rounded-2xl" style={{ height: 140 }} resizeMode="cover" />
          ))}
        />
      </View>
    </View>
  ),

  "vertical-page-carousel": () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Page vertically through full-bleed cards, one screen at a time.</Text>
      <View style={{ height: 420 }}>
        <VerticalPageCarousel
          itemHeight={340}
          data={["1", "2", "3"].map((seed) => (
            <Image key={seed} source={{ uri: `https://picsum.photos/seed/aniui-vpage-${seed}/500/700` }} className="h-full w-full" resizeMode="cover" />
          ))}
        />
      </View>
    </View>
  ),

  "curved-bottom-tabs": () => {
    const [index, setIndex] = useState(0);
    const dark = useColorScheme() === "dark";
    // The active tab's icon sits inside the floating circle, whose own
    // gradient flips per theme (light circle in dark mode, dark circle in
    // light mode) — the icon needs the opposite color to stay visible.
    const activeIconColor = dark ? "#18181b" : "#fafafa";
    const inactiveIconColor = "#71717a";
    return (
      <View className="gap-4">
        <Text className="text-sm text-muted-foreground">Curved notch tab bar — any tab can become the raised floating action.</Text>
        <CurvedBottomTabs
          tabs={[
            { key: "home", label: "Home", icon: <Home size={18} color={index === 0 ? activeIconColor : inactiveIconColor} /> },
            { key: "search", label: "Search", icon: <Search size={18} color={index === 1 ? activeIconColor : inactiveIconColor} /> },
            { key: "add", label: "Add", icon: <Plus size={18} color={index === 2 ? activeIconColor : inactiveIconColor} /> },
            { key: "profile", label: "Profile", icon: <User size={18} color={index === 3 ? activeIconColor : inactiveIconColor} /> },
          ]}
          activeIndex={index}
          onTabPress={setIndex}
        />
      </View>
    );
  },

  "morphing-tabbar": () => {
    const [key, setKey] = useState("all");
    return (
      <MorphingTabBar
        tabs={[
          { key: "all", label: "All" },
          { key: "music", label: "Music" },
          { key: "podcasts", label: "Podcasts" },
        ]}
        activeKey={key}
        onTabPress={setKey}
      />
    );
  },

  "mobile-dock": () => {
    const dark = useColorScheme() === "dark";
    const iconColor = dark ? "#fafafa" : "#18181b";
    return (
      <View className="gap-4">
        <Text className="text-sm text-muted-foreground">A touch-tracked fisheye dock — drag your finger across the icons.</Text>
        <MobileDock
          items={[
            { key: "mail", label: "Mail", icon: <Mail size={22} color={iconColor} />, onPress: () => {} },
            { key: "chart", label: "Stats", icon: <BarChart3 size={22} color={iconColor} />, onPress: () => {} },
            { key: "folder", label: "Projects", icon: <FolderKanban size={22} color={iconColor} />, onPress: () => {} },
            { key: "users", label: "Team", icon: <Users size={22} color={iconColor} />, onPress: () => {} },
            { key: "settings", label: "Settings", icon: <Settings size={22} color={iconColor} />, onPress: () => {} },
          ]}
        />
      </View>
    );
  },

  "fan-menu": () => (
    <FanMenu
      items={[
        { key: "mail", icon: <Mail size={18} color="#18181b" />, onPress: () => {} },
        { key: "camera", icon: <Mic size={18} color="#18181b" />, onPress: () => {} },
        { key: "chat", icon: <MessageSquare size={18} color="#18181b" />, onPress: () => {} },
      ]}
    />
  ),

  "photo-stack": () => (
    <PhotoStack
      sources={[
        { uri: "https://picsum.photos/seed/a/200" },
        { uri: "https://picsum.photos/seed/b/200" },
        { uri: "https://picsum.photos/seed/c/200" },
      ]}
    />
  ),

  "book-page": () => (
    <View className="items-center gap-4">
      <Text className="text-sm text-muted-foreground">A hardcover cover with a real photo, swung open on its spine.</Text>
      <BookPage openAngle={35}>
        <BookPagePages />
        <BookPageCover source={{ uri: "https://picsum.photos/seed/aniui-book/400/560" }}>
          <BookPageAuthor>AniUI Press</BookPageAuthor>
          <BookPageFooter>
            <BookPageTitle>The AniUI Way</BookPageTitle>
            <BookPageNote>First Edition · 2026</BookPageNote>
          </BookPageFooter>
        </BookPageCover>
      </BookPage>
    </View>
  ),

  "barcode-badge": () => <BarcodeBadge value="ANIUI-2026" label="Pass ID" />,

  "social-button": () => (
    <View className="gap-3">
      <SocialButton provider="google" onPress={() => {}} />
      <SocialButton provider="apple" onPress={() => {}} />
    </View>
  ),

  "verified-badge": () => (
    <VerifiedBadge>
      <VerifiedBadgeCheck />
      <VerifiedBadgeContent>
        <VerifiedBadgeName>Anish</VerifiedBadgeName>
        <VerifiedBadgeHandle>@aniui</VerifiedBadgeHandle>
      </VerifiedBadgeContent>
    </VerifiedBadge>
  ),

  "qr-code": () => (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">Tap the pill to spring open a real, scannable QR code with copy/close actions.</Text>
      <QrCode value="https://aniui.dev" size={180} />
    </View>
  ),

  "rolling-counter": () => {
    const [n, setN] = useState(1284);
    return (
      <View className="gap-4 items-center">
        <RollingCounter value={n} prefix="$" />
        <Button variant="outline" onPress={() => setN((v) => v + 137)}>+137</Button>
      </View>
    );
  },

  "morph-fab": () => (
    <View className="h-64 items-end justify-end">
      <MorphFab direction="up">
        <MorphFabTrigger />
        <MorphFabItem value="camera" onSelect={() => {}}>
          <MorphFabItemIcon><Camera size={20} color="#fafafa" /></MorphFabItemIcon>
          <MorphFabItemLabel>Camera</MorphFabItemLabel>
        </MorphFabItem>
        <MorphFabItem value="photo" onSelect={() => {}}>
          <MorphFabItemIcon><ImageIcon size={20} color="#fafafa" /></MorphFabItemIcon>
          <MorphFabItemLabel>Photo</MorphFabItemLabel>
        </MorphFabItem>
        <MorphFabItem value="audio" onSelect={() => {}}>
          <MorphFabItemIcon><Mic size={20} color="#fafafa" /></MorphFabItemIcon>
          <MorphFabItemLabel>Audio</MorphFabItemLabel>
        </MorphFabItem>
      </MorphFab>
    </View>
  ),

  "gooey-popover": () => {
    const dark = useColorScheme() === "dark";
    return (
      <View className="h-40 items-center justify-center">
        <Text className="mb-3 text-sm text-muted-foreground">Tap "Options" — the trigger blobs into the panel via a Skia goo blend.</Text>
        <GooeyPopover side="bottom" align="center" color={dark ? "#27272a" : "#f4f1ea"}>
          <GooeyPopoverTrigger>
            <Text className="text-sm font-medium text-primary-foreground">Options</Text>
          </GooeyPopoverTrigger>
          <GooeyPopoverContent>
            <Text className="text-sm" style={{ color: dark ? "#fafafa" : "#18181b" }}>Popover content goes here.</Text>
          </GooeyPopoverContent>
        </GooeyPopover>
      </View>
    );
  },

  "gooey-search-tabs": () => (
    <GooeySearchTabs onSearch={() => {}}>
      <GooeySearchTabsTrigger />
      <GooeySearchTabsTabs>
        <GooeySearchTabsTab value="home">
          <GooeySearchTabsTabIcon><Home size={18} color="#1d1d1f" /></GooeySearchTabsTabIcon>
          <GooeySearchTabsTabLabel>Home</GooeySearchTabsTabLabel>
        </GooeySearchTabsTab>
        <GooeySearchTabsTab value="profile">
          <GooeySearchTabsTabIcon><User size={18} color="#1d1d1f" /></GooeySearchTabsTabIcon>
          <GooeySearchTabsTabLabel>Profile</GooeySearchTabsTabLabel>
        </GooeySearchTabsTab>
      </GooeySearchTabsTabs>
    </GooeySearchTabs>
  ),

  tray: () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Drag the sheet down to dismiss, or between its two detents.</Text>
      <Tray detents={["50%", "90%"]}>
        <TrayTrigger className="flex-row items-center gap-2 self-start rounded-full bg-primary px-4">
          <Settings size={16} color="#fafafa" />
          <Text className="text-sm font-medium text-primary-foreground">Open Settings</Text>
        </TrayTrigger>
        <TrayContent>
          <TrayHeader>
            <TrayTitle>Settings</TrayTitle>
            <TrayClose />
          </TrayHeader>
          <TrayBody className="flex-row items-center gap-3">
            <Image source={{ uri: "https://picsum.photos/seed/aniui-tray-avatar/96/96" }} className="h-12 w-12 rounded-full" />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground">Anish</Text>
              <Text className="text-xs text-muted-foreground">anish@aniui.dev · Free plan</Text>
            </View>
          </TrayBody>
          <TrayFooter>
            <Button onPress={() => {}}>Manage account</Button>
          </TrayFooter>
        </TrayContent>
      </Tray>
    </View>
  ),

  "unfold-menu": () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Tap "Share" — the pill unfolds into the full panel, its label morphing into the panel title.</Text>
      <View className="items-center">
    <UnfoldMenu onSelect={() => {}}>
      <UnfoldMenuTrigger>
        <UnfoldMenuIcon><Share2 size={20} color="#111111" /></UnfoldMenuIcon>
        <UnfoldMenuLabel>Share</UnfoldMenuLabel>
      </UnfoldMenuTrigger>
      <UnfoldMenuContent>
        <UnfoldMenuHeader>
          <UnfoldMenuTitle>Share</UnfoldMenuTitle>
          <UnfoldMenuClose />
        </UnfoldMenuHeader>
        <UnfoldMenuGrid columns={3}>
          <UnfoldMenuItem value="favorite">
            <Star size={20} color="#6d7480" />
          </UnfoldMenuItem>
          <UnfoldMenuItem value="mail">
            <Mail size={20} color="#6d7480" />
          </UnfoldMenuItem>
          <UnfoldMenuItem value="bookmark">
            <Bookmark size={20} color="#6d7480" />
          </UnfoldMenuItem>
        </UnfoldMenuGrid>
      </UnfoldMenuContent>
    </UnfoldMenu>
      </View>
    </View>
  ),

  "action-rail": () => (
    <ActionRail onAction={() => {}}>
      <ActionRailGroup>
        <ActionRailAction value="like">
          <ActionRailIcon>{({ color, size }: { color: string; size: number }) => <Heart color={color} size={size} />}</ActionRailIcon>
          <ActionRailLabel>Like</ActionRailLabel>
        </ActionRailAction>
      </ActionRailGroup>
      <ActionRailOverflow>
        <ActionRailAction value="share">
          <ActionRailIcon>{({ color, size }: { color: string; size: number }) => <Share2 color={color} size={size} />}</ActionRailIcon>
          <ActionRailLabel>Share</ActionRailLabel>
        </ActionRailAction>
        <ActionRailAction value="save">
          <ActionRailIcon>{({ color, size }: { color: string; size: number }) => <Bookmark color={color} size={size} />}</ActionRailIcon>
          <ActionRailLabel>Save</ActionRailLabel>
        </ActionRailAction>
      </ActionRailOverflow>
      <ActionRailTrigger />
    </ActionRail>
  ),

  "split-view": () => (
    <View style={{ height: 360 }} className="gap-3">
      <Text className="text-sm text-muted-foreground">Drag the handle to resize the two panes.</Text>
      <SplitView initialTopHeight={180} className="overflow-hidden rounded-2xl border border-border">
        <SplitViewTop>
          <Image source={{ uri: "https://picsum.photos/seed/aniui-splitview-map/600/300" }} className="h-full w-full" resizeMode="cover" />
        </SplitViewTop>
        <SplitViewHandle />
        <SplitViewBottom>
          <SplitViewTitle>Nearby results</SplitViewTitle>
          {["Blue Bottle Coffee", "Golden Gate Park", "Ferry Building"].map((place) => (
            <View key={place} className="flex-row items-center gap-2 border-b border-border px-4 py-3">
              <MapPin size={16} color="#71717a" />
              <Text className="text-sm text-foreground">{place}</Text>
            </View>
          ))}
        </SplitViewBottom>
      </SplitView>
    </View>
  ),

  "expandable-view": () => (
    <ExpandableView>
      <ExpandableViewCollapsed>
        <Text className="text-sm font-medium text-foreground">Tap to expand</Text>
      </ExpandableViewCollapsed>
      <ExpandableViewExpanded>
        <Text className="p-4 text-sm text-foreground">Expanded content goes here.</Text>
        <ExpandableViewClose />
      </ExpandableViewExpanded>
    </ExpandableView>
  ),

  "matched-geometry": () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <View className="gap-3">
        <Text className="text-sm text-muted-foreground">Tap the shape — it morphs into the new size/position instead of snapping.</Text>
        <MatchedGeometryProvider>
          <Pressable onPress={() => setExpanded((v) => !v)} accessibilityRole="button" accessible={true}>
            {expanded ? (
              <MatchedGeometryView key="expanded" id="card" className="h-40 w-full rounded-2xl bg-primary" />
            ) : (
              <MatchedGeometryView key="collapsed" id="card" className="h-16 w-16 rounded-full bg-primary" />
            )}
          </Pressable>
        </MatchedGeometryProvider>
      </View>
    );
  },

  "arc-list": () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return (
      <View className="gap-3">
        <Text className="text-sm text-muted-foreground">Swipe up/down through the days — the item nearest center snaps into focus with a haptic tick.</Text>
        <ArcList itemHeight={56} height={280} onValueChange={() => {}}>
          {days.map((day) => (
            <ArcListItem key={day}>
              <ArcListLabel>{day}</ArcListLabel>
            </ArcListItem>
          ))}
        </ArcList>
      </View>
    );
  },

  "flexi-button": () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Tap the icon to spring open into a labeled pill, tap again to collapse.</Text>
      <FlexiButton label="Clear all" onExpandedChange={() => {}} />
    </View>
  ),

  "save-button": () => (
    <SaveButton
      label="Save"
      onSave={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      onSaved={() => {}}
    />
  ),

  "spin-button": () => {
    const [saving, setSaving] = useState(false);
    return <SpinButton saving={saving} onSavingChange={setSaving} />;
  },

  "stacked-chips": () => (
    <View className="gap-3">
      <Text className="text-sm text-muted-foreground">Tap "Filters" to reveal "Color" beside it, then tap "Color" to go one level deeper.</Text>
      <StackedChips>
        <StackedChipsTrigger>Filters</StackedChipsTrigger>
        <StackedChipsContent>
          <StackedChips>
            <StackedChipsTrigger>Color</StackedChipsTrigger>
            <StackedChipsContent>
              <Pressable className="min-h-8 items-center justify-center rounded-full bg-background px-3 py-1" onPress={() => {}}>
                <Text className="text-sm font-medium text-foreground">Red</Text>
              </Pressable>
              <Pressable className="min-h-8 items-center justify-center rounded-full bg-background px-3 py-1" onPress={() => {}}>
                <Text className="text-sm font-medium text-foreground">Blue</Text>
              </Pressable>
            </StackedChipsContent>
          </StackedChips>
        </StackedChipsContent>
      </StackedChips>
    </View>
  ),

  "filling-stack": () => {
    const cards = [
      { seed: "aniui-fill-1", title: "Mountains" },
      { seed: "aniui-fill-2", title: "Coastline" },
      { seed: "aniui-fill-3", title: "Forest" },
      { seed: "aniui-fill-4", title: "Desert" },
    ];
    return (
      <View className="gap-3">
        <Text className="text-sm text-muted-foreground">Fling the stack up to browse forward, down to go back.</Text>
        <FillingStack
          data={cards}
          onIndexChange={() => {}}
          renderItem={(card) => (
            <View className="flex-1">
              <Image source={{ uri: `https://picsum.photos/seed/${card.seed}/500/500` }} className="h-full w-full" resizeMode="cover" />
              <View className="absolute inset-x-0 bottom-0 bg-black/40 px-4 py-3">
                <Text className="text-base font-semibold text-white">{card.title}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  },

  hamburger: () => {
    const [open, setOpen] = useState(false);
    return <Hamburger open={open} onOpenChange={setOpen} />;
  },

  "theme-switch": () => {
    const [isDark, setIsDark] = useState(false);
    return <ThemeSwitch isDark={isDark} onToggle={() => setIsDark((d) => !d)} wipe />;
  },

  "animated-header-scrollview": () => (
    <View className="h-96 overflow-hidden rounded-xl border border-border">
      <AnimatedHeaderScrollView title="Settings" subtitle="Manage your account" topInset={0}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} className="border-b border-border px-4 py-4">
            <Text className="text-sm text-foreground">Setting row {i + 1}</Text>
          </View>
        ))}
      </AnimatedHeaderScrollView>
    </View>
  ),

  "animated-input-bar": () => {
    const [query, setQuery] = useState("");
    return (
      <AnimatedInputBar
        placeholders={["Search flights", "Search hotels", "Search cars"]}
        value={query}
        onChangeText={setQuery}
      />
    );
  },

};

function formatName(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function ComponentPage() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [ready, setReady] = useState(false);
  const title = formatName(name || "");
  const Demo = demos[name || ""];

  // Delay render to avoid expo-router pre-render context issues
  React.useEffect(() => { setReady(true); }, []);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} contentContainerStyle={{ paddingVertical: 24 }}>
          <Text variant="h2" className="mb-1">{title}</Text>
          <Text variant="muted" className="mb-6">Live preview</Text>
          {ready && Demo ? <Demo /> : (
            <View className="items-center py-12">
              <Text className="text-muted-foreground">{ready ? "Demo coming soon" : ""}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
