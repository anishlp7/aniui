import React from "react";
import { render } from "@testing-library/react-native";
import * as Reanimated from "react-native-reanimated";
import { Skeleton } from "../ui/skeleton";

describe("Skeleton", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Skeleton />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing when reduced motion is enabled", () => {
    jest.spyOn(Reanimated, "useReducedMotion").mockReturnValue(true);
    const { toJSON } = render(<Skeleton testID="skel-reduced" />);
    expect(toJSON()).toBeTruthy();
    jest.restoreAllMocks();
  });

  it("accepts a custom testID", () => {
    const { getByTestId } = render(<Skeleton testID="skel" />);
    expect(getByTestId("skel")).toBeTruthy();
  });

  it("passes extra props through", () => {
    const { getByTestId } = render(
      <Skeleton testID="skel-props" accessibilityLabel="Loading" />
    );
    expect(getByTestId("skel-props").props.accessibilityLabel).toBe("Loading");
  });
});
