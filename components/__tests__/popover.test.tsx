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

  it("does not show content initially", () => {
    const { queryByText } = render(
      <Popover>
        <PopoverTrigger>
          <Text>Open</Text>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Popover body</Text>
        </PopoverContent>
      </Popover>
    );
    expect(queryByText("Popover body")).toBeNull();
  });

  it("shows content after pressing trigger", () => {
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
