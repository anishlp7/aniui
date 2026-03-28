import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SegmentedControl } from "../ui/segmented-control";

describe("SegmentedControl", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <SegmentedControl options={["A", "B"]} value="A" onValueChange={() => {}} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders all options", () => {
    const { getByText } = render(
      <SegmentedControl options={["One", "Two", "Three"]} value="One" onValueChange={() => {}} />
    );
    expect(getByText("One")).toBeTruthy();
    expect(getByText("Two")).toBeTruthy();
    expect(getByText("Three")).toBeTruthy();
  });

  it("has tablist accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(
      <SegmentedControl options={["A", "B"]} value="A" onValueChange={() => {}} />
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "tablist" })).toBeTruthy();
  });

  it("calls onValueChange when an option is pressed", () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <SegmentedControl options={["A", "B"]} value="A" onValueChange={onValueChange} />
    );
    fireEvent.press(getByText("B"));
    expect(onValueChange).toHaveBeenCalledWith("B");
  });

  it("each option has tab accessibilityRole", () => {
    const { getAllByRole } = render(
      <SegmentedControl options={["A", "B", "C"]} value="A" onValueChange={() => {}} />
    );
    expect(getAllByRole("tab").length).toBe(3);
  });
});
