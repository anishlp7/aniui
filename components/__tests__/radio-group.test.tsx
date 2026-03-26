import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

describe("RadioGroup", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("has accessibilityRole radiogroup", () => {
    const { UNSAFE_getByProps } = render(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "radiogroup" })).toBeTruthy();
  });

  it("renders multiple items", () => {
    const { getByText } = render(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(getByText("Option A")).toBeTruthy();
    expect(getByText("Option B")).toBeTruthy();
  });

  it("fires onValueChange when item pressed", () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <RadioGroup value="a" onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    fireEvent.press(getByText("Option B"));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });
});

describe("RadioGroupItem", () => {
  it("has accessibilityRole radio", () => {
    const { getByRole } = render(
      <RadioGroup value="" onValueChange={() => {}}>
        <RadioGroupItem value="x" label="Item" />
      </RadioGroup>
    );
    expect(getByRole("radio")).toBeTruthy();
  });

  it("renders label text", () => {
    const { getByText } = render(
      <RadioGroup value="" onValueChange={() => {}}>
        <RadioGroupItem value="x" label="My Label" />
      </RadioGroup>
    );
    expect(getByText("My Label")).toBeTruthy();
  });
});
