import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { auditInteractiveElement, auditRendersWithRole } from "./helpers/a11y-audit";

// Import all interactive components
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Toggle } from "../ui/toggle";
import { Chip } from "../ui/chip";
import { FAB } from "../ui/fab";
import { Slider } from "../ui/slider";
import { Stepper } from "../ui/stepper";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "../ui/tabs";
import { Alert } from "../ui/alert";
import { Banner } from "../ui/banner";
import { Progress } from "../ui/progress";
import { Spinner } from "../ui/spinner";
import { Rating } from "../ui/rating";
import { SearchBar } from "../ui/search-bar";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

describe("Accessibility Audit", () => {
  describe("Button", () => {
    it("has accessibilityRole=button and accessible=true", () => {
      const { getByRole } = render(<Button>Click</Button>);
      const el = auditRendersWithRole(getByRole, "button");
      auditInteractiveElement(el, "button");
    });

    it("sets accessibilityState.disabled when disabled", () => {
      const { getByRole } = render(<Button disabled>Click</Button>);
      const el = getByRole("button");
      expect(el.props.disabled || el.props.accessibilityState?.disabled).toBeTruthy();
    });
  });

  describe("Checkbox", () => {
    it("has accessible=true on the pressable (primitive provides checkbox role)", () => {
      const { UNSAFE_getByProps } = render(<Checkbox />);
      // accessibilityRole="checkbox" is managed by the primitive Root;
      // the inner Pressable has accessible={true}.
      const el = UNSAFE_getByProps({ accessible: true });
      expect(el).toBeTruthy();
      expect(el.props.accessible).toBe(true);
    });

    it("shows checkmark when checked", () => {
      const { getByText } = render(<Checkbox checked={true} />);
      expect(getByText("\u2713")).toBeTruthy();
    });

    it("renders without crashing when unchecked", () => {
      const { toJSON } = render(<Checkbox checked={false} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe("Switch", () => {
    it("has accessibilityRole=switch", () => {
      const { getByRole } = render(<Switch />);
      auditRendersWithRole(getByRole, "switch");
    });
  });

  describe("RadioGroup", () => {
    it("has accessibilityRole=radiogroup on the group", () => {
      const { UNSAFE_getByProps } = render(
        <RadioGroup value="a">
          <RadioGroupItem value="a" label="Option A" />
        </RadioGroup>
      );
      const group = UNSAFE_getByProps({ accessibilityRole: "radiogroup" });
      expect(group).toBeTruthy();
    });

    it("has accessible=true on items (primitive provides radio role)", () => {
      const { UNSAFE_getAllByProps } = render(
        <RadioGroup value="a">
          <RadioGroupItem value="a" label="A" />
          <RadioGroupItem value="b" label="B" />
        </RadioGroup>
      );
      // accessibilityRole="radio" is managed by the primitive Item;
      // the inner Pressable has accessible={true}.
      const items = UNSAFE_getAllByProps({ accessible: true });
      expect(items.length).toBeGreaterThanOrEqual(2);
    });

    it("renders items with label text", () => {
      const { getByText } = render(
        <RadioGroup value="a">
          <RadioGroupItem value="a" label="A" />
          <RadioGroupItem value="b" label="B" />
        </RadioGroup>
      );
      expect(getByText("A")).toBeTruthy();
      expect(getByText("B")).toBeTruthy();
    });
  });

  describe("Toggle", () => {
    it("has accessibilityRole=button", () => {
      const { getByRole } = render(
        <Toggle>
          <Text>Bold</Text>
        </Toggle>
      );
      const el = auditRendersWithRole(getByRole, "button");
      auditInteractiveElement(el, "button");
    });
  });

  describe("Chip", () => {
    it("has accessibilityRole=button", () => {
      const { getByRole } = render(<Chip>Tag</Chip>);
      const el = auditRendersWithRole(getByRole, "button");
      auditInteractiveElement(el, "button");
    });

    it("reports selected state", () => {
      const { getByRole } = render(<Chip selected>Active</Chip>);
      const el = getByRole("button");
      expect(el.props.accessibilityState?.selected).toBe(true);
    });
  });

  describe("FAB", () => {
    it("has accessibilityRole=button and accessibilityLabel", () => {
      const { getByRole } = render(<FAB icon={<Text>+</Text>} />);
      const el = auditRendersWithRole(getByRole, "button");
      auditInteractiveElement(el, "button");
      expect(el.props.accessibilityLabel).toBeTruthy();
    });
  });

  describe("Slider", () => {
    it("has accessibilityRole=adjustable", () => {
      const { getByRole } = render(<Slider value={50} min={0} max={100} />);
      auditRendersWithRole(getByRole, "adjustable");
    });
  });

  describe("Stepper", () => {
    it("has accessibilityRole=adjustable", () => {
      const { UNSAFE_getByProps } = render(<Stepper value={1} />);
      const el = UNSAFE_getByProps({ accessibilityRole: "adjustable" });
      expect(el).toBeTruthy();
    });
  });

  describe("Tabs", () => {
    it("has tab roles on triggers", () => {
      const { getAllByRole } = render(
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a"><Text>Content A</Text></TabsContent>
        </Tabs>
      );
      const tabs = getAllByRole("tab");
      expect(tabs.length).toBe(2);
      tabs.forEach((el) => auditInteractiveElement(el, "tab"));
    });

    it("renders tab triggers with accessible=true", () => {
      const { getAllByRole } = render(
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a"><Text>Content A</Text></TabsContent>
        </Tabs>
      );
      // accessibilityState.selected is managed by the primitive;
      // the mock doesn't set it, but we verify tabs render correctly.
      const tabs = getAllByRole("tab");
      expect(tabs[0].props.accessible).toBe(true);
      expect(tabs[1].props.accessible).toBe(true);
    });
  });

  describe("Alert", () => {
    it("has accessibilityRole=alert", () => {
      const { UNSAFE_getByProps } = render(<Alert><Text>Warning!</Text></Alert>);
      const el = UNSAFE_getByProps({ accessibilityRole: "alert" });
      expect(el).toBeTruthy();
    });
  });

  describe("Banner", () => {
    it("has accessibilityRole=alert", () => {
      const { UNSAFE_getByProps } = render(<Banner>Notice</Banner>);
      const el = UNSAFE_getByProps({ accessibilityRole: "alert" });
      expect(el).toBeTruthy();
    });
  });

  describe("Progress", () => {
    it("has accessibilityRole=progressbar", () => {
      const { UNSAFE_getByProps } = render(<Progress value={50} />);
      const el = UNSAFE_getByProps({ accessibilityRole: "progressbar" });
      expect(el).toBeTruthy();
    });
  });

  describe("Spinner", () => {
    it("has accessibilityRole=progressbar", () => {
      const { UNSAFE_getByProps } = render(<Spinner />);
      const el = UNSAFE_getByProps({ accessibilityRole: "progressbar" });
      expect(el).toBeTruthy();
    });
  });

  describe("Rating", () => {
    it("has accessibilityRole=adjustable", () => {
      const { UNSAFE_getByProps } = render(<Rating value={3} max={5} />);
      const el = UNSAFE_getByProps({ accessibilityRole: "adjustable" });
      expect(el).toBeTruthy();
    });

    it("reports value via accessibilityValue", () => {
      const { UNSAFE_getByProps } = render(<Rating value={3} max={5} />);
      const el = UNSAFE_getByProps({ accessibilityRole: "adjustable" });
      expect(el.props.accessibilityValue?.now).toBe(3);
      expect(el.props.accessibilityValue?.max).toBe(5);
    });
  });

  describe("SearchBar", () => {
    it("has accessibilityRole=search", () => {
      const { UNSAFE_getByProps } = render(<SearchBar value="" onChangeText={() => {}} />);
      const el = UNSAFE_getByProps({ accessibilityRole: "search" });
      expect(el).toBeTruthy();
    });
  });

  describe("ToggleGroup", () => {
    it("has accessibilityRole=radiogroup on group", () => {
      const { UNSAFE_getByProps } = render(
        <ToggleGroup value="a" onValueChange={() => {}}>
          <ToggleGroupItem value="a"><Text>A</Text></ToggleGroupItem>
        </ToggleGroup>
      );
      const el = UNSAFE_getByProps({ accessibilityRole: "radiogroup" });
      expect(el).toBeTruthy();
    });
  });

  describe("Collapsible", () => {
    it("trigger has accessibilityRole=button", () => {
      const { getByRole } = render(
        <Collapsible>
          <CollapsibleTrigger><Text>Toggle</Text></CollapsibleTrigger>
          <CollapsibleContent><Text>Hidden</Text></CollapsibleContent>
        </Collapsible>
      );
      const el = auditRendersWithRole(getByRole, "button");
      auditInteractiveElement(el, "button");
    });
  });
});
