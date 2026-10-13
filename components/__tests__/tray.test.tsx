import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  Tray,
  TrayTrigger,
  TrayContent,
  TrayView,
  TrayHeader,
  TrayTitle,
  TrayBody,
  TrayClose,
} from "../ui/tray";

describe("Tray", () => {
  it("renders a closed tray without crashing", () => {
    const { getByText } = render(
      <Tray>
        <TrayTrigger view="default">
          <Text>open</Text>
        </TrayTrigger>
        <TrayContent>
          <TrayView id="default">
            <TrayBody>
              <Text>inside</Text>
            </TrayBody>
          </TrayView>
        </TrayContent>
      </Tray>
    );
    expect(getByText("open")).toBeTruthy();
  });

  it("renders when defaultOpen is true", () => {
    const { getAllByText } = render(
      <Tray defaultOpen>
        <TrayContent>
          <TrayView id="default">
            <TrayHeader>
              <TrayTitle>Hello</TrayTitle>
            </TrayHeader>
            <TrayBody>
              <Text>body</Text>
            </TrayBody>
          </TrayView>
        </TrayContent>
      </Tray>
    );
    expect(getAllByText("Hello").length).toBeGreaterThan(0);
  });

  it("TrayClose renders inside its root", () => {
    const { toJSON } = render(
      <Tray defaultOpen>
        <TrayContent>
          <TrayView id="default">
            <TrayClose />
          </TrayView>
        </TrayContent>
      </Tray>
    );
    expect(toJSON()).toBeTruthy();
  });
});
