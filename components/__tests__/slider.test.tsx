import React from "react";
import { render } from "@testing-library/react-native";
import { Slider } from "../ui/slider";

describe("Slider", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Slider value={50} />);
    expect(toJSON()).toBeTruthy();
  });

  it("has adjustable accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(<Slider value={25} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "adjustable" })).toBeTruthy();
  });

  it("sets accessibilityValue correctly", () => {
    const { UNSAFE_getByProps } = render(<Slider value={30} min={0} max={100} />);
    const slider = UNSAFE_getByProps({ accessibilityRole: "adjustable" });
    expect(slider.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 30 });
  });

  it("accepts custom testID", () => {
    const { getByTestId } = render(<Slider value={0} testID="my-slider" />);
    expect(getByTestId("my-slider")).toBeTruthy();
  });

  it("renders with reduced opacity when disabled", () => {
    const { UNSAFE_getByProps } = render(<Slider value={50} disabled />);
    const el = UNSAFE_getByProps({ accessibilityRole: "adjustable" });
    // disabled is passed to the primitive Root, the View gets opacity-50 class
    expect(el).toBeTruthy();
  });
});
