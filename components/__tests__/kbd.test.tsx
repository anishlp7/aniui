import React from "react";
import { render } from "@testing-library/react-native";
import { Kbd, KbdGroup } from "../ui/kbd";

describe("Kbd", () => {
  it("renders with text", () => {
    const { getByText } = render(<Kbd>Ctrl</Kbd>);
    expect(getByText("Ctrl")).toBeTruthy();
  });

  it("renders KbdGroup with separator", () => {
    const { getByText } = render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>
    );
    expect(getByText("Ctrl")).toBeTruthy();
    expect(getByText("+")).toBeTruthy();
    expect(getByText("C")).toBeTruthy();
  });

  it("renders KbdGroup with custom separator", () => {
    const { getByText } = render(
      <KbdGroup separator="then">
        <Kbd>A</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>
    );
    expect(getByText("A")).toBeTruthy();
    expect(getByText("then")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();
  });
});
