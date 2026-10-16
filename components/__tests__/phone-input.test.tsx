import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PhoneInput } from "../ui/phone-input";

describe("PhoneInput", () => {
  it("renders with default country dial code (+1 US)", () => {
    const { getByText, getByLabelText } = render(<PhoneInput />);
    expect(getByText("+1")).toBeTruthy();
    expect(getByLabelText("Country: United States")).toBeTruthy();
  });

  it("respects defaultCountry prop", () => {
    const { getByText, getByLabelText } = render(<PhoneInput defaultCountry="IN" />);
    expect(getByText("+91")).toBeTruthy();
    expect(getByLabelText("Country: India")).toBeTruthy();
  });

  it("fires onChangeText with full phone (dial + digits)", () => {
    const onChangeText = jest.fn();
    const { UNSAFE_getAllByType } = render(<PhoneInput onChangeText={onChangeText} />);
    const { TextInput } = require("react-native");
    const inputs = UNSAFE_getAllByType(TextInput);
    // PhoneInput renders exactly one TextInput for the number itself.
    fireEvent.changeText(inputs[0], "5551234567");
    expect(onChangeText).toHaveBeenCalledWith("+15551234567");
  });

  it("strips non-digits from input", () => {
    const onChangeText = jest.fn();
    const { UNSAFE_getAllByType } = render(<PhoneInput onChangeText={onChangeText} />);
    const { TextInput } = require("react-native");
    const inputs = UNSAFE_getAllByType(TextInput);
    fireEvent.changeText(inputs[0], "555-abc-1234");
    expect(onChangeText).toHaveBeenCalledWith("+15551234");
  });
});
