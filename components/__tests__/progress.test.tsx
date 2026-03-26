import React from "react";
import { render } from "@testing-library/react-native";
import { Progress } from "../ui/progress";

describe("Progress", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Progress />);
    expect(toJSON()).toBeTruthy();
  });

  it("has accessibilityRole progressbar", () => {
    const { UNSAFE_getByProps } = render(<Progress value={50} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "progressbar" })).toBeTruthy();
  });

  it("sets accessibility value", () => {
    const { UNSAFE_getByProps } = render(<Progress value={75} />);
    const el = UNSAFE_getByProps({ accessibilityRole: "progressbar" });
    expect(el.props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 75,
    });
  });

  it("clamps value to 0-100", () => {
    const { UNSAFE_getByProps } = render(<Progress value={150} />);
    const el = UNSAFE_getByProps({ accessibilityRole: "progressbar" });
    expect(el.props.accessibilityValue.now).toBe(100);
  });

  it("clamps negative value to 0", () => {
    const { UNSAFE_getByProps } = render(<Progress value={-10} />);
    const el = UNSAFE_getByProps({ accessibilityRole: "progressbar" });
    expect(el.props.accessibilityValue.now).toBe(0);
  });

  it("spreads additional props", () => {
    const { getByTestId } = render(<Progress value={50} testID="my-progress" />);
    expect(getByTestId("my-progress")).toBeTruthy();
  });
});
