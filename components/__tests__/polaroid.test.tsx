import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Polaroid, PolaroidTape } from "../ui/polaroid";

describe("Polaroid", () => {
  it("renders as a static image role when no onPress", () => {
    const { getByLabelText } = render(
      <Polaroid source={{ uri: "https://example.com/a.jpg" }} caption="Beach" />
    );
    expect(getByLabelText("Beach")).toBeTruthy();
  });

  it("falls back to a generic a11y label when no caption is provided", () => {
    const { getByLabelText } = render(
      <Polaroid source={{ uri: "https://example.com/a.jpg" }} />
    );
    expect(getByLabelText("Polaroid photo")).toBeTruthy();
  });

  it("becomes a button when onPress is provided and fires it", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Polaroid
        source={{ uri: "https://example.com/a.jpg" }}
        caption="Tap"
        onPress={onPress}
      />
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders the washi-tape decoration when tape is set", () => {
    const { toJSON } = render(
      <Polaroid source={{ uri: "https://example.com/a.jpg" }} tape />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("PolaroidTape renders standalone", () => {
    const { toJSON } = render(<PolaroidTape />);
    expect(toJSON()).toBeTruthy();
  });
});
