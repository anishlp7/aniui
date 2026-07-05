import React from "react";
import { render } from "@testing-library/react-native";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

describe("Breadcrumb", () => {
  it("renders a full trail without crashing", () => {
    const { getByText } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Details</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Details")).toBeTruthy();
  });

  it("renders a default separator", () => {
    const { getByText } = render(<BreadcrumbSeparator />);
    expect(getByText("/")).toBeTruthy();
  });

  it("renders a custom separator", () => {
    const { getByText } = render(<BreadcrumbSeparator>›</BreadcrumbSeparator>);
    expect(getByText("›")).toBeTruthy();
  });

  it("supports className on the root", () => {
    const { toJSON } = render(<Breadcrumb className="gap-2" />);
    expect(toJSON()).toBeTruthy();
  });
});
