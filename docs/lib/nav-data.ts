/* ── Shared navigation data — single source of truth ────────── */

export type NavItem = { title: string; href: string };
export type NavSection = { title: string; items: NavItem[]; collapsible?: boolean };

export const gettingStartedItems: NavItem[] = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "JavaScript", href: "/docs/javascript" },
  { title: "CLI", href: "/docs/cli" },
  { title: "shadcn / RNR Registry", href: "/docs/shadcn-registry" },
  { title: "MCP", href: "/docs/mcp" },
  { title: "Theming", href: "/docs/theming" },
  { title: "Dark Mode", href: "/docs/dark-mode" },
  { title: "Theme Provider", href: "/docs/theme-provider" },
  { title: "RTL", href: "/docs/rtl" },
  { title: "Compatibility", href: "/docs/compatibility" },
  { title: "Expo SDK 57", href: "/docs/expo-57" },
  { title: "Expo SDK 56", href: "/docs/expo-56" },
  { title: "Android", href: "/docs/android" },
  { title: "Uniwind", href: "/docs/uniwind" },
  { title: "Changelog", href: "/docs/changelog" },
  { title: "Create", href: "/create" },
];

// Components are grouped by what they're for (a user browsing docs doesn't
// care that Dialog needs @rn-primitives/dialog while Card doesn't — that's
// an implementation detail already surfaced per-page, not a navigation axis).
// componentItems below stays a flat, alphabetically-ordered-within-category
// list for the consumers that need one (pagination, search, mobile nav).

export const foundationItems: NavItem[] = [
  { title: "Animate", href: "/docs/animate" },
  { title: "Aspect Ratio", href: "/docs/aspect-ratio" },
  { title: "Badge", href: "/docs/badge" },
  { title: "Button", href: "/docs/button" },
  { title: "Card", href: "/docs/card" },
  { title: "Direction Provider", href: "/docs/direction-provider" },
  { title: "FAB", href: "/docs/fab" },
  { title: "Gradient", href: "/docs/gradient" },
  { title: "Kbd", href: "/docs/kbd" },
  { title: "Keyboard View", href: "/docs/keyboard-view" },
  { title: "Labeled Separator", href: "/docs/labeled-separator" },
  { title: "Safe Area", href: "/docs/safe-area" },
  { title: "Separator", href: "/docs/separator" },
  { title: "Skeleton", href: "/docs/skeleton" },
  { title: "Spinner", href: "/docs/spinner" },
  { title: "Text", href: "/docs/text" },
];

export const formsItems: NavItem[] = [
  { title: "AutoComplete", href: "/docs/autocomplete" },
  { title: "Calendar", href: "/docs/calendar" },
  { title: "Checkbox", href: "/docs/checkbox" },
  { title: "Chip", href: "/docs/chip" },
  { title: "Combobox", href: "/docs/combobox" },
  { title: "Date Picker", href: "/docs/date-picker" },
  { title: "Field", href: "/docs/field" },
  { title: "File Picker", href: "/docs/file-picker" },
  { title: "Form", href: "/docs/form" },
  { title: "Input", href: "/docs/input" },
  { title: "Input Group", href: "/docs/input-group" },
  { title: "Input OTP", href: "/docs/input-otp" },
  { title: "Label", href: "/docs/label" },
  { title: "Masked Input", href: "/docs/masked-input" },
  { title: "Number Input", href: "/docs/number-input" },
  { title: "Password Input", href: "/docs/password-input" },
  { title: "Phone Input", href: "/docs/phone-input" },
  { title: "Radio Group", href: "/docs/radio-group" },
  { title: "Rating", href: "/docs/rating" },
  { title: "Search Bar", href: "/docs/search-bar" },
  { title: "Segmented Control", href: "/docs/segmented-control" },
  { title: "Select", href: "/docs/select" },
  { title: "Slider", href: "/docs/slider" },
  { title: "Stepper", href: "/docs/stepper" },
  { title: "Switch", href: "/docs/switch" },
  { title: "Textarea", href: "/docs/textarea" },
  { title: "Toggle", href: "/docs/toggle" },
  { title: "Toggle Group", href: "/docs/toggle-group" },
];

export const feedbackItems: NavItem[] = [
  { title: "Alert", href: "/docs/alert" },
  { title: "Banner", href: "/docs/banner" },
  { title: "Connection Banner", href: "/docs/connection-banner" },
  { title: "Empty State", href: "/docs/empty-state" },
  { title: "Progress", href: "/docs/progress" },
  { title: "Progress Steps", href: "/docs/progress-steps" },
  { title: "Status Indicator", href: "/docs/status-indicator" },
  { title: "Toast", href: "/docs/toast" },
];

export const overlaysItems: NavItem[] = [
  { title: "Action Sheet", href: "/docs/action-sheet" },
  { title: "Alert Dialog", href: "/docs/alert-dialog" },
  { title: "Bottom Sheet", href: "/docs/bottom-sheet" },
  { title: "Command Menu", href: "/docs/command-menu" },
  { title: "Context Menu", href: "/docs/context-menu" },
  { title: "Dialog", href: "/docs/dialog" },
  { title: "Drawer", href: "/docs/drawer" },
  { title: "Dropdown Menu", href: "/docs/dropdown-menu" },
  { title: "Hover Card", href: "/docs/hover-card" },
  { title: "Popover", href: "/docs/popover" },
  { title: "Tooltip", href: "/docs/tooltip" },
];

export const navigationItems: NavItem[] = [
  { title: "Accordion", href: "/docs/accordion" },
  { title: "Breadcrumb", href: "/docs/breadcrumb" },
  { title: "Collapsible", href: "/docs/collapsible" },
  { title: "Header", href: "/docs/header" },
  { title: "Menubar", href: "/docs/menubar" },
  { title: "Pagination", href: "/docs/pagination" },
  { title: "Sidebar", href: "/docs/sidebar" },
  { title: "Tab Bar", href: "/docs/tab-bar" },
  { title: "Tabs", href: "/docs/tabs" },
];

export const dataDisplayItems: NavItem[] = [
  { title: "Avatar", href: "/docs/avatar" },
  { title: "Avatar Group", href: "/docs/avatar-group" },
  { title: "Carousel", href: "/docs/carousel" },
  { title: "Data Table", href: "/docs/data-table" },
  { title: "Grid", href: "/docs/grid" },
  { title: "Image", href: "/docs/image" },
  { title: "Image Gallery", href: "/docs/image-gallery" },
  { title: "Infinite List", href: "/docs/infinite-list" },
  { title: "List", href: "/docs/list" },
  { title: "Price", href: "/docs/price" },
  { title: "Refresh Control", href: "/docs/refresh-control" },
  { title: "Stat Card", href: "/docs/stat-card" },
  { title: "Table", href: "/docs/table" },
  { title: "Timeline", href: "/docs/timeline" },
];

export const chatItems: NavItem[] = [
  { title: "Chat Bubble", href: "/docs/chat-bubble" },
  { title: "Prompt Input", href: "/docs/prompt-input" },
  { title: "Streaming Text", href: "/docs/streaming-text" },
  { title: "Typing Indicator", href: "/docs/typing-indicator" },
  { title: "Waveform", href: "/docs/waveform" },
];

export const gesturesItems: NavItem[] = [
  { title: "Slide to Confirm", href: "/docs/slide-to-confirm" },
  { title: "Swipe Deck", href: "/docs/swipe-deck" },
  { title: "Swipeable List Item", href: "/docs/swipeable-list-item" },
];

export const componentCategories: NavSection[] = [
  { title: "Foundation", items: foundationItems, collapsible: true },
  { title: "Forms & Inputs", items: formsItems, collapsible: true },
  { title: "Feedback & Status", items: feedbackItems, collapsible: true },
  { title: "Overlays & Menus", items: overlaysItems, collapsible: true },
  { title: "Navigation & Structure", items: navigationItems, collapsible: true },
  { title: "Data Display & Media", items: dataDisplayItems, collapsible: true },
  { title: "Chat & AI", items: chatItems, collapsible: true },
  { title: "Gestures & Actions", items: gesturesItems, collapsible: true },
];

export const componentItems: NavItem[] = componentCategories.flatMap((c) => c.items);

export const chartItems: NavItem[] = [
  { title: "Area Chart", href: "/charts/area-chart" },
  { title: "Bar Chart", href: "/charts/bar-chart" },
  { title: "Line Chart", href: "/charts/line-chart" },
  { title: "Pie Chart", href: "/charts/pie-chart" },
  { title: "Radar Chart", href: "/charts/radar-chart" },
  { title: "Radial Chart", href: "/charts/radial-chart" },
  { title: "Tooltip", href: "/charts/tooltip" },
];

export const blockItems: NavItem[] = [
  { title: "Login", href: "/blocks/login" },
  { title: "Sign Up", href: "/blocks/signup" },
  { title: "Forgot Password", href: "/blocks/forgot-password" },
  { title: "Home Screen", href: "/blocks/home" },
  { title: "Bottom Tabs", href: "/blocks/bottom-tabs" },
  { title: "Drawer Navigation", href: "/blocks/drawer-nav" },
  { title: "Profile", href: "/blocks/profile" },
  { title: "Settings", href: "/blocks/settings" },
  { title: "Onboarding", href: "/blocks/onboarding" },
  { title: "Chat", href: "/blocks/chat" },
  { title: "Product List", href: "/blocks/product-list" },
  { title: "Product Detail", href: "/blocks/product-detail" },
  { title: "Notifications", href: "/blocks/notifications" },
  { title: "Pricing", href: "/blocks/pricing" },
  { title: "Search", href: "/blocks/search" },
];

export const sidebarSections: NavSection[] = [
  { title: "Getting Started", items: gettingStartedItems },
  ...componentCategories,
  { title: "Charts", items: chartItems, collapsible: true },
  { title: "Blocks", items: blockItems, collapsible: true },
];
