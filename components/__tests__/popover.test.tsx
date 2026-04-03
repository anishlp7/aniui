import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

describe("Popover", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders content in the tree (primitive manages visibility)", () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility via open/closed state.
    expect(getByText("Popover body")).toBeTruthy();
  });

  it("trigger is pressable", () => {
    const { getByRole, getByText } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>
    );
    fireEvent.press(getByRole("button"));
    expect(getByText("Popover body")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Body</Text>
        </PopoverContent>
      </Popover>
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
