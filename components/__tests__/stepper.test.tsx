import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Stepper } from "../ui/stepper";

describe("Stepper", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Stepper value={5} onChange={() => {}} />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays the current value", () => {
    const { getByText } = render(<Stepper value={7} onChange={() => {}} />);
    expect(getByText("7")).toBeTruthy();
  });

  it("has adjustable accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(<Stepper value={3} onChange={() => {}} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "adjustable" })).toBeTruthy();
  });

  it("calls onChange with decremented value", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<Stepper value={5} onChange={onChange} />);
    fireEvent.press(getByLabelText("Decrease"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange with incremented value", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<Stepper value={5} onChange={onChange} />);
    fireEvent.press(getByLabelText("Increase"));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("disables decrease at min value", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Stepper value={0} min={0} onChange={onChange} />
    );
    fireEvent.press(getByLabelText("Decrease"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
