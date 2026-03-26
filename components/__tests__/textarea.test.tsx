import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Textarea } from "../ui/textarea";

describe("Textarea", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Textarea />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder text", () => {
    const { getByPlaceholderText } = render(<Textarea placeholder="Write here" />);
    expect(getByPlaceholderText("Write here")).toBeTruthy();
  });

  it("is multiline by default", () => {
    const { getByPlaceholderText } = render(<Textarea placeholder="Multi" />);
    expect(getByPlaceholderText("Multi").props.multiline).toBe(true);
  });

  it("handles text change", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Textarea placeholder="Type" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText("Type"), "paragraph");
    expect(onChangeText).toHaveBeenCalledWith("paragraph");
  });

  it("spreads additional props", () => {
    const { getByPlaceholderText } = render(
      <Textarea placeholder="Test" testID="my-textarea" />
    );
    expect(getByPlaceholderText("Test").props.testID).toBe("my-textarea");
  });
});
