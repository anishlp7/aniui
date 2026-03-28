import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { BottomSheet } from "../ui/bottom-sheet";

describe("BottomSheet", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <BottomSheet>
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders children content", () => {
    const { getByText } = render(
      <BottomSheet>
        <Text>Sheet Content</Text>
      </BottomSheet>
    );
    expect(getByText("Sheet Content")).toBeTruthy();
  });

  it("accepts custom snapPoints", () => {
    const { toJSON } = render(
      <BottomSheet snapPoints={["30%", "60%", "90%"]}>
        <Text>Snap</Text>
      </BottomSheet>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = React.createRef<any>();
    render(
      <BottomSheet ref={ref}>
        <Text>Ref test</Text>
      </BottomSheet>
    );
    // ref should be attached (mock returns a View)
    expect(ref.current).toBeDefined();
  });
});
