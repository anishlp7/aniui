import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { AvatarGroup } from "../ui/avatar-group";

describe("AvatarGroup", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<AvatarGroup />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders all children when count is within max", () => {
    const { getByText } = render(
      <AvatarGroup max={4}>
        <Text>A</Text>
        <Text>B</Text>
      </AvatarGroup>
    );
    expect(getByText("A")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();
  });

  it("shows +N overflow indicator when children exceed max", () => {
    const { getByText } = render(
      <AvatarGroup max={2}>
        <Text>A</Text>
        <Text>B</Text>
        <Text>C</Text>
        <Text>D</Text>
      </AvatarGroup>
    );
    expect(getByText("+2")).toBeTruthy();
  });

  it("hides overflow indicator when count equals max", () => {
    const { queryByText } = render(
      <AvatarGroup max={2}>
        <Text>A</Text>
        <Text>B</Text>
      </AvatarGroup>
    );
    expect(queryByText("+0")).toBeNull();
  });
});
