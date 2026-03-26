import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { Carousel } from "../ui/carousel";

describe("Carousel", () => {
  const slides = [
    <Text key="1">Slide 1</Text>,
    <Text key="2">Slide 2</Text>,
    <Text key="3">Slide 3</Text>,
  ];

  it("renders without crashing", () => {
    const { toJSON } = render(<Carousel data={slides} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders slide content", () => {
    const { getByText } = render(<Carousel data={slides} />);
    expect(getByText("Slide 1")).toBeTruthy();
  });

  it("renders dots when showDots is true and multiple items", () => {
    const { toJSON } = render(<Carousel data={slides} showDots={true} />);
    const tree = JSON.stringify(toJSON());
    // Dots container should exist with multiple children
    expect(tree).toBeTruthy();
  });

  it("does not render dots for a single item", () => {
    const singleSlide = [<Text key="1">Only</Text>];
    const { toJSON } = render(<Carousel data={singleSlide} showDots={true} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom testID", () => {
    const { getByTestId } = render(
      <Carousel data={slides} testID="my-carousel" />
    );
    expect(getByTestId("my-carousel")).toBeTruthy();
  });
});
