/* ── Shared navigation data — single source of truth ────────── */

export type NavItem = { title: string; href: string };
export type NavGroup = { title: string; items: NavItem[] };
export type NavSection = {
  title: string;
  items?: NavItem[];
  groups?: NavGroup[];
  collapsible?: boolean;
};

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
  { title: "Roadmap", href: "/docs/roadmap" },
  { title: "Changelog", href: "/docs/changelog" },
  { title: "Create", href: "/create" },
];

/** Every action-triggering button, wherever it used to live — the running
 * example for this whole reorganization was "there are several buttons
 * scattered across different categories; put them in one place." */
export const buttonItems: NavItem[] = [
  { title: "Button", href: "/docs/button" },
  { title: "FAB", href: "/docs/fab" },
  { title: "Social Button", href: "/docs/social-button" },
  { title: "Flexi Button", href: "/docs/flexi-button" },
  { title: "Save Button", href: "/docs/save-button" },
  { title: "Spin Button", href: "/docs/spin-button" },
];

export const foundationItems: NavItem[] = [
  { title: "Animate", href: "/docs/animate" },
  { title: "Aspect Ratio", href: "/docs/aspect-ratio" },
  { title: "Badge", href: "/docs/badge" },
  { title: "Card", href: "/docs/card" },
  { title: "Direction Provider", href: "/docs/direction-provider" },
  { title: "Gradient", href: "/docs/gradient" },
  { title: "Kbd", href: "/docs/kbd" },
  { title: "Keyboard View", href: "/docs/keyboard-view" },
  { title: "Labeled Separator", href: "/docs/labeled-separator" },
  { title: "Safe Area", href: "/docs/safe-area" },
  { title: "Separator", href: "/docs/separator" },
  { title: "Text", href: "/docs/text" },
];

export const formsGroups: NavGroup[] = [
  {
    title: "Text Inputs",
    items: [
      { title: "Input", href: "/docs/input" },
      { title: "Textarea", href: "/docs/textarea" },
      { title: "Password Input", href: "/docs/password-input" },
      { title: "Masked Input", href: "/docs/masked-input" },
      { title: "Phone Input", href: "/docs/phone-input" },
      { title: "Number Input", href: "/docs/number-input" },
      { title: "Search Bar", href: "/docs/search-bar" },
      { title: "Input OTP", href: "/docs/input-otp" },
      { title: "Input Group", href: "/docs/input-group" },
      { title: "Field", href: "/docs/field" },
      { title: "Label", href: "/docs/label" },
      { title: "Form", href: "/docs/form" },
    ],
  },
  {
    title: "Selection Controls",
    items: [
      { title: "Checkbox", href: "/docs/checkbox" },
      { title: "Radio Group", href: "/docs/radio-group" },
      { title: "Switch", href: "/docs/switch" },
      { title: "Toggle", href: "/docs/toggle" },
      { title: "Toggle Group", href: "/docs/toggle-group" },
      { title: "Segmented Control", href: "/docs/segmented-control" },
      { title: "Slider", href: "/docs/slider" },
      { title: "Rating", href: "/docs/rating" },
      { title: "Stepper", href: "/docs/stepper" },
      { title: "Chip", href: "/docs/chip" },
    ],
  },
  {
    title: "Pickers",
    items: [
      { title: "Date Picker", href: "/docs/date-picker" },
      { title: "Calendar", href: "/docs/calendar" },
      { title: "Select", href: "/docs/select" },
      { title: "Combobox", href: "/docs/combobox" },
      { title: "AutoComplete", href: "/docs/autocomplete" },
      { title: "File Picker", href: "/docs/file-picker" },
    ],
  },
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

export const overlaysGroups: NavGroup[] = [
  {
    title: "Dialogs & Sheets",
    items: [
      { title: "Dialog", href: "/docs/dialog" },
      { title: "Alert Dialog", href: "/docs/alert-dialog" },
      { title: "Bottom Sheet", href: "/docs/bottom-sheet" },
      { title: "Drawer", href: "/docs/drawer" },
      { title: "Action Sheet", href: "/docs/action-sheet" },
      { title: "Tray", href: "/docs/tray" },
    ],
  },
  {
    title: "Menus",
    items: [
      { title: "Dropdown Menu", href: "/docs/dropdown-menu" },
      { title: "Context Menu", href: "/docs/context-menu" },
      { title: "Command Menu", href: "/docs/command-menu" },
      { title: "Unfold Menu", href: "/docs/unfold-menu" },
      { title: "Fan Menu", href: "/docs/fan-menu" },
    ],
  },
  {
    title: "Popovers & Tooltips",
    items: [
      { title: "Popover", href: "/docs/popover" },
      { title: "Tooltip", href: "/docs/tooltip" },
      { title: "Hover Card", href: "/docs/hover-card" },
      { title: "Gooey Popover", href: "/docs/gooey-popover" },
    ],
  },
  {
    title: "Panels",
    items: [
      { title: "Action Rail", href: "/docs/action-rail" },
      { title: "Split View", href: "/docs/split-view" },
      { title: "Expandable View", href: "/docs/expandable-view" },
    ],
  },
];

export const navigationGroups: NavGroup[] = [
  {
    title: "Tab & Bottom Navigation",
    items: [
      { title: "Tab Bar", href: "/docs/tab-bar" },
      { title: "Tabs", href: "/docs/tabs" },
      { title: "Curved Bottom Tabs", href: "/docs/curved-bottom-tabs" },
      { title: "Animated Tabs", href: "/docs/morphing-tabbar" },
      { title: "App Dock", href: "/docs/mobile-dock" },
    ],
  },
  {
    title: "Structure",
    items: [
      { title: "Accordion", href: "/docs/accordion" },
      { title: "Breadcrumb", href: "/docs/breadcrumb" },
      { title: "Collapsible", href: "/docs/collapsible" },
      { title: "Header", href: "/docs/header" },
      { title: "Animated Header ScrollView", href: "/docs/animated-header-scrollview" },
      { title: "Menubar", href: "/docs/menubar" },
      { title: "Pagination", href: "/docs/pagination" },
      { title: "Sidebar", href: "/docs/sidebar" },
    ],
  },
];

export const dataDisplayItems: NavItem[] = [
  { title: "Avatar", href: "/docs/avatar" },
  { title: "Avatar Group", href: "/docs/avatar-group" },
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

/** Every carousel, together, regardless of how different their internal
 * mechanics are — this used to be a sub-group buried inside Motion & Effects. */
export const carouselItems: NavItem[] = [
  { title: "Carousel", href: "/docs/carousel" },
  { title: "3D Carousel", href: "/docs/carousel-3d" },
  { title: "Parallax Carousel", href: "/docs/carousel-parallax" },
  { title: "Circular Carousel", href: "/docs/carousel-circular" },
  { title: "Carousel Scale", href: "/docs/carousel-scale" },
  { title: "Carousel Tilt", href: "/docs/carousel-tilt" },
  { title: "Vertical Flow Carousel", href: "/docs/vertical-flow-carousel" },
  { title: "Vertical Page Carousel", href: "/docs/vertical-page-carousel" },
];

/** Skeleton/Spinner used to sit in Foundation, separate from Shimmer/Loader
 * in Motion & Effects — same loading-state purpose, now one place. */
export const loaderItems: NavItem[] = [
  { title: "Skeleton", href: "/docs/skeleton" },
  { title: "Spinner", href: "/docs/spinner" },
  { title: "Shimmer", href: "/docs/shimmer" },
  { title: "Loader", href: "/docs/loader" },
];

export const piecesGroups: NavGroup[] = [
  {
    title: "Cards & Tickets",
    items: [
      { title: "Event Ticket", href: "/docs/event-ticket" },
      { title: "Receipt Card", href: "/docs/receipt-card" },
      { title: "Coupon", href: "/docs/coupon" },
      { title: "Polaroid", href: "/docs/polaroid" },
      { title: "Profile Card", href: "/docs/profile-card" },
      { title: "Photo Stack", href: "/docs/photo-stack" },
      { title: "Book Page", href: "/docs/book-page" },
    ],
  },
  {
    title: "Identity & Social",
    items: [
      { title: "Barcode Badge", href: "/docs/barcode-badge" },
      { title: "Verified Badge", href: "/docs/verified-badge" },
      { title: "QR Code", href: "/docs/qr-code" },
      { title: "Number Counter", href: "/docs/rolling-counter" },
    ],
  },
];

export const motionItems: NavItem[] = [
  { title: "Flip Card", href: "/docs/flip-card" },
  { title: "Marquee", href: "/docs/marquee" },
  { title: "Hamburger", href: "/docs/hamburger" },
  { title: "Theme Switch", href: "/docs/theme-switch" },
  { title: "Matched Geometry", href: "/docs/matched-geometry" },
  { title: "Stacked Chips", href: "/docs/stacked-chips" },
  { title: "Filling Stack", href: "/docs/filling-stack" },
  { title: "Animated Input Bar", href: "/docs/animated-input-bar" },
  { title: "Arc List", href: "/docs/arc-list" },
  { title: "Morph Fab", href: "/docs/morph-fab" },
  { title: "Gooey Search Tabs", href: "/docs/gooey-search-tabs" },
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

/** Flatten items from a section that may use groups or a flat list. */
export function flattenSectionItems(section: NavSection): NavItem[] {
  if (section.groups) return section.groups.flatMap((g) => g.items);
  return section.items ?? [];
}

export const componentCategories: NavSection[] = [
  { title: "Buttons", items: buttonItems, collapsible: true },
  { title: "Foundation", items: foundationItems, collapsible: true },
  { title: "Forms & Inputs", groups: formsGroups, collapsible: true },
  { title: "Feedback & Status", items: feedbackItems, collapsible: true },
  { title: "Overlays & Menus", groups: overlaysGroups, collapsible: true },
  { title: "Navigation", groups: navigationGroups, collapsible: true },
  { title: "Data Display & Media", items: dataDisplayItems, collapsible: true },
  { title: "Carousels", items: carouselItems, collapsible: true },
  { title: "Loaders", items: loaderItems, collapsible: true },
  { title: "UI Pieces", groups: piecesGroups, collapsible: true },
  { title: "Motion & Effects", items: motionItems, collapsible: true },
  { title: "Chat & AI", items: chatItems, collapsible: true },
  { title: "Gestures & Actions", items: gesturesItems, collapsible: true },
];

export const componentItems: NavItem[] = componentCategories.flatMap(flattenSectionItems);

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

/** Find the top-level sidebar section containing a pathname. */
export function findSectionForPath(pathname: string | null): string | undefined {
  if (!pathname) return undefined;
  return sidebarSections.find((s) => flattenSectionItems(s).some((i) => i.href === pathname))?.title;
}
