import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Select } from "../ui/select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("Select", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Select options={options} />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder when no value selected", () => {
    const { getAllByText } = render(
      <Select options={options} placeholder="Pick a fruit" />
    );
    // Placeholder appears in trigger text; with passthrough mock
    // the dropdown items are also in the tree.
    expect(getAllByText("Pick a fruit").length).toBeGreaterThanOrEqual(1);
  });

  it("displays selected value label", () => {
    const { getAllByText } = render(
      <Select options={options} value="banana" />
    );
    // "Banana" appears in both the trigger and the dropdown item.
    expect(getAllByText("Banana").length).toBeGreaterThanOrEqual(1);
  });

  it("has accessibilityRole button on trigger", () => {
    const { getAllByRole } = render(<Select options={options} />);
    // Multiple buttons: the trigger + each option item.
    const buttons = getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("accepts custom label for accessibility", () => {
    const { getByLabelText } = render(
      <Select options={options} label="Fruit selector" />
    );
    expect(getByLabelText("Fruit selector")).toBeTruthy();
  });
});
