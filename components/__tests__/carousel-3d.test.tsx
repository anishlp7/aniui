import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { Carousel3D } from "../ui/carousel-3d";

describe("Carousel3D", () => {
  it("renders without crashing with items", () => {
    const { toJSON } = render(
      <Carousel3D data={[<View key="a" />, <View key="b" />, <View key="c" />]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<Carousel3D data={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts a custom itemWidth", () => {
    const { toJSON } = render(
      <Carousel3D data={[<View key="a" />]} itemWidth={240} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
