import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Tooltip } from "../ui/tooltip";

describe("Tooltip", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Tooltip content="Hint text">
        <Text>Hover me</Text>
      </Tooltip>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <Tooltip content="Hint">
        <Text>Target</Text>
      </Tooltip>
    );
    expect(getByText("Target")).toBeTruthy();
  });

  it("does not show tooltip content initially", () => {
    const { queryByText } = render(
      <Tooltip content="Tooltip text">
        <Text>Target</Text>
      </Tooltip>
    );
    expect(queryByText("Tooltip text")).toBeNull();
  });

  it("shows tooltip content on pressIn", () => {
    const { getByRole, getByText } = render(
      <Tooltip content="Tooltip text">
        <Text>Target</Text>
      </Tooltip>
    );
    fireEvent(getByRole("button"), "pressIn");
    expect(getByText("Tooltip text")).toBeTruthy();
  });

  it("has button accessibilityRole", () => {
    const { getByRole } = render(
      <Tooltip content="Hint">
        <Text>Target</Text>
      </Tooltip>
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
