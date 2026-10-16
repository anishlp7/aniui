import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import {
  Header,
  HeaderLeft,
  HeaderTitle,
  HeaderRight,
  HeaderBackButton,
} from "../ui/header";

describe("Header", () => {
  it("renders a Header with left/title/right slots", () => {
    const { getByText } = render(
      <Header>
        <HeaderLeft>
          <HeaderBackButton onPress={() => {}} label="Back" />
        </HeaderLeft>
        <HeaderTitle>Inbox</HeaderTitle>
        <HeaderRight />
      </Header>
    );
    expect(getByText("Inbox")).toBeTruthy();
    expect(getByText("Back")).toBeTruthy();
  });

  it("HeaderBackButton fires onPress", () => {
    const onPress = jest.fn();
    const { getByRole } = render(<HeaderBackButton onPress={onPress} />);
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("HeaderBackButton has 'Go back' a11y label by default", () => {
    const { getByLabelText } = render(<HeaderBackButton onPress={() => {}} />);
    expect(getByLabelText("Go back")).toBeTruthy();
  });

  it("Header accepts each variant without crashing", () => {
    for (const variant of ["default", "transparent", "primary"] as const) {
      const { toJSON } = render(
        <Header variant={variant}>
          <HeaderTitle>x</HeaderTitle>
        </Header>
      );
      expect(toJSON()).toBeTruthy();
    }
  });
});
