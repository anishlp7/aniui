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
    const { getByText } = render(
      <Select options={options} placeholder="Pick a fruit" />
    );
    expect(getByText("Pick a fruit")).toBeTruthy();
  });

  it("displays selected value label", () => {
    const { getByText } = render(
      <Select options={options} value="banana" />
    );
    expect(getByText("Banana")).toBeTruthy();
  });

  it("has accessibilityRole button on trigger", () => {
    const { getByRole } = render(<Select options={options} />);
    expect(getByRole("button")).toBeTruthy();
  });

  it("accepts custom label for accessibility", () => {
    const { getByLabelText } = render(
      <Select options={options} label="Fruit selector" />
    );
    expect(getByLabelText("Fruit selector")).toBeTruthy();
  });
});
