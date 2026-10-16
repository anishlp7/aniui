import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  UnfoldMenu,
  UnfoldMenuTrigger,
  UnfoldMenuContent,
  UnfoldMenuHeader,
  UnfoldMenuTitle,
  UnfoldMenuGrid,
  UnfoldMenuItem,
  UnfoldMenuLabel,
} from "../ui/unfold-menu";

describe("UnfoldMenu", () => {
  it("renders the trigger subtree while collapsed", () => {
    const { getByText } = render(
      <UnfoldMenu>
        <UnfoldMenuTrigger>
          <Text>menu</Text>
        </UnfoldMenuTrigger>
        <UnfoldMenuContent>
          <UnfoldMenuGrid>
            <UnfoldMenuItem value="x">
              <UnfoldMenuLabel>X</UnfoldMenuLabel>
            </UnfoldMenuItem>
          </UnfoldMenuGrid>
        </UnfoldMenuContent>
      </UnfoldMenu>
    );
    expect(getByText("menu")).toBeTruthy();
  });

  it("UnfoldMenuTitle renders inside a header slot when defaultOpen", () => {
    const { getAllByText } = render(
      <UnfoldMenu defaultOpen>
        <UnfoldMenuContent>
          <UnfoldMenuHeader>
            <UnfoldMenuTitle>Picker</UnfoldMenuTitle>
          </UnfoldMenuHeader>
        </UnfoldMenuContent>
      </UnfoldMenu>
    );
    expect(getAllByText("Picker").length).toBeGreaterThan(0);
  });
});
