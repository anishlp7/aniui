import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import {
  ActionRail,
  ActionRailGroup,
  ActionRailOverflow,
  ActionRailAction,
  ActionRailIcon,
  ActionRailLabel,
  ActionRailTrigger,
} from "../ui/action-rail";

describe("ActionRail", () => {
  it("renders a group of actions", () => {
    const { getByText } = render(
      <ActionRail>
        <ActionRailGroup>
          <ActionRailAction value="pin">
            <ActionRailIcon>
              <Text>P</Text>
            </ActionRailIcon>
          </ActionRailAction>
        </ActionRailGroup>
      </ActionRail>
    );
    expect(getByText("P")).toBeTruthy();
  });

  it("fires onAction with the action's value", () => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <ActionRail onAction={onAction}>
        <ActionRailGroup>
          <ActionRailAction value="share">
            <ActionRailIcon>
              <Text>S</Text>
            </ActionRailIcon>
          </ActionRailAction>
        </ActionRailGroup>
      </ActionRail>
    );
    fireEvent.press(getByRole("button"));
    expect(onAction).toHaveBeenCalledWith("share");
  });

  it("accepts a controlled expanded prop without crashing", () => {
    const { toJSON } = render(
      <ActionRail expanded>
        <ActionRailGroup>
          <ActionRailAction value="a">
            <ActionRailIcon>
              <Text>a</Text>
            </ActionRailIcon>
          </ActionRailAction>
        </ActionRailGroup>
        <ActionRailTrigger>
          <Text>...</Text>
        </ActionRailTrigger>
        <ActionRailOverflow>
          <ActionRailAction value="b">
            <ActionRailLabel>Edit</ActionRailLabel>
          </ActionRailAction>
        </ActionRailOverflow>
      </ActionRail>
    );
    expect(toJSON()).toBeTruthy();
  });
});
