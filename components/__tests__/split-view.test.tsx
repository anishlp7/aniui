import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  SplitView,
  SplitViewTop,
  SplitViewBottom,
  SplitViewHandle,
  SplitViewTitle,
} from "../ui/split-view";

describe("SplitView", () => {
  it("renders a top + bottom pair of panes", () => {
    const { getByText } = render(
      <SplitView>
        <SplitViewTop>
          <Text>top pane</Text>
        </SplitViewTop>
        <SplitViewBottom>
          <Text>bottom pane</Text>
        </SplitViewBottom>
      </SplitView>
    );
    expect(getByText("top pane")).toBeTruthy();
    expect(getByText("bottom pane")).toBeTruthy();
  });

  it("SplitViewHandle renders inside its root", () => {
    const { toJSON } = render(
      <SplitView>
        <SplitViewHandle />
      </SplitView>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("SplitViewTitle renders a title inside its root", () => {
    const { getByText } = render(
      <SplitView>
        <SplitViewTitle>Title</SplitViewTitle>
      </SplitView>
    );
    expect(getByText("Title")).toBeTruthy();
  });

  it("subparts throw when rendered outside their root", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <SplitViewTop>
          <Text>x</Text>
        </SplitViewTop>
      )
    ).toThrow(/must be rendered inside <SplitView>/);
    spy.mockRestore();
  });
});
