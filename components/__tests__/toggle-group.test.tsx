import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

describe("ToggleGroup", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <ToggleGroup value="a" onValueChange={() => {}}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("has radiogroup accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(
      <ToggleGroup value="a" onValueChange={() => {}}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "radiogroup" })).toBeTruthy();
  });

  it("items have radio accessibilityRole", () => {
    const { getAllByRole } = render(
      <ToggleGroup value="a" onValueChange={() => {}}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(getAllByRole("radio").length).toBe(2);
  });

  it("calls onValueChange when an item is pressed", () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <ToggleGroup value="a" onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    fireEvent.press(getByText("B"));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("marks selected item as selected in accessibility", () => {
    const { getAllByRole } = render(
      <ToggleGroup value="b" onValueChange={() => {}}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    const radios = getAllByRole("radio");
    const selectedRadio = radios.find(
      (r) => r.props.accessibilityState?.selected === true
    );
    expect(selectedRadio).toBeTruthy();
  });
});
