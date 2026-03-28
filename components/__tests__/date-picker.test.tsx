import React from "react";
import { render } from "@testing-library/react-native";
import { DatePicker, DateRangePicker } from "../ui/date-picker";

describe("DatePicker", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<DatePicker />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder when no value", () => {
    const { getByText } = render(
      <DatePicker placeholder="Choose a date" />
    );
    expect(getByText("Choose a date")).toBeTruthy();
  });

  it("displays formatted date when value is provided", () => {
    const date = new Date(2025, 0, 15);
    const { getByText } = render(
      <DatePicker value={date} formatDate={(d) => "Jan 15, 2025"} />
    );
    expect(getByText("Jan 15, 2025")).toBeTruthy();
  });

  it("has accessibilityRole button on trigger", () => {
    const { getByRole } = render(<DatePicker />);
    expect(getByRole("button")).toBeTruthy();
  });
});

describe("DateRangePicker", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<DateRangePicker />);
    expect(toJSON()).toBeTruthy();
  });

  it("displays placeholder when no dates selected", () => {
    const { getByText } = render(
      <DateRangePicker placeholder="Pick range" />
    );
    expect(getByText("Pick range")).toBeTruthy();
  });
});
