import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { ProfileCard, ProfileCardCover } from "../ui/profile-card";

describe("ProfileCard", () => {
  it("renders without crashing with just children", () => {
    const { getByText } = render(
      <ProfileCard>
        <Text>inside</Text>
      </ProfileCard>
    );
    expect(getByText("inside")).toBeTruthy();
  });

  it("has summary a11y role on the root", () => {
    const { UNSAFE_getByProps } = render(
      <ProfileCard>
        <Text>x</Text>
      </ProfileCard>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "summary" })).toBeTruthy();
  });

  it("ProfileCardCover renders inside its root", () => {
    const { toJSON } = render(
      <ProfileCard>
        <ProfileCardCover />
      </ProfileCard>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("ProfileCardCover throws when rendered outside a ProfileCard root", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ProfileCardCover />)).toThrow(
      /must be rendered inside <ProfileCard>/
    );
    spy.mockRestore();
  });
});
