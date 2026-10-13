import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  MorphFab,
  MorphFabTrigger,
  MorphFabItem,
  MorphFabItemIcon,
  MorphFabItemLabel,
} from "../ui/morph-fab";

describe("MorphFab", () => {
  it("renders the trigger while closed", () => {
    const { getByText } = render(
      <MorphFab>
        <MorphFabTrigger>
          <Text>+</Text>
        </MorphFabTrigger>
      </MorphFab>
    );
    expect(getByText("+")).toBeTruthy();
  });

  it("renders items too (mounted off-screen for measurement)", () => {
    const { getAllByText } = render(
      <MorphFab>
        <MorphFabTrigger>
          <Text>+</Text>
        </MorphFabTrigger>
        <MorphFabItem value="new">
          <MorphFabItemIcon>
            <Text>N</Text>
          </MorphFabItemIcon>
          <MorphFabItemLabel>New</MorphFabItemLabel>
        </MorphFabItem>
      </MorphFab>
    );
    expect(getAllByText("New").length).toBeGreaterThan(0);
  });

  it("accepts the controlled open prop without crashing", () => {
    const { toJSON } = render(
      <MorphFab open>
        <MorphFabTrigger>
          <Text>+</Text>
        </MorphFabTrigger>
      </MorphFab>
    );
    expect(toJSON()).toBeTruthy();
  });
});
