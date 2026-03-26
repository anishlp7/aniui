import React from "react";
import { render } from "@testing-library/react-native";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

describe("Table", () => {
  const renderTable = () =>
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

  it("renders without crashing", () => {
    const { toJSON } = renderTable();
    expect(toJSON()).toBeTruthy();
  });

  it("renders header text", () => {
    const { getByText } = renderTable();
    expect(getByText("Name")).toBeTruthy();
    expect(getByText("Age")).toBeTruthy();
  });

  it("renders cell text", () => {
    const { getByText } = renderTable();
    expect(getByText("Alice")).toBeTruthy();
    expect(getByText("30")).toBeTruthy();
  });

  it("accepts custom testID on Table", () => {
    const { getByTestId } = render(
      <Table testID="my-table">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(getByTestId("my-table")).toBeTruthy();
  });
});
