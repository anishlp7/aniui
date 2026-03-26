import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Switch } from "../ui/switch";

describe("Switch", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Switch />);
    expect(toJSON()).toBeTruthy();
  });

  it("has accessibilityRole switch", () => {
    const { getByRole } = render(<Switch />);
    expect(getByRole("switch")).toBeTruthy();
  });

  it("fires onValueChange handler", () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} />
    );
    fireEvent(getByRole("switch"), "valueChange", true);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it("spreads additional props", () => {
    const { getByRole } = render(<Switch testID="my-switch" />);
    expect(getByRole("switch")).toBeTruthy();
  });

  it("supports className prop", () => {
    const { toJSON } = render(<Switch className="mt-2" />);
    expect(toJSON()).toBeTruthy();
  });
});
