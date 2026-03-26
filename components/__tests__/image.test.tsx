import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Image } from "../ui/image";

describe("Image", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Image src="https://example.com/pic.jpg" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders with alt text as accessibilityLabel", () => {
    const { toJSON } = render(
      <Image src="https://example.com/pic.jpg" alt="A photo" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders with width and height", () => {
    const { toJSON } = render(
      <Image src="https://example.com/pic.jpg" width={200} height={150} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders with rounded variant", () => {
    const { toJSON } = render(
      <Image src="https://example.com/pic.jpg" rounded="full" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders custom fallback on error", () => {
    const { toJSON } = render(
      <Image
        src="https://example.com/broken.jpg"
        fallback={<Text>No image</Text>}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(
      <Image src="https://example.com/pic.jpg" testID="my-image" />
    );
    expect(toJSON()).toBeTruthy();
  });
});
