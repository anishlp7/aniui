import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchBar } from "../ui/search-bar";

describe("SearchBar", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<SearchBar />);
    expect(toJSON()).toBeTruthy();
  });

  it("has accessibilityRole search", () => {
    const { getByRole } = render(<SearchBar />);
    expect(getByRole("search")).toBeTruthy();
  });

  it("displays default placeholder", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("handles text change", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText("Search..."), "query");
    expect(onChangeText).toHaveBeenCalledWith("query");
  });

  it("shows clear button when value is present", () => {
    const { getByLabelText } = render(<SearchBar value="hello" />);
    expect(getByLabelText("Clear search")).toBeTruthy();
  });

  it("fires onClear when clear pressed", () => {
    const onClear = jest.fn();
    const { getByLabelText } = render(
      <SearchBar value="hello" onClear={onClear} />
    );
    fireEvent.press(getByLabelText("Clear search"));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("shows cancel button when showCancel is true", () => {
    const { getByText } = render(<SearchBar showCancel />);
    expect(getByText("Cancel")).toBeTruthy();
  });
});
