"use client";
import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Legend } from "recharts";

const data = [{ name: "Progress", value: 72, fill: "hsl(var(--primary))" }];
const multiData = [
  { name: "A", value: 72, fill: "hsl(var(--primary))" },
  { name: "B", value: 55, fill: "#f97316" },
  { name: "C", value: 88, fill: "#8b5cf6" },
];
const stackedData = [
  { name: "Tasks", value: 60, fill: "hsl(var(--primary))" },
  { name: "Bugs", value: 40, fill: "#f97316" },
  { name: "Features", value: 80, fill: "#06b6d4" },
];

export function PreviewRadialChartDefault() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart innerRadius="60%" outerRadius="90%" data={data} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={10} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadialChartMultiple() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart innerRadius="30%" outerRadius="90%" data={multiData} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={10} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadialChartText() {
  return (
    <div style={{ position: "relative", width: "100%", height: 200 }}>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart innerRadius="60%" outerRadius="90%" data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "hsl(var(--foreground))" }}>72%</div>
        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>Progress</div>
      </div>
    </div>
  );
}

export function PreviewRadialChartStacked() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart innerRadius="25%" outerRadius="90%" data={stackedData} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={10} />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadialChartHalf() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart innerRadius="60%" outerRadius="90%" data={data} startAngle={180} endAngle={0} cy="70%">
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={10} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export function PreviewRadialChartLabel() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart innerRadius="25%" outerRadius="90%" data={multiData} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={10} label={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600, position: "insideStart" }} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
