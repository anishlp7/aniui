import React from "react";
import { Text, View } from "react-native";
import { render } from "@testing-library/react-native";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";

describe("HoverCard", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Hover me</Text>
        </HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders trigger children", () => {
    const { getByText } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Target</Text>
        </HoverCardTrigger>
        <HoverCardContent>Details</HoverCardContent>
      </HoverCard>
    );
    expect(getByText("Target")).toBeTruthy();
  });

  it("renders content in tree (primitive manages visibility)", () => {
    const { getByText } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Target</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text>Hover card text</Text>
        </HoverCardContent>
      </HoverCard>
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility.
    expect(getByText("Hover card text")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = render(
      <HoverCard>
        <HoverCardTrigger>
          <Text>Target</Text>
        </HoverCardTrigger>
        <HoverCardContent>Details</HoverCardContent>
      </HoverCard>
    );
    expect(getByRole("button")).toBeTruthy();
  });
});
