import React from "react";
import { render } from "@testing-library/react-native";
import { Badge } from "../ui/badge";

describe("Badge", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Badge>New</Badge>);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children text", () => {
    const { getByText } = render(<Badge>Active</Badge>);
    expect(getByText("Active")).toBeTruthy();
  });

  it("renders with secondary variant", () => {
    const { getByText } = render(<Badge variant="secondary">Beta</Badge>);
    expect(getByText("Beta")).toBeTruthy();
  });

  it("renders with destructive variant", () => {
    const { getByText } = render(<Badge variant="destructive">Error</Badge>);
    expect(getByText("Error")).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<Badge testID="my-badge">Tag</Badge>);
    expect(toJSON()).toBeTruthy();
  });
});
