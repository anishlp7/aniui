import React from "react";
import { render } from "@testing-library/react-native";
import { Text, View } from "react-native";

// Tier 1 components (no animation deps)
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar } from "../ui/avatar";
import { Alert } from "../ui/alert";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { Spinner } from "../ui/spinner";
import { Chip } from "../ui/chip";
import { FAB } from "../ui/fab";
import { Banner } from "../ui/banner";
import { Image as AniImage } from "../ui/image";
import { EmptyState } from "../ui/empty-state";
import { SearchBar } from "../ui/search-bar";
import { Rating } from "../ui/rating";
import { Stepper } from "../ui/stepper";

// Tier 2 components (reanimated)
import { Toggle } from "../ui/toggle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

function measureRender(ui: React.ReactElement): number {
  const start = performance.now();
  render(ui);
  return performance.now() - start;
}

describe("Performance Benchmarks — Render Time", () => {
  const TIER1_BUDGET = 50; // ms
  const TIER2_BUDGET = 100; // ms

  describe("Tier 1 — Core components (< 50ms)", () => {
    it("Button renders under budget", () => {
      const duration = measureRender(<Button>Click</Button>);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Input renders under budget", () => {
      const duration = measureRender(<Input placeholder="Type..." />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Card renders under budget", () => {
      const duration = measureRender(
        <Card>
          <CardHeader><CardTitle>Title</CardTitle></CardHeader>
          <CardContent><Text>Content</Text></CardContent>
        </Card>
      );
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Badge renders under budget", () => {
      const duration = measureRender(<Badge><Text>New</Text></Badge>);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Separator renders under budget", () => {
      const duration = measureRender(<Separator />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Avatar renders under budget", () => {
      const duration = measureRender(<Avatar fallback="AB" />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Alert renders under budget", () => {
      const duration = measureRender(<Alert><Text>Warning</Text></Alert>);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Label renders under budget", () => {
      const duration = measureRender(<Label>Email</Label>);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Checkbox renders under budget", () => {
      const duration = measureRender(<Checkbox />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Progress renders under budget", () => {
      const duration = measureRender(<Progress value={50} />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Spinner renders under budget", () => {
      const duration = measureRender(<Spinner />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Chip renders under budget", () => {
      const duration = measureRender(<Chip>Tag</Chip>);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("FAB renders under budget", () => {
      const duration = measureRender(<FAB icon={<Text>+</Text>} />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Banner renders under budget", () => {
      const duration = measureRender(<Banner>Info</Banner>);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("EmptyState renders under budget", () => {
      const duration = measureRender(<EmptyState title="No items" />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("SearchBar renders under budget", () => {
      const duration = measureRender(<SearchBar value="" onChangeText={() => {}} />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Rating renders under budget", () => {
      const duration = measureRender(<Rating value={3} max={5} />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });

    it("Stepper renders under budget", () => {
      const duration = measureRender(<Stepper value={1} />);
      expect(duration).toBeLessThan(TIER1_BUDGET);
    });
  });

  describe("Tier 2 — Animated components (< 100ms)", () => {
    it("Toggle renders under budget", () => {
      const duration = measureRender(
        <Toggle><Text>B</Text></Toggle>
      );
      expect(duration).toBeLessThan(TIER2_BUDGET);
    });

    it("Tabs renders under budget", () => {
      const duration = measureRender(
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">A</TabsTrigger>
            <TabsTrigger value="b">B</TabsTrigger>
          </TabsList>
          <TabsContent value="a"><Text>Content</Text></TabsContent>
        </Tabs>
      );
      expect(duration).toBeLessThan(TIER2_BUDGET);
    });

    it("Collapsible renders under budget", () => {
      const duration = measureRender(
        <Collapsible>
          <CollapsibleTrigger><Text>Toggle</Text></CollapsibleTrigger>
          <CollapsibleContent><Text>Hidden</Text></CollapsibleContent>
        </Collapsible>
      );
      expect(duration).toBeLessThan(TIER2_BUDGET);
    });
  });
});
