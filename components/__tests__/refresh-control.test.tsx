import React from "react";
import { render } from "@testing-library/react-native";
import { RefreshControl } from "../ui/refresh-control";

describe("RefreshControl", () => {
  it("renders without crashing when not refreshing", () => {
    const { toJSON } = render(
      <RefreshControl refreshing={false} onRefresh={() => {}} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing when refreshing", () => {
    const { toJSON } = render(
      <RefreshControl refreshing={true} onRefresh={() => {}} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts a custom tintColor without crashing", () => {
    const { toJSON } = render(
      <RefreshControl refreshing={false} onRefresh={() => {}} tintColor="#ff0000" />
    );
    expect(toJSON()).toBeTruthy();
  });
});
