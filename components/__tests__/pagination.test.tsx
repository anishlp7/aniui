import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Pagination } from "../ui/pagination";

describe("Pagination", () => {
  it("renders page numbers for a small range", () => {
    const { getByText } = render(
      <Pagination total={3} current={2} onPageChange={() => {}} />
    );
    expect(getByText("1")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
  });

  it("fires onPageChange when tapping a numbered button", () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <Pagination total={3} current={2} onPageChange={onPageChange} />
    );
    fireEvent.press(getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("Prev button fires with current-1", () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={5} current={3} onPageChange={onPageChange} />
    );
    fireEvent.press(getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("Next button fires with current+1", () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination total={5} current={3} onPageChange={onPageChange} />
    );
    fireEvent.press(getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("ellipsizes very long ranges", () => {
    const { getByText } = render(
      <Pagination total={20} current={10} onPageChange={() => {}} />
    );
    // Should render first (1), ellipsis, siblings (9, 10, 11), ellipsis, last (20).
    expect(getByText("1")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("20")).toBeTruthy();
  });

  it("marks the current page as selected", () => {
    const { getByLabelText } = render(
      <Pagination total={3} current={2} onPageChange={() => {}} />
    );
    expect(getByLabelText("Page 2").props.accessibilityState.selected).toBe(true);
    expect(getByLabelText("Page 1").props.accessibilityState.selected).toBe(false);
  });
});
