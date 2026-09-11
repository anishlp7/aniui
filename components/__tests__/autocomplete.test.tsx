import React from "react";
import { Keyboard } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { AutoComplete, type AutoCompleteOption } from "../ui/autocomplete";

const OPTIONS: AutoCompleteOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
];

describe("AutoComplete", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<AutoComplete options={OPTIONS} />);
    expect(toJSON()).toBeTruthy();
  });

  it("filters options as the user types", () => {
    const { getByDisplayValue, getByText, queryByText } = render(<AutoComplete options={OPTIONS} />);
    fireEvent.changeText(getByDisplayValue(""), "an");
    expect(getByText("Banana")).toBeTruthy();
    expect(queryByText("Apple")).toBeNull();
  });

  it("respects a custom filterFn", () => {
    const filterFn = jest.fn((o: AutoCompleteOption) => o.value === "cherry");
    const { getByDisplayValue, getByText } = render(<AutoComplete options={OPTIONS} filterFn={filterFn} />);
    fireEvent.changeText(getByDisplayValue(""), "x");
    expect(filterFn).toHaveBeenCalled();
    expect(getByText("Cherry")).toBeTruthy();
  });

  it("does not open the dropdown below minCharsToTrigger", () => {
    const { getByDisplayValue, queryByText } = render(<AutoComplete options={OPTIONS} minCharsToTrigger={2} />);
    fireEvent.changeText(getByDisplayValue(""), "a");
    expect(queryByText("Apple")).toBeNull();
  });

  it("calls onSelect, fills the field, and dismisses the keyboard on selection", () => {
    const dismissSpy = jest.spyOn(Keyboard, "dismiss").mockImplementation(() => {});
    const onSelect = jest.fn();
    const { getByDisplayValue, getByText } = render(<AutoComplete options={OPTIONS} onSelect={onSelect} />);
    fireEvent.changeText(getByDisplayValue(""), "ba");
    fireEvent.press(getByText("Banana"));
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
    expect(getByDisplayValue("Banana")).toBeTruthy();
    expect(dismissSpy).toHaveBeenCalledTimes(1);
    dismissSpy.mockRestore();
  });

  it("ignores presses on a disabled option", () => {
    const onSelect = jest.fn();
    const { getByDisplayValue, getByText } = render(<AutoComplete options={OPTIONS} onSelect={onSelect} />);
    fireEvent.changeText(getByDisplayValue(""), "cherry");
    fireEvent.press(getByText("Cherry"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("shows the empty state when nothing matches", () => {
    const { getByDisplayValue, getByText } = render(<AutoComplete options={OPTIONS} emptyText="Nothing here" />);
    fireEvent.changeText(getByDisplayValue(""), "zzz");
    expect(getByText("Nothing here")).toBeTruthy();
  });

  it("shows a loading state instead of results", () => {
    const { getByDisplayValue, getByText, queryByText } = render(<AutoComplete options={OPTIONS} loading />);
    fireEvent.changeText(getByDisplayValue(""), "a");
    expect(getByText("Loading…")).toBeTruthy();
    expect(queryByText("Apple")).toBeNull();
  });

  it("clears the text and closes the dropdown via the clear button", () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue, getByLabelText, queryByText } = render(
      <AutoComplete options={OPTIONS} onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByDisplayValue(""), "an");
    fireEvent.press(getByLabelText("Clear"));
    expect(onChangeText).toHaveBeenCalledWith("");
    expect(queryByText("Banana")).toBeNull();
  });
});
