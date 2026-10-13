import React from "react";
import { render } from "@testing-library/react-native";
import { ConnectionBanner } from "../ui/connection-banner";

describe("ConnectionBanner", () => {
  it("renders nothing when connected is undefined (not yet known)", () => {
    const { toJSON } = render(<ConnectionBanner />);
    expect(toJSON()).toBeNull();
  });

  it("shows the default offline text when connected=false", () => {
    const { getByText } = render(<ConnectionBanner connected={false} />);
    expect(getByText("No internet connection")).toBeTruthy();
  });

  it("shows the default online text when connected=true", () => {
    const { getByText } = render(<ConnectionBanner connected={true} />);
    expect(getByText("Back online")).toBeTruthy();
  });

  it("respects custom offlineText and onlineText", () => {
    const offline = render(
      <ConnectionBanner connected={false} offlineText="Offline mode" />
    );
    expect(offline.getByText("Offline mode")).toBeTruthy();

    const online = render(
      <ConnectionBanner connected={true} onlineText="You're online" />
    );
    expect(online.getByText("You're online")).toBeTruthy();
  });

  it("has alert role for a11y when visible", () => {
    const { UNSAFE_getByProps } = render(<ConnectionBanner connected={false} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "alert" })).toBeTruthy();
  });
});
