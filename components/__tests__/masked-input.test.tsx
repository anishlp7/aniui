import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MaskedInput } from "../ui/masked-input";

describe("MaskedInput", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<MaskedInput preset="phone" />);
    expect(toJSON()).toBeTruthy();
  });

  it("applies the phone preset mask to input", () => {
    const onChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <MaskedInput preset="phone" onChangeText={onChange} />
    );
    const { TextInput } = require("react-native");
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, "5551234567");
    // First arg is the masked form; second is raw digits.
    expect(onChange).toHaveBeenCalledWith("(555) 123-4567", "5551234567");
  });

  it("applies the credit-card preset mask", () => {
    const onChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <MaskedInput preset="credit-card" onChangeText={onChange} />
    );
    const { TextInput } = require("react-native");
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, "4111111111111111");
    expect(onChange).toHaveBeenCalledWith("4111 1111 1111 1111", "4111111111111111");
  });

  it("passes raw text through when no mask or preset is given", () => {
    const onChange = jest.fn();
    const { UNSAFE_getByType } = render(<MaskedInput onChangeText={onChange} />);
    const { TextInput } = require("react-native");
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, "abc");
    expect(onChange).toHaveBeenCalledWith("abc", "abc");
  });
});
