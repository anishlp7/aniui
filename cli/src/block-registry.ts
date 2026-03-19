export type BlockEntry = {
  name: string;
  file: string;
  description: string;
  components: string[];
};

export const blockRegistry: Record<string, BlockEntry> = {
  login: {
    name: "LoginScreen",
    file: "blocks/login.tsx",
    description: "Email/password login with social sign-in",
    components: ["text", "input", "button", "separator", "label"],
  },
  signup: {
    name: "SignUpScreen",
    file: "blocks/signup.tsx",
    description: "Registration with name, email, password, and terms checkbox",
    components: ["text", "input", "button", "separator", "label", "checkbox"],
  },
  "forgot-password": {
    name: "ForgotPasswordScreen",
    file: "blocks/forgot-password.tsx",
    description: "Password reset flow with email input and confirmation",
    components: ["text", "input", "button", "label"],
  },
  home: {
    name: "HomeScreen",
    file: "blocks/home.tsx",
    description: "Dashboard home with greeting, quick actions, stats, and activity",
    components: ["text", "card", "avatar", "badge", "button"],
  },
  "bottom-tabs": {
    name: "BottomTabsScreen",
    file: "blocks/bottom-tabs.tsx",
    description: "Bottom tab navigation bar with active state indicators",
    components: ["text"],
  },
  "drawer-nav": {
    name: "DrawerNavContent",
    file: "blocks/drawer-nav.tsx",
    description: "Side drawer with user profile and icon-labeled navigation",
    components: ["text", "avatar", "separator"],
  },
  profile: {
    name: "ProfileScreen",
    file: "blocks/profile.tsx",
    description: "User profile with avatar, stats, menu items, and log out",
    components: ["text", "avatar", "button", "separator", "badge"],
  },
  settings: {
    name: "SettingsScreen",
    file: "blocks/settings.tsx",
    description: "Settings screen with toggles, navigation rows, and danger zone",
    components: ["text", "switch", "avatar", "separator"],
  },
  onboarding: {
    name: "OnboardingScreen",
    file: "blocks/onboarding.tsx",
    description: "Welcome carousel with step indicators and skip option",
    components: ["text", "button"],
  },
  chat: {
    name: "ChatScreen",
    file: "blocks/chat.tsx",
    description: "Messaging screen with chat bubbles and input bar",
    components: ["text", "avatar", "input"],
  },
  "product-list": {
    name: "ProductListScreen",
    file: "blocks/product-list.tsx",
    description: "E-commerce product grid with category filters and wishlist",
    components: ["text", "card", "badge"],
  },
  "product-detail": {
    name: "ProductDetailScreen",
    file: "blocks/product-detail.tsx",
    description: "Product detail with size selector, quantity picker, and CTA",
    components: ["text", "button", "badge", "separator"],
  },
  notifications: {
    name: "NotificationsScreen",
    file: "blocks/notifications.tsx",
    description: "Grouped notifications list with unread indicators",
    components: ["text", "separator", "badge"],
  },
  pricing: {
    name: "PricingScreen",
    file: "blocks/pricing.tsx",
    description: "Subscription plan selector with monthly/yearly toggle",
    components: ["text", "card", "button", "badge", "separator"],
  },
  search: {
    name: "SearchScreen",
    file: "blocks/search.tsx",
    description: "Search screen with recent searches, trending, and live results",
    components: ["text", "input", "separator"],
  },
};

export function getBlockNames(): string[] {
  return Object.keys(blockRegistry).sort();
}
