import React from "react";
import { render } from "@testing-library/react-native";
import { Combobox } from "../ui/combobox";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("Combobox", () => {
  it("renders without crashing with basic options", () => {
    const { toJSON } = render(<Combobox options={options} />);
    expect(toJSON()).toBeTruthy();
  });

  it("shows placeholder when no value", () => {
    const { getByText } = render(
      <Combobox options={options} placeholder="Pick a fruit" />
    );
    expect(getByText("Pick a fruit")).toBeTruthy();
  });

  it("renders with disabled prop", () => {
    const { toJSON } = render(
      <Combobox options={options} disabled />
    );
    const tree = toJSON();
    expect(tree).toBeTruthy();
  });
});
