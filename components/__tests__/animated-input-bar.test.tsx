import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AnimatedInputBar } from "../ui/animated-input-bar";

describe("AnimatedInputBar", () => {
  it("renders without crashing with a single placeholder", () => {
    const { toJSON } = render(
      <AnimatedInputBar placeholders={["Search anything..."]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with a cycling placeholder list", () => {
    const { toJSON } = render(
      <AnimatedInputBar
        placeholders={["Search anything...", "Find a user", "Jump to a doc"]}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("fires onChangeText when typed into", () => {
    const onChangeText = jest.fn();
    const { UNSAFE_getByType } = render(
      <AnimatedInputBar
        placeholders={["x"]}
        onChangeText={onChangeText}
      />
    );
    const { TextInput } = require("react-native");
    fireEvent.changeText(UNSAFE_getByType(TextInput), "hello");
    expect(onChangeText).toHaveBeenCalledWith("hello");
  });
});
