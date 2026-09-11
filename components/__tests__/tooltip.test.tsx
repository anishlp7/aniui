import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

// TooltipContent reads safe-area insets via useSafeAreaInsets(), which throws
// when no SafeAreaProvider is mounted. Provide one with zeroed initial
// metrics so the hook returns immediately in jest.
const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider initialMetrics={initialMetrics}>{children}</SafeAreaProvider>
);

describe("Tooltip", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Hover me</Text>
        </TooltipTrigger>
        <TooltipContent>Hint text</TooltipContent>
      </Tooltip>,
      { wrapper }
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Target</Text>
        </TooltipTrigger>
        <TooltipContent>Hint</TooltipContent>
      </Tooltip>,
      { wrapper }
    );
    expect(getByText("Target")).toBeTruthy();
  });

  it("renders tooltip content in the tree (primitive manages visibility)", () => {
    const { getByText } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Target</Text>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
      { wrapper }
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility.
    expect(getByText("Tooltip text")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Target</Text>
        </TooltipTrigger>
        <TooltipContent>Hint</TooltipContent>
      </Tooltip>,
      { wrapper }
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
