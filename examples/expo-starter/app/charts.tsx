import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/area-chart";
import { BarChart } from "@/components/ui/bar-chart";
import { LineChart } from "@/components/ui/line-chart";
import { PieChart } from "@/components/ui/pie-chart";
import { RadarChart } from "@/components/ui/radar-chart";
import { RadialChart } from "@/components/ui/radial-chart";
import { ChartTooltip } from "@/components/ui/chart-tooltip";

const monthlyRevenue = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 3800 },
  { label: "Mar", value: 5100 },
  { label: "Apr", value: 4600 },
  { label: "May", value: 6200 },
  { label: "Jun", value: 7400 },
];

const quarterlyExpenses = [
  { label: "Q1", value: 12400 },
  { label: "Q2", value: 15800 },
  { label: "Q3", value: 11200 },
  { label: "Q4", value: 18600 },
];

const userGrowth = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1800 },
  { label: "Mar", value: 2400 },
  { label: "Apr", value: 3100 },
  { label: "May", value: 4200 },
  { label: "Jun", value: 5800 },
];

const marketShare = [
  { value: 38, color: "#2563eb", label: "Mobile" },
  { value: 28, color: "#7c3aed", label: "Desktop" },
  { value: 20, color: "#059669", label: "Tablet" },
  { value: 14, color: "#d97706", label: "Other" },
];

const teamSkills = [
  { label: "Design", value: 85 },
  { label: "Frontend", value: 92 },
  { label: "Backend", value: 78 },
  { label: "DevOps", value: 65 },
  { label: "Testing", value: 70 },
  { label: "Security", value: 60 },
];

const kpiProgress = [
  { value: 78, maxValue: 100, color: "#2563eb", label: "Revenue" },
  { value: 92, maxValue: 100, color: "#059669", label: "Users" },
  { value: 54, maxValue: 100, color: "#d97706", label: "Retention" },
];

export default function ChartsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4 py-6 pb-20">
        <Text variant="h2">Charts</Text>
        <Text variant="muted">7 chart components built with react-native-svg.</Text>

        {/* ChartTooltip */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Tooltip</CardTitle>
            <CardDescription>Standalone tooltip for chart data points</CardDescription>
          </CardHeader>
          <CardContent className="gap-3">
            <ChartTooltip
              label="March 2026"
              items={[
                { label: "Revenue", value: "$5,100", color: "#2563eb" },
                { label: "Expenses", value: "$3,200", color: "#dc2626" },
                { label: "Profit", value: "$1,900", color: "#059669" },
              ]}
            />
            <View className="flex-row gap-3">
              <ChartTooltip label="Users" value="4,200" color="#2563eb" indicator="dot" />
              <ChartTooltip label="Sales" value="$6.2K" color="#059669" indicator="line" />
            </View>
          </CardContent>
        </Card>

        {/* AreaChart */}
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Monthly revenue (Jan - Jun)</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyRevenue}
              height={200}
              color="#2563eb"
              showGrid
              showLabels
              curved
            />
          </CardContent>
        </Card>

        {/* BarChart */}
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Quarterly expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={quarterlyExpenses}
              height={200}
              color="#7c3aed"
              showGrid
              showLabels
            />
          </CardContent>
        </Card>

        {/* LineChart */}
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>User growth trend (Jan - Jun)</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={userGrowth}
              height={200}
              color="#059669"
              showDots
              showGrid
              showLabels
              curved
            />
          </CardContent>
        </Card>

        {/* PieChart */}
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
            <CardDescription>Market share by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={marketShare}
              height={220}
              showLabels
            />
          </CardContent>
        </Card>

        {/* RadarChart */}
        <Card>
          <CardHeader>
            <CardTitle>Radar Chart</CardTitle>
            <CardDescription>Team skill distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <RadarChart
              data={teamSkills}
              height={240}
              color="#2563eb"
              showGrid
              showLabels
              showDots
            />
          </CardContent>
        </Card>

        {/* RadialChart */}
        <Card>
          <CardHeader>
            <CardTitle>Radial Chart</CardTitle>
            <CardDescription>KPI progress towards goals</CardDescription>
          </CardHeader>
          <CardContent>
            <RadialChart
              data={kpiProgress}
              height={200}
              strokeWidth={14}
              showLabels
              centerText="75%"
              centerSubText="Average"
            />
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
