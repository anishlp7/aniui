import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { useFoldFeatures } from "../ui/fold";

function Probe() {
  const f = useFoldFeatures();
  return (
    <Text>
      {`isFolded=${f.isFolded}/foldX=${f.foldX}/angle=${f.hingeAngle}/posture=${f.postureHint}`}
    </Text>
  );
}

describe("useFoldFeatures", () => {
  it("reports an unfolded Duo under the default jest.setup mock", () => {
    const { getByText } = render(<Probe />);
    // The mock stubs angle: 180, isOpen: true → isFolded false, posture flat.
    // foldX = window.width / 2 — RNTL's default window width is 750, so foldX = 375.
    expect(getByText(/isFolded=false/)).toBeTruthy();
    expect(getByText(/posture=flat/)).toBeTruthy();
    expect(getByText(/angle=180/)).toBeTruthy();
    expect(getByText(/foldX=\d+/)).toBeTruthy();
  });
});
