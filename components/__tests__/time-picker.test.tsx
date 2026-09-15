import React from "react";
import { render } from "@testing-library/react-native";
import { TimePicker, DateTimePicker } from "../ui/time-picker";

describe("TimePicker", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<TimePicker />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder when no value", () => {
    const { getByText } = render(<TimePicker placeholder="Pick a time" />);
    expect(getByText("Pick a time")).toBeTruthy();
  });

  it("displays formatted time when value is provided", () => {
    const date = new Date(2025, 0, 15, 14, 30);
    const { getByText } = render(
      <TimePicker value={date} formatTime={() => "2:30 PM"} />
    );
    expect(getByText("2:30 PM")).toBeTruthy();
  });

  it("has accessibilityRole button on trigger", () => {
    const { getByRole } = render(<TimePicker />);
    expect(getByRole("button")).toBeTruthy();
  });
});

describe("DateTimePicker", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<DateTimePicker />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder when no value", () => {
    const { getByText } = render(<DateTimePicker placeholder="Pick date & time" />);
    expect(getByText("Pick date & time")).toBeTruthy();
  });
});
