import React from "react";
import { render } from "@testing-library/react-native";
import { DataTable } from "../ui/data-table";

interface Row {
  name: string;
  age: number;
}

const columns = [
  { key: "name" as const, header: "Name" },
  { key: "age" as const, header: "Age" },
];

const data: Row[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

describe("DataTable", () => {
  it("renders without crashing with columns and data", () => {
    const { toJSON } = render(
      <DataTable columns={columns} data={data} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders empty state when data is empty", () => {
    const { getByText } = render(
      <DataTable columns={columns} data={[]} emptyText="No data" />
    );
    expect(getByText("No data")).toBeTruthy();
  });

  it("renders column headers", () => {
    const { getByText } = render(
      <DataTable columns={columns} data={data} />
    );
    expect(getByText("Name")).toBeTruthy();
    expect(getByText("Age")).toBeTruthy();
  });
});
