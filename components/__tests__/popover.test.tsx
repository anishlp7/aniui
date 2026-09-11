import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

// PopoverContent reads safe-area insets via useSafeAreaInsets(), which throws
// when no SafeAreaProvider is mounted. Provide one with zeroed initial
// metrics so the hook returns immediately in jest.
const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider initialMetrics={initialMetrics}>{children}</SafeAreaProvider>
);

describe("Popover", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>,
      { wrapper }
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders content in the tree (primitive manages visibility)", () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>,
      { wrapper }
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility via open/closed state.
    expect(getByText("Popover body")).toBeTruthy();
  });

  it("trigger is pressable", () => {
    const { getByRole, getByText } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>,
      { wrapper }
    );
    fireEvent.press(getByRole("button"));
    expect(getByText("Popover body")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Body</Text>
        </PopoverContent>
      </Popover>,
      { wrapper }
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
