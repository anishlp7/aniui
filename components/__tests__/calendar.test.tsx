import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Calendar } from "../ui/calendar";

describe("Calendar", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Calendar />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders day-of-week headers", () => {
    const { getByText } = render(<Calendar />);
    expect(getByText("Su")).toBeTruthy();
    expect(getByText("Mo")).toBeTruthy();
    expect(getByText("Fr")).toBeTruthy();
  });

  it("renders navigation buttons", () => {
    const { getByLabelText } = render(<Calendar />);
    expect(getByLabelText("Previous")).toBeTruthy();
    expect(getByLabelText("Next")).toBeTruthy();
  });

  it("calls onSelect when a day is pressed", () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Calendar selected={new Date(2025, 5, 1)} onSelect={onSelect} />
    );
    fireEvent.press(getByText("15"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("renders with a selected date highlighted", () => {
    const date = new Date(2025, 5, 10);
    const { getByText } = render(<Calendar selected={date} />);
    expect(getByText("10")).toBeTruthy();
  });
});
