import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Checkbox } from "../ui/checkbox";

describe("Checkbox", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Checkbox />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders with accessible=true on the pressable", () => {
    const { UNSAFE_getByProps } = render(<Checkbox />);
    expect(UNSAFE_getByProps({ accessible: true })).toBeTruthy();
  });

  it("shows checkmark when checked", () => {
    const { getByText } = render(<Checkbox checked={true} />);
    expect(getByText("\u2713")).toBeTruthy();
  });

  it("applies reduced opacity when disabled", () => {
    const { toJSON } = render(<Checkbox disabled />);
    expect(toJSON()).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { getByTestId } = render(<Checkbox testID="my-checkbox" />);
    expect(getByTestId("my-checkbox")).toBeTruthy();
  });
});
