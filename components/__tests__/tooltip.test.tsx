import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

describe("Tooltip", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Hover me</Text>
        </TooltipTrigger>
        <TooltipContent>Hint text</TooltipContent>
      </Tooltip>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Target</Text>
        </TooltipTrigger>
        <TooltipContent>Hint</TooltipContent>
      </Tooltip>
    );
    expect(getByText("Target")).toBeTruthy();
  });

  it("renders tooltip content in the tree (primitive manages visibility)", () => {
    const { getByText } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Target</Text>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility.
    expect(getByText("Tooltip text")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = render(
      <Tooltip>
        <TooltipTrigger>
          <Text>Target</Text>
        </TooltipTrigger>
        <TooltipContent>Hint</TooltipContent>
      </Tooltip>
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
