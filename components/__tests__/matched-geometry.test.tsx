import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  MatchedGeometryProvider,
  MatchedGeometryView,
  useMatchedGeometry,
} from "../ui/matched-geometry";

describe("MatchedGeometry", () => {
  it("renders Provider children", () => {
    const { getByText } = render(
      <MatchedGeometryProvider>
        <Text>app</Text>
      </MatchedGeometryProvider>
    );
    expect(getByText("app")).toBeTruthy();
  });

  it("MatchedGeometryView renders its children inside a provider", () => {
    const { getByText } = render(
      <MatchedGeometryProvider>
        <MatchedGeometryView id="x">
          <Text>contents</Text>
        </MatchedGeometryView>
      </MatchedGeometryProvider>
    );
    expect(getByText("contents")).toBeTruthy();
  });

  it("useMatchedGeometry returns a stable result inside a provider", () => {
    let captured: ReturnType<typeof useMatchedGeometry> | null = null;
    function Peek() {
      captured = useMatchedGeometry();
      return null;
    }
    render(
      <MatchedGeometryProvider>
        <Peek />
      </MatchedGeometryProvider>
    );
    expect(captured).toBeTruthy();
  });
});
