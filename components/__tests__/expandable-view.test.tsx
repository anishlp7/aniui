import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  ExpandableView,
  ExpandableViewCollapsed,
  ExpandableViewExpanded,
  ExpandableViewClose,
} from "../ui/expandable-view";

describe("ExpandableView", () => {
  it("renders the collapsed slot while not expanded", () => {
    const { getByText } = render(
      <ExpandableView>
        <ExpandableViewCollapsed>
          <Text>pill</Text>
        </ExpandableViewCollapsed>
        <ExpandableViewExpanded>
          <Text>panel</Text>
        </ExpandableViewExpanded>
      </ExpandableView>
    );
    expect(getByText("pill")).toBeTruthy();
  });

  it("renders without crashing with just a collapsed slot", () => {
    const { toJSON } = render(
      <ExpandableView>
        <ExpandableViewCollapsed>
          <Text>pill</Text>
        </ExpandableViewCollapsed>
      </ExpandableView>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("ExpandableViewClose throws when rendered outside its root", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <ExpandableViewClose>
          <Text>x</Text>
        </ExpandableViewClose>
      )
    ).toThrow(/must be rendered inside/);
    spy.mockRestore();
  });
});
