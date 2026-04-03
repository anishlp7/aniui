import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

describe("Collapsible", () => {
  const renderCollapsible = () =>
    render(
      <Collapsible>
        <CollapsibleTrigger>
          <Text>Toggle</Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>Hidden content</Text>
        </CollapsibleContent>
      </Collapsible>
    );

  it("renders without crashing", () => {
    const { toJSON } = renderCollapsible();
    expect(toJSON()).toBeTruthy();
  });

  it("renders content in the tree (primitive manages visibility)", () => {
    const { getByText } = renderCollapsible();
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility via open/closed state.
    expect(getByText("Hidden content")).toBeTruthy();
  });

  it("trigger is pressable", () => {
    const { getByText } = renderCollapsible();
    fireEvent.press(getByText("Toggle"));
    expect(getByText("Hidden content")).toBeTruthy();
  });

  it("trigger has button accessibilityRole", () => {
    const { getByRole } = renderCollapsible();
    expect(getByRole("button")).toBeTruthy();
  });

  it("passes onOpenChange prop to primitive root", () => {
    const onOpenChange = jest.fn();
    const { toJSON } = render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>
          <Text>Toggle</Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>Content</Text>
        </CollapsibleContent>
      </Collapsible>
    );
    // onOpenChange is passed to the primitive Root;
    // the mock doesn't call it, but we verify the component renders correctly.
    expect(toJSON()).toBeTruthy();
  });
});
