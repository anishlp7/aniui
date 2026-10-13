import React from "react";
import { render } from "@testing-library/react-native";
import { LabeledSeparator } from "../ui/labeled-separator";

describe("LabeledSeparator", () => {
  it("renders the label text", () => {
    const { getByText } = render(<LabeledSeparator label="OR" />);
    expect(getByText("OR")).toBeTruthy();
  });

  it("renders without crashing when label is empty", () => {
    const { toJSON } = render(<LabeledSeparator label="" />);
    expect(toJSON()).toBeTruthy();
  });
});
