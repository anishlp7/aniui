"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";

const data = [
  { name: "Chrome", value: 275, color: "hsl(var(--primary))" },
  { name: "Safari", value: 200, color: "#f97316" },
  { name: "Firefox", value: 187, color: "#8b5cf6" },
  { name: "Edge", value: 173, color: "#06b6d4" },
  { name: "Other", value: 90, color: "hsl(var(--muted))" },
];

export function PreviewPieChartDefault() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PreviewPieChartDonut() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PreviewPieChartLabels() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "hsl(var(--muted-foreground))" }}>
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PreviewPieChartHalf() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="70%" startAngle={180} endAngle={0} innerRadius={50} outerRadius={80} dataKey="value">
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PreviewPieChartInteractive() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PreviewPieChartNested() {
  const innerData = [
    { name: "Desktop", value: 475, color: "hsl(var(--primary))" },
    { name: "Mobile", value: 450, color: "#f97316" },
  ];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={innerData} cx="50%" cy="50%" innerRadius={25} outerRadius={45} dataKey="value">
          {innerData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
