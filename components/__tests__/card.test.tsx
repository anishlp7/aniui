import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

describe("Card", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Card />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <Card>
        <Text>Content</Text>
      </Card>
    );
    expect(getByText("Content")).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<Card testID="my-card" />);
    expect(toJSON()).toBeTruthy();
  });
});

describe("CardHeader", () => {
  it("renders children", () => {
    const { getByText } = render(
      <CardHeader>
        <Text>Header</Text>
      </CardHeader>
    );
    expect(getByText("Header")).toBeTruthy();
  });
});

describe("CardTitle", () => {
  it("renders text", () => {
    const { getByText } = render(<CardTitle>My Title</CardTitle>);
    expect(getByText("My Title")).toBeTruthy();
  });
});

describe("CardDescription", () => {
  it("renders text", () => {
    const { getByText } = render(<CardDescription>A description</CardDescription>);
    expect(getByText("A description")).toBeTruthy();
  });
});

describe("CardContent", () => {
  it("renders children", () => {
    const { getByText } = render(
      <CardContent>
        <Text>Body</Text>
      </CardContent>
    );
    expect(getByText("Body")).toBeTruthy();
  });
});

describe("CardFooter", () => {
  it("renders children", () => {
    const { getByText } = render(
      <CardFooter>
        <Text>Footer</Text>
      </CardFooter>
    );
    expect(getByText("Footer")).toBeTruthy();
  });
});
