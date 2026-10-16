import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import {
  StackedChips,
  StackedChipsTrigger,
  StackedChipsContent,
} from "../ui/stacked-chips";

describe("StackedChips", () => {
  it("renders the trigger label", () => {
    const { getByText } = render(
      <StackedChips>
        <StackedChipsTrigger>Options</StackedChipsTrigger>
      </StackedChips>
    );
    expect(getByText("Options")).toBeTruthy();
  });

  it("toggles expanded state via accessibilityState.expanded", () => {
    const { getByRole } = render(
      <StackedChips>
        <StackedChipsTrigger>Options</StackedChipsTrigger>
      </StackedChips>
    );
    const trigger = getByRole("button");
    expect(trigger.props.accessibilityState.expanded).toBe(false);
    fireEvent.press(trigger);
    expect(trigger.props.accessibilityState.expanded).toBe(true);
  });

  it("fires the trigger's onPress on tap", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <StackedChips>
        <StackedChipsTrigger onPress={onPress}>x</StackedChipsTrigger>
      </StackedChips>
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalled();
  });

  it("subparts throw when rendered outside a StackedChips root", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<StackedChipsTrigger>x</StackedChipsTrigger>)
    ).toThrow(/must be used within StackedChips/);
    spy.mockRestore();
  });

  it("renders Content children", () => {
    const { getByText } = render(
      <StackedChips>
        <StackedChipsTrigger>t</StackedChipsTrigger>
        <StackedChipsContent>
          <Text>inside</Text>
        </StackedChipsContent>
      </StackedChips>
    );
    expect(getByText("inside")).toBeTruthy();
  });
});
