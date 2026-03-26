import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { InputOTP } from "../ui/input-otp";

describe("InputOTP", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<InputOTP />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders the correct number of inputs (default 6)", () => {
    const { getAllByLabelText } = render(<InputOTP />);
    // Each input has accessibilityLabel like "Digit 1 of 6"
    const inputs = getAllByLabelText(/Digit \d+ of 6/);
    expect(inputs.length).toBe(6);
  });

  it("renders custom length inputs", () => {
    const { getAllByLabelText } = render(<InputOTP length={4} />);
    const inputs = getAllByLabelText(/Digit \d+ of 4/);
    expect(inputs.length).toBe(4);
  });

  it("calls onValueChange when text is entered", () => {
    const onValueChange = jest.fn();
    const { getAllByLabelText } = render(
      <InputOTP length={4} value="" onValueChange={onValueChange} />
    );
    const inputs = getAllByLabelText(/Digit \d+ of 4/);
    fireEvent.changeText(inputs[0], "1");
    expect(onValueChange).toHaveBeenCalledWith("1");
  });

  it("displays pre-filled value digits", () => {
    const { getAllByLabelText } = render(<InputOTP length={4} value="12" />);
    const inputs = getAllByLabelText(/Digit \d+ of 4/);
    expect(inputs[0].props.value).toBe("1");
    expect(inputs[1].props.value).toBe("2");
    expect(inputs[2].props.value).toBe("");
  });
});
