import React from "react";
import { render } from "@testing-library/react-native";
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupAddon,
} from "../ui/input-group";

describe("InputGroup", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <InputGroup>
        <InputGroupInput placeholder="Enter text" />
      </InputGroup>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders InputGroupInput", () => {
    const { getByPlaceholderText } = render(
      <InputGroup>
        <InputGroupInput placeholder="Type here" />
      </InputGroup>
    );
    expect(getByPlaceholderText("Type here")).toBeTruthy();
  });

  it("renders InputGroupText", () => {
    const { getByText } = render(
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput placeholder="domain" />
      </InputGroup>
    );
    expect(getByText("https://")).toBeTruthy();
  });

  it("renders InputGroupButton with button role", () => {
    const { getByRole } = render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    expect(getByRole("button")).toBeTruthy();
  });

  it("renders InputGroupAddon", () => {
    const { getByText } = render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Amount" />
      </InputGroup>
    );
    expect(getByText("$")).toBeTruthy();
  });
});
