import React from "react";
import { render } from "@testing-library/react-native";
import { ArcList, ArcListItem, ArcListLabel } from "../ui/arc-list";

describe("ArcList", () => {
  it("renders without crashing with items", () => {
    // Items are projected onto a FlatList that waits for an onLayout size
    // before rendering any cell — nothing visible under jsdom. Just assert
    // the shell mounts.
    const { toJSON } = render(
      <ArcList>
        <ArcListItem>
          <ArcListLabel>Alpha</ArcListLabel>
        </ArcListItem>
        <ArcListItem>
          <ArcListLabel>Bravo</ArcListLabel>
        </ArcListItem>
      </ArcList>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with no items", () => {
    const { toJSON } = render(<ArcList />);
    expect(toJSON()).toBeTruthy();
  });
});
