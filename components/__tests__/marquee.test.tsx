import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { Marquee } from "../ui/marquee";

describe("Marquee", () => {
  it("renders children text", () => {
    const { getAllByText } = render(
      <Marquee>
        <Text>Breaking news</Text>
      </Marquee>
    );
    // Children are measured once off-screen, so the text appears in the
    // measurement View even before the track mounts repeats.
    expect(getAllByText("Breaking news").length).toBeGreaterThan(0);
  });

  it("renders without crashing with reverse direction", () => {
    const { toJSON } = render(
      <Marquee reverse>
        <Text>x</Text>
      </Marquee>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with pauseOnPress", () => {
    const { toJSON } = render(
      <Marquee pauseOnPress>
        <Text>x</Text>
      </Marquee>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts a custom speed without crashing", () => {
    const { toJSON } = render(
      <Marquee speed={200}>
        <Text>x</Text>
      </Marquee>
    );
    expect(toJSON()).toBeTruthy();
  });
});
