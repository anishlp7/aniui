import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Input } from "../ui/input";

describe("Input", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Input />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder text", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter name" />);
    expect(getByPlaceholderText("Enter name")).toBeTruthy();
  });

  it("handles text change", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText("Type"), "hello");
    expect(onChangeText).toHaveBeenCalledWith("hello");
  });

  it("spreads additional props", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Test" testID="my-input" />
    );
    expect(getByPlaceholderText("Test").props.testID).toBe("my-input");
  });

  it("renders with leading icon", () => {
    const { getByText } = render(
      <Input leadingIcon={<Text>Icon</Text>} placeholder="Search" />
    );
    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders with trailing icon", () => {
    const { getByText } = render(
      <Input trailingIcon={<Text>X</Text>} placeholder="Clear" />
    );
    expect(getByText("X")).toBeTruthy();
  });
});
