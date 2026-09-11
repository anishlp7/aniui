import React from "react";
import { Text, View } from "react-native";
import { render } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";

// HoverCardContent reads safe-area insets via useSafeAreaInsets(), which
// throws when no SafeAreaProvider is mounted. Provide one with zeroed
// initial metrics so the hook returns immediately in jest.
const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider initialMetrics={initialMetrics}>{children}</SafeAreaProvider>
);

describe("HoverCard", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Hover me</Text>
        </HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
      { wrapper }
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders trigger children", () => {
    const { getByText } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Target</Text>
        </HoverCardTrigger>
        <HoverCardContent>Details</HoverCardContent>
      </HoverCard>,
      { wrapper }
    );
    expect(getByText("Target")).toBeTruthy();
  });

  it("renders content in tree (primitive manages visibility)", () => {
    const { getByText } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Target</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text>Hover card text</Text>
        </HoverCardContent>
      </HoverCard>,
      { wrapper }
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility.
    expect(getByText("Hover card text")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Target</Text>
        </HoverCardTrigger>
        <HoverCardContent>Details</HoverCardContent>
      </HoverCard>,
      { wrapper }
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
