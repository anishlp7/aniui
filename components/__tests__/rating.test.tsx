import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Rating } from "../ui/rating";

describe("Rating", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Rating value={3} />);
    expect(toJSON()).toBeTruthy();
  });

  it("has adjustable accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(<Rating value={2} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "adjustable" })).toBeTruthy();
  });

  it("sets accessibilityValue correctly", () => {
    const { UNSAFE_getByProps } = render(<Rating value={3} max={5} />);
    const el = UNSAFE_getByProps({ accessibilityRole: "adjustable" });
    expect(el.props.accessibilityValue).toEqual({
      min: 0,
      max: 5,
      now: 3,
    });
  });

  it("renders correct number of stars", () => {
    const { getAllByRole } = render(<Rating value={2} max={5} onChange={() => {}} />);
    // Each interactive star is a button
    expect(getAllByRole("button").length).toBe(5);
  });

  it("calls onChange when a star is pressed", () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating value={2} max={5} onChange={onChange} />);
    fireEvent.press(getAllByRole("button")[3]); // 4th star
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("does not render pressable stars when readOnly", () => {
    const { queryAllByRole } = render(<Rating value={3} readOnly />);
    expect(queryAllByRole("button").length).toBe(0);
  });
});
