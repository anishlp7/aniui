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

  it("does not show content initially", () => {
    const { queryByText } = renderCollapsible();
    expect(queryByText("Hidden content")).toBeNull();
  });

  it("shows content after pressing trigger", () => {
    const { getByRole, getByText } = renderCollapsible();
    fireEvent.press(getByRole("button"));
    expect(getByText("Hidden content")).toBeTruthy();
  });

  it("hides content after pressing trigger again", () => {
    const { getByRole, queryByText } = renderCollapsible();
    fireEvent.press(getByRole("button"));
    fireEvent.press(getByRole("button"));
    expect(queryByText("Hidden content")).toBeNull();
  });

  it("calls onOpenChange callback", () => {
    const onOpenChange = jest.fn();
    const { getByRole } = render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>
          <Text>Toggle</Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>Content</Text>
        </CollapsibleContent>
      </Collapsible>
    );
    fireEvent.press(getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
