import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NumberInput } from "../ui/number-input";

describe("NumberInput", () => {
  it("renders +/- buttons with a11y labels", () => {
    const { getByLabelText } = render(<NumberInput />);
    expect(getByLabelText("Decrease")).toBeTruthy();
    expect(getByLabelText("Increase")).toBeTruthy();
  });

  it("increments by step when + is pressed", () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInput value={5} step={2} onValueChange={onValueChange} />
    );
    fireEvent.press(getByLabelText("Increase"));
    expect(onValueChange).toHaveBeenCalledWith(7);
  });

  it("decrements by step when - is pressed", () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInput value={5} step={2} onValueChange={onValueChange} />
    );
    fireEvent.press(getByLabelText("Decrease"));
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("clamps to max", () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInput value={9} max={10} step={5} onValueChange={onValueChange} />
    );
    fireEvent.press(getByLabelText("Increase"));
    expect(onValueChange).toHaveBeenCalledWith(10);
  });

  it("clamps to min", () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInput value={1} min={0} step={5} onValueChange={onValueChange} />
    );
    fireEvent.press(getByLabelText("Decrease"));
    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("disables - at min and + at max", () => {
    const { getByLabelText } = render(<NumberInput value={0} min={0} max={0} />);
    expect(getByLabelText("Decrease").props.accessibilityState?.disabled).toBe(true);
    expect(getByLabelText("Increase").props.accessibilityState?.disabled).toBe(true);
  });
});
