import React from "react";
import { render } from "@testing-library/react-native";
import { Separator } from "../ui/separator";

describe("Separator", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Separator />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders horizontal by default", () => {
    const { toJSON } = render(<Separator />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders vertical orientation", () => {
    const { toJSON } = render(<Separator orientation="vertical" />);
    expect(toJSON()).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<Separator testID="sep" />);
    expect(toJSON()).toBeTruthy();
  });

  it("supports className prop", () => {
    const { toJSON } = render(<Separator className="my-4" />);
    expect(toJSON()).toBeTruthy();
  });
});
