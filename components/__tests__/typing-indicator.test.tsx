import React from "react";
import { render } from "@testing-library/react-native";
import { TypingIndicator } from "../ui/typing-indicator";

describe("TypingIndicator", () => {
  it("renders with 'Typing' a11y label", () => {
    const { getByLabelText } = render(<TypingIndicator />);
    expect(getByLabelText("Typing")).toBeTruthy();
  });

  it("accepts a custom className via rest spread", () => {
    const { toJSON } = render(<TypingIndicator className="opacity-50" />);
    expect(toJSON()).toBeTruthy();
  });
});
