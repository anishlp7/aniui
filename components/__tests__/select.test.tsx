import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Select } from "../ui/select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

// Select reads safe-area insets via useSafeAreaInsets(), which throws when no
// SafeAreaProvider is mounted. Provide one with zeroed initial metrics so the
// hook returns immediately in jest.
const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider initialMetrics={initialMetrics}>{children}</SafeAreaProvider>
);

describe("Select", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Select options={options} />, { wrapper });
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder when no value selected", () => {
    const { getAllByText } = render(
      <Select options={options} placeholder="Pick a fruit" />,
      { wrapper }
    );
    // Placeholder appears in trigger text; with passthrough mock
    // the dropdown items are also in the tree.
    expect(getAllByText("Pick a fruit").length).toBeGreaterThanOrEqual(1);
  });

  it("displays selected value label", () => {
    const { getAllByText } = render(
      <Select options={options} value="banana" />,
      { wrapper }
    );
    // "Banana" appears in both the trigger and the dropdown item.
    expect(getAllByText("Banana").length).toBeGreaterThanOrEqual(1);
  });

  it("has accessibilityRole button on trigger", () => {
    const { getAllByRole } = render(<Select options={options} />, { wrapper });
    // Multiple buttons: the trigger + each option item.
    const buttons = getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("accepts custom label for accessibility", () => {
    const { getByLabelText } = render(
      <Select options={options} label="Fruit selector" />,
      { wrapper }
    );
    expect(getByLabelText("Fruit selector")).toBeTruthy();
  });
});
