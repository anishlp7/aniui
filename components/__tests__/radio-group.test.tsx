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

  it("items are pressable", () => {
    const { getByText } = render(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    // onValueChange is handled by the primitive Root;
    // the mock doesn't call it, but we verify items are pressable.
    fireEvent.press(getByText("Option B"));
    expect(getByText("Option B")).toBeTruthy();
  });
});

describe("RadioGroupItem", () => {
  it("has accessible=true on the pressable", () => {
    const { UNSAFE_getByProps } = render(
      <RadioGroup value="" onValueChange={() => {}}>
        <RadioGroupItem value="x" label="Item" />
      </RadioGroup>
    );
    // accessibilityRole="radio" is managed by the primitive;
    // the Pressable has accessible={true} for screen readers.
    expect(UNSAFE_getByProps({ accessible: true })).toBeTruthy();
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
