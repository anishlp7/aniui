import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  GooeyPopover,
  GooeyPopoverTrigger,
  GooeyPopoverContent,
} from "../ui/gooey-popover";

describe("GooeyPopover", () => {
  it("renders the trigger subtree while closed", () => {
    const { getByText } = render(
      <GooeyPopover>
        <GooeyPopoverTrigger>
          <Text>tap</Text>
        </GooeyPopoverTrigger>
        <GooeyPopoverContent>
          <Text>inside</Text>
        </GooeyPopoverContent>
      </GooeyPopover>
    );
    expect(getByText("tap")).toBeTruthy();
  });

  it("renders content too (content is mounted off-screen for measurement)", () => {
    const { getAllByText } = render(
      <GooeyPopover>
        <GooeyPopoverTrigger>
          <Text>t</Text>
        </GooeyPopoverTrigger>
        <GooeyPopoverContent>
          <Text>popover body</Text>
        </GooeyPopoverContent>
      </GooeyPopover>
    );
    expect(getAllByText("popover body").length).toBeGreaterThan(0);
  });

  it("accepts the open prop (controlled) without crashing", () => {
    const { toJSON } = render(
      <GooeyPopover open>
        <GooeyPopoverTrigger>
          <Text>t</Text>
        </GooeyPopoverTrigger>
      </GooeyPopover>
    );
    expect(toJSON()).toBeTruthy();
  });
});
