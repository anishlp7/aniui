import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ImageGallery } from "../ui/image-gallery";

const IMAGES = [
  { uri: "https://example.com/a.jpg", alt: "Alpha" },
  { uri: "https://example.com/b.jpg", alt: "Bravo" },
];

describe("ImageGallery", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<ImageGallery images={IMAGES} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty images", () => {
    const { toJSON } = render(<ImageGallery images={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders slide after onLayout provides a width", () => {
    const { getByLabelText, UNSAFE_getByType } = render(
      <ImageGallery images={IMAGES} />
    );
    const { View } = require("react-native");
    const root = UNSAFE_getByType(View);
    // Simulate layout so the inner FlatList mounts.
    fireEvent(root, "layout", { nativeEvent: { layout: { width: 320, height: 240 } } });
    expect(getByLabelText("Alpha")).toBeTruthy();
  });
});
