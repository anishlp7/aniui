import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { CarouselCircular } from "../ui/carousel-circular";

describe("CarouselCircular", () => {
  it("renders without crashing with items", () => {
    const { toJSON } = render(
      <CarouselCircular data={[<View key="a" />, <View key="b" />]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<CarouselCircular data={[]} />);
    expect(toJSON()).toBeTruthy();
  });
});
