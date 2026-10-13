import React from "react";
import { render } from "@testing-library/react-native";
import { QrCode } from "../ui/qr-code";

describe("QrCode", () => {
  it("renders in the collapsed state by default", () => {
    const { toJSON } = render(<QrCode value="https://aniui.dev" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders the label when provided", () => {
    const { getByText } = render(<QrCode value="x" label="Tap to show" />);
    expect(getByText("Tap to show")).toBeTruthy();
  });

  it("renders without crashing with a custom size", () => {
    const { toJSON } = render(<QrCode value="x" size={240} />);
    expect(toJSON()).toBeTruthy();
  });
});
