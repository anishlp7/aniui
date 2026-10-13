import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { CarouselParallax } from "../ui/carousel-parallax";

const slides = [
  <View key="a" />,
  <View key="b" />,
  <View key="c" />,
];

describe("CarouselParallax", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<CarouselParallax data={slides} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<CarouselParallax data={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it("exposes adjustable role for a11y", () => {
    const { UNSAFE_getByProps } = render(<CarouselParallax data={slides} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "adjustable" })).toBeTruthy();
  });
});
