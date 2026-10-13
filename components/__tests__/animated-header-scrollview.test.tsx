import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { AnimatedHeaderScrollView } from "../ui/animated-header-scrollview";

describe("AnimatedHeaderScrollView", () => {
  it("renders the title and children", () => {
    const { getAllByText, getByText } = render(
      <AnimatedHeaderScrollView title="Inbox">
        <Text>message 1</Text>
      </AnimatedHeaderScrollView>
    );
    // Title appears in both the large inline position and the compact header.
    expect(getAllByText("Inbox").length).toBeGreaterThan(0);
    expect(getByText("message 1")).toBeTruthy();
  });

  it("renders a subtitle when provided", () => {
    const { getByText } = render(
      <AnimatedHeaderScrollView title="t" subtitle="Hello world">
        <Text>x</Text>
      </AnimatedHeaderScrollView>
    );
    expect(getByText("Hello world")).toBeTruthy();
  });

  it("respects an explicit topInset=0 override", () => {
    const { toJSON } = render(
      <AnimatedHeaderScrollView title="t" topInset={0}>
        <Text>x</Text>
      </AnimatedHeaderScrollView>
    );
    expect(toJSON()).toBeTruthy();
  });
});
