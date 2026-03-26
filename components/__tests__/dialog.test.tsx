import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

describe("Dialog", () => {
  it("renders without crashing when open", () => {
    const { toJSON } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <Text>Dialog body</Text>
        </DialogContent>
      </Dialog>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("does not render content when closed", () => {
    const { queryByText } = render(
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogContent>
          <Text>Hidden</Text>
        </DialogContent>
      </Dialog>
    );
    expect(queryByText("Hidden")).toBeNull();
  });

  it("renders title and description", () => {
    const { getByText } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Desc</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    expect(getByText("Title")).toBeTruthy();
    expect(getByText("Desc")).toBeTruthy();
  });

  it("renders footer", () => {
    const { getByText } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogFooter>
            <Text>Footer</Text>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    expect(getByText("Footer")).toBeTruthy();
  });

  it("DialogContent has alert accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <Text>Content</Text>
        </DialogContent>
      </Dialog>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "alert" })).toBeTruthy();
  });
});
